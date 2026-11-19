import 'package:flutter/services.dart';
import 'package:material_ui/material_ui.dart';

import '../../theme.dart';
import '../../tokens.g.dart';
import '_chart_utils.dart';

/// How one period of [LdsUptimeBars] went.
enum LdsUptimeStatus {
  /// No data for this period: track color.
  none,

  /// No issues: success.
  ok,

  /// Degraded: warning.
  warn,

  /// Down: danger.
  down,
}

/// One thin bar per day (or hour) in a row, colored by how that period
/// went: no issues, degraded, or down.
///
/// The pattern of incidents over 90 days reads at a glance. Pointing at a
/// bar, tapping it, or the arrow keys put its [labels] entry in the readout
/// line; at rest the readout shows [summary].
class LdsUptimeBars extends StatefulWidget {
  /// Creates uptime bars.
  const LdsUptimeBars({
    super.key,
    required this.statuses,
    required this.semanticLabel,
    this.labels,
    this.summary,
    this.startLabel,
    this.endLabel,
    this.height = 32,
  });

  /// One status per period, oldest first.
  final List<LdsUptimeStatus> statuses;

  /// The overall figure ("Situs layanan, 90 hari terakhir: 99,97% aktif").
  final String semanticLabel;

  /// Per period, what happened ("Rab 19 Agu: tanpa gangguan").
  final List<String>? labels;

  /// The readout at rest: the current state.
  final String? summary;

  /// Start of the axis ("90 hari lalu").
  final String? startLabel;

  /// End of the axis ("Hari ini").
  final String? endLabel;

  /// Height of the bars.
  final double height;

  @override
  State<LdsUptimeBars> createState() => _LdsUptimeBarsState();
}

class _LdsUptimeBarsState extends State<LdsUptimeBars> {
  int? _active;
  final FocusNode _focus = FocusNode(debugLabel: 'LdsUptimeBars');

  @override
  void dispose() {
    _focus.dispose();
    super.dispose();
  }

  KeyEventResult _onKey(FocusNode node, KeyEvent e) {
    if (e is! KeyDownEvent && e is! KeyRepeatEvent) {
      return KeyEventResult.ignored;
    }
    final n = widget.statuses.length;
    if (n == 0) return KeyEventResult.ignored;
    final k = e.logicalKey;
    int? next;
    if (k == LogicalKeyboardKey.arrowRight) {
      next = _active == null ? n - 1 : (_active! + 1).clamp(0, n - 1);
    } else if (k == LogicalKeyboardKey.arrowLeft) {
      next = _active == null ? n - 1 : (_active! - 1).clamp(0, n - 1);
    } else if (k == LogicalKeyboardKey.home) {
      next = 0;
    } else if (k == LogicalKeyboardKey.end) {
      next = n - 1;
    }
    if (next == null) return KeyEventResult.ignored;
    setState(() => _active = next);
    return KeyEventResult.handled;
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final w = widget;
    final labels = w.labels;
    final readout =
        _active != null && labels != null && _active! < labels.length
        ? labels[_active!]
        : w.summary;
    final style = axisStyle(c).copyWith(fontSize: 12);

    final bars = LayoutBuilder(
      builder: (context, box) {
        final n = w.statuses.length;
        int? hit(Offset p) =>
            n == 0 ? null : (p.dx / box.maxWidth * n).floor().clamp(0, n - 1);
        return MouseRegion(
          onHover: (e) => setState(() => _active = hit(e.localPosition)),
          onExit: (_) {
            if (!_focus.hasFocus) setState(() => _active = null);
          },
          child: GestureDetector(
            onTapDown: (d) => setState(() => _active = hit(d.localPosition)),
            onHorizontalDragUpdate: (d) =>
                setState(() => _active = hit(d.localPosition)),
            child: CustomPaint(
              size: Size(box.maxWidth, w.height * 1.12),
              painter: _UptimePainter(w.statuses, _active, c),
            ),
          ),
        );
      },
    );

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      mainAxisSize: MainAxisSize.min,
      children: [
        Focus(
          focusNode: _focus,
          onKeyEvent: _onKey,
          onFocusChange: (_) => setState(() {}),
          child: Semantics(
            container: true,
            focusable: true,
            image: true,
            label: w.semanticLabel,
            value: readout,
            liveRegion: _active != null,
            child: ExcludeSemantics(
              child: DecoratedBox(
                position: DecorationPosition.foreground,
                decoration: BoxDecoration(
                  borderRadius: const BorderRadius.all(
                    Radius.circular(LdsRadius.xs),
                  ),
                  border: _focus.hasFocus
                      ? Border.all(color: c.focus, width: 2)
                      : null,
                ),
                child: bars,
              ),
            ),
          ),
        ),
        if (w.startLabel != null || w.endLabel != null) ...[
          const SizedBox(height: 6),
          ExcludeSemantics(
            child: Row(
              children: [
                Text(w.startLabel ?? '', style: style),
                const Spacer(),
                Text(w.endLabel ?? '', style: style),
              ],
            ),
          ),
        ],
        if (readout != null) ...[
          const SizedBox(height: 6),
          ExcludeSemantics(
            child: Text(
              readout,
              style: LdsType.footnote.copyWith(
                color: c.textSubtle,
                fontFeatures: tabular,
              ),
            ),
          ),
        ],
      ],
    );
  }
}

class _UptimePainter extends CustomPainter {
  _UptimePainter(this.statuses, this.active, this.c);

  final List<LdsUptimeStatus> statuses;
  final int? active;
  final LdsColors c;

  @override
  void paint(Canvas canvas, Size size) {
    final n = statuses.length;
    if (n == 0) return;
    const gap = 2.0;
    final bw = ((size.width - gap * (n - 1)) / n).clamp(1.0, double.infinity);
    final h = size.height / 1.12;
    for (var i = 0; i < n; i++) {
      final color = switch (statuses[i]) {
        LdsUptimeStatus.none => c.bgTrack,
        LdsUptimeStatus.ok => c.success,
        LdsUptimeStatus.warn => c.warning,
        LdsUptimeStatus.down => c.danger,
      };
      final on = i == active;
      final bh = on ? size.height : h;
      final rect = Rect.fromLTWH(i * (bw + gap), size.height - bh, bw, bh);
      canvas.drawRRect(
        RRect.fromRectAndRadius(rect, const Radius.circular(2)),
        Paint()
          ..color = active != null && !on
              ? color.withValues(alpha: color.a * 0.45)
              : color,
      );
    }
  }

  @override
  bool shouldRepaint(_UptimePainter old) => true;
}
