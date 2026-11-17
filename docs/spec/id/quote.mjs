export default {
  summary: 'Kata-kata yang diucapkan atau ditulis orang lain, dipisahkan oleh garis aksen 3 px di kiri, 17/28 dengan `--text-strong`, dengan sumber di footer di bawahnya. Hanya untuk kutipan sungguhan.',
  when: [
    'Mengutip orang, aturan atau sumber di dalam artikel, panduan atau laporan: ucapan lurah, pasal dari tata tertib layanan.',
    'Menampilkan umpan balik yang ditulis seseorang, dengan menyebut penulisnya (komentar verifikator pada permohonan).',
  ],
  whenNot: [
    ['Menarik perhatian pada peringatan, tips atau syarat penting', 'alert', 'Garis kutipan bukan callout.'],
    ['Satu langkah berikutnya di halaman', 'spotlight'],
    ['Menunjuk sumber sebuah fakta', 'citation', 'Sitasi bernomor bersifat inline; kutipan mereproduksi kata-katanya.'],
    ['Menampilkan kode atau keluaran', 'code-block'],
    ['Testimoni di halaman pemasaran', 'card', 'Hanya dengan kata-kata asli yang jelas penulisnya; jangan pernah mengarang.'],
  ],
  where: 'Di aliran [prose](prose) atau sebuah bagian, selebar bacaan. Ia mengatur `margin: 0`, dan karena aturan itu datang setelah jarak prose, jarak 16 px di dalam `.prose` juga ikut hilang; letakkan di `stack` atau tambahkan `margin-block: 16px` di CSS proyek sampai sistem memperbaikinya. Di ponsel garis dan lebar penuhnya tetap.',
  anatomy: [
    ['blockquote.quote', 'Wajib. Kutipan dengan garis aksen dan padding kiri 18 px. Berisi satu atau lebih `<p>`.'],
    ['footer', 'Opsional. Siapa yang mengatakan dan di mana: `--type-footnote` dengan `--text-subtle`, 8 px di bawahnya.'],
    ['figure.quote + figcaption', 'Juga didukung untuk atribusi, tetapi letakkan kata-katanya di `<p>`, bukan di `<blockquote>` bersarang (margin bawaan browser-nya tidak direset).'],
  ],
  examples: [
    {
      title: 'Di dalam panduan layanan',
      desc: 'Kutipan pendek dengan sumbernya.',
      html: `<blockquote class="quote measure">
  <p>Pemohon wajib datang sendiri untuk perekaman KTP elektronik; perekaman tidak dapat diwakilkan.</p>
  <footer>Tata tertib loket pelayanan, Kantor Kecamatan Kedaton, pasal 12</footer>
</blockquote>`,
    },
    {
      title: 'Umpan balik pada permohonan',
      desc: 'Kata-kata dari seseorang dengan nama penulisnya, dan tanggal di footer.',
      html: `<figure class="quote measure">
  <p>Denah lokasinya jelas dan berkasnya lengkap. Lain kali, tambahkan foto papan nama usaha yang diambil dari depan.</p>
  <figcaption>Sari Wulandari, verifikator, pada permohonan IUM 2104 · 3 November</figcaption>
</figure>`,
    },
  ],
  motion: [
    'Tidak ada. Kutipan adalah teks statis.',
  ],
  a11y: [
    'Pakai `<blockquote>` (atau `<figure>` dengan `<figcaption>`) agar kutipan diumumkan sebagai satu kesatuan.',
    'Letakkan atribusi di `footer` atau `figcaption`, bukan di paragraf yang dikutip.',
    'Tambahkan `cite="url"` pada blockquote jika sumbernya daring, dan tautkan sumbernya di footer.',
  ],
  do: [
    'Kutip dengan persis dan sebutkan sumber setiap kutipan.',
    'Batasi kutipan sampai beberapa kalimat.',
  ],
  dont: [
    'Memakai `.quote` untuk menyorot teks Anda sendiri.',
    'Mengarang kutipan atau testimoni untuk konten contoh.',
    'Menaruh `<blockquote>` di dalam `figure.quote`.',
  ],
};
