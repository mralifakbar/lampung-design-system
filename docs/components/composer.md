# Composer

Kelompok: Obrolan. https://lampung.kartadinata.app/docs/components/composer

Kotak balasan di bawah percakapan: kolom membulat yang tumbuh mengikuti teks, Enter untuk mengirim, Shift+Enter untuk baris baru, dan satu tombol kirim bulat yang nonaktif sampai ada yang bisa dikirim.

## Pakai saat
- Orang menulis pesan berikutnya di [chat layout](chat-layout.md): kepada asisten layanan kota, meja bantuan, atau utas layanan pengaduan.
- Satu kotak pertanyaan di bagian atas halaman asisten yang masih kosong, sebelum ada percakapan.

## Pakai yang lain saat
- Kolom formulir untuk jawaban panjang yang disimpan, bukan dikirim (uraian pengaduan, keterangan): pakai [Textarea](textarea.md). Di sana Enter harus menambah baris, bukan mengirim.
- Mencari atau menyaring daftar: pakai [Search field](search-field.md).
- Nilai satu baris seperti nama atau email: pakai [Text field](text-field.md).
- Melompat ke perintah atau halaman: pakai [Command palette](command-palette.md).

## Letaknya
Tepat di bawah area gulir pesan, selebar kolom percakapan, di luar area gulir agar tidak ikut tergulir. Di ponsel ini elemen terakhir di layar, diberi padding safe area (`safe-bottom`), dan naik di atas keyboard. Alat tambahan (lampiran, suara) di kiri textarea; tombol kirim selalu terakhir, di kanan.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `form.composer` | Wajib. `<form>` dengan `data-lds-composer`. Berbentuk pil (radius 24 px); ring muncul saat textarea mendapat fokus. |
| `textarea` | Wajib. `rows="1"`, berlabel. Tumbuh dari satu baris sampai 200 px, lalu bergulir (`field-sizing: content`, dengan cadangan JS). |
| `.composer__send` | Wajib. Tombol aksen bulat 40 px `type="submit"` dengan `aria-label="Kirim"` dan ikon `arrow_upward`. Nonaktif selama teks kosong. |
| `.icon-btn` | Alat opsional sebelum textarea: lampirkan berkas, tambahkan gambar. |

## Markup

**Kirim pertanyaan.** Ketik lalu tekan Enter (atau tombolnya). Pesan Anda masuk ke kolom dan jawaban mengalir masuk. Shift+Enter menambah baris, bukan mengirim.
```html
<form class="composer" data-lds-composer>
  <textarea rows="1" aria-label="Pesan" placeholder="Tanya tentang layanan Disdukcapil"></textarea>
  <button class="composer__send" type="submit" aria-label="Kirim"><span class="ic" aria-hidden="true">arrow_upward</span></button>
</form>
<script type="module">
  import { init } from 'lampung-design-system/js';
  init();
  document.querySelector('.composer').addEventListener('lds:send', (e) => {
    addMyMessage(e.detail.text); // the textarea is already cleared and focused
    askAssistant(e.detail.text);
  });
</script>
```

**Dengan tombol lampiran.** Alat ada sebelum textarea dan mempertahankan area sentuh 44 px. Tombol kirim tetap satu-satunya kontrol berisi warna.
```html
<form class="composer" data-lds-composer style="max-width: 520px; width: 100%;">
  <button class="icon-btn" type="button" aria-label="Lampirkan berkas"><span class="ic" aria-hidden="true">attach_file</span></button>
  <textarea rows="1" aria-label="Pesan" placeholder="Jelaskan masalah yang Anda temukan"></textarea><button class="composer__send" type="submit" aria-label="Kirim"><span class="ic" aria-hidden="true">arrow_upward</span></button>
</form>
```

**Tumbuh mengikuti teks.** Draf panjang membuat kotak tumbuh baris demi baris sampai 200 px, lalu bergulir di dalam. Tombol tetap di bawah, di samping baris terakhir.
```html
<form class="composer" data-lds-composer style="max-width: 520px; width: 100%;">
  <textarea rows="1" aria-label="Pesan">Saya pindah dari Metro ke Kedaton, Bandar Lampung bulan lalu dan KK saya masih memakai alamat lama.
Apakah saya perlu surat pindah dari Metro dulu, atau bisa diurus di kelurahan Kedaton?
Dokumen apa saja yang harus dibawa?</textarea><button class="composer__send" type="submit" aria-label="Kirim"><span class="ic" aria-hidden="true">arrow_upward</span></button>
</form>
```

## Status
| Status | Caranya |
|---|---|
| `empty` | Tombol kirim nonaktif (opasitas 35 %, tanpa efek). Enter tidak melakukan apa pun. |
| `focus` | Ring aksen: inset 1,5 px plus ring lembut 4 px, selama `--d-fast`. |
| `typing` | Tombol kirim aktif begitu teks berisi karakter selain spasi. |
| `sent` | Form memancarkan `lds:send` dengan `{ text }`, mengosongkan textarea, menyusut kembali ke satu baris dan mempertahankan fokus untuk pesan berikutnya. |
| `composing (IME)` | Enter saat sedang menyusun karakter (input Jepang, Tionghoa) mengonfirmasi karakter dan tidak mengirim. |

## Gerak dan mikrointeraksi
- Tombol kirim mengecil ke 0,9 saat ditekan dan memantul kembali dengan `--spring-snappy` (360 ms); aktif dan nonaktif cross-fade opasitas selama `--d-fast`.
- Focus ring bertransisi selama `--d-fast` dengan `--ease-standard`.
- Pertumbuhan tidak dianimasikan: setiap baris baru langsung muncul, jadi caret tidak pernah mengejar kotak yang bergerak.
- Reduced motion: efek tekan dan ring menjadi perubahan linear 120 ms.

## Aksesibilitas
- Beri label pada textarea (`aria-label="Pesan"` atau label yang terlihat). Placeholder hanya petunjuk, bukan label.
- Tombol kirim adalah tombol `type="submit"` sungguhan dengan `aria-label="Kirim"`; nonaktif saat kosong, jadi teknologi bantu melaporkan kenapa tidak terjadi apa-apa.
- Sebutkan tombolnya sekali di dekat kotak saat pertama dipakai ("Enter untuk mengirim, Shift+Enter untuk baris baru") dengan [hint](hints.md), bukan di placeholder.
- Setelah mengirim, fokus tetap di textarea.

## Lakukan
- Letakkan di luar area gulir, di bawah percakapan.
- Dengarkan `lds:send`; jangan menambah penanganan Enter sendiri.
- Letakkan alat di kiri dan tombol kirim paling akhir.

## Hindari
- Memakainya untuk jawaban formulir yang disimpan, bukan dikirim: pakai [textarea](textarea.md).
- Menyembunyikan tombol kirim dan hanya mengandalkan Enter.
- Menganimasikan tinggi kotak atau mengosongkan teks sebelum pesan aman masuk antrean.

## Perilaku (HTML biasa)
`init()` memasang `form[data-lds-composer]`: Enter mengirim (tidak saat menyusun karakter), Shift+Enter menambah baris, tombol kirim nonaktif saat kosong, kotak tumbuh sampai 200 px (`field-sizing` bawaan, atau cadangan tinggi). Saat mengirim, ia memancarkan `lds:send` dengan `{ text }` (bubbles), lalu mengosongkan textarea dan memfokuskannya lagi.

## Terkait
[Chat layout](chat-layout.md) · [Chat message](chat-message.md) · [Streaming text](streaming-text.md) · [Textarea](textarea.md)
