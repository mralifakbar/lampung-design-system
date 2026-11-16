const EDIT = (value, label) => `<span class="inline-edit" data-lds-inline><button class="inline-edit__text" aria-label="${label}"><span class="inline-edit__value">${value}</span><span class="ic" aria-hidden="true">edit</span></button></span>`;

export default {
  summary: 'Klik sebuah nama untuk mengganti namanya di tempat: teks menjadi kolom dengan font dan lebar yang sama, Enter atau meninggalkan kolom menyimpan, Escape mengembalikannya. Penyimpanan menggambar centang kecil; penyimpanan yang ditolak mengembalikan nama lama, bergoyang, dan menjelaskan alasannya.',
  when: [
    'Mengganti nama satu hal di tempatnya: kegiatan, berkas, judul catatan, nama grup.',
    'Satu nilai pendek yang jarang diubah dan ingin diubah tanpa membuka formulir.',
  ],
  whenNot: [
    ['Beberapa kolom diubah bersama', 'form-layout'],
    ['Teks panjang (deskripsi, jawaban)', 'textarea'],
    ['Nilai yang dipilih dari daftar', 'select'],
    ['Pengaturan yang langsung berlaku', 'switch'],
  ],
  where: 'Pada judulnya sendiri: judul halaman, judul kartu, judul baris daftar. Ikon pensil muncul saat hover dan fokus di ujung teks.',
  anatomy: [
    ['.inline-edit', 'Wajib. `data-lds-inline`. Mewarisi font dari tempatnya berada.'],
    ['.inline-edit__text', 'Wajib. Tombol yang menampilkan nilai; `aria-label` menyebut apa yang diganti namanya ("Ganti nama kegiatan").'],
    ['.inline-edit__value', 'Wajib. Teks nilainya.'],
    ['.inline-edit__input', 'Kolom yang menggantikan teks saat mengedit (dibuat oleh JS), ukuran sama, cincin aksen.'],
    ['.inline-edit__state', 'Centang yang digambar setelah tersimpan (dibuat oleh JS).'],
  ],
  examples: [
    {
      title: 'Mengganti nama kegiatan',
      desc: 'Klik namanya, ketik, tekan Enter. Centang tergambar; nama baru tetap. Escape mengembalikan nama lama.',
      html: `<div class="docs-col">
  <span class="card__sub">Kegiatan</span>
  <span style="font: var(--type-title-2); letter-spacing: var(--tracking-title-2);">${EDIT('Vaksinasi balita Mei', 'Ganti nama kegiatan')}</span>
</div>`,
      code: `<h1><span class="inline-edit" data-lds-inline>
  <button class="inline-edit__text" aria-label="Ganti nama kegiatan"><span class="inline-edit__value">Vaksinasi balita Mei</span><span class="ic" aria-hidden="true">edit</span></button>
</span></h1>
<script type="module">
  document.querySelector('[data-lds-inline]').addEventListener('lds:save', (e) => {
    e.detail.wait(api.rename(e.detail.value)); // rejection restores e.detail.previous, shakes, announces
  });
</script>`,
    },
    {
      title: 'Mengganti nama berkas di daftar',
      desc: 'Di dalam baris, kolom mengambil tempat dan ukuran judul; ukuran berkas dan tanggal di sampingnya tidak bergeser.',
      html: `<div class="list" style="width: 100%; max-width: 440px;">
  <div class="lrow"><span class="ic" aria-hidden="true">description</span><span class="lrow__body">${EDIT('Notulen rapat RW', 'Ganti nama Notulen rapat RW')}</span><span class="lrow__value">340 KB</span></div>
  <div class="lrow"><span class="ic" aria-hidden="true">description</span><span class="lrow__body">${EDIT('Denah lokasi usaha', 'Ganti nama Denah lokasi usaha')}</span><span class="lrow__value">1,1 MB</span></div>
</div>`,
    },
  ],
  states: [
    ['rest', 'Tombol teks; pensil tersembunyi.'],
    ['hover / focus', 'Latar berwarna tipis dan pensil muncul perlahan selama `--d-fast`.'],
    ['editing', 'Input dengan font yang sama, minimal selebar teks (minimum 80 px), seluruh teks terpilih.'],
    ['saved', '`.is-saved`: centang tergambar dalam 300 ms dan hilang setelah 1,8 detik; "Tersimpan" diumumkan.'],
    ['refused', 'Nilai lama kembali, pembungkus bergoyang, dan "Gagal menyimpan. Nama sebelumnya dikembalikan." diumumkan.'],
  ],
  motion: [
    'Kolom masuk: `lds-blur-in` selama `--d-fast` (160 ms) dengan `--ease-enter`, dari 4 px di bawah dan kabur, dengan ukuran sama seperti teks, jadi tidak ada yang bergeser di sekitarnya.',
    'Tersimpan: garis centang tergambar (`lds-draw`) dalam 300 ms dengan `--ease-enter`.',
    'Ditolak: `shake()` pada pembungkus (360 ms) ditambah haptic error.',
    'Reduced motion: kolom langsung muncul, centang tampil tanpa digambar, tanpa goyangan.',
  ],
  a11y: [
    'Nilainya adalah tombol sungguhan yang `aria-label`-nya menyebut aksi dan objek ("Ganti nama kegiatan"). Input memakai label yang sama.',
    'Enter menyimpan, Escape membatalkan dan mengembalikan fokus ke tombol, Tab menyimpan (blur).',
    'Hasil diumumkan lewat status polite di dalam komponen.',
  ],
  do: [
    'Pakai untuk satu nilai pendek.',
    'Berikan promise penyimpanan ke `e.detail.wait()` agar kegagalan dibatalkan.',
    'Sebut objeknya di `aria-label`.',
  ],
  dont: [
    'Merangkai beberapa inline edit sebagai formulir.',
    'Menyimpan di setiap ketikan.',
    'Mengubah ukuran font atau lebar saat kolom muncul.',
  ],
  js: '`[data-lds-inline]` saat `init()`. Memancarkan `lds:save` dengan `{ value, previous, wait }` hanya bila nilainya berubah dan tidak kosong; `wait(promise)` menampilkan centang bila berhasil, atau mengembalikan, menggoyang, dan mengumumkan bila ditolak.',
};
