# Vite

https://lampung.kartadinata.app/docs/en/guide/instalasi-vite

Set up Lampung Design System in a Vite project.

## New project

Create a new Vite project that already uses LDS in one step:

```
npx lampung-ds@latest create kota-contoh -t vite
```

## Existing project

Run it in the project folder. It is safe to repeat: run it twice and nothing changes the second time.

```
npx lampung-ds@latest init
```

**What the CLI changes**

| `src/index.css` | global stylesheet: imports `lampung-design-system/css` |
| --- | --- |
| `index.html` | the `<html>` element: `lds` class, `lang`, `data-theme` |
| `src/lds-provider.tsx` | interactive behaviors: `init()` and the saved theme |
| `lds.json` | CLI settings for the `add` command |

## Manual setup

Prefer to wire it yourself? These are the same steps the CLI runs.

**1. Install the package**

```
npm install lampung-design-system
```

**2. Import the CSS**

```
/* src/index.css */
@import "lampung-design-system/css";
```

**3. Mark the root element**

```
<!-- index.html -->
<html lang="id" class="lds" data-theme="light">
  <body class="lds">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**4. Turn on the interactive behaviors**

```
// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { LdsProvider } from './lds-provider';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode><LdsProvider><App /></LdsProvider></StrictMode>,
);
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
