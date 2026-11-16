const events = [
  { id: 'e1', title: 'Rapat perencanaan bulanan', start: '2026-11-02T09:30', end: '2026-11-02T10:30', tone: 1, where: 'Ruang 4' },
  { id: 'e2', title: 'Tinjauan desain layanan', start: '2026-11-04T11:00', end: '2026-11-04T12:00', tone: 4 },
  { id: 'e3', title: 'Lokakarya pelayanan publik', start: '2026-11-09', end: '2026-11-11', allDay: true, tone: 2, where: 'Kantor Metro' },
  { id: 'e4', title: 'Rapat pagi tim', start: '2026-11-16T09:00', end: '2026-11-16T09:15', tone: 3 },
  { id: 'e5', title: 'Koordinasi dengan kelurahan', start: '2026-11-16T14:00', end: '2026-11-16T14:45', tone: 1, where: 'Panggilan video' },
  { id: 'e6', title: 'Sinkronisasi anggaran', start: '2026-11-16T16:00', end: '2026-11-16T16:30', tone: 2 },
  { id: 'e7', title: 'Perencanaan sprint', start: '2026-11-17T10:00', end: '2026-11-17T11:30', tone: 1 },
  { id: 'e8', title: 'Wawancara: analis data', start: '2026-11-18T13:00', end: '2026-11-18T14:00', tone: 4, where: 'Ruang 2' },
  { id: 'e9', title: 'Tenggat laporan triwulan', start: '2026-11-24', allDay: true, tone: 2 },
  { id: 'e10', title: 'Pembukaan pelatihan UMKM', start: '2026-11-26T18:30', end: '2026-11-26T20:00', tone: 3, where: 'Aula B' },
];
const json = JSON.stringify(events, null, 0);

export default {
  summary: 'Kalender acara dengan tiga tampilan: grid bulan dengan chip acara, satu minggu berisi blok berjam dengan garis waktu sekarang, dan daftar agenda yang dikelompokkan per hari. Dirender dari JSON dan berubah menjadi titik ditambah daftar hari terpilih bila lebarnya kurang dari 640 px.',
  when: [
    'Orang merencanakan sesuatu menurut tanggal dan jam: kalender tim, jadwal kelas, pemesanan, tenggat lintas proyek.',
    'Melihat apa lagi yang terjadi pada hari atau minggu itu penting: mencari slot kosong, mengenali minggu yang padat.',
  ],
  whenNot: [
    ['Memilih satu tanggal atau rentang dalam formulir', 'calendar', 'Atau [kolom tanggal](date-field) dan [rentang tanggal](date-range)'],
    ['Daftar pendek butir yang akan datang', 'list', 'Kelompokkan baris per hari dengan [separator](separator) berlabel'],
    ['Riwayat satu catatan', 'timeline'],
  ],
  where: 'Selebar kolom isi, sebagai objek utama halaman (filter atau daftar kalender boleh berada di sampingnya). Ukurannya mengikuti lebarnya sendiri, bukan layar: di bawah 640 px tampilan bulan menunjukkan titik dan acara hari terpilih, dan hanya Bulan serta Agenda yang ditawarkan.',
  anatomy: [
    ['.evcal[data-lds-events]', 'Wajib. Wadahnya. `data-date` (tanggal yang ditampilkan), `data-view` (month, week, agenda), `data-week-start` (1 = Senin), `data-hours` ("7-20"), `data-locale`, dan untuk contoh tetap `data-today` serta `data-now` ("10:20").'],
    ['script[type="application/json"]', 'Acaranya: `id`, `title`, `start` ("2026-11-16" atau "2026-11-16T14:00"), `end` opsional, `allDay`, `tone` (1 sampai 4, warna seri grafik), dan `where`.'],
    ['.evcal__head', 'Dirender: judul (live region), sebelumnya, Hari ini, berikutnya dalam [button group](button-group), dan [segmented control](segmented-control) untuk tampilan.'],
    ['.evcal__month > .evcal__cell', 'Grid bulan yang dirender: tombol hari `.evcal__date`, sampai tiga chip `.evcal__evt`, `.evcal__more` "2 lagi", dan `.evcal__dots` untuk lebar sempit.'],
    ['.evcal__week', 'Minggu yang dirender: header hari, baris sepanjang hari, kolom jam, dan kolom `.evcal__day` berisi `.evcal__block` yang berdampingan bila tumpang tindih, ditambah `.evcal__now`.'],
    ['.evcal__agenda', 'Agenda yang dirender: judul hari `.sep-label` yang menempel selama harinya digulir, lalu `.evcal__row`.'],
  ],
  examples: [
    {
      title: 'Kalender tim',
      desc: 'Pindah antara Bulan, Minggu, dan Agenda; telusuri bulan; Hari ini membawa kembali. Tombol panah berpindah antar hari di tampilan bulan. Persempit jendela sampai lebar kalender di bawah 640 px: tampilan bulan berubah menjadi titik dan daftar untuk hari terpilih.',
      html: `<div class="evcal" data-lds-events data-date="2026-11-16" data-today="2026-11-16" data-now="10:20" data-view="month"><script type="application/json">${json}</script></div>`,
    },
    {
      title: 'Tampilan minggu',
      desc: 'Acara berjam sebagai blok, yang tumpang tindih berdampingan, acara sepanjang hari di atas, dan garis untuk waktu sekarang.',
      html: `<div class="evcal" data-lds-events data-date="2026-11-16" data-today="2026-11-16" data-now="10:20" data-view="week" data-hours="8-19"><script type="application/json">${json}</script></div>`,
    },
  ],
  variants: [
    ['data-view="month"', 'Default. Chip dengan jam mulai; acara beberapa hari diulang di setiap hari dengan awal bersudut.'],
    ['data-view="week"', 'Merencanakan satu minggu per jam. Disembunyikan di bawah 640 px.'],
    ['data-view="agenda"', 'Membaca apa yang akan datang; default di ponsel bila yang diminta tampilan minggu.'],
  ],
  states: [
    ['today', 'Tanggalnya berada di lingkaran aksen (`aria-current="date"`); di tampilan minggu header hari berupa teks aksen dan kolomnya diberi tint samar.'],
    ['outside the month', 'Sel dengan isian tenang dan tanggal redup.'],
    ['selected day (narrow)', 'Tint aksen pada sel; acaranya tercantum di bawah grid.'],
    ['empty', 'Agenda: "Tidak ada acara bulan ini" beserta apa yang bisa dilakukan; hari pada lebar sempit: "Tidak ada rencana untuk hari ini."'],
    ['loading', 'Render setelah data tiba; sampai itu tampilkan blok [skeleton](skeleton) setinggi satu bulan di dalam `.evcal__body`.'],
  ],
  motion: [
    'Pindah ke bulan atau minggu berikutnya atau sebelumnya menggeser isi masuk dari sisi itu dengan `--spring-smooth` (`view-in--forward` dan `--back`, 24 px), sehingga arahnya terasa; berganti tampilan memudarkannya masuk selama `--d-standard`.',
    'Tombol hari dan chip acara mengecil saat ditekan (0,9 dan 0,97) lalu memantul kembali dengan `--spring-snappy`.',
    'Reduced motion: tampilan berganti dengan fade 120 ms.',
  ],
  a11y: [
    'Tampilan bulan adalah `role="grid"` berisi baris dan sel; setiap hari adalah tombol asli berlabel tanggal lengkap dan jumlah acaranya ("Senin 16 November, 3 acara"), dengan satu tab stop dan tombol panah antar hari (melewati tepi berpindah bulan).',
    'Chip dan blok acara adalah tombol berlabel judul, jam, dan tempat.',
    'Judulnya live region, jadi "Desember 2026" diumumkan setelah berpindah; sebelumnya dan berikutnya berbunyi "Bulan sebelumnya" atau "Minggu sebelumnya".',
    'Tone tidak pernah menjadi satu-satunya penanda: setiap acara menyebut judul dan jamnya dalam kata.',
  ],
  do: [
    'Buka detail acara di [popover](popover) atau [drawer](drawer) pada `lds:event`, dan tawarkan "Acara baru" pada `lds:day`.',
    'Buat judul singkat; tempat masuk ke `where`.',
  ],
  dont: [
    'Memakai lebih dari empat tone; kelompokkan per kalender dan biarkan orang memfilter dengan `filter()`.',
    'Memaksakan tampilan minggu di ponsel; agenda lebih mudah dibaca.',
  ],
  js: '`data-lds-events` merender kalender (atau panggil `eventCalendar(el, { events })`). Kalender memicu `lds:event` `{ event, el }`, `lds:day` `{ date, events, el }`, dan `lds:range` `{ start, end, view }` setelah setiap render. Handle dari `eventCalendar(el)` punya `set(events)`, `go(date)`, `view(name)`, `filter(fn)`, dan `today()`.',
};
