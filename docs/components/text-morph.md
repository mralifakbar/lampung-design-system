# Text morph

Kelompok: Mikrointeraksi. https://lampung.kartadinata.app/docs/components/text-morph

Sebuah kata berubah di tempatnya dan hanya huruf yang berbeda yang bergerak: huruf yang tetap bergeser ke posisi barunya, huruf baru naik masuk, huruf yang pergi memudar kabur, dan lebarnya berpindah dengan spring di antara dua kata. Pakai untuk hasil sebuah aksi yang disampaikan dengan kata, tepat di tempat aksi itu terjadi.

## Pakai saat
- Tombol menyebut apa yang sedang dikerjakan dan apa hasilnya: Simpan draf, Menyimpan, Tersimpan.
- Status berubah di depan orang: Diajukan, Ditinjau, Disetujui.
- Jumlah pendek dalam kata berubah: Sisa 3 kuota, Sisa 2 kuota, Kuota penuh.
- Toast yang mengubah teksnya sendiri setelah Urungkan (Dihapus, Dipulihkan); `toast()` sudah melakukannya.

## Pakai yang lain saat
- Angka yang bergulir (jumlah, total): pakai [Number count](number-count.md).
- Menunggu tanpa hasil: pakai [Thinking](thinking.md).
- Ikon yang berubah (salin ke centang, putar ke jeda): pakai [Icon swap](icon-swap.md).
- Seluruh panel atau tampilan berubah: pakai [View swap](view-swap.md).
- Aksi yang ditolak: pakai [Shake](shake.md).
- Kalimat atau paragraf panjang: pakai [Streaming text](streaming-text.md). Morph untuk satu sampai tiga kata.

## Letaknya
Inline, di dalam kontrol atau baris yang maknanya berubah: label tombol, baris status, badge, judul toast. Layout di sekitarnya harus membolehkan lebar berubah (bukan sel berlebar tetap).

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.morph` | Wajib. `<span>` inline-block dengan `data-lds-morph` (atau disiapkan oleh `morphText`). Lebarnya bertransisi di antara kata. |
| `.morph__l` | Satu huruf (ditambahkan oleh JS, `aria-hidden`). |
| `.morph__sr` | Salinan seluruh kata yang tersembunyi secara visual untuk pembaca layar (ditambahkan oleh JS). |

## Markup

**Status yang berlanjut.** Tekan Status berikutnya. Huruf yang sama ("Di", "a") bergeser, tidak diganti; lebarnya berpindah dengan spring ke kata baru.
```html
Status: <span class="morph" data-lds-morph>Diajukan</span>
<script type="module">
  import { morphText } from 'lampung-design-system/js';
  morphText(document.querySelector('.morph'), 'Ditinjau');
</script>
```

**Simpan, menyimpan, tersimpan.** Tombol menceritakan semuanya lewat labelnya sendiri, jadi toast tidak diperlukan. Label kembali ke Simpan draf setelah momennya lewat.
```html
<button class="btn btn--secondary"><span class="ic" aria-hidden="true">draft</span><span class="morph" data-lds-morph>Simpan draf</span></button>
// on click: morphText(label, 'Menyimpan'); await save(); morphText(label, 'Tersimpan');
```

**Jumlah dalam kata.** Ambil antrean sampai kuotanya habis. Hanya angkanya yang berubah sampai kalimatnya sendiri berganti.
```html
<span class="badge badge--warning"><span class="morph" data-lds-morph id="tm-seats" aria-live="polite">Sisa 3 kuota</span></span>
<button class="btn btn--primary btn--md" onclick="const el = document.getElementById('tm-seats'); const n = Number(el.dataset.n || 3) - 1; if (n < 0) return; el.dataset.n = n; import('../../js/lds.js').then((m) => m.morphText(el, n === 0 ? 'Kuota penuh' : n === 1 ? 'Sisa 1 kuota' : 'Sisa ' + n + ' kuota')); if (n === 0) this.disabled = true;">Ambil antrean</button>
```

## Gerak dan mikrointeraksi
- Huruf dikenali dari karakter dan urutan kemunculannya, jadi "Menyimpan" ke "Tersimpan" mempertahankan e, i, m, p, a, n dan menggesernya; huruf lainnya pergi dan masuk.
- Huruf yang tetap bergeser ke posisi x barunya dengan `--spring-smooth` (560 ms). Huruf baru naik dari 0,14 em di bawah dengan blur 4 px dan skala 0,8 dalam 280 ms dengan `--ease-enter`, berjarak 32 ms, paling banyak 8 langkah. Huruf yang pergi memudar kabur ke atas dalam `--d-exit` (180 ms) dengan `--ease-exit` dan dihapus setelah 220 ms.
- Lebar: span mempertahankan lebar lamanya, lalu bertransisi ke lebar baru dengan `--spring-smooth`, jadi teks setelahnya bergeser sekali dengan mulus.
- Interupsi: memanggil `morphText` di tengah morph dimulai dari apa yang tampil di layar; huruf yang sedang pergi dari morph sebelumnya dibuang.
- Reduced motion: kata langsung diganti, tidak ada huruf yang bergerak.

## Aksesibilitas
- Huruf-huruf diberi `aria-hidden`; kata baru utuh ada di salinan `.morph__sr` yang tersembunyi secara visual, jadi pembaca layar tidak pernah membaca huruf satu per satu.
- Morph tidak mengumumkan apa pun dengan sendirinya. Bila perubahannya perlu terdengar (tersimpan, disetujui), pasang `aria-live="polite"` pada morph atau wadahnya, atau pakai `aria-busy` pada tombol dan baris status.
- Pastikan nama aksesibel tombol tetap bermakna di setiap keadaan ("Tersimpan" boleh; "..." tidak).

## Lakukan
- Morph satu sampai tiga kata, di kontrol tempat aksi terjadi.
- Sebut hasilnya ("Tersimpan"), lalu kembali ke label aksi setelah sesaat.
- Pakai kata yang sama dengan yang dibaca orang di bagian lain produk.

## Hindari
- Morph kalimat panjang atau seluruh paragraf.
- Menambahkan toast yang mengulang isi label.
- Menaruh morph di kotak berlebar tetap yang memotong kata yang lebih panjang.

## Perilaku (HTML biasa)
`[data-lds-morph]` disiapkan saat `init()`. `morphText(el, text)` mengubah ke `text` (dan menyiapkan elemen bila perlu). `thinkingDone()` dan `toast().update()` juga memakainya.

## Terkait
[Button](button.md) · [Number count](number-count.md) · [Icon swap](icon-swap.md) · [Toast](toast.md)
