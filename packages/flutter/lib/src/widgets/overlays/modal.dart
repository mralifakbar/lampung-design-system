import 'package:material_ui/material_ui.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../button.dart';
import 'layer_route.dart';
import 'sheet.dart';

/// A page-level dialog over the whole window, for a task with a header, a
/// scrolling body and a footer of actions.
///
/// Show it with [showLdsModal], which turns it into a bottom [LdsSheet]
/// below 600 px.
class LdsModal extends StatelessWidget {
  /// Creates a modal panel.
  const LdsModal({
    super.key,
    required this.title,
    required this.child,
    this.actions = const <Widget>[],
    this.onClose,
    this.closeLabel = 'Close',
    this.width = 520,
  });

  /// Title in the header.
  final String title;

  /// The body; it scrolls when tall.
  final Widget child;

  /// Footer buttons, aligned to the end.
  final List<Widget> actions;

  /// Shows a close button in the header.
  final VoidCallback? onClose;

  /// Label of the close button.
  final String closeLabel;

  /// Maximum width.
  final double width;

  static double _maxHeight(BuildContext context) {
    final h = MediaQuery.sizeOf(context).height;
    return h > 0 ? h * 0.86 : double.infinity;
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    return ConstrainedBox(
      constraints: BoxConstraints(
        maxWidth: width,
        maxHeight: _maxHeight(context),
      ),
      child: Semantics(
        namesRoute: true,
        label: title,
        explicitChildNodes: true,
        child: Material(
          type: MaterialType.transparency,
          child: Container(
            clipBehavior: Clip.antiAlias,
            decoration: BoxDecoration(
              color: c.bgElevated,
              borderRadius: const BorderRadius.all(
                Radius.circular(LdsRadius.xl),
              ),
              border: Border.all(color: c.lineStrong, width: 0.5),
              boxShadow: context.ldsShadows.lg,
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Padding(
                  padding: const EdgeInsetsDirectional.fromSTEB(24, 14, 10, 8),
                  child: Row(
                    children: [
                      Expanded(
                        child: Semantics(
                          header: true,
                          child: Text(
                            title,
                            style: LdsType.title3.copyWith(color: c.textStrong),
                          ),
                        ),
                      ),
                      if (onClose != null)
                        LdsIconButton(
                          icon: 'close',
                          semanticLabel: closeLabel,
                          onPressed: onClose,
                          color: c.textSubtle,
                        ),
                    ],
                  ),
                ),
                Flexible(
                  child: SingleChildScrollView(
                    padding: const EdgeInsets.fromLTRB(24, 0, 24, 20),
                    child: DefaultTextStyle(
                      style: LdsType.body.copyWith(color: c.textDefault),
                      child: child,
                    ),
                  ),
                ),
                if (actions.isNotEmpty)
                  Container(
                    padding: const EdgeInsets.fromLTRB(24, 14, 24, 20),
                    decoration: BoxDecoration(
                      border: Border(top: BorderSide(color: c.hairline)),
                    ),
                    child: Wrap(
                      alignment: WrapAlignment.end,
                      spacing: 10,
                      runSpacing: 10,
                      children: actions,
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

/// Shows a modal with [title], [body] and footer [actions]: a centered
/// [LdsModal] on wide windows, a bottom [LdsSheet] below 600 px.
///
/// [actions] gets the route context so buttons can call `Navigator.pop`.
/// Completes with the value passed to `Navigator.pop`.
Future<T?> showLdsModal<T>({
  required BuildContext context,
  required String title,
  required WidgetBuilder body,
  List<Widget> Function(BuildContext context)? actions,
  bool dismissible = true,
  String closeLabel = 'Close',
  bool useRootNavigator = true,
}) {
  final navigator = Navigator.of(context, rootNavigator: useRootNavigator);
  final narrow = MediaQuery.sizeOf(navigator.context).width < 600;
  if (narrow) {
    return showLdsSheet<T>(
      context: context,
      dismissible: dismissible,
      dismissLabel: closeLabel,
      useRootNavigator: useRootNavigator,
      builder: (context) {
        final buttons = actions?.call(context) ?? const <Widget>[];
        return LdsSheet(
          title: title,
          closeLabel: closeLabel,
          onClose: () => Navigator.of(context).maybePop(),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              DefaultTextStyle(
                style: LdsType.body.copyWith(color: context.lds.textDefault),
                child: body(context),
              ),
              for (final b in buttons) ...[const SizedBox(height: 10), b],
            ],
          ),
        );
      },
    );
  }
  return navigator.push<T>(
    LdsLayerRoute<T>(
      scrimColor: context.lds.bgScrim,
      dismissible: dismissible,
      dismissLabel: closeLabel,
      reduceMotion: context.ldsReduceMotion,
      builder: (context) => SafeArea(
        child: Center(
          child: Padding(
            padding: const EdgeInsets.all(LdsSpace.s24),
            child: LdsModal(
              title: title,
              closeLabel: closeLabel,
              onClose: () => Navigator.of(context).maybePop(),
              actions: actions?.call(context) ?? const <Widget>[],
              child: body(context),
            ),
          ),
        ),
      ),
    ),
  );
}
