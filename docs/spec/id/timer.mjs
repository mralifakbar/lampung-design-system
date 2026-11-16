export default {
  summary: 'Pil hitung mundur dengan angka mono tabular yang berubah kuning saat waktu hampir habis dan merah di nol, lalu memicu `lds:timeup`. Untuk tenggat sungguhan yang sedang dikejar orang.',
  when: [
    'Ujian atau tryout berwaktu: sisa waktu untuk seluruh tes atau untuk satu bagian.',
    'Masa tahan singkat yang harus segera ditindaklanjuti: nomor antrean yang dipesan, batas waktu pembayaran, kode yang akan kedaluwarsa.',
    'Menghitung naik terhadap target kerja: waktu tunggu nomor antrean di loket, chat pengaduan yang menunggu balasan, panggilan darurat yang sedang ditahan (`data-lds-elapsed`).',
  ],
  whenNot: [
    ['Menampilkan berapa lama pekerjaan yang sedang berjalan', 'thinking'],
    ['Kapan sesuatu terjadi atau jatuh tempo, dalam kata-kata ("3 hari lagi", "5 menit lalu")', 'timestamp'],
    ['Batas waktu untuk membatalkan aksi di toast', 'toast', 'Toast punya bar menyusut sendiri'],
    ['Kemajuan melewati sejumlah soal yang tetap', 'progress-bar'],
  ],
  where: 'Di tempat tetap yang bisa dilirik tanpa mencari: bar atas layar ujian (sisi kanan), header langkah pembayaran, di samping kolom kode. Di ponsel letakkan di bar atas; jangan pernah di dalam konten yang bergulir, karena bisa keluar dari layar.',
  anatomy: [
    ['.timer', 'Wajib. Pil 32 px di atas isian tenang, angka mono tabular semibold 15 px.'],
    ['[data-lds-timer]', 'Wajib untuk perilakunya. Jumlah detik untuk dihitung mundur.'],
    ['[data-low]', 'Sisa detik saat ia berubah menjadi `.is-low` (bawaan 60).'],
    ['.timer__t', 'Elemen dalam opsional tempat JS menulis waktunya, agar `.ic` bisa berada di sampingnya. Tanpa elemen ini JS menulis waktunya ke seluruh pil.'],
    ['.is-low / .is-up', 'Diatur oleh JS: warna warning saat hampir habis, warna danger di nol.'],
    ['[data-lds-elapsed]', 'Menghitung naik: detik yang sudah berlalu saat dirender. Dengan `data-target` (detik) ia berubah menjadi `.is-low` mulai `data-low` (bawaan 80 % dari target) dan `.is-up` setelah melewati target.'],
  ],
  examples: [
    {
      title: 'Menghitung naik terhadap target',
      desc: 'Waktu tunggu nomor antrean di loket puskesmas, dengan target 12 menit. Yang pertama aman, yang kedua mendekati, yang ketiga terlambat. Kata-kata di samping pil menyebut hal yang sama.',
      html: `<div class="docs-col" style="max-width: 360px;">
  <div class="docs-row"><span class="timer" data-lds-elapsed="185" data-target="720" aria-label="Antrean A-04, waktu tunggu"><span class="ic" aria-hidden="true">schedule</span><span class="timer__t"></span></span><span class="docs-note">Antrean A-04 · sesuai target</span></div>
  <div class="docs-row"><span class="timer" data-lds-elapsed="610" data-target="720" aria-label="Antrean A-09, waktu tunggu"><span class="ic" aria-hidden="true">schedule</span><span class="timer__t"></span></span><span class="docs-note">Antrean A-09 · mendekati target</span></div>
  <div class="docs-row"><span class="timer" data-lds-elapsed="905" data-target="720" aria-label="Antrean A-12, waktu tunggu"><span class="ic" aria-hidden="true">schedule</span><span class="timer__t"></span></span><span class="docs-note">Antrean A-12 · terlambat</span></div>
</div>`,
    },
    {
      title: 'Sisa waktu ujian',
      desc: '1 jam 30 menit ditampilkan sebagai h:mm:ss; di bawah satu jam sebagai m:ss.',
      html: `<div class="docs-row"><span class="timer" data-lds-timer="5400" data-low="300" aria-label="Sisa waktu"></span><span class="docs-note">Bagian 2 dari 3</span></div>`,
    },
    {
      title: 'Hampir habis, lalu habis',
      desc: 'Timer 20 detik yang berubah kuning di detik 10 dan mencapai nol. Tekan Replay untuk menjalankannya lagi.',
      html: `<span class="timer" data-lds-timer="20" data-low="10" aria-label="Nomor antrean ditahan selama"></span>`,
    },
    {
      title: 'Tampilan setiap state',
      desc: 'Seperti apa tiga state-nya.',
      html: `<div class="docs-row">
  <span class="timer" role="timer">42:10</span>
  <span class="timer is-low" role="timer">4:59</span>
  <span class="timer is-up" role="timer">0:00</span>
</div>`,
    },
  ],
  states: [
    ['running', 'Isian tenang, teks tegas.'],
    ['.is-low', 'Pada atau di bawah `data-low` detik: warna latar dan teks warning.'],
    ['.is-up', 'Di nol: warna danger; `lds:timeup` dipicu sekali pada elemen (bubbles).'],
  ],
  motion: [
    'Warna latar dan teks berubah selama `--d-standard` (240 ms). Digit berganti di tempat dengan angka tabular, jadi lebarnya tidak pernah bergeser.',
    'Tanpa denyut atau getar saat waktu hampir habis; perubahan warna dan pengumuman sudah cukup dalam situasi tertekan.',
    'Reduced motion: perubahan warna menjadi linear 120 ms; hitungannya tidak berubah.',
  ],
  a11y: [
    'JS memasang `role="timer"`, yang tidak diumumkan pada setiap perubahan (live region nonaktif). Beri nama dengan `aria-label` ("Sisa waktu").',
    'Umumkan ambang batas sendiri, masing-masing sekali: baris `role="status"` tersembunyi yang menyebut "Sisa 5 menit" saat hampir habis, dan apa yang terjadi di nol pada `lds:timeup` ("Waktu habis. Jawaban Anda sudah dikumpulkan.").',
    'Jangan pernah menjalankan aksi di nol tanpa memberi tahu orang apa yang terjadi. Untuk kebutuhan aksesibilitas, beri tambahan waktu jika aturan mengizinkan.',
  ],
  do: [
    'Beri tahu orang sebelum timer dimulai berapa lama waktunya dan apa yang terjadi di nol.',
    'Atur `data-low` ke peringatan yang berguna: 5 menit untuk ujian, 60 detik untuk masa tahan.',
    'Dengarkan `lds:timeup` dan simpan pekerjaan orang terlebih dahulu.',
  ],
  dont: [
    'Menampilkan hitung mundur untuk sesuatu yang tidak punya tenggat sungguhan.',
    'Menampilkan detik untuk tenggat yang masih berhari-hari lagi; pakai [timestamp](timestamp).',
    'Menjalankan dua timer di satu layar.',
  ],
  js: '`data-lds-timer="seconds"` memulai hitung mundur sejak halaman dimuat (dari waktu akhir yang tetap, jadi tidak pernah meleset), memformat h:mm:ss atau m:ss, mengganti `.is-low` di bawah `data-low` (bawaan 60) dan `.is-up` di nol, memasang `role="timer"` dan memicu `lds:timeup` pada elemen. Diperbarui setiap 250 ms. Untuk melanjutkan timer setelah halaman dimuat ulang, render dengan sisa detiknya. `data-lds-elapsed="seconds"` menghitung naik dari sejumlah detik itu; dengan `data-target` ia mengganti `.is-low` mulai `data-low` (bawaan 80 % dari target) dan `.is-up` setelah melewatinya, dan memicu `lds:overdue` sekali. Elemen penghitung yang dikeluarkan dari halaman (antrean yang dipindahkan) menyimpan waktu mulainya selama lima menit, jadi mengembalikannya dengan Urungkan akan melanjutkan hitungan.',
};
