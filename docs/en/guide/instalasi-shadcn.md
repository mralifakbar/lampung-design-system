# shadcn/ui

https://lampung.kartadinata.app/docs/en/guide/instalasi-shadcn

Already on shadcn/ui? Install the LDS theme (light and dark colors, Geist, type scale, spacing, radius, elevation and motion curves) from the registry. Component shapes stay shadcn's; for the exact LDS look and motion, use the LDS CSS classes.

## Add the theme to an existing project

```
npx shadcn@latest add https://lampung.kartadinata.app/r/lds.json
```

## Or copy it by hand

```
npm install lampung-design-system

/* or copy the theme by hand */
@import "lampung-design-system/shadcn/globals.css";
```

## Start a new project with the LDS preset

```
npx shadcn@latest init --preset https://lampung.kartadinata.app/r/lds.json
```

## Next steps

- Read [every CLI command](cli.md).
- Browse the [component list](../components/index.md) before building something new.
- Set up [theming and agency colors](tema.md).
