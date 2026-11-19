import 'package:material_ui/material_ui.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';

/// The state an [LdsStatusDot] reports.
enum LdsStatus {
  /// Unknown, ended, off.
  neutral,

  /// Running, healthy, connected.
  ok,

  /// Degraded, delayed, starting late.
  warn,

  /// Stopped, failed, unavailable.
  down,

  /// Happening now; the dot pulses three times when it appears.
  live,
}

/// An 8 px dot and the state in words: "Layanan berjalan", "Server mati".
///
/// The words are required; the dot only repeats them in color.
class LdsStatusDot extends StatefulWidget {
  /// Creates a status dot.
  const LdsStatusDot(this.label, {super.key, this.status = LdsStatus.neutral});

  /// The state in words.
  final String label;

  /// Which state.
  final LdsStatus status;

  @override
  State<LdsStatusDot> createState() => _LdsStatusDotState();
}

class _LdsStatusDotState extends State<LdsStatusDot>
    with SingleTickerProviderStateMixin {
  late final AnimationController _pulse = AnimationController(
    vsync: this,
    duration: const Duration(milliseconds: 1800),
  );
  int _runs = 0;

  @override
  void initState() {
    super.initState();
    _pulse.addStatusListener((s) {
      // Three pulses, then still: a forever pulse turns into noise.
      if (s == AnimationStatus.completed && ++_runs < 3 && mounted) {
        _pulse.forward(from: 0);
      }
    });
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _maybePulse();
  }

  @override
  void didUpdateWidget(LdsStatusDot oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.status != widget.status) {
      _runs = 0;
      _pulse.reset();
      _maybePulse();
    }
  }

  void _maybePulse() {
    if (widget.status != LdsStatus.live || context.ldsReduceMotion) return;
    if (_runs == 0 && !_pulse.isAnimating) _pulse.forward(from: 0);
  }

  @override
  void dispose() {
    _pulse.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final color = switch (widget.status) {
      LdsStatus.neutral => c.neutral,
      LdsStatus.ok || LdsStatus.live => c.success,
      LdsStatus.warn => c.warning,
      LdsStatus.down => c.danger,
    };
    final dot = SizedBox.square(
      dimension: 8,
      child: AnimatedBuilder(
        animation: _pulse,
        builder: (context, _) {
          final t = LdsMotion.inoutCurve.transform(_pulse.value);
          final pulsing = _pulse.isAnimating;
          return DecoratedBox(
            decoration: BoxDecoration(
              color: color,
              shape: BoxShape.circle,
              boxShadow: pulsing
                  ? [
                      BoxShadow(
                        color: color.withValues(alpha: 0.45 * (1 - t)),
                        spreadRadius: 6 * t,
                      ),
                    ]
                  : null,
            ),
          );
        },
      ),
    );
    return MergeSemantics(
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          dot,
          const SizedBox(width: 8),
          Flexible(
            child: Text(
              widget.label,
              style: LdsType.subhead.copyWith(
                height: 20 / 14,
                color: c.textDefault,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
