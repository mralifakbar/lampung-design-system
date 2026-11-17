# Meter

Kelompok: Umpan balik. https://lampung.kartadinata.app/docs/components/meter

Pengukur bersegmen untuk tingkat dalam rentang yang diketahui: penyimpanan terpakai, kuota terisi, kekuatan kata sandi. Menunjukkan seberapa penuh, bukan seberapa jauh kemajuannya.

## Pakai saat
- Jumlah terhadap batas: penyimpanan terpakai, kuota pendaftar dalam satu kelas pelatihan, jumlah laporan dibanding jatah.
- Tingkat kekuatan atau kualitas dalam beberapa langkah, seperti kekuatan kata sandi (empat segmen).
- Tingkat yang berubah menjadi peringatan mendekati batas (`.is-warn`) dan masalah saat mencapai batas (`.is-full`).

## Pakai yang lain saat
- Tugas yang maju sampai selesai: pakai [Progress bar](progress-bar.md).
- Satu skor dalam kotak ringkas: pakai [Progress ring](progress-ring.md).
- Bagian dari keseluruhan lintas kategori: pakai [Percentage bar](percentage-bar.md).
- Orang memberi penilaian: pakai [Rating](rating.md).
- Grid aktivitas per hari: pakai [Heatmap](heatmap.md).

## Letaknya
Di bawah label yang menyebut jumlahnya, dengan nilai dalam kata-kata (`.progress-meta` bisa dipakai sebagai header). Di baris pengaturan, di bawah kolom kata sandi, di card paket atau penyimpanan. Selebar wadahnya; 160 sampai 320 px paling mudah dibaca.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.meter-seg` | Wajib. Grid berisi sepuluh segmen sama besar dengan jarak 3 px. Timpa `grid-template-columns` secara inline untuk jumlah lain (empat untuk kekuatan kata sandi). |
| `i` | Wajib. Satu per segmen, tinggi 8 px. |
| `i.on` | Segmen terisi (aksen). |
| `.is-warn / .is-full` | Pada `.meter-seg`: segmen terisi berubah menjadi warning, lalu danger. |
| `.progress-meta` | Header yang disarankan: label dan nilai dalam kata-kata. |

## Markup

**Penyimpanan mendekati batas.** Tujuh dari sepuluh terisi itu normal; di sembilan meter memberi peringatan dan teks bantuan menyebut apa yang perlu dilakukan.
```html
<div class="docs-col" style="max-width: 320px;">
  <div>
    <div class="progress-meta"><span id="m1">Penyimpanan</span><b>6,2 dari 10 GB</b></div>
    <div class="meter-seg" role="meter" aria-labelledby="m1" aria-valuemin="0" aria-valuemax="10" aria-valuenow="6.2" aria-valuetext="6,2 dari 10 GB terpakai"><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i></i><i></i><i></i><i></i></div>
  </div>
  <div>
    <div class="progress-meta"><span id="m2">Penyimpanan</span><b>9,1 dari 10 GB</b></div>
    <div class="meter-seg is-warn" role="meter" aria-labelledby="m2" aria-valuemin="0" aria-valuemax="10" aria-valuenow="9.1" aria-valuetext="9,1 dari 10 GB terpakai, hampir penuh"><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i></i></div>
    <span class="field__help">Hampir penuh. Hapus berkas lampiran lama agar tetap bisa mengunggah.</span>
  </div>
</div>
```

**Kuota terisi.** Saat penuh, segmen berubah menjadi danger; kata "penuh" ditulis di sampingnya.
```html
<div style="max-width: 320px; width: 100%;">
  <div class="progress-meta"><span id="m3">Kuota pelatihan UMKM</span><b>40 dari 40, penuh</b></div>
  <div class="meter-seg is-full" role="meter" aria-labelledby="m3" aria-valuemin="0" aria-valuemax="40" aria-valuenow="40" aria-valuetext="40 dari 40 tempat, penuh"><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i></div>
</div>
```

**Kekuatan kata sandi dalam empat langkah.** Atur empat kolom secara inline. Pasangkan segmen dengan kata: lemah, cukup, baik, kuat. Ketik untuk mencoba.
```html
<div class="meter-seg is-warn" style="grid-template-columns: repeat(4, minmax(0, 1fr));" aria-hidden="true">
  <i class="on"></i><i class="on"></i><i></i><i></i>
</div>
<span class="field__help" id="pw-word">Cukup</span>
```

## Varian dan ukuran
| Kelas atau atribut | Kapan |
|---|---|
| `meter-seg` | Sepuluh segmen, isian aksen. |
| `meter-seg.is-warn` | Mendekati batas: segmen terisi berubah ke warna warning. |
| `meter-seg.is-full` | Mencapai atau melewati batas: warna danger. |
| `grid-template-columns (inline)` | Jumlah segmen lain, seperti empat untuk kekuatan. |

## Status
| Status | Caranya |
|---|---|
| `level` | Tambahkan `.on` pada n segmen pertama (bulatkan ke segmen terdekat). |
| `warning` | `.is-warn` mulai sekitar 80 % atau kekuatan yang lemah. |
| `full` | `.is-full` saat mencapai batas, dengan kata "penuh". |

## Gerak dan mikrointeraksi
- Setiap segmen memudarkan warnanya selama `--d-standard` (240 ms) dengan `--ease-standard`. Tanpa sapuan dan tanpa pantulan: meter adalah bacaan, bukan peristiwa.
- Beberapa segmen yang berubah sekaligus berubah bersamaan; jangan beri stagger.
- Reduced motion: perubahan warna menjadi linear 120 ms.

## Aksesibilitas
- Beri meter `role="meter"` dengan `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-valuetext` dan nama (`aria-labelledby` ke label).
- Jika kata di sampingnya sudah menyebut semuanya (kekuatan kata sandi), tandai segmen `aria-hidden="true"` dan hubungkan kata itu ke input dengan `aria-describedby`.
- Warning dan penuh juga harus disebut dengan kata-kata; warna saja tidak cukup bagi banyak orang.

## Lakukan
- Tulis nilainya di sampingnya ("6,2 dari 10 GB").
- Sebutkan apa yang perlu dilakukan saat meter memberi peringatan.
- Pakai sepuluh segmen untuk kapasitas dan empat atau lima untuk kekuatan.

## Hindari
- Memakai meter untuk tugas yang sedang berjalan.
- Mengisi segmen dengan gradien atau warna berbeda per segmen.
- Menampilkan lebih dari dua belas segmen; beralih ke tampilan [progress bar](progress-bar.md) atau angka.

## Perilaku (HTML biasa)
Tidak ada. Ganti `.on` pada segmen dan `.is-warn` / `.is-full` pada meter dari kode Anda.

## Terkait
[Progress bar](progress-bar.md) · [Progress ring](progress-ring.md) · [Percentage bar](percentage-bar.md) · [Password field](password-field.md)
