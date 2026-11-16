const IN = (i) => `style="animation: lds-blur-in var(--d-standard) var(--ease-enter) both; animation-delay: ${Math.min(i, 4) * 35}ms;"`;
const RESULT = (i, t, s) => `<a class="lrow" href="#" ${IN(i)}><span class="lrow__body"><span class="lrow__title">${t}</span><span class="lrow__sub">${s}</span></span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></a>`;
const NOTE = (i, initials, t, s, cls = '') => `<div class="lrow" ${IN(i)}><span class="avatar${cls}" style="--size: 36px;">${initials}</span><span class="lrow__body"><span class="lrow__title">${t}</span><span class="lrow__sub">${s}</span></span></div>`;
const KPI = (i, label, value) => `<article class="kpi" ${IN(i)}><div class="kpi__head"><span class="kpi__label">${label}</span></div><div class="kpi__value">${value}</div></article>`;

export default {
  summary: 'Saat sekelompok butir tiba bersamaan, setiap butir menyusul butir sebelumnya dengan jeda 35 ms, memudar masuk dari blur 4 px dan naik 4 px. Seluruh rangkaian selesai di bawah 400 ms, sehingga daftar terbaca sebagai satu kedatangan yang punya arah, bukan iring-iringan yang lambat.',
  when: [
    'Hasil pencarian atau hasil filter yang tiba setelah orang memintanya.',
    'Notifikasi atau pesan baru yang masuk bersamaan selama panel tertutup.',
    'Kartu-kartu dasbor pada pemuatan pertama dalam satu sesi.',
    'Butir menu atau sheet yang terbuka dengan daftar yang dibuat saat itu juga (hanya jika belum dirender sebelumnya).',
  ],
  whenNot: [
    ['Satu butir yang bergabung ke daftar yang sudah ada', 'enter-and-exit'],
    ['Gambar dan ilustrasi yang muncul saat halaman di-scroll', 'reveal-on-scroll', 'Punya stagger sendiri 30 ms, dibatasi sampai butir keempat.'],
    ['Daftar yang sama dirender ulang setelah diurutkan atau berubah sedikit', 'motion-principles', 'Jangan dianimasikan; cukup perbarui.'],
    ['Konten yang masih dimuat', 'skeleton'],
    ['Riwayat obrolan panjang yang dibuka', 'chat-layout', 'Jangan pernah memberi stagger pada riwayat.'],
  ],
  where: 'Pada anak langsung dari daftar yang tiba: baris `.lrow`, `.card` dan kartu `.kpi` di dalam `auto-grid`, `.file-row`. Jangan pada kontainer daftar dan jangan pada bagian bertingkat di dalamnya.',
  examples: [
    {
      title: 'Hasil pencarian yang tiba',
      desc: 'Hasil mengalir dari atas ke bawah: yang pertama langsung terbaca, yang terakhir sudah tiba pada 380 ms. Tekan Putar ulang.',
      html: `<div class="docs-col" style="max-width: 440px;">
  <div class="control search"><span class="ic" aria-hidden="true">search</span><input aria-label="Cari layanan" value="akta"></div>
  <div class="list">
    ${RESULT(0, 'Akta kelahiran', 'Kependudukan, terbit dalam 3 hari kerja')}
    ${RESULT(1, 'Akta kematian', 'Kependudukan, terbit dalam 3 hari kerja')}
    ${RESULT(2, 'Akta perkawinan', 'Kependudukan, perlu surat dari KUA')}
    ${RESULT(3, 'Perubahan data akta', 'Kependudukan, perlu putusan pengadilan')}
    ${RESULT(4, 'Salinan akta yang hilang', 'Kependudukan, perlu surat kehilangan')}
  </div>
</div>`,
      code: `<!-- Sistem belum punya kelas stagger: keyframe dan token adalah kontraknya. -->
<a class="lrow" href="…" style="animation: lds-blur-in var(--d-standard) var(--ease-enter) both; animation-delay: 0ms;">…</a>
<a class="lrow" href="…" style="animation: lds-blur-in var(--d-standard) var(--ease-enter) both; animation-delay: 35ms;">…</a>
<!-- jeda = min(indeks, 4) × 35 ms: semua butir setelah butir kelima tiba bersama butir kelima -->`,
    },
    {
      title: 'Notifikasi yang masuk bersamaan',
      desc: 'Membuka panel setelah pagi yang sibuk: tiga notifikasi baru tiba berurutan, yang terbaru di atas.',
      html: `<div class="list" style="width: 100%; max-width: 440px;">
  ${NOTE(0, 'AP', 'Ana Putri menanggapi laporan Anda', '2 menit lalu')}
  ${NOTE(1, 'RS', 'Rizal Siregar memperbarui status perbaikan jalan', '40 menit lalu', ' avatar--gray')}
  ${NOTE(2, 'BK', 'Tagihan PBB tahun ini sudah terbit', '1 jam lalu', ' avatar--gray')}
</div>`,
    },
    {
      title: 'Kartu dasbor pada pemuatan pertama',
      desc: 'Kartu KPI tiba dari kiri ke kanan sesuai urutan baca. Lakukan ini hanya pada pemuatan pertama dalam sesi; kembali ke halaman ini menampilkannya seketika.',
      html: `<div class="auto-grid" style="--min: 150px; width: 100%;">
  ${KPI(0, 'Laporan hari ini', '128')}
  ${KPI(1, 'Menunggu tindak lanjut', '24')}
  ${KPI(2, 'Rata-rata waktu tanggap', '2,4 hari')}
  ${KPI(3, 'Selesai minggu ini', '96')}
</div>`,
    },
  ],
  motion: [
    'Setiap butir: `lds-blur-in` (dari `translateY(4px)`, `blur(4px)`, transparan) selama `--d-standard` (240 ms) dengan `--ease-enter`, dengan `animation-fill-mode: both` sehingga butir tersembunyi sampai gilirannya.',
    'Jeda: `min(index, 4) × 35 ms`. Butir kelima dan seterusnya berbagi jeda 140 ms, sehingga rangkaian selesai pada 380 ms berapa pun panjang daftarnya.',
    'Urutan mengikuti urutan baca: atas ke bawah di daftar, kiri ke kanan lalu ke bawah di grid. Yang terbaru di atas pada feed.',
    'Diputar sekali saat tiba. Keyframe boleh dipakai di sini karena kedatangan tidak dibalik; jika daftar diganti lagi di tengah rangkaian, render butir baru dan biarkan rangkaiannya sendiri dimulai, jangan menunggu.',
    'Jangan beri stagger pada gerakan keluar: butir pergi bersamaan dalam 180 ms dengan `--ease-exit`, atau menutup ruangnya dengan [height expand](height-expand).',
    'Reduced motion: animasi berjalan dalam 1 ms, sehingga butir langsung muncul bersamaan.',
  ],
  a11y: [
    'Konten sudah ada di DOM sejak awal; hanya penggambarannya yang ditunda, sehingga pembaca layar dan pencarian di halaman langsung menemukannya.',
    'Umumkan jumlah hasil sekali ("5 hasil") di live region yang sopan; gerakannya tidak mengumumkan apa pun.',
    'Jaga total di bawah 400 ms agar pengguna keyboard tidak pernah menunggu untuk mencapai sebuah butir.',
  ],
  do: [
    'Beri stagger hanya pada hal yang tiba bersamaan karena orang memintanya.',
    'Batasi jeda sampai butir kelima.',
    'Pakai keyframe dan token yang sama dengan sistem (`lds-blur-in`, `--d-standard`, `--ease-enter`).',
  ],
  dont: [
    'Memberi stagger pada setiap daftar di setiap render, atau mengulang stagger setelah diurutkan.',
    'Memakai jeda lebih dari 35 ms atau rangkaian lebih dari 400 ms.',
    'Memberi stagger pada gerakan keluar atau pada anak bertingkat di dalam setiap butir.',
  ],
  js: 'Tidak ada: ini CSS pada butirnya. Belum ada kelas atau atribut sistem untuk ini, jadi pasang animasinya secara inline (atau lewat style prop di framework) seperti contoh. Untuk gambar yang muncul saat scroll, pakai `data-lds-reveal` dengan `--i`.',
};
