import 'package:flutter/material.dart';

import '../../theme.dart';
import '../../tokens.g.dart';

/// Long reading text: an article, a policy, a guide.
///
/// Sets body text at 16/27 in the default text color, holds the reading
/// measure, and puts 16 px between blocks. Use [LdsProseHeading] and
/// [LdsProseList] inside it, plus [LdsQuote], [LdsInlineCode] and
/// [LdsCitation].
class LdsProse extends StatelessWidget {
  /// Creates a prose block.
  const LdsProse(
      {super.key, required this.children, this.maxWidth = LdsSize.measure});

  /// Blocks: paragraphs ([Text]), headings, lists, quotes.
  final List<Widget> children;

  /// Reading measure.
  final double maxWidth;

  /// Body text style of prose in [context].
  static TextStyle bodyStyle(BuildContext context) => TextStyle(
        fontFamily: LdsType.family,
        fontSize: 16,
        height: 27 / 16,
        color: context.lds.textDefault,
      );

  @override
  Widget build(BuildContext context) {
    return ConstrainedBox(
      constraints: BoxConstraints(maxWidth: maxWidth),
      child: DefaultTextStyle.merge(
        style: bodyStyle(context),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          mainAxisSize: MainAxisSize.min,
          children: [
            for (var i = 0; i < children.length; i++)
              Padding(
                padding: EdgeInsets.only(
                  top: i == 0
                      ? 0
                      : children[i] is LdsProseHeading
                          ? (children[i] as LdsProseHeading).level == 2
                              ? 40
                              : 28
                          : children[i - 1] is LdsProseHeading
                              ? 10
                              : 16,
                ),
                child: children[i],
              ),
          ],
        ),
      ),
    );
  }
}

/// A section heading inside [LdsProse]: level 2 or 3.
class LdsProseHeading extends StatelessWidget {
  /// Creates a heading.
  const LdsProseHeading(this.text, {super.key, this.level = 2})
      : assert(level == 2 || level == 3, 'Use level 2 or 3');

  /// Heading text.
  final String text;

  /// 2 for a section, 3 for a subsection.
  final int level;

  @override
  Widget build(BuildContext context) {
    final style = level == 2 ? LdsType.title2 : LdsType.title3;
    return Semantics(
      header: true,
      child: Text(text, style: style.copyWith(color: context.lds.textStrong)),
    );
  }
}

/// A bulleted or numbered list inside [LdsProse].
class LdsProseList extends StatelessWidget {
  /// Creates a list.
  const LdsProseList(this.items, {super.key, this.ordered = false});

  /// Items, as text.
  final List<String> items;

  /// Numbers instead of bullets.
  final bool ordered;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final style = LdsProse.bodyStyle(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      mainAxisSize: MainAxisSize.min,
      children: [
        for (var i = 0; i < items.length; i++)
          Padding(
            padding: EdgeInsets.only(top: i == 0 ? 0 : 8),
            child: MergeSemantics(
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(
                    width: 22,
                    child: Text(
                      ordered ? '${i + 1}.' : '•',
                      style: style.copyWith(
                        color: c.textSubtle,
                        fontFeatures: const [FontFeature.tabularFigures()],
                      ),
                    ),
                  ),
                  Expanded(child: Text(items[i], style: style)),
                ],
              ),
            ),
          ),
      ],
    );
  }
}
