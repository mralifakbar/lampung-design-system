import 'dart:math' as math;

import 'package:material_ui/material_ui.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../button.dart';
import 'layer_route.dart';

/// A panel that slides in from the end edge for filters, details or a
/// secondary task, while the list it belongs to stays visible. It leaves to
/// the side it came from.
///
/// Show it with [showLdsDrawer].
class LdsDrawer extends StatelessWidget {
  /// Creates a drawer panel.
  const LdsDrawer({
    super.key,
    required this.title,
    required this.child,
    this.actions = const <Widget>[],
    this.onClose,
    this.closeLabel = 'Close',
    this.width = 320,
  });

  /// Title in the head row.
  final String title;

  /// Content: fields, checkboxes, a key-value list.
  final Widget child;

  /// A row pushed to the bottom: a quiet reset and the primary.
  final List<Widget> actions;

  /// Shows a close button in the head row.
  final VoidCallback? onClose;

  /// Label of the close button.
  final String closeLabel;

  /// Panel width; it never exceeds the window minus 20 px.
  final double width;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final screen = MediaQuery.sizeOf(context).width;
    final maxWidth = screen > 0 ? math.max(0.0, screen - 20) : width;
    return Semantics(
      namesRoute: true,
      label: title,
      explicitChildNodes: true,
      child: Material(
        type: MaterialType.transparency,
        child: Container(
          width: math.min(width, maxWidth),
          padding: const EdgeInsets.all(LdsSpace.s20),
          decoration: BoxDecoration(
            color: c.bgElevated,
            borderRadius: const BorderRadius.all(Radius.circular(18)),
            border: Border.all(color: c.lineStrong, width: 0.5),
            boxShadow: context.ldsShadows.lg,
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Row(
                children: [
                  Expanded(
                    child: Semantics(
                      header: true,
                      child: Text(
                        title,
                        style: LdsType.headline.copyWith(color: c.textStrong),
                      ),
                    ),
                  ),
                  if (onClose != null)
                    Transform.translate(
                      offset: const Offset(8, 0),
                      child: LdsIconButton(
                        icon: 'close',
                        semanticLabel: closeLabel,
                        onPressed: onClose,
                        color: c.textSubtle,
                      ),
                    ),
                ],
              ),
              const SizedBox(height: LdsSpace.s16),
              Expanded(child: SingleChildScrollView(child: child)),
              if (actions.isNotEmpty) ...[
                const SizedBox(height: LdsSpace.s16),
                Row(
                  children: [
                    for (var i = 0; i < actions.length; i++) ...[
                      if (i > 0) const SizedBox(width: 10),
                      Expanded(child: actions[i]),
                    ],
                  ],
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}

/// Shows [builder] (usually an [LdsDrawer]) sliding in from the end edge,
/// 10 px from the window edges. Escape and a scrim tap close it when
/// [dismissible]. Completes with the value passed to `Navigator.pop`.
Future<T?> showLdsDrawer<T>({
  required BuildContext context,
  required WidgetBuilder builder,
  bool dismissible = true,
  String dismissLabel = 'Close',
  bool useRootNavigator = true,
}) {
  return Navigator.of(context, rootNavigator: useRootNavigator).push<T>(
    LdsLayerRoute<T>(
      scrimColor: context.lds.bgScrim,
      motion: LdsLayerMotion.slideEnd,
      dismissible: dismissible,
      dismissLabel: dismissLabel,
      reduceMotion: context.ldsReduceMotion,
      builder: (context) => SafeArea(
        child: Align(
          alignment: AlignmentDirectional.centerEnd,
          child: Padding(
            padding: const EdgeInsets.all(10),
            child: Builder(builder: builder),
          ),
        ),
      ),
    ),
  );
}
