export default {
  summary: 'Kolom untuk beberapa kalimat: kotak `.control` yang sama, lebih tinggi, dengan penghitung karakter opsional. Sebutkan batasnya sebelum orang mencapainya.',
  when: [
    'Orang menulis lebih dari satu baris: catatan untuk petugas, alasan permohonan, laporan kesalahan data.',
    'Kolom punya batas karakter dan orang perlu melihat sisa ruangnya (`.counter`).',
  ],
  whenNot: [
    ['Satu baris pendek (nama, judul, email)', 'text-field'],
    ['Menulis pesan chat yang terkirim saat Enter', 'composer'],
    ['Konten panjang berformat (artikel, panduan layanan)', 'prose', 'Pakai editor sungguhan; textarea hanya teks biasa'],
    ['Menyunting nilai pendek di tempat di dalam daftar atau tabel', 'inline-edit'],
    ['Beberapa item pendek seperti topik atau email', 'tag-input'],
  ],
  where: 'Di [formulir](form-layout), biasanya terakhir sebelum tombol, selebar kolom formulir. Di [dialog](dialog) atau [modal](modal) untuk alur seperti "laporkan kesalahan".',
  anatomy: [
    ['.field / .field__label / .field__help', 'Wajib. Pembungkus yang sama dengan [text field](text-field).'],
    ['.control.control--area', 'Wajib. Kotak tumbuh sesuai tinggi isinya, padding 12 kali 14.'],
    ['textarea', 'Wajib. Tinggi minimal 88 px (sekitar 3 baris), tinggi baris 22 px, tidak bisa diubah ukurannya dengan menyeret. Setel `rows` untuk awal yang lebih tinggi.'],
    ['.counter', 'Opsional. "120 / 280" tabular di dalam span label, rata kanan oleh label.'],
  ],
  examples: [
    {
      title: 'Dengan penghitung',
      desc: 'Penghitung berada di baris label, jadi tidak pernah menggeser teks bantuan. Dengan `maxlength` browser menghentikan input di batasnya, jadi penghitung tidak butuh status melebihi batas.',
      html: `<div class="field" style="max-width: 520px;">
  <label class="field__label" for="ta-note">Catatan untuk petugas <span class="counter" id="ta-note-count">0 / 280</span></label>
  <div class="control control--area"><textarea id="ta-note" maxlength="280" placeholder="Apa yang ingin Anda sampaikan?" aria-describedby="ta-note-help ta-note-count"
    oninput="document.getElementById('ta-note-count').textContent = this.value.length + ' / 280'"></textarea></div>
  <span class="field__help" id="ta-note-help">Petugas membaca catatan ini sebelum memproses permohonan.</span>
</div>`,
      code: `<div class="field">
  <label class="field__label" for="note">Catatan untuk petugas <span class="counter" id="note-count">0 / 280</span></label>
  <div class="control control--area">
    <textarea id="note" maxlength="280" aria-describedby="note-help note-count"></textarea>
  </div>
  <span class="field__help" id="note-help">Petugas membaca catatan ini sebelum memproses permohonan.</span>
</div>
<!-- Update #note-count on input in your own code. -->`,
    },
    {
      title: 'Alasan wajib dengan galat',
      desc: 'Laporan butuh alasan; teks bantuan menjelaskan detail seperti apa yang membantu.',
      html: `<div class="field" style="max-width: 520px;">
  <label class="field__label" for="ta-why">Apa yang salah pada data ini?</label>
  <div class="control control--area is-invalid"><textarea id="ta-why" rows="4" aria-invalid="true" aria-describedby="ta-why-help"></textarea></div>
  <span class="field__help field__help--error" id="ta-why-help"><span class="ic" aria-hidden="true">error</span>Jelaskan kesalahannya, misalnya bagian mana yang keliru dan seharusnya apa.</span>
</div>`,
    },
  ],
  states: [
    ['focus / hover', 'Seperti [text field](text-field): tepi aksen dan halo saat `:focus-within`.'],
    ['.is-invalid + aria-invalid', 'Tepi dan halo danger; pesan di `.field__help--error`.'],
    ['.is-disabled + disabled', 'Latar berisi dan teks redup.'],
  ],
  motion: [
    'Garis tepi dan halo bertransisi dalam `--d-fast` (160 ms) dengan `--ease-standard`, seperti setiap `.control`.',
    'Penghitung berganti angka di tempat; tidak dianimasikan.',
    'Reduced motion: transisi menjadi 120 ms linear.',
  ],
  a11y: [
    '`<label for>` menamainya; teks bantuan dan penghitung sama-sama ada di `aria-describedby` agar batasnya diumumkan.',
    'Utamakan `maxlength` (browser menghentikan input) dan sebutkan batasnya di awal; jika Anda mengizinkan melebihi batas dan memblokir saat dikirim, tandai `aria-invalid` dan sebutkan berapa karakter yang harus dihapus.',
    'Enter membuat baris baru. Jangan pernah mengirim textarea saat Enter; itu pola [composer](composer).',
    'Teks tampil 16 px di layar sentuh, agar iOS tidak memperbesar saat fokus.',
  ],
  do: [
    'Mulai dengan tinggi jawaban yang diharapkan (`rows="4"` untuk satu paragraf).',
    'Tampilkan penghitung hanya jika ada batas yang perlu diketahui.',
  ],
  dont: [
    'Mengizinkan pegangan seret bawaan atau menyetel tinggi tetap yang sangat kecil; ukuran kotak ditentukan oleh rows.',
    'Memakai textarea untuk satu nilai yang diharapkan muat dalam satu baris.',
  ],
  js: 'Tidak ada. Perbarui teks `.counter` saat `input` di kode Anda sendiri.',
};
