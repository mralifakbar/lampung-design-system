import 'package:material_ui/material_ui.dart';

import '../../theme.dart';
import '../button.dart';
import '../text_field.dart';
import 'calendar.dart';
import 'parts.dart';

/// A text field for a date (dd/mm/yyyy) with a calendar button that opens
/// a calendar in a popover: Tanggal lahir, Tanggal kejadian.
///
/// Typing the date always works; the calendar is the helper. [onChanged]
/// reports a parsed date, or null while the text is not a whole date.
class LdsDateField extends StatefulWidget {
  /// Creates a date field.
  const LdsDateField({
    super.key,
    required this.label,
    this.value,
    this.onChanged,
    this.firstDate,
    this.lastDate,
    this.hint = 'hh/bb/tttt',
    this.help,
    this.error,
    this.optionalText,
    this.enabled = true,
    this.calendarLabel = 'Pilih dari kalender',
    this.today,
  });

  /// Visible label above the control.
  final String label;

  /// The date shown.
  final DateTime? value;

  /// Called with the parsed date on every change.
  final ValueChanged<DateTime?>? onChanged;

  /// Earliest date the calendar allows.
  final DateTime? firstDate;

  /// Latest date the calendar allows.
  final DateTime? lastDate;

  /// Placeholder showing the format.
  final String hint;

  /// Help text under the control.
  final String? help;

  /// Error text; replaces [help].
  final String? error;

  /// Shown after the label, for example "(opsional)".
  final String? optionalText;

  /// Whether the field accepts input.
  final bool enabled;

  /// Calendar button label for screen readers.
  final String calendarLabel;

  /// Overrides today in the calendar, for tests and examples.
  final DateTime? today;

  @override
  State<LdsDateField> createState() => _LdsDateFieldState();
}

class _LdsDateFieldState extends State<LdsDateField> {
  late final TextEditingController _text = TextEditingController(
    text: widget.value == null ? '' : ldsFormsFormatDate(widget.value!),
  );
  bool _open = false;

  @override
  void didUpdateWidget(LdsDateField oldWidget) {
    super.didUpdateWidget(oldWidget);
    final v = widget.value;
    if (v != oldWidget.value &&
        !ldsFormsSameDay(v, ldsFormsParseDate(_text.text))) {
      _text.text = v == null ? '' : ldsFormsFormatDate(v);
    }
  }

  @override
  void dispose() {
    _text.dispose();
    super.dispose();
  }

  void _pick(DateTime d) {
    _text.text = ldsFormsFormatDate(d);
    setState(() => _open = false);
    widget.onChanged?.call(d);
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final current = ldsFormsParseDate(_text.text) ?? widget.value;
    return LdsFormsPopover(
      open: _open,
      onDismiss: () => setState(() => _open = false),
      width: 332,
      maxHeight: 420,
      alignEnd: true,
      padding: const EdgeInsets.all(8),
      anchor: LdsTextField(
        label: widget.label,
        controller: _text,
        hint: widget.hint,
        help: widget.help,
        error: widget.error,
        optionalText: widget.optionalText,
        enabled: widget.enabled,
        keyboardType: TextInputType.datetime,
        onChanged: (v) => widget.onChanged?.call(ldsFormsParseDate(v)),
        suffix: LdsIconButton(
          icon: 'calendar_month',
          semanticLabel: widget.calendarLabel,
          showTooltip: false,
          color: c.textSubtle,
          selected: _open,
          onPressed: widget.enabled
              ? () => setState(() => _open = !_open)
              : null,
        ),
      ),
      builder: (context) => LdsCalendar(
        framed: false,
        selected: current,
        firstDate: widget.firstDate,
        lastDate: widget.lastDate,
        today: widget.today,
        onSelected: _pick,
      ),
    );
  }
}
