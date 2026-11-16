# Lampung Design System landing page

The promotional page for Lampung Design System (LDS), an unofficial, open source design system. It is a small static project: two HTML pages, one stylesheet for page layout and one script. Every component, token, font and behavior comes from the core files of this repository.

| File | What it is |
|---|---|
| `index.html` | Indonesian page (default), served at `/` |
| `en/index.html` | English page, served at `/en/` |
| `landing.css` | Page layout only (frame, grids, swatches). Reads tokens, works in light and dark |
| `landing.js` | ES module that imports `/js/lds.js`: theme toggle, token sample switcher, the preview form, copy fallback |
| `favicon.svg` | Browser icon |
| `og.svg`, `og.png` | Open Graph image, 1200 by 630. `og.png` is a raster of `og.svg` drawn in Geist; redraw it whenever `og.svg` changes |

## Run it locally

The pages use absolute paths for the core assets (`/css/lds.css`, `/js/lds.js`, `/fonts/`, `/aksara/`) and for the docs (`/docs/`, `/docs/en/`, `/docs/examples/`). Serve the repository root so those paths resolve:

```sh
cd apps/landing
npm run dev            # python3 -m http.server 5180 --directory ../..
```

Then open http://localhost:5180/apps/landing/ (Indonesian) or http://localhost:5180/apps/landing/en/ (English).

From the repository root, `npm run serve` (port 5173) works the same way: open http://localhost:5173/apps/landing/.

No install step and no dependencies. Python 3 is only used as a static file server; any server that serves the repository root works.

## How it is deployed

The site is deployed to Cloudflare at https://lampung.kartadinata.app (see `wrangler.jsonc` at the repository root). `npm run build:site` assembles `site/`:

- this folder at the root: `index.html` at `/`, `en/index.html` at `/en/`, plus `landing.css`, `landing.js`, `favicon.svg`, `og.svg` and `og.png` at `/`
- the core assets at `/css/`, `/js/`, `/fonts/` and `/aksara/`
- the docs at `/docs/` (Indonesian) and `/docs/en/` (English), the examples at `/docs/examples/`

Links between the two languages are relative (`en/` and `../`), so they work both in development (under `/apps/landing/`) and in production (at `/`). Canonical, `hreflang` and Open Graph URLs point at the production domain.

## Rules for this page

- Indonesian first; every change goes into both `index.html` and `en/index.html`.
- Use LDS components as documented in `skills/lampung-design-system/references/components.md`. `landing.css` only places them; it never gives a component a new look.
- No invented users, testimonials, download counts or adoption claims. Keep the "not a government website" notice in the masthead and the footer.
- Check light and dark, 375 px and desktop, keyboard order and the browser console before shipping.
