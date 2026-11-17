# Link

Kelompok: Aksi. https://lampung.kartadinata.app/docs/components/link

Teks yang membawa Anda ke tempat lain: `<a href>` dengan `.link`, tebal medium dalam warna teks aksen, garis bawah muncul perlahan saat hover. `.link--external` menambahkan panah untuk situs lain.

## Pakai saat
- Pindah ke halaman, bagian, atau situs lain dari dalam kalimat atau baris teks pendek: "Lacak statusnya", "Baca syarat layanan".
- Jalur kedua yang tenang di samping formulir atau kartu yang tidak mengubah apa pun ("Lupa kata sandi?").
- Menunjuk ke situs lain atau dokumen yang terbuka di tab baru (`link--external`).

## Pakai yang lain saat
- Kontrol menjalankan sesuatu di halaman ini (simpan, hapus, buka dialog): pakai [Button](button.md). Pakai `btn--plain` jika harus tampak ringan; ia tetap tombol.
- Teks panjang dengan banyak tautan (artikel, halaman bantuan): pakai [Prose](prose.md). Tautan di dalam `.prose` diberi gaya otomatis, bergaris bawah saat diam.
- Petak tujuan besar dengan judul dan deskripsi: pakai [Link card](link-card.md).
- Rujukan bernomor ke sebuah sumber: pakai [Citation](citation.md).
- Navigasi antarbagian utama aplikasi: pakai [Sidebar](sidebar.md).

## Letaknya
Sebaris di teks isi, di baris bantuan di bawah kolom, di akhir deskripsi kartu dan alert. Di ponsel, tautan harus tetap setinggi minimal 24 px dengan ruang di sekitarnya; untuk tautan mandiri di layar sentuh lebih baik pakai baris [list](list.md) atau `btn--plain`.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `a.link` | Wajib. `<a href>`. Warna teks aksen, tebal 500, garis bawah berjarak 3 px dan tebal 1.5 px, transparan sampai hover. |
| `.link--external` | Opsional. Menambahkan panah `north_east` dari font ikon setelah teks. |
| `target="_blank" rel="noreferrer"` | Bersama `link--external` saat membuka tab baru; tambahkan teks tersembunyi yang menyebutkannya. |

## Markup

**Di dalam kalimat.** Tautan terbaca sebagai bagian dari teks. Sorot untuk melihat garis bawah muncul.
```html
<p class="measure" style="font: var(--type-body); color: var(--text-default);">Permohonan Anda sudah dikirim ke petugas verifikasi. <a class="link" href="#status">Lacak statusnya</a> atau <a class="link link--external" href="https://example.com/service-requirements" target="_blank" rel="noreferrer">baca syarat layanan<span class="sr-only"> (terbuka di tab baru)</span></a>.</p>
```

**Di bawah kolom.** Jalur kedua yang tenang dan meninggalkan formulir.
```html
<div class="field" style="max-width: 360px;">
  <label class="field__label" for="lk-pw">Kata sandi</label>
  <div class="control"><input id="lk-pw" type="password" value="warga2026"></div>
  <span class="field__help"><a class="link" href="#reset">Lupa kata sandi?</a></span>
</div>
```

## Varian dan ukuran
| Kelas atau atribut | Kapan |
|---|---|
| `link` | Tujuan internal. |
| `link--external` | Situs lain atau berkas yang terbuka di tab baru. |

## Status
| Status | Caranya |
|---|---|
| `hover` | Garis bawah berubah dari transparan ke `currentColor`. |
| `focus` | Focus ring sistem di sekitar teks (radius 3 px). |
| `visited` | Tidak diberi gaya; sistem tidak membedakan tautan yang sudah dikunjungi. |

## Gerak dan mikrointeraksi
- Warna garis bawah bertransisi selama `--d-fast` dengan `--ease-standard`. Tidak ada yang bergerak atau berubah skala.
- Reduced motion membiarkannya apa adanya (hanya perubahan warna).

## Aksesibilitas
- Selalu `<a href>`; jangan pernah `<span>` atau `<button>` yang diberi gaya tautan.
- Teks tautan menyebut tujuannya dengan sendirinya ("Lacak statusnya"), jangan "klik di sini" atau "selengkapnya".
- Untuk tab baru, tambahkan `<span class="sr-only"> (terbuka di tab baru)</span>` di dalam tautan.
- Warna saja tidak cukup di teks berjalan dengan kontras rendah antara tautan dan isi: teks aksen mencapai 6.7:1 di kanvas dan berbeda ketebalan; di artikel panjang pakai [prose](prose.md), yang membuat garis bawah tetap terlihat saat diam.

## Lakukan
- Tulis teks tautan yang masuk akal di luar konteksnya.
- Tandai tautan eksternal dengan `link--external`.
- Biarkan tautan tetap di dalam kalimat yang menjadi miliknya.

## Hindari
- Memakai tautan untuk mengirim, menghapus, atau membuka dialog.
- Menjadikan satu paragraf penuh sebagai tautan.
- Memakai `link--external` untuk halaman di situs Anda sendiri.

## Terkait
[Button](button.md) · [Prose](prose.md) · [Link card](link-card.md) · [Citation](citation.md)
