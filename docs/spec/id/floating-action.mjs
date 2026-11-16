export default {
  summary: 'Satu tombol bulat beraksen yang melayang di atas konten layar ponsel, untuk aksi yang menjadi alasan orang membuka layar itu (pesan baru, tambah pengeluaran). Hanya kontrol inilah yang memakai bayangan saat diam.',
  when: [
    'Layar ponsel yang tujuan utamanya membuat sesuatu di daftar yang ditampilkannya: menulis pesan, mencatat pengeluaran, menambah catatan.',
    'Daftar cukup panjang sehingga tombol di atas atau bawahnya sering di luar jangkauan.',
  ],
  whenNot: [
    ['Layar lebar dan tata letak desktop', 'button', 'Taruh `btn--primary` di header halaman; cakram melayang di sudut jendela 1400 px mudah terlewat.'],
    ['Layar punya aksi utama di akhir formulir atau alur', 'button', 'Pakai `btn--primary btn--block` selebar layar di bilah lengket.'],
    ['Dua aksi atau lebih yang sama penting', 'button-group'],
    ['Aksi yang berlaku untuk item terpilih', 'selection-bar'],
    ['Aksi ikon kecil di toolbar atau kartu', 'icon-button'],
  ],
  where: 'Kanan bawah layar ponsel, 16 sampai 20 px dari tepi, di atas tab bar (`bottom` = tinggi tab bar + 16) dan di atas indikator home (`env(safe-area-inset-bottom)`). Satu per layar. Tombol tidak boleh menutupi baris terakhir: beri daftar yang menggulir padding bawah minimal setinggi tombol ditambah 32.',
  anatomy: [
    ['.icon-btn.icon-btn--accent', 'Wajib. Isian aksen, glyph putih, tampilan primary.'],
    ['aria-label', 'Wajib. Nama aksinya ("Pesan baru").'],
    ['style', 'Ukuran dan posisi belum ada di sistem: setel `width: 56px; height: 56px` dan `position: absolute` (atau `fixed`) dengan `right` dan `bottom`, ditambah `box-shadow: var(--finish-primary), var(--shadow-md)`.'],
  ],
  examples: [
    {
      title: 'Di daftar ponsel',
      desc: 'Melayang di atas daftar yang menggulir, di atas tab bar. Tekan untuk merasakan efek tekannya.',
      html: `<div class="docs-phone">
  <div class="docs-scroll" style="height: 100%; padding: 20px 16px 120px;">
    <h3 class="section__title-sm" style="margin-bottom: 12px;">Pesan</h3>
    <div class="list list--fill">
      <div class="lrow"><span class="avatar" style="--size: 36px;">RK</span><span class="lrow__body"><span class="lrow__title" style="display: block;">Rina Kusuma</span><span class="lrow__sub" style="display: block;">Jadwal posyandu bisa dipindah ke jam 4?</span></span></div>
      <div class="lrow"><span class="avatar avatar--gray" style="--size: 36px;">PK</span><span class="lrow__body"><span class="lrow__title" style="display: block;">Puskesmas Kedaton</span><span class="lrow__sub" style="display: block;">Ruang imunisasi pindah ke lantai 2</span></span></div>
      <div class="lrow"><span class="avatar" style="--size: 36px;">AP</span><span class="lrow__body"><span class="lrow__title" style="display: block;">Adi Pratama</span><span class="lrow__sub" style="display: block;">Mengirim foto laporan jalan rusak</span></span></div>
    </div>
  </div>
  <button class="icon-btn icon-btn--accent" aria-label="Pesan baru" style="position: absolute; right: 20px; bottom: 28px; width: 56px; height: 56px; box-shadow: var(--finish-primary), var(--shadow-md);"><span class="ic" aria-hidden="true">edit</span></button>
</div>`,
      code: `<button class="icon-btn icon-btn--accent" aria-label="Pesan baru"
  style="position: fixed; right: 20px; bottom: calc(83px + 16px); width: 56px; height: 56px; box-shadow: var(--finish-primary), var(--shadow-md);">
  <span class="ic" aria-hidden="true">edit</span>
</button>`,
    },
  ],
  states: [
    ['hover', '`--accent-hover` di perangkat yang bisa hover.'],
    [':active', 'Mengecil ke `scale(0.9)` dalam 90 ms, kembali dengan `--spring-snappy`.'],
    ['hidden while scrolling', 'Opsional: sembunyikan saat menggulir ke bawah, tampilkan saat menggulir ke atas. Tidak tersedia bawaan; jika Anda menambahkannya, geser 24 px ke bawah dengan opacity memudar memakai `--ease-exit` selama `--d-exit`, dan kembali dengan `--spring-smooth`.'],
  ],
  motion: [
    'Tekan: `scale(0.9)` dengan transisi 90 ms, lepas dengan `--spring-snappy` selama `--d-snappy`, sama seperti semua icon button.',
    'Yang dibukanya harus tumbuh dari tombol ini: [sheet](sheet) yang naik dari bawah dengan `--spring-smooth`, jangan dialog yang muncul tiba-tiba di tengah.',
    'Tombol tidak berdenyut, memantul, atau berputar saat diam. Dengan reduced motion hanya efek tekan yang tersisa (sebagai perubahan 120 ms).',
  ],
  a11y: [
    '`<button>` sungguhan dengan `aria-label`; glyph-nya `aria-hidden`.',
    'Letakkan di DOM setelah konten utama (atau di akhir area layar) agar Tab mencapainya setelah daftar, sesuai posisinya.',
    'Tombol tidak boleh menyembunyikan konten: sisakan padding bawah di daftar agar baris terakhir bisa digulir ke atasnya.',
    'Putih di atas `--accent` mencapai 5.2:1 di kedua tema.',
  ],
  do: [
    'Pakai satu per layar, untuk aksi membuat yang paling sering.',
    'Jaga agar tidak menutupi tab bar dan indikator home.',
    'Buka sheet darinya di ponsel.',
  ],
  dont: [
    'Memakainya di tata letak desktop atau di dalam kartu.',
    'Menambahkan speed-dial berisi beberapa tombol melayang.',
    'Memberi kontrol diam lain bayangan agar tampak serupa.',
  ],
};
