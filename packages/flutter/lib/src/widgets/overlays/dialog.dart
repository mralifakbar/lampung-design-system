import 'package:material_ui/material_ui.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../badge.dart';
import '../button.dart';
import '../icon.dart';
import 'layer_route.dart';

/// A small centered layer that asks for one short input or decision, then
/// gets out of the way. Use rarely: most tasks belong on the page, in a
/// sheet or in a drawer.
///
/// Show it with [showLdsDialog]. Actions sit side by side and share the
/// width; put the safe one first.
class LdsDialog extends StatelessWidget {
  /// Creates a dialog panel.
  const LdsDialog({
    super.key,
    required this.title,
    this.body,
    this.content,
    this.icon,
    this.iconTone = LdsTone.accent,
    this.actions = const <Widget>[],
    this.onClose,
    this.closeLabel = 'Close',
    this.width = 340,
  });

  /// The question or the name of the task.
  final String title;

  /// One or two sentences under the title.
  final String? body;

  /// Optional content under the body, such as a field.
  final Widget? content;

  /// Optional icon in a tinted square above the title.
  final String? icon;

  /// Tone of the [icon] square.
  final LdsTone iconTone;

  /// Buttons, usually two [LdsButton]s; each takes an equal share.
  final List<Widget> actions;

  /// Shows a close button in the corner.
  final VoidCallback? onClose;

  /// Label of the close button.
  final String closeLabel;

  /// Maximum width.
  final double width;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final tone = LdsToneColors.of(c, iconTone);
    return ConstrainedBox(
      constraints: BoxConstraints(maxWidth: width),
      child: Semantics(
        namesRoute: true,
        label: title,
        explicitChildNodes: true,
        child: Material(
          type: MaterialType.transparency,
          child: Container(
            decoration: BoxDecoration(
              color: c.bgElevated,
              borderRadius: const BorderRadius.all(
                Radius.circular(LdsRadius.xl),
              ),
              border: Border.all(color: c.lineStrong, width: 0.5),
              boxShadow: context.ldsShadows.lg,
            ),
            child: Stack(
              children: [
                SingleChildScrollView(
                  padding: const EdgeInsets.all(LdsSpace.s24),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      if (icon != null)
                        Align(
                          alignment: AlignmentDirectional.centerStart,
                          child: Container(
                            width: 44,
                            height: 44,
                            margin: const EdgeInsets.only(bottom: 14),
                            alignment: Alignment.center,
                            decoration: BoxDecoration(
                              color: tone.tint,
                              borderRadius: const BorderRadius.all(
                                Radius.circular(LdsRadius.md),
                              ),
                            ),
                            child: LdsIcon(icon!, size: 24, color: tone.text),
                          ),
                        ),
                      Padding(
                        padding: EdgeInsetsDirectional.only(
                          end: onClose == null ? 0 : 28,
                        ),
                        child: Semantics(
                          header: true,
                          child: Text(
                            title,
                            style: LdsType.headline.copyWith(
                              fontSize: 18,
                              height: 24 / 18,
                              letterSpacing: -0.25,
                              color: c.textStrong,
                            ),
                          ),
                        ),
                      ),
                      if (body != null) ...[
                        const SizedBox(height: 6),
                        Text(
                          body!,
                          style: LdsType.subhead.copyWith(
                            height: 21 / 14,
                            color: c.textSubtle,
                          ),
                        ),
                      ],
                      if (content != null) ...[
                        const SizedBox(height: LdsSpace.s16),
                        content!,
                      ],
                      if (actions.isNotEmpty) ...[
                        const SizedBox(height: 22),
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
                if (onClose != null)
                  PositionedDirectional(
                    top: 6,
                    end: 6,
                    child: LdsIconButton(
                      icon: 'close',
                      semanticLabel: closeLabel,
                      onPressed: onClose,
                      color: c.textSubtle,
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

/// Shows [builder] (usually an [LdsDialog]) centered over a scrim.
///
/// Focus is trapped inside; Escape and a scrim tap close it when
/// [dismissible]; focus returns to the trigger. Completes with the value
/// passed to `Navigator.pop`.
Future<T?> showLdsDialog<T>({
  required BuildContext context,
  required WidgetBuilder builder,
  bool dismissible = true,
  String dismissLabel = 'Close',
  bool useRootNavigator = true,
}) {
  return Navigator.of(context, rootNavigator: useRootNavigator).push<T>(
    LdsLayerRoute<T>(
      scrimColor: context.lds.bgScrim,
      dismissible: dismissible,
      dismissLabel: dismissLabel,
      reduceMotion: context.ldsReduceMotion,
      builder: (context) => SafeArea(
        child: Center(
          child: Padding(
            padding: const EdgeInsets.all(LdsSpace.s16),
            child: Builder(builder: builder),
          ),
        ),
      ),
    ),
  );
}
