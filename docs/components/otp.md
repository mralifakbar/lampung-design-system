# One-time code

Kelompok: Input. https://lampung.kartadinata.app/docs/components/otp

Enam sel untuk kode verifikasi, didukung satu input sungguhan, sehingga tempel, isi otomatis SMS, dan pengelola kata sandi semuanya berfungsi. Kode yang salah membuat sel bergetar sekali dan berubah merah.

## Pakai saat
- Memverifikasi nomor ponsel atau email dengan kode yang dikirim lewat SMS atau email.
- Masuk dua langkah, atau mengonfirmasi perubahan sensitif dengan kode.
- Bergabung ke sesuatu dengan kode angka pendek yang dibacakan (kode presensi kegiatan).

## Pakai yang lain saat
- Kata sandi atau PIN yang dipilih orang sendiri: pakai [Password field](password-field.md).
- Kode panjang dengan huruf (voucher, undangan kegiatan): pakai [Text field](text-field.md). Pakai kolom biasa dengan `autocapitalize="characters"`.
- Angka yang bermakna (jumlah, hitungan): pakai [Amount field](amount-field.md).

## Letaknya
Sendirian di langkahnya: layar verifikasi, [sheet](sheet.md) di ponsel, [dialog](dialog.md) di layar lebar. Taruh label di atas, teks bantuan (tujuan pengiriman kode, timer kirim ulang) di bawah. Di tengah pada ponsel.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.otp-wrap` | Wajib. Pembungkus berposisi dengan `data-lds-otp`. Memuat sel dan input sungguhan. |
| `.otp` | Wajib. Baris sel, `aria-hidden="true"` (input-lah yang dipakai teknologi bantu). |
| `.otp__cell` | Wajib. Satu per digit, 48 kali 56. JS mengisinya dan menandai `.is-filled` serta `.is-active`. |
| `.otp__sep` | Tanda pisah opsional antarkelompok (3 + 3). |
| `.otp__input` | Wajib. Satu `<input>` sungguhan yang direntangkan tak terlihat di atas sel: `inputmode="numeric"`, `autocomplete="one-time-code"`, `maxlength` sama dengan jumlah sel. |

## Markup

**Verifikasi nomor ponsel.** Ketik atau tempel kode enam digit. Caret berkedip di sel aktif; setiap digit muncul dengan efek pop. Kode apa pun selain 123456 ditolak di sini, untuk menunjukkan galatnya.
```html
<span class="field__label" id="code-label">Kode verifikasi</span>
<div class="otp-wrap" data-lds-otp>
  <div class="otp" aria-hidden="true">
    <span class="otp__cell"></span><span class="otp__cell"></span><span class="otp__cell"></span>
    <span class="otp__sep"></span>
    <span class="otp__cell"></span><span class="otp__cell"></span><span class="otp__cell"></span>
  </div>
  <input class="otp__input" inputmode="numeric" autocomplete="one-time-code" maxlength="6" aria-labelledby="code-label" aria-describedby="code-help">
</div>
<span class="field__help" id="code-help" aria-live="polite">Dikirim lewat SMS ke 0812 •••• 7890.</span>

<script type="module">
  import { otpError } from 'lampung-design-system/js';
  wrap.addEventListener('lds:complete', async (e) => {
    if (!(await verify(e.detail.value))) otpError(wrap);
  });
</script>
```

## Status
| Status | Caranya |
|---|---|
| `.is-active (cell)` | Sel berikutnya yang diisi; selama input difokus ia mendapat tepi aksen, halo, dan caret berkedip. |
| `.is-filled (cell)` | Berisi digit; digitnya muncul dengan efek pop. |
| `.is-error (on .otp)` | Semua sel mendapat tepi danger. Disetel oleh `otpError(wrap)`; hilang pada input berikutnya. |
| `.is-shake (on .otp)` | Satu getaran 360 ms, ditambahkan oleh `otpError` bersama `.is-error`. |
| `checking` | Selama kode diverifikasi, taruh [spinner](spinner.md) di samping sel dan biarkan input tetap aktif. |

## Gerak dan mikrointeraksi
- Setiap digit baru muncul dengan `lds-pop-in` (skala 0.6 ke 1 dengan fade) memakai `--spring-snappy` (360 ms).
- Caret di sel aktif berkedip dengan `lds-caret`, langkah 1 detik; focus ring di sel aktif bertransisi dalam `--d-fast`.
- Kode yang ditolak membuat baris bergetar sekali dengan `lds-shake`: 360 ms, dua osilasi pendek 6 px lalu 3 px, lalu diam. Lihat [shake](shake.md). Pasangkan dengan haptic galat di ponsel ([haptics](haptics.md)).
- Reduced motion: pop dan getaran menjadi perubahan 1 ms (tepi merah tetap menyampaikannya), caret berhenti berkedip setelah satu siklus.

## Aksesibilitas
- Satu input sungguhan membawa nilainya: diberi label (`aria-labelledby`) dan dijelaskan oleh teks bantuan; sel-selnya `aria-hidden`.
- `autocomplete="one-time-code"` membuat iOS dan Android menawarkan kode SMS di atas keyboard; `inputmode="numeric"` membuka papan angka.
- Tempel berfungsi di mana saja di kolom; karakter selain digit dibuang dan nilainya dibatasi sejumlah sel.
- Taruh hasilnya di teks bantuan `aria-live="polite"` ("Kode itu tidak cocok…"), bukan hanya lewat tepi merah.

## Lakukan
- Kirim otomatis saat digit terakhir masuk (`lds:complete`); tidak perlu tombol Verifikasi.
- Sebut ke mana kode dikirim dan tawarkan kirim ulang dengan hitung mundur ([timer](timer.md)).

## Hindari
- Membuat enam input terpisah; tempel dan isi otomatis jadi rusak.
- Menghapus kode saat galat tanpa membiarkan orang melihat apa yang mereka ketik.

## Perilaku (HTML biasa)
`data-lds-otp` pada `.otp-wrap`: mengisi sel dari input, hanya menyimpan digit, menandai `.is-active`/`.is-filled`, menghapus galat saat ada input, dan memicu `lds:complete` dengan `{ value }` saat semua sel terisi. `otpError(wrap)` menandai galat dan menggetarkan sel.

## Terkait
[Password field](password-field.md) · [Shake](shake.md) · [Timer](timer.md) · [Sheet](sheet.md)
