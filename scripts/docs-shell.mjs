import { readFileSync } from 'node:fs';

// The siger mark drawn by scripts/build-brand.mjs.
const SIGER = readFileSync(new URL('../brand/siger.inline.txt', import.meta.url), 'utf8').trim();

// The documentation home: docs/index.html (Indonesian) and docs/en/index.html (English).
// One template for both, so the two languages always have the same pages in the same order.
// The boards render through docs/runtime.js; guides and components are static pages.

const ROUTES = {
  id: [
    ['start', 'Pengenalan', null],
    ['color', 'Warna dan identitas', 'Main'],
    ['typography', 'Tipografi', 'Typography'],
    ['layout', 'Ruang, radius, kedalaman', 'Layout'],
    ['motion', 'Gerak', 'Motion'],
    ['micro', 'Mikrointeraksi', 'Micro'],
    ['actions', 'Aksi', 'Actions'],
    ['inputs', 'Input', 'Inputs'],
    ['selection', 'Pilihan', 'Selection'],
    ['navigation', 'Navigasi', 'Navigation'],
    ['overlays', 'Lapisan', 'Overlays'],
    ['feedback', 'Umpan balik', 'Feedback'],
    ['data', 'Tampilan data', 'DataDisplay'],
    ['charts', 'Grafik', 'Charts'],
    ['phone', 'Layar ponsel', 'Mobile'],
    ['patterns', 'Pola aplikasi', 'Patterns'],
    ['marketing', 'Halaman promosi', 'Marketing'],
  ],
  en: [
    ['start', 'Introduction', null],
    ['color', 'Color and identity', 'Main'],
    ['typography', 'Typography', 'Typography'],
    ['layout', 'Space, radius, depth', 'Layout'],
    ['motion', 'Motion', 'Motion'],
    ['micro', 'Microinteractions', 'Micro'],
    ['actions', 'Actions', 'Actions'],
    ['inputs', 'Inputs', 'Inputs'],
    ['selection', 'Selection', 'Selection'],
    ['navigation', 'Navigation', 'Navigation'],
    ['overlays', 'Overlays', 'Overlays'],
    ['feedback', 'Feedback', 'Feedback'],
    ['data', 'Data display', 'DataDisplay'],
    ['charts', 'Charts', 'Charts'],
    ['phone', 'Phone screen', 'Mobile'],
    ['patterns', 'App patterns', 'Patterns'],
    ['marketing', 'Marketing pages', 'Marketing'],
  ],
};
const ICONS = { start: 'home', color: 'contrast', typography: 'text_fields', layout: 'grid_view', motion: 'timeline', micro: 'touch_app', actions: 'touch_app', inputs: 'edit_square', selection: 'check_circle', navigation: 'near_me', overlays: 'inventory_2', feedback: 'notifications', data: 'list', charts: 'bar_chart', phone: 'smartphone', patterns: 'dashboard', marketing: 'public' };

const S = {
  id: {
    lang: 'id', skip: 'Langsung ke konten', docs: 'Dokumentasi', pages: 'Halaman', start: 'Memulai', foundations: 'Landasan', components: 'Komponen',
    boards: 'Papan komponen', patterns: 'Pola', all: 'Semua komponen', gallery: 'Galeri HTML', examples: 'Contoh', aksara: 'Aksara Lampung',
    appearance: 'Tampilan', light: 'Terang', dark: 'Gelap', other: 'English', otherHref: 'en/', openMenu: 'Buka menu', prev: 'Sebelumnya', next: 'Berikutnya', pager: 'Halaman sebelumnya dan berikutnya',
    home: 'Beranda proyek',
    title: 'Pengenalan',
    lede: 'Lampung Design System (LDS) adalah design system terbuka untuk membangun situs dan aplikasi layanan publik dengan cepat dan tampilan yang konsisten. Satu berkas token untuk CSS, JavaScript, shadcn/ui, dan Flutter; komponen berupa kelas CSS biasa; perilaku interaktif dalam satu modul JavaScript opsional.',
  },
  en: {
    lang: 'en', skip: 'Skip to content', docs: 'Documentation', pages: 'Pages', start: 'Getting started', foundations: 'Foundations', components: 'Components',
    boards: 'Component boards', patterns: 'Patterns', all: 'All components', gallery: 'Plain HTML gallery', examples: 'Examples', aksara: 'Aksara Lampung',
    appearance: 'Appearance', light: 'Light', dark: 'Dark', other: 'Bahasa Indonesia', otherHref: '../', openMenu: 'Open menu', prev: 'Previous', next: 'Next', pager: 'Previous and next page',
    home: 'Project home',
    title: 'Introduction',
    lede: 'Lampung Design System (LDS) is an open design system for building public-service websites and apps quickly, with a consistent look. One token file feeds CSS, JavaScript, shadcn/ui and Flutter; components are plain CSS classes; interactive behaviors live in one optional JavaScript module.',
  },
};

const intro = (lang, n, guides) => {
  const g = (slug) => `guide/${slug}.html`;
  if (lang === 'id') return `
      <div class="docs-prose">
        <div class="alert alert--warning" role="note" style="margin-bottom: 8px;"><span class="ic alert__icon" aria-hidden="true">info</span><div class="alert__body"><p class="alert__title">Proyek komunitas, bukan produk resmi</p><p class="alert__text">LDS dibuat dan dirawat komunitas open source. Tidak ada instansi pemerintah yang mengelola atau mendukungnya secara resmi. Warna hijau dan emasnya terinspirasi dari lambang daerah dan siger, bukan atribut resmi.</p></div></div>
        <h2>Untuk siapa</h2>
        <ul>
          <li><b>Pemerintah daerah dan perangkat daerah</b> yang perlu meluncurkan layanan digital tanpa merancang ulang tombol dan formulir setiap kali.</li>
          <li><b>Pengembang</b> yang ingin mulai dari komponen teruji dengan satu perintah, apa pun framework-nya.</li>
          <li><b>Desainer</b> yang butuh token, tipografi, dan pola halaman yang sudah lolos uji kontras.</li>
          <li><b>UMKM, komunitas, dan siapa pun</b> yang membangun untuk warga Lampung dan sekitarnya.</li>
        </ul>
        <h2>Mulai dalam satu perintah</h2>
        <div class="codeblock"><pre>npx lampung-ds@latest init</pre></div>
        <p>CLI mengenali Next.js, Vite, TanStack Start, React Router, Astro, Laravel, HTML biasa, dan Flutter. Panduan lengkap per framework ada di <a class="link" href="${g('instalasi')}">Instalasi</a>; semua perintah ada di <a class="link" href="${g('cli')}">CLI</a>.</p>
        <h2>Isi paket</h2>
        <ul>
          <li><span class="code">tokens/tokens.json</span>: satu sumber untuk warna (terang dan gelap), tipe, spasi, radius, kedalaman, dan gerak.</li>
          <li><span class="code">css/lds.css</span>: token dan semua komponen. Terang secara bawaan; <span class="code">data-theme="dark"</span> atau <span class="code">"system"</span> pada elemen mana pun mengubahnya.</li>
          <li><span class="code">js/lds.js</span>: perilaku opsional lewat atribut <span class="code">data-lds-*</span>: lapisan, sheet dengan momentum, menu, toast, stepper, OTP, tabel data, kanban, kalender, peta, grafik, dan aksara Lampung.</li>
          <li><span class="code">react/</span>, <span class="code">dist/shadcn/</span>, paket Flutter <span class="code">lampung_design_system</span>, dan CLI <span class="code">lampung-ds</span>.</li>
          <li><a class="link" href="components/index.html">${n} komponen dan resep</a>, masing-masing dengan cara pakai, contoh langsung, kode, gerak, dan aksesibilitas.</li>
          <li><a class="link" href="examples/index.html">Contoh</a> layanan kota yang dibangun hanya dari sistem ini: dasbor operasional, aplikasi warga, dan portal layanan publik.</li>
        </ul>
        <h2>Aturan yang menjaga tampilannya</h2>
        <ul>
          <li>Kanvas putih. Kelompokkan dengan <span class="code">--bg-fill</span>, bukan bayangan. Bayangan hanya untuk yang melayang.</li>
          <li>Satu aksen hijau Lampung untuk aksi utama, pilihan, dan tautan. Emas siger hanya untuk identitas dan ornamen.</li>
          <li>Aksara Lampung sebagai aksen yang tenang, selalu dengan bacaan Latin.</li>
          <li>Tipe bergerak sebagai satu set: ukuran, ketebalan, dan jarak huruf berubah bersama.</li>
          <li>Masuk dengan spring, keluar lebih cepat, dan selalu mulai dari posisi elemen saat itu.</li>
          <li>Setiap elemen interaktif minimal 44 × 44, bisa dijangkau keyboard, dengan focus ring yang terlihat.</li>
        </ul>
        <h2>Panduan</h2>
        <div class="link-grid">${guides.map((x) => `<a class="link-card" href="${g(x.slug)}"><span class="link-card__title">${x.id.title}</span><span class="link-card__body">${(x.id.lede || '').replace(/<[^>]+>/g, '').slice(0, 140)}</span></a>`).join('')}</div>
      </div>`;
  return `
      <div class="docs-prose">
        <div class="alert alert--warning" role="note" style="margin-bottom: 8px;"><span class="ic alert__icon" aria-hidden="true">info</span><div class="alert__body"><p class="alert__title">A community project, not an official product</p><p class="alert__text">LDS is built and maintained by an open source community. No government agency runs or endorses it. Its green and gold are inspired by the regional emblem and the siger crown, not official insignia.</p></div></div>
        <h2>Who it is for</h2>
        <ul>
          <li><b>Local governments and their agencies</b> that need to ship digital services without redesigning buttons and forms every time.</li>
          <li><b>Developers</b> who want tested components from one command, whatever the framework.</li>
          <li><b>Designers</b> who need tokens, type and page patterns that already pass contrast checks.</li>
          <li><b>Small businesses, communities and anyone</b> building for people in Lampung and beyond.</li>
        </ul>
        <h2>Start with one command</h2>
        <div class="codeblock"><pre>npx lampung-ds@latest init</pre></div>
        <p>The CLI knows Next.js, Vite, TanStack Start, React Router, Astro, Laravel, plain HTML and Flutter. Per-framework guides are in <a class="link" href="${g('instalasi')}">Installation</a>; every command is in <a class="link" href="${g('cli')}">CLI</a>.</p>
        <h2>What is in the box</h2>
        <ul>
          <li><span class="code">tokens/tokens.json</span>: one source for color (light and dark), type, space, radius, depth and motion.</li>
          <li><span class="code">css/lds.css</span>: tokens and every component. Light by default; <span class="code">data-theme="dark"</span> or <span class="code">"system"</span> on any element switches it.</li>
          <li><span class="code">js/lds.js</span>: optional behaviors through <span class="code">data-lds-*</span> attributes: layers, sheets with momentum, menus, toasts, steppers, OTP, data tables, kanban, calendars, maps, charts and aksara Lampung.</li>
          <li><span class="code">react/</span>, <span class="code">dist/shadcn/</span>, the Flutter package <span class="code">lampung_design_system</span> and the <span class="code">lampung-ds</span> CLI.</li>
          <li><a class="link" href="components/index.html">${n} components and recipes</a>, each with usage, live examples, code, motion and accessibility.</li>
          <li><a class="link" href="../examples/en/index.html">Examples</a> of city services built only from the system: an operations dashboard, a citizen app and a public portal.</li>
        </ul>
        <h2>Rules that keep it looking like itself</h2>
        <ul>
          <li>White canvas. Group with <span class="code">--bg-fill</span>, never with a shadow. Shadows only on things that float.</li>
          <li>One Lampung green accent for the primary action, the selection and links. Siger gold only for identity and ornament.</li>
          <li>Aksara Lampung as a quiet accent, always with its Latin reading.</li>
          <li>Type moves as a set: size, weight and tracking together.</li>
          <li>Enter on a spring, leave faster, and always start from where the element is now.</li>
          <li>Every interactive element is at least 44 × 44, keyboard reachable, with a visible focus ring.</li>
        </ul>
        <h2>Guides</h2>
        <div class="link-grid">${guides.map((x) => `<a class="link-card" href="${g(x.slug)}"><span class="link-card__title">${x.en.title}</span><span class="link-card__body">${(x.en.lede || '').replace(/<[^>]+>/g, '').slice(0, 140)}</span></a>`).join('')}</div>
      </div>`;
};

/**
 * @param {'id'|'en'} lang
 * @param {{ count: number, guides: Array<object>, masthead: string }} ctx
 */
export function shell(lang, ctx) {
  const s = S[lang];
  const up = lang === 'en' ? '../../' : '../';
  const docs = lang === 'en' ? '../' : './';
  const routes = ROUTES[lang];
  const link = ([slug, title]) => `      <a class="shell__link" href="#/${slug}" data-route="${slug}"><span class="ic" aria-hidden="true">${ICONS[slug]}</span>${title}</a>`;
  const guides = ctx.guides.filter((g) => !g.hidden);
  const guideLinks = guides.map((g) => `      <a class="shell__link" href="guide/${g.slug}.html"><span class="ic" aria-hidden="true">${g.icon}</span>${g[lang].nav || g[lang].title}</a>`).join('\n');
  return `<!doctype html>
<html lang="${s.lang}" data-theme="light" class="lds">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${s.title} · Lampung Design System</title>
<meta name="description" content="${s.lede}">
<link rel="icon" href="${up}brand/mark.svg" type="image/svg+xml">
<link rel="alternate" hreflang="${lang === 'id' ? 'en' : 'id'}" href="${s.otherHref}">
<link rel="stylesheet" href="${up}css/lds.css">
<link rel="stylesheet" href="${docs}docs.css">
<script>try { document.documentElement.setAttribute('data-theme', localStorage.getItem('lds-theme') || 'light'); } catch (e) {}</script>
</head>
<body class="lds">
<a class="skip" href="#board">${s.skip}</a>
${ctx.masthead}
<div class="shell" id="shell">

  <aside class="shell__side" id="side" aria-label="${s.docs}">
    <a class="shell__brand" href="/" aria-label="${s.home}"><span class="page-head__mark">${SIGER}</span>Lampung Design System</a>
    <nav class="shell__nav" id="nav" aria-label="${s.pages}">
      <span class="shell__hl" id="nav-hl" aria-hidden="true"></span>
      <span class="shell__group">${s.start}</span>
${link(routes[0])}
${guideLinks}
      <span class="shell__group">${s.foundations}</span>
${routes.slice(1, 3).map(link).join('\n')}
      <a class="shell__link" href="components/aksara.html"><span class="ic" aria-hidden="true">draft</span>${s.aksara}</a>
${routes.slice(3, 6).map(link).join('\n')}
      <span class="shell__group">${s.components}</span>
      <a class="shell__link" href="components/index.html"><span class="ic" aria-hidden="true">grid_view</span>${s.all}</a>
      <a class="shell__link" href="${docs}gallery.html"><span class="ic" aria-hidden="true">widgets</span>${s.gallery}</a>
      <span class="shell__group">${s.boards}</span>
${routes.slice(6, 14).map(link).join('\n')}
      <span class="shell__group">${s.patterns}</span>
${routes.slice(14).map(link).join('\n')}
      <a class="shell__link" href="${docs}examples/${lang === 'en' ? 'en/' : ''}index.html"><span class="ic" aria-hidden="true">location_city</span>${s.examples}</a>
    </nav>
    <div class="shell__foot">
      <a class="shell__link" href="${s.otherHref}" hreflang="${lang === 'id' ? 'en' : 'id'}" lang="${lang === 'id' ? 'en' : 'id'}"><span class="ic" aria-hidden="true">language</span>${s.other}</a>
      <div class="seg" role="group" aria-label="${s.appearance}" id="theme-seg">
        <span class="seg__thumb" style="width: calc((100% - 4px) / 2);"></span>
        <button class="seg__btn" aria-pressed="true" data-mode="light"><span class="ic ic--sm" aria-hidden="true">light_mode</span>&nbsp;${s.light}</button>
        <button class="seg__btn" aria-pressed="false" data-mode="dark"><span class="ic ic--sm" aria-hidden="true">dark_mode</span>&nbsp;${s.dark}</button>
      </div>
    </div>
  </aside>
  <div class="shell__scrim" id="scrim" aria-hidden="true"></div>

  <div class="shell__main">
    <header class="shell__top">
      <button class="icon-btn" id="menu-btn" aria-label="${s.openMenu}" aria-expanded="false" aria-controls="side"><span class="ic" aria-hidden="true">list</span></button>
      <span style="font: 600 15px/20px var(--font); color: var(--text-strong);" id="top-title">Lampung Design System</span>
      <span style="width: 44px;"></span>
    </header>
    <main class="board-host" id="board" tabindex="-1"></main>
    <nav class="pager-next" id="pager" aria-label="${s.pager}"></nav>
  </div>
</div>

<template id="tpl-start">
  <div class="page">
    <header class="page-head">
      <div>
        <div class="page-head__crumb"><span class="page-head__mark">${SIGER}</span>${s.start}</div>
        <h1>${s.title}</h1>
        <p class="page-head__lede">${s.lede}</p>
      </div>
    </header>${intro(lang, ctx.count, guides)}
    <div class="aksara-band" aria-hidden="true" style="margin-top: 48px;"></div>
  </div>
</template>

<script type="module">
  import { mount } from '${docs}runtime.js';
  import { init } from '${up}js/lds.js';
  init(document.body);

  const ROUTES = ${JSON.stringify(routes.map(([slug, title, file]) => (file ? { slug, title, file } : { slug, title, template: 'tpl-start' })))};
  const BOARDS = '${lang === 'en' ? '../boards/en/' : './boards/'}';
  const STR = ${JSON.stringify({ prev: s.prev, next: s.next })};
  const html = document.documentElement;
  const host = document.getElementById('board');
  const shell = document.getElementById('shell');
  let current = null;
  let mode = 'light';
  try { mode = localStorage.getItem('lds-theme') || 'light'; } catch (e) { /* storage may be blocked */ }

  /* Theme: the shell and the mounted board stay in sync either way. */
  const seg = document.getElementById('theme-seg');
  const applyTheme = (m, fromBoard) => {
    mode = m;
    html.classList.add('lds-theme-swap');
    setTimeout(() => html.classList.remove('lds-theme-swap'), 120);
    html.setAttribute('data-theme', m);
    const boardRoot = host.querySelector(':scope > .lds[data-theme]');
    if (boardRoot) boardRoot.setAttribute('data-theme', m);
    try { localStorage.setItem('lds-theme', m); } catch (e) { /* ignore */ }
    seg.querySelectorAll('.seg__btn').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.mode === m)));
    seg.querySelector('.seg__thumb').style.transform = \`translateX(\${m === 'dark' ? 100 : 0}%)\`;
    if (!fromBoard && current && current.component) { current.setProps({ theme: m }); current.component.setState({ theme: m }); }
  };
  seg.querySelectorAll('.seg__btn').forEach((b) => b.addEventListener('click', () => applyTheme(b.dataset.mode)));
  new MutationObserver(() => {
    const root = host.querySelector(':scope > .lds[data-theme]');
    const m = root && root.getAttribute('data-theme');
    if (m && m !== mode) applyTheme(m, true);
  }).observe(host, { attributes: true, subtree: true, attributeFilter: ['data-theme'] });
  applyTheme(mode, true);

  /* Sidebar highlight glides to the current link on the smooth spring. */
  const hl = document.getElementById('nav-hl');
  const placeHighlight = (instant) => {
    const a = document.querySelector('.shell__link[aria-current="page"]');
    hl.style.opacity = a ? '1' : '0';
    if (instant) hl.style.transition = 'none';
    if (a) hl.style.transform = \`translateY(\${a.offsetTop}px)\`;
    if (instant) { void hl.offsetWidth; hl.style.transition = ''; }
  };

  /* Prefetch a board on hover so the transition never waits on the network. */
  const fileUrl = (r) => \`\${BOARDS}\${r.file}.dc.html\`;
  document.querySelectorAll('.shell__link[data-route]').forEach((a) => a.addEventListener('pointerenter', () => {
    const r = ROUTES.find((x) => x.slug === a.dataset.route);
    if (r && r.file) fetch(fileUrl(r));
  }, { once: true }));

  const pager = document.getElementById('pager');
  const renderPager = (i) => {
    const prev = ROUTES[i - 1], next = ROUTES[i + 1];
    pager.replaceChildren();
    const link = (r, cls, label) => { const a = document.createElement('a'); a.href = \`#/\${r.slug}\`; a.className = cls; const s = document.createElement('span'); s.textContent = label; a.append(s, document.createTextNode(r.title)); return a; };
    if (prev) pager.appendChild(link(prev, '', STR.prev));
    if (next) pager.appendChild(link(next, 'is-next', STR.next));
  };

  async function show(slug, first) {
    const i = Math.max(0, ROUTES.findIndex((r) => r.slug === slug));
    const route = ROUTES[i];
    const swap = async () => {
      if (current) { current.unmount(); current = null; }
      host.className = 'board-host' + (route.file === 'Mobile' ? ' board-host--phone' : '');
      if (route.template) { host.replaceChildren(document.getElementById(route.template).content.cloneNode(true)); init(host); }
      else current = await mount(host, fileUrl(route), { theme: mode });
      if (current) current.component.setState({ theme: mode });
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.title = \`\${route.title} · Lampung Design System\`;
      document.getElementById('top-title').textContent = route.title;
      document.querySelectorAll('.shell__link[data-route]').forEach((a) => a.setAttribute('aria-current', a.dataset.route === route.slug ? 'page' : 'false'));
      placeHighlight(first);
      renderPager(i);
    };
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!first && document.startViewTransition && !reduce) {
      const vt = document.startViewTransition(swap);
      vt.ready.catch(() => {}); vt.finished.catch(() => {});
      // A tab that is not painting never captures the old frame; skip the effect rather than stall.
      const guard = setTimeout(() => vt.skipTransition(), 700);
      await vt.updateCallbackDone.catch(() => {});
      clearTimeout(guard);
    } else {
      await swap();
      if (!first) { host.classList.remove('is-entering'); void host.offsetWidth; host.classList.add('is-entering'); }
    }
    if (!first) host.focus({ preventScroll: true });
    closeMenu();
  }

  /* Phone menu: the sidebar slides in on the smooth spring, leaves on the exit curve. */
  const menuBtn = document.getElementById('menu-btn');
  const openMenu = () => { shell.classList.add('is-menu'); menuBtn.setAttribute('aria-expanded', 'true'); document.querySelector('.shell__link[aria-current="page"]')?.focus(); };
  const closeMenu = () => { if (!shell.classList.contains('is-menu')) return; shell.classList.remove('is-menu'); menuBtn.setAttribute('aria-expanded', 'false'); };
  menuBtn.addEventListener('click', openMenu);
  document.getElementById('scrim').addEventListener('click', closeMenu);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && shell.classList.contains('is-menu')) { closeMenu(); menuBtn.focus(); } });

  const slugFromHash = () => (location.hash.match(/^#\\/([\\w-]+)/) || [])[1] || 'start';
  window.addEventListener('hashchange', () => show(slugFromHash()));
  show(slugFromHash(), true);
</script>
</body>
</html>
`;
}
