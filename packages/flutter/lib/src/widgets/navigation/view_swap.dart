import 'dart:ui' as ui;

import 'package:flutter/widgets.dart';

import '../../motion.dart';
import '../../tokens.g.dart';

/// Replaces one view with another in the same place: a tab panel, the next
/// step of a form, a different range on a chart.
///
/// When [child] changes type or key, the old view goes at once and the new
/// one fades in from a 4 px blur and a 4 px rise over 240 ms. Give each view
/// a distinct [Key] (for example `ValueKey(tab)`). The first view appears
/// without animation. With reduced motion the new view appears at once.
class LdsViewSwap extends StatefulWidget {
  /// Creates a view swap.
  const LdsViewSwap({super.key, required this.child});

  /// The current view.
  final Widget child;

  @override
  State<LdsViewSwap> createState() => _LdsViewSwapState();
}

class _LdsViewSwapState extends State<LdsViewSwap>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller = AnimationController(
    vsync: this,
    value: 1,
  );

  @override
  void didUpdateWidget(LdsViewSwap oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (!Widget.canUpdate(oldWidget.child, widget.child)) {
      _controller.duration = context.ldsDuration(LdsMotion.standard);
      _controller.forward(from: 0);
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      child: widget.child,
      builder: (context, child) {
        final t = LdsMotion.enterCurve.transform(_controller.value);
        if (t >= 1) return child!;
        final blur = 4 * (1 - t);
        return Opacity(
          opacity: t,
          child: Transform.translate(
            offset: Offset(0, 4 * (1 - t)),
            child: ImageFiltered(
              imageFilter: ui.ImageFilter.blur(sigmaX: blur, sigmaY: blur),
              child: child,
            ),
          ),
        );
      },
    );
  }
}
