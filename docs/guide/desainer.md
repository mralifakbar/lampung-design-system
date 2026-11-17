# Untuk desainer

https://lampung.kartadinata.app/docs/guide/desainer

Tempat sumber desain LDS, font yang perlu dipasang, tujuh keputusan yang membentuk tampilannya, dan cara menyerahkan desain ke developer tanpa salah tafsir.

## Sumber desain

Semua nilai visual LDS berasal dari satu berkas. Bila nilai di gambar desain Anda berbeda dari berkas ini, berkas inilah yang benar.

- [tokens/tokens.json](../../tokens/tokens.json): Warna terang dan gelap, bayangan, tipografi, jarak, radius, ukuran dan gerak.

- [Warna](../index.md#/color): Permukaan, teks, aksen, emas siger dan warna status, dengan rasio kontrasnya.

- [Tipografi](../index.md#/typography): Skala huruf dengan ukuran, tebal dan jarak huruf tiap gaya.

- [Daftar ikon](../components/icon.md): Nama ikon yang tersedia. Hanya nama di icons/icons.json yang tampil.

- [Aksara Lampung](../components/aksara.md): Glif SVG di aksara/glyphs dan sprite aksara/lds-aksara.svg.

Glif aksara Lampung adalah gambar asli untuk sistem ini, satu berkas SVG per huruf dan tanda di folder `aksara/glyphs/`, digambar di grid 100 x 100 dengan garis 8 dan ujung bulat. Untuk memakai semuanya sekaligus, ambil sprite [aksara/lds-aksara.svg](../../aksara/lds-aksara.svg). Daftar nama ikon ada di [icons/icons.json](../../icons/icons.json).

## Font yang perlu dipasang

Pasang dua keluarga huruf ini di komputer Anda. Keduanya berlisensi SIL Open Font License (OFL) dan tersedia gratis di Google Fonts.

| Font | Tebal yang dipakai | Untuk |
| --- | --- | --- |
| Geist | 400, 500, 600 (700 hanya untuk judul besar di ponsel) | Semua teks antarmuka |
| Geist Mono | 400, 500 | Kode, nomor tiket, nilai teknis |

Ukuran, tebal dan jarak huruf berubah bersamaan. Teks besar dirapatkan (minus 0,03 em pada 56 px), teks kecil dilonggarkan (plus 0,01 em pada 12 px). Salin nilai dari papan tipografi, jangan mengira-ngira.

## Tujuh keputusan identitas

- **Kanvas putih.** Halaman berlatar putih bersih. Kelompok konten (kartu, daftar) duduk di atas isian abu kehijauan yang tenang, tanpa bayangan. Jangan menaruh isian di atas isian.
- **Satu aksen.** Hijau Lampung (`--accent`) hanya untuk tindakan utama, pilihan aktif dan tautan. Bila satu layar punya tiga benda hijau, dua di antaranya keliru.
- **Emas untuk identitas, bukan tindakan.** Emas siger untuk hiasan, pita aksara, lencana identitas dan sorotan. Tidak pernah untuk tombol, tautan atau pilihan.
- **Bayangan hanya untuk yang melayang.** Menu, popover, dialog, sheet, toast dan tombol aksi mengambang. Konten yang diam tidak berbayang.
- **Blur hanya di tempat konten bergulir di bawahnya.** Bilah navigasi dan bilah tab. Tidak di kartu, tidak bertumpuk.
- **Huruf bergerak sebagai satu set.** Geist dengan tiga tebal; ukuran, tebal dan jarak huruf berubah bersama.
- **Gerak tenang dan bisa disela.** Masuk dengan pegas yang tidak memantul, keluar lebih cepat, dan setiap transisi bisa dihentikan di tengah jalan. Pantulan hanya muncul setelah gerakan sentak.

## Cerita hijau dan emas

Hijau Lampung (#0B6E4F) terinspirasi dari hijau pada lambang provinsi. Emas siger (#C9952B) terinspirasi dari emas mahkota siger dan benang emas kain tapis. Keduanya adalah inspirasi, bukan lambang resmi. LDS adalah proyek komunitas yang tidak resmi; jangan memakai lambang daerah, logo pemerintah daerah atau nama instansi nyata seolah-olah sistem ini milik mereka.

Pembagian perannya tegas: hijau mengajak bertindak, emas menandai jati diri. Bila emas harus dibaca sebagai teks, pakai `--gold-text` yang lebih gelap di tema terang, karena emas biasa di atas putih tidak cukup kontras.

## Serah terima ke developer

- **Pakai nama komponen dari dokumentasi.** Tulis "Tombol utama", "Sheet", "Kolom teks" sesuai nama halaman [Komponen](../components/index.md), bukan nama buatan sendiri. Developer langsung tahu markup mana yang dipakai.
- **Pakai nama token, bukan hex.** Tulis `--text-subtle` atau `--r-lg`, bukan #56615C atau 16 px. Nama token otomatis benar di tema gelap; hex tidak.
- **Gambar keempat status.** Untuk setiap tampilan data: memuat, kosong, galat dan berisi. Tulis juga teks untuk tiap status.
- **Tunjukkan tema gelap dan layar 375 px** untuk layar yang penting, atau setidaknya tandai bagian yang perlu diperiksa.
- **Bila komponen yang dibutuhkan belum ada,** jangan membuat tampilan khusus untuk satu halaman. Usulkan komponen baru ke sistem (lihat [Kontribusi](kontribusi.md)).

## Berkas Figma

Saat ini belum ada berkas Figma resmi untuk LDS. Sumber kebenaran adalah token dan dokumentasi ini. Bila Anda menyusun pustaka Figma yang setia pada token dan komponen, kontribusi Anda sangat diterima; buka isu di GitHub agar bisa dibahas bersama sebelum dibagikan.
