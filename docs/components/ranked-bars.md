# Ranked bars

Kelompok: Grafik. https://lampung.kartadinata.app/docs/components/ranked-bars

Baris berisi label, batang horizontal, dan nilainya, diurutkan dari yang terpanjang: sumber teratas, halaman teratas, skor terbaik. Label panjang tetap terbaca karena berada di samping (atau di dalam) batang, bukan di bawahnya, dan setiap baris berbagi satu grid sehingga batang dan nilai sejajar.

## Pakai saat
- Memeringkat 3 sampai 10 hal bernama menurut satu nilai: sumber kunjungan, halaman, layanan, petugas, kecamatan.
- Nama kategorinya panjang atau banyak ("Situs kelurahan", "/layanan/ktp-elektronik"), yang harus diputar jika memakai batang vertikal.
- Papan peringkat: urutan, siapa, dan skornya, dengan batang untuk memberi gambaran cepat tentang selisihnya.

## Pakai yang lain saat
- Kategori yang punya urutan sendiri (hari, bulan): pakai [Bar chart](bar-chart.md).
- Kemajuan tiap item menuju targetnya sendiri: pakai [Target bar](target-bar.md).
- Bagian yang berjumlah satu keseluruhan: pakai [Percentage bar](percentage-bar.md).
- Banyak data yang dibandingkan pada beberapa atribut: pakai [Table](table.md).
- Tahap alur ketika tiap tahap mempertahankan sebagian dari tahap sebelumnya: pakai [Funnel](funnel.md).

## Letaknya
Di [kartu grafik](chart-card.md), setengah lebar di dasbor. Di bawah 480 px batang pindah ke bawah label dan nilainya, selebar kartu. Atur `--label-w` pada `.hbars` untuk mengubah kolom label (default 140 px).

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.hbars` | Wajib. Grid-nya: kolom label, kolom batang, kolom nilai. `role="list"` jika barisnya adalah peringkat. |
| `.hbar` | Wajib. Satu baris; subgrid dari `.hbars`, sehingga nilai sejajar antarbaris. `.is-top` menandai yang teratas. |
| `.hbar__label` | Wajib. Namanya; boleh diawali `.hbar__rank`, `.hbar__media` (tile ikon atau `.avatar`) dan membawa baris `.hbar__sub`. |
| `.hbar__track > .hbar__fill` | Wajib. Track 10 px; `--v` mengatur isinya sebagai persen dari nilai terbesar. |
| `.hbar__val` | Wajib. Nilainya, tabular; boleh memuat [trend delta](trend-delta.md). |
| `.hbars--inside` | Varian. Batang tint 36 px dengan label di dalamnya, untuk label panjang di kartu sempit. |
| `.hbars--muted` | Varian. Semua batang kecuali `.is-top` memudar ke warna tint. |

## Markup

**Sumber teratas dengan perubahannya.** Ikon, nama, batang, jumlah kunjungan, dan perubahannya dibanding bulan lalu. Arahkan kursor ke satu baris untuk menonjolkannya. Batang tumbuh saat pertama terlihat.
```html
<section class="chart-card" style="max-width: 560px;" aria-labelledby="rb-src">
  <div><div class="chart-card__q" id="rb-src">Dari mana pengunjung portal layanan datang?</div><div class="chart-card__sub">Kunjungan menurut sumber, November</div></div>
  <div class="hbars" role="list" data-lds-grow aria-label="Kunjungan menurut sumber">
  <div role="listitem" class="hbar is-top"><span class="hbar__label"><span class="hbar__media" aria-hidden="true"><span class="ic">search</span></span><span>Mesin pencari</span></span><span class="hbar__track"><span class="hbar__fill" style="--v: 100.0%;"></span></span><span class="hbar__val">4.210<span class="delta delta--good"><span class="ic" aria-hidden="true">arrow_upward</span>12%<span class="sr-only"> naik</span></span></span></div>
  <div role="listitem" class="hbar"><span class="hbar__label"><span class="hbar__media" aria-hidden="true"><span class="ic">mail</span></span><span>Buletin email</span></span><span class="hbar__track"><span class="hbar__fill" style="--v: 56.5%;"></span></span><span class="hbar__val">2.380<span class="delta delta--good"><span class="ic" aria-hidden="true">arrow_upward</span>4%<span class="sr-only"> naik</span></span></span></div>
  <div role="listitem" class="hbar"><span class="hbar__label"><span class="hbar__media" aria-hidden="true"><span class="ic">location_city</span></span><span>Situs kelurahan</span></span><span class="hbar__track"><span class="hbar__fill" style="--v: 40.6%;"></span></span><span class="hbar__val">1.710<span class="delta delta--bad delta--down"><span class="ic" aria-hidden="true">arrow_upward</span>6%<span class="sr-only"> turun</span></span></span></div>
  <div role="listitem" class="hbar"><span class="hbar__label"><span class="hbar__media" aria-hidden="true"><span class="ic">share</span></span><span>Media sosial</span></span><span class="hbar__track"><span class="hbar__fill" style="--v: 22.8%;"></span></span><span class="hbar__val">960<span class="delta delta--good"><span class="ic" aria-hidden="true">arrow_upward</span>21%<span class="sr-only"> naik</span></span></span></div>
  <div role="listitem" class="hbar"><span class="hbar__label"><span class="hbar__media" aria-hidden="true"><span class="ic">link</span></span><span>Langsung</span></span><span class="hbar__track"><span class="hbar__fill" style="--v: 15.2%;"></span></span><span class="hbar__val">640<span class="delta delta--bad delta--down"><span class="ic" aria-hidden="true">arrow_upward</span>2%<span class="sr-only"> turun</span></span></span></div>
  </div>
</section>
```

**Papan peringkat.** Urutan, avatar, dan unit layanan di bawah nama; satu warna yang tenang agar selisihnya yang bercerita.
```html
<section class="chart-card" style="max-width: 560px;" aria-labelledby="rb-lead">
  <div><div class="chart-card__q" id="rb-lead">Petugas mana yang paling dinilai baik?</div><div class="chart-card__sub">Skor kepuasan warga dari 100, lima teratas, triwulan ini</div></div>
  <div class="hbars" role="list" data-lds-grow style="--label-w: 220px;" aria-label="Lima skor kepuasan teratas">
  <div role="listitem" class="hbar"><span class="hbar__label"><span class="hbar__rank">1</span><span class="avatar avatar--gray hbar__media" aria-hidden="true">NP</span><span><span>Nadia Putri</span><span class="hbar__sub">Loket izin usaha</span></span></span><span class="hbar__track"><span class="hbar__fill" style="--v: 96%;"></span></span><span class="hbar__val">96</span></div>
  <div role="listitem" class="hbar"><span class="hbar__label"><span class="hbar__rank">2</span><span class="avatar avatar--gray hbar__media" aria-hidden="true">RH</span><span><span>Rizky Hartono</span><span class="hbar__sub">Loket KTP</span></span></span><span class="hbar__track"><span class="hbar__fill" style="--v: 91%;"></span></span><span class="hbar__val">91</span></div>
  <div role="listitem" class="hbar"><span class="hbar__label"><span class="hbar__rank">3</span><span class="avatar avatar--gray hbar__media" aria-hidden="true">ML</span><span><span>Mei Lin Tan</span><span class="hbar__sub">Loket izin usaha</span></span></span><span class="hbar__track"><span class="hbar__fill" style="--v: 88%;"></span></span><span class="hbar__val">88</span></div>
  <div role="listitem" class="hbar"><span class="hbar__label"><span class="hbar__rank">4</span><span class="avatar avatar--gray hbar__media" aria-hidden="true">DS</span><span><span>Dimas Saputra</span><span class="hbar__sub">Layanan pengaduan</span></span></span><span class="hbar__track"><span class="hbar__fill" style="--v: 84%;"></span></span><span class="hbar__val">84</span></div>
  <div role="listitem" class="hbar"><span class="hbar__label"><span class="hbar__rank">5</span><span class="avatar avatar--gray hbar__media" aria-hidden="true">AL</span><span><span>Ayu Lestari</span><span class="hbar__sub">Loket KTP</span></span></span><span class="hbar__track"><span class="hbar__fill" style="--v: 79%;"></span></span><span class="hbar__val">79</span></div>
  </div>
</section>
```

**Label di dalam, mengganti periode.** Alamat halaman yang panjang muat di dalam batang tint. Ganti periodenya: batang bergerak ke panjang barunya selama 480 ms.
```html
<div class="hbars hbars--inside" role="list" aria-label="Tayangan per halaman">
  <div role="listitem" class="hbar is-top"><span class="hbar__track"><span class="hbar__fill" style="--v: 100%;"></span><span class="hbar__label">/layanan/ktp-elektronik</span></span><span class="hbar__val">3.120</span></div>
  …
</div>
```

## Varian dan ukuran
| Kelas atau atribut | Kapan |
|---|---|
| `.hbar__media` | Tile ikon (sumber, layanan) atau `.avatar` (orang) sebelum nama. |
| `.hbar__rank` | Nomor urut untuk papan peringkat. |
| `.hbar__sub` | Baris kedua di bawah nama: unit, kategori, jumlah kunjungan. |
| `.hbars--inside` | Label di dalam batang tint 36 px; yang teratas mendapat tepi aksen 3 px. |
| `.hbars--muted` | Hanya yang teratas memakai warna seri. |
| `--label-w` | Lebar kolom label pada `.hbars`. |

## Status
| Status | Caranya |
|---|---|
| `hover` | Baris di bawah kursor tetap, yang lain memudar ke 55 %. |
| `data change` | Atur nilai `--v` baru: isi batang bergerak selama 480 ms dengan `--ease-inout`. Urutkan ulang hanya setelah geraknya selesai, atau jangan sama sekali selagi orang membaca. |
| `loading` | Lima baris `.skel`: blok label dan strip 10 px. |
| `empty` | Pertahankan judul; satu baris yang menyebut tidak ada kunjungan pada periode itu. |

## Gerak dan mikrointeraksi
- Saat pertama terlihat (`data-lds-grow`): isi batang tumbuh dari nol dengan `--spring-smooth` (560 ms), berjarak 35 ms dari baris teratas.
- Perubahan nilai: lebar berubah selama `--d-considered` dengan `--ease-inout`, dari lebar saat ini.
- Efek pudar hover selama `--d-fast`. Reduced motion: nilai berganti dalam 120 ms, tanpa stagger.

## Aksesibilitas
- Pakai `role="list"` pada `.hbars` dan `role="listitem"` pada baris jika urutannya yang penting; label dan nilai adalah teks asli, jadi daftar terbaca "Mesin pencari, 4.210, 12% naik".
- Batang adalah dekorasi di atas nilainya; tidak perlu label tambahan.
- Delta membawa kata "naik" atau "turun" dalam teks `.sr-only`.

## Lakukan
- Urutkan dari yang terpanjang; sebutkan periodenya di subjudul.
- Skalakan setiap batang terhadap nilai terbesar di set itu, atau terhadap maksimum tetap seperti 100 untuk skor.

## Hindari
- Memberi setiap batang warnanya sendiri.
- Memotong sumbu batang di atas nol.
- Menampilkan lebih dari sepuluh baris; tambahkan tautan ke tabel lengkap.

## Perilaku (HTML biasa)
Opsional: `data-lds-grow` pada `.hbars` (atau kartunya) memutar animasi masuk saat pertama terlihat. Nilai berubah dengan mengatur `--v` di setiap isi batang.

## Terkait
[Bar chart](bar-chart.md) · [Target bar](target-bar.md) · [Funnel](funnel.md) · [Chart card](chart-card.md)
