# AGENTS.md

Instructions for AI coding agents (Claude Code, Codex, Gemini CLI, Cursor and others) working in this repository or in any project that uses Lampung Design System (LDS).

## What this repository is

Lampung Design System: an **unofficial**, open source design system that helps local governments, people in Lampung and anyone else build websites and apps quickly with a consistent design. It is not made, endorsed or run by the Provincial Government of Lampung or any agency; say so wherever a page could be mistaken for an official service.

One token file feeds CSS, JS/TS, shadcn/ui and Flutter. Components are plain CSS classes; behaviors are one optional ES module driven by `data-lds-*` attributes. A CLI (`lampung-ds`) wires it into Next.js, Vite, TanStack Start, React Router, Astro, Laravel, plain HTML and Flutter.

Its identity in one line: a white canvas, one Lampung green (`#0B6E4F`) for action and selection, siger gold (`#C9952B`) kept for identity and ornament, type that tightens as it grows (Geist), grouping by a quiet fill instead of shadows, aksara Lampung as a quiet cultural accent, and calm spring motion that can be interrupted at any moment.

## Languages

- **Docs and examples: Indonesian first, English second.** `docs/` is Indonesian; `docs/en/` is English. Every page a person reads exists in both. Indonesian copy uses plain, polite language (address the reader as "Anda" only when needed, prefer imperatives), sentence case, and no em dashes.
- **Code stays English:** identifiers, inline code comments, commit messages, `AGENTS.md`, skill files.
- Example screens use Indonesian public-service content (permits, citizen reports, health, transport, disaster info) with plausible values, and say once per page that the data is an example.

## Commits (required)

Use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). Every commit message has this shape:

```
<type>(<optional scope>): <subject in lowercase imperative, no trailing period, max 72 chars>

<optional body: why, wrapped at 72>

<optional footer: BREAKING CHANGE: ..., Refs: #12>
```

- **Types:** `feat`, `fix`, `docs`, `style` (formatting only), `refactor`, `perf`, `test`, `build` (build system, generated output, packaging), `ci`, `chore`, `revert`.
- **Scopes** (pick the area touched): `tokens`, `css`, `js`, `react`, `icons`, `type`, `aksara`, `brand`, `docs`, `i18n`, `examples`, `landing`, `cli`, `flutter`, `skills`, `scripts`, `deploy`, `deps`, `release`, `dist` (generated output), `ci`, `test`.
- **Small commits, always.** One logical change per commit: a token change, one component, one docs page, one example screen, one CLI command. Commit as soon as that change builds and passes its checks; never pile up a day of work into one commit. If a message needs "and" to describe two unrelated things, split it. Generated files go in the same commit as the source change that produced them.
- Breaking changes add `!` after the type or scope (`feat(tokens)!: rename accent-text`) and a `BREAKING CHANGE:` footer.
- Never commit secrets, `.env` files, `node_modules`, build output under `site/` or `apps/landing/dist/`, or `.cache/`.
- `commitlint.config.mjs` encodes these rules; `npm run lint:commits` checks the branch.

## Read before any UI work

Load these skills from `skills/` in this order, and follow them:

1. `skills/lampung-design-system/SKILL.md`: the system itself. Then the reference that fits the task (`references/tokens.md`, `components.md`, `motion.md`, `microinteractions.md`, `platforms.md`, `icons.md`, `aksara.md`, `checklist.md`).
2. `skills/antislop/SKILL.md`: the core filter against generic AI output. Then the concern skills: `antislop-ui` (visual), `antislop-copywriting` (any text), `antislop-human` (contrast, keyboard, focus, states; includes `contrast-check.py`), `antislop-layoutmobile` (reflow, tap targets), `antislop-code` (comment hygiene).
3. `skills/apple-design/SKILL.md`: response, interruptibility, springs, momentum projection, materials, typography. The motion model of this system comes from here.
4. `skills/microinteractions/SKILL.md`: trigger, rules, feedback, loops and modes, with an eight-question diagnostic.

For antislop, the `DESIGN.md`-equivalent direction is this design system: treat `skills/lampung-design-system` as the design direction (dials: ENERGY 2, RHYTHM 2, MOTION 2). For building new UI with this system, `during` is the natural mode.

<!-- antislop:start -->
## antislop
For UI, copy, people, mobile layout, or code comments work, read `skills/antislop/SKILL.md` (core) and then the skill for the task:
- UI / visual: `skills/antislop-ui/SKILL.md`
- Copy & text: `skills/antislop-copywriting/SKILL.md`
- People: `skills/antislop-human/SKILL.md`
- Mobile / responsive: `skills/antislop-layoutmobile/SKILL.md`
- Code comments: `skills/antislop-code/SKILL.md`
Before starting, follow the core's "Two Usage Modes" section in strict order: explicit session instruction first, then global preference, then ask. A session instruction always wins. For a resolved mode, say `antislop active: <mode> (session override).` or `antislop active: <mode> (global preference).` once before presenting findings or making edits, using the actual mode and source.
<!-- antislop:end -->

## Repository map

| Path | What it is | Edit? |
|---|---|---|
| `tokens/tokens.json` | Single source of every value (color light/dark, shadow, type, space, radius, size, motion) | Yes, then `npm run build:tokens` |
| `css/tokens.css`, `dist/**` | Generated CSS variables, JS/TS tokens, Flutter tokens, shadcn/ui theme and registry | No, generated |
| `css/components.css` | Every component, reads tokens only | Yes |
| `css/fonts.css`, `css/lds.css` | Font import; one-file entry (fonts + tokens + components) | Rarely |
| `js/lds.js`, `js/lds.d.ts` | Behaviors and their types | Yes, types with every export change |
| `react/index.tsx` | React bindings for components whose state React owns | Yes |
| `brand/` | The siger mark (`siger.svg`, `mark.svg`, `mark-mono.svg`), drawn by `scripts/build-brand.mjs`; the landing favicon and docs mark come from it | Edit the script, then `npm run build:brand` |
| `aksara/` | Aksara Lampung glyphs (original SVG drawings) and the transliteration helper | Yes, then `npm run build:aksara` |
| `fonts/lds-icons*.woff2`, `icons/icons.json` | Solar icon fonts and the ligature list | `icons.json` yes, then `npm run build:icons` |
| `docs/spec/*.mjs` | One English spec per component (source of docs pages and skill references) | Yes |
| `docs/spec/id/*.mjs` | Indonesian overrides for each spec (prose and example copy) | Yes, keep in step with the English spec |
| `docs/components/`, `docs/en/components/`, `skills/lampung-design-system/references/components/` | Generated from `docs/spec` | No, generated |
| `docs/index.html`, `docs/en/index.html` | Documentation shells (Indonesian, English); render `docs/boards/*.dc.html` (ID) and `docs/boards/en/*.dc.html` (EN) through `docs/runtime.js` | Yes |
| `docs/guide/`, `docs/en/guide/` | Hand-written guides: installation per framework, CLI, theming, aksara, writing, accessibility | Yes |
| `docs/examples/` | Government and smart city examples built only from the system (admin dashboard, citizen app, public portal) | Sources yes, generated pages no |
| `apps/landing/` | The promotional landing page (its own small project) | Yes |
| `packages/cli/` | `lampung-ds` CLI on npm: `init`, `add`, `create`, `doctor` | Yes |
| `packages/flutter/` | `lampung_design_system` on pub.dev: tokens, theme and widgets | Yes |
| `scripts/` | Build scripts (`build-tokens`, `build-docs`, `build-examples`, `build-icons`, `build-aksara`, `build-site`, `sync`) | Yes |
| `tests/` | `node --test` suites for tokens, contrast, docs, CLI and the built site | Yes |
| `skills/` | `lampung-design-system` plus vendored companion skills (antislop family, apple-design, microinteractions) | Companion skills are vendored copies; update by re-copying |

## Commands

```sh
npm run build:tokens   # tokens.json -> css/tokens.css, dist/* (JS/TS, Flutter, shadcn)
npm run build:docs     # docs/spec -> docs/components (ID), docs/en/components (EN), skill references; checks icons, classes, links
npm run build:examples # docs/examples/src -> generated example pages; checks classes, icons, links, ids
npm run build:icons    # icons/icons.json -> fonts/*.woff2 (python3 + npm; caches tools in .cache/)
npm run build:aksara   # aksara/glyphs/*.svg -> aksara/lds-aksara.svg sprite + js/aksara data
npm run build          # everything above that does not need python
npm run build:site     # assembles site/ for Cloudflare (landing at /, docs at /docs, registry at /r)
npm test               # node --test tests/ (tokens, contrast, docs, CLI, site)
npm run serve          # http://localhost:5173
npm run lint:commits   # conventional commit check for the current branch
python3 skills/antislop-human/contrast-check.py "#FFFFFF" "#0B6E4F"   # verify any color pairing
```

Node 20 or newer. Flutter work: `cd packages/flutter && flutter test`.

## Rules for changes

- **Values only change in `tokens/tokens.json`.** Every color needs a light and a dark entry. Run `npm run build:tokens` and commit the generated files with the change.
- **Components read tokens, never raw values.** No theme-specific selectors in `components.css`.
- **Specificity stays low.** Resets use `:where()`; components are single classes plus modifiers; state uses ARIA attributes or `is-*` classes.
- **Motion uses the motion tokens** and the recipes in `references/motion.md`. Exit is always shorter than enter and uses `--ease-exit`. Respect `prefers-reduced-motion`.
- **Accessibility is not optional.** Real buttons, links and inputs; 44 px targets; visible `:focus-visible` ring; Escape closes layers and returns focus; contrast computed for every new pairing in both themes (WCAG 2.2 AA).
- **Gold is identity, not action.** `--gold` marks ornament, aksara, badges of identity and highlights. Never use it for a primary button or as text on white (use `--gold-text`).
- **Aksara Lampung is respectful decoration.** Use the glyphs from `aksara/` (original drawings, see `references/aksara.md`), always with a Latin reading next to them or in `aria-label`. Never set body text, form labels or anything people must read in aksara only.
- **Unofficial means unofficial.** Never use the provincial coat of arms, regional government logos or names of real agencies as if this were their product. Example agencies are fictional ("Dinas Layanan Kota Contoh").
- **Copy** follows `antislop-copywriting`: outcome-named buttons, sentence case, no em dashes, no buzzwords, no invented claims (users, testimonials, statistics about the project).
- **Never name or imitate other design systems or products** in the system's own text, code comments or docs.
- **Reuse first.** Read `references/components.md` before adding anything. For a whole screen, start from the closest page in `docs/examples/`.
- **Adding a component:** CSS in `components.css`, behavior (if any) in `js/lds.js` behind a `data-lds-*` attribute and wired in `init()` (plus `js/lds.d.ts`, and `react/index.tsx` if React must own its state), an English spec in `docs/spec/<slug>.mjs` and its Indonesian override in `docs/spec/id/<slug>.mjs` (see `docs/spec/_GUIDE.md`), then `npm run build:docs`. Add an example to `docs/gallery.html`.
- **Generated files** (`css/tokens.css`, `dist/**`, `fonts/*.woff2`, `docs/components/**`, `docs/en/components/**`) are never edited by hand.

## Verifying a change

1. `npm run build` and `npm test`.
2. `npm run serve`, open http://localhost:5173/docs/ (and `/docs/en/`), visit every page you touched in light and dark, at desktop width and at 375 px.
3. Click every control you touched, use it by keyboard, and check the browser console for errors.
4. Run `references/checklist.md` and the antislop Delivery Gate.

## Release

- Versions follow SemVer; the core package, the CLI and the Flutter package share one version.
- `CHANGELOG.md` follows Keep a Changelog, written from the conventional commits.
- npm: `lampung-design-system` (core) and `lampung-ds` (CLI). pub.dev: `lampung_design_system`. The release workflow in `.github/workflows/release.yml` publishes all three from a `v*` tag.
- The site deploys to Cloudflare (`wrangler.jsonc`) at https://lampung.kartadinata.app.
