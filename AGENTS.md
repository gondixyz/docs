# GONDI Docs Agent Guidelines

Public documentation site for [docs.gondi.xyz](https://docs.gondi.xyz), built with
Astro + Starlight. `README.md` is the human guide; this file lists the rules that
matter when an agent edits this repository.

## Commands

- Install: `bun install`
- Dev server: `bun dev` (http://localhost:4321)
- Validate: `bun run verify` (`astro check`, `prettier --check`, `astro build`) —
  the same script CI (`.github/workflows/checks.yml`) runs.
- Format: `bun run fmt`

## Content Rules

- One Markdown file per page under `src/content/docs/`; the path is the URL.
  Keep existing URLs stable — the GONDI app ([gondi.xyz](https://gondi.xyz)) and
  external sites deep-link into the docs. Removing or renaming a page requires
  an entry in the `redirects` map of `astro.config.mjs`.
- Every page needs `title` frontmatter; add `description` for new pages.
- Add new pages to the `sidebar` in `astro.config.mjs`; autogeneration is not
  used so that the order matches the product narrative.
- Use Starlight asides (`:::note`, `:::tip`, `:::caution`, `:::danger`) for
  call-outs, GFM tables for tabular data, and relative image paths into
  `src/assets/content/`. Do not embed remote images: the GitBook CDN that hosted
  the original images is gone, which is why they live in the repository.
- `draft: true` hides a page from production builds (dev still renders it).
- `src/content/docs/gondi-v3/protocol-contracts.md` must match the deployment
  records under `deploy/deployments/` in
  [florida-contracts](https://github.com/gondixyz/florida-contracts). Update it
  when contracts change.
- Prettier does not format `src/content/docs/` (see `.prettierignore`) so that
  hand-written tables and asides keep their layout; keep the Markdown tidy by
  hand.

## Gotchas

- `astro` is pinned to `~7.1`: Starlight asides did not render on 7.2.x. After
  bumping, confirm `dist/index.html` contains `starlight-aside`.
- The site is fully static (`dist/`). There is no backend and no runtime data
  fetching; anything dynamic belongs in the frontend app, not here.
