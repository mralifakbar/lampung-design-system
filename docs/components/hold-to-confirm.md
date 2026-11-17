# Hold to confirm

Kelompok: Aksi. https://lampung.kartadinata.app/docs/components/hold-to-confirm

Tombol yang ditekan dan ditahan selama 1,2 detik untuk mengonfirmasi sesuatu yang mahal tetapi tidak cukup berbahaya untuk dialog. Isian menyapu tombol selama ditahan dan surut jika dilepas lebih awal.

## Pakai saat
- Aksi mahal dan disengaja yang tidak boleh terjadi karena ketukan tak sengaja, tetapi tidak perlu pertanyaan terpisah: mengirim permohonan bantuan sosial, mengakhiri siaran langsung musyawarah warga, menghapus arsip draf lokal.
- Di dalam alur yang akan terganggu oleh dialog konfirmasi (layar terakhir formulir permohonan yang panjang).

## Pakai yang lain saat
- Menghapus data bersama atau yang tidak bisa dipulihkan (hapus layanan, keluarkan petugas): pakai [Alert dialog](alert-dialog.md). Sebut akibatnya dengan kata-kata dan tanyakan.
- Konfirmasi di ponsel yang lebih cocok dengan gerakan disengaja (kirim pembayaran, setujui penyaluran bantuan): pakai [Slide to confirm](slide-to-confirm.md).
- Aksi yang mudah dibatalkan: pakai [Button](button.md). Langsung jalankan dan tawarkan Urungkan di [toast](toast.md).
- "Anda yakin?" dua langkah di dalam kontrol yang sama: pakai [Confirm in place](confirm-in-place.md).

## Letaknya
Di tempat aksi utama alur berada: akhir formulir permohonan, footer sheet. Selebar layar di ponsel (`btn--block`). Tambahkan petunjuk satu baris di bawah atau di dalamnya ("Tahan untuk mengirim"), karena gerakan ini tidak langsung jelas.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.btn.hold[data-lds-hold]` | Wajib. Tombol dengan varian berisi apa pun (`btn--primary` atau `btn--danger`). `.hold` memotong isiannya. |
| `.hold__fill` | Wajib. Anak pertama, `aria-hidden`. Lapisan gelap yang membesar dari kiri selama ditahan. |
| `label text` | Anak terakhir. Sebut gerakannya di sini: "Tahan untuk mengirim permohonan". |

## Markup

**Mengirim permohonan.** Tekan dan tahan selama 1,2 detik, atau fokuskan lalu tahan Spasi atau Enter. Lepas lebih awal dan isiannya surut.
```html
<button class="btn btn--primary hold" data-lds-hold id="submit-application">
  <span class="hold__fill" aria-hidden="true"></span>
  <span class="ic" aria-hidden="true">touch_app</span>Tahan untuk mengirim permohonan
</button>
<script type="module">
  document.getElementById('submit-application').addEventListener('lds:confirm', submitApplication);
</script>
```

**Merusak, hanya lokal.** Nada danger untuk sesuatu yang menghapus data di perangkat ini dan bisa diunduh lagi.
```html
<button class="btn btn--danger hold" data-lds-hold>
  <span class="hold__fill" aria-hidden="true"></span>
  <span class="ic" aria-hidden="true">delete</span>Tahan untuk menghapus salinan offline
</button>
```

## Status
| Status | Caranya |
|---|---|
| `rest` | Tanpa isian. |
| `.is-holding` | Ditambahkan saat pointer turun (atau Spasi/Enter ditekan); isian menyapu dalam 1,2 detik. |
| `released early` | `.is-holding` dihapus; isian surut dalam 240 ms. Tidak ada yang terjadi. |
| `confirmed` | Setelah ditahan 1,2 detik, `lds:confirm` dipicu pada tombol dan `.is-holding` dihapus. Perbarui label atau nonaktifkan tombol sendiri. |
| `disabled` | `disabled` mencegah penahanan dimulai. |

## Gerak dan mikrointeraksi
- Isian: `transform: scaleX(0 to 1)` dari kiri selama 1200 ms, linear, agar progresnya jujur terhadap waktu. Melepas membuatnya surut dalam 240 ms dengan `--ease-exit`; karena berupa transisi, ia surut dari titik mana pun yang sudah dicapai.
- Tombol tetap mengecil ke 0.97 saat ditekan seperti semua tombol.
- Dengan reduced motion, sistem memendekkan semua transisi menjadi 120 ms, sehingga isian penuh jauh sebelum timer 1,2 detik. Penahanan tetap 1,2 detik; label harus menyebut "Tahan", karena isian tidak lagi menunjukkan waktu.

## Aksesibilitas
- `<button>` sungguhan. Keyboard: tahan Spasi atau Enter (pengulangan diabaikan), lepas untuk membatalkan.
- Label menyebut gerakannya ("Tahan untuk …"); jangan mengandalkan isian.
- Setelah `lds:confirm`, umumkan hasilnya (ubah label, pakai [toast](toast.md), atau pindahkan fokus ke layar berikutnya).
- Sediakan jalur tanpa menahan untuk orang yang kesulitan menahan (pengguna switch access): pengaturan atau dialog konfirmasi sebagai cadangan.

## Lakukan
- Awali label dengan "Tahan untuk".
- Pakai untuk satu aksi per layar.
- Konfirmasi hasilnya dengan kata-kata tepat sesudahnya.

## Hindari
- Memakainya untuk aksi sehari-hari seperti Simpan.
- Menggantikan dialog konfirmasi untuk penghapusan data bersama yang tidak bisa dibatalkan.
- Mengubah durasi 1,2 detik per layar; orang mempelajarinya sekali.

## Perilaku (HTML biasa)
`data-lds-hold` pada tombol. `init()` memulai timer 1,2 detik saat pointer turun atau Spasi/Enter ditekan, membatalkannya saat pointer naik, keluar, atau batal dan saat tombol keyboard dilepas, lalu memicu `lds:confirm` (bubbles) saat selesai.

## Terkait
[Slide to confirm](slide-to-confirm.md) · [Alert dialog](alert-dialog.md) · [Confirm in place](confirm-in-place.md) · [Button](button.md)
