import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../icon.dart';
import '../pressable.dart';
import 'haptics.dart';

/// State of an [LdsLike]: whether it is on and the count.
///
/// Likes are optimistic: [toggle] changes the state at once, then the app
/// calls the server. If the server refuses, call [revert]: the like goes
/// back, the button shakes and an error haptic plays. Show the reason in
/// words next to it.
class LdsLikeController extends ChangeNotifier {
  /// Creates a like state.
  LdsLikeController({bool liked = false, int count = 0})
      : _liked = liked,
        _count = count;

  bool _liked;
  int _count;
  int _reverts = 0;
  int _bursts = 0;

  /// Whether the like is on.
  bool get liked => _liked;

  /// The number of likes, including this person's.
  int get count => _count;

  /// Turns the like on or off at once.
  void toggle() {
    _liked = !_liked;
    _count += _liked ? 1 : -1;
    if (_liked) _bursts++;
    notifyListeners();
  }

  /// Undoes the last [toggle] after the server refused it.
  void revert() {
    _liked = !_liked;
    _count += _liked ? 1 : -1;
    _reverts++;
    notifyListeners();
  }
}

/// The endorse button: a heart that fills, pops and throws seven sparks the
/// moment it is pressed, with a count that rolls.
///
/// Update the UI first, call the server second ([LdsLikeController]). There
/// is no burst when turning off. A light haptic plays when it turns on.
/// Under reduced motion there are no sparks and no pop; the fill and the
/// count change at once.
class LdsLike extends StatefulWidget {
  /// Creates a like button.
  const LdsLike({
    super.key,
    required this.controller,
    this.onChanged,
    this.semanticLabel = 'Suka',
    this.showCount = true,
  });

  /// The like state.
  final LdsLikeController controller;

  /// Called after a press with the new state; call the server here.
  final ValueChanged<bool>? onChanged;

  /// Names the action and its object, for example "Suka jawaban ini".
  final String semanticLabel;

  /// Show the count next to the heart.
  final bool showCount;

  @override
  State<LdsLike> createState() => _LdsLikeState();
}

class _LdsLikeState extends State<LdsLike> with TickerProviderStateMixin {
  late final AnimationController _burst = AnimationController(
    vsync: this,
    duration: const Duration(milliseconds: 520),
  );
  late final AnimationController _shake = AnimationController(
    vsync: this,
    duration: const Duration(milliseconds: 400),
  );
  late int _bursts = widget.controller._bursts;
  late int _reverts = widget.controller._reverts;
  late int _shownCount = widget.controller.count;
  bool _countUp = true;

  static final Animatable<double> _pop = TweenSequence<double>([
    TweenSequenceItem(tween: Tween(begin: 0.6, end: 1.18), weight: 55),
    TweenSequenceItem(tween: Tween(begin: 1.18, end: 1), weight: 45),
  ]);

  static final Animatable<double> _shakeX = TweenSequence<double>([
    TweenSequenceItem(tween: Tween(begin: 0, end: -6), weight: 1),
    TweenSequenceItem(tween: Tween(begin: -6, end: 6), weight: 2),
    TweenSequenceItem(tween: Tween(begin: 6, end: -4), weight: 2),
    TweenSequenceItem(tween: Tween(begin: -4, end: 3), weight: 2),
    TweenSequenceItem(tween: Tween(begin: 3, end: 0), weight: 1),
  ]);

  @override
  void initState() {
    super.initState();
    widget.controller.addListener(_onChange);
  }

  @override
  void didUpdateWidget(LdsLike oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.controller != widget.controller) {
      oldWidget.controller.removeListener(_onChange);
      widget.controller.addListener(_onChange);
      _bursts = widget.controller._bursts;
      _reverts = widget.controller._reverts;
      _shownCount = widget.controller.count;
    }
  }

  void _onChange() {
    final c = widget.controller;
    final reduce = context.ldsReduceMotion;
    if (c._bursts != _bursts) {
      _bursts = c._bursts;
      if (reduce) {
        _burst.value = 1;
      } else {
        _burst.forward(from: 0);
      }
    } else if (!c.liked) {
      // Turning off mid-burst stops it at once.
      _burst.value = 1;
    }
    if (c._reverts != _reverts) {
      _reverts = c._reverts;
      _burst.value = 1;
      LdsHaptics.error();
      if (!reduce) _shake.forward(from: 0);
    }
    setState(() {
      _countUp = c.count >= _shownCount;
      _shownCount = c.count;
    });
  }

  void _press() {
    final c = widget.controller..toggle();
    if (c.liked) LdsHaptics.light();
    widget.onChanged?.call(c.liked);
  }

  @override
  void dispose() {
    widget.controller.removeListener(_onChange);
    _burst.dispose();
    _shake.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final liked = widget.controller.liked;
    final count = widget.controller.count;
    final reduce = context.ldsReduceMotion;
    const radius = BorderRadius.all(Radius.circular(18));
    final heart = AnimatedBuilder(
      animation: _burst,
      builder: (context, _) {
        final t = _burst.value;
        final popT = math.min(1.0, t * 520 / 420);
        final scale = liked && !reduce && _burst.isAnimating
            ? _pop.transform(popT)
            : 1.0;
        return SizedBox.square(
          dimension: 20,
          child: CustomPaint(
            painter: liked && !reduce && _burst.isAnimating
                ? _SparkPainter(LdsMotion.enterCurve.transform(t), c.danger)
                : null,
            child: Transform.scale(
              scale: scale,
              child: LdsIcon('favorite',
                  fill: liked,
                  color: liked ? c.danger : c.textDefault),
            ),
          ),
        );
      },
    );

    final countText = ClipRect(
      child: AnimatedSwitcher(
        duration: reduce ? Duration.zero : LdsMotion.smoothSpringDuration,
        switchInCurve: LdsSpringCurve.smooth,
        switchOutCurve: LdsSpringCurve.smooth,
        layoutBuilder: (current, previous) => Stack(
          alignment: Alignment.center,
          children: [...previous, if (current != null) current],
        ),
        transitionBuilder: (child, animation) {
          final incoming = child.key == ValueKey<int>(count);
          final dir = _countUp ? 1.0 : -1.0;
          final offset = Tween<Offset>(
            begin: Offset(0, incoming ? dir : -dir),
            end: Offset.zero,
          ).animate(animation);
          return SlideTransition(position: offset, child: child);
        },
        child: Text(
          '$count',
          key: ValueKey<int>(count),
          style: TextStyle(
            fontFamily: LdsType.family,
            fontSize: 14,
            height: 1,
            fontWeight: FontWeight.w600,
            fontFeatures: const [FontFeature.tabularFigures()],
            color: liked ? c.dangerText : c.textDefault,
          ),
        ),
      ),
    );

    final button = LdsPressable(
      onPressed: _press,
      pressedScale: 0.94,
      borderRadius: radius,
      selected: liked,
      semanticLabel:
          widget.showCount ? '${widget.semanticLabel}, $count' : widget.semanticLabel,
      excludeChildSemantics: true,
      builder: (context, state) => AnimatedContainer(
        duration: context.ldsDuration(LdsMotion.fast),
        height: 36,
        padding: EdgeInsets.only(left: 10, right: widget.showCount ? 12 : 8),
        decoration: BoxDecoration(
          borderRadius: radius,
          color: liked
              ? c.dangerTint
              : (state.hovered || state.pressed ? c.bgTintStrong : c.bgFill),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            heart,
            if (widget.showCount) ...[const SizedBox(width: 6), countText],
          ],
        ),
      ),
    );

    return AnimatedBuilder(
      animation: _shake,
      child: button,
      builder: (context, child) => Transform.translate(
        offset: Offset(_shake.isAnimating ? _shakeX.evaluate(_shake) : 0, 0),
        child: child,
      ),
    );
  }
}

/// Seven 4 px sparks at 51 degree steps, flying from 6 to 17 px out.
class _SparkPainter extends CustomPainter {
  _SparkPainter(this.t, this.color);

  final double t;
  final Color color;

  @override
  void paint(Canvas canvas, Size size) {
    final center = size.center(Offset.zero);
    final distance = 6 + 11 * t;
    final radius = 2 * (1 - 0.7 * t);
    final paint = Paint()..color = color.withValues(alpha: (1 - t).clamp(0, 1));
    for (var i = 0; i < 7; i++) {
      final a = i * 2 * math.pi / 7 - math.pi / 2;
      canvas.drawCircle(
          center + Offset(math.cos(a), math.sin(a)) * distance, radius, paint);
    }
  }

  @override
  bool shouldRepaint(_SparkPainter oldDelegate) =>
      oldDelegate.t != t || oldDelegate.color != color;
}
