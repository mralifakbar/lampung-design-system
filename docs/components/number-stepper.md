# Number stepper

Kelompok: Input. https://lampung.kartadinata.app/docs/components/number-stepper

Tombol minus dan plus di sekitar bilangan bulat kecil yang digitnya bergulir ke nilai baru. Untuk jumlah yang diubah orang satu atau dua, di dalam rentang yang diketahui.

## Pakai saat
- Jumlah kecil dengan batas yang jelas: kursi yang dipesan, tiket, anggota rombongan, jumlah antrean.
- Sebagian besar perubahan hanya satu atau dua langkah dari bawaan yang masuk akal.

## Pakai yang lain saat
- Jumlah uang apa pun, atau nilai yang bisa besar: pakai [Amount field](amount-field.md).
- Posisi pada skala (volume, tingkat kesulitan): pakai [Slider](slider.md).
- Memilih di antara beberapa jumlah tetap (1, 2, 3 sesi seminggu): pakai [Segmented control](segmented-control.md). Atau [chips](chips.md) untuk lebih dari lima.
- Menampilkan angka yang berubah sendiri (skor langsung, hitungan): pakai [Rolling number](rolling-number.md).

## Letaknya
Di formulir di samping labelnya, atau di akhir baris daftar (baris pesanan, baris peserta). Ia menjaga lebarnya sendiri (sekitar 140 px) dan tidak pernah melebar.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.stepper-field` | Wajib. Kotak berbentuk pil 44 px, `role="group"` dengan `aria-labelledby` yang menunjuk ke label. Membawa `data-lds-stepper` dengan `data-min`, `data-max`, `data-value`. |
| `button (first)` | Wajib. Kurangi, dengan `aria-label` ("Kurangi kursi") dan ikon `remove`. 44 kali 44. |
| `.stepper-field__value > .roll` | Wajib. Angkanya, sebagai digit bergulir, di dalam span `aria-live="polite"`. |
| `button (last)` | Wajib. Tambah, dengan `aria-label` ("Tambah kursi") dan ikon `add`. |

## Markup

**Kursi yang dipesan.** Digit bergulir ke nilai baru; minus nonaktif di batas bawah dan plus di batas atas. Tekan cepat untuk melihat kolom digit bergerak.
```html
<div class="field" style="max-width: 320px;">
  <span class="field__label" id="ns-seat">Kursi yang dipesan</span>
  <div class="stepper-field" role="group" aria-labelledby="ns-seat" data-lds-stepper data-min="1" data-max="40" data-value="12">
    <button type="button" aria-label="Kurangi kursi"><span class="ic" aria-hidden="true">remove</span></button>
    <span class="stepper-field__value"><span class="roll" aria-live="polite"></span></span>
    <button type="button" aria-label="Tambah kursi"><span class="ic" aria-hidden="true">add</span></button>
  </div>
  <span class="field__help">1 sampai 40 kursi per pemesanan.</span>
</div>
```

**Di akhir baris daftar.** Jumlah kecil per baris, seperti peserta per sesi.
```html
<div class="list" style="max-width: 440px; width: 100%;">
  <div class="lrow"><span class="lrow__body"><span class="lrow__title" id="ns-r1">Penyuluhan UMKM hari Sabtu, ruang A</span></span>
    <div class="stepper-field" role="group" aria-labelledby="ns-r1" data-lds-stepper data-min="0" data-max="6" data-value="2">
      <button type="button" aria-label="Kurangi satu orang"><span class="ic" aria-hidden="true">remove</span></button>
      <span class="stepper-field__value"><span class="roll" aria-live="polite"></span></span>
      <button type="button" aria-label="Tambah satu orang"><span class="ic" aria-hidden="true">add</span></button>
    </div>
  </div>
</div>
```

## Status
| Status | Caranya |
|---|---|
| `at min / max` | Tombol yang sesuai mendapat `disabled` (samar, tanpa event pointer), disetel oleh JS. |
| `hover / active` | Tombol berwarna saat hover dan mengecil ke 0.88 saat ditekan, memantul kembali dengan `--spring-snappy`. |

## Gerak dan mikrointeraksi
- Setiap digit adalah kolom 0 sampai 9 yang bergeser ke nilainya dengan `transform` memakai `--spring-smooth` (560 ms). Tekanan di tengah perjalanan mengubah tujuan dari posisinya saat itu, jadi ketukan cepat tidak pernah mengantre.
- Tombol: `scale(0.88)` pada `:active`, kembali dengan `--spring-snappy` (360 ms); warna latar dalam `--d-fast`.
- Reduced motion: digit bergerak dalam 120 ms linear, terbaca sebagai pergantian angka tanpa perjalanan.

## Aksesibilitas
- Pembungkus adalah `role="group"` yang dilabeli oleh label terlihat; setiap tombol punya `aria-label` sendiri yang menyebut satuannya.
- Span nilai adalah `aria-live="polite"` dan `setRoll` menyetel `aria-label`-nya ke angka itu, sehingga setiap perubahan dibacakan sekali.
- Beri kedua tombol `type="button"`: di dalam `<form>`, `<button>` polos akan mengirim formulir.
- Tidak ada input tersembunyi: saat nilainya bagian dari formulir, salin ke `<input type="hidden">` saat `lds:change`.

## Lakukan
- Mulai dari nilai yang paling umum dan buat rentangnya sempit.
- Sebut satuannya di label tombol ("Tambah kursi").

## Hindari
- Memakai stepper untuk nilai di atas sekitar 50, atau untuk uang.
- Menulis pasangan minus/plus sendiri dengan angka biasa; digit bergulir itulah komponennya.

## Perilaku (HTML biasa)
`data-lds-stepper` dengan `data-min` (bawaan 0), `data-max` (bawaan 99), dan `data-value`: tombol pertama dan terakhir melangkah satu, `.roll` diperbarui lewat `setRoll`, tombol nonaktif di batas, dan `lds:change` dipicu dengan `{ value }`. `setRoll(el, n)` menggulirkan `.roll` mana pun ke sebuah angka.

## Terkait
[Amount field](amount-field.md) · [Rolling number](rolling-number.md) · [Slider](slider.md) · [Number count](number-count.md)
