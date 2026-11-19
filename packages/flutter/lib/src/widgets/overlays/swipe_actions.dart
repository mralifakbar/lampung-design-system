import 'dart:async';
import 'dart:math' as math;

import 'package:flutter/semantics.dart';
import 'package:flutter/services.dart';
import 'package:material_ui/material_ui.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../icon.dart';
import '../pressable.dart';

/// Color of an [LdsSwipeAction].
enum LdsSwipeActionTone {
  /// A neutral action (Arsipkan).
  gray,

  /// A positive action (Tandai selesai).
  accent,

  /// A destructive action (Hapus). Put it last.
  danger,
}

/// An action behind an [LdsSwipeActions] row.
@immutable
class LdsSwipeAction {
  /// Creates a swipe action.
  const LdsSwipeAction({
    required this.label,
    required this.icon,
    required this.onPressed,
    this.tone = LdsSwipeActionTone.gray,
  });

  /// Short label under the icon.
  final String label;

  /// Filled icon.
  final String icon;

  /// Runs the action.
  final VoidCallback onPressed;

  /// Color.
  final LdsSwipeActionTone tone;
}

/// Swipe a list row left to reveal its actions; swipe far or flick to run
/// the last one, and the row slides out and closes its space.
///
/// The row follows the finger exactly. Left arrow opens the actions, Right
/// arrow or Escape closes them; screen readers get each action as a custom
/// action. Offer the same actions somewhere visible too.
class LdsSwipeActions extends StatefulWidget {
  /// Creates a swipeable row.
  const LdsSwipeActions({
    super.key,
    required this.child,
    required this.actions,
    this.commitLast = true,
  });

  /// The visible row, usually an `LdsListRow`.
  final Widget child;

  /// Actions, in order; each is 76 px wide.
  final List<LdsSwipeAction> actions;

  /// A long swipe or a flick runs the last action and removes the row
  /// (the last action's callback runs after the row has closed its space;
  /// remove the item from your data there).
  final bool commitLast;

  @override
  State<LdsSwipeActions> createState() => _LdsSwipeActionsState();
}

class _LdsSwipeActionsState extends State<LdsSwipeActions>
    with TickerProviderStateMixin {
  late final AnimationController _dx = AnimationController.unbounded(
    vsync: this,
  );
  late final AnimationController _size = AnimationController(
    vsync: this,
    value: 1,
  );
  double _width = 0;
  bool _gone = false;

  static const double _actionWidth = 76;
  double get _actionsWidth => widget.actions.length * _actionWidth;
  bool get _open => _dx.value < -1;

  @override
  void dispose() {
    _dx.dispose();
    _size.dispose();
    super.dispose();
  }

  Duration _d(Duration d) => context.ldsReduceMotion ? LdsMotion.instant : d;

  void _settle(double to) {
    unawaited(
      _dx.animateTo(
        to,
        duration: _d(LdsMotion.smooth),
        curve: LdsSpringCurve.smooth,
      ),
    );
    setState(() {});
  }

  void _openRow() => _settle(-_actionsWidth);
  void _close() => _settle(0);

  Future<void> _commit() async {
    if (_gone || widget.actions.isEmpty) return;
    _gone = true;
    unawaited(HapticFeedback.mediumImpact());
    await _dx.animateTo(
      -_width,
      duration: _d(LdsMotion.standard),
      curve: LdsMotion.inoutCurve,
    );
    if (!mounted) return;
    await _size.animateTo(
      0,
      duration: _d(LdsMotion.smooth),
      curve: LdsSpringCurve.smooth,
    );
    widget.actions.last.onPressed();
  }

  void _onUpdate(DragUpdateDetails d) {
    var next = _dx.value + (d.primaryDelta ?? 0);
    if (next > 0) {
      // Rubber band past the resting edge.
      final over = next;
      next = over * 40 * 0.55 / (40 + 0.55 * over);
    }
    _dx.value = math.max(next, -_width);
  }

  void _onEnd(DragEndDetails d) {
    final v = d.primaryVelocity ?? 0;
    final x = -_dx.value;
    final projected = x - v * 0.1;
    if (widget.commitLast &&
        (x > _width * 0.6 || (v < -900 && x > _actionsWidth))) {
      unawaited(_commit());
    } else if (projected > _actionsWidth / 2) {
      _openRow();
    } else {
      _close();
    }
  }

  KeyEventResult _onKey(FocusNode node, KeyEvent e) {
    if (e is! KeyDownEvent) return KeyEventResult.ignored;
    final k = e.logicalKey;
    if (k == LogicalKeyboardKey.arrowLeft) {
      _openRow();
      return KeyEventResult.handled;
    }
    if ((k == LogicalKeyboardKey.arrowRight ||
            k == LogicalKeyboardKey.escape) &&
        _open) {
      _close();
      return KeyEventResult.handled;
    }
    return KeyEventResult.ignored;
  }

  Color _bg(LdsColors c, LdsSwipeActionTone t) => switch (t) {
    LdsSwipeActionTone.gray => c.tileGray,
    LdsSwipeActionTone.accent => c.accent,
    LdsSwipeActionTone.danger => c.tileRed,
  };

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    // Collapses from the bottom edge when the row is removed. Built from Align rather than
    // SizeTransition, whose axisAlignment is deprecated after Flutter 3.41 while its replacement
    // does not exist in the oldest Flutter this package supports.
    return AnimatedBuilder(
      animation: _size,
      builder: (context, child) => ClipRect(
        child: Align(
          alignment: Alignment.topCenter,
          heightFactor: _size.value.clamp(0.0, 1.0),
          child: child,
        ),
      ),
      child: LayoutBuilder(
        builder: (context, box) {
          _width = box.maxWidth.isFinite ? box.maxWidth : 400;
          return Semantics(
            customSemanticsActions: <CustomSemanticsAction, VoidCallback>{
              for (final a in widget.actions)
                CustomSemanticsAction(label: a.label): a.onPressed,
            },
            child: ClipRect(
              child: AnimatedBuilder(
                animation: _dx,
                builder: (context, row) {
                  final shown = math.max(0.0, -_dx.value);
                  final open = shown > 1;
                  return Stack(
                    children: [
                      if (open)
                        Positioned(
                          top: 0,
                          bottom: 0,
                          right: 0,
                          width: shown,
                          child: FocusTraversalGroup(
                            child: Row(
                              children: [
                                for (final a in widget.actions)
                                  Expanded(
                                    child: _ActionButton(
                                      action: a,
                                      color: _bg(c, a.tone),
                                      onPressed: () {
                                        _close();
                                        a.onPressed();
                                      },
                                    ),
                                  ),
                              ],
                            ),
                          ),
                        ),
                      Transform.translate(
                        offset: Offset(_dx.value, 0),
                        child: row,
                      ),
                    ],
                  );
                },
                child: Focus(
                  onKeyEvent: _onKey,
                  child: GestureDetector(
                    excludeFromSemantics: true,
                    behavior: HitTestBehavior.translucent,
                    onTap: () {
                      if (_open) _close();
                    },
                    onHorizontalDragStart: (_) => _dx.stop(),
                    onHorizontalDragUpdate: _gone ? null : _onUpdate,
                    onHorizontalDragEnd: _gone ? null : _onEnd,
                    child: ColoredBox(color: c.bgBase, child: widget.child),
                  ),
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}

class _ActionButton extends StatelessWidget {
  const _ActionButton({
    required this.action,
    required this.color,
    required this.onPressed,
  });

  final LdsSwipeAction action;
  final Color color;
  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    return LdsPressable(
      onPressed: onPressed,
      pressedScale: 1,
      borderRadius: BorderRadius.zero,
      semanticLabel: action.label,
      excludeChildSemantics: true,
      builder: (context, state) => ColoredBox(
        color: state.pressed ? Color.lerp(color, Colors.black, 0.1)! : color,
        child: ClipRect(
          child: OverflowBox(
            minWidth: 0,
            maxWidth: 76,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                LdsIcon(action.icon, fill: true, color: Colors.white),
                const SizedBox(height: 3),
                Text(
                  action.label,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: LdsType.caption.copyWith(
                    color: Colors.white,
                    fontSize: 12.5,
                    letterSpacing: 0,
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
