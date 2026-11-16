export default {
  summary: 'Permukaan yang memuat satu pokok: acara, tagihan, layanan. Putih dengan ring tipis di atas kanvas, atau isian tenang di atas putih. Jangan pernah memakai shadow.',
  when: [
    'Satu pokok utuh dengan beberapa bagian (judul, meta, angka, aksi) yang berdampingan dengan pokok lain dalam grid.',
    'Panel yang mengelompokkan satu topik di dasbor ("Pajak daerah", "Jadwal berikutnya").',
    'Seluruh permukaan yang membuka satu hal (`.card--link`).',
  ],
  whenNot: [
    ['Daftar butir yang serupa', 'list', 'Kartu yang ditumpuk sebagai daftar adalah tanda paling umum halaman buatan tangan'],
    ['Grid tujuan di halaman ringkasan', 'link-card'],
    ['Beberapa angka kunci untuk satu halaman', 'stat-row'],
    ['Angka besar dengan labelnya, mungkin dengan tren', 'kpi-card'],
    ['Satu langkah berikutnya di sebuah halaman', 'spotlight'],
    ['Detail label dan nilai', 'key-value', 'Letakkan `dl` di dalam kartu bila kartunya perlu judul'],
  ],
  where: 'Di dalam [auto grid](layout-primitives) (`.auto-grid`) pada halaman ringkasan, dua atau tiga sebaris di layar lebar dan satu per baris di ponsel; atau sebagai satu panel di sebuah kolom. Kartu di atas kanvas berwarna putih; kartu di dalam panel putih memakai `.card--fill`.',
  anatomy: [
    ['.card', 'Wajib. Putih, radius besar, ring tipis, padding 16 px.'],
    ['.card--fill', 'Isian tenang, tanpa ring.'],
    ['.card--link', 'Pada `<a>`: seluruh kartu membuka satu hal dan mengecil ke 98,5 % saat ditekan.'],
    ['.card__media', 'Area media opsional 132 px, rata dengan tepi atas.'],
    ['.card__title', 'Pokoknya, 16 px semibold.'],
    ['.card__sub', 'Meta di bawah judul, 13 px samar.'],
  ],
  examples: [
    {
      title: 'Panel dengan angka dan aksi',
      desc: 'Judul, meta, angka yang penting, dan satu aksi.',
      html: `<div class="card" style="max-width: 340px; width: 100%;">
  <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 12px;"><div><div class="card__title">Pajak bumi dan bangunan</div><div class="card__sub">Tahun pajak 2026</div></div><span class="badge badge--warning">Jatuh tempo 5 hari lagi</span></div>
  <div style="font: 600 28px/34px var(--font); letter-spacing: -0.022em; color: var(--text-strong); margin: 18px 0 2px; font-variant-numeric: tabular-nums;">Rp 1.250.000</div>
  <div class="card__sub">Bayar lewat transfer bank atau virtual account.</div>
  <button class="btn btn--primary btn--md btn--block" style="margin-top: 16px;">Bayar pajak</button>
</div>`,
    },
    {
      title: 'Kartu bertaut dalam grid',
      desc: 'Seluruh kartu adalah satu tautan; kartu mengecil saat ditekan.',
      html: `<div class="auto-grid" style="--min: 220px;">
  <a class="card card--link" href="#seminar"><div class="card__media"><span class="ic" style="font-size: 28px;" aria-hidden="true">image</span></div><span class="badge badge--accent">Seminar</span><div class="card__title" style="margin-top: 10px;">Merancang layanan untuk jaringan lambat</div><div class="card__sub">Kamis, 13.00 · Aula B</div></a>
  <a class="card card--link" href="#workshop"><div class="card__media"><span class="ic" style="font-size: 28px;" aria-hidden="true">image</span></div><span class="badge badge--outline">Pelatihan</span><div class="card__title" style="margin-top: 10px;">Menyusun proposal usaha UMKM</div><div class="card__sub">Jumat, 10.00 · Ruang B2</div></a>
</div>`,
    },
    {
      title: 'Isian di atas putih',
      desc: 'Di dalam panel putih, pakai isian agar tidak muncul ring di dalam ring.',
      html: `<div class="card" style="max-width: 420px;">
  <div class="card__title">Minggu ini</div>
  <div class="card card--fill" style="margin-top: 12px;"><div class="card__title">Posyandu balita</div><div class="card__sub">Dibuka Rabu pukul 09.00 · 2 jam</div></div>
</div>`,
    },
  ],
  variants: [
    ['card', 'Putih dengan ring, di atas kanvas.'],
    ['card--fill', 'Isian tenang, di atas permukaan putih.'],
    ['card--link', 'Seluruh kartu adalah satu tautan.'],
  ],
  states: [
    ['hover (card--link)', 'Ring berubah menjadi `--line-strong`.'],
    [':active (card--link)', 'Mengecil ke `scale(0.985)` dalam 90 ms, kembali dengan `--spring-snappy`.'],
    ['loading', 'Bentuk [skeleton](skeleton) di dalam kartu yang sama.'],
    ['empty', '[Empty state](empty-state) di dalam kartu.'],
  ],
  motion: [
    'Kartu bertaut: saat ditekan mengecil ke 0,985 dalam 90 ms lalu memantul kembali dengan `--spring-snappy`; warna ring berubah selama `--d-fast`.',
    'Tidak ada efek terangkat saat hover, tidak ada shadow yang membesar.',
    'Kartu yang muncul bersamaan boleh berurutan sekali ([list stagger](list-stagger)).',
  ],
  a11y: [
    'Kartu bertaut adalah satu `<a>`: teksnya menjadi nama tautan, jadi buat singkat (judul, meta). Jangan menaruh tombol atau tautan lain di dalamnya.',
    'Kartu panel dengan judul sendiri memakai elemen heading asli bila kartu itu memulai bagian halaman.',
    'Placeholder media dan ikon dekoratif diberi `aria-hidden`; gambar asli butuh `alt`.',
  ],
  do: [
    'Beri setiap kartu satu pokok dan paling banyak satu aksi utama.',
    'Pakai `.card--fill` di dalam permukaan putih.',
    'Susun kartu dengan `.auto-grid`, bukan grid buatan sendiri.',
  ],
  dont: [
    'Menambahkan `box-shadow`, border, atau radius sendiri.',
    'Memakai kartu untuk daftar baris.',
    'Menaruh kartu putih di dalam kartu putih.',
  ],
};
