import type { APIRoute } from 'astro';

/**
 * Serves `/sitemap.xml`, the path crawlers and SEO tools probe first, as a sitemap index over
 * the chunk Starlight's sitemap integration writes next to `/sitemap-index.xml`.
 *
 * IMPLEMENTATION NOTE: `@astrojs/sitemap` (bundled by Starlight once `site` is set) writes
 * `sitemap-index.xml` plus `sitemap-0.xml`, a new chunk every 45,000 URLs
 * (https://docs.astro.build/en/guides/integrations-guide/sitemap/). GitHub Pages cannot send a
 * 301 and Astro's static `redirects` emit a meta-refresh HTML page
 * (https://docs.astro.build/en/guides/routing/#configured-redirects), which crawlers do not read
 * as XML, so this endpoint is prerendered to a real XML file instead. It lists the chunk rather
 * than `sitemap-index.xml` because sitemap indexes must not nest
 * (https://www.sitemaps.org/protocol.html#index).
 */
export const GET: APIRoute = ({ site }) =>
  new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${new URL('/sitemap-0.xml', site)}</loc></sitemap>
</sitemapindex>
`,
    { headers: { 'Content-Type': 'application/xml' } },
  );
