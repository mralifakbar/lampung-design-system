const sample = `<div class="card stack" style="--gap: 12px;">
    <div class="cluster" style="justify-content: space-between;"><span class="card__title">Izin usaha mikro</span><span class="badge badge--success">Buka</span></div>
    <div class="progress"><span class="progress__fill" style="transform: scaleX(0.72);"></span></div>
    <div class="cluster"><button class="btn btn--primary btn--md">Lanjutkan</button><button class="btn btn--secondary btn--md">Persyaratan</button></div>
  </div>`;

export default {
  summary: 'Terang dan gelap berasal dari satu atribut: `data-theme="light|dark|system"` pada `<html>` atau subtree mana pun. Komponen hanya membaca token, jadi mereka berganti sendiri; Anda tidak pernah menulis CSS dark mode untuk sebuah komponen.',
  when: [
    'Menyiapkan halaman: pasang `class="lds"` dan `data-theme` pada `<html>`, lalu panggil `restoreTheme()` sebelum tampilan pertama agar pilihan yang tersimpan langsung dipakai tanpa kedipan.',
    'Menyediakan pengalih tampilan (Terang, Gelap, Sistem) di pengaturan atau footer sidebar.',
    'Sebuah area harus tetap gelap (atau terang) apa pun tema halamannya: pratinjau kode, pemutar media, pita promosi. Pasang `data-theme` hanya pada elemen itu.',
    'Menulis CSS proyek di atas sistem: pakai token (`--bg-fill`, `--text-subtle`, `--line`, `--accent`) agar tambahan Anda ikut berganti dengan tema.',
  ],
  whenNot: [
    ['Menunjukkan status (disetujui, terlambat) dengan warna', 'badge', 'Warna status datang bersama kata dan ikon; jangan pernah memberi tema pada area untuk menandai status.'],
    ['Memilih tampilan dari konten yang sama (bukan penampilan)', 'segmented-control'],
    ['Pengaturan yang menyalakan atau mematikan fitur', 'switch', 'Penampilan punya tiga nilai, jadi ia segmented control, bukan switch.'],
    ['Warna untuk seri data', 'chart-principles', '`--series-1..4` sudah disesuaikan per tema dan urutannya tetap.'],
  ],
  where: '`data-theme` dipasang pada `<html>` untuk halaman. Pengalihnya ada di pengaturan, menu akun, atau footer sidebar, tidak pernah di toolbar utama. Tema terbatas dipasang pada elemen terluar dari area yang harus berbeda.',
  anatomy: [
    ['[data-theme="light"]', 'Bawaan (juga yang didapat `:root` tanpa atribut).'],
    ['[data-theme="dark"]', 'Token gelap untuk elemen ini dan semua isinya.'],
    ['[data-theme="system"]', 'Mengikuti sistem operasi lewat `prefers-color-scheme`, secara langsung.'],
    ['.lds', 'Wajib pada root (atau subtree): font dasar, warna teks, latar kanvas, reset. Tema terbatas juga butuh `.lds`, agar ia menggambar latarnya sendiri.'],
    ['[data-lds-theme]', 'Opsional. Tombol dengan `data-lds-theme="dark"` memanggil `setTheme("dark")` saat diklik setelah `init()`.'],
  ],
  examples: [
    {
      title: 'Pengalih tampilan',
      desc: 'Segmented control yang tombolnya membawa `data-lds-theme`. Ia mengganti seluruh halaman ini dan mengingat pilihannya di `localStorage`.',
      html: `<div class="seg" role="group" aria-label="Tampilan" data-lds-segmented style="width: 300px;">
  <span class="seg__thumb"></span>
  <button class="seg__btn" aria-pressed="true" data-lds-theme="light"><span class="ic ic--sm" aria-hidden="true">light_mode</span>&nbsp;Terang</button>
  <button class="seg__btn" aria-pressed="false" data-lds-theme="dark"><span class="ic ic--sm" aria-hidden="true">dark_mode</span>&nbsp;Gelap</button>
  <button class="seg__btn" aria-pressed="false" data-lds-theme="system"><span class="ic ic--sm" aria-hidden="true">contrast</span>&nbsp;Sistem</button>
</div>`,
    },
    {
      title: 'Tema terbatas',
      desc: 'Kartu yang sama di subtree terang dan gelap, berdampingan di satu halaman. Tidak ada bagian kartu yang tahu sedang di tema apa.',
      html: `<div class="auto-grid" style="--min: 260px;">
  <div class="lds" data-theme="light" style="padding: 20px; border-radius: var(--r-lg);">
  ${sample}
  </div>
  <div class="lds" data-theme="dark" style="padding: 20px; border-radius: var(--r-lg);">
  ${sample}
  </div>
</div>`,
    },
    {
      title: 'Penyiapan halaman tanpa kedipan',
      desc: 'Baca pilihan yang tersimpan sebelum body digambar. `restoreTheme()` menyetel atribut dan mengembalikan mode, sehingga Anda bisa menyelaraskan pengalihnya.',
    },
  ],
  variants: [
    ['light', 'Bawaan. Kanvas putih, kelompok di atas `--bg-fill`.'],
    ['dark', 'Kanvas nyaris hitam (#0B0B0D). Aksen sama, warna seri lebih terang, kilau skeleton lebih lembut.'],
    ['system', 'Mengikuti OS dan langsung diperbarui saat berubah. Bawaan yang baik untuk pengalih setelah orang melihat keduanya.'],
  ],
  motion: [
    'Pergantian tema sengaja instan. `setTheme()` (lewat `swapTheme()`) menambahkan `.lds-theme-swap` ke `<html>` selama 120 ms, yang menyetel `transition: none` pada semuanya, agar warna tidak memudar sepotong-sepotong dengan kecepatan berbeda.',
    'Satu-satunya pengecualian adalah thumb segmented control, yang tetap bergeser dengan `--spring-smooth` selama `--d-smooth` agar pengalihnya terasa fisik.',
    'Reduced motion tidak mengubah apa pun di sini; pergantiannya sudah instan.',
  ],
  a11y: [
    'Kedua tema memenuhi kontras yang sama: `--text-subtle` 6.6:1 di terang dan 7.7:1 di gelap; `--accent-text` 6.7:1 dan 9.4:1. Warna proyek harus diperiksa di keduanya.',
    'Pengalihnya adalah kelompok tombol dengan `aria-pressed` (segmented control), berlabel "Tampilan", dengan ikon dan teks di setiap tombol.',
    '`setTheme` memicu `lds:theme` dengan `{ mode }` pada root; pakai untuk memperbarui `aria-pressed` pada pengalih yang tidak dibuat oleh `init()`.',
    'Jangan menyampaikan apa pun hanya lewat tema; pita gelap terbatas tetap butuh heading dan teksnya sendiri.',
  ],
  do: [
    'Pakai token untuk setiap warna di CSS proyek agar mengikuti tema.',
    'Periksa setiap layar baru dalam terang dan gelap sebelum dirilis.',
    'Setel tema sebelum tampilan pertama dengan `restoreTheme()` di head.',
  ],
  dont: [
    'Menulis aturan `@media (prefers-color-scheme: dark)` untuk komponen; setel `data-theme="system"` sebagai gantinya.',
    'Menulis langsung nilai hex atau latar `#fff` di gaya proyek.',
    'Menganimasikan pergantian tema dengan cross-fade panjang.',
  ],
  js: '`setTheme(mode, root = document.documentElement)` menyetel `data-theme`, menyimpannya di `localStorage` dengan kunci `lds-theme`, dan memicu `lds:theme`. `restoreTheme(root, fallback = "light")` membacanya kembali dan mengembalikan mode. `swapTheme(fn)` menjalankan perubahan DOM apa pun dengan transisi ditahan selama 120 ms. Tombol dengan `data-lds-theme="light|dark|system"` memanggil `setTheme` setelah `init()`.',
};
