export default {
  summary: 'Bagian atas halaman produk atau landing page: satu judul utama, satu baris di bawahnya, paling banyak dua aksi, dan layanannya sendiri di samping atau di bawah. Layanan ditampilkan sedang berjalan, bukan sebagai gambar layar.',
  when: [
    'Layar pertama halaman landing, halaman layanan atau halaman tarif yang ada di depan sebuah aplikasi.',
    'Halaman peluncuran untuk satu fitur, saat fitur itu bisa berjalan langsung di samping judul.',
  ],
  whenNot: [
    ['Bagian atas halaman di dalam aplikasi', 'page-header', 'Di dalam aplikasi orang sudah tahu posisinya; yang dibutuhkan judul dan aksinya.'],
    ['Satu langkah berikutnya bagi orang yang sudah masuk', 'spotlight'],
    ['Ajakan penutup di bawah halaman', 'cta-band'],
  ],
  where: 'Tepat di bawah [top nav](top-nav), selebar konten penuh (1200 px, gutter yang sama dengan setiap [marketing section](marketing-section)). `hero--split` menempatkan teks dan layanan berdampingan mulai 1024 px; di bawahnya layanan mengikuti teks. Di ponsel aksi bertumpuk jika tidak muat.',
  anatomy: [
    ['section.hero', 'Wajib. Grid-nya; `aria-labelledby` ke judul.'],
    ['.hero--split', 'Teks di kiri, layanan di kanan, mulai 1024 px.'],
    ['.hero--center', 'Teks di tengah di atas layanan yang lebar di bawahnya.'],
    ['.hero--enter', 'Teks mengendap sekali saat pertama dimuat, berjarak 60 ms, lalu tidak ada yang bergerak sendiri.'],
    ['.hero__copy', 'Wajib. Berisi judul, lede, aksi dan catatan.'],
    ['h1.hero__title', 'Wajib. 40 sampai 68 px, tracking −0.042em, baris seimbang. Satu kalimat yang menyebut apa yang didapat orang.'],
    ['.hero__quiet', 'Kalimat kedua opsional di dalam judul dengan warna redup.'],
    ['p.hero__lede', 'Satu sampai tiga kalimat berisi fakta di balik judul.'],
    ['.hero__actions', 'Satu tombol utama, paling banyak satu sekunder.'],
    ['.hero__note', 'Baris pendek di bawah aksi: pintasan, layanan gratis, persyaratan.'],
    ['.hero__media', 'Layanannya: komponen hidup di [feature stage](feature-row), demo yang berjalan.'],
  ],
  examples: [
    {
      title: 'Split, dengan layanan yang berjalan',
      desc: 'Stage di kanan berisi komponen sungguhan. Tahan tombol untuk membayar; switch membunyikan lonceng.',
      html: `<section class="hero hero--split hero--enter" aria-labelledby="hx-t" style="width: 100%; padding-block: 24px;">
  <div class="hero__copy">
    <h1 class="hero__title" id="hx-t">Bayar pajak kendaraan tanpa antre.</h1>
    <p class="hero__lede">Masukkan nomor polisi, periksa rincian tagihan, lalu bayar dari rumah. Bukti bayar langsung terkirim ke email Anda.</p>
    <div class="hero__actions"><a class="btn btn--primary btn--lg" href="#hx-t">Cek tagihan</a><a class="btn btn--secondary btn--lg" href="#hx-t">Lihat persyaratan</a></div>
    <p class="hero__note">Tanpa biaya layanan tambahan.</p>
  </div>
  <div class="hero__media">
    <div class="feature__stage">
      <div class="card" style="display: grid; gap: 16px;">
        <div><div class="card__title">BE 1234 AB</div><div class="card__sub">Pajak tahunan, jatuh tempo 28 November 2026</div></div>
        <div class="stat-row-wrap"><dl class="stat-row" style="--n: 2"><div class="stat-row__item"><dt class="stat-row__label">Total tagihan</dt><dd class="stat-row__value">Rp 1.245.000</dd><dd class="stat-row__sub">Termasuk SWDKLLJ</dd></div><div class="stat-row__item"><dt class="stat-row__label">Sisa hari</dt><dd class="stat-row__value">12</dd><dd class="stat-row__sub">Sebelum kena denda</dd></div></dl></div>
        <label class="switch"><input type="checkbox" role="switch"><span class="switch__track" aria-hidden="true"><span class="switch__thumb"></span></span><span class="bell ic" aria-hidden="true">notifications</span>Kabari saya saat pembayaran diterima</label>
        <button class="btn btn--primary hold" data-lds-hold><span class="hold__fill" aria-hidden="true"></span><span class="ic" aria-hidden="true">wallet</span><span>Tahan untuk membayar Rp 1.245.000</span></button>
      </div>
    </div>
  </div>
</section>`,
    },
    {
      title: 'Di tengah',
      desc: 'Untuk judul yang membawa halaman sendirian, dengan layanannya di stage lebar di bawah.',
      html: `<section class="hero hero--center" aria-labelledby="hx2-t" style="width: 100%; padding-block: 24px;">
  <div class="hero__copy">
    <h1 class="hero__title" id="hx2-t">Laporkan jalan rusak dalam satu menit. <span class="hero__quiet">Lengkap dengan foto dan lokasi.</span></h1>
    <p class="hero__lede">Foto, titik lokasi dan kategori ada dalam satu formulir, dan Anda bisa mengikuti penanganannya sampai selesai.</p>
    <div class="hero__actions"><a class="btn btn--primary btn--lg" href="#hx2-t">Buat laporan</a></div>
  </div>
</section>`,
    },
  ],
  variants: [
    ['hero--split', 'Teks dan layanan berdampingan mulai 1024 px.'],
    ['hero--center', 'Teks di tengah, paling lebar 860 px.'],
    ['hero--enter', 'Satu stagger singkat saat pertama dimuat.'],
  ],
  states: [
    ['first load', 'Dengan `hero--enter` teks lalu media naik 4 px dari blur 4 px selama `--d-smooth`, berjarak 60 ms.'],
  ],
  motion: [
    '`hero--enter`: `lds-blur-in` selama 560 ms dengan `--ease-enter`, jeda 0, 60, 120, 180 ms untuk teks dan 240 ms untuk media. Diputar sekali; seluruh stagger tetap di bawah 400 ms.',
    'Tidak ada yang berulang. Layanan yang hidup hanya bergerak saat seseorang memakainya.',
    'Reduced motion: fade 120 ms tanpa jeda.',
  ],
  a11y: [
    'Judulnya adalah `h1` halaman; section diberi label olehnya.',
    'Komponen hidup di media tetap memakai label dan perilaku keyboard-nya sendiri; sebutkan di keterangan apa yang bisa dicoba.',
    'Warna judul `--text-strong`, bagian redup `--text-subtle` (6,6:1 di atas putih, 7,7:1 di atas kanvas gelap).',
  ],
  do: [
    'Sebut hasilnya di judul dan faktanya di lede.',
    'Tampilkan layanan sungguhan yang sedang berjalan.',
    'Namai tombol utama sesuai yang terjadi ("Cek tagihan", "Buat laporan").',
  ],
  dont: [
    'Menaruh badge pil di atas judul yang mengulang judulnya.',
    'Memakai tangkapan layar, terminal tiruan atau ilustrasi saat layanannya bisa dijalankan.',
    'Menambah tombol ketiga atau efek latar.',
  ],
};
