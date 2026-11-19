import 'package:flutter/widgets.dart';

import '../../theme.dart';
import '../../tokens.g.dart';

/// The proof beside a feature: live components on the quiet fill, 22 px
/// corners. Surfaces placed directly on it should use the base color, never
/// a fill on a fill. Also usable on its own, for example in an [LdsHero].
class LdsFeatureStage extends StatelessWidget {
  /// Creates a feature stage.
  const LdsFeatureStage({super.key, required this.child, this.flush = false});

  /// The live feature.
  final Widget child;

  /// No padding, for one full-bleed component.
  final bool flush;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    return LayoutBuilder(
      builder: (context, constraints) {
        final pad = flush
            ? 0.0
            : (constraints.maxWidth * 0.03).clamp(LdsSpace.s16, LdsSpace.s32);
        return ClipRRect(
          borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.xl)),
          child: ColoredBox(
            color: c.bgFill,
            child: Padding(padding: EdgeInsets.all(pad), child: child),
          ),
        );
      },
    );
  }
}
