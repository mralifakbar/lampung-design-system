export default {
  summary: 'Angka yang setiap digitnya bergeser ke nilai barunya dengan spring yang halus, seperti odometer. Untuk hitungan yang berubah saat orang sedang melihatnya.',
  when: [
    'Hitungan yang berubah di depan orang: suka, nomor antrean terambil, nilai stepper, kursi bus kota yang dipesan.',
    'Angka langsung yang naik atau turun selama halaman terbuka.',
  ],
  whenNot: [
    ['Angka yang menghitung naik dari nol sekali saat pertama muncul', 'number-count'],
    ['Hitung mundur ke tenggat', 'timer'],
    ['Angka statis', 'stat-row', 'Tulis sebagai teks dengan angka tabular'],
    ['Angka yang diketik atau dinaik-turunkan orang', 'number-stepper', 'Stepper sudah memakai rolling number untuk nilainya'],
  ],
  where: 'Sebaris di dalam teks atau kontrol pemilik angka itu: tombol suka, stepper, nilai statistik, badge antrean. Mewarisi font, ukuran, dan warna dari induknya.',
  anatomy: [
    ['.roll', 'Wajib. Kotak sebaris setinggi 1,2 em yang memotong kolomnya. Angka tabular.'],
    ['[data-lds-roll]', 'Nilai awal. `init()` membangun kolom darinya.'],
    ['.roll__col', 'Satu kolom per digit berisi digit 0 sampai 9, digeser dengan `transform`. Dibangun oleh JS; `aria-hidden`.'],
  ],
  examples: [
    {
      title: 'Nomor antrean terambil',
      desc: 'Tiket antrean yang terambil hari ini di loket layanan kecamatan. Setiap digit bergeser ke tempat barunya. Tekan tombolnya.',
      html: `<div class="docs-row" style="gap: 20px;">
  <span style="font: 600 40px/1 var(--font); letter-spacing: -0.03em; color: var(--text-strong);"><span class="roll" id="rn" role="img" data-lds-roll="128"></span></span>
  <button class="btn btn--secondary btn--sm" onclick="const el = document.getElementById('rn'); import('../../js/lds.js').then((m) => m.setRoll(el, Number(el.getAttribute('aria-label')) + 1));"><span class="ic" aria-hidden="true">add</span>Tambah satu</button>
  <button class="btn btn--secondary btn--sm" onclick="const el = document.getElementById('rn'); import('../../js/lds.js').then((m) => m.setRoll(el, Number(el.getAttribute('aria-label')) + 47));">Tambah 47</button>
</div>`,
      code: `<span class="roll" role="img" data-lds-roll="128"></span>
<script type="module">
  import { setRoll } from 'lampung-design-system/js';
  setRoll(document.querySelector('.roll'), 129);
</script>`,
    },
    {
      title: 'Di dalam kontrol',
      desc: 'Tombol suka menggulirkan hitungannya; stepper menggulirkan nilainya.',
      html: `<button class="like" aria-pressed="false" data-lds-like aria-label="Suka"><span class="like__heart"><span class="ic" aria-hidden="true">favorite</span></span><span class="roll" data-lds-roll="24"></span></button>`,
    },
  ],
  states: [
    ['value', '`setRoll(el, value)` memasang `aria-label`, menambah atau menghapus kolom, dan menggeser masing-masing ke digitnya.'],
  ],
  motion: [
    'Setiap kolom bergerak dengan `transform: translateY()` memakai `--spring-smooth` (`--d-smooth`, 560 ms), jadi 128 ke 175 menggulirkan puluhan dan satuan bersamaan sementara ratusan diam.',
    'Ini transition: nilai baru di tengah gulir mengarah ulang dari posisi digit saat itu.',
    'Kolom yang ditambah atau dihapus (99 ke 100) muncul dan hilang seketika.',
    'Reduced motion: perubahan linear 120 ms.',
  ],
  a11y: [
    'Kolomnya `aria-hidden`; `setRoll` menulis nilainya ke `aria-label` pada `.roll`. `span` biasa berlabel tidak dibaca semua pembaca layar, jadi beri `.roll` `role="img"` bila berdiri sendiri, atau andalkan label kontrol di sekitarnya.',
    'Jangan jadikan live region. Bila perubahannya penting, umumkan sekali di baris `role="status"` ("129 kursi terisi").',
  ],
  do: [
    'Pakai untuk hitungan yang berubah di depan mata, bukan untuk setiap angka di halaman.',
    'Biarkan ukuran dan ketebalannya mewarisi teks di sekitarnya.',
  ],
  dont: [
    'Memberikan pemisah ribuan, tanda, atau desimal: yang digulir hanya digit. Format "1.280" atau "-3" sebagai teks.',
    'Menggulirkan angka saat halaman pertama dimuat; pakai [number count](number-count) sekali, atau tidak sama sekali.',
  ],
  js: '`data-lds-roll="128"` membangun kolom saat `init()`. `setRoll(el, value)` menggulir ke nilai baru (hanya digit 0 sampai 9).',
};
