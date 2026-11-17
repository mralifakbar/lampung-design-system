export default {
  summary: 'Pengukur bersegmen untuk tingkat dalam rentang yang diketahui: penyimpanan terpakai, kuota terisi, kekuatan kata sandi. Menunjukkan seberapa penuh, bukan seberapa jauh kemajuannya.',
  when: [
    'Jumlah terhadap batas: penyimpanan terpakai, kuota pendaftar dalam satu kelas pelatihan, jumlah laporan dibanding jatah.',
    'Tingkat kekuatan atau kualitas dalam beberapa langkah, seperti kekuatan kata sandi (empat segmen).',
    'Tingkat yang berubah menjadi peringatan mendekati batas (`.is-warn`) dan masalah saat mencapai batas (`.is-full`).',
  ],
  whenNot: [
    ['Tugas yang maju sampai selesai', 'progress-bar'],
    ['Satu skor dalam kotak ringkas', 'progress-ring'],
    ['Bagian dari keseluruhan lintas kategori', 'percentage-bar'],
    ['Orang memberi penilaian', 'rating'],
    ['Grid aktivitas per hari', 'heatmap'],
  ],
  where: 'Di bawah label yang menyebut jumlahnya, dengan nilai dalam kata-kata (`.progress-meta` bisa dipakai sebagai header). Di baris pengaturan, di bawah kolom kata sandi, di card paket atau penyimpanan. Selebar wadahnya; 160 sampai 320 px paling mudah dibaca.',
  anatomy: [
    ['.meter-seg', 'Wajib. Grid berisi sepuluh segmen sama besar dengan jarak 3 px. Timpa `grid-template-columns` secara inline untuk jumlah lain (empat untuk kekuatan kata sandi).'],
    ['i', 'Wajib. Satu per segmen, tinggi 8 px.'],
    ['i.on', 'Segmen terisi (aksen).'],
    ['.is-warn / .is-full', 'Pada `.meter-seg`: segmen terisi berubah menjadi warning, lalu danger.'],
    ['.progress-meta', 'Header yang disarankan: label dan nilai dalam kata-kata.'],
  ],
  examples: [
    {
      title: 'Penyimpanan mendekati batas',
      desc: 'Tujuh dari sepuluh terisi itu normal; di sembilan meter memberi peringatan dan teks bantuan menyebut apa yang perlu dilakukan.',
      html: `<div class="docs-col" style="max-width: 320px;">
  <div>
    <div class="progress-meta"><span id="m1">Penyimpanan</span><b>6,2 dari 10 GB</b></div>
    <div class="meter-seg" role="meter" aria-labelledby="m1" aria-valuemin="0" aria-valuemax="10" aria-valuenow="6.2" aria-valuetext="6,2 dari 10 GB terpakai"><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i></i><i></i><i></i><i></i></div>
  </div>
  <div>
    <div class="progress-meta"><span id="m2">Penyimpanan</span><b>9,1 dari 10 GB</b></div>
    <div class="meter-seg is-warn" role="meter" aria-labelledby="m2" aria-valuemin="0" aria-valuemax="10" aria-valuenow="9.1" aria-valuetext="9,1 dari 10 GB terpakai, hampir penuh"><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i></i></div>
    <span class="field__help">Hampir penuh. Hapus berkas lampiran lama agar tetap bisa mengunggah.</span>
  </div>
</div>`,
    },
    {
      title: 'Kuota terisi',
      desc: 'Saat penuh, segmen berubah menjadi danger; kata "penuh" ditulis di sampingnya.',
      html: `<div style="max-width: 320px; width: 100%;">
  <div class="progress-meta"><span id="m3">Kuota pelatihan UMKM</span><b>40 dari 40, penuh</b></div>
  <div class="meter-seg is-full" role="meter" aria-labelledby="m3" aria-valuemin="0" aria-valuemax="40" aria-valuenow="40" aria-valuetext="40 dari 40 tempat, penuh"><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i></div>
</div>`,
    },
    {
      title: 'Kekuatan kata sandi dalam empat langkah',
      desc: 'Atur empat kolom secara inline. Pasangkan segmen dengan kata: lemah, cukup, baik, kuat. Ketik untuk mencoba.',
      html: `<div class="field" style="max-width: 320px; width: 100%;">
  <label class="field__label" for="pw-demo">Kata sandi baru</label>
  <div class="control"><input id="pw-demo" type="password" autocomplete="new-password" aria-describedby="pw-word" oninput="const n = Math.min(4, Math.floor(this.value.length / 3)); const m = document.getElementById('pw-m'); [...m.children].forEach((x, i) => x.classList.toggle('on', i < n)); m.classList.toggle('is-warn', n > 0 && n < 3); document.getElementById('pw-word').textContent = ['Terlalu pendek', 'Lemah', 'Cukup', 'Baik', 'Kuat'][n];"></div>
  <div class="meter-seg" id="pw-m" style="grid-template-columns: repeat(4, minmax(0, 1fr)); margin-top: 8px;" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
  <span class="field__help" id="pw-word">Terlalu pendek</span>
</div>`,
      code: `<div class="meter-seg is-warn" style="grid-template-columns: repeat(4, minmax(0, 1fr));" aria-hidden="true">
  <i class="on"></i><i class="on"></i><i></i><i></i>
</div>
<span class="field__help" id="pw-word">Cukup</span>`,
    },
  ],
  variants: [
    ['meter-seg', 'Sepuluh segmen, isian aksen.'],
    ['meter-seg.is-warn', 'Mendekati batas: segmen terisi berubah ke warna warning.'],
    ['meter-seg.is-full', 'Mencapai atau melewati batas: warna danger.'],
    ['grid-template-columns (inline)', 'Jumlah segmen lain, seperti empat untuk kekuatan.'],
  ],
  states: [
    ['level', 'Tambahkan `.on` pada n segmen pertama (bulatkan ke segmen terdekat).'],
    ['warning', '`.is-warn` mulai sekitar 80 % atau kekuatan yang lemah.'],
    ['full', '`.is-full` saat mencapai batas, dengan kata "penuh".'],
  ],
  motion: [
    'Setiap segmen memudarkan warnanya selama `--d-standard` (240 ms) dengan `--ease-standard`. Tanpa sapuan dan tanpa pantulan: meter adalah bacaan, bukan peristiwa.',
    'Beberapa segmen yang berubah sekaligus berubah bersamaan; jangan beri stagger.',
    'Reduced motion: perubahan warna menjadi linear 120 ms.',
  ],
  a11y: [
    'Beri meter `role="meter"` dengan `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-valuetext` dan nama (`aria-labelledby` ke label).',
    'Jika kata di sampingnya sudah menyebut semuanya (kekuatan kata sandi), tandai segmen `aria-hidden="true"` dan hubungkan kata itu ke input dengan `aria-describedby`.',
    'Warning dan penuh juga harus disebut dengan kata-kata; warna saja tidak cukup bagi banyak orang.',
  ],
  do: [
    'Tulis nilainya di sampingnya ("6,2 dari 10 GB").',
    'Sebutkan apa yang perlu dilakukan saat meter memberi peringatan.',
    'Pakai sepuluh segmen untuk kapasitas dan empat atau lima untuk kekuatan.',
  ],
  dont: [
    'Memakai meter untuk tugas yang sedang berjalan.',
    'Mengisi segmen dengan gradien atau warna berbeda per segmen.',
    'Menampilkan lebih dari dua belas segmen; beralih ke tampilan [progress bar](progress-bar) atau angka.',
  ],
  js: 'Tidak ada. Ganti `.on` pada segmen dan `.is-warn` / `.is-full` pada meter dari kode Anda.',
};
