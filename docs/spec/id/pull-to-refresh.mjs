export default {
  summary: 'Tarik daftar di ponsel ke bawah dari atas: konten mengikuti dengan hambatan, spinner berputar saat masuk, dan setelah melewati 56 px, melepas jari akan memuat ulang. Spinner bertahan sampai pekerjaan selesai, minimal 700 ms agar tidak berkedip.',
  when: [
    'Daftar di ponsel yang isinya berubah di server saat orang sedang melihatnya: jadwal, aktivitas, kotak masuk.',
    'Layar yang dibuka orang untuk mengecek apakah ada yang baru.',
  ],
  whenNot: [
    ['Daftar yang memperbarui dirinya secara real time', 'status-dot', 'Tunjukkan bahwa daftar itu live'],
    ['Memuat halaman berikutnya di bawah daftar', 'spinner'],
    ['Tabel di desktop', 'table', 'Pakai tombol Muat ulang di toolbar-nya'],
  ],
  where: 'Pada `.phone__scroll` di layar tingkat atas, dengan indikator `.refresh` sebagai anak pertama dan `.navbar-gap` sebagai pengisi ruang. Spinner muncul di antara nav bar dan judul besar.',
  anatomy: [
    ['.phone__scroll[data-lds-refresh]', 'Wajib. Elemen yang di-scroll. Anak-anaknya (kecuali pengisi ruang dan indikator) bergeser turun sebesar `--pull`.'],
    ['.refresh', 'Wajib. Berisi [spinner](spinner) yang opacity dan putarannya mengikuti `--pull-p` (0 sampai 1). `aria-hidden`.'],
  ],
  examples: [
    {
      title: 'Memuat ulang jadwal',
      desc: 'Tarik daftar ke bawah dengan mouse atau jari dan lepaskan setelah melewati spinner. Tombolnya melakukan hal yang sama untuk orang yang tidak bisa menarik.',
      html: `<div class="phone phone--inline" style="height: 500px; --phone-top: 0px;">
  <div class="navbar" id="ptr-bar"><span></span><span class="navbar__title" aria-hidden="true">Hari ini</span><div class="navbar__end"><button type="button" class="icon-btn" aria-label="Muat ulang" data-lds-refresh-for="ptr-scroll"><span class="ic" aria-hidden="true">refresh</span></button></div></div>
  <div class="phone__scroll" id="ptr-scroll" data-lds-navbar="ptr-bar" data-lds-refresh>
    <div class="refresh" aria-hidden="true"><span class="spinner" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span></div>
    <div class="navbar-gap"></div>
    <h3 class="large-title">Hari ini</h3>
    <div style="padding: 12px 16px 40px;"><div class="list list--fill">
      <div class="lrow"><span class="lrow__body"><span class="lrow__title">Pemeriksaan ibu hamil</span><span class="lrow__sub">08.00 · Puskesmas, ruang 2</span></span></div>
      <div class="lrow"><span class="lrow__body"><span class="lrow__title">Imunisasi balita</span><span class="lrow__sub">13.00 · Posyandu Melati</span></span></div>
      <div class="lrow"><span class="lrow__body"><span class="lrow__title">Konsultasi gizi</span><span class="lrow__sub">15.30 · Puskesmas, ruang 5</span></span></div>
    </div></div>
  </div>
</div>`,
      code: `<div class="phone__scroll" data-lds-navbar="today-bar" data-lds-refresh>
  <div class="refresh" aria-hidden="true"><span class="spinner" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span></div>
  <div class="navbar-gap"></div>
  <h1 class="large-title">Hari ini</h1>
  …
</div>
<script type="module">
  import { toast } from 'lampung-design-system/js';
  scroller.addEventListener('lds:refresh', (e) => e.detail.wait(loadSchedule().then(() => toast({ title: 'Jadwal sudah terbaru' }))));
</script>`,
    },
  ],
  states: [
    ['.is-pulling', 'Mengikuti jari; tanpa transisi.'],
    ['.is-refreshing', 'Tertahan di 56 px dengan spinner berputar; `aria-busy="true"` pada elemen scroll.'],
  ],
  motion: [
    'Tarikan mengikuti jari dengan hambatan: `over·200·0.55 / (200 + 0.55·over)`, jadi makin melambat saat makin jauh dan tidak pernah melewati 200 px.',
    'Spinner muncul perlahan dan berputar hingga 270° mengikuti tarikan, dan baru berputar terus setelah pemuatan ulang berjalan.',
    'Dilepas sebelum 56 px: konten memantul kembali dengan `--spring-smooth`. Lewat dari itu: konten berhenti di 56 px, tertahan selama bekerja (minimal 700 ms), lalu memantul kembali.',
    'Reduced motion: gerak kembali menjadi 120 ms linear; tarikan tetap mengikuti jari.',
  ],
  a11y: [
    'Tarikan tidak pernah menjadi satu-satunya cara: sediakan tombol Muat ulang atau muat ulang saat layar dibuka lagi, dan panggil `startRefresh(scroller)` dari sana.',
    'Sampaikan hasilnya dengan kata-kata (toast seperti "Jadwal sudah terbaru"), bukan hanya dengan hilangnya spinner.',
    'Elemen scroll mendapat `aria-busy="true"` selama memuat ulang.',
  ],
  do: [
    'Pakai hanya di layar yang isinya bisa berubah saat orang melihatnya.',
    'Tunggu permintaan sebenarnya dengan `e.detail.wait(promise)`.',
  ],
  dont: [
    'Menambahkannya ke layar di dalam sheet atau formulir yang didorong masuk.',
    'Menampilkan spinner kedua di daftar pada saat yang sama.',
  ],
  js: '`data-lds-refresh` pada elemen scroll: tarikan sentuh (overscroll bawaan ditahan selama menarik) dan tarikan mouse dari atas. Memicu `lds:refresh` dengan `wait(promise)` pada elemen scroll. `startRefresh(scroller)` menjalankannya tanpa gestur; tombol dengan `data-lds-refresh-for="scrollerId"` melakukan hal yang sama tanpa skrip.',
};
