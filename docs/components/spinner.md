# Spinner

Kelompok: Umpan balik. https://lampung.kartadinata.app/docs/components/spinner

Delapan jari-jari yang memudar bergantian, menandakan "sedang bekerja" untuk tunggu singkat tanpa kemajuan yang terukur. Diletakkan di tempat hasil akan muncul dan tidak pernah memblokir seluruh halaman.

## Pakai saat
- Tunggu singkat (sekitar setengah detik sampai beberapa detik) tanpa ada yang bisa diukur: menyegarkan daftar, memeriksa kode, memuat halaman hasil berikutnya.
- Di dalam kontrol yang sedang sibuk, seperti aksi baris atau konfirmasi di tempat.
- Di ujung daftar saat item berikutnya dimuat.

## Pakai yang lain saat
- Tombol sedang menjalankan aksinya: pakai [Button](button.md). Pakai `.is-loading` dengan `btn__label` dan `btn__spin`; lebar tombol tetap.
- Konten sedang dimuat dan tata letaknya diketahui: pakai [Skeleton](skeleton.md).
- Pekerjaannya punya ukuran yang terukur: pakai [Progress bar](progress-bar.md).
- Pekerjaan panjang yang lamanya tidak diketahui (asisten, laporan) saat waktu berjalan penting: pakai [Thinking](thinking.md).
- Halaman sedang dimuat setelah tautan diklik: pakai [Nav progress](nav-progress.md).

## Letaknya
Di tempat hasil akan muncul: di tengah area yang disegarkan, di ujung baris list yang sibuk, di bawah item terakhir saat item lain dimuat. 20 px inline, 32 px (`spinner--lg`) di tengah panel. Jangan pernah berupa overlay layar penuh dengan spinner.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.spinner` | Wajib. Kotak 20 px (`--s`) dengan warna teks saat itu (`--c`). |
| `i x 8` | Wajib. Delapan jari-jari; masing-masing memudar dengan jeda bertahap. |
| `.spinner--lg` | 32 px dengan jari-jari lebih tebal, untuk pemuatan di tengah panel. |

## Markup

**Ukuran dan warna.** 20 px inline, 32 px di tengah. Mengikuti warna teks; atur `--c` untuk warna lain.
```html
<div class="docs-row" style="gap: 28px; color: var(--text-subtle);">
  <span class="spinner" role="status" aria-label="Memuat"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>
  <span class="spinner spinner--lg" role="status" aria-label="Memuat"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>
  <span class="spinner" style="--c: var(--accent);" role="status" aria-label="Memuat"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>
</div>
```

**Memuat lebih banyak di ujung daftar.** Spinner ada di tempat baris berikutnya akan muncul, disertai kata-kata.
```html
<div class="list" style="max-width: 420px;">
  <div class="lrow"><div class="lrow__body"><div class="lrow__title">Laporan lampu jalan padam, Kedaton</div><div class="lrow__sub">Selesai ditangani</div></div></div>
  <div class="lrow"><div class="lrow__body"><div class="lrow__title">Laporan saluran tersumbat, Rajabasa</div><div class="lrow__sub">Sedang ditangani</div></div></div>
  <div class="lrow" role="status" style="justify-content: center; color: var(--text-subtle);"><span class="spinner" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span><span class="lrow__sub" style="margin: 0;">Memuat laporan sebelumnya</span></div>
</div>
```

**Aksi baris yang sibuk.** Baris tetap di tempatnya; hanya kontrol di ujungnya yang berubah.
```html
<div class="list" style="max-width: 420px;">
  <div class="lrow" aria-busy="true"><div class="lrow__body"><div class="lrow__title">Transfer bank</div><div class="lrow__sub">Memeriksa pembayaran Anda</div></div><span class="spinner" style="color: var(--text-subtle);" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span></div>
</div>
```

## Varian dan ukuran
| Kelas atau atribut | Kapan |
|---|---|
| `spinner` | 20 px. Inline dan di baris. |
| `spinner--lg` | 32 px. Di tengah panel atau area kosong selama memuat. |
| `--c` | Warna jari-jari. Bawaannya `currentColor`. |
| `--s` | Ukuran lain (tombol memakai 18 px). |

## Gerak dan mikrointeraksi
- Setiap jari-jari menjalankan `lds-spoke` (opasitas 1 ke 0,18) selama 800 ms linear, dengan jeda bertambah 100 ms mengelilingi lingkaran, jadi cahayanya tampak berputar tanpa ada yang berotasi.
- Reduced motion sengaja tetap membuat spinner berputar: ia melaporkan pekerjaan, dan menghentikannya akan terlihat seperti macet.
- Tampilkan hanya setelah sekitar 300 ms menunggu, agar respons cepat tidak pernah memunculkan spinner sekilas.

## Aksesibilitas
- Berdiri sendiri: `role="status"` dengan `aria-label="Memuat"` (atau apa yang sedang dimuat), agar diumumkan sekali.
- Di dalam sesuatu yang sudah menyatakan sibuk (`aria-busy="true"` pada area atau tombol, atau baris status dengan kata-kata): `aria-hidden="true"` pada spinner.
- Saat pemuatan selesai, konten baru atau baris status menyebut hasilnya; hapus spinner, jangan biarkan tersembunyi tetapi tetap diumumkan.

## Lakukan
- Tunda sekitar 300 ms agar pemuatan cepat tidak menampilkannya.
- Letakkan di tempat konten akan muncul.
- Tambahkan kata-kata jika tunggunya bisa lebih dari dua detik.

## Hindari
- Memblokir halaman dengan overlay spinner layar penuh.
- Mengganti label tombol dengan spinner saja; pakai state loading tombol.
- Memakainya untuk pemuatan yang tata letaknya diketahui; pakai [skeleton](skeleton.md).

## React
```tsx
import { Spinner } from 'lampung-design-system/react';

<span role="status" aria-label="Loading results"><Spinner /></span>
<Spinner size="lg" />
```

## Terkait
[Button](button.md) · [Skeleton](skeleton.md) · [Progress bar](progress-bar.md) · [Thinking](thinking.md)
