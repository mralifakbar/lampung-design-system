import 'package:flutter/gestures.dart';
import 'package:flutter/physics.dart';
import 'package:flutter/services.dart';
import 'package:material_ui/material_ui.dart';

import '../../motion.dart';
import '../../tokens.g.dart';

/// The formulas behind every drag in the system.
abstract final class LdsMomentum {
  /// Offset shown for a drag [over] pixels past a limit: it slows smoothly
  /// and never stops dead. [dim] is 120 for sheets, 52 for a slide knob and
  /// 40 for swipe rows.
  static double rubberBand(double over, double dim) {
    final sign = over < 0 ? -1.0 : 1.0;
    final o = over.abs();
    return sign * (o * dim * 0.55) / (dim + 0.55 * o);
  }

  /// Where a throw released at [position] with [velocity] (pixels per
  /// second) is heading: about a tenth of a second of travel further.
  static double project(double position, double velocity) =>
      position + (velocity / 1000) * 0.99 / (1 - 0.99);
}

/// A handle that follows the finger 1:1, resists softly past its ends and,
/// on release, goes where the throw was heading: the release velocity is
/// projected forward to pick the nearest of [snapPoints], then the momentum
/// spring (a hint of overshoot) settles it there.
///
/// Every drag needs a non-drag equivalent: the arrow keys (and the screen
/// reader increase and decrease actions) move to the next snap point.
/// Under reduced motion the drag still follows the finger, but release
/// settles in 120 ms with no overshoot.
class LdsMomentumDrag extends StatefulWidget {
  /// Creates a momentum drag.
  const LdsMomentumDrag({
    super.key,
    required this.child,
    required this.snapPoints,
    required this.semanticLabel,
    this.axis = Axis.horizontal,
    this.initialIndex = 0,
    this.resistance = 52,
    this.onSnap,
    this.snapLabels,
  }) : assert(snapPoints.length > 0, 'Give at least one snap point.');

  /// The thing being dragged.
  final Widget child;

  /// Resting offsets along [axis], in logical pixels, in increasing order.
  final List<double> snapPoints;

  /// What the handle is, for screen readers ("Geser untuk konfirmasi").
  final String semanticLabel;

  /// Direction of travel.
  final Axis axis;

  /// Starting snap point.
  final int initialIndex;

  /// How far past an end the handle can be pulled before it barely moves.
  final double resistance;

  /// Called with the index of the snap point the handle settled on.
  final ValueChanged<int>? onSnap;

  /// Spoken value for each snap point; defaults to "1 dari 3".
  final List<String>? snapLabels;

  @override
  State<LdsMomentumDrag> createState() => _LdsMomentumDragState();
}

class _LdsMomentumDragState extends State<LdsMomentumDrag>
    with SingleTickerProviderStateMixin {
  late final AnimationController _c = AnimationController.unbounded(
    vsync: this,
    value: widget.snapPoints[widget.initialIndex],
  );
  late int _index = widget.initialIndex;
  double _raw = 0;

  double get _min => widget.snapPoints.first;
  double get _max => widget.snapPoints.last;

  double _resist(double raw) {
    if (raw < _min) {
      return _min + LdsMomentum.rubberBand(raw - _min, widget.resistance);
    }
    if (raw > _max) {
      return _max + LdsMomentum.rubberBand(raw - _max, widget.resistance);
    }
    return raw;
  }

  void _start(DragStartDetails d) {
    _c.stop();
    _raw = _c.value;
  }

  void _update(DragUpdateDetails d) {
    _raw += widget.axis == Axis.horizontal ? d.delta.dx : d.delta.dy;
    _c.value = _resist(_raw);
  }

  void _end(DragEndDetails d) {
    final v = widget.axis == Axis.horizontal
        ? d.velocity.pixelsPerSecond.dx
        : d.velocity.pixelsPerSecond.dy;
    final projected = LdsMomentum.project(_c.value, v);
    var best = 0;
    for (var i = 1; i < widget.snapPoints.length; i++) {
      if ((widget.snapPoints[i] - projected).abs() <
          (widget.snapPoints[best] - projected).abs()) {
        best = i;
      }
    }
    _settle(best, velocity: v, momentum: true);
  }

  void _settle(int index, {double velocity = 0, bool momentum = false}) {
    final target = widget.snapPoints[index];
    if (context.ldsReduceMotion) {
      _c.animateTo(target, duration: LdsMotion.instant);
    } else {
      _c.animateWith(
        SpringSimulation(
          momentum ? LdsMotion.momentumSpring : LdsMotion.smoothSpring,
          _c.value,
          target,
          velocity,
        ),
      );
    }
    if (index != _index) {
      setState(() => _index = index);
    }
    widget.onSnap?.call(index);
  }

  void _step(int delta) {
    final next = (_index + delta).clamp(0, widget.snapPoints.length - 1);
    if (next != _index) _settle(next);
  }

  String _label(int i) =>
      widget.snapLabels?[i] ?? '${i + 1} dari ${widget.snapPoints.length}';

  @override
  void dispose() {
    _c.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final horizontal = widget.axis == Axis.horizontal;
    final last = widget.snapPoints.length - 1;
    final forward = horizontal
        ? LogicalKeyboardKey.arrowRight
        : LogicalKeyboardKey.arrowDown;
    final back = horizontal
        ? LogicalKeyboardKey.arrowLeft
        : LogicalKeyboardKey.arrowUp;
    return Semantics(
      label: widget.semanticLabel,
      value: _label(_index),
      increasedValue: _index < last ? _label(_index + 1) : null,
      decreasedValue: _index > 0 ? _label(_index - 1) : null,
      onIncrease: _index < last ? () => _step(1) : null,
      onDecrease: _index > 0 ? () => _step(-1) : null,
      child: FocusableActionDetector(
        shortcuts: {
          SingleActivator(forward): const _StepIntent(1),
          SingleActivator(back): const _StepIntent(-1),
        },
        actions: {
          _StepIntent: CallbackAction<_StepIntent>(
            onInvoke: (intent) => _step(intent.delta),
          ),
        },
        mouseCursor: SystemMouseCursors.grab,
        child: GestureDetector(
          dragStartBehavior: DragStartBehavior.down,
          onHorizontalDragStart: horizontal ? _start : null,
          onHorizontalDragUpdate: horizontal ? _update : null,
          onHorizontalDragEnd: horizontal ? _end : null,
          onVerticalDragStart: horizontal ? null : _start,
          onVerticalDragUpdate: horizontal ? null : _update,
          onVerticalDragEnd: horizontal ? null : _end,
          child: AnimatedBuilder(
            animation: _c,
            child: widget.child,
            builder: (context, child) => Transform.translate(
              offset: horizontal ? Offset(_c.value, 0) : Offset(0, _c.value),
              child: child,
            ),
          ),
        ),
      ),
    );
  }
}

class _StepIntent extends Intent {
  const _StepIntent(this.delta);

  final int delta;
}
