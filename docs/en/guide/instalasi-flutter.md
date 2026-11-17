# Flutter

https://lampung.kartadinata.app/docs/en/guide/instalasi-flutter

Set up Lampung Design System in a Flutter project.

## Add the package

```
flutter pub add lampung_design_system
```

Or let the CLI add the package and wire the theme in `lib/main.dart`:

```
npx lampung-ds@latest init -t flutter
```

## Use the theme and widgets

```
// lib/main.dart
import 'package:flutter/material.dart';
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

## More widgets

```
LdsAksara('Lampung')        // aksara Lampung, drawn from the same glyphs
LdsMasthead()                // "not an official government site" strip
```

The package bundles Geist, Geist Mono and the LDS icon fonts, so apps render correctly offline.

## Next steps

- Read [every CLI command](cli.md).
- Browse the [component list](../components/index.md) before building something new.
- Set up [theming and agency colors](tema.md).
