const RING = "const b = this.closest('.docs-row').querySelector('.bell'); b.classList.remove('is-ringing'); void b.offsetWidth; b.classList.add('is-ringing'); const c = this.closest('.docs-row').querySelector('.count'); c.hidden = false; c.textContent = Number(c.textContent || 0) + 1;";

export default {
  summary: 'Ikon lonceng berbunyi sekali, ayunan pendek dari bagian atasnya yang berhenti dalam 640 ms, saat notifikasi dinyalakan atau notifikasi baru masuk. Sekali saja, tidak pernah berulang: lonceng memberi tanda, bukan merecoki.',
  when: [
    'Switch menyalakan notifikasi atau pengingat: lonceng di label switch berbunyi saat thumb mendarat.',
    'Notifikasi masuk saat orang sedang melihat layar: lonceng di bilah atas berbunyi sekali dan jumlahnya muncul.',
  ],
  whenNot: [
    ['Notifikasi yang harus dibaca sekarang', 'banner'],
    ['Pesan yang mengonfirmasi sebuah aksi', 'toast'],
    ['Jumlah belum dibaca saja', 'count'],
    ['Aksi yang ditolak', 'shake'],
    ['Fitur baru di produk yang perlu dijelaskan', 'coachmark'],
  ],
  where: 'Hanya pada ikon notifikasi: di dalam label `.switch`, atau di [tombol ikon](icon-button) pada bilah atas atau app shell.',
  anatomy: [
    ['.bell', 'Wajib. Dipasang pada ikon `notifications` (`<span class="bell ic">`). Berayun dari titik 50 % 10 % (puncak lonceng).'],
    ['.is-ringing', 'Memainkan bunyi lonceng sekali. Hapus lalu pasang lagi untuk membunyikannya kembali.'],
  ],
  examples: [
    {
      title: 'Menyalakan notifikasi',
      desc: 'Nyalakan switch: thumb mendarat dan meregang, lalu lonceng berbunyi sekali. Mematikannya tidak memicu bunyi.',
      html: `<label class="switch"><input type="checkbox" role="switch"><span class="switch__track" aria-hidden="true"><span class="switch__thumb"></span></span><span class="bell ic" aria-hidden="true">notifications</span>Beri tahu saya saat laporan saya ditanggapi</label>`,
    },
    {
      title: 'Notifikasi baru masuk',
      desc: 'Coba simulasikan: lonceng berbunyi sekali dan jumlahnya bertambah. Notifikasi berikutnya membunyikan lonceng lagi dari awal.',
      html: `<div class="docs-row">
  <button class="icon-btn" aria-label="Notifikasi" style="position: relative;"><span class="bell ic" aria-hidden="true">notifications</span><span class="count" hidden style="position: absolute; top: 6px; right: 4px;"></span></button>
  <button class="btn btn--secondary btn--sm" onclick="${RING}">Simulasikan notifikasi</button>
</div>`,
      code: `<button class="icon-btn" aria-label="Notifikasi, 2 belum dibaca">
  <span class="bell ic" aria-hidden="true">notifications</span>
  <span class="count">2</span>
</button>
// on arrival: bell.classList.remove('is-ringing'); void bell.offsetWidth; bell.classList.add('is-ringing');`,
    },
  ],
  motion: [
    '`lds-ring` selama 640 ms dengan `--ease-standard`: berputar 15, −12, 8, −4, 2, 0 derajat dengan poros di puncak lonceng. Ayunannya mengecil sampai diam seperti lonceng sungguhan.',
    'Main sekali per kejadian. Di dalam switch, lonceng hanya berbunyi saat dinyalakan, setelah thumb mulai bergerak (switch juga memainkan regangan mendarat 340 ms).',
    'Interupsi: kejadian baru memulai ulang bunyi dari 0 (hapus kelasnya, paksa reflow, pasang lagi).',
    'Reduced motion: tanpa ayunan; status switch dan perubahan jumlah sudah membawa maknanya.',
  ],
  a11y: [
    'Lonceng diberi `aria-hidden`; label switch atau label tombol menyebut fungsinya ("Notifikasi, 2 belum dibaca").',
    'Perbarui label tombol saat jumlahnya berubah; jangan mengandalkan ayunan lonceng untuk mengumumkan apa pun.',
  ],
  do: [
    'Bunyikan sekali per kejadian.',
    'Pakai hanya pada ikon notifikasi.',
    'Pasangkan dengan jumlah atau status switch.',
  ],
  dont: [
    'Mengulang bunyi lonceng atau membunyikannya saat halaman dimuat.',
    'Membunyikan lonceng untuk setiap notifikasi dalam satu rentetan; cukup sekali untuk satu kelompok.',
    'Memakai ayunan ini pada ikon lain.',
  ],
  js: 'Di dalam `.switch`, `init()` membunyikan setiap `.bell` di label saat switch dinyalakan. Di tempat lain, pasang dan lepas `.is-ringing` sendiri.',
};
