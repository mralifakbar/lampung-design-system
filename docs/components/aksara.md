# Aksara Lampung

Kelompok: Konten (baru). https://lampung.kartadinata.app/docs/components/aksara

Teks Latin yang digambar dalam had Lampung, aksara daerah Lampung, sebagai aksen budaya yang tenang di samping nama, judul, dan identitas. Selalu disertai bacaan Latin; jangan pernah menjadi satu-satunya cara membaca sesuatu.

## Pakai saat
- Nama tempat, layanan, atau merek ditampilkan dalam bentuk aksaranya di samping versi Latin (`data-lds-aksara="Lampung"`).
- Halaman butuh ornamen daerah yang tenang: `.aksara-band` di bawah hero, di atas footer, atau di tepi kartu.
- Mengajarkan atau merayakan aksara: tabel huruf, kartu nama, poster acara.

## Pakai yang lain saat
- Teks isi, label, tombol, atau apa pun yang harus dibaca orang untuk menyelesaikan tugas: pakai [Prose](prose.md). Tulis dalam bahasa Indonesia; letakkan aksara di sampingnya hanya sebagai aksen.
- Pemisah dekoratif tanpa makna budaya: pakai [Separator](separator.md).
- Ikon untuk sebuah konsep: pakai [Icon](icon.md).

## Letaknya
Di samping atau di atas nama Latin yang dieja (`.aksara-pair`), di kepala halaman, footer situs, keadaan kosong, dan kartu identitas. Band berada di barisnya sendiri di bawah hero atau di atas footer, selebar halaman, dengan ruang di sekitarnya. Satu atau dua kali per halaman; lebih dari itu ornamen berubah jadi kebisingan.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `[data-lds-aksara]` | Wajib. Teks Latin yang digambar, di atribut atau sebagai isi elemen. `init()` mengganti isinya dengan SVG inline dan memberi `role="img"` dengan teks Latin sebagai `aria-label`. |
| `.aksara` | Menyesuaikan ukuran gambar dengan teks (tinggi 1,2em) dan mewarisi `currentColor`. |
| `.aksara-pair / .aksara-pair__latin` | Menumpuk aksara di atas bacaan Latinnya. |
| `.aksara-band` | Strip dekoratif yang mengulang semboyan "sai bumi ruwa jurai" lewat CSS mask; `aria-hidden`. Ganti teksnya dengan `data-lds-aksara-band`. |

## Markup

**Nama dengan aksaranya.** Aksara berada di atas nama Latin yang dieja, dengan warna teks emas. Pembaca layar mendengar nama Latinnya sekali.
```html
<div class="docs-row">
  <span class="aksara-pair"><span class="aksara aksara--lg aksara--gold" data-lds-aksara="Lampung"></span><span class="aksara-pair__latin">Lampung</span></span>
  <span class="aksara-pair"><span class="aksara aksara--lg aksara--gold" data-lds-aksara="Sakai"></span><span class="aksara-pair__latin">Sakai</span></span>
  <span class="aksara-pair"><span class="aksara aksara--lg aksara--gold" data-lds-aksara="tapis"></span><span class="aksara-pair__latin">tapis</span></span>
  <span class="aksara-pair"><span class="aksara aksara--lg aksara--gold" data-lds-aksara="siger"></span><span class="aksara-pair__latin">siger</span></span>
</div>
```

**Sejajar dengan judul.** Pada ukuran teks, aksara mengikuti warna judul. Pakai untuk nama layanan atau tempat, sekali saja.
```html
<h2>Layanan Kota Contoh <span class="aksara aksara--accent" data-lds-aksara="Kota" aria-label="Kota"></span></h2>
```

**Band dekoratif.** Semboyan pada lambang provinsi, diulang sebagai strip yang tenang. Tidak membawa informasi, jadi disembunyikan dari teknologi bantu.
```html
<div class="docs-col" style="gap: 20px;">
  <div class="aksara-band" aria-hidden="true"></div>
  <div class="aksara-band aksara-band--sm aksara-band--muted" aria-hidden="true"></div>
</div>
```

**Tabel huruf.** Dua puluh induk huruf, masing-masing dengan bacaannya. Huruf membawa vokal a; anak huruf di atas, di bawah, dan di belakang mengubah vokal atau menutup suku kata.
```html
<div class="docs-row" style="flex-wrap: wrap; gap: 16px 20px;">
  <span class="aksara-pair"><span class="aksara aksara--lg" data-lds-aksara="ka"></span><span class="aksara-pair__latin">ka</span></span>
  <span class="aksara-pair"><span class="aksara aksara--lg" data-lds-aksara="ga"></span><span class="aksara-pair__latin">ga</span></span>
  <span class="aksara-pair"><span class="aksara aksara--lg" data-lds-aksara="nga"></span><span class="aksara-pair__latin">nga</span></span>
  <span class="aksara-pair"><span class="aksara aksara--lg" data-lds-aksara="pa"></span><span class="aksara-pair__latin">pa</span></span>
  <span class="aksara-pair"><span class="aksara aksara--lg" data-lds-aksara="ba"></span><span class="aksara-pair__latin">ba</span></span>
  <span class="aksara-pair"><span class="aksara aksara--lg" data-lds-aksara="ma"></span><span class="aksara-pair__latin">ma</span></span>
  <span class="aksara-pair"><span class="aksara aksara--lg" data-lds-aksara="ta"></span><span class="aksara-pair__latin">ta</span></span>
  <span class="aksara-pair"><span class="aksara aksara--lg" data-lds-aksara="da"></span><span class="aksara-pair__latin">da</span></span>
  <span class="aksara-pair"><span class="aksara aksara--lg" data-lds-aksara="na"></span><span class="aksara-pair__latin">na</span></span>
  <span class="aksara-pair"><span class="aksara aksara--lg" data-lds-aksara="ca"></span><span class="aksara-pair__latin">ca</span></span>
  <span class="aksara-pair"><span class="aksara aksara--lg" data-lds-aksara="ja"></span><span class="aksara-pair__latin">ja</span></span>
  <span class="aksara-pair"><span class="aksara aksara--lg" data-lds-aksara="nya"></span><span class="aksara-pair__latin">nya</span></span>
  <span class="aksara-pair"><span class="aksara aksara--lg" data-lds-aksara="ya"></span><span class="aksara-pair__latin">ya</span></span>
  <span class="aksara-pair"><span class="aksara aksara--lg" data-lds-aksara="a"></span><span class="aksara-pair__latin">a</span></span>
  <span class="aksara-pair"><span class="aksara aksara--lg" data-lds-aksara="la"></span><span class="aksara-pair__latin">la</span></span>
  <span class="aksara-pair"><span class="aksara aksara--lg" data-lds-aksara="ra"></span><span class="aksara-pair__latin">ra</span></span>
  <span class="aksara-pair"><span class="aksara aksara--lg" data-lds-aksara="sa"></span><span class="aksara-pair__latin">sa</span></span>
  <span class="aksara-pair"><span class="aksara aksara--lg" data-lds-aksara="wa"></span><span class="aksara-pair__latin">wa</span></span>
  <span class="aksara-pair"><span class="aksara aksara--lg" data-lds-aksara="ha"></span><span class="aksara-pair__latin">ha</span></span>
  <span class="aksara-pair"><span class="aksara aksara--lg" data-lds-aksara="gha"></span><span class="aksara-pair__latin">gha</span></span>
</div>
```

## Varian dan ukuran
| Kelas atau atribut | Kapan |
|---|---|
| `aksara--gold` | Warna teks emas (`--gold-text`), pemakaian identitas bawaan; kontras 4,5:1 di atas putih dan fill. |
| `aksara--accent / aksara--muted` | Warna teks aksen atau teks redup, untuk mendampingi judul atau keterangan. |
| `aksara--lg` | Dua kali tinggi teks, untuk kartu nama dan blok identitas. |
| `aksara-band--sm / aksara-band--lg` | Strip 18 / 44 px. Bawaan 28. |
| `aksara-band--muted` | Strip netral untuk layar padat ketika emas akan bersaing. |

## Status
| Status | Caranya |
|---|---|
| `sebelum init` | Elemen kosong (atau menampilkan teks Latinnya) sampai `init()` berjalan; isi dengan teks Latin bila halaman harus tetap terbaca tanpa JavaScript. |
| `forced colors` | Band disembunyikan pada mode kontras tinggi Windows; nama tetap punya teks Latinnya. |

## Gerak dan mikrointeraksi
- Tidak ada. Aksara adalah bagian identitas, bukan peristiwa; tidak pernah dianimasikan atau diulang.

## Aksesibilitas
- `[data-lds-aksara]` menjadi `role="img"` dengan teks Latin sebagai namanya, jadi diumumkan sekali dan tidak huruf per huruf. Pakai `aria-hidden="true"` bila teks Latin sudah ada tepat di sampingnya (seperti pada `.aksara-pair`), agar tidak dibaca dua kali.
- Band selalu `aria-hidden` dan tidak membawa informasi.
- Jangan menaruh makna hanya dalam aksara: setiap label, instruksi, dan nilai ditulis dalam huruf Latin.

## Lakukan
- Pasangkan setiap aksara dengan bacaan Latinnya, terlihat atau lewat `aria-label`.
- Batasi di satu atau dua tempat per halaman: nama, judul, satu band.
- Minta penutur atau guru had Lampung memeriksa ejaan sebelum dicetak pada materi resmi.

## Hindari
- Menulis teks isi, label formulir, atau tombol dalam aksara.
- Memakai band sebagai pemisah di antara setiap bagian.
- Mencampurnya dengan lambang atau logo pemerintah daerah: sistem ini tidak resmi.

## Perilaku (HTML biasa)
`init()` memanggil `renderAksara(root)`, yang mengisi `[data-lds-aksara]` dan `.aksara-band`. Pakai `toAksara(text)` untuk sel suku kata dan `aksaraSvg(text)` untuk string SVG (keduanya diekspor dari `lampung-design-system/js` dan `lampung-design-system/aksara`). Berkas statis: `aksara/lds-aksara.svg` (sprite, `<use href="lds-aksara.svg#ka"/>`) dan `aksara/glyphs/*.svg`.

## Terkait
[Prose](prose.md) · [Icon](icon.md) · [Theming](theming.md) · [Site footer](site-footer.md)
