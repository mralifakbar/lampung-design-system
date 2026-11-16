const box = (label, { on = false, dis = false, all = false } = {}) => `<label class="check"><input type="checkbox"${all ? ' data-lds-matrix-all' : ''}${on ? ' checked' : ''}${dis ? ' disabled' : ''} aria-label="${label}"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label>`;
const roles = ['Pemilik', 'Admin', 'Penyunting', 'Pembaca'];
const groupRow = (key, name) => `      <tr class="matrix__group" data-group="${key}"><th scope="rowgroup">${name}</th>${roles.map((r) => `<td>${box(`Semua izin ${name} untuk ${r}`, { all: true })}</td>`).join('')}</tr>`;
const permRow = (key, name, sub, on) => `      <tr data-group="${key}"><th scope="row">${name}<span class="matrix__sub">${sub}</span></th>${roles.map((r, i) => `<td>${box(`${r}: ${name}`, { on: on[i], dis: i === 0 })}</td>`).join('')}</tr>`;

export default {
  summary: 'Grid kotak centang: hal yang diputuskan di baris, dikelompokkan per area, dan pilihan di kolom. Header dan kolom pertama tetap di tempat saat kotaknya digulir, dan setiap area punya satu kotak centang per kolom untuk semuanya.',
  when: [
    'Izin per peran: peran mana yang boleh mengundang orang, melihat tagihan, mengekspor laporan.',
    'Notifikasi per kanal: peristiwa mana yang dikirim lewat email, push, dan SMS.',
    'Keputusan ya atau tidak untuk setiap pasangan dari dua daftar pendek (fitur per paket di admin, mata pelajaran per jurusan).',
  ],
  whenNot: [
    ['Beberapa pilihan bebas untuk satu hal', 'checkbox'],
    ['Pengaturan yang langsung berlaku, satu per baris', 'switch'],
    ['Paket yang dibandingkan di halaman harga, hanya dibaca', 'compare-table'],
    ['Catatan berisi nilai, bukan pilihan', 'data-table'],
  ],
  where: 'Selebar kolom isi, di dalam `.matrix-box`. Beri kotaknya tinggi (`--h`) bila barisnya panjang agar header tetap terlihat; di ponsel kotak bergulir ke samping dengan kolom pertama tetap. Simpan perubahan dengan tombol di sebelahnya bila pilihannya berdampak besar; selain itu simpan setiap perubahan dan konfirmasi dengan [toast](toast).',
  anatomy: [
    ['.matrix-box', 'Wajib. Kotak gulir: putih, ring, radius besar. `--h` mengatur tinggi maksimum. Beri `tabindex="0"`, `role="region"`, dan `aria-label` agar pengguna keyboard bisa menggulirnya.'],
    ['table.matrix[data-lds-matrix]', 'Wajib. Tabel asli dengan `caption` (boleh `sr-only`). `--min` mengatur lebar di bawah mana tabel bergulir (560 px), `--first` kolom pertama (220 px), `--col` setiap kolom pilihan (112 px).'],
    ['thead th', 'Pilihannya (peran, kanal), menempel di atas dengan isian tenang. `.matrix__sub` di bawah nama untuk jumlah.'],
    ['tr.matrix__group[data-group]', 'Baris judul area: `th[scope=rowgroup]` dan satu `input[data-lds-matrix-all]` per kolom.'],
    ['tr[data-group] > th[scope=row]', 'Wajib. Hal yang diputuskan, menempel di kiri, dengan baris `.matrix__sub` opsional.'],
    ['td > .check', 'Wajib. Satu [checkbox](checkbox) per sel dengan `aria-label` yang menyebut keduanya ("Admin: Undang orang"). Seluruh sel menjadi area klik.'],
  ],
  examples: [
    {
      title: 'Izin per peran',
      desc: 'Centang satu sel, atau centang area untuk satu kolom penuh: kotak area menampilkan campuran bila hanya sebagian yang aktif. Pemilik dikunci. Gulir kotaknya: header dan nama izin tetap di tempat.',
      html: `<div class="matrix-box" tabindex="0" role="region" aria-label="Izin per peran, bisa digulir" style="--h: 360px;">
  <table class="matrix" data-lds-matrix>
    <caption class="sr-only">Izin per peran</caption>
    <thead><tr><th scope="col">Izin</th>${roles.map((r, i) => `<th scope="col">${r}${i === 0 ? ' <span class="ic" aria-label="Dikunci">lock</span>' : ''}</th>`).join('')}</tr></thead>
    <tbody>
${groupRow('people', 'Anggota')}
${permRow('people', 'Undang orang', 'Kirim undangan lewat email', [1, 1, 0, 0])}
${permRow('people', 'Ubah peran', 'Naikkan atau turunkan peran anggota', [1, 1, 0, 0])}
${permRow('people', 'Keluarkan orang', '', [1, 0, 0, 0])}
${groupRow('billing', 'Tagihan')}
${permRow('billing', 'Lihat tagihan', '', [1, 1, 1, 0])}
${permRow('billing', 'Ganti paket', 'Kenaikan paket langsung ditagih', [1, 0, 0, 0])}
${groupRow('reports', 'Laporan')}
${permRow('reports', 'Lihat dasbor', '', [1, 1, 1, 1])}
${permRow('reports', 'Ekspor data', 'CSV dan PDF', [1, 1, 1, 0])}
    </tbody>
  </table>
</div>`,
    },
    {
      title: 'Notifikasi per kanal',
      desc: 'Grid yang sama dengan kanal sebagai kolom, tanpa area. Setiap perubahan langsung tersimpan.',
      html: `<div class="matrix-box" tabindex="0" role="region" aria-label="Notifikasi per kanal, bisa digulir" style="max-width: 520px;">
  <table class="matrix" data-lds-matrix style="--min: 420px; --first: 180px; --col: 88px;">
    <caption class="sr-only">Notifikasi per kanal</caption>
    <thead><tr><th scope="col">Peristiwa</th><th scope="col">Email</th><th scope="col">Push</th></tr></thead>
    <tbody>
      <tr><th scope="row">Disebut</th><td>${box('Email: Disebut', { on: true })}</td><td>${box('Push: Disebut', { on: true })}</td></tr>
      <tr><th scope="row">Ditugaskan ke saya</th><td>${box('Email: Ditugaskan ke saya', { on: true })}</td><td>${box('Push: Ditugaskan ke saya')}</td></tr>
      <tr><th scope="row">Ringkasan mingguan</th><td>${box('Email: Ringkasan mingguan', { on: true })}</td><td>${box('Push: Ringkasan mingguan')}</td></tr>
    </tbody>
  </table>
</div>`,
    },
  ],
  variants: [
    ['--h on .matrix-box', 'Tinggi maksimum: kotak bergulir vertikal dan header menempel.'],
    ['--min / --first / --col on .matrix', 'Lebar: di bawah `--min` kotak bergulir ke samping dengan kolom pertama tetap.'],
  ],
  states: [
    ['checked / unchecked', 'Centang [checkbox](checkbox) tergambar saat berubah.'],
    ['mixed', 'Kotak area menampilkan garis (`.check.is-mixed`, `indeterminate`) bila hanya sebagian sel di kolomnya yang aktif.'],
    ['locked', '`disabled` pada sel (peran yang tidak boleh diubah siapa pun); jelaskan alasannya di header (ikon `lock` dengan label) atau catatan.'],
    ['changed', '`.is-changed` pada sel (`td`-nya) yang belum disimpan: ring aksen di sekeliling kotak. Hapus setelah disimpan.'],
    ['new column', '`.is-new` pada sel kolom yang baru ditambahkan: sel menyala dengan tint aksen sekali.'],
    ['hover', 'Baris diberi tint di perangkat dengan pointer agar mata bisa mengikutinya.'],
  ],
  motion: [
    'Centang tergambar dengan `--ease-enter` (260 ms) dan menghilang dengan `--ease-exit` (160 ms), seperti [checkbox](checkbox); centang area menjalankan semua kotak di kolomnya sekaligus, tanpa jeda berurutan.',
    'Kolom baru menyala dengan tint aksen lalu memudar selama 1600 ms dengan `--ease-standard`, sekali saja.',
    'Tint baris saat hover muncul dalam 60 ms linear. Header dan kolom yang menempel tidak bergerak.',
    'Reduced motion: tanpa nyala; centang tetap berubah.',
  ],
  a11y: [
    'Ini `table` asli: pilihan adalah `th[scope=col]`, hal yang diputuskan `th[scope=row]`, area `th[scope=rowgroup]`, dengan `caption`.',
    'Setiap kotak centang punya `aria-label` yang menyebut baris dan kolomnya ("Admin: Undang orang"); kotak area berbunyi "Semua izin Anggota untuk Admin".',
    'Kotaknya bisa difokus dan berlabel agar pengguna keyboard bisa menggulirnya; Tab berpindah antar kotak centang sesuai urutan baca dan Space mencentang.',
    'Kolom yang dikunci menyatakannya dalam kata, bukan hanya dengan dibuat redup.',
  ],
  do: [
    'Kelompokkan baris per area bila jumlahnya lebih dari delapan.',
    'Tetapkan kolom pertama dan header; buat nama kolom singkat.',
    'Tunjukkan yang belum disimpan dan sediakan Batalkan di sebelah Simpan.',
  ],
  dont: [
    'Memakai switch di dalam sel; grid berisi switch terbaca seperti gangguan.',
    'Memasang lebih dari sekitar delapan kolom; pecah keputusannya.',
    'Menyembunyikan sel yang dikunci; tampilkan tercentang dan redup agar aturannya terlihat.',
  ],
  js: '`data-lds-matrix` pada tabel: kotak area mencentang atau mengosongkan kolomnya di area itu dan menampilkan campuran, tercentang, atau nonaktif sesuai selnya; event `lds:change` (bubbles) membawa `{ input, changed }` setelah setiap perubahan oleh orang. Setelah mengubah sel dari kode, panggil `matrixRefresh(table)`.',
};
