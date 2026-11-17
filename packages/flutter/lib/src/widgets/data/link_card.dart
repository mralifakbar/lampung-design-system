import 'package:flutter/material.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../icon.dart';
import '../pressable.dart';

/// A whole card that leads somewhere: a service, a guide, a section.
///
/// On hover the fill deepens and the chevron moves 3 px toward the
/// destination; press sinks it to 0.985.
class LdsLinkCard extends StatelessWidget {
  /// Creates a link card.
  const LdsLinkCard({
    super.key,
    required this.title,
    required this.onTap,
    this.eyebrow,
    this.eyebrowIcon,
    this.body,
    this.foot,
    this.semanticLabel,
  });

  /// The destination name.
  final String title;

  /// Opens the destination.
  final VoidCallback? onTap;

  /// The kind of destination, for example "Layanan".
  final String? eyebrow;

  /// Small icon before [eyebrow] (ligature name).
  final String? eyebrowIcon;

  /// One line of detail.
  final String? body;

  /// Status at the bottom, for example "Rata-rata 3 hari kerja".
  final String? foot;

  /// Overrides the announced label.
  final String? semanticLabel;

  static const BorderRadius _radius =
      BorderRadius.all(Radius.circular(LdsRadius.lg));

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final reduce = context.ldsReduceMotion;
    return LdsPressable(
      onPressed: onTap,
      pressedScale: 0.985,
      borderRadius: _radius,
      semanticLabel: semanticLabel,
      builder: (context, state) {
        final hot = state.hovered;
        return AnimatedContainer(
          duration: context.ldsDuration(LdsMotion.fast),
          curve: LdsMotion.standardCurve,
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 18),
          decoration: BoxDecoration(
            color: hot || state.pressed
                ? Color.alphaBlend(c.bgTintStrong, c.bgFill)
                : c.bgFill,
            borderRadius: _radius,
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              if (eyebrow != null) ...[
                Row(
                  children: [
                    if (eyebrowIcon != null) ...[
                      LdsIcon(eyebrowIcon!, size: 15, color: c.textMuted),
                      const SizedBox(width: 6),
                    ],
                    Flexible(
                      child: Text(
                        eyebrow!,
                        style: LdsType.caption.copyWith(color: c.textMuted),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 6),
              ],
              Text(title,
                  style: LdsType.headline.copyWith(color: c.textStrong)),
              if (body != null) ...[
                const SizedBox(height: 6),
                Text(body!,
                    style: LdsType.subhead.copyWith(color: c.textSubtle)),
              ],
              Padding(
                padding: const EdgeInsets.only(top: 16),
                child: Row(
                  children: [
                    Expanded(
                      child: Text(
                        foot ?? '',
                        style: LdsType.footnote.copyWith(color: c.textMuted),
                      ),
                    ),
                    AnimatedSlide(
                      offset: Offset(hot && !reduce ? 3 / 20 : 0, 0),
                      duration: context.ldsDuration(LdsMotion.snappy),
                      curve: LdsSpringCurve.snappy,
                      child: LdsIcon(
                        'chevron_right',
                        color: hot ? c.accentText : c.textFaint,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}
