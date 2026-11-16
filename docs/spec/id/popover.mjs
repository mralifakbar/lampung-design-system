export default {
  summary: 'Kartu mengambang kecil yang tertambat pada tombol, untuk konten yang lebih kaya dari menu: formulir mini, penjelasan singkat dengan tautan, pengaturan cepat. Tidak menghalangi halaman.',
  when: [
    'Beberapa field atau kontrol yang terkait satu tombol: pasang pengingat, atur lebar kolom, ubah cepat tanggal tenggat.',
    'Penjelasan singkat yang sengaja dibuka, dengan format atau tautan di dalamnya.',
  ],
  whenNot: [
    ['Daftar perintah', 'dropdown-menu'],
    ['Label untuk ikon atau petunjuk satu baris saat hover', 'tooltip'],
    ['Pratinjau seseorang atau tautan saat hover', 'hover-card'],
    ['Tugas yang butuh fokus dan keputusan sebelum lanjut', 'dialog'],
    ['Memilih tanggal', 'date-field', 'Date field sudah memasangkan kontrol dengan popover kalendernya'],
  ],
  where: '8 px di bawah pemicunya, rata dengan tepi kirinya, lebar 300 px. Pemicu dan popover berbagi pembungkus `position: relative`; posisikan popover dengan `top`/`left` inline. Di ponsel, pakai [sheet](sheet) untuk apa pun yang berisi field.',
  anatomy: [
    ['trigger', 'Wajib. Tombol dengan `aria-haspopup="dialog"`, `aria-expanded`, dan `aria-controls` berisi id popover.'],
    ['.popover', 'Wajib. Kartu mengambang: 300 px, padding 16 px, terangkat dengan bayangan; `role="dialog"` dan `aria-label` (atau `aria-labelledby`).'],
    ['.popover.is-open', 'Wajib untuk menampilkannya.'],
  ],
  examples: [
    {
      title: 'Pasang pengingat',
      desc: 'Popover dibuka dan ditutup dari tombolnya, tumbuh dari atas, dan tertutup dengan Escape atau klik di luar.',
      html: `<div style="position: relative; align-self: flex-start;">
  <button class="btn btn--secondary btn--md" aria-haspopup="dialog" aria-expanded="false" aria-controls="po-remind" data-lds-menu="po-remind"><span class="ic" aria-hidden="true">notifications</span>Ingatkan saya</button>
  <div class="popover" id="po-remind" role="dialog" aria-labelledby="po-remind-t" style="top: calc(100% + 8px); left: 0;">
    <div class="stack" style="--gap: 12px;">
      <h3 class="section__title-sm" id="po-remind-t">Ingatkan saya tentang pajak kendaraan</h3>
      <label class="check"><input type="checkbox" checked><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path></svg></span><span class="check__text">Satu hari sebelum jatuh tempo</span></label>
      <label class="check"><input type="checkbox"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path></svg></span><span class="check__text">Satu jam sebelum jatuh tempo</span></label>
      <button class="btn btn--primary btn--md btn--block" onclick="setTimeout(() => document.body.click(), 0);">Pasang pengingat</button>
    </div>
  </div>
</div>`,
      code: `<div style="position: relative;">
  <button class="btn btn--secondary" aria-haspopup="dialog" aria-expanded="false" aria-controls="remind" data-lds-menu="remind">Ingatkan saya</button>
  <div class="popover" id="remind" role="dialog" aria-labelledby="remind-t" style="top: calc(100% + 8px); left: 0;">
    <h3 class="section__title-sm" id="remind-t">Ingatkan saya tentang pajak kendaraan</h3>
    …
  </div>
</div>`,
    },
    {
      title: 'Statis, terbuka',
      desc: 'Popover yang menjelaskan cara penilaian, dalam keadaan terbuka.',
      html: `<div style="position: relative; align-self: flex-start;">
  <button class="btn btn--plain btn--sm" aria-haspopup="dialog" aria-expanded="true" aria-controls="po-score">Bagaimana cara penilaiannya?</button>
  <div class="popover is-open" id="po-score" role="dialog" aria-label="Cara penilaian" style="top: calc(100% + 8px); left: 0;">
    <p class="section__sub">Setiap dokumen yang lengkap bernilai 5 poin, yang kurang 0. Dokumen opsional yang tidak dilampirkan tidak mengurangi nilai.</p>
  </div>
</div>`,
    },
  ],
  states: [
    ['.is-open', 'Terlihat dan bisa dipakai; pemicu memiliki `aria-expanded="true"`.'],
    ['closed', 'Transparan, sedikit diperkecil, `visibility: hidden` setelah animasi keluar.'],
  ],
  motion: [
    'Masuk: opacity selama `--d-fast` (160 ms) dengan `--ease-enter`; dari `scale(0.96) translateY(-4px)` dengan `--spring-smooth`, tumbuh dari tengah atas.',
    'Keluar: selama `--d-exit` (180 ms) dengan `--ease-exit`, lalu disembunyikan. Berupa transisi, sehingga buka-tutup cepat berbalik dengan mulus.',
    'Reduced motion: hanya memudar.',
  ],
  a11y: [
    'Non-modal: fokus tidak dikunci, halaman tetap bisa dipakai. Beri `role="dialog"` dan nama.',
    'Memindahkan fokus ke dalamnya saat dibuka dan kembali ke pemicu saat ditutup adalah tugas Anda, kecuali Anda memakai ulang hook menu (yang memfokuskan tombol pertamanya, menutup dengan Escape, dan mengembalikan fokus).',
    'Escape dan klik di luar menutupnya.',
  ],
  do: [
    'Batasi pada satu tugas kecil atau satu penjelasan.',
    'Tutup setelah aksi utama dijalankan.',
  ],
  dont: [
    'Menaruh formulir panjang atau tabel di popover.',
    'Membukanya saat hover; itu tugas [hover card](hover-card).',
    'Memakai popover padahal [dropdown menu](dropdown-menu) berisi perintah sudah cukup.',
  ],
  js: 'Tidak ada hook khusus: ubah `.is-open` dan `aria-expanded` sendiri, atau pakai ulang hook menu (`data-lds-menu="popoverId"` pada pemicu), yang membuka dan menutupnya, memfokuskan tombol pertamanya, menutup dengan Escape (fokus kembali ke pemicu) dan dengan klik di luar; panggil `closeMenus()` setelah aksi di dalam popover. Hindari kontrol yang memakai panah Atas dan Bawah di dalamnya: tombol itu ditangani sebagai tombol menu.',
};
