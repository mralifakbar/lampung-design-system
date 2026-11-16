export default {
  summary: 'Tutup tombol kecil yang menampilkan pintasan keyboard: `.kbd` untuk satu tombol, `.kbd-row` untuk kombinasi. Pintasan adalah petunjuk di samping aksi, tidak pernah satu-satunya cara mencapainya.',
  when: [
    'Menampilkan pintasan sebuah aksi di [tooltip](tooltip), item [dropdown menu](dropdown-menu), atau footer [command palette](command-palette).',
    'Teks bantuan atau orientasi yang mengajarkan pintasan ("Tekan ⌘ K untuk mencari").',
    'Keterangan di bawah daftar yang dikendalikan dengan tombol (↑ ↓ untuk berpindah, ↵ untuk membuka).',
  ],
  whenNot: [
    ['Menampilkan kode, nama berkas, atau nilai di dalam teks', 'inline-code'],
    ['Jumlah di samping label', 'count'],
    ['Kata status (Draf, Jatuh tempo besok)', 'badge'],
    ['Tombol sungguhan yang ditekan orang di layar', 'button'],
  ],
  where: 'Setelah label yang menjadi miliknya: di akhir item menu (`.menu__item .kbd-row` rata kanan dengan sendirinya), di dalam tooltip setelah teks, sebaris di dalam kalimat. Sembunyikan petunjuk pintasan di perangkat sentuh saja; di sana tidak ada artinya.',
  anatomy: [
    ['.kbd', 'Wajib. Satu tombol: tinggi 22 px, lebar minimal 22 px, teks medium 12 px di atas `--bg-base` dengan tepi bawah 1.5 px. Pakai elemen `<kbd>`.'],
    ['.kbd-row', 'Membungkus beberapa `.kbd` untuk kombinasi, berjarak 4 px.'],
  ],
  examples: [
    {
      title: 'Tombol dan kombinasi',
      desc: 'Pakai simbol yang terlihat di keyboard orang; tulis lengkap tombol yang tidak punya simbol umum (esc, tab).',
      html: `<div class="docs-row" style="gap: 28px;">
  <span class="kbd-row"><kbd class="kbd">⌘</kbd><kbd class="kbd">K</kbd></span>
  <span class="kbd-row"><kbd class="kbd">⇧</kbd><kbd class="kbd">⌘</kbd><kbd class="kbd">P</kbd></span>
  <kbd class="kbd">esc</kbd>
  <span class="kbd-row"><kbd class="kbd">↑</kbd><kbd class="kbd">↓</kbd><span class="docs-note" style="margin-left: 6px;">untuk berpindah</span></span>
  <span class="kbd-row"><kbd class="kbd">↵</kbd><span class="docs-note" style="margin-left: 6px;">untuk membuka</span></span>
</div>`,
    },
    {
      title: 'Di tooltip dan kalimat',
      desc: 'Di dalam tooltip, tombol menyesuaikan diri dengan permukaan gelap.',
      html: `<div class="docs-row" style="gap: 24px;">
  <span class="tip-host"><button class="icon-btn icon-btn--filled" aria-label="Cari" aria-keyshortcuts="Meta+K"><span class="ic" aria-hidden="true">search</span></button><span class="tip" role="tooltip">Cari<span class="kbd">⌘K</span></span></span>
  <p class="card__sub" style="margin: 0;">Tekan <kbd class="kbd">/</kbd> di mana saja untuk langsung ke kolom pencarian.</p>
</div>`,
    },
    {
      title: 'Di menu',
      desc: '`kbd-row` di dalam item menu terdorong ke tepi kanan.',
      html: `<div class="menu is-open" role="menu" aria-label="Sunting" style="position: relative;">
  <button class="menu__item" role="menuitem" aria-keyshortcuts="Meta+C"><span class="ic" aria-hidden="true">content_copy</span>Salin tautan<span class="kbd-row"><kbd class="kbd">⌘</kbd><kbd class="kbd">C</kbd></span></button>
  <button class="menu__item" role="menuitem" aria-keyshortcuts="Meta+D"><span class="ic" aria-hidden="true">edit_square</span>Gandakan<span class="kbd-row"><kbd class="kbd">⌘</kbd><kbd class="kbd">D</kbd></span></button>
</div>`,
    },
  ],
  motion: [
    'Tidak ada. Tombol adalah label statis.',
  ],
  a11y: [
    'Pakai elemen `<kbd>` agar maknanya tetap ada tanpa gaya.',
    'Pasang pintasan pada kontrolnya sendiri dengan `aria-keyshortcuts` (misalnya `Meta+K`); tutup tombol yang terlihat ditujukan bagi pengguna yang melihat.',
    'Pembaca layar membaca simbol seperti ⌘ secara tidak konsisten; jika pintasan adalah isinya (halaman bantuan), tulis juga dalam kata ("Command K").',
    'Setiap pintasan juga punya jalur yang terlihat dan bisa diklik.',
  ],
  do: [
    'Tampilkan tombol sesuai platform: ⌘ di Mac, Ctrl di tempat lain.',
    'Satu tombol per tutup; pakai `kbd-row` untuk kombinasi.',
  ],
  dont: [
    'Memberi `.kbd` gaya tombol atau membuatnya bisa diklik.',
    'Menampilkan pintasan di tata letak ponsel.',
    'Menjadikan pintasan satu-satunya cara mencapai sebuah aksi.',
  ],
};
