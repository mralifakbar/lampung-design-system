# Motion

Calm by default. Things arrive on a spring with no overshoot, leave on a short accelerating curve, and can be redirected mid-flight because every transition starts from where the element is now. The reasoning is in `skills/apple-design`; this file is the system's concrete values.

## Principles

1. **Respond on press.** Feedback starts on pointer down, in 90 ms. Buttons sink to `scale(0.97)`, icon buttons to `0.9`, checkboxes and radios to `0.88`, cards to `0.985`. Release goes back on the snappy spring.
2. **Enter slow, leave fast.** Entrances 240 to 560 ms; exits 160 to 180 ms on `--ease-exit`, never bouncing.
3. **Same path back.** A sheet that rose from the bottom drops to the bottom; a drawer leaves to its side; menus grow from the corner nearest their trigger (`transform-origin`).
4. **Bounce is earned.** `--spring-momentum` (damping 0.8) only after a gesture that carried momentum. Everything a tap opens uses damping 1.0.
5. **Interruptible.** Use CSS transitions (they start from the current computed value), never keyframes, for anything a user can reverse. Never block input during a transition.
6. **Reduced motion.** Under `prefers-reduced-motion: reduce` springs and slides become 120 ms cross-fades, overlays stop scaling, loops play once; spinners keep turning because they report work.

## Tokens

| Duration | Value | Use |
|---|---|---|
| `--d-instant` | 120ms | Press feedback, hover |
| `--d-fast` | 160ms | Color and opacity |
| `--d-exit` | 180ms | Anything leaving |
| `--d-standard` | 240ms | Text swaps, tab panels, fades |
| `--d-snappy` | 360ms | Snappy spring length |
| `--d-considered` | 480ms | Progress values, chart data changes |
| `--d-smooth` | 560ms | Smooth spring length |
| `--d-momentum` | 600ms | Momentum spring length |

| Curve | Value | Use |
|---|---|---|
| `--ease-enter` | cubic-bezier(0.16, 1, 0.3, 1) | Fades in, text, small reveals |
| `--ease-standard` | cubic-bezier(0.22, 1, 0.36, 1) | Color and state changes |
| `--ease-inout` | cubic-bezier(0.65, 0, 0.35, 1) | Things already on screen moving (progress, bars) |
| `--ease-exit` | cubic-bezier(0.7, 0, 0.84, 0) | Dismissals |

| Spring | Damping / response | Pair with | Use |
|---|---|---|---|
| `--spring-snappy` | 1.0 / 0.27 s | `--d-snappy` | Presses, toggles, thumbs, small indicators |
| `--spring-smooth` | 1.0 / 0.42 s | `--d-smooth` | Panels, sheets, sliding indicators, height changes |
| `--spring-momentum` | 0.8 / 0.34 s | `--d-momentum` | After a flick only |

```css
.panel { transition: transform var(--d-smooth) var(--spring-smooth); }
.panel.is-leaving { transition: transform var(--d-exit) var(--ease-exit); }
```
Flutter: `LdsMotion.smoothSpring` (SpringDescription), `LdsMotion.standardCurve` (Cubic), `LdsMotion.smooth` (Duration).
JS: `import { easing } from 'lampung-design-system'; easing('spring-smooth')`.

## Recipes used by the components

- **Overlay enter** (dialog, menu, popover, palette): opacity over `--d-fast` on `--ease-enter`; transform from `translateY(8px) scale(0.96)` (menus `scale(0.96) translateY(-4px)`) on the smooth spring. **Exit**: opacity and `translateY(4px) scale(0.98)` over `--d-exit` on `--ease-exit`, then `visibility: hidden` delayed by the exit duration.
- **Scrim**: fades in 240 ms enter, out 180 ms exit.
- **Sheet**: rises on the smooth spring; while open, the page behind scales to 0.94 and moves down 8 px. Drag follows the pointer 1:1, rubber-bands upward (`over·dim·0.55 / (dim + 0.55·|over|)`), and on release projects the end point `y + (v/1000)·0.99/(1−0.99)`; past half its height it dismisses, otherwise it springs back on the momentum spring.
- **Sliding indicators** (segmented thumb, tab ink, sidebar highlight, table-of-contents ink): one element translates on the smooth spring; labels never light up on their own.
- **Switch**: thumb travels on the smooth spring; while held it widens 6 px toward its destination (snappy spring); the track cross-fades to the accent over 240 ms.
- **Checkbox tick**: stroke draws in 260 ms on the enter curve (40 ms delay); radio dot scales in on the snappy spring.
- **Icon swap** (copy, like, play): old glyph scales to 0.5 and blurs 4 px while the new one settles on the snappy spring.
- **Text swap**: new copy rises 0.3 em with a 4 px blur in 240 ms; old leaves upward with 2 px blur.
- **Stagger**: list items follow 35 ms apart; the whole stagger stays under 400 ms.
- **Height**: accordions and collapses animate `grid-template-rows: 0fr → 1fr` on the smooth spring; content fades in 80 ms after the space opens and leaves before it closes.
- **Numbers**: rolling digits, each column slides to its value on the smooth spring.
- **Loading button**: label blurs out, spinner scales in on the snappy spring, the result rises in; width never changes.
- **Toasts**: newest in front, older ones offset 10 px and scaled −5% each; hover fans them 66 px apart and pauses dismissal (4 s).
- **Page change** (docs shell): old content leaves in 180 ms (fade, −6 px, 4 px blur), new rises 10 px from a 6 px blur over 420 ms on the enter curve, via the View Transitions API.
- **Page to page** (multi-page apps on `.shell`): opt in once with `@view-transition { navigation: auto; types: lds-page; }`. The sidebar and the bar hold still, old content fades out in `--d-fast` on `--ease-exit`, new content fades up 6 px over `--d-standard` on `--ease-enter`. A paint-time snippet right after `</aside>` restores the sidebar scroll and starts the highlight on the link you left, then glides it to the current link on the smooth spring (snippet and keys: `components/app-shell.md`). Reduced motion: a 120 ms fade, no glide.
- **Scrollbars that only show while scrolling**: the shell sidebar keeps its scrollbar transparent and fades it in over `--d-standard` while it scrolls (`.is-scrolling`).

## Never

Endless decorative loops, bounce on things a tap opened, fade-up on every element, animating layout properties other than grid rows, motion that blocks input, different enter and exit paths.
