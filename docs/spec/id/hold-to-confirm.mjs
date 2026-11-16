const wire = (text) => `if (!this.dataset.wired) { this.dataset.wired = '1'; this.addEventListener('lds:confirm', () => { this.lastChild.textContent = '${text}'; this.disabled = true; }); }`;

export default {
  summary: 'Tombol yang ditekan dan ditahan selama 1,2 detik untuk mengonfirmasi sesuatu yang mahal tetapi tidak cukup berbahaya untuk dialog. Isian menyapu tombol selama ditahan dan surut jika dilepas lebih awal.',
  when: [
    'Aksi mahal dan disengaja yang tidak boleh terjadi karena ketukan tak sengaja, tetapi tidak perlu pertanyaan terpisah: mengirim ujian, mengakhiri sesi siaran langsung, menghapus arsip draf lokal.',
    'Di dalam alur yang akan terganggu oleh dialog konfirmasi (layar terakhir ujian seleksi).',
  ],
  whenNot: [
    ['Menghapus data bersama atau yang tidak bisa dipulihkan (hapus layanan, keluarkan anggota)', 'alert-dialog', 'Sebut akibatnya dengan kata-kata dan tanyakan.'],
    ['Konfirmasi di ponsel yang lebih cocok dengan gerakan disengaja (kirim pembayaran, kirim nilai)', 'slide-to-confirm'],
    ['Aksi yang mudah dibatalkan', 'button', 'Langsung jalankan dan tawarkan Urungkan di [toast](toast).'],
    ['"Anda yakin?" dua langkah di dalam kontrol yang sama', 'confirm-in-place'],
  ],
  where: 'Di tempat aksi utama alur berada: akhir ujian, footer sheet. Selebar layar di ponsel (`btn--block`). Tambahkan petunjuk satu baris di bawah atau di dalamnya ("Tahan untuk mengirim"), karena gerakan ini tidak langsung jelas.',
  anatomy: [
    ['.btn.hold[data-lds-hold]', 'Wajib. Tombol dengan varian berisi apa pun (`btn--primary` atau `btn--danger`). `.hold` memotong isiannya.'],
    ['.hold__fill', 'Wajib. Anak pertama, `aria-hidden`. Lapisan gelap yang membesar dari kiri selama ditahan.'],
    ['label text', 'Anak terakhir. Sebut gerakannya di sini: "Tahan untuk mengirim jawaban".'],
  ],
  examples: [
    {
      title: 'Mengirim ujian',
      desc: 'Tekan dan tahan selama 1,2 detik, atau fokuskan lalu tahan Spasi atau Enter. Lepas lebih awal dan isiannya surut.',
      html: `<button class="btn btn--primary hold" data-lds-hold style="min-width: 240px;" onpointerenter="${wire('Jawaban terkirim')}" onfocus="${wire('Jawaban terkirim')}"><span class="hold__fill" aria-hidden="true"></span><span class="ic" aria-hidden="true">touch_app</span>Tahan untuk mengirim jawaban</button>`,
      code: `<button class="btn btn--primary hold" data-lds-hold id="submit-exam">
  <span class="hold__fill" aria-hidden="true"></span>
  <span class="ic" aria-hidden="true">touch_app</span>Tahan untuk mengirim jawaban
</button>
<script type="module">
  document.getElementById('submit-exam').addEventListener('lds:confirm', submitAnswers);
</script>`,
    },
    {
      title: 'Merusak, hanya lokal',
      desc: 'Nada danger untuk sesuatu yang menghapus data di perangkat ini dan bisa diunduh lagi.',
      html: `<button class="btn btn--danger hold" data-lds-hold style="min-width: 240px;" onpointerenter="${wire('Salinan offline terhapus')}" onfocus="${wire('Salinan offline terhapus')}"><span class="hold__fill" aria-hidden="true"></span><span class="ic" aria-hidden="true">delete</span>Tahan untuk menghapus salinan offline</button>`,
      code: `<button class="btn btn--danger hold" data-lds-hold>
  <span class="hold__fill" aria-hidden="true"></span>
  <span class="ic" aria-hidden="true">delete</span>Tahan untuk menghapus salinan offline
</button>`,
    },
  ],
  states: [
    ['rest', 'Tanpa isian.'],
    ['.is-holding', 'Ditambahkan saat pointer turun (atau Spasi/Enter ditekan); isian menyapu dalam 1,2 detik.'],
    ['released early', '`.is-holding` dihapus; isian surut dalam 240 ms. Tidak ada yang terjadi.'],
    ['confirmed', 'Setelah ditahan 1,2 detik, `lds:confirm` dipicu pada tombol dan `.is-holding` dihapus. Perbarui label atau nonaktifkan tombol sendiri.'],
    ['disabled', '`disabled` mencegah penahanan dimulai.'],
  ],
  motion: [
    'Isian: `transform: scaleX(0 to 1)` dari kiri selama 1200 ms, linear, agar progresnya jujur terhadap waktu. Melepas membuatnya surut dalam 240 ms dengan `--ease-exit`; karena berupa transisi, ia surut dari titik mana pun yang sudah dicapai.',
    'Tombol tetap mengecil ke 0.97 saat ditekan seperti semua tombol.',
    'Dengan reduced motion, sistem memendekkan semua transisi menjadi 120 ms, sehingga isian penuh jauh sebelum timer 1,2 detik. Penahanan tetap 1,2 detik; label harus menyebut "Tahan", karena isian tidak lagi menunjukkan waktu.',
  ],
  a11y: [
    '`<button>` sungguhan. Keyboard: tahan Spasi atau Enter (pengulangan diabaikan), lepas untuk membatalkan.',
    'Label menyebut gerakannya ("Tahan untuk …"); jangan mengandalkan isian.',
    'Setelah `lds:confirm`, umumkan hasilnya (ubah label, pakai [toast](toast), atau pindahkan fokus ke layar berikutnya).',
    'Sediakan jalur tanpa menahan untuk orang yang kesulitan menahan (pengguna switch access): pengaturan atau dialog konfirmasi sebagai cadangan.',
  ],
  do: [
    'Awali label dengan "Tahan untuk".',
    'Pakai untuk satu aksi per layar.',
    'Konfirmasi hasilnya dengan kata-kata tepat sesudahnya.',
  ],
  dont: [
    'Memakainya untuk aksi sehari-hari seperti Simpan.',
    'Menggantikan dialog konfirmasi untuk penghapusan data bersama yang tidak bisa dibatalkan.',
    'Mengubah durasi 1,2 detik per layar; orang mempelajarinya sekali.',
  ],
  js: '`data-lds-hold` pada tombol. `init()` memulai timer 1,2 detik saat pointer turun atau Spasi/Enter ditekan, membatalkannya saat pointer naik, keluar, atau batal dan saat tombol keyboard dilepas, lalu memicu `lds:confirm` (bubbles) saat selesai.',
};
