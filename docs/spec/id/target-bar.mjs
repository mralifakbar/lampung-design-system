const bar = ({ label, val, of, v, t, f, tone = '', mark = 'Target', foot = '', end = false }) => `<div class="target${tone ? ` target--${tone}` : ''}" style="--v: ${v}%; --t: ${t}%;${f ? ` --f: ${f}%;` : ''}">
    <div class="target__meta"><span class="target__label">${label}</span><span class="target__val"><b>${val}</b> dari ${of}</span></div>
    <div class="target__track" role="img" aria-label="${label}: ${val} dari ${of}, target ditandai di ${t} persen${f ? `, prakiraan ${f} persen` : ''}">${f ? '<span class="target__forecast"></span>' : ''}<span class="target__fill"></span><span class="target__mark${end ? ' is-end' : ''}"><span class="target__mark-label">${mark}</span></span></div>${foot ? `
    <div class="target__foot">${foot}</div>` : ''}
  </div>`;

export default {
  summary: 'Batang horizontal untuk kemajuan menuju target: isian menunjukkan posisi sekarang, penanda menunjukkan posisi yang seharusnya (target, atau laju hari ini), dan tint opsional di depan isian menunjukkan prakiraan. Kata-kata di atasnya menyebut nilai terhadap target.',
  when: [
    'Angka yang diukur terhadap target: penerimaan pajak terhadap target triwulan, peserta terhadap kuota yang direncanakan, dosis vaksin terhadap rencana mingguan.',
    'Membandingkan laju nyata dan laju yang diharapkan: penanda berada di posisi yang seharusnya hari ini, jadi ketertinggalan terlihat sebelum tenggat.',
    'Daftar pendek target yang berdampingan (satu per puskesmas, per tim, per bulan).',
  ],
  whenNot: [
    ['Tugas yang berjalan menuju selesai (unggah, impor)', 'progress-bar'],
    ['Jumlah terhadap batas mutlak (penyimpanan, kursi)', 'meter'],
    ['Skor di ruang persegi', 'progress-ring'],
    ['Membandingkan banyak kategori satu sama lain', 'ranked-bars'],
    ['Bagian dari satu keseluruhan', 'percentage-bar'],
  ],
  where: 'Di [kartu grafik](chart-card) atau [KPI card](kpi-card) di bawah angkanya; beberapa sekaligus di `.target-list`, berjarak 20 px. Selebar wadahnya; kata-kata turun ke atas batang di ponsel.',
  anatomy: [
    ['.target', 'Wajib. Mengatur `--v` (isian, persen dari track), `--t` (penanda), dan `--f` opsional (prakiraan).'],
    ['.target__meta', 'Wajib. `.target__label` dan `.target__val` ("**Rp 84,3 M** dari Rp 100 M").'],
    ['.target__track', 'Wajib. Track 12 px, `role="img"` dengan nilai-nilainya dalam kata.'],
    ['.target__fill', 'Wajib. Nilai nyata, dengan warna aksen; `.target--success` setelah target tercapai, `.target--warning` saat tertinggal dari laju.'],
    ['.target__forecast', 'Opsional. Nilai akhir yang diproyeksikan sebagai tint di belakang isian.'],
    ['.target__mark', 'Wajib. Penanda 2 px yang melintasi track, dengan `.target__mark-label` di atasnya. `.is-end` meratakan label ke kanan saat penanda dekat ujung.'],
    ['.target__foot', 'Opsional. Sisa hari, laju dalam kata.'],
  ],
  examples: [
    {
      title: 'Target triwulan dengan prakiraan',
      desc: 'Isian adalah penerimaan sejauh ini, tint adalah posisi akhir triwulan menurut tren, penanda adalah targetnya. Isian tumbuh saat pertama terlihat.',
      html: `<section class="chart-card" style="max-width: 520px;" data-lds-grow aria-labelledby="tb-q">
  <div><div class="chart-card__q" id="tb-q">Apakah target triwulan IV tercapai?</div><div class="chart-card__sub">Penerimaan pajak daerah sejak 1 Oktober</div></div>
  ${bar({ label: 'Pajak daerah', val: 'Rp 84,3 M', of: 'Rp 100 M', v: 84.3, t: 100, f: 97, mark: 'Target', end: true, foot: '<span>Prakiraan Rp 97 M pada 31 Des</span><span>45 hari lagi</span>' })}
</section>`,
    },
    {
      title: 'Penanda di laju hari ini',
      desc: 'Penanda setiap target berada di posisi yang seharusnya dicapai tim hari ini. Jika tertinggal, isian berubah menjadi peringatan, dan kata-katanya menyebutkannya.',
      html: `<section class="chart-card" style="max-width: 520px;" aria-labelledby="tb-pace">
  <div><div class="chart-card__q" id="tb-pace">Puskesmas mana yang sesuai rencana?</div><div class="chart-card__sub">Dosis vaksin yang diberikan minggu ini terhadap rencana tiap puskesmas</div></div>
  <div class="target-list" data-lds-grow>
  ${bar({ label: 'Puskesmas Kota', val: '175', of: '200 dosis', v: 87.5, t: 62, mark: 'Hari ini', tone: 'success', foot: '<span>Di depan rencana</span>' })}
  ${bar({ label: 'Puskesmas Pesisir', val: '60', of: '180 dosis', v: 33, t: 62, mark: 'Hari ini', tone: 'warning', foot: '<span>52 dosis di belakang rencana</span>' })}
  ${bar({ label: 'Puskesmas Bukit', val: '90', of: '150 dosis', v: 60, t: 62, mark: 'Hari ini', foot: '<span>Sesuai rencana</span>' })}
  </div>
</section>`,
    },
  ],
  variants: [
    ['--v, --t, --f', 'Posisi isian, penanda, dan prakiraan sebagai persen dari track.'],
    ['.target--success', 'Target tercapai atau di depan laju.'],
    ['.target--warning', 'Tertinggal dari laju; sebutkan seberapa jauh di footer.'],
    ['.target__mark.is-end', 'Label penanda rata ke tepi kanannya (target di 90 % atau lebih).'],
  ],
  states: [
    ['over the goal', 'Batasi `--v` di 100 %, ganti ke `.target--success`, dan sebutkan kelebihannya dengan kata ("lebih Rp 4,2 M").'],
    ['no forecast yet', 'Hilangkan `.target__forecast` dan sebutkan alasannya di footer ("Prakiraan setelah minggu ke-2").'],
    ['loading', 'Satu baris `.skel` untuk teks dan strip `.skel` 12 px untuk track.'],
  ],
  motion: [
    'Isian, prakiraan, dan penanda bergerak selama `--d-considered` (480 ms) dengan `--ease-inout` saat nilai berubah, dari posisinya.',
    'Saat pertama terlihat (`data-lds-grow`): isian tumbuh dari nol dengan transisi yang sama; penanda tetap di tempatnya.',
    'Reduced motion: nilai berganti dalam 120 ms.',
  ],
  a11y: [
    'Track memakai `role="img"` dengan nilai, target, dan prakiraan dalam kata; baris meta mengulang nilainya sebagai teks.',
    'Di depan atau tertinggal disebut di footer, tidak pernah hanya lewat warna isian.',
    'Label penanda adalah teks asli, 12 px, dengan digit tabular.',
  ],
  do: [
    'Sebutkan targetnya di meta ("dari Rp 100 M") dan arti penandanya ("Target", "Hari ini").',
    'Pakai penanda laju untuk target yang punya tenggat.',
  ],
  dont: [
    'Memakai target bar untuk sesuatu tanpa target; itu [ranked bar](ranked-bars) atau [meter](meter).',
    'Menumpuk lebih dari satu isian dan satu prakiraan dalam satu track.',
    'Mewarnai isian merah karena tertinggal; peringatan sudah cukup, kata-kata membawa sisanya.',
  ],
  js: 'Opsional: `data-lds-grow` pada batang atau daftarnya memutar animasi masuk saat pertama terlihat.',
};
