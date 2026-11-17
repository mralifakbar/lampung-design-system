# Keyboard key

Kelompok: Aksi. https://lampung.kartadinata.app/docs/components/kbd

Tutup tombol kecil yang menampilkan pintasan keyboard: `.kbd` untuk satu tombol, `.kbd-row` untuk kombinasi. Pintasan adalah petunjuk di samping aksi, tidak pernah satu-satunya cara mencapainya.

## Pakai saat
- Menampilkan pintasan sebuah aksi di [tooltip](tooltip.md), item [dropdown menu](dropdown-menu.md), atau footer [command palette](command-palette.md).
- Teks bantuan atau orientasi yang mengajarkan pintasan ("Tekan ⌘ K untuk mencari").
- Keterangan di bawah daftar yang dikendalikan dengan tombol (↑ ↓ untuk berpindah, ↵ untuk membuka).

## Pakai yang lain saat
- Menampilkan kode, nama berkas, atau nilai di dalam teks: pakai [Inline code](inline-code.md).
- Jumlah di samping label: pakai [Count](count.md).
- Kata status (Draf, Jatuh tempo besok): pakai [Badge](badge.md).
- Tombol sungguhan yang ditekan orang di layar: pakai [Button](button.md).

## Letaknya
Setelah label yang menjadi miliknya: di akhir item menu (`.menu__item .kbd-row` rata kanan dengan sendirinya), di dalam tooltip setelah teks, sebaris di dalam kalimat. Sembunyikan petunjuk pintasan di perangkat sentuh saja; di sana tidak ada artinya.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.kbd` | Wajib. Satu tombol: tinggi 22 px, lebar minimal 22 px, teks medium 12 px di atas `--bg-base` dengan tepi bawah 1.5 px. Pakai elemen `<kbd>`. |
| `.kbd-row` | Membungkus beberapa `.kbd` untuk kombinasi, berjarak 4 px. |

## Markup

**Tombol dan kombinasi.** Pakai simbol yang terlihat di keyboard orang; tulis lengkap tombol yang tidak punya simbol umum (esc, tab).
```html
<div class="docs-row" style="gap: 28px;">
  <span class="kbd-row"><kbd class="kbd">⌘</kbd><kbd class="kbd">K</kbd></span>
  <span class="kbd-row"><kbd class="kbd">⇧</kbd><kbd class="kbd">⌘</kbd><kbd class="kbd">P</kbd></span>
  <kbd class="kbd">esc</kbd>
  <span class="kbd-row"><kbd class="kbd">↑</kbd><kbd class="kbd">↓</kbd><span class="docs-note" style="margin-left: 6px;">untuk berpindah</span></span>
  <span class="kbd-row"><kbd class="kbd">↵</kbd><span class="docs-note" style="margin-left: 6px;">untuk membuka</span></span>
</div>
```

**Di tooltip dan kalimat.** Di dalam tooltip, tombol menyesuaikan diri dengan permukaan gelap.
```html
<div class="docs-row" style="gap: 24px;">
  <span class="tip-host"><button class="icon-btn icon-btn--filled" aria-label="Cari" aria-keyshortcuts="Meta+K"><span class="ic" aria-hidden="true">search</span></button><span class="tip" role="tooltip">Cari<span class="kbd">⌘K</span></span></span>
  <p class="card__sub" style="margin: 0;">Tekan <kbd class="kbd">/</kbd> di mana saja untuk langsung ke kolom pencarian.</p>
</div>
```

**Di menu.** `kbd-row` di dalam item menu terdorong ke tepi kanan.
```html
<div class="menu is-open" role="menu" aria-label="Sunting" style="position: relative;">
  <button class="menu__item" role="menuitem" aria-keyshortcuts="Meta+C"><span class="ic" aria-hidden="true">content_copy</span>Salin tautan<span class="kbd-row"><kbd class="kbd">⌘</kbd><kbd class="kbd">C</kbd></span></button>
  <button class="menu__item" role="menuitem" aria-keyshortcuts="Meta+D"><span class="ic" aria-hidden="true">edit_square</span>Gandakan<span class="kbd-row"><kbd class="kbd">⌘</kbd><kbd class="kbd">D</kbd></span></button>
</div>
```

## Gerak dan mikrointeraksi
- Tidak ada. Tombol adalah label statis.

## Aksesibilitas
- Pakai elemen `<kbd>` agar maknanya tetap ada tanpa gaya.
- Pasang pintasan pada kontrolnya sendiri dengan `aria-keyshortcuts` (misalnya `Meta+K`); tutup tombol yang terlihat ditujukan bagi pengguna yang melihat.
- Pembaca layar membaca simbol seperti ⌘ secara tidak konsisten; jika pintasan adalah isinya (halaman bantuan), tulis juga dalam kata ("Command K").
- Setiap pintasan juga punya jalur yang terlihat dan bisa diklik.

## Lakukan
- Tampilkan tombol sesuai platform: ⌘ di Mac, Ctrl di tempat lain.
- Satu tombol per tutup; pakai `kbd-row` untuk kombinasi.

## Hindari
- Memberi `.kbd` gaya tombol atau membuatnya bisa diklik.
- Menampilkan pintasan di tata letak ponsel.
- Menjadikan pintasan satu-satunya cara mencapai sebuah aksi.

## Terkait
[Tooltip](tooltip.md) · [Dropdown menu](dropdown-menu.md) · [Command palette](command-palette.md) · [Inline code](inline-code.md)
