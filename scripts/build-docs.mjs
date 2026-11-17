// Builds the per-component documentation from docs/spec/*.mjs, one page per component:
//   docs/components/<slug>.html                          the page people read (live demos, chained prev/next)
//   docs/components/index.html                           every component, grouped
//   skills/lampung-design-system/references/components/<slug>.md   the same content for agents
//   skills/lampung-design-system/references/components.md            the index agents read first
// Both outputs come from the same spec, so the site and the skill cannot drift.
// It also checks every example: icon names must exist, classes must exist in css/components.css,
// related links must point at real specs. Any problem fails the build.
//   node scripts/build-docs.mjs                 build everything
//   node scripts/build-docs.mjs --check a b     only check the named specs (or all), write nothing;
//                                               links to specs that do not exist yet are warnings
import { readFileSync, writeFileSync, readdirSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { shell } from './docs-shell.mjs';
import { htmlToMd } from './html-to-md.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
// The siger mark drawn by scripts/build-brand.mjs.
const SIGER = readFileSync(join(root, 'brand/siger.inline.txt'), 'utf8').trim();
const specDir = join(root, 'docs/spec');
const idDir = join(specDir, 'id');
const OUT = { id: join(root, 'docs/components'), en: join(root, 'docs/en/components') };
const skillDir = join(root, 'skills/lampung-design-system/references/components');

// Interface strings for the two documentation languages. Indonesian is the default site (docs/),
// English lives under docs/en/. Spec text comes from docs/spec (en) merged with docs/spec/id (id).
const STRINGS = {
  en: {
    html: 'en', intro: 'Introduction', masthead: 'Community project. This is not an official government website.', mastheadMore: 'How to tell', mastheadLabel: 'Site status', mastheadA: '<b>Run by volunteers.</b> Lampung Design System is built by an open source community. No government agency runs or endorses it.', mastheadB: '<b>Official services use go.id.</b> Government websites in Indonesia end in .go.id. Never enter your national ID number on a site you are unsure of.', docs: 'Documentation', components: 'Components', start: 'Getting started', all: 'All components', examples: 'Examples',
    appearance: 'Appearance', light: 'Light', dark: 'Dark', skip: 'Skip to content', menu: 'Menu', newBadge: 'New',
    useWhen: 'Use it when', useElse: 'Use something else when', use: 'use', where: 'Where it goes.', usage: 'Usage',
    code: 'Code', replay: 'Replay', copy: 'Copy', copied: 'Copied', anatomy: 'Anatomy', part: 'Part', whatItIs: 'What it is',
    variants: 'Variants and sizes', classOrAttr: 'Class or attribute', when: 'When', states: 'States', state: 'State', how: 'How',
    motion: 'Motion and microinteractions', a11y: 'Accessibility', dd: 'Do and don\'t', do: 'Do', dont: 'Don\'t',
    plain: 'Plain HTML.', react: 'React.', from: 'From', behavior: 'Behavior and code', related: 'Related', crumbs: 'Breadcrumb',
    prev: 'Previous', next: 'Next', pager: 'Previous and next component', toc: 'On this page', other: 'Bahasa Indonesia', otherLang: 'id',
    privacy: 'Privacy', terms: 'Terms', group: 'Group', markup: 'Markup', plainBehavior: 'Behavior (plain HTML)', mdNew: 'new', agentLabel: 'For AI agents', copyLlm: 'Copy for LLM', viewMd: 'View as Markdown', copiedLlm: 'Copied', copyFail: 'Copy failed',
    lede: (n) => `${n} components and recipes. Each page says when to use it, when to use something else, the markup, its motion and its accessibility. Start here before building anything new: if a need is covered, use that component; if it is not, add a component to the system instead of styling one page. To see them working together, open the <a class="link" href="../../examples/index.html">examples</a>: a city services dashboard, a citizen app and a public portal.`,
  },
  id: {
    html: 'id', intro: 'Pengenalan', masthead: 'Proyek komunitas. Ini bukan situs resmi pemerintah.', mastheadMore: 'Cara memastikan', mastheadLabel: 'Status situs', mastheadA: '<b>Dikelola sukarelawan.</b> Lampung Design System dibangun oleh komunitas open source. Tidak ada instansi pemerintah yang mengelola atau mendukungnya secara resmi.', mastheadB: '<b>Layanan resmi memakai go.id.</b> Situs pemerintah Indonesia berakhiran .go.id. Jangan masukkan NIK di situs yang Anda ragukan.', docs: 'Dokumentasi', components: 'Komponen', start: 'Memulai', all: 'Semua komponen', examples: 'Contoh',
    appearance: 'Tampilan', light: 'Terang', dark: 'Gelap', skip: 'Langsung ke konten', menu: 'Menu', newBadge: 'Baru',
    useWhen: 'Pakai saat', useElse: 'Pakai yang lain saat', use: 'pakai', where: 'Letaknya.', usage: 'Penggunaan',
    code: 'Kode', replay: 'Putar ulang', copy: 'Salin', copied: 'Disalin', anatomy: 'Anatomi', part: 'Bagian', whatItIs: 'Fungsinya',
    variants: 'Varian dan ukuran', classOrAttr: 'Kelas atau atribut', when: 'Kapan', states: 'Status', state: 'Status', how: 'Caranya',
    motion: 'Gerak dan mikrointeraksi', a11y: 'Aksesibilitas', dd: 'Lakukan dan hindari', do: 'Lakukan', dont: 'Hindari',
    plain: 'HTML biasa.', react: 'React.', from: 'Dari', behavior: 'Perilaku dan kode', related: 'Terkait', crumbs: 'Remah roti',
    prev: 'Sebelumnya', next: 'Berikutnya', pager: 'Komponen sebelumnya dan berikutnya', toc: 'Di halaman ini', other: 'English', otherLang: 'en',
    privacy: 'Privasi', terms: 'Ketentuan', group: 'Kelompok', markup: 'Markup', plainBehavior: 'Perilaku (HTML biasa)', mdNew: 'baru', agentLabel: 'Untuk agen AI', copyLlm: 'Salin untuk LLM', viewMd: 'Lihat sebagai Markdown', copiedLlm: 'Disalin', copyFail: 'Gagal menyalin',
    lede: (n) => `${n} komponen dan resep. Setiap halaman menjelaskan kapan memakainya, kapan memakai yang lain, markup, gerak, dan aksesibilitasnya. Mulailah dari sini sebelum membuat sesuatu yang baru: jika kebutuhan sudah tercakup, pakai komponen itu; jika belum, tambahkan komponen ke sistem alih-alih menata satu halaman saja. Untuk melihat semuanya bekerja bersama, buka <a class="link" href="../examples/index.html">contoh</a>: dasbor layanan kota, aplikasi warga, dan portal publik.`,
  },
};
const GROUP_ID = {
  Foundations: ['Landasan', 'Aturan yang diikuti setiap komponen: tata letak, gerak, status'],
  Actions: ['Aksi', 'Hal yang ditekan untuk menjalankan sesuatu'],
  Inputs: ['Input', 'Kolom untuk mengetik atau memilih'],
  Selection: ['Pilihan', 'Memilih di antara opsi dan menyalakan pengaturan'],
  Navigation: ['Navigasi', 'Berpindah antarhalaman, bagian, dan langkah'],
  Overlays: ['Lapisan', 'Lapisan yang melayang di atas halaman'],
  Feedback: ['Umpan balik', 'Status, progres, pesan, dan keadaan kosong'],
  'Data display': ['Tampilan data', 'Daftar, tabel, angka, dan catatan'],
  Content: ['Konten', 'Teks panjang, kutipan, kode, dan media'],
  Chat: ['Obrolan', 'Percakapan dengan orang atau asisten'],
  'Page patterns': ['Pola halaman', 'Cara komponen bergabung menjadi halaman'],
  Marketing: ['Promosi', 'Halaman produk, layanan, dan beranda di depan aplikasi'],
  Motion: ['Gerak', 'Resep untuk hal yang bergerak'],
  Microinteractions: ['Mikrointeraksi', 'Respons kecil yang membuat kontrol terasa hidup'],
  Charts: ['Grafik', 'Menampilkan angka sebagai gambar'],
};
let LANG = 'en';
let T = STRINGS.en;
const groupLabel = (g) => (LANG === 'id' ? GROUP_ID[g]?.[0] || g : g);
const groupDesc = (g, d) => (LANG === 'id' ? GROUP_ID[g]?.[1] || d : d);
// Merge an Indonesian override onto the English spec: top-level keys replace, examples merge by index.
const mergeId = (en, id) => {
  if (!id) return en;
  const out = { ...en, ...id, group: en.group, order: en.order, status: en.status, related: en.related, slug: en.slug };
  if (id.examples) out.examples = en.examples.map((ex, i) => ({ ...ex, ...(id.examples[i] || {}) }));
  return out;
};

// Navigation order. Every spec's `group` must be one of these.
export const GROUPS = [
  ['Foundations', 'Rules every component follows: layout, motion, states'],
  ['Actions', 'Things people press to make something happen'],
  ['Inputs', 'Fields people type or choose into'],
  ['Selection', 'Choosing between options and toggling settings'],
  ['Navigation', 'Moving between pages, sections and steps'],
  ['Overlays', 'Layers that float above the page'],
  ['Feedback', 'Status, progress, messages and empty states'],
  ['Data display', 'Lists, tables, figures and records'],
  ['Content', 'Long text, quotes, code and media'],
  ['Chat', 'Conversations with people or an assistant'],
  ['Page patterns', 'How components combine into a page'],
  ['Marketing', 'Product, pricing and landing pages in front of an app'],
  ['Motion', 'Recipes for things that move'],
  ['Microinteractions', 'Small responses that make controls feel alive'],
  ['Charts', 'Showing numbers as pictures'],
];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// Inline markup in spec text: `code`, **bold**, [label](slug-or-url)
const inline = (s, link) => esc(s)
  .replace(/`([^`]+)`/g, '<code class="code">$1</code>')
  .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, t, h) => `<a class="link" href="${link(h)}">${t}</a>`);
const endDot = (t) => (/[.!?)]$/.test(String(t).trim()) ? String(t).trim() : `${String(t).trim()}.`);
const mdInline = (s, link) => String(s).replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, t, h) => `[${t}](${link(h)})`);

// ---------- load and check ----------
const CHECK = process.argv.includes('--check');
const PREVIEW = process.argv.includes('--preview'); // build even with links to specs that do not exist yet
const only = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const files = readdirSync(specDir).filter((f) => f.endsWith('.mjs') && !f.startsWith('_')).sort();
const specsEn = [];
const overrides = new Map();
for (const f of files) {
  const m = await import(pathToFileURL(join(specDir, f)).href + `?t=${Date.now()}`);
  const s = m.default;
  s.slug ??= f.replace(/\.mjs$/, '');
  specsEn.push(s);
  if (existsSync(join(idDir, f))) overrides.set(s.slug, (await import(pathToFileURL(join(idDir, f)).href + `?t=${Date.now()}`)).default);
}
const specsId = specsEn.map((s) => mergeId(s, overrides.get(s.slug)));
for (const f of existsSync(idDir) ? readdirSync(idDir).filter((x) => x.endsWith('.mjs')) : []) if (!specsEn.some((s) => `${s.slug}.mjs` === f)) console.warn(`build-docs: docs/spec/id/${f} has no English spec`);
// Hand-written guides (installation, CLI, theming...): docs/guides/<slug>.mjs with { id, en } bodies.
const guideDir = join(root, 'docs/guides');
const GUIDES = [];
for (const f of existsSync(guideDir) ? readdirSync(guideDir).filter((x) => x.endsWith('.mjs') && !x.startsWith('_')).sort() : []) {
  // A guide module exports one guide, or an array of them (for families such as per-framework installs).
  const mod = (await import(pathToFileURL(join(guideDir, f)).href + `?t=${Date.now()}`)).default;
  for (const g of [].concat(mod)) {
    g.slug ??= f.replace(/\.mjs$/, '');
    g.kind = 'guide';
    for (const l of ['id', 'en']) if (!g[l]?.title || !g[l]?.body) throw new Error(`docs/guides/${f} (${g.slug}): missing ${l}.title or ${l}.body`);
    if (/\u2014/.test(JSON.stringify(g))) throw new Error(`docs/guides/${f} (${g.slug}): contains an em dash`);
    GUIDES.push(g);
  }
}
GUIDES.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
let specs = specsEn;
let bySlug = new Map(specs.map((s) => [s.slug, s]));
const css = readFileSync(join(root, 'css/components.css'), 'utf8');
const icons = new Set(Object.keys(JSON.parse(readFileSync(join(root, 'icons/icons.json'), 'utf8')).icons));
const cssClasses = new Set([...css.matchAll(/\.([a-zA-Z][\w-]*)/g)].map((m) => m[1]));
// Hooks js/lds.js looks up by class (block__part, block--variant) count as part of the system too
const jsSrc = readFileSync(join(root, 'js/lds.js'), 'utf8');
for (const m of jsSrc.matchAll(/[.'"`\s]([a-z][a-z0-9-]*?(?:__[a-z0-9-]+|--[a-z0-9-]+)+)/g)) cssClasses.add(m[1]);
const problems = [];
const ALLOWED_EXTRA = new Set(['lds', 'docs-demo', 'docs-row', 'docs-col', 'docs-phone', 'docs-scroll', 'docs-box', 'docs-note']);
const warnings = [];
const checked = [...specsEn.map((s) => [s, `docs/spec/${s.slug}.mjs`]), ...specsId.filter((s) => overrides.has(s.slug)).map((s) => [s, `docs/spec/id/${s.slug}.mjs`])];
for (const [s, where] of checked) {
  if (only.length && !only.includes(s.slug)) continue;
  for (const k of ['title', 'group', 'summary', 'when', 'examples']) if (!s[k] || (Array.isArray(s[k]) && !s[k].length)) problems.push(`${where}: missing ${k}`);
  if (!GROUPS.some(([g]) => g === s.group)) problems.push(`${where}: unknown group "${s.group}"`);
  for (const r of [...(s.related || []), ...(s.whenNot || []).map((w) => w[1]).filter(Boolean)]) if (!bySlug.has(r)) (CHECK || PREVIEW ? warnings : problems).push(`${where}: links to missing spec "${r}"`);
  for (const t of [s.summary, ...(s.when || []), ...(s.motion || []), ...(s.a11y || []), ...(s.do || []), ...(s.dont || []), s.where || '', s.js || '', ...(s.anatomy || []).map((a) => a[1]), ...(s.states || []).map((a) => a[1]), ...(s.variants || []).map((a) => a[1])])
    for (const m of String(t).matchAll(/\]\(([a-z0-9-]+)\)/g)) if (!bySlug.has(m[1])) (CHECK || PREVIEW ? warnings : problems).push(`${where}: text links to missing spec "${m[1]}"`);
    if (/\u2014/.test(JSON.stringify(s))) problems.push(`${where}: contains an em dash`);
  for (const ex of s.examples || []) {
    const html = ex.html || '';
    for (const m of html.matchAll(/<span class="ic[^"]*"[^>]*>([a-z0-9_]+)<\/span>/g)) if (!icons.has(m[1])) problems.push(`${where}: icon "${m[1]}" is not in icons/icons.json`);
    for (const m of html.matchAll(/class="([^"]+)"/g)) for (const c of m[1].split(/\s+/)) if (c && !cssClasses.has(c) && !ALLOWED_EXTRA.has(c) && !c.startsWith('is-')) problems.push(`${where}: class "${c}" is not in css/components.css`);
  }
}
if (warnings.length) console.warn(`build-docs: ${warnings.length} warning(s)\n  ` + [...new Set(warnings)].join('\n  '));
if (problems.length) {
  console.error(`build-docs: ${problems.length} problem(s)\n  ` + [...new Set(problems)].join('\n  '));
  process.exit(1);
}

if (CHECK) { console.log(`build-docs --check: ${only.length || specs.length} spec(s) ok (${overrides.size} with Indonesian text)`); process.exit(0); }

// ---------- order ----------
const orderOf = (list) => GROUPS.flatMap(([g]) => list.filter((s) => s.group === g).sort((a, b) => (a.order ?? 99) - (b.order ?? 99) || a.title.localeCompare(b.title)));
let ordered = orderOf(specs);
const groupsWith = GROUPS.filter(([g]) => ordered.some((s) => s.group === g));

// ---------- HTML ----------
const UP = () => (LANG === 'en' ? '../../../' : '../../');
const DOCS = () => (LANG === 'en' ? '../../' : '../');
// The same page in the other language.
let SECTION = 'components'; // folder of the page being written: 'components' or 'guide'
const ALT = (current) => `${LANG === 'en' ? '../../' : '../en/'}${SECTION}/${current ? current.slug : 'index'}.html`;
const COMP = () => (SECTION === 'components' ? '' : '../components/');
const GUIDE = () => (SECTION === 'guide' ? '' : '../guide/');
const ORIGIN = process.env.LDS_SITE_ORIGIN || 'https://lampung.kartadinata.app';
// Public URL of a docs page (clean, no .html: the site redirects .html to it).
const pageUrl = (slug) => `${ORIGIN}/docs/${LANG === 'en' ? 'en/' : ''}${SECTION}/${slug === 'index' ? '' : slug}`;
// "Copy for LLM" and "View as Markdown": every page has a .md twin next to it.
const agentBar = (file) => `<div class="cdoc__agent" role="group" aria-label="${T.agentLabel}">
            <button class="btn btn--gray btn--sm" type="button" data-md-copy="${file}" data-done="${T.copiedLlm}" data-fail="${T.copyFail}"><span class="ic ic--sm" aria-hidden="true">content_copy</span><span>${T.copyLlm}</span></button>
            <a class="btn btn--gray btn--sm" href="${file}" target="_blank" rel="noopener" type="text/markdown"><span class="ic ic--sm" aria-hidden="true">open_in_new</span><span>${T.viewMd}</span></a>
          </div>`;
const linkHtml = (h) => (/^(https?:|#|\.|\/)/.test(h) ? h : `${h}.html`);
const nav = (current) => {
  const sections = groupsWith.map(([g], gi) => {
    const items = ordered.filter((s) => s.group === g);
    const open = current && current.group === g;
    const id = `nav-g${gi}`;
    return `<div class="shell__section">
        <button class="shell__section-btn" aria-expanded="${open}" aria-controls="${id}"><span class="shell__section-label">${esc(groupLabel(g))}</span><span class="shell__section-count">${items.length}</span><span class="ic" aria-hidden="true">expand_more</span></button>
        <div class="shell__panel${open ? ' is-open' : ''}" id="${id}"><div><div class="shell__children">
${items.map((s, i) => `          <a class="shell__link shell__link--child" href="${COMP()}${s.slug}.html"${current === s ? ' aria-current="page"' : ''}><span class="shell__num">${i + 1}</span><span class="shell__label">${esc(s.title)}</span>${s.status === 'new' ? `<span class="badge badge--accent shell__badge">${T.newBadge}</span>` : ''}</a>`).join('\n')}
        </div></div></div>
      </div>`;
  }).join('\n      ');
  return `<aside class="shell__side" id="side" aria-label="${T.docs}">
    <a class="shell__brand" href="../index.html"><span class="page-head__mark">${SIGER}</span>Lampung Design System</a>
    <nav class="shell__nav" aria-label="${T.components}">
      <span class="shell__hl" aria-hidden="true"></span>
      <p class="shell__group">${T.start}</p>
      <a class="shell__link" href="../index.html"><span class="ic" aria-hidden="true">home</span><span class="shell__label">${T.intro}</span></a>
${GUIDES.filter((g) => !g.hidden).map((g) => `      <a class="shell__link" href="${GUIDE()}${g.slug}.html"${current && current.kind === 'guide' && (current.slug === g.slug || current.parent === g.slug) ? ' aria-current="page"' : ''}><span class="ic" aria-hidden="true">${g.icon}</span><span class="shell__label">${esc(g[LANG].nav || g[LANG].title)}</span></a>`).join('\n')}
      <p class="shell__group">${T.components}</p>
      <a class="shell__link" href="${COMP()}index.html"${!current && SECTION === 'components' ? ' aria-current="page"' : ''}><span class="ic" aria-hidden="true">grid_view</span><span class="shell__label">${T.all}</span></a>
      <a class="shell__link" href="${DOCS()}examples/${LANG === 'en' ? 'en/' : ''}index.html"><span class="ic" aria-hidden="true">dashboard</span><span class="shell__label">${T.examples}</span></a>
      ${sections}
    </nav>
    <div class="shell__foot">
      <a class="shell__link" href="${ALT(current)}" hreflang="${T.otherLang}" lang="${T.otherLang}"><span class="ic" aria-hidden="true">language</span><span class="shell__label">${T.other}</span></a>
      <div class="seg" role="group" aria-label="${T.appearance}" data-lds-segmented>
        <span class="seg__thumb"></span>
        <button class="seg__btn" aria-pressed="true" data-lds-theme="light">${T.light}</button>
        <button class="seg__btn" aria-pressed="false" data-lds-theme="dark">${T.dark}</button>
      </div>
      <p class="docs-legal"><a href="${GUIDE()}privasi.html">${T.privacy}</a><span aria-hidden="true">·</span><a href="${GUIDE()}ketentuan.html">${T.terms}</a></p>
    </div>
  </aside>
  <script>(function(){try{var s=document.currentScript.previousElementSibling,ss=sessionStorage,v=ss.getItem('lds-shell-scroll');if(v!=null)s.scrollTop=+v;s.setAttribute('data-restored','');var n=s.querySelector('.shell__nav'),h=s.querySelector('.shell__hl'),c=n&&n.querySelector('[aria-current="page"]'),f=ss.getItem('lds-shell-from');ss.removeItem('lds-shell-from');if(!h||!c||c.closest('.shell__panel:not(.is-open)'))return;var put=function(e){h.style.height=e.offsetHeight+'px';h.style.transform='translateY('+e.offsetTop+'px)';},o=null;if(f){[].forEach.call(n.querySelectorAll('a[href]'),function(a){if(a.getAttribute('href')===f)o=a;});}h.style.transition='none';if(o&&!o.closest('.shell__panel:not(.is-open)')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){put(o);h.offsetWidth;h.style.transition='';requestAnimationFrame(function(){put(c);});}else put(c);n.classList.add('has-hl');}catch(e){}})();</script>`;
};
export const mastheadHtml = (t) => `<div class="masthead" role="region" aria-label="${t.mastheadLabel}">
  <div class="masthead__bar">
    <span class="masthead__mark" aria-hidden="true"><span class="ic">info</span></span>
    <span class="masthead__text">${t.masthead}</span>
    <button class="masthead__toggle" data-lds-masthead aria-expanded="false" aria-controls="lds-masthead">${t.mastheadMore}<span class="ic" aria-hidden="true">expand_more</span></button>
  </div>
  <div class="collapse is-closed" id="lds-masthead" inert><div><div class="masthead__body">
    <p class="masthead__item"><span class="ic" aria-hidden="true">groups</span><span>${t.mastheadA}</span></p>
    <p class="masthead__item"><span class="ic" aria-hidden="true">verified_user</span><span>${t.mastheadB}</span></p>
  </div></div></div>
</div>`;
const masthead = () => mastheadHtml(T);
const frame = (title, current, body, outline = '') => `<!doctype html>
<html lang="${T.html}" class="lds" data-theme="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)} · Lampung Design System</title>
<meta name="description" content="${esc(current ? (current.kind === 'guide' ? (current[LANG].lede || current[LANG].title).replace(/<[^>]+>/g, '') : current.summary.replace(/[`*]/g, '')) : T.lede(ordered.length).replace(/<[^>]+>/g, ''))}">
<script>try { document.documentElement.setAttribute('data-theme', localStorage.getItem('lds-theme') || 'light'); } catch (e) {}</script>
<link rel="icon" href="${UP()}brand/mark.svg" type="image/svg+xml">
<link rel="stylesheet" href="${UP()}css/lds.css">
<link rel="stylesheet" href="${DOCS()}docs.css">
<link rel="alternate" hreflang="${T.otherLang}" href="${ALT(current)}">
</head>
<body class="lds">
<a class="skip" href="#main">${T.skip}</a>
${masthead()}
<div class="shell" data-lds-shell>
  ${nav(current)}
  <div class="shell__scrim"></div>
  <div class="shell__main">
    <header class="shell__top">
      <button class="icon-btn" data-lds-shell-toggle aria-controls="side" aria-expanded="false" aria-label="${T.menu}"><span class="burger" aria-hidden="true"><i></i><i></i><i></i></span></button>
      <span class="shell__toptitle">${esc(title)}</span>
      <span style="width: 44px;"></span>
    </header>
    <div class="cdoc">
      <main class="cdoc__main" id="main" tabindex="-1">
${body}
      </main>
      ${outline}
    </div>
  </div>
</div>
<script type="module">
  import { init, restoreTheme } from '${UP()}js/lds.js';
  const mode = restoreTheme(document.documentElement, 'light');
  document.querySelectorAll('[data-lds-theme]').forEach((b) => b.setAttribute('aria-pressed', String(b.getAttribute('data-lds-theme') === mode)));
  init();
  document.querySelectorAll('[data-code-toggle]').forEach((b) => b.addEventListener('click', () => {
    const box = document.getElementById(b.getAttribute('aria-controls'));
    const open = b.getAttribute('aria-expanded') !== 'true';
    b.setAttribute('aria-expanded', String(open)); box.classList.toggle('is-closed', !open); box.inert = !open;
  }));
  // Copy for LLM: fetch the page's Markdown twin and put it on the clipboard.
  document.querySelectorAll('[data-md-copy]').forEach((b) => b.addEventListener('click', async () => {
    const label = b.querySelector('span:last-child'), text = label.textContent;
    try {
      const res = await fetch(b.getAttribute('data-md-copy'));
      if (!res.ok) throw new Error(res.status);
      await navigator.clipboard.writeText(await res.text());
      label.textContent = b.getAttribute('data-done');
    } catch { label.textContent = b.getAttribute('data-fail'); }
    setTimeout(() => { label.textContent = text; }, 1600);
  }));
  document.querySelectorAll('[data-replay]').forEach((b) => b.addEventListener('click', () => {
    const stage = document.getElementById(b.getAttribute('data-replay'));
    const tpl = document.getElementById(stage.id + '-tpl');
    stage.innerHTML = tpl.innerHTML; init(stage);
  }));
</script>
</body>
</html>
`;

const list = (items, link) => `<ul class="cdoc__list">${items.map((t) => `<li>${inline(t, link)}</li>`).join('')}</ul>`;
const table = (head, rows, link) => `<div class="table-box"><table class="table table--wrap"><thead><tr>${head.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, i) => `<td>${i === 0 ? `<code class="code">${esc(c)}</code>` : inline(c, link)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const dedent = (s) => { const t = String(s).replace(/^\n+|\s+$/g, ''); const m = Math.min(...t.split('\n').filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length)); return t.split('\n').map((l) => l.slice(m)).join('\n'); };

// Spec demos are written for docs/components/; English pages sit one folder deeper.
const demo = (html) => (LANG === 'en' ? html.replace(/((?:src|href|poster)=")\.\.\/(?!\.\.\/)/g, '$1../../') : html);
function page(s, i) {
  const link = linkHtml;
  const prev = ordered[i - 1], next = ordered[i + 1];
  const secs = [];
  const sec = (id, title, html) => secs.push({ id, title, html: `<section class="cdoc__sec" id="${id}"><h2>${esc(title)}</h2>${html}</section>` });

  const usage = [`<p class="cdoc__p"><strong>${T.useWhen}</strong></p>`, list(s.when, link)];
  if (s.whenNot?.length) usage.push(`<p class="cdoc__p"><strong>${T.useElse}</strong></p>`, list(s.whenNot.map(([why, slug, extra]) => `${why}: ${T.use} [${bySlug.get(slug)?.title || slug}](${slug})${extra ? `. ${endDot(extra)}` : '.'}`), link));
  if (s.where) usage.push(`<p class="cdoc__p"><strong>${T.where}</strong> ${inline(s.where, link)}</p>`);
  sec('usage', T.usage, usage.join(''));

  sec('examples', T.examples, s.examples.map((ex, k) => {
    const id = `ex-${k + 1}`;
    const code = esc(dedent(ex.code || ex.html));
    return `<figure class="cdoc__ex" id="${id}">
          <figcaption><span class="cdoc__ex-t">${esc(ex.title)}</span>${ex.desc ? `<span class="cdoc__ex-d">${inline(ex.desc, link)}</span>` : ''}</figcaption>
          <div class="cdoc__stage${ex.stage ? ` cdoc__stage--${ex.stage}` : ''}" id="${id}-stage"${ex.height ? ` style="min-height: ${ex.height}px;"` : ''}>${demo(ex.html)}</div>
          ${ex.replay ? `<template id="${id}-stage-tpl">${demo(ex.html)}</template>` : ''}
          <div class="cdoc__bar">
            <button class="btn btn--plain btn--sm" data-code-toggle aria-expanded="false" aria-controls="${id}-code"><span class="ic ic--sm" aria-hidden="true">code</span>${T.code}</button>
            ${ex.replay ? `<button class="btn btn--plain btn--sm" data-replay="${id}-stage"><span class="ic ic--sm" aria-hidden="true">refresh</span>${T.replay}</button>` : ''}
            <button class="btn btn--plain btn--sm" data-lds-copy="${code}"><span class="ic ic--sm" aria-hidden="true">content_copy</span><span data-lds-copy-label="${T.copied}">${T.copy}</span></button>
          </div>
          <div class="collapse is-closed" id="${id}-code" inert><div><div class="codeblock"><pre>${code}</pre></div></div></div>
        </figure>`;
  }).join('\n'));

  if (s.anatomy?.length) sec('anatomy', T.anatomy, table([T.part, T.whatItIs], s.anatomy, link));
  if (s.variants?.length) sec('variants', T.variants, table([T.classOrAttr, T.when], s.variants, link));
  if (s.states?.length) sec('states', T.states, table([T.state, T.how], s.states, link));
  if (s.motion?.length) sec('motion', T.motion, list(s.motion, link));
  if (s.a11y?.length) sec('a11y', T.a11y, list(s.a11y, link));
  if (s.do?.length || s.dont?.length) sec('practices', T.dd, `<div class="cdoc__dd"><div class="cdoc__do"><p class="cdoc__dd-h"><span class="ic ic--fill" aria-hidden="true">check_circle</span>${T.do}</p>${list(s.do || [], link)}</div><div class="cdoc__dont"><p class="cdoc__dd-h"><span class="ic ic--fill" aria-hidden="true">cancel</span>${T.dont}</p>${list(s.dont || [], link)}</div></div>`);
  if (s.js || s.react) {
    let h = '';
    if (s.js) h += `<p class="cdoc__p"><strong>${T.plain}</strong> ${inline(s.js, link)}</p>`;
    if (s.react) h += `<p class="cdoc__p"><strong>${T.react}</strong> ${T.from} <code class="code">lampung-design-system/react</code>.</p><div class="codeblock"><pre>${esc(dedent(s.react))}</pre></div>`;
    sec('code', T.behavior, h);
  }
  if (s.related?.length) sec('related', T.related, `<div class="link-grid">${s.related.filter((r) => bySlug.has(r)).map((r) => { const o = bySlug.get(r); return `<a class="link-card" href="${r}.html"><span class="link-card__eyebrow">${esc(groupLabel(o.group))}</span><span class="link-card__title">${esc(o.title)}</span><span class="link-card__body">${esc(o.summary)}</span></a>`; }).join('')}</div>`);

  const body = `        <header class="cdoc__head">
          <nav aria-label="${T.crumbs}"><ol class="crumbs"><li><a href="index.html">${T.components}</a></li><li><span class="ic" aria-hidden="true">chevron_right</span></li><li><a href="index.html#${encodeURIComponent(s.group)}">${esc(groupLabel(s.group))}</a></li></ol></nav>
          <h1>${esc(s.title)}${s.status === 'new' ? ` <span class="badge badge--accent">${T.newBadge}</span>` : ''}</h1>
          <p class="cdoc__lede">${inline(s.summary, link)}</p>
          ${agentBar(`${s.slug}.md`)}
        </header>
        ${secs.map((x) => x.html).join('\n        ')}
        <nav class="cdoc__pager" aria-label="${T.pager}">
          ${prev ? `<a class="link-card cdoc__prev" href="${prev.slug}.html"><span class="link-card__eyebrow"><span class="ic ic--sm" aria-hidden="true">arrow_back_ios_new</span>${T.prev}</span><span class="link-card__title">${esc(prev.title)}</span></a>` : '<span></span>'}
          ${next ? `<a class="link-card cdoc__next" href="${next.slug}.html"><span class="link-card__eyebrow">${T.next}<span class="ic ic--sm" aria-hidden="true">arrow_forward</span></span><span class="link-card__title">${esc(next.title)}</span></a>` : '<span></span>'}
        </nav>`;
  const outline = `<nav class="toc cdoc__toc" data-lds-toc aria-label="${T.toc}"><span class="toc__ink" aria-hidden="true"></span>${secs.map((x) => `<a href="#${x.id}">${esc(x.title)}</a>`).join('')}</nav>`;
  return frame(s.title, s, body, outline);
}

const slugify = (t) => t.toLowerCase().replace(/<[^>]+>/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const guideBody = (L) => L.body.replace(/\{\{comp\}\}/g, '../components/').replace(/\{\{guide\}\}/g, '').replace(/\{\{docs\}\}/g, DOCS()).replace(/\{\{root\}\}/g, UP());
function guideMd(g) {
  const L = g[LANG];
  return htmlToMd(`<h1>${L.title}</h1><p>${pageUrl(g.slug)}</p>${L.lede ? `<p>${L.lede}</p>` : ''}${guideBody(L)}`);
}
function indexMdSite() {
  const L = [`# ${T.components}`, '', pageUrl('index'), '', htmlToMd(`<p>${T.lede(ordered.length)}</p>`).trim(), ''];
  for (const [g, d] of groupsWith) {
    L.push(`## ${groupLabel(g)}`, '', groupDesc(g, d), '');
    for (const s of ordered.filter((x) => x.group === g)) L.push(`- [${s.title}](${s.slug}.md): ${mdInline(s.summary, (h) => (/^(https?:|#|\.|\/)/.test(h) ? h : `${h}.md`))}`);
    L.push('');
  }
  return L.join('\n');
}
function guidePage(g) {
  const L = g[LANG];
  const toc = [];
  // Links inside guide bodies are written for the Indonesian tree; `{{comp}}`, `{{guide}}`, `{{docs}}`, `{{root}}` resolve per language.
  const body = L.body
    .replace(/\{\{comp\}\}/g, '../components/').replace(/\{\{guide\}\}/g, '').replace(/\{\{docs\}\}/g, DOCS()).replace(/\{\{root\}\}/g, UP())
    .replace(/<h2(?: id="([^"]+)")?>([\s\S]*?)<\/h2>/g, (_, id, t) => { const i = id || slugify(t); toc.push([i, t.replace(/<[^>]+>/g, '')]); return `</section><section class="cdoc__sec" id="${i}"><h2>${t}</h2>`; });
  const parent = g.parent && GUIDES.find((x) => x.slug === g.parent);
  const html = `        <header class="cdoc__head">
          <nav aria-label="${T.crumbs}"><ol class="crumbs"><li><a href="../index.html">${T.start}</a></li>${parent ? `<li><span class="ic" aria-hidden="true">chevron_right</span></li><li><a href="${parent.slug}.html">${esc(parent[LANG].title)}</a></li>` : ''}</ol></nav>
          <h1>${esc(L.title)}</h1>
          ${L.lede ? `<p class="cdoc__lede">${L.lede}</p>` : ''}
          ${agentBar(`${g.slug}.md`)}
        </header>
        <section class="cdoc__sec cdoc__intro">${body}</section>`.replace('<section class="cdoc__sec cdoc__intro"></section>', '');
  const outline = toc.length > 1 ? `<nav class="toc cdoc__toc" data-lds-toc aria-label="${T.toc}"><span class="toc__ink" aria-hidden="true"></span>${toc.map(([i, t]) => `<a href="#${i}">${esc(t)}</a>`).join('')}</nav>` : '';
  return frame(L.title, g, html, outline);
}

function indexPage() {
  const body = `        <header class="cdoc__head">
          <h1>${T.components}</h1>
          <p class="cdoc__lede">${T.lede(ordered.length)}</p>
          ${agentBar('index.md')}
        </header>
        ${groupsWith.map(([g, d]) => `<section class="cdoc__sec" id="${encodeURIComponent(g)}"><h2>${esc(groupLabel(g))}</h2><p class="cdoc__p">${esc(groupDesc(g, d))}</p><div class="link-grid">${ordered.filter((s) => s.group === g).map((s) => `<a class="link-card" href="${s.slug}.html"><span class="link-card__title">${esc(s.title)}${s.status === 'new' ? ` <span class="badge badge--accent">${T.newBadge}</span>` : ''}</span><span class="link-card__body">${esc(s.summary)}</span></a>`).join('')}</div></section>`).join('\n        ')}`;
  return frame(T.components, null, body);
}

// ---------- Markdown for the skill ----------
// `url` set: the copy served next to the page on the site (headings in the page's language, absolute
// URL of the page); unset: the English copy in the skill, which points at the repository file.
function md(s, url) {
  const link = (h) => (/^(https?:|#|\.|\/)/.test(h) ? h : `${h}.md`);
  const L = [];
  L.push(`# ${s.title}`, '', url ? `${T.group}: ${groupLabel(s.group)}${s.status === 'new' ? ` (${T.mdNew})` : ''}. ${url}` : `Group: ${s.group}${s.status === 'new' ? ' (new)' : ''}. Docs page: \`docs/components/${s.slug}.html\`.`, '', mdInline(s.summary, link), '');
  L.push(`## ${T.useWhen}`, ...s.when.map((w) => `- ${mdInline(w, link)}`), '');
  if (s.whenNot?.length) L.push(`## ${T.useElse}`, ...s.whenNot.map(([why, slug, extra]) => `- ${mdInline(why, link)}: ${T.use} [${bySlug.get(slug)?.title || slug}](${slug}.md)${extra ? `. ${mdInline(endDot(extra), link)}` : '.'}`), '');
  if (s.where) L.push(`## ${T.where.replace(/\.$/, '')}`, mdInline(s.where, link), '');
  if (s.anatomy?.length) L.push(`## ${T.anatomy}`, `| ${T.part} | ${T.whatItIs} |`, '|---|---|', ...s.anatomy.map(([a, b]) => `| \`${a}\` | ${mdInline(b, link)} |`), '');
  L.push(`## ${T.markup}`);
  for (const ex of s.examples) L.push('', `**${ex.title}.**${ex.desc ? ` ${mdInline(ex.desc, link)}` : ''}`, '```html', dedent(ex.code || ex.html), '```');
  L.push('');
  if (s.variants?.length) L.push(`## ${T.variants}`, `| ${T.classOrAttr} | ${T.when} |`, '|---|---|', ...s.variants.map(([a, b]) => `| \`${a}\` | ${mdInline(b, link)} |`), '');
  if (s.states?.length) L.push(`## ${T.states}`, `| ${T.state} | ${T.how} |`, '|---|---|', ...s.states.map(([a, b]) => `| \`${a}\` | ${mdInline(b, link)} |`), '');
  if (s.motion?.length) L.push(`## ${T.motion}`, ...s.motion.map((w) => `- ${mdInline(w, link)}`), '');
  if (s.a11y?.length) L.push(`## ${T.a11y}`, ...s.a11y.map((w) => `- ${mdInline(w, link)}`), '');
  if (s.do?.length) L.push(`## ${T.do}`, ...s.do.map((w) => `- ${mdInline(w, link)}`), '');
  if (s.dont?.length) L.push(`## ${T.dont}`, ...s.dont.map((w) => `- ${mdInline(w, link)}`), '');
  if (s.js) L.push(`## ${T.plainBehavior}`, mdInline(s.js, link), '');
  if (s.react) L.push('## React', '```tsx', dedent(s.react), '```', '');
  if (s.related?.length) L.push(`## ${T.related}`, s.related.map((r) => `[${bySlug.get(r)?.title || r}](${r}.md)`).join(' · '), '');
  return L.join('\n');
}

function indexMd() {
  const pre = readFileSync(join(specDir, '_index-preamble.md'), 'utf8').trim();
  const L = [pre, '', '## Catalog', '', 'Read the file for a component before using it. Each one says when to use it, when to use something else, the markup, variants, states, motion and accessibility.', ''];
  for (const [g, d] of groupsWith) {
    L.push(`### ${g}`, d + '.', '', '| Component | Use it when | File |', '|---|---|---|');
    for (const s of ordered.filter((x) => x.group === g)) L.push(`| ${s.title}${s.status === 'new' ? ' (new)' : ''} | ${s.when[0].replace(/\|/g, '\\|').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')} | [components/${s.slug}.md](components/${s.slug}.md) |`);
    L.push('');
  }
  return L.join('\n');
}

// ---------- write ----------
for (const d of [OUT.id, OUT.en, skillDir]) { if (existsSync(d)) rmSync(d, { recursive: true }); mkdirSync(d, { recursive: true }); }
// English first: the skill references (for agents) are written from the English specs.
for (const lang of ['en', 'id']) {
  LANG = lang; T = STRINGS[lang];
  specs = lang === 'id' ? specsId : specsEn;
  bySlug = new Map(specs.map((s) => [s.slug, s]));
  ordered = orderOf(specs);
  ordered.forEach((s, i) => {
    writeFileSync(join(OUT[lang], `${s.slug}.html`), page(s, i));
    writeFileSync(join(OUT[lang], `${s.slug}.md`), md(s, pageUrl(s.slug)));
    if (lang === 'en') writeFileSync(join(skillDir, `${s.slug}.md`), md(s));
  });
  writeFileSync(join(OUT[lang], 'index.html'), indexPage());
  writeFileSync(join(OUT[lang], 'index.md'), indexMdSite());
  SECTION = 'guide';
  const gdir = join(root, lang === 'en' ? 'docs/en/guide' : 'docs/guide');
  mkdirSync(gdir, { recursive: true });
  for (const g of GUIDES) {
    writeFileSync(join(gdir, `${g.slug}.html`), guidePage(g));
    writeFileSync(join(gdir, `${g.slug}.md`), guideMd(g));
  }
  SECTION = 'components';
  if (lang === 'en') writeFileSync(join(root, 'skills/lampung-design-system/references/components.md'), indexMd());
}
// Documentation home in both languages.
mkdirSync(join(root, 'docs/en'), { recursive: true });
writeFileSync(join(root, 'docs/index.html'), shell('id', { count: specsEn.length, guides: GUIDES, masthead: mastheadHtml(STRINGS.id) }));
writeFileSync(join(root, 'docs/en/index.html'), shell('en', { count: specsEn.length, guides: GUIDES, masthead: mastheadHtml(STRINGS.en) }));
const missing = specsEn.filter((s) => !overrides.has(s.slug)).map((s) => s.slug);
console.log(`build-docs: ${ordered.length} components in ${groupsWith.length} groups, ${GUIDES.length} guides, ${overrides.size} in Indonesian${missing.length ? ` (${missing.length} still English on the Indonesian site)` : ''}`);
