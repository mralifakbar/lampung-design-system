import 'package:flutter/material.dart';

import '../../tokens.g.dart';
import '../badge.dart';
import 'chart_card.dart';
import 'sparkline.dart';

/// One headline number with a word on its direction and a tiny line of its
/// recent history, in a chart card.
///
/// The number is the point. Color the [change] badge by meaning, not
/// direction: fewer late permits is good news. With fewer than three
/// [history] points the sparkline is left out.
class LdsSparklineStat extends StatelessWidget {
  /// Creates a sparkline stat.
  const LdsSparklineStat({
    super.key,
    required this.question,
    required this.value,
    required this.history,
    required this.historyLabel,
    this.subtitle,
    this.change,
    this.changeTone = LdsTone.success,
    this.rising = true,
  });

  /// The question the number answers.
  final String question;

  /// The period ("Tingkat penyelesaian, 12 minggu terakhir").
  final String? subtitle;

  /// The current value, formatted ("92%").
  final String value;

  /// Recent values, oldest first.
  final List<double> history;

  /// The trend in words, for screen readers.
  final String historyLabel;

  /// The change in words ("4 poin di atas awal triwulan").
  final String? change;

  /// What the change means: success, warning or danger.
  final LdsTone changeTone;

  /// Whether the change points up (trending_up) or down.
  final bool rising;

  @override
  Widget build(BuildContext context) {
    return LdsChartCard(
      question: question,
      subtitle: subtitle,
      child: Wrap(
        alignment: WrapAlignment.spaceBetween,
        crossAxisAlignment: WrapCrossAlignment.end,
        spacing: LdsSpace.s20,
        runSpacing: LdsSpace.s12,
        children: [
          Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              LdsChartFigure(value),
              if (change != null) ...[
                const SizedBox(height: LdsSpace.s8),
                LdsBadge(change!,
                    tone: changeTone,
                    icon: rising ? 'trending_up' : 'trending_down'),
              ],
            ],
          ),
          if (history.length >= 3)
            LdsSparkline(values: history, semanticLabel: historyLabel),
        ],
      ),
    );
  }
}
