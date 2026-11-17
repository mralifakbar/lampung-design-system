# Spotlight

Kelompok: Pola halaman. https://lampung.kartadinata.app/docs/components/spotlight

Satu hal di halaman yang paling layak dikerjakan berikutnya, di atas tint aksen: eyebrow, judul, satu kalimat, dan satu atau dua aksi. Paling banyak satu per halaman.

## Pakai saat
- Ada langkah berikutnya yang jelas untuk orang ini: mendaftar sebelum tenggat, melanjutkan permohonan yang belum selesai, melengkapi profil.
- Dasbor butuh satu ajakan bertindak utama di atas bagian-bagian biasa.
- Formulir kecil yang menjadi inti halaman (bergabung dengan kode) boleh berada di dalamnya; field otomatis memakai warna dasar.

## Pakai yang lain saat
- Memberi tahu tentang masalah atau perubahan (peringatan, gangguan layanan): pakai [Alert](alert.md). Atau [banner](banner.md) selebar halaman.
- Beberapa tujuan dengan bobot setara: pakai [Link card](link-card.md).
- Belum ada apa-apa dan halaman menjelaskan cara memulai: pakai [Empty state](empty-state.md).
- Angka-angka penting: pakai [Stat row](stat-row.md).
- Menunjuk satu kontrol untuk tips pertama kali: pakai [Coachmark](coachmark.md).
- Notifikasi yang hilang sendiri: pakai [Toast](toast.md).

## Letaknya
Dekat bagian atas kolom utama, di dalam [section](sections.md) pertama atau tepat di bawah [page header](page-header.md), selebar kolom. Di ponsel tetap di atas dengan padding 20 px.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.spotlight` | Wajib. Tint aksen, padding 28 px (20 px di ponsel), radius ekstra besar. |
| `.spotlight__eyebrow` | Opsional. Label aksen kecil dengan ikon ("Langkah berikutnya", "Batas hari Jumat"). |
| `.spotlight__title` | Wajib. `h2` atau `h3`, Title 2, paling banyak 34 karakter per baris. |
| `.spotlight__body` | Opsional. Satu atau dua kalimat tentang alasan pentingnya. |
| `.spotlight__actions` | Wajib. Satu [button](button.md) utama dan paling banyak satu sekunder, 14 px di atasnya. |

## Markup

**Langkah berikutnya di dasbor.** Sebutkan apa, kapan batasnya, dan mengapa penting; tombol utama menyebut hasilnya.
```html
<div class="spotlight" style="width: 100%;">
  <span class="spotlight__eyebrow"><span class="ic" aria-hidden="true">event</span>Langkah berikutnya</span>
  <h3 class="spotlight__title">Daftar ulang usaha sebelum 30 November</h3>
  <p class="spotlight__body">Kuota pendampingan UMKM diberikan kepada pendaftar paling awal.</p>
  <div class="spotlight__actions"><button type="button" class="btn btn--primary">Daftar sekarang</button><button type="button" class="btn btn--secondary">Lihat jadwal</button></div>
</div>
```

**Dengan formulir kecil.** Field di dalam spotlight tetap berwarna dasar, tidak pernah isian di atas isian.
```html
<div class="spotlight" style="width: 100%;">
  <span class="spotlight__eyebrow"><span class="ic" aria-hidden="true">group</span>Gabung kelompok</span>
  <h3 class="spotlight__title">Sudah dapat kode dari pendamping?</h3>
  <div class="spotlight__actions" style="align-items: flex-end;">
    <div class="field" style="flex: 1; min-width: 200px;"><label class="sr-only" for="sp-code">Kode kelompok</label><div class="control"><input id="sp-code" placeholder="mis. UMKM-2026-A" autocapitalize="characters"></div></div>
    <button type="button" class="btn btn--primary">Gabung kelompok</button>
  </div>
</div>
```

## Gerak dan mikrointeraksi
- Statis secara bawaan. Jika muncul karena tindakan orang (langkah baru terbuka), biarkan masuk sekali dengan [enter and exit](enter-and-exit.md): memudar dan naik 8 px dengan `--spring-smooth`.
- Saat langkahnya selesai, ciutkan dengan `.collapse` (`grid-template-rows` dengan `--spring-smooth`, 560 ms) agar halaman tidak melompat. Lihat [height expand](height-expand.md).
- Reduced motion: muncul dan hilang tanpa perpindahan.

## Aksesibilitas
- Pakai heading asli untuk judul (`h2` atau `h3` sesuai kerangka halaman) agar ditemukan lewat navigasi heading.
- Tombol menyebut hasil ("Daftar sekarang"); field tunggal tetap punya label (disembunyikan secara visual dengan `.sr-only` boleh jika judul sudah menjelaskannya).
- Teks di atas tint aksen memakai `--text-strong` dan `--text-subtle`; jangan pakai warna kustom.

## Lakukan
- Tampilkan satu spotlight, dan hanya selama langkahnya relevan.
- Masukkan tenggat atau alasannya di judul.

## Hindari
- Menumpuk dua spotlight, atau memakainya untuk promosi yang bukan langkah berikutnya bagi orang ini.
- Menambah bayangan, gambar, atau gradien agar lebih mencolok.
- Memakainya untuk galat; itu tugas [alert](alert.md).

## Terkait
[Sections](sections.md) · [Alert](alert.md) · [Empty state](empty-state.md) · [Link card](link-card.md)
