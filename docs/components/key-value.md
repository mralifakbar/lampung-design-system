# Key-value

Kelompok: Tampilan data. https://lampung.kartadinata.app/docs/components/key-value

Pasangan label dan nilai yang menjelaskan satu hal: pembayaran, pendaftaran ujian, profil. Baris `.kv` di dalam `<dl>`, di dalam kartu atau di kotak `.kv-list` sendiri.

## Pakai saat
- Detail satu catatan: biaya, tanggal jatuh tempo, dan status pembayaran; kursi, ruang, dan jam ujian.
- Ringkasan sebelum konfirmasi ("Periksa pendaftaran Anda").
- Fakta tentang pokok halaman di panel samping.

## Pakai yang lain saat
- Beberapa catatan yang dibandingkan menurut atribut yang sama: pakai [Table](table.md).
- Beberapa angka besar yang merangkum halaman: pakai [Stat row](stat-row.md).
- Baris yang membuka halaman untuk mengubah setiap nilai: pakai [List](list.md). Pakai `.lrow__value` dengan chevron.
- Nilainya bisa diubah: pakai [Form layout](form-layout.md).
- Peristiwa bertanggal secara berurutan: pakai [Timeline](timeline.md).

## Letaknya
Di dalam [kartu](card.md) di bawah judulnya, di panel samping, di [dialog](dialog.md) sebelum konfirmasi, atau sendiri sebagai kotak `.kv-list` di kolom isi. Label di kiri, nilai di kanan di semua ukuran layar; ganti ke `.kv-list--stack` bila nilainya berupa kalimat atau nama panjang.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `dl` | Wajib. Daftar pasangannya. |
| `.kv` | Wajib. Baris `div`: label di kiri, nilai di kanan, minimal 44 px, garis tipis di antara baris. Tanpa padding sendiri, jadi muat di kartu dan baris. |
| `.kv > dt` | Labelnya: teks samar. |
| `.kv > dd` | Nilainya: tegas, rata kanan, angka tabular; nilai panjang turun ke baris berikutnya. |
| `dl.kv-list` | Kotak sendiri: isian tenang, radius besar, padding samping 16 px, baris 48 px, nilai semibold. |
| `.kv-list--base` | Kotak putih dengan ring tipis, untuk dipakai di atas isian tenang. |
| `.kv-list--stack` | Label di atas, nilai di bawah, rata kiri: untuk nilai panjang (judul, nama resmi, tanggal dalam kata). |

## Markup

**Di kotak sendiri.** Kotak isian tenang dengan nilai tegas yang rata kanan.
```html
<dl class="kv-list" style="max-width: 420px;">
  <div class="kv"><dt>Retribusi izin</dt><dd>Rp 420.000</dd></div>
  <div class="kv"><dt>Jatuh tempo</dt><dd>28 Nov 2026</dd></div>
  <div class="kv"><dt>Cara bayar</dt><dd>Virtual account</dd></div>
  <div class="kv"><dt>Status</dt><dd><span class="badge badge--warning">Belum dibayar</span></dd></div>
</dl>
```

**Di dalam kartu.** Baris `.kv` polos di bawah judul kartu; garis tipisnya selebar kartu.
```html
<div class="card" style="max-width: 380px; width: 100%;">
  <div class="card__title">Kursi ujian</div>
  <div class="card__sub">Seleksi calon aparatur sipil negara</div>
  <dl style="margin-top: 12px;">
    <div class="kv"><dt>Tanggal</dt><dd>Sab 5 Des, 08.00</dd></div>
    <div class="kv"><dt>Ruang</dt><dd>B 2.14</dd></div>
    <div class="kv"><dt>Kursi</dt><dd>27</dd></div>
  </dl>
</div>
```

**Di atas isian tenang, dan bertumpuk untuk nilai panjang.** `--base` membuat kotak putih di panel berisi isian; `--stack` menaruh nilai panjang di bawah labelnya.
```html
<dl class="kv-list kv-list--base kv-list--stack" style="max-width: 420px; width: 100%;">
  <div class="kv"><dt>Nama usaha</dt><dd>Usaha Keripik Pisang Ibu Sumarni, Kelurahan Way Halim Permai</dd></div>
  <div class="kv"><dt>Pendamping</dt><dd>Ayu Rahmawati, petugas pendamping UMKM Kecamatan Kedaton</dd></div>
  <div class="kv"><dt>Tanggal verifikasi</dt><dd>Kamis, 10 Desember 2026</dd></div>
</dl>
```

## Varian dan ukuran
| Kelas atau atribut | Kapan |
|---|---|
| `kv` | Baris polos, tanpa kotak. Di dalam kartu, dialog, dan baris daftar. |
| `kv-list` | Kotak berisi isian sendiri; nilai semibold. |
| `kv-list--base` | Putih dengan ring, untuk permukaan berisi isian. |
| `kv-list--stack` | Label di atas nilai, rata kiri, untuk nilai panjang. |

## Status
| Status | Caranya |
|---|---|
| `missing value` | Tulis "Belum diisi" di nilai, jangan dibiarkan kosong atau diisi tanda pisah. |
| `loading` | Bilah [skeleton](skeleton.md) di setiap `dd`, labelnya sudah tampil. |

## Gerak dan mikrointeraksi
- Tidak ada saat diam. Bila nilai berubah di tempat, pakai [text morph](text-morph.md) untuk kata atau [rolling number](rolling-number.md) untuk angka.

## Aksesibilitas
- Pakai `<dl>` dengan `<div class="kv"><dt>…</dt><dd>…</dd></div>`: pembaca layar memasangkan setiap istilah dengan nilainya.
- Buat label singkat dan spesifik ("Jatuh tempo", bukan "Tanggal 2").
- Nilai yang berupa state memakai kata (sebuah [badge](badge.md)), bukan hanya warna.

## Lakukan
- Urutkan baris menurut apa yang pertama kali diperiksa orang.
- Pakai `--stack` begitu nilai turun menjadi dua baris.
- Format angka dan tanggal dengan cara yang sama di seluruh produk.

## Hindari
- Membuat baris label dan nilai dari tabel atau dari dua kolom `div`.
- Menaruh aksi di dalam nilai; taruh satu aksi di bawah kotaknya.
- Mencampur baris bertumpuk dan berdampingan dalam satu kotak.

## Terkait
[Stat row](stat-row.md) · [Table](table.md) · [Card](card.md) · [List](list.md)
