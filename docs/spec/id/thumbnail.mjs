// Example pictures drawn as small SVGs so the docs need no image files.
const pic = (bg, shapes, w = 800, h = 600) => 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}"><rect width="${w}" height="${h}" fill="${bg}"/>${shapes}</svg>`);
const library = pic('#DCE7F7', `<rect x="0" y="420" width="800" height="180" fill="#B9CBE8"/><rect x="90" y="140" width="620" height="300" fill="#F4F6FA"/><rect x="90" y="110" width="620" height="40" fill="#0B6E4F"/>${[0, 1, 2, 3, 4].map((i) => `<rect x="${130 + i * 115}" y="200" width="70" height="180" fill="#9DB4DC"/>`).join('')}<rect x="360" y="330" width="80" height="110" fill="#1C1C20"/>`);
const lab = pic('#E6F4F1', `<rect x="0" y="400" width="800" height="200" fill="#C3E3DC"/><rect x="120" y="300" width="560" height="30" fill="#0E9F8E"/><rect x="180" y="200" width="120" height="100" rx="8" fill="#1C1C20"/><rect x="340" y="190" width="140" height="110" rx="8" fill="#1C1C20"/><rect x="520" y="210" width="110" height="90" rx="8" fill="#1C1C20"/><rect x="192" y="212" width="96" height="70" fill="#2BB585"/><rect x="352" y="202" width="116" height="86" fill="#2BB585"/><rect x="532" y="222" width="86" height="66" fill="#2BB585"/>`);
const hall = pic('#F7EEDF', `<rect x="0" y="380" width="800" height="220" fill="#EBD7B5"/>${[0, 1, 2, 3].map((r) => [0, 1, 2, 3, 4, 5].map((c) => `<rect x="${110 + c * 100}" y="${250 + r * 60}" width="70" height="34" rx="6" fill="#C2410C" opacity="${0.55 + r * 0.12}"/>`).join('')).join('')}<rect x="250" y="110" width="300" height="100" fill="#FFFFFF"/>`);
const thumb = (src, caption, ratio) => `<a class="thumb" href="${src}" data-lds-lightbox data-caption="${caption}"${ratio ? ` style="--ratio: ${ratio};"` : ''}><img src="${src}" alt="${caption}"></a>`;

export default {
  summary: 'Pratinjau gambar yang dipotong dengan rasio tetap (bawaan 4:3) di atas placeholder cekung. Sebagai tautan dengan `data-lds-lightbox`, ia membuka gambar penuh di [lightbox](lightbox) yang tumbuh dari thumbnail.',
  when: [
    'Foto dan tangkapan layar di dalam konten: lampiran laporan warga, foto lokasi layanan, gambar di panduan layanan.',
    'Grid gambar yang mungkin ingin dilihat lebih besar (`auto-grid` berisi `.thumb`).',
  ],
  whenNot: [
    ['Foto orang atau logo organisasi', 'avatar'],
    ['Gambar di atas card yang tidak bisa dibuka', 'card', 'Pakai `card__media` di dalam card.'],
    ['Berkas yang bukan gambar (PDF, spreadsheet)', 'file-input', 'Tampilkan sebagai baris berkas dengan ikon, nama dan ukurannya.'],
    ['Deretan gambar yang digulir ke samping', 'carousel'],
    ['Penampil layar penuhnya sendiri', 'lightbox'],
  ],
  where: 'Di [prose](prose) selebar bacaan penuh, di `auto-grid` dengan `--min` sekitar 160 px untuk galeri, atau di samping teks dalam baris list dengan lebar tetap. Di ponsel galeri turun menjadi dua kolom dengan `--min: 140px`.',
  anatomy: [
    ['.thumb', 'Wajib. `<a href="large.jpg">` jika bisa dibuka, `<div>` jika tidak. Memotong gambar sesuai `--r-md` dan mempertahankan `--ratio` (bawaan `4 / 3`).'],
    ['img', 'Wajib. `alt` menjelaskan gambar; `object-fit: cover` memotongnya sesuai rasio.'],
    ['data-lds-lightbox', 'Pada tautan: membuka `href` di lightbox. `data-caption` mengatur keterangan dan nama dialog; `data-close` mengganti label tombol tutup.'],
    ['--ratio', 'Opsional. `1` untuk persegi, `16 / 9` untuk tangkapan layar dan cuplikan video.'],
  ],
  examples: [
    {
      title: 'Galeri',
      desc: 'Klik gambar: ia tumbuh menjadi lightbox dari posisinya dan menyusut kembali saat ditutup (Escape, tombol tutup atau klik di luar).',
      html: `<div class="auto-grid" style="--min: 160px;">
  ${thumb(library, 'Kantor Kelurahan Way Halim, tampak depan')}
  ${thumb(lab, 'Loket layanan, Mal Pelayanan Publik')}
  ${thumb(hall, 'Ruang tunggu Disdukcapil')}
</div>`,
      code: `<div class="auto-grid" style="--min: 160px;">
  <a class="thumb" href="office-large.jpg" data-lds-lightbox data-caption="Kantor Kelurahan Way Halim, tampak depan"><img src="office-small.jpg" alt="Kantor Kelurahan Way Halim, tampak depan"></a>
  <a class="thumb" href="counters-large.jpg" data-lds-lightbox data-caption="Loket layanan, Mal Pelayanan Publik"><img src="counters-small.jpg" alt="Loket layanan, Mal Pelayanan Publik"></a>
</div>`,
    },
    {
      title: 'Rasio',
      desc: 'Persegi untuk grid mirip profil, 16:9 untuk tangkapan layar. Warna placeholder tampil selama gambar dimuat.',
      html: `<div class="cluster" style="--gap: 12px; align-items: flex-start;">
  <div style="width: 140px;">${thumb(hall, 'Ruang tunggu Disdukcapil', '1')}</div>
  <div style="width: 260px;">${thumb(lab, 'Loket layanan, Mal Pelayanan Publik', '16 / 9')}</div>
  <div class="thumb" style="width: 180px;" role="img" aria-label="Foto masih dimuat"></div>
</div>`,
    },
  ],
  states: [
    ['loading', '`.thumb` kosong menampilkan `--bg-recessed` dengan ukuran akhirnya, jadi tidak ada yang melompat saat gambar datang. Tambahkan `loading="lazy"` pada gambar.'],
    ['hover', 'Di perangkat yang mendukung hover, gambar membesar ke 1,03 di dalam bingkainya dengan `--spring-smooth`.'],
    ['open', 'Lightbox berupa `role="dialog"` di atas halaman; thumbnail mendapat fokus kembali saat ditutup.'],
  ],
  motion: [
    'Hover: `transform: scale(1.03)` pada gambar selama `--d-smooth` dengan `--spring-smooth`; bingkainya tidak bergerak.',
    'Buka: gambar penuh beranimasi dari kotak thumbnail ke kotaknya sendiri (transform FLIP) selama 420 ms dengan kurva masuk, sementara scrim memudar masuk selama `--d-standard`. Tutup menjalankannya terbalik dalam 220 ms dengan `--ease-exit`.',
    'Reduced motion: tanpa membesar atau menyusut; lightbox muncul dan hilang hanya dengan fade scrim.',
  ],
  a11y: [
    'Setiap `img` punya teks `alt` yang menjelaskannya; lightbox memakainya ulang.',
    'Tautan adalah kontrolnya: bisa difokus dan dibuka dengan Enter. Namanya berasal dari `alt` gambar.',
    'Di lightbox fokus pindah ke tombol tutup, Tab tetap di sana, Escape menutup, dan fokus kembali ke thumbnail.',
    'Gambar dekoratif tidak cocok untuk thumbnail; pakai `alt=""` tanpa tautan.',
  ],
  do: [
    'Sajikan berkas kecil di `src` dan berkas besar di `href`.',
    'Pakai satu rasio dalam satu galeri.',
    'Tulis keterangan yang menyebut apa dan di mana.',
  ],
  dont: [
    'Menambah border, bayangan atau radius berbeda pada `.thumb`.',
    'Membungkus thumbnail dengan [card](card) hanya untuk membingkainya.',
    'Membuka berkas bukan gambar dengan `data-lds-lightbox`.',
  ],
  js: '`data-lds-lightbox` pada `<a class="thumb" href>` yang membungkus `<img>`. `init()` membangun lightbox saat diklik (`role="dialog"`, `aria-modal`, tombol tutup, keterangan opsional), menganimasikannya dari thumbnail dan kembali, menutup dengan Escape atau klik di luar, dan mengembalikan fokus.',
};
