const flip = `onclick="this.setAttribute('aria-pressed', String(this.getAttribute('aria-pressed') !== 'true'))"`;
const pick = `onclick="this.parentNode.querySelectorAll('.toggle').forEach(b => { const on = b === this; b.setAttribute('aria-checked', String(on)); b.setAttribute('aria-pressed', String(on)); })"`;

export default {
  summary: 'Tombol yang tetap tertekan untuk menunjukkan sebuah mode menyala (tebal, sematkan, bisukan). Sendirian ia adalah `.toggle`; beberapa berada di `.toggle-group`, bisa saling lepas (tebal, miring, garis bawah) atau satu per satu (rata kiri, tengah, kanan).',
  when: [
    'Mode format atau tampilan yang menyala atau mati dan berlaku pada hal yang sedang dikerjakan: tebal, miring, tampilkan grid, sematkan catatan.',
    'Toolbar ringkas berisi mode yang saling lepas (toggle group, beberapa bisa tertekan).',
    'Pilihan satu dari dua sampai empat yang dipimpin ikon di toolbar editor (perataan), ketika segmented control terlalu lebar.',
  ],
  whenNot: [
    ['Pengaturan yang bertahan dan berlaku di mana saja (notifikasi, dark mode)', 'switch', 'Switch ada di daftar pengaturan dengan label; toggle ada di toolbar.'],
    ['Memilih tampilan konten (daftar atau grid, minggu atau bulan)', 'segmented-control', 'Ia punya penanda yang bergeser dan label teks; pakai untuk tampilan.'],
    ['Memilih filter dari sekumpulan kata', 'chips'],
    ['Aksi sekali jalan yang tidak tetap menyala', 'icon-button'],
    ['Menyukai atau menyimpan dengan respons perayaan', 'like'],
  ],
  where: 'Di toolbar di atas hal yang diubahnya: editor, kanvas, pemutar media, header daftar. Di ponsel batasi toggle group pada empat tombol atau kurang; ia tidak turun baris.',
  anatomy: [
    ['.toggle', 'Wajib. `<button type="button">` dengan `aria-pressed`. Tinggi 36 px saat sendiri, 30 px di dalam grup. Ikon, teks, atau keduanya.'],
    ['aria-pressed="true|false"', 'Wajib. Menentukan tampilan: tertekan berarti `--accent-tint` dengan `--accent-text`, dan ikon berganti ke gaya isi.'],
    ['.toggle-group', 'Membungkus dua toggle atau lebih dalam satu kotak bergaris, tinggi 36 px. `role="group"` (saling lepas) atau `role="radiogroup"` (satu per satu) dengan `aria-label`.'],
    ['aria-label', 'Wajib pada toggle hanya ikon ("Tebal").'],
  ],
  examples: [
    {
      title: 'Sendiri',
      desc: 'Tekan untuk menyematkan dan melepas sematan. Ikon terisi saat menyala.',
      html: `<div class="docs-row">
  <button type="button" class="toggle" aria-pressed="true" ${flip}><span class="ic" aria-hidden="true">keep</span>Disematkan</button>
  <button type="button" class="toggle" aria-pressed="false" aria-label="Tampilkan grid" ${flip}><span class="ic" aria-hidden="true">grid_view</span></button>
</div>`,
      code: `<button type="button" class="toggle" aria-pressed="true"><span class="ic" aria-hidden="true">keep</span>Disematkan</button>
<button type="button" class="toggle" aria-pressed="false" aria-label="Tampilkan grid"><span class="ic" aria-hidden="true">grid_view</span></button>`,
    },
    {
      title: 'Grup saling lepas',
      desc: 'Gaya teks: kombinasi apa pun bisa menyala.',
      html: `<div class="toggle-group" role="group" aria-label="Gaya teks">
  <button type="button" class="toggle" aria-pressed="true" aria-label="Tebal" ${flip}><span class="ic" aria-hidden="true">format_bold</span></button>
  <button type="button" class="toggle" aria-pressed="false" aria-label="Miring" ${flip}><span class="ic" aria-hidden="true">format_italic</span></button>
  <button type="button" class="toggle" aria-pressed="false" aria-label="Garis bawah" ${flip}><span class="ic" aria-hidden="true">format_underlined</span></button>
</div>`,
      code: `<div class="toggle-group" role="group" aria-label="Gaya teks">
  <button type="button" class="toggle" aria-pressed="true" aria-label="Tebal"><span class="ic" aria-hidden="true">format_bold</span></button>
  <button type="button" class="toggle" aria-pressed="false" aria-label="Miring"><span class="ic" aria-hidden="true">format_italic</span></button>
  <button type="button" class="toggle" aria-pressed="false" aria-label="Garis bawah"><span class="ic" aria-hidden="true">format_underlined</span></button>
</div>`,
    },
    {
      title: 'Satu per satu',
      desc: 'Perataan: tepat satu yang menyala. Setiap tombol adalah radio bagi teknologi bantu; `aria-pressed` mengikuti `aria-checked` karena gayanya membaca `aria-pressed`.',
      html: `<div class="toggle-group" role="radiogroup" aria-label="Perataan">
  <button type="button" class="toggle" role="radio" aria-checked="true" aria-pressed="true" aria-label="Rata kiri" ${pick}><span class="ic" aria-hidden="true">format_align_left</span></button>
  <button type="button" class="toggle" role="radio" aria-checked="false" aria-pressed="false" aria-label="Rata tengah" ${pick}><span class="ic" aria-hidden="true">format_align_center</span></button>
  <button type="button" class="toggle" role="radio" aria-checked="false" aria-pressed="false" aria-label="Rata kanan" ${pick}><span class="ic" aria-hidden="true">format_align_right</span></button>
</div>`,
      code: `<div class="toggle-group" role="radiogroup" aria-label="Perataan">
  <button type="button" class="toggle" role="radio" aria-checked="true" aria-pressed="true" aria-label="Rata kiri"><span class="ic" aria-hidden="true">format_align_left</span></button>
  <button type="button" class="toggle" role="radio" aria-checked="false" aria-pressed="false" aria-label="Rata tengah"><span class="ic" aria-hidden="true">format_align_center</span></button>
  <button type="button" class="toggle" role="radio" aria-checked="false" aria-pressed="false" aria-label="Rata kanan"><span class="ic" aria-hidden="true">format_align_right</span></button>
</div>`,
    },
  ],
  variants: [
    ['.toggle', 'Sendiri: tinggi 36 px, radius 10 px.'],
    ['.toggle-group .toggle', 'Dalam grup: tinggi 30 px di dalam padding 3 px (total 36 px, setinggi tombol medium), radius 8 px.'],
  ],
  states: [
    ['aria-pressed="true"', 'Isian `--accent-tint`, warna `--accent-text`, ikon bergaya isi.'],
    ['hover', '`--bg-tint` dan `--text-strong` saat tidak tertekan.'],
    [':active', 'Mengecil ke `scale(0.94)` dalam 90 ms, kembali dengan `--spring-snappy`.'],
    ['disabled', '`disabled`; peredupan bawaan browser berlaku, jadi jelaskan alasannya di dekatnya.'],
  ],
  motion: [
    'Tekan: `scale(0.94)` dengan durasi 90 ms, lepas dengan `--spring-snappy` selama `--d-snappy`.',
    'Isian dan warna tertekan berubah selama `--d-fast` dengan `--ease-standard`; ikon langsung berganti ke font isi. Tidak ada penanda yang bergeser (itu milik [segmented control](segmented-control)).',
    'Dengan reduced motion skalanya menjadi perubahan 120 ms.',
  ],
  a11y: [
    '`<button type="button">` dengan `aria-pressed`. Namanya tetap sama saat tertekan ("Tebal"), jangan pernah "Tebal menyala".',
    'Grup saling lepas: `role="group"` + `aria-label`; setiap toggle dicapai dengan Tab.',
    'Grup satu per satu: `role="radiogroup"` + `aria-label`, tombol `role="radio"` dengan `aria-checked`. Tombol panah seharusnya memindahkan pilihan; ini tidak tersedia bawaan, jadi hubungkan sendiri atau pakai [segmented control](segmented-control) yang sudah memilikinya.',
    'Toggle hanya ikon butuh `aria-label` dan sebaiknya diberi [tooltip](tooltip), idealnya dengan pintasan di `.kbd`.',
  ],
  do: [
    'Pakai toggle untuk mode di toolbar; pakai switch untuk pengaturan.',
    'Pertahankan label yang sama di kedua status; tampilan tertekan yang membawa statusnya.',
    'Sediakan pintasan keyboard untuk toggle format dan tampilkan di tooltip.',
  ],
  dont: [
    'Mengganti label menjadi "Nyala" atau "Mati".',
    'Memakai toggle group sebagai tab halaman atau pengganti tampilan.',
    'Mencampur toggle dan tombol aksi biasa dalam satu `toggle-group`.',
  ],
  js: 'Tidak ada di `lds.js`: setel `aria-pressed` (dan `aria-checked` untuk radio) dari handler klik atau state framework Anda.',
};
