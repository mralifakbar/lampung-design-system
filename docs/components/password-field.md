# Password field

Kelompok: Input. https://lampung.kartadinata.app/docs/components/password-field

Text field untuk rahasia, dengan tombol tampilkan yang menukar ikon matanya di tempat. Saat membuat kata sandi, pengukur kekuatan empat langkah dan teks bantuan menyebut apa yang akan membuatnya lebih kuat.

## Pakai saat
- Masuk (kata sandi saat ini) atau membuat dan mengganti kata sandi (kata sandi baru dengan kekuatan).
- Rahasia apa pun yang diketik orang dan mungkin ingin mereka periksa: PIN, kata sandi akun layanan.

## Pakai yang lain saat
- Kode sekali pakai yang dikirim lewat SMS atau email: pakai [One-time code](otp.md). Sel, keyboard angka, tempel, dan isi otomatis seluruh kode.
- Nilai biasa yang tidak rahasia: pakai [Text field](text-field.md).
- Mengonfirmasi aksi yang merusak: pakai [Alert dialog](alert-dialog.md). Jangan minta kata sandi lagi kecuali aksinya memang membutuhkannya.

## Letaknya
Di [formulir](form-layout.md) masuk atau akun, di bawah kolom email atau nama pengguna. Di ponsel buat selebar layar; tombol tampilkan tetap di dalam kontrol.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.field / .field__label / .field__help` | Wajib. Pembungkus yang sama dengan [text field](text-field.md). Teks bantuan memuat aturannya, lalu kata kekuatannya. |
| `.control` | Wajib. Memuat ikon `key` di depan (opsional), input, dan tombol tampilkan. |
| `input[type=password]` | Wajib. `autocomplete="current-password"` untuk masuk, `"new-password"` untuk membuat. |
| `.control__btn > .swap` | Tombol tampilkan. `.swap__a` adalah `visibility`, `.swap__b` adalah `visibility_off`; `.is-swapped` menukarnya dengan crossfade. |
| `.meter-seg` | Pengukur kekuatan opsional untuk kata sandi baru: empat `<i>`, `.on` untuk setiap langkah yang tercapai; `.is-warn` (cukup) atau `.is-full` (lemah, warna danger) pada pengukur. |

## Markup

**Masuk dengan tombol tampilkan.** Ikon mata berganti menjadi mata dicoret dengan crossfade blur; fokus tetap di kolom.
```html
<div class="field">
  <label class="field__label" for="pw">Kata sandi</label>
  <div class="control">
    <span class="ic" aria-hidden="true">key</span>
    <input id="pw" type="password" autocomplete="current-password">
    <button type="button" class="control__btn" aria-label="Tampilkan kata sandi" aria-pressed="false">
      <span class="swap" aria-hidden="true"><span class="ic swap__a">visibility</span><span class="ic swap__b">visibility_off</span></span>
    </button>
  </div>
</div>
<!-- On click: toggle input.type, aria-pressed, the label (Show / Hide password) and .is-swapped on .swap -->
```

**Kata sandi baru dengan kekuatan.** Empat langkah terisi saat kata sandi makin kuat; lemah tampil dalam warna danger, cukup dalam warning. Ketik untuk mencobanya.
```html
<div class="field">
  <label class="field__label" for="new-pw">Kata sandi baru</label>
  <div class="control"><input id="new-pw" type="password" autocomplete="new-password" aria-describedby="new-pw-help"></div>
  <div class="meter-seg is-warn" style="grid-template-columns: repeat(4, minmax(0, 1fr));" aria-hidden="true">
    <i class="on"></i><i class="on"></i><i></i><i></i>
  </div>
  <span class="field__help" id="new-pw-help" aria-live="polite">Cukup. Tambahkan angka.</span>
</div>
```

**Kata sandi salah.** Sebut apa yang gagal dan tawarkan jalan keluarnya di tempat yang sama.
```html
<div class="field" style="max-width: 380px;">
  <label class="field__label" for="pf-bad">Kata sandi</label>
  <div class="control is-invalid"><input id="pf-bad" type="password" value="wayhalim" aria-invalid="true" aria-describedby="pf-bad-help"></div>
  <span class="field__help field__help--error" id="pf-bad-help"><span class="ic" aria-hidden="true">error</span>Kata sandi itu tidak cocok dengan akun ini. Periksa Caps Lock atau atur ulang kata sandi.</span>
  <a class="link" href="#">Atur ulang kata sandi</a>
</div>
```

## Status
| Status | Caranya |
|---|---|
| `hidden / shown` | `type="password"` dengan `aria-pressed="false"` dan label "Tampilkan kata sandi"; saat ditampilkan ketiganya berbalik dan `.is-swapped` ditambahkan. |
| `strength` | Langkah `.meter-seg` diberi `.on`; `.is-full` (lemah, danger) dan `.is-warn` (cukup, warning); baik dan kuat memakai aksen. |
| `.is-invalid` | Tepi danger dengan pesan galat di teks bantuan, seperti [text field](text-field.md). |

## Gerak dan mikrointeraksi
- Tampilkan: dua glyph bertukar dengan crossfade di `.swap`; yang keluar mengecil ke 0.5 dengan blur 4 px dalam `--d-fast` (160 ms) sementara yang baru mendarat dengan `--spring-snappy` (360 ms). Lihat [icon swap](icon-swap.md).
- Tombol mengecil ke 0.88 pada `:active` dan memantul kembali dengan `--spring-snappy`.
- Langkah pengukur berganti warna dalam `--d-standard` (240 ms) dengan `--ease-standard`; tidak membesar atau bergeser.
- Reduced motion: pertukaran menjadi crossfade 120 ms tanpa perubahan skala.

## Aksesibilitas
- Tombol tampilkan adalah `<button type="button">` dengan `aria-pressed` dan label yang menyebut apa yang dilakukannya sekarang ("Tampilkan kata sandi", "Sembunyikan kata sandi"). Jaga fokus tetap di input setelah menekannya jika bisa.
- Pakai `autocomplete` yang tepat agar pengelola kata sandi berfungsi: `current-password` atau `new-password`. Jangan pernah memblokir tempel.
- Pengukurnya dekoratif (`aria-hidden`); teks bantuan menyebut kekuatannya dalam kata di area `aria-live="polite"`.
- Sebut aturannya sebelum galat; saat gagal masuk, jangan sebut apakah email atau kata sandi yang salah jika itu membocorkan keberadaan akun.

## Lakukan
- Sediakan tombol tampilkan di setiap kolom kata sandi, terutama di ponsel.
- Jelaskan langkah berikutnya menuju kata sandi yang lebih kuat, bukan daftar aturan yang gagal.

## Hindari
- Meminta orang mengetik kata sandi baru dua kali saat tombol tampilkan tersedia.
- Memakai warna saja untuk kekuatan; teks bantuan menyebutnya dalam kata.
- Menonaktifkan tempel atau isi otomatis.

## Perilaku (HTML biasa)
Tidak ada. Saat diklik, ganti `type`, `aria-pressed`, label, dan `.is-swapped`; hitung kekuatan di kode Anda dan setel `.on` pada langkah pengukur.

## Terkait
[Text field](text-field.md) · [One-time code](otp.md) · [Icon swap](icon-swap.md) · [Meter](meter.md)
