export default {
  summary: 'Tenang secara bawaan: elemen tiba dengan spring tanpa overshoot, pergi lebih cepat dengan kurva yang makin cepat, mulai dari posisi mana pun saat diinterupsi, dan hanya memantul setelah gestur yang membawa momentum. Setiap nilai berasal dari token; resep di grup ini menyebut token yang dipakai.',
  when: [
    'Sebelum menambahkan gerakan apa pun: baca halaman ini, lalu pilih resep yang cocok dengan situasinya alih-alih menulis animasi baru.',
    'Memilih durasi atau kurva untuk komponen yang belum dimiliki sistem (lalu tambahkan ke sistem, bukan ke halaman).',
    'Meninjau layar yang "terasa lambat", "terasa murahan", atau "melompat": periksa terhadap enam aturan di bawah.',
  ],
  whenNot: [
    ['Tekanan pada kontrol', 'press-feedback'],
    ['Sesuatu yang terbuka, tertutup, tiba, atau pergi', 'enter-and-exit'],
    ['Penanda yang berpindah antar-pilihan (tab, segmented, sidebar)', 'sliding-indicator'],
    ['Konten yang terbuka atau tertutup di dalam alur (accordion, tutup)', 'height-expand'],
    ['Sekelompok butir yang tiba bersamaan', 'list-stagger'],
    ['Mengganti satu tampilan dengan tampilan lain di tempat yang sama', 'view-swap'],
    ['Thumbnail yang membesar menjadi tampilan penuh', 'shared-element'],
    ['Angka yang berubah', 'number-count'],
    ['Menyeret, menjentikkan, swipe', 'drag-and-momentum'],
    ['Gambar yang muncul saat halaman di-scroll', 'reveal-on-scroll'],
    ['Apa yang berubah saat orang meminta gerakan dikurangi', 'reduced-motion'],
  ],
  where: 'Di mana saja, lewat token di `css/tokens.css`. Gerakan tinggal di CSS komponen; halaman tidak menambahkan transisinya sendiri ke komponen sistem.',
  examples: [
    {
      title: 'Masuk pelan, keluar cepat',
      desc: 'Menu tumbuh dari pemicunya dengan smooth spring (560 ms, tanpa overshoot) dan pergi dalam 180 ms dengan kurva keluar. Membuka adalah informasi; menutup sebaiknya cepat menyingkir.',
      html: `<div style="position: relative; display: inline-block;">
  <button class="btn btn--gray btn--md" data-lds-menu="mp-menu" aria-haspopup="menu" aria-expanded="false">Urutkan laporan<span class="ic" aria-hidden="true">expand_more</span></button>
  <div class="menu" id="mp-menu" role="menu" style="top: calc(100% + 6px); left: 0;">
    <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">event</span>Tanggal lapor</button>
    <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">school</span>Jenis layanan</button>
    <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">schedule</span>Baru ditambahkan</button>
  </div>
</div>`,
    },
    {
      title: 'Bisa diinterupsi',
      desc: 'Klik cepat di antara pilihan. Thumb tidak pernah menuntaskan perjalanan yang sudah basi: setiap klik mengalihkannya dari posisinya saat itu, karena ini transisi CSS, bukan animasi keyframe.',
      html: `<div class="seg seg--lg" role="group" aria-label="Rentang" data-lds-segmented style="width: 340px;">
  <span class="seg__thumb"></span>
  <button class="seg__btn" aria-pressed="true">Minggu</button>
  <button class="seg__btn" aria-pressed="false">Bulan</button>
  <button class="seg__btn" aria-pressed="false">Triwulan</button>
  <button class="seg__btn" aria-pressed="false">Tahun</button>
</div>`,
    },
    {
      title: 'Jalur kembali yang sama, pantulan harus layak',
      desc: 'Sheet naik dari bawah dan turun kembali ke bawah; drawer pergi ke sisinya. Buka sheet lalu jentikkan: hanya seretan yang dilepas yang memantul dengan sedikit overshoot.',
      html: `<div class="viewport docs-box" data-lds-push="mp-sheet">
  <div class="viewport__content">
    <p class="card__title">Kunjungan puskesmas, Selasa</p>
    <div class="docs-row">
      <button class="btn btn--secondary btn--md" data-lds-open="mp-sheet" aria-haspopup="dialog">Catat kehadiran</button>
      <button class="btn btn--secondary btn--md" data-lds-open="mp-drawer" aria-haspopup="dialog"><span class="ic" aria-hidden="true">tune</span>Filter</button>
    </div>
  </div>
  <div class="scrim" data-lds-scrim="mp-sheet"></div>
  <div class="sheet" id="mp-sheet" role="dialog" aria-modal="true" aria-labelledby="mp-sheet-t" data-lds-layer>
    <div class="sheet__grabber" aria-hidden="true"></div>
    <div class="sheet__head" data-lds-drag><h3 class="sheet__title" id="mp-sheet-t">Catat kehadiran</h3></div>
    <div class="list list--fill"><button class="lrow"><span class="lrow__body"><span class="lrow__title">Hadir</span></span></button><button class="lrow"><span class="lrow__body"><span class="lrow__title">Terlambat, dengan alasan</span></span></button><button class="lrow"><span class="lrow__body"><span class="lrow__title">Batal dengan pemberitahuan</span></span></button></div>
    <button class="btn btn--primary btn--block" style="margin-top: 16px;" data-lds-close>Simpan kehadiran</button>
  </div>
  <div class="scrim" data-lds-scrim="mp-drawer"></div>
  <aside class="drawer" id="mp-drawer" role="dialog" aria-modal="true" aria-labelledby="mp-drawer-t" data-lds-layer>
    <div class="sheet__head" style="margin: 0;"><h3 class="sheet__title" id="mp-drawer-t">Filter</h3><button class="icon-btn" aria-label="Tutup filter" data-lds-close style="margin: -10px -10px -10px 0;"><span class="ic" aria-hidden="true">close</span></button></div>
    <label class="check"><input type="checkbox" checked><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path></svg></span><span class="check__text">Perlu tindak lanjut</span></label>
    <button class="btn btn--primary btn--block" style="margin-top: auto;" data-lds-close>Tampilkan 12 hasil</button>
  </aside>
</div>`,
    },
  ],
  variants: [
    ['--d-instant (120ms)', 'Warna hover, perubahan warna kecil. Tekanan memakai 90 ms di komponen.'],
    ['--d-fast (160ms)', 'Opacity dan warna, pudar masuk overlay.'],
    ['--d-exit (180ms)', 'Apa pun yang pergi: menu, dialog, toast. Pasangkan dengan `--ease-exit`.'],
    ['--d-standard (240ms)', 'Pergantian teks, panel tab, scrim, pudar.'],
    ['--d-snappy (360ms) + --spring-snappy', 'Damping 1.0, response 0,27 s. Tekanan yang dilepas, toggle, thumb, indikator kecil, pergantian ikon.'],
    ['--d-considered (480ms) + --ease-inout', 'Hal yang sudah tampil berganti nilai: progress bar, ring, data grafik.'],
    ['--d-smooth (560ms) + --spring-smooth', 'Damping 1.0, response 0,42 s. Panel, sheet, dialog, indikator geser, perubahan tinggi.'],
    ['--d-momentum (600ms) + --spring-momentum', 'Damping 0.8: overshoot 1,5%. Hanya setelah seretan atau jentikan yang dilepas.'],
    ['--ease-enter', 'cubic-bezier(0.16, 1, 0.3, 1). Pudar masuk, teks, kemunculan kecil.'],
    ['--ease-standard', 'cubic-bezier(0.22, 1, 0.36, 1). Perubahan warna dan state.'],
    ['--ease-inout', 'cubic-bezier(0.65, 0, 0.35, 1). Sesuatu yang sudah terlihat bergerak ke nilai baru.'],
    ['--ease-exit', 'cubic-bezier(0.7, 0, 0.84, 0). Penutupan; makin cepat saat pergi.'],
  ],
  motion: [
    '**Tanggapi saat ditekan.** Umpan balik dimulai saat pointer turun, dalam 90 ms, dan dilepas dengan `--spring-snappy`. Lihat [press feedback](press-feedback).',
    '**Masuk pelan, keluar cepat.** Gerakan masuk 240 sampai 560 ms dengan spring atau `--ease-enter`; gerakan keluar 160 sampai 260 ms dengan `--ease-exit` (180 ms untuk yang kecil, sampai 260 ms untuk sheet yang menempuh seluruh tingginya). Gerakan keluar tidak pernah memantul.',
    '**Jalur kembali yang sama.** Yang naik dari bawah turun ke bawah; drawer pergi ke sisinya; menu tumbuh dari dan kembali ke sudut terdekat dengan pemicunya (`transform-origin`, `menu--right`, `menu--up`).',
    '**Pantulan harus layak.** `--spring-momentum` hanya setelah gestur yang membawa momentum (sheet yang dijentikkan, kenop geser yang dilepas). Semua yang dibuka dengan ketukan memakai damping 1.0.',
    '**Bisa diinterupsi.** Semua yang bisa dibalik orang memakai transisi CSS, yang dimulai dari nilai saat itu. Keyframe hanya untuk kejadian sekali (goyang, dering, gerakan masuk yang tidak pernah dibalik). Jangan pernah memblokir input selama sesuatu bergerak.',
    '**Reduced motion.** Di bawah `prefers-reduced-motion: reduce` setiap transisi menjadi 120 ms linear, keyframe diputar sekali dalam 1 ms, dialog dan menu berhenti berubah skala, shimmer dan percikan berhenti; spinner tetap berputar. Lihat [reduced motion](reduced-motion).',
    'Hanya `transform`, `opacity`, `filter`, dan `grid-template-rows` (untuk tinggi) yang dianimasikan. Jangan pernah `top`, `left`, `width`, atau `height` dari elemen di dalam alur, kecuali beberapa komponen yang mengukur (text morph, konfirmasi di tempat, label toolbar).',
  ],
  a11y: [
    'Gerakan tidak pernah menjadi satu-satunya sinyal: setiap perubahan state juga mengubah kata, ikon, atau atribut role/ARIA.',
    'Jangan pernah memblokir input selama transisi; klik kedua mengalihkan gerakan, bukan diabaikan.',
    'Tidak ada loop dekoratif tanpa akhir. Loop yang melaporkan pekerjaan (spinner, shimmer, berpikir) berhenti saat pekerjaannya berhenti.',
  ],
  do: [
    'Pilih resep dari grup ini beserta tokennya sebelum menulis `transition` apa pun.',
    'Pakai transisi untuk state, keyframe hanya untuk kejadian sekali.',
    'Pergi dengan `--ease-exit` dalam 180 ms; masuk dengan spring.',
  ],
  dont: [
    'Mengarang durasi atau kurva bezier di halaman.',
    'Memantulkan apa pun yang dibuka dengan ketukan, atau memudarkan naik setiap elemen saat scroll.',
    'Menganimasikan properti layout atau memakai `transition: all`.',
    'Membuat orang menunggu animasi sebelum bisa bertindak.',
  ],
  js: 'Token adalah CSS custom property; baca di JS dengan `getComputedStyle(document.documentElement).getPropertyValue(\'--d-smooth\')`. Perilaku di `js/lds.js` sudah memakainya dan sudah memeriksa `prefers-reduced-motion`.',
};
