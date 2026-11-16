const row = (m, d, iso, title, sub, badge = '', mod = '') => `<a class="lrow" href="#dt-${iso}" id="dt-${iso}"><time class="datetile${mod}" datetime="${iso}"><span class="datetile__m">${m}</span><span class="datetile__d">${d}</span></time><span class="lrow__body"><span class="lrow__title">${title}</span><span class="lrow__sub">${sub}</span></span>${badge}<span class="ic lrow__chev" aria-hidden="true">chevron_right</span></a>`;

export default {
  summary: 'Blok kecil berisi bulan dan tanggal di awal baris, untuk daftar hal yang terjadi pada suatu tanggal: kelas, ujian, tagihan jatuh tempo, acara. Orang mencari tanggal sebelum judul, jadi tanggal diletakkan paling depan.',
  when: [
    'Daftar acara atau tenggat mendatang yang dipindai menurut hari: ujian, webinar, tagihan jatuh tempo.',
    'Kartu yang mengumumkan satu hal bertanggal: kelas berikutnya, pembayaran yang jatuh tempo.',
  ],
  whenNot: [
    ['Memilih tanggal', 'date-field'],
    ['Satu bulan sekilas dengan beberapa acara per hari', 'calendar'],
    ['Kapan sesuatu terjadi, di log atau pesan', 'timestamp'],
    ['Riwayat satu catatan', 'timeline'],
  ],
  where: 'Sebagai elemen pertama baris daftar (`.lrow`), 12 px sebelum judul; atau di kiri atas kartu kecil. 44 kali 48 px, tidak pernah lebih besar.',
  anatomy: [
    ['time.datetile', 'Wajib. `<time datetime="YYYY-MM-DD">`, agar tanggalnya terbaca mesin dan dibacakan sebagai "18 Nov".'],
    ['.datetile__m', 'Wajib. Bulan singkat di atas pita tint aksen.'],
    ['.datetile__d', 'Wajib. Tanggalnya, 18 px tabular.'],
    ['.datetile--today', 'Hari ini: tile berubah menjadi aksen.'],
    ['.datetile--past', 'Selesai atau lewat: tile memudar ke 60 %.'],
  ],
  examples: [
    {
      title: 'Yang akan datang dalam daftar',
      desc: 'Hari ini di urutan pertama dan beraksen, lalu minggu berikutnya. Badge menyebut jenis acaranya dalam kata.',
      html: `<div class="list" style="max-width: 460px;">
  ${row('Nov', 16, '2026-11-16', 'Sosialisasi pajak daerah', 'Hari ini, 19.00 sampai 20.30 · Daring', '<span class="badge badge--accent">Langsung</span>', ' datetile--today')}
  ${row('Nov', 18, '2026-11-18', 'Posyandu balita RW 03', 'Rab, buka 08.00 · 3 jam', '<span class="badge">Kesehatan</span>')}
  ${row('Nov', 21, '2026-11-21', 'Ujian tryout, aula B', 'Sab, 09.00 · Kursi 42', '<span class="badge badge--warning">Bawa KTP</span>')}
  ${row('Des', 2, '2026-12-02', 'Retribusi pasar jatuh tempo', 'Rab · Rp 75.000', '')}
</div>`,
    },
    {
      title: 'Lewat dan akan datang',
      desc: 'Acara yang sudah lewat memudar; acara berikutnya tetap penuh.',
      html: `<div class="docs-row" style="gap: 12px;"><time class="datetile datetile--past" datetime="2026-11-09"><span class="datetile__m">Nov</span><span class="datetile__d">9</span></time><time class="datetile" datetime="2026-11-23"><span class="datetile__m">Nov</span><span class="datetile__d">23</span></time><time class="datetile datetile--today" datetime="2026-11-16"><span class="datetile__m">Nov</span><span class="datetile__d">16</span></time></div>`,
    },
  ],
  variants: [
    ['.datetile', 'Akan datang.'],
    ['.datetile--today', 'Hari ini; paling banyak satu per daftar.'],
    ['.datetile--past', 'Lewat atau selesai.'],
  ],
  states: [
    ['in a linked row', 'Barisnya adalah tautan; tile tidak interaktif sendiri.'],
    ['loading', 'Blok `.skel` 44 × 48 dengan radius `--r-md`.'],
  ],
  motion: [
    'Tidak punya gerak sendiri. Baris mengikuti list stagger saat hasil muncul.',
  ],
  a11y: [
    'Pakai `<time datetime>` agar teknologi bantu dan mesin mendapat tanggal lengkap; teks yang terlihat terbaca wajar ("18 Nov").',
    'Tulis juga "Hari ini" di subjudul baris; tile beraksen saja tidak cukup.',
    'Pita bulan berupa teks aksen di atas tint-nya (AA di kedua tema).',
  ],
  do: [
    'Urutkan menurut tanggal, yang terdekat dulu; taruh butir hari ini di paling atas.',
    'Cantumkan nama hari dan jam di subjudul.',
  ],
  dont: [
    'Memakai tile sebagai tombol atau pemilih tanggal.',
    'Menampilkan tahun di tile; tambahkan di subjudul bila daftarnya melewati pergantian tahun.',
  ],
};
