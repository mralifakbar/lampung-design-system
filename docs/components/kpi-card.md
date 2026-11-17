# KPI card

Kelompok: Tampilan data. https://lampung.kartadinata.app/docs/components/kpi-card

Satu metrik di dasbor: apa yang diukur, nilainya, bagaimana perubahannya terhadap pembanding yang disebutkan, dan bila perlu bentuk terbarunya sebagai sparkline atau mini bar. Nilainya yang utama; perubahan selalu menyebut pembandingnya.

## Pakai saat
- Baris pertama dasbor: tiga sampai enam metrik yang diperiksa setiap kali berkunjung (penerimaan, permohonan, berkas dikembalikan, waktu balas).
- Metrik yang bentuk terbarunya sama pentingnya dengan nilainya: tambahkan sparkline (berkelanjutan) atau mini bar (per hari atau minggu).
- Beberapa metrik dari satu pokok yang digabung menjadi strip (`.kpi-grid`) di atas halaman analitik.

## Pakai yang lain saat
- Angka yang merangkum halaman, tanpa perubahan untuk dilaporkan: pakai [Stat row](stat-row.md). Sebaris angka polos lebih tenang dan tidak butuh kartu.
- Metrik dengan pertanyaan dan tren lebih panjang yang dipelajari pembaca: pakai [Sparkline stat](sparkline-stat.md).
- Pembaca butuh nilai pada tanggal tertentu: pakai [Area chart](area-chart.md).
- Kemajuan menuju target: pakai [Target bar](target-bar.md).

## Letaknya
Di atas dasbor dalam `auto-grid` (`--min: 220px`), atau sebagai satu strip `.kpi-grid`. Di ponsel kartu bertumpuk selebar penuh; strip menjadi dua kolom di bawah 760 px lebar wadahnya dan satu kolom di bawah 400 px. Tidak pernah lebih dari enam sebaris.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.kpi` | Wajib. `article` (atau `a.kpi--link` bila seluruh kartu membuka laporan). Latar dasar, ring `--line`, padding 16 px, radius 16 px. |
| `.kpi__head` | Wajib. `.kpi__label` (apa yang diukur), `.kpi__icon` opsional sebelumnya, dan satu menu `.icon-btn` sesudahnya. |
| `.kpi__value` | Wajib. Angka tabular 28 px; satuan di `small`. |
| `.kpi__meta` | Disarankan. [Trend delta](trend-delta.md) dan pembandingnya dalam kata ("dari Rp 429 jt pada Oktober"). |
| `svg.kpi__spark` | Opsional. Sparkline selebar penuh di sepanjang tepi bawah: `.series-area` dan `.series-line` dalam viewBox 240 × 52, `preserveAspectRatio="none"`. `role="img"` dengan tren dalam kata. |
| `.kpi__bars` | Opsional. Mini bar, satu `i` per periode dengan `--h` dalam persen; `.is-on` menandai periode berjalan. |
| `.kpi-grid-wrap > .kpi-grid` | Menggabungkan kartu menjadi satu blok ber-ring dengan garis tipis di antaranya; `--n` mengatur kolom (2, 3, 4, atau 6 agar baris penuh). |

## Markup

**Baris pertama dasbor.** Sparkline, mini bar, dan dua kartu dengan ikon. Warna setiap perubahan mengikuti artinya: berkas dikembalikan yang berkurang itu baik, balasan yang melambat itu buruk. Bagian bawahnya tumbuh saat pertama terlihat.
```html
<div class="auto-grid" style="--min: 220px;" data-lds-grow>
  <article class="kpi" aria-labelledby="kpi-rev">
    <div class="kpi__head"><span class="kpi__label" id="kpi-rev">Penerimaan retribusi</span><div style="position: relative; margin-left: auto;">
      <button class="icon-btn" aria-label="Aksi lain untuk Penerimaan retribusi" aria-haspopup="menu" aria-expanded="false" data-lds-menu="kpi-rev-menu"><span class="ic" aria-hidden="true">more_horiz</span></button>
      <div class="menu menu--right" id="kpi-rev-menu" role="menu" aria-label="Penerimaan retribusi" style="top: calc(100% + 6px); right: 0;">
        <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">bar_chart</span>Buka laporan</button>
        <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">download</span>Unduh CSV</button>
      </div>
    </div></div>
    <div class="kpi__value">Rp 482 jt</div>
    <div class="kpi__meta"><span class="delta delta--pill delta--good"><span class="ic" aria-hidden="true">arrow_upward</span>12,4%<span class="sr-only"> naik</span></span><span>dari Rp 429 jt pada Oktober</span></div>
    <svg class="kpi__spark" viewBox="0 0 240 52" preserveAspectRatio="none" role="img" aria-label="Penerimaan harian selama 30 hari, naik"><path class="series-area" d="M0.0 45.5 L8.3 30.0 L16.6 28.6 L24.8 32.9 L33.1 43.7 L41.4 46.0 L49.7 45.5 L57.9 39.0 L66.2 26.8 L74.5 23.5 L82.8 25.4 L91.0 30.5 L99.3 38.0 L107.6 39.4 L115.9 31.9 L124.1 22.5 L132.4 16.4 L140.7 28.6 L149.0 27.7 L157.2 33.3 L165.5 33.3 L173.8 25.8 L182.1 18.8 L190.3 16.9 L198.6 15.0 L206.9 26.3 L215.2 33.8 L223.4 22.1 L231.7 12.2 L240.0 8.0 L240 52 L0 52 Z"></path><path class="series-line" d="M0.0 45.5 L8.3 30.0 L16.6 28.6 L24.8 32.9 L33.1 43.7 L41.4 46.0 L49.7 45.5 L57.9 39.0 L66.2 26.8 L74.5 23.5 L82.8 25.4 L91.0 30.5 L99.3 38.0 L107.6 39.4 L115.9 31.9 L124.1 22.5 L132.4 16.4 L140.7 28.6 L149.0 27.7 L157.2 33.3 L165.5 33.3 L173.8 25.8 L182.1 18.8 L190.3 16.9 L198.6 15.0 L206.9 26.3 L215.2 33.8 L223.4 22.1 L231.7 12.2 L240.0 8.0"></path></svg>
  </article>
  <article class="kpi" aria-labelledby="kpi-sign">
    <div class="kpi__head"><span class="kpi__label" id="kpi-sign">Permohonan baru</span></div>
    <div class="kpi__value">632</div>
    <div class="kpi__meta"><span class="delta delta--pill delta--good"><span class="ic" aria-hidden="true">arrow_upward</span>8%<span class="sr-only"> naik</span></span><span>minggu ini</span></div>
    <div class="kpi__bars" role="img" aria-label="Permohonan per hari selama 14 hari; hari ini yang tertinggi"><i style="--h: 59%;"></i><i style="--h: 78%;"></i><i style="--h: 79%;"></i><i style="--h: 71%;"></i><i style="--h: 60%;"></i><i style="--h: 54%;"></i><i style="--h: 60%;"></i><i style="--h: 71%;"></i><i style="--h: 89%;"></i><i style="--h: 100%;"></i><i style="--h: 90%;"></i><i style="--h: 68%;"></i><i style="--h: 59%;"></i><i class="is-on" style="--h: 63%;"></i></div>
  </article>
  <article class="kpi" aria-labelledby="kpi-ref">
    <div class="kpi__head"><span class="kpi__icon" aria-hidden="true"><span class="ic">receipt_long</span></span><span class="kpi__label" id="kpi-ref">Berkas dikembalikan</span></div>
    <div class="kpi__value">14</div>
    <div class="kpi__meta"><span class="delta delta--pill delta--down delta--good"><span class="ic" aria-hidden="true">arrow_upward</span>36%<span class="sr-only"> turun</span></span><span>lebih sedikit dari bulan lalu</span></div>
  </article>
  <article class="kpi" aria-labelledby="kpi-time">
    <div class="kpi__head"><span class="kpi__icon" aria-hidden="true"><span class="ic">schedule</span></span><span class="kpi__label" id="kpi-time">Rata-rata waktu balas pengaduan</span></div>
    <div class="kpi__value">3,2<small>jam</small></div>
    <div class="kpi__meta"><span class="delta delta--pill delta--bad"><span class="ic" aria-hidden="true">arrow_upward</span>0,6 jam<span class="sr-only"> naik</span></span><span>lebih lambat dari minggu lalu</span></div>
  </article>
</div>
```

**Strip gabungan.** Empat metrik dari satu halaman dalam satu blok. Ubah ukuran jendela: empat kolom, lalu dua, lalu satu.
```html
<div class="kpi-grid-wrap"><div class="kpi-grid" style="--n: 4;">
  <div class="kpi"><div class="kpi__label">Pengunjung</div><div class="kpi__value">18.240</div><div class="kpi__meta"><span class="delta delta--pill delta--good"><span class="ic" aria-hidden="true">arrow_upward</span>6,1%<span class="sr-only"> naik</span></span><span>dari 17.190</span></div></div>
  <div class="kpi"><div class="kpi__label">Halaman per kunjungan</div><div class="kpi__value">3,4</div><div class="kpi__meta"><span class="delta delta--pill delta--good"><span class="ic" aria-hidden="true">arrow_upward</span>0,2<span class="sr-only"> naik</span></span><span>dari 3,2</span></div></div>
  <div class="kpi"><div class="kpi__label">Bounce rate</div><div class="kpi__value">41%</div><div class="kpi__meta"><span class="delta delta--pill delta--down delta--good"><span class="ic" aria-hidden="true">arrow_upward</span>3 poin<span class="sr-only"> turun</span></span><span>dari 44%</span></div></div>
  <div class="kpi"><div class="kpi__label">Waktu di halaman</div><div class="kpi__value">2 mnt 48 dtk</div><div class="kpi__meta"><span class="delta delta--pill delta--down delta--bad"><span class="ic" aria-hidden="true">arrow_upward</span>9 dtk<span class="sr-only"> turun</span></span><span>dari 2 mnt 57 dtk</span></div></div>
</div></div>
```

**Seluruh kartu membuka laporan.** Bila kartu menuju satu tempat, jadikan kartunya tautan. Kartu sedikit mengecil saat ditekan.
```html
<a class="kpi kpi--link" href="#kpi-link" id="kpi-link" style="width: 260px;">
  <div class="kpi__head"><span class="kpi__label">Pengaduan terbuka</span><span class="ic" aria-hidden="true" style="color: var(--text-faint);">chevron_right</span></div>
  <div class="kpi__value">27</div>
  <div class="kpi__meta"><span class="delta delta--pill delta--down delta--good"><span class="ic" aria-hidden="true">arrow_upward</span>5<span class="sr-only"> turun</span></span><span>sejak Senin</span></div>
</a>
```

## Varian dan ukuran
| Kelas atau atribut | Kapan |
|---|---|
| `.kpi__spark` | Ukuran berkelanjutan (penerimaan, pengunjung): garis berisi, tanpa sumbu, tanpa titik. |
| `.kpi__bars` | Dihitung per periode (permohonan per hari): mini bar dengan periode berjalan berwarna seri. |
| `.kpi__icon` | Tile glyph tenang yang membantu memindai baris panjang; bukan tile berwarna. |
| `.kpi--link` | Kartu adalah satu tautan ke laporan metrik itu. |
| `.kpi-grid` | Strip gabungan. `--n: 2 | 3 | 4 | 6`. |

## Status
| Status | Caranya |
|---|---|
| `loading` | Garis `.skel` untuk label, blok 28 px untuk nilai, satu lagi untuk perubahan; tinggi kartu tetap. |
| `no baseline` | Hilangkan delta dan jelaskan alasannya di meta ("Bulan pertama"). |
| `error` | Nilai tetap kosong dan meta berbunyi "Gagal memuat" dengan tombol polos Coba lagi. |
| `value changed live` | Ganti angka dengan [rolling number](rolling-number.md); delta naik masuk sekali. |

## Gerak dan mikrointeraksi
- Tampilan pertama (`data-lds-grow` pada baris atau kartu): sparkline tersapu masuk dari kiri selama 1 dtk dengan `--ease-inout`; mini bar naik dari garis dasar dengan `--spring-smooth`, berjarak 25 ms.
- Kartu tautan mengecil ke 98,5 % dalam 90 ms saat ditekan dan kembali dengan `--spring-snappy`.
- Reduced motion: semuanya langsung tergambar.

## Aksesibilitas
- Setiap kartu adalah `article` yang dilabeli `.kpi__label`-nya (`aria-labelledby`), sehingga pembaca layar mendaftar metrik menurut namanya.
- Delta membawa arah dalam kata (`.sr-only` "naik" / "turun"); warna hanya mengulangnya.
- Sparkline dan mini bar adalah `role="img"` dengan tren dalam kata; keduanya tidak pernah menjadi satu-satunya tempat sebuah nilai.
- Tombol menu menyebut metriknya: "Aksi lain untuk Penerimaan retribusi".

## Lakukan
- Sebutkan pembanding perubahan di meta.
- Warnai perubahan menurut baik atau buruknya, bukan arahnya.
- Jaga anatomi yang sama dalam satu baris: semua dengan sparkline atau tidak sama sekali.

## Hindari
- Menaruh grafik bersumbu di kartu KPI; itu [chart card](chart-card.md).
- Mengisi kartu KPI dengan warna atau menaruh teks putih di atas warna; kartu tetap di permukaan dasar.
- Menampilkan perubahan persen pada basis di bawah 20; berikan perubahan absolutnya.

## Perilaku (HTML biasa)
Opsional: `data-lds-grow` pada kartu atau grid-nya memainkan animasi masuk saat pertama terlihat. Selebihnya CSS.

## Terkait
[Stat row](stat-row.md) · [Sparkline stat](sparkline-stat.md) · [Chart card](chart-card.md) · [Trend delta](trend-delta.md)
