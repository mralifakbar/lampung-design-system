import 'dart:math' as math;
import 'dart:ui' as ui;

import 'package:flutter/widgets.dart';

import '../../motion.dart';
import '../../tokens.g.dart';

/// A short phrase that changes in place, moving only the letters that
/// differ: kept letters slide to their new place, new ones rise in from a
/// blur, leaving ones blur out upward, and the width springs between the
/// two phrases.
///
/// Use it for the result of an action said in words, where the action
/// happened: "Simpan draf", "Menyimpan", "Tersimpan". Morph one to three
/// words. Changing [text] mid-morph starts from what is on screen.
///
/// Screen readers get the whole phrase, never single letters; set
/// [liveRegion] when the change should be announced. Under reduced motion
/// the phrase is replaced at once.
class LdsTextMorph extends StatefulWidget {
  /// Creates a text morph.
  const LdsTextMorph(
    this.text, {
    super.key,
    this.style,
    this.liveRegion = false,
  });

  /// The phrase shown.
  final String text;

  /// Text style, merged over the ambient [DefaultTextStyle].
  final TextStyle? style;

  /// Announce the new phrase politely when it changes.
  final bool liveRegion;

  @override
  State<LdsTextMorph> createState() => _LdsTextMorphState();
}

class _Letter {
  _Letter(this.key, this.char, this.fromX, this.toX, {this.enterDelay});

  final String key;
  final String char;
  final double fromX;
  final double toX;

  /// Milliseconds before an arriving letter starts; null for a kept letter.
  final double? enterDelay;
}

class _LdsTextMorphState extends State<LdsTextMorph>
    with SingleTickerProviderStateMixin {
  static const double _totalMs = 600;
  static const double _slideMs = 560;
  static const double _enterMs = 280;
  static const double _exitMs = 180;

  late final AnimationController _c = AnimationController(
    vsync: this,
    duration: const Duration(milliseconds: 600),
  )..addStatusListener((s) {
      if (s == AnimationStatus.completed) setState(() => _leaving = const []);
    });

  List<_Letter> _letters = const [];
  List<_Letter> _leaving = const [];
  double _fromWidth = 0;
  double _toWidth = 0;
  double _height = 0;
  double _fontSize = 14;

  double get _ms => _c.value * _totalMs;

  double _slide() =>
      LdsSpringCurve.smooth.transform(math.min(1, _ms / _slideMs));

  double _xOf(_Letter l) => l.fromX + (l.toX - l.fromX) * _slide();

  double _width() => _fromWidth + (_toWidth - _fromWidth) * _slide();

  TextStyle _style(BuildContext context) =>
      DefaultTextStyle.of(context).style.merge(widget.style);

  ({List<_Letter> letters, double width, double height}) _layout(
      String text, TextStyle style, TextScaler scaler) {
    final painter = TextPainter(
      text: TextSpan(text: text, style: style),
      textDirection: TextDirection.ltr,
      textScaler: scaler,
      maxLines: 1,
    )..layout();
    final seen = <String, int>{};
    final letters = <_Letter>[];
    var offset = 0;
    for (final ch in text.characters) {
      final n = seen[ch] = (seen[ch] ?? 0) + 1;
      final x = painter
          .getOffsetForCaret(TextPosition(offset: offset), Rect.zero)
          .dx;
      letters.add(_Letter('$ch#$n', ch, x, x));
      offset += ch.length;
    }
    final result =
        (letters: letters, width: painter.width, height: painter.height);
    painter.dispose();
    return result;
  }

  bool _primed = false;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    final style = _style(context);
    _fontSize = style.fontSize ?? 14;
    final l = _layout(widget.text, style, MediaQuery.textScalerOf(context));
    if (!_primed || !_c.isAnimating) {
      _primed = true;
      _letters = l.letters;
      _fromWidth = _toWidth = l.width;
      _height = l.height;
    }
  }

  @override
  void didUpdateWidget(LdsTextMorph oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.text == widget.text && oldWidget.style == widget.style) {
      return;
    }
    final next =
        _layout(widget.text, _style(context), MediaQuery.textScalerOf(context));
    if (context.ldsReduceMotion || oldWidget.style != widget.style) {
      _c.stop();
      _letters = next.letters;
      _leaving = const [];
      _fromWidth = _toWidth = next.width;
      _height = next.height;
      return;
    }
    // Start from what is on screen now.
    final current = {for (final l in _letters) l.key: _xOf(l)};
    final currentWidth = _width();
    final nextKeys = {for (final l in next.letters) l.key};
    final letters = <_Letter>[];
    var arriving = 0;
    for (final l in next.letters) {
      final from = current[l.key];
      if (from != null) {
        letters.add(_Letter(l.key, l.char, from, l.toX));
      } else {
        letters.add(_Letter(l.key, l.char, l.toX, l.toX,
            enterDelay: math.min(arriving, 8) * 32.0));
        arriving++;
      }
    }
    _leaving = [
      for (final l in _letters)
        if (!nextKeys.contains(l.key))
          _Letter(l.key, l.char, _xOf(l), _xOf(l)),
    ];
    _letters = letters;
    _fromWidth = currentWidth;
    _toWidth = next.width;
    _height = next.height;
    _c.forward(from: 0);
  }

  @override
  void dispose() {
    _c.dispose();
    super.dispose();
  }

  Widget _glyph(String char, TextStyle style, TextScaler scaler,
      {required double opacity,
      required double dy,
      required double scale,
      required double blur}) {
    return Opacity(
      opacity: opacity.clamp(0.0, 1.0),
      child: Transform.translate(
        offset: Offset(0, dy),
        child: Transform.scale(
          scale: scale,
          child: ImageFiltered(
            enabled: blur > 0.01,
            imageFilter: ui.ImageFilter.blur(sigmaX: blur, sigmaY: blur),
            child: Text(char,
                style: style, textScaler: scaler, maxLines: 1, softWrap: false),
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final style = _style(context);
    final scaler = MediaQuery.textScalerOf(context);
    final lift = 0.14 * _fontSize;
    final visual = AnimatedBuilder(
      animation: _c,
      builder: (context, _) {
        if (!_c.isAnimating) {
          return Text(widget.text,
              style: style, maxLines: 1, softWrap: false);
        }
        final ms = _ms;
        return SizedBox(
          width: _width(),
          height: _height,
          child: Stack(
            clipBehavior: Clip.none,
            children: [
              for (final l in _leaving)
                Positioned(
                  left: l.fromX,
                  top: 0,
                  child: Builder(builder: (_) {
                    final p = LdsMotion.exitCurve
                        .transform(math.min(1, ms / _exitMs));
                    return _glyph(l.char, style, scaler,
                        opacity: 1 - p,
                        dy: -lift * p,
                        scale: 1 - 0.2 * p,
                        blur: 4 * p);
                  }),
                ),
              for (final l in _letters)
                Positioned(
                  left: _xOf(l),
                  top: 0,
                  child: Builder(builder: (_) {
                    final delay = l.enterDelay;
                    if (delay == null) {
                      return _glyph(l.char, style, scaler,
                          opacity: 1, dy: 0, scale: 1, blur: 0);
                    }
                    final p = LdsMotion.enterCurve.transform(
                        ((ms - delay) / _enterMs).clamp(0.0, 1.0));
                    return _glyph(l.char, style, scaler,
                        opacity: p,
                        dy: lift * (1 - p),
                        scale: 0.8 + 0.2 * p,
                        blur: 4 * (1 - p));
                  }),
                ),
            ],
          ),
        );
      },
    );
    return Semantics(
      label: widget.text,
      liveRegion: widget.liveRegion,
      excludeSemantics: true,
      child: visual,
    );
  }
}
