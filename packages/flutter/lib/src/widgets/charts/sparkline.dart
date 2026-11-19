import 'package:material_ui/material_ui.dart';

import '../../theme.dart';
import 'chart_data.dart';

/// A tiny line of recent history with a quiet fill and an end dot, no axes.
///
/// It shows the shape of a trend only; the number beside it is the point.
/// With fewer than two points it draws nothing.
class LdsSparkline extends StatelessWidget {
  /// Creates a sparkline.
  const LdsSparkline({
    super.key,
    required this.values,
    required this.semanticLabel,
    this.color = LdsSeriesColor.series1,
    this.width = 220,
    this.height = 64,
    this.showDot = true,
    this.bleed = false,
  });

  /// The values, oldest first.
  final List<double> values;

  /// The trend in words ("Kehadiran naik dari 88 ke 92 persen").
  final String semanticLabel;

  /// Line color.
  final LdsSeriesColor color;

  /// Width; null fills the available width.
  final double? width;

  /// Height.
  final double height;

  /// Marks the latest value with a dot.
  final bool showDot;

  /// Runs edge to edge with no inset, for the bottom of a KPI card.
  final bool bleed;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    return Semantics(
      label: semanticLabel,
      image: true,
      child: SizedBox(
        width: width,
        height: height,
        child: CustomPaint(
          painter: _SparkPainter(
            values,
            color.resolve(c),
            c.bgBase,
            showDot && !bleed,
            bleed,
          ),
        ),
      ),
    );
  }
}

class _SparkPainter extends CustomPainter {
  _SparkPainter(this.values, this.color, this.base, this.dot, this.bleed);

  final List<double> values;
  final Color color;
  final Color base;
  final bool dot;
  final bool bleed;

  @override
  void paint(Canvas canvas, Size size) {
    if (values.length < 2) return;
    var lo = values.first, hi = values.first;
    for (final v in values) {
      if (v < lo) lo = v;
      if (v > hi) hi = v;
    }
    if (hi == lo) hi = lo + 1;
    final inset = bleed ? 0.0 : 4.0;
    final top = bleed ? size.height * 0.2 : 8.0;
    final bottom = size.height - (bleed ? 2 : 8);
    Offset at(int i) => Offset(
      inset + (size.width - inset * 2) * i / (values.length - 1),
      bottom - (values[i] - lo) / (hi - lo) * (bottom - top),
    );
    final line = Path()..moveTo(at(0).dx, at(0).dy);
    for (var i = 1; i < values.length; i++) {
      line.lineTo(at(i).dx, at(i).dy);
    }
    final fill = Path.from(line)
      ..lineTo(at(values.length - 1).dx, size.height)
      ..lineTo(at(0).dx, size.height)
      ..close();
    canvas.drawPath(fill, Paint()..color = color.withValues(alpha: 0.12));
    canvas.drawPath(
      line,
      Paint()
        ..color = color
        ..style = PaintingStyle.stroke
        ..strokeWidth = 2
        ..strokeJoin = StrokeJoin.round
        ..strokeCap = StrokeCap.round,
    );
    if (dot) {
      final end = at(values.length - 1);
      canvas.drawCircle(end, 4.5, Paint()..color = base);
      canvas.drawCircle(end, 3, Paint()..color = color);
    }
  }

  @override
  bool shouldRepaint(_SparkPainter old) =>
      old.values != values || old.color != color || old.base != base;
}
