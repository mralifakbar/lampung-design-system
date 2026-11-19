import 'package:flutter/widgets.dart';

import '../../motion.dart';
import '../../tokens.g.dart';

/// Opens or closes [child] in the flow on the smooth spring, so everything
/// below slides instead of jumping.
///
/// With [fade] the content fades in just after the space opens (rising 4 px)
/// and fades out before it closes. A second toggle mid-way reverses from
/// where it is. While closed the child keeps its state but is hidden from
/// focus, hit testing and screen readers.
class LdsHeightExpand extends StatefulWidget {
  /// Creates a height expand.
  const LdsHeightExpand({
    super.key,
    required this.open,
    required this.child,
    this.fade = true,
    this.axis = Axis.vertical,
  });

  /// Whether the content is shown.
  final bool open;

  /// The content.
  final Widget child;

  /// Fade and rise the content as it opens; fade it first as it closes.
  final bool fade;

  /// [Axis.vertical] animates height; [Axis.horizontal] animates width.
  final Axis axis;

  @override
  State<LdsHeightExpand> createState() => _LdsHeightExpandState();
}

class _LdsHeightExpandState extends State<LdsHeightExpand>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller = AnimationController(
    vsync: this,
    value: widget.open ? 1 : 0,
  );
  bool _opening = true;

  @override
  void didUpdateWidget(LdsHeightExpand oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.open != widget.open) {
      _opening = widget.open;
      _controller.animateTo(
        widget.open ? 1 : 0,
        duration: context.ldsDuration(LdsMotion.smoothSpringDuration),
        curve: LdsSpringCurve.smooth,
      );
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
        final t = _controller.value.clamp(0.0, 1.0);
        final vertical = widget.axis == Axis.vertical;
        Widget content = child!;
        if (widget.fade) {
          final o = _opening
              ? const Interval(0.15, 0.6).transform(t)
              : const Interval(0.6, 1).transform(t);
          content = Opacity(
            opacity: o,
            child: Transform.translate(
              offset: vertical ? Offset(0, -4 * (1 - o)) : Offset.zero,
              child: content,
            ),
          );
        }
        final closed = t == 0 && !widget.open;
        return ExcludeFocus(
          excluding: !widget.open,
          child: Visibility(
            visible: !closed,
            maintainState: true,
            child: ClipRect(
              child: Align(
                alignment: AlignmentDirectional.topStart,
                heightFactor: vertical ? t : null,
                widthFactor: vertical ? null : t,
                child: content,
              ),
            ),
          ),
        );
      },
    );
  }
}
