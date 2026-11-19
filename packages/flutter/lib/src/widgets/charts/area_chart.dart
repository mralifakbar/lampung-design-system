import 'package:flutter/widgets.dart';

import 'cartesian_chart.dart';
import 'chart_data.dart';

/// A filled line over time: one series against a dashed comparison, up to
/// four series stacked into a total, or steps for a value that changes in
/// jumps.
///
/// Hover, tap or the arrow keys read every series at one period. The
/// chart is one image for screen readers: [semanticLabel] gives the
/// takeaway and its value lists every number as the text alternative.
class LdsAreaChart extends StatelessWidget {
  /// Creates the chart.
  const LdsAreaChart({
    super.key,
    required this.labels,
    required this.series,
    required this.semanticLabel,
    this.fullLabels,
    this.refs = const <LdsChartRef>[],
    this.format = const LdsNumberFormat(),
    this.yMin,
    this.yMax,
    this.hideYAxis = false,
    this.height = 220,
    this.stacked = false,
    this.step = false,
  });

  /// Short x labels, one per period or category.
  final List<String> labels;

  /// Longer x labels for the tooltip and text alternative.
  final List<String>? fullLabels;

  /// Series, in fixed color order.
  final List<LdsChartSeries> series;

  /// The takeaway in one or two sentences, read first by screen readers.
  final String semanticLabel;

  /// Dashed reference lines (a target, a limit).
  final List<LdsChartRef> refs;

  /// How values read in ticks, tooltip and text alternative.
  final LdsNumberFormat format;

  /// Fixes the bottom of the scale.
  final double? yMin;

  /// Fixes the top of the scale (100 for a percentage).
  final double? yMax;

  /// Hides the tick labels in tight cards.
  final bool hideYAxis;

  /// Height of the plot.
  final double height;

  /// Series stack in order, series 1 at the bottom.
  final bool stacked;

  /// The value holds until it changes.
  final bool step;

  @override
  Widget build(BuildContext context) => LdsCartesianChart(
    kind: LdsSeriesKind.area,
    labels: labels,
    fullLabels: fullLabels,
    series: series,
    semanticLabel: semanticLabel,
    refs: refs,
    format: format,
    yMin: yMin,
    yMax: yMax,
    hideYAxis: hideYAxis,
    height: height,
    stacked: stacked,
    step: step,
  );
}
