# Sparkline stat

Kelompok: Grafik. https://lampung.kartadinata.app/docs/components/sparkline-stat

Satu angka utama dengan keterangan arahnya dan garis kecil riwayat terbarunya, di dalam kartu grafik. Angkanya yang utama; sparkline hanya menunjukkan bentuk trennya.

## Pakai saat
- Tile dasbor untuk satu metrik yang sering dicek, ketika tren sama pentingnya dengan nilai: laporan selesai tepat waktu, waktu tunggu rata-rata, skor kepuasan.
- Deretan dua sampai empat tile seperti itu di bagian atas laporan.

## Pakai yang lain saat
- Beberapa angka kunci tanpa riwayat untuk ditampilkan: pakai [Stat row](stat-row.md). Tidak perlu kartu; deretan angka biasa lebih tenang.
- Pembaca perlu membaca nilai pada waktu tertentu: pakai [Line chart](line-chart.md).
- Kemajuan menuju target: pakai [Progress ring](progress-ring.md).
- Angka yang bertambah secara langsung: pakai [Rolling number](rolling-number.md).
- Membandingkan metrik antar kategori: pakai [Bar chart](bar-chart.md).

## Letaknya
Di bagian atas dasbor atau laporan, dalam `auto-grid` dengan `--min: 300px`. Di ponsel tile bertumpuk selebar layar; sparkline tetap setinggi 64 px dan menyempit lebarnya.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.chart-card` | Wajib. Tile-nya. |
| `.chart-card__q / __sub` | Wajib. Pertanyaan dan periodenya ("Laporan selesai tepat waktu, 12 minggu terakhir"). |
| `.chart-card__big` | Wajib. Nilai saat ini, 32 px tabular. |
| `.badge` | Disarankan. Perubahan dalam kata dengan `trending_up` atau `trending_down`, diwarnai menurut baik atau buruknya, bukan arahnya. |
| `svg[role=img]` | Wajib. viewBox 220 x 64 dengan `.series-area`, `.series-line` (`.draw` agar tergambar sekali) dan titik di ujung. |

## Markup

**Naik dan baik.** Garis tergambar sekali; titik di ujung menandai nilai yang ditampilkan.
```html
<div class="auto-grid" style="--min: 300px;">
<div class="chart-card">
  <div><div class="chart-card__q">Seberapa cepat laporan warga selesai?</div><div class="chart-card__sub">Laporan selesai tepat waktu, 12 minggu terakhir</div></div>
  <div class="cluster" style="justify-content: space-between; align-items: flex-end; --gap: 20px;">
    <div><div class="chart-card__big">92%</div><div class="badge badge--success" style="margin-top: 8px;"><span class="ic" aria-hidden="true">trending_up</span>4 poin di atas awal tahun</div></div>
    <svg viewBox="0 0 220 64" style="width: 220px; max-width: 100%; height: 64px;" role="img" aria-label="Laporan selesai tepat waktu naik dari 88 ke 92 persen dalam 12 minggu">
      <path class="series-area" d="M4 42.7 L23.3 48.4 L42.5 36.9 L61.8 42.7 L81.1 31.1 L100.4 36.9 L119.6 25.3 L138.9 31.1 L158.2 19.6 L177.5 25.3 L196.7 13.8 L216 19.6 L216 64 L4 64 Z"></path>
      <path class="series-line draw" pathLength="1200" d="M4 42.7 L23.3 48.4 L42.5 36.9 L61.8 42.7 L81.1 31.1 L100.4 36.9 L119.6 25.3 L138.9 31.1 L158.2 19.6 L177.5 25.3 L196.7 13.8 L216 19.6"></path>
      <circle cx="216" cy="19.6" r="4" fill="var(--series-1)" stroke="var(--bg-base)" stroke-width="2"></circle>
    </svg>
  </div>
</div>
<div class="chart-card">
  <div><div class="chart-card__q">Berapa lama antrean di loket?</div><div class="chart-card__sub">Waktu tunggu rata-rata per minggu, 12 minggu terakhir</div></div>
  <div class="cluster" style="justify-content: space-between; align-items: flex-end; --gap: 20px;">
    <div><div class="chart-card__big">7 mnt</div><div class="badge badge--warning" style="margin-top: 8px;"><span class="ic" aria-hidden="true">trending_down</span>Separuh dari minggu 1</div></div>
    <svg viewBox="0 0 220 64" style="width: 220px; max-width: 100%; height: 64px;" role="img" aria-label="Waktu tunggu turun dari 14 ke 7 menit per minggu dalam 12 minggu">
      <path class="series-area" d="M4 13.2 L23.3 23.6 L42.5 28.8 L61.8 23.6 L81.1 34 L100.4 39.2 L119.6 34 L138.9 44.4 L158.2 39.2 L177.5 49.6 L196.7 44.4 L216 49.6 L216 64 L4 64 Z"></path>
      <path class="series-line draw" pathLength="1200" d="M4 13.2 L23.3 23.6 L42.5 28.8 L61.8 23.6 L81.1 34 L100.4 39.2 L119.6 34 L138.9 44.4 L158.2 39.2 L177.5 49.6 L196.7 44.4 L216 49.6"></path>
      <circle cx="216" cy="49.6" r="4" fill="var(--series-1)" stroke="var(--bg-base)" stroke-width="2"></circle>
    </svg>
  </div>
</div>
</div>
```

## Status
| Status | Caranya |
|---|---|
| `loading` | Blok skeleton untuk angka dan garisnya; lihat [state grafik](chart-states.md). |
| `no history` | Jika titiknya kurang dari tiga, hilangkan sparkline dan tampilkan angkanya saja. |
| `bad trend` | `badge--warning` atau `badge--danger` dengan ikon arah; turun bisa berarti baik (lebih sedikit laporan terlambat), jadi warnai menurut maknanya. |

## Gerak dan mikrointeraksi
- Saat pertama terlihat: garis tergambar dengan `.draw` (stroke dash offset ke 0 selama 1,2 s dengan `--ease-inout`). Beri path `pathLength="1200"` agar dash pas dengan panjangnya.
- Pembaruan nilai tidak menggambar ulang; ganti angkanya dengan [number count](number-count.md) atau [rolling number](rolling-number.md).
- Reduced motion: garis langsung tampil utuh.

## Aksesibilitas
- svg memakai `role="img"` dengan `aria-label` yang menyebut nilai awal, akhir, dan periodenya. Angka dan badge adalah teks asli.
- Badge menyebut arahnya dengan kata; ikonnya dekoratif.
- Jangan jadikan tile sebagai tautan kecuali membuka grafik lengkapnya; jika begitu, seluruh kartu menjadi tautan dengan pertanyaan sebagai namanya.

## Lakukan
- Dahulukan angkanya; biarkan garisnya kecil dan tanpa label.
- Sebutkan pembanding perubahannya ("di atas awal tahun").

## Hindari
- Menambah sumbu, tick, atau tooltip pada sparkline.
- Mewarnai badge hijau hanya karena garisnya naik.
- Menampilkan lebih dari empat tile dalam satu baris.

## Terkait
[Stat row](stat-row.md) · [Line chart](line-chart.md) · [Chart principles](chart-principles.md) · [Badge](badge.md)
