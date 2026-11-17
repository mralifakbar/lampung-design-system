# Page header

Kelompok: Navigasi. https://lampung.kartadinata.app/docs/components/page-header

Bagian atas halaman: breadcrumbs, judul dengan satu baris konteks, dan aksi halaman pada garis dasar yang sama. Gabungan dari bagian yang sudah ada, bukan komponen tersendiri.

## Pakai saat
- Setiap halaman konten di dalam aplikasi: sebuah layanan, data pemohon, sebuah laporan.
- Halaman punya aksi yang berlaku untuk seluruh halaman (Bagikan, Permohonan baru) dan aksi itu butuh tempat.

## Pakai yang lain saat
- Layar ponsel dengan judul yang menyatu ke bar saat digulir: pakai [Phone bars](phone-bars.md). Pakai nav bar dengan judul besar.
- Heading untuk satu bagian halaman: pakai [Sections](sections.md). Pakai `.section__head` di dalam `.sections`.
- Satu hal yang perlu dilakukan berikutnya di halaman depan: pakai [Spotlight](spotlight.md).
- Navigasi seluruh situs: pakai [Top nav](top-nav.md).

## Letaknya
Hal pertama di kolom konten sebuah [app shell](app-shell.md), di atas [tabs](tabs.md) jika halaman memilikinya. Aksi berada di kanan pada layar lebar dan turun ke bawah judul di ponsel (`cluster` membungkus sendiri).

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `header.stack` | Wajib. Pembungkus; menumpuk breadcrumbs dan baris judul berjarak 14 px (`--gap: 14px`). |
| `nav > ol.crumbs` | [Breadcrumbs](breadcrumbs.md) opsional. |
| `.cluster` | Wajib. Baris judul: blok judul dan aksi, dipisah dan rata bawah; membungkus saat sempit. |
| `.section__head > h1` | Wajib. Judul halaman dengan `--type-title-1` (28/34, 600) dan `--tracking-title-1`. Atur tipografinya di `<h1>`; sistem belum punya kelas judul halaman. |
| `.section__sub` | Satu baris konteks di bawah judul: kode, jadwal, penanggung jawab. |
| `.btn--md` | Aksi halaman: satu utama dan satu atau dua sekunder, 36 px. |

## Markup

**Halaman layanan.** Breadcrumbs, judul dengan konteksnya, dan dua aksi pada garis dasar yang sama.
```html
<header class="stack" style="--gap: 14px;">
  <nav aria-label="Breadcrumb">
    <ol class="crumbs">
      <li><a href="#ph">Layanan</a></li>
      <li><span class="ic" aria-hidden="true">chevron_right</span></li>
      <li><a href="#ph">Perizinan</a></li>
      <li><span class="ic" aria-hidden="true">chevron_right</span></li>
      <li><span aria-current="page">Izin usaha mikro</span></li>
    </ol>
  </nav>
  <div class="cluster" style="justify-content: space-between; align-items: flex-end; --gap: 16px;">
    <div class="section__head">
      <h1 style="margin: 0; font: var(--type-title-1); letter-spacing: var(--tracking-title-1); color: var(--text-strong);">Izin usaha mikro</h1>
      <p class="section__sub">IUM 2104 · selesai 3 hari kerja · Senin sampai Kamis, 08.00</p>
    </div>
    <div class="cluster">
      <button class="btn btn--secondary btn--md"><span class="ic" aria-hidden="true">ios_share</span>Bagikan</button>
      <button class="btn btn--primary btn--md"><span class="ic" aria-hidden="true">add</span>Permohonan baru</button>
    </div>
  </div>
</header>
```

**Dengan tabs di bawahnya.** Halaman data: tanpa breadcrumbs, menu "lainnya" untuk aksi yang jarang, dan tabs sebagai baris terakhir header.
```html
<header class="stack" style="--gap: 14px;">
  <div class="cluster" style="justify-content: space-between; align-items: flex-end; --gap: 16px;">
    <div class="section__head">
      <h1 style="margin: 0; font: var(--type-title-1); letter-spacing: var(--tracking-title-1); color: var(--text-strong);">Rina Wijaya</h1>
      <p class="section__sub">Pemohon 2023-0418 · Kecamatan Kedaton · 2 permohonan aktif</p>
    </div>
    <div class="cluster">
      <button class="btn btn--secondary btn--md"><span class="ic" aria-hidden="true">mail</span>Kirim pesan</button>
      <button class="icon-btn" aria-label="Aksi lainnya"><span class="ic" aria-hidden="true">more_horiz</span></button>
    </div>
  </div>
  <div class="tabs tabs--start" role="tablist" aria-label="Data pemohon">
    <button class="tabs__btn" role="tab" aria-selected="true">Profil</button>
    <button class="tabs__btn" role="tab" aria-selected="false" tabindex="-1">Permohonan</button>
    <button class="tabs__btn" role="tab" aria-selected="false" tabindex="-1">Riwayat</button>
  </div>
</header>
```

## Gerak dan mikrointeraksi
- Tidak ada yang bergerak sendiri di header. Aksi tetap punya umpan balik tekan masing-masing (skala 0,97 dalam 90 ms); breadcrumbs berganti warna halus selama `--d-fast`.

## Aksesibilitas
- Satu `<h1>` per halaman, dan itulah judul ini. Heading bagian di bawahnya adalah `<h2>`.
- Taruh header di dalam `<main>` agar skip link mendarat di judul.
- Aksi yang hanya berupa ikon adalah [icon button](icon-button.md) dengan `aria-label`.

## Lakukan
- Pertahankan satu aksi utama; taruh aksi yang jarang dipakai di [dropdown menu](dropdown-menu.md) di balik icon button "lainnya".
- Isi baris konteks dengan fakta sederhana (kode, penanggung jawab, tanggal), bukan paragraf deskripsi.
- Samakan judul dengan breadcrumb terakhir dan tautan yang mengarah ke sini.

## Hindari
- Membuat kelas `.page-header` baru dengan padding dan tipografi sendiri; gabungkan bagian yang sudah ada.
- Menaruh filter atau pencarian di header; tempatnya di atas daftar yang difilter.
- Menambah gambar hero atau pita berwarna di belakang judul halaman kerja.

## Terkait
[Breadcrumbs](breadcrumbs.md) · [Tabs](tabs.md) · [Sections](sections.md) · [Button](button.md)
