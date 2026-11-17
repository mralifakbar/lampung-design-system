# Popover

Kelompok: Lapisan. https://lampung.kartadinata.app/docs/components/popover

Kartu mengambang kecil yang tertambat pada tombol, untuk konten yang lebih kaya dari menu: formulir mini, penjelasan singkat dengan tautan, pengaturan cepat. Tidak menghalangi halaman.

## Pakai saat
- Beberapa field atau kontrol yang terkait satu tombol: pasang pengingat, atur lebar kolom, ubah cepat tanggal tenggat.
- Penjelasan singkat yang sengaja dibuka, dengan format atau tautan di dalamnya.

## Pakai yang lain saat
- Daftar perintah: pakai [Dropdown menu](dropdown-menu.md).
- Label untuk ikon atau petunjuk satu baris saat hover: pakai [Tooltip](tooltip.md).
- Pratinjau seseorang atau tautan saat hover: pakai [Hover card](hover-card.md).
- Tugas yang butuh fokus dan keputusan sebelum lanjut: pakai [Dialog](dialog.md).
- Memilih tanggal: pakai [Date field](date-field.md). Date field sudah memasangkan kontrol dengan popover kalendernya.

## Letaknya
8 px di bawah pemicunya, rata dengan tepi kirinya, lebar 300 px. Pemicu dan popover berbagi pembungkus `position: relative`; posisikan popover dengan `top`/`left` inline. Di ponsel, pakai [sheet](sheet.md) untuk apa pun yang berisi field.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `trigger` | Wajib. Tombol dengan `aria-haspopup="dialog"`, `aria-expanded`, dan `aria-controls` berisi id popover. |
| `.popover` | Wajib. Kartu mengambang: 300 px, padding 16 px, terangkat dengan bayangan; `role="dialog"` dan `aria-label` (atau `aria-labelledby`). |
| `.popover.is-open` | Wajib untuk menampilkannya. |

## Markup

**Pasang pengingat.** Popover dibuka dan ditutup dari tombolnya, tumbuh dari atas, dan tertutup dengan Escape atau klik di luar.
```html
<div style="position: relative;">
  <button class="btn btn--secondary" aria-haspopup="dialog" aria-expanded="false" aria-controls="remind" data-lds-menu="remind">Ingatkan saya</button>
  <div class="popover" id="remind" role="dialog" aria-labelledby="remind-t" style="top: calc(100% + 8px); left: 0;">
    <h3 class="section__title-sm" id="remind-t">Ingatkan saya tentang pajak kendaraan</h3>
    …
  </div>
</div>
```

**Statis, terbuka.** Popover yang menjelaskan cara penilaian, dalam keadaan terbuka.
```html
<div style="position: relative; align-self: flex-start;">
  <button class="btn btn--plain btn--sm" aria-haspopup="dialog" aria-expanded="true" aria-controls="po-score">Bagaimana cara penilaiannya?</button>
  <div class="popover is-open" id="po-score" role="dialog" aria-label="Cara penilaian" style="top: calc(100% + 8px); left: 0;">
    <p class="section__sub">Setiap dokumen yang lengkap bernilai 5 poin, yang kurang 0. Dokumen opsional yang tidak dilampirkan tidak mengurangi nilai.</p>
  </div>
</div>
```

## Status
| Status | Caranya |
|---|---|
| `.is-open` | Terlihat dan bisa dipakai; pemicu memiliki `aria-expanded="true"`. |
| `closed` | Transparan, sedikit diperkecil, `visibility: hidden` setelah animasi keluar. |

## Gerak dan mikrointeraksi
- Masuk: opacity selama `--d-fast` (160 ms) dengan `--ease-enter`; dari `scale(0.96) translateY(-4px)` dengan `--spring-smooth`, tumbuh dari tengah atas.
- Keluar: selama `--d-exit` (180 ms) dengan `--ease-exit`, lalu disembunyikan. Berupa transisi, sehingga buka-tutup cepat berbalik dengan mulus.
- Reduced motion: hanya memudar.

## Aksesibilitas
- Non-modal: fokus tidak dikunci, halaman tetap bisa dipakai. Beri `role="dialog"` dan nama.
- Memindahkan fokus ke dalamnya saat dibuka dan kembali ke pemicu saat ditutup adalah tugas Anda, kecuali Anda memakai ulang hook menu (yang memfokuskan tombol pertamanya, menutup dengan Escape, dan mengembalikan fokus).
- Escape dan klik di luar menutupnya.

## Lakukan
- Batasi pada satu tugas kecil atau satu penjelasan.
- Tutup setelah aksi utama dijalankan.

## Hindari
- Menaruh formulir panjang atau tabel di popover.
- Membukanya saat hover; itu tugas [hover card](hover-card.md).
- Memakai popover padahal [dropdown menu](dropdown-menu.md) berisi perintah sudah cukup.

## Perilaku (HTML biasa)
Tidak ada hook khusus: ubah `.is-open` dan `aria-expanded` sendiri, atau pakai ulang hook menu (`data-lds-menu="popoverId"` pada pemicu), yang membuka dan menutupnya, memfokuskan tombol pertamanya, menutup dengan Escape (fokus kembali ke pemicu) dan dengan klik di luar; panggil `closeMenus()` setelah aksi di dalam popover. Hindari kontrol yang memakai panah Atas dan Bawah di dalamnya: tombol itu ditangani sebagai tombol menu.

## Terkait
[Dropdown menu](dropdown-menu.md) · [Tooltip](tooltip.md) · [Hover card](hover-card.md) · [Date field](date-field.md)
