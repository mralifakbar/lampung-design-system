import 'package:flutter/material.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../icon.dart';
import '../pressable.dart';
import 'height_expand.dart';

/// One row of an [LdsTree]: a leaf, or a parent when it has [children].
@immutable
class LdsTreeNode<T> {
  /// Creates a tree node.
  const LdsTreeNode({
    required this.value,
    required this.label,
    this.icon,
    this.children = const [],
  });

  /// Identifies the node; reported when a leaf is chosen.
  final T value;

  /// Visible text.
  final String label;

  /// Optional icon (ligature name), for example `folder` or `description`.
  final String? icon;

  /// Child nodes; empty for a leaf.
  final List<LdsTreeNode<T>> children;
}

/// Nested rows that open and close: folders and files, offices and their services.
///
/// A parent row toggles its children, which open on the smooth spring while
/// the chevron turns 90 degrees. Choosing a leaf calls [onSelected];
/// selection is app state.
class LdsTree<T> extends StatefulWidget {
  /// Creates a tree.
  const LdsTree({
    super.key,
    required this.nodes,
    this.selected,
    this.onSelected,
    this.initiallyExpanded = const {},
    this.semanticLabel,
  });

  /// The top-level nodes.
  final List<LdsTreeNode<T>> nodes;

  /// The selected leaf, or null.
  final T? selected;

  /// Called with the chosen leaf.
  final ValueChanged<T>? onSelected;

  /// Parents open on first build.
  final Set<T> initiallyExpanded;

  /// Names the tree for screen readers.
  final String? semanticLabel;

  @override
  State<LdsTree<T>> createState() => _LdsTreeState<T>();
}

class _LdsTreeState<T> extends State<LdsTree<T>> {
  late final Set<T> _expanded = <T>{...widget.initiallyExpanded};

  void _toggle(T value) {
    setState(() {
      if (!_expanded.remove(value)) _expanded.add(value);
    });
  }

  List<Widget> _rows(List<LdsTreeNode<T>> nodes, int depth) {
    return [
      for (final node in nodes) ...[
        _TreeRow<T>(
          node: node,
          depth: depth,
          expanded: _expanded.contains(node.value),
          selected: node.children.isEmpty && node.value == widget.selected,
          onPressed: node.children.isNotEmpty
              ? () => _toggle(node.value)
              : (widget.onSelected == null
                  ? null
                  : () => widget.onSelected!(node.value)),
        ),
        if (node.children.isNotEmpty)
          LdsHeightExpand(
            open: _expanded.contains(node.value),
            fade: false,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              mainAxisSize: MainAxisSize.min,
              children: _rows(node.children, depth + 1),
            ),
          ),
      ],
    ];
  }

  @override
  Widget build(BuildContext context) {
    return Semantics(
      container: true,
      label: widget.semanticLabel,
      explicitChildNodes: true,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        mainAxisSize: MainAxisSize.min,
        children: _rows(widget.nodes, 0),
      ),
    );
  }
}

class _TreeRow<T> extends StatelessWidget {
  const _TreeRow({
    required this.node,
    required this.depth,
    required this.expanded,
    required this.selected,
    required this.onPressed,
  });

  final LdsTreeNode<T> node;
  final int depth;
  final bool expanded;
  final bool selected;
  final VoidCallback? onPressed;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final parent = node.children.isNotEmpty;
    const radius = BorderRadius.all(Radius.circular(LdsRadius.sm));
    final row = LdsPressable(
      onPressed: onPressed,
      pressedScale: 1,
      borderRadius: radius,
      selected: parent ? null : selected,
      semanticLabel: node.label,
      excludeChildSemantics: true,
      builder: (context, state) => AnimatedContainer(
        duration: context.ldsDuration(LdsMotion.fast),
        height: LdsSize.touchMin,
        padding: EdgeInsetsDirectional.only(start: 8.0 + depth * 22, end: 8),
        decoration: BoxDecoration(
          borderRadius: radius,
          color: selected
              ? c.accentTint
              : state.pressed
                  ? c.bgTintStrong
                  : state.hovered
                      ? c.bgTint
                      : Colors.transparent,
        ),
        child: Row(
          children: [
            SizedBox(
              width: 18,
              child: parent
                  ? AnimatedRotation(
                      turns: expanded ? 0.25 : 0,
                      duration:
                          context.ldsDuration(LdsMotion.smoothSpringDuration),
                      curve: LdsSpringCurve.smooth,
                      child: LdsIcon('chevron_right',
                          size: 16, color: c.textMuted),
                    )
                  : null,
            ),
            const SizedBox(width: 6),
            if (node.icon != null) ...[
              LdsIcon(node.icon!,
                  size: 18,
                  fill: selected,
                  color: selected ? c.accentText : c.textSubtle),
              const SizedBox(width: 8),
            ],
            Expanded(
              child: Text(
                node.label,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: LdsType.subhead.copyWith(
                  color: selected ? c.accentText : c.textDefault,
                  fontWeight: selected ? FontWeight.w500 : FontWeight.w400,
                ),
              ),
            ),
          ],
        ),
      ),
    );
    return parent
        ? MergeSemantics(child: Semantics(expanded: expanded, child: row))
        : row;
  }
}
