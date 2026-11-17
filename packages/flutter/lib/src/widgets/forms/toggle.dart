import 'package:flutter/material.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../icon.dart';
import '../pressable.dart';

/// A button that stays pressed to show a mode is on: tebal, sematkan,
/// bisukan. Give it an [icon], a [label] or both; an icon alone needs
/// [semanticLabel].
class LdsToggle extends StatelessWidget {
  /// Creates a toggle button.
  const LdsToggle({
    super.key,
    required this.selected,
    required this.onChanged,
    this.icon,
    this.label,
    this.semanticLabel,
    this.compact = false,
  }) : assert(icon != null || label != null, 'Give an icon or a label');

  /// Whether the mode is on.
  final bool selected;

  /// Called with the new state. Null disables it.
  final ValueChanged<bool>? onChanged;

  /// Ligature name; switches to the filled set when on.
  final String? icon;

  /// Visible text.
  final String? label;

  /// Screen reader label, required when there is no [label].
  final String? semanticLabel;

  /// The 30 px size used inside an [LdsToggleGroup].
  final bool compact;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final enabled = onChanged != null;
    final height = compact ? 30.0 : 36.0;
    final radius = BorderRadius.all(Radius.circular(compact ? 8 : 10));
    return LdsPressable(
      onPressed: enabled ? () => onChanged!(!selected) : null,
      pressedScale: 0.94,
      borderRadius: radius,
      selected: selected,
      semanticLabel: semanticLabel ?? label,
      excludeChildSemantics: true,
      tooltip: label == null ? semanticLabel : null,
      builder: (context, state) {
        final fg = selected ? c.accentText : c.textSubtle;
        final bg = selected
            ? c.accentTint
            : state.hovered || state.pressed
                ? c.bgTint
                : Colors.transparent;
        return AnimatedOpacity(
          opacity: enabled ? 1 : 0.38,
          duration: context.ldsDuration(LdsMotion.fast),
          child: AnimatedContainer(
            duration: context.ldsDuration(LdsMotion.fast),
            curve: LdsMotion.standardCurve,
            height: height,
            constraints: BoxConstraints(minWidth: height),
            padding: EdgeInsets.symmetric(horizontal: compact ? 8 : 10),
            decoration: BoxDecoration(color: bg, borderRadius: radius),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                if (icon != null)
                  LdsIcon(icon!, size: 19, color: fg, fill: selected),
                if (icon != null && label != null) const SizedBox(width: 6),
                if (label != null)
                  Text(
                    label!,
                    style: LdsType.subhead.copyWith(
                      color: fg,
                      fontWeight: FontWeight.w500,
                      height: 1,
                    ),
                  ),
              ],
            ),
          ),
        );
      },
    );
  }
}

/// One item of an [LdsToggleGroup].
@immutable
class LdsToggleItem<T> {
  /// Creates a toggle item.
  const LdsToggleItem({
    required this.value,
    this.icon,
    this.label,
    this.semanticLabel,
  });

  /// Value reported in the selection.
  final T value;

  /// Ligature name.
  final String? icon;

  /// Visible text.
  final String? label;

  /// Screen reader label, required when there is no [label].
  final String? semanticLabel;
}

/// Several toggles in one framed group, either independent (tebal, miring,
/// garis bawah) or one at a time when [exclusive] (rata kiri, tengah,
/// kanan).
class LdsToggleGroup<T> extends StatelessWidget {
  /// Creates a toggle group.
  const LdsToggleGroup({
    super.key,
    required this.items,
    required this.selected,
    required this.onChanged,
    this.exclusive = false,
    this.semanticLabel,
  });

  /// Items, in order.
  final List<LdsToggleItem<T>> items;

  /// Values that are on.
  final Set<T> selected;

  /// Called with the new selection. Null disables the group.
  final ValueChanged<Set<T>>? onChanged;

  /// Only one item can be on; choosing one turns the others off.
  final bool exclusive;

  /// Names the group for screen readers.
  final String? semanticLabel;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    return Semantics(
      container: true,
      label: semanticLabel,
      explicitChildNodes: true,
      child: Container(
        padding: const EdgeInsets.all(3),
        decoration: BoxDecoration(
          color: c.bgBase,
          borderRadius: const BorderRadius.all(Radius.circular(11)),
          border: Border.all(color: c.lineStrong),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            for (var i = 0; i < items.length; i++) ...[
              if (i > 0) const SizedBox(width: 2),
              LdsToggle(
                compact: true,
                icon: items[i].icon,
                label: items[i].label,
                semanticLabel: items[i].semanticLabel,
                selected: selected.contains(items[i].value),
                onChanged: onChanged == null
                    ? null
                    : (on) {
                        final v = items[i].value;
                        if (exclusive) {
                          onChanged!({v});
                        } else {
                          final next = {...selected};
                          on ? next.add(v) : next.remove(v);
                          onChanged!(next);
                        }
                      },
              ),
            ],
          ],
        ),
      ),
    );
  }
}
