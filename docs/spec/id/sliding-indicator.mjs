const SIDE = "const b = event.target.closest('.sidebar__item'); if (!b) return; this.querySelectorAll('.sidebar__item').forEach((x) => x.toggleAttribute('aria-current', x === b)); b.setAttribute('aria-current', 'page'); this.querySelector('.sidebar__hl').style.transform = 'translateY(' + b.offsetTop + 'px)';";

export default {
  summary: 'Satu penanda berpindah ke pilihan yang dipilih: thumb segmented, garis tab, sorotan sidebar, garis outline, sorotan toolbar. Label tidak pernah menyala sendiri; satu elemen yang bergerak itulah yang menunjukkan ke mana pilihan berpindah.',
  when: [
    'Memilih satu dari beberapa pilihan yang tampil berdampingan: thumb [segmented control](segmented-control), garis [tab](tabs).',
    'Menunjukkan posisi Anda dalam daftar tempat: sorotan [sidebar](sidebar) atau [app shell](app-shell), garis [outline](outline) saat bagian-bagian halaman di-scroll.',
    'Sorotan yang mengikuti hover di sepanjang deretan alat ([expanding toolbar](expanding-toolbar)).',
  ],
  whenNot: [
    ['Menyalakan atau mematikan satu hal', 'switch'],
    ['Memilih beberapa pilihan sekaligus', 'chips'],
    ['Konten di bawah tab yang berubah', 'view-swap'],
    ['Kemajuan dalam urutan yang tetap', 'steps'],
    ['Halaman di header situs (tautan aktif digarisbawahi, tidak digeser)', 'top-nav'],
  ],
  where: 'Di belakang atau di bawah pilihan yang ditandainya, di dalam grupnya: `seg__thumb` sebagai anak pertama `.seg`, `tabs__ink` pertama di `.tabs`, `sidebar__hl` / `shell__hl` pertama di nav, `toc__ink` pertama di `.toc`, `xbar__hl` pertama di `.xbar`.',
  examples: [
    {
      title: 'Thumb segmented',
      desc: 'Pilih rentang. Thumb bergeser dengan smooth spring; klik dengan cepat dan thumb berbelok di tengah jalan. Tombol panah juga menggerakkannya.',
      html: `<div class="seg seg--lg" role="group" aria-label="Tampilkan laporan untuk" data-lds-segmented style="width: 360px;">
  <span class="seg__thumb"></span>
  <button class="seg__btn" aria-pressed="true">Minggu ini</button>
  <button class="seg__btn" aria-pressed="false">Bulan</button>
  <button class="seg__btn" aria-pressed="false">Tahun</button>
</div>`,
    },
    {
      title: 'Garis tab dan panel di bawahnya',
      desc: 'Garis bergeser ke tab baru sementara panelnya berganti (lihat [view swap](view-swap)). Ketebalan label tab langsung berubah; hanya garisnya yang berpindah.',
      html: `<div style="max-width: 460px;">
  <div class="tabs" role="tablist" aria-label="Bagian layanan" data-lds-tabs>
    <span class="tabs__ink"></span>
    <button class="tabs__btn" role="tab" aria-selected="true" aria-controls="si-1">Ringkasan</button>
    <button class="tabs__btn" role="tab" aria-selected="false" aria-controls="si-2">Permohonan <span class="tabs__count">3</span></button>
    <button class="tabs__btn" role="tab" aria-selected="false" aria-controls="si-3">Dokumen</button>
  </div>
  <div class="tab-panel" role="tabpanel" id="si-1">Syarat, biaya, dan jam layanan izin usaha.</div>
  <div class="tab-panel" role="tabpanel" id="si-2" hidden>Tiga permohonan sedang diproses. Yang terdekat selesai Jumat pukul 15.00.</div>
  <div class="tab-panel" role="tabpanel" id="si-3" hidden>Formulir dan contoh dokumen, yang terbaru di atas.</div>
</div>`,
    },
    {
      title: 'Sorotan sidebar',
      desc: 'Pilih sebuah halaman. Sorotan berwarna meluncur di belakang butir; ikon dan label langsung berganti warna. Di [app shell](app-shell), sorotan yang sama ditempatkan oleh `data-lds-shell` setiap kali `aria-current` berpindah.',
      html: `<nav class="sidebar" aria-label="Layanan" onclick="${SIDE}">
  <span class="sidebar__hl" aria-hidden="true" style="transform: translateY(10px);"></span>
  <button class="sidebar__item" aria-current="page"><span class="ic" aria-hidden="true">home</span>Ringkasan</button>
  <button class="sidebar__item"><span class="ic" aria-hidden="true">assignment</span>Permohonan<span class="sidebar__badge">3</span></button>
  <button class="sidebar__item"><span class="ic" aria-hidden="true">menu_book</span>Dokumen</button>
  <button class="sidebar__item"><span class="ic" aria-hidden="true">group</span>Petugas</button>
</nav>`,
      code: `<nav class="sidebar" aria-label="Layanan">
  <span class="sidebar__hl" aria-hidden="true"></span>
  <a class="sidebar__item" href="overview" aria-current="page"><span class="ic" aria-hidden="true">home</span>Ringkasan</a>
  <a class="sidebar__item" href="applications"><span class="ic" aria-hidden="true">assignment</span>Permohonan</a>
</nav>
<!-- Saat berganti: pindahkan aria-current, lalu setel transform .sidebar__hl ke translateY(<offsetTop butir>px).
     Di layout penuh pakai app shell (.shell__hl), yang ditempatkan oleh data-lds-shell untuk Anda. -->`,
    },
  ],
  variants: [
    ['.seg__thumb', 'Segmented control. Lebarnya disetel oleh `data-lds-segmented` selebar satu segmen; bergerak dengan `translateX(i * 100%)`.'],
    ['.tabs__ink', 'Tab. Garis 2 px di bawah tab yang dipilih; disetel oleh `data-lds-tabs`.'],
    ['.sidebar__hl / .shell__hl', 'Sidebar dan app shell: pil berwarna di belakang butir aktif. `.shell__hl` ditempatkan oleh `data-lds-shell` (yang mengamati `aria-current`).'],
    ['.toc__ink', 'Outline: garis 1,5 px di samping bagian yang sedang terlihat; `data-lds-toc` juga menyesuaikan tingginya dengan tinggi tautan.'],
    ['.xbar__hl', 'Expanding toolbar: mengikuti hover dan fokus, berpindah sekali ke posisi akhir tombol.'],
  ],
  motion: [
    'Penanda bergerak dengan `transform` memakai `--spring-smooth` selama `--d-smooth` (560 ms), tanpa overshoot. Jika ukurannya juga berubah (outline, toolbar), tinggi atau lebar memakai spring yang sama agar keduanya tiba bersamaan.',
    'Label berubah seketika (ketebalan, warna) atau dalam `--d-fast`; label tidak pernah beranimasi sendiri, sehingga hanya ada satu hal yang bergerak.',
    'Interupsi: setiap pilihan baru menyetel transform baru; transisi dimulai dari posisi saat itu, sehingga klik cepat atau tekanan tombol panah meluncur langsung ke pilihan terakhir.',
    'Penempatan saat dimuat bersifat seketika: setel posisi awal tanpa transisi (shell melakukannya untuk frame pertamanya) agar halaman tidak dibuka dengan geseran.',
    'Pergantian tema membekukan semua transisi kecuali thumb segmented, yang tetap bergeser (`.lds-theme-swap`).',
    'Reduced motion: penanda tetap pindah ke tempat barunya, dalam 120 ms linear, sehingga posisinya tetap jelas tanpa perpindahan.',
  ],
  a11y: [
    'Indikatornya dekorasi: `aria-hidden="true"`. State ada pada pilihannya: `aria-pressed` (segmented), `aria-selected` dengan roving `tabindex` (tab), `aria-current="page"` (navigasi), `aria-current="true"` (outline).',
    'Tombol panah memindahkan pilihan di segmented control dan tab; daftar navigasi memakai Tab.',
    'Pilihan juga harus terlihat tanpa penanda (ketebalan atau warna pada label) untuk mode kontras tinggi yang bisa menghilangkan warna tipis.',
  ],
  do: [
    'Pakai satu elemen indikator per grup, digerakkan dengan `transform`.',
    'Biarkan hook sistem yang menempatkannya (`data-lds-segmented`, `data-lds-tabs`, `data-lds-shell`, `data-lds-toc`).',
    'Buat perubahan label seketika dan jadikan penanda satu-satunya yang berpindah.',
  ],
  dont: [
    'Memberi setiap pilihan latar sendiri yang memudar masuk dan keluar.',
    'Menganimasikan `left` atau `width` dengan frame JS; setel transform dan biarkan CSS memberinya spring.',
    'Menggeser penanda pada render pertama.',
  ],
  js: '`data-lds-segmented` dan `data-lds-tabs` mengatur ukuran dan menggerakkan penanda, menangani tombol panah, dan memancarkan `lds:change` dengan `{ index, item }`. `data-lds-shell` menempatkan `.shell__hl` setiap kali `aria-current` berubah. `data-lds-toc` menggerakkan `.toc__ink` saat bagian-bagian di-scroll. `.sidebar__hl` tidak punya binding sendiri: gerakkan sendiri atau pakai app shell.',
};
