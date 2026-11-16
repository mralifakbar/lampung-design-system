import { days } from '../_chart-data.mjs';

const ID = { May: 'Mei', Aug: 'Agu', Oct: 'Okt', Dec: 'Des', Sun: 'Min', Mon: 'Sen', Tue: 'Sel', Wed: 'Rab', Thu: 'Kam', Fri: 'Jum', Sat: 'Sab' };
const loc = (s) => s.replace(/\b[A-Z][a-z]{2}\b/g, (w) => ID[w] || w);
const d = days(90);
const incidents = { 12: ['warn', 'Unggah foto lambat selama 40 menit'], 37: ['down', 'Masuk akun tidak tersedia selama 18 menit'], 38: ['warn', 'Masuk akun lambat selama 25 menit'], 71: ['warn', 'Email notifikasi tertunda 1 jam'], 84: ['down', 'Pengiriman laporan gagal selama 9 menit'] };
const bars = (offset = 0) => d.long.map((day, i) => {
  const hit = incidents[(i + offset) % 90];
  const cls = hit ? (hit[0] === 'down' ? 'is-down' : 'is-warn') : 'is-ok';
  return `<i class="${cls}" data-label="${loc(day)}: ${hit ? hit[1] : 'tidak ada gangguan'}"></i>`;
}).join('');
const service = (name, pct, offset, status) => `<div class="uptime-box">
    <div class="cluster" style="justify-content: space-between; --gap: 8px;"><span class="status status--${status[0]}"><i></i>${name}</span><span style="font: var(--type-footnote); color: var(--text-subtle); font-variant-numeric: tabular-nums;">uptime ${pct}</span></div>
    <div class="uptime" data-lds-uptime tabindex="0" role="img" aria-label="${name}, 90 hari terakhir: uptime ${pct}. Tombol panah membacakan setiap hari.">${bars(offset)}</div>
    <div class="uptime__axis" aria-hidden="true"><span><span class="uptime__long">90 hari lalu</span><span class="uptime__short">30 hari lalu</span></span><span>Hari ini</span></div>
    <div class="uptime__now">${status[1]}</div>
  </div>`;

export default {
  summary: 'Satu batang tipis per hari (atau jam) dalam satu baris, diwarnai menurut kondisinya: normal, terganggu, atau mati. Pola gangguan selama 90 hari terbaca sekilas; mengarahkan kursor ke satu batang, atau memakai tombol panah, menyebut apa yang terjadi hari itu.',
  when: [
    'Riwayat layanan yang berjalan di halaman status atau infrastruktur: 90 hari untuk situs web, API, masuk akun, pembayaran.',
    'Catatan harian berhasil, sebagian, gagal ketika rentetan dan kelompoknya penting: cadangan data malam hari, impor terjadwal, absensi harian.',
  ],
  whenNot: [
    ['Kondisi layanan saat ini', 'status-dot'],
    ['Jumlah per hari selama berbulan-bulan (kunjungan, laporan)', 'heatmap'],
    ['Kejadian satu berkas secara berurutan', 'timeline'],
    ['Nilai dari waktu ke waktu', 'area-chart'],
  ],
  where: 'Satu baris per layanan di kartu atau bagian halaman status, selebar wadahnya. Wrapper `.uptime-box` adalah container: di bawah 480 px hanya 30 hari terakhir yang tampil dan sumbunya menyebutkan itu.',
  anatomy: [
    ['.uptime-box', 'Wajib. Wadah untuk baris, sumbunya, dan baris keterangan.'],
    ['.uptime[data-lds-uptime]', 'Wajib. Batangnya: `role="img"`, `aria-label` berisi angka keseluruhan, `tabindex="0"` untuk tombol panah.'],
    ['i', 'Wajib. Satu batang per periode, yang terlama lebih dulu. `.is-ok`, `.is-warn`, `.is-down`, atau tanpa class jika tidak ada data. `data-label` menyebut hari dan kejadiannya.'],
    ['.uptime__axis', 'Disarankan. Awal dan akhir periode; `.uptime__long` dan `.uptime__short` bertukar mengikuti lebar.'],
    ['.uptime__now', 'Disarankan. Baris keterangan: kondisi saat ini saat diam, hari yang ditunjuk saat hover atau tombol panah.'],
  ],
  examples: [
    {
      title: 'Layanan selama 90 hari',
      desc: 'Arahkan kursor ke batang atau fokuskan satu baris lalu pakai tombol panah: baris di bawahnya menyebut hari dan gangguannya. Persempit jendela: 30 hari terakhir tetap tampil.',
      html: `<section class="chart-card" style="max-width: 720px;" aria-labelledby="up-q">
  <div><div class="chart-card__q" id="up-q">Apakah layanan pengaduan warga andal?</div><div class="chart-card__sub">Status harian setiap layanan, 90 hari terakhir</div></div>
  <div class="stack" style="--gap: 24px;">
  ${service('Situs web', '99,97%', 0, ['ok', 'Berjalan normal'])}
  ${service('Masuk akun', '99,91%', 20, ['ok', 'Berjalan normal'])}
  ${service('Pengiriman laporan', '99,86%', 47, ['warn', 'Lebih lambat dari biasa sejak 09.10'])}
  </div>
</section>`,
    },
  ],
  variants: [
    ['i.is-ok / .is-warn / .is-down', 'Normal, terganggu, mati: warna sukses, peringatan, dan bahaya. Biarkan tanpa class untuk hari tanpa data.'],
    ['hours instead of days', 'Markup yang sama dengan 24 atau 48 batang; sumbunya menyebut "24 jam lalu" dan "Sekarang".'],
  ],
  states: [
    ['pointed day', 'Batang itu 12 % lebih tinggi, yang lain memudar ke 45 %, baris keterangan menampilkan `data-label`-nya.'],
    ['no data yet', 'Batang tanpa class dengan warna track, dan baris keterangan menyebut kapan pemantauan dimulai.'],
    ['loading', 'Satu strip `.skel` setinggi 32 px.'],
  ],
  motion: [
    'Batang yang ditunjuk membesar dengan `--spring-snappy`; memudarkan yang lain memakan `--d-fast`. Bergerak sepanjang baris menggeser penekanannya, tidak ada yang melompat.',
    'Reduced motion: penekanan berganti dalam 120 ms, tanpa membesar.',
  ],
  a11y: [
    'Baris adalah satu `role="img"` dengan angka keseluruhan; saat fokus, Kiri dan Kanan berpindah per hari, Home dan End melompat, dan setiap hari diumumkan lewat live region bersama.',
    'Setiap batang punya kata-kata di `data-label`; warna tidak pernah berdiri sendiri, dan status layanan di atasnya mengulang kondisi saat ini dengan [status dot](status-dot).',
    'Batang selebar minimal 2 px dengan celah 2 px; tampilan sempit membuang hari-hari lama, bukan memadatkannya.',
  ],
  do: [
    'Tampilkan angka keseluruhan ("uptime 99,91%") di samping nama layanan.',
    'Sebutkan apa yang terjadi dan berapa lama di setiap `data-label`.',
  ],
  dont: [
    'Menjadikan setiap batang tombol atau tautan sendiri; pakai satu titik fokus per baris.',
    'Hanya menampilkan hijau: jika tidak ada masalah, tulis "Tidak ada gangguan dalam 90 hari" di baris keterangan.',
  ],
  js: '`data-lds-uptime` pada `.uptime`: pointer dan tombol panah menulis `data-label` batang ke `.uptime__now` di `.uptime-box` yang sama dan menandai batang dengan `.is-on`; saat ditinggalkan, teks semula kembali.',
};
