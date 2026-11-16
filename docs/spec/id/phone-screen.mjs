const row = (icon, tile, title, sub) => `<button type="button" class="lrow lrow--icon" style="min-height: 60px;"><span class="lrow__icon"${tile ? ` style="background: var(${tile});"` : ''}><span class="ic" aria-hidden="true">${icon}</span></span><span class="lrow__body"><span class="lrow__title" style="display: block; font-weight: 500;">${title}</span><span class="lrow__sub" style="display: block;">${sub}</span></span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></button>`;
const tabbar = (cur) => `<nav class="tabbar" style="height: 76px; padding-bottom: 22px;" aria-label="Utama">
    ${[['today', 'Hari ini'], ['calendar_month', 'Jadwal'], ['school', 'Layanan'], ['person', 'Profil']].map(([ic, l]) => `<button type="button" class="tabbar__item"${l === cur ? ' aria-current="page"' : ''}><span class="ic" aria-hidden="true">${ic}</span>${l}</button>`).join('')}
  </nav>`;

export default {
  summary: 'Tata letak ponsel standar: judul besar yang menyatu ke nav bar tembus pandang saat konten bergulir di bawahnya, list berkelompok di tengah, dan tab bar tembus pandang di bawah. Kedua bar adalah satu-satunya permukaan yang di-blur.',
  when: [
    'Merancang atau membuat prototipe layar aplikasi ponsel dalam sistem ini: layar beranda "Hari ini", layar pengaturan, daftar layanan.',
    'Menampilkan tata letak ponsel di dalam halaman desktop (dokumentasi, pratinjau, pengenalan) dengan `.phone.phone--inline`.',
    'Layar tingkat atas yang merupakan salah satu dari tiga sampai lima area utama yang dicapai dari tab bar.',
  ],
  whenNot: [
    ['Halaman web responsif yang harus berfungsi di ponsel dan desktop', 'app-shell', 'Shell mengubah sidebar-nya menjadi drawer di ponsel'],
    ['Hanya bar-nya saja (nav bar, tab bar) beserta aturannya', 'phone-bars'],
    ['Tugas yang tetap memperlihatkan layar saat ini (lapor hadir, filter)', 'sheet'],
    ['Situs dengan beberapa halaman tingkat atas tanpa bingkai aplikasi', 'top-nav'],
    ['Daftar pengaturan atau tautan di dalam layar', 'list', 'List berkelompok inset yang menjadi bahan layar ini'],
  ],
  where: 'Ini satu layar utuh. `.phone` adalah bingkai 390 kali 844 (ukuran ponsel umum); `.phone--inline` adalah bingkai lebih kecil 320 kali 520 dengan tepi dan bayangan untuk menampilkan layar di dalam halaman. Di aplikasi web ponsel sungguhan, pakai bagian yang sama di kontainer setinggi penuh yang Anda posisikan dan ukur di stylesheet aplikasi.',
  anatomy: [
    ['.phone', 'Wajib. Bingkainya: diposisikan, dipotong, latar kanvas, radius 48 px. `.phone--inline` untuk pratinjau yang disematkan.'],
    ['.navbar', 'Wajib. Bar absolut di atas: grid tiga kolom (kembali atau kosong, `.navbar__title`, `.navbar__end` dengan [icon button](icon-button)). Butuh `id`. Material dan judulnya baru muncul setelah digulir (`.is-scrolled`).'],
    ['.phone__scroll[data-lds-navbar]', 'Wajib. Konten bergulir di bawah kedua bar, `data-lds-navbar` diisi id nav bar.'],
    ['spacer + h1.large-title', 'Wajib. Ruang untuk bar (100 px di `.phone`, atau `.status-gap` ditambah tinggi bar), lalu judul tebal 34 px, 20 px dari tepi.'],
    ['content', '[List](list) berkelompok (`.list.list--fill` dengan `.lrow`), [KPI card](kpi-card), [pencarian](search-field); padding samping 16 sampai 20 px, padding bawah sekitar 110 px agar baris terakhir bebas dari tab bar.'],
    ['nav.tabbar > button.tabbar__item', 'Wajib di layar tingkat atas. Tiga sampai lima item dengan ikon dan label; `aria-current="page"` pada yang aktif, yang memakai ikon terisi.'],
    ['.home-ind', 'Opsional. Garis home indicator, hanya untuk mockup.'],
  ],
  examples: [
    {
      title: 'Hari ini',
      desc: 'Gulir daftarnya: begitu judul besar lewat di bawah bar, bar mendapat material dan judul kecil naik masuk.',
      html: `<div class="phone phone--inline" style="width: 360px; max-width: 100%; height: 600px; margin: 0 auto;">
  <div class="navbar" id="ps-nav" style="height: 64px; padding-top: 14px;"><span></span><span class="navbar__title">Hari ini</span><div class="navbar__end"><button type="button" class="icon-btn" aria-label="Notifikasi"><span class="ic" aria-hidden="true">notifications</span></button></div></div>
  <div class="phone__scroll" data-lds-navbar="ps-nav">
    <div style="height: 64px;"></div>
    <h1 class="large-title">Hari ini</h1>
    <div class="stack" style="padding: 12px 16px 110px;">
      <div class="list list--fill">
        ${row('code', '--tile-blue', 'Posyandu Melati', '08.00 · Balai warga RT 03')}
        ${row('grid_view', '', 'Pemeriksaan ibu hamil', '10.00 · Puskesmas Kedaton')}
        ${row('lan', '--tile-orange', 'Imunisasi anak', '13.00 · Puskesmas Kedaton')}
      </div>
      <div class="auto-grid" style="--min: 120px;">
        <article class="kpi"><div class="kpi__head"><span class="kpi__icon" aria-hidden="true"><span class="ic">event_available</span></span><span class="kpi__label">Kehadiran</span></div><div class="kpi__value">92<small>%</small></div></article>
        <article class="kpi"><div class="kpi__head"><span class="kpi__icon" aria-hidden="true"><span class="ic">assignment</span></span><span class="kpi__label">Tugas tertunda</span></div><div class="kpi__value">3</div></article>
      </div>
      <div class="list list--fill">
        <div class="lrow" style="min-height: 56px;"><span class="lrow__body"><span class="lrow__title" style="display: block;">Lengkapi surat domisili</span><span class="lrow__sub" style="display: block;">Izin usaha mikro · batas besok</span></span><span class="badge badge--warning">Besok</span></div>
        <div class="lrow" style="min-height: 56px;"><span class="lrow__body"><span class="lrow__title" style="display: block;">Bayar pajak kendaraan</span><span class="lrow__sub" style="display: block;">Pajak daerah · batas Kamis</span></span><span class="badge">Kam</span></div>
        <div class="lrow" style="min-height: 56px;"><span class="lrow__body"><span class="lrow__title" style="display: block;">Survei lokasi usaha</span><span class="lrow__sub" style="display: block;">Pendampingan UMKM · Jumat</span></span><span class="badge">Jum</span></div>
      </div>
    </div>
  </div>
  ${tabbar('Hari ini')}
</div>`,
    },
    {
      title: 'Pengaturan dengan field pencarian',
      desc: 'Pencarian di bawah judul besar, baris berkelompok dengan switch, dan baris destruktif sendirian di grupnya di bagian akhir.',
      html: `<div class="phone phone--inline" style="width: 360px; max-width: 100%; height: 600px; margin: 0 auto;">
  <div class="navbar" id="ps-nav2" style="height: 64px; padding-top: 14px;"><span></span><span class="navbar__title">Profil</span><span></span></div>
  <div class="phone__scroll" data-lds-navbar="ps-nav2">
    <div style="height: 64px;"></div>
    <h1 class="large-title">Profil</h1>
    <div class="stack" style="--gap: 24px; padding: 12px 16px 110px;">
      <div class="search-wrap" data-lds-search><div class="control search" style="flex: 1;"><span class="ic" aria-hidden="true">search</span><input placeholder="Cari pengaturan" aria-label="Cari pengaturan"></div><button type="button" class="search__cancel">Batal</button></div>
      <div class="list list--fill">
        <label class="lrow lrow--icon" style="min-height: 52px;"><span class="lrow__icon" style="background: var(--tile-red);"><span class="ic" aria-hidden="true">notifications</span></span><span class="lrow__body"><span class="lrow__title">Pengingat jatuh tempo</span></span><span class="switch switch--sm"><input type="checkbox" role="switch" checked><span class="switch__track" aria-hidden="true"><span class="switch__thumb"></span></span></span></label>
        <button type="button" class="lrow lrow--icon" style="min-height: 52px;"><span class="lrow__icon" style="background: var(--tile-green);"><span class="ic" aria-hidden="true">lock</span></span><span class="lrow__body"><span class="lrow__title">Privasi</span></span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></button>
      </div>
      <div class="list list--fill"><button type="button" class="lrow" style="min-height: 52px; justify-content: center;"><span class="lrow__title" style="color: var(--danger-text); font-weight: 500;">Keluar</span></button></div>
    </div>
  </div>
  ${tabbar('Profil')}
</div>`,
    },
  ],
  variants: [
    ['.phone', 'Bingkai 390 kali 844 untuk mockup ukuran penuh; bar memakai tinggi penuhnya (nav bar 100 px dengan 54 px untuk status bar, tab bar 83 px dengan ruang untuk home indicator).'],
    ['.phone.phone--inline', 'Pratinjau berbingkai 320 kali 520 di dalam halaman; pendekkan bar dengan ukuran inline seperti di contoh (nav bar 64 px, tab bar 76 px), karena tidak ada status bar.'],
  ],
  states: [
    ['.navbar.is-scrolled', 'Diatur oleh `data-lds-navbar` saat konten bergulir lebih dari 44 px: material di belakang bar dan judul kecil muncul.'],
    ['.tabbar__item[aria-current="page"]', 'Warna aksen dan ikon terisi, yang memantul sekali saat menjadi aktif.'],
  ],
  motion: [
    'Material nav bar: opacity dalam `--d-fast` (160 ms) linear, terikat ambang gulir 44 px, sehingga tidak pernah tampil setengah.',
    'Judul kecil: opacity dalam `--d-fast` dan naik 6 px dalam `--d-standard` (240 ms) dengan `--ease-enter`. Menggulir kembali membaliknya.',
    'Tab bar: ikon yang ditekan tenggelam ke 0,86 dengan `--spring-snappy`; ikon aktif yang baru memantul dengan `lds-pop` (0,82 ke 1) dengan `--spring-snappy` (360 ms). Berpindah tab mengganti konten tanpa geseran ([view swap](view-swap)).',
    'Reduced transparency: kedua bar memakai material padat tanpa blur. Reduced motion: perubahan menjadi 120 ms linear.',
  ],
  a11y: [
    'Satu `h1` per layar: judul besar. Judul kecil di bar mengulangnya secara visual; boleh tetap teks biasa.',
    'Tab bar adalah `<nav>` dengan `aria-label`; item berupa tombol (atau tautan) dengan `aria-current="page"` pada yang aktif, dan selalu ada label teks di bawah ikon.',
    'Tombol bar adalah [icon button](icon-button) 44 px dengan `aria-label`.',
    'Pertahankan padding bawah agar baris terakhir bisa digulir keluar dari bawah tab bar; tidak boleh ada elemen interaktif yang tetap tersembunyi di belakangnya.',
  ],
  do: [
    'Pakai tiga sampai lima item tab bar, masing-masing area tingkat atas.',
    'Kelompokkan baris dalam list inset dengan jarak 24 sampai 28 px antargrup; taruh baris destruktif di grupnya sendiri di akhir.',
    'Batasi blur pada kedua bar.',
  ],
  dont: [
    'Menambah permukaan blur ketiga atau bayangan di bawah bar.',
    'Menyembunyikan label tab bar, atau memakainya untuk aksi (itu tugas [floating action](floating-action) atau toolbar).',
    'Menaruh judul besar di layar yang didorong dari daftar; layar itu memakai judul kecil di bar dengan tombol kembali.',
  ],
  js: '`data-lds-navbar="navbar-id"` pada `.phone__scroll`: mengubah `.is-scrolled` pada nav bar begitu konten bergulir melewati 44 px. Perpindahan tab Anda tangani sendiri.',
};
