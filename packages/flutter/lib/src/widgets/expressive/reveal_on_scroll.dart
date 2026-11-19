import 'dart:math' as math;

import 'package:flutter/widgets.dart';

import '../../motion.dart';
import '../../tokens.g.dart';

/// A figure, key number or picture that fades up 4 px the first time it
/// scrolls into view, once, and never hides again.
///
/// Anything already on the first screen shows at once without fading. Use it
/// on figure-like widgets only, never on text people need to read or
/// controls. [index] staggers a short row by 30 ms (capped at the fourth
/// item). Outside a scrollable, and under reduced motion, the child simply
/// shows.
class LdsReveal extends StatefulWidget {
  /// Creates a reveal-on-scroll wrapper.
  const LdsReveal({super.key, required this.child, this.index = 0});

  /// The figure.
  final Widget child;

  /// Position in a row revealed together, starting at 0.
  final int index;

  @override
  State<LdsReveal> createState() => _LdsRevealState();
}

class _LdsRevealState extends State<LdsReveal>
    with SingleTickerProviderStateMixin {
  // Opacity over 240 ms and transform over 280 ms, plus the stagger.
  late final Duration _delay = Duration(
    milliseconds: math.min(math.max(widget.index, 0), 3) * 30,
  );
  late final AnimationController _c = AnimationController(
    vsync: this,
    duration: _delay + const Duration(milliseconds: 280),
  );
  ScrollPosition? _position;
  bool _decided = false;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    final position = Scrollable.maybeOf(context)?.position;
    if (context.ldsReduceMotion || position == null) {
      _detach();
      if (!_decided) {
        _decided = true;
        _c.value = 1;
      }
      return;
    }
    if (position != _position && !_decided) {
      _detach();
      _position = position..addListener(_schedule);
      WidgetsBinding.instance.addPostFrameCallback((_) => _check(first: true));
    }
  }

  void _detach() {
    _position?.removeListener(_schedule);
    _position = null;
  }

  bool _scheduled = false;

  // Scroll notifications arrive before layout; measure after the frame.
  void _schedule() {
    if (_scheduled) return;
    _scheduled = true;
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _scheduled = false;
      _check();
    });
  }

  void _check({bool first = false}) {
    if (!mounted || _decided) return;
    final box = context.findRenderObject();
    final scrollable = Scrollable.maybeOf(context);
    final viewport = scrollable?.context.findRenderObject();
    if (box is! RenderBox ||
        viewport is! RenderBox ||
        !box.hasSize ||
        !viewport.hasSize) {
      return;
    }
    final vertical =
        scrollable!.axisDirection == AxisDirection.down ||
        scrollable.axisDirection == AxisDirection.up;
    final at = box.localToGlobal(Offset.zero, ancestor: viewport);
    final start = vertical ? at.dy : at.dx;
    final extent = vertical ? viewport.size.height : viewport.size.width;
    final atTop = (_position?.pixels ?? 0) <= (_position?.minScrollExtent ?? 0);
    if (first && atTop && start < extent * 0.95) {
      // Already on the first screen: never fade.
      _decided = true;
      _c.value = 1;
      _detach();
      setState(() {});
      return;
    }
    if (start < extent * 0.94) {
      _decided = true;
      _detach();
      _c.forward();
    }
  }

  @override
  void dispose() {
    _detach();
    _c.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final total = _c.duration!.inMicroseconds;
    final start = _delay.inMicroseconds / total;
    final opacityEnd =
        (_delay.inMicroseconds + LdsMotion.standard.inMicroseconds) / total;
    final fade = Interval(
      start,
      opacityEnd.clamp(start, 1),
      curve: LdsMotion.standardCurve,
    );
    final move = Interval(start, 1, curve: LdsMotion.standardCurve);
    return AnimatedBuilder(
      animation: _c,
      child: widget.child,
      builder: (context, child) => Opacity(
        opacity: fade.transform(_c.value),
        child: Transform.translate(
          offset: Offset(0, 4 * (1 - move.transform(_c.value))),
          child: child,
        ),
      ),
    );
  }
}
