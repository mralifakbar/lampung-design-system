import { days, wave, cfg, sum } from '../_chart-data.mjs';

const ID = { May: 'Mei', Aug: 'Agu', Oct: 'Okt', Dec: 'Des', Sun: 'Min', Mon: 'Sen', Tue: 'Sel', Wed: 'Rab', Thu: 'Kam', Fri: 'Jum', Sat: 'Sab' };
const loc = (s) => s.replace(/\b[A-Z][a-z]{2}\b/g, (w) => ID[w] || w);
const fmt = (v) => String(v).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

const d30 = days(30);
const now = wave(30, { base: 820, trend: 0.25, week: 0.18, seed: 11, round: 10 });
const last = wave(30, { base: 760, trend: 0.05, week: 0.18, seed: 5, round: 10 });
const visits = {
  label: `Penumpang bus kota per hari. Bulan ini ${fmt(sum(now))}, ${Math.round((sum(now) / sum(last) - 1) * 100)}% lebih banyak dari bulan lalu.`,
  x: d30.short.map(loc), xFull: d30.long.map(loc), xName: 'Hari',
  series: [{ name: 'Bulan ini', values: now }, { name: 'Bulan lalu', values: last, kind: 'line', dashed: true, color: 4 }],
};

const d14 = days(14);
const phone = wave(14, { base: 410, trend: 0.2, seed: 2, round: 5 }), desk = wave(14, { base: 260, week: 0.3, seed: 9, round: 5 }), tab = wave(14, { base: 70, seed: 4, round: 5 });
const devices = {
  label: 'Pengaduan warga per hari menurut saluran, 14 hari terakhir. Aplikasi ponsel menampung lebih dari separuh pengaduan.',
  x: d14.short.map(loc), xFull: d14.long.map(loc), xName: 'Hari', stacked: true, total: true,
  series: [{ name: 'Aplikasi ponsel', values: phone }, { name: 'Situs web', values: desk }, { name: 'Telepon', values: tab }],
};

const hours = ['08.00', '09.00', '10.00', '11.00', '12.00', '13.00', '14.00', '15.00', '16.00', '17.00', '18.00'];
const seats = {
  label: 'Sisa kuota vaksinasi hari Sabtu, per jam pada hari Senin. Turun dari 120 ke 34.',
  x: hours, xName: 'Jam', step: true, height: 200,
  series: [{ name: 'Sisa kuota', values: [120, 118, 104, 96, 96, 81, 77, 60, 52, 41, 34] }],
  refs: [{ value: 40, label: 'Daftar tunggu dibuka di 40' }],
  y: { max: 120, ticks: 4 },
};

const card = (id, q, sub, chart, extra = '') => `<section class="chart-card" aria-labelledby="${id}">
  <div class="chart-card__head"><div class="chart-card__titles"><div class="chart-card__q" id="${id}">${q}</div><div class="chart-card__sub">${sub}</div></div></div>${extra}
  ${chart}
</section>`;

export default {
  summary: 'Garis berisi isian sepanjang waktu, digambar dari data: satu seri dengan pembanding putus-putus, sampai empat seri bertumpuk menjadi total, atau anak tangga untuk nilai yang berubah dengan lompatan. Item legenda menyalakan dan mematikan seri; crosshair membaca semua seri sekaligus.',
  when: [
    'Volume sepanjang waktu ketika jumlah di bawah garis itu penting: kunjungan, penumpang, pengaduan, permohonan.',
    'Bagian dari total sepanjang waktu, bertumpuk: pengaduan menurut saluran, permohonan menurut jenis, penumpang menurut koridor.',
    'Level yang berubah bertahap lalu bertahan: sisa kuota, stok obat, golongan tarif, peserta terdaftar.',
  ],
  whenNot: [
    ['Membandingkan tren yang totalnya tidak bisa dijumlahkan', 'line-chart', 'Isian yang bertumpuk saling menutupi; garis tidak.'],
    ['Beberapa kelompok terpisah (hari, kecamatan)', 'bar-chart'],
    ['Bagian dari satu keseluruhan pada satu waktu', 'donut'],
    ['Tren kecil di bawah satu angka utama', 'kpi-card'],
    ['Aktivitas harian selama berbulan-bulan', 'heatmap'],
  ],
  where: 'Di dalam [kartu grafik](chart-card), selebar kartu. svg digambar pada lebar kartu yang sebenarnya, jadi tick tetap 11 px dan label x menjarang di ponsel, bukan mengecil. Tinggi plot default 220 px; 180 sampai 200 di kartu setengah lebar.',
  anatomy: [
    ['.chart[data-lds-chart]', 'Wajib. Wadahnya; `drawChart` mengisinya dengan legenda, plot, dan tabel tersembunyi. Beri `id` jika dikendalikan kontrol periode.'],
    ['.chart__legend.legend--toggle', 'Dibuat otomatis jika ada dua seri atau lebih. Satu `.legend__btn[aria-pressed]` per seri; paling tidak satu tetap menyala.'],
    ['.chart__plot', 'Dibuat otomatis. `role="img"` yang bisa difokus dengan label; memuat svg dan tooltip `.ctip`.'],
    ['.axis-line / .axis-text', 'Garis grid horizontal pada langkah yang rapi (1, 2, 2,5, 5 × 10ⁿ) dan labelnya; `.axis-line--zero` jika skala turun di bawah nol.'],
    ['.chart__area / .chart__line', 'Satu pasang per seri: isian 12 % (24 % saat bertumpuk) di bawah garis 2 px, dengan `--series-n`. Tanpa gradien.'],
    ['.chart__series.is-dashed', 'Pembanding: garis putus-putus tanpa isian.'],
    ['.chart__ref', 'Garis acuan putus-putus dengan keterangannya di ujung: target, batas.'],
    ['.cross / .chart__dot / .ctip', 'Crosshair, titik di setiap seri yang tampil, dan tooltip berisi tanggal, setiap seri, dan total opsional.'],
    ['table.sr-only', 'Dibuat otomatis. Setiap nilai, dengan label sebagai caption.'],
  ],
  examples: [
    {
      title: 'Bulan ini dibanding bulan lalu',
      desc: 'Satu seri berisi dan pembanding putus-putus. Isian tumbuh dari garis dasar saat pertama terlihat; garis putus-putus muncul memudar. Arahkan kursor ke plot, atau fokuskan lalu pakai tombol panah.',
      html: card('ac-visits', 'Apakah penumpang bus kota bertambah?', 'Penumpang per hari, November dibanding Oktober', `<div class="chart" data-lds-chart='${cfg(visits)}'></div>`),
    },
    {
      title: 'Bertumpuk menjadi total',
      desc: 'Tiga saluran bertumpuk menjadi seluruh pengaduan. Matikan satu saluran di legenda: pitanya menyusut dan skala berpindah halus ke total baru. Tooltip mencantumkan pita teratas lebih dulu, lalu totalnya.',
      html: card('ac-devices', 'Lewat mana warga mengadu?', 'Pengaduan per hari menurut saluran, 14 hari terakhir', `<div class="chart" data-lds-chart='${cfg(devices)}'></div>`),
    },
    {
      title: 'Anak tangga dan garis acuan',
      desc: 'Kuota berubah dengan lompatan dan bertahan di antara pendaftaran, jadi tepinya berundak, bukan miring. Garis putus-putus menandai saat daftar tunggu dibuka.',
      html: `<div style="max-width: 560px;">${card('ac-seats', 'Seberapa cepat kuota vaksinasi terisi?', 'Sisa kuota pada hari Senin, per jam', `<div class="chart" data-lds-chart='${cfg(seats)}'></div>`)}</div>`,
    },
  ],
  variants: [
    ['stacked: true', 'Seri bertumpuk berurutan, seri 1 di paling bawah. Nilai negatif bertumpuk di bawah nol.'],
    ['step: true', 'Tepi horizontal lalu vertikal: nilai bertahan sampai berubah.'],
    ['series[].kind: "line", dashed: true', 'Pembanding atau periode sebelumnya tanpa isian.'],
    ['series[].color', '1 sampai 4 untuk `--series-n` (default: posisinya), `"neutral"` untuk Lainnya.'],
    ['refs: [{ value, label }]', 'Garis acuan putus-putus; skala selalu mencakupnya.'],
    ['format: { prefix, suffix, decimals, compact }', 'Cara nilai dibaca di tick, tooltip, dan tabel ("Rp", "%", 12.4k).'],
    ['xFull', 'Label x yang lebih panjang untuk tooltip dan tabel ("Kam 12 Nov") sementara tick tetap pendek.'],
    ['y: { min, max, ticks, hide }', 'Kunci skalanya (persentase sampai 100) atau sembunyikan label tick di kartu yang sempit.'],
  ],
  states: [
    ['hover / focus', 'Crosshair, titik, dan tooltip pada titik terdekat; tombol panah, Home, dan End memindahkannya dan mengumumkan nilainya.'],
    ['series off', 'Tombol legenda `aria-pressed="false"`, swatch berongga, label diredam; seri menyusut (bertumpuk) atau memudar (bertindihan).'],
    ['data change', '`drawChart(el, next)` atau kontrol periode: tanda dan skala bergerak dari yang tampil.'],
    ['loading, empty, error', 'Lihat [state grafik](chart-states): skeleton garis grid, lalu grafiknya.'],
  ],
  motion: [
    'Saat pertama terlihat: isian dan batang tumbuh dari garis dasar selama `--d-smooth` (560 ms) dengan kurva masuk; garis biasa tergambar sekali selama 1,2 s dengan `--ease-inout`; garis putus-putus memudar masuk.',
    'Perubahan data, toggle legenda, dan pergantian periode men-tween setiap nilai dan skala selama `--d-considered` (480 ms) dengan `--ease-inout`, dimulai dari nilai yang tampil, jadi klik kedua di tengah jalan mengubah arah tanpa lompatan. Jika jumlah titiknya berbeda, bentuk saat ini lebih dulu direntangkan ke titik-titik baru.',
    'Garis grid bergeser mengikuti skala; tooltip bergerak dengan `--ease-standard` dan memudar selama `--d-instant`.',
    'Reduced motion: tanpa tumbuh, tanpa menggambar, tanpa tween; nilai langsung berganti.',
  ],
  a11y: [
    'Plot adalah satu gambar yang bisa difokus dan dinamai oleh `label`, yang sebaiknya menyebut kesimpulannya, bukan jenis grafiknya. Tombol panah membacakan setiap titik lewat live region bersama.',
    'Tabel tersembunyi berisi setiap nilai dibuat di bawah plot.',
    'Item legenda adalah tombol toggle dengan `aria-pressed`; mematikan yang terakhir ditolak dengan efek shake.',
    'Seri dibedakan lewat posisi dan gaya garis selain warna: pita bertumpuk menjaga urutannya, pembanding putus-putus.',
  ],
  do: [
    'Tumpuk hanya hal yang jumlahnya membentuk total yang bermakna.',
    'Pertahankan sumbu y di nol untuk area; isiannya menyiratkan jumlah.',
    'Taruh periodenya di subjudul kartu dan tanggal panjang di `xFull`.',
  ],
  dont: [
    'Menindihkan lebih dari dua area berisi; tumpuk atau pakai garis.',
    'Menghaluskan tepi menjadi kurva yang mengarang nilai di antara titik.',
    'Memakai lebih dari empat seri; gabungkan sisanya ke Lainnya (`color: "neutral"`).',
  ],
  js: "`<div class=\"chart\" data-lds-chart='{ \"label\": \"…\", \"x\": [...], \"series\": [{ \"name\": \"…\", \"values\": [...] }] }'>` (atau anak `<script type=\"application/json\">`) digambar oleh `init()`. Dari kode: `import { drawChart } from 'lampung-design-system'; const chart = drawChart(el, config); chart.update({ series })` beranimasi ke data baru; `chart.toggle(1)` menyalakan atau mematikan satu seri. Grafik digambar ulang pada lebar barunya saat wadahnya berubah ukuran.",
};
