import 'package:flutter/material.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../button.dart';
import '../pressable.dart';

/// A thumbnail that shows its picture large over a dim page: the picture
/// grows out of the thumbnail and shrinks back into it.
///
/// [semanticLabel] is the picture's alt text. Escape, the close button and
/// a tap on the scrim close it; focus returns to the thumbnail.
class LdsLightbox extends StatefulWidget {
  /// Creates a lightbox thumbnail.
  const LdsLightbox({
    super.key,
    required this.image,
    required this.semanticLabel,
    this.caption,
    this.aspectRatio = 4 / 3,
    this.closeLabel = 'Close',
  });

  /// The picture, used for both the thumbnail and the large view.
  final ImageProvider image;

  /// Alt text.
  final String semanticLabel;

  /// Caption under the large picture.
  final String? caption;

  /// Thumbnail shape.
  final double aspectRatio;

  /// Label of the close button.
  final String closeLabel;

  @override
  State<LdsLightbox> createState() => _LdsLightboxState();
}

class _LdsLightboxState extends State<LdsLightbox> {
  final Object _tag = Object();

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    const radius = BorderRadius.all(Radius.circular(LdsRadius.md));
    return LdsPressable(
      onPressed: () => showLdsLightbox(
        context: context,
        image: widget.image,
        semanticLabel: widget.semanticLabel,
        caption: widget.caption,
        closeLabel: widget.closeLabel,
        heroTag: _tag,
      ),
      pressedScale: 0.98,
      semanticLabel: widget.semanticLabel,
      excludeChildSemantics: true,
      builder: (context, state) {
        return AspectRatio(
          aspectRatio: widget.aspectRatio,
          child: ClipRRect(
            borderRadius: radius,
            child: ColoredBox(
              color: c.bgRecessed,
              child: AnimatedScale(
                scale: state.hovered && !context.ldsReduceMotion ? 1.03 : 1,
                duration: context.ldsDuration(LdsMotion.smooth),
                curve: LdsSpringCurve.smooth,
                child: Hero(
                  tag: _tag,
                  child: Image(image: widget.image, fit: BoxFit.cover),
                ),
              ),
            ),
          ),
        );
      },
    );
  }
}

/// Shows [image] large over a dim page. With [heroTag] matching a [Hero]
/// around the thumbnail, the picture grows from it (420 ms on the enter
/// curve) and shrinks back (220 ms on the exit curve).
Future<void> showLdsLightbox({
  required BuildContext context,
  required ImageProvider image,
  required String semanticLabel,
  String? caption,
  String closeLabel = 'Close',
  Object? heroTag,
}) {
  final reduce = context.ldsReduceMotion;
  return Navigator.of(context, rootNavigator: true).push<void>(
    PageRouteBuilder<void>(
      opaque: false,
      barrierDismissible: true,
      barrierLabel: closeLabel,
      barrierColor: context.lds.bgScrim,
      transitionDuration:
          reduce ? LdsMotion.instant : const Duration(milliseconds: 420),
      reverseTransitionDuration:
          reduce ? LdsMotion.instant : const Duration(milliseconds: 220),
      pageBuilder: (context, animation, _) {
        final c = context.lds;
        Widget picture = Image(
          image: image,
          fit: BoxFit.contain,
          semanticLabel: semanticLabel,
        );
        if (heroTag != null && !reduce) {
          picture = Hero(
            tag: heroTag,
            child: picture,
          );
        }
        return Semantics(
          scopesRoute: true,
          explicitChildNodes: true,
          child: Stack(
            children: [
              Positioned.fill(
                child: GestureDetector(
                  excludeFromSemantics: true,
                  onTap: () => Navigator.of(context).maybePop(),
                ),
              ),
              Positioned.fill(
                child: SafeArea(
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(24, 56, 24, 56),
                    child: Center(
                      child: ClipRRect(
                        borderRadius: const BorderRadius.all(
                            Radius.circular(LdsRadius.md)),
                        child: picture,
                      ),
                    ),
                  ),
                ),
              ),
              Positioned.fill(
                child: SafeArea(
                  child: FadeTransition(
                    opacity: animation,
                    child: Stack(
                      children: [
                        PositionedDirectional(
                          top: 12,
                          end: 12,
                          child: DecoratedBox(
                            decoration: BoxDecoration(
                              color: c.bgInverse,
                              shape: BoxShape.circle,
                            ),
                            child: LdsIconButton(
                              icon: 'close',
                              semanticLabel: closeLabel,
                              color: c.textInverse,
                              onPressed: () => Navigator.of(context).maybePop(),
                            ),
                          ),
                        ),
                        if (caption != null)
                          Positioned(
                            left: 24,
                            right: 24,
                            bottom: 16,
                            child: Center(
                              child: Container(
                                padding: const EdgeInsets.symmetric(
                                    horizontal: 12, vertical: 6),
                                decoration: BoxDecoration(
                                  color: c.bgInverse,
                                  borderRadius: const BorderRadius.all(
                                      Radius.circular(10)),
                                ),
                                child: Text(
                                  caption,
                                  textAlign: TextAlign.center,
                                  style: LdsType.footnote
                                      .copyWith(color: c.textInverse),
                                ),
                              ),
                            ),
                          ),
                      ],
                    ),
                  ),
                ),
              ),
            ],
          ),
        );
      },
      transitionsBuilder: (context, animation, _, child) => FadeTransition(
        opacity: CurvedAnimation(
          parent: animation,
          curve: LdsMotion.enterCurve,
          reverseCurve: LdsMotion.exitCurve.flipped,
        ),
        child: child,
      ),
    ),
  );
}
