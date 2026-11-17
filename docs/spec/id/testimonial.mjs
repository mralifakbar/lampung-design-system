export default {
  summary: 'Apa yang dikatakan satu orang sungguhan tentang layanan, dengan nama dan perannya. Sengaja tenang: kata-katanya yang membawa. Terbitkan hanya kutipan asli; selama merancang, beri label konten contoh pada placeholder di tempat pembaca melihatnya.',
  when: [
    'Halaman landing atau halaman layanan dengan kutipan dari warga atau pengguna sungguhan yang setuju namanya dicantumkan.',
    'Studi kasus yang dibuka dengan ucapan penggunanya.',
  ],
  whenNot: [
    ['Mengutip aturan, dokumen atau sumber dalam artikel', 'quote'],
    ['Pesan dalam percakapan', 'chat-message'],
    ['Angka yang membuktikan sesuatu', 'stat-row'],
  ],
  where: 'Di [marketing section](marketing-section) di antara fitur dan tarif. Satu `testimonial--lg` selebar penuh, atau di samping dua kutipan yang lebih pendek; satu kolom di ponsel.',
  anatomy: [
    ['figure.testimonial', 'Wajib. Card di atas isian tenang.'],
    ['.testimonial--lg', 'Kutipan lebih besar, sampai 36 em per baris.'],
    ['blockquote.testimonial__quote', 'Wajib. Kata-katanya, dikutip persis.'],
    ['figcaption.testimonial__by', 'Wajib. [Avatar](avatar) (foto atau inisial) dan orangnya.'],
    ['.testimonial__name, .testimonial__role', 'Nama, lalu peran dan tempatnya.'],
  ],
  examples: [
    {
      title: 'Satu kutipan utama dan satu yang pendek',
      desc: 'Konten contoh: orang dan kata-katanya dikarang untuk menunjukkan tata letak.',
      html: `<div class="docs-col" style="width: 100%;">
  <span class="badge">Konten contoh</span>
  <figure class="testimonial testimonial--lg">
    <blockquote class="testimonial__quote">Dulu mengurus izin usaha butuh tiga kali datang ke kantor. Sekarang berkas saya lengkap dalam satu malam, dari rumah.</blockquote>
    <figcaption class="testimonial__by"><span class="avatar" aria-hidden="true">DA</span><span class="testimonial__who"><span class="testimonial__name">Dewi Anggraini</span><span class="testimonial__role">Pemilik warung makan di Kedaton, contoh</span></span></figcaption>
  </figure>
  <figure class="testimonial">
    <blockquote class="testimonial__quote">Warga kami bisa melihat sendiri laporan lampu jalan sudah sampai tahap mana.</blockquote>
    <figcaption class="testimonial__by"><span class="avatar avatar--gray" aria-hidden="true">AH</span><span class="testimonial__who"><span class="testimonial__name">Arif Hakim</span><span class="testimonial__role">Ketua RT di Way Halim, contoh</span></span></figcaption>
  </figure>
</div>`,
    },
  ],
  variants: [
    ['testimonial--lg', 'Kutipan utama: 20 sampai 26 px.'],
  ],
  motion: [
    'Statis. Boleh memudar naik sekali dengan [reveal on scroll](reveal-on-scroll), berjarak 35 ms.',
  ],
  a11y: [
    '`figure` dengan kutipan di `blockquote` dan orangnya di `figcaption`, agar atribusi terikat pada kata-katanya.',
    'Avatar inisial memakai `aria-hidden`; namanya berupa teks.',
  ],
  do: [
    'Kutip orang sungguhan dengan izin mereka dan peran mereka yang sebenarnya.',
    'Batasi kutipan pada apa yang diubah layanan ini bagi mereka.',
    'Tandai konten contoh dengan jelas selama halaman masih draf.',
  ],
  dont: [
    'Mengarang kutipan, nama, rating bintang atau logo instansi untuk halaman yang tayang.',
    'Menambah tanda kutip sebagai dekorasi atau carousel yang berputar sendiri.',
  ],
};
