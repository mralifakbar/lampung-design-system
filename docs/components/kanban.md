# Kanban

Kelompok: Tampilan data. https://lampung.kartadinata.app/docs/components/kanban

Kolom berisi kartu yang dipindah antar tahap dengan diseret atau dengan keyboard. Kartu yang diangkat terangkat dan mengikuti pointer, kartu lain memberi ruang dengan spring, lalu kartu itu mengendap di slotnya; hitungannya bergulir.

## Pakai saat
- Pekerjaan yang melewati beberapa tahap dan sering disusun ulang: tugas peluncuran, permohonan yang sedang ditinjau, tiket pengaduan, konten dalam produksi.
- Melihat berapa banyak yang menumpuk di setiap tahap sama pentingnya dengan butirnya sendiri (batas pekerjaan berjalan).

## Pakai yang lain saat
- Catatan yang dibandingkan menurut banyak atribut: pakai [Data table](data-table.md).
- Riwayat satu catatan: pakai [Timeline](timeline.md).
- Langkah yang dilalui seseorang sekali: pakai [Steps](steps.md).
- Daftar pendek yang hanya mementingkan urutan: pakai [List](list.md).

## Letaknya
Selebar kolom isi, di bawah kepala halaman dan toolbar (pencarian, filter, tambah). Kolom minimal 280 px dan bergulir ke samping bersama bila tidak muat; di ponsel setiap kolom mengambil 82 % lebar dan berhenti tepat, sehingga kolom berikutnya mengintip.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.kanban[data-lds-kanban]` | Wajib. Papannya, dengan `aria-label`; bergulir ke samping. |
| `.kanban__col` | Wajib. Satu tahap (`section`, kunci `data-col`, `aria-labelledby` ke judulnya). `data-limit` opsional: bila terlampaui, hitungan berubah menjadi warning. |
| `.kanban__head` | Judul (`h2.kanban__title`), `.kanban__count` dengan `.roll`, dan `.kanban__head-end` untuk tombol ikon (tambah, lainnya). |
| `.kanban__list` | Wajib. `role="list"` berisi kartu dan placeholder `.kanban__empty`, yang hanya tampil bila kolomnya kosong. |
| `.kanban__card` | Wajib. `article` (`role="listitem"`, `tabindex="0"`, `data-id`) dengan `aria-describedby` yang menunjuk kalimat tersembunyi berisi penjelasan tombol. |
| `.kanban__top, .kanban__card-title, .kanban__card-body, .kanban__foot` | Bagian kartu: badge dan tombol lainnya, judul (`h3`), dua baris detail, dan kaki berisi tenggat, hitungan, dan [avatar](avatar.md). |
| `.kanban__add` | Tombol opsional selebar penuh di bawah daftar: "Tambah kartu". |

## Markup

**Papan peluncuran.** Seret kartu ke kolom lain (di layar sentuh, tahan dulu): kartu lain memberi ruang, hitungannya bergulir. "Sedang dikerjakan" memberi peringatan bila lebih dari tiga kartu. Dengan keyboard: Tab ke kartu, Space untuk mengangkat, panah untuk memindah, Space untuk meletakkan, Escape untuk mengembalikan.
```html
<div class="kanban" data-lds-kanban aria-label="Peluncuran layanan izin daring">
    <section class="kanban__col" data-col="todo" aria-labelledby="kb-todo">
      <header class="kanban__head"><h2 class="kanban__title" id="kb-todo">Akan dikerjakan</h2><span class="kanban__count"><span class="roll" data-lds-roll="3"></span></span>
        <span class="kanban__head-end"><button class="icon-btn" aria-label="Tambah kartu ke Akan dikerjakan"><span class="ic" aria-hidden="true">add</span></button></span></header>
      <div class="kanban__list" role="list" aria-labelledby="kb-todo">
        <article class="kanban__card" role="listitem" tabindex="0" data-id="k1" aria-describedby="kb-help">
          <div class="kanban__top"><span class="badge badge--accent">Konten</span></div>
          <h3 class="kanban__card-title">Tulis email sambutan pemohon</h3>
          <p class="kanban__card-body">Tiga paragraf pendek dan tautan ke panduan pengajuan.</p>
          <div class="kanban__foot"><span><span class="ic" aria-hidden="true">calendar_month</span>18 Nov</span><span><span class="ic" aria-hidden="true">chat</span>4</span><span class="avatar avatar--gray" title="Dewi Lestari">DL</span></div>
        </article>
        <article class="kanban__card" role="listitem" tabindex="0" data-id="k2" aria-describedby="kb-help">
          <div class="kanban__top"><span class="badge">Operasional</span></div>
          <h3 class="kanban__card-title">Pesan aula untuk sosialisasi</h3>
          
          <div class="kanban__foot"><span><span class="ic" aria-hidden="true">calendar_month</span>20 Nov</span><span><span class="ic" aria-hidden="true">chat</span>1</span><span class="avatar avatar--gray" title="Arif Santoso">AS</span></div>
        </article>
        <article class="kanban__card" role="listitem" tabindex="0" data-id="k3" aria-describedby="kb-help">
          <div class="kanban__top"><span class="badge badge--warning">Keuangan</span></div>
          <h3 class="kanban__card-title">Hitung tarif retribusi baru</h3>
          <p class="kanban__card-body">Bandingkan dengan tahun lalu dan jumlah antrean pemohon.</p>
          <div class="kanban__foot"><span><span class="ic" aria-hidden="true">calendar_month</span>21 Nov</span><span><span class="ic" aria-hidden="true">chat</span>7</span><span class="avatar avatar--gray" title="Sari Handayani">SH</span></div>
        </article>
        <div class="kanban__empty">Letakkan kartu di sini</div>
      </div>
    </section>
    <section class="kanban__col" data-col="doing" aria-labelledby="kb-doing" data-limit="3">
      <header class="kanban__head"><h2 class="kanban__title" id="kb-doing">Sedang dikerjakan</h2><span class="kanban__count"><span class="roll" data-lds-roll="2"></span></span>
        <span class="kanban__head-end"><button class="icon-btn" aria-label="Tambah kartu ke Sedang dikerjakan"><span class="ic" aria-hidden="true">add</span></button></span></header>
      <div class="kanban__list" role="list" aria-labelledby="kb-doing">
        <article class="kanban__card" role="listitem" tabindex="0" data-id="k4" aria-describedby="kb-help">
          <div class="kanban__top"><span class="badge badge--accent">Konten</span></div>
          <h3 class="kanban__card-title">Rekam video panduan pendaftaran</h3>
          
          <div class="kanban__foot"><span><span class="ic" aria-hidden="true">calendar_month</span>19 Nov</span><span><span class="ic" aria-hidden="true">chat</span>2</span><span class="avatar avatar--gray" title="Rina Wijaya">RW</span></div>
        </article>
        <article class="kanban__card" role="listitem" tabindex="0" data-id="k5" aria-describedby="kb-help">
          <div class="kanban__top"><span class="badge badge--success">Platform</span></div>
          <h3 class="kanban__card-title">Siapkan halaman pembayaran</h3>
          <p class="kanban__card-body">Virtual account dan kartu, dengan bukti bayar lewat email.</p>
          <div class="kanban__foot"><span><span class="ic" aria-hidden="true">calendar_month</span>22 Nov</span><span><span class="ic" aria-hidden="true">chat</span>5</span><span class="avatar avatar--gray" title="Galih Ramadhan">GR</span></div>
        </article>
        <div class="kanban__empty">Letakkan kartu di sini</div>
      </div>
    </section>
    <section class="kanban__col" data-col="done" aria-labelledby="kb-done">
      <header class="kanban__head"><h2 class="kanban__title" id="kb-done">Selesai</h2><span class="kanban__count"><span class="roll" data-lds-roll="0"></span></span>
        <span class="kanban__head-end"><button class="icon-btn" aria-label="Tambah kartu ke Selesai"><span class="ic" aria-hidden="true">add</span></button></span></header>
      <div class="kanban__list" role="list" aria-labelledby="kb-done">
        
        <div class="kanban__empty">Letakkan kartu di sini</div>
      </div>
    </section>
  </div>
  <p class="sr-only" id="kb-help">Tekan Space untuk mengangkat kartu, tombol panah untuk memindahkannya, Space untuk meletakkannya, Escape untuk membatalkan.</p>
```

## Status
| Status | Caranya |
|---|---|
| `hover` | Ring kartu berubah menjadi `--line-strong`. |
| `pressed` | 0,985, atau 0,97 selama tahan sentuh sedang dihitung. |
| `.is-dragging` | Terangkat: skala 1,03, miring 1,5 derajat, shadow besar, mengikuti pointer; `.kanban__ghost` menunjukkan tempat mendaratnya. |
| `.kanban__col.is-over` | Kolom di bawah pointer memakai tint aksen. |
| `.is-grabbed` | Diangkat dengan keyboard: skala 1,02 dan ring aksen. |
| `.is-over-limit` | Kartu lebih banyak dari `data-limit`: hitungan berubah menjadi warning. |
| `empty column` | `.kanban__empty` menampilkan "Letakkan kartu di sini". |

## Gerak dan mikrointeraksi
- Mengangkat: skala dan kemiringan mengendap dengan `--spring-snappy`; setelah itu kartu mengikuti pointer 1:1 (CSS `translate`, tanpa transition).
- Memberi ruang: setiap kartu yang bergeser dipindah dengan FLIP, dari tempat asalnya ke tempat barunya dengan `--spring-smooth`. Gerak dimulai dari posisinya di layar, jadi perpindahan cepat tidak pernah melompat.
- Meletakkan: kartu terbang dari pointer ke slotnya dan kembali tegak dengan `--spring-smooth`. Batal (Escape) membawanya kembali ke asalnya lewat jalur yang sama.
- Papan bergulir ke samping bila pointer berada dalam 56 px dari tepinya, dan halaman bergulir di dekat tepi atas dan bawah jendela.
- Hitungan bergulir ([rolling number](rolling-number.md)). Reduced motion: tanpa kemiringan atau skala, kartu langsung berpindah tempat.

## Aksesibilitas
- Setiap kartu bisa difokus; Space mengangkatnya, tombol panah memindahkannya (kiri dan kanan berganti kolom), Space atau Enter meletakkannya, Escape mengembalikannya, Tab meletakkannya di tempat itu.
- Setiap langkah diumumkan: "Mengangkat Tulis email sambutan pemohon, Akan dikerjakan, posisi 1 dari 3", "Sedang dikerjakan, posisi 2 dari 3", "Diletakkan…".
- Seret dengan mouse dimulai setelah 5 px, jadi klik tetap berfungsi; seret sentuh dimulai setelah tahan 260 ms, jadi papan tetap bisa digulir.
- Tombol dan tautan di dalam kartu tidak pernah memulai seret.

## Lakukan
- Pertahankan tiga sampai enam kolom dan judul kartu yang singkat.
- Simpan perpindahan pada `lds:move` dan kembalikan kartu (beserta alasannya) bila server menolak.

## Hindari
- Menjadikan seret satu-satunya cara mengubah tahap kartu; perpindahan dengan keyboard dan kolom status di detail kartu juga harus ada.
- Menaruh formulir panjang di kartu; buka kartunya di [drawer](drawer.md).

## Perilaku (HTML biasa)
`data-lds-kanban` memasang perpindahan dengan pointer dan keyboard, guliran di tepi, hitungan, dan batas. Memicu `lds:move` pada papan dengan `{ card, id, from, to, index }` (kunci kolom dari `data-col`).

## Terkait
[Data table](data-table.md) · [Drag and momentum](drag-and-momentum.md) · [Rolling number](rolling-number.md) · [List](list.md)
