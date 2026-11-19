import 'dart:convert';

import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:lampung_design_system/lampung_design_system.dart';
import 'package:lampung_design_system_example/gallery/gallery.dart';
import 'package:lampung_design_system_example/main.dart';
import 'package:material_ui/material_ui.dart';

/// Loads the bundled fonts so text and icon ligatures measure as on a phone.
Future<void> _loadFonts() async {
  final manifest = json.decode(
    await rootBundle.loadString('FontManifest.json'),
  ) as List<dynamic>;
  for (final family in manifest.cast<Map<String, dynamic>>()) {
    final loader = FontLoader(family['family'] as String);
    for (final font in (family['fonts'] as List).cast<Map<String, dynamic>>()) {
      loader.addFont(rootBundle.load(font['asset'] as String));
    }
    await loader.load();
  }
}

void _phone(WidgetTester tester) {
  tester.view.physicalSize = const Size(375 * 3, 812 * 3);
  tester.view.devicePixelRatio = 3;
  addTearDown(tester.view.reset);
}

Widget _app(Widget home, {required bool dark}) => MaterialApp(
  theme: LdsTheme.light(),
  darkTheme: LdsTheme.dark(),
  themeMode: dark ? ThemeMode.dark : ThemeMode.light,
  home: home,
);

/// Collects every Flutter error (overflows included) raised while [body] runs.
Future<List<String>> _errors(Future<void> Function() body) async {
  final errors = <String>[];
  final previous = FlutterError.onError;
  FlutterError.onError = (d) => errors.add(d.exceptionAsString());
  try {
    await body();
  } finally {
    FlutterError.onError = previous;
  }
  return errors;
}

void main() {
  setUpAll(_loadFonts);

  for (final group in galleryGroups) {
    for (final dark in [false, true]) {
      testWidgets('${group.title} (${group.entries.length}) renders '
          '${dark ? 'dark' : 'light'} at 375 pt', (tester) async {
        _phone(tester);
        final errors = await _errors(() async {
          await tester.pumpWidget(
            _app(
              GalleryGroupScreen(title: group.title, entries: group.entries),
              dark: dark,
            ),
          );
          await tester.pump(const Duration(milliseconds: 500));
          final position = tester
              .state<ScrollableState>(find.byType(Scrollable).first)
              .position;
          // Walk the lazy list to the end so every entry is built.
          for (var i = 0; i < 400; i++) {
            final next = position.pixels + 300;
            position.jumpTo(next.clamp(0, position.maxScrollExtent));
            await tester.pump(const Duration(milliseconds: 100));
            if (position.pixels >= position.maxScrollExtent) {
              await tester.pump(const Duration(milliseconds: 500));
              if (position.pixels >= position.maxScrollExtent) break;
            }
          }
        });
        expect(errors, isEmpty);
        expect(tester.takeException(), isNull);
        await tester.pumpWidget(const SizedBox());
        await tester.pump(const Duration(seconds: 5));
      });
    }
  }

  testWidgets('Komponen tab lists groups and search filters by name', (
    tester,
  ) async {
    _phone(tester);
    await tester.pumpWidget(const SakaiApp());
    await tester.pump(const Duration(milliseconds: 1500));
    await tester.tap(find.text('Komponen'));
    await tester.pump(const Duration(milliseconds: 500));
    for (final g in galleryGroups) {
      expect(find.text(g.title), findsOneWidget);
    }
    await tester.enterText(find.byType(TextField), 'sheet');
    await tester.pump(const Duration(milliseconds: 300));
    expect(find.text('LdsSheet'), findsOneWidget);
    expect(find.text('Dasar'), findsNothing);
    await tester.tap(find.text('LdsSheet'));
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 600));
    expect(find.text('Lembar bawah'), findsOneWidget);
    expect(find.byType(GalleryGroupScreen), findsOneWidget);
    expect(tester.takeException(), isNull);
  });
}
