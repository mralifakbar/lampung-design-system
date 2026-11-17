export default {
  summary: 'Langkah bernomor dari urutan tetap dengan bilah yang terisi saat setiap langkah selesai. Menunjukkan posisi orang dalam sebuah alur dan berapa yang tersisa.',
  when: [
    'Alur dengan tiga sampai lima langkah tetap yang dikerjakan berurutan: permohonan izin (data diri, data usaha, pembayaran, tinjau), pencatatan kelahiran, pendaftaran UMKM.',
    'Orang terbantu dengan mengetahui berapa langkah lagi sebelum mereka mengirim.',
  ],
  whenNot: [
    ['Bagian yang dikunjungi dalam urutan bebas', 'tabs'],
    ['Petunjuk atau persyaratan untuk dibaca, bukan alur untuk dilalui', 'list', 'Pakai baris bernomor (`.lrow--num`) di list'],
    ['Peristiwa yang sudah terjadi dalam waktu', 'timeline'],
    ['Kemajuan satu tugas yang berjalan sendiri', 'progress-bar'],
    ['Materi dalam modul pelatihan, sebagian sudah selesai', 'app-shell', 'Pakai tautan anak bernomor dengan tanda selesai di shell'],
  ],
  where: 'Di atas alur, di bawah judul halaman, selebar kolom formulir. Tombol kembali dan lanjut berada di bawah formulir, bukan di samping langkah. Di ponsel dengan label panjang, buat titik dan label tetap pendek (satu atau dua kata) atau tampilkan teks "Langkah 2 dari 4" saja.',
  anatomy: [
    ['ol.steps', 'Wajib. Barisnya, dengan `aria-label`.'],
    ['li.step', 'Wajib. Satu langkah; `.is-done` sebelum yang aktif, `.is-current` pada yang aktif dengan `aria-current="step"`.'],
    ['.step__head', 'Wajib. Titik dan bilah ke langkah berikutnya.'],
    ['.step__dot', 'Wajib. Lingkaran 28 px berisi nomor, atau ikon `check` setelah selesai.'],
    ['.step__bar', 'Penghubung ke langkah berikutnya; terisi warna aksen saat langkah selesai. Hilangkan pada langkah terakhir.'],
    ['.step__label', 'Wajib. Nama langkah.'],
    ['.step__sub', 'Baris kedua opsional: apa yang diminta langkah ini.'],
  ],
  examples: [
    {
      title: 'Permohonan izin usaha',
      desc: 'Langkah 2 dari 4. Tekan Lanjutkan untuk menyelesaikan langkah: bilah terisi, lalu titik berubah menjadi centang.',
      html: `<div class="stack" style="--gap: 24px;">
  <ol class="steps" aria-label="Kemajuan permohonan" id="st-demo">
    <li class="step is-done"><div class="step__head"><span class="step__dot"><span class="ic" aria-hidden="true">check</span></span><span class="step__bar"></span></div><span class="step__label">Data diri</span><span class="step__sub">Nama dan kontak</span></li>
    <li class="step is-current" aria-current="step"><div class="step__head"><span class="step__dot">2</span><span class="step__bar"></span></div><span class="step__label">Data usaha</span><span class="step__sub">Jenis dan lokasi usaha</span></li>
    <li class="step"><div class="step__head"><span class="step__dot">3</span><span class="step__bar"></span></div><span class="step__label">Pembayaran</span><span class="step__sub">Retribusi dan biaya</span></li>
    <li class="step"><div class="step__head"><span class="step__dot">4</span></div><span class="step__label">Tinjau</span><span class="step__sub">Periksa dan kirim</span></li>
  </ol>
  <div class="cluster">
    <button class="btn btn--primary btn--md" onclick="const c = document.querySelector('#st-demo .is-current'); if (!c) return; c.classList.replace('is-current', 'is-done'); c.removeAttribute('aria-current'); c.querySelector('.step__dot').innerHTML = '&lt;span class=&quot;ic&quot; aria-hidden=&quot;true&quot;&gt;check&lt;/span&gt;'; const n = c.nextElementSibling; if (n) { n.classList.add('is-current'); n.setAttribute('aria-current', 'step'); }">Lanjutkan</button>
  </div>
</div>`,
      code: `<ol class="steps" aria-label="Kemajuan permohonan">
  <li class="step is-done">
    <div class="step__head"><span class="step__dot"><span class="ic" aria-hidden="true">check</span></span><span class="step__bar"></span></div>
    <span class="step__label">Data diri</span><span class="step__sub">Nama dan kontak</span>
  </li>
  <li class="step is-current" aria-current="step">
    <div class="step__head"><span class="step__dot">2</span><span class="step__bar"></span></div>
    <span class="step__label">Data usaha</span><span class="step__sub">Jenis dan lokasi usaha</span>
  </li>
  <li class="step">
    <div class="step__head"><span class="step__dot">3</span></div>
    <span class="step__label">Pembayaran</span><span class="step__sub">Retribusi dan biaya</span>
  </li>
</ol>`,
    },
    {
      title: 'Hanya label',
      desc: 'Tiga langkah pendek tanpa baris kedua.',
      html: `<ol class="steps" aria-label="Penerbitan pengumuman">
  <li class="step is-done"><div class="step__head"><span class="step__dot"><span class="ic" aria-hidden="true">check</span></span><span class="step__bar"></span></div><span class="step__label">Isi</span></li>
  <li class="step is-done"><div class="step__head"><span class="step__dot"><span class="ic" aria-hidden="true">check</span></span><span class="step__bar"></span></div><span class="step__label">Jadwal</span></li>
  <li class="step is-current" aria-current="step"><div class="step__head"><span class="step__dot">3</span></div><span class="step__label">Terbitkan</span></li>
</ol>`,
    },
  ],
  states: [
    ['(upcoming)', 'Titik bergaris dengan nomor, label diredam.'],
    ['.is-current', 'Cincin aksen 2 px dan nomor beraksen; label tegas; `aria-current="step"`.'],
    ['.is-done', 'Titik aksen terisi dengan centang, label tegas, bilah ke langkah berikutnya terisi.'],
  ],
  motion: [
    'Bilah: terisi dari kiri ke kanan dengan `scaleX(0)` ke `scaleX(1)` selama `--d-considered` (480 ms) dengan `--ease-inout`, karena ini sesuatu yang sudah ada di layar dan bergerak.',
    'Titik: latar, warna, dan cincin berubah halus selama `--d-standard` (240 ms). Kembali ke langkah sebelumnya membalik keduanya, karena berupa transisi.',
    'Reduced motion: keduanya turun ke 120 ms linear.',
  ],
  a11y: [
    '`<ol>` dengan `aria-label`, sehingga jumlah dan urutannya diumumkan.',
    'Langkah aktif memiliki `aria-current="step"`. Langkah yang selesai sebaiknya menyebutkannya dalam teks untuk pembaca layar jika centang satu-satunya tanda (tambahkan `.sr-only` "selesai").',
    'Langkah bukan tombol secara bawaan; jika orang boleh kembali ke langkah yang selesai, jadikan labelnya tautan atau tombol.',
    'Pindahkan fokus ke heading langkah baru saat muncul.',
  ],
  do: [
    'Batasi tiga sampai lima langkah dengan label satu atau dua kata.',
    'Biarkan orang kembali tanpa kehilangan isian mereka.',
  ],
  dont: [
    'Memakai steps untuk alur bercabang atau dengan langkah opsional.',
    'Menaruh tombol kembali dan lanjut di dalam baris steps.',
    'Menampilkan steps untuk formulir satu layar.',
  ],
  js: 'Tidak ada. Pindahkan `.is-done`, `.is-current`, dan `aria-current="step"` dari kode Anda; ganti nomor dengan ikon `check` saat langkah selesai.',
  react: `import { Steps } from 'lampung-design-system/react';

<Steps label="Kemajuan permohonan" current={1} items={['Data diri', 'Data usaha', 'Pembayaran', 'Tinjau']} />`,
};
