const items = [['Cetak buku rapor, sampul keras', 120, 'Rp 4.200.000'], ['Desain dan cetak spanduk penerimaan siswa baru', 2, 'Rp 900.000'], ['Cetak kartu pelajar dengan foto', 120, 'Rp 1.800.000']];
const inv = `<article class="paper" style="max-width: 640px;" aria-label="Faktur INV-2026-118">
  <header class="paper__head">
    <div class="paper__brand"><span class="paper__mark" aria-hidden="true">S</span>Percetakan Sinar Way Halim</div>
    <div class="paper__doc"><div class="paper__title">Faktur</div><span class="badge badge--warning">Jatuh tempo 30 Nov 2026</span></div>
  </header>
  <dl class="paper__meta">
    <div><dt class="paper__label">Nomor faktur</dt><dd>INV-2026-118</dd></div>
    <div><dt class="paper__label">Diterbitkan</dt><dd>16 Nov 2026</dd></div>
    <div><dt class="paper__label">Jatuh tempo</dt><dd>30 Nov 2026</dd></div>
  </dl>
  <div class="paper__parties">
    <div class="paper__party"><span class="paper__label">Dari</span><p>Percetakan Sinar Way Halim</p><p>Jl. Sultan Agung 45, Bandar Lampung 35132</p><p>tagihan@sinarwayhalim.id</p></div>
    <div class="paper__party"><span class="paper__label">Ditagihkan kepada</span><p>Yayasan Pendidikan Tunas Harapan</p><p>Jl. Ahmad Yani 18, Metro 34111</p><p>keuangan@tunasharapan.sch.id</p></div>
  </div>
  <table class="paper__table">
    <thead><tr><th scope="col">Uraian</th><th scope="col" class="num">Jml</th><th scope="col" class="num">Jumlah</th></tr></thead>
    <tbody>${items.map(([d, q, a]) => `<tr><td>${d}</td><td class="num">${q}</td><td class="num">${a}</td></tr>`).join('')}</tbody>
  </table>
  <div class="paper__totals">
    <div class="paper__sum"><span>Subtotal</span><b>Rp 6.900.000</b></div>
    <div class="paper__sum"><span>PPN 11%</span><b>Rp 759.000</b></div>
    <div class="paper__sum paper__sum--total"><span>Total tagihan</span><b>Rp 7.659.000</b></div>
  </div>
  <footer class="paper__foot"><p>Bayar dengan transfer ke rekening 123 000 4567 890 atas nama Percetakan Sinar Way Halim.</p><p>Terima kasih. Pertanyaan tentang faktur ini: tagihan@sinarwayhalim.id.</p></footer>
</article>`;

export default {
  summary: 'Halaman yang bisa dicetak, ditampilkan sebagai lembar di dalam aplikasi: faktur, kuitansi, surat, sertifikat. Teksnya mengalir ulang mengikuti lebar, jadi pratinjau tetap terbaca di ponsel, dan bisa menjadi satu-satunya bagian yang dicetak.',
  when: [
    'Pratinjau langsung dokumen yang sedang diisi lewat formulir di sebelahnya: faktur, penawaran harga, surat keterangan.',
    'Catatan yang dicetak atau disimpan sebagai PDF: kuitansi, slip gaji, sertifikat pelatihan.',
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
      title: 'Faktur',
      desc: 'Faktur lengkap dari usaha percetakan lokal. Persempit jendela: pihak pengirim dan penerima bertumpuk, tanggal terlipat, angka tetap rata kanan.',
      html: inv,
    },
    {
      title: 'Cetak paper saja',
      desc: 'Tambahkan `paper--print` dan panggil `window.print()` dari tombol Cetak. Aplikasi di sekitarnya tidak ikut tercetak, dan lembarnya tercetak gelap di atas putih walaupun dalam dark mode.',
      html: `<div class="docs-row"><button class="btn btn--secondary btn--md" type="button" onclick="window.print()"><span class="ic" aria-hidden="true">print</span>Cetak faktur</button></div>`,
      code: `<button class="btn btn--secondary btn--md" type="button" onclick="window.print()"><span class="ic" aria-hidden="true">print</span>Cetak faktur</button>
<article class="paper paper--print" aria-label="Faktur INV-2026-118">…</article>`,
    },
  ],
  variants: [
    ['.paper', 'Lembar di layar.'],
    ['.paper--print', 'Satu-satunya lembar yang dicetak; semua bagian lain halaman tidak ikut dicetak.'],
    ['.paper--receipt', 'Struk kasir: paling lebar 400 px, setinggi barisnya, padding 24 px, kaki di tengah. Dicetak selebar 80 mm.'],
  ],
  states: [
    ['editing', 'Formulir menulis ke paper saat diisi; total yang berubah bergulir dengan [rolling number](rolling-number).'],
    ['empty field', 'Tampilkan placeholder redup di paper ("Nama pelanggan") daripada membiarkan celah kosong.'],
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
