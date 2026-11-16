export default {
  summary: 'Dorong layar detail masuk dari kanan di atas layar asal, lalu kembali dengan tombol kembali atau dengan menyeret layar dari tepi kiri. Layar di bawahnya bergeser 30 % dan meredup, sehingga orang selalu tahu ke mana tombol kembali mengarah.',
  when: [
    'Aplikasi ponsel yang barisnya membuka detail: layanan dari daftar, pembayaran dari aktivitas, laporan dari daftar laporan.',
    'Menelusuri dua atau tiga tingkat ke dalam satu area aplikasi sementara tab bar tetap di tempat.',
    'Area pengaturan di ponsel yang setiap barisnya membuka layar sendiri.',
  ],
  whenNot: [
    ['Berpindah antar-area tingkat atas', 'phone-bars', 'Tab berganti tanpa bergeser; setiap tab menyimpan stack-nya sendiri'],
    ['Tugas terfokus yang sebaiknya tetap memperlihatkan layar', 'sheet'],
    ['Langkah-langkah formulir yang maju dan mundur', 'view-swap'],
    ['Layar lebar dengan daftar di samping detailnya', 'resizable-split'],
  ],
  where: 'Mengisi satu tab dari [phone screen](phone-screen): `.navstack` absolut menutupi seluruh layar, di bawah tab bar. Setiap `.navstack__view` adalah layar penuh dengan `.navbar` dan `.phone__scroll` sendiri. Tampilan pertama punya judul besar; tampilan yang didorong memakai `.navbar--inline` dengan tombol kembali.',
  anatomy: [
    ['.navstack[data-lds-navstack]', 'Wajib. Kontainer yang diposisikan. Tampilan pertama yang terlihat adalah root.'],
    ['.navstack__view', 'Wajib. Satu layar. Tampilan yang tidak berada di stack diberi `hidden`.'],
    ['[data-lds-nav="viewId"]', 'Pada baris atau tombol: mendorong tampilan itu. Isi tampilannya lebih dulu (dengarkan klik pada fase capture).'],
    ['.navbar.navbar--inline', 'Bar layar yang didorong: judul kecil selalu tampil, material muncul saat digulir.'],
    ['.navbar__back[data-lds-back]', 'Tombol kembali: chevron ditambah judul layar sebelumnya, dengan warna teks aksen.'],
    ['h1.navbar__title', 'Pada layar yang didorong, judul bar adalah heading layar; fokus pindah ke sana saat didorong.'],
    ['.navbar-gap', 'Pengisi ruang di atas area gulir setinggi bar.'],
  ],
  examples: [
    {
      title: 'Dari daftar layanan ke satu layanan',
      desc: 'Buka sebuah layanan: layar bergeser masuk di atas daftar. Tekan kembali, atau seret layar dari tepi kirinya dan lepaskan setelah melewati separuh (sentilan cepat ikut dihitung kecepatannya).',
      html: `<div class="phone phone--inline" style="height: 560px;">
  <div class="navstack" data-lds-navstack>
    <section class="navstack__view" aria-label="Layanan">
      <div class="navbar" id="ns-root-bar" style="height: 64px; padding-top: 14px;"><span></span><span class="navbar__title" aria-hidden="true">Layanan</span><span></span></div>
      <div class="phone__scroll" data-lds-navbar="ns-root-bar">
        <div style="height: 64px;"></div>
        <h3 class="large-title">Layanan</h3>
        <div style="padding: 12px 16px 40px;"><div class="list list--fill">
          <button type="button" class="lrow" data-lds-nav="ns-course"><span class="lrow__body"><span class="lrow__title">Izin usaha mikro</span><span class="lrow__sub">IUM 3104 · Senin dan Kamis, 08.00</span></span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></button>
          <button type="button" class="lrow" data-lds-nav="ns-course"><span class="lrow__body"><span class="lrow__title">Surat keterangan domisili</span><span class="lrow__sub">SKD 3112 · Senin, 13.00</span></span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></button>
        </div></div>
      </div>
    </section>
    <section class="navstack__view" id="ns-course" aria-label="Izin usaha mikro" hidden>
      <div class="navbar navbar--inline" id="ns-course-bar" style="height: 64px; padding-top: 14px;">
        <span><button type="button" class="navbar__back" data-lds-back aria-label="Kembali ke Layanan"><span class="ic" aria-hidden="true">arrow_back_ios_new</span><span>Layanan</span></button></span>
        <h3 class="navbar__title">Izin usaha mikro</h3><span></span>
      </div>
      <div class="phone__scroll" data-lds-navbar="ns-course-bar">
        <div style="height: 64px;"></div>
        <div style="padding: 12px 16px 40px;"><dl class="kv-list"><div class="kv"><dt>Petugas</dt><dd>Ayu Rahmawati</dd></div><div class="kv"><dt>Loket</dt><dd>Loket 2</dd></div><div class="kv"><dt>Lama proses</dt><dd>3 hari kerja</dd></div></dl></div>
      </div>
    </section>
  </div>
</div>`,
      code: `<div class="navstack" data-lds-navstack>
  <section class="navstack__view" aria-label="Layanan">
    <div class="navbar" id="courses-bar">…</div>
    <div class="phone__scroll" data-lds-navbar="courses-bar">
      <div class="navbar-gap"></div>
      <h1 class="large-title">Layanan</h1>
      <button class="lrow" data-lds-nav="course">…Izin usaha mikro…</button>
    </div>
  </section>
  <section class="navstack__view" id="course" aria-label="Izin usaha mikro" hidden>
    <div class="navbar navbar--inline" id="course-bar">
      <span><button class="navbar__back" data-lds-back aria-label="Kembali ke Layanan"><span class="ic" aria-hidden="true">arrow_back_ios_new</span><span>Layanan</span></button></span>
      <h1 class="navbar__title">Izin usaha mikro</h1>
      <span></span>
    </div>
    <div class="phone__scroll" data-lds-navbar="course-bar">…</div>
  </section>
</div>`,
    },
  ],
  states: [
    ['.navstack__view.is-under', 'Tertutup layar yang didorong: di −30 %, diredupkan warna scrim setengah kekuatan, dan `inert`.'],
    ['.navstack__view.is-off', 'Di luar kanan: sebelum masuk dan setelah keluar.'],
    ['.navstack__view.is-dragging', 'Mengikuti jari selama seretan tepi; tanpa transisi.'],
    ['.navstack.is-moving', 'Ada layar yang bergerak: layar teratas memberi bayangan besar, karena melayang di atas yang lain.'],
  ],
  motion: [
    'Dorong: layar baru masuk dari `translateX(100%)` dengan `--spring-smooth` selama `--d-smooth` (560 ms); layar di bawahnya bergeser ke −30 % dan meredup dengan spring yang sama.',
    'Tombol kembali: layar teratas keluar dalam 280 ms dengan `--ease-exit`, layar di bawahnya kembali dengan `--spring-smooth`.',
    'Seretan tepi (dari 28 px pertama): kelonggaran 8 px menentukan antara seretan horizontal dan gulir; layar mengikuti 1:1 dan layar di bawahnya bergerak 30 % dari jaraknya. Saat dilepas, titik akhir diproyeksikan dengan kecepatan (laju 0,99); melewati separuh lebar akan pop dengan `--spring-momentum`, jika tidak keduanya memantul kembali. Setiap push atau pop bisa disela oleh yang berikutnya.',
    'Reduced motion: layar berganti dengan cross-fade 120 ms tanpa bergeser.',
  ],
  a11y: [
    'Saat push, fokus pindah ke heading layar yang didorong (atau `[data-lds-autofocus]`); saat pop, kembali ke baris yang membuka layar itu.',
    'Layar yang tertutup `inert`, sehingga Tab maupun pembaca layar tidak mencapainya.',
    'Tombol kembali adalah tombol sungguhan dengan `aria-label="Kembali ke Layanan"`; seretan hanya pintasan.',
    'Beri setiap tampilan `aria-label` berisi judulnya.',
  ],
  do: [
    'Tampilkan judul sebelumnya di tombol kembali jika muat; chevron saja jika tidak.',
    'Taruh tab bar di luar stack agar tetap diam saat layar bergerak.',
    'Mengetuk tab aktif sekali lagi kembali ke root (`popToRoot`).',
  ],
  dont: [
    'Menggeser di antara tab; tab berganti di tempat.',
    'Mendorong layar untuk tugas singkat; pakai [sheet](sheet).',
    'Menaruh gesekan horizontal di dekat tepi kiri layar yang didorong; tepi itu milik tombol kembali.',
  ],
  js: '`data-lds-navstack` pada kontainer, `data-lds-nav="viewId"` pada pemicu, `data-lds-back` pada tombol kembali. Fungsi: `pushView(idOrEl, from)`, `popView(stackOrChild)`, `popToRoot(stackOrChild)`. Event pada tampilan: `lds:push` `{ view, from }` dan `lds:pop` `{ view, to }`, keduanya bubbling. Stack tersimpan di `stack._views`, root lebih dulu.',
};
