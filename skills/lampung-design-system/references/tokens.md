# Tokens

Source: `tokens/tokens.json`. Generated: `css/tokens.css` (CSS variables), `dist/tokens.mjs` (JS/TS), `dist/flutter/lds_tokens.dart` (Flutter). Regenerate with `npm run build:tokens`.

Themes: light on `:root` and `[data-theme="light"]`; dark on `[data-theme="dark"]`; `[data-theme="system"]` follows the OS. Any element can carry `data-theme`, so a subtree can be dark inside a light page.

## Surfaces (outermost to innermost)

| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg-canvas` | #FFFFFF | #0B0B0D | The page |
| `--bg-base` | #FFFFFF | #0B0B0D | Inputs, rows inside a filled group, white cards |
| `--bg-fill` | #F4F4F6 | #18181B | Cards, grouped lists, stages: grouping without shadow |
| `--bg-recessed` | #EFEFF2 | #26262A | Wells, search field, gray buttons |
| `--bg-elevated` | #FFFFFF | #1F1F23 | Menus, dialogs, sheets |
| `--bg-inverse` | #1C1C20 | #F4F4F5 | Toasts, tooltips, banners |
| `--bg-material` | white 78% | zinc 72% | Nav bar and tab bar only, with blur(20px) saturate(180%) |
| `--bg-scrim` | 9,9,11 at 32% | black 56% | Behind modal layers |
| `--bg-tint`, `--bg-tint-strong` | ink 4%, 7% | white 5%, 9% | Hover and pressed fills |
| `--bg-track`, `--bg-switch-off`, `--bg-segmented`, `--bg-segmented-thumb`, `--bg-skeleton` | | | Control tracks, already tuned per theme |

## Text (ratios against the canvas)

| Token | Light | Dark | Use |
|---|---|---|---|
| `--text-strong` | #0A0A0B 19.8:1 | #FAFAFA 18.8:1 | Titles, values |
| `--text-default` | #27272A 14.9:1 | #E4E4E7 15.5:1 | Body |
| `--text-subtle` | #5C5C66 6.6:1 | #A1A1AA 7.7:1 | Secondary text |
| `--text-muted` | #6B6B75 5.3:1 | #8E8E96 6.1:1 | Placeholders, meta (still AA on the fill) |
| `--text-faint` | #C4C4CA | #48484F | Non-text only: chevrons, grabbers, disabled marks |
| `--accent-text` | #0A6246 6.7:1 | #5FD3A6 9.4:1 | Links, tinted labels |

## Lines

Outlines are inset box-shadow rings (`box-shadow: inset 0 0 0 1px var(--line)`), never border plus shadow, so they never shift layout.
`--line` card ring · `--line-strong` secondary buttons, chips · `--line-control` input and checkbox edges (3:1 on their own) · `--hairline` list separators · `--focus` focus ring.

## Accent and status

`--accent` #0B6E4F stays the same in dark because white on it holds 5.2:1. `--accent-hover`, `--accent-pressed`, `--accent-tint`, `--accent-tint-strong`, `--accent-ring` (input focus halo).
Status sets: `--success | --warning | --danger | --neutral` each with `-text` (AA on its tint) and `-tint`. Use only for real states, always with an icon and words.
Icon chip hues: `--tile-blue #0B7BC4`, `--tile-red #D93A2B`, `--tile-orange #C2410C`, `--tile-green #15803D`, `--tile-gray #71717A` (white text passes AA on all five; same in both appearances). They back list icon chips (`.lrow__icon`), file tile tones and swipe actions; never a card or a figure.
Device frame: `--device-body` (light #1C1C20, dark #2A2A30), `--device-edge` (#4A4A52, #5A5A63) and `--device-island` (#000000) draw the phone body of `.device`; use them for nothing else.
Inverse and on-accent text: `--text-inverse` on `--bg-inverse` (toasts, tooltips), with `--on-inverse-tint` and `--on-inverse-line` for hovers and dividers inside them; `--text-on-accent` on accent fills. `--bg-material-solid` replaces `--bg-material` when people ask for reduced transparency; `--skeleton-shine` is the sweep inside `.skel`.
Chart series, fixed order, validated for color-blind separation: `--series-1..4` (light #0B6E4F #E8890C #0E9F8E #9333EA; dark #2BB585 #C47A0C #17A493 #A970F0). Series 2 is under 3:1 on white: always label it.

## Type

Family `--font` Plus Jakarta Sans (fallback system UI), `--mono` JetBrains Mono. Each style is `--type-<name>` (a `font` shorthand) plus `--tracking-<name>`:

| Style | Size/line | Weight | Tracking | Use |
|---|---|---|---|---|
| display | 56/60 | 600 | −0.035em | Doc and marketing heads |
| large-title | 34/41 | 700 | −0.028em | Phone tab roots |
| title-1 | 28/34 | 600 | −0.022em | Screen titles, big values |
| title-2 | 22/28 | 600 | −0.018em | Section heads |
| title-3 | 20/25 | 600 | −0.014em | Dialog and sheet titles |
| headline | 17/22 | 600 | −0.010em | Nav title, card title |
| body | 15/22 | 400 | −0.005em | Content |
| body-strong | 15/22 | 500 | −0.005em | Emphasis in content |
| subhead | 14/20 | 400 | 0 | List subtitles |
| footnote | 13/18 | 400 | 0 | Meta, helper text |
| caption | 13/18 | 500 | +0.010em | Group labels, eyebrows, small meta. 13 px is the floor for words people read; only numbers in badges, counts and chart ticks go smaller |

```css
.title { font: var(--type-title-2); letter-spacing: var(--tracking-title-2); color: var(--text-strong); }
```
Numbers that change or align use `font-variant-numeric: tabular-nums`. Body copy runs 60 to 72 characters a line.

## Space, radius, size

Space is a 4 pt grid: `--s-2 … --s-72`. Related items 8 to 12 apart, groups 20 to 28, sections 48+. Phone gutter 20.
Radius: `--r-xs 6` badges · `--r-sm 8` small buttons, icon chips · `--r-md 12` buttons, inputs · `--r-lg 16` cards, lists · `--r-xl 22` sheets, dialogs · `--r-pill` chips and switches only. Radii nest concentrically: inner = outer − padding.
Sizes: `--size-control 44`, `--size-control-md 36`, `--size-control-sm 28`, `--size-control-lg 52`, `--size-touch-min 44`, `--size-measure 680` (reading column width; use `max-width: var(--size-measure)` for long text).

## Elevation and finish

`--shadow-xs/sm/md/lg` tinted toward the ink. lg for menus, dialogs, sheets, toasts; md for the floating button; sm for selected thumbs. `--shadow-thumb` for switch and slider thumbs.
`--finish-primary`: a soft inner top light on filled buttons and selected controls (checkbox, radio, step dot). `--finish-secondary` for outlined buttons. Never on surfaces.

## Filters

`--map-tiles`: `none` in light; in dark an inverted, desaturated, dimmed treatment for raster map tiles so they do not glare (used by the map component). Themed in `tokens.json` under `filter`.

## Motion

See `motion.md`. Variables: `--d-instant 120ms`, `--d-fast 160`, `--d-exit 180`, `--d-standard 240`, `--d-snappy 360`, `--d-considered 480`, `--d-smooth 560`, `--d-momentum 600`; curves `--ease-enter`, `--ease-exit`, `--ease-standard`, `--ease-inout`; springs `--spring-snappy`, `--spring-smooth`, `--spring-momentum` (CSS `linear()` samples of real springs).
