# Gauge

Kelompok: Grafik. https://lampung.kartadinata.app/docs/components/gauge

Setengah cincin dengan nilai di bukaannya: satu angka terhadap rentang yang diketahui (kuota terisi, skor, beban), atau deretan tick yang dibagi di antara beberapa status (tersedia, menipis, habis). Terbaca sekilas; kata-kata di bawah angka membawa rinciannya.

## Pakai saat
- Satu nilai terhadap rentang tetap ketika pertanyaannya "seberapa penuh": kuota terisi, kuota terpakai, skor kesehatan, beban server.
- Sekumpulan kecil status yang berbagi satu total dan porsi utamanya paling penting: stok tersedia, menipis, habis; tiket terbuka, menunggu, selesai.
- Tile dasbor yang cukup untuk sebuah bentuk tetapi tidak untuk grafik.

## Pakai yang lain saat
- Skor di kotak kecil (sudut kartu, baris daftar): pakai [Progress ring](progress-ring.md).
- Penyimpanan atau kuota dalam baris sempit: pakai [Meter](meter.md).
- Kemajuan menuju target dengan tenggat: pakai [Target bar](target-bar.md).
- Bagian dari keseluruhan ketika setiap bagian penting: pakai [Donut](donut.md).
- Perubahan dari waktu ke waktu: pakai [Area chart](area-chart.md).

## Letaknya
Di [kartu grafik](chart-card.md) atau tile seukuran [KPI card](kpi-card.md), di tengah, lebar 160 sampai 240 px (`--size`). Mengecil mengikuti wadahnya; angkanya tetap 28 px.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.gauge` | Wajib. `--size` mengatur lebarnya; svg mempertahankan viewBox 200 × 112. |
| `svg[role=img]` | Wajib. `aria-label` menyebut nilai dan rentangnya dengan kata. |
| `.gauge__track / .gauge__val` | Satu nilai: track 16 px dan busur nilai (`--v` sebagai persen), dengan warna aksen atau tone. |
| `.gauge__tick` | Tick bersama: 32 garis pendek, masing-masing diwarnai menurut bagiannya (`--c`). |
| `.gauge__label` | Wajib. `b` untuk angka, `span` untuk apa yang dihitungnya. |
| `.gauge__ends` | Opsional. Kedua ujung rentang di bawah cincin. |

## Markup

**Kuota, mengganti hari.** Ganti harinya: busur bergerak selama 480 ms dari posisinya, dan berubah menjadi peringatan saat kuota hampir penuh. Busur menyapu masuk saat pertama terlihat.
```html
<section class="chart-card" style="max-width: 380px; align-items: center;" aria-labelledby="ga-q">
  <div class="chart-card__head" style="width: 100%;"><div class="chart-card__titles"><div class="chart-card__q" id="ga-q">Seberapa penuh kuota vaksinasi?</div><div class="chart-card__sub">Tempat yang sudah dipesan di aula kelurahan</div></div>
    <div class="chart-card__actions"><div class="seg chart-card__range" role="group" aria-label="Hari" data-lds-segmented data-lds-chart-for="ga-hall" style="width: 180px;"><span class="seg__thumb"></span><button type="button" class="seg__btn" aria-pressed="true" data-set="sat">Sabtu</button><button type="button" class="seg__btn" aria-pressed="false" data-set="sun">Minggu</button></div></div>
  </div>
  <div id="ga-hall" data-lds-chart='{"type":"gauge","label":"Kuota vaksinasi terisi: 78 dari 120 tempat.","value":78,"max":120,"center":"65%","unit":"78 dari 120 tempat","minLabel":"0","maxLabel":"120","sets":{"sat":{"value":78,"center":"65%","unit":"78 dari 120 tempat","label":"Sabtu: 78 dari 120 tempat terisi.","tone":null},"sun":{"value":112,"center":"93%","unit":"112 dari 120 tempat","label":"Minggu: 112 dari 120 tempat terisi, hampir penuh.","tone":"warning"}}}' style="--size: 220px;"></div>
</section>
```

**Tone.** Polos untuk level netral, sukses untuk kondisi baik, peringatan untuk yang mendekati batas. Tone mengulang apa yang disebut kata-katanya.
```html
<div class="docs-row" style="gap: 32px;">
  <div data-lds-chart='{"type":"gauge","label":"Rata-rata skor kepuasan 82 dari 100.","value":82,"max":100,"tone":"success","unit":"skor kepuasan"}' style="--size: 180px;"></div>
  <div data-lds-chart='{"type":"gauge","label":"Beban server 64 persen.","value":64,"max":100,"center":"64%","unit":"beban server"}' style="--size: 180px;"></div>
  <div data-lds-chart='{"type":"gauge","label":"Penyimpanan terpakai 91 persen.","value":91,"max":100,"center":"91%","tone":"warning","unit":"penyimpanan terpakai"}' style="--size: 180px;"></div>
</div>
```

**Tick bersama.** Tiga puluh dua tick dibagi tiga status; legenda memberi jumlahnya. Tick menyala dari kiri saat pertama terlihat.
```html
<section class="chart-card" style="max-width: 380px; align-items: center;" aria-labelledby="ga-stock">
  <div style="width: 100%;"><div class="chart-card__q" id="ga-stock">Apakah stok obat puskesmas cukup?</div><div class="chart-card__sub">240 jenis obat, hari ini</div></div>
  <div data-lds-chart='{"type":"gauge","label":"Stok 240 jenis obat: 186 tersedia, 38 menipis, 16 habis.","segments":[{"name":"Tersedia","value":186,"color":3},{"name":"Menipis","value":38,"color":2},{"name":"Habis","value":16,"color":"neutral"}],"center":"78%","unit":"tersedia"}' style="--size: 220px;"></div>
  <div class="legend" style="justify-content: center;"><span><i style="background: var(--series-3);"></i>Tersedia 186</span><span><i style="background: var(--series-2);"></i>Menipis 38</span><span><i style="background: var(--neutral);"></i>Habis 16</span></div>
</section>
```

## Varian dan ukuran
| Kelas atau atribut | Kapan |
|---|---|
| `value / max` | Satu busur. `tone: "success" | "warning" | "danger"` atau `.gauge--success|warning|danger` pada markup statis. |
| `segments` | Tick dibagi sampai empat bagian dengan urutan seri; `ticks` mengubah jumlahnya (default 32). |
| `center / unit` | Angka di bukaan dan apa yang dihitungnya; default-nya nilai yang sudah diformat. |
| `--size` | Lebar gauge (default 220 px). |

## Status
| Status | Caranya |
|---|---|
| `data change` | `drawChart(el, { type: "gauge", value })` atau kontrol periode: busur bergerak dari posisinya. |
| `loading` | Setengah cincin `.skel` sudah cukup: blok 220 × 110 dengan radius atas 110 px. |
| `over the max` | Hentikan busur di ujung, sebutkan kelebihannya di baris satuan ("12 melebihi kapasitas"). |

## Gerak dan mikrointeraksi
- Saat pertama terlihat: busur menyapu dari nol selama `--d-considered` (480 ms) dengan `--ease-inout`; tick mendapat warnanya satu per satu, berjarak 12 ms.
- Perubahan nilai dan tone memakai transisi yang sama, dari posisi saat ini.
- Reduced motion: langsung digambar.

## Aksesibilitas
- svg memakai `role="img"` dengan nilai dan rentangnya dalam kata; angka dan satuannya juga teks asli.
- Tone mengulang maknanya dengan kata ("hampir penuh"); tidak pernah menjadi satu-satunya petunjuk.
- Tick bersama selalu disertai legenda berisi jumlahnya.

## Lakukan
- Pakai untuk satu angka dengan nilai maksimum yang bermakna.
- Tulis baris satuan dengan kata yang biasa diucapkan orang ("78 dari 120 tempat").

## Hindari
- Menambah jarum, zona berwarna, atau angka tick di sekeliling cincin.
- Menaruh beberapa gauge dalam satu kartu untuk dibandingkan; pakai [ranked bars](ranked-bars.md).
- Memakai gauge untuk nilai tanpa maksimum yang tetap.

## Perilaku (HTML biasa)
`data-lds-chart='{ "type": "gauge", "value": 78, "max": 120, "label": "…" }'` atau `drawChart(el, config)`. `data-lds-chart-for` pada kontrol periode mengganti `sets`.

## Terkait
[Progress ring](progress-ring.md) · [Meter](meter.md) · [Donut](donut.md) · [Chart card](chart-card.md)
