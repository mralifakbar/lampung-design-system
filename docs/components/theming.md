# Theming

Kelompok: Landasan. https://lampung.kartadinata.app/docs/components/theming

Terang dan gelap berasal dari satu atribut: `data-theme="light|dark|system"` pada `<html>` atau subtree mana pun. Komponen hanya membaca token, jadi mereka berganti sendiri; Anda tidak pernah menulis CSS dark mode untuk sebuah komponen.

## Pakai saat
- Menyiapkan halaman: pasang `class="lds"` dan `data-theme` pada `<html>`, lalu panggil `restoreTheme()` sebelum tampilan pertama agar pilihan yang tersimpan langsung dipakai tanpa kedipan.
- Menyediakan pengalih tampilan (Terang, Gelap, Sistem) di pengaturan atau footer sidebar.
- Sebuah area harus tetap gelap (atau terang) apa pun tema halamannya: pratinjau kode, pemutar media, pita promosi. Pasang `data-theme` hanya pada elemen itu.
- Menulis CSS proyek di atas sistem: pakai token (`--bg-fill`, `--text-subtle`, `--line`, `--accent`) agar tambahan Anda ikut berganti dengan tema.

## Pakai yang lain saat
- Menunjukkan status (disetujui, terlambat) dengan warna: pakai [Badge](badge.md). Warna status datang bersama kata dan ikon; jangan pernah memberi tema pada area untuk menandai status.
- Memilih tampilan dari konten yang sama (bukan penampilan): pakai [Segmented control](segmented-control.md).
- Pengaturan yang menyalakan atau mematikan fitur: pakai [Switch](switch.md). Penampilan punya tiga nilai, jadi ia segmented control, bukan switch.
- Warna untuk seri data: pakai [Chart principles](chart-principles.md). `--series-1..4` sudah disesuaikan per tema dan urutannya tetap.

## Letaknya
`data-theme` dipasang pada `<html>` untuk halaman. Pengalihnya ada di pengaturan, menu akun, atau footer sidebar, tidak pernah di toolbar utama. Tema terbatas dipasang pada elemen terluar dari area yang harus berbeda.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `[data-theme="light"]` | Bawaan (juga yang didapat `:root` tanpa atribut). |
| `[data-theme="dark"]` | Token gelap untuk elemen ini dan semua isinya. |
| `[data-theme="system"]` | Mengikuti sistem operasi lewat `prefers-color-scheme`, secara langsung. |
| `.lds` | Wajib pada root (atau subtree): font dasar, warna teks, latar kanvas, reset. Tema terbatas juga butuh `.lds`, agar ia menggambar latarnya sendiri. |
| `[data-lds-theme]` | Opsional. Tombol dengan `data-lds-theme="dark"` memanggil `setTheme("dark")` saat diklik setelah `init()`. |

## Markup

**Pengalih tampilan.** Segmented control yang tombolnya membawa `data-lds-theme`. Ia mengganti seluruh halaman ini dan mengingat pilihannya di `localStorage`.
```html
<div class="seg" role="group" aria-label="Tampilan" data-lds-segmented style="width: 300px;">
  <span class="seg__thumb"></span>
  <button class="seg__btn" aria-pressed="true" data-lds-theme="light"><span class="ic ic--sm" aria-hidden="true">light_mode</span>&nbsp;Terang</button>
  <button class="seg__btn" aria-pressed="false" data-lds-theme="dark"><span class="ic ic--sm" aria-hidden="true">dark_mode</span>&nbsp;Gelap</button>
  <button class="seg__btn" aria-pressed="false" data-lds-theme="system"><span class="ic ic--sm" aria-hidden="true">contrast</span>&nbsp;Sistem</button>
</div>
```

**Tema terbatas.** Kartu yang sama di subtree terang dan gelap, berdampingan di satu halaman. Tidak ada bagian kartu yang tahu sedang di tema apa.
```html
<div class="auto-grid" style="--min: 260px;">
  <div class="lds" data-theme="light" style="padding: 20px; border-radius: var(--r-lg);">
  <div class="card stack" style="--gap: 12px;">
    <div class="cluster" style="justify-content: space-between;"><span class="card__title">Izin usaha mikro</span><span class="badge badge--success">Buka</span></div>
    <div class="progress"><span class="progress__fill" style="transform: scaleX(0.72);"></span></div>
    <div class="cluster"><button class="btn btn--primary btn--md">Lanjutkan</button><button class="btn btn--secondary btn--md">Persyaratan</button></div>
  </div>
  </div>
  <div class="lds" data-theme="dark" style="padding: 20px; border-radius: var(--r-lg);">
  <div class="card stack" style="--gap: 12px;">
    <div class="cluster" style="justify-content: space-between;"><span class="card__title">Izin usaha mikro</span><span class="badge badge--success">Buka</span></div>
    <div class="progress"><span class="progress__fill" style="transform: scaleX(0.72);"></span></div>
    <div class="cluster"><button class="btn btn--primary btn--md">Lanjutkan</button><button class="btn btn--secondary btn--md">Persyaratan</button></div>
  </div>
  </div>
</div>
```

**Penyiapan halaman tanpa kedipan.** Baca pilihan yang tersimpan sebelum body digambar. `restoreTheme()` menyetel atribut dan mengembalikan mode, sehingga Anda bisa menyelaraskan pengalihnya.
```html
<html lang="en" class="lds" data-theme="light">
<head>
  <link rel="stylesheet" href="css/lds.css">
  <script type="module">
    import { init, restoreTheme } from './js/lds.js';
    const mode = restoreTheme(document.documentElement, 'light');
    document.querySelectorAll('[data-lds-theme]').forEach((b) => b.setAttribute('aria-pressed', String(b.getAttribute('data-lds-theme') === mode)));
    init();
  </script>
</head>
```

## Varian dan ukuran
| Kelas atau atribut | Kapan |
|---|---|
| `light` | Bawaan. Kanvas putih, kelompok di atas `--bg-fill`. |
| `dark` | Kanvas nyaris hitam (#0B0B0D). Aksen sama, warna seri lebih terang, kilau skeleton lebih lembut. |
| `system` | Mengikuti OS dan langsung diperbarui saat berubah. Bawaan yang baik untuk pengalih setelah orang melihat keduanya. |

## Gerak dan mikrointeraksi
- Pergantian tema sengaja instan. `setTheme()` (lewat `swapTheme()`) menambahkan `.lds-theme-swap` ke `<html>` selama 120 ms, yang menyetel `transition: none` pada semuanya, agar warna tidak memudar sepotong-sepotong dengan kecepatan berbeda.
- Satu-satunya pengecualian adalah thumb segmented control, yang tetap bergeser dengan `--spring-smooth` selama `--d-smooth` agar pengalihnya terasa fisik.
- Reduced motion tidak mengubah apa pun di sini; pergantiannya sudah instan.

## Aksesibilitas
- Kedua tema memenuhi kontras yang sama: `--text-subtle` 6.6:1 di terang dan 7.7:1 di gelap; `--accent-text` 6.7:1 dan 9.4:1. Warna proyek harus diperiksa di keduanya.
- Pengalihnya adalah kelompok tombol dengan `aria-pressed` (segmented control), berlabel "Tampilan", dengan ikon dan teks di setiap tombol.
- `setTheme` memicu `lds:theme` dengan `{ mode }` pada root; pakai untuk memperbarui `aria-pressed` pada pengalih yang tidak dibuat oleh `init()`.
- Jangan menyampaikan apa pun hanya lewat tema; pita gelap terbatas tetap butuh heading dan teksnya sendiri.

## Lakukan
- Pakai token untuk setiap warna di CSS proyek agar mengikuti tema.
- Periksa setiap layar baru dalam terang dan gelap sebelum dirilis.
- Setel tema sebelum tampilan pertama dengan `restoreTheme()` di head.

## Hindari
- Menulis aturan `@media (prefers-color-scheme: dark)` untuk komponen; setel `data-theme="system"` sebagai gantinya.
- Menulis langsung nilai hex atau latar `#fff` di gaya proyek.
- Menganimasikan pergantian tema dengan cross-fade panjang.

## Perilaku (HTML biasa)
`setTheme(mode, root = document.documentElement)` menyetel `data-theme`, menyimpannya di `localStorage` dengan kunci `lds-theme`, dan memicu `lds:theme`. `restoreTheme(root, fallback = "light")` membacanya kembali dan mengembalikan mode. `swapTheme(fn)` menjalankan perubahan DOM apa pun dengan transisi ditahan selama 120 ms. Tombol dengan `data-lds-theme="light|dark|system"` memanggil `setTheme` setelah `init()`.

## Terkait
[Segmented control](segmented-control.md) · [Icon](icon.md) · [Chart principles](chart-principles.md) · [Layout primitives](layout-primitives.md)
