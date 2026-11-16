export default {
  summary: 'Baris bertingkat yang bisa dibuka dan ditutup: folder dan berkas, bab dan subbab. Setiap induk adalah tombol dengan `aria-expanded`; anak-anaknya terbuka dengan spring.',
  when: [
    'Hierarki yang dijelajahi orang: berkas layanan dalam folder, bidang dengan subbidang, peraturan dengan bab dan pasal.',
    'Panel samping untuk menavigasi struktur bertingkat sementara isinya tampil di kanan.',
  ],
  whenNot: [
    ['Daftar datar', 'list'],
    ['Bagian satu halaman yang terbuka di tempat', 'accordion'],
    ['Navigasi utama aplikasi, dengan kelompok', 'app-shell', 'App shell punya bagian bertingkat'],
    ['Tautan ke bagian di halaman yang sedang dibuka', 'outline'],
  ],
  where: 'Di kolom samping selebar 240 sampai 320 px di samping isi (sidebar [app shell](app-shell) atau [resizable split](resizable-split)), atau selebar penuh di ponsel sebagai halaman tersendiri. Baris setinggi 32 px, sengaja dibuat padat.',
  anatomy: [
    ['.tree', 'Wajib. Kolom dengan jarak 1 px antar baris, teks 14 px.'],
    ['button.tree__row[aria-expanded][aria-controls]', 'Baris induk: chevron (`.tree__chev`, `chevron_right`), ikon, dan label. Chevron berputar 90 derajat saat terbuka.'],
    ['.tree__row (leaf)', 'Ujung: `<button>` atau `<a>` dengan ikon dan label. `.is-selected` untuk yang sedang dibuka.'],
    ['.tree__kids(.is-open) > div', 'Wajib untuk induk. Anak-anaknya, menjorok 22 px, terbuka lewat baris grid. `id`-nya cocok dengan `aria-controls`.'],
  ],
  examples: [
    {
      title: 'Berkas layanan',
      desc: 'Buka dan tutup folder. Berkas terpilih berada di tint aksen.',
      html: `<nav class="tree" aria-label="Berkas layanan" style="max-width: 300px;">
  <button class="tree__row" aria-expanded="true" aria-controls="tk1"><span class="ic tree__chev" aria-hidden="true">chevron_right</span><span class="ic" aria-hidden="true">folder_open</span>Izin usaha mikro</button>
  <div class="tree__kids is-open" id="tk1"><div>
    <a class="tree__row is-selected" href="#syllabus" aria-current="page"><span class="ic" aria-hidden="true">description</span>Persyaratan</a>
    <a class="tree__row" href="#slides"><span class="ic" aria-hidden="true">description</span>Alur pengajuan</a>
  </div></div>
  <button class="tree__row" aria-expanded="false" aria-controls="tk2"><span class="ic tree__chev" aria-hidden="true">chevron_right</span><span class="ic" aria-hidden="true">folder</span>Persetujuan bangunan gedung</button>
  <div class="tree__kids" id="tk2"><div>
    <a class="tree__row" href="#reading"><span class="ic" aria-hidden="true">description</span>Daftar dokumen</a>
    <a class="tree__row" href="#quiz"><span class="ic" aria-hidden="true">assignment</span>Formulir permohonan</a>
  </div></div>
</nav>`,
    },
  ],
  states: [
    ['closed / open', '`aria-expanded` pada baris induk dan `.is-open` pada `.tree__kids`-nya; chevron berputar 90 derajat.'],
    ['selected', '`.is-selected` (tint aksen) ditambah `aria-current="page"` pada tautan.'],
    ['hover', '`--bg-tint` pada baris.'],
  ],
  motion: [
    'Anak-anak terbuka lewat `grid-template-rows` dari 0fr ke 1fr dengan `--spring-smooth` (`--d-smooth`, 560 ms); chevron berputar dengan spring yang sama. Keduanya transition, jadi bisa berbalik di tengah jalan.',
    'Reduced motion: perubahan linear 120 ms.',
  ],
  a11y: [
    'Bila dibangun seperti di atas, ini adalah kumpulan tombol disclosure dan tautan di dalam `<nav>`: Tab berpindah antar baris, Enter atau Space membuka folder. Inilah pola yang didukung.',
    'Pakai `role="tree"` dan `role="treeitem"` hanya bila Anda juga menerapkan model keyboard tree (tombol panah berpindah dan membuka, satu tab stop); `lds.js` tidak menyediakannya.',
    'Anak yang tertutup tetap bisa difokus; pasang `inert` pada `.tree__kids` yang tertutup bila berisi tautan, agar Tab melewatinya.',
    'Ikon diberi `aria-hidden="true"`; labelnya menjadi nama.',
  ],
  do: [
    'Buat label singkat; kedalamannya sudah memberi konteks.',
    'Buka cabang yang berisi butir yang sedang dibuka.',
    'Batasi kedalaman sampai tiga tingkat.',
  ],
  dont: [
    'Memakai tree untuk daftar datar.',
    'Menambahkan `role="tree"` tanpa perilaku tombol panah.',
    'Menaruh aksi di setiap baris; pakai [context menu](context-menu).',
  ],
  js: '`init()` memasang setiap `.tree__row[aria-controls]` seperti tombol accordion: klik membalik `aria-expanded` dan mengganti `.is-open` pada `.tree__kids` yang dikendalikannya. Pemilihan adalah logika aplikasi.',
};
