# File tile

Kelompok: Tampilan data. https://lampung.kartadinata.app/docs/components/file-tile

Berkas dan folder sebagai tile dalam grid: thumbnail bertint menurut jenis (atau gambarnya sendiri), nama dua baris, ukuran dan tanggal, kotak centang yang muncul saat hover, fokus, atau selama memilih, dan menu lainnya. Tile membuka berkas; mencentangnya memilih berkas untuk aksi massal.

## Pakai saat
- Pengelola berkas atau pustaka tempat orang mengenali berkas dari jenis atau gambarnya: materi pelatihan, drive bersama, bukti pembayaran yang diunggah.
- Memilih beberapa berkas untuk satu aksi: unduh 4 berkas, pindahkan 12 foto, hapus 2 draf.

## Pakai yang lain saat
- Berkas yang dilampirkan ke formulir selama diunggah: pakai [File input](file-input.md). Pakai baris berkas dari file input.
- Berkas yang dibandingkan menurut ukuran, pemilik, dan tanggal: pakai [Table](table.md). Tabel lebih mudah dipindai daripada tile saat orang mengurutkan.
- Hierarki folder yang dijelajahi: pakai [Tree](tree.md).
- Foto di dalam artikel atau pesan: pakai [Thumbnail](thumbnail.md).

## Letaknya
Di dalam `.file-grid`, yang memuat tile selebar minimal `--min` (168 px) sebanyak yang muat di kolom: enam sampai delapan di layar lebar, dua di ponsel. Folder dulu dengan `.file-tile--folder` (thumbnail lebih pendek), lalu berkas. Pasangkan dengan [selection bar](selection-bar.md) untuk aksi massal.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.file-grid` | Wajib. Grid-nya (`role="list"`). Pasang `data-lds-selection="selbarId"` untuk memasang pemilihan; grid mendapat `.is-selecting` selama ada yang dicentang, sehingga semua kotak centang tetap terlihat. |
| `.file-tile` | Wajib. Satu berkas (`role="listitem"`). Modifier jenis mengatur tone: `--folder`, `--doc`, `--sheet`, `--image`, `--video`, `--audio`, `--archive`. |
| `.file-tile__open` | Wajib. `<a>` (atau tombol) yang membuka berkas: thumbnail, nama, dan meta. |
| `.file-tile__thumb` | Wajib. Area bertint 104 px dengan ikon jenis (gaya fill), atau `<img>` yang menutupinya. |
| `.file-tile__name` | Wajib. Nama berkas, paling banyak dua baris, dipenggal di mana saja agar nama panjang tidak pernah meluap. |
| `.file-tile__meta` | Ukuran dan tanggal, satu baris, angka tabular. |
| `.check.file-tile__check` | Kotak centang di kiri atas (`input[data-lds-select]` dengan `aria-label`). |
| `.icon-btn.file-tile__more` | Menu lainnya di kanan atas, dengan `.menu`-nya. |

## Markup

**Folder bersama.** Arahkan kursor ke tile untuk melihat kotak centang dan menunya. Centang satu: semua kotak centang tetap terlihat dan selection bar naik dengan hitungan yang bergulir. Shift-klik mencentang satu rentang; Escape menghapus pilihan.
```html
<div class="file-grid" role="list" aria-label="Perencanaan triwulan 4" data-lds-selection="files-bar">
  <div class="file-tile file-tile--sheet" role="listitem">
    <label class="check file-tile__check"><input type="checkbox" data-lds-select aria-label="Pilih Anggaran TW4 2026.xlsx"><span class="check__box" aria-hidden="true">…</span></label>
    <a class="file-tile__open" href="/files/budget-q4"><span class="file-tile__thumb"><span class="ic" aria-hidden="true">description</span></span><span class="file-tile__name">Anggaran TW4 2026.xlsx</span><span class="file-tile__meta">214 KB · Diubah 2 jam lalu</span></a>
    <button class="icon-btn file-tile__more" aria-label="Aksi lain untuk Anggaran TW4 2026.xlsx" aria-haspopup="menu" aria-expanded="false" data-lds-menu="m-budget"><span class="ic" aria-hidden="true">more_horiz</span></button>
    <div class="menu menu--right" id="m-budget" role="menu" style="top: 44px; right: 4px;">…</div>
  </div>
</div>
<div class="selbar" id="files-bar" role="toolbar" aria-label="Berkas terpilih">
  <span class="selbar__count" aria-live="polite"><span class="roll" data-lds-roll="0"></span> dipilih</span>
  <button class="btn btn--md"><span class="ic" aria-hidden="true">download</span>Unduh</button>
  <button class="icon-btn" data-lds-select-clear aria-label="Hapus pilihan"><span class="ic" aria-hidden="true">close</span></button>
</div>
```

**Grid ringkas.** `file-grid--compact` untuk panel samping atau pemilih: tile 140 px dengan thumbnail lebih pendek.
```html
<div class="file-grid file-grid--compact" role="list" aria-label="Terbaru" style="max-width: 640px;">
  <div class="file-tile file-tile--doc" role="listitem">
    <label class="check file-tile__check"><input type="checkbox" data-lds-select aria-label="Pilih Notulen 12 Nov.docx"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label>
    <a class="file-tile__open" href="#ft-11"><span class="file-tile__thumb"><span class="ic" aria-hidden="true">description</span></span><span class="file-tile__name">Notulen 12 Nov.docx</span><span class="file-tile__meta">48 KB</span></a>
    <button class="icon-btn file-tile__more" aria-label="Aksi lain untuk Notulen 12 Nov.docx" aria-haspopup="menu" aria-expanded="false" data-lds-menu="ft-m-11"><span class="ic" aria-hidden="true">more_horiz</span></button>
    <div class="menu menu--right" id="ft-m-11" role="menu" aria-label="Notulen 12 Nov.docx" style="top: 44px; right: 4px;">
      <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">download</span>Unduh</button>
      <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">edit</span>Ganti nama</button>
      <div class="menu__sep"></div>
      <button class="menu__item menu__item--danger" role="menuitem"><span class="ic" aria-hidden="true">delete</span>Hapus</button>
    </div>
  </div>
  <div class="file-tile file-tile--audio" role="listitem">
    <label class="check file-tile__check"><input type="checkbox" data-lds-select aria-label="Pilih Wawancara dengan Dewi.m4a"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label>
    <a class="file-tile__open" href="#ft-12"><span class="file-tile__thumb"><span class="ic" aria-hidden="true">audio_file</span></span><span class="file-tile__name">Wawancara dengan Dewi.m4a</span><span class="file-tile__meta">18 MB</span></a>
    <button class="icon-btn file-tile__more" aria-label="Aksi lain untuk Wawancara dengan Dewi.m4a" aria-haspopup="menu" aria-expanded="false" data-lds-menu="ft-m-12"><span class="ic" aria-hidden="true">more_horiz</span></button>
    <div class="menu menu--right" id="ft-m-12" role="menu" aria-label="Wawancara dengan Dewi.m4a" style="top: 44px; right: 4px;">
      <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">download</span>Unduh</button>
      <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">edit</span>Ganti nama</button>
      <div class="menu__sep"></div>
      <button class="menu__item menu__item--danger" role="menuitem"><span class="ic" aria-hidden="true">delete</span>Hapus</button>
    </div>
  </div>
  <div class="file-tile file-tile--image" role="listitem">
    <label class="check file-tile__check"><input type="checkbox" data-lds-select aria-label="Pilih Kuitansi 0412.jpg"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label>
    <a class="file-tile__open" href="#ft-13"><span class="file-tile__thumb"><span class="ic" aria-hidden="true">image</span></span><span class="file-tile__name">Kuitansi 0412.jpg</span><span class="file-tile__meta">820 KB</span></a>
    <button class="icon-btn file-tile__more" aria-label="Aksi lain untuk Kuitansi 0412.jpg" aria-haspopup="menu" aria-expanded="false" data-lds-menu="ft-m-13"><span class="ic" aria-hidden="true">more_horiz</span></button>
    <div class="menu menu--right" id="ft-m-13" role="menu" aria-label="Kuitansi 0412.jpg" style="top: 44px; right: 4px;">
      <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">download</span>Unduh</button>
      <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">edit</span>Ganti nama</button>
      <div class="menu__sep"></div>
      <button class="menu__item menu__item--danger" role="menuitem"><span class="ic" aria-hidden="true">delete</span>Hapus</button>
    </div>
  </div>
  <div class="file-tile file-tile--sheet" role="listitem">
    <label class="check file-tile__check"><input type="checkbox" data-lds-select aria-label="Pilih Honor petugas November.xlsx"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label>
    <a class="file-tile__open" href="#ft-14"><span class="file-tile__thumb"><span class="ic" aria-hidden="true">description</span></span><span class="file-tile__name">Honor petugas November.xlsx</span><span class="file-tile__meta">96 KB</span></a>
    <button class="icon-btn file-tile__more" aria-label="Aksi lain untuk Honor petugas November.xlsx" aria-haspopup="menu" aria-expanded="false" data-lds-menu="ft-m-14"><span class="ic" aria-hidden="true">more_horiz</span></button>
    <div class="menu menu--right" id="ft-m-14" role="menu" aria-label="Honor petugas November.xlsx" style="top: 44px; right: 4px;">
      <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">download</span>Unduh</button>
      <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">edit</span>Ganti nama</button>
      <div class="menu__sep"></div>
      <button class="menu__item menu__item--danger" role="menuitem"><span class="ic" aria-hidden="true">delete</span>Hapus</button>
    </div>
  </div>
</div>
```

## Varian dan ukuran
| Kelas atau atribut | Kapan |
|---|---|
| `.file-tile--folder` | Folder: tone aksen, thumbnail 64 px. |
| `.file-tile--doc | --sheet | --image | --video | --audio | --archive` | Jenis berkas, masing-masing dengan tone sendiri dari palet `--tile-*` dan seri. |
| `.file-grid--compact` | Minimal 140 px, thumbnail 72 px. |

## Status
| Status | Caranya |
|---|---|
| `hover, focus-within` | Ring berubah menjadi `--line-strong`; kotak centang dan tombol lainnya muncul memudar. |
| `selected` | Kotak centang tercentang: tint aksen dan ring aksen 1,5 px pada tile. |
| `.file-grid.is-selecting` | Dipasang oleh hook pemilihan selama ada yang dicentang: semua kotak centang tampil. |
| `touch screens` | Kotak centang dan tombol lainnya selalu tampil (tidak ada hover untuk memunculkannya). |
| `loading` | Tile [skeleton](skeleton.md): blok 104 px dan dua bilah teks per tile. |
| `empty` | [Empty state](empty-state.md) menggantikan grid, dengan aksi unggah. |

## Gerak dan mikrointeraksi
- Menekan tile mengecilkannya ke 0,985 dalam 90 ms lalu memantul kembali dengan `--spring-snappy`.
- Kotak centang dan tombol lainnya muncul memudar selama `--d-fast` dan mengendap dari 0,9 dengan `--spring-snappy`; centang tergambar seperti di [checkbox](checkbox.md).
- Selection bar naik dengan `--spring-smooth` dan hitungannya bergulir ([rolling number](rolling-number.md)).

## Aksesibilitas
- Grid adalah `role="list"` dengan `aria-label`; setiap tile adalah `listitem`.
- Tautan buka dan kotak centang adalah kontrol terpisah: kotak centang punya `aria-label` sendiri ("Pilih Anggaran TW4 2026.xlsx"), tombol lainnya juga menyebut nama berkas.
- Kotak centang tetap ada di urutan tab meski tidak terlihat, dan tampil saat difokus.
- Jenis berkas ada di nama (ekstensi) dan ikon, tidak pernah hanya lewat warna.

## Lakukan
- Urutkan folder sebelum berkas, dan pertahankan ekstensi di nama.
- Pakai gambar asli sebagai thumbnail untuk berkas gambar bila ada.

## Hindari
- Memotong nama menjadi satu baris; dua baris yang bisa dipenggal di mana saja menjaga nama tetap terbaca.
- Menjadikan seluruh tile kotak centang; membuka berkas adalah aksi utama.

## Perilaku (HTML biasa)
`data-lds-selection="selbarId"` pada `.file-grid` memasang kotak centang `input[data-lds-select]`: `.is-selected` pada setiap tile, `.is-selecting` pada grid, selection bar terbuka dengan hitungan yang bergulir, Shift-klik mencentang satu rentang, Escape dan `[data-lds-select-clear]` menghapus pilihan. Memicu `lds:select` dengan `{ count, items }`. Panggil `selectionRefresh(grid)` setelah menambah atau menghapus tile. Tombol lainnya memakai hook menu (`data-lds-menu`).

## Terkait
[Selection bar](selection-bar.md) · [Thumbnail](thumbnail.md) · [File input](file-input.md) · [Table](table.md)
