import 'package:material_ui/material_ui.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../pressable.dart';
import 'sliding_indicator.dart';

/// An "On this page" list of the headings of one long page, with an ink
/// line that follows the section in view.
///
/// Set [current] from your scroll position (for example the topmost heading
/// in the upper 40 % of the viewport); the ink glides and resizes to it on
/// the smooth spring. Only the ink moves; the links change color.
class LdsOutline extends StatelessWidget {
  /// Creates an outline.
  const LdsOutline({
    super.key,
    required this.entries,
    required this.current,
    required this.onSelected,
    this.semanticLabel = 'Di halaman ini',
  });

  /// The section headings, in page order.
  final List<String> entries;

  /// Index of the section in view, or null.
  final int? current;

  /// Called with the index of the chosen section; scroll to it.
  final ValueChanged<int> onSelected;

  /// Names the list for screen readers.
  final String semanticLabel;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    return Semantics(
      container: true,
      label: semanticLabel,
      explicitChildNodes: true,
      child: DecoratedBox(
        decoration: BoxDecoration(
          border: BorderDirectional(
            start: BorderSide(color: c.lineStrong, width: 1.5),
          ),
        ),
        child: LdsSlidingIndicator(
          style: LdsIndicatorStyle.rail,
          selectedIndex: current,
          children: [
            for (var i = 0; i < entries.length; i++)
              LdsPressable(
                onPressed: () => onSelected(i),
                pressedScale: 1,
                selected: i == current,
                semanticLabel: entries[i],
                excludeChildSemantics: true,
                borderRadius: const BorderRadius.all(
                  Radius.circular(LdsRadius.xs),
                ),
                builder: (context, state) => Container(
                  constraints: const BoxConstraints(
                    minHeight: LdsSize.touchMin,
                  ),
                  padding: const EdgeInsetsDirectional.only(start: 14),
                  alignment: AlignmentDirectional.centerStart,
                  child: AnimatedDefaultTextStyle(
                    duration: context.ldsDuration(LdsMotion.fast),
                    style: LdsType.footnote.copyWith(
                      color: i == current || state.hovered
                          ? c.textStrong
                          : c.textSubtle,
                      fontWeight: i == current
                          ? FontWeight.w500
                          : FontWeight.w400,
                    ),
                    child: Text(entries[i]),
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}
