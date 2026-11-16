export default {
  summary: 'Dua sampai empat tombol yang menyatu dalam satu kotak bergaris, untuk aksi terpisah pada objek yang sama (urungkan, ulangi, riwayat). Setiap tombol menjalankan sesuatu; tidak ada yang tetap terpilih.',
  when: [
    'Beberapa aksi milik satu objek yang dipakai bersamaan: urungkan dan ulangi, perkecil dan perbesar, sebelumnya dan berikutnya.',
    'Toolbar yang menyatukan tombol untuk menunjukkan bahwa mereka satu set dan menghemat ruang.',
  ],
  whenNot: [
    ['Salah satu tombol tetap terpilih untuk menunjukkan tampilan saat ini', 'segmented-control', 'Grup menjalankan aksi; segmented control menyimpan pilihan.'],
    ['Setiap tombol menyalakan atau mematikan sebuah mode (tebal, miring)', 'toggle', 'Pakai toggle group: ia menunjukkan status tertekan.'],
    ['Satu aksi utama dengan beberapa variannya', 'split-button'],
    ['Aksi yang tidak berhubungan dan hanya kebetulan berdekatan', 'layout-primitives', 'Beri jarak antartombol dengan `cluster`.'],
    ['Lebih dari empat aksi', 'dropdown-menu', 'Simpan dua yang paling sering dipakai di grup dan pindahkan sisanya ke menu lainnya.'],
  ],
  where: 'Di toolbar dan header halaman atau kartu, sejajar dengan kontrol ukuran sedang (36 px) lainnya. Di ponsel batasi paling banyak tiga, atau pindahkan ke menu lainnya; grup tidak turun baris.',
  anatomy: [
    ['.btn-group', 'Wajib. Kotak bergaris, radius 10 px, memotong isinya. Beri `role="group"` dan `aria-label`.'],
    ['.btn.btn--md', 'Wajib. Dua sampai empat tombol, tinggi 36 px, tanpa kelas varian: grup yang mengatur tampilannya. Garis tipis memisahkan tombol yang bersebelahan.'],
    ['.ic', 'Ikon opsional di depan setiap tombol.'],
  ],
  examples: [
    {
      title: 'Riwayat suntingan',
      desc: 'Tiga aksi pada dokumen yang sama.',
      html: `<div class="btn-group" role="group" aria-label="Riwayat suntingan">
  <button class="btn btn--md"><span class="ic" aria-hidden="true">undo</span>Urungkan</button>
  <button class="btn btn--md"><span class="ic" aria-hidden="true">redo</span>Ulangi</button>
  <button class="btn btn--md"><span class="ic" aria-hidden="true">history</span>Riwayat</button>
</div>`,
    },
    {
      title: 'Sebelumnya dan berikutnya',
      desc: 'Menelusuri berkas di layar pemeriksaan permohonan, di samping jumlah berkas.',
      html: `<div class="cluster" style="--gap: 12px;">
  <span class="card__sub" style="margin: 0;">Berkas 4 dari 40</span>
  <div class="btn-group" role="group" aria-label="Berkas">
    <button class="btn btn--md"><span class="ic" aria-hidden="true">chevron_left</span>Sebelumnya</button>
    <button class="btn btn--md">Berikutnya<span class="ic" aria-hidden="true">chevron_right</span></button>
  </div>
</div>`,
    },
  ],
  states: [
    ['hover', '`--bg-tint` hanya di belakang tombol yang disorot.'],
    [':active', 'Tanpa skala (akan merusak tepi yang menyatu); tombol terisi `--bg-tint-strong`.'],
    ['disabled', '`disabled` pada satu tombol (ulangi saat tidak ada yang bisa diulangi) meredupkannya ke 38 %.'],
  ],
  motion: [
    'Tombol dalam grup tidak mengecil saat ditekan; `transform` dimatikan agar garis tepi tetap lurus. Umpan baliknya adalah isian `--bg-tint-strong` yang langsung muncul.',
    'Isian hover berubah selama `--d-fast` dengan `--ease-standard`.',
  ],
  a11y: [
    '`role="group"` dengan `aria-label` yang menamai set tersebut ("Riwayat suntingan").',
    'Setiap anak adalah `<button>` biasa yang dicapai dengan Tab; jangan tambahkan navigasi tombol panah (itu untuk toggle group dan segmented control).',
    'Tombol hanya ikon di dalam grup masing-masing perlu `aria-label`.',
  ],
  do: [
    'Buat label pendek dan sejajar ("Urungkan", "Ulangi").',
    'Pakai ukuran sedang; grup dirancang untuk tombol 36 px.',
  ],
  dont: [
    'Memakai grup sebagai tab atau pengganti tampilan.',
    'Menaruh varian primary atau danger di dalam grup.',
    'Menaruh tombol terpisah dengan tinggi yang sama tepat di samping grup; beri jarak dengan `cluster`.',
  ],
};
