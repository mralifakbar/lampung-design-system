import 'package:flutter/services.dart';
import 'package:material_ui/material_ui.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../button.dart';

/// A picture that grows out of its own thumbnail into a full view and
/// shrinks back into the same spot (a [Hero] flight).
///
/// Wrap the thumbnail and the large picture in an [LdsSharedElement] with
/// the same [tag], and open the large view with [LdsSharedElementRoute]
/// (or [LdsSharedElement.open]). Under reduced motion there is no flight:
/// the view fades in and out in 120 ms and the picture appears in place.
class LdsSharedElement extends StatelessWidget {
  /// Creates a shared element.
  const LdsSharedElement({super.key, required this.tag, required this.child});

  /// Identifies the same object in both places.
  final Object tag;

  /// The thumbnail or the large picture.
  final Widget child;

  /// Opens [child] large in an [LdsSharedElementRoute] that flies from the
  /// thumbnail tagged [tag]. Returns when the view closes.
  static Future<void> open(
    BuildContext context, {
    required Object tag,
    required Widget child,
    String? caption,
    String closeLabel = 'Tutup',
  }) {
    return Navigator.of(context).push(
      LdsSharedElementRoute<void>(
        caption: caption,
        closeLabel: closeLabel,
        builder: (context) => LdsSharedElement(tag: tag, child: child),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return HeroMode(
      enabled: !context.ldsReduceMotion,
      child: Hero(
        tag: tag,
        createRectTween: (begin, end) => RectTween(begin: begin, end: end),
        // Keep the shape of the destination while it flies.
        flightShuttleBuilder: (context, animation, direction, from, to) =>
            direction == HeroFlightDirection.push ? to.widget : from.widget,
        child: child,
      ),
    );
  }
}

/// A full-screen view for a picture opened from its thumbnail: the backdrop
/// fades in over 240 ms while the [LdsSharedElement] flies in 420 ms on the
/// enter curve; closing runs the same path back in 220 ms.
///
/// The view is a dialog labelled by [caption]. Focus goes to the close
/// button; Escape, the button or the backdrop closes it, and focus returns
/// to the thumbnail.
class LdsSharedElementRoute<T> extends PopupRoute<T> {
  /// Creates the route.
  LdsSharedElementRoute({
    required this.builder,
    this.caption,
    this.closeLabel = 'Tutup',
    super.settings,
  });

  /// Builds the large picture, an [LdsSharedElement] with the thumbnail's
  /// tag.
  final WidgetBuilder builder;

  /// Says what and where; shown under the picture and used as the label.
  final String? caption;

  /// Label of the close button.
  final String closeLabel;

  bool _reduce = false;

  @override
  Color? get barrierColor => null;

  @override
  bool get barrierDismissible => true;

  @override
  String? get barrierLabel => closeLabel;

  @override
  Duration get transitionDuration =>
      _reduce ? LdsMotion.instant : const Duration(milliseconds: 420);

  @override
  Duration get reverseTransitionDuration =>
      _reduce ? LdsMotion.instant : const Duration(milliseconds: 220);

  @override
  TickerFuture didPush() {
    final context = navigator?.context;
    _reduce = context != null && context.ldsReduceMotion;
    controller?.duration = transitionDuration;
    controller?.reverseDuration = reverseTransitionDuration;
    return super.didPush();
  }

  @override
  Widget buildPage(
    BuildContext context,
    Animation<double> animation,
    Animation<double> secondaryAnimation,
  ) {
    final c = context.lds;
    return Semantics(
      scopesRoute: true,
      namesRoute: true,
      explicitChildNodes: true,
      label: caption,
      child: CallbackShortcuts(
        bindings: {
          const SingleActivator(LogicalKeyboardKey.escape): () =>
              Navigator.of(context).maybePop(),
        },
        child: SafeArea(
          child: Padding(
            padding: const EdgeInsets.all(LdsSpace.s16),
            child: Column(
              children: [
                Align(
                  alignment: Alignment.topRight,
                  child: DecoratedBox(
                    decoration: BoxDecoration(
                      color: c.bgInverse,
                      shape: BoxShape.circle,
                    ),
                    child: LdsIconButton(
                      icon: 'close',
                      semanticLabel: closeLabel,
                      color: c.textInverse,
                      onPressed: () => Navigator.of(context).maybePop(),
                    ),
                  ),
                ),
                Expanded(
                  child: GestureDetector(
                    onTap: () => Navigator.of(context).maybePop(),
                    behavior: HitTestBehavior.opaque,
                    child: Center(child: Builder(builder: builder)),
                  ),
                ),
                if (caption != null)
                  Padding(
                    padding: const EdgeInsets.only(top: LdsSpace.s12),
                    child: FadeTransition(
                      opacity: animation,
                      child: DecoratedBox(
                        decoration: BoxDecoration(
                          color: c.bgInverse,
                          borderRadius: const BorderRadius.all(
                            Radius.circular(10),
                          ),
                        ),
                        child: Padding(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 12,
                            vertical: 6,
                          ),
                          child: Text(
                            caption!,
                            textAlign: TextAlign.center,
                            style: LdsType.footnote.copyWith(
                              color: c.textInverse,
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  @override
  Widget buildTransitions(
    BuildContext context,
    Animation<double> animation,
    Animation<double> secondaryAnimation,
    Widget child,
  ) {
    final c = context.lds;
    final backdrop = CurvedAnimation(
      parent: animation,
      curve: const Interval(0, 240 / 420, curve: LdsMotion.enterCurve),
      reverseCurve: LdsMotion.exitCurve.flipped,
    );
    return Stack(
      fit: StackFit.expand,
      children: [
        FadeTransition(
          opacity: backdrop,
          child: ColoredBox(color: c.bgScrim),
        ),
        _reduce ? FadeTransition(opacity: animation, child: child) : child,
      ],
    );
  }
}
