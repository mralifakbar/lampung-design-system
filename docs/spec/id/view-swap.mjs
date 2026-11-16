const STEP = (n, label, cls) => `<li class="step${cls ? ' ' + cls : ''}"><span class="step__head"><span class="step__dot">${n}</span>${n < 3 ? '<span class="step__bar" aria-hidden="true"></span>' : ''}</span><span class="step__label">${label}</span></li>`;
const GO = (d) => `const f = this.closest('[data-flow]'); const panes = f.querySelectorAll('[data-pane]'); let i = [...panes].findIndex((p) => !p.hidden); i = Math.max(0, Math.min(panes.length - 1, i + (${d}))); panes.forEach((p, j) => { p.hidden = j !== i; }); f.querySelectorAll('.step').forEach((s, j) => { s.classList.toggle('is-done', j < i); s.classList.toggle('is-current', j === i); s.querySelector('.step__dot').innerHTML = j < i ? '<span class=&quot;ic&quot; aria-hidden=&quot;true&quot;>check</span>' : String(j + 1); }); f.querySelector('[data-back]').disabled = i === 0; f.querySelector('[data-next]').textContent = i === panes.length - 1 ? 'Kirim permohonan' : 'Lanjutkan'; panes[i].querySelector('h3').focus();`;
const IN = 'style="animation: lds-blur-in var(--d-standard) var(--ease-enter);"';
const IN_GAP = 'style="animation: lds-blur-in var(--d-standard) var(--ease-enter); margin-top: 16px;"';

export default {
  summary: 'Satu tampilan menggantikan tampilan lain di tempat yang sama: panel tab, langkah berikutnya dalam formulir, rentang lain pada grafik. Tampilan lama langsung hilang dan yang baru memudar masuk dari blur 4 px dan naik 4 px dalam 240 ms. Cukup cepat agar tidak pernah terasa seperti memuat halaman; cukup lembut agar mata melihat perubahannya.',
  when: [
    'Formulir bertahap maju atau mundur: isi langkah berganti di bawah header [steps](steps) dan tombol yang tetap.',
    '[Tab](tabs) atau [segmented control](segmented-control) mengganti konten di bawahnya.',
    'Kartu atau panel mengganti isinya (minggu ini, bulan ini) sementara bingkainya tetap.',
  ],
  whenNot: [
    ['Membuka layer di atas tampilan saat ini', 'enter-and-exit'],
    ['Konten yang terbuka di bawah dan mendorong halaman', 'height-expand'],
    ['Thumbnail yang membesar menjadi gambar penuh', 'shared-element'],
    ['Hanya kata atau angka yang berubah', 'text-morph', 'Untuk angka, pakai [number count](number-count).'],
    ['Berpindah ke halaman lain', 'nav-progress'],
  ],
  where: 'Pada wilayah yang berubah, di bawah kontrol yang mengubahnya. Kontrol, header, dan tombol aksi tetap diam; hanya kontennya yang berganti.',
  examples: [
    {
      title: 'Formulir bertahap, maju dan mundur',
      desc: 'Lanjutkan dan Kembali mengganti isi langkah; header steps mengisi bilahnya dengan kurva in-out dan fokus pindah ke judul baru. Tidak ada yang bergeser ke samping, jadi mundur terasa sama dengan maju.',
      html: `<div data-flow style="max-width: 520px;">
  <ol class="steps" aria-label="Permohonan izin usaha">${STEP(1, 'Jenis usaha', 'is-current')}${STEP(2, 'Dokumen', '')}${STEP(3, 'Tinjau', '')}</ol>
  <div class="card" style="margin-top: 20px; min-height: 132px;">
    <div data-pane ${IN}><h3 class="card__title" tabindex="-1">Pilih jenis usaha</h3><p class="card__sub">Usaha mikro, kuliner, dengan tempat usaha di rumah sendiri.</p></div>
    <div data-pane hidden ${IN}><h3 class="card__title" tabindex="-1">Unggah dokumen Anda</h3><p class="card__sub">KTP, kartu keluarga, dan foto tempat usaha.</p></div>
    <div data-pane hidden ${IN}><h3 class="card__title" tabindex="-1">Tinjau dan kirim</h3><p class="card__sub">Periksa jenis usaha dan ketiga dokumen, lalu kirim permohonan.</p></div>
  </div>
  <div class="form__actions" style="margin-top: 16px;"><button class="btn btn--secondary" data-back disabled onclick="${GO(-1)}">Kembali</button><button class="btn btn--primary" data-next onclick="${GO(1)}">Lanjutkan</button></div>
</div>`,
      code: `<ol class="steps" aria-label="Permohonan izin usaha">…</ol>
<section class="step-view" aria-labelledby="step-title" style="animation: lds-blur-in var(--d-standard) var(--ease-enter);">
  <h3 id="step-title" tabindex="-1">Unggah dokumen Anda</h3>
  …
</section>
<!-- Render langkah baru (atau tampilkan): animasinya diputar setiap kali elemen ditampilkan.
     Lalu pindahkan fokus ke judulnya. -->`,
    },
    {
      title: 'Panel tab',
      desc: 'Garisnya bergeser; panel di bawahnya berganti dengan blur-in. `.tab-panel` sudah memiliki pergantian ini.',
      html: `<div style="max-width: 460px;">
  <div class="tabs" role="tablist" aria-label="Laporan jalan rusak" data-lds-tabs>
    <span class="tabs__ink"></span>
    <button class="tabs__btn" role="tab" aria-selected="true" aria-controls="vs-1">Rincian</button>
    <button class="tabs__btn" role="tab" aria-selected="false" aria-controls="vs-2">Penanganan</button>
    <button class="tabs__btn" role="tab" aria-selected="false" aria-controls="vs-3">Tanggapan <span class="tabs__count">28</span></button>
  </div>
  <div class="tab-panel" role="tabpanel" id="vs-1">Lubang selebar 1,5 meter di lajur kiri, dekat halte bus kota.</div>
  <div class="tab-panel" role="tabpanel" id="vs-2" hidden>Survei lokasi selesai. Penambalan dijadwalkan Selasa, perkiraan biaya Rp 4.500.000.</div>
  <div class="tab-panel" role="tabpanel" id="vs-3" hidden>28 warga mendukung laporan ini. 4 menambahkan foto baru.</div>
</div>`,
    },
    {
      title: 'Kartu yang mengganti rentangnya',
      desc: 'Segmented control mengganti periode; angka dan labelnya berganti di bawah sementara bingkai kartu tetap di tempat.',
      html: `<div class="card" style="width: 100%; max-width: 360px;">
  <div class="seg" role="group" aria-label="Periode" data-lds-segmented onclick="const b = event.target.closest('.seg__btn'); if (!b) return; const i = [...this.querySelectorAll('.seg__btn')].indexOf(b); this.parentElement.querySelectorAll('[data-pane]').forEach((p, j) => { p.hidden = j !== i; });">
    <span class="seg__thumb"></span>
    <button class="seg__btn" aria-pressed="true">Minggu</button>
    <button class="seg__btn" aria-pressed="false">Bulan</button>
    <button class="seg__btn" aria-pressed="false">Tahun</button>
  </div>
  <div data-pane ${IN_GAP}><p class="chart-card__big">12.480</p><p class="card__sub">Penumpang bus kota minggu ini</p></div>
  <div data-pane hidden ${IN_GAP}><p class="chart-card__big">51.326</p><p class="card__sub">Penumpang bus kota bulan ini</p></div>
  <div data-pane hidden ${IN_GAP}><p class="chart-card__big">604.912</p><p class="card__sub">Penumpang bus kota tahun ini</p></div>
</div>`,
    },
  ],
  motion: [
    'Pergantian: tampilan lama langsung disembunyikan; yang baru memutar `lds-blur-in` (naik 4 px, blur 4 px, opacity 0 ke 1) selama `--d-standard` (240 ms) dengan `--ease-enter`. `.tab-panel` sudah memilikinya.',
    'Arah: tidak ada. Maju dan mundur terlihat sama. Header [steps](steps) yang membawa arah: bilahnya terisi selama `--d-considered` (480 ms) dengan `--ease-inout` dan titiknya berubah menjadi centang.',
    'Jaga bingkai tetap diam: kontainer, header, dan tombol tidak pernah beranimasi; jika tampilan baru lebih tinggi, bingkainya cukup membesar.',
    'Interupsi: tekanan kedua dalam 240 ms itu langsung mengganti lagi; tampilan terbaru memulai pudarnya sendiri. Tidak ada yang menunggu tampilan sebelumnya.',
    'Reduced motion: pudar berjalan dalam 1 ms, sehingga tampilan berganti seketika; bilah steps terisi dalam 120 ms.',
  ],
  a11y: [
    'Pindahkan fokus ke judul langkah baru (`tabindex="-1"`) agar pembaca layar mengumumkan posisinya.',
    'Tampilan yang tersembunyi memakai `hidden`, bukan sekadar transparan, sehingga keluar dari urutan tab dan pohon aksesibilitas.',
    'Tab tetap memakai `aria-selected` dan `aria-controls`; steps tetap memakai `aria-current="step"` pada langkah aktif.',
  ],
  do: [
    'Jaga kontrol dan bingkai tetap diam dan ganti hanya kontennya.',
    'Tunjukkan arah di header steps, bukan dengan geseran ke samping.',
    'Fokuskan judul baru setelah langkah berganti.',
  ],
  dont: [
    'Menggeser seluruh tampilan ke kiri dan kanan, atau memudarkan silang kedua tampilan bertumpuk sekaligus.',
    'Menganimasikan tinggi bingkai pada setiap pergantian.',
    'Membuat tombol Lanjutkan menunggu animasi.',
  ],
  js: 'Tab: `data-lds-tabs` menyembunyikan dan menampilkan panel untuk Anda. Steps dan pergantian lain: ubah `hidden` (atau render tampilan baru); animasinya diputar setiap kali elemen ditampilkan. Sistem tidak punya kelas pergantian berarah.',
};
