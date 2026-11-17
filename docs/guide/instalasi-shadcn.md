# shadcn/ui

https://lampung.kartadinata.app/docs/guide/instalasi-shadcn

Sudah memakai shadcn/ui? Pasang tema LDS (warna terang dan gelap, Geist, skala tipe, spasi, radius, bayangan, dan kurva gerak) lewat registry. Bentuk komponen tetap milik shadcn; untuk tampilan dan gerak LDS yang persis, pakai kelas CSS LDS.

## Tambahkan tema ke proyek yang ada

```
npx shadcn@latest add https://lampung.kartadinata.app/r/lds.json
```

## Atau salin manual

```
npm install lampung-design-system

/* or copy the theme by hand */
@import "lampung-design-system/shadcn/globals.css";
```

## Mulai proyek baru dengan preset LDS

```
npx shadcn@latest init --preset https://lampung.kartadinata.app/r/lds.json
```

## Langkah berikutnya

- Baca [semua perintah CLI](cli.md).
- Telusuri [daftar komponen](../components/index.md) sebelum membuat komponen baru.
- Atur [tema dan warna instansi](tema.md).
