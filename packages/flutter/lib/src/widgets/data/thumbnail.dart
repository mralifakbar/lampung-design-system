import 'package:flutter/material.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../button.dart';
import '../pressable.dart';

/// A picture cropped to a ratio, that may open large in a lightbox.
///
/// Until the image arrives the frame shows the recessed fill at its final
/// size, so nothing jumps. On hover the picture grows to 1.03 inside its
/// frame. With [lightbox] a tap opens the full picture over a scrim; focus
/// returns to the thumbnail when it closes.
class LdsThumbnail extends StatefulWidget {
  /// Creates a thumbnail.
  const LdsThumbnail({
    super.key,
    required this.image,
    required this.semanticLabel,
    this.aspectRatio = 4 / 3,
    this.lightbox = false,
    this.caption,
    this.onTap,
    this.closeLabel = 'Tutup',
  });

  /// The picture.
  final ImageProvider image;

  /// Describes the picture (its alt text).
  final String semanticLabel;

  /// Width over height: 1 for squares, 16 / 9 for screenshots.
  final double aspectRatio;

  /// A tap opens the picture large.
  final bool lightbox;

  /// Caption under the large picture; also names the dialog.
  final String? caption;

  /// Custom tap action; overrides [lightbox].
  final VoidCallback? onTap;

  /// Label of the lightbox close button.
  final String closeLabel;

  @override
  State<LdsThumbnail> createState() => _LdsThumbnailState();
}

class _LdsThumbnailState extends State<LdsThumbnail> {
  final Object _heroTag = Object();

  Future<void> _open() async {
    final reduce = context.ldsReduceMotion;
    await Navigator.of(context).push(PageRouteBuilder<void>(
      opaque: false,
      barrierDismissible: true,
      barrierLabel: widget.closeLabel,
      transitionDuration:
          reduce ? LdsMotion.instant : const Duration(milliseconds: 420),
      reverseTransitionDuration:
          reduce ? LdsMotion.instant : const Duration(milliseconds: 220),
      pageBuilder: (context, animation, _) => _Lightbox(
        image: widget.image,
        semanticLabel: widget.semanticLabel,
        caption: widget.caption,
        closeLabel: widget.closeLabel,
        heroTag: reduce ? null : _heroTag,
        animation: animation,
      ),
    ));
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final tap = widget.onTap ?? (widget.lightbox ? _open : null);
    const radius = BorderRadius.all(Radius.circular(LdsRadius.md));
    Widget frame(bool hot) => ClipRRect(
          borderRadius: radius,
          child: AspectRatio(
            aspectRatio: widget.aspectRatio,
            child: ColoredBox(
              color: c.bgRecessed,
              child: AnimatedScale(
                scale: hot && !context.ldsReduceMotion ? 1.03 : 1,
                duration: LdsMotion.smoothSpringDuration,
                curve: LdsSpringCurve.smooth,
                child: Hero(
                  tag: _heroTag,
                  child: Image(
                    image: widget.image,
                    fit: BoxFit.cover,
                    semanticLabel: widget.semanticLabel,
                    gaplessPlayback: true,
                  ),
                ),
              ),
            ),
          ),
        );
    if (tap == null) return frame(false);
    return LdsPressable(
      onPressed: tap,
      pressedScale: 0.985,
      semanticLabel: widget.semanticLabel,
      excludeChildSemantics: true,
      builder: (context, state) => frame(state.hovered),
    );
  }
}

class _Lightbox extends StatelessWidget {
  const _Lightbox({
    required this.image,
    required this.semanticLabel,
    required this.caption,
    required this.closeLabel,
    required this.heroTag,
    required this.animation,
  });

  final ImageProvider image;
  final String semanticLabel;
  final String? caption;
  final String closeLabel;
  final Object? heroTag;
  final Animation<double> animation;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final picture =
        Image(image: image, fit: BoxFit.contain, semanticLabel: semanticLabel);
    return Semantics(
      scopesRoute: true,
      explicitChildNodes: true,
      namesRoute: true,
      label: caption ?? semanticLabel,
      child: Stack(
        children: [
          Positioned.fill(
            child: FadeTransition(
              opacity: animation,
              child: GestureDetector(
                onTap: () => Navigator.of(context).pop(),
                child: ColoredBox(color: c.bgScrim),
              ),
            ),
          ),
          SafeArea(
            child: Padding(
              padding: const EdgeInsets.all(24),
              child: Column(
                children: [
                  Align(
                    alignment: AlignmentDirectional.centerEnd,
                    child: FadeTransition(
                      opacity: animation,
                      child: LdsIconButton(
                        icon: 'close',
                        semanticLabel: closeLabel,
                        variant: LdsIconButtonVariant.filled,
                        onPressed: () => Navigator.of(context).pop(),
                      ),
                    ),
                  ),
                  const SizedBox(height: 12),
                  Expanded(
                    child: Center(
                      child: heroTag == null
                          ? FadeTransition(opacity: animation, child: picture)
                          : Hero(tag: heroTag!, child: picture),
                    ),
                  ),
                  if (caption != null) ...[
                    const SizedBox(height: 12),
                    FadeTransition(
                      opacity: animation,
                      child: Container(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 12, vertical: 6),
                        decoration: BoxDecoration(
                          color: c.bgInverse,
                          borderRadius: const BorderRadius.all(
                              Radius.circular(LdsRadius.sm)),
                        ),
                        child: Text(
                          caption!,
                          textAlign: TextAlign.center,
                          style: LdsType.subhead.copyWith(color: c.textInverse),
                        ),
                      ),
                    ),
                  ],
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
