import 'package:flutter/material.dart';

import '../../theme.dart';
import '../../tokens.g.dart';
import 'enter_and_exit.dart';

/// How an [LdsHero] places the copy and the product.
enum LdsHeroLayout {
  /// Copy left, product right from 1024 px; product below the copy under it.
  split,

  /// Copy centered (860 px at most) over a wide product below.
  center,
}

/// The top of a landing or product page: one headline, one line under it,
/// at most two actions, and the product itself working beside or below.
///
/// Say the outcome in [title] and the facts in [lede]. [media] holds live
/// components (usually on an [LdsFeatureStage]), not a screenshot. With
/// [enter] the copy and then the media rise out of a small blur once, 60 ms
/// apart; nothing moves after that. Under reduced motion it all simply
/// appears.
class LdsHero extends StatelessWidget {
  /// Creates a hero.
  const LdsHero({
    super.key,
    required this.title,
    this.quietTitle,
    this.lede,
    this.actions = const [],
    this.note,
    this.media,
    this.layout = LdsHeroLayout.split,
    this.enter = true,
  });

  /// The headline: one sentence that says what people get.
  final String title;

  /// An optional second sentence in the subtle color.
  final String? quietTitle;

  /// One to three sentences with the facts behind the headline.
  final String? lede;

  /// One primary button and one secondary at most.
  final List<Widget> actions;

  /// A short line under the actions: a requirement, a free plan.
  final String? note;

  /// The product, working.
  final Widget? media;

  /// Split or centered.
  final LdsHeroLayout layout;

  /// Play the one-time entrance on first build.
  final bool enter;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    return LayoutBuilder(builder: (context, constraints) {
      final w = constraints.maxWidth;
      final center = layout == LdsHeroLayout.center;
      final split = !center && w >= 1024;
      final titleSize = (w * 0.052).clamp(40.0, 68.0);
      final ledeSize = (w * 0.0135).clamp(17.0, 19.0);
      Widget step(int i, Widget child) => LdsBlurIn(
            animate: enter,
            delay: Duration(milliseconds: 60 * i),
            duration: LdsMotion.smooth,
            child: child,
          );
      final align = center ? TextAlign.center : TextAlign.start;
      final copy = <Widget>[
        Semantics(
          header: true,
          child: Text.rich(
            TextSpan(children: [
              TextSpan(text: title),
              if (quietTitle != null)
                TextSpan(
                    text: ' $quietTitle', style: TextStyle(color: c.textSubtle)),
            ]),
            textAlign: align,
            style: TextStyle(
              fontFamily: LdsType.family,
              fontSize: titleSize,
              height: 1.02,
              fontWeight: FontWeight.w600,
              letterSpacing: -0.042 * titleSize,
              color: c.textStrong,
            ),
          ),
        ),
        if (lede != null)
          ConstrainedBox(
            constraints: BoxConstraints(maxWidth: 36 * ledeSize),
            child: Text(
              lede!,
              textAlign: align,
              style: TextStyle(
                fontFamily: LdsType.family,
                fontSize: ledeSize,
                height: 1.5,
                letterSpacing: -0.011 * ledeSize,
                color: c.textSubtle,
              ),
            ),
          ),
        if (actions.isNotEmpty)
          Padding(
            padding: const EdgeInsets.only(top: LdsSpace.s8),
            child: Wrap(
              alignment: center ? WrapAlignment.center : WrapAlignment.start,
              crossAxisAlignment: WrapCrossAlignment.center,
              spacing: LdsSpace.s12,
              runSpacing: LdsSpace.s12,
              children: actions,
            ),
          ),
        if (note != null)
          Text(note!,
              textAlign: align,
              style: LdsType.footnote.copyWith(color: c.textSubtle)),
      ];
      final copyColumn = ConstrainedBox(
        constraints: BoxConstraints(maxWidth: center ? 860 : double.infinity),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment:
              center ? CrossAxisAlignment.center : CrossAxisAlignment.start,
          children: [
            for (var i = 0; i < copy.length; i++) ...[
              if (i > 0) const SizedBox(height: LdsSpace.s20),
              step(i < 3 ? i : 3, copy[i]),
            ],
          ],
        ),
      );
      final gap = (w * 0.05).clamp(LdsSpace.s40, LdsSpace.s72);
      final mediaStep = media == null ? null : step(4, media!);
      final Widget body;
      if (split && mediaStep != null) {
        body = Row(
          children: [
            Expanded(child: copyColumn),
            SizedBox(width: gap),
            Expanded(child: mediaStep),
          ],
        );
      } else {
        body = Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment:
              center ? CrossAxisAlignment.center : CrossAxisAlignment.stretch,
          children: [
            Align(
              alignment: center ? Alignment.center : Alignment.centerLeft,
              child: copyColumn,
            ),
            if (mediaStep != null) ...[SizedBox(height: gap), mediaStep],
          ],
        );
      }
      return Padding(
        padding: EdgeInsets.only(
          top: (w * 0.08).clamp(LdsSpace.s48, 104.0),
          bottom: (w * 0.06).clamp(LdsSpace.s40, LdsSpace.s72),
        ),
        child: body,
      );
    });
  }
}
