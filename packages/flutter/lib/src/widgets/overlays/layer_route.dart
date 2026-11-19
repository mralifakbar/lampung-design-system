import 'package:material_ui/material_ui.dart';

import '../../motion.dart';
import '../../tokens.g.dart';

/// How an [LdsLayerRoute] enters and leaves.
enum LdsLayerMotion {
  /// Centered layer: fades in and rises 8 px from scale 0.96 (dialog, modal).
  pop,

  /// Top-anchored layer: fades in from scale 0.97, growing from the top
  /// center (command palette).
  drop,

  /// Slides in from the end edge and leaves the same way (drawer).
  slideEnd,

  /// Opacity only (lightbox, which moves its picture with a [Hero]).
  fade,
}

/// A modal layer over the page: dims the page with the scrim, traps focus,
/// closes on Escape and on a scrim tap (when [dismissible]) and returns focus
/// to the element that opened it.
///
/// Enter runs on the smooth spring; exit is shorter, on the exit curve. With
/// [reduceMotion] both become a 120 ms fade.
class LdsLayerRoute<T> extends PopupRoute<T> {
  /// Creates a layer route.
  LdsLayerRoute({
    required this.builder,
    required this.scrimColor,
    this.motion = LdsLayerMotion.pop,
    this.dismissible = true,
    this.dismissLabel = 'Close',
    this.reduceMotion = false,
    super.settings,
  });

  /// Builds the layer content.
  final WidgetBuilder builder;

  /// Color of the scrim behind the layer.
  final Color scrimColor;

  /// Enter and exit style.
  final LdsLayerMotion motion;

  /// Whether Escape and a scrim tap close the layer.
  final bool dismissible;

  /// Label of the scrim for screen readers.
  final String dismissLabel;

  /// Replace travel with a short fade.
  final bool reduceMotion;

  @override
  Color? get barrierColor => scrimColor;

  @override
  bool get barrierDismissible => dismissible;

  @override
  String? get barrierLabel => dismissLabel;

  @override
  Duration get transitionDuration =>
      reduceMotion ? LdsMotion.instant : LdsMotion.smooth;

  @override
  Duration get reverseTransitionDuration => reduceMotion
      ? LdsMotion.instant
      : (motion == LdsLayerMotion.slideEnd
            ? LdsMotion.standard
            : LdsMotion.exit);

  @override
  Widget buildPage(
    BuildContext context,
    Animation<double> animation,
    Animation<double> secondaryAnimation,
  ) {
    return Semantics(
      scopesRoute: true,
      explicitChildNodes: true,
      child: Builder(builder: builder),
    );
  }

  @override
  Widget buildTransitions(
    BuildContext context,
    Animation<double> animation,
    Animation<double> secondaryAnimation,
    Widget child,
  ) {
    final opacity = CurvedAnimation(
      parent: animation,
      curve: const Interval(0, 0.3, curve: LdsMotion.enterCurve),
      reverseCurve: LdsMotion.exitCurve,
    );
    if (reduceMotion || motion == LdsLayerMotion.fade) {
      return FadeTransition(opacity: opacity, child: child);
    }
    final move = CurvedAnimation(
      parent: animation,
      curve: LdsSpringCurve.smooth,
      reverseCurve: LdsMotion.exitCurve.flipped,
    );
    switch (motion) {
      case LdsLayerMotion.pop:
        return FadeTransition(
          opacity: opacity,
          child: AnimatedBuilder(
            animation: move,
            builder: (context, child) => Transform.translate(
              offset: Offset(0, 8 * (1 - move.value)),
              child: Transform.scale(
                scale: 0.96 + 0.04 * move.value,
                child: child,
              ),
            ),
            child: child,
          ),
        );
      case LdsLayerMotion.drop:
        return FadeTransition(
          opacity: opacity,
          child: ScaleTransition(
            alignment: Alignment.topCenter,
            scale: Tween<double>(begin: 0.97, end: 1).animate(move),
            child: child,
          ),
        );
      case LdsLayerMotion.slideEnd:
        final rtl = Directionality.of(context) == TextDirection.rtl;
        return SlideTransition(
          position: Tween<Offset>(
            begin: Offset(rtl ? -1.3 : 1.3, 0),
            end: Offset.zero,
          ).animate(move),
          child: child,
        );
      case LdsLayerMotion.fade:
        return FadeTransition(opacity: opacity, child: child);
    }
  }
}
