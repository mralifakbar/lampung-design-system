const SPIN = '<span class="spinner" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>';

export default {
  summary: 'Saat orang meminta perangkatnya mengurangi gerakan, sistem mempertahankan setiap perubahan state dan membuang perpindahannya: transisi menjadi perubahan 120 ms linear, animasi keyframe diputar sekali dalam 1 ms, dialog dan menu berhenti berubah skala, shimmer dan percikan berhenti, gerakan terbang dan kemunculan saat scroll dilewati. Spinner tetap berputar karena melaporkan pekerjaan.',
  when: [
    'Selalu: ini sudah terpasang di CSS dan JS. Periksa setiap kali Anda menambahkan gerakan ke sistem.',
    'Menguji layar: nyalakan Kurangi gerakan (macOS: Aksesibilitas, Layar; iOS: Aksesibilitas, Gerakan; Windows: matikan Efek animasi; Android: Hapus animasi) atau emulasikan di dev tools browser.',
  ],
  whenNot: [
    ['Memilih gerakan mana yang dipakai sejak awal', 'motion-principles'],
    ['Orang yang tidak ingin haptics', 'haptics', 'Pasang `data-lds-haptics="off"` pada `<html>`.'],
    ['Tampilan gelap atau kontras tinggi', 'theming'],
  ],
  where: 'Global: satu blok `@media (prefers-reduced-motion: reduce)` di `css/components.css` mencakup semua di bawah `.lds`, ditambah beberapa blok komponen; `js/lds.js` memeriksa media query yang sama sebelum gerakan terbang, lemparan, morph, dan smooth scrolling.',
  examples: [
    {
      title: 'Yang tetap bergerak',
      desc: 'Nyalakan Kurangi gerakan di pengaturan sistem Anda lalu kembali ke sini. Spinner tetap berputar dan bar tetap terisi, karena keduanya melaporkan pekerjaan yang sedang berjalan. Shimmer berhenti dan menjadi teks biasa.',
      html: `<div class="docs-row">
  <span class="docs-row" style="gap: 8px;">${SPIN}<span class="shimmer">Memeriksa kelengkapan berkas</span></span>
  <div style="width: 200px;"><div class="progress progress--indeterminate" role="progressbar" aria-label="Menyiapkan bukti pembayaran pajak"><div class="progress__fill"></div></div></div>
</div>`,
    },
    {
      title: 'Yang berubah',
      desc: 'Buka dialog dan ubah toggle dalam kedua mode. Dengan reduced motion, dialog memudar tanpa berubah skala, thumb switch berpindah dalam 120 ms tanpa spring, dan ledakan suka menampilkan hati terisi tanpa percikan.',
      html: `<div class="viewport docs-box" style="height: 300px;">
  <div class="viewport__content">
    <div class="docs-row">
      <button class="btn btn--secondary btn--md" data-lds-open="rm-dialog" aria-haspopup="dialog">Batalkan kunjungan</button>
      <label class="switch"><input type="checkbox" role="switch"><span class="switch__track" aria-hidden="true"><span class="switch__thumb"></span></span>Pengingat</label>
      <button class="like" aria-pressed="false" data-lds-like aria-label="Suka"><span class="like__heart"><span class="ic" aria-hidden="true">favorite</span></span><span class="roll" data-lds-roll="12"></span></button>
    </div>
  </div>
  <div class="scrim" data-lds-scrim="rm-dialog"></div>
  <div class="dialog" id="rm-dialog" role="alertdialog" aria-modal="true" aria-labelledby="rm-dialog-t" data-lds-layer>
    <h3 class="dialog__title" id="rm-dialog-t">Batalkan kunjungan puskesmas?</h3>
    <p class="dialog__body">Nomor antrean Anda dilepas; Anda bisa mendaftar lagi untuk hari lain.</p>
    <div class="dialog__actions"><button class="btn btn--secondary btn--md" data-lds-close data-lds-autofocus>Tetap datang</button><button class="btn btn--danger btn--md" data-lds-close>Batalkan</button></div>
  </div>
</div>`,
    },
  ],
  variants: [
    ['Transitions', 'Setiap `transition-duration` di bawah `.lds` menjadi 120 ms dengan timing `linear`: state tetap berubah secara terlihat, tanpa spring atau waktu perpindahan.'],
    ['Keyframe animations', '`animation-duration: 1ms`, satu iterasi: gerakan masuk (pesan, baris berkas, panel tab, stagger) langsung muncul; goyang, dering, dan regangan dilewati.'],
    ['Overlays', '`.dialog`, `.menu`, `.popover`, `.cmdk` tetap `transform: none`: hanya memudar. Modal halaman (`.modal`, `.overlay`) tidak punya animasi dan `closeModal()` langsung menutup.'],
    ['Loops', 'Shimmer berhenti (teks padat), dot grid berhenti di opacity 60%, percikan suka disembunyikan, titik status langsung berhenti berdenyut. Spinner tetap berputar dengan kecepatan penuh.'],
    ['JS motion', 'Text morph langsung mengganti kata; lightbox melewati gerakan terbangnya; sheet yang dilempar tidak memantul; kata yang di-stream tiba tanpa jeda; reveal-on-scroll dan smooth scrolling mati; progres navigasi hanya memudar biasa.'],
    ['Still moving', 'Manipulasi langsung (menyeret sheet, kenop, baris) tetap mengikuti jari: orangnyalah yang menggerakkan.'],
  ],
  motion: [
    'Aturannya: pertahankan perubahan, buang perpindahan. Setiap state yang beranimasi secara bawaan tetap berubah di bawah reduced motion, hanya seketika atau dalam 120 ms.',
    'Loop yang melaporkan pekerjaan tetap berjalan (spinner, bar indeterminate, timer berpikir); loop dekoratif berhenti.',
    'Gerakan sistem yang baru harus menambahkan penanganan reduced motion sendiri jika aturan global tidak cukup, misalnya saat memindahkan sesuatu melintasi layar dengan transisi (perpindahan 120 ms tetap perpindahan).',
    'Jangan sediakan sakelar gerakan terpisah di dalam aplikasi kecuali produknya membutuhkan; pengaturan sistem sudah menjadi sakelarnya.',
  ],
  a11y: [
    'Reduced motion adalah pengaturan aksesibilitas: gangguan vestibular, migrain, perhatian. Hormati di mana saja, bukan hanya pada animasi besar.',
    'Jangan pernah menyembunyikan informasi di balik gerakan: jika sesuatu hanya bisa dipahami dengan melihatnya bergerak, ia gagal di bawah reduced motion.',
    'Reduced transparency adalah pengaturan terpisah: bilah dan top bar app shell menjadi permukaan padat.',
  ],
  do: [
    'Uji setiap layar baru dengan Kurangi gerakan menyala.',
    'Biarkan spinner dan progres tetap bergerak.',
    'Periksa `matchMedia(\'(prefers-reduced-motion: reduce)\')` sebelum menjalankan gerakan lewat JS.',
  ],
  dont: [
    'Menghapus perubahan state bersama gerakannya.',
    'Membiarkan geseran panjang tetap berjalan dalam 120 ms; ganti dengan pudar.',
    'Menimpa aturan global dengan transisi `!important` di sebuah komponen.',
  ],
  js: 'Perilaku di `js/lds.js` memeriksa `prefers-reduced-motion` sendiri: `morphText`, `observeReveal`, lightbox, `closeModal`, lemparan sheet, `streamText`, dan `[data-lds-jump]`. Binding React melakukan hal yang sama.',
};
