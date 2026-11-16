// Builds the admin dashboard example (Sakai Dasbor, a city operations dashboard for the fictional
// Pemerintah Kota Contoh): every fragment in docs/examples/src/dashboard/<slug>.html becomes a full page
// docs/examples/dashboard/<slug>.html inside one shared frame (app shell sidebar, app bar with breadcrumbs,
// search, theme, notifications and account menus, command palette, drawer on phones). It also writes the
// examples hub in Indonesian (docs/examples/index.html) and English (docs/examples/en/index.html).
//   node scripts/build-examples.mjs                      build every page
//   node scripts/build-examples.mjs --check              validate only, write nothing
//   node scripts/build-examples.mjs --only a,b           build and validate only these slugs (skips the hubs)
// It fails on: unknown classes (not in css/components.css, js/lds.js hooks or dashboard.css), unknown icons,
// links to files that do not exist, ids used twice, data-lds-menu / aria-controls pointing nowhere, em dashes,
// a page without exactly one example note, and front matter that misses a field.
// How to add a page: docs/examples/README.md.
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = join(root, 'docs/examples/src/dashboard');
const outDir = join(root, 'docs/examples/dashboard');
const CHECK = process.argv.includes('--check');
const onlyArg = process.argv.indexOf('--only');
const ONLY = onlyArg > -1 ? new Set((process.argv[onlyArg + 1] || '').split(',').map((s) => s.trim()).filter(Boolean)) : null;

// ---------- the page list: sidebar, palette, breadcrumbs and both hubs come from here ----------
// soon: listed in the sidebar with a "Segera" badge, links to segera-hadir.html. nav: false keeps a page out of the sidebar.
// en: the English name, used on the English hub only (the app itself is Indonesian).
export const GROUPS = ['Dasbor', 'Halaman', 'Masuk'];
export const PAGES = [
  { slug: 'ringkasan', title: 'Ringkasan kota', group: 'Dasbor', icon: 'dashboard', en: 'City overview' },
  { slug: 'pengaduan', title: 'Pengaduan warga', group: 'Dasbor', icon: 'campaign', en: 'Citizen reports' },
  { slug: 'perizinan', title: 'Layanan perizinan', group: 'Dasbor', icon: 'verified', en: 'Permits' },
  { slug: 'kependudukan', title: 'Kependudukan', group: 'Dasbor', icon: 'groups', en: 'Population records' },
  { slug: 'transportasi', title: 'Transportasi', group: 'Dasbor', icon: 'directions_bus', en: 'Transport' },
  { slug: 'kebencanaan', title: 'Kebencanaan dan cuaca', group: 'Dasbor', icon: 'flood', en: 'Disasters and weather' },
  { slug: 'kesehatan', title: 'Kesehatan', group: 'Dasbor', icon: 'local_hospital', en: 'Health' },
  { slug: 'pendidikan', title: 'Pendidikan', group: 'Dasbor', icon: 'school', en: 'Education' },
  { slug: 'pendapatan', title: 'Pendapatan daerah', group: 'Dasbor', icon: 'request_quote', en: 'Local revenue' },
  { slug: 'bantuan-sosial', title: 'Bantuan sosial', group: 'Dasbor', icon: 'volunteer_activism', en: 'Social assistance' },
  { slug: 'umkm', title: 'UMKM dan pasar', group: 'Dasbor', icon: 'storefront', en: 'Small business and markets' },
  { slug: 'pariwisata', title: 'Pariwisata dan agenda', group: 'Dasbor', icon: 'landscape', en: 'Tourism and events' },
  { slug: 'lingkungan', title: 'Lingkungan', group: 'Dasbor', icon: 'eco', en: 'Environment' },
  { slug: 'infrastruktur', title: 'Infrastruktur dan aset', group: 'Dasbor', icon: 'lightbulb', en: 'Infrastructure and assets' },
  { slug: 'pusat-komando', title: 'Pusat komando', group: 'Dasbor', icon: 'videocam', en: 'Command center' },
  { slug: 'kepegawaian', title: 'Kepegawaian', group: 'Dasbor', icon: 'badge', en: 'Civil service staff' },
  { slug: 'keuangan', title: 'Keuangan daerah', group: 'Dasbor', icon: 'account_balance', en: 'Budget' },
  { slug: 'laporan', title: 'Daftar laporan', group: 'Halaman', icon: 'article', en: 'Report list' },
  { slug: 'kotak-masuk', title: 'Kotak masuk', group: 'Halaman', icon: 'inbox', en: 'Inbox' },
  { slug: 'obrolan', title: 'Obrolan', group: 'Halaman', icon: 'chat', en: 'Chat' },
  { slug: 'kalender', title: 'Kalender kegiatan', group: 'Halaman', icon: 'calendar_month', en: 'Calendar' },
  { slug: 'tindak-lanjut', title: 'Kanban tindak lanjut', group: 'Halaman', icon: 'view_kanban', en: 'Follow-up board' },
  { slug: 'tugas', title: 'Tugas', group: 'Halaman', icon: 'checklist', en: 'Tasks' },
  { slug: 'arsip', title: 'Arsip dokumen', group: 'Halaman', icon: 'folder_open', en: 'Document archive' },
  { slug: 'profil', title: 'Profil', group: 'Halaman', icon: 'person', en: 'Profile' },
  { slug: 'pengguna', title: 'Pengguna', group: 'Halaman', icon: 'group', en: 'Users' },
  { slug: 'peran', title: 'Peran dan akses', group: 'Halaman', icon: 'shield_person', en: 'Roles and access' },
  { slug: 'segera-hadir', title: 'Segera hadir', group: 'Halaman', icon: 'schedule', en: 'Coming soon', nav: false },
  { slug: 'masuk', title: 'Masuk', group: 'Masuk', icon: 'login', en: 'Sign in' },
  { slug: 'daftar', title: 'Daftar', group: 'Masuk', icon: 'person_add', en: 'Register' },
  { slug: 'lupa-kata-sandi', title: 'Lupa kata sandi', group: 'Masuk', icon: 'key', en: 'Forgot password' },
  { slug: 'verifikasi', title: 'Verifikasi OTP', group: 'Masuk', icon: 'sms', en: 'One-time code' },
  { slug: 'akses-ditolak', title: 'Akses ditolak', group: 'Masuk', icon: 'do_not_disturb_on', en: 'No access' },
];
const PRODUCT = 'Sakai Dasbor';
const OWNER = 'Pemerintah Kota Contoh';
const HOME = 'ringkasan';
const USER = { name: 'Rina Wijayanti', email: 'rina.wijayanti@kotacontoh.example', initials: 'RW', role: 'Admin dasbor' };
// The one example note per page. Shell pages get it from the frame (page header, or the end of main when the
// page has no generated header); pages without the shell place the {{note}} token where it belongs.
const NOTE_TEXT = 'Contoh. Data fiktif, bukan layanan resmi.';
const NOTE = `<span class="badge badge--outline"><span class="ic" aria-hidden="true">info</span>${NOTE_TEXT}</span>`;

// ---------- helpers ----------
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const hrefOf = (p) => (p.soon ? `segera-hadir.html?for=${p.slug}` : `${p.slug}.html`);
const sources = existsSync(srcDir) ? readdirSync(srcDir).filter((f) => f.endsWith('.html') && !f.startsWith('_')).sort() : [];
const built = new Set(sources.map((f) => f.replace(/\.html$/, '')));

function parse(file) {
  const raw = readFileSync(join(srcDir, file), 'utf8');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  const meta = {};
  if (m) for (const line of m[1].split('\n')) { const k = line.match(/^([a-z]+):\s*(.*)$/i); if (k) meta[k[1]] = k[2].trim(); }
  let body = m ? raw.slice(m[0].length) : raw;
  const scripts = [];
  body = body.replace(/<script type="module">([\s\S]*?)<\/script>\s*/g, (_, js) => { scripts.push(js.trim()); return ''; });
  let actions = '';
  body = body.replace(/<template data-slot="actions">([\s\S]*?)<\/template>\s*/, (_, h) => { actions = h.trim(); return ''; });
  let layers = '';
  body = body.replace(/<template data-slot="layers">([\s\S]*?)<\/template>\s*/, (_, h) => { layers = h.trim(); return ''; });
  body = body.replace(/\{\{note\}\}/g, NOTE);
  const bool = (v, d) => (v === undefined ? d : v === 'true');
  return { file, slug: file.replace(/\.html$/, ''), meta, body: body.trim(), scripts, actions, layers, shell: bool(meta.shell, true), header: bool(meta.header, true), wide: bool(meta.wide, false) };
}

// ---------- frame ----------
const navLink = (p, cur) => `<a class="shell__link" href="${hrefOf(p)}"${cur === p.slug ? ' aria-current="page"' : ''}><span class="ic" aria-hidden="true">${p.icon}</span><span class="shell__label">${esc(p.title)}</span>${p.soon ? '<span class="badge shell__badge">Segera</span>' : p.badge ? `<span class="badge badge--accent shell__badge">${esc(p.badge)}</span>` : ''}</a>`;
const sidebar = (cur) => `<aside class="shell__side" id="side" aria-label="Menu samping">
    <a class="shell__brand" href="${HOME}.html"><span class="shell__mark" aria-hidden="true">S</span><span class="shell__label">${PRODUCT}</span></a>
    <nav class="shell__nav" aria-label="Utama">
      <span class="shell__hl" aria-hidden="true"></span>
${GROUPS.map((g) => `      <p class="shell__group">${g}</p>\n${PAGES.filter((p) => p.group === g && p.nav !== false).map((p) => `      ${navLink(p, cur)}`).join('\n')}`).join('\n')}
    </nav>
    <div class="shell__foot">
      <a class="shell__link" href="../index.html"><span class="ic" aria-hidden="true">grid_view</span><span class="shell__label">Semua contoh</span></a>
      <a class="shell__link" href="../../index.html"><span class="ic" aria-hidden="true">menu_book</span><span class="shell__label">Dokumentasi sistem desain</span></a>
    </div>
  </aside>
  <script>(function(){try{var s=document.currentScript.previousElementSibling,ss=sessionStorage,v=ss.getItem('lds-shell-scroll');if(v!=null)s.scrollTop=+v;s.setAttribute('data-restored','');var n=s.querySelector('.shell__nav'),h=s.querySelector('.shell__hl'),c=n&&n.querySelector('[aria-current="page"]'),f=ss.getItem('lds-shell-from');ss.removeItem('lds-shell-from');if(!h||!c||c.closest('.shell__panel:not(.is-open)'))return;var put=function(e){h.style.height=e.offsetHeight+'px';h.style.transform='translateY('+e.offsetTop+'px)';},o=null;if(f){[].forEach.call(n.querySelectorAll('a[href]'),function(a){if(a.getAttribute('href')===f)o=a;});}h.style.transition='none';if(o&&!o.closest('.shell__panel:not(.is-open)')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){put(o);h.offsetWidth;h.style.transition='';requestAnimationFrame(function(){put(c);});}else put(c);n.classList.add('has-hl');}catch(e){}})();</script>`;
const groupHome = (g) => PAGES.find((p) => p.group === g && !p.soon && p.nav !== false);
const crumbs = (page) => {
  const g = page.group;
  const home = groupHome(g);
  const parts = [`<li><a href="${HOME}.html">${PRODUCT}</a></li>`];
  parts.push(`<li><span class="ic" aria-hidden="true">chevron_right</span></li><li><a href="${home ? home.slug : HOME}.html">${esc(g)}</a></li>`);
  parts.push(`<li><span class="ic" aria-hidden="true">chevron_right</span></li><li><span aria-current="page">${esc(page.crumb || page.title)}</span></li>`);
  return `<nav aria-label="Jejak halaman"><ol class="crumbs">${parts.join('')}</ol></nav>`;
};
// [initials, name, what happened, when, unread, link]
const notes = [
  ['AS', 'Arif Setiawan', 'menugaskan Anda <b>Tindak lanjut genangan Jalan Merpati</b>', '2026-11-16T09:12', true, 'tindak-lanjut.html'],
  ['DL', 'Dewi Lestari', 'meminta persetujuan <b>12 izin usaha mikro</b>', '2026-11-16T08:40', true, 'perizinan.html'],
  ['BP', 'BPBD Kota Contoh', 'mengirim <b>peringatan dini hujan lebat</b> untuk sore ini', '2026-11-16T07:55', true, 'kebencanaan.html'],
  ['SH', 'Sari Handayani', 'mengekspor <b>1.204 laporan warga</b> ke CSV', '2026-11-15T11:30', false, 'laporan.html'],
];
const bar = (page) => `<header class="shell__bar">
      <button class="icon-btn" type="button" data-lds-shell-toggle aria-controls="side" aria-expanded="false" aria-label="Menu"><span class="burger" aria-hidden="true"><i></i><i></i><i></i></span></button>
      <button class="icon-btn" type="button" data-lds-shell-rail aria-controls="side" aria-expanded="true" aria-label="Ciutkan menu samping"><span class="ic" aria-hidden="true">left_panel_close</span></button>
      <span class="sep sep--v" aria-hidden="true"></span>
      ${crumbs(page)}
      <div class="shell__bar-end">
        <button class="control search shell__search" type="button" data-lds-open="palette" aria-haspopup="dialog"><span class="ic" aria-hidden="true">search</span>Cari halaman<span class="kbd">⌘K</span></button>
        <button class="icon-btn shell__search-icon" type="button" data-lds-open="palette" aria-haspopup="dialog" aria-label="Cari halaman"><span class="ic" aria-hidden="true">search</span></button>
        <div class="tip-host">
          <button class="icon-btn" type="button" data-lds-menu="theme-menu" aria-haspopup="menu" aria-expanded="false" aria-label="Tampilan" data-theme-btn><span class="ic" aria-hidden="true">light_mode</span></button>
          <div class="menu menu--right" id="theme-menu" role="menu" aria-label="Tampilan" style="top: calc(100% + 6px); right: 0; min-width: 180px;">
            <button class="menu__item" role="menuitemradio" aria-checked="false" data-lds-theme="light"><span class="ic" aria-hidden="true">light_mode</span>Terang<span class="ic menu__check" aria-hidden="true">check</span></button>
            <button class="menu__item" role="menuitemradio" aria-checked="false" data-lds-theme="dark"><span class="ic" aria-hidden="true">dark_mode</span>Gelap<span class="ic menu__check" aria-hidden="true">check</span></button>
            <button class="menu__item" role="menuitemradio" aria-checked="false" data-lds-theme="system"><span class="ic" aria-hidden="true">desktop_windows</span>Ikuti sistem<span class="ic menu__check" aria-hidden="true">check</span></button>
          </div>
        </div>
        <div class="tip-host">
          <button class="icon-btn" type="button" data-lds-menu="notes" aria-haspopup="dialog" aria-expanded="false" aria-label="Notifikasi, 3 belum dibaca" data-notes-btn><span class="ic" aria-hidden="true">notifications</span><span class="count" data-notes-count>3</span></button>
          <div class="popover dash-notes" id="notes" role="dialog" aria-labelledby="notes-title" style="top: calc(100% + 6px); right: 0;">
            <div class="cluster dash-notes__head"><h2 class="section__title-sm" id="notes-title">Notifikasi</h2><button class="btn btn--plain btn--sm" type="button" data-notes-read>Tandai semua dibaca</button></div>
            <div class="list list--fill">
${notes.map(([i, n, what, t, unread, href]) => `              <a class="lrow" href="${href}"${unread ? ' data-unread' : ''}><span class="avatar avatar--gray" style="--size: 32px;">${i}</span><span class="lrow__body"><span class="lrow__title">${n} ${what}</span><span class="lrow__sub"><time data-lds-time="${t}">${t.slice(11).replace(':', '.')}</time></span></span>${unread ? '<span class="status status--ok" data-unread-dot><i></i><span class="sr-only">Belum dibaca</span></span>' : ''}</a>`).join('\n')}
            </div>
          </div>
        </div>
        <div class="tip-host">
          <button class="icon-btn" type="button" data-lds-menu="user-menu" aria-haspopup="menu" aria-expanded="false" aria-label="Akun: ${USER.name}"><span class="avatar" style="--size: 32px;">${USER.initials}</span></button>
          <div class="menu menu--right" id="user-menu" role="menu" aria-label="Akun" style="top: calc(100% + 6px); right: 0; min-width: 240px;">
            <div class="lrow dash-me"><span class="avatar" style="--size: 36px;">${USER.initials}</span><span class="lrow__body"><span class="lrow__title">${USER.name}</span><span class="lrow__sub">${USER.role}</span></span></div>
            <div class="menu__sep"></div>
            <a class="menu__item" role="menuitem" href="profil.html"><span class="ic" aria-hidden="true">person</span>Profil</a>
            <a class="menu__item" role="menuitem" href="peran.html"><span class="ic" aria-hidden="true">shield_person</span>Peran dan akses</a>
            <a class="menu__item" role="menuitem" href="../../index.html"><span class="ic" aria-hidden="true">help</span>Bantuan dan dokumentasi</a>
            <div class="menu__sep"></div>
            <a class="menu__item" role="menuitem" href="masuk.html"><span class="ic" aria-hidden="true">logout</span>Keluar</a>
          </div>
        </div>
      </div>
    </header>`;
const palette = (layers = '') => {
  let n = 0;
  const opt = (inner, attrs) => `<${attrs.href ? 'a' : 'button type="button"'} class="cmdk__item" role="option" id="cmd-${++n}"${attrs.href ? ` href="${attrs.href}"` : ''}${attrs.cmd ? ` data-cmd="${attrs.cmd}"` : ''}>${inner}</${attrs.href ? 'a' : 'button'}>`;
  const pages = GROUPS.map((g) => `<div class="cmdk__group">${g}</div>\n${PAGES.filter((p) => p.group === g && (p.nav !== false || p.slug === 'segera-hadir')).filter((p) => !p.soon).map((p) => opt(`<span class="ic" aria-hidden="true">${p.icon}</span>${esc(p.title)}`, { href: `${p.slug}.html` })).join('\n')}`).join('\n');
  const actions = `<div class="cmdk__group">Tindakan</div>
${opt('<span class="ic" aria-hidden="true">light_mode</span>Pakai tampilan terang', { cmd: 'theme:light' })}
${opt('<span class="ic" aria-hidden="true">dark_mode</span>Pakai tampilan gelap', { cmd: 'theme:dark' })}
${opt('<span class="ic" aria-hidden="true">desktop_windows</span>Ikuti tampilan sistem', { cmd: 'theme:system' })}
${opt('<span class="ic" aria-hidden="true">left_panel_close</span>Ciutkan atau lebarkan menu samping', { cmd: 'rail' })}
${opt('<span class="ic" aria-hidden="true">grid_view</span>Semua contoh', { href: '../index.html' })}
${opt('<span class="ic" aria-hidden="true">menu_book</span>Dokumentasi sistem desain', { href: '../../index.html' })}`;
  return `<div class="layer-host">
  <div class="scrim" data-lds-scrim="palette"></div>
  <div class="cmdk" id="palette" role="dialog" aria-modal="true" aria-label="Cari halaman dan tindakan" data-lds-layer data-lds-cmdk-key="k">
    <div class="cmdk__search"><span class="ic" aria-hidden="true">search</span><input placeholder="Cari halaman dan tindakan" aria-label="Cari halaman dan tindakan" role="combobox" aria-expanded="true" aria-controls="palette-list" data-lds-filter="palette-list" data-lds-autofocus></div>
    <div class="cmdk__list" id="palette-list" role="listbox" aria-label="Hasil">
${pages}
${actions}
      <div class="cmdk__empty" data-lds-empty hidden>Tidak ada yang cocok. Coba nama halaman seperti "pengaduan" atau "kalender".</div>
    </div>
    <div class="cmdk__foot"><span><span class="kbd">↑</span> <span class="kbd">↓</span> untuk berpindah</span><span><span class="kbd">↵</span> untuk membuka</span><span><span class="kbd">esc</span> untuk menutup</span></div>
  </div>${layers ? `\n  ${layers}` : ''}
</div>`;
};
const head = (page, meta) => `<!doctype html>
<html lang="id" class="lds" data-theme="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(meta.title || page.title)} · ${PRODUCT} · Contoh Lampung Design System</title>
<meta name="description" content="${esc(meta.description || '')}">
<meta name="theme-color" content="#FFFFFF">
<script>try { var t = localStorage.getItem('lds-theme'); if (t) document.documentElement.setAttribute('data-theme', t); if (localStorage.getItem('lds-shell-rail') === '1') document.documentElement.setAttribute('data-shell-rail', ''); } catch (e) {}</script>
<link rel="stylesheet" href="../../../css/lds.css">
<link rel="stylesheet" href="dashboard.css">
</head>`;
const pageHeader = (page, src) => {
  if (!src.header) return '';
  const states = /data-states\b/.test(src.body);
  const stateMenu = states ? `<div class="tip-host">
          <button class="btn btn--plain btn--md" type="button" data-lds-menu="state-menu" aria-haspopup="menu" aria-expanded="false"><span class="ic" aria-hidden="true">visibility</span>Pratinjau keadaan<span class="ic" aria-hidden="true">expand_more</span></button>
          <div class="menu menu--right" id="state-menu" role="menu" aria-label="Pratinjau keadaan data" style="top: calc(100% + 6px); right: 0; min-width: 200px;">
            <p class="menu__label">Tampilkan semua widget sebagai</p>
            <button class="menu__item" role="menuitemradio" aria-checked="true" data-state-set="loaded">Termuat<span class="ic menu__check" aria-hidden="true">check</span></button>
            <button class="menu__item" role="menuitemradio" aria-checked="false" data-state-set="loading">Memuat<span class="ic menu__check" aria-hidden="true">check</span></button>
            <button class="menu__item" role="menuitemradio" aria-checked="false" data-state-set="empty">Kosong<span class="ic menu__check" aria-hidden="true">check</span></button>
            <button class="menu__item" role="menuitemradio" aria-checked="false" data-state-set="error">Galat<span class="ic menu__check" aria-hidden="true">check</span></button>
          </div>
        </div>` : '';
  return `<header class="dash-head">
        <div class="section__head">
          <div class="cluster" style="--gap: 10px;"><h1 style="margin: 0; font: var(--type-title-1); letter-spacing: var(--tracking-title-1); color: var(--text-strong);">${esc(src.meta.title || page.title)}</h1>${NOTE}</div>
          ${src.meta.description ? `<p class="section__sub">${esc(src.meta.description)}</p>` : ''}
        </div>
        ${stateMenu || src.actions ? `<div class="dash-head__actions">${stateMenu}${src.actions ? `\n        ${src.actions}` : ''}</div>` : ''}
      </header>`;
};
const scriptsOf = (src) => src.scripts.map((js) => `<script type="module">\n${js}\n</script>`).join('\n');
function pageHtml(src) {
  const page = PAGES.find((p) => p.slug === src.slug) || { slug: src.slug, title: src.meta.title || src.slug, group: src.meta.group || 'Halaman' };
  if (src.meta.crumb) page.crumb = src.meta.crumb;
  if (!src.shell) return `${head(page, src.meta)}
<body class="lds">
<a class="skip-link" href="#main">Lewati ke isi</a>
<main class="dash-solo" id="main" tabindex="-1">
${src.body}
</main>
<div class="layer-host">${src.layers}</div>
<script type="module" src="dashboard.js"></script>
${scriptsOf(src)}
</body>
</html>
`;
  return `${head(page, src.meta)}
<body class="lds">
<a class="skip-link" href="#main">Lewati ke isi</a>
<div class="navprogress" aria-hidden="true"></div>
<div class="shell" data-lds-shell>
  ${sidebar(src.slug)}
  <div class="shell__scrim"></div>
  <div class="shell__main">
    ${bar(page)}
    <main class="dash${src.wide ? ' dash--wide' : ''}" id="main" tabindex="-1">
      ${pageHeader(page, src)}
${src.body}${src.header ? '' : `\n      <p class="dash-note">${NOTE}</p>`}
    </main>
  </div>
</div>
${palette(src.layers)}
<script type="module" src="dashboard.js"></script>
${scriptsOf(src)}
</body>
</html>
`;
}


// ---------- examples hubs: docs/examples/index.html (ID) and docs/examples/en/index.html (EN) ----------
const HUB = {
  id: {
    lang: 'id', base: '', css: '../../css/lds.css', js: '../../js/lds.js',
    title: 'Contoh · Lampung Design System',
    meta: (n) => `Tiga contoh utuh yang dibuat hanya dengan Lampung Design System: dasbor operasional kota ${n} halaman, aplikasi warga, dan portal layanan publik.`,
    skip: 'Lewati ke isi', brand: 'Contoh LDS', nav: 'Utama', menu: 'Menu', appearance: 'Tampilan', light: 'Terang', dark: 'Gelap',
    links: [['index.html', 'Contoh', true], ['../index.html', 'Dokumentasi'], ['../components/index.html', 'Komponen'], ['en/index.html', 'English']],
    h1: 'Layanan kota, dibangun dari satu sistem',
    lede: 'Setiap layar di sini hanya memakai <code class="code">css/lds.css</code> dan <code class="code">js/lds.js</code>: tidak ada halaman yang punya tombol, kartu, atau menu sendiri. Pemerintah Kota Contoh adalah pemerintah fiktif. Nama, angka, dan tanggal adalah data contoh, bukan layanan resmi.',
    cards: (n) => [
      ['dashboard/ringkasan.html', 'Aplikasi admin', 'dashboard', 'Sakai Dasbor', `Dasbor operasional untuk pegawai Pemerintah Kota Contoh: pengaduan warga, perizinan, transportasi, kebencanaan, kesehatan, anggaran, dan ${n - 7} halaman lain dalam satu kerangka aplikasi.`, `${n} halaman`],
      ['mobile.html', 'Aplikasi ponsel', 'smartphone', 'Aplikasi warga Sakai', 'Layanan kota di ponsel warga: lapor masalah, pantau status, antre layanan, dan baca peringatan dini.', 'Bingkai ponsel'],
      ['landing.html', 'Situs publik', 'public', 'Portal layanan publik', 'Halaman depan layanan kota: cari layanan, syarat dan alur, jadwal, dan kontak.', 'Satu halaman panjang'],
    ],
    sakai: 'Nama Sakai diambil dari ungkapan Lampung <i>sakai sambayan</i>, bekerja bersama dan saling membantu.',
    groups: { Dasbor: ['Dasbor', 'Dasbor'], Halaman: ['Halaman', 'Halaman'], Masuk: ['Masuk dan akses', 'Masuk dan akses'] },
    pageTitle: (p) => p.title, pageDesc: (p) => descs.get(p.slug) || '',
  },
  en: {
    lang: 'en', base: '../', css: '../../../css/lds.css', js: '../../../js/lds.js',
    title: 'Examples · Lampung Design System',
    meta: (n) => `Three complete examples built only with Lampung Design System: a ${n}-page city operations dashboard, a citizen app and a public services portal.`,
    skip: 'Skip to content', brand: 'LDS examples', nav: 'Main', menu: 'Menu', appearance: 'Appearance', light: 'Light', dark: 'Dark',
    links: [['index.html', 'Examples', true], ['../../en/components/index.html', 'Components'], ['../index.html', 'Bahasa Indonesia']],
    h1: 'City services, built from one system',
    lede: 'Every screen here uses only <code class="code">css/lds.css</code> and <code class="code">js/lds.js</code>: no page has its own buttons, cards or menus. The examples themselves are in Indonesian, for a fictional local government, Pemerintah Kota Contoh. Names, figures and dates are example data, not an official service.',
    cards: (n) => [
      ['../dashboard/ringkasan.html', 'Admin app', 'dashboard', 'Sakai Dasbor', `An operations dashboard for city staff: citizen reports, permits, transport, disasters, health, the budget and ${n - 7} more pages on one app shell.`, `${n} pages, in Indonesian`],
      ['../mobile.html', 'Phone app', 'smartphone', 'Aplikasi warga Sakai', 'City services on a resident\'s phone: report a problem, follow its status, queue for a service, read early warnings.', 'Phone frame, in Indonesian'],
      ['../landing.html', 'Public site', 'public', 'Portal layanan publik', 'The front page of the city\'s services: find a service, its requirements and steps, opening hours and contacts.', 'One long page, in Indonesian'],
    ],
    sakai: 'Sakai comes from the Lampung phrase <i lang="id">sakai sambayan</i>: working together and helping each other.',
    groups: { Dasbor: ['Dashboards', 'Dashboard'], Halaman: ['Pages', 'Page'], Masuk: ['Sign in and access', 'Sign in'] },
    pageTitle: (p) => p.en, pageDesc: (p) => p.title,
  },
};
function hubHtml(L) {
  const live = PAGES.filter((p) => !p.soon && built.has(p.slug));
  const card = ([href, eyebrow, icon, title, body, foot]) => `<a class="link-card" href="${href}"><span class="link-card__eyebrow"><span class="ic ic--sm" aria-hidden="true">${icon}</span>${eyebrow}</span><span class="link-card__title">${title}</span><span class="link-card__body">${body}</span><span class="link-card__foot">${foot}<span class="ic lrow__chev" aria-hidden="true">chevron_right</span></span></a>`;
  const groupCards = GROUPS.filter((g) => live.some((p) => p.group === g)).map((g) => `<section class="section" aria-labelledby="hub-${g.toLowerCase()}">
        <div class="section__head"><h2 id="hub-${g.toLowerCase()}">${L.groups[g][0]}</h2></div>
        <div class="link-grid">
${live.filter((p) => p.group === g).map((p) => `          <a class="link-card" href="${L.base}dashboard/${p.slug}.html"><span class="link-card__eyebrow"><span class="ic ic--sm" aria-hidden="true">${p.icon}</span>${L.groups[g][1]}</span><span class="link-card__title">${esc(L.pageTitle(p))}</span><span class="link-card__body"${L.lang === 'en' ? ' lang="id"' : ''}>${esc(L.pageDesc(p))}</span></a>`).join('\n')}
        </div>
      </section>`).join('\n      ');
  return `<!doctype html>
<html lang="${L.lang}" class="lds" data-theme="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${L.title}</title>
<meta name="description" content="${esc(L.meta(live.length))}">
<script>try { var t = localStorage.getItem('lds-theme'); if (t) document.documentElement.setAttribute('data-theme', t); } catch (e) {}</script>
<link rel="stylesheet" href="${L.css}">
</head>
<body class="lds">
<a class="skip-link" href="#main">${L.skip}</a>
<header class="topnav" data-lds-topnav>
  <a class="topnav__brand" href="index.html">${L.brand}</a>
  <nav class="topnav__links" id="hub-links" aria-label="${L.nav}">
${L.links.map(([href, label, cur]) => `    <a class="topnav__link" href="${href}"${cur ? ' aria-current="page"' : ''}${/English|Indonesia/.test(label) ? ` lang="${L.lang === 'en' ? 'id' : 'en'}"` : ''}>${label}</a>`).join('\n')}
  </nav>
  <div class="topnav__actions">
    <div class="seg" role="group" aria-label="${L.appearance}" data-lds-segmented style="width: 168px;">
      <span class="seg__thumb"></span>
      <button class="seg__btn" type="button" aria-pressed="true" data-lds-theme="light">${L.light}</button>
      <button class="seg__btn" type="button" aria-pressed="false" data-lds-theme="dark">${L.dark}</button>
    </div>
    <button class="icon-btn topnav__toggle" type="button" data-lds-topnav-toggle aria-controls="hub-links" aria-expanded="false" aria-label="${L.menu}"><span class="burger" aria-hidden="true"><i></i><i></i><i></i></span></button>
  </div>
</header>
<main id="main" tabindex="-1" style="width: 100%; max-width: 1200px; margin: 0 auto; padding: 48px max(16px, env(safe-area-inset-right, 0px)) 96px max(16px, env(safe-area-inset-left, 0px));">
  <div class="sections">
    <header class="section">
      <div class="section__head">
        <h1 style="margin: 0; font: var(--type-display); letter-spacing: var(--tracking-display); color: var(--text-strong); text-wrap: balance; max-width: 18ch;">${L.h1}</h1>
        <p class="section__sub" style="font: var(--type-body); max-width: 72ch;">${L.lede}</p>
      </div>
      <div class="link-grid">
        ${L.cards(live.length).map(card).join('\n        ')}
      </div>
      <p class="section__sub">${L.sakai}</p>
    </header>
      ${groupCards}
  </div>
</main>
<script type="module">
  import { init, restoreTheme } from '${L.js}';
  const mode = restoreTheme(document.documentElement, 'light');
  document.querySelectorAll('[data-lds-theme]').forEach((b) => b.setAttribute('aria-pressed', String(b.getAttribute('data-lds-theme') === mode)));
  init();
</script>
</body>
</html>
`;
}

// ---------- validation ----------
const css = readFileSync(join(root, 'css/components.css'), 'utf8');
const dashCss = existsSync(join(outDir, 'dashboard.css')) ? readFileSync(join(outDir, 'dashboard.css'), 'utf8') : '';
const classes = new Set([...(css + dashCss).matchAll(/\.([a-zA-Z][\w-]*)/g)].map((m) => m[1]));
const jsSrc = readFileSync(join(root, 'js/lds.js'), 'utf8');
for (const m of jsSrc.matchAll(/[.'"`\s]([a-z][a-z0-9-]*?(?:__[a-z0-9-]+|--[a-z0-9-]+)+)/g)) classes.add(m[1]);
classes.add('lds');
const icons = new Set(Object.keys(JSON.parse(readFileSync(join(root, 'icons/icons.json'), 'utf8')).icons));
const knownPage = (slug) => built.has(slug) || PAGES.some((p) => p.slug === slug);
const hubs = [join(root, 'docs/examples/index.html'), join(root, 'docs/examples/en/index.html')];
function validate(name, html) {
  const problems = [], warnings = [];
  const plain = html.replace(/<script[\s\S]*?<\/script>/g, '');
  if (/—/.test(html)) problems.push('contains an em dash');
  for (const m of plain.matchAll(/\sclass="([^"]*)"/g)) for (const c of m[1].split(/\s+/)) if (c && !c.startsWith('is-') && !classes.has(c)) problems.push(`class "${c}" is not in css/components.css or dashboard.css`);
  for (const m of plain.matchAll(/<span class="ic[^"]*"[^>]*>([a-z0-9_]+)<\/span>/g)) if (!icons.has(m[1])) problems.push(`icon "${m[1]}" is not in icons/icons.json`);
  for (const m of plain.matchAll(/\shref="([^"]+)"/g)) {
    const h = m[1];
    if (/^(https?:|mailto:|tel:|#|data:)/.test(h)) continue;
    const path = h.split('#')[0].split('?')[0];
    if (!path) continue;
    const abs = resolve(dirname(name), path);
    const local = dirname(abs) === outDir && abs.match(/([a-z0-9-]+)\.html$/);
    if (local) { if (!built.has(local[1])) (knownPage(local[1]) ? warnings : problems).push(`links to ${path}, ${knownPage(local[1]) ? 'which has no source yet' : 'which is not a page'}`); continue; }
    if (!existsSync(abs) && !hubs.includes(abs)) problems.push(`links to ${h}, which does not exist`);
  }
  const ids = [...plain.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  const seen = new Set();
  for (const id of ids) { if (seen.has(id)) problems.push(`id "${id}" is used twice`); seen.add(id); }
  for (const m of plain.matchAll(/\s(?:data-lds-menu|aria-controls|data-lds-open|aria-labelledby|data-lds-selection|data-lds-filter)="([^"]+)"/g)) for (const id of m[1].split(/\s+/)) if (!seen.has(id)) problems.push(`points at #${id}, which is not on the page`);
  return { problems, warnings };
}

// ---------- write ----------
let fail = 0, warn = 0;
const pagesOut = [];
const descs = new Map(sources.map((f) => [f.replace(/\.html$/, ''), parse(f).meta.description || '']));
for (const f of sources) {
  const src = parse(f);
  if (ONLY && !ONLY.has(src.slug)) continue;
  for (const k of ['title', 'description']) if (!src.meta[k]) { console.error(`build-examples: ${f}: front matter misses "${k}"`); fail++; }
  if (!PAGES.some((p) => p.slug === src.slug)) console.warn(`build-examples: ${f} is not in the PAGES list of scripts/build-examples.mjs, so it is not in the sidebar or the palette`);
  const html = pageHtml(src);
  const notes = html.split(NOTE_TEXT).length - 1;
  if (notes !== 1) { console.error(`build-examples: ${f}: shows the example note ${notes} times (needs exactly 1; pages without the shell place {{note}})`); fail++; }
  const out = join(outDir, `${src.slug}.html`);
  const { problems, warnings } = validate(out, html);
  problems.forEach((p) => console.error(`build-examples: ${f}: ${p}`));
  fail += problems.length;
  if (warnings.length) warn += warnings.length;
  pagesOut.push([out, html]);
}
// The examples hubs list every built page
if (!ONLY) for (const [p, L] of [[hubs[0], HUB.id], [hubs[1], HUB.en]]) {
  const html = hubHtml(L);
  const { problems } = validate(p, html);
  problems.forEach((x) => console.error(`build-examples: ${p.slice(root.length + 1)}: ${x}`));
  fail += problems.length;
  pagesOut.push([p, html]);
}
const missing = PAGES.filter((p) => !p.soon && !built.has(p.slug)).map((p) => p.slug);
if (missing.length && !ONLY) console.warn(`build-examples: ${missing.length} page(s) in the list have no source yet: ${missing.join(', ')}`);
if (fail) { console.error(`build-examples: ${fail} problem(s), nothing written`); process.exit(1); }
if (!CHECK) {
  for (const [out, html] of pagesOut) { mkdirSync(dirname(out), { recursive: true }); writeFileSync(out, html); }
}
console.log(`build-examples: ${pagesOut.length} page(s) ${CHECK ? 'checked' : 'built'}${warn ? `, ${warn} link(s) to pages without a source yet` : ''}`);
