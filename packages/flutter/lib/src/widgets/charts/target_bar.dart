import 'package:material_ui/material_ui.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../badge.dart';
import '_chart_utils.dart';

/// A horizontal bar for progress toward a goal: the fill is where you are,
/// a marker shows where you should be (the goal, or today's pace), and an
/// optional tint ahead of the fill shows the forecast.
///
/// Words above say the value against the goal. Fractions are of the whole
/// track (0 to 1). The fill turns success once it reaches the marker,
/// unless [tone] is set.
class LdsTargetBar extends StatelessWidget {
  /// Creates a target bar.
  const LdsTargetBar({
    super.key,
    required this.label,
    required this.valueText,
    required this.value,
    required this.semanticLabel,
    this.target = 1,
    this.forecast,
    this.markLabel = 'Target',
    this.tone,
    this.footStart,
    this.footEnd,
  });

  /// What is measured ("Izin terbit").
  final String label;

  /// The value against the goal ("842 dari 1.000").
  final String valueText;

  /// Fill position, 0 to 1; capped at 1.
  final double value;

  /// Marker position, 0 to 1.
  final double target;

  /// Projected end value, 0 to 1, drawn as a tint behind the fill.
  final double? forecast;

  /// Words above the marker.
  final String markLabel;

  /// Fill color: accent, success or warning. Defaults to accent, or success
  /// once [value] reaches [target].
  final LdsTone? tone;

  /// Start of the footer ("Perkiraan 970 pada 31 Des").
  final String? footStart;

  /// End of the footer ("45 hari lagi").
  final String? footEnd;

  /// The values in words, for screen readers.
  final String semanticLabel;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final v = value.clamp(0.0, 1.0);
    final t = target.clamp(0.0, 1.0);
    final fill = LdsToneColors.of(
      c,
      tone ?? (value >= target ? LdsTone.success : LdsTone.accent),
    ).solid;
    final dur = context.ldsDuration(LdsMotion.considered);
    final small = LdsType.footnote.copyWith(color: c.textSubtle);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      mainAxisSize: MainAxisSize.min,
      children: [
        Row(
          children: [
            Expanded(
              child: Text(
                label,
                style: LdsType.subhead.copyWith(color: c.textDefault),
              ),
            ),
            Text(
              valueText,
              style: LdsType.subhead.copyWith(
                fontWeight: FontWeight.w600,
                color: c.textStrong,
                fontFeatures: tabular,
              ),
            ),
          ],
        ),
        const SizedBox(height: 20),
        Semantics(
          label: semanticLabel,
          image: true,
          child: SizedBox(
            height: 22,
            child: LayoutBuilder(
              builder: (context, box) {
                final w = box.maxWidth;
                final markX = w * t;
                final labelAtEnd = t >= 0.9;
                return Stack(
                  clipBehavior: Clip.none,
                  children: [
                    Positioned(
                      left: 0,
                      right: 0,
                      top: 5,
                      height: 12,
                      child: Container(
                        decoration: BoxDecoration(
                          color: c.bgTrack,
                          borderRadius: const BorderRadius.all(
                            Radius.circular(6),
                          ),
                        ),
                      ),
                    ),
                    if (forecast != null)
                      AnimatedPositioned(
                        duration: dur,
                        curve: LdsMotion.inoutCurve,
                        left: 0,
                        top: 5,
                        height: 12,
                        width: w * forecast!.clamp(0.0, 1.0),
                        child: Container(
                          decoration: BoxDecoration(
                            color: fill.withValues(alpha: 0.24),
                            borderRadius: const BorderRadius.all(
                              Radius.circular(6),
                            ),
                          ),
                        ),
                      ),
                    AnimatedPositioned(
                      duration: dur,
                      curve: LdsMotion.inoutCurve,
                      left: 0,
                      top: 5,
                      height: 12,
                      width: w * v,
                      child: Container(
                        decoration: BoxDecoration(
                          color: fill,
                          borderRadius: const BorderRadius.all(
                            Radius.circular(6),
                          ),
                        ),
                      ),
                    ),
                    AnimatedPositioned(
                      duration: dur,
                      curve: LdsMotion.inoutCurve,
                      left: markX - 1,
                      top: 0,
                      width: 2,
                      height: 22,
                      child: Container(
                        decoration: BoxDecoration(
                          color: c.textStrong,
                          borderRadius: const BorderRadius.all(
                            Radius.circular(1),
                          ),
                        ),
                      ),
                    ),
                    Positioned(
                      left: labelAtEnd ? null : markX - 60,
                      right: labelAtEnd ? w - markX - 1 : null,
                      width: labelAtEnd ? null : 120,
                      bottom: 24,
                      child: ExcludeSemantics(
                        child: Text(
                          markLabel,
                          textAlign: labelAtEnd
                              ? TextAlign.right
                              : TextAlign.center,
                          style: LdsType.footnote.copyWith(
                            fontSize: 12,
                            fontWeight: FontWeight.w500,
                            color: c.textStrong,
                            fontFeatures: tabular,
                          ),
                        ),
                      ),
                    ),
                  ],
                );
              },
            ),
          ),
        ),
        if (footStart != null || footEnd != null) ...[
          const SizedBox(height: LdsSpace.s8),
          Row(
            children: [
              Expanded(child: Text(footStart ?? '', style: small)),
              Text(footEnd ?? '', style: small),
            ],
          ),
        ],
      ],
    );
  }
}
