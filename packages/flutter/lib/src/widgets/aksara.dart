import 'package:flutter/material.dart';

import '../aksara_glyphs.g.dart';
import '../theme.dart';

const double _advance = 78; // step between letters; glyphs lean, cells overlap
const double _afterCell = 24; // width of a trailing sign (ai, ah, nengen)
const double _top = -16;
const double _gridHeight = 128;
const double _tail = 22;

/// One syllable cell of aksara Lampung, or a word space.
@immutable
class LdsAksaraCell {
  /// Creates a cell.
  const LdsAksaraCell({
    required this.letter,
    this.above = const <String>[],
    this.below = const <String>[],
    this.after = const <String>[],
  }) : isSpace = false;

  /// A space between words.
  const LdsAksaraCell.space()
      : letter = '',
        above = const <String>[],
        below = const <String>[],
        after = const <String>[],
        isSpace = true;

  /// Base letter key in [LdsAksaraGlyphs.letters] (`ka`, `nga`, `a`, ...).
  final String letter;

  /// Signs above the letter (`i`, `e`, `é`, `an`, `ang`, `ar`).
  final List<String> above;

  /// Signs below the letter (`u`, `o`, `au`).
  final List<String> below;

  /// Signs after the letter (`ai`, `ah`, `nengen`).
  final List<String> after;

  /// Whether this is a word space.
  final bool isSpace;

  @override
  String toString() => isSpace
      ? '␣'
      : [letter, ...above, ...below, ...after].join('+');
}

// Onsets, longest first. Letters outside the script map to the nearest one.
const List<(String, String)> _consonants = [
  ('ny', 'nya'), ('ng', 'nga'), ('gh', 'gha'), ('kh', 'ka'), ('sy', 'sa'),
  ('k', 'ka'), ('g', 'ga'), ('p', 'pa'), ('b', 'ba'), ('m', 'ma'),
  ('t', 'ta'), ('d', 'da'), ('n', 'na'), ('c', 'ca'), ('j', 'ja'),
  ('y', 'ya'), ('l', 'la'), ('r', 'ra'), ('s', 'sa'), ('w', 'wa'),
  ('h', 'ha'), ('f', 'pa'), ('v', 'pa'), ('z', 'ja'), ('q', 'ka'),
  ('x', 'sa'),
];
const Map<String, String?> _vowels = {
  'a': null, 'i': 'i', 'u': 'u', 'e': 'e', 'é': 'é', 'è': 'é', 'o': 'o',
};
const Map<String, String> _codaSign = {
  'n': 'an', 'ng': 'ang', 'r': 'ar', 'h': 'ah',
};

bool _isVowel(String? ch) => ch != null && _vowels.containsKey(ch);

/// Splits Latin text into aksara Lampung cells.
///
/// A display helper for names, headings and ornament, not a full
/// orthography engine. Mirrors `toAksara` in `js/aksara.js`.
List<LdsAksaraCell> ldsToAksara(String text) {
  final normalized = text
      .toLowerCase()
      .replaceAll('é', 'é')
      .replaceAll('è', 'è');
  final words = normalized
      .split(RegExp('[^a-zéè]+'))
      .where((w) => w.isNotEmpty)
      .toList();
  final out = <LdsAksaraCell>[];
  for (var wi = 0; wi < words.length; wi++) {
    final w = words[wi];
    String? at(int i) => i < w.length ? w[i] : null;
    if (wi > 0) out.add(const LdsAksaraCell.space());
    var i = 0;
    while (i < w.length) {
      var letter = 'a';
      final above = <String>[];
      final below = <String>[];
      final after = <String>[];
      LdsAksaraCell cell() => LdsAksaraCell(
          letter: letter, above: above, below: below, after: after);

      (String, String)? onset;
      for (final c in _consonants) {
        if (w.startsWith(c.$1, i)) {
          onset = c;
          break;
        }
      }
      if (onset != null) {
        letter = onset.$2;
        i += onset.$1.length;
        // A consonant with no vowel after it is dead: letter plus nengen.
        if (!_isVowel(at(i))) {
          after.add('nengen');
          out.add(cell());
          continue;
        }
      }
      final v = at(i) ?? 'a';
      if (_isVowel(v)) i += 1;
      final sign = _vowels[v];
      // Diphthongs at the end of a syllable: ai, au.
      final next = at(i);
      final afterNext = at(i + 1);
      if (v == 'a' &&
          (next == 'i' || next == 'u') &&
          (afterNext == null || !_isVowel(afterNext))) {
        if (next == 'i') {
          after.add('ai');
        } else {
          below.add('au');
        }
        i += 1;
        out.add(cell());
        continue;
      }
      if (sign == 'u' || sign == 'o') {
        below.add(sign!);
      } else if (sign != null) {
        above.add(sign);
      }
      // Coda: n, ng, r, h close the syllable with a sign when no vowel
      // follows them.
      for (final coda in const ['ng', 'n', 'r', 'h']) {
        if (w.startsWith(coda, i) &&
            !_isVowel(at(i + coda.length)) &&
            !(coda == 'n' && at(i + 1) == 'y')) {
          final s = _codaSign[coda]!;
          if (s == 'ah') {
            after.add(s);
          } else {
            above.add(s);
          }
          i += coda.length;
          break;
        }
      }
      out.add(cell());
    }
  }
  return out;
}

/// Parses the M, L and Q commands used by [LdsAksaraGlyphs] into a [Path].
Path _parse(String d, double dx) {
  final path = Path();
  final tokens =
      RegExp(r'[MLQ]|-?\d*\.?\d+').allMatches(d).map((m) => m[0]!).toList();
  var i = 0;
  var cmd = 'M';
  double n() => double.parse(tokens[i++]);
  while (i < tokens.length) {
    final t = tokens[i];
    if (t == 'M' || t == 'L' || t == 'Q') {
      cmd = t;
      i++;
      continue;
    }
    switch (cmd) {
      case 'M':
        path.moveTo(n() + dx, n());
        cmd = 'L'; // implicit lineto after the first pair, as in SVG
      case 'L':
        path.lineTo(n() + dx, n());
      case 'Q':
        final x1 = n() + dx, y1 = n(), x2 = n() + dx, y2 = n();
        path.quadraticBezierTo(x1, y1, x2, y2);
    }
  }
  return path;
}

final Map<String, Path> _pathCache = <String, Path>{};

Path _glyphPath(List<String> paths, double dx) {
  final key = '$dx|${paths.join('|')}';
  return _pathCache.putIfAbsent(key, () {
    final p = Path();
    for (final d in paths) {
      p.addPath(_parse(d, dx), Offset.zero);
    }
    return p;
  });
}

/// Builds the strokes for [cells] on the glyph grid and returns the width
/// they take in grid units.
(Path, double) _layout(List<LdsAksaraCell> cells) {
  final path = Path();
  var x = 0.0;
  for (final c in cells) {
    if (c.isSpace) {
      x += _advance * 0.5;
      continue;
    }
    final cell = Path()
      ..addPath(
          _glyphPath(LdsAksaraGlyphs.letters[c.letter] ?? const [], 0),
          Offset.zero);
    for (final m in c.above) {
      cell.addPath(
          _glyphPath(LdsAksaraGlyphs.above[m] ?? const [], 0), Offset.zero);
    }
    for (final m in c.below) {
      cell.addPath(
          _glyphPath(LdsAksaraGlyphs.below[m] ?? const [], 0), Offset.zero);
    }
    var w = _advance;
    for (final m in c.after) {
      cell.addPath(
          _glyphPath(LdsAksaraGlyphs.after[m] ?? const [], w + 4),
          Offset.zero);
      w += _afterCell;
    }
    path.addPath(cell, Offset(x, 0));
    x += w;
  }
  return (path, x + _tail);
}

/// Latin text drawn as aksara Lampung, a quiet cultural accent for names and
/// headings.
///
/// Screen readers read [semanticLabel], which defaults to [text].
class LdsAksara extends StatelessWidget {
  /// Creates an aksara rendering of [text].
  const LdsAksara(
    this.text, {
    super.key,
    this.height = 32,
    this.color,
    this.strokeWidth,
    this.semanticLabel,
  });

  /// Latin text to transliterate.
  final String text;

  /// Height of the drawing; width follows the text.
  final double height;

  /// Stroke color. Defaults to `goldText`.
  final Color? color;

  /// Stroke width on the 100-unit grid. Defaults to
  /// [LdsAksaraGlyphs.stroke].
  final double? strokeWidth;

  /// Read by screen readers. Defaults to [text].
  final String? semanticLabel;

  @override
  Widget build(BuildContext context) {
    final (path, units) = _layout(ldsToAksara(text));
    final scale = height / _gridHeight;
    return Semantics(
      label: semanticLabel ?? text,
      image: true,
      excludeSemantics: true,
      child: CustomPaint(
        size: Size(units * scale, height),
        painter: _AksaraPainter(
          path: path,
          color: color ?? context.lds.goldText,
          stroke: strokeWidth ?? LdsAksaraGlyphs.stroke,
          scale: scale,
          period: null,
        ),
      ),
    );
  }
}

/// A decorative row of aksara Lampung repeated across the width, for the
/// edge of a header or a footer. Hidden from screen readers.
class LdsAksaraBand extends StatelessWidget {
  /// Creates a band.
  const LdsAksaraBand({
    super.key,
    this.text = defaultText,
    this.height = 28,
    this.color,
    this.opacity = 0.42,
  });

  /// The motto on the provincial emblem.
  static const String defaultText = 'sai bumi ruwa jurai';

  /// Latin text repeated in the band.
  final String text;

  /// Height of the band.
  final double height;

  /// Stroke color. Defaults to `gold`.
  final Color? color;

  /// Opacity of the strokes.
  final double opacity;

  @override
  Widget build(BuildContext context) {
    final (path, units) = _layout(ldsToAksara(text));
    final scale = height / _gridHeight;
    final base = color ?? context.lds.gold;
    return ExcludeSemantics(
      child: SizedBox(
        height: height,
        width: double.infinity,
        child: ClipRect(
          child: CustomPaint(
            painter: _AksaraPainter(
              path: path,
              color: base.withAlpha((base.a * opacity * 255).round()),
              stroke: LdsAksaraGlyphs.stroke,
              scale: scale,
              period: units + 64,
            ),
          ),
        ),
      ),
    );
  }
}

class _AksaraPainter extends CustomPainter {
  _AksaraPainter({
    required this.path,
    required this.color,
    required this.stroke,
    required this.scale,
    required this.period,
  });

  final Path path;
  final Color color;
  final double stroke;
  final double scale;
  final double? period;

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = stroke
      ..strokeCap = StrokeCap.round
      ..strokeJoin = StrokeJoin.round
      ..color = color;
    canvas.save();
    canvas.scale(scale);
    canvas.translate(0, -_top);
    if (period == null) {
      canvas.drawPath(path, paint);
    } else {
      final width = size.width / scale;
      for (var x = 0.0; x < width; x += period!) {
        canvas.drawPath(path.shift(Offset(x, 0)), paint);
      }
    }
    canvas.restore();
  }

  @override
  bool shouldRepaint(_AksaraPainter old) =>
      old.path != path ||
      old.color != color ||
      old.stroke != stroke ||
      old.scale != scale ||
      old.period != period;
}
