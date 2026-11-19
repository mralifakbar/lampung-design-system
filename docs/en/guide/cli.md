# CLI

https://lampung.kartadinata.app/docs/en/guide/cli

`lampung-ds` sets Lampung Design System up in your project. Pick a framework and the CLI installs `lampung-design-system`, imports the stylesheet, puts `class="lds"` and `data-theme` on `<html>`, wires the behaviors, and copies component markup when you ask for it.

Lampung Design System is an unofficial community project. It is not made, endorsed or run by the Provincial Government of Lampung or any agency.

Needs Node.js 20 or newer. The CLI has no other dependencies.

## Quick start

```
# In an existing project
npx lampung-ds@latest init

# A new project, made with the framework's own creator
npx lampung-ds@latest create city-services -t next

# Copy components
npx lampung-ds@latest add button text-field
```

## Commands

| Command | What it does |
| --- | --- |
| `init` | Sets LDS up in an existing project. |
| `create <name> -t <template>` | Creates a project with the framework's official creator, then runs `init`. |
| `add <component...>` | Copies component markup into the project. |
| `list` | Lists every component by group. |
| `doctor` | Checks the setup. Exits with 1 when a check fails. |
| `--help`, `--version` | Help and version. |

## init

```
lampung-ds init [-t <template>] [--cwd <dir>] [-y] [--theme light|dark|system]
                [--pm npm|pnpm|yarn|bun] [--no-install] [--shadcn] [--dry-run]
```

The CLI detects the framework from the project files: `package.json` dependencies, a Vite, Astro or React Router config, `@tanstack/react-start`, a `composer.json` with `laravel/framework`, or `pubspec.yaml`. When it cannot tell, it asks with a select list (arrow keys). With `-y` it stops and asks for `-t` instead.

Every edit is idempotent: run `init` twice and the second run changes nothing. Each run lists the files it created (`+`) and changed (`~`). `--dry-run` prints the plan and writes nothing.

| Option | What it does |
| --- | --- |
| `-t`, `--template` | `next`, `vite`, `start`, `react-router`, `astro`, `laravel`, `html`, `flutter`. |
| `--cwd` | Project folder. Default: the current folder. |
| `-y`, `--yes` | Accept the defaults, ask nothing. |
| `--theme` | Starting `data-theme`: `light` (default), `dark` or `system`. |
| `--pm` | Package manager. Default: from the lockfile, then the `packageManager` field, then npm. |
| `--no-install` | Skip installing packages. |
| `--shadcn` | Also write the LDS shadcn/ui theme into the global CSS. |
| `--dry-run` | Print the plan, change no files. |

What changes per framework

| Template | Stylesheet | Class on <html> | Behaviors |
| --- | --- | --- | --- |
| `next` | First line of `app/globals.css` (or an import in `app/layout`) | `app/layout`, plus `suppressHydrationWarning` | `components/lds-provider` (client component) mounted in the layout. Pages router: `pages/_app` and `pages/_document` |
| `vite` | First line of `src/index.css` (or an import in `src/main`) | `index.html`, plus a small script that applies the saved theme before paint | `src/components/lds-provider` next to `<App />` |
| `react-router` | `app/app.css` | `app/root` (`Layout`) | `app/components/lds-provider` inside `<body>` |
| `start` | `src/styles.css` | `src/routes/__root` | `src/components/lds-provider` inside `<body>` |
| `astro` | `src/styles/global.css`, or an import in the layout frontmatter | The first layout with `<html>` | A `<script>` in the layout, run again on `astro:page-load` |
| `laravel` | `resources/css/app.css` | The main Blade layout, adding `@vite` when it is missing | `resources/js/app.js` |
| `html` | Copies `css/`, `js/`, `fonts/` and `aksara/` into `./lds/` | `index.html` (created when missing) | A module script in `index.html` |
| `flutter` | `flutter pub add lampung_design_system material_ui` | None | `LdsTheme.light()` and `LdsTheme.dark()` in a default `lib/main.dart` |

TypeScript projects get `.tsx` files, JavaScript projects `.jsx`. `LdsProvider` calls `restoreTheme()` and `init()` from `lampung-design-system/js` in the browser, and calls `init()` again when new markup appears.

```
// app/layout.tsx after init
<html lang="en" className="lds" data-theme="light" suppressHydrationWarning>
  <body>
    <LdsProvider theme="light" />
    {children}
  </body>
</html>
```

The React bindings in `lampung-design-system/react` ship compiled to JavaScript, so Next.js uses them with no extra config.

Plain HTML

The `html` template copies the files from the installed package. Without one, the CLI downloads them from jsDelivr (`https://cdn.jsdelivr.net/npm/lampung-design-system@<version>/`). When there is no `index.html`, it writes a starter page you can open right away.

Flutter

The CLI runs `flutter pub add lampung_design_system material_ui`. When `lib/main.dart` is still the default template, its `ThemeData` is replaced with the LDS theme. Otherwise the CLI prints this snippet for you to paste:

```
import 'package:lampung_design_system/lampung_design_system.dart';

MaterialApp(
  theme: LdsTheme.light(),
  darkTheme: LdsTheme.dark(),
  themeMode: ThemeMode.light,
);
```

Geist and the icon fonts are registered in `pubspec.yaml`. See the Flutter installation guide.

shadcn/ui

`--shadcn` merges `dist/shadcn/globals.css` from the installed package into the global CSS: imports go on top, the rest between the `lds-shadcn:start` and `lds-shadcn:end` markers. Run it again to update the theme in place.

## create

```
lampung-ds create <name> -t <template> [--pm <name>] [--theme <mode>] [--no-install] [--shadcn] [--dry-run]
```

Runs the framework's official creator, then `init` in the new folder. `--dry-run` only prints the commands.

| Template | Creator |
| --- | --- |
| `next` | `npm create next-app@latest <name> -- --yes --use-npm` |
| `vite` | `npm create vite@latest <name> -- --template react-ts` |
| `react-router` | `npm create react-router@latest <name> -- --yes` |
| `start` | `npx @tanstack/cli@latest create <name>` |
| `astro` | `npm create astro@latest <name> -- --template basics --yes` |
| `laravel` | `laravel new <name>` when the Laravel installer is available, else `composer create-project laravel/laravel <name>` |
| `flutter` | `flutter create --project-name <name_in_snake_case> <name>` |
| `html` | A new folder |

With `--pm pnpm`, `yarn` or `bun`, the same creators run through `pnpm create`, `yarn create` or `bun create`.

## add

```
lampung-ds add <component...> [--all] [--overwrite] [--dry-run] [--cwd <dir>]
```

Copies component markup from the registry into the project. Files that already exist are skipped unless you pass `--overwrite`. The example copy follows `lang` in `lds.json`.

| Framework | Output |
| --- | --- |
| React (`next`, `vite`, `start`, `react-router`) | `<componentsDir>/<slug>.tsx` (or `.jsx`), one component per example. The HTML becomes valid JSX: `className`, `htmlFor`, camelCased attributes, numbers as numbers, style objects, self-closed void elements, uncontrolled form state (`defaultValue`, `defaultChecked`), inline `on*` handlers removed. Components with a React binding say so at the top of the file. |
| `astro` | `<componentsDir>/<slug>/<Name>.astro`, one per example |
| `laravel` | `resources/views/components/lds/<slug>/<example>.blade.php`, used as `<x-lds.button.variants />` |
| `html` | `<snippetsDir>/<slug>.html` with every example |
| `flutter` | Nothing to copy. Use the widgets in the Flutter package. |

The registry is read from the installed package (`node_modules/lampung-design-system/dist/registry`), then from `https://lampung.kartadinata.app/r/<slug>.json`.

```
// src/components/lds/button.tsx (excerpt)
export function ButtonVariants() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px" }}>
      <button className="btn btn--primary">Save changes</button>
      <button className="btn btn--secondary">Preview</button>
    </div>
  );
}
```

## lds.json

`init` writes this file at the project root and `add` reads it. Edit it freely: the next `init` keeps your values.

```
{
  "framework": "vite",
  "typescript": true,
  "css": "src/index.css",
  "componentsDir": "src/components/lds",
  "snippetsDir": "lds/snippets",
  "theme": "light",
  "lang": "en"
}
```

| Key | Meaning |
| --- | --- |
| `framework` | One of the templates. Wins over detection. |
| `typescript` | `add` writes `.tsx` when true and `.jsx` when false (React only). |
| `css` | The global stylesheet or entry file that imports LDS. Used by `doctor`. |
| `componentsDir` | Folder for React, Astro and Blade components. `null` for HTML and Flutter. |
| `snippetsDir` | Folder for HTML snippets. |
| `theme` | `light`, `dark` or `system`: the starting `data-theme` and the fallback for `restoreTheme()`. |
| `lang` | `en` or `id`: the language of the example copy that `add` writes. |

## list and doctor

`lampung-ds list` prints every component by group. `lampung-ds doctor` checks Node.js, `lds.json`, the dependency and the installed version, the stylesheet import, the class on `<html>` and the behavior wiring.

```
lampung-ds doctor
  ok   lampung-design-system 0.1.0 installed
  ok   Stylesheet imported in src/index.css
  ok   class="lds" on <html> in index.html
Everything looks good.
```

## Language and environment variables

CLI output is in English by default, and in Indonesian with `--lang id`, `LDS_LANG=id`, or a system locale that starts with `id` (for example `LANG=id_ID.UTF-8`).

| Variable | Use |
| --- | --- |
| `LDS_LANG` | `id` or `en` |
| `LDS_REGISTRY` | A folder or URL that holds `index.json` and `<slug>.json` |
| `LDS_PACKAGE_DIR` | Use this folder as the installed core package |
| `LDS_OFFLINE` | Never fetch the registry from the network |
| `NO_COLOR` | Plain output |
