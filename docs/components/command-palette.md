# Command palette

Kelompok: Lapisan. https://lampung.kartadinata.app/docs/components/command-palette

Kotak pencarian di atas halaman untuk menemukan dan menjalankan perintah atau tujuan apa pun dengan mengetik. Jalan pintas bagi orang yang tahu apa yang dicari; tidak pernah satu-satunya jalan.

## Pakai saat
- Aplikasi dengan banyak tujuan dan perintah tempat pengguna rutin ingin kecepatan keyboard: lompat ke sebuah layanan, buat permohonan, ganti tema.
- Pencarian global lintas jenis (halaman, orang, aksi) dengan hasil yang muncul saat mengetik.

## Pakai yang lain saat
- Memfilter satu daftar di halaman: pakai [Search field](search-field.md).
- Memilih satu nilai untuk field formulir dari banyak pilihan: pakai [Combobox](combobox.md).
- Beberapa perintah pada satu objek: pakai [Dropdown menu](dropdown-menu.md).
- Navigasi utama: pakai [App shell](app-shell.md). Setiap perintah di palette juga harus ada di antarmuka yang terlihat.

## Letaknya
48 px dari atas kontainer yang diposisikan (atau dari jendela, dalam pembungkus `position: fixed; inset: 0`), di tengah, lebar 520 px (16 px dari tepi jika lebih sempit), di atas scrim. Dibuka lewat tombol cari di top bar dan pintasan keyboard yang Anda pasang (biasanya Cmd atau Ctrl+K).

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.scrim[data-lds-scrim="id"]` | Wajib. Klik untuk menutup. |
| `.cmdk[role=dialog][aria-modal=true]` | Wajib. Lapisannya, dengan `id`, `data-lds-layer`, dan `aria-label`. |
| `.cmdk__search` | Wajib. Baris pencarian 54 px: ikon `search` dan `<input>` (`role="combobox"`, `data-lds-filter="listId"`, `data-lds-autofocus`, `aria-controls` ke daftar). |
| `.cmdk__list[role=listbox]` | Wajib. Hasilnya, bergulir setelah 260 px. |
| `.cmdk__item[role=option]` | Wajib. Hasil setinggi 42 px dengan ikon, label, dan `kbd` opsional; butuh `id` unik untuk `aria-activedescendant`. `.is-active` menandai yang disorot. |
| `.cmdk__empty[data-lds-empty]` | Pesan yang tampil jika tidak ada yang cocok; `hidden` secara bawaan. |
| `.cmdk__foot` | Petunjuk tombol: pindah, jalankan, tutup, dengan `.kbd`. |

## Markup

**Lompat dan jalankan.** Buka lalu ketik "baru" atau "jadwal". Atas dan Bawah memindahkan sorotan, Enter menjalankannya, Escape menutup; ketik "xyz" untuk melihat status kosong.
```html
<button class="btn btn--secondary" data-lds-open="palette" aria-haspopup="dialog">Cari</button>

<div class="scrim" data-lds-scrim="palette"></div>
<div class="cmdk" id="palette" role="dialog" aria-modal="true" aria-label="Command palette" data-lds-layer>
  <div class="cmdk__search"><span class="ic" aria-hidden="true">search</span>
    <input placeholder="Ketik perintah atau cari" aria-label="Perintah atau pencarian" role="combobox" aria-expanded="true" aria-controls="palette-list" data-lds-filter="palette-list" data-lds-autofocus></div>
  <div class="cmdk__list" id="palette-list" role="listbox" aria-label="Hasil">
    <button class="cmdk__item" role="option" id="cmd-new" data-lds-close><span class="ic" aria-hidden="true">add_circle</span>Permohonan baru<kbd>⌘N</kbd></button>
    <div class="cmdk__empty" data-lds-empty hidden>Tidak ada yang cocok. Coba nama layanan atau "baru".</div>
  </div>
</div>

<script type="module">
  import { openLayer } from 'lampung-design-system/js';
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); openLayer('palette'); }
  });
</script>
```

## Status
| Status | Caranya |
|---|---|
| `.cmdk__item.is-active` | Tint aksen dan teks aksen: hasil yang akan dijalankan Enter. Hasil terlihat pertama menjadi aktif setelah setiap ketukan tombol. |
| `[hidden] (item)` | Hasil yang tidak cocok dengan kueri. |
| `.cmdk__empty visible` | Tidak ada hasil: menyarankan apa yang bisa dicoba. |

## Gerak dan mikrointeraksi
- Masuk: opacity selama `--d-fast` (160 ms) dengan `--ease-enter` dan dari `scale(0.97)` dengan `--spring-smooth`, tumbuh dari tengah atas.
- Keluar: selama `--d-exit` (180 ms) dengan `--ease-exit`; scrim memudar bersamanya.
- Hasil berganti seketika saat mengetik; tanpa stagger, tanpa fade. Kecepatan adalah tujuannya.
- Reduced motion: tanpa skala, hanya opacity.

## Aksesibilitas
- `role="dialog"`, `aria-modal="true"`, `aria-label`. Fokus dimulai di input (`data-lds-autofocus`) dan dikunci; Escape menutup dan mengembalikan fokus ke pemicu.
- Input adalah `role="combobox"` dengan `aria-controls` ke listbox; skrip menjaga `aria-activedescendant` pada opsi aktif dan `aria-selected` pada opsi, sehingga fokus tidak pernah meninggalkan input.
- Atas dan Bawah memindahkan hasil aktif; Enter mengkliknya.
- Tampilkan pintasan pada pemicu agar orang menemukannya.

## Lakukan
- Namai hasil sebagai kata kerja atau tujuan yang akan diketik orang.
- Cerminkan setiap perintah palette di tempat yang terlihat.
- Tutup palette setelah menjalankan hasil (`data-lds-close` pada item).

## Hindari
- Menjadikan palette satu-satunya jalan ke sebuah fitur.
- Menganimasikan hasil saat difilter.
- Menampilkan daftar kosong tanpa pesan.

## Perilaku (HTML biasa)
Hook lapisan membuka dan menutupnya (`data-lds-open`, `data-lds-close`, `data-lds-scrim`, `openLayer`, `closeLayer`). `input[data-lds-filter="listId"]` menyembunyikan anak `[role=option]` yang teksnya tidak memuat kueri, menampilkan `[data-lds-empty]` jika tidak ada yang tersisa, memindahkan `.is-active` dengan Atas dan Bawah, dan mengkliknya saat Enter. Pintasan global Anda pasang sendiri.

## Terkait
[Search field](search-field.md) · [Combobox](combobox.md) · [Dropdown menu](dropdown-menu.md) · [Keyboard key](kbd.md)
