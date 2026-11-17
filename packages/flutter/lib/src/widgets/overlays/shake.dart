import 'dart:async';

import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';

import '../../motion.dart';
import '../../tokens.g.dart';

/// Triggers an [LdsShake].
class LdsShakeController extends ChangeNotifier {
  /// Plays the shake once; calling it mid-shake restarts it.
  void shake() => notifyListeners();
}

/// A refusal: the child shakes twice, quickly and with shrinking swings
/// (360 ms: -6, +5, -3, +2 px), with an error haptic. Always say the reason
/// in words next to it; under reduced motion the words carry it alone.
class LdsShake extends StatefulWidget {
  /// Creates a shake wrapper.
  const LdsShake({
    super.key,
    required this.controller,
    required this.child,
    this.haptic = true,
  });

  /// Call [LdsShakeController.shake] to play.
  final LdsShakeController controller;

  /// The control that refuses.
  final Widget child;

  /// Play an error haptic with the shake.
  final bool haptic;

  @override
  State<LdsShake> createState() => _LdsShakeState();
}

class _LdsShakeState extends State<LdsShake>
    with SingleTickerProviderStateMixin {
  late final AnimationController _anim = AnimationController(
    vsync: this,
    duration: const Duration(milliseconds: 360),
  );

  static final Animatable<double> _offset = TweenSequence<double>([
    TweenSequenceItem(tween: Tween(begin: 0, end: -6), weight: 1),
    TweenSequenceItem(tween: Tween(begin: -6, end: 5), weight: 2),
    TweenSequenceItem(tween: Tween(begin: 5, end: -3), weight: 2),
    TweenSequenceItem(tween: Tween(begin: -3, end: 2), weight: 2),
    TweenSequenceItem(tween: Tween(begin: 2, end: 0), weight: 1),
  ]).chain(CurveTween(curve: LdsMotion.standardCurve));

  @override
  void initState() {
    super.initState();
    widget.controller.addListener(_play);
  }

  @override
  void didUpdateWidget(LdsShake oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.controller != widget.controller) {
      oldWidget.controller.removeListener(_play);
      widget.controller.addListener(_play);
    }
  }

  @override
  void dispose() {
    widget.controller.removeListener(_play);
    _anim.dispose();
    super.dispose();
  }

  void _play() {
    if (widget.haptic) unawaited(HapticFeedback.heavyImpact());
    if (context.ldsReduceMotion) return;
    _anim.forward(from: 0);
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _anim,
      builder: (context, child) => Transform.translate(
        offset: Offset(_offset.evaluate(_anim), 0),
        child: child,
      ),
      child: widget.child,
    );
  }
}
