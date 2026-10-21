import { randomUUID } from 'node:crypto';
import { readFile, rename, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const chains = {
  ethereum: { name: 'Ethereum', explorer: 'https://etherscan.io' },
  hyperliquid: { name: 'HyperEVM', explorer: 'https://hyperevmscan.io' },
  robinhood: { name: 'Robinhood Chain', explorer: 'https://robinhoodchain.blockscout.com' },
};
const standards = {
  erc721: 'ERC-721',
  erc1155: 'ERC-1155',
  old_erc721: 'Legacy ERC-721',
  cryptopunks: 'CryptoPunks',
};
const startMarker = '<!-- collections:start -->';
const endMarker = '<!-- collections:end -->';
const collectionOrigin = 'https://www.gondi.xyz/collections/';
const query = `query CollectionDirectory($after: String) {
  listCollections(
    first: 100
    after: $after
    excludeGondiUserVault: true
    standards: [ERC721, ERC1155, OLD_ERC721, CRYPTOPUNKS]
  ) {
    totalCount
    pageInfo { endCursor hasNextPage }
    edges {
      node {
        id name slug actionsEnabled
        contractData { blockchain contractAddress standard }
      }
    }
  }
}`;

type Collection = {
  id: string;
  name: string;
  slug: string;
  actionsEnabled: boolean;
  blockchain: keyof typeof chains;
  address: string;
  standard: keyof typeof standards;
};
type FetchPage = (url: URL) => Promise<Response>;
type RefreshOptions = {
  filePath: string;
  verifiedOn?: string;
  fetchPage?: FetchPage;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** Returns the nonempty API string instead of letting unparsed data reach the renderer. */
function parseString(value: unknown, field: string): string {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`Invalid ${field}`);
  return value.trim();
}

/** Parses collection identity and the supported chain/standard into the directory model. */
function parseCollection(value: unknown): Collection {
  if (!isRecord(value) || !isRecord(value.contractData)) {
    throw new Error('Invalid collection or contract data');
  }
  const { blockchain, contractAddress, standard } = value.contractData;
  if (typeof blockchain !== 'string' || !Object.hasOwn(chains, blockchain)) {
    throw new Error(`Unknown collection blockchain: ${blockchain}`);
  }
  if (typeof standard !== 'string' || !Object.hasOwn(standards, standard)) {
    throw new Error(`Unknown collection standard: ${standard}`);
  }
  if (typeof contractAddress !== 'string' || !/^0x[0-9a-fA-F]{40}$/.test(contractAddress)) {
    throw new Error('Invalid collection contract address');
  }
  if (typeof value.actionsEnabled !== 'boolean') throw new Error('Invalid actionsEnabled');
  const id = parseString(value.id, 'collection ID');
  const slug = parseString(value.slug, 'collection slug');
  if (!/^\d+$/.test(id) || /[\s/?#]/.test(slug) || slug === '.' || slug === '..') {
    throw new Error('Invalid collection ID or slug');
  }
  return {
    id,
    slug,
    name: parseString(value.name, 'collection name'),
    actionsEnabled: value.actionsEnabled,
    blockchain: blockchain as keyof typeof chains,
    address: contractAddress,
    standard: standard as keyof typeof standards,
  };
}

/** Parses one connection page, rejecting GraphQL errors even if partial data accompanies them. */
function parsePage(value: unknown) {
  if (isRecord(value) && value.errors !== undefined) {
    if (!Array.isArray(value.errors) || value.errors.length)
      throw new Error('GraphQL query failed');
  }
  const connection = isRecord(value) && isRecord(value.data) ? value.data.listCollections : null;
  if (!isRecord(connection) || !isRecord(connection.pageInfo) || !Array.isArray(connection.edges)) {
    throw new Error('Invalid collection response');
  }
  const { totalCount, pageInfo } = connection;
  if (typeof totalCount !== 'number' || !Number.isSafeInteger(totalCount) || totalCount < 0) {
    throw new Error('Invalid collection count');
  }
  if (typeof pageInfo.hasNextPage !== 'boolean') throw new Error('Invalid pagination response');
  const cursor = pageInfo.hasNextPage ? parseString(pageInfo.endCursor, 'pagination cursor') : null;
  return {
    totalCount,
    cursor,
    collections: connection.edges.map((edge) => parseCollection(isRecord(edge) ? edge.node : null)),
  };
}

/**
 * Fetches the complete public catalog before permitting any documentation write.
 *
 * IMPLEMENTATION NOTE: GET query/variables follow https://graphql.org/learn/serving-over-http/.
 * The public https://api.gondi.xyz/graphql connection caps pages below the requested size;
 * follow pageInfo rather than edge count (https://relay.dev/graphql/connections.htm).
 */
async function fetchCollections(fetchPage: FetchPage): Promise<Collection[]> {
  const collections: Collection[] = [];
  const ids = new Set<string>();
  const slugs = new Set<string>();
  const cursors = new Set<string>();
  let after: string | null = null;
  let expectedCount: number | undefined;
  do {
    const url = new URL('https://api.gondi.xyz/graphql');
    url.searchParams.set('query', query);
    url.searchParams.set('variables', JSON.stringify({ after }));
    const response = await fetchPage(url);
    if (!response.ok) throw new Error(`Collection API returned HTTP ${response.status}`);
    const page = parsePage(await response.json());
    expectedCount ??= page.totalCount;
    if (!expectedCount || !page.collections.length)
      throw new Error('Refusing an empty snapshot/page');
    if (page.totalCount !== expectedCount)
      throw new Error('Collection count changed; rerun refresh');
    for (const collection of page.collections) {
      if (ids.has(collection.id) || slugs.has(collection.slug)) {
        throw new Error(`Duplicate collection identity: ${collection.id} / ${collection.slug}`);
      }
      ids.add(collection.id);
      slugs.add(collection.slug);
      collections.push(collection);
    }
    if (collections.length > expectedCount) throw new Error('Collection count exceeds API total');
    after = page.cursor;
    if (after) {
      if (cursors.has(after)) throw new Error('Repeated pagination cursor');
      cursors.add(after);
    }
  } while (after);
  if (collections.length !== expectedCount) throw new Error('Incomplete collection count');
  return collections;
}

/** Keeps API-provided labels as one literal Markdown table cell, including HTML-like names. */
function escapeMarkdown(value: string): string {
  return value
    .replace(/\s+/g, ' ')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/[\\`*_[\]{}|]/g, '\\$&');
}

/** Renders a stable chain-ordered directory; distinct collection IDs retain their own rows. */
function renderDirectory(collections: Collection[], verifiedOn: string): string {
  const enabled = collections.filter((collection) => collection.actionsEnabled).length;
  const lines = [
    `**Verified: ${verifiedOn} (UTC)**`,
    '',
    `**${collections.length} entries · ${enabled} enabled · ${collections.length - enabled} disabled**`,
  ];
  for (const [blockchain, chain] of Object.entries(chains)) {
    const entries = collections
      .filter((collection) => collection.blockchain === blockchain)
      .sort((left, right) => {
        const leftKey = `${left.name.toLowerCase()}\0${left.slug}`;
        const rightKey = `${right.name.toLowerCase()}\0${right.slug}`;
        return leftKey < rightKey ? -1 : leftKey > rightKey ? 1 : 0;
      });
    if (!entries.length) continue;
    lines.push(
      '',
      `## ${chain.name}`,
      '',
      `${entries.length} entries.`,
      '',
      '| Collection | Standard | Contract | Actions |',
      '| --- | --- | --- | --- |',
    );
    for (const collection of entries) {
      const label = escapeMarkdown(collection.name);
      const encodedSlug = encodeURIComponent(collection.slug)
        .replaceAll('(', '%28')
        .replaceAll(')', '%29');
      const link = `${collectionOrigin}${encodedSlug}`;
      const addressLabel = `${collection.address.slice(0, 6)}…${collection.address.slice(-4)}`;
      const explorer = `${chain.explorer}/address/${collection.address}`;
      const status = collection.actionsEnabled ? 'Enabled' : '**Currently disabled**';
      lines.push(
        `| [${label}](${link}) | ${standards[collection.standard]} | [${addressLabel}](${explorer}) | ${status} |`,
      );
    }
  }
  return lines.join('\n');
}

/**
 * Refreshes only the marked section, preserving the previous file until all pages validate.
 *
 * IMPLEMENTATION NOTE: write a sibling temporary file then rename it over the page using
 * node:fs/promises (https://nodejs.org/api/fs.html#fspromisesrenameoldpath-newpath).
 */
export async function refreshCollections({
  filePath,
  verifiedOn = new Date().toISOString().slice(0, 10),
  fetchPage = (url) => fetch(url, { signal: AbortSignal.timeout(30_000) }),
}: RefreshOptions) {
  const original = await readFile(filePath, 'utf8');
  const start = original.indexOf(startMarker);
  const end = original.indexOf(endMarker);
  if (
    start < 0 ||
    end < start ||
    original.indexOf(startMarker, start + startMarker.length) !== -1 ||
    original.indexOf(endMarker, end + endMarker.length) !== -1
  ) {
    throw new Error('Expected one ordered pair of collection generation markers');
  }
  const previousSection = original.slice(start + startMarker.length, end);
  const previousSlugs = new Set(
    [...previousSection.matchAll(/https:\/\/www\.gondi\.xyz\/collections\/([^\s)]+)/g)].map(
      (match) => decodeURIComponent(match[1]!),
    ),
  );
  const collections = await fetchCollections(fetchPage);
  const slugs = new Set(collections.map((collection) => collection.slug));
  const updated = `${original.slice(0, start + startMarker.length)}\n\n${renderDirectory(collections, verifiedOn)}\n\n${original.slice(end)}`;
  if ((await readFile(filePath, 'utf8')) !== original) {
    throw new Error('Documentation changed during refresh; rerun to preserve those edits');
  }
  if (updated !== original) {
    const temporaryPath = `${filePath}.${randomUUID()}.tmp`;
    try {
      await writeFile(temporaryPath, updated, { flag: 'wx' });
      await rename(temporaryPath, filePath);
    } finally {
      await rm(temporaryPath, { force: true });
    }
  }
  const enabled = collections.filter((collection) => collection.actionsEnabled).length;
  return {
    total: collections.length,
    enabled,
    disabled: collections.length - enabled,
    added: [...slugs].filter((slug) => !previousSlugs.has(slug)).sort(),
    removed: [...previousSlugs].filter((slug) => !slugs.has(slug)).sort(),
  };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const filePath = fileURLToPath(
      new URL('../src/content/docs/gondi-v3/whitelisted-collections.md', import.meta.url),
    );
    const report = await refreshCollections({ filePath });
    console.log(`${report.total} entries: ${report.enabled} enabled, ${report.disabled} disabled.`);
    console.log(
      `Directory links added (${report.added.length}): ${report.added.join(', ') || 'none'}`,
    );
    console.log(
      `Directory links removed (${report.removed.length}): ${report.removed.join(', ') || 'none'}`,
    );
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}
