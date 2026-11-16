export default {
  summary: 'Daftar berkelompok yang menjorok: baris di satu permukaan, dipisah garis tipis yang dimulai di awal teks. Default untuk daftar apa pun, sebagai ganti tumpukan kartu.',
  when: [
    'Kumpulan butir serupa yang dipindai atau dibuka: layanan, pesan, pengaturan, pembayaran, berkas.',
    'Baris navigasi yang menuju ke suatu tempat (`a.lrow` dengan chevron) atau menjalankan aksi (`button.lrow`).',
    'Pengaturan, setiap baris berisi label dengan nilai, switch, atau chevron.',
    'Langkah bernomor yang diikuti (`.lrow--num`) atau daftar centang persyaratan atau isi layanan (`.lrow--check`).',
  ],
  whenNot: [
    ['Butir dibandingkan menurut beberapa atribut (kolom)', 'table'],
    ['Pasangan label dan nilai yang menjelaskan satu hal', 'key-value'],
    ['Setiap butir adalah pokok kaya dengan media dan aksinya sendiri', 'card'],
    ['Grid tujuan di halaman depan atau ringkasan', 'link-card'],
    ['Folder bertingkat atau hierarki', 'tree'],
    ['Peristiwa berurutan waktu dengan garis penghubung', 'timeline'],
    ['Orang memilih satu opsi dari baris-barisnya', 'radio-card'],
    ['Langkah alur yang sedang dijalani orang saat ini', 'steps'],
    ['Daftar panjang yang hanya beberapa butir pertamanya penting', 'show-more'],
  ],
  where: 'Di kolom isi, selebar kolom itu, di ponsel dari tepi ke tepi di dalam padding halaman. `.list__header` di atas menamai kelompoknya dan `.list__footer` di bawah menjelaskannya. Di atas kanvas pakai daftar putih default; di panel berisi isian tenang pakai `.list--fill`.',
  anatomy: [
    ['.list', 'Wajib. Permukaannya: putih dengan ring tipis dan radius besar, memotong barisnya. Pakai `div`, atau `ul`/`ol` dengan baris `li.lrow`.'],
    ['.list--fill', 'Isian tenang sebagai ganti putih, tanpa ring.'],
    ['.lrow', 'Wajib. Satu baris: minimal 48 px, padding samping 16 px, jarak 12 px. Baris harus bersaudara langsung agar garis tipisnya (`.lrow + .lrow`) tergambar.'],
    ['a.lrow / button.lrow', 'Baris yang membuka halaman atau menjalankan aksi. Tersorot saat ditekan; baris tautan diberi tint saat hover dan chevron-nya maju 2 px.'],
    ['.lrow--icon + .lrow__icon > .ic', 'Kotak berwarna 30 px dengan glyph putih terisi; garis tipis lalu dimulai setelah ikon (58 px).'],
    ['.lrow__body > .lrow__title + .lrow__sub', 'Wajib. Judul (15 px) dan baris kedua opsional (13 px, samar).'],
    ['.lrow__value', 'Nilai di ujung (15 px, samar): pengaturan, jam, jumlah.'],
    ['.lrow__chev', '`chevron_right` di ujung baris yang membuka halaman.'],
    ['.lrow--num > .lrow__num', 'Baris bernomor: lingkaran tint aksen 24 px berisi nomor; judulnya boleh turun baris.'],
    ['.lrow--check > .ic.lrow__check', 'Baris tercentang: `check_circle` terisi berwarna success; judulnya boleh turun baris.'],
    ['.list__header / .list__footer', 'Teks di atas dan di bawah daftar, 13 px samar, menjorok sejajar teks baris.'],
  ],
  examples: [
    {
      title: 'Baris navigasi',
      desc: 'Ikon di kotak berwarna, nilai atau hitungan, dan chevron. Garis tipis dimulai di teks.',
      html: `<div style="max-width: 440px;">
  <p class="list__header">Akun</p>
  <div class="list">
    <a class="lrow lrow--icon" href="#profile"><span class="lrow__icon"><span class="ic" aria-hidden="true">person</span></span><span class="lrow__body"><span class="lrow__title">Profil</span></span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></a>
    <a class="lrow lrow--icon" href="#notifications"><span class="lrow__icon" style="background: var(--tile-red);"><span class="ic" aria-hidden="true">notifications</span></span><span class="lrow__body"><span class="lrow__title">Notifikasi</span></span><span class="count">3<span class="sr-only"> baru</span></span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></a>
    <a class="lrow lrow--icon" href="#language"><span class="lrow__icon" style="background: var(--tile-green);"><span class="ic" aria-hidden="true">public</span></span><span class="lrow__body"><span class="lrow__title">Bahasa</span></span><span class="lrow__value">Indonesia</span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></a>
  </div>
  <p class="list__footer">Perubahan berlaku di setiap perangkat tempat Anda masuk.</p>
</div>`,
    },
    {
      title: 'Baris dua lapis dengan nilai',
      desc: 'Judul dan baris kedua di kiri, nilainya di kanan.',
      html: `<ul class="list" style="max-width: 440px;">
  <li class="lrow"><div class="lrow__body"><div class="lrow__title">Pajak bumi dan bangunan 2026</div><div class="lrow__sub">Dibayar 2 Sep lewat transfer bank</div></div><span class="lrow__value">Rp 1.250.000</span></li>
  <li class="lrow"><div class="lrow__body"><div class="lrow__title">Retribusi sampah</div><div class="lrow__sub">Dibayar 2 Sep</div></div><span class="lrow__value">Rp 35.000</span></li>
  <li class="lrow"><div class="lrow__body"><div class="lrow__title">Pajak kendaraan bermotor</div><div class="lrow__sub">Jatuh tempo 28 Nov</div></div><span class="badge badge--warning">Belum dibayar</span></li>
</ul>`,
    },
    {
      title: 'Langkah bernomor',
      desc: 'Urutan yang diikuti. Pakai `<ol>` agar urutannya juga ada di markup.',
      html: `<ol class="list list--fill" style="max-width: 440px;">
  <li class="lrow lrow--num"><span class="lrow__num" aria-hidden="true">1</span><span class="lrow__body"><span class="lrow__title">Unduh formulir pendaftaran dan isi setiap halamannya.</span></span></li>
  <li class="lrow lrow--num"><span class="lrow__num" aria-hidden="true">2</span><span class="lrow__body"><span class="lrow__title">Minta tanda tangan lurah di halaman 3.</span></span></li>
  <li class="lrow lrow--num"><span class="lrow__num" aria-hidden="true">3</span><span class="lrow__body"><span class="lrow__title">Unggah formulir yang sudah ditandatangani sebelum 28 November.</span><span class="lrow__sub">PDF, maksimal 5 MB</span></span></li>
</ol>`,
    },
    {
      title: 'Baris tercentang',
      desc: 'Persyaratan yang terpenuhi, atau isi sebuah layanan.',
      html: `<div style="max-width: 440px;">
  <p class="list__header">Termasuk dalam pendampingan UMKM</p>
  <ul class="list">
    <li class="lrow lrow--check"><span class="ic lrow__check" aria-hidden="true">check_circle</span><span class="lrow__body"><span class="lrow__title">Bantuan mengurus nomor induk berusaha</span></span></li>
    <li class="lrow lrow--check"><span class="ic lrow__check" aria-hidden="true">check_circle</span><span class="lrow__body"><span class="lrow__title">Pelatihan pembukuan sederhana</span></span></li>
    <li class="lrow lrow--check"><span class="ic lrow__check" aria-hidden="true">check_circle</span><span class="lrow__body"><span class="lrow__title">Jadwal konsultasi bulanan dengan pendamping</span></span></li>
  </ul>
</div>`,
    },
    {
      title: 'Pengaturan dengan switch',
      desc: 'Switch dengan labelnya memenuhi baris; labelnya adalah teks switch.',
      html: `<div class="list" style="max-width: 440px;">
  <div class="lrow"><label class="switch" style="flex: 1;"><input type="checkbox" role="switch" checked><span class="switch__track" aria-hidden="true"><span class="switch__thumb"></span></span><span class="switch__text">Kirim email saat status permohonan berubah</span></label></div>
  <div class="lrow"><label class="switch" style="flex: 1;"><input type="checkbox" role="switch"><span class="switch__track" aria-hidden="true"><span class="switch__thumb"></span></span><span class="switch__text">Ringkasan mingguan laporan warga</span></label></div>
</div>`,
    },
  ],
  variants: [
    ['list', 'Putih dengan ring: di atas kanvas.'],
    ['list--fill', 'Isian tenang, tanpa ring: di dalam kartu putih atau di atas kanvas untuk kelompok yang lebih lembut.'],
    ['lrow--icon', 'Baris dengan kotak ikon berwarna; garis tipis mulai di 58 px.'],
    ['lrow--num', 'Langkah bernomor; rata atas, judul boleh turun baris.'],
    ['lrow--check', 'Butir tercentang; rata atas, judul boleh turun baris.'],
  ],
  states: [
    ['hover (a, button rows)', 'Tint `--bg-tint-strong`; chevron baris tautan bergeser 2 px ke kanan. Hanya di perangkat yang bisa hover.'],
    [':active', 'Baris yang menjalankan aksi tersorot dengan `--bg-tint-strong` saat ditekan.'],
    ['selected', 'Tampilkan ikon `check` beraksen di ujung (satu pilihan di sheet), atau pakai [radio card](radio-card) untuk pilihan di formulir.'],
    ['current (master-detail)', 'Baris yang detailnya terbuka di samping atau di bawah daftar: `aria-current="true"` pada baris `a` atau `button` memberinya tint aksen dan judul beraksen. Satu per waktu.'],
    ['empty', 'Ganti daftar dengan [empty state](empty-state) di tempat yang sama.'],
    ['loading', 'Baris bentuk [skeleton](skeleton) di dalam `.list` yang sama.'],
  ],
  motion: [
    'Baris tautan: latar berubah selama `--d-fast` (160 ms) dengan `--ease-standard`; chevron maju 2 px dengan `--spring-snappy`.',
    'Baris yang datang (hasil baru) boleh memakai [list stagger](list-stagger); baris yang pergi menutup dengan [height expand](height-expand). Geser untuk memunculkan aksi adalah [swipe actions](swipe-actions).',
    'Tidak ada efek terangkat saat hover, tidak ada shadow.',
  ],
  a11y: [
    'Pakai `ul`/`ol` dengan `li.lrow` untuk baris statis, agar jumlahnya diumumkan. Untuk baris berupa tautan atau tombol, `div.list` berisi `a.lrow` / `button.lrow` sudah cukup; tambahkan `role="list"` dan bungkus dengan `role="listitem"` hanya bila jumlahnya penting.',
    'Ikon dan chevron diberi `aria-hidden="true"`; judul menjadi nama aksesibel baris tautan, jadi buat spesifik.',
    'Nomor di `.lrow__num` diberi `aria-hidden` bila daftarnya `<ol>` (urutannya sudah diumumkan).',
    'Satu baris, satu aksi. Aksi sekunder masuk ke [swipe actions](swipe-actions) atau [dropdown menu](dropdown-menu), bukan sebagai tombol tambahan di dalam baris tautan.',
  ],
  do: [
    'Pakai daftar di mana pun Anda hendak menumpuk kartu.',
    'Batasi baris pada satu aksi dan satu atau dua baris teks.',
    'Namai kelompoknya dengan `.list__header` dan jelaskan dengan `.list__footer`.',
  ],
  dont: [
    'Membungkus baris dengan `li` di dalam daftar tautan sehingga garis tipisnya hilang; baris harus bersaudara.',
    'Menaruh tombol di dalam baris tautan.',
    'Menambahkan shadow, border antar baris, atau radius sendiri.',
  ],
};
