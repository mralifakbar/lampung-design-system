# Context menu

Kelompok: Lapisan. https://lampung.kartadinata.app/docs/components/context-menu

Menu perintah yang terbuka di posisi pointer saat klik kanan, tekan lama di layar sentuh, atau Shift+F10. Pintasan untuk perintah yang juga bisa dicapai dengan cara lain.

## Pakai saat
- Area berisi banyak objek yang sering ditindaklanjuti (berkas, item di editor, sel) tempat orang terbiasa klik kanan.
- Pengguna mahir ingin perintah untuk benda di bawah pointer tanpa pindah ke toolbar.

## Pakai yang lain saat
- Satu-satunya jalan menuju perintah: pakai [Dropdown menu](dropdown-menu.md). Selalu sediakan juga tombol "lainnya" yang terlihat; klik kanan tidak terlihat.
- Konten lengkap tentang benda di bawah pointer: pakai [Hover card](hover-card.md).
- Penjelasan singkat sebuah kontrol: pakai [Tooltip](tooltip.md).
- Aksi pada banyak item terpilih sekaligus: pakai [Selection bar](selection-bar.md).

## Letaknya
Di posisi pointer (atau 16 px ke dalam area untuk keyboard), dibatasi agar tetap di dalam area. Menu adalah anak dari area, yang harus `position: relative`.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `[data-lds-contextmenu="id"]` | Wajib. Area yang mendengarkan; `position: relative`, `tabindex="0"` agar keyboard bisa membukanya. |
| `.menu[role=menu]` | Wajib. Markup yang sama dengan [dropdown menu](dropdown-menu.md), diletakkan di dalam area. |
| `.menu__item[role=menuitem]` | Wajib. Perintah dengan ikon dan pintasan `kbd`; yang destruktif paling akhir. |

## Markup

**Berkas permohonan.** Klik kanan di dalam kotak (atau tekan lama di layar sentuh, atau fokuskan lalu tekan Shift+F10).
```html
<div class="card card--fill" data-lds-contextmenu="file-menu" tabindex="0" style="position: relative;">
  …
  <div class="menu" id="file-menu" role="menu" aria-label="Surat keterangan domisili">
    <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">visibility</span>Buka</button>
    <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">edit</span>Ganti nama</button>
    <div class="menu__sep"></div>
    <button class="menu__item menu__item--danger" role="menuitem"><span class="ic" aria-hidden="true">delete</span>Pindahkan ke sampah</button>
  </div>
</div>
```

## Status
| Status | Caranya |
|---|---|
| `.is-open` | Tampil di posisi pointer dengan `left`/`top` diatur inline. |
| `long press` | Di layar sentuh, tekanan 500 ms dengan gerakan kurang dari 10 px membukanya dengan haptic sedang. |

## Gerak dan mikrointeraksi
- Sama seperti [dropdown menu](dropdown-menu.md): masuk selama `--d-fast` dengan skala dari 0,96 pada `--spring-smooth`, keluar selama `--d-exit` dengan `--ease-exit`. Menu tumbuh dari sudut kiri atasnya, tempat pointer berada.
- Reduced motion: hanya memudar.

## Aksesibilitas
- Area butuh `tabindex="0"` dan nama yang menyebut pintasannya; Shift+F10 atau tombol Menu membuka menu dan memfokuskan item pertama.
- Di dalam menu: Atas dan Bawah berpindah, Escape menutup, memilih item menutup menu.
- Setiap perintah juga harus bisa dicapai tanpa klik kanan: [dropdown menu](dropdown-menu.md) pada item, toolbar, atau pintasan keyboard.

## Lakukan
- Samakan isinya persis dengan menu "lainnya" yang terlihat pada item.
- Biarkan menu bawaan browser pada field teks dan tautan.

## Hindari
- Menyembunyikan perintah yang tidak ada di tempat lain di dalam context menu.
- Mengambil alih klik kanan di seluruh halaman.

## Perilaku (HTML biasa)
`data-lds-contextmenu="menuId"` pada area: `contextmenu` membuka menu di posisi pointer (dibatasi di dalam area), tekanan sentuh 500 ms membukanya dengan haptic, Shift+F10 atau tombol Menu membukanya di dekat kiri atas dan memfokuskan item pertama. Tombol keyboard dan cara menutup sama seperti [dropdown menu](dropdown-menu.md); `closeMenus()` menutupnya.

## Terkait
[Dropdown menu](dropdown-menu.md) · [Selection bar](selection-bar.md) · [Haptics](haptics.md)
