export default {
  summary: 'Baris kartu mendatar yang berhenti tepat per kartu di bawah jari atau trackpad, dengan titik yang memanjang ke halaman aktif. Untuk menjelajah butir opsional, jangan untuk isi yang wajib dilihat semua orang.',
  when: [
    'Sebaris butir opsional yang serupa untuk dijelajahi: layanan unggulan, program pelatihan baru, acara mendatang.',
    'Bagian di ponsel yang, bila dibuat daftar vertikal, akan mendorong isi utama terlalu jauh ke bawah.',
  ],
  whenNot: [
    ['Beberapa butir yang semuanya penting', 'link-card', 'Tampilkan dalam grid'],
    ['Daftar yang dipindai atau dicari', 'list'],
    ['Gambar yang ingin dilihat dalam ukuran besar', 'lightbox'],
    ['Langkah-langkah sebuah proses', 'steps'],
    ['Tampilan setara dari isi yang sama', 'tabs'],
  ],
  where: 'Di bagian halaman di bawah judulnya, selebar kolom isi. Default tiga kartu per tampilan; di ponsel satu kartu sebaiknya mengintip di tepi agar orang tahu masih ada lagi. Titik diletakkan di tengah di bawah baris.',
  anatomy: [
    ['.carousel', 'Wajib. Baris flex dengan scroll snap, jarak 14 px, dan scrollbar tersembunyi. `role="region"`, `aria-label`, dan `tabindex="0"`.'],
    ['.carousel > *', 'Wajib. Setiap butir berhenti di awalnya; tiga butir muat per tampilan.'],
    ['.dots', 'Titik halaman opsional, di tengah.'],
    ['.dots > button[aria-current] > i', 'Satu tombol 24 px per halaman; titik aktif memanjang dari 6 ke 18 px.'],
  ],
  examples: [
    {
      title: 'Program pelatihan unggulan',
      desc: 'Gulir atau geser barisnya; baris berhenti per kartu. Titik melompat ke halaman dan mengikuti guliran.',
      html: `<div class="docs-col">
  <div class="carousel" role="region" aria-label="Program pelatihan unggulan" tabindex="0" onscroll="const p = Math.round(this.scrollLeft / Math.max(1, this.scrollWidth - this.clientWidth)); this.nextElementSibling.querySelectorAll('button').forEach((b, i) => b.setAttribute('aria-current', String(i === p)));">
    <div class="card card--fill"><div class="card__title">Pemasaran daring UMKM</div><div class="card__sub">6 sesi · 2 jam</div></div>
    <div class="card card--fill"><div class="card__title">Pembukuan sederhana</div><div class="card__sub">4 sesi · 90 menit</div></div>
    <div class="card card--fill"><div class="card__title">Pengemasan produk</div><div class="card__sub">3 sesi · 2 jam</div></div>
    <div class="card card--fill"><div class="card__title">Sertifikasi halal</div><div class="card__sub">2 sesi · 3 jam</div></div>
    <div class="card card--fill"><div class="card__title">Foto produk dengan ponsel</div><div class="card__sub">3 sesi · 90 menit</div></div>
    <div class="card card--fill"><div class="card__title">Izin usaha mikro</div><div class="card__sub">1 sesi · 2 jam</div></div>
  </div>
  <div class="dots" role="group" aria-label="Halaman">
    <button aria-label="Halaman 1" aria-current="true" onclick="const c = this.parentElement.previousElementSibling; c.scrollTo({ left: 0 });"><i></i></button>
    <button aria-label="Halaman 2" aria-current="false" onclick="const c = this.parentElement.previousElementSibling; c.scrollTo({ left: c.scrollWidth });"><i></i></button>
  </div>
</div>`,
      code: `<div class="carousel" role="region" aria-label="Program pelatihan unggulan" tabindex="0">
  <div class="card card--fill">…</div>
  <div class="card card--fill">…</div>
</div>
<div class="dots" role="group" aria-label="Halaman">
  <button aria-label="Halaman 1" aria-current="true"><i></i></button>
  <button aria-label="Halaman 2" aria-current="false"><i></i></button>
</div>
<!-- Your script: on dot click, carousel.scrollTo({ left: page * carousel.clientWidth });
     on carousel scroll, set aria-current on the dot for Math.round(scrollLeft / clientWidth). -->`,
    },
  ],
  states: [
    ['current page', '`aria-current="true"` pada titiknya: titik memanjang ke 18 px dengan tinta kuat.'],
  ],
  motion: [
    'Guliran bersifat bawaan, dengan `scroll-snap-type: x mandatory` dan guliran terprogram yang halus, sehingga momentum dan snap terasa seperti platformnya.',
    'Titik aktif memanjang dengan `--spring-smooth` (`--d-smooth`); warna berubah selama `--d-standard`.',
    'Tidak pernah ada autoplay.',
  ],
  a11y: [
    'Barisnya adalah `role="region"` yang bisa difokus dengan `aria-label`, sehingga pengguna keyboard bisa menggulirnya dengan tombol panah.',
    'Setiap butir tetap ada di DOM dan dalam urutan baca; butir yang tergulir keluar tetap bisa dicapai dengan Tab.',
    'Titik adalah tombol dengan `aria-label="Halaman n"` dan `aria-current`; sifatnya opsional, baris tetap berfungsi tanpanya.',
    'Tanpa autoplay, jadi tidak ada yang perlu dijeda.',
  ],
  do: [
    'Tampilkan sebagian kartu berikutnya agar orang tahu barisnya bisa digulir.',
    'Jaga ukuran dan jenis butir tetap sama.',
    'Beri tautan ke daftar lengkap ("Lihat semua program") untuk yang lebih suka begitu.',
  ],
  dont: [
    'Memakai autoplay atau putaran berulang.',
    'Menyembunyikan isi penting di slide berikutnya.',
    'Menambahkan tombol panah yang menutupi kartu di ponsel.',
  ],
  js: 'Tidak ada bawaan: guliran dan snap murni CSS. Menyelaraskan titik dengan posisi guliran dan menggulir saat titik diklik butuh beberapa baris skrip Anda sendiri (lihat kode di atas).',
};
