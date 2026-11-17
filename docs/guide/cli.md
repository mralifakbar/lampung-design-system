# CLI

https://lampung.kartadinata.app/docs/guide/cli

`lampung-ds` menyiapkan Lampung Design System di proyek Anda. Pilih framework, lalu CLI memasang paket `lampung-design-system`, mengimpor stylesheet, menambahkan `class="lds"` dan `data-theme` di `<html>`, menyambungkan perilaku, dan menyalin markup komponen bila diminta.

Lampung Design System adalah proyek komunitas yang tidak resmi. Proyek ini tidak dibuat, didukung, atau dikelola oleh Pemerintah Provinsi Lampung maupun instansi mana pun.

Butuh Node.js 20 atau lebih baru. CLI tidak punya dependensi lain.

## Mulai cepat

```
# Di proyek yang sudah ada
npx lampung-ds@latest init

# Proyek baru dengan pembuat resmi framework
npx lampung-ds@latest create layanan-kota -t next

# Salin komponen
npx lampung-ds@latest add button text-field
```

## Daftar perintah

| Perintah | Fungsi |
| --- | --- |
| `init` | Memasang LDS di proyek yang sudah ada. |
| `create <nama> -t <template>` | Membuat proyek baru dengan pembuat resmi framework, lalu menjalankan `init`. |
| `add <komponen...>` | Menyalin markup komponen ke proyek. |
| `list` | Menampilkan semua komponen per kelompok. |
| `doctor` | Memeriksa pemasangan. Keluar dengan kode 1 bila ada yang gagal. |
| `--help`, `--version` | Bantuan dan versi. |

## init

```
lampung-ds init [-t <template>] [--cwd <dir>] [-y] [--theme light|dark|system]
                [--pm npm|pnpm|yarn|bun] [--no-install] [--shadcn] [--dry-run]
```

CLI mengenali framework dari berkas proyek: dependensi di `package.json`, konfigurasi Vite, Astro atau React Router, `@tanstack/react-start`, `composer.json` berisi `laravel/framework`, atau `pubspec.yaml`. Bila tidak bisa dikenali, CLI bertanya lewat daftar pilihan (pilih dengan tombol panah). Dengan `-y`, CLI berhenti dan meminta `-t`.

Setiap perubahan aman diulang: jalankan `init` dua kali, jalankan yang kedua tidak mengubah apa pun. Setiap kali selesai, CLI menampilkan berkas yang dibuat (`+`) dan diubah (`~`). Dengan `--dry-run`, CLI hanya menampilkan rencana.

| Opsi | Fungsi |
| --- | --- |
| `-t`, `--template` | `next`, `vite`, `start`, `react-router`, `astro`, `laravel`, `html`, `flutter`. |
| `--cwd` | Folder proyek. Bawaan: folder saat ini. |
| `-y`, `--yes` | Pakai nilai bawaan tanpa bertanya. |
| `--theme` | Tema awal di `data-theme`: `light` (bawaan), `dark` atau `system`. |
| `--pm` | Package manager. Bawaan: dari lockfile, lalu kolom `packageManager`, lalu npm. |
| `--no-install` | Lewati pemasangan paket. |
| `--shadcn` | Tulis juga tema shadcn/ui LDS ke CSS global. |
| `--dry-run` | Tampilkan rencana tanpa mengubah berkas. |

Yang diubah per framework

| Template | Stylesheet | Class di <html> | Perilaku |
| --- | --- | --- | --- |
| `next` | Baris pertama `app/globals.css` (atau impor di `app/layout`) | `app/layout`, ditambah `suppressHydrationWarning` | `components/lds-provider` (client component) dipasang di layout. Pages router: `pages/_app` dan `pages/_document` |
| `vite` | Baris pertama `src/index.css` (atau impor di `src/main`) | `index.html`, ditambah skrip kecil yang memasang tema tersimpan sebelum halaman tampil | `src/components/lds-provider` di samping `<App />` |
| `react-router` | `app/app.css` | `app/root` (`Layout`) | `app/components/lds-provider` di dalam `<body>` |
| `start` | `src/styles.css` | `src/routes/__root` | `src/components/lds-provider` di dalam `<body>` |
| `astro` | `src/styles/global.css`, atau impor di frontmatter layout | Layout pertama yang memuat `<html>` | `<script>` di layout, dijalankan lagi saat `astro:page-load` |
| `laravel` | `resources/css/app.css` | Layout Blade utama, ditambah `@vite` bila belum ada | `resources/js/app.js` |
| `html` | Menyalin `css/`, `js/`, `fonts/` dan `aksara/` ke `./lds/` | `index.html` (dibuat bila belum ada) | Skrip modul di `index.html` |
| `flutter` | `flutter pub add lampung_design_system` | Tidak ada | `LdsTheme.light()` dan `LdsTheme.dark()` di `lib/main.dart` bawaan |

Proyek TypeScript mendapat berkas `.tsx`, proyek JavaScript mendapat `.jsx`. Komponen `LdsProvider` memanggil `restoreTheme()` dan `init()` dari `lampung-design-system/js` di browser, lalu memanggil `init()` lagi saat markup baru muncul.

```
// app/layout.tsx setelah init
<html lang="id" className="lds" data-theme="light" suppressHydrationWarning>
  <body>
    <LdsProvider theme="light" />
    {children}
  </body>
</html>
```

Binding React di `lampung-design-system/react` sudah dikompilasi ke JavaScript, jadi Next.js memakainya tanpa pengaturan tambahan.

HTML biasa

Template `html` menyalin berkas dari paket yang terpasang. Bila paketnya tidak ada, CLI mengunduhnya dari jsDelivr (`https://cdn.jsdelivr.net/npm/lampung-design-system@<versi>/`). Bila belum ada `index.html`, CLI membuat halaman awal yang siap dibuka.

Flutter

CLI menjalankan `flutter pub add lampung_design_system`. Bila `lib/main.dart` masih template bawaan, `ThemeData` diganti dengan tema LDS. Bila tidak, CLI menampilkan potongan kode berikut untuk Anda tempel:

```
import 'package:lampung_design_system/lampung_design_system.dart';

MaterialApp(
  theme: LdsTheme.light(),
  darkTheme: LdsTheme.dark(),
  themeMode: ThemeMode.light,
);
```

Font Geist dan font ikon didaftarkan di `pubspec.yaml`. Lihat panduan instalasi Flutter.

shadcn/ui

`--shadcn` menggabungkan `dist/shadcn/globals.css` dari paket yang terpasang ke CSS global: impor diletakkan di atas, sisanya di antara penanda `lds-shadcn:start` dan `lds-shadcn:end`. Jalankan lagi untuk memperbarui tema di tempat yang sama.

## create

```
lampung-ds create <nama> -t <template> [--pm <nama>] [--theme <mode>] [--no-install] [--shadcn] [--dry-run]
```

Menjalankan pembuat resmi framework, lalu `init` di folder baru. Dengan `--dry-run`, CLI hanya menampilkan perintahnya.

| Template | Pembuat |
| --- | --- |
| `next` | `npm create next-app@latest <nama> -- --yes --use-npm` |
| `vite` | `npm create vite@latest <nama> -- --template react-ts` |
| `react-router` | `npm create react-router@latest <nama> -- --yes` |
| `start` | `npx @tanstack/cli@latest create <nama>` |
| `astro` | `npm create astro@latest <nama> -- --template basics --yes` |
| `laravel` | `laravel new <nama>` bila Laravel installer ada, bila tidak `composer create-project laravel/laravel <nama>` |
| `flutter` | `flutter create --project-name <nama_snake_case> <nama>` |
| `html` | Folder baru |

Dengan `--pm pnpm`, `yarn` atau `bun`, pembuat yang sama dijalankan lewat `pnpm create`, `yarn create` atau `bun create`.

## add

```
lampung-ds add <komponen...> [--all] [--overwrite] [--dry-run] [--cwd <dir>]
```

Menyalin markup komponen dari registry ke proyek. Berkas yang sudah ada dilewati, kecuali dengan `--overwrite`. Bahasa teks contoh mengikuti `lang` di `lds.json`.

| Framework | Hasil |
| --- | --- |
| React (`next`, `vite`, `start`, `react-router`) | `<componentsDir>/<slug>.tsx` (atau `.jsx`), satu komponen per contoh. HTML diubah menjadi JSX yang valid: `className`, `htmlFor`, atribut camelCase, angka sebagai angka, style sebagai objek, elemen void ditutup sendiri, state formulir tanpa kontrol (`defaultValue`, `defaultChecked`), handler `on*` dihapus. Komponen yang punya binding React diberi catatan di awal berkas. |
| `astro` | `<componentsDir>/<slug>/<Nama>.astro`, satu per contoh |
| `laravel` | `resources/views/components/lds/<slug>/<contoh>.blade.php`, dipakai sebagai `<x-lds.button.variants />` |
| `html` | `<snippetsDir>/<slug>.html` berisi semua contoh |
| `flutter` | Tidak ada yang disalin. Pakai widget dari paket Flutter. |

Registry dibaca dari paket yang terpasang (`node_modules/lampung-design-system/dist/registry`), lalu dari `https://lampung.kartadinata.app/r/<slug>.json`.

```
// src/components/lds/button.tsx (potongan)
export function ButtonVariants() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px" }}>
      <button className="btn btn--primary">Simpan perubahan</button>
      <button className="btn btn--secondary">Pratinjau</button>
    </div>
  );
}
```

## lds.json

`init` menulis berkas ini di akar proyek, `add` membacanya. Anda boleh mengubahnya: `init` berikutnya mempertahankan nilai Anda.

```
{
  "framework": "vite",
  "typescript": true,
  "css": "src/index.css",
  "componentsDir": "src/components/lds",
  "snippetsDir": "lds/snippets",
  "theme": "light",
  "lang": "id"
}
```

| Kunci | Arti |
| --- | --- |
| `framework` | Salah satu template. Lebih diutamakan daripada deteksi. |
| `typescript` | `add` menulis `.tsx` bila true dan `.jsx` bila false (khusus React). |
| `css` | Stylesheet global atau berkas entri yang mengimpor LDS. Dipakai `doctor`. |
| `componentsDir` | Folder komponen React, Astro dan Blade. `null` untuk HTML dan Flutter. |
| `snippetsDir` | Folder potongan HTML. |
| `theme` | `light`, `dark` atau `system`: nilai awal `data-theme` dan cadangan untuk `restoreTheme()`. |
| `lang` | `id` atau `en`: bahasa teks contoh yang ditulis `add`. |

## list dan doctor

`lampung-ds list` menampilkan semua komponen per kelompok. `lampung-ds doctor` memeriksa versi Node.js, `lds.json`, dependensi dan versi yang terpasang, impor stylesheet, class di `<html>`, dan sambungan perilaku.

```
lampung-ds doctor
  ok   lampung-design-system 0.1.0 terpasang
  ok   Stylesheet diimpor di src/index.css
  ok   class="lds" di <html> pada index.html
Semua beres.
```

## Bahasa dan variabel lingkungan

Keluaran CLI berbahasa Inggris secara bawaan, dan berbahasa Indonesia dengan `--lang id`, `LDS_LANG=id`, atau locale sistem yang diawali `id` (misalnya `LANG=id_ID.UTF-8`).

| Variabel | Fungsi |
| --- | --- |
| `LDS_LANG` | `id` atau `en` |
| `LDS_REGISTRY` | Folder atau URL yang berisi `index.json` dan `<slug>.json` |
| `LDS_PACKAGE_DIR` | Pakai folder ini sebagai paket inti yang terpasang |
| `LDS_OFFLINE` | Jangan mengambil registry dari internet |
| `NO_COLOR` | Keluaran tanpa warna |
