# Route schematic

Kelompok: Tampilan data. https://lampung.kartadinata.app/docs/components/route-schematic

Pemberhentian satu perjalanan di sebuah garis: bagian yang sudah ditempuh berwarna aksen, kendaraan di posisinya sekarang, dan tempat serta waktu di bawah setiap pemberhentian. Diagram, bukan peta, sehingga tetap jujur dan terbaca di lebar berapa pun.

## Pakai saat
- Melacak satu kiriman, pengantaran, atau perjalanan melewati beberapa pemberhentian yang diketahui: gudang, posko, pelabuhan, penerima.
- Detail perpindahan atau pemesanan dengan transit: dari mana berangkat, di mana sekarang, apa berikutnya.
- Rute yang perlu dilihat sekilas di samping detailnya, ketika peta jalan hanya menambah gangguan dan waktu muat.

## Pakai yang lain saat
- Riwayat satu catatan dengan waktu dan orang, bukan tempat: pakai [Timeline](timeline.md).
- Urutan langkah tetap dalam formulir: pakai [Steps](steps.md).
- Seberapa jauh sebuah nilai menuju target: pakai [Target bar](target-bar.md).

## Letaknya
Di atas detail kiriman atau perjalanan, selebar kolomnya. Dua sampai enam pemberhentian. Di bawah sekitar 104 px per pemberhentian berubah menjadi vertikal, pemberhentian tersusun ke bawah di kiri dengan keterangannya di samping.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.route[data-lds-route]` | Wajib. Kotak berisi isian; `drawRoute` (atau hook-nya) mengisinya dari sebuah config. `role="group"` yang dinamai oleh `label`. |
| `svg.route__svg` | Dibuat otomatis, disembunyikan dari teknologi bantu. `.route__track` (titik-titik, seluruh jalur), `.route__done` (aksen, bagian yang sudah ditempuh), `.route__dot` per pemberhentian (`.is-done`, `.is-next`). |
| `ol.route__stops > li.route__stop` | Dibuat otomatis. Satu per pemberhentian: `.route__name` dan `.route__sub` (waktu, kode, status), ditambah state dalam kata untuk pembaca layar. |
| `.route__vehicle` | Dibuat otomatis selama perjalanan berlangsung. Cakram ber-ring dengan ikon moda di ruas yang sedang ditempuh; penerbangan berbelok mengikuti lengkungnya. |

## Markup

**Penerbangan yang sedang berjalan.** Kiriman vaksin lewat udara dari Jakarta ke Bandara Radin Inten II, 65 % perjalanan. Lengkungnya tergambar sekali, lalu pesawat mengendap di atasnya, menghadap sepanjang kurva.
```html
<div class="route" style="max-width: 560px;" data-lds-route='{"label":"Kiriman vaksin lewat udara dari Jakarta ke Radin Inten II, 65 persen perjalanan, mendarat pukul 08.45.","mode":"flight","position":0.65,"stops":[{"name":"Jakarta CGK","sub":"Berangkat 08.00"},{"name":"Radin Inten II TKG","sub":"Mendarat 08.45"}]}'></div>
```

**Perjalanan darat dengan pemberhentian.** Truk bantuan BPBD dengan empat pemberhentian. Pemberhentian yang sudah dilewati terisi, yang berikutnya ditandai aksen, dan keterangan di bawah masing-masing menyebut waktunya.
```html
<div class="route" style="max-width: 640px;" data-lds-route='{"label":"Truk bantuan BPBD dari Bandar Lampung ke Kota Agung, sudah melewati Pringsewu, pemberhentian berikutnya Gisting.","mode":"road","position":1.4,"stops":[{"name":"Gudang BPBD, Bandar Lampung","sub":"Dimuat 15 Nov, 21.00"},{"name":"Pringsewu","sub":"Dilewati 15 Nov, 22.40"},{"name":"Gisting","sub":"Perkiraan 23.50"},{"name":"Kota Agung","sub":"Perkiraan 16 Nov, 00.45"}]}'></div>
```

**Sempit: vertikal.** Di kolom sempit rute yang sama berjalan ke bawah di kiri, sehingga nama tempat yang panjang tidak pernah terjepit. Rute yang sudah tiba tidak punya kendaraan; semua pemberhentian terisi.
```html
<div class="route" data-lds-route='{"label":"Kapal logistik dari Pelabuhan Panjang ke Pulau Legundi, sudah tiba.","mode":"sea","position":2,"stops":[{"name":"Pelabuhan Panjang, Bandar Lampung","sub":"Berlayar 13 Nov, 06.00"},{"name":"Pulau Pahawang","sub":"Dilewati 13 Nov, 08.20"},{"name":"Pulau Legundi, Pesawaran","sub":"Tiba 13 Nov, 10.15"}]}'></div>

<script type="module">
  import { drawRoute } from 'lampung-design-system/js';
  // the truck reported a new position: the travelled part and the vehicle move there
  drawRoute(el, { ...config, position: 1.8 });
</script>
```

## Varian dan ukuran
| Kelas atau atribut | Kapan |
|---|---|
| `mode: "flight"` | Setiap ruas berupa lengkung dan pesawat berbelok mengikutinya. |
| `mode: "road" | "sea" | "rail"` | Ruas lurus; ikon truk, kapal, atau rute. |
| `position` | Posisi kendaraan, dihitung dalam pemberhentian dari 0 (1,4 berarti 40 % dari pemberhentian kedua ke ketiga). Indeks terakhir berarti sudah tiba: tanpa kendaraan. |
| `.is-vertical` | Dipasang skrip bila satu pemberhentian mendapat kurang dari sekitar 104 px; pemberhentian tersusun ke bawah di kiri. |

## Status
| Status | Caranya |
|---|---|
| `under way` | Titik yang sudah dilewati terisi, titik berikutnya diberi ring aksen dan namanya bertinta aksen, kendaraan di ruas yang sedang ditempuh. |
| `arrived` | Semua titik terisi, tanpa kendaraan, pemberhentian terakhir menyebut kapan tiba. |
| `delayed or on hold` | Sebutkan di keterangan pemberhentian ("Ditahan di bea cukai sejak 14.20") dan dengan badge di samping rute; skema tetap memakai warnanya. |
| `loading` | Blok `.skel` setinggi yang sama di kotak isian. |

## Gerak dan mikrointeraksi
- Tampilan pertama: ruas yang sudah ditempuh tergambar satu per satu selama sekitar 1,1 dtk secara total, lalu kendaraan muncul memudar dan mengendap dari 0,6 dengan `--spring-smooth`. Titik terisi saat garis mencapainya.
- Memanggil `drawRoute` lagi (kiriman lain, posisi baru) menggambar ulang bagian yang sudah ditempuh dari awal.
- Mengubah ukuran menyusun ulang pemberhentian seketika, tanpa animasi.
- Reduced motion: langsung tergambar, kendaraan begitu saja muncul.

## Aksesibilitas
- Kotaknya adalah grup yang dinamai oleh `label`, yang sebaiknya menyebut perjalanan dan posisinya dalam satu kalimat.
- Pemberhentian adalah daftar berurutan asli; setiap butir diakhiri state-nya dalam kata (Sudah dilewati, Pemberhentian berikutnya, Di depan, Sudah tiba).
- Gambar dan kendaraan diberi `aria-hidden`; tidak ada yang hanya ada di gambar.

## Lakukan
- Tulis waktu atau status di bawah setiap pemberhentian.
- Batasi pada pemberhentian yang penting bagi orang; dua sampai enam.
- Pasangkan dengan [timeline](timeline.md) bila peristiwa di antara pemberhentian penting.

## Hindari
- Menggambar garis pantai, negara, atau jalan di sekitarnya; ini skema.
- Mengulang gerak kendaraan di sepanjang garis; kendaraan berdiri di posisi perjalanannya.
- Mewarnai pemberhentian hanya menurut status; kata-katanya yang membawa arti.

## Perilaku (HTML biasa)
`data-lds-route` dengan config JSON digambar oleh `init()`. Dari kode: `drawRoute(el, { label, mode, position, stops: [{ name, sub }] })` mengembalikan `{ config, update(next) }`; skema digambar ulang saat ukuran berubah.

## Terkait
[Timeline](timeline.md) · [Steps](steps.md) · [Key-value](key-value.md) · [Status dot](status-dot.md)
