import 'dart:math' as math;

import 'package:flutter/widgets.dart';

import '../../tokens.g.dart';

/// Vertical flow with an even gap: 8 to 12 for related items, 20 to 28 for
/// groups, 48 for sections.
class LdsStack extends StatelessWidget {
  /// Creates a vertical stack.
  const LdsStack({
    super.key,
    required this.children,
    this.gap = LdsSpace.s12,
    this.crossAxisAlignment = CrossAxisAlignment.stretch,
  });

  /// The items, top to bottom.
  final List<Widget> children;

  /// Space between items.
  final double gap;

  /// Horizontal alignment of the items.
  final CrossAxisAlignment crossAxisAlignment;

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: crossAxisAlignment,
      spacing: gap,
      children: children,
    );
  }
}

/// A row that wraps, items centered on the cross axis: chips, actions,
/// metadata.
class LdsCluster extends StatelessWidget {
  /// Creates a cluster.
  const LdsCluster({
    super.key,
    required this.children,
    this.gap = LdsSpace.s8,
    this.alignment = WrapAlignment.start,
  });

  /// The items.
  final List<Widget> children;

  /// Space between items and between lines.
  final double gap;

  /// How items sit along each line.
  final WrapAlignment alignment;

  @override
  Widget build(BuildContext context) {
    return Wrap(
      spacing: gap,
      runSpacing: gap,
      alignment: alignment,
      crossAxisAlignment: WrapCrossAlignment.center,
      children: children,
    );
  }
}

/// As many equal columns as fit, each at least [minItemWidth] wide and never
/// wider than the container.
///
/// 160 for small tiles, 240 for cards, 320 for wide cards.
class LdsAutoGrid extends StatelessWidget {
  /// Creates an auto grid.
  const LdsAutoGrid({
    super.key,
    required this.children,
    this.minItemWidth = 240,
    this.gap = LdsSpace.s12,
  });

  /// The cells.
  final List<Widget> children;

  /// The narrowest a column may get before the grid drops a column.
  final double minItemWidth;

  /// Space between cells.
  final double gap;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final width = constraints.maxWidth;
        final columns = math.max(
          1,
          ((width + gap) / (minItemWidth + gap)).floor(),
        );
        final itemWidth = (width - gap * (columns - 1)) / columns;
        return Wrap(
          spacing: gap,
          runSpacing: gap,
          children: [
            for (final child in children)
              SizedBox(width: itemWidth.floorToDouble(), child: child),
          ],
        );
      },
    );
  }
}

/// Two columns: a side column [sideWidth] wide and a main column that takes
/// the rest. Below [breakpoint] they stack, side first.
class LdsSplit2 extends StatelessWidget {
  /// Creates a two column split.
  const LdsSplit2({
    super.key,
    required this.side,
    required this.main,
    this.sideWidth = 320,
    this.gap = LdsSpace.s28,
    this.breakpoint = 860,
  });

  /// The side column.
  final Widget side;

  /// The main column.
  final Widget main;

  /// Width of the side column.
  final double sideWidth;

  /// Space between the columns.
  final double gap;

  /// Below this width the columns stack.
  final double breakpoint;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        if (constraints.maxWidth < breakpoint) {
          return Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            spacing: gap,
            children: [side, main],
          );
        }
        return Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(width: sideWidth, child: side),
            SizedBox(width: gap),
            Expanded(child: main),
          ],
        );
      },
    );
  }
}

/// Centers its child on both axes and centers its text.
class LdsCenter extends StatelessWidget {
  /// Creates a centered box.
  const LdsCenter({super.key, required this.child});

  /// The content.
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: DefaultTextStyle.merge(textAlign: TextAlign.center, child: child),
    );
  }
}

/// Caps the width of its child at a comfortable reading measure (680 px,
/// about 70 characters of body text).
class LdsMeasure extends StatelessWidget {
  /// Creates a measure.
  const LdsMeasure({
    super.key,
    required this.child,
    this.maxWidth = LdsSize.measure,
  });

  /// The content.
  final Widget child;

  /// The cap.
  final double maxWidth;

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: AlignmentDirectional.topStart,
      widthFactor: 1,
      heightFactor: 1,
      child: ConstrainedBox(
        constraints: BoxConstraints(maxWidth: maxWidth),
        child: child,
      ),
    );
  }
}

/// Text that is read by screen readers but not drawn: a heading for a
/// group that is obvious by sight, or extra context for an icon.
class LdsVisuallyHidden extends StatelessWidget {
  /// Creates visually hidden text.
  const LdsVisuallyHidden(this.label, {super.key, this.header = false});

  /// What screen readers read.
  final String label;

  /// Announce it as a heading.
  final bool header;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      label: label,
      header: header,
      child: const SizedBox.shrink(),
    );
  }
}
