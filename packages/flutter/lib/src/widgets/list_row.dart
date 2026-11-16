import 'package:flutter/material.dart';

import '../theme.dart';
import '../tokens.g.dart';
import 'icon.dart';
import 'pressable.dart';

/// One row of a grouped list: an optional icon chip, a title, a subtitle and
/// a trailing value, widget or chevron.
///
/// Put rows in an [LdsList], which draws the fill and the separators.
class LdsListRow extends StatelessWidget {
  /// Creates a row.
  const LdsListRow({
    super.key,
    required this.title,
    this.subtitle,
    this.icon,
    this.iconColor,
    this.value,
    this.trailing,
    this.showChevron,
    this.onTap,
    this.selected = false,
    this.semanticLabel,
  });

  /// Main text.
  final String title;

  /// Secondary text under the title.
  final String? subtitle;

  /// Icon chip glyph (ligature name, drawn from the filled set).
  final String? icon;

  /// Icon chip color. Defaults to the accent; the `tile*` colors of
  /// [LdsColors] are made for chips and hold white text at AA.
  final Color? iconColor;

  /// Trailing value text, for example "Aktif" or "3".
  final String? value;

  /// Trailing widget, for example a [Switch] or an [LdsBadge].
  final Widget? trailing;

  /// Show a chevron. Defaults to true when [onTap] is set and there is no
  /// [trailing] widget.
  final bool? showChevron;

  /// Makes the row pressable.
  final VoidCallback? onTap;

  /// Marks the row as the current one.
  final bool selected;

  /// Overrides the label read by screen readers.
  final String? semanticLabel;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final chevron = showChevron ?? (onTap != null && trailing == null);

    Widget content(bool active) {
      return Container(
        constraints: const BoxConstraints(minHeight: 48),
        color: selected
            ? c.accentTint
            : active
                ? c.bgTintStrong
                : Colors.transparent,
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        child: Row(
          children: [
            if (icon != null) ...[
              Container(
                width: 30,
                height: 30,
                alignment: Alignment.center,
                decoration: BoxDecoration(
                  color: iconColor ?? c.accent,
                  borderRadius:
                      const BorderRadius.all(Radius.circular(LdsRadius.sm)),
                ),
                child: LdsIcon(icon!, size: 19, fill: true, color: Colors.white),
              ),
              const SizedBox(width: 12),
            ],
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    title,
                    style: LdsType.body.copyWith(
                      color: selected ? c.accentText : c.textStrong,
                      fontWeight: selected ? FontWeight.w500 : null,
                      height: 20 / 15,
                    ),
                  ),
                  if (subtitle != null)
                    Padding(
                      padding: const EdgeInsets.only(top: 1),
                      child: Text(
                        subtitle!,
                        style: LdsType.footnote.copyWith(color: c.textSubtle),
                      ),
                    ),
                ],
              ),
            ),
            if (value != null) ...[
              const SizedBox(width: 12),
              Text(value!, style: LdsType.body.copyWith(color: c.textSubtle)),
            ],
            if (trailing != null) ...[
              const SizedBox(width: 12),
              trailing!,
            ],
            if (chevron) ...[
              const SizedBox(width: 6),
              LdsIcon('chevron_right', color: c.textFaint),
            ],
          ],
        ),
      );
    }

    if (onTap == null) {
      return MergeSemantics(
        child: Semantics(
          label: semanticLabel,
          selected: selected ? true : null,
          child: content(false),
        ),
      );
    }
    return LdsPressable(
      onPressed: onTap,
      pressedScale: 1,
      borderRadius: BorderRadius.zero,
      semanticLabel: semanticLabel,
      selected: selected ? true : null,
      builder: (context, state) => content(state.pressed || state.hovered),
    );
  }
}

/// A grouped list on the quiet fill, with hairline separators inset to the
/// text.
class LdsList extends StatelessWidget {
  /// Creates a grouped list.
  const LdsList({
    super.key,
    required this.children,
    this.header,
    this.footer,
    this.outlined = false,
  });

  /// Rows, usually [LdsListRow]s.
  final List<Widget> children;

  /// Small label above the group.
  final String? header;

  /// Note under the group.
  final String? footer;

  /// Draw on the base surface with a line instead of the fill.
  final bool outlined;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final rows = <Widget>[];
    for (var i = 0; i < children.length; i++) {
      final child = children[i];
      if (i > 0) {
        final inset =
            child is LdsListRow && child.icon != null ? 58.0 : 16.0;
        rows.add(Padding(
          padding: EdgeInsetsDirectional.only(start: inset),
          child: Container(height: 0.5, color: c.lineStrong),
        ));
      }
      rows.add(child);
    }
    final note = LdsType.footnote.copyWith(color: c.textSubtle);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      mainAxisSize: MainAxisSize.min,
      children: [
        if (header != null)
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 0, 16, 7),
            child: Semantics(header: true, child: Text(header!, style: note)),
          ),
        ClipRRect(
          borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.lg)),
          child: DecoratedBox(
            decoration: BoxDecoration(
              color: outlined ? c.bgBase : c.bgFill,
              borderRadius:
                  const BorderRadius.all(Radius.circular(LdsRadius.lg)),
              border: outlined ? Border.all(color: c.line) : null,
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              mainAxisSize: MainAxisSize.min,
              children: rows,
            ),
          ),
        ),
        if (footer != null)
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 7, 16, 0),
            child: Text(footer!, style: note),
          ),
      ],
    );
  }
}
