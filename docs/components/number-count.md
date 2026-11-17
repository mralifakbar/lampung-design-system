# Number count

Kelompok: Gerak. https://lampung.kartadinata.app/docs/components/number-count

Saat angka berubah di depan seseorang, setiap kolom digit bergulir ke nilai barunya dengan smooth spring, dan bar serta ring meluncur ke panjang barunya dengan kurva in-out. Perubahannya terlihat, nilai barunya langsung terbaca, dan lebarnya tidak pernah melompat.

## Pakai saat
- Hitungan yang baru diubah orang: stepper, jumlah suka, berkas dalam permohonan, kursi yang dipesan.
- Angka langsung yang diperbarui saat sedang dilihat: laporan yang masuk, orang yang sedang daring, skor yang sedang dijumlahkan.
- Nilai progres yang bergerak: [progress bar](progress-bar.md), [progress ring](progress-ring.md), [meter](meter.md).

## Pakai yang lain saat
- Kata atau label yang berubah (Tersimpan, Sedang ditinjau): pakai [Text morph](text-morph.md).
- Angka yang ditampilkan sekali saat dimuat (total dalam laporan): pakai [Stat row](stat-row.md). Tampilkan saja; jangan menghitung naik dari nol.
- Hitung mundur menuju tenggat: pakai [Timer](timer.md).
- Menunggu tanpa jumlah yang diketahui: pakai [Thinking](thinking.md).

## Letaknya
Di mana pun angkanya berada: di dalam [number stepper](number-stepper.md), tombol [suka](like.md), angka kunci, sel tabel yang diperbarui langsung. `.roll` mewarisi font, jadi berfungsi di ukuran apa pun.

## Markup

**Stepper yang dikendalikan orang.** Setiap tekanan hanya menggulirkan digit yang berubah; dari 19 ke 20 menggulirkan kedua kolom sekaligus.
```html
<div class="field">
  <span class="field__label" id="nc-seat">Kursi bus yang dipesan</span>
  <div class="stepper-field" role="group" aria-labelledby="nc-seat" data-lds-stepper data-min="1" data-max="40" data-value="18">
    <button aria-label="Kurangi kursi"><span class="ic" aria-hidden="true">remove</span></button>
    <span class="stepper-field__value"><span class="roll" aria-live="polite"></span></span>
    <button aria-label="Tambah kursi"><span class="ic" aria-hidden="true">add</span></button>
  </div>
</div>
```

**Hitungan langsung.** Pasien yang selesai dilayani di puskesmas sepanjang pagi. Angkanya bergulir setiap kali; labelnya tetap di tempat.
```html
<span class="roll" data-lds-roll="27"></span>
<script type="module">
  import { setRoll } from 'lampung-design-system/js';
  setRoll(document.querySelector('.roll'), 28);
</script>
```

**Progres yang bergerak.** Bar dan ring meluncur ke nilai baru dengan kurva in-out (480 ms): sesuatu yang sudah tampil sedang bergerak, bukan baru tiba.
```html
<div class="docs-col" style="max-width: 360px;" data-p="60">
  <div class="progress-meta"><span>Kelengkapan berkas</span><b>12 dari 20 berkas</b></div>
  <div class="progress" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" aria-label="Kelengkapan berkas"><div class="progress__fill" style="transform: scaleX(0.6);"></div></div>
  <div class="docs-row"><div class="ring" role="img" aria-label="Kelengkapan berkas 60 persen"><svg viewBox="0 0 64 64" aria-hidden="true"><circle class="ring__track" cx="32" cy="32" r="27"></circle><circle class="ring__val" cx="32" cy="32" r="27" stroke-dasharray="169.6" stroke-dashoffset="67.8"></circle></svg><span class="ring__label">60%</span></div><button class="btn btn--secondary btn--sm" onclick="const box = this.closest('.docs-col'); let p = Number(box.dataset.p || 60); p = p >= 100 ? 20 : p + 20; box.dataset.p = p; box.querySelector('.progress__fill').style.transform = 'scaleX(' + p / 100 + ')'; box.querySelector('.progress').setAttribute('aria-valuenow', p); box.querySelector('.ring__val').setAttribute('stroke-dashoffset', (169.6 * (1 - p / 100)).toFixed(1)); box.querySelector('.ring__label').textContent = p + '%'; box.querySelector('.ring').setAttribute('aria-label', 'Kelengkapan berkas ' + p + ' persen');">Unggah satu berkas</button></div>
</div>
```

## Gerak dan mikrointeraksi
- Digit bergulir: setiap `.roll__col` adalah kolom 0 sampai 9 yang digeser dengan `translateY(-n × 1.2em)` dengan `--spring-smooth` selama `--d-smooth` (560 ms). Kolom bergulir sendiri-sendiri; digit yang tidak berubah tetap diam. Angka tabular menjaga lebarnya.
- Saat jumlah digit berubah (9 ke 10), kolom baru muncul tanpa bergulir dan sisanya bergulir seperti biasa.
- Bar: `.progress__fill` berubah skala pada sumbu X selama `--d-considered` (480 ms) dengan `--ease-inout`. Ring: `stroke-dashoffset` dengan durasi yang sama. Grafik memakai pasangan yang sama untuk perubahan data.
- Interupsi: ini transisi, jadi nilai baru di tengah guliran mengalihkan gerakan dari posisi kolom saat itu.
- Jangan menghitung naik dari nol saat dimuat: angka yang belum pernah dilihat cukup ditampilkan.
- Reduced motion: digit, bar, dan ring berubah dalam 120 ms linear.

## Aksesibilitas
- `setRoll` menulis nilai lengkap ke `aria-label` pada `.roll` dan menyembunyikan kolomnya (`aria-hidden`), sehingga pembaca layar membaca "28", bukan sepuluh digit.
- Untuk hitungan yang berubah karena tindakan orang (stepper), `aria-live="polite"` pada `.roll` membacakan nilai baru; untuk hitungan langsung yang sering berubah, jangan jadikan live region.
- Bar dan ring tetap memakai `role="progressbar"` dengan `aria-valuenow` (atau label teks) yang selaras dengan tampilannya.

## Lakukan
- Pakai `.roll` untuk hitungan yang berubah di depan orang.
- Pertahankan `font-variant-numeric: tabular-nums` (sudah ada di `.roll`).
- Gerakkan bar dengan transform, bukan width.

## Hindari
- Menghitung naik dari nol saat halaman dimuat.
- Menggulirkan angka di dalam tabel yang dirender ulang setiap kali diurutkan.
- Menganimasikan nilai yang tidak bisa dilihat orang berubah (di luar layar); cukup setel nilainya.

## Perilaku (HTML biasa)
`data-lds-roll="128"` merender nilainya saat `init()`; `setRoll(el, value)` mengubahnya. `data-lds-stepper` (dengan `data-min`, `data-max`, `data-value`) menggerakkan roll dari kedua tombolnya, menonaktifkan tombol di batas, dan memancarkan `lds:change` dengan `{ value }`. Tombol [suka](like.md) menggulirkan hitungannya sendiri.

## Terkait
[Rolling number](rolling-number.md) · [Number stepper](number-stepper.md) · [Progress bar](progress-bar.md) · [Progress ring](progress-ring.md)
