# Lightbox

Kelompok: Lapisan. https://lampung.kartadinata.app/docs/components/lightbox

Menampilkan satu gambar berukuran besar di atas halaman yang diredupkan: gambar tumbuh dari thumbnail-nya dan menyusut kembali ke sana. Berupa tautan di sekitar thumbnail, sehingga tanpa skrip pun tetap membuka gambar penuh.

## Pakai saat
- Thumbnail foto, diagram, atau halaman pindaian yang perlu dilihat utuh: foto lokasi laporan, foto papan pengumuman, formulir yang dipindai.
- Galeri gambar yang masing-masing dibuka sendiri.

## Pakai yang lain saat
- Menggeser sekumpulan slide di tempat: pakai [Carousel](carousel.md).
- Formulir, laporan, atau apa pun yang punya kontrol: pakai [Modal](modal.md).
- Menampilkan gambar kecil beserta keterangannya di dalam alur: pakai [Thumbnail](thumbnail.md).
- Dokumen atau PDF yang dibaca: pakai [Link](link.md). Tautkan dan biarkan browser yang membukanya.

## Letaknya
Menutupi seluruh jendela (fixed, z-index 90), gambar di tengah dengan jarak 24 px di sekelilingnya dan paling tinggi setinggi jendela dikurangi 96 px; tombol tutup di kanan atas dan keterangan di bawah, keduanya bebas dari notch. Pemicunya tautan `.thumb` di mana saja dalam konten.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `a.thumb[data-lds-lightbox]` | Wajib. Tautan ke gambar penuh (`href`), dengan `data-caption` opsional. `--ratio` mengatur bentuk thumbnail (bawaan 4 / 3). |
| `a.thumb > img` | Wajib. Thumbnail dengan teks `alt` yang bermakna; dipakai ulang untuk gambar besar. |
| `.lightbox` | Dibuat oleh skrip: lapisan redup selebar jendela (`role="dialog"`, `aria-modal`). |
| `.lightbox__close` | Dibuat oleh skrip: [icon button](icon-button.md) penutup, labelnya dari `data-close` (bawaan "Close"). |
| `.lightbox__caption` | Dibuat dari `data-caption`. |

## Markup

**Foto fasilitas layanan.** Buka sebuah thumbnail: gambar tumbuh darinya. Escape, tombol tutup, atau klik di luar menyusutkannya kembali dan mengembalikan fokus ke thumbnail.
```html
<a class="thumb" href="/photos/library-large.jpg" data-lds-lightbox data-caption="Ruang baca perpustakaan daerah, lantai dua">
  <img src="/photos/library-small.jpg" alt="Ruang baca perpustakaan daerah">
</a>
```

## Status
| Status | Caranya |
|---|---|
| `.lightbox.is-open` | Scrim sudah muncul, gambar dalam ukuran penuh. |
| `a.thumb:hover` | Gambar thumbnail membesar ke 1,03 di perangkat yang mendukung hover. |

## Gerak dan mikrointeraksi
- Buka: scrim muncul selama `--d-standard` (240 ms) dengan `--ease-enter`; gambar tumbuh dari persegi thumbnail yang persis ke ukuran penuhnya (FLIP dengan Web Animations API) selama 420 ms dengan kurva masuk `cubic-bezier(0.16, 1, 0.3, 1)`.
- Tutup: jalur yang sama kembali ke thumbnail dalam 220 ms dengan kurva keluar `cubic-bezier(0.7, 0, 0.84, 0)`; scrim memudar selama `--d-exit`. Lapisan dihapus saat gambar mendarat.
- Hover thumbnail: gambar membesar ke 1,03 dengan `--spring-smooth`.
- Reduced motion: tanpa tumbuh atau menyusut; gambar muncul dan hilang bersama efek pudar.

## Aksesibilitas
- Pemicunya tautan asli ke gambar penuh, sehingga tetap berfungsi tanpa JavaScript dan di tab baru.
- `alt` thumbnail dipakai ulang untuk gambar besar; `data-caption` (atau `alt`) menjadi nama dialog.
- Saat dibuka, fokus pindah ke tombol tutup dan Tab tetap di sana; Escape atau klik di luar gambar menutupnya dan mengembalikan fokus ke thumbnail.

## Lakukan
- Beri setiap thumbnail teks `alt` yang bermakna dan keterangan sebagai konteks.
- Tautkan ke berkas yang lebih besar dari thumbnail.

## Hindari
- Membungkus gambar yang sudah tampil dalam ukuran penuh.
- Menaruh kontrol atau formulir di dalam lightbox.

## Perilaku (HTML biasa)
`data-lds-lightbox` pada `<a href>` di sekitar `<img>`: saat diklik, skrip membuat lapisan `.lightbox` di `<body>`, memutar animasi tumbuh dari thumbnail, memfokuskan tombol tutup, dan menutup saat Escape, tombol tutup, atau klik di luar gambar, sambil menyusut kembali dan mengembalikan fokus. Opsional `data-caption` dan `data-close` (label tombol tutup, misalnya "Tutup").

## Terkait
[Thumbnail](thumbnail.md) · [Carousel](carousel.md) · [Modal](modal.md) · [Shared element](shared-element.md)
