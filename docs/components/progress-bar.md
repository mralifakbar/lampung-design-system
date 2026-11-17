# Progress bar

Kelompok: Umpan balik. https://lampung.kartadinata.app/docs/components/progress-bar

Track 6 px yang terisi seiring tugas dengan ukuran yang diketahui berjalan. Tampilkan angkanya di samping; pakai bar indeterminate hanya jika benar-benar tidak bisa diukur.

## Pakai saat
- Tugas dengan jumlah yang terukur sedang berjalan: unggahan, impor data, ekspor laporan, isian yang sudah dilengkapi dalam permohonan izin.
- Kemajuan dalam pelatihan atau modul, ditampilkan dengan angkanya ("12 dari 20 materi").
- Langkah persiapan singkat yang tidak terukur, saat garis lebih cocok daripada spinner (`.progress--indeterminate`).

## Pakai yang lain saat
- Tile ringkas atau skor yang harus muat dalam kotak: pakai [Progress ring](progress-ring.md).
- Tingkat atau kapasitas, bukan tugas (penyimpanan terpakai, kekuatan kata sandi): pakai [Meter](meter.md).
- Tunggu singkat tanpa angka, di dalam tombol atau baris: pakai [Spinner](spinner.md).
- Konten sedang dimuat dan tata letaknya diketahui: pakai [Skeleton](skeleton.md).
- Pekerjaan panjang yang lamanya tidak diketahui, saat waktu berjalan adalah sinyal yang jujur: pakai [Thinking](thinking.md).
- Berkas yang diunggah ke drop zone: pakai [Upload progress](upload-progress.md).
- Langkah-langkah alur beberapa halaman: pakai [Steps](steps.md).
- Bagian dari keseluruhan lintas kategori: pakai [Percentage bar](percentage-bar.md).
- Halaman sedang dimuat setelah navigasi: pakai [Nav progress](nav-progress.md).

## Letaknya
Tepat di bawah hal yang diukurnya: di baris unggahan, di card pelatihan, di bawah header pekerjaan yang sedang berjalan. Dengan `.progress-meta` di atasnya untuk label dan angka. Selebar wadahnya di semua ukuran layar; jangan pernah sebagai strip selebar halaman (itu [navigation progress](nav-progress.md)).

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.progress` | Wajib. Track-nya: tinggi 6 px, membulat, di atas `--bg-track`. Membawa `role="progressbar"`. |
| `.progress__fill` | Wajib. Isiannya, blok yang membesar dari kiri. Atur `transform: scaleX(0.64)` untuk 64 %. |
| `.progress-meta` | Baris opsional di atas bar: label di kiri, nilai dalam `<b>` di kanan (angka tabular). |

## Markup

**Determinate dengan angkanya.** Label menyebut apa yang sedang terjadi, angka menyebut sejauh mana. Tekan tombol untuk memajukannya.
```html
<div class="progress-meta"><span id="up-l">Mengunggah denah-lokasi-usaha.pdf</span><b>64%</b></div>
<div class="progress" role="progressbar" aria-labelledby="up-l" aria-valuemin="0" aria-valuemax="100" aria-valuenow="64">
  <div class="progress__fill" style="transform: scaleX(0.64);"></div>
</div>
```

**Kemajuan pelatihan.** Hal yang dihitung lebih mudah dibaca sebagai "12 dari 20" daripada persentase. Bar tipis muat di dalam card dan baris list.
```html
<div class="card" style="max-width: 360px;">
  <div class="card__title">Pembukuan sederhana untuk UMKM</div>
  <div class="card__sub">Modul 3: mencatat arus kas</div>
  <div style="margin-top: 16px;">
    <div class="progress-meta"><span>Materi</span><b>12 dari 20</b></div>
    <div class="progress progress--thin" role="progressbar" aria-label="Materi selesai" aria-valuemin="0" aria-valuemax="20" aria-valuenow="12" aria-valuetext="12 dari 20 materi"><div class="progress__fill" style="transform: scaleX(0.6);"></div></div>
  </div>
</div>
```

**Indeterminate.** Satu segmen menyapu selama lamanya belum diketahui. Pasangkan dengan kata-kata yang memberi gambaran waktu.
```html
<div style="max-width: 420px; width: 100%;">
  <div class="progress-meta"><span>Menyiapkan surat keterangan Anda</span><span>Biasanya kurang dari satu menit</span></div>
  <div class="progress progress--thin progress--indeterminate" role="progressbar" aria-label="Menyiapkan surat keterangan Anda"><div class="progress__fill"></div></div>
</div>
```

**Selesai.** Di 100 % isian boleh berubah ke warna success; tulis juga "Selesai" dengan kata-kata.
```html
<div style="max-width: 420px; width: 100%;">
  <div class="progress-meta"><span>Laporan diekspor</span><b>Selesai</b></div>
  <div class="progress" role="progressbar" aria-label="Ekspor laporan" aria-valuemin="0" aria-valuemax="100" aria-valuenow="100"><div class="progress__fill" style="transform: scaleX(1); background: var(--success);"></div></div>
</div>
```

## Varian dan ukuran
| Kelas atau atribut | Kapan |
|---|---|
| `progress` | 6 px. Tugas mandiri dan unggahan. |
| `progress--thin` | 4 px. Di dalam card, baris list dan tata letak yang rapat. |
| `progress--indeterminate` | Segmen 40 % menyapu setiap 1,4 detik. Hanya jika besar pekerjaannya tidak diketahui. |
| `progress-meta` | Baris label dan nilai di atas bar. |

## Status
| Status | Caranya |
|---|---|
| `in progress` | `transform: scaleX(value)` pada isian plus `aria-valuenow` pada bar. |
| `indeterminate` | `.progress--indeterminate` tanpa `aria-valuenow`. |
| `done` | `scaleX(1)`, opsional `background: var(--success)` pada isian, dan "Selesai" di meta. |
| `failed` | Biarkan isian di titik berhentinya, warnai `var(--danger)` dan tulis alasan serta tombol coba lagi di [alert](alert.md) atau di barisnya. |

## Gerak dan mikrointeraksi
- Isian bergerak dengan `transform: scaleX()` memakai `--ease-inout` selama `--d-considered` (480 ms): karena sudah ada di layar, kedua ujungnya diperhalus. Perubahan warna latar selama `--d-standard`.
- Karena ini transition, pembaruan cepat berganti target dengan mulus; jangan memperlambat nilai agar terlihat sibuk dan jangan pernah memalsukan kemajuan yang macet di 90 %.
- Indeterminate: `lds-indeterminate`, 1,4 detik dengan `--ease-inout`, tanpa henti. Dengan reduced motion loop hanya diputar sekali, jadi pasangkan dengan kata-kata.
- Animasikan `transform` saja, jangan pernah `width`, agar pembaruan tetap di compositor.

## Aksesibilitas
- `role="progressbar"` dengan `aria-valuemin`, `aria-valuemax` dan `aria-valuenow`; beri nama dengan `aria-labelledby` yang menunjuk label meta, atau `aria-label`.
- Pakai `aria-valuetext` jika angka mentah bukan bacaan paling jelas ("12 dari 20 materi", "Sekitar 2 menit lagi").
- Bar indeterminate tidak memakai `aria-valuenow`.
- Jangan mengumumkan setiap perubahan. Umumkan akhirnya sekali, dengan [toast](toast.md) atau baris `role="status"`.

## Lakukan
- Tampilkan angka atau hitungan di samping bar.
- Pakai kemajuan yang nyata; jika hanya tahu langkahnya, tampilkan langkah.
- Letakkan bar di tempat hasilnya akan muncul, agar perhatian sudah di sana saat selesai.

## Hindari
- Menganimasikan `width` atau memakai isian gradien buatan.
- Memakai bar indeterminate untuk pekerjaan yang bisa diukur.
- Memakai progress bar untuk nilai yang bukan tugas (penyimpanan, kekuatan): itu [meter](meter.md).

## Perilaku (HTML biasa)
Tidak ada. Atur `transform: scaleX()` pada `.progress__fill` dan `aria-valuenow` pada `.progress` dari kode Anda.

## Terkait
[Progress ring](progress-ring.md) · [Meter](meter.md) · [Spinner](spinner.md) · [Upload progress](upload-progress.md)
