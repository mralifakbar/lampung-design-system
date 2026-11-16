const B = (icon, label, open) => `<button class="xbar__btn${open ? ' is-open' : ''}" aria-label="${label}"><span class="ic" aria-hidden="true">${icon}</span><span class="xbar__label"><span>${label}</span></span></button>`;

export default {
  summary: 'Deretan ringkas alat berikon; alat yang sedang di-hover atau difokus membuka labelnya dan satu sorotan meluncur ke sana. Alat bawaan menampilkan labelnya saat diam, jadi bilah ini tidak pernah berupa deretan ikon tanpa penjelasan.',
  when: [
    'Sekumpulan kecil aksi untuk satu objek yang harus tetap ringkas: catatan, gambar yang dipilih, dokumen di penampil.',
    'Ikon saja bisa membingungkan, tetapi label di setiap alat tidak muat.',
  ],
  whenNot: [
    ['Toggle format yang tetap aktif (tebal, miring)', 'toggle', 'Grup toggle menampilkan status tertekan; expanding toolbar tidak.'],
    ['Aksi untuk beberapa item terpilih', 'selection-bar'],
    ['Lebih dari enam aksi', 'dropdown-menu'],
    ['Navigasi aplikasi', 'top-nav'],
    ['Bilah judul halaman dengan menu', 'menubar'],
  ],
  where: 'Melayang di atas atau menempel pada objek yang dikenainya (kanan atas catatan, di bawah gambar terpilih), atau di toolbar halaman yang ringkas. Paling banyak enam alat, dipisah menjadi grup dengan `.xbar__sep`.',
  anatomy: [
    ['.xbar', 'Wajib. `role="toolbar"`, `aria-label`, `data-lds-toolbar`. Padding 4 px, radius 14 px, bayangan kecil.'],
    ['.xbar__hl', 'Wajib. Sorotan yang meluncur, anak pertama, `aria-hidden`.'],
    ['.xbar__btn', 'Wajib. Ikon ditambah `.xbar__label > span`. `.is-open` pada alat bawaan.'],
    ['.xbar__sep', 'Opsional. Garis tipis di antara grup.'],
  ],
  examples: [
    {
      title: 'Aksi catatan',
      desc: 'Arahkan kursor atau tekan Tab melewati alat-alatnya: setiap label terbuka saat sorotan meluncur langsung ke posisi akhir tombol. Tinggalkan bilah dan Ubah terbuka lagi.',
      html: `<div class="xbar" data-lds-toolbar role="toolbar" aria-label="Aksi catatan">
  <span class="xbar__hl" aria-hidden="true"></span>
  ${B('edit', 'Ubah', true)}${B('content_copy', 'Duplikat')}${B('share', 'Bagikan')}${B('delete', 'Hapus')}
</div>`,
    },
    {
      title: 'Alat berkelompok untuk gambar',
      desc: 'Pemisah membagi alat penataan dari alat berbagi. Sorotan melewati pemisah.',
      html: `<div class="xbar" data-lds-toolbar role="toolbar" aria-label="Alat gambar">
  <span class="xbar__hl" aria-hidden="true"></span>
  ${B('format_align_left', 'Rata kiri', true)}${B('format_align_center', 'Tengah')}${B('format_align_right', 'Rata kanan')}
  <span class="xbar__sep" aria-hidden="true"></span>
  ${B('download', 'Unduh')}${B('share', 'Bagikan')}
</div>`,
    },
  ],
  states: [
    ['rest', 'Alat bawaan (`is-open`) menampilkan labelnya; sorotan tersembunyi.'],
    ['hover / focus', 'Alat itu terbuka; sorotan tampil (`.xbar.is-hover`) dan meluncur ke sana.'],
    ['leave', 'Pointer atau fokus meninggalkan bilah: alat bawaan terbuka lagi dan sorotan memudar.'],
    ['pressed', 'Alat mengecil ke 0,94 dalam 90 ms.'],
  ],
  motion: [
    'Label terbuka dengan `grid-template-columns: 0fr` ke `1fr` memakai `--spring-smooth` (`--d-smooth`, 560 ms); teks muncul perlahan selama `--d-fast` 60 ms kemudian, dan langsung hilang saat menutup.',
    'Sorotan: `transform` dan `width` dengan `--spring-smooth`. JS menghitung posisi tombol tujuan setelah semua label selesai membuka dan menutup, jadi sorotan bergerak lurus sekali jalan, tidak mengejar target yang bergeser.',
    'Interupsi: bergerak cepat melintasi alat mengarahkan ulang spring dari nilai saat ini; bilah tidak pernah bergetar.',
    'Reduced motion: label dan sorotan berubah dalam 120 ms linear.',
  ],
  a11y: [
    '`role="toolbar"` dengan `aria-label`. Setiap tombol punya `aria-label` (teks labelnya terpotong saat tertutup).',
    'Tab dan Shift+Tab berpindah antaralat dan membuka labelnya saat fokus, jadi pengguna keyboard melihat label yang sama dengan pengguna mouse.',
    'Perangkat sentuh tidak punya hover: label bawaan tampil, yang lain terbuka saat fokus setelah diketuk. Pastikan ikonnya jelas tanpa label.',
  ],
  do: [
    'Tandai alat yang paling mungkin dipakai dengan `is-open`.',
    'Pakai label satu atau dua kata.',
    'Kelompokkan alat yang berkaitan dengan pemisah.',
  ],
  dont: [
    'Memakainya untuk toggle yang butuh status tertekan.',
    'Menaruh lebih dari enam alat dalam satu bilah.',
    'Menganimasikan label sendiri; biarkan `data-lds-toolbar` yang mengukur.',
  ],
  js: '`[data-lds-toolbar]` saat `init()`: membuka `.xbar__btn` yang di-hover atau difokus, memindahkan `.xbar__hl` ke kotak akhirnya, dan mengembalikan alat bawaan (`is-open` saat dimuat, atau yang pertama) saat ditinggalkan.',
};
