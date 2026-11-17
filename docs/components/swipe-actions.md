# Swipe actions

Kelompok: Mikrointeraksi. https://lampung.kartadinata.app/docs/components/swipe-actions

Swipe baris daftar ke kiri untuk menampilkan aksinya; swipe jauh atau sentil cepat untuk menjalankan aksi terakhir, lalu baris meluncur keluar dan ruangnya menutup. Baris mengikuti jari dengan tepat, dan aksi yang sama terbuka dengan tombol panah kiri.

## Pakai saat
- Aksi yang sering dipakai pada baris daftar di ponsel: mengarsipkan atau menghapus pesan, menyematkan catatan, menghapus tugas.
- Daftar tempat orang memproses item satu per satu (kotak masuk, notifikasi, daftar tugas).

## Pakai yang lain saat
- Aksi perlu pertanyaan lebih dulu dan tidak bisa diurungkan: pakai [Alert dialog](alert-dialog.md).
- Aksi untuk beberapa item sekaligus: pakai [Selection bar](selection-bar.md).
- Baris dengan banyak aksi atau aksi yang jarang dipakai: pakai [Context menu](context-menu.md). Atau [dropdown menu](dropdown-menu.md) pada tombol lainnya.
- Layar lebar yang hanya memakai mouse: pakai [Confirm in place](confirm-in-place.md). Tampilkan aksinya langsung di baris; jadikan swipe sebagai jalan pintas.

## Letaknya
Pada baris `.list`, satu `.swipe` per baris. Dua atau tiga aksi, yang berisiko di urutan terakhir (paling kanan, tempat swipe panjang berakhir).

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.swipe` | Wajib. `data-lds-swipe`. Pembungkus baris; tingginya menyusut saat baris dihapus (`.is-gone`). |
| `.swipe__actions` | Wajib. Tombol-tombol di balik baris; inert sampai dibuka. |
| `.swipe__act` | Wajib. Masing-masing selebar 76 px: `--gray`, `--accent`, `--danger`. `data-swipe="name"`; `data-swipe-commit` pada yang terakhir membuat swipe panjang menjalankannya. |
| `.swipe__row` | Wajib. Baris yang terlihat (sebuah `.lrow`), `tabindex="0"`. |

## Markup

**Baris kotak masuk.** Tarik sebuah baris ke kiri. Lewat dari setengah lebar aksi, baris tetap terbuka; lewat 60 % lebar baris, atau dengan sentilan cepat, Hapus berjalan dan baris meluncur keluar. Hanya satu baris yang terbuka dalam satu waktu. Keyboard: fokus ke baris lalu tekan panah kiri.
```html
<div class="list">
  <div class="swipe" data-lds-swipe>
    <div class="swipe__actions">
      <button class="swipe__act swipe__act--gray" data-swipe="pin"><span class="ic" aria-hidden="true">keep</span>Sematkan</button>
      <button class="swipe__act swipe__act--danger" data-swipe="delete" data-swipe-commit><span class="ic" aria-hidden="true">delete</span>Hapus</button>
    </div>
    <div class="swipe__row lrow" tabindex="0">…</div>
  </div>
</div>
<script type="module">
  import { toast } from 'lampung-design-system/js';
  document.addEventListener('lds:swipe', (e) => {
    if (e.detail.action !== 'delete') return;
    toast({ title: 'Pesan dihapus', action: 'Urungkan', onAction: () => { e.detail.restore(); return { title: 'Dipulihkan' }; } });
  });
</script>
```

**Satu aksi.** Daftar tugas yang hanya punya Hapus. Swipe pendek menampilkannya; swipe panjang menghapus.
```html
<div class="list" style="width: 100%; max-width: 420px;">
  <div class="swipe" data-lds-swipe><div class="swipe__actions"><button class="swipe__act swipe__act--danger" data-swipe="delete" data-swipe-commit><span class="ic" aria-hidden="true">delete</span>Hapus</button></div><div class="swipe__row lrow" tabindex="0"><span class="lrow__body"><span class="lrow__title">Fotokopi kartu keluarga</span><span class="lrow__sub">Syarat izin usaha</span></span><span class="lrow__value">Hari ini</span></div></div>
  <div class="swipe" data-lds-swipe><div class="swipe__actions"><button class="swipe__act swipe__act--danger" data-swipe="delete" data-swipe-commit><span class="ic" aria-hidden="true">delete</span>Hapus</button></div><div class="swipe__row lrow" tabindex="0"><span class="lrow__body"><span class="lrow__title">Bayar pajak kendaraan</span><span class="lrow__sub">Rp 450.000</span></span><span class="lrow__value">Besok</span></div></div>
</div>
```

## Status
| Status | Caranya |
|---|---|
| `closed` | Baris diam; aksi inert. |
| `dragging` | Baris mengikuti jari 1:1; aksi melebar bersamanya; menarik ke kanan memberi efek rubber-band. |
| `open` | Baris berhenti di minus lebar aksi; aksi masuk urutan tab. |
| `full` | `.is-full` saat ditarik 40 px melewati aksi: aksi terakhir meregang mengisi ruang, menandakan melepas jari akan menjalankannya. |
| `gone` | `.is-gone`: baris meluncur keluar dan tingginya menutup. `restore()` mengembalikannya. |

## Gerak dan mikrointeraksi
- Memutuskan: gerakan 8 px menentukan swipe (dominan horizontal) atau scroll (dominan vertikal); scroll tidak pernah menggeser baris.
- Mengikuti: transisi mati, baris bergerak 1:1; melewati tepi kanan, baris memberi efek rubber-band (`over × 40 × 0.55 / (40 + 0.55 × |over|)`).
- Melepas: posisi akhir yang diproyeksikan = posisi + kecepatan × 0,1 detik. Terbuka bila lewat setengah lebar aksi, jika tidak menutup; keduanya dengan `--spring-smooth` (560 ms).
- Menjalankan: lewat 60 % lebar baris, atau sentilan lebih cepat dari 900 px/detik melewati aksi, baris meluncur keluar sepenuhnya dengan `--ease-inout` dalam `--d-standard` (240 ms), lalu `.swipe` menutup tingginya dengan `--spring-smooth`. Haptic medium menandai aksi yang dijalankan.
- Interupsi: menyentuh baris lain menutup baris yang terbuka; mengetuk baris yang terbuka menutupnya.
- Reduced motion: tarikan tetap mengikuti jari; gerak kembali dan penutupan tinggi berlangsung 120 ms.

## Aksesibilitas
- Baris bisa difokus (`tabindex="0"`). Panah kiri membuka aksi, Tab berpindah di antaranya, panah kanan atau Escape menutup baris.
- Setiap aksi adalah tombol sungguhan dengan label; aksi berisiko tetap perlu menawarkan Urungkan ([toast](toast.md) dengan aksi).
- Ajarkan gesturnya dengan [petunjuk](hints.md) pada kunjungan pertama, dan sediakan aksi yang sama di tempat yang terlihat (menu baris) untuk orang yang tidak memakai swipe.

## Lakukan
- Taruh aksi berisiko di urutan terakhir, dengan `data-swipe-commit`.
- Tawarkan Urungkan setelah menghapus lewat `restore()`.
- Cukup dua atau tiga aksi.

## Hindari
- Menjadikan swipe satu-satunya jalan ke sebuah aksi.
- Menaruh baris swipe di dalam scroller horizontal atau carousel.
- Menjalankan aksi berisiko tanpa jalan kembali.

## Perilaku (HTML biasa)
`[data-lds-swipe]` saat `init()`. `lds:swipe` (bubbles) membawa `{ action, restore }`, dengan `action` berisi `data-swipe` milik tombolnya. Mengetuk aksi biasa memancarkan event itu dan menutup baris; aksi commit (dan swipe panjang atau sentilan) menghapus baris lebih dulu.

## Terkait
[List](list.md) · [Drag and momentum](drag-and-momentum.md) · [Hints](hints.md) · [Toast](toast.md)
