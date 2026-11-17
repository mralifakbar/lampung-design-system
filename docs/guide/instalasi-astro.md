# Astro

https://lampung.kartadinata.app/docs/guide/instalasi-astro

Menyiapkan Lampung Design System di proyek Astro.

## Proyek baru

Buat proyek Astro baru yang sudah memakai LDS dalam satu langkah:

```
npx lampung-ds@latest create kota-contoh -t astro
```

## Proyek yang sudah ada

Jalankan di folder proyek. Perintah ini aman diulang: jalankan dua kali, tidak ada yang berubah lagi.

```
npx lampung-ds@latest init
```

**Yang diubah CLI**

| `src/styles/global.css` | stylesheet global: impor `lampung-design-system/css` |
| --- | --- |
| `src/layouts/Layout.astro` | elemen `<html>`: kelas `lds`, `lang="id"`, `data-theme` |
| `lds.json` | konfigurasi CLI untuk perintah `add` |

## Pemasangan manual

Lebih suka mengatur sendiri? Ini langkah yang sama dengan yang dijalankan CLI.

**1. Pasang paketnya**

```
npm install lampung-design-system
```

**2. Impor CSS**

```
/* src/styles/global.css */
@import "lampung-design-system/css";
```

**3. Tandai elemen root**

```
---
// src/layouts/Layout.astro
import '../styles/global.css';
---
<html lang="id" class="lds" data-theme="light">
  <body class="lds">
    <slot />
  </body>
</html>
```

**4. Nyalakan perilaku interaktif**

```
<!-- at the end of src/layouts/Layout.astro -->
<script>
  import { init, restoreTheme } from 'lampung-design-system/js';
  restoreTheme(document.documentElement, 'light');
  init();
</script>
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
