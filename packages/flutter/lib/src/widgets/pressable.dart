import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter/services.dart';

import '../motion.dart';
import '../theme.dart';
import '../tokens.g.dart';

/// Interaction state reported by [LdsPressable] to its builder.
@immutable
class LdsPressState {
  /// Creates a press state.
  const LdsPressState({
    this.hovered = false,
    this.pressed = false,
    this.focused = false,
    this.enabled = true,
  });

  /// A pointer hovers the control.
  final bool hovered;

  /// The control is held down.
  final bool pressed;

  /// The control has keyboard focus and the focus ring shows.
  final bool focused;

  /// The control responds to input.
  final bool enabled;
}

/// The base of every pressable LDS control: keyboard and pointer activation,
/// a press scale on the snappy spring, the focus ring (2 px, 2 px offset) and
/// a hit area of at least 44 by 44.
///
/// Use it to build a custom control with the same feel as [LdsButton].
class LdsPressable extends StatefulWidget {
  /// Creates a pressable area.
  const LdsPressable({
    super.key,
    required this.builder,
    this.onPressed,
    this.onLongPress,
    this.pressedScale = 0.97,
    this.borderRadius = const BorderRadius.all(Radius.circular(LdsRadius.md)),
    this.minSize = const Size(LdsSize.touchMin, LdsSize.touchMin),
    this.semanticLabel,
    this.tooltip,
    this.selected,
    this.inMutuallyExclusiveGroup = false,
    this.focusNode,
    this.autofocus = false,
    this.excludeChildSemantics = false,
    this.mouseCursor,
  });

  /// Builds the visual for the current state.
  final Widget Function(BuildContext context, LdsPressState state) builder;

  /// Called on tap, Enter or Space. Null disables the control.
  final VoidCallback? onPressed;

  /// Called on long press.
  final VoidCallback? onLongPress;

  /// Scale while held down; 1 turns the press scale off.
  final double pressedScale;

  /// Shape of the focus ring.
  final BorderRadius borderRadius;

  /// Minimum hit area. The visual may be smaller; the hit area is not.
  final Size minSize;

  /// Label for assistive technology. Defaults to the child's text.
  final String? semanticLabel;

  /// Optional tooltip, shown on long press and hover.
  final String? tooltip;

  /// Selection state for toggles and segments; null when not selectable.
  final bool? selected;

  /// Whether this is one option of a group where only one is selected.
  final bool inMutuallyExclusiveGroup;

  /// Focus node for the control.
  final FocusNode? focusNode;

  /// Whether the control takes focus when first built.
  final bool autofocus;

  /// Use [semanticLabel] only, ignoring the child's semantics.
  final bool excludeChildSemantics;

  /// Cursor over the control. Defaults to a click cursor when enabled.
  final MouseCursor? mouseCursor;

  @override
  State<LdsPressable> createState() => _LdsPressableState();
}

class _LdsPressableState extends State<LdsPressable> {
  bool _hovered = false;
  bool _pressed = false;
  bool _focused = false;

  bool get _enabled => widget.onPressed != null;

  late final Map<Type, Action<Intent>> _actions = <Type, Action<Intent>>{
    ActivateIntent: CallbackAction<ActivateIntent>(onInvoke: (_) => _activate()),
    ButtonActivateIntent:
        CallbackAction<ButtonActivateIntent>(onInvoke: (_) => _activate()),
  };

  Object? _activate() {
    if (!_enabled) return null;
    widget.onPressed?.call();
    return null;
  }

  void _setPressed(bool value) {
    if (_pressed != value) setState(() => _pressed = value);
  }

  @override
  void didUpdateWidget(LdsPressable oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (!_enabled && (_pressed || _hovered)) {
      _pressed = false;
      _hovered = false;
    }
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final state = LdsPressState(
      hovered: _hovered && _enabled,
      pressed: _pressed && _enabled,
      focused: _focused && _enabled,
      enabled: _enabled,
    );
    final reduce = context.ldsReduceMotion;
    final scale = state.pressed && !reduce ? widget.pressedScale : 1.0;

    Widget visual = AnimatedScale(
      scale: scale,
      duration: state.pressed
          ? const Duration(milliseconds: 90)
          : context.ldsDuration(LdsMotion.snappy),
      curve: state.pressed ? LdsMotion.standardCurve : LdsSpringCurve.snappy,
      child: CustomPaint(
        foregroundPainter: state.focused
            ? _FocusRingPainter(color: c.focus, radius: widget.borderRadius)
            : null,
        child: widget.builder(context, state),
      ),
    );

    visual = _MinHitArea(minSize: widget.minSize, child: visual);

    Widget result = FocusableActionDetector(
      enabled: _enabled,
      focusNode: widget.focusNode,
      autofocus: widget.autofocus,
      actions: _actions,
      mouseCursor: widget.mouseCursor ??
          (_enabled ? SystemMouseCursors.click : SystemMouseCursors.basic),
      onShowFocusHighlight: (v) => setState(() => _focused = v),
      onShowHoverHighlight: (v) => setState(() => _hovered = v),
      shortcuts: const <ShortcutActivator, Intent>{
        SingleActivator(LogicalKeyboardKey.enter): ActivateIntent(),
        SingleActivator(LogicalKeyboardKey.space): ActivateIntent(),
      },
      child: GestureDetector(
        behavior: HitTestBehavior.opaque,
        excludeFromSemantics: true,
        onTapDown: _enabled ? (_) => _setPressed(true) : null,
        onTapUp: _enabled ? (_) => _setPressed(false) : null,
        onTapCancel: _enabled ? () => _setPressed(false) : null,
        onTap: _enabled ? widget.onPressed : null,
        onLongPress: _enabled ? widget.onLongPress : null,
        child: visual,
      ),
    );

    result = Semantics(
      button: true,
      enabled: _enabled,
      selected: widget.selected,
      inMutuallyExclusiveGroup:
          widget.inMutuallyExclusiveGroup ? true : null,
      label: widget.semanticLabel,
      excludeSemantics: widget.excludeChildSemantics,
      onTap: _enabled ? widget.onPressed : null,
      child: result,
    );
    result = MergeSemantics(child: result);
    if (widget.tooltip != null) {
      result = Tooltip(
        message: widget.tooltip!,
        excludeFromSemantics: true,
        child: result,
      );
    }
    return result;
  }
}

class _FocusRingPainter extends CustomPainter {
  _FocusRingPainter({required this.color, required this.radius});

  final Color color;
  final BorderRadius radius;

  @override
  void paint(Canvas canvas, Size size) {
    // 2 px ring, 2 px away from the edge: stroke centered 3 px out.
    final r = radius.resolve(TextDirection.ltr).toRRect(Offset.zero & size);
    canvas.drawRRect(
      r.inflate(3),
      Paint()
        ..style = PaintingStyle.stroke
        ..strokeWidth = 2
        ..color = color,
    );
  }

  @override
  bool shouldRepaint(_FocusRingPainter oldDelegate) =>
      oldDelegate.color != color || oldDelegate.radius != radius;
}

/// Lays the child out with the parent's constraints (so it can still fill a
/// tight slot), then grows to at least [minSize] and centers the child, so a
/// small visual keeps a 44 by 44 hit area.
class _MinHitArea extends SingleChildRenderObjectWidget {
  const _MinHitArea({required this.minSize, required Widget super.child});

  final Size minSize;

  @override
  RenderObject createRenderObject(BuildContext context) =>
      _RenderMinHitArea(minSize);

  @override
  void updateRenderObject(
      BuildContext context, _RenderMinHitArea renderObject) {
    renderObject.minSize = minSize;
  }
}

class _RenderMinHitArea extends RenderShiftedBox {
  _RenderMinHitArea(this._minSize) : super(null);

  Size _minSize;
  set minSize(Size value) {
    if (value == _minSize) return;
    _minSize = value;
    markNeedsLayout();
  }

  Size _grow(Size childSize, BoxConstraints constraints) =>
      constraints.constrain(Size(
        math.max(childSize.width, _minSize.width),
        math.max(childSize.height, _minSize.height),
      ));

  @override
  double computeMinIntrinsicWidth(double height) =>
      math.max(child?.getMinIntrinsicWidth(height) ?? 0, _minSize.width);

  @override
  double computeMaxIntrinsicWidth(double height) =>
      math.max(child?.getMaxIntrinsicWidth(height) ?? 0, _minSize.width);

  @override
  double computeMinIntrinsicHeight(double width) =>
      math.max(child?.getMinIntrinsicHeight(width) ?? 0, _minSize.height);

  @override
  double computeMaxIntrinsicHeight(double width) =>
      math.max(child?.getMaxIntrinsicHeight(width) ?? 0, _minSize.height);

  @override
  Size computeDryLayout(BoxConstraints constraints) {
    final c = child;
    if (c == null) return constraints.constrain(_minSize);
    return _grow(c.getDryLayout(constraints), constraints);
  }

  @override
  void performLayout() {
    final c = child;
    if (c == null) {
      size = constraints.constrain(_minSize);
      return;
    }
    c.layout(constraints, parentUsesSize: true);
    size = _grow(c.size, constraints);
    final data = c.parentData! as BoxParentData;
    data.offset = Alignment.center.alongOffset(size - c.size as Offset);
  }

  // The padding around a small visual is part of the hit area.
  @override
  bool hitTestSelf(Offset position) => true;
}
