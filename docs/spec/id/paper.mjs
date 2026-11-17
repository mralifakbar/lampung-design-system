const items = [['Retribusi sampah usaha, Oktober 2026', 1, 'Rp 75.000'], ['Retribusi sampah usaha, November 2026', 1, 'Rp 75.000'], ['Angkut sampah tambahan, hajatan 2 Nov', 3, 'Rp 150.000']];
const inv = `<article class="paper" style="max-width: 640px;" aria-label="Tagihan retribusi SKRD-2026-118">
  <header class="paper__head">
    <div class="paper__brand"><span class="paper__mark" aria-hidden="true">C</span>Layanan Kebersihan Kota Contoh</div>
    <div class="paper__doc"><div class="paper__title">Tagihan retribusi</div><span class="badge badge--warning">Jatuh tempo 30 Nov 2026</span></div>
  </header>
  <dl class="paper__meta">
    <div><dt class="paper__label">Nomor SKRD</dt><dd>SKRD-2026-118</dd></div>
    <div><dt class="paper__label">Diterbitkan</dt><dd>16 Nov 2026</dd></div>
    <div><dt class="paper__label">Jatuh tempo</dt><dd>30 Nov 2026</dd></div>
  </dl>
  <div class="paper__parties">
    <div class="paper__party"><span class="paper__label">Dari</span><p>Layanan Kebersihan Kota Contoh</p><p>Jl. Ki Maja 7, Way Halim, Bandar Lampung 35132</p><p>retribusi@kotacontoh.example</p></div>
    <div class="paper__party"><span class="paper__label">Wajib retribusi</span><p>Warung Makan Bu Sari</p><p>Jl. Teuku Umar 21, Kedaton, Bandar Lampung 35141</p><p>NPWRD 1871 •••• •••• 0042</p></div>
  </div>
  <table class="paper__table">
    <thead><tr><th scope="col">Uraian</th><th scope="col" class="num">Jml</th><th scope="col" class="num">Jumlah</th></tr></thead>
    <tbody>${items.map(([d, q, a]) => `<tr><td>${d}</td><td class="num">${q}</td><td class="num">${a}</td></tr>`).join('')}</tbody>
  </table>
  <div class="paper__totals">
    <div class="paper__sum"><span>Subtotal</span><b>Rp 300.000</b></div>
    <div class="paper__sum"><span>Denda keterlambatan 2%</span><b>Rp 6.000</b></div>
    <div class="paper__sum paper__sum--total"><span>Total tagihan</span><b>Rp 306.000</b></div>
  </div>
  <footer class="paper__foot"><p>Bayar di teller bank daerah atau dompet digital dengan kode bayar 1871 2611 0001 18.</p><p>Contoh dokumen, bukan tagihan resmi. Pertanyaan tentang tagihan ini: retribusi@kotacontoh.example.</p></footer>
</article>`;

export default {
  summary: 'Halaman yang bisa dicetak, ditampilkan sebagai lembar di dalam aplikasi: faktur, kuitansi, surat, sertifikat. Teksnya mengalir ulang mengikuti lebar, jadi pratinjau tetap terbaca di ponsel, dan bisa menjadi satu-satunya bagian yang dicetak.',
  when: [
    'Pratinjau langsung dokumen yang sedang diisi lewat formulir di sebelahnya: tagihan retribusi, surat pengantar RT, surat keterangan.',
    'Catatan yang dicetak atau disimpan sebagai PDF: kuitansi pembayaran, tanda terima berkas, sertifikat pelatihan UMKM.',
  ],
  whenNot: [
    ['Rincian sebuah catatan di dalam aplikasi, bukan dokumen', 'key-value'],
    ['Teks kaya yang panjang dari editor atau CMS', 'prose'],
    ['Satu subjek mandiri di antara yang lain dalam grid', 'card'],
  ],
  where: 'Di kolomnya sendiri di samping formulir pada layar lebar (sticky di bawah app bar), di bawah formulir pada ponsel. Paling lebar 816 px; tinggi minimalnya mengikuti proporsi kertas letter.',
  anatomy: [
    ['article.paper', 'Wajib. Lembarnya: warna dasar, ring tipis, padding yang tumbuh mengikuti lebar. `aria-label` menyebut nama dokumen.'],
    ['.paper__head', 'Merek (`.paper__brand` dengan `.paper__mark`) di awal, `.paper__doc` (`.paper__title` dan badge) di akhir.'],
    ['dl.paper__meta', 'Nomor dan tanggal; setiap `dt.paper__label` di atas `dd`-nya.'],
    ['.paper__parties > .paper__party', 'Pengirim dan penerima, masing-masing berisi `.paper__label` dan baris alamat.'],
    ['table.paper__table', 'Daftar item; `.num` meratakan angka ke kanan.'],
    ['.paper__totals > .paper__sum', 'Baris label dan jumlah; `.paper__sum--total` untuk total yang harus dibayar.'],
    ['.paper__foot', 'Rincian pembayaran dan catatan, terdorong ke bawah halaman.'],
    ['.paper--print', 'Modifier. Saat mencetak, hanya paper ini yang tercetak, dari tepi ke tepi, dengan tema terang.'],
  ],
  examples: [
    {
      title: 'Tagihan retribusi',
      desc: 'Tagihan retribusi sampah lengkap untuk sebuah warung makan. Persempit jendela: pihak pengirim dan penerima bertumpuk, tanggal terlipat, angka tetap rata kanan.',
      html: inv,
    },
    {
      title: 'Cetak paper saja',
      desc: 'Tambahkan `paper--print` dan panggil `window.print()` dari tombol Cetak. Aplikasi di sekitarnya tidak ikut tercetak, dan lembarnya tercetak gelap di atas putih walaupun dalam dark mode.',
      html: `<div class="docs-row"><button class="btn btn--secondary btn--md" type="button" onclick="window.print()"><span class="ic" aria-hidden="true">print</span>Cetak tagihan</button></div>`,
      code: `<button class="btn btn--secondary btn--md" type="button" onclick="window.print()"><span class="ic" aria-hidden="true">print</span>Cetak tagihan</button>
<article class="paper paper--print" aria-label="Tagihan retribusi SKRD-2026-118">…</article>`,
    },
  ],
  variants: [
    ['.paper', 'Lembar di layar.'],
    ['.paper--print', 'Satu-satunya lembar yang dicetak; semua bagian lain halaman tidak ikut dicetak.'],
    ['.paper--receipt', 'Struk kasir: paling lebar 400 px, setinggi barisnya, padding 24 px, kaki di tengah. Dicetak selebar 80 mm.'],
  ],
  states: [
    ['editing', 'Formulir menulis ke paper saat diisi; total yang berubah bergulir dengan [rolling number](rolling-number).'],
    ['empty field', 'Tampilkan placeholder redup di paper ("Nama wajib retribusi") daripada membiarkan celah kosong.'],
    ['printing', 'Tema terang, tanpa ring, tanpa padding sendiri; margin halaman diatur `@page`.'],
  ],
  motion: [
    'Tidak punya gerak sendiri. Nilai yang berubah saat orang mengetik boleh bergulir (rolling number); item baru masuk dengan list stagger sekali.',
  ],
  a11y: [
    'Pakai `article` yang diberi nama lewat `aria-label` (jenis dokumen dan nomornya).',
    'Pakai heading sungguhan dan tabel sungguhan dengan `th scope="col"`, agar pratinjau terbaca berurutan.',
    'Di pratinjau langsung, jangan mengumumkan setiap ketukan; kolom formulir adalah sumbernya.',
  ],
  do: [
    'Pertahankan hierarki ringan sistem: satu tingkat ketebalan untuk total, label redup.',
    'Beri total yang harus dibayar barisnya sendiri dengan mata uangnya.',
  ],
  dont: [
    'Mengecilkan seluruh halaman agar muat di ponsel; biarkan teks mengalir ulang.',
    'Menaruh kontrol aplikasi di dalam paper; tempatnya di formulir.',
  ],
  js: 'Tidak perlu hook. Jika ada `.paper--print` di halaman, `init()` beralih ke tema terang untuk pencetakan dan kembali setelahnya.',
};
