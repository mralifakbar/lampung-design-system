# Chat layout

Kelompok: Obrolan. https://lampung.kartadinata.app/docs/components/chat-layout

Kolom percakapan: pesan bertumpuk dengan jarak 20 px di `.chat`, riwayat bergulir di atas composer yang tidak ikut tergulir, dan tombol Terbaru yang muncul hanya saat pembaca menggulir ke atas. Pesan terbaru selalu di bawah.

## Pakai saat
- Percakapan dengan asisten layanan kota: orang bertanya di kanan, jawaban mengisi kolom baca, pesan terbaru di bawah.
- Utas layanan pengaduan atau umpan balik yang urutan dan waktunya penting, dan orang membalas dari layar yang sama.
- Riwayat yang cukup panjang untuk digulir, saat orang membaca ke belakang dan butuh cara kembali ke pesan terbaru.

## Pakai yang lain saat
- Riwayat kejadian tanpa kotak balasan (perubahan status permohonan, catatan petugas): pakai [Timeline](timeline.md).
- Komentar yang masing-masing melekat pada bagian dokumen atau berkas permohonan: pakai [List](list.md). Letakkan di samping hal yang dibahas, bukan dalam satu kolom.
- Satu jawaban yang dibuat di dalam halaman tanpa tanya jawab: pakai [Prose](prose.md). Tampilkan [thinking](thinking.md) selama proses dan [streaming text](streaming-text.md) saat jawaban datang.
- Daftar notifikasi: pakai [List](list.md).
- Penjelasan singkat untuk satu pertanyaan, di tempat: pakai [Popover](popover.md).

## Letaknya
Kolom utama halaman atau panel setinggi layar di samping pekerjaan yang dibahas ([resizable split](resizable-split.md) di layar lebar). Riwayat adalah area gulir; [composer](composer.md) ada di bawahnya, di luar area gulir, selebar kolom. Di ponsel kolom memenuhi layar dan composer duduk di atas keyboard dengan inset safe-area (`safe-bottom`). Batasi lebar kolom paling lebar 640 px di layar lebar agar jawaban tetap mudah dibaca.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.chat` | Wajib. Kolom pesan (flex, jarak 20 px). Beri `role="log"` dan label. |
| `.msg` | Wajib. Satu pesan; lihat [chat message](chat-message.md) untuk `--me`, `--ai` dan bagian di dalamnya. |
| `.msg--system` | Baris di tengah dengan huruf footnote untuk hal yang berubah dalam percakapan: pergantian hari, seseorang bergabung, mode yang dinyalakan. |
| `.chat__jump` | Tombol sekunder kecil, anak terakhir `.chat`, dengan `data-lds-jump="<scroller id>"`. Menempel 88 px di atas dasar area gulir dan hanya tampil saat pembaca berjarak lebih dari 160 px dari ujung. |
| `.composer` | Kotak balasan di bawah area gulir; lihat [composer](composer.md). |

## Markup

**Bertanya ke asisten layanan kota.** Gulir riwayat ke atas dan tombol Terbaru muncul; tekan untuk meluncur kembali. Ketik pertanyaan lalu tekan Enter: pesan Anda masuk ke kolom.
```html
<div class="chat-scroll" id="chat-scroll"><!-- your scroller: overflow-y: auto, flex: 1 -->
  <div class="chat" role="log" aria-label="Percakapan dengan asisten layanan kota">
    <p class="msg msg--system">Hari ini, 09.12</p>
    <div class="msg msg--me"><div class="bubble">Kenapa permohonan perubahan KK saya untuk Kedaton dikembalikan?</div><span class="msg__meta">09.12</span></div>
    <div class="msg msg--ai"><div class="bubble">Surat pengantar dari RT/RW belum dilampirkan…</div>
      <div class="msg__actions">…</div>
    </div>
    <button class="btn btn--secondary btn--sm chat__jump" data-lds-jump="chat-scroll"><span class="ic" aria-hidden="true">arrow_downward</span>Terbaru</button>
  </div>
</div>
<form class="composer" data-lds-composer>
  <textarea rows="1" aria-label="Kirim pesan ke asisten" placeholder="Tanyakan tentang permohonan ini"></textarea>
  <button class="composer__send" type="submit" aria-label="Kirim"><span class="ic" aria-hidden="true">arrow_upward</span></button>
</form>
<script type="module">
  import { init } from 'lampung-design-system/js';
  init();
  document.querySelector('.composer').addEventListener('lds:send', (e) => sendToAssistant(e.detail.text));
</script>
```

**Baris sistem menandai perubahan.** Pergantian hari, mode yang dinyalakan, berkas yang ditambahkan ke percakapan: baris footnote di tengah, tanpa bubble, tanpa aksi. Baris ini bagian dari riwayat, jadi ikut tergulir.
```html
<div class="chat" role="log" aria-label="Bantuan izin usaha" style="max-width: 560px;">
  <p class="msg msg--system">Kemarin</p>
  <div class="msg msg--me"><div class="bubble">Periksa berkas izin usaha UMKM saya, satu per satu.</div></div>
  <div class="msg msg--ai"><div class="bubble">Siap. Saya periksa lima berkas secara berurutan; jawab ya bila tiap berkas siap diunggah.</div></div>
  <p class="msg msg--system">Mode terpandu aktif. Formulir terkunci sampai semua berkas diperiksa.</p>
  <p class="msg msg--system">Anda melampirkan surat-keterangan-domisili.pdf</p>
  <p class="msg msg--system">Hari ini</p>
  <div class="msg msg--me"><div class="bubble">Ajukan permohonan saya.</div></div>
</div>
```

**Sebelum pesan pertama.** Percakapan kosong menjelaskan apa yang bisa dilakukan asisten dan menawarkan dua atau tiga pertanyaan pembuka sebagai chip. Chip mengisi composer; orang tetap menekan kirim.
```html
<div class="empty">
  <div class="empty__icon"><span class="ic" aria-hidden="true">id_card</span></div>
  <p class="empty__title">Tanya tentang layanan Disdukcapil</p>
  <p class="empty__body">Jawaban memakai persyaratan layanan yang sudah diumumkan dan menyebut halaman sumbernya.</p>
</div>
<div class="chip-row">
  <button class="chip">Cara mengurus KTP elektronik</button>
  <button class="chip">Syarat surat pindah</button>
</div>
<form class="composer" data-lds-composer>…</form>
<!-- On a chip click: put its text in the textarea, dispatch 'input' (enables send), focus it. -->
```

## Status
| Status | Caranya |
|---|---|
| `empty` | Belum ada pesan: [empty state](empty-state.md) dengan dua atau tiga [chip](chips.md) pembuka di atas composer. |
| `scrolled up` | `.chat__jump.is-visible` begitu area gulir berjarak lebih dari 160 px dari ujung; tombol hilang lagi di bawah. |
| `assistant working` | Pesan terakhir berupa baris [thinking](thinking.md), lalu balasan mengalir masuk ([streaming text](streaming-text.md)). |
| `new message` | `.msg.is-new` naik 8 px dan memudar masuk sekali saat disisipkan; riwayat tanpa `is-new` langsung tampil. |

## Gerak dan mikrointeraksi
- Setiap `.msg.is-new` masuk sekali dengan `lds-msg-in` (beri `is-new` hanya untuk pesan yang datang saat chat terbuka): dari 8 px di bawah dan transparan, selama `--d-smooth` (560 ms) dengan `--spring-smooth`. Saat pesan datang, tidak ada yang bergerak di kolom selain pesan baru itu.
- Tombol Terbaru memudar selama `--d-fast` dan naik 8 px dengan `--spring-smooth`; ini transition, jadi menggulir bolak-balik membaliknya dari posisi saat itu.
- Lompatan menggulir dengan `behavior: smooth`; dengan reduced motion langsung melompat.
- Pesan yang dirender sekaligus (membuka percakapan lama) juga memainkan animasi masuk pada saat yang sama. Render riwayat sebelum menyisipkannya, atau terima satu fade bersama; jangan pernah memberi stagger pada seluruh riwayat.
- Reduced motion: animasi masuk menjadi fade 1 ms (praktis instan) dan tombol lompat cross-fade dalam 120 ms.

## Aksesibilitas
- Beri `.chat` `role="log"` dan `aria-label`; pesan baru lalu diumumkan secara sopan (polite). Selama balasan mengalir, pasang `aria-busy="true"` pada pesan itu dan hapus setelah selesai agar balasan dibacakan sekali, utuh.
- Baris sistem berupa teks biasa (`<p>`), bukan live region tersendiri; log yang mengumumkannya.
- Textarea composer perlu label (`aria-label` atau label yang terlihat); lihat [composer](composer.md).
- Tombol Terbaru adalah tombol sungguhan dengan label yang terlihat. Saat tersembunyi ia transparan tetapi masih bisa difokus: render hanya saat dibutuhkan jika pengguna keyboard melaporkannya.

## Lakukan
- Letakkan composer di luar area gulir agar tidak ikut tergulir.
- Hentikan gulir otomatis saat pembaca menggulir ke atas; tampilkan tombol Terbaru.
- Pakai baris sistem untuk hal yang dilakukan percakapan dengan sendirinya (mode, berkas, hari).

## Hindari
- Menganimasikan seluruh riwayat masuk, atau memberi stagger pada pesan lama.
- Memasang stempel waktu di setiap pesan; kelompokkan per hari dengan baris sistem dan tampilkan jam saat hover atau di [meta pesan](chat-message.md).
- Membangun chat dari card atau baris list.

## Perilaku (HTML biasa)
Perilaku berasal dari `init()`: `[data-lds-jump="<scroller id>"]` pada tombol Terbaru menampilkannya saat area gulir berjarak lebih dari 160 px dari ujung dan menggulir ke ujung saat diklik; `[data-lds-composer]` memasang perilaku [composer](composer.md) (Enter mengirim, `lds:send` membawa `{ text }`). Di React, render markup yang sama dan panggil `init(ref.current)` di effect setelah pesan dirender.

## Terkait
[Chat message](chat-message.md) · [Composer](composer.md) · [Streaming text](streaming-text.md) · [Tool call](tool-call.md)
