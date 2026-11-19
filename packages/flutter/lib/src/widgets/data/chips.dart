import 'package:material_ui/material_ui.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../icon.dart';
import '../pressable.dart';

/// A toggle chip that filters or picks: Semua, Diproses, Selesai.
///
/// Pressed chips take the accent tint and a check slides in before the
/// label. A disabled chip is an option that exists but cannot be chosen now
/// (a booked time slot): it is faint and struck through.
class LdsChip extends StatelessWidget {
  /// Creates a chip.
  const LdsChip({
    super.key,
    required this.label,
    required this.selected,
    required this.onChanged,
    this.semanticLabel,
  });

  /// Visible text.
  final String label;

  /// Whether the chip is pressed.
  final bool selected;

  /// Called with the new pressed state. Null disables the chip.
  final ValueChanged<bool>? onChanged;

  /// Overrides the announced label.
  final String? semanticLabel;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final enabled = onChanged != null;
    final reduce = context.ldsReduceMotion;
    final layoutDuration = reduce
        ? LdsMotion.instant
        : LdsMotion.smoothSpringDuration;
    final Curve layoutCurve = reduce ? Curves.linear : LdsSpringCurve.smooth;
    final colorDuration = reduce ? LdsMotion.instant : LdsMotion.fast;

    return LdsPressable(
      onPressed: enabled ? () => onChanged!(!selected) : null,
      pressedScale: 0.95,
      borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.pill)),
      semanticLabel: semanticLabel,
      selected: selected,
      builder: (context, state) {
        final bg = selected
            ? c.accentTint
            : (state.hovered || state.pressed)
            ? c.bgFill
            : c.bgBase;
        final fg = !enabled
            ? c.textFaint
            : selected
            ? c.accentText
            : c.textStrong;
        return AnimatedContainer(
          duration: colorDuration,
          curve: LdsMotion.standardCurve,
          height: 34,
          decoration: BoxDecoration(
            color: bg,
            borderRadius: const BorderRadius.all(
              Radius.circular(LdsRadius.pill),
            ),
            border: selected ? null : Border.all(color: c.lineStrong),
          ),
          child: AnimatedPadding(
            duration: layoutDuration,
            curve: layoutCurve,
            padding: EdgeInsets.only(left: selected ? 10 : 14, right: 14),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                AnimatedContainer(
                  duration: layoutDuration,
                  curve: layoutCurve,
                  width: selected ? 21 : 0,
                  child: ClipRect(
                    child: AnimatedOpacity(
                      opacity: selected ? 1 : 0,
                      duration: colorDuration,
                      child: OverflowBox(
                        alignment: Alignment.centerLeft,
                        maxWidth: 21,
                        child: Padding(
                          padding: const EdgeInsets.only(right: 4),
                          child: LdsIcon('check', size: 17, color: fg),
                        ),
                      ),
                    ),
                  ),
                ),
                Text(
                  label,
                  maxLines: 1,
                  style: TextStyle(
                    fontFamily: LdsType.family,
                    fontSize: 14,
                    height: 1,
                    fontWeight: FontWeight.w500,
                    color: fg,
                    decoration: enabled ? null : TextDecoration.lineThrough,
                    decorationColor: fg,
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

/// A wrapping row of [LdsChip]s with 8 px gaps, announced as one group.
class LdsChipRow extends StatelessWidget {
  /// Creates a chip row.
  const LdsChipRow({
    super.key,
    required this.children,
    required this.semanticLabel,
  });

  /// The chips.
  final List<Widget> children;

  /// What the chips filter, for example "Filter status laporan".
  final String semanticLabel;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      container: true,
      label: semanticLabel,
      explicitChildNodes: true,
      // Each chip keeps a 44 px hit area around its 34 px pill, which already
      // leaves a 10 px gap between lines.
      child: Wrap(spacing: 8, children: children),
    );
  }
}
