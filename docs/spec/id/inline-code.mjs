export default {
  summary: 'Potongan kode pendek, nama berkas, kunci atau nilai di dalam kalimat: `<code class="code">student_id</code>`, monospace 0,88 em di atas `--bg-recessed`.',
  when: [
    'Menyebut kode, perintah, nama berkas, nama kolom atau nilai persis yang akan diketik orang: `student_id`, `npm run build`, `grades.csv`.',
    'Menampilkan kode pendek yang disalin orang dengan membacanya (kunci pendaftaran kelas dalam petunjuk).',
  ],
  whenNot: [
    ['Kode lebih dari satu baris, atau kode yang disalin dengan tombol', 'code-block'],
    ['Nilai yang disalin dengan sekali tekan', 'copy-button'],
    ['Pintasan keyboard', 'kbd'],
    ['Kata status atau kategori', 'badge'],
  ],
  where: 'Inline, di dalam teks berjalan, teks bantuan, sel tabel dan [prose](prose). Ukurannya mengikuti teks di sekitarnya (0,88 em), jadi cocok di teks isi maupun footnote. Nilai panjang terlipat seperti kata; hindari di kolom ponsel yang sempit.',
  anatomy: [
    ['code.code', 'Wajib. Elemen `<code>`. `--mono` 0,88 em, `--text-strong` di atas `--bg-recessed`, radius 6 px, padding 1 px kali 6 px.'],
  ],
  examples: [
    {
      title: 'Di dalam kalimat',
      desc: 'Nama kolom dan perintah di dalam petunjuk.',
      html: `<p class="measure" style="font: var(--type-body); color: var(--text-default);">Ekspor nilai Anda sebagai <code class="code">grades.csv</code>, lalu pastikan kolom pertamanya <code class="code">student_id</code>. Jalankan <code class="code">npm run import</code> untuk memuatnya.</p>`,
    },
    {
      title: 'Di teks bantuan',
      desc: 'Ukurannya menyesuaikan teks kecil di sekitarnya.',
      html: `<div class="field" style="max-width: 360px;">
  <label class="field__label" for="ic-key">Kunci pendaftaran kelas</label>
  <div class="control"><input id="ic-key" placeholder="DB-2026" aria-describedby="ic-key-help"></div>
  <span class="field__help" id="ic-key-help">Dibagikan oleh dosen Anda, contohnya <code class="code">DB-2026</code>.</span>
</div>`,
    },
  ],
  motion: ['Tidak ada.'],
  a11y: [
    'Pakai elemen `<code>`; screen reader bisa mengumumkannya sebagai kode dan mempertahankan karakter persisnya.',
    'Jangan hanya mengandalkan tampilan monospace untuk menandai sesuatu sebagai teks persis; tulis "ketik" atau "masukkan" di kalimatnya.',
    'Kontras: `--text-strong` di atas `--bg-recessed` jauh di atas 4,5:1 di kedua tema.',
  ],
  do: [
    'Pakai untuk teks persis yang diketik atau dibaca ulang orang.',
    'Buat tetap pendek; pindahkan yang lebih panjang ke [code block](code-block).',
  ],
  dont: [
    'Memakainya untuk penekanan atau nama produk.',
    'Menaruh tombol atau tautan di dalamnya.',
  ],
};
