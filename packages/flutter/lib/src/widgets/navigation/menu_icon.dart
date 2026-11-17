import 'dart:math' as math;

import 'package:flutter/widgets.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../pressable.dart';

/// Three bars that fold into a close icon when [open] and unfold when it
/// closes: the outer bars meet and turn 45 degrees, the middle one shrinks
/// away.
///
/// Put it inside a button that reports its expanded state, for example the
/// menu toggle of [LdsTopNav]. It is decorative; the button carries the label.
class LdsMenuIcon extends StatelessWidget {
  /// Creates a menu icon.
  const LdsMenuIcon({super.key, required this.open, this.color});

  /// Folded into a close icon.
  final bool open;

  /// Bar color. Defaults to strong text.
  final Color? color;

  @override
  Widget build(BuildContext context) {
    final color = this.color ?? context.lds.textStrong;
    return ExcludeSemantics(
      child: TweenAnimationBuilder<double>(
        tween: Tween<double>(end: open ? 1 : 0),
        duration: context.ldsDuration(LdsMotion.snappySpringDuration),
        curve: LdsSpringCurve.snappy,
        builder: (context, t, _) => CustomPaint(
          size: const Size(18, 14),
          painter: _BurgerPainter(t: t, color: color),
        ),
      ),
    );
  }
}

class _BurgerPainter extends CustomPainter {
  _BurgerPainter({required this.t, required this.color});

  final double t;
  final Color color;

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()..color = color;
    const bar = 2.0;
    final w = size.width;
    void drawBar(double top, double angle, double scaleX, double opacity) {
      if (opacity <= 0) return;
      canvas.save();
      canvas.translate(w / 2, top + bar / 2);
      canvas.rotate(angle);
      canvas.scale(scaleX, 1);
      canvas.drawRRect(
        RRect.fromRectAndRadius(
          Rect.fromCenter(center: Offset.zero, width: w, height: bar),
          const Radius.circular(1),
        ),
        paint..color = color.withValues(alpha: color.a * opacity),
      );
      canvas.restore();
    }

    final mid = (size.height - bar) / 2;
    drawBar(mid * t, math.pi / 4 * t, 1, 1);
    drawBar(mid, 0, 1 - 0.8 * t, (1 - t * 1.6).clamp(0.0, 1.0));
    drawBar((size.height - bar) - mid * t, -math.pi / 4 * t, 1, 1);
  }

  @override
  bool shouldRepaint(_BurgerPainter oldDelegate) =>
      oldDelegate.t != t || oldDelegate.color != color;
}

/// The standard menu toggle: an [LdsMenuIcon] in a 44 px button that reports
/// whether its menu is expanded.
class LdsMenuButton extends StatelessWidget {
  /// Creates a menu toggle.
  const LdsMenuButton({
    super.key,
    required this.open,
    required this.onPressed,
    this.openLabel = 'Buka menu',
    this.closeLabel = 'Tutup menu',
    this.focusNode,
  });

  /// Whether the menu is open.
  final bool open;

  /// Called when pressed.
  final VoidCallback? onPressed;

  /// Screen reader label while closed.
  final String openLabel;

  /// Screen reader label while open.
  final String closeLabel;

  /// Focus node, so a closing layer can return focus here.
  final FocusNode? focusNode;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    return MergeSemantics(
        child: Semantics(
      expanded: open,
      child: LdsPressable(
        onPressed: onPressed,
        focusNode: focusNode,
        pressedScale: 0.9,
        borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.pill)),
        semanticLabel: open ? closeLabel : openLabel,
        excludeChildSemantics: true,
        builder: (context, state) => AnimatedContainer(
          duration: context.ldsDuration(LdsMotion.fast),
          width: LdsSize.touchMin,
          height: LdsSize.touchMin,
          alignment: Alignment.center,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: state.pressed
                ? c.bgTintStrong
                : (state.hovered ? c.bgTint : const Color(0x00000000)),
          ),
          child: LdsMenuIcon(open: open),
        ),
      ),
    ));
  }
}
