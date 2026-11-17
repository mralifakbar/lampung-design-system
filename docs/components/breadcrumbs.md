# Breadcrumbs

Kelompok: Navigasi. https://lampung.kartadinata.app/docs/components/breadcrumbs

Jalur dari sebuah bagian sampai ke halaman yang sedang dibuka, berupa tautan dengan chevron di antaranya. Item terakhir adalah halaman saat ini dan bukan tautan.

## Pakai saat
- Halaman berada tiga tingkat atau lebih di dalam hierarki yang perlu ditelusuri kembali: Layanan, Perizinan, Izin usaha mikro.
- Orang tiba di halaman dalam dari pencarian atau tautan yang dibagikan dan perlu tahu posisinya.

## Pakai yang lain saat
- Satu langkah kembali di layar ponsel: pakai [Phone bars](phone-bars.md). Pakai tombol kembali di nav bar.
- Kemajuan dalam alur berurutan (pendaftaran, pembayaran): pakai [Steps](steps.md).
- Navigasi utama aplikasi: pakai [App shell](app-shell.md).
- Situs datar dengan dua tingkat: pakai [Top nav](top-nav.md). Tautan aktif di navigasi sudah menunjukkan posisi.

## Letaknya
Paling atas di area konten, di atas judul halaman, sebagai baris pertama [page header](page-header.md). Jangan di dalam top bar atau sidebar. Di ponsel, pertahankan jika muat dalam dua baris; jika tidak, tampilkan hanya induknya dengan tautan kembali `chevron_left`.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `nav[aria-label="Breadcrumb"]` | Wajib. Landmark yang membungkus daftar. |
| `ol.crumbs` | Wajib. Daftar berurutan; turun ke baris berikutnya saat sempit. |
| `li > a` | Halaman induk; teks tenang dengan tint saat hover. |
| `li > .ic` | Pemisah `chevron_right` dalam `<li>` sendiri, `aria-hidden`. |
| `li > span[aria-current="page"]` | Wajib. Halaman saat ini: teks tegas, bukan tautan. |

## Markup

**Halaman layanan.** Dua induk dan halaman saat ini.
```html
<nav aria-label="Breadcrumb">
  <ol class="crumbs">
    <li><a href="#bc">Layanan</a></li>
    <li><span class="ic" aria-hidden="true">chevron_right</span></li>
    <li><a href="#bc">Perizinan</a></li>
    <li><span class="ic" aria-hidden="true">chevron_right</span></li>
    <li><span aria-current="page">Izin usaha mikro</span></li>
  </ol>
</nav>
```

**Dimulai dari beranda.** Crumb pertama berupa ikon saja menjaga jalur panjang tetap ringkas; ikon itu tetap butuh nama.
```html
<nav aria-label="Breadcrumb">
  <ol class="crumbs">
    <li><a href="#bc" aria-label="Beranda"><span class="ic" aria-hidden="true">home</span></a></li>
    <li><span class="ic" aria-hidden="true">chevron_right</span></li>
    <li><a href="#bc">Laporan warga</a></li>
    <li><span class="ic" aria-hidden="true">chevron_right</span></li>
    <li><a href="#bc">Jalan dan jembatan</a></li>
    <li><span class="ic" aria-hidden="true">chevron_right</span></li>
    <li><span aria-current="page">Laporan jalan berlubang di Kedaton</span></li>
  </ol>
</nav>
```

## Status
| Status | Caranya |
|---|---|
| `hover` | Tautan menggelap menjadi teks tegas di atas tint tenang selama `--d-fast`. |
| `focus` | Focus ring sistem pada tautan. |
| `aria-current="page"` | Teks tegas dengan ketebalan 500, tanpa hover, tidak bisa difokus. |

## Gerak dan mikrointeraksi
- Hanya warna dan latar yang berubah halus, selama `--d-fast` (160 ms). Tidak ada yang bergerak.

## Aksesibilitas
- `<nav aria-label="Breadcrumb">` membungkus `<ol>`, sehingga pembaca layar mengumumkan "daftar, 3 item" secara berurutan.
- Pemisah berupa ikon `aria-hidden`; halaman saat ini adalah `<span aria-current="page">`.
- Crumb yang hanya berisi ikon butuh `aria-label`.

## Lakukan
- Cerminkan hierarki yang sebenarnya, bukan riwayat klik orang.
- Pakai nama yang sama dengan judul halaman yang dituju.

## Hindari
- Menautkan halaman saat ini ke dirinya sendiri.
- Menjadikan breadcrumbs satu-satunya jalan kembali di ponsel; tombol kembali didahulukan.
- Memotong bagian tengah dengan menu elipsis untuk kurang dari lima tingkat.

## Terkait
[Page header](page-header.md) · [App shell](app-shell.md) · [Phone bars](phone-bars.md)
