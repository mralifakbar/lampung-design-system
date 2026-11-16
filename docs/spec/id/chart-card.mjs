import { days, wave, cfg, sum } from '../_chart-data.mjs';

// Business permit applications, filed online and at the service counter
const ID = { May: 'Mei', Aug: 'Agu', Oct: 'Okt', Dec: 'Des', Sun: 'Min', Mon: 'Sen', Tue: 'Sel', Wed: 'Rab', Thu: 'Kam', Fri: 'Jum', Sat: 'Sab' };
const loc = (s) => s.replace(/\b[A-Z][a-z]{2}\b/g, (w) => ID[w] || w);
const fmt = (v) => String(v).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
const d90 = days(90), web = wave(180, { base: 38, trend: 0.5, seed: 3 }), stall = wave(180, { base: 25, trend: 0.15, week: 0.3, seed: 7 });
const slice = (n) => ({ x: d90.short.slice(-n).map(loc), xFull: d90.long.slice(-n).map(loc), series: [{ name: 'Situs web', values: web.slice(-n) }, { name: 'Loket', values: stall.slice(-n) }] });
const total = (n) => sum(web.slice(-n)) + sum(stall.slice(-n));
const before = (n) => sum(web.slice(-2 * n, -n)) + sum(stall.slice(-2 * n, -n));
const change = (n) => `${Math.round((total(n) / before(n) - 1) * 100)}%`;
const set = (n, words) => ({ ...slice(n), figure: fmt(total(n)), delta: change(n), note: `dibanding ${words} sebelumnya`, label: `Permohonan izin per hari menurut saluran, ${words} terakhir: ${fmt(total(n))} seluruhnya.` });
const orders = {
  xName: 'Hari', stacked: true, total: true, height: 220,
  ...set(30, '30 hari'),
  sets: { '7d': set(7, '7 hari'), '30d': set(30, '30 hari'), '90d': set(90, '3 bulan') },
};

const menu = (id, name) => `<div style="position: relative;">
        <button class="icon-btn" aria-label="Aksi lain untuk ${name}" aria-haspopup="menu" aria-expanded="false" data-lds-menu="${id}"><span class="ic" aria-hidden="true">more_horiz</span></button>
        <div class="menu menu--right" id="${id}" role="menu" aria-label="${name}" style="top: calc(100% + 6px); right: 0;">
          <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">download</span>Unduh CSV</button>
          <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">content_copy</span>Salin tautan grafik</button>
        </div>
      </div>`;

const full = `<section class="chart-card" aria-labelledby="cc-orders-q">
  <div class="chart-card__head">
    <div class="chart-card__titles"><div class="chart-card__q" id="cc-orders-q">Lewat mana warga mengajukan izin usaha?</div><div class="chart-card__sub">Permohonan per hari, situs web dan loket</div></div>
    <div class="chart-card__actions">
      <div class="seg chart-card__range" role="group" aria-label="Periode" data-lds-segmented data-lds-chart-for="cc-orders">
        <span class="seg__thumb"></span>
        <button type="button" class="seg__btn" aria-pressed="false" data-set="7d">7 hari</button>
        <button type="button" class="seg__btn" aria-pressed="true" data-set="30d">30 hari</button>
        <button type="button" class="seg__btn" aria-pressed="false" data-set="90d">3 bulan</button>
      </div>
      ${menu('cc-orders-menu', 'Grafik permohonan izin')}
    </div>
  </div>
  <div class="chart-card__figure"><div class="chart-card__big" data-chart-figure>${fmt(total(30))}</div><span class="delta delta--pill delta--good" data-chart-delta><span class="ic" aria-hidden="true">arrow_upward</span>${change(30)}</span><span class="chart-card__sub" data-chart-note>dibanding 30 hari sebelumnya</span></div>
  <div class="chart" id="cc-orders" data-lds-chart='${cfg(orders)}'></div>
  <div class="chart-card__foot"><span>Diperbarui 16 Nov 2026, 09.40</span><a class="btn btn--plain btn--sm" href="#cc-orders-q">Buka laporan permohonan<span class="ic" aria-hidden="true">chevron_right</span></a></div>
</section>`;

const cats = { label: 'Kunjungan puskesmas per hari minggu ini. Kamis paling ramai dengan 31 kunjungan.', x: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'], series: [{ name: 'Kunjungan', values: [18, 24, 22, 31, 27, 12, 6], kind: 'bar' }], highlight: 3, height: 180 };
const scores = { label: 'Rata-rata skor kepuasan layanan per minggu. Tahun ini naik dari 64 ke 81; tahun lalu bertahan di sekitar 70.', x: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8'], kind: 'line', series: [{ name: 'Tahun ini', values: [64, 67, 66, 71, 74, 73, 78, 81] }, { name: 'Tahun lalu', values: [68, 70, 69, 71, 70, 72, 71, 70], dashed: true, color: 4 }], y: { min: 50, max: 90 }, height: 180 };

export default {
  summary: 'Bingkai untuk setiap grafik di dasbor: pertanyaan sebagai judul, apa yang diukur di bawahnya, lalu aksi opsional (kontrol periode, menu), angka utama beserta perubahannya, grafik, dan footer berisi waktu data atau tautan ke laporan lengkap.',
  when: [
    'Grafik apa pun di halaman dasbor atau laporan: kartu memberi grafik sebuah pertanyaan, periode, dan tempat untuk satu angka yang dicari pembaca.',
    'Pembaca perlu mengganti periode (7 hari, 30 hari, 3 bulan) atau mengekspor data tanpa meninggalkan dasbor.',
    'Beberapa grafik berada dalam satu grid dan butuh header, jarak, dan footer yang sama agar halaman terbaca sebagai satu sistem.',
  ],
  whenNot: [
    ['Satu metrik dengan perubahannya dan tren mini, dalam deretan empat', 'kpi-card'],
    ['Beberapa angka tanpa grafik', 'stat-row'],
    ['Grafik di dalam artikel atau isi laporan', 'line-chart', 'Letakkan plot langsung di kolom teks dengan keterangan; kartu di tengah tulisan terlihat seperti iklan.'],
    ['Grafik adalah seluruh halaman (laporan lengkap)', 'page-header', 'Header halaman memuat judul dan kontrol periode; grafik mengisi kolom.'],
  ],
  where: 'Dalam `auto-grid` dengan `--min: 320px` di dasbor, atau selebar halaman untuk deret waktu. Jangan pernah di dalam kartu lain. Header adalah container: di bawah 440 px kontrol periode turun ke bawah judul dan selebar kartu, menu tetap di ujung baris judul.',
  anatomy: [
    ['section.chart-card', 'Wajib. Padding 20 px, radius 18 px, ring `--line`, jarak 14 px antarbagian. `aria-labelledby` menunjuk ke pertanyaan.'],
    ['.chart-card__head', 'Opsional. Baris yang bisa membungkus: judul di awal, aksi di akhir. Size container untuk kontrol periode.'],
    ['.chart-card__titles', 'Berisi `.chart-card__q` (pertanyaan, wajib) dan `.chart-card__sub` (apa yang diukur, pada periode apa).'],
    ['.chart-card__actions', 'Opsional. `.seg.chart-card__range` untuk periode dan menu `.icon-btn`. Paling banyak satu tombol selain menu.'],
    ['.chart-card__figure', 'Opsional. `.chart-card__big` ditambah [trend delta](trend-delta) dan pembandingnya.'],
    ['.chart / .bars / .donut-chart …', 'Wajib. Grafiknya sendiri.'],
    ['.chart-card__foot', 'Opsional. Garis tipis, lalu waktu data di awal dan satu tautan biasa ke tampilan lengkap di akhir.'],
  ],
  examples: [
    {
      title: 'Kontrol periode, menu, angka, dan footer',
      desc: 'Ganti periodenya: area bertumpuk bergerak dari posisinya sekarang ke data baru, skala berpindah halus ke rentang barunya. Arahkan kursor ke plot (atau fokuskan lalu pakai tombol panah) untuk melihat hari, tiap saluran, dan totalnya. Klik item legenda untuk menyembunyikan satu saluran. Persempit jendela: kontrol periode pindah ke barisnya sendiri.',
      html: full,
    },
    {
      title: 'Satu baris dasbor',
      desc: 'Dua kartu berbagi satu grid. Grafik batang menyorot jawabannya; grafik garis membandingkan tahun ini dengan tahun lalu yang digambar putus-putus.',
      html: `<div class="auto-grid" style="--min: 300px;">
  <section class="chart-card" aria-labelledby="cc-busy">
    <div class="chart-card__head"><div class="chart-card__titles"><div class="chart-card__q" id="cc-busy">Hari apa puskesmas paling ramai?</div><div class="chart-card__sub">Kunjungan pasien per hari, minggu ini</div></div></div>
    <div class="chart" data-lds-chart='${cfg(cats)}'></div>
  </section>
  <section class="chart-card" aria-labelledby="cc-score">
    <div class="chart-card__head"><div class="chart-card__titles"><div class="chart-card__q" id="cc-score">Apakah kepuasan warga membaik?</div><div class="chart-card__sub">Rata-rata skor survei per minggu, dari 100</div></div></div>
    <div class="chart" data-lds-chart='${cfg(scores)}'></div>
    <div class="chart-card__foot"><span>Data contoh</span><a class="btn btn--plain btn--sm" href="#cc-score">Lihat semua survei<span class="ic" aria-hidden="true">chevron_right</span></a></div>
  </section>
</div>`,
    },
  ],
  variants: [
    ['.chart-card__range', 'Segmented control untuk dua sampai empat periode. Tambahkan `data-lds-chart-for="chartId"` dan `data-set` di tiap tombol untuk mengganti [grafik data](area-chart) ke `config.sets[key]`. Lebih dari empat periode: pakai pemilih [rentang tanggal](date-range).'],
    ['.chart-card__actions .icon-btn', 'Satu menu untuk ekspor, salin tautan, layar penuh. Jangan deretan tombol ikon.'],
    ['.chart-card__figure', 'Angka utama dan perubahannya. Hilangkan jika grafik tidak punya satu jawaban.'],
    ['.chart-card__foot', 'Waktu data dan satu tautan. Hilangkan jika tidak ada yang perlu disampaikan.'],
  ],
  states: [
    ['loading, empty, error', 'Kartu mempertahankan ukuran dan judulnya; lihat [state grafik](chart-states).'],
    ['refreshing', 'Pertahankan grafiknya; tampilkan [spinner](spinner) kecil di dekat judul selama data baru dimuat, lalu tanda bergerak ke data itu.'],
    ['period changed', 'Grafik beranimasi; perbarui angka dengan [rolling number](rolling-number) dan delta di tempatnya.'],
  ],
  motion: [
    'Thumb periode bergeser dengan `--spring-smooth` (segmented control).',
    'Grafik bergerak dari yang tampil ke data baru selama `--d-considered` (480 ms) dengan `--ease-inout`; jika diganti di tengah jalan, gerak dimulai dari bentuk saat ini.',
    'Menu terbuka dari sudutnya dengan resep overlay; kartunya sendiri tidak pernah bergerak.',
    'Reduced motion: data langsung melompat, thumb berganti dengan cross-fade.',
  ],
  a11y: [
    'Jadikan kartu sebuah `section` yang diberi label oleh pertanyaannya, agar grafik menjadi landmark yang bisa dituju.',
    'Kontrol periode adalah grup tombol toggle dengan `aria-pressed` dan label grup ("Periode").',
    'Tombol menu menyebut grafiknya: "Aksi lain untuk Grafik permohonan izin".',
    'Angka utama dan delta adalah teks asli; delta menyebut arahnya dengan kata untuk pembaca layar jika panah satu-satunya petunjuk (tambahkan `.sr-only` "naik" atau "turun").',
  ],
  do: [
    'Tulis judul sebagai pertanyaan yang dijawab grafik; taruh periode dan satuan di subjudul.',
    'Pertahankan urutan header yang sama di setiap kartu: judul, periode, menu.',
    'Sebutkan sekali di halaman bahwa angkanya contoh.',
  ],
  dont: [
    'Menaruh kartu grafik di dalam kartu lain, atau dua grafik dalam satu kartu.',
    'Menambah deretan tombol ikon; masukkan aksi tambahan ke menu.',
    'Memakai select untuk dua atau tiga periode; segmented control menampilkan semuanya.',
  ],
  js: '`data-lds-chart-for="chartId"` pada `.seg` (tombol dengan `data-set`) atau `<select>` native (option dengan `value`) memanggil `drawChart` pada grafik itu dengan `config.sets[key]`; lihat [area chart](area-chart) untuk config grafiknya. Sebuah set juga boleh membawa `figure`, `delta`, dan `note`: ketiganya mengganti teks `[data-chart-figure]`, `[data-chart-delta]`, dan `[data-chart-note]` di kartu yang sama, yang naik sekali. Grafik, legenda, crosshair, dan tabel berasal dari `data-lds-chart`.',
};
