# Pengenalan

https://lampung.kartadinata.app/docs/

Lampung Design System (LDS) adalah design system terbuka untuk membangun situs dan aplikasi layanan publik dengan cepat dan tampilan yang konsisten. Satu berkas token untuk CSS, JavaScript, shadcn/ui, dan Flutter; komponen berupa kelas CSS biasa; perilaku interaktif dalam satu modul JavaScript opsional.

Proyek komunitas, bukan produk resmi

LDS dibuat dan dirawat komunitas open source. Tidak ada instansi pemerintah yang mengelola atau mendukungnya secara resmi. Warna hijau dan emasnya terinspirasi dari lambang daerah dan siger, bukan atribut resmi.

## Untuk siapa

- **Pemerintah daerah dan perangkat daerah** yang perlu meluncurkan layanan digital tanpa merancang ulang tombol dan formulir setiap kali.
- **Pengembang** yang ingin mulai dari komponen teruji dengan satu perintah, apa pun framework-nya.
- **Desainer** yang butuh token, tipografi, dan pola halaman yang sudah lolos uji kontras.
- **UMKM, komunitas, dan siapa pun** yang membangun untuk warga Lampung dan sekitarnya.

## Mulai dalam satu perintah

```
npx lampung-ds@latest init
```

CLI mengenali Next.js, Vite, TanStack Start, React Router, Astro, Laravel, HTML biasa, dan Flutter. Panduan lengkap per framework ada di [Instalasi](guide/instalasi.md); semua perintah ada di [CLI](guide/cli.md).

## Isi paket

- `tokens/tokens.json`: satu sumber untuk warna (terang dan gelap), tipe, spasi, radius, kedalaman, dan gerak.
- `css/lds.css`: token dan semua komponen. Terang secara bawaan; `data-theme="dark"` atau `"system"` pada elemen mana pun mengubahnya.
- `js/lds.js`: perilaku opsional lewat atribut `data-lds-*`: lapisan, sheet dengan momentum, menu, toast, stepper, OTP, tabel data, kanban, kalender, peta, grafik, dan aksara Lampung.
- `react/`, `dist/shadcn/`, paket Flutter `lampung_design_system`, dan CLI `lampung-ds`.
- [179 komponen dan resep](components/index.md), masing-masing dengan cara pakai, contoh langsung, kode, gerak, dan aksesibilitas.
- [Contoh](examples/index.md) layanan kota yang dibangun hanya dari sistem ini: dasbor operasional, aplikasi warga, dan portal layanan publik.

## Aturan yang menjaga tampilannya

- Kanvas putih. Kelompokkan dengan `--bg-fill`, bukan bayangan. Bayangan hanya untuk yang melayang.
- Satu aksen hijau Lampung untuk aksi utama, pilihan, dan tautan. Emas siger hanya untuk identitas dan ornamen.
- Aksara Lampung sebagai aksen yang tenang, selalu dengan bacaan Latin.
- Tipe bergerak sebagai satu set: ukuran, ketebalan, dan jarak huruf berubah bersama.
- Masuk dengan spring, keluar lebih cepat, dan selalu mulai dari posisi elemen saat itu.
- Setiap elemen interaktif minimal 44 × 44, bisa dijangkau keyboard, dengan focus ring yang terlihat.

## Panduan

- [Instalasi](guide/instalasi.md): Pilih framework yang Anda pakai. CLI lampung-ds menyiapkan semuanya: memasang paket, mengimpor CSS, memberi kelas lds pada <html>, dan

- [CLI](guide/cli.md): lampung-ds menyiapkan Lampung Design System di proyek Anda. Pilih framework, lalu CLI memasang paket lampung-design-system, mengimpor styles

- [Tema dan warna](guide/tema.md): Mode terang dan gelap, preset aksen dengan cerita lokal, dan cara memakai warna instansi sendiri tanpa merusak kontras.

- [Penulisan](guide/penulisan.md): Cara menulis teks antarmuka untuk layanan publik dalam bahasa Indonesia: jelas bagi setiap warga, sopan tanpa berbelit, dan selalu memberi t

- [Aksesibilitas](guide/aksesibilitas.md): Layanan publik harus bisa dipakai setiap warga, termasuk penyandang disabilitas dan orang yang memakai ponsel lama atau layar kecil. LDS men

- [Untuk desainer](guide/desainer.md): Tempat sumber desain LDS, font yang perlu dipasang, tujuh keputusan yang membentuk tampilannya, dan cara menyerahkan desain ke developer tan

- [Kontribusi](guide/kontribusi.md): LDS adalah proyek open source komunitas. Siapa saja boleh melaporkan masalah, mengusulkan komponen, memperbaiki terjemahan atau mengirim kod

- [Catatan rilis](guide/catatan-rilis.md): Apa yang baru di setiap versi Lampung Design System.
