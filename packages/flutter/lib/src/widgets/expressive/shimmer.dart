import 'dart:ui' as ui;

import 'package:flutter/widgets.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';

/// A label for work in progress: a light band crosses the words every
/// 1.8 s while [active], then the text settles to the strong color over
/// 240 ms.
///
/// [child] is usually a [Text] or an [LdsTextMorph]; its own color is
/// replaced. Used by [LdsThinking] and [LdsToolCall]. Under reduced motion
/// the band stops and the text is solid.
class LdsShimmer extends StatefulWidget {
  /// Creates a shimmering label.
  const LdsShimmer({super.key, required this.child, this.active = true});

  /// The words.
  final Widget child;

  /// Whether work is still running.
  final bool active;

  @override
  State<LdsShimmer> createState() => _LdsShimmerState();
}

class _LdsShimmerState extends State<LdsShimmer> with TickerProviderStateMixin {
  late final AnimationController _band = AnimationController(
    vsync: this,
    duration: const Duration(milliseconds: 1800),
  );
  late final AnimationController _settle = AnimationController(
    vsync: this,
    duration: LdsMotion.standard,
    value: widget.active ? 0 : 1,
  );

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _sync();
  }

  @override
  void didUpdateWidget(LdsShimmer oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.active != widget.active) {
      _settle.duration = context.ldsDuration(LdsMotion.standard);
      if (widget.active) {
        _settle.reverse();
      } else {
        _settle.forward();
      }
    }
    _sync();
  }

  void _sync() {
    final run = widget.active && !context.ldsReduceMotion;
    if (run && !_band.isAnimating) {
      _band.repeat();
    } else if (!run && _band.isAnimating) {
      _band.stop();
    }
  }

  @override
  void dispose() {
    _band.dispose();
    _settle.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final reduce = context.ldsReduceMotion;
    return AnimatedBuilder(
      animation: Listenable.merge([_band, _settle]),
      child: widget.child,
      builder: (context, child) => ShaderMask(
        blendMode: BlendMode.srcIn,
        shaderCallback: (bounds) {
          final s = LdsMotion.standardCurve.transform(_settle.value);
          final base = Color.lerp(c.textSubtle, c.textStrong, s)!;
          // The band travels from 30 % before the start to 30 % past the
          // end; parked off the text when it does not run.
          final running = widget.active && !reduce;
          final center = running ? -0.3 + 1.6 * _band.value : -2.0;
          final w = bounds.width == 0 ? 1.0 : bounds.width;
          return ui.Gradient.linear(
            Offset((center - 0.26) * w, 0),
            Offset((center + 0.26) * w, 0),
            [base, c.textStrong, base],
            const [0, 0.5, 1],
          );
        },
        child: child,
      ),
    );
  }
}
