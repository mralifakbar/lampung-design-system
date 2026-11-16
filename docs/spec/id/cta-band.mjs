export default {
  summary: 'Ajakan terakhir di landing page: judul singkat, satu baris, dan aksi utama yang sama dengan hero, di atas isian tenang. Boleh berisi satu baris yang disalin orang untuk memulai.',
  when: [
    'Akhir halaman landing atau halaman program, sebelum footer.',
    'Akhir artikel atau panduan panjang yang mengarah ke satu aksi.',
  ],
  whenNot: [
    ['Langkah berikutnya bagi orang yang sudah masuk di dalam aplikasi', 'spotlight'],
    ['Kondisi yang memengaruhi setiap halaman', 'banner'],
    ['Layar pertama', 'hero'],
  ],
  where: 'Di [marketing section](marketing-section) `msec--tight` tepat di atas [site footer](site-footer). Selebar konten penuh, teks di tengah.',
  anatomy: [
    ['.cta-band', 'Wajib. Kotak berisi, padding 40 sampai 88 px.'],
    ['h2.cta-band__title', 'Wajib. 28 sampai 46 px, satu kalimat.'],
    ['p.cta-band__body', 'Satu atau dua kalimat.'],
    ['.codeblock', 'Opsional: baris yang disalin, dengan warna dasar, paling lebar 460 px.'],
    ['.cta-band__actions', 'Aksi utama dan satu aksi sekunder.'],
  ],
  examples: [
    {
      title: 'Ajakan penutup dengan kode yang disalin',
      desc: 'Program pendataan UMKM kota sebagai contoh. Tombol salin memberi konfirmasi di tempat.',
      html: `<div class="cta-band" style="width: 100%;">
  <h2 class="cta-band__title">Daftarkan usaha Anda dalam 15 menit.</h2>
  <p class="cta-band__body">Pendaftaran gratis, dan data usaha Anda bisa diperbarui kapan saja.</p>
  <div class="codeblock"><div class="codeblock__bar"><span>Kode kelurahan Anda</span><button class="btn btn--plain btn--sm" data-lds-copy="UMKM-KDT-2026"><span class="swap" style="width: 16px; height: 16px;" aria-hidden="true"><span class="ic swap__a" style="font-size: 16px;">content_copy</span><span class="ic swap__b" style="font-size: 16px;">check</span></span><span data-lds-copy-label="Disalin">Salin</span></button></div><pre>UMKM-KDT-2026</pre></div>
  <div class="cta-band__actions"><a class="btn btn--primary btn--lg" href="#">Daftarkan usaha</a><a class="btn btn--secondary btn--lg" href="#">Lihat persyaratan</a></div>
</div>`,
    },
  ],
  motion: [
    'Statis. Boleh memudar naik sekali dengan [reveal on scroll](reveal-on-scroll).',
  ],
  a11y: [
    'Heading sungguhan, agar band ini ditemukan di daftar heading.',
    'Tombol dan tautan sungguhan; tombol salin mengumumkan "Disalin".',
  ],
  do: [
    'Ulangi aksi utama hero, dengan nama yang sama.',
    'Sebutkan di isi berapa biaya untuk memulai.',
  ],
  dont: [
    'Menambah gradien, gambar atau tombol utama kedua.',
    'Memakai label umum seperti "Mulai" atau "Selengkapnya".',
  ],
};
