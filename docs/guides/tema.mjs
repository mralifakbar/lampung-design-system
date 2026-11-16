// Theming guide: light and dark, accent presets with a local story, and an agency's own accent.
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const code = (s) => `<div class="codeblock"><pre>${esc(s.trim())}</pre></div>`;

// Live preview: the buttons set data-accent and data-theme on the stage only.
const stage = (lang) => {
  const L = lang === 'id'
    ? { acc: 'Aksen', theme: 'Tema', green: 'Hijau Lampung', teluk: 'Biru Teluk', kopi: 'Cokelat Kopi', light: 'Terang', dark: 'Gelap', title: 'Permohonan izin usaha', status: 'Diproses', body: 'Berkas Anda sedang diperiksa petugas. Perkiraan selesai 3 hari kerja.', primary: 'Lihat detail', secondary: 'Unduh bukti', link: 'Hubungi petugas' }
    : { acc: 'Accent', theme: 'Theme', green: 'Lampung green', teluk: 'Bay blue', kopi: 'Coffee brown', light: 'Light', dark: 'Dark', title: 'Business permit application', status: 'In review', body: 'An officer is checking your documents. Expected in 3 working days.', primary: 'View details', secondary: 'Download receipt', link: 'Contact an officer' };
  const btn = (attr, val, label, on) => `<button class="seg__btn" aria-pressed="${on}" onclick="var s=document.getElementById('tema-stage');${val ? `s.setAttribute('${attr}','${val}')` : `s.removeAttribute('${attr}')`};this.parentNode.querySelectorAll('.seg__btn').forEach(function(b){b.setAttribute('aria-pressed',String(b===this))},this)">${label}</button>`;
  return `<div class="docs-col" style="gap: 12px; margin: 16px 0 8px;">
  <div class="cluster" style="gap: 12px; flex-wrap: wrap;">
    <div class="seg" role="group" aria-label="${L.acc}" data-lds-segmented style="min-width: 320px;"><span class="seg__thumb"></span>${btn('data-accent', '', L.green, true)}${btn('data-accent', 'teluk', L.teluk, false)}${btn('data-accent', 'kopi', L.kopi, false)}</div>
    <div class="seg" role="group" aria-label="${L.theme}" data-lds-segmented style="min-width: 180px;"><span class="seg__thumb"></span>${btn('data-theme', 'light', L.light, true)}${btn('data-theme', 'dark', L.dark, false)}</div>
  </div>
  <div id="tema-stage" class="lds" data-theme="light" style="padding: 24px; border-radius: var(--r-lg); background: var(--bg-canvas); box-shadow: inset 0 0 0 1px var(--line);">
    <div class="card stack" style="--gap: 12px; max-width: 460px;">
      <div class="cluster" style="justify-content: space-between;"><span class="card__title">${L.title}</span><span class="badge badge--accent">${L.status}</span></div>
      <p style="margin: 0; font: var(--type-subhead); color: var(--text-subtle);">${L.body}</p>
      <div class="progress"><span class="progress__fill" style="transform: scaleX(0.6);"></span></div>
      <div class="cluster"><button class="btn btn--primary btn--md">${L.primary}</button><button class="btn btn--secondary btn--md">${L.secondary}</button><a class="link" href="#tema-stage">${L.link}</a></div>
    </div>
  </div>
</div>`;
};

const CUSTOM = `/* Your agency's accent, in both themes. Check every pair before shipping:
   python3 skills/antislop-human/contrast-check.py "#FFFFFF" "#1F5E3A" */
:root,
[data-theme="light"] {
  --accent: #1F5E3A;
  --accent-hover: #1A5233;
  --accent-pressed: #15452B;
  --accent-text: #1A5233;
  --accent-tint: #E9F2EC;
  --accent-tint-strong: #D3E5D9;
  --accent-ring: rgba(31, 94, 58, 0.24);
  --focus: #1F5E3A;
}
[data-theme="dark"] {
  --accent: #27744A;
  --accent-hover: #2B7C50;
  --accent-pressed: #1F5E3A;
  --accent-text: #8FD3AC;
  --accent-tint: rgba(80, 180, 120, 0.15);
  --accent-tint-strong: rgba(80, 180, 120, 0.25);
  --accent-ring: rgba(143, 211, 172, 0.35);
  --focus: #8FD3AC;
}`;

const FLUTTER = `MaterialApp(
  theme: LdsTheme.build(Brightness.light,
      colors: LdsColors.light.copyWith(accent: const Color(0xFF0B5CAD), accentText: const Color(0xFF0A4F96))),
  darkTheme: LdsTheme.build(Brightness.dark,
      colors: LdsColors.dark.copyWith(accent: const Color(0xFF1767C0), accentText: const Color(0xFF84B8F2))),
);`;

const body = (lang) => lang === 'id' ? `
<h2>Terang, gelap, dan ikut sistem</h2>
<p class="cdoc__p">Satu atribut mengatur semuanya: <code class="code">data-theme="light"</code>, <code class="code">"dark"</code>, atau <code class="code">"system"</code> pada <code class="code">&lt;html&gt;</code> atau elemen mana pun. Komponen hanya membaca token, jadi ikut berganti sendiri. Panggil <code class="code">restoreTheme()</code> sebelum halaman tergambar agar pilihan tersimpan dipakai tanpa kedipan; tombol dengan <code class="code">data-lds-theme</code> mengganti tema setelah <code class="code">init()</code>. Rincian ada di <a class="link" href="{{comp}}theming.html">Theming</a>.</p>
${code(`<html lang="id" class="lds" data-theme="light">
<script type="module">
  import { init, restoreTheme, setTheme } from 'lampung-design-system/js';
  restoreTheme(document.documentElement, 'light');
  init();
  // setTheme('dark') dari pengaturan Anda
</script>`)}
<h2>Preset aksen</h2>
<p class="cdoc__p">Hijau Lampung adalah aksen bawaan. Bila layanan Anda butuh nuansa lain, LDS menyediakan dua preset dengan cerita lokal. Pasang <code class="code">data-accent</code> pada <code class="code">&lt;html&gt;</code> atau satu bagian halaman; hanya peran aksen yang berubah (tombol utama, pilihan, tautan, focus ring, seri grafik pertama), di tema terang maupun gelap, dan setiap pasangan warnanya diuji kontrasnya.</p>
<div class="table-box"><table class="table table--wrap"><thead><tr><th>Preset</th><th>Atribut</th><th>Cerita</th></tr></thead><tbody>
<tr><td>Hijau Lampung</td><td><code class="code">(tanpa atribut)</code></td><td>Hijau pada lambang daerah. Bawaan.</td></tr>
<tr><td>Biru Teluk</td><td><code class="code">data-accent="teluk"</code></td><td>Air Teluk Lampung di depan Bandar Lampung.</td></tr>
<tr><td>Cokelat Kopi</td><td><code class="code">data-accent="kopi"</code></td><td>Kopi robusta Lampung, disangrai gelap.</td></tr>
</tbody></table></div>
${stage('id')}
<h2>Warna instansi sendiri</h2>
<p class="cdoc__p">Instansi yang punya warna identitas sendiri cukup menimpa peran aksen setelah <code class="code">lds.css</code>. Jangan ubah token lain: netral, status, dan emas sudah diseimbangkan. Hitung kontras setiap pasangan di kedua tema; teks putih di atas aksen dan <code class="code">--accent-text</code> di atas kanvas harus minimal 4,5:1.</p>
${code(CUSTOM)}
<p class="cdoc__p">Di Flutter, berikan warna lewat <code class="code">LdsColors.copyWith</code>:</p>
${code(FLUTTER)}
<h2>Emas siger</h2>
<p class="cdoc__p">Emas (<code class="code">--gold</code>, <code class="code">--gold-text</code>, <code class="code">--gold-tint</code>) tetap sama di semua preset karena ia identitas, bukan aksi. Pakai untuk band aksara, badge identitas (<code class="code">badge--gold</code>), dan sorotan kecil. Jangan untuk tombol, tautan, atau status terpilih.</p>
<h2>Yang tidak boleh</h2>
<ul class="cdoc__list">
  <li>Memakai lambang daerah atau logo instansi pada situs yang tidak dikelola instansi tersebut.</li>
  <li>Mengganti warna status (berhasil, peringatan, bahaya) agar cocok dengan aksen: warna status punya arti sendiri.</li>
  <li>Menulis selektor khusus mode gelap di CSS proyek. Pakai token, maka mode gelap ikut sendiri.</li>
</ul>` : `
<h2>Light, dark and system</h2>
<p class="cdoc__p">One attribute sets it all: <code class="code">data-theme="light"</code>, <code class="code">"dark"</code> or <code class="code">"system"</code> on <code class="code">&lt;html&gt;</code> or any element. Components read only tokens, so they switch by themselves. Call <code class="code">restoreTheme()</code> before first paint so the saved choice applies without a flash; buttons with <code class="code">data-lds-theme</code> switch the theme after <code class="code">init()</code>. Details in <a class="link" href="{{comp}}theming.html">Theming</a>.</p>
${code(`<html lang="en" class="lds" data-theme="light">
<script type="module">
  import { init, restoreTheme, setTheme } from 'lampung-design-system/js';
  restoreTheme(document.documentElement, 'light');
  init();
  // setTheme('dark') from your settings
</script>`)}
<h2>Accent presets</h2>
<p class="cdoc__p">Lampung green is the default accent. When a service needs another feel, LDS ships two presets with a local story. Put <code class="code">data-accent</code> on <code class="code">&lt;html&gt;</code> or one part of a page; only the accent roles change (primary button, selection, links, focus ring, first chart series), in light and dark, and every pairing is contrast tested.</p>
<div class="table-box"><table class="table table--wrap"><thead><tr><th>Preset</th><th>Attribute</th><th>Story</th></tr></thead><tbody>
<tr><td>Lampung green</td><td><code class="code">(none)</code></td><td>The green of the regional emblem. Default.</td></tr>
<tr><td>Bay blue</td><td><code class="code">data-accent="teluk"</code></td><td>The water of Teluk Lampung, the bay in front of Bandar Lampung.</td></tr>
<tr><td>Coffee brown</td><td><code class="code">data-accent="kopi"</code></td><td>Lampung robusta coffee, roasted dark.</td></tr>
</tbody></table></div>
${stage('en')}
<h2>An agency's own color</h2>
<p class="cdoc__p">An agency with its own identity color overrides only the accent roles after <code class="code">lds.css</code>. Leave the other tokens alone: neutrals, status colors and gold are already balanced. Compute contrast for every pair in both themes; white on the accent and <code class="code">--accent-text</code> on the canvas must be at least 4.5:1.</p>
${code(CUSTOM)}
<p class="cdoc__p">In Flutter, pass colors through <code class="code">LdsColors.copyWith</code>:</p>
${code(FLUTTER)}
<h2>Siger gold</h2>
<p class="cdoc__p">Gold (<code class="code">--gold</code>, <code class="code">--gold-text</code>, <code class="code">--gold-tint</code>) stays the same in every preset because it is identity, not action. Use it for the aksara band, identity badges (<code class="code">badge--gold</code>) and small highlights. Never for buttons, links or the selected state.</p>
<h2>What not to do</h2>
<ul class="cdoc__list">
  <li>Use the regional coat of arms or an agency logo on a site that agency does not run.</li>
  <li>Recolor status colors (success, warning, danger) to match the accent: status colors carry their own meaning.</li>
  <li>Write dark-mode selectors in project CSS. Use tokens and dark mode follows.</li>
</ul>`;

export default {
  slug: 'tema', order: 3, icon: 'palette',
  id: { title: 'Tema dan warna', nav: 'Tema dan warna', lede: 'Mode terang dan gelap, preset aksen dengan cerita lokal, dan cara memakai warna instansi sendiri tanpa merusak kontras.', body: body('id') },
  en: { title: 'Theming and color', nav: 'Theming and color', lede: 'Light and dark, accent presets with a local story, and how to use an agency\'s own color without breaking contrast.', body: body('en') },
};
