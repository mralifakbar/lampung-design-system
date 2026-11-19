# Changelog

## 0.2.0

- **Breaking:** builds on [`material_ui`](https://pub.dev/packages/material_ui)
  and [`cupertino_ui`](https://pub.dev/packages/cupertino_ui) instead of the
  deprecated `package:flutter/material.dart` and `package:flutter/cupertino.dart`.
  Requires Flutter 3.47 or later. Add `material_ui` to your app and import
  `package:material_ui/material_ui.dart`, because `LdsTheme` returns
  `material_ui`'s `ThemeData`.
- Example app runs on `material_ui`.

## 0.1.2

- Vertical `LdsSteps` lays out inside scrolling lists instead of throwing.
- `LdsTabs` and `LdsSlidingIndicator` size to their content in a vertical list.
- `LdsPagination`, `LdsKbd` and `LdsCitation.span` hug their content.
- `LdsHoldToConfirm` centers its label.
- `LdsPaper` sizes its number columns to their content.
- `LdsEventCalendar` fits 375 pt screens.
- Example app: a Komponen tab with a searchable gallery of every widget.

## 0.1.1

- `LdsSwipeActions` collapses its row with `Align` instead of the deprecated
  `SizeTransition.axisAlignment` (deprecated after Flutter 3.41).
- Development: flutter_lints 6.

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
- Widget groups ported from every web component, 161 widgets in all:
  forms (checkbox, radio, switch, select, combobox, OTP, date and range
  pickers, sliders, file and tag input...), overlays (dialog, sheet, drawer,
  popover, toast, menus, command palette, swipe and slide to confirm...),
  navigation (tabs, steps, sidebar, app shell, accordion, tree, carousel...),
  data display (avatar, table, data table, timeline, kanban, event calendar,
  progress...), charts (bar, line, area, donut, gauge, heatmap, map, KPI
  cards...) and chat, motion and marketing blocks.
- Icon fonts now carry real side bearings, so icons sit centered on iOS.
- Motion helpers: `LdsSpringCurve` and `context.ldsReduceMotion`, which every
  widget honors.
- Bundled fonts: Geist, Geist Mono and the two LDS icon fonts
  (Solar, line and fill) as TrueType.
- Example app "Sakai" with a home screen, a report form and a light/dark
  toggle.
