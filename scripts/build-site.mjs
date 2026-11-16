// Assembles site/ for Cloudflare (wrangler.jsonc serves it as static assets):
//   /                 apps/landing (Indonesian), /en/ (English)
//   /docs/            documentation (Indonesian), /docs/en/ (English), /docs/examples/
//   /css /js /fonts /aksara /icons /tokens /dist   the package files the pages and CDN users load
//   /r/<name>.json    shadcn registry items (theme, fonts) and the component registry for the CLI
//   /404.html, /_headers, /robots.txt, /sitemap.xml
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

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
for (const d of ['css', 'js', 'fonts', 'aksara', 'icons', 'tokens', 'react']) copy(d);
copy('dist', 'dist', skip('/registry/'));
copy('LICENSE', 'LICENSE.txt');

// Documentation and examples. Spec and guide sources stay out; only built pages ship.
copy('docs', 'docs', skip('/docs/spec', '/docs/guides', '/examples/src', '/examples/README.md'));

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
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
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
`);

// robots and sitemap from the HTML that actually shipped.
const pages = [];
const walk = (dir) => {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.html') && f !== '404.html' && !p.includes(`${join('docs', 'boards')}`)) pages.push(relative(out, p).split('\\').join('/'));
  }
};
walk(out);
const url = (p) => `${ORIGIN}/${p.replace(/(^|\/)index\.html$/, '$1')}`;
writeFileSync(join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.sort().map((p) => `  <url><loc>${url(p)}</loc></url>`).join('\n')}\n</urlset>\n`);
writeFileSync(join(out, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${ORIGIN}/sitemap.xml\n`);

// Sanity: the pages the landing links to must exist.
for (const must of ['index.html', 'en/index.html', 'docs/index.html', 'docs/en/index.html', 'docs/components/button.html', 'docs/en/components/button.html', 'docs/guide/instalasi.html', 'css/lds.css', 'js/lds.js', 'js/aksara.js', 'r/lds.json']) {
  if (!existsSync(join(out, must))) throw new Error(`build-site: ${must} is missing from site/`);
}
const size = (dir) => readdirSync(dir).reduce((n, f) => { const p = join(dir, f); return n + (statSync(p).isDirectory() ? size(p) : statSync(p).size); }, 0);
console.log(`build-site: ${pages.length} pages, ${(size(out) / 1048576).toFixed(1)} MB in site/`);
JSON.parse(readFileSync(join(out, 'r/lds.json'), 'utf8'));
