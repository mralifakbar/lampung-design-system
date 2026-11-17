# Icon button

Kelompok: Aksi. https://lampung.kartadinata.app/docs/components/icon-button

Tombol yang hanya menampilkan ikon: target 44 px, glyph 22 px, bulat. Selalu punya `aria-label` dan tooltip dengan kata yang sama.

## Pakai saat
- Aksi yang sudah dikenal di toolbar, sudut kartu, nav bar, atau baris yang akan sesak jika memakai label teks: tutup, opsi lainnya, bagikan, simpan, filter.
- Beberapa aksi kecil berdampingan dan masing-masing mudah dikenali dari ikonnya saja (aksi pesan: salin, coba lagi, suka).
- Tombol tutup pada dialog, sheet, alert, atau lightbox.

## Pakai yang lain saat
- Aksinya tidak jelas dari ikon, atau merupakan aksi utama tampilan: pakai [Button](button.md). Beri kata-kata. "Ekspor" lebih jelas daripada panah unduh yang tidak pernah disorot orang.
- Satu aksi membuat di layar ponsel yang melayang di atas konten: pakai [Floating action](floating-action.md).
- Ikon tetap tertekan untuk menunjukkan mode (tebal, bisukan, sematkan): pakai [Toggle](toggle.md).
- Membuka daftar aksi terkait: pakai [Dropdown menu](dropdown-menu.md). Pemicunya tetap icon button (`more_horiz`); menunya adalah dropdown.
- Menyalin nilai dengan konfirmasi yang terlihat: pakai [Copy button](copy-button.md).

## Letaknya
Kanan atas kartu, dialog, dan sheet (tutup, lainnya); di kedua ujung nav bar ponsel; di akhir baris daftar; di toolbar dalam kelompok 2 sampai 4. Di ponsel pertahankan target minimal 44 px; jangan pernah mengecilkan `icon-btn` di bawahnya.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.icon-btn` | Wajib. `<button>` (atau `<a href>` saat berpindah halaman). 44 kali 44, bulat, transparan sampai disorot. |
| `aria-label` | Wajib. Aksinya dalam kata-kata ("Opsi lainnya", "Tutup"). |
| `.ic` | Wajib. Glyph, 22 px (19 px pada `--filled`). |
| `.tip-host + .tip` | Disarankan. Membungkus tombol agar [tooltip](tooltip.md) menampilkan kata yang sama setelah 500 ms disorot atau saat fokus keyboard. |

## Markup

**Polos dan berisi.** Polos untuk toolbar dan nav bar. Berisi (cakram cekung 36 px di dalam target 44 px yang sama) saat tombol berada di permukaan ramai atau perlu ditemukan sekilas.
```html
<div class="docs-row">
  <span class="tip-host"><button class="icon-btn" aria-label="Bagikan"><span class="ic" aria-hidden="true">ios_share</span></button><span class="tip" role="tooltip">Bagikan</span></span>
  <span class="tip-host"><button class="icon-btn" aria-label="Simpan"><span class="ic" aria-hidden="true">bookmark</span></button><span class="tip" role="tooltip">Simpan</span></span>
  <span class="tip-host"><button class="icon-btn" aria-label="Opsi lainnya"><span class="ic" aria-hidden="true">more_horiz</span></button><span class="tip" role="tooltip">Opsi lainnya</span></span>
  <span class="tip-host"><button class="icon-btn icon-btn--filled" aria-label="Filter"><span class="ic" aria-hidden="true">tune</span></button><span class="tip" role="tooltip">Filter</span></span>
  <span class="tip-host"><button class="icon-btn icon-btn--filled" aria-label="Tutup"><span class="ic" aria-hidden="true">close</span></button><span class="tip" role="tooltip">Tutup<span class="kbd">esc</span></span></span>
</div>
```

**Di header kartu.** Tombol opsi lainnya di akhir baris judul kartu. Ia sedikit masuk ke padding kartu agar glyph sejajar dengan tepinya.
```html
<div class="card" style="width: 340px;">
  <div class="cluster" style="justify-content: space-between; flex-wrap: nowrap;">
    <div><div class="card__title">Izin usaha mikro</div><div class="card__sub">UMKM Sukarame · berkas kurang 1</div></div>
    <span class="tip-host" style="margin: -10px -10px 0 0;"><button class="icon-btn" aria-label="Opsi lainnya untuk Izin usaha mikro"><span class="ic" aria-hidden="true">more_vert</span></button><span class="tip" role="tooltip">Opsi lainnya</span></span>
  </div>
</div>
```

**Sebagai tautan.** Saat berpindah ke tempat lain, ia adalah `<a href>` dengan kelas yang sama.
```html
<span class="tip-host"><a class="icon-btn" href="#settings" aria-label="Pengaturan"><span class="ic" aria-hidden="true">settings</span></a><span class="tip" role="tooltip">Pengaturan</span></span>
```

## Varian dan ukuran
| Kelas atau atribut | Kapan |
|---|---|
| `icon-btn` | Transparan; `--bg-tint` saat hover, `--bg-tint-strong` saat ditekan. |
| `icon-btn--filled` | Cakram 36 px di atas `--bg-recessed` dengan margin 4 px, sehingga target tetap 44. |
| `icon-btn--accent` | Isian aksen dengan tampilan primary. Hanya untuk [floating action](floating-action.md). |

## Status
| Status | Caranya |
|---|---|
| `hover` | Latar `--bg-tint`, di perangkat yang bisa hover. |
| `:active` | Mengecil ke `scale(0.9)` dalam 90 ms dengan `--bg-tint-strong`, kembali dengan `--spring-snappy`. |
| `focus` | Focus ring sistem (`--focus`, 2 px, offset 2 px); tooltip juga tampil. |
| `aria-pressed / aria-expanded` | Saat ia menyalakan atau membuka sesuatu; untuk tampilan tertekan yang bertahan pakai [toggle](toggle.md). |
| `disabled` | Lebih baik sembunyikan aksinya. Jika tetap ditampilkan nonaktif, tambahkan `disabled`; tidak ada gaya khusus selain bawaan browser, jadi sertakan alasannya. |

## Gerak dan mikrointeraksi
- Tekan: `transform: scale(0.9)` pada `:active` dengan durasi 90 ms; lepas kembali dengan `--spring-snappy` selama `--d-snappy`. Umpan balik dimulai saat pointer turun.
- Warna latar berubah selama `--d-fast` dengan `--ease-standard`.
- Tooltip: menunggu 500 ms, lalu memudar masuk selama `--d-fast` dan naik dengan `--spring-snappy`; langsung pergi (100 ms dengan `--ease-exit`).
- Saat glyph berganti makna (putar ke jeda), pakai [icon swap](icon-swap.md) di dalam tombol.

## Aksesibilitas
- `<button type="button">` dengan `aria-label`; span ikon diberi `aria-hidden="true"`.
- Label menyebut aksinya dan, jika ada banyak di satu halaman, objeknya: "Opsi lainnya untuk Izin usaha mikro".
- Tooltip bersifat pelengkap; memakai `role="tooltip"` dan tampil saat `:focus-within`, jadi pengguna keyboard juga melihatnya.
- Target 44 kali 44; jangan setel lebar atau tinggi yang lebih kecil.

## Lakukan
- Pakai hanya ikon yang maknanya umum: tutup, lainnya, bagikan, cari, pengaturan.
- Ulangi kata `aria-label` di tooltip.
- Kelompokkan icon button terkait dengan jarak 0 sampai 4 px; bentuk hover bulatnya sudah memisahkan mereka.

## Hindari
- Memakai icon button untuk aksi utama formulir atau halaman.
- Mengecilkannya ke 32 px agar muat di baris padat; pakai `btn--sm` dengan teks.
- Memakai `icon-btn--accent` di luar floating action.

## Terkait
[Button](button.md) · [Tooltip](tooltip.md) · [Floating action](floating-action.md) · [Toggle](toggle.md)
