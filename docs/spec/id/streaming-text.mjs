const THINK = `<div class="thinking" data-lds-thinking role="status"><span class="dotgrid" aria-hidden="true"></span><span class="shimmer">Membaca catatan Anda</span><span class="thinking__time"></span></div>`;
const ANSWER = 'Fotosintesis mengubah cahaya, air dan karbon dioksida menjadi gula dan oksigen. Prosesnya terjadi di kloroplas, terutama di daun, dan gulanya menjadi makanan bagi seluruh tumbuhan.';

export default {
  summary: 'Jawaban yang datang kata demi kata, setiap kata memudar masuk dari blur 3 px, dengan caret bulat di ujung selama masih ada yang datang. Ini menunjukkan kemajuan nyata; jangan pernah memalsukannya untuk teks yang sudah Anda miliki.',
  when: [
    'Balasan asisten yang dibuat sementara orang menunggu: tampilkan kata saat datang dari server.',
    'Tepat setelah [thinking](thinking) selesai: baris thinking mengendap, lalu jawaban mengalir di bawahnya.',
  ],
  whenNot: [
    ['Menunggu sebelum kata pertama ada', 'thinking'],
    ['Teks yang sudah Anda miliki utuh (jawaban tersimpan, artikel bantuan)', 'prose', 'Tampilkan sekaligus; mengetiknya ulang hanya memperlambat orang.'],
    ['Status pendek yang berubah (Menyimpan, Tersimpan)', 'text-morph'],
    ['Memuat tata letak halaman', 'skeleton'],
  ],
  where: 'Di dalam `.bubble` [chat message](chat-message) `msg--ai`, atau di blok baca mana pun yang sedang dibuat (ringkasan di atas laporan). Baris aksi pesan tetap tersembunyi sampai streaming selesai.',
  anatomy: [
    ['.stream', 'Elemen yang menerima kata (ditambahkan oleh `streamText`).'],
    ['.stream.is-streaming', 'Selama kata masih datang: menggambar caret bulat 8 px setelah kata terakhir, berkedip setiap detik.'],
    ['.stream__w', 'Satu kata yang sudah datang. Memudar dari blur 3 px dan transparan selama 360 ms.'],
  ],
  examples: [
    {
      title: 'Jawaban yang sedang datang',
      desc: 'Tekan Tanya lagi. Kata muncul sesuai kecepatan datangnya; caret menandakan masih ada yang datang dan hilang saat jawaban lengkap. Baris aksi baru muncul di akhir.',
      html: `<div class="chat" style="max-width: 560px;">
  <div class="msg msg--me"><div class="bubble">Apa itu fotosintesis, dalam dua kalimat?</div></div>
  <div class="msg msg--ai"><div class="bubble" id="st-a">${ANSWER}</div><div class="msg__actions"><button class="icon-btn" aria-label="Salin jawaban" data-lds-copy="${ANSWER}"><span class="swap" aria-hidden="true"><span class="ic swap__a">content_copy</span><span class="ic swap__b">check</span></span></button></div></div>
  <button class="btn btn--secondary btn--sm" style="align-self: flex-start;" onclick="const b = document.getElementById('st-a'); const acts = b.nextElementSibling; acts.hidden = true; b.setAttribute('aria-busy', 'true'); import('../../js/lds.js').then((m) => m.streamText(b, '${ANSWER}')).then(() => { acts.hidden = false; b.removeAttribute('aria-busy'); });"><span class="ic" aria-hidden="true">refresh</span>Tanya lagi</button>
</div>`,
    },
    {
      title: 'Setelah thinking',
      desc: 'Thinking berjalan dengan timer sungguhan selama asisten membaca. Saat kata pertama siap, ia mengendap menjadi ringkasan apa yang dilakukan, dan jawaban mengalir di bawahnya.',
      html: `<div class="msg msg--ai" style="max-width: 560px;">
  ${THINK}
  <div class="bubble" id="st-b"></div>
  <button class="btn btn--secondary btn--sm" style="align-self: flex-start;" onclick="this.hidden = true; const msg = this.closest('.msg'); import('../../js/lds.js').then((m) => { m.thinkingDone(msg.querySelector('.thinking'), 'Membaca 3 halaman catatan Anda'); return m.streamText(document.getElementById('st-b'), 'Catatan Anda mendefinisikan osmosis sebagai perpindahan air melalui membran ke sisi yang kadar garamnya lebih tinggi. Halaman 12 memuat percobaan kentang yang membuktikannya.'); });">Selesaikan thinking</button>
</div>`,
      code: `<div class="msg msg--ai">
  <div class="thinking" data-lds-thinking role="status"><span class="dotgrid" aria-hidden="true"></span><span class="shimmer">Membaca catatan Anda</span><span class="thinking__time"></span></div>
  <div class="bubble"></div>
</div>
<script type="module">
  import { thinkingDone, streamText } from 'lampung-design-system/js';
  // when the first token arrives:
  thinkingDone(msg.querySelector('.thinking'), 'Membaca 3 halaman catatan Anda');
  await streamText(msg.querySelector('.bubble'), text);
</script>`,
    },
    {
      title: 'Ringkasan yang dibuat di halaman',
      desc: 'Streaming tidak hanya untuk chat. Ringkasan laporan bisa datang dengan cara yang sama di atas halaman sementara bagian lain halaman sudah bisa dipakai.',
      html: `<div class="card" style="max-width: 560px;">
  <p class="card__title">Ringkasan kelas</p>
  <p class="card__sub stream is-streaming" id="st-c" style="margin-top: 8px;"></p>
  <button class="btn btn--plain btn--sm" style="margin-top: 8px; margin-left: -10px;" onclick="this.hidden = true; import('../../js/lds.js').then((m) => m.streamText(document.getElementById('st-c'), 'Sebagian besar siswa menyelesaikan kuis dalam waktu kurang dari 20 menit. Soal nomor 7 salah dijawab oleh 18 dari 30 siswa, jadi perlu dibahas ulang hari Senin.'));">Buat ringkasan</button>
</div>`,
    },
  ],
  states: [
    ['streaming', '`.stream.is-streaming`: kata sedang datang, caret tampil, `aria-busy="true"` pada wadah.'],
    ['done', 'Caret dihapus, `aria-busy` dihapus, aksi ditampilkan.'],
    ['stopped', 'Jika orang menghentikan pembuatan jawaban, anggap selesai di titik itu dan tambahkan baris [meta pesan](chat-message) "Dihentikan".'],
  ],
  motion: [
    'Setiap kata: `lds-word-in`, dari `opacity: 0` dan `blur(3px)` menjadi tajam selama 360 ms dengan `--ease-enter`. Tanpa perpindahan, jadi baris tidak pernah melompat saat dibaca.',
    'Kecepatan: `streamText` menambah satu kata setiap `wordMs` (bawaan 40 ms). Saat streaming dari server, tambahkan kata ketika datang; jangan menambah jeda buatan di atasnya.',
    'Caret: titik 8 px setelah kata terakhir, berkedip dengan `lds-caret` (1 detik, bertahap). Hilang begitu teks lengkap.',
    'Interupsi: memanggil `streamText` lagi pada elemen yang sama mengosongkannya dan mulai dari awal; kata yang sudah memudar masuk tetap tajam.',
    'Reduced motion: kata muncul sekaligus (tanpa jeda, fade 1 ms) dan caret tampil tanpa berkedip.',
  ],
  a11y: [
    'Pasang `aria-busy="true"` pada pesan selama streaming dan hapus di akhir, agar screen reader di `role="log"` membacakan seluruh jawaban sekali, bukan kata demi kata.',
    'Jangan memindahkan fokus ke jawaban selama streaming; orang mungkin sedang mengetik pertanyaan berikutnya.',
    'Caret hanya dekorasi (pseudo-element); tidak ada yang perlu disembunyikan.',
  ],
  do: [
    'Pakai streaming hanya untuk teks yang memang sedang dibuat.',
    'Pasangkan dengan [thinking](thinking) untuk masa tunggu sebelum kata pertama.',
    'Tampilkan aksi salin dan coba lagi hanya setelah selesai.',
  ],
  dont: [
    'Mengetik ulang teks yang sudah Anda miliki agar terlihat pintar.',
    'Menganimasikan kata naik ke atas atau membesar; baris bacaan harus tetap diam.',
    'Menggulir percakapan otomatis saat pembaca sudah menggulir ke atas; tampilkan tombol Terbaru ([chat layout](chat-layout)).',
  ],
  js: '`streamText(el, text, { wordMs = 40 })` dari `js/lds.js` menambahkan `stream is-streaming` ke `el`, mengosongkannya, menambahkan setiap kata sebagai span `.stream__w`, dan me-resolve promise-nya saat selesai (menghapus `is-streaming`). Dengan token langsung, tambahkan `stream is-streaming` sendiri, tambahkan `<span class="stream__w">word</span>` per kata, dan hapus `is-streaming` di akhir.',
};
