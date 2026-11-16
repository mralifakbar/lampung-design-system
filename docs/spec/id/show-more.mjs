export default {
  summary: 'Beberapa butir pertama sebuah daftar, lalu tombol polos yang memunculkan sisanya di tempat dengan spring buka-tutup, dan melipatnya kembali.',
  when: [
    'Daftar yang beberapa butir pertamanya menjawab sebagian besar kunjungan: lima pengumuman terbaru, topik teratas, pembayaran terakhir.',
    'Bagian di halaman ringkasan yang kalau tidak akan mendorong semua yang lain ke bawah layar.',
  ],
  whenNot: [
    ['Bagian terpisah yang dibaca sebagian', 'accordion'],
    ['Data panjang berhalaman (hasil pencarian, daftar peserta)', 'pagination'],
    ['Teks panjang yang harus dibaca utuh', 'prose'],
    ['Tampilan setara dari isi yang sama', 'tabs'],
  ],
  where: 'Di mana pun [daftar](list), [timeline](timeline), atau kumpulan [chip](chips) akan terlalu panjang: di bawah judul bagiannya, selebar kolom. Tombolnya berada di bawah butir yang terlihat, rata kiri dengan butir itu.',
  anatomy: [
    ['.more[data-lds-more]', 'Wajib. Pembungkusnya. `data-more` dan `data-less` mengatur teks tombol ("Tampilkan 4 lagi", "Tampilkan lebih sedikit").'],
    ['first items', 'Wajib. Butir yang selalu tampil, dengan markup biasanya.'],
    ['.more__rest > div', 'Wajib. Butir tersembunyi, diciutkan lewat baris grid; `inert` selama tertutup.'],
    ['button.btn.btn--plain.btn--sm.more__btn', 'Wajib. Tombol buka-tutup; JS menulis teksnya dan `aria-expanded`.'],
    ['.is-open', 'Pada `.more` selama sisanya ditampilkan.'],
  ],
  examples: [
    {
      title: 'Topik',
      desc: 'Enam topik ditampilkan, sisanya di balik tombol.',
      html: `<div class="more" data-lds-more data-more="Tampilkan 5 topik lagi" data-less="Tampilkan lebih sedikit topik" style="max-width: 520px;">
  <div class="cluster"><button class="chip">Kependudukan</button><button class="chip">Kesehatan</button><button class="chip">Pendidikan</button><button class="chip">Perizinan</button><button class="chip">Pajak daerah</button><button class="chip">Transportasi</button></div>
  <div class="more__rest"><div><div class="cluster" style="padding-top: 8px;"><button class="chip">Bencana</button><button class="chip">Lingkungan</button><button class="chip">UMKM</button><button class="chip">Pertanian</button><button class="chip">Pariwisata</button></div></div></div>
  <button class="btn btn--plain btn--sm more__btn"></button>
</div>`,
    },
    {
      title: 'Pengumuman',
      desc: 'Tiga baris terbaru, yang lebih lama berada di tempat di bawahnya. Baris tersembunyi berada di dalam kotak daftar yang sama.',
      html: `<div class="more" data-lds-more data-more="Tampilkan 2 yang lebih lama" data-less="Tampilkan lebih sedikit" style="max-width: 460px;">
  <div class="list">
    <a class="lrow" href="#a1"><span class="lrow__body"><span class="lrow__title">Lokasi ujian hari Sabtu sudah diumumkan</span><span class="lrow__sub">Hari ini</span></span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></a>
    <a class="lrow" href="#a2"><span class="lrow__body"><span class="lrow__title">Perpustakaan daerah buka sampai 22.00 minggu ini</span><span class="lrow__sub">Kemarin</span></span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></a>
    <a class="lrow" href="#a3"><span class="lrow__body"><span class="lrow__title">Jadwal baru vaksinasi di puskesmas</span><span class="lrow__sub">Sen</span></span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></a>
    <div class="more__rest"><div>
      <a class="lrow" href="#a4" style="box-shadow: inset 0 0.5px 0 var(--line-strong);"><span class="lrow__body"><span class="lrow__title">Ruang seminar pindah ke gedung C</span><span class="lrow__sub">Minggu lalu</span></span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></a>
      <a class="lrow" href="#a5"><span class="lrow__body"><span class="lrow__title">Pendaftaran beasiswa daerah sudah dibuka</span><span class="lrow__sub">Minggu lalu</span></span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></a>
    </div></div>
  </div>
  <button class="btn btn--plain btn--sm more__btn"></button>
</div>`,
    },
  ],
  states: [
    ['closed', 'Sisanya diciutkan dan `inert`; tombol `aria-expanded="false"` dengan teks `data-more`.'],
    ['open', '`.more.is-open`; sisanya tampil; tombol `aria-expanded="true"` dengan teks `data-less`.'],
  ],
  motion: [
    '`.more__rest` menganimasikan `grid-template-rows` dari 0fr ke 1fr dengan `--spring-smooth` (`--d-smooth`, 560 ms), sebuah transition, sehingga tekanan kedua di tengah jalan membalik arah.',
    'Butir mempertahankan layout-nya selama terbuka; tidak ada yang memudar atau bergeser ke samping. Reduced motion: linear 120 ms.',
  ],
  a11y: [
    'Tombolnya adalah `<button>` asli dengan `aria-expanded`; JS menjaganya tetap selaras dan memasang `inert` pada sisa yang tertutup sehingga Tab dan pembaca layar melewati butir tersembunyi.',
    'Tulis jumlahnya di teks tombol ("Tampilkan 5 topik lagi"), agar orang tahu apa yang akan didapat.',
    'Setelah dibuka, fokus tetap di tombol; butir baru mengikuti dalam urutan baca hanya bila tombolnya berada setelah butir itu, jadi letakkan tombol di bawah sisanya, seperti markup di atas.',
  ],
  do: [
    'Tampilkan cukup butir sehingga kebanyakan orang tidak perlu tombolnya (tiga sampai enam).',
    'Sebutkan berapa yang disembunyikan.',
  ],
  dont: [
    'Menyembunyikan kurang dari tiga butir; tampilkan saja.',
    'Memakainya untuk data berhalaman yang terus bertambah; pakai [pagination](pagination).',
    'Menaruh butir tersembunyi di kotak kedua di bawah kotak pertama.',
  ],
  js: '`data-lds-more` pada `.more` memasang `.more__btn` untuk mengganti `.is-open`, menulis teks tombol dari `data-more` / `data-less` (default "Show more" / "Show less"), memasang `aria-expanded`, dan membuat `.more__rest` `inert` selama tertutup. Pembagian butir yang tampil dan tersembunyi ada di markup Anda.',
};
