# TanStack Start

https://lampung.kartadinata.app/docs/en/guide/instalasi-start

Set up Lampung Design System in a TanStack Start project.

## New project

Create a new TanStack Start project that already uses LDS in one step:

```
npx lampung-ds@latest create kota-contoh -t start
```

## Existing project

Run it in the project folder. It is safe to repeat: run it twice and nothing changes the second time.

```
npx lampung-ds@latest init
```

**What the CLI changes**

| `src/styles.css` | global stylesheet: imports `lampung-design-system/css` |
| --- | --- |
| `src/routes/__root.tsx` | the `<html>` element: `lds` class, `lang`, `data-theme` |
| `src/components/lds-provider.tsx` | interactive behaviors: `init()` and the saved theme |
| `lds.json` | CLI settings for the `add` command |

## Manual setup

Prefer to wire it yourself? These are the same steps the CLI runs.

**1. Install the package**

```
npm install lampung-design-system
```

**2. Import the CSS**

```
/* src/styles.css */
@import "lampung-design-system/css";
```

**3. Mark the root element**

```
// src/routes/__root.tsx (the document shell)
function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="lds" data-theme="light" suppressHydrationWarning>
      <head><HeadContent /></head>
      <body className="lds">
        <LdsProvider>{children}</LdsProvider>
        <Scripts />
      </body>
    </html>
  );
}
```

**4. Turn on the interactive behaviors**

```
// src/components/lds-provider.tsx
'use client';
import { useEffect } from 'react';
import { init, restoreTheme } from 'lampung-design-system/js';

export function LdsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    restoreTheme(document.documentElement, 'light');
    init();
  }, []);
  return <>{children}</>;
}
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
