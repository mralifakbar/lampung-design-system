# Date tile

Kelompok: Tampilan data. https://lampung.kartadinata.app/docs/components/date-tile

Blok kecil berisi bulan dan tanggal di awal baris, untuk daftar hal yang terjadi pada suatu tanggal: posyandu, Samsat keliling, tagihan jatuh tempo, acara. Orang mencari tanggal sebelum judul, jadi tanggal diletakkan paling depan.

## Pakai saat
- Daftar acara atau tenggat mendatang yang dipindai menurut hari: posyandu, sosialisasi warga, retribusi jatuh tempo.
- Kartu yang mengumumkan satu hal bertanggal: jadwal Samsat keliling berikutnya, pembayaran yang jatuh tempo.

## Pakai yang lain saat
- Memilih tanggal: pakai [Date field](date-field.md).
- Satu bulan sekilas dengan beberapa acara per hari: pakai [Calendar](calendar.md).
- Kapan sesuatu terjadi, di log atau pesan: pakai [Timestamp](timestamp.md).
- Riwayat satu catatan: pakai [Timeline](timeline.md).

## Letaknya
Sebagai elemen pertama baris daftar (`.lrow`), 12 px sebelum judul; atau di kiri atas kartu kecil. 44 kali 48 px, tidak pernah lebih besar.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `time.datetile` | Wajib. `<time datetime="YYYY-MM-DD">`, agar tanggalnya terbaca mesin dan dibacakan sebagai "18 Nov". |
| `.datetile__m` | Wajib. Bulan singkat di atas pita tint aksen. |
| `.datetile__d` | Wajib. Tanggalnya, 18 px tabular. |
| `.datetile--today` | Hari ini: tile berubah menjadi aksen. |
| `.datetile--past` | Selesai atau lewat: tile memudar ke 60 %. |

## Markup

**Yang akan datang dalam daftar.** Hari ini di urutan pertama dan beraksen, lalu minggu berikutnya. Badge menyebut jenis acaranya dalam kata.
```html
<div class="list" style="max-width: 460px;">
  <a class="lrow" href="#dt-2026-11-16" id="dt-2026-11-16"><time class="datetile datetile--today" datetime="2026-11-16"><span class="datetile__m">Nov</span><span class="datetile__d">16</span></time><span class="lrow__body"><span class="lrow__title">Sosialisasi pajak daerah</span><span class="lrow__sub">Hari ini, 19.00 sampai 20.30 · Daring</span></span><span class="badge badge--accent">Langsung</span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></a>
  <a class="lrow" href="#dt-2026-11-18" id="dt-2026-11-18"><time class="datetile" datetime="2026-11-18"><span class="datetile__m">Nov</span><span class="datetile__d">18</span></time><span class="lrow__body"><span class="lrow__title">Posyandu balita RW 03</span><span class="lrow__sub">Rab, buka 08.00 · 3 jam</span></span><span class="badge">Kesehatan</span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></a>
  <a class="lrow" href="#dt-2026-11-21" id="dt-2026-11-21"><time class="datetile" datetime="2026-11-21"><span class="datetile__m">Nov</span><span class="datetile__d">21</span></time><span class="lrow__body"><span class="lrow__title">Samsat keliling, Lapangan Saburai</span><span class="lrow__sub">Sab, 09.00 · Antrean 42</span></span><span class="badge badge--warning">Bawa KTP</span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></a>
  <a class="lrow" href="#dt-2026-12-02" id="dt-2026-12-02"><time class="datetile" datetime="2026-12-02"><span class="datetile__m">Des</span><span class="datetile__d">2</span></time><span class="lrow__body"><span class="lrow__title">Retribusi pasar jatuh tempo</span><span class="lrow__sub">Rab · Rp 75.000</span></span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></a>
</div>
```

**Lewat dan akan datang.** Acara yang sudah lewat memudar; acara berikutnya tetap penuh.
```html
<div class="docs-row" style="gap: 12px;"><time class="datetile datetile--past" datetime="2026-11-09"><span class="datetile__m">Nov</span><span class="datetile__d">9</span></time><time class="datetile" datetime="2026-11-23"><span class="datetile__m">Nov</span><span class="datetile__d">23</span></time><time class="datetile datetile--today" datetime="2026-11-16"><span class="datetile__m">Nov</span><span class="datetile__d">16</span></time></div>
```

## Varian dan ukuran
| Kelas atau atribut | Kapan |
|---|---|
| `.datetile` | Akan datang. |
| `.datetile--today` | Hari ini; paling banyak satu per daftar. |
| `.datetile--past` | Lewat atau selesai. |

## Status
| Status | Caranya |
|---|---|
| `in a linked row` | Barisnya adalah tautan; tile tidak interaktif sendiri. |
| `loading` | Blok `.skel` 44 × 48 dengan radius `--r-md`. |

## Gerak dan mikrointeraksi
- Tidak punya gerak sendiri. Baris mengikuti list stagger saat hasil muncul.

## Aksesibilitas
- Pakai `<time datetime>` agar teknologi bantu dan mesin mendapat tanggal lengkap; teks yang terlihat terbaca wajar ("18 Nov").
- Tulis juga "Hari ini" di subjudul baris; tile beraksen saja tidak cukup.
- Pita bulan berupa teks aksen di atas tint-nya (AA di kedua tema).

## Lakukan
- Urutkan menurut tanggal, yang terdekat dulu; taruh butir hari ini di paling atas.
- Cantumkan nama hari dan jam di subjudul.

## Hindari
- Memakai tile sebagai tombol atau pemilih tanggal.
- Menampilkan tahun di tile; tambahkan di subjudul bila daftarnya melewati pergantian tahun.

## Terkait
[List](list.md) · [Calendar](calendar.md) · [Timestamp](timestamp.md) · [Badge](badge.md)
