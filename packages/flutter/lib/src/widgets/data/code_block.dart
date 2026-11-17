import 'package:flutter/material.dart';

import '../../theme.dart';
import '../../tokens.g.dart';
import 'copy_button.dart';

/// The role of one run of text in an [LdsCodeBlock].
enum LdsCodeKind {
  /// Ordinary code.
  plain,

  /// Keys and keywords, in the accent text color.
  keyword,

  /// Strings, in the success text color.
  string,

  /// Comments, muted.
  comment,
}

/// One colored run of code.
@immutable
class LdsCodeSegment {
  /// Creates a run of code.
  const LdsCodeSegment(this.text, [this.kind = LdsCodeKind.plain]);

  /// The text, line breaks included.
  final String text;

  /// How it is colored.
  final LdsCodeKind kind;
}

/// A block of code or output on the quiet fill, with an optional bar that
/// names it and copies it.
///
/// Lines never wrap; the block scrolls sideways.
class LdsCodeBlock extends StatelessWidget {
  /// Creates a code block from plain [code].
  const LdsCodeBlock(
    String this.code, {
    super.key,
    this.title,
    this.copyable = true,
    this.copyLabel = 'Salin',
    this.copiedLabel = 'Tersalin',
  }) : segments = null;

  /// Creates a code block from colored [segments].
  const LdsCodeBlock.segments(
    List<LdsCodeSegment> this.segments, {
    super.key,
    this.title,
    this.copyable = true,
    this.copyLabel = 'Salin',
    this.copiedLabel = 'Tersalin',
  }) : code = null;

  /// Plain code.
  final String? code;

  /// Colored runs of code.
  final List<LdsCodeSegment>? segments;

  /// File name or language in the bar. With [copyable] false and no title
  /// the bar is left out.
  final String? title;

  /// Shows a copy button in the bar.
  final bool copyable;

  /// Copy button label at rest.
  final String copyLabel;

  /// Copy button label after copying.
  final String copiedLabel;

  /// The full text of the block.
  String get text => code ?? segments!.map((s) => s.text).join();

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final base = TextStyle(
      fontFamily: LdsType.mono,
      fontSize: 12.5,
      height: 20 / 12.5,
      color: c.textDefault,
    );
    Color colorOf(LdsCodeKind k) => switch (k) {
          LdsCodeKind.plain => c.textDefault,
          LdsCodeKind.keyword => c.accentText,
          LdsCodeKind.string => c.successText,
          LdsCodeKind.comment => c.textMuted,
        };
    final body = segments == null
        ? Text(code!, style: base, softWrap: false)
        : Text.rich(
            TextSpan(children: [
              for (final s in segments!)
                TextSpan(
                    text: s.text, style: TextStyle(color: colorOf(s.kind))),
            ]),
            style: base,
            softWrap: false,
          );
    final showBar = title != null || copyable;
    return ClipRRect(
      borderRadius: const BorderRadius.all(Radius.circular(14)),
      child: ColoredBox(
        color: c.bgFill,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          mainAxisSize: MainAxisSize.min,
          children: [
            if (showBar)
              Container(
                height: 44,
                padding: const EdgeInsets.only(left: 14),
                decoration: BoxDecoration(
                  border: Border(bottom: BorderSide(color: c.hairline)),
                ),
                child: Row(
                  children: [
                    Expanded(
                      child: Text(
                        title ?? '',
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: TextStyle(
                          fontFamily: LdsType.family,
                          fontSize: 12.5,
                          height: 1,
                          fontWeight: FontWeight.w500,
                          color: c.textSubtle,
                        ),
                      ),
                    ),
                    if (copyable)
                      LdsCopyButton(
                        text: text,
                        label: copyLabel,
                        copiedLabel: copiedLabel,
                      ),
                  ],
                ),
              ),
            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
              child: body,
            ),
          ],
        ),
      ),
    );
  }
}
