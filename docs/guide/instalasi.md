# Instalasi

https://lampung.kartadinata.app/docs/guide/instalasi

Pilih framework yang Anda pakai. CLI `lampung-ds` menyiapkan semuanya: memasang paket, mengimpor CSS, memberi kelas `lds` pada `<html>`, dan menyalakan perilaku interaktif.

## Pilih framework

Setiap halaman berisi tiga jalur: proyek baru, proyek yang sudah ada, dan pemasangan manual.

- [Next.js](instalasi-next.md): `-t next`

- [Vite](instalasi-vite.md): `-t vite`

- [TanStack Start](instalasi-start.md): `-t start`

- [React Router](instalasi-react-router.md): `-t react-router`

- [Astro](instalasi-astro.md): `-t astro`

- [Laravel](instalasi-laravel.md): `-t laravel`

- [HTML](instalasi-html.md): CDN atau berkas statis

- [Flutter](instalasi-flutter.md): `-t flutter`

- [shadcn/ui](instalasi-shadcn.md): Tema untuk proyek shadcn/ui

## Cara tercepat

Di folder proyek yang sudah ada, jalankan perintah ini. CLI mengenali framework Anda dari berkas proyek, atau menanyakannya bila belum yakin.

```
npx lampung-ds@latest init
```

## Tanpa instalasi

Untuk prototipe atau halaman statis, muat langsung dari CDN:

```
<!doctype html>
<html lang="id" class="lds" data-theme="light">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lampung-design-system@0/css/lds.css">
</head>
<body class="lds">
  <button class="btn btn--primary">Kirim laporan</button>
</body>
</html>
```

```
<script type="module">
  import { init } from 'https://cdn.jsdelivr.net/npm/lampung-design-system@0/js/lds.js';
  init();
</script>
```

## Prasyarat

- Node.js 20 atau lebih baru untuk proyek web.
- Flutter 3.27 atau lebih baru untuk aplikasi Flutter.
- Terminal yang terbuka di folder proyek (folder yang berisi `package.json`, `composer.json`, atau `pubspec.yaml`).
