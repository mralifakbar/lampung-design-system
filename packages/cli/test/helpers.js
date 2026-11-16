import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, readdirSync, statSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Writable } from 'node:stream';
import { main } from '../src/cli.js';

export const REPO = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
export const REGISTRY = join(REPO, 'dist/registry');

export function tempDir(prefix = 'lds-cli-') {
  return mkdtempSync(join(tmpdir(), prefix));
}

export function writeTree(dir, files) {
  for (const [p, content] of Object.entries(files)) {
    if (content == null) continue;
    const f = join(dir, p);
    mkdirSync(dirname(f), { recursive: true });
    writeFileSync(f, typeof content === 'string' ? content : JSON.stringify(content, null, 2));
  }
  return dir;
}

export function readTree(dir) {
  const out = {};
  const walk = (d) => {
    for (const e of readdirSync(d)) {
      const p = join(d, e);
      if (statSync(p).isDirectory()) walk(p);
      else out[relative(dir, p).split(sep).join('/')] = readFileSync(p, 'utf8');
    }
  };
  walk(dir);
  return out;
}

export const read = (dir, p) => readFileSync(join(dir, p), 'utf8');

/** Runs the CLI in-process with captured output and a controlled environment (no network). */
export async function cli(args, { env = {}, lang = 'en' } = {}) {
  let out = '';
  let err = '';
  const sink = (fn) => new Writable({ write(chunk, _e, cb) { fn(String(chunk)); cb(); } });
  const code = await main(args, {
    env: { LDS_LANG: lang, LDS_PACKAGE_DIR: REPO, LDS_REGISTRY: REGISTRY, LDS_OFFLINE: '1', NO_COLOR: '1', PATH: process.env.PATH, ...env },
    stdout: sink((s) => (out += s)),
    stderr: sink((s) => (err += s)),
    stdin: { isTTY: false },
  });
  return { code, out, err };
}

export const cleanup = (dir) => rmSync(dir, { recursive: true, force: true });

// ---------- Fixtures: the files each official template starts with ----------

export const FIXTURES = {
  next: {
    'package.json': { name: 'app', private: true, dependencies: { next: '16.0.0', react: '19.2.0', 'react-dom': '19.2.0' }, devDependencies: { typescript: '^5', tailwindcss: '^4' } },
    'package-lock.json': '{}',
    'tsconfig.json': '{}',
    'app/globals.css': '@import "tailwindcss";\n\n:root {\n  --background: #ffffff;\n}\n',
    'app/layout.tsx': `import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = { title: "Create Next App" };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={\`\${geistSans.variable} antialiased\`}>
        {children}
      </body>
    </html>
  );
}
`,
    'app/page.tsx': 'export default function Home() { return <main />; }\n',
  },
  vite: {
    'package.json': { name: 'app', private: true, type: 'module', dependencies: { react: '^19', 'react-dom': '^19' }, devDependencies: { vite: '^7', typescript: '~5.9', '@vitejs/plugin-react': '^5' } },
    'package-lock.json': '{}',
    'tsconfig.json': '{}',
    'vite.config.ts': "import { defineConfig } from 'vite'\nimport react from '@vitejs/plugin-react'\n\nexport default defineConfig({ plugins: [react()] })\n",
    'index.html': `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Vite + React + TS</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`,
    'src/main.tsx': `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
`,
    'src/index.css': ':root {\n  font-family: system-ui;\n}\n',
    'src/App.tsx': 'export default function App() { return <h1>Hi</h1> }\n',
  },
  'react-router': {
    'package.json': { name: 'app', private: true, type: 'module', dependencies: { 'react-router': '^7', '@react-router/node': '^7' }, devDependencies: { '@react-router/dev': '^7', typescript: '^5' } },
    'pnpm-lock.yaml': '',
    'tsconfig.json': '{}',
    'react-router.config.ts': 'export default { ssr: true };\n',
    'app/app.css': '@import "tailwindcss";\n',
    'app/root.tsx': `import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
`,
  },
  start: {
    'package.json': { name: 'app', private: true, type: 'module', dependencies: { '@tanstack/react-start': '^1', '@tanstack/react-router': '^1', react: '^19' }, devDependencies: { typescript: '^5', vite: '^7' } },
    'bun.lock': '',
    'tsconfig.json': '{}',
    'src/styles.css': '@import "tailwindcss";\n',
    'src/routes/__root.tsx': `import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
`,
  },
  astro: {
    'package.json': { name: 'app', type: 'module', dependencies: { astro: '^5' } },
    'yarn.lock': '',
    'astro.config.mjs': "import { defineConfig } from 'astro/config';\nexport default defineConfig({});\n",
    'src/layouts/Layout.astro': `---
const { title = 'Astro' } = Astro.props;
---

<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>{title}</title>
	</head>
	<body>
		<slot />
	</body>
</html>
`,
    'src/pages/index.astro': "---\nimport Layout from '../layouts/Layout.astro';\n---\n\n<Layout>\n\t<h1>Hi</h1>\n</Layout>\n",
  },
  laravel: {
    'composer.json': { name: 'laravel/laravel', require: { php: '^8.2', 'laravel/framework': '^12.0' } },
    artisan: '#!/usr/bin/env php\n',
    'package.json': { private: true, type: 'module', scripts: { build: 'vite build', dev: 'vite' }, devDependencies: { 'laravel-vite-plugin': '^2', vite: '^7', tailwindcss: '^4' } },
    'resources/css/app.css': "@import 'tailwindcss';\n\n@source '../../vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php';\n",
    'resources/js/app.js': "import './bootstrap';\n",
    'resources/views/welcome.blade.php': `<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <title>{{ config('app.name', 'Laravel') }}</title>
    </head>
    <body>
        <h1>Laravel</h1>
    </body>
</html>
`,
  },
  html: {},
  flutter: {
    'pubspec.yaml': 'name: app\ndependencies:\n  flutter:\n    sdk: flutter\n',
    'lib/main.dart': `import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      home: const MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}
`,
  },
};

export function fixture(name, extra = {}) {
  const dir = tempDir(`lds-${name}-`);
  writeTree(dir, { ...FIXTURES[name], ...extra });
  return dir;
}
