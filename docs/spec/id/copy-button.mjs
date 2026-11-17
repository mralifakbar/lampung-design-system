const swap = `<span class="swap" aria-hidden="true" style="width: 16px; height: 16px;"><span class="ic ic--sm swap__a">content_copy</span><span class="ic ic--sm swap__b" style="color: var(--success-text);">check</span></span>`;

export default {
  summary: 'Tombol yang menyalin nilai ke clipboard dan mengonfirmasi di tempat: ikon salin memudar menjadi centang dan labelnya berbunyi "Disalin" selama 1,6 detik. Satu atribut, `data-lds-copy`, menyimpan teksnya.',
  when: [
    'Nilai yang akan ditempel orang di tempat lain: nomor permohonan, tautan lacak berkas, kode bayar retribusi, API key, contoh kode.',
    'Di samping kolom baca saja atau blok kode yang isinya sulit dipilih manual di ponsel.',
  ],
  whenNot: [
    ['Membagikan halaman lewat lembar berbagi sistem atau ke aplikasi', 'button', 'Pakai tombol dengan `ios_share` yang memanggil `navigator.share`.'],
    ['Blok kode dengan bilah header', 'code-block', 'Ia punya tombol salin sendiri di `.codeblock__bar`; pakai pola ini di sana.'],
    ['Mengonfirmasi aksi yang mengubah data (tersimpan, terkirim)', 'toast'],
    ['Mengganti ikon apa pun untuk menunjukkan status baru (putar ke jeda)', 'icon-swap'],
  ],
  where: 'Di ujung nilai yang disalin: di dalam kolom (`control` dengan tombol di akhir), di bilah blok kode, atau setelah nilai sebaris di baris kunci-nilai. Di ponsel biarkan labelnya terlihat; tombol salin hanya ikon mudah terlewat.',
  anatomy: [
    ['button[data-lds-copy]', 'Wajib. Teks yang disalin adalah nilai atribut. Biasanya `btn btn--gray btn--sm` atau `icon-btn`.'],
    ['.swap', 'Wajib untuk pergantian ikon. Berisi `.swap__a` (content_copy) dan `.swap__b` (check); `.is-swapped` ditambahkan selama 1,6 detik.'],
    ['[data-lds-copy-label]', 'Opsional. Span yang teksnya berganti menjadi nilai atribut ("Disalin") selama 1,6 detik, lalu kembali.'],
  ],
  examples: [
    {
      title: 'Di dalam kolom',
      desc: 'Tekan Salin: ikon memudar menjadi centang dan label berganti, lalu keduanya kembali.',
      html: `<div class="control" style="width: 380px; max-width: 100%; padding-right: 6px;">
  <span style="flex: 1; min-width: 0; font: 400 14px/1 var(--mono); color: var(--text-default); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">IZIN-7Q4K-2026</span>
  <button type="button" class="btn btn--gray btn--sm" data-lds-copy="IZIN-7Q4K-2026" style="min-width: 84px;">${swap}<span data-lds-copy-label="Disalin" aria-live="polite">Salin</span></button>
</div>`,
    },
    {
      title: 'Hanya ikon',
      desc: 'Saat ruang sempit (baris aksi pesan). Namanya tetap "Salin pesan"; span live tersembunyi mengumumkan "Disalin".',
      html: `<div class="docs-row">
  <span class="tip-host"><button type="button" class="icon-btn" aria-label="Salin pesan" data-lds-copy="Loket 3, pukul 09.00. Bawa KTP asli."><span class="swap" aria-hidden="true"><span class="ic swap__a">content_copy</span><span class="ic swap__b" style="color: var(--success-text);">check</span></span><span class="sr-only" data-lds-copy-label="Disalin" aria-live="polite"></span></button><span class="tip" role="tooltip">Salin pesan</span></span>
</div>`,
    },
  ],
  states: [
    ['rest', 'Ikon `content_copy`, label "Salin".'],
    ['copied', '`.swap.is-swapped` dan teks label dari `data-lds-copy-label`, selama 1,6 detik; lalu keduanya kembali sendiri.'],
    ['blocked clipboard', 'Penulisan gagal tanpa pesan dan tombol tetap mengonfirmasi. Jika penyalinan penting, periksa `navigator.clipboard` lebih dulu dan pilihkan teksnya sebagai gantinya.'],
  ],
  motion: [
    'Pergantian ikon: glyph salin mengecil ke 0.5, blur 4 px, dan memudar dalam `--d-fast`; centang datang dari nilai yang sama dengan `--spring-snappy` selama `--d-snappy`. Kedua glyph ada di satu sel grid, jadi tidak ada yang bergeser.',
    'Label berganti tanpa gerak; beri tombol `min-width` agar "Disalin" tidak mengubah lebarnya.',
    'Mengklik lagi selama 1,6 detik tidak mengulang apa pun yang terlihat; transisinya bisa diinterupsi.',
    'Dengan reduced motion, pergantiannya berupa cross-fade 120 ms tanpa blur atau skala.',
  ],
  a11y: [
    'Sebuah `<button type="button">`. Dengan label terlihat, namanya adalah label itu; jika hanya ikon, ia butuh `aria-label="Salin …"` yang menyebut apa yang disalin.',
    'Umumkan hasilnya: pasang `aria-live="polite"` pada span `data-lds-copy-label` agar "Disalin" dibacakan. Untuk tombol hanya ikon pakai span `sr-only` kosong dengan `data-lds-copy-label`.',
    '`.swap` diberi `aria-hidden="true"`; ikonnya tidak dibacakan pembaca layar.',
  ],
  do: [
    'Tampilkan nilainya di samping tombol agar orang tahu apa yang mereka salin.',
    'Jaga lebar tetap antara "Salin" dan "Disalin".',
    'Pakai font monospace untuk kode dan kunci.',
  ],
  dont: [
    'Menyalin sesuatu yang berbeda dari yang ditampilkan.',
    'Menampilkan toast selain perubahan di tempat.',
    'Membiarkan tombol bertuliskan "Disalin" selamanya.',
  ],
  js: '`data-lds-copy="teks"` pada tombol; `init()` menulis teks ke clipboard saat diklik, menambahkan `.is-swapped` ke `.swap` di dalamnya, mengganti teks span `[data-lds-copy-label]` dengan nilai atributnya (bawaan "Copied"), lalu memulihkan keduanya setelah 1,6 detik.',
};
