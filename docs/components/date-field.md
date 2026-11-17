# Date field

Kelompok: Input. https://lampung.kartadinata.app/docs/components/date-field

Text field untuk tanggal dengan tombol kalender yang membuka kalender di popover. Mengetik tanggal selalu bisa; kalender hanya membantu. Dibangun dari bagian yang sudah ada: `.control`, `.control__btn`, `.popover`, dan `.cal`.

## Pakai saat
- Orang memasukkan satu tanggal di formulir: tanggal lahir, tanggal kunjungan layanan, batas waktu, tanggal pembayaran.
- Tanggalnya dekat dengan hari ini dan melihat bulannya membantu (menjadwalkan kunjungan, memilih tanggal jatuh tempo).

## Pakai yang lain saat
- Menampilkan kegiatan sebulan, atau memilih rentang langsung di halaman: pakai [Calendar](calendar.md). Komponen `.cal` sebaris, bukan di popover.
- Tanggal jauh di masa lalu yang dihafal orang (tanggal lahir): pakai [Text field](text-field.md). Mengetik HH/BB/TTTT lebih cepat daripada mundur 20 tahun; biarkan tombol kalender opsional.
- Memilih periode relatif (minggu ini, bulan ini): pakai [Segmented control](segmented-control.md). Atau [chips](chips.md) untuk pilihan siap seperti "7 hari terakhir".
- Hanya jam: pakai [Select](select.md). Daftar slot setiap setengah jam.

## Letaknya
Di [formulir](form-layout.md) seperti kolom lainnya, sekitar 220 px di layar lebar (tanggal tidak pernah butuh lebar penuh). Popover terbuka di bawah kolom, rata dengan tepi kanannya. Di ponsel lebih baik pakai pemilih bawaan (`type="date"` di dalam `.control`) atau buka kalender di [sheet](sheet.md).

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.field / .field__label / .field__help` | Wajib. Pembungkus yang sama dengan [text field](text-field.md). Teks bantuan menunjukkan formatnya ("HH/BB/TTTT"). |
| `positioned wrapper` | Wajib. Elemen dengan `position: relative` di sekitar kontrol dan popover, agar popover terbuka di bawah kolom. |
| `.control > input` | Wajib. Input teks, `inputmode="numeric"`, `placeholder="HH/BB/TTTT"`, `autocomplete="bday"` untuk tanggal lahir. |
| `.control__btn` | Wajib. Tombol kalender (`calendar_month`), `aria-label="Pilih tanggal"`, `aria-haspopup="dialog"`, dan `data-lds-menu` yang menunjuk ke popover. |
| `.popover[role=dialog]` | Wajib. Lapisan melayang, disetel `width: auto; padding: 0` dan ditaruh di bawah kolom. |
| `.cal` | Wajib. Header bulan dengan [icon button](icon-button.md) sebelumnya dan berikutnya, baris nama hari, dan tombol `.cal__day` (`.is-today`, `.is-selected`, `.is-muted`). |

## Markup

**Tanggal kunjungan.** Ketik tanggal, atau buka kalender dengan tombolnya. Memilih hari mengisi kolom, menutup kalender, dan mengembalikan fokus ke input. Escape atau klik di luar menutupnya.
```html
<div class="field">
  <label class="field__label" for="exam-date">Tanggal kunjungan</label>
  <div style="position: relative;">
    <div class="control">
      <input id="exam-date" inputmode="numeric" placeholder="HH/BB/TTTT" aria-describedby="exam-date-help">
      <button type="button" class="control__btn" aria-label="Pilih tanggal" aria-haspopup="dialog" aria-expanded="false" data-lds-menu="exam-cal">
        <span class="ic" aria-hidden="true">calendar_month</span>
      </button>
    </div>
    <div class="popover" id="exam-cal" role="dialog" aria-label="Pilih tanggal" style="width: auto; padding: 0; top: calc(100% + 6px); right: 0;">
      <div class="cal">
        <div class="cal__head">
          <button type="button" class="icon-btn" aria-label="Bulan sebelumnya"><span class="ic" aria-hidden="true">chevron_left</span></button>
          <span class="cal__month" aria-live="polite">November 2026</span>
          <button type="button" class="icon-btn" aria-label="Bulan berikutnya"><span class="ic" aria-hidden="true">chevron_right</span></button>
        </div>
        <div class="cal__grid">
          <span class="cal__dow" aria-hidden="true">M</span> … <span class="cal__dow" aria-hidden="true">S</span>
          <button type="button" class="cal__day" aria-label="1 November 2026" aria-pressed="false">1</button>
          …
          <button type="button" class="cal__day is-today" aria-label="16 November 2026" aria-current="date" aria-pressed="false">16</button>
          <button type="button" class="cal__day is-selected" aria-label="24 November 2026" aria-pressed="true">24</button>
          …
        </div>
      </div>
    </div>
  </div>
  <span class="field__help" id="exam-date-help">HH/BB/TTTT. Layanan buka Senin sampai Sabtu.</span>
</div>
<!-- Your code: render the month, page it with the arrows, and on a day click
     write the date into the input, move .is-selected, then closeMenus() and focus the input. -->
```

**Tanggal ketikan yang tidak diizinkan.** Validasi teks ketikan saat blur seperti kolom lainnya; pesannya menyebut aturannya.
```html
<div class="field" style="max-width: 300px; width: 100%;">
  <label class="field__label" for="df-due">Tanggal jatuh tempo</label>
  <div class="control is-invalid"><input id="df-due" inputmode="numeric" value="31/11/2026" aria-invalid="true" aria-describedby="df-due-help"><button type="button" class="control__btn" aria-label="Pilih tanggal" aria-haspopup="dialog"><span class="ic" aria-hidden="true">calendar_month</span></button></div>
  <span class="field__help field__help--error" id="df-due-help"><span class="ic" aria-hidden="true">error</span>November hanya 30 hari. Periksa tanggalnya.</span>
</div>
```

**Pemilih bawaan di ponsel.** Di dalam `.control`, input tanggal bawaan mendapat tampilan kolom sistem dan ponsel menampilkan roda atau kalendernya sendiri.
```html
<div class="field" style="max-width: 300px; width: 100%;">
  <label class="field__label" for="df-native">Tanggal pembayaran</label>
  <div class="control"><span class="ic" aria-hidden="true">event</span><input id="df-native" type="date" value="2026-11-28"></div>
</div>
```

## Status
| Status | Caranya |
|---|---|
| `open` | `aria-expanded="true"` pada tombol kalender dan `.is-open` pada popover, disetel oleh `data-lds-menu`. |
| `.cal__day.is-today` | Teks aksen, semibold; tambahkan `aria-current="date"`. |
| `.cal__day.is-selected` | Isian aksen dengan teks putih; `aria-pressed="true"`. |
| `.cal__day.is-muted` | Hari dari bulan berikutnya atau sebelumnya, samar. Nonaktifkan hari yang tidak bisa dipilih (`disabled`). |
| `.is-invalid` | Pada `.control` dengan `aria-invalid`, seperti kolom lainnya. |

## Gerak dan mikrointeraksi
- Popover tumbuh dari area tombol: opacity dalam `--d-fast` (160 ms) dengan `--ease-enter`, `scale(0.96) translateY(-4px)` ke posisi diam dengan `--spring-smooth` (560 ms); keluar dalam `--d-exit` (180 ms) dengan `--ease-exit`.
- Hari berwarna saat hover dalam `--d-fast` dan mengecil ke 0.88 saat ditekan, memantul kembali dengan `--spring-snappy`.
- Ganti bulan langsung menukar grid; jangan menggeser bulan, itu memperlambat penelusuran setahun.
- Reduced motion: popover memudar masuk 120 ms linear tanpa skala.

## Aksesibilitas
- Input teks adalah kolom sesungguhnya dan berfungsi tanpa kalender: label, format di teks bantuan, validasi saat blur.
- Tombol kalender adalah `<button type="button">` dengan `aria-label="Pilih tanggal"`, `aria-haspopup="dialog"`, dan `aria-expanded`.
- Setiap hari adalah tombol yang dinamai dengan tanggal lengkap ("24 November 2026"); huruf nama hari `aria-hidden`. Nama bulan `aria-live="polite"` agar pergantian bulan diumumkan.
- `data-lds-menu` memfokuskan tombol pertama di popover saat dibuka dan menutupnya dengan Escape atau klik di luar. Tombol panah antarhari tidak tersedia bawaan: tambahkan (Kiri, Kanan satu hari; Atas, Bawah satu minggu) saat penggunaan keyboard penting.

## Lakukan
- Terima tanggal ketikan dalam format yang ditampilkan, dan tunjukkan format itu di teks bantuan.
- Buka kalender pada bulan dari nilai saat ini, atau hari ini.
- Nonaktifkan hari yang tidak diizinkan dan sebut aturannya di teks bantuan.

## Hindari
- Membuat input baca saja sehingga orang harus memakai kalender.
- Membangun komponen pemilih tanggal baru; susun dari bagian-bagian ini.
- Memakai kalender popover untuk tanggal lahir tanpa mengizinkan mengetik.

## Perilaku (HTML biasa)
Tidak ada perilaku date field di sistem. `data-lds-menu="popover-id"` pada tombol kalender membuka dan menutup popover (klik di luar, Escape) dan memfokuskan tombol pertamanya; `closeMenus()` menutupnya setelah memilih. Menggambar bulan, berganti bulan, dan menulis nilainya adalah tugas Anda.

## Terkait
[Calendar](calendar.md) · [Popover](popover.md) · [Text field](text-field.md) · [Sheet](sheet.md)
