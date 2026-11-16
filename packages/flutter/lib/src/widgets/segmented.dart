import 'package:flutter/material.dart';

import '../motion.dart';
import '../theme.dart';
import '../tokens.g.dart';
import 'pressable.dart';

/// One option of an [LdsSegmented].
@immutable
class LdsSegment<T> {
  /// Creates an option.
  const LdsSegment({required this.value, required this.label});

  /// The value reported when this option is chosen.
  final T value;

  /// Visible text.
  final String label;
}

/// Switches between 2 to 5 views of the same content: Hari, Minggu, Bulan.
///
/// One thumb slides to the chosen option on the smooth spring. Each option
/// is a button that announces whether it is selected.
class LdsSegmented<T> extends StatelessWidget {
  /// Creates a segmented control.
  const LdsSegmented({
    super.key,
    required this.segments,
    required this.value,
    required this.onChanged,
    this.semanticLabel,
  }) : assert(segments.length >= 2 && segments.length <= 5,
            'Use 2 to 5 segments');

  /// Options, in order.
  final List<LdsSegment<T>> segments;

  /// The chosen value.
  final T value;

  /// Called with the new value. Null disables the control.
  final ValueChanged<T>? onChanged;

  /// Names the group for screen readers.
  final String? semanticLabel;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final index = segments.indexWhere((s) => s.value == value);
    final duration = context.ldsDuration(LdsMotion.smoothSpringDuration);
    const outer = BorderRadius.all(Radius.circular(10));
    const inner = BorderRadius.all(Radius.circular(LdsRadius.sm));

    return Semantics(
      container: true,
      label: semanticLabel,
      explicitChildNodes: true,
      child: Container(
        height: LdsSize.touchMin,
        padding: const EdgeInsets.all(2),
        decoration: BoxDecoration(color: c.bgSegmented, borderRadius: outer),
        child: LayoutBuilder(
          builder: (context, constraints) {
            final w = constraints.maxWidth / segments.length;
            return Stack(
              children: [
                if (index >= 0)
                  AnimatedPositionedDirectional(
                    duration: duration,
                    curve: LdsSpringCurve.smooth,
                    top: 0,
                    bottom: 0,
                    start: index * w,
                    width: w,
                    child: DecoratedBox(
                      decoration: BoxDecoration(
                        color: c.bgSegmentedThumb,
                        borderRadius: inner,
                        boxShadow: context.ldsShadows.segmentedThumb,
                      ),
                    ),
                  ),
                Row(
                  children: [
                    for (var i = 0; i < segments.length; i++)
                      Expanded(
                        child: LdsPressable(
                          onPressed: onChanged == null
                              ? null
                              : () => onChanged!(segments[i].value),
                          pressedScale: 1,
                          minSize: const Size(0, 40),
                          borderRadius: inner,
                          selected: i == index,
                          inMutuallyExclusiveGroup: true,
                          builder: (context, state) => AnimatedOpacity(
                            opacity: state.pressed ? 0.6 : 1,
                            duration: context.ldsDuration(LdsMotion.fast),
                            child: SizedBox(
                              height: 40,
                              child: Center(
                                child: Padding(
                                  padding: const EdgeInsets.symmetric(
                                      horizontal: 8),
                                  child: Text(
                                    segments[i].label,
                                    maxLines: 1,
                                    overflow: TextOverflow.ellipsis,
                                    style: LdsType.subhead.copyWith(
                                      color: onChanged == null
                                          ? c.textMuted
                                          : c.textStrong,
                                      fontWeight: i == index
                                          ? FontWeight.w600
                                          : FontWeight.w500,
                                    ),
                                  ),
                                ),
                              ),
                            ),
                          ),
                        ),
                      ),
                  ],
                ),
              ],
            );
          },
        ),
      ),
    );
  }
}
