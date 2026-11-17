import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../../theme.dart';
import '../../tokens.g.dart';
import '../icon.dart';
import '_chart_utils.dart';

/// How the trip on an [LdsRouteSchematic] travels.
enum LdsRouteMode {
  /// A truck or bus on straight legs.
  road,

  /// A train on straight legs.
  rail,

  /// A ship on straight legs.
  sea,

  /// A plane: each leg is an arc.
  flight,
}

/// One stop of an [LdsRouteSchematic].
@immutable
class LdsRouteStop {
  /// Creates a stop.
  const LdsRouteStop(this.name, {this.sub});

  /// Place ("Terminal Rajabasa").
  final String name;

  /// Time, code or status ("Berangkat 06.10").
  final String? sub;
}

/// The stops of one trip on a line: the part already travelled in the
/// accent, the vehicle where it is now, and the place and time under each
/// stop.
///
/// A diagram, not a map, so it stays readable at any width. When a stop
/// would get under about 104 px the stops run down the left instead.
class LdsRouteSchematic extends StatelessWidget {
  /// Creates a route schematic.
  const LdsRouteSchematic({
    super.key,
    required this.stops,
    required this.position,
    required this.semanticLabel,
    this.mode = LdsRouteMode.road,
    this.vehicleLabel,
  });

  /// Stops in order, at least two.
  final List<LdsRouteStop> stops;

  /// Where the vehicle is, counted in stops from 0: 1.4 is 40 % from the
  /// second stop to the third. The last index means arrived.
  final double position;

  /// The trip in a sentence ("Bus DAMRI Rajabasa ke Bakauheni, 40 persen
  /// perjalanan, tiba 10.30").
  final String semanticLabel;

  /// Travel mode, for the icon and leg shape.
  final LdsRouteMode mode;

  /// Name of the vehicle for screen readers ("Bus DAMRI 21").
  final String? vehicleLabel;

  String get _icon => switch (mode) {
        LdsRouteMode.road => 'directions_bus',
        LdsRouteMode.rail => 'tram',
        LdsRouteMode.sea => 'directions_boat',
        LdsRouteMode.flight => 'flight',
      };

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final last = math.max(0, stops.length - 1).toDouble();
    final pos = position.clamp(0.0, last);
    final arrived = pos >= last;
    String stateOf(int i) {
      if (i <= pos.floor() && (i < pos || arrived)) return 'sudah dilewati';
      if (i == pos.floor() && i == pos) return 'posisi sekarang';
      if (i == pos.floor() + 1 || (i == pos.ceil() && pos != pos.floor())) {
        return 'berikutnya';
      }
      return 'belum';
    }

    final nextIndex = arrived ? -1 : pos.floor() + 1;

    Widget stopText(int i, TextAlign align, CrossAxisAlignment cross) {
      final s = stops[i];
      return Semantics(
        label: '${s.name}${s.sub == null ? '' : ', ${s.sub}'}, ${stateOf(i)}',
        excludeSemantics: true,
        child: Column(
          crossAxisAlignment: cross,
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(s.name,
                textAlign: align,
                style: LdsType.subhead.copyWith(
                    fontWeight: FontWeight.w500,
                    color: i == nextIndex ? c.accentText : c.textStrong)),
            if (s.sub != null)
              Text(s.sub!,
                  textAlign: align,
                  style: LdsType.footnote.copyWith(
                      color: c.textSubtle, fontFeatures: tabular)),
          ],
        ),
      );
    }

    return Semantics(
      container: true,
      label: semanticLabel,
      explicitChildNodes: true,
      child: Container(
        padding: const EdgeInsets.all(LdsSpace.s16),
        decoration: BoxDecoration(
          color: c.bgFill,
          borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.lg)),
        ),
        child: LayoutBuilder(builder: (context, box) {
          final vertical = box.maxWidth / math.max(1, stops.length) < 104;
          final vehicle = arrived
              ? null
              : Semantics(
                  label: vehicleLabel,
                  child: Container(
                    width: 32,
                    height: 32,
                    alignment: Alignment.center,
                    decoration: BoxDecoration(
                      color: c.bgBase,
                      shape: BoxShape.circle,
                      border: Border.all(color: c.accent, width: 2),
                    ),
                    child: LdsIcon(_icon, size: 18, color: c.accentText),
                  ),
                );
          if (vertical) {
            const rowH = 56.0;
            final h = rowH * stops.length;
            final vy = rowH * (pos + 0.5);
            return SizedBox(
              height: h,
              child: Stack(
                children: [
                  CustomPaint(
                    size: Size(32, h),
                    painter: _RoutePainter(
                      count: stops.length,
                      position: pos,
                      vertical: true,
                      arc: false,
                      colors: c,
                    ),
                  ),
                  for (var i = 0; i < stops.length; i++)
                    Positioned(
                      left: 44,
                      right: 0,
                      top: rowH * i,
                      height: rowH,
                      child: Align(
                        alignment: Alignment.centerLeft,
                        child: stopText(
                            i, TextAlign.left, CrossAxisAlignment.start),
                      ),
                    ),
                  if (vehicle != null)
                    Positioned(left: 0, top: vy - 16, child: vehicle),
                ],
              ),
            );
          }
          final w = box.maxWidth;
          final slot = w / stops.length;
          final arc = mode == LdsRouteMode.flight;
          final vx = slot * (pos + 0.5);
          final lift = arc ? _RoutePainter.arcLift(pos) : 0.0;
          return Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              SizedBox(
                height: 56,
                child: Stack(
                  clipBehavior: Clip.none,
                  children: [
                    CustomPaint(
                      size: Size(w, 56),
                      painter: _RoutePainter(
                        count: stops.length,
                        position: pos,
                        vertical: false,
                        arc: arc,
                        colors: c,
                      ),
                    ),
                    if (vehicle != null)
                      Positioned(
                        left: vx - 16,
                        top: 40 - 16 - lift * 24,
                        child: vehicle,
                      ),
                  ],
                ),
              ),
              const SizedBox(height: LdsSpace.s8),
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  for (var i = 0; i < stops.length; i++)
                    Expanded(
                      child: Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 4),
                        child: stopText(
                            i, TextAlign.center, CrossAxisAlignment.center),
                      ),
                    ),
                ],
              ),
            ],
          );
        }),
      ),
    );
  }
}

class _RoutePainter extends CustomPainter {
  _RoutePainter({
    required this.count,
    required this.position,
    required this.vertical,
    required this.arc,
    required this.colors,
  });

  final int count;
  final double position;
  final bool vertical;
  final bool arc;
  final LdsColors colors;

  /// Height of the bow at [pos] along a leg, 0 at stops and 1 mid leg.
  static double arcLift(double pos) {
    final t = pos - pos.floor();
    return math.sin(t * math.pi);
  }

  Offset _stop(Size size, int i) {
    if (vertical) {
      final rowH = size.height / count;
      return Offset(16, rowH * (i + 0.5));
    }
    final slot = size.width / count;
    return Offset(slot * (i + 0.5), 40);
  }

  Path _leg(Size size, int i, double from, double to) {
    final a = _stop(size, i), b = _stop(size, i + 1);
    final path = Path();
    if (!arc) {
      path
        ..moveTo(a.dx + (b.dx - a.dx) * from, a.dy + (b.dy - a.dy) * from)
        ..lineTo(a.dx + (b.dx - a.dx) * to, a.dy + (b.dy - a.dy) * to);
      return path;
    }
    Offset at(double t) => Offset(a.dx + (b.dx - a.dx) * t,
        a.dy - math.sin(t * math.pi) * 24);
    const steps = 24;
    path.moveTo(at(from).dx, at(from).dy);
    for (var k = 1; k <= steps; k++) {
      final p = at(from + (to - from) * k / steps);
      path.lineTo(p.dx, p.dy);
    }
    return path;
  }

  @override
  void paint(Canvas canvas, Size size) {
    final c = colors;
    if (count < 1) return;
    final track = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2
      ..strokeCap = StrokeCap.round
      ..color = c.textMuted;
    final done = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = 3
      ..strokeCap = StrokeCap.round
      ..color = c.accent;
    for (var i = 0; i < count - 1; i++) {
      drawDashed(canvas, _leg(size, i, 0, 1), track, dash: 1, gap: 5);
      final travelled = (position - i).clamp(0.0, 1.0);
      if (travelled > 0) {
        canvas.drawPath(_leg(size, i, 0, travelled), done);
      }
    }
    final next = position >= count - 1 ? -1 : position.floor() + 1;
    for (var i = 0; i < count; i++) {
      final p = _stop(size, i);
      final passed = i <= position;
      canvas.drawCircle(p, 7, Paint()..color = c.bgFill);
      if (passed) {
        canvas.drawCircle(p, 5.5, Paint()..color = c.accent);
      } else {
        canvas.drawCircle(p, 5.5, Paint()..color = c.bgBase);
        canvas.drawCircle(
          p,
          5,
          Paint()
            ..style = PaintingStyle.stroke
            ..strokeWidth = i == next ? 2 : 1.5
            ..color = i == next ? c.accent : c.lineStrong,
        );
      }
    }
  }

  @override
  bool shouldRepaint(_RoutePainter old) =>
      old.position != position ||
      old.count != count ||
      old.vertical != vertical ||
      old.colors != colors;
}
