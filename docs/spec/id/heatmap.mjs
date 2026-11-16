// 7 rows (Mon to Sun) by 20 columns (weeks). Mid-week is busiest; the pattern is deterministic.
const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
const base = [2, 2.6, 3.2, 2.8, 2, 0.9, 0.4];
const hours = ['tidak ada pasien', 'di bawah 25 pasien', '25 sampai 49 pasien', '50 sampai 74 pasien', '75 pasien atau lebih'];
const cells = days.map((d, r) => Array.from({ length: 20 }, (_, w) => {
  const l = Math.max(0, Math.min(4, Math.round(base[r] + (((w * 7 + r * 3) % 5) - 2) * 0.55 + (w > 13 ? 0.6 : 0))));
  return `<i${l ? ` class="l${l}"` : ''} title="Minggu ${w + 1}, ${d}: ${hours[l]}"></i>`;
}).join('')).join('\n    ');
const scale = `<div class="cluster" style="--gap: 6px; justify-content: flex-end; font: var(--type-footnote); color: var(--text-subtle);" aria-hidden="true">Sepi <span class="hm" style="display: flex; gap: 3px;"><i style="width: 12px;"></i><i class="l1" style="width: 12px;"></i><i class="l2" style="width: 12px;"></i><i class="l3" style="width: 12px;"></i><i class="l4" style="width: 12px;"></i></span> Ramai</div>`;

export default {
  summary: 'Grid kotak kecil, satu per hari atau slot, diarsir dalam lima tingkat satu warna dari kosong sampai paling banyak. Menunjukkan pola selama banyak periode (hari yang ramai, kebiasaan mingguan), bukan nilai pastinya.',
  when: [
    'Aktivitas per hari selama berminggu-minggu atau berbulan-bulan: kunjungan pasien, laporan masuk, permohonan izin.',
    'Melihat pola dalam dua dimensi (hari per minggu, jam per hari) ketika nilai pasti setiap sel kurang penting.',
  ],
  whenNot: [
    ['Nilai pasti per kategori', 'bar-chart'],
    ['Tren satu nilai dari waktu ke waktu', 'line-chart'],
    ['Memilih atau menampilkan tanggal', 'calendar'],
    ['Seberapa penuh satu kapasitas', 'meter'],
  ],
  where: 'Selebar `.chart-card` di laporan atau profil. Grid punya 20 kolom dan kotaknya menyesuaikan lebar, jadi di ponsel setiap sel menjadi kecil: tampilkan 10 minggu terakhir di sana, atau pertahankan 20 di dalam wrapper dengan `overflow-x: auto` dan lebar grid minimal sekitar 480 px.',
  anatomy: [
    ['.hm', 'Wajib. Grid 20 kolom, celah 3 px. Sel mengalir per baris, jadi 7 baris x 20 berarti hari x minggu. `role="img"` + `aria-label`.'],
    ['i', 'Wajib. Satu sel, persegi, radius 3 px, warna kosong `--bg-skeleton`.'],
    ['.l1 / .l2 / .l3 / .l4', 'Tingkat arsiran: `--series-1` pada 22 %, 45 %, 70 %, dan 100 %. Tanpa class berarti kosong.'],
    ['skala', 'Disarankan. Dari "Sepi" sampai "Ramai" dengan satu sel untuk setiap tingkat.'],
  ],
  examples: [
    {
      title: 'Kunjungan puskesmas',
      desc: 'Baris adalah hari, kolom adalah minggu. Arahkan kursor ke satu sel untuk melihatnya membesar beserta judulnya.',
      html: `<div class="chart-card">
  <div><div class="chart-card__q">Kapan puskesmas paling ramai?</div><div class="chart-card__sub">Kunjungan pasien per hari, 20 minggu terakhir</div></div>
  <div class="hm" role="img" aria-label="Kunjungan pasien selama 20 minggu. Rabu paling ramai, akhir pekan sepi, dan 6 minggu terakhir lebih ramai dari sebelumnya.">
    ${cells}
  </div>
  ${scale}
</div>`,
    },
  ],
  variants: [
    ['l1 to l4', 'Empat tingkat terisi ditambah kosong: lima seluruhnya. Petakan nilai ke tingkat dengan ambang tetap (di bawah 25, 25, 50, 75 pasien atau lebih), bukan persentil, agar skalanya bermakna sama setiap minggu.'],
  ],
  states: [
    ['hover', 'Sel membesar ke 1,25 dengan `--spring-snappy`; `title`-nya menampilkan nilainya.'],
    ['empty period', 'Semua sel kosong adalah state yang sah; sebutkan di subjudul ("Belum ada kunjungan tercatat") daripada menyembunyikan grid.'],
    ['loading, error', 'Lihat [state grafik](chart-states).'],
  ],
  motion: [
    'Hover: `transform: scale(1.25)` dengan `--spring-snappy` selama `--d-snappy`, kembali dengan cara yang sama.',
    'Tanpa animasi masuk. Reduced motion: efek membesar saat hover menjadi perubahan 120 ms.',
  ],
  a11y: [
    '`role="img"` pada `.hm` dengan `aria-label` yang menyebut polanya; sel satu per satu tidak dibacakan.',
    'Judul sel hanya untuk pengguna mouse; berikan angkanya di tabel `.sr-only` atau ringkasan jika penting.',
    'Satu warna, terang ke gelap, sehingga terbaca dalam skala abu-abu dan oleh pembaca buta warna; legenda skala memakai `aria-hidden` karena label sudah membawa maknanya.',
  ],
  do: [
    'Pakai ambang tetap untuk tingkatnya dan tampilkan skalanya.',
    'Jelaskan polanya di judul, subjudul, atau label.',
  ],
  dont: [
    'Memakai beberapa warna atau skala pelangi.',
    'Membuat sel bisa diklik tanpa menjadikannya tombol bernama.',
    'Mengubah jumlah kolom dengan CSS sendiri di atas `.hm`; minta variabel kolom di sistem.',
  ],
};
