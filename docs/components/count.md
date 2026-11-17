# Count

Kelompok: Umpan balik. https://lampung.kartadinata.app/docs/components/count

Pil merah kecil berisi jumlah hal yang menunggu orang: pesan belum dibaca, permohonan tertunda. Artinya "tindak lanjuti ini", jadi pakai hanya untuk itu.

## Pakai saat
- Item belum dibaca atau tertunda yang menunggu orang: 3 pesan baru, 2 permohonan untuk disetujui.
- Di ujung baris navigasi atau baris pengaturan yang mengarah ke item-item itu.

## Pakai yang lain saat
- Jumlah di dalam label tab: pakai [Tabs](tabs.md). Pakai `.tabs__count`, yang berwarna abu-abu tenang.
- Jumlah di dalam heading bagian app shell: pakai [App shell](app-shell.md).
- Status atau jenis dalam kata-kata: pakai [Badge](badge.md).
- Status sistem atau koneksi: pakai [Status dot](status-dot.md).
- Angka kunci di halaman (kuota, skor): pakai [Stat row](stat-row.md).

## Letaknya
Di ujung baris atau kontrol yang mengarah ke item, sebelum chevron. Di baris navigasi, item sidebar atau item menu. Satu count per tujuan; jangan pernah di konten itu sendiri.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.count` | Wajib. Pil 18 px, isian danger, angka tabular semibold 11 px putih, lebar minimal 18 px sehingga satu digit berbentuk lingkaran. |
| `.sr-only` | Disarankan. Kata-kata tersembunyi yang menyebut apa yang dihitung. |

## Markup

**Di baris navigasi.** Count ada sebelum chevron. Batasi sampai 99+.
```html
<div class="list" style="max-width: 420px;">
  <a class="lrow lrow--icon" href="#messages"><span class="lrow__icon" style="background: var(--tile-blue);"><span class="ic" aria-hidden="true">chat</span></span><span class="lrow__body"><span class="lrow__title">Pesan</span></span><span class="count">3<span class="sr-only"> belum dibaca</span></span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></a>
  <a class="lrow lrow--icon" href="#requests"><span class="lrow__icon" style="background: var(--tile-orange);"><span class="ic" aria-hidden="true">person_add</span></span><span class="lrow__body"><span class="lrow__title">Permohonan pendaftaran</span></span><span class="count">99+<span class="sr-only"> menunggu</span></span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></a>
  <a class="lrow lrow--icon" href="#notifications"><span class="lrow__icon" style="background: var(--tile-red);"><span class="ic" aria-hidden="true">notifications</span></span><span class="lrow__body"><span class="lrow__title">Notifikasi</span></span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></a>
</div>
```

**Di samping label.** Di dalam wadah flex (tombol, baris) pil mempertahankan bentuknya.
```html
<div class="docs-row">
  <button class="btn btn--gray btn--md">Kotak masuk<span class="count">12<span class="sr-only"> belum dibaca</span></span></button>
</div>
```

## Status
| Status | Caranya |
|---|---|
| `zero` | Hapus count sepenuhnya; jangan pernah tampilkan "0". |
| `over 99` | Tulis "99+". |

## Gerak dan mikrointeraksi
- Tidak ada saat diam. Saat angka berubah ketika terlihat, [rolling number](rolling-number.md) bisa menggeser digit dengan `--spring-smooth`; count yang muncul dari nol boleh meletup masuk sekali dengan `lds-pop-in` selama `--d-snappy`.
- Jangan pernah membuat count berdenyut atau memantul untuk menarik perhatian.

## Aksesibilitas
- Angka tanpa konteks tidak bermakna: tambahkan kata tersembunyi di dalamnya (`<span class="sr-only"> belum dibaca</span>`) atau sertakan di nama aksesibel baris.
- Saat count bertambah ketika orang berada di halaman, umumkan secara sopan hanya jika penting (baris `role="status"` "2 pesan baru"); jangan jadikan count itu sendiri live region.
- Merah bukan satu-satunya sinyal; angka dan kata-kata yang membawanya.

## Lakukan
- Pakai hanya untuk hal yang menunggu orang.
- Hapus begitu orang sudah melihat item-itemnya.
- Letakkan di dalam induk flex (baris, tombol) agar bentuk pilnya terjaga.

## Hindari
- Memakainya untuk total ("42 layanan"); tulis totalnya sebagai teks.
- Menampilkan count di lebih dari dua atau tiga tujuan sekaligus.
- Memakainya sebagai titik tanpa angka.

## Terkait
[Badge](badge.md) · [Status dot](status-dot.md) · [Tabs](tabs.md) · [List](list.md)
