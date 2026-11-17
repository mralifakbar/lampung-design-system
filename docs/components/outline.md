# Outline

Kelompok: Navigasi. https://lampung.kartadinata.app/docs/components/outline

Daftar "Di halaman ini" berisi heading dari satu halaman panjang, dengan garis tinta yang mengikuti bagian yang sedang terlihat. Daftar di sebelah kanan halaman ini adalah salah satunya.

## Pakai saat
- Halaman panjang dengan empat bagian atau lebih yang sering dilompati: dokumentasi, panduan layanan, peraturan, laporan panjang.
- Layar lebar yang punya ruang untuk kolom ketiga di samping konten.

## Pakai yang lain saat
- Berpindah antarhalaman aplikasi: pakai [App shell](app-shell.md).
- Daftar bagian yang masing-masing mengganti konten: pakai [Sidebar](sidebar.md).
- Bagian sejajar yang hanya tampil satu per satu: pakai [Tabs](tabs.md).
- Halaman pendek dengan dua atau tiga bagian: pakai [Sections](sections.md). Cukup andalkan heading.

## Letaknya
Kolom sticky di kanan konten pada layar lebar (sekitar 200 sampai 220 px), dimulai sejajar dengan judul halaman. Sembunyikan di bawah sekitar 1100 px; di ponsel heading halaman sudah cukup, atau taruh tautan yang sama di atas halaman.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `nav.toc[data-lds-toc]` | Wajib. Daftar dengan `aria-label="On this page"` (dalam bahasa halaman, misalnya "Di halaman ini"); rel 1,5 px di sisi kirinya. |
| `.toc__ink` | Garis tegas 1,5 px di rel yang bergeser ke tautan aktif; anak pertama, `aria-hidden`. |
| `a[href="#id"]` | Wajib. Satu tautan per id heading bagian. `aria-current="true"` menandai bagian yang sedang terlihat. |

## Markup

**Mengikuti bagian yang terlihat.** Gulir teks di kanan atau pilih tautan: tinta bergeser ke bagian yang paling dekat dengan atas jendela.
```html
<nav class="toc" data-lds-toc aria-label="Di halaman ini">
  <span class="toc__ink" aria-hidden="true"></span>
  <a href="#intro">Pendahuluan</a>
  <a href="#grading">Persyaratan</a>
  <a href="#office-hours">Jam layanan</a>
</nav>
<!-- later in the page -->
<h2 id="intro">Pendahuluan</h2> …
```

**Status statis.** Daftar yang sama tanpa skrip, untuk halaman yang dirender server dan sudah tahu bagian aktifnya.
```html
<nav class="toc" aria-label="Di halaman ini" style="width: 200px;">
  <a href="#ol2" aria-current="true">Penggunaan</a>
  <a href="#ol2">Contoh</a>
  <a href="#ol2">Aksesibilitas</a>
</nav>
```

## Status
| Status | Caranya |
|---|---|
| `aria-current="true"` | Teks tegas dengan ketebalan 500; tinta berada di sampingnya. |
| `hover` | Teks menggelap menjadi tegas selama `--d-fast`. |

## Gerak dan mikrointeraksi
- Tinta: bergeser dan berubah ukuran ke tautan aktif dengan `--spring-smooth` selama `--d-smooth` (560 ms), sehingga gulir cepat melewati beberapa bagian terbaca sebagai satu luncuran.
- Hanya satu hal yang bergerak; tautan berganti warna, tidak bergeser atau membesar.
- Reduced motion: tinta bergerak dalam 120 ms linear. Pakai `scroll-behavior: smooth` di halaman hanya di bawah `prefers-reduced-motion: no-preference`.

## Aksesibilitas
- `<nav aria-label="On this page">` (dalam bahasa halaman) dengan tautan biasa ke id heading, sesuai urutan dokumen.
- `aria-current="true"` (bukan `page`) menandai bagian yang terlihat, karena halamannya sendiri tidak berganti.
- Beri heading `scroll-margin-top` setinggi header sticky agar lompatan tidak menutupi heading.

## Lakukan
- Tautkan hanya tingkat `<h2>`, atau paling banyak `<h2>` dan `<h3>`.
- Pakai teks heading yang persis sama sebagai teks tautan.

## Hindari
- Memakai outline sebagai navigasi utama.
- Menampilkannya di ponsel sebagai kolom tetap; ia merebut lebar yang dibutuhkan teks.

## Perilaku (HTML biasa)
`data-lds-toc` pada `.toc` mengamati elemen yang dituju tautan `a[href^="#"]` (dicari berdasarkan id di dokumen) dengan IntersectionObserver yang margin bawahnya -60 % tinggi jendela, menandai bagian terlihat paling atas dengan `aria-current="true"`, lalu menggeser dan mengatur ukuran `.toc__ink`. Bagian pertama ditandai saat inisialisasi.

## Terkait
[Sections](sections.md) · [Sidebar](sidebar.md) · [App shell](app-shell.md) · [Prose](prose.md)
