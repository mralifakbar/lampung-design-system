# Shared element

Kelompok: Gerak. https://lampung.kartadinata.app/docs/components/shared-element

Gambar yang Anda ketuk membesar dari thumbnail-nya sendiri menjadi tampilan penuh dan mengecil kembali ke tempat yang sama saat ditutup (transisi FLIP). Karena objeknya tidak pernah hilang, orang tidak kehilangan posisinya: tampilan besar jelas merupakan benda yang sama, bukan halaman baru.

## Pakai saat
- Membuka foto, diagram, atau hasil pindaian dari grid atau artikel ke dalam [lightbox](lightbox.md).
- Thumbnail apa pun yang versi besarnya adalah gambar yang sama: foto gedung layanan, hasil pemeriksaan, pindaian dokumen permohonan.

## Pakai yang lain saat
- Membuka detail yang bukan gambar yang sama (kartu layanan ke halamannya): pakai [Nav progress](nav-progress.md). Belum ada transisi shared element umum untuk elemen sembarang; berpindah halaman seperti biasa.
- Formulir atau pertanyaan di atas halaman: pakai [Dialog](dialog.md).
- Menjelajahi deretan gambar di tempat: pakai [Carousel](carousel.md).
- Konten yang terbuka di bawah pemicunya: pakai [Height expand](height-expand.md).
- Menampilkan gambar kecil di daftar atau kartu: pakai [Thumbnail](thumbnail.md).

## Letaknya
Pada tautan `.thumb` (`<a class="thumb" href="large.jpg" data-lds-lightbox>`) yang membungkus `<img>`, di mana saja: `auto-grid` berisi foto, gambar di dalam [prose](prose.md), kartu. Lightbox ditambahkan ke `<body>` sebagai layer tetap.

## Markup

**Grid foto gedung layanan.** Buka sebuah foto: foto membesar dari posisinya yang tepat di grid ke tengah sementara backdrop memudar masuk. Tutup (Escape, tombol tutup, atau backdrop) dan foto mengecil kembali ke kotak yang sama.
```html
<div class="auto-grid" style="--min: 150px;">
  <a class="thumb" href="library-large.jpg" data-lds-lightbox data-caption="Mal pelayanan publik, pintu timur">
    <img src="library-small.jpg" alt="Gedung mal pelayanan publik dengan jendela tinggi">
  </a>
  …
</div>
```

**Gambar di dalam panduan.** Di dalam artikel, gambar tetap kecil agar orang bisa terus membaca; mengetuknya akan membesarkannya tanpa kehilangan posisi di teks.
```html
<div class="prose">
  <p>Pemeriksaan kesehatan ibu hamil dilayani di gedung rawat jalan setiap Senin dan Kamis. Foto di bawah menunjukkan gedung tempat Anda mendaftar.</p>
  <div style="max-width: 280px;"><a class="thumb" href="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20800%20600'%3E%3Crect%20width%3D'800'%20height%3D'600'%20fill%3D'%23DCFCE7'%2F%3E%3Ccircle%20cx%3D'640'%20cy%3D'130'%20r%3D'56'%20fill%3D'%23FDE68A'%2F%3E%3Crect%20x%3D'170'%20y%3D'210'%20width%3D'460'%20height%3D'270'%20rx%3D'8'%20fill%3D'%2315803D'%2F%3E%3Cpath%20d%3D'M150%20220%20L400%20110%20L650%20220%20Z'%20fill%3D'%2315803D'%2F%3E%3Cg%20fill%3D'%23DCFCE7'%20opacity%3D'0.85'%3E%3Crect%20x%3D'220'%20y%3D'270'%20width%3D'60'%20height%3D'80'%2F%3E%3Crect%20x%3D'320'%20y%3D'270'%20width%3D'60'%20height%3D'80'%2F%3E%3Crect%20x%3D'420'%20y%3D'270'%20width%3D'60'%20height%3D'80'%2F%3E%3Crect%20x%3D'520'%20y%3D'270'%20width%3D'60'%20height%3D'80'%2F%3E%3Crect%20x%3D'360'%20y%3D'380'%20width%3D'80'%20height%3D'100'%2F%3E%3C%2Fg%3E%3Crect%20y%3D'480'%20width%3D'800'%20height%3D'120'%20fill%3D'%23166534'%2F%3E%3C%2Fsvg%3E" data-lds-lightbox data-caption="Puskesmas, gedung rawat jalan, ruang 2"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20800%20600'%3E%3Crect%20width%3D'800'%20height%3D'600'%20fill%3D'%23DCFCE7'%2F%3E%3Ccircle%20cx%3D'640'%20cy%3D'130'%20r%3D'56'%20fill%3D'%23FDE68A'%2F%3E%3Crect%20x%3D'170'%20y%3D'210'%20width%3D'460'%20height%3D'270'%20rx%3D'8'%20fill%3D'%2315803D'%2F%3E%3Cpath%20d%3D'M150%20220%20L400%20110%20L650%20220%20Z'%20fill%3D'%2315803D'%2F%3E%3Cg%20fill%3D'%23DCFCE7'%20opacity%3D'0.85'%3E%3Crect%20x%3D'220'%20y%3D'270'%20width%3D'60'%20height%3D'80'%2F%3E%3Crect%20x%3D'320'%20y%3D'270'%20width%3D'60'%20height%3D'80'%2F%3E%3Crect%20x%3D'420'%20y%3D'270'%20width%3D'60'%20height%3D'80'%2F%3E%3Crect%20x%3D'520'%20y%3D'270'%20width%3D'60'%20height%3D'80'%2F%3E%3Crect%20x%3D'360'%20y%3D'380'%20width%3D'80'%20height%3D'100'%2F%3E%3C%2Fg%3E%3Crect%20y%3D'480'%20width%3D'800'%20height%3D'120'%20fill%3D'%23166534'%2F%3E%3C%2Fsvg%3E" alt="Gedung rawat jalan puskesmas di antara pepohonan"></a></div>
  <p>Bawa buku KIA dan KTP Anda. Loket pendaftaran buka 15 menit sebelum pelayanan dimulai.</p>
</div>
```

## Gerak dan mikrointeraksi
- FLIP: gambar besar diletakkan di posisi akhirnya, lalu dianimasikan dari kotak thumbnail (`translate` ditambah `scale` dari kotak yang diukur) ke `none`. Buka: 420 ms dengan kurva masuk (`cubic-bezier(0.16, 1, 0.3, 1)`, nilai `--ease-enter`). Tutup: jalur yang sama dibalik dalam 220 ms, kembali ke thumbnail.
- Backdrop: `.lightbox` memudar masuk selama `--d-standard` dengan `--ease-enter` dan keluar selama `--d-exit` dengan `--ease-exit`.
- Hanya `transform` yang dianimasikan (titik asal di sudut kiri atas), sehingga gerakan terbangnya tetap mulus dengan gambar besar.
- Interupsi: menutup saat gerakan terbang pembuka masih berjalan memulai perjalanan kembali dari frame saat itu; tidak ada yang harus selesai dulu.
- Reduced motion: tanpa gerakan terbang. Lightbox memudar masuk dan keluar (120 ms) dan gambar muncul di tempatnya.

## Aksesibilitas
- Thumbnail adalah tautan sungguhan ke gambar besar, jadi tetap berfungsi tanpa JS dan terbuka di tab baru dengan klik tengah. Beri `<img>` teks `alt` yang sungguhan.
- Lightbox memakai `role="dialog"` dengan `aria-modal="true"`, berlabel dari `data-caption` (atau alt). Fokus pindah ke tombol tutup; Tab tetap di sana; Escape menutup; fokus kembali ke thumbnail.
- Tulis keterangan di `data-caption`; keterangan tampil di bawah gambar dan dipakai sebagai label dialog.

## Lakukan
- Pakai `data-lds-lightbox` pada tautan `.thumb` yang berisi `<img>`.
- Samakan rasio aspek thumbnail dengan gambar besar jika bisa; gerakan terbangnya jadi tanpa distorsi.
- Tulis keterangan yang menyebut apa dan di mana.

## Hindari
- Memudarkan lightbox dari tengah padahal dibuka dari thumbnail.
- Menganimasikan `width`, `height`, atau `top` untuk memalsukan pembesaran.
- Memakainya untuk gambar yang harus dibandingkan berdampingan dengan teks; buka di tempat saja.

## Perilaku (HTML biasa)
`init()` memasang `a[data-lds-lightbox]` (dengan `<img>` di dalamnya): saat diklik, ia membangun dialog `.lightbox` dengan `.lightbox__close` dan `.lightbox__caption` dari `data-caption` (label tutup dari `data-close`), menjalankan gerakan terbang FLIP, dan saat ditutup menjalankannya terbalik lalu mengembalikan fokus. FLIP ini khusus untuk lightbox; tidak ada helper shared element umum.

## Terkait
[Lightbox](lightbox.md) · [Thumbnail](thumbnail.md) · [Enter and exit](enter-and-exit.md) · [View swap](view-swap.md)
