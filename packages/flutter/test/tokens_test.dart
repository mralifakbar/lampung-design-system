import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:lampung_design_system/lampung_design_system.dart';

import 'helpers.dart';

void main() {
  final file = File('../../tokens/tokens.json');
  final skip = file.existsSync() ? false : 'tokens.json not found (run from the repo)';
  late final Map<String, dynamic> t;

  setUpAll(() {
    if (file.existsSync()) {
      t = jsonDecode(file.readAsStringSync()) as Map<String, dynamic>;
    }
  });

  test('colors match tokens.json in both modes', () {
    final color = t['color'] as Map<String, dynamic>;
    for (final (mode, colors) in [('light', LdsColors.light), ('dark', LdsColors.dark)]) {
      final expected = (color[mode] as Map<String, dynamic>).cast<String, String>();
      final actual = colors.toMap();
      expect(actual.keys.toSet(), expected.keys.toSet(), reason: mode);
      for (final e in expected.entries) {
        expect(actual[e.key], parseTokenColor(e.value), reason: '$mode ${e.key}');
      }
    }
  }, skip: skip);

  test('accent is Lampung green and gold is siger gold', () {
    expect(LdsColors.light.accent, const Color(0xFF0B6E4F));
    expect(LdsColors.light.gold, const Color(0xFFC9952B));
    expect(LdsColors.dark.goldText, isNot(LdsColors.light.goldText));
  });

  test('type scale matches tokens.json', () {
    final type = (t['type'] as Map<String, dynamic>).cast<String, Map<String, dynamic>>();
    expect(LdsType.scale.keys.toSet(), type.keys.toSet());
    final styles = <String, TextStyle>{
      'display': LdsType.display,
      'large-title': LdsType.largeTitle,
      'title-1': LdsType.title1,
      'title-2': LdsType.title2,
      'title-3': LdsType.title3,
      'headline': LdsType.headline,
      'body': LdsType.body,
      'body-strong': LdsType.bodyStrong,
      'subhead': LdsType.subhead,
      'footnote': LdsType.footnote,
      'caption': LdsType.caption,
    };
    for (final e in type.entries) {
      final s = styles[e.key]!;
      final size = (e.value['size'] as num).toDouble();
      expect(s.fontSize, size, reason: e.key);
      expect(s.height! * size, closeTo((e.value['line'] as num).toDouble(), 0.01), reason: e.key);
      expect(s.fontWeight!.value, e.value['weight'], reason: e.key);
      expect(s.letterSpacing, closeTo((e.value['tracking'] as num) * size, 0.001), reason: e.key);
      expect(s.fontFamily, 'packages/lampung_design_system/Plus Jakarta Sans');
    }
  }, skip: skip);

  test('space, radius and size match tokens.json', () {
    Map<String, double> nums(String key) => (t[key] as Map<String, dynamic>)
        .map((k, v) => MapEntry(k, (v as num).toDouble()));
    expect(LdsSpace.values, nums('space'));
    expect(LdsRadius.values, nums('radius'));
    expect(LdsSize.values, nums('size'));
    expect(LdsSize.touchMin, 44);
  }, skip: skip);

  test('motion matches tokens.json', () {
    final motion = t['motion'] as Map<String, dynamic>;
    final durations = (motion['duration'] as Map<String, dynamic>)
        .map((k, v) => MapEntry(k, Duration(milliseconds: v as int)));
    expect(LdsMotion.durations, durations);
    final easing = motion['easing'] as Map<String, dynamic>;
    for (final e in easing.entries) {
      final v = (e.value as List<dynamic>).cast<num>();
      final c = LdsMotion.curves[e.key]!;
      expect([c.a, c.b, c.c, c.d], v.map((n) => n.toDouble()).toList(), reason: e.key);
    }
    final spring = motion['spring'] as Map<String, dynamic>;
    expect(LdsMotion.momentum.inMilliseconds, (spring['momentum'] as Map<String, dynamic>)['duration']);
    expect(LdsMotion.smoothSpringDuration.inMilliseconds, (spring['smooth'] as Map<String, dynamic>)['duration']);
  }, skip: skip);

  test('spring curves settle at 1 and only momentum overshoots', () {
    expect(LdsSpringCurve.smooth.transform(1), closeTo(1, 0.02));
    expect(LdsSpringCurve.snappy.transform(1), closeTo(1, 0.02));
    double peak(Curve c) => [for (var i = 0; i <= 100; i++) c.transform(i / 100)].reduce((a, b) => a > b ? a : b);
    expect(peak(LdsSpringCurve.smooth), lessThanOrEqualTo(1.001));
    expect(peak(LdsSpringCurve.momentum), greaterThan(1.0));
  });
}
