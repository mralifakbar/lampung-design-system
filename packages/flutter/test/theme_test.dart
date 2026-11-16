import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:lampung_design_system/lampung_design_system.dart';

import 'helpers.dart';

void main() {
  for (final (name, theme, colors) in [
    ('light', LdsTheme.light(), LdsColors.light),
    ('dark', LdsTheme.dark(), LdsColors.dark),
  ]) {
    group('$name theme', () {
      test('is Material 3 with the token color scheme', () {
        expect(theme.useMaterial3, isTrue);
        expect(theme.brightness, name == 'light' ? Brightness.light : Brightness.dark);
        expect(theme.colorScheme.primary, colors.accent);
        expect(theme.colorScheme.onPrimary, colors.textOnAccent);
        expect(theme.colorScheme.surface, colors.bgCanvas);
        expect(theme.colorScheme.error, colors.danger);
        expect(theme.colorScheme.secondary, colors.gold);
        expect(theme.scaffoldBackgroundColor, colors.bgCanvas);
      });

      test('registers LdsColors as an extension', () {
        expect(theme.extension<LdsColors>(), same(colors));
      });

      test('uses the packaged font families', () {
        expect(theme.textTheme.bodyMedium!.fontFamily, LdsType.family);
        expect(LdsType.family, 'packages/lampung_design_system/Geist');
        expect(LdsType.icons, 'packages/lampung_design_system/LDS Icons');
        expect(theme.textTheme.bodyMedium!.fontSize, 15);
        expect(theme.textTheme.displayLarge!.fontSize, 56);
        expect(theme.textTheme.bodyMedium!.color, colors.textDefault);
      });

      test('themes the common Material components', () {
        expect(theme.cardTheme.color, colors.bgFill);
        expect(theme.cardTheme.elevation, 0);
        expect(theme.filledButtonTheme.style, isNotNull);
        expect(theme.outlinedButtonTheme.style, isNotNull);
        expect(theme.textButtonTheme.style, isNotNull);
        expect(theme.inputDecorationTheme.fillColor, colors.bgBase);
        expect(theme.chipTheme.selectedColor, colors.accentTint);
        expect(theme.switchTheme.trackColor!.resolve({WidgetState.selected}), colors.accent);
        expect(theme.navigationBarTheme.indicatorColor, colors.accentTint);
        expect(theme.dialogTheme.backgroundColor, colors.bgElevated);
        expect(theme.bottomSheetTheme.backgroundColor, colors.bgElevated);
        expect(theme.snackBarTheme.backgroundColor, colors.bgInverse);
        final minSize = theme.filledButtonTheme.style!.minimumSize!.resolve({})!;
        expect(minSize.height, greaterThanOrEqualTo(44));
      });
    });
  }

  test('LdsColors lerps between appearances', () {
    final mid = LdsColors.light.lerp(LdsColors.dark, 0.5);
    expect(mid.bgCanvas, Color.lerp(LdsColors.light.bgCanvas, LdsColors.dark.bgCanvas, 0.5));
    expect(LdsColors.light.lerp(null, 0.5), same(LdsColors.light));
    expect(LdsColors.light.copyWith(accent: const Color(0xFF000000)).accent, const Color(0xFF000000));
  });

  testWidgets('context.lds follows the theme mode', (tester) async {
    late LdsColors seen;
    await tester.pumpWidget(wrap(Builder(builder: (context) {
      seen = context.lds;
      return const SizedBox();
    }), dark: true));
    await tester.pumpAndSettle();
    expect(seen.bgCanvas, LdsColors.dark.bgCanvas);
  });

  testWidgets('plain Material widgets render under both themes', (tester) async {
    for (final dark in [false, true]) {
      await tester.pumpWidget(wrap(
        Column(mainAxisSize: MainAxisSize.min, children: [
          FilledButton(onPressed: () {}, child: const Text('Kirim')),
          OutlinedButton(onPressed: () {}, child: const Text('Batal')),
          const TextField(decoration: InputDecoration(labelText: 'Nama')),
          Switch(value: true, onChanged: (_) {}),
          const Chip(label: Text('Kesehatan')),
          const Card(child: Text('Kartu')),
        ]),
        dark: dark,
      ));
      await tester.pumpAndSettle();
      expect(tester.takeException(), isNull);
    }
  });
}
