# Line chart

Kelompok: Grafik. https://lampung.kartadinata.app/docs/components/line-chart

Satu garis per seri sepanjang waktu, pada SVG dengan garis grid yang samar dan label di ujung garis. Untuk tren dengan banyak titik; paling banyak empat seri, seri kedua putus-putus.

## Pakai saat
- Menunjukkan perubahan nilai dari waktu ke waktu dan membandingkan sampai empat seri: skor puskesmas ini dibanding rata-rata kota, penumpang bus per bulan tahun ini dan tahun lalu.
- Sepuluh titik atau lebih ketika bentuk trennya lebih penting daripada satu nilai.

## Pakai yang lain saat
- Tren kecil di bawah satu angka utama: pakai [Sparkline stat](sparkline-stat.md).
- Beberapa kelompok terpisah untuk dibandingkan: pakai [Bar chart](bar-chart.md).
- Aktivitas harian selama berminggu-minggu atau berbulan-bulan: pakai [Heatmap](heatmap.md).
- Porsi dari satu keseluruhan: pakai [Donut](donut.md).
- Linimasa kejadian, bukan nilai: pakai [Timeline](timeline.md).

## Letaknya
Selebar `.chart-card` di laporan atau kolom utama; svg menyesuaikan lebar kartu. Di ponsel tampilkan lebih sedikit periode (6 minggu terakhir) daripada memadatkan label, dan pertahankan label di ujung garis.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `svg[viewBox][role=img]` | Wajib. viewBox tetap (1000 x 260 di sini) yang menyesuaikan lebar kartu; `aria-label` berisi kesimpulannya. |
| `.axis-line / .axis-text` | Garis grid (`--hairline`, 1 px) dan label tick (11 px `--text-muted`). Hanya garis grid horizontal. |
| `.series-line` | Wajib. Seri 1, 2,25 px, sambungan membulat, `--series-1`. |
| `.series-line--2` | Seri pembanding: 1,75 px, putus-putus 4 4, `--series-4`. Putus-putusnya membedakan seri tanpa bergantung pada warna. |
| `.series-area` | Opsional. Isian 8 % di bawah seri 1 saja. |
| `.draw` | Opsional. Menggambar garis sekali; pasangkan dengan `pathLength="1200"`. |
| `.ctip` | Opsional. Tooltip crosshair, diposisikan absolut di wrapper `position: relative`; Anda yang menggerakkannya. |

## Markup

**Dua seri dengan crosshair.** Gerakkan kursor di atas plot: crosshair menempel ke minggu terdekat dan tip menampilkan kedua nilainya. Label di ujung garis membuat legenda tidak wajib.
```html
<div class="chart-card">
  <div class="cluster" style="justify-content: space-between; align-items: flex-start;">
    <div><div class="chart-card__q">Apakah layanan kita setara dengan puskesmas lain?</div><div class="chart-card__sub">Skor kepuasan pasien per minggu, puskesmas ini dibanding rata-rata kota</div></div>
    <div class="legend"><span><i style="background: var(--series-1); height: 3px; border-radius: 2px;"></i>Puskesmas ini</span><span><i style="background: var(--series-4); height: 3px; border-radius: 2px;"></i>Rata-rata kota</span></div>
  </div>
  <div style="position: relative; padding-top: 44px;">
    <svg viewBox="0 0 1000 260" style="width: 100%; height: auto; display: block;" role="img" aria-label="Skor kepuasan pasien per minggu selama 10 minggu. Puskesmas ini naik dari 62 ke 84; rata-rata kota naik dari 64 ke 75.">
      <line class="axis-line" x1="44" x2="1000" y1="232" y2="232"></line><text class="axis-text" x="0" y="236">50</text>
      <line class="axis-line" x1="44" x2="1000" y1="177" y2="177"></line><text class="axis-text" x="0" y="181">60</text>
      <line class="axis-line" x1="44" x2="1000" y1="122" y2="122"></line><text class="axis-text" x="0" y="126">70</text>
      <line class="axis-line" x1="44" x2="1000" y1="67" y2="67"></line><text class="axis-text" x="0" y="71">80</text>
      <line class="axis-line" x1="44" x2="1000" y1="12" y2="12"></line><text class="axis-text" x="0" y="16">90</text>
      <text class="axis-text" x="44" y="256" text-anchor="middle">M1</text><text class="axis-text" x="139.1" y="256" text-anchor="middle">M2</text><text class="axis-text" x="234.2" y="256" text-anchor="middle">M3</text><text class="axis-text" x="329.3" y="256" text-anchor="middle">M4</text><text class="axis-text" x="424.4" y="256" text-anchor="middle">M5</text><text class="axis-text" x="519.6" y="256" text-anchor="middle">M6</text><text class="axis-text" x="614.7" y="256" text-anchor="middle">M7</text><text class="axis-text" x="709.8" y="256" text-anchor="middle">M8</text><text class="axis-text" x="804.9" y="256" text-anchor="middle">M9</text><text class="axis-text" x="900" y="256" text-anchor="middle">M10</text>
      <path class="series-area" d="M44 166 L139.1 133 L234.2 149.5 L329.3 116.5 L424.4 100 L519.6 122 L614.7 78 L709.8 61.5 L804.9 72.5 L900 45 L900 232 L44 232 Z"></path>
      <path class="series-line series-line--2" d="M44 155 L139.1 144 L234.2 138.5 L329.3 133 L424.4 122 L519.6 127.5 L614.7 111 L709.8 105.5 L804.9 100 L900 94.5"></path>
      <path class="series-line draw" pathLength="1200" d="M44 166 L139.1 133 L234.2 149.5 L329.3 116.5 L424.4 100 L519.6 122 L614.7 78 L709.8 61.5 L804.9 72.5 L900 45"></path>
      <text x="1000" y="49" text-anchor="end" style="font: 500 12px var(--font); fill: var(--text-strong);">Kami 84</text>
      <text x="1000" y="98.5" text-anchor="end" style="font: 500 12px var(--font); fill: var(--text-subtle);">Kota 75</text>
    </svg>
  </div>
</div>
```

**Digambar dari data.** Tiga puskesmas dan batas minimum putus-putus dari satu config: garis tergambar sekali, crosshair membaca setiap puskesmas, tombol panah berfungsi saat fokus, legenda bisa mematikan puskesmas, dan tabel tersembunyi memuat semua nilai.
```html
<section class="chart-card" aria-labelledby="lc-trio"><div><div class="chart-card__q" id="lc-trio">Puskesmas mana yang paling cepat membaik?</div><div class="chart-card__sub">Rata-rata skor kepuasan pasien per minggu, dari 100</div></div><div class="chart" data-lds-chart='{"label":"Rata-rata skor kepuasan per minggu di tiga puskesmas selama 10 minggu. Puskesmas A naik dari 61 ke 82; B dan C berakhir di sekitar 74.","x":["M1","M2","M3","M4","M5","M6","M7","M8","M9","M10"],"xFull":["Minggu 1","Minggu 2","Minggu 3","Minggu 4","Minggu 5","Minggu 6","Minggu 7","Minggu 8","Minggu 9","Minggu 10"],"xName":"Minggu","kind":"line","series":[{"name":"Puskesmas A","values":[61,64,66,70,71,74,77,78,80,82]},{"name":"Puskesmas B","values":[66,67,69,68,70,72,71,73,74,74]},{"name":"Puskesmas C","values":[70,69,71,72,71,73,72,74,73,75]},{"name":"Batas minimum","values":[65,65,65,65,65,65,65,65,65,65],"dashed":true,"color":"neutral"}],"y":{"min":50,"max":90},"height":220}'></div></section>
```

## Varian dan ukuran
| Kelas atau atribut | Kapan |
|---|---|
| `.series-line` | Seri utama. |
| `.series-line--2` | Pembanding atau rata-rata, putus-putus. |
| `style="stroke: var(--series-2|3)"` | Seri ketiga dan keempat, garis penuh, dengan urutan tetap. |

## Status
| Status | Caranya |
|---|---|
| `hover` | Garis crosshair dengan `--line-strong`, titik di setiap seri, `.ctip` berisi minggu dan nilainya. Rangkai sendiri; lihat contohnya. |
| `loading, empty, error` | Lihat [state grafik](chart-states.md). |

## Gerak dan mikrointeraksi
- Saat pertama terlihat: `.draw` menganimasikan stroke dash offset dari 1200 ke 0 selama 1,2 s dengan `--ease-inout`. Tanpa `pathLength="1200"` path yang panjang hanya tergambar sebagian atau selesai terlalu cepat.
- Tooltip bergeser antarminggu (`left` selama `--d-standard` dengan `--ease-standard`) dan memudar selama `--d-instant`.
- Pembaruan data mengganti path tanpa menggambar ulang. Reduced motion: garis langsung tampil utuh dan tip melompat.

## Aksesibilitas
- svg punya `role="img"` dan `aria-label` yang menyebut tren serta nilai awal dan akhirnya.
- Crosshair hanya untuk pointer; sediakan nilainya di tabel `.sr-only` atau tombol "Tampilkan sebagai tabel" yang terlihat.
- Seri dibedakan lebih dari warna: yang kedua putus-putus, dan setiap garis diberi label di ujungnya dengan token teks.
- Tooltip memakai `aria-hidden`; isinya mengulang informasi yang harus tersedia di tempat lain.

## Lakukan
- Beri label langsung di ujung garis ("Kami 84").
- Jaga rentang y tetap jujur dan sebutkan satuannya di subjudul.
- Pakai gaya putus-putus untuk rata-rata atau periode sebelumnya.

## Hindari
- Memplot lebih dari empat seri; gabungkan sisanya ke Lainnya atau pecah grafiknya.
- Menghaluskan garis dengan kurva yang mengarang nilai di antara titik.
- Menggambar garis grid vertikal atau bingkai kotak.

## Perilaku (HTML biasa)
Digambar dari data: `data-lds-chart` dengan `kind: "line"` (atau `drawChart(el, config)`) memberi animasi menggambar, crosshair, pembacaan dengan keyboard, toggle legenda, dan tabel tersembunyi; lihat [area chart](area-chart.md). svg tulisan tangan: `data-lds-crosshair` pada `.plot` menggerakkan `.cross` dan `.ctip` ke titik `[data-x]` terdekat.

## Terkait
[Chart principles](chart-principles.md) · [Sparkline stat](sparkline-stat.md) · [Bar chart](bar-chart.md) · [Chart states](chart-states.md)
