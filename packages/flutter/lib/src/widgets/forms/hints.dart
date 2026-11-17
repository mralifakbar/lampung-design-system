import 'package:flutter/material.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../icon.dart';
import '../pressable.dart';

/// A short tip that teaches a shortcut or a gesture: "Geser baris ke kiri
/// untuk mengarsipkan laporan."
///
/// Show it on the first few visits only and retire it for good once
/// closed: count visits and store the closed state in your app (for
/// example in shared preferences) and pass [visible]. Closing collapses
/// its space, then calls [onClose]. One hint per screen at most; never for
/// errors or announcements.
class LdsHint extends StatefulWidget {
  /// Creates a hint.
  const LdsHint({
    super.key,
    required this.message,
    this.icon = 'lightbulb',
    this.onClose,
    this.visible = true,
    this.closeLabel = 'Sembunyikan petunjuk',
  });

  /// One sentence; bold the key words with a [TextSpan] of weight 600.
  final InlineSpan message;

  /// Leading icon (ligature name), for example `touch_app` or `search`.
  final String icon;

  /// Called after the hint closes. Null hides the close button.
  final VoidCallback? onClose;

  /// Whether the hint shows. Changing it to false collapses it.
  final bool visible;

  /// Close button label for screen readers.
  final String closeLabel;

  @override
  State<LdsHint> createState() => _LdsHintState();
}

class _LdsHintState extends State<LdsHint> {
  late bool _open = widget.visible;

  @override
  void didUpdateWidget(LdsHint oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.visible != oldWidget.visible) _open = widget.visible;
  }

  void _close() => setState(() => _open = false);

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final hint = Semantics(
      container: true,
      child: Container(
        padding: EdgeInsets.fromLTRB(14, widget.onClose == null ? 12 : 0, 4,
            widget.onClose == null ? 12 : 0),
        decoration: BoxDecoration(
          color: c.accentTint,
          borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.md)),
        ),
        child: Row(
          children: [
            Padding(
              padding: const EdgeInsets.only(top: 1),
              child: LdsIcon(widget.icon, size: 18, color: c.accentText),
            ),
            const SizedBox(width: 10),
            Expanded(
              child: Padding(
                padding: EdgeInsets.symmetric(
                    vertical: widget.onClose == null ? 0 : 12),
                child: Text.rich(
                  widget.message,
                  style: LdsType.subhead.copyWith(
                    fontSize: 13.5,
                    height: 19 / 13.5,
                    color: c.accentText,
                  ),
                ),
              ),
            ),
            if (widget.onClose != null) ...[
              const SizedBox(width: 6),
              LdsPressable(
                onPressed: _close,
                pressedScale: 0.88,
                semanticLabel: widget.closeLabel,
                excludeChildSemantics: true,
                borderRadius: const BorderRadius.all(Radius.circular(8)),
                builder: (context, state) => Container(
                  width: 28,
                  height: 28,
                  alignment: Alignment.center,
                  decoration: BoxDecoration(
                    color: state.hovered || state.pressed
                        ? c.accentTintStrong
                        : null,
                    borderRadius: const BorderRadius.all(Radius.circular(8)),
                  ),
                  child: LdsIcon('close', size: 16, color: c.accentText),
                ),
              ),
            ],
          ],
        ),
      ),
    );

    return ClipRect(
      child: AnimatedAlign(
        alignment: Alignment.topCenter,
        heightFactor: _open ? 1 : 0,
        duration: context.ldsDuration(
            _open ? LdsMotion.smoothSpringDuration : LdsMotion.exit),
        curve: _open ? LdsSpringCurve.smooth : LdsMotion.exitCurve,
        onEnd: () {
          if (!_open && widget.visible) widget.onClose?.call();
        },
        child: AnimatedOpacity(
          opacity: _open ? 1 : 0,
          duration: context.ldsDuration(LdsMotion.exit),
          child: ExcludeFocus(excluding: !_open, child: hint),
        ),
      ),
    );
  }
}
