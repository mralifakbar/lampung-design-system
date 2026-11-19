import 'package:material_ui/material_ui.dart';

import '../../theme.dart';
import '../../tokens.g.dart';
import '../pressable.dart';

/// One entry of an [LdsChartLegend].
@immutable
class LdsLegendItem {
  /// Creates a legend entry.
  const LdsLegendItem(this.label, this.color, {this.on = true});

  /// Name of the series, with its value when that helps ("Aplikasi 42%").
  final String label;

  /// Swatch color, usually from [LdsColors.series1] to [LdsColors.series4].
  final Color color;

  /// Whether the series is shown; a hidden one has a hollow swatch.
  final bool on;
}

/// A legend: a swatch and a name per series.
///
/// Prefer direct labels; use a legend only when they do not fit. With
/// [onToggle] every entry becomes a toggle button that switches its series
/// on and off; the chart keeps at least one series on.
class LdsChartLegend extends StatelessWidget {
  /// Creates a legend.
  const LdsChartLegend({super.key, required this.items, this.onToggle});

  /// Entries, in series order.
  final List<LdsLegendItem> items;

  /// Called with the index of the entry pressed. Null makes a static legend.
  final ValueChanged<int>? onToggle;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    Widget entry(int i) {
      final item = items[i];
      Widget content(bool hovered) => Container(
        height: 28,
        padding: const EdgeInsets.only(left: 6, right: 8),
        decoration: BoxDecoration(
          color: hovered ? c.bgTint : null,
          borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.sm)),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 10,
              height: 10,
              decoration: BoxDecoration(
                color: item.on ? item.color : null,
                borderRadius: const BorderRadius.all(Radius.circular(3)),
                border: item.on
                    ? null
                    : Border.all(color: item.color, width: 1.5),
              ),
            ),
            const SizedBox(width: 6),
            Text(
              item.label,
              style: LdsType.footnote.copyWith(
                fontWeight: FontWeight.w400,
                color: onToggle == null
                    ? c.textSubtle
                    : (item.on ? c.textDefault : c.textMuted),
              ),
            ),
          ],
        ),
      );
      if (onToggle == null) return content(false);
      return LdsPressable(
        onPressed: () => onToggle!(i),
        pressedScale: 0.95,
        selected: item.on,
        semanticLabel: item.label,
        excludeChildSemantics: true,
        borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.sm)),
        builder: (context, state) => content(state.hovered),
      );
    }

    return Wrap(
      spacing: onToggle == null ? 16 : 4,
      runSpacing: onToggle == null ? 6 : 0,
      crossAxisAlignment: WrapCrossAlignment.center,
      children: [for (var i = 0; i < items.length; i++) entry(i)],
    );
  }
}
