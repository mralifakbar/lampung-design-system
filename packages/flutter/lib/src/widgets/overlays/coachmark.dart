import 'dart:math' as math;

import 'package:material_ui/material_ui.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import 'inverse_button.dart';

/// An inverse card that points at one part of the interface with a short
/// explanation. Used by [LdsCoachmarkTour]; it can also be placed by hand.
class LdsCoachmark extends StatelessWidget {
  /// Creates a coachmark card.
  const LdsCoachmark({
    super.key,
    required this.title,
    required this.nextLabel,
    required this.onNext,
    this.body,
    this.step,
    this.skipLabel,
    this.onSkip,
    this.arrowOffset = 24,
    this.arrowOnTop = true,
    this.nextFocusNode,
  });

  /// What this is, in a few words.
  final String title;

  /// One sentence: why it helps.
  final String? body;

  /// "Langkah 1 dari 3".
  final String? step;

  /// Next or Done.
  final String nextLabel;

  /// Called by Next.
  final VoidCallback onNext;

  /// Skip; shown when [onSkip] is set.
  final String? skipLabel;

  /// Ends the tour early.
  final VoidCallback? onSkip;

  /// Distance of the arrow from the start edge; it glides when it changes.
  final double arrowOffset;

  /// Arrow on the top edge (card below its target) or on the bottom edge.
  final bool arrowOnTop;

  /// Focus node of the Next button.
  final FocusNode? nextFocusNode;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final arrow = AnimatedPositionedDirectional(
      duration: context.ldsDuration(LdsMotion.smooth),
      curve: LdsSpringCurve.smooth,
      start: arrowOffset,
      top: arrowOnTop ? -6 : null,
      bottom: arrowOnTop ? null : -6,
      child: Transform.rotate(
        angle: math.pi / 4,
        child: Container(
          width: 12,
          height: 12,
          decoration: BoxDecoration(
            color: c.bgInverse,
            borderRadius: const BorderRadius.all(Radius.circular(2)),
          ),
        ),
      ),
    );
    final text = c.textInverse;
    return Semantics(
      container: true,
      explicitChildNodes: true,
      label: title,
      child: Stack(
        clipBehavior: Clip.none,
        children: [
          arrow,
          Container(
            width: 280,
            padding: const EdgeInsets.all(LdsSpace.s16),
            decoration: BoxDecoration(
              color: c.bgInverse,
              borderRadius: const BorderRadius.all(
                Radius.circular(LdsRadius.lg),
              ),
              boxShadow: context.ldsShadows.lg,
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                if (step != null)
                  Text(
                    step!,
                    style: LdsType.footnote.copyWith(
                      color: text.withValues(alpha: 0.7),
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                Padding(
                  padding: const EdgeInsets.only(top: 4),
                  child: Text(
                    title,
                    style: LdsType.bodyStrong.copyWith(
                      color: text,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
                if (body != null)
                  Padding(
                    padding: const EdgeInsets.only(top: 4),
                    child: Text(
                      body!,
                      style: LdsType.footnote.copyWith(
                        color: text.withValues(alpha: 0.82),
                      ),
                    ),
                  ),
                const SizedBox(height: 6),
                Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    if (onSkip != null && skipLabel != null)
                      LdsInverseButton(label: skipLabel!, onPressed: onSkip),
                    const SizedBox(width: 8),
                    LdsInverseButton(
                      label: nextLabel,
                      onPressed: onNext,
                      focusNode: nextFocusNode,
                      variant: LdsInverseButtonVariant.accent,
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

/// One step of an [LdsCoachmarkTour].
@immutable
class LdsCoachmarkStep {
  /// Creates a tour step.
  const LdsCoachmarkStep({
    required this.target,
    required this.title,
    this.body,
  });

  /// Key of the widget the step points at.
  final GlobalKey target;

  /// What the target is.
  final String title;

  /// Why it helps, in one sentence.
  final String? body;
}

/// A tour of at most three [LdsCoachmark]s over [child]. Always skippable;
/// Escape skips. The page stays usable behind it: no scrim, no focus trap.
///
/// The card glides between targets on the smooth spring, and the target
/// gets an accent ring with a gap.
class LdsCoachmarkTour extends StatefulWidget {
  /// Creates a tour.
  const LdsCoachmarkTour({
    super.key,
    required this.child,
    required this.steps,
    required this.active,
    required this.onFinish,
    this.stepLabel,
    this.nextLabel = 'Next',
    this.doneLabel = 'Done',
    this.skipLabel = 'Skip',
  });

  /// The screen the tour explains.
  final Widget child;

  /// The steps, in order.
  final List<LdsCoachmarkStep> steps;

  /// Whether the tour shows.
  final bool active;

  /// Called with true after the last step, false when skipped.
  final ValueChanged<bool> onFinish;

  /// Builds "Step 1 of 3" from a 1-based index and the total.
  final String Function(int step, int total)? stepLabel;

  /// Label of the Next button.
  final String nextLabel;

  /// Label of the Next button on the last step.
  final String doneLabel;

  /// Label of the Skip button.
  final String skipLabel;

  @override
  State<LdsCoachmarkTour> createState() => _LdsCoachmarkTourState();
}

class _LdsCoachmarkTourState extends State<LdsCoachmarkTour> {
  final OverlayPortalController _portal = OverlayPortalController();
  final FocusNode _next = FocusNode(debugLabel: 'coachmark next');
  int _index = 0;

  @override
  void initState() {
    super.initState();
    if (widget.active) _start();
  }

  @override
  void didUpdateWidget(LdsCoachmarkTour oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.active != oldWidget.active) {
      if (widget.active) {
        _index = 0;
        _start();
      } else {
        _portal.hide();
      }
    }
  }

  void _start() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted || !widget.active) return;
      _portal.show();
      setState(() {});
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (mounted) _next.requestFocus();
      });
    });
  }

  @override
  void dispose() {
    _next.dispose();
    super.dispose();
  }

  void _finish(bool completed) {
    _portal.hide();
    final target = widget.steps[_index].target.currentContext;
    if (target != null) Focus.maybeOf(target)?.requestFocus();
    widget.onFinish(completed);
  }

  void _advance() {
    if (_index >= widget.steps.length - 1) {
      _finish(true);
    } else {
      setState(() => _index++);
    }
  }

  Widget _buildLayer(BuildContext context) {
    final overlay =
        Overlay.of(context).context.findRenderObject() as RenderBox?;
    final step = widget.steps[_index];
    final box = step.target.currentContext?.findRenderObject() as RenderBox?;
    if (overlay == null || box == null || !box.attached || !box.hasSize) {
      return const SizedBox.shrink();
    }
    final rect = box.localToGlobal(Offset.zero, ancestor: overlay) & box.size;
    final size = overlay.size;
    final c = context.lds;
    final d = context.ldsDuration(LdsMotion.smooth);
    final curve = LdsSpringCurve.smooth;
    const cardWidth = 280.0;
    final double left = rect.left.clamp(
      8.0,
      math.max(8.0, size.width - cardWidth - 8),
    );
    final below = rect.bottom + 160 < size.height;
    final ring = rect.inflate(4);
    final total = widget.steps.length;
    final last = _index == total - 1;
    return Stack(
      children: [
        AnimatedPositioned(
          duration: d,
          curve: curve,
          left: ring.left,
          top: ring.top,
          width: ring.width,
          height: ring.height,
          child: IgnorePointer(
            child: DecoratedBox(
              decoration: BoxDecoration(
                borderRadius: const BorderRadius.all(
                  Radius.circular(LdsRadius.md),
                ),
                border: Border.all(color: c.accent, width: 2),
              ),
            ),
          ),
        ),
        AnimatedPositioned(
          duration: d,
          curve: curve,
          left: left,
          top: below ? rect.bottom + 12 : null,
          bottom: below ? null : size.height - rect.top + 12,
          child: Actions(
            actions: <Type, Action<Intent>>{
              DismissIntent: CallbackAction<DismissIntent>(
                onInvoke: (_) {
                  _finish(false);
                  return null;
                },
              ),
            },
            child: LdsCoachmark(
              step:
                  widget.stepLabel?.call(_index + 1, total) ??
                  'Step ${_index + 1} of $total',
              title: step.title,
              body: step.body,
              nextLabel: last ? widget.doneLabel : widget.nextLabel,
              onNext: _advance,
              skipLabel: last ? null : widget.skipLabel,
              onSkip: last ? null : () => _finish(false),
              nextFocusNode: _next,
              arrowOnTop: below,
              arrowOffset: (rect.center.dx - left - 6).clamp(
                16.0,
                cardWidth - 28,
              ),
            ),
          ),
        ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return OverlayPortal(
      controller: _portal,
      overlayChildBuilder: _buildLayer,
      child: widget.child,
    );
  }
}
