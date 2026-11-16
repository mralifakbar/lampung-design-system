// Floor plan: bookable things drawn where they are (tables, rooms, desks), each a button colored by its state.
const t = (name, meta, area, tone = '', round = false, pressed = false, flag = '') => `<button class="floor__unit${round ? ' floor__unit--round' : ''}${tone ? ` floor__unit--${tone}` : ''}" type="button" aria-pressed="${pressed}" style="grid-area: ${area};">${flag ? `<span class="ic floor__flag" aria-hidden="true">${flag}</span>` : ''}<span class="floor__name">${name}</span><span class="floor__meta">${meta}</span></button>`;

const room = `<div class="stack" style="--gap: 12px;">
<div class="floor" tabindex="0" role="region" aria-label="Perpustakaan daerah, lantai dasar, bisa digulir ke samping" style="--cols: 10; --row: 56px; --min: 560px;">
  <div class="floor__plan">
    <span class="floor__zone" style="grid-area: 1 / 8 / 5 / 11;">Ruang tenang</span>
    ${t('A1', 'Kosong', '1 / 1 / 3 / 3', '', true)}
    ${t('A2', 'Dipesan 14.00', '1 / 3 / 3 / 5', 'accent', true)}
    ${t('A3', 'Dipakai', '1 / 5 / 3 / 7', 'strong', true, true)}
    ${t('B1', 'Dipakai', '3 / 1 / 4 / 4', 'strong')}
    ${t('B2', 'Kosong', '3 / 4 / 4 / 7')}
    ${t('Q1', 'Dibersihkan', '2 / 8 / 3 / 10', 'muted')}
    ${t('Q2', 'Kosong', '3 / 8 / 4 / 10')}
    ${t('C1', 'Rusak', '4 / 1 / 5 / 3', 'danger', false, false, 'warning')}
    ${t('C2', 'Dipesan 15.30', '4 / 3 / 5 / 5', 'accent')}
  </div>
</div>
<div class="floor__legend"><span class="floor__key">Kosong <b>3</b></span><span class="floor__key floor__key--accent">Dipesan <b>2</b></span><span class="floor__key floor__key--strong">Dipakai <b>2</b></span><span class="floor__key floor__key--muted">Dibersihkan <b>1</b></span><span class="floor__key floor__key--danger">Rusak <b>1</b></span></div>
</div>`;

const flowRoom = (n, tone, meta) => `<button class="floor__unit${tone ? ` floor__unit--${tone}` : ''}" type="button" aria-pressed="false"><span class="floor__name">${n}</span><span class="floor__meta">${meta}</span></button>`;
const floors = `<div class="floor floor--flow" style="--unit: 84px; --row: 60px; max-width: 640px;">
  <div class="floor__plan">
    <div class="floor__label">Lantai 2<small>6 ruang · 2 siap</small></div>
    ${flowRoom('201', 'success', 'Siap')}${flowRoom('202', 'strong', 'Dipakai')}${flowRoom('203', 'warning', 'Perlu dibersihkan')}${flowRoom('204', 'success', 'Siap')}${flowRoom('205', 'strong', 'Dipakai')}${flowRoom('206', 'muted', 'Tutup')}
    <div class="floor__label">Lantai 1<small>4 ruang · 1 siap</small></div>
    ${flowRoom('101', 'strong', 'Dipakai')}${flowRoom('102', 'warning', 'Perlu dibersihkan')}${flowRoom('103', 'success', 'Siap')}${flowRoom('104', 'accent', 'Dipesan 13.00')}
  </div>
</div>`;

export default {
  summary: 'Hal yang bisa dipesan digambar di tempatnya: meja di ruang makan, ruangan di satu lantai, meja belajar di perpustakaan. Masing-masing adalah tombol yang diwarnai menurut state-nya, dan state itu selalu tertulis juga dalam kata, sehingga orang menemukan yang kosong dari tempat dan namanya.',
  when: [
    'Letak sesuatu sama pentingnya dengan state-nya: meja di rumah makan, meja atau ruang belajar yang dipesan, tempat tidur di bangsal puskesmas.',
    'Ruangan sebuah gedung per lantai, tempat petugas mencari yang perlu ditangani (dibersihkan, diperiksa, rusak).',
    'Meja layanan depan yang sepanjang hari menempatkan, memindahkan, dan menggabungkan sesuatu, dan perlu melihat seluruh ruangan sekaligus.',
  ],
  whenNot: [
    ['Pemesanan selama beberapa hari atau jam, per ruangan atau orang', 'lanes'],
    ['Catatan yang dibandingkan menurut banyak atribut', 'data-table'],
    ['Beberapa butir yang letaknya tidak penting', 'list'],
    ['Pemberhentian satu perjalanan', 'route-schematic'],
  ],
  where: 'Selebar satu kartu penuh atau delapan dari dua belas kolom, dengan legenda di bawahnya. Denah berposisi tetap mempertahankan bentuknya: beri lebar `--min` dan denah bergulir ke samping di dalam kotaknya di ponsel. Denah mengalir (`.floor--flow`) menyusun ulang dirinya, jadi cocok untuk grid ruangan yang tidak punya geometri nyata.',
  anatomy: [
    ['.floor', 'Wajib. Kotak dengan isian tenang, padding 16 px, radius besar. Bergulir ke samping bila denahnya lebih lebar; beri `tabindex="0"`, `role="region"`, dan label untuk itu.'],
    ['.floor__plan', 'Wajib. Grid-nya. `--cols` kolom, `--row` tinggi baris (64 px), `--min` lebar tersempit sebelum kotaknya bergulir. Unit memakai `grid-area`.'],
    ['.floor--flow', 'Varian. Unit mengalir ke kolom selebar minimal `--unit` (96 px); `.floor__label` (dengan hitungan `small`) memulai setiap kelompok, misalnya lantai.'],
    ['button.floor__unit', 'Wajib. Satu meja, ruangan, atau meja kerja: `.floor__name` dan `.floor__meta` (state atau siapa yang ada di sana, dalam kata). `aria-pressed` menandai unit yang detailnya sedang terbuka. `--round` untuk meja bundar.'],
    ['.floor__flag', 'Opsional. Satu ikon di sudut untuk hal yang perlu dilihat (terlambat, permintaan, peringatan). Meta menyebutnya dalam kata.'],
    ['.floor__zone', 'Opsional. Area bergaris putus dengan namanya di belakang unit: kantin, teras, ruang tenang. Tidak interaktif.'],
    ['.floor__legend > .floor__key', 'Disarankan. Satu kunci per state dengan hitungan di `b`, dengan tone yang sama seperti unit.'],
  ],
  examples: [
    {
      title: 'Berposisi tetap: perpustakaan daerah',
      desc: 'Meja dan bilik di tempatnya. Dipesan, dipakai, dibersihkan, dan rusak masing-masing punya tone dan kata; bilik terpilih punya ring aksen. Persempit jendela: denah mempertahankan bentuknya dan bergulir di dalam kotaknya.',
      html: room,
    },
    {
      title: 'Mengalir: ruangan per lantai',
      desc: 'Tanpa geometri, hanya urutan: ruangan mengalir ke kolom sebanyak yang muat, label memulai setiap lantai dan menghitung yang siap.',
      html: floors,
    },
  ],
  variants: [
    ['(no tone)', 'Kosong atau tersedia: putih dengan ring tipis.'],
    ['.floor__unit--accent', 'Dipesan atau sudah ditempati tamu: tint aksen.'],
    ['.floor__unit--strong', 'Sedang dipakai, terisi: aksen penuh dengan teks putih. State paling sibuk, jadi yang paling dulu dilihat orang.'],
    ['.floor__unit--success | --warning | --danger', 'Siap atau sudah diperiksa; perlu perhatian (tagihan, dibersihkan); rusak atau diblokir.'],
    ['.floor__unit--muted', 'Tidak tersedia karena alasan biasa: tutup, sedang dibersihkan.'],
    ['.floor__unit--round', 'Meja bundar: lingkaran di area persegi, pil di area memanjang.'],
    ['.floor--flow', 'Ruangan berurutan, tersusun ulang menurut lebar, dikelompokkan dengan `.floor__label`.'],
  ],
  states: [
    ['hover', 'Ring menebal menjadi 1,5 px dengan tone unitnya.'],
    ['pressed', 'Mengecil ke 0,97 dan kembali dengan `--spring-snappy`.'],
    ['selected', '`aria-pressed="true"`: ring aksen 2 px di luar unit, terpisah dari isiannya.'],
    ['state changed', 'Tukar kelas tone dan kata meta: isian dan teks berganti selama `--d-standard`.'],
    ['loading', 'Pertahankan kotaknya; taruh blok `.skel` di grid area yang sama.'],
    ['empty', '[Empty state](empty-state) di dalam kotak: "Tidak ada meja di teras malam ini".'],
  ],
  motion: [
    'Perubahan tone (ditempati, lalu memesan, lalu menunggu tagihan) memudar silang isian dan teks selama `--d-standard` (240 ms), sehingga perubahan di lantai yang sibuk terlihat tanpa mencolok.',
    'Saat ditekan mengecil ke 0,97 selama 90 ms lalu memantul kembali dengan `--spring-snappy`.',
    'Tidak ada yang bergerak sendiri; unit tetap di tempat ruangannya menaruhnya. Reduced motion: tanpa skala saat ditekan, warna berubah selama 120 ms.',
  ],
  a11y: [
    'Setiap unit adalah tombol asli yang dinamai oleh teksnya: "T12, 4 tamu, sudah memesan". Taruh state di `.floor__meta`, jangan hanya lewat warna.',
    '`aria-pressed` menyebut unit mana yang detailnya terbuka. Buka detailnya di [drawer](drawer) dan kembalikan fokus ke unit saat drawer ditutup.',
    'Denah yang bergulir adalah `region` berlabel yang bisa difokus, sehingga bisa digulir dengan keyboard.',
    'Zona adalah teks untuk pembaca yang melihat; ulangi nama area di label unit yang membutuhkannya ("Teras, T21").',
  ],
  do: [
    'Namai unit seperti petugas menyebutnya (T12, 503) dan taruh state atau nama tamu di baris meta.',
    'Sertakan legenda dengan hitungan di bawah denah.',
    'Pakai tone terkuat untuk state yang paling penting di lantai itu.',
  ],
  dont: [
    'Menggambar dinding, kursi, atau perabot; denah adalah peta hal yang bisa dipesan.',
    'Memakai lebih dari lima tone dalam satu denah.',
    'Mengecilkan denah berposisi tetap sampai nama terpotong; biarkan bergulir.',
  ],
};
