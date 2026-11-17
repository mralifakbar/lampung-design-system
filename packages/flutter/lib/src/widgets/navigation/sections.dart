import 'package:flutter/material.dart';

import '../../theme.dart';
import '../../tokens.g.dart';

/// A page as a column of titled sections: 48 px apart (40 on phones), a
/// hairline above every section after the first, a larger heading on wide
/// screens.
///
/// Structure comes from space and headings, not from a card around each
/// part. Fill it with [LdsSection]s.
class LdsSections extends StatelessWidget {
  /// Creates a column of sections.
  const LdsSections({super.key, required this.children});

  /// The sections, usually [LdsSection]s.
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final width = MediaQuery.sizeOf(context).width;
    final gap = width < 600 ? LdsSpace.s40 : LdsSpace.s48;
    final items = <Widget>[];
    for (var i = 0; i < children.length; i++) {
      if (i == 0) {
        items.add(children[i]);
        continue;
      }
      items.add(Padding(
        padding: EdgeInsets.only(top: gap),
        child: DecoratedBox(
          decoration: BoxDecoration(
            border: Border(top: BorderSide(color: c.hairline)),
          ),
          child: Padding(
            padding: const EdgeInsets.only(top: LdsSpace.s40),
            child: children[i],
          ),
        ),
      ));
    }
    return _InSections(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: items,
      ),
    );
  }
}

/// One titled part of a page.
///
/// Inside [LdsSections] the heading is Title 2 (Title 1 from 900 px) with
/// 20 px between children. Standalone, inside a dialog or side panel, it
/// uses the smaller Title 3 with 12 px gaps.
class LdsSection extends StatelessWidget {
  /// Creates a section.
  const LdsSection({
    super.key,
    required this.title,
    required this.children,
    this.subtitle,
  });

  /// The section heading.
  final String title;

  /// One sentence about the section.
  final String? subtitle;

  /// The content.
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final inSections =
        context.dependOnInheritedWidgetOfExactType<_InSections>() != null;
    final wide = MediaQuery.sizeOf(context).width >= 900;
    final style =
        inSections ? (wide ? LdsType.title1 : LdsType.title2) : LdsType.title3;
    final gap = inSections ? LdsSpace.s20 : LdsSpace.s12;
    return Semantics(
      container: true,
      explicitChildNodes: true,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        spacing: gap,
        children: [
          Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            spacing: 6,
            children: [
              Semantics(
                header: true,
                child: Text(title,
                    textWidthBasis: TextWidthBasis.longestLine,
                    style: style.copyWith(color: c.textStrong)),
              ),
              if (subtitle != null)
                ConstrainedBox(
                  // About 68 characters at subhead size.
                  constraints: const BoxConstraints(maxWidth: 520),
                  child: Text(subtitle!,
                      style: LdsType.subhead.copyWith(color: c.textSubtle)),
                ),
            ],
          ),
          ...children,
        ],
      ),
    );
  }
}

/// Small text heading for a sub-group inside an [LdsSection].
class LdsSectionSubtitle extends StatelessWidget {
  /// Creates a sub-group heading.
  const LdsSectionSubtitle(this.text, {super.key});

  /// The heading text.
  final String text;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      header: true,
      child: Text(text,
          style: LdsType.headline.copyWith(color: context.lds.textStrong)),
    );
  }
}

class _InSections extends InheritedWidget {
  const _InSections({required super.child});

  @override
  bool updateShouldNotify(_InSections oldWidget) => false;
}
