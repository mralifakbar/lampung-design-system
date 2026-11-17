# Button

Kelompok: Aksi. https://lampung.kartadinata.app/docs/components/button

Kontrol yang ditekan untuk menjalankan sesuatu: simpan, kirim, mulai, hapus. Satu tombol utama per tampilan; labelnya menyebut hasilnya.

## Pakai saat
- Sebuah aksi terjadi di halaman atau formulir ini: kirim, simpan, mulai permohonan, buka dialog.
- Anda butuh status memuat yang menjaga lebar tombol selama aksi berjalan (`.is-loading` dengan `btn__label` dan `btn__spin`).

## Pakai yang lain saat
- Pindah ke halaman lain tanpa efek samping: pakai [Link](link.md). Tautan diumumkan sebagai navigasi dan bisa dibuka di tab baru dengan klik tengah.
- Kontrol hanya menampilkan ikon: pakai [Icon button](icon-button.md).
- Menyalakan atau mematikan pengaturan yang langsung berlaku: pakai [Switch](switch.md).
- Memilih satu tampilan dari konten yang sama: pakai [Segmented control](segmented-control.md).
- Konfirmasi yang mahal tetapi tidak berbahaya (kirim permohonan, kirim pembayaran): pakai [Hold to confirm](hold-to-confirm.md).

## Letaknya
Di ujung hal yang ditindaklanjuti: di bawah formulir (`form__actions`), di bagian bawah dialog (`dialog__actions`), di footer kartu, atau di bilah lengket pada ponsel. Tombol utama ada di kanan pada layar lebar dan di atas (lebar penuh) pada ponsel.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.btn` | Wajib. `<button>` (atau `<a>` bergaya tombol saat berpindah halaman). Tinggi bawaan 44 px. |
| `.btn--primary|secondary|…` | Wajib. Satu kelas varian; mengatur warna dan tampilan. |
| `.ic` | Ikon opsional di depan label, 19 px. |
| `.btn__label` | Membungkus teks saat tombol bisa memuat, sehingga teks bisa memudar tanpa mengubah lebar. |
| `.btn__spin` | Spinner yang tampil selama `.is-loading` aktif. Berisi `.spinner` dengan delapan `<i>`. |

## Markup

**Varian.** Primary sekali per tampilan; secondary untuk alternatifnya; tinted untuk aksi positif yang tenang; plain untuk aksi sebaris dan tersier; danger hanya di dalam konfirmasi.
```html
<div class="docs-row">
  <button class="btn btn--primary">Simpan perubahan</button>
  <button class="btn btn--secondary">Pratinjau</button>
  <button class="btn btn--tinted">Tambah catatan</button>
  <button class="btn btn--gray">Gandakan</button>
  <button class="btn btn--plain">Lewati dulu</button>
  <button class="btn btn--danger-tinted">Keluarkan anggota</button>
</div>
```

**Ukuran dan ikon.** 52 untuk satu ajakan utama di halaman depan, 44 sebagai bawaan, 36 di toolbar dan baris padat, 28 di dalam baris dan chip. Ukuran kecil tetap punya area sentuh 44 px lewat ruang di sekitarnya.
```html
<div class="docs-row">
  <button class="btn btn--primary btn--lg"><span class="ic" aria-hidden="true">play_arrow</span>Mulai permohonan</button>
  <button class="btn btn--secondary"><span class="ic" aria-hidden="true">add</span>Tambah layanan</button>
  <button class="btn btn--secondary btn--md"><span class="ic" aria-hidden="true">download</span>Ekspor</button>
  <button class="btn btn--plain btn--sm">Ubah</button>
</div>
```

**Memuat tanpa lompatan.** Label memudar, spinner membesar masuk, lebar tetap. Coba tekan.
```html
<button class="btn btn--primary is-loading" aria-busy="true">
  <span class="btn__label">Kirim permohonan</span>
  <span class="btn__spin" aria-hidden="true"><span class="spinner"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span></span>
</button>
```

**Nonaktif.** Lebih baik tombol tetap aktif dan menjelaskan apa yang kurang saat ditekan. Nonaktifkan hanya jika alasannya terlihat di sampingnya.
```html
<div class="docs-col" style="max-width: 360px;">
  <button class="btn btn--primary" disabled>Kirim laporan</button>
  <span class="field__help">Pilih jenis masalahnya untuk mengirim laporan.</span>
</div>
```

## Varian dan ukuran
| Kelas atau atribut | Kapan |
|---|---|
| `btn--primary` | Aksi utama tampilan. Tepat satu. |
| `btn--secondary` | Alternatif di samping tombol utama (Batal, Pratinjau, Kembali). |
| `btn--tinted` | Aksi positif yang tenang dan tidak boleh bersaing dengan tombol utama. |
| `btn--gray` | Aksi utilitas netral di toolbar. |
| `btn--plain` | Aksi sebaris dan tersier; hanya teks, warna aksen. |
| `btn--danger` | Hanya untuk tombol konfirmasi di dalam [alert dialog](alert-dialog.md) yang merusak. |
| `btn--danger-tinted` | Aksi merusak yang masih meminta konfirmasi sesudahnya. |
| `btn--lg / btn--md / btn--sm` | 52 / 36 / 28 px. Bawaannya 44. |
| `btn--block` | Lebar penuh; bawaan untuk tombol utama di tata letak ponsel dan sheet. |

## Status
| Status | Caranya |
|---|---|
| `hover` | Otomatis; hanya di perangkat yang bisa hover. |
| `:active` | Mengecil ke 97 % dalam 90 ms dan memantul kembali saat dilepas. |
| `.is-loading + aria-busy` | Label keluar, spinner masuk, lebar tetap; klik diabaikan. `setLoading(btn, true)` di HTML biasa. |
| `disabled / aria-disabled` | Opasitas 38 %, tanpa efek, tidak bisa diklik. |
| `.is-done` | Label naik masuk sekali setelah berhasil (pasangkan dengan toast atau text morph). |

## Gerak dan mikrointeraksi
- Tekan: `transform: scale(0.97)` pada `:active` dalam 90 ms, kembali dengan `--spring-snappy`. Umpan balik dimulai saat pointer turun, bukan saat dilepas.
- Memuat: label keluar dengan blur 4 px dalam `--d-fast`; spinner membesar dari 0.6 dengan `--spring-snappy`. Keduanya transisi, jadi mematikan status memuat di tengah jalan berbalik dengan halus.
- Di bawah 560 px, label panjang turun ke dua baris alih-alih mendorong tata letak ke samping (`--sm` tetap satu baris).
- Untuk "Tersimpan" setelah "Simpan", ganti teksnya dengan [text morph](text-morph.md) alih-alih menukar tombol.

## Aksesibilitas
- Pakai `<button type="button">` untuk aksi dan `<button type="submit">` di formulir; pakai `<a href>` hanya untuk berpindah halaman.
- Tombol hanya ikon adalah [icon button](icon-button.md) dengan `aria-label`.
- Selama memuat, setel `aria-busy="true"`; umumkan hasilnya dengan [toast](toast.md) atau teks sebaris.
- Focus ring berasal dari sistem (`:focus-visible`); jangan pernah menghapusnya.

## Lakukan
- Sebut hasilnya: "Simpan perubahan", "Kirim laporan", "Mulai permohonan".
- Pertahankan satu tombol utama per tampilan; turunkan sisanya ke secondary, tinted, atau plain.
- Buat tombol utama selebar layar di tata letak ponsel (`btn--block`).

## Hindari
- Menulis "Submit", "OK", "Klik di sini", atau "Lanjut" jika ada kata kerja yang lebih spesifik.
- Mengubah gaya tombol dengan kelas sendiri (pil membulat, gradien, bayangan). Pilih varian.
- Memakai `btn--danger` di luar konfirmasi, atau dua tombol utama berdampingan.

## Perilaku (HTML biasa)
Opsional. `setLoading(button, true|false)` menyalakan atau mematikan status memuat dan `aria-busy`.

## React
```tsx
import { ButtonContent } from 'lampung-design-system/react';

<button className={`btn btn--primary${saving ? ' is-loading' : ''}`} aria-busy={saving} onClick={save}>
  <ButtonContent loading={saving}>Simpan perubahan</ButtonContent>
</button>
```

## Terkait
[Icon button](icon-button.md) · [Link](link.md) · [Hold to confirm](hold-to-confirm.md) · [Text morph](text-morph.md)
