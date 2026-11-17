import 'package:flutter/material.dart';

import '../../theme.dart';
import '../../tokens.g.dart';
import '../icon.dart';

/// Where an [LdsMarketingSection] places its head.
enum LdsSectionHeadAlign {
  /// Left aligned, 760 px at most.
  start,

  /// Centered, for centered content such as pricing.
  center,
}

/// One part of a landing or product page: a head with an eyebrow, a large
/// title and a lede, over any [child]. Every section shares the same width
/// (1200 px) and gutter, so edges line up down the page.
///
/// [aside] puts one secondary action at the bottom right of the head (under
/// the lede on phones). [rule] draws a hairline on top; [tight] halves the
/// vertical space for a strip or a closing band.
class LdsMarketingSection extends StatelessWidget {
  /// Creates a marketing section.
  const LdsMarketingSection({
    super.key,
    required this.child,
    this.title,
    this.eyebrow,
    this.eyebrowIcon,
    this.lede,
    this.aside,
    this.headAlign = LdsSectionHeadAlign.start,
    this.rule = false,
    this.tight = false,
    this.maxWidth = 1200,
  });

  /// The content under the head.
  final Widget child;

  /// One sentence that states a fact or an outcome.
  final String? title;

  /// A short label naming the topic (sentence case, not a pill).
  final String? eyebrow;

  /// Decorative icon before the eyebrow.
  final String? eyebrowIcon;

  /// One or two sentences.
  final String? lede;

  /// One secondary action beside the head.
  final Widget? aside;

  /// Head alignment.
  final LdsSectionHeadAlign headAlign;

  /// Hairline on top.
  final bool rule;

  /// About half the vertical space.
  final bool tight;

  /// Content width.
  final double maxWidth;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    return LayoutBuilder(builder: (context, constraints) {
      final w = constraints.maxWidth;
      final vertical = tight
          ? (w * 0.05).clamp(LdsSpace.s32, LdsSpace.s56)
          : (w * 0.09).clamp(LdsSpace.s56, 120.0);
      final gutter = (w * 0.04).clamp(LdsSpace.s20, LdsSpace.s48);
      final center = headAlign == LdsSectionHeadAlign.center;
      final titleSize = (w * 0.04).clamp(30.0, 48.0);
      final align = center ? TextAlign.center : TextAlign.start;
      final hasHead = title != null || eyebrow != null || lede != null;
      final headText = Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment:
            center ? CrossAxisAlignment.center : CrossAxisAlignment.start,
        children: [
          if (eyebrow != null)
            Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                if (eyebrowIcon != null) ...[
                  LdsIcon(eyebrowIcon!, size: 16, color: c.textSubtle),
                  const SizedBox(width: LdsSpace.s6),
                ],
                Flexible(
                  child: Text(eyebrow!,
                      style: LdsType.caption.copyWith(color: c.textSubtle)),
                ),
              ],
            ),
          if (title != null) ...[
            if (eyebrow != null) const SizedBox(height: LdsSpace.s12),
            Semantics(
              header: true,
              child: Text(
                title!,
                textAlign: align,
                style: TextStyle(
                  fontFamily: LdsType.family,
                  fontSize: titleSize,
                  height: 1.08,
                  fontWeight: FontWeight.w600,
                  letterSpacing: -0.034 * titleSize,
                  color: c.textStrong,
                ),
              ),
            ),
          ],
          if (lede != null) ...[
            const SizedBox(height: LdsSpace.s12),
            ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 62 * 8.5),
              child: Text(
                lede!,
                textAlign: align,
                style: TextStyle(
                  fontFamily: LdsType.family,
                  fontSize: 17,
                  height: 26 / 17,
                  letterSpacing: -0.136,
                  color: c.textSubtle,
                ),
              ),
            ),
          ],
        ],
      );
      Widget? head;
      if (hasHead) {
        if (aside != null && w >= 760) {
          head = Row(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Expanded(child: headText),
              const SizedBox(width: LdsSpace.s32),
              aside!,
            ],
          );
        } else {
          head = ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 760),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: center
                  ? CrossAxisAlignment.center
                  : CrossAxisAlignment.start,
              children: [
                headText,
                if (aside != null) ...[
                  const SizedBox(height: LdsSpace.s16),
                  aside!,
                ],
              ],
            ),
          );
        }
        head = Align(
          alignment: center ? Alignment.topCenter : Alignment.topLeft,
          child: head,
        );
      }
      return DecoratedBox(
        decoration: BoxDecoration(
          border: rule ? Border(top: BorderSide(color: c.hairline)) : null,
        ),
        child: Center(
          child: ConstrainedBox(
            constraints: BoxConstraints(maxWidth: maxWidth + gutter * 2),
            child: Padding(
              padding: EdgeInsets.symmetric(
                  horizontal: gutter, vertical: vertical),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  if (head != null) ...[
                    head,
                    SizedBox(
                        height: (w * 0.05).clamp(LdsSpace.s32, LdsSpace.s56)),
                  ],
                  child,
                ],
              ),
            ),
          ),
        ),
      );
    });
  }
}
