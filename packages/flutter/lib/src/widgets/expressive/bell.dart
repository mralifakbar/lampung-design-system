import 'dart:math' as math;

import 'package:flutter/widgets.dart';

import '../../motion.dart';
import '../../tokens.g.dart';
import '../icon.dart';

/// The notifications bell, which rings once (a 640 ms swing from its top
/// that settles) when notifications turn on or a new one arrives.
///
/// Raise [rings] by one for each event; a new event restarts the ring from
/// the start. It never loops and never rings on first build. The bell is
/// decorative: the switch or button around it says what it is
/// ("Notifikasi, 2 belum dibaca"). Under reduced motion it does not ring.
class LdsBell extends StatefulWidget {
  /// Creates a bell.
  const LdsBell({
    super.key,
    this.rings = 0,
    this.size = 22,
    this.color,
    this.fill = false,
  });

  /// How many times the bell has been asked to ring; an increase rings it.
  final int rings;

  /// Glyph size.
  final double size;

  /// Glyph color; defaults to the ambient icon color.
  final Color? color;

  /// Draw the filled bell.
  final bool fill;

  @override
  State<LdsBell> createState() => _LdsBellState();
}

class _LdsBellState extends State<LdsBell> with SingleTickerProviderStateMixin {
  late final AnimationController _c = AnimationController(
    vsync: this,
    duration: const Duration(milliseconds: 640),
  );

  // Degrees at each step of the swing, shrinking to rest like a real bell.
  static final Animatable<double> _swing = TweenSequence<double>([
    TweenSequenceItem(tween: Tween(begin: 0, end: 15), weight: 15),
    TweenSequenceItem(tween: Tween(begin: 15, end: -12), weight: 17),
    TweenSequenceItem(tween: Tween(begin: -12, end: 8), weight: 18),
    TweenSequenceItem(tween: Tween(begin: 8, end: -4), weight: 18),
    TweenSequenceItem(tween: Tween(begin: -4, end: 2), weight: 16),
    TweenSequenceItem(tween: Tween(begin: 2, end: 0), weight: 16),
  ]).chain(CurveTween(curve: LdsMotion.standardCurve));

  @override
  void didUpdateWidget(LdsBell oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.rings > oldWidget.rings && !context.ldsReduceMotion) {
      _c.forward(from: 0);
    }
  }

  @override
  void dispose() {
    _c.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _c,
      child: LdsIcon(
        'notifications',
        size: widget.size,
        color: widget.color,
        fill: widget.fill,
      ),
      builder: (context, child) => Transform.rotate(
        angle: _swing.evaluate(_c) * math.pi / 180,
        // Pivot at the top of the bell (50 % 10 %).
        alignment: const Alignment(0, -0.8),
        child: child,
      ),
    );
  }
}
