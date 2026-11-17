# Penulisan

https://lampung.kartadinata.app/docs/guide/penulisan

Cara menulis teks antarmuka untuk layanan publik dalam bahasa Indonesia: jelas bagi setiap warga, sopan tanpa berbelit, dan selalu memberi tahu langkah berikutnya.

## Bahasa yang dipahami semua warga

Layanan publik dipakai oleh siapa saja: pelajar, petani, pedagang, pensiunan, orang yang baru pertama kali memakai ponsel pintar. Tulislah untuk mereka semua. Teks yang bisa dipahami orang dengan pendidikan dasar tetap terasa jelas bagi orang dengan gelar sarjana; sebaliknya tidak berlaku.

- Satu kalimat, satu gagasan. Usahakan kalimat di bawah 20 kata.
- Pakai kata sehari-hari: "isi", "kirim", "ubah", bukan "lakukan pengisian", "melakukan pengiriman", "melakukan perubahan".
- Letakkan hal terpenting di awal: apa yang harus dilakukan, sampai kapan, dan apa akibatnya.
- Hindari bahasa surat dinas di layar. "Dengan hormat, bersama ini kami sampaikan" tidak dibutuhkan di formulir.

## Kalimat aktif, sapaan dan huruf kapital

**Kalimat aktif.** Sebutkan siapa yang berbuat. "Petugas akan memeriksa berkas Anda dalam 3 hari kerja" lebih jelas daripada "Berkas akan diperiksa". Kalimat pasif boleh dipakai bila pelakunya memang tidak penting atau tidak diketahui.

**Sapaan.** Sapa pembaca dengan "Anda" (huruf A kapital), tetapi seperlunya. Kalimat perintah yang sopan sering lebih ringkas: "Unggah foto KTP" cukup, tidak perlu "Anda diharapkan untuk mengunggah foto KTP Anda". Jangan memakai "kamu", "Bapak/Ibu" atau "Saudara" di antarmuka; satu sapaan yang sama di seluruh layanan memudahkan orang.

**Huruf kapital kalimat.** Judul, tombol, label dan menu memakai huruf kapital hanya di awal dan pada nama diri: "Riwayat permohonan", bukan "Riwayat Permohonan". Jangan menulis seluruh kata dengan huruf kapital untuk memberi tekanan.

**Tanda baca.** Jangan memakai tanda pisah panjang (em dash). Pecah kalimatnya, atau pakai titik dua, koma atau tanda kurung. Build dokumentasi ini menolak tanda pisah panjang. Hindari tanda seru kecuali untuk peringatan keselamatan yang sungguh mendesak.

## Tombol dan tautan

Label tombol menyebut hasil yang terjadi setelah tombol ditekan. Orang harus bisa menebak akibatnya tanpa membaca teks lain di layar.

- Pakai kata kerja dan objeknya: `Kirim laporan`, `Simpan perubahan`, `Unduh bukti bayar`, `Batalkan permohonan`.
- Hindari label umum seperti "Submit", "OK", "Proses" atau "Klik di sini".
- Dalam dialog konfirmasi, tombol mengulang tindakannya: "Hapus draf?" dijawab dengan `Hapus draf` dan `Batal`, bukan "Ya" dan "Tidak".
- Teks tautan menyebut tujuannya: "Lihat syarat izin usaha", bukan "selengkapnya".
- Satu tombol utama per layar. Lihat [Tombol](../components/button.md) untuk varian dan urutannya.

## Pesan galat dan konfirmasi

Pesan galat menjawab dua pertanyaan: apa yang terjadi, dan apa yang bisa dilakukan sekarang. Jangan menyalahkan pembaca, jangan menampilkan kode teknis tanpa penjelasan, dan jangan berhenti di "Terjadi kesalahan".

- Galat pada kolom ditaruh tepat di bawah kolom itu: "NIK harus 16 angka. Anda mengisi 15." (lihat [Kolom teks](../components/text-field.md)).
- Galat sistem menyebut apa yang tetap aman: "Laporan belum terkirim karena koneksi terputus. Isian Anda tersimpan. Coba kirim lagi."
- Konfirmasi sukses menyebut hasil dan waktu tunggu: "Laporan terkirim. Nomor tiket LPR-20261112-0042. Petugas membalas dalam 2 hari kerja."
- Ringkasan di atas formulir memakai [Alert](../components/alert.md); warna dan ikon hanya pendukung, kata-katanya yang membawa makna.

Foto KTP belum bisa diunggah Ukuran berkas 8 MB, batasnya 5 MB. Perkecil foto atau pilih berkas lain.

## Angka, tanggal, waktu dan mata uang

Pakai format Indonesia di semua teks berbahasa Indonesia, termasuk di tabel dan grafik.

| Jenis | Tulis | Jangan |
| --- | --- | --- |
| Mata uang | Rp 75.000 | Rp75000, IDR 75,000, 75rb |
| Desimal | 2,5 km | 2.5 km |
| Ribuan | 12.480 warga | 12,480 warga |
| Tanggal | 12 November 2026 | 11/12/2026, 2026-11-12, Nov 12 |
| Hari dan tanggal | Kamis, 12 November 2026 | Kamis 12/11 |
| Waktu | 08.30 WIB | 8:30 AM, jam 8.30 pagi |
| Rentang | 08.00 sampai 15.00 WIB | 08.00-15.00 |
| Nomor telepon | 0721 123 456 | (0721)123456 |

Tulis zona waktu (WIB) bila layanan bisa diakses dari luar Lampung. Angka yang berubah atau disejajarkan di tabel memakai angka tabular. Di dalam kalimat, angka satu sampai sembilan boleh ditulis dengan huruf, kecuali untuk jumlah, ukuran dan tenggat yang perlu dipindai cepat.

## Istilah, singkatan dan bahasa inklusif

**Singkatan.** Tulis kepanjangannya pada kemunculan pertama, lalu singkatannya: "Nomor Induk Kependudukan (NIK)", "organisasi perangkat daerah (OPD)". Bila ruang sempit, seperti label kolom, pakai singkatan yang sudah dikenal luas (NIK, KTP) dan jelaskan di teks bantuan. Singkatan internal kantor jangan muncul di layar warga.

**Jargon.** Ganti istilah birokrasi dengan apa yang dialami warga: "berkas Anda sedang diperiksa", bukan "dalam proses verifikasi dan validasi". Bila istilah resmi harus muncul (misalnya nama dokumen), tambahkan penjelasan singkat.

**Istilah bahasa Inggris.** Utamakan padanan Indonesia yang umum dipakai: "kata sandi", "unggah", "unduh", "masuk", "keluar". Pakai istilah bahasa Inggris hanya bila padanannya asing bagi kebanyakan orang atau istilah itulah yang tertulis di perangkat mereka (misalnya "email", "QR"). Apa pun pilihannya, pakai istilah yang sama di seluruh layanan.

**Bahasa inklusif.** Tulis "penyandang disabilitas", bukan "cacat". Tulis "warga lanjut usia". Pakai sebutan netral seperti "petugas" dan "pemohon". Jangan menebak jenis kelamin, agama atau status pernikahan dari nama, dan jangan meminta data itu kecuali layanan memang memerlukannya, dengan alasan yang ditulis di samping kolomnya.

## Contoh baik dan buruk

| Hindari | Tulis | Alasannya |
| --- | --- | --- |
| Submit | Kirim laporan | Menyebut hasil, dalam bahasa Indonesia |
| Terjadi kesalahan. Silakan coba lagi. | Laporan belum terkirim karena koneksi terputus. Isian Anda tersimpan. Coba kirim lagi. | Menyebut apa yang terjadi dan apa yang aman |
| Input NIK tidak valid | NIK harus 16 angka. Anda mengisi 15. | Memberi tahu cara memperbaikinya |
| Data Anda telah berhasil dilakukan penyimpanan | Perubahan tersimpan | Aktif dan ringkas |
| Mohon Untuk Melengkapi Dokumen Persyaratan | Lengkapi dokumen persyaratan | Huruf kapital kalimat, kalimat perintah |
| Biaya: IDR 75,000 | Biaya: Rp 75.000 | Format Indonesia |
| Jadwal: 12/11 jam 8:30 | Jadwal: Kamis, 12 November 2026, 08.30 WIB | Tidak bisa salah dibaca |
| Hubungi OPD terkait | Hubungi organisasi perangkat daerah (OPD) yang menangani izin ini | Singkatan dijelaskan pada kemunculan pertama |
| Klik di sini | Lihat syarat izin usaha | Tautan menyebut tujuannya |

## Aksara Lampung di samping teks

Aksara Lampung (had Lampung) boleh menemani teks sebagai aksen budaya: nama layanan, judul bagian atau satu pita hiasan. Aksara tidak pernah menggantikan teks Latin. Isi, label formulir, tombol, pesan galat dan apa pun yang harus dibaca orang selalu ditulis dalam huruf Latin.

- Letakkan bacaan Latin tepat di sampingnya, atau di `aria-label`. Bila bacaan Latin terlihat di sampingnya, beri aksara `aria-hidden="true"`.
- Cukup satu atau dua kemunculan per halaman.
- Alih aksara otomatis cocok untuk nama dan frasa pendek. Periksakan teks yang akan dicetak atau bersifat resmi kepada penutur atau guru aksara Lampung.

Cara memakainya ada di halaman komponen [Aksara Lampung](../components/aksara.md).
