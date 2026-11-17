import 'package:flutter/material.dart';

import '../../theme.dart';
import '../../tokens.g.dart';
import '../icon.dart';
import 'parts.dart';

/// A value on a continuous scale where the position matters more than the
/// exact number: volume, brightness, radius pencarian.
///
/// A 4 px track filled in the accent up to a 28 px thumb. Optional icons
/// sit at both ends and [valueLabel] shows the number on the right. Arrow
/// keys move it while it has focus.
class LdsSlider extends StatelessWidget {
  /// Creates a slider.
  const LdsSlider({
    super.key,
    required this.value,
    required this.onChanged,
    required this.semanticLabel,
    this.min = 0,
    this.max = 1,
    this.divisions,
    this.onChangeEnd,
    this.startIcon,
    this.endIcon,
    this.valueLabel,
    this.semanticFormatter,
  });

  /// The current value.
  final double value;

  /// Called while dragging. Null disables it.
  final ValueChanged<double>? onChanged;

  /// Called when a drag ends.
  final ValueChanged<double>? onChangeEnd;

  /// What the slider sets, for screen readers.
  final String semanticLabel;

  /// Lowest value.
  final double min;

  /// Highest value.
  final double max;

  /// Number of steps; null is continuous.
  final int? divisions;

  /// Icon at the low end (ligature name).
  final String? startIcon;

  /// Icon at the high end (ligature name).
  final String? endIcon;

  /// Text after the track, for example "5 km".
  final String? valueLabel;

  /// Formats the value announced by screen readers.
  final String Function(double value)? semanticFormatter;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final slider = SliderTheme(
      data: ldsFormsSliderTheme(context),
      child: Semantics(
        label: semanticLabel,
        child: Slider(
          value: value.clamp(min, max),
          min: min,
          max: max,
          divisions: divisions,
          onChanged: onChanged,
          onChangeEnd: onChangeEnd,
          semanticFormatterCallback: semanticFormatter,
        ),
      ),
    );
    if (startIcon == null && endIcon == null && valueLabel == null) {
      return slider;
    }
    return Row(
      children: [
        if (startIcon != null) LdsIcon(startIcon!, color: c.textMuted),
        Expanded(child: slider),
        if (endIcon != null) LdsIcon(endIcon!, color: c.textMuted),
        if (valueLabel != null) ...[
          const SizedBox(width: 14),
          ConstrainedBox(
            constraints: const BoxConstraints(minWidth: 40),
            child: ExcludeSemantics(
              child: Text(
                valueLabel!,
                textAlign: TextAlign.right,
                style: LdsType.subhead.copyWith(
                  color: c.textStrong,
                  fontWeight: FontWeight.w500,
                  fontFeatures: const [FontFeature.tabularFigures()],
                ),
              ),
            ),
          ),
        ],
      ],
    );
  }
}
