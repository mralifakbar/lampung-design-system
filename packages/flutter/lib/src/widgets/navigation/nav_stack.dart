import 'package:flutter/cupertino.dart' show CupertinoRouteTransitionMixin;
import 'package:flutter/material.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../icon.dart';
import '../pressable.dart';

/// A page route that pushes a detail screen in from the right over the one
/// you came from. The screen underneath slides at 30 % and dims, so people
/// always know where back leads; dragging from the start edge pops it.
///
/// With reduced motion the screens cross-fade instead.
class LdsPageRoute<T> extends PageRoute<T>
    with CupertinoRouteTransitionMixin<T> {
  /// Creates a route.
  LdsPageRoute({
    required this.builder,
    this.title,
    super.settings,
    this.maintainState = true,
    super.fullscreenDialog,
  });

  /// Builds the screen.
  final WidgetBuilder builder;

  /// Title of the screen, shown by the next screen's back button.
  @override
  final String? title;

  @override
  final bool maintainState;

  @override
  Duration get transitionDuration => LdsMotion.smooth;

  @override
  Duration get reverseTransitionDuration => const Duration(milliseconds: 280);

  @override
  Widget buildContent(BuildContext context) => builder(context);

  @override
  Widget buildTransitions(
    BuildContext context,
    Animation<double> animation,
    Animation<double> secondaryAnimation,
    Widget child,
  ) {
    if (context.ldsReduceMotion) {
      return FadeTransition(opacity: animation, child: child);
    }
    final scrim = context.lds.bgScrim;
    final dimmed = AnimatedBuilder(
      animation: secondaryAnimation,
      child: child,
      builder: (context, child) => DecoratedBox(
        position: DecorationPosition.foreground,
        decoration: BoxDecoration(
          color:
              scrim.withValues(alpha: scrim.a * 0.5 * secondaryAnimation.value),
        ),
        child: child,
      ),
    );
    return super
        .buildTransitions(context, animation, secondaryAnimation, dimmed);
  }

  @override
  String get debugLabel => '${super.debugLabel}(${settings.name})';
}

/// A self-contained stack of screens: [root] first, then detail screens
/// pushed over it with [LdsNavStack.push] or [LdsPageRoute].
///
/// Use it for a drill-down inside part of the app (a tab, a side panel).
/// For the whole app, give [MaterialApp] routes made with [LdsPageRoute].
class LdsNavStack extends StatefulWidget {
  /// Creates a navigation stack.
  const LdsNavStack({
    super.key,
    required this.root,
    this.rootTitle,
    this.navigatorKey,
  });

  /// Builds the first screen.
  final WidgetBuilder root;

  /// Title of the first screen, shown by the back button of the next one.
  final String? rootTitle;

  /// Key of the inner navigator, to push and pop from outside.
  final GlobalKey<NavigatorState>? navigatorKey;

  /// Pushes [builder] as a new screen onto the nearest stack.
  static Future<T?> push<T>(
    BuildContext context,
    WidgetBuilder builder, {
    String? title,
  }) {
    return Navigator.of(context)
        .push<T>(LdsPageRoute<T>(builder: builder, title: title));
  }

  @override
  State<LdsNavStack> createState() => _LdsNavStackState();
}

class _LdsNavStackState extends State<LdsNavStack> {
  late final GlobalKey<NavigatorState> _key =
      widget.navigatorKey ?? GlobalKey<NavigatorState>();

  @override
  Widget build(BuildContext context) {
    return NavigatorPopHandler<Object?>(
      onPopWithResult: (_) => _key.currentState?.maybePop(),
      child: Navigator(
        key: _key,
        onGenerateInitialRoutes: (navigator, initialRoute) => <Route<void>>[
          LdsPageRoute<void>(builder: widget.root, title: widget.rootTitle),
        ],
      ),
    );
  }
}

/// The back button of a pushed screen: a chevron plus the previous screen's
/// title, in the accent text color.
///
/// Without [label] it reads the previous [LdsPageRoute.title], falling back
/// to "Kembali". Without [onPressed] it pops the nearest navigator.
class LdsBackButton extends StatelessWidget {
  /// Creates a back button.
  const LdsBackButton({super.key, this.label, this.onPressed});

  /// Visible text; usually the previous screen's title.
  final String? label;

  /// Called when pressed. Defaults to [Navigator.maybePop].
  final VoidCallback? onPressed;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final route = ModalRoute.of(context);
    final previous = route is CupertinoRouteTransitionMixin<dynamic>
        ? route.previousTitle.value
        : null;
    final text = label ?? previous ?? 'Kembali';
    return LdsPressable(
      onPressed: onPressed ?? () => Navigator.maybePop(context),
      borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.sm)),
      semanticLabel: 'Kembali ke $text',
      excludeChildSemantics: true,
      builder: (context, state) => AnimatedOpacity(
        opacity: state.pressed ? 0.6 : 1,
        duration: context.ldsDuration(LdsMotion.fast),
        child: Padding(
          padding: const EdgeInsetsDirectional.only(end: 8),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              LdsIcon('chevron_left', size: 24, color: c.accentText),
              ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 160),
                child: Text(
                  text,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: LdsType.body.copyWith(color: c.accentText),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
