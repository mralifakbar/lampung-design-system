import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fixture, cli, readTree, read, cleanup, writeTree, tempDir, REPO } from './helpers.js';

const IMPORT = '@import "lampung-design-system/css";';

/** Runs init twice: the second run must change nothing. Returns the directory and both outputs. */
async function initTwice(name, args = [], extra = {}) {
  const dir = fixture(name, extra);
  const first = await cli(['init', '--cwd', dir, '--no-install', '-y', ...args]);
  assert.equal(first.code, 0, first.err);
  const snapshot = readTree(dir);
  const second = await cli(['init', '--cwd', dir, '--no-install', '-y', ...args]);
  assert.equal(second.code, 0, second.err);
  assert.match(second.out, /Nothing to change/);
  assert.deepEqual(readTree(dir), snapshot, 'second run changed files');
  return { dir, first, second };
}

const config = (dir) => JSON.parse(read(dir, 'lds.json'));

test('next (app router): globals.css, layout html class, provider, lds.json', async () => {
  const { dir, first } = await initTwice('next');
  assert.ok(read(dir, 'app/globals.css').startsWith(`${IMPORT}\n@import "tailwindcss";`));
  const layout = read(dir, 'app/layout.tsx');
  assert.match(layout, /<html lang="en" className="lds" data-theme="light" suppressHydrationWarning>/);
  assert.match(layout, /import "\.\/globals\.css";\nimport \{ LdsProvider \} from "\.\.\/components\/lds-provider";/);
  assert.match(layout, /<body className=\{`\$\{geistSans\.variable\} antialiased`\}>\n {8}<LdsProvider theme="light" \/>\n {8}\{children\}/);
  const provider = read(dir, 'components/lds-provider.tsx');
  assert.ok(provider.startsWith("'use client';"));
  assert.match(provider, /import \{ init, restoreTheme, type ThemeMode \} from 'lampung-design-system\/js';/);
  assert.deepEqual(config(dir), {
    framework: 'next',
    typescript: true,
    css: 'app/globals.css',
    componentsDir: 'components/lds',
    snippetsDir: 'lds/snippets',
    theme: 'light',
    lang: 'en',
  });
  assert.match(first.out, /~ app\/globals\.css/);
  assert.match(first.out, /\+ components\/lds-provider\.tsx/);
  cleanup(dir);
});

test('next with className on <html> and JavaScript', async () => {
  const dir = fixture('next', {
    'tsconfig.json': null,
    'package.json': { dependencies: { next: '16.0.0', react: '19.2.0' } },
    'app/layout.jsx': 'import "./globals.css";\n\nexport default function RootLayout({ children }) {\n  return (\n    <html lang="id" className={inter.className}>\n      <body>{children}</body>\n    </html>\n  );\n}\n',
    'app/layout.tsx': null,
  });
  const r = await cli(['init', '--cwd', dir, '--no-install', '-y', '--theme', 'dark']);
  assert.equal(r.code, 0, r.err);
  const layout = read(dir, 'app/layout.jsx');
  assert.match(layout, /<html lang="id" className=\{`lds \$\{inter\.className\}`\} data-theme="dark" suppressHydrationWarning>/);
  assert.match(layout, /<body>\n {8}<LdsProvider theme="dark" \/>\{children\}<\/body>/);
  assert.ok(existsSync(join(dir, 'components/lds-provider.jsx')));
  assert.doesNotMatch(read(dir, 'components/lds-provider.jsx'), /ThemeMode/);
  assert.equal(config(dir).typescript, false);
  assert.equal(config(dir).theme, 'dark');
  const again = await cli(['init', '--cwd', dir, '--no-install', '-y', '--theme', 'dark']);
  assert.match(again.out, /Nothing to change/);
  cleanup(dir);
});

test('next pages router: _app and a new _document', async () => {
  const dir = tempDir('lds-pages-');
  writeTree(dir, {
    'package.json': { dependencies: { next: '15.0.0' } },
    'tsconfig.json': '{}',
    'styles/globals.css': 'body { margin: 0; }\n',
    'pages/_app.tsx': "import '../styles/globals.css';\nimport type { AppProps } from 'next/app';\n\nexport default function App({ Component, pageProps }: AppProps) {\n  return <Component {...pageProps} />;\n}\n",
  });
  const r = await cli(['init', '--cwd', dir, '--no-install', '-y']);
  assert.equal(r.code, 0, r.err);
  assert.ok(read(dir, 'styles/globals.css').startsWith(IMPORT));
  assert.match(read(dir, 'pages/_app.tsx'), /<><LdsProvider theme="light" \/><Component \{\.\.\.pageProps\} \/><\/>/);
  assert.match(read(dir, 'pages/_document.tsx'), /<Html lang="en" className="lds" data-theme="light" suppressHydrationWarning>/);
  const again = await cli(['init', '--cwd', dir, '--no-install', '-y']);
  assert.match(again.out, /Nothing to change/);
  cleanup(dir);
});

test('vite: index.css, index.html, main.tsx inside StrictMode', async () => {
  const { dir } = await initTwice('vite');
  assert.equal(read(dir, 'src/index.css'), `${IMPORT}\n\n:root {\n  font-family: system-ui;\n}\n`);
  const html = read(dir, 'index.html');
  assert.match(html, /<html lang="en" class="lds" data-theme="light">/);
  assert.match(html, /localStorage\.getItem\('lds-theme'\)\|\|'light'/);
  assert.equal(
    read(dir, 'src/main.tsx'),
    `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LdsProvider } from './components/lds-provider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LdsProvider theme="light" />
    <App />
  </StrictMode>,
)
`,
  );
  assert.doesNotMatch(read(dir, 'src/components/lds-provider.tsx'), /use client/);
  assert.equal(config(dir).css, 'src/index.css');
  cleanup(dir);
});

test('vite without StrictMode and without a CSS file', async () => {
  const dir = fixture('vite', {
    'src/main.tsx': "import { createRoot } from 'react-dom/client';\nimport App from './App';\n\ncreateRoot(document.getElementById('root')!).render(<App />);\n",
  });
  (await import('node:fs')).rmSync(join(dir, 'src/index.css'));
  const r = await cli(['init', '--cwd', dir, '--no-install', '-y']);
  assert.equal(r.code, 0, r.err);
  const main = read(dir, 'src/main.tsx');
  assert.match(main, /import 'lampung-design-system\/css';/);
  assert.match(main, /render\(<><LdsProvider theme="light" \/><App \/><\/>\)/);
  cleanup(dir);
});

test('vite: the untouched create-vite index.css is replaced, not stacked under', async () => {
  const dir = fixture('vite', {
    'src/index.css': ':root {\n  --text: #6b6375;\n  --accent: #aa3bff;\n  --bg: #fff;\n}\n\n#root {\n  width: 1126px;\n  margin: 0 auto;\n  text-align: center;\n}\n',
  });
  const r = await cli(['init', '--cwd', dir, '--no-install', '-y']);
  assert.equal(r.code, 0, r.err);
  assert.equal(read(dir, 'src/index.css'), `${IMPORT}\n`);
  assert.match(r.out, /replaced the Vite starter styles/);
  cleanup(dir);
});

test('react router: app.css, root.tsx Layout', async () => {
  const { dir } = await initTwice('react-router');
  assert.equal(read(dir, 'app/app.css'), `${IMPORT}\n@import "tailwindcss";\n`);
  const root = read(dir, 'app/root.tsx');
  assert.match(root, /import "\.\/app\.css";\nimport \{ LdsProvider \} from "\.\/components\/lds-provider";/);
  assert.match(root, /<html lang="en" className="lds" data-theme="light" suppressHydrationWarning>/);
  assert.match(root, /<body>\n {8}<LdsProvider theme="light" \/>\n {8}\{children\}/);
  assert.ok(existsSync(join(dir, 'app/components/lds-provider.tsx')));
  assert.equal(config(dir).componentsDir, 'app/components/lds');
  cleanup(dir);
});

test('tanstack start: styles.css, __root.tsx', async () => {
  const { dir } = await initTwice('start');
  assert.equal(read(dir, 'src/styles.css'), `${IMPORT}\n@import "tailwindcss";\n`);
  const root = read(dir, 'src/routes/__root.tsx');
  assert.match(root, /import \{ LdsProvider \} from '\.\.\/components\/lds-provider'\n/);
  assert.match(root, /<html lang="en" className="lds" data-theme="light" suppressHydrationWarning>/);
  assert.match(root, /<body>\n {8}<LdsProvider theme="light" \/>/);
  assert.equal(config(dir).framework, 'start');
  cleanup(dir);
});

test('astro: layout frontmatter import, html class, scripts', async () => {
  const { dir } = await initTwice('astro');
  const layout = read(dir, 'src/layouts/Layout.astro');
  assert.ok(layout.startsWith("---\nimport 'lampung-design-system/css';\nconst { title"));
  assert.match(layout, /<html lang="en" class="lds" data-theme="light">/);
  assert.match(layout, /\t\t<script is:inline>try\{/);
  assert.match(layout, /\t\t<script>\n\t\t  import \{ init, restoreTheme \} from 'lampung-design-system\/js';/);
  assert.match(layout, /astro:page-load/);
  assert.equal(read(dir, 'src/pages/index.astro'), "---\nimport Layout from '../layouts/Layout.astro';\n---\n\n<Layout>\n\t<h1>Hi</h1>\n</Layout>\n");
  cleanup(dir);
});

test('astro with src/styles/global.css', async () => {
  const { dir } = await initTwice('astro', [], { 'src/styles/global.css': '@import "tailwindcss";\n' });
  assert.ok(read(dir, 'src/styles/global.css').startsWith(IMPORT));
  assert.doesNotMatch(read(dir, 'src/layouts/Layout.astro'), /import 'lampung-design-system\/css'/);
  cleanup(dir);
});

test('laravel: app.css, app.js, blade layout', async () => {
  const { dir } = await initTwice('laravel');
  assert.ok(read(dir, 'resources/css/app.css').startsWith(`${IMPORT}\n@import 'tailwindcss';`));
  assert.equal(
    read(dir, 'resources/js/app.js'),
    "import './bootstrap';\n\nimport { init, restoreTheme } from 'lampung-design-system/js';\n\nrestoreTheme(document.documentElement, 'light');\ninit();\n",
  );
  const blade = read(dir, 'resources/views/welcome.blade.php');
  assert.match(blade, /<html lang="\{\{ str_replace\('_', '-', app\(\)->getLocale\(\)\) \}\}" class="lds" data-theme="light">/);
  assert.match(blade, /@vite\(\['resources\/css\/app\.css', 'resources\/js\/app\.js'\]\)\n {4}<\/head>/);
  assert.equal(config(dir).componentsDir, 'resources/views/components/lds');
  cleanup(dir);
});

test('laravel layout that already loads @vite keeps it', async () => {
  const layout = '<!DOCTYPE html>\n<html lang="id" class="h-full">\n<head>\n  @vite([\'resources/css/app.css\', \'resources/js/app.js\'])\n</head>\n<body>@yield(\'content\')</body>\n</html>\n';
  const { dir } = await initTwice('laravel', [], { 'resources/views/layouts/app.blade.php': layout });
  const out = read(dir, 'resources/views/layouts/app.blade.php');
  assert.match(out, /<html lang="id" class="h-full lds" data-theme="light">/);
  assert.equal(out.match(/@vite/g).length, 1);
  cleanup(dir);
});

test('html: vendors css, js, fonts, aksara and writes a starter page', async () => {
  const { dir, first } = await initTwice('html', ['-t', 'html']);
  for (const f of ['lds/css/lds.css', 'lds/css/tokens.css', 'lds/css/components.css', 'lds/js/lds.js', 'lds/fonts/lds-icons.woff2', 'lds/aksara/glyphs.json']) {
    assert.ok(existsSync(join(dir, f)), f);
  }
  assert.ok(readFileSync(join(dir, 'lds/fonts/lds-icons.woff2')).equals(readFileSync(join(REPO, 'fonts/lds-icons.woff2'))));
  const page = read(dir, 'index.html');
  assert.match(page, /<html lang="en" class="lds" data-theme="light">/);
  assert.match(page, /<link rel="stylesheet" href="lds\/css\/lds\.css">/);
  assert.match(page, /import \{ init, restoreTheme \} from '\.\/lds\/js\/lds\.js';/);
  assert.match(first.out, /\+ lds\/css\/ +created: 4 files/);
  assert.equal(config(dir).framework, 'html');
  cleanup(dir);
});

test('html: patches an existing index.html', async () => {
  const dir = fixture('html', { 'index.html': '<!doctype html>\n<html>\n<head>\n  <title>Dinas</title>\n</head>\n<body>\n  <h1>Halo</h1>\n</body>\n</html>\n' });
  const r = await cli(['init', '--cwd', dir, '--no-install', '-y']);
  assert.equal(r.code, 0, r.err);
  const page = read(dir, 'index.html');
  assert.match(page, /<html class="lds" data-theme="light">/);
  assert.match(page, / {2}<link rel="stylesheet" href="lds\/css\/lds\.css">\n<\/head>/);
  assert.match(page, / {2}<script type="module">\n {4}import \{ init, restoreTheme \} from '\.\/lds\/js\/lds\.js';/);
  const again = await cli(['init', '--cwd', dir, '--no-install', '-y']);
  assert.match(again.out, /Nothing to change/);
  cleanup(dir);
});

test('flutter: patches the default main.dart, notes the pub command with --no-install', async () => {
  const { dir, first } = await initTwice('flutter');
  const main = read(dir, 'lib/main.dart');
  assert.match(main, /^import 'package:material_ui\/material_ui\.dart';\nimport 'package:lampung_design_system\/lampung_design_system\.dart';/);
  assert.doesNotMatch(main, /package:flutter\/material\.dart/);
  assert.match(main, / {6}theme: LdsTheme\.light\(\),\n {6}darkTheme: LdsTheme\.dark\(\),\n {6}themeMode: ThemeMode\.light,\n {6}home:/);
  assert.doesNotMatch(main, /ThemeData/);
  assert.match(first.out, /flutter pub add lampung_design_system material_ui/);
  cleanup(dir);
});

test('flutter: a Flutter 3.47+ template that already imports material_ui keeps one import', async () => {
  const dir = fixture('flutter', {
    'pubspec.yaml': 'name: app\ndependencies:\n  flutter:\n    sdk: flutter\n  material_ui: ^1.11.1\n',
    'lib/main.dart': read(fixture('flutter'), 'lib/main.dart').replace("package:flutter/material.dart", 'package:material_ui/material_ui.dart'),
  });
  const r = await cli(['init', '--cwd', dir, '--no-install', '-y']);
  assert.equal(r.code, 0, r.err);
  const main = read(dir, 'lib/main.dart');
  assert.equal(main.match(/material_ui\.dart/g).length, 1);
  assert.match(main, /^import 'package:material_ui\/material_ui\.dart';\nimport 'package:lampung_design_system\/lampung_design_system\.dart';/);
  assert.match(r.out, /flutter pub add lampung_design_system\n/);
  cleanup(dir);
});

test('flutter: a custom main.dart is left alone and the snippet is printed', async () => {
  const dir = fixture('flutter', { 'lib/main.dart': "import 'package:flutter/material.dart';\n\nvoid main() => runApp(const MaterialApp(home: Text('x')));\n" });
  const r = await cli(['init', '--cwd', dir, '--no-install', '-y']);
  assert.equal(r.code, 0);
  assert.match(r.out, /not the default template/);
  assert.match(r.out, /theme: LdsTheme\.light\(\),/);
  assert.equal(read(dir, 'lib/main.dart'), "import 'package:flutter/material.dart';\n\nvoid main() => runApp(const MaterialApp(home: Text('x')));\n");
  cleanup(dir);
});

test('--dry-run prints the plan and writes nothing', async () => {
  const dir = fixture('vite');
  const before = readTree(dir);
  const r = await cli(['init', '--cwd', dir, '-y', '--dry-run'], { env: { LDS_PACKAGE_DIR: join(dir, 'nowhere') } });
  assert.equal(r.code, 0, r.err);
  assert.match(r.out, /Dry run: nothing was written/);
  assert.match(r.out, /\$ npm install lampung-design-system/);
  assert.match(r.out, /~ src\/index\.css/);
  assert.match(r.out, /\+ src\/components\/lds-provider\.tsx/);
  assert.match(r.out, /\+ lds\.json/);
  assert.deepEqual(readTree(dir), before);
  cleanup(dir);
});

test('package manager comes from the lockfile', async () => {
  for (const [name, cmd] of [['react-router', '$ pnpm add lampung-design-system'], ['start', '$ bun add lampung-design-system'], ['astro', '$ yarn add lampung-design-system']]) {
    const dir = fixture(name);
    const r = await cli(['init', '--cwd', dir, '-y', '--dry-run'], { env: { LDS_PACKAGE_DIR: join(dir, 'nowhere') } });
    assert.ok(r.out.includes(cmd), `${name}: ${r.out}`);
    cleanup(dir);
  }
  const dir = fixture('vite');
  const r = await cli(['init', '--cwd', dir, '-y', '--dry-run', '--pm', 'pnpm'], { env: { LDS_PACKAGE_DIR: join(dir, 'nowhere') } });
  assert.ok(r.out.includes('$ pnpm add lampung-design-system'));
  cleanup(dir);
});

test('--shadcn merges the shadcn theme into the global CSS, once', async () => {
  const { dir } = await initTwice('next', ['--shadcn']);
  const css = read(dir, 'app/globals.css');
  assert.ok(css.startsWith('@import url("https://fonts.googleapis.com/css2?family=Geist'));
  assert.equal(css.match(/@import "tailwindcss";/g).length, 1);
  assert.match(css, /@custom-variant dark \(&:where\(\.dark, \.dark \*, \[data-theme="dark"\]/);
  assert.equal(css.match(/lds-shadcn:start/g).length, 1);
  assert.match(css, /@theme inline \{/);
  cleanup(dir);
});

test('unknown framework fails clearly with -y, unknown values are rejected', async () => {
  const dir = tempDir();
  writeTree(dir, { 'package.json': { name: 'x' } });
  let r = await cli(['init', '--cwd', dir, '-y']);
  assert.equal(r.code, 1);
  assert.match(r.err, /Could not tell which framework/);
  r = await cli(['init', '--cwd', dir, '-y', '-t', 'svelte']);
  assert.equal(r.code, 1);
  assert.match(r.err, /Unknown template "svelte"/);
  r = await cli(['init', '--cwd', dir, '-y', '-t', 'vite', '--theme', 'blue']);
  assert.match(r.err, /Unknown theme "blue"/);
  cleanup(dir);
});

test('react project without package.json is refused', async () => {
  const dir = tempDir();
  const r = await cli(['init', '--cwd', dir, '-y', '-t', 'next', '--no-install']);
  assert.equal(r.code, 1);
  assert.match(r.err, /No package\.json/);
  cleanup(dir);
});
