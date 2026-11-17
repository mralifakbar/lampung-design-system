import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../button.dart';

/// A panel that rises from the bottom for a task that keeps its context:
/// the page behind stays visible under the scrim. The phone answer to most
/// dialogs.
///
/// Show it with [showLdsSheet]; drag the grabber or the title row down to
/// dismiss it with momentum.
class LdsSheet extends StatelessWidget {
  /// Creates a sheet panel.
  const LdsSheet({
    super.key,
    required this.child,
    this.title,
    this.onClose,
    this.closeLabel = 'Close',
    this.padding = const EdgeInsets.fromLTRB(20, 0, 20, 24),
  });

  /// Content.
  final Widget child;

  /// 17 px title in the head row.
  final String? title;

  /// Shows a close button in the head row.
  final VoidCallback? onClose;

  /// Label of the close button.
  final String closeLabel;

  /// Padding around [child].
  final EdgeInsetsGeometry padding;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final bottomInset = MediaQuery.viewInsetsOf(context).bottom;
    return Semantics(
      namesRoute: title != null,
      label: title,
      explicitChildNodes: true,
      child: Material(
        type: MaterialType.transparency,
        child: Container(
          decoration: BoxDecoration(
            color: c.bgElevated,
            borderRadius:
                const BorderRadius.vertical(top: Radius.circular(LdsRadius.xl)),
            boxShadow: context.ldsShadows.lg,
          ),
          padding: EdgeInsets.only(bottom: bottomInset),
          child: SafeArea(
            top: false,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Center(
                  child: Container(
                    width: 36,
                    height: 5,
                    margin: const EdgeInsets.only(top: 8, bottom: 4),
                    decoration: BoxDecoration(
                      color: c.textFaint,
                      borderRadius: const BorderRadius.all(
                          Radius.circular(LdsRadius.pill)),
                    ),
                  ),
                ),
                if (title != null || onClose != null)
                  Padding(
                    padding: const EdgeInsetsDirectional.fromSTEB(20, 0, 8, 4),
                    child: Row(
                      children: [
                        Expanded(
                          child: Semantics(
                            header: true,
                            child: Text(
                              title ?? '',
                              style: LdsType.headline
                                  .copyWith(color: c.textStrong),
                            ),
                          ),
                        ),
                        if (onClose != null)
                          LdsIconButton(
                            icon: 'close',
                            semanticLabel: closeLabel,
                            onPressed: onClose,
                            variant: LdsIconButtonVariant.filled,
                            color: c.textSubtle,
                          ),
                      ],
                    ),
                  ),
                Flexible(
                  child: SingleChildScrollView(
                    padding: padding,
                    child: child,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

/// Shows [builder] (usually an [LdsSheet]) rising from the bottom.
///
/// Drag down to dismiss: past half its height, or with a downward flick, it
/// leaves; otherwise it springs back. Escape and a scrim tap close it when
/// [dismissible]. Completes with the value passed to `Navigator.pop`.
Future<T?> showLdsSheet<T>({
  required BuildContext context,
  required WidgetBuilder builder,
  bool dismissible = true,
  bool enableDrag = true,
  String dismissLabel = 'Close',
  bool useRootNavigator = true,
}) {
  return Navigator.of(context, rootNavigator: useRootNavigator).push<T>(
    _LdsSheetRoute<T>(
      builder: builder,
      scrim: context.lds.bgScrim,
      dismissible: dismissible,
      enableDrag: enableDrag,
      dismissLabel: dismissLabel,
      reduceMotion: context.ldsReduceMotion,
    ),
  );
}

class _LdsSheetRoute<T> extends PopupRoute<T> {
  _LdsSheetRoute({
    required this.builder,
    required this.scrim,
    required this.dismissible,
    required this.enableDrag,
    required this.dismissLabel,
    required this.reduceMotion,
  });

  final WidgetBuilder builder;
  final Color scrim;
  final bool dismissible;
  final bool enableDrag;
  final String dismissLabel;
  final bool reduceMotion;

  /// While true the sheet follows the controller value 1:1.
  final ValueNotifier<bool> _direct = ValueNotifier<bool>(false);

  @override
  Color? get barrierColor => scrim;

  @override
  bool get barrierDismissible => dismissible;

  @override
  String? get barrierLabel => dismissLabel;

  @override
  Duration get transitionDuration =>
      reduceMotion ? LdsMotion.instant : LdsMotion.smooth;

  @override
  Duration get reverseTransitionDuration =>
      reduceMotion ? LdsMotion.instant : const Duration(milliseconds: 260);

  void _dragStart() => _direct.value = true;

  void _dragUpdate(double delta, double height) {
    final c = controller!;
    c.value = (c.value - delta / math.max(height, 1)).clamp(0.0, 1.0);
  }

  void _dragEnd(double velocity, double height, BuildContext context) {
    final c = controller!;
    // Project where a throw would land.
    final projected = c.value - (velocity / 1000 * 0.99 / (1 - 0.99)) / height;
    if (projected < 0.5) {
      Navigator.of(context).pop();
    } else {
      final settle = reduceMotion ? LdsMotion.instant : LdsMotion.smooth;
      c
          .animateTo(1, duration: settle, curve: LdsSpringCurve.smooth)
          .whenCompleteOrCancel(() => _direct.value = false);
    }
  }

  @override
  void dispose() {
    _direct.dispose();
    super.dispose();
  }

  @override
  Widget buildPage(BuildContext context, Animation<double> animation,
      Animation<double> secondaryAnimation) {
    return Semantics(
      scopesRoute: true,
      explicitChildNodes: true,
      child: Align(
        alignment: Alignment.bottomCenter,
        child: ConstrainedBox(
          constraints: BoxConstraints(
            maxWidth: 640,
            maxHeight: MediaQuery.sizeOf(context).height * 0.92,
          ),
          child: _SheetDrag(route: this, child: Builder(builder: builder)),
        ),
      ),
    );
  }

  @override
  Widget buildTransitions(BuildContext context, Animation<double> animation,
      Animation<double> secondaryAnimation, Widget child) {
    if (reduceMotion) {
      return FadeTransition(opacity: animation, child: child);
    }
    final curved = CurvedAnimation(
      parent: animation,
      curve: LdsSpringCurve.smooth,
      reverseCurve: LdsMotion.exitCurve.flipped,
    );
    return AnimatedBuilder(
      animation: Listenable.merge([animation, _direct]),
      builder: (context, child) {
        final v = _direct.value ? animation.value : curved.value;
        return FractionalTranslation(
          translation: Offset(0, 1.05 * (1 - v)),
          child: child,
        );
      },
      child: child,
    );
  }
}

class _SheetDrag extends StatefulWidget {
  const _SheetDrag({required this.route, required this.child});

  final _LdsSheetRoute<dynamic> route;
  final Widget child;

  @override
  State<_SheetDrag> createState() => _SheetDragState();
}

class _SheetDragState extends State<_SheetDrag> {
  double get _height => context.size?.height ?? 1;

  @override
  Widget build(BuildContext context) {
    if (!widget.route.enableDrag) return widget.child;
    return GestureDetector(
      behavior: HitTestBehavior.translucent,
      excludeFromSemantics: true,
      onVerticalDragStart: (_) => widget.route._dragStart(),
      onVerticalDragUpdate: (d) =>
          widget.route._dragUpdate(d.primaryDelta ?? 0, _height),
      onVerticalDragEnd: (d) =>
          widget.route._dragEnd(d.primaryVelocity ?? 0, _height, context),
      child: widget.child,
    );
  }
}
