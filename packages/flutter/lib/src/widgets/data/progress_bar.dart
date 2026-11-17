import 'package:flutter/material.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../badge.dart';

/// How far a task has come: an upload, a form, a quota.
///
/// The fill eases to each new value over 480 ms and retargets smoothly.
/// A null [value] is indeterminate: a segment sweeps while the size of the
/// work is unknown (once under reduced motion, so pair it with words).
class LdsProgressBar extends StatefulWidget {
  /// Creates a progress bar.
  const LdsProgressBar({
    super.key,
    required this.value,
    this.label,
    this.valueLabel,
    this.thin = false,
    this.tone = LdsTone.accent,
    this.semanticLabel,
  });

  /// From 0 to 1; null for indeterminate.
  final double? value;

  /// Label above the bar, on the left.
  final String? label;

  /// Value in words above the bar, on the right ("64%", "Selesai").
  final String? valueLabel;

  /// 4 px instead of 6, inside cards and rows.
  final bool thin;

  /// Fill color: accent while running, success when done, danger when it
  /// failed.
  final LdsTone tone;

  /// Names the bar when there is no [label].
  final String? semanticLabel;

  @override
  State<LdsProgressBar> createState() => _LdsProgressBarState();
}

class _LdsProgressBarState extends State<LdsProgressBar>
    with SingleTickerProviderStateMixin {
  late final AnimationController _sweep = AnimationController(
    vsync: this,
    duration: const Duration(milliseconds: 1400),
  );

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _sync();
  }

  @override
  void didUpdateWidget(LdsProgressBar oldWidget) {
    super.didUpdateWidget(oldWidget);
    _sync();
  }

  void _sync() {
    if (widget.value != null) {
      _sweep.stop();
    } else if (context.ldsReduceMotion) {
      if (!_sweep.isAnimating && _sweep.value == 0) _sweep.forward();
    } else if (!_sweep.isAnimating) {
      _sweep.repeat();
    }
  }

  @override
  void dispose() {
    _sweep.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final fill = LdsToneColors.of(c, widget.tone).solid;
    final h = widget.thin ? 4.0 : 6.0;
    final v = widget.value?.clamp(0.0, 1.0);
    final reduce = context.ldsReduceMotion;

    final Widget track = ClipRRect(
      borderRadius: BorderRadius.circular(h / 2),
      child: Container(
        height: h,
        color: c.bgTrack,
        child: v == null
            ? AnimatedBuilder(
                animation: _sweep,
                builder: (context, _) {
                  final t = LdsMotion.inoutCurve.transform(_sweep.value);
                  return FractionallySizedBox(
                    widthFactor: 0.4,
                    alignment: Alignment(-1 + t * 2, 0) * 1.7,
                    child: ColoredBox(color: fill),
                  );
                },
              )
            : TweenAnimationBuilder<double>(
                tween: Tween(end: v),
                duration: reduce ? LdsMotion.instant : LdsMotion.considered,
                curve: reduce ? Curves.linear : LdsMotion.inoutCurve,
                builder: (context, x, _) => Align(
                  alignment: AlignmentDirectional.centerStart,
                  child: FractionallySizedBox(
                    widthFactor: x,
                    heightFactor: 1,
                    child: AnimatedContainer(
                      duration: context.ldsDuration(LdsMotion.standard),
                      color: fill,
                    ),
                  ),
                ),
              ),
      ),
    );

    final bar = Semantics(
      label: widget.label ?? widget.semanticLabel,
      value: v == null ? null : '${(v * 100).round()}%',
      child: track,
    );
    if (widget.label == null && widget.valueLabel == null) return bar;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      mainAxisSize: MainAxisSize.min,
      children: [
        ExcludeSemantics(
          child: Row(
            children: [
              Expanded(
                child: Text(widget.label ?? '',
                    style: LdsType.footnote.copyWith(color: c.textSubtle)),
              ),
              if (widget.valueLabel != null)
                Text(
                  widget.valueLabel!,
                  style: LdsType.footnote.copyWith(
                    color: c.textStrong,
                    fontWeight: FontWeight.w600,
                    fontFeatures: const [FontFeature.tabularFigures()],
                  ),
                ),
            ],
          ),
        ),
        const SizedBox(height: 8),
        bar,
      ],
    );
  }
}
