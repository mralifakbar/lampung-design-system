import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '_chart_utils.dart';
import 'chart_data.dart';

/// One step of an [LdsFunnel].
@immutable
class LdsFunnelStep {
  /// Creates a step.
  const LdsFunnelStep(this.label, this.value);

  /// The step ("Mengisi formulir").
  final String label;

  /// How many reached it.
  final double value;
}

/// The steps of a flow, each with how many reached it and what share of the
/// step before moved on.
///
/// Centered bars narrow with the count, so the biggest drop shows at a
/// glance; the words carry the exact numbers. The step that keeps the
/// smallest share is flagged in danger text.
class LdsFunnel extends StatelessWidget {
  /// Creates a funnel.
  const LdsFunnel({
    super.key,
    required this.steps,
    required this.semanticLabel,
    this.format = const LdsNumberFormat(),
    this.conversionSuffix = 'dari langkah sebelumnya',
    this.flagDrop = true,
  });

  /// Steps, in order. The order is the meaning.
  final List<LdsFunnelStep> steps;

  /// Names the flow and period ("Alur permohonan izin, 1 sampai 16 November").
  final String semanticLabel;

  /// How counts read.
  final LdsNumberFormat format;

  /// Words after each share ("42% dari langkah sebelumnya").
  final String conversionSuffix;

  /// Flags the step with the weakest share.
  final bool flagDrop;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final first = steps.isEmpty ? 0.0 : steps.first.value;
    int? drop;
    if (flagDrop && steps.length > 1) {
      var worst = double.infinity;
      for (var i = 1; i < steps.length; i++) {
        final prev = steps[i - 1].value;
        final share = prev <= 0 ? 0.0 : steps[i].value / prev;
        if (share < worst) {
          worst = share;
          drop = i;
        }
      }
    }
    return Semantics(
      container: true,
      label: semanticLabel,
      explicitChildNodes: true,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        mainAxisSize: MainAxisSize.min,
        children: [
          for (var i = 0; i < steps.length; i++) ...[
            if (i > 0) const SizedBox(height: LdsSpace.s12),
            _row(context, c, i, first, i == drop),
          ],
        ],
      ),
    );
  }

  Widget _row(
      BuildContext context, LdsColors c, int i, double first, bool isDrop) {
    final s = steps[i];
    final v = first <= 0 ? 0.0 : (s.value / first).clamp(0.0, 1.0);
    final prev = i == 0 ? null : steps[i - 1].value;
    final conv = prev == null
        ? null
        : '${prev <= 0 ? 0 : (s.value / prev * 100).round()}% $conversionSuffix';
    return MergeSemantics(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Expanded(
                child: Text('${i + 1}. ${s.label}',
                    style: LdsType.subhead.copyWith(color: c.textDefault)),
              ),
              Text(format.format(s.value),
                  style: LdsType.subhead.copyWith(
                      fontWeight: FontWeight.w600,
                      color: c.textStrong,
                      fontFeatures: tabular)),
              if (conv != null) ...[
                const SizedBox(width: LdsSpace.s8),
                Flexible(
                  child: Text(conv,
                      textAlign: TextAlign.right,
                      style: LdsType.footnote.copyWith(
                          color: isDrop ? c.dangerText : c.textSubtle,
                          fontWeight:
                              isDrop ? FontWeight.w500 : FontWeight.w400,
                          fontFeatures: tabular)),
                ),
              ],
            ],
          ),
          const SizedBox(height: 6),
          ExcludeSemantics(
            child: Container(
              height: 28,
              decoration: BoxDecoration(
                color: c.bgFill,
                borderRadius:
                    const BorderRadius.all(Radius.circular(LdsRadius.sm)),
              ),
              child: LayoutBuilder(
                builder: (context, box) => Center(
                  child: AnimatedContainer(
                    duration: context.ldsDuration(LdsMotion.considered),
                    curve: LdsMotion.inoutCurve,
                    width: math.max(4, box.maxWidth * v),
                    decoration: BoxDecoration(
                      color: c.series1,
                      borderRadius:
                          const BorderRadius.all(Radius.circular(LdsRadius.sm)),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
