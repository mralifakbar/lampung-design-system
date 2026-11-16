const STAT = (i, label, value, sub) => `<div class="stat-row__item" data-lds-reveal style="--i: ${i}"><dt class="stat-row__label">${label}</dt><dd class="stat-row__value">${value}</dd>${sub ? `<span class="stat-row__sub">${sub}</span>` : ''}</div>`;

export default {
  summary: 'Gambar, angka kunci, dan ilustrasi memudar naik 4 px saat pertama kali masuk ke layar karena scroll, sekali saja, dan tidak pernah lagi. Teks isi, daftar, dan tabel tidak pernah dimunculkan dengan cara ini: orang harus bisa membaca dan mencari semuanya sekaligus.',
  when: [
    'Angka kunci di halaman hasil atau halaman depan ([stat row](stat-row)) yang masuk ke layar saat orang menggulir.',
    'Ilustrasi, foto, dan grafik di bagian bawah halaman yang panjang.',
    'Deretan pendek kartu atau gambar yang tiba bersamaan, dengan stagger 30 ms lewat `--i`.',
  ],
  whenNot: [
    ['Paragraf, daftar, tabel, formulir', 'prose', 'Semuanya cukup langsung ada. Memunculkan konten bacaan membuat orang menunggu untuk membaca.'],
    ['Butir yang tiba karena orang memintanya (hasil pencarian)', 'list-stagger'],
    ['Sesuatu yang terbuka karena tekanan', 'enter-and-exit'],
    ['Konten di layar pertama saat dimuat', 'motion-principles', 'Sudah terlihat: tampilkan seketika.'],
    ['Konten yang sedang dimuat dan belum ada', 'skeleton'],
  ],
  where: 'Pada elemen tunggal yang berupa gambar atau angka: `.stat-row__item`, `.thumb`, `.chart-card`, `.spotlight`, kartu di dalam `auto-grid`. Jangan pada section, seluruh halaman, atau kontainer teks.',
  examples: [
    {
      title: 'Angka kunci di halaman hasil',
      desc: 'Gulir di dalam kotak. Ketiga angka memudar naik bersamaan dengan jarak 30 ms saat masuk ke layar; gulir kembali dan angkanya tetap di tempat. Tekan Putar ulang untuk melihatnya lagi.',
      html: `<div class="docs-scroll fade-edges" data-lds-fade style="height: 300px;">
  <div class="prose" style="padding-bottom: 24px;">
    <h3>Laporan warga bulan Oktober</h3>
    <p>Bulan ini masuk 1.248 laporan dari 20 kecamatan. Gulir ke bawah untuk melihat perbandingannya dengan bulan lalu dan berapa yang sudah selesai ditangani.</p>
    <p>Laporan jalan rusak turun paling banyak. Laporan sampah masih mendekati batas waktu tanggap, jadi petugas kebersihan mendapat tambahan jadwal.</p>
    <p>Angka ini final setelah masa verifikasi berakhir hari Jumat.</p>
  </div>
  <div class="stat-row-wrap"><dl class="stat-row">
    ${STAT(0, 'Laporan masuk', '1.248', 'Naik 136 dari September')}
    ${STAT(1, 'Selesai ditangani', '1.031', '')}
    ${STAT(2, 'Tepat waktu', '82,6%', 'Target 80%')}
  </dl></div>
  <div style="height: 120px;"></div>
</div>`,
      code: `<div class="stat-row-wrap"><dl class="stat-row">
  <div class="stat-row__item" data-lds-reveal style="--i: 0">…</div>
  <div class="stat-row__item" data-lds-reveal style="--i: 1">…</div>
  <div class="stat-row__item" data-lds-reveal style="--i: 2">…</div>
</dl></div>
<script type="module">
  import { init } from 'lampung-design-system/js';
  init(); // memanggil observeReveal() jika halaman punya [data-lds-reveal]
</script>`,
    },
    {
      title: 'Gambar di bagian bawah panduan',
      desc: 'Foto dalam panduan layanan yang panjang memudar naik saat tiba; teks di sekitarnya sudah ada sejak awal.',
      html: `<div class="docs-scroll" style="height: 300px;">
  <div class="prose">
    <h3>Mengurus izin usaha di mal pelayanan publik</h3>
    <p>Ambil nomor antrean di mesin dekat pintu masuk. Bawa KTP, kartu keluarga, dan foto tempat usaha.</p>
    <p>Loket buka pukul 07.30 pada hari kerja. Ruang tunggu ada di lantai dua; konsultasi bisa dipesan seminggu sebelumnya.</p>
    <p>Pembayaran retribusi dilayani pukul 08.00 sampai 14.00 di loket sebelah gedung C.</p>
  </div>
  <div class="auto-grid" style="--min: 140px; margin-top: 24px;">
    <div class="thumb" data-lds-reveal style="--i: 0"></div>
    <div class="thumb" data-lds-reveal style="--i: 1"></div>
    <div class="thumb" data-lds-reveal style="--i: 2"></div>
  </div>
  <div style="height: 100px;"></div>
</div>`,
    },
  ],
  motion: [
    'Keadaan tersembunyi (hanya setelah JS menambahkan `.lds-reveal` ke `<html>`): `opacity: 0; transform: translateY(4px)`. Tampil (`[data-shown]`): opacity selama 240 ms dan transform selama 280 ms, keduanya dengan `--ease-standard`.',
    'Stagger: `transition-delay: min(var(--i), 3) × 30ms`. Butir keempat dan seterusnya berbagi 90 ms, sehingga satu deret selesai dalam kurang dari 400 ms.',
    'Pemicu: IntersectionObserver dengan margin bawah 6% dari viewport, threshold 0.01. Setiap elemen dimunculkan sekali lalu tidak diamati lagi; menggulir kembali ke atas tidak pernah menyembunyikannya.',
    'Tanpa kedipan saat dimuat: apa pun yang sudah berada dalam 95% tinggi viewport ditandai tampil sebelum kelasnya ditambahkan, sehingga layar pertama tidak pernah memudar.',
    'Reduced motion, tanpa JS, tanpa IntersectionObserver, dan saat dicetak: tidak ada yang disembunyikan; semuanya langsung tampil.',
  ],
  a11y: [
    'Elemen yang dimunculkan sudah ada di DOM dan bisa dibaca teknologi bantu sebelum tampil; hanya penggambarannya yang menunggu.',
    'Jangan pernah memunculkan dengan cara ini teks yang perlu dibaca orang atau kontrol yang perlu dipakai.',
    'Gerakannya 4 px dan sekali saja; tidak bisa memicu mabuk gerak, dan reduced motion tetap menghapusnya.',
  ],
  do: [
    'Munculkan gambar, angka, dan foto; biarkan konten bacaan apa adanya.',
    'Pakai `--i` untuk deret pendek, mulai dari 0.',
    'Panggil `observeReveal(root)` lagi (atau `init()`) setelah merender konten baru di aplikasi sisi klien.',
  ],
  dont: [
    'Memasang `data-lds-reveal` pada section, paragraf, baris daftar, atau baris tabel.',
    'Memakainya di layar pertama agar halaman terasa "hidup".',
    'Menyembunyikan konten dengan `opacity: 0` buatan sendiri sambil menunggu scroll; tanpa JS konten itu akan tetap tak terlihat.',
  ],
  js: '`init()` memanggil `observeReveal(document)` jika halaman berisi `[data-lds-reveal]`. `observeReveal(root)` menambahkan `.lds-reveal` ke `<html>`, menandai yang sudah terlihat, mengamati sisanya (dan markup baru di bawah `root`, lewat MutationObserver), memasang `data-shown` saat setiap elemen masuk, dan mengembalikan fungsi untuk berhenti. Fungsi ini tidak melakukan apa pun di bawah reduced motion.',
};
