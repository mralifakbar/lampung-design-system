import 'dart:math' as math;

import 'package:material_ui/material_ui.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';

/// One part of an [LdsPercentageBar].
@immutable
class LdsPercentagePart {
  /// Creates a part.
  const LdsPercentagePart(this.label, this.value);

  /// Name in the legend.
  final String label;

  /// Size of the part; shares are computed from the total.
  final double value;
}

/// How a whole splits into up to four parts, in one bar with a legend:
/// reports by channel, budget by program.
///
/// Parts take the chart series colors in fixed order. A new split slides
/// into place over 480 ms; there is no fill-in on first load.
class LdsPercentageBar extends StatelessWidget {
  /// Creates a percentage bar.
  const LdsPercentageBar({
    super.key,
    required this.parts,
    required this.semanticLabel,
    this.showLegend = true,
  });

  /// The parts, in legend order. Use at most four; more repeat the colors.
  final List<LdsPercentagePart> parts;

  /// What the bar shows, for example "Laporan warga per kanal".
  final String semanticLabel;

  /// Shows the swatch, name and share under the bar.
  final bool showLegend;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final colors = [c.series1, c.series2, c.series3, c.series4];
    final total = parts.fold<double>(0, (s, p) => s + math.max(0, p.value));
    String share(LdsPercentagePart p) =>
        total == 0 ? '0%' : '${(p.value / total * 100).round()}%';
    final shown = [
      for (var i = 0; i < parts.length; i++)
        if (parts[i].value > 0) i,
    ];
    final reduce = context.ldsReduceMotion;
    final words = [for (final p in parts) '${p.label} ${share(p)}'].join(', ');

    final bar = LayoutBuilder(
      builder: (context, box) {
        final gaps = math.max(0, shown.length - 1) * 2.0;
        final room = math.max(0.0, box.maxWidth - gaps);
        return ClipRRect(
          borderRadius: const BorderRadius.all(Radius.circular(4)),
          child: SizedBox(
            height: 14,
            child: Row(
              children: [
                for (var k = 0; k < shown.length; k++) ...[
                  if (k > 0) const SizedBox(width: 2),
                  AnimatedContainer(
                    duration: reduce ? LdsMotion.instant : LdsMotion.considered,
                    curve: reduce ? Curves.linear : LdsMotion.inoutCurve,
                    width: total == 0
                        ? 0
                        : room * parts[shown[k]].value / total,
                    color: colors[shown[k] % colors.length],
                  ),
                ],
              ],
            ),
          ),
        );
      },
    );

    return Semantics(
      label: '$semanticLabel: $words',
      image: true,
      excludeSemantics: true,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        mainAxisSize: MainAxisSize.min,
        children: [
          bar,
          if (showLegend) ...[
            const SizedBox(height: 12),
            Wrap(
              spacing: 16,
              runSpacing: 6,
              children: [
                for (var i = 0; i < parts.length; i++)
                  Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Container(
                        width: 10,
                        height: 10,
                        decoration: BoxDecoration(
                          color: colors[i % colors.length],
                          borderRadius: const BorderRadius.all(
                            Radius.circular(3),
                          ),
                        ),
                      ),
                      const SizedBox(width: 6),
                      Text(
                        parts[i].label,
                        style: LdsType.footnote.copyWith(color: c.textSubtle),
                      ),
                      const SizedBox(width: 6),
                      Text(
                        share(parts[i]),
                        style: LdsType.footnote.copyWith(
                          color: c.textStrong,
                          fontWeight: FontWeight.w600,
                          fontFeatures: const [FontFeature.tabularFigures()],
                        ),
                      ),
                    ],
                  ),
              ],
            ),
          ],
        ],
      ),
    );
  }
}
