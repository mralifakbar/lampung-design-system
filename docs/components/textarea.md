# Textarea

Kelompok: Input. https://lampung.kartadinata.app/docs/components/textarea

Kolom untuk beberapa kalimat: kotak `.control` yang sama, lebih tinggi, dengan penghitung karakter opsional. Sebutkan batasnya sebelum orang mencapainya.

## Pakai saat
- Orang menulis lebih dari satu baris: catatan untuk petugas, alasan permohonan, laporan kesalahan data.
- Kolom punya batas karakter dan orang perlu melihat sisa ruangnya (`.counter`).

## Pakai yang lain saat
- Satu baris pendek (nama, judul, email): pakai [Text field](text-field.md).
- Menulis pesan chat yang terkirim saat Enter: pakai [Composer](composer.md).
- Konten panjang berformat (artikel, panduan layanan): pakai [Prose](prose.md). Pakai editor sungguhan; textarea hanya teks biasa.
- Menyunting nilai pendek di tempat di dalam daftar atau tabel: pakai [Inline edit](inline-edit.md).
- Beberapa item pendek seperti topik atau email: pakai [Tag input](tag-input.md).

## Letaknya
Di [formulir](form-layout.md), biasanya terakhir sebelum tombol, selebar kolom formulir. Di [dialog](dialog.md) atau [modal](modal.md) untuk alur seperti "laporkan kesalahan".

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.field / .field__label / .field__help` | Wajib. Pembungkus yang sama dengan [text field](text-field.md). |
| `.control.control--area` | Wajib. Kotak tumbuh sesuai tinggi isinya, padding 12 kali 14. |
| `textarea` | Wajib. Tinggi minimal 88 px (sekitar 3 baris), tinggi baris 22 px, tidak bisa diubah ukurannya dengan menyeret. Setel `rows` untuk awal yang lebih tinggi. |
| `.counter` | Opsional. "120 / 280" tabular di dalam span label, rata kanan oleh label. |

## Markup

**Dengan penghitung.** Penghitung berada di baris label, jadi tidak pernah menggeser teks bantuan. Dengan `maxlength` browser menghentikan input di batasnya, jadi penghitung tidak butuh status melebihi batas.
```html
<div class="field">
  <label class="field__label" for="note">Catatan untuk petugas <span class="counter" id="note-count">0 / 280</span></label>
  <div class="control control--area">
    <textarea id="note" maxlength="280" aria-describedby="note-help note-count"></textarea>
  </div>
  <span class="field__help" id="note-help">Petugas membaca catatan ini sebelum memproses permohonan.</span>
</div>
<!-- Update #note-count on input in your own code. -->
```

**Alasan wajib dengan galat.** Laporan butuh alasan; teks bantuan menjelaskan detail seperti apa yang membantu.
```html
<div class="field" style="max-width: 520px;">
  <label class="field__label" for="ta-why">Apa yang salah pada data ini?</label>
  <div class="control control--area is-invalid"><textarea id="ta-why" rows="4" aria-invalid="true" aria-describedby="ta-why-help"></textarea></div>
  <span class="field__help field__help--error" id="ta-why-help"><span class="ic" aria-hidden="true">error</span>Jelaskan kesalahannya, misalnya bagian mana yang keliru dan seharusnya apa.</span>
</div>
```

## Status
| Status | Caranya |
|---|---|
| `focus / hover` | Seperti [text field](text-field.md): tepi aksen dan halo saat `:focus-within`. |
| `.is-invalid + aria-invalid` | Tepi dan halo danger; pesan di `.field__help--error`. |
| `.is-disabled + disabled` | Latar berisi dan teks redup. |

## Gerak dan mikrointeraksi
- Garis tepi dan halo bertransisi dalam `--d-fast` (160 ms) dengan `--ease-standard`, seperti setiap `.control`.
- Penghitung berganti angka di tempat; tidak dianimasikan.
- Reduced motion: transisi menjadi 120 ms linear.

## Aksesibilitas
- `<label for>` menamainya; teks bantuan dan penghitung sama-sama ada di `aria-describedby` agar batasnya diumumkan.
- Utamakan `maxlength` (browser menghentikan input) dan sebutkan batasnya di awal; jika Anda mengizinkan melebihi batas dan memblokir saat dikirim, tandai `aria-invalid` dan sebutkan berapa karakter yang harus dihapus.
- Enter membuat baris baru. Jangan pernah mengirim textarea saat Enter; itu pola [composer](composer.md).
- Teks tampil 16 px di layar sentuh, agar iOS tidak memperbesar saat fokus.

## Lakukan
- Mulai dengan tinggi jawaban yang diharapkan (`rows="4"` untuk satu paragraf).
- Tampilkan penghitung hanya jika ada batas yang perlu diketahui.

## Hindari
- Mengizinkan pegangan seret bawaan atau menyetel tinggi tetap yang sangat kecil; ukuran kotak ditentukan oleh rows.
- Memakai textarea untuk satu nilai yang diharapkan muat dalam satu baris.

## Perilaku (HTML biasa)
Tidak ada. Perbarui teks `.counter` saat `input` di kode Anda sendiri.

## Terkait
[Text field](text-field.md) · [Composer](composer.md) · [Form layout](form-layout.md) · [Inline edit](inline-edit.md)
