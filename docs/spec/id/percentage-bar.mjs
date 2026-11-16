const parts = (list) => list.map(([v, n]) => `<span style="flex-grow: ${v}; background: var(--series-${n});"></span>`).join('');
const legend = (list) => list.map(([v, n, l]) => `<span><i style="background: var(--series-${n});"></i>${l} <b style="font-weight: 500; color: var(--text-strong);">${v}%</b></span>`).join('');
const credits = [[50, 1, 'Pembangunan'], [25, 2, 'Pelayanan'], [15, 3, 'Pemberdayaan'], [10, 4, 'Lainnya']];

export default {
  summary: 'Satu batang horizontal yang dibagi menjadi paling banyak empat bagian berwarna yang berjumlah 100 %, dengan legenda yang menyebut nama dan porsi setiap bagian. Cara ringkas untuk menunjukkan komposisi.',
  when: [
    'Menunjukkan bagaimana satu keseluruhan terbagi: anggaran per bidang, waktu per kegiatan, laporan selesai, diproses, dan ditolak.',
    'Komposisi di ruang sempit atau di dalam baris daftar atau sel tabel, ketika donut tidak muat.',
    'Membandingkan komposisi di beberapa baris (satu batang per periode) ketika bagiannya sama.',
  ],
  whenNot: [
    ['Kemajuan satu nilai menuju selesai', 'progress-bar', 'Progress bar punya satu bagian dan satu track.'],
    ['Seberapa penuh kapasitas atau kuota', 'meter'],
    ['Total sama pentingnya dengan pembagiannya', 'donut'],
    ['Membandingkan ukuran mutlak antar kategori', 'bar-chart'],
  ],
  where: 'Di `.chart-card` di bawah judul, di dalam baris daftar atau sel tabel selebar sel, atau di bawah sebuah angka. Selebar layar di ponsel; legenda turun ke bawahnya.',
  anatomy: [
    ['.pbar', 'Wajib. Baris flex setinggi 14 px, radius 4 px, celah 2 px antarbagian, terpotong rapi. `role="img"` + `aria-label`.'],
    ['span', 'Wajib. Satu per bagian; `flex-grow` adalah porsinya, `background` adalah `--series-n` dengan urutan tetap.'],
    ['.legend', 'Wajib. Swatch, nama, dan porsi setiap bagian, dengan urutan yang sama.'],
  ],
  examples: [
    {
      title: 'Komposisi satu keseluruhan',
      desc: 'Anggaran kelurahan per bidang. Legenda membawa angkanya.',
      html: `<div class="chart-card" style="max-width: 460px;">
  <div><div class="chart-card__q">Ke mana anggaran kelurahan dipakai?</div><div class="chart-card__sub">Porsi anggaran per bidang, tahun 2026</div></div>
  <div class="pbar" role="img" aria-label="Pembangunan 50 persen, pelayanan 25, pemberdayaan 15, lainnya 10">${parts(credits)}</div>
  <div class="legend">${legend(credits)}</div>
</div>`,
    },
    {
      title: 'Dibandingkan antarbaris',
      desc: 'Status laporan warga di dua triwulan. Bagian sama, urutan sama, satu batang per baris; perubahan pembagiannya terbaca sekilas.',
      html: `<div class="chart-card" style="max-width: 460px;">
  <div><div class="chart-card__q">Apakah lebih banyak laporan yang selesai?</div><div class="chart-card__sub">Status laporan warga, dua triwulan terakhir</div></div>
  <div class="stack" style="--gap: 6px;"><span class="card__sub" style="margin: 0;">Triwulan II</span><div class="pbar" role="img" aria-label="Triwulan II: 62 persen selesai, 28 diproses, 10 ditolak">${parts([[62, 3], [28, 2], [10, 4]])}</div></div>
  <div class="stack" style="--gap: 6px;"><span class="card__sub" style="margin: 0;">Triwulan III</span><div class="pbar" role="img" aria-label="Triwulan III: 74 persen selesai, 20 diproses, 6 ditolak">${parts([[74, 3], [20, 2], [6, 4]])}</div></div>
  <div class="legend"><span><i style="background: var(--series-3);"></i>Selesai</span><span><i style="background: var(--series-2);"></i>Diproses</span><span><i style="background: var(--series-4);"></i>Ditolak</span></div>
</div>`,
    },
  ],
  states: [
    ['data change', 'Ubah `flex-grow`; bagian berubah ukuran dengan halus.'],
    ['a part is 0', 'Hapus span-nya (bagian kosong tetap menambah celah 2 px).'],
    ['loading', 'Satu `.skel` setinggi 14 px dengan radius yang sama; lihat [state grafik](chart-states).'],
  ],
  motion: [
    'Bagian mentransisikan `flex-grow` selama `--d-considered` (480 ms) dengan `--ease-inout`, jadi pembagian baru bergeser ke tempatnya.',
    'Tanpa animasi mengisi saat pertama dimuat. Reduced motion: 120 ms.',
  ],
  a11y: [
    '`role="img"` pada `.pbar` dengan setiap bagian dan porsinya di `aria-label`.',
    'Legenda adalah teks asli berisi persentasenya; jangan hanya mengandalkan bagian berwarna.',
    'Pertahankan warna yang sama untuk makna yang sama di semua baris (selesai selalu seri 3 di sini).',
  ],
  do: [
    'Pertahankan urutan bagian yang tetap di setiap batang di halaman.',
    'Tampilkan persentasenya di legenda.',
  ],
  dont: [
    'Membagi menjadi lebih dari empat bagian; gabungkan sisanya ke Lainnya dengan `--neutral`.',
    'Memakainya untuk satu nilai terhadap target.',
    'Menambah label di dalam bagian; bagian yang kecil tidak muat.',
  ],
};
