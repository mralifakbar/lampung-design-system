import 'package:flutter/material.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../icon.dart';
import '../pressable.dart';

/// Numbered page buttons under a long list or table.
///
/// Shows the first page, the last page and the neighbors of the current one;
/// gaps become an ellipsis. Previous and next are disabled at the ends. When
/// the page changes, scroll the list back to its top and swap the rows in
/// place.
class LdsPagination extends StatelessWidget {
  /// Creates pagination.
  const LdsPagination({
    super.key,
    required this.page,
    required this.pageCount,
    required this.onChanged,
    this.siblings = 1,
    this.semanticLabel = 'Halaman',
    this.previousLabel = 'Halaman sebelumnya',
    this.nextLabel = 'Halaman berikutnya',
  }) : assert(pageCount >= 1, 'pageCount must be at least 1');

  /// The current page, from 1.
  final int page;

  /// Number of pages.
  final int pageCount;

  /// Called with the chosen page.
  final ValueChanged<int> onChanged;

  /// How many neighbors of the current page to show on each side.
  final int siblings;

  /// Names the row for screen readers.
  final String semanticLabel;

  /// Label of the previous button.
  final String previousLabel;

  /// Label of the next button.
  final String nextLabel;

  /// The pages to show for [page] of [count]; null marks a gap.
  static List<int?> pageItems(int page, int count, {int siblings = 1}) {
    final keep = <int>{1, count};
    for (var p = page - siblings; p <= page + siblings; p++) {
      if (p >= 1 && p <= count) keep.add(p);
    }
    final sorted = keep.toList()..sort();
    final out = <int?>[];
    for (var i = 0; i < sorted.length; i++) {
      if (i > 0) {
        final gap = sorted[i] - sorted[i - 1];
        // A gap of one page shows that page instead of an ellipsis.
        if (gap == 2) out.add(sorted[i] - 1);
        if (gap > 2) out.add(null);
      }
      out.add(sorted[i]);
    }
    return out;
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final items = pageItems(page, pageCount, siblings: siblings);
    return Semantics(
      container: true,
      label: semanticLabel,
      explicitChildNodes: true,
      child: Wrap(
        crossAxisAlignment: WrapCrossAlignment.center,
        children: [
          _PagerButton(
            onPressed: page > 1 ? () => onChanged(page - 1) : null,
            semanticLabel: previousLabel,
            child: const LdsIcon('chevron_left', size: 18),
          ),
          for (final p in items)
            if (p == null)
              ExcludeSemantics(
                child: SizedBox(
                  width: 24,
                  child: Text('…',
                      textAlign: TextAlign.center,
                      style: LdsType.subhead.copyWith(color: c.textMuted)),
                ),
              )
            else
              _PagerButton(
                onPressed: p == page ? () {} : () => onChanged(p),
                current: p == page,
                semanticLabel:
                    p == page ? 'Halaman $p, halaman ini' : 'Halaman $p',
                child: Text('$p'),
              ),
          _PagerButton(
            onPressed: page < pageCount ? () => onChanged(page + 1) : null,
            semanticLabel: nextLabel,
            child: const LdsIcon('chevron_right', size: 18),
          ),
        ],
      ),
    );
  }
}

class _PagerButton extends StatelessWidget {
  const _PagerButton({
    required this.onPressed,
    required this.semanticLabel,
    required this.child,
    this.current = false,
  });

  final VoidCallback? onPressed;
  final String semanticLabel;
  final Widget child;
  final bool current;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    const radius = BorderRadius.all(Radius.circular(10));
    return LdsPressable(
      onPressed: onPressed,
      pressedScale: current ? 1 : 0.92,
      borderRadius: radius,
      semanticLabel: semanticLabel,
      excludeChildSemantics: true,
      selected: current ? true : null,
      builder: (context, state) {
        final fg = onPressed == null
            ? c.textFaint
            : current
                ? c.textInverse
                : c.textDefault;
        return AnimatedContainer(
          duration: context.ldsDuration(LdsMotion.fast),
          constraints: const BoxConstraints(minWidth: 36),
          height: 36,
          padding: const EdgeInsets.symmetric(horizontal: 8),
          alignment: Alignment.center,
          decoration: BoxDecoration(
            borderRadius: radius,
            color: current
                ? c.textStrong
                : state.hovered || state.pressed
                    ? c.bgTintStrong
                    : Colors.transparent,
          ),
          child: IconTheme.merge(
            data: IconThemeData(color: fg),
            child: DefaultTextStyle.merge(
              style: LdsType.subhead.copyWith(
                color: fg,
                fontWeight: current ? FontWeight.w600 : FontWeight.w500,
                fontFeatures: const [FontFeature.tabularFigures()],
              ),
              child: child,
            ),
          ),
        );
      },
    );
  }
}
