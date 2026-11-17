import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../badge.dart';
import '_chart_utils.dart';
import 'chart_data.dart';

/// A half ring with the value in its opening: one figure against its known
/// range (kursi terisi, beban server), or, with [LdsGauge.segments], a row
/// of ticks shared between a few states.
///
/// Reads at a glance; the [unit] line under the number carries the detail.
class LdsGauge extends StatelessWidget {
  /// Creates a gauge for one [value] out of [max].
  const LdsGauge({
    super.key,
    required this.value,
    required this.semanticLabel,
    this.max = 100,
    this.tone = LdsTone.accent,
    this.center,
    this.unit,
    this.minLabel,
    this.maxLabel,
    this.width = 220,
    this.format = const LdsNumberFormat(),
  })  : segments = const <LdsChartSegment>[],
        ticks = 32;

  /// Creates a gauge whose [ticks] are shared out between [segments].
  const LdsGauge.segments({
    super.key,
    required this.segments,
    required this.semanticLabel,
    this.ticks = 32,
    this.center,
    this.unit,
    this.minLabel,
    this.maxLabel,
    this.width = 220,
    this.format = const LdsNumberFormat(),
  })  : value = 0,
        max = 0,
        tone = LdsTone.accent;

  /// The figure. Capped at [max] on the ring; say any overshoot in [unit].
  final double value;

  /// The end of the range.
  final double max;

  /// Color of the value arc: accent, success, warning or danger.
  final LdsTone tone;

  /// Parts sharing the ticks, in series order (at most four).
  final List<LdsChartSegment> segments;

  /// Number of ticks in the segments variant.
  final int ticks;

  /// The value and its range in words, for screen readers.
  final String semanticLabel;

  /// Text in the opening; defaults to the formatted value.
  final String? center;

  /// What the number counts ("78 dari 120 kursi").
  final String? unit;

  /// Label under the start of the ring.
  final String? minLabel;

  /// Label under the end of the ring.
  final String? maxLabel;

  /// Width of the gauge; the height follows the 200 by 112 shape.
  final double width;

  /// How the default [center] reads.
  final LdsNumberFormat format;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final isSegments = segments.isNotEmpty;
    final fraction = max <= 0 ? 0.0 : (value / max).clamp(0.0, 1.0);
    final total = segments.fold<double>(0, (s, e) => s + e.value);
    final scale = width / 200;
    return Semantics(
      container: true,
      label: semanticLabel,
      value: isSegments
          ? segments.map((s) => '${s.name} ${format.format(s.value)}').join(', ')
          : '${format.format(value)} dari ${format.format(max)}',
      child: ExcludeSemantics(
        child: SizedBox(
          width: width,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              SizedBox(
                width: width,
                height: 112 * scale,
                child: TweenAnimationBuilder<double>(
                  tween: Tween(end: fraction),
                  duration: context.ldsDuration(LdsMotion.considered),
                  curve: LdsMotion.inoutCurve,
                  builder: (context, f, _) => CustomPaint(
                    painter: _GaugePainter(
                      fraction: f,
                      color: LdsToneColors.of(c, tone).solid,
                      track: c.bgTrack,
                      ticks: isSegments ? ticks : 0,
                      tickColors: isSegments
                          ? _tickColors(c, total)
                          : const <Color>[],
                    ),
                    child: Align(
                      alignment: Alignment.bottomCenter,
                      child: Padding(
                        padding: EdgeInsets.symmetric(horizontal: 40 * scale),
                        child: Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            FittedBox(
                              child: Text(
                                center ?? format.format(value),
                                style: LdsType.title1.copyWith(
                                    color: c.textStrong,
                                    fontFeatures: tabular),
                              ),
                            ),
                            if (unit != null)
                              Text(unit!,
                                  textAlign: TextAlign.center,
                                  maxLines: 2,
                                  style: LdsType.footnote
                                      .copyWith(color: c.textSubtle)),
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
              ),
              if (minLabel != null || maxLabel != null)
                Padding(
                  padding: const EdgeInsets.only(top: 4),
                  child: Row(
                    children: [
                      Text(minLabel ?? '',
                          style: axisStyle(c).copyWith(fontSize: 12)),
                      const Spacer(),
                      Text(maxLabel ?? '',
                          style: axisStyle(c).copyWith(fontSize: 12)),
                    ],
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }

  List<Color> _tickColors(LdsColors c, double total) {
    final out = <Color>[];
    if (total <= 0) return List.filled(ticks, c.bgTrack);
    var acc = 0.0;
    for (var s = 0; s < segments.length; s++) {
      acc += segments[s].value;
      final until = (acc / total * ticks).round();
      final color = (segments[s].color ?? LdsSeriesColor.at(s)).resolve(c);
      while (out.length < until) {
        out.add(color);
      }
    }
    while (out.length < ticks) {
      out.add(c.bgTrack);
    }
    return out;
  }
}

class _GaugePainter extends CustomPainter {
  _GaugePainter({
    required this.fraction,
    required this.color,
    required this.track,
    required this.ticks,
    required this.tickColors,
  });

  final double fraction;
  final Color color;
  final Color track;
  final int ticks;
  final List<Color> tickColors;

  @override
  void paint(Canvas canvas, Size size) {
    final s = size.width / 200;
    final center = Offset(size.width / 2, 104 * s);
    final r = 88 * s;
    if (ticks > 0) {
      final p = Paint()
        ..strokeWidth = 4 * s
        ..strokeCap = StrokeCap.round;
      for (var i = 0; i < ticks; i++) {
        final a = math.pi + math.pi * (i + 0.5) / ticks;
        final dir = Offset(math.cos(a), math.sin(a));
        canvas.drawLine(center + dir * (r - 9 * s), center + dir * (r + 7 * s),
            p..color = tickColors[i]);
      }
      return;
    }
    final rect = Rect.fromCircle(center: center, radius: r);
    final stroke = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = 16 * s
      ..strokeCap = StrokeCap.round;
    canvas.drawArc(rect, math.pi, math.pi, false, stroke..color = track);
    if (fraction > 0) {
      canvas.drawArc(
          rect, math.pi, math.pi * fraction, false, stroke..color = color);
    }
  }

  @override
  bool shouldRepaint(_GaugePainter old) =>
      old.fraction != fraction ||
      old.color != color ||
      old.track != track ||
      old.tickColors != tickColors;
}
