const COPY = (text, label = 'Salin jawaban') => `<button class="icon-btn" aria-label="${label}" data-lds-copy="${text}"><span class="swap" aria-hidden="true"><span class="ic swap__a">content_copy</span><span class="ic swap__b">check</span></span></button>`;

export default {
  summary: 'Satu giliran dalam percakapan. Kata-kata Anda ada di bubble aksen di kanan; asisten menjawab dengan teks baca biasa di kolom, dengan baris aksi yang tenang di bawahnya. Baris sistem berupa footnote di tengah.',
  when: [
    'Menampilkan apa yang dikirim orang (`msg--me`) dan apa yang dijawab asisten (`msg--ai`) di dalam [chat layout](chat-layout).',
    'Jawaban yang perlu aksi lanjutan: salin, coba lagi, bagikan.',
    'Baris tentang percakapan itu sendiri (`msg--system`): pergantian hari, mode yang dinyalakan, berkas yang dilampirkan.',
  ],
  whenNot: [
    ['Komentar pada dokumen atau catatan pemeriksaan', 'list'],
    ['Kutipan dari sumber di dalam jawaban', 'quote'],
    ['Pesan yang memberi tahu sesuatu tentang aplikasi (tersimpan, offline)', 'toast'],
    ['Kejadian dalam riwayat tanpa percakapan', 'timeline'],
    ['Langkah yang diambil asisten (mencari, membaca berkas)', 'tool-call'],
  ],
  where: 'Di dalam `.chat`. `msg--me` rata kanan, paling lebar 88 % kolom (maksimal 520 px); `msg--ai` memakai lebar baca penuh (maksimal 640 px); `msg--system` di tengah. Meta langsung di bawah bubble; aksi hanya di bawah jawaban asisten, sejajar dengan teks.',
  anatomy: [
    ['.msg', 'Wajib. Pembungkus pesan: kolom dengan jarak 6 px antara bubble, meta dan aksi.'],
    ['.msg--me / .msg--ai / .msg--system', 'Wajib. Siapa yang berbicara. Satu per pesan.'],
    ['.bubble', 'Wajib untuk me dan ai. Isi pesan. Isian aksen dengan sudut ekor 6 px untuk `--me`; tanpa isian dan tanpa padding untuk `--ai`, jadi jawaban terbaca seperti halaman.'],
    ['.msg__meta', 'Baris keterangan opsional: jam, "Diedit", "Tidak terkirim". Pakai [timestamp](timestamp) untuk waktu.'],
    ['.msg__actions', 'Baris opsional berisi [icon button](icon-button) 36 px di bawah jawaban: salin (dengan icon swap), coba lagi, bagikan.'],
  ],
  examples: [
    {
      title: 'Pesan Anda dan jawabannya',
      desc: 'Orang berbicara di bubble aksen; jawaban berupa teks biasa di kolom, lebih mudah dibaca panjang dan disalin. Tekan salin untuk melihat icon swap.',
      html: `<div class="chat" role="log" aria-label="Percakapan" style="max-width: 560px;">
  <div class="msg msg--me"><div class="bubble">Apa beda KTP-el dan KIA?</div><span class="msg__meta">09.41</span></div>
  <div class="msg msg--ai">
    <div class="bubble">KTP-el adalah kartu identitas elektronik untuk penduduk berusia 17 tahun ke atas, atau lebih muda bila sudah menikah. KIA adalah kartu identitas anak untuk penduduk di bawah 17 tahun; Disdukcapil menerbitkannya berdasarkan KK dan akta kelahiran.</div>
    <div class="msg__actions">${COPY('KTP-el untuk penduduk 17 tahun ke atas; KIA adalah kartu identitas anak di bawah 17 tahun.')}<button class="icon-btn" aria-label="Coba lagi"><span class="ic" aria-hidden="true">refresh</span></button><button class="icon-btn" aria-label="Bagikan jawaban"><span class="ic" aria-hidden="true">share</span></button></div>
  </div>
</div>`,
    },
    {
      title: 'Jawaban dengan sumber dan kode',
      desc: 'Jawaban panjang memakai [prose](prose) di dalam bubble untuk jarak paragraf; sumber berupa [sitasi](citation); kode inline terlipat, tidak meluber.',
      html: `<div class="chat" style="max-width: 560px;">
  <div class="msg msg--me"><div class="bubble">Bagaimana cara menghitung jumlah laporan di tabel pengaduan?</div></div>
  <div class="msg msg--ai">
    <div class="bubble prose">
      <p>Pakai <code class="code">SELECT COUNT(*) FROM complaints;</code> untuk menghitung semua laporan, termasuk laporan yang masih terbuka.<a class="cite" href="#">1</a></p>
      <p>Untuk menghitung laporan yang sudah selesai saja, sebut kolomnya: <code class="code">COUNT(closed_at)</code> melewati baris yang tanggal selesainya kosong.<a class="cite" href="#">2</a></p>
    </div>
    <div class="msg__actions">${COPY('SELECT COUNT(*) FROM complaints;')}<button class="icon-btn" aria-label="Coba lagi"><span class="ic" aria-hidden="true">refresh</span></button></div>
  </div>
</div>`,
    },
    {
      title: 'Meta: jam, diedit, tidak terkirim',
      desc: 'Meta adalah satu baris keterangan. Pesan yang gagal menyebutkannya dengan kata-kata di bawah bubble, beserta cara mencoba lagi; tidak ada bagian lain yang menjadi merah.',
      html: `<div class="chat" style="max-width: 560px;">
  <div class="msg msg--me"><div class="bubble">Ingatkan saya berkas apa saja yang perlu dibawa ke Samsat hari Jumat.</div><span class="msg__meta"><time class="timestamp" data-lds-time="2026-11-16T08:05:00+07:00"></time></span></div>
  <div class="msg msg--me"><div class="bubble">Fotokopi BPKB juga, ya.</div><span class="msg__meta">Diedit</span></div>
  <div class="msg msg--me"><div class="bubble">Dan jadwal Samsat keliling di Way Halim.</div><span class="field__help field__help--error"><span class="ic" aria-hidden="true">error</span>Tidak terkirim. Anda sedang offline.<button class="btn btn--plain btn--sm">Coba lagi</button></span></div>
</div>`,
    },
    {
      title: 'Baris sistem',
      desc: 'Teks footnote di tengah, tanpa bubble. Untuk hal yang dilakukan percakapan, bukan untuk ucapan seseorang.',
      html: `<div class="chat" style="max-width: 560px;">
  <p class="msg msg--system">Anda beralih ke mode terpandu. Formulir terkunci sampai semua berkas diperiksa.</p>
</div>`,
    },
  ],
  variants: [
    ['msg--me', 'Yang dikirim orang. Rata kanan, bubble aksen, sudut kanan bawah lebih kecil (6 px) sebagai ekor.'],
    ['msg--ai', 'Jawaban asisten. Teks biasa selebar penuh; tambahkan `prose` pada bubble jika jawaban berisi paragraf, daftar atau tabel.'],
    ['msg--system', 'Footnote di tengah tentang percakapan itu sendiri.'],
  ],
  states: [
    ['arriving (.is-new)', 'Tambahkan `is-new` pada pesan yang datang saat chat terbuka: pesan naik 8 px dan memudar masuk sekali (`lds-msg-in`). Riwayat yang dimuat sekaligus tidak memakai `is-new` dan langsung tampil.'],
    ['streaming', 'Bubble berupa `.stream.is-streaming` dengan caret; lihat [streaming text](streaming-text). Sembunyikan `.msg__actions` sampai selesai.'],
    ['edited', '"Diedit" di `.msg__meta`.'],
    ['not sent', 'Baris error di bawah bubble dengan tombol Coba lagi (di sini memakai `field__help--error`; belum ada kelas error khusus pesan).'],
    ['copied', 'Ikon salin berganti menjadi tanda centang selama 1,6 detik ([copy button](copy-button)).'],
  ],
  motion: [
    'Masuk: `lds-msg-in`, naik 8 px plus fade, `--d-smooth` (560 ms) dengan `--spring-smooth`. Diputar sekali, hanya pada pesan dengan `is-new` (dikirim atau diterima saat chat terbuka), jadi riwayat panjang tidak pernah beranimasi sebagai satu blok.',
    'Aksi: icon button mengecil ke 0,9 saat ditekan dalam 90 ms; salin mengganti glyph-nya dengan resep [icon swap](icon-swap) (yang lama mengecil ke 0,5 dan blur 4 px, yang baru mendarat dengan `--spring-snappy`).',
    'Tanpa efek naik saat hover, tanpa bubble membesar, tanpa titik mengetik: asisten menunjukkan prosesnya dengan [thinking](thinking) dan teksnya dengan [streaming text](streaming-text).',
    'Reduced motion: animasi masuk praktis instan (1 ms) dan icon swap cross-fade dalam 120 ms.',
  ],
  a11y: [
    'Pesan adalah elemen biasa di dalam kolom `role="log"`; jangan beri tiap pesan live region sendiri.',
    'Jika pembicara tidak jelas dari tata letak saja, tambahkan teks tersembunyi "Anda berkata" / "Asisten berkata" (`sr-only`) di awal setiap pesan.',
    'Setiap aksi adalah [icon button](icon-button) dengan `aria-label` yang menyebut objeknya: "Salin jawaban", bukan "Salin".',
    'Pesan yang gagal menyebutkannya dengan teks ("Tidak terkirim. Anda sedang offline.") dengan tombol Coba lagi di sebelahnya.',
  ],
  do: [
    'Biarkan jawaban berupa teks di kolom; tambahkan `prose` untuk struktur.',
    'Tampilkan aksi hanya di bawah jawaban yang sudah selesai.',
    'Sebut sumber dengan [sitasi](citation) di dalam jawaban.',
  ],
  dont: [
    'Menaruh asisten di bubble abu-abu atau memberinya avatar di setiap giliran.',
    'Menampilkan stempel waktu di bawah setiap pesan; utamakan baris hari dan meta di pesan terbaru.',
    'Mewarnai pesan gagal dengan merah tanpa kata-kata.',
  ],
  js: 'Tidak punya perilaku sendiri. Aksi salin memakai `data-lds-copy` ([copy button](copy-button)); waktu memakai `data-lds-time` ([timestamp](timestamp)); panggil `init()` pada pesan baru agar keduanya terpasang.',
};
