# Form layout

Kelompok: Landasan. https://lampung.kartadinata.app/docs/components/form-layout

Kerangka yang dipakai setiap formulir: `form` menumpuk kolom berjarak 20 px, `form__row` menaruh kolom pendek berdampingan saat ada ruang, dan `form__actions` menutup formulir dengan tombolnya. Kolom di dalamnya selalu `.field`.

## Pakai saat
- Formulir apa pun dengan lebih dari satu kolom: pendaftaran, profil, pembayaran, halaman pengaturan layanan, isi dialog atau sheet.
- Dua atau tiga kolom pendek yang saling terkait berada satu baris di layar lebar (nama depan dan belakang, kota dan kode pos, tanggal mulai dan selesai) dan harus menumpuk di ponsel.
- Formulir butuh tombol di akhir, tombol utama di kanan pada layar lebar dan selebar layar di atas pada ponsel.

## Pakai yang lain saat
- Menata apa pun yang bukan formulir (kartu, badge, toolbar): pakai [Layout primitives](layout-primitives.md).
- Satu kolom itu sendiri: label, kontrol, bantuan, dan galat: pakai [Text field](text-field.md).
- Satu kotak pencarian di atas daftar: pakai [Search field](search-field.md). Kolom pencarian bukan formulir; ia menyaring saat mengetik dan tidak punya baris kirim.
- Pengaturan yang berlaku saat itu juga ketika diubah: pakai [Switch](switch.md). Daftar pengaturan menyimpan per baris; tidak memakai baris form__actions.
- Nilai panjang yang dibaca sebagai label dan nilai, bukan disunting: pakai [Key-value](key-value.md).

## Letaknya
Di dalam kolom konten halaman (batasi dengan `measure` atau lebar maksimal sekitar 560 px untuk formulir satu kolom), di dalam isi [dialog](dialog.md), [modal](modal.md), atau [sheet](sheet.md), atau di kolom utama `split-2`. Di ponsel formulir selebar layar dengan gutter halaman 20 px.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `form.form` | Wajib. Elemen `<form>`. Kolom flex dengan jarak 20 px antaranak. |
| `.field` | Wajib untuk setiap input: `.field__label` + `.control` (atau komponen input lain) + `.field__help` opsional. Lihat [text field](text-field.md). |
| `.form__row` | Opsional. Grid kolom sama lebar, masing-masing minimal 200 px; turun menjadi satu kolom saat tidak ada ruang. Jarak 16 px. |
| `fieldset` | Opsional. Mengelompokkan kolom terkait dengan `<legend>`; sistem mengatur ulang garis tepi dan padding-nya. |
| `.form__actions` | Wajib saat formulir dikirim. Tombol rata ke akhir dengan jarak 10 px; di bawah 560 px menumpuk, selebar layar, tombol utama di atas. |

## Markup

**Formulir profil.** Pasangan kolom berbagi baris di layar lebar dan menumpuk di ponsel. Tombol batal ditulis lebih dulu di sumber agar tombol utama berada terakhir di baris dan di atas saat tombol menumpuk.
```html
<form class="form" style="max-width: 560px;" onsubmit="event.preventDefault()">
  <div class="form__row">
    <div class="field">
      <label class="field__label" for="pf-first">Nama depan</label>
      <div class="control"><input id="pf-first" type="text" value="Rina"></div>
    </div>
    <div class="field">
      <label class="field__label" for="pf-last">Nama belakang</label>
      <div class="control"><input id="pf-last" type="text" value="Kusuma"></div>
    </div>
  </div>
  <div class="field">
      <label class="field__label" for="pf-email">Email</label>
      <div class="control"><input id="pf-email" type="email" value="rina.kusuma@example.com" aria-describedby="pf-email-help"></div>
      <span class="field__help" id="pf-email-help">Bukti permohonan dan kuitansi dikirim ke sini.</span>
    </div>
  <div class="field">
      <label class="field__label" for="pf-phone">Nomor ponsel <span>Opsional</span></label>
      <div class="control"><input id="pf-phone" type="tel" value="" aria-describedby="pf-phone-help"></div>
      <span class="field__help" id="pf-phone-help">Hanya untuk pengingat jadwal layanan.</span>
    </div>
  <div class="form__actions">
    <button type="button" class="btn btn--secondary">Batal</button>
    <button type="submit" class="btn btn--primary">Simpan profil</button>
  </div>
</form>
```

**Dikelompokkan dengan fieldset.** Fieldset dengan legend menamai sekelompok pilihan terkait; formulir menjaga ritme yang sama di sekitarnya.
```html
<form class="form" style="max-width: 560px;" onsubmit="event.preventDefault()">
  <div class="field">
      <label class="field__label" for="ex-name">Nama kegiatan</label>
      <div class="control"><input id="ex-name" type="text" value="Vaksinasi anak, Puskesmas Kedaton"></div>
    </div>
  <div class="form__row">
    <div class="field">
      <label class="field__label" for="ex-date">Tanggal</label>
      <div class="control"><input id="ex-date" type="date" value="2026-12-04"></div>
    </div>
    <div class="field">
      <label class="field__label" for="ex-time">Jam mulai</label>
      <div class="control"><input id="ex-time" type="time" value="09:00"></div>
    </div>
  </div>
  <fieldset class="stack" style="--gap: 12px; border: 0;">
    <legend class="field__label" style="margin-bottom: 12px;">Ingatkan warga</legend>
    <label class="check"><input type="checkbox" checked><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path></svg></span><span class="check__text">Satu minggu sebelumnya</span></label>
    <label class="check"><input type="checkbox" checked><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path></svg></span><span class="check__text">Malam sebelumnya</span></label>
  </fieldset>
  <div class="form__actions">
    <button type="button" class="btn btn--plain">Simpan sebagai draf</button>
    <button type="submit" class="btn btn--primary">Jadwalkan kegiatan</button>
  </div>
</form>
```

**Galat setelah dikirim.** Baris bantuan berubah menjadi pesan galat di tempat yang sama, jadi tidak ada yang bergeser di bawahnya. Fokus pindah ke kolom pertama yang tidak valid.
```html
<form class="form">
  <div class="field">
    <label class="field__label" for="sn">NIK</label>
    <div class="control is-invalid"><input id="sn" inputmode="numeric" aria-invalid="true" aria-describedby="sn-help"></div>
    <span class="field__help field__help--error" id="sn-help"><span class="ic" aria-hidden="true">error</span>Masukkan 16 digit NIK sesuai KTP Anda.</span>
  </div>
  <div class="form__actions">
    <button type="submit" class="btn btn--primary">Hubungkan akun saya</button>
  </div>
</form>
```

## Status
| Status | Caranya |
|---|---|
| `error` | Per kolom: `.control.is-invalid` + `aria-invalid="true"` + `.field__help--error` dengan ikon `error`. Validasi setelah blur pertama, lalu secara langsung. |
| `submitting` | Tombol utama mendapat `.is-loading` dan `aria-busy="true"` (`setLoading(btn, true)`); kolom tetap bisa disunting. |
| `many errors` | Taruh [alert](alert.md) di atas formulir yang mendaftar semua galat dengan tautan ke tiap kolom, lalu fokuskan alert itu. |

## Gerak dan mikrointeraksi
- Formulir sendiri tidak pernah dianimasikan. Kolom yang muncul karena sebuah pilihan (kotak teks "Lainnya") terbuka dengan [height expand](height-expand.md) memakai `--spring-smooth` selama `--d-smooth`.
- Galat berganti warna dalam `--d-fast` dengan `--ease-standard`; baris bantuan menjaga tingginya sehingga tidak ada yang melompat. Pengiriman yang ditolak boleh [shake](shake.md) kolom pertama yang tidak valid sekali.
- Dengan reduced motion, expand menjadi cross-fade 120 ms.

## Aksesibilitas
- Pakai `<form>` sungguhan agar Enter mengirim dan browser bisa mengisi otomatis; tombol kirim `type="submit"`, yang lain `type="button"`.
- Setiap input punya `<label for>`; teks bantuan dan galat dihubungkan dengan `aria-describedby`.
- Kelompok checkbox atau radio masuk ke `<fieldset>` dengan `<legend>`.
- Urutan sumber sama dengan urutan visual: batal sebelum kirim di markup. Di ponsel `column-reverse` menampilkan tombol utama di atas sementara Tab tetap mencapai Batal lebih dulu, sesuai dengan membaca tombol dari akhir formulir.
- Saat pengiriman gagal, pindahkan fokus ke kolom pertama yang tidak valid atau ke [alert](alert.md) ringkasan.

## Lakukan
- Batasi formulir satu kolom sekitar 560 px; input panjang yang membentang di layar lebar sulit dipindai.
- Pasangkan hanya kolom pendek yang saling terkait di `form__row`; satu gagasan per baris.
- Namai tombol utama sesuai hasilnya ("Simpan profil", "Jadwalkan kegiatan").

## Hindari
- Menata kolom dengan `auto-grid` atau flex buatan sendiri; baris galat dan label jadi tidak sejajar.
- Menaruh tiga kolom atau lebih yang tidak berhubungan dalam satu baris demi menghemat ruang.
- Menambahkan tombol utama kedua ke `form__actions`, atau menaruh tombol di atas kolom.

## Perilaku (HTML biasa)
Tidak perlu untuk tata letak. `setLoading(button, true)` untuk status mengirim; `shake(el)` untuk pengiriman yang ditolak.

## Terkait
[Text field](text-field.md) · [Layout primitives](layout-primitives.md) · [Button](button.md) · [Alert](alert.md)
