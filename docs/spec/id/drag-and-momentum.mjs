export default {
  summary: 'Apa pun yang digerakkan jari mengikutinya persis, menahan dengan lembut saat melewati batas, dan saat dilepas menuju ke arah lemparannya: kecepatan saat dilepas diproyeksikan ke depan untuk menentukan hasilnya, lalu spring dengan sedikit overshoot menuntaskannya. Satu jentikan menghasilkan hal yang sama dengan seretan panjang.',
  when: [
    'Menyeret [sheet](sheet) ke bawah untuk menutupnya, atau menjentikkannya.',
    'Kenop yang diseret sepanjang lintasan untuk mengonfirmasi ([geser untuk konfirmasi](slide-to-confirm)).',
    'Baris daftar yang di-swipe ke samping untuk memunculkan atau menjalankan aksi ([aksi swipe](swipe-actions)).',
    'Pembatas yang diseret untuk mengubah ukuran dua panel ([panel terbagi](resizable-split)): langsung, 1:1, tanpa lemparan.',
  ],
  whenNot: [
    ['Ketukan atau tekanan biasa', 'press-feedback'],
    ['Memilih nilai pada lintasan', 'slider'],
    ['Menggulir deretan kartu', 'carousel'],
    ['Membuka panel dengan tombol', 'enter-and-exit'],
    ['Mengurutkan ulang butir dalam daftar', 'list', 'Sistem belum punya seret untuk mengurutkan; sediakan aksi Naikkan dan Turunkan.'],
  ],
  where: 'Pada pegangan yang bisa diseret: grabber dan header sheet (`[data-lds-drag]`), kenop geser, baris swipe, pegangan pengubah ukuran. Setiap gestur juga punya tombol atau tombol keyboard yang melakukan hal yang sama.',
  examples: [
    {
      title: 'Sheet yang bisa dilempar',
      desc: 'Buka sheet, lalu seret grabber-nya: sheet mengikuti 1:1 dan latar belakangnya makin terang. Tarik ke atas dan sheet menahan. Lepaskan setelah melewati setengah tingginya, atau jentikkan ke bawah dengan cepat, dan sheet tertutup; kalau tidak, sheet kembali dengan sedikit overshoot.',
      html: `<div class="viewport docs-box" data-lds-push="dm-sheet">
  <div class="viewport__content">
    <p class="card__title">Bus kota koridor 2</p>
    <button class="btn btn--secondary btn--md" data-lds-open="dm-sheet" aria-haspopup="dialog">Pilih kursi</button>
  </div>
  <div class="scrim" data-lds-scrim="dm-sheet"></div>
  <div class="sheet" id="dm-sheet" role="dialog" aria-modal="true" aria-labelledby="dm-sheet-t" data-lds-layer>
    <div class="sheet__grabber" aria-hidden="true"></div>
    <div class="sheet__head" data-lds-drag><h3 class="sheet__title" id="dm-sheet-t">Pilih kursi</h3><button class="icon-btn icon-btn--filled" aria-label="Tutup" data-lds-close><span class="ic" aria-hidden="true">close</span></button></div>
    <div class="list list--fill"><button class="lrow"><span class="lrow__body"><span class="lrow__title">Baris A, dekat jendela</span></span></button><button class="lrow"><span class="lrow__body"><span class="lrow__title">Baris C, dekat pintu</span></span></button><button class="lrow"><span class="lrow__body"><span class="lrow__title">Kursi mana saja yang kosong</span></span></button></div>
  </div>
</div>`,
    },
    {
      title: 'Geser untuk konfirmasi',
      desc: 'Seret kenopnya. Setelah melewati 85% lintasan (termasuk lemparannya), kenop mengonfirmasi dan labelnya berubah; kalau kurang, kenop kembali dengan momentum spring. Tombol Enter pada kenop melakukan hal yang sama.',
      html: `<div class="slide" data-lds-slide>
  <span class="slide__fill" aria-hidden="true"></span>
  <span class="slide__label">Geser untuk mengirim laporan</span>
  <button class="slide__knob" aria-label="Geser untuk mengirim laporan"><span class="ic" aria-hidden="true">arrow_forward</span></button>
</div>`,
    },
    {
      title: 'Swipe sebuah baris',
      desc: 'Seret baris ke kiri: baris mengikuti jari dan memunculkan aksi; lepaskan setelah melewati setengahnya dan baris terbuka, jentikkan jauh dan baris terhapus. Menyeret ke kanan memantul seperti karet. Tombol panah kiri juga membukanya.',
      html: `<div class="list" style="width: 100%; max-width: 420px;">
  <div class="swipe" data-lds-swipe>
    <div class="swipe__actions"><button class="swipe__act swipe__act--gray" data-swipe="pin"><span class="ic" aria-hidden="true">keep</span>Sematkan</button><button class="swipe__act swipe__act--danger" data-swipe="delete" data-swipe-commit><span class="ic" aria-hidden="true">delete</span>Hapus</button></div>
    <div class="swipe__row lrow" tabindex="0"><span class="lrow__body"><span class="lrow__title">Tanggapan laporan jalan rusak</span><span class="lrow__sub">Dua komentar dari petugas</span></span><span class="lrow__value">09.41</span></div>
  </div>
</div>`,
    },
    {
      title: 'Ubah ukuran dua panel',
      desc: 'Manipulasi langsung tanpa lemparan: pembatas tetap di bawah pointer dan berhenti di tempat Anda melepasnya. Tombol panah menggesernya 2%, dengan Shift 10%.',
      html: `<div class="resize card" data-lds-resize data-min="25" data-max="75" style="height: 160px; padding: 0;">
  <div style="padding: 16px;"><p class="card__title">Isi laporan</p><p class="card__sub">Lampu jalan di depan pasar mati sejak tiga malam. Jalan jadi gelap setelah pukul 18.00.</p></div>
  <div class="resize__handle" aria-label="Ubah ukuran panel laporan dan tanggapan"></div>
  <div style="padding: 16px;"><p class="card__title">Tanggapan petugas</p><p class="card__sub">Perbaikan dijadwalkan Kamis pagi.</p></div>
</div>`,
    },
  ],
  motion: [
    'Mengikuti: selama diseret, transisi dimatikan (`.is-dragging`, `transition: none`) dan elemen bergerak 1:1 dengan pointer, termasuk piksel pertama. Baris swipe menunggu 8 px pergerakan untuk memutuskan antara swipe dan scroll; menu konteks memberi kelonggaran 10 px sebelum tekan lama dibatalkan.',
    'Menahan: melewati batas, offset = `over × dim × 0.55 / (dim + 0.55 × |over|)` (dim 120 px untuk sheet, 52 px untuk kenop geser, 40 px untuk baris swipe). Gerakannya melambat mulus dan tidak pernah berhenti mendadak.',
    'Melempar: kecepatan diukur dari lima sampel pointer terakhir. Sheet dan kenop geser memproyeksikan titik akhir sebagai `position + (v / 1000) × 0.99 / (1 − 0.99)` (sekitar sepersepuluh detik perjalanan); baris swipe memakai `position + v × 0.1`.',
    'Memutuskan: sheet tertutup setelah melewati 50% tingginya; kenop geser mengonfirmasi setelah melewati 85% lintasannya; baris swipe terbuka setelah melewati setengah lebar aksinya dan menjalankan aksi terakhirnya setelah melewati 60% baris atau saat dijentikkan lebih cepat dari 900 px/s.',
    'Menuntaskan: kembali ke posisi atau mendarat setelah lemparan memakai `--spring-momentum` selama `--d-momentum` (600 ms, damping 0.8, overshoot sekitar 1,5%). Menutup memakai kurva keluar; membuka baris swipe memakai `--spring-smooth`.',
    'Reduced motion: seretan tetap mengikuti jari (ini manipulasi langsung), tetapi saat dilepas elemen menetap dalam 120 ms linear tanpa overshoot, dan sheet tidak terlempar.',
  ],
  a11y: [
    'Setiap seretan punya padanan tanpa seret: sheet ditutup dengan tombol dan Escape, kenop geser menerima Enter, baris swipe terbuka dengan panah kiri dan tertutup dengan panah kanan atau Escape, pegangan pengubah ukuran bergerak dengan tombol panah, Home, dan End.',
    'Pegangan seret yang berfungsi sebagai kontrol membawa perannya: pegangan pengubah ukuran adalah `separator` dengan `aria-valuenow`; kenop adalah tombol berlabel.',
    'Jangan jadikan gestur satu-satunya cara menemukan sebuah aksi; ajarkan dengan [petunjuk](hints) pada beberapa kunjungan pertama.',
  ],
  do: [
    'Ikuti pointer sejak piksel pertama, dengan transisi dimatikan.',
    'Putuskan saat dilepas dengan posisi proyeksi, bukan posisi mentah.',
    'Pakai momentum spring untuk mendarat hanya setelah lemparan.',
  ],
  dont: [
    'Melompat ke ujung berdasarkan ambang tetap tanpa memperhitungkan kecepatan.',
    'Membiarkan sesuatu berhenti mendadak di batasnya; beri efek karet (rubber-band).',
    'Merilis gestur tanpa tombol atau tombol keyboard yang melakukan hal yang sama.',
  ],
  js: 'Sudah terpasang di komponennya: `.sheet[data-lds-layer]` (seret pada `.sheet__grabber` dan `[data-lds-drag]`), `[data-lds-slide]` (memancarkan `lds:confirm`), `[data-lds-swipe]` (memancarkan `lds:swipe` dengan `{ action, restore }`), `[data-lds-resize]` (memancarkan `lds:resize` dengan `{ size }`). Tidak ada helper seret publik; komponen baru yang bisa diseret memakai ulang rumus yang sama di `js/lds.js`.',
};
