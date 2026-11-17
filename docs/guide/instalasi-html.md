# HTML

https://lampung.kartadinata.app/docs/guide/instalasi-html

Menyiapkan Lampung Design System di proyek HTML.

## Proyek baru

Buat proyek HTML baru yang sudah memakai LDS dalam satu langkah:

```
npx lampung-ds@latest init -t html
```

## Proyek yang sudah ada

Jalankan di folder proyek. Perintah ini aman diulang: jalankan dua kali, tidak ada yang berubah lagi.

```
npx lampung-ds@latest init -t html
```

**Yang diubah CLI**

| `lds/css/lds.css` | stylesheet global: impor `lampung-design-system/css` |
| --- | --- |
| `index.html` | elemen `<html>`: kelas `lds`, `lang="id"`, `data-theme` |
| `lds.json` | konfigurasi CLI untuk perintah `add` |

## Pemasangan manual

Lebih suka mengatur sendiri? Ini langkah yang sama dengan yang dijalankan CLI.

**1. Impor CSS**

```
<!-- from a CDN, no install -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lampung-design-system@0/css/lds.css">
```

**2. Tandai elemen root**

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

**3. Nyalakan perilaku interaktif**

```
<script type="module">
  import { init } from 'https://cdn.jsdelivr.net/npm/lampung-design-system@0/js/lds.js';
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
