const max = (rows) => Math.max(...rows.map((r) => r.v));
const pct = (v, m) => `${((v / m) * 100).toFixed(1)}%`;
const fmt = (v) => String(v).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

const sources = [
  { name: 'Mesin pencari', icon: 'search', v: 4210, d: '+12%', good: true },
  { name: 'Buletin email', icon: 'mail', v: 2380, d: '+4%', good: true },
  { name: 'Situs sekolah', icon: 'school', v: 1710, d: '−6%', good: false },
  { name: 'Media sosial', icon: 'share', v: 960, d: '+21%', good: true },
  { name: 'Langsung', icon: 'link', v: 640, d: '−2%', good: false },
];
const srcRows = sources.map((s, i) => `  <div class="hbar${i === 0 ? ' is-top' : ''}"><span class="hbar__label"><span class="hbar__media" aria-hidden="true"><span class="ic">${s.icon}</span></span><span>${s.name}</span></span><span class="hbar__track"><span class="hbar__fill" style="--v: ${pct(s.v, max(sources))};"></span></span><span class="hbar__val">${fmt(s.v)}<span class="delta delta--${s.good ? 'good' : 'bad'}${s.good ? '' : ' delta--down'}"><span class="ic" aria-hidden="true">arrow_upward</span>${s.d.replace(/^[+−]/, '')}<span class="sr-only">${s.good ? ' naik' : ' turun'}</span></span></span></div>`).join('\n');

const people = [
  ['Nadia Putri', 'NP', 'Loket izin usaha', 96], ['Rizky Hartono', 'RH', 'Loket KTP', 91], ['Mei Lin Tan', 'ML', 'Loket izin usaha', 88],
  ['Dimas Saputra', 'DS', 'Layanan pengaduan', 84], ['Ayu Lestari', 'AL', 'Loket KTP', 79],
];
const board = people.map(([n, ini, c, v], i) => `  <div class="hbar"><span class="hbar__label"><span class="hbar__rank">${i + 1}</span><span class="avatar avatar--gray hbar__media" aria-hidden="true">${ini}</span><span><span>${n}</span><span class="hbar__sub">${c}</span></span></span><span class="hbar__track"><span class="hbar__fill" style="--v: ${v}%;"></span></span><span class="hbar__val">${v}</span></div>`).join('\n');

const pages = { a: [['/layanan/ktp-elektronik', 3120], ['/tarif-retribusi', 2210], ['/layanan/izin-usaha', 1640], ['/berita/jadwal-posyandu', 980], ['/tentang', 410]], b: [['/layanan/ktp-elektronik', 2480], ['/layanan/izin-usaha', 2050], ['/tarif-retribusi', 1730], ['/berita/libur-pelayanan', 1210], ['/berita/jadwal-posyandu', 640]] };
const pm = Math.max(...pages.a.map((p) => p[1]), ...pages.b.map((p) => p[1]));
const insideRows = pages.a.map(([p, v], i) => `  <div class="hbar${i === 0 ? ' is-top' : ''}"><span class="hbar__track"><span class="hbar__fill" style="--v: ${pct(v, pm)};" data-a="${pct(v, pm)}" data-b="${pct(pages.b[i][1], pm)}"></span><span class="hbar__label" data-a="${p}" data-b="${pages.b[i][0]}">${p}</span></span><span class="hbar__val" data-a="${fmt(v)}" data-b="${fmt(pages.b[i][1])}">${fmt(v)}</span></div>`).join('\n');
const pick = (k) => `onclick="this.closest('.chart-card').querySelectorAll('[data-${k}]').forEach((n) => n.classList.contains('hbar__fill') ? n.style.setProperty('--v', n.dataset.${k}) : (n.textContent = n.dataset.${k}))"`;

export default {
  summary: 'Baris berisi label, batang horizontal, dan nilainya, diurutkan dari yang terpanjang: sumber teratas, halaman teratas, skor terbaik. Label panjang tetap terbaca karena berada di samping (atau di dalam) batang, bukan di bawahnya, dan setiap baris berbagi satu grid sehingga batang dan nilai sejajar.',
  when: [
    'Memeringkat 3 sampai 10 hal bernama menurut satu nilai: sumber kunjungan, halaman, layanan, petugas, kecamatan.',
    'Nama kategorinya panjang atau banyak ("Situs sekolah", "/layanan/ktp-elektronik"), yang harus diputar jika memakai batang vertikal.',
    'Papan peringkat: urutan, siapa, dan skornya, dengan batang untuk memberi gambaran cepat tentang selisihnya.',
  ],
  whenNot: [
    ['Kategori yang punya urutan sendiri (hari, bulan)', 'bar-chart'],
    ['Kemajuan tiap item menuju targetnya sendiri', 'target-bar'],
    ['Bagian yang berjumlah satu keseluruhan', 'percentage-bar'],
    ['Banyak data yang dibandingkan pada beberapa atribut', 'table'],
    ['Tahap alur ketika tiap tahap mempertahankan sebagian dari tahap sebelumnya', 'funnel'],
  ],
  where: 'Di [kartu grafik](chart-card), setengah lebar di dasbor. Di bawah 480 px batang pindah ke bawah label dan nilainya, selebar kartu. Atur `--label-w` pada `.hbars` untuk mengubah kolom label (default 140 px).',
  anatomy: [
    ['.hbars', 'Wajib. Grid-nya: kolom label, kolom batang, kolom nilai. `role="list"` jika barisnya adalah peringkat.'],
    ['.hbar', 'Wajib. Satu baris; subgrid dari `.hbars`, sehingga nilai sejajar antarbaris. `.is-top` menandai yang teratas.'],
    ['.hbar__label', 'Wajib. Namanya; boleh diawali `.hbar__rank`, `.hbar__media` (tile ikon atau `.avatar`) dan membawa baris `.hbar__sub`.'],
    ['.hbar__track > .hbar__fill', 'Wajib. Track 10 px; `--v` mengatur isinya sebagai persen dari nilai terbesar.'],
    ['.hbar__val', 'Wajib. Nilainya, tabular; boleh memuat [trend delta](trend-delta).'],
    ['.hbars--inside', 'Varian. Batang tint 36 px dengan label di dalamnya, untuk label panjang di kartu sempit.'],
    ['.hbars--muted', 'Varian. Semua batang kecuali `.is-top` memudar ke warna tint.'],
  ],
  examples: [
    {
      title: 'Sumber teratas dengan perubahannya',
      desc: 'Ikon, nama, batang, jumlah kunjungan, dan perubahannya dibanding bulan lalu. Arahkan kursor ke satu baris untuk menonjolkannya. Batang tumbuh saat pertama terlihat.',
      html: `<section class="chart-card" style="max-width: 560px;" aria-labelledby="rb-src">
  <div><div class="chart-card__q" id="rb-src">Dari mana pengunjung portal layanan datang?</div><div class="chart-card__sub">Kunjungan menurut sumber, November</div></div>
  <div class="hbars" role="list" data-lds-grow aria-label="Kunjungan menurut sumber">
${srcRows.replace(/<div class="hbar/g, '<div role="listitem" class="hbar')}
  </div>
</section>`,
    },
    {
      title: 'Papan peringkat',
      desc: 'Urutan, avatar, dan unit layanan di bawah nama; satu warna yang tenang agar selisihnya yang bercerita.',
      html: `<section class="chart-card" style="max-width: 560px;" aria-labelledby="rb-lead">
  <div><div class="chart-card__q" id="rb-lead">Petugas mana yang paling dinilai baik?</div><div class="chart-card__sub">Skor kepuasan warga dari 100, lima teratas, triwulan ini</div></div>
  <div class="hbars" role="list" data-lds-grow style="--label-w: 220px;" aria-label="Lima skor kepuasan teratas">
${board.replace(/<div class="hbar/g, '<div role="listitem" class="hbar')}
  </div>
</section>`,
    },
    {
      title: 'Label di dalam, mengganti periode',
      desc: 'Alamat halaman yang panjang muat di dalam batang tint. Ganti periodenya: batang bergerak ke panjang barunya selama 480 ms.',
      html: `<section class="chart-card" style="max-width: 480px;" aria-labelledby="rb-pages">
  <div class="chart-card__head"><div class="chart-card__titles"><div class="chart-card__q" id="rb-pages">Halaman mana yang paling dibaca?</div><div class="chart-card__sub">Jumlah tayangan per halaman</div></div>
    <div class="chart-card__actions"><div class="seg chart-card__range" role="group" aria-label="Periode" data-lds-segmented style="width: 200px;"><span class="seg__thumb"></span><button type="button" class="seg__btn" aria-pressed="true" ${pick('a')}>November</button><button type="button" class="seg__btn" aria-pressed="false" ${pick('b')}>Oktober</button></div></div>
  </div>
  <div class="hbars hbars--inside" role="list" aria-label="Tayangan per halaman">
${insideRows.replace(/<div class="hbar/g, '<div role="listitem" class="hbar')}
  </div>
</section>`,
      code: `<div class="hbars hbars--inside" role="list" aria-label="Tayangan per halaman">
  <div role="listitem" class="hbar is-top"><span class="hbar__track"><span class="hbar__fill" style="--v: 100%;"></span><span class="hbar__label">/layanan/ktp-elektronik</span></span><span class="hbar__val">3.120</span></div>
  …
</div>`,
    },
  ],
  variants: [
    ['.hbar__media', 'Tile ikon (sumber, layanan) atau `.avatar` (orang) sebelum nama.'],
    ['.hbar__rank', 'Nomor urut untuk papan peringkat.'],
    ['.hbar__sub', 'Baris kedua di bawah nama: unit, kategori, jumlah kunjungan.'],
    ['.hbars--inside', 'Label di dalam batang tint 36 px; yang teratas mendapat tepi aksen 3 px.'],
    ['.hbars--muted', 'Hanya yang teratas memakai warna seri.'],
    ['--label-w', 'Lebar kolom label pada `.hbars`.'],
  ],
  states: [
    ['hover', 'Baris di bawah kursor tetap, yang lain memudar ke 55 %.'],
    ['data change', 'Atur nilai `--v` baru: isi batang bergerak selama 480 ms dengan `--ease-inout`. Urutkan ulang hanya setelah geraknya selesai, atau jangan sama sekali selagi orang membaca.'],
    ['loading', 'Lima baris `.skel`: blok label dan strip 10 px.'],
    ['empty', 'Pertahankan judul; satu baris yang menyebut tidak ada kunjungan pada periode itu.'],
  ],
  motion: [
    'Saat pertama terlihat (`data-lds-grow`): isi batang tumbuh dari nol dengan `--spring-smooth` (560 ms), berjarak 35 ms dari baris teratas.',
    'Perubahan nilai: lebar berubah selama `--d-considered` dengan `--ease-inout`, dari lebar saat ini.',
    'Efek pudar hover selama `--d-fast`. Reduced motion: nilai berganti dalam 120 ms, tanpa stagger.',
  ],
  a11y: [
    'Pakai `role="list"` pada `.hbars` dan `role="listitem"` pada baris jika urutannya yang penting; label dan nilai adalah teks asli, jadi daftar terbaca "Mesin pencari, 4.210, 12% naik".',
    'Batang adalah dekorasi di atas nilainya; tidak perlu label tambahan.',
    'Delta membawa kata "naik" atau "turun" dalam teks `.sr-only`.',
  ],
  do: [
    'Urutkan dari yang terpanjang; sebutkan periodenya di subjudul.',
    'Skalakan setiap batang terhadap nilai terbesar di set itu, atau terhadap maksimum tetap seperti 100 untuk skor.',
  ],
  dont: [
    'Memberi setiap batang warnanya sendiri.',
    'Memotong sumbu batang di atas nol.',
    'Menampilkan lebih dari sepuluh baris; tambahkan tautan ke tabel lengkap.',
  ],
  js: 'Opsional: `data-lds-grow` pada `.hbars` (atau kartunya) memutar animasi masuk saat pertama terlihat. Nilai berubah dengan mengatur `--v` di setiap isi batang.',
};
