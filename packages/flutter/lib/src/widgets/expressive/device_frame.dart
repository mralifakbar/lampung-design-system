import 'package:flutter/material.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import 'phone_bars.dart';

/// A phone body around a screen: rounded bezel, side buttons, the camera
/// island, a status bar and the home indicator, scaled down to fit its
/// parent (never above its real 414 by 868 size).
///
/// [child] is the 390 by 844 screen content. While [pushed] (a sheet is
/// open), the content recedes like a card and the status bar turns light;
/// put the sheet in [overlay] so it does not recede with it. With [bleed]
/// (on a real phone) the body goes and the content fills the space.
///
/// The body, island, status bar and home indicator are decorative. Under
/// reduced motion the content stays in place and only dims.
class LdsDeviceFrame extends StatelessWidget {
  /// Creates a device frame.
  const LdsDeviceFrame({
    super.key,
    required this.child,
    this.overlay,
    this.pushed = false,
    this.bleed = false,
    this.time = '09.41',
    this.semanticLabel = 'Pratinjau ponsel',
  });

  /// The screen content.
  final Widget child;

  /// Layers that stay in front of the receding content (sheets, scrims).
  final Widget? overlay;

  /// Whether a sheet has pushed the content back.
  final bool pushed;

  /// Drop the body and fill the parent, for a real phone.
  final bool bleed;

  /// Time in the status bar.
  final String time;

  /// Names the preview for screen readers.
  final String semanticLabel;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final reduce = context.ldsReduceMotion;
    final content = TweenAnimationBuilder<double>(
      tween: Tween(end: pushed ? 1 : 0),
      duration: reduce ? LdsMotion.instant : LdsMotion.smoothSpringDuration,
      curve: reduce ? Curves.linear : LdsSpringCurve.smooth,
      child: child,
      builder: (context, t, child) {
        final travel = reduce ? 0.0 : t;
        final dim = 1 - 0.08 * t;
        return Transform.translate(
          offset: Offset(0, (bleed ? 10 : 44) * travel),
          child: Transform.scale(
            scale: 1 - 0.08 * travel,
            alignment: Alignment.topCenter,
            child: ClipRRect(
              borderRadius:
                  BorderRadius.all(Radius.circular(12 * travel)),
              child: ColorFiltered(
                colorFilter: ColorFilter.matrix([
                  dim, 0, 0, 0, 0, //
                  0, dim, 0, 0, 0, //
                  0, 0, dim, 0, 0, //
                  0, 0, 0, 1, 0, //
                ]),
                child: ColoredBox(color: c.bgCanvas, child: child),
              ),
            ),
          ),
        );
      },
    );
    final screen = ColoredBox(
      color: pushed ? c.deviceIsland : c.bgCanvas,
      child: Stack(
        fit: StackFit.expand,
        children: [content, if (overlay != null) overlay!],
      ),
    );
    if (bleed) {
      return Semantics(container: true, label: semanticLabel, child: screen);
    }
    final edge = c.deviceEdge;
    Widget sideButton(double top, double height, {bool right = false}) =>
        Positioned(
          top: top,
          left: right ? null : -3,
          right: right ? -3 : null,
          child: Container(
            width: 4,
            height: height,
            decoration: BoxDecoration(
              color: edge,
              borderRadius: const BorderRadius.all(Radius.circular(2)),
            ),
          ),
        );
    final body = SizedBox(
      width: 414,
      height: 868,
      child: Stack(
        clipBehavior: Clip.none,
        children: [
          sideButton(180, 60),
          sideButton(256, 60),
          sideButton(228, 96, right: true),
          Positioned.fill(
            child: DecoratedBox(
              decoration: BoxDecoration(
                color: c.deviceBody,
                borderRadius: const BorderRadius.all(Radius.circular(60)),
                border: Border.all(color: edge),
                boxShadow: context.ldsShadows.lg,
              ),
            ),
          ),
          Positioned.fill(
            child: Padding(
              padding: const EdgeInsets.all(4),
              child: DecoratedBox(
                decoration: BoxDecoration(
                  borderRadius: const BorderRadius.all(Radius.circular(56)),
                  border: Border.all(color: edge),
                ),
              ),
            ),
          ),
          Positioned(
            left: 12,
            top: 12,
            width: 390,
            height: 844,
            child: ClipRRect(
              borderRadius: const BorderRadius.all(Radius.circular(48)),
              child: screen,
            ),
          ),
          Positioned(
            top: 0,
            left: 0,
            right: 0,
            child: IgnorePointer(
              child: LdsPhoneStatusBar(time: time, light: pushed),
            ),
          ),
          Positioned(
            top: 11,
            left: (414 - 122) / 2,
            child: ExcludeSemantics(
              child: Container(
                width: 122,
                height: 36,
                decoration: BoxDecoration(
                  color: c.deviceIsland,
                  borderRadius:
                      const BorderRadius.all(Radius.circular(LdsRadius.pill)),
                ),
              ),
            ),
          ),
          Positioned(
            bottom: 12 + 8,
            left: (414 - 134) / 2,
            child: IgnorePointer(
              child: ExcludeSemantics(
                child: Container(
                  width: 134,
                  height: 5,
                  decoration: BoxDecoration(
                    color: pushed ? c.textOnAccent : c.textStrong,
                    borderRadius: const BorderRadius.all(Radius.circular(3)),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
    return Semantics(
      container: true,
      label: semanticLabel,
      child: FittedBox(fit: BoxFit.scaleDown, child: body),
    );
  }
}
