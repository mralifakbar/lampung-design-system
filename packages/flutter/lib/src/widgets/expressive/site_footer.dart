import 'package:flutter/material.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../pressable.dart';

/// One link in an [LdsFooterGroup].
@immutable
class LdsFooterLink {
  /// Creates a footer link.
  const LdsFooterLink({required this.label, required this.onTap});

  /// The page name.
  final String label;

  /// Opens the page.
  final VoidCallback onTap;
}

/// A titled group of links in an [LdsSiteFooter].
@immutable
class LdsFooterGroup {
  /// Creates a footer group.
  const LdsFooterGroup({required this.title, required this.links});

  /// The group heading.
  final String title;

  /// Pages that exist.
  final List<LdsFooterLink> links;
}

/// The bottom of a marketing or content site: the product name and one
/// line about it, the link groups that exist, and a bottom row for the small
/// print and an appearance control.
///
/// List only pages that exist. On demo pages, say in [smallPrint] that the
/// content is an example. Links are 44 px tall.
class LdsSiteFooter extends StatelessWidget {
  /// Creates a site footer.
  const LdsSiteFooter({
    super.key,
    required this.name,
    this.about,
    this.groups = const [],
    this.smallPrint,
    this.trailing,
    this.semanticLabel = 'Tautan kaki halaman',
  });

  /// Product or site name.
  final String name;

  /// One line about it.
  final String? about;

  /// Link groups.
  final List<LdsFooterGroup> groups;

  /// Copyright, example notice, legal line.
  final String? smallPrint;

  /// The appearance control or another small control, bottom right.
  final Widget? trailing;

  /// Names the link navigation for screen readers.
  final String semanticLabel;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    return LayoutBuilder(builder: (context, constraints) {
      final w = constraints.maxWidth;
      final brand = Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(name, style: LdsType.headline.copyWith(color: c.textStrong)),
          if (about != null) ...[
            const SizedBox(height: LdsSpace.s8),
            ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 34 * 8),
              child: Text(about!,
                  style: LdsType.subhead.copyWith(color: c.textSubtle)),
            ),
          ],
        ],
      );
      final nav = Semantics(
        container: true,
        label: semanticLabel,
        child: Wrap(
          spacing: LdsSpace.s24,
          runSpacing: LdsSpace.s24,
          children: [
            for (final g in groups)
              SizedBox(
                width: 140,
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Semantics(
                      header: true,
                      child: Text(g.title,
                          style:
                              LdsType.caption.copyWith(color: c.textStrong)),
                    ),
                    const SizedBox(height: LdsSpace.s4),
                    for (final l in g.links) _FooterLink(link: l),
                  ],
                ),
              ),
          ],
        ),
      );
      final top = w >= 760
          ? Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(flex: 2, child: brand),
                const SizedBox(width: LdsSpace.s32),
                Expanded(flex: 3, child: nav),
              ],
            )
          : Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [brand, const SizedBox(height: LdsSpace.s32), nav],
            );
      final bottom = DecoratedBox(
        decoration: BoxDecoration(
            border: Border(top: BorderSide(color: c.hairline))),
        child: Padding(
          padding: const EdgeInsets.only(top: LdsSpace.s24),
          child: Wrap(
            alignment: WrapAlignment.spaceBetween,
            crossAxisAlignment: WrapCrossAlignment.center,
            spacing: LdsSpace.s16,
            runSpacing: LdsSpace.s16,
            children: [
              if (smallPrint != null)
                ConstrainedBox(
                  constraints: const BoxConstraints(maxWidth: 64 * 7),
                  child: Text(smallPrint!,
                      style: LdsType.footnote.copyWith(color: c.textSubtle)),
                ),
              if (trailing != null) trailing!,
            ],
          ),
        ),
      );
      return DecoratedBox(
        decoration: BoxDecoration(
            border: Border(top: BorderSide(color: c.hairline))),
        child: Padding(
          padding: const EdgeInsets.only(
              top: LdsSpace.s48, bottom: LdsSpace.s32),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [top, const SizedBox(height: LdsSpace.s40), bottom],
          ),
        ),
      );
    });
  }
}

class _FooterLink extends StatelessWidget {
  const _FooterLink({required this.link});

  final LdsFooterLink link;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    return LdsPressable(
      onPressed: link.onTap,
      pressedScale: 1,
      minSize: const Size(0, LdsSize.touchMin),
      borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.xs)),
      semanticLabel: link.label,
      excludeChildSemantics: true,
      builder: (context, state) => SizedBox(
        height: LdsSize.touchMin,
        child: Align(
          alignment: Alignment.centerLeft,
          child: AnimatedDefaultTextStyle(
            duration: context.ldsDuration(LdsMotion.fast),
            curve: LdsMotion.standardCurve,
            style: LdsType.subhead.copyWith(
              color: state.hovered || state.pressed
                  ? c.textStrong
                  : c.textSubtle,
            ),
            child: Text(link.label),
          ),
        ),
      ),
    );
  }
}
