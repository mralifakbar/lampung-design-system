export default {
  summary: 'Barisan menu perintah (Berkas, Edit, Tampilan) untuk editor bergaya desktop. Setiap tombol membuka dropdown menu berisi perintah beserta pintasannya.',
  when: [
    'Editor dokumen atau konten di layar lebar dengan banyak perintah yang dipelajari lewat pintasan: editor pengumuman, bank formulir, penyusun laporan.',
    'Perintah terkelompok secara alami menjadi empat sampai enam menu.',
  ],
  whenNot: [
    ['Beberapa aksi pada satu objek', 'dropdown-menu', 'Satu tombol "lainnya" dengan menu'],
    ['Navigasi situs atau aplikasi antarhalaman', 'top-nav'],
    ['Tombol format yang sering ditekan (tebal, miring, rata)', 'button-group'],
    ['Mencari semua perintah berdasarkan nama', 'command-palette'],
  ],
  where: 'Di atas permukaan editor, di bawah judul halaman dan di atas dokumen, rata kiri. Sembunyikan di ponsel: taruh beberapa perintah penting di [dropdown menu](dropdown-menu) atau [sheet](sheet).',
  anatomy: [
    ['.menubar[role=menubar]', 'Wajib. Baris berbingkai dengan `aria-label`; diposisikan agar menu bisa menggantung darinya.'],
    ['.menubar__btn', 'Wajib. Tombol menu 32 px dengan `role="menuitem"`, `aria-haspopup="menu"`, `aria-expanded`, dan `data-lds-menu` yang menyebut menunya.'],
    ['.menu', 'Wajib. [Dropdown menu](dropdown-menu) untuk setiap tombol, di dalam pembungkus `position: relative`.'],
    ['.menu__item kbd', 'Pintasan, rata kanan dan diredam.'],
  ],
  examples: [
    {
      title: 'Editor pengumuman',
      desc: 'Klik Berkas atau Edit; tombol panah berpindah di dalam menu yang terbuka, Escape menutupnya dan mengembalikan fokus ke tombol.',
      html: `<div class="menubar" role="menubar" aria-label="Editor pengumuman" style="width: max-content;">
  <div style="position: relative;">
    <button class="menubar__btn" role="menuitem" aria-haspopup="menu" aria-expanded="false" data-lds-menu="mb-file">Berkas</button>
    <div class="menu" id="mb-file" role="menu" aria-label="Berkas" style="top: calc(100% + 8px); left: 0;">
      <button class="menu__item" role="menuitem">Pengumuman baru<kbd>⌘N</kbd></button>
      <button class="menu__item" role="menuitem">Duplikat<kbd>⌘D</kbd></button>
      <div class="menu__sep"></div>
      <button class="menu__item" role="menuitem">Ekspor sebagai PDF<kbd>⇧⌘E</kbd></button>
    </div>
  </div>
  <div style="position: relative;">
    <button class="menubar__btn" role="menuitem" aria-haspopup="menu" aria-expanded="false" data-lds-menu="mb-edit">Edit</button>
    <div class="menu" id="mb-edit" role="menu" aria-label="Edit" style="top: calc(100% + 8px); left: 0;">
      <button class="menu__item" role="menuitem">Urungkan<kbd>⌘Z</kbd></button>
      <button class="menu__item" role="menuitem">Ulangi<kbd>⇧⌘Z</kbd></button>
      <button class="menu__item" role="menuitem">Cari<kbd>⌘F</kbd></button>
    </div>
  </div>
  <div style="position: relative;">
    <button class="menubar__btn" role="menuitem" aria-haspopup="menu" aria-expanded="false" data-lds-menu="mb-view">Tampilan</button>
    <div class="menu" id="mb-view" role="menu" aria-label="Tampilan" style="top: calc(100% + 8px); left: 0;">
      <button class="menu__item is-selected" role="menuitemcheckbox" aria-checked="true">Tampilkan kerangka<span class="ic menu__check" aria-hidden="true">check</span></button>
      <button class="menu__item" role="menuitemcheckbox" aria-checked="false">Tampilkan catatan petugas</button>
    </div>
  </div>
</div>`,
    },
  ],
  states: [
    ['hover', 'Tint kuat di belakang tombol.'],
    ['aria-expanded="true"', 'Tombol tetap ber-tint selama menunya terbuka.'],
    ['menu open', 'Lihat [dropdown menu](dropdown-menu): tumbuh dari kiri atas tombolnya.'],
  ],
  motion: [
    'Tint tombol berubah halus selama `--d-instant` (120 ms).',
    'Menu masuk dengan opacity selama `--d-fast` dan skala dari 0,96 serta -4 px dengan `--spring-smooth`; keluar selama `--d-exit` (180 ms) dengan `--ease-exit`. Membuka menu lain langsung menutup menu pertama.',
    'Reduced motion: menu hanya memudar, tanpa skala.',
  ],
  a11y: [
    '`role="menubar"` dengan `aria-label`; setiap tombol `role="menuitem"` dengan `aria-haspopup="menu"` dan `aria-expanded`.',
    'Panah bawah pada tombol membuka menunya dan memfokuskan item pertama; Atas dan Bawah berpindah di dalam; Escape menutup dan mengembalikan fokus ke tombol.',
    'Tampilkan pintasan di `kbd` dan pastikan berfungsi; pintasan yang hanya ditampilkan itu menyesatkan.',
    'Kiri dan Kanan di antara tombol menubar tidak diatur oleh skrip; tambahkan di kode Anda (pindahkan fokus ke `.menubar__btn` sebelumnya atau berikutnya, dan buka menunya jika tadi ada yang terbuka).',
  ],
  do: [
    'Pakai urutan yang lazim: Berkas, Edit, Tampilan, lalu menu khusus, Bantuan paling akhir.',
    'Cerminkan setiap perintah menubar di [command palette](command-palette).',
  ],
  dont: [
    'Memakai menubar untuk navigasi antarhalaman.',
    'Menampilkannya di ponsel.',
    'Menaruh satu perintah langsung di bar sebagai tombol; semua yang ada di bar membuka menu.',
  ],
  js: 'Setiap `.menubar__btn` memakai hook menu: `data-lds-menu="menuId"` mengubah `.is-open` pada menu dan `aria-expanded` pada tombol, panah bawah membukanya, Atas/Bawah berpindah antar-item, Escape atau klik di luar menutupnya. `closeMenus()` menutupnya dari kode.',
};
