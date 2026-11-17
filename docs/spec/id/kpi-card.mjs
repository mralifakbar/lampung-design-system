import { wave } from '../_chart-data.mjs';

// Sparkline path in a 240 x 52 box (stretched to the card width; the stroke does not scale)
const spark = (vals, label) => {
  const lo = Math.min(...vals), hi = Math.max(...vals), n = vals.length;
  const pts = vals.map((v, i) => [(i * 240) / (n - 1), 46 - ((v - lo) / (hi - lo || 1)) * 38]);
  const line = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  return `<svg class="kpi__spark" viewBox="0 0 240 52" preserveAspectRatio="none" role="img" aria-label="${label}"><path class="series-area" d="${line} L240 52 L0 52 Z"></path><path class="series-line" d="${line}"></path></svg>`;
};
const minibars = (vals, label) => {
  const hi = Math.max(...vals);
  return `<div class="kpi__bars" role="img" aria-label="${label}">${vals.map((v, i) => `<i${i === vals.length - 1 ? ' class="is-on"' : ''} style="--h: ${Math.round((v / hi) * 100)}%;"></i>`).join('')}</div>`;
};
const up = (t, tone = 'good') => `<span class="delta delta--pill delta--${tone}"><span class="ic" aria-hidden="true">arrow_upward</span>${t}<span class="sr-only"> naik</span></span>`;
const down = (t, tone = 'good') => `<span class="delta delta--pill delta--down delta--${tone}"><span class="ic" aria-hidden="true">arrow_upward</span>${t}<span class="sr-only"> turun</span></span>`;
const more = (id, name) => `<div style="position: relative; margin-left: auto;">
      <button class="icon-btn" aria-label="Aksi lain untuk ${name}" aria-haspopup="menu" aria-expanded="false" data-lds-menu="${id}"><span class="ic" aria-hidden="true">more_horiz</span></button>
      <div class="menu menu--right" id="${id}" role="menu" aria-label="${name}" style="top: calc(100% + 6px); right: 0;">
        <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">bar_chart</span>Buka laporan</button>
        <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">download</span>Unduh CSV</button>
      </div>
    </div>`;

const rev = wave(30, { base: 1600, trend: 0.3, seed: 4, round: 10 });
const signups = wave(14, { base: 38, trend: 0.4, week: 0.25, seed: 8 });

const row = `<div class="auto-grid" style="--min: 220px;" data-lds-grow>
  <article class="kpi" aria-labelledby="kpi-rev">
    <div class="kpi__head"><span class="kpi__label" id="kpi-rev">Penerimaan retribusi</span>${more('kpi-rev-menu', 'Penerimaan retribusi')}</div>
    <div class="kpi__value">Rp 482 jt</div>
    <div class="kpi__meta">${up('12,4%')}<span>dari Rp 429 jt pada Oktober</span></div>
    ${spark(rev, 'Penerimaan harian selama 30 hari, naik')}
  </article>
  <article class="kpi" aria-labelledby="kpi-sign">
    <div class="kpi__head"><span class="kpi__label" id="kpi-sign">Permohonan baru</span></div>
    <div class="kpi__value">632</div>
    <div class="kpi__meta">${up('8%')}<span>minggu ini</span></div>
    ${minibars(signups, 'Permohonan per hari selama 14 hari; hari ini yang tertinggi')}
  </article>
  <article class="kpi" aria-labelledby="kpi-ref">
    <div class="kpi__head"><span class="kpi__icon" aria-hidden="true"><span class="ic">receipt_long</span></span><span class="kpi__label" id="kpi-ref">Berkas dikembalikan</span></div>
    <div class="kpi__value">14</div>
    <div class="kpi__meta">${down('36%')}<span>lebih sedikit dari bulan lalu</span></div>
  </article>
  <article class="kpi" aria-labelledby="kpi-time">
    <div class="kpi__head"><span class="kpi__icon" aria-hidden="true"><span class="ic">schedule</span></span><span class="kpi__label" id="kpi-time">Rata-rata waktu balas pengaduan</span></div>
    <div class="kpi__value">3,2<small>jam</small></div>
    <div class="kpi__meta">${up('0,6 jam', 'bad')}<span>lebih lambat dari minggu lalu</span></div>
  </article>
</div>`;

const strip = (n, items) => `<div class="kpi-grid-wrap"><div class="kpi-grid" style="--n: ${n};">
${items.map(([label, value, delta, note]) => `  <div class="kpi"><div class="kpi__label">${label}</div><div class="kpi__value">${value}</div><div class="kpi__meta">${delta}<span>${note}</span></div></div>`).join('\n')}
</div></div>`;

export default {
  summary: 'Satu metrik di dasbor: apa yang diukur, nilainya, bagaimana perubahannya terhadap pembanding yang disebutkan, dan bila perlu bentuk terbarunya sebagai sparkline atau mini bar. Nilainya yang utama; perubahan selalu menyebut pembandingnya.',
  when: [
    'Baris pertama dasbor: tiga sampai enam metrik yang diperiksa setiap kali berkunjung (penerimaan, permohonan, berkas dikembalikan, waktu balas).',
    'Metrik yang bentuk terbarunya sama pentingnya dengan nilainya: tambahkan sparkline (berkelanjutan) atau mini bar (per hari atau minggu).',
    'Beberapa metrik dari satu pokok yang digabung menjadi strip (`.kpi-grid`) di atas halaman analitik.',
  ],
  whenNot: [
    ['Angka yang merangkum halaman, tanpa perubahan untuk dilaporkan', 'stat-row', 'Sebaris angka polos lebih tenang dan tidak butuh kartu.'],
    ['Metrik dengan pertanyaan dan tren lebih panjang yang dipelajari pembaca', 'sparkline-stat'],
    ['Pembaca butuh nilai pada tanggal tertentu', 'area-chart'],
    ['Kemajuan menuju target', 'target-bar'],
  ],
  where: 'Di atas dasbor dalam `auto-grid` (`--min: 220px`), atau sebagai satu strip `.kpi-grid`. Di ponsel kartu bertumpuk selebar penuh; strip menjadi dua kolom di bawah 760 px lebar wadahnya dan satu kolom di bawah 400 px. Tidak pernah lebih dari enam sebaris.',
  anatomy: [
    ['.kpi', 'Wajib. `article` (atau `a.kpi--link` bila seluruh kartu membuka laporan). Latar dasar, ring `--line`, padding 16 px, radius 16 px.'],
    ['.kpi__head', 'Wajib. `.kpi__label` (apa yang diukur), `.kpi__icon` opsional sebelumnya, dan satu menu `.icon-btn` sesudahnya.'],
    ['.kpi__value', 'Wajib. Angka tabular 28 px; satuan di `small`.'],
    ['.kpi__meta', 'Disarankan. [Trend delta](trend-delta) dan pembandingnya dalam kata ("dari Rp 429 jt pada Oktober").'],
    ['svg.kpi__spark', 'Opsional. Sparkline selebar penuh di sepanjang tepi bawah: `.series-area` dan `.series-line` dalam viewBox 240 × 52, `preserveAspectRatio="none"`. `role="img"` dengan tren dalam kata.'],
    ['.kpi__bars', 'Opsional. Mini bar, satu `i` per periode dengan `--h` dalam persen; `.is-on` menandai periode berjalan.'],
    ['.kpi-grid-wrap > .kpi-grid', 'Menggabungkan kartu menjadi satu blok ber-ring dengan garis tipis di antaranya; `--n` mengatur kolom (2, 3, 4, atau 6 agar baris penuh).'],
  ],
  examples: [
    {
      title: 'Baris pertama dasbor',
      desc: 'Sparkline, mini bar, dan dua kartu dengan ikon. Warna setiap perubahan mengikuti artinya: berkas dikembalikan yang berkurang itu baik, balasan yang melambat itu buruk. Bagian bawahnya tumbuh saat pertama terlihat.',
      html: row,
    },
    {
      title: 'Strip gabungan',
      desc: 'Empat metrik dari satu halaman dalam satu blok. Ubah ukuran jendela: empat kolom, lalu dua, lalu satu.',
      html: strip(4, [
        ['Pengunjung', '18.240', up('6,1%'), 'dari 17.190'],
        ['Halaman per kunjungan', '3,4', up('0,2'), 'dari 3,2'],
        ['Bounce rate', '41%', down('3 poin'), 'dari 44%'],
        ['Waktu di halaman', '2 mnt 48 dtk', down('9 dtk', 'bad'), 'dari 2 mnt 57 dtk'],
      ]),
    },
    {
      title: 'Seluruh kartu membuka laporan',
      desc: 'Bila kartu menuju satu tempat, jadikan kartunya tautan. Kartu sedikit mengecil saat ditekan.',
      html: `<a class="kpi kpi--link" href="#kpi-link" id="kpi-link" style="width: 260px;">
  <div class="kpi__head"><span class="kpi__label">Pengaduan terbuka</span><span class="ic" aria-hidden="true" style="color: var(--text-faint);">chevron_right</span></div>
  <div class="kpi__value">27</div>
  <div class="kpi__meta">${down('5')}<span>sejak Senin</span></div>
</a>`,
    },
  ],
  variants: [
    ['.kpi__spark', 'Ukuran berkelanjutan (penerimaan, pengunjung): garis berisi, tanpa sumbu, tanpa titik.'],
    ['.kpi__bars', 'Dihitung per periode (permohonan per hari): mini bar dengan periode berjalan berwarna seri.'],
    ['.kpi__icon', 'Tile glyph tenang yang membantu memindai baris panjang; bukan tile berwarna.'],
    ['.kpi--link', 'Kartu adalah satu tautan ke laporan metrik itu.'],
    ['.kpi-grid', 'Strip gabungan. `--n: 2 | 3 | 4 | 6`.'],
  ],
  states: [
    ['loading', 'Garis `.skel` untuk label, blok 28 px untuk nilai, satu lagi untuk perubahan; tinggi kartu tetap.'],
    ['no baseline', 'Hilangkan delta dan jelaskan alasannya di meta ("Bulan pertama").'],
    ['error', 'Nilai tetap kosong dan meta berbunyi "Gagal memuat" dengan tombol polos Coba lagi.'],
    ['value changed live', 'Ganti angka dengan [rolling number](rolling-number); delta naik masuk sekali.'],
  ],
  motion: [
    'Tampilan pertama (`data-lds-grow` pada baris atau kartu): sparkline tersapu masuk dari kiri selama 1 dtk dengan `--ease-inout`; mini bar naik dari garis dasar dengan `--spring-smooth`, berjarak 25 ms.',
    'Kartu tautan mengecil ke 98,5 % dalam 90 ms saat ditekan dan kembali dengan `--spring-snappy`.',
    'Reduced motion: semuanya langsung tergambar.',
  ],
  a11y: [
    'Setiap kartu adalah `article` yang dilabeli `.kpi__label`-nya (`aria-labelledby`), sehingga pembaca layar mendaftar metrik menurut namanya.',
    'Delta membawa arah dalam kata (`.sr-only` "naik" / "turun"); warna hanya mengulangnya.',
    'Sparkline dan mini bar adalah `role="img"` dengan tren dalam kata; keduanya tidak pernah menjadi satu-satunya tempat sebuah nilai.',
    'Tombol menu menyebut metriknya: "Aksi lain untuk Penerimaan retribusi".',
  ],
  do: [
    'Sebutkan pembanding perubahan di meta.',
    'Warnai perubahan menurut baik atau buruknya, bukan arahnya.',
    'Jaga anatomi yang sama dalam satu baris: semua dengan sparkline atau tidak sama sekali.',
  ],
  dont: [
    'Menaruh grafik bersumbu di kartu KPI; itu [chart card](chart-card).',
    'Mengisi kartu KPI dengan warna atau menaruh teks putih di atas warna; kartu tetap di permukaan dasar.',
    'Menampilkan perubahan persen pada basis di bawah 20; berikan perubahan absolutnya.',
  ],
  js: 'Opsional: `data-lds-grow` pada kartu atau grid-nya memainkan animasi masuk saat pertama terlihat. Selebihnya CSS.',
};
