import 'package:flutter/material.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../button.dart';
import '../pressable.dart';
import 'parts.dart';

/// A month grid of round day buttons, Monday first: today in accent text,
/// the selection in the accent fill, and a range filled between its ends.
///
/// Give [selected] for one day or [range] for a span. The shown month is
/// managed inside unless [month] is set, in which case [onMonthChanged]
/// moves it. Arrow keys move between days.
class LdsCalendar extends StatefulWidget {
  /// Creates a calendar.
  const LdsCalendar({
    super.key,
    this.selected,
    this.range,
    this.previewEnd,
    this.onSelected,
    this.onHover,
    this.month,
    this.initialMonth,
    this.onMonthChanged,
    this.firstDate,
    this.lastDate,
    this.today,
    this.showPrevious = true,
    this.showNext = true,
    this.framed = true,
    this.previousLabel = 'Bulan sebelumnya',
    this.nextLabel = 'Bulan berikutnya',
  });

  /// The chosen day.
  final DateTime? selected;

  /// The chosen span.
  final DateTimeRange? range;

  /// While picking a span: the hovered or focused day after the start, shown
  /// as a quiet preview.
  final DateTime? previewEnd;

  /// Called with the day people pick. Null makes the grid read-only.
  final ValueChanged<DateTime>? onSelected;

  /// Called when a day is hovered or focused, for range previews.
  final ValueChanged<DateTime>? onHover;

  /// The month shown, when controlled from outside.
  final DateTime? month;

  /// The first month shown when [month] is null; defaults to the selection
  /// or today.
  final DateTime? initialMonth;

  /// Called when the previous or next button changes the month.
  final ValueChanged<DateTime>? onMonthChanged;

  /// Earliest day that can be picked.
  final DateTime? firstDate;

  /// Latest day that can be picked.
  final DateTime? lastDate;

  /// Overrides today, for tests and examples.
  final DateTime? today;

  /// Show the previous month button.
  final bool showPrevious;

  /// Show the next month button.
  final bool showNext;

  /// Draw the card edge and padding (off inside a popover).
  final bool framed;

  /// Previous month button label.
  final String previousLabel;

  /// Next month button label.
  final String nextLabel;

  @override
  State<LdsCalendar> createState() => _LdsCalendarState();
}

class _LdsCalendarState extends State<LdsCalendar> {
  late DateTime _month = _first(widget.initialMonth ??
      widget.selected ??
      widget.range?.start ??
      widget.today ??
      DateTime.now());

  static DateTime _first(DateTime d) => DateTime(d.year, d.month);

  DateTime get _shown => widget.month != null ? _first(widget.month!) : _month;

  void _go(int delta) {
    final next = DateTime(_shown.year, _shown.month + delta);
    if (widget.month == null) setState(() => _month = next);
    widget.onMonthChanged?.call(next);
  }

  bool _allowed(DateTime d) =>
      (widget.firstDate == null ||
          !d.isBefore(ldsFormsDay(widget.firstDate!))) &&
      (widget.lastDate == null || !d.isAfter(ldsFormsDay(widget.lastDate!)));

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final month = _shown;
    final today = ldsFormsDay(widget.today ?? DateTime.now());
    final lead = (month.weekday - DateTime.monday) % 7;
    final daysIn = DateTime(month.year, month.month + 1, 0).day;
    final weeks = ((lead + daysIn) / 7).ceil();

    DateTime? rStart = widget.range?.start;
    DateTime? rEnd = widget.range?.end;
    var preview = false;
    if (rStart != null && widget.previewEnd != null && widget.range == null) {
      rEnd = widget.previewEnd;
      preview = true;
    }
    if (widget.range == null &&
        widget.selected != null &&
        widget.previewEnd != null) {
      rStart = widget.selected;
      rEnd = widget.previewEnd;
      preview = true;
    }
    if (rStart != null && rEnd != null && rEnd.isBefore(rStart)) {
      final t = rStart;
      rStart = rEnd;
      rEnd = t;
    }
    if (rStart != null) rStart = ldsFormsDay(rStart);
    if (rEnd != null) rEnd = ldsFormsDay(rEnd);

    Widget day(DateTime d) {
      final inMonth = d.month == month.month;
      final allowed = _allowed(d) && widget.onSelected != null;
      final isStart = ldsFormsSameDay(d, rStart);
      final isEnd = ldsFormsSameDay(d, rEnd);
      final ends = (isStart || isEnd) && !(preview && isEnd && !isStart);
      final selected = ldsFormsSameDay(d, widget.selected) || ends;
      final between = rStart != null &&
          rEnd != null &&
          !d.isBefore(rStart) &&
          !d.isAfter(rEnd) &&
          !ldsFormsSameDay(rStart, rEnd);
      final isToday = d == today;
      final band = preview ? c.bgTintStrong : c.accentTint;

      return Expanded(
        child: Stack(
          alignment: Alignment.center,
          children: [
            if (between && inMonth)
              Positioned.fill(
                top: 3,
                bottom: 3,
                child: FractionallySizedBox(
                  alignment: isStart
                      ? Alignment.centerRight
                      : isEnd
                          ? Alignment.centerLeft
                          : Alignment.center,
                  widthFactor: isStart || isEnd ? 0.5 : 1,
                  child: ColoredBox(color: band),
                ),
              ),
            Semantics(
              label: '${d.day} ${ldsFormsMonths[d.month - 1]} ${d.year}',
              selected: selected,
              excludeSemantics: true,
              child: _HoverReport(
                onHover: allowed && widget.onHover != null
                    ? () => widget.onHover!(d)
                    : null,
                child: LdsPressable(
                  onPressed: allowed ? () => widget.onSelected!(d) : null,
                  pressedScale: 0.88,
                  minSize: const Size(0, LdsSize.touchMin),
                  borderRadius:
                      const BorderRadius.all(Radius.circular(LdsRadius.pill)),
                  builder: (context, state) {
                    final Color bg;
                    if (selected) {
                      bg = c.accent;
                    } else if (state.hovered || state.pressed) {
                      bg = c.bgTintStrong;
                    } else {
                      bg = Colors.transparent;
                    }
                    final Color fg;
                    if (selected) {
                      fg = c.textOnAccent;
                    } else if (!inMonth || !_allowed(d)) {
                      fg = c.textFaint;
                    } else if (isToday || (between && !preview)) {
                      fg = c.accentText;
                    } else {
                      fg = c.textStrong;
                    }
                    return AnimatedContainer(
                      duration: context.ldsDuration(LdsMotion.fast),
                      width: 38,
                      height: 38,
                      alignment: Alignment.center,
                      decoration:
                          BoxDecoration(color: bg, shape: BoxShape.circle),
                      child: Text(
                        '${d.day}',
                        style: LdsType.body.copyWith(
                          color: fg,
                          height: 1,
                          fontWeight: selected || isToday
                              ? FontWeight.w600
                              : FontWeight.w400,
                          fontFeatures: const [FontFeature.tabularFigures()],
                        ),
                      ),
                    );
                  },
                ),
              ),
            ),
          ],
        ),
      );
    }

    final grid = Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Padding(
          padding: const EdgeInsets.only(left: 4, bottom: 6),
          child: Row(
            children: [
              Expanded(
                child: Semantics(
                  liveRegion: true,
                  child: Text(
                    '${ldsFormsMonths[month.month - 1]} ${month.year}',
                    style: LdsType.bodyStrong.copyWith(
                      color: c.textStrong,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ),
              Visibility(
                visible: widget.showPrevious,
                maintainSize: true,
                maintainAnimation: true,
                maintainState: true,
                child: LdsIconButton(
                  icon: 'chevron_left',
                  semanticLabel: widget.previousLabel,
                  showTooltip: false,
                  onPressed: () => _go(-1),
                ),
              ),
              Visibility(
                visible: widget.showNext,
                maintainSize: true,
                maintainAnimation: true,
                maintainState: true,
                child: LdsIconButton(
                  icon: 'chevron_right',
                  semanticLabel: widget.nextLabel,
                  showTooltip: false,
                  onPressed: () => _go(1),
                ),
              ),
            ],
          ),
        ),
        ExcludeSemantics(
          child: Row(
            children: [
              for (final w in ldsFormsWeekdays)
                Expanded(
                  child: SizedBox(
                    height: 28,
                    child: Center(
                      child: Text(
                        w,
                        style: LdsType.caption.copyWith(
                          fontSize: 11.5,
                          color: c.textMuted,
                          letterSpacing: 0,
                        ),
                      ),
                    ),
                  ),
                ),
            ],
          ),
        ),
        FocusTraversalGroup(
          child: Column(
            children: [
              for (var w = 0; w < weeks; w++)
                Row(
                  children: [
                    for (var i = 0; i < 7; i++)
                      day(DateTime(
                          month.year, month.month, 1 - lead + w * 7 + i)),
                  ],
                ),
            ],
          ),
        ),
      ],
    );

    if (!widget.framed) return grid;
    return Container(
      constraints: const BoxConstraints(maxWidth: 340),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: c.bgBase,
        borderRadius: const BorderRadius.all(Radius.circular(18)),
        border: Border.all(color: c.line),
      ),
      child: grid,
    );
  }
}

/// Reports pointer entry and keyboard focus inside its child.
class _HoverReport extends StatelessWidget {
  const _HoverReport({required this.onHover, required this.child});

  final VoidCallback? onHover;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    if (onHover == null) return child;
    return MouseRegion(
      onEnter: (_) => onHover!(),
      child: Focus(
        canRequestFocus: false,
        skipTraversal: true,
        onFocusChange: (has) {
          if (has) onHover!();
        },
        child: child,
      ),
    );
  }
}
