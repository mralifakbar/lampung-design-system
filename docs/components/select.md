# Select

Kelompok: Input. https://lampung.kartadinata.app/docs/components/select

Tombol berbentuk kolom yang membuka daftar opsi di bawahnya dan menampilkan yang dipilih. Untuk satu pilihan dari daftar tetap yang terlalu panjang untuk ditampilkan sebagai radio; jika orang perlu mengetik untuk menemukannya, pakai combobox.

## Pakai saat
- Satu nilai dari daftar tetap sekitar 6 sampai 30 opsi: kecamatan, periode laporan, jenis pengaduan, kabupaten saat daftarnya pendek.
- Ruang terbatas, sehingga semua opsi tidak bisa terlihat (bilah filter, baris formulir).
- Opsi butuh baris keterangan kedua di dalam daftar (`.select__text` dengan `small`).

## Pakai yang lain saat
- Dua sampai lima opsi yang muat di layar: pakai [Radio](radio.md). Opsi yang terlihat lebih cepat dibandingkan dan cukup sekali ketuk.
- Setiap opsi butuh deskripsi, harga, atau badge: pakai [Radio card](radio-card.md).
- Beralih antartampilan dari konten yang sama saat itu juga: pakai [Segmented control](segmented-control.md).
- Daftar panjang (desa, kelurahan, lebih dari sekitar 30) atau opsi dari server: pakai [Combobox](combobox.md). Orang mengetik untuk menemukan alih-alih menggulir.
- Beberapa nilai sekaligus: pakai [Chips](chips.md). Atau [checkbox](checkbox.md) di formulir, atau [tag input](tag-input.md) untuk nilai bebas.
- Daftar aksi (Urutkan, Ekspor, Hapus): pakai [Dropdown menu](dropdown-menu.md). Select menyimpan nilai; menu menjalankan perintah.
- Berpindah antarbagian atau halaman: pakai [Tabs](tabs.md). Atau [sidebar](sidebar.md) saat tujuannya banyak.

## Letaknya
Di [formulir](form-layout.md) seperti [text field](text-field.md), dengan label di atas. Di bilah filter pada layar lebar dengan lebar tetap (sekitar 220 px). Daftar terbuka di alur halaman di bawah pemicu, selebar pemicu; di ponsel daftar lebih dari sekitar 8 opsi lebih nyaman dibaca di [sheet](sheet.md).

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.select` | Wajib. Pembungkus berposisi, selebar kolomnya. `data-lds-select` untuk perilaku HTML biasa. |
| `button.control.select-trigger` | Wajib. Kolom 44 px. `aria-haspopup="listbox"`, `aria-expanded`, dinamai oleh label (`aria-labelledby`). `.is-placeholder` selama belum ada yang dipilih. |
| `.select__value` | Wajib. Label terpilih (atau placeholder), dipotong dengan elipsis saat panjang. |
| `.ic (expand_more)` | Wajib. Chevron; berputar 180 derajat saat terbuka. `.ic` di depan nilai bersifat opsional. |
| `ul.menu.select__menu[role=listbox]` | Wajib. Daftarnya, tinggi sampai 320 px (atau setengah viewport), menggulir di dalam. |
| `li.menu__item[role=option]` | Wajib. Satu opsi dengan `data-value` dan `aria-selected`; `.is-selected` menandai yang dipilih. Taruh `.select__text` dengan `small` di dalamnya untuk baris kedua. |

## Markup

**Pilih kecamatan.** Klik atau tekan Enter, Spasi, atau Bawah untuk membuka; panah berpindah; Enter memilih; Escape menutup; mengetik huruf melompat ke opsi pertama yang diawali huruf itu.
```html
<div class="field" style="max-width: 360px; width: 100%;">
  <span class="field__label" id="se-level">Kecamatan</span>
  <div class="select" data-lds-select>
    <button type="button" class="control select-trigger is-placeholder" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="se-level"><span class="select__value">Pilih kecamatan</span><span class="ic" aria-hidden="true">expand_more</span></button>
    <ul class="menu select__menu" role="listbox" aria-labelledby="se-level">
      <li class="menu__item" role="option" aria-selected="false" data-value="kedaton"><span class="select__text">Kedaton<small>Bandar Lampung</small></span></li>
      <li class="menu__item" role="option" aria-selected="false" data-value="way-halim"><span class="select__text">Way Halim<small>Bandar Lampung</small></span></li>
      <li class="menu__item" role="option" aria-selected="false" data-value="metro-pusat"><span class="select__text">Metro Pusat<small>Kota Metro</small></span></li>
      <li class="menu__item" role="option" aria-selected="false" data-value="pringsewu"><span class="select__text">Pringsewu<small>Kabupaten Pringsewu</small></span></li>
    </ul>
  </div>
</div>
```

**Dengan ikon dan nilai terpilih.** Select di bilah filter yang sudah dipilih. Tanda centang menandai baris terpilih di daftar.
```html
<div class="field" style="max-width: 260px; width: 100%;">
  <span class="field__label" id="se-sem">Periode laporan</span>
  <div class="select" data-lds-select>
    <button type="button" class="control select-trigger" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="se-sem"><span class="ic" aria-hidden="true">calendar_month</span><span class="select__value">Triwulan III 2026</span><span class="ic" aria-hidden="true">expand_more</span></button>
    <ul class="menu select__menu" role="listbox" aria-labelledby="se-sem">
      <li class="menu__item is-selected" role="option" aria-selected="true" data-value="2026-q3">Triwulan III 2026</li>
      <li class="menu__item" role="option" aria-selected="false" data-value="2026-q2">Triwulan II 2026</li>
      <li class="menu__item" role="option" aria-selected="false" data-value="2026-q1">Triwulan I 2026</li>
      <li class="menu__item" role="option" aria-selected="false" data-value="2025-q4">Triwulan IV 2025</li>
    </ul>
  </div>
</div>
```

**Wajib dan belum diisi.** Pemicunya adalah `.control`, jadi status galatnya sama dengan kolom lainnya.
```html
<div class="field" style="max-width: 360px; width: 100%;">
  <span class="field__label" id="se-cat">Jenis pengaduan</span>
  <div class="select" data-lds-select>
    <button type="button" class="control select-trigger is-placeholder is-invalid" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="se-cat" aria-invalid="true" aria-describedby="se-cat-help"><span class="select__value">Pilih jenis</span><span class="ic" aria-hidden="true">expand_more</span></button>
    <ul class="menu select__menu" role="listbox" aria-labelledby="se-cat">
      <li class="menu__item" role="option" aria-selected="false" data-value="jalan">Jalan rusak</li>
      <li class="menu__item" role="option" aria-selected="false" data-value="lampu">Lampu jalan padam</li>
      <li class="menu__item" role="option" aria-selected="false" data-value="sampah">Sampah tidak terangkut</li>
    </ul>
  </div>
  <span class="field__help field__help--error" id="se-cat-help"><span class="ic" aria-hidden="true">error</span>Pilih jenis pengaduan agar laporan sampai ke dinas yang tepat.</span>
</div>
```

## Status
| Status | Caranya |
|---|---|
| `.is-placeholder` | Teks redup sampai sesuatu dipilih; dihapus oleh JS pada pilihan pertama. |
| `open (aria-expanded="true")` | Tepi aksen dan halo tetap di pemicu; chevron menunjuk ke atas; menu mendapat `.is-open`. |
| `active option (.is-hover)` | Baris keyboard atau pointer; `aria-activedescendant` pada pemicu mengikutinya. |
| `selected (.is-selected + aria-selected)` | Latar berisi pada baris terpilih. |
| `.is-invalid + aria-invalid` | Tepi danger, dengan `.field__help--error` di bawahnya. |
| `disabled` | `disabled` pada tombol ditambah `.is-disabled`. |

## Gerak dan mikrointeraksi
- Daftar tumbuh dari pemicu: opacity dalam `--d-fast` (160 ms) dengan `--ease-enter` dan `scale(0.96) translateY(-4px)` ke posisi diam dengan `--spring-smooth` (560 ms), titik asal kiri atas.
- Ia menutup lebih cepat daripada membuka: opacity dan transform dalam `--d-exit` (180 ms) dengan `--ease-exit`, lalu `visibility` berganti. Membuka lagi di tengah penutupan berbalik dari posisinya saat itu.
- Chevron berputar 180 derajat dengan `--spring-smooth`. Sorotan baris berganti dalam 60 ms linear agar berpindah dengan panah terasa langsung.
- Reduced motion: menu memudar masuk 120 ms linear tanpa skala atau perpindahan.

## Aksesibilitas
- Pemicu adalah `<button type="button">` (di dalam formulir tombol polos akan mengirim) dengan `aria-haspopup="listbox"`, `aria-expanded`, dan nama dari label terlihat lewat `aria-labelledby`.
- Tombol: Bawah, Atas, Enter, atau Spasi membuka; Bawah dan Atas berpindah; Home dan End melompat; Enter atau Spasi memilih; Escape menutup dan menjaga fokus di pemicu; Tab menutup; mengetik huruf melompat ke kecocokan pertama (jeda 700 ms).
- JS memberi listbox sebuah id, menyetel `aria-controls`, dan memindahkan `aria-activedescendant` pada pemicu; opsi membawa `aria-selected`.
- Tidak ada nilai formulir bawaan: saat `lds:change` tulis nilainya ke input tersembunyi, atau baca dari state Anda.

## Lakukan
- Tulis placeholder yang menyebut aksinya ("Pilih kecamatan"), dan tampilkan bawaan terpilih jika memang jelas benar.
- Urutkan opsi sesuai harapan orang (abjad, waktu, wilayah), bukan berdasarkan id basis data.
- Pakai baris kedua (`small`) untuk kode atau keterangan singkat, bukan teks promosi.

## Hindari
- Memakai select untuk dua atau tiga opsi; tampilkan [radio](radio.md) atau [segmented control](segmented-control.md).
- Menaruh aksi atau tautan di dalam listbox.
- Memberi gaya `<select>` bawaan agar tampak seperti ini; pakai `.select` (sistem tidak memberi gaya select bawaan).

## Perilaku (HTML biasa)
`data-lds-select` pada `.select`: membuka dan menutup listbox, menangani tombol di atas, menutup saat pointer di luar, menulis label terpilih ke `.select__value`, dan memicu `lds:change` dengan `{ value, label }` pada pembungkus (nilai dari `data-value`).

## React
```tsx
import { Select } from 'lampung-design-system/react';

<span className="field__label" id="level-label">Kecamatan</span>
<Select
  labelledBy="level-label"
  value={level}
  onChange={setLevel}
  placeholder="Pilih kecamatan"
  options={[
    { value: 'kedaton', label: 'Kedaton', sub: 'Bandar Lampung' },
    { value: 'way-halim', label: 'Way Halim', sub: 'Bandar Lampung' },
  ]}
/>
```

## Terkait
[Combobox](combobox.md) · [Radio card](radio-card.md) · [Segmented control](segmented-control.md) · [Dropdown menu](dropdown-menu.md)
