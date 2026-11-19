import 'dart:math' as math;

import 'package:flutter/foundation.dart';
import 'package:flutter/services.dart';
import 'package:material_ui/material_ui.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../icon.dart';
import '../pressable.dart';

/// One card on an [LdsKanban].
@immutable
class LdsKanbanCard {
  /// Creates a card.
  const LdsKanbanCard({
    required this.id,
    required this.title,
    this.body,
    this.badges = const <Widget>[],
    this.foot,
  });

  /// Stable identity.
  final String id;

  /// What the work is.
  final String title;

  /// Two lines of detail.
  final String? body;

  /// [LdsBadge]s above the title.
  final List<Widget> badges;

  /// Due date, counts and an avatar along the bottom.
  final Widget? foot;
}

/// One stage of an [LdsKanban].
@immutable
class LdsKanbanColumn {
  /// Creates a stage.
  const LdsKanbanColumn({
    required this.id,
    required this.title,
    required this.cards,
    this.limit,
  });

  /// Stable identity.
  final String id;

  /// Stage name: "Masuk", "Diverifikasi", "Selesai".
  final String title;

  /// Cards, top to bottom.
  final List<LdsKanbanCard> cards;

  /// Past this many cards the count turns to warning.
  final int? limit;
}

/// A board of stages people move work through: citizen reports from
/// "Masuk" to "Selesai".
///
/// The board is controlled: it calls [onMove] and you move the card in
/// [columns]. Cards are dragged with a pointer (a long press on touch
/// screens) or moved by keyboard: Space picks a card up, the arrow keys
/// move it, Space drops it and Escape puts it back.
class LdsKanban extends StatefulWidget {
  /// Creates a board.
  const LdsKanban({
    super.key,
    required this.columns,
    required this.onMove,
    this.onAdd,
    this.onCardTap,
    this.columnWidth = 280,
    this.semanticLabel = 'Papan kerja',
    this.emptyLabel = 'Letakkan kartu di sini',
    this.addLabel = 'Tambah kartu',
    this.keyHint =
        'Tekan spasi untuk mengangkat, panah untuk memindahkan, spasi untuk '
        'meletakkan, Escape untuk batal.',
  });

  /// The stages, left to right.
  final List<LdsKanbanColumn> columns;

  /// Called with the card, the target stage and the index in it.
  final void Function(String cardId, String columnId, int index) onMove;

  /// Shows an add button under each stage.
  final ValueChanged<String>? onAdd;

  /// Opens a card.
  final ValueChanged<String>? onCardTap;

  /// Width of a stage.
  final double columnWidth;

  /// Names the board.
  final String semanticLabel;

  /// Placeholder in an empty stage.
  final String emptyLabel;

  /// Label of the add button.
  final String addLabel;

  /// How to move a card by keyboard; read with each card.
  final String keyHint;

  @override
  State<LdsKanban> createState() => _LdsKanbanState();
}

class _LdsKanbanState extends State<LdsKanban> {
  final Map<String, FocusNode> _nodes = <String, FocusNode>{};
  String? _grabbed;
  (String, int)? _origin;
  String? _overColumn;
  int? _overIndex;
  String? _dragging;

  FocusNode _node(String id) =>
      _nodes.putIfAbsent(id, () => FocusNode(debugLabel: 'kanban $id'));

  @override
  void dispose() {
    for (final n in _nodes.values) {
      n.dispose();
    }
    super.dispose();
  }

  (int, int)? _find(String id) {
    for (var c = 0; c < widget.columns.length; c++) {
      final i = widget.columns[c].cards.indexWhere((k) => k.id == id);
      if (i >= 0) return (c, i);
    }
    return null;
  }

  void _move(String id, int col, int index) {
    widget.onMove(id, widget.columns[col].id, index);
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted) _nodes[id]?.requestFocus();
    });
  }

  KeyEventResult _onKey(String id, KeyEvent e) {
    if (e is! KeyDownEvent && e is! KeyRepeatEvent) {
      return KeyEventResult.ignored;
    }
    final key = e.logicalKey;
    final at = _find(id);
    if (at == null) return KeyEventResult.ignored;
    final (col, idx) = at;
    if (key == LogicalKeyboardKey.space) {
      setState(() {
        if (_grabbed == id) {
          _grabbed = null;
          _origin = null;
        } else {
          _grabbed = id;
          _origin = (widget.columns[col].id, idx);
        }
      });
      return KeyEventResult.handled;
    }
    if (key == LogicalKeyboardKey.enter && _grabbed != id) {
      widget.onCardTap?.call(id);
      return KeyEventResult.handled;
    }
    if (_grabbed != id) return KeyEventResult.ignored;
    if (key == LogicalKeyboardKey.escape) {
      final o = _origin!;
      final oc = widget.columns.indexWhere((c) => c.id == o.$1);
      setState(() {
        _grabbed = null;
        _origin = null;
      });
      if (oc >= 0) _move(id, oc, o.$2);
      return KeyEventResult.handled;
    }
    if (key == LogicalKeyboardKey.arrowRight &&
        col < widget.columns.length - 1) {
      _move(id, col + 1, math.min(idx, widget.columns[col + 1].cards.length));
      return KeyEventResult.handled;
    }
    if (key == LogicalKeyboardKey.arrowLeft && col > 0) {
      _move(id, col - 1, math.min(idx, widget.columns[col - 1].cards.length));
      return KeyEventResult.handled;
    }
    if (key == LogicalKeyboardKey.arrowUp && idx > 0) {
      _move(id, col, idx - 1);
      return KeyEventResult.handled;
    }
    if (key == LogicalKeyboardKey.arrowDown &&
        idx < widget.columns[col].cards.length - 1) {
      _move(id, col, idx + 1);
      return KeyEventResult.handled;
    }
    return KeyEventResult.ignored;
  }

  void _drop(String id, int col, int index) {
    final at = _find(id);
    var target = index;
    // Dropping below its own slot in the same stage shifts by one.
    if (at != null && at.$1 == col && at.$2 < index) target -= 1;
    setState(() {
      _overColumn = null;
      _overIndex = null;
      _dragging = null;
    });
    widget.onMove(id, widget.columns[col].id, target);
  }

  @override
  Widget build(BuildContext context) {
    return Semantics(
      label: widget.semanticLabel,
      container: true,
      explicitChildNodes: true,
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            for (var c = 0; c < widget.columns.length; c++) ...[
              if (c > 0) const SizedBox(width: 12),
              SizedBox(width: widget.columnWidth, child: _column(context, c)),
            ],
          ],
        ),
      ),
    );
  }

  Widget _column(BuildContext context, int c) {
    final colors = context.lds;
    final col = widget.columns[c];
    final over = col.limit != null && col.cards.length > col.limit!;
    final children = <Widget>[];
    for (var i = 0; i < col.cards.length; i++) {
      if (_overColumn == col.id && _overIndex == i) {
        children.add(_ghost(context));
      }
      children.add(_target(c, i, _card(context, c, col.cards[i])));
    }
    if (_overColumn == col.id && _overIndex == col.cards.length) {
      children.add(_ghost(context));
    }
    if (col.cards.isEmpty && _overColumn != col.id) {
      children.add(
        Container(
          height: 64,
          alignment: Alignment.center,
          decoration: BoxDecoration(
            borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.md)),
            border: Border.all(color: colors.lineStrong),
          ),
          child: Text(
            widget.emptyLabel,
            style: LdsType.footnote.copyWith(color: colors.textMuted),
          ),
        ),
      );
    }

    return DragTarget<String>(
      onWillAcceptWithDetails: (_) => true,
      onMove: (_) {
        if (_overColumn != col.id || _overIndex == null) {
          setState(() {
            _overColumn = col.id;
            _overIndex ??= col.cards.length;
          });
        }
      },
      onLeave: (_) => setState(() {
        if (_overColumn == col.id) {
          _overColumn = null;
          _overIndex = null;
        }
      }),
      onAcceptWithDetails: (d) =>
          _drop(d.data, c, _overIndex ?? col.cards.length),
      builder: (context, candidates, _) => AnimatedContainer(
        duration: context.ldsDuration(LdsMotion.fast),
        padding: const EdgeInsets.all(6),
        decoration: BoxDecoration(
          color: candidates.isNotEmpty ? colors.accentTint : colors.bgFill,
          borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.lg)),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          mainAxisSize: MainAxisSize.min,
          children: [
            Padding(
              padding: const EdgeInsets.fromLTRB(8, 6, 8, 6),
              child: Row(
                children: [
                  Expanded(
                    child: Semantics(
                      header: true,
                      child: Text(
                        col.title,
                        style: LdsType.subhead.copyWith(
                          color: colors.textStrong,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                  ),
                  Semantics(
                    label: col.limit == null
                        ? '${col.cards.length} kartu'
                        : '${col.cards.length} dari batas ${col.limit} kartu',
                    excludeSemantics: true,
                    child: Text(
                      col.limit == null
                          ? '${col.cards.length}'
                          : '${col.cards.length}/${col.limit}',
                      style: LdsType.footnote.copyWith(
                        color: over ? colors.warningText : colors.textMuted,
                        fontWeight: over ? FontWeight.w600 : null,
                        fontFeatures: const [FontFeature.tabularFigures()],
                      ),
                    ),
                  ),
                ],
              ),
            ),
            for (var i = 0; i < children.length; i++) ...[
              if (i > 0) const SizedBox(height: 6),
              children[i],
            ],
            if (widget.onAdd != null) ...[
              const SizedBox(height: 2),
              LdsPressable(
                onPressed: () => widget.onAdd!(col.id),
                pressedScale: 0.985,
                builder: (context, state) => Container(
                  height: 40,
                  padding: const EdgeInsets.symmetric(horizontal: 8),
                  decoration: BoxDecoration(
                    color: state.hovered || state.pressed
                        ? colors.bgTint
                        : Colors.transparent,
                    borderRadius: const BorderRadius.all(
                      Radius.circular(LdsRadius.sm),
                    ),
                  ),
                  child: Row(
                    children: [
                      LdsIcon('add', size: 18, color: colors.textSubtle),
                      const SizedBox(width: 6),
                      Text(
                        widget.addLabel,
                        style: LdsType.subhead.copyWith(
                          color: colors.textSubtle,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }

  Widget _target(int c, int index, Widget child) {
    final col = widget.columns[c];
    return DragTarget<String>(
      onWillAcceptWithDetails: (_) => true,
      onMove: (d) {
        if (_overColumn != col.id || _overIndex != index) {
          setState(() {
            _overColumn = col.id;
            _overIndex = index;
          });
        }
      },
      onAcceptWithDetails: (d) => _drop(d.data, c, index),
      builder: (context, _, _) => child,
    );
  }

  Widget _ghost(BuildContext context) {
    final c = context.lds;
    return Container(
      height: 56,
      decoration: BoxDecoration(
        color: c.accentTint,
        borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.md)),
        border: Border.all(color: c.accent, width: 1.5),
      ),
    );
  }

  Widget _card(BuildContext context, int c, LdsKanbanCard card) {
    final colors = context.lds;
    final reduce = context.ldsReduceMotion;
    final grabbed = _grabbed == card.id;
    final column = widget.columns[c];

    Widget face({bool lifted = false}) => AnimatedContainer(
      duration: context.ldsDuration(LdsMotion.fast),
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
      decoration: BoxDecoration(
        color: colors.bgBase,
        borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.md)),
        border: Border.all(
          color: grabbed ? colors.accent : colors.line,
          width: grabbed ? 2 : 1,
        ),
        boxShadow: lifted ? context.ldsShadows.lg : null,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          if (card.badges.isNotEmpty) ...[
            Wrap(spacing: 6, runSpacing: 6, children: card.badges),
            const SizedBox(height: 10),
          ],
          Text(
            card.title,
            style: TextStyle(
              fontFamily: LdsType.family,
              fontSize: 14,
              height: 20 / 14,
              fontWeight: FontWeight.w500,
              color: colors.textStrong,
            ),
          ),
          if (card.body != null) ...[
            const SizedBox(height: 4),
            Text(
              card.body!,
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
              style: LdsType.footnote.copyWith(color: colors.textSubtle),
            ),
          ],
          if (card.foot != null) ...[const SizedBox(height: 10), card.foot!],
        ],
      ),
    );

    final focusable = Focus(
      focusNode: _node(card.id),
      onKeyEvent: (_, e) => _onKey(card.id, e),
      onFocusChange: (has) {
        if (!has && _grabbed == card.id) setState(() => _grabbed = null);
      },
      child: Semantics(
        label: '${card.title}, ${column.title}. ${widget.keyHint}',
        button: widget.onCardTap != null,
        onTap: widget.onCardTap == null
            ? null
            : () => widget.onCardTap!(card.id),
        excludeSemantics: true,
        child: Builder(
          builder: (context) {
            final focused = Focus.of(context).hasPrimaryFocus;
            return GestureDetector(
              onTap: widget.onCardTap == null
                  ? null
                  : () => widget.onCardTap!(card.id),
              child: AnimatedScale(
                scale: grabbed && !reduce ? 1.02 : 1,
                duration: context.ldsDuration(LdsMotion.snappy),
                curve: LdsSpringCurve.snappy,
                child: DecoratedBox(
                  position: DecorationPosition.foreground,
                  decoration: BoxDecoration(
                    borderRadius: const BorderRadius.all(
                      Radius.circular(LdsRadius.md + 3),
                    ),
                    border: focused && !grabbed
                        ? Border.all(color: colors.focus, width: 2)
                        : null,
                  ),
                  child: face(),
                ),
              ),
            );
          },
        ),
      ),
    );

    final feedback = SizedBox(
      width: widget.columnWidth - 12,
      child: Material(
        type: MaterialType.transparency,
        child: Transform.rotate(
          angle: reduce ? 0 : 1.5 * math.pi / 180,
          child: Transform.scale(
            scale: reduce ? 1 : 1.03,
            child: face(lifted: true),
          ),
        ),
      ),
    );
    final hidden = Opacity(opacity: 0.35, child: face());
    final touch =
        defaultTargetPlatform == TargetPlatform.android ||
        defaultTargetPlatform == TargetPlatform.iOS;
    void start() => setState(() => _dragging = card.id);
    void end() => setState(() {
      _dragging = null;
      _overColumn = null;
      _overIndex = null;
    });
    final child = _dragging == card.id ? hidden : focusable;
    if (touch) {
      return LongPressDraggable<String>(
        data: card.id,
        feedback: feedback,
        childWhenDragging: hidden,
        onDragStarted: start,
        onDragEnd: (_) => end(),
        child: child,
      );
    }
    return Draggable<String>(
      data: card.id,
      feedback: feedback,
      childWhenDragging: hidden,
      onDragStarted: start,
      onDragEnd: (_) => end(),
      child: child,
    );
  }
}
