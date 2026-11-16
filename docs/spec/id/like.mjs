const LIKE = (n, extra = '') => `<button class="like" aria-pressed="false" data-lds-like aria-label="Suka"${extra}><span class="like__heart"><span class="ic" aria-hidden="true">favorite</span></span><span class="roll" data-lds-roll="${n}"></span></button>`;
const REFUSE = " onclick=\"if (this.getAttribute('aria-pressed') !== 'true') { const err = this.nextElementSibling; setTimeout(() => import('../../js/lds.js').then((m) => { m.likeRevert(this); err.hidden = false; }), 700); }\"";

export default {
  summary: 'Memberi dukungan bersifat optimistis: hati terisi, memantul, dan melontarkan tujuh percikan begitu ditekan, dan jumlahnya bergulir naik, sebelum server menjawab. Jika server menolak, semuanya kembali dengan goyangan dan alasannya ditampilkan.',
  when: [
    'Mendukung kiriman, jawaban, atau komentar, saat jumlahnya menjadi bukti sosial: jawaban di forum warga, usulan musrenbang, pengumuman kelurahan.',
    'Toggle apa pun yang hampir pasti berhasil dan mudah dibatalkan, sehingga menunggu server hanya menambah jeda.',
  ],
  whenNot: [
    ['Menyimpan sesuatu untuk diri sendiri (bookmark, sematkan)', 'icon-swap', 'Toggle yang tenang; tanpa ledakan, tanpa jumlah.'],
    ['Menilai dengan skala', 'rating'],
    ['Menyalakan pengaturan', 'switch'],
    ['Memilih filter atau tag', 'chips'],
  ],
  where: 'Di bawah atau di samping konten yang didukung, di awal baris aksinya: kaki kartu, di bawah jawaban forum, di baris aksi [pesan chat](chat-message) bila jumlahnya penting.',
  anatomy: [
    ['button.like', 'Wajib. `aria-pressed`, `aria-label="Suka"`, `data-lds-like`. Pil 36 px dengan isian tenang.'],
    ['.like__heart', 'Wajib. Berisi ikon `favorite`; JS menambahkan tujuh titik `.like__spark`.'],
    ['.roll', 'Jumlah opsional, `data-lds-roll="<n>"`; bergulir satu angka saat di-toggle.'],
  ],
  examples: [
    {
      title: 'Mendukung sebuah usulan',
      desc: 'Tekan hatinya: langsung terisi, memantul, dan meledak; jumlahnya bergulir ke 129. Tekan lagi untuk menariknya (tanpa ledakan saat dimatikan).',
      html: `<div class="card" style="max-width: 460px;">
  <p class="card__title">Lampu jalan di Jalan Pagar Alam sering padam</p>
  <p class="card__sub" style="margin-top: 6px;">Usul agar tiga tiang dekat halte diganti lampu baru. Sudah gelap total selama empat malam.</p>
  <div class="docs-row" style="margin-top: 14px;">${LIKE(128)}<button class="btn btn--plain btn--sm">Balas</button></div>
</div>`,
    },
    {
      title: 'Saat server menolak',
      desc: 'Yang ini ditolak setelah 700 ms: hati kosong lagi, jumlahnya bergulir kembali, tombol bergoyang, dan alasannya muncul dalam kata-kata.',
      html: `<div class="docs-col" style="max-width: 360px;">
  <div class="docs-row">${LIKE(41, REFUSE)}<span class="field__help field__help--error" hidden><span class="ic" aria-hidden="true">wifi_off</span>Dukungan Anda gagal disimpan. Anda sedang offline.</span></div>
</div>`,
      code: `<button class="like" aria-pressed="false" data-lds-like aria-label="Suka">
  <span class="like__heart"><span class="ic" aria-hidden="true">favorite</span></span>
  <span class="roll" data-lds-roll="41"></span>
</button>
<script type="module">
  import { likeRevert } from 'lampung-design-system/js';
  btn.addEventListener('lds:change', async (e) => {
    try { await saveLike(e.detail.pressed); }
    catch { likeRevert(btn); showReason('Dukungan Anda gagal disimpan. Anda sedang offline.'); }
  });
</script>`,
    },
  ],
  states: [
    ['off', '`aria-pressed="false"`: hati bergaris pada isian tenang.'],
    ['on', '`aria-pressed="true"`: hati terisi merah bahaya pada warna bahaya tipis; jumlah naik satu.'],
    ['burst', '`.is-burst` untuk satu kali main saat dinyalakan: tujuh percikan terlontar.'],
    ['reverted', '`likeRevert(btn)`: kembali mati, jumlah kembali, goyangan, haptic error.'],
  ],
  motion: [
    'Tekan: pil mengecil ke 0,94 dalam 90 ms dan memantul kembali dengan `--spring-snappy`.',
    'Hati: `lds-heart` selama 420 ms dengan `--spring-momentum`: dari 0,6 ke 1,18 pada 55 %, lalu 1. Pantulan lebihnya pantas: ini perayaan atas tindakan yang disengaja.',
    'Percikan: tujuh titik 4 px dengan jarak 51 derajat bergerak dari 6 ke 17 px keluar sambil memudar dan mengecil ke 0,3, 520 ms dengan `--ease-enter`. Hanya saat dinyalakan.',
    'Jumlah: digit `.roll` bergulir dengan `--spring-smooth`. Warna dan isian berubah selama `--d-fast`.',
    'Interupsi: menekan lagi di tengah ledakan langsung mematikannya; ledakan tidak perlu selesai.',
    'Reduced motion: tanpa percikan, tanpa pantulan; isian dan jumlah berubah dalam 120 ms.',
  ],
  a11y: [
    '`<button>` dengan `aria-pressed` dan `aria-label="Suka"`; jumlahnya dibacakan lewat `aria-label` milik roll. Sebut objeknya bila ada banyak: `aria-label="Dukung usulan ini"`.',
    'Hati terisi bukan satu-satunya sinyal: `aria-pressed` dan warna seluruh pil juga berubah.',
    'Dukungan yang ditolak dijelaskan dengan teks di sampingnya, bukan hanya dengan goyangan.',
  ],
  do: [
    'Perbarui UI lebih dulu, baru panggil server.',
    'Kembalikan dengan `likeRevert` dan sertakan alasannya saat gagal.',
    'Satu like per item.',
  ],
  dont: [
    'Menunggu server sebelum mengisi hati.',
    'Memainkan ledakan saat membatalkan like atau saat halaman dimuat.',
    'Memakai ledakan like untuk menyimpan atau bookmark.',
  ],
  js: '`[data-lds-like]` saat `init()`: mengubah `aria-pressed`, memainkan ledakan, menggulirkan jumlah, haptic light, dan memancarkan `lds:change` dengan `{ pressed }`. `likeRevert(btn)` membatalkan toggle terakhir dan menggoyangkan tombol.',
};
