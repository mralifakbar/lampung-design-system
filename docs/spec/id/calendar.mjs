export default {
  summary: 'Grid satu bulan berisi tombol hari yang bulat: hari ini dengan teks aksen, pilihan dengan isian aksen; rentang terisi di antara kedua ujungnya. Markup dan state saja; logika memilih ada di aplikasi Anda.',
  when: [
    'Memilih satu hari atau rentang ketika melihat minggunya penting: memesan jadwal konsultasi, memilih hari Samsat keliling, menentukan tanggal cuti.',
    'Menunjukkan hari mana dalam sebulan yang ditandai (tenggat, sesi layanan) di panel samping.',
  ],
  whenNot: [
    ['Kolom tanggal dalam formulir (tanggal lahir, tanggal yang sudah diketahui)', 'date-field', 'Kolom tanggal membuka kalender ini di popover dan menerima ketikan'],
    ['Daftar acara yang akan datang', 'list'],
    ['Peristiwa berurutan beserta kemajuannya', 'timeline'],
    ['Aktivitas per hari selama berbulan-bulan', 'heatmap'],
  ],
  where: 'Di kolom samping atau popover, lebar 300 px. Di dalam popover [kolom tanggal](date-field), di [sheet](sheet) pada ponsel, atau di samping daftar slot untuk hari terpilih pada layar lebar.',
  anatomy: [
    ['.cal', 'Wajib. Kotak putih 300 px dengan ring dan radius 18 px. `role="group"` dengan `aria-label`.'],
    ['.cal__head', 'Navigasi bulan: [tombol ikon](icon-button) sebelumnya dan berikutnya, serta judul `.cal__month`.'],
    ['.cal__month', 'Wajib. "November 2026".'],
    ['.cal__grid', 'Wajib. Tujuh kolom.'],
    ['.cal__dow', 'Baris inisial nama hari (`aria-hidden`; setiap tombol hari membawa label lengkapnya).'],
    ['button.cal__day', 'Wajib. Tombol hari bulat 38 px dengan `aria-label` seperti "Jumat, 20 November 2026".'],
    ['.is-today / .is-selected / .is-range / .is-muted', 'Hari ini dengan teks aksen; hari terpilih (atau ujung rentang) terisi; hari di antara ujung memakai tint; hari di luar bulan dibuat samar.'],
  ],
  examples: [
    {
      title: 'Satu hari',
      desc: 'Hari ini (16) dengan teks aksen, hari yang dipilih terisi.',
      html: `<div class="cal" role="group" aria-labelledby="cal1-m">
  <div class="cal__head"><button class="icon-btn" style="width: 36px; height: 36px;" aria-label="Bulan sebelumnya"><span class="ic" aria-hidden="true">chevron_left</span></button><span class="cal__month" id="cal1-m" aria-live="polite">November 2026</span><button class="icon-btn" style="width: 36px; height: 36px;" aria-label="Bulan berikutnya"><span class="ic" aria-hidden="true">chevron_right</span></button></div>
  <div class="cal__grid"><span class="cal__dow" aria-hidden="true">M</span><span class="cal__dow" aria-hidden="true">S</span><span class="cal__dow" aria-hidden="true">S</span><span class="cal__dow" aria-hidden="true">R</span><span class="cal__dow" aria-hidden="true">K</span><span class="cal__dow" aria-hidden="true">J</span><span class="cal__dow" aria-hidden="true">S</span><button class="cal__day" aria-label="Minggu, 1 November 2026">1</button><button class="cal__day" aria-label="Senin, 2 November 2026">2</button><button class="cal__day" aria-label="Selasa, 3 November 2026">3</button><button class="cal__day" aria-label="Rabu, 4 November 2026">4</button><button class="cal__day" aria-label="Kamis, 5 November 2026">5</button><button class="cal__day" aria-label="Jumat, 6 November 2026">6</button><button class="cal__day" aria-label="Sabtu, 7 November 2026">7</button><button class="cal__day" aria-label="Minggu, 8 November 2026">8</button><button class="cal__day" aria-label="Senin, 9 November 2026">9</button><button class="cal__day" aria-label="Selasa, 10 November 2026">10</button><button class="cal__day" aria-label="Rabu, 11 November 2026">11</button><button class="cal__day" aria-label="Kamis, 12 November 2026">12</button><button class="cal__day" aria-label="Jumat, 13 November 2026">13</button><button class="cal__day" aria-label="Sabtu, 14 November 2026">14</button><button class="cal__day" aria-label="Minggu, 15 November 2026">15</button><button class="cal__day is-today" aria-label="Senin, 16 November 2026" aria-current="date">16</button><button class="cal__day" aria-label="Selasa, 17 November 2026">17</button><button class="cal__day" aria-label="Rabu, 18 November 2026">18</button><button class="cal__day" aria-label="Kamis, 19 November 2026">19</button><button class="cal__day is-selected" aria-label="Jumat, 20 November 2026" aria-pressed="true">20</button><button class="cal__day" aria-label="Sabtu, 21 November 2026">21</button><button class="cal__day" aria-label="Minggu, 22 November 2026">22</button><button class="cal__day" aria-label="Senin, 23 November 2026">23</button><button class="cal__day" aria-label="Selasa, 24 November 2026">24</button><button class="cal__day" aria-label="Rabu, 25 November 2026">25</button><button class="cal__day" aria-label="Kamis, 26 November 2026">26</button><button class="cal__day" aria-label="Jumat, 27 November 2026">27</button><button class="cal__day" aria-label="Sabtu, 28 November 2026">28</button><button class="cal__day" aria-label="Minggu, 29 November 2026">29</button><button class="cal__day" aria-label="Senin, 30 November 2026">30</button><button class="cal__day is-muted" aria-label="Selasa, 1 Desember 2026">1</button><button class="cal__day is-muted" aria-label="Rabu, 2 Desember 2026">2</button><button class="cal__day is-muted" aria-label="Kamis, 3 Desember 2026">3</button><button class="cal__day is-muted" aria-label="Jumat, 4 Desember 2026">4</button><button class="cal__day is-muted" aria-label="Sabtu, 5 Desember 2026">5</button></div>
</div>`,
    },
    {
      title: 'Rentang',
      desc: 'Kedua ujung terisi, hari di antaranya memakai tint aksen.',
      html: `<div class="cal" role="group" aria-labelledby="cal2-m">
  <div class="cal__head"><button class="icon-btn" style="width: 36px; height: 36px;" aria-label="Bulan sebelumnya"><span class="ic" aria-hidden="true">chevron_left</span></button><span class="cal__month" id="cal2-m">November 2026</span><button class="icon-btn" style="width: 36px; height: 36px;" aria-label="Bulan berikutnya"><span class="ic" aria-hidden="true">chevron_right</span></button></div>
  <div class="cal__grid"><span class="cal__dow" aria-hidden="true">M</span><span class="cal__dow" aria-hidden="true">S</span><span class="cal__dow" aria-hidden="true">S</span><span class="cal__dow" aria-hidden="true">R</span><span class="cal__dow" aria-hidden="true">K</span><span class="cal__dow" aria-hidden="true">J</span><span class="cal__dow" aria-hidden="true">S</span><button class="cal__day" aria-label="Minggu, 1 November 2026">1</button><button class="cal__day" aria-label="Senin, 2 November 2026">2</button><button class="cal__day" aria-label="Selasa, 3 November 2026">3</button><button class="cal__day" aria-label="Rabu, 4 November 2026">4</button><button class="cal__day" aria-label="Kamis, 5 November 2026">5</button><button class="cal__day" aria-label="Jumat, 6 November 2026">6</button><button class="cal__day" aria-label="Sabtu, 7 November 2026">7</button><button class="cal__day" aria-label="Minggu, 8 November 2026">8</button><button class="cal__day" aria-label="Senin, 9 November 2026">9</button><button class="cal__day" aria-label="Selasa, 10 November 2026">10</button><button class="cal__day" aria-label="Rabu, 11 November 2026">11</button><button class="cal__day" aria-label="Kamis, 12 November 2026">12</button><button class="cal__day" aria-label="Jumat, 13 November 2026">13</button><button class="cal__day" aria-label="Sabtu, 14 November 2026">14</button><button class="cal__day" aria-label="Minggu, 15 November 2026">15</button><button class="cal__day is-today" aria-label="Senin, 16 November 2026" aria-current="date">16</button><button class="cal__day" aria-label="Selasa, 17 November 2026">17</button><button class="cal__day is-selected" aria-label="Rabu, 18 November 2026" aria-pressed="true">18</button><button class="cal__day is-range" aria-label="Kamis, 19 November 2026">19</button><button class="cal__day is-range" aria-label="Jumat, 20 November 2026">20</button><button class="cal__day is-range" aria-label="Sabtu, 21 November 2026">21</button><button class="cal__day is-selected" aria-label="Minggu, 22 November 2026" aria-pressed="true">22</button><button class="cal__day" aria-label="Senin, 23 November 2026">23</button><button class="cal__day" aria-label="Selasa, 24 November 2026">24</button><button class="cal__day" aria-label="Rabu, 25 November 2026">25</button><button class="cal__day" aria-label="Kamis, 26 November 2026">26</button><button class="cal__day" aria-label="Jumat, 27 November 2026">27</button><button class="cal__day" aria-label="Sabtu, 28 November 2026">28</button><button class="cal__day" aria-label="Minggu, 29 November 2026">29</button><button class="cal__day" aria-label="Senin, 30 November 2026">30</button><button class="cal__day is-muted" aria-label="Selasa, 1 Desember 2026">1</button><button class="cal__day is-muted" aria-label="Rabu, 2 Desember 2026">2</button><button class="cal__day is-muted" aria-label="Kamis, 3 Desember 2026">3</button><button class="cal__day is-muted" aria-label="Jumat, 4 Desember 2026">4</button><button class="cal__day is-muted" aria-label="Sabtu, 5 Desember 2026">5</button></div>
</div>`,
    },
  ],
  states: [
    ['hover', 'Hari diberi warna `--bg-tint-strong`.'],
    [':active', 'Hari mengecil ke `scale(0.88)` lalu memantul kembali.'],
    ['today', '`.is-today` ditambah `aria-current="date"`.'],
    ['selected', '`.is-selected` ditambah `aria-pressed="true"`.'],
    ['in range', '`.is-range`: tint persegi selebar sel.'],
    ['di luar bulan / tidak tersedia', '`.is-muted`; untuk hari yang tidak bisa dipilih, pasang juga `disabled` dan jelaskan alasannya di dekat kalender.'],
  ],
  motion: [
    'Warna hari berubah selama `--d-fast` (160 ms) dengan `--ease-standard`; saat ditekan mengecil ke 0.88 lalu kembali dengan `--spring-snappy`.',
    'Berganti bulan menukar grid seketika; bila dianimasikan, pakai [view swap](view-swap) yang singkat, jangan geser yang panjang.',
  ],
  a11y: [
    'Setiap hari adalah `<button>` dengan `aria-label` lengkap (nama hari, tanggal, bulan, tahun); inisial nama hari diberi `aria-hidden`.',
    'Tandai hari ini dengan `aria-current="date"` dan pilihan dengan `aria-pressed="true"` (atau `aria-selected` di dalam `role="grid"` yang Anda bangun sepenuhnya).',
    'Keyboard: tombol bisa dicapai dengan Tab. Grid pemilih tanggal yang lengkap (panah berpindah per hari, Page Up dan Page Down per bulan, satu tab stop) adalah logika aplikasi yang Anda tambahkan; `lds.js` tidak menyediakannya.',
    'Umumkan bulan saat berganti (`aria-live="polite"` pada `.cal__month`).',
  ],
  do: [
    'Mulai minggu pada hari yang diharapkan pengguna Anda.',
    'Tampilkan tanggal atau rentang terpilih dalam kata di samping kalender ("18 sampai 22 November").',
    'Nonaktifkan hari yang tidak bisa dipilih dan jelaskan alasannya.',
  ],
  dont: [
    'Memakai kalender untuk tanggal lahir; pakai [kolom tanggal](date-field) yang menerima ketikan.',
    'Mewarnai hari menurut arti tanpa keterangan dalam kata.',
  ],
  js: 'Tidak ada. Memilih hari, rentang, dan berpindah bulan adalah logika aplikasi: perbarui kelas dan state ARIA yang tercantum di atas.',
};
