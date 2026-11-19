import 'package:flutter/services.dart';
import 'package:material_ui/material_ui.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../icon.dart';
import 'layer_route.dart';

/// A command or destination in an [LdsCommandPalette].
@immutable
class LdsCommand {
  /// Creates a command.
  const LdsCommand({
    required this.label,
    required this.onRun,
    this.icon,
    this.shortcut,
    this.group,
    this.keywords = const <String>[],
  });

  /// What it does or where it goes ("Buat laporan baru").
  final String label;

  /// Runs the command after the palette closes.
  final VoidCallback onRun;

  /// Optional icon.
  final String? icon;

  /// Shortcut hint ("Ctrl+N").
  final String? shortcut;

  /// Group caption ("Tindakan", "Halaman").
  final String? group;

  /// Extra words that match this command.
  final List<String> keywords;

  /// Whether [query] matches the label or a keyword.
  bool matches(String query) {
    final q = query.trim().toLowerCase();
    if (q.isEmpty) return true;
    return label.toLowerCase().contains(q) ||
        keywords.any((k) => k.toLowerCase().contains(q));
  }
}

/// A search box that finds and runs any command or destination by typing.
/// A fast path for people who know what they want; never the only path.
///
/// Up and Down move the highlight, Enter runs it, Escape closes. Results
/// swap instantly as you type. Show it with [showLdsCommandPalette].
class LdsCommandPalette extends StatefulWidget {
  /// Creates a command palette panel.
  const LdsCommandPalette({
    super.key,
    required this.commands,
    required this.onSelected,
    this.placeholder = 'Search commands',
    this.emptyLabel = 'No results',
    this.moveHint = 'move',
    this.runHint = 'run',
    this.closeHint = 'close',
    this.width = 520,
  });

  /// Every command.
  final List<LdsCommand> commands;

  /// Called with the chosen command.
  final ValueChanged<LdsCommand> onSelected;

  /// Placeholder of the search field.
  final String placeholder;

  /// Shown when nothing matches.
  final String emptyLabel;

  /// Footer hint after the arrow keys.
  final String moveHint;

  /// Footer hint after Enter.
  final String runHint;

  /// Footer hint after Esc.
  final String closeHint;

  /// Maximum width.
  final double width;

  @override
  State<LdsCommandPalette> createState() => _LdsCommandPaletteState();
}

class _LdsCommandPaletteState extends State<LdsCommandPalette> {
  final TextEditingController _query = TextEditingController();
  final ScrollController _scroll = ScrollController();
  int _active = 0;

  List<LdsCommand> get _results =>
      widget.commands.where((c) => c.matches(_query.text)).toList();

  @override
  void dispose() {
    _query.dispose();
    _scroll.dispose();
    super.dispose();
  }

  void _move(int by) {
    final n = _results.length;
    if (n == 0) return;
    setState(
      () => _active = (_active + by) % n < 0
          ? (_active + by) % n + n
          : (_active + by) % n,
    );
    const row = 44.0;
    final top = _active * row;
    if (_scroll.hasClients) {
      final pos = _scroll.position;
      if (top < pos.pixels) {
        _scroll.jumpTo(top);
      } else if (top + row > pos.pixels + pos.viewportDimension) {
        _scroll.jumpTo(top + row - pos.viewportDimension);
      }
    }
  }

  void _run() {
    final r = _results;
    if (r.isEmpty) return;
    widget.onSelected(r[_active.clamp(0, r.length - 1)]);
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final results = _results;
    final muted = LdsType.footnote.copyWith(fontSize: 12, color: c.textMuted);
    Widget kbd(String k) => Container(
      margin: const EdgeInsetsDirectional.only(end: 4),
      padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 1),
      decoration: BoxDecoration(
        color: c.bgBase,
        borderRadius: const BorderRadius.all(Radius.circular(5)),
        border: Border.all(color: c.lineStrong),
      ),
      child: Text(k, style: muted.copyWith(fontSize: 11)),
    );

    final rows = <Widget>[];
    String? group;
    for (var i = 0; i < results.length; i++) {
      final cmd = results[i];
      if (cmd.group != null && cmd.group != group) {
        group = cmd.group;
        rows.add(
          Padding(
            padding: const EdgeInsets.fromLTRB(12, 10, 12, 4),
            child: Semantics(
              header: true,
              child: Text(
                group!,
                style: LdsType.caption.copyWith(color: c.textMuted),
              ),
            ),
          ),
        );
      }
      rows.add(
        _Row(
          command: cmd,
          active: i == _active,
          onHover: () => setState(() => _active = i),
          onTap: () => widget.onSelected(cmd),
        ),
      );
    }

    return ConstrainedBox(
      constraints: BoxConstraints(maxWidth: widget.width),
      child: Material(
        type: MaterialType.transparency,
        child: Container(
          clipBehavior: Clip.antiAlias,
          decoration: BoxDecoration(
            color: c.bgElevated,
            borderRadius: const BorderRadius.all(Radius.circular(18)),
            border: Border.all(color: c.lineStrong, width: 0.5),
            boxShadow: context.ldsShadows.lg,
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              SizedBox(
                height: 54,
                child: Row(
                  children: [
                    const SizedBox(width: 16),
                    LdsIcon('search', color: c.textMuted),
                    const SizedBox(width: 10),
                    Expanded(
                      child: CallbackShortcuts(
                        bindings: <ShortcutActivator, VoidCallback>{
                          const SingleActivator(
                            LogicalKeyboardKey.arrowDown,
                          ): () =>
                              _move(1),
                          const SingleActivator(
                            LogicalKeyboardKey.arrowUp,
                          ): () =>
                              _move(-1),
                        },
                        child: TextField(
                          controller: _query,
                          autofocus: true,
                          textInputAction: TextInputAction.go,
                          style: LdsType.body.copyWith(
                            fontSize: 16,
                            color: c.textStrong,
                          ),
                          cursorColor: c.accent,
                          decoration: InputDecoration.collapsed(
                            hintText: widget.placeholder,
                            hintStyle: LdsType.body.copyWith(
                              fontSize: 16,
                              color: c.textMuted,
                            ),
                          ).copyWith(filled: false),
                          onChanged: (_) => setState(() => _active = 0),
                          onSubmitted: (_) => _run(),
                        ),
                      ),
                    ),
                    const SizedBox(width: 16),
                  ],
                ),
              ),
              Container(height: 0.5, color: c.hairline),
              Flexible(
                child: ConstrainedBox(
                  constraints: const BoxConstraints(maxHeight: 300),
                  child: results.isEmpty
                      ? Padding(
                          padding: const EdgeInsets.all(LdsSpace.s24),
                          child: Semantics(
                            liveRegion: true,
                            child: Text(
                              widget.emptyLabel,
                              textAlign: TextAlign.center,
                              style: LdsType.subhead.copyWith(
                                color: c.textSubtle,
                              ),
                            ),
                          ),
                        )
                      : ListView(
                          controller: _scroll,
                          shrinkWrap: true,
                          padding: const EdgeInsets.all(6),
                          children: rows,
                        ),
                ),
              ),
              Container(
                height: 40,
                padding: const EdgeInsets.symmetric(horizontal: 16),
                decoration: BoxDecoration(
                  color: c.bgFill,
                  border: Border(top: BorderSide(color: c.hairline)),
                ),
                child: ExcludeSemantics(
                  child: Row(
                    children: [
                      kbd('↑'),
                      kbd('↓'),
                      Text(widget.moveHint, style: muted),
                      const SizedBox(width: 16),
                      kbd('Enter'),
                      Text(widget.runHint, style: muted),
                      const SizedBox(width: 16),
                      kbd('Esc'),
                      Text(widget.closeHint, style: muted),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _Row extends StatelessWidget {
  const _Row({
    required this.command,
    required this.active,
    required this.onHover,
    required this.onTap,
  });

  final LdsCommand command;
  final bool active;
  final VoidCallback onHover;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final fg = active ? c.accentText : c.textStrong;
    return Semantics(
      button: true,
      selected: active,
      label: command.label,
      excludeSemantics: true,
      onTap: onTap,
      child: MouseRegion(
        cursor: SystemMouseCursors.click,
        onHover: (_) {
          if (!active) onHover();
        },
        child: GestureDetector(
          onTap: onTap,
          child: Container(
            height: 44,
            padding: const EdgeInsets.symmetric(horizontal: 12),
            decoration: BoxDecoration(
              color: active ? c.accentTint : Colors.transparent,
              borderRadius: const BorderRadius.all(Radius.circular(10)),
            ),
            child: Row(
              children: [
                if (command.icon != null) ...[
                  LdsIcon(
                    command.icon!,
                    color: active ? c.accentText : c.textSubtle,
                  ),
                  const SizedBox(width: 12),
                ],
                Expanded(
                  child: Text(
                    command.label,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: LdsType.subhead.copyWith(fontSize: 14.5, color: fg),
                  ),
                ),
                if (command.shortcut != null)
                  Text(
                    command.shortcut!,
                    style: LdsType.footnote.copyWith(
                      fontSize: 12,
                      color: c.textMuted,
                    ),
                  ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

/// Shows the command palette 48 px from the top, over a scrim. Choosing a
/// command closes the palette, then runs it; the future completes with the
/// command, or null when dismissed.
Future<LdsCommand?> showLdsCommandPalette({
  required BuildContext context,
  required List<LdsCommand> commands,
  String placeholder = 'Search commands',
  String emptyLabel = 'No results',
  String dismissLabel = 'Close',
  bool useRootNavigator = true,
}) async {
  final cmd = await Navigator.of(context, rootNavigator: useRootNavigator)
      .push<LdsCommand>(
        LdsLayerRoute<LdsCommand>(
          scrimColor: context.lds.bgScrim,
          motion: LdsLayerMotion.drop,
          dismissLabel: dismissLabel,
          reduceMotion: context.ldsReduceMotion,
          builder: (context) => SafeArea(
            child: Align(
              alignment: Alignment.topCenter,
              child: Padding(
                padding: const EdgeInsets.fromLTRB(16, 48, 16, 16),
                child: LdsCommandPalette(
                  commands: commands,
                  placeholder: placeholder,
                  emptyLabel: emptyLabel,
                  onSelected: (c) => Navigator.of(context).pop(c),
                ),
              ),
            ),
          ),
        ),
      );
  cmd?.onRun();
  return cmd;
}
