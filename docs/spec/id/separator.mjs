export default {
  summary: 'Garis tipis 1 px di antara dua blok isi yang kalau tidak akan menyatu, polos atau dengan beberapa kata di dalamnya (pemisah tanggal, "atau"). Sering kali jarak atau pemisah bawaan komponen sudah cukup.',
  when: [
    'Dua kelompok berbeda di dalam satu permukaan (kartu, panel, area mirip menu) yang bukan baris daftar.',
    'Di antara blok isi dan footer-nya di dalam kartu.',
    'Berlabel: membagi feed, chat, atau agenda per hari ("Hari ini", "Senin, 16 November"), atau "atau" di antara dua cara masuk.',
  ],
  whenNot: [
    ['Di antara baris daftar', 'list', 'Daftar menggambar garis tipis menjoroknya sendiri'],
    ['Di antara baris label dan nilai', 'key-value'],
    ['Di antara bagian halaman', 'sections', 'Bagian menggambar garis tipis di atas setiap bagian setelah yang pertama'],
    ['Di antara butir menu', 'dropdown-menu', 'Pakai `.menu__sep`'],
  ],
  where: 'Di dalam sebuah permukaan, dari tepi ke tepi isinya, dengan jarak minimal 12 px di atas dan bawah. Jangan pernah di kanvas halaman di antara bagian.',
  anatomy: [
    ['hr.sep', 'Wajib. Blok 1 px berwarna `--hairline`, tanpa margin sendiri.'],
    ['.sep--v', 'Garis tipis vertikal di antara butir dalam satu baris (toolbar, app bar), tinggi minimal 20 px.'],
    ['.sep-label', 'Separator berlabel: heading (`h3`) atau `<p>` yang teksnya berada di antara dua garis tipis dengan gaya caption. `.count` atau `.badge` opsional di dalamnya.'],
  ],
  examples: [
    {
      title: 'Di dalam kartu',
      desc: 'Garis tipis memisahkan ringkasan dari footer-nya. Margin berasal dari layout, bukan dari separator.',
      html: `<div class="card" style="max-width: 360px; width: 100%;">
  <div class="card__title">Kunjungan posyandu</div>
  <div class="card__sub">Anak Anda sudah ditimbang 5 bulan berturut-turut.</div>
  <hr class="sep" style="margin: 16px 0 12px;">
  <div class="card__sub">Jadwal berikutnya: hari ini pukul 09.00</div>
</div>`,
    },
    {
      title: 'Pemisah tanggal di feed',
      desc: 'Separator berlabel memulai setiap hari. `sep-label--start` menghilangkan garis kiri agar tanggal sejajar dengan baris; `sep-label--sticky` menahannya di atas daftar yang bergulir selama hari itu terlihat.',
      html: `<div class="stack" style="--gap: 4px; max-width: 460px;">
  <h3 class="sep-label sep-label--start">Hari ini, 16 Nov</h3>
  <div class="lrow"><span class="lrow__body"><span class="lrow__title">Tagihan retribusi 1042 dibayar</span><span class="lrow__sub">09.12 · Usaha Kopi Way Kanan</span></span></div>
  <div class="lrow"><span class="lrow__body"><span class="lrow__title">Rina Wijaya bergabung ke bidang Perizinan</span><span class="lrow__sub">08.40 · Diundang oleh Arif</span></span></div>
  <h3 class="sep-label sep-label--start">Kemarin, 15 Nov</h3>
  <div class="lrow"><span class="lrow__body"><span class="lrow__title">Ekspor 1.204 data pemohon selesai</span><span class="lrow__sub">17.05 · CSV, 2,1 MB</span></span></div>
</div>`,
    },
    {
      title: 'Di antara dua cara masuk',
      desc: 'Kata di tengah di antara dua garis tipis.',
      html: `<div class="stack" style="--gap: 16px; max-width: 360px;">
  <button class="btn btn--secondary btn--block">Lanjut dengan email dinas</button>
  <p class="sep-label">atau</p>
  <button class="btn btn--plain btn--block">Pakai kode sekali pakai</button>
</div>`,
    },
  ],
  variants: [
    ['.sep', 'Garis tipis mendatar.'],
    ['.sep--v', 'Garis tipis vertikal dalam satu baris.'],
    ['.sep-label', 'Kata di tengah di antara dua garis tipis.'],
    ['.sep-label--start', 'Kata di awal, satu garis tipis setelahnya: pemisah tanggal yang sejajar dengan baris.'],
    ['.sep-label--sticky', 'Menempel di atas wadah gulirnya (`--sticky-top` menggesernya di bawah bilah yang menempel) dengan warna kanvas.'],
  ],
  motion: [
    'Tidak ada.',
  ],
  a11y: [
    'Pakai `<hr>` bila jedanya adalah pergantian topik (diumumkan sebagai separator); tambahkan `aria-hidden="true"` bila hanya visual, agar tidak diumumkan.',
    'Separator berlabel yang menamai kelompok (satu hari) adalah heading, agar orang bisa melompat antar hari; "atau" di antara dua aksi adalah `<p>` biasa.',
  ],
  do: [
    'Coba jarak dulu; tambahkan garis tipis hanya bila jarak tidak cukup.',
    'Beri jarak lewat layout (gap `stack` atau margin), jangan dengan padding pada separator.',
  ],
  dont: [
    'Memakai garis yang lebih tebal atau berwarna.',
    'Menumpuk separator di samping garis tipis daftar atau garis tipis bagian.',
  ],
};
