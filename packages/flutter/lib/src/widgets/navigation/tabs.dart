import 'package:flutter/services.dart';
import 'package:material_ui/material_ui.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../pressable.dart';
import 'sliding_indicator.dart';

/// One tab of an [LdsTabs].
@immutable
class LdsTab<T> {
  /// Creates a tab.
  const LdsTab({required this.value, required this.label, this.count});

  /// The value reported when this tab is chosen.
  final T value;

  /// A noun for what is inside: "Ringkasan", "Dokumen".
  final String label;

  /// Optional count shown after the label, read as part of its name.
  final int? count;
}

/// How the tabs of an [LdsTabs] share the row.
enum LdsTabsAlignment {
  /// Equal widths; two to four tabs with short labels.
  fill,

  /// Sized to their labels from the start, scrolling sideways when they do
  /// not fit; four or more tabs or long labels.
  start,
}

/// Underlined tabs that switch between sibling sections of one page. One
/// ink line glides to the selected tab on the smooth spring.
///
/// Show the panel under it, ideally inside an [LdsViewSwap] keyed by the
/// value so the new panel rises in. Only the selected tab is in the focus
/// order; the arrow keys move selection and focus together, wrapping at the
/// ends, and Home and End jump to the first and last tab.
class LdsTabs<T> extends StatefulWidget {
  /// Creates tabs.
  const LdsTabs({
    super.key,
    required this.tabs,
    required this.value,
    required this.onChanged,
    this.alignment = LdsTabsAlignment.fill,
    this.semanticLabel,
  });

  /// The tabs, in order.
  final List<LdsTab<T>> tabs;

  /// The selected value.
  final T value;

  /// Called with the newly selected value.
  final ValueChanged<T> onChanged;

  /// How the tabs share the row.
  final LdsTabsAlignment alignment;

  /// Names the tab row for screen readers.
  final String? semanticLabel;

  @override
  State<LdsTabs<T>> createState() => _LdsTabsState<T>();
}

class _LdsTabsState<T> extends State<LdsTabs<T>> {
  final List<FocusNode> _nodes = <FocusNode>[];

  void _syncNodes() {
    while (_nodes.length < widget.tabs.length) {
      _nodes.add(FocusNode());
    }
    while (_nodes.length > widget.tabs.length) {
      _nodes.removeLast().dispose();
    }
  }

  @override
  void dispose() {
    for (final n in _nodes) {
      n.dispose();
    }
    super.dispose();
  }

  KeyEventResult _onKey(FocusNode node, KeyEvent event) {
    if (event is! KeyDownEvent && event is! KeyRepeatEvent) {
      return KeyEventResult.ignored;
    }
    final n = widget.tabs.length;
    final current = widget.tabs.indexWhere((t) => t.value == widget.value);
    final rtl = Directionality.of(context) == TextDirection.rtl;
    final key = event.logicalKey;
    int? next;
    if (key == LogicalKeyboardKey.arrowRight ||
        key == LogicalKeyboardKey.arrowDown) {
      next = current + (rtl && key == LogicalKeyboardKey.arrowRight ? -1 : 1);
    } else if (key == LogicalKeyboardKey.arrowLeft ||
        key == LogicalKeyboardKey.arrowUp) {
      next = current + (rtl && key == LogicalKeyboardKey.arrowLeft ? 1 : -1);
    } else if (key == LogicalKeyboardKey.home) {
      next = 0;
    } else if (key == LogicalKeyboardKey.end) {
      next = n - 1;
    }
    if (next == null || n == 0) return KeyEventResult.ignored;
    next = (next % n + n) % n;
    widget.onChanged(widget.tabs[next].value);
    _nodes[next].requestFocus();
    return KeyEventResult.handled;
  }

  @override
  Widget build(BuildContext context) {
    _syncNodes();
    final c = context.lds;
    final index = widget.tabs.indexWhere((t) => t.value == widget.value);
    final fill = widget.alignment == LdsTabsAlignment.fill;

    final children = <Widget>[
      for (var i = 0; i < widget.tabs.length; i++)
        _tab(context, c, widget.tabs[i], i, i == index),
    ];

    Widget row = LdsSlidingIndicator(
      direction: Axis.horizontal,
      style: LdsIndicatorStyle.underline,
      selectedIndex: index < 0 ? null : index,
      expand: fill,
      spacing: fill ? 0 : 4,
      children: children,
    );
    if (!fill) {
      row = SingleChildScrollView(scrollDirection: Axis.horizontal, child: row);
    }

    return Semantics(
      container: true,
      label: widget.semanticLabel,
      explicitChildNodes: true,
      child: Focus(
        canRequestFocus: false,
        skipTraversal: true,
        onKeyEvent: _onKey,
        child: DecoratedBox(
          decoration: BoxDecoration(
            border: Border(bottom: BorderSide(color: c.hairline)),
          ),
          child: row,
        ),
      ),
    );
  }

  Widget _tab(
    BuildContext context,
    LdsColors c,
    LdsTab<T> tab,
    int i,
    bool selected,
  ) {
    _nodes[i].skipTraversal = !selected;
    final name = tab.count == null ? tab.label : '${tab.label} ${tab.count}';
    return LdsPressable(
      onPressed: () => widget.onChanged(tab.value),
      focusNode: _nodes[i],
      pressedScale: 1,
      selected: selected,
      inMutuallyExclusiveGroup: true,
      semanticLabel: name,
      excludeChildSemantics: true,
      borderRadius: const BorderRadius.vertical(
        top: Radius.circular(LdsRadius.sm),
      ),
      builder: (context, state) => SizedBox(
        height: LdsSize.touchMin,
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 12),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Flexible(
                child: AnimatedDefaultTextStyle(
                  duration: context.ldsDuration(LdsMotion.standard),
                  curve: LdsMotion.standardCurve,
                  style: LdsType.subhead.copyWith(
                    color: selected || state.hovered
                        ? c.textStrong
                        : c.textSubtle,
                    fontWeight: selected ? FontWeight.w600 : FontWeight.w500,
                  ),
                  child: Text(
                    tab.label,
                    maxLines: 1,
                    softWrap: false,
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
              ),
              if (tab.count != null) ...[
                const SizedBox(width: 6),
                Container(
                  constraints: const BoxConstraints(minWidth: 20),
                  height: 18,
                  padding: const EdgeInsets.symmetric(horizontal: 6),
                  alignment: Alignment.center,
                  decoration: BoxDecoration(
                    color: c.bgRecessed,
                    borderRadius: BorderRadius.circular(9),
                  ),
                  child: Text(
                    '${tab.count}',
                    style: LdsType.caption.copyWith(
                      fontSize: 11,
                      height: 1,
                      fontWeight: FontWeight.w600,
                      letterSpacing: 0,
                      color: c.textSubtle,
                    ),
                  ),
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}
