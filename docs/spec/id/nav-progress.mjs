export default {
  summary: 'Bilah aksen setinggi 3 px di tepi atas jendela yang berjalan selama halaman berikutnya dimuat. Tambahkan `.is-running` saat navigasi dimulai, hapus saat halaman sudah tampil.',
  when: [
    'Navigasi sisi klien (single-page app atau router framework) yang halaman berikutnya bisa butuh lebih dari sekitar 300 ms untuk tiba.',
    'Pergantian halaman penuh yang halaman lamanya tetap terlihat sampai halaman baru siap.',
  ],
  whenNot: [
    ['Kemajuan tugas dengan persentase yang diketahui (unggah, impor)', 'progress-bar'],
    ['Satu area halaman yang sedang memuat isinya', 'skeleton', 'Tampilkan bentuk konten yang akan datang di tempatnya'],
    ['Tombol yang menunggu aksinya selesai', 'button', 'Pakai status loading pada tombol'],
    ['Menunggu balasan asisten', 'thinking'],
  ],
  where: 'Satu per aplikasi, menempel di atas viewport (`position: fixed`, z-index 90), di atas top bar atau app shell. Render sekali di root dan ubah kelasnya dari router.',
  anatomy: [
    ['.navprogress', 'Wajib. Elemen kosong (`<div>`), `aria-hidden="true"`; berskala 0 dan transparan saat diam.'],
    ['.navprogress.is-running', 'Tampil dan melebar perlahan menuju 85 % lebar selama navigasi berjalan.'],
  ],
  examples: [
    {
      title: 'Membuka tahap berikutnya',
      desc: 'Bilah berjalan di tepi atas kotak ini selama "halaman" dimuat, lalu hilang. Di aplikasi, bilah berada di atas jendela.',
      html: `<div class="navprogress" aria-hidden="true" id="np-bar"></div>
<div class="docs-col">
  <button class="btn btn--primary btn--md" style="align-self: flex-start;" onclick="const b = document.getElementById('np-bar'); const s = document.getElementById('np-status'); b.classList.add('is-running'); s.textContent = 'Memuat tahap 4'; this.disabled = true; setTimeout(() => { b.classList.remove('is-running'); s.textContent = 'Tahap 4 terbuka'; this.disabled = false; }, 1800);">Buka tahap 4</button>
  <p class="section__sub" id="np-status" role="status">Tahap 3 terbuka</p>
</div>`,
      code: `<div class="navprogress" aria-hidden="true"></div>

<script type="module">
  const bar = document.querySelector('.navprogress');
  router.on('start', () => bar.classList.add('is-running'));
  router.on('done', () => bar.classList.remove('is-running'));
</script>`,
    },
  ],
  states: [
    ['(idle)', '`scaleX(0)`, transparan.'],
    ['.is-running', 'Menjadi pekat dalam 80 ms, lalu melebar ke `scaleX(0.85)` selama 2,4 detik dengan kurva yang cepat di awal lalu melambat, sehingga pemuatan yang lambat tidak pernah tampak selesai.'],
    ['(removed)', 'Memudar selama 240 ms setelah jeda 120 ms dengan `--ease-exit`, sementara skala kembali ke 0 dalam 200 ms.'],
  ],
  motion: [
    'Tumbuh dari kiri (`transform-origin: 0 50%`) hanya dengan `transform: scaleX()`, sehingga tidak pernah memicu layout.',
    'Berjalan: `scaleX(0.85)` selama 2,4 detik dengan `cubic-bezier(0.1, 0.7, 0.2, 1)`; opacity masuk 80 ms linear.',
    'Selesai: menghapus `.is-running` mengembalikan skala ke 0 dalam 200 ms dengan `--ease-standard` dan memudarkannya selama 240 ms (jeda 120 ms) dengan `--ease-exit`. Tidak ada langkah "penuhkan ke 100 %" terpisah di CSS.',
    'Mulai hanya jika navigasi masih berjalan setelah sekitar 150 ms, agar halaman yang cepat tidak memunculkan kedipan.',
    'Reduced motion: bilah selebar penuh dan hanya muncul serta memudar (120 ms linear).',
  ],
  a11y: [
    'Dekoratif: `aria-hidden="true"`. Umumkan halaman baru dengan memindahkan fokus ke `<h1>` atau `<main>`, atau perbarui judul dokumen.',
    'Jangan jadikan satu-satunya tanda pemuatan untuk sesuatu yang ditunggu di dalam halaman; di sana pakai [skeleton](skeleton) atau tombol loading.',
  ],
  do: [
    'Render tepat satu di root aplikasi.',
    'Tunda awalnya sekitar 150 ms.',
  ],
  dont: [
    'Menampilkan spinner layar penuh di antara halaman.',
    'Mengatur lebar dari persentase palsu lewat JavaScript.',
    'Memakainya untuk unggahan atau tugas lain yang punya kemajuan nyata.',
  ],
  js: 'Tidak ada; dikendalikan CSS. Ubah `.is-running` dari router Anda.',
};
