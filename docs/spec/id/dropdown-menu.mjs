export default {
  summary: 'Daftar perintah yang turun dari tombol: opsi urutan, aksi baris, menu "lainnya" di balik icon button. Item menjalankan sesuatu; bukan field formulir.',
  when: [
    'Tiga sampai tujuh perintah pada satu objek yang tidak layak punya tombol sendiri: Duplikat, Pindahkan, Ekspor, Hapus.',
    'Pola "lainnya": [icon button](icon-button) `more_horiz` di ujung baris, kartu, atau header, membuka aksi yang jarang.',
    'Memilih cara daftar diurutkan atau ditampilkan, dengan centang pada pilihan saat ini.',
  ],
  whenNot: [
    ['Memilih nilai untuk field formulir', 'select', 'Select adalah field dengan label dan nilai; menu menjalankan perintah'],
    ['Mencari atau mengetik untuk menemukan opsi', 'combobox'],
    ['Konten kaya yang tertambat pada tombol (formulir mini, kalender, deskripsi)', 'popover'],
    ['Perintah yang dibuka dengan klik kanan atau tekan lama pada sebuah area', 'context-menu'],
    ['Aksi sekunder yang menempel pada tombol utama (Terbitkan, Jadwalkan nanti)', 'split-button'],
    ['Dua sampai lima tampilan dari konten yang sama, selalu terlihat', 'segmented-control'],
  ],
  where: 'Menggantung 6 px di bawah pemicunya, rata dengan tepi kiri pemicu, atau tepi kanannya (`.menu--right`) jika pemicu berada di kanan baris. Pakai `.menu--up` jika tidak ada ruang di bawah. Pemicu dan menu berbagi pembungkus `position: relative`.',
  anatomy: [
    ['[data-lds-menu="id"]', 'Wajib. Tombol pemicu: `aria-haspopup="menu"`, `aria-expanded="false"`.'],
    ['.menu[role=menu]', 'Wajib. Daftar mengambang dengan `id`, minimal 220 px, terangkat dengan satu-satunya bayangan. Posisikan dengan `top`/`left` atau `right` inline.'],
    ['.menu__item[role=menuitem]', 'Wajib. Baris 36 px: `.ic` opsional, label, pintasan `kbd` opsional.'],
    ['.menu__item--danger', 'Perintah destruktif, paling akhir, setelah pemisah.'],
    ['.menu__item.is-selected + .menu__check', 'Pilihan saat ini dalam grup `menuitemradio` (`aria-checked="true"`), dengan ikon `check` di ujungnya.'],
    ['.menu__label', 'Keterangan di atas sekelompok item.'],
    ['.menu__sep', 'Garis tipis di antara grup.'],
  ],
  examples: [
    {
      title: 'Menu "lainnya"',
      desc: 'Aksi yang jarang di balik icon button `more_horiz` di ujung baris; menu rata dengan tepi kanan dan tumbuh dari sudut itu.',
      html: `<div class="list" style="width: 100%; max-width: 420px; overflow: visible;">
  <div class="lrow">
    <span class="lrow__body"><span class="lrow__title" style="display: block;">Laporan jalan berlubang</span><span class="lrow__sub" style="display: block;">Dinas pekerjaan umum · tenggat besok</span></span>
    <div style="position: relative;">
      <button class="icon-btn" aria-label="Aksi lainnya untuk Laporan jalan berlubang" aria-haspopup="menu" aria-expanded="false" data-lds-menu="dm-more"><span class="ic" aria-hidden="true">more_horiz</span></button>
      <div class="menu menu--right" id="dm-more" role="menu" aria-label="Laporan jalan berlubang" style="top: calc(100% + 6px); right: 0;">
        <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">edit</span>Edit laporan</button>
        <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">content_copy</span>Duplikat<kbd>⌘D</kbd></button>
        <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">download</span>Ekspor lampiran</button>
        <div class="menu__sep"></div>
        <button class="menu__item menu__item--danger" role="menuitem"><span class="ic" aria-hidden="true">delete</span>Hapus laporan</button>
      </div>
    </div>
  </div>
</div>`,
    },
    {
      title: 'Urutkan daftar',
      desc: 'Tombol berlabel membuka item radio; yang aktif dicentang. Tombol panah berpindah, Enter memilih, Escape menutup dan mengembalikan fokus.',
      html: `<div style="position: relative; align-self: flex-start;">
  <button class="btn btn--gray btn--md" data-lds-menu="dm-sort" aria-haspopup="menu" aria-expanded="false"><span class="ic" aria-hidden="true">sort</span>Urutkan menurut tenggat<span class="ic" aria-hidden="true">expand_more</span></button>
  <div class="menu" id="dm-sort" role="menu" aria-label="Urutkan menurut" style="top: calc(100% + 6px); left: 0;">
    <p class="menu__label">Urutkan menurut</p>
    <button class="menu__item is-selected" role="menuitemradio" aria-checked="true">Tenggat<span class="ic menu__check" aria-hidden="true">check</span></button>
    <button class="menu__item" role="menuitemradio" aria-checked="false">Layanan</button>
    <button class="menu__item" role="menuitemradio" aria-checked="false">Terbaru ditambahkan</button>
    <div class="menu__sep"></div>
    <button class="menu__item menu__item--danger" role="menuitem"><span class="ic" aria-hidden="true">delete</span>Hapus yang selesai</button>
  </div>
</div>`,
    },
  ],
  variants: [
    ['.menu--right', 'Tumbuh dari kanan atas; untuk pemicu di tepi kanan (dengan `right: 0`).'],
    ['.menu--up', 'Tumbuh dari kiri bawah; letakkan dengan `bottom: calc(100% + 6px)` jika tidak ada ruang di bawah.'],
  ],
  states: [
    ['.is-open', 'Terlihat, fokus di item pertama. Pemicu memiliki `aria-expanded="true"`.'],
    ['hover / .is-hover', 'Tint kuat pada baris; seketika (60 ms).'],
    ['focus-visible', 'Tint aksen dan teks aksen pada item yang difokus.'],
    ['.is-selected', 'Ketebalan 500 dan `.menu__check`.'],
  ],
  motion: [
    'Masuk: opacity selama `--d-fast` (160 ms) dengan `--ease-enter`; transform dari `scale(0.96) translateY(-4px)` dengan `--spring-smooth`, tumbuh dari sudut terdekat dengan pemicu (`transform-origin`).',
    'Keluar: opacity dan transform selama `--d-exit` (180 ms) dengan `--ease-exit`, lalu disembunyikan. Membuka menu lain langsung menutup menu ini.',
    'Hover item berupa perubahan latar 60 ms linear, sehingga bergerak turun di daftar tidak pernah tertinggal.',
    'Reduced motion: hanya memudar, tanpa skala.',
  ],
  a11y: [
    'Pemicu: `aria-haspopup="menu"` dan `aria-expanded`; pemicu yang hanya berupa ikon butuh `aria-label` yang menyebut objeknya ("Aksi lainnya untuk Laporan jalan berlubang").',
    '`role="menu"` dengan anak `menuitem`, `menuitemradio`, atau `menuitemcheckbox` (dengan `aria-checked`).',
    'Panah bawah pada pemicu membuka menu; fokus menuju item pertama; Atas dan Bawah berpindah (berputar); Escape menutup dan mengembalikan fokus ke pemicu; klik di luar menutupnya.',
    'Memilih item menutup menu. Pintasan yang ditampilkan di `kbd` harus berfungsi.',
  ],
  do: [
    'Urutkan menurut seberapa sering dipakai; taruh item destruktif paling akhir, setelah pemisah, dengan `menu__item--danger`.',
    'Awali setiap item dengan kata kerja ("Ekspor lampiran").',
    'Pakai icon button "lainnya" hanya untuk aksi yang jarang; aksi yang sering tetap terlihat.',
  ],
  dont: [
    'Menyarangkan submenu.',
    'Memakai menu sebagai field formulir; itu tugas [select](select).',
    'Menaruh lebih dari sekitar tujuh item dalam satu menu tanpa grup.',
  ],
  js: '`data-lds-menu="menuId"` pada pemicu mengubah `.is-open` pada `#menuId` dan `aria-expanded` pada pemicu, memfokuskan item pertama, menangani panah bawah pada pemicu, Atas/Bawah/Escape di dalam, dan menutup saat memilih atau klik di luar. Di dalam `.split`, split juga mendapat `.is-open`. `closeMenus()` menutup menu yang terbuka dari kode.',
};
