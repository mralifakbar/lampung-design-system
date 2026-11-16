export default {
  summary: 'Satu bagian dari landing page atau halaman layanan: head berisi eyebrow, judul besar dan lede, di atas konten apa pun. Semua marketing section berbagi lebar dan gutter yang sama, jadi tepinya sejajar sepanjang halaman.',
  when: [
    'Setiap bagian landing page, halaman layanan atau halaman tarif setelah hero: fitur, contoh, tarif, pertanyaan.',
    'Halaman konten di luar aplikasi yang butuh suara lebih besar daripada bagian aplikasi.',
  ],
  whenNot: [
    ['Bagian halaman di dalam aplikasi', 'sections', 'Halaman aplikasi memakai head lebih kecil; judul marketing terlalu keras di samping data.'],
    ['Layar pertama halaman', 'hero'],
    ['Ajakan penutup', 'cta-band'],
  ],
  where: 'Bertumpuk di `<main>` di bawah [hero](hero). Paling lebar 1200 px dengan gutter 20 sampai 48 px, ruang 56 sampai 120 px di atas dan bawah (`msec--tight` membaginya dua). `msec--rule` menggambar garis tipis di atas, di tempat dua bagian akan tampak menyatu.',
  anatomy: [
    ['section.msec', 'Wajib. Lebar, gutter dan ritme vertikal.'],
    ['.msec--rule', 'Garis tipis di atas.'],
    ['.msec--tight', 'Ruang atas dan bawah lebih sedikit, untuk strip atau band penutup.'],
    ['.msec__head', 'Head-nya: grid, paling lebar 760 px. `--center` menengahkannya; `--row` menempatkan aksi `.msec__aside` di kanan.'],
    ['.msec__eyebrow', 'Label pendek dengan ikon yang menyebut topiknya. Bukan pil.'],
    ['h2.msec__title', 'Wajib di dalam head. 30 sampai 48 px, tracking −0.034em.'],
    ['p.msec__lede', 'Satu atau dua kalimat, maksimal 62 karakter per baris.'],
    ['.msec__aside', 'Di `msec__head--row`: satu aksi sekunder, kanan bawah; di bawah teks di ponsel.'],
  ],
  examples: [
    {
      title: 'Head dengan aksi di kanan',
      desc: 'Perkecil di bawah 760 px: aksinya pindah ke bawah lede.',
      html: `<section class="msec" aria-labelledby="ms-t" style="width: 100%; padding-block: 8px;">
  <div class="msec__head msec__head--row" style="margin-bottom: 24px;">
    <span class="msec__eyebrow"><span class="ic ic--sm" aria-hidden="true">grid_view</span>Layanan</span>
    <h2 class="msec__title" id="ms-t">Mulai dari layanan yang paling sering dipakai.</h2>
    <p class="msec__lede">Dua belas layanan administrasi kependudukan bisa diajukan dari rumah, lengkap dengan daftar dokumennya.</p>
    <a class="btn btn--secondary msec__aside" href="#ms-t">Lihat semua layanan</a>
  </div>
  <div class="link-grid">
    <a class="link-card" href="#ms-t"><span class="link-card__title">Kartu keluarga baru</span><span class="link-card__body">5 dokumen, selesai 3 hari kerja</span></a>
    <a class="link-card" href="#ms-t"><span class="link-card__title">Akta kelahiran</span><span class="link-card__body">4 dokumen, selesai 1 hari kerja</span></a>
  </div>
</section>`,
    },
    {
      title: 'Head di tengah',
      desc: 'Untuk bagian yang kontennya juga di tengah, seperti tarif.',
      html: `<section class="msec" aria-labelledby="ms2-t" style="width: 100%; padding-block: 8px;">
  <div class="msec__head msec__head--center" style="margin-bottom: 0;">
    <span class="msec__eyebrow"><span class="ic ic--sm" aria-hidden="true">wallet</span>Biaya</span>
    <h2 class="msec__title" id="ms2-t">Semua layanan ini gratis.</h2>
    <p class="msec__lede">Anda tidak perlu membayar apa pun. Jika ada yang meminta biaya, laporkan lewat kanal pengaduan.</p>
  </div>
</section>`,
    },
  ],
  variants: [
    ['msec--rule', 'Garis tipis di atas bagian.'],
    ['msec--tight', 'Sekitar setengah ruang vertikal.'],
    ['msec__head--center', 'Head di tengah.'],
    ['msec__head--row', 'Head dengan aksi samping di kanan.'],
  ],
  motion: [
    'Statis. Head boleh memudar naik sekali dengan [reveal on scroll](reveal-on-scroll) (`data-lds-reveal`); kontennya punya gerak sendiri.',
  ],
  a11y: [
    'Setiap bagian adalah `<section>` dengan `aria-labelledby` ke `h2`-nya, agar tampil di daftar landmark.',
    'Ikon eyebrow dekoratif (`aria-hidden`); teks eyebrow dibaca sebelum judul.',
  ],
  do: [
    'Variasikan isi di bawah head dari bagian ke bagian: stage hidup, list, grid, tabel.',
    'Batasi judul satu kalimat yang menyebut fakta atau hasil.',
  ],
  dont: [
    'Memberi setiap bagian head yang sama dan grid card yang sama.',
    'Menulis eyebrow dengan huruf kapital dan tracking lebar.',
    'Menyelang-nyeling warna latar bagian untuk menciptakan ritme; pakai ruang dan garis tipis.',
  ],
};
