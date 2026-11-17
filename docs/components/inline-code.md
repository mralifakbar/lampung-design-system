# Inline code

Kelompok: Konten. https://lampung.kartadinata.app/docs/components/inline-code

Potongan kode pendek, nama berkas, kunci atau nilai di dalam kalimat: `<code class="code">report_id</code>`, monospace 0,88 em di atas `--bg-recessed`.

## Pakai saat
- Menyebut kode, perintah, nama berkas, nama kolom atau nilai persis yang akan diketik orang: `report_id`, `npm run build`, `pengaduan.csv`.
- Menampilkan kode pendek yang disalin orang dengan membacanya (kode booking antrean dalam petunjuk).

## Pakai yang lain saat
- Kode lebih dari satu baris, atau kode yang disalin dengan tombol: pakai [Code block](code-block.md).
- Nilai yang disalin dengan sekali tekan: pakai [Copy button](copy-button.md).
- Pintasan keyboard: pakai [Keyboard key](kbd.md).
- Kata status atau kategori: pakai [Badge](badge.md).

## Letaknya
Inline, di dalam teks berjalan, teks bantuan, sel tabel dan [prose](prose.md). Ukurannya mengikuti teks di sekitarnya (0,88 em), jadi cocok di teks isi maupun footnote. Nilai panjang terlipat seperti kata; hindari di kolom ponsel yang sempit.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `code.code` | Wajib. Elemen `<code>`. `--mono` 0,88 em, `--text-strong` di atas `--bg-recessed`, radius 6 px, padding 1 px kali 6 px. |

## Markup

**Di dalam kalimat.** Nama kolom dan perintah di dalam petunjuk.
```html
<p class="measure" style="font: var(--type-body); color: var(--text-default);">Ekspor laporan pengaduan warga sebagai <code class="code">pengaduan.csv</code>, lalu pastikan kolom pertamanya <code class="code">report_id</code>. Jalankan <code class="code">npm run import</code> untuk memuatnya.</p>
```

**Di teks bantuan.** Ukurannya menyesuaikan teks kecil di sekitarnya.
```html
<div class="field" style="max-width: 360px;">
  <label class="field__label" for="ic-key">Kode booking Samsat</label>
  <div class="control"><input id="ic-key" placeholder="SMS-0412" aria-describedby="ic-key-help"></div>
  <span class="field__help" id="ic-key-help">Tertera di SMS konfirmasi, contohnya <code class="code">SMS-0412</code>.</span>
</div>
```

## Gerak dan mikrointeraksi
- Tidak ada.

## Aksesibilitas
- Pakai elemen `<code>`; screen reader bisa mengumumkannya sebagai kode dan mempertahankan karakter persisnya.
- Jangan hanya mengandalkan tampilan monospace untuk menandai sesuatu sebagai teks persis; tulis "ketik" atau "masukkan" di kalimatnya.
- Kontras: `--text-strong` di atas `--bg-recessed` jauh di atas 4,5:1 di kedua tema.

## Lakukan
- Pakai untuk teks persis yang diketik atau dibaca ulang orang.
- Buat tetap pendek; pindahkan yang lebih panjang ke [code block](code-block.md).

## Hindari
- Memakainya untuk penekanan atau nama produk.
- Menaruh tombol atau tautan di dalamnya.

## Terkait
[Code block](code-block.md) · [Prose](prose.md) · [Keyboard key](kbd.md) · [Copy button](copy-button.md)
