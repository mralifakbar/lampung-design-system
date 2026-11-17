import 'package:flutter/material.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../icon.dart';
import '../pressable.dart';

/// One step of an [LdsBreadcrumbs] path.
@immutable
class LdsBreadcrumb {
  /// Creates a breadcrumb.
  const LdsBreadcrumb({required this.label, this.onPressed});

  /// The page name.
  final String label;

  /// Opens the page. Ignored on the last crumb, which is the current page.
  final VoidCallback? onPressed;
}

/// The path from a section down to the current page, as links with chevrons
/// between them. The last crumb is the current page and is not a link.
///
/// Wraps onto more lines when narrow.
class LdsBreadcrumbs extends StatelessWidget {
  /// Creates breadcrumbs.
  const LdsBreadcrumbs({
    super.key,
    required this.items,
    this.semanticLabel = 'Jejak navigasi',
  });

  /// The path, from the top section to the current page.
  final List<LdsBreadcrumb> items;

  /// Names the trail for screen readers.
  final String semanticLabel;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final children = <Widget>[];
    for (var i = 0; i < items.length; i++) {
      final item = items[i];
      final last = i == items.length - 1;
      if (i > 0) {
        children.add(LdsIcon('chevron_right', size: 14, color: c.textFaint));
      }
      if (last) {
        children.add(Semantics(
          label: '${item.label}, halaman ini',
          excludeSemantics: true,
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 6),
            child: Text(
              item.label,
              style: LdsType.subhead
                  .copyWith(color: c.textStrong, fontWeight: FontWeight.w500),
            ),
          ),
        ));
      } else {
        children.add(LdsPressable(
          onPressed: item.onPressed,
          pressedScale: 1,
          borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.xs)),
          semanticLabel: item.label,
          excludeChildSemantics: true,
          builder: (context, state) => AnimatedContainer(
            duration: context.ldsDuration(LdsMotion.fast),
            padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
            decoration: BoxDecoration(
              color: state.hovered || state.pressed
                  ? c.bgTint
                  : Colors.transparent,
              borderRadius:
                  const BorderRadius.all(Radius.circular(LdsRadius.xs)),
            ),
            child: Text(
              item.label,
              style: LdsType.subhead.copyWith(
                color: state.hovered || state.pressed
                    ? c.textStrong
                    : c.textSubtle,
              ),
            ),
          ),
        ));
      }
    }
    return Semantics(
      container: true,
      label: semanticLabel,
      explicitChildNodes: true,
      child: Wrap(
        crossAxisAlignment: WrapCrossAlignment.center,
        children: children,
      ),
    );
  }
}
