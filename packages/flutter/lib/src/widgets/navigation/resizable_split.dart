import 'package:flutter/services.dart';
import 'package:material_ui/material_ui.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';

/// Two panes with a handle between them that people drag, or move with the
/// arrow keys, to share the space. For tools where both panes are worked in
/// at once.
///
/// The panes follow the pointer 1:1. The handle is a focusable slider for
/// screen readers; arrow keys move it by 2 % (10 % with Shift), Home and End
/// jump to the bounds.
class LdsResizableSplit extends StatefulWidget {
  /// Creates a resizable split.
  const LdsResizableSplit({
    super.key,
    required this.first,
    required this.second,
    this.axis = Axis.horizontal,
    this.initialFraction = 0.5,
    this.minFraction = 0.2,
    this.maxFraction = 0.8,
    this.onChanged,
    this.semanticLabel = 'Ubah ukuran panel',
  }) : assert(minFraction <= initialFraction && initialFraction <= maxFraction);

  /// The first pane (start or top).
  final Widget first;

  /// The second pane (end or bottom); takes the rest.
  final Widget second;

  /// [Axis.horizontal] puts the panes side by side; [Axis.vertical] stacks
  /// them.
  final Axis axis;

  /// Share of the first pane on first build, from 0 to 1.
  final double initialFraction;

  /// Smallest share of the first pane.
  final double minFraction;

  /// Largest share of the first pane.
  final double maxFraction;

  /// Called with the first pane's share when a drag ends or a key moves it.
  final ValueChanged<double>? onChanged;

  /// Names the handle for screen readers.
  final String semanticLabel;

  @override
  State<LdsResizableSplit> createState() => _LdsResizableSplitState();
}

class _LdsResizableSplitState extends State<LdsResizableSplit> {
  late double _fraction = widget.initialFraction;
  bool _hovered = false;
  bool _focused = false;
  bool _dragging = false;

  static const double _handle = 12;

  double _clamp(double v) =>
      v.clamp(widget.minFraction, widget.maxFraction).toDouble();

  void _set(double v, {bool notify = false}) {
    final next = _clamp(v);
    if (next != _fraction) setState(() => _fraction = next);
    if (notify) widget.onChanged?.call(_fraction);
  }

  KeyEventResult _onKey(FocusNode node, KeyEvent event) {
    if (event is! KeyDownEvent && event is! KeyRepeatEvent) {
      return KeyEventResult.ignored;
    }
    final step = HardwareKeyboard.instance.isShiftPressed ? 0.1 : 0.02;
    final horizontal = widget.axis == Axis.horizontal;
    final k = event.logicalKey;
    if (k ==
        (horizontal
            ? LogicalKeyboardKey.arrowLeft
            : LogicalKeyboardKey.arrowUp)) {
      _set(_fraction - step, notify: true);
    } else if (k ==
        (horizontal
            ? LogicalKeyboardKey.arrowRight
            : LogicalKeyboardKey.arrowDown)) {
      _set(_fraction + step, notify: true);
    } else if (k == LogicalKeyboardKey.home) {
      _set(widget.minFraction, notify: true);
    } else if (k == LogicalKeyboardKey.end) {
      _set(widget.maxFraction, notify: true);
    } else {
      return KeyEventResult.ignored;
    }
    return KeyEventResult.handled;
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final horizontal = widget.axis == Axis.horizontal;
    return LayoutBuilder(
      builder: (context, constraints) {
        final total =
            (horizontal ? constraints.maxWidth : constraints.maxHeight) -
            _handle;
        final firstSize = total * _fraction;
        final active = _hovered || _focused || _dragging;
        final pct = (_fraction * 100).round();

        final grip = AnimatedContainer(
          duration: context.ldsDuration(LdsMotion.snappySpringDuration),
          curve: LdsSpringCurve.snappy,
          width: horizontal ? 4 : (active ? 56 : 36),
          height: horizontal ? (active ? 56 : 36) : 4,
          decoration: BoxDecoration(
            color: active ? c.accent : c.lineStrong,
            borderRadius: BorderRadius.circular(2),
          ),
        );

        void onUpdate(DragUpdateDetails d) {
          final delta = horizontal ? d.delta.dx : d.delta.dy;
          final dir =
              horizontal && Directionality.of(context) == TextDirection.rtl
              ? -1
              : 1;
          if (total > 0) _set(_fraction + dir * delta / total);
        }

        final handle = Semantics(
          slider: true,
          label: widget.semanticLabel,
          value: '$pct%',
          increasedValue: '${(_clamp(_fraction + 0.02) * 100).round()}%',
          decreasedValue: '${(_clamp(_fraction - 0.02) * 100).round()}%',
          onIncrease: () => _set(_fraction + 0.02, notify: true),
          onDecrease: () => _set(_fraction - 0.02, notify: true),
          child: Focus(
            onKeyEvent: _onKey,
            onFocusChange: (v) => setState(() => _focused = v),
            child: MouseRegion(
              cursor: horizontal
                  ? SystemMouseCursors.resizeColumn
                  : SystemMouseCursors.resizeRow,
              onEnter: (_) => setState(() => _hovered = true),
              onExit: (_) => setState(() => _hovered = false),
              child: GestureDetector(
                behavior: HitTestBehavior.opaque,
                onHorizontalDragStart: horizontal
                    ? (_) => setState(() => _dragging = true)
                    : null,
                onHorizontalDragUpdate: horizontal ? onUpdate : null,
                onHorizontalDragEnd: horizontal
                    ? (_) {
                        setState(() => _dragging = false);
                        widget.onChanged?.call(_fraction);
                      }
                    : null,
                onVerticalDragStart: horizontal
                    ? null
                    : (_) => setState(() => _dragging = true),
                onVerticalDragUpdate: horizontal ? null : onUpdate,
                onVerticalDragEnd: horizontal
                    ? null
                    : (_) {
                        setState(() => _dragging = false);
                        widget.onChanged?.call(_fraction);
                      },
                child: Center(child: grip),
              ),
            ),
          ),
        );

        // The visible slot is 12 px; the hit area is 44 px centered on it.
        const hit = LdsSize.touchMin;
        final hitStart = firstSize + _handle / 2 - hit / 2;
        return Stack(
          children: [
            Flex(
              direction: widget.axis,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                SizedBox(
                  width: horizontal ? firstSize : null,
                  height: horizontal ? null : firstSize,
                  child: ClipRect(child: widget.first),
                ),
                SizedBox(
                  width: horizontal ? _handle : null,
                  height: horizontal ? null : _handle,
                ),
                Expanded(child: ClipRect(child: widget.second)),
              ],
            ),
            if (horizontal)
              PositionedDirectional(
                start: hitStart,
                top: 0,
                bottom: 0,
                width: hit,
                child: handle,
              )
            else
              Positioned(
                top: hitStart,
                left: 0,
                right: 0,
                height: hit,
                child: handle,
              ),
          ],
        );
      },
    );
  }
}
