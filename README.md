# GONDI Docs

Source of the public documentation published at [docs.gondi.xyz](https://docs.gondi.xyz).
It replaces the former GitBook space: every page is a Markdown file in this
repository and the site is a static build — no backend, no CMS.

Built with [Astro](https://astro.build) and
[Starlight](https://starlight.astro.build) (sidebar, full-text search, light/dark
theme, mobile navigation, table of contents and pagination come for free).

## Commands

```bash
bun install        # install dependencies
bun dev            # dev server at http://localhost:4321
bun run build      # static build to dist/
bun run preview    # serve dist/ locally
bun run verify     # astro check + prettier + build (what CI runs)
```

## Editing content

- Pages live in `src/content/docs/`. The file path is the URL:
  `src/content/docs/gondi-v3/loan-basics.md` → `/gondi-v3/loan-basics/`.
  `src/content/docs/index.md` is the home page (`/`).
- Every page starts with frontmatter. `title` is required, `description` feeds
  search engines and link previews:

  ```md
  ---
  title: 'Loan Basics'
  description: 'How GONDI loans work.'
  ---
  ```

- Images go next to the content under `src/assets/content/<page>/` and are
  referenced with a relative path (`![alt](../../assets/content/page/image.png)`);
  Astro optimizes them at build time. Downloadable files (PDFs) go in
  `public/files/` and are linked as `/files/<name>.pdf`.
- Call-outs use Starlight asides:

  ```md
  :::note
  Interest only accrues while the loan is active.
  :::
  ```

  Variants: `note`, `tip`, `caution`, `danger`. Add a custom title with
  `:::note[Title]`.

- `draft: true` in the frontmatter keeps a page out of production builds while
  it stays visible in `bun dev` (used for unreleased material such as
  `content-with-pools/`).
- New pages must be added to the sidebar in `astro.config.mjs` (`sidebar`), which
  mirrors the order of the former GitBook navigation. Pages absent from the
  sidebar are still built and reachable by URL (the "Learn" guides were hidden
  on GitBook and are exposed under "Guides" here).
- Legacy URLs that the app or partners link to are kept alive through the
  `redirects` map in `astro.config.mjs`.

## Contract addresses

`src/content/docs/gondi-v3/protocol-contracts.md` lists the deployed contracts
per chain. Keep it in sync with the deployment records under
`deploy/deployments/` in
[florida-contracts](https://github.com/gondixyz/florida-contracts) when a
contract is deployed or rotated.

## Deployment

The site is hosted on GitHub Pages. Every push to `main` runs
`.github/workflows/deploy.yml`, which builds `dist/` and publishes it to the
`github-pages` environment. The custom domain is `public/CNAME`
(`docs.gondi.xyz`, a DNS `CNAME` to `gondixyz.github.io`) and matches the
`site` option in `astro.config.mjs`.

## Notes

- `astro` is pinned to `~7.1` because Starlight asides stopped rendering on
  Astro 7.2.x at the time of writing. Bump once
  `:::note` blocks render again on a newer release (run `bun run build` and
  check that `dist/index.html` contains `starlight-aside`).
