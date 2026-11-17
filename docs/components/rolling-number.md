# Rolling number

Kelompok: Tampilan data. https://lampung.kartadinata.app/docs/components/rolling-number

Angka yang setiap digitnya bergeser ke nilai barunya dengan spring yang halus, seperti odometer. Untuk hitungan yang berubah saat orang sedang melihatnya.

## Pakai saat
- Hitungan yang berubah di depan orang: suka, nomor antrean terambil, nilai stepper, kursi bus kota yang dipesan.
- Angka langsung yang naik atau turun selama halaman terbuka.

## Pakai yang lain saat
- Angka yang menghitung naik dari nol sekali saat pertama muncul: pakai [Number count](number-count.md).
- Hitung mundur ke tenggat: pakai [Timer](timer.md).
- Angka statis: pakai [Stat row](stat-row.md). Tulis sebagai teks dengan angka tabular.
- Angka yang diketik atau dinaik-turunkan orang: pakai [Number stepper](number-stepper.md). Stepper sudah memakai rolling number untuk nilainya.

## Letaknya
Sebaris di dalam teks atau kontrol pemilik angka itu: tombol suka, stepper, nilai statistik, badge antrean. Mewarisi font, ukuran, dan warna dari induknya.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.roll` | Wajib. Kotak sebaris setinggi 1,2 em yang memotong kolomnya. Angka tabular. |
| `[data-lds-roll]` | Nilai awal. `init()` membangun kolom darinya. |
| `.roll__col` | Satu kolom per digit berisi digit 0 sampai 9, digeser dengan `transform`. Dibangun oleh JS; `aria-hidden`. |

## Markup

**Nomor antrean terambil.** Tiket antrean yang terambil hari ini di loket layanan kecamatan. Setiap digit bergeser ke tempat barunya. Tekan tombolnya.
```html
<span class="roll" role="img" data-lds-roll="128"></span>
<script type="module">
  import { setRoll } from 'lampung-design-system/js';
  setRoll(document.querySelector('.roll'), 129);
</script>
```

**Di dalam kontrol.** Tombol suka menggulirkan hitungannya; stepper menggulirkan nilainya.
```html
<button class="like" aria-pressed="false" data-lds-like aria-label="Suka"><span class="like__heart"><span class="ic" aria-hidden="true">favorite</span></span><span class="roll" data-lds-roll="24"></span></button>
```

## Status
| Status | Caranya |
|---|---|
| `value` | `setRoll(el, value)` memasang `aria-label`, menambah atau menghapus kolom, dan menggeser masing-masing ke digitnya. |

## Gerak dan mikrointeraksi
- Setiap kolom bergerak dengan `transform: translateY()` memakai `--spring-smooth` (`--d-smooth`, 560 ms), jadi 128 ke 175 menggulirkan puluhan dan satuan bersamaan sementara ratusan diam.
- Ini transition: nilai baru di tengah gulir mengarah ulang dari posisi digit saat itu.
- Kolom yang ditambah atau dihapus (99 ke 100) muncul dan hilang seketika.
- Reduced motion: perubahan linear 120 ms.

## Aksesibilitas
- Kolomnya `aria-hidden`; `setRoll` menulis nilainya ke `aria-label` pada `.roll`. `span` biasa berlabel tidak dibaca semua pembaca layar, jadi beri `.roll` `role="img"` bila berdiri sendiri, atau andalkan label kontrol di sekitarnya.
- Jangan jadikan live region. Bila perubahannya penting, umumkan sekali di baris `role="status"` ("129 kursi terisi").

## Lakukan
- Pakai untuk hitungan yang berubah di depan mata, bukan untuk setiap angka di halaman.
- Biarkan ukuran dan ketebalannya mewarisi teks di sekitarnya.

## Hindari
- Memberikan pemisah ribuan, tanda, atau desimal: yang digulir hanya digit. Format "1.280" atau "-3" sebagai teks.
- Menggulirkan angka saat halaman pertama dimuat; pakai [number count](number-count.md) sekali, atau tidak sama sekali.

## Perilaku (HTML biasa)
`data-lds-roll="128"` membangun kolom saat `init()`. `setRoll(el, value)` menggulir ke nilai baru (hanya digit 0 sampai 9).

## Terkait
[Number count](number-count.md) · [Number stepper](number-stepper.md) · [Like](like.md) · [Stat row](stat-row.md)
