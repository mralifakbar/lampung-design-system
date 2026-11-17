# Laravel

https://lampung.kartadinata.app/docs/en/guide/instalasi-laravel

Set up Lampung Design System in a Laravel project.

## New project

Create the app first with the framework's official creator:

```
laravel new kota-contoh
cd kota-contoh
```

```
npx lampung-ds@latest init -t laravel
```

## Existing project

Run it in the project folder. It is safe to repeat: run it twice and nothing changes the second time.

```
npx lampung-ds@latest init
```

**What the CLI changes**

| `resources/css/app.css` | global stylesheet: imports `lampung-design-system/css` |
| --- | --- |
| `resources/views/layouts/app.blade.php` | the `<html>` element: `lds` class, `lang`, `data-theme` |
| `resources/js/app.js` | interactive behaviors: `init()` and the saved theme |
| `lds.json` | CLI settings for the `add` command |

## Manual setup

Prefer to wire it yourself? These are the same steps the CLI runs.

**1. Install the package**

```
npm install lampung-design-system
```

**2. Import the CSS**

```
/* resources/css/app.css */
@import "lampung-design-system/css";
```

**3. Mark the root element**

```
{{-- resources/views/layouts/app.blade.php --}}
<html lang="id" class="lds" data-theme="light">
<head>
  @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="lds">
  @yield('content')
</body>
</html>
```

**4. Turn on the interactive behaviors**

```
// resources/js/app.js
import { init, restoreTheme } from 'lampung-design-system/js';
restoreTheme(document.documentElement, 'light');
init();
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
