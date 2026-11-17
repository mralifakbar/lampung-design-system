import 'package:flutter/material.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../icon.dart';
import '../pressable.dart';

/// One round accent button that floats over the content of a phone screen
/// for the action people come to that screen to do: new report, add
/// expense. It is the only resting control that casts a shadow.
///
/// Place it with [Scaffold.floatingActionButton] or a [Positioned]. Set
/// [visible] to false to hide it while scrolling down: it slides 24 px down
/// and fades. It never pulses, bounces or rotates at rest.
class LdsFloatingAction extends StatelessWidget {
  /// Creates a floating action button.
  const LdsFloatingAction({
    super.key,
    required this.icon,
    required this.semanticLabel,
    required this.onPressed,
    this.visible = true,
  });

  /// Ligature name, see [LdsIcon].
  final String icon;

  /// The action in words ("Buat laporan"); read aloud and shown as tooltip.
  final String semanticLabel;

  /// Called when pressed.
  final VoidCallback? onPressed;

  /// Shown; false slides it away.
  final bool visible;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    const size = 56.0;
    final button = LdsPressable(
      onPressed: onPressed,
      pressedScale: 0.9,
      borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.pill)),
      semanticLabel: semanticLabel,
      excludeChildSemantics: true,
      tooltip: semanticLabel,
      builder: (context, state) {
        final bg = state.pressed
            ? c.accentPressed
            : (state.hovered ? c.accentHover : c.accent);
        return AnimatedContainer(
          duration: context.ldsDuration(LdsMotion.fast),
          width: size,
          height: size,
          alignment: Alignment.center,
          decoration: BoxDecoration(
            color: bg,
            shape: BoxShape.circle,
            boxShadow: context.ldsShadows.md,
          ),
          child: LdsIcon(icon, size: 24, color: c.textOnAccent),
        );
      },
    );
    return AnimatedSlide(
      offset: visible ? Offset.zero : const Offset(0, 24 / size),
      duration: context.ldsDuration(
          visible ? LdsMotion.smoothSpringDuration : LdsMotion.exit),
      curve: visible ? LdsSpringCurve.smooth : LdsMotion.exitCurve,
      child: AnimatedOpacity(
        opacity: visible ? 1 : 0,
        duration:
            context.ldsDuration(visible ? LdsMotion.fast : LdsMotion.exit),
        curve: visible ? LdsMotion.enterCurve : LdsMotion.exitCurve,
        child: IgnorePointer(
          ignoring: !visible,
          child: ExcludeSemantics(excluding: !visible, child: button),
        ),
      ),
    );
  }
}
