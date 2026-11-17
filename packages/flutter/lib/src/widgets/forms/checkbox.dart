import 'package:flutter/material.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../pressable.dart';
import 'parts.dart';

/// A checkbox with a drawn tick, for an independent yes or no choice that
/// is saved with a form: "Saya menyetujui syarat layanan".
///
/// [value] null shows the mixed state (some of a group are on). The label
/// says what turning it on means; [description] adds a second line.
class LdsCheckbox extends StatelessWidget {
  /// Creates a checkbox.
  const LdsCheckbox({
    super.key,
    required this.value,
    required this.onChanged,
    this.label,
    this.description,
    this.semanticLabel,
    this.focusNode,
    this.autofocus = false,
  });

  /// On, off, or null for mixed.
  final bool? value;

  /// Called with the new value: a mixed box turns on. Null disables it.
  final ValueChanged<bool>? onChanged;

  /// Visible label next to the box.
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
    return Semantics(
      checked: value ?? false,
      mixed: value == null ? true : null,
      child: LdsPressable(
        onPressed: enabled ? () => onChanged!(!(value ?? false)) : null,
        pressedScale: 1,
        borderRadius: const BorderRadius.all(Radius.circular(7)),
        semanticLabel: semanticLabel,
        focusNode: focusNode,
        autofocus: autofocus,
        builder: (context, state) {
          final box = LdsFormsCheckBoxVisual(
            value: value,
            hovered: state.hovered,
            pressed: state.pressed,
            enabled: enabled,
          );
          if (label == null) return box;
          return Row(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              box,
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

/// The 22 px box with its drawn tick, shared by [LdsCheckbox] and the
/// check matrix.
class LdsFormsCheckBoxVisual extends StatelessWidget {
  /// Creates the box visual.
  const LdsFormsCheckBoxVisual({
    super.key,
    required this.value,
    this.hovered = false,
    this.pressed = false,
    this.focused = false,
    this.enabled = true,
    this.highlight = false,
  });

  /// On, off, or null for mixed.
  final bool? value;

  /// Pointer over the control.
  final bool hovered;

  /// Held down.
  final bool pressed;

  /// Draw the focus ring around the box itself.
  final bool focused;

  /// Whether it responds.
  final bool enabled;

  /// A just-changed halo (check matrix).
  final bool highlight;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final on = value != false;
    final reduce = context.ldsReduceMotion;
    final fast = context.ldsDuration(LdsMotion.fast);
    Widget box = AnimatedScale(
      scale: pressed && !reduce ? 0.88 : 1,
      duration: pressed
          ? const Duration(milliseconds: 90)
          : context.ldsDuration(LdsMotion.snappy),
      curve: LdsSpringCurve.snappy,
      child: AnimatedContainer(
        duration: fast,
        curve: LdsMotion.standardCurve,
        width: 22,
        height: 22,
        decoration: BoxDecoration(
          color: on ? c.accent : c.bgBase,
          borderRadius: const BorderRadius.all(Radius.circular(7)),
          border: Border.all(
            color: on
                ? c.accent
                : hovered
                    ? c.textSubtle
                    : c.lineControl,
            width: 1.5,
          ),
          boxShadow: [
            if (highlight) BoxShadow(color: c.accentRing, spreadRadius: 3),
            if (focused) BoxShadow(color: c.bgCanvas, spreadRadius: 2),
            if (focused) BoxShadow(color: c.focus, spreadRadius: 4),
          ],
        ),
        alignment: Alignment.center,
        child: TweenAnimationBuilder<double>(
          tween: Tween(end: on ? 1 : 0),
          duration: context.ldsDuration(
              on ? const Duration(milliseconds: 260) : LdsMotion.fast),
          curve: on ? LdsMotion.enterCurve : LdsMotion.exitCurve,
          builder: (context, t, _) => CustomPaint(
            size: const Size.square(14),
            painter: LdsFormsTickPainter(
              progress: t,
              color: c.textOnAccent,
              dash: value == null,
            ),
          ),
        ),
      ),
    );
    if (!enabled) box = Opacity(opacity: 0.4, child: box);
    return box;
  }
}
