# Target bar

Kelompok: Grafik. https://lampung.kartadinata.app/docs/components/target-bar

Batang horizontal untuk kemajuan menuju target: isian menunjukkan posisi sekarang, penanda menunjukkan posisi yang seharusnya (target, atau laju hari ini), dan tint opsional di depan isian menunjukkan prakiraan. Kata-kata di atasnya menyebut nilai terhadap target.

## Pakai saat
- Angka yang diukur terhadap target: penerimaan pajak terhadap target triwulan, peserta terhadap kuota yang direncanakan, dosis vaksin terhadap rencana mingguan.
- Membandingkan laju nyata dan laju yang diharapkan: penanda berada di posisi yang seharusnya hari ini, jadi ketertinggalan terlihat sebelum tenggat.
- Daftar pendek target yang berdampingan (satu per puskesmas, per tim, per bulan).

## Pakai yang lain saat
- Tugas yang berjalan menuju selesai (unggah, impor): pakai [Progress bar](progress-bar.md).
- Jumlah terhadap batas mutlak (penyimpanan, kursi): pakai [Meter](meter.md).
- Skor di ruang persegi: pakai [Progress ring](progress-ring.md).
- Membandingkan banyak kategori satu sama lain: pakai [Ranked bars](ranked-bars.md).
- Bagian dari satu keseluruhan: pakai [Percentage bar](percentage-bar.md).

## Letaknya
Di [kartu grafik](chart-card.md) atau [KPI card](kpi-card.md) di bawah angkanya; beberapa sekaligus di `.target-list`, berjarak 20 px. Selebar wadahnya; kata-kata turun ke atas batang di ponsel.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.target` | Wajib. Mengatur `--v` (isian, persen dari track), `--t` (penanda), dan `--f` opsional (prakiraan). |
| `.target__meta` | Wajib. `.target__label` dan `.target__val` ("**Rp 84,3 M** dari Rp 100 M"). |
| `.target__track` | Wajib. Track 12 px, `role="img"` dengan nilai-nilainya dalam kata. |
| `.target__fill` | Wajib. Nilai nyata, dengan warna aksen; `.target--success` setelah target tercapai, `.target--warning` saat tertinggal dari laju. |
| `.target__forecast` | Opsional. Nilai akhir yang diproyeksikan sebagai tint di belakang isian. |
| `.target__mark` | Wajib. Penanda 2 px yang melintasi track, dengan `.target__mark-label` di atasnya. `.is-end` meratakan label ke kanan saat penanda dekat ujung. |
| `.target__foot` | Opsional. Sisa hari, laju dalam kata. |

## Markup

**Target triwulan dengan prakiraan.** Isian adalah penerimaan sejauh ini, tint adalah posisi akhir triwulan menurut tren, penanda adalah targetnya. Isian tumbuh saat pertama terlihat.
```html
<section class="chart-card" style="max-width: 520px;" data-lds-grow aria-labelledby="tb-q">
  <div><div class="chart-card__q" id="tb-q">Apakah target triwulan IV tercapai?</div><div class="chart-card__sub">Penerimaan pajak daerah sejak 1 Oktober</div></div>
  <div class="target" style="--v: 84.3%; --t: 100%; --f: 97%;">
    <div class="target__meta"><span class="target__label">Pajak daerah</span><span class="target__val"><b>Rp 84,3 M</b> dari Rp 100 M</span></div>
    <div class="target__track" role="img" aria-label="Pajak daerah: Rp 84,3 M dari Rp 100 M, target ditandai di 100 persen, prakiraan 97 persen"><span class="target__forecast"></span><span class="target__fill"></span><span class="target__mark is-end"><span class="target__mark-label">Target</span></span></div>
    <div class="target__foot"><span>Prakiraan Rp 97 M pada 31 Des</span><span>45 hari lagi</span></div>
  </div>
</section>
```

**Penanda di laju hari ini.** Penanda setiap target berada di posisi yang seharusnya dicapai tim hari ini. Jika tertinggal, isian berubah menjadi peringatan, dan kata-katanya menyebutkannya.
```html
<section class="chart-card" style="max-width: 520px;" aria-labelledby="tb-pace">
  <div><div class="chart-card__q" id="tb-pace">Puskesmas mana yang sesuai rencana?</div><div class="chart-card__sub">Dosis vaksin yang diberikan minggu ini terhadap rencana tiap puskesmas</div></div>
  <div class="target-list" data-lds-grow>
  <div class="target target--success" style="--v: 87.5%; --t: 62%;">
    <div class="target__meta"><span class="target__label">Puskesmas Kedaton</span><span class="target__val"><b>175</b> dari 200 dosis</span></div>
    <div class="target__track" role="img" aria-label="Puskesmas Kedaton: 175 dari 200 dosis, target ditandai di 62 persen"><span class="target__fill"></span><span class="target__mark"><span class="target__mark-label">Hari ini</span></span></div>
    <div class="target__foot"><span>Di depan rencana</span></div>
  </div>
  <div class="target target--warning" style="--v: 33%; --t: 62%;">
    <div class="target__meta"><span class="target__label">Puskesmas Panjang</span><span class="target__val"><b>60</b> dari 180 dosis</span></div>
    <div class="target__track" role="img" aria-label="Puskesmas Panjang: 60 dari 180 dosis, target ditandai di 62 persen"><span class="target__fill"></span><span class="target__mark"><span class="target__mark-label">Hari ini</span></span></div>
    <div class="target__foot"><span>52 dosis di belakang rencana</span></div>
  </div>
  <div class="target" style="--v: 60%; --t: 62%;">
    <div class="target__meta"><span class="target__label">Puskesmas Way Halim</span><span class="target__val"><b>90</b> dari 150 dosis</span></div>
    <div class="target__track" role="img" aria-label="Puskesmas Way Halim: 90 dari 150 dosis, target ditandai di 62 persen"><span class="target__fill"></span><span class="target__mark"><span class="target__mark-label">Hari ini</span></span></div>
    <div class="target__foot"><span>Sesuai rencana</span></div>
  </div>
  </div>
</section>
```

## Varian dan ukuran
| Kelas atau atribut | Kapan |
|---|---|
| `--v, --t, --f` | Posisi isian, penanda, dan prakiraan sebagai persen dari track. |
| `.target--success` | Target tercapai atau di depan laju. |
| `.target--warning` | Tertinggal dari laju; sebutkan seberapa jauh di footer. |
| `.target__mark.is-end` | Label penanda rata ke tepi kanannya (target di 90 % atau lebih). |

## Status
| Status | Caranya |
|---|---|
| `over the goal` | Batasi `--v` di 100 %, ganti ke `.target--success`, dan sebutkan kelebihannya dengan kata ("lebih Rp 4,2 M"). |
| `no forecast yet` | Hilangkan `.target__forecast` dan sebutkan alasannya di footer ("Prakiraan setelah minggu ke-2"). |
| `loading` | Satu baris `.skel` untuk teks dan strip `.skel` 12 px untuk track. |

## Gerak dan mikrointeraksi
- Isian, prakiraan, dan penanda bergerak selama `--d-considered` (480 ms) dengan `--ease-inout` saat nilai berubah, dari posisinya.
- Saat pertama terlihat (`data-lds-grow`): isian tumbuh dari nol dengan transisi yang sama; penanda tetap di tempatnya.
- Reduced motion: nilai berganti dalam 120 ms.

## Aksesibilitas
- Track memakai `role="img"` dengan nilai, target, dan prakiraan dalam kata; baris meta mengulang nilainya sebagai teks.
- Di depan atau tertinggal disebut di footer, tidak pernah hanya lewat warna isian.
- Label penanda adalah teks asli, 12 px, dengan digit tabular.

## Lakukan
- Sebutkan targetnya di meta ("dari Rp 100 M") dan arti penandanya ("Target", "Hari ini").
- Pakai penanda laju untuk target yang punya tenggat.

## Hindari
- Memakai target bar untuk sesuatu tanpa target; itu [ranked bar](ranked-bars.md) atau [meter](meter.md).
- Menumpuk lebih dari satu isian dan satu prakiraan dalam satu track.
- Mewarnai isian merah karena tertinggal; peringatan sudah cukup, kata-kata membawa sisanya.

## Perilaku (HTML biasa)
Opsional: `data-lds-grow` pada batang atau daftarnya memutar animasi masuk saat pertama terlihat.

## Terkait
[Progress bar](progress-bar.md) · [Meter](meter.md) · [KPI card](kpi-card.md) · [Ranked bars](ranked-bars.md)
