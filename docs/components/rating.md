# Rating

Kelompok: Pilihan. https://lampung.kartadinata.app/docs/components/rating

Lima bintang untuk menilai sesuatu dari satu sampai lima. Hover menampilkan pratinjau skor, klik menetapkannya; dari keyboard ia berfungsi sebagai radio group.

## Pakai saat
- Orang menilai layanan, petugas, penjelasan, atau kunjungan dari satu sampai lima.
- Menampilkan rata-rata penilaian baca saja di samping judul (bintang statis tanpa tombol).

## Pakai yang lain saat
- Ya atau tidak cepat soal kegunaan ("Apakah penjelasan ini membantu?"): pakai [Button group](button-group.md). Dua tombol, atau [like](like.md) untuk satu tanggapan positif.
- Skor pada skala yang lebih luas (0 sampai 10, persentase): pakai [Slider](slider.md).
- Menampilkan skor sebagai progres atau tingkat: pakai [Meter](meter.md).
- Memilih salah satu dari beberapa tingkat bernama (Mudah, Sedang, Sulit): pakai [Segmented control](segmented-control.md).

## Letaknya
Di akhir hal yang dinilai: setelah layanan selesai, di formulir ulasan, di [sheet](sheet.md) umpan balik di ponsel. Penilaian baca saja berada di samping judul atau di baris kunci-nilai.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.stars` | Wajib. Baris sebaris berisi lima, berjarak 2 px. `role="radiogroup"` dengan `aria-label` untuk input; `role="img"` dengan `aria-label` ("4 dari 5 bintang") untuk tampilan. |
| `button.star[role=radio]` | Wajib untuk input. Target 40 px dengan ikon `star` berisi, `aria-checked`, dan nama ("4 bintang"). |
| `.on` | Pada setiap bintang sampai skor yang dipilih: warna warning. |
| `.preview` | Pada bintang sampai yang disorot selama hover: warna warning yang lebih muda. |

## Markup

**Nilai sebuah layanan.** Hover untuk pratinjau, klik untuk menetapkan. Dari keyboard, Tab ke bintang lalu pakai tombol panah.
```html
<span class="field__label" id="service-rating">Bagaimana layanan pembuatan KTP hari ini?</span>
<div class="stars" role="radiogroup" aria-labelledby="service-rating">
  <button type="button" class="star on" role="radio" aria-checked="false" tabindex="-1" aria-label="1 bintang"><span class="ic" aria-hidden="true">star</span></button>
  <button type="button" class="star on" role="radio" aria-checked="false" tabindex="-1" aria-label="2 bintang"><span class="ic" aria-hidden="true">star</span></button>
  <button type="button" class="star on" role="radio" aria-checked="true" tabindex="0" aria-label="3 bintang"><span class="ic" aria-hidden="true">star</span></button>
  <button type="button" class="star" role="radio" aria-checked="false" tabindex="-1" aria-label="4 bintang"><span class="ic" aria-hidden="true">star</span></button>
  <button type="button" class="star" role="radio" aria-checked="false" tabindex="-1" aria-label="5 bintang"><span class="ic" aria-hidden="true">star</span></button>
</div>
<!-- Your code: click sets .on up to the star and aria-checked on it; hover sets .preview; arrow keys move. -->
```

**Rata-rata baca saja.** Hanya tampilan: span, bukan tombol, dan satu nama untuk seluruh baris.
```html
<div class="docs-row" style="gap: 8px;">
  <span class="stars" role="img" aria-label="4 dari 5 bintang"><span class="star on"><span class="ic" aria-hidden="true">star</span></span><span class="star on"><span class="ic" aria-hidden="true">star</span></span><span class="star on"><span class="ic" aria-hidden="true">star</span></span><span class="star on"><span class="ic" aria-hidden="true">star</span></span><span class="star"><span class="ic" aria-hidden="true">star</span></span></span>
  <span class="field__help">4,2 dari 318 warga</span>
</div>
```

## Status
| Status | Caranya |
|---|---|
| `.on` | Bintang terpilih, dalam `--warning`. |
| `.preview` | Pratinjau hover, `--warning` pada 55 %. |
| `:active` | Bintang yang ditekan mengecil ke 0.85 dan memantul kembali. |
| `focus-visible` | Focus ring sistem pada bintang yang difokus. |

## Gerak dan mikrointeraksi
- Warna berubah dalam `--d-fast` (160 ms) dengan `--ease-standard`, sehingga menyapu bintang terasa bersambung.
- Tekan: `scale(0.85)`, kembali dengan `--spring-snappy` (360 ms).
- Reduced motion: transisi menjadi 120 ms linear.

## Aksesibilitas
- Untuk input ia adalah radio group: `role="radiogroup"` dengan label, setiap bintang `role="radio"` dengan `aria-checked` dan nama ("3 bintang").
- Fokus berpindah (roving): hanya bintang terpilih (atau yang pertama jika belum ada) yang punya `tabindex="0"`; tombol panah berpindah dan memilih. Sistem tidak punya skrip untuk ini; demo menunjukkan baris yang diperlukan.
- Untuk tampilan, satu `role="img"` dengan `aria-label` ("4 dari 5 bintang") dan span biasa; jangan pernah lima pengumuman terpisah.
- Pasangkan bintang dengan angkanya sebagai teks saat rata-rata penting (4,2).

## Lakukan
- Ajukan satu pertanyaan yang jelas di atas bintang.
- Biarkan orang mengubah penilaiannya; ucapkan terima kasih di tempat, bukan lewat dialog.

## Hindari
- Memakai setengah bintang untuk input.
- Memakai bintang untuk pertanyaan ya atau tidak.

## Perilaku (HTML biasa)
Tidak ada di sistem. Setel `.on` dan `aria-checked` saat diklik, `.preview` saat hover, dan tangani tombol panah di kode Anda.

## Terkait
[Like](like.md) · [Slider](slider.md) · [Radio](radio.md) · [Meter](meter.md)
