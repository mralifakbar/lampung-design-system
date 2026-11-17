# Area chart

Kelompok: Grafik. https://lampung.kartadinata.app/docs/components/area-chart

Garis berisi isian sepanjang waktu, digambar dari data: satu seri dengan pembanding putus-putus, sampai empat seri bertumpuk menjadi total, atau anak tangga untuk nilai yang berubah dengan lompatan. Item legenda menyalakan dan mematikan seri; crosshair membaca semua seri sekaligus.

## Pakai saat
- Volume sepanjang waktu ketika jumlah di bawah garis itu penting: kunjungan, penumpang, pengaduan, permohonan.
- Bagian dari total sepanjang waktu, bertumpuk: pengaduan menurut saluran, permohonan menurut jenis, penumpang menurut koridor.
- Level yang berubah bertahap lalu bertahan: sisa kuota, stok obat, golongan tarif, peserta terdaftar.

## Pakai yang lain saat
- Membandingkan tren yang totalnya tidak bisa dijumlahkan: pakai [Line chart](line-chart.md). Isian yang bertumpuk saling menutupi; garis tidak.
- Beberapa kelompok terpisah (hari, kecamatan): pakai [Bar chart](bar-chart.md).
- Bagian dari satu keseluruhan pada satu waktu: pakai [Donut](donut.md).
- Tren kecil di bawah satu angka utama: pakai [KPI card](kpi-card.md).
- Aktivitas harian selama berbulan-bulan: pakai [Heatmap](heatmap.md).

## Letaknya
Di dalam [kartu grafik](chart-card.md), selebar kartu. svg digambar pada lebar kartu yang sebenarnya, jadi tick tetap 11 px dan label x menjarang di ponsel, bukan mengecil. Tinggi plot default 220 px; 180 sampai 200 di kartu setengah lebar.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.chart[data-lds-chart]` | Wajib. Wadahnya; `drawChart` mengisinya dengan legenda, plot, dan tabel tersembunyi. Beri `id` jika dikendalikan kontrol periode. |
| `.chart__legend.legend--toggle` | Dibuat otomatis jika ada dua seri atau lebih. Satu `.legend__btn[aria-pressed]` per seri; paling tidak satu tetap menyala. |
| `.chart__plot` | Dibuat otomatis. `role="img"` yang bisa difokus dengan label; memuat svg dan tooltip `.ctip`. |
| `.axis-line / .axis-text` | Garis grid horizontal pada langkah yang rapi (1, 2, 2,5, 5 × 10ⁿ) dan labelnya; `.axis-line--zero` jika skala turun di bawah nol. |
| `.chart__area / .chart__line` | Satu pasang per seri: isian 12 % (24 % saat bertumpuk) di bawah garis 2 px, dengan `--series-n`. Tanpa gradien. |
| `.chart__series.is-dashed` | Pembanding: garis putus-putus tanpa isian. |
| `.chart__ref` | Garis acuan putus-putus dengan keterangannya di ujung: target, batas. |
| `.cross / .chart__dot / .ctip` | Crosshair, titik di setiap seri yang tampil, dan tooltip berisi tanggal, setiap seri, dan total opsional. |
| `table.sr-only` | Dibuat otomatis. Setiap nilai, dengan label sebagai caption. |

## Markup

**Bulan ini dibanding bulan lalu.** Satu seri berisi dan pembanding putus-putus. Isian tumbuh dari garis dasar saat pertama terlihat; garis putus-putus muncul memudar. Arahkan kursor ke plot, atau fokuskan lalu pakai tombol panah.
```html
<section class="chart-card" aria-labelledby="ac-visits">
  <div class="chart-card__head"><div class="chart-card__titles"><div class="chart-card__q" id="ac-visits">Apakah penumpang bus kota bertambah?</div><div class="chart-card__sub">Penumpang per hari, November dibanding Oktober</div></div></div>
  <div class="chart" data-lds-chart='{"label":"Penumpang bus kota per hari. Bulan ini 27.830, 18% lebih banyak dari bulan lalu.","x":["18 Okt","19 Okt","20 Okt","21 Okt","22 Okt","23 Okt","24 Okt","25 Okt","26 Okt","27 Okt","28 Okt","29 Okt","30 Okt","31 Okt","1 Nov","2 Nov","3 Nov","4 Nov","5 Nov","6 Nov","7 Nov","8 Nov","9 Nov","10 Nov","11 Nov","12 Nov","13 Nov","14 Nov","15 Nov","16 Nov"],"xFull":["Min 18 Okt","Sen 19 Okt","Sel 20 Okt","Rab 21 Okt","Kam 22 Okt","Jum 23 Okt","Sab 24 Okt","Min 25 Okt","Sen 26 Okt","Sel 27 Okt","Rab 28 Okt","Kam 29 Okt","Jum 30 Okt","Sab 31 Okt","Min 1 Nov","Sen 2 Nov","Sel 3 Nov","Rab 4 Nov","Kam 5 Nov","Jum 6 Nov","Sab 7 Nov","Min 8 Nov","Sen 9 Nov","Sel 10 Nov","Rab 11 Nov","Kam 12 Nov","Jum 13 Nov","Sab 14 Nov","Min 15 Nov","Sen 16 Nov"],"xName":"Hari","series":[{"name":"Bulan ini","values":[870,920,930,870,820,670,720,910,980,1050,1010,890,750,760,910,1050,1110,980,920,730,870,900,1090,1150,1070,930,850,900,1000,1220]},{"name":"Bulan lalu","values":[800,870,930,830,690,580,620,820,870,860,860,720,680,620,790,920,910,810,700,610,700,830,930,920,900,750,710,710,750,920],"kind":"line","dashed":true,"color":4}]}'></div>
</section>
```

**Bertumpuk menjadi total.** Tiga saluran bertumpuk menjadi seluruh pengaduan. Matikan satu saluran di legenda: pitanya menyusut dan skala berpindah halus ke total baru. Tooltip mencantumkan pita teratas lebih dulu, lalu totalnya.
```html
<section class="chart-card" aria-labelledby="ac-devices">
  <div class="chart-card__head"><div class="chart-card__titles"><div class="chart-card__q" id="ac-devices">Lewat mana warga mengadu?</div><div class="chart-card__sub">Pengaduan per hari menurut saluran, 14 hari terakhir</div></div></div>
  <div class="chart" data-lds-chart='{"label":"Pengaduan warga per hari menurut saluran, 14 hari terakhir. Aplikasi ponsel menampung lebih dari separuh pengaduan.","x":["3 Nov","4 Nov","5 Nov","6 Nov","7 Nov","8 Nov","9 Nov","10 Nov","11 Nov","12 Nov","13 Nov","14 Nov","15 Nov","16 Nov"],"xFull":["Sel 3 Nov","Rab 4 Nov","Kam 5 Nov","Jum 6 Nov","Sab 7 Nov","Min 8 Nov","Sen 9 Nov","Sel 10 Nov","Rab 11 Nov","Kam 12 Nov","Jum 13 Nov","Sab 14 Nov","Min 15 Nov","Sen 16 Nov"],"xName":"Hari","stacked":true,"total":true,"series":[{"name":"Aplikasi ponsel","values":[405,435,450,465,390,385,410,460,505,510,510,475,430,485]},{"name":"Situs web","values":[250,330,345,285,230,170,205,250,315,335,305,240,175,215]},{"name":"Telepon","values":[65,80,80,75,65,60,60,65,75,80,75,70,65,60]}]}'></div>
</section>
```

**Anak tangga dan garis acuan.** Kuota berubah dengan lompatan dan bertahan di antara pendaftaran, jadi tepinya berundak, bukan miring. Garis putus-putus menandai saat daftar tunggu dibuka.
```html
<div style="max-width: 560px;"><section class="chart-card" aria-labelledby="ac-seats">
  <div class="chart-card__head"><div class="chart-card__titles"><div class="chart-card__q" id="ac-seats">Seberapa cepat kuota vaksinasi terisi?</div><div class="chart-card__sub">Sisa kuota pada hari Senin, per jam</div></div></div>
  <div class="chart" data-lds-chart='{"label":"Sisa kuota vaksinasi hari Sabtu, per jam pada hari Senin. Turun dari 120 ke 34.","x":["08.00","09.00","10.00","11.00","12.00","13.00","14.00","15.00","16.00","17.00","18.00"],"xName":"Jam","step":true,"height":200,"series":[{"name":"Sisa kuota","values":[120,118,104,96,96,81,77,60,52,41,34]}],"refs":[{"value":40,"label":"Daftar tunggu dibuka di 40"}],"y":{"max":120,"ticks":4}}'></div>
</section></div>
```

## Varian dan ukuran
| Kelas atau atribut | Kapan |
|---|---|
| `stacked: true` | Seri bertumpuk berurutan, seri 1 di paling bawah. Nilai negatif bertumpuk di bawah nol. |
| `step: true` | Tepi horizontal lalu vertikal: nilai bertahan sampai berubah. |
| `series[].kind: "line", dashed: true` | Pembanding atau periode sebelumnya tanpa isian. |
| `series[].color` | 1 sampai 4 untuk `--series-n` (default: posisinya), `"neutral"` untuk Lainnya. |
| `refs: [{ value, label }]` | Garis acuan putus-putus; skala selalu mencakupnya. |
| `format: { prefix, suffix, decimals, compact }` | Cara nilai dibaca di tick, tooltip, dan tabel ("Rp", "%", 12.4k). |
| `xFull` | Label x yang lebih panjang untuk tooltip dan tabel ("Kam 12 Nov") sementara tick tetap pendek. |
| `y: { min, max, ticks, hide }` | Kunci skalanya (persentase sampai 100) atau sembunyikan label tick di kartu yang sempit. |

## Status
| Status | Caranya |
|---|---|
| `hover / focus` | Crosshair, titik, dan tooltip pada titik terdekat; tombol panah, Home, dan End memindahkannya dan mengumumkan nilainya. |
| `series off` | Tombol legenda `aria-pressed="false"`, swatch berongga, label diredam; seri menyusut (bertumpuk) atau memudar (bertindihan). |
| `data change` | `drawChart(el, next)` atau kontrol periode: tanda dan skala bergerak dari yang tampil. |
| `loading, empty, error` | Lihat [state grafik](chart-states.md): skeleton garis grid, lalu grafiknya. |

## Gerak dan mikrointeraksi
- Saat pertama terlihat: isian dan batang tumbuh dari garis dasar selama `--d-smooth` (560 ms) dengan kurva masuk; garis biasa tergambar sekali selama 1,2 s dengan `--ease-inout`; garis putus-putus memudar masuk.
- Perubahan data, toggle legenda, dan pergantian periode men-tween setiap nilai dan skala selama `--d-considered` (480 ms) dengan `--ease-inout`, dimulai dari nilai yang tampil, jadi klik kedua di tengah jalan mengubah arah tanpa lompatan. Jika jumlah titiknya berbeda, bentuk saat ini lebih dulu direntangkan ke titik-titik baru.
- Garis grid bergeser mengikuti skala; tooltip bergerak dengan `--ease-standard` dan memudar selama `--d-instant`.
- Reduced motion: tanpa tumbuh, tanpa menggambar, tanpa tween; nilai langsung berganti.

## Aksesibilitas
- Plot adalah satu gambar yang bisa difokus dan dinamai oleh `label`, yang sebaiknya menyebut kesimpulannya, bukan jenis grafiknya. Tombol panah membacakan setiap titik lewat live region bersama.
- Tabel tersembunyi berisi setiap nilai dibuat di bawah plot.
- Item legenda adalah tombol toggle dengan `aria-pressed`; mematikan yang terakhir ditolak dengan efek shake.
- Seri dibedakan lewat posisi dan gaya garis selain warna: pita bertumpuk menjaga urutannya, pembanding putus-putus.

## Lakukan
- Tumpuk hanya hal yang jumlahnya membentuk total yang bermakna.
- Pertahankan sumbu y di nol untuk area; isiannya menyiratkan jumlah.
- Taruh periodenya di subjudul kartu dan tanggal panjang di `xFull`.

## Hindari
- Menindihkan lebih dari dua area berisi; tumpuk atau pakai garis.
- Menghaluskan tepi menjadi kurva yang mengarang nilai di antara titik.
- Memakai lebih dari empat seri; gabungkan sisanya ke Lainnya (`color: "neutral"`).

## Perilaku (HTML biasa)
`<div class="chart" data-lds-chart='{ "label": "…", "x": [...], "series": [{ "name": "…", "values": [...] }] }'>` (atau anak `<script type="application/json">`) digambar oleh `init()`. Dari kode: `import { drawChart } from 'lampung-design-system'; const chart = drawChart(el, config); chart.update({ series })` beranimasi ke data baru; `chart.toggle(1)` menyalakan atau mematikan satu seri. Grafik digambar ulang pada lebar barunya saat wadahnya berubah ukuran.

## React
```tsx
import { Chart, Segmented } from 'lampung-design-system/react';

const [period, setPeriod] = useState<'7d' | '30d'>('30d');
<section className="chart-card" aria-labelledby="orders-q">
  <div className="chart-card__head">
    <div className="chart-card__titles"><div className="chart-card__q" id="orders-q">How do residents send complaints?</div></div>
    <div className="chart-card__actions"><Segmented className="chart-card__range" label="Period" value={period} onChange={setPeriod} options={[{ value: '7d', label: '7 days' }, { value: '30d', label: '30 days' }]} /></div>
  </div>
  <Chart config={{ label: 'Complaints per day by channel', stacked: true, x: data[period].x, series: data[period].series }} />
</section>
```

## Terkait
[Chart card](chart-card.md) · [Line chart](line-chart.md) · [Bar chart](bar-chart.md) · [Chart principles](chart-principles.md)
