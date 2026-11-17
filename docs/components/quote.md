# Quote

Kelompok: Konten. https://lampung.kartadinata.app/docs/components/quote

Kata-kata yang diucapkan atau ditulis orang lain, dipisahkan oleh garis aksen 3 px di kiri, 17/28 dengan `--text-strong`, dengan sumber di footer di bawahnya. Hanya untuk kutipan sungguhan.

## Pakai saat
- Mengutip orang, aturan atau sumber di dalam artikel, panduan atau laporan: ucapan lurah, pasal dari tata tertib layanan.
- Menampilkan umpan balik yang ditulis seseorang, dengan menyebut penulisnya (komentar verifikator pada permohonan).

## Pakai yang lain saat
- Menarik perhatian pada peringatan, tips atau syarat penting: pakai [Alert](alert.md). Garis kutipan bukan callout.
- Satu langkah berikutnya di halaman: pakai [Spotlight](spotlight.md).
- Menunjuk sumber sebuah fakta: pakai [Citation](citation.md). Sitasi bernomor bersifat inline; kutipan mereproduksi kata-katanya.
- Menampilkan kode atau keluaran: pakai [Code block](code-block.md).
- Testimoni di halaman pemasaran: pakai [Card](card.md). Hanya dengan kata-kata asli yang jelas penulisnya; jangan pernah mengarang.

## Letaknya
Di aliran [prose](prose.md) atau sebuah bagian, selebar bacaan. Ia mengatur `margin: 0`, dan karena aturan itu datang setelah jarak prose, jarak 16 px di dalam `.prose` juga ikut hilang; letakkan di `stack` atau tambahkan `margin-block: 16px` di CSS proyek sampai sistem memperbaikinya. Di ponsel garis dan lebar penuhnya tetap.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `blockquote.quote` | Wajib. Kutipan dengan garis aksen dan padding kiri 18 px. Berisi satu atau lebih `<p>`. |
| `footer` | Opsional. Siapa yang mengatakan dan di mana: `--type-footnote` dengan `--text-subtle`, 8 px di bawahnya. |
| `figure.quote + figcaption` | Juga didukung untuk atribusi, tetapi letakkan kata-katanya di `<p>`, bukan di `<blockquote>` bersarang (margin bawaan browser-nya tidak direset). |

## Markup

**Di dalam panduan layanan.** Kutipan pendek dengan sumbernya.
```html
<blockquote class="quote measure">
  <p>Pemohon wajib datang sendiri untuk perekaman KTP elektronik; perekaman tidak dapat diwakilkan.</p>
  <footer>Tata tertib loket pelayanan, Kantor Kecamatan Kedaton, pasal 12</footer>
</blockquote>
```

**Umpan balik pada permohonan.** Kata-kata dari seseorang dengan nama penulisnya, dan tanggal di footer.
```html
<figure class="quote measure">
  <p>Denah lokasinya jelas dan berkasnya lengkap. Lain kali, tambahkan foto papan nama usaha yang diambil dari depan.</p>
  <figcaption>Sari Wulandari, verifikator, pada permohonan IUM 2104 · 3 November</figcaption>
</figure>
```

## Gerak dan mikrointeraksi
- Tidak ada. Kutipan adalah teks statis.

## Aksesibilitas
- Pakai `<blockquote>` (atau `<figure>` dengan `<figcaption>`) agar kutipan diumumkan sebagai satu kesatuan.
- Letakkan atribusi di `footer` atau `figcaption`, bukan di paragraf yang dikutip.
- Tambahkan `cite="url"` pada blockquote jika sumbernya daring, dan tautkan sumbernya di footer.

## Lakukan
- Kutip dengan persis dan sebutkan sumber setiap kutipan.
- Batasi kutipan sampai beberapa kalimat.

## Hindari
- Memakai `.quote` untuk menyorot teks Anda sendiri.
- Mengarang kutipan atau testimoni untuk konten contoh.
- Menaruh `<blockquote>` di dalam `figure.quote`.

## Terkait
[Prose](prose.md) · [Citation](citation.md) · [Alert](alert.md) · [Spotlight](spotlight.md)
