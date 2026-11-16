export default {
  summary: 'Halaman sebagai kolom berisi bagian-bagian berjudul: berjarak 48 px, garis tipis di atas setiap bagian setelah yang pertama, heading lebih besar di layar lebar. Struktur dibentuk oleh ruang dan heading, bukan kartu di sekeliling setiap bagian.',
  when: [
    'Halaman apa pun yang punya lebih dari satu bagian: halaman layanan (ringkasan, jadwal, persyaratan), dasbor, pengaturan, profil.',
    'Sebuah bagian butuh heading dengan penjelasan satu baris opsional (`.section__sub`).',
    'Sebuah bagian punya subkelompok kecil yang butuh heading tenang sendiri (`.section__title-sm`).',
  ],
  whenNot: [
    ['Judul halaman, breadcrumbs, dan aksi halaman di atas', 'page-header'],
    ['Bagian yang dibuka satu per satu (FAQ, pengaturan panjang)', 'accordion'],
    ['Bagian yang dipilih bergantian alih-alih digulir', 'tabs'],
    ['Teks bacaan panjang dengan heading (artikel, peraturan)', 'prose'],
    ['Daftar samping berisi bagian untuk melompat di halaman panjang', 'outline', 'Pakai di samping sections, ditautkan ke id-nya'],
    ['Kotak berbingkai yang mengelompokkan satu objek (layanan, orang)', 'card'],
  ],
  where: 'Kolom utama halaman, di bawah [page header](page-header), di dalam [app shell](app-shell) atau di bawah [top nav](top-nav). Satu `.sections` per halaman; ia mengisi kolom konten (batasi kolomnya dengan `.measure` atau shell, bukan sections). Jarak turun ke 40 px di bawah 720 px.',
  anatomy: [
    ['.sections', 'Wajib. Kolomnya, 48 px di antara bagian (40 px di ponsel).'],
    ['section.section', 'Wajib. Satu bagian. Di dalam `.sections`: 20 px di antara anak-anaknya dan, setelah yang pertama, padding atas 40 px di atas garis tipis.'],
    ['.section__head', 'Wajib. Berisi `h2` dan baris sub opsional, berjarak 6 px.'],
    ['.section__head h2', 'Wajib. Title 2 (Title 1 mulai 900 px), pembungkusan seimbang. `.section` mandiri di luar `.sections` memakai Title 3 yang lebih kecil.'],
    ['.section__sub', 'Opsional. Satu kalimat tentang bagian ini, ukuran subhead, paling lebar 68 karakter.'],
    ['.section__title-sm', 'Opsional. `h3` tenang (ukuran headline) untuk subkelompok di dalam bagian.'],
  ],
  examples: [
    {
      title: 'Halaman layanan',
      desc: 'Heading dan ruang yang mengelompokkan; konten di setiap bagian memakai komponen biasa.',
      html: `<div class="sections" style="width: 100%;">
  <section class="section" aria-labelledby="sx-1">
    <div class="section__head"><h2 id="sx-1">Minggu ini</h2><p class="section__sub">Apa yang harus diselesaikan sebelum Jumat dan di mana loket layanannya.</p></div>
    <div class="list">
      <a class="lrow" href="#"><span class="lrow__body"><span class="lrow__title">Lengkapi surat domisili</span></span><span class="badge badge--warning">Besok</span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></a>
      <a class="lrow" href="#"><span class="lrow__body"><span class="lrow__title">Survei lokasi usaha</span></span><span class="badge">Kam</span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></a>
    </div>
  </section>
  <section class="section" aria-labelledby="sx-2">
    <div class="section__head"><h2 id="sx-2">Dokumen</h2></div>
    <p class="section__sub">Surat dan bukti layanan ditambahkan setelah setiap tahap selesai.</p>
  </section>
</div>`,
    },
    {
      title: 'Subkelompok di dalam bagian',
      desc: '`.section__title-sm` menjadi heading kelompok kecil; heading bagian tetap satu-satunya yang besar.',
      html: `<div class="sections" style="width: 100%;">
  <section class="section" aria-labelledby="sx-3">
    <div class="section__head"><h2 id="sx-3">Akun</h2><p class="section__sub">Cara Anda masuk dan apa yang kami kirimkan.</p></div>
    <div class="stack" style="--gap: 10px;">
      <h3 class="section__title-sm">Masuk</h3>
      <dl class="kv-list"><div class="kv"><dt>Email</dt><dd>siti.rahma@contoh.id</dd></div><div class="kv"><dt>Kata sandi</dt><dd>Diubah 3 bulan lalu</dd></div></dl>
    </div>
    <div class="stack" style="--gap: 10px;">
      <h3 class="section__title-sm">Notifikasi</h3>
      <label class="switch"><input type="checkbox" role="switch" checked><span class="switch__track" aria-hidden="true"><span class="switch__thumb"></span></span>Pengingat jatuh tempo</label>
    </div>
  </section>
</div>`,
    },
  ],
  variants: [
    ['.sections > .section', 'Bagian halaman: heading Title 2 atau 1, garis tipis di antaranya.'],
    ['.section (standalone)', 'Kelompok berjudul di dalam sesuatu yang lain (dialog, panel samping): heading Title 3, jarak 12 px, tanpa garis tipis.'],
  ],
  motion: [
    'Sections tidak beranimasi sendiri. Konten di dalamnya boleh tiba dengan [reveal on scroll](reveal-on-scroll) (`data-lds-reveal`), sekali, hanya di bawah lipatan layar.',
    'Jangan pernah memunculkan seluruh bagian secara bertahap saat dimuat; halaman harus langsung bisa dibaca.',
  ],
  a11y: [
    'Setiap bagian adalah `<section>` dengan `aria-labelledby` yang menunjuk `h2`-nya, sehingga muncul sebagai region di daftar landmark.',
    'Jaga urutan tingkat heading: `h1` halaman di header, `h2` per bagian, `h3` (`.section__title-sm`) di dalamnya.',
    'Beri bagian id jika [outline](outline) atau tautan melompat ke sana.',
  ],
  do: [
    'Namai bagian sesuai apa yang dilakukan atau ditemukan di sana ("Minggu ini", "Dokumen").',
    'Biarkan list, key value, dan statistik langsung berada di bagian tanpa kartu pembungkus.',
  ],
  dont: [
    'Membungkus setiap bagian dengan `.card` atau menambah border; garis tipis dan ruang sudah memisahkannya.',
    'Menambah margin ekstra di antara bagian; ritme 48 px adalah sistemnya.',
    'Menulis heading bagian dengan huruf kapital semua atau sebagai eyebrow.',
  ],
};
