# Reveal on scroll

Kelompok: Gerak. https://lampung.kartadinata.app/docs/components/reveal-on-scroll

Gambar, angka kunci, dan ilustrasi memudar naik 4 px saat pertama kali masuk ke layar karena scroll, sekali saja, dan tidak pernah lagi. Teks isi, daftar, dan tabel tidak pernah dimunculkan dengan cara ini: orang harus bisa membaca dan mencari semuanya sekaligus.

## Pakai saat
- Angka kunci di halaman hasil atau halaman depan ([stat row](stat-row.md)) yang masuk ke layar saat orang menggulir.
- Ilustrasi, foto, dan grafik di bagian bawah halaman yang panjang.
- Deretan pendek kartu atau gambar yang tiba bersamaan, dengan stagger 30 ms lewat `--i`.

## Pakai yang lain saat
- Paragraf, daftar, tabel, formulir: pakai [Prose](prose.md). Semuanya cukup langsung ada. Memunculkan konten bacaan membuat orang menunggu untuk membaca.
- Butir yang tiba karena orang memintanya (hasil pencarian): pakai [List stagger](list-stagger.md).
- Sesuatu yang terbuka karena tekanan: pakai [Enter and exit](enter-and-exit.md).
- Konten di layar pertama saat dimuat: pakai [Motion principles](motion-principles.md). Sudah terlihat: tampilkan seketika.
- Konten yang sedang dimuat dan belum ada: pakai [Skeleton](skeleton.md).

## Letaknya
Pada elemen tunggal yang berupa gambar atau angka: `.stat-row__item`, `.thumb`, `.chart-card`, `.spotlight`, kartu di dalam `auto-grid`. Jangan pada section, seluruh halaman, atau kontainer teks.

## Markup

**Angka kunci di halaman hasil.** Gulir di dalam kotak. Ketiga angka memudar naik bersamaan dengan jarak 30 ms saat masuk ke layar; gulir kembali dan angkanya tetap di tempat. Tekan Putar ulang untuk melihatnya lagi.
```html
<div class="stat-row-wrap"><dl class="stat-row">
  <div class="stat-row__item" data-lds-reveal style="--i: 0">…</div>
  <div class="stat-row__item" data-lds-reveal style="--i: 1">…</div>
  <div class="stat-row__item" data-lds-reveal style="--i: 2">…</div>
</dl></div>
<script type="module">
  import { init } from 'lampung-design-system/js';
  init(); // memanggil observeReveal() jika halaman punya [data-lds-reveal]
</script>
```

**Gambar di bagian bawah panduan.** Foto dalam panduan layanan yang panjang memudar naik saat tiba; teks di sekitarnya sudah ada sejak awal.
```html
<div class="docs-scroll" style="height: 300px;">
  <div class="prose">
    <h3>Mengurus izin usaha di mal pelayanan publik</h3>
    <p>Ambil nomor antrean di mesin dekat pintu masuk. Bawa KTP, kartu keluarga, dan foto tempat usaha.</p>
    <p>Loket buka pukul 07.30 pada hari kerja. Ruang tunggu ada di lantai dua; konsultasi bisa dipesan seminggu sebelumnya.</p>
    <p>Pembayaran retribusi dilayani pukul 08.00 sampai 14.00 di loket sebelah gedung C.</p>
  </div>
  <div class="auto-grid" style="--min: 140px; margin-top: 24px;">
    <div class="thumb" data-lds-reveal style="--i: 0"></div>
    <div class="thumb" data-lds-reveal style="--i: 1"></div>
    <div class="thumb" data-lds-reveal style="--i: 2"></div>
  </div>
  <div style="height: 100px;"></div>
</div>
```

## Gerak dan mikrointeraksi
- Keadaan tersembunyi (hanya setelah JS menambahkan `.lds-reveal` ke `<html>`): `opacity: 0; transform: translateY(4px)`. Tampil (`[data-shown]`): opacity selama 240 ms dan transform selama 280 ms, keduanya dengan `--ease-standard`.
- Stagger: `transition-delay: min(var(--i), 3) × 30ms`. Butir keempat dan seterusnya berbagi 90 ms, sehingga satu deret selesai dalam kurang dari 400 ms.
- Pemicu: IntersectionObserver dengan margin bawah 6% dari viewport, threshold 0.01. Setiap elemen dimunculkan sekali lalu tidak diamati lagi; menggulir kembali ke atas tidak pernah menyembunyikannya.
- Tanpa kedipan saat dimuat: apa pun yang sudah berada dalam 95% tinggi viewport ditandai tampil sebelum kelasnya ditambahkan, sehingga layar pertama tidak pernah memudar.
- Reduced motion, tanpa JS, tanpa IntersectionObserver, dan saat dicetak: tidak ada yang disembunyikan; semuanya langsung tampil.

## Aksesibilitas
- Elemen yang dimunculkan sudah ada di DOM dan bisa dibaca teknologi bantu sebelum tampil; hanya penggambarannya yang menunggu.
- Jangan pernah memunculkan dengan cara ini teks yang perlu dibaca orang atau kontrol yang perlu dipakai.
- Gerakannya 4 px dan sekali saja; tidak bisa memicu mabuk gerak, dan reduced motion tetap menghapusnya.

## Lakukan
- Munculkan gambar, angka, dan foto; biarkan konten bacaan apa adanya.
- Pakai `--i` untuk deret pendek, mulai dari 0.
- Panggil `observeReveal(root)` lagi (atau `init()`) setelah merender konten baru di aplikasi sisi klien.

## Hindari
- Memasang `data-lds-reveal` pada section, paragraf, baris daftar, atau baris tabel.
- Memakainya di layar pertama agar halaman terasa "hidup".
- Menyembunyikan konten dengan `opacity: 0` buatan sendiri sambil menunggu scroll; tanpa JS konten itu akan tetap tak terlihat.

## Perilaku (HTML biasa)
`init()` memanggil `observeReveal(document)` jika halaman berisi `[data-lds-reveal]`. `observeReveal(root)` menambahkan `.lds-reveal` ke `<html>`, menandai yang sudah terlihat, mengamati sisanya (dan markup baru di bawah `root`, lewat MutationObserver), memasang `data-shown` saat setiap elemen masuk, dan mengembalikan fungsi untuk berhenti. Fungsi ini tidak melakukan apa pun di bawah reduced motion.

## React
```tsx
import { useReveal } from 'lampung-design-system/react';

function ResultsPage() {
  useReveal(); // pass a key that changes per route to re-scan
  return <dl className="stat-row">
    <div className="stat-row__item" data-lds-reveal style={{ '--i': 0 }}>…</div>
  </dl>;
}
```

## Terkait
[Stat row](stat-row.md) · [List stagger](list-stagger.md) · [Thumbnail](thumbnail.md) · [Motion principles](motion-principles.md)
