const show = (opts) => `import('../../js/lds.js').then(({ toast }) => toast({ ${opts}, container: this.closest('.viewport') }));`;

export default {
  summary: 'Pesan gelap singkat di bagian bawah yang memastikan sesuatu baru saja terjadi, lalu hilang sendiri. Jika aksinya bisa dibatalkan, tombol Urungkan ada di toast dengan hitung mundur yang jujur.',
  when: [
    'Memastikan aksi yang sudah selesai: "Draf tersimpan", "Undangan terkirim", "Laporan diarsipkan".',
    'Menawarkan Urungkan tepat setelah aksi destruktif yang bisa dibatalkan, alih-alih bertanya lebih dulu.',
    'Melaporkan hasil proses latar yang dimulai orang itu (ekspor siap, unggahan selesai).',
  ],
  whenNot: [
    ['Kondisi yang bertahan sampai diperbaiki (offline, tagihan lewat jatuh tempo)', 'alert', 'Atau [banner](banner) untuk kondisi di seluruh sistem'],
    ['Galat di field formulir', 'text-field', 'Taruh pesannya di bawah field'],
    ['Keputusan yang harus dibuat', 'dialog'],
    ['Aksi destruktif yang tidak bisa dibatalkan', 'alert-dialog'],
    ['Aksi pada beberapa item terpilih', 'selection-bar'],
  ],
  where: 'Tengah bawah jendela (atau `.viewport`-nya), lebar 340 px, 20 px dari bawah. Yang terbaru di depan; hingga tiga terselip di belakangnya, lebih kecil. Di atas tab bar ponsel, angkat toaster agar tidak menutupi bar.',
  anatomy: [
    ['.toaster[role=status][aria-live=polite]', 'Tumpukannya. Dibuat oleh `toast()` (fixed, di `<body>`) atau diletakkan di `.viewport` untuk demo yang terbatas.'],
    ['.toast', 'Satu pesan: latar terbalik, minimal 56 px, radius 16 px.'],
    ['.ic', 'Ikon terisi opsional: `check_circle`, `inventory_2`, `delete`.'],
    ['text', 'Judul (`.morph` agar bisa berubah di tempat) dan baris `.toast__sub` opsional.'],
    ['.toast__action', 'Paling banyak satu aksi, biasanya Urungkan.'],
    ['.toast__timer', 'Bilah tipis yang menyusut selama aksi masih bisa dijalankan; berhenti saat hover dan fokus.'],
  ],
  examples: [
    {
      title: 'Tersimpan, dan diarsipkan dengan Urungkan',
      desc: 'Tekan keduanya. Toast Urungkan menunjukkan berapa lama Urungkan berlaku dan berhenti selama di-hover; menekan Urungkan mengubah toast di tempat, tidak menumpuk toast baru.',
      html: `<div class="viewport docs-box" style="height: 300px; min-height: 0;">
  <div class="viewport__content">
    <div class="docs-row">
      <button class="btn btn--secondary btn--md" onclick="${show(`title: 'Draf tersimpan', body: 'Hanya Anda yang bisa melihatnya.', icon: 'check_circle'`)}">Simpan draf</button>
      <button class="btn btn--secondary btn--md" onclick="${show(`title: 'Laporan diarsipkan', body: 'Dipindahkan dari kotak masuk Anda.', icon: 'inventory_2', action: 'Urungkan', duration: 6000, onAction: () => ({ title: 'Laporan dipulihkan', icon: 'undo' })`)}"><span class="ic" aria-hidden="true">inventory_2</span>Arsipkan laporan</button>
    </div>
  </div>
  <div class="toaster" role="status" aria-live="polite"></div>
</div>`,
      code: `import { toast } from 'lampung-design-system/js';

toast({ title: 'Draf tersimpan', body: 'Hanya Anda yang bisa melihatnya.', icon: 'check_circle' });

toast({
  title: 'Laporan diarsipkan', body: 'Dipindahkan dari kotak masuk Anda.', icon: 'inventory_2',
  action: 'Urungkan', duration: 6000,
  onAction: () => { restore(); return { title: 'Laporan dipulihkan', icon: 'undo' }; },
});`,
    },
    {
      title: 'Markup statis',
      desc: 'Markup yang dirender `toast()`, ditampilkan diam di toaster-nya.',
      html: `<div class="viewport docs-box" style="height: 140px; min-height: 0;">
  <div class="toaster" role="status" aria-live="polite">
    <div class="toast"><span class="ic ic--fill" aria-hidden="true">check_circle</span><div><span>Undangan terkirim</span><div class="toast__sub">Rina menerima email dalam satu menit.</div></div></div>
  </div>
</div>`,
    },
  ],
  states: [
    ['entering', '`lds-toast-in`: naik 24 px dan membesar dari 0,96.'],
    ['stacked', 'Toast lama berada 10 px di belakang dan masing-masing 5 % lebih kecil; lebih dari tiga memudar.'],
    [':hover on the stack', 'Tumpukan membuka (berjarak 66 px) dan setiap timer berhenti.'],
    ['.is-leaving', 'Turun 12 px dan memudar; dihapus setelah 200 ms.'],
  ],
  motion: [
    'Masuk: `lds-toast-in` selama `--d-smooth` (560 ms) dengan `--spring-smooth`. Penyusunan ulang tumpukan memakai spring yang sama, sehingga toast lama bergeser mundur saat toast baru tiba.',
    'Keluar: opacity dan `translateY(12px) scale(0.96)` selama `--d-exit` (180 ms) dengan `--ease-exit`.',
    'Timer: bilah `.toast__timer` menyusut linear sepanjang durasi dan berhenti bersama jamnya selama tumpukan di-hover atau difokus.',
    'Urungkan: judul berubah di tempat menjadi hasilnya ("Laporan dipulihkan") dan toast pergi 1,6 detik kemudian.',
    'Reduced motion: tanpa naik; memudar masuk dalam 120 ms.',
  ],
  a11y: [
    'Toaster adalah `role="status"` dengan `aria-live="polite"`, sehingga judul dan isi dibacakan tanpa memindahkan fokus.',
    'Jam berhenti selama tumpukan di-hover atau memegang fokus, agar orang bisa mencapai Urungkan dengan keyboard.',
    'Buat durasinya cukup untuk dibaca dan ditindaklanjuti: bawaan 4 detik, sekitar 6 detik jika ada aksi.',
    'Jangan pernah menaruh satu-satunya jalan menuju sesuatu di toast; toast akan hilang.',
  ],
  do: [
    'Sebutkan apa yang terjadi dalam bentuk lampau: "Undangan terkirim".',
    'Tawarkan Urungkan alih-alih bertanya "Yakin?" bila aksinya bisa dibatalkan.',
    'Berikan `container` jika toast milik area yang terbatas.',
  ],
  dont: [
    'Memakai toast untuk galat yang perlu diperbaiki; tampilkan di tempat terjadinya.',
    'Menampilkan lebih dari satu aksi.',
    'Memunculkan toast untuk setiap perubahan kecil yang sudah terlihat (switch yang berpindah).',
  ],
  js: '`toast({ title, body, icon, action, onAction, duration = 4000, container })` membuat toast di `.toaster` (membuat toaster fixed di `<body>` jika belum ada, atau memakai yang ada di dalam `container`) dan mengembalikan `dismiss()`; `dismiss.update({ title, icon })` mengubahnya di tempat. `onAction` boleh mengembalikan `{ title, icon }` untuk mengubah toast menjadi hasilnya. Hingga tiga tampil; hover membuka tumpukan dan menghentikan timer.',
  react: `import { notify } from 'lampung-design-system/react';

notify({ title: 'Undangan terkirim', icon: 'check_circle' }, 'success');
notify({ title: 'Laporan diarsipkan', action: 'Urungkan', onAction: restore });`,
};
