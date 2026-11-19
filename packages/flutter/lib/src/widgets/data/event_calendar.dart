import 'dart:math' as math;

import 'package:material_ui/material_ui.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../button.dart';
import '../pressable.dart';
import '../segmented.dart';

const List<String> _monthNames = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', //
  'Agustus', 'September', 'Oktober', 'November', 'Desember',
];
const List<String> _dayShort = [
  'Sen',
  'Sel',
  'Rab',
  'Kam',
  'Jum',
  'Sab',
  'Min',
];
const List<String> _dayLong = [
  'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu', //
];

/// One event on an [LdsEventCalendar].
@immutable
class LdsCalendarEvent {
  /// Creates an event.
  const LdsCalendarEvent({
    required this.id,
    required this.title,
    required this.start,
    this.end,
    this.allDay = false,
    this.tone = 1,
    this.where,
  }) : assert(tone >= 1 && tone <= 4, 'tone is a chart series, 1 to 4');

  /// Stable identity.
  final String id;

  /// What happens.
  final String title;

  /// When it starts.
  final DateTime start;

  /// When it ends; null is a point in time (or the same day when [allDay]).
  final DateTime? end;

  /// Lasts whole days.
  final bool allDay;

  /// Chart series color, 1 to 4, one per kind of event.
  final int tone;

  /// Where it happens.
  final String? where;

  DateTime get _endOrStart => end ?? start;

  bool _on(DateTime day) {
    final d = DateUtils.dateOnly(day);
    return !d.isBefore(DateUtils.dateOnly(start)) &&
        !d.isAfter(DateUtils.dateOnly(_endOrStart));
  }
}

/// The views of an [LdsEventCalendar].
enum LdsCalendarView {
  /// A month grid of chips. The default.
  month,

  /// One week by the hour. On narrow screens agenda is shown instead.
  week,

  /// A list of what comes next, by day.
  agenda,
}

/// A calendar of events by month, week or agenda: public hearings, posyandu
/// schedules, office closures.
///
/// Moving to the next or previous period slides the body in from that side;
/// changing view fades it. Under reduced motion views swap with a short
/// fade.
class LdsEventCalendar extends StatefulWidget {
  /// Creates an event calendar.
  const LdsEventCalendar({
    super.key,
    required this.events,
    this.initialDate,
    this.today,
    this.now,
    this.initialView = LdsCalendarView.month,
    this.startHour = 7,
    this.endHour = 20,
    this.onEventTap,
    this.emptyLabel = 'Tidak ada acara bulan ini',
  });

  /// All events.
  final List<LdsCalendarEvent> events;

  /// The date shown first; defaults to [today].
  final DateTime? initialDate;

  /// Today, for fixed examples; defaults to the clock.
  final DateTime? today;

  /// The time of the now line in the week view; defaults to the clock.
  final TimeOfDay? now;

  /// The view shown first.
  final LdsCalendarView initialView;

  /// First hour in the week view.
  final int startHour;

  /// Last hour in the week view.
  final int endHour;

  /// Opens an event.
  final ValueChanged<LdsCalendarEvent>? onEventTap;

  /// Agenda text when the month has no events.
  final String emptyLabel;

  @override
  State<LdsEventCalendar> createState() => _LdsEventCalendarState();
}

class _LdsEventCalendarState extends State<LdsEventCalendar> {
  late DateTime _date = DateUtils.dateOnly(
    widget.initialDate ?? widget.today ?? DateTime.now(),
  );
  late LdsCalendarView _view = widget.initialView;
  DateTime? _selectedDay;
  int _direction = 0;

  DateTime get _today => DateUtils.dateOnly(widget.today ?? DateTime.now());

  DateTime _weekStart(DateTime d) =>
      DateUtils.dateOnly(d).subtract(Duration(days: d.weekday - 1));

  void _shift(int dir) {
    setState(() {
      _direction = dir;
      _selectedDay = null;
      _date = _view == LdsCalendarView.week
          ? _date.add(Duration(days: 7 * dir))
          : DateTime(_date.year, _date.month + dir);
    });
  }

  String _title(LdsCalendarView view) {
    if (view != LdsCalendarView.week) {
      return '${_monthNames[_date.month - 1]} ${_date.year}';
    }
    final s = _weekStart(_date);
    final e = s.add(const Duration(days: 6));
    return s.month == e.month
        ? '${s.day} sampai ${e.day} ${_monthNames[e.month - 1]} ${e.year}'
        : '${s.day} ${_monthNames[s.month - 1]} sampai '
              '${e.day} ${_monthNames[e.month - 1]} ${e.year}';
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final reduce = context.ldsReduceMotion;
    return LayoutBuilder(
      builder: (context, box) {
        final narrow = box.maxWidth < 640;
        final view = narrow && _view == LdsCalendarView.week
            ? LdsCalendarView.agenda
            : _view;
        final body = switch (view) {
          LdsCalendarView.month => _month(context, narrow),
          LdsCalendarView.week => _week(context),
          LdsCalendarView.agenda => _agenda(context),
        };
        return Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          mainAxisSize: MainAxisSize.min,
          children: [
            Wrap(
              alignment: WrapAlignment.spaceBetween,
              crossAxisAlignment: WrapCrossAlignment.center,
              spacing: 12,
              runSpacing: 8,
              children: [
                Semantics(
                  liveRegion: true,
                  header: true,
                  child: Text(
                    _title(view),
                    style: LdsType.title3.copyWith(color: c.textStrong),
                  ),
                ),
                Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    LdsIconButton(
                      icon: 'chevron_left',
                      semanticLabel: view == LdsCalendarView.week
                          ? 'Minggu sebelumnya'
                          : 'Bulan sebelumnya',
                      onPressed: () => _shift(-1),
                    ),
                    LdsButton(
                      label: 'Hari ini',
                      variant: LdsButtonVariant.gray,
                      size: LdsButtonSize.sm,
                      onPressed: () => setState(() {
                        _direction = _today.isBefore(_date) ? -1 : 1;
                        _date = _today;
                      }),
                    ),
                    LdsIconButton(
                      icon: 'chevron_right',
                      semanticLabel: view == LdsCalendarView.week
                          ? 'Minggu berikutnya'
                          : 'Bulan berikutnya',
                      onPressed: () => _shift(1),
                    ),
                    SizedBox(width: narrow ? 4 : 8),
                    SizedBox(
                      // The segmented control fills a bounded width. Narrow
                      // shows two segments, so 152 keeps the whole toolbar
                      // within a 375 pt phone with 16 pt gutters and a card
                      // padding of 16.
                      width: narrow ? 152 : 252,
                      child: LdsSegmented<LdsCalendarView>(
                        semanticLabel: 'Tampilan kalender',
                        value: view,
                        segments: [
                          const LdsSegment(
                            value: LdsCalendarView.month,
                            label: 'Bulan',
                          ),
                          if (!narrow)
                            const LdsSegment(
                              value: LdsCalendarView.week,
                              label: 'Minggu',
                            ),
                          const LdsSegment(
                            value: LdsCalendarView.agenda,
                            label: 'Agenda',
                          ),
                        ],
                        onChanged: (v) => setState(() {
                          _direction = 0;
                          _view = v;
                        }),
                      ),
                    ),
                  ],
                ),
              ],
            ),
            const SizedBox(height: 12),
            AnimatedSwitcher(
              duration: reduce
                  ? LdsMotion.instant
                  : _direction == 0
                  ? LdsMotion.standard
                  : LdsMotion.smoothSpringDuration,
              switchInCurve: reduce || _direction == 0
                  ? LdsMotion.standardCurve
                  : LdsSpringCurve.smooth,
              layoutBuilder: (current, previous) =>
                  current ?? const SizedBox.shrink(),
              transitionBuilder: (child, animation) {
                final fade = FadeTransition(opacity: animation, child: child);
                if (reduce || _direction == 0) return fade;
                return AnimatedBuilder(
                  animation: animation,
                  builder: (context, child) => Transform.translate(
                    offset: Offset(24 * _direction * (1 - animation.value), 0),
                    child: child,
                  ),
                  child: fade,
                );
              },
              child: KeyedSubtree(
                key: ValueKey('$view ${_title(view)}'),
                child: body,
              ),
            ),
          ],
        );
      },
    );
  }

  // Month -----------------------------------------------------------------

  Widget _month(BuildContext context, bool narrow) {
    final c = context.lds;
    final first = DateTime(_date.year, _date.month);
    final gridStart = _weekStart(first);
    final days = [
      for (var i = 0; i < 42; i++)
        DateTime(gridStart.year, gridStart.month, gridStart.day + i),
    ];
    final weeks =
        days.last.subtract(const Duration(days: 6)).month == _date.month
        ? 6
        : 5;
    final selected = _selectedDay;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          clipBehavior: Clip.antiAlias,
          decoration: BoxDecoration(
            color: c.bgBase,
            borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.lg)),
            border: Border.all(color: c.line),
          ),
          child: Column(
            children: [
              ExcludeSemantics(
                child: Container(
                  height: 32,
                  color: c.bgFill,
                  child: Row(
                    children: [
                      for (final d in _dayShort)
                        Expanded(
                          child: Center(
                            child: Text(
                              d,
                              style: LdsType.caption.copyWith(
                                color: c.textSubtle,
                              ),
                            ),
                          ),
                        ),
                    ],
                  ),
                ),
              ),
              for (var w = 0; w < weeks; w++)
                Container(
                  decoration: BoxDecoration(
                    border: Border(top: BorderSide(color: c.hairline)),
                  ),
                  child: IntrinsicHeight(
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        for (var d = 0; d < 7; d++)
                          Expanded(
                            child: _cell(
                              context,
                              days[w * 7 + d],
                              narrow,
                              first: d == 0,
                            ),
                          ),
                      ],
                    ),
                  ),
                ),
            ],
          ),
        ),
        if (narrow && selected != null) ...[
          const SizedBox(height: 12),
          _dayList(context, selected),
        ],
      ],
    );
  }

  List<LdsCalendarEvent> _eventsOn(DateTime day) {
    final list = widget.events.where((e) => e._on(day)).toList()
      ..sort((a, b) {
        if (a.allDay != b.allDay) return a.allDay ? -1 : 1;
        return a.start.compareTo(b.start);
      });
    return list;
  }

  Widget _cell(
    BuildContext context,
    DateTime day,
    bool narrow, {
    required bool first,
  }) {
    final c = context.lds;
    final outside = day.month != _date.month;
    final isToday = DateUtils.isSameDay(day, _today);
    final isSelected = narrow && DateUtils.isSameDay(day, _selectedDay);
    final events = _eventsOn(day);
    final label =
        '${day.day} ${_monthNames[day.month - 1]}'
        '${isToday ? ', hari ini' : ''}'
        '${events.isEmpty ? '' : ', ${events.length} acara'}';
    final date = LdsPressable(
      onPressed: narrow ? () => setState(() => _selectedDay = day) : null,
      pressedScale: 0.9,
      borderRadius: const BorderRadius.all(Radius.circular(14)),
      semanticLabel: label,
      selected: narrow ? isSelected : null,
      excludeChildSemantics: true,
      minSize: narrow ? const Size(44, 44) : Size.zero,
      builder: (context, _) => Container(
        width: 28,
        height: 28,
        alignment: Alignment.center,
        decoration: BoxDecoration(
          color: isToday ? c.accent : null,
          shape: BoxShape.circle,
        ),
        child: Text(
          '${day.day}',
          style: LdsType.footnote.copyWith(
            fontWeight: isToday ? FontWeight.w600 : FontWeight.w500,
            color: isToday
                ? c.textOnAccent
                : outside
                ? c.textMuted
                : c.textStrong,
            fontFeatures: const [FontFeature.tabularFigures()],
          ),
        ),
      ),
    );
    final colors = [c.series1, c.series2, c.series3, c.series4];
    return Container(
      constraints: BoxConstraints(minHeight: narrow ? 56 : 104),
      padding: const EdgeInsets.all(4),
      decoration: BoxDecoration(
        color: isSelected
            ? c.accentTint
            : outside
            ? c.bgFill
            : null,
        border: first ? null : Border(left: BorderSide(color: c.hairline)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Align(alignment: AlignmentDirectional.topStart, child: date),
          if (narrow && events.isNotEmpty)
            Padding(
              padding: const EdgeInsets.only(top: 2, left: 6),
              child: Row(
                children: [
                  for (final e in events.take(3))
                    Container(
                      width: 6,
                      height: 6,
                      margin: const EdgeInsets.only(right: 3),
                      decoration: BoxDecoration(
                        color: colors[e.tone - 1],
                        shape: BoxShape.circle,
                      ),
                    ),
                ],
              ),
            ),
          if (!narrow) ...[
            for (final e in events.take(3))
              Padding(
                padding: const EdgeInsets.only(top: 2),
                child: _chip(context, e, day),
              ),
            if (events.length > 3)
              Padding(
                padding: const EdgeInsets.only(top: 2, left: 6),
                child: Text(
                  '${events.length - 3} lainnya',
                  style: LdsType.caption.copyWith(color: c.textSubtle),
                ),
              ),
          ],
        ],
      ),
    );
  }

  String _time(DateTime t) =>
      '${t.hour.toString().padLeft(2, '0')}.${t.minute.toString().padLeft(2, '0')}';

  Widget _chip(BuildContext context, LdsCalendarEvent e, DateTime day) {
    final c = context.lds;
    final tone = [c.series1, c.series2, c.series3, c.series4][e.tone - 1];
    final cont = !DateUtils.isSameDay(e.start, day);
    final showTime = !e.allDay && !cont;
    return LdsPressable(
      onPressed: widget.onEventTap == null ? null : () => widget.onEventTap!(e),
      minSize: Size.zero,
      borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.xs)),
      semanticLabel:
          '${e.title}${showTime ? ', ${_time(e.start)}' : ''}${e.where == null ? '' : ', ${e.where}'}',
      excludeChildSemantics: true,
      builder: (context, state) => Container(
        constraints: const BoxConstraints(minHeight: 22),
        clipBehavior: Clip.antiAlias,
        decoration: BoxDecoration(
          color: Color.alphaBlend(
            tone.withValues(alpha: state.hovered ? 0.20 : 0.12),
            c.bgBase,
          ),
          // A day that continues an event squares its start.
          borderRadius: cont
              ? const BorderRadiusDirectional.horizontal(
                  end: Radius.circular(LdsRadius.xs),
                ).resolve(Directionality.of(context))
              : const BorderRadius.all(Radius.circular(LdsRadius.xs)),
        ),
        child: _ToneBar(
          tone: cont ? null : tone,
          padding: EdgeInsetsDirectional.only(
            start: cont ? 6 : 8,
            end: 6,
            top: 2,
            bottom: 2,
          ),
          child: Text.rich(
            TextSpan(
              children: [
                if (showTime)
                  TextSpan(
                    text: '${_time(e.start)} ',
                    style: TextStyle(
                      color: c.textSubtle,
                      fontWeight: FontWeight.w400,
                    ),
                  ),
                TextSpan(text: e.title),
              ],
            ),
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
            style: TextStyle(
              fontFamily: LdsType.family,
              fontSize: 12,
              height: 16 / 12,
              fontWeight: FontWeight.w500,
              color: c.textStrong,
              fontFeatures: const [FontFeature.tabularFigures()],
            ),
          ),
        ),
      ),
    );
  }

  Widget _dayList(BuildContext context, DateTime day) {
    final c = context.lds;
    final events = _eventsOn(day);
    if (events.isEmpty) {
      return Text(
        'Tidak ada acara pada hari ini.',
        style: LdsType.subhead.copyWith(color: c.textSubtle),
      );
    }
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      mainAxisSize: MainAxisSize.min,
      children: [for (final e in events) _row(context, e, day)],
    );
  }

  // Agenda ----------------------------------------------------------------

  Widget _agenda(BuildContext context) {
    final c = context.lds;
    final first = DateTime(_date.year, _date.month);
    final count = DateUtils.getDaysInMonth(_date.year, _date.month);
    final children = <Widget>[];
    for (var i = 0; i < count; i++) {
      final day = DateTime(first.year, first.month, i + 1);
      final events = _eventsOn(day);
      if (events.isEmpty) continue;
      final isToday = DateUtils.isSameDay(day, _today);
      children.add(
        Padding(
          padding: EdgeInsets.only(top: children.isEmpty ? 0 : 16, bottom: 4),
          child: Semantics(
            header: true,
            child: Text(
              '${_dayLong[day.weekday - 1]}, ${day.day} ${_monthNames[day.month - 1]}'
              '${isToday ? ' (hari ini)' : ''}',
              style: LdsType.footnote.copyWith(
                color: isToday ? c.accentText : c.textSubtle,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
        ),
      );
      for (final e in events) {
        children.add(_row(context, e, day));
      }
    }
    if (children.isEmpty) {
      return Padding(
        padding: const EdgeInsets.symmetric(vertical: 32),
        child: Text(
          widget.emptyLabel,
          textAlign: TextAlign.center,
          style: LdsType.subhead.copyWith(color: c.textSubtle),
        ),
      );
    }
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      mainAxisSize: MainAxisSize.min,
      children: children,
    );
  }

  Widget _row(BuildContext context, LdsCalendarEvent e, DateTime day) {
    final c = context.lds;
    final tone = [c.series1, c.series2, c.series3, c.series4][e.tone - 1];
    final when = e.allDay
        ? 'Sepanjang hari'
        : e.end == null
        ? _time(e.start)
        : '${_time(e.start)} sampai ${_time(e.end!)}';
    return LdsPressable(
      onPressed: widget.onEventTap == null ? null : () => widget.onEventTap!(e),
      pressedScale: 0.985,
      borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.sm)),
      builder: (context, state) => Container(
        constraints: const BoxConstraints(minHeight: 52),
        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 8),
        decoration: BoxDecoration(
          color: state.hovered || state.pressed ? c.bgTint : null,
          borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.sm)),
        ),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(
              width: 112,
              child: Text(
                when,
                style: LdsType.footnote.copyWith(
                  color: c.textSubtle,
                  fontFeatures: const [FontFeature.tabularFigures()],
                ),
              ),
            ),
            Container(
              width: 3,
              height: 34,
              margin: const EdgeInsets.only(right: 10),
              decoration: BoxDecoration(
                color: tone,
                borderRadius: const BorderRadius.all(Radius.circular(2)),
              ),
            ),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    e.title,
                    style: LdsType.subhead.copyWith(
                      color: c.textStrong,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  if (e.where != null)
                    Text(
                      e.where!,
                      style: LdsType.footnote.copyWith(color: c.textSubtle),
                    ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  // Week ------------------------------------------------------------------

  Widget _week(BuildContext context) {
    final c = context.lds;
    final start = _weekStart(_date);
    final days = [for (var i = 0; i < 7; i++) start.add(Duration(days: i))];
    const hourH = 44.0;
    const gutter = 48.0;
    final hours = widget.endHour - widget.startHour;
    final now = widget.now ?? TimeOfDay.now();

    final allDay = [
      for (final d in days)
        widget.events.where((e) => e.allDay && e._on(d)).toList(),
    ];
    final hasAllDay = allDay.any((l) => l.isNotEmpty);

    Widget dayColumn(DateTime d) {
      final timed =
          widget.events
              .where((e) => !e.allDay && DateUtils.isSameDay(e.start, d))
              .toList()
            ..sort((a, b) => a.start.compareTo(b.start));
      // Greedy lanes so overlapping events sit side by side.
      final lanes = <DateTime>[];
      final laneOf = <LdsCalendarEvent, int>{};
      for (final e in timed) {
        final end = e.end ?? e.start.add(const Duration(minutes: 30));
        var lane = lanes.indexWhere((l) => !l.isAfter(e.start));
        if (lane < 0) {
          lanes.add(end);
          lane = lanes.length - 1;
        } else {
          lanes[lane] = end;
        }
        laneOf[e] = lane;
      }
      final laneCount = math.max(1, lanes.length);
      double y(DateTime t) =>
          ((t.hour - widget.startHour) + t.minute / 60) * hourH;
      final isToday = DateUtils.isSameDay(d, _today);
      return Expanded(
        child: LayoutBuilder(
          builder: (context, box) {
            final w = box.maxWidth / laneCount;
            return Container(
              height: hours * hourH,
              decoration: BoxDecoration(
                color: isToday ? c.accentTint.withValues(alpha: 0.35) : null,
                border: Border(left: BorderSide(color: c.hairline)),
              ),
              child: Stack(
                children: [
                  for (var h = 1; h < hours; h++)
                    Positioned(
                      top: h * hourH,
                      left: 0,
                      right: 0,
                      child: Container(height: 1, color: c.hairline),
                    ),
                  for (final e in timed)
                    Positioned(
                      top: y(e.start).clamp(0, hours * hourH - 22),
                      height: math.max(
                        22,
                        y(e.end ?? e.start.add(const Duration(minutes: 30))) -
                            y(e.start) -
                            2,
                      ),
                      left: laneOf[e]! * w + 2,
                      width: w - 4,
                      child: _block(context, e),
                    ),
                  if (isToday &&
                      now.hour >= widget.startHour &&
                      now.hour < widget.endHour)
                    Positioned(
                      top:
                          ((now.hour - widget.startHour) + now.minute / 60) *
                          hourH,
                      left: 0,
                      right: 0,
                      child: IgnorePointer(
                        child: Container(height: 2, color: c.danger),
                      ),
                    ),
                ],
              ),
            );
          },
        ),
      );
    }

    return Container(
      clipBehavior: Clip.antiAlias,
      decoration: BoxDecoration(
        color: c.bgBase,
        borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.lg)),
        border: Border.all(color: c.line),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            height: 44,
            color: c.bgFill,
            child: Row(
              children: [
                const SizedBox(width: gutter),
                for (final d in days)
                  Expanded(
                    child: Center(
                      child: Text(
                        '${_dayShort[d.weekday - 1]} ${d.day}',
                        style: LdsType.footnote.copyWith(
                          fontWeight: FontWeight.w600,
                          color: DateUtils.isSameDay(d, _today)
                              ? c.accentText
                              : c.textSubtle,
                        ),
                      ),
                    ),
                  ),
              ],
            ),
          ),
          if (hasAllDay)
            Container(
              decoration: BoxDecoration(
                border: Border(bottom: BorderSide(color: c.line)),
              ),
              padding: const EdgeInsets.symmetric(vertical: 4),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const SizedBox(width: gutter),
                  for (var i = 0; i < 7; i++)
                    Expanded(
                      child: Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 2),
                        child: Column(
                          children: [
                            for (final e in allDay[i])
                              Padding(
                                padding: const EdgeInsets.only(bottom: 2),
                                child: _chip(context, e, days[i]),
                              ),
                          ],
                        ),
                      ),
                    ),
                ],
              ),
            ),
          SizedBox(
            height: math.min(hours * hourH, 440),
            child: SingleChildScrollView(
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(
                    width: gutter,
                    height: hours * hourH,
                    child: Stack(
                      children: [
                        for (var h = 1; h < hours; h++)
                          Positioned(
                            top: h * hourH - 8,
                            right: 8,
                            child: Text(
                              '${(widget.startHour + h).toString().padLeft(2, '0')}.00',
                              style: LdsType.caption.copyWith(
                                color: c.textMuted,
                                fontFeatures: const [
                                  FontFeature.tabularFigures(),
                                ],
                              ),
                            ),
                          ),
                      ],
                    ),
                  ),
                  for (final d in days) dayColumn(d),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _block(BuildContext context, LdsCalendarEvent e) {
    final c = context.lds;
    final tone = [c.series1, c.series2, c.series3, c.series4][e.tone - 1];
    return LdsPressable(
      onPressed: widget.onEventTap == null ? null : () => widget.onEventTap!(e),
      minSize: Size.zero,
      borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.xs)),
      semanticLabel:
          '${e.title}, ${_time(e.start)}'
          '${e.end == null ? '' : ' sampai ${_time(e.end!)}'}'
          '${e.where == null ? '' : ', ${e.where}'}',
      excludeChildSemantics: true,
      builder: (context, state) => Container(
        clipBehavior: Clip.antiAlias,
        decoration: BoxDecoration(
          color: Color.alphaBlend(
            tone.withValues(alpha: state.hovered ? 0.24 : 0.16),
            c.bgBase,
          ),
          borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.xs)),
        ),
        child: _ToneBar(
          tone: tone,
          padding: const EdgeInsetsDirectional.fromSTEB(6, 3, 4, 3),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                e.title,
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
                style: TextStyle(
                  fontFamily: LdsType.family,
                  fontSize: 12,
                  height: 16 / 12,
                  fontWeight: FontWeight.w500,
                  color: c.textStrong,
                ),
              ),
              Text(
                _time(e.start),
                maxLines: 1,
                style: TextStyle(
                  fontFamily: LdsType.family,
                  fontSize: 11,
                  height: 14 / 11,
                  color: c.textSubtle,
                  fontFeatures: const [FontFeature.tabularFigures()],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

/// Pads [child] and draws a 3 px [tone] bar along its start edge.
class _ToneBar extends StatelessWidget {
  const _ToneBar({
    required this.tone,
    required this.padding,
    required this.child,
  });

  final Color? tone;
  final EdgeInsetsGeometry padding;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Padding(padding: padding, child: child),
        if (tone != null)
          PositionedDirectional(
            start: 0,
            top: 0,
            bottom: 0,
            child: SizedBox(width: 3, child: ColoredBox(color: tone!)),
          ),
      ],
    );
  }
}
