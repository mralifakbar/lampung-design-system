# Platforms

The system is framework-agnostic: values live in `tokens/tokens.json`, the web layer is plain CSS plus one optional ES module, and Flutter gets generated Dart constants. Keep any platform-specific code thin and token-driven.

## Plain HTML

```html
<!doctype html>
<html lang="en" class="lds" data-theme="light">
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="/lampung-design-system/css/lds.css">
</head>
<body class="lds">
  …markup from references/components.md…
  <script type="module">
    import { init, restoreTheme } from '/lampung-design-system/js/lds.js';
    restoreTheme();   // reads the saved choice, defaults to light
    init();           // wires every [data-lds-*] element
  </script>
</body>
</html>
```
`css/lds.css` imports Plus Jakarta Sans from Google Fonts. Offline or privacy-sensitive projects: import `css/tokens.css` and `css/components.css` directly and self-host Plus Jakarta Sans (OFL).

## Next.js (App Router) and other React apps

```tsx
// app/layout.tsx
import 'lampung-design-system/css';   // or a relative path to css/lds.css
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className="lds" data-theme="light"><body className="lds">{children}</body></html>;
}
```
Components are class names, so React renders the same markup (`className`, `htmlFor`). Behaviors are optional:
```tsx
'use client';
import { useEffect, useRef } from 'react';
import { init, toast } from 'lampung-design-system/js';
export function Section({ children }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { if (ref.current) init(ref.current); }, []);
  return <div ref={ref}>{children}</div>;
}
```
If React owns a state (open/closed, selected), drive the classes and ARIA from state instead of `data-lds-*` and keep only the CSS; both paths look and move the same because the motion lives in CSS.

**React bindings** (`lampung-design-system/react`, source TSX in `react/index.tsx`): the components whose state React should own, rendering exactly the CSS markup. Next.js compiles it when the package is in `transpilePackages: ['lampung-design-system']`, or when the files are vendored into the app (`npm run sync -- ../app/vendor/lds`).
```tsx
import { Tabs, Segmented, AccordionItem, Switch, Steps, Select, Combobox, Ring, Thinking, Alert, Spinner, ButtonContent, Chart, notify, reject, closeModal, useReveal } from 'lampung-design-system/react';

<Tabs label="Course sections" value={tab} onChange={setTab} items={[{ value: 'overview', label: 'Overview' }, { value: 'tasks', label: 'Assignments', count: 3 }]} />
<Segmented label="Range" value={range} onChange={setRange} options={[{ value: 'week', label: 'Week' }, { value: 'month', label: 'Month' }]} />
<Select label="Education level" value={level} onChange={setLevel} options={[{ value: 's1', label: 'Bachelor', sub: 'S-1, D-IV' }]} />
<Combobox label="Study program" value={prog} onChange={setProg} minChars={2} loadOptions={(q, signal) => fetch(`/api/programs?q=${q}`, { signal }).then((r) => r.json())} />
<button className={`btn btn--primary${saving ? ' is-loading' : ''}`}><ButtonContent loading={saving}>Save changes</ButtonContent></button>
<Chart config={{ label: 'Visits per day, rising', x: days, series: [{ name: 'Visits', values: visits }] }} />
```
- Every visible string is a prop (labels, `emptyText`, `clearLabel`, `ariaLabel` on `Ring`), so the bindings work in any language.
- `notify(toastOptions, haptic)` and `reject(element)` wrap `toast`/`haptic` and `shake`; `closeModal(el, done)` plays a modal's exit; `useReveal(routeKey)` runs reveal-on-scroll and re-scans when the key changes. `Chart` draws an area, line, bar, combo, donut or gauge chart from a `drawChart` config and animates to a new config from what is on screen.
- Types for the vanilla module ship in `js/lds.d.ts`.

**Vendoring** instead of installing: `npm run sync -- <app>/vendor/lds` copies `css/`, `js/` (with types), `fonts/`, `icons/icons.json` and `react/` and writes `VERSION`. Re-run it to update; never edit the copy. Project-only rules go in the app's own stylesheet, on top of the system's classes.
Tokens in TS: `import { tokens, cssVar, easing } from 'lampung-design-system'` (typed via `dist/tokens.d.ts`). For Framer Motion / Motion springs use the damping and response values in `tokens.motion.spring` (`{ type: 'spring', bounce: 0, duration: 0.42 }` for smooth).
Tailwind with shadcn/ui: see the shadcn/ui section below. Tailwind without shadcn: map theme values to the CSS variables (`colors: { canvas: 'var(--bg-canvas)', accent: 'var(--accent)' }`) rather than copying hex values.
Theme switching: set `data-theme` on `<html>` before paint (inline script reading localStorage key `lds-theme`) to avoid a flash.

## shadcn/ui

`dist/shadcn/` themes a shadcn/ui app with the whole system, not only color. It sets:
- every shadcn color, in light and dark,
- Plus Jakarta Sans and JetBrains Mono through shadcn's font loader,
- the type scale as `text-*` utilities and letter spacing,
- spacing, elevation, radius and motion curves.

Component shapes and motion stay shadcn's. For the exact spring motion, use the CSS components above.

**Install into a shadcn project (Tailwind v4, the shadcn default).** Pass all three items to one command; fonts are separate `registry:font` items:
```sh
R=node_modules/lampung-design-system/dist/shadcn/registry   # or wherever the repo lives
npx shadcn@latest add $R/lds.json $R/lds-font-sans.json $R/lds-font-mono.json
```
When the registry folder is hosted at a URL, run `LDS_REGISTRY_URL=https://host/path npm run build:tokens`. `lds.json` then lists the font items as dependencies, so `npx shadcn@latest add https://host/path/lds.json` installs everything, and `npx shadcn@latest init --preset https://host/path/lds.json` starts a new project with it.

**Copy-paste instead.** `dist/shadcn/globals.css` is a complete Tailwind v4 `globals.css`, with Plus Jakarta Sans loaded from Google Fonts. For Tailwind v3, use `dist/shadcn/globals.v3.css` plus `presets: [require('lampung-design-system/shadcn/tailwind-preset')]`.

**Dark mode.** `.dark` (shadcn's switch) and `data-theme="dark"` both work in the copy-paste files. The registry install writes `.dark` only.

| shadcn | This system |
|---|---|
| `primary` / `primary-foreground` | accent / text-on-accent |
| `secondary` | bg-recessed, text-strong |
| `muted` / `muted-foreground` | bg-fill / text-subtle |
| `accent` | bg-tint-strong (hover rows), text-strong |
| `destructive` | danger |
| `border` / `input` / `ring` | line-strong / line-control / focus |
| `card`, `popover` | bg-elevated |
| `sidebar` | bg-fill |
| `chart-1..4`, `chart-5` | series-1..4, neutral (the "Other" series) |
| `--radius: 12px` | sm/md/lg/xl = 8/10/12/16, `2xl` = 22 |
| `shadow-2xs..2xl` | the four elevations, per mode (`--elevation-xs..lg`) |
| `tracking-tighter/tight/normal/wide` | display / title-1 / body / caption tracking; body text uses `tracking-normal` |
| `spacing` | 0.25rem (the 4 px grid) |
| `ease-enter`, `ease-exit`, `ease-standard`, `ease-inout`, `ease-spring-*` | motion curves |

Extra colors with no shadcn name: `primary-text`, `primary-tint`, `destructive-text`, `destructive-tint`, `success`, `success-text`, `success-tint`, `warning`, `warning-text`, `warning-tint`, `heading`, `faint`, `canvas`, `fill`, `recessed`, `inverse`, `inverse-foreground`, `scrim`. Use them as `bg-success-tint text-success-text`.

Type scale utilities set size, line height, tracking and weight together: `text-display`, `text-large-title`, `text-title-1`, `text-title-2`, `text-title-3`, `text-headline`, `text-body`, `text-body-strong`, `text-subhead`, `text-footnote`, `text-caption`.

There is no serif in this system, so `font-serif` stays shadcn's default.

## Multi-page apps (one HTML file per page)

A server-rendered or static app where every link loads a new page (plain HTML, Laravel Blade, Astro without client routing) keeps the `.shell` frame still between pages with three pieces:
1. `@view-transition { navigation: auto; types: lds-page; }` once in the site stylesheet. The CSS in `components.css` then holds the sidebar and bar still and cross-fades the content; browsers without cross-document view transitions just load the page.
2. The paint-time snippet from `references/components/app-shell.md` (last example), inline, right after `</aside>` in every page. It restores the sidebar scroll and places the highlight before first paint, gliding it from the link you left.
3. `init()` (or `data-lds-shell`), which writes `sessionStorage` `lds-shell-scroll` and `lds-shell-from` on `pagehide`.
`docs/examples/dashboard/` is the working reference (generated by `scripts/build-examples.mjs`). Client-side routers (Next.js, React) keep the shell mounted and need none of this.

## Vue, Svelte, Astro, Laravel Blade, anything that outputs HTML

Same as plain HTML: import the CSS once, render the markup, call `init(el)` after mount for behaviors.

## Flutter

1. Copy `dist/flutter/lds_tokens.dart` into `lib/design/` (regenerate with `npm run build:tokens` after token changes).
2. Fonts in `pubspec.yaml`:
```yaml
flutter:
  fonts:
    - family: Plus Jakarta Sans
      fonts:
        - asset: assets/fonts/Plus Jakarta Sans-Regular.ttf
        - asset: assets/fonts/Plus Jakarta Sans-Medium.ttf
          weight: 500
        - asset: assets/fonts/Plus Jakarta Sans-SemiBold.ttf
          weight: 600
        - asset: assets/fonts/Plus Jakarta Sans-Bold.ttf
          weight: 700
    - family: LDS Icons
      fonts: [{ asset: assets/fonts/lds-icons.woff2 }]
    - family: LDS Icons Fill
      fonts: [{ asset: assets/fonts/lds-icons-fill.woff2 }]
```
(If a Flutter version rejects woff2, convert once with `fonttools ttLib.woff2 decompress` to `.ttf`.)
3. Use:
```dart
final c = Theme.of(context).brightness == Brightness.dark ? LdsColors.dark : LdsColors.light;
Text('Today', style: LdsType.largeTitle.copyWith(color: c.textStrong));
Container(decoration: BoxDecoration(color: c.bgFill, borderRadius: BorderRadius.circular(LdsRadius.lg)));
AnimatedSlide(duration: LdsMotion.smooth, curve: LdsMotion.standardCurve, offset: …);
final sim = SpringSimulation(LdsMotion.smoothSpring, from, to, velocity); // interruptible, carries velocity
Text('search', style: TextStyle(fontFamily: LdsType.icons, fontSize: 20, color: c.textStrong));
```
Map components to Flutter widgets with the same anatomy and tokens: `.btn` → a `GestureDetector`/`InkWell`-free pressable that scales to 0.97 on tap-down; `.list` → grouped list on `bgFill` with hairline separators inset to the text; `.sheet` → `DraggableScrollableSheet` or a custom sheet that uses `momentumSpring` after a fling; `.seg` → a single sliding thumb animated with `smoothSpring`. Prefer `SpringSimulation` over fixed-duration `Tween`s for anything the user can grab.
Shadows are not generated for Dart; translate `--shadow-lg` to `BoxShadow(color: Color(0x2E18181B), blurRadius: 40, spreadRadius: -8, offset: Offset(0, 18))` plus the smaller layer.
