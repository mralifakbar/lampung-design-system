import 'package:flutter/material.dart';

import '../../theme.dart';
import '../../tokens.g.dart';
import '../button.dart';
import '../icon.dart';
import '../pressable.dart';
import 'calendar.dart';
import 'parts.dart';

/// A named span offered beside the calendars of an [LdsDateRangePicker].
@immutable
class LdsDateRangePreset {
  /// Creates a preset.
  const LdsDateRangePreset({required this.label, required this.range});

  /// Visible text, for example "7 hari terakhir".
  final String label;

  /// The span it applies.
  final DateTimeRange range;

  /// The usual presets counted back from [today]: 7 and 30 days, this
  /// month and last month.
  static List<LdsDateRangePreset> defaults(DateTime today) {
    final t = ldsFormsDay(today);
    return [
      LdsDateRangePreset(
        label: '7 hari terakhir',
        range:
            DateTimeRange(start: t.subtract(const Duration(days: 6)), end: t),
      ),
      LdsDateRangePreset(
        label: '30 hari terakhir',
        range:
            DateTimeRange(start: t.subtract(const Duration(days: 29)), end: t),
      ),
      LdsDateRangePreset(
        label: 'Bulan ini',
        range: DateTimeRange(start: DateTime(t.year, t.month), end: t),
      ),
      LdsDateRangePreset(
        label: 'Bulan lalu',
        range: DateTimeRange(
          start: DateTime(t.year, t.month - 1),
          end: DateTime(t.year, t.month, 0),
        ),
      ),
    ];
  }
}

/// A button that shows the current span and opens presets beside a
/// two-month calendar (one month on phones): the period of a report.
///
/// A preset applies at once. Picking a start previews the span as people
/// move; picking an end waits for Apply.
class LdsDateRangePicker extends StatefulWidget {
  /// Creates a date range picker.
  const LdsDateRangePicker({
    super.key,
    required this.value,
    required this.onChanged,
    this.presets,
    this.firstDate,
    this.lastDate,
    this.today,
    this.placeholder = 'Pilih rentang tanggal',
    this.semanticLabel = 'Rentang tanggal',
    this.applyLabel = 'Terapkan',
    this.cancelLabel = 'Batal',
    this.pickEndText = 'Pilih hari terakhir',
  });

  /// The applied span.
  final DateTimeRange? value;

  /// Called with the new span. Null disables it.
  final ValueChanged<DateTimeRange>? onChanged;

  /// Presets; defaults to [LdsDateRangePreset.defaults].
  final List<LdsDateRangePreset>? presets;

  /// Earliest day.
  final DateTime? firstDate;

  /// Latest day.
  final DateTime? lastDate;

  /// Overrides today, for tests and examples.
  final DateTime? today;

  /// Trigger text with no span.
  final String placeholder;

  /// Names the control for screen readers.
  final String semanticLabel;

  /// Apply button text.
  final String applyLabel;

  /// Cancel button text.
  final String cancelLabel;

  /// Summary while only the start is picked.
  final String pickEndText;

  @override
  State<LdsDateRangePicker> createState() => _LdsDateRangePickerState();
}

class _LdsDateRangePickerState extends State<LdsDateRangePicker> {
  bool _open = false;
  DateTime? _start;
  DateTime? _end;
  DateTime? _hover;
  DateTime _month = DateTime(2000);

  DateTime get _today => ldsFormsDay(widget.today ?? DateTime.now());

  static String _span(DateTime a, DateTime b) =>
      '${ldsFormsShortDate(a)} – ${ldsFormsShortDate(b)}';

  void _toggle() {
    if (_open) {
      setState(() => _open = false);
      return;
    }
    final v = widget.value;
    final wide = MediaQuery.sizeOf(context).width >= 720;
    final base = v?.end ?? _today;
    setState(() {
      _open = true;
      _start = v?.start;
      _end = v?.end;
      _hover = null;
      _month = wide
          ? DateTime(base.year, base.month - 1)
          : DateTime(base.year, base.month);
    });
  }

  void _pick(DateTime d) {
    setState(() {
      if (_start == null || _end != null) {
        _start = d;
        _end = null;
      } else if (d.isBefore(_start!)) {
        _end = _start;
        _start = d;
      } else {
        _end = d;
      }
      _hover = null;
    });
  }

  void _apply(DateTimeRange r) {
    setState(() => _open = false);
    widget.onChanged?.call(r);
  }

  Widget _calendar(DateTime month, {bool prev = true, bool next = true}) {
    final picking = _start != null && _end == null;
    return SizedBox(
      width: 308,
      child: LdsCalendar(
        framed: false,
        month: month,
        onMonthChanged: (m) =>
            setState(() => _month = prev ? m : DateTime(m.year, m.month - 1)),
        showPrevious: prev,
        showNext: next,
        today: widget.today,
        firstDate: widget.firstDate,
        lastDate: widget.lastDate,
        selected: picking ? _start : null,
        range: _start != null && _end != null
            ? DateTimeRange(start: _start!, end: _end!)
            : null,
        previewEnd: picking ? _hover : null,
        onHover: picking ? (d) => setState(() => _hover = d) : null,
        onSelected: _pick,
      ),
    );
  }

  Widget _layer(BuildContext context) {
    final c = context.lds;
    final wide = MediaQuery.sizeOf(context).width >= 720;
    final presets = widget.presets ?? LdsDateRangePreset.defaults(_today);
    final picking = _start != null && _end == null;
    final summary = _start == null
        ? ''
        : picking
            ? widget.pickEndText
            : _span(_start!, _end!);

    final presetList = [
      for (final p in presets)
        LdsPressable(
          onPressed: () => _apply(p.range),
          pressedScale: 1,
          selected: ldsFormsSameDay(p.range.start, _start) &&
              ldsFormsSameDay(p.range.end, _end),
          borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.sm)),
          builder: (context, state) {
            final on = ldsFormsSameDay(p.range.start, _start) &&
                ldsFormsSameDay(p.range.end, _end);
            return Container(
              height: 36,
              alignment: Alignment.centerLeft,
              padding: const EdgeInsets.symmetric(horizontal: 10),
              decoration: BoxDecoration(
                color: on
                    ? c.accentTint
                    : state.hovered || state.pressed
                        ? c.bgTintStrong
                        : null,
                borderRadius:
                    const BorderRadius.all(Radius.circular(LdsRadius.sm)),
              ),
              child: Text(
                p.label,
                maxLines: 1,
                style: LdsType.subhead.copyWith(
                  color: on ? c.accentText : c.textStrong,
                  fontWeight: on ? FontWeight.w500 : FontWeight.w400,
                ),
              ),
            );
          },
        ),
    ];

    final months = wide
        ? Row(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _calendar(_month, next: false),
              const SizedBox(width: 8),
              _calendar(DateTime(_month.year, _month.month + 1), prev: false),
            ],
          )
        : _calendar(_month);

    final foot = Container(
      padding: const EdgeInsets.fromLTRB(12, 10, 12, 4),
      decoration: BoxDecoration(
        border: Border(top: BorderSide(color: c.hairline)),
      ),
      child: Wrap(
        alignment: WrapAlignment.end,
        crossAxisAlignment: WrapCrossAlignment.center,
        spacing: 8,
        runSpacing: 4,
        children: [
          Semantics(
            liveRegion: true,
            child: Text(
              summary,
              style: LdsType.footnote.copyWith(
                color: c.textSubtle,
                fontFeatures: const [FontFeature.tabularFigures()],
              ),
            ),
          ),
          LdsButton(
            label: widget.cancelLabel,
            variant: LdsButtonVariant.plain,
            size: LdsButtonSize.md,
            onPressed: () => setState(() => _open = false),
          ),
          LdsButton(
            label: widget.applyLabel,
            size: LdsButtonSize.md,
            onPressed: _start != null && _end != null
                ? () => _apply(DateTimeRange(start: _start!, end: _end!))
                : null,
          ),
        ],
      ),
    );

    final main = Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Padding(padding: const EdgeInsets.all(4), child: months),
        foot
      ],
    );

    final content = wide
        ? IntrinsicHeight(
            child: Row(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Container(
                  width: 168,
                  padding: const EdgeInsets.all(4),
                  decoration: BoxDecoration(
                    border: Border(right: BorderSide(color: c.hairline)),
                  ),
                  child: Column(children: presetList),
                ),
                main,
              ],
            ),
          )
        : Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(children: presetList),
              ),
              main,
            ],
          );
    return SingleChildScrollView(child: content);
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final v = widget.value;
    final text = v == null ? widget.placeholder : _span(v.start, v.end);
    final enabled = widget.onChanged != null;
    final wide = MediaQuery.sizeOf(context).width >= 720;
    return LdsFormsPopover(
      open: _open,
      onDismiss: () => setState(() => _open = false),
      width: wide ? 820 : 332,
      maxHeight: 520,
      padding: const EdgeInsets.all(4),
      anchor: LdsPressable(
        onPressed: enabled ? _toggle : null,
        pressedScale: 1,
        semanticLabel: '${widget.semanticLabel}, $text',
        excludeChildSemantics: true,
        builder: (context, state) => LdsFormsControlBox(
          active: _open,
          enabled: enabled,
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              LdsIcon('calendar_month',
                  size: 19, color: _open ? c.accentText : c.textMuted),
              const SizedBox(width: 8),
              Flexible(
                child: Text(
                  text,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: LdsType.body.copyWith(
                    color: v == null ? c.textMuted : c.textStrong,
                    fontFeatures: const [FontFeature.tabularFigures()],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
      builder: _layer,
    );
  }
}
