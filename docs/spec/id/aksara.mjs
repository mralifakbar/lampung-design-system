export default {
  summary: 'Teks Latin yang digambar dalam had Lampung, aksara daerah Lampung, sebagai aksen budaya yang tenang di samping nama, judul, dan identitas. Selalu disertai bacaan Latin; jangan pernah menjadi satu-satunya cara membaca sesuatu.',
  when: [
    'Nama tempat, layanan, atau merek ditampilkan dalam bentuk aksaranya di samping versi Latin (`data-lds-aksara="Lampung"`).',
    'Halaman butuh ornamen daerah yang tenang: `.aksara-band` di bawah hero, di atas footer, atau di tepi kartu.',
    'Mengajarkan atau merayakan aksara: tabel huruf, kartu nama, poster acara.',
  ],
  whenNot: [
    ['Teks isi, label, tombol, atau apa pun yang harus dibaca orang untuk menyelesaikan tugas', 'prose', 'Tulis dalam bahasa Indonesia; letakkan aksara di sampingnya hanya sebagai aksen'],
    ['Pemisah dekoratif tanpa makna budaya', 'separator'],
    ['Ikon untuk sebuah konsep', 'icon'],
  ],
  where: 'Di samping atau di atas nama Latin yang dieja (`.aksara-pair`), di kepala halaman, footer situs, keadaan kosong, dan kartu identitas. Band berada di barisnya sendiri di bawah hero atau di atas footer, selebar halaman, dengan ruang di sekitarnya. Satu atau dua kali per halaman; lebih dari itu ornamen berubah jadi kebisingan.',
  anatomy: [
    ['[data-lds-aksara]', 'Wajib. Teks Latin yang digambar, di atribut atau sebagai isi elemen. `init()` mengganti isinya dengan SVG inline dan memberi `role="img"` dengan teks Latin sebagai `aria-label`.'],
    ['.aksara', 'Menyesuaikan ukuran gambar dengan teks (tinggi 1,2em) dan mewarisi `currentColor`.'],
    ['.aksara-pair / .aksara-pair__latin', 'Menumpuk aksara di atas bacaan Latinnya.'],
    ['.aksara-band', 'Strip dekoratif yang mengulang semboyan "sai bumi ruwa jurai" lewat CSS mask; `aria-hidden`. Ganti teksnya dengan `data-lds-aksara-band`.'],
  ],
  examples: [
    { title: 'Nama dengan aksaranya', desc: 'Aksara berada di atas nama Latin yang dieja, dengan warna teks emas. Pembaca layar mendengar nama Latinnya sekali.' },
    {
      title: 'Sejajar dengan judul',
      desc: 'Pada ukuran teks, aksara mengikuti warna judul. Pakai untuk nama layanan atau tempat, sekali saja.',
    },
    { title: 'Band dekoratif', desc: 'Semboyan pada lambang provinsi, diulang sebagai strip yang tenang. Tidak membawa informasi, jadi disembunyikan dari teknologi bantu.' },
    { title: 'Tabel huruf', desc: 'Dua puluh induk huruf, masing-masing dengan bacaannya. Huruf membawa vokal a; anak huruf di atas, di bawah, dan di belakang mengubah vokal atau menutup suku kata.' },
  ],
  variants: [
    ['aksara--gold', 'Warna teks emas (`--gold-text`), pemakaian identitas bawaan; kontras 4,5:1 di atas putih dan fill.'],
    ['aksara--accent / aksara--muted', 'Warna teks aksen atau teks redup, untuk mendampingi judul atau keterangan.'],
    ['aksara--lg', 'Dua kali tinggi teks, untuk kartu nama dan blok identitas.'],
    ['aksara-band--sm / aksara-band--lg', 'Strip 18 / 44 px. Bawaan 28.'],
    ['aksara-band--muted', 'Strip netral untuk layar padat ketika emas akan bersaing.'],
  ],
  states: [
    ['sebelum init', 'Elemen kosong (atau menampilkan teks Latinnya) sampai `init()` berjalan; isi dengan teks Latin bila halaman harus tetap terbaca tanpa JavaScript.'],
    ['forced colors', 'Band disembunyikan pada mode kontras tinggi Windows; nama tetap punya teks Latinnya.'],
  ],
  motion: ['Tidak ada. Aksara adalah bagian identitas, bukan peristiwa; tidak pernah dianimasikan atau diulang.'],
  a11y: [
    '`[data-lds-aksara]` menjadi `role="img"` dengan teks Latin sebagai namanya, jadi diumumkan sekali dan tidak huruf per huruf. Pakai `aria-hidden="true"` bila teks Latin sudah ada tepat di sampingnya (seperti pada `.aksara-pair`), agar tidak dibaca dua kali.',
    'Band selalu `aria-hidden` dan tidak membawa informasi.',
    'Jangan menaruh makna hanya dalam aksara: setiap label, instruksi, dan nilai ditulis dalam huruf Latin.',
  ],
  do: [
    'Pasangkan setiap aksara dengan bacaan Latinnya, terlihat atau lewat `aria-label`.',
    'Batasi di satu atau dua tempat per halaman: nama, judul, satu band.',
    'Minta penutur atau guru had Lampung memeriksa ejaan sebelum dicetak pada materi resmi.',
  ],
  dont: [
    'Menulis teks isi, label formulir, atau tombol dalam aksara.',
    'Memakai band sebagai pemisah di antara setiap bagian.',
    'Mencampurnya dengan lambang atau logo pemerintah daerah: sistem ini tidak resmi.',
  ],
  js: '`init()` memanggil `renderAksara(root)`, yang mengisi `[data-lds-aksara]` dan `.aksara-band`. Pakai `toAksara(text)` untuk sel suku kata dan `aksaraSvg(text)` untuk string SVG (keduanya diekspor dari `lampung-design-system/js` dan `lampung-design-system/aksara`). Berkas statis: `aksara/lds-aksara.svg` (sprite, `<use href="lds-aksara.svg#ka"/>`) dan `aksara/glyphs/*.svg`.',
};
