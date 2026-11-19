import 'package:material_ui/material_ui.dart';

import '../../theme.dart';
import '../../tokens.g.dart';

/// The last ask on a landing page: a short title, one line, and the same
/// primary action as the hero, centered on the quiet fill.
///
/// Name the action the same way as in the hero ("Ajukan izin sekarang"),
/// never "Mulai" or "Pelajari". [extra] can hold the one line people copy
/// to start (a code block on the base color, 460 px at most).
class LdsCtaBand extends StatelessWidget {
  /// Creates a call-to-action band.
  const LdsCtaBand({
    super.key,
    required this.title,
    this.body,
    this.actions = const [],
    this.extra,
  });

  /// One sentence.
  final String title;

  /// One or two sentences, including what it costs to start.
  final String? body;

  /// The primary action and one secondary.
  final List<Widget> actions;

  /// Optional content between the body and the actions.
  final Widget? extra;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    return LayoutBuilder(
      builder: (context, constraints) {
        final w = constraints.maxWidth;
        final titleSize = (w * 0.04).clamp(28.0, 46.0);
        final children = <Widget>[
          ConstrainedBox(
            constraints: BoxConstraints(maxWidth: 18 * titleSize),
            child: Semantics(
              header: true,
              child: Text(
                title,
                textAlign: TextAlign.center,
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
          ),
          if (body != null)
            ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 46 * 8.5),
              child: Text(
                body!,
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontFamily: LdsType.family,
                  fontSize: 17,
                  height: 26 / 17,
                  color: c.textSubtle,
                ),
              ),
            ),
          if (extra != null)
            ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 460),
              child: extra,
            ),
          if (actions.isNotEmpty)
            Padding(
              padding: const EdgeInsets.only(top: LdsSpace.s4),
              child: Wrap(
                alignment: WrapAlignment.center,
                crossAxisAlignment: WrapCrossAlignment.center,
                spacing: LdsSpace.s12,
                runSpacing: LdsSpace.s12,
                children: actions,
              ),
            ),
        ];
        return DecoratedBox(
          decoration: BoxDecoration(
            color: c.bgFill,
            borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.xl)),
          ),
          child: Padding(
            padding: EdgeInsets.symmetric(
              vertical: (w * 0.07).clamp(LdsSpace.s40, 88.0),
              horizontal: (w * 0.04).clamp(LdsSpace.s20, LdsSpace.s48),
            ),
            child: Center(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  for (var i = 0; i < children.length; i++) ...[
                    if (i > 0) const SizedBox(height: LdsSpace.s20),
                    children[i],
                  ],
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}
