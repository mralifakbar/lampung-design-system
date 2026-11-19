import 'package:material_ui/material_ui.dart';

import '../../theme.dart';
import '../../tokens.g.dart';
import 'parts.dart';

/// Two thumbs on one track for a minimum and a maximum, with the accent
/// fill between them: rentang usia, rentang biaya. The thumbs never cross.
class LdsRangeSlider extends StatelessWidget {
  /// Creates a range slider.
  const LdsRangeSlider({
    super.key,
    required this.values,
    required this.onChanged,
    required this.semanticLabel,
    this.min = 0,
    this.max = 1,
    this.divisions,
    this.onChangeEnd,
    this.labelBuilder,
  });

  /// The chosen span.
  final RangeValues values;

  /// Called while dragging. Null disables it.
  final ValueChanged<RangeValues>? onChanged;

  /// Called when a drag ends.
  final ValueChanged<RangeValues>? onChangeEnd;

  /// What the slider sets, for screen readers.
  final String semanticLabel;

  /// Lowest value.
  final double min;

  /// Highest value.
  final double max;

  /// Number of steps; null is continuous.
  final int? divisions;

  /// Formats a value for the min and max labels under the track and for
  /// screen readers. Null hides the labels.
  final String Function(double value)? labelBuilder;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final v = RangeValues(
      values.start.clamp(min, max),
      values.end.clamp(min, max),
    );
    final slider = SliderTheme(
      data: ldsFormsSliderTheme(context),
      child: Semantics(
        label: semanticLabel,
        child: RangeSlider(
          values: v,
          min: min,
          max: max,
          divisions: divisions,
          onChanged: onChanged,
          onChangeEnd: onChangeEnd,
          semanticFormatterCallback: labelBuilder,
        ),
      ),
    );
    if (labelBuilder == null) return slider;
    final style = LdsType.subhead.copyWith(
      color: c.textStrong,
      fontWeight: FontWeight.w500,
      fontFeatures: const [FontFeature.tabularFigures()],
    );
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      mainAxisSize: MainAxisSize.min,
      children: [
        slider,
        ExcludeSemantics(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 8),
            child: Row(
              children: [
                Text(labelBuilder!(v.start), style: style),
                const Spacer(),
                Text(labelBuilder!(v.end), style: style),
              ],
            ),
          ),
        ),
      ],
    );
  }
}
