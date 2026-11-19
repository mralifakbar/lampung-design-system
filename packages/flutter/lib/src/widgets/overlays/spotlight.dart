import 'package:material_ui/material_ui.dart';

import '../../theme.dart';
import '../../tokens.g.dart';
import '../icon.dart';

/// The one thing on the page worth doing next, on the accent tint: an
/// eyebrow, a title, a sentence and one or two actions. At most one per
/// page.
class LdsSpotlight extends StatelessWidget {
  /// Creates a spotlight.
  const LdsSpotlight({
    super.key,
    required this.title,
    required this.actions,
    this.eyebrow,
    this.eyebrowIcon,
    this.body,
  });

  /// Title 2, at most about 34 characters per line.
  final String title;

  /// Small accent label above the title ("Langkah berikutnya").
  final String? eyebrow;

  /// Icon before the [eyebrow].
  final String? eyebrowIcon;

  /// One or two sentences on why it matters.
  final String? body;

  /// One primary button and at most one secondary.
  final List<Widget> actions;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final narrow = MediaQuery.sizeOf(context).width <= 600;
    return Semantics(
      container: true,
      child: Container(
        padding: EdgeInsets.all(narrow ? LdsSpace.s20 : LdsSpace.s28),
        decoration: BoxDecoration(
          color: c.accentTint,
          borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.xl)),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            if (eyebrow != null) ...[
              Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  if (eyebrowIcon != null) ...[
                    LdsIcon(eyebrowIcon!, size: 16, color: c.accentText),
                    const SizedBox(width: 6),
                  ],
                  Flexible(
                    child: Text(
                      eyebrow!,
                      style: LdsType.caption.copyWith(color: c.accentText),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 6),
            ],
            ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 420),
              child: Semantics(
                header: true,
                child: Text(
                  title,
                  style: LdsType.title2.copyWith(color: c.textStrong),
                ),
              ),
            ),
            if (body != null) ...[
              const SizedBox(height: 6),
              ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 620),
                child: Text(
                  body!,
                  style: LdsType.body.copyWith(color: c.textSubtle),
                ),
              ),
            ],
            const SizedBox(height: 20),
            Wrap(spacing: 10, runSpacing: 10, children: actions),
          ],
        ),
      ),
    );
  }
}
