const days = [['Sen', 12], ['Sel', 18], ['Rab', 26], ['Kam', 22], ['Jum', 31], ['Sab', 9], ['Min', 4]];
const max = 32;
const bars = days.map(([d, v]) => `<div class="bars__col"><span class="bars__bar${v === 31 ? '' : ' bars__bar--muted'}" style="height: ${Math.round((v / max) * 100)}%;"><span class="bars__tip">${v} laporan</span></span><span class="bars__x">${d}</span></div>`).join('\n      ');

export default {
  summary: 'Aturan yang diikuti setiap grafik di sistem ini: satu pertanyaan per grafik, ditulis sebagai judulnya; tanda tipis di atas grid yang samar; empat warna seri dengan urutan tetap; label langsung, bukan legenda; dan alternatif teks untuk setiap grafik.',
  when: [
    'Sebelum membuat grafik apa pun: pilih jenis grafik dari pertanyaannya, lalu ikuti aturan ini untuk judul, warna, label, dan state.',
    'Meninjau konsistensi halaman dasbor atau laporan.',
  ],
  whenNot: [
    ['Satu angka utama dengan trennya', 'sparkline-stat'],
    ['Beberapa angka kunci tanpa grafik', 'stat-row'],
    ['Kemajuan satu tugas menuju selesai', 'progress-bar'],
    ['Kapasitas atau kuota yang terisi', 'meter'],
    ['Membandingkan nilai antar kategori', 'bar-chart'],
    ['Perubahan dari waktu ke waktu', 'line-chart'],
  ],
  where: 'Grafik ditempatkan di `.chart-card`, sendiri atau dalam `auto-grid` (`--min: 320px`) di dasbor. Kartu grafik tidak pernah diletakkan di dalam kartu lain. Di ponsel setiap grafik selebar layar dan tetap punya judul serta alternatif teks; grafik yang padat (heatmap, deret waktu panjang) menampilkan lebih sedikit periode, bukan mengecilkan tandanya.',
  anatomy: [
    ['.chart-card', 'Wajib. Padding 20 px, radius 18 px, ring `--line`, jarak 14 px antarbagian.'],
    ['.chart-card__q', 'Wajib. Pertanyaan yang dijawab grafik, sebagai kalimat: "Hari apa yang paling sibuk?"'],
    ['.chart-card__sub', 'Disarankan. Apa yang diukur dan pada periode apa: "Laporan warga yang masuk per hari".'],
    ['.chart-card__big', 'Opsional. Satu angka yang dicari pembaca, 32 px tabular.'],
    ['.legend', 'Hanya jika label langsung tidak muat. Item `span` dengan swatch `i` yang diwarnai inline.'],
    ['alternatif teks', 'Wajib. `role="img"` + `aria-label` berisi kesimpulannya, ditambah tabel `.sr-only` jika nilainya penting.'],
  ],
  examples: [
    {
      title: 'Satu pertanyaan, satu sorotan',
      desc: 'Judul mengajukan pertanyaan, batang yang disorot menjawabnya, batang lain memudar. Arahkan kursor ke batang untuk melihat nilainya.',
      html: `<div class="chart-card" style="max-width: 520px;">
  <div><div class="chart-card__q">Hari apa yang paling sibuk?</div><div class="chart-card__sub">Laporan warga yang masuk per hari, minggu ini</div></div>
  <div class="bars" role="img" aria-label="Laporan warga per hari. Jumat paling sibuk dengan 31 laporan, Minggu paling sepi dengan 4.">
      ${bars}
  </div>
</div>`,
    },
    {
      title: 'Warna seri dengan urutan tetap',
      desc: 'Selalu `--series-1` sampai `--series-4`, dalam urutan ini, tidak pernah diputar ulang. Seri kelima digabung ke Lainnya dengan `--neutral`. Kontras seri 2 di bawah 3:1 di atas putih, jadi selalu diberi label.',
      html: `<div class="legend">
  <span><i style="background: var(--series-1);"></i>Seri 1</span>
  <span><i style="background: var(--series-2);"></i>Seri 2</span>
  <span><i style="background: var(--series-3);"></i>Seri 3</span>
  <span><i style="background: var(--series-4);"></i>Seri 4</span>
  <span><i style="background: var(--neutral);"></i>Lainnya</span>
</div>`,
    },
    {
      title: 'Alternatif teks',
      desc: 'Grafik menjadi satu gambar dengan ringkasan; nilai pastinya ada di tabel tersembunyi untuk pembaca layar.',
      html: `<div class="chart-card" style="max-width: 420px;">
  <div><div class="chart-card__q">Dari mana pajak daerah berasal?</div><div class="chart-card__sub">Porsi penerimaan pajak daerah menurut jenis, triwulan III</div></div>
  <div class="pbar" role="img" aria-label="Pajak kendaraan menyumbang separuh penerimaan pajak daerah.">
    <span style="flex-grow: 50; background: var(--series-1);"></span><span style="flex-grow: 25; background: var(--series-2);"></span><span style="flex-grow: 15; background: var(--series-3);"></span><span style="flex-grow: 10; background: var(--series-4);"></span>
  </div>
  <div class="legend"><span><i style="background: var(--series-1);"></i>Kendaraan 50%</span><span><i style="background: var(--series-2);"></i>PBB 25%</span><span><i style="background: var(--series-3);"></i>Restoran 15%</span><span><i style="background: var(--series-4);"></i>Lainnya 10%</span></div>
  <table class="sr-only">
    <caption>Porsi penerimaan pajak daerah menurut jenis</caption>
    <thead><tr><th>Jenis</th><th>Porsi</th></tr></thead>
    <tbody><tr><td>Kendaraan</td><td>50%</td></tr><tr><td>PBB</td><td>25%</td></tr><tr><td>Restoran</td><td>15%</td></tr><tr><td>Lainnya</td><td>10%</td></tr></tbody>
  </table>
</div>`,
    },
  ],
  variants: [
    ['--series-1..4', 'Warna kategori, urutan tetap, disetel per tema dan diuji agar tetap terbedakan bagi buta warna. Warna mengikuti entitasnya, jadi filter tidak pernah mewarnai ulang data yang tersisa.'],
    ['--neutral', 'Seri Lainnya, dan apa pun yang sedang tidak difokuskan.'],
    ['.bars__bar--muted', 'Memudarkan batang yang bukan jawaban (`--accent-tint-strong`).'],
    ['--series-1 light to dark', 'Besaran dalam satu warna, seperti pada [heatmap](heatmap): jangan pelangi.'],
  ],
  states: [
    ['loading, empty, error', 'Setiap grafik punya ketiganya; lihat [state grafik](chart-states).'],
    ['hover', 'Hover pada satu tanda meredupkan tanda lain ke 45 % dan menampilkan nilainya; jangan jadikan satu-satunya cara membacanya.'],
  ],
  motion: [
    'Perubahan data menganimasikan apa yang sudah tampil: tinggi batang dan segmen donut selama `--d-considered` (480 ms) dengan `--ease-inout`; segmen persentase juga begitu.',
    'Garis tergambar sekali saat pertama terlihat dengan `.draw` (1,2 s dengan `--ease-inout`); pembaruan berikutnya tidak menggambar ulang.',
    'Umpan balik hover: opasitas selama `--d-fast`, tooltip dengan `--spring-snappy`.',
    'Dengan reduced motion nilai langsung melompat ke akhirnya; efek pudar hover tetap ada sebagai perubahan 120 ms.',
  ],
  a11y: [
    'Setiap grafik memakai `role="img"` dengan `aria-label` yang menyatakan kesimpulannya, bukan "Grafik batang".',
    'Jika pembaca butuh nilainya, tambahkan tabel `.sr-only` (dengan `<caption>`) atau tombol untuk menampilkan tabel.',
    'Jangan menyampaikan makna hanya lewat warna: beri label seri secara langsung, dan pakai posisi atau pola (garis putus-putus) untuk seri kedua.',
    'Teks di samping tanda memakai token teks (`--text-strong`, `--text-subtle`), bukan warna seri. Angka memakai digit tabular.',
    'Nilai yang hanya muncul saat hover harus tersedia juga di label atau tabel; pengguna keyboard tidak bisa hover.',
  ],
  do: [
    'Tulis judul sebagai pertanyaan yang dijawab grafik.',
    'Beri label langsung pada garis dan batang; pakai legenda hanya jika label akan bertumpuk.',
    'Mulai sumbu batang dari nol; sebutkan periodenya di subjudul.',
    'Sebutkan sekali per halaman bahwa angka contoh hanyalah contoh.',
  ],
  dont: [
    'Memakai diagram pai dengan lebih dari empat irisan, efek 3D, gradien, atau bayangan pada tanda.',
    'Menentukan warna seri berdasarkan peringkat atau memutarnya saat filter berubah.',
    'Menaruh grafik di kartu yang berada di dalam kartu lain.',
    'Menampilkan grafik tanpa state loading, kosong, dan error.',
  ],
};
