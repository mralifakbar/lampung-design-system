export default {
  summary: 'Paket sebagai kolom dan fitur sebagai baris, dikelompokkan per topik, dengan ikon centang, ikon strip atau nilai singkat di setiap sel. Tabel bergulir ke samping di kotaknya sendiri sementara nama fitur tetap di tempat.',
  when: [
    'Di bawah card paket di halaman tarif, untuk orang yang ingin melihat semua perbedaan sebelum memilih.',
    'Membandingkan dua sampai empat jenis layanan dengan daftar fitur yang sama.',
  ],
  whenNot: [
    ['Memilih paket', 'plans'],
    ['Catatan yang dibandingkan menurut atributnya (siswa, faktur)', 'table'],
    ['Pasangan label dan nilai dari satu item', 'key-value'],
  ],
  where: 'Di bawah [plans](plans), sering di balik tombol "Bandingkan semua fitur" yang membukanya di tempat dengan resep collapse. Selebar konten penuh; mulai 620 px tabel muat, di bawahnya bergulir di dalam `.compare-box` dengan kolom fitur sticky di kiri.',
  anatomy: [
    ['.compare-box', 'Wajib. Kotak gulir (diposisikan, agar teks khusus screen reader tetap di dalamnya).'],
    ['table.compare', 'Wajib. Tabel sungguhan dengan `caption`.'],
    ['thead th', 'Nama paket; `.compare__price` di bawah setiap nama.'],
    ['tr.compare__group > th[scope="rowgroup"]', 'Baris judul kelompok yang membentang di semua kolom.'],
    ['tbody th[scope="row"]', 'Nama fitur.'],
    ['td', 'Ikon `check`, ikon `remove` dengan `.compare__no`, atau nilai singkat ("Semua 143", "3 sampai 50"). Ikon membawa teks `.sr-only`.'],
    ['.is-featured', 'Pada setiap sel di kolom paket yang disarankan: isian tenang, membulat di ujungnya.'],
  ],
  examples: [
    {
      title: 'Dua kelompok, tiga paket',
      desc: 'Keanggotaan perpustakaan kota sebagai contoh. Persempit jendela: kolom paket bergulir di bawah nama fitur.',
      html: `<div class="compare-box" data-lds-fade style="width: 100%;">
  <table class="compare">
    <caption>Bandingkan jenis keanggotaan</caption>
    <thead><tr><th scope="col">Fitur</th><th scope="col">Umum<span class="compare__price">Gratis</span></th><th scope="col" class="is-featured">Pelajar<span class="compare__price">Rp 10.000 per tahun</span></th><th scope="col">Keluarga<span class="compare__price">Rp 25.000 per tahun</span></th></tr></thead>
    <tbody>
      <tr class="compare__group"><th scope="rowgroup" colspan="4">Peminjaman</th></tr>
      <tr><th scope="row">Buku dipinjam sekaligus</th><td>2</td><td class="is-featured">5</td><td>10</td></tr>
      <tr><th scope="row">Ruang baca kelompok</th><td><span class="ic compare__no" aria-hidden="true">remove</span><span class="sr-only">Tidak termasuk</span></td><td class="is-featured"><span class="ic" aria-hidden="true">check</span><span class="sr-only">Termasuk</span></td><td><span class="ic" aria-hidden="true">check</span><span class="sr-only">Termasuk</span></td></tr>
      <tr class="compare__group"><th scope="rowgroup" colspan="4">Bantuan</th></tr>
      <tr><th scope="row">Bantuan pustakawan lewat email</th><td><span class="ic compare__no" aria-hidden="true">remove</span><span class="sr-only">Tidak termasuk</span></td><td class="is-featured">2 hari kerja</td><td>1 hari kerja</td></tr>
    </tbody>
  </table>
</div>`,
    },
  ],
  states: [
    ['narrow', 'Di bawah 760 px kolom fitur sticky dengan warna kanvas; [scroll fades](scroll-fades) (`data-lds-fade`) menunjukkan masih ada isi di kanan.'],
    ['period change', 'Di dalam elemen `[data-lds-billing]` harga di header bisa berubah mengikuti periode seperti card paket.'],
  ],
  motion: [
    'Statis. Dibuka di tempat dengan resep collapse (`grid-template-rows` 0fr ke 1fr dengan `--spring-smooth`), tidak pernah melompat ke halaman lain.',
  ],
  a11y: [
    '`<table>` sungguhan dengan caption, `scope="col"` pada header paket, `scope="row"` pada nama fitur dan `scope="rowgroup"` pada baris kelompok.',
    'Ikon centang dan strip memakai `aria-hidden` dengan teks "Termasuk" atau "Tidak termasuk" di `.sr-only`.',
    'Kotak gulir bisa dicapai dengan keyboard lewat sel di dalamnya; tidak pernah membuat halaman bergulir ke samping.',
  ],
  do: [
    'Tulis batas sebagai kata atau angka ("3 sampai 50"), bukan centang, jika berbeda.',
    'Kelompokkan baris menurut hal yang ditanyakan orang: fitur, kanal layanan, ketentuan, bantuan.',
  ],
  dont: [
    'Memakai warna saja untuk termasuk dan tidak termasuk.',
    'Mengulang setiap baris card paket; tabel ini untuk daftar lengkap.',
  ],
};
