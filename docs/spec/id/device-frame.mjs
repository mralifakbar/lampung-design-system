export default {
  summary: 'Badan ponsel di sekitar layar `.phone`: bezel membulat, tombol samping, pulau kamera, dan status bar, diskalakan agar muat di halaman. Di ponsel sungguhan, layar yang sama melepas badannya dan mengisi tampilan dengan `.device--bleed`.',
  when: [
    'Menampilkan aplikasi ponsel di dalam halaman lebar: tur produk, halaman contoh, tinjauan desain, pengenalan aplikasi seluler.',
    'Pratinjau yang layarnya mendorong, menarik, dan mundur seperti aplikasi terpasang, dengan bezel yang memberi tahu bahwa ini ponsel.',
    'Pratinjau yang sama di ponsel, saat bingkai harus hilang dan aplikasi mengisi layar.',
  ],
  whenNot: [
    ['Layar kecil berbingkai di samping teks dokumentasi', 'phone-screen', 'Pakai `.phone.phone--inline` tanpa badan'],
    ['Aplikasi web responsif yang berjalan di ponsel dan desktop', 'app-shell'],
    ['Tangkapan layar atau foto perangkat', 'thumbnail'],
  ],
  where: 'Di tengah kolomnya sendiri, tanpa apa pun yang menumpuk. Beri kolom lebar yang pasti (misalnya track grid 414 px): bingkai diskalakan ke lebar itu dan ke tinggi jendela, tidak pernah melebihi ukuran aslinya. Di bawah 600 px tambahkan `.device--bleed` dan biarkan mengisi viewport di bawah app bar kecil.',
  anatomy: [
    ['.device[data-lds-device]', 'Wajib. Badan 414 kali 868 dengan bezel 12 px dan tombol samping. `data-lds-device` menskalakannya dengan CSS zoom agar muat; `data-fit-margin` (bawaan 48) adalah ruang vertikal yang disisakan.'],
    ['.phone', 'Wajib. Layar 390 kali 844 di dalamnya, dipotong dengan radius 48 px.'],
    ['.phone__content', 'Konten layar sebagai satu lapisan: nav bar, area gulir, dan tab bar. Selama sheet terbuka, lapisan ini mundur seperti kartu. Sheet, scrim, dan toaster tetap di luarnya.'],
    ['.device__status', 'Status bar: jam, `.device__signal` (empat `<i>`), ikon `wifi`, dan `.device__battery` (`--level` 0 sampai 1). `aria-hidden`.'],
    ['.device__island', 'Pulau kamera. `aria-hidden`.'],
    ['.home-ind', 'Home indicator di bagian bawah.'],
    ['[data-lds-push="id id"]', 'Pada `.phone`: id sheet yang mendorong konten mundur selama terbuka (dipisah spasi).'],
  ],
  examples: [
    {
      title: 'Layar dalam bingkainya',
      desc: 'Bingkai menyesuaikan kolom ini. Buka sheet: konten mundur, status bar menjadi terang di atas latar gelap, dan sheet bisa diseret pergi.',
      html: `<div style="display: flex; justify-content: center; width: 100%;">
<div style="width: 414px; max-width: 100%; display: flex; justify-content: center;">
<div class="device" data-lds-device data-fit-margin="160">
  <div class="phone" data-lds-push="df-sheet">
    <div class="phone__content">
      <div class="navbar" id="df-bar"><span></span><span class="navbar__title" aria-hidden="true">Hari ini</span><span></span></div>
      <div class="phone__scroll" data-lds-navbar="df-bar">
        <div class="navbar-gap"></div>
        <h3 class="large-title">Hari ini</h3>
        <div class="stack" style="--gap: 24px; padding: 12px 16px 120px;">
          <div class="list list--fill">
            <div class="lrow"><span class="lrow__body"><span class="lrow__title">Posyandu Melati</span><span class="lrow__sub">08.00 · Balai warga RT 03</span></span></div>
            <div class="lrow"><span class="lrow__body"><span class="lrow__title">Imunisasi anak</span><span class="lrow__sub">13.00 · Puskesmas Kedaton</span></span></div>
          </div>
          <button type="button" class="btn btn--secondary btn--lg btn--block" data-lds-open="df-sheet" aria-haspopup="dialog">Catat kehadiran</button>
        </div>
      </div>
      <nav class="tabbar" aria-label="Utama"><button type="button" class="tabbar__item" aria-current="page"><span class="ic" aria-hidden="true">today</span>Hari ini</button><button type="button" class="tabbar__item"><span class="ic" aria-hidden="true">menu_book</span>Layanan</button><button type="button" class="tabbar__item"><span class="ic" aria-hidden="true">person</span>Profil</button></nav>
    </div>
    <div class="scrim" data-lds-scrim="df-sheet"></div>
    <div class="sheet" id="df-sheet" role="dialog" aria-modal="true" aria-labelledby="df-sheet-t" data-lds-layer style="padding-bottom: 38px;">
      <div class="sheet__grabber" aria-hidden="true"></div>
      <div class="sheet__head" data-lds-drag><h4 class="sheet__title" id="df-sheet-t">Catat kehadiran</h4><button type="button" class="icon-btn icon-btn--filled" aria-label="Tutup" data-lds-close><span class="ic" aria-hidden="true">close</span></button></div>
      <button type="button" class="btn btn--primary btn--lg btn--block" data-lds-close>Saya sudah di lokasi</button>
    </div>
    <div class="device__status" aria-hidden="true"><span>9.41</span><span class="device__status-end"><span class="device__signal"><i></i><i></i><i></i><i></i></span><span class="ic">wifi</span><span class="device__battery" style="--level: 0.76;"></span></span></div>
    <span class="device__island" aria-hidden="true"></span>
    <span class="home-ind" aria-hidden="true"></span>
  </div>
</div>
</div>
</div>`,
      code: `<div class="device" data-lds-device>
  <div class="phone" data-lds-push="attendance">
    <div class="phone__content">…nav bar, scroller, tab bar…</div>
    <div class="scrim" data-lds-scrim="attendance"></div>
    <div class="sheet" id="attendance" role="dialog" aria-modal="true" data-lds-layer>…</div>
    <div class="device__status" aria-hidden="true">
      <span>9.41</span>
      <span class="device__status-end"><span class="device__signal"><i></i><i></i><i></i><i></i></span><span class="ic">wifi</span><span class="device__battery" style="--level: 0.76;"></span></span>
    </div>
    <span class="device__island" aria-hidden="true"></span>
    <span class="home-ind" aria-hidden="true"></span>
  </div>
</div>`,
    },
    {
      title: 'Penuh layar di ponsel',
      desc: 'Ubah kelasnya di layar kecil. Badan, pulau kamera, dan status bar hilang; bar-bar memberi padding sendiri sesuai safe area.',
    },
  ],
  variants: [
    ['.device', 'Badan penuh, diskalakan agar muat dengan `data-lds-device`.'],
    ['.device.device--bleed', 'Tanpa badan: layar mengisi kontainernya, `--phone-top` dan `--phone-bottom` berasal dari `env(safe-area-inset-*)`.'],
  ],
  states: [
    ['.phone.is-pushed', 'Sheet yang terdaftar sedang terbuka: `.phone__content` mengecil ke 0,92 di bawah status bar, sudutnya membulat, dan meredup; latar menjadi hitam dan status bar terang.'],
  ],
  motion: [
    'Mundur: `.phone__content` mengecil dan membulat dengan `--spring-smooth` selama `--d-smooth`, kecerahan berubah dengan `--ease-standard`. Menutup sheet membaliknya dari posisinya.',
    'Penskalaan agar muat tidak dianimasikan: langsung mengikuti ukuran jendela.',
    'Reduced motion: konten tetap di tempat dan hanya meredup, selama 120 ms.',
  ],
  a11y: [
    'Status bar, pulau kamera, dan home indicator adalah dekorasi: `aria-hidden="true"`.',
    'Taruh bingkai di landmark bernama (misalnya `<main aria-label="Pratinjau ponsel">`) agar orang bisa melompat ke sana.',
    'Bingkai ditampilkan dengan CSS zoom, sehingga teks di dalamnya tetap berukuran asli relatif terhadap layar dan tetap tajam; jangan pernah mengecilkannya di bawah sekitar setengah ukuran, saat teks isi turun di bawah 8 px.',
  ],
  do: [
    'Beri kolom lebar tetap agar bingkai punya acuan untuk menyesuaikan diri.',
    'Ganti ke `.device--bleed` di ponsel alih-alih menampilkan ponsel di dalam ponsel.',
    'Taruh sheet, scrim, dan toaster di luar `.phone__content` agar tidak ikut mundur.',
  ],
  dont: [
    'Menaruh konten sungguhan di status bar; itu hanya gambaran.',
    'Menambah bayangan kedua atau latar berwarna di belakang bingkai.',
    'Memakainya untuk tangkapan layar; pakai [thumbnail](thumbnail).',
  ],
  js: '`data-lds-device` pada `.device` mengatur `--device-scale` (CSS zoom) dari lebar induk dan tinggi jendela dikurangi `data-fit-margin`, saat dimuat dan saat ukuran berubah. `fitDevice(el)` menjalankannya secara manual setelah layout berubah. `data-lds-push` menerima beberapa id sheet dipisah spasi. Seretan di dalam bingkai (sheet, baris geser, slide to confirm, navigation stack) dibagi dengan zoom agar tetap di bawah jari.',
};
