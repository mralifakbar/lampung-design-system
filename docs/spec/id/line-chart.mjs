import { cfg } from '../_chart-data.mjs';
// Weekly service satisfaction scores, plotted in a 1000 x 260 viewBox: plot from x 44 to 900, y 12 (90) to 232 (50).
const you = [62, 68, 65, 71, 74, 70, 78, 81, 79, 84];
const cls = [64, 66, 67, 68, 70, 69, 72, 73, 74, 75];
const X = (i) => +(44 + i * (856 / 9)).toFixed(1);
const Y = (v) => +(232 - ((v - 50) / 40) * 220).toFixed(1);
const path = (d) => d.map((v, i) => `${i ? 'L' : 'M'}${X(i)} ${Y(v)}`).join(' ');
const area = `${path(you)} L${X(9)} 232 L${X(0)} 232 Z`;
const ticks = [50, 60, 70, 80, 90].map((t) => `<line class="axis-line" x1="44" x2="1000" y1="${Y(t)}" y2="${Y(t)}"></line><text class="axis-text" x="0" y="${Y(t) + 4}">${t}</text>`).join('\n      ');
const xt = you.map((_, i) => `<text class="axis-text" x="${X(i)}" y="256" text-anchor="middle">M${i + 1}</text>`).join('');
const pts = JSON.stringify(you.map((v, i) => [v, cls[i]]));

const move = `const r = this.getBoundingClientRect(), d = JSON.parse(this.dataset.pts), n = d.length - 1;
const i = Math.max(0, Math.min(n, Math.round(((event.clientX - r.left) / r.width * 1000 - 44) / (856 / n))));
const x = 44 + i * 856 / n, y = (v) => 232 - (v - 50) / 40 * 220, s = this.querySelector('svg');
s.querySelector('[data-cross]').setAttribute('x1', x); s.querySelector('[data-cross]').setAttribute('x2', x);
s.querySelector('[data-p1]').setAttribute('cx', x); s.querySelector('[data-p1]').setAttribute('cy', y(d[i][0]));
s.querySelector('[data-p2]').setAttribute('cx', x); s.querySelector('[data-p2]').setAttribute('cy', y(d[i][1]));
s.querySelectorAll('[data-hover]').forEach((e) => e.style.opacity = 1);
const t = this.querySelector('.ctip'); t.textContent = 'Minggu ' + (i + 1) + ': puskesmas ini ' + d[i][0] + ', rata-rata kota ' + d[i][1];
t.style.opacity = 1; t.style.left = Math.max(0, Math.min(r.width - t.offsetWidth, x / 1000 * r.width - t.offsetWidth / 2)) + 'px';`.replace(/\n/g, ' ');
const leave = `this.querySelector('.ctip').style.opacity = 0; this.querySelectorAll('[data-hover]').forEach((e) => e.style.opacity = 0);`;

const chart = (interactive) => `<div class="chart-card">
  <div class="cluster" style="justify-content: space-between; align-items: flex-start;">
    <div><div class="chart-card__q">Apakah layanan kita setara dengan puskesmas lain?</div><div class="chart-card__sub">Skor kepuasan pasien per minggu, puskesmas ini dibanding rata-rata kota</div></div>
    <div class="legend"><span><i style="background: var(--series-1); height: 3px; border-radius: 2px;"></i>Puskesmas ini</span><span><i style="background: var(--series-4); height: 3px; border-radius: 2px;"></i>Rata-rata kota</span></div>
  </div>
  <div style="position: relative; padding-top: 44px;"${interactive ? ` data-pts='${pts}' onmousemove="${move}" onmouseleave="${leave}"` : ''}>
    <svg viewBox="0 0 1000 260" style="width: 100%; height: auto; display: block;" role="img" aria-label="Skor kepuasan pasien per minggu selama 10 minggu. Puskesmas ini naik dari 62 ke 84; rata-rata kota naik dari 64 ke 75.">
      ${ticks}
      ${xt}
      <path class="series-area" d="${area}"></path>
      <path class="series-line series-line--2" d="${path(cls)}"></path>
      <path class="series-line draw" pathLength="1200" d="${path(you)}"></path>
      <text x="1000" y="${Y(84) + 4}" text-anchor="end" style="font: 500 12px var(--font); fill: var(--text-strong);">Kami 84</text>
      <text x="1000" y="${Y(75) + 4}" text-anchor="end" style="font: 500 12px var(--font); fill: var(--text-subtle);">Kota 75</text>${interactive ? `
      <line data-cross data-hover class="axis-line" x1="0" x2="0" y1="12" y2="232" style="opacity: 0; stroke: var(--line-strong);"></line>
      <circle data-p2 data-hover r="5" cx="0" cy="0" fill="var(--series-4)" stroke="var(--bg-base)" stroke-width="2" style="opacity: 0;"></circle>
      <circle data-p1 data-hover r="5" cx="0" cy="0" fill="var(--series-1)" stroke="var(--bg-base)" stroke-width="2" style="opacity: 0;"></circle>` : ''}
    </svg>${interactive ? `
    <div class="ctip" style="opacity: 0; left: 0;" aria-hidden="true"></div>` : ''}
  </div>
</div>`;

const trio = {
  label: 'Rata-rata skor kepuasan per minggu di tiga puskesmas selama 10 minggu. Puskesmas A naik dari 61 ke 82; B dan C berakhir di sekitar 74.',
  x: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10'], xFull: ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4', 'Minggu 5', 'Minggu 6', 'Minggu 7', 'Minggu 8', 'Minggu 9', 'Minggu 10'], xName: 'Minggu', kind: 'line',
  series: [{ name: 'Puskesmas A', values: [61, 64, 66, 70, 71, 74, 77, 78, 80, 82] }, { name: 'Puskesmas B', values: [66, 67, 69, 68, 70, 72, 71, 73, 74, 74] }, { name: 'Puskesmas C', values: [70, 69, 71, 72, 71, 73, 72, 74, 73, 75] }, { name: 'Batas minimum', values: Array(10).fill(65), dashed: true, color: 'neutral' }],
  y: { min: 50, max: 90 }, height: 220,
};

export default {
  summary: 'Satu garis per seri sepanjang waktu, pada SVG dengan garis grid yang samar dan label di ujung garis. Untuk tren dengan banyak titik; paling banyak empat seri, seri kedua putus-putus.',
  when: [
    'Menunjukkan perubahan nilai dari waktu ke waktu dan membandingkan sampai empat seri: skor puskesmas ini dibanding rata-rata kota, penumpang bus per bulan tahun ini dan tahun lalu.',
    'Sepuluh titik atau lebih ketika bentuk trennya lebih penting daripada satu nilai.',
  ],
  whenNot: [
    ['Tren kecil di bawah satu angka utama', 'sparkline-stat'],
    ['Beberapa kelompok terpisah untuk dibandingkan', 'bar-chart'],
    ['Aktivitas harian selama berminggu-minggu atau berbulan-bulan', 'heatmap'],
    ['Porsi dari satu keseluruhan', 'donut'],
    ['Linimasa kejadian, bukan nilai', 'timeline'],
  ],
  where: 'Selebar `.chart-card` di laporan atau kolom utama; svg menyesuaikan lebar kartu. Di ponsel tampilkan lebih sedikit periode (6 minggu terakhir) daripada memadatkan label, dan pertahankan label di ujung garis.',
  anatomy: [
    ['svg[viewBox][role=img]', 'Wajib. viewBox tetap (1000 x 260 di sini) yang menyesuaikan lebar kartu; `aria-label` berisi kesimpulannya.'],
    ['.axis-line / .axis-text', 'Garis grid (`--hairline`, 1 px) dan label tick (11 px `--text-muted`). Hanya garis grid horizontal.'],
    ['.series-line', 'Wajib. Seri 1, 2,25 px, sambungan membulat, `--series-1`.'],
    ['.series-line--2', 'Seri pembanding: 1,75 px, putus-putus 4 4, `--series-4`. Putus-putusnya membedakan seri tanpa bergantung pada warna.'],
    ['.series-area', 'Opsional. Isian 8 % di bawah seri 1 saja.'],
    ['.draw', 'Opsional. Menggambar garis sekali; pasangkan dengan `pathLength="1200"`.'],
    ['.ctip', 'Opsional. Tooltip crosshair, diposisikan absolut di wrapper `position: relative`; Anda yang menggerakkannya.'],
  ],
  examples: [
    {
      title: 'Dua seri dengan crosshair',
      desc: 'Gerakkan kursor di atas plot: crosshair menempel ke minggu terdekat dan tip menampilkan kedua nilainya. Label di ujung garis membuat legenda tidak wajib.',
      html: chart(true),
      code: chart(false),
    },
    {
      title: 'Digambar dari data',
      desc: 'Tiga puskesmas dan batas minimum putus-putus dari satu config: garis tergambar sekali, crosshair membaca setiap puskesmas, tombol panah berfungsi saat fokus, legenda bisa mematikan puskesmas, dan tabel tersembunyi memuat semua nilai.',
      html: `<section class="chart-card" aria-labelledby="lc-trio"><div><div class="chart-card__q" id="lc-trio">Puskesmas mana yang paling cepat membaik?</div><div class="chart-card__sub">Rata-rata skor kepuasan pasien per minggu, dari 100</div></div><div class="chart" data-lds-chart='${cfg(trio)}'></div></section>`,
    },
  ],
  variants: [
    ['.series-line', 'Seri utama.'],
    ['.series-line--2', 'Pembanding atau rata-rata, putus-putus.'],
    ['style="stroke: var(--series-2|3)"', 'Seri ketiga dan keempat, garis penuh, dengan urutan tetap.'],
  ],
  states: [
    ['hover', 'Garis crosshair dengan `--line-strong`, titik di setiap seri, `.ctip` berisi minggu dan nilainya. Rangkai sendiri; lihat contohnya.'],
    ['loading, empty, error', 'Lihat [state grafik](chart-states).'],
  ],
  motion: [
    'Saat pertama terlihat: `.draw` menganimasikan stroke dash offset dari 1200 ke 0 selama 1,2 s dengan `--ease-inout`. Tanpa `pathLength="1200"` path yang panjang hanya tergambar sebagian atau selesai terlalu cepat.',
    'Tooltip bergeser antarminggu (`left` selama `--d-standard` dengan `--ease-standard`) dan memudar selama `--d-instant`.',
    'Pembaruan data mengganti path tanpa menggambar ulang. Reduced motion: garis langsung tampil utuh dan tip melompat.',
  ],
  a11y: [
    'svg punya `role="img"` dan `aria-label` yang menyebut tren serta nilai awal dan akhirnya.',
    'Crosshair hanya untuk pointer; sediakan nilainya di tabel `.sr-only` atau tombol "Tampilkan sebagai tabel" yang terlihat.',
    'Seri dibedakan lebih dari warna: yang kedua putus-putus, dan setiap garis diberi label di ujungnya dengan token teks.',
    'Tooltip memakai `aria-hidden`; isinya mengulang informasi yang harus tersedia di tempat lain.',
  ],
  do: [
    'Beri label langsung di ujung garis ("Kami 84").',
    'Jaga rentang y tetap jujur dan sebutkan satuannya di subjudul.',
    'Pakai gaya putus-putus untuk rata-rata atau periode sebelumnya.',
  ],
  dont: [
    'Memplot lebih dari empat seri; gabungkan sisanya ke Lainnya atau pecah grafiknya.',
    'Menghaluskan garis dengan kurva yang mengarang nilai di antara titik.',
    'Menggambar garis grid vertikal atau bingkai kotak.',
  ],
  js: 'Digambar dari data: `data-lds-chart` dengan `kind: "line"` (atau `drawChart(el, config)`) memberi animasi menggambar, crosshair, pembacaan dengan keyboard, toggle legenda, dan tabel tersembunyi; lihat [area chart](area-chart). svg tulisan tangan: `data-lds-crosshair` pada `.plot` menggerakkan `.cross` dan `.ctip` ke titik `[data-x]` terdekat.',
};
