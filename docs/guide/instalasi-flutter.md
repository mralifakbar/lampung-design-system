# Flutter

https://lampung.kartadinata.app/docs/guide/instalasi-flutter

Menyiapkan Lampung Design System di proyek Flutter.

## Tambahkan paket

```
flutter pub add lampung_design_system material_ui
```

Atau biarkan CLI yang menambahkan paket dan memasang tema di `lib/main.dart`:

```
npx lampung-ds@latest init -t flutter
```

## Pakai tema dan widget

```
// lib/main.dart
import 'package:material_ui/material_ui.dart';
import 'package:lampung_design_system/lampung_design_system.dart';

void main() => runApp(const KotaApp());

class KotaApp extends StatelessWidget {
  const KotaApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: LdsTheme.light(),
      darkTheme: LdsTheme.dark(),
      home: Scaffold(
        body: Center(
          child: LdsButton(label: 'Kirim laporan', onPressed: () {}),
        ),
      ),
    );
  }
}
```

## Widget lain

```
LdsAksara('Lampung')        // aksara Lampung, drawn from the same glyphs
LdsMasthead()                // "not an official government site" strip
```

Paket membawa font Geist, Geist Mono, dan ikon LDS sendiri, jadi aplikasi tetap tampil benar tanpa koneksi.

## Langkah berikutnya

- Baca [semua perintah CLI](cli.md).
- Telusuri [daftar komponen](../components/index.md) sebelum membuat komponen baru.
- Atur [tema dan warna instansi](tema.md).
