const wire = (text) => `const s = this.closest('.slide'); if (!s.dataset.wired) { s.dataset.wired = '1'; s.addEventListener('lds:confirm', () => { s.querySelector('.slide__label').textContent = '${text}'; }); }`;
const slide = (label, done) => `<div class="slide" data-lds-slide>
  <span class="slide__fill" aria-hidden="true"></span>
  <span class="slide__label" aria-live="polite">${label}</span>
  <button class="slide__knob" aria-label="${label}. Tekan Enter untuk mengonfirmasi." onpointerenter="${wire(done)}" onfocus="${wire(done)}"><span class="ic" aria-hidden="true">arrow_forward</span></button>
</div>`;

export default {
  summary: 'Lintasan dengan kenop yang digeser sampai ujung untuk mengonfirmasi langkah mahal di layar sentuh (kirim nilai, kirim pembayaran). Kenop mengikuti jari 1:1, menahan saat melewati ujung, dan terkonfirmasi setelah melewati 85 % lintasan.',
  when: [
    'Konfirmasi mahal dan disengaja di ponsel atau tablet yang tidak boleh terpicu oleh ketukan tak sengaja: kirim nilai akhir, bayar retribusi, kirim ujian untuk dinilai.',
    'Langkah terakhir sebuah alur, di bagian bawah layar dalam jangkauan ibu jari.',
  ],
  whenNot: [
    ['Desktop dengan mouse sebagai input utama', 'hold-to-confirm', 'Menggeser kenop dengan mouse lambat; menahan tombol tidak.'],
    ['Menghapus data bersama atau yang tidak bisa dipulihkan', 'alert-dialog'],
    ['Aksi yang bisa dibatalkan', 'button', 'Langsung jalankan dan tawarkan Urungkan di [toast](toast).'],
    ['Memilih nilai di sepanjang rentang', 'slider'],
  ],
  where: 'Di bagian bawah layar ponsel atau [sheet](sheet), selebar kolom konten (maksimal 340 px dan menyusut agar muat). Satu per layar, dengan ringkasan hal yang dikonfirmasi tepat di atasnya.',
  anatomy: [
    ['.slide[data-lds-slide]', 'Wajib. Lintasan 56 px berbentuk pil di atas `--bg-recessed`.'],
    ['.slide__fill', 'Wajib. Jejak bernuansa aksen yang tumbuh di belakang kenop.'],
    ['.slide__label', 'Wajib. Instruksinya ("Geser untuk mengirim nilai"); memudar saat kenop melewatinya. Ganti teksnya dengan hasil setelah konfirmasi.'],
    ['.slide__knob', 'Wajib. `<button>` 48 px, aksen, dengan ikon `arrow_forward` yang menjadi `check` setelah selesai. Butuh `aria-label`.'],
  ],
  examples: [
    {
      title: 'Kirim nilai',
      desc: 'Geser kenop sampai ujung. Lepas sebelum 85 % dan ia memantul pulang; jentikan cepat ikut dihitung kecepatannya. Dengan keyboard, fokuskan kenop lalu tekan Enter.',
      html: slide('Geser untuk mengirim nilai', 'Nilai terkirim'),
      code: `<div class="slide" data-lds-slide id="submit-grades">
  <span class="slide__fill" aria-hidden="true"></span>
  <span class="slide__label" aria-live="polite">Geser untuk mengirim nilai</span>
  <button class="slide__knob" aria-label="Geser untuk mengirim nilai. Tekan Enter untuk mengonfirmasi."><span class="ic" aria-hidden="true">arrow_forward</span></button>
</div>
<script type="module">
  const s = document.getElementById('submit-grades');
  s.addEventListener('lds:confirm', () => { s.querySelector('.slide__label').textContent = 'Nilai terkirim'; sendGrades(); });
</script>`,
    },
    {
      title: 'Di bawah ringkasan di ponsel',
      desc: 'Hal yang dikonfirmasi berada tepat di atas lintasan.',
      html: `<div class="stack" style="--gap: 16px; max-width: 360px;">
  <dl class="kv-list" style="margin: 0;">
    <div class="kv"><dt>Retribusi izin</dt><dd>Rp 150.000</dd></div>
    <div class="kv"><dt>Dibayar dari</dt><dd>Dompet digital</dd></div>
  </dl>
  ${slide('Geser untuk membayar Rp 150.000', 'Pembayaran terkirim')}
</div>`,
    },
  ],
  states: [
    ['rest', 'Kenop di awal, label terlihat.'],
    ['.is-dragging', 'Selama pointer menahan kenop; kursor `grabbing`.'],
    ['released short', 'Kenop kembali dengan `--spring-momentum` selama `--d-momentum`.'],
    ['.is-done', 'Lintasan menjadi `--success-tint`, label `--success-text` dan semibold, kenop hijau dengan `check`. `lds:confirm` dipicu. Tidak ada reset bawaan.'],
  ],
  motion: [
    'Geser: kenop mengikuti pointer 1:1 (tanpa transisi) dan isian ikut tumbuh; label memudar selama 60 % pertama perjalanan.',
    'Melewati salah satu ujung, ia meregang seperti karet (`over * 52 * 0.55 / (52 + 0.55 * |over|)`), sehingga menahan alih-alih berhenti mendadak.',
    'Lepas: titik akhir diproyeksikan dari 5 sampel pointer terakhir; melewati 85 % perjalanan ia terkonfirmasi dan meluncur ke ujung dengan `--spring-smooth` selama `--d-smooth`, jika tidak ia kembali dengan `--spring-momentum` (satu-satunya tempat sedikit overshoot pantas, setelah sebuah gerakan).',
    'Selesai: warna lintasan dan kenop berganti silang selama `--d-standard`; padding label bergerak dengan `--spring-smooth`.',
    'Dengan reduced motion transisi memendek menjadi 120 ms; geserannya sendiri tetap mengikuti jari.',
  ],
  a11y: [
    'Kenop adalah `<button>`: Tab mencapainya dan Enter langsung mengonfirmasi. Sebutkan ini di `aria-label`-nya.',
    'Pasang `aria-live="polite"` pada `.slide__label` agar hasilnya ("Nilai terkirim") diumumkan saat Anda mengubahnya.',
    'Menggeser bukan satu-satunya jalur: Enter berfungsi, dan untuk pengguna switch atau suara sediakan rute lain (tombol konfirmasi di pengaturan).',
    'Kontras: label adalah `--text-subtle` di atas `--bg-recessed`; label selesai adalah `--success-text` di atas `--success-tint`.',
  ],
  do: [
    'Sebut apa yang akan terjadi di label ("Geser untuk membayar Rp 150.000").',
    'Ganti label dengan hasilnya setelah `lds:confirm`.',
    'Letakkan dalam jangkauan ibu jari di bagian bawah layar.',
  ],
  dont: [
    'Memakainya di layar yang dirancang untuk desktop lebih dulu.',
    'Menaruh dua di satu layar.',
    'Memakainya untuk aksi sehari-hari yang bisa dibatalkan.',
  ],
  js: '`data-lds-slide` pada lintasan. `init()` menangani geseran pointer dengan efek karet dan proyeksi kecepatan, terkonfirmasi setelah 85 %, menyetel `.is-done`, mengganti ikon kenop menjadi `check`, dan memicu `lds:confirm` pada lintasan. Enter pada kenop langsung mengonfirmasi.',
};
