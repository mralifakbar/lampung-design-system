// Release notes, kept in step with CHANGELOG.md (the source of truth for each version).
const items = {
  id: [
    'Token dalam satu berkas untuk CSS, JS/TS, shadcn/ui, dan Flutter: aksen hijau Lampung, emas siger untuk identitas, Geist dan Geist Mono, tema terang dan gelap dengan kontras WCAG 2.2 AA.',
    'Preset aksen Biru Teluk dan Cokelat Kopi lewat <code class="code">data-accent</code>.',
    '179 komponen dan resep, masing-masing dengan dokumentasi bahasa Indonesia dan Inggris.',
    'Aksara Lampung: glyph orisinal, transliterasi Latin, <code class="code">[data-lds-aksara]</code>, dan <code class="code">.aksara-band</code>.',
    'Komponen masthead untuk menyatakan status resmi atau tidak resmi sebuah situs layanan publik.',
    'Logo siger (<code class="code">brand/</code>): siger dengan tujuh lekuk berbentuk lidah api yang melengkung ke tengah di atas dasar melengkung, putih di atas ubin hijau Lampung, dipakai sebagai logo dan favicon.',
    '53 ikon untuk layanan publik dan kota cerdas.',
    'CLI <code class="code">lampung-ds</code>: <code class="code">init</code>, <code class="code">create</code>, <code class="code">add</code>, <code class="code">list</code>, <code class="code">doctor</code> untuk Next.js, Vite, TanStack Start, React Router, Astro, Laravel, HTML, dan Flutter.',
    'Paket Flutter <code class="code">lampung_design_system</code>: tema, token, widget, dan aksara.',
    'Contoh: dasbor operasional kota, aplikasi warga, dan portal layanan publik.',
  ],
  en: [
    'Tokens in one file for CSS, JS/TS, shadcn/ui and Flutter: Lampung green accent, siger gold for identity, Geist and Geist Mono, light and dark themes with WCAG 2.2 AA contrast.',
    'Bay blue and coffee brown accent presets through <code class="code">data-accent</code>.',
    '179 components and recipes, each documented in Indonesian and English.',
    'Aksara Lampung: original glyphs, Latin transliteration, <code class="code">[data-lds-aksara]</code> and <code class="code">.aksara-band</code>.',
    'A masthead component to state whether a public-service site is official.',
    'The siger mark (<code class="code">brand/</code>): a siger with seven flame-shaped lekuk curling toward the center above an arched base, white on a Lampung green tile, used as logo and favicon.',
    '53 icons for public services and smart city screens.',
    'The <code class="code">lampung-ds</code> CLI: <code class="code">init</code>, <code class="code">create</code>, <code class="code">add</code>, <code class="code">list</code> and <code class="code">doctor</code> for Next.js, Vite, TanStack Start, React Router, Astro, Laravel, HTML and Flutter.',
    'The <code class="code">lampung_design_system</code> Flutter package: theme, tokens, widgets and aksara.',
    'Examples: a city operations dashboard, a citizen app and a public service portal.',
  ],
};
const body = (lang) => `<h2>0.1.0</h2><p class="cdoc__p">${lang === 'id' ? '16 November 2026. Rilis publik pertama.' : '16 November 2026. First public release.'}</p><ul class="cdoc__list">${items[lang].map((i) => `<li>${i}</li>`).join('')}</ul>
<h2>${lang === 'id' ? 'Versi dan kompatibilitas' : 'Versions and compatibility'}</h2><p class="cdoc__p">${lang === 'id' ? 'LDS memakai Semantic Versioning. Paket inti, CLI, dan paket Flutter berbagi satu nomor versi. Perubahan yang memutus kompatibilitas hanya terjadi di versi mayor dan selalu ditulis di bagian <b>BREAKING CHANGE</b>. Riwayat lengkap ada di <a class="link" href="https://github.com/mralifakbar/lampung-design-system/blob/main/CHANGELOG.md">CHANGELOG.md</a>.' : 'LDS follows Semantic Versioning. The core package, the CLI and the Flutter package share one version number. Breaking changes only land in major versions and are always listed under <b>BREAKING CHANGE</b>. The full history is in <a class="link" href="https://github.com/mralifakbar/lampung-design-system/blob/main/CHANGELOG.md">CHANGELOG.md</a>.'}</p>`;
export default {
  slug: 'catatan-rilis', order: 9, icon: 'history',
  id: { title: 'Catatan rilis', lede: 'Apa yang baru di setiap versi Lampung Design System.', body: body('id') },
  en: { title: 'Release notes', lede: 'What is new in each version of Lampung Design System.', body: body('en') },
};
