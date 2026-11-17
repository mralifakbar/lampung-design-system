# Phone bars

Kelompok: Navigasi. https://lampung.kartadinata.app/docs/components/phone-bars

Bingkai layar ponsel: nav bar di atas yang judul besarnya menyatu ke dalamnya saat digulir, dan tab bar berisi tiga sampai lima tujuan di bawah. Keduanya tembus pandang sehingga konten terlihat bergulir di bawahnya.

## Pakai saat
- Aplikasi yang mengutamakan ponsel atau aplikasi web terpasang dengan tiga sampai lima tujuan tingkat atas yang dipakai bergantian sepanjang hari: Hari ini, Jadwal, Layanan, Profil.
- Layar ponsel yang butuh judul, tombol kembali, dan satu atau dua aksi di atas.

## Pakai yang lain saat
- Aplikasi web responsif yang juga berjalan di desktop: pakai [App shell](app-shell.md). Shell berubah sendiri menjadi top bar dan drawer di ponsel.
- Situs web dengan beberapa halaman: pakai [Top nav](top-nav.md).
- Bagian-bagian di dalam satu layar: pakai [Segmented control](segmented-control.md). Taruh segmented control di bawah judul besar.
- Lebih dari lima tujuan: pakai [App shell](app-shell.md).

## Letaknya
Di dalam layar ponsel setinggi penuh ([phone screen](phone-screen.md)): `.navbar` absolut di atas menutupi area gulir, `.large-title` sebagai konten pertama di area gulir, `.tabbar` absolut di bawah. Kedua bar memberi padding sendiri untuk notch dan home indicator di aplikasi sungguhan; bingkai dokumentasi `.phone` hanya untuk memperlihatkannya.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.navbar` | Bar atas: tiga kolom (awal, judul, akhir). Transparan sampai konten bergulir di bawahnya. |
| `.navbar__title` | Judul inline; muncul setelah judul besar tergulir pergi. |
| `.navbar__end` | Aksi di ujung, [icon button](icon-button.md) rata kanan. |
| `.large-title` | Judul 34 px di atas konten yang bergulir. |
| `.phone__scroll[data-lds-navbar]` | Area gulir; `data-lds-navbar` menyebut id nav bar yang diperbarui. |
| `nav.tabbar` | Bar bawah dengan `aria-label`. |
| `.tabbar__item` | Sebuah tujuan: ikon di atas label (10,5 px, selalu tampil). `aria-current="page"` pada yang aktif. |
| `.home-ind` | Home indicator, hanya di bingkai ponsel dokumentasi. |

## Markup

**Layar Hari ini.** Gulir layarnya: setelah 44 px bar mendapat material dan judul inline naik masuk. Ketuk sebuah tab: glyph-nya terisi dan memantul sekali.
```html
<div class="navbar" id="today-bar">
  <span></span>
  <span class="navbar__title">Hari ini</span>
  <div class="navbar__end"><button class="icon-btn" aria-label="Notifikasi"><span class="ic" aria-hidden="true">notifications</span></button></div>
</div>
<div class="phone__scroll" data-lds-navbar="today-bar">
  <h1 class="large-title">Hari ini</h1>
  …
</div>
<nav class="tabbar" aria-label="Utama">
  <a class="tabbar__item" href="/today" aria-current="page"><span class="ic" aria-hidden="true">today</span>Hari ini</a>
  <a class="tabbar__item" href="/schedule"><span class="ic" aria-hidden="true">calendar_month</span>Jadwal</a>
  <a class="tabbar__item" href="/services"><span class="ic" aria-hidden="true">account_balance</span>Layanan</a>
  <a class="tabbar__item" href="/profile"><span class="ic" aria-hidden="true">person</span>Profil</a>
</nav>
```

**Layar yang didorong dengan tombol kembali.** Layar detail: kembali di sisi awal, judul selalu tampil di bar (`.is-scrolled`), satu aksi di sisi akhir.
```html
<div class="phone phone--inline" style="height: 300px;">
  <div class="navbar is-scrolled" style="height: 56px; padding-top: 8px;">
    <span><button class="icon-btn" aria-label="Kembali ke layanan"><span class="ic" aria-hidden="true">arrow_back_ios_new</span></button></span>
    <span class="navbar__title">Izin usaha mikro</span>
    <div class="navbar__end"><button class="icon-btn" aria-label="Bagikan layanan"><span class="ic" aria-hidden="true">ios_share</span></button></div>
  </div>
  <div class="phone__scroll" style="padding: 72px 16px 24px;">
    <p class="section__sub">IUM 2104 · selesai 3 hari kerja · Senin dan Kamis, 08.00</p>
  </div>
</div>
```

## Status
| Status | Caranya |
|---|---|
| `.navbar.is-scrolled` | Material dan garis tipis tampil, judul inline muncul dan naik. Diatur oleh `data-lds-navbar` setelah area gulir melewati 44 px. |
| `.tabbar__item[aria-current="page"]` | Warna aksen dan glyph terisi, yang memantul sekali. |
| `:active (tab)` | Glyph tenggelam ke 0,86 lalu memantul kembali. |

## Gerak dan mikrointeraksi
- Nav bar: material muncul selama `--d-fast` (160 ms) linear; judul inline muncul selama `--d-fast` dan naik 6 px selama `--d-standard` dengan `--ease-enter`. Menggulir kembali membalik keduanya.
- Tab bar: menekan mengecilkan glyph ke 0,86 dengan `--spring-snappy`; glyph aktif yang baru memutar `lds-pop` sekali selama `--d-snappy` (360 ms).
- Saat tujuan berganti, konten baru boleh masuk bertahap 35 ms per baris ([list stagger](list-stagger.md)); jangan pernah menggeser seluruh layar ke samping di antara tab.
- Reduced motion: pantulan dan pudar turun ke 120 ms linear; reduced transparency mengganti blur dengan material padat.

## Aksesibilitas
- Tab bar adalah `<nav aria-label>`; item berupa tautan (atau tombol di single-page app) dengan `aria-current="page"`. Label selalu terlihat.
- Tombol bar yang hanya berupa ikon butuh `aria-label` yang menyebut tujuannya ("Kembali ke layanan").
- Judul besar adalah `<h1>` layar; judul bar inline hanya pengulangan visual dan boleh `aria-hidden`.
- Item tab setinggi penuh, minimal 44 px dan masing-masing selebar seperempat.

## Lakukan
- Pertahankan tiga sampai lima tab dengan label satu kata dan glyph terisi untuk yang aktif.
- Kembali ke atas tab saat item aktifnya diketuk lagi.

## Hindari
- Menyembunyikan label atau hanya menampilkan ikon di tab bar.
- Menaruh aksi (Baru, Tulis) di tab bar; pakai tombol [floating action](floating-action.md).
- Menambah permukaan blur kedua; kedua bar ini satu-satunya yang tembus pandang.

## Perilaku (HTML biasa)
`data-lds-navbar="navbarId"` pada area gulir mengubah `.is-scrolled` pada nav bar itu setelah `scrollTop` melewati 44 px, dan mengatur `--collapse` (0 sampai 1 selama 40 px pertama) pada area gulir agar judul besar memudar saat menyelinap di bawah bar. Tab bar tidak butuh skrip; pindahkan `aria-current` dari router Anda. Tinggi bar mengikuti `--phone-top` (inset status bar, bawaan 54 px) dan `--phone-bottom` (inset home indicator, bawaan 30 px); `.navbar-gap` adalah pengisi ruang setinggi bar. Layar yang didorong memakai `.navbar--inline` dan `.navbar__back` ([navigation stack](nav-stack.md)).

## Terkait
[Phone screen](phone-screen.md) · [App shell](app-shell.md) · [Segmented control](segmented-control.md) · [Floating action](floating-action.md)
