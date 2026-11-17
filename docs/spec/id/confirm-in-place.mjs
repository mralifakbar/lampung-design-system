const SPIN = '<span class="spinner" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>';
const CONFIRM = ({ icon, arm, ask, cancel, yes, busy, done }) => `<div class="confirm" data-lds-confirm>
  <span class="confirm__face confirm__face--rest"><button class="confirm__arm" data-act="arm"><span class="ic" aria-hidden="true">${icon}</span>${arm}</button></span>
  <span class="confirm__face confirm__face--ask"><span class="confirm__q">${ask}</span><button class="btn btn--plain" data-act="cancel">${cancel}</button><button class="btn btn--danger" data-act="confirm">${yes}</button></span>
  <span class="confirm__face confirm__face--busy" role="status">${SPIN}<span class="shimmer">${busy}</span></span>
  <span class="confirm__face confirm__face--done" role="status"><span class="ic" aria-hidden="true">check_circle</span>${done}<button class="confirm__undo" data-act="undo">Urungkan</button></span>
</div>`;

export default {
  summary: 'Aksi berisiko yang bertanya, bekerja, dan melapor di dalam satu pil: diam, lalu "Hapus 3 berkas?", lalu Menghapus, lalu Terhapus dengan Urungkan. Pil menyesuaikan lebarnya dengan spring untuk setiap kalimat, jadi elemen di sekitarnya tidak melompat dan orang tidak perlu menghadapi dialog untuk aksi kecil yang bisa diurungkan.',
  when: [
    'Menghapus, mengeluarkan, atau meninggalkan satu hal, atau pilihan kecil, yang bisa diurungkan: berkas, anggota, grup, pencarian tersimpan.',
    'Aksinya ada di toolbar, kepala kartu, atau baris, dan dialog terasa lebih berat daripada aksinya.',
  ],
  whenNot: [
    ['Aksi tidak bisa diurungkan atau berdampak pada banyak orang (menghapus layanan untuk semua warga)', 'alert-dialog'],
    ['Komitmen yang mahal tetapi tidak berbahaya (mengirim permohonan, membayar)', 'hold-to-confirm', 'Atau [geser untuk konfirmasi](slide-to-confirm) di ponsel.'],
    ['Menghapus baris dengan gestur', 'swipe-actions'],
    ['Hasilnya terjadi di bagian lain halaman', 'toast', 'Sediakan Urungkan di sana.'],
  ],
  where: 'Di tempat aksi itu sudah berada: ujung toolbar berkas, kepala kartu, tepi akhir baris daftar. Beri ruang untuk melebar: saat bertanya lebarnya bisa sekitar dua kali lebar diamnya.',
  anatomy: [
    ['.confirm', 'Wajib. Pilnya, `data-lds-confirm`. Tinggi 44, lebar mengikuti sisi yang sedang tampil. `data-face` menyebut sisi mana yang tampil.'],
    ['.confirm__face--rest', 'Wajib. Berisi `.confirm__arm` (`data-act="arm"`): ikon dan aksinya, dengan teks warna bahaya.'],
    ['.confirm__face--ask', 'Wajib. `.confirm__q` (pertanyaan beserta objeknya), tombol Batal polos (`data-act="cancel"`) dan `btn--danger` (`data-act="confirm"`).'],
    ['.confirm__face--busy', 'Wajib. Spinner dan kata kerja berkilau ("Menghapus"), `role="status"`.'],
    ['.confirm__face--done', 'Wajib. Tanda centang, kalimat hasil, dan `.confirm__undo` (`data-act="undo"`), `role="status"`.'],
  ],
  examples: [
    {
      title: 'Menghapus berkas dari toolbar',
      desc: 'Tekan Hapus 3 berkas, lalu Hapus. Tombol konfirmasi mengabaikan klik selama 280 ms setelah bersiap, jadi klik ganda tidak bisa mengonfirmasi tanpa sengaja. Urungkan tersedia selama 5 detik.',
      html: CONFIRM({ icon: 'delete', arm: 'Hapus 3 berkas', ask: 'Hapus 3 berkas?', cancel: 'Batal', yes: 'Hapus', busy: 'Menghapus', done: '3 berkas dihapus' }),
    },
    {
      title: 'Keluar dari grup lewat kartunya',
      desc: 'Alur yang sama dengan kata-kata untuk aksi ini. Escape membatalkan pertanyaan.',
      html: `<div class="card" style="display: flex; align-items: center; gap: 12px; width: 100%; max-width: 560px; flex-wrap: wrap;">
  <span class="avatar avatar--sq">KS</span>
  <span style="flex: 1; min-width: 140px;"><span class="card__title" style="display: block;">Kader Posyandu Sukarame</span><span class="card__sub" style="display: block;">12 anggota, rapat setiap Kamis</span></span>
  ${CONFIRM({ icon: 'logout', arm: 'Keluar grup', ask: 'Keluar dari Kader Posyandu Sukarame?', cancel: 'Tetap', yes: 'Keluar', busy: 'Memproses', done: 'Anda keluar dari grup' })}
</div>`,
    },
    {
      title: 'Mengeluarkan anggota di sebuah baris',
      desc: 'Di dalam daftar, pil melebar ke arah isi baris; nama dan email tetap di tempatnya.',
      html: `<div class="list" style="width: 100%; max-width: 560px;">
  <div class="lrow" style="flex-wrap: wrap;"><span class="avatar" style="--size: 36px;">RS</span><span class="lrow__body"><span class="lrow__title">Rizal Siregar</span><span class="lrow__sub">rizal.siregar@contoh.id</span></span>${CONFIRM({ icon: 'person', arm: 'Keluarkan', ask: 'Keluarkan Rizal?', cancel: 'Batal', yes: 'Keluarkan', busy: 'Mengeluarkan', done: 'Dikeluarkan' })}</div>
</div>`,
    },
  ],
  states: [
    ['rest', '`data-face="rest"`: warna bahaya tipis, aksi beserta ikonnya.'],
    ['ask', '`data-face="ask"`: permukaan dasar dengan cincin; fokus pindah ke Batal. Escape atau Batal kembali ke diam.'],
    ['busy', '`data-face="busy"`: spinner dan shimmer; tampil minimal 600 ms agar tidak berkedip.'],
    ['done', '`data-face="done"`: warna sukses tipis, hasilnya, dan Urungkan (difokus). Kembali ke diam setelah `data-reset` ms (bawaan 5000).'],
    ['failed', 'Jika promise ditolak, pil kembali ke diam dan bergoyang; jelaskan alasannya di sebelahnya.'],
  ],
  motion: [
    'Lebar: pil mengukur sisi berikutnya dan mentransisikan lebarnya dengan `--spring-snappy` (`--d-snappy`, 360 ms); warna latar berganti perlahan selama `--d-standard`.',
    'Sisi: sisi lama keluar dalam 120 ms dengan `--ease-exit` (memudar, blur 2 px, skala 0,98), tetap di tengah agar teks tidak bergeser ke samping; sisi baru masuk dalam 200 ms dengan `--ease-enter` setelah 60 ms, atau setelah 150 ms bila pil sedang melebar agar kata tidak terpotong.',
    'Selesai: tanda centang muncul dengan `--spring-momentum` (360 ms), pantulan kecil yang pantas untuk aksi yang tuntas.',
    'Gagal: `shake()` (360 ms, dua ayunan) ditambah haptic error.',
    'Interupsi: setiap langkah adalah transisi dari lebar saat ini; bersiap lalu membatalkan dengan cepat berbalik dengan mulus.',
    'Reduced motion: lebar berubah dalam 120 ms, sisi langsung berganti, tanpa pantulan dan tanpa goyangan.',
  ],
  a11y: [
    'Setiap sisi berisi tombol sungguhan. Saat bersiap, fokus pindah ke Batal (pilihan aman); saat selesai, fokus pindah ke Urungkan; batal dan reset mengembalikannya ke tombol aksi.',
    'Sisi sibuk dan selesai memakai `role="status"`, jadi "Menghapus" dan "3 berkas dihapus" diumumkan.',
    'Pertanyaannya menyebut objek ("Hapus 3 berkas?"), jadi tetap jelas di luar konteks.',
  ],
  do: [
    'Sebut objeknya di label aksi, pertanyaan, dan hasil.',
    'Panggil `e.detail.wait(promise)` agar sisi sibuk bertahan selama pekerjaan sebenarnya berjalan.',
    'Pastikan Urungkan benar-benar memulihkan, dan dengarkan `lds:undo`.',
  ],
  dont: [
    'Memakainya untuk aksi yang tidak bisa diurungkan; pakai [alert dialog](alert-dialog).',
    'Menaruh dua konfirmasi berdampingan dalam satu baris.',
    'Menampilkan toast juga; pil sudah menyampaikannya.',
  ],
  js: '`init()` menghubungkan `[data-lds-confirm]`. Saat dikonfirmasi, komponen memancarkan `lds:confirm` dengan `{ wait }`; berikan promise Anda ke `wait` untuk menahan sisi sibuk (penolakan mengembalikan ke diam dengan goyangan). Tanpa `wait`, pil selesai setelah 700 ms. `lds:undo` terpicu saat Urungkan. `data-reset` mengatur berapa lama sisi selesai tampil (ms). Haptic light saat bersiap, haptic success saat selesai.',
};
