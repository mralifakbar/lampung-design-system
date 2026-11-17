import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../../theme.dart';
import '../../tokens.g.dart';
import '_chart_utils.dart';
import 'chart_data.dart';

/// A ring split into up to four parts of one whole, with the total in the
/// middle and a labelled list beside it.
///
/// The list carries the numbers; the ring shows proportion at a glance.
/// A fifth part and beyond fold into one neutral [otherLabel] part.
class LdsDonut extends StatelessWidget {
  /// Creates a donut.
  const LdsDonut({
    super.key,
    required this.segments,
    required this.semanticLabel,
    this.center,
    this.unit,
    this.format = const LdsNumberFormat(),
    this.thin = false,
    this.size = 168,
    this.otherLabel = 'Lainnya',
  });

  /// The parts, in series order.
  final List<LdsChartSegment> segments;

  /// The takeaway, read first by screen readers.
  final String semanticLabel;

  /// Text in the hole; defaults to the formatted total.
  final String? center;

  /// What the total counts ("laporan"), under it.
  final String? unit;

  /// How values read in the list.
  final LdsNumberFormat format;

  /// A 10 px ring for small cards instead of 14 px.
  final bool thin;

  /// Diameter of the ring.
  final double size;

  /// Name of the folded part when there are more than four.
  final String otherLabel;

  List<LdsChartSegment> get _parts {
    if (segments.length <= 4) return segments;
    final rest = segments.skip(4).fold<double>(0, (s, e) => s + e.value);
    return [
      ...segments.take(4),
      LdsChartSegment(otherLabel, rest, color: LdsSeriesColor.neutral),
    ];
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final parts = _parts;
    final total = parts.fold<double>(0, (s, e) => s + math.max(0, e.value));
    String share(double v) =>
        total == 0 ? '0%' : '${(v / total * 100).round()}%';
    final colors = [
      for (var i = 0; i < parts.length; i++)
        (parts[i].color ?? LdsSeriesColor.at(i)).resolve(c),
    ];
    final alt = [
      for (final p in parts) '${p.name} ${format.format(p.value)} (${share(p.value)})'
    ].join(', ');

    final ring = SizedBox.square(
      dimension: size,
      child: Stack(
        alignment: Alignment.center,
        children: [
          CustomPaint(
            size: Size.square(size),
            painter: _DonutPainter(
              values: [for (final p in parts) math.max(0, p.value).toDouble()],
              colors: colors,
              track: c.bgTrack,
              stroke: size / 168 * (thin ? 10 : 14),
            ),
          ),
          Padding(
            padding: EdgeInsets.all(size * 0.2),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                FittedBox(
                  child: Text(
                    center ?? format.format(total),
                    style: LdsType.title2.copyWith(
                        color: c.textStrong, fontFeatures: tabular),
                  ),
                ),
                if (unit != null)
                  Text(unit!,
                      textAlign: TextAlign.center,
                      style: LdsType.footnote.copyWith(color: c.textSubtle)),
              ],
            ),
          ),
        ],
      ),
    );

    final list = Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        for (var i = 0; i < parts.length; i++)
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 6),
            child: Row(
              children: [
                Container(
                  width: 10,
                  height: 10,
                  decoration: BoxDecoration(
                    color: colors[i],
                    borderRadius: const BorderRadius.all(Radius.circular(3)),
                  ),
                ),
                const SizedBox(width: LdsSpace.s8),
                Expanded(
                  child: Text(parts[i].name,
                      style: LdsType.subhead.copyWith(color: c.textDefault)),
                ),
                Text(format.format(parts[i].value),
                    style: LdsType.subhead.copyWith(
                        fontWeight: FontWeight.w600,
                        color: c.textStrong,
                        fontFeatures: tabular)),
                SizedBox(
                  width: 48,
                  child: Text(share(parts[i].value),
                      textAlign: TextAlign.right,
                      style: LdsType.subhead.copyWith(
                          color: c.textSubtle, fontFeatures: tabular)),
                ),
              ],
            ),
          ),
      ],
    );

    return Semantics(
      container: true,
      label: semanticLabel,
      value: alt,
      child: ExcludeSemantics(
        child: LayoutBuilder(builder: (context, box) {
          if (box.maxWidth < 400) {
            return Column(
              mainAxisSize: MainAxisSize.min,
              children: [ring, const SizedBox(height: LdsSpace.s16), list],
            );
          }
          return Row(
            children: [
              ring,
              const SizedBox(width: LdsSpace.s24),
              Expanded(child: list),
            ],
          );
        }),
      ),
    );
  }
}

class _DonutPainter extends CustomPainter {
  _DonutPainter({
    required this.values,
    required this.colors,
    required this.track,
    required this.stroke,
  });

  final List<double> values;
  final List<Color> colors;
  final Color track;
  final double stroke;

  @override
  void paint(Canvas canvas, Size size) {
    final r = size.shortestSide / 2 - stroke / 2 - size.shortestSide * 0.02;
    final rect = Rect.fromCircle(center: size.center(Offset.zero), radius: r);
    final base = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = stroke;
    final total = values.fold<double>(0, (s, v) => s + v);
    if (total <= 0) {
      canvas.drawArc(rect, 0, math.pi * 2, false, base..color = track);
      return;
    }
    final nonZero = values.where((v) => v > 0).length;
    final gap = nonZero > 1 ? 0.02 : 0.0;
    var start = -math.pi / 2;
    for (var i = 0; i < values.length; i++) {
      final sweep = values[i] / total * math.pi * 2;
      if (sweep <= 0) continue;
      canvas.drawArc(rect, start + gap / 2, math.max(0.001, sweep - gap),
          false, Paint()
            ..style = PaintingStyle.stroke
            ..strokeWidth = stroke
            ..color = colors[i]);
      start += sweep;
    }
  }

  @override
  bool shouldRepaint(_DonutPainter old) =>
      old.values != values || old.colors != colors || old.stroke != stroke;
}
