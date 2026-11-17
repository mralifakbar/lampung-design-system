import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../badge.dart';

/// A score or completion as an arc from 12 o'clock, with the number in the
/// middle.
///
/// The arc eases to each new value over 480 ms; the number counts up once
/// over 900 ms. Under reduced motion both change at once (120 ms).
class LdsProgressRing extends StatelessWidget {
  /// Creates a progress ring.
  const LdsProgressRing({
    super.key,
    required this.value,
    this.size = 64,
    this.tone = LdsTone.accent,
    this.label,
    this.showValue = true,
    this.semanticLabel,
  });

  /// From 0 to 1.
  final double value;

  /// Diameter; the stroke scales with it.
  final double size;

  /// Arc color: accent for progress without judgment, success, warning or
  /// danger for a judged score.
  final LdsTone tone;

  /// Text in the middle in place of the percentage.
  final String? label;

  /// Shows the percentage (or [label]) in the middle.
  final bool showValue;

  /// What the ring measures, for example "Kelengkapan berkas".
  final String? semanticLabel;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final v = value.clamp(0.0, 1.0);
    final reduce = context.ldsReduceMotion;
    final arc = LdsToneColors.of(c, tone).solid;
    final stroke = size * 5 / 64;
    return Semantics(
      label: semanticLabel,
      value: '${(v * 100).round()}%',
      child: SizedBox.square(
        dimension: size,
        child: Stack(
          alignment: Alignment.center,
          children: [
            TweenAnimationBuilder<double>(
              tween: Tween(end: v),
              duration: reduce ? LdsMotion.instant : LdsMotion.considered,
              curve: reduce ? Curves.linear : LdsMotion.inoutCurve,
              builder: (context, x, _) => CustomPaint(
                size: Size.square(size),
                painter: _RingPainter(x, c.bgTrack, arc, stroke),
              ),
            ),
            if (showValue)
              ExcludeSemantics(
                child: label != null
                    ? Text(label!, style: _style(c))
                    : TweenAnimationBuilder<double>(
                        tween: Tween(begin: reduce ? v : 0, end: v),
                        duration: reduce
                            ? Duration.zero
                            : const Duration(milliseconds: 900),
                        curve: Curves.easeOutCubic,
                        builder: (context, x, _) =>
                            Text('${(x * 100).round()}%', style: _style(c)),
                      ),
              ),
          ],
        ),
      ),
    );
  }

  TextStyle _style(LdsColors c) => TextStyle(
        fontFamily: LdsType.family,
        fontSize: size * 15 / 64,
        height: 1,
        fontWeight: FontWeight.w600,
        color: c.textStrong,
        fontFeatures: const [FontFeature.tabularFigures()],
      );
}

class _RingPainter extends CustomPainter {
  _RingPainter(this.value, this.track, this.arc, this.stroke);

  final double value;
  final Color track;
  final Color arc;
  final double stroke;

  @override
  void paint(Canvas canvas, Size size) {
    final rect = Offset.zero & size;
    final r = rect.deflate(size.width * 5 / 64);
    final p = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = stroke
      ..strokeCap = StrokeCap.round;
    canvas.drawArc(r, 0, math.pi * 2, false, p..color = track);
    if (value > 0) {
      canvas.drawArc(
          r, -math.pi / 2, math.pi * 2 * value, false, p..color = arc);
    }
  }

  @override
  bool shouldRepaint(_RingPainter old) =>
      old.value != value || old.arc != arc || old.track != track;
}
