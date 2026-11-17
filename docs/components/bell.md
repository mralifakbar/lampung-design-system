# Bell

Kelompok: Mikrointeraksi. https://lampung.kartadinata.app/docs/components/bell

Ikon lonceng berbunyi sekali, ayunan pendek dari bagian atasnya yang berhenti dalam 640 ms, saat notifikasi dinyalakan atau notifikasi baru masuk. Sekali saja, tidak pernah berulang: lonceng memberi tanda, bukan merecoki.

## Pakai saat
- Switch menyalakan notifikasi atau pengingat: lonceng di label switch berbunyi saat thumb mendarat.
- Notifikasi masuk saat orang sedang melihat layar: lonceng di bilah atas berbunyi sekali dan jumlahnya muncul.

## Pakai yang lain saat
- Notifikasi yang harus dibaca sekarang: pakai [Banner](banner.md).
- Pesan yang mengonfirmasi sebuah aksi: pakai [Toast](toast.md).
- Jumlah belum dibaca saja: pakai [Count](count.md).
- Aksi yang ditolak: pakai [Shake](shake.md).
- Fitur baru di produk yang perlu dijelaskan: pakai [Coachmark](coachmark.md).

## Letaknya
Hanya pada ikon notifikasi: di dalam label `.switch`, atau di [tombol ikon](icon-button.md) pada bilah atas atau app shell.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.bell` | Wajib. Dipasang pada ikon `notifications` (`<span class="bell ic">`). Berayun dari titik 50 % 10 % (puncak lonceng). |
| `.is-ringing` | Memainkan bunyi lonceng sekali. Hapus lalu pasang lagi untuk membunyikannya kembali. |

## Markup

**Menyalakan notifikasi.** Nyalakan switch: thumb mendarat dan meregang, lalu lonceng berbunyi sekali. Mematikannya tidak memicu bunyi.
```html
<label class="switch"><input type="checkbox" role="switch"><span class="switch__track" aria-hidden="true"><span class="switch__thumb"></span></span><span class="bell ic" aria-hidden="true">notifications</span>Beri tahu saya saat laporan saya ditanggapi</label>
```

**Notifikasi baru masuk.** Coba simulasikan: lonceng berbunyi sekali dan jumlahnya bertambah. Notifikasi berikutnya membunyikan lonceng lagi dari awal.
```html
<button class="icon-btn" aria-label="Notifikasi, 2 belum dibaca">
  <span class="bell ic" aria-hidden="true">notifications</span>
  <span class="count">2</span>
</button>
// on arrival: bell.classList.remove('is-ringing'); void bell.offsetWidth; bell.classList.add('is-ringing');
```

## Gerak dan mikrointeraksi
- `lds-ring` selama 640 ms dengan `--ease-standard`: berputar 15, −12, 8, −4, 2, 0 derajat dengan poros di puncak lonceng. Ayunannya mengecil sampai diam seperti lonceng sungguhan.
- Main sekali per kejadian. Di dalam switch, lonceng hanya berbunyi saat dinyalakan, setelah thumb mulai bergerak (switch juga memainkan regangan mendarat 340 ms).
- Interupsi: kejadian baru memulai ulang bunyi dari 0 (hapus kelasnya, paksa reflow, pasang lagi).
- Reduced motion: tanpa ayunan; status switch dan perubahan jumlah sudah membawa maknanya.

## Aksesibilitas
- Lonceng diberi `aria-hidden`; label switch atau label tombol menyebut fungsinya ("Notifikasi, 2 belum dibaca").
- Perbarui label tombol saat jumlahnya berubah; jangan mengandalkan ayunan lonceng untuk mengumumkan apa pun.

## Lakukan
- Bunyikan sekali per kejadian.
- Pakai hanya pada ikon notifikasi.
- Pasangkan dengan jumlah atau status switch.

## Hindari
- Mengulang bunyi lonceng atau membunyikannya saat halaman dimuat.
- Membunyikan lonceng untuk setiap notifikasi dalam satu rentetan; cukup sekali untuk satu kelompok.
- Memakai ayunan ini pada ikon lain.

## Perilaku (HTML biasa)
Di dalam `.switch`, `init()` membunyikan setiap `.bell` di label saat switch dinyalakan. Di tempat lain, pasang dan lepas `.is-ringing` sendiri.

## React
```tsx
import { Switch } from 'lampung-design-system/react';

<Switch checked={notify} onChange={setNotify}>Notify me when my report gets a response</Switch>
// Switch does not ring a bell itself: render <span className={`bell ic${ring ? ' is-ringing' : ''}`}>notifications</span> beside it and set ring when it turns on.
```

## Terkait
[Switch](switch.md) · [Count](count.md) · [Icon button](icon-button.md) · [Haptics](haptics.md)
