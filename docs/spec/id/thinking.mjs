export default {
  summary: 'Gelombang titik, label berkilau dan timer waktu berjalan yang jujur, untuk pekerjaan yang lamanya tidak diketahui. Saat selesai, labelnya berubah menjadi hasilnya.',
  when: [
    'Asisten atau proses latar sedang bekerja dan kemajuannya tidak bisa diukur: memeriksa jadwal layanan, memeriksa berkas unggahan, menyusun daftar persyaratan.',
    'Pekerjaan yang bisa makan waktu beberapa detik sampai satu menit, saat timer waktu berjalan meyakinkan orang bahwa prosesnya tidak macet.',
    'Status yang semestinya mengendap menjadi jawabannya di tempat ("Ditemukan 3 slot kosong di Samsat keliling").',
  ],
  whenNot: [
    ['Pekerjaannya punya ukuran yang terukur', 'progress-bar'],
    ['Tombol sedang menjalankan aksi singkat', 'button'],
    ['Konten sedang dimuat dengan tata letak yang diketahui', 'skeleton'],
    ['Tunggu singkat di baris atau daftar', 'spinner'],
    ['Jawabannya sendiri sedang datang kata demi kata', 'streaming-text'],
    ['Langkah asisten yang sudah selesai, dengan rincian yang bisa dibuka', 'tool-call'],
    ['Hitung mundur menuju tenggat', 'timer'],
  ],
  where: 'Di tempat jawaban akan muncul: di bagian atas balasan asisten di [chat](chat-message), di area hasil sebuah panel, di baris status sebuah proses. Satu baris, rata kiri. Biarkan di tempatnya setelah selesai, sebagai judul hasilnya.',
  anatomy: [
    ['.thinking', 'Wajib. Baris inline, jarak 10 px, teks medium 14 px. `role="status"`.'],
    ['.dotgrid', 'Wajib. Grid 3 x 3 berisi titik 4 px; JS mengisi sembilan `<i>` jika kosong. `aria-hidden="true"`.'],
    ['.shimmer', 'Wajib. Labelnya; pita terang melintasinya setiap 1,8 detik.'],
    ['.thinking__time', 'Waktu berjalan opsional dengan angka mono tabular, diperbarui setiap 100 ms.'],
    ['.is-done', 'Mengendap: titik berhenti dan menjadi hijau, label berhenti berkilau dan menjadi tegas.'],
  ],
  examples: [
    {
      title: 'Bekerja, lalu selesai',
      desc: 'Gelombangnya berjalan dengan CSS; `data-lds-thinking` menambahkan timer. Tekan Selesaikan untuk mengendapkannya menjadi hasil.',
      html: `<div class="docs-col" style="max-width: 420px;">
  <div class="thinking" data-lds-thinking role="status" id="th1"><span class="dotgrid" aria-hidden="true"></span><span class="shimmer">Memeriksa jadwal Samsat keliling</span><span class="thinking__time"></span></div>
  <div class="docs-row"><button class="btn btn--secondary btn--sm" onclick="import('../../js/lds.js').then((m) => m.thinkingDone(document.getElementById('th1'), 'Ditemukan 3 slot kosong di Samsat keliling'));">Selesaikan</button></div>
</div>`,
      code: `<div class="thinking" data-lds-thinking role="status">
  <span class="dotgrid" aria-hidden="true"></span>
  <span class="shimmer">Memeriksa jadwal Samsat keliling</span>
  <span class="thinking__time"></span>
</div>
<script type="module">
  import { thinkingDone } from 'lampung-design-system/js';
  // when the work ends:
  thinkingDone(document.querySelector('.thinking'), 'Ditemukan 3 slot kosong di Samsat keliling');
</script>`,
    },
    {
      title: 'Tanpa timer',
      desc: 'Buang `.thinking__time` untuk tunggu yang biasanya singkat.',
      html: `<div class="thinking" data-lds-thinking role="status"><span class="dotgrid" aria-hidden="true"></span><span class="shimmer">Memeriksa kelengkapan berkas Anda</span></div>`,
    },
    {
      title: 'Mengendap',
      desc: 'Setelah `thinkingDone`, baris ini tetap ada sebagai judul hasilnya.',
      html: `<div class="thinking is-done" role="status"><span class="dotgrid" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span><span class="shimmer is-settled">Daftar persyaratan siap: 4 dokumen untuk surat pindah</span><span class="thinking__time">8.4s</span></div>`,
    },
  ],
  states: [
    ['working', 'Titik bergelombang, label berkilau, waktu berjalan.'],
    ['done', '`thinkingDone(el, label)` menambahkan `.is-done`, mengendapkan kilau dan mengubah label menjadi `label` (dengan haptic success jika didukung).'],
    ['failed', 'Endapkan sendiri dengan label yang menyebut apa yang gagal ("Kalender tidak bisa dihubungi"), lalu tawarkan coba lagi di sampingnya.'],
  ],
  motion: [
    'Gelombang titik: setiap titik menjalankan `lds-dot-wave` (opasitas 0,12 ke 1 dan kembali) selama 1,2 detik dengan `--ease-inout`, dengan jeda bertambah 90 ms secara diagonal (kolom + baris), jadi gelombang bergerak dari sudut kiri atas.',
    'Label: `.shimmer` menggerakkan pita terang melintasi teks selama 1,8 detik linear, tanpa henti.',
    'Selesai: label berubah huruf demi huruf ([text morph](text-morph)) dan warnanya mengendap selama `--d-standard`; titik langsung berubah ke warna success.',
    'Reduced motion: titik berhenti di opasitas 60 % dan kilau berhenti; timer tetap berjalan karena itu informasi.',
  ],
  a11y: [
    '`role="status"` pada `.thinking`, agar label dan hasil akhirnya diumumkan secara sopan.',
    'Grid titik memakai `aria-hidden="true"`. Timer berubah sepuluh kali per detik; jika screen reader terlalu sering membacanya dalam konteks Anda, pasang `aria-hidden="true"` pada `.thinking__time`.',
    'Label yang mengendap harus menyebut hasilnya, bukan hanya "Selesai".',
  ],
  do: [
    'Sebut pekerjaannya di label ("Memeriksa jadwal Anda").',
    'Endapkan menjadi hasil, jangan dihapus.',
    'Tampilkan waktu berjalan jika tunggunya bisa lebih dari lima detik.',
  ],
  dont: [
    'Memalsukan kemajuan dengan bar untuk pekerjaan yang tidak diketahui ukurannya.',
    'Memakainya untuk tunggu di bawah satu detik.',
    'Mengganti label setiap detik agar terlihat sibuk.',
  ],
  js: '`data-lds-thinking` pada `.thinking` mengisi grid titik dan menjalankan waktu berjalan (satu desimal, "3.4s"). `thinkingDone(el, label)` mengendapkannya dan mengubah labelnya. Gelombangnya sendiri CSS, jadi markup yang dirender framework apa pun tetap bergerak tanpa JS.',
};
