import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../icon.dart';
import '../pressable.dart';
import '_chart_utils.dart';

/// State of a unit on an [LdsFloorPlan].
enum LdsFloorTone {
  /// Free or available: base with a hairline ring.
  free,

  /// Booked or seated: accent tint.
  accent,

  /// In use: solid accent. The busiest state, seen first.
  strong,

  /// Ready or inspected.
  success,

  /// Needs attention (cleaning, a request).
  warning,

  /// Broken or blocked.
  danger,

  /// Not available for a quiet reason: closed.
  muted,
}

/// A bookable thing on an [LdsFloorPlan]: a counter, a room, a desk.
@immutable
class LdsFloorUnit {
  /// Creates a unit placed on the grid (0 based column and row).
  const LdsFloorUnit({
    required this.id,
    required this.name,
    required this.meta,
    required this.column,
    required this.row,
    this.columnSpan = 1,
    this.rowSpan = 1,
    this.tone = LdsFloorTone.free,
    this.round = false,
    this.flag,
  });

  /// Stable key, passed to [LdsFloorPlan.onSelect].
  final String id;

  /// Short name ("Loket 3").
  final String name;

  /// The state or who is there, in words ("Kosong", "Dipesan 14.00").
  final String meta;

  /// First grid column.
  final int column;

  /// First grid row.
  final int row;

  /// Columns it covers.
  final int columnSpan;

  /// Rows it covers.
  final int rowSpan;

  /// State color; the state is always in [meta] too.
  final LdsFloorTone tone;

  /// A round table: a circle in a square area, a pill in a long one.
  final bool round;

  /// One icon in the corner for something that needs a look (ligature
  /// name). Say it in [meta] too.
  final String? flag;
}

/// A named dashed area behind the units ("Ruang tunggu"). Not interactive.
@immutable
class LdsFloorZone {
  /// Creates a zone placed on the grid.
  const LdsFloorZone({
    required this.name,
    required this.column,
    required this.row,
    this.columnSpan = 1,
    this.rowSpan = 1,
  });

  /// Name.
  final String name;

  /// First grid column.
  final int column;

  /// First grid row.
  final int row;

  /// Columns it covers.
  final int columnSpan;

  /// Rows it covers.
  final int rowSpan;
}

/// Bookable things drawn where they are: counters in a service hall, rooms
/// on a floor, desks in a co-working space.
///
/// Each unit is a button colored by its state, and the state is always in
/// words too, so people find a free one by place and by name. When the
/// plan is narrower than [minWidth] it scrolls sideways.
class LdsFloorPlan extends StatelessWidget {
  /// Creates a floor plan.
  const LdsFloorPlan({
    super.key,
    required this.columns,
    required this.units,
    required this.semanticLabel,
    this.zones = const <LdsFloorZone>[],
    this.rowHeight = 64,
    this.minWidth = 480,
    this.selected,
    this.onSelect,
  });

  /// Grid columns.
  final int columns;

  /// The units.
  final List<LdsFloorUnit> units;

  /// Areas behind the units.
  final List<LdsFloorZone> zones;

  /// Names the plan ("Mal Pelayanan Publik, lantai 1").
  final String semanticLabel;

  /// Height of one grid row.
  final double rowHeight;

  /// The narrowest the plan gets before the box scrolls.
  final double minWidth;

  /// Id of the unit whose details are open.
  final String? selected;

  /// Called with the id of the unit pressed.
  final ValueChanged<String>? onSelect;

  /// Colors for [tone] in [c]: fill, text and ring.
  static ({Color fill, Color text, Color ring}) toneColors(
      LdsColors c, LdsFloorTone tone) {
    switch (tone) {
      case LdsFloorTone.free:
        return (fill: c.bgBase, text: c.textStrong, ring: c.lineControl);
      case LdsFloorTone.accent:
        return (fill: c.accentTint, text: c.accentText, ring: c.accentTintStrong);
      case LdsFloorTone.strong:
        return (fill: c.accent, text: c.textOnAccent, ring: c.accent);
      case LdsFloorTone.success:
        return (fill: c.successTint, text: c.successText, ring: c.success);
      case LdsFloorTone.warning:
        return (fill: c.warningTint, text: c.warningText, ring: c.warning);
      case LdsFloorTone.danger:
        return (fill: c.dangerTint, text: c.dangerText, ring: c.danger);
      case LdsFloorTone.muted:
        return (fill: c.neutralTint, text: c.textMuted, ring: c.line);
    }
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final rows = [
      for (final u in units) u.row + u.rowSpan,
      for (final z in zones) z.row + z.rowSpan,
    ].fold<int>(1, math.max);
    const gap = 8.0;
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
          final width = math.max(box.maxWidth, minWidth);
          final colW = (width - gap * (columns - 1)) / columns;
          Rect area(int col, int row, int cs, int rs) => Rect.fromLTWH(
                col * (colW + gap),
                row * (rowHeight + gap),
                cs * colW + (cs - 1) * gap,
                rs * rowHeight + (rs - 1) * gap,
              );
          final plan = SizedBox(
            width: width,
            height: rows * rowHeight + (rows - 1) * gap,
            child: Stack(
              children: [
                for (final z in zones)
                  Positioned.fromRect(
                    rect: area(z.column, z.row, z.columnSpan, z.rowSpan),
                    child: CustomPaint(
                      painter: _ZonePainter(c.lineStrong),
                      child: Padding(
                        padding: const EdgeInsets.all(8),
                        child: Align(
                          alignment: Alignment.topLeft,
                          child: Text(z.name,
                              style: LdsType.footnote
                                  .copyWith(color: c.textSubtle)),
                        ),
                      ),
                    ),
                  ),
                for (final u in units)
                  Positioned.fromRect(
                    rect: area(u.column, u.row, u.columnSpan, u.rowSpan),
                    child: _unit(context, c, u),
                  ),
              ],
            ),
          );
          if (width <= box.maxWidth) return plan;
          return SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: plan,
          );
        }),
      ),
    );
  }

  Widget _unit(BuildContext context, LdsColors c, LdsFloorUnit u) {
    final t = toneColors(c, u.tone);
    final isSel = selected == u.id;
    return LayoutBuilder(builder: (context, box) {
      final radius = u.round
          ? BorderRadius.circular(math.min(box.maxWidth, box.maxHeight) / 2)
          : const BorderRadius.all(Radius.circular(LdsRadius.md));
      Widget face(LdsPressState s) {
        final ringWidth = s.hovered ? 1.5 : 1.0;
        return AnimatedContainer(
          duration: context.ldsDuration(LdsMotion.standard),
          decoration: BoxDecoration(
            color: t.fill,
            borderRadius: radius,
            border: Border.all(
              color: t.ring,
              width: u.tone == LdsFloorTone.free ||
                      u.tone == LdsFloorTone.muted ||
                      s.hovered
                  ? ringWidth
                  : 0,
              style: u.tone == LdsFloorTone.free ||
                      u.tone == LdsFloorTone.muted ||
                      s.hovered
                  ? BorderStyle.solid
                  : BorderStyle.none,
            ),
            boxShadow: isSel
                ? [
                    BoxShadow(color: c.bgFill, spreadRadius: 2),
                    BoxShadow(color: c.accent, spreadRadius: 4),
                  ]
                : null,
          ),
          child: Stack(
            children: [
              Center(
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 6),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(u.name,
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: LdsType.subhead.copyWith(
                              fontWeight: FontWeight.w600,
                              color: t.text,
                              fontFeatures: tabular)),
                      Text(u.meta,
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: LdsType.footnote.copyWith(
                              fontSize: 12,
                              color: u.tone == LdsFloorTone.strong
                                  ? t.text
                                  : (u.tone == LdsFloorTone.free
                                      ? c.textSubtle
                                      : t.text))),
                    ],
                  ),
                ),
              ),
              if (u.flag != null)
                Positioned(
                  top: 4,
                  right: 4,
                  child: LdsIcon(u.flag!, size: 14, color: t.text),
                ),
            ],
          ),
        );
      }

      return LdsPressable(
        onPressed: onSelect == null ? null : () => onSelect!(u.id),
        selected: onSelect == null ? null : isSel,
        semanticLabel: '${u.name}, ${u.meta}',
        excludeChildSemantics: true,
        borderRadius: radius,
        minSize: Size.zero,
        builder: (context, s) => face(s),
      );
    });
  }
}

class _ZonePainter extends CustomPainter {
  _ZonePainter(this.color);

  final Color color;

  @override
  void paint(Canvas canvas, Size size) {
    final path = Path()
      ..addRRect(RRect.fromRectAndRadius(
          (Offset.zero & size).deflate(0.5),
          const Radius.circular(LdsRadius.md)));
    drawDashed(
        canvas,
        path,
        Paint()
          ..style = PaintingStyle.stroke
          ..strokeWidth = 1
          ..color = color,
        dash: 5);
  }

  @override
  bool shouldRepaint(_ZonePainter old) => old.color != color;
}
