# Changelog

## 0.1.0

First release of the Flutter package of Lampung Design System (unofficial).

- Tokens generated from `tokens/tokens.json`: `LdsColors` (light and dark, a
  `ThemeExtension`), `LdsShadows`, `LdsType`, `LdsSpace`, `LdsRadius`,
  `LdsSize` and `LdsMotion` (durations, curves and springs).
- `LdsTheme.light()` and `LdsTheme.dark()`: Material 3 `ThemeData` with the LDS
  color scheme, type scale and component themes for buttons, inputs, cards,
  chips, switches, navigation bar, dialogs, bottom sheets and snack bars.
- `context.lds` and `context.ldsShadows` to read the current appearance.
- Widgets: `LdsButton`, `LdsIconButton`, `LdsTextField`, `LdsCard`,
  `LdsBadge`, `LdsAlert`, `LdsList` and `LdsListRow`, `LdsSegmented`,
  `LdsIcon`, `LdsEmptyState`, `LdsSkeleton`, `LdsMasthead`, `LdsAksara`,
  `LdsAksaraBand` and the `LdsPressable` base.
- Motion helpers: `LdsSpringCurve` and `context.ldsReduceMotion`, which every
  widget honors.
- Bundled fonts: Geist, Geist Mono and the two LDS icon fonts
  (Solar, line and fill) as TrueType.
- Example app "Sakai" with a home screen, a report form and a light/dark
  toggle.
