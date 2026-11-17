# Stat row

Kelompok: Tampilan data. https://lampung.kartadinata.app/docs/components/stat-row

Sebaris angka kunci tanpa kartu: angka tabular besar dengan labelnya di bawah, dipisah garis tipis. Kolomnya mengikuti lebar kolom isi, bukan layar.

## Pakai saat
- Dua sampai empat angka yang merangkum halaman atau bagian: permohonan masuk, rata-rata waktu proses, tugas jatuh tempo.
- Bagian atas laporan atau bagian dasbor, sebelum detailnya.
- Hasil setelah satu periode layanan: laporan masuk, menunggu, waktu tanggap.

## Pakai yang lain saat
- Angka yang masing-masing butuh kartu, ikon, atau perubahan sendiri: pakai [KPI card](kpi-card.md).
- Angka dengan trennya dari waktu ke waktu: pakai [Sparkline stat](sparkline-stat.md).
- Satu nilai yang butuh penilaian lulus atau tidak: pakai [Progress ring](progress-ring.md).
- Banyak pasangan label dan nilai tentang satu hal: pakai [Key-value](key-value.md).
- Angka yang dibandingkan di banyak butir: pakai [Table](table.md).

## Letaknya
Di atas bagian halaman, selebar kolom isi, tepat di bawah judul [bagian](sections.md). Di kolom sempit (ponsel, panel samping) otomatis menjadi dua kolom, dan angka terakhir yang ganjil membentang di keduanya. Mulai 600 px lebar wadah, menampilkan sampai `--n` angka dalam satu baris.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.stat-row-wrap` | Wajib. Wadah ukuran; stat row membaca lebarnya. |
| `dl.stat-row` | Wajib. Grid dengan garis tipis di atas. Pasang `style="--n: 3"` untuk jumlah angka per baris (maks. 4). |
| `.stat-row--four` | Tambahkan untuk empat angka atau lebih: angka lebih kecil dan pemisah yang tepat. |
| `.stat-row__item` | Wajib. Satu angka: `div` berisi `dt` dan `dd`. |
| `dt.stat-row__label` | Wajib. Labelnya. Pertama di DOM, tampil di bawah angka. |
| `dd.stat-row__value` | Wajib. Angkanya: 30 px di lebar sempit, 34 sampai 40 px di lebar luas, tabular. |
| `dd.stat-row__sub` | Konteks opsional di bawah label ("Dari kuota 24"). |

## Markup

**Tiga angka.** Ubah ukuran jendela: di bawah 600 px lebar, berubah menjadi dua kolom, dengan angka ketiga membentang di keduanya.
```html
<div class="stat-row-wrap"><dl class="stat-row" style="--n: 3">
  <div class="stat-row__item"><dt class="stat-row__label">Permohonan diproses</dt><dd class="stat-row__value">21</dd><dd class="stat-row__sub">Dari kuota 24 per hari</dd></div>
  <div class="stat-row__item"><dt class="stat-row__label">Rata-rata waktu proses</dt><dd class="stat-row__value">3,6 hari</dd><dd class="stat-row__sub">Lebih cepat 0,4 hari dari bulan lalu</dd></div>
  <div class="stat-row__item"><dt class="stat-row__label">Jatuh tempo minggu ini</dt><dd class="stat-row__value">4</dd></div>
</dl></div>
```

**Empat angka.** `stat-row--four` dengan `--n: 4` menjaga angka lebih kecil agar muat dalam satu baris.
```html
<div class="stat-row-wrap"><dl class="stat-row stat-row--four" style="--n: 4">
  <div class="stat-row__item"><dt class="stat-row__label">Laporan masuk</dt><dd class="stat-row__value">412</dd></div>
  <div class="stat-row__item"><dt class="stat-row__label">Menunggu</dt><dd class="stat-row__value">38</dd><dd class="stat-row__sub">Dari 412</dd></div>
  <div class="stat-row__item"><dt class="stat-row__label">Selesai tepat waktu</dt><dd class="stat-row__value">86%</dd></div>
  <div class="stat-row__item"><dt class="stat-row__label">Waktu tanggap</dt><dd class="stat-row__value">1:42</dd><dd class="stat-row__sub">Target 2:00 jam</dd></div>
</dl></div>
```

**Di kolom sempit.** Markup yang sama di kolom 340 px: dua per baris.
```html
<div class="stat-row-wrap" style="max-width: 340px;"><dl class="stat-row" style="--n: 3">
  <div class="stat-row__item"><dt class="stat-row__label">Penerima terdaftar</dt><dd class="stat-row__value">128</dd></div>
  <div class="stat-row__item"><dt class="stat-row__label">Bantuan sudah diambil</dt><dd class="stat-row__value">97</dd></div>
  <div class="stat-row__item"><dt class="stat-row__label">Skor kepuasan</dt><dd class="stat-row__value">74,5</dd></div>
</dl></div>
```

## Varian dan ukuran
| Kelas atau atribut | Kapan |
|---|---|
| `--n: 2 | 3 | 4` | Angka per baris mulai 600 px lebar wadah. |
| `stat-row--four` | Empat angka atau lebih: angka lebih kecil, pemisah per baris berisi empat. |

## Status
| Status | Caranya |
|---|---|
| `loading` | Bilah [skeleton](skeleton.md) di setiap nilai; label sudah tampil. |
| `no data` | Tulis "Belum ada" atau "Tidak tersedia" tanpa tanda pisah di nilai; pertahankan labelnya. |

## Gerak dan mikrointeraksi
- Tidak ada saat diam. Saat pertama terlihat, angka boleh muncul naik sekali dengan [reveal on scroll](reveal-on-scroll.md) (`data-lds-reveal` dengan `--i` per butir) atau menghitung naik dengan [number count](number-count.md); jangan keduanya.
- Angka yang berubah selagi terlihat bergulir dengan [rolling number](rolling-number.md) memakai `--spring-smooth`.

## Aksesibilitas
- Ini `<dl>`: setiap label adalah istilahnya, angka dan baris sub adalah nilainya. Label berada pertama di DOM, sehingga pembaca layar membaca "Permohonan diproses, 21, dari kuota 24 per hari" walaupun angkanya ditampilkan lebih dulu.
- Satuan masuk ke nilai atau baris sub, bukan hanya lewat warna atau ikon.

## Lakukan
- Batasi pada dua sampai empat angka yang paling penting.
- Tulis konteks di baris sub ("Dari kuota 24", "Lebih cepat 0,4 hari").
- Atur `--n` sesuai jumlah angka.

## Hindari
- Membungkus setiap angka dengan kartu atau menambahkan ikon dan warna.
- Memakainya untuk lebih dari empat angka; pecah ke beberapa bagian atau pakai [tabel](table.md).
- Menampilkan panah tren tanpa kata.

## Terkait
[KPI card](kpi-card.md) · [Sparkline stat](sparkline-stat.md) · [Key-value](key-value.md) · [Number count](number-count.md)
