# Kontribusi

https://lampung.kartadinata.app/docs/guide/kontribusi

LDS adalah proyek open source komunitas. Siapa saja boleh melaporkan masalah, mengusulkan komponen, memperbaiki terjemahan atau mengirim kode. Halaman ini menjelaskan caranya.

## Melaporkan bug atau mengusulkan komponen

Semua laporan dan usulan masuk lewat [isu GitHub](https://github.com/mralifakbar/lampung-design-system/issues). Cari dulu apakah isu yang sama sudah ada; bila ada, tambahkan informasi Anda di sana.

- **Bug.** Tulis apa yang Anda lakukan, apa yang Anda harapkan, dan apa yang terjadi. Sebutkan halaman atau komponen, peramban dan perangkat, tema terang atau gelap, dan lampirkan tangkapan layar bila ada.
- **Masalah aksesibilitas.** Sebutkan alat bantu yang dipakai (misalnya NVDA atau TalkBack) dan bagian yang tidak bisa dipakai. Laporan ini diprioritaskan.
- **Usulan komponen.** Ceritakan kebutuhan nyatanya: layanan apa, siapa penggunanya, dan mengapa komponen yang ada belum cukup. Baca dulu daftar [Komponen](../components/index.md); sering kali kebutuhan itu sudah tercakup.

## Menyiapkan di komputer

Butuh Node 20 atau lebih baru. Python 3 dipakai untuk server lokal, pemeriksa kontras dan build ikon.

```
git clone https://github.com/mralifakbar/lampung-design-system.git
cd lampung-design-system
npm run build    # token, aksara, dokumentasi dan contoh
npm test         # semua pengujian
npm run serve    # http://localhost:5173
```

Buka http://localhost:5173/docs/ dan http://localhost:5173/docs/en/. Periksa setiap halaman yang Anda ubah di tema terang dan gelap, di layar lebar dan di lebar 375 px, dengan tetikus dan dengan papan ketik.

## Aturan commit

Repositori ini memakai [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). Pesan commit ditulis dalam bahasa Inggris dengan bentuk berikut:

```
<type>(<optional scope>): <subject in lowercase imperative, no trailing period, max 72 chars>

<optional body: why, wrapped at 72>

<optional footer: BREAKING CHANGE: ..., Refs: #12>
```

- **Jenis:** `feat`, `fix`, `docs`, `style` (hanya format), `refactor`, `perf`, `test`, `build` (sistem build, berkas hasil build, pemaketan), `ci`, `chore`, `revert`.
- **Cakupan** (pilih area yang disentuh): `tokens`, `css`, `js`, `react`, `icons`, `type`, `aksara`, `docs`, `i18n`, `examples`, `landing`, `cli`, `flutter`, `skills`, `scripts`, `deploy`, `deps`, `release`.
- **Commit kecil, selalu.** Satu perubahan logis per commit: satu perubahan token, satu komponen, satu halaman dokumentasi, satu layar contoh, satu perintah CLI. Commit begitu perubahan itu berhasil di-build dan lolos pemeriksaan; jangan menumpuk pekerjaan sehari dalam satu commit. Bila pesannya butuh kata "and" untuk menjelaskan dua hal yang tidak berhubungan, pecah menjadi dua. Berkas hasil build masuk ke commit yang sama dengan perubahan sumbernya.
- **Perubahan yang merusak kompatibilitas** menambahkan `!` setelah jenis atau cakupan (`feat(tokens)!: rename accent-text`) dan footer `BREAKING CHANGE:`.
- **Jangan pernah meng-commit** rahasia, berkas `.env`, `node_modules`, hasil build di `site/` atau `apps/landing/dist/`, atau `.cache/`.
- `commitlint.config.mjs` memuat aturan ini; `npm run lint:commits` memeriksa cabang Anda.

Contoh pesan commit:

```
feat(css): add masthead
fix(js): return focus to the trigger when a sheet closes
docs(i18n): translate the date field spec to indonesian
build(tokens): regenerate css variables after gold-text change
feat(tokens)!: rename accent-text

BREAKING CHANGE: the accent-text token has a new name; update every use.
```

## Menambah komponen

Sebelum menulis kode, pastikan kebutuhannya belum tercakup dan usulannya sudah dibahas di isu. Lalu:

- Tulis CSS di `css/components.css`. Komponen hanya membaca token, tidak pernah nilai mentah, dan tidak memakai selektor khusus tema.
- Bila butuh perilaku, tambahkan di `js/lds.js` di balik atribut `data-lds-*`, sambungkan di `init()`, dan perbarui `js/lds.d.ts` (serta `react/index.tsx` bila React harus memegang statusnya).
- Tulis spesifikasi dalam bahasa Inggris di `docs/spec/<slug>.mjs` dan terjemahan Indonesianya di `docs/spec/id/<slug>.mjs`. Panduannya ada di `docs/spec/_GUIDE.md`.
- Jalankan `npm run build:docs`. Build menolak nama ikon yang tidak ada, kelas yang tidak ada di CSS, tautan ke spesifikasi yang tidak ada, dan tanda pisah panjang.
- Tambahkan contoh ke `docs/gallery.html`.
- Hitung kontras setiap pasangan warna baru di kedua tema, dan pastikan target sentuh 44 px, cincin fokus dan penggunaan dengan papan ketik.

## Membantu terjemahan

Dokumentasi ditulis dalam bahasa Indonesia lebih dulu, lalu bahasa Inggris. Setiap halaman yang dibaca orang harus ada dalam kedua bahasa. Kode, komentar kode dan pesan commit tetap berbahasa Inggris.

- Panduan seperti halaman ini ada di `docs/guides/`, satu berkas berisi kedua bahasa.
- Spesifikasi komponen berbahasa Inggris ada di `docs/spec/`; terjemahan Indonesianya di `docs/spec/id/`. Saat build, `npm run build:docs` menyebut berapa komponen yang masih berbahasa Inggris di situs Indonesia.
- Ikuti panduan [Penulisan](penulisan.md): bahasa yang lugas, huruf kapital kalimat, tombol yang menyebut hasil, tanpa tanda pisah panjang.
- Teks yang memakai aksara Lampung sebaiknya diperiksa oleh penutur atau guru aksara Lampung. Bantuan dari mereka sangat berharga.

## Kode etik

Proyek ini terbuka untuk siapa saja yang ingin membantu layanan publik menjadi lebih mudah dipakai. Kami berharap setiap peserta:

- Bersikap sopan dan menghargai orang lain, apa pun latar belakang, kemampuan, agama, suku, jenis kelamin atau tingkat pengalamannya.
- Mengkritik gagasan, bukan orangnya, dan menerima masukan dengan lapang.
- Tidak melecehkan, menghina, atau menyebarkan data pribadi orang lain.
- Tidak memakai proyek ini untuk kampanye politik atau mengatasnamakan instansi pemerintah.

Bila Anda mengalami atau melihat perilaku yang melanggar, kirim email ke [alif@kartadinata.app](mailto:alif@kartadinata.app). Tulis apa yang terjadi, kapan dan di mana.

## Kemitraan

Bila tim, kampus, komunitas atau instansi Anda ingin memakai LDS dalam proyek, menguji layanan bersama warga, atau bekerja sama mengembangkan komponen, hubungi [alif@kartadinata.app](mailto:alif@kartadinata.app). LDS tetap proyek komunitas yang tidak resmi; kerja sama tidak menjadikannya produk instansi mana pun.
