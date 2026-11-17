# Tool call

Kelompok: Obrolan. https://lampung.kartadinata.app/docs/components/tool-call

Satu langkah yang diambil asisten untuk sampai pada jawabannya (mencari di panduan layanan, membaca berkas, memeriksa jadwal), ditampilkan sebagai `<details>` satu baris yang tenang dan bisa dibuka untuk melihat temuannya. Jawaban tetap yang utama.

## Pakai saat
- Jawaban asisten bergantung pada sesuatu yang dicari atau dijalankannya, dan orang mungkin ingin memeriksanya: pencarian, berkas yang dibaca, perhitungan, pengecekan jadwal.
- Langkah masih berjalan: baris menampilkan spinner dan label berkilau sampai selesai.
- Beberapa langkah terjadi berurutan sebelum jawaban: tumpuk, satu baris per langkah.

## Pakai yang lain saat
- Menunggu tanpa langkah yang bisa disebut: pakai [Thinking](thinking.md).
- Sumber yang dikutip dalam jawaban: pakai [Citation](citation.md).
- Bagian konten halaman yang bisa dilipat (FAQ, rincian): pakai [Accordion](accordion.md).
- Riwayat tindakan yang dilakukan seseorang: pakai [Timeline](timeline.md).
- Kode yang perlu disalin orang: pakai [Code block](code-block.md).

## Letaknya
Di dalam [chat message](chat-message.md) `msg--ai`, di atas `.bubble` yang berisi jawaban, sesuai urutan langkah dijalankan. Selebar kolom jawaban.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `details.toolcall` | Wajib. `<details>` bawaan: isian tenang, radius 12 px. |
| `summary` | Wajib. Satu baris, minimal 40 px: ikon di depan (atau spinner saat berjalan), langkahnya dalam kata-kata, lalu chevron `expand_more` sebagai ikon terakhir. |
| `.ic:last-child` | Wajib. Chevron; berputar 180 derajat saat terbuka. Harus menjadi ikon terakhir di summary. |
| `.toolcall__body` | Apa yang ditemukan atau dilakukan langkah itu: satu kalimat pendek, [list](list.md), atau [code block](code-block.md). |

## Markup

**Yang dicari asisten.** Tertutup secara bawaan. Buka salah satunya untuk memeriksa sumber yang dipakai jawaban.
```html
<div class="msg msg--ai" style="max-width: 560px;">
  <details class="toolcall"><summary><span class="ic" aria-hidden="true">search</span>Mencari "surat pindah" di panduan layanan<span class="ic" aria-hidden="true">expand_more</span></summary><div class="toolcall__body">Menemukan 3 halaman: persyaratan Disdukcapil, formulir surat pengantar RT/RW, tanya jawab pindah antarkota.</div></details>
  <details class="toolcall"><summary><span class="ic" aria-hidden="true">description</span>Membaca syarat surat pindah<span class="ic" aria-hidden="true">expand_more</span></summary><div class="toolcall__body">Yang dibutuhkan: KK, KTP-el, surat pengantar RT/RW, dan alamat tujuan lengkap.</div></details>
  <div class="bubble">Untuk pindah dari Kedaton ke Metro, bawa KK, KTP-el, dan surat pengantar dari RT/RW Anda. Disdukcapil Bandar Lampung biasanya menerbitkan suratnya dalam 3 hari kerja.</div>
</div>
```

**Langkah yang masih berjalan.** Selama berjalan, spinner menggantikan ikon dan labelnya berkilau. Saat selesai, label berganti menjadi temuannya dan ikon menjadi tanda centang.
```html
<details class="toolcall">
  <summary>
    <span class="spinner" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>
    <span class="shimmer">Mengambil nomor antrean</span>
    <span class="ic" aria-hidden="true">expand_more</span>
  </summary>
  <div class="toolcall__body">…</div>
</details>
<!-- Done: replace the spinner with <span class="ic" aria-hidden="true">check_circle</span>,
     drop the shimmer class and name the result: "Antrean B-014 sudah diambil". -->
```

**Langkah dengan kode.** Jika langkah menjalankan kode atau query, isinya berupa code block agar orang bisa menyalin dan memeriksanya.
```html
<details class="toolcall" open style="max-width: 560px; width: 100%;"><summary><span class="ic" aria-hidden="true">code</span>Menjalankan query pada laporan warga<span class="ic" aria-hidden="true">expand_more</span></summary><div class="toolcall__body"><div class="codeblock"><pre>SELECT COUNT(*) FROM reports WHERE kecamatan = 'Kedaton' AND status = 'open';</pre></div></div></details>
```

**Langkah yang gagal.** Sebutkan apa yang gagal dan apa yang dilakukan jawaban sebagai gantinya. Jawaban di bawahnya tidak boleh berpura-pura langkah itu berhasil.
```html
<div class="msg msg--ai" style="max-width: 560px;">
  <details class="toolcall"><summary><span class="ic" aria-hidden="true">cloud_off</span>Tidak bisa membuka gambar-situasi.pdf<span class="ic" aria-hidden="true">expand_more</span></summary><div class="toolcall__body">Ukuran berkas lebih dari 20 MB. Jawaban di bawah hanya memakai formulir permohonan Anda.</div></details>
  <div class="bubble">Menurut formulir permohonan Anda, persetujuan bangunan gedung masih membutuhkan gambar situasi sebelum bisa diperiksa petugas.</div>
</div>
```

## Status
| Status | Caranya |
|---|---|
| `closed` | Bawaan: satu baris, chevron mengarah ke bawah. |
| `open` | `[open]`: isi langsung tampil; chevron berputar 180 derajat. |
| `running` | `.spinner` menggantikan ikon depan dan label `.shimmer`. |
| `done` | Ikon hasil (`check_circle`, `search`, `description`), label menyebut temuannya. |
| `failed` | Ikon biasa (`cloud_off`, `error`) dan alasannya dalam kata-kata; tanpa isian merah. |

## Gerak dan mikrointeraksi
- Chevron: berputar 180 derajat dengan `--spring-smooth` (`--d-smooth`, 560 ms); berbalik dari posisinya saat itu jika diklik lagi.
- Isi: muncul dan hilang seketika. `<details>` bawaan tidak menganimasikan tingginya di sini; jika tinggi perlu bergerak, pakai [accordion](accordion.md).
- Berjalan: spinner berputar (800 ms per putaran) dan label berkilau dengan siklus 1,8 detik; saat langkah selesai, kilau mengendap menjadi teks solid selama `--d-standard`.
- Reduced motion: kilau berhenti (teks solid), chevron berputar dalam 120 ms; spinner tetap berputar karena melaporkan pekerjaan.

## Aksesibilitas
- `<details>`/`<summary>` bawaan: keyboard (Enter, Space) dan status terbuka sudah tersedia. Pertahankan.
- Teks summary harus menyebut langkahnya sendiri ("Mencari surat pindah di panduan layanan"), bukan hanya ikon.
- Ikon memakai `aria-hidden`; spinner juga. Selama langkah berjalan, pesan diberi `aria-busy="true"`.

## Lakukan
- Sebut langkah dan objeknya: "Membaca latihan soal 3".
- Biarkan langkah tertutup secara bawaan; jawaban yang utama.
- Susun langkah sesuai urutan jalannya, di atas jawaban.

## Hindari
- Menampilkan nama tool mentah atau JSON di summary.
- Memakainya untuk konten halaman yang perlu dibaca orang; pakai [accordion](accordion.md).
- Membiarkan spinner berputar setelah langkah selesai atau gagal.

## Perilaku (HTML biasa)
Tidak ada. Ini `<details>` bawaan. Perbarui summary sendiri saat langkah selesai.

## Terkait
[Chat message](chat-message.md) · [Thinking](thinking.md) · [Streaming text](streaming-text.md) · [Accordion](accordion.md)
