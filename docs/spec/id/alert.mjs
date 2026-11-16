export default {
  summary: 'Pesan inline tentang halaman, bagian atau formulir ini, dalam salah satu dari empat nada. Kata-katanya yang membawa makna; warna dan ikon hanya mendukung.',
  when: [
    'Ada hal di halaman ini yang perlu diperhatikan sebelum orang bertindak: jadwal yang bentrok, dokumen yang kurang, pembayaran yang ditolak.',
    'Formulir gagal saat dikirim dan Anda perlu satu ringkasan di atasnya (error per kolom tetap di bawah setiap kolom).',
    'Hasil yang tetap relevan selama orang berada di halaman: "Permohonan Anda terkirim. Kami membalas dalam dua hari kerja."',
    'Penjelasan singkat tentang aturan yang mengubah apa yang bisa dilakukan di sini ("Pendaftaran ditutup Jumat pukul 17.00").',
  ],
  whenNot: [
    ['Kondisinya menyangkut seluruh aplikasi, bukan halaman ini (offline, pemeliharaan, masa uji coba berakhir)', 'banner'],
    ['Mengonfirmasi hal yang baru saja terjadi ("Tersimpan", "Pesan terkirim")', 'toast', 'Toast hilang sendiri; alert bertahan sampai kondisinya selesai'],
    ['Meminta orang mengonfirmasi aksi yang merusak', 'alert-dialog'],
    ['Satu kolom salah', 'text-field', 'Letakkan error di bawah kolomnya (`field__error`), bukan di alert'],
    ['Tips sekali tampil tentang gestur atau fitur', 'hints'],
    ['Sebuah area belum punya data', 'empty-state'],
  ],
  where: 'Di bagian atas area yang dibahas: di bawah [page header](page-header), di atas formulir yang diringkasnya, atau di atas card. Selebar kolomnya di semua ukuran layar. Jangan pernah melayang, jangan pernah ditumpuk lebih dari dua; jika ada tiga kondisi, gabungkan menjadi satu alert dengan daftar.',
  anatomy: [
    ['.alert', 'Wajib. Baris flex di atas isian tenang dengan jarak 12 px dan padding 14/16 px.'],
    ['.alert--info|success|warning|danger', 'Nadanya. Mengatur warna latar dan warna ikon. Tanpa nada, alert berada di atas isian netral.'],
    ['.alert > .ic', 'Wajib. Ikon nada, otomatis dirender terisi: `info`, `check_circle`, `warning`, `error`.'],
    ['.alert__title', 'Satu baris yang menyebut apa yang terjadi atau apa yang berlaku. Tebal, 14 px.'],
    ['.alert__body', 'Kalimat kedua opsional: artinya atau apa yang perlu dilakukan.'],
    ['.alert__actions', 'Baris opsional berisi tombol kecil (`btn--sm` atau `btn--md`) di bawah teks.'],
    ['.alert__close', 'Tombol tutup opsional: `icon-btn` yang ditarik ke sudut kanan. Pasangkan dengan `.collapse` dan `data-lds-dismiss`.'],
    ['.collapse', 'Pembungkus yang membuat alert bisa tertutup (atau muncul) dengan melipat tingginya memakai spring. Berisi satu `div` di sekeliling alert.'],
  ],
  examples: [
    {
      title: 'Nada',
      desc: 'Info untuk hal yang perlu diketahui, success untuk hasil yang tetap relevan, warning untuk masalah yang masih bisa diperbaiki, danger untuk sesuatu yang gagal.',
      html: `<div class="docs-col" style="max-width: 560px;">
  <div class="alert alert--info"><span class="ic" aria-hidden="true">info</span><div><div class="alert__title">Pendaftaran dibuka Senin pukul 08.00</div><div class="alert__body">Kuota diberikan sesuai urutan permohonan masuk.</div></div></div>
  <div class="alert alert--success"><span class="ic" aria-hidden="true">check_circle</span><div><div class="alert__title">Permohonan izin usaha Anda terkirim</div><div class="alert__body">Petugas biasanya membalas dalam dua hari kerja.</div></div></div>
  <div class="alert alert--warning"><span class="ic" aria-hidden="true">warning</span><div><div class="alert__title">Dua jadwal layanan bentrok pada hari Kamis</div><div class="alert__body">Pilih salah satu sebelum mengirim rencana Anda.</div></div></div>
  <div class="alert alert--danger" role="alert"><span class="ic" aria-hidden="true">error</span><div><div class="alert__title">Pembayaran pajak kendaraan ditolak</div><div class="alert__body">Pakai kartu lain atau bayar lewat transfer bank.</div></div></div>
</div>`,
    },
    {
      title: 'Dengan aksi',
      desc: 'Jika ada satu perbaikan yang jelas, letakkan di dalam alert. Sebut hasilnya.',
      html: `<div class="alert alert--warning" style="max-width: 560px;">
  <span class="ic" aria-hidden="true">warning</span>
  <div>
    <div class="alert__title">Foto KTP Anda belum diunggah</div>
    <div class="alert__body">Unggah sebelum 20 November agar jadwal wawancara Anda tidak dibatalkan.</div>
    <div class="alert__actions"><button class="btn btn--secondary btn--sm">Unggah foto</button><button class="btn btn--plain btn--sm">Ingatkan besok</button></div>
  </div>
</div>`,
    },
    {
      title: 'Bisa ditutup',
      desc: 'Dibungkus `.collapse`, tombol tutup dengan `data-lds-dismiss` melipat alert dengan spring yang halus dan konten di bawahnya ikut naik. Tekan tombol tutup.',
      html: `<div style="max-width: 560px;">
  <div class="collapse"><div><div class="alert alert--info">
    <span class="ic" aria-hidden="true">info</span>
    <div style="flex: 1;"><div class="alert__title">Baru: formulir permohonan kini menyimpan isian Anda</div><div class="alert__body">Tutup formulir dan lanjutkan nanti dari bagian yang sama.</div></div>
    <button class="icon-btn alert__close" aria-label="Tutup" data-lds-dismiss><span class="ic" style="font-size: 18px;" aria-hidden="true">close</span></button>
  </div></div></div>
  <p class="docs-note" style="margin-top: 12px;">Konten di bawah alert ikut naik saat alert ditutup.</p>
</div>`,
    },
  ],
  variants: [
    ['alert--info', 'Kabar dan aturan yang netral. Warna aksen.'],
    ['alert--success', 'Hasil yang tetap relevan di halaman ini. Pakai toast untuk konfirmasi yang sekilas.'],
    ['alert--warning', 'Masalah yang masih bisa diperbaiki, atau akibat yang perlu diketahui.'],
    ['alert--danger', 'Sesuatu gagal atau ditolak. Sebut apa yang gagal dan apa langkah berikutnya.'],
    ['(no tone)', 'Catatan netral di atas isian tenang; jarang dipakai.'],
  ],
  states: [
    ['dismissed', '`.collapse.is-closed` pada pembungkus (ditambahkan oleh `data-lds-dismiss`): tinggi ke nol dan opasitas hilang, lalu `lds:dismiss` di-bubble dari tombol.'],
    ['appearing', 'Render pembungkus sebagai `.collapse.is-closed`, lalu hapus `is-closed` di frame berikutnya agar terbuka dengan spring, bukan melompat masuk.'],
  ],
  motion: [
    'Tutup dan muncul: pembungkus `.collapse` menganimasikan `grid-template-rows` 1fr ke 0fr dengan `--spring-smooth` selama `--d-smooth` (560 ms), sementara opasitas berjalan dengan `--ease-standard` selama `--d-standard` (240 ms). Konten di bawahnya mengikuti tinggi, jadi tidak ada yang melompat.',
    'Ini transition, jadi membuka lagi di tengah lipatan akan membalik dari posisinya saat itu.',
    'Alert sendiri tidak punya animasi masuk: tanpa geser, tanpa getar. Alert danger yang muncul setelah kirim boleh memakai [shake](shake) pada tombol kirim, bukan pada alert.',
    'Reduced motion: lipatan menjadi perubahan linear 120 ms.',
  ],
  a11y: [
    'Pakai `role="alert"` hanya untuk alert danger yang muncul setelah sebuah aksi (memotong screen reader). Pakai `role="status"` untuk info atau success yang muncul belakangan. Alert yang sudah ada saat halaman dimuat tidak perlu role.',
    'Ikon hanya dekorasi (`aria-hidden="true"`); judul harus menyebut nadanya dengan kata-kata ("Pembayaran pajak kendaraan ditolak", bukan "Error").',
    'Tombol tutup adalah [icon button](icon-button) dengan `aria-label="Tutup"`. Setelah ditutup, pindahkan fokus ke elemen logis berikutnya; alert yang terlipat tetap ada di DOM, jadi hapus atau pasang `hidden` pada `lds:dismiss` setelah lipatan 560 ms selesai, atau tombolnya tetap bisa dicapai dengan Tab.',
    'Jangan hanya mengandalkan warna; kontras teks tetap setara teks isi di setiap warna.',
  ],
  do: [
    'Tulis judul sebagai fakta ("Dua jadwal layanan bentrok pada hari Kamis") dan isi sebagai langkah berikutnya.',
    'Letakkan satu perbaikan di dalam alert sebagai tombol.',
    'Hapus alert begitu kondisinya beres.',
  ],
  dont: [
    'Menumpuk beberapa alert; gabungkan atau perbaiki penyebabnya.',
    'Memakai alert untuk mengonfirmasi penyimpanan; itu tugas [toast](toast).',
    'Memakai `role="alert"` pada konten yang sudah ada saat halaman dimuat.',
    'Mengubah alert menjadi card berwarna atau menambah bayangan.',
  ],
  js: 'Opsional. Tombol tutup dengan `data-lds-dismiss` di dalam `.collapse` menambahkan `is-closed` ke `.collapse` terdekat dan memicu `lds:dismiss` (bubbles). Bagian lain tidak butuh JS.',
};
