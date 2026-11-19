import 'package:material_ui/material_ui.dart';

import '../theme.dart';
import '../tokens.g.dart';
import 'icon.dart';

/// The thin strip at the very top of a screen that says this is not an
/// official government service.
///
/// Lampung Design System is unofficial. Any app that could be mistaken for a
/// government service shows this strip; [text] makes it fit the app.
class LdsMasthead extends StatelessWidget {
  /// Creates a masthead.
  const LdsMasthead({
    super.key,
    this.text = defaultText,
    this.trailing,
    this.safeArea = true,
  });

  /// The default wording, in Indonesian.
  static const String defaultText =
      'Bukan situs atau aplikasi resmi pemerintah.';

  /// What the strip says.
  final String text;

  /// Optional small link or button at the end, for example "Pelajari".
  final Widget? trailing;

  /// Pad for the status bar when the strip sits at the top of the screen.
  final bool safeArea;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    Widget strip = Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
      child: Row(
        children: [
          LdsIcon('info', size: 15, fill: true, color: c.goldText),
          const SizedBox(width: 8),
          Expanded(
            child: Text(
              text,
              style: LdsType.footnote.copyWith(color: c.textSubtle),
            ),
          ),
          if (trailing != null) ...[const SizedBox(width: 8), trailing!],
        ],
      ),
    );
    if (safeArea) strip = SafeArea(bottom: false, child: strip);
    return Semantics(
      container: true,
      child: DecoratedBox(
        decoration: BoxDecoration(
          color: c.bgFill,
          border: Border(bottom: BorderSide(color: c.hairline)),
        ),
        child: strip,
      ),
    );
  }
}
