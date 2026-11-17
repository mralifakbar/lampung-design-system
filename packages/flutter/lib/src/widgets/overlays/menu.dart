import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../../theme.dart';
import '../../tokens.g.dart';
import '../icon.dart';
import '../pressable.dart';

/// One entry of an [LdsMenu]: an [LdsMenuItem], an [LdsMenuLabel] or an
/// [LdsMenuDivider].
@immutable
abstract class LdsMenuEntry {
  /// Const constructor for subclasses.
  const LdsMenuEntry();
}

/// A command in an [LdsMenu].
class LdsMenuItem extends LdsMenuEntry {
  /// Creates a menu command.
  const LdsMenuItem({
    required this.label,
    this.onSelected,
    this.icon,
    this.shortcut,
    this.destructive = false,
    this.checked,
  });

  /// What the command does ("Unduh PDF").
  final String label;

  /// Runs the command. Null disables it.
  final VoidCallback? onSelected;

  /// Optional leading icon (ligature name).
  final String? icon;

  /// Shortcut hint shown muted at the end ("Ctrl+D").
  final String? shortcut;

  /// A destructive command, in danger text. Put it last, after a divider.
  final bool destructive;

  /// For a choice in a group: true shows a check at the end. Null for plain
  /// commands.
  final bool? checked;
}

/// A caption above a group of [LdsMenuItem]s.
class LdsMenuLabel extends LdsMenuEntry {
  /// Creates a group caption.
  const LdsMenuLabel(this.label);

  /// Caption text.
  final String label;
}

/// A hairline between groups of an [LdsMenu].
class LdsMenuDivider extends LdsMenuEntry {
  /// Creates a divider.
  const LdsMenuDivider();
}

/// The floating list of commands used by dropdown menu, context menu and
/// menubar: 220 px minimum, elevated, the only shadow on the page.
///
/// Up and Down move between commands; Enter runs one; Escape closes the
/// layer that holds the menu.
class LdsMenu extends StatelessWidget {
  /// Creates a menu panel.
  const LdsMenu({
    super.key,
    required this.entries,
    this.onClose,
    this.semanticLabel,
    this.autofocusFirst = true,
  });

  /// Commands, captions and dividers.
  final List<LdsMenuEntry> entries;

  /// Called before a selected command runs, to close the holding layer.
  final VoidCallback? onClose;

  /// Names the menu for screen readers.
  final String? semanticLabel;

  /// Focus the first enabled command when the menu appears.
  final bool autofocusFirst;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    var focused = !autofocusFirst;
    final children = <Widget>[];
    for (final e in entries) {
      if (e is LdsMenuItem) {
        final auto = !focused && e.onSelected != null;
        if (auto) focused = true;
        children.add(_MenuRow(item: e, onClose: onClose, autofocus: auto));
      } else if (e is LdsMenuLabel) {
        children.add(Padding(
          padding: const EdgeInsets.fromLTRB(10, 8, 10, 4),
          child: Semantics(
            header: true,
            child: Text(e.label,
                style: LdsType.caption.copyWith(color: c.textMuted)),
          ),
        ));
      } else if (e is LdsMenuDivider) {
        children.add(Padding(
          padding: const EdgeInsets.symmetric(vertical: 5, horizontal: 4),
          child: Container(height: 0.5, color: c.lineStrong),
        ));
      }
    }
    return Semantics(
      container: true,
      explicitChildNodes: true,
      label: semanticLabel,
      child: Shortcuts(
        shortcuts: const <ShortcutActivator, Intent>{
          SingleActivator(LogicalKeyboardKey.arrowDown): NextFocusIntent(),
          SingleActivator(LogicalKeyboardKey.arrowUp): PreviousFocusIntent(),
        },
        child: FocusTraversalGroup(
          child: Container(
            constraints: const BoxConstraints(
                minWidth: 220, maxWidth: 320, maxHeight: 420),
            decoration: BoxDecoration(
              color: c.bgElevated,
              borderRadius: const BorderRadius.all(Radius.circular(14)),
              border: Border.all(color: c.lineStrong, width: 0.5),
              boxShadow: context.ldsShadows.lg,
            ),
            child: Material(
              type: MaterialType.transparency,
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(6),
                child: IntrinsicWidth(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: children,
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _MenuRow extends StatelessWidget {
  const _MenuRow({
    required this.item,
    required this.onClose,
    required this.autofocus,
  });

  final LdsMenuItem item;
  final VoidCallback? onClose;
  final bool autofocus;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    const radius = BorderRadius.all(Radius.circular(9));
    final enabled = item.onSelected != null;
    return LdsPressable(
      onPressed: enabled
          ? () {
              onClose?.call();
              item.onSelected!();
            }
          : null,
      pressedScale: 1,
      borderRadius: radius,
      autofocus: autofocus,
      selected: item.checked,
      semanticLabel: item.label,
      excludeChildSemantics: true,
      builder: (context, state) {
        final fg = item.destructive
            ? c.dangerText
            : (state.focused ? c.accentText : c.textStrong);
        final iconColor = item.destructive
            ? c.dangerText
            : (state.focused ? c.accentText : c.textSubtle);
        final bg = state.focused
            ? c.accentTint
            : (state.hovered || state.pressed
                ? c.bgTintStrong
                : Colors.transparent);
        return Opacity(
          opacity: enabled ? 1 : 0.38,
          child: Container(
            height: 44,
            padding: const EdgeInsets.symmetric(horizontal: 10),
            decoration: BoxDecoration(color: bg, borderRadius: radius),
            child: Row(
              children: [
                if (item.icon != null) ...[
                  LdsIcon(item.icon!, size: 18, color: iconColor),
                  const SizedBox(width: 10),
                ],
                Expanded(
                  child: Text(
                    item.label,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: LdsType.subhead.copyWith(
                      color: fg,
                      fontWeight: item.checked ?? false
                          ? FontWeight.w500
                          : FontWeight.w400,
                    ),
                  ),
                ),
                if (item.shortcut != null) ...[
                  const SizedBox(width: 16),
                  Text(item.shortcut!,
                      style: LdsType.footnote
                          .copyWith(fontSize: 12, color: c.textMuted)),
                ],
                if (item.checked ?? false) ...[
                  const SizedBox(width: 10),
                  LdsIcon('check', size: 18, color: c.accentText),
                ],
              ],
            ),
          ),
        );
      },
    );
  }
}
