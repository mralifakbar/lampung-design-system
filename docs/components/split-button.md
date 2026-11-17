# Split button

Kelompok: Aksi. https://lampung.kartadinata.app/docs/components/split-button

Tombol utama yang menyatu dengan chevron pembuka menu berisi varian dari aksi yang sama (Terbitkan, atau jadwalkan, atau terbitkan hanya untuk anggota). Bagian kiri menjalankan hal yang umum dalam satu tekan.

## Pakai saat
- Satu aksi dipakai hampir setiap saat dan punya dua sampai lima varian yang lebih jarang: Terbitkan / Jadwalkan nanti / Simpan sebagai draf; Ekspor PDF / Ekspor CSV.
- Ruang terbatas dan setiap varian tidak perlu tombolnya sendiri.

## Pakai yang lain saat
- Menu berisi aksi tak berhubungan pada sebuah objek (ganti nama, pindahkan, hapus): pakai [Dropdown menu](dropdown-menu.md). Pakai icon button dengan `more_horiz` sebagai pemicu.
- Hanya ada satu aksi: pakai [Button](button.md).
- Memilih opsi yang lalu ditampilkan tombol (nilai terpilih): pakai [Select](select.md).
- Aksi terpisah dengan bobot setara: pakai [Button group](button-group.md).

## Letaknya
Di tempat tombol utama berada: akhir header halaman, toolbar editor, footer formulir. Menu terbuka ke bawah dan rata dengan tepi kanan chevron (`menu--right`). Di ponsel lebih baik pakai tombol utama selebar layar ditambah varian di [sheet](sheet.md).

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.split` | Wajib. Pembungkus; `position: relative` agar menu menempel padanya. Mendapat `.is-open` selama menu terbuka (disetel oleh `init()`). |
| `.btn.btn--primary (first)` | Wajib. Aksi umum, berlabel hasilnya. |
| `.btn.btn--primary (second)` | Wajib. Chevron: `aria-haspopup="menu"`, `aria-expanded`, `aria-label` ("Opsi terbit lainnya"), `data-lds-menu="menu-id"`, dan ikon `expand_more`. |
| `.menu.menu--right` | Wajib. Menu dengan `role="menu"` dan tombol `.menu__item` (`role="menuitem"`). Posisikan di bawah pembungkus dengan `top: calc(100% + 6px); right: 0`. |

## Markup

**Terbitkan dengan varian.** Tekan chevron atau fokuskan lalu tekan panah bawah. Chevron berputar selama menu terbuka.
```html
<div class="split">
  <button class="btn btn--primary btn--md">Terbitkan</button>
  <button class="btn btn--primary btn--md" aria-haspopup="menu" aria-expanded="false" aria-label="Opsi terbit lainnya" data-lds-menu="split-publish"><span class="ic" aria-hidden="true">expand_more</span></button>
  <div class="menu menu--right" id="split-publish" role="menu" style="top: calc(100% + 6px); right: 0;">
    <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">schedule_send</span>Jadwalkan nanti</button>
    <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">group</span>Terbitkan hanya untuk anggota</button>
    <div class="menu__sep" role="separator"></div>
    <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">draft</span>Simpan sebagai draf</button>
  </div>
</div>
```

**Ukuran bawaan.** Pola yang sama pada 44 px, di samping tombol secondary-nya. Hanya varian primary (dan danger) yang dirancang untuk split; tepi chevron memakai nadanya.
```html
<div class="docs-row">
  <button class="btn btn--secondary">Batal</button>
  <div class="split">
    <button class="btn btn--primary">Ekspor PDF</button>
    <button class="btn btn--primary" aria-haspopup="menu" aria-expanded="false" aria-label="Format ekspor lain" data-lds-menu="split-export"><span class="ic" aria-hidden="true">expand_more</span></button>
    <div class="menu menu--right" id="split-export" role="menu" style="top: calc(100% + 6px); right: 0;">
      <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">description</span>Ekspor CSV</button>
      <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">receipt_long</span>Cetak bukti pembayaran</button>
    </div>
  </div>
</div>
```

## Status
| Status | Caranya |
|---|---|
| `open` | `.split.is-open` dan `aria-expanded="true"` pada chevron; `.menu.is-open`. Semua disetel oleh `init()`. |
| `loading` | Pasang `.is-loading` hanya pada tombol kiri (dengan `btn__label` dan `btn__spin`); biarkan chevron tetap bisa dipakai atau nonaktifkan. |
| `disabled` | `disabled` pada kedua tombol sekaligus. |

## Gerak dan mikrointeraksi
- Chevron berputar 180 derajat dengan `--spring-smooth` selama `--d-smooth` saat terbuka.
- Menu tumbuh dari sudut kanan atasnya: opacity selama `--d-fast` dengan `--ease-enter`, `scale(0.96) translateY(-4px)` ke posisi diam dengan `--spring-smooth`. Ia pergi dalam `--d-exit` dengan `--ease-exit`.
- Kedua bagian tidak mengecil saat ditekan (`transform: none`) agar sambungannya tetap sejajar; tekanan tampil sebagai isian tertekan.
- Dengan reduced motion menu berhenti berubah skala dan memudar dalam 120 ms.

## Aksesibilitas
- Dua tombol sungguhan. Chevron punya `aria-haspopup="menu"`, `aria-expanded`, dan `aria-label` yang menyebut apa yang dibukanya.
- Keyboard: Enter atau Spasi pada chevron membuka dan menutup menu, panah bawah membukanya dan memfokuskan item pertama; panah atas dan bawah berpindah; Escape menutup dan mengembalikan fokus ke chevron. Klik di luar menutupnya.
- Item menu adalah tombol `role="menuitem"`; pemisah adalah `role="separator"`.

## Lakukan
- Beri label bagian kiri dengan hasil yang paling umum.
- Batasi menu pada dua sampai lima varian dari aksi yang sama.
- Beri chevron `aria-label` yang menyebut isinya.

## Hindari
- Memakai varian secondary, tinted, atau gray; sambungan split hanya dirancang untuk nada berisi.
- Menaruh aksi merusak atau tak berhubungan di menu.
- Membuat bagian kiri ikut membuka menu.

## Perilaku (HTML biasa)
`data-lds-menu="menu-id"` pada chevron. `init()` membuka dan menutup menu, menyetel `aria-expanded`, menyalakan `.is-open` pada `.split`, dan menangani tombol panah serta Escape. `closeMenus()` menutup menu apa pun yang terbuka.

## Terkait
[Button](button.md) · [Dropdown menu](dropdown-menu.md) · [Button group](button-group.md) · [Sheet](sheet.md)
