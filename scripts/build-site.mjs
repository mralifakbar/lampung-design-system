// Assembles site/ for Cloudflare (wrangler.jsonc serves it as static assets):
//   /                 apps/landing (Indonesian), /en/ (English)
//   /docs/            documentation (Indonesian), /docs/en/ (English), /docs/examples/
//   /css /js /fonts /aksara /icons /tokens /dist   the package files the pages and CDN users load
//   /r/<name>.json    shadcn registry items (theme, fonts) and the component registry for the CLI
//   /404.html, /_headers, /robots.txt, /sitemap.xml
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { transformSync } from 'esbuild';
import { brokenLinks, llms, seo } from './site-seo.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'site');
const ORIGIN = process.env.LDS_SITE_ORIGIN || 'https://lampung.kartadinata.app';

if (existsSync(out)) rmSync(out, { recursive: true });
mkdirSync(out, { recursive: true });

const copy = (from, to = from, filter) => {
  const src = join(root, from);
  if (!existsSync(src)) throw new Error(`build-site: missing ${from}; run npm run build first`);
  cpSync(src, join(out, to), { recursive: true, filter: filter || (() => true) });
};
const skip = (...parts) => (p) => !parts.some((x) => p.includes(`${x}`)) && !p.endsWith('.DS_Store');

// Landing page at the root.
for (const f of readdirSync(join(root, 'apps/landing'))) {
  if (['package.json', 'README.md', 'node_modules'].includes(f)) continue;
  copy(`apps/landing/${f}`, f);
}

// Package files, so /css/lds.css and friends resolve for the pages and for anyone linking them.
for (const d of ['css', 'js', 'fonts', 'aksara', 'icons', 'tokens', 'react', 'brand']) copy(d, d, skip('.inline.txt'));
copy('dist', 'dist', skip('/registry/'));
copy('LICENSE', 'LICENSE.txt');

// Documentation and examples. Spec and guide sources stay out; only built pages ship.
copy('docs', 'docs', skip('/docs/spec', '/docs/guides', '/examples/src', '/examples/README.md'));

// Minify what the pages load (the npm package keeps the readable sources). Cuts css/ and js/ by about half
// before compression; Cloudflare then serves them with Brotli.
for (const dir of ['css', 'js', 'docs', '.']) {
  const abs = join(out, dir);
  for (const f of readdirSync(abs)) {
    const p = join(abs, f);
    if (statSync(p).isDirectory()) continue;
    const loader = f.endsWith('.css') ? 'css' : f.endsWith('.js') && !f.endsWith('.d.ts') ? 'js' : null;
    if (!loader) continue;
    const src = readFileSync(p, 'utf8');
    writeFileSync(p, transformSync(src, { loader, minify: true, legalComments: 'none', ...(loader === 'js' ? { format: 'esm', target: 'es2020' } : { target: ['chrome100', 'safari15', 'firefox100'] }) }).code);
  }
}

// Registries under /r: shadcn items and one JSON per component for `lampung-ds add`.
mkdirSync(join(out, 'r'), { recursive: true });
for (const dir of ['dist/shadcn/registry', 'dist/registry']) {
  const src = join(root, dir);
  if (!existsSync(src)) continue;
  for (const f of readdirSync(src).filter((x) => x.endsWith('.json'))) cpSync(join(src, f), join(out, 'r', f));
}

// 404 in both languages, built with the system itself.
writeFileSync(join(out, '404.html'), `<!doctype html>
<html lang="id" class="lds" data-theme="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Halaman tidak ditemukan · Lampung Design System</title>
<link rel="icon" href="/brand/mark.svg" type="image/svg+xml">
<link rel="stylesheet" href="/css/lds.css">
<script>try { document.documentElement.setAttribute('data-theme', localStorage.getItem('lds-theme') || 'system'); } catch (e) {}</script>
<style>
  body { min-height: 100dvh; display: grid; grid-template-rows: auto 1fr; }
  main { display: grid; place-items: center; padding: 48px 20px; }
  .nf { max-width: 520px; display: grid; gap: 16px; justify-items: center; text-align: center; }
  .nf h1 { font: var(--type-title-1); letter-spacing: var(--tracking-title-1); color: var(--text-strong); margin: 0; }
  .nf p { font: var(--type-body); color: var(--text-subtle); margin: 0; }
  .nf .aksara-band { width: 280px; }
</style>
</head>
<body class="lds">
<div class="masthead" role="region" aria-label="Status situs"><div class="masthead__bar"><span class="masthead__mark" aria-hidden="true"><span class="ic">info</span></span><span class="masthead__text">Proyek komunitas. Ini bukan situs resmi pemerintah.</span></div></div>
<main>
  <div class="nf">
    <img src="/brand/mark.svg" width="72" height="72" alt="">
    <h1>Halaman tidak ditemukan</h1>
    <p>Alamatnya mungkin salah ketik atau halamannya sudah dipindah. <span lang="en">This page could not be found.</span></p>
    <div class="cluster" style="justify-content: center;">
      <a class="btn btn--primary" href="/docs/">Buka dokumentasi</a>
      <a class="btn btn--secondary" href="/">Ke beranda</a>
      <a class="btn btn--plain" href="/en/" lang="en">English home</a>
    </div>
    <div class="aksara-band aksara-band--sm" aria-hidden="true"></div>
  </div>
</main>
<script type="module">import { init } from '/js/lds.js'; init();</script>
</body>
</html>
`);

// Headers: long cache for fingerprint-free but stable assets is risky, so assets get a short cache with
// revalidation; fonts and glyphs (rarely change) get a week. Registries are readable from anywhere.
writeFileSync(join(out, '_headers'), `/*
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(self)
  X-Frame-Options: SAMEORIGIN

/fonts/*
  Cache-Control: public, max-age=604800
  Access-Control-Allow-Origin: *

/aksara/*
  Cache-Control: public, max-age=604800
  Access-Control-Allow-Origin: *

/css/*
  Cache-Control: public, max-age=3600, must-revalidate
  Access-Control-Allow-Origin: *

/js/*
  Cache-Control: public, max-age=3600, must-revalidate
  Access-Control-Allow-Origin: *

/r/*
  Cache-Control: public, max-age=600
  Access-Control-Allow-Origin: *
  Content-Type: application/json; charset=utf-8

/*.md
  Content-Type: text/markdown; charset=utf-8
  Access-Control-Allow-Origin: *
  X-Robots-Tag: noindex

/llms.txt
  Content-Type: text/plain; charset=utf-8
  Access-Control-Allow-Origin: *

/llms-full.txt
  Content-Type: text/plain; charset=utf-8
  Access-Control-Allow-Origin: *

/brand/*
  Cache-Control: public, max-age=604800
`);

// Web app manifest and a /favicon.ico (browsers ask for it even with an SVG icon declared).
writeFileSync(join(out, 'site.webmanifest'), JSON.stringify({
  name: 'Lampung Design System', short_name: 'LDS', start_url: '/', display: 'browser',
  background_color: '#FFFFFF', theme_color: '#0B6E4F',
  icons: [
    { src: '/brand/icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: '/brand/icon-512.png', sizes: '512x512', type: 'image/png' },
    { src: '/brand/mark.svg', sizes: 'any', type: 'image/svg+xml' },
  ],
}, null, 2) + '\n');
{
  // An ICO holding one 32 px PNG (valid since Windows Vista and in every current browser).
  const png = readFileSync(join(root, 'brand/icon-32.png'));
  const head = Buffer.alloc(22);
  head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(1, 4);
  head.writeUInt8(32, 6); head.writeUInt8(32, 7); head.writeUInt16LE(1, 10); head.writeUInt16LE(32, 12);
  head.writeUInt32LE(png.length, 14); head.writeUInt32LE(22, 18);
  writeFileSync(join(out, 'favicon.ico'), Buffer.concat([head, png]));
}

// Canonical URLs, hreflang, social tags, structured data, clean links, sitemap, robots and llms.txt.
// Cloudflare Web Analytics site token (dashboard > Analytics & Logs > Web Analytics). It is public by
// design (it ships in every page); LDS_CF_BEACON overrides it, and LDS_CF_BEACON=off builds without it.
const BEACON = process.env.LDS_CF_BEACON ?? 'b9db7c66045745a5bd2a023ad1b785e2';
const pageCount = seo(out, ORIGIN, { beacon: BEACON === 'off' ? '' : BEACON });
const llmsCount = llms(out, ORIGIN);
const broken = brokenLinks(out);
if (broken.length) throw new Error(`build-site: ${broken.length} broken internal link(s)\n  ${broken.slice(0, 40).join('\n  ')}`);

// Sanity: the pages the landing links to must exist.
for (const must of ['index.html', 'en/index.html', 'docs/index.html', 'docs/en/index.html', 'docs/components/button.html', 'docs/en/components/button.html', 'docs/guide/instalasi.html', 'css/lds.css', 'js/lds.js', 'js/aksara.js', 'r/lds.json']) {
  if (!existsSync(join(out, must))) throw new Error(`build-site: ${must} is missing from site/`);
}
const size = (dir) => readdirSync(dir).reduce((n, f) => { const p = join(dir, f); return n + (statSync(p).isDirectory() ? size(p) : statSync(p).size); }, 0);
console.log(`build-site: ${pageCount} indexed pages, ${llmsCount} in llms.txt, ${(size(out) / 1048576).toFixed(1)} MB in site/`);
JSON.parse(readFileSync(join(out, 'r/lds.json'), 'utf8'));
