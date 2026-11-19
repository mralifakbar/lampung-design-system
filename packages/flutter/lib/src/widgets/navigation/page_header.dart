import 'package:material_ui/material_ui.dart';

import '../../theme.dart';
import '../../tokens.g.dart';
import 'breadcrumbs.dart';

/// The top of a page: breadcrumbs, the title with one line of context, and
/// the page actions on the same baseline.
///
/// Actions are one primary and one or two secondary buttons, usually
/// `LdsButtonSize.md`. The title row wraps when narrow.
class LdsPageHeader extends StatelessWidget {
  /// Creates a page header.
  const LdsPageHeader({
    super.key,
    required this.title,
    this.subtitle,
    this.breadcrumbs,
    this.actions = const <Widget>[],
  });

  /// The page title.
  final String title;

  /// One line of context: code, schedule, owner.
  final String? subtitle;

  /// Optional path above the title, ending with this page.
  final List<LdsBreadcrumb>? breadcrumbs;

  /// Page actions, spaced 8 px apart.
  final List<Widget> actions;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final titleBlock = Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        Semantics(
          header: true,
          child: Text(
            title,
            style: LdsType.title1.copyWith(color: c.textStrong),
          ),
        ),
        if (subtitle != null) ...[
          const SizedBox(height: 6),
          Text(subtitle!, style: LdsType.subhead.copyWith(color: c.textSubtle)),
        ],
      ],
    );
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      mainAxisSize: MainAxisSize.min,
      children: [
        if (breadcrumbs != null && breadcrumbs!.isNotEmpty) ...[
          Align(
            alignment: AlignmentDirectional.centerStart,
            child: LdsBreadcrumbs(items: breadcrumbs!),
          ),
          // The crumbs' 44 px hit area already adds most of the 14 px gap.
          const SizedBox(height: 2),
        ],
        Wrap(
          alignment: WrapAlignment.spaceBetween,
          crossAxisAlignment: WrapCrossAlignment.end,
          spacing: 16,
          runSpacing: 12,
          children: [
            titleBlock,
            if (actions.isNotEmpty)
              Wrap(spacing: 8, runSpacing: 8, children: actions),
          ],
        ),
      ],
    );
  }
}
