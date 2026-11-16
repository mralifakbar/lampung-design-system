export default {
  summary: 'Label gelap singkat di atas kontrol saat hover atau fokus, setelah jeda 500 ms. Menamai icon button dan pintasan; dengan `.infotip` dan `.tip--wide` menjelaskan istilah dalam satu atau dua kalimat. Hanya CSS.',
  when: [
    'Menamai tombol yang hanya berupa ikon dan menampilkan pintasannya ("Bagikan", "Tebal ⌘B").',
    'Menjelaskan istilah atau angka di samping label dengan info tip: apa arti "Nilai tertimbang", mengapa sebuah field wajib diisi.',
  ],
  whenNot: [
    ['Konten berisi tautan, tombol, atau field', 'popover', 'Tooltip hilang saat pointer pergi; isinya tidak bisa diklik'],
    ['Pratinjau seseorang, layanan, atau tautan', 'hover-card'],
    ['Informasi yang dibutuhkan untuk menyelesaikan tugas', 'text-field', 'Taruh di teks bantuan field, selalu terlihat'],
    ['Memandu orang melalui fitur baru', 'coachmark'],
    ['Memastikan bahwa sesuatu sudah terjadi', 'toast'],
  ],
  where: 'Di tengah, 8 px di atas pemicunya. Pemicu dan `.tip` berada bersama dalam `.tip-host`. Sisakan ruang di atasnya (tinggi tip sekitar 30 px, lebih jika lebar). Perangkat sentuh tidak punya hover: jangan pernah menaruh informasi penting hanya di tooltip.',
  anatomy: [
    ['.tip-host', 'Wajib. Pembungkus inline yang memosisikan tip dan menampilkannya saat `:hover` atau `:focus-within`.'],
    ['trigger', 'Wajib. Kontrol yang bisa difokus: [icon button](icon-button), tombol, atau `.infotip`.'],
    ['.tip[role=tooltip]', 'Wajib. Label gelap, satu baris (`white-space: nowrap`), dengan `id` yang dirujuk pemicunya.'],
    ['.tip .kbd', 'Pintasan di dalam label, bergaris dengan warna terbalik.'],
    ['.tip--wide', 'Membuat tip membungkus hingga lebar 260 px, rata kiri, untuk satu atau dua kalimat.'],
    ['button.infotip', 'Tombol (i) tenang 24 px di samping label; berwarna aksen saat hover dan fokus. Berisi ikon `info`.'],
  ],
  examples: [
    {
      title: 'Menamai icon button',
      desc: 'Arahkan kursor atau tekan Tab ke tombol: label menunggu 500 ms, lalu naik masuk; hilang seketika.',
      html: `<div class="docs-row" style="padding-top: 24px;">
  <span class="tip-host"><button class="icon-btn icon-btn--filled" aria-label="Bagikan" aria-describedby="tt-1"><span class="ic" aria-hidden="true">ios_share</span></button><span class="tip" role="tooltip" id="tt-1">Bagikan</span></span>
  <span class="tip-host"><button class="icon-btn icon-btn--filled" aria-label="Tebal" aria-describedby="tt-2"><span class="ic" aria-hidden="true">format_bold</span></button><span class="tip" role="tooltip" id="tt-2">Tebal<span class="kbd">⌘B</span></span></span>
  <span class="tip-host"><button class="icon-btn icon-btn--filled" aria-label="Unduh" aria-describedby="tt-3"><span class="ic" aria-hidden="true">download</span></button><span class="tip" role="tooltip" id="tt-3">Unduh PDF</span></span>
</div>`,
    },
    {
      title: 'Info tip di samping label',
      desc: '`.infotip` menjelaskan istilah dalam tip lebar. Ini tombol sungguhan, sehingga pengguna keyboard dan pembaca layar juga bisa mencapainya.',
      html: `<div class="docs-row" style="padding-top: 72px;">
  <span class="field__label">Nilai tertimbang
    <span class="tip-host"><button class="infotip" type="button" aria-label="Apa itu nilai tertimbang?" aria-describedby="tt-w"><span class="ic" aria-hidden="true">info</span></button><span class="tip tip--wide" role="tooltip" id="tt-w">Setiap aspek dihitung sesuai bobotnya: kelengkapan berkas 35 %, kesesuaian lokasi 35 %, riwayat usaha 30 %.</span></span>
  </span>
  <span class="section__sub">412 dari 550</span>
</div>`,
    },
  ],
  variants: [
    ['.tip', 'Satu baris, untuk nama atau nama dan pintasan.'],
    ['.tip--wide', 'Membungkus hingga paling lebar 260 px untuk satu atau dua kalimat.'],
    ['.tip--below', 'Terbuka di bawah pemicu, untuk toolbar di tepi atas panel atau area gulir yang akan memotong tip di atasnya.'],
    ['.infotip', 'Pemicu (i) untuk penjelasan di samping label atau angka.'],
  ],
  states: [
    [':hover / :focus-within', 'Muncul setelah 500 ms. Pergi berarti langsung hilang.'],
    ['.infotip:hover / :focus-visible', 'Ikon berwarna aksen di atas tint aksen.'],
  ],
  motion: [
    'Masuk: menunggu 500 ms, lalu opacity selama `--d-fast` (160 ms) dengan `--ease-enter` dan dari `translateY(4px) scale(0.97)` dengan `--spring-snappy` selama `--d-snappy`.',
    'Keluar: 100 ms dengan `--ease-exit`, tanpa jeda, agar tip tidak berlama-lama menutupi bacaan.',
    'Reduced motion: jeda tetap, transisi turun menjadi 120 ms linear.',
  ],
  a11y: [
    'Pemicu harus bisa difokus agar tip juga muncul saat fokus keyboard (`:focus-within`).',
    'Icon button tetap butuh `aria-label` sendiri; tip bersifat visual. Hubungkan tip dengan `aria-describedby` untuk deskripsi tambahan seperti pintasan atau penjelasan.',
    'Tombol `.infotip` diberi `aria-label` berupa pertanyaan yang dijawabnya.',
    'Tooltip tidak bisa dicapai di layar sentuh; hal penting ditulis sebagai teks yang terlihat.',
    'Tidak ada Escape untuk menutup: tip hilang saat fokus atau pointer pergi.',
  ],
  do: [
    'Pakai satu sampai lima kata untuk nama; satu atau dua kalimat di tip lebar.',
    'Tampilkan pintasan keyboard jika ada.',
  ],
  dont: [
    'Menaruh tautan atau tombol di dalam tooltip.',
    'Menambah tooltip pada tombol yang sudah punya label terlihat dengan isi yang sama.',
    'Memakai tooltip untuk galat atau informasi wajib.',
  ],
};
