import 'package:material_ui/material_ui.dart';

import '../../theme.dart';
import '../../tokens.g.dart';

/// Words someone said or wrote, with an accent bar and an optional
/// attribution.
class LdsQuote extends StatelessWidget {
  /// Creates a quote.
  const LdsQuote(this.text, {super.key, this.attribution});

  /// The quoted words.
  final String text;

  /// Who said it and where.
  final String? attribution;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    return Container(
      padding: const EdgeInsets.only(left: 18, top: 4, bottom: 4),
      decoration: BoxDecoration(
        border: Border(left: BorderSide(color: c.accent, width: 3)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(
            text,
            style: TextStyle(
              fontFamily: LdsType.family,
              fontSize: 17,
              height: 28 / 17,
              color: c.textStrong,
            ),
          ),
          if (attribution != null) ...[
            const SizedBox(height: 8),
            Text(
              attribution!,
              style: LdsType.footnote.copyWith(color: c.textSubtle),
            ),
          ],
        ],
      ),
    );
  }
}
