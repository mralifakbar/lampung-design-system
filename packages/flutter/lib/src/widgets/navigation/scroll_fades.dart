import 'dart:math' as math;

import 'package:flutter/widgets.dart';

/// Fades an edge of a scrolling area only while more content waits beyond
/// it: the leading fade appears once you leave the start, the trailing fade
/// disappears when you reach the end.
///
/// Wrap a scrollable ([ListView], [SingleChildScrollView]). Each fade is as
/// deep as the distance to that edge, capped at [extent], so it follows the
/// scroll directly with no animation.
class LdsScrollFades extends StatefulWidget {
  /// Creates scroll fades.
  const LdsScrollFades({
    super.key,
    required this.child,
    this.axis = Axis.vertical,
    this.extent = 24,
  });

  /// The scrollable.
  final Widget child;

  /// The scroll axis to fade along.
  final Axis axis;

  /// The deepest a fade gets.
  final double extent;

  @override
  State<LdsScrollFades> createState() => _LdsScrollFadesState();
}

class _LdsScrollFadesState extends State<LdsScrollFades> {
  double _a = 0;
  double _b = 0;

  bool _onMetrics(ScrollMetrics m) {
    if (m.axis != widget.axis) return false;
    final a =
        math.min(widget.extent, math.max(0.0, m.pixels - m.minScrollExtent));
    final b =
        math.min(widget.extent, math.max(0.0, m.maxScrollExtent - m.pixels));
    if (a != _a || b != _b) {
      setState(() {
        _a = a;
        _b = b;
      });
    }
    return false;
  }

  @override
  Widget build(BuildContext context) {
    final vertical = widget.axis == Axis.vertical;
    return NotificationListener<ScrollMetricsNotification>(
      onNotification: (n) => _onMetrics(n.metrics),
      child: NotificationListener<ScrollNotification>(
        onNotification: (n) => n.depth == 0 && _onMetrics(n.metrics),
        child: ShaderMask(
          blendMode: BlendMode.dstIn,
          shaderCallback: (rect) {
            final length = vertical ? rect.height : rect.width;
            if (length <= 0) {
              return const LinearGradient(
                      colors: [Color(0xFF000000), Color(0xFF000000)])
                  .createShader(rect);
            }
            final sa = (_a / length).clamp(0.0, 0.5);
            final sb = 1 - (_b / length).clamp(0.0, 0.5);
            return LinearGradient(
              begin: vertical ? Alignment.topCenter : Alignment.centerLeft,
              end: vertical ? Alignment.bottomCenter : Alignment.centerRight,
              colors: [
                _a > 0 ? const Color(0x00000000) : const Color(0xFF000000),
                const Color(0xFF000000),
                const Color(0xFF000000),
                _b > 0 ? const Color(0x00000000) : const Color(0xFF000000),
              ],
              stops: [0, sa, sb, 1],
            ).createShader(rect);
          },
          child: widget.child,
        ),
      ),
    );
  }
}
