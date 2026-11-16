export default {
  summary: 'Input range bawaan dengan tampilan sistem: lintasan 4 px yang terisi warna aksen sampai thumb 28 px. Untuk nilai pada skala bersambung ketika posisi lebih penting daripada angka pastinya.',
  when: [
    'Mengatur tingkat pada skala: volume, ukuran teks, kecepatan putar, tingkat kesulitan.',
    'Umpan balik saat menyeret lebih penting daripada mengetik nilai pasti (hasilnya langsung terlihat).',
    'Angka berbatas yang nilai pastinya ditampilkan di sampingnya (`.slider-value`).',
  ],
  whenNot: [
    ['Nilai minimum dan maksimum sekaligus', 'range-slider'],
    ['Angka pasti yang diketik orang (jumlah, skor)', 'amount-field'],
    ['Jumlah kecil yang diubah satu per satu (kursi)', 'number-stepper'],
    ['Beberapa tingkat bernama (Mudah, Sedang, Sulit)', 'segmented-control'],
    ['Menampilkan progres atau skor, bukan mengaturnya', 'progress-bar', 'Atau [meter](meter) untuk tingkat terhadap batas'],
    ['Menilai sesuatu dari lima', 'rating'],
  ],
  where: 'Di panel pengaturan dan filter, selebar kolomnya dengan ikon ujung atau nilai di sampingnya (`.slider-row`). Di ponsel beri lebar penuh; thumb adalah target 28 px di dalam input setinggi 28 px dengan ruang di atas dan bawahnya.',
  anatomy: [
    ['.slider-row', 'Baris opsional: ikon atau label di setiap ujung dan slider di antaranya, berjarak 14 px.'],
    ['input.slider[type=range]', 'Wajib. Range bawaan dengan `min`, `max`, `step`, `value`, dan nama (`aria-label` atau `<label>`). JS menjaga `--pct` tetap selaras untuk isiannya.'],
    ['.slider-value', 'Opsional. Nilai saat ini di ujung, angka tabular, rata kanan. Pakai `<output>`.'],
  ],
  examples: [
    {
      title: 'Volume dengan ikon ujung',
      desc: 'Seret, klik lintasannya, atau pakai tombol panah, Page Up, Page Down, Home, dan End.',
      html: `<div class="slider-row" style="max-width: 420px; width: 100%;"><span class="ic" aria-hidden="true">volume_mute</span><input class="slider" type="range" min="0" max="100" value="64" aria-label="Volume"><span class="ic" aria-hidden="true">volume_up</span></div>`,
    },
    {
      title: 'Dengan nilai ditampilkan',
      desc: 'Angka pasti saat angkanya penting. Nilainya diperbarui saat Anda menyeret.',
      html: `<div class="field" style="max-width: 420px; width: 100%;">
  <label class="field__label" for="sl-speed">Kecepatan suara pengumuman antrean</label>
  <div class="slider-row"><input class="slider" id="sl-speed" type="range" min="0.5" max="2" step="0.25" value="1" oninput="document.getElementById('sl-speed-out').textContent = this.value + 'x'"><output class="slider-value" id="sl-speed-out" for="sl-speed">1x</output></div>
</div>`,
    },
  ],
  states: [
    ['dragging (:active)', 'Thumb membesar ke 1.1 (WebKit dan Blink).'],
    ['focus-visible', 'Focus ring 2 px di sekitar thumb dengan celah 3 px (WebKit dan Blink).'],
    ['disabled', '`disabled` bawaan; redupkan barisnya dan sebutkan alasannya di dekatnya.'],
  ],
  motion: [
    'Thumb mengikuti pointer 1:1; isiannya adalah titik gradien di `--pct`, diperbarui di setiap event `input`, jadi tidak pernah tertinggal.',
    'Tekan: thumb berskala 1.1 dengan `--spring-snappy` (360 ms) dan kembali saat dilepas.',
    'Nilai yang langsung dipratinjau (volume, ukuran teks) sebaiknya berlaku saat `input`; yang mahal (filter pencarian) saat `change`.',
    'Reduced motion: skala tekan menjadi perubahan 120 ms linear.',
  ],
  a11y: [
    '`<input type="range">` bawaan: tombol panah melangkah, Page Up dan Page Down melompat, Home dan End ke ujung; pembaca layar mengumumkan nilainya.',
    'Namai dengan `<label for>` atau `aria-label`. Jika angkanya saja kurang jelas, setel `aria-valuetext` ("kecepatan 1,25 kali").',
    'Ikon ujung bersifat dekoratif (`aria-hidden`); `<output for>` menampilkan nilainya secara terlihat.',
    'Firefox tidak menampilkan focus ring pada slider ini: sistem menghapus outline dan hanya memberi gaya focus ring pada thumb WebKit. Periksa fokus keyboard di sana.',
  ],
  do: [
    'Tampilkan nilainya saat orang butuh angka pasti.',
    'Pilih `step` yang sesuai dengan perbedaan yang bisa dirasakan orang.',
  ],
  dont: [
    'Memakai slider untuk nilai yang harus tepat; berikan kolom isian.',
    'Mengubah gaya lintasan atau thumb; tampilannya bagian dari sistem.',
  ],
  js: 'Otomatis untuk setiap `input.slider`: menjaga isian `--pct` tetap selaras saat `input` (Firefox memakai `::-moz-range-progress` sendiri). Perbarui `.slider-value` sendiri.',
};
