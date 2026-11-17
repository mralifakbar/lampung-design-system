const SPIN = '<span class="spinner" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>';
const CHEV = '<span class="ic" aria-hidden="true">expand_more</span>';

export default {
  summary: 'Satu langkah yang diambil asisten untuk sampai pada jawabannya (mencari di panduan layanan, membaca berkas, memeriksa jadwal), ditampilkan sebagai `<details>` satu baris yang tenang dan bisa dibuka untuk melihat temuannya. Jawaban tetap yang utama.',
  when: [
    'Jawaban asisten bergantung pada sesuatu yang dicari atau dijalankannya, dan orang mungkin ingin memeriksanya: pencarian, berkas yang dibaca, perhitungan, pengecekan jadwal.',
    'Langkah masih berjalan: baris menampilkan spinner dan label berkilau sampai selesai.',
    'Beberapa langkah terjadi berurutan sebelum jawaban: tumpuk, satu baris per langkah.',
  ],
  whenNot: [
    ['Menunggu tanpa langkah yang bisa disebut', 'thinking'],
    ['Sumber yang dikutip dalam jawaban', 'citation'],
    ['Bagian konten halaman yang bisa dilipat (FAQ, rincian)', 'accordion'],
    ['Riwayat tindakan yang dilakukan seseorang', 'timeline'],
    ['Kode yang perlu disalin orang', 'code-block'],
  ],
  where: 'Di dalam [chat message](chat-message) `msg--ai`, di atas `.bubble` yang berisi jawaban, sesuai urutan langkah dijalankan. Selebar kolom jawaban.',
  anatomy: [
    ['details.toolcall', 'Wajib. `<details>` bawaan: isian tenang, radius 12 px.'],
    ['summary', 'Wajib. Satu baris, minimal 40 px: ikon di depan (atau spinner saat berjalan), langkahnya dalam kata-kata, lalu chevron `expand_more` sebagai ikon terakhir.'],
    ['.ic:last-child', 'Wajib. Chevron; berputar 180 derajat saat terbuka. Harus menjadi ikon terakhir di summary.'],
    ['.toolcall__body', 'Apa yang ditemukan atau dilakukan langkah itu: satu kalimat pendek, [list](list), atau [code block](code-block).'],
  ],
  examples: [
    {
      title: 'Yang dicari asisten',
      desc: 'Tertutup secara bawaan. Buka salah satunya untuk memeriksa sumber yang dipakai jawaban.',
      html: `<div class="msg msg--ai" style="max-width: 560px;">
  <details class="toolcall"><summary><span class="ic" aria-hidden="true">search</span>Mencari "surat pindah" di panduan layanan${CHEV}</summary><div class="toolcall__body">Menemukan 3 halaman: persyaratan Disdukcapil, formulir surat pengantar RT/RW, tanya jawab pindah antarkota.</div></details>
  <details class="toolcall"><summary><span class="ic" aria-hidden="true">description</span>Membaca syarat surat pindah${CHEV}</summary><div class="toolcall__body">Yang dibutuhkan: KK, KTP-el, surat pengantar RT/RW, dan alamat tujuan lengkap.</div></details>
  <div class="bubble">Untuk pindah dari Kedaton ke Metro, bawa KK, KTP-el, dan surat pengantar dari RT/RW Anda. Disdukcapil Bandar Lampung biasanya menerbitkan suratnya dalam 3 hari kerja.</div>
</div>`,
    },
    {
      title: 'Langkah yang masih berjalan',
      desc: 'Selama berjalan, spinner menggantikan ikon dan labelnya berkilau. Saat selesai, label berganti menjadi temuannya dan ikon menjadi tanda centang.',
      html: `<div class="msg msg--ai" style="max-width: 560px;">
  <details class="toolcall"><summary><span class="ic" aria-hidden="true">check_circle</span>Memeriksa jadwal Samsat keliling${CHEV}</summary><div class="toolcall__body">Di Way Halim hari Selasa pukul 08.00 sampai 12.00 dan di Kedaton hari Kamis pukul 08.00 sampai 12.00.</div></details>
  <details class="toolcall" id="tc-run"><summary>${SPIN}<span class="shimmer">Mengambil nomor antrean</span>${CHEV}</summary><div class="toolcall__body">Antrean B-014, Selasa pukul 08.30, Samsat keliling Way Halim.</div></details>
  <button class="btn btn--plain btn--sm" style="align-self: flex-start; margin-left: -10px;" onclick="this.hidden = true; const s = document.querySelector('#tc-run summary'); s.firstElementChild.outerHTML = '<span class=&quot;ic&quot; aria-hidden=&quot;true&quot;>check_circle</span>'; const l = s.querySelector('.shimmer'); l.classList.remove('shimmer'); l.textContent = 'Antrean B-014 sudah diambil';">Selesaikan langkah</button>
</div>`,
      code: `<details class="toolcall">
  <summary>
    <span class="spinner" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>
    <span class="shimmer">Mengambil nomor antrean</span>
    <span class="ic" aria-hidden="true">expand_more</span>
  </summary>
  <div class="toolcall__body">…</div>
</details>
<!-- Done: replace the spinner with <span class="ic" aria-hidden="true">check_circle</span>,
     drop the shimmer class and name the result: "Antrean B-014 sudah diambil". -->`,
    },
    {
      title: 'Langkah dengan kode',
      desc: 'Jika langkah menjalankan kode atau query, isinya berupa code block agar orang bisa menyalin dan memeriksanya.',
      html: `<details class="toolcall" open style="max-width: 560px; width: 100%;"><summary><span class="ic" aria-hidden="true">code</span>Menjalankan query pada laporan warga${CHEV}</summary><div class="toolcall__body"><div class="codeblock"><pre>SELECT COUNT(*) FROM reports WHERE kecamatan = 'Kedaton' AND status = 'open';</pre></div></div></details>`,
    },
    {
      title: 'Langkah yang gagal',
      desc: 'Sebutkan apa yang gagal dan apa yang dilakukan jawaban sebagai gantinya. Jawaban di bawahnya tidak boleh berpura-pura langkah itu berhasil.',
      html: `<div class="msg msg--ai" style="max-width: 560px;">
  <details class="toolcall"><summary><span class="ic" aria-hidden="true">cloud_off</span>Tidak bisa membuka gambar-situasi.pdf${CHEV}</summary><div class="toolcall__body">Ukuran berkas lebih dari 20 MB. Jawaban di bawah hanya memakai formulir permohonan Anda.</div></details>
  <div class="bubble">Menurut formulir permohonan Anda, persetujuan bangunan gedung masih membutuhkan gambar situasi sebelum bisa diperiksa petugas.</div>
</div>`,
    },
  ],
  states: [
    ['closed', 'Bawaan: satu baris, chevron mengarah ke bawah.'],
    ['open', '`[open]`: isi langsung tampil; chevron berputar 180 derajat.'],
    ['running', '`.spinner` menggantikan ikon depan dan label `.shimmer`.'],
    ['done', 'Ikon hasil (`check_circle`, `search`, `description`), label menyebut temuannya.'],
    ['failed', 'Ikon biasa (`cloud_off`, `error`) dan alasannya dalam kata-kata; tanpa isian merah.'],
  ],
  motion: [
    'Chevron: berputar 180 derajat dengan `--spring-smooth` (`--d-smooth`, 560 ms); berbalik dari posisinya saat itu jika diklik lagi.',
    'Isi: muncul dan hilang seketika. `<details>` bawaan tidak menganimasikan tingginya di sini; jika tinggi perlu bergerak, pakai [accordion](accordion).',
    'Berjalan: spinner berputar (800 ms per putaran) dan label berkilau dengan siklus 1,8 detik; saat langkah selesai, kilau mengendap menjadi teks solid selama `--d-standard`.',
    'Reduced motion: kilau berhenti (teks solid), chevron berputar dalam 120 ms; spinner tetap berputar karena melaporkan pekerjaan.',
  ],
  a11y: [
    '`<details>`/`<summary>` bawaan: keyboard (Enter, Space) dan status terbuka sudah tersedia. Pertahankan.',
    'Teks summary harus menyebut langkahnya sendiri ("Mencari surat pindah di panduan layanan"), bukan hanya ikon.',
    'Ikon memakai `aria-hidden`; spinner juga. Selama langkah berjalan, pesan diberi `aria-busy="true"`.',
  ],
  do: [
    'Sebut langkah dan objeknya: "Membaca latihan soal 3".',
    'Biarkan langkah tertutup secara bawaan; jawaban yang utama.',
    'Susun langkah sesuai urutan jalannya, di atas jawaban.',
  ],
  dont: [
    'Menampilkan nama tool mentah atau JSON di summary.',
    'Memakainya untuk konten halaman yang perlu dibaca orang; pakai [accordion](accordion).',
    'Membiarkan spinner berputar setelah langkah selesai atau gagal.',
  ],
  js: 'Tidak ada. Ini `<details>` bawaan. Perbarui summary sendiri saat langkah selesai.',
};
