export default {
  summary: 'Pil merah kecil berisi jumlah hal yang menunggu orang: pesan belum dibaca, permohonan tertunda. Artinya "tindak lanjuti ini", jadi pakai hanya untuk itu.',
  when: [
    'Item belum dibaca atau tertunda yang menunggu orang: 3 pesan baru, 2 permohonan untuk disetujui.',
    'Di ujung baris navigasi atau baris pengaturan yang mengarah ke item-item itu.',
  ],
  whenNot: [
    ['Jumlah di dalam label tab', 'tabs', 'Pakai `.tabs__count`, yang berwarna abu-abu tenang'],
    ['Jumlah di dalam heading bagian app shell', 'app-shell'],
    ['Status atau jenis dalam kata-kata', 'badge'],
    ['Status sistem atau koneksi', 'status-dot'],
    ['Angka kunci di halaman (kuota, skor)', 'stat-row'],
  ],
  where: 'Di ujung baris atau kontrol yang mengarah ke item, sebelum chevron. Di baris navigasi, item sidebar atau item menu. Satu count per tujuan; jangan pernah di konten itu sendiri.',
  anatomy: [
    ['.count', 'Wajib. Pil 18 px, isian danger, angka tabular semibold 11 px putih, lebar minimal 18 px sehingga satu digit berbentuk lingkaran.'],
    ['.sr-only', 'Disarankan. Kata-kata tersembunyi yang menyebut apa yang dihitung.'],
  ],
  examples: [
    {
      title: 'Di baris navigasi',
      desc: 'Count ada sebelum chevron. Batasi sampai 99+.',
      html: `<div class="list" style="max-width: 420px;">
  <a class="lrow lrow--icon" href="#messages"><span class="lrow__icon" style="background: var(--tile-blue);"><span class="ic" aria-hidden="true">chat</span></span><span class="lrow__body"><span class="lrow__title">Pesan</span></span><span class="count">3<span class="sr-only"> belum dibaca</span></span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></a>
  <a class="lrow lrow--icon" href="#requests"><span class="lrow__icon" style="background: var(--tile-orange);"><span class="ic" aria-hidden="true">person_add</span></span><span class="lrow__body"><span class="lrow__title">Permohonan pendaftaran</span></span><span class="count">99+<span class="sr-only"> menunggu</span></span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></a>
  <a class="lrow lrow--icon" href="#notifications"><span class="lrow__icon" style="background: var(--tile-red);"><span class="ic" aria-hidden="true">notifications</span></span><span class="lrow__body"><span class="lrow__title">Notifikasi</span></span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></a>
</div>`,
    },
    {
      title: 'Di samping label',
      desc: 'Di dalam wadah flex (tombol, baris) pil mempertahankan bentuknya.',
      html: `<div class="docs-row">
  <button class="btn btn--gray btn--md">Kotak masuk<span class="count">12<span class="sr-only"> belum dibaca</span></span></button>
</div>`,
    },
  ],
  states: [
    ['zero', 'Hapus count sepenuhnya; jangan pernah tampilkan "0".'],
    ['over 99', 'Tulis "99+".'],
  ],
  motion: [
    'Tidak ada saat diam. Saat angka berubah ketika terlihat, [rolling number](rolling-number) bisa menggeser digit dengan `--spring-smooth`; count yang muncul dari nol boleh meletup masuk sekali dengan `lds-pop-in` selama `--d-snappy`.',
    'Jangan pernah membuat count berdenyut atau memantul untuk menarik perhatian.',
  ],
  a11y: [
    'Angka tanpa konteks tidak bermakna: tambahkan kata tersembunyi di dalamnya (`<span class="sr-only"> belum dibaca</span>`) atau sertakan di nama aksesibel baris.',
    'Saat count bertambah ketika orang berada di halaman, umumkan secara sopan hanya jika penting (baris `role="status"` "2 pesan baru"); jangan jadikan count itu sendiri live region.',
    'Merah bukan satu-satunya sinyal; angka dan kata-kata yang membawanya.',
  ],
  do: [
    'Pakai hanya untuk hal yang menunggu orang.',
    'Hapus begitu orang sudah melihat item-itemnya.',
    'Letakkan di dalam induk flex (baris, tombol) agar bentuk pilnya terjaga.',
  ],
  dont: [
    'Memakainya untuk total ("42 layanan"); tulis totalnya sebagai teks.',
    'Menampilkan count di lebih dari dua atau tiga tujuan sekaligus.',
    'Memakainya sebagai titik tanpa angka.',
  ],
};
