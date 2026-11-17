# Masthead

Kelompok: Navigasi (baru). https://lampung.kartadinata.app/docs/components/masthead

Strip tipis di atas semua elemen pada situs layanan publik yang memberi tahu orang apakah situs itu resmi, dan cara memastikannya. Situs yang dibangun dengan sistem ini dan tidak dikelola pemerintah memakai varian tidak resmi.

## Pakai saat
- Setiap halaman situs atau aplikasi layanan publik, sebagai elemen pertama di `<body>`, sebelum header.
- Situs komunitas, kampanye, atau demo yang bisa dikira layanan pemerintah: katakan dengan jelas bahwa bukan.

## Pakai yang lain saat
- Pesan tentang halaman atau akun ini (pemeliharaan, tenggat): pakai [Banner](banner.md).
- Status di dalam konten: pakai [Alert](alert.md).
- Navigasi situs itu sendiri: pakai [Top nav](top-nav.md).

## Letaknya
Selebar layar di paling atas, di atas header, di setiap halaman. Tidak menempel saat halaman digulir. Di ponsel, tombol berpindah ke bawah kalimat.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.masthead` | Wajib. `<div role="region">` dengan `aria-label` seperti "Status situs". Tambahkan `masthead--official` hanya untuk situs yang benar-benar dikelola instansi. |
| `.masthead__bar` | Wajib. Tanda, kalimat, dan tombol dalam satu baris. |
| `.masthead__mark` | Chip ikon kecil: emas untuk tidak resmi, hijau untuk resmi. |
| `.masthead__toggle` | `<button>` dengan `data-lds-masthead`, `aria-expanded`, dan `aria-controls` yang menunjuk panel. |
| `.collapse > div > .masthead__body` | Penjelasan: siapa pengelola situs dan cara mengenali layanan resmi. |

## Markup

**Situs tidak resmi.** Yang ditampilkan setiap demo dan situs komunitas LDS. Panel menjelaskan siapa pengelolanya dan di mana layanan resmi berada.
```html
<div class="masthead" role="region" aria-label="Status situs">
  <div class="masthead__bar">
    <span class="masthead__mark" aria-hidden="true"><span class="ic">info</span></span>
    <span class="masthead__text">Proyek komunitas. Ini bukan situs resmi pemerintah.</span>
    <button class="masthead__toggle" data-lds-masthead aria-expanded="false" aria-controls="mh-1">Cara memastikan<span class="ic" aria-hidden="true">expand_more</span></button>
  </div>
  <div class="collapse is-closed" id="mh-1" inert><div><div class="masthead__body">
    <p class="masthead__item"><span class="ic" aria-hidden="true">groups</span><span><b>Dikelola sukarelawan.</b> Dibangun dan dirawat komunitas open source, bukan oleh instansi mana pun.</span></p>
    <p class="masthead__item"><span class="ic" aria-hidden="true">verified_user</span><span><b>Layanan resmi memakai go.id.</b> Situs pemerintah Indonesia berakhiran .go.id. Jangan masukkan NIK di situs yang Anda ragukan.</span></p>
  </div></div></div>
</div>
```

**Situs resmi.** Hanya untuk situs yang dikelola instansi sendiri. Kalimatnya menyebut domain yang bisa diperiksa orang.
```html
<div class="masthead masthead--official" role="region" aria-label="Status situs">
  <div class="masthead__bar">
    <span class="masthead__mark" aria-hidden="true"><span class="ic">verified_user</span></span>
    <span class="masthead__text">Situs resmi Pemerintah Kota Contoh.</span>
    <button class="masthead__toggle" data-lds-masthead aria-expanded="false" aria-controls="mh-2">Cara memastikan<span class="ic" aria-hidden="true">expand_more</span></button>
  </div>
  <div class="collapse is-closed" id="mh-2" inert><div><div class="masthead__body">
    <p class="masthead__item"><span class="ic" aria-hidden="true">language</span><span><b>Situs resmi memakai go.id.</b> Pastikan alamatnya berakhiran .go.id sebelum Anda masuk.</span></p>
    <p class="masthead__item"><span class="ic" aria-hidden="true">lock</span><span><b>Situs aman memakai https.</b> Ikon gembok di bilah alamat berarti koneksi terenkripsi.</span></p>
  </div></div></div>
</div>
```

## Varian dan ukuran
| Kelas atau atribut | Kapan |
|---|---|
| `masthead` | Tidak resmi (bawaan): tanda emas, untuk situs komunitas dan demo. |
| `masthead--official` | Tanda hijau, hanya untuk situs yang dikelola instansi. |
| `--masthead-max` | Isi dengan lebar kontainer halaman (misalnya `1200px`) agar sejajar dengan header. |

## Status
| Status | Caranya |
|---|---|
| `tertutup` | Bawaan. Panel terlipat dan `inert`. |
| `terbuka` | `aria-expanded="true"`; chevron berputar dan panel terbuka. |

## Gerak dan mikrointeraksi
- Panel terbuka dengan `.collapse` pada `--spring-smooth` (560 ms) dan muncul pada `--ease-standard`; menutup berbalik dari posisi saat itu.
- Chevron berputar 180 derajat pada `--spring-snappy`. Reduced motion: tanpa putaran, panel tetap terbuka.

## Aksesibilitas
- Landmark `region` dengan `aria-label` singkat, agar pengguna pembaca layar bisa menemukan dan melewatinya.
- Tombolnya `<button>` asli dengan `aria-expanded` dan `aria-controls`; area sentuhnya diperluas hingga 44 px di sekitar chip 28 px.
- Teks `--text-subtle` di atas `--bg-fill` (di atas 5:1 pada kedua tema).

## Lakukan
- Pasang di setiap halaman, paling awal di body.
- Sebutkan dengan jelas siapa pengelola situs.
- Tunjukkan cara mengenali layanan resmi (.go.id).

## Hindari
- Memakai varian resmi pada situs yang tidak dikelola instansi.
- Menambahkan lambang daerah atau logo instansi.
- Membuatnya menempel atau bisa ditutup: ini fakta tentang situs, bukan pesan.

## Perilaku (HTML biasa)
`init()` mengikat `[data-lds-masthead]`: klik mengubah `aria-expanded`, kelas `is-closed`, dan `inert` pada panel yang disebut `aria-controls`.

## Terkait
[Banner](banner.md) · [Top nav](top-nav.md) · [Site footer](site-footer.md) · [Alert](alert.md)
