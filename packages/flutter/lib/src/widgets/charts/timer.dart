import 'dart:async';

import 'package:flutter/material.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../icon.dart';
import '_chart_utils.dart';

/// A pill of tabular mono figures that counts down to a real deadline, or,
/// with [LdsTimer.elapsed], counts up against a target.
///
/// It turns to the warning tint when time runs low and to the danger tint
/// at zero (or past the target), then calls [onTimeUp] once. It ticks once
/// a second; reduced motion only drops the color cross-fade.
class LdsTimer extends StatefulWidget {
  /// Counts down from [seconds].
  const LdsTimer({
    super.key,
    required this.seconds,
    this.low = 60,
    this.onTimeUp,
    this.icon,
    this.semanticLabel,
    this.running = true,
  })  : elapsedMode = false,
        target = null;

  /// Counts up from [seconds] already passed, against an optional [target].
  ///
  /// [low] defaults to 80 % of the target.
  const LdsTimer.elapsed({
    super.key,
    required this.seconds,
    this.target,
    int? low,
    this.onTimeUp,
    this.icon,
    this.semanticLabel,
    this.running = true,
  })  : elapsedMode = true,
        low = low ?? -1;

  /// Seconds left (countdown) or already passed (elapsed) at first build.
  final int seconds;

  /// Countdown: seconds left at which it turns low. Elapsed: seconds passed
  /// at which it turns low (default 80 % of [target]).
  final int low;

  /// Elapsed only: seconds after which it is up.
  final int? target;

  /// Called once when time is up.
  final VoidCallback? onTimeUp;

  /// An icon before the time (ligature name), such as `schedule`.
  final String? icon;

  /// What the timer is for ("Sisa waktu sesi"), read before the time.
  final String? semanticLabel;

  /// Pauses the timer when false.
  final bool running;

  /// Whether this counts up.
  final bool elapsedMode;

  /// Formats [seconds] as m:ss, or h:mm:ss from an hour.
  static String formatSeconds(int seconds) {
    final s = seconds.abs();
    final h = s ~/ 3600, m = (s % 3600) ~/ 60, r = s % 60;
    String two(int v) => v.toString().padLeft(2, '0');
    final sign = seconds < 0 ? '−' : '';
    return h > 0 ? '$sign$h:${two(m)}:${two(r)}' : '$sign$m:${two(r)}';
  }

  @override
  State<LdsTimer> createState() => _LdsTimerState();
}

class _LdsTimerState extends State<LdsTimer> {
  late int _value = widget.seconds;
  Timer? _ticker;
  bool _fired = false;

  @override
  void initState() {
    super.initState();
    _sync();
  }

  @override
  void didUpdateWidget(LdsTimer old) {
    super.didUpdateWidget(old);
    if (old.seconds != widget.seconds || old.elapsedMode != widget.elapsedMode) {
      _value = widget.seconds;
      _fired = false;
    }
    _sync();
  }

  void _sync() {
    final shouldRun = widget.running && !(!widget.elapsedMode && _value <= 0);
    if (shouldRun && _ticker == null) {
      _ticker = Timer.periodic(const Duration(seconds: 1), (_) => _tick());
    } else if (!shouldRun) {
      _ticker?.cancel();
      _ticker = null;
    }
    _checkUp();
  }

  void _tick() {
    setState(() {
      _value += widget.elapsedMode ? 1 : -1;
    });
    if (!widget.elapsedMode && _value <= 0) {
      _ticker?.cancel();
      _ticker = null;
    }
    _checkUp();
  }

  bool get _up => widget.elapsedMode
      ? widget.target != null && _value > widget.target!
      : _value <= 0;

  bool get _low {
    if (widget.elapsedMode) {
      final t = widget.target;
      if (t == null) return false;
      final low = widget.low >= 0 ? widget.low : (t * 0.8).round();
      return _value >= low;
    }
    return _value <= widget.low;
  }

  void _checkUp() {
    if (_up && !_fired) {
      _fired = true;
      widget.onTimeUp?.call();
    }
  }

  @override
  void dispose() {
    _ticker?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final shown = widget.elapsedMode ? _value : (_value < 0 ? 0 : _value);
    final (bg, fg, ic) = _up
        ? (c.dangerTint, c.dangerText, c.dangerText)
        : _low
            ? (c.warningTint, c.warningText, c.warningText)
            : (c.bgFill, c.textStrong, c.textSubtle);
    final time = LdsTimer.formatSeconds(shown);
    return Semantics(
      label: [
        if (widget.semanticLabel != null) widget.semanticLabel!,
        time,
        if (_up) 'waktu habis' else if (_low) 'hampir habis',
      ].join(', '),
      excludeSemantics: true,
      child: AnimatedContainer(
        duration: context.ldsDuration(LdsMotion.standard),
        height: 32,
        padding: const EdgeInsets.symmetric(horizontal: 12),
        decoration: BoxDecoration(
          color: bg,
          borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.pill)),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            if (widget.icon != null) ...[
              LdsIcon(widget.icon!, size: 17, color: ic),
              const SizedBox(width: 6),
            ],
            Text(
              time,
              style: TextStyle(
                fontFamily: LdsType.mono,
                fontSize: 15,
                height: 1,
                fontWeight: FontWeight.w600,
                color: fg,
                fontFeatures: tabular,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
