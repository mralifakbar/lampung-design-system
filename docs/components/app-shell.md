# App shell

Kelompok: Navigasi. https://lampung.kartadinata.app/docs/components/app-shell

Kerangka sebuah aplikasi: sidebar sticky di samping konten pada layar lebar, top bar dengan drawer di bawah 960 px. Satu per aplikasi, di root; satu sorotan meluncur ke halaman aktif.

## Pakai saat
- Aplikasi atau situs dokumentasi dengan lebih dari lima tujuan yang dipakai bergantian sepanjang hari: portal layanan, panel admin, situs panduan.
- Navigasi butuh grup (`shell__group`) atau bagian yang bisa diciutkan dengan anak bernomor, seperti modul dan materi.
- Kerangka yang sama harus berfungsi dari monitor 1440 px sampai ponsel tanpa komponen navigasi kedua.

## Pakai yang lain saat
- Situs informasi atau konten dengan lima halaman tingkat atas atau kurang dan tanpa sidebar: pakai [Top nav](top-nav.md).
- Daftar bagian sekunder di dalam satu halaman, seperti bagian-bagian halaman pengaturan: pakai [Sidebar](sidebar.md). Sidebar adalah panel di dalam konten; shell adalah kerangka di sekeliling semuanya.
- Aplikasi ponsel bernuansa native dengan tiga sampai lima tujuan: pakai [Phone bars](phone-bars.md). Pakai tab bar di bawah, bukan drawer.
- Melompat di antara heading satu halaman panjang: pakai [Outline](outline.md).
- Berpindah di antara bagian sejajar dari satu data (Ringkasan, Permohonan, Riwayat): pakai [Tabs](tabs.md).

## Letaknya
Elemen terluar halaman, langsung di dalam `<body>`. Layar lebar: kolom 264 px di kiri, sticky setinggi viewport, konten di kanannya. Di bawah 960 px: sidebar menjadi drawer (paling lebar 300 px atau 86 % lebar layar) di belakang scrim, dibuka dari top bar tembus pandang 56 px yang memberi padding sendiri untuk notch. Halaman dokumentasi ini adalah app shell: persempit jendela untuk melihat drawer-nya.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.shell[data-lds-shell]` | Wajib. Grid dua kolom setinggi viewport; `data-lds-shell` menghubungkan drawer, sorotan, dan bagian-bagian. |
| `.shell__side` | Wajib. Kolom sidebar, dengan `id` yang dituju toggle. Berisi merek, navigasi, dan kaki. |
| `.shell__brand` | Nama produk atau logo, tautan ke beranda. |
| `.shell__nav` | Wajib. `<nav aria-label>` berisi tautan; diposisikan agar sorotan bisa bergerak di dalamnya. |
| `.shell__hl` | Satu-satunya sorotan di belakang tautan aktif. Anak pertama nav, `aria-hidden`. |
| `.shell__link` | Wajib. Sebuah tujuan: `.ic` + `.shell__label` (+ `.badge.shell__badge` opsional). `aria-current="page"` menandai yang aktif. |
| `.shell__group` | Keterangan di atas sekelompok tautan (`<p>`). |
| `.shell__section` | Grup yang bisa diciutkan: `.shell__section-btn` (`aria-expanded`, `aria-controls`) dengan `.shell__section-label`, `.shell__section-count`, dan ikon `expand_more`, lalu `.shell__panel` berisi satu `<div>`. |
| `.shell__link.is-parent + .shell__children` | Tautan induk diikuti anak-anaknya di atas rel garis tipis. |
| `.shell__link--child` | Tautan anak: `.shell__num` (nomornya) + `.shell__label` + `.shell__done` opsional (`check_circle` terisi). |
| `.shell__foot` | Menempel di bawah sidebar: akun, pengalih tampilan, keluar. |
| `.shell__scrim` | Wajib untuk drawer. Saudara setelah side; klik menutup drawer. |
| `.shell__main` | Wajib. Kolom konten. |
| `.shell__top` | Top bar yang tampil di bawah 960 px: toggle menu (`[data-lds-shell-toggle]` dengan `.burger`), `.shell__toptitle`, dan satu aksi atau span kosong 44 px sebagai penyeimbang. |
| `.shell__bar` | Pengganti `.shell__top` di aplikasi yang butuh bar di semua lebar (panel admin): bar tembus pandang sticky 60 px dengan toggle drawer (di bawah 960 px), toggle rail `[data-lds-shell-rail]` (di atasnya), `.sep--v`, breadcrumbs, lalu `.shell__bar-end` dengan pencarian dan aksi. |
| `.shell__search` | `button.control.search.shell__search` di bar yang membuka [command palette](command-palette.md) dan menampilkan pintasannya di `.kbd`; di bawah 720 px icon button `.shell__search-icon` menggantikannya. |
| `.shell__mark` | Kotak aksen 28 px berisi inisial produk di dalam `.shell__brand`, di samping `.shell__label`; tetap terlihat di rail. |
| `.shell__user` | `button.shell__link.shell__user` di kaki dengan `.avatar` dan `.shell__label` berisi nama serta baris `.shell__sub`; membuka menu akun. |
| `.shell.is-rail` | Layar lebar: sidebar terlipat menjadi ikon selebar 66 px. Diatur oleh `[data-lds-shell-rail]`, diingat; `restoreRail()` di `<head>` mengatur `html[data-shell-rail]` agar tampilan pertama sudah terlipat. |
| `a.skip-link` | Elemen pertama di `<body>`: "Lewati ke konten", menuju `<main id>`. Tersembunyi di atas jendela sampai mendapat fokus. |
| `.layer-host` | Host fixed selebar jendela untuk lapisan tingkat halaman (`.scrim`, `.cmdk`, `.drawer`, `.dialog`, dan `.toaster` yang dibuat `toast({ container })`). Klik diteruskan kecuali pada lapisan yang terbuka. |

## Markup

**Kerangka portal layanan.** Tautan datar, keterangan grup, badge, dan kaki. Pilih sebuah tautan: sorotan meluncur ke sana. Di bawah 960 px sidebar menjadi drawer di balik tombol menu. Demo dikotakkan setinggi 460 px; shell sungguhan mengisi viewport.
```html
<div class="shell" data-lds-shell>
  <aside class="shell__side" id="side">
    <a class="shell__brand" href="/">Layanan Warga</a>
    <nav class="shell__nav" aria-label="Utama">
      <span class="shell__hl" aria-hidden="true"></span>
      <a class="shell__link" href="/"><span class="ic" aria-hidden="true">home</span><span class="shell__label">Beranda</span></a>
      <a class="shell__link" href="/schedule"><span class="ic" aria-hidden="true">calendar_month</span><span class="shell__label">Jadwal</span></a>
      <a class="shell__link" href="/applications" aria-current="page"><span class="ic" aria-hidden="true">assignment</span><span class="shell__label">Permohonan</span><span class="badge badge--accent shell__badge">3</span></a>
      <p class="shell__group">Layanan</p>
      <a class="shell__link" href="/services/micro-business"><span class="ic" aria-hidden="true">menu_book</span><span class="shell__label">Izin usaha mikro</span></a>
    </nav>
    <div class="shell__foot">
      <a class="shell__link" href="/settings"><span class="ic" aria-hidden="true">settings</span><span class="shell__label">Pengaturan</span></a>
    </div>
  </aside>
  <div class="shell__scrim"></div>
  <div class="shell__main">
    <header class="shell__top">
      <button class="icon-btn" data-lds-shell-toggle aria-controls="side" aria-expanded="false" aria-label="Menu"><span class="burger" aria-hidden="true"><i></i><i></i><i></i></span></button>
      <span class="shell__toptitle">Permohonan</span>
      <span style="width: 44px;"></span>
    </header>
    <main id="main">…</main>
  </div>
</div>
```

**Bagian bersarang dengan materi bernomor.** Bagian terbuka dengan spring; bagian yang memuat halaman aktif terbuka sendiri. Tautan induk membawa anak bernomor di atas rel; yang selesai mendapat tanda selesai. Buka dan tutup Kesehatan keluarga.
```html
<nav class="shell__nav" aria-label="Materi">
  <span class="shell__hl" aria-hidden="true"></span>
  <div class="shell__section">
    <button class="shell__section-btn" aria-expanded="false" aria-controls="sec-books">
      <span class="shell__section-label">Pembukuan usaha</span><span class="shell__section-count">5</span><span class="ic" aria-hidden="true">expand_more</span>
    </button>
    <div class="shell__panel" id="sec-books"><div>
      <a class="shell__link is-parent" href="/umkm/cash-flow">Modul 1: Arus kas</a>
      <div class="shell__children">
        <a class="shell__link shell__link--child" href="/umkm/cash-flow/1"><span class="shell__num">1</span><span class="shell__label">Mencatat pemasukan</span><span class="shell__done"><span class="ic" aria-hidden="true">check_circle</span><span class="sr-only">Selesai</span></span></a>
        <a class="shell__link shell__link--child" href="/umkm/cash-flow/3" aria-current="page"><span class="shell__num">3</span><span class="shell__label">Memisahkan uang usaha dan pribadi</span></a>
      </div>
    </div></div>
  </div>
</nav>
```

**Kerangka admin dengan app bar dan rail.** Tekan tombol panel di bar: sidebar terlipat menjadi ikon dan pilihannya diingat. Arahkan kursor ke ikon untuk melihat namanya; bergerak turun di rail dan tooltip langsung mengikuti. Di bawah 960 px bar yang sama menampilkan tombol menu dan sidebar menjadi drawer.
```html
<div class="shell" data-lds-shell style="min-height: 460px; height: 460px;">
  <aside class="shell__side" id="adm-side" style="height: 460px;">
    <a class="shell__brand" href="#adm"><span class="shell__mark">K</span><span class="shell__label">Kelola admin</span></a>
    <nav class="shell__nav" aria-label="Utama">
      <span class="shell__hl" aria-hidden="true"></span>
      <p class="shell__group">Dasbor</p>
      <a class="shell__link" href="#adm" aria-current="page"><span class="ic" aria-hidden="true">dashboard</span><span class="shell__label">Ringkasan</span></a>
      <a class="shell__link" href="#adm"><span class="ic" aria-hidden="true">payments</span><span class="shell__label">Keuangan</span></a>
      <p class="shell__group">Halaman</p>
      <a class="shell__link" href="#adm"><span class="ic" aria-hidden="true">group</span><span class="shell__label">Pengguna</span><span class="badge badge--accent shell__badge">3</span></a>
      <a class="shell__link" href="#adm"><span class="ic" aria-hidden="true">view_kanban</span><span class="shell__label">Kanban</span></a>
    </nav>
    <div class="shell__foot">
      <a class="shell__link" href="#adm"><span class="ic" aria-hidden="true">help</span><span class="shell__label">Bantuan</span></a>
    </div>
  </aside>
  <div class="shell__scrim"></div>
  <div class="shell__main">
    <header class="shell__bar">
      <button class="icon-btn" data-lds-shell-toggle aria-controls="adm-side" aria-expanded="false" aria-label="Menu"><span class="burger" aria-hidden="true"><i></i><i></i><i></i></span></button>
      <button class="icon-btn" data-lds-shell-rail aria-controls="adm-side" aria-expanded="true" aria-label="Ciutkan sidebar"><span class="ic" aria-hidden="true">left_panel_close</span></button>
      <span class="sep sep--v" aria-hidden="true"></span>
      <nav aria-label="Breadcrumb"><ol class="crumbs"><li><a href="#adm">Dasbor</a></li><li><span class="ic" aria-hidden="true">chevron_right</span></li><li><span aria-current="page">Ringkasan</span></li></ol></nav>
      <div class="shell__bar-end">
        <button class="control search shell__search" type="button"><span class="ic" aria-hidden="true">search</span>Cari<span class="kbd">⌘K</span></button>
        <button class="icon-btn shell__search-icon" type="button" aria-label="Cari"><span class="ic" aria-hidden="true">search</span></button>
        <button class="icon-btn" type="button" aria-label="Notifikasi, 2 belum dibaca"><span class="ic" aria-hidden="true">notifications</span><span class="count">2</span></button>
      </div>
    </header>
    <main style="padding: 24px;"><p class="section__sub">Isi halaman.</p></main>
  </div>
</div>
```

**Aplikasi multi-halaman: kerangka tetap diam antarhalaman.** Jika setiap halaman adalah berkas HTML sendiri (contoh dasbor), tiga hal menjaga kerangka agar tidak melompat: snippet saat paint tepat setelah `</aside>` yang memulihkan posisi gulir sidebar dan menaruh sorotan sebelum paint pertama, meluncurkannya dari tautan yang ditinggalkan; satu aturan `@view-transition` agar sidebar dan bar tetap diam sementara konten berganti dengan cross-fade; dan `data-lds-shell`, yang menulis kedua kunci saat `pagehide`. Ikuti dua tautan di contoh dasbor (`docs/examples/dashboard/`) untuk melihatnya.
```html
<!-- 1. Once per site, in your stylesheet (opt in to cross-document transitions) -->
<style>@view-transition { navigation: auto; types: lds-page; }</style>

<!-- 2. In every page, the snippet comes right after the sidebar, before anything else paints -->
<div class="shell" data-lds-shell>
  <aside class="shell__side" id="side" aria-label="Sidebar">
    <nav class="shell__nav" aria-label="Main">
      <span class="shell__hl" aria-hidden="true"></span>
      <a class="shell__link" href="default.html" aria-current="page">…</a>
    </nav>
  </aside>
  <script>(function(){try{var s=document.currentScript.previousElementSibling,ss=sessionStorage,v=ss.getItem('lds-shell-scroll');if(v!=null)s.scrollTop=+v;s.setAttribute('data-restored','');var n=s.querySelector('.shell__nav'),h=s.querySelector('.shell__hl'),c=n&&n.querySelector('[aria-current="page"]'),f=ss.getItem('lds-shell-from');ss.removeItem('lds-shell-from');if(!h||!c||c.closest('.shell__panel:not(.is-open)'))return;var put=function(e){h.style.height=e.offsetHeight+'px';h.style.transform='translateY('+e.offsetTop+'px)';},o=null;if(f){[].forEach.call(n.querySelectorAll('a[href]'),function(a){if(a.getAttribute('href')===f)o=a;});}h.style.transition='none';if(o&&!o.closest('.shell__panel:not(.is-open)')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){put(o);h.offsetWidth;h.style.transition='';requestAnimationFrame(function(){put(c);});}else put(c);n.classList.add('has-hl');}catch(e){}})();</script>
  <div class="shell__scrim"></div>
  <div class="shell__main">…</div>
</div>
```

## Varian dan ukuran
| Kelas atau atribut | Kapan |
|---|---|
| `.shell__link--child` | Tautan anak bernomor di bawah induk; baris 36 px dengan teks 13 px. |
| `.shell__section` | Bagian yang bisa diciutkan; pakai jika navigasi memuat lebih dari sekitar 12 tautan atau grupnya panjang. |
| `.shell__group` | Keterangan statis; pakai untuk dua sampai empat grup pendek yang tidak perlu dilipat. |
| `.shell__badge` | Hitungan atau "Baru" pada tautan (`badge badge--accent shell__badge`). |
| `.shell__bar` | Top bar di semua lebar, untuk aplikasi dengan breadcrumbs, pencarian, dan aksi akun; pakai `.shell__top` untuk shell bergaya dokumentasi yang hanya butuh bar di ponsel. |
| `.shell.is-rail` | Sidebar ikon saja di layar lebar bagi orang yang butuh ruang lebih; setiap tautan tetap menyimpan labelnya untuk pembaca layar dan menampilkannya di tooltip. |

## Status
| Status | Caranya |
|---|---|
| `aria-current="page"` | Teks aksen, ikon terisi, sorotan bergeser ke bawahnya; tautan anak mengisi nomornya dengan warna aksen. |
| `hover` | Tint tenang, hanya di perangkat yang bisa hover. |
| `:active` | Tint lebih kuat selama ditekan. |
| `.shell__section-btn[aria-expanded]` | `true` membuka panel dan memutar chevron; bagian yang memuat halaman aktif terbuka sendiri saat inisialisasi. |
| `.shell.is-menu` | Di bawah 960 px: drawer dan scrim tampil. Diatur oleh toggle; dihapus oleh scrim, Escape, atau saat tautan diikuti. |

## Gerak dan mikrointeraksi
- Sorotan: satu `.shell__hl` bergeser ke tautan aktif dengan `--spring-smooth` selama `--d-smooth` (560 ms); tingginya mengikuti tautan. Saat dimuat, sorotan ditaruh tanpa transisi agar tidak terbang masuk.
- Bagian: `.shell__panel` menganimasikan `grid-template-rows` dari 0fr ke 1fr dengan `--spring-smooth`; chevron berputar 180 derajat dengan spring yang sama. Sorotan ditempatkan ulang 420 ms setelah sebuah bagian dibuka atau ditutup.
- Drawer: bergeser masuk dari kiri dengan `--spring-smooth`; keluar dalam 260 ms dengan `--ease-exit`. Scrim muncul selama `--d-standard` (240 ms) dan hilang selama `--d-exit` (180 ms). Burger berubah menjadi ikon tutup dengan `--spring-snappy`.
- Rail: kolom menyempit dengan `--spring-smooth` selama `--d-smooth` sementara label, badge, dan keterangan grup memudar dalam `--d-instant` dengan `--ease-exit`; membuka lipatan memunculkannya kembali selama `--d-standard` 80 ms setelah kolom mulai melebar. Ikon tidak pernah bergerak, karena tanda merek dan ikon tautan berbagi satu garis tengah di kedua lebar.
- Tooltip rail: yang pertama menunggu 320 ms; selama satu tooltip tampil, tooltip berikutnya langsung mengikuti pointer dan meluncur ke tautan baru (warm tooltip), lalu pergi dalam `--d-instant` saat pointer meninggalkan rail. Fokus keyboard langsung menampilkannya.
- Antarhalaman (aplikasi multi-halaman): dengan `@view-transition { navigation: auto; types: lds-page; }` di situs, `html:active-view-transition-type(lds-page)` menamai sidebar dan bar agar tetap diam, konten lama memudar dalam `--d-fast` dengan `--ease-exit` dan yang baru muncul naik 6 px selama `--d-standard` dengan `--ease-enter`. Snippet saat paint menaruh sorotan di tautan yang ditinggalkan, lalu meluncurkannya ke tautan aktif yang baru dengan spring biasa. Browser tanpa cross-document view transition cukup memuat halaman.
- Scrollbar: scrollbar sidebar transparan saat diam dan muncul selama `--d-standard` saat sidebar digulir (`.shell__side.is-scrolling`, dihapus 900 ms setelah event gulir terakhir).
- Reduced motion: panel dan chevron berhenti bertransisi; sisanya turun ke 120 ms linear. Transisi halaman menjadi fade linear 120 ms tanpa luncuran: snippet langsung menaruh sorotan di tautan aktif.

## Aksesibilitas
- Side memuat `<nav aria-label>`; tautan aktif membawa `aria-current="page"`, tidak pernah hanya kelas.
- Tombol bagian adalah `<button>` sungguhan dengan `aria-expanded` dan `aria-controls` yang menunjuk id panel.
- Toggle menu memiliki `aria-label="Menu"`, `aria-controls` ke id side, dan `aria-expanded` yang selalu selaras. Membuka memindahkan fokus ke tautan pertama di drawer; Escape atau scrim menutupnya dan mengembalikan fokus ke toggle.
- Tanda selesai butuh teks untuk pembaca layar: ikon `aria-hidden` ditambah `.sr-only` "Selesai".
- Taruh skip link sebelum shell yang melompat ke `<main id>`.
- Sebelum sorotan ditempatkan (paint pertama, atau tanpa skrip), `.shell__nav:not(.has-hl)` menyembunyikan `.shell__hl` dan memberi tint pada tautan aktif itu sendiri, sehingga halaman aktif tidak pernah tanpa tanda. Snippet dan `bindShell` menambahkan `has-hl` begitu sorotan berada di bawah tautan.
- Memulihkan posisi gulir sidebar antarhalaman menjaga tautan yang baru diklik tetap di bawah pointer; jika tautan aktif berada di luar pandangan, `data-lds-shell` menggulirnya ke tengah sidebar.
- Toggle rail adalah tombol sungguhan dengan `aria-controls` ke id side, `aria-expanded` (true selama sidebar penuh tampil), dan `aria-label` yang menyebut apa yang akan dilakukan ("Ciutkan sidebar", "Bentangkan sidebar"). Tautan yang terlipat tetap menyimpan `.shell__label` di accessibility tree; tooltip visualnya `aria-hidden`.

## Lakukan
- Pertahankan satu shell per aplikasi dan tandai halaman aktif dengan `aria-current="page"`.
- Pakai bagian dengan anak bernomor untuk konten berurutan (modul dan materi), grup untuk area yang tidak berurutan.
- Buat label beberapa kata saja; nama panjang dibungkus, tidak dipotong.

## Hindari
- Menyalakan setiap tautan dengan latar sendiri; hanya ada satu sorotan.
- Memuat snippet multi-halaman dari berkas atau setelah konten: snippet harus berjalan tepat setelah `</aside>`, sebelum paint pertama, atau sorotan akan melompat.
- Menyarangkan sidebar kedua di dalam konten, atau menambah top nav juga.
- Menyembunyikan tujuan utama hanya di kaki; kaki untuk akun dan pengaturan.

## Perilaku (HTML biasa)
`data-lds-shell` pada `.shell` menghubungkan toggle drawer (`[data-lds-shell-toggle]`), scrim, Escape, penutupan saat tautan di dalamnya diikuti, dan sorotan (mengikuti perubahan `aria-current` dan menyesuaikan ukuran sendiri). Tombol `.shell__section-btn[aria-controls]` dihubungkan oleh `init()`. Setelah memindahkan `aria-current` dari luar, `placeShellHighlight(shell)` mengukur ulang jika perlu. `[data-lds-shell-rail]` di dalam shell melipat dan membuka rail (`setRail(shell, on)` dari kode), menyimpannya di `localStorage` `lds-shell-rail`, dan memicu `lds:rail`; panggil `restoreRail()` dari skrip klasik di `<head>` untuk menampilkan status tersimpan tanpa lompatan. Aplikasi multi-halaman: saat `pagehide` ia menyimpan posisi gulir sidebar di `sessionStorage` `lds-shell-scroll` dan `href` tautan aktif di `lds-shell-from`; snippet inline tepat setelah `</aside>` (lihat contoh terakhir) membaca keduanya sebelum paint pertama, menandai side dengan `data-restored` dan nav dengan `has-hl`, lalu `data-lds-shell` mengambil alih transisinya. Ia juga mengatur `.is-scrolling` pada `.shell__side` selama digulir, yang menampilkan scrollbar yang biasanya tersembunyi.

## Terkait
[Top nav](top-nav.md) · [Sidebar](sidebar.md) · [Nav progress](nav-progress.md) · [Outline](outline.md)
