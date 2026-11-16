export default {
  summary: 'Lingkaran berisi inisial nama seseorang di atas warna tint, ukurannya diatur dengan `--size`. Pakai inisial sampai ada foto asli; jangan pernah wajah buatan.',
  when: [
    'Menunjukkan siapa: penulis komentar, anggota dalam daftar, orang yang sedang masuk di bilah atas.',
    'Sekelompok orang yang mengerjakan sesuatu (`.avatar-stack`).',
    'Apakah seseorang sedang online (`.avatar__presence`).',
  ],
  whenNot: [
    ['Ikon untuk benda (layanan, jenis berkas)', 'list', 'Pakai `.lrow__icon` di baris daftar'],
    ['Status sistem atau koneksi', 'status-dot'],
    ['Gambar besar yang bisa dibuka', 'thumbnail'],
    ['Jumlah butir yang menunggu', 'count'],
  ],
  where: 'Di awal baris atau pesan, di bilah atas untuk orang yang sedang masuk (32 px), di sel tabel (28 px). Default 40 px; 24 px di baris meta yang padat; 56 sampai 72 px di kepala profil.',
  anatomy: [
    ['.avatar', 'Wajib. Lingkaran selebar `--size` (default 40 px) dengan inisial sebesar 38 % ukurannya, tint aksen.'],
    ['.avatar--gray', 'Tint netral, untuk membedakan orang dalam tumpukan atau untuk orang yang bukan anggota.'],
    ['.avatar--sq', 'Persegi membulat (radius 28 %) untuk organisasi dan kelompok.'],
    ['.avatar__presence', 'Titik hijau di kanan bawah, dilingkari warna kanvas.'],
    ['.avatar-stack', 'Avatar yang bertumpuk (8 px), masing-masing dilingkari warna isian; menyebar saat hover. Atur `--i` per avatar.'],
  ],
  examples: [
    {
      title: 'Ukuran dan varian',
      desc: 'Atur `--size`. Abu-abu untuk bukan anggota, persegi untuk kelompok, presence untuk yang online.',
      html: `<div class="docs-row" style="align-items: flex-end; gap: 14px;">
  <span class="avatar" style="--size: 24px;" aria-hidden="true">AR</span>
  <span class="avatar" style="--size: 32px;" aria-hidden="true">AR</span>
  <span class="avatar" role="img" aria-label="Ayu Rahma, online">AR<span class="avatar__presence"></span></span>
  <span class="avatar avatar--gray" style="--size: 56px;" aria-hidden="true">NS</span>
  <span class="avatar avatar--sq" style="--size: 56px;" role="img" aria-label="Karang taruna">KT</span>
</div>`,
    },
    {
      title: 'Tumpukan',
      desc: 'Anggota yang bertumpuk dengan "+2". Arahkan kursor untuk menyebarkannya.',
      html: `<div class="docs-row">
  <div class="avatar-stack" role="img" aria-label="5 anggota: Ayu, Nadia, Dimas, dan 2 lainnya"><span class="avatar" style="--i: 0;">AR</span><span class="avatar avatar--gray" style="--i: 1;">NS</span><span class="avatar" style="--i: 2;">DP</span><span class="avatar avatar--gray" style="--i: 3;">+2</span></div>
  <span class="card__sub" style="margin: 0;">5 anggota sedang menyunting</span>
</div>`,
    },
    {
      title: 'Di baris daftar',
      desc: 'Nama di sebelah avatar menjadi nama aksesibelnya, jadi avatarnya disembunyikan.',
      html: `<div class="list" style="max-width: 420px;">
  <div class="lrow"><span class="avatar" aria-hidden="true">AR</span><div class="lrow__body"><div class="lrow__title">Ayu Rahma</div><div class="lrow__sub">Ketua RT 04</div></div></div>
  <div class="lrow"><span class="avatar avatar--gray" aria-hidden="true">BW</span><div class="lrow__body"><div class="lrow__title">Budi Wicaksono</div><div class="lrow__sub">Petugas tamu</div></div></div>
</div>`,
    },
  ],
  variants: [
    ['avatar', 'Tint aksen dengan inisial.'],
    ['avatar--gray', 'Tint netral.'],
    ['avatar--sq', 'Persegi membulat untuk kelompok dan organisasi.'],
    ['--size', 'Ukuran apa pun; inisial ikut membesar atau mengecil.'],
    ['avatar-stack', 'Grup bertumpuk, `--i` per butir untuk efek menyebar.'],
  ],
  states: [
    ['online', '`.avatar__presence` di dalam avatar.'],
    ['hover (stack)', 'Setiap avatar bergeser `--i` x 4 px ke kanan dengan `--spring-snappy`.'],
  ],
  motion: [
    'Tumpukan menyebar saat hover: `transform: translateX()` dengan `--spring-snappy` (`--d-snappy`, 360 ms). Tidak ada yang lain bergerak.',
  ],
  a11y: [
    'Bila nama tertulis di sebelahnya, avatar diberi `aria-hidden="true"`.',
    'Bila berdiri sendiri (tumpukan, bilah atas), beri `role="img"` dan `aria-label` berisi nama, serta status kehadirannya dalam kata ("online").',
    'Titik presence tidak boleh menjadi satu-satunya cara mengetahui seseorang online bila hal itu penting; sebutkan juga dalam teks.',
  ],
  do: [
    'Pakai dua inisial dari nama panggilan orang itu.',
    'Batasi tumpukan sampai tiga atau empat, lalu tambahkan "+n".',
  ],
  dont: [
    'Memakai wajah buatan atau foto stok.',
    'Memakai avatar untuk hal yang bukan orang atau kelompok.',
    'Mewarnai avatar menurut peran dengan warna sendiri.',
  ],
};
