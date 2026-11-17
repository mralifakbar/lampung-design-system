// Search and agent metadata for the built site (called by scripts/build-site.mjs on site/):
//   - every page: canonical, hreflang pairs, Open Graph and Twitter tags, theme color, icons, JSON-LD
//   - internal links point at clean URLs (the host redirects /x.html to /x, so linking the
//     .html form costs every click a redirect)
//   - sitemap.xml with language alternates, robots.txt, llms.txt and llms-full.txt
// Pages that already carry a canonical link (the landing pages) keep their hand-written head.
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const SITE = 'Lampung Design System';
const OG = { id: 'id_ID', en: 'en_US' };

const walk = (dir, out = []) => {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
};
const attr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const text = (s) => s.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim();

// site-relative path of an .html file -> its public path
export const cleanPath = (rel) => '/' + rel.replace(/(^|\/)index\.html$/, '$1').replace(/\.html$/, '');

// The same page in the other language, as a site-relative .html path, or null.
function twin(rel) {
  const pairs = [
    [/^docs\/en\/(components|guide)\/(.+)$/, 'docs/$1/$2', 'en'],
    [/^docs\/(components|guide)\/(.+)$/, 'docs/en/$1/$2', 'id'],
    [/^docs\/en\/index\.html$/, 'docs/index.html', 'en'],
    [/^docs\/index\.html$/, 'docs/en/index.html', 'id'],
    [/^docs\/examples\/en\/index\.html$/, 'docs/examples/index.html', 'en'],
    [/^docs\/examples\/index\.html$/, 'docs/examples/en/index.html', 'id'],
    [/^en\/index\.html$/, 'index.html', 'en'],
    [/^index\.html$/, 'en/index.html', 'id'],
  ];
  for (const [re, to, lang] of pairs) if (re.test(rel)) return { lang, other: rel.replace(re, to) };
  return null;
}

// Rewrites href="....html#x" to the clean form, for relative and root-relative links.
const cleanLinks = (html) => html.replace(/(\shref=")(?![a-z][\w+.-]*:|\/\/|#)([^"#?]*?)(index\.html|\.html)((?:[?#][^"]*)?)"/gi, (m, pre, path, ext, rest) => {
  if (ext.toLowerCase() === 'index.html') return `${pre}${path || './'}${rest}"`;
  return `${pre}${path}${rest}"`;
});

// `beacon`: a Cloudflare Web Analytics token (cookieless, no consent banner needed); unset adds nothing.
export function seo(out, origin, { beacon } = {}) {
  const files = walk(out);
  const pages = files.filter((p) => p.endsWith('.html')).map((p) => relative(out, p).split('\\').join('/'));
  const isBoard = (r) => r.startsWith('docs/boards/');
  const noindex = (r) => r === '404.html' || r.startsWith('docs/examples/dashboard/') || isBoard(r);
  const indexed = [];
  const today = new Date().toISOString().slice(0, 10);

  for (const rel of pages) {
    if (isBoard(rel)) continue;
    const file = join(out, rel);
    let html = readFileSync(file, 'utf8');
    html = cleanLinks(html);
    const url = origin + cleanPath(rel);
    const lang = (html.match(/<html[^>]*\slang="([a-z]{2})"/) || [, 'id'])[1];
    const hasHead = /<link rel="canonical"/.test(html);
    const pair = twin(rel);
    const alt = pair && pages.includes(pair.other) ? pair : null;
    if (!noindex(rel)) indexed.push({ rel, url, alt: alt ? { lang: lang === 'id' ? 'en' : 'id', url: origin + cleanPath(alt.other) } : null, lang });

    if (!hasHead && rel !== '404.html') {
      const rawTitle = (html.match(/<title>([\s\S]*?)<\/title>/) || [, SITE])[1];
      const title = text(rawTitle);
      const desc = text((html.match(/<meta name="description" content="([^"]*)"/) || [, ''])[1]);
      const h1 = text((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [, title])[1]);
      // Old relative hreflang links are replaced by absolute ones below.
      html = html.replace(/\n?<link rel="alternate" hreflang="[^"]*" href="[^"]*">/g, '');
      const tags = [
        `<link rel="canonical" href="${url}">`,
        ...(alt ? [
          `<link rel="alternate" hreflang="${lang}" href="${url}">`,
          `<link rel="alternate" hreflang="${lang === 'id' ? 'en' : 'id'}" href="${origin}${cleanPath(alt.other)}">`,
          `<link rel="alternate" hreflang="x-default" href="${lang === 'id' ? url : origin + cleanPath(alt.other)}">`,
        ] : []),
        noindex(rel) ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow, max-image-preview:large">',
        '<meta name="theme-color" content="#FFFFFF" media="(prefers-color-scheme: light)">',
        '<meta name="theme-color" content="#0B0B0D" media="(prefers-color-scheme: dark)">',
        '<link rel="apple-touch-icon" href="/brand/apple-touch-icon.png">',
        '<link rel="manifest" href="/site.webmanifest">',
        `<meta property="og:type" content="${/\/(components|guide)\//.test(rel) ? 'article' : 'website'}">`,
        `<meta property="og:site_name" content="${SITE}">`,
        `<meta property="og:locale" content="${OG[lang]}">`,
        ...(alt ? [`<meta property="og:locale:alternate" content="${OG[lang === 'id' ? 'en' : 'id']}">`] : []),
        `<meta property="og:url" content="${url}">`,
        `<meta property="og:title" content="${attr(title)}">`,
        desc && `<meta property="og:description" content="${attr(desc)}">`,
        `<meta property="og:image" content="${origin}/og.png">`,
        '<meta property="og:image:width" content="1200">',
        '<meta property="og:image:height" content="630">',
        `<meta property="og:image:alt" content="${SITE}">`,
        '<meta name="twitter:card" content="summary_large_image">',
        `<meta name="twitter:title" content="${attr(title)}">`,
        desc && `<meta name="twitter:description" content="${attr(desc)}">`,
        `<meta name="twitter:image" content="${origin}/og.png">`,
      ].filter(Boolean);
      // Markdown twin for agents, when one exists.
      const md = rel.replace(/\.html$/, '.md');
      if (existsSync(join(out, md))) tags.push(`<link rel="alternate" type="text/markdown" href="${origin}/${md}">`);
      // Structured data: an article with breadcrumbs for docs pages, a web site for the docs home.
      const docsHome = `${origin}/docs/${lang === 'en' ? 'en/' : ''}`;
      const crumbs = [{ name: lang === 'en' ? 'Documentation' : 'Dokumentasi', item: docsHome }];
      const m = rel.match(/^docs\/(?:en\/)?(components|guide)\//);
      if (m && m[1] === 'components') crumbs.push({ name: lang === 'en' ? 'Components' : 'Komponen', item: `${docsHome}components/` });
      if (m && !/index\.html$/.test(rel)) crumbs.push({ name: h1, item: url });
      const ld = m ? [{
        '@context': 'https://schema.org', '@type': 'TechArticle', headline: h1, description: desc || undefined, inLanguage: lang, url,
        dateModified: today, isPartOf: { '@type': 'WebSite', name: SITE, url: `${origin}/` },
        publisher: { '@type': 'Organization', name: `${SITE} contributors`, url: 'https://github.com/mralifakbar/lampung-design-system' },
      }, {
        '@context': 'https://schema.org', '@type': 'BreadcrumbList',
        itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.item })),
      }] : /^docs\/(en\/)?index\.html$/.test(rel) ? [{
        '@context': 'https://schema.org', '@type': 'WebSite', name: SITE, url: `${origin}/`, inLanguage: lang, description: desc || undefined,
      }] : [];
      for (const x of ld) tags.push(`<script type="application/ld+json">${JSON.stringify(x).replace(/</g, '\\u003c')}</script>`);
      html = html.replace(/(<meta name="description"[^>]*>|<title>[\s\S]*?<\/title>)(?![\s\S]*<meta name="description")/, `$1\n${tags.join('\n')}`);
    }
    if (beacon && !/cloudflareinsights/.test(html)) html = html.replace('</body>', `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='${JSON.stringify({ token: beacon })}'></script>\n</body>`);
    writeFileSync(file, html);
  }

  // Sitemap with language alternates. lastmod is the build date: the site is rebuilt on every change.
  const xhtml = (e) => e.alt ? `\n    <xhtml:link rel="alternate" hreflang="${e.lang}" href="${e.url}"/>\n    <xhtml:link rel="alternate" hreflang="${e.alt.lang}" href="${e.alt.url}"/>` : '';
  writeFileSync(join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${indexed.sort((a, b) => a.url.localeCompare(b.url)).map((e) => `  <url>\n    <loc>${e.url}</loc>\n    <lastmod>${today}</lastmod>${xhtml(e)}\n  </url>`).join('\n')}
</urlset>
`);
  writeFileSync(join(out, 'robots.txt'), `# Lampung Design System
# Docs for agents: ${origin}/llms.txt (every docs page also has a .md twin)
User-agent: *
Allow: /
Disallow: /docs/boards/

Sitemap: ${origin}/sitemap.xml
`);
  return indexed.length;
}

// llms.txt (https://llmstxt.org): a short map of the docs in Markdown, plus llms-full.txt with the
// English component and guide pages inlined. Built from the .md twins that build-docs wrote.
export function llms(out, origin) {
  const entries = (dir) => (existsSync(join(out, dir)) ? readdirSync(join(out, dir)) : [])
    .filter((f) => f.endsWith('.md') && f !== 'index.md').sort()
    .map((f) => {
      const lines = readFileSync(join(out, dir, f), 'utf8').split('\n');
      const title = lines[0].replace(/^#\s*/, '');
      // Line 3 holds the URL (guides) or "Group: X. URL" (components); the summary follows.
      const summary = lines.slice(3).find((l) => l.trim() && !l.startsWith('#') && !l.startsWith('http')) || '';
      return { file: `${dir}/${f}`, title, summary: summary.trim() };
    });
  const line = (e) => `- [${e.title}](${origin}/${e.file})${e.summary ? `: ${e.summary}` : ''}`;
  const enGuides = entries('docs/en/guide'), enComps = entries('docs/en/components'), idGuides = entries('docs/guide');
  writeFileSync(join(out, 'llms.txt'), `# Lampung Design System

> Unofficial, open source design system for public-service and smart-city websites and apps in Lampung, Indonesia. One token file feeds CSS, JavaScript, shadcn/ui and Flutter; components are plain CSS classes with an optional behavior module; the \`lampung-ds\` CLI adds them to Next.js, Vite, React Router, Astro, Laravel, plain HTML and Flutter projects. Docs are Indonesian first, with English.

Every docs page has a Markdown twin at the same path with \`.md\`. Install: \`npx lampung-ds@latest init\`, then \`npx lampung-ds add <component>\` (or \`--all\`). Packages: npm \`lampung-design-system\`, CLI \`lampung-ds\`, pub.dev \`lampung_design_system\`.

## Guides

${enGuides.map(line).join('\n')}

## Components

${enComps.map(line).join('\n')}

## Panduan (Bahasa Indonesia)

${idGuides.map(line).join('\n')}

## Optional

- [Komponen (Bahasa Indonesia)](${origin}/docs/components/index.md): the component catalog in Indonesian
- [Full English docs in one file](${origin}/llms-full.txt)
- [Source code](https://github.com/mralifakbar/lampung-design-system)
- [Component registry](${origin}/r/index.json): JSON items the CLI installs
`);
  writeFileSync(join(out, 'llms-full.txt'), [
    `# Lampung Design System: full English documentation\n\nSource: ${origin}/docs/en/. Generated from the same sources as the site.`,
    ...[...enGuides, ...enComps].map((e) => readFileSync(join(out, e.file), 'utf8').trim()),
  ].join('\n\n---\n\n') + '\n');
  return enGuides.length + enComps.length;
}

// Every internal href and src in the shipped pages must resolve to a file in site/ (clean URLs map
// to x.html or x/index.html). Returns the broken ones as "page -> target".
export function brokenLinks(out) {
  const broken = [];
  const exists = (p) => {
    const f = join(out, p);
    if (existsSync(f) && statSync(f).isFile()) return true;
    if (existsSync(f + '.html')) return true;
    return existsSync(join(f, 'index.html'));
  };
  for (const file of walk(out).filter((p) => p.endsWith('.html'))) {
    const rel = relative(out, file).split('\\').join('/');
    if (rel.startsWith('docs/boards/')) continue;
    const html = readFileSync(file, 'utf8').replace(/<(script|template)\b[\s\S]*?<\/\1>/gi, '').replace(/<pre\b[\s\S]*?<\/pre>/gi, '');
    // A page served at /a/b (clean URL) resolves relative links against /a/, same as /a/b.html.
    const base = '/' + rel.replace(/[^/]*$/, '');
    for (const m of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
      const h = m[1];
      if (/^(?:[a-z][\w+.-]*:|\/\/|#|\{\{|data:)/i.test(h)) continue;
      const path = decodeURIComponent(h.split(/[?#]/)[0]);
      if (!path) continue;
      const abs = new URL(path, 'https://x' + base).pathname;
      if (!exists(abs.replace(/^\//, '').replace(/\/$/, ''))) broken.push(`${rel} -> ${h}`);
    }
  }
  return [...new Set(broken)];
}
