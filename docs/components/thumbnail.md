# Thumbnail

Kelompok: Konten. https://lampung.kartadinata.app/docs/components/thumbnail

Pratinjau gambar yang dipotong dengan rasio tetap (bawaan 4:3) di atas placeholder cekung. Sebagai tautan dengan `data-lds-lightbox`, ia membuka gambar penuh di [lightbox](lightbox.md) yang tumbuh dari thumbnail.

## Pakai saat
- Foto dan tangkapan layar di dalam konten: lampiran laporan warga, foto lokasi layanan, gambar di panduan layanan.
- Grid gambar yang mungkin ingin dilihat lebih besar (`auto-grid` berisi `.thumb`).

## Pakai yang lain saat
- Foto orang atau logo organisasi: pakai [Avatar](avatar.md).
- Gambar di atas card yang tidak bisa dibuka: pakai [Card](card.md). Pakai `card__media` di dalam card.
- Berkas yang bukan gambar (PDF, spreadsheet): pakai [File input](file-input.md). Tampilkan sebagai baris berkas dengan ikon, nama dan ukurannya.
- Deretan gambar yang digulir ke samping: pakai [Carousel](carousel.md).
- Penampil layar penuhnya sendiri: pakai [Lightbox](lightbox.md).

## Letaknya
Di [prose](prose.md) selebar bacaan penuh, di `auto-grid` dengan `--min` sekitar 160 px untuk galeri, atau di samping teks dalam baris list dengan lebar tetap. Di ponsel galeri turun menjadi dua kolom dengan `--min: 140px`.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.thumb` | Wajib. `<a href="large.jpg">` jika bisa dibuka, `<div>` jika tidak. Memotong gambar sesuai `--r-md` dan mempertahankan `--ratio` (bawaan `4 / 3`). |
| `img` | Wajib. `alt` menjelaskan gambar; `object-fit: cover` memotongnya sesuai rasio. |
| `data-lds-lightbox` | Pada tautan: membuka `href` di lightbox. `data-caption` mengatur keterangan dan nama dialog; `data-close` mengganti label tombol tutup. |
| `--ratio` | Opsional. `1` untuk persegi, `16 / 9` untuk tangkapan layar dan cuplikan video. |

## Markup

**Galeri.** Klik gambar: ia tumbuh menjadi lightbox dari posisinya dan menyusut kembali saat ditutup (Escape, tombol tutup atau klik di luar).
```html
<div class="auto-grid" style="--min: 160px;">
  <a class="thumb" href="office-large.jpg" data-lds-lightbox data-caption="Kantor Kelurahan Way Halim, tampak depan"><img src="office-small.jpg" alt="Kantor Kelurahan Way Halim, tampak depan"></a>
  <a class="thumb" href="counters-large.jpg" data-lds-lightbox data-caption="Loket layanan, Mal Pelayanan Publik"><img src="counters-small.jpg" alt="Loket layanan, Mal Pelayanan Publik"></a>
</div>
```

**Rasio.** Persegi untuk grid mirip profil, 16:9 untuk tangkapan layar. Warna placeholder tampil selama gambar dimuat.
```html
<div class="cluster" style="--gap: 12px; align-items: flex-start;">
  <div style="width: 140px;"><a class="thumb" href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20600%22%3E%3Crect%20width%3D%22800%22%20height%3D%22600%22%20fill%3D%22%23F7EEDF%22%2F%3E%3Crect%20x%3D%220%22%20y%3D%22380%22%20width%3D%22800%22%20height%3D%22220%22%20fill%3D%22%23EBD7B5%22%2F%3E%3Crect%20x%3D%22110%22%20y%3D%22250%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.55%22%2F%3E%3Crect%20x%3D%22210%22%20y%3D%22250%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.55%22%2F%3E%3Crect%20x%3D%22310%22%20y%3D%22250%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.55%22%2F%3E%3Crect%20x%3D%22410%22%20y%3D%22250%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.55%22%2F%3E%3Crect%20x%3D%22510%22%20y%3D%22250%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.55%22%2F%3E%3Crect%20x%3D%22610%22%20y%3D%22250%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.55%22%2F%3E%3Crect%20x%3D%22110%22%20y%3D%22310%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.67%22%2F%3E%3Crect%20x%3D%22210%22%20y%3D%22310%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.67%22%2F%3E%3Crect%20x%3D%22310%22%20y%3D%22310%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.67%22%2F%3E%3Crect%20x%3D%22410%22%20y%3D%22310%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.67%22%2F%3E%3Crect%20x%3D%22510%22%20y%3D%22310%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.67%22%2F%3E%3Crect%20x%3D%22610%22%20y%3D%22310%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.67%22%2F%3E%3Crect%20x%3D%22110%22%20y%3D%22370%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.79%22%2F%3E%3Crect%20x%3D%22210%22%20y%3D%22370%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.79%22%2F%3E%3Crect%20x%3D%22310%22%20y%3D%22370%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.79%22%2F%3E%3Crect%20x%3D%22410%22%20y%3D%22370%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.79%22%2F%3E%3Crect%20x%3D%22510%22%20y%3D%22370%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.79%22%2F%3E%3Crect%20x%3D%22610%22%20y%3D%22370%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.79%22%2F%3E%3Crect%20x%3D%22110%22%20y%3D%22430%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.91%22%2F%3E%3Crect%20x%3D%22210%22%20y%3D%22430%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.91%22%2F%3E%3Crect%20x%3D%22310%22%20y%3D%22430%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.91%22%2F%3E%3Crect%20x%3D%22410%22%20y%3D%22430%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.91%22%2F%3E%3Crect%20x%3D%22510%22%20y%3D%22430%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.91%22%2F%3E%3Crect%20x%3D%22610%22%20y%3D%22430%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.91%22%2F%3E%3Crect%20x%3D%22250%22%20y%3D%22110%22%20width%3D%22300%22%20height%3D%22100%22%20fill%3D%22%23FFFFFF%22%2F%3E%3C%2Fsvg%3E" data-lds-lightbox data-caption="Ruang tunggu Disdukcapil" style="--ratio: 1;"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20600%22%3E%3Crect%20width%3D%22800%22%20height%3D%22600%22%20fill%3D%22%23F7EEDF%22%2F%3E%3Crect%20x%3D%220%22%20y%3D%22380%22%20width%3D%22800%22%20height%3D%22220%22%20fill%3D%22%23EBD7B5%22%2F%3E%3Crect%20x%3D%22110%22%20y%3D%22250%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.55%22%2F%3E%3Crect%20x%3D%22210%22%20y%3D%22250%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.55%22%2F%3E%3Crect%20x%3D%22310%22%20y%3D%22250%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.55%22%2F%3E%3Crect%20x%3D%22410%22%20y%3D%22250%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.55%22%2F%3E%3Crect%20x%3D%22510%22%20y%3D%22250%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.55%22%2F%3E%3Crect%20x%3D%22610%22%20y%3D%22250%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.55%22%2F%3E%3Crect%20x%3D%22110%22%20y%3D%22310%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.67%22%2F%3E%3Crect%20x%3D%22210%22%20y%3D%22310%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.67%22%2F%3E%3Crect%20x%3D%22310%22%20y%3D%22310%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.67%22%2F%3E%3Crect%20x%3D%22410%22%20y%3D%22310%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.67%22%2F%3E%3Crect%20x%3D%22510%22%20y%3D%22310%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.67%22%2F%3E%3Crect%20x%3D%22610%22%20y%3D%22310%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.67%22%2F%3E%3Crect%20x%3D%22110%22%20y%3D%22370%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.79%22%2F%3E%3Crect%20x%3D%22210%22%20y%3D%22370%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.79%22%2F%3E%3Crect%20x%3D%22310%22%20y%3D%22370%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.79%22%2F%3E%3Crect%20x%3D%22410%22%20y%3D%22370%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.79%22%2F%3E%3Crect%20x%3D%22510%22%20y%3D%22370%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.79%22%2F%3E%3Crect%20x%3D%22610%22%20y%3D%22370%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.79%22%2F%3E%3Crect%20x%3D%22110%22%20y%3D%22430%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.91%22%2F%3E%3Crect%20x%3D%22210%22%20y%3D%22430%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.91%22%2F%3E%3Crect%20x%3D%22310%22%20y%3D%22430%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.91%22%2F%3E%3Crect%20x%3D%22410%22%20y%3D%22430%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.91%22%2F%3E%3Crect%20x%3D%22510%22%20y%3D%22430%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.91%22%2F%3E%3Crect%20x%3D%22610%22%20y%3D%22430%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.91%22%2F%3E%3Crect%20x%3D%22250%22%20y%3D%22110%22%20width%3D%22300%22%20height%3D%22100%22%20fill%3D%22%23FFFFFF%22%2F%3E%3C%2Fsvg%3E" alt="Ruang tunggu Disdukcapil"></a></div>
  <div style="width: 260px;"><a class="thumb" href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20600%22%3E%3Crect%20width%3D%22800%22%20height%3D%22600%22%20fill%3D%22%23E6F4F1%22%2F%3E%3Crect%20x%3D%220%22%20y%3D%22400%22%20width%3D%22800%22%20height%3D%22200%22%20fill%3D%22%23C3E3DC%22%2F%3E%3Crect%20x%3D%22120%22%20y%3D%22300%22%20width%3D%22560%22%20height%3D%2230%22%20fill%3D%22%230E9F8E%22%2F%3E%3Crect%20x%3D%22180%22%20y%3D%22200%22%20width%3D%22120%22%20height%3D%22100%22%20rx%3D%228%22%20fill%3D%22%231C1C20%22%2F%3E%3Crect%20x%3D%22340%22%20y%3D%22190%22%20width%3D%22140%22%20height%3D%22110%22%20rx%3D%228%22%20fill%3D%22%231C1C20%22%2F%3E%3Crect%20x%3D%22520%22%20y%3D%22210%22%20width%3D%22110%22%20height%3D%2290%22%20rx%3D%228%22%20fill%3D%22%231C1C20%22%2F%3E%3Crect%20x%3D%22192%22%20y%3D%22212%22%20width%3D%2296%22%20height%3D%2270%22%20fill%3D%22%232BB585%22%2F%3E%3Crect%20x%3D%22352%22%20y%3D%22202%22%20width%3D%22116%22%20height%3D%2286%22%20fill%3D%22%232BB585%22%2F%3E%3Crect%20x%3D%22532%22%20y%3D%22222%22%20width%3D%2286%22%20height%3D%2266%22%20fill%3D%22%232BB585%22%2F%3E%3C%2Fsvg%3E" data-lds-lightbox data-caption="Loket layanan, Mal Pelayanan Publik" style="--ratio: 16 / 9;"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20600%22%3E%3Crect%20width%3D%22800%22%20height%3D%22600%22%20fill%3D%22%23E6F4F1%22%2F%3E%3Crect%20x%3D%220%22%20y%3D%22400%22%20width%3D%22800%22%20height%3D%22200%22%20fill%3D%22%23C3E3DC%22%2F%3E%3Crect%20x%3D%22120%22%20y%3D%22300%22%20width%3D%22560%22%20height%3D%2230%22%20fill%3D%22%230E9F8E%22%2F%3E%3Crect%20x%3D%22180%22%20y%3D%22200%22%20width%3D%22120%22%20height%3D%22100%22%20rx%3D%228%22%20fill%3D%22%231C1C20%22%2F%3E%3Crect%20x%3D%22340%22%20y%3D%22190%22%20width%3D%22140%22%20height%3D%22110%22%20rx%3D%228%22%20fill%3D%22%231C1C20%22%2F%3E%3Crect%20x%3D%22520%22%20y%3D%22210%22%20width%3D%22110%22%20height%3D%2290%22%20rx%3D%228%22%20fill%3D%22%231C1C20%22%2F%3E%3Crect%20x%3D%22192%22%20y%3D%22212%22%20width%3D%2296%22%20height%3D%2270%22%20fill%3D%22%232BB585%22%2F%3E%3Crect%20x%3D%22352%22%20y%3D%22202%22%20width%3D%22116%22%20height%3D%2286%22%20fill%3D%22%232BB585%22%2F%3E%3Crect%20x%3D%22532%22%20y%3D%22222%22%20width%3D%2286%22%20height%3D%2266%22%20fill%3D%22%232BB585%22%2F%3E%3C%2Fsvg%3E" alt="Loket layanan, Mal Pelayanan Publik"></a></div>
  <div class="thumb" style="width: 180px;" role="img" aria-label="Foto masih dimuat"></div>
</div>
```

## Status
| Status | Caranya |
|---|---|
| `loading` | `.thumb` kosong menampilkan `--bg-recessed` dengan ukuran akhirnya, jadi tidak ada yang melompat saat gambar datang. Tambahkan `loading="lazy"` pada gambar. |
| `hover` | Di perangkat yang mendukung hover, gambar membesar ke 1,03 di dalam bingkainya dengan `--spring-smooth`. |
| `open` | Lightbox berupa `role="dialog"` di atas halaman; thumbnail mendapat fokus kembali saat ditutup. |

## Gerak dan mikrointeraksi
- Hover: `transform: scale(1.03)` pada gambar selama `--d-smooth` dengan `--spring-smooth`; bingkainya tidak bergerak.
- Buka: gambar penuh beranimasi dari kotak thumbnail ke kotaknya sendiri (transform FLIP) selama 420 ms dengan kurva masuk, sementara scrim memudar masuk selama `--d-standard`. Tutup menjalankannya terbalik dalam 220 ms dengan `--ease-exit`.
- Reduced motion: tanpa membesar atau menyusut; lightbox muncul dan hilang hanya dengan fade scrim.

## Aksesibilitas
- Setiap `img` punya teks `alt` yang menjelaskannya; lightbox memakainya ulang.
- Tautan adalah kontrolnya: bisa difokus dan dibuka dengan Enter. Namanya berasal dari `alt` gambar.
- Di lightbox fokus pindah ke tombol tutup, Tab tetap di sana, Escape menutup, dan fokus kembali ke thumbnail.
- Gambar dekoratif tidak cocok untuk thumbnail; pakai `alt=""` tanpa tautan.

## Lakukan
- Sajikan berkas kecil di `src` dan berkas besar di `href`.
- Pakai satu rasio dalam satu galeri.
- Tulis keterangan yang menyebut apa dan di mana.

## Hindari
- Menambah border, bayangan atau radius berbeda pada `.thumb`.
- Membungkus thumbnail dengan [card](card.md) hanya untuk membingkainya.
- Membuka berkas bukan gambar dengan `data-lds-lightbox`.

## Perilaku (HTML biasa)
`data-lds-lightbox` pada `<a class="thumb" href>` yang membungkus `<img>`. `init()` membangun lightbox saat diklik (`role="dialog"`, `aria-modal`, tombol tutup, keterangan opsional), menganimasikannya dari thumbnail dan kembali, menutup dengan Escape atau klik di luar, dan mengembalikan fokus.

## Terkait
[Lightbox](lightbox.md) · [Avatar](avatar.md) · [Card](card.md) · [Layout primitives](layout-primitives.md)
