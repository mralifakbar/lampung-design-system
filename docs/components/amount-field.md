# Amount field

Kelompok: Input. https://lampung.kartadinata.app/docs/components/amount-field

Text field untuk uang dan angka lain yang bersatuan: mata uang atau satuannya berada di dalam kontrol sebagai teks, keyboard-nya numerik. Ketik angkanya, jangan pernah simbolnya.

## Pakai saat
- Orang mengetik jumlah uang: iuran bulanan, pembayaran, besaran bantuan, harga.
- Angka punya satuan yang harus tetap terlihat saat mengetik: %, kg, menit, hari.
- Nilainya bisa sebesar apa pun, sehingga tombol untuk menghitung naik akan terlalu lambat.

## Pakai yang lain saat
- Bilangan bulat kecil yang diubah satu atau dua (kursi, tiket, orang): pakai [Number stepper](number-stepper.md).
- Nilai pada skala yang diketahui, ketika posisi lebih penting daripada angka pastinya (volume, tingkat kesulitan): pakai [Slider](slider.md).
- Nilai minimum dan maksimum (rentang harga, rentang usia): pakai [Range slider](range-slider.md).
- Memilih salah satu dari beberapa jumlah tetap (Rp 50.000, Rp 100.000, Rp 200.000): pakai [Chips](chips.md). Atau [radio card](radio-card.md) saat setiap jumlah butuh satu baris keterangan.
- Teks bebas tanpa satuan: pakai [Text field](text-field.md).

## Letaknya
Di formulir seperti [text field](text-field.md) lainnya. Buat selebar nilai terbesar yang masuk akal ditambah satuannya, bukan selebar penuh di layar lebar (sekitar 240 px untuk jumlah rupiah). Di dalam `.form__row` ia cocok dipasangkan dengan [select](select.md) untuk periode atau mata uang.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.field / .field__label / .field__help` | Wajib. Pembungkus kolom yang sama dengan [text field](text-field.md). Teks bantuan menyebut batas dan pembulatan. |
| `.control` | Wajib. Kotak 44 px. |
| `.control__suffix (first)` | Mata uang atau awalan ("Rp", "$"), sebelum input. Bukan bagian dari nilai. |
| `input[inputmode]` | Wajib. `inputmode="numeric"` untuk jumlah bulat, `inputmode="decimal"` saat sen atau desimal diizinkan. Tetap `type="text"`. |
| `.control__suffix (last)` | Satuan atau periode opsional setelah input ("per bulan", "%", "kg"). |

## Markup

**Uang dengan mata uang dan periode.** Angka mengelompokkan ribuan saat diketik; awalan dan periode tetap di luar nilai.
```html
<div class="field">
  <label class="field__label" for="fee">Iuran bulanan</label>
  <div class="control">
    <span class="control__suffix">Rp</span>
    <input id="fee" inputmode="numeric" autocomplete="off" placeholder="0" aria-describedby="fee-help">
    <span class="control__suffix">per bulan</span>
  </div>
  <span class="field__help" id="fee-help">Dibulatkan ke ribuan terdekat.</span>
</div>
<!-- Group digits on input in your own code, and parse the digits back before sending. -->
```

**Melebihi batas.** Pesan galat menyebut batas dan saldo saat ini, sehingga perbaikannya jelas.
```html
<div class="field" style="max-width: 320px;">
  <label class="field__label" for="af-pay">Jumlah yang dicairkan</label>
  <div class="control is-invalid"><span class="control__suffix">Rp</span><input id="af-pay" inputmode="numeric" value="2.500.000" aria-invalid="true" aria-describedby="af-pay-help"></div>
  <span class="field__help field__help--error" id="af-pay-help"><span class="ic" aria-hidden="true">error</span>Saldo Anda Rp 1.840.000. Masukkan jumlah itu atau kurang.</span>
</div>
```

**Satuan selain uang.** Persen dan berat mengikuti bentuk yang sama. Desimal memakai `inputmode="decimal"`.
```html
<div class="form__row" style="max-width: 520px;">
  <div class="field"><label class="field__label" for="af-disc">Keringanan retribusi</label><div class="control"><input id="af-disc" inputmode="decimal" value="12,5"><span class="control__suffix">%</span></div></div>
  <div class="field"><label class="field__label" for="af-time">Waktu layanan per warga</label><div class="control"><input id="af-time" inputmode="numeric" value="90"><span class="control__suffix">detik</span></div></div>
</div>
```

## Status
| Status | Caranya |
|---|---|
| `focus / hover / disabled / invalid` | Sama persis dengan [text field](text-field.md): `.is-invalid` dengan `aria-invalid`, `.is-disabled` dengan `disabled`. |
| `empty` | Tampilkan placeholder `0` dalam warna redup; jangan pernah mengisi dulu jumlah sungguhan yang tidak dipilih orang. |

## Gerak dan mikrointeraksi
- Sama dengan text field: garis tepi dan halo bertransisi dalam `--d-fast` (160 ms) dengan `--ease-standard`.
- Pemisah ribuan muncul saat mengetik; jaga caret di akhir dan jangan menganimasikan digit di dalam input. Untuk jumlah yang berubah di luar kolom (total), pakai [rolling number](rolling-number.md).
- Reduced motion: transisi menjadi 120 ms linear.

## Aksesibilitas
- Tetap `type="text"` dengan `inputmode`: `type="number"` menghilangkan pengelompokan, mengubah nilai saat digulir dan memakai roda mouse, serta terbaca buruk.
- Awalan dan satuan adalah teks terlihat di area label; jika penting untuk makna, sertakan juga di label ("Iuran bulanan dalam rupiah") atau di `aria-describedby`.
- Sebut batas di teks bantuan sebelum galat terjadi ("Paling banyak Rp 5.000.000"), dihubungkan dengan `aria-describedby`.
- Urai digitnya saat dikirim; pembaca layar membacakan nilai yang dikelompokkan dengan wajar.

## Lakukan
- Kelompokkan ribuan sesuai lokal halaman (`toLocaleString`), dan urai kembali digitnya sebelum dikirim.
- Taruh periode atau satuan setelah angka ("per bulan"), mata uang sebelumnya.
- Sesuaikan lebar kolom dengan nilainya; kolom iuran tidak butuh selebar halaman.

## Hindari
- Memakai `type="number"` untuk uang.
- Membiarkan orang mengetik simbol mata uang ke dalam nilai.
- Memakai stepper untuk jumlah yang bisa mencapai jutaan.

## Perilaku (HTML biasa)
Tidak ada di sistem. Format saat `input` di kode Anda sendiri (kelompokkan digit, batasi panjang) dan urai kembali digitnya saat dikirim.

## Terkait
[Text field](text-field.md) · [Number stepper](number-stepper.md) · [Rolling number](rolling-number.md) · [Form layout](form-layout.md)
