import 'package:material_ui/material_ui.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../icon.dart';

/// A picture of a phone status bar for mockups: time, signal, Wi-Fi and
/// battery, 54 px tall. Used by [LdsDeviceFrame]; decorative, so screen
/// readers skip it.
///
/// Never put real information in it; it is a mockup.
class LdsPhoneStatusBar extends StatelessWidget {
  /// Creates a status bar.
  const LdsPhoneStatusBar({
    super.key,
    this.time = '09.41',
    this.battery = 0.8,
    this.light = false,
  });

  /// The time shown.
  final String time;

  /// Battery level, 0 to 1.
  final double battery;

  /// Light content, for a dark backdrop (a sheet pushed the screen back).
  final bool light;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final color = light ? c.textOnAccent : c.textStrong;
    return ExcludeSemantics(
      child: TweenAnimationBuilder<Color?>(
        tween: ColorTween(end: color),
        duration: context.ldsDuration(LdsMotion.smooth),
        curve: LdsMotion.standardCurve,
        builder: (context, color, _) {
          final fg = color ?? c.textStrong;
          final faint = fg.withValues(alpha: fg.a * 0.45);
          return SizedBox(
            height: 54,
            child: Padding(
              padding: const EdgeInsets.fromLTRB(50, 4, 28, 0),
              child: Row(
                children: [
                  Text(
                    time,
                    textScaler: TextScaler.noScaling,
                    style: TextStyle(
                      fontFamily: LdsType.family,
                      fontSize: 16,
                      height: 1,
                      fontWeight: FontWeight.w600,
                      letterSpacing: -0.16,
                      fontFeatures: const [FontFeature.tabularFigures()],
                      color: fg,
                    ),
                  ),
                  const Spacer(),
                  // Signal: four bars of rising height.
                  for (final h in const [4.0, 6.0, 8.5, 11.0]) ...[
                    Container(
                      width: 3,
                      height: h,
                      margin: EdgeInsets.only(right: 1.5, top: 11 - h),
                      decoration: BoxDecoration(
                        color: fg,
                        borderRadius: const BorderRadius.all(
                          Radius.circular(1),
                        ),
                      ),
                    ),
                  ],
                  const SizedBox(width: 4.5),
                  LdsIcon('wifi', size: 17, color: fg),
                  const SizedBox(width: 6),
                  Container(
                    width: 25,
                    height: 12,
                    padding: const EdgeInsets.all(2),
                    alignment: Alignment.centerLeft,
                    decoration: BoxDecoration(
                      border: Border.all(color: faint),
                      borderRadius: const BorderRadius.all(Radius.circular(4)),
                    ),
                    child: FractionallySizedBox(
                      widthFactor: battery.clamp(0.0, 1.0),
                      heightFactor: 1,
                      child: DecoratedBox(
                        decoration: BoxDecoration(
                          color: fg,
                          borderRadius: const BorderRadius.all(
                            Radius.circular(2),
                          ),
                        ),
                      ),
                    ),
                  ),
                  Container(
                    width: 1.5,
                    height: 4,
                    margin: const EdgeInsets.only(right: 3),
                    decoration: BoxDecoration(
                      color: faint,
                      borderRadius: const BorderRadius.horizontal(
                        right: Radius.circular(1),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
