import 'package:flutter/material.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../icon.dart';
import '../pressable.dart';

/// Look of an [LdsInverseButton].
enum LdsInverseButtonVariant {
  /// A quiet tint on the inverse surface (Skip, Undo, Retry).
  tint,

  /// The accent, for the one forward action (Next, Done).
  accent,

  /// The danger color, for a destructive bulk action.
  danger,
}

/// A small button for inverse surfaces: toast, banner, coachmark and the
/// selection bar. 32 px tall inside a 44 by 44 hit area.
class LdsInverseButton extends StatelessWidget {
  /// Creates an inverse button.
  const LdsInverseButton({
    super.key,
    required this.label,
    required this.onPressed,
    this.icon,
    this.variant = LdsInverseButtonVariant.tint,
    this.height = 32,
    this.showLabel = true,
    this.autofocus = false,
    this.focusNode,
  });

  /// Visible text, and the screen reader label when [showLabel] is false.
  final String label;

  /// Called when pressed. Null disables the button.
  final VoidCallback? onPressed;

  /// Optional leading icon (ligature name).
  final String? icon;

  /// Visual weight.
  final LdsInverseButtonVariant variant;

  /// Visual height.
  final double height;

  /// Show [label] next to [icon]. When false only the icon shows.
  final bool showLabel;

  /// Take focus when first built.
  final bool autofocus;

  /// Focus node.
  final FocusNode? focusNode;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    const radius = BorderRadius.all(Radius.circular(9));
    final fg = switch (variant) {
      LdsInverseButtonVariant.tint => c.textInverse,
      LdsInverseButtonVariant.accent => c.textOnAccent,
      LdsInverseButtonVariant.danger => Colors.white,
    };
    return LdsPressable(
      onPressed: onPressed,
      borderRadius: radius,
      semanticLabel: label,
      excludeChildSemantics: true,
      autofocus: autofocus,
      focusNode: focusNode,
      builder: (context, state) {
        final active = state.hovered || state.pressed;
        final bg = switch (variant) {
          LdsInverseButtonVariant.tint => active
              ? Color.alphaBlend(c.onInverseTint, c.onInverseTint)
              : c.onInverseTint,
          LdsInverseButtonVariant.accent => active ? c.accentHover : c.accent,
          LdsInverseButtonVariant.danger =>
            active ? Color.lerp(c.danger, Colors.black, 0.08)! : c.danger,
        };
        return AnimatedContainer(
          duration: context.ldsDuration(LdsMotion.instant),
          height: height,
          padding: EdgeInsets.symmetric(
              horizontal: showLabel ? 12 : (height - 20) / 2),
          decoration: BoxDecoration(color: bg, borderRadius: radius),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              if (icon != null) LdsIcon(icon!, size: 18, color: fg),
              if (icon != null && showLabel) const SizedBox(width: 6),
              if (showLabel)
                Text(
                  label,
                  maxLines: 1,
                  style: LdsType.footnote.copyWith(
                    color: fg,
                    fontWeight: FontWeight.w600,
                    height: 1,
                  ),
                ),
            ],
          ),
        );
      },
    );
  }
}
