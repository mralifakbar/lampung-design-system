const SPIN = '<span class="spinner" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>';
const CHEV = '<span class="ic" aria-hidden="true">expand_more</span>';

export default {
  summary: 'Satu langkah yang diambil asisten untuk sampai pada jawabannya (mencari di catatan, membaca berkas, memeriksa kalender), ditampilkan sebagai `<details>` satu baris yang tenang dan bisa dibuka untuk melihat temuannya. Jawaban tetap yang utama.',
  when: [
    'Jawaban asisten bergantung pada sesuatu yang dicari atau dijalankannya, dan orang mungkin ingin memeriksanya: pencarian, berkas yang dibaca, perhitungan, pengecekan kalender.',
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
  <details class="toolcall"><summary><span class="ic" aria-hidden="true">search</span>Mencari "gaya total" di catatan Anda${CHEV}</summary><div class="toolcall__body">Menemukan 3 halaman: materi minggu 4, halaman 2; latihan soal 3, nomor 4; panduan praktikum 2.</div></details>
  <details class="toolcall"><summary><span class="ic" aria-hidden="true">description</span>Membaca latihan soal 3${CHEV}</summary><div class="toolcall__body">Nomor 4: kotak 7 kg didorong dengan 20 N melawan gesekan 6 N.</div></details>
  <div class="bubble">Gaya totalnya 14 N, jadi percepatan kotak 2 m/s². Jawaban Anda memakai 20 N, yaitu gaya dorongnya saja.</div>
</div>`,
    },
    {
      title: 'Langkah yang masih berjalan',
      desc: 'Selama berjalan, spinner menggantikan ikon dan labelnya berkilau. Saat selesai, label berganti menjadi temuannya dan ikon menjadi tanda centang.',
      html: `<div class="msg msg--ai" style="max-width: 560px;">
  <details class="toolcall"><summary><span class="ic" aria-hidden="true">check_circle</span>Memeriksa kalender Anda${CHEV}</summary><div class="toolcall__body">Kosong hari Selasa pukul 13.00 sampai 15.00 dan Kamis setelah pukul 16.00.</div></details>
  <details class="toolcall" id="tc-run"><summary>${SPIN}<span class="shimmer">Memesan ruang belajar</span>${CHEV}</summary><div class="toolcall__body">Ruang 2.14, Selasa pukul 13.00 sampai 14.30.</div></details>
  <button class="btn btn--plain btn--sm" style="align-self: flex-start; margin-left: -10px;" onclick="this.hidden = true; const s = document.querySelector('#tc-run summary'); s.firstElementChild.outerHTML = '<span class=&quot;ic&quot; aria-hidden=&quot;true&quot;>check_circle</span>'; const l = s.querySelector('.shimmer'); l.classList.remove('shimmer'); l.textContent = 'Ruang 2.14 sudah dipesan';">Selesaikan langkah</button>
</div>`,
      code: `<details class="toolcall">
  <summary>
    <span class="spinner" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>
    <span class="shimmer">Memesan ruang belajar</span>
    <span class="ic" aria-hidden="true">expand_more</span>
  </summary>
  <div class="toolcall__body">…</div>
</details>
<!-- Done: replace the spinner with <span class="ic" aria-hidden="true">check_circle</span>,
     drop the shimmer class and name the result: "Ruang 2.14 sudah dipesan". -->`,
    },
    {
      title: 'Langkah dengan kode',
      desc: 'Jika langkah menjalankan kode atau query, isinya berupa code block agar orang bisa menyalin dan memeriksanya.',
      html: `<details class="toolcall" open style="max-width: 560px; width: 100%;"><summary><span class="ic" aria-hidden="true">code</span>Menjalankan query pada nilai Anda${CHEV}</summary><div class="toolcall__body"><div class="codeblock"><pre>SELECT AVG(score) FROM grades WHERE course = 'BIO101';</pre></div></div></details>`,
    },
    {
      title: 'Langkah yang gagal',
      desc: 'Sebutkan apa yang gagal dan apa yang dilakukan jawaban sebagai gantinya. Jawaban di bawahnya tidak boleh berpura-pura langkah itu berhasil.',
      html: `<div class="msg msg--ai" style="max-width: 560px;">
  <details class="toolcall"><summary><span class="ic" aria-hidden="true">cloud_off</span>Tidak bisa membuka laporan-praktikum.pdf${CHEV}</summary><div class="toolcall__body">Ukuran berkas lebih dari 20 MB. Jawaban di bawah hanya memakai catatan Anda.</div></details>
  <div class="bubble">Menurut catatan Anda, kelompok kontrol harus mendapat cahaya dan air yang sama dengan kelompok uji.</div>
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
    'Teks summary harus menyebut langkahnya sendiri ("Mencari gaya total di catatan Anda"), bukan hanya ikon.',
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
