# Dialog

Kelompok: Lapisan. https://lampung.kartadinata.app/docs/components/dialog

Lapisan kecil di tengah yang menyela untuk meminta satu isian singkat atau satu keputusan, lalu menyingkir. Pakai seperlunya: sebagian besar tugas tempatnya di halaman, sheet, atau drawer.

## Pakai saat
- Satu isian singkat yang harus dilakukan sebelum lanjut: ganti nama layanan, atur tanggal tenggat, beri nama folder baru.
- Keputusan singkat dengan dua hasil yang jelas dan tidak destruktif.
- Di dalam area terbatas yang sudah diposisikan (`.viewport`), seperti kanvas, pratinjau, atau bingkai ponsel.

## Pakai yang lain saat
- Mengonfirmasi sesuatu yang destruktif atau tidak bisa dibatalkan (hapus, keluarkan, buang): pakai [Alert dialog](alert-dialog.md).
- Formulir atau laporan tingkat halaman di atas seluruh jendela, atau dialog yang harus berada di atas segalanya: pakai [Modal](modal.md). `<dialog>` native di top layer; menjadi bottom sheet di ponsel.
- Tugas di ponsel yang tetap memperlihatkan halaman (memilih, memfilter, mencatat kehadiran): pakai [Sheet](sheet.md).
- Filter atau detail di samping daftar pada layar lebar: pakai [Drawer](drawer.md).
- Memberi tahu bahwa sesuatu telah terjadi: pakai [Toast](toast.md).
- Beberapa field atau opsi tambahan yang tertambat pada tombol: pakai [Popover](popover.md).

## Letaknya
Di tengah kontainer yang diposisikan (`.viewport`, atau pembungkus `position: fixed; inset: 0` untuk halaman), lebar 340 px, di atas scrim. Di ponsel lebih baik pakai [sheet](sheet.md); untuk seluruh halaman lebih baik pakai [modal](modal.md).

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.scrim[data-lds-scrim="id"]` | Wajib. Lapisan redup di belakang; klik di atasnya menutup dialog. |
| `.dialog[role=dialog][aria-modal=true]` | Wajib. Lapisannya, dengan `id`, `data-lds-layer`, dan `aria-labelledby` ke judulnya. |
| `.dialog__close` | [Icon button](icon-button.md) tutup opsional di kanan atas, dengan `data-lds-close`. |
| `.dialog__title` | Wajib. Pertanyaan atau tugasnya, sebagai `<h2>` atau `<h3>`. |
| `.dialog__body` | Satu atau dua kalimat konteks. |
| `.dialog__actions` | Wajib. Dua tombol berbagi lebar: sekunder (batal) lalu utama. |
| `[data-lds-open="id"]` | Wajib. Pemicunya, dengan `aria-haspopup="dialog"`. |

## Markup

**Ganti nama layanan.** Buka: fokus mendarat di field, Tab tetap di dalam, Escape atau scrim menutupnya dan fokus kembali ke tombol.
```html
<button class="btn btn--secondary" data-lds-open="rename" aria-haspopup="dialog">Ganti nama layanan</button>

<div class="scrim" data-lds-scrim="rename"></div>
<div class="dialog" id="rename" role="dialog" aria-modal="true" aria-labelledby="rename-t" data-lds-layer>
  <button class="icon-btn dialog__close" aria-label="Tutup" data-lds-close><span class="ic" aria-hidden="true">close</span></button>
  <h2 class="dialog__title" id="rename-t">Ganti nama layanan</h2>
  <p class="dialog__body">Warga melihat nama baru saat membuka aplikasi berikutnya.</p>
  <div class="control" style="margin-top: 16px;"><input aria-label="Nama layanan" value="Izin usaha mikro" data-lds-autofocus></div>
  <div class="dialog__actions">
    <button class="btn btn--secondary" data-lds-close>Batal</button>
    <button class="btn btn--primary" data-lds-close>Simpan nama</button>
  </div>
</div>
```

**Pilihan singkat.** Tanpa field, dua hasil. Elemen pertama yang bisa difokus (tombol tutup, jika ada) mendapat fokus bila tidak ada yang ditandai `data-lds-autofocus`.
```html
<div class="viewport docs-box">
  <div class="viewport__content">
    <button class="btn btn--secondary btn--md" data-lds-open="dlg-publish" aria-haspopup="dialog">Umumkan hasil</button>
  </div>
  <div class="scrim" data-lds-scrim="dlg-publish"></div>
  <div class="dialog" id="dlg-publish" role="dialog" aria-modal="true" aria-labelledby="dlg-publish-t" aria-describedby="dlg-publish-b" data-lds-layer>
    <h3 class="dialog__title" id="dlg-publish-t">Umumkan hasil seleksi sekarang?</h3>
    <p class="dialog__body" id="dlg-publish-b">32 pendaftar menerima notifikasi berisi hasil mereka. Anda masih bisa mengubah hasil setelahnya.</p>
    <div class="dialog__actions"><button class="btn btn--secondary btn--md" data-lds-close>Nanti saja</button><button class="btn btn--primary btn--md" data-lds-close data-lds-autofocus>Umumkan</button></div>
  </div>
</div>
```

## Status
| Status | Caranya |
|---|---|
| `.is-open` | Terlihat dan bisa dipakai; scrim dengan id yang sama juga mendapat `.is-open`. Diatur oleh `openLayer`. |
| `closed` | `aria-hidden="true"` dan `inert`, tak terlihat setelah animasi keluar selesai. |

## Gerak dan mikrointeraksi
- Masuk: opacity selama `--d-fast` (160 ms) dengan `--ease-enter`; transform dari `translateY(4px) scale(0.98)` ke none dengan `--spring-smooth` (560 ms). Tambahkan `.is-entering` lebih dulu untuk awal yang lebih dalam (`translateY(8px) scale(0.96)`).
- Keluar: lebih singkat dan tenang, opacity dan transform selama `--d-exit` (180 ms) dengan `--ease-exit`, lalu `visibility: hidden`. Keduanya transisi, sehingga menutup di tengah animasi masuk berbalik dari posisinya.
- Scrim: muncul selama `--d-standard` (240 ms), hilang selama `--d-exit`.
- Reduced motion: tanpa transform sama sekali, hanya opacity dalam 120 ms.

## Aksesibilitas
- `role="dialog"`, `aria-modal="true"`, `aria-labelledby` ke judul (dan `aria-describedby` ke isi jika isinya memuat inti pesan).
- Saat dibuka, fokus pindah ke `[data-lds-autofocus]` (atau `[autofocus]`), jika tidak ke elemen pertama yang bisa difokus. Tab dan Shift+Tab dikunci di dalam selama `aria-modal="true"`.
- Escape hanya menutup lapisan paling atas; scrim dan setiap `[data-lds-close]` juga menutupnya. Fokus kembali ke elemen yang membukanya.
- Pemicu membawa `aria-haspopup="dialog"`.

## Lakukan
- Tanyakan satu hal; jadikan judulnya pertanyaan atau tugasnya.
- Namai tombol utama sesuai hasilnya ("Simpan nama", "Umumkan").
- Fokuskan otomatis ke field, atau ke tombol utama untuk pilihan yang tidak destruktif.

## Hindari
- Membuka dialog dari dialog; selesaikan atau tutup yang pertama.
- Menaruh formulir panjang, tabel, atau konten bergulir di dalamnya; pakai [modal](modal.md), [sheet](sheet.md), atau halaman.
- Memakainya untuk konfirmasi hapus; itu tugas [alert dialog](alert-dialog.md).

## Perilaku (HTML biasa)
`[data-lds-open="id"]` memanggil `openLayer(id, trigger)`; `[data-lds-close]` di dalam dan `[data-lds-scrim="id"]` memanggil `closeLayer`. Escape menutup lapisan paling atas. Event `lds:open` dan `lds:close` dipicu pada lapisan. Secara program: `openLayer(id)`, `closeLayer(id or element)`.

## Terkait
[Alert dialog](alert-dialog.md) · [Modal](modal.md) · [Sheet](sheet.md) · [Drawer](drawer.md)
