# lampung-ds

The command line tool for **Lampung Design System (LDS)**, an unofficial open source design system for public service websites and apps in Lampung, Indonesia. It is not made, endorsed or run by the Provincial Government of Lampung or any agency.

Pick a framework and `lampung-ds` sets the project up: it installs [`lampung-design-system`](https://www.npmjs.com/package/lampung-design-system), imports the stylesheet, puts `class="lds"` and `data-theme` on the root `<html>`, wires the optional behaviors, and copies component markup into your code when you ask for it.

Supported: Next.js, Vite (React), TanStack Start, React Router, Astro, Laravel, plain HTML and Flutter.

Docs: https://lampung.kartadinata.app/docs/en/guide/cli.html (Bahasa Indonesia: https://lampung.kartadinata.app/docs/guide/cli.html)

## Quick start

```sh
# In an existing project
npx lampung-ds@latest init

# A new project, made with the framework's own creator
npx lampung-ds@latest create layanan-kota -t next

# Copy components
npx lampung-ds@latest add button text-field
```

Node.js 20 or newer. No runtime dependencies.

## Commands

### `init`

```sh
lampung-ds init [-t <template>] [--cwd <dir>] [-y] [--theme light|dark|system]
                [--pm npm|pnpm|yarn|bun] [--no-install] [--shadcn] [--dry-run]
```

Detects the framework from the project files, or asks with an arrow-key list when it cannot tell (with `-y` it stops and asks for `-t` instead). Templates: `next`, `vite`, `start`, `react-router`, `astro`, `laravel`, `html`, `flutter`.

Every edit is idempotent: running `init` twice changes nothing the second time. Each run prints the files it created (`+`) and changed (`~`). `--dry-run` prints the same plan and writes nothing.

| Template | Stylesheet | `<html class="lds">` | Behaviors |
|---|---|---|---|
| `next` | first line of `app/globals.css` (else an import in `app/layout`) | `app/layout`, plus `suppressHydrationWarning` | `components/lds-provider` (client component) mounted in the layout. Pages router: `pages/_app` and `pages/_document` |
| `vite` | first line of `src/index.css` (else an import in `src/main`) | `index.html`, plus a tiny inline script that applies the saved theme before paint | `src/components/lds-provider` mounted next to `<App />` in `src/main` |
| `react-router` | `app/app.css` | `app/root` (`Layout`) | `app/components/lds-provider` mounted in `<body>` |
| `start` | `src/styles.css` | `src/routes/__root` | `src/components/lds-provider` mounted in `<body>` |
| `astro` | `src/styles/global.css`, else an import in the layout frontmatter | the first layout with `<html>` (`src/layouts/Layout.astro`) | a `<script>` in the layout, re-run on `astro:page-load` |
| `laravel` | `resources/css/app.css` | the main Blade layout (`layouts/app`, `components/layouts/app`, `app`, then `welcome`), adding `@vite` when it is missing | `resources/js/app.js` |
| `html` | copies `css/`, `js/`, `fonts/` and `aksara/` into `./lds/` (from the installed package, or from jsDelivr) | `index.html` (a starter page is written when there is none) | a module script in `index.html` |
| `flutter` | runs `flutter pub add lampung_design_system` | | swaps `ThemeData` for `LdsTheme.light()` / `LdsTheme.dark()` in a default `lib/main.dart`, otherwise prints the snippet |

TypeScript projects get `.tsx` files, JavaScript projects `.jsx`. The package manager comes from the lockfile (`pnpm-lock.yaml`, `bun.lock`, `yarn.lock`, `package-lock.json`), then `packageManager`, then npm.

`--shadcn` also merges the LDS shadcn/ui theme (`dist/shadcn/globals.css` from the installed package) into the global CSS between `lds-shadcn:start` and `lds-shadcn:end` markers, so a second run replaces it in place.

The React bindings in `lampung-design-system/react` ship compiled (ESM plus type declarations), so every React framework imports them with no extra config.

### `create`

```sh
lampung-ds create <name> -t <template> [--pm <name>] [--theme <mode>] [--no-install] [--shadcn] [--dry-run]
```

Runs the official creator, then `init` inside the new folder:

| Template | Creator |
|---|---|
| `next` | `npm create next-app@latest <name> -- --yes --use-npm` |
| `vite` | `npm create vite@latest <name> -- --template react-ts` |
| `react-router` | `npm create react-router@latest <name> -- --yes` |
| `start` | `npm create @tanstack/start@latest <name>` |
| `astro` | `npm create astro@latest <name> -- --template basics --yes` |
| `laravel` | `laravel new <name> --no-interaction` when the Laravel installer is on your PATH, else `composer create-project laravel/laravel <name>` |
| `flutter` | `flutter create --project-name <name_in_snake_case> <name>` |
| `html` | a new folder |

With `--pm pnpm|yarn|bun` the same creators run through `pnpm create`, `yarn create` or `bun create`. `--dry-run` prints the commands.

### `add`

```sh
lampung-ds add <component...> [--all] [--overwrite] [--dry-run] [--cwd <dir>]
```

Copies component markup from the registry into your project. Existing files are skipped unless you pass `--overwrite`.

| Framework | Output |
|---|---|
| React (`next`, `vite`, `start`, `react-router`) | `<componentsDir>/<slug>.tsx` (or `.jsx`), one exported component per example, with the HTML converted to JSX: `className`, `htmlFor`, camelCased attributes, numbers as numbers, style objects, self-closed void elements, uncontrolled form state (`defaultValue`, `defaultChecked`), inline `on*` handlers removed. Components that have a React binding say so at the top of the file. |
| `astro` | `<componentsDir>/<slug>/<Name>.astro`, one per example |
| `laravel` | `resources/views/components/lds/<slug>/<example>.blade.php`, used as `<x-lds.button.variants />` |
| `html` | `<snippetsDir>/<slug>.html` with every example |
| `flutter` | nothing to copy: use the widgets in the Flutter package |

The registry is read from the installed package (`node_modules/lampung-design-system/dist/registry`), falling back to `https://lampung.kartadinata.app/r/<slug>.json`. Set `LDS_REGISTRY` to a folder or URL to use another one.

### `list`, `doctor`

`lampung-ds list` prints every component by group. `lampung-ds doctor` checks Node.js, `lds.json`, the dependency and the installed version, the stylesheet import, the class on `<html>` and the behavior wiring, and exits with 1 when something fails.

## `lds.json`

`init` writes it at the project root; `add` reads it. Edit it freely: `init` keeps your values.

```json
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
|---|---|
| `framework` | One of the templates. Wins over detection. |
| `typescript` | `add` writes `.tsx` when true, `.jsx` when false (React only). |
| `css` | The global stylesheet (or entry) that imports LDS. Used by `doctor`. |
| `componentsDir` | Where `add` writes React, Astro and Blade components. `null` for HTML and Flutter. |
| `snippetsDir` | Where `add` writes HTML snippets. |
| `theme` | `light`, `dark` or `system`: the default `data-theme` and the fallback for `restoreTheme()`. |
| `lang` | `en` or `id`: the language of the example copy that `add` writes. |

## Language

Output is in English by default and in Indonesian with `--lang id`, `LDS_LANG=id`, or a system locale that starts with `id` (`LANG=id_ID.UTF-8`).

## Environment

| Variable | Use |
|---|---|
| `LDS_LANG` | `id` or `en` |
| `LDS_REGISTRY` | A folder or URL that holds `index.json` and `<slug>.json` |
| `LDS_PACKAGE_DIR` | Use this folder as the installed core package |
| `LDS_OFFLINE` | Never fetch the registry from the network |
| `NO_COLOR` | Plain output |

## Bahasa Indonesia

`lampung-ds` adalah alat baris perintah untuk **Lampung Design System (LDS)**, design system sumber terbuka yang tidak resmi untuk situs dan aplikasi layanan publik di Lampung. LDS tidak dibuat, didukung, atau dikelola oleh Pemerintah Provinsi Lampung maupun instansi mana pun.

Pilih framework, lalu `lampung-ds` menyiapkan proyek: memasang paket `lampung-design-system`, mengimpor stylesheet, menambahkan `class="lds"` dan `data-theme` di `<html>`, menyambungkan perilaku (opsional), dan menyalin markup komponen ke kode Anda.

```sh
# Di proyek yang sudah ada
npx lampung-ds@latest init

# Proyek baru dengan pembuat resmi framework
npx lampung-ds@latest create layanan-kota -t next

# Salin komponen
npx lampung-ds@latest add button text-field
```

- `init` mengenali framework dari berkas proyek, atau bertanya lewat daftar pilihan (tombol panah). Menjalankannya dua kali tidak mengubah apa pun. `--dry-run` hanya menampilkan rencana.
- `create <nama> -t <template>` menjalankan pembuat resmi (create-next-app, create-vite, create-react-router, TanStack Start, create-astro, Composer atau Laravel installer, `flutter create`), lalu `init`.
- `add <komponen...>` menyalin markup ke `componentsDir` (React: `.tsx`/`.jsx` dengan JSX yang valid; Astro: `.astro`; Laravel: komponen Blade; HTML: potongan di `snippetsDir`). Bahasa contoh mengikuti `lang` di `lds.json`.
- `list` menampilkan semua komponen; `doctor` memeriksa pemasangan.
- Keluaran berbahasa Indonesia dengan `--lang id`, `LDS_LANG=id`, atau locale sistem yang diawali `id`.

Panduan lengkap: https://lampung.kartadinata.app/docs/guide/cli.html

## License

MIT. See [LICENSE](./LICENSE).
