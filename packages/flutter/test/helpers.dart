import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:lampung_design_system/lampung_design_system.dart';

Widget wrap(Widget child, {bool dark = false, bool reduceMotion = false}) {
  return MaterialApp(
    theme: LdsTheme.light(),
    darkTheme: LdsTheme.dark(),
    themeMode: dark ? ThemeMode.dark : ThemeMode.light,
    home: MediaQuery(
      data: MediaQueryData(disableAnimations: reduceMotion),
      child: Scaffold(
        body: Center(
          child: Padding(padding: const EdgeInsets.all(16), child: child),
        ),
      ),
    ),
  );
}

/// Parses a tokens.json color (#RRGGBB or rgba()) into a [Color].
Color parseTokenColor(String v) {
  final hex = RegExp(r'^#([0-9a-fA-F]{6})$').firstMatch(v);
  if (hex != null) return Color(0xFF000000 | int.parse(hex[1]!, radix: 16));
  final m = RegExp(r'^rgba?\(\s*(\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\s*\)$')
      .firstMatch(v);
  if (m == null) throw ArgumentError('Unsupported color $v');
  final a = ((m[4] == null ? 1 : double.parse(m[4]!)) * 255).round();
  return Color.fromARGB(
      a, int.parse(m[1]!), int.parse(m[2]!), int.parse(m[3]!));
}

/// WCAG relative luminance.
double luminance(Color c) {
  double ch(double v) => v <= 0.03928
      ? v / 12.92
      : math.pow((v + 0.055) / 1.055, 2.4).toDouble();
  return 0.2126 * ch(c.r) + 0.7152 * ch(c.g) + 0.0722 * ch(c.b);
}

/// Contrast ratio of [fg] over [bg]; translucent colors are composited over
/// [canvas] first.
double contrast(Color fg, Color bg, Color canvas) {
  final b = Color.alphaBlend(bg, canvas);
  final f = Color.alphaBlend(fg, b);
  final l1 = luminance(f), l2 = luminance(b);
  final hi = l1 > l2 ? l1 : l2, lo = l1 > l2 ? l2 : l1;
  return (hi + 0.05) / (lo + 0.05);
}
