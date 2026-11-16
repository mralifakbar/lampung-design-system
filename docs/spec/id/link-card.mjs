const lc = (icon, eyebrow, title, body, foot) => `<a class="link-card" href="#"><span class="link-card__eyebrow"><span class="ic ic--sm" aria-hidden="true">${icon}</span>${eyebrow}</span><span class="link-card__title">${title}</span><span class="link-card__body">${body}</span><span class="link-card__foot">${foot}<span class="ic lrow__chev" aria-hidden="true">chevron_right</span></span></a>`;

export default {
  summary: 'Kisi tujuan di atas isian tenang: setiap kartu adalah satu tautan dengan eyebrow, judul, satu baris detail, dan kaki yang chevron-nya condong ke arah tujuan.',
  when: [
    'Halaman pusat yang mengarahkan orang ke beberapa tempat dengan bobot setara: permohonan saya, laporan warga, riwayat pembayaran, pengaturan.',
    'Setiap tujuan layak diberi satu kalimat atau status ("3 berkas perlu dilengkapi", "Diperbarui hari ini").',
    'Dua sampai sekitar sembilan tujuan; kisi mengisi kolom selebar minimal 300 px.',
  ],
  whenNot: [
    ['Banyak tujuan, atau tujuan yang cukup disebut namanya', 'list', 'Baris bertautan (`a.lrow`) dengan chevron'],
    ['Satu langkah berikutnya untuk orang ini', 'spotlight'],
    ['Kotak yang menampilkan konten dan punya beberapa aksi di dalamnya', 'card'],
    ['Navigasi aplikasi yang selalu ada', 'sidebar', 'Atau [top nav](top-nav) atau [tab bar](phone-bars) ponsel'],
    ['Memilih opsi dalam formulir', 'radio-card'],
    ['Angka-angka utama', 'stat-row'],
  ],
  where: 'Di dalam [section](sections) pada halaman pusat dan dasbor, selebar kolom. Kisi memakai `auto-fill` dengan kolom minimal 300 px: satu kolom di ponsel, dua atau tiga di layar lebar.',
  anatomy: [
    ['.link-grid', 'Wajib. Kisinya, jarak 12 px.'],
    ['a.link-card', 'Wajib. Seluruh kartu adalah satu `<a href>` (atau `<button>` untuk aksi di halaman yang sama). Isian tenang, radius besar, padding 18 kali 20.'],
    ['.link-card__eyebrow', 'Opsional. Keterangan dengan ikon kecil: jenis tujuannya.'],
    ['.link-card__title', 'Wajib. Nama tujuan, ukuran headline.'],
    ['.link-card__body', 'Opsional. Satu baris detail.'],
    ['.link-card__foot', 'Opsional. Status di bagian bawah (didorong ke bawah agar kaki kartu sejajar) dengan chevron `.lrow__chev` di ujungnya.'],
  ],
  examples: [
    {
      title: 'Mau ke mana',
      desc: 'Hover (dengan mouse) memberi tint pada kartu dan menggeser chevron 3 px ke arah tujuan; menekan membuatnya sedikit tenggelam.',
      html: `<div class="link-grid" style="width: 100%;">
  ${lc('assignment', 'Perizinan', 'Izin usaha mikro', 'Tahap 2: verifikasi dokumen oleh petugas', '3 berkas perlu dilengkapi')}
  ${lc('receipt_long', 'Pembayaran', 'Pajak daerah', 'Semua tagihan dan bukti bayar sejauh ini', 'Diperbarui hari ini')}
  ${lc('campaign', 'Pengaduan', 'Laporan warga', 'Lebih dari 2.000 laporan beserta tindak lanjutnya', '18 diikuti')}
</div>`,
    },
    {
      title: 'Kartu ringkas',
      desc: 'Hanya judul dan kaki, untuk halaman pusat pengaturan.',
      html: `<div class="link-grid" style="width: 100%;">
  <a class="link-card" href="#"><span class="link-card__title">Profil</span><span class="link-card__foot">Nama, foto, alamat<span class="ic lrow__chev" aria-hidden="true">chevron_right</span></span></a>
  <a class="link-card" href="#"><span class="link-card__title">Notifikasi</span><span class="link-card__foot">Email dan push<span class="ic lrow__chev" aria-hidden="true">chevron_right</span></span></a>
  <a class="link-card" href="#"><span class="link-card__title">Tagihan</span><span class="link-card__foot">Jatuh tempo 31 Desember<span class="ic lrow__chev" aria-hidden="true">chevron_right</span></span></a>
</div>`,
    },
  ],
  states: [
    ['hover (fine pointer)', 'Latar menebal ke `--bg-tint-strong`; chevron bergeser 3 px ke kanan dan berwarna aksen.'],
    [':active', 'Kartu tenggelam ke 0,985 dalam `--d-instant` (120 ms).'],
    ['focus-visible', 'Focus ring sistem di sekeliling kartu.'],
  ],
  motion: [
    'Hover: latar dalam `--d-fast` (160 ms) dengan `--ease-standard`; chevron `translateX(3px)` dengan `--spring-snappy` (360 ms). Hanya di perangkat dengan hover dan pointer presisi, agar layar sentuh tidak tersangkut di status hover.',
    'Tekan: `scale(0.985)` (target lebar hanya sedikit tenggelam), kembali dengan `--spring-snappy`. Lihat [press feedback](press-feedback).',
    'Kartu dalam kisi yang dimuat boleh masuk sekali dengan [list stagger](list-stagger); jangan setiap kali halaman dikunjungi.',
    'Reduced motion: transisi menjadi 120 ms linear; tanpa perpindahan.',
  ],
  a11y: [
    'Satu tautan per kartu: seluruh kartu adalah `<a>`, jadi namanya adalah teks di dalamnya. Jangan sarangkan tautan atau tombol lain di dalamnya.',
    'Letakkan judul pertama dalam urutan baca setelah eyebrow, dan buat singkat, agar nama tautan dimulai dengan tujuannya.',
    'Chevron bersifat dekoratif (`aria-hidden`).',
  ],
  do: [
    'Tulis kaki kartu sebagai fakta tentang tujuannya ("3 berkas perlu dilengkapi").',
    'Kelompokkan kartu sejenis dalam satu kisi; jenis yang berbeda di section terpisah.',
  ],
  dont: [
    'Menambah gambar, bayangan, atau border agar satu kartu menonjol; pakai [spotlight](spotlight) untuk yang paling penting.',
    'Menaruh tombol di dalam link card.',
    'Membuat link card yang bukan tautan (`div` tidak mendapat hover atau efek tekan).',
  ],
};
