import 'package:flutter/material.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../icon.dart';
import '../pressable.dart';
import 'radio.dart';

/// A selectable card for one choice among two to four options that each
/// need a title, a line of detail and often a price: "Kirim ke rumah,
/// 2 sampai 3 hari kerja, Rp 15.000".
///
/// The whole card is the target; the chosen one gets an accent edge and
/// tint. Stack several in a column with 8 to 12 px between them.
class LdsRadioCard<T> extends StatelessWidget {
  /// Creates a radio card.
  const LdsRadioCard({
    super.key,
    required this.value,
    required this.groupValue,
    required this.onChanged,
    required this.title,
    this.description,
    this.trailing,
    this.icon,
    this.focusNode,
  });

  /// The value this card stands for.
  final T value;

  /// The chosen value of the group.
  final T? groupValue;

  /// Called with [value] when chosen. Null disables the card.
  final ValueChanged<T>? onChanged;

  /// Title.
  final String title;

  /// A line of detail.
  final String? description;

  /// Right-aligned text, usually a price.
  final String? trailing;

  /// Optional leading icon (ligature name) in place of the radio dot.
  final String? icon;

  /// Focus node.
  final FocusNode? focusNode;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final selected = value == groupValue;
    final enabled = onChanged != null;
    const radius = BorderRadius.all(Radius.circular(LdsRadius.lg));
    return Semantics(
      checked: selected,
      child: LdsPressable(
        onPressed: enabled ? () => onChanged!(value) : null,
        pressedScale: 0.985,
        borderRadius: radius,
        inMutuallyExclusiveGroup: true,
        focusNode: focusNode,
        builder: (context, state) {
          final card = AnimatedContainer(
            duration: context.ldsDuration(LdsMotion.fast),
            curve: LdsMotion.standardCurve,
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: selected ? c.accentTint : c.bgBase,
              borderRadius: radius,
              border: Border.all(
                color: selected
                    ? c.accent
                    : state.hovered
                        ? c.textSubtle
                        : c.lineStrong,
                width: selected ? 2 : 1,
              ),
            ),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                if (icon != null)
                  LdsIcon(icon!,
                      size: 22, color: selected ? c.accentText : c.textSubtle)
                else
                  LdsFormsRadioDot(
                    selected: selected,
                    hovered: state.hovered,
                    enabled: enabled,
                  ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        title,
                        style: LdsType.bodyStrong.copyWith(
                          color: c.textStrong,
                          fontWeight: FontWeight.w600,
                          height: 20 / 15,
                          letterSpacing: -0.15,
                        ),
                      ),
                      if (description != null)
                        Padding(
                          padding: const EdgeInsets.only(top: 2),
                          child: Text(
                            description!,
                            style:
                                LdsType.footnote.copyWith(color: c.textSubtle),
                          ),
                        ),
                    ],
                  ),
                ),
                if (trailing != null) ...[
                  const SizedBox(width: 12),
                  Text(
                    trailing!,
                    style: LdsType.bodyStrong.copyWith(
                      color: c.textStrong,
                      fontWeight: FontWeight.w600,
                      fontFeatures: const [FontFeature.tabularFigures()],
                    ),
                  ),
                ],
              ],
            ),
          );
          return enabled ? card : Opacity(opacity: 0.5, child: card);
        },
      ),
    );
  }
}
