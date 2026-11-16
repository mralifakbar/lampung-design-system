export default {
  summary: 'Tombol nomor halaman di bawah daftar atau tabel yang panjang. Tampilkan halaman pertama, halaman terakhir, dan tetangga halaman saat ini; celah di antaranya menjadi elipsis.',
  when: [
    'Tabel atau daftar data yang terlalu panjang untuk satu halaman dan orang perlu menuju halaman tertentu atau kembali ke sana: permohonan, tagihan, laporan warga.',
    'Totalnya diketahui, sehingga "Halaman 5 dari 12" jujur.',
  ],
  whenNot: [
    ['Umpan yang dibaca dari atas ke bawah', 'show-more', 'Muat kelompok berikutnya di tempat'],
    ['Beberapa item tambahan di bawah daftar pendek', 'show-more'],
    ['Berpindah melalui urutan layar yang tetap', 'steps'],
    ['Menggeser di antara beberapa kartu', 'carousel'],
  ],
  where: 'Tepat di bawah tabel atau daftar yang dibaginya, rata kanan, dengan "Halaman 5 dari 12" (atau "Menampilkan 81 sampai 100 dari 236") di kiri baris yang sama. Di ponsel, sisakan hanya sebelumnya, nomor saat ini, dan berikutnya.',
  anatomy: [
    ['nav[aria-label="Pagination"]', 'Wajib. Landmark yang membungkus baris.'],
    ['.pager', 'Wajib. Baris tombol, berjarak 4 px.'],
    ['.pager__btn', 'Wajib. Tombol (atau tautan) halaman 36 px. `aria-current="page"` menandai halaman saat ini; `disabled` pada sebelumnya di halaman 1 dan pada berikutnya di halaman terakhir.'],
    ['.pager__gap', 'Elipsis `aria-hidden` di tempat halaman dilewati.'],
  ],
  examples: [
    {
      title: 'Di bawah tabel',
      desc: 'Halaman 5 dari 12: pertama, terakhir, dan tetangga halaman saat ini, dengan celah di antaranya.',
      html: `<nav class="cluster" style="justify-content: space-between;" aria-label="Paginasi">
  <span class="section__sub">Halaman 5 dari 12</span>
  <div class="pager">
    <button class="pager__btn" aria-label="Halaman sebelumnya"><span class="ic" aria-hidden="true">chevron_left</span></button>
    <button class="pager__btn" aria-label="Halaman 1">1</button>
    <span class="pager__gap" aria-hidden="true">…</span>
    <button class="pager__btn" aria-label="Halaman 4">4</button>
    <button class="pager__btn" aria-label="Halaman 5" aria-current="page">5</button>
    <button class="pager__btn" aria-label="Halaman 6">6</button>
    <span class="pager__gap" aria-hidden="true">…</span>
    <button class="pager__btn" aria-label="Halaman 12">12</button>
    <button class="pager__btn" aria-label="Halaman berikutnya"><span class="ic" aria-hidden="true">chevron_right</span></button>
  </div>
</nav>`,
    },
    {
      title: 'Halaman pertama',
      desc: 'Tombol sebelumnya nonaktif di halaman 1; dengan sedikit halaman tidak ada celah.',
      html: `<nav aria-label="Paginasi">
  <div class="pager">
    <button class="pager__btn" aria-label="Halaman sebelumnya" disabled><span class="ic" aria-hidden="true">chevron_left</span></button>
    <button class="pager__btn" aria-label="Halaman 1" aria-current="page">1</button>
    <button class="pager__btn" aria-label="Halaman 2">2</button>
    <button class="pager__btn" aria-label="Halaman 3">3</button>
    <button class="pager__btn" aria-label="Halaman berikutnya"><span class="ic" aria-hidden="true">chevron_right</span></button>
  </div>
</nav>`,
    },
  ],
  states: [
    ['hover', 'Tint kuat di belakang angka.'],
    [':active', 'Mengecil ke 0,92 lalu memantul kembali.'],
    ['aria-current="page"', 'Isian terbalik (warna teks tegas sebagai latar), ketebalan 600.'],
    ['disabled', 'Teks samar, tidak bisa diklik.'],
  ],
  motion: [
    'Tekan: `scale(0.92)` saat `:active`, kembali dengan `--spring-snappy` selama `--d-snappy` (360 ms). Warna dan latar berubah halus selama `--d-fast` (160 ms).',
    'Saat halaman berganti, gulir daftar kembali ke atas dan ganti barisnya di tempat; jangan menggeser halaman ke samping.',
  ],
  a11y: [
    '`<nav aria-label="Pagination">` membungkus baris; setiap tombol nomor diberi `aria-label="Page 5"` (dalam bahasa halaman, misalnya "Halaman 5"), yang aktif diberi `aria-current="page"`.',
    'Sebelumnya dan berikutnya hanya berupa ikon, jadi butuh `aria-label`.',
    'Setelah berganti halaman, pindahkan fokus ke atas daftar (atau heading-nya) agar pengguna keyboard tidak tertinggal di bawah.',
    'Pakai `<a href="?page=6" class="pager__btn">` jika setiap halaman punya URL sendiri.',
  ],
  do: [
    'Pertahankan halaman pertama, terakhir, dan tetangga halaman saat ini.',
    'Tuliskan posisi orang dengan kata-kata di sebelahnya ("Halaman 5 dari 12").',
    'Masukkan nomor halaman ke URL agar tombol kembali dan berbagi tautan berfungsi.',
  ],
  dont: [
    'Menampilkan semua nomor halaman jika lebih dari tujuh halaman.',
    'Menyembunyikan sebelumnya dan berikutnya di ujung; nonaktifkan saja.',
    'Memakai paginasi untuk daftar di bawah 50 item; tampilkan semua atau pakai show more.',
  ],
};
