// Shared painting helpers for the chart widgets. Not exported.
import 'dart:math' as math;
import 'dart:ui' as ui;

import 'package:flutter/widgets.dart';

import '../../tokens.g.dart';

/// Tabular figures, so numbers keep their width when they change.
const List<ui.FontFeature> tabular = [ui.FontFeature.tabularFigures()];

/// Axis label style: 11 px muted, tabular.
TextStyle axisStyle(LdsColors c) => TextStyle(
      fontFamily: LdsType.family,
      fontSize: 11,
      height: 1.2,
      color: c.textMuted,
      fontFeatures: tabular,
    );

/// A nice value scale: the min, max and tick step on 1, 2, 2.5, 5 x 10^n.
({double min, double max, double step}) niceScale(double lo, double hi,
    {int ticks = 4}) {
  if (lo == hi) {
    hi = lo + 1;
  }
  final raw = (hi - lo) / ticks;
  final mag = math.pow(10, (math.log(raw) / math.ln10).floor()).toDouble();
  final norm = raw / mag;
  final step = (norm <= 1
          ? 1
          : norm <= 2
              ? 2
              : norm <= 2.5
                  ? 2.5
                  : norm <= 5
                      ? 5
                      : 10) *
      mag;
  final min = (lo / step).floor() * step;
  final max = (hi / step).ceil() * step;
  return (min: min, max: max, step: step);
}

/// Lays out [text] in [style] on one line.
TextPainter layoutText(String text, TextStyle style, {double? maxWidth}) {
  final tp = TextPainter(
    text: TextSpan(text: text, style: style),
    textDirection: TextDirection.ltr,
    maxLines: 1,
    ellipsis: maxWidth == null ? null : '…',
  );
  tp.layout(maxWidth: maxWidth ?? double.infinity);
  return tp;
}

/// Draws [path] dashed with [dash] on and [gap] off.
void drawDashed(Canvas canvas, Path path, Paint paint,
    {double dash = 4, double gap = 4}) {
  for (final metric in path.computeMetrics()) {
    var d = 0.0;
    while (d < metric.length) {
      final end = math.min(d + dash, metric.length);
      canvas.drawPath(metric.extractPath(d, end), paint);
      d = end + gap;
    }
  }
}

/// [color] mixed into [base] at [amount] (0..1), like CSS `color-mix`.
Color mix(Color color, Color base, double amount) =>
    Color.lerp(base, color, amount)!;

/// Draws a small inverse tooltip with [lines] near [anchor], kept inside
/// [bounds].
void drawTooltip(Canvas canvas, Offset anchor, List<String> lines,
    Rect bounds, LdsColors c) {
  final style = TextStyle(
    fontFamily: LdsType.family,
    fontSize: 12,
    height: 16 / 12,
    color: c.textInverse,
    fontFeatures: tabular,
  );
  final painters = [
    for (var i = 0; i < lines.length; i++)
      layoutText(lines[i],
          i == 0 ? style.copyWith(fontWeight: FontWeight.w600) : style),
  ];
  const pad = 8.0;
  final w = painters.fold<double>(0, (m, p) => math.max(m, p.width)) + pad * 2;
  final h = painters.fold<double>(0, (m, p) => m + p.height) + pad * 2;
  var left = anchor.dx + 10;
  if (left + w > bounds.right) left = anchor.dx - 10 - w;
  left = left.clamp(bounds.left, math.max(bounds.left, bounds.right - w));
  final top = (anchor.dy - h / 2)
      .clamp(bounds.top, math.max(bounds.top, bounds.bottom - h))
      .toDouble();
  final rect = RRect.fromRectAndRadius(
      Rect.fromLTWH(left, top, w, h), const Radius.circular(LdsRadius.sm));
  canvas.drawRRect(rect, Paint()..color = c.bgInverse);
  var y = top + pad;
  for (final p in painters) {
    p.paint(canvas, Offset(left + pad, y));
    y += p.height;
  }
}
