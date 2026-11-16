export default {
  summary: 'Daftar "Di halaman ini" berisi heading dari satu halaman panjang, dengan garis tinta yang mengikuti bagian yang sedang terlihat. Daftar di sebelah kanan halaman ini adalah salah satunya.',
  when: [
    'Halaman panjang dengan empat bagian atau lebih yang sering dilompati: dokumentasi, panduan layanan, peraturan, laporan panjang.',
    'Layar lebar yang punya ruang untuk kolom ketiga di samping konten.',
  ],
  whenNot: [
    ['Berpindah antarhalaman aplikasi', 'app-shell'],
    ['Daftar bagian yang masing-masing mengganti konten', 'sidebar'],
    ['Bagian sejajar yang hanya tampil satu per satu', 'tabs'],
    ['Halaman pendek dengan dua atau tiga bagian', 'sections', 'Cukup andalkan heading'],
  ],
  where: 'Kolom sticky di kanan konten pada layar lebar (sekitar 200 sampai 220 px), dimulai sejajar dengan judul halaman. Sembunyikan di bawah sekitar 1100 px; di ponsel heading halaman sudah cukup, atau taruh tautan yang sama di atas halaman.',
  anatomy: [
    ['nav.toc[data-lds-toc]', 'Wajib. Daftar dengan `aria-label="On this page"` (dalam bahasa halaman, misalnya "Di halaman ini"); rel 1,5 px di sisi kirinya.'],
    ['.toc__ink', 'Garis tegas 1,5 px di rel yang bergeser ke tautan aktif; anak pertama, `aria-hidden`.'],
    ['a[href="#id"]', 'Wajib. Satu tautan per id heading bagian. `aria-current="true"` menandai bagian yang sedang terlihat.'],
  ],
  examples: [
    {
      title: 'Mengikuti bagian yang terlihat',
      desc: 'Gulir teks di kanan atau pilih tautan: tinta bergeser ke bagian yang paling dekat dengan atas jendela.',
      html: `<div class="split-2" style="--side: 180px; --gap: 32px;">
  <nav class="toc" data-lds-toc aria-label="Di halaman ini">
    <span class="toc__ink" aria-hidden="true"></span>
    <a href="#ol-intro">Pendahuluan</a>
    <a href="#ol-grading">Persyaratan</a>
    <a href="#ol-hours">Jam layanan</a>
    <a href="#ol-policies">Ketentuan</a>
  </nav>
  <div class="docs-scroll stack" style="--gap: 32px; height: 240px;">
    <section class="section" id="ol-intro"><div class="section__head"><h3 class="section__title-sm">Pendahuluan</h3><p class="section__sub">Izin usaha mikro mencakup pendaftaran, verifikasi dokumen, survei lokasi, dan penerbitan izin dalam empat belas hari kerja.</p></div></section>
    <section class="section" id="ol-grading"><div class="section__head"><h3 class="section__title-sm">Persyaratan</h3><p class="section__sub">KTP pemilik, surat keterangan domisili usaha, dan foto tempat usaha. Berkas yang kurang dikembalikan dalam 2 hari kerja.</p></div></section>
    <section class="section" id="ol-hours"><div class="section__head"><h3 class="section__title-sm">Jam layanan</h3><p class="section__sub">Selasa 13.00 sampai 15.00 di loket 2, lantai dasar, atau dengan janji temu.</p></div></section>
    <section class="section" id="ol-policies" style="padding-bottom: 160px;"><div class="section__head"><h3 class="section__title-sm">Ketentuan</h3><p class="section__sub">Satu permohonan untuk satu tempat usaha, kecuali panduan menyebutkan lain.</p></div></section>
  </div>
</div>`,
      code: `<nav class="toc" data-lds-toc aria-label="Di halaman ini">
  <span class="toc__ink" aria-hidden="true"></span>
  <a href="#intro">Pendahuluan</a>
  <a href="#grading">Persyaratan</a>
  <a href="#office-hours">Jam layanan</a>
</nav>
<!-- later in the page -->
<h2 id="intro">Pendahuluan</h2> …`,
    },
    {
      title: 'Status statis',
      desc: 'Daftar yang sama tanpa skrip, untuk halaman yang dirender server dan sudah tahu bagian aktifnya.',
      html: `<nav class="toc" aria-label="Di halaman ini" style="width: 200px;">
  <a href="#ol2" aria-current="true">Penggunaan</a>
  <a href="#ol2">Contoh</a>
  <a href="#ol2">Aksesibilitas</a>
</nav>`,
    },
  ],
  states: [
    ['aria-current="true"', 'Teks tegas dengan ketebalan 500; tinta berada di sampingnya.'],
    ['hover', 'Teks menggelap menjadi tegas selama `--d-fast`.'],
  ],
  motion: [
    'Tinta: bergeser dan berubah ukuran ke tautan aktif dengan `--spring-smooth` selama `--d-smooth` (560 ms), sehingga gulir cepat melewati beberapa bagian terbaca sebagai satu luncuran.',
    'Hanya satu hal yang bergerak; tautan berganti warna, tidak bergeser atau membesar.',
    'Reduced motion: tinta bergerak dalam 120 ms linear. Pakai `scroll-behavior: smooth` di halaman hanya di bawah `prefers-reduced-motion: no-preference`.',
  ],
  a11y: [
    '`<nav aria-label="On this page">` (dalam bahasa halaman) dengan tautan biasa ke id heading, sesuai urutan dokumen.',
    '`aria-current="true"` (bukan `page`) menandai bagian yang terlihat, karena halamannya sendiri tidak berganti.',
    'Beri heading `scroll-margin-top` setinggi header sticky agar lompatan tidak menutupi heading.',
  ],
  do: [
    'Tautkan hanya tingkat `<h2>`, atau paling banyak `<h2>` dan `<h3>`.',
    'Pakai teks heading yang persis sama sebagai teks tautan.',
  ],
  dont: [
    'Memakai outline sebagai navigasi utama.',
    'Menampilkannya di ponsel sebagai kolom tetap; ia merebut lebar yang dibutuhkan teks.',
  ],
  js: '`data-lds-toc` pada `.toc` mengamati elemen yang dituju tautan `a[href^="#"]` (dicari berdasarkan id di dokumen) dengan IntersectionObserver yang margin bawahnya -60 % tinggi jendela, menandai bagian terlihat paling atas dengan `aria-current="true"`, lalu menggeser dan mengatur ukuran `.toc__ink`. Bagian pertama ditandai saat inisialisasi.',
};
