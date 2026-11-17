# Top nav

Kelompok: Navigasi. https://lampung.kartadinata.app/docs/components/top-nav

Bilah tembus pandang di bagian atas situs tanpa sidebar: merek, hingga lima tautan, dan aksi. Di bawah 760 px tautan terlipat ke panel di bawah bilah.

## Pakai saat
- Situs informasi, halaman depan, atau situs konten dengan lima halaman tingkat atas atau kurang dan tanpa kebutuhan sidebar.
- Bagian publik sebuah produk (tarif layanan, beranda panduan, masuk) yang berada di depan app shell.

## Pakai yang lain saat
- Aplikasi dengan banyak tujuan, grup, atau materi bersarang: pakai [App shell](app-shell.md).
- Aplikasi ponsel dengan tiga sampai lima tujuan yang dipakai bergantian sepanjang hari: pakai [Phone bars](phone-bars.md). Tab bar berada di bawah jempol; menu atas yang terlipat tidak.
- Bagian sejajar dari satu data atau halaman: pakai [Tabs](tabs.md).
- Menu perintah gaya Berkas, Edit, Tampilan di editor: pakai [Menubar](menubar.md).

## Letaknya
Elemen pertama di `<body>`, sticky di atas viewport, selebar penuh. Tinggi 60 px di layar lebar, 56 px di bawah 760 px, diberi padding untuk notch. Konten bergulir di bawah material-nya.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.topnav[data-lds-topnav]` | Wajib. Bilah `<header>`; sticky, material tembus pandang, garis tipis di bawahnya. |
| `.topnav__brand` | Wajib. Nama produk atau logo, tautan ke beranda. |
| `.topnav__links` | Wajib. `<nav aria-label>` berisi tautan; di ponsel menjadi panel lipat. |
| `.topnav__link` | Wajib. Satu tujuan; `aria-current="page"` menggarisbawahinya dengan bilah 2 px di bawah nav bar. |
| `.topnav__actions` | Didorong ke kanan: tautan masuk, satu tombol utama, satu icon button. |
| `.topnav__toggle[data-lds-topnav-toggle]` | `icon-btn` menu dengan `.burger`, hanya tampil di bawah 760 px. |

## Markup

**Header situs.** Merek, empat tautan, dan satu ajakan bertindak. Di bawah 760 px tautan terlipat di balik tombol menu; pilih satu atau tekan Escape untuk menutupnya. Dikotakkan untuk demo; di halaman ia sticky di viewport.
```html
<header class="topnav" data-lds-topnav>
  <a class="topnav__brand" href="/">Layanan Warga</a>
  <nav class="topnav__links" id="site-links" aria-label="Utama">
    <a class="topnav__link" href="/layanan" aria-current="page">Layanan</a>
    <a class="topnav__link" href="/pengaduan">Pengaduan</a>
    <a class="topnav__link" href="/tarif">Tarif</a>
  </nav>
  <div class="topnav__actions">
    <a class="btn btn--plain btn--md" href="/sign-in">Masuk</a>
    <a class="btn btn--primary btn--md" href="/ajukan">Ajukan permohonan</a>
    <button class="icon-btn topnav__toggle" data-lds-topnav-toggle aria-controls="site-links" aria-expanded="false" aria-label="Menu"><span class="burger" aria-hidden="true"><i></i><i></i><i></i></span></button>
  </div>
</header>
```

**Hanya tautan.** Situs panduan tanpa ajakan bertindak: area aksi hanya berisi toggle, yang tampil di bawah 760 px.
```html
<div style="height: 260px; overflow: hidden; position: relative;">
  <header class="topnav" data-lds-topnav>
    <a class="topnav__brand" href="#tn2-body">Panduan petugas</a>
    <nav class="topnav__links" id="tn2-links" aria-label="Panduan">
      <a class="topnav__link" href="#tn2-body">Mulai di sini</a>
      <a class="topnav__link" href="#tn2-body" aria-current="page">Verifikasi</a>
      <a class="topnav__link" href="#tn2-body">Laporan</a>
    </nav>
    <div class="topnav__actions">
      <button class="icon-btn topnav__toggle" data-lds-topnav-toggle aria-controls="tn2-links" aria-expanded="false" aria-label="Menu"><span class="burger" aria-hidden="true"><i></i><i></i><i></i></span></button>
    </div>
  </header>
  <div class="stack" id="tn2-body" style="padding: 32px 20px;"><p class="section__sub">Verifikasi: cara berkas diperiksa dan kapan pemohon melihat hasilnya.</p></div>
</div>
```

## Status
| Status | Caranya |
|---|---|
| `aria-current="page"` | Teks tegas dan bilah 2 px di tepi bawah nav bar; di ponsel berupa baris ber-tint. |
| `hover` | Teks tegas di atas tint tenang, hanya di perangkat yang punya hover. |
| `.topnav.is-open` | Di bawah 760 px: panel tautan tampil dan burger berubah menjadi ikon tutup. |

## Gerak dan mikrointeraksi
- Panel ponsel: masuk dengan opacity selama `--d-fast` dan turun 8 px dengan `--spring-smooth`; keluar selama `--d-exit` (180 ms) dengan `--ease-exit`, lalu disembunyikan.
- Burger terlipat menjadi ikon tutup dengan `--spring-snappy`.
- Bilah tidak bersembunyi atau mengecil saat digulir; header yang melompat lebih merugikan daripada 60 px yang dihemat.
- Reduced motion: transisi turun ke 120 ms linear; reduced transparency mengganti blur dengan material padat.

## Aksesibilitas
- Bilahnya `<header>`; tautan berada di `<nav aria-label>`; tautan aktif memiliki `aria-current="page"`.
- Toggle memiliki `aria-label="Menu"`, `aria-controls` berisi id tautan, dan `aria-expanded` yang diselaraskan oleh skrip.
- Escape menutup panel dan mengembalikan fokus ke toggle; pointer down di luar menutupnya; mengikuti tautan menutupnya.
- Tautan setinggi 44 px di panel ponsel.

## Lakukan
- Batasi lima tautan atau kurang, dinamai dengan kata benda yang dicari orang.
- Taruh paling banyak satu tombol utama di area aksi.
- Padukan dengan bilah [nav progress](nav-progress.md) jika halaman lama dimuat.

## Hindari
- Menambah mega menu dropdown; jika situs membutuhkannya, situs itu butuh [app shell](app-shell.md).
- Memakai top nav dan sidebar bersamaan.
- Menyembunyikan merek di ponsel; letakkan toggle di ujung area aksi.

## Perilaku (HTML biasa)
`data-lds-topnav` pada `.topnav` menghubungkan tombol `[data-lds-topnav-toggle]`: mengubah `.is-open` dan `aria-expanded`, menutup dengan Escape (fokus kembali ke toggle), dengan pointer down di luar, dan saat sebuah `.topnav__link` diikuti.

## Terkait
[App shell](app-shell.md) · [Nav progress](nav-progress.md) · [Phone bars](phone-bars.md) · [Menubar](menubar.md)
