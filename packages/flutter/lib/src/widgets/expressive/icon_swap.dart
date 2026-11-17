import 'dart:ui' as ui;

import 'package:flutter/widgets.dart';

import '../../motion.dart';
import '../../tokens.g.dart';
import '../icon.dart';

/// One glyph turning into another in place: the old one shrinks to half and
/// blurs away while the new one settles on the snappy spring.
///
/// For icons that say a new state (copied, playing, saved). The swap is
/// decorative: the button around it carries the meaning (its label and
/// selected state change with [swapped]). Toggling mid-swap reverses from
/// where it is. Under reduced motion it is a 120 ms cross-fade.
class LdsIconSwap extends StatefulWidget {
  /// Creates an icon swap.
  const LdsIconSwap({
    super.key,
    required this.icon,
    required this.swappedIcon,
    required this.swapped,
    this.size = 20,
    this.color,
    this.swappedColor,
    this.swappedFill = false,
  });

  /// The resting glyph (ligature name).
  final String icon;

  /// The glyph shown while [swapped].
  final String swappedIcon;

  /// Whether [swappedIcon] is shown.
  final bool swapped;

  /// Glyph size.
  final double size;

  /// Color of the resting glyph; defaults to the ambient icon color.
  final Color? color;

  /// Color of the swapped glyph; defaults to [color].
  final Color? swappedColor;

  /// Draw [swappedIcon] from the filled set, for an "on" state.
  final bool swappedFill;

  @override
  State<LdsIconSwap> createState() => _LdsIconSwapState();
}

class _LdsIconSwapState extends State<LdsIconSwap>
    with SingleTickerProviderStateMixin {
  late final AnimationController _c = AnimationController(
    vsync: this,
    duration: LdsMotion.snappySpringDuration,
    value: widget.swapped ? 1 : 0,
  );

  @override
  void didUpdateWidget(LdsIconSwap oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.swapped == widget.swapped) return;
    _c.duration = context.ldsReduceMotion
        ? LdsMotion.instant
        : LdsMotion.snappySpringDuration;
    if (widget.swapped) {
      _c.forward();
    } else {
      _c.reverse();
    }
  }

  @override
  void dispose() {
    _c.dispose();
    super.dispose();
  }

  Widget _layer(Widget glyph, double shown, bool reduce) {
    // shown: 0 = gone (scale 0.5, blur 4, transparent), 1 = at rest.
    final fadeEnd =
        LdsMotion.fast.inMicroseconds / LdsMotion.snappy.inMicroseconds;
    final opacity = reduce
        ? shown
        : LdsMotion.standardCurve.transform((shown / fadeEnd).clamp(0.0, 1.0));
    final scale = reduce ? 1.0 : 0.5 + 0.5 * LdsSpringCurve.snappy.transform(shown);
    final blur = reduce ? 0.0 : 4 * (1 - opacity);
    return Opacity(
      opacity: opacity,
      child: Transform.scale(
        scale: scale,
        child: ImageFiltered(
          enabled: blur > 0.01,
          imageFilter: ui.ImageFilter.blur(sigmaX: blur, sigmaY: blur),
          child: glyph,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final reduce = context.ldsReduceMotion;
    final a = LdsIcon(widget.icon, size: widget.size, color: widget.color);
    final b = LdsIcon(
      widget.swappedIcon,
      size: widget.size,
      color: widget.swappedColor ?? widget.color,
      fill: widget.swappedFill,
    );
    return ExcludeSemantics(
      child: SizedBox.square(
        dimension: widget.size,
        child: AnimatedBuilder(
          animation: _c,
          builder: (context, _) => Stack(
            alignment: Alignment.center,
            children: [
              _layer(a, 1 - _c.value, reduce),
              _layer(b, _c.value, reduce),
            ],
          ),
        ),
      ),
    );
  }
}
