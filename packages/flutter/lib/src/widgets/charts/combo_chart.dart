import 'package:flutter/widgets.dart';

import 'cartesian_chart.dart';
import 'chart_data.dart';

/// Bars for what happened in each period and a line for what was expected
/// (a plan, last year), on one shared scale.
///
/// Give each series its [LdsChartSeries.kind]; a series without one is
/// drawn as bars.
///
/// Hover, tap or the arrow keys read every series at one period. The
/// chart is one image for screen readers: [semanticLabel] gives the
/// takeaway and its value lists every number as the text alternative.
class LdsComboChart extends StatelessWidget {
  /// Creates the chart.
  const LdsComboChart({
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

  @override
  Widget build(BuildContext context) => LdsCartesianChart(
        kind: LdsSeriesKind.bar,
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
      );
}
