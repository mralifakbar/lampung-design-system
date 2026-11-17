# Komponen

https://lampung.kartadinata.app/docs/components/

179 komponen dan resep. Setiap halaman menjelaskan kapan memakainya, kapan memakai yang lain, markup, gerak, dan aksesibilitasnya. Mulailah dari sini sebelum membuat sesuatu yang baru: jika kebutuhan sudah tercakup, pakai komponen itu; jika belum, tambahkan komponen ke sistem alih-alih menata satu halaman saja. Untuk melihat semuanya bekerja bersama, buka [contoh](../examples/index.md): dasbor layanan kota, aplikasi warga, dan portal publik.

## Landasan

Aturan yang diikuti setiap komponen: tata letak, gerak, status

- [Layout primitives](layout-primitives.md): Tujuh kelas kecil yang menata semua hal di antara komponen: `stack`, `cluster`, `auto-grid`, `split-2`, `center`, `measure`, dan `sr-only`. Pakai ini sebelum menulis `display: flex` atau `grid` sendiri.
- [Form layout](form-layout.md): Kerangka yang dipakai setiap formulir: `form` menumpuk kolom berjarak 20 px, `form__row` menaruh kolom pendek berdampingan saat ada ruang, dan `form__actions` menutup formulir dengan tombolnya. Kolom di dalamnya selalu `.field`.
- [Data states](data-states.md): Setiap tampilan yang menampilkan data dirancang dalam empat status: memuat, kosong, galat, dan termuat. Setiap status memakai ulang komponen yang sudah ada (`skel`, `empty`, `alert`) dan menjaga ukuran yang sama, sehingga halaman tidak melompat di antaranya.
- [Theming](theming.md): Terang dan gelap berasal dari satu atribut: `data-theme="light|dark|system"` pada `<html>` atau subtree mana pun. Komponen hanya membaca token, jadi mereka berganti sendiri; Anda tidak pernah menulis CSS dark mode untuk sebuah komponen.
- [Icon](icon.md): Ikon adalah teks: `<span class="ic" aria-hidden="true">search</span>`, digambar oleh font ligatur dari set Solar. Hanya nama di `icons/icons.json` yang ada; nama lain tidak menampilkan apa pun, tanpa pesan.

## Aksi

Hal yang ditekan untuk menjalankan sesuatu

- [Button](button.md): Kontrol yang ditekan untuk menjalankan sesuatu: simpan, kirim, mulai, hapus. Satu tombol utama per tampilan; labelnya menyebut hasilnya.
- [Icon button](icon-button.md): Tombol yang hanya menampilkan ikon: target 44 px, glyph 22 px, bulat. Selalu punya `aria-label` dan tooltip dengan kata yang sama.
- [Floating action](floating-action.md): Satu tombol bulat beraksen yang melayang di atas konten layar ponsel, untuk aksi yang menjadi alasan orang membuka layar itu (pesan baru, tambah pengeluaran). Hanya kontrol inilah yang memakai bayangan saat diam.
- [Button group](button-group.md): Dua sampai empat tombol yang menyatu dalam satu kotak bergaris, untuk aksi terpisah pada objek yang sama (urungkan, ulangi, riwayat). Setiap tombol menjalankan sesuatu; tidak ada yang tetap terpilih.
- [Split button](split-button.md): Tombol utama yang menyatu dengan chevron pembuka menu berisi varian dari aksi yang sama (Terbitkan, atau jadwalkan, atau terbitkan hanya untuk anggota). Bagian kiri menjalankan hal yang umum dalam satu tekan.
- [Toggle](toggle.md): Tombol yang tetap tertekan untuk menunjukkan sebuah mode menyala (tebal, sematkan, bisukan). Sendirian ia adalah `.toggle`; beberapa berada di `.toggle-group`, bisa saling lepas (tebal, miring, garis bawah) atau satu per satu (rata kiri, tengah, kanan).
- [Link](link.md): Teks yang membawa Anda ke tempat lain: `<a href>` dengan `.link`, tebal medium dalam warna teks aksen, garis bawah muncul perlahan saat hover. `.link--external` menambahkan panah untuk situs lain.
- [Copy button](copy-button.md): Tombol yang menyalin nilai ke clipboard dan mengonfirmasi di tempat: ikon salin memudar menjadi centang dan labelnya berbunyi "Disalin" selama 1,6 detik. Satu atribut, `data-lds-copy`, menyimpan teksnya.
- [Hold to confirm](hold-to-confirm.md): Tombol yang ditekan dan ditahan selama 1,2 detik untuk mengonfirmasi sesuatu yang mahal tetapi tidak cukup berbahaya untuk dialog. Isian menyapu tombol selama ditahan dan surut jika dilepas lebih awal.
- [Slide to confirm](slide-to-confirm.md): Lintasan dengan kenop yang digeser sampai ujung untuk mengonfirmasi langkah mahal di layar sentuh (kirim daftar penerima bantuan, kirim pembayaran). Kenop mengikuti jari 1:1, menahan saat melewati ujung, dan terkonfirmasi setelah melewati 85 % lintasan.
- [Keyboard key](kbd.md): Tutup tombol kecil yang menampilkan pintasan keyboard: `.kbd` untuk satu tombol, `.kbd-row` untuk kombinasi. Pintasan adalah petunjuk di samping aksi, tidak pernah satu-satunya cara mencapainya.

## Input

Kolom untuk mengetik atau memilih

- [Text field](text-field.md): Satu baris teks bebas dengan label di atasnya dan baris bantuan di bawahnya. Baris bantuan berubah menjadi pesan galat, sehingga tata letak tidak pernah melompat.
- [Amount field](amount-field.md): Text field untuk uang dan angka lain yang bersatuan: mata uang atau satuannya berada di dalam kontrol sebagai teks, keyboard-nya numerik. Ketik angkanya, jangan pernah simbolnya.
- [Textarea](textarea.md): Kolom untuk beberapa kalimat: kotak `.control` yang sama, lebih tinggi, dengan penghitung karakter opsional. Sebutkan batasnya sebelum orang mencapainya.
- [Search field](search-field.md): Kolom berisi tanpa label untuk menemukan sesuatu: layanan, warga, laporan. Di ponsel, memfokuskannya menggeser masuk tombol Batal yang menghapus teks dan keluar dari pencarian.
- [Password field](password-field.md): Text field untuk rahasia, dengan tombol tampilkan yang menukar ikon matanya di tempat. Saat membuat kata sandi, pengukur kekuatan empat langkah dan teks bantuan menyebut apa yang akan membuatnya lebih kuat.
- [Number stepper](number-stepper.md): Tombol minus dan plus di sekitar bilangan bulat kecil yang digitnya bergulir ke nilai baru. Untuk jumlah yang diubah orang satu atau dua, di dalam rentang yang diketahui.
- [One-time code](otp.md): Enam sel untuk kode verifikasi, didukung satu input sungguhan, sehingga tempel, isi otomatis SMS, dan pengelola kata sandi semuanya berfungsi. Kode yang salah membuat sel bergetar sekali dan berubah merah.
- [Select](select.md): Tombol berbentuk kolom yang membuka daftar opsi di bawahnya dan menampilkan yang dipilih. Untuk satu pilihan dari daftar tetap yang terlalu panjang untuk ditampilkan sebagai radio; jika orang perlu mengetik untuk menemukannya, pakai combobox.
- [Combobox](combobox.md): Text field yang menyaring daftar opsi saat Anda mengetik dan menyimpan satu yang dipilih. Untuk daftar panjang dan opsi dari server; ia memberi tahu saat tidak ada yang cocok.
- [Tag input](tag-input.md): Kolom yang mengubah teks ketikan menjadi tag yang bisa dihapus: Enter atau koma menambah satu, Backspace di kolom kosong menghapus yang terakhir. Untuk beberapa nilai bebas yang pendek.
- [File input](file-input.md): Zona lepas dengan tombol Pilih sungguhan, dan satu baris per berkas terpilih yang menampilkan ukuran, progres unggah, galat, dan cara menghapusnya. Tombol adalah jalur utama; menjatuhkan berkas hanya jalan pintas.
- [Date field](date-field.md): Text field untuk tanggal dengan tombol kalender yang membuka kalender di popover. Mengetik tanggal selalu bisa; kalender hanya membantu. Dibangun dari bagian yang sudah ada: `.control`, `.control__btn`, `.popover`, dan `.cal`.
- [Date range](date-range.md): Tombol yang menampilkan rentang saat ini dan membuka pilihan siap di samping kalender dua bulan (satu bulan di ponsel). Pilihan siap langsung berlaku; memilih tanggal awal menampilkan pratinjau rentang saat Anda bergerak, memilih tanggal akhir menunggu Terapkan.

## Pilihan

Memilih di antara opsi dan menyalakan pengaturan

- [Checkbox](checkbox.md): Checkbox bawaan dengan centang yang digambar, untuk pilihan ya atau tidak yang saling lepas dan disimpan bersama formulir. Beberapa bisa menyala sekaligus; setiap label menyebut arti menyalakannya.
- [Radio](radio.md): Radio button bawaan untuk tepat satu pilihan dari dua sampai lima opsi yang semuanya harus terlihat. Titiknya memantul masuk; tombol panah berpindah antaropsi.
- [Radio card](radio-card.md): Kartu yang bisa dipilih untuk satu pilihan di antara dua sampai empat opsi yang masing-masing butuh judul, satu baris keterangan, dan sering kali harga. Seluruh kartu adalah targetnya; yang dipilih mendapat tepi dan warna aksen.
- [Switch](switch.md): Kontrol nyala dan mati untuk pengaturan yang berlaku saat itu juga ketika diubah, tanpa tombol Simpan. Thumb meregang selama ditahan dan berpindah dengan spring.
- [Segmented control](segmented-control.md): Dua sampai lima segmen sama lebar dengan satu thumb yang bergeser ke segmen terpilih. Untuk mengganti tampilan atau mode dari yang ada di layar saat itu; perubahannya langsung berlaku.
- [Slider](slider.md): Input range bawaan dengan tampilan sistem: lintasan 4 px yang terisi warna aksen sampai thumb 28 px. Untuk nilai pada skala bersambung ketika posisi lebih penting daripada angka pastinya.
- [Range slider](range-slider.md): Dua thumb pada satu lintasan untuk nilai minimum dan maksimum, dengan isian aksen di antaranya. Kedua thumb tidak pernah bisa bersilangan; masing-masing adalah input range bawaan.
- [Chips](chips.md): Tombol toggle berbentuk pil dalam baris yang bisa turun baris, untuk filter dan pilihan cepat yang langsung berlaku saat diketuk. Chip yang tertekan menjadi warna aksen dan tanda centang bergeser masuk.
- [Rating](rating.md): Lima bintang untuk menilai sesuatu dari satu sampai lima. Hover menampilkan pratinjau skor, klik menetapkannya; dari keyboard ia berfungsi sebagai radio group.

## Navigasi

Berpindah antarhalaman, bagian, dan langkah

- [Masthead](masthead.md): Strip tipis di atas semua elemen pada situs layanan publik yang memberi tahu orang apakah situs itu resmi, dan cara memastikannya. Situs yang dibangun dengan sistem ini dan tidak dikelola pemerintah memakai varian tidak resmi.
- [App shell](app-shell.md): Kerangka sebuah aplikasi: sidebar sticky di samping konten pada layar lebar, top bar dengan drawer di bawah 960 px. Satu per aplikasi, di root; satu sorotan meluncur ke halaman aktif.
- [Top nav](top-nav.md): Bilah tembus pandang di bagian atas situs tanpa sidebar: merek, hingga lima tautan, dan aksi. Di bawah 760 px tautan terlipat ke panel di bawah bilah.
- [Tabs](tabs.md): Tab bergaris bawah yang berpindah di antara bagian sejajar dalam satu halaman, masing-masing dengan panelnya sendiri. Satu garis tinta meluncur ke tab yang dipilih.
- [Breadcrumbs](breadcrumbs.md): Jalur dari sebuah bagian sampai ke halaman yang sedang dibuka, berupa tautan dengan chevron di antaranya. Item terakhir adalah halaman saat ini dan bukan tautan.
- [Page header](page-header.md): Bagian atas halaman: breadcrumbs, judul dengan satu baris konteks, dan aksi halaman pada garis dasar yang sama. Gabungan dari bagian yang sudah ada, bukan komponen tersendiri.
- [Pagination](pagination.md): Tombol nomor halaman di bawah daftar atau tabel yang panjang. Tampilkan halaman pertama, halaman terakhir, dan tetangga halaman saat ini; celah di antaranya menjadi elipsis.
- [Steps](steps.md): Langkah bernomor dari urutan tetap dengan bilah yang terisi saat setiap langkah selesai. Menunjukkan posisi orang dalam sebuah alur dan berapa yang tersisa.
- [Sidebar](sidebar.md): Panel berbingkai berisi tautan dengan satu sorotan yang bergeser, diletakkan di dalam konten: bagian-bagian halaman pengaturan, folder kotak masuk. Bukan kerangka aplikasi.
- [Outline](outline.md): Daftar "Di halaman ini" berisi heading dari satu halaman panjang, dengan garis tinta yang mengikuti bagian yang sedang terlihat. Daftar di sebelah kanan halaman ini adalah salah satunya.
- [Menubar](menubar.md): Barisan menu perintah (Berkas, Edit, Tampilan) untuk editor bergaya desktop. Setiap tombol membuka dropdown menu berisi perintah beserta pintasannya.
- [Nav progress](nav-progress.md): Bilah aksen setinggi 3 px di tepi atas jendela yang berjalan selama halaman berikutnya dimuat. Tambahkan `.is-running` saat navigasi dimulai, hapus saat halaman sudah tampil.
- [Phone bars](phone-bars.md): Bingkai layar ponsel: nav bar di atas yang judul besarnya menyatu ke dalamnya saat digulir, dan tab bar berisi tiga sampai lima tujuan di bawah. Keduanya tembus pandang sehingga konten terlihat bergulir di bawahnya.
- [Navigation stack](nav-stack.md): Dorong layar detail masuk dari kanan di atas layar asal, lalu kembali dengan tombol kembali atau dengan menyeret layar dari tepi kiri. Layar di bawahnya bergeser 30 % dan meredup, sehingga orang selalu tahu ke mana tombol kembali mengarah.

## Lapisan

Lapisan yang melayang di atas halaman

- [Dialog](dialog.md): Lapisan kecil di tengah yang menyela untuk meminta satu isian singkat atau satu keputusan, lalu menyingkir. Pakai seperlunya: sebagian besar tugas tempatnya di halaman, sheet, atau drawer.
- [Alert dialog](alert-dialog.md): Dialog yang meminta konfirmasi untuk aksi yang destruktif atau tidak bisa dibatalkan. Judulnya menyebut objek dan akibatnya; tombol aman mendapat fokus; tombol destruktif adalah satu-satunya tempat `btn--danger`.
- [Modal](modal.md): Dialog tingkat halaman di atas seluruh jendela: `<dialog class="modal">` native di top layer, atau `.overlay` yang dirender di tempat oleh framework. Di bawah 600 px modal native menjadi bottom sheet. Tutup dengan `closeModal()` agar animasi keluarnya diputar.
- [Sheet](sheet.md): Panel yang naik dari bawah untuk tugas yang tetap menjaga konteks: halaman di belakang mundur tetapi tetap terlihat. Seret grabber untuk menutup dengan momentum. Jawaban versi ponsel untuk sebagian besar dialog.
- [Drawer](drawer.md): Panel yang bergeser masuk dari tepi kanan di layar lebar untuk filter, detail, atau tugas sekunder, sementara daftar asalnya tetap terlihat. Ia keluar ke sisi asalnya.
- [Dropdown menu](dropdown-menu.md): Daftar perintah yang turun dari tombol: opsi urutan, aksi baris, menu "lainnya" di balik icon button. Item menjalankan sesuatu; bukan field formulir.
- [Context menu](context-menu.md): Menu perintah yang terbuka di posisi pointer saat klik kanan, tekan lama di layar sentuh, atau Shift+F10. Pintasan untuk perintah yang juga bisa dicapai dengan cara lain.
- [Popover](popover.md): Kartu mengambang kecil yang tertambat pada tombol, untuk konten yang lebih kaya dari menu: formulir mini, penjelasan singkat dengan tautan, pengaturan cepat. Tidak menghalangi halaman.
- [Tooltip](tooltip.md): Label gelap singkat di atas kontrol saat hover atau fokus, setelah jeda 500 ms. Menamai icon button dan pintasan; dengan `.infotip` dan `.tip--wide` menjelaskan istilah dalam satu atau dua kalimat. Hanya CSS.
- [Hover card](hover-card.md): Kartu pratinjau di bawah tautan setelah hover 600 ms atau saat fokus: siapa seseorang, apa isi sebuah layanan. Kartu ini menghemat satu klik; jangan pernah menjadi satu-satunya tempat sebuah informasi.
- [Toast](toast.md): Pesan gelap singkat di bagian bawah yang memastikan sesuatu baru saja terjadi, lalu hilang sendiri. Jika aksinya bisa dibatalkan, tombol Urungkan ada di toast dengan hitung mundur yang jujur.
- [Command palette](command-palette.md): Kotak pencarian di atas halaman untuk menemukan dan menjalankan perintah atau tujuan apa pun dengan mengetik. Jalan pintas bagi orang yang tahu apa yang dicari; tidak pernah satu-satunya jalan.
- [Lightbox](lightbox.md): Menampilkan satu gambar berukuran besar di atas halaman yang diredupkan: gambar tumbuh dari thumbnail-nya dan menyusut kembali ke sana. Berupa tautan di sekitar thumbnail, sehingga tanpa skrip pun tetap membuka gambar penuh.
- [Selection bar](selection-bar.md): Bilah gelap yang mengambang naik dari bawah selama item dalam daftar dipilih, berisi jumlahnya dan aksi untuk semuanya. Bilah pergi saat pilihan kosong.

## Umpan balik

Status, progres, pesan, dan keadaan kosong

- [Alert](alert.md): Pesan inline tentang halaman, bagian atau formulir ini, dalam salah satu dari empat nada. Kata-katanya yang membawa makna; warna dan ikon hanya mendukung.
- [Banner](banner.md): Satu baris berwarna terbalik tentang seluruh aplikasi: offline, pemeliharaan, melihat sebagai orang lain. Menyebut kondisinya dan menawarkan paling banyak satu aksi.
- [Progress bar](progress-bar.md): Track 6 px yang terisi seiring tugas dengan ukuran yang diketahui berjalan. Tampilkan angkanya di samping; pakai bar indeterminate hanya jika benar-benar tidak bisa diukur.
- [Progress ring](progress-ring.md): Track melingkar dengan nilai digambar sebagai busur dan angka di tengah. Untuk tempat yang ringkas dan skor yang dinilai; sebutkan juga penilaiannya dengan kata-kata.
- [Meter](meter.md): Pengukur bersegmen untuk tingkat dalam rentang yang diketahui: penyimpanan terpakai, kuota terisi, kekuatan kata sandi. Menunjukkan seberapa penuh, bukan seberapa jauh kemajuannya.
- [Spinner](spinner.md): Delapan jari-jari yang memudar bergantian, menandakan "sedang bekerja" untuk tunggu singkat tanpa kemajuan yang terukur. Diletakkan di tempat hasil akan muncul dan tidak pernah memblokir seluruh halaman.
- [Skeleton](skeleton.md): Bentuk abu-abu dengan tata letak persis seperti konten yang sedang dimuat, dengan kilau lembut yang melintas di atasnya. Saat data datang, tidak ada yang bergeser.
- [Badge](badge.md): Label kecil yang tidak bisa diklik untuk status atau jenis sesuatu: Draf, Terlambat, Disetujui. Kata-kata yang mudah dipahami, paling banyak satu atau dua per item.
- [Count](count.md): Pil merah kecil berisi jumlah hal yang menunggu orang: pesan belum dibaca, permohonan tertunda. Artinya "tindak lanjuti ini", jadi pakai hanya untuk itu.
- [Status dot](status-dot.md): Titik berwarna 8 px diikuti kata-kata, untuk kondisi langsung sebuah sistem, layanan atau koneksi. Kata-kata menyebut kondisinya; titik membantu memindai.
- [Empty state](empty-state.md): Yang ditampilkan sebuah area saat belum ada isinya: ikon, alasan kosongnya, dan satu aksi yang mengisinya.
- [Coachmark](coachmark.md): Card berwarna terbalik yang menunjuk satu bagian antarmuka dengan penjelasan singkat, dalam tur paling banyak tiga langkah. Selalu bisa dilewati.
- [Thinking](thinking.md): Gelombang titik, label berkilau dan timer waktu berjalan yang jujur, untuk pekerjaan yang lamanya tidak diketahui. Saat selesai, labelnya berubah menjadi hasilnya.
- [Timer](timer.md): Pil hitung mundur dengan angka mono tabular yang berubah kuning saat waktu hampir habis dan merah di nol, lalu memicu `lds:timeup`. Untuk tenggat sungguhan yang sedang dikejar orang.

## Tampilan data

Daftar, tabel, angka, dan catatan

- [List](list.md): Daftar berkelompok yang menjorok: baris di satu permukaan, dipisah garis tipis yang dimulai di awal teks. Default untuk daftar apa pun, sebagai ganti tumpukan kartu.
- [Key-value](key-value.md): Pasangan label dan nilai yang menjelaskan satu hal: pembayaran, pendaftaran ujian, profil. Baris `.kv` di dalam `<dl>`, di dalam kartu atau di kotak `.kv-list` sendiri.
- [Stat row](stat-row.md): Sebaris angka kunci tanpa kartu: angka tabular besar dengan labelnya di bawah, dipisah garis tipis. Kolomnya mengikuti lebar kolom isi, bukan layar.
- [KPI card](kpi-card.md): Satu metrik di dasbor: apa yang diukur, nilainya, bagaimana perubahannya terhadap pembanding yang disebutkan, dan bila perlu bentuk terbarunya sebagai sparkline atau mini bar. Nilainya yang utama; perubahan selalu menyebut pembandingnya.
- [Card](card.md): Permukaan yang memuat satu pokok: acara, tagihan, layanan. Putih dengan ring tipis di atas kanvas, atau isian tenang di atas putih. Jangan pernah memakai shadow.
- [Avatar](avatar.md): Lingkaran berisi inisial nama seseorang di atas warna tint, ukurannya diatur dengan `--size`. Pakai inisial sampai ada foto asli; jangan pernah wajah buatan.
- [Table](table.md): Baris catatan yang dibandingkan dengan kolom yang sama, di dalam `.table-box` yang bergulir ke samping bila perlu. `<table>` asli secara default, `.table--wrap` untuk teks, dan grid `.dt` bila sebuah template mengulang baris.
- [Accordion](accordion.md): Tumpukan pertanyaan atau bagian yang masing-masing membuka panelnya dengan spring. Untuk isi yang dibaca sebagian saja; jangan pernah untuk menyembunyikan hal yang dibutuhkan semua orang.
- [Tree](tree.md): Baris bertingkat yang bisa dibuka dan ditutup: folder dan berkas, bab dan subbab. Setiap induk adalah tombol dengan `aria-expanded`; anak-anaknya terbuka dengan spring.
- [Calendar](calendar.md): Grid satu bulan berisi tombol hari yang bulat: hari ini dengan teks aksen, pilihan dengan isian aksen; rentang terisi di antara kedua ujungnya. Markup dan state saja; logika memilih ada di aplikasi Anda.
- [Timeline](timeline.md): Peristiwa berurutan waktu pada garis vertikal, dengan titik terisi untuk yang sudah selesai. Untuk riwayat atau rencana satu hal, yang terlama di atas.
- [Show more](show-more.md): Beberapa butir pertama sebuah daftar, lalu tombol polos yang memunculkan sisanya di tempat dengan spring buka-tutup, dan melipatnya kembali.
- [Timestamp](timestamp.md): `<time>` yang menunjukkan kapan sesuatu terjadi atau jatuh tempo dalam kata relatif ("5 menit yang lalu", "dalam 3 hari"), dalam bahasa halaman, dan memperbarui dirinya sendiri. Tanggal persisnya ada di title.
- [Date tile](date-tile.md): Blok kecil berisi bulan dan tanggal di awal baris, untuk daftar hal yang terjadi pada suatu tanggal: posyandu, Samsat keliling, tagihan jatuh tempo, acara. Orang mencari tanggal sebelum judul, jadi tanggal diletakkan paling depan.
- [Rolling number](rolling-number.md): Angka yang setiap digitnya bergeser ke nilai barunya dengan spring yang halus, seperti odometer. Untuk hitungan yang berubah saat orang sedang melihatnya.
- [Code block](code-block.md): Kode berformat tetap di atas isian tenang, dengan bilah untuk namanya dan aksi salin. Tiga warna token yang tenang, gulir mendatar, tanpa pemenggalan baris.
- [Carousel](carousel.md): Baris kartu mendatar yang berhenti tepat per kartu di bawah jari atau trackpad, dengan titik yang memanjang ke halaman aktif. Untuk menjelajah butir opsional, jangan untuk isi yang wajib dilihat semua orang.
- [Separator](separator.md): Garis tipis 1 px di antara dua blok isi yang kalau tidak akan menyatu, polos atau dengan beberapa kata di dalamnya (pemisah tanggal, "atau"). Sering kali jarak atau pemisah bawaan komponen sudah cukup.
- [Data table](data-table.md): Tabel tempat orang bekerja: pencarian, chip dan menu filter, header yang bisa diurutkan, menu kolom, kerapatan baris, pemilihan baris dengan selection bar, dan pagination dengan ukuran halaman, semuanya di atas `.table` biasa dan dipasang oleh satu hook. Setiap kontrol langsung mengubah baris dan menyebutkan apa yang dilakukannya.
- [Trend delta](trend-delta.md): Perubahan di samping sebuah angka: panah untuk arah, warna untuk artinya, jumlah dalam angka tabular, dan kalimat untuk pembaca layar. Arah dan arti dipisahkan, karena angka yang turun bisa jadi kabar baik.
- [File tile](file-tile.md): Berkas dan folder sebagai tile dalam grid: thumbnail bertint menurut jenis (atau gambarnya sendiri), nama dua baris, ukuran dan tanggal, kotak centang yang muncul saat hover, fokus, atau selama memilih, dan menu lainnya. Tile membuka berkas; mencentangnya memilih berkas untuk aksi massal.
- [Product tile](product-tile.md): Produk yang diketuk untuk ditambahkan ke penjualan atau pesanan: gambar, nama, satu baris meta, dan harga, dengan badge di sudut yang menghitung berapa yang sudah masuk ke penjualan. Seluruh tile adalah satu tombol.
- [Kanban](kanban.md): Kolom berisi kartu yang dipindah antar tahap dengan diseret atau dengan keyboard. Kartu yang diangkat terangkat dan mengikuti pointer, kartu lain memberi ruang dengan spring, lalu kartu itu mengendap di slotnya; hitungannya bergulir.
- [Event calendar](event-calendar.md): Kalender acara dengan tiga tampilan: grid bulan dengan chip acara, satu minggu berisi blok berjam dengan garis waktu sekarang, dan daftar agenda yang dikelompokkan per hari. Dirender dari JSON dan berubah menjadi titik ditambah daftar hari terpilih bila lebarnya kurang dari 640 px.
- [Lanes](lanes.md): Siapa sibuk kapan: satu baris per orang, ruangan, atau sumber daya, waktu berjalan mendatar, dan blok yang diletakkan menurut awal dan panjangnya. Pertanyaan yang dijawab adalah "siapa yang kosong, dan kapan", jadi celahnya sama penting dengan bloknya.
- [Inbox list](inbox-list.md): Baris pesan atau percakapan: siapa, kapan, subjek, dan cuplikan, dengan state belum dibaca, sedang dibuka, dan ditandai. Barisnya adalah tombol yang membuka pesan; yang terbaru ada di atas.
- [Check matrix](check-matrix.md): Grid kotak centang: hal yang diputuskan di baris, dikelompokkan per area, dan pilihan di kolom. Header dan kolom pertama tetap di tempat saat kotaknya digulir, dan setiap area punya satu kotak centang per kolom untuk semuanya.
- [Floor plan](floor-plan.md): Hal yang bisa dipesan digambar di tempatnya: meja di ruang makan, ruangan di satu lantai, meja belajar di perpustakaan. Masing-masing adalah tombol yang diwarnai menurut state-nya, dan state itu selalu tertulis juga dalam kata, sehingga orang menemukan yang kosong dari tempat dan namanya.
- [Route schematic](route-schematic.md): Pemberhentian satu perjalanan di sebuah garis: bagian yang sudah ditempuh berwarna aksen, kendaraan di posisinya sekarang, dan tempat serta waktu di bawah setiap pemberhentian. Diagram, bukan peta, sehingga tetap jujur dan terbaca di lebar berapa pun.
- [Map](map.md): Peta geser kecil di atas tile OpenStreetMap: rute dengan bagian yang sudah ditempuh berwarna aksen, kendaraan di posisinya, dan pin untuk tempat yang penting. Hanya menggambar tile yang terlihat dan selalu mencantumkan kredit data peta di sudut.

## Konten

Teks panjang, kutipan, kode, dan media

- [Prose](prose.md): Pembungkus untuk teks panjang yang tidak Anda atur baris per baris: artikel, halaman bantuan, panduan layanan, Markdown yang dirender. `.prose` memberi gaya pada heading, paragraf, daftar, tautan, tabel dan kode inline polos di dalamnya dan membatasi panjang baris sampai 680 px.
- [Quote](quote.md): Kata-kata yang diucapkan atau ditulis orang lain, dipisahkan oleh garis aksen 3 px di kiri, 17/28 dengan `--text-strong`, dengan sumber di footer di bawahnya. Hanya untuk kutipan sungguhan.
- [Citation](citation.md): Pil bernomor kecil setelah sebuah klaim yang menautkan ke sumbernya: `<a class="cite" href="#src-1">1</a>`. Dipakai di artikel dan jawaban asisten agar setiap fakta bisa diperiksa.
- [Inline code](inline-code.md): Potongan kode pendek, nama berkas, kunci atau nilai di dalam kalimat: `<code class="code">report_id</code>`, monospace 0,88 em di atas `--bg-recessed`.
- [Thumbnail](thumbnail.md): Pratinjau gambar yang dipotong dengan rasio tetap (bawaan 4:3) di atas placeholder cekung. Sebagai tautan dengan `data-lds-lightbox`, ia membuka gambar penuh di [lightbox](lightbox.md) yang tumbuh dari thumbnail.
- [Paper](paper.md): Halaman yang bisa dicetak, ditampilkan sebagai lembar di dalam aplikasi: faktur, kuitansi, surat, sertifikat. Teksnya mengalir ulang mengikuti lebar, jadi pratinjau tetap terbaca di ponsel, dan bisa menjadi satu-satunya bagian yang dicetak.
- [Aksara Lampung](aksara.md): Teks Latin yang digambar dalam had Lampung, aksara daerah Lampung, sebagai aksen budaya yang tenang di samping nama, judul, dan identitas. Selalu disertai bacaan Latin; jangan pernah menjadi satu-satunya cara membaca sesuatu.

## Obrolan

Percakapan dengan orang atau asisten

- [Chat layout](chat-layout.md): Kolom percakapan: pesan bertumpuk dengan jarak 20 px di `.chat`, riwayat bergulir di atas composer yang tidak ikut tergulir, dan tombol Terbaru yang muncul hanya saat pembaca menggulir ke atas. Pesan terbaru selalu di bawah.
- [Chat message](chat-message.md): Satu giliran dalam percakapan. Kata-kata Anda ada di bubble aksen di kanan; asisten menjawab dengan teks baca biasa di kolom, dengan baris aksi yang tenang di bawahnya. Baris sistem berupa footnote di tengah.
- [Composer](composer.md): Kotak balasan di bawah percakapan: kolom membulat yang tumbuh mengikuti teks, Enter untuk mengirim, Shift+Enter untuk baris baru, dan satu tombol kirim bulat yang nonaktif sampai ada yang bisa dikirim.
- [Streaming text](streaming-text.md): Jawaban yang datang kata demi kata, setiap kata memudar masuk dari blur 3 px, dengan caret bulat di ujung selama masih ada yang datang. Ini menunjukkan kemajuan nyata; jangan pernah memalsukannya untuk teks yang sudah Anda miliki.
- [Tool call](tool-call.md): Satu langkah yang diambil asisten untuk sampai pada jawabannya (mencari di panduan layanan, membaca berkas, memeriksa jadwal), ditampilkan sebagai `<details>` satu baris yang tenang dan bisa dibuka untuk melihat temuannya. Jawaban tetap yang utama.

## Pola halaman

Cara komponen bergabung menjadi halaman

- [Sections](sections.md): Halaman sebagai kolom berisi bagian-bagian berjudul: berjarak 48 px, garis tipis di atas setiap bagian setelah yang pertama, heading lebih besar di layar lebar. Struktur dibentuk oleh ruang dan heading, bukan kartu di sekeliling setiap bagian.
- [Spotlight](spotlight.md): Satu hal di halaman yang paling layak dikerjakan berikutnya, di atas tint aksen: eyebrow, judul, satu kalimat, dan satu atau dua aksi. Paling banyak satu per halaman.
- [Link card](link-card.md): Kisi tujuan di atas isian tenang: setiap kartu adalah satu tautan dengan eyebrow, judul, satu baris detail, dan kaki yang chevron-nya condong ke arah tujuan.
- [Resizable split](resizable-split.md): Dua panel dengan pegangan di antaranya yang bisa diseret, atau digeser dengan tombol panah, untuk membagi ruang. Untuk alat kerja yang kedua panelnya dipakai bersamaan.
- [Phone screen](phone-screen.md): Tata letak ponsel standar: judul besar yang menyatu ke nav bar tembus pandang saat konten bergulir di bawahnya, list berkelompok di tengah, dan tab bar tembus pandang di bawah. Kedua bar adalah satu-satunya permukaan yang di-blur.
- [Device frame](device-frame.md): Badan ponsel di sekitar layar `.phone`: bezel membulat, tombol samping, pulau kamera, dan status bar, diskalakan agar muat di halaman. Di ponsel sungguhan, layar yang sama melepas badannya dan mengisi tampilan dengan `.device--bleed`.

## Promosi

Halaman produk, layanan, dan beranda di depan aplikasi

- [Hero](hero.md): Bagian atas halaman produk atau landing page: satu judul utama, satu baris di bawahnya, paling banyak dua aksi, dan layanannya sendiri di samping atau di bawah. Layanan ditampilkan sedang berjalan, bukan sebagai gambar layar.
- [Marketing section](marketing-section.md): Satu bagian dari landing page atau halaman layanan: head berisi eyebrow, judul besar dan lede, di atas konten apa pun. Semua marketing section berbagi lebar dan gutter yang sama, jadi tepinya sejajar sepanjang halaman.
- [Feature row](feature-row.md): Satu fitur diceritakan di samping buktinya: judul singkat, satu paragraf dan beberapa poin di satu sisi, stage hidup dengan fitur yang berjalan di sisi lain. Baris bergantian sisi dengan `feature--reverse`.
- [Plans](plans.md): Paket harga sebagai card, dengan kontrol periode pembayaran di atasnya. Harga bergulir saat periode atau jumlah peserta berubah; penghematannya disebut dengan kata-kata di samping kontrol.
- [Compare table](compare-table.md): Paket sebagai kolom dan fitur sebagai baris, dikelompokkan per topik, dengan ikon centang, ikon strip atau nilai singkat di setiap sel. Tabel bergulir ke samping di kotaknya sendiri sementara nama fitur tetap di tempat.
- [Testimonial](testimonial.md): Apa yang dikatakan satu orang sungguhan tentang layanan, dengan nama dan perannya. Sengaja tenang: kata-katanya yang membawa. Terbitkan hanya kutipan asli; selama merancang, beri label konten contoh pada placeholder di tempat pembaca melihatnya.
- [CTA band](cta-band.md): Ajakan terakhir di landing page: judul singkat, satu baris, dan aksi utama yang sama dengan hero, di atas isian tenang. Boleh berisi satu baris yang disalin orang untuk memulai.
- [Site footer](site-footer.md): Bagian bawah situs layanan atau situs konten: nama layanan dan satu baris tentangnya, kelompok tautan yang memang ada, dan baris bawah untuk cetakan kecil dan kontrol tampilan.

## Gerak

Resep untuk hal yang bergerak

- [Motion principles](motion-principles.md): Tenang secara bawaan: elemen tiba dengan spring tanpa overshoot, pergi lebih cepat dengan kurva yang makin cepat, mulai dari posisi mana pun saat diinterupsi, dan hanya memantul setelah gestur yang membawa momentum. Setiap nilai berasal dari token; resep di grup ini menyebut token yang dipakai.
- [Press feedback](press-feedback.md): Kontrol menanggapi tepat saat jari atau mouse turun: ia sedikit tenggelam dalam 90 ms dan memantul kembali saat dilepas. Kedalamannya mengikuti ukuran, jadi elemen kecil tenggelam lebih dalam dan elemen lebar nyaris tidak bergerak. Setiap kontrol sistem sudah melakukannya; Anda cukup memilih kontrol yang tepat.
- [Enter and exit](enter-and-exit.md): Cara sesuatu muncul dan menghilang: overlay naik beberapa piksel dan membesar dari 0,96 dengan smooth spring sambil cepat memudar masuk; overlay pergi dalam 180 ms dengan kurva keluar, lebih tenang daripada saat datang, lewat jalur yang sama. Butir yang bergabung ke daftar memudar masuk dari blur tipis.
- [Sliding indicator](sliding-indicator.md): Satu penanda berpindah ke pilihan yang dipilih: thumb segmented, garis tab, sorotan sidebar, garis outline, sorotan toolbar. Label tidak pernah menyala sendiri; satu elemen yang bergerak itulah yang menunjukkan ke mana pilihan berpindah.
- [Height expand](height-expand.md): Konten yang terbuka atau tertutup di dalam alur menganimasikan tingginya lewat baris grid (`0fr` ke `1fr`) dengan smooth spring, sehingga semua yang di bawahnya bergeser alih-alih melompat. Konten memudar masuk sesaat setelah ruangnya terbuka dan memudar keluar sebelum ruangnya tertutup.
- [List stagger](list-stagger.md): Saat sekelompok butir tiba bersamaan, setiap butir menyusul butir sebelumnya dengan jeda 35 ms, memudar masuk dari blur 4 px dan naik 4 px. Seluruh rangkaian selesai di bawah 400 ms, sehingga daftar terbaca sebagai satu kedatangan yang punya arah, bukan iring-iringan yang lambat.
- [View swap](view-swap.md): Satu tampilan menggantikan tampilan lain di tempat yang sama: panel tab, langkah berikutnya dalam formulir, rentang lain pada grafik. Tampilan lama langsung hilang dan yang baru memudar masuk dari blur 4 px dan naik 4 px dalam 240 ms. Cukup cepat agar tidak pernah terasa seperti memuat halaman; cukup lembut agar mata melihat perubahannya.
- [Shared element](shared-element.md): Gambar yang Anda ketuk membesar dari thumbnail-nya sendiri menjadi tampilan penuh dan mengecil kembali ke tempat yang sama saat ditutup (transisi FLIP). Karena objeknya tidak pernah hilang, orang tidak kehilangan posisinya: tampilan besar jelas merupakan benda yang sama, bukan halaman baru.
- [Number count](number-count.md): Saat angka berubah di depan seseorang, setiap kolom digit bergulir ke nilai barunya dengan smooth spring, dan bar serta ring meluncur ke panjang barunya dengan kurva in-out. Perubahannya terlihat, nilai barunya langsung terbaca, dan lebarnya tidak pernah melompat.
- [Drag and momentum](drag-and-momentum.md): Apa pun yang digerakkan jari mengikutinya persis, menahan dengan lembut saat melewati batas, dan saat dilepas menuju ke arah lemparannya: kecepatan saat dilepas diproyeksikan ke depan untuk menentukan hasilnya, lalu spring dengan sedikit overshoot menuntaskannya. Satu jentikan menghasilkan hal yang sama dengan seretan panjang.
- [Reveal on scroll](reveal-on-scroll.md): Gambar, angka kunci, dan ilustrasi memudar naik 4 px saat pertama kali masuk ke layar karena scroll, sekali saja, dan tidak pernah lagi. Teks isi, daftar, dan tabel tidak pernah dimunculkan dengan cara ini: orang harus bisa membaca dan mencari semuanya sekaligus.
- [Reduced motion](reduced-motion.md): Saat orang meminta perangkatnya mengurangi gerakan, sistem mempertahankan setiap perubahan state dan membuang perpindahannya: transisi menjadi perubahan 120 ms linear, animasi keyframe diputar sekali dalam 1 ms, dialog dan menu berhenti berubah skala, shimmer dan percikan berhenti, gerakan terbang dan kemunculan saat scroll dilewati. Spinner tetap berputar karena melaporkan pekerjaan.

## Mikrointeraksi

Respons kecil yang membuat kontrol terasa hidup

- [Text morph](text-morph.md): Sebuah kata berubah di tempatnya dan hanya huruf yang berbeda yang bergerak: huruf yang tetap bergeser ke posisi barunya, huruf baru naik masuk, huruf yang pergi memudar kabur, dan lebarnya berpindah dengan spring di antara dua kata. Pakai untuk hasil sebuah aksi yang disampaikan dengan kata, tepat di tempat aksi itu terjadi.
- [Confirm in place](confirm-in-place.md): Aksi berisiko yang bertanya, bekerja, dan melapor di dalam satu pil: diam, lalu "Hapus 3 berkas?", lalu Menghapus, lalu Terhapus dengan Urungkan. Pil menyesuaikan lebarnya dengan spring untuk setiap kalimat, jadi elemen di sekitarnya tidak melompat dan orang tidak perlu menghadapi dialog untuk aksi kecil yang bisa diurungkan.
- [Like](like.md): Memberi dukungan bersifat optimistis: hati terisi, memantul, dan melontarkan tujuh percikan begitu ditekan, dan jumlahnya bergulir naik, sebelum server menjawab. Jika server menolak, semuanya kembali dengan goyangan dan alasannya ditampilkan.
- [Shake](shake.md): Tanda penolakan: kontrol bergoyang dua kali, cepat dan dengan ayunan yang mengecil (360 ms), dan alasannya muncul dalam kata-kata di sampingnya. Goyangan menarik mata tepat ke tempatnya; kata-katanya menjelaskan apa yang harus dilakukan.
- [Icon swap](icon-swap.md): Satu glyph berubah menjadi glyph lain di tempatnya: yang lama mengecil ke setengah dan memudar kabur, sementara yang baru mendarat dengan spring yang sigap. Untuk ikon yang menyatakan status baru (tersalin, diputar, tersimpan), bukan untuk hiasan.
- [Bell](bell.md): Ikon lonceng berbunyi sekali, ayunan pendek dari bagian atasnya yang berhenti dalam 640 ms, saat notifikasi dinyalakan atau notifikasi baru masuk. Sekali saja, tidak pernah berulang: lonceng memberi tanda, bukan merecoki.
- [Menu icon](menu-icon.md): Tiga garis yang melipat menjadi ikon tutup saat tombolnya membuka menu, dan terbuka lagi saat menu ditutup: garis atas dan bawah bertemu lalu berputar 45 derajat, garis tengah mengecil hilang. Tombolnya tidak berpindah, jadi tempat yang sama membuka dan menutup.
- [Expanding toolbar](expanding-toolbar.md): Deretan ringkas alat berikon; alat yang sedang di-hover atau difokus membuka labelnya dan satu sorotan meluncur ke sana. Alat bawaan menampilkan labelnya saat diam, jadi bilah ini tidak pernah berupa deretan ikon tanpa penjelasan.
- [Swipe actions](swipe-actions.md): Swipe baris daftar ke kiri untuk menampilkan aksinya; swipe jauh atau sentil cepat untuk menjalankan aksi terakhir, lalu baris meluncur keluar dan ruangnya menutup. Baris mengikuti jari dengan tepat, dan aksi yang sama terbuka dengan tombol panah kiri.
- [Inline edit](inline-edit.md): Klik sebuah nama untuk mengganti namanya di tempat: teks menjadi kolom dengan font dan lebar yang sama, Enter atau meninggalkan kolom menyimpan, Escape mengembalikannya. Penyimpanan menggambar centang kecil; penyimpanan yang ditolak mengembalikan nama lama, bergoyang, dan menjelaskan alasannya.
- [Upload progress](upload-progress.md): Unggahan menelusuri kemajuannya di sepanjang tepi drop zone tempat berkas dijatuhkan, dengan pil persentase di sudutnya. Garisnya berubah hijau di 100%. Angkanya nyata; tidak pernah merayap ke 90% lalu diam menunggu.
- [Scroll fades](scroll-fades.md): Area scroll memudarkan sebuah tepi hanya selama masih ada konten di baliknya: tepi atas muncul begitu Anda meninggalkan awal, tepi bawah hilang saat Anda sampai di akhir. Pudaran selalu berarti "masih ada konten ke arah sini".
- [Hints](hints.md): Tip singkat yang mengajarkan pintasan atau gestur, hanya tampil pada beberapa kunjungan pertama dan hilang selamanya setelah ditutup. Makin sering dipakai, makin jarang muncul: saat orang sudah paham caranya, petunjuk itu sudah pensiun sendiri.
- [Haptics](haptics.md): Getaran singkat di ponsel yang mendukungnya, selalu bersama perubahan yang terlihat, tidak pernah sendirian. Ada empat jenis: light untuk ketukan yang mengubah sesuatu, medium untuk gestur yang dijalankan, success saat sesuatu selesai, error saat sesuatu ditolak.
- [Pull to refresh](pull-to-refresh.md): Tarik daftar di ponsel ke bawah dari atas: konten mengikuti dengan hambatan, spinner berputar saat masuk, dan setelah melewati 56 px, melepas jari akan memuat ulang. Spinner bertahan sampai pekerjaan selesai, minimal 700 ms agar tidak berkedip.

## Grafik

Menampilkan angka sebagai gambar

- [Chart principles](chart-principles.md): Aturan yang diikuti setiap grafik di sistem ini: satu pertanyaan per grafik, ditulis sebagai judulnya; tanda tipis di atas grid yang samar; empat warna seri dengan urutan tetap; label langsung, bukan legenda; dan alternatif teks untuk setiap grafik.
- [Chart card](chart-card.md): Bingkai untuk setiap grafik di dasbor: pertanyaan sebagai judul, apa yang diukur di bawahnya, lalu aksi opsional (kontrol periode, menu), angka utama beserta perubahannya, grafik, dan footer berisi waktu data atau tautan ke laporan lengkap.
- [Sparkline stat](sparkline-stat.md): Satu angka utama dengan keterangan arahnya dan garis kecil riwayat terbarunya, di dalam kartu grafik. Angkanya yang utama; sparkline hanya menunjukkan bentuk trennya.
- [Bar chart](bar-chart.md): Batang vertikal yang membandingkan satu nilai di beberapa kategori atau periode (hari, kecamatan, jenis layanan). Batang dimulai dari nol, jawabannya disorot, sisanya memudar.
- [Ranked bars](ranked-bars.md): Baris berisi label, batang horizontal, dan nilainya, diurutkan dari yang terpanjang: sumber teratas, halaman teratas, skor terbaik. Label panjang tetap terbaca karena berada di samping (atau di dalam) batang, bukan di bawahnya, dan setiap baris berbagi satu grid sehingga batang dan nilai sejajar.
- [Line chart](line-chart.md): Satu garis per seri sepanjang waktu, pada SVG dengan garis grid yang samar dan label di ujung garis. Untuk tren dengan banyak titik; paling banyak empat seri, seri kedua putus-putus.
- [Area chart](area-chart.md): Garis berisi isian sepanjang waktu, digambar dari data: satu seri dengan pembanding putus-putus, sampai empat seri bertumpuk menjadi total, atau anak tangga untuk nilai yang berubah dengan lompatan. Item legenda menyalakan dan mematikan seri; crosshair membaca semua seri sekaligus.
- [Combo chart](combo-chart.md): Batang untuk apa yang terjadi di setiap periode dan garis untuk apa yang diharapkan (rencana, prakiraan, tahun lalu), pada satu skala bersama, dengan garis acuan putus-putus opsional untuk ambang tetap. Digambar dari data seperti area chart.
- [Donut](donut.md): Cincin yang dibagi menjadi paling banyak empat segmen untuk menunjukkan bagian dari satu keseluruhan, dengan total di tengah dan daftar berlabel di sampingnya. Daftar membawa angkanya; cincin menunjukkan proporsi sekilas.
- [Gauge](gauge.md): Setengah cincin dengan nilai di bukaannya: satu angka terhadap rentang yang diketahui (kuota terisi, skor, beban), atau deretan tick yang dibagi di antara beberapa status (tersedia, menipis, habis). Terbaca sekilas; kata-kata di bawah angka membawa rinciannya.
- [Percentage bar](percentage-bar.md): Satu batang horizontal yang dibagi menjadi paling banyak empat bagian berwarna yang berjumlah 100 %, dengan legenda yang menyebut nama dan porsi setiap bagian. Cara ringkas untuk menunjukkan komposisi.
- [Target bar](target-bar.md): Batang horizontal untuk kemajuan menuju target: isian menunjukkan posisi sekarang, penanda menunjukkan posisi yang seharusnya (target, atau laju hari ini), dan tint opsional di depan isian menunjukkan prakiraan. Kata-kata di atasnya menyebut nilai terhadap target.
- [Funnel](funnel.md): Tahap-tahap sebuah alur, masing-masing dengan berapa orang yang mencapainya dan berapa persen dari tahap sebelumnya yang lanjut. Batang di tengah menyempit mengikuti jumlahnya, jadi penurunan terbesar terlihat sekilas; kata-katanya membawa angka pastinya.
- [Heatmap](heatmap.md): Grid kotak kecil, satu per hari atau slot, diarsir dalam lima tingkat satu warna dari kosong sampai paling banyak. Menunjukkan pola selama banyak periode (hari yang ramai, kebiasaan mingguan), bukan nilai pastinya.
- [Uptime bars](uptime-bars.md): Satu batang tipis per hari (atau jam) dalam satu baris, diwarnai menurut kondisinya: normal, terganggu, atau mati. Pola gangguan selama 90 hari terbaca sekilas; mengarahkan kursor ke satu batang, atau memakai tombol panah, menyebut apa yang terjadi hari itu.
- [Chart states](chart-states.md): Setiap grafik dirancang dalam state loading, kosong, dan error di dalam `.chart-card` yang sama, dengan ukuran yang sama seperti grafik yang sudah dimuat: skeleton berbentuk grafiknya sendiri, pesan kosong beserta alasannya, dan error dengan tombol coba lagi.
