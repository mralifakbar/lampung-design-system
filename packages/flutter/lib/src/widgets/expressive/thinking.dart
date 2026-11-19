import 'package:flutter/scheduler.dart';
import 'package:flutter/widgets.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import 'haptics.dart';
import 'shimmer.dart';
import 'text_morph.dart';

/// Work of unknown length: a dot-grid wave, a shimmering label and an
/// honest elapsed timer. When [done] turns true the dots turn green, the
/// shimmer settles and the label morphs into the result.
///
/// Name the work in [label] ("Memeriksa jadwal Anda") and, when done, say
/// the result ("Ditemukan 3 slot kosong"), not only "Selesai". The row is a
/// polite live region. Under reduced motion the dots stop at 60 % and the
/// shimmer stops; the timer still counts because it is information.
class LdsThinking extends StatefulWidget {
  /// Creates a thinking row.
  const LdsThinking({
    super.key,
    required this.label,
    this.done = false,
    this.startedAt,
    this.showTimer = true,
  });

  /// What is being worked on, or the result once [done].
  final String label;

  /// Whether the work has finished.
  final bool done;

  /// When the work started; defaults to when this widget was first built.
  final DateTime? startedAt;

  /// Show the elapsed time, for waits that may pass five seconds.
  final bool showTimer;

  @override
  State<LdsThinking> createState() => _LdsThinkingState();
}

class _LdsThinkingState extends State<LdsThinking>
    with SingleTickerProviderStateMixin {
  late final Ticker _ticker = createTicker(_tick);
  late final Duration _offset = widget.startedAt == null
      ? Duration.zero
      : DateTime.now().difference(widget.startedAt!);
  Duration _elapsed = Duration.zero;

  Duration get _total => _offset + _elapsed;

  @override
  void initState() {
    super.initState();
    if (!widget.done) _ticker.start();
  }

  void _tick(Duration elapsed) {
    final tenthsBefore = _total.inMilliseconds ~/ 100;
    _elapsed = elapsed;
    // Under reduced motion only the timer changes, ten times a second.
    if (!context.ldsReduceMotion ||
        _total.inMilliseconds ~/ 100 != tenthsBefore) {
      setState(() {});
    }
  }

  @override
  void didUpdateWidget(LdsThinking oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.done && !oldWidget.done) {
      _ticker.stop();
      LdsHaptics.success();
    } else if (!widget.done && oldWidget.done) {
      _elapsed = Duration.zero;
      _ticker.start();
    }
  }

  @override
  void dispose() {
    _ticker.dispose();
    super.dispose();
  }

  double _dotOpacity(int row, int col, bool reduce) {
    if (widget.done) return 1;
    if (reduce) return 0.6;
    final t = _elapsed.inMilliseconds - (row + col) * 90;
    if (t < 0) return 0.12;
    final phase = (t % 1200) / 1200;
    // 0.12 -> 1 at 45 % -> 0.12, each half on the in-out curve.
    final p = phase < 0.45
        ? LdsMotion.inoutCurve.transform(phase / 0.45)
        : 1 - LdsMotion.inoutCurve.transform((phase - 0.45) / 0.55);
    return 0.12 + 0.88 * p;
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final reduce = context.ldsReduceMotion;
    final dotColor = widget.done ? c.success : c.accent;
    final grid = ExcludeSemantics(
      child: SizedBox.square(
        dimension: 16,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            for (var r = 0; r < 3; r++)
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  for (var col = 0; col < 3; col++)
                    Opacity(
                      opacity: _dotOpacity(r, col, reduce),
                      child: DecoratedBox(
                        decoration: BoxDecoration(
                          color: dotColor,
                          shape: BoxShape.circle,
                        ),
                        child: const SizedBox.square(dimension: 4),
                      ),
                    ),
                ],
              ),
          ],
        ),
      ),
    );
    final seconds = _total.inMilliseconds / 1000;
    return Semantics(
      container: true,
      liveRegion: true,
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          grid,
          const SizedBox(width: 10),
          Flexible(
            child: LdsShimmer(
              active: !widget.done,
              child: LdsTextMorph(
                widget.label,
                style: LdsType.subhead.copyWith(
                  fontWeight: FontWeight.w500,
                  height: 20 / 14,
                ),
              ),
            ),
          ),
          if (widget.showTimer) ...[
            const SizedBox(width: 10),
            ExcludeSemantics(
              child: Text(
                '${seconds.toStringAsFixed(1).replaceAll('.', ',')} dtk',
                style: TextStyle(
                  fontFamily: LdsType.mono,
                  fontSize: 12,
                  height: 1,
                  fontWeight: FontWeight.w500,
                  fontFeatures: const [FontFeature.tabularFigures()],
                  color: widget.done ? c.textSubtle : c.textMuted,
                ),
              ),
            ),
          ],
        ],
      ),
    );
  }
}
