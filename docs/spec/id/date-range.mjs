const picker = (id, align = 'right') => `<div class="daterange" data-lds-daterange data-start="2026-10-18" data-end="2026-11-16" data-today="2026-11-16">
  <button class="btn btn--secondary btn--md daterange__trigger" aria-haspopup="dialog" aria-expanded="false" data-lds-menu="${id}"><span class="ic" aria-hidden="true">calendar_month</span><span class="daterange__label">18 Okt sampai 16 Nov 2026</span><span class="ic" aria-hidden="true">expand_more</span></button>
  <div class="popover daterange__pop" id="${id}" role="dialog" aria-label="Pilih tanggal"${align === 'left' ? ' style="left: 0; right: auto;"' : ''}></div>
</div>`;

export default {
  summary: 'Tombol yang menampilkan rentang saat ini dan membuka pilihan siap di samping kalender dua bulan (satu bulan di ponsel). Pilihan siap langsung berlaku; memilih tanggal awal menampilkan pratinjau rentang saat Anda bergerak, memilih tanggal akhir menunggu Terapkan.',
  when: [
    'Periode dasbor, laporan, atau ekspor: 30 hari terakhir, bulan ini, rentang khusus.',
    'Menyaring catatan berdasarkan waktu kejadiannya: permohonan di antara dua tanggal, pendaftaran kuartal ini.',
  ],
  whenNot: [
    ['Satu tanggal di formulir', 'date-field'],
    ['Memilih hari ketika melihat minggunya penting dan kalendernya adalah halaman itu sendiri', 'calendar'],
    ['Hanya dua sampai lima periode tetap (7 hari, 30 hari, 90 hari)', 'segmented-control', 'Lebih cepat daripada membuka pemilih'],
  ],
  where: 'Di aksi header halaman atau toolbar, biasanya di akhir baris; popover-nya terbuka di bawahnya dan menjaga dirinya tetap di layar. Di bawah 720 px pilihan siap menjadi baris pil yang menggulir di atas satu bulan.',
  anatomy: [
    ['.daterange[data-lds-daterange]', 'Wajib. `data-start`, `data-end` (tanggal ISO); `data-today` untuk contoh tetap; `data-locale`.'],
    ['.btn.daterange__trigger', 'Wajib. Pemicu dengan `data-lds-menu` yang menunjuk ke popover: ikon `calendar_month`, `.daterange__label`, dan `expand_more`.'],
    ['.popover.daterange__pop', 'Wajib. Popover `role="dialog"` kosong; hook mengisinya dengan `.daterange__presets`, `.daterange__months` (dua [kalender](calendar)), dan `.daterange__foot` (ringkasan rentang, Batal, Terapkan).'],
  ],
  examples: [
    {
      title: 'Periode laporan',
      desc: 'Buka: pilih pilihan siap untuk langsung menerapkannya, atau pilih hari pertama, gerakkan di atas kalender untuk melihat rentangnya, pilih hari terakhir lalu Terapkan. Hari setelah hari ini tidak tersedia.',
      html: picker('dr-1'),
    },
  ],
  states: [
    ['picking', 'Setelah hari pertama: ujung yang disorot atau difokus menampilkan pratinjau rentang dengan warna tenang, ringkasan berbunyi "Pilih hari terakhir", dan Terapkan menunggu.'],
    ['range', 'Kedua ujung terisi, hari di antaranya berwarna aksen tipis (`.is-range`).'],
    ['preset on', 'Pilihan siap yang cocok dengan rentang tampil tertekan.'],
    ['future days', 'Redup dan nonaktif.'],
  ],
  motion: [
    'Popover terbuka seperti popover lainnya: dari sudut pemicunya dengan `--spring-smooth`, keluar dengan `--ease-exit`.',
    'Warna hari berubah perlahan selama `--d-fast` dan mengecil ke 0.88 saat ditekan, kembali dengan `--spring-snappy`.',
  ],
  a11y: [
    'Pemicu menyebut rentangnya dalam kata dan punya `aria-haspopup="dialog"` serta `aria-expanded`.',
    'Setiap hari adalah tombol berlabel tanggal lengkap; tombol panah berpindah per hari dan per minggu melintasi kedua bulan (dan berganti bulan bila perlu), Enter atau Spasi memilih.',
    'Escape dan klik di luar menutup tanpa mengubah rentang; Terapkan dan pilihan siap mengembalikan fokus ke pemicu dan rentang baru diumumkan.',
  ],
  do: [
    'Mulai dengan bawaan yang masuk akal (30 hari terakhir) dan tampilkan di pemicu.',
    'Kirim permintaan data Anda saat `lds:change`, bukan di setiap pilihan.',
  ],
  dont: [
    'Memaksa orang memilih kedua ujung untuk rentang yang umum; tawarkan sebagai pilihan siap.',
    'Mengizinkan hari di masa depan untuk data yang belum mungkin ada.',
  ],
  js: '`data-lds-daterange` menghubungkannya (atau panggil `dateRange(el)`), memakai hook menu untuk membuka dan menutup. Ia memicu `lds:change` dengan `{ start, end }` (tanggal ISO). Handle-nya punya `start`, `end`, dan `set(start, end)`.',
};
