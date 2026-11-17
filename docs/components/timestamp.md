# Timestamp

Kelompok: Tampilan data. https://lampung.kartadinata.app/docs/components/timestamp

`<time>` yang menunjukkan kapan sesuatu terjadi atau jatuh tempo dalam kata relatif ("5 menit yang lalu", "dalam 3 hari"), dalam bahasa halaman, dan memperbarui dirinya sendiri. Tanggal persisnya ada di title.

## Pakai saat
- Kapan sesuatu terjadi, ketika kebaruan lebih penting daripada jam persisnya: pesan, komentar, perubahan di log.
- Kapan sesuatu segera jatuh tempo: "dalam 2 hari", "besok".

## Pakai yang lain saat
- Hitung mundur dalam detik menuju tenggat tegas: pakai [Timer](timer.md).
- Tanggal persisnya penting (tanggal jatuh tempo di catatan, tanggal hukum): pakai [Key-value](key-value.md). Tulis tanggal absolutnya.
- Riwayat peristiwa bertanggal: pakai [Timeline](timeline.md).
- Berapa lama pekerjaan yang sedang berjalan sudah berlangsung: pakai [Thinking](thinking.md).

## Letaknya
Di baris meta: nilai atau baris kedua di baris daftar, kepala pesan, subjudul kartu, sel tabel. Teks samar, angka tabular.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `time.timestamp` | Wajib. Warna samar, angka tabular. |
| `[data-lds-time]` | Wajib untuk perilakunya. Tanggal ISO dengan offset-nya ("2026-11-16T09:30:00+07:00"). |
| `text content` | Teks cadangan yang tampil sebelum JS berjalan (tanggal absolut); JS menggantinya. |
| `[datetime] / [title]` | Dipasang JS: nilai ISO dan tanggal serta jam lengkap sesuai bahasa. |

## Markup

**Di baris daftar.** Tanggal lampau dan mendatang dalam kata relatif. Arahkan kursor ke waktu untuk melihat tanggal persisnya.
```html
<div class="list" style="max-width: 460px;">
  <div class="lrow"><div class="lrow__body"><div class="lrow__title">Tanggapan atas laporan jalan rusak</div><div class="lrow__sub">Dua komentar dari petugas</div></div><time class="timestamp lrow__value" data-lds-time="2026-11-16T08:05:00+07:00">16 Nov 2026, 08.05</time></div>
  <div class="lrow"><div class="lrow__body"><div class="lrow__title">Ruang sosialisasi dipindah</div><div class="lrow__sub">Sekarang di gedung C, ruang 204</div></div><time class="timestamp lrow__value" data-lds-time="2026-11-13T15:20:00+07:00">13 Nov 2026, 15.20</time></div>
  <div class="lrow"><div class="lrow__body"><div class="lrow__title">Batas pendaftaran beasiswa daerah</div><div class="lrow__sub">Unggah rapor Anda</div></div><time class="timestamp lrow__value" data-lds-time="2026-12-01T17:00:00+07:00">1 Des 2026, 17.00</time></div>
</div>
```

**Di dalam kalimat.** Di dalam teks ukurannya mewarisi sekitarnya dan warnanya tetap samar.
```html
<p class="card__sub">Terakhir disinkronkan <time class="timestamp" data-lds-time="2026-11-16T09:00:00+07:00">16 Nov 2026, 09.00</time> dari ponsel Anda.</p>
```

## Status
| Status | Caranya |
|---|---|
| `before JS` | Menampilkan teks cadangan yang Anda tulis. |
| `within 45 seconds` | "sekarang" dalam bahasa halaman. |
| `later` | Detik, menit, jam, hari, minggu, bulan, tahun, dibulatkan ke satuan terdekat; diperbarui setiap 15 detik selama kurang dari semenit, lalu setiap menit. |

## Gerak dan mikrointeraksi
- Tidak ada. Kata-katanya berubah di tempat tanpa animasi; angka tabular menjaga lebarnya tetap.

## Aksesibilitas
- Ini elemen `<time>` asli dengan `datetime` yang terbaca mesin.
- `title` berisi tanggal lengkap tidak bisa dicapai dengan keyboard atau sentuhan: bila tanggal persisnya penting, tuliskan di samping waktu relatif atau di detailnya.
- Bahasanya diambil dari atribut `lang` terdekat, jadi pasang `lang` pada halaman.

## Lakukan
- Pakai waktu relatif untuk hal yang baru dan tanggal absolut untuk yang lebih lama dari beberapa minggu atau yang mengikat secara hukum.
- Beri tanggal cadangan yang bermakna di markup.
- Sertakan offset zona waktu di `data-lds-time`.

## Hindari
- Memakainya untuk tenggat yang diukur dalam detik; pakai [timer](timer.md).
- Mencampur tanggal relatif dan absolut dalam satu kolom.

## Perilaku (HTML biasa)
`data-lds-time="tanggal ISO"` pada `<time>` memformatnya dengan `Intl.RelativeTimeFormat` dalam bahasa halaman (`numeric: "auto"`, sehingga muncul "kemarin" dan "besok"), memasang `datetime` dan `title` berisi tanggal lengkap, dan menjaganya tetap terbaru selama berada di dokumen. Panggil `init(el)` setelah merender timestamp baru.

## Terkait
[Timer](timer.md) · [Key-value](key-value.md) · [List](list.md) · [Chat message](chat-message.md)
