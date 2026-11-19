import 'package:material_ui/material_ui.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '_chart_utils.dart';
import 'chart_data.dart';

/// A number that counts from its old value to its new one when it changes
/// in front of someone, on the in-out curve, in tabular figures so the
/// width never jumps.
///
/// With reduced motion it shows the new value at once. Screen readers only
/// hear the settled value.
class LdsNumberCount extends StatefulWidget {
  /// Creates a counting number.
  const LdsNumberCount(
    this.value, {
    super.key,
    this.format = const LdsNumberFormat(),
    this.style,
    this.duration = LdsMotion.considered,
    this.countOnFirstBuild = false,
    this.semanticLabel,
  });

  /// The value to settle on.
  final double value;

  /// How the number reads.
  final LdsNumberFormat format;

  /// Text style; defaults to a 32 px tabular figure.
  final TextStyle? style;

  /// How long one change takes.
  final Duration duration;

  /// Counts up from zero the first time it is shown.
  final bool countOnFirstBuild;

  /// Words around the value for screen readers; defaults to the value.
  final String? semanticLabel;

  @override
  State<LdsNumberCount> createState() => _LdsNumberCountState();
}

class _LdsNumberCountState extends State<LdsNumberCount>
    with SingleTickerProviderStateMixin {
  late final AnimationController _ctrl = AnimationController(
    vsync: this,
    duration: widget.duration,
  )..addListener(() => setState(() {}));
  late double _from = widget.countOnFirstBuild ? 0 : widget.value;
  bool _started = false;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (_started) return;
    _started = true;
    if (widget.countOnFirstBuild && !context.ldsReduceMotion) {
      _ctrl.forward();
    } else {
      _ctrl.value = 1;
    }
  }

  @override
  void didUpdateWidget(LdsNumberCount old) {
    super.didUpdateWidget(old);
    _ctrl.duration = widget.duration;
    if (old.value != widget.value) {
      _from = _shown(old.value);
      if (context.ldsReduceMotion) {
        _ctrl.value = 1;
      } else {
        _ctrl.forward(from: 0);
      }
    }
  }

  double _shown(double to) {
    final t = LdsMotion.inoutCurve.transform(_ctrl.value);
    return _from + (to - _from) * t;
  }

  @override
  void dispose() {
    _ctrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final style =
        (widget.style ??
                TextStyle(
                  fontFamily: LdsType.family,
                  fontSize: 32,
                  height: 36 / 32,
                  fontWeight: FontWeight.w600,
                  letterSpacing: -0.96,
                  color: c.textStrong,
                ))
            .copyWith(fontFeatures: tabular);
    final settled = widget.format.format(widget.value);
    return Semantics(
      label: widget.semanticLabel ?? settled,
      excludeSemantics: true,
      child: Text(widget.format.format(_shown(widget.value)), style: style),
    );
  }
}
