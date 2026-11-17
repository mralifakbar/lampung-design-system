import 'package:flutter/material.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import 'parts.dart';

/// A field for a few sentences: the same control box as a text field,
/// taller, with an optional "120 / 280" counter in the label row so the
/// limit is visible before people reach it.
class LdsTextarea extends StatefulWidget {
  /// Creates a text area.
  const LdsTextarea({
    super.key,
    required this.label,
    this.controller,
    this.focusNode,
    this.hint,
    this.help,
    this.error,
    this.optionalText,
    this.maxLength,
    this.minLines = 4,
    this.maxLines = 8,
    this.enabled = true,
    this.onChanged,
  });

  /// Visible label above the control.
  final String label;

  /// Controls the text being edited.
  final TextEditingController? controller;

  /// Focus node for the input.
  final FocusNode? focusNode;

  /// Placeholder, for an example value.
  final String? hint;

  /// Help text under the control.
  final String? help;

  /// Error text; replaces [help].
  final String? error;

  /// Shown after the label, for example "(opsional)".
  final String? optionalText;

  /// Character limit; shows the counter and stops input at the limit.
  final int? maxLength;

  /// Visible lines when empty.
  final int minLines;

  /// Lines before the field scrolls.
  final int maxLines;

  /// Whether the field accepts input.
  final bool enabled;

  /// Called on every change.
  final ValueChanged<String>? onChanged;

  @override
  State<LdsTextarea> createState() => _LdsTextareaState();
}

class _LdsTextareaState extends State<LdsTextarea> {
  TextEditingController? _ownText;
  FocusNode? _ownFocus;
  TextEditingController get _text =>
      widget.controller ?? (_ownText ??= TextEditingController());
  FocusNode get _focus => widget.focusNode ?? (_ownFocus ??= FocusNode());
  bool _focused = false;

  @override
  void initState() {
    super.initState();
    _focus.addListener(_onFocus);
    _text.addListener(_onText);
  }

  @override
  void didUpdateWidget(LdsTextarea oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.focusNode != widget.focusNode) {
      (oldWidget.focusNode ?? _ownFocus)?.removeListener(_onFocus);
      _focus.addListener(_onFocus);
    }
    if (oldWidget.controller != widget.controller) {
      (oldWidget.controller ?? _ownText)?.removeListener(_onText);
      _text.addListener(_onText);
    }
  }

  void _onFocus() {
    if (mounted) setState(() => _focused = _focus.hasFocus);
  }

  void _onText() {
    if (mounted && widget.maxLength != null) setState(() {});
  }

  @override
  void dispose() {
    _focus.removeListener(_onFocus);
    _text.removeListener(_onText);
    _ownFocus?.dispose();
    _ownText?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final max = widget.maxLength;
    final count = _text.text.characters.length;
    final counter = max == null
        ? null
        : Semantics(
            label: '$count dari $max karakter',
            excludeSemantics: true,
            child: AnimatedDefaultTextStyle(
              duration: context.ldsDuration(LdsMotion.fast),
              style: TextStyle(
                fontFamily: LdsType.family,
                fontSize: 12,
                height: 1,
                fontWeight: count >= max ? FontWeight.w600 : FontWeight.w400,
                color: count >= max ? c.dangerText : c.textMuted,
                fontFeatures: const [FontFeature.tabularFigures()],
              ),
              child: Text('$count / $max'),
            ),
          );

    final input = TextField(
      controller: _text,
      focusNode: _focus,
      enabled: widget.enabled,
      keyboardType: TextInputType.multiline,
      minLines: widget.minLines,
      maxLines: widget.maxLines,
      maxLength: max,
      onChanged: widget.onChanged,
      style: LdsType.body.copyWith(
        color: widget.enabled ? c.textStrong : c.textMuted,
        height: 22 / 15,
      ),
      cursorColor: c.accent,
      decoration: InputDecoration(
        hintText: widget.hint,
        hintStyle: LdsType.body.copyWith(color: c.textMuted),
        border: InputBorder.none,
        enabledBorder: InputBorder.none,
        focusedBorder: InputBorder.none,
        disabledBorder: InputBorder.none,
        errorBorder: InputBorder.none,
        filled: false,
        isDense: true,
        counterText: '',
        contentPadding: EdgeInsets.zero,
      ),
    );

    return LdsFormsFieldShell(
      label: widget.label,
      optionalText: widget.optionalText,
      trailing: counter,
      help: widget.help,
      error: widget.error,
      merge: true,
      child: LdsFormsControlBox(
        active: _focused,
        invalid: widget.error != null,
        enabled: widget.enabled,
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
        minHeight: 88,
        child: input,
      ),
    );
  }
}
