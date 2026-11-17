# Funnel

Kelompok: Grafik. https://lampung.kartadinata.app/docs/components/funnel

Tahap-tahap sebuah alur, masing-masing dengan berapa orang yang mencapainya dan berapa persen dari tahap sebelumnya yang lanjut. Batang di tengah menyempit mengikuti jumlahnya, jadi penurunan terbesar terlihat sekilas; kata-katanya membawa angka pastinya.

## Pakai saat
- Urutan ketika setiap tahap adalah bagian dari tahap sebelumnya: membuka, mengisi, mengirim, terbit; mendaftar, seleksi, wawancara, diterima.
- Mencari tahap yang paling banyak kehilangan orang, untuk memutuskan apa yang diperbaiki lebih dulu.

## Pakai yang lain saat
- Kategori yang bukan tahap berjenjang: pakai [Ranked bars](ranked-bars.md).
- Perubahan satu jumlah dari waktu ke waktu: pakai [Area chart](area-chart.md).
- Bagian dari satu keseluruhan: pakai [Percentage bar](percentage-bar.md).
- Status satu berkas yang bergerak melewati tahap: pakai [Steps](steps.md).

## Letaknya
Di [kartu grafik](chart-card.md), setengah atau selebar halaman. Tiga sampai enam tahap. Kata-kata berada di atas setiap batang, jadi tetap berfungsi di 320 px tanpa perubahan.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `ol.funnel` | Wajib. Daftar berurutan dengan `aria-label`; urutannya adalah maknanya. |
| `li.funnel__row` | Wajib. Satu tahap. `--v` adalah jumlahnya sebagai persen dari tahap pertama. |
| `.funnel__meta` | Wajib. `.funnel__label` (tahapnya), `.funnel__val` (jumlahnya), dan `.funnel__conv` (porsi dari tahap sebelumnya). |
| `.funnel__track > .funnel__bar` | Wajib. Track isian 28 px dengan batang di tengahnya; dekoratif (`aria-hidden`). |
| `.is-drop` | Opsional pada baris: tahap yang paling banyak kehilangan (atau di bawah ambang Anda); porsinya berubah menjadi teks bahaya. |

## Markup

**Dari membuka halaman sampai izin terbit.** Jika kurang dari 40 % yang lanjut, tahap itu ditandai merah lewat teksnya. Batang tumbuh dari tengah saat pertama terlihat, satu per satu.
```html
<section class="chart-card" style="max-width: 560px;" aria-labelledby="fn-q">
  <div><div class="chart-card__q" id="fn-q">Di tahap mana pemohon berhenti?</div><div class="chart-card__sub">Jumlah orang di setiap tahap, 1 sampai 16 November</div></div>
  <ol class="funnel" data-lds-grow aria-label="Alur permohonan izin usaha, 1 sampai 16 November">
  <li class="funnel__row" style="--v: 100.0%;">
    <div class="funnel__meta"><span class="funnel__label">Membuka halaman izin usaha</span><span><span class="funnel__val">12.480</span></span></div>
    <div class="funnel__track" aria-hidden="true"><span class="funnel__bar"></span></div>
  </li>
  <li class="funnel__row" style="--v: 42.0%;">
    <div class="funnel__meta"><span class="funnel__label">Mulai mengisi formulir</span><span><span class="funnel__val">5.240</span><span class="funnel__conv">42% dari tahap sebelumnya</span></span></div>
    <div class="funnel__track" aria-hidden="true"><span class="funnel__bar"></span></div>
  </li>
  <li class="funnel__row" style="--v: 24.9%;">
    <div class="funnel__meta"><span class="funnel__label">Mengunggah berkas</span><span><span class="funnel__val">3.110</span><span class="funnel__conv">59% dari tahap sebelumnya</span></span></div>
    <div class="funnel__track" aria-hidden="true"><span class="funnel__bar"></span></div>
  </li>
  <li class="funnel__row" style="--v: 18.3%;">
    <div class="funnel__meta"><span class="funnel__label">Mengirim permohonan</span><span><span class="funnel__val">2.290</span><span class="funnel__conv">74% dari tahap sebelumnya</span></span></div>
    <div class="funnel__track" aria-hidden="true"><span class="funnel__bar"></span></div>
  </li>
  <li class="funnel__row is-drop" style="--v: 4.9%;">
    <div class="funnel__meta"><span class="funnel__label">Izin terbit</span><span><span class="funnel__val">610</span><span class="funnel__conv">27% dari tahap sebelumnya</span></span></div>
    <div class="funnel__track" aria-hidden="true"><span class="funnel__bar"></span></div>
  </li>
</ol>
  <div class="chart-card__foot"><span>Kehilangan terbesar: dari permohonan ke izin terbit, 27% lanjut</span></div>
</section>
```

**Funnel pendek.** Empat tahap rekrutmen kader posyandu.
```html
<section class="chart-card" style="max-width: 420px;" aria-labelledby="fn-h">
  <div><div class="chart-card__q" id="fn-h">Berapa calon kader yang lolos sampai akhir?</div><div class="chart-card__sub">Pendaftaran kader posyandu, gelombang kedua</div></div>
  <ol class="funnel" data-lds-grow aria-label="Alur rekrutmen kader posyandu, gelombang kedua">
  <li class="funnel__row" style="--v: 100.0%;">
    <div class="funnel__meta"><span class="funnel__label">Mendaftar</span><span><span class="funnel__val">214</span></span></div>
    <div class="funnel__track" aria-hidden="true"><span class="funnel__bar"></span></div>
  </li>
  <li class="funnel__row" style="--v: 44.9%;">
    <div class="funnel__meta"><span class="funnel__label">Lolos seleksi berkas</span><span><span class="funnel__val">96</span><span class="funnel__conv">45% dari tahap sebelumnya</span></span></div>
    <div class="funnel__track" aria-hidden="true"><span class="funnel__bar"></span></div>
  </li>
  <li class="funnel__row is-drop" style="--v: 14.5%;">
    <div class="funnel__meta"><span class="funnel__label">Diwawancarai</span><span><span class="funnel__val">31</span><span class="funnel__conv">32% dari tahap sebelumnya</span></span></div>
    <div class="funnel__track" aria-hidden="true"><span class="funnel__bar"></span></div>
  </li>
  <li class="funnel__row is-drop" style="--v: 2.8%;">
    <div class="funnel__meta"><span class="funnel__label">Diterima</span><span><span class="funnel__val">6</span><span class="funnel__conv">19% dari tahap sebelumnya</span></span></div>
    <div class="funnel__track" aria-hidden="true"><span class="funnel__bar"></span></div>
  </li>
</ol>
</section>
```

## Varian dan ukuran
| Kelas atau atribut | Kapan |
|---|---|
| `.is-drop` | Menandai tahap dengan porsi terlemah; sebutkan juga di footer. |
| `--v` | Lebar batang: jumlah dibagi jumlah tahap pertama. |

## Status
| Status | Caranya |
|---|---|
| `data change` | Atur `--v` dan teks baru: batang bergerak selama 480 ms dengan `--ease-inout`. |
| `empty` | Pertahankan nama tahap; jumlah di 0 dan satu baris: "Tidak ada kunjungan pada periode ini". |
| `loading` | Satu baris `.skel` dan strip `.skel` 28 px per tahap. |

## Gerak dan mikrointeraksi
- Saat pertama terlihat (`data-lds-grow`): batang tumbuh ke luar dari tengah dengan `--spring-smooth`, berjarak 35 ms dari atas ke bawah.
- Perubahan berikutnya: lebar selama `--d-considered` dengan `--ease-inout`. Hover memudarkan batang lain selama `--d-fast`.
- Reduced motion: langsung digambar.

## Aksesibilitas
- `ol` dengan `aria-label`, jadi tahap diumumkan berurutan dengan jumlah dan porsinya sebagai teks.
- Batang memakai `aria-hidden`; isinya mengulang angka.
- Tahap terlemah disebut dengan kata di footer, bukan hanya lewat warna.

## Lakukan
- Namai tahap sesuai yang dilakukan orang ("Mengirim permohonan").
- Tampilkan porsi dari tahap sebelumnya, bukan dari tahap pertama; di situlah keputusannya.

## Hindari
- Menggambar trapesium atau kerucut 3D; batang di tengah lebih tepat.
- Memakai funnel untuk tahap yang bisa dilewati atau diulang.

## Perilaku (HTML biasa)
Opsional: `data-lds-grow` pada daftar memutar animasi masuk saat pertama terlihat.

## Terkait
[Ranked bars](ranked-bars.md) · [Percentage bar](percentage-bar.md) · [Chart card](chart-card.md) · [Steps](steps.md)
