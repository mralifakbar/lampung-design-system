import 'dart:math' as math;

import 'package:material_ui/material_ui.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../icon.dart';
import '_chart_utils.dart';
import 'chart_data.dart';

/// One row of [LdsRankedBars].
@immutable
class LdsRankedItem {
  /// Creates a row.
  const LdsRankedItem(
    this.label,
    this.value, {
    this.sub,
    this.icon,
    this.trailing,
  });

  /// The name ("Kecamatan Kedaton").
  final String label;

  /// The value the bar shows.
  final double value;

  /// A second line under the name.
  final String? sub;

  /// An icon tile before the name (ligature name).
  final String? icon;

  /// After the value, usually an `LdsTrendDelta`.
  final Widget? trailing;
}

/// Rows of a label, a horizontal bar and its value, sorted longest first:
/// kecamatan dengan laporan terbanyak, layanan paling dicari.
///
/// Every row shares one grid, so bars and values line up. Pointing at a
/// row fades the others.
class LdsRankedBars extends StatefulWidget {
  /// Creates ranked bars.
  const LdsRankedBars({
    super.key,
    required this.items,
    required this.semanticLabel,
    this.format = const LdsNumberFormat(),
    this.sort = true,
    this.showRank = false,
    this.muted = false,
    this.labelWidth = 140,
  });

  /// Rows.
  final List<LdsRankedItem> items;

  /// Names the ranking ("Laporan per kecamatan, November").
  final String semanticLabel;

  /// How values read.
  final LdsNumberFormat format;

  /// Sorts rows by value, largest first.
  final bool sort;

  /// Shows the position number before each name.
  final bool showRank;

  /// Only the leader in the series color; the rest recede to the tint.
  final bool muted;

  /// Width of the label column.
  final double labelWidth;

  @override
  State<LdsRankedBars> createState() => _LdsRankedBarsState();
}

class _LdsRankedBarsState extends State<LdsRankedBars> {
  int? _hover;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final w = widget;
    final items = [...w.items];
    if (w.sort) items.sort((a, b) => b.value.compareTo(a.value));
    final max = items.fold<double>(0, (m, e) => math.max(m, e.value));
    final valueStyle = LdsType.subhead.copyWith(
      fontWeight: FontWeight.w600,
      color: c.textStrong,
      fontFeatures: tabular,
    );
    final valueWidth = items.fold<double>(
      0,
      (m, e) =>
          math.max(m, layoutText(w.format.format(e.value), valueStyle).width),
    );

    Widget row(int i) {
      final it = items[i];
      final top = i == 0;
      final v = max <= 0 ? 0.0 : (it.value / max).clamp(0.0, 1.0);
      final fill = w.muted && !top ? c.accentTintStrong : c.series1;
      return MouseRegion(
        onEnter: (_) => setState(() => _hover = i),
        onExit: (_) => setState(() => _hover = null),
        child: AnimatedOpacity(
          opacity: _hover == null || _hover == i ? 1 : 0.55,
          duration: context.ldsDuration(LdsMotion.fast),
          child: MergeSemantics(
            child: Padding(
              padding: const EdgeInsets.symmetric(vertical: 6),
              child: Row(
                children: [
                  SizedBox(
                    width: w.labelWidth,
                    child: Row(
                      children: [
                        if (w.showRank)
                          SizedBox(
                            width: 22,
                            child: Text(
                              '${i + 1}',
                              style: LdsType.footnote.copyWith(
                                color: c.textMuted,
                                fontFeatures: tabular,
                              ),
                            ),
                          ),
                        if (it.icon != null) ...[
                          Container(
                            width: 28,
                            height: 28,
                            alignment: Alignment.center,
                            decoration: BoxDecoration(
                              color: c.bgFill,
                              borderRadius: const BorderRadius.all(
                                Radius.circular(LdsRadius.sm),
                              ),
                            ),
                            child: LdsIcon(
                              it.icon!,
                              size: 16,
                              color: c.textSubtle,
                            ),
                          ),
                          const SizedBox(width: LdsSpace.s8),
                        ],
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                it.label,
                                maxLines: 2,
                                overflow: TextOverflow.ellipsis,
                                style: LdsType.subhead.copyWith(
                                  color: c.textDefault,
                                  fontWeight: top
                                      ? FontWeight.w500
                                      : FontWeight.w400,
                                ),
                              ),
                              if (it.sub != null)
                                Text(
                                  it.sub!,
                                  maxLines: 1,
                                  overflow: TextOverflow.ellipsis,
                                  style: LdsType.footnote.copyWith(
                                    color: c.textSubtle,
                                  ),
                                ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(width: LdsSpace.s12),
                  Expanded(
                    child: ExcludeSemantics(
                      child: Container(
                        height: 10,
                        decoration: BoxDecoration(
                          color: c.bgTrack,
                          borderRadius: const BorderRadius.all(
                            Radius.circular(5),
                          ),
                        ),
                        alignment: Alignment.centerLeft,
                        child: AnimatedFractionallySizedBox(
                          widthFactor: v,
                          duration: context.ldsDuration(LdsMotion.considered),
                          curve: LdsMotion.inoutCurve,
                          child: Container(
                            decoration: BoxDecoration(
                              color: fill,
                              borderRadius: const BorderRadius.all(
                                Radius.circular(5),
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: LdsSpace.s12),
                  SizedBox(
                    width: valueWidth + 1,
                    child: Text(
                      w.format.format(it.value),
                      textAlign: TextAlign.right,
                      style: valueStyle,
                    ),
                  ),
                  if (it.trailing != null) ...[
                    const SizedBox(width: LdsSpace.s6),
                    it.trailing!,
                  ],
                ],
              ),
            ),
          ),
        ),
      );
    }

    return Semantics(
      container: true,
      label: w.semanticLabel,
      explicitChildNodes: true,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        mainAxisSize: MainAxisSize.min,
        children: [for (var i = 0; i < items.length; i++) row(i)],
      ),
    );
  }
}
