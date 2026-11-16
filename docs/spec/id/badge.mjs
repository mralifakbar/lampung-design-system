export default {
  summary: 'Label kecil yang tidak bisa diklik untuk status atau jenis sesuatu: Draf, Terlambat, Disetujui. Kata-kata yang mudah dipahami, paling banyak satu atau dua per item.',
  when: [
    'Menampilkan status sebuah catatan di baris, card atau sel tabel: Draf, Diperiksa, Disetujui, Terlambat.',
    'Menandai jenis atau kategori yang membantu memindai: Sosialisasi, Gratis, Baru.',
    'Penanda singkat yang terikat waktu: "Batas besok", "Berakhir hari ini".',
  ],
  whenNot: [
    ['Jumlah item yang belum dibaca atau tertunda', 'count'],
    ['Kondisi langsung sebuah sistem atau koneksi, dengan titik', 'status-dot'],
    ['Orang bisa menekannya untuk menyaring atau memilih', 'chips'],
    ['Tag yang diketik orang dan bisa dihapus', 'tag-input'],
    ['Seseorang sedang online', 'avatar', 'Pakai `.avatar__presence`'],
    ['Satu kalimat penjelasan', 'alert'],
  ],
  where: 'Di samping judul yang dijelaskannya (setelah judul dalam baris, di atas judul dalam card), atau di kolom tabelnya sendiri. Di ponsel tetap satu baris; jika baris tidak cukup, pindahkan badge ke bawah judul.',
  anatomy: [
    ['.badge', 'Wajib. Tinggi 22 px, radius 6 px, teks medium 12 px, warna netral.'],
    ['.badge--accent|success|warning|danger', 'Warna latar dan teks sesuai nada.'],
    ['.badge--solid', 'Isian aksen dengan teks putih: satu badge yang harus menonjol (jarang).'],
    ['.badge--outline', 'Transparan dengan garis tipis: jenis atau kategori yang tenang.'],
    ['.ic', 'Ikon depan opsional 14 px.'],
  ],
  examples: [
    {
      title: 'Nada untuk status',
      desc: 'Netral untuk draf, aksen untuk yang sedang berjalan, lalu success, warning, danger. Kata-katanya yang membawa makna.',
      html: `<div class="docs-row">
  <span class="badge">Draf</span>
  <span class="badge badge--accent">Diperiksa</span>
  <span class="badge badge--success"><span class="ic" aria-hidden="true">check</span>Disetujui</span>
  <span class="badge badge--warning">Batas besok</span>
  <span class="badge badge--danger">Terlambat</span>
  <span class="badge badge--outline">Sosialisasi</span>
  <span class="badge badge--solid">Baru</span>
</div>`,
    },
    {
      title: 'Di baris list',
      desc: 'Badge ada di ujung baris, setelah teks.',
      html: `<div class="list" style="max-width: 460px;">
  <div class="lrow"><div class="lrow__body"><div class="lrow__title">Permohonan izin usaha mikro</div><div class="lrow__sub">Dikirim 12 Nov</div></div><span class="badge badge--accent">Diperiksa</span></div>
  <div class="lrow"><div class="lrow__body"><div class="lrow__title">Pajak bumi dan bangunan 2026</div><div class="lrow__sub">Jatuh tempo 10 Nov</div></div><span class="badge badge--danger">Terlambat</span></div>
  <div class="lrow"><div class="lrow__body"><div class="lrow__title">Laporan jalan rusak di Jl. Pagar Alam</div><div class="lrow__sub">Ditangani 8 Nov</div></div><span class="badge badge--success">Selesai</span></div>
</div>`,
    },
    {
      title: 'Di card',
      desc: 'Di atas judul untuk jenis, di samping judul untuk status.',
      html: `<div class="card" style="max-width: 320px;">
  <span class="badge badge--outline">Pelatihan</span>
  <div class="card__title" style="margin-top: 10px;">Mengurus sertifikat halal untuk UMKM</div>
  <div class="card__sub">Kamis, 13.00 · Aula kecamatan</div>
</div>`,
    },
  ],
  variants: [
    ['badge', 'Netral: draf, diarsipkan, belum dimulai.'],
    ['badge--accent', 'Sedang berjalan, diperiksa, yang aktif.'],
    ['badge--success', 'Selesai, disetujui, lunas, tersedia (kuota).'],
    ['badge--warning', 'Perlu perhatian segera: batas besok, akan kedaluwarsa.'],
    ['badge--danger', 'Gagal, terlambat, penuh, ditolak.'],
    ['badge--outline', 'Kategori atau jenis yang tenang.'],
    ['badge--solid', 'Satu-satunya badge yang harus menonjol ("Baru" pada satu item).'],
  ],
  motion: [
    'Tidak ada saat diam. Saat status berubah di tempat, ganti kata-katanya dengan [text morph](text-morph) dan biarkan warnanya cross-fade; jangan membuat badge meletup atau berdenyut.',
  ],
  a11y: [
    'Badge adalah teks yang dibaca di tempatnya; pastikan barisnya terbaca baik ("Pajak bumi dan bangunan 2026, Terlambat").',
    'Jangan pernah membuatnya bisa diklik. Jika harus membuka sesuatu, itu [chip](chips) atau tombol.',
    'Nada juga harus ada di kata-katanya; "Terlambat" berwarna merah, bukan badge merah bertuliskan "4".',
  ],
  do: [
    'Pakai kata yang sama untuk status yang sama di seluruh produk.',
    'Batasi satu atau dua kata dengan sentence case.',
    'Batasi satu badge status per item (plus paling banyak satu badge jenis).',
  ],
  dont: [
    'Menaruh angka di badge; pakai [count](count).',
    'Memakai badge sebagai tombol atau filter.',
    'Mengarang warna baru; petakan setiap status ke salah satu nada.',
  ],
};
