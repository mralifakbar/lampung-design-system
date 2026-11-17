import 'package:flutter/material.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../pressable.dart';

/// An on and off control for a setting that applies the moment it is
/// flipped, with no Save button: "Notifikasi status laporan".
///
/// The thumb stretches while held and travels on the smooth spring.
class LdsSwitch extends StatelessWidget {
  /// Creates a switch.
  const LdsSwitch({
    super.key,
    required this.value,
    required this.onChanged,
    this.label,
    this.description,
    this.semanticLabel,
    this.small = false,
    this.labelFirst = false,
    this.focusNode,
  });

  /// On or off.
  final bool value;

  /// Called with the new value. Null disables it.
  final ValueChanged<bool>? onChanged;

  /// Visible label.
  final String? label;

  /// Second line under [label].
  final String? description;

  /// Label for screen readers when there is no visible [label].
  final String? semanticLabel;

  /// The 38 by 23 size, for dense lists.
  final bool small;

  /// Put the label before the switch and let it fill the row (settings
  /// lists).
  final bool labelFirst;

  /// Focus node.
  final FocusNode? focusNode;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final enabled = onChanged != null;
    final w = small ? 38.0 : 51.0;
    final h = small ? 23.0 : 31.0;
    final thumb = small ? 19.0 : 27.0;
    final stretch = small ? 4.0 : 6.0;

    return Semantics(
      toggled: value,
      child: LdsPressable(
        onPressed: enabled ? () => onChanged!(!value) : null,
        pressedScale: 1,
        borderRadius: BorderRadius.all(Radius.circular(h / 2)),
        semanticLabel: semanticLabel,
        focusNode: focusNode,
        builder: (context, state) {
          final held = state.pressed;
          final thumbW = held ? thumb + stretch : thumb;
          final left = value ? w - 2 - thumbW : 2.0;
          Widget track = AnimatedContainer(
            duration: context.ldsDuration(LdsMotion.standard),
            curve: LdsMotion.standardCurve,
            width: w,
            height: h,
            decoration: BoxDecoration(
              color: value ? c.accent : c.bgSwitchOff,
              borderRadius: BorderRadius.all(Radius.circular(h / 2)),
              border: Border.all(
                color: value ? c.accent : c.line,
              ),
            ),
            child: Stack(
              clipBehavior: Clip.none,
              children: [
                AnimatedPositioned(
                  duration: context.ldsDuration(LdsMotion.smoothSpringDuration),
                  curve: LdsSpringCurve.smooth,
                  left: left - 1,
                  top: 1,
                  width: thumbW,
                  height: thumb,
                  child: DecoratedBox(
                    decoration: BoxDecoration(
                      color: c.textOnAccent,
                      borderRadius:
                          BorderRadius.all(Radius.circular(thumb / 2)),
                      boxShadow: context.ldsShadows.thumb,
                    ),
                  ),
                ),
              ],
            ),
          );
          if (!enabled) track = Opacity(opacity: 0.4, child: track);
          if (label == null) return track;
          final text = Column(
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
                Text(
                  description!,
                  style: LdsType.footnote.copyWith(color: c.textSubtle),
                ),
            ],
          );
          return Row(
            mainAxisSize: labelFirst ? MainAxisSize.max : MainAxisSize.min,
            children: labelFirst
                ? [Expanded(child: text), const SizedBox(width: 12), track]
                : [track, const SizedBox(width: 12), Flexible(child: text)],
          );
        },
      ),
    );
  }
}
