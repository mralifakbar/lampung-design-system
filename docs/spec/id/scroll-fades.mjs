export default {
  summary: 'Area scroll memudarkan sebuah tepi hanya selama masih ada konten di baliknya: tepi atas muncul begitu Anda meninggalkan awal, tepi bawah hilang saat Anda sampai di akhir. Pudaran selalu berarti "masih ada konten ke arah sini".',
  when: [
    'Area bertinggi tetap di dalam halaman yang scroll sendiri: ketentuan layanan di kartu, daftar panjang di panel, syarat di dialog.',
    'Baris horizontal yang scroll ke samping: chip filter, deretan tab di ponsel.',
  ],
  whenNot: [
    ['Halaman itu sendiri yang scroll', 'layout-primitives', 'Halaman scroll seperti biasa; tanpa pudaran.'],
    ['Deretan kartu dengan titik snap dan indikator titik', 'carousel'],
    ['Teks yang sengaja dipotong dengan tombol untuk membaca lanjutannya', 'show-more'],
    ['Menu atau daftar yang muat', 'list'],
  ],
  where: 'Pada elemen yang di-scroll itu sendiri (`overflow: auto` dengan tinggi atau lebar tetap). Pudaran paling besar 24 px.',
  anatomy: [
    ['.fade-edges', 'Wajib. `data-lds-fade`. Mask vertikal dengan `--fade-a` (atas) dan `--fade-b` (bawah).'],
    ['.fade-edges--x', 'Horizontal: mask berjalan dari kiri ke kanan.'],
  ],
  examples: [
    {
      title: 'Ketentuan layanan di kartu',
      desc: 'Scroll ketentuannya. Di awal hanya tepi bawah yang memudar; di tengah keduanya; di akhir hanya tepi atas.',
      html: `<div class="card" style="max-width: 420px;">
  <p class="card__title">Ketentuan layanan izin usaha</p>
  <div class="fade-edges" data-lds-fade style="max-height: 150px; overflow: auto; margin-top: 8px;">
    <p class="card__sub">Permohonan diproses mulai tanggal 1 setiap bulan. Berkas yang kurang dikembalikan dan harus dilengkapi dalam lima hari kerja, setelah itu permohonan dianggap batal. Loket konsultasi pindah ke hari Kamis siang selama gedung pelayanan direnovasi. Usaha bersama perlu satu folder berkas dan catatan singkat tentang peran tiap pemilik. Foto lokasi usaha diambil pada siang hari dan menampilkan papan nama. Jika berhalangan hadir saat verifikasi lapangan, kirim pemberitahuan dalam tiga hari dan jadwal baru diberikan minggu berikutnya. Mulai minggu ketiga, surat keterangan domisili wajib dilampirkan. Pemeriksaan akhir mencakup semua dokumen, terutama dokumen lingkungan dan tata ruang.</p>
  </div>
</div>`,
    },
    {
      title: 'Deretan chip filter',
      desc: 'Di layar sempit chip scroll ke samping; tepi kanan memudar selama masih ada chip lain, tepi kiri setelah Anda menggeser.',
      html: `<div class="fade-edges fade-edges--x" data-lds-fade style="overflow-x: auto; max-width: 340px; scrollbar-width: none;">
  <div class="chip-row" style="flex-wrap: nowrap; width: max-content; padding: 2px;">
    <button class="chip" aria-pressed="true"><span class="ic chip__check" aria-hidden="true">check</span>Semua layanan</button>
    <button class="chip" aria-pressed="false"><span class="ic chip__check" aria-hidden="true">check</span>Kesehatan</button>
    <button class="chip" aria-pressed="false"><span class="ic chip__check" aria-hidden="true">check</span>Perizinan</button>
    <button class="chip" aria-pressed="false"><span class="ic chip__check" aria-hidden="true">check</span>Kependudukan</button>
    <button class="chip" aria-pressed="false"><span class="ic chip__check" aria-hidden="true">check</span>Pajak daerah</button>
    <button class="chip" aria-pressed="false"><span class="ic chip__check" aria-hidden="true">check</span>Transportasi</button>
  </div>
</div>`,
    },
  ],
  motion: [
    'Ukuran pudaran langsung mengikuti posisi scroll: `--fade-a` adalah jarak dari awal, `--fade-b` jarak ke akhir, masing-masing paling besar 24 px. Jadi pudaran membesar saat Anda meninggalkan tepi dan mengecil saat Anda tiba, tanpa transisi dan tanpa jeda.',
    'Dihitung ulang saat scroll (listener pasif) dan saat ukuran berubah (ResizeObserver), jadi konten yang bertambah ikut memperbarui pudaran.',
    'Reduced motion: tidak ada yang berubah; pudaran mengikuti scroll Anda sendiri, bukan animasi.',
  ],
  a11y: [
    'Murni visual (mask CSS). Konten di bawah pudaran tetap tersedia untuk pembaca layar dan fokus keyboard.',
    'Pastikan elemen scroll bisa dijangkau keyboard: jika tidak berisi elemen yang bisa difokus, beri `tabindex="0"` dan label.',
    'Jangan sembunyikan scrollbar pada area vertikal; pada deretan chip horizontal, menyembunyikannya boleh selama pudaran menunjukkan masih ada konten.',
  ],
  do: [
    'Pakai di setiap area berukuran tetap yang scroll di dalam halaman.',
    'Buat areanya cukup tinggi untuk menampilkan minimal tiga baris atau item.',
  ],
  dont: [
    'Menambahkan lapisan gradien permanen yang tetap tampil di akhir.',
    'Memakainya pada body halaman.',
  ],
  js: '`[data-lds-fade]` saat `init()`: menjaga `--fade-a` dan `--fade-b` tetap sinkron dengan posisi dan ukuran scroll.',
};
