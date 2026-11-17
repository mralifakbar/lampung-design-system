import 'package:flutter/material.dart';

import '../../theme.dart';
import '../../tokens.g.dart';
import '../segmented.dart';
import 'plan_card.dart';

/// Pricing plans as cards, with a billing period control centered above
/// them. Prices roll and notes morph when the period changes; [saveNote]
/// says the saving in words next to the control.
///
/// Cards wrap below 280 px each and share one height, so the plan buttons
/// line up. Mark at most one plan as [LdsPlan.featured].
class LdsPlans extends StatelessWidget {
  /// Creates a set of plans.
  const LdsPlans({
    super.key,
    required this.plans,
    required this.period,
    required this.onPeriodChanged,
    this.saveNote,
    this.monthLabel = 'Bulanan',
    this.yearLabel = 'Tahunan',
    this.periodSemanticLabel = 'Periode tagihan',
  });

  /// The plans, two to four.
  final List<LdsPlan> plans;

  /// The billing period shown.
  final LdsBillingPeriod period;

  /// Called when the person picks a period.
  final ValueChanged<LdsBillingPeriod> onPeriodChanged;

  /// The saving in words, for example "Hemat 2 bulan dengan tagihan
  /// tahunan".
  final String? saveNote;

  /// Label of the monthly option.
  final String monthLabel;

  /// Label of the yearly option.
  final String yearLabel;

  /// Names the period control for screen readers.
  final String periodSemanticLabel;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    return LayoutBuilder(builder: (context, constraints) {
      const gap = LdsSpace.s16;
      final w = constraints.maxWidth;
      var columns = ((w + gap) / (280 + gap)).floor();
      if (columns < 1) columns = 1;
      if (columns > plans.length) columns = plans.length;
      final cardWidth = (w - gap * (columns - 1)) / columns;
      final rows = <List<LdsPlan>>[];
      for (var i = 0; i < plans.length; i += columns) {
        rows.add(plans.sublist(i, (i + columns).clamp(0, plans.length)));
      }
      return Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Wrap(
            alignment: WrapAlignment.center,
            crossAxisAlignment: WrapCrossAlignment.center,
            spacing: LdsSpace.s12,
            runSpacing: LdsSpace.s8,
            children: [
              SizedBox(
                width: 240,
                child: LdsSegmented<LdsBillingPeriod>(
                  semanticLabel: periodSemanticLabel,
                  segments: [
                    LdsSegment(value: LdsBillingPeriod.month, label: monthLabel),
                    LdsSegment(value: LdsBillingPeriod.year, label: yearLabel),
                  ],
                  value: period,
                  onChanged: onPeriodChanged,
                ),
              ),
              if (saveNote != null)
                Text(saveNote!,
                    style: LdsType.footnote.copyWith(color: c.textSubtle)),
            ],
          ),
          const SizedBox(height: LdsSpace.s32),
          for (var r = 0; r < rows.length; r++) ...[
            if (r > 0) const SizedBox(height: gap),
            IntrinsicHeight(
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  for (var i = 0; i < rows[r].length; i++) ...[
                    if (i > 0) const SizedBox(width: gap),
                    SizedBox(
                      width: cardWidth,
                      child: LdsPlanCard(
                          plan: rows[r][i], period: period, fillHeight: true),
                    ),
                  ],
                ],
              ),
            ),
          ],
        ],
      );
    });
  }
}
