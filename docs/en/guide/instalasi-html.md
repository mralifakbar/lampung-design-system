# HTML

https://lampung.kartadinata.app/docs/en/guide/instalasi-html

Set up Lampung Design System in a HTML project.

## New project

Create a new HTML project that already uses LDS in one step:

```
npx lampung-ds@latest init -t html
```

## Existing project

Run it in the project folder. It is safe to repeat: run it twice and nothing changes the second time.

```
npx lampung-ds@latest init -t html
```

**What the CLI changes**

| `lds/css/lds.css` | global stylesheet: imports `lampung-design-system/css` |
| --- | --- |
| `index.html` | the `<html>` element: `lds` class, `lang`, `data-theme` |
| `lds.json` | CLI settings for the `add` command |

## Manual setup

Prefer to wire it yourself? These are the same steps the CLI runs.

**1. Import the CSS**

```
<!-- from a CDN, no install -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lampung-design-system@0/css/lds.css">
```

**2. Mark the root element**

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

**3. Turn on the interactive behaviors**

```
<script type="module">
  import { init } from 'https://cdn.jsdelivr.net/npm/lampung-design-system@0/js/lds.js';
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
