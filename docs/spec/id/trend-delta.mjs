const word = { up: 'naik', down: 'turun', flat: 'tidak berubah' };
const d = (dir, good, val, note, pill = false) => `<span class="delta delta--${dir} delta--${good}${pill ? ' delta--pill' : ''}"><span class="ic" aria-hidden="true">arrow_upward</span>${val}<span class="sr-only"> ${word[dir]} ${note}</span></span>`;

export default {
  summary: 'Perubahan di samping sebuah angka: panah untuk arah, warna untuk artinya, jumlah dalam angka tabular, dan kalimat untuk pembaca layar. Arah dan arti dipisahkan, karena angka yang turun bisa jadi kabar baik.',
  when: [
    'Angka kunci di dasbor yang dibandingkan dengan periode sebelumnya: penerimaan naik 12,5 %, pengaduan turun 3 %, pendaftaran tetap.',
    'Baris di tabel atau daftar ketika perubahannya sama penting dengan nilainya: penjualan UMKM minggu ini, tingkat imunisasi posyandu.',
    'Stat row atau sparkline stat yang butuh satu kata jujur tentang trennya.',
  ],
  whenNot: [
    ['State sebuah catatan (Lunas, Terlambat)', 'badge'],
    ['Tren di banyak titik itu penting', 'sparkline-stat', 'Tambahkan delta di bawah angkanya, bukan sebagai pengganti garis'],
    ['Jumlah hal yang membutuhkan tindakan orang itu', 'count'],
  ],
  where: 'Tepat setelah atau di bawah angka yang dijelaskannya, pada garis dasar yang sama, tidak pernah sendirian. Di stat row masuk ke baris sub; di tabel mendapat kolom sendiri yang rata kanan.',
  anatomy: [
    ['.delta', 'Wajib. Baris sebaris: ikon panah, jumlah bertanda, dan kalimat `.sr-only`.'],
    ['.delta--up | --down | --flat', 'Wajib. Arah: ikon `arrow_upward` menunjuk ke atas, berputar 180 derajat ke bawah, atau rebah mendatar di 90 derajat.'],
    ['.delta--good | --bad | --neutral', 'Wajib. Arti: warna teks success, danger, atau samar. Pilih dari arti angkanya, bukan dari panahnya.'],
    ['.sr-only', 'Wajib. Kata-kata yang diwakili panah dan warna: "naik dari bulan lalu".'],
    ['.delta__note', 'Pembanding opsional yang terlihat setelah jumlahnya ("dibanding Oktober"), redup.'],
  ],
  examples: [
    {
      title: 'Di samping angka kunci',
      desc: 'Penerimaan naik (baik), pemohon baru turun (buruk), pengaduan turun (baik, karena makin sedikit pengaduan makin baik), tingkat penyelesaian tetap.',
      html: `<div class="auto-grid" style="--min: 180px;">
  <div class="stack" style="--gap: 4px;"><span class="section__sub">Penerimaan retribusi</span><span class="chart-card__big">Rp 128,4 jt</span>${d('up', 'good', '+12,5%', 'dari bulan lalu')}</div>
  <div class="stack" style="--gap: 4px;"><span class="section__sub">Pemohon baru</span><span class="chart-card__big">1.234</span>${d('down', 'bad', '−20%', 'dari bulan lalu')}</div>
  <div class="stack" style="--gap: 4px;"><span class="section__sub">Pengaduan</span><span class="chart-card__big">18</span>${d('down', 'good', '−3', 'dari bulan lalu')}</div>
  <div class="stack" style="--gap: 4px;"><span class="section__sub">Selesai sesuai SLA</span><span class="chart-card__big">94,6%</span>${d('flat', 'neutral', '0,0 poin', 'dari bulan lalu')}</div>
</div>`,
    },
    {
      title: 'Pil, dengan pembanding yang terlihat',
      desc: '`delta--pill` menaruh delta di atas tint-nya bila berada di samping angka besar; `.delta__note` menyebut pembandingnya sekali.',
      html: `${d('up', 'good', '+8,2%', 'dari Oktober', true)} ${d('down', 'bad', '−4,1%', 'dari Oktober', true)} <span class="delta delta--up delta--good"><span class="ic" aria-hidden="true">arrow_upward</span>+320<span class="delta__note">dibanding Oktober</span><span class="sr-only"> naik dari Oktober</span></span>`,
    },
    {
      title: 'Diperbarui di tempat',
      desc: 'Tekan tombolnya: `setDelta()` menulis ulang jumlahnya, memutar panah dengan spring bila arahnya berbalik, dan mewarnai ulang menurut artinya.',
      html: `<span class="delta delta--up delta--good" id="dl-demo" data-good="up" data-note="dari minggu lalu"><span class="ic" aria-hidden="true">arrow_upward</span>+4,2%<span class="sr-only"> naik dari minggu lalu</span></span>
<button class="btn btn--secondary btn--sm" onclick="import('../../js/lds.js').then((m) => { const v = Math.round((Math.random() * 30 - 15) * 10) / 10; m.setDelta(document.getElementById('dl-demo'), v); })">Minggu berikutnya</button>`,
      code: `<span class="delta delta--up delta--good" id="weekly" data-good="up" data-note="dari minggu lalu">…</span>
<script type="module">
  import { setDelta } from 'lampung-design-system/js';
  setDelta(document.getElementById('weekly'), -3.1); // arrow turns down, color turns to danger
</script>`,
    },
  ],
  variants: [
    ['.delta', 'Teks sebaris, untuk baris sub dan sel tabel.'],
    ['.delta--pill', 'Di atas tint-nya, tinggi 22 px, di samping angka besar.'],
  ],
  states: [
    ['good', '`--success-text` (dan `--success-tint` pada pil).'],
    ['bad', '`--danger-text` (dan `--danger-tint`).'],
    ['neutral', '`--text-subtle`; untuk tidak ada perubahan, atau perubahan yang tidak baik maupun buruk.'],
    ['.is-changed', 'Dipasang oleh `setDelta()`: teksnya naik masuk sekali.'],
  ],
  motion: [
    'Bila arahnya berbalik, panah berputar 180 derajat dengan `--spring-smooth` selama `--d-smooth`; warnanya langsung mengikuti.',
    '`setDelta()` membuat jumlah baru naik masuk selama `--d-standard` dengan `--ease-enter` (pertukaran teks sistem).',
    'Reduced motion: tanpa naik; panah tetap berputar, karena itu state, bukan hiasan.',
  ],
  a11y: [
    'Panahnya `aria-hidden`; kalimat `.sr-only` menyebut arah dan pembanding ("naik dari bulan lalu"), jadi warna dan panah tidak pernah menjadi satu-satunya penanda.',
    'Pakai tanda minus asli (−) untuk jumlah negatif dan tanda plus untuk yang positif.',
    'Token teks success dan danger menjaga kontras 4,5:1 di atas kanvas, isian, dan tint-nya di kedua tema.',
  ],
  do: [
    'Warnai menurut arti: pengaduan yang berkurang, waktu respons yang lebih cepat, dan biaya yang lebih rendah adalah baik ketika turun.',
    'Sebutkan sekali di halaman apa pembandingnya (bulan lalu, minggu lalu); ulangi hanya di teks `.sr-only`.',
  ],
  dont: [
    'Menampilkan delta tanpa angka yang dijelaskannya.',
    'Memakai warna aksen untuk tren, atau merah dan hijau tanpa panah dan tanpa kata.',
    'Membulatkan terlalu jauh sampai perubahan tampil 0,0 % dengan panah berwarna.',
  ],
  js: 'Markup statis tidak butuh hook. `setDelta(el, change, { goodWhen, unit, note, digits })` menulis ulang `.delta`: kelas arah, kelas arti (dari `goodWhen`, default `data-good` atau "up"), jumlah bertanda dengan `unit` (default `data-unit` atau "%"), dan kalimat `.sr-only` (dari `note`, default `data-note`).',
};
