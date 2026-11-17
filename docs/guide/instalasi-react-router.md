# React Router

https://lampung.kartadinata.app/docs/guide/instalasi-react-router

Menyiapkan Lampung Design System di proyek React Router.

## Proyek baru

Buat proyek React Router baru yang sudah memakai LDS dalam satu langkah:

```
npx lampung-ds@latest create kota-contoh -t react-router
```

## Proyek yang sudah ada

Jalankan di folder proyek. Perintah ini aman diulang: jalankan dua kali, tidak ada yang berubah lagi.

```
npx lampung-ds@latest init
```

**Yang diubah CLI**

| `app/app.css` | stylesheet global: impor `lampung-design-system/css` |
| --- | --- |
| `app/root.tsx` | elemen `<html>`: kelas `lds`, `lang="id"`, `data-theme` |
| `app/components/lds-provider.tsx` | perilaku interaktif: `init()` dan tema tersimpan |
| `lds.json` | konfigurasi CLI untuk perintah `add` |

## Pemasangan manual

Lebih suka mengatur sendiri? Ini langkah yang sama dengan yang dijalankan CLI.

**1. Pasang paketnya**

```
npm install lampung-design-system
```

**2. Impor CSS**

```
/* app/app.css */
@import "lampung-design-system/css";
```

**3. Tandai elemen root**

```
// app/root.tsx
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="lds" data-theme="light" suppressHydrationWarning>
      <head><Meta /><Links /></head>
      <body className="lds">
        <LdsProvider>{children}</LdsProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
```

**4. Nyalakan perilaku interaktif**

```
// app/components/lds-provider.tsx
'use client';
import { useEffect } from 'react';
import { init, restoreTheme } from 'lampung-design-system/js';

export function LdsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    restoreTheme(document.documentElement, 'light');
    init();
  }, []);
  return <>{children}</>;
}
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
