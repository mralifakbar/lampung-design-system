import 'package:material_ui/material_ui.dart';

import '../theme.dart';
import '../tokens.g.dart';
import 'icon.dart';

/// A list, table or section loaded and has nothing in it.
///
/// Says why it is empty and offers the one [action] that fills it.
class LdsEmptyState extends StatelessWidget {
  /// Creates an empty state.
  const LdsEmptyState({
    super.key,
    required this.title,
    this.body,
    this.icon = 'inbox',
    this.action,
  });

  /// What is empty, in plain words.
  final String title;

  /// Why, and what to do.
  final String? body;

  /// Glyph in the tile above the title (ligature name).
  final String icon;

  /// The one action that fills this view, usually an [LdsButton].
  final Widget? action;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 32),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: 56,
            height: 56,
            alignment: Alignment.center,
            decoration: BoxDecoration(
              color: c.bgBase,
              borderRadius: const BorderRadius.all(Radius.circular(16)),
              border: Border.all(color: c.line),
            ),
            child: LdsIcon(icon, size: 28, color: c.textSubtle),
          ),
          const SizedBox(height: 16),
          Semantics(
            header: true,
            child: Text(
              title,
              textAlign: TextAlign.center,
              style: LdsType.headline.copyWith(
                fontSize: 16,
                color: c.textStrong,
                letterSpacing: -0.16,
              ),
            ),
          ),
          if (body != null) ...[
            const SizedBox(height: 6),
            ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 280),
              child: Text(
                body!,
                textAlign: TextAlign.center,
                style: LdsType.subhead.copyWith(color: c.textSubtle),
              ),
            ),
          ],
          if (action != null) ...[const SizedBox(height: 18), action!],
        ],
      ),
    );
  }
}
