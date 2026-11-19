import 'package:flutter/widgets.dart';

import '../../tokens.g.dart';

/// A categorical chart color, in the fixed series order.
///
/// Series colors are never cycled: a fifth series folds into [neutral]
/// ("Lainnya"). Color follows the entity, so filtering never repaints the
/// series that remain.
enum LdsSeriesColor {
  /// `series-1`, the Lampung green. The first series and the highlight.
  series1,

  /// `series-2`. Under 3:1 on white, so always label it.
  series2,

  /// `series-3`.
  series3,

  /// `series-4`. Also the dashed comparison of a line chart.
  series4,

  /// `neutral`: the Other series, and anything not in focus.
  neutral;

  /// The series color for position [index] (0 based); past the fourth it is
  /// [neutral].
  static LdsSeriesColor at(int index) =>
      index >= 0 && index < 4 ? LdsSeriesColor.values[index] : neutral;

  /// Resolves this color against [c].
  Color resolve(LdsColors c) {
    switch (this) {
      case LdsSeriesColor.series1:
        return c.series1;
      case LdsSeriesColor.series2:
        return c.series2;
      case LdsSeriesColor.series3:
        return c.series3;
      case LdsSeriesColor.series4:
        return c.series4;
      case LdsSeriesColor.neutral:
        return c.neutral;
    }
  }
}

/// How a series is drawn in a cartesian chart.
enum LdsSeriesKind {
  /// A 2 px line.
  line,

  /// A line with a quiet fill under it.
  area,

  /// Bars, one per period; several bar series group side by side.
  bar,
}

/// One series of values over the shared x labels of a chart.
@immutable
class LdsChartSeries {
  /// Creates a series.
  const LdsChartSeries({
    required this.name,
    required this.values,
    this.color,
    this.kind,
    this.dashed = false,
  });

  /// Name in the legend, tooltip and text alternative ("Laporan masuk").
  final String name;

  /// One value per x label. Null leaves a gap (no data for that period).
  final List<double?> values;

  /// Color; defaults to the series position.
  final LdsSeriesColor? color;

  /// How it is drawn; defaults to the chart's own kind.
  final LdsSeriesKind? kind;

  /// A comparison or previous period: dashed, without fill.
  final bool dashed;
}

/// A dashed horizontal reference line: a target, a limit.
@immutable
class LdsChartRef {
  /// Creates a reference line at [value].
  const LdsChartRef(this.value, this.label);

  /// Where the line sits on the value scale. The scale always includes it.
  final double value;

  /// The words at the end of the line ("Target 300").
  final String label;
}

/// One labelled part of a whole, for donuts, gauges and similar charts.
@immutable
class LdsChartSegment {
  /// Creates a segment.
  const LdsChartSegment(this.name, this.value, {this.color});

  /// Name in the legend ("Aplikasi").
  final String name;

  /// Size of the part, in the chart's unit.
  final double value;

  /// Color; defaults to the segment position.
  final LdsSeriesColor? color;
}

/// How numbers read in ticks, tooltips and text alternatives.
///
/// Indonesian by default: `12.480`, `3,5`, compact `12,4 rb`.
@immutable
class LdsNumberFormat {
  /// Creates a number format.
  const LdsNumberFormat({
    this.prefix = '',
    this.suffix = '',
    this.decimals = 0,
    this.compact = false,
    this.groupSeparator = '.',
    this.decimalSeparator = ',',
    this.compactUnits = const ['rb', 'jt', 'M', 'T'],
  });

  /// Text before the number ("Rp ").
  final String prefix;

  /// Text after the number ("%", " laporan").
  final String suffix;

  /// Digits after the decimal separator.
  final int decimals;

  /// Shortens thousands and up with [compactUnits] ("12,4 rb").
  final bool compact;

  /// Thousands separator.
  final String groupSeparator;

  /// Decimal separator.
  final String decimalSeparator;

  /// Units for thousand, million, billion and trillion when [compact].
  final List<String> compactUnits;

  /// Formats [value].
  String format(num value) {
    final negative = value < 0;
    var v = value.abs().toDouble();
    var unit = '';
    var digits = decimals;
    if (compact && v >= 1000) {
      var i = -1;
      while (v >= 1000 && i < compactUnits.length - 1) {
        v /= 1000;
        i++;
      }
      unit = ' ${compactUnits[i]}';
      digits = v < 10 && v != v.roundToDouble() ? 1 : 0;
      if (v >= 10) v = v.roundToDouble();
    }
    final fixed = v.toStringAsFixed(digits);
    final parts = fixed.split('.');
    final whole = parts[0];
    final grouped = StringBuffer();
    for (var i = 0; i < whole.length; i++) {
      if (i > 0 && (whole.length - i) % 3 == 0) grouped.write(groupSeparator);
      grouped.write(whole[i]);
    }
    var frac = parts.length > 1 ? parts[1] : '';
    if (unit.isNotEmpty) frac = frac.replaceAll(RegExp(r'0+$'), '');
    final number = frac.isEmpty
        ? grouped.toString()
        : '$grouped$decimalSeparator$frac';
    return '${negative ? '−' : ''}$prefix$number$unit$suffix';
  }
}
