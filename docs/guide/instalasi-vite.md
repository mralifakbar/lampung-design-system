# Vite

https://lampung.kartadinata.app/docs/guide/instalasi-vite

Menyiapkan Lampung Design System di proyek Vite.

## Proyek baru

Buat proyek Vite baru yang sudah memakai LDS dalam satu langkah:

```
npx lampung-ds@latest create kota-contoh -t vite
```

## Proyek yang sudah ada

Jalankan di folder proyek. Perintah ini aman diulang: jalankan dua kali, tidak ada yang berubah lagi.

```
npx lampung-ds@latest init
```

**Yang diubah CLI**

| `src/index.css` | stylesheet global: impor `lampung-design-system/css` |
| --- | --- |
| `index.html` | elemen `<html>`: kelas `lds`, `lang="id"`, `data-theme` |
| `src/lds-provider.tsx` | perilaku interaktif: `init()` dan tema tersimpan |
| `lds.json` | konfigurasi CLI untuk perintah `add` |

## Pemasangan manual

Lebih suka mengatur sendiri? Ini langkah yang sama dengan yang dijalankan CLI.

**1. Pasang paketnya**

```
npm install lampung-design-system
```

**2. Impor CSS**

```
/* src/index.css */
@import "lampung-design-system/css";
```

**3. Tandai elemen root**

```
<!-- index.html -->
<html lang="id" class="lds" data-theme="light">
  <body class="lds">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**4. Nyalakan perilaku interaktif**

```
// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { LdsProvider } from './lds-provider';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode><LdsProvider><App /></LdsProvider></StrictMode>,
);
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
