export default {
  summary: 'Kode berformat tetap di atas isian tenang, dengan bilah untuk namanya dan aksi salin. Tiga warna token yang tenang, gulir mendatar, tanpa pemenggalan baris.',
  when: [
    'Kode, perintah, atau konfigurasi yang disalin pembaca: baris instalasi, panggilan API, cuplikan dalam dokumentasi.',
    'Keluaran yang harus dibaca persis (potongan log, kunci yang dibuat sistem).',
  ],
  whenNot: [
    ['Kata kode pendek di dalam kalimat', 'inline-code'],
    ['Alat yang dijalankan asisten, dengan masukan dan keluarannya', 'tool-call'],
    ['Kutipan dari sebuah sumber', 'quote'],
    ['Teks panjang', 'prose'],
  ],
  where: 'Di kolom baca, selebar kolom itu, di antara paragraf [prose](prose) atau di bawah judul bagian. Di ponsel lebarnya tetap dan bergulir ke samping; kode tidak pernah dipenggal.',
  anatomy: [
    ['.codeblock', 'Wajib. Isian tenang, radius 14 px, memotong isinya.'],
    ['.codeblock__bar', 'Bilah 40 px dengan nama berkas atau bahasa di kiri dan [tombol salin](copy-button) di kanan.'],
    ['pre', 'Wajib. Mono 12,5 px, tinggi baris 20 px, padding 14/16 px, bergulir mendatar.'],
    ['.k / .s / .c', 'Warna token: kunci dan kata kunci (aksen), string (success), komentar (muted).'],
  ],
  examples: [
    {
      title: 'Dengan aksi salin',
      desc: 'Bilah menyebut nama berkas; tombol salin mengonfirmasi di tempat.',
      html: `<div class="codeblock" style="max-width: 560px;">
  <div class="codeblock__bar"><span>styles.css</span><button class="btn btn--plain btn--sm" data-lds-copy="@import 'lampung-design-system/css';"><span class="swap" style="width: 16px; height: 16px;" aria-hidden="true"><span class="ic swap__a" style="font-size: 16px;">content_copy</span><span class="ic swap__b" style="font-size: 16px;">check</span></span><span data-lds-copy-label="Disalin">Salin</span></button></div>
  <pre><code>@import 'lampung-design-system/css';</code></pre>
</div>`,
    },
    {
      title: 'Token yang disorot',
      desc: 'Bungkus token sendiri, atau biarkan highlighter menghasilkan tiga kelas itu.',
      html: `<div class="codeblock" style="max-width: 560px;">
  <div class="codeblock__bar"><span>tokens.css</span></div>
  <pre><code><span class="c">/* satu hijau, dipakai seperlunya */</span>
<span class="k">--accent</span>: #0B6E4F;
<span class="k">--d-exit</span>: 180ms;
<span class="k">--font</span>: <span class="s">"Plus Jakarta Sans", system-ui, sans-serif</span>;</code></pre>
</div>`,
    },
  ],
  variants: [
    ['with bar', 'Nama dan aksi salin. Default untuk apa pun yang bisa disalin.'],
    ['without bar', 'Hanya `pre` di dalam `.codeblock`, untuk keluaran yang dibaca.'],
  ],
  states: [
    ['copied', 'Tombol salin menukar ikonnya menjadi `check` dan labelnya menjadi "Disalin" sesaat ([tombol salin](copy-button)).'],
  ],
  motion: [
    'Hanya tombol salin yang bergerak: pertukaran ikon dengan `--spring-snappy`. Bloknya sendiri diam.',
  ],
  a11y: [
    'Pakai `<pre><code>` agar isinya diumumkan sebagai kode dan spasi tetap terjaga.',
    'Tombol salin punya label yang terlihat ("Salin"); konfirmasinya mengubah teks label, yang diumumkan saat fokus berada di tombol itu.',
    'Warna token tidak bermakna sendiri; kontrasnya tetap setara teks isi di atas isian.',
    'Baris panjang bergulir di dalam `pre`; buat bloknya bisa difokus (`tabindex="0"`) bila meluap agar pengguna keyboard bisa menggulirnya.',
  ],
  do: [
    'Sebut nama berkas atau bahasanya di bilah.',
    'Buat cuplikan singkat dan bisa langsung dijalankan.',
  ],
  dont: [
    'Memenggal baris kode atau mengecilkan huruf agar muat.',
    'Memakai blok bertema gelap di dalam tema terang.',
    'Menampilkan kode sebagai gambar.',
  ],
  js: 'Opsional. Tombol salin memakai `data-lds-copy="text"` (lihat [tombol salin](copy-button)).',
};
