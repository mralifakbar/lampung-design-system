const sync = `const n = this.querySelectorAll('input:checked').length; const bar = document.getElementById('sb-bar'); bar.classList.toggle('is-open', n > 0); bar.inert = n === 0; document.getElementById('sb-count').textContent = n + ' dipilih';`;
const clear = `const list = document.getElementById('sb-list'); list.querySelectorAll('input:checked').forEach((i) => { i.checked = false; }); list.dispatchEvent(new Event('change')); list.querySelector('input').focus();`;
const row = (title, sub) => `    <label class="lrow" style="cursor: pointer;"><span class="check"><input type="checkbox" aria-label="Pilih ${title}"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path></svg></span></span><span class="lrow__body"><span class="lrow__title" style="display: block;">${title}</span><span class="lrow__sub" style="display: block;">${sub}</span></span></label>`;

export default {
  summary: 'Bilah gelap yang mengambang naik dari bawah selama item dalam daftar dipilih, berisi jumlahnya dan aksi untuk semuanya. Bilah pergi saat pilihan kosong.',
  when: [
    'Aksi massal pada daftar atau tabel yang itemnya dipilih: arsipkan 12 pesan, verifikasi 5 permohonan, ekspor 30 data pemohon.',
    'Mode pilih di ponsel, tempat toolbar di atas sulit dijangkau.',
  ],
  whenNot: [
    ['Aksi pada satu item', 'dropdown-menu', 'Pakai menu "lainnya" milik item itu'],
    ['Memastikan aksi massal sudah terjadi', 'toast'],
    ['Aksi halaman tetap yang tidak bergantung pada pilihan', 'page-header'],
    ['Menyimpan formulir', 'form-layout', 'Formulir diakhiri dengan aksinya sendiri'],
  ],
  where: 'Menempel di tengah bawah jendela, 20 px dari bawah (lebih di ponsel dengan home indicator), di atas konten dan di bawah dialog. Satu per halaman. Di ponsel dengan tab bar, angkat di atas bar.',
  anatomy: [
    ['.selbar[role=toolbar]', 'Wajib. Bilah mengambang: warna terbalik, tinggi 52 px, radius 16 px. Beri `aria-label`.'],
    ['.selbar__count', 'Wajib. "3 dipilih", angka tabular. Taruh di live region agar perubahannya diumumkan.'],
    ['.btn', 'Aksi massal, bergaya ulang untuk bilah terbalik (38 px, isian tenang). `btn--danger` untuk aksi destruktif.'],
    ['.icon-btn', 'Hapus pilihan, paling akhir, dengan `aria-label`.'],
    ['.selbar__label', 'Opsional. Bungkus kata-kata tombol dengannya (dan beri tombol `aria-label`) agar di bawah 520 px bilah hanya menyisakan ikon dan muat di ponsel.'],
    ['.roll', 'Opsional, di dalam hitungan: angkanya bergulir saat pilihan berubah (diatur oleh hook selection).'],
  ],
  examples: [
    {
      title: 'Verifikasi massal',
      desc: 'Pilih satu atau dua permohonan: bilah naik dari bawah kotak ini. Hapus pilihan dan bilah pergi. Di halaman, bilah menempel di bawah jendela.',
      html: `<div class="list" id="sb-list" style="max-width: 460px;" onchange="${sync}">
${row('Rina Wijaya', 'Izin usaha mikro · dikirim Senin')}
${row('Bayu Pratama', 'Izin usaha mikro · dikirim Selasa')}
${row('Sari Nugroho', 'Izin usaha mikro · melewati batas waktu')}
</div>
<div class="selbar" id="sb-bar" role="toolbar" aria-label="Permohonan terpilih" inert>
  <span class="selbar__count" id="sb-count" aria-live="polite">0 dipilih</span>
  <button class="btn btn--md"><span class="ic" aria-hidden="true">edit</span>Verifikasi</button>
  <button class="btn btn--md"><span class="ic" aria-hidden="true">download</span>Ekspor</button>
  <button class="icon-btn" aria-label="Hapus pilihan" onclick="${clear}"><span class="ic" aria-hidden="true">close</span></button>
</div>`,
      code: `<div class="selbar" role="toolbar" aria-label="Permohonan terpilih">
  <span class="selbar__count" aria-live="polite">3 dipilih</span>
  <button class="btn btn--md"><span class="ic" aria-hidden="true">edit</span>Verifikasi</button>
  <button class="btn btn--md"><span class="ic" aria-hidden="true">download</span>Ekspor</button>
  <button class="icon-btn" aria-label="Hapus pilihan"><span class="ic" aria-hidden="true">close</span></button>
</div>
<!-- add .is-open while one or more items are selected -->`,
    },
    {
      title: 'Dengan aksi destruktif',
      desc: 'Ditampilkan terbuka. Tombol danger adalah satu-satunya tempat `btn--danger` muncul di luar konfirmasi, karena ia membuka [alert dialog](alert-dialog) atau menghapus dengan toast Urungkan.',
      html: `<div class="selbar is-open" role="toolbar" aria-label="Pesan terpilih">
  <span class="selbar__count">12 dipilih</span>
  <button class="btn btn--md"><span class="ic" aria-hidden="true">inventory_2</span>Arsipkan</button>
  <button class="btn btn--md btn--danger"><span class="ic" aria-hidden="true">delete</span>Hapus</button>
  <button class="icon-btn" aria-label="Hapus pilihan"><span class="ic" aria-hidden="true">close</span></button>
</div>`,
    },
  ],
  states: [
    ['.is-open', 'Terlihat dan bisa dipakai selama minimal satu item dipilih.'],
    ['closed', 'Transparan, 16 px lebih rendah dan 2 % lebih kecil, `visibility: hidden` setelah animasi keluar.'],
  ],
  motion: [
    'Masuk: opacity selama `--d-fast` (160 ms) dengan `--ease-enter`; naik dari `translateY(16px) scale(0.98)` dengan `--spring-smooth` selama `--d-smooth`.',
    'Keluar: selama `--d-exit` (180 ms) dengan `--ease-exit`, lalu disembunyikan. Memilih lagi di tengah animasi keluar membaliknya, karena berupa transisi.',
    'Hitungan berubah di tempat; padukan dengan [rolling number](rolling-number) untuk jumlah besar jika perlu. Reduced motion: tanpa naik, memudar 120 ms.',
  ],
  a11y: [
    '`role="toolbar"` dengan `aria-label` yang menyebut apa yang dipilih.',
    'Hitungan berada di region `aria-live="polite"` sehingga "3 dipilih" diumumkan saat berubah.',
    'Buat `inert` (atau hapus) selama tertutup agar tombol tersembunyi tidak bisa dicapai dengan Tab. Menghapus pilihan sebaiknya mengembalikan fokus ke daftar.',
    'Setiap checkbox item punya label sendiri ("Pilih Rina Wijaya").',
  ],
  do: [
    'Batasi dua atau tiga aksi ditambah hapus pilihan.',
    'Pastikan hasilnya dengan [toast](toast) dan Urungkan bila memungkinkan.',
  ],
  dont: [
    'Menampilkan bilah saat tidak ada yang dipilih.',
    'Menaruh aksi satu item atau navigasi di dalamnya.',
    'Menumpuknya dengan bilah mengambang kedua.',
  ],
  js: '`data-lds-selection="barId"` pada list, tabel, atau kisi yang berisi checkbox `input[data-lds-select]` (dan `input[data-lds-select-all]` opsional) membuka dan menutup bilah, menggulirkan `.roll` di dalam `.selbar__count`, menjaga bilah tetap `inert` selama tertutup, mencentang rentang dengan Shift-klik, dan menghapus pilihan dengan Escape atau `[data-lds-select-clear]`; lihat [data table](data-table) dan [file tile](file-tile). Tanpa hook, ubah `.is-open` dari status pilihan Anda dan perbarui hitungannya. Bilah memakai `position: fixed`, jadi di dalam kontainer yang diberi transform ia menempel ke kontainer itu (seperti di demo ini).',
};
