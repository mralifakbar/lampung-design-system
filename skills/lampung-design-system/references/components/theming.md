# Theming

Group: Foundations. Docs page: `docs/components/theming.html`.

Light and dark come from one attribute: `data-theme="light|dark|system"` on `<html>` or any subtree. Components read only tokens, so they switch by themselves; you never write dark-mode CSS for a component.

## Use it when
- Setting up a page: put `class="lds"` and `data-theme` on `<html>`, and call `restoreTheme()` before first paint so the saved choice is used without a flash.
- Offering an appearance switch (Light, Dark, System) in settings or a sidebar footer.
- A region must stay dark (or light) regardless of the page: a code preview, a media player, a marketing band. Put `data-theme` on that element only.
- Writing project CSS on top of the system: use the tokens (`--bg-fill`, `--text-subtle`, `--line`, `--accent`) so your additions switch with the theme.

## Use something else when
- Showing a status (approved, overdue) with color: use [Badge](badge.md). Status colors come with words and an icon; never theme a region to signal state.
- Picking a view of the same content (not appearance): use [Segmented control](segmented-control.md).
- A setting that turns a feature on or off: use [Switch](switch.md). Appearance has three values, so it is a segmented control, not a switch.
- Colors for data series: use [Chart principles](chart-principles.md). `--series-1..4` are already tuned per theme and fixed in order.

## Where it goes
`data-theme` belongs on `<html>` for the page. The switch lives in settings, the account menu or the sidebar footer, never in the main toolbar. Scoped themes go on the outermost element of the region that should differ.

## Anatomy
| Part | What it is |
|---|---|
| `[data-theme="light"]` | The default (also what `:root` gets with no attribute). |
| `[data-theme="dark"]` | Dark tokens for this element and everything inside it. |
| `[data-theme="system"]` | Follows the operating system through `prefers-color-scheme`, live. |
| `.lds` | Required on the root (or subtree): base font, text color, canvas background, resets. A scoped theme needs `.lds` too, so it paints its own background. |
| `[data-lds-theme]` | Optional. A button with `data-lds-theme="dark"` calls `setTheme("dark")` on click after `init()`. |

## Markup

**Appearance switch.** A segmented control whose buttons carry `data-lds-theme`. It switches this whole page and remembers the choice in `localStorage`.
```html
<div class="seg" role="group" aria-label="Appearance" data-lds-segmented style="width: 300px;">
  <span class="seg__thumb"></span>
  <button class="seg__btn" aria-pressed="true" data-lds-theme="light"><span class="ic ic--sm" aria-hidden="true">light_mode</span>&nbsp;Light</button>
  <button class="seg__btn" aria-pressed="false" data-lds-theme="dark"><span class="ic ic--sm" aria-hidden="true">dark_mode</span>&nbsp;Dark</button>
  <button class="seg__btn" aria-pressed="false" data-lds-theme="system"><span class="ic ic--sm" aria-hidden="true">contrast</span>&nbsp;System</button>
</div>
```

**Scoped theme.** The same card in a light and a dark subtree, side by side on one page. Nothing in the card knows which theme it is in.
```html
<div class="auto-grid" style="--min: 260px;">
  <div class="lds" data-theme="light" style="padding: 20px; border-radius: var(--r-lg);">
  <div class="card stack" style="--gap: 12px;">
    <div class="cluster" style="justify-content: space-between;"><span class="card__title">Micro business permit</span><span class="badge badge--success">Open</span></div>
    <div class="progress"><span class="progress__fill" style="transform: scaleX(0.72);"></span></div>
    <div class="cluster"><button class="btn btn--primary btn--md">Continue</button><button class="btn btn--secondary btn--md">Requirements</button></div>
  </div>
  </div>
  <div class="lds" data-theme="dark" style="padding: 20px; border-radius: var(--r-lg);">
  <div class="card stack" style="--gap: 12px;">
    <div class="cluster" style="justify-content: space-between;"><span class="card__title">Micro business permit</span><span class="badge badge--success">Open</span></div>
    <div class="progress"><span class="progress__fill" style="transform: scaleX(0.72);"></span></div>
    <div class="cluster"><button class="btn btn--primary btn--md">Continue</button><button class="btn btn--secondary btn--md">Requirements</button></div>
  </div>
  </div>
</div>
```

**Page setup without a flash.** Read the saved choice before the body paints. `restoreTheme()` sets the attribute and returns the mode, so you can sync the switch.
```html
<html lang="en" class="lds" data-theme="light">
<head>
  <link rel="stylesheet" href="css/lds.css">
  <script type="module">
    import { init, restoreTheme } from './js/lds.js';
    const mode = restoreTheme(document.documentElement, 'light');
    document.querySelectorAll('[data-lds-theme]').forEach((b) => b.setAttribute('aria-pressed', String(b.getAttribute('data-lds-theme') === mode)));
    init();
  </script>
</head>
```

## Variants and sizes
| Class or attribute | When |
|---|---|
| `light` | Default. White canvas, groups on `--bg-fill`. |
| `dark` | Near-black canvas (#0B0B0D). Same accent, lifted series colors, softer skeleton shine. |
| `system` | Follows the OS and updates live when it changes. A good default for the switch once the person has seen both. |

## Motion and microinteractions
- A theme change is instant on purpose. `setTheme()` (through `swapTheme()`) adds `.lds-theme-swap` to `<html>` for 120 ms, which sets `transition: none` on everything, so colors do not fade in patches at different speeds.
- The one exception is the segmented thumb, which still slides on `--spring-smooth` over `--d-smooth` so the switch itself feels physical.
- Reduced motion changes nothing here; the swap is already instant.

## Accessibility
- Both themes meet the same contrast: `--text-subtle` is 6.6:1 in light and 7.7:1 in dark; `--accent-text` 6.7:1 and 9.4:1. Project colors must be checked in both.
- The switch is a group of buttons with `aria-pressed` (the segmented control), labelled "Appearance", with icon and text in each button.
- `setTheme` dispatches `lds:theme` with `{ mode }` on the root; use it to update `aria-pressed` on switches that `init()` did not create.
- Do not convey anything by theme alone; a scoped dark band still needs its own heading and text.

## Do
- Use tokens for every color in project CSS so it follows the theme.
- Check every new screen in both light and dark before shipping.
- Set the theme before first paint with `restoreTheme()` in the head.

## Don't
- Write `@media (prefers-color-scheme: dark)` rules for components; set `data-theme="system"` instead.
- Hard-code hex values or `#fff` backgrounds in project styles.
- Animate the theme change with a long cross-fade.

## Behavior (plain HTML)
`setTheme(mode, root = document.documentElement)` sets `data-theme`, saves it under `localStorage` key `lds-theme` and dispatches `lds:theme`. `restoreTheme(root, fallback = "light")` reads it back and returns the mode. `swapTheme(fn)` runs any DOM change with transitions held off for 120 ms. Buttons with `data-lds-theme="light|dark|system"` call `setTheme` after `init()`.

## Related
[Segmented control](segmented-control.md) · [Icon](icon.md) · [Chart principles](chart-principles.md) · [Layout primitives](layout-primitives.md)
