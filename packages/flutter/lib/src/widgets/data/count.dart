import 'package:material_ui/material_ui.dart';

import '../../theme.dart';
import '../../tokens.g.dart';

/// A small red pill with how many items wait: unread reports, new messages.
///
/// Zero renders nothing (never "0"); above 99 it reads "99+". [noun] says
/// what the number counts, so a screen reader hears "3 laporan baru" rather
/// than a bare number.
class LdsCount extends StatelessWidget {
  /// Creates a count.
  const LdsCount(this.count, {super.key, required this.noun});

  /// The number of waiting items.
  final int count;

  /// What is counted, for example "laporan baru".
  final String noun;

  /// The text the pill shows for [count].
  static String format(int count) => count > 99 ? '99+' : '$count';

  @override
  Widget build(BuildContext context) {
    if (count <= 0) return const SizedBox.shrink();
    final c = context.lds;
    return Semantics(
      label: '$count $noun',
      excludeSemantics: true,
      child: Container(
        constraints: const BoxConstraints(minWidth: 18),
        height: 18,
        padding: const EdgeInsets.symmetric(horizontal: 5),
        alignment: Alignment.center,
        decoration: BoxDecoration(
          color: c.danger,
          borderRadius: const BorderRadius.all(Radius.circular(9)),
        ),
        child: Text(
          format(count),
          maxLines: 1,
          textScaler: TextScaler.noScaling,
          style: TextStyle(
            fontFamily: LdsType.family,
            fontSize: 11,
            height: 1,
            fontWeight: FontWeight.w600,
            color: c.textOnAccent,
            fontFeatures: const [FontFeature.tabularFigures()],
          ),
        ),
      ),
    );
  }
}
