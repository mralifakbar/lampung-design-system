# Chart card

Kelompok: Grafik. https://lampung.kartadinata.app/docs/components/chart-card

Bingkai untuk setiap grafik di dasbor: pertanyaan sebagai judul, apa yang diukur di bawahnya, lalu aksi opsional (kontrol periode, menu), angka utama beserta perubahannya, grafik, dan footer berisi waktu data atau tautan ke laporan lengkap.

## Pakai saat
- Grafik apa pun di halaman dasbor atau laporan: kartu memberi grafik sebuah pertanyaan, periode, dan tempat untuk satu angka yang dicari pembaca.
- Pembaca perlu mengganti periode (7 hari, 30 hari, 3 bulan) atau mengekspor data tanpa meninggalkan dasbor.
- Beberapa grafik berada dalam satu grid dan butuh header, jarak, dan footer yang sama agar halaman terbaca sebagai satu sistem.

## Pakai yang lain saat
- Satu metrik dengan perubahannya dan tren mini, dalam deretan empat: pakai [KPI card](kpi-card.md).
- Beberapa angka tanpa grafik: pakai [Stat row](stat-row.md).
- Grafik di dalam artikel atau isi laporan: pakai [Line chart](line-chart.md). Letakkan plot langsung di kolom teks dengan keterangan; kartu di tengah tulisan terlihat seperti iklan.
- Grafik adalah seluruh halaman (laporan lengkap): pakai [Page header](page-header.md). Header halaman memuat judul dan kontrol periode; grafik mengisi kolom.

## Letaknya
Dalam `auto-grid` dengan `--min: 320px` di dasbor, atau selebar halaman untuk deret waktu. Jangan pernah di dalam kartu lain. Header adalah container: di bawah 440 px kontrol periode turun ke bawah judul dan selebar kartu, menu tetap di ujung baris judul.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `section.chart-card` | Wajib. Padding 20 px, radius 18 px, ring `--line`, jarak 14 px antarbagian. `aria-labelledby` menunjuk ke pertanyaan. |
| `.chart-card__head` | Opsional. Baris yang bisa membungkus: judul di awal, aksi di akhir. Size container untuk kontrol periode. |
| `.chart-card__titles` | Berisi `.chart-card__q` (pertanyaan, wajib) dan `.chart-card__sub` (apa yang diukur, pada periode apa). |
| `.chart-card__actions` | Opsional. `.seg.chart-card__range` untuk periode dan menu `.icon-btn`. Paling banyak satu tombol selain menu. |
| `.chart-card__figure` | Opsional. `.chart-card__big` ditambah [trend delta](trend-delta.md) dan pembandingnya. |
| `.chart / .bars / .donut-chart …` | Wajib. Grafiknya sendiri. |
| `.chart-card__foot` | Opsional. Garis tipis, lalu waktu data di awal dan satu tautan biasa ke tampilan lengkap di akhir. |

## Markup

**Kontrol periode, menu, angka, dan footer.** Ganti periodenya: area bertumpuk bergerak dari posisinya sekarang ke data baru, skala berpindah halus ke rentang barunya. Arahkan kursor ke plot (atau fokuskan lalu pakai tombol panah) untuk melihat hari, tiap saluran, dan totalnya. Klik item legenda untuk menyembunyikan satu saluran. Persempit jendela: kontrol periode pindah ke barisnya sendiri.
```html
<section class="chart-card" aria-labelledby="cc-orders-q">
  <div class="chart-card__head">
    <div class="chart-card__titles"><div class="chart-card__q" id="cc-orders-q">Lewat mana warga mengajukan izin usaha?</div><div class="chart-card__sub">Permohonan per hari, situs web dan loket</div></div>
    <div class="chart-card__actions">
      <div class="seg chart-card__range" role="group" aria-label="Periode" data-lds-segmented data-lds-chart-for="cc-orders">
        <span class="seg__thumb"></span>
        <button type="button" class="seg__btn" aria-pressed="false" data-set="7d">7 hari</button>
        <button type="button" class="seg__btn" aria-pressed="true" data-set="30d">30 hari</button>
        <button type="button" class="seg__btn" aria-pressed="false" data-set="90d">3 bulan</button>
      </div>
      <div style="position: relative;">
        <button class="icon-btn" aria-label="Aksi lain untuk Grafik permohonan izin" aria-haspopup="menu" aria-expanded="false" data-lds-menu="cc-orders-menu"><span class="ic" aria-hidden="true">more_horiz</span></button>
        <div class="menu menu--right" id="cc-orders-menu" role="menu" aria-label="Grafik permohonan izin" style="top: calc(100% + 6px); right: 0;">
          <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">download</span>Unduh CSV</button>
          <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">content_copy</span>Salin tautan grafik</button>
        </div>
      </div>
    </div>
  </div>
  <div class="chart-card__figure"><div class="chart-card__big" data-chart-figure>2.545</div><span class="delta delta--pill delta--good" data-chart-delta><span class="ic" aria-hidden="true">arrow_upward</span>7%</span><span class="chart-card__sub" data-chart-note>dibanding 30 hari sebelumnya</span></div>
  <div class="chart" id="cc-orders" data-lds-chart='{"xName":"Hari","stacked":true,"total":true,"height":220,"x":["18 Okt","19 Okt","20 Okt","21 Okt","22 Okt","23 Okt","24 Okt","25 Okt","26 Okt","27 Okt","28 Okt","29 Okt","30 Okt","31 Okt","1 Nov","2 Nov","3 Nov","4 Nov","5 Nov","6 Nov","7 Nov","8 Nov","9 Nov","10 Nov","11 Nov","12 Nov","13 Nov","14 Nov","15 Nov","16 Nov"],"xFull":["Min 18 Okt","Sen 19 Okt","Sel 20 Okt","Rab 21 Okt","Kam 22 Okt","Jum 23 Okt","Sab 24 Okt","Min 25 Okt","Sen 26 Okt","Sel 27 Okt","Rab 28 Okt","Kam 29 Okt","Jum 30 Okt","Sab 31 Okt","Min 1 Nov","Sen 2 Nov","Sel 3 Nov","Rab 4 Nov","Kam 5 Nov","Jum 6 Nov","Sab 7 Nov","Min 8 Nov","Sen 9 Nov","Sel 10 Nov","Rab 11 Nov","Kam 12 Nov","Jum 13 Nov","Sab 14 Nov","Min 15 Nov","Sen 16 Nov"],"series":[{"name":"Situs web","values":[56,52,44,52,54,57,60,62,48,49,51,52,62,63,61,51,50,51,57,64,64,58,56,51,52,60,66,59,60,58]},{"name":"Loket","values":[30,23,19,20,29,35,36,32,26,20,21,27,37,37,32,26,21,22,31,37,37,32,26,21,24,29,38,38,34,25]}],"figure":"2.545","delta":"7%","note":"dibanding 30 hari sebelumnya","label":"Permohonan izin per hari menurut saluran, 30 hari terakhir: 2.545 seluruhnya.","sets":{"7d":{"x":["10 Nov","11 Nov","12 Nov","13 Nov","14 Nov","15 Nov","16 Nov"],"xFull":["Sel 10 Nov","Rab 11 Nov","Kam 12 Nov","Jum 13 Nov","Sab 14 Nov","Min 15 Nov","Sen 16 Nov"],"series":[{"name":"Situs web","values":[51,52,60,66,59,60,58]},{"name":"Loket","values":[21,24,29,38,38,34,25]}],"figure":"615","delta":"1%","note":"dibanding 7 hari sebelumnya","label":"Permohonan izin per hari menurut saluran, 7 hari terakhir: 615 seluruhnya."},"30d":{"x":["18 Okt","19 Okt","20 Okt","21 Okt","22 Okt","23 Okt","24 Okt","25 Okt","26 Okt","27 Okt","28 Okt","29 Okt","30 Okt","31 Okt","1 Nov","2 Nov","3 Nov","4 Nov","5 Nov","6 Nov","7 Nov","8 Nov","9 Nov","10 Nov","11 Nov","12 Nov","13 Nov","14 Nov","15 Nov","16 Nov"],"xFull":["Min 18 Okt","Sen 19 Okt","Sel 20 Okt","Rab 21 Okt","Kam 22 Okt","Jum 23 Okt","Sab 24 Okt","Min 25 Okt","Sen 26 Okt","Sel 27 Okt","Rab 28 Okt","Kam 29 Okt","Jum 30 Okt","Sab 31 Okt","Min 1 Nov","Sen 2 Nov","Sel 3 Nov","Rab 4 Nov","Kam 5 Nov","Jum 6 Nov","Sab 7 Nov","Min 8 Nov","Sen 9 Nov","Sel 10 Nov","Rab 11 Nov","Kam 12 Nov","Jum 13 Nov","Sab 14 Nov","Min 15 Nov","Sen 16 Nov"],"series":[{"name":"Situs web","values":[56,52,44,52,54,57,60,62,48,49,51,52,62,63,61,51,50,51,57,64,64,58,56,51,52,60,66,59,60,58]},{"name":"Loket","values":[30,23,19,20,29,35,36,32,26,20,21,27,37,37,32,26,21,22,31,37,37,32,26,21,24,29,38,38,34,25]}],"figure":"2.545","delta":"7%","note":"dibanding 30 hari sebelumnya","label":"Permohonan izin per hari menurut saluran, 30 hari terakhir: 2.545 seluruhnya."},"90d":{"x":["19 Agu","20 Agu","21 Agu","22 Agu","23 Agu","24 Agu","25 Agu","26 Agu","27 Agu","28 Agu","29 Agu","30 Agu","31 Agu","1 Sep","2 Sep","3 Sep","4 Sep","5 Sep","6 Sep","7 Sep","8 Sep","9 Sep","10 Sep","11 Sep","12 Sep","13 Sep","14 Sep","15 Sep","16 Sep","17 Sep","18 Sep","19 Sep","20 Sep","21 Sep","22 Sep","23 Sep","24 Sep","25 Sep","26 Sep","27 Sep","28 Sep","29 Sep","30 Sep","1 Okt","2 Okt","3 Okt","4 Okt","5 Okt","6 Okt","7 Okt","8 Okt","9 Okt","10 Okt","11 Okt","12 Okt","13 Okt","14 Okt","15 Okt","16 Okt","17 Okt","18 Okt","19 Okt","20 Okt","21 Okt","22 Okt","23 Okt","24 Okt","25 Okt","26 Okt","27 Okt","28 Okt","29 Okt","30 Okt","31 Okt","1 Nov","2 Nov","3 Nov","4 Nov","5 Nov","6 Nov","7 Nov","8 Nov","9 Nov","10 Nov","11 Nov","12 Nov","13 Nov","14 Nov","15 Nov","16 Nov"],"xFull":["Rab 19 Agu","Kam 20 Agu","Jum 21 Agu","Sab 22 Agu","Min 23 Agu","Sen 24 Agu","Sel 25 Agu","Rab 26 Agu","Kam 27 Agu","Jum 28 Agu","Sab 29 Agu","Min 30 Agu","Sen 31 Agu","Sel 1 Sep","Rab 2 Sep","Kam 3 Sep","Jum 4 Sep","Sab 5 Sep","Min 6 Sep","Sen 7 Sep","Sel 8 Sep","Rab 9 Sep","Kam 10 Sep","Jum 11 Sep","Sab 12 Sep","Min 13 Sep","Sen 14 Sep","Sel 15 Sep","Rab 16 Sep","Kam 17 Sep","Jum 18 Sep","Sab 19 Sep","Min 20 Sep","Sen 21 Sep","Sel 22 Sep","Rab 23 Sep","Kam 24 Sep","Jum 25 Sep","Sab 26 Sep","Min 27 Sep","Sen 28 Sep","Sel 29 Sep","Rab 30 Sep","Kam 1 Okt","Jum 2 Okt","Sab 3 Okt","Min 4 Okt","Sen 5 Okt","Sel 6 Okt","Rab 7 Okt","Kam 8 Okt","Jum 9 Okt","Sab 10 Okt","Min 11 Okt","Sen 12 Okt","Sel 13 Okt","Rab 14 Okt","Kam 15 Okt","Jum 16 Okt","Sab 17 Okt","Min 18 Okt","Sen 19 Okt","Sel 20 Okt","Rab 21 Okt","Kam 22 Okt","Jum 23 Okt","Sab 24 Okt","Min 25 Okt","Sen 26 Okt","Sel 27 Okt","Rab 28 Okt","Kam 29 Okt","Jum 30 Okt","Sab 31 Okt","Min 1 Nov","Sen 2 Nov","Sel 3 Nov","Rab 4 Nov","Kam 5 Nov","Jum 6 Nov","Sab 7 Nov","Min 8 Nov","Sen 9 Nov","Sel 10 Nov","Rab 11 Nov","Kam 12 Nov","Jum 13 Nov","Sab 14 Nov","Min 15 Nov","Sen 16 Nov"],"series":[{"name":"Situs web","values":[40,48,50,55,49,44,40,42,51,56,57,49,44,45,48,51,51,53,53,47,46,45,48,57,57,55,49,45,46,54,57,60,50,48,44,45,48,55,55,52,46,43,44,50,57,57,52,51,43,44,50,54,59,54,50,43,49,56,62,59,56,52,44,52,54,57,60,62,48,49,51,52,62,63,61,51,50,51,57,64,64,58,56,51,52,60,66,59,60,58]},{"name":"Loket","values":[20,27,33,33,32,23,21,21,27,32,36,32,23,17,19,28,34,36,32,23,21,20,25,32,33,31,25,21,20,27,32,35,31,22,19,20,27,35,34,30,22,20,20,27,33,36,31,22,21,21,29,34,38,33,25,19,21,26,36,35,30,23,19,20,29,35,36,32,26,20,21,27,37,37,32,26,21,22,31,37,37,32,26,21,24,29,38,38,34,25]}],"figure":"7.195","delta":"16%","note":"dibanding 3 bulan sebelumnya","label":"Permohonan izin per hari menurut saluran, 3 bulan terakhir: 7.195 seluruhnya."}}}'></div>
  <div class="chart-card__foot"><span>Diperbarui 16 Nov 2026, 09.40</span><a class="btn btn--plain btn--sm" href="#cc-orders-q">Buka laporan permohonan<span class="ic" aria-hidden="true">chevron_right</span></a></div>
</section>
```

**Satu baris dasbor.** Dua kartu berbagi satu grid. Grafik batang menyorot jawabannya; grafik garis membandingkan tahun ini dengan tahun lalu yang digambar putus-putus.
```html
<div class="auto-grid" style="--min: 300px;">
  <section class="chart-card" aria-labelledby="cc-busy">
    <div class="chart-card__head"><div class="chart-card__titles"><div class="chart-card__q" id="cc-busy">Hari apa puskesmas paling ramai?</div><div class="chart-card__sub">Kunjungan pasien per hari, minggu ini</div></div></div>
    <div class="chart" data-lds-chart='{"label":"Kunjungan puskesmas per hari minggu ini. Kamis paling ramai dengan 31 kunjungan.","x":["Sen","Sel","Rab","Kam","Jum","Sab","Min"],"series":[{"name":"Kunjungan","values":[18,24,22,31,27,12,6],"kind":"bar"}],"highlight":3,"height":180}'></div>
  </section>
  <section class="chart-card" aria-labelledby="cc-score">
    <div class="chart-card__head"><div class="chart-card__titles"><div class="chart-card__q" id="cc-score">Apakah kepuasan warga membaik?</div><div class="chart-card__sub">Rata-rata skor survei per minggu, dari 100</div></div></div>
    <div class="chart" data-lds-chart='{"label":"Rata-rata skor kepuasan layanan per minggu. Tahun ini naik dari 64 ke 81; tahun lalu bertahan di sekitar 70.","x":["M1","M2","M3","M4","M5","M6","M7","M8"],"kind":"line","series":[{"name":"Tahun ini","values":[64,67,66,71,74,73,78,81]},{"name":"Tahun lalu","values":[68,70,69,71,70,72,71,70],"dashed":true,"color":4}],"y":{"min":50,"max":90},"height":180}'></div>
    <div class="chart-card__foot"><span>Data contoh</span><a class="btn btn--plain btn--sm" href="#cc-score">Lihat semua survei<span class="ic" aria-hidden="true">chevron_right</span></a></div>
  </section>
</div>
```

## Varian dan ukuran
| Kelas atau atribut | Kapan |
|---|---|
| `.chart-card__range` | Segmented control untuk dua sampai empat periode. Tambahkan `data-lds-chart-for="chartId"` dan `data-set` di tiap tombol untuk mengganti [grafik data](area-chart.md) ke `config.sets[key]`. Lebih dari empat periode: pakai pemilih [rentang tanggal](date-range.md). |
| `.chart-card__actions .icon-btn` | Satu menu untuk ekspor, salin tautan, layar penuh. Jangan deretan tombol ikon. |
| `.chart-card__figure` | Angka utama dan perubahannya. Hilangkan jika grafik tidak punya satu jawaban. |
| `.chart-card__foot` | Waktu data dan satu tautan. Hilangkan jika tidak ada yang perlu disampaikan. |

## Status
| Status | Caranya |
|---|---|
| `loading, empty, error` | Kartu mempertahankan ukuran dan judulnya; lihat [state grafik](chart-states.md). |
| `refreshing` | Pertahankan grafiknya; tampilkan [spinner](spinner.md) kecil di dekat judul selama data baru dimuat, lalu tanda bergerak ke data itu. |
| `period changed` | Grafik beranimasi; perbarui angka dengan [rolling number](rolling-number.md) dan delta di tempatnya. |

## Gerak dan mikrointeraksi
- Thumb periode bergeser dengan `--spring-smooth` (segmented control).
- Grafik bergerak dari yang tampil ke data baru selama `--d-considered` (480 ms) dengan `--ease-inout`; jika diganti di tengah jalan, gerak dimulai dari bentuk saat ini.
- Menu terbuka dari sudutnya dengan resep overlay; kartunya sendiri tidak pernah bergerak.
- Reduced motion: data langsung melompat, thumb berganti dengan cross-fade.

## Aksesibilitas
- Jadikan kartu sebuah `section` yang diberi label oleh pertanyaannya, agar grafik menjadi landmark yang bisa dituju.
- Kontrol periode adalah grup tombol toggle dengan `aria-pressed` dan label grup ("Periode").
- Tombol menu menyebut grafiknya: "Aksi lain untuk Grafik permohonan izin".
- Angka utama dan delta adalah teks asli; delta menyebut arahnya dengan kata untuk pembaca layar jika panah satu-satunya petunjuk (tambahkan `.sr-only` "naik" atau "turun").

## Lakukan
- Tulis judul sebagai pertanyaan yang dijawab grafik; taruh periode dan satuan di subjudul.
- Pertahankan urutan header yang sama di setiap kartu: judul, periode, menu.
- Sebutkan sekali di halaman bahwa angkanya contoh.

## Hindari
- Menaruh kartu grafik di dalam kartu lain, atau dua grafik dalam satu kartu.
- Menambah deretan tombol ikon; masukkan aksi tambahan ke menu.
- Memakai select untuk dua atau tiga periode; segmented control menampilkan semuanya.

## Perilaku (HTML biasa)
`data-lds-chart-for="chartId"` pada `.seg` (tombol dengan `data-set`) atau `<select>` native (option dengan `value`) memanggil `drawChart` pada grafik itu dengan `config.sets[key]`; lihat [area chart](area-chart.md) untuk config grafiknya. Sebuah set juga boleh membawa `figure`, `delta`, dan `note`: ketiganya mengganti teks `[data-chart-figure]`, `[data-chart-delta]`, dan `[data-chart-note]` di kartu yang sama, yang naik sekali. Grafik, legenda, crosshair, dan tabel berasal dari `data-lds-chart`.

## Terkait
[Area chart](area-chart.md) · [KPI card](kpi-card.md) · [Chart states](chart-states.md) · [Chart principles](chart-principles.md)
