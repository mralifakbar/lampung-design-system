const PICK = `const s = event.target.closest('.star'); if (!s) return; const all = [...this.querySelectorAll('.star')], n = all.indexOf(s); all.forEach((b, i) => { b.classList.toggle('on', i <= n); b.classList.remove('preview'); b.setAttribute('aria-checked', String(i === n)); b.tabIndex = i === n ? 0 : -1; });`;
const HOVER = `const s = event.target.closest('.star'), all = [...this.querySelectorAll('.star')], n = s ? all.indexOf(s) : -1; all.forEach((b, i) => b.classList.toggle('preview', i <= n && !b.classList.contains('on')));`;
const LEAVE = `this.querySelectorAll('.star').forEach((b) => b.classList.remove('preview'))`;
const KEYS = `const all = [...this.querySelectorAll('.star')], i = all.indexOf(document.activeElement), d = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 }[event.key]; if (d === undefined || i < 0) return; event.preventDefault(); const n = all[Math.max(0, Math.min(all.length - 1, i + d))]; n.focus(); n.click();`;
const stars = (value) => [1, 2, 3, 4, 5].map((n) => `<button type="button" class="star${n <= value ? ' on' : ''}" role="radio" aria-checked="${n === value}" tabindex="${n === (value || 1) ? 0 : -1}" aria-label="${n} bintang"><span class="ic" aria-hidden="true">star</span></button>`).join('');

export default {
  summary: 'Lima bintang untuk menilai sesuatu dari satu sampai lima. Hover menampilkan pratinjau skor, klik menetapkannya; dari keyboard ia berfungsi sebagai radio group.',
  when: [
    'Orang menilai layanan, petugas, penjelasan, atau kunjungan dari satu sampai lima.',
    'Menampilkan rata-rata penilaian baca saja di samping judul (bintang statis tanpa tombol).',
  ],
  whenNot: [
    ['Ya atau tidak cepat soal kegunaan ("Apakah penjelasan ini membantu?")', 'button-group', 'Dua tombol, atau [like](like) untuk satu tanggapan positif'],
    ['Skor pada skala yang lebih luas (0 sampai 10, persentase)', 'slider'],
    ['Menampilkan skor sebagai progres atau tingkat', 'meter'],
    ['Memilih salah satu dari beberapa tingkat bernama (Mudah, Sedang, Sulit)', 'segmented-control'],
  ],
  where: 'Di akhir hal yang dinilai: setelah layanan selesai, di formulir ulasan, di [sheet](sheet) umpan balik di ponsel. Penilaian baca saja berada di samping judul atau di baris kunci-nilai.',
  anatomy: [
    ['.stars', 'Wajib. Baris sebaris berisi lima, berjarak 2 px. `role="radiogroup"` dengan `aria-label` untuk input; `role="img"` dengan `aria-label` ("4 dari 5 bintang") untuk tampilan.'],
    ['button.star[role=radio]', 'Wajib untuk input. Target 40 px dengan ikon `star` berisi, `aria-checked`, dan nama ("4 bintang").'],
    ['.on', 'Pada setiap bintang sampai skor yang dipilih: warna warning.'],
    ['.preview', 'Pada bintang sampai yang disorot selama hover: warna warning yang lebih muda.'],
  ],
  examples: [
    {
      title: 'Nilai sebuah layanan',
      desc: 'Hover untuk pratinjau, klik untuk menetapkan. Dari keyboard, Tab ke bintang lalu pakai tombol panah.',
      html: `<div class="field" style="align-items: flex-start;">
  <span class="field__label" id="rt-label">Bagaimana layanan pembuatan KTP hari ini?</span>
  <div class="stars" role="radiogroup" aria-labelledby="rt-label" onclick="${PICK}" onmouseover="${HOVER}" onmouseleave="${LEAVE}" onkeydown="${KEYS}">${stars(0)}</div>
</div>`,
      code: `<span class="field__label" id="service-rating">Bagaimana layanan pembuatan KTP hari ini?</span>
<div class="stars" role="radiogroup" aria-labelledby="service-rating">
  <button type="button" class="star on" role="radio" aria-checked="false" tabindex="-1" aria-label="1 bintang"><span class="ic" aria-hidden="true">star</span></button>
  <button type="button" class="star on" role="radio" aria-checked="false" tabindex="-1" aria-label="2 bintang"><span class="ic" aria-hidden="true">star</span></button>
  <button type="button" class="star on" role="radio" aria-checked="true" tabindex="0" aria-label="3 bintang"><span class="ic" aria-hidden="true">star</span></button>
  <button type="button" class="star" role="radio" aria-checked="false" tabindex="-1" aria-label="4 bintang"><span class="ic" aria-hidden="true">star</span></button>
  <button type="button" class="star" role="radio" aria-checked="false" tabindex="-1" aria-label="5 bintang"><span class="ic" aria-hidden="true">star</span></button>
</div>
<!-- Your code: click sets .on up to the star and aria-checked on it; hover sets .preview; arrow keys move. -->`,
    },
    {
      title: 'Rata-rata baca saja',
      desc: 'Hanya tampilan: span, bukan tombol, dan satu nama untuk seluruh baris.',
      html: `<div class="docs-row" style="gap: 8px;">
  <span class="stars" role="img" aria-label="4 dari 5 bintang"><span class="star on"><span class="ic" aria-hidden="true">star</span></span><span class="star on"><span class="ic" aria-hidden="true">star</span></span><span class="star on"><span class="ic" aria-hidden="true">star</span></span><span class="star on"><span class="ic" aria-hidden="true">star</span></span><span class="star"><span class="ic" aria-hidden="true">star</span></span></span>
  <span class="field__help">4,2 dari 318 warga</span>
</div>`,
    },
  ],
  states: [
    ['.on', 'Bintang terpilih, dalam `--warning`.'],
    ['.preview', 'Pratinjau hover, `--warning` pada 55 %.'],
    [':active', 'Bintang yang ditekan mengecil ke 0.85 dan memantul kembali.'],
    ['focus-visible', 'Focus ring sistem pada bintang yang difokus.'],
  ],
  motion: [
    'Warna berubah dalam `--d-fast` (160 ms) dengan `--ease-standard`, sehingga menyapu bintang terasa bersambung.',
    'Tekan: `scale(0.85)`, kembali dengan `--spring-snappy` (360 ms).',
    'Reduced motion: transisi menjadi 120 ms linear.',
  ],
  a11y: [
    'Untuk input ia adalah radio group: `role="radiogroup"` dengan label, setiap bintang `role="radio"` dengan `aria-checked` dan nama ("3 bintang").',
    'Fokus berpindah (roving): hanya bintang terpilih (atau yang pertama jika belum ada) yang punya `tabindex="0"`; tombol panah berpindah dan memilih. Sistem tidak punya skrip untuk ini; demo menunjukkan baris yang diperlukan.',
    'Untuk tampilan, satu `role="img"` dengan `aria-label` ("4 dari 5 bintang") dan span biasa; jangan pernah lima pengumuman terpisah.',
    'Pasangkan bintang dengan angkanya sebagai teks saat rata-rata penting (4,2).',
  ],
  do: [
    'Ajukan satu pertanyaan yang jelas di atas bintang.',
    'Biarkan orang mengubah penilaiannya; ucapkan terima kasih di tempat, bukan lewat dialog.',
  ],
  dont: [
    'Memakai setengah bintang untuk input.',
    'Memakai bintang untuk pertanyaan ya atau tidak.',
  ],
  js: 'Tidak ada di sistem. Setel `.on` dan `aria-checked` saat diklik, `.preview` saat hover, dan tangani tombol panah di kode Anda.',
};
