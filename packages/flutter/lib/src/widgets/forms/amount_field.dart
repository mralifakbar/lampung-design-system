import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../../theme.dart';
import '../../tokens.g.dart';
import 'parts.dart';

/// A text field for money and other numbers with a unit: "Rp" sits inside
/// the control before the number, the keyboard is numeric and thousands
/// group with a period as people type (350.000).
///
/// People type the number, never the symbol. [onChanged] reports the whole
/// number, or null when the field is empty.
class LdsAmountField extends StatefulWidget {
  /// Creates an amount field.
  const LdsAmountField({
    super.key,
    required this.label,
    this.value,
    this.onChanged,
    this.prefix = 'Rp',
    this.suffix,
    this.hint = '0',
    this.help,
    this.error,
    this.optionalText,
    this.enabled = true,
    this.focusNode,
  });

  /// Visible label above the control.
  final String label;

  /// Starting value.
  final int? value;

  /// Called with the parsed number on every change.
  final ValueChanged<int?>? onChanged;

  /// Text before the number, for example "Rp". Not part of the value.
  final String? prefix;

  /// Unit after the number, for example "kg" or "jiwa".
  final String? suffix;

  /// Placeholder in the muted color.
  final String hint;

  /// Help text under the control.
  final String? help;

  /// Error text; replaces [help].
  final String? error;

  /// Shown after the label, for example "(opsional)".
  final String? optionalText;

  /// Whether the field accepts input.
  final bool enabled;

  /// Focus node.
  final FocusNode? focusNode;

  /// Groups [value] with periods: 2500000 becomes "2.500.000".
  static String format(int value) {
    final digits = value.abs().toString();
    final out = StringBuffer(value < 0 ? '-' : '');
    for (var i = 0; i < digits.length; i++) {
      if (i > 0 && (digits.length - i) % 3 == 0) out.write('.');
      out.write(digits[i]);
    }
    return out.toString();
  }

  @override
  State<LdsAmountField> createState() => _LdsAmountFieldState();
}

class _GroupingFormatter extends TextInputFormatter {
  @override
  TextEditingValue formatEditUpdate(
      TextEditingValue oldValue, TextEditingValue newValue) {
    final digits = newValue.text.replaceAll(RegExp(r'\D'), '');
    if (digits.isEmpty) return const TextEditingValue();
    final trimmed = digits.replaceFirst(RegExp(r'^0+(?=\d)'), '');
    final text = LdsAmountField.format(int.parse(trimmed));
    // Keep the caret at the end, as the spec asks.
    return TextEditingValue(
      text: text,
      selection: TextSelection.collapsed(offset: text.length),
    );
  }
}

class _LdsAmountFieldState extends State<LdsAmountField> {
  late final TextEditingController _text = TextEditingController(
    text: widget.value == null ? '' : LdsAmountField.format(widget.value!),
  );
  FocusNode? _ownFocus;
  FocusNode get _focus => widget.focusNode ?? (_ownFocus ??= FocusNode());
  bool _focused = false;

  @override
  void initState() {
    super.initState();
    _focus.addListener(_onFocus);
  }

  void _onFocus() {
    if (mounted) setState(() => _focused = _focus.hasFocus);
  }

  @override
  void dispose() {
    _focus.removeListener(_onFocus);
    _ownFocus?.dispose();
    _text.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final unitStyle = LdsType.subhead.copyWith(color: c.textMuted);
    return LdsFormsFieldShell(
      label: widget.label,
      optionalText: widget.optionalText,
      help: widget.help,
      error: widget.error,
      merge: true,
      child: LdsFormsControlBox(
        active: _focused,
        invalid: widget.error != null,
        enabled: widget.enabled,
        child: Row(
          children: [
            if (widget.prefix != null) ...[
              Text(widget.prefix!, style: unitStyle),
              const SizedBox(width: 8),
            ],
            Expanded(
              child: TextField(
                controller: _text,
                focusNode: _focus,
                enabled: widget.enabled,
                keyboardType: TextInputType.number,
                inputFormatters: [_GroupingFormatter()],
                onChanged: (v) {
                  final digits = v.replaceAll('.', '');
                  widget.onChanged
                      ?.call(digits.isEmpty ? null : int.parse(digits));
                },
                style: LdsType.body.copyWith(
                  color: widget.enabled ? c.textStrong : c.textMuted,
                  fontFeatures: const [FontFeature.tabularFigures()],
                ),
                cursorColor: c.accent,
                decoration: InputDecoration(
                  hintText: widget.hint,
                  hintStyle: LdsType.body.copyWith(color: c.textMuted),
                  border: InputBorder.none,
                  enabledBorder: InputBorder.none,
                  focusedBorder: InputBorder.none,
                  disabledBorder: InputBorder.none,
                  filled: false,
                  isDense: true,
                  contentPadding: const EdgeInsets.symmetric(vertical: 11),
                ),
              ),
            ),
            if (widget.suffix != null) ...[
              const SizedBox(width: 8),
              Text(widget.suffix!, style: unitStyle),
            ],
          ],
        ),
      ),
    );
  }
}
