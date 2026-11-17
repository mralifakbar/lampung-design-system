import 'dart:ui' as ui;

import 'package:flutter/widgets.dart';

import '../../motion.dart';
import '../../tokens.g.dart';

/// How an [LdsEnterExit] layer arrives and leaves.
enum LdsEnterStyle {
  /// Menus and popovers: from `scale(0.96)` and 4 px up, grown from
  /// [LdsEnterExit.origin].
  menu(0.96, -4, 0),

  /// Dialogs and the command palette: from 4 px below and `scale(0.98)`.
  dialog(0.98, 4, 0),

  /// Toasts: from 24 px below and `scale(0.96)`; they leave 12 px down.
  toast(0.96, 24, 0),

  /// An item joining something already on screen: from 4 px below with a
  /// 4 px blur.
  item(1, 4, 4),

  /// Tags and small chips: pop in from `scale(0.6)` on the snappy spring.
  pop(0.6, 0, 0);

  const LdsEnterStyle(this.fromScale, this.fromDy, this.fromBlur);

  /// Scale at the start of the entrance.
  final double fromScale;

  /// Vertical offset, in logical pixels, at the start of the entrance.
  final double fromDy;

  /// Blur radius at the start of the entrance.
  final double fromBlur;
}

/// Shows [child] while [visible] is true, entering slowly and leaving fast
/// along the same path.
///
/// Opacity enters over `fast` (160 ms) while the transform settles on the
/// smooth spring (560 ms); the exit takes `exit` (180 ms) on the exit curve
/// and never bounces. Toggling mid-flight reverses from where it is. After
/// the exit the child is removed from the tree (and from the focus order).
///
/// Under reduced motion the layer only fades, in 120 ms, with no scale or
/// travel.
class LdsEnterExit extends StatefulWidget {
  /// Creates an enter and exit transition.
  const LdsEnterExit({
    super.key,
    required this.visible,
    required this.child,
    this.style = LdsEnterStyle.dialog,
    this.origin = Alignment.center,
    this.onExited,
  });

  /// Whether the child is shown.
  final bool visible;

  /// The layer or item.
  final Widget child;

  /// Which recipe to use.
  final LdsEnterStyle style;

  /// Where the scale grows from, for example [Alignment.topLeft] for a menu
  /// opened from a trigger at its top left.
  final Alignment origin;

  /// Called once the exit has finished and the child is gone.
  final VoidCallback? onExited;

  @override
  State<LdsEnterExit> createState() => _LdsEnterExitState();
}

class _LdsEnterExitState extends State<LdsEnterExit>
    with SingleTickerProviderStateMixin {
  late final AnimationController _c = AnimationController(
    vsync: this,
    duration: _enterDuration,
    reverseDuration: LdsMotion.exit,
    value: widget.visible ? 1 : 0,
  )..addStatusListener(_onStatus);

  Duration get _enterDuration => widget.style == LdsEnterStyle.pop
      ? LdsMotion.snappySpringDuration
      : widget.style == LdsEnterStyle.item
          ? LdsMotion.standard
          : LdsMotion.smoothSpringDuration;

  void _onStatus(AnimationStatus status) {
    if (status == AnimationStatus.dismissed) {
      setState(() {});
      widget.onExited?.call();
    }
  }

  @override
  void didUpdateWidget(LdsEnterExit oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.visible == widget.visible) return;
    final reduce = context.ldsReduceMotion;
    _c.duration = reduce ? LdsMotion.instant : _enterDuration;
    _c.reverseDuration = reduce ? LdsMotion.instant : LdsMotion.exit;
    if (widget.visible) {
      _c.forward();
    } else {
      _c.reverse();
    }
  }

  @override
  void dispose() {
    _c.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (_c.isDismissed && !widget.visible) return const SizedBox.shrink();
    final reduce = context.ldsReduceMotion;
    final style = widget.style;
    return AnimatedBuilder(
      animation: _c,
      child: widget.child,
      builder: (context, child) {
        final t = _c.value;
        final entering = _c.status == AnimationStatus.forward ||
            _c.status == AnimationStatus.completed;
        final double opacity;
        final double move;
        if (reduce) {
          opacity = t;
          move = 1;
        } else if (entering) {
          // Opacity is readable almost at once; the transform keeps settling.
          final ms = _enterDuration.inMilliseconds;
          final fadeEnd = (LdsMotion.fast.inMilliseconds / ms).clamp(0.0, 1.0);
          opacity = Interval(0, fadeEnd, curve: LdsMotion.enterCurve)
              .transform(t);
          move = style == LdsEnterStyle.item
              ? LdsMotion.enterCurve.transform(t)
              : style == LdsEnterStyle.pop
                  ? LdsSpringCurve.snappy.transform(t)
                  : LdsSpringCurve.smooth.transform(t);
        } else {
          // Leaving: accelerate away along the same path.
          final out = 1 - LdsMotion.exitCurve.transform(1 - t);
          opacity = out;
          move = out;
        }
        final rest = 1 - move;
        final dy = !entering && style == LdsEnterStyle.toast
            ? 12 * rest
            : style.fromDy * rest;
        final scale = 1 - (1 - style.fromScale) * rest;
        Widget result = Transform.translate(
          offset: Offset(0, dy),
          child: Transform.scale(
            scale: scale,
            alignment: widget.origin,
            child: child,
          ),
        );
        final blur = style.fromBlur * rest;
        result = ImageFiltered(
          enabled: blur > 0.01,
          imageFilter: ui.ImageFilter.blur(sigmaX: blur, sigmaY: blur),
          child: result,
        );
        return Opacity(opacity: opacity.clamp(0.0, 1.0), child: result);
      },
    );
  }
}

/// Plays a one-shot entrance on first build: [child] fades in from a small
/// blur and a short rise (the `lds-blur-in` recipe).
///
/// Used for items that arrive (a new row, a tab panel) and, with [delay], for
/// staggers. Under reduced motion the child simply appears.
class LdsBlurIn extends StatefulWidget {
  /// Creates a blur-in entrance.
  const LdsBlurIn({
    super.key,
    required this.child,
    this.delay = Duration.zero,
    this.duration = LdsMotion.standard,
    this.curve = LdsMotion.enterCurve,
    this.rise = 4,
    this.blur = 4,
    this.animate = true,
  });

  /// The arriving content.
  final Widget child;

  /// Wait before the entrance starts. The child is hidden while waiting.
  final Duration delay;

  /// Length of the entrance after [delay].
  final Duration duration;

  /// Easing of the entrance.
  final Curve curve;

  /// Distance risen, in logical pixels.
  final double rise;

  /// Starting blur radius, in logical pixels. Zero skips the blur.
  final double blur;

  /// False shows the child at once (for content that was already there).
  final bool animate;

  @override
  State<LdsBlurIn> createState() => _LdsBlurInState();
}

class _LdsBlurInState extends State<LdsBlurIn>
    with SingleTickerProviderStateMixin {
  late final AnimationController _c = AnimationController(
    vsync: this,
    duration: widget.delay + widget.duration,
  );
  bool _started = false;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (_started) return;
    _started = true;
    if (!widget.animate || context.ldsReduceMotion) {
      _c.value = 1;
    } else {
      _c.forward();
    }
  }

  @override
  void dispose() {
    _c.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final total = (widget.delay + widget.duration).inMicroseconds;
    final start =
        total == 0 ? 0.0 : widget.delay.inMicroseconds / total;
    final curve = Interval(start, 1, curve: widget.curve);
    return AnimatedBuilder(
      animation: _c,
      child: widget.child,
      builder: (context, child) {
        final p = _c.isCompleted ? 1.0 : curve.transform(_c.value);
        final rest = 1 - p;
        Widget result = Transform.translate(
          offset: Offset(0, widget.rise * rest),
          child: child,
        );
        final blur = widget.blur * rest;
        result = ImageFiltered(
          enabled: blur > 0.01,
          imageFilter: ui.ImageFilter.blur(sigmaX: blur, sigmaY: blur),
          child: result,
        );
        return Opacity(opacity: p.clamp(0.0, 1.0), child: result);
      },
    );
  }
}
