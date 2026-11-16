const pic = (sky, main, accent, ground) => 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'><rect width='800' height='600' fill='${sky}'/><circle cx='640' cy='130' r='56' fill='${accent}'/><rect x='170' y='210' width='460' height='270' rx='8' fill='${main}'/><path d='M150 220 L400 110 L650 220 Z' fill='${main}'/><g fill='${sky}' opacity='0.85'><rect x='220' y='270' width='60' height='80'/><rect x='320' y='270' width='60' height='80'/><rect x='420' y='270' width='60' height='80'/><rect x='520' y='270' width='60' height='80'/><rect x='360' y='380' width='80' height='100'/></g><rect y='480' width='800' height='120' fill='${ground}'/></svg>`);
const LIB = pic('#DBEAFE', '#0A6246', '#F59E0B', '#16A34A');
const LAB = pic('#DCFCE7', '#15803D', '#FDE68A', '#166534');
const HALL = pic('#FFEDD5', '#C2410C', '#FEF3C7', '#78350F');
const THUMB = (src, cap, alt) => `<a class="thumb" href="${src}" data-lds-lightbox data-caption="${cap}"><img src="${src}" alt="${alt}"></a>`;

export default {
  summary: 'Gambar yang Anda ketuk membesar dari thumbnail-nya sendiri menjadi tampilan penuh dan mengecil kembali ke tempat yang sama saat ditutup (transisi FLIP). Karena objeknya tidak pernah hilang, orang tidak kehilangan posisinya: tampilan besar jelas merupakan benda yang sama, bukan halaman baru.',
  when: [
    'Membuka foto, diagram, atau hasil pindaian dari grid atau artikel ke dalam [lightbox](lightbox).',
    'Thumbnail apa pun yang versi besarnya adalah gambar yang sama: foto gedung layanan, hasil pemeriksaan, pindaian dokumen permohonan.',
  ],
  whenNot: [
    ['Membuka detail yang bukan gambar yang sama (kartu layanan ke halamannya)', 'nav-progress', 'Belum ada transisi shared element umum untuk elemen sembarang; berpindah halaman seperti biasa.'],
    ['Formulir atau pertanyaan di atas halaman', 'dialog'],
    ['Menjelajahi deretan gambar di tempat', 'carousel'],
    ['Konten yang terbuka di bawah pemicunya', 'height-expand'],
    ['Menampilkan gambar kecil di daftar atau kartu', 'thumbnail'],
  ],
  where: 'Pada tautan `.thumb` (`<a class="thumb" href="large.jpg" data-lds-lightbox>`) yang membungkus `<img>`, di mana saja: `auto-grid` berisi foto, gambar di dalam [prose](prose), kartu. Lightbox ditambahkan ke `<body>` sebagai layer tetap.',
  examples: [
    {
      title: 'Grid foto gedung layanan',
      desc: 'Buka sebuah foto: foto membesar dari posisinya yang tepat di grid ke tengah sementara backdrop memudar masuk. Tutup (Escape, tombol tutup, atau backdrop) dan foto mengecil kembali ke kotak yang sama.',
      html: `<div class="auto-grid" style="--min: 150px; width: 100%;">
  ${THUMB(LIB, 'Mal pelayanan publik, pintu timur', 'Gedung mal pelayanan publik dengan jendela tinggi')}
  ${THUMB(LAB, 'Puskesmas, gedung rawat jalan', 'Gedung rawat jalan puskesmas di antara pepohonan')}
  ${THUMB(HALL, 'Balai warga, hari peresmian', 'Balai warga dalam cahaya sore yang hangat')}
</div>`,
      code: `<div class="auto-grid" style="--min: 150px;">
  <a class="thumb" href="library-large.jpg" data-lds-lightbox data-caption="Mal pelayanan publik, pintu timur">
    <img src="library-small.jpg" alt="Gedung mal pelayanan publik dengan jendela tinggi">
  </a>
  …
</div>`,
    },
    {
      title: 'Gambar di dalam panduan',
      desc: 'Di dalam artikel, gambar tetap kecil agar orang bisa terus membaca; mengetuknya akan membesarkannya tanpa kehilangan posisi di teks.',
      html: `<div class="prose">
  <p>Pemeriksaan kesehatan ibu hamil dilayani di gedung rawat jalan setiap Senin dan Kamis. Foto di bawah menunjukkan gedung tempat Anda mendaftar.</p>
  <div style="max-width: 280px;">${THUMB(LAB, 'Puskesmas, gedung rawat jalan, ruang 2', 'Gedung rawat jalan puskesmas di antara pepohonan')}</div>
  <p>Bawa buku KIA dan KTP Anda. Loket pendaftaran buka 15 menit sebelum pelayanan dimulai.</p>
</div>`,
    },
  ],
  motion: [
    'FLIP: gambar besar diletakkan di posisi akhirnya, lalu dianimasikan dari kotak thumbnail (`translate` ditambah `scale` dari kotak yang diukur) ke `none`. Buka: 420 ms dengan kurva masuk (`cubic-bezier(0.16, 1, 0.3, 1)`, nilai `--ease-enter`). Tutup: jalur yang sama dibalik dalam 220 ms, kembali ke thumbnail.',
    'Backdrop: `.lightbox` memudar masuk selama `--d-standard` dengan `--ease-enter` dan keluar selama `--d-exit` dengan `--ease-exit`.',
    'Hanya `transform` yang dianimasikan (titik asal di sudut kiri atas), sehingga gerakan terbangnya tetap mulus dengan gambar besar.',
    'Interupsi: menutup saat gerakan terbang pembuka masih berjalan memulai perjalanan kembali dari frame saat itu; tidak ada yang harus selesai dulu.',
    'Reduced motion: tanpa gerakan terbang. Lightbox memudar masuk dan keluar (120 ms) dan gambar muncul di tempatnya.',
  ],
  a11y: [
    'Thumbnail adalah tautan sungguhan ke gambar besar, jadi tetap berfungsi tanpa JS dan terbuka di tab baru dengan klik tengah. Beri `<img>` teks `alt` yang sungguhan.',
    'Lightbox memakai `role="dialog"` dengan `aria-modal="true"`, berlabel dari `data-caption` (atau alt). Fokus pindah ke tombol tutup; Tab tetap di sana; Escape menutup; fokus kembali ke thumbnail.',
    'Tulis keterangan di `data-caption`; keterangan tampil di bawah gambar dan dipakai sebagai label dialog.',
  ],
  do: [
    'Pakai `data-lds-lightbox` pada tautan `.thumb` yang berisi `<img>`.',
    'Samakan rasio aspek thumbnail dengan gambar besar jika bisa; gerakan terbangnya jadi tanpa distorsi.',
    'Tulis keterangan yang menyebut apa dan di mana.',
  ],
  dont: [
    'Memudarkan lightbox dari tengah padahal dibuka dari thumbnail.',
    'Menganimasikan `width`, `height`, atau `top` untuk memalsukan pembesaran.',
    'Memakainya untuk gambar yang harus dibandingkan berdampingan dengan teks; buka di tempat saja.',
  ],
  js: '`init()` memasang `a[data-lds-lightbox]` (dengan `<img>` di dalamnya): saat diklik, ia membangun dialog `.lightbox` dengan `.lightbox__close` dan `.lightbox__caption` dari `data-caption` (label tutup dari `data-close`), menjalankan gerakan terbang FLIP, dan saat ditutup menjalankannya terbalik lalu mengembalikan fokus. FLIP ini khusus untuk lightbox; tidak ada helper shared element umum.',
};
