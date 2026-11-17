import 'package:flutter/material.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../icon.dart';
import '_chart_utils.dart';

/// Which way a number moved.
enum LdsTrendDirection {
  /// It went up.
  up,

  /// It went down.
  down,

  /// It stayed the same.
  flat,
}

/// What a change means. Separate from the direction, because a falling
/// number can be good news (fewer complaints).
enum LdsTrendMeaning {
  /// Good news: success text.
  good,

  /// Bad news: danger text.
  bad,

  /// Neither: subtle text.
  neutral,
}

/// The change next to a figure: an arrow for the direction, a color for
/// what it means, the amount in tabular figures, and a sentence for screen
/// readers.
class LdsTrendDelta extends StatelessWidget {
  /// Creates a trend delta.
  const LdsTrendDelta(
    this.amount, {
    super.key,
    required this.direction,
    this.meaning = LdsTrendMeaning.neutral,
    this.semanticLabel,
    this.note,
    this.pill = false,
  });

  /// The signed amount, already formatted ("+12,5%", "−3").
  final String amount;

  /// Arrow direction.
  final LdsTrendDirection direction;

  /// Color, from what the number means.
  final LdsTrendMeaning meaning;

  /// The words the arrow and color stand for ("naik dari bulan lalu").
  /// Defaults to "naik", "turun" or "tetap".
  final String? semanticLabel;

  /// A visible comparison after the amount ("vs Oktober").
  final String? note;

  /// On its tint, 22 px tall, beside a large figure.
  final bool pill;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final color = switch (meaning) {
      LdsTrendMeaning.good => c.successText,
      LdsTrendMeaning.bad => c.dangerText,
      LdsTrendMeaning.neutral => c.textSubtle,
    };
    final tint = switch (meaning) {
      LdsTrendMeaning.good => c.successTint,
      LdsTrendMeaning.bad => c.dangerTint,
      LdsTrendMeaning.neutral => c.neutralTint,
    };
    final turns = switch (direction) {
      LdsTrendDirection.up => 0.0,
      LdsTrendDirection.down => 0.5,
      LdsTrendDirection.flat => 0.25,
    };
    final spoken = semanticLabel ??
        switch (direction) {
          LdsTrendDirection.up => 'naik',
          LdsTrendDirection.down => 'turun',
          LdsTrendDirection.flat => 'tetap',
        };
    final content = Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        AnimatedRotation(
          turns: turns,
          duration: context.ldsDuration(LdsMotion.smooth),
          curve: LdsSpringCurve.smooth,
          child: LdsIcon('arrow_upward', size: pill ? 14 : 16, color: color),
        ),
        const SizedBox(width: 2),
        Text(
          amount,
          style: LdsType.footnote.copyWith(
            fontSize: pill ? 12 : 13,
            fontWeight: FontWeight.w500,
            color: color,
            fontFeatures: tabular,
          ),
        ),
        if (note != null) ...[
          const SizedBox(width: 4),
          Text(note!,
              style: LdsType.footnote.copyWith(
                  fontWeight: FontWeight.w400, color: c.textMuted)),
        ],
      ],
    );
    return Semantics(
      label: '$amount $spoken${note == null ? '' : ', $note'}',
      excludeSemantics: true,
      child: pill
          ? Container(
              height: 22,
              padding: const EdgeInsets.only(left: 5, right: 7),
              decoration: BoxDecoration(
                color: tint,
                borderRadius:
                    const BorderRadius.all(Radius.circular(LdsRadius.xs)),
              ),
              child: content,
            )
          : ConstrainedBox(
              constraints: const BoxConstraints(minHeight: 18),
              child: content,
            ),
    );
  }
}
