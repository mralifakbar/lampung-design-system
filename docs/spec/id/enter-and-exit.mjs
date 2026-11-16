const FILE = (name, meta) => `<div class="file-row"><span class="file-row__icon"><span class="ic" aria-hidden="true">description</span></span><span class="file-row__body"><span class="file-row__name">${name}</span><span class="file-row__meta">${meta}</span></span><button class="icon-btn" aria-label="Hapus ${name}"><span class="ic" aria-hidden="true">close</span></button></div>`;

export default {
  summary: 'Cara sesuatu muncul dan menghilang: overlay naik beberapa piksel dan membesar dari 0,96 dengan smooth spring sambil cepat memudar masuk; overlay pergi dalam 180 ms dengan kurva keluar, lebih tenang daripada saat datang, lewat jalur yang sama. Butir yang bergabung ke daftar memudar masuk dari blur tipis.',
  when: [
    'Overlay terbuka atau tertutup: [dropdown menu](dropdown-menu), [popover](popover), [dialog](dialog), [modal](modal), [sheet](sheet), [drawer](drawer), [command palette](command-palette), [toast](toast).',
    'Satu butir baru bergabung ke sesuatu yang sudah tampil: baris berkas setelah unggahan dimulai, tag setelah Enter, pesan obrolan baru.',
    'Sebuah butir pergi untuk selamanya: toast habis waktunya, alert yang ditutup, baris yang dihapus.',
  ],
  whenNot: [
    ['Konten yang terbuka di dalam alur dan mendorong isi di bawahnya', 'height-expand'],
    ['Banyak butir tiba bersamaan (hasil pencarian, feed)', 'list-stagger'],
    ['Satu tampilan menggantikan tampilan lain di tempat yang sama', 'view-swap'],
    ['Gambar yang membesar dari thumbnail-nya', 'shared-element'],
    ['Konten yang muncul saat halaman di-scroll', 'reveal-on-scroll'],
    ['Kata atau label yang berubah di tempat', 'text-morph'],
  ],
  where: 'Pada layer itu sendiri. Layer mengambang tumbuh dari sisi yang paling dekat dengan pemicunya (`transform-origin`); panel bergeser dari tepi tempatnya berada; dialog di tengah naik dari sedikit di bawah tengah.',
  examples: [
    {
      title: 'Menu tumbuh dari pemicunya',
      desc: 'Menu kiri tumbuh dari sudut kiri atasnya; menu kanan, yang dibuka dari tepi kanan, tumbuh dari sudut kanan atasnya (`menu--right`). Keduanya mengecil kembali ke asalnya dalam 180 ms.',
      html: `<div class="docs-row" style="justify-content: space-between; width: 100%;">
  <div style="position: relative;">
    <button class="btn btn--gray btn--md" data-lds-menu="ee-sort" aria-haspopup="menu" aria-expanded="false">Urutkan<span class="ic" aria-hidden="true">expand_more</span></button>
    <div class="menu" id="ee-sort" role="menu" style="top: calc(100% + 6px); left: 0;">
      <button class="menu__item" role="menuitem">Tanggal lapor</button>
      <button class="menu__item" role="menuitem">Kecamatan</button>
      <button class="menu__item" role="menuitem">Baru ditambahkan</button>
    </div>
  </div>
  <div style="position: relative;">
    <button class="icon-btn" data-lds-menu="ee-more" aria-haspopup="menu" aria-expanded="false" aria-label="Aksi lainnya"><span class="ic" aria-hidden="true">more_horiz</span></button>
    <div class="menu menu--right" id="ee-more" role="menu" style="top: calc(100% + 6px); right: 0;">
      <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">edit</span>Ganti nama</button>
      <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">content_copy</span>Gandakan</button>
      <div class="menu__sep"></div>
      <button class="menu__item menu__item--danger" role="menuitem"><span class="ic" aria-hidden="true">delete</span>Hapus</button>
    </div>
  </div>
</div>`,
    },
    {
      title: 'Dialog dan drawer',
      desc: 'Dialog cepat memudar masuk (160 ms) sambil menetap dari posisi sedikit kecil dan rendah dengan smooth spring; scrim butuh 240 ms. Saat ditutup, gerakannya berbalik dalam 180 ms dengan kurva keluar. Drawer bergeser masuk dari kanan dan pergi ke kanan.',
      html: `<div class="viewport docs-box">
  <div class="viewport__content">
    <p class="card__title">Layanan izin usaha mikro</p>
    <div class="docs-row">
      <button class="btn btn--secondary btn--md" data-lds-open="ee-dialog" aria-haspopup="dialog">Ganti nama layanan</button>
      <button class="btn btn--secondary btn--md" data-lds-open="ee-drawer" aria-haspopup="dialog"><span class="ic" aria-hidden="true">tune</span>Filter</button>
    </div>
  </div>
  <div class="scrim" data-lds-scrim="ee-dialog"></div>
  <div class="dialog" id="ee-dialog" role="dialog" aria-modal="true" aria-labelledby="ee-dialog-t" data-lds-layer>
    <h3 class="dialog__title" id="ee-dialog-t">Ganti nama layanan</h3>
    <p class="dialog__body">Warga melihat nama baru saat mereka membuka aplikasi berikutnya.</p>
    <div class="control" style="margin-top: 16px;"><input aria-label="Nama layanan" value="Layanan izin usaha mikro" data-lds-autofocus></div>
    <div class="dialog__actions"><button class="btn btn--secondary btn--md" data-lds-close>Batal</button><button class="btn btn--primary btn--md" data-lds-close>Simpan nama</button></div>
  </div>
  <div class="scrim" data-lds-scrim="ee-drawer"></div>
  <aside class="drawer" id="ee-drawer" role="dialog" aria-modal="true" aria-labelledby="ee-drawer-t" data-lds-layer>
    <div class="sheet__head" style="margin: 0;"><h3 class="sheet__title" id="ee-drawer-t">Filter</h3><button class="icon-btn" aria-label="Tutup filter" data-lds-close style="margin: -10px -10px -10px 0;"><span class="ic" aria-hidden="true">close</span></button></div>
    <button class="btn btn--primary btn--block" style="margin-top: auto;" data-lds-close>Tampilkan 8 layanan</button>
  </aside>
</div>`,
    },
    {
      title: 'Toast datang dan pergi',
      desc: 'Toast naik 24 px dari bawah dengan smooth spring; setelah empat detik ia memudar keluar dalam 180 ms. Kirim beberapa: yang lebih lama terselip di belakang dan mengecil 5% masing-masing.',
      html: `<div class="viewport docs-box" style="height: 300px;">
  <div class="viewport__content">
    <p class="card__title">Laporan warga</p>
    <button class="btn btn--secondary btn--md" onclick="import('../../js/lds.js').then((m) => m.toast({ title: 'Draf tersimpan', icon: 'check_circle', container: this.closest('.viewport') }))">Simpan draf</button>
  </div>
  <div class="toaster" role="status" aria-live="polite"></div>
</div>`,
      code: `import { toast } from 'lampung-design-system/js';
toast({ title: 'Draf tersimpan', icon: 'check_circle' });`,
    },
    {
      title: 'Satu butir bergabung ke daftar',
      desc: 'Baris berkas baru memudar masuk dari blur 4 px dan naik 4 px (240 ms, kurva masuk). Baris yang sudah ada tidak bergerak kecuali untuk memberi ruang.',
      html: `<div class="docs-col" style="max-width: 420px;">
  <div>${FILE('foto-jalan-rusak.jpg', '1,2 MB')}</div>
  <button class="btn btn--secondary btn--sm" style="align-self: flex-start;" onclick="const list = this.previousElementSibling; const row = list.firstElementChild.cloneNode(true); row.querySelector('.file-row__name').textContent = 'lampiran-' + (list.children.length + 1) + '.pdf'; row.querySelector('.file-row__meta').textContent = '340 KB'; list.append(row);"><span class="ic" aria-hidden="true">add</span>Tambah berkas</button>
</div>`,
    },
    {
      title: 'Modal halaman',
      desc: '`dialog.modal` bawaan naik dari 8 px di bawah dan skala 0,96 dengan smooth spring, backdrop-nya memudar selama 240 ms; modal pergi ke skala 0,97 dalam 180 ms. Di bawah 600 px modal menjadi bottom sheet yang naik dan turun.',
      html: `<button class="btn btn--secondary" data-lds-modal="ee-modal">Laporkan kesalahan</button>
<dialog class="modal" id="ee-modal" aria-labelledby="ee-modal-t">
  <button class="icon-btn dialog__close" data-lds-modal-close aria-label="Tutup"><span class="ic" aria-hidden="true">close</span></button>
  <h2 class="dialog__title" id="ee-modal-t">Laporkan kesalahan</h2>
  <p class="dialog__body">Sebutkan data yang salah pada tagihan pajak daerah Anda dan isi yang seharusnya.</p>
  <div class="dialog__actions"><button class="btn btn--secondary" data-lds-modal-close>Batal</button><button class="btn btn--primary" data-lds-modal-close>Kirim laporan</button></div>
</dialog>`,
    },
  ],
  variants: [
    ['Menu, popover', 'Masuk: opacity `--d-fast` dengan `--ease-enter`, transform dari `scale(0.96) translateY(-4px)` dengan `--spring-smooth` (560 ms), dari `transform-origin`. Keluar: keduanya selama `--d-exit` dengan `--ease-exit`, lalu `visibility: hidden` setelah 180 ms.'],
    ['Dialog, command palette', 'Masuk: opacity `--d-fast`, transform dari `translateY(4px) scale(0.98)` (palette `scale(0.97)`) dengan `--spring-smooth`. Keluar: kembali ke keadaan itu selama `--d-exit` dengan `--ease-exit`.'],
    ['Page modal (.modal, .overlay)', 'Masuk: `lds-modal-in` dari `translateY(8px) scale(0.96)` dengan `--spring-smooth`; backdrop `lds-fade-in` 240 ms. Keluar: tambahkan `.is-closing`, `lds-modal-out` ke `scale(0.97)` dalam 180 ms; `closeModal()` menunggu, lalu menutup. Ponsel: `lds-sheet-up` / `lds-sheet-down` (260 ms).'],
    ['Sheet', 'Masuk: dari `translateY(105%)` dengan `--spring-smooth`. Keluar: 260 ms dengan `--ease-exit` (menempuh seluruh tingginya). Dilempar: `--spring-momentum` (600 ms).'],
    ['Drawer', 'Masuk: dari luar layar sebelah kanan dengan `--spring-smooth`. Keluar: 240 ms dengan `--ease-exit`.'],
    ['Scrim', 'Masuk: 240 ms `--ease-enter`. Keluar: 180 ms `--ease-exit`.'],
    ['Toast', 'Masuk: `lds-toast-in` dari `translateY(24px) scale(0.96)` dengan `--spring-smooth`. Keluar: `.is-leaving`, 180 ms dengan `--ease-exit`, dihapus setelah 200 ms.'],
    ['Item joining (file row, tab panel)', '`lds-blur-in`: dari 4 px di bawah, blur 4 px, transparan; `--d-standard` dengan `--ease-enter`. Tag dan digit OTP memakai `lds-pop-in` (dari 0,6) dengan `--spring-snappy`.'],
    ['Tooltip, hover card', 'Tunggu 500 ms (hover card 600 ms) sebelum masuk dengan `--spring-snappy` / `--spring-smooth`; pergi dalam 100 sampai 120 ms. Tanpa jeda saat keluar.'],
  ],
  motion: [
    'Saat masuk, opacity selalu lebih cepat daripada transform (160 ms lawan 560 ms): layer hampir langsung terbaca dan terus menetap sementara orang sudah membacanya.',
    'Keluar lebih singkat daripada masuk (180 ms lawan 560 ms) dan makin cepat (`--ease-exit`). Tidak ada yang memantul saat keluar.',
    'Overlay memakai transisi pada `.is-open`, jadi menutup di tengah gerakan masuk akan berbalik dari posisi saat itu; `visibility` berganti setelah gerakan keluar sehingga layer yang setengah tertutup tidak pernah menangkap klik.',
    'Jalur kembali yang sama: menu mengecil ke sudut asalnya, sheet turun, drawer bergeser ke sisinya, toast turun 12 px.',
    'Reduced motion: dialog, menu, popover, dan palette berhenti berubah skala (hanya opacity); modal halaman melewati animasinya dan langsung tertutup; semua transisi yang tersisa berjalan 120 ms linear.',
  ],
  a11y: [
    'Fokus masuk ke overlay saat terbuka dan kembali ke pemicunya saat tertutup (`openLayer` / `closeLayer`, `openModal` / `closeModal` melakukannya).',
    'Overlay yang tertutup memakai `visibility: hidden` dan `inert`, sehingga keluar dari urutan tab bahkan selama gerakan keluar.',
    'Toast diumumkan oleh kontainer `role="status"`-nya; butir yang bergabung ke daftar diumumkan oleh pemilik daftar jika penting (live region atau toast), bukan oleh gerakannya.',
  ],
  do: [
    'Buka overlay dengan hook sistem (`data-lds-open`, `data-lds-menu`, `data-lds-modal`) agar gerakan masuk, keluar, dan fokus datang bersamaan.',
    'Tutup modal halaman dengan `closeModal(el)` agar gerakan keluar diputar sebelum dialog tertutup.',
    'Pilih `menu--right` atau `menu--up` agar menu tumbuh dari sisi pemicunya.',
  ],
  dont: [
    'Menghapus elemen pada frame yang sama dengan dimulainya gerakan keluar; tunggu `--d-exit`.',
    'Menggeser overlay masuk dari sisi yang bukan tempatnya.',
    'Memudarkan masuk setiap elemen baru di halaman; sebagian besar konten cukup langsung ada.',
  ],
  js: '`openLayer(id)` / `closeLayer(id)` untuk overlay `[data-lds-layer]`; `openModal(el)` / `closeModal(el, done)` untuk `dialog.modal` dan `.overlay` (menambahkan `.is-closing`, menunggu `--d-exit`, lalu menutup); `toast({ … })`; menu lewat `data-lds-menu`. Semuanya menghormati reduced motion.',
};
