import 'package:material_ui/material_ui.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../button.dart';
import '../icon.dart';
import 'inverse_button.dart';

/// One inverse line about the whole app: offline, maintenance, viewing as
/// someone else. It says the condition and offers at most one action.
///
/// Toggle [visible] to let it open or close its height on the smooth
/// spring; content below follows. It is calm: no slide and no pulse.
class LdsBanner extends StatefulWidget {
  /// Creates a banner.
  const LdsBanner({
    super.key,
    required this.message,
    this.icon,
    this.actionLabel,
    this.onAction,
    this.onClose,
    this.closeLabel = 'Close',
    this.visible = true,
  });

  /// One sentence.
  final String message;

  /// Leading icon that names the condition (`cloud_off`, `schedule`).
  final String? icon;

  /// Label of the single action.
  final String? actionLabel;

  /// Called by the action.
  final VoidCallback? onAction;

  /// Shows a close button.
  final VoidCallback? onClose;

  /// Label of the close button.
  final String closeLabel;

  /// Whether the banner shows.
  final bool visible;

  @override
  State<LdsBanner> createState() => _LdsBannerState();
}

class _LdsBannerState extends State<LdsBanner>
    with SingleTickerProviderStateMixin {
  late final AnimationController _anim = AnimationController(
    vsync: this,
    value: widget.visible ? 1 : 0,
  );
  late final CurvedAnimation _size = CurvedAnimation(
    parent: _anim,
    curve: LdsSpringCurve.smooth,
  );

  @override
  void didUpdateWidget(LdsBanner oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.visible != widget.visible) {
      final d = context.ldsReduceMotion ? LdsMotion.instant : LdsMotion.smooth;
      _anim.duration = d;
      _anim.reverseDuration = d;
      widget.visible ? _anim.forward() : _anim.reverse();
    }
  }

  @override
  void dispose() {
    _size.dispose();
    _anim.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final banner = Container(
      constraints: const BoxConstraints(minHeight: 44),
      padding: EdgeInsetsDirectional.fromSTEB(
        16,
        6,
        widget.onClose != null ? 4 : 8,
        6,
      ),
      decoration: BoxDecoration(
        color: c.bgInverse,
        borderRadius: const BorderRadius.all(Radius.circular(14)),
      ),
      child: Row(
        children: [
          if (widget.icon != null) ...[
            LdsIcon(widget.icon!, color: c.textInverse),
            const SizedBox(width: 12),
          ],
          Expanded(
            child: Padding(
              padding: const EdgeInsets.symmetric(vertical: 4),
              child: Text(
                widget.message,
                style: LdsType.subhead.copyWith(
                  color: c.textInverse,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ),
          ),
          if (widget.actionLabel != null) ...[
            const SizedBox(width: 8),
            LdsInverseButton(
              label: widget.actionLabel!,
              onPressed: widget.onAction,
              height: 28,
            ),
          ],
          if (widget.onClose != null)
            LdsIconButton(
              icon: 'close',
              semanticLabel: widget.closeLabel,
              onPressed: widget.onClose,
              color: c.textInverse,
            ),
        ],
      ),
    );
    return AnimatedBuilder(
      animation: _anim,
      builder: (context, child) {
        if (_anim.isDismissed) return const SizedBox.shrink();
        return ClipRect(
          child: Align(
            alignment: Alignment.topCenter,
            heightFactor: _size.value.clamp(0.0, 1.0),
            child: Opacity(opacity: _anim.value, child: child),
          ),
        );
      },
      child: Semantics(container: true, liveRegion: true, child: banner),
    );
  }
}
