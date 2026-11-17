# Percentage bar

Kelompok: Grafik. https://lampung.kartadinata.app/docs/components/percentage-bar

Satu batang horizontal yang dibagi menjadi paling banyak empat bagian berwarna yang berjumlah 100 %, dengan legenda yang menyebut nama dan porsi setiap bagian. Cara ringkas untuk menunjukkan komposisi.

## Pakai saat
- Menunjukkan bagaimana satu keseluruhan terbagi: anggaran per bidang, waktu per kegiatan, laporan selesai, diproses, dan ditolak.
- Komposisi di ruang sempit atau di dalam baris daftar atau sel tabel, ketika donut tidak muat.
- Membandingkan komposisi di beberapa baris (satu batang per periode) ketika bagiannya sama.

## Pakai yang lain saat
- Kemajuan satu nilai menuju selesai: pakai [Progress bar](progress-bar.md). Progress bar punya satu bagian dan satu track.
- Seberapa penuh kapasitas atau kuota: pakai [Meter](meter.md).
- Total sama pentingnya dengan pembagiannya: pakai [Donut](donut.md).
- Membandingkan ukuran mutlak antar kategori: pakai [Bar chart](bar-chart.md).

## Letaknya
Di `.chart-card` di bawah judul, di dalam baris daftar atau sel tabel selebar sel, atau di bawah sebuah angka. Selebar layar di ponsel; legenda turun ke bawahnya.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.pbar` | Wajib. Baris flex setinggi 14 px, radius 4 px, celah 2 px antarbagian, terpotong rapi. `role="img"` + `aria-label`. |
| `span` | Wajib. Satu per bagian; `flex-grow` adalah porsinya, `background` adalah `--series-n` dengan urutan tetap. |
| `.legend` | Wajib. Swatch, nama, dan porsi setiap bagian, dengan urutan yang sama. |

## Markup

**Komposisi satu keseluruhan.** Anggaran kelurahan per bidang. Legenda membawa angkanya.
```html
<div class="chart-card" style="max-width: 460px;">
  <div><div class="chart-card__q">Ke mana anggaran kelurahan dipakai?</div><div class="chart-card__sub">Porsi anggaran per bidang, tahun 2026</div></div>
  <div class="pbar" role="img" aria-label="Pembangunan 50 persen, pelayanan 25, pemberdayaan 15, lainnya 10"><span style="flex-grow: 50; background: var(--series-1);"></span><span style="flex-grow: 25; background: var(--series-2);"></span><span style="flex-grow: 15; background: var(--series-3);"></span><span style="flex-grow: 10; background: var(--series-4);"></span></div>
  <div class="legend"><span><i style="background: var(--series-1);"></i>Pembangunan <b style="font-weight: 500; color: var(--text-strong);">50%</b></span><span><i style="background: var(--series-2);"></i>Pelayanan <b style="font-weight: 500; color: var(--text-strong);">25%</b></span><span><i style="background: var(--series-3);"></i>Pemberdayaan <b style="font-weight: 500; color: var(--text-strong);">15%</b></span><span><i style="background: var(--series-4);"></i>Lainnya <b style="font-weight: 500; color: var(--text-strong);">10%</b></span></div>
</div>
```

**Dibandingkan antarbaris.** Status laporan warga di dua triwulan. Bagian sama, urutan sama, satu batang per baris; perubahan pembagiannya terbaca sekilas.
```html
<div class="chart-card" style="max-width: 460px;">
  <div><div class="chart-card__q">Apakah lebih banyak laporan yang selesai?</div><div class="chart-card__sub">Status laporan warga, dua triwulan terakhir</div></div>
  <div class="stack" style="--gap: 6px;"><span class="card__sub" style="margin: 0;">Triwulan II</span><div class="pbar" role="img" aria-label="Triwulan II: 62 persen selesai, 28 diproses, 10 ditolak"><span style="flex-grow: 62; background: var(--series-3);"></span><span style="flex-grow: 28; background: var(--series-2);"></span><span style="flex-grow: 10; background: var(--series-4);"></span></div></div>
  <div class="stack" style="--gap: 6px;"><span class="card__sub" style="margin: 0;">Triwulan III</span><div class="pbar" role="img" aria-label="Triwulan III: 74 persen selesai, 20 diproses, 6 ditolak"><span style="flex-grow: 74; background: var(--series-3);"></span><span style="flex-grow: 20; background: var(--series-2);"></span><span style="flex-grow: 6; background: var(--series-4);"></span></div></div>
  <div class="legend"><span><i style="background: var(--series-3);"></i>Selesai</span><span><i style="background: var(--series-2);"></i>Diproses</span><span><i style="background: var(--series-4);"></i>Ditolak</span></div>
</div>
```

## Status
| Status | Caranya |
|---|---|
| `data change` | Ubah `flex-grow`; bagian berubah ukuran dengan halus. |
| `a part is 0` | Hapus span-nya (bagian kosong tetap menambah celah 2 px). |
| `loading` | Satu `.skel` setinggi 14 px dengan radius yang sama; lihat [state grafik](chart-states.md). |

## Gerak dan mikrointeraksi
- Bagian mentransisikan `flex-grow` selama `--d-considered` (480 ms) dengan `--ease-inout`, jadi pembagian baru bergeser ke tempatnya.
- Tanpa animasi mengisi saat pertama dimuat. Reduced motion: 120 ms.

## Aksesibilitas
- `role="img"` pada `.pbar` dengan setiap bagian dan porsinya di `aria-label`.
- Legenda adalah teks asli berisi persentasenya; jangan hanya mengandalkan bagian berwarna.
- Pertahankan warna yang sama untuk makna yang sama di semua baris (selesai selalu seri 3 di sini).

## Lakukan
- Pertahankan urutan bagian yang tetap di setiap batang di halaman.
- Tampilkan persentasenya di legenda.

## Hindari
- Membagi menjadi lebih dari empat bagian; gabungkan sisanya ke Lainnya dengan `--neutral`.
- Memakainya untuk satu nilai terhadap target.
- Menambah label di dalam bagian; bagian yang kecil tidak muat.

## Terkait
[Donut](donut.md) · [Progress bar](progress-bar.md) · [Meter](meter.md) · [Chart principles](chart-principles.md)
