export default {
  summary: 'Pembungkus untuk teks panjang yang tidak Anda atur baris per baris: artikel, halaman bantuan, catatan pelajaran, Markdown yang dirender. `.prose` memberi gaya pada heading, paragraf, daftar, tautan, tabel dan kode inline polos di dalamnya dan membatasi panjang baris sampai 680 px.',
  when: [
    'Merender Markdown atau teks kaya dari CMS, editor atau jawaban asisten, ketika HTML-nya tidak punya kelas.',
    'Artikel bantuan, halaman materi, syarat dan kebijakan: teks yang dibaca dari atas ke bawah.',
  ],
  whenNot: [
    ['Teks antarmuka: deskripsi card, teks bantuan, empty state', 'card', 'Komponen mengatur huruf sendiri; jangan bungkus UI dengan `.prose`.'],
    ['Halaman yang terdiri dari bagian berjudul berisi komponen', 'sections'],
    ['Kode lebih dari satu baris', 'code-block'],
    ['Pasangan label dan nilai (biaya, tanggal, rincian)', 'key-value'],
    ['Pesan dalam chat', 'chat-message', 'Pesan asisten boleh berisi `.prose`, tetapi bubble-nya berasal dari komponen chat.'],
  ],
  where: 'Di kolom utama halaman, sendiri atau sebagai kolom utama `split-2` di samping [outline](outline). Ia mengatur `max-width` sendiri (`--size-measure`, 680 px); jangan direntangkan. Di ponsel ia mengisi lebar di dalam gutter 20 px dan teks isi turun ke 15,5/26.',
  anatomy: [
    ['.prose', 'Wajib. Pembungkus. Teks isi 16/27, `--text-default`, jarak 16 px antarblok.'],
    ['h2, h3', '`--type-title-2` / `--type-title-3` dengan `--text-strong`, jarak 40 / 28 px di atas, 10 px ke elemen berikutnya.'],
    ['ul, ol (no class)', 'Penanda bulat dan angka dengan `--text-subtle`, inden 22 px, jarak 8 px antaritem.'],
    ['a (no class)', 'Teks aksen, bergaris bawah saat diam dengan kekuatan 35 %, penuh saat hover.'],
    ['strong, table, .code', 'Teks tebal semibold; tabel dengan baris garis tipis; [inline code](inline-code). Tambahkan `.quote`, `.cite`, `.thumb` untuk kutipan, sitasi dan gambar.'],
  ],
  examples: [
    {
      title: 'Halaman materi',
      desc: 'HTML polos tanpa kelas, kecuali kode inline, kutipan dan sitasi, yang merupakan komponen sendiri.',
      html: `<article class="prose">
  <h2>Bentuk normal ketiga</h2>
  <p>Sebuah tabel berada dalam <strong>bentuk normal ketiga</strong> jika setiap kolom bergantung pada kunci, seluruh kunci, dan hanya pada kunci. Dalam praktiknya, pisahkan kolom yang sebenarnya menjelaskan kolom lain.</p>
  <h3>Cara memeriksa tabel</h3>
  <ol>
    <li>Temukan kunci primernya, misalnya <code class="code">student_id</code>.</li>
    <li>Untuk setiap kolom lain, tanyakan apakah kolom itu menjelaskan kunci atau hal lain.</li>
    <li>Pindahkan kolom yang menjelaskan hal lain ke tabelnya sendiri.</li>
  </ol>
  <blockquote class="quote"><p>Normalisasi sampai terasa sakit, lalu denormalisasi sampai berfungsi.</p><footer>Ungkapan di kalangan pengajar basis data</footer></blockquote>
  <p>Sebagian besar sistem akademik berhenti di bentuk normal ketiga; lebih jauh dari itu jarang menguntungkan untuk data yang lebih sering dibaca <a class="cite" href="#src-1" aria-label="Sumber 1">1</a>. Lihat <a href="#lesson-14">materi berikutnya</a> tentang indeks.</p>
  <table>
    <thead><tr><th>Bentuk</th><th>Menghilangkan</th></tr></thead>
    <tbody>
      <tr><td>Pertama</td><td>Grup berulang</td></tr>
      <tr><td>Kedua</td><td>Ketergantungan parsial</td></tr>
      <tr><td>Ketiga</td><td>Ketergantungan transitif</td></tr>
    </tbody>
  </table>
</article>`,
    },
    {
      title: 'Jawaban asisten',
      desc: 'Markdown yang dirender dari jawaban: paragraf pendek dan daftar berbutir.',
      html: `<div class="prose">
  <p>Ada tiga dokumen yang harus Anda lengkapi minggu ini:</p>
  <ul>
    <li><strong>Surat keterangan domisili</strong>, untuk permohonan izin usaha, paling lambat besok pukul 23.59.</li>
    <li><strong>Foto lokasi usaha</strong>, diunggah sebelum Kamis.</li>
    <li>Membaca ketentuan retribusi pasar sebelum verifikasi hari Jumat.</li>
  </ul>
  <p>Mulai dari surat keterangan domisili; tanpa surat itu permohonan tidak bisa diproses.</p>
</div>`,
    },
  ],
  motion: [
    'Tidak ada. Teks panjang tidak pernah beranimasi masuk, kecuali teks yang masih mengalir, yang memakai [streaming text](streaming-text).',
    'Garis bawah tautan berganti warna selama `--d-fast`.',
  ],
  a11y: [
    'Pakai struktur sungguhan: `<article>` atau `<main>`, satu `<h1>` di halaman (di luar `.prose`, di page header), lalu `h2` dan `h3` berurutan tanpa melompati tingkat.',
    'Tautan menyebut tujuannya; lihat [link](link).',
    'Tabel tetap memakai `<thead>` dan `<th>`; tambahkan `<caption>` jika tidak ada heading tepat di atas tabel.',
    'Teks isi 16 px dengan tinggi baris 27 px dan sekitar 70 karakter per baris, tetap terbaca saat diperbesar 200 %.',
  ],
  do: [
    'Bungkus Markdown yang dirender dan konten CMS dengan `.prose`.',
    'Buat paragraf pendek dan pakai heading setiap beberapa paragraf.',
    'Pakai `.quote` untuk kutipan dan `.code` untuk kode di dalam prose.',
  ],
  dont: [
    'Menaruh tombol, card atau formulir di dalam `.prose`; letakkan di `sections` di sebelahnya.',
    'Menimpa `max-width` agar memenuhi layar lebar.',
    'Menambah kelas di setiap paragraf; pembungkus sudah mengatur gayanya.',
  ],
};
