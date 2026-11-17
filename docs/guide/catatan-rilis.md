# Catatan rilis

https://lampung.kartadinata.app/docs/guide/catatan-rilis

Apa yang baru di setiap versi Lampung Design System.

## 0.1.0

16 November 2026. Rilis publik pertama.

- Token dalam satu berkas untuk CSS, JS/TS, shadcn/ui, dan Flutter: aksen hijau Lampung, emas siger untuk identitas, Geist dan Geist Mono, tema terang dan gelap dengan kontras WCAG 2.2 AA.
- Preset aksen Biru Teluk dan Cokelat Kopi lewat `data-accent`.
- 179 komponen dan resep, masing-masing dengan dokumentasi bahasa Indonesia dan Inggris.
- Aksara Lampung: glyph orisinal, transliterasi Latin, `[data-lds-aksara]`, dan `.aksara-band`.
- Komponen masthead untuk menyatakan status resmi atau tidak resmi sebuah situs layanan publik.
- Logo siger (`brand/`): siger dengan tujuh lekuk berbentuk lidah api yang melengkung ke tengah di atas dasar melengkung, putih di atas ubin hijau Lampung, dipakai sebagai logo dan favicon.
- 53 ikon untuk layanan publik dan kota cerdas.
- CLI `lampung-ds`: `init`, `create`, `add`, `list`, `doctor` untuk Next.js, Vite, TanStack Start, React Router, Astro, Laravel, HTML, dan Flutter.
- Binding React (`lampung-design-system/react`) dikompilasi ke ESM beserta deklarasi tipe, jadi Next.js dan framework React lain bisa langsung mengimpornya tanpa pengaturan tambahan.
- Paket Flutter `lampung_design_system`: tema, token, widget, dan aksara.
- Contoh: dasbor operasional kota, aplikasi warga, dan portal layanan publik.

## Versi dan kompatibilitas

LDS memakai Semantic Versioning. Paket inti, CLI, dan paket Flutter berbagi satu nomor versi. Perubahan yang memutus kompatibilitas hanya terjadi di versi mayor dan selalu ditulis di bagian **BREAKING CHANGE**. Riwayat lengkap ada di [CHANGELOG.md](https://github.com/mralifakbar/lampung-design-system/blob/main/CHANGELOG.md).
