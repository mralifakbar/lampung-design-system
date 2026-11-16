export default {
  summary: 'Dua panel dengan pegangan di antaranya yang bisa diseret, atau digeser dengan tombol panah, untuk membagi ruang. Untuk alat kerja yang kedua panelnya dipakai bersamaan.',
  when: [
    'Dua panel yang dipakai berdampingan dan pembagian idealnya tergantung orangnya: daftar laporan dan editornya, dokumen persyaratan dan formulirnya, daftar pemohon dan berkasnya.',
    'Pasangan bertumpuk di layar lebar yang panel bawahnya berupa konsol atau pratinjau (`resize--y`).',
  ],
  whenNot: [
    ['Kolom samping tetap di sebelah konten (filter, detail)', 'layout-primitives', 'Pakai `.split-2`, yang juga bertumpuk di ponsel'],
    ['Navigasi aplikasi di samping halaman', 'app-shell'],
    ['Panel yang terbuka di atas halaman untuk satu tugas', 'drawer', 'Atau [sheet](sheet) di ponsel'],
    ['Dua tampilan yang dipakai bergantian, bukan bersamaan', 'tabs'],
  ],
  where: 'Di halaman alat kerja setinggi layar pada layar lebar, di dalam induk dengan tinggi tetap (split mengisinya). Di bawah sekitar 760 px tidak ada ruang untuk dua panel: tampilkan satu per satu dengan [tabs](tabs) atau [segmented control](segmented-control), atau tumpuk tanpa pegangan.',
  anatomy: [
    ['.resize', 'Wajib. Kontainer flex dengan `data-lds-resize`; `--size` (bawaan 50 %) adalah porsi panel pertama. `data-min` dan `data-max` (bawaan 20 dan 80) membatasinya dalam persen.'],
    ['first child', 'Wajib. Panel pertama, `flex-basis: var(--size)`, bergulir di dalam.'],
    ['.resize__handle', 'Wajib. Pegangan 12 px dengan grip 4 kali 36 px. Beri `aria-label` dan `aria-controls` (id panel pertama); JS menambahkan `role="separator"`, `tabindex`, orientasi, dan nilainya.'],
    ['last child', 'Wajib. Panel kedua, mengambil sisa ruang, bergulir di dalam.'],
    ['.resize--y', 'Varian vertikal: panel bertumpuk, pegangan row-resize di antaranya.'],
  ],
  examples: [
    {
      title: 'Persyaratan dan formulir',
      desc: 'Seret pegangannya, atau fokuskan lalu pakai Kiri dan Kanan (Shift untuk langkah lebih besar), Home dan End.',
      html: `<div class="resize card" data-lds-resize data-min="25" data-max="75" style="--size: 55%; height: 280px; width: 100%; padding: 0;">
  <div id="rz-passage" style="padding: 16px;"><h3 class="section__title-sm">Persyaratan</h3><p class="section__sub" style="margin-top: 8px;">Lampirkan KTP pemilik usaha, surat keterangan domisili dari kelurahan, dan foto tampak depan tempat usaha. Berkas berupa PDF atau JPG, paling besar 2 MB per berkas.</p></div>
  <div class="resize__handle" aria-label="Ubah lebar panel persyaratan" aria-controls="rz-passage"></div>
  <div style="padding: 16px;"><h3 class="section__title-sm">Langkah 4 dari 10</h3><p class="section__sub" style="margin-top: 8px;">Di mana lokasi tempat usaha Anda?</p></div>
</div>`,
    },
    {
      title: 'Editor di atas pratinjau',
      desc: '`resize--y` menumpuk panel; Atas dan Bawah menggeser pegangan.',
      html: `<div class="resize resize--y card" data-lds-resize style="--size: 60%; height: 300px; width: 100%; padding: 0;">
  <div id="rz-editor" style="padding: 16px;"><h3 class="section__title-sm">Isi pengumuman</h3><p class="section__sub" style="margin-top: 8px;">Pelayanan KTP elektronik di kecamatan tutup sementara pada 17 Desember.</p></div>
  <div class="resize__handle" aria-label="Ubah tinggi editor" aria-controls="rz-editor"></div>
  <div style="padding: 16px;"><h3 class="section__title-sm">Pratinjau</h3></div>
</div>`,
    },
  ],
  variants: [
    ['.resize', 'Berdampingan, kursor `col-resize`.'],
    ['.resize--y', 'Bertumpuk, kursor `row-resize`.'],
  ],
  states: [
    ['hover / focus-visible / .is-dragging', 'Grip berwarna aksen dan memanjang dari 36 ke 56 px.'],
    ['at min or max', 'Pegangan berhenti; `aria-valuenow` sama dengan `aria-valuemin` atau `aria-valuemax`.'],
  ],
  motion: [
    'Panel mengikuti pointer 1:1 (tanpa transisi ukuran), sehingga seretan tidak pernah tertinggal.',
    'Grip berganti warna dalam `--d-fast` (160 ms) dan panjang dengan `--spring-snappy` (360 ms) saat di-hover, difokus, atau ditahan.',
    'Reduced motion: grip berubah dalam 120 ms linear.',
  ],
  a11y: [
    'Pegangan menjadi `role="separator"` dengan `tabindex="0"`, `aria-orientation`, `aria-valuemin`, `aria-valuemax`, dan `aria-valuenow` (persen panel pertama).',
    'Tombol: Kiri dan Atas mengecilkan, Kanan dan Bawah membesarkan, sebesar 2 % (10 % dengan Shift); Home dan End menuju batas.',
    'JS tidak memberi nama pada pegangan: tambahkan `aria-label` ("Ubah lebar panel persyaratan") dan `aria-controls` berisi id panel pertama.',
    'Kedua panel bergulir sendiri-sendiri; pastikan masing-masing punya heading agar pengguna pembaca layar tahu posisinya.',
  ],
  do: [
    'Mulai dari pembagian yang diinginkan kebanyakan orang dan pertahankan batasnya agar tidak ada panel yang jadi tak berguna.',
    'Ingat ukuran per orang: simpan `size` dari `lds:resize`.',
  ],
  dont: [
    'Memakai split di ponsel.',
    'Menaruh split di dalam halaman yang bergulir secara keseluruhan; beri tinggi tetap.',
  ],
  js: '`data-lds-resize` pada `.resize`: seret pointer dan tombol keyboard mengatur `--size`, membatasinya ke `data-min`/`data-max`, menjaga nilai ARIA tetap terkini, dan memicu `lds:resize` dengan `{ size }` saat seretan selesai (tekan tombol tidak memicunya).',
};
