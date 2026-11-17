const rd = (name, text, sub, checked, extra = '') => `<label class="check"><input type="radio" name="${name}"${checked ? ' checked' : ''}${extra}><span class="radio__dot" aria-hidden="true"></span><span class="check__text">${text}${sub ? `<small>${sub}</small>` : ''}</span></label>`;

export default {
  summary: 'Radio button bawaan untuk tepat satu pilihan dari dua sampai lima opsi yang semuanya harus terlihat. Titiknya memantul masuk; tombol panah berpindah antaropsi.',
  when: [
    'Satu jawaban dari daftar pendek ketika melihat setiap opsi membantu: cara pengiriman, sesi layanan, jawaban survei kepuasan.',
    'Opsi saling meniadakan dan masing-masing butuh satu kata atau satu baris penjelasan.',
  ],
  whenNot: [
    ['Setiap opsi adalah pilihan yang lebih kaya dengan deskripsi, harga, atau badge (paket, layanan)', 'radio-card'],
    ['Lebih dari sekitar lima opsi, atau ruangnya sempit', 'select'],
    ['Daftar panjang yang dicari dengan mengetik', 'combobox'],
    ['Mengganti tampilan atau pengaturan yang langsung berlaku (Hari, Minggu, Bulan)', 'segmented-control'],
    ['Beberapa opsi bisa menyala sekaligus', 'checkbox'],
    ['Satu pengaturan nyala dan mati', 'switch'],
  ],
  where: 'Di [formulir](form-layout), bertumpuk dalam kolom berjarak 12 px di dalam `<fieldset>` dengan `<legend>` yang mengajukan pertanyaannya. Dua opsi pendek boleh berdampingan di layar lebar; tumpuk di ponsel.',
  anatomy: [
    ['fieldset + legend', 'Wajib. Pertanyaannya ("Ke mana hasilnya dikirim?").'],
    ['label.check', 'Wajib. Satu opsi; seluruh baris adalah area sentuh.'],
    ['input[type=radio][name]', 'Wajib. Radio bawaan, tak terlihat di atas titik; satu `name` bersama per kelompok.'],
    ['.radio__dot', 'Wajib. Lingkaran 22 px; saat dipilih terisi warna aksen dengan titik putih 8 px. `aria-hidden`.'],
    ['.check__text', 'Wajib. Teks opsi; `small` di dalamnya menambahkan baris kedua.'],
  ],
  examples: [
    {
      title: 'Cara pengiriman',
      desc: 'Klik sebuah opsi atau fokuskan kelompoknya lalu pakai tombol panah. Titik memantul masuk; titik lama mengecil keluar lebih cepat.',
      html: `<fieldset class="stack" style="border: 0;">
  <legend class="field__label" style="margin-bottom: 12px;">Ke mana hasilnya dikirim?</legend>
  ${rd('rd-del', 'Email', 'siti@contoh.id', true)}
  ${rd('rd-del', 'Notifikasi aplikasi', 'Di ponsel yang Anda pakai untuk masuk')}
  ${rd('rd-del', 'Keduanya', '')}
</fieldset>`,
    },
    {
      title: 'Sesi layanan',
      desc: 'Pilihan sesi adalah radio: satu jawaban, semua terlihat, ramah keyboard. Sesi yang penuh nonaktif dan tetap terbaca.',
      html: `<fieldset class="stack" style="border: 0; max-width: 520px;">
  <legend class="field__label" style="margin-bottom: 12px;">Sesi mana untuk perekaman KTP elektronik di Kantor Kecamatan Kedaton?</legend>
  ${rd('rd-q', 'Senin, 08.00', '')}
  ${rd('rd-q', 'Senin, 10.00', '')}
  ${rd('rd-q', 'Selasa, 08.00', '', true)}
  ${rd('rd-q', 'Selasa, 10.00', 'Penuh', false, ' disabled')}
</fieldset>`,
    },
  ],
  states: [
    ['checked', 'Isian aksen dengan tampilan primary; titik tengah putih.'],
    ['hover', 'Tepi menggelap ke `--text-subtle`.'],
    [':active', 'Titik mengecil ke 0.88 dalam 90 ms.'],
    ['focus-visible', 'Focus ring di sekitar titik.'],
    ['disabled', '`disabled` bawaan; beri gaya teksnya sendiri hanya jika perlu. Sebutkan alasannya di baris kedua.'],
  ],
  motion: [
    'Memilih: titik tengah berskala 0 ke 1 dengan `--spring-snappy` (360 ms); isian dan tepi berubah dalam `--d-fast` (160 ms). Opsi sebelumnya mengecilkan titiknya dalam `--d-exit` (180 ms) dengan `--ease-exit`, sehingga pilihan lama hilang sebelum yang baru mendarat.',
    'Tekan: `scale(0.88)` dalam 90 ms, kembali dengan `--spring-snappy`.',
    'Reduced motion: transisi menjadi 120 ms linear.',
  ],
  a11y: [
    '`<input type="radio">` sungguhan dengan `name` bersama: Tab masuk ke kelompok pada opsi terpilih, tombol panah berpindah dan memilih, Spasi memilih.',
    'Bungkus kelompok dengan `<fieldset>` dan `<legend>`; pertanyaannya dibacakan bersama setiap opsi.',
    'Pilihkan bawaan yang masuk akal jika ada, agar kelompok tidak pernah kosong tanpa alasan; jika tidak, validasi dengan pesan galat di bawah kelompok.',
  ],
  do: [
    'Urutkan opsi secara logis (frekuensi, ukuran, waktu).',
    'Buat label pendek dan sejajar; taruh detail di baris `small`.',
  ],
  dont: [
    'Memakai radio untuk lebih dari sekitar lima opsi.',
    'Membuat radio tunggal; satu pilihan yang bisa dibatalkan adalah [checkbox](checkbox).',
    'Menata beberapa radio dalam baris yang turun baris di ponsel.',
  ],
};
