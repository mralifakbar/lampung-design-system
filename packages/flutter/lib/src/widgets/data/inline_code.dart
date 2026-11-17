import 'package:flutter/material.dart';

import '../../theme.dart';
import '../../tokens.g.dart';

/// A short piece of code inside running text: a field name, a value, a
/// command.
///
/// Inside a [Text.rich] use [LdsInlineCode.span] so it flows with the line.
class LdsInlineCode extends StatelessWidget {
  /// Creates inline code.
  const LdsInlineCode(this.code, {super.key, this.fontSize = 14});

  /// The code.
  final String code;

  /// Size of the surrounding text; the code is set at 0.88 of it.
  final double fontSize;

  /// The same chip as a [WidgetSpan] for [Text.rich].
  static InlineSpan span(String code, {double fontSize = 14}) => WidgetSpan(
        alignment: PlaceholderAlignment.baseline,
        baseline: TextBaseline.alphabetic,
        child: LdsInlineCode(code, fontSize: fontSize),
      );

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 1),
      decoration: BoxDecoration(
        color: c.bgRecessed,
        borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.xs)),
      ),
      child: Text(
        code,
        style: TextStyle(
          fontFamily: LdsType.mono,
          fontSize: fontSize * 0.88,
          height: 1.4,
          color: c.textStrong,
        ),
      ),
    );
  }
}
