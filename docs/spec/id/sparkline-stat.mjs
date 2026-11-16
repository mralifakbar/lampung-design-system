// Sparkline paths for a 220 x 64 box.
const spark = (data, lo, hi) => {
  const x = (i) => +(4 + i * (212 / (data.length - 1))).toFixed(1);
  const y = (v) => +(60 - ((v - lo) / (hi - lo)) * 52).toFixed(1);
  const line = data.map((v, i) => `${i ? 'L' : 'M'}${x(i)} ${y(v)}`).join(' ');
  const last = data.length - 1;
  return { line, area: `${line} L${x(last)} 64 L${x(0)} 64 Z`, ex: x(last), ey: y(data[last]) };
};
const att = spark([88, 87, 89, 88, 90, 89, 91, 90, 92, 91, 93, 92], 85, 94);
const hrs = spark([14, 12, 11, 12, 10, 9, 10, 8, 9, 7, 8, 7], 5, 15);

const card = ({ q, sub, big, badge, s, label }) => `<div class="chart-card">
  <div><div class="chart-card__q">${q}</div><div class="chart-card__sub">${sub}</div></div>
  <div class="cluster" style="justify-content: space-between; align-items: flex-end; --gap: 20px;">
    <div><div class="chart-card__big">${big}</div>${badge}</div>
    <svg viewBox="0 0 220 64" style="width: 220px; max-width: 100%; height: 64px;" role="img" aria-label="${label}">
      <path class="series-area" d="${s.area}"></path>
      <path class="series-line draw" pathLength="1200" d="${s.line}"></path>
      <circle cx="${s.ex}" cy="${s.ey}" r="4" fill="var(--series-1)" stroke="var(--bg-base)" stroke-width="2"></circle>
    </svg>
  </div>
</div>`;

export default {
  summary: 'Satu angka utama dengan keterangan arahnya dan garis kecil riwayat terbarunya, di dalam kartu grafik. Angkanya yang utama; sparkline hanya menunjukkan bentuk trennya.',
  when: [
    'Tile dasbor untuk satu metrik yang sering dicek, ketika tren sama pentingnya dengan nilai: laporan selesai tepat waktu, waktu tunggu rata-rata, skor kepuasan.',
    'Deretan dua sampai empat tile seperti itu di bagian atas laporan.',
  ],
  whenNot: [
    ['Beberapa angka kunci tanpa riwayat untuk ditampilkan', 'stat-row', 'Tidak perlu kartu; deretan angka biasa lebih tenang.'],
    ['Pembaca perlu membaca nilai pada waktu tertentu', 'line-chart'],
    ['Kemajuan menuju target', 'progress-ring'],
    ['Angka yang bertambah secara langsung', 'rolling-number'],
    ['Membandingkan metrik antar kategori', 'bar-chart'],
  ],
  where: 'Di bagian atas dasbor atau laporan, dalam `auto-grid` dengan `--min: 300px`. Di ponsel tile bertumpuk selebar layar; sparkline tetap setinggi 64 px dan menyempit lebarnya.',
  anatomy: [
    ['.chart-card', 'Wajib. Tile-nya.'],
    ['.chart-card__q / __sub', 'Wajib. Pertanyaan dan periodenya ("Laporan selesai tepat waktu, 12 minggu terakhir").'],
    ['.chart-card__big', 'Wajib. Nilai saat ini, 32 px tabular.'],
    ['.badge', 'Disarankan. Perubahan dalam kata dengan `trending_up` atau `trending_down`, diwarnai menurut baik atau buruknya, bukan arahnya.'],
    ['svg[role=img]', 'Wajib. viewBox 220 x 64 dengan `.series-area`, `.series-line` (`.draw` agar tergambar sekali) dan titik di ujung.'],
  ],
  examples: [
    {
      title: 'Naik dan baik',
      desc: 'Garis tergambar sekali; titik di ujung menandai nilai yang ditampilkan.',
      html: `<div class="auto-grid" style="--min: 300px;">
${card({ q: 'Seberapa cepat laporan warga selesai?', sub: 'Laporan selesai tepat waktu, 12 minggu terakhir', big: '92%', badge: '<div class="badge badge--success" style="margin-top: 8px;"><span class="ic" aria-hidden="true">trending_up</span>4 poin di atas awal tahun</div>', s: att, label: 'Laporan selesai tepat waktu naik dari 88 ke 92 persen dalam 12 minggu' })}
${card({ q: 'Berapa lama antrean di loket?', sub: 'Waktu tunggu rata-rata per minggu, 12 minggu terakhir', big: '7 mnt', badge: '<div class="badge badge--warning" style="margin-top: 8px;"><span class="ic" aria-hidden="true">trending_down</span>Separuh dari minggu 1</div>', s: hrs, label: 'Waktu tunggu turun dari 14 ke 7 menit per minggu dalam 12 minggu' })}
</div>`,
    },
  ],
  states: [
    ['loading', 'Blok skeleton untuk angka dan garisnya; lihat [state grafik](chart-states).'],
    ['no history', 'Jika titiknya kurang dari tiga, hilangkan sparkline dan tampilkan angkanya saja.'],
    ['bad trend', '`badge--warning` atau `badge--danger` dengan ikon arah; turun bisa berarti baik (lebih sedikit laporan terlambat), jadi warnai menurut maknanya.'],
  ],
  motion: [
    'Saat pertama terlihat: garis tergambar dengan `.draw` (stroke dash offset ke 0 selama 1,2 s dengan `--ease-inout`). Beri path `pathLength="1200"` agar dash pas dengan panjangnya.',
    'Pembaruan nilai tidak menggambar ulang; ganti angkanya dengan [number count](number-count) atau [rolling number](rolling-number).',
    'Reduced motion: garis langsung tampil utuh.',
  ],
  a11y: [
    'svg memakai `role="img"` dengan `aria-label` yang menyebut nilai awal, akhir, dan periodenya. Angka dan badge adalah teks asli.',
    'Badge menyebut arahnya dengan kata; ikonnya dekoratif.',
    'Jangan jadikan tile sebagai tautan kecuali membuka grafik lengkapnya; jika begitu, seluruh kartu menjadi tautan dengan pertanyaan sebagai namanya.',
  ],
  do: [
    'Dahulukan angkanya; biarkan garisnya kecil dan tanpa label.',
    'Sebutkan pembanding perubahannya ("di atas awal tahun").',
  ],
  dont: [
    'Menambah sumbu, tick, atau tooltip pada sparkline.',
    'Mewarnai badge hijau hanya karena garisnya naik.',
    'Menampilkan lebih dari empat tile dalam satu baris.',
  ],
};
