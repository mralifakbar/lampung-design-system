# Floating action

Kelompok: Aksi. https://lampung.kartadinata.app/docs/components/floating-action

Satu tombol bulat beraksen yang melayang di atas konten layar ponsel, untuk aksi yang menjadi alasan orang membuka layar itu (pesan baru, tambah pengeluaran). Hanya kontrol inilah yang memakai bayangan saat diam.

## Pakai saat
- Layar ponsel yang tujuan utamanya membuat sesuatu di daftar yang ditampilkannya: menulis pesan, mencatat pengeluaran, menambah catatan.
- Daftar cukup panjang sehingga tombol di atas atau bawahnya sering di luar jangkauan.

## Pakai yang lain saat
- Layar lebar dan tata letak desktop: pakai [Button](button.md). Taruh `btn--primary` di header halaman; cakram melayang di sudut jendela 1400 px mudah terlewat.
- Layar punya aksi utama di akhir formulir atau alur: pakai [Button](button.md). Pakai `btn--primary btn--block` selebar layar di bilah lengket.
- Dua aksi atau lebih yang sama penting: pakai [Button group](button-group.md).
- Aksi yang berlaku untuk item terpilih: pakai [Selection bar](selection-bar.md).
- Aksi ikon kecil di toolbar atau kartu: pakai [Icon button](icon-button.md).

## Letaknya
Kanan bawah layar ponsel, 16 sampai 20 px dari tepi, di atas tab bar (`bottom` = tinggi tab bar + 16) dan di atas indikator home (`env(safe-area-inset-bottom)`). Satu per layar. Tombol tidak boleh menutupi baris terakhir: beri daftar yang menggulir padding bawah minimal setinggi tombol ditambah 32.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.icon-btn.icon-btn--accent` | Wajib. Isian aksen, glyph putih, tampilan primary. |
| `aria-label` | Wajib. Nama aksinya ("Pesan baru"). |
| `style` | Ukuran dan posisi belum ada di sistem: setel `width: 56px; height: 56px` dan `position: absolute` (atau `fixed`) dengan `right` dan `bottom`, ditambah `box-shadow: var(--finish-primary), var(--shadow-md)`. |

## Markup

**Di daftar ponsel.** Melayang di atas daftar yang menggulir, di atas tab bar. Tekan untuk merasakan efek tekannya.
```html
<button class="icon-btn icon-btn--accent" aria-label="Pesan baru"
  style="position: fixed; right: 20px; bottom: calc(83px + 16px); width: 56px; height: 56px; box-shadow: var(--finish-primary), var(--shadow-md);">
  <span class="ic" aria-hidden="true">edit</span>
</button>
```

## Status
| Status | Caranya |
|---|---|
| `hover` | `--accent-hover` di perangkat yang bisa hover. |
| `:active` | Mengecil ke `scale(0.9)` dalam 90 ms, kembali dengan `--spring-snappy`. |
| `hidden while scrolling` | Opsional: sembunyikan saat menggulir ke bawah, tampilkan saat menggulir ke atas. Tidak tersedia bawaan; jika Anda menambahkannya, geser 24 px ke bawah dengan opacity memudar memakai `--ease-exit` selama `--d-exit`, dan kembali dengan `--spring-smooth`. |

## Gerak dan mikrointeraksi
- Tekan: `scale(0.9)` dengan transisi 90 ms, lepas dengan `--spring-snappy` selama `--d-snappy`, sama seperti semua icon button.
- Yang dibukanya harus tumbuh dari tombol ini: [sheet](sheet.md) yang naik dari bawah dengan `--spring-smooth`, jangan dialog yang muncul tiba-tiba di tengah.
- Tombol tidak berdenyut, memantul, atau berputar saat diam. Dengan reduced motion hanya efek tekan yang tersisa (sebagai perubahan 120 ms).

## Aksesibilitas
- `<button>` sungguhan dengan `aria-label`; glyph-nya `aria-hidden`.
- Letakkan di DOM setelah konten utama (atau di akhir area layar) agar Tab mencapainya setelah daftar, sesuai posisinya.
- Tombol tidak boleh menyembunyikan konten: sisakan padding bawah di daftar agar baris terakhir bisa digulir ke atasnya.
- Putih di atas `--accent` mencapai 5.2:1 di kedua tema.

## Lakukan
- Pakai satu per layar, untuk aksi membuat yang paling sering.
- Jaga agar tidak menutupi tab bar dan indikator home.
- Buka sheet darinya di ponsel.

## Hindari
- Memakainya di tata letak desktop atau di dalam kartu.
- Menambahkan speed-dial berisi beberapa tombol melayang.
- Memberi kontrol diam lain bayangan agar tampak serupa.

## Terkait
[Icon button](icon-button.md) · [Button](button.md) · [Sheet](sheet.md) · [Phone bars](phone-bars.md)
