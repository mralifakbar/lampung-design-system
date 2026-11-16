export default {
  summary: 'Yang ditampilkan sebuah area saat belum ada isinya: ikon, alasan kosongnya, dan satu aksi yang mengisinya.',
  when: [
    'Daftar, tabel atau bagian dasbor sudah dimuat dan tidak ada item: belum ada permohonan, tidak ada tagihan minggu ini.',
    'Pencarian atau filter tidak menemukan apa pun di halaman hasil penuh (sebutkan apa yang perlu diubah).',
    'Layar pertama sebelum orang membuat apa pun.',
  ],
  whenNot: [
    ['Data masih dimuat', 'skeleton'],
    ['Pemuatan gagal', 'alert', 'Pakai alert danger dengan tombol coba lagi, seperti pada data state error'],
    ['Tidak ada hasil di dalam command palette', 'command-palette', 'Pakai `.cmdk__empty`'],
    ['Tidak ada hasil saat mengetik di combobox', 'combobox', 'Pakai `.select__empty`'],
    ['Langkah berikutnya tingkat dasbor untuk akun baru', 'spotlight'],
  ],
  where: 'Di tempat yang semestinya diisi konten: di dalam card, area list atau kotak tabel, di tengah. Ia menggantikan konten, bukan page header atau filter, jadi orang masih bisa mengubah filter. Di ponsel tetap bertumpuk di tengah.',
  anatomy: [
    ['.empty', 'Wajib. Kolom di tengah dengan padding 32/24 px dan jarak 6 px.'],
    ['.empty__icon > .ic', 'Kotak membulat 56 px dengan garis tipis dan ikon 28 px yang menyebut jenis kontennya.'],
    ['.empty__title', 'Wajib. Kenapa kosong, sebagai fakta ("Tidak ada tagihan minggu ini").'],
    ['.empty__body', 'Satu kalimat: apa yang akan muncul di sini, atau apa yang perlu diubah. Lebar maksimal 280 px.'],
    ['.btn', 'Satu aksi yang mengisinya. Sekunder secara bawaan; primer hanya di layar pertama.'],
  ],
  examples: [
    {
      title: 'Belum ada isi',
      desc: 'Sebutkan alasannya dan apa yang akan muncul. Aksinya mengarah ke tempat yang berguna.',
      html: `<div class="card" style="max-width: 420px; width: 100%;">
  <div class="empty"><div class="empty__icon"><span class="ic" aria-hidden="true">event_available</span></div><div class="empty__title">Tidak ada jadwal minggu ini</div><div class="empty__body">Jadwal posyandu muncul di sini begitu puskesmas mengumumkannya.</div><button class="btn btn--secondary btn--md">Buka kalender lengkap</button></div>
</div>`,
    },
    {
      title: 'Pertama kali',
      desc: 'Aksi primer boleh dipakai di sini karena hanya itu yang bisa dilakukan.',
      html: `<div class="card" style="max-width: 420px; width: 100%;">
  <div class="empty"><div class="empty__icon"><span class="ic" aria-hidden="true">menu_book</span></div><div class="empty__title">Belum ada permohonan izin</div><div class="empty__body">Pilih jenis usaha dan lokasinya, lalu kami tampilkan dokumen yang perlu disiapkan.</div><button class="btn btn--primary btn--md"><span class="ic" aria-hidden="true">add</span>Buat permohonan izin</button></div>
</div>`,
    },
    {
      title: 'Tidak ada hasil',
      desc: 'Sebut kata pencariannya dan tawarkan jalan keluar.',
      html: `<div class="card" style="max-width: 420px; width: 100%;">
  <div class="empty" role="status"><div class="empty__icon"><span class="ic" aria-hidden="true">search</span></div><div class="empty__title">Tidak ada layanan yang cocok dengan "akte kelahran"</div><div class="empty__body">Periksa ejaannya atau hapus filter untuk melihat semua layanan.</div><button class="btn btn--secondary btn--md">Hapus filter</button></div>
</div>`,
    },
  ],
  states: [
    ['first run', 'Menjelaskan manfaatnya dan menawarkan aksi primer.'],
    ['cleared', 'Setelah orang menyelesaikan semuanya ("Semua sudah beres"); sering tanpa aksi sama sekali.'],
    ['no results', 'Mengulang kata pencarian dan menawarkan untuk menghapus filter; `role="status"` jika muncul setelah mengetik.'],
  ],
  motion: [
    'Tampil tanpa animasi masuk saat halaman dimuat. Saat menggantikan konten di tempat (item terakhir dihapus), cross-fade selama `--d-standard` (240 ms) dengan `--ease-standard`.',
    'Tanpa ilustrasi berulang, tanpa ikon memantul.',
  ],
  a11y: [
    'Ikon hanya dekorasi (`aria-hidden="true"`).',
    'Judul berupa teks biasa, bukan heading, kecuali area itu tidak punya heading lain.',
    'Jika muncul sebagai tanggapan atas pencarian atau filter, beri `role="status"` agar hasilnya diumumkan.',
    'Tombol menyebut hasilnya ("Buat permohonan izin", bukan "Mulai").',
  ],
  do: [
    'Sebutkan alasan kosongnya di judul, dan apa yang akan muncul di isi.',
    'Tawarkan tepat satu aksi, atau tidak sama sekali jika tidak ada yang membantu.',
    'Biarkan page header dan filter tetap terlihat di atasnya.',
  ],
  dont: [
    'Memakai empty state saat data masih dimuat.',
    'Menambah ilustrasi buatan atau lelucon.',
    'Menawarkan beberapa aksi; pilih satu yang mengisi area itu.',
  ],
};
