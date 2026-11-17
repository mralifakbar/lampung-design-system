# Coachmark

Kelompok: Umpan balik. https://lampung.kartadinata.app/docs/components/coachmark

Card berwarna terbalik yang menunjuk satu bagian antarmuka dengan penjelasan singkat, dalam tur paling banyak tiga langkah. Selalu bisa dilewati.

## Pakai saat
- Fitur baru berada di tempat yang tidak akan dicari orang, dan satu kalimat yang menunjuknya menghemat satu pertanyaan ke layanan bantuan.
- Tur singkat saat pertama kali dipakai (satu sampai tiga langkah) di layar yang padat, seperti editor formulir permohonan atau buku kas pajak.

## Pakai yang lain saat
- Tips sekali tampil yang tidak perlu menunjuk kontrol: pakai [Hints](hints.md).
- Menjelaskan istilah atau ikon saat hover atau fokus: pakai [Tooltip](tooltip.md).
- Konten kaya dan interaktif yang dibuka dengan klik: pakai [Popover](popover.md).
- Mengumumkan sesuatu tentang seluruh aplikasi: pakai [Banner](banner.md).
- Antarmuka butuh tur lebih dari tiga langkah: pakai [Empty state](empty-state.md). Biasanya layarnya butuh tampilan awal yang lebih baik, bukan tur yang lebih panjang.

## Letaknya
Tepat di bawah kontrol yang dijelaskan, dengan panah mengarah ke kontrol itu (panah di tepi atas, diatur dengan `--arrow`). Wadahnya harus diposisikan (`position: relative`). Di ponsel, jaga agar tetap di dalam lebar layar (card 280 px) dan di bawah targetnya.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.coach` | Wajib. Card berwarna terbalik 280 px, diposisikan absolut di dalam wadah relatif; atur `top`/`left` (atau `transform`) untuk menempatkannya. |
| `.coach::before` | Panah di tepi atas. Geser dengan `--arrow` (jarak dari kiri, bawaan 24 px); ia meluncur saat nilainya berubah. |
| `.coach__step` | "Langkah 1 dari 3". |
| `.coach__title` | Wajib. Apa ini, dalam beberapa kata. |
| `.coach__body` | Satu kalimat: kenapa ini membantu. |
| `.btn.btn--sm` | Lewati (warna terbalik) dan Lanjut atau Selesai (`.btn--sm.is-primary`, aksen). |
| `.is-lit` | Pada target: ring aksen dengan celah, agar orang melihat apa yang dimaksud. |

## Markup

**Tur tiga langkah.** Card meluncur ke target berikutnya dan panahnya mengikuti. Tekan Lanjut.
```html
<div style="position: relative;">
  <button class="btn btn--secondary btn--md is-lit" id="search-btn">Cari</button>
  <div class="coach" role="dialog" aria-labelledby="coach-t" aria-describedby="coach-b" style="top: 64px; left: 0; --arrow: 40px;">
    <div class="coach__step">Langkah 1 dari 3</div>
    <div class="coach__title" id="coach-t">Cari semua laporan</div>
    <div class="coach__body" id="coach-b">Temukan laporan lewat kata apa pun di dalamnya, tidak hanya judulnya.</div>
    <div class="cluster" style="margin-top: 14px; justify-content: flex-end;">
      <button class="btn btn--sm">Lewati</button>
      <button class="btn btn--sm is-primary">Lanjut</button>
    </div>
  </div>
</div>
```

**Satu penunjuk.** Satu langkah tidak perlu penghitung; satu-satunya aksi adalah "Mengerti".
```html
<div style="position: relative; min-height: 210px;">
  <button class="btn btn--gray btn--md is-lit"><span class="ic" aria-hidden="true">download</span>Ekspor</button>
  <div class="coach" role="dialog" aria-labelledby="cm2-t" style="top: 60px; left: 0; --arrow: 36px;">
    <div class="coach__title" id="cm2-t">Ekspor data retribusi ke spreadsheet</div>
    <div class="coach__body">Semua kolom yang Anda lihat ikut diekspor, dengan urutan yang sama.</div>
    <div class="docs-row" style="margin-top: 14px; justify-content: flex-end;"><button class="btn btn--sm is-primary" onclick="this.closest('.coach').hidden = true; this.closest('.coach').parentElement.querySelector('.is-lit').classList.remove('is-lit');">Mengerti</button></div>
  </div>
</div>
```

## Status
| Status | Caranya |
|---|---|
| `open` | Card ditempatkan di bawah target dan target memakai `.is-lit`. |
| `next step` | Geser card (`transform`) dan panah (`--arrow`); ganti teksnya; pindahkan `.is-lit`. |
| `skipped or done` | Hapus card dan `.is-lit`, lalu ingat statusnya agar tur tidak pernah tampil lagi. |

## Gerak dan mikrointeraksi
- Antarlangkah, card meluncur dengan `transform` memakai `--spring-smooth` (`--d-smooth`, 560 ms) dan panah bergeser dengan `left` memakai spring yang sama, jadi mata mengikuti ke target baru tanpa kehilangan arah.
- Teks langkah baru boleh naik masuk dengan `lds-rise` selama `--d-standard` (240 ms) dengan `--ease-enter`.
- Opasitas memakai `--d-standard` dengan `--ease-enter`. Reduced motion: pergerakan menjadi perubahan linear 120 ms.

## Aksesibilitas
- `role="dialog"` (non-modal) dengan `aria-labelledby` ke judul dan `aria-describedby` ke isi. Pindahkan fokus ke tombol Lanjut saat terbuka, dan kembali ke target saat ditutup.
- Escape harus melewati tur; pasang di aplikasi (tidak ada perilaku bawaan).
- Halaman di belakangnya tetap bisa dipakai: tanpa scrim, tanpa focus trap.
- Ring yang menyala bukan satu-satunya petunjuk; teksnya menyebut kontrolnya ("Saring per kecamatan").

## Lakukan
- Tunjuk satu kontrol per langkah, paling banyak tiga langkah.
- Selalu tawarkan Lewati, dan jangan pernah tampilkan lagi tur yang sudah selesai.
- Mulai tur hanya setelah layar selesai dimuat dan orang sedang tidak beraktivitas.

## Hindari
- Merangkai coachmark lintas halaman.
- Menjelaskan hal yang sudah disebut labelnya ("Ini tombol cari").
- Menutupi kontrol yang ditunjuknya.

## Perilaku (HTML biasa)
Tidak ada perilaku bawaan: menempatkan card, menggeser `--arrow`, mengganti `.is-lit`, Escape dan mengingat tur yang selesai diatur oleh aplikasi.

## Terkait
[Hints](hints.md) · [Tooltip](tooltip.md) · [Popover](popover.md) · [Banner](banner.md)
