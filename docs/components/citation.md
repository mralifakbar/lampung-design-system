# Citation

Kelompok: Konten. https://lampung.kartadinata.app/docs/components/citation

Pil bernomor kecil setelah sebuah klaim yang menautkan ke sumbernya: `<a class="cite" href="#src-1">1</a>`. Dipakai di artikel dan jawaban asisten agar setiap fakta bisa diperiksa.

## Pakai saat
- Jawaban asisten atau ringkasan menyebut fakta dari dokumen: setiap klaim mendapat sitasi bernomor ke dokumen asalnya.
- Panduan layanan atau laporan merujuk sumber yang dicantumkan di akhir.

## Pakai yang lain saat
- Tautan yang perlu diikuti pembaca sebagai bagian kalimat: pakai [Link](link.md).
- Mengutip kata-kata dari sumber: pakai [Quote](quote.md).
- Jumlah item di samping label: pakai [Count](count.md).
- Tag status atau kategori: pakai [Badge](badge.md).
- Pratinjau halaman tertaut saat hover: pakai [Hover card](hover-card.md).

## Letaknya
Tepat setelah klaim, sebelum atau sesudah titik secara konsisten, tanpa spasi sebelumnya. Daftar sumber bernomor ada di akhir teks atau pesan. Di ponsel, letakkan daftar sumber tepat di bawah jawaban agar lompatannya pendek.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `a.cite` | Wajib. Pil setinggi 18 px di atas `--accent-tint`, angka tabular semibold 11 px dengan `--accent-text`. `href` menunjuk ke entri sumber (atau URL sumber). |
| `aria-label` | Wajib. "Sumber 1", agar tidak dibacakan sebagai angka saja. |
| `sources list` | Daftar berurut di akhir yang itemnya membawa `id` yang sesuai. Di `.prose`, `<ol>` biasa sudah bergaya. |

## Markup

**Di dalam jawaban, dengan sumber.** Setiap klaim menunjuk ke dokumen asalnya. Arahkan kursor ke angka untuk melihatnya menggelap.
```html
<div class="prose">
  <p>Samsat keliling melayani Way Halim setiap Selasa dan Kamis, 08.00 sampai 12.00, di Lapangan Way Halim <a class="cite" href="#cite-src-1" aria-label="Sumber 1">1</a>. Bawa KTP-el dan STNK asli <a class="cite" href="#cite-src-2" aria-label="Sumber 2">2</a>, dan pajak kendaraan dibayar di tempat lewat QRIS atau tunai <a class="cite" href="#cite-src-1" aria-label="Sumber 1">1</a>.</p>
  <h3>Sumber</h3>
  <ol>
    <li id="cite-src-1"><a href="#jadwal">Jadwal Samsat keliling Bandar Lampung, November 2026</a></li>
    <li id="cite-src-2"><a href="#syarat">Syarat pembayaran pajak kendaraan tahunan</a></li>
  </ol>
</div>
```

## Status
| Status | Caranya |
|---|---|
| `hover` | Latar menggelap ke `--accent-tint-strong` selama `--d-fast`. |
| `focus` | Focus ring sistem di sekeliling pil. |
| `target` | Item sumber yang dituju; pakai `:target` di CSS proyek Anda atau gulir ke tampilan. |

## Gerak dan mikrointeraksi
- Hanya warna hover, selama `--d-fast`. Lompatan ke sumber memakai smooth scroll halaman; dengan reduced motion langsung melompat.

## Aksesibilitas
- `<a href>` dengan `aria-label="Sumber N"`; angka yang terlihat saja tidak bermakna saat dibacakan.
- Pil setinggi 18 px, di bawah target sentuh 44 px. Beri jarak antarsitasi dalam teks dan selalu sediakan daftar sumber lengkap sebagai jalan kedua untuk mencapainya.
- Beri nomor sumber sesuai urutan kemunculan pertama dan pakai ulang nomornya untuk sitasi berulang.

## Lakukan
- Beri sitasi untuk setiap klaim faktual dalam jawaban asisten yang berasal dari dokumen.
- Cantumkan sumber dengan judul yang dikenali orang.

## Hindari
- Memberi sitasi tanpa daftar sumber.
- Memakai sitasi sebagai catatan kaki untuk keterangan sampingan; tulis keterangannya di teks.
- Menaruh beberapa pil berderet tanpa teks di antaranya; tulis `1, 2` dalam satu kalimat.

## Terkait
[Prose](prose.md) · [Link](link.md) · [Quote](quote.md) · [Chat message](chat-message.md)
