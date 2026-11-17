# Release notes

https://lampung.kartadinata.app/docs/en/guide/catatan-rilis

What is new in each version of Lampung Design System.

## 0.1.0

16 November 2026. First public release.

- Tokens in one file for CSS, JS/TS, shadcn/ui and Flutter: Lampung green accent, siger gold for identity, Geist and Geist Mono, light and dark themes with WCAG 2.2 AA contrast.
- Bay blue and coffee brown accent presets through `data-accent`.
- 179 components and recipes, each documented in Indonesian and English.
- Aksara Lampung: original glyphs, Latin transliteration, `[data-lds-aksara]` and `.aksara-band`.
- A masthead component to state whether a public-service site is official.
- The siger mark (`brand/`): a siger with seven flame-shaped lekuk curling toward the center above an arched base, white on a Lampung green tile, used as logo and favicon.
- 53 icons for public services and smart city screens.
- The `lampung-ds` CLI: `init`, `create`, `add`, `list` and `doctor` for Next.js, Vite, TanStack Start, React Router, Astro, Laravel, HTML and Flutter.
- React bindings (`lampung-design-system/react`) compiled to ESM with type declarations, so Next.js and other React frameworks import them with no extra config.
- The `lampung_design_system` Flutter package: theme, tokens, widgets and aksara.
- Examples: a city operations dashboard, a citizen app and a public service portal.

## Versions and compatibility

LDS follows Semantic Versioning. The core package, the CLI and the Flutter package share one version number. Breaking changes only land in major versions and are always listed under **BREAKING CHANGE**. The full history is in [CHANGELOG.md](https://github.com/mralifakbar/lampung-design-system/blob/main/CHANGELOG.md).
