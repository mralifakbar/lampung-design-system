import 'package:flutter/semantics.dart';
import 'package:material_ui/material_ui.dart';

import '../../theme.dart';
import '../../tokens.g.dart';
import '../icon.dart';

/// One fact in an [LdsFeatureRow]: an icon and a short sentence.
@immutable
class LdsFeaturePoint {
  /// Creates a feature point.
  const LdsFeaturePoint({required this.icon, required this.text});

  /// Ligature name of the leading icon.
  final String icon;

  /// The fact.
  final String text;
}

/// One feature told beside its proof: a title, a paragraph and two or three
/// points on one side, a live [stage] (an [LdsFeatureStage]) on the other.
///
/// From 900 px the copy takes 5 of 12 columns and the stage 7; [reverse]
/// puts the stage first on wide screens only. The copy always comes first
/// for screen readers and on phones.
class LdsFeatureRow extends StatelessWidget {
  /// Creates a feature row.
  const LdsFeatureRow({
    super.key,
    required this.title,
    required this.stage,
    this.eyebrow,
    this.body,
    this.points = const [],
    this.caption,
    this.reverse = false,
  });

  /// The feature in a few words.
  final String title;

  /// The proof: live components.
  final Widget stage;

  /// A short label above the title.
  final String? eyebrow;

  /// The paragraph.
  final String? body;

  /// Two or three facts.
  final List<LdsFeaturePoint> points;

  /// A footnote under the stage: what can be tried, or that the content is
  /// an example.
  final String? caption;

  /// Stage first on wide screens.
  final bool reverse;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    return LayoutBuilder(
      builder: (context, constraints) {
        final w = constraints.maxWidth;
        final titleSize = (w * 0.026).clamp(24.0, 32.0);
        final copy = Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (eyebrow != null) ...[
              Text(
                eyebrow!,
                style: LdsType.caption.copyWith(color: c.textSubtle),
              ),
              const SizedBox(height: LdsSpace.s8),
            ],
            Semantics(
              header: true,
              child: Text(
                title,
                style: TextStyle(
                  fontFamily: LdsType.family,
                  fontSize: titleSize,
                  height: 1.15,
                  fontWeight: FontWeight.w600,
                  letterSpacing: -0.026 * titleSize,
                  color: c.textStrong,
                ),
              ),
            ),
            if (body != null) ...[
              const SizedBox(height: LdsSpace.s16),
              ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 52 * 8.5),
                child: Text(
                  body!,
                  style: TextStyle(
                    fontFamily: LdsType.family,
                    fontSize: 16,
                    height: 25 / 16,
                    letterSpacing: -0.096,
                    color: c.textSubtle,
                  ),
                ),
              ),
            ],
            if (points.isNotEmpty) ...[
              const SizedBox(height: LdsSpace.s20),
              for (var i = 0; i < points.length; i++) ...[
                if (i > 0) const SizedBox(height: LdsSpace.s10),
                Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Padding(
                      padding: const EdgeInsets.only(top: 1),
                      child: LdsIcon(
                        points[i].icon,
                        size: 18,
                        color: c.textStrong,
                      ),
                    ),
                    const SizedBox(width: LdsSpace.s10),
                    Expanded(
                      child: Text(
                        points[i].text,
                        style: LdsType.subhead.copyWith(color: c.textDefault),
                      ),
                    ),
                  ],
                ),
              ],
            ],
          ],
        );
        final stageColumn = Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            stage,
            if (caption != null) ...[
              const SizedBox(height: LdsSpace.s12),
              Text(
                caption!,
                style: LdsType.footnote.copyWith(color: c.textSubtle),
              ),
            ],
          ],
        );
        final gap = (w * 0.04).clamp(LdsSpace.s28, LdsSpace.s56);
        if (w < 900) {
          return Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              copy,
              SizedBox(height: gap),
              stageColumn,
            ],
          );
        }
        // Visual order only: the sort keys keep the copy first for screen
        // readers when the stage is drawn on the left.
        final copyCell = Expanded(
          flex: 5,
          child: Semantics(sortKey: const OrdinalSortKey(0), child: copy),
        );
        final stageCell = Expanded(
          flex: 7,
          child: Semantics(
            sortKey: const OrdinalSortKey(1),
            child: stageColumn,
          ),
        );
        return Semantics(
          container: true,
          child: Row(
            children: reverse
                ? [stageCell, SizedBox(width: gap), copyCell]
                : [copyCell, SizedBox(width: gap), stageCell],
          ),
        );
      },
    );
  }
}
