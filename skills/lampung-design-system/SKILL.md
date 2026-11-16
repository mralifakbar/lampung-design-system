---
name: lampung-design-system
description: Build any interface (plain HTML, Next.js or another web framework, Flutter) with Lampung Design System. Use whenever a task touches UI in a project that uses this system, or when asked to design, build, review or theme screens "in LDS style". Covers tokens, components, icons, motion, dark mode, and the rules that keep the result looking like the system.
---

# Lampung Design System

A white canvas, one Lampung green, siger gold for identity, and type that tightens as it grows. Grouping comes from a quiet fill, depth only from layers that float, and every moving part runs on a spring you can interrupt.

This skill is the entry point. Read it fully, then open the reference that matches the task:

| Task | Read |
|---|---|
| Any color, type, spacing, radius, elevation value | `references/tokens.md` |
| Picking a component (always, before writing markup) | `references/components.md`: the catalog, one row per component with when to use it |
| Using a component | `references/components/<slug>.md`: when, when not (and what instead), where it goes, markup, variants, states, motion, accessibility, React |
| Anything that moves: transitions, gestures, overlays | `references/motion.md`, then the Motion recipes in `references/components/` (press-feedback, enter-and-exit, list-stagger, view-swap, shared-element…) |
| Feedback on a control: confirm in place, text morph, swipe rows, hints, haptics | `references/microinteractions.md`, then the Microinteraction recipes in `references/components/` |
| Wiring the system into HTML, Next.js, Flutter | `references/platforms.md` |
| Icons | `references/icons.md` |
| Before you hand anything over | `references/checklist.md` |

Companion skills live next to this one in `skills/`. Load them for the concern at hand; this system already follows them, they explain why:

- `apple-design`: response, interruptibility, springs, momentum, materials, typography. The motion and gesture model here comes from it.
- `microinteractions`: trigger, rules, feedback, loops and modes. Use its eight-question diagnostic on any control that responds to people; the system's own recipes are in `references/microinteractions.md`.
- `antislop` (core) plus `antislop-ui`, `antislop-copywriting`, `antislop-human`, `antislop-layoutmobile`, `antislop-code`: the filter every screen and every sentence must pass. Run its Delivery Gate before delivering UI.

## Where things live (repo root)

```
tokens/tokens.json      single source of truth for every value
css/tokens.css          generated CSS variables (light on :root, dark on [data-theme="dark"])
css/components.css      every component, reads tokens only
css/lds.css           fonts + tokens + components in one import
js/lds.js             optional behaviors via data-lds-* attributes (types: js/lds.d.ts)
react/index.tsx         React bindings for the components whose state React owns
fonts/                  Solar icon fonts (line + fill), ligature based
icons/icons.json        which icon names exist
dist/tokens.mjs         tokens for JS/TS;  dist/flutter/lds_tokens.dart for Flutter;  dist/shadcn/ theme for shadcn/ui
docs/                   live documentation, renders the same boards as the Claude canvas
```

Never hand-edit generated files (`css/tokens.css`, `dist/*`). Change `tokens/tokens.json`, then `npm run build:tokens`.

## The identity, in six decisions

1. **White canvas.** `--bg-canvas` is pure white. Cards and lists sit on `--bg-fill` (#F4F4F6) with no shadow. Never put a fill on a fill: inside a filled group use `--bg-base`.
2. **One accent.** `--accent` #0B6E4F marks the primary action, the current selection, and links. Text in the accent uses `--accent-text` (darker in light, lighter in dark). If a screen has three green things, two are wrong.
3. **Shadows only on what floats.** Menus, popovers, dialogs, sheets, toasts, the floating action button. Resting content never casts a shadow.
4. **Blur only where content scrolls under it.** The navigation bar and the tab bar. Never on cards, never stacked.
5. **Type moves as a set.** Plus Jakarta Sans, three weights (400, 500, 600; 700 only for the phone large title). Size, weight and tracking change together: large text tightens (−0.035em at 56px), small text opens (+0.01em at 12px), body sits at −0.005em.
6. **Motion is calm and interruptible.** Enter on a critically damped spring, leave faster on the exit curve, start every transition from the current on-screen value. Bounce only after a flick.

## Hard rules

- **Reuse, never reinvent.** Every need starts in `references/components.md`. If a component covers it, use its markup as written. If nothing fits, the system gets a new component (see `AGENTS.md`), never a one-off look on one page. A new class that gives something clickable its own radius, background and padding is almost always a duplicate.

- Use tokens, never raw values. If a value is missing, add it to `tokens/tokens.json` with a light and a dark entry.
- Light is the default. Every screen must also work in dark (`data-theme="dark"`); check both.
- Every interactive element is a real `<button>`, `<a href>` or `<input>`, at least 44 by 44, reachable by keyboard, with the focus ring (`--focus`, 2px, offset 2px).
- Text contrast is computed, not eyeballed: run `python3 skills/antislop-human/contrast-check.py <fg> <bg>`. Body 4.5:1, large 3:1, control edges 3:1.
- Every view that shows data designs four states: loading (skeleton that mirrors the layout), empty (why it is empty + the one action that fills it), error (what failed + retry), loaded.
- Copy: sentence case, specific verbs that name the outcome ("Save changes", not "Submit"), no em dashes, no buzzwords, no invented claims about a real product (customers, testimonials, statistics). Example screens use plausible example values, not bracket placeholders, and say once per page that they are examples.
- Icons are Solar via the icon font. Only names in `icons/icons.json` render; an unknown name renders blank. Add new ones there and rebuild (`references/icons.md`).
- No gradients, glows, decorative dots, stripes or endless loops. A pulse marks a live state and stops after three cycles.
- Do not mention or imitate the products this system was influenced by; it has its own identity.

## Choosing components quickly

| Need | Use |
|---|---|
| Main action | `.btn.btn--primary` (one per view) |
| Alternative action | `.btn--secondary`; quieter positive: `.btn--tinted`; inline: `.btn--plain` |
| Destructive | `.btn--danger-tinted` inline, `.btn--danger` in a confirm dialog |
| Costly but not dangerous confirm | hold (`[data-lds-hold]`) or slide (`[data-lds-slide]`) |
| 2 to 5 views of the same content | segmented control `.seg` |
| Sibling sections of a page | tabs `.tabs` |
| Setting that applies at once | `.switch` |
| Several independent choices | `.check` checkboxes; one of few: radios; options with detail: `.rcard` |
| Task that keeps context (phone) | `.sheet`; wide screens: `.drawer` |
| Interrupting decision | `.dialog` (rare); destructive: `role="alertdialog"` with `.dialog__icon` |
| Confirm something that happened | toast via `toast()`; persistent condition: `.alert` or `.banner` |
| Number that changes | `.roll` rolling digits, tabular figures |
| Pick one of many (long list) | `.select` with a listbox; searchable or server-backed: combobox |
| Label and value pairs in a box | `dl.kv-list > .kv` (`--stack` for long values) |
| A few headline figures | `.stat-row` (no cards) |
| A page of sections | `.sections > .section`; the one next step: `.spotlight`; destinations: `.link-grid > .link-card` |
| Steps to follow or what is included | `.lrow--num` / `.lrow--check` rows in a `.list--fill` |
| App frame with a sidebar | `.shell[data-lds-shell]`; page loading: `.navprogress` |
| Page-level form or confirm | `dialog.modal` (sheet on phones) or `.overlay`, closed with `closeModal()` |
| Headline figure with its comparison | `.kpi` card (value, `.delta`, spark or bars); several in an `.auto-grid` |
| Up or down against a period | `.delta` trend delta (`--up`/`--down`, `--good`/`--bad`, `--pill`) |
| A chart | `section.chart-card` around `.chart[data-lds-chart='{…}']` or `drawChart(el, config)`: line, area, bar, combo, donut, gauge; also `.hbars` ranked bars, `ol.funnel`, `.target`, `.uptime`, `.hm` heatmap. Every chart has a text label and a table or summary fallback |
| Records to search, filter, sort, select, page | `.dtable[data-lds-table]` data table (small static table: `.table`) |
| Work moving through stages | `.kanban[data-lds-kanban]` (drag and keyboard) |
| Meetings and events by day, week, month | `.evcal[data-lds-events]`; a single date: `.cal`; a period: `.daterange[data-lds-daterange]` |
| People or rooms over hours of a day | `.lanes-box > .lanes`; rooms or seats on a plan: `.floor` |
| Places, a route | `.map[data-lds-map]`; stops along one route: `.route[data-lds-route]` |
| Messages or notifications to triage | `.inbox[data-lds-inbox]` inbox list |
| Settings by channel or permissions by role | `table.matrix[data-lds-matrix]` check matrix |
| Invoice, receipt, letter to print or send | `article.paper` (`.paper--receipt` for a till receipt) |
| Products to tap into a sale | `button.ptile` product tiles in a `.ptile-grid`; files and folders: `.file-grid > .file-tile` |
| Landing page | `.hero`, `.msec` sections, `.feature` rows, plans with `[data-lds-billing]`, `table.compare`, `.testimonial`, FAQ as `.acc` in an `.msec`, `.cta-band`, `footer.site-footer` |
| Phone app screens | `.device[data-lds-device]` frame, `.navstack[data-lds-navstack]` push and pop, pull to refresh with `[data-lds-refresh]`, `.navbar` and `.tabbar` |
| React app | `react/index.tsx` bindings instead of `data-lds-*` (`references/platforms.md`) |

The full catalog with markup is in `references/components.md`.

## Full examples

Before composing a whole screen, look at `docs/examples/`: `landing.html` (a marketing page), `dashboard/` (an admin app of 33 pages on one `.shell`, generated by `npm run build:examples` from `src/dashboard/`), and `mobile.html` (phone app screens). They use only the system's classes and behaviors, so copy their structure rather than inventing layout.
