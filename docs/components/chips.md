# Chips

Kelompok: Pilihan. https://lampung.kartadinata.app/docs/components/chips

Tombol toggle berbentuk pil dalam baris yang bisa turun baris, untuk filter dan pilihan cepat yang langsung berlaku saat diketuk. Chip yang tertekan menjadi warna aksen dan tanda centang bergeser masuk.

## Pakai saat
- Menyaring daftar dengan beberapa nilai sekaligus: hari dalam seminggu, bidang layanan, status.
- Pilihan cepat dari set pendek yang semua opsinya harus terlihat: nominal siap pilih, slot jam, balasan cepat.
- Pilihan ganda ringkas di ponsel ketika checkbox akan memakan terlalu banyak tinggi.

## Pakai yang lain saat
- Nilai yang diketik dan dibuat orang sendiri (topik, email): pakai [Tag input](tag-input.md).
- Dua sampai lima tampilan dari konten yang sama, tepat satu setiap saat: pakai [Segmented control](segmented-control.md).
- Pilihan yang disimpan di formulir dan butuh penjelasan: pakai [Checkbox](checkbox.md). Atau [radio](radio.md) untuk satu pilihan.
- Label status atau kategori yang tidak bisa diklik: pakai [Badge](badge.md).
- Daftar opsi yang panjang: pakai [Select](select.md). Atau [combobox](combobox.md)
- Satu pengaturan nyala dan mati: pakai [Switch](switch.md).

## Letaknya
Tepat di atas konten yang disaringnya, di bawah [search field](search-field.md) atau header halaman. Di dalam `.chip-row` yang bisa turun baris; di ponsel satu baris boleh menggulir ke samping di dalam kontainernya alih-alih turun menjadi tiga baris.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.chip-row` | Wajib. Baris yang turun baris, jarak 8 px. `role="group"` dengan `aria-label` yang menyebut apa yang disaring. |
| `button.chip` | Wajib. Pil 34 px, `aria-pressed`. Pakai `<button type="button">`. |
| `.chip__check` | Wajib untuk toggle. Ikon `check`, lebar nol sampai ditekan, lalu bergeser masuk sebelum label. |

## Markup

**Saring berdasarkan hari.** Beberapa bisa menyala. Tanda centang bergeser masuk dan padding menyesuaikan agar label tidak melompat.
```html
<div class="chip-row" role="group" aria-label="Hari">
  <button type="button" class="chip" aria-pressed="true" onclick="this.setAttribute('aria-pressed', String(this.getAttribute('aria-pressed') !== 'true'))"><span class="ic chip__check" aria-hidden="true">check</span>Sen</button><button type="button" class="chip" aria-pressed="false" onclick="this.setAttribute('aria-pressed', String(this.getAttribute('aria-pressed') !== 'true'))"><span class="ic chip__check" aria-hidden="true">check</span>Sel</button><button type="button" class="chip" aria-pressed="true" onclick="this.setAttribute('aria-pressed', String(this.getAttribute('aria-pressed') !== 'true'))"><span class="ic chip__check" aria-hidden="true">check</span>Rab</button><button type="button" class="chip" aria-pressed="false" onclick="this.setAttribute('aria-pressed', String(this.getAttribute('aria-pressed') !== 'true'))"><span class="ic chip__check" aria-hidden="true">check</span>Kam</button><button type="button" class="chip" aria-pressed="false" onclick="this.setAttribute('aria-pressed', String(this.getAttribute('aria-pressed') !== 'true'))"><span class="ic chip__check" aria-hidden="true">check</span>Jum</button><button type="button" class="chip" aria-pressed="false" onclick="this.setAttribute('aria-pressed', String(this.getAttribute('aria-pressed') !== 'true'))"><span class="ic chip__check" aria-hidden="true">check</span>Sab</button>
</div>
```

**Satu pilihan cepat.** Nominal isi ulang kartu bus Trans Bandar Lampung: memilih satu melepas yang lain. Pasangkan dengan [amount field](amount-field.md) untuk nilai sendiri.
```html
<div class="chip-row" role="group" aria-label="Nominal isi ulang kartu bus">
  <button type="button" class="chip" aria-pressed="false" onclick="this.parentElement.querySelectorAll('.chip').forEach((c) => c.setAttribute('aria-pressed', String(c === this)))"><span class="ic chip__check" aria-hidden="true">check</span>Rp 50.000</button><button type="button" class="chip" aria-pressed="true" onclick="this.parentElement.querySelectorAll('.chip').forEach((c) => c.setAttribute('aria-pressed', String(c === this)))"><span class="ic chip__check" aria-hidden="true">check</span>Rp 100.000</button><button type="button" class="chip" aria-pressed="false" onclick="this.parentElement.querySelectorAll('.chip').forEach((c) => c.setAttribute('aria-pressed', String(c === this)))"><span class="ic chip__check" aria-hidden="true">check</span>Rp 200.000</button><button type="button" class="chip" aria-pressed="false" onclick="this.parentElement.querySelectorAll('.chip').forEach((c) => c.setAttribute('aria-pressed', String(c === this)))"><span class="ic chip__check" aria-hidden="true">check</span>Rp 500.000</button>
</div>
```

## Status
| Status | Caranya |
|---|---|
| `aria-pressed="false"` | Latar dasar dengan garis tegas 1 px; hover mengisinya. |
| `aria-pressed="true"` | Warna aksen tipis, teks aksen, tanpa garis; centang bergeser masuk dan padding kiri menyusut dari 14 ke 10 px. |
| `:active` | Mengecil ke 0.95 dalam 90 ms. |
| `focus-visible` | Focus ring sistem. |
| `disabled` | Opsi yang ada tetapi tidak bisa dipilih sekarang (slot jam yang sudah dipesan): samar dan dicoret, tidak bisa ditekan. Sebutkan alasannya di dekat baris ("Jam yang dicoret sudah dipesan"). |

## Gerak dan mikrointeraksi
- Menekan: centang tumbuh dari lebar 0 ke 17 px dan padding kiri menyusut dengan `--spring-smooth` (560 ms), jadi label bergeser sedikit lalu diam; opacity dalam `--d-fast`. Melepas membalik transisi yang sama.
- Warna dan garis berubah dalam `--d-fast` (160 ms) dengan `--ease-standard`.
- Tekan: `scale(0.95)` dalam 90 ms, kembali dengan `--spring-snappy` (360 ms).
- Saat chip menyaring daftar, tukar hasilnya langsung; jangan munculkan bertahap di setiap ketukan.
- Reduced motion: transisi menjadi 120 ms linear.

## Aksesibilitas
- Setiap chip adalah `<button type="button" aria-pressed>`, diumumkan sebagai tombol toggle, tertekan atau tidak.
- Namai kelompoknya (`role="group"`, `aria-label="Hari"`) agar orang tahu apa yang disaring.
- Tinggi chip 34 px: pertahankan jarak 8 px agar tetangganya tidak salah ketuk, dan jangan pernah merapatkannya.
- Umumkan jumlah hasil di area `aria-live="polite"` saat filter mengubah daftar.

## Lakukan
- Batasi label pada satu atau dua kata.
- Sediakan "Hapus filter" sebagai [button](button.md) polos saat banyak chip bisa menyala.

## Hindari
- Memakai chip sebagai tab atau navigasi.
- Menghapus tanda centang; warna saja tidak menyatakan tertekan.
- Membuat gaya pil baru untuk tag atau status; pakai [badge](badge.md) atau [tag input](tag-input.md).

## Perilaku (HTML biasa)
Tidak ada di sistem. Ganti `aria-pressed` saat diklik (atau lepaskan yang lain untuk pilihan tunggal); CSS mengurus sisanya.

## Terkait
[Tag input](tag-input.md) · [Segmented control](segmented-control.md) · [Checkbox](checkbox.md) · [Badge](badge.md)
