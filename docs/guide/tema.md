# Tema dan warna

https://lampung.kartadinata.app/docs/guide/tema

Mode terang dan gelap, preset aksen dengan cerita lokal, dan cara memakai warna instansi sendiri tanpa merusak kontras.

## Terang, gelap, dan ikut sistem

Satu atribut mengatur semuanya: `data-theme="light"`, `"dark"`, atau `"system"` pada `<html>` atau elemen mana pun. Komponen hanya membaca token, jadi ikut berganti sendiri. Panggil `restoreTheme()` sebelum halaman tergambar agar pilihan tersimpan dipakai tanpa kedipan; tombol dengan `data-lds-theme` mengganti tema setelah `init()`. Rincian ada di [Theming](../components/theming.md).

```
<html lang="id" class="lds" data-theme="light">
<script type="module">
  import { init, restoreTheme, setTheme } from 'lampung-design-system/js';
  restoreTheme(document.documentElement, 'light');
  init();
  // setTheme('dark') dari pengaturan Anda
</script>
```

## Preset aksen

Hijau Lampung adalah aksen bawaan. Bila layanan Anda butuh nuansa lain, LDS menyediakan dua preset dengan cerita lokal. Pasang `data-accent` pada `<html>` atau satu bagian halaman; hanya peran aksen yang berubah (tombol utama, pilihan, tautan, focus ring, seri grafik pertama), di tema terang maupun gelap, dan setiap pasangan warnanya diuji kontrasnya.

| Preset | Atribut | Cerita |
| --- | --- | --- |
| Hijau Lampung | `(tanpa atribut)` | Hijau pada lambang daerah. Bawaan. |
| Biru Teluk | `data-accent="teluk"` | Air Teluk Lampung di depan Bandar Lampung. |
| Cokelat Kopi | `data-accent="kopi"` | Kopi robusta Lampung, disangrai gelap. |

Permohonan izin usahaDiproses

Berkas Anda sedang diperiksa petugas. Perkiraan selesai 3 hari kerja.

[Hubungi petugas](#tema-stage)

## Warna instansi sendiri

Instansi yang punya warna identitas sendiri cukup menimpa peran aksen setelah `lds.css`. Jangan ubah token lain: netral, status, dan emas sudah diseimbangkan. Hitung kontras setiap pasangan di kedua tema; teks putih di atas aksen dan `--accent-text` di atas kanvas harus minimal 4,5:1.

```
/* Your agency's accent, in both themes. Check every pair before shipping:
   python3 skills/antislop-human/contrast-check.py "#FFFFFF" "#1F5E3A" */
:root,
[data-theme="light"] {
  --accent: #1F5E3A;
  --accent-hover: #1A5233;
  --accent-pressed: #15452B;
  --accent-text: #1A5233;
  --accent-tint: #E9F2EC;
  --accent-tint-strong: #D3E5D9;
  --accent-ring: rgba(31, 94, 58, 0.24);
  --focus: #1F5E3A;
}
[data-theme="dark"] {
  --accent: #27744A;
  --accent-hover: #2B7C50;
  --accent-pressed: #1F5E3A;
  --accent-text: #8FD3AC;
  --accent-tint: rgba(80, 180, 120, 0.15);
  --accent-tint-strong: rgba(80, 180, 120, 0.25);
  --accent-ring: rgba(143, 211, 172, 0.35);
  --focus: #8FD3AC;
}
```

Di Flutter, berikan warna lewat `LdsColors.copyWith`:

```
MaterialApp(
  theme: LdsTheme.build(Brightness.light,
      colors: LdsColors.light.copyWith(accent: const Color(0xFF0B5CAD), accentText: const Color(0xFF0A4F96))),
  darkTheme: LdsTheme.build(Brightness.dark,
      colors: LdsColors.dark.copyWith(accent: const Color(0xFF1767C0), accentText: const Color(0xFF84B8F2))),
);
```

## Emas siger

Emas (`--gold`, `--gold-text`, `--gold-tint`) tetap sama di semua preset karena ia identitas, bukan aksi. Pakai untuk band aksara, badge identitas (`badge--gold`), dan sorotan kecil. Jangan untuk tombol, tautan, atau status terpilih.

## Yang tidak boleh

- Memakai lambang daerah atau logo instansi pada situs yang tidak dikelola instansi tersebut.
- Mengganti warna status (berhasil, peringatan, bahaya) agar cocok dengan aksen: warna status punya arti sendiri.
- Menulis selektor khusus mode gelap di CSS proyek. Pakai token, maka mode gelap ikut sendiri.
