# Lampung Design System for Flutter

[![pub package](https://img.shields.io/pub/v/lampung_design_system.svg)](https://pub.dev/packages/lampung_design_system)

The Flutter package of **Lampung Design System (LDS)**, an unofficial open source
design system for public services in Lampung, Indonesia. It gives a Flutter app
the same tokens, type, icons and component behavior as the web version.

> LDS is a community project. It is not made, run or endorsed by the Provincial
> Government of Lampung or any agency. Apps that could be mistaken for a
> government service should show `LdsMasthead`.

What you get:

- **Tokens** generated from the same `tokens.json` as the CSS: colors for light
  and dark, type scale, spacing, radius, sizes, shadows, durations, curves and
  springs.
- **A Material 3 theme**, so plain `FilledButton`, `TextField`, `Card`, `Chip`,
  `Switch`, `NavigationBar`, `AlertDialog`, bottom sheets and `SnackBar` already
  look like LDS.
- **Widgets** that follow the LDS component specs: buttons with a loading state
  that keeps its width, labeled text fields, cards that group by fill instead of
  shadow, badges, alerts, grouped list rows, a segmented control, empty states,
  skeletons, the "not an official site" masthead and aksara Lampung.
- **Bundled fonts**: Geist, Geist Mono and the Solar icon fonts
  (line and fill). No network font loading.

## Install

```sh
flutter pub add lampung_design_system
```

Requires Flutter 3.27 or later.

## Use the theme

```dart
import 'package:flutter/material.dart';
import 'package:lampung_design_system/lampung_design_system.dart';

void main() => runApp(
      MaterialApp(
        theme: LdsTheme.light(),
        darkTheme: LdsTheme.dark(),
        themeMode: ThemeMode.system,
        home: const HomeScreen(),
      ),
    );
```

Read the current appearance anywhere below the theme:

```dart
final c = context.lds; // LdsColors for light or dark
Container(
  decoration: BoxDecoration(
    color: c.bgFill,
    borderRadius: BorderRadius.circular(LdsRadius.lg),
  ),
  child: Text('Layanan', style: LdsType.title3.copyWith(color: c.textStrong)),
);
```

`LdsColors` is a `ThemeExtension`, so it animates with theme changes. Every role
from the tokens is there: `accent`, `accentText`, `accentTint`, `gold`,
`goldText`, `bgFill`, `textSubtle`, `success`, `dangerTint`, the icon chip
colors `tileBlue` to `tileGray`, and the rest.

To change the accent for a white-label app:

```dart
LdsTheme.build(
  Brightness.light,
  colors: LdsColors.light.copyWith(accent: const Color(0xFF0B6E4F)),
);
```

## Widgets

```dart
LdsMasthead(); // "Bukan situs atau aplikasi resmi pemerintah." by default

LdsButton(label: 'Kirim laporan', icon: 'outbox', onPressed: send);
LdsButton(label: 'Kirim laporan', loading: true, onPressed: send);
LdsButton(
  label: 'Batal',
  variant: LdsButtonVariant.secondary,
  size: LdsButtonSize.md,
  onPressed: cancel,
);
LdsIconButton(icon: 'share', semanticLabel: 'Bagikan', onPressed: share);

LdsTextField(
  label: 'Lokasi',
  prefixIcon: 'location_on',
  help: 'Tambahkan patokan, misalnya nama toko terdekat.',
  error: locationError,
);

LdsCard(child: Text('Kartu di atas fill, tanpa bayangan'));
LdsBadge('Diproses', tone: LdsTone.warning);
LdsAlert(
  tone: LdsAlertTone.warning,
  title: 'Air mati Rabu, 08.00 sampai 14.00',
  body: 'Tampung air sejak Selasa malam.',
);

LdsList(header: 'Pengaturan', children: [
  LdsListRow(icon: 'notifications', title: 'Notifikasi', value: 'Aktif', onTap: open),
  LdsListRow(title: 'Kabari lewat SMS', trailing: Switch(value: sms, onChanged: setSms)),
]);

LdsSegmented<String>(
  value: range,
  onChanged: setRange,
  segments: const [
    LdsSegment(value: 'day', label: 'Hari'),
    LdsSegment(value: 'week', label: 'Minggu'),
  ],
);

LdsIcon('search');
LdsIcon('home', fill: true, semanticLabel: 'Beranda');
LdsEmptyState(title: 'Belum ada laporan', action: LdsButton(label: 'Buat laporan', onPressed: create));
LdsSkeleton(width: 160, height: 14);
LdsAksara('Lampung');   // Latin text drawn as aksara Lampung
LdsAksaraBand();        // decorative band, hidden from screen readers
```

| Widget | Use it for |
|---|---|
| `LdsButton` | An action on this screen. Variants `primary` (one per view), `secondary`, `tinted`, `gray`, `plain`, `danger`; sizes `sm` 28, `md` 36, `regular` 44, `lg` 52. |
| `LdsIconButton` | A well-known action without a label: close, share, more. `semanticLabel` is required and shown as a tooltip. |
| `LdsTextField` | A short typed value with a visible label, help text and error. |
| `LdsCard` | A self-contained subject in a grid. Fill or outline, never a shadow. |
| `LdsBadge` | The state of a record: neutral, accent, success, warning, danger, gold. |
| `LdsAlert` | Something to know before acting. Warning and danger are announced. |
| `LdsList`, `LdsListRow` | Grouped rows with an icon chip, title, subtitle and a trailing value, widget or chevron. |
| `LdsSegmented` | Two to five views of the same content, with a sliding thumb. |
| `LdsIcon` | A Solar icon by ligature name, line or fill. |
| `LdsEmptyState` | A view that loaded with nothing in it, with the one action that fills it. |
| `LdsSkeleton` | Placeholder blocks that mirror the layout while data loads. |
| `LdsMasthead` | The thin strip saying the app is not an official government service. |
| `LdsAksara`, `LdsAksaraBand` | Aksara Lampung for names and headings, and as a quiet ornament. |
| `LdsPressable` | The base of every control above, for building your own. |

## Icons

`LdsIcon` takes a ligature name from
[`icons/icons.json`](https://github.com/mralifakbar/lampung-design-system/blob/main/icons/icons.json):
`search`, `home`, `location_on`, `local_hospital`, `directions_bus` and over
two hundred more. An unknown name renders blank. To use the fonts directly:

```dart
Text('search', style: TextStyle(fontFamily: LdsType.icons, fontSize: 20));
```

## Fonts

The package declares four families. Use the constants, which include the
`packages/lampung_design_system/` prefix Flutter needs for package fonts:

| Constant | Family | Weights |
|---|---|---|
| `LdsType.family` | Geist | 400, 500, 600, 700 |
| `LdsType.mono` | Geist Mono | 400, 500 |
| `LdsType.icons` | LDS Icons | |
| `LdsType.iconsFill` | LDS Icons Fill | |

The text styles `LdsType.display` to `LdsType.caption` already use
`LdsType.family`.

## Motion and accessibility

- Durations and curves come from the tokens (`LdsMotion.fast`,
  `LdsMotion.standardCurve`, `LdsSpringCurve.smooth`).
- Every widget honors `MediaQuery.disableAnimations`: press scale, the sliding
  thumb and the skeleton shine stop when people ask for less motion. Use
  `context.ldsReduceMotion` and `context.ldsDuration(d)` in your own widgets.
- Pressable widgets have a hit area of at least 44 by 44, work with Enter and
  Space, show a 2 px focus ring for keyboard focus and expose button semantics.
- Accent text pairs, status text on tints and body text hold WCAG AA in both
  appearances; the package tests check this.

## Example

[`example/`](example) is "Sakai", a small citizen app in Indonesian: a home
screen with a service grid, a report form with validation, an account page and
a light/dark toggle. All of its data is example data.

```sh
cd example && flutter run -d chrome
```

## Bahasa Indonesia

Paket Flutter untuk **Lampung Design System (LDS)**, sistem desain sumber
terbuka yang tidak resmi untuk layanan publik di Lampung. LDS bukan buatan atau
milik Pemerintah Provinsi Lampung. Aplikasi yang bisa disangka layanan
pemerintah sebaiknya menampilkan `LdsMasthead`.

Pasang dengan `flutter pub add lampung_design_system`, lalu pakai
`LdsTheme.light()` dan `LdsTheme.dark()` di `MaterialApp`. Warna tampilan yang
sedang aktif bisa dibaca dengan `context.lds`, misalnya `context.lds.accent`
atau `context.lds.gold`. Widget seperti `LdsButton`, `LdsTextField`, `LdsCard`,
`LdsBadge`, `LdsAlert`, `LdsListRow`, `LdsSegmented`, `LdsEmptyState` dan
`LdsSkeleton` mengikuti spesifikasi komponen LDS, termasuk target sentuh minimal
44 piksel, cincin fokus, label untuk pembaca layar, dan gerak yang berhenti saat
pengguna meminta gerak dikurangi. Font Geist, Geist Mono, dan
ikon Solar sudah termasuk di paket ini.

Dokumentasi lengkap: [lampung.kartadinata.app](https://lampung.kartadinata.app).

## License

MIT, see [LICENSE](LICENSE). Bundled fonts: Geist and Geist Mono under the SIL Open Font License 1.1, icon fonts built from Solar by 480
Design under CC BY 4.0. Details in [NOTICE.md](NOTICE.md).
