# Height expand

Kelompok: Gerak. https://lampung.kartadinata.app/docs/components/height-expand

Konten yang terbuka atau tertutup di dalam alur menganimasikan tingginya lewat baris grid (`0fr` ke `1fr`) dengan smooth spring, sehingga semua yang di bawahnya bergeser alih-alih melompat. Konten memudar masuk sesaat setelah ruangnya terbuka dan memudar keluar sebelum ruangnya tertutup.

## Pakai saat
- Sebuah bagian terbuka di tempat dan mendorong isi di bawahnya: jawaban [accordion](accordion.md), folder [tree](tree.md), [tampilkan lebih banyak](show-more.md), navigasi bertingkat di [app shell](app-shell.md).
- Sesuatu ditutup dan ruangnya harus menutup dengan mulus: [alert](alert.md) atau [banner](banner.md) dengan tombol tutup, petunjuk yang selesai ([petunjuk](hints.md)), baris yang dihapus lewat [aksi swipe](swipe-actions.md).
- Kolom isian atau teks bantuan muncul di bawah kontrol formulir setelah sebuah pilihan (kotak alasan "Lainnya").

## Pakai yang lain saat
- Konten yang mengambang di atas halaman dan tidak mendorongnya: pakai [Popover](popover.md).
- Langkah yang diambil asisten, jarang dibuka: pakai [Tool call](tool-call.md). Elemen details bawaan, tanpa animasi tinggi.
- Mengganti konten di ruang yang sama: pakai [View swap](view-swap.md).
- Panel dari tepi layar: pakai [Sheet](sheet.md).
- Butir baru yang tiba di akhir daftar: pakai [Enter and exit](enter-and-exit.md).

## Letaknya
Blok apa pun di alur normal. Elemen yang dianimasikan adalah pembungkus grid (`acc__panel`, `tree__kids`, `more__rest`, `shell__panel`, `collapse`) dengan tepat satu anak yang memakai `overflow: hidden; min-height: 0`.

## Markup

**Pertanyaan yang terbuka satu per satu.** Buka sebuah pertanyaan: panel tumbuh dengan smooth spring dan jawabannya memudar masuk 80 ms kemudian, naik 4 px. Dengan `data-lds-accordion="single"` panel yang terbuka tertutup saat panel berikutnya terbuka; kedua spring berjalan bersamaan.
```html
<div class="acc" data-lds-accordion="single" style="max-width: 520px;">
  <div class="acc__item"><button class="acc__btn" aria-expanded="true" aria-controls="he-1">Bisakah saya mengubah jadwal kunjungan?<span class="ic" aria-hidden="true">expand_more</span></button><div class="acc__panel is-open" id="he-1" role="region"><div><p>Bisa, paling lambat sehari sebelum jadwal. Setelah itu, hubungi loket pendaftaran puskesmas.</p></div></div></div>
  <div class="acc__item"><button class="acc__btn" aria-expanded="false" aria-controls="he-2">Di mana saya melihat hasil pemeriksaan?<span class="ic" aria-hidden="true">expand_more</span></button><div class="acc__panel" id="he-2" role="region"><div><p>Di menu Riwayat, lalu Hasil pemeriksaan. Hasil muncul dua hari setelah kunjungan.</p></div></div></div>
  <div class="acc__item"><button class="acc__btn" aria-expanded="false" aria-controls="he-3">Bagaimana jika saya tidak datang?<span class="ic" aria-hidden="true">expand_more</span></button><div class="acc__panel" id="he-3" role="region"><div><p>Nomor antrean Anda batal. Daftar ulang untuk mendapat jadwal baru.</p></div></div></div>
</div>
```

**Menutup alert.** Tutup alert-nya: alert memudar sambil ruangnya menutup, dan konten di bawahnya naik dengan mulus. Putar ulang untuk memunculkannya kembali.
```html
<div class="docs-col" style="max-width: 520px;">
  <div class="collapse"><div><div class="alert alert--info" role="status"><span class="ic" aria-hidden="true">info</span><div style="flex: 1;"><div class="alert__title">Pendaftaran izin usaha dibuka Senin pukul 08.00</div><div class="alert__body">Permohonan diproses sesuai urutan masuk.</div></div><button class="icon-btn alert__close" aria-label="Tutup" data-lds-dismiss><span class="ic" aria-hidden="true">close</span></button></div></div></div>
  <div class="card"><p class="card__title">Permohonan Anda</p><p class="card__sub">2 permohonan, 1 menunggu verifikasi</p></div>
</div>
```

**Tampilkan sisa daftar.** Tiga tenggat pertama tampil; sisanya terbuka di bawahnya dengan spring yang sama. Tombolnya menyebut apa yang akan dilakukannya.
```html
<div class="more" data-lds-more data-more="Tampilkan 3 lagi" data-less="Tampilkan lebih sedikit" style="width: 100%; max-width: 420px;">
  <div class="list">
    <div class="lrow"><span class="lrow__body"><span class="lrow__title">Pajak kendaraan</span><span class="lrow__sub">Jumat, 23.59</span></span></div>
    <div class="lrow"><span class="lrow__body"><span class="lrow__title">Retribusi sampah</span><span class="lrow__sub">Sabtu, 12.00</span></span></div>
    <div class="lrow"><span class="lrow__body"><span class="lrow__title">Perpanjangan izin usaha</span><span class="lrow__sub">Senin, 08.00</span></span></div>
    <div class="more__rest"><div>
      <div class="lrow"><span class="lrow__body"><span class="lrow__title">Pajak bumi dan bangunan</span><span class="lrow__sub">Rabu, 10.00</span></span></div>
      <div class="lrow"><span class="lrow__body"><span class="lrow__title">Retribusi pasar</span><span class="lrow__sub">Kamis, 23.59</span></span></div>
      <div class="lrow"><span class="lrow__body"><span class="lrow__title">Laporan usaha tahunan</span><span class="lrow__sub">Jumat depan</span></span></div>
    </div></div>
  </div>
  <button class="btn btn--plain btn--sm more__btn"></button>
</div>
```

**Folder dalam tree.** Folder membuka isinya dengan spring sementara chevron-nya berputar 90 derajat dengan spring yang sama, sehingga keduanya selesai bersamaan.
```html
<div class="tree" role="tree" aria-label="Berkas permohonan" style="max-width: 320px;">
  <button class="tree__row" aria-expanded="true" aria-controls="he-t1"><span class="ic tree__chev" aria-hidden="true">chevron_right</span><span class="ic" aria-hidden="true">folder</span>Data pemohon</button>
  <div class="tree__kids is-open" id="he-t1"><div><button class="tree__row"><span class="ic" aria-hidden="true">description</span>KTP.pdf</button><button class="tree__row"><span class="ic" aria-hidden="true">description</span>Kartu keluarga</button></div></div>
  <button class="tree__row" aria-expanded="false" aria-controls="he-t2"><span class="ic tree__chev" aria-hidden="true">chevron_right</span><span class="ic" aria-hidden="true">folder</span>Data usaha</button>
  <div class="tree__kids" id="he-t2"><div><button class="tree__row"><span class="ic" aria-hidden="true">description</span>Foto tempat usaha</button><button class="tree__row"><span class="ic" aria-hidden="true">description</span>Surat keterangan domisili</button></div></div>
</div>
```

## Varian dan ukuran
| Kelas atau atribut | Kapan |
|---|---|
| `.acc__panel + .is-open` | Accordion. Kontennya (`<p>` atau `.acc__content`) memudar masuk dengan jeda 80 ms dan naik 4 px dengan `--spring-smooth`; saat ditutup, konten memudar keluar lebih dulu selama `--d-fast`. |
| `.collapse + .is-closed` | Penutupan (alert, banner, petunjuk). Baris ke `0fr` dan opacity ke 0 bersamaan; `data-lds-dismiss` menutup yang terdekat. |
| `.more__rest (in .more.is-open)` | Tampilkan lebih banyak. Hanya baris, tanpa pudar. |
| `.tree__kids + .is-open` | Tree. Hanya baris; chevron berputar 90 derajat dengan spring yang sama. |
| `.shell__panel + .is-open` | Bagian navigasi bertingkat di app shell. |
| `.swipe.is-gone` | Baris yang di-swipe hilang dan menutup ruangnya. |

## Gerak dan mikrointeraksi
- Tinggi: `grid-template-rows` dari `0fr` ke `1fr` (dan sebaliknya) selama `--d-smooth` (560 ms) dengan `--spring-smooth`. Browser menginterpolasi tinggi konten yang sebenarnya, jadi tidak ada tebakan `max-height` dan tidak ada pengukuran.
- Konten: di accordion, konten memudar masuk selama `--d-standard` dengan jeda 80 ms (naik dari 4 px di atas) sehingga muncul di ruang yang sudah mulai terbuka; saat ditutup, konten memudar keluar selama `--d-fast` dengan `--ease-exit` sebelum ruangnya hilang.
- Chevron berputar dengan spring dan durasi yang sama dengan tinggi, sehingga ikon dan panel selesai bersamaan.
- Interupsi: buka dan tutup adalah transisi pada sebuah kelas, jadi klik lagi di tengah jalan akan berbalik dari tinggi saat itu.
- Reduced motion: tinggi tetap berubah (karena membawa makna) tetapi dalam 120 ms linear; pudar konten 120 ms; bagian app shell berganti seketika.

## Aksesibilitas
- Pemicunya adalah `<button>` dengan `aria-expanded` dan `aria-controls` yang menunjuk ke panel; panel bisa memakai `role="region"` dengan label jika isinya banyak.
- Konten yang tertutup terpotong tetapi masih ada di DOM; buat `inert` (seperti tampilkan lebih banyak) atau sembunyikan setelah tertutup jika berisi kontrol yang bisa difokus.
- Menutup sesuatu tidak boleh memindahkan urutan fokus secara tak terduga: setelah menutup, fokuskan kontrol berikutnya yang masuk akal.

## Lakukan
- Pakai pembungkus grid dengan satu anak `overflow: hidden; min-height: 0`.
- Putar chevron dengan spring yang sama dengan tinggi.
- Tutup hal yang ditutup dengan `.collapse` agar halaman menutup celahnya alih-alih melompat.

## Hindari
- Menganimasikan `height` atau `max-height` secara langsung.
- Memudarkan konten masuk sebelum ruangnya terbuka.
- Membuka lebih dari satu tingkat sekaligus dengan stagger; biarkan setiap panel terbuka sendiri.

## Perilaku (HTML biasa)
`init()` memasang `.acc__btn[aria-controls]` dan `.tree__row[aria-controls]` (membalik `aria-expanded` dan `.is-open`; `data-lds-accordion="single"` pada grup menutup yang lain), `[data-lds-dismiss]` (menambahkan `.is-closed` ke `.collapse` terdekat dan memancarkan `lds:dismiss`), dan `[data-lds-more]` (membalik `.is-open`, memperbarui teks tombol dari `data-more` / `data-less` dan `aria-expanded`, membuat sisanya `inert` selama tertutup).

## React
```tsx
import { AccordionItem } from 'lampung-design-system/react';

<div className="acc">
  <AccordionItem title="Can I change my visit schedule?">Yes, up to one day before the appointment.</AccordionItem>
  <AccordionItem title="Where can I see my checkup results?">Under History, then Checkup results.</AccordionItem>
</div>
```

## Terkait
[Accordion](accordion.md) · [Show more](show-more.md) · [Alert](alert.md) · [Tree](tree.md)
