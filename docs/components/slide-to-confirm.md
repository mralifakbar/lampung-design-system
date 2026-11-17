# Slide to confirm

Kelompok: Aksi. https://lampung.kartadinata.app/docs/components/slide-to-confirm

Lintasan dengan kenop yang digeser sampai ujung untuk mengonfirmasi langkah mahal di layar sentuh (kirim daftar penerima bantuan, kirim pembayaran). Kenop mengikuti jari 1:1, menahan saat melewati ujung, dan terkonfirmasi setelah melewati 85 % lintasan.

## Pakai saat
- Konfirmasi mahal dan disengaja di ponsel atau tablet yang tidak boleh terpicu oleh ketukan tak sengaja: kirim daftar akhir penerima bantuan, bayar retribusi, kirim izin untuk ditandatangani.
- Langkah terakhir sebuah alur, di bagian bawah layar dalam jangkauan ibu jari.

## Pakai yang lain saat
- Desktop dengan mouse sebagai input utama: pakai [Hold to confirm](hold-to-confirm.md). Menggeser kenop dengan mouse lambat; menahan tombol tidak.
- Menghapus data bersama atau yang tidak bisa dipulihkan: pakai [Alert dialog](alert-dialog.md).
- Aksi yang bisa dibatalkan: pakai [Button](button.md). Langsung jalankan dan tawarkan Urungkan di [toast](toast.md).
- Memilih nilai di sepanjang rentang: pakai [Slider](slider.md).

## Letaknya
Di bagian bawah layar ponsel atau [sheet](sheet.md), selebar kolom konten (maksimal 340 px dan menyusut agar muat). Satu per layar, dengan ringkasan hal yang dikonfirmasi tepat di atasnya.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.slide[data-lds-slide]` | Wajib. Lintasan 56 px berbentuk pil di atas `--bg-recessed`. |
| `.slide__fill` | Wajib. Jejak bernuansa aksen yang tumbuh di belakang kenop. |
| `.slide__label` | Wajib. Instruksinya ("Geser untuk mengirim data penerima"); memudar saat kenop melewatinya. Ganti teksnya dengan hasil setelah konfirmasi. |
| `.slide__knob` | Wajib. `<button>` 48 px, aksen, dengan ikon `arrow_forward` yang menjadi `check` setelah selesai. Butuh `aria-label`. |

## Markup

**Kirim data penerima bantuan.** Geser kenop sampai ujung. Lepas sebelum 85 % dan ia memantul pulang; jentikan cepat ikut dihitung kecepatannya. Dengan keyboard, fokuskan kenop lalu tekan Enter.
```html
<div class="slide" data-lds-slide id="submit-aid">
  <span class="slide__fill" aria-hidden="true"></span>
  <span class="slide__label" aria-live="polite">Geser untuk mengirim data penerima</span>
  <button class="slide__knob" aria-label="Geser untuk mengirim data penerima. Tekan Enter untuk mengonfirmasi."><span class="ic" aria-hidden="true">arrow_forward</span></button>
</div>
<script type="module">
  const s = document.getElementById('submit-aid');
  s.addEventListener('lds:confirm', () => { s.querySelector('.slide__label').textContent = 'Data penerima terkirim'; sendRecipients(); });
</script>
```

**Di bawah ringkasan di ponsel.** Hal yang dikonfirmasi berada tepat di atas lintasan.
```html
<div class="stack" style="--gap: 16px; max-width: 360px;">
  <dl class="kv-list" style="margin: 0;">
    <div class="kv"><dt>Retribusi izin</dt><dd>Rp 150.000</dd></div>
    <div class="kv"><dt>Dibayar dari</dt><dd>Dompet digital</dd></div>
  </dl>
  <div class="slide" data-lds-slide>
  <span class="slide__fill" aria-hidden="true"></span>
  <span class="slide__label" aria-live="polite">Geser untuk membayar Rp 150.000</span>
  <button class="slide__knob" aria-label="Geser untuk membayar Rp 150.000. Tekan Enter untuk mengonfirmasi." onpointerenter="const s = this.closest('.slide'); if (!s.dataset.wired) { s.dataset.wired = '1'; s.addEventListener('lds:confirm', () => { s.querySelector('.slide__label').textContent = 'Pembayaran terkirim'; }); }" onfocus="const s = this.closest('.slide'); if (!s.dataset.wired) { s.dataset.wired = '1'; s.addEventListener('lds:confirm', () => { s.querySelector('.slide__label').textContent = 'Pembayaran terkirim'; }); }"><span class="ic" aria-hidden="true">arrow_forward</span></button>
</div>
</div>
```

## Status
| Status | Caranya |
|---|---|
| `rest` | Kenop di awal, label terlihat. |
| `.is-dragging` | Selama pointer menahan kenop; kursor `grabbing`. |
| `released short` | Kenop kembali dengan `--spring-momentum` selama `--d-momentum`. |
| `.is-done` | Lintasan menjadi `--success-tint`, label `--success-text` dan semibold, kenop hijau dengan `check`. `lds:confirm` dipicu. Tidak ada reset bawaan. |

## Gerak dan mikrointeraksi
- Geser: kenop mengikuti pointer 1:1 (tanpa transisi) dan isian ikut tumbuh; label memudar selama 60 % pertama perjalanan.
- Melewati salah satu ujung, ia meregang seperti karet (`over * 52 * 0.55 / (52 + 0.55 * |over|)`), sehingga menahan alih-alih berhenti mendadak.
- Lepas: titik akhir diproyeksikan dari 5 sampel pointer terakhir; melewati 85 % perjalanan ia terkonfirmasi dan meluncur ke ujung dengan `--spring-smooth` selama `--d-smooth`, jika tidak ia kembali dengan `--spring-momentum` (satu-satunya tempat sedikit overshoot pantas, setelah sebuah gerakan).
- Selesai: warna lintasan dan kenop berganti silang selama `--d-standard`; padding label bergerak dengan `--spring-smooth`.
- Dengan reduced motion transisi memendek menjadi 120 ms; geserannya sendiri tetap mengikuti jari.

## Aksesibilitas
- Kenop adalah `<button>`: Tab mencapainya dan Enter langsung mengonfirmasi. Sebutkan ini di `aria-label`-nya.
- Pasang `aria-live="polite"` pada `.slide__label` agar hasilnya ("Data penerima terkirim") diumumkan saat Anda mengubahnya.
- Menggeser bukan satu-satunya jalur: Enter berfungsi, dan untuk pengguna switch atau suara sediakan rute lain (tombol konfirmasi di pengaturan).
- Kontras: label adalah `--text-subtle` di atas `--bg-recessed`; label selesai adalah `--success-text` di atas `--success-tint`.

## Lakukan
- Sebut apa yang akan terjadi di label ("Geser untuk membayar Rp 150.000").
- Ganti label dengan hasilnya setelah `lds:confirm`.
- Letakkan dalam jangkauan ibu jari di bagian bawah layar.

## Hindari
- Memakainya di layar yang dirancang untuk desktop lebih dulu.
- Menaruh dua di satu layar.
- Memakainya untuk aksi sehari-hari yang bisa dibatalkan.

## Perilaku (HTML biasa)
`data-lds-slide` pada lintasan. `init()` menangani geseran pointer dengan efek karet dan proyeksi kecepatan, terkonfirmasi setelah 85 %, menyetel `.is-done`, mengganti ikon kenop menjadi `check`, dan memicu `lds:confirm` pada lintasan. Enter pada kenop langsung mengonfirmasi.

## Terkait
[Hold to confirm](hold-to-confirm.md) · [Alert dialog](alert-dialog.md) · [Drag and momentum](drag-and-momentum.md) · [Sheet](sheet.md)
