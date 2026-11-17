# Laravel

https://lampung.kartadinata.app/docs/guide/instalasi-laravel

Menyiapkan Lampung Design System di proyek Laravel.

## Proyek baru

Buat aplikasinya dulu dengan pembuat resmi framework:

```
laravel new kota-contoh
cd kota-contoh
```

```
npx lampung-ds@latest init -t laravel
```

## Proyek yang sudah ada

Jalankan di folder proyek. Perintah ini aman diulang: jalankan dua kali, tidak ada yang berubah lagi.

```
npx lampung-ds@latest init
```

**Yang diubah CLI**

| `resources/css/app.css` | stylesheet global: impor `lampung-design-system/css` |
| --- | --- |
| `resources/views/layouts/app.blade.php` | elemen `<html>`: kelas `lds`, `lang="id"`, `data-theme` |
| `resources/js/app.js` | perilaku interaktif: `init()` dan tema tersimpan |
| `lds.json` | konfigurasi CLI untuk perintah `add` |

## Pemasangan manual

Lebih suka mengatur sendiri? Ini langkah yang sama dengan yang dijalankan CLI.

**1. Pasang paketnya**

```
npm install lampung-design-system
```

**2. Impor CSS**

```
/* resources/css/app.css */
@import "lampung-design-system/css";
```

**3. Tandai elemen root**

```
{{-- resources/views/layouts/app.blade.php --}}
<html lang="id" class="lds" data-theme="light">
<head>
  @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="lds">
  @yield('content')
</body>
</html>
```

**4. Nyalakan perilaku interaktif**

```
// resources/js/app.js
import { init, restoreTheme } from 'lampung-design-system/js';
restoreTheme(document.documentElement, 'light');
init();
```

## Komponen pertama

Tambahkan komponen ke proyek Anda. CLI menyalin markup yang sudah teruji ke folder komponen Anda, siap diubah.

```
npx lampung-ds@latest add button text-field alert
```

## Langkah berikutnya

- Baca [semua perintah CLI](cli.md).
- Telusuri [daftar komponen](../components/index.md) sebelum membuat komponen baru.
- Atur [tema dan warna instansi](tema.md).
