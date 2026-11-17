import 'package:flutter/material.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../icon.dart';
import '../pressable.dart';

/// A text link to another place: "Lihat syarat permohonan".
///
/// The underline appears on hover. [external] adds a north-east arrow and
/// [externalHint] to the announced label, for another site or a file that
/// opens elsewhere.
class LdsLink extends StatelessWidget {
  /// Creates a link.
  const LdsLink(
    this.label, {
    super.key,
    required this.onTap,
    this.external = false,
    this.externalHint = 'membuka situs lain',
    this.fontSize = 15,
  });

  /// The destination, in words.
  final String label;

  /// Opens the destination.
  final VoidCallback? onTap;

  /// Another site or a file.
  final bool external;

  /// Added to the announced label when [external] is set.
  final String externalHint;

  /// Text size.
  final double fontSize;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    return Semantics(
      link: true,
      child: LdsPressable(
        onPressed: onTap,
        pressedScale: 1,
        borderRadius: const BorderRadius.all(Radius.circular(3)),
        semanticLabel: external ? '$label, $externalHint' : label,
        excludeChildSemantics: true,
        builder: (context, state) {
          final underline = state.hovered || state.focused
              ? c.accentText
              : c.accentText.withAlpha(0);
          return TweenAnimationBuilder<Color?>(
            tween: ColorTween(end: underline),
            duration: context.ldsDuration(LdsMotion.fast),
            curve: LdsMotion.standardCurve,
            builder: (context, color, _) => Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Flexible(
                  child: Text(
                    label,
                    style: TextStyle(
                      fontFamily: LdsType.family,
                      fontSize: fontSize,
                      fontWeight: FontWeight.w500,
                      color: c.accentText,
                      decoration: TextDecoration.underline,
                      decorationColor: color,
                      decorationThickness: 1.5,
                    ),
                  ),
                ),
                if (external) ...[
                  const SizedBox(width: 2),
                  LdsIcon('north_east', size: fontSize, color: c.accentText),
                ],
              ],
            ),
          );
        },
      ),
    );
  }
}
