# Lanes

Kelompok: Tampilan data. https://lampung.kartadinata.app/docs/components/lanes

Siapa sibuk kapan: satu baris per orang, ruangan, atau sumber daya, waktu berjalan mendatar, dan blok yang diletakkan menurut awal dan panjangnya. Pertanyaan yang dijawab adalah "siapa yang kosong, dan kapan", jadi celahnya sama penting dengan bloknya.

## Pakai saat
- Jadwal tempat orang memesan atau merencanakan di sekitar waktu orang lain: jam praktik dokter hari ini, pendamping, sif petugas.
- Cuti tim selama satu sampai empat minggu, beserta pengajuan yang belum disetujui.
- Ruangan, tempat tidur, atau kendaraan yang dipesan per jam atau per hari.

## Pakai yang lain saat
- Acara satu orang atau satu tim per bulan, minggu, atau agenda: pakai [Event calendar](event-calendar.md).
- Pekerjaan yang bergerak melewati tahap: pakai [Kanban](kanban.md).
- Riwayat satu catatan: pakai [Timeline](timeline.md).
- Aktivitas per hari selama berbulan-bulan, sebagai intensitas: pakai [Heatmap](heatmap.md).

## Letaknya
Selebar kolom isi, atau minimal delapan dari dua belas kolom: waktu butuh ruang. Di ponsel kotaknya bergulir ke samping dengan kolom nama tetap; kolom nama menyempit dan melepas avatar di bawah 560 px lebar kotak. Taruh legenda di bawahnya bila blok memakai lebih dari satu tone.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.lanes-box` | Wajib. Kotak gulir: putih, ring, radius besar. Beri `tabindex="0"`, `role="region"`, dan `aria-label` yang menyebut rentang waktunya, agar pengguna keyboard bisa menggulirnya. |
| `.lanes` | Wajib. Grid-nya. `--cols` jumlah kolom waktu, `--col-min` lebar tersempit kolom sebelum kotaknya bergulir (56 px), `--who` kolom nama (200 px), `--row-h` tinggi baris (56 px). |
| `.lanes__head > .lanes__corner + .lanes__ticks > .lanes__tick` | Wajib. Apa isi barisnya, lalu satu tanda per kolom: jam, atau nama hari dengan tanggal di `b`. `.is-today` dengan aksen, `.is-off` dengan isian tenang untuk akhir pekan dan jam tutup. |
| `.lanes__row > .lanes__who` | Wajib. Nama, menempel di kiri: `.avatar` opsional dan `.lanes__id` berisi `.lanes__name` dan `.lanes__sub`. `button.lanes__who` membuka detail orangnya. |
| `.lanes__track` | Wajib. Baris waktu dengan garis tipis per kolom. Berisi blok `.lanes__off` dan `.lanes__item`. |
| `.lanes__item` | Blok di `--from` (jumlah kolom dari awal, pecahan boleh) selama `--span` kolom, dengan judul `span` dan baris `small` opsional. Berupa `button` bila membuka sesuatu. |
| `.lanes__off` | Waktu yang tidak dihitung (akhir pekan, tutup): isian tenang di belakang blok, diletakkan seperti butir. |
| `.lanes--now + --now` | Garis waktu sekarang di setiap baris, pada `--now` kolom, digambar di belakang blok. |

## Markup

**Siapa yang kosong hari ini.** Dokter per jam, dengan garis di waktu sekarang. Waktu kosong berupa blok tenang bergaris putus yang bisa dipesan saat ditekan; jadwal yang ditahan dan belum pasti punya tepi putus-putus dengan tone-nya; istirahat netral. Persempit jendela: kotaknya bergulir dan nama tetap di tempat.
```html
<div class="lanes-box" tabindex="0" role="region" aria-label="Jadwal dokter hari ini, bisa digulir ke samping">
  <div class="lanes lanes--now" style="--cols: 10; --now: 3.33;">
    <div class="lanes__head"><div class="lanes__corner">Dokter</div><div class="lanes__ticks"><span class="lanes__tick">07.00</span><span class="lanes__tick">08.00</span><span class="lanes__tick">09.00</span><span class="lanes__tick">10.00</span><span class="lanes__tick">11.00</span><span class="lanes__tick">12.00</span><span class="lanes__tick">13.00</span><span class="lanes__tick">14.00</span><span class="lanes__tick">15.00</span><span class="lanes__tick">16.00</span></div></div>
    <div class="lanes__row"><div class="lanes__who"><span class="avatar avatar--gray" aria-hidden="true">NP</span><span class="lanes__id"><span class="lanes__name">dr. Nadia Putri</span><span class="lanes__sub">Poli umum</span></span></div><div class="lanes__track"><div class="lanes__item" style="--from: 1; --span: 2;"><span>Posyandu lansia</span><small>Ruang 3</small></div><div class="lanes__item lanes__item--muted" style="--from: 5; --span: 1;"><span>Istirahat</span></div><button class="lanes__item lanes__item--free" type="button" style="--from: 6; --span: 1.5;"><span>Kosong</span><small>Pesan 13.00</small></button><div class="lanes__item lanes__item--3" style="--from: 7.5; --span: 2;"><span>Konsultasi daring</span><small>Telekonsultasi</small></div></div></div>
    <div class="lanes__row"><div class="lanes__who"><span class="avatar avatar--gray" aria-hidden="true">RH</span><span class="lanes__id"><span class="lanes__name">dr. Rizky Hartono</span><span class="lanes__sub">Poli anak</span></span></div><div class="lanes__track"><div class="lanes__item lanes__item--4" style="--from: 0; --span: 3;"><span>Imunisasi</span><small>Ruang B</small></div><button class="lanes__item lanes__item--free" type="button" style="--from: 3.5; --span: 1.5;"><span>Kosong</span><small>Pesan 10.30</small></button><div class="lanes__item lanes__item--muted" style="--from: 5; --span: 1;"><span>Istirahat</span></div><div class="lanes__item lanes__item--2" style="--from: 6; --span: 3;"><span>Rekap rekam medis</span></div></div></div>
    <div class="lanes__row"><div class="lanes__who"><span class="avatar avatar--gray" aria-hidden="true">AL</span><span class="lanes__id"><span class="lanes__name">drg. Ayu Lestari</span><span class="lanes__sub">Poli gigi</span></span></div><div class="lanes__track"><span class="lanes__off" style="--from: 0; --span: 2;"></span><div class="lanes__item" style="--from: 2; --span: 2.5;"><span>Pemeriksaan pasien</span><small>6 pasien</small></div><div class="lanes__item lanes__item--muted" style="--from: 5; --span: 1;"><span>Istirahat</span></div><div class="lanes__item lanes__item--pending" style="--from: 6; --span: 2;"><span>Ditahan: UKGS sekolah</span><small>Belum pasti</small></div></div></div>
  </div>
</div>
```

**Cuti tim.** Dua minggu per hari, hari ini dengan aksen, akhir pekan dengan isian tenang. Cuti yang disetujui terisi menurut jenisnya; pengajuan yang masih menunggu hanya punya tepi putus-putus.
```html
<div class="lanes-box" tabindex="0" role="region" aria-label="Cuti tim, 16 sampai 29 November, bisa digulir ke samping">
  <div class="lanes" style="--cols: 14; --col-min: 44px; --who: 180px;">
    <div class="lanes__head"><div class="lanes__corner">Tim layanan digital</div><div class="lanes__ticks"><span class="lanes__tick is-today">Sen<b>16</b></span><span class="lanes__tick">Sel<b>17</b></span><span class="lanes__tick">Rab<b>18</b></span><span class="lanes__tick">Kam<b>19</b></span><span class="lanes__tick">Jum<b>20</b></span><span class="lanes__tick is-off">Sab<b>21</b></span><span class="lanes__tick is-off">Min<b>22</b></span><span class="lanes__tick">Sen<b>23</b></span><span class="lanes__tick">Sel<b>24</b></span><span class="lanes__tick">Rab<b>25</b></span><span class="lanes__tick">Kam<b>26</b></span><span class="lanes__tick">Jum<b>27</b></span><span class="lanes__tick is-off">Sab<b>28</b></span><span class="lanes__tick is-off">Min<b>29</b></span></div></div>
    <div class="lanes__row"><div class="lanes__who"><span class="avatar avatar--gray" aria-hidden="true">DL</span><span class="lanes__id"><span class="lanes__name">Dewi Lestari</span><span class="lanes__sub">Desainer</span></span></div><div class="lanes__track"><span class="lanes__off" style="--from: 5; --span: 2;"></span><span class="lanes__off" style="--from: 12; --span: 2;"></span><div class="lanes__item" style="--from: 2; --span: 3;"><span>Cuti tahunan</span></div></div></div>
    <div class="lanes__row"><div class="lanes__who"><span class="avatar avatar--gray" aria-hidden="true">GR</span><span class="lanes__id"><span class="lanes__name">Galih Ramadhan</span><span class="lanes__sub">Pengembang</span></span></div><div class="lanes__track"><span class="lanes__off" style="--from: 5; --span: 2;"></span><span class="lanes__off" style="--from: 12; --span: 2;"></span><div class="lanes__item lanes__item--2" style="--from: 0; --span: 1;"><span>Sakit</span></div><div class="lanes__item lanes__item--pending" style="--from: 9; --span: 3;"><span>Diajukan</span><small>Cuti tahunan</small></div></div></div>
    <div class="lanes__row"><div class="lanes__who"><span class="avatar avatar--gray" aria-hidden="true">SH</span><span class="lanes__id"><span class="lanes__name">Sari Handayani</span><span class="lanes__sub">Pengelola layanan</span></span></div><div class="lanes__track"><span class="lanes__off" style="--from: 5; --span: 2;"></span><span class="lanes__off" style="--from: 12; --span: 2;"></span><div class="lanes__item lanes__item--4" style="--from: 7; --span: 5;"><span>Cuti melahirkan</span><small>Sampai 4 Des</small></div></div></div>
  </div>
</div>
<div class="legend" style="margin-top: 12px;"><span><i style="background: var(--series-1);"></i>Cuti tahunan</span><span><i style="background: var(--series-2);"></i>Sakit</span><span><i style="background: var(--series-4);"></i>Cuti melahirkan</span></div>
```

## Varian dan ukuran
| Kelas atau atribut | Kapan |
|---|---|
| `.lanes__item` | Tone seri 1. `--2`, `--3`, `--4` untuk warna seri lain, satu per jenis blok, dengan legenda. |
| `.lanes__item--muted` | Istirahat dan waktu yang diblokir: netral, teks lebih tenang. |
| `.lanes__item--pending` | Belum pasti (pengajuan, jadwal ditahan): tanpa isian, tepi putus-putus dengan tone-nya. |
| `.lanes__item--free` | Waktu terbuka yang bisa dipesan: tepi netral putus-putus dan teks success; diberi tint saat hover. |
| `.lanes--now` | Menampilkan garis waktu sekarang di `--now`. |

## Status
| Status | Caranya |
|---|---|
| `hover (button item)` | Tint menebal menjadi 24 %. |
| `pressed` | Blok mengecil ke 0,97 dan memantul kembali dengan `--spring-snappy`. |
| `focus` | Focus ring 2 px di luar blok, diangkat di atas tetangganya. |
| `.is-new` | Blok yang baru ditambahkan (pengajuan yang disetujui, pemesanan baru) tumbuh dari awalnya sekali. |
| `filtered` | `hidden` pada `.lanes__row` menghapus seluruh baris. |
| `loading` | Pertahankan head; baris skeleton setinggi `--row-h` dengan nama `.skel` dan dua atau tiga blok `.skel`. |
| `empty` | [Empty state](empty-state.md) di bawah head: "Tidak ada yang cuti dalam dua minggu ini". |

## Gerak dan mikrointeraksi
- Blok tombol mengecil ke 0,97 saat ditekan dan kembali dengan `--spring-snappy` (360 ms); tint berubah selama `--d-fast`.
- Blok baru (`.is-new`) tumbuh dari tepi awalnya dengan `--spring-snappy`, sekali, agar mata menemukan yang berubah.
- Tidak ada lagi yang bergerak: grid ini rujukan yang dibaca, bukan pertunjukan. Reduced motion: tanpa skala saat ditekan, tanpa tumbuh.

## Aksesibilitas
- Kotaknya adalah `region` berlabel yang bisa difokus dan menyebut apa dan kapan ("Dokter hari ini, 07.00 sampai 17.00"), sehingga bisa digulir dengan keyboard.
- Setiap blok menyebut waktunya dalam kata bila hanya posisinya yang menunjukkan itu: taruh jam atau tanggal di baris `small`, atau di `aria-label` tombol ("Kosong dari 13.00 sampai 14.30, pesan").
- Tone mengulang kata di blok atau legenda; jangan hanya mengandalkan warna. Pending menyebut "Diajukan" atau "Ditahan" di judulnya.
- Blok interaktif adalah tombol asli dengan focus ring yang terlihat; blok baca-saja adalah elemen biasa.

## Lakukan
- Mulai kolom pada awal hari atau periode bagi pembacanya (07.00, Senin).
- Tampilkan waktu kosong bila pembaca mencarinya, dan buat bisa dipesan.
- Tandai akhir pekan dan jam tutup dengan `.lanes__off`.

## Hindari
- Memakai lebih dari empat tone dalam satu grid.
- Memerasnya di bawah sekitar 480 px tanpa membiarkannya bergulir; blok yang lebih pendek dari satu kolom jam kehilangan katanya.
- Memakainya untuk satu bulan milik satu orang; itu [event calendar](event-calendar.md).

## Terkait
[Event calendar](event-calendar.md) · [Timeline](timeline.md) · [Calendar](calendar.md) · [Kanban](kanban.md)
