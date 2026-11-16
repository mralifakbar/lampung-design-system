const PICK = `const c = event.target.closest('.rcard'); if (!c) return; this.querySelectorAll('.rcard').forEach((r) => { const on = r === c; r.setAttribute('aria-checked', String(on)); r.tabIndex = on ? 0 : -1; });`;
const KEYS = `const cards = [...this.querySelectorAll('.rcard')], i = cards.indexOf(document.activeElement), d = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[event.key]; if (d === undefined || i < 0) return; event.preventDefault(); const n = cards[(i + d + cards.length) % cards.length]; n.focus(); n.click();`;
const card = (title, sub, price, on) => `<button type="button" class="rcard" role="radio" aria-checked="${on}" tabindex="${on ? 0 : -1}"><span class="radio__dot" aria-hidden="true"></span><span><span class="rcard__title" style="display: block;">${title}</span><span class="rcard__sub" style="display: block;">${sub}</span></span>${price ? `<span class="rcard__price">${price}</span>` : ''}</button>`;

export default {
  summary: 'Kartu yang bisa dipilih untuk satu pilihan di antara dua sampai empat opsi yang masing-masing butuh judul, satu baris keterangan, dan sering kali harga. Seluruh kartu adalah targetnya; yang dipilih mendapat tepi dan warna aksen.',
  when: [
    'Memilih paket, layanan, atau jenis pengiriman ketika setiap opsi punya deskripsi dan harga: Ambil di loket, Kirim pos, Kurir kilat.',
    'Memilih jalur yang perlu penjelasan: "Ambil sendiri" atau "Diantar ke rumah".',
    'Dua sampai empat opsi, semuanya muat di layar.',
  ],
  whenNot: [
    ['Opsi pendek dengan satu kata masing-masing', 'radio'],
    ['Lebih dari sekitar empat opsi', 'select', 'Atau [combobox](combobox) untuk daftar panjang'],
    ['Beralih antartampilan saat itu juga', 'segmented-control'],
    ['Beberapa bisa dipilih', 'checkbox', 'Atau [chips](chips) untuk label pendek'],
    ['Kartu yang berpindah ke tempat lain', 'link-card'],
    ['Kartu statis yang menampilkan konten', 'card'],
  ],
  where: 'Di [formulir](form-layout) atau langkah pembayaran, bertumpuk selebar layar di ponsel; di layar lebar dalam satu kolom (paling baik untuk membandingkan harga) atau dua sampai tiga berdampingan dalam `.auto-grid`. Taruh aksi utama di bawah kelompok.',
  anatomy: [
    ['[role=radiogroup]', 'Wajib. Pembungkus dengan `aria-label` atau `aria-labelledby` yang menyebut pertanyaannya.'],
    ['button.rcard[role=radio]', 'Wajib. Satu opsi, selebar penuh, padding 16 px, `aria-checked`. Hanya kartu terpilih yang punya `tabindex="0"`.'],
    ['.radio__dot', 'Wajib. Titik yang sama dengan [radio](radio); terisi warna aksen saat kartu dipilih.'],
    ['.rcard__title', 'Wajib. Nama opsi, 15 px semibold. Buat `display: block` (atau pakai elemen blok) agar baris keterangan berada di bawahnya.'],
    ['.rcard__sub', 'Opsional. Satu baris keterangan.'],
    ['.rcard__price', 'Opsional. Angka rata kanan, angka tabular.'],
  ],
  examples: [
    {
      title: 'Pilih cara pengambilan dokumen',
      desc: 'Klik sebuah kartu, atau fokuskan kelompoknya lalu pakai tombol panah: fokus dan pilihan berpindah bersama, seperti radio bawaan.',
      html: `<div class="stack" role="radiogroup" aria-label="Cara pengambilan" style="max-width: 460px; width: 100%;" onclick="${PICK}" onkeydown="${KEYS}">
  ${card('Ambil di loket', 'Siap 3 hari kerja, bawa bukti permohonan', 'Rp 0', false)}
  ${card('Kirim pos', 'Tiba 5 sampai 7 hari kerja', 'Rp 15.000', true)}
  ${card('Kurir kilat', 'Tiba esok hari di dalam kota', 'Rp 35.000', false)}
</div>`,
      code: `<div class="stack" role="radiogroup" aria-label="Cara pengambilan">
  <button type="button" class="rcard" role="radio" aria-checked="false" tabindex="-1">
    <span class="radio__dot" aria-hidden="true"></span>
    <span><span class="rcard__title" style="display: block;">Ambil di loket</span><span class="rcard__sub" style="display: block;">Siap 3 hari kerja, bawa bukti permohonan</span></span>
    <span class="rcard__price">Rp 0</span>
  </button>
  <button type="button" class="rcard" role="radio" aria-checked="true" tabindex="0">…</button>
</div>
<!-- Your code: a click sets aria-checked on that card only; arrow keys move focus and selection; only the checked card has tabindex 0. -->`,
    },
    {
      title: 'Berdampingan, tanpa harga',
      desc: 'Dua cara dengan penjelasan masing-masing, dalam auto grid yang menumpuk di ponsel.',
      html: `<div class="auto-grid" role="radiogroup" aria-label="Cara layanan" style="--min: 220px; max-width: 560px; width: 100%;" onclick="${PICK}" onkeydown="${KEYS}">
  ${card('Datang ke kantor', 'Pilih jam kunjungan dan ambil nomor antrean', '', true)}
  ${card('Layanan daring', 'Unggah berkas, hasil dikirim lewat email', '', false)}
</div>`,
    },
  ],
  states: [
    ['aria-checked="true"', 'Tepi aksen 2 px, latar warna aksen tipis, titik terisi.'],
    ['aria-checked="false"', 'Latar dasar dengan garis tegas 1 px.'],
    [':active', 'Kartu mengecil ke 0.985 dalam 90 ms.'],
    ['focus-visible', 'Focus ring sistem di sekitar kartu.'],
    ['disabled', '`disabled` pada tombol; sebutkan alasannya di `.rcard__sub`.'],
  ],
  motion: [
    'Pilihan: tepi dan warna berubah dalam `--d-fast` (160 ms) dengan `--ease-standard`; titik memantul masuk dengan `--spring-snappy` (360 ms).',
    'Tekan: `scale(0.985)` dalam 90 ms (target lebar hampir tidak mengecil), kembali dengan `--spring-snappy`.',
    'Reduced motion: transisi menjadi 120 ms linear.',
  ],
  a11y: [
    'Kelompoknya adalah `role="radiogroup"` dengan nama; setiap kartu adalah `<button type="button" role="radio">` dengan `aria-checked`.',
    'Fokus berpindah (roving): hanya kartu terpilih yang ada di urutan tab (`tabindex="0"`, yang lain `-1`); tombol panah memindahkan fokus dan pilihan bersamaan dan berputar. Sistem tidak punya skrip untuk ini, jadi tambahkan sendiri (demo menunjukkan beberapa baris yang diperlukan).',
    'Judul dan keterangan menjadi nama aksesibelnya; simpan harga di dalam kartu agar ikut dibacakan.',
  ],
  do: [
    'Pilihkan lebih dulu opsi yang dipilih kebanyakan orang, jika ada.',
    'Buat judul pendek dan baris keterangan satu kalimat.',
  ],
  dont: [
    'Menaruh tombol atau tautan di dalam radio card.',
    'Memakai radio card untuk lebih dari empat opsi, atau untuk opsi satu kata.',
    'Mencampur radio card dan radio biasa dalam satu kelompok.',
  ],
  js: 'Tidak ada di sistem. Setel `aria-checked` dan `tabindex` saat diklik dan tangani tombol panah di kode Anda; CSS memberi gaya status dari `aria-checked`.',
};
