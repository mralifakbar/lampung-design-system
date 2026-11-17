# Accordion

Kelompok: Tampilan data. https://lampung.kartadinata.app/docs/components/accordion

Tumpukan pertanyaan atau bagian yang masing-masing membuka panelnya dengan spring. Untuk isi yang dibaca sebagian saja; jangan pernah untuk menyembunyikan hal yang dibutuhkan semua orang.

## Pakai saat
- Pertanyaan yang sering diajukan, ketika setiap orang hanya butuh satu atau dua jawaban.
- Detail tambahan di bawah setiap butir halaman: isi tiap jenis layanan, syarat tiap jenis izin.
- Halaman pengaturan atau rujukan yang panjang, yang bagiannya bisa dibaca satu per satu (`data-lds-accordion="single"` menjaga hanya satu yang terbuka).

## Pakai yang lain saat
- Berpindah antar tampilan setara dari isi yang sama: pakai [Tabs](tabs.md).
- Beberapa butir pertama daftar, sisanya di balik tombol: pakai [Show more](show-more.md).
- Hierarki bertingkat folder atau halaman: pakai [Tree](tree.md).
- Satu langkah yang diambil asisten, beserta detailnya: pakai [Tool call](tool-call.md).
- Navigasi di dalam halaman panjang: pakai [Outline](outline.md).
- Isi yang wajib dibaca semua orang; tampilkan saja: pakai [Prose](prose.md).

## Letaknya
Di kolom isi, selebar kolom itu, sering di bawah judul [bagian](sections.md). Putih dengan ring di atas kanvas, `.acc--fill` di atas panel putih. Di ponsel sama saja; seluruh baris menjadi area ketuk.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.acc` | Wajib. Grupnya: putih, ring, radius besar. `data-lds-accordion="single"` menutup yang lain saat satu dibuka. |
| `.acc--fill` | Isian tenang, tanpa ring. |
| `.acc__item` | Wajib. Satu pertanyaan atau bagian; garis tipis di antara butir. |
| `button.acc__btn` | Wajib. Baris 56 px berisi judul dan ikon `expand_more` yang berputar saat terbuka. `aria-expanded` dan `aria-controls`. |
| `.acc__title > text + .acc__sub` | Judul dua baris opsional dengan baris kedua yang lebih samar. |
| `.acc__panel(.is-open)` | Wajib. Panelnya; terbuka dengan menganimasikan baris grid. Berisi satu `div`. |
| `.acc__panel > div > p` | Teks jawaban biasa. |
| `.acc__panel > div > .acc__content` | Isi yang lebih kaya: daftar mendapat bullet dan jarak, tabel dan aksi bertumpuk dengan jarak 10 px. |

## Markup

**Pertanyaan, satu terbuka sekaligus.** Dengan `data-lds-accordion="single"`, membuka satu butir menutup butir lain.
```html
<div class="acc" data-lds-accordion="single" style="max-width: 560px;">
  <div class="acc__item"><button class="acc__btn" id="faq1-b" aria-expanded="true" aria-controls="faq1">Bisakah saya mengubah jadwal antrean setelah mendaftar?<span class="ic" aria-hidden="true">expand_more</span></button><div class="acc__panel is-open" id="faq1" role="region" aria-labelledby="faq1-b"><div><p>Bisa, paling lambat sehari sebelum kedatangan. Pada hari itu, tanyakan ke loket Disdukcapil di Way Halim.</p></div></div></div>
  <div class="acc__item"><button class="acc__btn" id="faq2-b" aria-expanded="false" aria-controls="faq2">Di mana saya menemukan KK baru saya?<span class="ic" aria-hidden="true">expand_more</span></button><div class="acc__panel" id="faq2" role="region" aria-labelledby="faq2-b"><div><p>Di menu Dokumen, lalu Data kependudukan. Anda bisa mengunduhnya sebagai PDF ber-QR code.</p></div></div></div>
  <div class="acc__item"><button class="acc__btn" id="faq3-b" aria-expanded="false" aria-controls="faq3">Bagaimana jika saya terlewat jadwal perekaman e-KTP?<span class="ic" aria-hidden="true">expand_more</span></button><div class="acc__panel" id="faq3" role="region" aria-labelledby="faq3-b"><div><p>Pesan jadwal baru. Perekaman juga dibuka setiap Sabtu di kantor Kecamatan Kedaton.</p></div></div></div>
</div>
```

**Judul dua baris dan isi kaya.** `.acc__title` dengan `.acc__sub`, dan `.acc__content` untuk daftar dan aksi. Beberapa butir bisa terbuka bersamaan.
```html
<div class="acc acc--fill" style="max-width: 560px;">
  <div class="acc__item"><button class="acc__btn" aria-expanded="false" aria-controls="sec1"><span class="acc__title">Langkah 1: dokumen yang dibawa<span class="acc__sub">4 dokumen · diperiksa di loket</span></span><span class="ic" aria-hidden="true">expand_more</span></button><div class="acc__panel" id="sec1" role="region"><div><div class="acc__content"><p>Bawa dokumen asli; fotokopi dibuat di loket.</p><ul><li>Surat pengantar RT/RW.</li><li>KK dan KTP lama.</li></ul><button class="btn btn--secondary btn--sm" style="align-self: flex-start;">Lihat daftar lengkap</button></div></div></div></div>
  <div class="acc__item"><button class="acc__btn" aria-expanded="false" aria-controls="sec2"><span class="acc__title">Langkah 2: biaya<span class="acc__sub">Gratis · tanpa bayar di loket</span></span><span class="ic" aria-hidden="true">expand_more</span></button><div class="acc__panel" id="sec2" role="region"><div><div class="acc__content"><p>Dokumen kependudukan tidak dipungut biaya. Laporkan permintaan uang lewat kanal pengaduan.</p></div></div></div></div>
</div>
```

## Varian dan ukuran
| Kelas atau atribut | Kapan |
|---|---|
| `acc` | Putih dengan ring. |
| `acc--fill` | Isian tenang, untuk panel putih. |
| `data-lds-accordion="single"` | Satu butir terbuka sekaligus. |

## Status
| Status | Caranya |
|---|---|
| `closed` | `aria-expanded="false"` pada tombol, `.acc__panel` tanpa `is-open`. |
| `open` | `aria-expanded="true"` dan `.acc__panel.is-open`; ikon berputar 180 derajat. |
| `hover` | Tombol diberi warna `--bg-tint`. |

## Gerak dan mikrointeraksi
- Tinggi: `.acc__panel` menganimasikan `grid-template-rows` dari 0fr ke 1fr dengan `--spring-smooth` (`--d-smooth`, 560 ms), bukan tebakan `max-height`, sehingga isi setinggi apa pun terbuka dengan kecepatan yang sama.
- Isi: opacity dan naik 4 px. Masuk: opacity selama `--d-standard` dengan `--ease-enter` terlambat 80 ms, naik dengan `--spring-smooth` terlambat 40 ms, sehingga ruangnya terbuka sebelum teks tiba. Keluar: keduanya selama `--d-fast` dengan `--ease-exit`.
- Chevron berputar 180 derajat dengan `--spring-smooth`. Semuanya transition, jadi klik kedua di tengah jalan membalik arah dengan mulus.
- Reduced motion: perubahan linear 120 ms.

## Aksesibilitas
- Kepala butir adalah `<button>` asli dengan `aria-expanded` dan `aria-controls` yang menunjuk `id` panel. Bungkus dengan heading (`h3`) bila accordion menjadi kerangka halaman.
- Panel memakai `role="region"` dan `aria-labelledby` ke tombolnya bila jumlahnya enam atau kurang; lepas role itu untuk daftar panjang.
- Panel tertutup hanya diciutkan secara visual; tautan dan tombol di dalamnya tetap bisa difokus. Pasang `inert` pada panel tertutup yang berisi kontrol (pengguna React `AccordionItem` bisa menambahkannya dengan cara yang sama).
- Enter dan Space membuka dan menutup (tombol bawaan). Jangan menahan tombol panah.

## Lakukan
- Tulis setiap judul sebagai pertanyaan atau nama bagian yang dicari orang.
- Pakai mode `single` hanya bila butirnya saling menggantikan; biarkan FAQ membuka beberapa sekaligus.
- Buka butir yang menjawab pertanyaan paling umum secara default bila itu membantu.

## Hindari
- Menyembunyikan informasi wajib atau aksi utama di panel tertutup.
- Menumpuk accordion di dalam accordion.
- Menganimasikan tinggi dengan `max-height` atau pengukuran lewat JS.

## Perilaku (HTML biasa)
`init()` memasang setiap `.acc__btn[aria-controls]`: klik membalik `aria-expanded` dan mengganti `.is-open` pada panel. `data-lds-accordion="single"` pada grup menutup butir lain.

## React
```tsx
import { AccordionItem } from 'lampung-design-system/react';

<div className="acc">
  <AccordionItem title="Step 1: documents to bring" sub="4 documents · checked at the counter" defaultOpen>
    <p>Bring the originals; copies are made at the counter.</p>
  </AccordionItem>
</div>
```

## Terkait
[Tabs](tabs.md) · [Show more](show-more.md) · [Tree](tree.md) · [Height expand](height-expand.md)
