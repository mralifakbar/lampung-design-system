# Plans

Kelompok: Promosi. https://lampung.kartadinata.app/docs/components/plans

Paket harga sebagai card, dengan kontrol periode pembayaran di atasnya. Harga bergulir saat periode atau jumlah peserta berubah; penghematannya disebut dengan kata-kata di samping kontrol.

## Pakai saat
- Halaman atau bagian tarif dengan dua sampai empat paket.
- Paket yang dibayar bulanan atau tahunan, atau per orang, saat orang membandingkan total sebelum memilih.

## Pakai yang lain saat
- Satu paket dipilih di dalam formulir pembayaran atau pengaturan: pakai [Radio card](radio-card.md).
- Membandingkan semua fitur antarpaket: pakai [Compare table](compare-table.md).
- Satu harga dalam kalimat: pakai [Prose](prose.md).

## Letaknya
Di dalam [marketing section](marketing-section.md) dengan head di tengah. Kontrol `.billing` di tengah di atas `.plans`; card mengisi grid yang terlipat di bawah 280 px per card. Lanjutkan dengan [compare table](compare-table.md) dan pertanyaan yang biasa diajukan sebelum memilih.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `[data-lds-billing]` | Pada section yang berisi kontrol dan harga. Memasang perubahan periode dan jumlah peserta. |
| `.billing` | Baris berisi [segmented control](segmented-control.md) dengan tombol `[data-billing="month|year"]` dan `.billing__save`. |
| `.plans` | Wajib. Grid paket. |
| `article.plan` | Wajib. Satu paket di atas isian tenang. `plan--featured` ada di atas kanvas dengan ring aksen 2 px: pakai untuk paket yang cocok bagi kebanyakan orang, atau tidak sama sekali. |
| `.plan__head` | `h3.plan__name` dan `p.plan__desc` (untuk siapa paket ini). |
| `.plan__price` | `.plan__amount` (dengan `.plan__currency` dan `.roll`) dan `.plan__period`. |
| `.roll[data-price-month][data-price-year]` | Harga per periode; tambahkan `data-per-seat` untuk mengalikannya dengan stepper paket. |
| `.plan__note` | Satu baris rincian pembayaran ("Rp 3.600.000 sekali setahun"). |
| `.plan__seats` | Baris opsional dengan [number stepper](number-stepper.md) untuk jumlah peserta. |
| `.plan__list-head, ul.plan__list` | Apa saja yang termasuk, setiap item dengan ikon `check`. |
| `.plan__cta` | Tombol paket, terdorong ke bawah agar tombol-tombol sejajar. |
| `[data-billing-month][data-billing-year]` | Teks apa pun yang bergantung pada periode; `{seats}` dan `{total}` (dengan `data-total-year`) diisi otomatis. Pada elemen `.morph` kata-katanya berubah bentuk. |

## Markup

**Bulanan atau tahunan, dengan jumlah peserta.** Sewa tempat usaha dari kantor pasar kota fiktif. Ganti periode dan ubah jumlah lapak: harga bergulir, kata-kata berubah bentuk.
```html
<div data-lds-billing style="width: 100%;">
  <div class="billing">
    <div class="seg seg--lg" role="group" aria-label="Periode pembayaran" data-lds-segmented><span class="seg__thumb"></span><button class="seg__btn" aria-pressed="true" data-billing="month">Bulanan</button><button class="seg__btn" aria-pressed="false" data-billing="year">Tahunan</button></div>
    <span class="billing__save">Bayar tahunan hemat 2 bulan</span>
  </div>
  <div class="plans">
    <article class="plan plan--featured" aria-labelledby="pl-1">
      <div class="plan__head"><h3 class="plan__name" id="pl-1">Kios</h3><p class="plan__desc">Satu kios tertutup di Pasar Tugu, Tanjung Karang Timur.</p></div>
      <div class="plan__price"><span class="plan__amount"><span class="plan__currency">Rp</span><span class="roll" data-price-month="360" data-price-year="300" data-lds-roll-label="{n} ribu rupiah per bulan"></span></span><span class="plan__period morph" data-lds-morph data-billing-month="ribu per bulan" data-billing-year="ribu per bulan, dibayar tahunan">ribu per bulan</span></div>
      <ul class="plan__list"><li><span class="ic" aria-hidden="true">check</span>Sudah termasuk meteran listrik dan air</li><li><span class="ic" aria-hidden="true">check</span>Angkut sampah setiap hari</li></ul>
      <div class="plan__cta"><button class="btn btn--primary btn--block">Ajukan sewa kios</button></div>
    </article>
    <article class="plan" aria-labelledby="pl-2">
      <div class="plan__head"><h3 class="plan__name" id="pl-2">Lapak bazar UMKM</h3><p class="plan__desc">Lapak terbuka untuk kelompok usaha lokal di bazar hari Sabtu.</p></div>
      <div class="plan__price"><span class="plan__amount"><span class="plan__currency">Rp</span><span class="roll" data-per-seat data-price-month="30" data-price-year="25" data-lds-roll-label="{n} ribu rupiah per bulan"></span></span><span class="plan__period morph" data-lds-morph data-billing-month="ribu per bulan untuk {seats} lapak" data-billing-year="ribu per bulan untuk {seats} lapak">ribu per bulan untuk 10 lapak</span></div>
      <div class="plan__seats"><span id="pl-s">Lapak</span><div class="stepper-field" role="group" aria-labelledby="pl-s" data-lds-stepper data-min="5" data-max="200" data-value="10"><button aria-label="Kurangi lapak"><span class="ic" aria-hidden="true">remove</span></button><span class="stepper-field__value"><span class="roll" aria-live="polite"></span></span><button aria-label="Tambah lapak"><span class="ic" aria-hidden="true">add</span></button></div></div>
      <div class="plan__cta"><button class="btn btn--secondary btn--block">Minta rincian untuk kelompok</button></div>
    </article>
  </div>
</div>
```

## Varian dan ukuran
| Kelas atau atribut | Kapan |
|---|---|
| `plan--featured` | Satu paket yang dibutuhkan kebanyakan orang: warna kanvas, ring aksen 2 px. Paling banyak satu. |

## Status
| Status | Caranya |
|---|---|
| `month / year` | `data-period` pada elemen billing mencerminkan pilihannya; `lds:billing` dipicu dengan `{ period }`. |
| `seats` | Stepper di dalam paket mengalikan harga `data-per-seat` paket itu. |

## Gerak dan mikrointeraksi
- Harga adalah [rolling number](rolling-number.md): setiap kolom digit bergeser dengan `--spring-smooth` (560 ms). Perubahan jumlah digit digambar ulang tanpa bergulir.
- Kata-kata periode berubah huruf demi huruf dengan [text morph](text-morph.md); thumb seg bergeser dengan `--spring-smooth`.
- Reduced motion: digit dan kata langsung berganti.

## Aksesibilitas
- Setiap paket adalah `article` yang diberi label oleh namanya. Harga mendapat label lisan dari `data-lds-roll-label` ("360 ribu rupiah per bulan").
- Kontrol periode adalah grup tombol toggle dengan `aria-pressed`; tombol panah berpindah di antaranya.
- Ring unggulan bukan satu-satunya sinyal: deskripsi dan tombol utama menyebut untuk siapa paket itu.

## Lakukan
- Tampilkan total tahunan di catatan, tidak hanya setara bulanannya.
- Sejajarkan tombol di bagian bawah setiap card.
- Tampilkan paket sebanyak yang memang ada.

## Hindari
- Menambah pil "Paling populer" tanpa alasan.
- Menyembunyikan harga atau periode di cetakan kecil.
- Memakai ring aksen pada lebih dari satu paket.

## Perilaku (HTML biasa)
`data-lds-billing` pada elemen yang berisi tombol periode dan harga. Tombol `[data-billing="month|year"]` (di dalam `[data-lds-segmented]`); harga `.roll[data-price-month][data-price-year]` (`data-per-seat` mengalikan dengan `[data-lds-stepper]` di `.plan` yang sama); teks `[data-billing-month][data-billing-year]` dengan `{seats}` dan `{total}` (`data-total-month|year` kali jumlah peserta). Memancarkan `lds:billing` dengan `{ period }`.

## Terkait
[Compare table](compare-table.md) · [Radio card](radio-card.md) · [Rolling number](rolling-number.md) · [Segmented control](segmented-control.md)
