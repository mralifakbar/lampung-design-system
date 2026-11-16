export default {
  summary: 'Baris catatan yang dibandingkan dengan kolom yang sama, di dalam `.table-box` yang bergulir ke samping bila perlu. `<table>` asli secara default, `.table--wrap` untuk teks, dan grid `.dt` bila sebuah template mengulang baris.',
  when: [
    'Membandingkan banyak catatan menurut atribut yang sama: layanan menurut kode, lama proses, dan kuota; pembayaran menurut tanggal, jumlah, dan status.',
    'Data yang diurutkan, dipindai per kolom, atau dipilih barisnya (rekap nilai, daftar peserta, tagihan).',
    'Tabel teks dua kolom berisi aturan atau definisi (`.table--wrap`).',
  ],
  whenNot: [
    ['Butir dengan satu atau dua fakta masing-masing, terutama di ponsel', 'list'],
    ['Detail satu catatan', 'key-value'],
    ['Beberapa angka ringkasan', 'stat-row'],
    ['Bentuk angka lebih penting daripada nilainya', 'bar-chart'],
    ['Hierarki folder atau bagian', 'tree'],
  ],
  where: 'Di kolom isi, selebar kolom itu, di dalam `.table-box` (ring, radius, gulir mendatar). Di ponsel jaga kolom pertama tetap bermakna dan biarkan kotaknya bergulir, atau tampilkan data yang sama sebagai [daftar](list) bila orang hanya butuh satu atau dua kolom. Taruh filter dan aksi di atasnya, [pagination](pagination) di bawahnya.',
  anatomy: [
    ['.table-box', 'Wajib. Permukaannya: putih, ring, radius besar, `overflow: auto` agar tabel lebar bergulir di dalamnya.'],
    ['table.table', 'Wajib. Selebar penuh, teks 14 px; `th` adalah header 40 px di atas isian tenang, baris `td` setinggi 52 px dengan garis tipis di atas.'],
    ['th > button (.is-sorted, .is-desc)', 'Header yang bisa diurutkan: ikon panah yang berputar saat diurutkan menurun.'],
    ['.num', 'Pada `th` dan `td`: angka tabular rata kanan. Setiap kolom angka.'],
    ['td.strong', 'Sel yang menamai barisnya (tegas, ketebalan medium).'],
    ['tr.is-selected', 'Baris terpilih dengan tint aksen.'],
    ['.table--wrap', 'Tabel teks: sel turun baris dan membesar, rata atas; kolom pertama mengambil 32 %.'],
    ['.dt[role=table] > .dt__row[role=row] > .dt__cell', 'Tabel grid: baris berisi sel, untuk template yang mengulang baris dengan bebas. `.dt__head` untuk baris header, `.dt__sort` untuk header yang bisa diurutkan. Atur `grid-template-columns` pada `.dt__row` per tabel; lebarnya minimal 720 px.'],
  ],
  examples: [
    {
      title: 'Catatan dengan pengurutan dan pemilihan',
      desc: 'Angka rata kanan, kolom penamaan tegas, baris terpilih dengan tint aksen. Diurutkan menurut lama proses, menurun.',
      html: `<div class="table-box">
  <table class="table">
    <thead><tr><th>Layanan</th><th>Kode</th><th class="num" aria-sort="descending"><button class="is-sorted is-desc">Lama proses (hari)<span class="ic" aria-hidden="true">arrow_upward</span></button></th><th class="num">Kuota tersisa</th><th>Status</th></tr></thead>
    <tbody>
      <tr><td class="strong">Izin usaha mikro</td><td>IUM 2104</td><td class="num">4</td><td class="num">12</td><td><span class="badge badge--success">Dibuka</span></td></tr>
      <tr class="is-selected"><td class="strong">Persetujuan bangunan gedung</td><td>PBG 3102</td><td class="num">3</td><td class="num">0</td><td><span class="badge badge--danger">Penuh</span></td></tr>
      <tr><td class="strong">Surat keterangan domisili</td><td>SKD 1201</td><td class="num">2</td><td class="num">31</td><td><span class="badge badge--success">Dibuka</span></td></tr>
    </tbody>
  </table>
</div>`,
    },
    {
      title: 'Tabel teks',
      desc: '`.table--wrap` membiarkan sel turun baris dan membesar, untuk aturan dan definisi.',
      html: `<div class="table-box">
  <table class="table table--wrap">
    <thead><tr><th>Aturan</th><th>Artinya</th></tr></thead>
    <tbody>
      <tr><td class="strong">Terlambat bayar</td><td>Pajak yang dibayar setelah jatuh tempo dikenai denda 2 % per bulan, paling lama 24 bulan.</td></tr>
      <tr><td class="strong">Keringanan</td><td>Ajukan sebelum jatuh tempo. Keringanan karena bencana perlu surat keterangan dari kelurahan dalam tiga hari.</td></tr>
    </tbody>
  </table>
</div>`,
    },
    {
      title: 'Tabel grid',
      desc: 'Grid `.dt`: baris berisi sel dengan role tabel ARIA. Atur kolom di setiap baris. Bergulir di dalam kotaknya di bawah 720 px.',
      html: `<div class="table-box">
  <div class="dt" role="table" aria-label="Pembayaran">
    <div class="dt__row dt__head" role="row" style="grid-template-columns: minmax(0, 2fr) minmax(0, 1fr) 140px 120px;"><span class="dt__cell" role="columnheader">Butir</span><span class="dt__cell" role="columnheader" aria-sort="ascending"><button class="dt__sort is-sorted">Tanggal<span class="ic" aria-hidden="true">arrow_upward</span></button></span><span class="dt__cell num" role="columnheader">Jumlah</span><span class="dt__cell" role="columnheader">Status</span></div>
    <div class="dt__row" role="row" style="grid-template-columns: minmax(0, 2fr) minmax(0, 1fr) 140px 120px;"><span class="dt__cell strong" role="cell">Pajak bumi dan bangunan</span><span class="dt__cell" role="cell">2 Sep 2026</span><span class="dt__cell num" role="cell">Rp 1.250.000</span><span class="dt__cell" role="cell"><span class="badge badge--success">Lunas</span></span></div>
    <div class="dt__row" role="row" style="grid-template-columns: minmax(0, 2fr) minmax(0, 1fr) 140px 120px;"><span class="dt__cell strong" role="cell">Pajak kendaraan bermotor</span><span class="dt__cell" role="cell">28 Nov 2026</span><span class="dt__cell num" role="cell">Rp 1.000.000</span><span class="dt__cell" role="cell"><span class="badge badge--warning">Jatuh tempo</span></span></div>
  </div>
</div>`,
    },
  ],
  variants: [
    ['table', 'Sel satu baris, baris 52 px. Catatan dan angka.'],
    ['table--wrap', 'Sel yang turun baris dan rata atas, untuk teks.'],
    ['dt', 'Tabel grid dengan role ARIA, ketika template engine mengulang komponen baris; sel dipotong dengan elipsis, bukan turun baris.'],
  ],
  states: [
    ['hover', 'Baris isi diberi tint `--bg-tint` (60 ms).'],
    ['sorted', '`.is-sorted` pada tombol header (panah opacity penuh), `.is-desc` memutarnya; pasang `aria-sort` pada `th` (atau sel `columnheader`).'],
    ['selected', '`tr.is-selected` / `.dt__row.is-selected`, dengan [checkbox](checkbox) tercentang di kolom pertama dan [selection bar](selection-bar) untuk aksi massal.'],
    ['loading', 'Bilah [skeleton](skeleton) di setiap sel, header tetap ada.'],
    ['empty', 'Satu baris selebar semua kolom berisi [empty state](empty-state), header dan filter tetap ada.'],
  ],
  motion: [
    'Hover baris: latar berubah selama 60 ms linear, nyaris seketika agar memindai tidak pernah tertinggal.',
    'Panah urutan berputar 180 derajat dengan `--spring-smooth` (`--d-smooth`); opacity-nya berubah selama `--d-fast`.',
    'Pengurutan ulang tidak menganimasikan baris; urutan baru langsung muncul.',
  ],
  a11y: [
    'Utamakan `<table>` asli dengan `<th>`; dengan `.dt`, beri setiap elemen role-nya (`table`, `row`, `columnheader`, `cell`) dan beri tabel `aria-label`.',
    'Header yang bisa diurutkan adalah `<button>` di dalam header; pasang `aria-sort="ascending|descending"` hanya pada sel header kolom yang diurutkan.',
    '`.table-box` yang bergulir harus bisa dicapai keyboard bila meluap: tambahkan `tabindex="0"` dan `aria-label`, atau pastikan elemen yang bisa difokus di dalamnya ikut menggulirnya.',
    'State di sel memakai kata ([badge](badge)), bukan hanya warna.',
  ],
  do: [
    'Ratakan kanan setiap kolom angka dengan `.num`, termasuk header-nya.',
    'Jadikan kolom pertama sebagai kolom yang menamai baris.',
    'Pertahankan header dan filter tetap terlihat di state loading dan kosong.',
  ],
  dont: [
    'Memakai tabel untuk layout atau untuk satu catatan saja.',
    'Memaksakan tabel lebar di ponsel; biarkan bergulir atau ganti dengan daftar.',
    'Menambahkan garis zebra, garis vertikal, atau warna header sendiri.',
  ],
  js: 'Tidak ada. Pengurutan, pemilihan, dan halaman adalah logika aplikasi: render ulang baris dan perbarui `.is-sorted`, `.is-desc`, dan `aria-sort`.',
};
