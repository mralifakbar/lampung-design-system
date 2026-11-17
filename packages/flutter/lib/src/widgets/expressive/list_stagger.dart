import 'dart:math' as math;

import 'package:flutter/widgets.dart';

import 'enter_and_exit.dart';

/// One item of a group that arrived together: fades in from a 4 px blur and
/// a 4 px rise, [index] steps of 35 ms after the first.
///
/// The delay stops growing at the fifth item, so a cascade of any length
/// ends by 380 ms. Use it in a builder (`ListView.builder`) when the list is
/// not a plain column; otherwise use [LdsListStagger].
class LdsStaggerItem extends StatelessWidget {
  /// Creates a staggered item.
  const LdsStaggerItem({
    super.key,
    required this.index,
    required this.child,
    this.animate = true,
  });

  /// Position in reading order, starting at 0.
  final int index;

  /// The item.
  final Widget child;

  /// False shows the item at once (a list that was already on screen).
  final bool animate;

  /// The delay for the item at [index]: `min(index, 4) × 35 ms`.
  static Duration delayFor(int index) =>
      Duration(milliseconds: math.min(math.max(index, 0), 4) * 35);

  @override
  Widget build(BuildContext context) => LdsBlurIn(
        delay: delayFor(index),
        animate: animate,
        child: child,
      );
}

/// A column of items that arrived together, each following the one before
/// by 35 ms (`lds-blur-in`, 240 ms on the enter curve).
///
/// Stagger only what arrived because the person asked (search results, new
/// notifications, the first dashboard load). The content is in the tree from
/// the start, so screen readers see it at once. Change [arrivalKey] to play
/// the cascade again for a new set of results. Under reduced motion the items
/// simply appear.
class LdsListStagger extends StatelessWidget {
  /// Creates a staggered column.
  const LdsListStagger({
    super.key,
    required this.children,
    this.spacing = 0,
    this.crossAxisAlignment = CrossAxisAlignment.stretch,
    this.animate = true,
    this.arrivalKey,
  });

  /// The items, in reading order.
  final List<Widget> children;

  /// Space between items.
  final double spacing;

  /// Horizontal alignment of the items.
  final CrossAxisAlignment crossAxisAlignment;

  /// False shows every item at once.
  final bool animate;

  /// A value that identifies this arrival; a new value replays the cascade.
  final Object? arrivalKey;

  @override
  Widget build(BuildContext context) {
    return Column(
      key: arrivalKey == null ? null : ValueKey<Object>(arrivalKey!),
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: crossAxisAlignment,
      children: [
        for (var i = 0; i < children.length; i++) ...[
          if (i > 0 && spacing > 0) SizedBox(height: spacing),
          LdsStaggerItem(index: i, animate: animate, child: children[i]),
        ],
      ],
    );
  }
}

