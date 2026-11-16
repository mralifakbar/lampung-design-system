const SWAP = (a, b, fillB = false) => `<span class="swap" aria-hidden="true"><span class="ic swap__a">${a}</span><span class="ic${fillB ? ' ic--fill' : ''} swap__b">${b}</span></span>`;
const TOGGLE = (on, off) => `this.querySelector('.swap').classList.toggle('is-swapped'); const p = this.getAttribute('aria-pressed') !== 'true'; this.setAttribute('aria-pressed', String(p)); this.setAttribute('aria-label', p ? '${on}' : '${off}');`;

export default {
  summary: 'Satu glyph berubah menjadi glyph lain di tempatnya: yang lama mengecil ke setengah dan memudar kabur, sementara yang baru mendarat dengan spring yang sigap. Untuk ikon yang menyatakan status baru (tersalin, diputar, tersimpan), bukan untuk hiasan.',
  when: [
    'Tombol salin mengonfirmasi berhasil: `content_copy` berubah menjadi `check` selama 1,6 detik ([tombol salin](copy-button) melakukannya).',
    'Toggle yang ikonnya menyebut status: putar dan jeda, tandai dan tersimpan, tampilkan dan sembunyikan kata sandi.',
    'Tombol ikon yang aksinya berubah setelah dipakai: buka dan tutup saat labelnya tidak tampil.',
  ],
  whenNot: [
    ['Kata yang berubah (Simpan, Tersimpan)', 'text-morph'],
    ['Dukungan dengan jumlah dan perayaan', 'like'],
    ['Ikon menu ke ikon tutup', 'menu-icon', 'Tiga garisnya melipat, bukan bertukar.'],
    ['Chevron yang berputar bersama panel yang terbuka', 'height-expand', 'Putar dengan spring yang sama dengan panelnya.'],
    ['Status terpilih yang hanya mengisi ikon (tab bar, sidebar)', 'sliding-indicator'],
  ],
  where: 'Di dalam tombol: [tombol ikon](icon-button), tombol polos kecil di samping label, bilah blok kode. Kotak swap berukuran 20 px; kedua glyph berada di sel grid yang sama.',
  anatomy: [
    ['.swap', 'Wajib. Grid inline `aria-hidden`, 20 × 20.'],
    ['.swap__a', 'Wajib. Glyph saat diam.'],
    ['.swap__b', 'Wajib. Glyph lainnya (tambahkan `ic--fill` untuk status terisi).'],
    ['.is-swapped', 'Pada `.swap`: menampilkan `swap__b`.'],
  ],
  examples: [
    {
      title: 'Salin, lalu tersalin',
      desc: 'Tekan salin: ikon menjadi centang dan labelnya berbunyi Tersalin, lalu keduanya kembali setelah 1,6 detik.',
      html: `<div class="codeblock" style="width: 100%; max-width: 420px;"><div class="codeblock__bar"><span>Instalasi</span><button class="btn btn--plain btn--sm" data-lds-copy="npm install lampung-design-system">${SWAP('content_copy', 'check')}<span data-lds-copy-label="Tersalin">Salin</span></button></div><pre>npm install lampung-design-system</pre></div>
<button class="icon-btn" aria-label="Salin tautan undangan" data-lds-copy="https://campus.ac.id/join/BIO101">${SWAP('link', 'check')}</button>`,
    },
    {
      title: 'Putar dan jeda',
      desc: 'Rekaman sosialisasi. Ikonnya adalah status, jadi ikon itu bertukar; labelnya ikut berubah untuk pembaca layar.',
      html: `<button class="icon-btn icon-btn--accent" aria-pressed="false" aria-label="Putar rekaman" onclick="${TOGGLE('Jeda rekaman', 'Putar rekaman')}">${SWAP('play_arrow', 'pause')}</button>
<span class="card__sub">Sosialisasi pajak daerah, 48 menit</span>`,
    },
    {
      title: 'Simpan untuk nanti',
      desc: 'Menandai sebuah layanan: ikon garis bertukar ke ikon terisi. Sengaja tenang; tanpa jumlah dan tanpa ledakan.',
      html: `<button class="icon-btn" aria-pressed="false" aria-label="Simpan layanan" onclick="${TOGGLE('Layanan tersimpan', 'Simpan layanan')}">${SWAP('bookmark', 'bookmark', true)}</button>
<button class="icon-btn" aria-pressed="false" aria-label="Tampilkan kata sandi" onclick="${TOGGLE('Sembunyikan kata sandi', 'Tampilkan kata sandi')}">${SWAP('visibility', 'visibility_off')}</button>`,
    },
  ],
  motion: [
    'Glyph yang pergi: ke `scale(0.5)` dengan `blur(4px)` dan opacity 0; opacity dan blur selama `--d-fast` (160 ms) dengan `--ease-standard`, skala dengan `--spring-snappy`.',
    'Glyph yang datang: dari keadaan yang sama ke `none` dengan `--spring-snappy` (`--d-snappy`, 360 ms) sambil muncul perlahan selama `--d-fast`. Keduanya berjalan bersamaan, jadi pertukaran terbaca sebagai satu objek yang berubah.',
    'Interupsi: mengubah `.is-swapped` lagi di tengah pertukaran membalikkan kedua glyph dari posisi saat ini.',
    'Reduced motion: cross-fade 120 ms tanpa skala.',
  ],
  a11y: [
    'Swap diberi `aria-hidden`. Tombolnya yang membawa makna: `aria-pressed` untuk toggle, dan `aria-label` yang menyebut aksi yang kini tersedia ("Jeda rekaman").',
    'Salin tidak mengumumkan apa pun dengan sendirinya; bila penting, pertahankan label terlihat yang berubah (`data-lds-copy-label`) atau tambahkan status polite.',
  ],
  do: [
    'Tukar dua glyph yang menyatakan dua status dari hal yang sama.',
    'Ubah `aria-label` atau `aria-pressed` bersama glyph-nya.',
    'Pakai `ic--fill` pada `swap__b` untuk status "aktif" yang terisi.',
  ],
  dont: [
    'Memutar atau membalik ikon untuk menukarnya.',
    'Menukar ikon saat hover.',
    'Memakai swap untuk menu ke tutup; pakai [menu icon](menu-icon).',
  ],
  js: 'Hanya CSS: pasang atau lepas `.is-swapped` pada `.swap`. `[data-lds-copy]` melakukannya untuk tombol salin (dan mengembalikannya setelah 1,6 detik, dengan `data-lds-copy-label` untuk label yang terlihat).',
};
