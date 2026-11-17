# Sheet

Kelompok: Lapisan. https://lampung.kartadinata.app/docs/components/sheet

Panel yang naik dari bawah untuk tugas yang tetap menjaga konteks: halaman di belakang mundur tetapi tetap terlihat. Seret grabber untuk menutup dengan momentum. Jawaban versi ponsel untuk sebagian besar dialog.

## Pakai saat
- Di ponsel, tugas terfokus yang terkait layar saat ini: catat kehadiran, pilih jadwal, atur filter, bagikan.
- Daftar opsi pendek dengan detail lebih banyak dari yang bisa dimuat menu.
- Apa pun yang mungkin ingin disentil pergi dengan jempol.

## Pakai yang lain saat
- Tugas yang sama di layar lebar, di samping daftar: pakai [Drawer](drawer.md).
- Formulir tingkat halaman yang sebaiknya menjadi dialog di tengah pada desktop dan sheet di ponsel: pakai [Modal](modal.md). Modal native menjadi bottom sheet sendiri di bawah 600 px.
- Mengonfirmasi aksi destruktif: pakai [Alert dialog](alert-dialog.md).
- Tiga sampai tujuh perintah pada sebuah objek: pakai [Dropdown menu](dropdown-menu.md).
- Pesan bahwa sesuatu telah terjadi: pakai [Toast](toast.md).

## Letaknya
Menempel di bawah kontainer yang diposisikan (`.viewport`, atau pembungkus `position: fixed; inset: 0` untuk halaman sungguhan), selebar penuh, sudut atas membulat, di atas scrim. Tombol utama selebar penuh di bawah (`btn--block`). Jaga tingginya di bawah sekitar 80 %.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.scrim[data-lds-scrim="id"]` | Wajib. Meredupkan halaman; klik untuk menutup; memudar saat sheet diseret ke bawah. |
| `.sheet[role=dialog][aria-modal=true]` | Wajib. Panel dengan `id`, `data-lds-layer`, dan `aria-labelledby`. |
| `.sheet__grabber` | Wajib. Pegangan 36 kali 5 px; seret untuk menggerakkan sheet. `aria-hidden`. |
| `.sheet__head` | Baris judul dengan tombol tutup; tambahkan `data-lds-drag` agar juga menjadi pegangan seret. |
| `.sheet__title` | Wajib. Judul 17 px. |
| `[data-lds-push="id"]` | Pada `.viewport` yang memuat sheet: `.viewport__content`-nya mengecil ke 0,94 selama sheet terbuka. Efek mundur ini diatur untuk `.viewport > .viewport__content` dan `.phone > .phone__content` ([device frame](device-frame.md)). Daftarkan beberapa id sheet dipisah spasi. |

## Markup

**Catat kehadiran.** Buka, lalu seret grabber atau judulnya ke bawah dan lepaskan: sentilan cepat menutup meski seretannya pendek; yang pelan memantul kembali.
```html
<div class="viewport" data-lds-push="attendance">
<div class="viewport__content">…screen content…</div>
<div class="scrim" data-lds-scrim="attendance"></div>
<div class="sheet" id="attendance" role="dialog" aria-modal="true" aria-labelledby="attendance-t" data-lds-layer>
  <div class="sheet__grabber" aria-hidden="true"></div>
  <div class="sheet__head" data-lds-drag>
    <h2 class="sheet__title" id="attendance-t">Catat kehadiran</h2>
    <button class="icon-btn icon-btn--filled" aria-label="Tutup" data-lds-close><span class="ic" aria-hidden="true">close</span></button>
  </div>
  …
  <button class="btn btn--primary btn--block" data-lds-close>Simpan kehadiran</button>
</div>
</div>
```

**Opsi berbagi.** Tanpa efek dorong: halaman tetap di tempat, hanya scrim yang meredupkannya.
```html
<div class="viewport docs-box">
  <div class="viewport__content">
    <button class="btn btn--secondary btn--md" data-lds-open="sh-share" aria-haspopup="dialog"><span class="ic" aria-hidden="true">ios_share</span>Bagikan bukti</button>
  </div>
  <div class="scrim" data-lds-scrim="sh-share"></div>
  <div class="sheet" id="sh-share" role="dialog" aria-modal="true" aria-labelledby="sh-share-t" data-lds-layer>
    <div class="sheet__grabber" aria-hidden="true"></div>
    <div class="sheet__head"><h3 class="sheet__title" id="sh-share-t">Bagikan bukti pendaftaran</h3></div>
    <div class="list list--fill">
      <button class="lrow" data-lds-close><span class="ic" aria-hidden="true">link</span><span class="lrow__body"><span class="lrow__title">Salin tautan</span></span></button>
      <button class="lrow" data-lds-close><span class="ic" aria-hidden="true">download</span><span class="lrow__body"><span class="lrow__title">Simpan sebagai gambar</span></span></button>
      <button class="lrow" data-lds-close><span class="ic" aria-hidden="true">mail</span><span class="lrow__body"><span class="lrow__title">Kirim lewat email</span></span></button>
    </div>
  </div>
</div>
```

## Status
| Status | Caranya |
|---|---|
| `.is-open` | Menempel; halaman di belakang terdorong mundur jika ada kontainer dengan `data-lds-push`. |
| `.is-dragging` | Mengikuti pointer 1:1 tanpa transisi; scrim memudar sesuai jarak. |
| `.is-thrown` | Memantul kembali setelah dilepas tanpa tertutup. |

## Gerak dan mikrointeraksi
- Masuk: naik dari `translateY(105%)` dengan `--spring-smooth` selama `--d-smooth` (560 ms). Keluar: turun dalam 260 ms dengan `--ease-exit`, kembali lewat jalur datangnya.
- Dorong: konten di belakang mengecil ke 0,94, turun 8 px, dan meredup ke kecerahan 96 % dengan `--spring-smooth`.
- Seret: mengikuti jari 1:1, rubber-band ke atas (`over·120·0.55 / (120 + 0.55·|over|)`). Saat dilepas, titik akhirnya diproyeksikan dengan kecepatan (`v/1000 · 0.99 / (1 − 0.99)`); melewati separuh tingginya akan menutup, jika tidak memantul kembali dengan `--spring-momentum` selama 600 ms.
- Reduced motion: geseran turun ke 120 ms linear dan tidak ada spring lemparan.

## Aksesibilitas
- `role="dialog"`, `aria-modal="true"`, `aria-labelledby` ke judul. Fokus pindah ke dalam saat dibuka dan dikunci; Escape menutup; fokus kembali ke pemicu.
- Menyeret tidak pernah satu-satunya jalan keluar: pertahankan tombol tutup atau aksi akhir yang jelas, dan scrim.
- Grabber bersifat dekoratif (`aria-hidden`).

## Lakukan
- Satu tugas per sheet dengan tombol utama selebar penuh di bawah.
- Jadikan baris judul sebagai pegangan seret (`data-lds-drag`) agar seluruh tepi atas bisa menggerakkannya.
- Pakai [drawer](drawer.md) untuk konten yang sama di layar lebar.

## Hindari
- Menumpuk sheet di atas sheet.
- Mengisinya setinggi penuh; itu sudah halaman.
- Menaruh pegangan seret di konten yang bergulir.

## Perilaku (HTML biasa)
`data-lds-open`, `data-lds-close`, `data-lds-scrim`, `data-lds-layer` seperti setiap lapisan (`openLayer` / `closeLayer`, `lds:open` / `lds:close`). Pada `.sheet[data-lds-layer]` skrip menambahkan seretan dari `.sheet__grabber` dan `[data-lds-drag]` dengan rubber-band dan momentum. `data-lds-push="id"` pada kontainer mana pun menambahkan `.is-pushed` selama lapisan itu terbuka.

## Terkait
[Drawer](drawer.md) · [Modal](modal.md) · [Drag and momentum](drag-and-momentum.md) · [Dialog](dialog.md)
