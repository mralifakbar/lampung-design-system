export default {
  summary: 'Kartu pratinjau di bawah tautan setelah hover 600 ms atau saat fokus: siapa seseorang, apa isi sebuah layanan. Kartu ini menghemat satu klik; jangan pernah menjadi satu-satunya tempat sebuah informasi.',
  when: [
    'Sebutan atau tautan ke orang, layanan, atau dokumen yang cukup dilihat sekilas tanpa dibuka: nama petugas, kode layanan di tabel.',
    'Daftar padat tempat orang memindai banyak tautan dan butuh konteks sebelum memilih salah satu.',
  ],
  whenNot: [
    ['Nama atau pintasan satu baris untuk sebuah kontrol', 'tooltip'],
    ['Konten yang perlu diklik atau diedit', 'popover', 'Popover terbuka saat diklik dan tetap ada sampai ditutup'],
    ['Perintah untuk item tersebut', 'dropdown-menu'],
    ['Layar yang mengutamakan sentuhan', 'sheet', 'Layar sentuh tidak punya hover; buka sheet atau halamannya saat diketuk'],
  ],
  where: '10 px di bawah tautan, rata dengan tepi kirinya, lebar 280 px. Sisakan ruang di bawahnya; kartu tidak berbalik arah.',
  anatomy: [
    ['.tip-host', 'Wajib. Membungkus tautan dan kartu; menampilkan kartu saat hover dan fokus.'],
    ['a.link', 'Wajib. Pemicu: tautan asli ke halaman lengkap.'],
    ['.hovercard', 'Wajib. Kartunya: 280 px, padding 16 px, terangkat. Isinya singkat: judul, satu baris, mungkin avatar.'],
  ],
  examples: [
    {
      title: 'Sebutan nama petugas',
      desc: 'Arahkan kursor atau tekan Tab ke nama: kartu menunggu 600 ms, lalu naik masuk.',
      html: `<p class="section__sub" style="align-self: flex-start;">Pertanyaan tentang berkas izin ditujukan kepada
  <span class="tip-host"><a class="link" href="#hc" aria-describedby="hc-1">Ayu Lestari</a><span class="hovercard" role="tooltip" id="hc-1"><span class="card__title" style="display: block;">Ayu Lestari</span><span class="card__sub" style="display: block;">Petugas verifikasi, loket perizinan. Jam layanan Selasa 13.00 sampai 15.00.</span></span></span>
  sebelum hari Jumat.</p>`,
    },
    {
      title: 'Kode layanan di sel tabel',
      desc: 'Pratinjau singkat dengan tanda mirip avatar.',
      html: `<span class="tip-host" style="align-self: flex-start;"><a class="link" href="#hc" aria-describedby="hc-2">IUM 2104</a><span class="hovercard" role="tooltip" id="hc-2"><span class="cluster" style="--gap: 12px; flex-wrap: nowrap;"><span class="avatar avatar--sq" aria-hidden="true">IU</span><span><span class="card__title" style="display: block;">Izin usaha mikro</span><span class="card__sub" style="display: block;">Selesai 3 hari kerja · 48 permohonan</span></span></span></span></span>`,
    },
  ],
  variants: [
    ['.hovercard', 'Terbuka di bawah pemicu, rata dengan tepi awalnya. Lebar 280 px, tidak pernah lebih lebar dari layar dikurangi 32 px.'],
    ['.hovercard--end', 'Rata dengan tepi akhir pemicu. Pakai saat pemicu berada di separuh kanan kolomnya, agar kartu terbuka ke ruang kosong dan tidak melewati tepi.'],
  ],
  states: [
    [':hover / :focus-within', 'Muncul setelah 600 ms; tetap tampil selama pointer berada di atas tautan atau kartu.'],
    ['leaving', 'Hilang setelah 150 ms, agar pointer sempat berpindah dari tautan ke kartu.'],
  ],
  motion: [
    'Masuk: menunggu 600 ms, lalu opacity selama `--d-fast` dengan `--ease-enter` dan dari `translateY(-4px) scale(0.97)` dengan `--spring-smooth`, tumbuh dari kiri atas.',
    'Keluar: setelah jeda 150 ms, 120 ms dengan `--ease-exit`.',
    'Reduced motion: jeda tetap, transisi turun menjadi 120 ms linear.',
  ],
  a11y: [
    'Tautan berfungsi sendiri dan menuju halaman lengkap; kartu hanya pratinjau.',
    'Kartu juga muncul saat fokus keyboard. Hubungkan dengan `aria-describedby` agar ringkasannya dibacakan setelah nama tautan.',
    'Jangan taruh elemen interaktif di dalamnya: kartu ini `role="tooltip"` dan pengguna keyboard tidak bisa masuk ke dalamnya.',
  ],
  do: [
    'Tampilkan dua atau tiga fakta yang membantu orang memutuskan apakah perlu membuka tautan.',
    'Pakai di tempat orang mengarahkan kursor ke banyak tautan sekaligus.',
  ],
  dont: [
    'Menaruh tombol ("Ikuti", "Kirim pesan") di hover card.',
    'Memakainya untuk informasi yang wajib dibaca.',
  ],
};
