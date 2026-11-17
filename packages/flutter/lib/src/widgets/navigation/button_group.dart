import 'package:flutter/material.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../icon.dart';
import '../pressable.dart';

/// One button of an [LdsButtonGroup].
@immutable
class LdsGroupButton {
  /// Creates a group button.
  const LdsGroupButton({
    required this.onPressed,
    this.label,
    this.icon,
    this.semanticLabel,
  }) : assert(label != null || icon != null, 'Give a label or an icon');

  /// Visible text.
  final String? label;

  /// Optional leading icon (ligature name).
  final String? icon;

  /// Called when pressed. Null dims the button, for example redo with
  /// nothing to redo.
  final VoidCallback? onPressed;

  /// Read by screen readers; required in practice for icon-only buttons.
  final String? semanticLabel;
}

/// Two to four attached buttons in one outlined box, for separate actions
/// on the same object: undo, redo, history. None of them stays selected.
///
/// The buttons do not sink on press, so the joined edges stay straight;
/// the press shows as a stronger fill.
class LdsButtonGroup extends StatelessWidget {
  /// Creates a button group.
  const LdsButtonGroup({
    super.key,
    required this.buttons,
    this.semanticLabel,
  }) : assert(buttons.length >= 2 && buttons.length <= 4, 'Use 2 to 4 buttons');

  /// The buttons, in order.
  final List<LdsGroupButton> buttons;

  /// Names the group for screen readers.
  final String? semanticLabel;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    const radius = BorderRadius.all(Radius.circular(10));
    final children = <Widget>[];
    for (var i = 0; i < buttons.length; i++) {
      if (i > 0) {
        children.add(
            Container(width: 1, height: LdsSize.control, color: c.lineStrong));
      }
      final b = buttons[i];
      children.add(LdsPressable(
        onPressed: b.onPressed,
        pressedScale: 1,
        borderRadius: radius,
        semanticLabel: b.semanticLabel ?? b.label,
        excludeChildSemantics: true,
        tooltip: b.label == null ? b.semanticLabel : null,
        builder: (context, state) {
          final fg = c.textStrong;
          return AnimatedOpacity(
            opacity: b.onPressed == null ? 0.38 : 1,
            duration: context.ldsDuration(LdsMotion.fast),
            child: AnimatedContainer(
              duration: state.pressed
                  ? Duration.zero
                  : context.ldsDuration(LdsMotion.fast),
              curve: LdsMotion.standardCurve,
              height: LdsSize.control,
              constraints: const BoxConstraints(minWidth: LdsSize.touchMin),
              padding:
                  EdgeInsets.symmetric(horizontal: b.label == null ? 10 : 14),
              color: state.pressed
                  ? c.bgTintStrong
                  : state.hovered
                      ? c.bgTint
                      : Colors.transparent,
              child: Row(
                mainAxisSize: MainAxisSize.min,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  if (b.icon != null) LdsIcon(b.icon!, size: 18, color: fg),
                  if (b.icon != null && b.label != null)
                    const SizedBox(width: 6),
                  if (b.label != null)
                    Text(
                      b.label!,
                      style: LdsType.subhead
                          .copyWith(color: fg, fontWeight: FontWeight.w600),
                    ),
                ],
              ),
            ),
          );
        },
      ));
    }
    return Semantics(
      container: true,
      label: semanticLabel,
      explicitChildNodes: true,
      child: Container(
        clipBehavior: Clip.antiAlias,
        foregroundDecoration: BoxDecoration(
          borderRadius: radius,
          border: Border.all(color: c.lineStrong),
        ),
        decoration: BoxDecoration(color: c.bgBase, borderRadius: radius),
        child: Row(mainAxisSize: MainAxisSize.min, children: children),
      ),
    );
  }
}
