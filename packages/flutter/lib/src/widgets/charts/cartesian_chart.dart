import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '_chart_utils.dart';
import 'chart_data.dart';
import 'chart_legend.dart';

/// The engine behind [LdsBarChart], [LdsLineChart], [LdsAreaChart] and
/// [LdsComboChart]: series over shared x labels on one value scale.
///
/// Draws receding gridlines on nice steps, bars, lines and fills in the
/// series colors, dashed reference lines, and, on hover, tap or the arrow
/// keys, a crosshair with a tooltip that reads every series at once. Two or
/// more series get a legend whose entries switch series on and off.
///
/// The chart is one image for assistive technology: [semanticLabel] says
/// the takeaway and the value lists every number, as the text alternative.
class LdsCartesianChart extends StatefulWidget {
  /// Creates a chart.
  const LdsCartesianChart({
    super.key,
    required this.labels,
    required this.series,
    required this.semanticLabel,
    this.kind = LdsSeriesKind.line,
    this.fullLabels,
    this.stacked = false,
    this.step = false,
    this.refs = const <LdsChartRef>[],
    this.format = const LdsNumberFormat(),
    this.highlight,
    this.yMin,
    this.yMax,
    this.hideYAxis = false,
    this.height = 200,
    this.showLegend,
  });

  /// Short x labels, one per period ("Sen", "1 Nov").
  final List<String> labels;

  /// Longer x labels for the tooltip and text alternative ("Senin 3 Nov").
  final List<String>? fullLabels;

  /// Series, in fixed color order. At most four plus one neutral.
  final List<LdsChartSeries> series;

  /// The takeaway in one or two sentences, read first by screen readers.
  final String semanticLabel;

  /// How series without their own [LdsChartSeries.kind] are drawn.
  final LdsSeriesKind kind;

  /// Bars or areas stack in series order into a total.
  final bool stacked;

  /// Areas and lines hold their value until it changes.
  final bool step;

  /// Dashed reference lines.
  final List<LdsChartRef> refs;

  /// How values read in ticks, tooltip and text alternative.
  final LdsNumberFormat format;

  /// With one bar series: the index of the answer; other bars recede.
  final int? highlight;

  /// Fixes the bottom of the scale.
  final double? yMin;

  /// Fixes the top of the scale (100 for a percentage).
  final double? yMax;

  /// Hides the tick labels in tight cards; gridlines stay.
  final bool hideYAxis;

  /// Height of the plot, without the legend.
  final double height;

  /// Shows the toggle legend; defaults to two or more series.
  final bool? showLegend;

  @override
  State<LdsCartesianChart> createState() => _LdsCartesianChartState();
}

class _LdsCartesianChartState extends State<LdsCartesianChart>
    with SingleTickerProviderStateMixin {
  late final AnimationController _ctrl =
      AnimationController(vsync: this, duration: LdsMotion.considered)
        ..addListener(() => setState(() {}));
  final Set<int> _hidden = <int>{};
  int? _active;
  bool _started = false;
  List<List<double?>> _from = const [];
  final FocusNode _focus = FocusNode(debugLabel: 'LdsCartesianChart');

  List<List<double?>> get _to => [for (final s in widget.series) s.values];

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (!_started) {
      _started = true;
      _from = [
        for (final s in widget.series) [for (final v in s.values) v == null ? null : 0.0]
      ];
      if (context.ldsReduceMotion) {
        _ctrl.value = 1;
      } else {
        _ctrl.forward();
      }
    }
  }

  @override
  void didUpdateWidget(LdsCartesianChart old) {
    super.didUpdateWidget(old);
    final changed = old.series.length != widget.series.length ||
        [
          for (var i = 0; i < widget.series.length; i++)
            _listEquals(old.series[i].values, widget.series[i].values)
        ].contains(false);
    if (changed) {
      _from = _current(old.series);
      if (context.ldsReduceMotion) {
        _ctrl.value = 1;
      } else {
        _ctrl.forward(from: 0);
      }
    }
    if (_active != null && _active! >= widget.labels.length) _active = null;
    _hidden.removeWhere((i) => i >= widget.series.length);
  }

  static bool _listEquals(List<double?> a, List<double?> b) {
    if (a.length != b.length) return false;
    for (var i = 0; i < a.length; i++) {
      if (a[i] != b[i]) return false;
    }
    return true;
  }

  List<List<double?>> _current([List<LdsChartSeries>? series]) {
    final t = LdsMotion.inoutCurve.transform(_ctrl.value);
    final to = series == null ? _to : [for (final s in series) s.values];
    return [
      for (var s = 0; s < to.length; s++)
        [
          for (var i = 0; i < to[s].length; i++)
            _lerp(
                s < _from.length && i < _from[s].length ? _from[s][i] : null,
                to[s][i],
                t),
        ]
    ];
  }

  static double? _lerp(double? a, double? b, double t) {
    if (b == null) return null;
    return (a ?? b) + (b - (a ?? b)) * t;
  }

  @override
  void dispose() {
    _ctrl.dispose();
    _focus.dispose();
    super.dispose();
  }

  void _toggle(int i) {
    setState(() {
      if (_hidden.contains(i)) {
        _hidden.remove(i);
      } else if (_hidden.length < widget.series.length - 1) {
        _hidden.add(i);
      }
    });
  }

  String _fullLabel(int i) {
    final f = widget.fullLabels;
    return f != null && i < f.length ? f[i] : widget.labels[i];
  }

  List<String> _reading(int i) {
    final lines = <String>[_fullLabel(i)];
    var total = 0.0;
    for (var s = 0; s < widget.series.length; s++) {
      if (_hidden.contains(s)) continue;
      final v = i < widget.series[s].values.length
          ? widget.series[s].values[i]
          : null;
      total += v ?? 0;
      lines.add('${widget.series[s].name}: '
          '${v == null ? 'tidak ada data' : widget.format.format(v)}');
    }
    if (widget.stacked && widget.series.length > 1) {
      lines.add('Total: ${widget.format.format(total)}');
    }
    return lines;
  }

  String _textAlternative() {
    final b = StringBuffer();
    for (var i = 0; i < widget.labels.length; i++) {
      final r = _reading(i);
      b.write('${r.first}: ${r.skip(1).join(', ')}. ');
    }
    return b.toString().trim();
  }

  KeyEventResult _onKey(FocusNode node, KeyEvent e) {
    if (e is! KeyDownEvent && e is! KeyRepeatEvent) {
      return KeyEventResult.ignored;
    }
    final n = widget.labels.length;
    if (n == 0) return KeyEventResult.ignored;
    final k = e.logicalKey;
    int? next;
    if (k == LogicalKeyboardKey.arrowRight) {
      next = _active == null ? 0 : math.min(n - 1, _active! + 1);
    } else if (k == LogicalKeyboardKey.arrowLeft) {
      next = _active == null ? n - 1 : math.max(0, _active! - 1);
    } else if (k == LogicalKeyboardKey.home) {
      next = 0;
    } else if (k == LogicalKeyboardKey.end) {
      next = n - 1;
    } else if (k == LogicalKeyboardKey.escape) {
      setState(() => _active = null);
      return KeyEventResult.handled;
    }
    if (next == null) return KeyEventResult.ignored;
    setState(() => _active = next);
    return KeyEventResult.handled;
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final series = widget.series;
    final legend = widget.showLegend ?? series.length > 1;
    final values = _current();

    Widget plot = LayoutBuilder(builder: (context, box) {
      final size = Size(box.maxWidth, widget.height);
      final geo = _Geometry.compute(widget, _hidden, size, c);
      void pick(Offset p) => setState(() => _active = geo.indexAt(p.dx));
      return MouseRegion(
        onHover: (e) => pick(e.localPosition),
        onExit: (_) {
          if (!_focus.hasFocus) setState(() => _active = null);
        },
        child: GestureDetector(
          behavior: HitTestBehavior.opaque,
          onTapDown: (d) => pick(d.localPosition),
          onHorizontalDragUpdate: (d) => pick(d.localPosition),
          child: CustomPaint(
            size: size,
            painter: _CartesianPainter(
              chart: widget,
              geo: geo,
              values: values,
              hidden: Set.of(_hidden),
              active: _active,
              reading: _active == null ? const [] : _reading(_active!),
              colors: c,
            ),
          ),
        ),
      );
    });

    plot = Focus(
      focusNode: _focus,
      onKeyEvent: _onKey,
      onFocusChange: (f) => setState(() {}),
      child: Semantics(
        container: true,
        image: true,
        focusable: true,
        label: widget.semanticLabel,
        value: _active == null
            ? _textAlternative()
            : _reading(_active!).join(', '),
        liveRegion: _active != null,
        child: ExcludeSemantics(
          child: DecoratedBox(
            position: DecorationPosition.foreground,
            decoration: BoxDecoration(
              borderRadius:
                  const BorderRadius.all(Radius.circular(LdsRadius.sm)),
              border: _focus.hasFocus && _focus.highlightMode ==
                      FocusHighlightMode.traditional
                  ? Border.all(color: c.focus, width: 2)
                  : null,
            ),
            child: plot,
          ),
        ),
      ),
    );

    if (!legend) return plot;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      mainAxisSize: MainAxisSize.min,
      children: [
        LdsChartLegend(
          items: [
            for (var i = 0; i < series.length; i++)
              LdsLegendItem(
                series[i].name,
                (series[i].color ?? LdsSeriesColor.at(i)).resolve(c),
                on: !_hidden.contains(i),
              ),
          ],
          onToggle: series.length > 1 ? _toggle : null,
        ),
        const SizedBox(height: LdsSpace.s8),
        plot,
      ],
    );
  }
}

/// Plot area, scale and x positions shared by the painter and hit testing.
class _Geometry {
  _Geometry(this.plot, this.n, this.centered, this.min, this.max, this.step,
      this.tickLabels);

  final Rect plot;
  final int n;
  final bool centered;
  final double min;
  final double max;
  final double step;
  final List<TextPainter> tickLabels;

  double get slot => n == 0 ? plot.width : plot.width / n;

  double x(int i) {
    if (centered || n < 2) return plot.left + slot * (i + 0.5);
    return plot.left + plot.width * i / (n - 1);
  }

  double y(double v) =>
      plot.bottom - (v - min) / (max - min == 0 ? 1 : max - min) * plot.height;

  int? indexAt(double dx) {
    if (n == 0) return null;
    final i = centered || n < 2
        ? ((dx - plot.left) / slot).floor()
        : ((dx - plot.left) / plot.width * (n - 1)).round();
    return i.clamp(0, n - 1);
  }

  static _Geometry compute(
      LdsCartesianChart w, Set<int> hidden, Size size, LdsColors c) {
    final kinds = [for (final s in w.series) s.kind ?? w.kind];
    final centered = kinds.contains(LdsSeriesKind.bar);
    var lo = 0.0, hi = 0.0;
    var first = true;
    void take(double v) {
      if (first) {
        lo = math.min(0, v);
        hi = math.max(0, v);
        first = false;
      }
      lo = math.min(lo, v);
      hi = math.max(hi, v);
    }

    final n = w.labels.length;
    if (w.stacked) {
      for (var i = 0; i < n; i++) {
        var pos = 0.0, neg = 0.0;
        for (var s = 0; s < w.series.length; s++) {
          if (hidden.contains(s)) continue;
          final v = i < w.series[s].values.length ? w.series[s].values[i] : null;
          if (v == null) continue;
          if (v >= 0) {
            pos += v;
          } else {
            neg += v;
          }
        }
        take(pos);
        take(neg);
      }
    } else {
      for (var s = 0; s < w.series.length; s++) {
        if (hidden.contains(s)) continue;
        for (final v in w.series[s].values) {
          if (v != null) take(v);
        }
      }
    }
    for (final r in w.refs) {
      take(r.value);
    }
    if (w.yMin != null) lo = w.yMin!;
    if (w.yMax != null) hi = w.yMax!;
    final scale = niceScale(lo, hi);
    final min = w.yMin ?? scale.min;
    final max = w.yMax ?? scale.max;
    final style = axisStyle(c);
    final ticks = <TextPainter>[];
    var gutter = 0.0;
    if (!w.hideYAxis) {
      for (var v = min; v <= max + scale.step / 1000; v += scale.step) {
        final tp = layoutText(w.format.format(v), style);
        ticks.add(tp);
        gutter = math.max(gutter, tp.width);
      }
      gutter += 8;
    }
    final plot = Rect.fromLTRB(gutter, 8, size.width - 2, size.height - 22);
    return _Geometry(plot, n, centered, min, max, scale.step, ticks);
  }
}

class _CartesianPainter extends CustomPainter {
  _CartesianPainter({
    required this.chart,
    required this.geo,
    required this.values,
    required this.hidden,
    required this.active,
    required this.reading,
    required this.colors,
  });

  final LdsCartesianChart chart;
  final _Geometry geo;
  final List<List<double?>> values;
  final Set<int> hidden;
  final int? active;
  final List<String> reading;
  final LdsColors colors;

  @override
  void paint(Canvas canvas, Size size) {
    final c = colors;
    final plot = geo.plot;
    if (plot.width <= 0 || plot.height <= 0) return;
    final style = axisStyle(c);

    // Gridlines and tick labels.
    final grid = Paint()
      ..color = c.hairline
      ..strokeWidth = 1;
    var t = 0;
    for (var v = geo.min; v <= geo.max + geo.step / 1000; v += geo.step) {
      final y = geo.y(v).roundToDouble() + 0.5;
      final isZero = v.abs() < geo.step / 1000 && geo.min < 0;
      canvas.drawLine(Offset(plot.left, y), Offset(plot.right, y),
          isZero ? (Paint()..color = c.lineStrong) : grid);
      if (t < geo.tickLabels.length) {
        final tp = geo.tickLabels[t];
        tp.paint(canvas, Offset(plot.left - 8 - tp.width, y - tp.height / 2));
      }
      t++;
    }

    // X labels, thinned so they never collide.
    final n = geo.n;
    if (n > 0) {
      final widest = chart.labels
          .map((l) => layoutText(l, style).width)
          .fold<double>(0, math.max);
      final room = geo.centered || n < 2 ? geo.slot : plot.width / (n - 1);
      final every = math.max(1, ((widest + 8) / math.max(room, 1)).ceil());
      for (var i = 0; i < n; i += every) {
        final tp = layoutText(chart.labels[i], style);
        var x = geo.x(i) - tp.width / 2;
        x = x.clamp(0, math.max(0, size.width - tp.width));
        tp.paint(canvas, Offset(x, plot.bottom + 6));
      }
    }

    // Active band for bar charts.
    if (active != null && geo.centered) {
      canvas.drawRect(
          Rect.fromLTWH(plot.left + geo.slot * active!, plot.top, geo.slot,
              plot.height),
          Paint()..color = c.bgTint);
    }

    final kinds = [
      for (final s in chart.series) s.kind ?? chart.kind,
    ];
    Color colorOf(int s) =>
        (chart.series[s].color ?? LdsSeriesColor.at(s)).resolve(c);

    // Stack bases per index.
    final posBase = List<double>.filled(n, 0);
    final negBase = List<double>.filled(n, 0);
    final lower = <int, List<double>>{};
    final upper = <int, List<double>>{};
    if (chart.stacked) {
      for (var s = 0; s < values.length; s++) {
        if (hidden.contains(s)) continue;
        lower[s] = List<double>.filled(n, 0);
        upper[s] = List<double>.filled(n, 0);
        for (var i = 0; i < n; i++) {
          final v = i < values[s].length ? values[s][i] ?? 0 : 0.0;
          final base = v >= 0 ? posBase[i] : negBase[i];
          lower[s]![i] = base;
          upper[s]![i] = base + v;
          if (v >= 0) {
            posBase[i] += v;
          } else {
            negBase[i] += v;
          }
        }
      }
    }

    // Bars.
    final bars = [
      for (var s = 0; s < values.length; s++)
        if (kinds[s] == LdsSeriesKind.bar && !hidden.contains(s)) s
    ];
    if (bars.isNotEmpty) {
      final group = chart.stacked ? 1 : bars.length;
      final maxBar = group == 1 ? 36.0 : 26.0;
      final bw = math.max(
          2.0, math.min(maxBar, (geo.slot * 0.7 - (group - 1) * 2) / group));
      final single = bars.length == 1 && chart.highlight != null;
      for (var b = 0; b < bars.length; b++) {
        final s = bars[b];
        for (var i = 0; i < n; i++) {
          final double? v = chart.stacked
              ? upper[s]![i] - lower[s]![i]
              : (i < values[s].length ? values[s][i] : null);
          if (v == null || v == 0) continue;
          final from = chart.stacked ? lower[s]![i] : 0.0;
          final to = from + v;
          final gx = geo.x(i) -
              (group * bw + (group - 1) * 2) / 2 +
              (chart.stacked ? 0 : b * (bw + 2));
          final top = geo.y(math.max(from, to));
          final bottom = geo.y(math.min(from, to));
          final r = Radius.circular(math.min(4, bw / 2));
          final isTopOfStack = !chart.stacked || bars.last == s;
          final rect = RRect.fromRectAndCorners(
            Rect.fromLTRB(gx, top, gx + bw, bottom),
            topLeft: v > 0 && isTopOfStack ? r : Radius.zero,
            topRight: v > 0 && isTopOfStack ? r : Radius.zero,
            bottomLeft: v < 0 && isTopOfStack ? r : Radius.zero,
            bottomRight: v < 0 && isTopOfStack ? r : Radius.zero,
          );
          var color = colorOf(s);
          if (single && i != chart.highlight) color = c.accentTintStrong;
          canvas.drawRRect(rect, Paint()..color = color);
        }
      }
    }

    // Areas and lines.
    for (var s = 0; s < values.length; s++) {
      if (hidden.contains(s) || kinds[s] == LdsSeriesKind.bar) continue;
      final series = chart.series[s];
      final color = colorOf(s);
      final stackedArea = chart.stacked && kinds[s] == LdsSeriesKind.area;
      final pts = <Offset?>[
        for (var i = 0; i < n; i++)
          stackedArea
              ? Offset(geo.x(i), geo.y(upper[s]![i]))
              : (i < values[s].length && values[s][i] != null
                  ? Offset(geo.x(i), geo.y(values[s][i]!))
                  : null),
      ];
      final segments = <List<Offset>>[];
      var run = <Offset>[];
      for (final p in pts) {
        if (p == null) {
          if (run.isNotEmpty) segments.add(run);
          run = <Offset>[];
        } else {
          run.add(p);
        }
      }
      if (run.isNotEmpty) segments.add(run);

      Path linePath(List<Offset> run) {
        final path = Path()..moveTo(run.first.dx, run.first.dy);
        for (var k = 1; k < run.length; k++) {
          if (chart.step) path.lineTo(run[k].dx, run[k - 1].dy);
          path.lineTo(run[k].dx, run[k].dy);
        }
        return path;
      }

      for (final run in segments) {
        if (kinds[s] == LdsSeriesKind.area && !series.dashed) {
          final fill = linePath(run);
          if (stackedArea) {
            final firstI = pts.indexOf(run.first);
            for (var k = run.length - 1; k >= 0; k--) {
              final i = firstI + k;
              final y = geo.y(lower[s]![i]);
              if (chart.step && k < run.length - 1) {
                fill.lineTo(geo.x(i + 1), geo.y(lower[s]![i]));
              }
              fill.lineTo(geo.x(i), y);
            }
          } else {
            final base = geo.y(math.max(geo.min, math.min(0, geo.max)));
            fill
              ..lineTo(run.last.dx, base)
              ..lineTo(run.first.dx, base);
          }
          fill.close();
          canvas.drawPath(
              fill,
              Paint()
                ..color = color.withValues(alpha: stackedArea ? 0.24 : 0.12));
        }
        final stroke = Paint()
          ..color = color
          ..style = PaintingStyle.stroke
          ..strokeWidth = kinds[s] == LdsSeriesKind.line && s == 0 ? 2.25 : 2
          ..strokeJoin = StrokeJoin.round
          ..strokeCap = StrokeCap.round;
        if (series.dashed) {
          stroke.strokeWidth = 1.75;
          drawDashed(canvas, linePath(run), stroke);
        } else if (run.length == 1) {
          canvas.drawCircle(run.first, 2.5, Paint()..color = color);
        } else {
          canvas.drawPath(linePath(run), stroke);
        }
      }
    }

    // Reference lines.
    for (final r in chart.refs) {
      final y = geo.y(r.value);
      drawDashed(
        canvas,
        Path()
          ..moveTo(plot.left, y)
          ..lineTo(plot.right, y),
        Paint()
          ..color = c.textMuted
          ..strokeWidth = 1,
      );
      final tp = layoutText(
          r.label, style.copyWith(color: c.textSubtle, fontWeight: FontWeight.w500));
      tp.paint(canvas,
          Offset(plot.right - tp.width, math.max(0, y - tp.height - 2)));
    }

    // Crosshair, dots and tooltip.
    if (active != null && n > 0) {
      final x = geo.x(active!);
      if (!geo.centered) {
        canvas.drawLine(Offset(x, plot.top), Offset(x, plot.bottom),
            Paint()..color = c.lineStrong);
      }
      var anchorY = plot.center.dy;
      for (var s = 0; s < values.length; s++) {
        if (hidden.contains(s) || kinds[s] == LdsSeriesKind.bar) continue;
        final double? v = chart.stacked && kinds[s] == LdsSeriesKind.area
            ? upper[s]![active!]
            : (active! < values[s].length ? values[s][active!] : null);
        if (v == null) continue;
        final p = Offset(x, geo.y(v));
        anchorY = p.dy;
        canvas.drawCircle(p, 4.5, Paint()..color = c.bgBase);
        canvas.drawCircle(p, 3, Paint()..color = colorOf(s));
      }
      drawTooltip(canvas, Offset(x, anchorY), reading,
          Offset.zero & size, c);
    }
  }

  @override
  bool shouldRepaint(_CartesianPainter old) => true;
}
