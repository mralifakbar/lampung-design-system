const TOGGLE = "const open = this.getAttribute('aria-expanded') !== 'true'; this.setAttribute('aria-expanded', String(open)); document.getElementById(this.getAttribute('aria-controls')).classList.toggle('is-closed', !open);";

export default {
  summary: 'Tiga garis yang melipat menjadi ikon tutup saat tombolnya membuka menu, dan terbuka lagi saat menu ditutup: garis atas dan bawah bertemu lalu berputar 45 derajat, garis tengah mengecil hilang. Tombolnya tidak berpindah, jadi tempat yang sama membuka dan menutup.',
  when: [
    'Tombol yang membuka dan menutup navigasi situs di layar kecil: toggle [top nav](top-nav), toggle drawer [app shell](app-shell).',
    'Tombol apa pun yang membuka panel navigasi dan juga menutupnya dari tempat yang sama.',
  ],
  whenNot: [
    ['Menu aksi untuk sebuah item', 'dropdown-menu', 'Pakai `more_horiz` atau `more_vert`; ikon itu tidak berubah menjadi ikon tutup.'],
    ['Menutup dialog atau sheet', 'icon-button', 'Ikon `close` biasa.'],
    ['Dua ikon untuk dua status (putar, jeda)', 'icon-swap'],
    ['Membuka bagian di dalam halaman', 'height-expand'],
  ],
  where: 'Tepi awal bilah atas di ponsel (app shell), atau tepi akhir header situs (top nav). Selalu di dalam [tombol ikon](icon-button) yang membawa `aria-expanded`.',
  anatomy: [
    ['.burger', 'Wajib. 18 × 14 px, tiga garis `<i>` setebal 2 px. Harus menjadi anak langsung dari elemen yang punya `aria-expanded`.'],
    ['[aria-expanded="true"] > .burger', 'Keadaan terlipat: garis 1 dan 3 bertemu di tengah dan berputar ±45 derajat; garis 2 memudar dan mengecil.'],
  ],
  examples: [
    {
      title: 'Membuka dan menutup navigasi',
      desc: 'Tekan tombolnya: garis-garis melipat menjadi ikon tutup sementara tautan terbuka di bawahnya. Tekan lagi untuk membukanya kembali.',
      html: `<div style="max-width: 360px;">
  <div class="docs-row" style="justify-content: space-between;">
    <span class="card__title">Layanan Warga</span>
    <button class="icon-btn" aria-label="Menu" aria-expanded="false" aria-controls="mi-nav" onclick="${TOGGLE}"><span class="burger" aria-hidden="true"><i></i><i></i><i></i></span></button>
  </div>
  <div class="collapse is-closed" id="mi-nav"><div><nav class="list list--fill" aria-label="Utama" style="margin-top: 8px;">
    <a class="lrow" href="#" aria-current="page"><span class="lrow__body"><span class="lrow__title">Beranda</span></span></a>
    <a class="lrow" href="#"><span class="lrow__body"><span class="lrow__title">Layanan</span></span></a>
    <a class="lrow" href="#"><span class="lrow__body"><span class="lrow__title">Jadwal</span></span></a>
  </nav></div></div>
</div>`,
    },
    {
      title: 'Dengan label',
      desc: 'Bila ada ruang, satu kata di samping ikon membantu. Lipatannya tetap ada di tombol yang punya `aria-expanded`.',
      html: `<button class="btn btn--gray btn--md" aria-expanded="false" onclick="this.setAttribute('aria-expanded', String(this.getAttribute('aria-expanded') !== 'true'))"><span class="burger" aria-hidden="true"><i></i><i></i><i></i></span>Menu</button>`,
    },
  ],
  motion: [
    'Garis 1 dan 3: `top` bergeser ke 6 px dan `transform` berputar ±45 derajat dengan `--spring-snappy` (`--d-snappy`, 360 ms), bersamaan, jadi keduanya bersilang dalam satu gerakan.',
    'Garis 2: memudar selama `--d-fast` dan mengecil ke `scaleX(0.2)` dengan `--spring-snappy`.',
    'Hanya digerakkan oleh `aria-expanded`, jadi menutup dengan Escape, ketukan scrim, atau tautan yang diikuti juga melipatnya kembali, selama kodenya memperbarui atribut itu (app shell dan top nav melakukannya).',
    'Interupsi: memakai transisi, jadi tekan ganda yang cepat berbalik di tengah lipatan.',
    'Reduced motion: garis berubah dalam 120 ms tanpa spring.',
  ],
  a11y: [
    'Tombol punya `aria-expanded`, `aria-controls`, dan `aria-label` yang tetap ("Menu"); jangan ubah labelnya menjadi "Tutup" karena status terbuka sudah menyatakannya.',
    'Escape menutup menu dan mengembalikan fokus ke tombol ini.',
    'Garis-garisnya diberi `aria-hidden`.',
  ],
  do: [
    'Taruh `.burger` langsung di dalam tombol yang punya `aria-expanded`.',
    'Perbarui `aria-expanded` di setiap cara menu ditutup.',
  ],
  dont: [
    'Memakainya untuk aksi item atau untuk menutup dialog.',
    'Menukar dua ikon alih-alih melipat garis.',
    'Memindahkan tombol saat menu terbuka.',
  ],
  js: 'Hanya CSS, digerakkan oleh `aria-expanded`. `data-lds-shell-toggle` (app shell) dan `data-lds-topnav-toggle` (top nav) menjaga `aria-expanded` tetap sinkron untuk Anda.',
};
