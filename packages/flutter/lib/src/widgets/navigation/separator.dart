import 'package:flutter/material.dart';

import '../../theme.dart';
import '../../tokens.g.dart';

/// Where the words of a labeled [LdsSeparator] sit.
enum LdsSeparatorLabelAlign {
  /// Centered between two hairlines ("atau").
  center,

  /// At the start, one hairline after them: date dividers that line up
  /// with rows.
  start,
}

/// A 1 px hairline between two blocks that would otherwise run together,
/// plain or with a few words in it (a date divider, "atau").
///
/// Most of the time spacing or a component's own dividers are enough.
class LdsSeparator extends StatelessWidget {
  /// A horizontal hairline.
  const LdsSeparator({super.key})
      : axis = Axis.horizontal,
        label = null,
        labelAlign = LdsSeparatorLabelAlign.center,
        header = false;

  /// A vertical hairline between items in a row, at least 20 px tall.
  const LdsSeparator.vertical({super.key})
      : axis = Axis.vertical,
        label = null,
        labelAlign = LdsSeparatorLabelAlign.center,
        header = false;

  /// Words between hairlines, in the caption style. With [header] the words
  /// are announced as a heading.
  const LdsSeparator.label(
    String this.label, {
    super.key,
    this.labelAlign = LdsSeparatorLabelAlign.center,
    this.header = false,
  }) : axis = Axis.horizontal;

  /// Direction of the line.
  final Axis axis;

  /// Optional words in the line.
  final String? label;

  /// Where the words sit.
  final LdsSeparatorLabelAlign labelAlign;

  /// Announce the words as a heading.
  final bool header;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    if (axis == Axis.vertical) {
      return ExcludeSemantics(
        child: Container(
          width: 1,
          constraints: const BoxConstraints(minHeight: 20),
          color: c.hairline,
        ),
      );
    }
    final line = ExcludeSemantics(
      child: Container(height: 1, color: c.hairline),
    );
    if (label == null) return line;
    final text = Semantics(
      header: header,
      child: Text(
        label!,
        style: LdsType.caption.copyWith(color: c.textMuted),
      ),
    );
    return ConstrainedBox(
      constraints: const BoxConstraints(minHeight: 28),
      child: Row(
        children: [
          if (labelAlign == LdsSeparatorLabelAlign.center) ...[
            Expanded(child: line),
            const SizedBox(width: LdsSpace.s12),
          ],
          text,
          const SizedBox(width: LdsSpace.s12),
          Expanded(child: line),
        ],
      ),
    );
  }
}
