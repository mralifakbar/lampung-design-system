import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../pressable.dart';

/// One choice of an [LdsRadioGroup] or [LdsRadio].
@immutable
class LdsRadioOption<T> {
  /// Creates an option.
  const LdsRadioOption({
    required this.value,
    required this.label,
    this.description,
    this.enabled = true,
  });

  /// Value reported when chosen.
  final T value;

  /// Visible text.
  final String label;

  /// Second line.
  final String? description;

  /// Whether this option can be chosen.
  final bool enabled;
}

/// One radio button: a round dot that springs in when chosen.
///
/// Use [LdsRadioGroup] for a set; it adds arrow key movement between
/// options.
class LdsRadio<T> extends StatelessWidget {
  /// Creates a radio button.
  const LdsRadio({
    super.key,
    required this.value,
    required this.groupValue,
    required this.onChanged,
    this.label,
    this.description,
    this.semanticLabel,
    this.focusNode,
    this.autofocus = false,
  });

  /// The value this button stands for.
  final T value;

  /// The chosen value of the group.
  final T? groupValue;

  /// Called with [value] when chosen. Null disables it.
  final ValueChanged<T>? onChanged;

  /// Visible label.
  final String? label;

  /// Second line under [label].
  final String? description;

  /// Label for screen readers when there is no visible [label].
  final String? semanticLabel;

  /// Focus node.
  final FocusNode? focusNode;

  /// Take focus when first built.
  final bool autofocus;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final enabled = onChanged != null;
    final selected = value == groupValue;
    return Semantics(
      checked: selected,
      child: LdsPressable(
        onPressed: enabled ? () => onChanged!(value) : null,
        pressedScale: 1,
        borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.sm)),
        semanticLabel: semanticLabel,
        inMutuallyExclusiveGroup: true,
        focusNode: focusNode,
        autofocus: autofocus,
        builder: (context, state) {
          final dot = LdsFormsRadioDot(
            selected: selected,
            hovered: state.hovered,
            pressed: state.pressed,
            enabled: enabled,
          );
          if (label == null) return dot;
          return Row(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              dot,
              const SizedBox(width: 12),
              Flexible(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      label!,
                      style: LdsType.body.copyWith(
                        color: enabled ? c.textStrong : c.textMuted,
                        height: 22 / 15,
                      ),
                    ),
                    if (description != null)
                      Padding(
                        padding: const EdgeInsets.only(top: 1),
                        child: Text(
                          description!,
                          style: LdsType.footnote.copyWith(
                            color: enabled ? c.textSubtle : c.textFaint,
                          ),
                        ),
                      ),
                  ],
                ),
              ),
            ],
          );
        },
      ),
    );
  }
}

/// The 22 px radio dot, shared by [LdsRadio] and the radio card.
class LdsFormsRadioDot extends StatelessWidget {
  /// Creates the dot visual.
  const LdsFormsRadioDot({
    super.key,
    required this.selected,
    this.hovered = false,
    this.pressed = false,
    this.enabled = true,
  });

  /// Chosen.
  final bool selected;

  /// Pointer over the control.
  final bool hovered;

  /// Held down.
  final bool pressed;

  /// Whether it responds.
  final bool enabled;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final reduce = context.ldsReduceMotion;
    Widget dot = AnimatedScale(
      scale: pressed && !reduce ? 0.88 : 1,
      duration: pressed
          ? const Duration(milliseconds: 90)
          : context.ldsDuration(LdsMotion.snappy),
      curve: LdsSpringCurve.snappy,
      child: AnimatedContainer(
        duration: context.ldsDuration(LdsMotion.fast),
        width: 22,
        height: 22,
        alignment: Alignment.center,
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          color: selected ? c.accent : c.bgBase,
          border: Border.all(
            color: selected
                ? c.accent
                : hovered
                    ? c.textSubtle
                    : c.lineControl,
            width: 1.5,
          ),
        ),
        child: AnimatedScale(
          scale: selected ? 1 : 0,
          duration:
              context.ldsDuration(selected ? LdsMotion.snappy : LdsMotion.exit),
          curve: selected ? LdsSpringCurve.snappy : LdsMotion.exitCurve,
          child: Container(
            width: 8,
            height: 8,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: c.textOnAccent,
            ),
          ),
        ),
      ),
    );
    if (!enabled) dot = Opacity(opacity: 0.4, child: dot);
    return dot;
  }
}

/// Two to five radio buttons for exactly one choice, all visible.
///
/// Arrow keys move to the next or previous option and choose it, the way a
/// native radio group works.
class LdsRadioGroup<T> extends StatefulWidget {
  /// Creates a radio group.
  const LdsRadioGroup({
    super.key,
    required this.options,
    required this.value,
    required this.onChanged,
    this.label,
    this.spacing = 14,
  });

  /// Options, in order.
  final List<LdsRadioOption<T>> options;

  /// The chosen value.
  final T? value;

  /// Called with the new value. Null disables the group.
  final ValueChanged<T>? onChanged;

  /// Group label, shown above and announced.
  final String? label;

  /// Space between options.
  final double spacing;

  @override
  State<LdsRadioGroup<T>> createState() => _LdsRadioGroupState<T>();
}

class _LdsRadioGroupState<T> extends State<LdsRadioGroup<T>> {
  final List<FocusNode> _nodes = [];

  void _syncNodes() {
    while (_nodes.length < widget.options.length) {
      _nodes.add(FocusNode());
    }
    while (_nodes.length > widget.options.length) {
      _nodes.removeLast().dispose();
    }
  }

  @override
  void dispose() {
    for (final n in _nodes) {
      n.dispose();
    }
    super.dispose();
  }

  void _move(int delta) {
    if (widget.onChanged == null) return;
    final current = _nodes.indexWhere((n) => n.hasFocus);
    if (current < 0) return;
    final count = widget.options.length;
    var i = current;
    for (var step = 0; step < count; step++) {
      i = (i + delta + count) % count;
      if (widget.options[i].enabled) break;
    }
    _nodes[i].requestFocus();
    widget.onChanged!(widget.options[i].value);
  }

  @override
  Widget build(BuildContext context) {
    _syncNodes();
    final c = context.lds;
    return Semantics(
      container: true,
      label: widget.label,
      explicitChildNodes: true,
      child: CallbackShortcuts(
        bindings: {
          const SingleActivator(LogicalKeyboardKey.arrowDown): () => _move(1),
          const SingleActivator(LogicalKeyboardKey.arrowRight): () => _move(1),
          const SingleActivator(LogicalKeyboardKey.arrowUp): () => _move(-1),
          const SingleActivator(LogicalKeyboardKey.arrowLeft): () => _move(-1),
        },
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            if (widget.label != null)
              Padding(
                padding: const EdgeInsets.only(bottom: 4),
                child: ExcludeSemantics(
                  child: Text(
                    widget.label!,
                    style: LdsType.caption
                        .copyWith(color: c.textStrong, letterSpacing: 0),
                  ),
                ),
              ),
            for (var i = 0; i < widget.options.length; i++)
              Padding(
                padding: EdgeInsets.only(top: i == 0 ? 0 : widget.spacing - 8),
                child: LdsRadio<T>(
                  value: widget.options[i].value,
                  groupValue: widget.value,
                  focusNode: _nodes[i],
                  onChanged:
                      widget.options[i].enabled && widget.onChanged != null
                          ? (v) {
                              _nodes[i].requestFocus();
                              widget.onChanged!(v);
                            }
                          : null,
                  label: widget.options[i].label,
                  description: widget.options[i].description,
                ),
              ),
          ],
        ),
      ),
    );
  }
}
