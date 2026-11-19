import 'dart:async';

import 'package:material_ui/material_ui.dart';

import '../../theme.dart';
import '../../tokens.g.dart';

const List<String> _months = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', //
  'Agustus', 'September', 'Oktober', 'November', 'Desember',
];

/// A moment shown relative to now: "baru saja", "5 menit lalu",
/// "dalam 2 hari". The full date and time is in the tooltip and is what
/// screen readers hear after the relative words.
///
/// It refreshes every 15 seconds while under a minute old, then every
/// minute. The words change in place without motion.
class LdsTimestamp extends StatefulWidget {
  /// Creates a timestamp.
  const LdsTimestamp(
    this.time, {
    super.key,
    this.now,
    this.live = true,
    this.style,
  });

  /// The moment.
  final DateTime time;

  /// A fixed "now", for examples and tests. Null uses the clock.
  final DateTime? now;

  /// Refreshes the words over time. Ignored when [now] is set.
  final bool live;

  /// Overrides the text style (subtle footnote, tabular figures).
  final TextStyle? style;

  /// The relative phrase for [time] seen from [now], in Indonesian.
  static String relative(DateTime time, DateTime now) {
    final diff = now.difference(time);
    final future = diff.isNegative;
    final s = diff.inSeconds.abs();
    if (s < 45) return 'baru saja';
    String phrase;
    if (s < 90) {
      phrase = '1 menit';
    } else if (s < 45 * 60) {
      phrase = '${(s / 60).round()} menit';
    } else if (s < 22 * 3600) {
      phrase = '${(s / 3600).round().clamp(1, 24)} jam';
    } else if (s < 7 * 86400) {
      phrase = '${(s / 86400).round().clamp(1, 7)} hari';
    } else if (s < 30 * 86400) {
      phrase = '${(s / (7 * 86400)).round().clamp(1, 5)} minggu';
    } else if (s < 365 * 86400) {
      phrase = '${(s / (30 * 86400)).round().clamp(1, 12)} bulan';
    } else {
      phrase = '${(s / (365 * 86400)).round()} tahun';
    }
    return future ? 'dalam $phrase' : '$phrase lalu';
  }

  /// The full local date and time: "16 November 2026, 09.30".
  static String full(DateTime time) {
    final t = time.toLocal();
    String two(int v) => v.toString().padLeft(2, '0');
    return '${t.day} ${_months[t.month - 1]} ${t.year}, '
        '${two(t.hour)}.${two(t.minute)}';
  }

  @override
  State<LdsTimestamp> createState() => _LdsTimestampState();
}

class _LdsTimestampState extends State<LdsTimestamp> {
  Timer? _timer;

  @override
  void initState() {
    super.initState();
    _schedule();
  }

  @override
  void didUpdateWidget(LdsTimestamp oldWidget) {
    super.didUpdateWidget(oldWidget);
    _schedule();
  }

  void _schedule() {
    _timer?.cancel();
    if (!widget.live || widget.now != null) return;
    final age = DateTime.now().difference(widget.time).abs();
    final every = age < const Duration(minutes: 1)
        ? const Duration(seconds: 15)
        : const Duration(minutes: 1);
    _timer = Timer(every, () {
      if (!mounted) return;
      setState(() {});
      _schedule();
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final now = widget.now ?? DateTime.now();
    final words = LdsTimestamp.relative(widget.time, now);
    final full = LdsTimestamp.full(widget.time);
    return Tooltip(
      message: full,
      excludeFromSemantics: true,
      child: Semantics(
        label: '$words, $full',
        excludeSemantics: true,
        child: Text(
          words,
          style:
              widget.style ??
              LdsType.footnote.copyWith(
                color: c.textSubtle,
                fontFeatures: const [FontFeature.tabularFigures()],
              ),
        ),
      ),
    );
  }
}
