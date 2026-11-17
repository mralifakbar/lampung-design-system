# Streaming text

Kelompok: Obrolan. https://lampung.kartadinata.app/docs/components/streaming-text

Jawaban yang datang kata demi kata, setiap kata memudar masuk dari blur 3 px, dengan caret bulat di ujung selama masih ada yang datang. Ini menunjukkan kemajuan nyata; jangan pernah memalsukannya untuk teks yang sudah Anda miliki.

## Pakai saat
- Balasan asisten yang dibuat sementara orang menunggu: tampilkan kata saat datang dari server.
- Tepat setelah [thinking](thinking.md) selesai: baris thinking mengendap, lalu jawaban mengalir di bawahnya.

## Pakai yang lain saat
- Menunggu sebelum kata pertama ada: pakai [Thinking](thinking.md).
- Teks yang sudah Anda miliki utuh (jawaban tersimpan, artikel bantuan): pakai [Prose](prose.md). Tampilkan sekaligus; mengetiknya ulang hanya memperlambat orang.
- Status pendek yang berubah (Menyimpan, Tersimpan): pakai [Text morph](text-morph.md).
- Memuat tata letak halaman: pakai [Skeleton](skeleton.md).

## Letaknya
Di dalam `.bubble` [chat message](chat-message.md) `msg--ai`, atau di blok baca mana pun yang sedang dibuat (ringkasan di atas laporan). Baris aksi pesan tetap tersembunyi sampai streaming selesai.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.stream` | Elemen yang menerima kata (ditambahkan oleh `streamText`). |
| `.stream.is-streaming` | Selama kata masih datang: menggambar caret bulat 8 px setelah kata terakhir, berkedip setiap detik. |
| `.stream__w` | Satu kata yang sudah datang. Memudar dari blur 3 px dan transparan selama 360 ms. |

## Markup

**Jawaban yang sedang datang.** Tekan Tanya lagi. Kata muncul sesuai kecepatan datangnya; caret menandakan masih ada yang datang dan hilang saat jawaban lengkap. Baris aksi baru muncul di akhir.
```html
import { streamText } from 'lampung-design-system/js';

bubble.setAttribute('aria-busy', 'true');
actions.hidden = true;
await streamText(bubble, fullText, { wordMs: 40 }); // or append words yourself as they arrive
bubble.removeAttribute('aria-busy');
actions.hidden = false;
```

**Setelah thinking.** Thinking berjalan dengan timer sungguhan selama asisten membaca. Saat kata pertama siap, ia mengendap menjadi ringkasan apa yang dilakukan, dan jawaban mengalir di bawahnya.
```html
<div class="msg msg--ai">
  <div class="thinking" data-lds-thinking role="status"><span class="dotgrid" aria-hidden="true"></span><span class="shimmer">Membaca panduan layanan</span><span class="thinking__time"></span></div>
  <div class="bubble"></div>
</div>
<script type="module">
  import { thinkingDone, streamText } from 'lampung-design-system/js';
  // when the first token arrives:
  thinkingDone(msg.querySelector('.thinking'), 'Membaca 3 halaman panduan layanan');
  await streamText(msg.querySelector('.bubble'), text);
</script>
```

**Ringkasan yang dibuat di halaman.** Streaming tidak hanya untuk chat. Ringkasan laporan bisa datang dengan cara yang sama di atas halaman sementara bagian lain halaman sudah bisa dipakai.
```html
<div class="card" style="max-width: 560px;">
  <p class="card__title">Ringkasan pengaduan pekan ini</p>
  <p class="card__sub stream is-streaming" id="st-c" style="margin-top: 8px;"></p>
  <button class="btn btn--plain btn--sm" style="margin-top: 8px; margin-left: -10px;" onclick="this.hidden = true; import('../../js/lds.js').then((m) => m.streamText(document.getElementById('st-c'), 'Sebagian besar laporan pekan ini tentang lampu jalan di Way Halim dan Kedaton. 18 dari 30 laporan sampah tidak terangkut berasal dari Rajabasa, jadi rute angkut hari Senin perlu dicek.'));">Buat ringkasan</button>
</div>
```

## Status
| Status | Caranya |
|---|---|
| `streaming` | `.stream.is-streaming`: kata sedang datang, caret tampil, `aria-busy="true"` pada wadah. |
| `done` | Caret dihapus, `aria-busy` dihapus, aksi ditampilkan. |
| `stopped` | Jika orang menghentikan pembuatan jawaban, anggap selesai di titik itu dan tambahkan baris [meta pesan](chat-message.md) "Dihentikan". |

## Gerak dan mikrointeraksi
- Setiap kata: `lds-word-in`, dari `opacity: 0` dan `blur(3px)` menjadi tajam selama 360 ms dengan `--ease-enter`. Tanpa perpindahan, jadi baris tidak pernah melompat saat dibaca.
- Kecepatan: `streamText` menambah satu kata setiap `wordMs` (bawaan 40 ms). Saat streaming dari server, tambahkan kata ketika datang; jangan menambah jeda buatan di atasnya.
- Caret: titik 8 px setelah kata terakhir, berkedip dengan `lds-caret` (1 detik, bertahap). Hilang begitu teks lengkap.
- Interupsi: memanggil `streamText` lagi pada elemen yang sama mengosongkannya dan mulai dari awal; kata yang sudah memudar masuk tetap tajam.
- Reduced motion: kata muncul sekaligus (tanpa jeda, fade 1 ms) dan caret tampil tanpa berkedip.

## Aksesibilitas
- Pasang `aria-busy="true"` pada pesan selama streaming dan hapus di akhir, agar screen reader di `role="log"` membacakan seluruh jawaban sekali, bukan kata demi kata.
- Jangan memindahkan fokus ke jawaban selama streaming; orang mungkin sedang mengetik pertanyaan berikutnya.
- Caret hanya dekorasi (pseudo-element); tidak ada yang perlu disembunyikan.

## Lakukan
- Pakai streaming hanya untuk teks yang memang sedang dibuat.
- Pasangkan dengan [thinking](thinking.md) untuk masa tunggu sebelum kata pertama.
- Tampilkan aksi salin dan coba lagi hanya setelah selesai.

## Hindari
- Mengetik ulang teks yang sudah Anda miliki agar terlihat pintar.
- Menganimasikan kata naik ke atas atau membesar; baris bacaan harus tetap diam.
- Menggulir percakapan otomatis saat pembaca sudah menggulir ke atas; tampilkan tombol Terbaru ([chat layout](chat-layout.md)).

## Perilaku (HTML biasa)
`streamText(el, text, { wordMs = 40 })` dari `js/lds.js` menambahkan `stream is-streaming` ke `el`, mengosongkannya, menambahkan setiap kata sebagai span `.stream__w`, dan me-resolve promise-nya saat selesai (menghapus `is-streaming`). Dengan token langsung, tambahkan `stream is-streaming` sendiri, tambahkan `<span class="stream__w">word</span>` per kata, dan hapus `is-streaming` di akhir.

## React
```tsx
import { Thinking } from 'lampung-design-system/react';

{phase === 'thinking' && <Thinking label="Reading the service guide" startedAt={startedAt} />}
<div className={`bubble stream${phase === 'streaming' ? ' is-streaming' : ''}`} aria-busy={phase === 'streaming'}>
  {words.map((w, i) => <span key={i} className="stream__w">{w} </span>)}
</div>
```

## Terkait
[Thinking](thinking.md) · [Chat message](chat-message.md) · [Chat layout](chat-layout.md) · [Text morph](text-morph.md)
