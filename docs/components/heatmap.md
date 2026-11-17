# Heatmap

Kelompok: Grafik. https://lampung.kartadinata.app/docs/components/heatmap

Grid kotak kecil, satu per hari atau slot, diarsir dalam lima tingkat satu warna dari kosong sampai paling banyak. Menunjukkan pola selama banyak periode (hari yang ramai, kebiasaan mingguan), bukan nilai pastinya.

## Pakai saat
- Aktivitas per hari selama berminggu-minggu atau berbulan-bulan: kunjungan pasien, laporan masuk, permohonan izin.
- Melihat pola dalam dua dimensi (hari per minggu, jam per hari) ketika nilai pasti setiap sel kurang penting.

## Pakai yang lain saat
- Nilai pasti per kategori: pakai [Bar chart](bar-chart.md).
- Tren satu nilai dari waktu ke waktu: pakai [Line chart](line-chart.md).
- Memilih atau menampilkan tanggal: pakai [Calendar](calendar.md).
- Seberapa penuh satu kapasitas: pakai [Meter](meter.md).

## Letaknya
Selebar `.chart-card` di laporan atau profil. Grid punya 20 kolom dan kotaknya menyesuaikan lebar, jadi di ponsel setiap sel menjadi kecil: tampilkan 10 minggu terakhir di sana, atau pertahankan 20 di dalam wrapper dengan `overflow-x: auto` dan lebar grid minimal sekitar 480 px.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.hm` | Wajib. Grid 20 kolom, celah 3 px. Sel mengalir per baris, jadi 7 baris x 20 berarti hari x minggu. `role="img"` + `aria-label`. |
| `i` | Wajib. Satu sel, persegi, radius 3 px, warna kosong `--bg-skeleton`. |
| `.l1 / .l2 / .l3 / .l4` | Tingkat arsiran: `--series-1` pada 22 %, 45 %, 70 %, dan 100 %. Tanpa class berarti kosong. |
| `skala` | Disarankan. Dari "Sepi" sampai "Ramai" dengan satu sel untuk setiap tingkat. |

## Markup

**Kunjungan puskesmas.** Baris adalah hari, kolom adalah minggu. Arahkan kursor ke satu sel untuk melihatnya membesar beserta judulnya.
```html
<div class="chart-card">
  <div><div class="chart-card__q">Kapan puskesmas paling ramai?</div><div class="chart-card__sub">Kunjungan pasien per hari, 20 minggu terakhir</div></div>
  <div class="hm" role="img" aria-label="Kunjungan pasien selama 20 minggu. Rabu paling ramai, akhir pekan sepi, dan 6 minggu terakhir lebih ramai dari sebelumnya.">
    <i class="l1" title="Minggu 1, Senin: di bawah 25 pasien"></i><i class="l2" title="Minggu 2, Senin: 25 sampai 49 pasien"></i><i class="l3" title="Minggu 3, Senin: 50 sampai 74 pasien"></i><i class="l1" title="Minggu 4, Senin: di bawah 25 pasien"></i><i class="l3" title="Minggu 5, Senin: 50 sampai 74 pasien"></i><i class="l1" title="Minggu 6, Senin: di bawah 25 pasien"></i><i class="l2" title="Minggu 7, Senin: 25 sampai 49 pasien"></i><i class="l3" title="Minggu 8, Senin: 50 sampai 74 pasien"></i><i class="l1" title="Minggu 9, Senin: di bawah 25 pasien"></i><i class="l3" title="Minggu 10, Senin: 50 sampai 74 pasien"></i><i class="l1" title="Minggu 11, Senin: di bawah 25 pasien"></i><i class="l2" title="Minggu 12, Senin: 25 sampai 49 pasien"></i><i class="l3" title="Minggu 13, Senin: 50 sampai 74 pasien"></i><i class="l1" title="Minggu 14, Senin: di bawah 25 pasien"></i><i class="l3" title="Minggu 15, Senin: 50 sampai 74 pasien"></i><i class="l2" title="Minggu 16, Senin: 25 sampai 49 pasien"></i><i class="l3" title="Minggu 17, Senin: 50 sampai 74 pasien"></i><i class="l4" title="Minggu 18, Senin: 75 pasien atau lebih"></i><i class="l2" title="Minggu 19, Senin: 25 sampai 49 pasien"></i><i class="l3" title="Minggu 20, Senin: 50 sampai 74 pasien"></i>
    <i class="l3" title="Minggu 1, Selasa: 50 sampai 74 pasien"></i><i class="l2" title="Minggu 2, Selasa: 25 sampai 49 pasien"></i><i class="l3" title="Minggu 3, Selasa: 50 sampai 74 pasien"></i><i class="l4" title="Minggu 4, Selasa: 75 pasien atau lebih"></i><i class="l2" title="Minggu 5, Selasa: 25 sampai 49 pasien"></i><i class="l3" title="Minggu 6, Selasa: 50 sampai 74 pasien"></i><i class="l2" title="Minggu 7, Selasa: 25 sampai 49 pasien"></i><i class="l3" title="Minggu 8, Selasa: 50 sampai 74 pasien"></i><i class="l4" title="Minggu 9, Selasa: 75 pasien atau lebih"></i><i class="l2" title="Minggu 10, Selasa: 25 sampai 49 pasien"></i><i class="l3" title="Minggu 11, Selasa: 50 sampai 74 pasien"></i><i class="l2" title="Minggu 12, Selasa: 25 sampai 49 pasien"></i><i class="l3" title="Minggu 13, Selasa: 50 sampai 74 pasien"></i><i class="l4" title="Minggu 14, Selasa: 75 pasien atau lebih"></i><i class="l3" title="Minggu 15, Selasa: 50 sampai 74 pasien"></i><i class="l4" title="Minggu 16, Selasa: 75 pasien atau lebih"></i><i class="l2" title="Minggu 17, Selasa: 25 sampai 49 pasien"></i><i class="l3" title="Minggu 18, Selasa: 50 sampai 74 pasien"></i><i class="l4" title="Minggu 19, Selasa: 75 pasien atau lebih"></i><i class="l3" title="Minggu 20, Selasa: 50 sampai 74 pasien"></i>
    <i class="l3" title="Minggu 1, Rabu: 50 sampai 74 pasien"></i><i class="l4" title="Minggu 2, Rabu: 75 pasien atau lebih"></i><i class="l2" title="Minggu 3, Rabu: 25 sampai 49 pasien"></i><i class="l3" title="Minggu 4, Rabu: 50 sampai 74 pasien"></i><i class="l4" title="Minggu 5, Rabu: 75 pasien atau lebih"></i><i class="l3" title="Minggu 6, Rabu: 50 sampai 74 pasien"></i><i class="l4" title="Minggu 7, Rabu: 75 pasien atau lebih"></i><i class="l2" title="Minggu 8, Rabu: 25 sampai 49 pasien"></i><i class="l3" title="Minggu 9, Rabu: 50 sampai 74 pasien"></i><i class="l4" title="Minggu 10, Rabu: 75 pasien atau lebih"></i><i class="l3" title="Minggu 11, Rabu: 50 sampai 74 pasien"></i><i class="l4" title="Minggu 12, Rabu: 75 pasien atau lebih"></i><i class="l2" title="Minggu 13, Rabu: 25 sampai 49 pasien"></i><i class="l3" title="Minggu 14, Rabu: 50 sampai 74 pasien"></i><i class="l4" title="Minggu 15, Rabu: 75 pasien atau lebih"></i><i class="l3" title="Minggu 16, Rabu: 50 sampai 74 pasien"></i><i class="l4" title="Minggu 17, Rabu: 75 pasien atau lebih"></i><i class="l3" title="Minggu 18, Rabu: 50 sampai 74 pasien"></i><i class="l4" title="Minggu 19, Rabu: 75 pasien atau lebih"></i><i class="l4" title="Minggu 20, Rabu: 75 pasien atau lebih"></i>
    <i class="l4" title="Minggu 1, Kamis: 75 pasien atau lebih"></i><i class="l2" title="Minggu 2, Kamis: 25 sampai 49 pasien"></i><i class="l3" title="Minggu 3, Kamis: 50 sampai 74 pasien"></i><i class="l2" title="Minggu 4, Kamis: 25 sampai 49 pasien"></i><i class="l3" title="Minggu 5, Kamis: 50 sampai 74 pasien"></i><i class="l4" title="Minggu 6, Kamis: 75 pasien atau lebih"></i><i class="l2" title="Minggu 7, Kamis: 25 sampai 49 pasien"></i><i class="l3" title="Minggu 8, Kamis: 50 sampai 74 pasien"></i><i class="l2" title="Minggu 9, Kamis: 25 sampai 49 pasien"></i><i class="l3" title="Minggu 10, Kamis: 50 sampai 74 pasien"></i><i class="l4" title="Minggu 11, Kamis: 75 pasien atau lebih"></i><i class="l2" title="Minggu 12, Kamis: 25 sampai 49 pasien"></i><i class="l3" title="Minggu 13, Kamis: 50 sampai 74 pasien"></i><i class="l2" title="Minggu 14, Kamis: 25 sampai 49 pasien"></i><i class="l3" title="Minggu 15, Kamis: 50 sampai 74 pasien"></i><i class="l4" title="Minggu 16, Kamis: 75 pasien atau lebih"></i><i class="l3" title="Minggu 17, Kamis: 50 sampai 74 pasien"></i><i class="l4" title="Minggu 18, Kamis: 75 pasien atau lebih"></i><i class="l2" title="Minggu 19, Kamis: 25 sampai 49 pasien"></i><i class="l3" title="Minggu 20, Kamis: 50 sampai 74 pasien"></i>
    <i class="l2" title="Minggu 1, Jumat: 25 sampai 49 pasien"></i><i class="l3" title="Minggu 2, Jumat: 50 sampai 74 pasien"></i><i class="l1" title="Minggu 3, Jumat: di bawah 25 pasien"></i><i class="l3" title="Minggu 4, Jumat: 50 sampai 74 pasien"></i><i class="l1" title="Minggu 5, Jumat: di bawah 25 pasien"></i><i class="l2" title="Minggu 6, Jumat: 25 sampai 49 pasien"></i><i class="l3" title="Minggu 7, Jumat: 50 sampai 74 pasien"></i><i class="l1" title="Minggu 8, Jumat: di bawah 25 pasien"></i><i class="l3" title="Minggu 9, Jumat: 50 sampai 74 pasien"></i><i class="l1" title="Minggu 10, Jumat: di bawah 25 pasien"></i><i class="l2" title="Minggu 11, Jumat: 25 sampai 49 pasien"></i><i class="l3" title="Minggu 12, Jumat: 50 sampai 74 pasien"></i><i class="l1" title="Minggu 13, Jumat: di bawah 25 pasien"></i><i class="l3" title="Minggu 14, Jumat: 50 sampai 74 pasien"></i><i class="l2" title="Minggu 15, Jumat: 25 sampai 49 pasien"></i><i class="l3" title="Minggu 16, Jumat: 50 sampai 74 pasien"></i><i class="l4" title="Minggu 17, Jumat: 75 pasien atau lebih"></i><i class="l2" title="Minggu 18, Jumat: 25 sampai 49 pasien"></i><i class="l3" title="Minggu 19, Jumat: 50 sampai 74 pasien"></i><i class="l2" title="Minggu 20, Jumat: 25 sampai 49 pasien"></i>
    <i title="Minggu 1, Sabtu: tidak ada pasien"></i><i class="l1" title="Minggu 2, Sabtu: di bawah 25 pasien"></i><i class="l2" title="Minggu 3, Sabtu: 25 sampai 49 pasien"></i><i title="Minggu 4, Sabtu: tidak ada pasien"></i><i class="l1" title="Minggu 5, Sabtu: di bawah 25 pasien"></i><i title="Minggu 6, Sabtu: tidak ada pasien"></i><i class="l1" title="Minggu 7, Sabtu: di bawah 25 pasien"></i><i class="l2" title="Minggu 8, Sabtu: 25 sampai 49 pasien"></i><i title="Minggu 9, Sabtu: tidak ada pasien"></i><i class="l1" title="Minggu 10, Sabtu: di bawah 25 pasien"></i><i title="Minggu 11, Sabtu: tidak ada pasien"></i><i class="l1" title="Minggu 12, Sabtu: di bawah 25 pasien"></i><i class="l2" title="Minggu 13, Sabtu: 25 sampai 49 pasien"></i><i title="Minggu 14, Sabtu: tidak ada pasien"></i><i class="l2" title="Minggu 15, Sabtu: 25 sampai 49 pasien"></i><i title="Minggu 16, Sabtu: tidak ada pasien"></i><i class="l2" title="Minggu 17, Sabtu: 25 sampai 49 pasien"></i><i class="l3" title="Minggu 18, Sabtu: 50 sampai 74 pasien"></i><i class="l1" title="Minggu 19, Sabtu: di bawah 25 pasien"></i><i class="l2" title="Minggu 20, Sabtu: 25 sampai 49 pasien"></i>
    <i class="l1" title="Minggu 1, Minggu: di bawah 25 pasien"></i><i title="Minggu 2, Minggu: tidak ada pasien"></i><i title="Minggu 3, Minggu: tidak ada pasien"></i><i class="l2" title="Minggu 4, Minggu: 25 sampai 49 pasien"></i><i title="Minggu 5, Minggu: tidak ada pasien"></i><i class="l1" title="Minggu 6, Minggu: di bawah 25 pasien"></i><i title="Minggu 7, Minggu: tidak ada pasien"></i><i title="Minggu 8, Minggu: tidak ada pasien"></i><i class="l2" title="Minggu 9, Minggu: 25 sampai 49 pasien"></i><i title="Minggu 10, Minggu: tidak ada pasien"></i><i class="l1" title="Minggu 11, Minggu: di bawah 25 pasien"></i><i title="Minggu 12, Minggu: tidak ada pasien"></i><i title="Minggu 13, Minggu: tidak ada pasien"></i><i class="l2" title="Minggu 14, Minggu: 25 sampai 49 pasien"></i><i title="Minggu 15, Minggu: tidak ada pasien"></i><i class="l2" title="Minggu 16, Minggu: 25 sampai 49 pasien"></i><i title="Minggu 17, Minggu: tidak ada pasien"></i><i class="l1" title="Minggu 18, Minggu: di bawah 25 pasien"></i><i class="l2" title="Minggu 19, Minggu: 25 sampai 49 pasien"></i><i title="Minggu 20, Minggu: tidak ada pasien"></i>
  </div>
  <div class="cluster" style="--gap: 6px; justify-content: flex-end; font: var(--type-footnote); color: var(--text-subtle);" aria-hidden="true">Sepi <span class="hm" style="display: flex; gap: 3px;"><i style="width: 12px;"></i><i class="l1" style="width: 12px;"></i><i class="l2" style="width: 12px;"></i><i class="l3" style="width: 12px;"></i><i class="l4" style="width: 12px;"></i></span> Ramai</div>
</div>
```

## Varian dan ukuran
| Kelas atau atribut | Kapan |
|---|---|
| `l1 to l4` | Empat tingkat terisi ditambah kosong: lima seluruhnya. Petakan nilai ke tingkat dengan ambang tetap (di bawah 25, 25, 50, 75 pasien atau lebih), bukan persentil, agar skalanya bermakna sama setiap minggu. |

## Status
| Status | Caranya |
|---|---|
| `hover` | Sel membesar ke 1,25 dengan `--spring-snappy`; `title`-nya menampilkan nilainya. |
| `empty period` | Semua sel kosong adalah state yang sah; sebutkan di subjudul ("Belum ada kunjungan tercatat") daripada menyembunyikan grid. |
| `loading, error` | Lihat [state grafik](chart-states.md). |

## Gerak dan mikrointeraksi
- Hover: `transform: scale(1.25)` dengan `--spring-snappy` selama `--d-snappy`, kembali dengan cara yang sama.
- Tanpa animasi masuk. Reduced motion: efek membesar saat hover menjadi perubahan 120 ms.

## Aksesibilitas
- `role="img"` pada `.hm` dengan `aria-label` yang menyebut polanya; sel satu per satu tidak dibacakan.
- Judul sel hanya untuk pengguna mouse; berikan angkanya di tabel `.sr-only` atau ringkasan jika penting.
- Satu warna, terang ke gelap, sehingga terbaca dalam skala abu-abu dan oleh pembaca buta warna; legenda skala memakai `aria-hidden` karena label sudah membawa maknanya.

## Lakukan
- Pakai ambang tetap untuk tingkatnya dan tampilkan skalanya.
- Jelaskan polanya di judul, subjudul, atau label.

## Hindari
- Memakai beberapa warna atau skala pelangi.
- Membuat sel bisa diklik tanpa menjadikannya tombol bernama.
- Mengubah jumlah kolom dengan CSS sendiri di atas `.hm`; minta variabel kolom di sistem.

## Terkait
[Chart principles](chart-principles.md) · [Calendar](calendar.md) · [Bar chart](bar-chart.md) · [Chart states](chart-states.md)
