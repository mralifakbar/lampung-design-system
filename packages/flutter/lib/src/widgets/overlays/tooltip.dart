import 'package:material_ui/material_ui.dart';

import '../../theme.dart';
import '../../tokens.g.dart';

/// A short dark label above a control on hover, focus or long press, after a
/// 500 ms wait. Names icon buttons and shortcuts; with [wide] it explains a
/// term in a sentence or two.
///
/// The tip is visual: an icon button still needs its own semantic label.
class LdsTooltip extends StatelessWidget {
  /// Creates a tooltip.
  const LdsTooltip({
    super.key,
    required this.message,
    required this.child,
    this.shortcut,
    this.wide = false,
    this.excludeFromSemantics = false,
  });

  /// The tip text.
  final String message;

  /// The control the tip describes.
  final Widget child;

  /// Optional shortcut shown in a key outline after the text ("Ctrl+K").
  final String? shortcut;

  /// A wider tip (up to 260 px) for a sentence of explanation.
  final bool wide;

  /// Keep the tip out of the semantics tree, when the child already says it.
  final bool excludeFromSemantics;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final style = LdsType.footnote.copyWith(
      color: c.textInverse,
      fontWeight: FontWeight.w500,
    );
    return Tooltip(
      richMessage: TextSpan(
        text: message,
        style: style,
        children: [
          if (shortcut != null)
            WidgetSpan(
              alignment: PlaceholderAlignment.middle,
              child: Container(
                margin: const EdgeInsets.only(left: 6),
                padding: const EdgeInsets.symmetric(horizontal: 5),
                constraints: const BoxConstraints(minHeight: 18, minWidth: 18),
                alignment: Alignment.center,
                decoration: BoxDecoration(
                  borderRadius: const BorderRadius.all(Radius.circular(5)),
                  border: Border.all(color: c.onInverseLine),
                ),
                child: Text(
                  shortcut!,
                  style: style.copyWith(fontSize: 11, height: 1),
                ),
              ),
            ),
        ],
      ),
      preferBelow: false,
      verticalOffset: 22 + 8,
      waitDuration: const Duration(milliseconds: 500),
      excludeFromSemantics: excludeFromSemantics,
      constraints: BoxConstraints(maxWidth: wide ? 260 : 220),
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
      decoration: BoxDecoration(
        color: c.bgInverse,
        borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.sm)),
      ),
      textAlign: wide ? TextAlign.start : TextAlign.center,
      child: child,
    );
  }
}
