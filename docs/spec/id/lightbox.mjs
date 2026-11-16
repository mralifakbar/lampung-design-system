const pic = (a, b, label) => `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'%3E%3Crect width='1200' height='800' fill='%23${a}'/%3E%3Ccircle cx='900' cy='220' r='120' fill='%23${b}'/%3E%3Cpath d='M0 640 L320 360 L560 560 L780 420 L1200 720 L1200 800 L0 800 Z' fill='%23${b}' opacity='0.75'/%3E%3Ctext x='60' y='110' font-family='sans-serif' font-size='56' fill='white'%3E${label}%3C/text%3E%3C/svg%3E`;
const enc = (s) => s.replace(/ /g, '%20');
const lib = enc(pic('1E3A8A', '60A5FA', 'Perpustakaan daerah'));
const lab = enc(pic('14532D', '4ADE80', 'Laboratorium puskesmas'));

export default {
  summary: 'Menampilkan satu gambar berukuran besar di atas halaman yang diredupkan: gambar tumbuh dari thumbnail-nya dan menyusut kembali ke sana. Berupa tautan di sekitar thumbnail, sehingga tanpa skrip pun tetap membuka gambar penuh.',
  when: [
    'Thumbnail foto, diagram, atau halaman pindaian yang perlu dilihat utuh: foto lokasi laporan, foto papan pengumuman, formulir yang dipindai.',
    'Galeri gambar yang masing-masing dibuka sendiri.',
  ],
  whenNot: [
    ['Menggeser sekumpulan slide di tempat', 'carousel'],
    ['Formulir, laporan, atau apa pun yang punya kontrol', 'modal'],
    ['Menampilkan gambar kecil beserta keterangannya di dalam alur', 'thumbnail'],
    ['Dokumen atau PDF yang dibaca', 'link', 'Tautkan dan biarkan browser yang membukanya'],
  ],
  where: 'Menutupi seluruh jendela (fixed, z-index 90), gambar di tengah dengan jarak 24 px di sekelilingnya dan paling tinggi setinggi jendela dikurangi 96 px; tombol tutup di kanan atas dan keterangan di bawah, keduanya bebas dari notch. Pemicunya tautan `.thumb` di mana saja dalam konten.',
  anatomy: [
    ['a.thumb[data-lds-lightbox]', 'Wajib. Tautan ke gambar penuh (`href`), dengan `data-caption` opsional. `--ratio` mengatur bentuk thumbnail (bawaan 4 / 3).'],
    ['a.thumb > img', 'Wajib. Thumbnail dengan teks `alt` yang bermakna; dipakai ulang untuk gambar besar.'],
    ['.lightbox', 'Dibuat oleh skrip: lapisan redup selebar jendela (`role="dialog"`, `aria-modal`).'],
    ['.lightbox__close', 'Dibuat oleh skrip: [icon button](icon-button) penutup, labelnya dari `data-close` (bawaan "Close").'],
    ['.lightbox__caption', 'Dibuat dari `data-caption`.'],
  ],
  examples: [
    {
      title: 'Foto fasilitas layanan',
      desc: 'Buka sebuah thumbnail: gambar tumbuh darinya. Escape, tombol tutup, atau klik di luar menyusutkannya kembali dan mengembalikan fokus ke thumbnail.',
      html: `<div class="auto-grid" style="--min: 180px; width: 100%;">
  <a class="thumb" href="${lib}" data-lds-lightbox data-caption="Ruang baca perpustakaan daerah, lantai dua"><img src="${lib}" alt="Ruang baca perpustakaan daerah"></a>
  <a class="thumb" href="${lab}" data-lds-lightbox data-caption="Laboratorium puskesmas, meja 4, sebelum pemeriksaan sampel pagi"><img src="${lab}" alt="Meja laboratorium puskesmas"></a>
</div>`,
      code: `<a class="thumb" href="/photos/library-large.jpg" data-lds-lightbox data-caption="Ruang baca perpustakaan daerah, lantai dua">
  <img src="/photos/library-small.jpg" alt="Ruang baca perpustakaan daerah">
</a>`,
    },
  ],
  states: [
    ['.lightbox.is-open', 'Scrim sudah muncul, gambar dalam ukuran penuh.'],
    ['a.thumb:hover', 'Gambar thumbnail membesar ke 1,03 di perangkat yang mendukung hover.'],
  ],
  motion: [
    'Buka: scrim muncul selama `--d-standard` (240 ms) dengan `--ease-enter`; gambar tumbuh dari persegi thumbnail yang persis ke ukuran penuhnya (FLIP dengan Web Animations API) selama 420 ms dengan kurva masuk `cubic-bezier(0.16, 1, 0.3, 1)`.',
    'Tutup: jalur yang sama kembali ke thumbnail dalam 220 ms dengan kurva keluar `cubic-bezier(0.7, 0, 0.84, 0)`; scrim memudar selama `--d-exit`. Lapisan dihapus saat gambar mendarat.',
    'Hover thumbnail: gambar membesar ke 1,03 dengan `--spring-smooth`.',
    'Reduced motion: tanpa tumbuh atau menyusut; gambar muncul dan hilang bersama efek pudar.',
  ],
  a11y: [
    'Pemicunya tautan asli ke gambar penuh, sehingga tetap berfungsi tanpa JavaScript dan di tab baru.',
    '`alt` thumbnail dipakai ulang untuk gambar besar; `data-caption` (atau `alt`) menjadi nama dialog.',
    'Saat dibuka, fokus pindah ke tombol tutup dan Tab tetap di sana; Escape atau klik di luar gambar menutupnya dan mengembalikan fokus ke thumbnail.',
  ],
  do: [
    'Beri setiap thumbnail teks `alt` yang bermakna dan keterangan sebagai konteks.',
    'Tautkan ke berkas yang lebih besar dari thumbnail.',
  ],
  dont: [
    'Membungkus gambar yang sudah tampil dalam ukuran penuh.',
    'Menaruh kontrol atau formulir di dalam lightbox.',
  ],
  js: '`data-lds-lightbox` pada `<a href>` di sekitar `<img>`: saat diklik, skrip membuat lapisan `.lightbox` di `<body>`, memutar animasi tumbuh dari thumbnail, memfokuskan tombol tutup, dan menutup saat Escape, tombol tutup, atau klik di luar gambar, sambil menyusut kembali dan mengembalikan fokus. Opsional `data-caption` dan `data-close` (label tombol tutup, misalnya "Tutup").',
};
