# Timeline

Kelompok: Tampilan data. https://lampung.kartadinata.app/docs/components/timeline

Peristiwa berurutan waktu pada garis vertikal, dengan titik terisi untuk yang sudah selesai. Untuk riwayat atau rencana satu hal, yang terlama di atas.

## Pakai saat
- Riwayat satu catatan: permohonan izin dari diajukan sampai diputuskan, laporan warga dari masuk sampai ditangani.
- Rencana dengan tonggak bertanggal yang sebagian sudah selesai: jadwal perbaikan jalan, proses beasiswa daerah.

## Pakai yang lain saat
- Langkah alur yang sedang diselesaikan orang saat ini (wizard formulir): pakai [Steps](steps.md).
- Petunjuk yang diikuti berurutan: pakai [List](list.md). Pakai baris bernomor (`.lrow--num`)
- Feed berisi banyak peristiwa yang tidak berhubungan: pakai [List](list.md).
- Memilih tanggal: pakai [Calendar](calendar.md).
- Apa yang dilakukan asisten, langkah demi langkah: pakai [Tool call](tool-call.md).

## Letaknya
Di dalam [kartu](card.md) atau panel samping tentang hal yang dilacaknya, di bawah judul. Selebar kolomnya di ponsel. Batasi sekitar delapan butir; yang lebih lama masuk ke balik [show more](show-more.md).

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `ol.tl` | Wajib. Kolom peristiwa. |
| `li.tl__item` | Wajib. Kolom titik 24 px dan teksnya; garis 2 px menghubungkan setiap titik ke titik berikutnya (tidak setelah yang terakhir). |
| `.tl__dot` | Wajib. Lingkaran ber-ring 24 px; boleh berisi ikon 15 px. |
| `.tl__dot--done` | Isian aksen dengan ikon putih (`check`): selesai. |
| `.tl__title` | Wajib. Apa yang terjadi atau akan terjadi. |
| `.tl__meta` | Tanggal, serta siapa atau apa, dalam teks samar. |

## Markup

**Permohonan izin, dari diajukan sampai terbit.** Butir selesai terisi, butir berjalan dengan ikon, butir mendatang kosong.
```html
<div class="card" style="max-width: 400px;">
  <div class="card__title" style="margin-bottom: 16px;">Persetujuan bangunan gedung</div>
  <ol class="tl">
    <li class="tl__item"><span class="tl__dot tl__dot--done"><span class="ic" aria-hidden="true">check</span></span><div><div class="tl__title">Berkas diterima</div><div class="tl__meta"><span class="sr-only">Selesai. </span>12 Sep</div></div></li>
    <li class="tl__item"><span class="tl__dot tl__dot--done"><span class="ic" aria-hidden="true">check</span></span><div><div class="tl__title">Survei lapangan</div><div class="tl__meta"><span class="sr-only">Selesai. </span>20 Okt</div></div></li>
    <li class="tl__item" aria-current="step"><span class="tl__dot"><span class="ic" aria-hidden="true">schedule</span></span><div><div class="tl__title">Perbaikan gambar teknis</div><div class="tl__meta">18 Nov · sedang berjalan</div></div></li>
    <li class="tl__item"><span class="tl__dot"></span><div><div class="tl__title">Izin terbit</div><div class="tl__meta">Tanggal belum ditetapkan</div></div></li>
  </ol>
</div>
```

**Riwayat pendaftaran beasiswa daerah.** Semua butir sudah selesai; ikon menyebut jenis peristiwanya.
```html
<ol class="tl" style="max-width: 400px;">
  <li class="tl__item"><span class="tl__dot tl__dot--done"><span class="ic" aria-hidden="true">upload_file</span></span><div><div class="tl__title">Dokumen diunggah</div><div class="tl__meta">2 Nov, 09.14</div></div></li>
  <li class="tl__item"><span class="tl__dot tl__dot--done"><span class="ic" aria-hidden="true">visibility</span></span><div><div class="tl__title">Diperiksa panitia beasiswa daerah</div><div class="tl__meta">5 Nov, 13.40</div></div></li>
  <li class="tl__item"><span class="tl__dot tl__dot--done"><span class="ic" aria-hidden="true">mail</span></span><div><div class="tl__title">Surat penetapan penerima dikirim</div><div class="tl__meta">9 Nov, 10.02</div></div></li>
</ol>
```

## Varian dan ukuran
| Kelas atau atribut | Kapan |
|---|---|
| `tl__dot` | Mendatang atau netral: ber-ring, kosong atau dengan ikon samar. |
| `tl__dot--done` | Selesai: isian aksen, ikon putih. |

## Status
| Status | Caranya |
|---|---|
| `done` | `.tl__dot--done` dengan `check` dan "Selesai" untuk pembaca layar. |
| `current` | Ikon di titik polos (`schedule`) dan `aria-current="step"` pada butirnya, dengan "sedang berjalan" di meta. |
| `upcoming` | Titik kosong; meta menyebut kapan, atau "Tanggal belum ditetapkan". |

## Gerak dan mikrointeraksi
- Tidak ada saat diam. Bila sebuah butir menjadi selesai selagi terlihat, ganti titiknya langsung dan perbarui teksnya; butir baru boleh masuk dengan [list stagger](list-stagger.md) sekali.

## Aksesibilitas
- Pakai `<ol>`: urutannya bagian dari makna.
- Titiknya visual; sebutkan "Selesai" dalam teks tersembunyi dan tandai butir berjalan dengan `aria-current="step"`.
- Tanggal di meta berupa teks biasa atau elemen `<time>` [timestamp](timestamp.md).

## Lakukan
- Urutkan yang terlama dulu, agar garisnya terbaca seperti cerita.
- Buat judul singkat, dan untuk butir selesai pakai bentuk yang menyatakan sudah terjadi.

## Hindari
- Memakai timeline sebagai penanda langkah formulir; pakai [steps](steps.md).
- Menaruh deskripsi panjang di bawah setiap butir; tautkan ke detailnya.

## Terkait
[Steps](steps.md) · [List](list.md) · [Timestamp](timestamp.md) · [Tool call](tool-call.md)
