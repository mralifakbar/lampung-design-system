import 'dart:math' as math;

import 'package:flutter/services.dart';
import 'package:material_ui/material_ui.dart';

import '../../theme.dart';
import '../../tokens.g.dart';
import '../badge.dart';
import '_chart_utils.dart';
import 'heatmap.dart';

/// An area drawn on an [LdsMap]: a kecamatan, a district, a zone.
@immutable
class LdsMapRegion {
  /// Creates a region from its outline.
  const LdsMapRegion({
    required this.name,
    required this.points,
    this.value,
    this.label,
  });

  /// Name ("Kedaton").
  final String name;

  /// Outline in map units (x to the right, y down). For longitude and
  /// latitude pass `Offset(lon, -lat)`.
  final List<Offset> points;

  /// The value that shades it (choropleth). Null leaves it unshaded.
  final double? value;

  /// Words for the readout and screen readers ("Kedaton: 128 laporan").
  final String? label;
}

/// What a pin on an [LdsMap] marks.
enum LdsMapPinKind {
  /// A place: an accent dot.
  point,

  /// Where a route starts: a ringed disc.
  origin,

  /// Where a route ends: a pin.
  destination,

  /// A stop along a route: a small dot, filled once passed.
  stop,
}

/// A marked place on an [LdsMap].
@immutable
class LdsMapPin {
  /// Creates a pin at [at], in the same units as the region outlines.
  const LdsMapPin({
    required this.at,
    required this.label,
    this.kind = LdsMapPinKind.point,
    this.tone,
    this.done = false,
  });

  /// Position in map units.
  final Offset at;

  /// Name and state in words ("Posko banjir Teluk Betung, aktif").
  final String label;

  /// Shape of the marker.
  final LdsMapPinKind kind;

  /// Warning or danger for a place that needs attention; say it in
  /// [label] too.
  final LdsTone? tone;

  /// A stop already passed.
  final bool done;
}

/// A route on an [LdsMap]: travelled part solid accent, the rest dashed.
@immutable
class LdsMapRoute {
  /// Creates a route along [path].
  const LdsMapRoute({required this.path, this.progress = 0});

  /// Points in map units.
  final List<Offset> path;

  /// Share of the length already travelled, 0 to 1.
  final double progress;
}

/// A small map drawn from given shapes and points, without tiles or a map
/// service: regions shaded by value (a choropleth in five steps of series 1),
/// pins for the places that matter, and routes.
///
/// Everything is fitted into the box. Tapping or pointing at a region or
/// pin, or the arrow keys, select it and put its words in the readout line.
/// Screen readers get [semanticLabel] and a list of every labelled region
/// and pin as the text alternative.
class LdsMap extends StatefulWidget {
  /// Creates a map.
  const LdsMap({
    super.key,
    required this.semanticLabel,
    this.regions = const <LdsMapRegion>[],
    this.pins = const <LdsMapPin>[],
    this.routes = const <LdsMapRoute>[],
    this.thresholds = const [1, 2, 3, 4],
    this.height = 320,
    this.selected,
    this.onSelect,
    this.showScale = false,
    this.lessLabel = 'Sedikit',
    this.moreLabel = 'Banyak',
  });

  /// What the map shows, in a sentence.
  final String semanticLabel;

  /// Areas, drawn first.
  final List<LdsMapRegion> regions;

  /// Marked places, drawn on top.
  final List<LdsMapPin> pins;

  /// Routes, between regions and pins.
  final List<LdsMapRoute> routes;

  /// Lower bounds of the four shade steps for region values.
  final List<double> thresholds;

  /// Height of the map box.
  final double height;

  /// Index of the selected feature: regions first, then pins.
  final int? selected;

  /// Called with the index of the feature chosen (regions, then pins).
  final ValueChanged<int>? onSelect;

  /// Shows the Less to More scale for shaded regions.
  final bool showScale;

  /// Start of the scale.
  final String lessLabel;

  /// End of the scale.
  final String moreLabel;

  @override
  State<LdsMap> createState() => _LdsMapState();
}

class _LdsMapState extends State<LdsMap> {
  int? _selected;
  final FocusNode _focus = FocusNode(debugLabel: 'LdsMap');

  int? get _current => widget.selected ?? _selected;
  int get _count => widget.regions.length + widget.pins.length;

  @override
  void dispose() {
    _focus.dispose();
    super.dispose();
  }

  void _choose(int? i) {
    if (i == null) return;
    setState(() => _selected = i);
    widget.onSelect?.call(i);
  }

  String _labelOf(int i) {
    if (i < widget.regions.length) {
      final r = widget.regions[i];
      return r.label ?? r.name;
    }
    return widget.pins[i - widget.regions.length].label;
  }

  KeyEventResult _onKey(FocusNode node, KeyEvent e) {
    if (e is! KeyDownEvent && e is! KeyRepeatEvent) {
      return KeyEventResult.ignored;
    }
    if (_count == 0) return KeyEventResult.ignored;
    final k = e.logicalKey;
    final cur = _current;
    if (k == LogicalKeyboardKey.arrowRight ||
        k == LogicalKeyboardKey.arrowDown) {
      _choose(cur == null ? 0 : (cur + 1) % _count);
    } else if (k == LogicalKeyboardKey.arrowLeft ||
        k == LogicalKeyboardKey.arrowUp) {
      _choose(cur == null ? _count - 1 : (cur - 1 + _count) % _count);
    } else {
      return KeyEventResult.ignored;
    }
    return KeyEventResult.handled;
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final w = widget;
    final cur = _current;
    final readout = cur != null && cur < _count ? _labelOf(cur) : null;
    final alt = [for (var i = 0; i < _count; i++) _labelOf(i)].join('. ');

    final map = LayoutBuilder(
      builder: (context, box) {
        final size = Size(box.maxWidth, w.height);
        final proj = _Projection.fit(w, size);
        int? hit(Offset p) {
          for (var i = w.pins.length - 1; i >= 0; i--) {
            if ((proj.apply(w.pins[i].at) - p).distance <= 16) {
              return w.regions.length + i;
            }
          }
          for (var i = w.regions.length - 1; i >= 0; i--) {
            if (proj.path(w.regions[i].points).contains(p)) return i;
          }
          return null;
        }

        return GestureDetector(
          onTapDown: (d) => _choose(hit(d.localPosition)),
          child: CustomPaint(
            size: size,
            painter: _MapPainter(map: w, proj: proj, colors: c, selected: cur),
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
            label: w.semanticLabel,
            value: readout ?? alt,
            liveRegion: readout != null,
            child: ExcludeSemantics(
              child: Container(
                clipBehavior: Clip.antiAlias,
                decoration: BoxDecoration(
                  color: c.bgFill,
                  borderRadius: const BorderRadius.all(
                    Radius.circular(LdsRadius.lg),
                  ),
                ),
                foregroundDecoration: BoxDecoration(
                  borderRadius: const BorderRadius.all(
                    Radius.circular(LdsRadius.lg),
                  ),
                  border: _focus.hasFocus
                      ? Border.all(color: c.focus, width: 2)
                      : null,
                ),
                child: map,
              ),
            ),
          ),
        ),
        if (readout != null || w.showScale)
          Padding(
            padding: const EdgeInsets.only(top: LdsSpace.s8),
            child: ExcludeSemantics(
              child: Row(
                children: [
                  Expanded(
                    child: Text(
                      readout ?? '',
                      style: LdsType.footnote.copyWith(
                        color: c.textSubtle,
                        fontFeatures: tabular,
                      ),
                    ),
                  ),
                  if (w.showScale) ...[
                    Text(w.lessLabel, style: axisStyle(c)),
                    const SizedBox(width: 4),
                    for (var l = 0; l <= 4; l++)
                      Container(
                        width: 10,
                        height: 10,
                        margin: const EdgeInsets.symmetric(horizontal: 1.5),
                        decoration: BoxDecoration(
                          color: LdsHeatmap.levelColor(c, l),
                          borderRadius: const BorderRadius.all(
                            Radius.circular(3),
                          ),
                        ),
                      ),
                    const SizedBox(width: 4),
                    Text(w.moreLabel, style: axisStyle(c)),
                  ],
                ],
              ),
            ),
          ),
      ],
    );
  }
}

/// Fits map units into the box, keeping the aspect ratio.
class _Projection {
  _Projection(this.scale, this.offset);

  final double scale;
  final Offset offset;

  Offset apply(Offset p) => p * scale + offset;

  Path path(List<Offset> pts) {
    final path = Path();
    if (pts.isEmpty) return path;
    path.addPolygon([for (final p in pts) apply(p)], true);
    return path;
  }

  static _Projection fit(LdsMap m, Size size) {
    final all = <Offset>[
      for (final r in m.regions) ...r.points,
      for (final p in m.pins) p.at,
      for (final r in m.routes) ...r.path,
    ];
    if (all.isEmpty) return _Projection(1, size.center(Offset.zero));
    var minX = all.first.dx, maxX = minX, minY = all.first.dy, maxY = minY;
    for (final p in all) {
      minX = math.min(minX, p.dx);
      maxX = math.max(maxX, p.dx);
      minY = math.min(minY, p.dy);
      maxY = math.max(maxY, p.dy);
    }
    const pad = 24.0;
    final w = math.max(maxX - minX, 1e-9), h = math.max(maxY - minY, 1e-9);
    final scale = all.length == 1
        ? 1.0
        : math.min((size.width - pad * 2) / w, (size.height - pad * 2) / h);
    final cx = (minX + maxX) / 2, cy = (minY + maxY) / 2;
    return _Projection(
      scale,
      Offset(size.width / 2 - cx * scale, size.height / 2 - cy * scale),
    );
  }
}

class _MapPainter extends CustomPainter {
  _MapPainter({
    required this.map,
    required this.proj,
    required this.colors,
    required this.selected,
  });

  final LdsMap map;
  final _Projection proj;
  final LdsColors colors;
  final int? selected;

  @override
  void paint(Canvas canvas, Size size) {
    final c = colors;
    // Regions.
    for (var i = 0; i < map.regions.length; i++) {
      final r = map.regions[i];
      final path = proj.path(r.points);
      final fill = r.value == null
          ? c.bgBase
          : LdsHeatmap.levelColor(
              c,
              LdsHeatmap.levelOf(r.value, map.thresholds),
            );
      canvas.drawPath(path, Paint()..color = fill);
      canvas.drawPath(
        path,
        Paint()
          ..style = PaintingStyle.stroke
          ..strokeWidth = 1
          ..strokeJoin = StrokeJoin.round
          ..color = c.lineStrong,
      );
    }
    if (selected != null && selected! < map.regions.length) {
      canvas.drawPath(
        proj.path(map.regions[selected!].points),
        Paint()
          ..style = PaintingStyle.stroke
          ..strokeWidth = 2.5
          ..strokeJoin = StrokeJoin.round
          ..color = c.accent,
      );
    }

    // Routes.
    for (final route in map.routes) {
      if (route.path.length < 2) continue;
      final path = Path()
        ..addPolygon([for (final p in route.path) proj.apply(p)], false);
      canvas.drawPath(
        path,
        Paint()
          ..style = PaintingStyle.stroke
          ..strokeWidth = 8
          ..strokeCap = StrokeCap.round
          ..strokeJoin = StrokeJoin.round
          ..color = c.bgBase.withValues(alpha: 0.8),
      );
      final metric = path.computeMetrics().toList();
      final total = metric.fold<double>(0, (s, m) => s + m.length);
      var done = total * route.progress.clamp(0.0, 1.0);
      final ahead = Paint()
        ..style = PaintingStyle.stroke
        ..strokeWidth = 2
        ..strokeCap = StrokeCap.round
        ..color = c.textMuted;
      final travelled = Paint()
        ..style = PaintingStyle.stroke
        ..strokeWidth = 3.5
        ..strokeCap = StrokeCap.round
        ..color = c.accent;
      for (final m in metric) {
        final cut = done.clamp(0.0, m.length);
        if (cut < m.length) {
          drawDashed(
            canvas,
            m.extractPath(cut, m.length),
            ahead,
            dash: 6,
            gap: 5,
          );
        }
        if (cut > 0) canvas.drawPath(m.extractPath(0, cut), travelled);
        done -= m.length;
      }
    }

    // Pins.
    for (var i = 0; i < map.pins.length; i++) {
      final pin = map.pins[i];
      final p = proj.apply(pin.at);
      final isSel = selected == map.regions.length + i;
      final tone = pin.tone == null
          ? c.accent
          : LdsToneColors.of(c, pin.tone!).solid;
      final ring = Paint()..color = c.bgBase;
      switch (pin.kind) {
        case LdsMapPinKind.point:
          canvas.drawCircle(p, 8, ring);
          canvas.drawCircle(p, 5.5, Paint()..color = tone);
        case LdsMapPinKind.origin:
          canvas.drawCircle(p, 9, Paint()..color = tone);
          canvas.drawCircle(p, 5, ring);
        case LdsMapPinKind.stop:
          canvas.drawCircle(p, 6, ring);
          canvas.drawCircle(
            p,
            4,
            pin.done
                ? (Paint()..color = tone)
                : (Paint()
                    ..style = PaintingStyle.stroke
                    ..strokeWidth = 1.5
                    ..color = c.textMuted),
          );
        case LdsMapPinKind.destination:
          final head = p.translate(0, -16);
          final pinPath = Path()
            ..moveTo(p.dx, p.dy)
            ..quadraticBezierTo(p.dx - 9, head.dy + 6, p.dx - 9, head.dy)
            ..arcToPoint(
              Offset(p.dx + 9, head.dy),
              radius: const Radius.circular(9),
            )
            ..quadraticBezierTo(p.dx + 9, head.dy + 6, p.dx, p.dy)
            ..close();
          canvas.drawPath(pinPath, Paint()..color = tone);
          canvas.drawCircle(head, 3.5, ring);
      }
      if (isSel) {
        final center = pin.kind == LdsMapPinKind.destination
            ? p.translate(0, -12)
            : p;
        canvas.drawCircle(
          center,
          13,
          Paint()
            ..style = PaintingStyle.stroke
            ..strokeWidth = 2
            ..color = c.focus,
        );
        final tp = layoutText(
          pin.label,
          LdsType.footnote.copyWith(
            fontWeight: FontWeight.w500,
            color: c.textStrong,
          ),
          maxWidth: math.max(40, size.width - 16),
        );
        final box = Rect.fromLTWH(
          (center.dx - tp.width / 2 - 6).clamp(
            4,
            math.max(4, size.width - tp.width - 16),
          ),
          math.max(4, center.dy - 22 - tp.height - 8),
          tp.width + 12,
          tp.height + 8,
        );
        canvas.drawRRect(
          RRect.fromRectAndRadius(box, const Radius.circular(LdsRadius.xs)),
          Paint()..color = c.bgElevated,
        );
        canvas.drawRRect(
          RRect.fromRectAndRadius(box, const Radius.circular(LdsRadius.xs)),
          Paint()
            ..style = PaintingStyle.stroke
            ..color = c.line,
        );
        tp.paint(canvas, box.topLeft.translate(6, 4));
      }
    }
  }

  @override
  bool shouldRepaint(_MapPainter old) => true;
}
