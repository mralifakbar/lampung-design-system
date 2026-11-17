# Device frame

Kelompok: Pola halaman. https://lampung.kartadinata.app/docs/components/device-frame

Badan ponsel di sekitar layar `.phone`: bezel membulat, tombol samping, pulau kamera, dan status bar, diskalakan agar muat di halaman. Di ponsel sungguhan, layar yang sama melepas badannya dan mengisi tampilan dengan `.device--bleed`.

## Pakai saat
- Menampilkan aplikasi ponsel di dalam halaman lebar: tur produk, halaman contoh, tinjauan desain, pengenalan aplikasi seluler.
- Pratinjau yang layarnya mendorong, menarik, dan mundur seperti aplikasi terpasang, dengan bezel yang memberi tahu bahwa ini ponsel.
- Pratinjau yang sama di ponsel, saat bingkai harus hilang dan aplikasi mengisi layar.

## Pakai yang lain saat
- Layar kecil berbingkai di samping teks dokumentasi: pakai [Phone screen](phone-screen.md). Pakai `.phone.phone--inline` tanpa badan.
- Aplikasi web responsif yang berjalan di ponsel dan desktop: pakai [App shell](app-shell.md).
- Tangkapan layar atau foto perangkat: pakai [Thumbnail](thumbnail.md).

## Letaknya
Di tengah kolomnya sendiri, tanpa apa pun yang menumpuk. Beri kolom lebar yang pasti (misalnya track grid 414 px): bingkai diskalakan ke lebar itu dan ke tinggi jendela, tidak pernah melebihi ukuran aslinya. Di bawah 600 px tambahkan `.device--bleed` dan biarkan mengisi viewport di bawah app bar kecil.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.device[data-lds-device]` | Wajib. Badan 414 kali 868 dengan bezel 12 px dan tombol samping. `data-lds-device` menskalakannya dengan CSS zoom agar muat; `data-fit-margin` (bawaan 48) adalah ruang vertikal yang disisakan. |
| `.phone` | Wajib. Layar 390 kali 844 di dalamnya, dipotong dengan radius 48 px. |
| `.phone__content` | Konten layar sebagai satu lapisan: nav bar, area gulir, dan tab bar. Selama sheet terbuka, lapisan ini mundur seperti kartu. Sheet, scrim, dan toaster tetap di luarnya. |
| `.device__status` | Status bar: jam, `.device__signal` (empat `<i>`), ikon `wifi`, dan `.device__battery` (`--level` 0 sampai 1). `aria-hidden`. |
| `.device__island` | Pulau kamera. `aria-hidden`. |
| `.home-ind` | Home indicator di bagian bawah. |
| `[data-lds-push="id id"]` | Pada `.phone`: id sheet yang mendorong konten mundur selama terbuka (dipisah spasi). |

## Markup

**Layar dalam bingkainya.** Bingkai menyesuaikan kolom ini. Buka sheet: konten mundur, status bar menjadi terang di atas latar gelap, dan sheet bisa diseret pergi.
```html
<div class="device" data-lds-device>
  <div class="phone" data-lds-push="attendance">
    <div class="phone__content">…nav bar, scroller, tab bar…</div>
    <div class="scrim" data-lds-scrim="attendance"></div>
    <div class="sheet" id="attendance" role="dialog" aria-modal="true" data-lds-layer>…</div>
    <div class="device__status" aria-hidden="true">
      <span>9.41</span>
      <span class="device__status-end"><span class="device__signal"><i></i><i></i><i></i><i></i></span><span class="ic">wifi</span><span class="device__battery" style="--level: 0.76;"></span></span>
    </div>
    <span class="device__island" aria-hidden="true"></span>
    <span class="home-ind" aria-hidden="true"></span>
  </div>
</div>
```

**Penuh layar di ponsel.** Ubah kelasnya di layar kecil. Badan, pulau kamera, dan status bar hilang; bar-bar memberi padding sendiri sesuai safe area.
```html
<div class="codeblock" style="width: 100%;"><div class="codeblock__bar"><span>preview.js</span></div><pre><code>const device = document.querySelector('[data-lds-device]');
const small = matchMedia('(max-width: 599px)');
const fit = () =&gt; { device.classList.toggle('device--bleed', small.matches); fitDevice(device); };
small.addEventListener('change', fit); fit();</code></pre></div>
```

## Varian dan ukuran
| Kelas atau atribut | Kapan |
|---|---|
| `.device` | Badan penuh, diskalakan agar muat dengan `data-lds-device`. |
| `.device.device--bleed` | Tanpa badan: layar mengisi kontainernya, `--phone-top` dan `--phone-bottom` berasal dari `env(safe-area-inset-*)`. |

## Status
| Status | Caranya |
|---|---|
| `.phone.is-pushed` | Sheet yang terdaftar sedang terbuka: `.phone__content` mengecil ke 0,92 di bawah status bar, sudutnya membulat, dan meredup; latar menjadi hitam dan status bar terang. |

## Gerak dan mikrointeraksi
- Mundur: `.phone__content` mengecil dan membulat dengan `--spring-smooth` selama `--d-smooth`, kecerahan berubah dengan `--ease-standard`. Menutup sheet membaliknya dari posisinya.
- Penskalaan agar muat tidak dianimasikan: langsung mengikuti ukuran jendela.
- Reduced motion: konten tetap di tempat dan hanya meredup, selama 120 ms.

## Aksesibilitas
- Status bar, pulau kamera, dan home indicator adalah dekorasi: `aria-hidden="true"`.
- Taruh bingkai di landmark bernama (misalnya `<main aria-label="Pratinjau ponsel">`) agar orang bisa melompat ke sana.
- Bingkai ditampilkan dengan CSS zoom, sehingga teks di dalamnya tetap berukuran asli relatif terhadap layar dan tetap tajam; jangan pernah mengecilkannya di bawah sekitar setengah ukuran, saat teks isi turun di bawah 8 px.

## Lakukan
- Beri kolom lebar tetap agar bingkai punya acuan untuk menyesuaikan diri.
- Ganti ke `.device--bleed` di ponsel alih-alih menampilkan ponsel di dalam ponsel.
- Taruh sheet, scrim, dan toaster di luar `.phone__content` agar tidak ikut mundur.

## Hindari
- Menaruh konten sungguhan di status bar; itu hanya gambaran.
- Menambah bayangan kedua atau latar berwarna di belakang bingkai.
- Memakainya untuk tangkapan layar; pakai [thumbnail](thumbnail.md).

## Perilaku (HTML biasa)
`data-lds-device` pada `.device` mengatur `--device-scale` (CSS zoom) dari lebar induk dan tinggi jendela dikurangi `data-fit-margin`, saat dimuat dan saat ukuran berubah. `fitDevice(el)` menjalankannya secara manual setelah layout berubah. `data-lds-push` menerima beberapa id sheet dipisah spasi. Seretan di dalam bingkai (sheet, baris geser, slide to confirm, navigation stack) dibagi dengan zoom agar tetap di bawah jari.

## Terkait
[Phone screen](phone-screen.md) · [Phone bars](phone-bars.md) · [Navigation stack](nav-stack.md) · [Sheet](sheet.md)
