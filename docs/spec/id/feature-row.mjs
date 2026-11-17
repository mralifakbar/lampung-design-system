export default {
  summary: 'Satu fitur diceritakan di samping buktinya: judul singkat, satu paragraf dan beberapa poin di satu sisi, stage hidup dengan fitur yang berjalan di sisi lain. Baris bergantian sisi dengan `feature--reverse`.',
  when: [
    'Menjelaskan satu fitur layanan di landing page, di samping fitur itu berjalan.',
    'Dua sampai empat fitur dalam deretan bagian, saat masing-masing butuh demonya sendiri.',
  ],
  whenNot: [
    ['Banyak fitur kecil dengan bobot sama', 'layout-primitives', 'Pakai `auto-grid` berisi blok teks pendek; tidak setiap fitur butuh stage.'],
    ['Tujuan yang bisa dibuka orang', 'link-card'],
    ['Layar pertama halaman', 'hero'],
  ],
  where: 'Di dalam [marketing section](marketing-section). Mulai 900 px teks memakai 5 dari 12 kolom dan stage 7 (terbalik dengan `feature--reverse`); di bawahnya teks lebih dulu lalu stage. Baris yang berurutan berjarak 56 sampai 112 px.',
  anatomy: [
    ['.feature', 'Wajib. Grid dua kolom.'],
    ['.feature--reverse', 'Stage lebih dulu di layar lebar.'],
    ['.feature__copy', 'Wajib. Eyebrow, judul, isi dan poin.'],
    ['h2/h3.feature__title', 'Wajib. 24 sampai 32 px.'],
    ['p.feature__body', 'Paragrafnya, maksimal 52 karakter per baris.'],
    ['ul.feature__points', 'Dua atau tiga fakta, setiap `li` berisi ikon dan teks dalam `span`.'],
    ['.feature__stage', 'Wajib. Buktinya: komponen hidup di atas isian tenang. Permukaan yang diletakkan langsung di dalamnya (list, key-value, code block, tool call) beralih ke warna dasar, tidak pernah isian di atas isian. Bisa juga dipakai sendiri sebagai stage demo, misalnya di hero.'],
    ['.feature__stage--flush', 'Tanpa padding, untuk stage yang berisi satu komponen selebar penuh.'],
    ['.feature__caption', 'Footnote yang menyebut apa yang bisa dicoba atau bahwa kontennya contoh.'],
  ],
  examples: [
    {
      title: 'Teks di samping stage hidup',
      desc: 'Stage berisi segmented control dan code block sungguhan; ganti formatnya.',
      html: `<div class="feature" style="width: 100%;">
  <div class="feature__copy">
    <span class="msec__eyebrow"><span class="ic ic--sm" aria-hidden="true">code</span>Ekspor</span>
    <h3 class="feature__title">Data penerima bantuan sosial, dalam format yang diminta dinas.</h3>
    <p class="feature__body">Ekspor satu tahap penyaluran sebagai spreadsheet, laporan PDF atau berkas untuk sistem data kesejahteraan daerah.</p>
    <ul class="feature__points">
      <li><span class="ic" aria-hidden="true">check_circle</span><span>Kolomnya sesuai templat resmi.</span></li>
      <li><span class="ic" aria-hidden="true">check_circle</span><span>Ekspor berjalan di latar belakang.</span></li>
    </ul>
  </div>
  <div class="feature__stage">
    <div class="seg" role="group" aria-label="Format" data-lds-segmented style="width: 240px;"><span class="seg__thumb"></span><button class="seg__btn" aria-pressed="true">CSV</button><button class="seg__btn" aria-pressed="false">PDF</button></div>
    <div class="codeblock"><div class="codeblock__bar"><span>penerima-bansos-tahap-1.csv</span></div><pre>nik,nama,kelurahan,status
1871 •••• •••• 0042,Siti Rahmawati,Way Halim,terverifikasi
1871 •••• •••• 0317,Budi Santoso,Kedaton,menunggu</pre></div>
    <span class="feature__caption">Data contoh.</span>
  </div>
</div>`,
    },
    {
      title: 'Terbalik',
      desc: 'Stage lebih dulu di layar lebar; teks tetap lebih dulu untuk screen reader dan di ponsel.',
      html: `<div class="feature feature--reverse" style="width: 100%;">
  <div class="feature__copy">
    <h3 class="feature__title">Pengingat yang berhenti begitu pajak dibayar.</h3>
    <p class="feature__body">Wajib pajak mendapat satu pengingat sehari sebelum jatuh tempo, dan tidak ada lagi setelah membayar.</p>
  </div>
  <div class="feature__stage">
    <label class="switch"><input type="checkbox" role="switch" checked><span class="switch__track" aria-hidden="true"><span class="switch__thumb"></span></span><span class="bell ic" aria-hidden="true">notifications</span>Pengingat harian</label>
  </div>
</div>`,
    },
  ],
  variants: [
    ['feature--reverse', 'Stage di kiri mulai 900 px.'],
    ['feature__stage--flush', 'Stage tanpa padding.'],
  ],
  motion: [
    'Teks boleh memudar naik sekali dengan [reveal on scroll](reveal-on-scroll). Stage hanya bergerak saat seseorang memakai isinya.',
    'Tampilan di dalam stage yang berganti (contoh kode per platform) memakai [view swap](view-swap): konten baru naik 4 px dari blur 4 px selama 240 ms dengan `--ease-enter`.',
  ],
  a11y: [
    'Teks selalu lebih dulu di DOM di kedua arah; `feature--reverse` hanya mengubah urutan visual di layar lebar.',
    'Setiap kontrol di stage tetap berlabel. Sebutkan di `feature__caption` jika kontennya contoh.',
  ],
  do: [
    'Letakkan satu fitur yang berjalan di setiap stage.',
    'Bungkus teks poin dengan `span` agar kode inline ikut terlipat.',
  ],
  dont: [
    'Memakai tangkapan layar saat komponennya bisa dijalankan.',
    'Menjadikan setiap fitur satu baris; fitur yang lebih kecil cukup dalam daftar.',
  ],
};
