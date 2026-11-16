const img = (f) => `../examples/dashboard/img/products/${f}.svg`;
const tile = (f, name, meta, price, qty = '', extra = '') => `<button class="ptile${qty ? ' is-in' : ''}" type="button"${extra} aria-label="${name}, ${price}${qty ? `, ${qty} di penjualan ini` : ''}"><span class="ptile__media"><img src="${img(f)}" alt=""></span><span class="ptile__body"><span class="ptile__name">${name}</span><span class="ptile__meta">${meta}</span></span><span class="ptile__price">${price}</span><span class="ptile__qty"${qty ? '' : ' hidden'}>${qty}</span></button>`;

export default {
  summary: 'Produk yang diketuk untuk ditambahkan ke penjualan atau pesanan: gambar, nama, satu baris meta, dan harga, dengan badge di sudut yang menghitung berapa yang sudah masuk ke penjualan. Seluruh tile adalah satu tombol.',
  when: [
    'Kasir atau loket tempat petugas menambahkan produk dengan mengetuknya: toko UMKM, kantin, loket tiket.',
    'Layar pesan mandiri atau menu tempat orang menyusun pesanan dari grid butir.',
    'Grid apa pun tempat satu ketukan menambah satu butir dan hitungan berjalan lebih penting daripada detailnya.',
  ],
  whenNot: [
    ['Menjelajah produk untuk membuka halamannya', 'card', 'Pakai kartu bertaut (`card--link`); product tile menambahkan, bukan membuka halaman.'],
    ['Mengelola katalog: menyunting, stok, status', 'data-table'],
    ['Memilih satu paket dengan deskripsi', 'radio-card'],
    ['Berkas dan folder', 'file-tile'],
  ],
  where: 'Di dalam `.ptile-grid` (kolom selebar minimal `--min`, default 148 px) di samping atau di atas penjualan berjalan. Di ponsel dua kolom tile memenuhi lebar; `.ptile--compact` menaruh gambar di samping nama untuk daftar panjang atau panel samping yang sempit.',
  anatomy: [
    ['button.ptile', 'Wajib. Seluruh tile; `aria-label` menyebut nama, harga, dan berapa yang ada di penjualan.'],
    ['.ptile__media', 'Wajib. Gambar persegi (`img`, alt kosong karena label sudah menyebut produknya) atau ikon 32 px bila tidak ada foto. `--ratio` mengubah bentuknya.'],
    ['.ptile__name', 'Wajib. Paling banyak dua baris, lalu terpotong.'],
    ['.ptile__meta', 'Opsional. Stok, ukuran, atau varian. `.ptile__meta--low` untuk stok menipis, dalam kata.'],
    ['.ptile__price', 'Wajib. Tabular, di bawah agar harga sejajar dalam satu baris.'],
    ['.ptile__qty', 'Opsional. Berapa yang ada di penjualan berjalan; `hidden` saat nol. Tambahkan `.is-bump` lagi untuk efek pop saat hitungannya berubah.'],
    ['.is-in', 'Produk ada di penjualan: ring aksen.'],
    ['[aria-disabled="true"]', 'Habis atau sedang tidak dijual: gambar memudar, baris meta menyebut alasannya.'],
  ],
  examples: [
    {
      title: 'Grid kasir',
      desc: 'Hitungan di sudut dan ring aksen menunjukkan yang sudah ada di penjualan; stok menipis disebut dalam kata; tile yang habis memudar dan menyebut kapan tersedia lagi.',
      html: `<div class="ptile-grid" style="max-width: 680px;">
  ${tile('stoneware-mug', 'Mug keramik, isi 2', 'Stok 36', 'Rp 85.000', '2')}
  ${tile('soy-candle', 'Lilin aromaterapi serai', 'Sisa 4', 'Rp 45.000').replace('<span class="ptile__meta">Sisa 4', '<span class="ptile__meta ptile__meta--low">Sisa 4')}
  ${tile('canvas-tote', 'Tas kanvas tebal', 'Stok 58', 'Rp 65.000')}
  ${tile('field-watch', 'Jam tangan kayu, 38 mm', 'Habis sampai 2 Des', 'Rp 350.000', '', ' aria-disabled="true"')}
</div>`,
      code: `<div class="ptile-grid">
  <button class="ptile is-in" type="button" aria-label="Mug keramik, isi 2, Rp 85.000, 2 di penjualan ini">
    <span class="ptile__media"><img src="img/products/stoneware-mug.svg" alt=""></span>
    <span class="ptile__body"><span class="ptile__name">Mug keramik, isi 2</span><span class="ptile__meta">Stok 36</span></span>
    <span class="ptile__price">Rp 85.000</span>
    <span class="ptile__qty">2</span>
  </button>
  <button class="ptile" type="button" aria-disabled="true" aria-label="Jam tangan kayu, 38 mm, Rp 350.000, habis">…<span class="ptile__meta">Habis sampai 2 Des</span>…</button>
</div>
<script type="module">
  // On tap: add to the sale, then show the count and pop it
  qty.hidden = false; qty.textContent = n; qty.classList.remove('is-bump'); void qty.offsetWidth; qty.classList.add('is-bump');
</script>`,
    },
    {
      title: 'Ringkas, di panel sempit',
      desc: '`ptile--compact` menaruh gambar di samping nama: untuk panel samping, pilihan cepat, atau daftar panjang di ponsel.',
      html: `<div class="ptile-grid" style="--min: 240px; max-width: 520px;">
  ${tile('crew-tee', 'Kaus katun motif tapis', 'S, M, L', 'Rp 95.000').replace('class="ptile"', 'class="ptile ptile--compact"')}
  ${tile('dot-notebook', 'Buku catatan titik, A5', 'Stok 120', 'Rp 30.000', '1').replace('class="ptile is-in"', 'class="ptile ptile--compact is-in"')}
</div>`,
    },
  ],
  variants: [
    ['.ptile', 'Gambar di atas; default untuk grid.'],
    ['.ptile--compact', 'Gambar di awal, 56 px; untuk panel sempit dan daftar panjang.'],
    ['.ptile-grid', 'Grid-nya; atur `--min` untuk lebar kolom terkecil.'],
  ],
  states: [
    ['hover', 'Ring menggelap dan gambar membesar 4 %.'],
    ['pressed', 'Mengecil ke 0,97 dalam 90 ms, kembali dengan `--spring-snappy`.'],
    ['in the sale', 'Ring aksen `.is-in` dan hitungan `.ptile__qty`.'],
    ['sold out', '`aria-disabled="true"`: gambar memudar dan teks redup; baris meta menyebut kapan tersedia lagi. Ketukan menggoyang tile dan mengumumkan alasannya.'],
    ['loading', 'Grid tile dengan `.skel` persegi dan dua bilah teks.'],
  ],
  motion: [
    'Ditekan: `scale(0.97)` dalam 90 ms, dilepas dengan `--spring-snappy` (360 ms).',
    'Hitungan muncul dengan pop dari 0,6 dengan `--spring-snappy`; setiap perubahan memutar ulang `lds-pop` dari 0,82 agar ketukan cepat beruntun tetap terbaca.',
    'Hover membesarkan gambar dengan `--spring-smooth`; tidak ada yang bergerak di layar sentuh.',
    'Reduced motion: tanpa pop dan tanpa skala; hitungan dan ring langsung berubah.',
  ],
  a11y: [
    '`button` asli; `aria-label` membawa nama, harga, dan hitungan ("Mug keramik, Rp 85.000, 2 di penjualan ini"). Perbarui saat hitungannya berubah.',
    'Pakai `aria-disabled`, bukan `disabled`, untuk produk habis, agar tile tetap bisa difokus dan bisa menjelaskan dirinya.',
    'Umumkan setiap penambahan lewat live region yang sopan ("Mug keramik ditambahkan, 2 di penjualan").',
    'Tile minimal selebar 148 px, jauh di atas target 44 px.',
  ],
  do: [
    'Tampilkan harga di setiap tile; kasir membandingkan dari harga.',
    'Jaga total penjualan berjalan tetap terlihat di samping atau di bawah grid.',
  ],
  dont: [
    'Menaruh tombol tambahan di dalam tile; perubahan jumlah ada di baris penjualan.',
    'Menyembunyikan produk habis diam-diam; tampilkan nonaktif beserta alasannya.',
  ],
};
