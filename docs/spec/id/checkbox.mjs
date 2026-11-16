const BOX = '<span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span>';
const cb = (text, sub, checked, extra = '') => `<label class="check"><input type="checkbox"${checked ? ' checked' : ''}${extra}>${BOX}<span class="check__text">${text}${sub ? `<small>${sub}</small>` : ''}</span></label>`;

const ALL = `const kids = [...document.querySelectorAll('#ck-kids input')]; kids.forEach((k) => (k.checked = this.checked)); this.closest('.check').classList.remove('is-mixed'); this.indeterminate = false;`;
const KID = `const kids = [...document.querySelectorAll('#ck-kids input')], all = document.getElementById('ck-all'), n = kids.filter((k) => k.checked).length; all.checked = n === kids.length; all.indeterminate = n > 0 && n < kids.length; all.closest('.check').classList.toggle('is-mixed', all.indeterminate);`;

export default {
  summary: 'Checkbox bawaan dengan centang yang digambar, untuk pilihan ya atau tidak yang saling lepas dan disimpan bersama formulir. Beberapa bisa menyala sekaligus; setiap label menyebut arti menyalakannya.',
  when: [
    'Beberapa opsi saling lepas di formulir, berapa pun bisa menyala: notifikasi apa yang diterima, dokumen apa yang dilampirkan.',
    'Satu persetujuan sebelum mengirim: "Saya sudah membaca syarat layanan".',
    'Memilih baris di daftar atau tabel untuk ditindaklanjuti bersama (dengan "pilih semua" yang bisa berstatus campuran).',
  ],
  whenNot: [
    ['Pengaturan yang langsung berlaku, tanpa tombol Simpan', 'switch'],
    ['Tepat satu dari beberapa opsi', 'radio'],
    ['Filter yang berlaku saat diketuk, ditampilkan sebagai baris', 'chips'],
    ['Opsi yang masing-masing butuh deskripsi, harga, atau ikon', 'radio-card', 'Untuk satu pilihan; untuk beberapa, checkbox dengan baris kedua `small`'],
    ['Menandai tugas selesai di daftar periksa yang bukan formulir', 'list', 'Baris tercentang (`.lrow--check`) menunjukkan apa yang selesai'],
  ],
  where: 'Di [formulir](form-layout), bertumpuk dalam kolom berjarak 12 px, di dalam `<fieldset>` dengan `<legend>` saat menjadi bagian dari satu pertanyaan. Di baris daftar dan tabel, di awal baris. Jangan pernah lebih dari dua dalam satu baris horizontal di ponsel.',
  anatomy: [
    ['label.check', 'Wajib. Seluruh baris adalah area sentuh; teks turun baris di samping kotak.'],
    ['input[type=checkbox]', 'Wajib. Input bawaan, tak terlihat di atas kotak, agar keyboard, formulir, dan pembaca layar berfungsi seperti biasa.'],
    ['.check__box', 'Wajib. Kotak 22 px dengan SVG: `path.tick` untuk tercentang, `path.dash` untuk campuran. `aria-hidden`.'],
    ['.check__text', 'Wajib. Teks label; `small` di dalamnya menambahkan baris kedua yang tenang.'],
    ['fieldset + legend', 'Mengelompokkan checkbox terkait di bawah satu pertanyaan.'],
  ],
  examples: [
    {
      title: 'Pilihan notifikasi',
      desc: 'Centang tergambar setelah jeda singkat; menghapus centang menghilangkannya lebih cepat. Baris kedua menjelaskan akibatnya.',
      html: `<fieldset class="stack" style="border: 0;">
  <legend class="field__label" style="margin-bottom: 12px;">Kirimi saya email saat</legend>
  ${cb('Status permohonan berubah', 'Begitu petugas memperbaruinya', true)}
  ${cb('Batas waktu tinggal 24 jam', '', true)}
  ${cb('Ada balasan untuk laporan saya', 'Paling banyak satu email sehari')}
</fieldset>`,
    },
    {
      title: 'Pilih semua, dengan status campuran',
      desc: 'Saat sebagian tetapi tidak semua menyala, induknya menampilkan garis dan melaporkan "campuran". Ubah anak-anaknya untuk melihatnya.',
      html: `<div class="stack">
  ${cb('Semua dokumen', '', false, ` id="ck-all" onchange="${ALL}"`).replace('class="check"', 'class="check is-mixed"')}
  <div class="stack" id="ck-kids" style="padding-left: 34px;">
    ${cb('Fotokopi KTP', '', true, ` onchange="${KID}"`)}
    ${cb('Kartu keluarga', '', false, ` onchange="${KID}"`)}
    ${cb('Surat pengantar RT', '', false, ` onchange="${KID}"`)}
  </div>
</div>
<img alt="" hidden src="data:," onerror="const a = document.getElementById('ck-all'); if (a) a.indeterminate = true;">`,
      code: `<label class="check is-mixed">
  <input type="checkbox" id="all-subjects">
  <span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span>
  <span class="check__text">Semua dokumen</span>
</label>
<script>document.getElementById('all-subjects').indeterminate = true;</script>`,
    },
    {
      title: 'Persetujuan dan nonaktif',
      desc: 'Satu checkbox sebelum pengiriman penting. Opsi nonaktif menyebut alasannya di baris kedua.',
      html: `<div class="stack">
  ${cb('Saya sudah membaca syarat layanan', 'Data yang dikirim harus sesuai dokumen asli')}
  ${cb('Ambil data dari permohonan sebelumnya', 'Tersedia setelah satu permohonan Anda selesai', false, ' disabled')}
</div>`,
    },
  ],
  states: [
    ['checked', 'Isian aksen dengan tampilan primary; centang tergambar.'],
    ['.is-mixed (on .check) + input.indeterminate', 'Isian aksen dengan garis. Setel `indeterminate = true` pada input lewat JS agar diumumkan sebagai campuran.'],
    ['hover', 'Tepi kotak menggelap ke `--text-subtle`.'],
    [':active', 'Kotak mengecil ke 0.88 dalam 90 ms.'],
    ['focus-visible', 'Focus ring pada kotak, dari input.'],
    ['disabled', 'Kotak dengan opasitas 40 %; sebutkan alasannya di baris `small`.'],
  ],
  motion: [
    'Centang: `stroke-dashoffset` 20 ke 0 dalam 260 ms dengan `--ease-enter`, setelah jeda 40 ms agar isian mendarat lebih dulu. Menghapus centang menghilangkannya dalam 160 ms dengan `--ease-exit`; keluar lebih cepat daripada masuk.',
    'Isian dan tepi: `background-color` dan `box-shadow` dalam `--d-fast` (160 ms) dengan `--ease-standard`.',
    'Tekan: `scale(0.88)` dalam 90 ms, kembali dengan `--spring-snappy` (360 ms). Umpan balik dimulai saat pointer turun.',
    'Campuran: garis tergambar dalam 200 ms dengan `--ease-enter`.',
    'Reduced motion: transisi menjadi 120 ms linear; centang tetap muncul.',
  ],
  a11y: [
    '`<input type="checkbox">` sungguhan di dalam `<label>`: Spasi mengubahnya, label menjadi namanya, formulir mengirimkannya.',
    'Kelompokkan dengan `<fieldset>` dan `<legend>` agar pertanyaannya dibacakan bersama setiap opsi.',
    'Status campuran: setel `input.indeterminate = true` (tidak ada atribut HTML-nya); `.is-mixed` saja hanya visual.',
    'Biarkan teks label tetap di label; baris kedua di `small` dibacakan sebagai bagiannya.',
  ],
  do: [
    'Rumuskan setiap label sebagai hal yang akan benar saat menyala.',
    'Mulai tanpa centang kecuali orang sudah memilih sebelumnya; jangan pernah mencentang persetujuan lebih dulu.',
  ],
  dont: [
    'Memakai checkbox untuk pengaturan yang langsung berlaku; pakai [switch](switch).',
    'Memakai satu checkbox sebagai pengalih antara dua status bernama ("Terang atau gelap"); pakai [segmented control](segmented-control).',
    'Menggambar kotak atau ikon centang sendiri; pakai `.check__box` dengan SVG-nya.',
  ],
};
