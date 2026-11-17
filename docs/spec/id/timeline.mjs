export default {
  summary: 'Peristiwa berurutan waktu pada garis vertikal, dengan titik terisi untuk yang sudah selesai. Untuk riwayat atau rencana satu hal, yang terlama di atas.',
  when: [
    'Riwayat satu catatan: permohonan izin dari diajukan sampai diputuskan, laporan warga dari masuk sampai ditangani.',
    'Rencana dengan tonggak bertanggal yang sebagian sudah selesai: jadwal perbaikan jalan, proses beasiswa daerah.',
  ],
  whenNot: [
    ['Langkah alur yang sedang diselesaikan orang saat ini (wizard formulir)', 'steps'],
    ['Petunjuk yang diikuti berurutan', 'list', 'Pakai baris bernomor (`.lrow--num`)'],
    ['Feed berisi banyak peristiwa yang tidak berhubungan', 'list'],
    ['Memilih tanggal', 'calendar'],
    ['Apa yang dilakukan asisten, langkah demi langkah', 'tool-call'],
  ],
  where: 'Di dalam [kartu](card) atau panel samping tentang hal yang dilacaknya, di bawah judul. Selebar kolomnya di ponsel. Batasi sekitar delapan butir; yang lebih lama masuk ke balik [show more](show-more).',
  anatomy: [
    ['ol.tl', 'Wajib. Kolom peristiwa.'],
    ['li.tl__item', 'Wajib. Kolom titik 24 px dan teksnya; garis 2 px menghubungkan setiap titik ke titik berikutnya (tidak setelah yang terakhir).'],
    ['.tl__dot', 'Wajib. Lingkaran ber-ring 24 px; boleh berisi ikon 15 px.'],
    ['.tl__dot--done', 'Isian aksen dengan ikon putih (`check`): selesai.'],
    ['.tl__title', 'Wajib. Apa yang terjadi atau akan terjadi.'],
    ['.tl__meta', 'Tanggal, serta siapa atau apa, dalam teks samar.'],
  ],
  examples: [
    {
      title: 'Permohonan izin, dari diajukan sampai terbit',
      desc: 'Butir selesai terisi, butir berjalan dengan ikon, butir mendatang kosong.',
      html: `<div class="card" style="max-width: 400px;">
  <div class="card__title" style="margin-bottom: 16px;">Persetujuan bangunan gedung</div>
  <ol class="tl">
    <li class="tl__item"><span class="tl__dot tl__dot--done"><span class="ic" aria-hidden="true">check</span></span><div><div class="tl__title">Berkas diterima</div><div class="tl__meta"><span class="sr-only">Selesai. </span>12 Sep</div></div></li>
    <li class="tl__item"><span class="tl__dot tl__dot--done"><span class="ic" aria-hidden="true">check</span></span><div><div class="tl__title">Survei lapangan</div><div class="tl__meta"><span class="sr-only">Selesai. </span>20 Okt</div></div></li>
    <li class="tl__item" aria-current="step"><span class="tl__dot"><span class="ic" aria-hidden="true">schedule</span></span><div><div class="tl__title">Perbaikan gambar teknis</div><div class="tl__meta">18 Nov · sedang berjalan</div></div></li>
    <li class="tl__item"><span class="tl__dot"></span><div><div class="tl__title">Izin terbit</div><div class="tl__meta">Tanggal belum ditetapkan</div></div></li>
  </ol>
</div>`,
    },
    {
      title: 'Riwayat pendaftaran beasiswa daerah',
      desc: 'Semua butir sudah selesai; ikon menyebut jenis peristiwanya.',
      html: `<ol class="tl" style="max-width: 400px;">
  <li class="tl__item"><span class="tl__dot tl__dot--done"><span class="ic" aria-hidden="true">upload_file</span></span><div><div class="tl__title">Dokumen diunggah</div><div class="tl__meta">2 Nov, 09.14</div></div></li>
  <li class="tl__item"><span class="tl__dot tl__dot--done"><span class="ic" aria-hidden="true">visibility</span></span><div><div class="tl__title">Diperiksa panitia beasiswa daerah</div><div class="tl__meta">5 Nov, 13.40</div></div></li>
  <li class="tl__item"><span class="tl__dot tl__dot--done"><span class="ic" aria-hidden="true">mail</span></span><div><div class="tl__title">Surat penetapan penerima dikirim</div><div class="tl__meta">9 Nov, 10.02</div></div></li>
</ol>`,
    },
  ],
  variants: [
    ['tl__dot', 'Mendatang atau netral: ber-ring, kosong atau dengan ikon samar.'],
    ['tl__dot--done', 'Selesai: isian aksen, ikon putih.'],
  ],
  states: [
    ['done', '`.tl__dot--done` dengan `check` dan "Selesai" untuk pembaca layar.'],
    ['current', 'Ikon di titik polos (`schedule`) dan `aria-current="step"` pada butirnya, dengan "sedang berjalan" di meta.'],
    ['upcoming', 'Titik kosong; meta menyebut kapan, atau "Tanggal belum ditetapkan".'],
  ],
  motion: [
    'Tidak ada saat diam. Bila sebuah butir menjadi selesai selagi terlihat, ganti titiknya langsung dan perbarui teksnya; butir baru boleh masuk dengan [list stagger](list-stagger) sekali.',
  ],
  a11y: [
    'Pakai `<ol>`: urutannya bagian dari makna.',
    'Titiknya visual; sebutkan "Selesai" dalam teks tersembunyi dan tandai butir berjalan dengan `aria-current="step"`.',
    'Tanggal di meta berupa teks biasa atau elemen `<time>` [timestamp](timestamp).',
  ],
  do: [
    'Urutkan yang terlama dulu, agar garisnya terbaca seperti cerita.',
    'Buat judul singkat, dan untuk butir selesai pakai bentuk yang menyatakan sudah terjadi.',
  ],
  dont: [
    'Memakai timeline sebagai penanda langkah formulir; pakai [steps](steps).',
    'Menaruh deskripsi panjang di bawah setiap butir; tautkan ke detailnya.',
  ],
};
