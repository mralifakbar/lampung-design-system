# Data table

Kelompok: Tampilan data. https://lampung.kartadinata.app/docs/components/data-table

Tabel tempat orang bekerja: pencarian, chip dan menu filter, header yang bisa diurutkan, menu kolom, kerapatan baris, pemilihan baris dengan selection bar, dan pagination dengan ukuran halaman, semuanya di atas `.table` biasa dan dipasang oleh satu hook. Setiap kontrol langsung mengubah baris dan menyebutkan apa yang dilakukannya.

## Pakai saat
- Daftar catatan yang dicari, dipersempit, diurutkan, dan ditindaklanjuti sekaligus: petugas portal layanan, pemohon, permohonan izin, tagihan.
- Lebih dari sekitar 20 baris, sehingga halaman dan ukuran halaman membantu, dan kolomnya cukup banyak sehingga sebagian orang ingin lebih sedikit.

## Pakai yang lain saat
- Tabel pendek dan tetap yang hanya dibaca: pakai [Table](table.md). `.table` biasa, mungkin dengan `data-lds-sort`.
- Satu atau dua fakta per butir, kebanyakan di ponsel: pakai [List](list.md).
- Ribuan baris dari server: pakai [Table](table.md). Tampilkan halaman yang dikirim server ke dalam `.table` dan pertahankan markup bilah dan footer yang sama; hook ini bekerja pada baris di halaman itu.
- Berkas yang dikenali dari jenis atau gambarnya: pakai [File tile](file-tile.md).

## Letaknya
Selebar kolom isi. Bilah berada di atas tabel (pencarian dulu, lalu filter, alat di ujung), footer di bawahnya (jumlah di kiri, ukuran halaman dan pager di kanan). Selection bar mengambang di bawah jendela selama ada baris yang dicentang. Di ponsel pencarian mendapat baris sendiri, alat-alat turun ke baris berikutnya, tabel bergulir ke samping di dalam kotaknya, dan pager hanya menyisakan sebelumnya, halaman aktif, dan berikutnya.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.dtable[data-lds-table]` | Wajib. Pembungkus dan container query-nya. Nilai atributnya menamai tabel agar kerapatan, ukuran halaman, dan kolom tersembunyi diingat; `data-page-size` (default 10) dan `data-noun` ("anggota") mengatur default dan kata pada hitungan. |
| `.dtable__bar` | Toolbar: `.control.search.dtable__search` dengan `input[data-lds-table-search]`, filter, lalu `.dtable__tools`. |
| `[data-lds-table-filter="key"]` | Filter pada `data-key` setiap baris. Pada `.chip-row[data-lds-chips]`, `value` chip menjadi pilihannya; pada butir `menuitemcheckbox` (dengan `data-lds-keep-open`), `data-value` yang menjadi pilihan. Beberapa nilai dari satu kunci cocok bila salah satunya cocok; kunci yang berbeda harus cocok semua. |
| `.dtable__filter-count` | Badge `[data-lds-table-filter-count="key"]` opsional pada tombol filter: berapa nilai yang aktif. |
| `[data-lds-table-col="key"]` | Butir `menuitemcheckbox` yang menampilkan atau menyembunyikan kolom yang `th`-nya punya `data-col="key"`. Kolom terakhir yang terlihat tidak bisa disembunyikan. |
| `[data-lds-table-density]` | Tombol `.toggle` dengan `regular` dan `compact` (baris 40 px) di dalam `.toggle-group`. |
| `th[data-col] > button` | Header yang bisa diurutkan: naik, lalu turun, lalu tanpa urutan. `aria-sort` pada `th` mengatur urutan awal. `data-sort` pada sel menggantikan teksnya (tanggal, nama bergelar). |
| `.dtable__select` | Kolom kotak centang: `input[data-lds-select-all]` di header (baris yang terlihat), `input[data-lds-select]` per baris, masing-masing dengan `aria-label`. Butuh `data-lds-selection="selbarId"` pada pembungkus. |
| `tr.dtable__empty` | Wajib. Satu baris selebar semua kolom berisi [empty state](empty-state.md) dan tombol `[data-lds-table-reset]`; tampil bila tidak ada yang cocok. |
| `tr.dtable__state[data-state]` | Baris `loading` (sel skeleton) dan `error` (alert dengan coba lagi) opsional, ditampilkan oleh `tableState()`. |
| `.dtable__foot` | Hitungan `[data-lds-table-info]`, butir menu `[data-lds-table-size]` dengan `[data-lds-table-size-label]`, dan `.pager[data-lds-table-pager]` yang diisi hook. |

## Markup

**Petugas portal layanan.** Cari "keu", centang chip status, filter peran dari menu (menu tetap terbuka selama Anda mencentang), urutkan dari header mana pun, sembunyikan kolom, pindah ke baris rapat, centang baris (Shift-klik untuk satu rentang), dan pindah halaman. Setiap perubahan langsung memfilter; hitungan dan pager mengikuti.
```html
<div class="dtable" data-lds-table="demo-members" data-lds-selection="dt-bar" data-page-size="5" data-noun="anggota">
  <div class="dtable__bar">
    <div class="control search dtable__search"><span class="ic" aria-hidden="true">search</span><input type="search" data-lds-table-search placeholder="Cari nama atau email" aria-label="Cari anggota"></div>
    <div class="chip-row" data-lds-chips data-lds-table-filter="status" role="group" aria-label="Status">
      <button class="chip" value="active"><span class="ic chip__check" aria-hidden="true">check</span>Aktif</button>
      <button class="chip" value="invited"><span class="ic chip__check" aria-hidden="true">check</span>Diundang</button>
      <button class="chip" value="suspended"><span class="ic chip__check" aria-hidden="true">check</span>Ditangguhkan</button>
    </div>
    <div class="dtable__tools">
      <div style="position: relative;">
        <button class="btn btn--secondary btn--md" data-lds-menu="dt-role" aria-haspopup="menu" aria-expanded="false"><span class="ic" aria-hidden="true">filter_list</span>Peran<span class="dtable__filter-count" data-lds-table-filter-count="role" hidden>0</span></button>
        <div class="menu" id="dt-role" role="menu" aria-label="Peran" style="top: calc(100% + 6px); left: 0;">
          <button class="menu__item" role="menuitemcheckbox" aria-checked="false" data-lds-keep-open data-lds-table-filter="role" data-value="admin">Admin<span class="ic menu__check" aria-hidden="true">check</span></button>
          <button class="menu__item" role="menuitemcheckbox" aria-checked="false" data-lds-keep-open data-lds-table-filter="role" data-value="editor">Penyunting<span class="ic menu__check" aria-hidden="true">check</span></button>
          <button class="menu__item" role="menuitemcheckbox" aria-checked="false" data-lds-keep-open data-lds-table-filter="role" data-value="viewer">Pembaca<span class="ic menu__check" aria-hidden="true">check</span></button>
        </div>
      </div>
      <div style="position: relative;">
        <button class="btn btn--secondary btn--md" data-lds-menu="dt-cols" aria-haspopup="menu" aria-expanded="false"><span class="ic" aria-hidden="true">view_column</span>Kolom</button>
        <div class="menu menu--right" id="dt-cols" role="menu" aria-label="Kolom" style="top: calc(100% + 6px); right: 0;">
          <p class="menu__label">Tampilkan kolom</p>
          <button class="menu__item" role="menuitemcheckbox" data-lds-keep-open data-lds-table-col="role">Peran<span class="ic menu__check" aria-hidden="true">check</span></button>
          <button class="menu__item" role="menuitemcheckbox" data-lds-keep-open data-lds-table-col="status">Status<span class="ic menu__check" aria-hidden="true">check</span></button>
          <button class="menu__item" role="menuitemcheckbox" data-lds-keep-open data-lds-table-col="team">Bidang<span class="ic menu__check" aria-hidden="true">check</span></button>
          <button class="menu__item" role="menuitemcheckbox" data-lds-keep-open data-lds-table-col="joined">Bergabung<span class="ic menu__check" aria-hidden="true">check</span></button>
        </div>
      </div>
      <div class="toggle-group" role="group" aria-label="Kerapatan baris">
        <button class="toggle" data-lds-table-density="regular" aria-pressed="true">Biasa</button>
        <button class="toggle" data-lds-table-density="compact" aria-pressed="false">Rapat</button>
      </div>
    </div>
  </div>
  <div class="table-box" tabindex="0" aria-label="Anggota, bisa digulir ke samping">
    <table class="table">
      <thead><tr>
        <th class="dtable__select"><label class="check"><input type="checkbox" data-lds-select-all aria-label="Pilih semua anggota di halaman ini"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></th>
        <th data-col="name"><button>Nama<span class="ic" aria-hidden="true">arrow_upward</span></button></th>
        <th data-col="role"><button>Peran<span class="ic" aria-hidden="true">arrow_upward</span></button></th>
        <th data-col="status">Status</th>
        <th data-col="team"><button>Bidang<span class="ic" aria-hidden="true">arrow_upward</span></button></th>
        <th data-col="joined" aria-sort="descending"><button>Bergabung<span class="ic" aria-hidden="true">arrow_upward</span></button></th>
      </tr></thead>
      <tbody>
      <tr data-status="active" data-role="admin">
        <td class="dtable__select"><label class="check"><input type="checkbox" data-lds-select aria-label="Pilih Rina Wijaya"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td>
        <td data-sort="Rina Wijaya"><span class="dtable__user"><span class="avatar">RW</span><span><b>Rina Wijaya</b><small>rina@contoh.id</small></span></span></td>
        <td>Admin</td>
        <td><span class="badge badge--success">Aktif</span></td>
        <td>Perizinan</td>
        <td data-sort="2024-06-24">24 Jun 2024</td>
      </tr>
      <tr data-status="active" data-role="editor">
        <td class="dtable__select"><label class="check"><input type="checkbox" data-lds-select aria-label="Pilih Arif Santoso"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td>
        <td data-sort="Arif Santoso"><span class="dtable__user"><span class="avatar">AS</span><span><b>Arif Santoso</b><small>arif@contoh.id</small></span></span></td>
        <td>Penyunting</td>
        <td><span class="badge badge--success">Aktif</span></td>
        <td>Pengaduan</td>
        <td data-sort="2023-03-15">15 Mar 2023</td>
      </tr>
      <tr data-status="invited" data-role="viewer">
        <td class="dtable__select"><label class="check"><input type="checkbox" data-lds-select aria-label="Pilih Dewi Lestari"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td>
        <td data-sort="Dewi Lestari"><span class="dtable__user"><span class="avatar">DL</span><span><b>Dewi Lestari</b><small>dewi@contoh.id</small></span></span></td>
        <td>Pembaca</td>
        <td><span class="badge badge--accent">Diundang</span></td>
        <td>Keuangan</td>
        <td data-sort="2026-11-12">12 Nov 2026</td>
      </tr>
      <tr data-status="suspended" data-role="editor">
        <td class="dtable__select"><label class="check"><input type="checkbox" data-lds-select aria-label="Pilih Bima Prasetyo"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td>
        <td data-sort="Bima Prasetyo"><span class="dtable__user"><span class="avatar">BP</span><span><b>Bima Prasetyo</b><small>bima@contoh.id</small></span></span></td>
        <td>Penyunting</td>
        <td><span class="badge badge--danger">Ditangguhkan</span></td>
        <td>Layanan</td>
        <td data-sort="2022-04-10">10 Apr 2022</td>
      </tr>
      <tr data-status="active" data-role="admin">
        <td class="dtable__select"><label class="check"><input type="checkbox" data-lds-select aria-label="Pilih Sari Handayani"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td>
        <td data-sort="Sari Handayani"><span class="dtable__user"><span class="avatar">SH</span><span><b>Sari Handayani</b><small>sari@contoh.id</small></span></span></td>
        <td>Admin</td>
        <td><span class="badge badge--success">Aktif</span></td>
        <td>Keuangan</td>
        <td data-sort="2021-09-02">2 Sep 2021</td>
      </tr>
      <tr data-status="active" data-role="viewer">
        <td class="dtable__select"><label class="check"><input type="checkbox" data-lds-select aria-label="Pilih Yusuf Hakim"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td>
        <td data-sort="Yusuf Hakim"><span class="dtable__user"><span class="avatar">YH</span><span><b>Yusuf Hakim</b><small>yusuf@contoh.id</small></span></span></td>
        <td>Pembaca</td>
        <td><span class="badge badge--success">Aktif</span></td>
        <td>Layanan</td>
        <td data-sort="2025-01-20">20 Jan 2025</td>
      </tr>
      <tr data-status="invited" data-role="editor">
        <td class="dtable__select"><label class="check"><input type="checkbox" data-lds-select aria-label="Pilih Nadia Putri"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td>
        <td data-sort="Nadia Putri"><span class="dtable__user"><span class="avatar">NP</span><span><b>Nadia Putri</b><small>nadia@contoh.id</small></span></span></td>
        <td>Penyunting</td>
        <td><span class="badge badge--accent">Diundang</span></td>
        <td>Pengaduan</td>
        <td data-sort="2026-11-14">14 Nov 2026</td>
      </tr>
      <tr data-status="active" data-role="viewer">
        <td class="dtable__select"><label class="check"><input type="checkbox" data-lds-select aria-label="Pilih Galih Ramadhan"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td>
        <td data-sort="Galih Ramadhan"><span class="dtable__user"><span class="avatar">GR</span><span><b>Galih Ramadhan</b><small>galih@contoh.id</small></span></span></td>
        <td>Pembaca</td>
        <td><span class="badge badge--success">Aktif</span></td>
        <td>Perizinan</td>
        <td data-sort="2024-12-01">1 Des 2024</td>
      </tr>
      <tr class="dtable__empty" hidden><td colspan="6"><div class="empty"><div class="empty__icon"><span class="ic" aria-hidden="true">filter_list</span></div><div class="empty__title">Tidak ada anggota yang cocok</div><div class="empty__body">Coba nama lain, atau hapus pencarian dan filter.</div><button class="btn btn--secondary btn--md" data-lds-table-reset>Hapus filter</button></div></td></tr>
      </tbody>
    </table>
  </div>
  <div class="dtable__foot">
    <span class="dtable__info" data-lds-table-info aria-live="polite"></span>
    <div class="dtable__pages">
      <div style="position: relative;">
        <button class="btn btn--plain btn--sm" data-lds-menu="dt-size" aria-haspopup="menu" aria-expanded="false"><span data-lds-table-size-label>5</span> per halaman<span class="ic" aria-hidden="true">expand_more</span></button>
        <div class="menu menu--up" id="dt-size" role="menu" aria-label="Baris per halaman" style="bottom: calc(100% + 6px); left: 0; min-width: 160px;">
          <button class="menu__item" role="menuitemradio" data-lds-table-size="5">5 per halaman<span class="ic menu__check" aria-hidden="true">check</span></button>
          <button class="menu__item" role="menuitemradio" data-lds-table-size="10">10 per halaman<span class="ic menu__check" aria-hidden="true">check</span></button>
        </div>
      </div>
      <nav aria-label="Pagination"><div class="pager" data-lds-table-pager></div></nav>
    </div>
  </div>
</div>
<div class="selbar" id="dt-bar" role="toolbar" aria-label="Anggota terpilih"><span class="selbar__count" aria-live="polite"><span class="roll" data-lds-roll="0"></span> dipilih</span><button class="btn btn--md"><span class="ic" aria-hidden="true">mail</span>Kirim email</button><button class="btn btn--md btn--danger"><span class="ic" aria-hidden="true">delete</span>Keluarkan</button><button class="icon-btn" data-lds-select-clear aria-label="Hapus pilihan"><span class="ic" aria-hidden="true">close</span></button></div>
```

## Varian dan ukuran
| Kelas atau atribut | Kapan |
|---|---|
| `.dtable` | Baris biasa 52 px. |
| `.dtable--compact` | Baris 40 px dan avatar lebih kecil, untuk yang memindai banyak baris; diatur oleh toggle kerapatan dan diingat. |

## Status
| Status | Caranya |
|---|---|
| `filtered` | Baris yang tidak cocok disembunyikan; hitungan berbunyi "Menampilkan 1 sampai 10 dari 23 anggota"; tombol filter menunjukkan berapa nilai yang aktif; setiap `[data-lds-table-reset]` di luar baris kosong muncul. |
| `empty` | `tr.dtable__empty` dengan "Tidak ada anggota yang cocok" dan Hapus filter. Header, bilah, dan filter tetap ada. |
| `loading` | `tableState(el, "loading")`: baris data disembunyikan, baris `tr.dtable__state[data-state="loading"]` dengan sel [skeleton](skeleton.md) tampil, `aria-busy="true"`. |
| `error` | `tableState(el, "error")`: baris galat dengan [alert](alert.md) dan Coba lagi. |
| `sorted` | `aria-sort` pada `th`, `.is-sorted` dan `.is-desc` pada tombolnya, seperti di [table](table.md). |
| `selected` | `tr.is-selected` dengan tint aksen, kotak centang header tercentang atau campuran, selection bar terbuka. |

## Gerak dan mikrointeraksi
- Hasil yang muncul setelah pencarian, filter, atau pindah halaman masuk dengan blur berjarak 25 ms (dibatasi sampai baris kesepuluh) dengan `--ease-enter` selama `--d-standard`, resep [list stagger](list-stagger.md). Pengurutan menyusun ulang seketika, sesuai spec tabel.
- Panah urutan berputar dengan `--spring-smooth`; hitungan filter muncul dengan `--spring-snappy`; centang menu membesar dengan `--spring-snappy`.
- Selection bar naik dengan `--spring-smooth` dan hitungannya bergulir; kotak centang header menggambar centang atau garisnya.
- Aksi yang ditolak (menyembunyikan kolom terakhir) menggoyang butirnya.
- Reduced motion: baris muncul memudar 120 ms tanpa blur atau perpindahan.

## Aksesibilitas
- Ini `<table>` asli: header adalah `th`, tombol urut adalah tombol asli, dan hanya `th` yang sedang diurutkan yang punya `aria-sort` selain `none`.
- Pencarian punya `aria-label`; chip adalah tombol toggle dengan `aria-pressed`; filter dan kolom di menu adalah `menuitemcheckbox` dengan `aria-checked`, ukuran halaman `menuitemradio`.
- Pengurutan, perpindahan halaman, dan penghapusan pilihan diumumkan lewat live region bersama; hitungannya `aria-live="polite"`.
- Setelah pindah halaman, fokus tetap di pager (di halaman aktif bila tombol yang Anda tekan hilang) dan tabel digulir ke tampilan.
- Setiap kotak centang baris menyebut barisnya ("Pilih Rina Wijaya"); yang di header berbunyi "Pilih semua anggota di halaman ini". Escape di dalam tabel menghapus pilihan.
- `.table-box` mendapat `tabindex="0"` dan `aria-label` agar pengguna keyboard bisa menggulirnya ke samping.

## Lakukan
- Taruh filter yang paling sering dipakai di chip dan sisanya di menu.
- Beri baris nilai `data-*` dalam huruf kecil untuk filter, dan `data-sort` untuk tanggal.
- Sebut apa yang dihitung dengan `data-noun`.

## Hindari
- Menambahkan tombol Filter yang membuka dialog untuk dua atau tiga filter; chip dan menu lebih cepat.
- Menganimasikan pengurutan ulang atau membiarkan tinggi tabel berubah setiap ketukan tombol; footer tetap di tempatnya.
- Menyembunyikan kolom nama di balik menu kolom.

## Perilaku (HTML biasa)
`data-lds-table` memasang semua yang disebut di atas dan memicu `lds:table` dengan `{ total, page, pages, shown }` setelah setiap perubahan. `data-lds-selection="selbarId"` pada elemen yang sama memasang kotak centang dan bilahnya (`lds:select` dengan `{ count, items }`). Setelah menambah atau menghapus baris, panggil `tableRefresh(el)`; untuk menampilkan baris loading atau galat, panggil `tableState(el, "loading" | "error" | "ready")`.

## Terkait
[Table](table.md) · [Selection bar](selection-bar.md) · [Pagination](pagination.md) · [Chips](chips.md)
