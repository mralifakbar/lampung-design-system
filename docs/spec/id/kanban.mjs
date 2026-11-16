const card = (id, title, body, tag, tone, due, who, comments) => `<article class="kanban__card" role="listitem" tabindex="0" data-id="${id}" aria-describedby="kb-help">
          <div class="kanban__top"><span class="badge${tone ? ` badge--${tone}` : ''}">${tag}</span></div>
          <h3 class="kanban__card-title">${title}</h3>
          ${body ? `<p class="kanban__card-body">${body}</p>` : ''}
          <div class="kanban__foot"><span><span class="ic" aria-hidden="true">calendar_month</span>${due}</span><span><span class="ic" aria-hidden="true">chat</span>${comments}</span><span class="avatar avatar--gray" title="${who[1]}">${who[0]}</span></div>
        </article>`;
const col = (key, title, n, cards, limit) => `<section class="kanban__col" data-col="${key}" aria-labelledby="kb-${key}"${limit ? ` data-limit="${limit}"` : ''}>
      <header class="kanban__head"><h2 class="kanban__title" id="kb-${key}">${title}</h2><span class="kanban__count"><span class="roll" data-lds-roll="${n}"></span></span>
        <span class="kanban__head-end"><button class="icon-btn" aria-label="Tambah kartu ke ${title}"><span class="ic" aria-hidden="true">add</span></button></span></header>
      <div class="kanban__list" role="list" aria-labelledby="kb-${key}">
        ${cards.join('\n        ')}
        <div class="kanban__empty">Letakkan kartu di sini</div>
      </div>
    </section>`;
const board = `<div class="kanban" data-lds-kanban aria-label="Peluncuran layanan izin daring">
    ${col('todo', 'Akan dikerjakan', 3, [
      card('k1', 'Tulis email sambutan pemohon', 'Tiga paragraf pendek dan tautan ke panduan pengajuan.', 'Konten', 'accent', '18 Nov', ['DL', 'Dewi Lestari'], 4),
      card('k2', 'Pesan aula untuk sosialisasi', '', 'Operasional', '', '20 Nov', ['AS', 'Arif Santoso'], 1),
      card('k3', 'Hitung tarif retribusi baru', 'Bandingkan dengan tahun lalu dan jumlah antrean pemohon.', 'Keuangan', 'warning', '21 Nov', ['SH', 'Sari Handayani'], 7),
    ])}
    ${col('doing', 'Sedang dikerjakan', 2, [
      card('k4', 'Rekam video panduan pendaftaran', '', 'Konten', 'accent', '19 Nov', ['RW', 'Rina Wijaya'], 2),
      card('k5', 'Siapkan halaman pembayaran', 'Virtual account dan kartu, dengan bukti bayar lewat email.', 'Platform', 'success', '22 Nov', ['GR', 'Galih Ramadhan'], 5),
    ], 3)}
    ${col('done', 'Selesai', 0, [])}
  </div>
  <p class="sr-only" id="kb-help">Tekan Space untuk mengangkat kartu, tombol panah untuk memindahkannya, Space untuk meletakkannya, Escape untuk membatalkan.</p>`;

export default {
  summary: 'Kolom berisi kartu yang dipindah antar tahap dengan diseret atau dengan keyboard. Kartu yang diangkat terangkat dan mengikuti pointer, kartu lain memberi ruang dengan spring, lalu kartu itu mengendap di slotnya; hitungannya bergulir.',
  when: [
    'Pekerjaan yang melewati beberapa tahap dan sering disusun ulang: tugas peluncuran, permohonan yang sedang ditinjau, tiket pengaduan, konten dalam produksi.',
    'Melihat berapa banyak yang menumpuk di setiap tahap sama pentingnya dengan butirnya sendiri (batas pekerjaan berjalan).',
  ],
  whenNot: [
    ['Catatan yang dibandingkan menurut banyak atribut', 'data-table'],
    ['Riwayat satu catatan', 'timeline'],
    ['Langkah yang dilalui seseorang sekali', 'steps'],
    ['Daftar pendek yang hanya mementingkan urutan', 'list'],
  ],
  where: 'Selebar kolom isi, di bawah kepala halaman dan toolbar (pencarian, filter, tambah). Kolom minimal 280 px dan bergulir ke samping bersama bila tidak muat; di ponsel setiap kolom mengambil 82 % lebar dan berhenti tepat, sehingga kolom berikutnya mengintip.',
  anatomy: [
    ['.kanban[data-lds-kanban]', 'Wajib. Papannya, dengan `aria-label`; bergulir ke samping.'],
    ['.kanban__col', 'Wajib. Satu tahap (`section`, kunci `data-col`, `aria-labelledby` ke judulnya). `data-limit` opsional: bila terlampaui, hitungan berubah menjadi warning.'],
    ['.kanban__head', 'Judul (`h2.kanban__title`), `.kanban__count` dengan `.roll`, dan `.kanban__head-end` untuk tombol ikon (tambah, lainnya).'],
    ['.kanban__list', 'Wajib. `role="list"` berisi kartu dan placeholder `.kanban__empty`, yang hanya tampil bila kolomnya kosong.'],
    ['.kanban__card', 'Wajib. `article` (`role="listitem"`, `tabindex="0"`, `data-id`) dengan `aria-describedby` yang menunjuk kalimat tersembunyi berisi penjelasan tombol.'],
    ['.kanban__top, .kanban__card-title, .kanban__card-body, .kanban__foot', 'Bagian kartu: badge dan tombol lainnya, judul (`h3`), dua baris detail, dan kaki berisi tenggat, hitungan, dan [avatar](avatar).'],
    ['.kanban__add', 'Tombol opsional selebar penuh di bawah daftar: "Tambah kartu".'],
  ],
  examples: [
    {
      title: 'Papan peluncuran',
      desc: 'Seret kartu ke kolom lain (di layar sentuh, tahan dulu): kartu lain memberi ruang, hitungannya bergulir. "Sedang dikerjakan" memberi peringatan bila lebih dari tiga kartu. Dengan keyboard: Tab ke kartu, Space untuk mengangkat, panah untuk memindah, Space untuk meletakkan, Escape untuk mengembalikan.',
      html: board,
    },
  ],
  states: [
    ['hover', 'Ring kartu berubah menjadi `--line-strong`.'],
    ['pressed', '0,985, atau 0,97 selama tahan sentuh sedang dihitung.'],
    ['.is-dragging', 'Terangkat: skala 1,03, miring 1,5 derajat, shadow besar, mengikuti pointer; `.kanban__ghost` menunjukkan tempat mendaratnya.'],
    ['.kanban__col.is-over', 'Kolom di bawah pointer memakai tint aksen.'],
    ['.is-grabbed', 'Diangkat dengan keyboard: skala 1,02 dan ring aksen.'],
    ['.is-over-limit', 'Kartu lebih banyak dari `data-limit`: hitungan berubah menjadi warning.'],
    ['empty column', '`.kanban__empty` menampilkan "Letakkan kartu di sini".'],
  ],
  motion: [
    'Mengangkat: skala dan kemiringan mengendap dengan `--spring-snappy`; setelah itu kartu mengikuti pointer 1:1 (CSS `translate`, tanpa transition).',
    'Memberi ruang: setiap kartu yang bergeser dipindah dengan FLIP, dari tempat asalnya ke tempat barunya dengan `--spring-smooth`. Gerak dimulai dari posisinya di layar, jadi perpindahan cepat tidak pernah melompat.',
    'Meletakkan: kartu terbang dari pointer ke slotnya dan kembali tegak dengan `--spring-smooth`. Batal (Escape) membawanya kembali ke asalnya lewat jalur yang sama.',
    'Papan bergulir ke samping bila pointer berada dalam 56 px dari tepinya, dan halaman bergulir di dekat tepi atas dan bawah jendela.',
    'Hitungan bergulir ([rolling number](rolling-number)). Reduced motion: tanpa kemiringan atau skala, kartu langsung berpindah tempat.',
  ],
  a11y: [
    'Setiap kartu bisa difokus; Space mengangkatnya, tombol panah memindahkannya (kiri dan kanan berganti kolom), Space atau Enter meletakkannya, Escape mengembalikannya, Tab meletakkannya di tempat itu.',
    'Setiap langkah diumumkan: "Mengangkat Tulis email sambutan pemohon, Akan dikerjakan, posisi 1 dari 3", "Sedang dikerjakan, posisi 2 dari 3", "Diletakkan…".',
    'Seret dengan mouse dimulai setelah 5 px, jadi klik tetap berfungsi; seret sentuh dimulai setelah tahan 260 ms, jadi papan tetap bisa digulir.',
    'Tombol dan tautan di dalam kartu tidak pernah memulai seret.',
  ],
  do: [
    'Pertahankan tiga sampai enam kolom dan judul kartu yang singkat.',
    'Simpan perpindahan pada `lds:move` dan kembalikan kartu (beserta alasannya) bila server menolak.',
  ],
  dont: [
    'Menjadikan seret satu-satunya cara mengubah tahap kartu; perpindahan dengan keyboard dan kolom status di detail kartu juga harus ada.',
    'Menaruh formulir panjang di kartu; buka kartunya di [drawer](drawer).',
  ],
  js: '`data-lds-kanban` memasang perpindahan dengan pointer dan keyboard, guliran di tepi, hitungan, dan batas. Memicu `lds:move` pada papan dengan `{ card, id, from, to, index }` (kunci kolom dari `data-col`).',
};
