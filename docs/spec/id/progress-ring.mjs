export default {
  summary: 'Track melingkar dengan nilai digambar sebagai busur dan angka di tengah. Untuk tempat yang ringkas dan skor yang dinilai; sebutkan juga penilaiannya dengan kata-kata.',
  when: [
    'Skor atau tingkat penyelesaian yang harus muat dalam kotak: hasil tes di card, kehadiran di profil, target hari ini di layar beranda ponsel.',
    'Skor yang dinilai, saat warnanya menunjukkan lulus, nyaris atau tidak lulus (`ring--success|warning|danger`), selalu dengan kata-kata di sampingnya.',
    'Tugas dengan kemajuan di dalam tile atau baris list ketika bar terlalu lebar.',
  ],
  whenNot: [
    ['Ada ruang untuk garis, atau kemajuannya milik tugas yang panjang', 'progress-bar'],
    ['Tingkat atau kapasitas dalam segmen (penyimpanan, kekuatan)', 'meter'],
    ['Bagian dari keseluruhan lintas beberapa kategori', 'donut'],
    ['Angkanya sendiri yang penting, dalam deretan angka kunci', 'stat-row'],
    ['Tidak ada nilai terukur, hanya menunggu', 'spinner'],
  ],
  where: 'Di samping label yang diukurnya: di awal card, di baris list sebelum judul, di header hasil di samping keputusannya. Bawaan 64 px; 40 sampai 48 px di baris; jangan lebih besar dari 120 px (lebih dari itu [stat row](stat-row) atau grafik lebih mudah dibaca).',
  anatomy: [
    ['.ring', 'Wajib. Kotak 64 x 64. Atur `width` dan `height` secara inline untuk ukuran lain; ketebalan garis ikut berskala.'],
    ['svg[viewBox="0 0 64 64"]', 'Wajib. Diputar agar busur dimulai dari arah jam 12.'],
    ['circle.ring__track', 'Wajib. `cx="32" cy="32" r="27"`: track abu-abu penuh.'],
    ['circle.ring__val', 'Wajib. Lingkaran yang sama dengan `stroke-dasharray="169.6"` (keliling, 2 x pi x 27) dan `stroke-dashoffset="169.6 x (1 - value)"`.'],
    ['.ring__label', 'Angka opsional di tengah ring, angka tabular.'],
    ['.ring--success|warning|danger', 'Mewarnai busur untuk skor yang dinilai. Bawaannya aksen.'],
  ],
  examples: [
    {
      title: 'Skor dengan keputusan',
      desc: 'Warna mendukung kata-kata; tidak pernah menggantikannya.',
      html: `<div class="docs-row" style="gap: 28px;">
  <div class="docs-row"><div class="ring ring--success" role="img" aria-label="Skor 86 dari 100, lulus"><svg viewBox="0 0 64 64" aria-hidden="true"><circle class="ring__track" cx="32" cy="32" r="27"></circle><circle class="ring__val" cx="32" cy="32" r="27" stroke-dasharray="169.6" stroke-dashoffset="23.7"></circle></svg><span class="ring__label" aria-hidden="true">86</span></div><div><div class="card__title">Lulus</div><div class="card__sub">Nilai batas lulus 65</div></div></div>
  <div class="docs-row"><div class="ring ring--warning" role="img" aria-label="Skor 62 dari 100, sedikit di bawah batas lulus"><svg viewBox="0 0 64 64" aria-hidden="true"><circle class="ring__track" cx="32" cy="32" r="27"></circle><circle class="ring__val" cx="32" cy="32" r="27" stroke-dasharray="169.6" stroke-dashoffset="64.4"></circle></svg><span class="ring__label" aria-hidden="true">62</span></div><div><div class="card__title">Sedikit di bawah</div><div class="card__sub">Kurang 3 poin</div></div></div>
  <div class="docs-row"><div class="ring ring--danger" role="img" aria-label="Skor 38 dari 100, tidak lulus"><svg viewBox="0 0 64 64" aria-hidden="true"><circle class="ring__track" cx="32" cy="32" r="27"></circle><circle class="ring__val" cx="32" cy="32" r="27" stroke-dasharray="169.6" stroke-dashoffset="105.2"></circle></svg><span class="ring__label" aria-hidden="true">38</span></div><div><div class="card__title">Tidak lulus</div><div class="card__sub">Ujian ulang dibuka 2 Desember</div></div></div>
</div>`,
    },
    {
      title: 'Kemajuan tugas yang bergerak',
      desc: 'Busur bergerak halus ke setiap nilai baru. Tekan tombolnya.',
      html: `<div class="docs-row" style="gap: 16px;">
  <div class="ring" id="rg" role="progressbar" aria-label="Materi selesai minggu ini" aria-valuemin="0" aria-valuemax="100" aria-valuenow="40"><svg viewBox="0 0 64 64" aria-hidden="true"><circle class="ring__track" cx="32" cy="32" r="27"></circle><circle class="ring__val" cx="32" cy="32" r="27" stroke-dasharray="169.6" stroke-dashoffset="101.8"></circle></svg><span class="ring__label">40</span></div>
  <button class="btn btn--secondary btn--sm" onclick="const r = document.getElementById('rg'); const v = (Number(r.getAttribute('aria-valuenow')) + 25) % 125; r.setAttribute('aria-valuenow', v); r.querySelector('.ring__val').setAttribute('stroke-dashoffset', (169.6 * (1 - v / 100)).toFixed(1)); r.querySelector('.ring__label').textContent = v;">Tambah kemajuan</button>
</div>`,
      code: `<div class="ring" role="progressbar" aria-label="Materi selesai minggu ini" aria-valuemin="0" aria-valuemax="100" aria-valuenow="40">
  <svg viewBox="0 0 64 64" aria-hidden="true">
    <circle class="ring__track" cx="32" cy="32" r="27"></circle>
    <circle class="ring__val" cx="32" cy="32" r="27" stroke-dasharray="169.6" stroke-dashoffset="101.8"></circle>
  </svg>
  <span class="ring__label">40</span>
</div>`,
    },
    {
      title: 'Kecil, di baris list',
      desc: 'Pada 40 px, atur ukurannya secara inline dan kecilkan labelnya juga.',
      html: `<div class="list" style="max-width: 420px;">
  <div class="lrow"><div class="ring" style="width: 40px; height: 40px;" role="img" aria-label="75 persen selesai"><svg viewBox="0 0 64 64" aria-hidden="true"><circle class="ring__track" cx="32" cy="32" r="27"></circle><circle class="ring__val" cx="32" cy="32" r="27" stroke-dasharray="169.6" stroke-dashoffset="42.4"></circle></svg><span class="ring__label" style="font-size: 12px;" aria-hidden="true">75</span></div><div class="lrow__body"><div class="lrow__title">Pemahaman bacaan</div><div class="lrow__sub">15 dari 20 soal</div></div></div>
  <div class="lrow"><div class="ring" style="width: 40px; height: 40px;" role="img" aria-label="30 persen selesai"><svg viewBox="0 0 64 64" aria-hidden="true"><circle class="ring__track" cx="32" cy="32" r="27"></circle><circle class="ring__val" cx="32" cy="32" r="27" stroke-dasharray="169.6" stroke-dashoffset="118.7"></circle></svg><span class="ring__label" style="font-size: 12px;" aria-hidden="true">30</span></div><div class="lrow__body"><div class="lrow__title">Penalaran numerik</div><div class="lrow__sub">6 dari 20 soal</div></div></div>
</div>`,
    },
  ],
  variants: [
    ['ring', 'Busur aksen. Kemajuan tanpa penilaian.'],
    ['ring--success', 'Lulus, sesuai jalur.'],
    ['ring--warning', 'Nyaris, perlu perhatian.'],
    ['ring--danger', 'Gagal atau jauh tertinggal.'],
  ],
  states: [
    ['value', '`stroke-dashoffset` = 169.6 x (1 - value / max) pada `.ring__val`.'],
    ['empty', 'Offset 169.6: hanya track yang tampil. Tulis "Belum dimulai" di sampingnya.'],
    ['complete', 'Offset 0. Pertimbangkan `ring--success` dan satu kata ("Selesai").'],
  ],
  motion: [
    'Busur bergerak lewat `stroke-dashoffset` dengan `--ease-inout` selama `--d-considered` (480 ms), sebagai transition, jadi nilai baru berganti target dari posisi saat itu.',
    '`Ring` di React juga menghitung naik angkanya sekali selama 900 ms dengan ease-out cubic; dengan reduced motion nilainya langsung tampil.',
    'Dengan reduced motion perubahan busur menjadi perubahan linear 120 ms.',
  ],
  a11y: [
    'Skor adalah gambar dari sebuah angka: `role="img"` dengan `aria-label` yang menyebut angka dan keputusannya ("Skor 86 dari 100, lulus"), dan `aria-hidden` pada label yang terlihat.',
    'Kemajuan tugas langsung: `role="progressbar"` dengan `aria-valuemin`, `aria-valuemax`, `aria-valuenow` dan nama.',
    'SVG memakai `aria-hidden="true"`. Jangan biarkan warna ring menjadi satu-satunya sinyal; tulis keputusannya di samping.',
  ],
  do: [
    'Tulis keputusannya dengan kata-kata di samping ring berwarna.',
    'Isi label hanya dengan angka; letakkan satuan dan konteks di luar.',
    'Pakai r = 27 dan dasharray 169.6 agar setiap ring di produk tergambar sama.',
  ],
  dont: [
    'Memakai ring untuk beberapa kategori; pakai [donut](donut).',
    'Menjadikannya grafik utama lebih dari 120 px.',
    'Menaruh angka tiga digit di ring 40 px tanpa mengecilkan labelnya.',
  ],
  js: 'Tidak ada di HTML biasa: atur `stroke-dashoffset` dan label dari kode Anda.',
};
