# Astro

https://lampung.kartadinata.app/docs/en/guide/instalasi-astro

Set up Lampung Design System in a Astro project.

## New project

Create a new Astro project that already uses LDS in one step:

```
npx lampung-ds@latest create kota-contoh -t astro
```

## Existing project

Run it in the project folder. It is safe to repeat: run it twice and nothing changes the second time.

```
npx lampung-ds@latest init
```

**What the CLI changes**

| `src/styles/global.css` | global stylesheet: imports `lampung-design-system/css` |
| --- | --- |
| `src/layouts/Layout.astro` | the `<html>` element: `lds` class, `lang`, `data-theme` |
| `lds.json` | CLI settings for the `add` command |

## Manual setup

Prefer to wire it yourself? These are the same steps the CLI runs.

**1. Install the package**

```
npm install lampung-design-system
```

**2. Import the CSS**

```
/* src/styles/global.css */
@import "lampung-design-system/css";
```

**3. Mark the root element**

```
---
// src/layouts/Layout.astro
import '../styles/global.css';
---
<html lang="id" class="lds" data-theme="light">
  <body class="lds">
    <slot />
  </body>
</html>
```

**4. Turn on the interactive behaviors**

```
<!-- at the end of src/layouts/Layout.astro -->
<script>
  import { init, restoreTheme } from 'lampung-design-system/js';
  restoreTheme(document.documentElement, 'light');
  init();
</script>
```

## First component

Add components to your project. The CLI copies tested markup into your components folder, ready to edit.

```
npx lampung-ds@latest add button text-field alert
```

## Next steps

- Read [every CLI command](cli.md).
- Browse the [component list](../components/index.md) before building something new.
- Set up [theming and agency colors](tema.md).
