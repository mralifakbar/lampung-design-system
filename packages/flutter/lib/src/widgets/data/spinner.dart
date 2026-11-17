import 'dart:math' as math;

import 'package:flutter/material.dart';

/// Eight spokes whose light appears to turn: work is in progress.
///
/// It keeps turning under reduced motion on purpose (stopping it would look
/// frozen). Show it only after about 300 ms of waiting.
class LdsSpinner extends StatefulWidget {
  /// Creates a 20 px spinner.
  const LdsSpinner({
    super.key,
    this.size = 20,
    this.color,
    this.semanticLabel = 'Memuat',
  });

  /// Creates the 32 px spinner for a panel that loads.
  const LdsSpinner.large({
    super.key,
    this.color,
    this.semanticLabel = 'Memuat',
  }) : size = 32;

  /// Box size.
  final double size;

  /// Spoke color. Defaults to the ambient text color.
  final Color? color;

  /// Announced label; null hides it (when nearby text already says it).
  final String? semanticLabel;

  @override
  State<LdsSpinner> createState() => _LdsSpinnerState();
}

class _LdsSpinnerState extends State<LdsSpinner>
    with SingleTickerProviderStateMixin {
  late final AnimationController _c = AnimationController(
    vsync: this,
    duration: const Duration(milliseconds: 800),
  )..repeat();

  @override
  void dispose() {
    _c.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final color = widget.color ?? DefaultTextStyle.of(context).style.color!;
    final spinner = SizedBox.square(
      dimension: widget.size,
      child: CustomPaint(
        painter: _SpokePainter(_c, color, widget.size >= 32),
      ),
    );
    if (widget.semanticLabel == null) return ExcludeSemantics(child: spinner);
    return Semantics(
      label: widget.semanticLabel,
      liveRegion: true,
      child: spinner,
    );
  }
}

class _SpokePainter extends CustomPainter {
  _SpokePainter(this.t, this.color, this.thick) : super(repaint: t);

  final Animation<double> t;
  final Color color;
  final bool thick;

  @override
  void paint(Canvas canvas, Size size) {
    final r = size.width / 2;
    final center = size.center(Offset.zero);
    final paint = Paint()
      ..strokeCap = StrokeCap.round
      ..strokeWidth = size.width * (thick ? 0.1 : 0.09);
    for (var i = 0; i < 8; i++) {
      // Each spoke fades from 1 to 0.18 over the cycle, 100 ms behind the
      // previous one.
      final phase = (t.value - i / 8) % 1.0;
      final opacity = 1 - 0.82 * phase;
      paint.color = color.withValues(alpha: color.a * opacity);
      final a = -math.pi / 2 + i * math.pi / 4;
      final dir = Offset(math.cos(a), math.sin(a));
      canvas.drawLine(center + dir * r * 0.45, center + dir * r * 0.9, paint);
    }
  }

  @override
  bool shouldRepaint(_SpokePainter old) =>
      old.color != color || old.thick != thick;
}
