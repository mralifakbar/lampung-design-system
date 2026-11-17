# Aksesibilitas

https://lampung.kartadinata.app/docs/guide/aksesibilitas

Layanan publik harus bisa dipakai setiap warga, termasuk penyandang disabilitas dan orang yang memakai ponsel lama atau layar kecil. LDS menanggung sebagian pekerjaannya; sisanya tanggung jawab tim yang membangun layanan.

## Yang sudah dijamin LDS

Bila Anda memakai token dan komponen sebagaimana tertulis di dokumentasi, hal berikut sudah ditangani:

- **Kontras WCAG 2.2 AA.** Setiap pasangan warna teks dan latar di token dihitung, bukan ditebak, untuk tema terang dan gelap: teks biasa minimal 4,5:1, teks besar dan tepi kontrol minimal 3:1. Rasio tiap token tercantum di referensi token. Contoh: teks putih di atas hijau aksen 6,25:1 di tema terang.
- **Target sentuh 44 px.** Tombol, kolom isian dan tombol ikon punya area sentuh minimal 44 x 44 px, meskipun gambarnya lebih kecil.
- **Cincin fokus.** Setiap elemen interaktif menampilkan cincin fokus 2 px dengan jarak 2 px saat dipakai dengan papan ketik (`:focus-visible`).
- **Papan ketik.** Komponen dibangun dari `<button>`, `<a href>` dan `<input>` asli. Lapisan seperti dialog, menu dan sheet ditutup dengan Escape lalu fokus kembali ke pemicunya.
- **Gerak dikurangi.** Bila perangkat meminta gerak dikurangi (`prefers-reduced-motion`), transisi berubah menjadi pudar singkat dan animasi hiasan hanya berjalan sekali.
- **Warna paksa.** Cincin fokus memakai outline asli yang tetap terlihat di mode warna paksa (kontras tinggi Windows), dan pita aksara dekoratif disembunyikan.
- **HTML semantik.** Contoh markup memakai elemen dan atribut ARIA yang tepat. Status tidak pernah disampaikan dengan warna saja; selalu ada ikon dan kata.

Jaminan ini hanya berlaku bila komponen dipakai apa adanya Mengganti warna dengan nilai mentah, menghapus outline atau membuat tombol dari `<div>` membatalkannya.

## Yang tetap menjadi tugas tim

Sistem desain tidak tahu isi layanan Anda. Bagian ini harus dikerjakan di setiap proyek:

- **Teks alternatif.** Setiap gambar yang membawa informasi diberi `alt` yang menyebut isinya ("Peta lokasi banjir di Kecamatan Contoh"). Gambar hiasan diberi `alt=""`.
- **Label.** Setiap kolom isian punya `<label>` yang terlihat. Placeholder bukan label. Tombol ikon diberi `aria-label`.
- **Teks untuk video dan audio.** Video diberi takarir; rekaman suara diberi transkrip.
- **Atribut bahasa.** Pasang `lang="id"` di elemen `<html>`, dan `lang="en"` pada bagian berbahasa Inggris, agar pembaca layar mengucapkannya dengan benar.
- **Urutan dan judul.** Satu `<h1>` per halaman, judul berurutan tanpa melompat, dan urutan Tab mengikuti urutan visual.
- **Batas waktu.** Bila sesi atau formulir punya batas waktu, beri tahu sebelumnya dan sediakan cara memperpanjangnya.
- **Pasangan warna baru.** Warna yang Anda tambahkan sendiri harus dihitung kontrasnya di kedua tema.

## Daftar periksa

| Periksa | Caranya | Siapa |
| --- | --- | --- |
| Kontras teks dan kontrol | Hitung dengan skrip kontras untuk setiap pasangan baru, di tema terang dan gelap | LDS untuk token, tim untuk warna tambahan |
| Target sentuh | Setiap target minimal 44 x 44 px dengan jarak di antaranya | LDS, tim bila membuat kontrol sendiri |
| Papan ketik | Pakai seluruh alur hanya dengan Tab, Shift+Tab, Enter, Spasi dan Escape | Tim |
| Fokus terlihat | Cincin fokus muncul di setiap kontrol, di kedua tema | LDS |
| Teks alternatif | Setiap gambar informatif punya `alt` yang bermakna | Tim |
| Label formulir | Setiap kolom punya label terlihat; galat ditautkan dengan `aria-describedby` | Tim |
| Takarir dan transkrip | Setiap video dan audio | Tim |
| Bahasa halaman | `lang` terpasang dan benar | Tim |
| Pembaca layar | Uji alur utama dengan NVDA, TalkBack dan VoiceOver | Tim |
| Zoom 200% | Tidak ada teks terpotong atau bergulir mendatar | Tim |
| Lebar 320 px | Tata letak mengalir tanpa gulir mendatar | Tim |
| Gerak dikurangi | Aktifkan setelan gerak dikurangi di perangkat, lalu ulangi alurnya | LDS, tim untuk animasi sendiri |

## Memeriksa kontras

Jangan menilai kontras dengan mata, terutama untuk abu-abu di atas abu-abu. Repositori ini menyertakan skrip pemeriksa. Jalankan dari akar repositori dengan dua warna hex, teks lalu latar:

```
python3 skills/antislop-human/contrast-check.py "#FFFFFF" "#0B6E4F"
ratio: 6.25:1
normal text (4.5:1): PASS
large text  (3.0:1): PASS
```

Ulangi untuk nilai tema gelap dari [tokens/tokens.json](../../tokens/tokens.json). Teks biasa butuh 4,5:1; teks besar (18 px ke atas, atau 14 px tebal) dan tepi kontrol butuh 3:1. Bila pasangan gagal, pakai token teks yang sudah lolos, misalnya `--gold-text` alih-alih `--gold` untuk teks emas.

## Menguji dengan pembaca layar dan zoom

Pemeriksaan otomatis hanya menangkap sebagian masalah. Uji alur utama layanan (misalnya mengajukan permohonan dari awal sampai bukti terkirim) dengan cara orang benar-benar memakainya:

- **NVDA** di Windows dengan Firefox atau Chrome.
- **TalkBack** di Android dengan Chrome. Banyak warga mengakses layanan dari ponsel Android, jadi jangan lewatkan ini.
- **VoiceOver** di iPhone dengan Safari, dan di Mac bila tersedia.
- **Zoom 200%** di peramban desktop: semua teks terbaca, tidak ada yang terpotong, tidak ada gulir mendatar.
- **Lebar 320 px** (atau zoom 400% di layar 1280 px): tata letak tetap satu kolom yang utuh.

Dengarkan apakah setiap kontrol menyebut nama, peran dan statusnya, apakah pesan galat dibacakan, dan apakah fokus berpindah ke tempat yang masuk akal setelah dialog ditutup. Bila memungkinkan, ajak penyandang disabilitas mencoba layanan Anda; pengalaman mereka tidak tergantikan oleh daftar periksa.

## Catatan tentang regulasi

Peraturan perundang-undangan Indonesia, antara lain Undang-Undang Nomor 25 Tahun 2009 tentang Pelayanan Publik dan Undang-Undang Nomor 8 Tahun 2016 tentang Penyandang Disabilitas, menegaskan bahwa layanan publik harus dapat diakses oleh semua warga, termasuk penyandang disabilitas. Aturan turunannya dan kebijakan di tiap daerah dapat berubah.

Panduan ini bukan nasihat hukum. Mengikuti LDS dan WCAG 2.2 AA adalah titik awal yang baik, tetapi periksalah kewajiban yang berlaku untuk layanan Anda bersama bagian hukum atau unit yang berwenang di instansi Anda.
