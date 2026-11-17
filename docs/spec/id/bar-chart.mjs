import { cfg } from '../_chart-data.mjs';

const days = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
const thisWeek = [12, 18, 26, 22, 31, 9, 4];
const lastWeek = [15, 21, 19, 24, 17, 6, 8];
const pct = (v) => `${Math.round((v / 32) * 100)}%`;
const col = (d, v, muted, extra = '') => `<div class="bars__col"><span class="bars__bar${muted ? ' bars__bar--muted' : ''}" style="height: ${pct(v)};"${extra}><span class="bars__tip">${v} laporan</span></span><span class="bars__x">${d}</span></div>`;
const highlight = days.map((d, i) => col(d, thisWeek[i], thisWeek[i] !== 31)).join('\n    ');
const switchable = days.map((d, i) => col(d, thisWeek[i], false, ` data-a="${pct(thisWeek[i])}" data-ta="${thisWeek[i]} laporan" data-b="${pct(lastWeek[i])}" data-tb="${lastWeek[i]} laporan"`)).join('\n    ');
const set = (k) => `onclick="this.closest('.chart-card').querySelectorAll('.bars__bar').forEach(b => { b.style.height = b.dataset.${k}; b.firstChild.textContent = b.dataset.t${k}; })"`;
const scores = [['Paripurna', 12], ['Utama', 18], ['Madya', 9], ['Dasar', 3]];
const dist = scores.map(([g, v]) => `<div class="bars__col"><span class="bars__bar" style="height: ${Math.round((v / 20) * 100)}%; background: var(--series-3);"><span class="bars__tip">${v} puskesmas</span></span><span class="bars__x">${g}</span></div>`).join('\n    ');

const grouped = {
  label: 'Laporan warga per minggu menurut status, 6 minggu terakhir. Tepat waktu naik dari 58 ke 74; terlambat tetap di bawah 12.',
  x: ['M41', 'M42', 'M43', 'M44', 'M45', 'M46'], xFull: ['Minggu 5 Okt', 'Minggu 12 Okt', 'Minggu 19 Okt', 'Minggu 26 Okt', 'Minggu 2 Nov', 'Minggu 9 Nov'], xName: 'Minggu', kind: 'bar',
  series: [{ name: 'Tepat waktu', values: [58, 61, 66, 63, 70, 74] }, { name: 'Terlambat', values: [11, 9, 12, 8, 7, 6] }, { name: 'Belum ditangani', values: [6, 5, 4, 6, 3, 2], color: 'neutral' }],
  height: 200,
};
const stackedBars = { ...grouped, label: 'Laporan warga per minggu, bertumpuk menurut status. Totalnya antara 75 dan 82; porsi yang belum ditangani terus mengecil.', stacked: true, total: true };
const cash = {
  label: 'Uang masuk dan keluar per bulan, 2026. Semua bulan kecuali Agustus berakhir surplus.',
  x: ['Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov'], xFull: ['Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November'], xName: 'Bulan', kind: 'bar', stacked: true, total: true,
  format: { prefix: 'Rp ', suffix: ' jt', compact: true },
  series: [{ name: 'Retribusi pasar', values: [184, 212, 158, 241, 269, 283], color: 3 }, { name: 'Biaya perawatan', values: [-142, -151, -173, -168, -179, -186], color: 2 }],
  height: 220,
};

export default {
  summary: 'Batang vertikal yang membandingkan satu nilai di beberapa kategori atau periode (hari, kecamatan, jenis layanan). Batang dimulai dari nol, jawabannya disorot, sisanya memudar.',
  when: [
    'Membandingkan jumlah atau besaran di 3 sampai 12 kategori: laporan per hari, kunjungan per puskesmas, permohonan per jenis izin.',
    'Periode terpisah ketika tiap batang adalah kelompoknya sendiri (minggu, bulan) dan pembaca membandingkan ukurannya.',
  ],
  whenNot: [
    ['Tren berkelanjutan dengan banyak titik', 'line-chart'],
    ['Bagian dari satu keseluruhan yang berjumlah 100 %', 'percentage-bar'],
    ['Aktivitas per hari selama berbulan-bulan', 'heatmap'],
    ['Satu angka dan trennya', 'sparkline-stat'],
    ['Kemajuan satu hal menuju target', 'progress-bar'],
  ],
  where: 'Di `.chart-card`, setengah lebar di dasbor (`auto-grid` dengan `--min: 320px`) atau selebar halaman di laporan. Tinggi plot 180 px. Di ponsel tampilkan paling banyak tujuh batang; kelompokkan sisanya (minggu, bukan hari).',
  anatomy: [
    ['.bars', 'Wajib. Plotnya: baris flex setinggi 180 px, batang rata bawah, berjarak 8 px. `role="img"` dengan `aria-label` yang menyatakan kesimpulannya.'],
    ['.bars__col', 'Wajib. Satu kategori: batang dan labelnya.'],
    ['.bars__bar', 'Wajib. Tinggi diatur inline sebagai persen dari plot. `--series-1` secara default, lebar maksimal 36 px, sudut atas membulat.'],
    ['.bars__bar--muted', 'Opsional. Memudarkan batang yang bukan jawaban.'],
    ['.bars__tip', 'Opsional. Nilai dalam tip gelap di atas batang saat hover.'],
    ['.bars__x', 'Wajib. Label kategori di bawah batang, 12 px `--text-muted`.'],
  ],
  examples: [
    {
      title: 'Sorot jawabannya',
      desc: 'Hari tersibuk memakai warna seri, sisanya diredam. Arahkan kursor ke batang mana pun untuk melihat nilainya; batang lain meredup. Dengan `data-lds-grow` batang naik dari garis dasar saat pertama terlihat.',
      html: `<div class="chart-card" style="max-width: 520px;">
  <div><div class="chart-card__q">Hari apa yang paling sibuk?</div><div class="chart-card__sub">Laporan warga yang masuk per hari, minggu ini</div></div>
  <div class="bars" role="img" data-lds-grow aria-label="Laporan warga per hari. Jumat paling sibuk dengan 31 laporan.">
    ${highlight}
  </div>
</div>`,
    },
    {
      title: 'Mengganti periode',
      desc: 'Ganti minggunya: tinggi batang berubah selama 480 ms dengan kurva in-out, dari posisinya saat itu.',
      html: `<div class="chart-card" style="max-width: 520px;">
  <div class="cluster" style="justify-content: space-between; align-items: flex-start;">
    <div><div class="chart-card__q">Hari apa yang paling sibuk?</div><div class="chart-card__sub">Laporan warga yang masuk per hari</div></div>
    <div class="seg" role="group" aria-label="Periode" data-lds-segmented style="width: 200px;">
      <span class="seg__thumb"></span>
      <button class="seg__btn" aria-pressed="true" ${set('a')}>Minggu ini</button>
      <button class="seg__btn" aria-pressed="false" ${set('b')}>Minggu lalu</button>
    </div>
  </div>
  <div class="bars" role="img" aria-label="Laporan warga per hari untuk minggu yang dipilih">
    ${switchable}
  </div>
</div>`,
    },
    {
      title: 'Sebaran',
      desc: 'Jumlah puskesmas per tingkat akreditasi. Satu seri, satu warna, tanpa sorotan karena tidak ada satu batang yang menjadi jawaban.',
      html: `<div class="chart-card" style="max-width: 420px;">
  <div><div class="chart-card__q">Bagaimana sebaran akreditasi puskesmas?</div><div class="chart-card__sub">Tingkat akreditasi, 42 puskesmas di tiga kabupaten</div></div>
  <div class="bars" role="img" aria-label="Akreditasi: Paripurna 12, Utama 18, Madya 9, Dasar 3 puskesmas">
    ${dist}
  </div>
</div>`,
    },
    {
      title: 'Berkelompok dan bertumpuk, dari data',
      desc: 'Minggu yang sama dengan dua cara. Berkelompok membandingkan status dalam satu minggu; bertumpuk menunjukkan total dan bagiannya. Keduanya digambar dari data oleh `data-lds-chart`; matikan satu status di legenda dan yang lain merapat.',
      html: `<div class="auto-grid" style="--min: 300px;">
  <section class="chart-card" aria-labelledby="bc-g"><div><div class="chart-card__q" id="bc-g">Apakah makin banyak laporan ditangani tepat waktu?</div><div class="chart-card__sub">Laporan warga per minggu menurut status</div></div><div class="chart" data-lds-chart='${cfg(grouped)}'></div></section>
  <section class="chart-card" aria-labelledby="bc-s"><div><div class="chart-card__q" id="bc-s">Berapa total laporan tiap minggu?</div><div class="chart-card__sub">Laporan warga per minggu, bertumpuk menurut status</div></div><div class="chart" data-lds-chart='${cfg(stackedBars)}'></div></section>
</div>`,
    },
    {
      title: 'Masuk dan keluar di sekitar nol',
      desc: 'Nilai negatif bertumpuk di bawah garis nol, jadi uang masuk dan keluar memakai satu skala. Tooltip menjumlahkannya menjadi total bulan itu.',
      html: `<section class="chart-card" style="max-width: 640px;" aria-labelledby="bc-c"><div><div class="chart-card__q" id="bc-c">Apakah setiap bulan berakhir surplus?</div><div class="chart-card__sub">Retribusi pasar dan biaya perawatan per bulan, 2026</div></div><div class="chart" data-lds-chart='${cfg(cash)}'></div></section>`,
    },
  ],
  variants: [
    ['.bars (HTML)', 'Satu seri, markup statis, sorotan, dan tip saat hover. Tambahkan `data-lds-grow` agar batang tumbuh saat pertama terlihat.'],
    ['data-lds-chart, kind "bar"', 'Digambar dari data: beberapa seri berkelompok berdampingan, tooltip per periode, toggle legenda, pembacaan dengan keyboard, tabel tersembunyi.'],
    ['stacked: true', 'Batang bertumpuk menjadi total; nilai negatif bertumpuk di bawah nol (masuk dan keluar, untung dan rugi).'],
    ['highlight: index', 'Satu seri yang digambar dari data: jawabannya memakai warna seri, sisanya diredam.'],
  ],
  states: [
    ['hover', 'Setiap batang meredup ke 45 % kecuali yang di-hover, yang `.bars__tip`-nya naik muncul.'],
    ['data change', 'Atur tinggi baru; tingginya bertransisi. Perbarui juga `aria-label`.'],
    ['loading, empty, error', 'Lihat [state grafik](chart-states).'],
  ],
  motion: [
    'Tinggi bertransisi selama `--d-considered` (480 ms) dengan `--ease-inout`, karena ini nilai yang sudah tampil dan sedang berubah.',
    'Hover: opasitas selama `--d-fast`; tip muncul pudar selama `--d-fast` dan naik 3 px dengan `--spring-snappy`.',
    'Saat pertama terlihat: dengan `data-lds-grow` (batang HTML) atau saat digambar dari data, batang tumbuh dari garis dasar dengan `--spring-smooth` (560 ms), berjarak 35 ms. Tanpa itu batang langsung tampil pada tingginya.',
    'Grafik yang digambar dari data men-tween nilai dan skala selama 480 ms dari yang tampil saat data berubah atau satu seri dimatikan.',
    'Dengan reduced motion perubahan tinggi menjadi 120 ms dan tidak ada yang tumbuh.',
  ],
  a11y: [
    '`role="img"` pada `.bars` dengan `aria-label` yang menyebut kesimpulan dan angka kuncinya.',
    'Tip hanya muncul saat hover dan batang tidak bisa difokus, jadi taruh setiap nilai penting di label atau tabel `.sr-only`.',
    'Label kategori adalah teks asli di bawah setiap batang; buat singkat (Sen, Sel, A, B).',
    'Batang yang diredam adalah bantuan visual; jawaban yang disorot harus juga ada di judul atau label.',
  ],
  do: [
    'Mulai dari nol dan jaga lebar batang tetap sama.',
    'Sorot batang yang menjawab pertanyaan.',
    'Urutkan kategori menurut maknanya (hari berurutan) atau menurut nilainya, jangan acak.',
  ],
  dont: [
    'Memakai lebih dari 12 batang atau memutar label.',
    'Memberi warna berbeda untuk setiap batang.',
    'Menumpuk atau mengelompokkan batang secara manual di markup `.bars`; gambar dari data dengan `data-lds-chart`.',
  ],
  js: 'Batang HTML tidak butuh script (`data-lds-grow` menambahkan animasi masuk). Batang berkelompok, bertumpuk, dan divergen: `data-lds-chart` dengan `kind: "bar"`, atau `drawChart(el, config)`; lihat [area chart](area-chart) untuk semua opsinya.',
};
