export default {
  summary: 'Satu baris berwarna terbalik tentang seluruh aplikasi: offline, pemeliharaan, melihat sebagai orang lain. Menyebut kondisinya dan menawarkan paling banyak satu aksi.',
  when: [
    'Kondisi yang memengaruhi setiap halaman sampai berubah: koneksi terputus, layanan sedang pemeliharaan dan hanya bisa dibaca, masa uji coba berakhir tiga hari lagi.',
    'Orang berada dalam mode yang mengubah apa yang dilihatnya: pratinjau sebagai warga, menyunting draf jadwal.',
  ],
  whenNot: [
    ['Pesannya hanya tentang halaman atau formulir ini', 'alert'],
    ['Mengonfirmasi aksi yang baru saja terjadi', 'toast'],
    ['Halaman sedang dimuat setelah tautan diklik', 'nav-progress'],
    ['Menonjolkan satu langkah berikutnya di dasbor', 'spotlight'],
    ['Tips tentang sebuah fitur', 'hints'],
  ],
  where: 'Di bagian atas area konten, di bawah [top nav](top-nav) atau bar atas app shell, selebar kolom konten. Di ponsel berada di bawah bar navigasi, atau tepat di atas tab bar jika menyangkut hal yang sedang dilakukan orang (offline saat menulis). Hanya satu banner dalam satu waktu.',
  anatomy: [
    ['.banner', 'Wajib. Baris berwarna terbalik (gelap di mode terang, terang di dark mode), radius 14 px, teks medium 14 px.'],
    ['.ic', 'Ikon depan opsional yang menyebut kondisinya (`cloud_off`, `wifi_off`, `schedule`, `visibility`).'],
    ['span', 'Wajib. Pesannya: satu kalimat.'],
    ['.btn.btn--sm', 'Satu aksi opsional. Di dalam banner ia memakai warna terbalik dan otomatis terdorong ke ujung kanan.'],
  ],
  examples: [
    {
      title: 'Offline',
      desc: 'Sebutkan apa yang masih berfungsi dan tawarkan coba lagi.',
      html: `<div class="banner" role="status" style="max-width: 640px;"><span class="ic" aria-hidden="true">cloud_off</span><span>Anda sedang offline. Perubahan disinkronkan saat koneksi kembali.</span><button class="btn btn--sm">Coba lagi</button></div>`,
    },
    {
      title: 'Mode yang sedang dipakai',
      desc: 'Mode pratinjau atau melihat sebagai orang lain perlu jalan keluar di setiap halaman.',
      html: `<div class="banner" style="max-width: 640px;"><span class="ic" aria-hidden="true">visibility</span><span>Anda melihat layanan ini sebagai warga.</span><button class="btn btn--sm">Keluar dari pratinjau</button></div>`,
    },
    {
      title: 'Pemeliharaan terjadwal, bisa ditutup',
      desc: 'Bungkus dengan `.collapse` dan tombol `data-lds-dismiss` jika orang boleh menyembunyikannya. Tombol tutup mewarisi warna teks terbalik.',
      html: `<div class="collapse" style="max-width: 640px;"><div><div class="banner"><span class="ic" aria-hidden="true">schedule</span><span>Pembayaran pajak daerah hanya bisa dilihat pada Sabtu pukul 22.00 sampai 23.00.</span><button class="icon-btn" style="margin: -8px -6px -8px auto; color: inherit;" aria-label="Tutup" data-lds-dismiss><span class="ic" style="font-size: 18px;" aria-hidden="true">close</span></button></div></div></div>`,
    },
  ],
  states: [
    ['appearing', 'Render di dalam `.collapse.is-closed` lalu hapus kelasnya, agar konten halaman turun dengan spring, bukan melompat.'],
    ['dismissed', '`data-lds-dismiss` pada tombol tutup melipat `.collapse` pembungkusnya dan memicu `lds:dismiss`.'],
  ],
  motion: [
    'Masuk dan keluar lewat pembungkus `.collapse`: `grid-template-rows` dengan `--spring-smooth` (`--d-smooth`, 560 ms) plus opasitas selama `--d-standard`. Konten di bawahnya mengikuti tinggi.',
    'Tanpa geser masuk dari tepi atas dan tanpa berdenyut; banner tenang karena bisa bertahan lama.',
    'Reduced motion: perubahan linear 120 ms.',
  ],
  a11y: [
    'Jika banner muncul karena sesuatu berubah (koneksi terputus), beri `role="status"` agar diumumkan secara sopan. Banner yang sudah ada saat dimuat tidak perlu role.',
    'Jangan pernah `role="alert"`: kondisinya penting tetapi bukan interupsi.',
    'Aksinya adalah `<button>` sungguhan yang dinamai sesuai hasil ("Coba lagi", "Keluar dari pratinjau"). Tombol tutup perlu `aria-label="Tutup"`.',
    'Permukaan terbalik mempertahankan kontras teks penuh di kedua tema; jangan turunkan opasitasnya.',
  ],
  do: [
    'Batasi satu kalimat yang menyebut kondisi dan apa yang masih berfungsi.',
    'Hapus begitu kondisinya berakhir (kembali online: hapus banner dan tampilkan [toast](toast) "Kembali online").',
    'Tawarkan satu aksi yang menyelesaikan atau keluar dari kondisi itu.',
  ],
  dont: [
    'Memakainya untuk promosi atau berita; pakai [spotlight](spotlight) di halaman yang relevan.',
    'Menampilkan dua banner; pilih kondisi yang lebih penting.',
    'Memakainya untuk error di halaman ini; itu tugas [alert](alert).',
  ],
  js: 'Opsional. `data-lds-dismiss` pada tombol tutup melipat `.collapse` terdekat dan memicu `lds:dismiss`. Menampilkan dan menyembunyikan banner saat kondisi berubah diatur oleh aplikasi.',
};
