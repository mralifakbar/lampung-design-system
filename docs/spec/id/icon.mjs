export default {
  summary: 'Ikon adalah teks: `<span class="ic" aria-hidden="true">search</span>`, digambar oleh font ligatur dari set Solar. Hanya nama di `icons/icons.json` yang ada; nama lain tidak menampilkan apa pun, tanpa pesan.',
  when: [
    'Sebuah label jadi lebih cepat dibaca dengan glyph yang sudah dikenal orang: cari, tambah, unduh, kalender, pengaturan.',
    'Di dalam komponen yang mengharapkannya: tombol sebelum labelnya, [icon button](icon-button), baris daftar, alert, badge, [empty state](empty-state).',
    'Status terpilih atau berisi butuh gaya tebal (`ic--fill`): toggle yang tertekan, hati yang disukai, tab saat ini.',
  ],
  whenNot: [
    ['Ikon yang bisa diklik tanpa teks', 'icon-button', '`.ic` polos hanya hiasan; tombol memberinya target 44 px, nama, dan tooltip.'],
    ['Kotak kecil berwarna yang membedakan baris di daftar pengaturan', 'list', 'Pakai `.lrow--icon` dengan `.lrow__icon`.'],
    ['Seseorang atau organisasi', 'avatar'],
    ['Titik yang menyatakan online, offline, atau siaran langsung', 'status-dot'],
    ['Ikon yang berganti makna saat ditekan (salin ke disalin, putar ke jeda)', 'icon-swap'],
  ],
  where: 'Sebelum teks yang dijelaskannya, berjarak 6 sampai 10 px (komponen yang mengatur jaraknya). Ikon mengikuti `currentColor`, jadi memakai warna teks induknya; ikon redup memakai `--text-subtle` atau `--text-muted`. Di ponsel ukurannya sama; jangan pernah mengecilkan ikon agar muat.',
  anatomy: [
    ['.ic', 'Wajib. `<span>` yang teksnya adalah nama ikon. 20 px, gaya garis, persegi `1em`, tidak pernah turun baris.'],
    ['.ic--fill', 'Gaya tebal (berisi) dari font kedua, untuk status terpilih dan berisi.'],
    ['.ic--sm / .ic--lg', '16 px (baris padat, badge, tombol kecil) / 24 px (header halaman, empty state).'],
    ['aria-hidden="true"', 'Wajib saat ada teks terlihat di sampingnya, yang hampir selalu terjadi.'],
  ],
  examples: [
    {
      title: 'Garis dan isi',
      desc: 'Garis sebagai bawaan; gaya isi menandai sesuatu yang terpilih atau menyala.',
    },
    {
      title: 'Ukuran',
      desc: '16 untuk meta padat, 20 sebagai bawaan, 24 untuk header. Di dalam komponen ukurannya sudah diatur (19 di tombol, 22 di icon button, 14 di badge).',
    },
    {
      title: 'Di samping teks',
      desc: 'Ikon dekoratif disembunyikan dari pembaca layar; kata-katalah yang membawa makna.',
      html: `<div class="docs-col" style="max-width: 420px;">
  <button class="btn btn--secondary"><span class="ic" aria-hidden="true">download</span>Unduh bukti pendaftaran</button>
  <span class="badge badge--success"><span class="ic" aria-hidden="true">check</span>Disetujui</span>
  <span class="field__help"><span class="ic" aria-hidden="true">info</span>Izin Anda berlaku setelah ditandatangani kepala dinas.</span>
</div>`,
    },
    {
      title: 'Berdiri sendiri',
      desc: 'Saat ikon adalah satu-satunya yang menyampaikan sesuatu (status di sel tabel), beri role dan nama alih-alih menyembunyikannya.',
      html: `<span class="ic ic--fill" role="img" aria-label="Terverifikasi" style="color: var(--success-text);">check_circle</span>`,
    },
  ],
  variants: [
    ['ic--fill', 'Gaya tebal untuk status terpilih, tertekan, dan berisi. Toggle tertekan, ikon alert, chip ikon daftar, dan thumbnail petak berkas otomatis beralih ke gaya ini.'],
    ['ic--sm', '16 px.'],
    ['ic--lg', '24 px.'],
    ['style="color: …"', 'Hanya dengan token (`--text-subtle`, `--accent-text`, `--success-text`); jangan pernah hex mentah.'],
  ],
  motion: [
    'Ikon tidak bergerak sendiri. Saat satu ikon berganti makna, pakai [icon swap](icon-swap): glyph lama mengecil ke 0.5 dan blur 4 px dalam `--d-fast` sementara yang baru mendarat dengan `--spring-snappy` selama `--d-snappy`.',
    'Chevron yang membuka sesuatu berputar 180 derajat dengan `--spring-smooth` (split button, tool call, accordion); putaran itu milik komponennya.',
    'Tidak ada ikon berputar untuk memuat: pakai [spinner](spinner).',
  ],
  a11y: [
    'Dekoratif (di samping teks): `aria-hidden="true"`. Ini bawaannya; tanpa itu pembaca layar membacakan nama ligaturnya ("calendar_month").',
    'Bermakna dan berdiri sendiri: `role="img"` dan `aria-label` dalam kata sederhana.',
    'Kontrol hanya ikon adalah [icon button](icon-button) dengan `aria-label`; label dipasang pada tombol, bukan span.',
    'Jangan pernah mengandalkan warna ikon saja untuk status; pasangkan dengan kata-kata.',
  ],
  do: [
    'Periksa nama di `icons/icons.json` sebelum memakainya.',
    'Pilih ikon karena maknanya; jika tidak ada yang cocok, jangan pakai ikon.',
    'Pakai gaya isi untuk "menyala", gaya garis untuk "mati".',
  ],
  dont: [
    'Memakai `<svg>` atau emoji jika ikon sistem tersedia, atau mencampur set ikon lain.',
    'Mengarang nama: `arrow_right`, `trash`, dan `user` tampil kosong (namanya `arrow_forward`, `delete`, `person`).',
    'Menghias heading atau fitur "AI" dengan glyph kilauan atau sejenisnya.',
  ],
  js: 'Tidak ada. Untuk menambah ikon: tambahkan `"my_name": "solar-base-name"` ke `icons/icons.json` lalu jalankan `npm run build:icons`.',
};
