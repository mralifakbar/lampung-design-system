# Changelog

All notable changes to Lampung Design System are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses [Semantic Versioning](https://semver.org/). The core package (`lampung-design-system`), the CLI (`lampung-ds`) and the Flutter package (`lampung_design_system`) share one version.

## [Unreleased]

## [0.1.2] - 2026-11-17

### Added

- Flutter example: a Komponen tab with a searchable gallery of every widget, grouped like the docs.
- Docs home: Copy for LLM and View as Markdown, backed by `docs/index.md`.

### Fixed

- Flutter: vertical `LdsSteps` no longer throws inside scrolling lists; `LdsTabs` and `LdsSlidingIndicator` size to their content; `LdsPagination`, `LdsKbd` and `LdsCitation.span` hug their content; `LdsHoldToConfirm` centers its label; `LdsPaper` keeps numbers on one line; `LdsEventCalendar` fits 375 pt screens.
- Switches have a 44 px tap height.
- CLI: `create -t start` uses `@tanstack/cli create` instead of the deprecated `@tanstack/start` creator.

## [0.1.1] - 2026-11-17

### Fixed

- Phones: centered heroes center their actions and note, and hero and page header actions stack at full width under 560 px.
- Phones: the masthead keeps its mark beside the text, with the toggle under it.
- Flutter: `LdsSwipeActions` no longer uses `SizeTransition.axisAlignment`, deprecated after Flutter 3.41.

### Changed

- Development dependencies: esbuild 0.28, TypeScript 7, flutter_lints 6.

## [0.1.0] - 2026-11-17

First public release.

### Added

- Tokens in one file for CSS, JS/TS, shadcn/ui and Flutter: Lampung green accent, siger gold identity colors, Geist and Geist Mono, light and dark themes with WCAG 2.2 AA contrast.
- 179 components and recipes, each with Indonesian and English documentation.
- Aksara Lampung: original glyph drawings, Latin transliteration, `[data-lds-aksara]` and the decorative `.aksara-band`.
- Masthead component for stating whether a public-service site is official.
- The siger mark (`brand/`): a siger with seven flame-shaped lekuk curling toward the center above an arched base, white on a Lampung green tile, used as logo and favicon.
- 53 icons for public services and smart city screens.
- `lampung-ds` CLI: `init`, `create`, `add`, `list` and `doctor` for Next.js, Vite, TanStack Start, React Router, Astro, Laravel, plain HTML and Flutter.
- React bindings (`lampung-design-system/react`) compiled to ESM with type declarations, so Next.js and other React frameworks import them with no extra config.
- `lampung_design_system` Flutter package: theme, tokens, aksara and 161 widgets covering every web component group (forms, overlays, navigation, data display, charts, chat and motion, marketing blocks).
- Examples: a city operations dashboard, a citizen super app and a public service portal.
- Landing page and documentation site, deployed to Cloudflare. Every docs page has a Markdown twin with Copy for LLM, plus `llms.txt` and `llms-full.txt` for agents.

[Unreleased]: https://github.com/mralifakbar/lampung-design-system/compare/v0.1.2...HEAD
[0.1.2]: https://github.com/mralifakbar/lampung-design-system/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/mralifakbar/lampung-design-system/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/mralifakbar/lampung-design-system/releases/tag/v0.1.0
