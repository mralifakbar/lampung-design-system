const RESET = (key) => `import('../../js/lds.js').then((m) => { m.resetHints(['${key}']); const box = this.closest('.docs-col'); const h = box.querySelector('.hint'); h.hidden = false; box.querySelector('.collapse').classList.remove('is-closed'); });`;

export default {
  summary: 'Tip singkat yang mengajarkan pintasan atau gestur, hanya tampil pada beberapa kunjungan pertama dan hilang selamanya setelah ditutup. Makin sering dipakai, makin jarang muncul: saat orang sudah paham caranya, petunjuk itu sudah pensiun sendiri.',
  when: [
    'Gestur atau pintasan yang tidak terlihat: swipe sebuah baris, tekan / untuk mencari, tekan lama untuk pilihan lain.',
    'Fitur yang sering terlewat saat uji coba, dan satu baris tip sudah cukup.',
  ],
  whenNot: [
    ['Tur terpandu yang menunjuk bagian layar', 'coachmark'],
    ['Sesuatu yang salah atau penting saat ini', 'alert'],
    ['Menjelaskan istilah di samping label', 'tooltip', 'Pakai info tip.'],
    ['Pesan setelah sebuah aksi', 'toast'],
    ['Bantuan yang harus selalu ada', 'prose'],
  ],
  where: 'Tepat di atas atau di samping hal yang diajarkan: di atas daftar yang bisa di-swipe, di sebelah kolom pencarian yang punya pintasan. Paling banyak satu petunjuk per layar. Bungkus dengan `.collapse` agar ruangnya ikut menutup saat petunjuk ditutup.',
  anatomy: [
    ['.hint', 'Wajib. `data-lds-hint="<key>"`, `data-max="3"`, `role="note"`. Warna aksen tipis, ikon, satu kalimat dengan kata kunci ditebalkan.'],
    ['.hint__close', 'Wajib. `data-lds-hint-close`, `aria-label="Sembunyikan petunjuk ini"`. Langsung memensiunkan petunjuk.'],
    ['.collapse', 'Pembungkus yang disarankan: saat ditutup, ruangnya menyusut, halaman tidak melompat.'],
  ],
  examples: [
    {
      title: 'Mengajarkan gestur',
      desc: 'Tampil pada tiga kunjungan pertama ke halaman ini. Tutup dan petunjuk hilang selamanya; Tampilkan lagi mengaturnya ulang (di produk nyata, dari menu bantuan).',
      html: `<div class="docs-col" style="max-width: 420px;">
  <div class="collapse"><div><div class="hint" data-lds-hint="docs-swipe-rows" data-max="3" role="note"><span class="ic" aria-hidden="true">touch_app</span><span><b>Geser baris ke kiri</b> untuk menyematkan, mengarsipkan, atau menghapusnya.</span><button class="hint__close" data-lds-hint-close aria-label="Sembunyikan petunjuk ini"><span class="ic ic--sm" aria-hidden="true">close</span></button></div></div></div>
  <div class="list">
    <div class="lrow"><span class="lrow__body"><span class="lrow__title">Tanggapan laporan jalan rusak</span><span class="lrow__sub">Dua catatan dari petugas lapangan</span></span></div>
    <div class="lrow"><span class="lrow__body"><span class="lrow__title">Jadwal posyandu berubah</span><span class="lrow__sub">Pindah ke balai warga RW 04</span></span></div>
  </div>
  <button class="btn btn--plain btn--sm" style="align-self: flex-start; margin-left: -10px;" onclick="${RESET('docs-swipe-rows')}"><span class="ic" aria-hidden="true">refresh</span>Tampilkan petunjuk lagi</button>
</div>`,
      code: `<div class="collapse"><div>
  <div class="hint" data-lds-hint="swipe-rows" data-max="3" role="note">
    <span class="ic" aria-hidden="true">touch_app</span>
    <span><b>Geser baris ke kiri</b> untuk menyematkan, mengarsipkan, atau menghapusnya.</span>
    <button class="hint__close" data-lds-hint-close aria-label="Sembunyikan petunjuk ini"><span class="ic ic--sm" aria-hidden="true">close</span></button>
  </div>
</div></div>
<!-- Help menu: import { resetHints } from 'lampung-design-system/js'; resetHints(); -->`,
    },
    {
      title: 'Mengajarkan pintasan',
      desc: 'Pintasan keyboard di samping pencarian yang dibukanya, untuk lima kunjungan pertama.',
      html: `<div class="docs-col" style="max-width: 420px;">
  <div class="collapse"><div><div class="hint" data-lds-hint="docs-slash-search" data-max="5" role="note"><span class="ic" aria-hidden="true">search</span><span>Tekan <span class="kbd">/</span> untuk mencari layanan dari halaman mana pun.</span><button class="hint__close" data-lds-hint-close aria-label="Sembunyikan petunjuk ini"><span class="ic ic--sm" aria-hidden="true">close</span></button></div></div></div>
  <div class="control search"><span class="ic" aria-hidden="true">search</span><input aria-label="Cari layanan" placeholder="Cari layanan"></div>
  <button class="btn btn--plain btn--sm" style="align-self: flex-start; margin-left: -10px;" onclick="${RESET('docs-slash-search')}"><span class="ic" aria-hidden="true">refresh</span>Tampilkan petunjuk lagi</button>
</div>`,
    },
  ],
  states: [
    ['shown', 'Jumlah kunjungan yang tercatat masih di bawah `data-max`; jumlahnya bertambah satu setiap halaman dimuat (`data-seen`).'],
    ['retired', 'Setelah `data-max` kunjungan, atau begitu ditutup: `hidden`, dan `.collapse` di sekitarnya menutup.'],
    ['reset', '`resetHints([keys])` menghapus hitungan, jadi petunjuk tampil lagi saat halaman dimuat berikutnya.'],
  ],
  motion: [
    'Petunjuk sendiri tidak dianimasikan saat masuk: ia sudah menjadi bagian halaman saat halaman tampil.',
    'Menutup akan menyusutkan `.collapse` pembungkusnya: baris ke `0fr` dengan `--spring-smooth` (560 ms) sambil memudar selama `--d-standard`, jadi konten di bawahnya meluncur naik.',
    'Reduced motion: penutupan berlangsung 120 ms.',
  ],
  a11y: [
    '`role="note"`: dibaca di tempatnya, tidak diumumkan sebagai peringatan.',
    'Tombol tutup punya `aria-label`. Setelah ditutup, pindahkan fokus ke hal yang dijelaskan petunjuk jika fokus sebelumnya ada di tombol tutup.',
    'Sebutkan gesturnya beserta padanan keyboard atau tombolnya bila ada.',
  ],
  do: [
    'Beri setiap petunjuk key yang tetap dan `data-max` kecil (3 sampai 5).',
    'Biarkan orang memunculkan lagi petunjuk dari menu bantuan dengan `resetHints()`.',
    'Cukup satu kalimat dengan aksinya ditebalkan.',
  ],
  dont: [
    'Menampilkan lebih dari satu petunjuk di satu layar.',
    'Memakai petunjuk untuk error atau pengumuman.',
    'Menyembunyikan satu-satunya jalan ke sebuah aksi di balik petunjuk.',
  ],
  js: '`[data-lds-hint]` saat `init()` mencatat kunjungan di `localStorage` (`lds-hint:<key>`) dan menyembunyikan petunjuk setelah hitungannya mencapai `data-max`; `[data-lds-hint-close]` langsung memensiunkannya dan menutup `.collapse`-nya. `resetHints(keys?)` menghapus semua hitungan atau hanya yang disebut. Jika storage diblokir, petunjuk selalu tampil.',
};
