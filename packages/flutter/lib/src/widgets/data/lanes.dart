import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../pressable.dart';
import 'avatar.dart';

/// One time column of [LdsLanes]: an hour, or a day.
@immutable
class LdsLaneTick {
  /// Creates a time column.
  const LdsLaneTick(this.label,
      {this.sub, this.today = false, this.off = false});

  /// "Sen", "08.00".
  final String label;

  /// The date under a weekday, "17".
  final String? sub;

  /// Today, in accent.
  final bool today;

  /// Weekend or closed, on the quiet fill.
  final bool off;
}

/// The kind of an [LdsLaneItem], which sets its color.
enum LdsLaneKind {
  /// Chart series 1.
  series1,

  /// Chart series 2.
  series2,

  /// Chart series 3.
  series3,

  /// Chart series 4.
  series4,

  /// Breaks and blocked time: neutral, quieter text.
  muted,

  /// Not settled yet (a request, a hold): a dashed edge, no fill.
  pending,

  /// Open time people can book: dashed neutral edge, success text.
  free,
}

/// One block in a lane.
@immutable
class LdsLaneItem {
  /// Creates a block.
  const LdsLaneItem({
    required this.from,
    required this.span,
    required this.title,
    this.subtitle,
    this.kind = LdsLaneKind.series1,
    this.onTap,
    this.isNew = false,
  });

  /// Columns from the start; fractions are allowed.
  final double from;

  /// Columns covered.
  final double span;

  /// What the block is.
  final String title;

  /// A second line.
  final String? subtitle;

  /// Color and style.
  final LdsLaneKind kind;

  /// Opens the block.
  final VoidCallback? onTap;

  /// Just added: grows in from its start once.
  final bool isNew;
}

/// One row of [LdsLanes]: a person, a room, a vehicle.
@immutable
class LdsLaneRow {
  /// Creates a row.
  const LdsLaneRow({
    required this.name,
    this.sub,
    this.avatar,
    this.items = const <LdsLaneItem>[],
    this.off = const <(double, double)>[],
    this.onTap,
  });

  /// Name, pinned on the left.
  final String name;

  /// Role or detail under the name.
  final String? sub;

  /// An avatar before the name.
  final LdsAvatar? avatar;

  /// Blocks in this row.
  final List<LdsLaneItem> items;

  /// Time that does not count, as (from, span) pairs.
  final List<(double, double)> off;

  /// Opens the person or resource.
  final VoidCallback? onTap;
}

/// Who is doing what across time: shifts, leave, room bookings, vehicles.
///
/// Names stay pinned on the left while the time columns scroll sideways.
/// [now] draws a line for the current time, in columns from the start.
class LdsLanes extends StatelessWidget {
  /// Creates a lanes view.
  const LdsLanes({
    super.key,
    required this.ticks,
    required this.rows,
    required this.semanticLabel,
    this.corner = '',
    this.now,
    this.colMinWidth = 56,
    this.whoWidth = 200,
    this.rowHeight = 56,
    this.empty,
  });

  /// The time columns.
  final List<LdsLaneTick> ticks;

  /// The rows.
  final List<LdsLaneRow> rows;

  /// Names the span, for example "Cuti pegawai, 17 sampai 30 November".
  final String semanticLabel;

  /// What the rows are, above the names ("Pegawai").
  final String corner;

  /// The current time, in columns from the start.
  final double? now;

  /// Narrowest a time column gets before the view scrolls.
  final double colMinWidth;

  /// Width of the name column.
  final double whoWidth;

  /// Height of a row.
  final double rowHeight;

  /// Shown under the head when there are no rows.
  final Widget? empty;

  static const double _headHeight = 48;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    return Semantics(
      label: semanticLabel,
      container: true,
      explicitChildNodes: true,
      child: Container(
        clipBehavior: Clip.antiAlias,
        decoration: BoxDecoration(
          color: c.bgBase,
          borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.lg)),
          border: Border.all(color: c.line),
        ),
        child: LayoutBuilder(builder: (context, box) {
          final avail = (box.maxWidth.isFinite ? box.maxWidth : 800) - 2;
          final who = math.min(whoWidth, avail * 0.45);
          final cols = math.max(1, ticks.length);
          final col = math.max(colMinWidth, (avail - who) / cols);
          final trackWidth = col * cols;

          final names = Column(
            children: [
              _corner(context, who),
              for (final r in rows) _who(context, r, who),
            ],
          );
          final tracks = SizedBox(
            width: trackWidth,
            child: Stack(
              children: [
                Column(
                  children: [
                    _head(context, col),
                    for (final r in rows) _track(context, r, col),
                  ],
                ),
                if (now != null && rows.isNotEmpty)
                  Positioned(
                    left: now! * col - 1,
                    top: _headHeight,
                    bottom: 0,
                    child: IgnorePointer(
                      child: Container(width: 2, color: c.danger),
                    ),
                  ),
              ],
            ),
          );
          return Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            mainAxisSize: MainAxisSize.min,
            children: [
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(width: who, child: names),
                  Expanded(
                    child: SingleChildScrollView(
                      scrollDirection: Axis.horizontal,
                      child: tracks,
                    ),
                  ),
                ],
              ),
              if (rows.isEmpty && empty != null) empty!,
            ],
          );
        }),
      ),
    );
  }

  Widget _corner(BuildContext context, double width) {
    final c = context.lds;
    return Container(
      height: _headHeight,
      width: width,
      padding: const EdgeInsets.symmetric(horizontal: 16),
      alignment: AlignmentDirectional.centerStart,
      decoration: BoxDecoration(
        color: c.bgFill,
        border: Border(
          bottom: BorderSide(color: c.line),
          right: BorderSide(color: c.line),
        ),
      ),
      child: Text(corner,
          style: LdsType.footnote
              .copyWith(color: c.textSubtle, fontWeight: FontWeight.w500)),
    );
  }

  Widget _head(BuildContext context, double col) {
    final c = context.lds;
    return Container(
      height: _headHeight,
      decoration: BoxDecoration(
        color: c.bgFill,
        border: Border(bottom: BorderSide(color: c.line)),
      ),
      child: Row(
        children: [
          for (final t in ticks)
            Container(
              width: col,
              alignment: Alignment.center,
              color: t.off ? c.bgRecessed : null,
              child: Semantics(
                label: [t.label, if (t.sub != null) t.sub!].join(' '),
                excludeSemantics: true,
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      t.label,
                      style: LdsType.caption.copyWith(
                        color: t.today ? c.accentText : c.textSubtle,
                      ),
                    ),
                    if (t.sub != null)
                      Text(
                        t.sub!,
                        style: LdsType.subhead.copyWith(
                          height: 1.2,
                          fontWeight: FontWeight.w600,
                          color: t.today ? c.accentText : c.textStrong,
                          fontFeatures: const [FontFeature.tabularFigures()],
                        ),
                      ),
                  ],
                ),
              ),
            ),
        ],
      ),
    );
  }

  Widget _who(BuildContext context, LdsLaneRow r, double width) {
    final c = context.lds;
    Widget content(bool hot) => Container(
          height: rowHeight,
          width: width,
          padding: const EdgeInsets.symmetric(horizontal: 16),
          decoration: BoxDecoration(
            color: hot ? Color.alphaBlend(c.bgTint, c.bgBase) : c.bgBase,
            border: Border(
              bottom: BorderSide(color: c.hairline),
              right: BorderSide(color: c.line),
            ),
          ),
          child: Row(
            children: [
              if (r.avatar != null) ...[r.avatar!, const SizedBox(width: 10)],
              Expanded(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(r.name,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: LdsType.subhead.copyWith(
                            color: c.textStrong, fontWeight: FontWeight.w500)),
                    if (r.sub != null)
                      Text(r.sub!,
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style:
                              LdsType.footnote.copyWith(color: c.textSubtle)),
                  ],
                ),
              ),
            ],
          ),
        );
    if (r.onTap == null) return MergeSemantics(child: content(false));
    return LdsPressable(
      onPressed: r.onTap,
      pressedScale: 1,
      borderRadius: BorderRadius.zero,
      builder: (context, state) => content(state.hovered || state.pressed),
    );
  }

  Widget _track(BuildContext context, LdsLaneRow r, double col) {
    final c = context.lds;
    return Container(
      height: rowHeight,
      decoration: BoxDecoration(
        border: Border(bottom: BorderSide(color: c.hairline)),
      ),
      child: Stack(
        children: [
          // A hairline per column.
          Row(
            children: [
              for (var i = 0; i < ticks.length; i++)
                Container(
                  width: col,
                  decoration: BoxDecoration(
                    color: ticks[i].off ? c.bgFill : null,
                    border: i == 0
                        ? null
                        : Border(left: BorderSide(color: c.hairline)),
                  ),
                ),
            ],
          ),
          for (final o in r.off)
            Positioned(
              left: o.$1 * col,
              width: o.$2 * col,
              top: 0,
              bottom: 0,
              child: ColoredBox(color: c.bgFill),
            ),
          for (final it in r.items)
            Positioned(
              left: it.from * col + 2,
              width: math.max(0, it.span * col - 4),
              top: 8,
              bottom: 9,
              child: _LaneBlock(item: it),
            ),
        ],
      ),
    );
  }
}

class _LaneBlock extends StatelessWidget {
  const _LaneBlock({required this.item});

  final LdsLaneItem item;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final reduce = context.ldsReduceMotion;
    final tone = switch (item.kind) {
      LdsLaneKind.series1 => c.series1,
      LdsLaneKind.series2 => c.series2,
      LdsLaneKind.series3 => c.series3,
      LdsLaneKind.series4 => c.series4,
      LdsLaneKind.muted || LdsLaneKind.free => c.neutral,
      LdsLaneKind.pending => c.series1,
    };
    final dashed =
        item.kind == LdsLaneKind.pending || item.kind == LdsLaneKind.free;
    Widget block(bool hot) {
      final fill = dashed
          ? (hot ? tone.withValues(alpha: 0.14) : Colors.transparent)
          : Color.alphaBlend(
              tone.withValues(alpha: hot ? 0.24 : 0.14), c.bgBase);
      final textColor = item.kind == LdsLaneKind.free
          ? c.successText
          : item.kind == LdsLaneKind.muted
              ? c.textSubtle
              : c.textStrong;
      return Container(
        decoration: BoxDecoration(
          color: fill,
          borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.xs)),
        ),
        foregroundDecoration: dashed ? _DashedBorder(tone) : null,
        clipBehavior: Clip.antiAlias,
        child: Stack(
          children: [
            Padding(
              padding:
                  EdgeInsetsDirectional.only(start: dashed ? 8 : 11, end: 8),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(item.title,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(
                        fontFamily: LdsType.family,
                        fontSize: 12,
                        height: 16 / 12,
                        fontWeight: FontWeight.w500,
                        color: textColor,
                      )),
                  if (item.subtitle != null)
                    Text(item.subtitle!,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: TextStyle(
                          fontFamily: LdsType.family,
                          fontSize: 11.5,
                          height: 15 / 11.5,
                          color: c.textSubtle,
                        )),
                ],
              ),
            ),
            if (!dashed)
              PositionedDirectional(
                start: 0,
                top: 0,
                bottom: 0,
                child: SizedBox(width: 3, child: ColoredBox(color: tone)),
              ),
          ],
        ),
      );
    }

    Widget result = item.onTap == null
        ? Semantics(
            label: [item.title, if (item.subtitle != null) item.subtitle!]
                .join(', '),
            excludeSemantics: true,
            child: block(false),
          )
        : LdsPressable(
            onPressed: item.onTap,
            minSize: Size.zero,
            borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.xs)),
            semanticLabel: [
              item.title,
              if (item.subtitle != null) item.subtitle!
            ].join(', '),
            excludeChildSemantics: true,
            builder: (context, state) => block(state.hovered || state.pressed),
          );
    if (item.isNew && !reduce) {
      result = TweenAnimationBuilder<double>(
        tween: Tween(begin: 0, end: 1),
        duration: LdsMotion.snappySpringDuration,
        curve: LdsSpringCurve.snappy,
        builder: (context, t, child) => Transform(
          alignment: AlignmentDirectional.centerStart
              .resolve(Directionality.of(context)),
          transform: Matrix4.diagonal3Values(t, 1, 1),
          child: child,
        ),
        child: result,
      );
    }
    return result;
  }
}

/// A dashed rounded outline, for pending and free blocks.
class _DashedBorder extends Decoration {
  const _DashedBorder(this.color);

  final Color color;

  @override
  BoxPainter createBoxPainter([VoidCallback? onChanged]) =>
      _DashedPainter(color);
}

class _DashedPainter extends BoxPainter {
  _DashedPainter(this.color);

  final Color color;

  @override
  void paint(Canvas canvas, Offset offset, ImageConfiguration configuration) {
    final size = configuration.size;
    if (size == null) return;
    final rect = (offset & size).deflate(0.75);
    final path = Path()
      ..addRRect(
          RRect.fromRectAndRadius(rect, const Radius.circular(LdsRadius.xs)));
    final paint = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1.5
      ..color = color;
    for (final m in path.computeMetrics()) {
      var d = 0.0;
      while (d < m.length) {
        canvas.drawPath(m.extractPath(d, math.min(d + 4, m.length)), paint);
        d += 7;
      }
    }
  }
}
