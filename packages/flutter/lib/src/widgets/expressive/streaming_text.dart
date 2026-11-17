import 'dart:ui' as ui;

import 'package:flutter/scheduler.dart';
import 'package:flutter/widgets.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';

/// An answer that arrives word by word: each new word fades in from a 3 px
/// blur, with a round caret after the last word while [streaming].
///
/// Pass the text received so far; words appended since the last build fade
/// in, words already shown stay sharp. Stream only text that is really being
/// generated; show text you already have at once.
///
/// The text is a live region that is announced once, whole, when streaming
/// ends (the `aria-busy` pattern). Under reduced motion words appear at once
/// and the caret does not blink.
class LdsStreamingText extends StatefulWidget {
  /// Creates streaming text.
  const LdsStreamingText({
    super.key,
    required this.text,
    this.streaming = false,
    this.style,
  });

  /// The text received so far.
  final String text;

  /// Whether more words are coming; shows the caret.
  final bool streaming;

  /// Text style, merged over [LdsType.body] in the default text color.
  final TextStyle? style;

  /// A stream of [text] growing by one word every [wordDelay], for demos
  /// and for text that arrives in one piece but should read as generated.
  /// With [instant] (pass `context.ldsReduceMotion`) the whole text comes
  /// at once.
  static Stream<String> wordStream(
    String text, {
    Duration wordDelay = const Duration(milliseconds: 40),
    bool instant = false,
  }) async* {
    if (instant) {
      yield text;
      return;
    }
    final words = RegExp(r'\S+\s*').allMatches(text).toList();
    for (final m in words) {
      await Future<void>.delayed(wordDelay);
      yield text.substring(0, m.end);
    }
  }

  @override
  State<LdsStreamingText> createState() => _LdsStreamingTextState();
}

class _LdsStreamingTextState extends State<LdsStreamingText>
    with SingleTickerProviderStateMixin {
  static const int _wordMs = 360;
  late final Ticker _ticker = createTicker(_tick);
  Duration _now = Duration.zero;
  Duration _base = Duration.zero;
  final List<Duration> _arrivals = [];
  List<RegExpMatch> _words = const [];
  String _prefix = '';

  @override
  void initState() {
    super.initState();
    _parse(initial: true);
    _maybeRun();
  }

  @override
  void didUpdateWidget(LdsStreamingText oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.text != widget.text) {
      if (!widget.text.startsWith(oldWidget.text)) _arrivals.clear();
      _parse();
    }
    _maybeRun();
  }

  void _parse({bool initial = false}) {
    final words = RegExp(r'\S+\s*').allMatches(widget.text).toList();
    _prefix = words.isEmpty
        ? widget.text
        : widget.text.substring(0, words.first.start);
    // Text present on the first build is shown sharp.
    final arrival = initial && !widget.streaming
        ? _clock - const Duration(milliseconds: _wordMs)
        : _clock;
    while (_arrivals.length < words.length) {
      _arrivals.add(arrival);
    }
    if (_arrivals.length > words.length) {
      _arrivals.removeRange(words.length, _arrivals.length);
    }
    _words = words;
  }

  Duration get _clock => _base + _now;

  bool get _fading =>
      _arrivals.isNotEmpty &&
      (_clock - _arrivals.last).inMilliseconds < _wordMs;

  void _maybeRun() {
    final run = widget.streaming || _fading;
    if (run && !_ticker.isActive) {
      _ticker.start();
    } else if (!run && _ticker.isActive) {
      _base += _now;
      _now = Duration.zero;
      _ticker.stop();
    }
  }

  void _tick(Duration elapsed) {
    setState(() => _now = elapsed);
    if (!widget.streaming && !_fading) {
      _base += _now;
      _now = Duration.zero;
      _ticker.stop();
    }
  }

  @override
  void dispose() {
    _ticker.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final reduce = context.ldsReduceMotion;
    final style = LdsType.body
        .copyWith(color: c.textDefault, height: 23 / 15)
        .merge(widget.style);
    final color = style.color ?? c.textDefault;
    final spans = <InlineSpan>[TextSpan(text: _prefix)];
    for (var i = 0; i < _words.length; i++) {
      final age = (_clock - _arrivals[i]).inMilliseconds;
      final p = reduce
          ? 1.0
          : LdsMotion.enterCurve.transform((age / _wordMs).clamp(0.0, 1.0));
      final word = _words[i][0]!;
      if (p >= 1) {
        spans.add(TextSpan(text: word));
        continue;
      }
      final blur = 3 * (1 - p);
      spans.add(TextSpan(
        text: word,
        style: TextStyle(
          foreground: Paint()
            ..color = color.withValues(alpha: color.a * p)
            ..maskFilter = blur > 0.01
                ? ui.MaskFilter.blur(BlurStyle.normal, blur)
                : null,
        ),
      ));
    }
    if (widget.streaming) {
      final blinkOn = reduce || (_clock.inMilliseconds ~/ 500).isEven;
      spans.add(WidgetSpan(
        alignment: PlaceholderAlignment.middle,
        child: Padding(
          padding: const EdgeInsets.only(left: 4),
          child: Opacity(
            opacity: blinkOn ? 1 : 0,
            child: DecoratedBox(
              decoration:
                  BoxDecoration(color: c.textStrong, shape: BoxShape.circle),
              child: const SizedBox.square(dimension: 8),
            ),
          ),
        ),
      ));
    }
    return Semantics(
      container: true,
      liveRegion: !widget.streaming,
      label: widget.streaming ? null : widget.text,
      excludeSemantics: !widget.streaming,
      child: Text.rich(TextSpan(style: style, children: spans)),
    );
  }
}
