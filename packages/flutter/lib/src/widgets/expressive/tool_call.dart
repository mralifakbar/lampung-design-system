import 'package:material_ui/material_ui.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../icon.dart';
import '../pressable.dart';
import 'shimmer.dart';

/// Where an [LdsToolCall] step stands.
enum LdsToolCallStatus {
  /// Still running: a spinner and a shimmering label.
  running,

  /// Finished: a result icon and a label that names what it found.
  done,

  /// Failed: a plain icon and the reason in words, no red fill.
  failed,
}

/// One step the assistant took on the way to its answer ("Mencari di
/// catatan Anda"), as a quiet one-line row that opens to what it found.
///
/// Put steps above the answer in the order they ran, closed by default; the
/// answer stays the main thing. The label must say the step and its object
/// on its own. The chevron turns on the smooth spring; the body shows at
/// once. Under reduced motion the shimmer stops and the chevron turns in
/// 120 ms; the spinner keeps turning because it reports work.
class LdsToolCall extends StatefulWidget {
  /// Creates a tool call row.
  const LdsToolCall({
    super.key,
    required this.label,
    this.icon = 'check_circle',
    this.status = LdsToolCallStatus.done,
    this.body,
    this.initiallyOpen = false,
    this.onExpansionChanged,
  });

  /// The step in words.
  final String label;

  /// Leading icon once the step is not running (`search`, `description`,
  /// `check_circle`, `cloud_off`).
  final String icon;

  /// Running, done or failed.
  final LdsToolCallStatus status;

  /// What the step found or did: a sentence, a list or code.
  final Widget? body;

  /// Whether the row starts open.
  final bool initiallyOpen;

  /// Called when the row opens or closes.
  final ValueChanged<bool>? onExpansionChanged;

  @override
  State<LdsToolCall> createState() => _LdsToolCallState();
}

class _LdsToolCallState extends State<LdsToolCall> {
  late bool _open = widget.initiallyOpen;

  void _toggle() {
    setState(() => _open = !_open);
    widget.onExpansionChanged?.call(_open);
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final running = widget.status == LdsToolCallStatus.running;
    const radius = BorderRadius.all(Radius.circular(LdsRadius.md));
    final canOpen = widget.body != null;
    final summary = LdsPressable(
      onPressed: canOpen ? _toggle : null,
      pressedScale: 1,
      semanticLabel: widget.label,
      excludeChildSemantics: true,
      mouseCursor: canOpen
          ? SystemMouseCursors.click
          : SystemMouseCursors.basic,
      builder: (context, state) => AnimatedContainer(
        duration: context.ldsDuration(LdsMotion.fast),
        constraints: const BoxConstraints(minHeight: LdsSize.touchMin),
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        decoration: BoxDecoration(
          borderRadius: radius,
          color: state.hovered ? c.bgTint : Colors.transparent,
        ),
        child: Row(
          children: [
            SizedBox.square(
              dimension: 17,
              child: running
                  ? Padding(
                      padding: const EdgeInsets.all(1.5),
                      child: CircularProgressIndicator(
                        strokeWidth: 2,
                        color: c.textSubtle,
                        backgroundColor: Colors.transparent,
                      ),
                    )
                  : LdsIcon(widget.icon, size: 17, color: c.textSubtle),
            ),
            const SizedBox(width: 8),
            Expanded(
              child: LdsShimmer(
                active: running,
                child: Text(widget.label, style: LdsType.subhead),
              ),
            ),
            if (canOpen) ...[
              const SizedBox(width: 8),
              AnimatedRotation(
                turns: _open ? 0.5 : 0,
                duration: context.ldsReduceMotion
                    ? LdsMotion.instant
                    : LdsMotion.smoothSpringDuration,
                curve: context.ldsReduceMotion
                    ? Curves.linear
                    : LdsSpringCurve.smooth,
                child: LdsIcon('expand_more', size: 17, color: c.textSubtle),
              ),
            ],
          ],
        ),
      ),
    );
    return Semantics(
      container: true,
      expanded: canOpen ? _open : null,
      child: DecoratedBox(
        decoration: BoxDecoration(color: c.bgFill, borderRadius: radius),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          mainAxisSize: MainAxisSize.min,
          children: [
            summary,
            if (_open && widget.body != null)
              Padding(
                padding: const EdgeInsets.fromLTRB(12, 0, 12, 12),
                child: DefaultTextStyle.merge(
                  style: LdsType.subhead.copyWith(color: c.textDefault),
                  child: widget.body!,
                ),
              ),
          ],
        ),
      ),
    );
  }
}
