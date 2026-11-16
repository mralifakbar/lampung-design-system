const fmt = (v) => String(v).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
const funnel = (steps, label) => {
  const top = steps[0][1];
  return `<ol class="funnel" data-lds-grow aria-label="${label}">
${steps.map(([name, v], i) => {
    const conv = i ? Math.round((v / steps[i - 1][1]) * 100) : null;
    const drop = conv !== null && conv < 40;
    return `  <li class="funnel__row${drop ? ' is-drop' : ''}" style="--v: ${((v / top) * 100).toFixed(1)}%;">
    <div class="funnel__meta"><span class="funnel__label">${name}</span><span><span class="funnel__val">${fmt(v)}</span>${conv !== null ? `<span class="funnel__conv">${conv}% dari tahap sebelumnya</span>` : ''}</span></div>
    <div class="funnel__track" aria-hidden="true"><span class="funnel__bar"></span></div>
  </li>`;
  }).join('\n')}
</ol>`;
};

const signup = [['Membuka halaman izin usaha', 12480], ['Mulai mengisi formulir', 5240], ['Mengunggah berkas', 3110], ['Mengirim permohonan', 2290], ['Izin terbit', 610]];
const hiring = [['Mendaftar', 214], ['Lolos seleksi berkas', 96], ['Diwawancarai', 31], ['Diterima', 6]];

export default {
  summary: 'Tahap-tahap sebuah alur, masing-masing dengan berapa orang yang mencapainya dan berapa persen dari tahap sebelumnya yang lanjut. Batang di tengah menyempit mengikuti jumlahnya, jadi penurunan terbesar terlihat sekilas; kata-katanya membawa angka pastinya.',
  when: [
    'Urutan ketika setiap tahap adalah bagian dari tahap sebelumnya: membuka, mengisi, mengirim, terbit; mendaftar, seleksi, wawancara, diterima.',
    'Mencari tahap yang paling banyak kehilangan orang, untuk memutuskan apa yang diperbaiki lebih dulu.',
  ],
  whenNot: [
    ['Kategori yang bukan tahap berjenjang', 'ranked-bars'],
    ['Perubahan satu jumlah dari waktu ke waktu', 'area-chart'],
    ['Bagian dari satu keseluruhan', 'percentage-bar'],
    ['Status satu berkas yang bergerak melewati tahap', 'steps'],
  ],
  where: 'Di [kartu grafik](chart-card), setengah atau selebar halaman. Tiga sampai enam tahap. Kata-kata berada di atas setiap batang, jadi tetap berfungsi di 320 px tanpa perubahan.',
  anatomy: [
    ['ol.funnel', 'Wajib. Daftar berurutan dengan `aria-label`; urutannya adalah maknanya.'],
    ['li.funnel__row', 'Wajib. Satu tahap. `--v` adalah jumlahnya sebagai persen dari tahap pertama.'],
    ['.funnel__meta', 'Wajib. `.funnel__label` (tahapnya), `.funnel__val` (jumlahnya), dan `.funnel__conv` (porsi dari tahap sebelumnya).'],
    ['.funnel__track > .funnel__bar', 'Wajib. Track isian 28 px dengan batang di tengahnya; dekoratif (`aria-hidden`).'],
    ['.is-drop', 'Opsional pada baris: tahap yang paling banyak kehilangan (atau di bawah ambang Anda); porsinya berubah menjadi teks bahaya.'],
  ],
  examples: [
    {
      title: 'Dari membuka halaman sampai izin terbit',
      desc: 'Jika kurang dari 40 % yang lanjut, tahap itu ditandai merah lewat teksnya. Batang tumbuh dari tengah saat pertama terlihat, satu per satu.',
      html: `<section class="chart-card" style="max-width: 560px;" aria-labelledby="fn-q">
  <div><div class="chart-card__q" id="fn-q">Di tahap mana pemohon berhenti?</div><div class="chart-card__sub">Jumlah orang di setiap tahap, 1 sampai 16 November</div></div>
  ${funnel(signup, 'Alur permohonan izin usaha, 1 sampai 16 November')}
  <div class="chart-card__foot"><span>Kehilangan terbesar: dari permohonan ke izin terbit, 27% lanjut</span></div>
</section>`,
    },
    {
      title: 'Funnel pendek',
      desc: 'Empat tahap rekrutmen kader posyandu.',
      html: `<section class="chart-card" style="max-width: 420px;" aria-labelledby="fn-h">
  <div><div class="chart-card__q" id="fn-h">Berapa calon kader yang lolos sampai akhir?</div><div class="chart-card__sub">Pendaftaran kader posyandu, gelombang kedua</div></div>
  ${funnel(hiring, 'Alur rekrutmen kader posyandu, gelombang kedua')}
</section>`,
    },
  ],
  variants: [
    ['.is-drop', 'Menandai tahap dengan porsi terlemah; sebutkan juga di footer.'],
    ['--v', 'Lebar batang: jumlah dibagi jumlah tahap pertama.'],
  ],
  states: [
    ['data change', 'Atur `--v` dan teks baru: batang bergerak selama 480 ms dengan `--ease-inout`.'],
    ['empty', 'Pertahankan nama tahap; jumlah di 0 dan satu baris: "Tidak ada kunjungan pada periode ini".'],
    ['loading', 'Satu baris `.skel` dan strip `.skel` 28 px per tahap.'],
  ],
  motion: [
    'Saat pertama terlihat (`data-lds-grow`): batang tumbuh ke luar dari tengah dengan `--spring-smooth`, berjarak 35 ms dari atas ke bawah.',
    'Perubahan berikutnya: lebar selama `--d-considered` dengan `--ease-inout`. Hover memudarkan batang lain selama `--d-fast`.',
    'Reduced motion: langsung digambar.',
  ],
  a11y: [
    '`ol` dengan `aria-label`, jadi tahap diumumkan berurutan dengan jumlah dan porsinya sebagai teks.',
    'Batang memakai `aria-hidden`; isinya mengulang angka.',
    'Tahap terlemah disebut dengan kata di footer, bukan hanya lewat warna.',
  ],
  do: [
    'Namai tahap sesuai yang dilakukan orang ("Mengirim permohonan").',
    'Tampilkan porsi dari tahap sebelumnya, bukan dari tahap pertama; di situlah keputusannya.',
  ],
  dont: [
    'Menggambar trapesium atau kerucut 3D; batang di tengah lebih tepat.',
    'Memakai funnel untuk tahap yang bisa dilewati atau diulang.',
  ],
  js: 'Opsional: `data-lds-grow` pada daftar memutar animasi masuk saat pertama terlihat.',
};
