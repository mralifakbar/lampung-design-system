// Installation guides: one overview with a framework picker, then one page per framework.
// Each framework page is built from the same outline so they never drift apart:
// new project (CLI create), existing project (CLI init), manual setup, first component.

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const code = (s) => `<div class="codeblock"><pre>${esc(s.trim())}</pre></div>`;
const c = (s) => `<code class="code">${esc(s)}</code>`;

const PROVIDER_TSX = `'use client';
import { useEffect } from 'react';
import { init, restoreTheme } from 'lampung-design-system/js';

export function LdsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    restoreTheme(document.documentElement, 'light');
    init();
  }, []);
  return <>{children}</>;
}`;

const FRAMEWORKS = [
  {
    key: 'next', name: 'Next.js', icon: 'public', t: 'next',
    files: { css: 'app/globals.css', root: 'app/layout.tsx', provider: 'components/lds-provider.tsx' },
    manual: {
      css: `/* app/globals.css */\n@import "lampung-design-system/css";`,
      root: `// app/layout.tsx\nimport './globals.css';\nimport { LdsProvider } from '@/components/lds-provider';\n\nexport default function RootLayout({ children }: { children: React.ReactNode }) {\n  return (\n    <html lang="id" className="lds" data-theme="light" suppressHydrationWarning>\n      <body className="lds">\n        <LdsProvider>{children}</LdsProvider>\n      </body>\n    </html>\n  );\n}`,
      behaviors: `// components/lds-provider.tsx\n${PROVIDER_TSX}`,
    },
  },
  {
    key: 'vite', name: 'Vite', icon: 'bolt', t: 'vite',
    files: { css: 'src/index.css', root: 'index.html', provider: 'src/lds-provider.tsx' },
    manual: {
      css: `/* src/index.css */\n@import "lampung-design-system/css";`,
      root: `<!-- index.html -->\n<html lang="id" class="lds" data-theme="light">\n  <body class="lds">\n    <div id="root"></div>\n    <script type="module" src="/src/main.tsx"></script>\n  </body>\n</html>`,
      behaviors: `// src/main.tsx\nimport { StrictMode } from 'react';\nimport { createRoot } from 'react-dom/client';\nimport './index.css';\nimport { LdsProvider } from './lds-provider';\nimport App from './App';\n\ncreateRoot(document.getElementById('root')!).render(\n  <StrictMode><LdsProvider><App /></LdsProvider></StrictMode>,\n);`,
    },
  },
  {
    key: 'start', name: 'TanStack Start', icon: 'layers', t: 'start',
    files: { css: 'src/styles.css', root: 'src/routes/__root.tsx', provider: 'src/components/lds-provider.tsx' },
    manual: {
      css: `/* src/styles.css */\n@import "lampung-design-system/css";`,
      root: `// src/routes/__root.tsx (the document shell)\nfunction RootDocument({ children }: { children: React.ReactNode }) {\n  return (\n    <html lang="id" className="lds" data-theme="light" suppressHydrationWarning>\n      <head><HeadContent /></head>\n      <body className="lds">\n        <LdsProvider>{children}</LdsProvider>\n        <Scripts />\n      </body>\n    </html>\n  );\n}`,
      behaviors: `// src/components/lds-provider.tsx\n${PROVIDER_TSX}`,
    },
  },
  {
    key: 'react-router', name: 'React Router', icon: 'route', t: 'react-router',
    files: { css: 'app/app.css', root: 'app/root.tsx', provider: 'app/components/lds-provider.tsx' },
    manual: {
      css: `/* app/app.css */\n@import "lampung-design-system/css";`,
      root: `// app/root.tsx\nexport function Layout({ children }: { children: React.ReactNode }) {\n  return (\n    <html lang="id" className="lds" data-theme="light" suppressHydrationWarning>\n      <head><Meta /><Links /></head>\n      <body className="lds">\n        <LdsProvider>{children}</LdsProvider>\n        <ScrollRestoration />\n        <Scripts />\n      </body>\n    </html>\n  );\n}`,
      behaviors: `// app/components/lds-provider.tsx\n${PROVIDER_TSX}`,
    },
  },
  {
    key: 'astro', name: 'Astro', icon: 'rocket_launch', t: 'astro',
    files: { css: 'src/styles/global.css', root: 'src/layouts/Layout.astro' },
    manual: {
      css: `/* src/styles/global.css */\n@import "lampung-design-system/css";`,
      root: `---\n// src/layouts/Layout.astro\nimport '../styles/global.css';\n---\n<html lang="id" class="lds" data-theme="light">\n  <body class="lds">\n    <slot />\n  </body>\n</html>`,
      behaviors: `<!-- at the end of src/layouts/Layout.astro -->\n<script>\n  import { init, restoreTheme } from 'lampung-design-system/js';\n  restoreTheme(document.documentElement, 'light');\n  init();\n</script>`,
    },
  },
  {
    key: 'laravel', name: 'Laravel', icon: 'code', t: 'laravel', preCreate: 'laravel new kota-contoh\ncd kota-contoh',
    files: { css: 'resources/css/app.css', root: 'resources/views/layouts/app.blade.php', provider: 'resources/js/app.js' },
    manual: {
      css: `/* resources/css/app.css */\n@import "lampung-design-system/css";`,
      root: `{{-- resources/views/layouts/app.blade.php --}}\n<html lang="id" class="lds" data-theme="light">\n<head>\n  @vite(['resources/css/app.css', 'resources/js/app.js'])\n</head>\n<body class="lds">\n  @yield('content')\n</body>\n</html>`,
      behaviors: `// resources/js/app.js\nimport { init, restoreTheme } from 'lampung-design-system/js';\nrestoreTheme(document.documentElement, 'light');\ninit();`,
    },
  },
  {
    key: 'html', name: 'HTML', icon: 'description', t: 'html',
    files: { css: 'lds/css/lds.css', root: 'index.html' },
    manual: {
      css: `<!-- from a CDN, no install -->\n<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lampung-design-system@0/css/lds.css">`,
      root: `<!doctype html>\n<html lang="id" class="lds" data-theme="light">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lampung-design-system@0/css/lds.css">\n</head>\n<body class="lds">\n  <button class="btn btn--primary">Kirim laporan</button>\n</body>\n</html>`,
      behaviors: `<script type="module">\n  import { init } from 'https://cdn.jsdelivr.net/npm/lampung-design-system@0/js/lds.js';\n  init();\n</script>`,
    },
  },
  {
    key: 'flutter', name: 'Flutter', icon: 'smartphone', t: 'flutter', noNpm: true,
    files: { root: 'lib/main.dart' },
    manual: {
      css: `flutter pub add lampung_design_system`,
      root: `// lib/main.dart\nimport 'package:flutter/material.dart';\nimport 'package:lampung_design_system/lampung_design_system.dart';\n\nvoid main() => runApp(const KotaApp());\n\nclass KotaApp extends StatelessWidget {\n  const KotaApp({super.key});\n\n  @override\n  Widget build(BuildContext context) {\n    return MaterialApp(\n      theme: LdsTheme.light(),\n      darkTheme: LdsTheme.dark(),\n      home: Scaffold(\n        body: Center(\n          child: LdsButton(label: 'Kirim laporan', onPressed: () {}),\n        ),\n      ),\n    );\n  }\n}`,
      behaviors: `LdsAksara('Lampung')        // aksara Lampung, drawn from the same glyphs\nLdsMasthead()                // "not an official government site" strip`,
    },
  },
  {
    key: 'shadcn', name: 'shadcn/ui', icon: 'widgets', t: null,
    files: { css: 'app/globals.css' },
    manual: {
      css: `npx shadcn@latest add https://lampung.kartadinata.app/r/lds.json`,
      root: `/* or copy the theme by hand */\n@import "lampung-design-system/shadcn/globals.css";`,
      behaviors: `npx shadcn@latest init --preset https://lampung.kartadinata.app/r/lds.json`,
    },
  },
];

const T = {
  id: {
    overviewTitle: 'Instalasi', overviewNav: 'Instalasi',
    overviewLede: 'Pilih framework yang Anda pakai. CLI <code class="code">lampung-ds</code> menyiapkan semuanya: memasang paket, mengimpor CSS, memberi kelas <code class="code">lds</code> pada <code class="code">&lt;html&gt;</code>, dan menyalakan perilaku interaktif.',
    choose: 'Pilih framework', chooseP: 'Setiap halaman berisi tiga jalur: proyek baru, proyek yang sudah ada, dan pemasangan manual.',
    quick: 'Cara tercepat', quickP: 'Di folder proyek yang sudah ada, jalankan perintah ini. CLI mengenali framework Anda dari berkas proyek, atau menanyakannya bila belum yakin.',
    cdn: 'Tanpa instalasi', cdnP: 'Untuk prototipe atau halaman statis, muat langsung dari CDN:',
    req: 'Prasyarat', reqItems: ['Node.js 20 atau lebih baru untuk proyek web.', 'Flutter 3.27 atau lebih baru untuk aplikasi Flutter.', 'Terminal yang terbuka di folder proyek (folder yang berisi <code class="code">package.json</code>, <code class="code">composer.json</code>, atau <code class="code">pubspec.yaml</code>).'],
    newP: 'Proyek baru', newPP: (n) => `Buat proyek ${n} baru yang sudah memakai LDS dalam satu langkah:`,
    preP: 'Buat aplikasinya dulu dengan pembuat resmi framework:',
    existing: 'Proyek yang sudah ada', existingP: 'Jalankan di folder proyek. Perintah ini aman diulang: jalankan dua kali, tidak ada yang berubah lagi.',
    changes: 'Yang diubah CLI', manual: 'Pemasangan manual', manualP: 'Lebih suka mengatur sendiri? Ini langkah yang sama dengan yang dijalankan CLI.',
    m1: 'Pasang paketnya', m2: 'Impor CSS', m3: 'Tandai elemen root', m4: 'Nyalakan perilaku interaktif',
    first: 'Komponen pertama', firstP: 'Tambahkan komponen ke proyek Anda. CLI menyalin markup yang sudah teruji ke folder komponen Anda, siap diubah.',
    firstFlutter: 'Widget pertama', flutterAdd: 'Tambahkan paket', flutterUse: 'Pakai tema dan widget', flutterMore: 'Widget lain',
    shadcnLede: 'Sudah memakai shadcn/ui? Pasang tema LDS (warna terang dan gelap, Geist, skala tipe, spasi, radius, bayangan, dan kurva gerak) lewat registry. Bentuk komponen tetap milik shadcn; untuk tampilan dan gerak LDS yang persis, pakai kelas CSS LDS.',
    shadcn1: 'Tambahkan tema ke proyek yang ada', shadcn2: 'Atau salin manual', shadcn3: 'Mulai proyek baru dengan preset LDS',
    fwLede: (n) => `Menyiapkan Lampung Design System di proyek ${n}.`,
    files: { css: 'stylesheet global: impor <code class="code">lampung-design-system/css</code>', root: 'elemen <code class="code">&lt;html&gt;</code>: kelas <code class="code">lds</code>, <code class="code">lang="id"</code>, <code class="code">data-theme</code>', provider: 'perilaku interaktif: <code class="code">init()</code> dan tema tersimpan', json: 'konfigurasi CLI untuk perintah <code class="code">add</code>' },
    next: 'Langkah berikutnya', nextItems: ['Baca <a class="link" href="{{guide}}cli.html">semua perintah CLI</a>.', 'Telusuri <a class="link" href="{{comp}}index.html">daftar komponen</a> sebelum membuat komponen baru.', 'Atur <a class="link" href="{{guide}}tema.html">tema dan warna instansi</a>.'],
  },
  en: {
    overviewTitle: 'Installation', overviewNav: 'Installation',
    overviewLede: 'Pick your framework. The <code class="code">lampung-ds</code> CLI sets everything up: it installs the package, imports the CSS, puts the <code class="code">lds</code> class on <code class="code">&lt;html&gt;</code> and turns on the interactive behaviors.',
    choose: 'Choose your framework', chooseP: 'Each page has three paths: a new project, an existing project, and manual setup.',
    quick: 'Fastest way', quickP: 'Run this in an existing project folder. The CLI detects your framework from the project files, or asks when it cannot tell.',
    cdn: 'No install', cdnP: 'For a prototype or a static page, load it straight from a CDN:',
    req: 'Requirements', reqItems: ['Node.js 20 or newer for web projects.', 'Flutter 3.27 or newer for Flutter apps.', 'A terminal open in the project folder (the one with <code class="code">package.json</code>, <code class="code">composer.json</code> or <code class="code">pubspec.yaml</code>).'],
    newP: 'New project', newPP: (n) => `Create a new ${n} project that already uses LDS in one step:`,
    preP: 'Create the app first with the framework\'s official creator:',
    existing: 'Existing project', existingP: 'Run it in the project folder. It is safe to repeat: run it twice and nothing changes the second time.',
    changes: 'What the CLI changes', manual: 'Manual setup', manualP: 'Prefer to wire it yourself? These are the same steps the CLI runs.',
    m1: 'Install the package', m2: 'Import the CSS', m3: 'Mark the root element', m4: 'Turn on the interactive behaviors',
    first: 'First component', firstP: 'Add components to your project. The CLI copies tested markup into your components folder, ready to edit.',
    firstFlutter: 'First widget', flutterAdd: 'Add the package', flutterUse: 'Use the theme and widgets', flutterMore: 'More widgets',
    shadcnLede: 'Already on shadcn/ui? Install the LDS theme (light and dark colors, Geist, type scale, spacing, radius, elevation and motion curves) from the registry. Component shapes stay shadcn\'s; for the exact LDS look and motion, use the LDS CSS classes.',
    shadcn1: 'Add the theme to an existing project', shadcn2: 'Or copy it by hand', shadcn3: 'Start a new project with the LDS preset',
    fwLede: (n) => `Set up Lampung Design System in a ${n} project.`,
    files: { css: 'global stylesheet: imports <code class="code">lampung-design-system/css</code>', root: 'the <code class="code">&lt;html&gt;</code> element: <code class="code">lds</code> class, <code class="code">lang</code>, <code class="code">data-theme</code>', provider: 'interactive behaviors: <code class="code">init()</code> and the saved theme', json: 'CLI settings for the <code class="code">add</code> command' },
    next: 'Next steps', nextItems: ['Read <a class="link" href="{{guide}}cli.html">every CLI command</a>.', 'Browse the <a class="link" href="{{comp}}index.html">component list</a> before building something new.', 'Set up <a class="link" href="{{guide}}tema.html">theming and agency colors</a>.'],
  },
};

const cards = (lang) => `<div class="link-grid">${FRAMEWORKS.map((f) => `<a class="link-card" href="instalasi-${f.key}.html"><span class="link-card__eyebrow"><span class="ic ic--sm" aria-hidden="true">${f.icon}</span></span><span class="link-card__title">${f.name}</span><span class="link-card__body">${lang === 'id' ? (f.key === 'shadcn' ? 'Tema untuk proyek shadcn/ui' : f.key === 'html' ? 'CDN atau berkas statis' : `${f.t ? `<code class="code">-t ${f.t}</code>` : ''}`) : (f.key === 'shadcn' ? 'A theme for shadcn/ui projects' : f.key === 'html' ? 'CDN or static files' : `${f.t ? `<code class="code">-t ${f.t}</code>` : ''}`)}</span></a>`).join('')}</div>`;

const overview = (lang) => {
  const s = T[lang];
  return `<h2>${s.choose}</h2><p class="cdoc__p">${s.chooseP}</p>${cards(lang)}
<h2>${s.quick}</h2><p class="cdoc__p">${s.quickP}</p>${code('npx lampung-ds@latest init')}
<h2>${s.cdn}</h2><p class="cdoc__p">${s.cdnP}</p>${code(FRAMEWORKS.find((f) => f.key === 'html').manual.root)}${code(FRAMEWORKS.find((f) => f.key === 'html').manual.behaviors)}
<h2>${s.req}</h2><ul class="cdoc__list">${s.reqItems.map((i) => `<li>${i}</li>`).join('')}</ul>`;
};

const frameworkPage = (f, lang) => {
  const s = T[lang];
  if (f.key === 'shadcn') {
    return `<h2>${s.shadcn1}</h2>${code(f.manual.css)}<h2>${s.shadcn2}</h2>${code(`npm install lampung-design-system\n\n${f.manual.root}`)}<h2>${s.shadcn3}</h2>${code(f.manual.behaviors)}<h2>${s.next}</h2><ul class="cdoc__list">${s.nextItems.map((i) => `<li>${i}</li>`).join('')}</ul>`;
  }
  if (f.key === 'flutter') {
    return `<h2>${s.flutterAdd}</h2>${code(f.manual.css)}<p class="cdoc__p">${lang === 'id' ? 'Atau biarkan CLI yang menambahkan paket dan memasang tema di <code class="code">lib/main.dart</code>:' : 'Or let the CLI add the package and wire the theme in <code class="code">lib/main.dart</code>:'}</p>${code('npx lampung-ds@latest init -t flutter')}
<h2>${s.flutterUse}</h2>${code(f.manual.root)}
<h2>${s.flutterMore}</h2>${code(f.manual.behaviors)}<p class="cdoc__p">${lang === 'id' ? 'Paket membawa font Geist, Geist Mono, dan ikon LDS sendiri, jadi aplikasi tetap tampil benar tanpa koneksi.' : 'The package bundles Geist, Geist Mono and the LDS icon fonts, so apps render correctly offline.'}</p>
<h2>${s.next}</h2><ul class="cdoc__list">${s.nextItems.map((i) => `<li>${i}</li>`).join('')}</ul>`;
  }
  const changed = [['css', f.files.css], ['root', f.files.root], ['provider', f.files.provider], ['json', 'lds.json']].filter(([, p]) => p);
  const newProject = f.preCreate
    ? `<p class="cdoc__p">${s.preP}</p>${code(f.preCreate)}${code(`npx lampung-ds@latest init -t ${f.t}`)}`
    : f.key === 'html' ? code('npx lampung-ds@latest init -t html') : code(`npx lampung-ds@latest create kota-contoh -t ${f.t}`);
  return `<h2>${s.newP}</h2>${f.preCreate ? '' : `<p class="cdoc__p">${s.newPP(f.name)}</p>`}${newProject}
<h2>${s.existing}</h2><p class="cdoc__p">${s.existingP}</p>${code(`npx lampung-ds@latest init${f.key === 'html' ? ' -t html' : ''}`)}
<p class="cdoc__p"><strong>${s.changes}</strong></p><div class="table-box"><table class="table table--wrap"><tbody>${changed.map(([k, p]) => `<tr><td>${c(p)}</td><td>${s.files[k]}</td></tr>`).join('')}</tbody></table></div>
<h2>${s.manual}</h2><p class="cdoc__p">${s.manualP}</p>
${f.key === 'html' ? '' : `<p class="cdoc__p"><strong>1. ${s.m1}</strong></p>${code('npm install lampung-design-system')}`}
<p class="cdoc__p"><strong>${f.key === 'html' ? 1 : 2}. ${s.m2}</strong></p>${code(f.manual.css)}
<p class="cdoc__p"><strong>${f.key === 'html' ? 2 : 3}. ${s.m3}</strong></p>${code(f.manual.root)}
<p class="cdoc__p"><strong>${f.key === 'html' ? 3 : 4}. ${s.m4}</strong></p>${code(f.manual.behaviors)}
<h2>${s.first}</h2><p class="cdoc__p">${s.firstP}</p>${code('npx lampung-ds@latest add button text-field alert')}
<h2>${s.next}</h2><ul class="cdoc__list">${s.nextItems.map((i) => `<li>${i}</li>`).join('')}</ul>`;
};

export default [
  {
    slug: 'instalasi', order: 1, icon: 'download',
    id: { title: T.id.overviewTitle, lede: T.id.overviewLede, body: overview('id') },
    en: { title: T.en.overviewTitle, lede: T.en.overviewLede, body: overview('en') },
  },
  ...FRAMEWORKS.map((f, i) => ({
    slug: `instalasi-${f.key}`, order: 1 + (i + 1) / 100, icon: f.icon, parent: 'instalasi', hidden: true,
    id: { title: f.name, lede: f.key === 'shadcn' ? T.id.shadcnLede : T.id.fwLede(f.name), body: frameworkPage(f, 'id') },
    en: { title: f.name, lede: f.key === 'shadcn' ? T.en.shadcnLede : T.en.fwLede(f.name), body: frameworkPage(f, 'en') },
  })),
];
