import 'package:flutter/physics.dart';
import 'package:flutter/widgets.dart';

import 'tokens.g.dart';

/// A [Curve] that follows a spring from the tokens, for use with fixed-length
/// implicit animations (`AnimatedContainer`, `AnimatedPositioned`, ...).
///
/// The spring runs from 0 to 1 at rest and is sampled over [duration], the
/// same way the CSS `linear()` samples are taken.
class LdsSpringCurve extends Curve {
  /// Creates a curve for [spring] settled over [duration].
  LdsSpringCurve(this.spring, this.duration)
      : _sim = SpringSimulation(spring, 0, 1, 0);

  /// The spring this curve samples.
  final SpringDescription spring;

  /// How long the animation that uses this curve lasts.
  final Duration duration;

  final SpringSimulation _sim;

  /// Presses, toggles, thumbs. No overshoot.
  static final LdsSpringCurve snappy =
      LdsSpringCurve(LdsMotion.snappySpring, LdsMotion.snappySpringDuration);

  /// Panels, sheets, sliding indicators, layout. No overshoot.
  static final LdsSpringCurve smooth =
      LdsSpringCurve(LdsMotion.smoothSpring, LdsMotion.smoothSpringDuration);

  /// Only after a gesture that carried momentum. Small overshoot.
  static final LdsSpringCurve momentum = LdsSpringCurve(
      LdsMotion.momentumSpring, LdsMotion.momentumSpringDuration);

  @override
  double transformInternal(double t) {
    final seconds = duration.inMicroseconds / Duration.microsecondsPerSecond;
    return _sim.x(t * seconds);
  }
}

/// Motion helpers that honor the platform's reduce-motion setting.
extension LdsMotionContext on BuildContext {
  /// True when the platform asks for less motion
  /// ([MediaQueryData.disableAnimations]).
  bool get ldsReduceMotion => MediaQuery.maybeDisableAnimationsOf(this) ?? false;

  /// [duration], or [Duration.zero] when motion is reduced.
  Duration ldsDuration(Duration duration) =>
      ldsReduceMotion ? Duration.zero : duration;
}
