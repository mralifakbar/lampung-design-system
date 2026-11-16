// Designer guide: where the design sources live, fonts, the identity and how to hand off.
export default {
  slug: 'desainer',
  order: 7,
  icon: 'palette',
  id: {
    title: 'Untuk desainer',
    nav: 'Untuk desainer',
    lede: 'Tempat sumber desain LDS, font yang perlu dipasang, tujuh keputusan yang membentuk tampilannya, dan cara menyerahkan desain ke developer tanpa salah tafsir.',
    body: `
<h2 id="sumber">Sumber desain</h2>
<p class="cdoc__p">Semua nilai visual LDS berasal dari satu berkas. Bila nilai di gambar desain Anda berbeda dari berkas ini, berkas inilah yang benar.</p>
<div class="link-grid">
  <a class="link-card" href="{{root}}tokens/tokens.json"><span class="link-card__eyebrow">Token</span><span class="link-card__title">tokens/tokens.json</span><span class="link-card__body">Warna terang dan gelap, bayangan, tipografi, jarak, radius, ukuran dan gerak.</span></a>
  <a class="link-card" href="{{docs}}index.html#/color"><span class="link-card__eyebrow">Papan</span><span class="link-card__title">Warna</span><span class="link-card__body">Permukaan, teks, aksen, emas siger dan warna status, dengan rasio kontrasnya.</span></a>
  <a class="link-card" href="{{docs}}index.html#/typography"><span class="link-card__eyebrow">Papan</span><span class="link-card__title">Tipografi</span><span class="link-card__body">Skala huruf dengan ukuran, tebal dan jarak huruf tiap gaya.</span></a>
  <a class="link-card" href="{{comp}}icon.html"><span class="link-card__eyebrow">Ikon</span><span class="link-card__title">Daftar ikon</span><span class="link-card__body">Nama ikon yang tersedia. Hanya nama di icons/icons.json yang tampil.</span></a>
  <a class="link-card" href="{{comp}}aksara.html"><span class="link-card__eyebrow">Aksara</span><span class="link-card__title">Aksara Lampung</span><span class="link-card__body">Glif SVG di aksara/glyphs dan sprite aksara/lds-aksara.svg.</span></a>
</div>
<p class="cdoc__p">Glif aksara Lampung adalah gambar asli untuk sistem ini, satu berkas SVG per huruf dan tanda di folder <code class="code">aksara/glyphs/</code>, digambar di grid 100 x 100 dengan garis 8 dan ujung bulat. Untuk memakai semuanya sekaligus, ambil sprite <a class="link" href="{{root}}aksara/lds-aksara.svg">aksara/lds-aksara.svg</a>. Daftar nama ikon ada di <a class="link" href="{{root}}icons/icons.json">icons/icons.json</a>.</p>

<h2 id="font">Font yang perlu dipasang</h2>
<p class="cdoc__p">Pasang dua keluarga huruf ini di komputer Anda. Keduanya berlisensi SIL Open Font License (OFL) dan tersedia gratis di Google Fonts.</p>
<div class="table-box"><table class="table table--wrap">
  <thead><tr><th>Font</th><th>Tebal yang dipakai</th><th>Untuk</th></tr></thead>
  <tbody>
    <tr><td>Geist</td><td>400, 500, 600 (700 hanya untuk judul besar di ponsel)</td><td>Semua teks antarmuka</td></tr>
    <tr><td>Geist Mono</td><td>400, 500</td><td>Kode, nomor tiket, nilai teknis</td></tr>
  </tbody>
</table></div>
<p class="cdoc__p">Ukuran, tebal dan jarak huruf berubah bersamaan. Teks besar dirapatkan (minus 0,03 em pada 56 px), teks kecil dilonggarkan (plus 0,01 em pada 12 px). Salin nilai dari papan tipografi, jangan mengira-ngira.</p>

<h2 id="identitas">Tujuh keputusan identitas</h2>
<ul class="cdoc__list">
  <li><strong>Kanvas putih.</strong> Halaman berlatar putih bersih. Kelompok konten (kartu, daftar) duduk di atas isian abu kehijauan yang tenang, tanpa bayangan. Jangan menaruh isian di atas isian.</li>
  <li><strong>Satu aksen.</strong> Hijau Lampung (<code class="code">--accent</code>) hanya untuk tindakan utama, pilihan aktif dan tautan. Bila satu layar punya tiga benda hijau, dua di antaranya keliru.</li>
  <li><strong>Emas untuk identitas, bukan tindakan.</strong> Emas siger untuk hiasan, pita aksara, lencana identitas dan sorotan. Tidak pernah untuk tombol, tautan atau pilihan.</li>
  <li><strong>Bayangan hanya untuk yang melayang.</strong> Menu, popover, dialog, sheet, toast dan tombol aksi mengambang. Konten yang diam tidak berbayang.</li>
  <li><strong>Blur hanya di tempat konten bergulir di bawahnya.</strong> Bilah navigasi dan bilah tab. Tidak di kartu, tidak bertumpuk.</li>
  <li><strong>Huruf bergerak sebagai satu set.</strong> Geist dengan tiga tebal; ukuran, tebal dan jarak huruf berubah bersama.</li>
  <li><strong>Gerak tenang dan bisa disela.</strong> Masuk dengan pegas yang tidak memantul, keluar lebih cepat, dan setiap transisi bisa dihentikan di tengah jalan. Pantulan hanya muncul setelah gerakan sentak.</li>
</ul>

<h2 id="hijau-emas">Cerita hijau dan emas</h2>
<p class="cdoc__p">Hijau Lampung (#0B6E4F) terinspirasi dari hijau pada lambang provinsi. Emas siger (#C9952B) terinspirasi dari emas mahkota siger dan benang emas kain tapis. Keduanya adalah inspirasi, bukan lambang resmi. LDS adalah proyek komunitas yang tidak resmi; jangan memakai lambang daerah, logo pemerintah daerah atau nama instansi nyata seolah-olah sistem ini milik mereka.</p>
<p class="cdoc__p">Pembagian perannya tegas: hijau mengajak bertindak, emas menandai jati diri. Bila emas harus dibaca sebagai teks, pakai <code class="code">--gold-text</code> yang lebih gelap di tema terang, karena emas biasa di atas putih tidak cukup kontras.</p>

<h2 id="serah-terima">Serah terima ke developer</h2>
<ul class="cdoc__list">
  <li><strong>Pakai nama komponen dari dokumentasi.</strong> Tulis "Tombol utama", "Sheet", "Kolom teks" sesuai nama halaman <a class="link" href="{{comp}}index.html">Komponen</a>, bukan nama buatan sendiri. Developer langsung tahu markup mana yang dipakai.</li>
  <li><strong>Pakai nama token, bukan hex.</strong> Tulis <code class="code">--text-subtle</code> atau <code class="code">--r-lg</code>, bukan #56615C atau 16 px. Nama token otomatis benar di tema gelap; hex tidak.</li>
  <li><strong>Gambar keempat status.</strong> Untuk setiap tampilan data: memuat, kosong, galat dan berisi. Tulis juga teks untuk tiap status.</li>
  <li><strong>Tunjukkan tema gelap dan layar 375 px</strong> untuk layar yang penting, atau setidaknya tandai bagian yang perlu diperiksa.</li>
  <li><strong>Bila komponen yang dibutuhkan belum ada,</strong> jangan membuat tampilan khusus untuk satu halaman. Usulkan komponen baru ke sistem (lihat <a class="link" href="{{guide}}kontribusi.html">Kontribusi</a>).</li>
</ul>

<h2 id="figma">Berkas Figma</h2>
<p class="cdoc__p">Saat ini belum ada berkas Figma resmi untuk LDS. Sumber kebenaran adalah token dan dokumentasi ini. Bila Anda menyusun pustaka Figma yang setia pada token dan komponen, kontribusi Anda sangat diterima; buka isu di GitHub agar bisa dibahas bersama sebelum dibagikan.</p>
`,
  },
  en: {
    title: 'For designers',
    nav: 'For designers',
    lede: 'Where the LDS design sources live, which fonts to install, the seven decisions behind the look, and how to hand a design to developers without it getting lost in translation.',
    body: `
<h2 id="sumber">Design sources</h2>
<p class="cdoc__p">Every visual value in LDS comes from one file. When a value in your design differs from this file, the file is right.</p>
<div class="link-grid">
  <a class="link-card" href="{{root}}tokens/tokens.json"><span class="link-card__eyebrow">Tokens</span><span class="link-card__title">tokens/tokens.json</span><span class="link-card__body">Light and dark colors, shadows, type, space, radius, sizes and motion.</span></a>
  <a class="link-card" href="{{docs}}en/index.html#/color"><span class="link-card__eyebrow">Board</span><span class="link-card__title">Color</span><span class="link-card__body">Surfaces, text, accent, siger gold and status colors, with their contrast ratios.</span></a>
  <a class="link-card" href="{{docs}}en/index.html#/typography"><span class="link-card__eyebrow">Board</span><span class="link-card__title">Typography</span><span class="link-card__body">The type scale with the size, weight and tracking of each style.</span></a>
  <a class="link-card" href="{{comp}}icon.html"><span class="link-card__eyebrow">Icons</span><span class="link-card__title">Icon list</span><span class="link-card__body">The icon names available. Only names in icons/icons.json render.</span></a>
  <a class="link-card" href="{{comp}}aksara.html"><span class="link-card__eyebrow">Aksara</span><span class="link-card__title">Aksara Lampung</span><span class="link-card__body">SVG glyphs in aksara/glyphs and the sprite aksara/lds-aksara.svg.</span></a>
</div>
<p class="cdoc__p">The aksara Lampung glyphs are original drawings made for this system, one SVG file per letter and sign in the <code class="code">aksara/glyphs/</code> folder, drawn on a 100 by 100 grid with a stroke of 8 and round caps. To use them all at once, take the sprite <a class="link" href="{{root}}aksara/lds-aksara.svg">aksara/lds-aksara.svg</a>. The list of icon names is in <a class="link" href="{{root}}icons/icons.json">icons/icons.json</a>.</p>

<h2 id="font">Fonts to install</h2>
<p class="cdoc__p">Install these two families on your computer. Both are licensed under the SIL Open Font License (OFL) and are free on Google Fonts.</p>
<div class="table-box"><table class="table table--wrap">
  <thead><tr><th>Font</th><th>Weights used</th><th>For</th></tr></thead>
  <tbody>
    <tr><td>Geist</td><td>400, 500, 600 (700 only for the large phone title)</td><td>All interface text</td></tr>
    <tr><td>Geist Mono</td><td>400, 500</td><td>Code, ticket numbers, technical values</td></tr>
  </tbody>
</table></div>
<p class="cdoc__p">Size, weight and tracking change together. Large text tightens (minus 0.03 em at 56 px), small text opens up (plus 0.01 em at 12 px). Copy the values from the typography board instead of estimating them.</p>

<h2 id="identitas">The seven identity decisions</h2>
<ul class="cdoc__list">
  <li><strong>White canvas.</strong> The page is plain white. Groups of content (cards, lists) sit on a quiet green-gray fill, with no shadow. Never put a fill on a fill.</li>
  <li><strong>One accent.</strong> Lampung green (<code class="code">--accent</code>) is only for the main action, the current selection and links. If a screen has three green things, two of them are wrong.</li>
  <li><strong>Gold is identity, not action.</strong> Siger gold is for ornament, the aksara band, identity badges and highlights. Never for a button, a link or a selection.</li>
  <li><strong>Shadows only on what floats.</strong> Menus, popovers, dialogs, sheets, toasts and the floating action button. Resting content casts no shadow.</li>
  <li><strong>Blur only where content scrolls under it.</strong> The navigation bar and the tab bar. Not on cards, never stacked.</li>
  <li><strong>Type moves as a set.</strong> Geist in three weights; size, weight and tracking change together.</li>
  <li><strong>Motion is calm and can be interrupted.</strong> Things enter on a spring that does not bounce, leave faster, and every transition can be stopped halfway. Bounce appears only after a flick.</li>
</ul>

<h2 id="hijau-emas">The green and gold story</h2>
<p class="cdoc__p">Lampung green (#0B6E4F) is inspired by the green of the provincial emblem. Siger gold (#C9952B) is inspired by the gold of the siger crown and the gold thread of tapis cloth. Both are inspiration, not official insignia. LDS is an unofficial community project; never use the regional coat of arms, a regional government logo or the name of a real agency as if this system were theirs.</p>
<p class="cdoc__p">The roles are strict: green invites action, gold marks identity. When gold must be read as text, use <code class="code">--gold-text</code>, which is darker in the light theme, because plain gold on white does not have enough contrast.</p>

<h2 id="serah-terima">Handing off to developers</h2>
<ul class="cdoc__list">
  <li><strong>Use component names from the docs.</strong> Write "Primary button", "Sheet", "Text field" as named on the <a class="link" href="{{comp}}index.html">Components</a> pages, not names of your own. Developers then know which markup to use.</li>
  <li><strong>Use token names, not hex.</strong> Write <code class="code">--text-subtle</code> or <code class="code">--r-lg</code>, not #56615C or 16 px. A token name is right in the dark theme automatically; a hex value is not.</li>
  <li><strong>Draw all four states.</strong> For every data view: loading, empty, error and loaded. Write the copy for each state too.</li>
  <li><strong>Show the dark theme and a 375 px screen</strong> for the important screens, or at least mark what needs checking.</li>
  <li><strong>When the component you need does not exist yet,</strong> do not design a one-off look for one page. Propose a new component for the system (see <a class="link" href="{{guide}}kontribusi.html">Contributing</a>).</li>
</ul>

<h2 id="figma">Figma file</h2>
<p class="cdoc__p">There is no official Figma file for LDS yet. The source of truth is the tokens and this documentation. If you build a Figma library that stays faithful to the tokens and components, your contribution is very welcome; open an issue on GitHub so it can be discussed before it is shared.</p>
`,
  },
};
