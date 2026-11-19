import 'dart:math' as math;

import 'package:material_ui/material_ui.dart';

import '../../theme.dart';
import '../../tokens.g.dart';
import '../skeleton.dart';
import '_chart_utils.dart';

/// One figure of an [LdsStatRow].
@immutable
class LdsStat {
  /// Creates a figure.
  const LdsStat(this.label, this.value, {this.sub});

  /// What it counts ("Laporan selesai"). Shown under the figure.
  final String label;

  /// The figure, formatted ("1.284"). Null shows a skeleton while loading.
  final String? value;

  /// Context under the label ("Dari 1.400 laporan").
  final String? sub;
}

/// A row of key figures without cards: big tabular numbers with their
/// labels underneath, divided by hairlines.
///
/// Columns follow the width of the content column, not the screen: from
/// 600 px wide it shows [columns] per row (at most four), narrower it shows
/// two, and under 320 px one.
class LdsStatRow extends StatelessWidget {
  /// Creates a stat row.
  const LdsStatRow({super.key, required this.stats, this.columns = 3});

  /// The figures.
  final List<LdsStat> stats;

  /// Figures per row at full width.
  final int columns;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    return LayoutBuilder(
      builder: (context, box) {
        final w = box.maxWidth;
        final n = w >= 600
            ? columns.clamp(1, 4)
            : w >= 320
            ? math.min(2, columns)
            : 1;
        final four = n >= 4;
        final valueSize = four ? 26.0 : (w >= 600 ? 36.0 : 30.0);
        final rows = <Widget>[];
        for (var r = 0; r < stats.length; r += n) {
          final cells = <Widget>[];
          for (var k = 0; k < n; k++) {
            final i = r + k;
            cells.add(
              Expanded(
                child: i >= stats.length
                    ? const SizedBox.shrink()
                    : Container(
                        padding: EdgeInsets.only(
                          left: k == 0 ? 0 : LdsSpace.s16,
                          right: LdsSpace.s8,
                        ),
                        decoration: BoxDecoration(
                          border: k == 0
                              ? null
                              : Border(left: BorderSide(color: c.hairline)),
                        ),
                        child: _cell(c, stats[i], valueSize),
                      ),
              ),
            );
          }
          rows.add(
            Container(
              padding: const EdgeInsets.symmetric(vertical: LdsSpace.s16),
              decoration: BoxDecoration(
                border: Border(top: BorderSide(color: c.hairline)),
              ),
              child: IntrinsicHeight(
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: cells,
                ),
              ),
            ),
          );
        }
        return Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          mainAxisSize: MainAxisSize.min,
          children: rows,
        );
      },
    );
  }

  Widget _cell(LdsColors c, LdsStat s, double size) {
    return MergeSemantics(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (s.value == null)
            LdsSkeleton(height: size, width: 80, semanticLabel: 'Memuat')
          else
            Text(
              s.value!,
              style: TextStyle(
                fontFamily: LdsType.family,
                fontSize: size,
                height: 1.08,
                fontWeight: FontWeight.w600,
                letterSpacing: -size * 0.03,
                color: c.textStrong,
                fontFeatures: tabular,
              ),
            ),
          const SizedBox(height: 6),
          Text(s.label, style: LdsType.subhead.copyWith(color: c.textSubtle)),
          if (s.sub != null)
            Text(s.sub!, style: LdsType.footnote.copyWith(color: c.textMuted)),
        ],
      ),
    );
  }
}
