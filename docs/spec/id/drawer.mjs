export default {
  summary: 'Panel yang bergeser masuk dari tepi kanan di layar lebar untuk filter, detail, atau tugas sekunder, sementara daftar asalnya tetap terlihat. Ia keluar ke sisi asalnya.',
  when: [
    'Di layar lebar, filter untuk daftar atau tabel: status, layanan, rentang tanggal.',
    'Detail baris yang dicek tanpa meninggalkan daftar: sebuah permohonan, tagihan, atau data pemohon.',
    'Tugas sekunder yang dikerjakan sambil melihat halaman di belakangnya.',
  ],
  whenNot: [
    ['Tugas yang sama di ponsel', 'sheet', 'Bottom sheet berada di bawah jempol; berganti di breakpoint ponsel Anda'],
    ['Navigasi aplikasi di ponsel', 'app-shell', 'Shell punya drawer kiri sendiri'],
    ['Pertanyaan singkat yang harus dijawab lebih dulu', 'dialog'],
    ['Formulir tingkat halaman', 'modal'],
    ['Tiga sampai tujuh perintah', 'dropdown-menu'],
  ],
  where: 'Berjarak 10 px dari atas, kanan, dan bawah kontainer yang diposisikan (`.viewport`, atau pembungkus `position: fixed; inset: 0` untuk halaman), lebar 320 px, sebagai kolom dengan jarak 16 px. Aksi di bawah (`margin-top: auto`). Pakai scrim tipis, atau tanpa scrim, agar halaman tetap terbaca.',
  anatomy: [
    ['.drawer[role=dialog]', 'Wajib. Panelnya (`<aside>`) dengan `id`, `data-lds-layer`, dan `aria-labelledby`. Tambahkan `aria-modal="true"` hanya jika halaman di belakang tidak boleh dipakai selama panel terbuka.'],
    ['.sheet__head + .sheet__title', 'Baris judul dengan [icon button](icon-button) penutup (`data-lds-close`).'],
    ['content', 'Field, checkbox, daftar [key-value](key-value).'],
    ['actions', 'Baris yang didorong ke bawah: reset yang tenang dan tombol utama.'],
    ['.scrim[data-lds-scrim="id"]', 'Opsional; klik untuk menutup. Tipiskan dengan latar inline jika halaman harus tetap terbaca.'],
  ],
  examples: [
    {
      title: 'Filter permohonan',
      desc: 'Bergeser masuk dari kanan dengan spring dan keluar ke kanan, lebih cepat. Escape, tombol tutup, atau scrim menutupnya; fokus kembali ke Filter.',
      html: `<div class="viewport docs-box">
  <div class="viewport__content">
    <button class="btn btn--secondary btn--md" data-lds-open="dr-filter" aria-haspopup="dialog"><span class="ic" aria-hidden="true">tune</span>Filter</button>
    <p class="section__sub">48 permohonan izin usaha mikro</p>
  </div>
  <div class="scrim" data-lds-scrim="dr-filter" style="background: rgba(9, 9, 11, 0.12);"></div>
  <aside class="drawer" id="dr-filter" role="dialog" aria-labelledby="dr-filter-t" data-lds-layer>
    <div class="sheet__head" style="margin: 0;"><h3 class="sheet__title" id="dr-filter-t">Filter</h3><button class="icon-btn" aria-label="Tutup filter" data-lds-close style="margin: -10px -10px -10px 0;"><span class="ic" aria-hidden="true">close</span></button></div>
    <label class="check"><input type="checkbox"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path></svg></span><span class="check__text">Melewati batas waktu</span></label>
    <label class="check"><input type="checkbox" checked><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path></svg></span><span class="check__text">Perlu diverifikasi</span></label>
    <div style="margin-top: auto; display: flex; gap: 8px;"><button class="btn btn--gray btn--md" style="flex: 1;">Hapus filter</button><button class="btn btn--primary btn--md" style="flex: 1;" data-lds-close>Tampilkan 12 hasil</button></div>
  </aside>
</div>`,
    },
    {
      title: 'Detail baris',
      desc: 'Data baca-saja di samping daftar, tanpa scrim: halaman tetap bisa dipakai.',
      html: `<div class="viewport docs-box">
  <div class="viewport__content">
    <button class="btn btn--gray btn--md" data-lds-open="dr-inv" aria-haspopup="dialog">Tagihan 2024-118</button>
  </div>
  <aside class="drawer" id="dr-inv" role="dialog" aria-labelledby="dr-inv-t" data-lds-layer>
    <div class="sheet__head" style="margin: 0;"><h3 class="sheet__title" id="dr-inv-t">Tagihan 2024-118</h3><button class="icon-btn" aria-label="Tutup tagihan" data-lds-close style="margin: -10px -10px -10px 0;"><span class="ic" aria-hidden="true">close</span></button></div>
    <p class="section__sub">Retribusi kebersihan, semester kedua. Diterbitkan 2 September, dibayar 9 September lewat transfer bank.</p>
    <span class="badge badge--success">Lunas</span>
    <div style="margin-top: auto;"><button class="btn btn--secondary btn--md btn--block"><span class="ic" aria-hidden="true">download</span>Unduh PDF</button></div>
  </aside>
</div>`,
    },
  ],
  states: [
    ['.is-open', 'Sudah bergeser masuk; scrim (jika ada) tampil.'],
    ['closed', 'Di luar tepi kanan (`translateX(calc(100% + 20px))`), `aria-hidden` dan `inert`.'],
  ],
  motion: [
    'Masuk: dari luar tepi kanan ke posisi diam dengan `--spring-smooth` selama `--d-smooth` (560 ms).',
    'Keluar: kembali ke kanan dalam 240 ms dengan `--ease-exit`. Jalur yang sama, tidak pernah memudar atau jatuh.',
    'Scrim: masuk selama `--d-standard`, keluar selama `--d-exit`. Reduced motion: geserannya 120 ms linear.',
  ],
  a11y: [
    '`role="dialog"` dengan `aria-labelledby`. Tambahkan `aria-modal="true"` saat halaman di belakang diblokir (dengan scrim); Tab lalu dikunci.',
    'Fokus pindah ke elemen pertama yang bisa difokus saat dibuka; Escape menutup; fokus kembali ke pemicu.',
    'Tombol tutup menyebut apa yang ditutup ("Tutup filter").',
  ],
  do: [
    'Tampilkan jumlah hasil di tombol utama ("Tampilkan 12 hasil").',
    'Biarkan daftar di belakang tetap terlihat dan selaras.',
    'Ganti dengan [sheet](sheet) di ponsel.',
  ],
  dont: [
    'Membuka drawer dari kiri; tepi kiri milik navigasi.',
    'Menaruh satu halaman utuh di drawer.',
    'Menganimasikannya dengan fade atau skala.',
  ],
  js: 'Hook lapisan: `data-lds-open`, `data-lds-close`, `data-lds-scrim`, `data-lds-layer`; `openLayer(id)` / `closeLayer(id)`; event `lds:open` / `lds:close`. Escape menutup lapisan paling atas.',
};
