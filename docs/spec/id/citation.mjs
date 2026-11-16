export default {
  summary: 'Pil bernomor kecil setelah sebuah klaim yang menautkan ke sumbernya: `<a class="cite" href="#src-1">1</a>`. Dipakai di artikel dan jawaban asisten agar setiap fakta bisa diperiksa.',
  when: [
    'Jawaban asisten atau ringkasan menyebut fakta dari dokumen: setiap klaim mendapat sitasi bernomor ke dokumen asalnya.',
    'Materi atau laporan merujuk sumber yang dicantumkan di akhir.',
  ],
  whenNot: [
    ['Tautan yang perlu diikuti pembaca sebagai bagian kalimat', 'link'],
    ['Mengutip kata-kata dari sumber', 'quote'],
    ['Jumlah item di samping label', 'count'],
    ['Tag status atau kategori', 'badge'],
    ['Pratinjau halaman tertaut saat hover', 'hover-card'],
  ],
  where: 'Tepat setelah klaim, sebelum atau sesudah titik secara konsisten, tanpa spasi sebelumnya. Daftar sumber bernomor ada di akhir teks atau pesan. Di ponsel, letakkan daftar sumber tepat di bawah jawaban agar lompatannya pendek.',
  anatomy: [
    ['a.cite', 'Wajib. Pil setinggi 18 px di atas `--accent-tint`, angka tabular semibold 11 px dengan `--accent-text`. `href` menunjuk ke entri sumber (atau URL sumber).'],
    ['aria-label', 'Wajib. "Sumber 1", agar tidak dibacakan sebagai angka saja.'],
    ['sources list', 'Daftar berurut di akhir yang itemnya membawa `id` yang sesuai. Di `.prose`, `<ol>` biasa sudah bergaya.'],
  ],
  examples: [
    {
      title: 'Di dalam jawaban, dengan sumber',
      desc: 'Setiap klaim menunjuk ke dokumen asalnya. Arahkan kursor ke angka untuk melihatnya menggelap.',
      html: `<div class="prose">
  <p>Uji kompetensi akhir digelar 18 Desember di ruang B204 <a class="cite" href="#cite-src-1" aria-label="Sumber 1">1</a>. Peserta boleh membawa satu halaman catatan tulisan tangan <a class="cite" href="#cite-src-2" aria-label="Sumber 2">2</a>, dan nilai ujian ini menyumbang 40 % dari nilai akhir <a class="cite" href="#cite-src-1" aria-label="Sumber 1">1</a>.</p>
  <h3>Sumber</h3>
  <ol>
    <li id="cite-src-1"><a href="#syllabus">Silabus Sistem Basis Data, semester 3</a></li>
    <li id="cite-src-2"><a href="#rules">Tata tertib ujian, pasal 12</a></li>
  </ol>
</div>`,
    },
  ],
  states: [
    ['hover', 'Latar menggelap ke `--accent-tint-strong` selama `--d-fast`.'],
    ['focus', 'Focus ring sistem di sekeliling pil.'],
    ['target', 'Item sumber yang dituju; pakai `:target` di CSS proyek Anda atau gulir ke tampilan.'],
  ],
  motion: [
    'Hanya warna hover, selama `--d-fast`. Lompatan ke sumber memakai smooth scroll halaman; dengan reduced motion langsung melompat.',
  ],
  a11y: [
    '`<a href>` dengan `aria-label="Sumber N"`; angka yang terlihat saja tidak bermakna saat dibacakan.',
    'Pil setinggi 18 px, di bawah target sentuh 44 px. Beri jarak antarsitasi dalam teks dan selalu sediakan daftar sumber lengkap sebagai jalan kedua untuk mencapainya.',
    'Beri nomor sumber sesuai urutan kemunculan pertama dan pakai ulang nomornya untuk sitasi berulang.',
  ],
  do: [
    'Beri sitasi untuk setiap klaim faktual dalam jawaban asisten yang berasal dari dokumen.',
    'Cantumkan sumber dengan judul yang dikenali orang.',
  ],
  dont: [
    'Memberi sitasi tanpa daftar sumber.',
    'Memakai sitasi sebagai catatan kaki untuk keterangan sampingan; tulis keterangannya di teks.',
    'Menaruh beberapa pil berderet tanpa teks di antaranya; tulis `1, 2` dalam satu kalimat.',
  ],
};
