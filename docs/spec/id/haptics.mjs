const H = (kind, label) => `<button class="btn btn--secondary btn--md" onclick="import('../../js/lds.js').then((m) => m.haptic('${kind}'))">${label}</button>`;

export default {
  summary: 'Getaran singkat di ponsel yang mendukungnya, selalu bersama perubahan yang terlihat, tidak pernah sendirian. Ada empat jenis: light untuk ketukan yang mengubah sesuatu, medium untuk gestur yang dijalankan, success saat sesuatu selesai, error saat sesuatu ditolak.',
  when: [
    'Menambah rasa pada momen yang sudah punya umpan balik visual: like, switch yang mendarat, swipe yang dijalankan, tekan lama yang membuka menu.',
    'Mengonfirmasi hasil yang ditunggu: unggahan selesai, konfirmasi rampung.',
  ],
  whenNot: [
    ['Memberi tahu sesuatu tanpa perubahan visual', 'toast', 'Haptics tidak pernah menjadi satu-satunya sinyal.'],
    ['Menolak input', 'shake', 'Shake sudah menggetarkan pola error.'],
    ['Setiap tekanan tombol', 'press-feedback', 'Efek tombol tertekan sudah cukup.'],
    ['Mengurangi gerak', 'reduced-motion'],
  ],
  where: 'Dipanggil dari kode tepat saat kejadian, setelah gestur pengguna. Komponen sistem sudah memanggilnya; panggil sendiri hanya untuk momen baru.',
  examples: [
    {
      title: 'Empat jenis',
      desc: 'Di ponsel Android yang bisa bergetar, tekan satu per satu. Di desktop dan browser iPhone tidak terjadi apa-apa, karena itu haptics hanya menambah apa yang sudah tampil di layar.',
      html: `<div class="docs-row">
  ${H('light', 'Light')}${H('medium', 'Medium')}${H('success', 'Success')}${H('error', 'Error')}
</div>
<p class="docs-note" style="width: 100%;">Light 8 ms, medium 14 ms, success 10 + 40 + 18 ms, error lima denyut 12 dan 30 ms.</p>`,
      code: `import { haptic } from 'lampung-design-system/js';
haptic('success'); // 'light' | 'medium' | 'success' | 'error'`,
    },
    {
      title: 'Sudah terpasang di tempatnya',
      desc: 'Like bergetar light saat terisi; konfirmasi bergetar light saat bertanya dan success saat selesai; shake karena penolakan bergetar error.',
      html: `<button class="like" aria-pressed="false" data-lds-like aria-label="Suka"><span class="like__heart"><span class="ic" aria-hidden="true">favorite</span></span><span class="roll" data-lds-roll="8"></span></button>
<div class="confirm" data-lds-confirm>
  <span class="confirm__face confirm__face--rest"><button class="confirm__arm" data-act="arm"><span class="ic" aria-hidden="true">delete</span>Hapus riwayat</button></span>
  <span class="confirm__face confirm__face--ask"><span class="confirm__q">Hapus riwayat?</span><button class="btn btn--plain" data-act="cancel">Batal</button><button class="btn btn--danger" data-act="confirm">Hapus</button></span>
  <span class="confirm__face confirm__face--busy" role="status"><span class="spinner" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span><span class="shimmer">Menghapus</span></span>
  <span class="confirm__face confirm__face--done" role="status"><span class="ic" aria-hidden="true">check_circle</span>Riwayat dihapus<button class="confirm__undo" data-act="undo">Urungkan</button></span>
</div>`,
    },
  ],
  variants: [
    ['light', '8 ms. Ketukan yang mengubah sesuatu: like aktif, konfirmasi bersiap.'],
    ['medium', '14 ms. Gestur yang dijalankan: swipe hapus, tekan lama yang membuka menu konteks.'],
    ['success', '10, 40, 18 ms. Sesuatu selesai: konfirmasi rampung, unggahan selesai, proses berpikir selesai.'],
    ['error', '12, 30, 12, 30, 12 ms. Ditolak: `shake()`, `likeRevert()`, penyimpanan gagal.'],
  ],
  motion: [
    'Waktu: jalankan bersamaan dengan perubahan visual (pointer down untuk tekanan, frame saat gestur dijalankan), tidak pernah setelah animasi.',
    'Satu haptic per kejadian. Jangan menumpuk ketukan light di bawah pola success.',
    'Reduced motion tidak mematikan haptics; `data-lds-haptics="off"` di `<html>` yang mematikannya (sediakan sebagai pengaturan).',
  ],
  a11y: [
    'Tidak pernah menjadi satu-satunya sinyal: setiap haptic berpasangan dengan perubahan yang terlihat dan, bila penting, diumumkan.',
    'Hanya berjalan setelah orang berinteraksi dengan halaman (`navigator.userActivation`), jadi halaman tidak pernah bergetar saat dimuat.',
    'Hormati pengaturan "Getaran" atau "Haptics" di produk dengan `data-lds-haptics="off"`.',
  ],
  do: [
    'Pakai keempat jenis sesuai namanya; jangan membuat pola baru.',
    'Biarkan komponen sistem menjalankan haptic-nya sendiri.',
  ],
  dont: [
    'Bergetar di setiap tekanan atau saat scroll.',
    'Memakai haptic untuk memberi tahu sesuatu yang tidak tampil di layar.',
    'Menjalankan haptics dari timer atau kejadian di latar belakang.',
  ],
  js: '`haptic(kind)` memakai `navigator.vibrate` bila tersedia, setelah aktivasi pengguna, kecuali `data-lds-haptics="off"` terpasang di `<html>`. Dipanggil oleh like, konfirmasi, swipe yang dijalankan, tekan lama menu konteks, shake, proses berpikir selesai, dan unggahan selesai.',
};
