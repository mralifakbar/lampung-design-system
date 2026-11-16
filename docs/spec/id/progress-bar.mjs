export default {
  summary: 'Track 6 px yang terisi seiring tugas dengan ukuran yang diketahui berjalan. Tampilkan angkanya di samping; pakai bar indeterminate hanya jika benar-benar tidak bisa diukur.',
  when: [
    'Tugas dengan jumlah yang terukur sedang berjalan: unggahan, impor data, ekspor laporan, soal yang sudah dijawab dalam tryout.',
    'Kemajuan dalam pelatihan atau modul, ditampilkan dengan angkanya ("12 dari 20 materi").',
    'Langkah persiapan singkat yang tidak terukur, saat garis lebih cocok daripada spinner (`.progress--indeterminate`).',
  ],
  whenNot: [
    ['Tile ringkas atau skor yang harus muat dalam kotak', 'progress-ring'],
    ['Tingkat atau kapasitas, bukan tugas (penyimpanan terpakai, kekuatan kata sandi)', 'meter'],
    ['Tunggu singkat tanpa angka, di dalam tombol atau baris', 'spinner'],
    ['Konten sedang dimuat dan tata letaknya diketahui', 'skeleton'],
    ['Pekerjaan panjang yang lamanya tidak diketahui, saat waktu berjalan adalah sinyal yang jujur', 'thinking'],
    ['Berkas yang diunggah ke drop zone', 'upload-progress'],
    ['Langkah-langkah alur beberapa halaman', 'steps'],
    ['Bagian dari keseluruhan lintas kategori', 'percentage-bar'],
    ['Halaman sedang dimuat setelah navigasi', 'nav-progress'],
  ],
  where: 'Tepat di bawah hal yang diukurnya: di baris unggahan, di card pelatihan, di bawah header pekerjaan yang sedang berjalan. Dengan `.progress-meta` di atasnya untuk label dan angka. Selebar wadahnya di semua ukuran layar; jangan pernah sebagai strip selebar halaman (itu [navigation progress](nav-progress)).',
  anatomy: [
    ['.progress', 'Wajib. Track-nya: tinggi 6 px, membulat, di atas `--bg-track`. Membawa `role="progressbar"`.'],
    ['.progress__fill', 'Wajib. Isiannya, blok yang membesar dari kiri. Atur `transform: scaleX(0.64)` untuk 64 %.'],
    ['.progress-meta', 'Baris opsional di atas bar: label di kiri, nilai dalam `<b>` di kanan (angka tabular).'],
  ],
  examples: [
    {
      title: 'Determinate dengan angkanya',
      desc: 'Label menyebut apa yang sedang terjadi, angka menyebut sejauh mana. Tekan tombol untuk memajukannya.',
      html: `<div class="docs-col" style="max-width: 420px;">
  <div>
    <div class="progress-meta"><span id="pb-l">Mengunggah denah-lokasi-usaha.pdf</span><b id="pb-v">36%</b></div>
    <div class="progress" id="pb" role="progressbar" aria-labelledby="pb-l" aria-valuemin="0" aria-valuemax="100" aria-valuenow="36"><div class="progress__fill" style="transform: scaleX(0.36);"></div></div>
  </div>
  <div class="docs-row"><button class="btn btn--secondary btn--sm" onclick="const b = document.getElementById('pb'); const v = (Number(b.getAttribute('aria-valuenow')) + 21) % 105; b.setAttribute('aria-valuenow', v); b.firstElementChild.style.transform = 'scaleX(' + v / 100 + ')'; document.getElementById('pb-v').textContent = v + '%';">Majukan</button></div>
</div>`,
      code: `<div class="progress-meta"><span id="up-l">Mengunggah denah-lokasi-usaha.pdf</span><b>64%</b></div>
<div class="progress" role="progressbar" aria-labelledby="up-l" aria-valuemin="0" aria-valuemax="100" aria-valuenow="64">
  <div class="progress__fill" style="transform: scaleX(0.64);"></div>
</div>`,
    },
    {
      title: 'Kemajuan pelatihan',
      desc: 'Hal yang dihitung lebih mudah dibaca sebagai "12 dari 20" daripada persentase. Bar tipis muat di dalam card dan baris list.',
      html: `<div class="card" style="max-width: 360px;">
  <div class="card__title">Pembukuan sederhana untuk UMKM</div>
  <div class="card__sub">Modul 3: mencatat arus kas</div>
  <div style="margin-top: 16px;">
    <div class="progress-meta"><span>Materi</span><b>12 dari 20</b></div>
    <div class="progress progress--thin" role="progressbar" aria-label="Materi selesai" aria-valuemin="0" aria-valuemax="20" aria-valuenow="12" aria-valuetext="12 dari 20 materi"><div class="progress__fill" style="transform: scaleX(0.6);"></div></div>
  </div>
</div>`,
    },
    {
      title: 'Indeterminate',
      desc: 'Satu segmen menyapu selama lamanya belum diketahui. Pasangkan dengan kata-kata yang memberi gambaran waktu.',
      html: `<div style="max-width: 420px; width: 100%;">
  <div class="progress-meta"><span>Menyiapkan surat keterangan Anda</span><span>Biasanya kurang dari satu menit</span></div>
  <div class="progress progress--thin progress--indeterminate" role="progressbar" aria-label="Menyiapkan surat keterangan Anda"><div class="progress__fill"></div></div>
</div>`,
    },
    {
      title: 'Selesai',
      desc: 'Di 100 % isian boleh berubah ke warna success; tulis juga "Selesai" dengan kata-kata.',
      html: `<div style="max-width: 420px; width: 100%;">
  <div class="progress-meta"><span>Laporan diekspor</span><b>Selesai</b></div>
  <div class="progress" role="progressbar" aria-label="Ekspor laporan" aria-valuemin="0" aria-valuemax="100" aria-valuenow="100"><div class="progress__fill" style="transform: scaleX(1); background: var(--success);"></div></div>
</div>`,
    },
  ],
  variants: [
    ['progress', '6 px. Tugas mandiri dan unggahan.'],
    ['progress--thin', '4 px. Di dalam card, baris list dan tata letak yang rapat.'],
    ['progress--indeterminate', 'Segmen 40 % menyapu setiap 1,4 detik. Hanya jika besar pekerjaannya tidak diketahui.'],
    ['progress-meta', 'Baris label dan nilai di atas bar.'],
  ],
  states: [
    ['in progress', '`transform: scaleX(value)` pada isian plus `aria-valuenow` pada bar.'],
    ['indeterminate', '`.progress--indeterminate` tanpa `aria-valuenow`.'],
    ['done', '`scaleX(1)`, opsional `background: var(--success)` pada isian, dan "Selesai" di meta.'],
    ['failed', 'Biarkan isian di titik berhentinya, warnai `var(--danger)` dan tulis alasan serta tombol coba lagi di [alert](alert) atau di barisnya.'],
  ],
  motion: [
    'Isian bergerak dengan `transform: scaleX()` memakai `--ease-inout` selama `--d-considered` (480 ms): karena sudah ada di layar, kedua ujungnya diperhalus. Perubahan warna latar selama `--d-standard`.',
    'Karena ini transition, pembaruan cepat berganti target dengan mulus; jangan memperlambat nilai agar terlihat sibuk dan jangan pernah memalsukan kemajuan yang macet di 90 %.',
    'Indeterminate: `lds-indeterminate`, 1,4 detik dengan `--ease-inout`, tanpa henti. Dengan reduced motion loop hanya diputar sekali, jadi pasangkan dengan kata-kata.',
    'Animasikan `transform` saja, jangan pernah `width`, agar pembaruan tetap di compositor.',
  ],
  a11y: [
    '`role="progressbar"` dengan `aria-valuemin`, `aria-valuemax` dan `aria-valuenow`; beri nama dengan `aria-labelledby` yang menunjuk label meta, atau `aria-label`.',
    'Pakai `aria-valuetext` jika angka mentah bukan bacaan paling jelas ("12 dari 20 materi", "Sekitar 2 menit lagi").',
    'Bar indeterminate tidak memakai `aria-valuenow`.',
    'Jangan mengumumkan setiap perubahan. Umumkan akhirnya sekali, dengan [toast](toast) atau baris `role="status"`.',
  ],
  do: [
    'Tampilkan angka atau hitungan di samping bar.',
    'Pakai kemajuan yang nyata; jika hanya tahu langkahnya, tampilkan langkah.',
    'Letakkan bar di tempat hasilnya akan muncul, agar perhatian sudah di sana saat selesai.',
  ],
  dont: [
    'Menganimasikan `width` atau memakai isian gradien buatan.',
    'Memakai bar indeterminate untuk pekerjaan yang bisa diukur.',
    'Memakai progress bar untuk nilai yang bukan tugas (penyimpanan, kekuatan): itu [meter](meter).',
  ],
  js: 'Tidak ada. Atur `transform: scaleX()` pada `.progress__fill` dan `aria-valuenow` pada `.progress` dari kode Anda.',
};
