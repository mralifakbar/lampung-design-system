const pick = `const b = event.target.closest('.sidebar__item'); if (!b) return; this.querySelectorAll('.sidebar__item').forEach((x) => x.removeAttribute('aria-current')); b.setAttribute('aria-current', 'page'); this.querySelector('.sidebar__hl').style.transform = 'translateY(' + b.offsetTop + 'px)';`;

export default {
  summary: 'Panel berbingkai berisi tautan dengan satu sorotan yang bergeser, diletakkan di dalam konten: bagian-bagian halaman pengaturan, folder kotak masuk. Bukan kerangka aplikasi.',
  when: [
    'Halaman punya bagian sekunder sendiri yang didaftar di samping konten: Pengaturan (Profil, Notifikasi, Tagihan), kategori pusat bantuan, folder kotak masuk.',
    'Tata letak dua kolom (`split-2`) yang kolom kirinya mendaftar apa yang ditampilkan kolom kanan.',
  ],
  whenNot: [
    ['Navigasi utama seluruh aplikasi, sticky setinggi layar dengan drawer di ponsel', 'app-shell', 'Shell sudah punya sorotan, grup, dan bagian'],
    ['Tautan seluruh situs di bagian atas', 'top-nav'],
    ['Melompat ke heading dalam satu halaman panjang', 'outline'],
    ['Dua sampai lima bagian sejajar yang muat selebar halaman', 'tabs'],
    ['Pohon folder yang bisa dibuka dan ditutup', 'tree'],
  ],
  where: 'Di kolom kiri `split-2` di dalam konten, lebar 240 px, di atas kolom itu. Di bawah 860 px `split-2` menumpuknya di atas konten; di ponsel lebih baik pakai [list](list) berisi tautan yang masing-masing membuka halaman.',
  anatomy: [
    ['nav.sidebar', 'Wajib. Panel dengan `aria-label`; latar dasar, garis 1 px, radius 16 px.'],
    ['.sidebar__hl', 'Wajib. Satu-satunya sorotan; anak pertama, `aria-hidden`. Geser dengan `transform: translateY(<item offsetTop>px)`.'],
    ['.sidebar__head', 'Keterangan di atas sekelompok item.'],
    ['.sidebar__item', 'Wajib. Tautan atau tombol: `.ic` + teks (+ `.sidebar__badge`). `aria-current="page"` pada item aktif.'],
    ['.sidebar__badge', 'Hitungan tenang di ujung item.'],
  ],
  examples: [
    {
      title: 'Bagian ruang kerja',
      desc: 'Pilih sebuah item: sorotan meluncur ke sana dengan spring, bukan setiap item menyala sendiri.',
      html: `<nav class="sidebar" aria-label="Ruang kerja" onclick="${pick}">
  <span class="sidebar__hl" aria-hidden="true" style="transform: translateY(120px);"></span>
  <span class="sidebar__head">Ruang kerja</span>
  <button class="sidebar__item"><span class="ic" aria-hidden="true">home</span>Beranda</button>
  <button class="sidebar__item"><span class="ic" aria-hidden="true">calendar_month</span>Jadwal</button>
  <button class="sidebar__item" aria-current="page"><span class="ic" aria-hidden="true">menu_book</span>Layanan<span class="sidebar__badge">6</span></button>
  <button class="sidebar__item"><span class="ic" aria-hidden="true">assignment</span>Permohonan<span class="sidebar__badge">3</span></button>
  <button class="sidebar__item"><span class="ic" aria-hidden="true">receipt_long</span>Tagihan</button>
  <button class="sidebar__item"><span class="ic" aria-hidden="true">settings</span>Pengaturan</button>
</nav>`,
      code: `<nav class="sidebar" aria-label="Ruang kerja">
  <span class="sidebar__hl" aria-hidden="true" style="transform: translateY(120px);"></span>
  <span class="sidebar__head">Ruang kerja</span>
  <a class="sidebar__item" href="/home"><span class="ic" aria-hidden="true">home</span>Beranda</a>
  <a class="sidebar__item" href="/courses" aria-current="page"><span class="ic" aria-hidden="true">menu_book</span>Layanan<span class="sidebar__badge">6</span></a>
</nav>
<script type="module">
  // Move the one highlight to the current item
  const nav = document.querySelector('.sidebar');
  const cur = nav.querySelector('[aria-current="page"]');
  nav.querySelector('.sidebar__hl').style.transform = \`translateY(\${cur.offsetTop}px)\`;
</script>`,
    },
    {
      title: 'Halaman pengaturan di samping kontennya',
      desc: 'Di kolom kiri `split-2`; menumpuk di atas konten di bawah 860 px.',
      html: `<div class="split-2" style="--side: 240px;">
  <nav class="sidebar" aria-label="Pengaturan">
    <span class="sidebar__hl" aria-hidden="true" style="transform: translateY(10px);"></span>
    <a class="sidebar__item" href="#sb2" aria-current="page"><span class="ic" aria-hidden="true">person</span>Profil</a>
    <a class="sidebar__item" href="#sb2"><span class="ic" aria-hidden="true">notifications</span>Notifikasi</a>
    <a class="sidebar__item" href="#sb2"><span class="ic" aria-hidden="true">lock</span>Kata sandi dan masuk</a>
  </nav>
  <div class="section" id="sb2">
    <div class="section__head"><h2>Profil</h2><p class="section__sub">Cara nama dan foto Anda tampil bagi petugas layanan.</p></div>
  </div>
</div>`,
    },
  ],
  states: [
    ['aria-current="page"', 'Teks aksen dengan ketebalan 500 dan ikon terisi; sorotan berada di belakangnya.'],
    ['hover', 'Tint tenang pada item.'],
    ['focus', 'Focus ring sistem.'],
  ],
  motion: [
    'Sorotan: satu `.sidebar__hl` bergeser dengan `--spring-smooth` selama `--d-smooth` (560 ms); klik kedua di tengah luncuran mengalihkan tujuannya dengan mulus. Warna teks item berubah halus selama `--d-fast`.',
    'Atur posisi awal tanpa transisi (`transition: none` selama satu frame) agar sorotan tidak terbang masuk saat dimuat.',
    'Reduced motion: sorotan bergerak dalam 120 ms linear.',
  ],
  a11y: [
    '`<nav aria-label>`; item berupa tautan jika mengubah URL, tombol jika mengganti konten di tempat.',
    'Tandai item aktif dengan `aria-current="page"`, tidak hanya dengan sorotan.',
    'Badge dibacakan sebagai bagian nama; buat berupa angka yang bermakna.',
  ],
  do: [
    'Pakai satu sorotan dan geser; jangan pernah memberi tint pada tiap item sendiri-sendiri.',
    'Buat daftarnya pendek (kurang dari sepuluh item) dan labelnya beberapa kata saja.',
  ],
  dont: [
    'Memakai sidebar sebagai kerangka aplikasi; itu tugas [app shell](app-shell).',
    'Menaruh sidebar di dalam sidebar app shell.',
    'Menciutkannya menjadi ikon saja; labellah yang membuatnya mudah dipindai.',
  ],
  js: 'Tidak ada. Pindahkan `aria-current` dan atur `transform: translateY(<offsetTop>px)` pada `.sidebar__hl` dari kode Anda. [App shell](app-shell) melakukannya sendiri untuk navigasi utama.',
};
