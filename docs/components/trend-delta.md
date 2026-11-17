# Trend delta

Kelompok: Tampilan data. https://lampung.kartadinata.app/docs/components/trend-delta

Perubahan di samping sebuah angka: panah untuk arah, warna untuk artinya, jumlah dalam angka tabular, dan kalimat untuk pembaca layar. Arah dan arti dipisahkan, karena angka yang turun bisa jadi kabar baik.

## Pakai saat
- Angka kunci di dasbor yang dibandingkan dengan periode sebelumnya: penerimaan naik 12,5 %, pengaduan turun 3 %, pendaftaran tetap.
- Baris di tabel atau daftar ketika perubahannya sama penting dengan nilainya: penjualan UMKM minggu ini, tingkat imunisasi posyandu.
- Stat row atau sparkline stat yang butuh satu kata jujur tentang trennya.

## Pakai yang lain saat
- State sebuah catatan (Lunas, Terlambat): pakai [Badge](badge.md).
- Tren di banyak titik itu penting: pakai [Sparkline stat](sparkline-stat.md). Tambahkan delta di bawah angkanya, bukan sebagai pengganti garis.
- Jumlah hal yang membutuhkan tindakan orang itu: pakai [Count](count.md).

## Letaknya
Tepat setelah atau di bawah angka yang dijelaskannya, pada garis dasar yang sama, tidak pernah sendirian. Di stat row masuk ke baris sub; di tabel mendapat kolom sendiri yang rata kanan.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.delta` | Wajib. Baris sebaris: ikon panah, jumlah bertanda, dan kalimat `.sr-only`. |
| `.delta--up | --down | --flat` | Wajib. Arah: ikon `arrow_upward` menunjuk ke atas, berputar 180 derajat ke bawah, atau rebah mendatar di 90 derajat. |
| `.delta--good | --bad | --neutral` | Wajib. Arti: warna teks success, danger, atau samar. Pilih dari arti angkanya, bukan dari panahnya. |
| `.sr-only` | Wajib. Kata-kata yang diwakili panah dan warna: "naik dari bulan lalu". |
| `.delta__note` | Pembanding opsional yang terlihat setelah jumlahnya ("dibanding Oktober"), redup. |

## Markup

**Di samping angka kunci.** Penerimaan naik (baik), pemohon baru turun (buruk), pengaduan turun (baik, karena makin sedikit pengaduan makin baik), tingkat penyelesaian tetap.
```html
<div class="auto-grid" style="--min: 180px;">
  <div class="stack" style="--gap: 4px;"><span class="section__sub">Penerimaan retribusi</span><span class="chart-card__big">Rp 128,4 jt</span><span class="delta delta--up delta--good"><span class="ic" aria-hidden="true">arrow_upward</span>+12,5%<span class="sr-only"> naik dari bulan lalu</span></span></div>
  <div class="stack" style="--gap: 4px;"><span class="section__sub">Pemohon baru</span><span class="chart-card__big">1.234</span><span class="delta delta--down delta--bad"><span class="ic" aria-hidden="true">arrow_upward</span>−20%<span class="sr-only"> turun dari bulan lalu</span></span></div>
  <div class="stack" style="--gap: 4px;"><span class="section__sub">Pengaduan</span><span class="chart-card__big">18</span><span class="delta delta--down delta--good"><span class="ic" aria-hidden="true">arrow_upward</span>−3<span class="sr-only"> turun dari bulan lalu</span></span></div>
  <div class="stack" style="--gap: 4px;"><span class="section__sub">Selesai sesuai SLA</span><span class="chart-card__big">94,6%</span><span class="delta delta--flat delta--neutral"><span class="ic" aria-hidden="true">arrow_upward</span>0,0 poin<span class="sr-only"> tidak berubah dari bulan lalu</span></span></div>
</div>
```

**Pil, dengan pembanding yang terlihat.** `delta--pill` menaruh delta di atas tint-nya bila berada di samping angka besar; `.delta__note` menyebut pembandingnya sekali.
```html
<span class="delta delta--up delta--good delta--pill"><span class="ic" aria-hidden="true">arrow_upward</span>+8,2%<span class="sr-only"> naik dari Oktober</span></span> <span class="delta delta--down delta--bad delta--pill"><span class="ic" aria-hidden="true">arrow_upward</span>−4,1%<span class="sr-only"> turun dari Oktober</span></span> <span class="delta delta--up delta--good"><span class="ic" aria-hidden="true">arrow_upward</span>+320<span class="delta__note">dibanding Oktober</span><span class="sr-only"> naik dari Oktober</span></span>
```

**Diperbarui di tempat.** Tekan tombolnya: `setDelta()` menulis ulang jumlahnya, memutar panah dengan spring bila arahnya berbalik, dan mewarnai ulang menurut artinya.
```html
<span class="delta delta--up delta--good" id="weekly" data-good="up" data-note="dari minggu lalu">…</span>
<script type="module">
  import { setDelta } from 'lampung-design-system/js';
  setDelta(document.getElementById('weekly'), -3.1); // arrow turns down, color turns to danger
</script>
```

## Varian dan ukuran
| Kelas atau atribut | Kapan |
|---|---|
| `.delta` | Teks sebaris, untuk baris sub dan sel tabel. |
| `.delta--pill` | Di atas tint-nya, tinggi 22 px, di samping angka besar. |

## Status
| Status | Caranya |
|---|---|
| `good` | `--success-text` (dan `--success-tint` pada pil). |
| `bad` | `--danger-text` (dan `--danger-tint`). |
| `neutral` | `--text-subtle`; untuk tidak ada perubahan, atau perubahan yang tidak baik maupun buruk. |
| `.is-changed` | Dipasang oleh `setDelta()`: teksnya naik masuk sekali. |

## Gerak dan mikrointeraksi
- Bila arahnya berbalik, panah berputar 180 derajat dengan `--spring-smooth` selama `--d-smooth`; warnanya langsung mengikuti.
- `setDelta()` membuat jumlah baru naik masuk selama `--d-standard` dengan `--ease-enter` (pertukaran teks sistem).
- Reduced motion: tanpa naik; panah tetap berputar, karena itu state, bukan hiasan.

## Aksesibilitas
- Panahnya `aria-hidden`; kalimat `.sr-only` menyebut arah dan pembanding ("naik dari bulan lalu"), jadi warna dan panah tidak pernah menjadi satu-satunya penanda.
- Pakai tanda minus asli (−) untuk jumlah negatif dan tanda plus untuk yang positif.
- Token teks success dan danger menjaga kontras 4,5:1 di atas kanvas, isian, dan tint-nya di kedua tema.

## Lakukan
- Warnai menurut arti: pengaduan yang berkurang, waktu respons yang lebih cepat, dan biaya yang lebih rendah adalah baik ketika turun.
- Sebutkan sekali di halaman apa pembandingnya (bulan lalu, minggu lalu); ulangi hanya di teks `.sr-only`.

## Hindari
- Menampilkan delta tanpa angka yang dijelaskannya.
- Memakai warna aksen untuk tren, atau merah dan hijau tanpa panah dan tanpa kata.
- Membulatkan terlalu jauh sampai perubahan tampil 0,0 % dengan panah berwarna.

## Perilaku (HTML biasa)
Markup statis tidak butuh hook. `setDelta(el, change, { goodWhen, unit, note, digits })` menulis ulang `.delta`: kelas arah, kelas arti (dari `goodWhen`, default `data-good` atau "up"), jumlah bertanda dengan `unit` (default `data-unit` atau "%"), dan kalimat `.sr-only` (dari `note`, default `data-note`).

## Terkait
[Stat row](stat-row.md) · [Sparkline stat](sparkline-stat.md) · [Badge](badge.md) · [Table](table.md)
