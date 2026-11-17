# Floor plan

Kelompok: Tampilan data. https://lampung.kartadinata.app/docs/components/floor-plan

Hal yang bisa dipesan digambar di tempatnya: meja di ruang makan, ruangan di satu lantai, meja belajar di perpustakaan. Masing-masing adalah tombol yang diwarnai menurut state-nya, dan state itu selalu tertulis juga dalam kata, sehingga orang menemukan yang kosong dari tempat dan namanya.

## Pakai saat
- Letak sesuatu sama pentingnya dengan state-nya: meja di rumah makan, meja atau ruang belajar yang dipesan, tempat tidur di bangsal puskesmas.
- Ruangan sebuah gedung per lantai, tempat petugas mencari yang perlu ditangani (dibersihkan, diperiksa, rusak).
- Meja layanan depan yang sepanjang hari menempatkan, memindahkan, dan menggabungkan sesuatu, dan perlu melihat seluruh ruangan sekaligus.

## Pakai yang lain saat
- Pemesanan selama beberapa hari atau jam, per ruangan atau orang: pakai [Lanes](lanes.md).
- Catatan yang dibandingkan menurut banyak atribut: pakai [Data table](data-table.md).
- Beberapa butir yang letaknya tidak penting: pakai [List](list.md).
- Pemberhentian satu perjalanan: pakai [Route schematic](route-schematic.md).

## Letaknya
Selebar satu kartu penuh atau delapan dari dua belas kolom, dengan legenda di bawahnya. Denah berposisi tetap mempertahankan bentuknya: beri lebar `--min` dan denah bergulir ke samping di dalam kotaknya di ponsel. Denah mengalir (`.floor--flow`) menyusun ulang dirinya, jadi cocok untuk grid ruangan yang tidak punya geometri nyata.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.floor` | Wajib. Kotak dengan isian tenang, padding 16 px, radius besar. Bergulir ke samping bila denahnya lebih lebar; beri `tabindex="0"`, `role="region"`, dan label untuk itu. |
| `.floor__plan` | Wajib. Grid-nya. `--cols` kolom, `--row` tinggi baris (64 px), `--min` lebar tersempit sebelum kotaknya bergulir. Unit memakai `grid-area`. |
| `.floor--flow` | Varian. Unit mengalir ke kolom selebar minimal `--unit` (96 px); `.floor__label` (dengan hitungan `small`) memulai setiap kelompok, misalnya lantai. |
| `button.floor__unit` | Wajib. Satu meja, ruangan, atau meja kerja: `.floor__name` dan `.floor__meta` (state atau siapa yang ada di sana, dalam kata). `aria-pressed` menandai unit yang detailnya sedang terbuka. `--round` untuk meja bundar. |
| `.floor__flag` | Opsional. Satu ikon di sudut untuk hal yang perlu dilihat (terlambat, permintaan, peringatan). Meta menyebutnya dalam kata. |
| `.floor__zone` | Opsional. Area bergaris putus dengan namanya di belakang unit: kantin, teras, ruang tenang. Tidak interaktif. |
| `.floor__legend > .floor__key` | Disarankan. Satu kunci per state dengan hitungan di `b`, dengan tone yang sama seperti unit. |

## Markup

**Berposisi tetap: perpustakaan daerah.** Meja dan bilik di tempatnya. Dipesan, dipakai, dibersihkan, dan rusak masing-masing punya tone dan kata; bilik terpilih punya ring aksen. Persempit jendela: denah mempertahankan bentuknya dan bergulir di dalam kotaknya.
```html
<div class="stack" style="--gap: 12px;">
<div class="floor" tabindex="0" role="region" aria-label="Perpustakaan daerah, lantai dasar, bisa digulir ke samping" style="--cols: 10; --row: 56px; --min: 560px;">
  <div class="floor__plan">
    <span class="floor__zone" style="grid-area: 1 / 8 / 5 / 11;">Ruang tenang</span>
    <button class="floor__unit floor__unit--round" type="button" aria-pressed="false" style="grid-area: 1 / 1 / 3 / 3;"><span class="floor__name">A1</span><span class="floor__meta">Kosong</span></button>
    <button class="floor__unit floor__unit--round floor__unit--accent" type="button" aria-pressed="false" style="grid-area: 1 / 3 / 3 / 5;"><span class="floor__name">A2</span><span class="floor__meta">Dipesan 14.00</span></button>
    <button class="floor__unit floor__unit--round floor__unit--strong" type="button" aria-pressed="true" style="grid-area: 1 / 5 / 3 / 7;"><span class="floor__name">A3</span><span class="floor__meta">Dipakai</span></button>
    <button class="floor__unit floor__unit--strong" type="button" aria-pressed="false" style="grid-area: 3 / 1 / 4 / 4;"><span class="floor__name">B1</span><span class="floor__meta">Dipakai</span></button>
    <button class="floor__unit" type="button" aria-pressed="false" style="grid-area: 3 / 4 / 4 / 7;"><span class="floor__name">B2</span><span class="floor__meta">Kosong</span></button>
    <button class="floor__unit floor__unit--muted" type="button" aria-pressed="false" style="grid-area: 2 / 8 / 3 / 10;"><span class="floor__name">Q1</span><span class="floor__meta">Dibersihkan</span></button>
    <button class="floor__unit" type="button" aria-pressed="false" style="grid-area: 3 / 8 / 4 / 10;"><span class="floor__name">Q2</span><span class="floor__meta">Kosong</span></button>
    <button class="floor__unit floor__unit--danger" type="button" aria-pressed="false" style="grid-area: 4 / 1 / 5 / 3;"><span class="ic floor__flag" aria-hidden="true">warning</span><span class="floor__name">C1</span><span class="floor__meta">Rusak</span></button>
    <button class="floor__unit floor__unit--accent" type="button" aria-pressed="false" style="grid-area: 4 / 3 / 5 / 5;"><span class="floor__name">C2</span><span class="floor__meta">Dipesan 15.30</span></button>
  </div>
</div>
<div class="floor__legend"><span class="floor__key">Kosong <b>3</b></span><span class="floor__key floor__key--accent">Dipesan <b>2</b></span><span class="floor__key floor__key--strong">Dipakai <b>2</b></span><span class="floor__key floor__key--muted">Dibersihkan <b>1</b></span><span class="floor__key floor__key--danger">Rusak <b>1</b></span></div>
</div>
```

**Mengalir: ruangan per lantai.** Tanpa geometri, hanya urutan: ruangan mengalir ke kolom sebanyak yang muat, label memulai setiap lantai dan menghitung yang siap.
```html
<div class="floor floor--flow" style="--unit: 84px; --row: 60px; max-width: 640px;">
  <div class="floor__plan">
    <div class="floor__label">Lantai 2<small>6 ruang · 2 siap</small></div>
    <button class="floor__unit floor__unit--success" type="button" aria-pressed="false"><span class="floor__name">201</span><span class="floor__meta">Siap</span></button><button class="floor__unit floor__unit--strong" type="button" aria-pressed="false"><span class="floor__name">202</span><span class="floor__meta">Dipakai</span></button><button class="floor__unit floor__unit--warning" type="button" aria-pressed="false"><span class="floor__name">203</span><span class="floor__meta">Perlu dibersihkan</span></button><button class="floor__unit floor__unit--success" type="button" aria-pressed="false"><span class="floor__name">204</span><span class="floor__meta">Siap</span></button><button class="floor__unit floor__unit--strong" type="button" aria-pressed="false"><span class="floor__name">205</span><span class="floor__meta">Dipakai</span></button><button class="floor__unit floor__unit--muted" type="button" aria-pressed="false"><span class="floor__name">206</span><span class="floor__meta">Tutup</span></button>
    <div class="floor__label">Lantai 1<small>4 ruang · 1 siap</small></div>
    <button class="floor__unit floor__unit--strong" type="button" aria-pressed="false"><span class="floor__name">101</span><span class="floor__meta">Dipakai</span></button><button class="floor__unit floor__unit--warning" type="button" aria-pressed="false"><span class="floor__name">102</span><span class="floor__meta">Perlu dibersihkan</span></button><button class="floor__unit floor__unit--success" type="button" aria-pressed="false"><span class="floor__name">103</span><span class="floor__meta">Siap</span></button><button class="floor__unit floor__unit--accent" type="button" aria-pressed="false"><span class="floor__name">104</span><span class="floor__meta">Dipesan 13.00</span></button>
  </div>
</div>
```

## Varian dan ukuran
| Kelas atau atribut | Kapan |
|---|---|
| `(no tone)` | Kosong atau tersedia: putih dengan ring tipis. |
| `.floor__unit--accent` | Dipesan atau sudah ditempati tamu: tint aksen. |
| `.floor__unit--strong` | Sedang dipakai, terisi: aksen penuh dengan teks putih. State paling sibuk, jadi yang paling dulu dilihat orang. |
| `.floor__unit--success | --warning | --danger` | Siap atau sudah diperiksa; perlu perhatian (tagihan, dibersihkan); rusak atau diblokir. |
| `.floor__unit--muted` | Tidak tersedia karena alasan biasa: tutup, sedang dibersihkan. |
| `.floor__unit--round` | Meja bundar: lingkaran di area persegi, pil di area memanjang. |
| `.floor--flow` | Ruangan berurutan, tersusun ulang menurut lebar, dikelompokkan dengan `.floor__label`. |

## Status
| Status | Caranya |
|---|---|
| `hover` | Ring menebal menjadi 1,5 px dengan tone unitnya. |
| `pressed` | Mengecil ke 0,97 dan kembali dengan `--spring-snappy`. |
| `selected` | `aria-pressed="true"`: ring aksen 2 px di luar unit, terpisah dari isiannya. |
| `state changed` | Tukar kelas tone dan kata meta: isian dan teks berganti selama `--d-standard`. |
| `loading` | Pertahankan kotaknya; taruh blok `.skel` di grid area yang sama. |
| `empty` | [Empty state](empty-state.md) di dalam kotak: "Tidak ada meja di teras malam ini". |

## Gerak dan mikrointeraksi
- Perubahan tone (ditempati, lalu memesan, lalu menunggu tagihan) memudar silang isian dan teks selama `--d-standard` (240 ms), sehingga perubahan di lantai yang sibuk terlihat tanpa mencolok.
- Saat ditekan mengecil ke 0,97 selama 90 ms lalu memantul kembali dengan `--spring-snappy`.
- Tidak ada yang bergerak sendiri; unit tetap di tempat ruangannya menaruhnya. Reduced motion: tanpa skala saat ditekan, warna berubah selama 120 ms.

## Aksesibilitas
- Setiap unit adalah tombol asli yang dinamai oleh teksnya: "T12, 4 tamu, sudah memesan". Taruh state di `.floor__meta`, jangan hanya lewat warna.
- `aria-pressed` menyebut unit mana yang detailnya terbuka. Buka detailnya di [drawer](drawer.md) dan kembalikan fokus ke unit saat drawer ditutup.
- Denah yang bergulir adalah `region` berlabel yang bisa difokus, sehingga bisa digulir dengan keyboard.
- Zona adalah teks untuk pembaca yang melihat; ulangi nama area di label unit yang membutuhkannya ("Teras, T21").

## Lakukan
- Namai unit seperti petugas menyebutnya (T12, 503) dan taruh state atau nama tamu di baris meta.
- Sertakan legenda dengan hitungan di bawah denah.
- Pakai tone terkuat untuk state yang paling penting di lantai itu.

## Hindari
- Menggambar dinding, kursi, atau perabot; denah adalah peta hal yang bisa dipesan.
- Memakai lebih dari lima tone dalam satu denah.
- Mengecilkan denah berposisi tetap sampai nama terpotong; biarkan bergulir.

## Terkait
[Lanes](lanes.md) · [List](list.md) · [Drawer](drawer.md) · [Badge](badge.md)
