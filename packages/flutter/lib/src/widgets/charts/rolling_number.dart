import 'package:flutter/material.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '_chart_utils.dart';

/// A whole number whose digits each slide to their new value on the smooth
/// spring, like an odometer. For a count that changes while the person
/// watches (antrean, laporan masuk).
///
/// Columns are added or removed as the number grows or shrinks; with
/// reduced motion the digits change in place. Screen readers hear the
/// value once, not the columns.
class LdsRollingNumber extends StatelessWidget {
  /// Creates a rolling number.
  const LdsRollingNumber(
    this.value, {
    super.key,
    this.style,
    this.groupSeparator = '.',
    this.semanticLabel,
  });

  /// The value.
  final int value;

  /// Text style; defaults to a 40 px semibold figure.
  final TextStyle? style;

  /// Thousands separator, or empty for none.
  final String groupSeparator;

  /// Words around the value for screen readers; defaults to the value.
  final String? semanticLabel;

  String get _text {
    final digits = value.abs().toString();
    final b = StringBuffer(value < 0 ? '−' : '');
    for (var i = 0; i < digits.length; i++) {
      if (i > 0 && (digits.length - i) % 3 == 0) b.write(groupSeparator);
      b.write(digits[i]);
    }
    return b.toString();
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final s = (style ??
            TextStyle(
              fontFamily: LdsType.family,
              fontSize: 40,
              fontWeight: FontWeight.w600,
              letterSpacing: -1.2,
              color: c.textStrong,
            ))
        .copyWith(height: 1.2, fontFeatures: tabular);
    final text = _text;
    final probe = layoutText('0', s);
    final h = probe.height;
    final duration = context.ldsDuration(LdsMotion.smoothSpringDuration);
    final chars = text.split('');
    return Semantics(
      label: semanticLabel ?? text,
      excludeSemantics: true,
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          for (var i = 0; i < chars.length; i++)
            int.tryParse(chars[i]) == null
                ? Text(chars[i], style: s)
                : _Column(
                    // Keyed from the right so a new leading digit does not
                    // make every other column roll.
                    key: ValueKey(chars.length - i),
                    digit: int.parse(chars[i]),
                    style: s,
                    width: probe.width,
                    height: h,
                    duration: duration,
                  ),
        ],
      ),
    );
  }
}

class _Column extends StatelessWidget {
  const _Column({
    super.key,
    required this.digit,
    required this.style,
    required this.width,
    required this.height,
    required this.duration,
  });

  final int digit;
  final TextStyle style;
  final double width;
  final double height;
  final Duration duration;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: width,
      height: height,
      child: ClipRect(
        child: TweenAnimationBuilder<double>(
          tween: Tween(end: digit.toDouble()),
          duration: duration,
          curve: LdsSpringCurve.smooth,
          builder: (context, d, child) => OverflowBox(
            alignment: Alignment.topCenter,
            minHeight: height * 10,
            maxHeight: height * 10,
            child: Transform.translate(
              offset: Offset(0, -d * height),
              child: child,
            ),
          ),
          child: Column(
            children: [
              for (var n = 0; n < 10; n++)
                SizedBox(
                  height: height,
                  child: Text('$n', style: style, textAlign: TextAlign.center),
                ),
            ],
          ),
        ),
      ),
    );
  }
}
