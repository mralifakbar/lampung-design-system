export default {
  summary: 'Dua sampai lima segmen sama lebar dengan satu thumb yang bergeser ke segmen terpilih. Untuk mengganti tampilan atau mode dari yang ada di layar saat itu; perubahannya langsung berlaku.',
  when: [
    'Mengganti periode atau tampilan dari konten yang sama: Hari, Minggu, Bulan; Daftar, Grid; Grafik, Tabel.',
    'Mode dengan dua sampai empat status bernama yang langsung berlaku: Terang, Gelap, Sistem.',
    'Pilihan tunggal yang ringkas di toolbar atau header kartu.',
  ],
  whenNot: [
    ['Setiap pilihan menampilkan panel konten berbeda (Ringkasan, Berkas, Riwayat)', 'tabs', 'Tab membawa semantik tab dan panel'],
    ['Lebih dari lima opsi, atau label panjang', 'select'],
    ['Satu pengaturan nyala dan mati', 'switch'],
    ['Pilihan yang disimpan bersama formulir dan butuh penjelasan', 'radio', 'Atau [radio card](radio-card)'],
    ['Beberapa opsi bisa menyala sekaligus (filter)', 'chips'],
    ['Baris aksi toolbar', 'button-group'],
  ],
  where: 'Di atas atau di header konten yang diubahnya: di atas grafik atau daftar, di header kartu, di toolbar. Selebar layar di ponsel di bawah judul besar; di layar lebar sesuaikan dengan labelnya (sekitar 90 px per segmen) alih-alih merentang selebar halaman.',
  anatomy: [
    ['.seg', 'Wajib. Lintasan cekung; `role="group"` dengan `aria-label`; `data-lds-segmented` untuk perilakunya.'],
    ['.seg__thumb', 'Wajib. Thumb timbul di bawah segmen terpilih. JS menyetel lebarnya selebar satu segmen dan menggerakkannya.'],
    ['button.seg__btn', 'Wajib. Satu segmen, sama lebar, `aria-pressed`. Pemisah tipis di antara tetangga yang tidak tertekan.'],
  ],
  examples: [
    {
      title: 'Periode di atas grafik',
      desc: 'Klik sebuah segmen atau pakai tombol panah: thumb bergeser dengan spring dan bisa diarahkan ulang di tengah perjalanan.',
      html: `<div class="seg" role="group" aria-label="Periode" data-lds-segmented style="max-width: 320px; width: 100%;">
  <span class="seg__thumb"></span>
  <button type="button" class="seg__btn" aria-pressed="false">Hari</button>
  <button type="button" class="seg__btn" aria-pressed="true">Minggu</button>
  <button type="button" class="seg__btn" aria-pressed="false">Bulan</button>
</div>`,
    },
    {
      title: 'Besar, dengan ikon',
      desc: '`seg--lg` (36 px) untuk kontrol utama sebuah tampilan, seperti penampilan.',
      html: `<div class="seg seg--lg" role="group" aria-label="Tampilan" data-lds-segmented style="max-width: 360px; width: 100%;">
  <span class="seg__thumb"></span>
  <button type="button" class="seg__btn" aria-pressed="true"><span class="ic ic--sm" aria-hidden="true" style="margin-right: 6px;">light_mode</span>Terang</button>
  <button type="button" class="seg__btn" aria-pressed="false"><span class="ic ic--sm" aria-hidden="true" style="margin-right: 6px;">dark_mode</span>Gelap</button>
  <button type="button" class="seg__btn" aria-pressed="false"><span class="ic ic--sm" aria-hidden="true" style="margin-right: 6px;">contrast</span>Sistem</button>
</div>`,
    },
  ],
  variants: [
    ['seg (default)', 'Segmen 30 px, label 13 px. Toolbar dan header kartu.'],
    ['seg--lg', 'Segmen 36 px, label 14 px. Kontrol utama sebuah layar; bawaan `Segmented` di React.'],
  ],
  states: [
    ['aria-pressed="true"', 'Segmen terpilih: label semibold di atas thumb; pemisah di sampingnya disembunyikan.'],
    [':active', 'Label meredup ke 60 % selama ditekan.'],
    ['focus-visible', 'Focus ring pada segmen yang difokus.'],
  ],
  motion: [
    'Thumb bergeser dengan `transform: translateX()` memakai `--spring-smooth` (560 ms). Pilihan baru selama perjalanan mengarahkan ulang dari posisi saat itu; tidak pernah melompat kembali. Lihat [sliding indicator](sliding-indicator).',
    'Pemisah di samping segmen terpilih memudar dalam `--d-fast` (160 ms).',
    'Thumb tetap memakai spring-nya bahkan saat tema berganti, sehingga kontrol penampilan tidak pernah tersentak.',
    'Reduced motion: thumb bergerak dalam 120 ms linear.',
  ],
  a11y: [
    '`role="group"` dengan `aria-label`; segmen adalah `<button type="button">` dengan `aria-pressed`, sehingga masing-masing diumumkan sebagai toggle tertekan atau tidak tertekan.',
    'Tombol panah (Kiri, Kanan, Atas, Bawah) memindahkan pilihan dan fokus dengan berputar; Tab masuk ke setiap segmen.',
    'Saat segmen mengganti panel konten, pakai [tabs](tabs) agar `role="tab"` dan `aria-controls` menghubungkannya.',
    'Ikon bersifat dekoratif; teksnya adalah nama. Segmen hanya ikon butuh `aria-label`.',
  ],
  do: [
    'Batasi label pada satu atau dua kata pendek dengan panjang serupa.',
    'Terapkan perubahan langsung dan pertahankan pilihannya saat orang kembali.',
  ],
  dont: [
    'Memakainya untuk berpindah antarhalaman.',
    'Memasang lebih dari lima segmen, atau membiarkan label terpotong.',
    'Membangun sendiri kontrol thumb bergeser kedua; pakai ulang `.seg`.',
  ],
  js: '`data-lds-segmented` pada `.seg`: menyesuaikan thumb selebar satu segmen, memindahkannya ke segmen `aria-pressed="true"`, menangani klik dan tombol panah, dan memicu `lds:change` dengan `{ index, item }` pada kelompok.',
  react: `import { Segmented } from 'lampung-design-system/react';

<Segmented
  label="Periode"
  value={period}
  onChange={setPeriod}
  size="md"
  options={[{ value: 'day', label: 'Hari' }, { value: 'week', label: 'Minggu' }, { value: 'month', label: 'Bulan' }]}
/>`,
};
