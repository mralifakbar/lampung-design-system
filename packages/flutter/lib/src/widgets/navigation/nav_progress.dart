import 'dart:async';

import 'package:flutter/widgets.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';

/// A 3 px accent bar along the top edge that runs while the next page
/// loads.
///
/// Set [running] when navigation starts and clear it when the page is in.
/// It only shows when navigation is still running after [delay], so fast
/// pages never flash it. While running it eases toward 85 % of the width,
/// so a slow load never seems to finish. With reduced motion the bar is full
/// width and only fades. It is decorative and hidden from screen readers.
class LdsNavProgress extends StatefulWidget {
  /// Creates a navigation progress bar.
  const LdsNavProgress({
    super.key,
    required this.running,
    this.delay = const Duration(milliseconds: 150),
  });

  /// Whether navigation is in flight.
  final bool running;

  /// How long navigation must run before the bar shows.
  final Duration delay;

  @override
  State<LdsNavProgress> createState() => _LdsNavProgressState();
}

class _LdsNavProgressState extends State<LdsNavProgress>
    with TickerProviderStateMixin {
  late final AnimationController _scale = AnimationController(vsync: this);
  late final AnimationController _opacity = AnimationController(vsync: this);
  Timer? _timer;

  static const Cubic _runCurve = Cubic(0.1, 0.7, 0.2, 1);

  @override
  void initState() {
    super.initState();
    if (widget.running) _scheduleStart();
  }

  @override
  void didUpdateWidget(LdsNavProgress oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.running == widget.running) return;
    if (widget.running) {
      _scheduleStart();
    } else {
      _finish();
    }
  }

  void _scheduleStart() {
    _timer?.cancel();
    _timer = Timer(widget.delay, _start);
  }

  void _start() {
    if (!mounted || !widget.running) return;
    final reduce = context.ldsReduceMotion;
    _opacity.animateTo(
      1,
      duration: reduce ? LdsMotion.instant : const Duration(milliseconds: 80),
    );
    if (reduce) {
      _scale.value = 1;
    } else {
      _scale.value = 0;
      _scale.animateTo(
        0.85,
        duration: const Duration(milliseconds: 2400),
        curve: _runCurve,
      );
    }
  }

  void _finish() {
    _timer?.cancel();
    final reduce = context.ldsReduceMotion;
    if (reduce) {
      _opacity.animateTo(0, duration: LdsMotion.instant);
      return;
    }
    _scale.animateTo(
      0,
      duration: const Duration(milliseconds: 200),
      curve: LdsMotion.standardCurve,
    );
    _opacity.animateTo(
      0,
      duration: const Duration(milliseconds: 360),
      curve: const Interval(1 / 3, 1, curve: LdsMotion.exitCurve),
    );
  }

  @override
  void dispose() {
    _timer?.cancel();
    _scale.dispose();
    _opacity.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final color = context.lds.accent;
    return ExcludeSemantics(
      child: IgnorePointer(
        child: SizedBox(
          height: 3,
          width: double.infinity,
          child: AnimatedBuilder(
            animation: Listenable.merge([_scale, _opacity]),
            builder: (context, _) => Opacity(
              opacity: _opacity.value,
              child: FractionallySizedBox(
                alignment: AlignmentDirectional.centerStart,
                widthFactor: _scale.value,
                child: ColoredBox(color: color),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
