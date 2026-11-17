# Installation

https://lampung.kartadinata.app/docs/en/guide/instalasi

Pick your framework. The `lampung-ds` CLI sets everything up: it installs the package, imports the CSS, puts the `lds` class on `<html>` and turns on the interactive behaviors.

## Choose your framework

Each page has three paths: a new project, an existing project, and manual setup.

- [Next.js](instalasi-next.md): `-t next`

- [Vite](instalasi-vite.md): `-t vite`

- [TanStack Start](instalasi-start.md): `-t start`

- [React Router](instalasi-react-router.md): `-t react-router`

- [Astro](instalasi-astro.md): `-t astro`

- [Laravel](instalasi-laravel.md): `-t laravel`

- [HTML](instalasi-html.md): CDN or static files

- [Flutter](instalasi-flutter.md): `-t flutter`

- [shadcn/ui](instalasi-shadcn.md): A theme for shadcn/ui projects

## Fastest way

Run this in an existing project folder. The CLI detects your framework from the project files, or asks when it cannot tell.

```
npx lampung-ds@latest init
```

## No install

For a prototype or a static page, load it straight from a CDN:

```
<!doctype html>
<html lang="id" class="lds" data-theme="light">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lampung-design-system@0/css/lds.css">
</head>
<body class="lds">
  <button class="btn btn--primary">Kirim laporan</button>
</body>
</html>
```

```
<script type="module">
  import { init } from 'https://cdn.jsdelivr.net/npm/lampung-design-system@0/js/lds.js';
  init();
</script>
```

## Requirements

- Node.js 20 or newer for web projects.
- Flutter 3.27 or newer for Flutter apps.
- A terminal open in the project folder (the one with `package.json`, `composer.json` or `pubspec.yaml`).
