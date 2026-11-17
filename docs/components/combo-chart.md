# Combo chart

Kelompok: Grafik. https://lampung.kartadinata.app/docs/components/combo-chart

Batang untuk apa yang terjadi di setiap periode dan garis untuk apa yang diharapkan (rencana, prakiraan, tahun lalu), pada satu skala bersama, dengan garis acuan putus-putus opsional untuk ambang tetap. Digambar dari data seperti area chart.

## Pakai saat
- Realisasi dibanding rencana per bulan atau minggu: pajak daerah dibanding rencana, sampah terangkut dibanding target, pendaftar dibanding prakiraan.
- Periode terpisah (batang) dengan harapan yang berkelanjutan melintasinya (garis).
- Ambang tetap yang dicek pembaca setiap periode: batas aman, batas maksimum, nilai minimum (garis acuan).

## Pakai yang lain saat
- Dua ukuran dengan satuan berbeda di dua sumbu: pakai [Line chart](line-chart.md). Dua sumbu y mengundang perbandingan yang keliru. Pecah menjadi dua grafik yang berbagi sumbu x, atau indeks keduanya ke 100.
- Hanya realisasi, tanpa harapan: pakai [Bar chart](bar-chart.md).
- Satu total dibanding satu target: pakai [Target bar](target-bar.md).
- Volume selama banyak hari: pakai [Area chart](area-chart.md).

## Letaknya
Di [kartu grafik](chart-card.md), selebar halaman untuk 12 bulan, setengah lebar untuk satu minggu. Tinggi 200 sampai 240 px.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.chart[data-lds-chart]` | Wajib. Mesin yang sama dengan [area chart](area-chart.md); seri memakai `kind: "bar"` atau `"line"`. |
| `.chart__bar` | Batang per periode, membulat di atas, lebar maksimal 26 px per seri; beberapa seri batang berkelompok berdampingan. |
| `.chart__series.is-dashed` | Harapan sebagai garis putus-putus yang melewati tengah batang. |
| `.chart__ref` | Ambang tetap, putus-putus, dengan label di ujung kanan. |
| `.chart__band` | Saat hover atau fokus seluruh periode diberi tint dan tooltip mencantumkan kedua seri. |

## Markup

**Realisasi dibanding rencana.** Batang tumbuh dari garis dasar saat pertama terlihat; garis rencana muncul memudar. Arahkan kursor ke satu bulan: seluruh kolom diberi tint dan tooltip memberi kedua nilainya. Matikan rencana di legenda.
```html
<section class="chart-card" aria-labelledby="cb-q">
  <div class="chart-card__head"><div class="chart-card__titles"><div class="chart-card__q" id="cb-q">Apakah penerimaan pajak di atas rencana?</div><div class="chart-card__sub">Realisasi pajak daerah per bulan, dalam miliar rupiah, 2026</div></div></div>
  <div class="chart" data-lds-chart='{"label":"Realisasi pajak daerah per bulan dibanding rencana, 2026. Di atas rencana sejak Juli; November Rp 56 M dibanding rencana Rp 52 M. Desember belum ditutup.","x":["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"],"xFull":["Jan 2026","Feb 2026","Mar 2026","Apr 2026","Mei 2026","Jun 2026","Jul 2026","Agu 2026","Sep 2026","Okt 2026","Nov 2026","Des 2026"],"xName":"Bulan","format":{"prefix":"Rp ","suffix":" M"},"series":[{"name":"Realisasi","values":[31,34,29,38,41,37,44,47,43,52,56,0],"kind":"bar"},{"name":"Rencana","values":[32,33,34,36,38,40,42,44,46,49,52,55],"kind":"line","dashed":true,"color":4}],"refs":[{"value":50,"label":"Ambang Rp 50 M"}],"height":240}'></div>
</section>
```

**Satu minggu dibanding target harian.** Garis target datar berwarna netral: hari-hari di atasnya mudah dihitung.
```html
<section class="chart-card" style="max-width: 520px;" aria-labelledby="cb-w">
  <div><div class="chart-card__q" id="cb-w">Apakah target angkut sampah tercapai?</div><div class="chart-card__sub">Sampah terangkut per hari dalam ton, minggu ini</div></div>
  <div class="chart" data-lds-chart='{"label":"Sampah terangkut per hari minggu ini dibanding target harian 2 ton. Target tercapai pada Rabu, Jumat, dan Sabtu.","x":["Sen","Sel","Rab","Kam","Jum","Sab","Min"],"xName":"Hari","format":{"decimals":1,"suffix":" ton"},"series":[{"name":"Sampah terangkut","values":[1.5,2,2.5,1,3,4,0.5],"kind":"bar","color":3},{"name":"Target harian","values":[2,2,2,2,2,2,2],"kind":"line","dashed":true,"color":"neutral"}],"height":200}'></div>
</section>
```

## Varian dan ukuran
| Kelas atau atribut | Kapan |
|---|---|
| `series[].kind: "bar"` | Satu seri batang per periode; dua atau tiga seri batang berkelompok berdampingan. |
| `series[].kind: "line", dashed: true` | Harapan yang melewati tengah batang. |
| `refs` | Ambang tetap dengan keterangannya. |
| `format: { prefix: "$", compact: true }` | Tick terbaca $40k, tooltip $41,000. Untuk rupiah pakai `prefix: "Rp "` dan satuan di `suffix`. |

## Status
| Status | Caranya |
|---|---|
| `open period` | Biarkan bulan berjalan bernilai 0 atau keluarkan, dan sebutkan "Desember belum ditutup" di label. |
| `hover / focus` | Kolom diberi tint, tooltip berisi setiap seri; tombol panah berpindah per bulan. |
| `loading, empty, error` | Lihat [state grafik](chart-states.md). |

## Gerak dan mikrointeraksi
- Saat pertama terlihat: batang tumbuh dari garis dasar selama `--d-smooth` (560 ms) dengan kurva masuk; garis putus-putus muncul memudar.
- Perubahan data dan toggle men-tween nilai dan skala selama `--d-considered` dengan `--ease-inout`, dari yang tampil.
- Reduced motion: langsung digambar.

## Aksesibilitas
- Sama seperti [area chart](area-chart.md): satu gambar yang bisa difokus dengan kesimpulan sebagai namanya, tombol panah mengumumkan setiap periode, dan tabel tersembunyi berisi setiap nilai.
- Harapan digambar putus-putus dan dinamai di legenda, jadi dibedakan lebih dari warna.

## Lakukan
- Pakai satu skala untuk kedua seri; keduanya harus bersatuan sama.
- Namai harapan sesuai isinya: Rencana, Prakiraan, Tahun lalu.

## Hindari
- Menambah sumbu y kedua di kanan.
- Menggambar harapan sebagai batang juga; pembaca jadi membandingkan empat tinggi batang, bukan satu batang dengan satu garis.

## Perilaku (HTML biasa)
Sama seperti [area chart](area-chart.md): `data-lds-chart` atau `drawChart(el, config)`.

## Terkait
[Area chart](area-chart.md) · [Bar chart](bar-chart.md) · [Target bar](target-bar.md) · [Chart card](chart-card.md)
