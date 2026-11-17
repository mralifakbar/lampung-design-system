# Inbox list

Kelompok: Tampilan data. https://lampung.kartadinata.app/docs/components/inbox-list

Baris pesan atau percakapan: siapa, kapan, subjek, dan cuplikan, dengan state belum dibaca, sedang dibuka, dan ditandai. Barisnya adalah tombol yang membuka pesan; yang terbaru ada di atas.

## Pakai saat
- Kotak masuk email, daftar percakapan chat, atau antrean pengaduan, ketika setiap baris membuka satu pesan atau utas.
- Notifikasi atau pengumuman yang ditangani satu per satu, ketika status belum dibaca penting.
- Panel kiri [resizable split](resizable-split.md) dengan pesan yang terbuka di kanan.

## Pakai yang lain saat
- Pengaturan, tautan, atau catatan yang bukan pesan: pakai [List](list.md). Baris daftar biasa dengan judul dan nilai.
- Catatan yang dibandingkan dengan kolom yang sama: pakai [Data table](data-table.md).
- Pesan-pesan di dalam satu percakapan: pakai [Chat message](chat-message.md).
- Riwayat apa yang terjadi pada satu catatan: pakai [Timeline](timeline.md).

## Letaknya
Di panel gulir sendiri, selebar panel itu: di samping panel baca pada layar lebar, seluruh layar di ponsel (baris mendorong pesan dengan [navigation stack](nav-stack.md)). Taruh pencarian dan filter di atasnya, di luar area gulir. Bungkus setiap baris dengan [swipe](swipe-actions.md) untuk arsip dan hapus di ponsel.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.inbox[data-lds-inbox]` | Wajib. Kolom baris. `inbox--avatars` memulai garis tipis setelah avatar 40 px. |
| `button.inbox__row` | Wajib. Satu pesan: tombol asli (atau tautan) yang membukanya. Minimal 64 px, gutter kiri 20 px untuk titik belum dibaca. |
| `.avatar` | Opsional. Pengirimnya, 40 px. |
| `.inbox__body` | Wajib. Kolom teks. |
| `.inbox__line` | Baris di dalam body: `.inbox__from` (elipsis) dan `.inbox__time` di baris pertama; di daftar chat, `.inbox__preview` dan [count](count.md) di baris kedua. |
| `.inbox__subject` | Opsional. Subjek, satu baris dengan elipsis. |
| `.inbox__preview` | Opsional. Kata-kata pertama pesan, dua baris (`--lines` mengubahnya), satu baris bila di dalam `.inbox__line`. |
| `.inbox__flag` | Bendera terisi berwarna warning di baris pertama, dengan `aria-label`. Penanda lain (lampiran) berupa ikon redup. |
| `.inbox__meta` | Baris [badge](badge.md) opsional di bawah cuplikan: label. |

## Markup

**Kotak masuk.** Baris belum dibaca punya titik dan huruf tebal; pesan yang terbuka berada di tint aksen. Fokuskan satu baris dan pakai panah Atas dan Bawah (atau j dan k) untuk berpindah.
```html
<div class="inbox inbox--avatars card" data-lds-inbox style="padding: 0; overflow: hidden; max-width: 460px;" aria-label="Kotak masuk">
  <button class="inbox__row is-unread" type="button">
    <span class="avatar" style="--size: 40px;" aria-hidden="true">NP</span>
    <span class="inbox__body">
      <span class="inbox__line"><span class="inbox__from">Nadia Putri</span><span class="ic inbox__flag" aria-label="Ditandai">flag</span><time class="inbox__time">09.12</time></span>
      <span class="inbox__subject">Anggaran TW4: dua pos perlu persetujuan Anda</span>
      <span class="inbox__preview">Biaya perangkat lunak sudah saya pindah ke belanja operasional sesuai kesepakatan. Pos perjalanan dinas masih lebih 8%, bisa dicek sebelum Jumat?</span>
    </span>
  </button>
  <button class="inbox__row" type="button" aria-current="true">
    <span class="avatar avatar--gray" style="--size: 40px;" aria-hidden="true">GR</span>
    <span class="inbox__body">
      <span class="inbox__line"><span class="inbox__from">Galih Ramadhan</span><span class="ic" aria-label="Ada lampiran">attach_file</span><time class="inbox__time">08.40</time></span>
      <span class="inbox__subject">Halaman pembayaran retribusi siap ditinjau</span>
      <span class="inbox__preview">Virtual account dan kartu sudah berfungsi di staging. Bukti bayar terkirim lewat email dalam satu menit.</span>
    </span>
  </button>
  <button class="inbox__row" type="button">
    <span class="avatar avatar--gray" style="--size: 40px;" aria-hidden="true">SH</span>
    <span class="inbox__body">
      <span class="inbox__line"><span class="inbox__from">Sari Handayani</span><time class="inbox__time">Kemarin</time></span>
      <span class="inbox__subject">Jadwal pengingat tagihan pajak</span>
      <span class="inbox__preview">Tiga hari sebelum dan pada tanggal jatuh tempo, sesuai pembahasan. Teksnya sudah saya taruh di dokumen.</span>
    </span>
  </button>
</div>
```

**Percakapan.** Daftar chat: nama dan jam di baris pertama, pesan terakhir dan [count](count.md) belum dibaca di baris kedua. Percakapan yang sedang dibuka berada di tint.
```html
<div class="inbox inbox--avatars card" data-lds-inbox style="padding: 0; overflow: hidden; max-width: 380px;" aria-label="Percakapan">
  <button class="inbox__row is-unread" type="button"><span class="avatar" style="--size: 40px;" aria-hidden="true">PB</span><span class="inbox__body"><span class="inbox__line"><span class="inbox__from">Posko banjir Kedaton</span><time class="inbox__time">10.02</time></span><span class="inbox__line"><span class="inbox__preview">Bima: perahu karet sudah tiba di RT 05</span><span class="count">3<span class="sr-only"> belum dibaca</span></span></span></span></button>
  <button class="inbox__row" type="button" aria-current="true"><span class="avatar avatar--gray" style="--size: 40px;" aria-hidden="true">DL</span><span class="inbox__body"><span class="inbox__line"><span class="inbox__from">Dewi Lestari</span><time class="inbox__time">09.47</time></span><span class="inbox__line"><span class="inbox__preview">Baik, sampai ketemu pukul 14.00</span></span></span></button>
</div>
```

**Dengan aksi geser.** Di ponsel setiap baris berada di dalam [swipe](swipe-actions.md): geser ke kiri untuk arsip dan hapus. Sediakan aksi yang sama di panel baca untuk yang tidak menggeser.
```html
<div class="inbox card" data-lds-inbox style="padding: 0; overflow: hidden; max-width: 420px;" aria-label="Kotak masuk">
  <div class="swipe" data-lds-swipe><div class="swipe__actions"><button class="swipe__act swipe__act--accent" type="button" data-swipe="archive"><span class="ic" aria-hidden="true">archive</span>Arsipkan</button><button class="swipe__act swipe__act--danger" type="button" data-swipe="delete" data-swipe-commit><span class="ic" aria-hidden="true">delete</span>Hapus</button></div>
    <button class="inbox__row swipe__row is-unread" type="button"><span class="inbox__body"><span class="inbox__line"><span class="inbox__from">Arif Santoso</span><time class="inbox__time">07.55</time></span><span class="inbox__subject">Lampu jalan mati di Jl. Teuku Umar</span><span class="inbox__preview">Petugas dijadwalkan memeriksa besok pagi.</span></span></button></div>
  <div class="swipe" data-lds-swipe><div class="swipe__actions"><button class="swipe__act swipe__act--accent" type="button" data-swipe="archive"><span class="ic" aria-hidden="true">archive</span>Arsipkan</button><button class="swipe__act swipe__act--danger" type="button" data-swipe="delete" data-swipe-commit><span class="ic" aria-hidden="true">delete</span>Hapus</button></div>
    <button class="inbox__row swipe__row" type="button"><span class="inbox__body"><span class="inbox__line"><span class="inbox__from">Dewi Lestari</span><time class="inbox__time">Sen</time></span><span class="inbox__subject">Jadwal Samsat keliling pekan depan</span><span class="inbox__preview">Senin di Kantor Kecamatan Way Halim, Rabu di Pasar Kemiling.</span></span></button></div>
</div>
```

## Varian dan ukuran
| Kelas atau atribut | Kapan |
|---|---|
| `.inbox` | Baris tanpa avatar (email yang dipindai dari subjeknya). |
| `.inbox--avatars` | Baris yang diawali avatar 40 px; garis tipis mulai setelahnya. |

## Status
| Status | Caranya |
|---|---|
| `unread` | `.is-unread` pada baris: titik aksen 8 px di gutter, pengirim dan subjek dengan ketebalan 600, jam dengan warna teks aksen. Sebutkan juga dalam kata (`sr-only` "Belum dibaca"). |
| `current` | `aria-current="true"` pada baris yang pesannya terbuka: tint aksen; garis tipis di sebelahnya disembunyikan. |
| `flagged` | Ikon `flag` terisi dengan `.inbox__flag` dan `aria-label="Ditandai"`; ikon muncul dengan efek pop saat dipasang. |
| `hover / pressed` | Tint tenang saat hover (hanya perangkat pointer), tint lebih kuat saat ditekan. |
| `empty` | [Empty state](empty-state.md) di panel: mengapa kosong dan satu aksinya (Hapus pencarian, Tulis pesan). |
| `loading` | Baris [skeleton](skeleton.md) dengan tinggi yang sama: lingkaran avatar, dua baris. |

## Gerak dan mikrointeraksi
- Tint latar berubah selama `--d-fast` (160 ms) dengan `--ease-standard`; tidak ada yang bergerak saat hover.
- Bendera muncul dengan pop memakai `--spring-snappy` (`lds-pop`); melepasnya terjadi seketika.
- Mengarsipkan atau menghapus lewat [swipe](swipe-actions.md) menggeser baris keluar dan menutup tingginya dengan `--spring-smooth`; `restore()` mengembalikannya untuk Urungkan.
- Reduced motion: tanpa pop; tint tetap berubah.

## Aksesibilitas
- Setiap baris adalah `button` (atau `a`) asli yang teksnya terbaca berurutan: pengirim, jam, subjek, cuplikan. Tambahkan `sr-only` "Belum dibaca" pada baris yang belum dibaca; ikon membawa `aria-label` atau disembunyikan.
- Tandai pesan yang terbuka dengan `aria-current="true"`, bukan hanya dengan tint.
- Atas dan Bawah (serta j / k) memindahkan fokus antar baris, Home dan End ke ujung; Tab keluar dari daftar.
- Beri daftar `aria-label` ("Kotak masuk, 4 belum dibaca") dan jaga agar tetap terbaru.

## Lakukan
- Taruh pesan terbaru di atas dan tulis waktu sebagai teks biasa ("09.12", "Kemarin").
- Batasi cuplikan dua baris dan subjek satu baris.
- Sediakan di panel baca aksi yang sama dengan yang ditawarkan swipe di baris.

## Hindari
- Mewarnai seluruh baris untuk pesan belum dibaca; titik dan ketebalan huruf sudah cukup.
- Menaruh tombol di dalam baris; buka pesannya dan bertindak di sana, atau pakai swipe.
- Memakainya untuk catatan berkolom; pakai [data table](data-table.md).

## Perilaku (HTML biasa)
`data-lds-inbox` pada `.inbox`: Atas dan Bawah (serta j / k) memindahkan fokus antar baris yang terlihat, Home dan End melompat ke ujung. Membuka pesan, status belum dibaca, dan bendera diatur aplikasi Anda: pasang `aria-current`, `.is-unread`, dan ikon bendera dari state Anda.

## Terkait
[List](list.md) · [Swipe actions](swipe-actions.md) · [Resizable split](resizable-split.md) · [Chat layout](chat-layout.md)
