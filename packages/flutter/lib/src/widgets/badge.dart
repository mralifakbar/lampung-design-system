import 'package:material_ui/material_ui.dart';

import '../theme.dart';
import '../tokens.g.dart';
import 'icon.dart';

/// Meaning of an [LdsBadge] or [LdsAlert] color.
enum LdsTone {
  /// No particular state.
  neutral,

  /// Selected, current, informational.
  accent,

  /// Done, approved, healthy.
  success,

  /// Needs attention soon.
  warning,

  /// Failed, overdue, rejected.
  danger,

  /// Identity and recognition (siger gold). Not a status.
  gold,
}

/// Colors for a tone in the current appearance.
@immutable
class LdsToneColors {
  /// Creates a tone color set.
  const LdsToneColors(this.solid, this.text, this.tint);

  /// The solid color (icons, bars).
  final Color solid;

  /// Text that holds 4.5:1 on [tint].
  final Color text;

  /// The quiet background.
  final Color tint;

  /// Resolves [tone] against [c].
  factory LdsToneColors.of(LdsColors c, LdsTone tone) {
    switch (tone) {
      case LdsTone.neutral:
        return LdsToneColors(c.neutral, c.neutralText, c.neutralTint);
      case LdsTone.accent:
        return LdsToneColors(c.accent, c.accentText, c.accentTint);
      case LdsTone.success:
        return LdsToneColors(c.success, c.successText, c.successTint);
      case LdsTone.warning:
        return LdsToneColors(c.warning, c.warningText, c.warningTint);
      case LdsTone.danger:
        return LdsToneColors(c.danger, c.dangerText, c.dangerTint);
      case LdsTone.gold:
        return LdsToneColors(c.gold, c.goldText, c.goldTint);
    }
  }
}

/// The state of a record in a row, card or cell: Draf, Diproses, Selesai.
///
/// Status tones always come with words; add an [icon] when color is the
/// main difference between two badges.
class LdsBadge extends StatelessWidget {
  /// Creates a badge.
  const LdsBadge(
    this.label, {
    super.key,
    this.tone = LdsTone.neutral,
    this.icon,
  });

  /// Text.
  final String label;

  /// Meaning.
  final LdsTone tone;

  /// Optional leading icon (ligature name).
  final String? icon;

  @override
  Widget build(BuildContext context) {
    final t = LdsToneColors.of(context.lds, tone);
    return Container(
      constraints: const BoxConstraints(minHeight: 22),
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
      decoration: BoxDecoration(
        color: t.tint,
        borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.xs)),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (icon != null) ...[
            LdsIcon(icon!, size: 14, color: t.text),
            const SizedBox(width: 5),
          ],
          Flexible(
            child: Text(
              label,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: TextStyle(
                fontFamily: LdsType.family,
                fontSize: 12,
                height: 16 / 12,
                fontWeight: FontWeight.w500,
                color: t.text,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
