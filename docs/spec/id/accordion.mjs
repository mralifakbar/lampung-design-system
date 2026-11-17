export default {
  summary: 'Tumpukan pertanyaan atau bagian yang masing-masing membuka panelnya dengan spring. Untuk isi yang dibaca sebagian saja; jangan pernah untuk menyembunyikan hal yang dibutuhkan semua orang.',
  when: [
    'Pertanyaan yang sering diajukan, ketika setiap orang hanya butuh satu atau dua jawaban.',
    'Detail tambahan di bawah setiap butir halaman: isi tiap jenis layanan, syarat tiap jenis izin.',
    'Halaman pengaturan atau rujukan yang panjang, yang bagiannya bisa dibaca satu per satu (`data-lds-accordion="single"` menjaga hanya satu yang terbuka).',
  ],
  whenNot: [
    ['Berpindah antar tampilan setara dari isi yang sama', 'tabs'],
    ['Beberapa butir pertama daftar, sisanya di balik tombol', 'show-more'],
    ['Hierarki bertingkat folder atau halaman', 'tree'],
    ['Satu langkah yang diambil asisten, beserta detailnya', 'tool-call'],
    ['Navigasi di dalam halaman panjang', 'outline'],
    ['Isi yang wajib dibaca semua orang; tampilkan saja', 'prose'],
  ],
  where: 'Di kolom isi, selebar kolom itu, sering di bawah judul [bagian](sections). Putih dengan ring di atas kanvas, `.acc--fill` di atas panel putih. Di ponsel sama saja; seluruh baris menjadi area ketuk.',
  anatomy: [
    ['.acc', 'Wajib. Grupnya: putih, ring, radius besar. `data-lds-accordion="single"` menutup yang lain saat satu dibuka.'],
    ['.acc--fill', 'Isian tenang, tanpa ring.'],
    ['.acc__item', 'Wajib. Satu pertanyaan atau bagian; garis tipis di antara butir.'],
    ['button.acc__btn', 'Wajib. Baris 56 px berisi judul dan ikon `expand_more` yang berputar saat terbuka. `aria-expanded` dan `aria-controls`.'],
    ['.acc__title > text + .acc__sub', 'Judul dua baris opsional dengan baris kedua yang lebih samar.'],
    ['.acc__panel(.is-open)', 'Wajib. Panelnya; terbuka dengan menganimasikan baris grid. Berisi satu `div`.'],
    ['.acc__panel > div > p', 'Teks jawaban biasa.'],
    ['.acc__panel > div > .acc__content', 'Isi yang lebih kaya: daftar mendapat bullet dan jarak, tabel dan aksi bertumpuk dengan jarak 10 px.'],
  ],
  examples: [
    {
      title: 'Pertanyaan, satu terbuka sekaligus',
      desc: 'Dengan `data-lds-accordion="single"`, membuka satu butir menutup butir lain.',
      html: `<div class="acc" data-lds-accordion="single" style="max-width: 560px;">
  <div class="acc__item"><button class="acc__btn" id="faq1-b" aria-expanded="true" aria-controls="faq1">Bisakah saya mengubah jadwal antrean setelah mendaftar?<span class="ic" aria-hidden="true">expand_more</span></button><div class="acc__panel is-open" id="faq1" role="region" aria-labelledby="faq1-b"><div><p>Bisa, paling lambat sehari sebelum kedatangan. Pada hari itu, tanyakan ke loket Disdukcapil di Way Halim.</p></div></div></div>
  <div class="acc__item"><button class="acc__btn" id="faq2-b" aria-expanded="false" aria-controls="faq2">Di mana saya menemukan KK baru saya?<span class="ic" aria-hidden="true">expand_more</span></button><div class="acc__panel" id="faq2" role="region" aria-labelledby="faq2-b"><div><p>Di menu Dokumen, lalu Data kependudukan. Anda bisa mengunduhnya sebagai PDF ber-QR code.</p></div></div></div>
  <div class="acc__item"><button class="acc__btn" id="faq3-b" aria-expanded="false" aria-controls="faq3">Bagaimana jika saya terlewat jadwal perekaman e-KTP?<span class="ic" aria-hidden="true">expand_more</span></button><div class="acc__panel" id="faq3" role="region" aria-labelledby="faq3-b"><div><p>Pesan jadwal baru. Perekaman juga dibuka setiap Sabtu di kantor Kecamatan Kedaton.</p></div></div></div>
</div>`,
    },
    {
      title: 'Judul dua baris dan isi kaya',
      desc: '`.acc__title` dengan `.acc__sub`, dan `.acc__content` untuk daftar dan aksi. Beberapa butir bisa terbuka bersamaan.',
      html: `<div class="acc acc--fill" style="max-width: 560px;">
  <div class="acc__item"><button class="acc__btn" aria-expanded="false" aria-controls="sec1"><span class="acc__title">Langkah 1: dokumen yang dibawa<span class="acc__sub">4 dokumen · diperiksa di loket</span></span><span class="ic" aria-hidden="true">expand_more</span></button><div class="acc__panel" id="sec1" role="region"><div><div class="acc__content"><p>Bawa dokumen asli; fotokopi dibuat di loket.</p><ul><li>Surat pengantar RT/RW.</li><li>KK dan KTP lama.</li></ul><button class="btn btn--secondary btn--sm" style="align-self: flex-start;">Lihat daftar lengkap</button></div></div></div></div>
  <div class="acc__item"><button class="acc__btn" aria-expanded="false" aria-controls="sec2"><span class="acc__title">Langkah 2: biaya<span class="acc__sub">Gratis · tanpa bayar di loket</span></span><span class="ic" aria-hidden="true">expand_more</span></button><div class="acc__panel" id="sec2" role="region"><div><div class="acc__content"><p>Dokumen kependudukan tidak dipungut biaya. Laporkan permintaan uang lewat kanal pengaduan.</p></div></div></div></div>
</div>`,
    },
  ],
  variants: [
    ['acc', 'Putih dengan ring.'],
    ['acc--fill', 'Isian tenang, untuk panel putih.'],
    ['data-lds-accordion="single"', 'Satu butir terbuka sekaligus.'],
  ],
  states: [
    ['closed', '`aria-expanded="false"` pada tombol, `.acc__panel` tanpa `is-open`.'],
    ['open', '`aria-expanded="true"` dan `.acc__panel.is-open`; ikon berputar 180 derajat.'],
    ['hover', 'Tombol diberi warna `--bg-tint`.'],
  ],
  motion: [
    'Tinggi: `.acc__panel` menganimasikan `grid-template-rows` dari 0fr ke 1fr dengan `--spring-smooth` (`--d-smooth`, 560 ms), bukan tebakan `max-height`, sehingga isi setinggi apa pun terbuka dengan kecepatan yang sama.',
    'Isi: opacity dan naik 4 px. Masuk: opacity selama `--d-standard` dengan `--ease-enter` terlambat 80 ms, naik dengan `--spring-smooth` terlambat 40 ms, sehingga ruangnya terbuka sebelum teks tiba. Keluar: keduanya selama `--d-fast` dengan `--ease-exit`.',
    'Chevron berputar 180 derajat dengan `--spring-smooth`. Semuanya transition, jadi klik kedua di tengah jalan membalik arah dengan mulus.',
    'Reduced motion: perubahan linear 120 ms.',
  ],
  a11y: [
    'Kepala butir adalah `<button>` asli dengan `aria-expanded` dan `aria-controls` yang menunjuk `id` panel. Bungkus dengan heading (`h3`) bila accordion menjadi kerangka halaman.',
    'Panel memakai `role="region"` dan `aria-labelledby` ke tombolnya bila jumlahnya enam atau kurang; lepas role itu untuk daftar panjang.',
    'Panel tertutup hanya diciutkan secara visual; tautan dan tombol di dalamnya tetap bisa difokus. Pasang `inert` pada panel tertutup yang berisi kontrol (pengguna React `AccordionItem` bisa menambahkannya dengan cara yang sama).',
    'Enter dan Space membuka dan menutup (tombol bawaan). Jangan menahan tombol panah.',
  ],
  do: [
    'Tulis setiap judul sebagai pertanyaan atau nama bagian yang dicari orang.',
    'Pakai mode `single` hanya bila butirnya saling menggantikan; biarkan FAQ membuka beberapa sekaligus.',
    'Buka butir yang menjawab pertanyaan paling umum secara default bila itu membantu.',
  ],
  dont: [
    'Menyembunyikan informasi wajib atau aksi utama di panel tertutup.',
    'Menumpuk accordion di dalam accordion.',
    'Menganimasikan tinggi dengan `max-height` atau pengukuran lewat JS.',
  ],
  js: '`init()` memasang setiap `.acc__btn[aria-controls]`: klik membalik `aria-expanded` dan mengganti `.is-open` pada panel. `data-lds-accordion="single"` pada grup menutup butir lain.',
};
