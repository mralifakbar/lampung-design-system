const COPY = (text) => `<button class="icon-btn" aria-label="Salin jawaban" data-lds-copy="${text}"><span class="swap" aria-hidden="true"><span class="ic swap__a">content_copy</span><span class="ic swap__b">check</span></span></button>`;
const ACTIONS = (text) => `<div class="msg__actions">${COPY(text)}<button class="icon-btn" aria-label="Coba lagi"><span class="ic" aria-hidden="true">refresh</span></button><button class="icon-btn" aria-label="Bagikan jawaban"><span class="ic" aria-hidden="true">share</span></button></div>`;
const SEND = `<button class="composer__send" type="submit" aria-label="Kirim"><span class="ic" aria-hidden="true">arrow_upward</span></button>`;
const APPEND = (chat, scroll) => `event.preventDefault(); const t = this.querySelector('textarea').value.trim(); if (!t) return; const m = document.createElement('div'); m.className = 'msg msg--me is-new'; const b = document.createElement('div'); b.className = 'bubble'; b.textContent = t; m.append(b); const c = document.getElementById('${chat}'); c.insertBefore(m, c.querySelector('.chat__jump')); const s = document.getElementById('${scroll}'); s.scrollTo({ top: s.scrollHeight, behavior: 'smooth' });`;

export default {
  summary: 'Kolom percakapan: pesan bertumpuk dengan jarak 20 px di `.chat`, riwayat bergulir di atas composer yang tidak ikut tergulir, dan tombol Terbaru yang muncul hanya saat pembaca menggulir ke atas. Pesan terbaru selalu di bawah.',
  when: [
    'Percakapan dengan asisten atau tutor: orang bertanya di kanan, jawaban mengisi kolom baca, pesan terbaru di bawah.',
    'Utas layanan pengaduan atau umpan balik yang urutan dan waktunya penting, dan orang membalas dari layar yang sama.',
    'Riwayat yang cukup panjang untuk digulir, saat orang membaca ke belakang dan butuh cara kembali ke pesan terbaru.',
  ],
  whenNot: [
    ['Riwayat kejadian tanpa kotak balasan (perubahan nilai, pembaruan status)', 'timeline'],
    ['Komentar yang masing-masing melekat pada bagian dokumen atau berkas permohonan', 'list', 'Letakkan di samping hal yang dibahas, bukan dalam satu kolom.'],
    ['Satu jawaban yang dibuat di dalam halaman tanpa tanya jawab', 'prose', 'Tampilkan [thinking](thinking) selama proses dan [streaming text](streaming-text) saat jawaban datang.'],
    ['Daftar notifikasi', 'list'],
    ['Penjelasan singkat untuk satu pertanyaan, di tempat', 'popover'],
  ],
  where: 'Kolom utama halaman atau panel setinggi layar di samping pekerjaan yang dibahas ([resizable split](resizable-split) di layar lebar). Riwayat adalah area gulir; [composer](composer) ada di bawahnya, di luar area gulir, selebar kolom. Di ponsel kolom memenuhi layar dan composer duduk di atas keyboard dengan inset safe-area (`safe-bottom`). Batasi lebar kolom paling lebar 640 px di layar lebar agar jawaban tetap mudah dibaca.',
  anatomy: [
    ['.chat', 'Wajib. Kolom pesan (flex, jarak 20 px). Beri `role="log"` dan label.'],
    ['.msg', 'Wajib. Satu pesan; lihat [chat message](chat-message) untuk `--me`, `--ai` dan bagian di dalamnya.'],
    ['.msg--system', 'Baris di tengah dengan huruf footnote untuk hal yang berubah dalam percakapan: pergantian hari, seseorang bergabung, mode yang dinyalakan.'],
    ['.chat__jump', 'Tombol sekunder kecil, anak terakhir `.chat`, dengan `data-lds-jump="<scroller id>"`. Menempel 88 px di atas dasar area gulir dan hanya tampil saat pembaca berjarak lebih dari 160 px dari ujung.'],
    ['.composer', 'Kotak balasan di bawah area gulir; lihat [composer](composer).'],
  ],
  examples: [
    {
      title: 'Percakapan bimbingan belajar',
      desc: 'Gulir riwayat ke atas dan tombol Terbaru muncul; tekan untuk meluncur kembali. Ketik pertanyaan lalu tekan Enter: pesan Anda masuk ke kolom.',
      html: `<div class="docs-col" style="max-width: 560px;">
  <div class="docs-scroll" id="cl-scroll" style="height: 320px;">
    <div class="chat" id="cl-chat" role="log" aria-label="Percakapan dengan tutor Anda">
      <p class="msg msg--system">Hari ini, 09.12</p>
      <div class="msg msg--me"><div class="bubble">Kenapa jawaban saya untuk soal nomor 4 disalahkan?</div><span class="msg__meta">09.12</span></div>
      <div class="msg msg--ai"><div class="bubble">Soal nomor 4 menanyakan gaya total, bukan gaya dorong. Anda menghitung dorongan 20 N tetapi tidak memasukkan gesekan yang melawannya sebesar 6 N. Gaya totalnya 14 N, jadi percepatannya 14 N dibagi 7 kg, yaitu 2 m/s².</div>${ACTIONS('Gaya totalnya 14 N, jadi percepatannya 2 m/s².')}</div>
      <div class="msg msg--me"><div class="bubble">Jadi gesekan selalu berlawanan dengan arah gerak?</div><span class="msg__meta">09.14</span></div>
      <div class="msg msg--ai"><div class="bubble">Berlawanan dengan arah gerak, atau dengan arah benda akan bergerak jika tidak ada yang menahan. Buku yang diam di atas meja miring mendapat gesekan ke arah atas lereng walaupun belum bergerak.</div>${ACTIONS('Gesekan berlawanan dengan arah gerak atau arah gerak yang akan terjadi.')}</div>
      <div class="msg msg--me"><div class="bubble">Boleh saya coba soal yang mirip?</div><span class="msg__meta">09.15</span></div>
      <div class="msg msg--ai"><div class="bubble">Ini soalnya. Peti 5 kg didorong dengan gaya 30 N di lantai yang memberi gesekan 10 N. Berapa percepatannya?</div>${ACTIONS('Peti 5 kg didorong 30 N melawan gesekan 10 N. Berapa percepatannya?')}</div>
      <button class="btn btn--secondary btn--sm chat__jump" data-lds-jump="cl-scroll"><span class="ic" aria-hidden="true">arrow_downward</span>Terbaru</button>
    </div>
  </div>
  <form class="composer" data-lds-composer onsubmit="${APPEND('cl-chat', 'cl-scroll')}"><textarea rows="1" aria-label="Kirim pesan ke tutor" placeholder="Tanyakan tentang materi ini"></textarea>${SEND}</form>
</div>`,
      code: `<div class="chat-scroll" id="chat-scroll"><!-- your scroller: overflow-y: auto, flex: 1 -->
  <div class="chat" role="log" aria-label="Percakapan dengan tutor Anda">
    <p class="msg msg--system">Hari ini, 09.12</p>
    <div class="msg msg--me"><div class="bubble">Kenapa jawaban saya untuk soal nomor 4 disalahkan?</div><span class="msg__meta">09.12</span></div>
    <div class="msg msg--ai"><div class="bubble">Soal nomor 4 menanyakan gaya total…</div>
      <div class="msg__actions">…</div>
    </div>
    <button class="btn btn--secondary btn--sm chat__jump" data-lds-jump="chat-scroll"><span class="ic" aria-hidden="true">arrow_downward</span>Terbaru</button>
  </div>
</div>
<form class="composer" data-lds-composer>
  <textarea rows="1" aria-label="Kirim pesan ke tutor" placeholder="Tanyakan tentang materi ini"></textarea>
  <button class="composer__send" type="submit" aria-label="Kirim"><span class="ic" aria-hidden="true">arrow_upward</span></button>
</form>
<script type="module">
  import { init } from 'lampung-design-system/js';
  init();
  document.querySelector('.composer').addEventListener('lds:send', (e) => sendToTutor(e.detail.text));
</script>`,
    },
    {
      title: 'Baris sistem menandai perubahan',
      desc: 'Pergantian hari, mode yang dinyalakan, berkas yang ditambahkan ke percakapan: baris footnote di tengah, tanpa bubble, tanpa aksi. Baris ini bagian dari riwayat, jadi ikut tergulir.',
      html: `<div class="chat" role="log" aria-label="Latihan ujian" style="max-width: 560px;">
  <p class="msg msg--system">Kemarin</p>
  <div class="msg msg--me"><div class="bubble">Uji saya tentang bab 3, sepuluh soal.</div></div>
  <div class="msg msg--ai"><div class="bubble">Silakan mulai kapan saja. Setiap soal punya empat pilihan; jawab dengan hurufnya.</div></div>
  <p class="msg msg--system">Mode ujian aktif. Petunjuk disembunyikan sampai Anda mengumpulkan jawaban.</p>
  <p class="msg msg--system">Anda melampirkan draf-laporan-praktikum.pdf</p>
  <p class="msg msg--system">Hari ini</p>
  <div class="msg msg--me"><div class="bubble">Kumpulkan jawaban saya.</div></div>
</div>`,
    },
    {
      title: 'Sebelum pesan pertama',
      desc: 'Percakapan kosong menjelaskan apa yang bisa dilakukan asisten dan menawarkan dua atau tiga pertanyaan pembuka sebagai chip. Chip mengisi composer; orang tetap menekan kirim.',
      html: `<div class="docs-col" style="max-width: 560px;">
  <div class="empty">
    <div class="empty__icon"><span class="ic" aria-hidden="true">school</span></div>
    <p class="empty__title">Tanya tentang Biologi kelas X</p>
    <p class="empty__body">Jawaban memakai catatan pelajaran Anda dan menyebut halaman sumbernya.</p>
  </div>
  <div class="chip-row" style="justify-content: center;">
    <button class="chip" onclick="const t = this.closest('.docs-col').querySelector('textarea'); t.value = this.textContent; t.dispatchEvent(new Event('input')); t.focus();">Jelaskan osmosis dengan sederhana</button>
    <button class="chip" onclick="const t = this.closest('.docs-col').querySelector('textarea'); t.value = this.textContent; t.dispatchEvent(new Event('input')); t.focus();">Uji saya tentang bagian sel</button>
    <button class="chip" onclick="const t = this.closest('.docs-col').querySelector('textarea'); t.value = this.textContent; t.dispatchEvent(new Event('input')); t.focus();">Ringkas bab 2</button>
  </div>
  <form class="composer" data-lds-composer><textarea rows="1" aria-label="Pesan" placeholder="Ajukan pertanyaan"></textarea>${SEND}</form>
</div>`,
      code: `<div class="empty">
  <div class="empty__icon"><span class="ic" aria-hidden="true">school</span></div>
  <p class="empty__title">Tanya tentang Biologi kelas X</p>
  <p class="empty__body">Jawaban memakai catatan pelajaran Anda dan menyebut halaman sumbernya.</p>
</div>
<div class="chip-row">
  <button class="chip">Jelaskan osmosis dengan sederhana</button>
  <button class="chip">Uji saya tentang bagian sel</button>
</div>
<form class="composer" data-lds-composer>…</form>
<!-- On a chip click: put its text in the textarea, dispatch 'input' (enables send), focus it. -->`,
    },
  ],
  states: [
    ['empty', 'Belum ada pesan: [empty state](empty-state) dengan dua atau tiga [chip](chips) pembuka di atas composer.'],
    ['scrolled up', '`.chat__jump.is-visible` begitu area gulir berjarak lebih dari 160 px dari ujung; tombol hilang lagi di bawah.'],
    ['assistant working', 'Pesan terakhir berupa baris [thinking](thinking), lalu balasan mengalir masuk ([streaming text](streaming-text)).'],
    ['new message', '`.msg.is-new` naik 8 px dan memudar masuk sekali saat disisipkan; riwayat tanpa `is-new` langsung tampil.'],
  ],
  motion: [
    'Setiap `.msg.is-new` masuk sekali dengan `lds-msg-in` (beri `is-new` hanya untuk pesan yang datang saat chat terbuka): dari 8 px di bawah dan transparan, selama `--d-smooth` (560 ms) dengan `--spring-smooth`. Saat pesan datang, tidak ada yang bergerak di kolom selain pesan baru itu.',
    'Tombol Terbaru memudar selama `--d-fast` dan naik 8 px dengan `--spring-smooth`; ini transition, jadi menggulir bolak-balik membaliknya dari posisi saat itu.',
    'Lompatan menggulir dengan `behavior: smooth`; dengan reduced motion langsung melompat.',
    'Pesan yang dirender sekaligus (membuka percakapan lama) juga memainkan animasi masuk pada saat yang sama. Render riwayat sebelum menyisipkannya, atau terima satu fade bersama; jangan pernah memberi stagger pada seluruh riwayat.',
    'Reduced motion: animasi masuk menjadi fade 1 ms (praktis instan) dan tombol lompat cross-fade dalam 120 ms.',
  ],
  a11y: [
    'Beri `.chat` `role="log"` dan `aria-label`; pesan baru lalu diumumkan secara sopan (polite). Selama balasan mengalir, pasang `aria-busy="true"` pada pesan itu dan hapus setelah selesai agar balasan dibacakan sekali, utuh.',
    'Baris sistem berupa teks biasa (`<p>`), bukan live region tersendiri; log yang mengumumkannya.',
    'Textarea composer perlu label (`aria-label` atau label yang terlihat); lihat [composer](composer).',
    'Tombol Terbaru adalah tombol sungguhan dengan label yang terlihat. Saat tersembunyi ia transparan tetapi masih bisa difokus: render hanya saat dibutuhkan jika pengguna keyboard melaporkannya.',
  ],
  do: [
    'Letakkan composer di luar area gulir agar tidak ikut tergulir.',
    'Hentikan gulir otomatis saat pembaca menggulir ke atas; tampilkan tombol Terbaru.',
    'Pakai baris sistem untuk hal yang dilakukan percakapan dengan sendirinya (mode, berkas, hari).',
  ],
  dont: [
    'Menganimasikan seluruh riwayat masuk, atau memberi stagger pada pesan lama.',
    'Memasang stempel waktu di setiap pesan; kelompokkan per hari dengan baris sistem dan tampilkan jam saat hover atau di [meta pesan](chat-message).',
    'Membangun chat dari card atau baris list.',
  ],
  js: 'Perilaku berasal dari `init()`: `[data-lds-jump="<scroller id>"]` pada tombol Terbaru menampilkannya saat area gulir berjarak lebih dari 160 px dari ujung dan menggulir ke ujung saat diklik; `[data-lds-composer]` memasang perilaku [composer](composer) (Enter mengirim, `lds:send` membawa `{ text }`). Di React, render markup yang sama dan panggil `init(ref.current)` di effect setelah pesan dirender.',
};
