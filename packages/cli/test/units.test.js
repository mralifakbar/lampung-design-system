import { test } from 'node:test';
import assert from 'node:assert/strict';
import { join } from 'node:path';
import { mkdirSync } from 'node:fs';
import { detectFramework, detectPm, detectTypescript } from '../src/detect.js';
import { htmlToJsx, htmlToAstro, htmlToBlade, styleObject, exampleMarkup } from '../src/html.js';
import { addCssImport, addJsImport, patchHtmlTag, importLine, isViteStarterCss } from '../src/edit.js';
import { detectLang, createT, STRINGS } from '../src/i18n.js';
import { patchFlutterMain } from '../src/frameworks.js';
import { creatorCommand } from '../src/create.js';
import { fixture, tempDir, writeTree, cleanup, cli } from './helpers.js';

// ---------- detection ----------

test('detects every template from its project files', () => {
  for (const name of ['next', 'vite', 'react-router', 'start', 'astro', 'laravel', 'flutter']) {
    const dir = fixture(name);
    assert.equal(detectFramework(dir), name, name);
    cleanup(dir);
  }
});

test('detection details: config files, html, nothing', () => {
  const cases = [
    [{ 'package.json': {}, 'astro.config.mjs': '' }, 'astro'],
    [{ 'package.json': {}, 'react-router.config.ts': '' }, 'react-router'],
    [{ 'package.json': { dependencies: { '@tanstack/react-start': '1' }, devDependencies: { vite: '7' } } }, 'start'],
    [{ 'package.json': { dependencies: { next: '15', vite: '7' } } }, 'next'],
    [{ 'package.json': {}, 'vite.config.js': '' }, 'vite'],
    [{ 'composer.json': { require: { 'laravel/framework': '^12' } }, 'package.json': { devDependencies: { vite: '7' } } }, 'laravel'],
    [{ 'pubspec.yaml': 'name: x\n' }, 'flutter'],
    [{ 'about.html': '<p>x</p>' }, 'html'],
    [{ 'package.json': { dependencies: { express: '5' } } }, null],
    [{}, null],
  ];
  for (const [files, want] of cases) {
    const dir = writeTree(tempDir(), files);
    assert.equal(detectFramework(dir), want, JSON.stringify(files));
    cleanup(dir);
  }
});

test('typescript and package manager detection', () => {
  const dir = writeTree(tempDir(), { 'package.json': { packageManager: 'pnpm@9.0.0' } });
  assert.equal(detectPm(dir, {}), 'pnpm');
  assert.equal(detectTypescript(dir, 'vite'), false);
  writeTree(dir, { 'tsconfig.json': '{}', 'yarn.lock': '' });
  assert.equal(detectPm(dir, {}), 'yarn');
  assert.equal(detectTypescript(dir, 'vite'), true);
  const nested = join(dir, 'apps/web');
  mkdirSync(nested, { recursive: true });
  assert.equal(detectPm(nested, {}), 'yarn', 'lockfile in a parent folder');
  cleanup(dir);
  const empty = tempDir();
  assert.equal(detectPm(empty, { npm_config_user_agent: 'bun/1.2.0' }), 'bun');
  assert.equal(detectPm(empty, {}), 'npm');
  cleanup(empty);
});

// ---------- edits ----------

test('addCssImport keeps @charset first and is idempotent', () => {
  assert.equal(addCssImport('@charset "utf-8";\nbody{}\n'), '@charset "utf-8";\n@import "lampung-design-system/css";\nbody{}\n');
  assert.equal(addCssImport(''), '@import "lampung-design-system/css";\n');
  const once = addCssImport('@import "tailwindcss";\n');
  assert.equal(addCssImport(once), once);
});

test('addJsImport goes after directives and imports, or before CSS imports', () => {
  assert.equal(addJsImport("'use client';\nexport const a = 1;\n", "import x from 'x';"), "'use client';\n\nimport x from 'x';\nexport const a = 1;\n");
  assert.equal(addJsImport("import a from 'a';\nimport {\n  b,\n} from 'b';\n\nrun();\n", "import c from 'c';"), "import a from 'a';\nimport {\n  b,\n} from 'b';\nimport c from 'c';\n\nrun();\n");
  assert.equal(addJsImport("import a from 'a';\nimport './app.css';\n", "import 'lds/css';", { beforeCss: true }), "import a from 'a';\nimport 'lds/css';\nimport './app.css';\n");
  assert.equal(importLine('import a from "a"\n', '{ B }', './b'), 'import { B } from "./b"');
  assert.equal(importLine("import a from 'a';\n", '', 'x'), "import 'x';");
});

test('patchHtmlTag handles every class shape', () => {
  const p = (s, o) => patchHtmlTag(s, { jsx: true, ...o });
  assert.equal(p('<html lang="en">'), '<html lang="en" className="lds" data-theme="light">');
  assert.equal(p('<html className="dark">', { hydration: true }), '<html className="dark lds" data-theme="light" suppressHydrationWarning>');
  assert.equal(p('<html className={`${a.variable} x`}>'), '<html className={`lds ${a.variable} x`} data-theme="light">');
  assert.equal(p('<html className={cn(a, b > c)}>'), '<html className={`lds ${cn(a, b > c)}`} data-theme="light">');
  assert.equal(p('<html className="lds" data-theme="dark">'), '<html className="lds" data-theme="dark">');
  assert.equal(patchHtmlTag('<html\n  lang="id"\n>', { theme: 'system' }), '<html\n  lang="id" class="lds" data-theme="system"\n>');
  assert.equal(patchHtmlTag('<div>no html</div>', {}), null);
});

test('patchFlutterMain only touches the default template', () => {
  const src = "import 'package:flutter/material.dart';\nMaterialApp(\n  theme: ThemeData(\n    colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),\n  ),\n);\n";
  const out = patchFlutterMain(src, 'system');
  assert.match(out, /theme: LdsTheme\.light\(\),\n {2}darkTheme: LdsTheme\.dark\(\),\n {2}themeMode: ThemeMode\.system,\n\);/);
  assert.equal(patchFlutterMain("MaterialApp(home: Text('x'))", 'light'), null);});

test('patchFlutterMain handles the dot-shorthand template of Flutter 3.38+', () => {
  const src = "import 'package:flutter/material.dart';\nMaterialApp(\n  theme: ThemeData(\n    colorScheme: .fromSeed(seedColor: Colors.deepPurple),\n  ),\n);\n";
  const out = patchFlutterMain(src, 'light');
  assert.match(out, /^import 'package:material_ui\/material_ui\.dart';\nimport 'package:lampung_design_system\/lampung_design_system\.dart';/);
  assert.match(out, /theme: LdsTheme\.light\(\),\n {2}darkTheme: LdsTheme\.dark\(\),\n {2}themeMode: ThemeMode\.light,\n\);/);
  assert.doesNotMatch(out, /fromSeed/);
});

// ---------- JSX conversion ----------

const jsx = (html, o) => htmlToJsx(html, o).jsx;

test('jsx: attribute renames and numbers', () => {
  assert.equal(
    jsx('<label for="a" class="x">A</label><input id="a" tabindex="0" maxlength="20" readonly autocomplete="off" inputmode="numeric">'),
    '<label htmlFor="a" className="x">A</label><input id="a" tabIndex={0} maxLength={20} readOnly autoComplete="off" inputMode="numeric" />',
  );
  assert.equal(jsx('<td colspan="2" rowspan="3">x</td>'), '<td colSpan={2} rowSpan={3}>x</td>');
  assert.equal(jsx('<textarea rows="3" class="t">Hello {name}</textarea>'), '<textarea rows={3} className="t" defaultValue={"Hello {name}"} />');
  assert.equal(jsx('<time datetime="2026-01-02">2 Jan</time>'), '<time dateTime="2026-01-02">2 Jan</time>');
});

test('jsx: style strings become objects, custom properties are cast in TSX', () => {
  assert.equal(jsx('<div style="max-width: 360px; -webkit-line-clamp: 2"></div>'), '<div style={{ maxWidth: "360px", WebkitLineClamp: "2" }} />');
  const r = htmlToJsx('<span style="--p: 40%; background: url(&quot;a;b.png&quot;)"></span>', { ts: true });
  assert.equal(r.jsx, `<span style={{ '--p': "40%", background: "url(\\"a;b.png\\")" } as CSSProperties} />`);
  assert.equal(r.cssProperties, true);
  assert.equal(jsx('<span style="--p: 40%"></span>', { ts: false }), `<span style={{ '--p': "40%" }} />`);
});

test('jsx: void elements, booleans, aria and data kept, handlers dropped', () => {
  assert.equal(
    jsx('<button class="btn" onclick="go()" disabled aria-pressed="false" data-lds-open="s1">Go</button><br><img src="a.png" alt="">'),
    '<button className="btn" disabled aria-pressed="false" data-lds-open="s1">Go</button><br /><img src="a.png" alt="" />',
  );
  assert.equal(jsx('<div data-lds-reveal hidden></div>'), '<div data-lds-reveal="" hidden />');
  assert.equal(jsx('<div role="slider" aria-valuenow="40" aria-valuemin="0"></div>'), '<div role="slider" aria-valuenow={40} aria-valuemin={0} />');
  assert.doesNotMatch(jsx('<a href="#" onClick="x()" onmouseenter="y()">a</a>'), /on[A-Za-z]+=|\/\*/);
});

test('jsx: uncontrolled form state', () => {
  assert.equal(jsx('<input type="checkbox" checked>'), '<input type="checkbox" defaultChecked />');
  assert.equal(jsx('<input value="Rp 50.000">'), '<input defaultValue="Rp 50.000" />');
  assert.equal(jsx('<input type="radio" value="a">'), '<input type="radio" value="a" />');
  assert.equal(
    jsx('<select id="s"><option value="a">A</option><option value="b" selected>B</option></select>'),
    '<select id="s" defaultValue="b"><option value="a">A</option><option value="b">B</option></select>',
  );
});

test('jsx: text escaping, whitespace, comments, scripts, pre', () => {
  assert.equal(jsx('<p>a > b {c}</p>'), '<p>a &gt; b &#123;c&#125;</p>');
  assert.equal(jsx('<p>Status: <b>ok</b></p>'), '<p>Status: <b>ok</b></p>');
  assert.equal(jsx('<p>Total\n  <b>3</b>\n  items</p>'), "<p>Total{' '}\n  <b>3</b>\n  {' '}items</p>");
  assert.equal(jsx('<div><!-- note --><span>x</span></div>'), '<div><span>x</span></div>');
  assert.equal(jsx('<p>x</p>\n<script>alert(1)</script>'), '<p>x</p>');
  assert.equal(jsx('<pre><code>a\n  b</code></pre>'), '<pre><code>{"a\\n  b"}</code></pre>');
});

test('jsx: svg attributes and unknown attributes', () => {
  assert.equal(
    jsx('<svg viewBox="0 0 10 10"><circle cx="5" stroke-width="2" stroke-linecap="round" pathLength="100"></circle></svg>'),
    '<svg viewBox="0 0 10 10"><circle cx="5" strokeWidth="2" strokeLinecap="round" pathLength="100" /></svg>',
  );
  assert.equal(jsx('<dialog closedby="any" class="modal"></dialog>'), '<dialog className="modal" {...{ closedby: "any" }} />');
});

test('jsx: docs-only layout classes turn into inline styles', () => {
  assert.equal(jsx('<div class="docs-row"><b>a</b></div>'), '<div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px" }}><b>a</b></div>');
  assert.equal(
    jsx('<div class="docs-col card" style="max-width: 360px; gap: 8px"></div>'),
    '<div className="card" style={{ display: "flex", flexDirection: "column", width: "100%", maxWidth: "360px", gap: "8px" }} />',
  );
  assert.equal(htmlToJsx('<div>a</div>').single, true);
  assert.equal(htmlToJsx('<div>a</div>\n<div>b</div>').single, false);
});

test('styleObject keeps semicolons inside url() and the last duplicate', () => {
  assert.equal(styleObject('color: red; color: blue').text, '{ color: "blue" }');
  assert.equal(styleObject('background: url(data:image/png;base64,AA)').text, '{ background: "url(data:image/png;base64,AA)" }');
});

test('exampleMarkup prefers clean markup, falls back from JS or JSX code', () => {
  assert.deepEqual(exampleMarkup({ html: '<b onclick="x()">a</b>', code: '<b>a</b>' }), { markup: '<b>a</b>', usage: null });
  assert.equal(exampleMarkup({ html: '<b>a</b>', code: "import { toast } from 'x';" }).markup, '<b>a</b>');
  assert.equal(exampleMarkup({ html: '<b>a</b>', code: '<Tabs value={v} />' }).markup, '<b>a</b>');
});

test('astro and blade escapes', () => {
  assert.equal(htmlToAstro('<p class="docs-note">Use {name}</p>'), '<p style="font: var(--type-footnote); color: var(--text-muted)">Use &#123;name&#125;</p>');
  assert.equal(htmlToBlade('<p>{{ x }}</p>'), '@verbatim\n<p>{{ x }}</p>\n@endverbatim');
  assert.equal(htmlToBlade('<p>@if</p>'), '@verbatim\n<p>@if</p>\n@endverbatim');
  assert.equal(htmlToBlade('<p>siti@campus.ac.id</p>'), '<p>siti@campus.ac.id</p>');
});

// ---------- i18n ----------

test('language: flag, LDS_LANG, locale', () => {
  assert.equal(detectLang('id', {}), 'id');
  assert.equal(detectLang('en', { LDS_LANG: 'id' }), 'en');
  assert.equal(detectLang(undefined, { LDS_LANG: 'id' }), 'id');
  assert.equal(detectLang(undefined, { LANG: 'id_ID.UTF-8' }), 'id');
  assert.equal(detectLang(undefined, { LANG: 'en_US.UTF-8' }), 'en');
  assert.equal(createT('id')('done', { count: 3 }), 'Selesai. 3 berkas berubah.');
});

test('every string exists in both languages', () => {
  assert.deepEqual(Object.keys(STRINGS.id).sort(), Object.keys(STRINGS.en).sort());
  for (const lang of ['en', 'id']) for (const [k, v] of Object.entries(STRINGS[lang])) assert.doesNotMatch(v, /\u2014/, `${lang}.${k} has an em dash`);
});

test('Indonesian output end to end', async () => {
  const dir = fixture('vite');
  const r = await cli(['init', '--cwd', dir, '--no-install', '-y'], { lang: 'id' });
  assert.match(r.out, /Perubahan:/);
  assert.match(r.out, /dibuat: menjalankan init\(\) dan restoreTheme\(\) di browser/);
  assert.match(r.out, /Selesai\. 5 berkas berubah\./);
  const again = await cli(['init', '--cwd', dir, '--no-install', '-y', '--lang', 'id'], { lang: 'en' });
  assert.match(again.out, /Tidak ada yang perlu diubah/);
  const help = await cli(['--help'], { lang: 'id' });
  assert.match(help.out, /Cara pakai/);
  cleanup(dir);
});

// ---------- create ----------

test('create --dry-run prints the official creator and init', async () => {
  const dir = tempDir();
  const r = await cli(['create', 'portal', '-t', 'vite', '--cwd', dir, '--dry-run', '--pm', 'npm']);
  assert.equal(r.code, 0, r.err);
  assert.match(r.out, /\$ npm create vite@latest portal -- --template react-ts/);
  assert.match(r.out, /\$ lampung-ds init -t vite --cwd portal -y --pm npm/);
  cleanup(dir);
  assert.deepEqual(creatorCommand('next', 'a', 'pnpm'), ['pnpm', ['create', 'next-app@latest', 'a', '--yes', '--use-pnpm']]);
  assert.deepEqual(creatorCommand('react-router', 'a', 'yarn'), ['yarn', ['create', 'react-router', 'a', '--yes']]);
  assert.deepEqual(creatorCommand('start', 'a', 'npm'), ['npx', ['--yes', '@tanstack/cli@latest', 'create', 'a']]);
  assert.deepEqual(creatorCommand('start', 'a', 'pnpm'), ['pnpm', ['dlx', '@tanstack/cli@latest', 'create', 'a']]);
  assert.deepEqual(creatorCommand('start', 'a', 'bun'), ['bunx', ['@tanstack/cli@latest', 'create', 'a']]);
  assert.deepEqual(creatorCommand('astro', 'a', 'bun'), ['bun', ['create', 'astro@latest', 'a', '--template', 'basics', '--yes']]);
  assert.deepEqual(creatorCommand('laravel', 'a', 'npm', { PATH: '' }), ['composer', ['create-project', 'laravel/laravel', 'a']]);
  assert.deepEqual(creatorCommand('flutter', 'layanan-kota', 'npm'), ['flutter', ['create', '--project-name', 'layanan_kota', 'layanan-kota']]);
  assert.equal(creatorCommand('html', 'a', 'npm'), null);
});

test('create checks its arguments', async () => {
  let r = await cli(['create', 'x']);
  assert.equal(r.code, 1);
  assert.match(r.err, /Usage: lampung-ds create/);
  const dir = writeTree(tempDir(), { 'taken/file.txt': 'x' });
  r = await cli(['create', 'taken', '-t', 'html', '--cwd', dir]);
  assert.match(r.err, /already exists/);
  r = await cli(['create', 'site', '-t', 'html', '--cwd', dir, '--no-install']);
  assert.equal(r.code, 0, r.err);
  assert.match(r.out, /Created site/);
  cleanup(dir);
});

// ---------- cli basics ----------

test('--version, --help, unknown command and flag', async () => {
  const pkg = JSON.parse((await import('node:fs')).readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
  assert.equal((await cli(['--version'])).out.trim(), pkg.version);
  assert.match((await cli(['--help'])).out, /init +Set up LDS/);
  const u = await cli(['deploy']);
  assert.equal(u.code, 1);
  assert.match(u.err, /Unknown command "deploy"/);
  assert.equal((await cli(['init', '--frobnicate'])).code, 1);
});

test('isViteStarterCss spots the create-vite global CSS, old and new', () => {
  const next = ':root {\n  --text: #6b6375;\n  --accent: #aa3bff;\n}\n#root {\n  width: 1126px;\n  text-align: center;\n}\n';
  const old = ':root {\n  font-family: Inter, system-ui;\n}\na {\n  color: #646cff;\n}\n#root {\n  max-width: 1280px;\n}\n';
  assert.equal(isViteStarterCss(next), true);
  assert.equal(isViteStarterCss(old), true);
  assert.equal(isViteStarterCss(':root { --accent: #aa3bff; }\n.app {}\n'), false);
  assert.equal(isViteStarterCss(`@import "lampung-design-system/css";\n${next}`), false);
});

test('exampleMarkup never turns a page-level snippet into markup', () => {
  const code = '<html lang="en" class="lds">\n<head>\n  <link rel="stylesheet" href="css/lds.css">\n</head>';
  const html = '<div class="codeblock"><pre>&lt;html&gt;</pre></div>';
  assert.deepEqual(exampleMarkup({ html, code }), { markup: html, usage: code });
  // <header> is a normal element, not <head>
  assert.deepEqual(exampleMarkup({ html: '<i>x</i>', code: '<header class="topnav"></header>' }), { markup: '<header class="topnav"></header>', usage: null });
});

test('exampleMarkup skips snippets that point at placeholder image files', () => {
  const html = '<a class="thumb"><img src="https://lampung.kartadinata.app/docs/examples/a.svg" alt=""></a>';
  assert.deepEqual(exampleMarkup({ html, code: '<a class="thumb" href="big.jpg"><img src="small.jpg" alt=""></a>' }).markup, html);
  assert.equal(exampleMarkup({ html, code: '<img src="https://cdn.example/x.jpg" alt="">' }).markup, '<img src="https://cdn.example/x.jpg" alt="">');
});
