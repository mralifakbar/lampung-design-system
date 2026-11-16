export default {
  summary: 'Bentuk abu-abu dengan tata letak persis seperti konten yang sedang dimuat, dengan kilau lembut yang melintas di atasnya. Saat data datang, tidak ada yang bergeser.',
  when: [
    'Tampilan memuat data dan tata letaknya sudah diketahui: daftar permohonan, header profil, dasbor berisi card.',
    'State memuat dari empat [data states](data-states) (memuat, kosong, error, termuat) untuk tampilan data apa pun.',
  ],
  whenNot: [
    ['Tunggu singkat tanpa tata letak yang diketahui, atau di dalam baris atau kontrol', 'spinner'],
    ['Tombol sedang menjalankan aksinya', 'button'],
    ['Pekerjaan yang terukur (unggah, ekspor)', 'progress-bar'],
    ['Pekerjaan panjang yang lamanya tidak diketahui, saat waktu berjalan penting', 'thinking'],
    ['Data sudah dimuat dan tidak ada isinya', 'empty-state'],
  ],
  where: 'Di tempat konten sebenarnya, di wadah yang sama, dengan ukuran, jarak dan radius yang sama: lingkaran avatar di tempat avatar, dua baris teks di tempat judul dan subjudul. Di ponsel dan layar lebar sama saja; tampilkan baris placeholder sebanyak yang muat di layar pertama, tidak lebih.',
  anatomy: [
    ['.skel', 'Wajib. Satu bentuk placeholder: `--bg-skeleton` dengan radius 8 px. Atur ukurannya inline (lebar, tinggi, radius) agar sesuai elemen sebenarnya.'],
    ['.skel::after', 'Kilaunya: pita terang yang melintas setiap 1,6 detik. Otomatis.'],
    ['container', 'Wadah sebenarnya (`.list`, `.card`) dengan `aria-busy="true"` selama memuat.'],
  ],
  examples: [
    {
      title: 'Baris list',
      desc: 'Ikon persegi dan dua baris, sama dengan baris yang sudah dimuat.',
      html: `<div class="list" style="max-width: 420px;" aria-busy="true" aria-label="Memuat daftar permohonan">
  <div class="lrow" aria-hidden="true"><div class="skel" style="width: 30px; height: 30px;"></div><div class="lrow__body"><div class="skel" style="height: 12px; width: 60%;"></div><div class="skel" style="height: 10px; width: 35%; margin-top: 8px;"></div></div></div>
  <div class="lrow" aria-hidden="true"><div class="skel" style="width: 30px; height: 30px;"></div><div class="lrow__body"><div class="skel" style="height: 12px; width: 48%;"></div><div class="skel" style="height: 10px; width: 30%; margin-top: 8px;"></div></div></div>
  <div class="lrow" aria-hidden="true"><div class="skel" style="width: 30px; height: 30px;"></div><div class="lrow__body"><div class="skel" style="height: 12px; width: 66%;"></div><div class="skel" style="height: 10px; width: 40%; margin-top: 8px;"></div></div></div>
</div>`,
    },
    {
      title: 'Header profil',
      desc: 'Lingkaran untuk avatar, bar lebih lebar untuk heading.',
      html: `<div class="card" style="max-width: 360px;" aria-busy="true" aria-label="Memuat profil">
  <div class="docs-row" aria-hidden="true"><div class="skel" style="width: 56px; height: 56px; border-radius: 50%;"></div><div style="flex: 1;"><div class="skel" style="height: 16px; width: 70%;"></div><div class="skel" style="height: 12px; width: 45%; margin-top: 10px;"></div></div></div>
  <div class="skel" style="height: 12px; width: 100%; margin-top: 20px;" aria-hidden="true"></div>
  <div class="skel" style="height: 12px; width: 82%; margin-top: 8px;" aria-hidden="true"></div>
</div>`,
    },
    {
      title: 'Memuat, lalu termuat',
      desc: 'Tekan tombolnya: baris sebenarnya menggantikan placeholder di kotak yang sama, jadi tidak ada yang bergeser.',
      html: `<div class="docs-col" style="max-width: 420px;">
  <div class="list" id="sk-l" aria-busy="true"><div class="lrow" aria-hidden="true"><div class="skel" style="width: 30px; height: 30px;"></div><div class="lrow__body"><div class="skel" style="height: 12px; width: 55%;"></div><div class="skel" style="height: 10px; width: 30%; margin-top: 8px;"></div></div></div></div>
  <div class="docs-row"><button class="btn btn--secondary btn--sm" onclick="const l = document.getElementById('sk-l'); l.removeAttribute('aria-busy'); l.innerHTML = '<div class=&quot;lrow lrow--icon&quot;><span class=&quot;lrow__icon&quot;><span class=&quot;ic&quot; aria-hidden=&quot;true&quot;>menu_book</span></span><div class=&quot;lrow__body&quot;><div class=&quot;lrow__title&quot;>Izin usaha mikro</div><div class=&quot;lrow__sub&quot;>Tahap 2 dari 4</div></div></div>';">Selesaikan pemuatan</button></div>
</div>`,
      code: `<div class="list" aria-busy="true" aria-label="Memuat daftar permohonan">
  <div class="lrow" aria-hidden="true">
    <div class="skel" style="width: 30px; height: 30px;"></div>
    <div class="lrow__body">
      <div class="skel" style="height: 12px; width: 55%;"></div>
      <div class="skel" style="height: 10px; width: 30%; margin-top: 8px;"></div>
    </div>
  </div>
</div>`,
    },
  ],
  states: [
    ['loading', '`aria-busy="true"` pada wadah, bentuk `.skel` di dalamnya ditandai `aria-hidden`.'],
    ['loaded', 'Ganti bentuk-bentuk itu dengan konten di wadah yang sama dan hapus `aria-busy`.'],
  ],
  motion: [
    'Kilau adalah pita gradien yang bergerak dengan `transform: translateX()` dari -100 % ke 100 % selama 1,6 detik dengan `--ease-inout`, tanpa henti. Hanya `transform` yang beranimasi.',
    'Ganti ke konten sebenarnya secara langsung, atau dengan fade `--d-fast` (160 ms); jangan pernah menggeser konten masuk di atas skeleton.',
    'Reduced motion: animasi berjalan sekali dalam 1 ms, jadi bentuknya abu-abu diam.',
    'Jangan tampilkan skeleton untuk pemuatan di bawah sekitar 300 ms; jangan render apa pun, lalu tampilkan konten.',
  ],
  a11y: [
    'Bentuk-bentuk itu tidak menyampaikan apa pun: `aria-hidden="true"` pada setiap baris placeholder.',
    'Tandai area dengan `aria-busy="true"` dan beri nama ("Memuat daftar permohonan") agar pengguna screen reader tahu ada yang akan datang.',
    'Saat konten datang, ia dibaca dalam alur biasa; jangan umumkan setiap baris.',
  ],
  do: [
    'Tiru tata letak sebenarnya: ukuran, jarak dan radius yang sama.',
    'Tampilkan hanya yang muat di layar pertama.',
    'Variasikan sedikit lebar barisnya, seperti teks sungguhan.',
  ],
  dont: [
    'Memakai blok umum yang tidak sesuai dengan konten; lompatan saat dimuat menggagalkan tujuannya.',
    'Menaruh spinner di atas skeleton.',
    'Mempertahankan skeleton saat pemuatan gagal; tampilkan state error dengan tombol coba lagi.',
  ],
};
