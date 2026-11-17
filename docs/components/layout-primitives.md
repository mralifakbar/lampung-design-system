# Layout primitives

Kelompok: Landasan. https://lampung.kartadinata.app/docs/components/layout-primitives

Tujuh kelas kecil yang menata semua hal di antara komponen: `stack`, `cluster`, `auto-grid`, `split-2`, `center`, `measure`, dan `sr-only`. Pakai ini sebelum menulis `display: flex` atau `grid` sendiri.

## Pakai saat
- Anda perlu menaruh komponen bersebelahan atau bertumpuk: kolom kartu (`stack`), baris tombol atau badge yang bisa turun baris (`cluster`), grid petak yang menata ulang sesuai lebar (`auto-grid`).
- Halaman punya kolom samping sempit dan kolom utama yang harus menjadi satu kolom di tablet dan ponsel (`split-2`).
- Teks atau satu blok harus berada di tengah areanya (`center`) atau teks panjang harus menjaga panjang baris yang nyaman dibaca (`measure`).
- Sesuatu harus dibacakan pembaca layar tetapi tidak ditampilkan (`sr-only`): tabel di balik grafik, "terbuka di tab baru" setelah tautan eksternal.

## Pakai yang lain saat
- Kolom, pasangan kolom, dan tombol penutup formulir: pakai [Form layout](form-layout.md). `form`, `form__row`, dan `form__actions` sudah membawa jarak yang tepat dan perilaku di ponsel.
- Halaman yang terdiri dari bagian berjudul dengan pemisah di antaranya: pakai [Sections](sections.md).
- Bingkai aplikasi: sidebar, bilah atas, area utama yang menggulir: pakai [App shell](app-shell.md).
- Baris tombol menyatu yang bertindak pada satu objek: pakai [Button group](button-group.md). `cluster` hanya memberi jarak; tidak menyatukan.
- Baris kartu yang menggulir ke samping: pakai [Carousel](carousel.md).
- Dua panel yang ukurannya diubah pembaca dengan menyeret: pakai [Resizable split](resizable-split.md).

## Letaknya
Di mana saja di dalam halaman, bersarang sedalam yang diperlukan: `stack` berisi bagian-bagian, masing-masing memuat `cluster` aksi dan `auto-grid` kartu. Kelas ini tidak membawa warna, padding, atau radius, jadi tidak pernah bersaing dengan komponen di dalamnya. `split-2` menjadi satu kolom di bawah 860 px; `auto-grid` mengurangi kolom sendiri saat lebar menyusut.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.stack` | Alur vertikal. `gap` bawaan 12 px; setel `--gap` sebaris (`style="--gap: 20px"`) untuk kelompok (20 sampai 28) atau bagian (48). |
| `.cluster` | Baris horizontal yang bisa turun baris, item di tengah sumbu silang. `--gap` bawaan 8 px. |
| `.auto-grid` | Sebanyak mungkin kolom sama lebar yang muat, masing-masing minimal selebar `--min` (bawaan 240 px), tidak pernah lebih lebar dari kontainer. `--gap` bawaan 12 px. |
| `.split-2` | Dua kolom: kolom samping selebar `--side` (bawaan 320 px) dan kolom utama yang mengambil sisanya. `--gap` bawaan 28 px. Satu kolom di bawah 860 px. |
| `.center` | Grid yang menengahkan anaknya di kedua sumbu dan menengahkan teks. |
| `.measure` | Membatasi lebar pada `--size-measure` (680 px), sekitar 70 karakter teks isi. |
| `.sr-only` | Tersembunyi secara visual, tetap ada di pohon aksesibilitas. |

## Markup

**Stack dan cluster.** Stack untuk kolom, cluster untuk baris aksi yang turun baris di layar sempit. Jarak berasal dari `--gap`, tidak pernah dari margin pada anak.
```html
<div class="stack" style="--gap: 16px; max-width: 520px;">
  <div class="stack" style="--gap: 4px;">
    <h3 class="section__title-sm">Izin usaha mikro, tahap 2</h3>
    <p class="card__sub">Verifikasi berkas dan survei lokasi. 4 langkah, 1 kunjungan.</p>
  </div>
  <div class="cluster">
    <span class="badge badge--accent">Diproses</span>
    <span class="badge">4 dari 6 langkah</span>
    <span class="badge badge--warning">Survei hari Jumat</span>
  </div>
  <div class="cluster" style="--gap: 10px;">
    <button class="btn btn--primary">Lanjutkan langkah 5</button>
    <button class="btn btn--secondary">Buka catatan petugas</button>
  </div>
</div>
```

**Auto grid.** Kartu minimal 200 px: empat berjajar di layar lebar, dua di tablet, satu di ponsel, tanpa media query. Ubah ukuran jendela untuk melihatnya menata ulang.
```html
<div class="auto-grid" style="--min: 200px;">
  <div class="card"><div class="card__title">Kartu tanda penduduk</div><div class="card__sub">Disdukcapil · 3 hari kerja</div></div>
  <div class="card"><div class="card__title">Izin usaha mikro</div><div class="card__sub">Perizinan · 5 hari kerja</div></div>
  <div class="card"><div class="card__title">Pajak kendaraan</div><div class="card__sub">Samsat · 1 hari kerja</div></div>
  <div class="card"><div class="card__title">Rujukan puskesmas</div><div class="card__sub">Kesehatan · hari yang sama</div></div>
</div>
```

**Samping dan utama.** Kolom samping 240 px di samping konten utama; di bawah 860 px kolom samping pindah ke atas kolom utama.
```html
<div class="split-2" style="--side: 240px;">
  <div class="card card--fill stack" style="--gap: 6px;">
    <div class="card__title">Progres permohonan</div>
    <div class="card__sub">12 dari 20 berkas diperiksa</div>
    <div class="progress"><span class="progress__fill" style="transform: scaleX(0.6);"></span></div>
  </div>
  <div class="stack measure">
    <h3 class="section__title-sm">Langkah 13: Pemeriksaan lokasi</h3>
    <p class="card__sub">Petugas datang ke alamat usaha untuk mencocokkan denah dengan kondisi di lapangan, lalu mengunggah hasilnya.</p>
  </div>
</div>
```

**Tengah dan teks tersembunyi.** `center` menaruh satu blok di tengah areanya. `sr-only` menambahkan kata yang hanya didengar pembaca layar.
```html
<div class="center" style="min-height: 180px;">
  <div class="stack" style="--gap: 8px; align-items: center;">
    <span class="ic ic--lg" aria-hidden="true">checklist</span>
    <p class="card__title">Semua berkas minggu ini sudah diperiksa</p>
    <a class="link link--external" href="https://example.com" target="_blank" rel="noreferrer">Lihat jadwal minggu depan<span class="sr-only"> (terbuka di tab baru)</span></a>
  </div>
</div>
```

## Varian dan ukuran
| Kelas atau atribut | Kapan |
|---|---|
| `--gap` | Jarak pada `stack`, `cluster`, `auto-grid`, `split-2`. Tetap di grid 4 px: 8 sampai 12 untuk item terkait, 20 sampai 28 untuk kelompok, 48 untuk bagian. |
| `--min` | Hanya `auto-grid`: lebar tersempit sebuah kolom sebelum grid mengurangi kolom. 160 untuk petak kecil, 240 untuk kartu, 320 untuk kartu lebar. |
| `--side` | Hanya `split-2`: lebar kolom samping. |

## Gerak dan mikrointeraksi
- Tidak ada. Layout primitive tidak pernah dianimasikan. Saat anaknya berubah, pakai [list stagger](list-stagger.md) untuk kedatangan atau [height expand](height-expand.md) untuk pertumbuhan di dalamnya.
- Penataan ulang saat ukuran berubah memang instan; jangan tambahkan `transition` pada `grid-template-columns`.

## Aksesibilitas
- Kelas ini hanya mengubah posisi visual. Jaga urutan DOM sama dengan urutan baca: `split-2` menaruh kolom samping lebih dulu di sumber, jadi taruh konten yang harus dibaca lebih dulu di sana, atau tukar kolomnya.
- Jangan pernah memakai `order` atau `flex-direction: row-reverse` untuk menyusun ulang konten di dalamnya; fokus keyboard mengikuti sumber, bukan layar.
- Konten `sr-only` diumumkan dan menjadi bagian nama aksesibel tautan atau tombol induknya. Jangan menaruh elemen yang bisa difokus di dalamnya.
- Pakai heading dan landmark (`<main>`, `<nav>`, `<section aria-labelledby>`) untuk struktur; `stack` hanyalah `<div>`.

## Lakukan
- Atur jarak dengan `--gap` di induk alih-alih margin di anak.
- Sarangkan primitive: `stack` berisi beberapa `cluster`, `auto-grid` di dalam kolom utama `split-2`.
- Pasang `min-width: 0` pada anak buatan sendiri di grid Anda; primitive sudah melakukannya untuk anak mereka.

## Hindari
- Menulis kelas baru `.my-row { display: flex; gap: 12px }` padahal `cluster` sudah cukup.
- Memakai `auto-grid` untuk formulir; kolom butuh [form layout](form-layout.md) agar label dan galat sejajar.
- Menambahkan latar, padding, atau radius pada primitive. Bungkus kontennya dengan [card](card.md).

## Terkait
[Form layout](form-layout.md) · [Sections](sections.md) · [App shell](app-shell.md) · [Card](card.md)
