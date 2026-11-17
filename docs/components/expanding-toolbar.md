# Expanding toolbar

Kelompok: Mikrointeraksi. https://lampung.kartadinata.app/docs/components/expanding-toolbar

Deretan ringkas alat berikon; alat yang sedang di-hover atau difokus membuka labelnya dan satu sorotan meluncur ke sana. Alat bawaan menampilkan labelnya saat diam, jadi bilah ini tidak pernah berupa deretan ikon tanpa penjelasan.

## Pakai saat
- Sekumpulan kecil aksi untuk satu objek yang harus tetap ringkas: catatan, gambar yang dipilih, dokumen di penampil.
- Ikon saja bisa membingungkan, tetapi label di setiap alat tidak muat.

## Pakai yang lain saat
- Toggle format yang tetap aktif (tebal, miring): pakai [Toggle](toggle.md). Grup toggle menampilkan status tertekan; expanding toolbar tidak.
- Aksi untuk beberapa item terpilih: pakai [Selection bar](selection-bar.md).
- Lebih dari enam aksi: pakai [Dropdown menu](dropdown-menu.md).
- Navigasi aplikasi: pakai [Top nav](top-nav.md).
- Bilah judul halaman dengan menu: pakai [Menubar](menubar.md).

## Letaknya
Melayang di atas atau menempel pada objek yang dikenainya (kanan atas catatan, di bawah gambar terpilih), atau di toolbar halaman yang ringkas. Paling banyak enam alat, dipisah menjadi grup dengan `.xbar__sep`.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.xbar` | Wajib. `role="toolbar"`, `aria-label`, `data-lds-toolbar`. Padding 4 px, radius 14 px, bayangan kecil. |
| `.xbar__hl` | Wajib. Sorotan yang meluncur, anak pertama, `aria-hidden`. |
| `.xbar__btn` | Wajib. Ikon ditambah `.xbar__label > span`. `.is-open` pada alat bawaan. |
| `.xbar__sep` | Opsional. Garis tipis di antara grup. |

## Markup

**Aksi catatan.** Arahkan kursor atau tekan Tab melewati alat-alatnya: setiap label terbuka saat sorotan meluncur langsung ke posisi akhir tombol. Tinggalkan bilah dan Ubah terbuka lagi.
```html
<div class="xbar" data-lds-toolbar role="toolbar" aria-label="Aksi catatan">
  <span class="xbar__hl" aria-hidden="true"></span>
  <button class="xbar__btn is-open" aria-label="Ubah"><span class="ic" aria-hidden="true">edit</span><span class="xbar__label"><span>Ubah</span></span></button><button class="xbar__btn" aria-label="Duplikat"><span class="ic" aria-hidden="true">content_copy</span><span class="xbar__label"><span>Duplikat</span></span></button><button class="xbar__btn" aria-label="Bagikan"><span class="ic" aria-hidden="true">share</span><span class="xbar__label"><span>Bagikan</span></span></button><button class="xbar__btn" aria-label="Hapus"><span class="ic" aria-hidden="true">delete</span><span class="xbar__label"><span>Hapus</span></span></button>
</div>
```

**Alat berkelompok untuk gambar.** Pemisah membagi alat penataan dari alat berbagi. Sorotan melewati pemisah.
```html
<div class="xbar" data-lds-toolbar role="toolbar" aria-label="Alat gambar">
  <span class="xbar__hl" aria-hidden="true"></span>
  <button class="xbar__btn is-open" aria-label="Rata kiri"><span class="ic" aria-hidden="true">format_align_left</span><span class="xbar__label"><span>Rata kiri</span></span></button><button class="xbar__btn" aria-label="Tengah"><span class="ic" aria-hidden="true">format_align_center</span><span class="xbar__label"><span>Tengah</span></span></button><button class="xbar__btn" aria-label="Rata kanan"><span class="ic" aria-hidden="true">format_align_right</span><span class="xbar__label"><span>Rata kanan</span></span></button>
  <span class="xbar__sep" aria-hidden="true"></span>
  <button class="xbar__btn" aria-label="Unduh"><span class="ic" aria-hidden="true">download</span><span class="xbar__label"><span>Unduh</span></span></button><button class="xbar__btn" aria-label="Bagikan"><span class="ic" aria-hidden="true">share</span><span class="xbar__label"><span>Bagikan</span></span></button>
</div>
```

## Status
| Status | Caranya |
|---|---|
| `rest` | Alat bawaan (`is-open`) menampilkan labelnya; sorotan tersembunyi. |
| `hover / focus` | Alat itu terbuka; sorotan tampil (`.xbar.is-hover`) dan meluncur ke sana. |
| `leave` | Pointer atau fokus meninggalkan bilah: alat bawaan terbuka lagi dan sorotan memudar. |
| `pressed` | Alat mengecil ke 0,94 dalam 90 ms. |

## Gerak dan mikrointeraksi
- Label terbuka dengan `grid-template-columns: 0fr` ke `1fr` memakai `--spring-smooth` (`--d-smooth`, 560 ms); teks muncul perlahan selama `--d-fast` 60 ms kemudian, dan langsung hilang saat menutup.
- Sorotan: `transform` dan `width` dengan `--spring-smooth`. JS menghitung posisi tombol tujuan setelah semua label selesai membuka dan menutup, jadi sorotan bergerak lurus sekali jalan, tidak mengejar target yang bergeser.
- Interupsi: bergerak cepat melintasi alat mengarahkan ulang spring dari nilai saat ini; bilah tidak pernah bergetar.
- Reduced motion: label dan sorotan berubah dalam 120 ms linear.

## Aksesibilitas
- `role="toolbar"` dengan `aria-label`. Setiap tombol punya `aria-label` (teks labelnya terpotong saat tertutup).
- Tab dan Shift+Tab berpindah antaralat dan membuka labelnya saat fokus, jadi pengguna keyboard melihat label yang sama dengan pengguna mouse.
- Perangkat sentuh tidak punya hover: label bawaan tampil, yang lain terbuka saat fokus setelah diketuk. Pastikan ikonnya jelas tanpa label.

## Lakukan
- Tandai alat yang paling mungkin dipakai dengan `is-open`.
- Pakai label satu atau dua kata.
- Kelompokkan alat yang berkaitan dengan pemisah.

## Hindari
- Memakainya untuk toggle yang butuh status tertekan.
- Menaruh lebih dari enam alat dalam satu bilah.
- Menganimasikan label sendiri; biarkan `data-lds-toolbar` yang mengukur.

## Perilaku (HTML biasa)
`[data-lds-toolbar]` saat `init()`: membuka `.xbar__btn` yang di-hover atau difokus, memindahkan `.xbar__hl` ke kotak akhirnya, dan mengembalikan alat bawaan (`is-open` saat dimuat, atau yang pertama) saat ditinggalkan.

## Terkait
[Toggle](toggle.md) · [Icon button](icon-button.md) · [Sliding indicator](sliding-indicator.md) · [Selection bar](selection-bar.md)
