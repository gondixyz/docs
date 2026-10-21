import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, it } from 'node:test';
import { refreshCollections } from './refresh-collections';

const original = `---
title: Whitelisted Collections
---

Keep this introduction.

<!-- collections:start -->

[Former collection](https://www.gondi.xyz/collections/former-collection)

<!-- collections:end -->

Keep this closing paragraph.
`;

const collection = (id: string, overrides: Record<string, unknown> = {}) => ({
  id,
  name: `Collection ${id}`,
  slug: `collection-${id}`,
  actionsEnabled: true,
  contractData: {
    blockchain: 'ethereum',
    contractAddress: `0x${id.padStart(40, '0')}`,
    standard: 'erc721',
  },
  ...overrides,
});

const page = (nodes: unknown[], totalCount: number, endCursor: string | null = null) => ({
  data: {
    listCollections: {
      totalCount,
      pageInfo: { hasNextPage: endCursor !== null, endCursor },
      edges: nodes.map((node) => ({ node })),
    },
  },
});

/** Exercises real file replacement while keeping API responses deterministic and offline. */
async function withDirectory(run: (filePath: string) => Promise<void>) {
  const directory = await mkdtemp(join(tmpdir(), 'docs-collections-test-'));
  const filePath = join(directory, 'collections.md');
  try {
    await writeFile(filePath, original);
    await run(filePath);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}

describe('collection directory refresh', () => {
  it('follows capped pages, retains disabled entries, and preserves surrounding prose', async () => {
    await withDirectory(async (filePath) => {
      const responses = [
        page([collection('1'), collection('2', { actionsEnabled: false })], 3, 'next-page'),
        page([collection('3')], 3),
      ];
      const requests: URL[] = [];
      const report = await refreshCollections({
        filePath,
        verifiedOn: '2026-10-21',
        fetchPage: async (url) => {
          requests.push(url);
          return Response.json(responses.shift());
        },
      });
      const updated = await readFile(filePath, 'utf8');
      assert.equal(requests.length, 2);
      assert.deepEqual(JSON.parse(requests[1]!.searchParams.get('variables')!), {
        after: 'next-page',
      });
      assert.match(requests[0]!.searchParams.get('query')!, /excludeGondiUserVault: true/);
      assert.match(
        requests[0]!.searchParams.get('query')!,
        /ERC721, ERC1155, OLD_ERC721, CRYPTOPUNKS/,
      );
      assert.match(updated, /Keep this introduction\./);
      assert.match(updated, /Keep this closing paragraph\./);
      assert.match(updated, /Verified: 2026-10-21 \(UTC\)/);
      assert.match(updated, /3 entries · 2 enabled · 1 disabled/);
      assert.match(updated, /Collection 2.*Currently disabled/);
      assert.deepEqual(report, {
        total: 3,
        enabled: 2,
        disabled: 1,
        added: ['collection-1', 'collection-2', 'collection-3'],
        removed: ['former-collection'],
      });
    });
  });

  it('preserves distinct identities and renders punctuation and HTML as text', async () => {
    await withDirectory(async (filePath) => {
      const name = '作品 | [Edition] <script> & \\ *art*\nnext';
      const nodes = [collection('1', { name }), collection('2', { name })];
      await refreshCollections({
        filePath,
        verifiedOn: '2026-10-21',
        fetchPage: async () => Response.json(page(nodes, 2)),
      });
      const updated = await readFile(filePath, 'utf8');
      assert.match(updated, /作品 \\\| \\\[Edition\\\] &lt;script&gt; &amp;/);
      assert.doesNotMatch(updated, /<script>/);
      assert.match(updated, /https:\/\/www.gondi.xyz\/collections\/collection-1/);
      assert.match(updated, /https:\/\/www.gondi.xyz\/collections\/collection-2/);
      assert.equal(updated.split('\n').filter((line) => line.includes('作品')).length, 2);
    });
  });

  it('sorts deterministically across chains and reports no changes on a repeated snapshot', async () => {
    await withDirectory(async (filePath) => {
      const nodes = [
        collection('1', { name: 'Zebra' }),
        collection('2', { name: 'Alpha' }),
        collection('3', {
          contractData: {
            blockchain: 'hyperliquid',
            contractAddress: `0x${'3'.repeat(40)}`,
            standard: 'erc1155',
          },
        }),
      ];
      const options = { filePath, verifiedOn: '2026-10-21' };
      await refreshCollections({
        ...options,
        fetchPage: async () => Response.json(page(nodes, nodes.length)),
      });
      const first = await readFile(filePath, 'utf8');
      const report = await refreshCollections({
        ...options,
        fetchPage: async () => Response.json(page([...nodes].reverse(), nodes.length)),
      });
      assert.equal(await readFile(filePath, 'utf8'), first);
      assert.ok(first.indexOf('[Alpha]') < first.indexOf('[Zebra]'));
      assert.ok(first.indexOf('## Ethereum') < first.indexOf('## HyperEVM'));
      assert.match(first, /https:\/\/hyperevmscan.io\/address\/0x333/);
      assert.deepEqual([report.added, report.removed], [[], []]);
    });
  });

  it('encodes parentheses in collection URLs without changing their identity on the next refresh', async () => {
    await withDirectory(async (filePath) => {
      const options = {
        filePath,
        verifiedOn: '2026-10-21',
        fetchPage: async () => Response.json(page([collection('1', { slug: 'collection(1)' })], 1)),
      };
      await refreshCollections(options);
      assert.match(await readFile(filePath, 'utf8'), /collections\/collection%281%29\)/);
      const report = await refreshCollections(options);
      assert.deepEqual([report.added, report.removed], [[], []]);
    });
  });

  it('preserves edits made while the API snapshot is loading', async () => {
    await withDirectory(async (filePath) => {
      const concurrentEdit = original.replace('Keep this introduction.', 'A newer introduction.');
      await assert.rejects(
        refreshCollections({
          filePath,
          verifiedOn: '2026-10-21',
          fetchPage: async () => {
            await writeFile(filePath, concurrentEdit);
            return Response.json(page([collection('1')], 1));
          },
        }),
        /changed during refresh/,
      );
      assert.equal(await readFile(filePath, 'utf8'), concurrentEdit);
    });
  });

  const failures: [string, () => Response | Error, RegExp][] = [
    ['HTTP error', () => new Response('Unavailable', { status: 503 }), /HTTP 503/],
    ['network error', () => new Error('Network unavailable'), /Network unavailable/],
    ['GraphQL error', () => Response.json({ errors: [{ message: 'Unavailable' }] }), /GraphQL/],
    ['malformed record', () => Response.json(page([collection('1', { name: null })], 1)), /name/],
    ['duplicate ID', () => Response.json(page([collection('1'), collection('1')], 2)), /Duplicate/],
    ['incomplete pagination', () => Response.json(page([collection('1')], 2)), /count/],
    ['empty snapshot', () => Response.json(page([], 0)), /empty/i],
    [
      'unknown chain',
      () => Response.json(page([collection('1', { contractData: { blockchain: 'unknown' } })], 1)),
      /chain|contract/i,
    ],
    ['malformed response', () => Response.json({ data: null }), /response/i],
  ];

  for (const [name, response, error] of failures) {
    it(`leaves the existing page untouched on ${name}`, async () => {
      await withDirectory(async (filePath) => {
        await assert.rejects(
          refreshCollections({
            filePath,
            verifiedOn: '2026-10-21',
            fetchPage: async () => {
              const result = response();
              if (result instanceof Error) throw result;
              return result;
            },
          }),
          error,
        );
        assert.equal(await readFile(filePath, 'utf8'), original);
      });
    });
  }

  it('rejects a repeated cursor without publishing a partial snapshot', async () => {
    await withDirectory(async (filePath) => {
      let requests = 0;
      await assert.rejects(
        refreshCollections({
          filePath,
          verifiedOn: '2026-10-21',
          fetchPage: async () => Response.json(page([collection(String(++requests))], 3, 'same')),
        }),
        /cursor/i,
      );
      assert.equal(requests, 2);
      assert.equal(await readFile(filePath, 'utf8'), original);
    });
  });

  it('rejects a changed total during pagination', async () => {
    await withDirectory(async (filePath) => {
      const responses = [page([collection('1')], 2, 'next'), page([collection('2')], 3)];
      await assert.rejects(
        refreshCollections({
          filePath,
          verifiedOn: '2026-10-21',
          fetchPage: async () => Response.json(responses.shift()),
        }),
        /count/i,
      );
      assert.equal(await readFile(filePath, 'utf8'), original);
    });
  });

  it('refuses to overwrite a page with missing or duplicated generation markers', async () => {
    await withDirectory(async (filePath) => {
      const damaged = original.replace('<!-- collections:end -->', '<!-- collections:start -->');
      await writeFile(filePath, damaged);
      await assert.rejects(
        refreshCollections({
          filePath,
          verifiedOn: '2026-10-21',
          fetchPage: async () => Response.json(page([collection('1')], 1)),
        }),
        /marker/i,
      );
      assert.equal(await readFile(filePath, 'utf8'), damaged);
    });
  });
});
