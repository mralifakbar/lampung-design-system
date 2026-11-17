import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../../theme.dart';
import '../../tokens.g.dart';
import '_chart_utils.dart';

/// A grid of small squares, one per day or slot, shaded in five steps of
/// one hue (series 1) from empty to most.
///
/// Shows patterns over many periods (hari tersibuk, layanan per jam) rather
/// than exact values. Values map to steps with fixed [thresholds], not by
/// percentile, so the scale means the same every week. Pointing at or
/// tapping a cell shows its [cellLabels] entry under the grid.
class LdsHeatmap extends StatefulWidget {
  /// Creates a heatmap.
  const LdsHeatmap({
    super.key,
    required this.values,
    required this.semanticLabel,
    this.columns = 20,
    this.thresholds = const [1, 2, 3, 4],
    this.cellLabels,
    this.lessLabel = 'Sedikit',
    this.moreLabel = 'Banyak',
    this.showScale = true,
  });

  /// One value per cell, flowing row by row. Null or below the first
  /// threshold is empty.
  final List<double?> values;

  /// The pattern in words, for screen readers.
  final String semanticLabel;

  /// Cells per row.
  final int columns;

  /// Lower bounds of steps 1 to 4 (four ascending values).
  final List<double> thresholds;

  /// Words per cell ("Rabu, minggu 3: 12 laporan"), shown when pointed at.
  final List<String>? cellLabels;

  /// Start of the scale.
  final String lessLabel;

  /// End of the scale.
  final String moreLabel;

  /// Shows the Less to More scale under the grid.
  final bool showScale;

  /// The shade step (0 empty to 4 most) for [value] with [thresholds].
  static int levelOf(double? value, List<double> thresholds) {
    if (value == null) return 0;
    var l = 0;
    for (var i = 0; i < thresholds.length && i < 4; i++) {
      if (value >= thresholds[i]) l = i + 1;
    }
    return l;
  }

  /// The color of shade [level] in [c].
  static Color levelColor(LdsColors c, int level) {
    switch (level) {
      case 0:
        return c.bgSkeleton;
      case 1:
        return mix(c.series1, c.bgBase, 0.22);
      case 2:
        return mix(c.series1, c.bgBase, 0.45);
      case 3:
        return mix(c.series1, c.bgBase, 0.70);
      default:
        return c.series1;
    }
  }

  @override
  State<LdsHeatmap> createState() => _LdsHeatmapState();
}

class _LdsHeatmapState extends State<LdsHeatmap> {
  int? _active;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final w = widget;
    final rows = (w.values.length / w.columns).ceil();
    final labels = w.cellLabels;
    final readout = _active != null && labels != null && _active! < labels.length
        ? labels[_active!]
        : null;

    final grid = LayoutBuilder(builder: (context, box) {
      final cell = (box.maxWidth - (w.columns - 1) * 3) / w.columns;
      final height = rows * cell + math.max(0, rows - 1) * 3;
      int? hit(Offset p) {
        final col = (p.dx / (cell + 3)).floor();
        final row = (p.dy / (cell + 3)).floor();
        final i = row * w.columns + col;
        if (col < 0 || col >= w.columns || i < 0 || i >= w.values.length) {
          return null;
        }
        return i;
      }

      return MouseRegion(
        onHover: (e) => setState(() => _active = hit(e.localPosition)),
        onExit: (_) => setState(() => _active = null),
        child: GestureDetector(
          onTapDown: (d) => setState(() => _active = hit(d.localPosition)),
          child: CustomPaint(
            size: Size(box.maxWidth, height),
            painter: _HeatmapPainter(
              levels: [
                for (final v in w.values) LdsHeatmap.levelOf(v, w.thresholds)
              ],
              columns: w.columns,
              cell: cell,
              colors: c,
              active: _active,
            ),
          ),
        ),
      );
    });

    Widget swatch(int l) => Container(
          width: 10,
          height: 10,
          margin: const EdgeInsets.symmetric(horizontal: 1.5),
          decoration: BoxDecoration(
            color: LdsHeatmap.levelColor(c, l),
            borderRadius: const BorderRadius.all(Radius.circular(3)),
          ),
        );

    return Semantics(
      container: true,
      label: w.semanticLabel,
      value: labels?.join('. '),
      child: ExcludeSemantics(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          mainAxisSize: MainAxisSize.min,
          children: [
            grid,
            if (w.showScale || labels != null)
              Padding(
                padding: const EdgeInsets.only(top: LdsSpace.s8),
                child: Row(
                  children: [
                    Expanded(
                      child: Text(
                        readout ?? '',
                        style: LdsType.footnote.copyWith(
                            color: c.textSubtle, fontFeatures: tabular),
                      ),
                    ),
                    if (w.showScale) ...[
                      Text(w.lessLabel, style: axisStyle(c)),
                      const SizedBox(width: 4),
                      for (var l = 0; l <= 4; l++) swatch(l),
                      const SizedBox(width: 4),
                      Text(w.moreLabel, style: axisStyle(c)),
                    ],
                  ],
                ),
              ),
          ],
        ),
      ),
    );
  }
}

class _HeatmapPainter extends CustomPainter {
  _HeatmapPainter({
    required this.levels,
    required this.columns,
    required this.cell,
    required this.colors,
    required this.active,
  });

  final List<int> levels;
  final int columns;
  final double cell;
  final LdsColors colors;
  final int? active;

  @override
  void paint(Canvas canvas, Size size) {
    if (cell <= 0) return;
    for (var i = 0; i < levels.length; i++) {
      final col = i % columns, row = i ~/ columns;
      var rect = Rect.fromLTWH(col * (cell + 3), row * (cell + 3), cell, cell);
      if (i == active) {
        rect = Rect.fromCenter(
            center: rect.center, width: cell * 1.25, height: cell * 1.25);
      }
      canvas.drawRRect(
        RRect.fromRectAndRadius(rect, const Radius.circular(3)),
        Paint()..color = LdsHeatmap.levelColor(colors, levels[i]),
      );
    }
  }

  @override
  bool shouldRepaint(_HeatmapPainter old) => true;
}
