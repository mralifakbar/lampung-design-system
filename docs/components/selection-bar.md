# Selection bar

Kelompok: Lapisan. https://lampung.kartadinata.app/docs/components/selection-bar

Bilah gelap yang mengambang naik dari bawah selama item dalam daftar dipilih, berisi jumlahnya dan aksi untuk semuanya. Bilah pergi saat pilihan kosong.

## Pakai saat
- Aksi massal pada daftar atau tabel yang itemnya dipilih: arsipkan 12 pesan, verifikasi 5 permohonan, ekspor 30 data pemohon.
- Mode pilih di ponsel, tempat toolbar di atas sulit dijangkau.

## Pakai yang lain saat
- Aksi pada satu item: pakai [Dropdown menu](dropdown-menu.md). Pakai menu "lainnya" milik item itu.
- Memastikan aksi massal sudah terjadi: pakai [Toast](toast.md).
- Aksi halaman tetap yang tidak bergantung pada pilihan: pakai [Page header](page-header.md).
- Menyimpan formulir: pakai [Form layout](form-layout.md). Formulir diakhiri dengan aksinya sendiri.

## Letaknya
Menempel di tengah bawah jendela, 20 px dari bawah (lebih di ponsel dengan home indicator), di atas konten dan di bawah dialog. Satu per halaman. Di ponsel dengan tab bar, angkat di atas bar.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.selbar[role=toolbar]` | Wajib. Bilah mengambang: warna terbalik, tinggi 52 px, radius 16 px. Beri `aria-label`. |
| `.selbar__count` | Wajib. "3 dipilih", angka tabular. Taruh di live region agar perubahannya diumumkan. |
| `.btn` | Aksi massal, bergaya ulang untuk bilah terbalik (38 px, isian tenang). `btn--danger` untuk aksi destruktif. |
| `.icon-btn` | Hapus pilihan, paling akhir, dengan `aria-label`. |
| `.selbar__label` | Opsional. Bungkus kata-kata tombol dengannya (dan beri tombol `aria-label`) agar di bawah 520 px bilah hanya menyisakan ikon dan muat di ponsel. |
| `.roll` | Opsional, di dalam hitungan: angkanya bergulir saat pilihan berubah (diatur oleh hook selection). |

## Markup

**Verifikasi massal.** Pilih satu atau dua permohonan: bilah naik dari bawah kotak ini. Hapus pilihan dan bilah pergi. Di halaman, bilah menempel di bawah jendela.
```html
<div class="selbar" role="toolbar" aria-label="Permohonan terpilih">
  <span class="selbar__count" aria-live="polite">3 dipilih</span>
  <button class="btn btn--md"><span class="ic" aria-hidden="true">edit</span>Verifikasi</button>
  <button class="btn btn--md"><span class="ic" aria-hidden="true">download</span>Ekspor</button>
  <button class="icon-btn" aria-label="Hapus pilihan"><span class="ic" aria-hidden="true">close</span></button>
</div>
<!-- add .is-open while one or more items are selected -->
```

**Dengan aksi destruktif.** Ditampilkan terbuka. Tombol danger adalah satu-satunya tempat `btn--danger` muncul di luar konfirmasi, karena ia membuka [alert dialog](alert-dialog.md) atau menghapus dengan toast Urungkan.
```html
<div class="selbar is-open" role="toolbar" aria-label="Pesan terpilih">
  <span class="selbar__count">12 dipilih</span>
  <button class="btn btn--md"><span class="ic" aria-hidden="true">inventory_2</span>Arsipkan</button>
  <button class="btn btn--md btn--danger"><span class="ic" aria-hidden="true">delete</span>Hapus</button>
  <button class="icon-btn" aria-label="Hapus pilihan"><span class="ic" aria-hidden="true">close</span></button>
</div>
```

## Status
| Status | Caranya |
|---|---|
| `.is-open` | Terlihat dan bisa dipakai selama minimal satu item dipilih. |
| `closed` | Transparan, 16 px lebih rendah dan 2 % lebih kecil, `visibility: hidden` setelah animasi keluar. |

## Gerak dan mikrointeraksi
- Masuk: opacity selama `--d-fast` (160 ms) dengan `--ease-enter`; naik dari `translateY(16px) scale(0.98)` dengan `--spring-smooth` selama `--d-smooth`.
- Keluar: selama `--d-exit` (180 ms) dengan `--ease-exit`, lalu disembunyikan. Memilih lagi di tengah animasi keluar membaliknya, karena berupa transisi.
- Hitungan berubah di tempat; padukan dengan [rolling number](rolling-number.md) untuk jumlah besar jika perlu. Reduced motion: tanpa naik, memudar 120 ms.

## Aksesibilitas
- `role="toolbar"` dengan `aria-label` yang menyebut apa yang dipilih.
- Hitungan berada di region `aria-live="polite"` sehingga "3 dipilih" diumumkan saat berubah.
- Buat `inert` (atau hapus) selama tertutup agar tombol tersembunyi tidak bisa dicapai dengan Tab. Menghapus pilihan sebaiknya mengembalikan fokus ke daftar.
- Setiap checkbox item punya label sendiri ("Pilih Rina Wijaya").

## Lakukan
- Batasi dua atau tiga aksi ditambah hapus pilihan.
- Pastikan hasilnya dengan [toast](toast.md) dan Urungkan bila memungkinkan.

## Hindari
- Menampilkan bilah saat tidak ada yang dipilih.
- Menaruh aksi satu item atau navigasi di dalamnya.
- Menumpuknya dengan bilah mengambang kedua.

## Perilaku (HTML biasa)
`data-lds-selection="barId"` pada list, tabel, atau kisi yang berisi checkbox `input[data-lds-select]` (dan `input[data-lds-select-all]` opsional) membuka dan menutup bilah, menggulirkan `.roll` di dalam `.selbar__count`, menjaga bilah tetap `inert` selama tertutup, mencentang rentang dengan Shift-klik, dan menghapus pilihan dengan Escape atau `[data-lds-select-clear]`; lihat [data table](data-table.md) dan [file tile](file-tile.md). Tanpa hook, ubah `.is-open` dari status pilihan Anda dan perbarui hitungannya. Bilah memakai `position: fixed`, jadi di dalam kontainer yang diberi transform ia menempel ke kontainer itu (seperti di demo ini).

## Terkait
[Checkbox](checkbox.md) · [List](list.md) · [Table](table.md) · [Toast](toast.md)
