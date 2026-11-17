# Contributing

https://lampung.kartadinata.app/docs/en/guide/kontribusi

LDS is a community open source project. Anyone can report a problem, propose a component, improve a translation or send code. This page explains how.

## Reporting a bug or proposing a component

All reports and proposals go through [GitHub issues](https://github.com/mralifakbar/lampung-design-system/issues). Search first for an existing issue; if there is one, add what you know there.

- **Bug.** Write what you did, what you expected and what happened. Name the page or component, the browser and device, light or dark theme, and attach a screenshot when you can.
- **Accessibility problem.** Name the assistive technology you used (for example NVDA or TalkBack) and the part that could not be used. These reports get priority.
- **Component proposal.** Describe the real need: which service, who uses it, and why the existing components are not enough. Read the [Components](../components/index.md) list first; the need is often already covered.

## Local setup

You need Node 20 or newer. Python 3 is used for the local server, the contrast checker and the icon build.

```
git clone https://github.com/mralifakbar/lampung-design-system.git
cd lampung-design-system
npm run build    # tokens, aksara, docs and examples
npm test         # every test suite
npm run serve    # http://localhost:5173
```

Open http://localhost:5173/docs/ and http://localhost:5173/docs/en/. Check every page you changed in light and dark, at desktop width and at 375 px, with a mouse and with the keyboard.

## Commit rules

This repository uses [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). Commit messages are in English and have this shape:

```
<type>(<optional scope>): <subject in lowercase imperative, no trailing period, max 72 chars>

<optional body: why, wrapped at 72>

<optional footer: BREAKING CHANGE: ..., Refs: #12>
```

- **Types:** `feat`, `fix`, `docs`, `style` (formatting only), `refactor`, `perf`, `test`, `build` (build system, generated output, packaging), `ci`, `chore`, `revert`.
- **Scopes** (pick the area touched): `tokens`, `css`, `js`, `react`, `icons`, `type`, `aksara`, `docs`, `i18n`, `examples`, `landing`, `cli`, `flutter`, `skills`, `scripts`, `deploy`, `deps`, `release`.
- **Small commits, always.** One logical change per commit: a token change, one component, one docs page, one example screen, one CLI command. Commit as soon as that change builds and passes its checks; never pile up a day of work into one commit. If a message needs "and" to describe two unrelated things, split it. Generated files go in the same commit as the source change that produced them.
- **Breaking changes** add `!` after the type or scope (`feat(tokens)!: rename accent-text`) and a `BREAKING CHANGE:` footer.
- **Never commit** secrets, `.env` files, `node_modules`, build output under `site/` or `apps/landing/dist/`, or `.cache/`.
- `commitlint.config.mjs` encodes these rules; `npm run lint:commits` checks the branch.

Example commit messages:

```
feat(css): add masthead
fix(js): return focus to the trigger when a sheet closes
docs(i18n): translate the date field spec to indonesian
build(tokens): regenerate css variables after gold-text change
feat(tokens)!: rename accent-text

BREAKING CHANGE: the accent-text token has a new name; update every use.
```

## Adding a component

Before writing code, make sure the need is not already covered and the proposal has been discussed in an issue. Then:

- Write the CSS in `css/components.css`. Components read tokens only, never raw values, and use no theme-specific selectors.
- If it needs behavior, add it to `js/lds.js` behind a `data-lds-*` attribute, wire it in `init()`, and update `js/lds.d.ts` (plus `react/index.tsx` if React must own its state).
- Write the English spec in `docs/spec/<slug>.mjs` and its Indonesian override in `docs/spec/id/<slug>.mjs`. The guide is `docs/spec/_GUIDE.md`.
- Run `npm run build:docs`. The build rejects icon names that do not exist, classes missing from the CSS, links to specs that do not exist, and em dashes.
- Add an example to `docs/gallery.html`.
- Compute the contrast of every new color pair in both themes, and check 44 px targets, the focus ring and keyboard use.

## Helping with translation

The documentation is written in Indonesian first and English second. Every page people read must exist in both languages. Code, code comments and commit messages stay in English.

- Guides like this page live in `docs/guides/`, one file holding both languages.
- English component specs live in `docs/spec/`; their Indonesian overrides in `docs/spec/id/`. When it runs, `npm run build:docs` reports how many components are still in English on the Indonesian site.
- Follow the [Writing](penulisan.md) guide: plain language, sentence case, buttons that name the outcome, no em dashes.
- Text set in aksara Lampung should be checked by a speaker or teacher of had Lampung. Their help is especially valuable.

## Code of conduct

This project is open to anyone who wants to help make public services easier to use. We expect every participant to:

- Be polite and respect others, whatever their background, ability, religion, ethnicity, gender or level of experience.
- Criticize ideas, not people, and take feedback with an open mind.
- Never harass or insult anyone, or share anyone's personal data.
- Never use the project for political campaigns or to speak in the name of a government agency.

If you experience or see behavior that breaks these rules, email [alif@kartadinata.app](mailto:alif@kartadinata.app). Say what happened, when and where.

## Partnership

If your team, campus, community or institution wants to use LDS in a project, test a service with citizens, or develop components together, contact [alif@kartadinata.app](mailto:alif@kartadinata.app). LDS stays an unofficial community project; a partnership does not make it the product of any agency.
