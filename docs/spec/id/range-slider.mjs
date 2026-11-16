export default {
  summary: 'Dua thumb pada satu lintasan untuk nilai minimum dan maksimum, dengan isian aksen di antaranya. Kedua thumb tidak pernah bisa bersilangan; masing-masing adalah input range bawaan.',
  when: [
    'Menyaring berdasarkan rentang: harga dari dan sampai, usia, skor di antara, durasi.',
    'Kedua ujung penting dan posisi perkiraan sudah cukup saat menelusuri.',
  ],
  whenNot: [
    ['Satu nilai pada skala', 'slider'],
    ['Batas pasti yang diketik orang (pembayaran di antara dua jumlah)', 'amount-field', 'Dua amount field di dalam `.form__row`'],
    ['Rentang tanggal', 'calendar', 'Kalender mendukung rentang dengan hari `.is-range`'],
    ['Beberapa kelompok tetap (Di bawah 50 rb, 50 rb sampai 100 rb, Di atas 100 rb)', 'chips'],
  ],
  where: 'Di panel filter ([drawer](drawer) di layar lebar, [sheet](sheet) di ponsel), selebar panel, dengan rentang saat ini ditampilkan di baris label di atasnya.',
  anatomy: [
    ['.range', 'Wajib. Kotak berposisi setinggi 28 px dengan `data-lds-range`.'],
    ['.range__track', 'Wajib. Lintasan abu-abu 4 px.'],
    ['.range__fill', 'Wajib. Isian aksen di dalam lintasan; JS menyetel kiri dan kanannya.'],
    ['input[type=range] (two)', 'Wajib. Thumb bawah dan atas dengan `min`, `max`, dan `step` yang sama, masing-masing dengan `aria-label` sendiri. Hanya thumb yang menerima event pointer.'],
  ],
  examples: [
    {
      title: 'Usia peserta',
      desc: 'Seret salah satu thumb, atau Tab ke sana dan pakai tombol panah. Thumb bawah berhenti satu langkah di bawah thumb atas.',
      html: `<div class="field" style="max-width: 420px; width: 100%;">
  <span class="field__label">Usia peserta <span id="rs-credits">16 sampai 21</span></span>
  <div class="range" data-lds-range oninput="const [lo, hi] = this.querySelectorAll('input'); document.getElementById('rs-credits').textContent = lo.value + ' sampai ' + hi.value;">
    <div class="range__track"><div class="range__fill"></div></div>
    <input type="range" min="12" max="24" value="16" aria-label="Usia minimum">
    <input type="range" min="12" max="24" value="21" aria-label="Usia maksimum">
  </div>
</div>`,
    },
    {
      title: 'Filter harga',
      desc: 'Langkah lebih besar untuk uang; label menampilkan nilai yang sudah diformat.',
      html: `<div class="field" style="max-width: 420px; width: 100%;">
  <span class="field__label">Harga <span id="rs-price">Rp 50.000 sampai Rp 250.000</span></span>
  <div class="range" data-lds-range oninput="const [lo, hi] = this.querySelectorAll('input'), f = (v) => 'Rp ' + Number(v).toLocaleString('id-ID'); document.getElementById('rs-price').textContent = f(lo.value) + ' sampai ' + f(hi.value);">
    <div class="range__track"><div class="range__fill"></div></div>
    <input type="range" min="0" max="500000" step="25000" value="50000" aria-label="Harga minimum">
    <input type="range" min="0" max="500000" step="25000" value="250000" aria-label="Harga maksimum">
  </div>
</div>`,
    },
  ],
  states: [
    ['dragging', 'Thumb yang ditahan membesar ke 1.1 (WebKit dan Blink).'],
    ['focus-visible', 'Focus ring di sekitar thumb yang difokus (WebKit dan Blink).'],
    ['touching values', 'Saat thumb bawah akan mencapai thumb atas, JS mendorongnya kembali satu langkah (dan sebaliknya).'],
  ],
  motion: [
    'Thumb mengikuti pointer 1:1; isian diperbarui di setiap event `input`.',
    'Tekan: thumb berskala 1.1 dengan `--spring-snappy` (360 ms).',
    'Terapkan filter saat `lds:change` dengan jeda singkat, atau saat dilepas, agar hasil tidak berkedip selama menyeret.',
    'Reduced motion: skala tekan menjadi 120 ms linear.',
  ],
  a11y: [
    'Dua input range bawaan: masing-masing bisa difokus, dioperasikan dengan keyboard, dan diumumkan dengan `aria-label` sendiri ("Usia minimum", "Usia maksimum").',
    'Tampilkan rentang saat ini sebagai teks (di baris label) agar terlihat dan terbaca tanpa menyeret.',
    'Seperti [slider](slider) tunggal, Firefox tidak menampilkan focus ring pada thumb; periksa fokus keyboard di sana.',
  ],
  do: [
    'Mulai dari rentang penuh atau rentang yang paling umum.',
    'Labeli rentang dengan kata yang dipakai orang ("16 sampai 21").',
  ],
  dont: [
    'Memakai dua slider terpisah untuk minimum dan maksimum.',
    'Menyembunyikan nilainya; menyeret ke angka yang tidak diketahui sama dengan menebak.',
  ],
  js: '`data-lds-range` pada `.range`: memosisikan `.range__fill` di antara thumb, menjaga thumb bawah satu langkah di bawah thumb atas, dan memicu `lds:change` dengan `{ min, max }`. Teks nilainya adalah tugas Anda.',
};
