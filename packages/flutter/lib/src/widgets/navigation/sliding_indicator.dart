import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';

/// Shape of the marker drawn by an [LdsSlidingIndicator].
enum LdsIndicatorStyle {
  /// A tinted pill behind the chosen item (sidebar, app shell).
  pill,

  /// A 2 px line under the chosen item (tabs, top nav).
  underline,

  /// A 1.5 px line on the leading edge beside the chosen item (outline).
  rail,
}

/// Lays out [children] in a row or column and moves one marker to the
/// chosen child on the smooth spring.
///
/// Labels never animate on their own; the single moving marker is what tells
/// the eye where the choice went. The first placement is instant, so the
/// marker does not fly in on load. A new choice mid-glide retargets it from
/// where it is.
class LdsSlidingIndicator extends StatefulWidget {
  /// Creates a sliding indicator.
  const LdsSlidingIndicator({
    super.key,
    required this.children,
    required this.selectedIndex,
    this.direction = Axis.vertical,
    this.style = LdsIndicatorStyle.pill,
    this.color,
    this.spacing = 0,
    this.expand = false,
    this.borderRadius,
    this.crossAxisAlignment = CrossAxisAlignment.stretch,
  });

  /// The items, in order.
  final List<Widget> children;

  /// Index of the chosen child; null hides the marker.
  final int? selectedIndex;

  /// Whether the children run in a row or a column.
  final Axis direction;

  /// Shape of the marker.
  final LdsIndicatorStyle style;

  /// Marker color. Defaults to the accent tint for [LdsIndicatorStyle.pill]
  /// and strong text for the lines.
  final Color? color;

  /// Space between children.
  final double spacing;

  /// Give every child an equal share of the main axis.
  final bool expand;

  /// Corner radius of a [LdsIndicatorStyle.pill] marker.
  final BorderRadius? borderRadius;

  /// Cross axis alignment of the children.
  final CrossAxisAlignment crossAxisAlignment;

  @override
  State<LdsSlidingIndicator> createState() => _LdsSlidingIndicatorState();
}

class _LdsSlidingIndicatorState extends State<LdsSlidingIndicator> {
  final List<GlobalKey> _keys = <GlobalKey>[];
  Rect? _rect;
  int? _measuredIndex;
  bool _animate = false;

  void _syncKeys() {
    while (_keys.length < widget.children.length) {
      _keys.add(GlobalKey());
    }
    if (_keys.length > widget.children.length) {
      _keys.removeRange(widget.children.length, _keys.length);
    }
  }

  void _scheduleMeasure() {
    WidgetsBinding.instance.addPostFrameCallback((_) => _measure());
  }

  void _measure() {
    if (!mounted) return;
    final i = widget.selectedIndex;
    final host = context.findRenderObject();
    Rect? next;
    if (i != null && i >= 0 && i < _keys.length && host is RenderBox) {
      final box = _keys[i].currentContext?.findRenderObject();
      if (box is RenderBox && box.hasSize && box.attached) {
        next = box.localToGlobal(Offset.zero, ancestor: host) & box.size;
      }
    }
    if (next != _rect) {
      setState(() {
        // Glide only when the choice changed; a resize re-places at once.
        _animate = _rect != null && next != null && _measuredIndex != i;
        _rect = next;
        _measuredIndex = i;
      });
    }
  }

  Rect _markerRect(Rect r) {
    switch (widget.style) {
      case LdsIndicatorStyle.pill:
        return r;
      case LdsIndicatorStyle.underline:
        return Rect.fromLTWH(r.left, r.bottom - 2, r.width, 2);
      case LdsIndicatorStyle.rail:
        return Rect.fromLTWH(0, r.top, 1.5, r.height);
    }
  }

  @override
  Widget build(BuildContext context) {
    _syncKeys();
    _scheduleMeasure();
    final c = context.lds;
    final color = widget.color ??
        (widget.style == LdsIndicatorStyle.pill ? c.accentTint : c.textStrong);
    final radius = widget.style == LdsIndicatorStyle.pill
        ? (widget.borderRadius ??
            const BorderRadius.all(Radius.circular(LdsRadius.sm)))
        : const BorderRadius.all(Radius.circular(1));

    final items = <Widget>[];
    for (var i = 0; i < widget.children.length; i++) {
      if (i > 0 && widget.spacing > 0) {
        items.add(SizedBox(
          width: widget.direction == Axis.horizontal ? widget.spacing : 0,
          height: widget.direction == Axis.vertical ? widget.spacing : 0,
        ));
      }
      final Widget child =
          KeyedSubtree(key: _keys[i], child: widget.children[i]);
      items.add(widget.expand ? Expanded(child: child) : child);
    }

    final rect = _rect;
    return NotificationListener<SizeChangedLayoutNotification>(
      onNotification: (_) {
        _scheduleMeasure();
        return true;
      },
      child: Stack(
        children: [
          if (rect != null)
            AnimatedPositioned.fromRect(
              rect: _markerRect(rect),
              duration: _animate
                  ? context.ldsDuration(LdsMotion.smoothSpringDuration)
                  : Duration.zero,
              curve: LdsSpringCurve.smooth,
              child: IgnorePointer(
                child: DecoratedBox(
                  decoration: BoxDecoration(color: color, borderRadius: radius),
                ),
              ),
            ),
          SizeChangedLayoutNotifier(
            child: _BoundedCrossAxis(
              axis: widget.direction,
              child: Flex(
                direction: widget.direction,
                mainAxisSize:
                    widget.expand ? MainAxisSize.max : MainAxisSize.min,
                crossAxisAlignment: widget.crossAxisAlignment,
                children: items,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

/// Gives a [Flex] a bounded cross axis when its parent does not, using the
/// children's intrinsic size.
///
/// A row with [CrossAxisAlignment.stretch] inside a vertical list (or a
/// column inside a horizontal one) would otherwise be asked to stretch to an
/// infinite size. When the cross axis is already bounded the constraints
/// pass through untouched, so the row still fills a bounded slot.
class _BoundedCrossAxis extends SingleChildRenderObjectWidget {
  const _BoundedCrossAxis({required this.axis, required Widget super.child});

  /// The main axis of the child flex.
  final Axis axis;

  @override
  RenderObject createRenderObject(BuildContext context) =>
      _RenderBoundedCrossAxis(axis);

  @override
  void updateRenderObject(
      BuildContext context, _RenderBoundedCrossAxis renderObject) {
    renderObject.axis = axis;
  }
}

class _RenderBoundedCrossAxis extends RenderProxyBox {
  _RenderBoundedCrossAxis(this._axis);

  Axis _axis;
  set axis(Axis value) {
    if (value == _axis) return;
    _axis = value;
    markNeedsLayout();
  }

  BoxConstraints _bound(BoxConstraints constraints) {
    final c = child;
    if (c == null) return constraints;
    if (_axis == Axis.horizontal && !constraints.hasBoundedHeight) {
      final h = c.getMaxIntrinsicHeight(constraints.maxWidth);
      return constraints.copyWith(
          maxHeight: h < constraints.minHeight ? constraints.minHeight : h);
    }
    if (_axis == Axis.vertical && !constraints.hasBoundedWidth) {
      final w = c.getMaxIntrinsicWidth(constraints.maxHeight);
      return constraints.copyWith(
          maxWidth: w < constraints.minWidth ? constraints.minWidth : w);
    }
    return constraints;
  }

  @override
  Size computeDryLayout(BoxConstraints constraints) =>
      child?.getDryLayout(_bound(constraints)) ??
      constraints.constrain(Size.zero);

  @override
  void performLayout() {
    final c = child;
    if (c == null) {
      size = constraints.constrain(Size.zero);
      return;
    }
    c.layout(_bound(constraints), parentUsesSize: true);
    size = constraints.constrain(c.size);
  }
}
