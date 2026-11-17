# Progress ring

Kelompok: Umpan balik. https://lampung.kartadinata.app/docs/components/progress-ring

Track melingkar dengan nilai digambar sebagai busur dan angka di tengah. Untuk tempat yang ringkas dan skor yang dinilai; sebutkan juga penilaiannya dengan kata-kata.

## Pakai saat
- Skor atau tingkat penyelesaian yang harus muat dalam kotak: skor standar layanan di card, kelengkapan berkas di profil, target hari ini di layar beranda ponsel.
- Skor yang dinilai, saat warnanya menunjukkan memenuhi, nyaris, atau belum memenuhi (`ring--success|warning|danger`), selalu dengan kata-kata di sampingnya.
- Tugas dengan kemajuan di dalam tile atau baris list ketika bar terlalu lebar.

## Pakai yang lain saat
- Ada ruang untuk garis, atau kemajuannya milik tugas yang panjang: pakai [Progress bar](progress-bar.md).
- Tingkat atau kapasitas dalam segmen (penyimpanan, kekuatan): pakai [Meter](meter.md).
- Bagian dari keseluruhan lintas beberapa kategori: pakai [Donut](donut.md).
- Angkanya sendiri yang penting, dalam deretan angka kunci: pakai [Stat row](stat-row.md).
- Tidak ada nilai terukur, hanya menunggu: pakai [Spinner](spinner.md).

## Letaknya
Di samping label yang diukurnya: di awal card, di baris list sebelum judul, di header hasil di samping keputusannya. Bawaan 64 px; 40 sampai 48 px di baris; jangan lebih besar dari 120 px (lebih dari itu [stat row](stat-row.md) atau grafik lebih mudah dibaca).

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.ring` | Wajib. Kotak 64 x 64. Atur `width` dan `height` secara inline untuk ukuran lain; ketebalan garis ikut berskala. |
| `svg[viewBox="0 0 64 64"]` | Wajib. Diputar agar busur dimulai dari arah jam 12. |
| `circle.ring__track` | Wajib. `cx="32" cy="32" r="27"`: track abu-abu penuh. |
| `circle.ring__val` | Wajib. Lingkaran yang sama dengan `stroke-dasharray="169.6"` (keliling, 2 x pi x 27) dan `stroke-dashoffset="169.6 x (1 - value)"`. |
| `.ring__label` | Angka opsional di tengah ring, angka tabular. |
| `.ring--success|warning|danger` | Mewarnai busur untuk skor yang dinilai. Bawaannya aksen. |

## Markup

**Skor dengan keputusan.** Skor standar layanan dari penilaian kantor kelurahan. Warna mendukung kata-kata; tidak pernah menggantikannya.
```html
<div class="docs-row" style="gap: 28px;">
  <div class="docs-row"><div class="ring ring--success" role="img" aria-label="Skor 86 dari 100, memenuhi standar"><svg viewBox="0 0 64 64" aria-hidden="true"><circle class="ring__track" cx="32" cy="32" r="27"></circle><circle class="ring__val" cx="32" cy="32" r="27" stroke-dasharray="169.6" stroke-dashoffset="23.7"></circle></svg><span class="ring__label" aria-hidden="true">86</span></div><div><div class="card__title">Memenuhi standar</div><div class="card__sub">Batas minimal 65</div></div></div>
  <div class="docs-row"><div class="ring ring--warning" role="img" aria-label="Skor 62 dari 100, sedikit di bawah batas minimal"><svg viewBox="0 0 64 64" aria-hidden="true"><circle class="ring__track" cx="32" cy="32" r="27"></circle><circle class="ring__val" cx="32" cy="32" r="27" stroke-dasharray="169.6" stroke-dashoffset="64.4"></circle></svg><span class="ring__label" aria-hidden="true">62</span></div><div><div class="card__title">Sedikit di bawah</div><div class="card__sub">Kurang 3 poin</div></div></div>
  <div class="docs-row"><div class="ring ring--danger" role="img" aria-label="Skor 38 dari 100, belum memenuhi standar"><svg viewBox="0 0 64 64" aria-hidden="true"><circle class="ring__track" cx="32" cy="32" r="27"></circle><circle class="ring__val" cx="32" cy="32" r="27" stroke-dasharray="169.6" stroke-dashoffset="105.2"></circle></svg><span class="ring__label" aria-hidden="true">38</span></div><div><div class="card__title">Belum memenuhi</div><div class="card__sub">Penilaian ulang 2 Desember</div></div></div>
</div>
```

**Kemajuan tugas yang bergerak.** Busur bergerak halus ke setiap nilai baru. Tekan tombolnya.
```html
<div class="ring" role="progressbar" aria-label="Laporan ditindaklanjuti minggu ini" aria-valuemin="0" aria-valuemax="100" aria-valuenow="40">
  <svg viewBox="0 0 64 64" aria-hidden="true">
    <circle class="ring__track" cx="32" cy="32" r="27"></circle>
    <circle class="ring__val" cx="32" cy="32" r="27" stroke-dasharray="169.6" stroke-dashoffset="101.8"></circle>
  </svg>
  <span class="ring__label">40</span>
</div>
```

**Kecil, di baris list.** Pada 40 px, atur ukurannya secara inline dan kecilkan labelnya juga.
```html
<div class="list" style="max-width: 420px;">
  <div class="lrow"><div class="ring" style="width: 40px; height: 40px;" role="img" aria-label="75 persen selesai"><svg viewBox="0 0 64 64" aria-hidden="true"><circle class="ring__track" cx="32" cy="32" r="27"></circle><circle class="ring__val" cx="32" cy="32" r="27" stroke-dasharray="169.6" stroke-dashoffset="42.4"></circle></svg><span class="ring__label" style="font-size: 12px;" aria-hidden="true">75</span></div><div class="lrow__body"><div class="lrow__title">Verifikasi data penerima bansos</div><div class="lrow__sub">15 dari 20 KK</div></div></div>
  <div class="lrow"><div class="ring" style="width: 40px; height: 40px;" role="img" aria-label="30 persen selesai"><svg viewBox="0 0 64 64" aria-hidden="true"><circle class="ring__track" cx="32" cy="32" r="27"></circle><circle class="ring__val" cx="32" cy="32" r="27" stroke-dasharray="169.6" stroke-dashoffset="118.7"></circle></svg><span class="ring__label" style="font-size: 12px;" aria-hidden="true">30</span></div><div class="lrow__body"><div class="lrow__title">Survei jalan rusak Kedaton</div><div class="lrow__sub">6 dari 20 titik</div></div></div>
</div>
```

## Varian dan ukuran
| Kelas atau atribut | Kapan |
|---|---|
| `ring` | Busur aksen. Kemajuan tanpa penilaian. |
| `ring--success` | Lulus, sesuai jalur. |
| `ring--warning` | Nyaris, perlu perhatian. |
| `ring--danger` | Gagal atau jauh tertinggal. |

## Status
| Status | Caranya |
|---|---|
| `value` | `stroke-dashoffset` = 169.6 x (1 - value / max) pada `.ring__val`. |
| `empty` | Offset 169.6: hanya track yang tampil. Tulis "Belum dimulai" di sampingnya. |
| `complete` | Offset 0. Pertimbangkan `ring--success` dan satu kata ("Selesai"). |

## Gerak dan mikrointeraksi
- Busur bergerak lewat `stroke-dashoffset` dengan `--ease-inout` selama `--d-considered` (480 ms), sebagai transition, jadi nilai baru berganti target dari posisi saat itu.
- `Ring` di React juga menghitung naik angkanya sekali selama 900 ms dengan ease-out cubic; dengan reduced motion nilainya langsung tampil.
- Dengan reduced motion perubahan busur menjadi perubahan linear 120 ms.

## Aksesibilitas
- Skor adalah gambar dari sebuah angka: `role="img"` dengan `aria-label` yang menyebut angka dan keputusannya ("Skor 86 dari 100, memenuhi standar"), dan `aria-hidden` pada label yang terlihat.
- Kemajuan tugas langsung: `role="progressbar"` dengan `aria-valuemin`, `aria-valuemax`, `aria-valuenow` dan nama.
- SVG memakai `aria-hidden="true"`. Jangan biarkan warna ring menjadi satu-satunya sinyal; tulis keputusannya di samping.

## Lakukan
- Tulis keputusannya dengan kata-kata di samping ring berwarna.
- Isi label hanya dengan angka; letakkan satuan dan konteks di luar.
- Pakai r = 27 dan dasharray 169.6 agar setiap ring di produk tergambar sama.

## Hindari
- Memakai ring untuk beberapa kategori; pakai [donut](donut.md).
- Menjadikannya grafik utama lebih dari 120 px.
- Menaruh angka tiga digit di ring 40 px tanpa mengecilkan labelnya.

## Perilaku (HTML biasa)
Tidak ada di HTML biasa: atur `stroke-dashoffset` dan label dari kode Anda.

## React
```tsx
import { Ring } from 'lampung-design-system/react';

<Ring value={86} tone="success" ariaLabel="Score 86 of 100, meets the standard" />
<Ring value={12} max={20} size={44} label="12" ariaLabel="12 of 20 households checked" />
```

## Terkait
[Progress bar](progress-bar.md) · [Meter](meter.md) · [Donut](donut.md) · [Stat row](stat-row.md)
