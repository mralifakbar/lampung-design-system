// Contributing guide: issues, local setup, commit rules, components, translation, conduct.
export default {
  slug: 'kontribusi',
  order: 8,
  icon: 'handshake',
  id: {
    title: 'Kontribusi',
    lede: 'LDS adalah proyek open source komunitas. Siapa saja boleh melaporkan masalah, mengusulkan komponen, memperbaiki terjemahan atau mengirim kode. Halaman ini menjelaskan caranya.',
    body: `
<h2 id="isu">Melaporkan bug atau mengusulkan komponen</h2>
<p class="cdoc__p">Semua laporan dan usulan masuk lewat <a class="link" href="https://github.com/mralifakbar/lampung-design-system/issues">isu GitHub</a>. Cari dulu apakah isu yang sama sudah ada; bila ada, tambahkan informasi Anda di sana.</p>
<ul class="cdoc__list">
  <li><strong>Bug.</strong> Tulis apa yang Anda lakukan, apa yang Anda harapkan, dan apa yang terjadi. Sebutkan halaman atau komponen, peramban dan perangkat, tema terang atau gelap, dan lampirkan tangkapan layar bila ada.</li>
  <li><strong>Masalah aksesibilitas.</strong> Sebutkan alat bantu yang dipakai (misalnya NVDA atau TalkBack) dan bagian yang tidak bisa dipakai. Laporan ini diprioritaskan.</li>
  <li><strong>Usulan komponen.</strong> Ceritakan kebutuhan nyatanya: layanan apa, siapa penggunanya, dan mengapa komponen yang ada belum cukup. Baca dulu daftar <a class="link" href="{{comp}}index.html">Komponen</a>; sering kali kebutuhan itu sudah tercakup.</li>
</ul>

<h2 id="persiapan">Menyiapkan di komputer</h2>
<p class="cdoc__p">Butuh Node 20 atau lebih baru. Python 3 dipakai untuk server lokal, pemeriksa kontras dan build ikon.</p>
<div class="codeblock"><pre>git clone https://github.com/mralifakbar/lampung-design-system.git
cd lampung-design-system
npm run build    # token, aksara, dokumentasi dan contoh
npm test         # semua pengujian
npm run serve    # http://localhost:5173</pre></div>
<p class="cdoc__p">Buka http://localhost:5173/docs/ dan http://localhost:5173/docs/en/. Periksa setiap halaman yang Anda ubah di tema terang dan gelap, di layar lebar dan di lebar 375 px, dengan tetikus dan dengan papan ketik.</p>

<h2 id="commit">Aturan commit</h2>
<p class="cdoc__p">Repositori ini memakai <a class="link" href="https://www.conventionalcommits.org/en/v1.0.0/">Conventional Commits</a>. Pesan commit ditulis dalam bahasa Inggris dengan bentuk berikut:</p>
<div class="codeblock"><pre>&lt;type&gt;(&lt;optional scope&gt;): &lt;subject in lowercase imperative, no trailing period, max 72 chars&gt;

&lt;optional body: why, wrapped at 72&gt;

&lt;optional footer: BREAKING CHANGE: ..., Refs: #12&gt;</pre></div>
<ul class="cdoc__list">
  <li><strong>Jenis:</strong> <code class="code">feat</code>, <code class="code">fix</code>, <code class="code">docs</code>, <code class="code">style</code> (hanya format), <code class="code">refactor</code>, <code class="code">perf</code>, <code class="code">test</code>, <code class="code">build</code> (sistem build, berkas hasil build, pemaketan), <code class="code">ci</code>, <code class="code">chore</code>, <code class="code">revert</code>.</li>
  <li><strong>Cakupan</strong> (pilih area yang disentuh): <code class="code">tokens</code>, <code class="code">css</code>, <code class="code">js</code>, <code class="code">react</code>, <code class="code">icons</code>, <code class="code">type</code>, <code class="code">aksara</code>, <code class="code">docs</code>, <code class="code">i18n</code>, <code class="code">examples</code>, <code class="code">landing</code>, <code class="code">cli</code>, <code class="code">flutter</code>, <code class="code">skills</code>, <code class="code">scripts</code>, <code class="code">deploy</code>, <code class="code">deps</code>, <code class="code">release</code>.</li>
  <li><strong>Commit kecil, selalu.</strong> Satu perubahan logis per commit: satu perubahan token, satu komponen, satu halaman dokumentasi, satu layar contoh, satu perintah CLI. Commit begitu perubahan itu berhasil di-build dan lolos pemeriksaan; jangan menumpuk pekerjaan sehari dalam satu commit. Bila pesannya butuh kata "and" untuk menjelaskan dua hal yang tidak berhubungan, pecah menjadi dua. Berkas hasil build masuk ke commit yang sama dengan perubahan sumbernya.</li>
  <li><strong>Perubahan yang merusak kompatibilitas</strong> menambahkan <code class="code">!</code> setelah jenis atau cakupan (<code class="code">feat(tokens)!: rename accent-text</code>) dan footer <code class="code">BREAKING CHANGE:</code>.</li>
  <li><strong>Jangan pernah meng-commit</strong> rahasia, berkas <code class="code">.env</code>, <code class="code">node_modules</code>, hasil build di <code class="code">site/</code> atau <code class="code">apps/landing/dist/</code>, atau <code class="code">.cache/</code>.</li>
  <li><code class="code">commitlint.config.mjs</code> memuat aturan ini; <code class="code">npm run lint:commits</code> memeriksa cabang Anda.</li>
</ul>
<p class="cdoc__p">Contoh pesan commit:</p>
<div class="codeblock"><pre>feat(css): add masthead
fix(js): return focus to the trigger when a sheet closes
docs(i18n): translate the date field spec to indonesian
build(tokens): regenerate css variables after gold-text change
feat(tokens)!: rename accent-text

BREAKING CHANGE: the accent-text token has a new name; update every use.</pre></div>

<h2 id="komponen">Menambah komponen</h2>
<p class="cdoc__p">Sebelum menulis kode, pastikan kebutuhannya belum tercakup dan usulannya sudah dibahas di isu. Lalu:</p>
<ul class="cdoc__list">
  <li>Tulis CSS di <code class="code">css/components.css</code>. Komponen hanya membaca token, tidak pernah nilai mentah, dan tidak memakai selektor khusus tema.</li>
  <li>Bila butuh perilaku, tambahkan di <code class="code">js/lds.js</code> di balik atribut <code class="code">data-lds-*</code>, sambungkan di <code class="code">init()</code>, dan perbarui <code class="code">js/lds.d.ts</code> (serta <code class="code">react/index.tsx</code> bila React harus memegang statusnya).</li>
  <li>Tulis spesifikasi dalam bahasa Inggris di <code class="code">docs/spec/&lt;slug&gt;.mjs</code> dan terjemahan Indonesianya di <code class="code">docs/spec/id/&lt;slug&gt;.mjs</code>. Panduannya ada di <code class="code">docs/spec/_GUIDE.md</code>.</li>
  <li>Jalankan <code class="code">npm run build:docs</code>. Build menolak nama ikon yang tidak ada, kelas yang tidak ada di CSS, tautan ke spesifikasi yang tidak ada, dan tanda pisah panjang.</li>
  <li>Tambahkan contoh ke <code class="code">docs/gallery.html</code>.</li>
  <li>Hitung kontras setiap pasangan warna baru di kedua tema, dan pastikan target sentuh 44 px, cincin fokus dan penggunaan dengan papan ketik.</li>
</ul>

<h2 id="terjemahan">Membantu terjemahan</h2>
<p class="cdoc__p">Dokumentasi ditulis dalam bahasa Indonesia lebih dulu, lalu bahasa Inggris. Setiap halaman yang dibaca orang harus ada dalam kedua bahasa. Kode, komentar kode dan pesan commit tetap berbahasa Inggris.</p>
<ul class="cdoc__list">
  <li>Panduan seperti halaman ini ada di <code class="code">docs/guides/</code>, satu berkas berisi kedua bahasa.</li>
  <li>Spesifikasi komponen berbahasa Inggris ada di <code class="code">docs/spec/</code>; terjemahan Indonesianya di <code class="code">docs/spec/id/</code>. Saat build, <code class="code">npm run build:docs</code> menyebut berapa komponen yang masih berbahasa Inggris di situs Indonesia.</li>
  <li>Ikuti panduan <a class="link" href="{{guide}}penulisan.html">Penulisan</a>: bahasa yang lugas, huruf kapital kalimat, tombol yang menyebut hasil, tanpa tanda pisah panjang.</li>
  <li>Teks yang memakai aksara Lampung sebaiknya diperiksa oleh penutur atau guru aksara Lampung. Bantuan dari mereka sangat berharga.</li>
</ul>

<h2 id="kode-etik">Kode etik</h2>
<p class="cdoc__p">Proyek ini terbuka untuk siapa saja yang ingin membantu layanan publik menjadi lebih mudah dipakai. Kami berharap setiap peserta:</p>
<ul class="cdoc__list">
  <li>Bersikap sopan dan menghargai orang lain, apa pun latar belakang, kemampuan, agama, suku, jenis kelamin atau tingkat pengalamannya.</li>
  <li>Mengkritik gagasan, bukan orangnya, dan menerima masukan dengan lapang.</li>
  <li>Tidak melecehkan, menghina, atau menyebarkan data pribadi orang lain.</li>
  <li>Tidak memakai proyek ini untuk kampanye politik atau mengatasnamakan instansi pemerintah.</li>
</ul>
<p class="cdoc__p">Bila Anda mengalami atau melihat perilaku yang melanggar, kirim email ke <a class="link" href="mailto:alif@kartadinata.app">alif@kartadinata.app</a>. Tulis apa yang terjadi, kapan dan di mana.</p>

<h2 id="kemitraan">Kemitraan</h2>
<p class="cdoc__p">Bila tim, kampus, komunitas atau instansi Anda ingin memakai LDS dalam proyek, menguji layanan bersama warga, atau bekerja sama mengembangkan komponen, hubungi <a class="link" href="mailto:alif@kartadinata.app">alif@kartadinata.app</a>. LDS tetap proyek komunitas yang tidak resmi; kerja sama tidak menjadikannya produk instansi mana pun.</p>
`,
  },
  en: {
    title: 'Contributing',
    lede: 'LDS is a community open source project. Anyone can report a problem, propose a component, improve a translation or send code. This page explains how.',
    body: `
<h2 id="isu">Reporting a bug or proposing a component</h2>
<p class="cdoc__p">All reports and proposals go through <a class="link" href="https://github.com/mralifakbar/lampung-design-system/issues">GitHub issues</a>. Search first for an existing issue; if there is one, add what you know there.</p>
<ul class="cdoc__list">
  <li><strong>Bug.</strong> Write what you did, what you expected and what happened. Name the page or component, the browser and device, light or dark theme, and attach a screenshot when you can.</li>
  <li><strong>Accessibility problem.</strong> Name the assistive technology you used (for example NVDA or TalkBack) and the part that could not be used. These reports get priority.</li>
  <li><strong>Component proposal.</strong> Describe the real need: which service, who uses it, and why the existing components are not enough. Read the <a class="link" href="{{comp}}index.html">Components</a> list first; the need is often already covered.</li>
</ul>

<h2 id="persiapan">Local setup</h2>
<p class="cdoc__p">You need Node 20 or newer. Python 3 is used for the local server, the contrast checker and the icon build.</p>
<div class="codeblock"><pre>git clone https://github.com/mralifakbar/lampung-design-system.git
cd lampung-design-system
npm run build    # tokens, aksara, docs and examples
npm test         # every test suite
npm run serve    # http://localhost:5173</pre></div>
<p class="cdoc__p">Open http://localhost:5173/docs/ and http://localhost:5173/docs/en/. Check every page you changed in light and dark, at desktop width and at 375 px, with a mouse and with the keyboard.</p>

<h2 id="commit">Commit rules</h2>
<p class="cdoc__p">This repository uses <a class="link" href="https://www.conventionalcommits.org/en/v1.0.0/">Conventional Commits</a>. Commit messages are in English and have this shape:</p>
<div class="codeblock"><pre>&lt;type&gt;(&lt;optional scope&gt;): &lt;subject in lowercase imperative, no trailing period, max 72 chars&gt;

&lt;optional body: why, wrapped at 72&gt;

&lt;optional footer: BREAKING CHANGE: ..., Refs: #12&gt;</pre></div>
<ul class="cdoc__list">
  <li><strong>Types:</strong> <code class="code">feat</code>, <code class="code">fix</code>, <code class="code">docs</code>, <code class="code">style</code> (formatting only), <code class="code">refactor</code>, <code class="code">perf</code>, <code class="code">test</code>, <code class="code">build</code> (build system, generated output, packaging), <code class="code">ci</code>, <code class="code">chore</code>, <code class="code">revert</code>.</li>
  <li><strong>Scopes</strong> (pick the area touched): <code class="code">tokens</code>, <code class="code">css</code>, <code class="code">js</code>, <code class="code">react</code>, <code class="code">icons</code>, <code class="code">type</code>, <code class="code">aksara</code>, <code class="code">docs</code>, <code class="code">i18n</code>, <code class="code">examples</code>, <code class="code">landing</code>, <code class="code">cli</code>, <code class="code">flutter</code>, <code class="code">skills</code>, <code class="code">scripts</code>, <code class="code">deploy</code>, <code class="code">deps</code>, <code class="code">release</code>.</li>
  <li><strong>Small commits, always.</strong> One logical change per commit: a token change, one component, one docs page, one example screen, one CLI command. Commit as soon as that change builds and passes its checks; never pile up a day of work into one commit. If a message needs "and" to describe two unrelated things, split it. Generated files go in the same commit as the source change that produced them.</li>
  <li><strong>Breaking changes</strong> add <code class="code">!</code> after the type or scope (<code class="code">feat(tokens)!: rename accent-text</code>) and a <code class="code">BREAKING CHANGE:</code> footer.</li>
  <li><strong>Never commit</strong> secrets, <code class="code">.env</code> files, <code class="code">node_modules</code>, build output under <code class="code">site/</code> or <code class="code">apps/landing/dist/</code>, or <code class="code">.cache/</code>.</li>
  <li><code class="code">commitlint.config.mjs</code> encodes these rules; <code class="code">npm run lint:commits</code> checks the branch.</li>
</ul>
<p class="cdoc__p">Example commit messages:</p>
<div class="codeblock"><pre>feat(css): add masthead
fix(js): return focus to the trigger when a sheet closes
docs(i18n): translate the date field spec to indonesian
build(tokens): regenerate css variables after gold-text change
feat(tokens)!: rename accent-text

BREAKING CHANGE: the accent-text token has a new name; update every use.</pre></div>

<h2 id="komponen">Adding a component</h2>
<p class="cdoc__p">Before writing code, make sure the need is not already covered and the proposal has been discussed in an issue. Then:</p>
<ul class="cdoc__list">
  <li>Write the CSS in <code class="code">css/components.css</code>. Components read tokens only, never raw values, and use no theme-specific selectors.</li>
  <li>If it needs behavior, add it to <code class="code">js/lds.js</code> behind a <code class="code">data-lds-*</code> attribute, wire it in <code class="code">init()</code>, and update <code class="code">js/lds.d.ts</code> (plus <code class="code">react/index.tsx</code> if React must own its state).</li>
  <li>Write the English spec in <code class="code">docs/spec/&lt;slug&gt;.mjs</code> and its Indonesian override in <code class="code">docs/spec/id/&lt;slug&gt;.mjs</code>. The guide is <code class="code">docs/spec/_GUIDE.md</code>.</li>
  <li>Run <code class="code">npm run build:docs</code>. The build rejects icon names that do not exist, classes missing from the CSS, links to specs that do not exist, and em dashes.</li>
  <li>Add an example to <code class="code">docs/gallery.html</code>.</li>
  <li>Compute the contrast of every new color pair in both themes, and check 44 px targets, the focus ring and keyboard use.</li>
</ul>

<h2 id="terjemahan">Helping with translation</h2>
<p class="cdoc__p">The documentation is written in Indonesian first and English second. Every page people read must exist in both languages. Code, code comments and commit messages stay in English.</p>
<ul class="cdoc__list">
  <li>Guides like this page live in <code class="code">docs/guides/</code>, one file holding both languages.</li>
  <li>English component specs live in <code class="code">docs/spec/</code>; their Indonesian overrides in <code class="code">docs/spec/id/</code>. When it runs, <code class="code">npm run build:docs</code> reports how many components are still in English on the Indonesian site.</li>
  <li>Follow the <a class="link" href="{{guide}}penulisan.html">Writing</a> guide: plain language, sentence case, buttons that name the outcome, no em dashes.</li>
  <li>Text set in aksara Lampung should be checked by a speaker or teacher of had Lampung. Their help is especially valuable.</li>
</ul>

<h2 id="kode-etik">Code of conduct</h2>
<p class="cdoc__p">This project is open to anyone who wants to help make public services easier to use. We expect every participant to:</p>
<ul class="cdoc__list">
  <li>Be polite and respect others, whatever their background, ability, religion, ethnicity, gender or level of experience.</li>
  <li>Criticize ideas, not people, and take feedback with an open mind.</li>
  <li>Never harass or insult anyone, or share anyone's personal data.</li>
  <li>Never use the project for political campaigns or to speak in the name of a government agency.</li>
</ul>
<p class="cdoc__p">If you experience or see behavior that breaks these rules, email <a class="link" href="mailto:alif@kartadinata.app">alif@kartadinata.app</a>. Say what happened, when and where.</p>

<h2 id="kemitraan">Partnership</h2>
<p class="cdoc__p">If your team, campus, community or institution wants to use LDS in a project, test a service with citizens, or develop components together, contact <a class="link" href="mailto:alif@kartadinata.app">alif@kartadinata.app</a>. LDS stays an unofficial community project; a partnership does not make it the product of any agency.</p>
`,
  },
};
