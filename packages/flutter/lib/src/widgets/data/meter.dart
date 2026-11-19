import 'package:material_ui/material_ui.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';

/// How full a segmented [LdsMeter] reads.
enum LdsMeterLevel {
  /// Normal: accent segments.
  normal,

  /// Near the limit: warning segments.
  warn,

  /// At or over the limit: danger segments.
  full,
}

/// A reading in equal segments: storage used, quota, password strength.
///
/// Filled segments are rounded to the nearest one. The level follows
/// [warnAt] and 100 % unless [level] is set. Several segments that change
/// together fade their color together, without a sweep.
class LdsMeter extends StatelessWidget {
  /// Creates a meter.
  const LdsMeter({
    super.key,
    required this.value,
    this.segments = 10,
    this.level,
    this.warnAt = 0.8,
    this.label,
    this.valueLabel,
  });

  /// From 0 to 1.
  final double value;

  /// Number of segments; four for password strength.
  final int segments;

  /// Forces a level; null derives it from [value].
  final LdsMeterLevel? level;

  /// Value from which the meter turns to warning.
  final double warnAt;

  /// Label above the meter.
  final String? label;

  /// Value in words above the meter ("8,1 dari 10 GB", "Penuh").
  final String? valueLabel;

  /// The level shown for the current value.
  LdsMeterLevel get effectiveLevel =>
      level ??
      (value >= 1
          ? LdsMeterLevel.full
          : value >= warnAt
          ? LdsMeterLevel.warn
          : LdsMeterLevel.normal);

  /// How many segments are on.
  int get filled => (value.clamp(0.0, 1.0) * segments).round();

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final on = switch (effectiveLevel) {
      LdsMeterLevel.normal => c.accent,
      LdsMeterLevel.warn => c.warning,
      LdsMeterLevel.full => c.danger,
    };
    final reduce = context.ldsReduceMotion;
    final row = Row(
      children: [
        for (var i = 0; i < segments; i++) ...[
          if (i > 0) const SizedBox(width: 3),
          Expanded(
            child: AnimatedContainer(
              duration: reduce ? LdsMotion.instant : LdsMotion.standard,
              curve: reduce ? Curves.linear : LdsMotion.standardCurve,
              height: 8,
              decoration: BoxDecoration(
                color: i < filled ? on : c.bgTrack,
                borderRadius: const BorderRadius.all(Radius.circular(2)),
              ),
            ),
          ),
        ],
      ],
    );
    return Semantics(
      label: label,
      value: valueLabel ?? '${(value * 100).round()}%',
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        mainAxisSize: MainAxisSize.min,
        children: [
          if (label != null || valueLabel != null) ...[
            ExcludeSemantics(
              child: Row(
                children: [
                  Expanded(
                    child: Text(
                      label ?? '',
                      style: LdsType.footnote.copyWith(color: c.textSubtle),
                    ),
                  ),
                  if (valueLabel != null)
                    Text(
                      valueLabel!,
                      style: LdsType.footnote.copyWith(
                        color: c.textStrong,
                        fontWeight: FontWeight.w600,
                        fontFeatures: const [FontFeature.tabularFigures()],
                      ),
                    ),
                ],
              ),
            ),
            const SizedBox(height: 8),
          ],
          row,
        ],
      ),
    );
  }
}
