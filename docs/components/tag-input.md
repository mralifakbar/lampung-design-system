# Tag input

Kelompok: Input. https://lampung.kartadinata.app/docs/components/tag-input

Kolom yang mengubah teks ketikan menjadi tag yang bisa dihapus: Enter atau koma menambah satu, Backspace di kolom kosong menghapus yang terakhir. Untuk beberapa nilai bebas yang pendek.

## Pakai saat
- Orang memasukkan beberapa nilai pendek yang tidak berasal dari daftar tetap: kata kunci laporan warga, bidang minat, email yang diundang.
- Nilainya dibuat sendiri oleh orang tersebut, sehingga daftar opsi tidak bisa mencakupnya.

## Pakai yang lain saat
- Beberapa pilihan dari set tetap yang pendek (hari, bidang layanan): pakai [Chips](chips.md). Semua opsi terlihat, nyalakan atau matikan dengan sekali ketuk.
- Beberapa pilihan dari daftar tetap yang panjang: pakai [Checkbox](checkbox.md). Dalam daftar yang menggulir atau [sheet](sheet.md); sistem tidak punya combobox pilihan ganda.
- Satu nilai dari daftar panjang: pakai [Combobox](combobox.md).
- Satu baris teks: pakai [Text field](text-field.md).
- Menampilkan tag atau status yang tidak disunting orang: pakai [Badge](badge.md).

## Letaknya
Di [formulir](form-layout.md), selebar kolomnya, dengan teks bantuan yang menyebut batasnya. Kontrol bertambah tinggi saat tag turun ke baris baru.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.control.tags` | Wajib. Kotak kolom, membungkus isinya dan tumbuh dari 44 px. |
| `.tag` | Satu nilai, 28 px, isian cekung, dengan teks dan tombol hapus. |
| `.tag > button` | Wajib per tag. Tombol hapus 22 px dengan ikon `close` dan `aria-label="Hapus …"`. |
| `input` | Wajib. Minimal 120 px, mengambil sisa baris. Dinamai oleh label. |

## Markup

**Kata kunci laporan.** Ketik kata kunci lalu tekan Enter atau koma. Backspace di kolom kosong menghapus tag terakhir.
```html
<div class="field">
  <label class="field__label" for="topics">Kata kunci laporan</label>
  <div class="control tags">
    <span class="tag">Jalan berlubang<button type="button" aria-label="Hapus Jalan berlubang"><span class="ic" aria-hidden="true">close</span></button></span>
    <span class="tag">Lampu jalan<button type="button" aria-label="Hapus Lampu jalan"><span class="ic" aria-hidden="true">close</span></button></span>
    <input id="topics" placeholder="Tambah kata kunci" aria-describedby="topics-help">
  </div>
  <span class="field__help" id="topics-help">Paling banyak 8 kata kunci. Tekan Enter setelah setiap kata kunci.</span>
</div>
<!-- Your code: Enter or comma inserts a .tag before the input; Backspace on an empty input removes the last; each tag's button removes it. -->
```

**Undang lewat email, dengan nilai yang ditolak.** Validasi setiap nilai saat menjadi tag; biarkan teks yang salah di input dan jelaskan.
```html
<div class="field" style="max-width: 520px; width: 100%;">
  <label class="field__label" for="ti-mail">Undang rekan petugas</label>
  <div class="control tags is-invalid"><span class="tag">rani@example.go.id<button type="button" aria-label="Hapus rani@example.go.id" onclick="this.parentElement.remove()"><span class="ic" aria-hidden="true">close</span></button></span><span class="tag">dimas@example.go.id<button type="button" aria-label="Hapus dimas@example.go.id" onclick="this.parentElement.remove()"><span class="ic" aria-hidden="true">close</span></button></span><input id="ti-mail" type="email" value="budi@example" aria-invalid="true" aria-describedby="ti-mail-help"></div>
  <span class="field__help field__help--error" id="ti-mail-help"><span class="ic" aria-hidden="true">error</span>budi@example belum punya domain, misalnya budi@example.go.id.</span>
</div>
```

## Status
| Status | Caranya |
|---|---|
| `focus` | Tepi aksen dan halo pada seluruh kotak (`:focus-within`), seperti `.control` lainnya. |
| `.is-invalid` | Tepi danger saat nilai ketikan ditolak; teks tetap di input. |
| `at the limit` | Nonaktifkan input dan sebutkan di teks bantuan ("8 dari 8 kata kunci"). |
| `tag hover` | Tombol hapus berwarna saat hover. |

## Gerak dan mikrointeraksi
- Tag baru muncul dengan `lds-pop-in` (skala 0.6 ke 1 dengan fade) memakai `--spring-snappy` (360 ms); input ikut bergeser saat baris menata ulang.
- Penghapusan langsung, tanpa animasi keluar, agar Backspace bisa menghapus beberapa tag dengan cepat.
- Reduced motion: pop menjadi kemunculan 1 ms.

## Aksesibilitas
- Input dilabeli oleh label kolom; teks bantuan menyebut cara menambah (Enter) dan batasnya.
- Setiap tombol hapus adalah `<button type="button">` bernama "Hapus Jalan berlubang". Setelah menghapus, kembalikan fokus ke input.
- Umumkan penambahan dan penghapusan di area `aria-live="polite"` jika daftarnya panjang ("Lampu jalan ditambahkan, 3 kata kunci").
- Enter tidak boleh mengirim formulir selama input berisi teks; cegah hanya dalam kasus itu.

## Lakukan
- Terima Enter, koma, dan tempelan daftar yang dipisahkan koma.
- Pangkas spasi dan abaikan duplikat, sambil menyebutkannya di teks bantuan.

## Hindari
- Memakai tag untuk set opsi tetap; itu tugas [chips](chips.md).
- Memberi status tertekan atau berwarna pada tag; tag adalah nilai, bukan filter.

## Perilaku (HTML biasa)
Tidak ada di sistem. Tambahkan `.tag` sebelum input saat Enter atau koma, hapus yang terakhir saat Backspace di input kosong, dan hubungkan setiap tombol hapus, di kode Anda sendiri.

## Terkait
[Chips](chips.md) · [Combobox](combobox.md) · [Text field](text-field.md) · [Badge](badge.md)
