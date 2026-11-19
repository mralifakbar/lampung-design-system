import 'package:material_ui/material_ui.dart';

import '../motion.dart';
import '../theme.dart';
import '../tokens.g.dart';

/// A placeholder block that mirrors the layout of content still loading.
///
/// A soft shine sweeps across it; with reduced motion it stays still. It is
/// hidden from screen readers; give the loading region a label instead, for
/// example with [semanticLabel] on one skeleton of the group.
class LdsSkeleton extends StatefulWidget {
  /// Creates a rectangular skeleton.
  const LdsSkeleton({
    super.key,
    this.width,
    this.height = 16,
    this.borderRadius = const BorderRadius.all(Radius.circular(LdsRadius.sm)),
    this.semanticLabel,
  });

  /// Creates a round skeleton, for an avatar or icon.
  const LdsSkeleton.circle({super.key, double size = 40, this.semanticLabel})
    : width = size,
      height = size,
      borderRadius = const BorderRadius.all(Radius.circular(999));

  /// Width; null fills the available width.
  final double? width;

  /// Height.
  final double height;

  /// Corner radius.
  final BorderRadius borderRadius;

  /// Announced once, for example "Memuat layanan".
  final String? semanticLabel;

  @override
  State<LdsSkeleton> createState() => _LdsSkeletonState();
}

class _LdsSkeletonState extends State<LdsSkeleton>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller = AnimationController(
    vsync: this,
    duration: const Duration(milliseconds: 1600),
  );

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (context.ldsReduceMotion) {
      _controller.stop();
    } else if (!_controller.isAnimating) {
      _controller.repeat();
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final reduce = context.ldsReduceMotion;
    Widget block = Container(
      width: widget.width,
      height: widget.height,
      decoration: BoxDecoration(
        color: c.bgSkeleton,
        borderRadius: widget.borderRadius,
      ),
    );
    if (!reduce) {
      block = ClipRRect(
        borderRadius: widget.borderRadius,
        child: AnimatedBuilder(
          animation: _controller,
          builder: (context, child) {
            final t = LdsMotion.inoutCurve.transform(_controller.value);
            return Stack(
              children: [
                child!,
                Positioned.fill(
                  child: FractionalTranslation(
                    translation: Offset(-1 + 2 * t, 0),
                    child: DecoratedBox(
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          colors: [
                            c.skeletonShine.withAlpha(0),
                            c.skeletonShine,
                            c.skeletonShine.withAlpha(0),
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            );
          },
          child: block,
        ),
      );
    }
    if (widget.semanticLabel != null) {
      return Semantics(
        label: widget.semanticLabel,
        excludeSemantics: true,
        child: block,
      );
    }
    return ExcludeSemantics(child: block);
  }
}
