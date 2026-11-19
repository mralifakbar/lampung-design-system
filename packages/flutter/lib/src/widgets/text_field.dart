import 'package:flutter/services.dart';
import 'package:material_ui/material_ui.dart';

import '../motion.dart';
import '../theme.dart';
import '../tokens.g.dart';
import 'icon.dart';

/// A labeled text field: label above, the control, then help or error text.
///
/// The control has a 1 px edge that holds 3:1, an accent edge and halo on
/// focus, and a danger edge when [error] is set. The error replaces the help
/// text and is announced when it appears.
class LdsTextField extends StatefulWidget {
  /// Creates a text field.
  const LdsTextField({
    super.key,
    required this.label,
    this.controller,
    this.focusNode,
    this.hint,
    this.help,
    this.error,
    this.optionalText,
    this.prefixIcon,
    this.suffixText,
    this.suffix,
    this.enabled = true,
    this.obscureText = false,
    this.keyboardType,
    this.textInputAction,
    this.textCapitalization = TextCapitalization.none,
    this.autofillHints,
    this.inputFormatters,
    this.maxLines = 1,
    this.minLines,
    this.maxLength,
    this.onChanged,
    this.onSubmitted,
    this.autofocus = false,
    this.readOnly = false,
  });

  /// Visible label above the control.
  final String label;

  /// Controls the text being edited.
  final TextEditingController? controller;

  /// Focus node for the input.
  final FocusNode? focusNode;

  /// Placeholder, for an example value. Never a replacement for [label].
  final String? hint;

  /// Help text under the control.
  final String? help;

  /// Error text. When set, the control turns danger and [help] is hidden.
  final String? error;

  /// Shown after the label in a lighter weight, for example "(opsional)".
  final String? optionalText;

  /// Leading icon (ligature name).
  final String? prefixIcon;

  /// Trailing unit or text, for example "kg" or "Rp".
  final String? suffixText;

  /// Trailing widget, for example an [LdsIconButton] to clear or reveal.
  final Widget? suffix;

  /// Whether the field accepts input.
  final bool enabled;

  /// Hide the text (passwords).
  final bool obscureText;

  /// Keyboard type.
  final TextInputType? keyboardType;

  /// Keyboard action button.
  final TextInputAction? textInputAction;

  /// Capitalization behavior.
  final TextCapitalization textCapitalization;

  /// Autofill hints.
  final Iterable<String>? autofillHints;

  /// Input formatters.
  final List<TextInputFormatter>? inputFormatters;

  /// Maximum lines. More than 1 makes a text area.
  final int? maxLines;

  /// Minimum lines for a text area.
  final int? minLines;

  /// Maximum characters; shows a counter.
  final int? maxLength;

  /// Called on every change.
  final ValueChanged<String>? onChanged;

  /// Called when the person submits from the keyboard.
  final ValueChanged<String>? onSubmitted;

  /// Take focus when first built.
  final bool autofocus;

  /// Show the value without allowing edits.
  final bool readOnly;

  @override
  State<LdsTextField> createState() => _LdsTextFieldState();
}

class _LdsTextFieldState extends State<LdsTextField> {
  FocusNode? _ownFocus;
  FocusNode get _focus => widget.focusNode ?? (_ownFocus ??= FocusNode());
  bool _focused = false;
  bool _hovered = false;

  @override
  void initState() {
    super.initState();
    _focus.addListener(_onFocus);
  }

  @override
  void didUpdateWidget(LdsTextField oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.focusNode != widget.focusNode) {
      (oldWidget.focusNode ?? _ownFocus)?.removeListener(_onFocus);
      _focus.addListener(_onFocus);
    }
  }

  void _onFocus() {
    if (mounted) setState(() => _focused = _focus.hasFocus);
  }

  @override
  void dispose() {
    _focus.removeListener(_onFocus);
    _ownFocus?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final invalid = widget.error != null;
    final multiline = (widget.maxLines ?? 2) > 1;
    final duration = context.ldsDuration(LdsMotion.fast);

    final Color edge;
    double edgeWidth = 1;
    List<BoxShadow>? halo;
    if (!widget.enabled) {
      edge = c.line;
    } else if (invalid) {
      edge = c.danger;
      edgeWidth = 1.5;
      if (_focused) {
        halo = [BoxShadow(color: c.danger.withAlpha(41), spreadRadius: 4)];
      }
    } else if (_focused) {
      edge = c.accent;
      edgeWidth = 1.5;
      halo = [BoxShadow(color: c.accentRing, spreadRadius: 4)];
    } else {
      edge = _hovered ? c.textSubtle : c.lineControl;
    }

    final textStyle = LdsType.body.copyWith(
      color: widget.enabled ? c.textStrong : c.textMuted,
    );

    final input = TextField(
      controller: widget.controller,
      focusNode: _focus,
      enabled: widget.enabled,
      readOnly: widget.readOnly,
      obscureText: widget.obscureText,
      keyboardType:
          widget.keyboardType ??
          (multiline ? TextInputType.multiline : TextInputType.text),
      textInputAction: widget.textInputAction,
      textCapitalization: widget.textCapitalization,
      autofillHints: widget.autofillHints,
      inputFormatters: widget.inputFormatters,
      maxLines: widget.obscureText ? 1 : widget.maxLines,
      minLines: widget.minLines,
      maxLength: widget.maxLength,
      onChanged: widget.onChanged,
      onSubmitted: widget.onSubmitted,
      autofocus: widget.autofocus,
      style: textStyle,
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
        contentPadding: EdgeInsets.symmetric(vertical: multiline ? 12 : 11),
      ),
    );

    final control = MouseRegion(
      onEnter: (_) => setState(() => _hovered = true),
      onExit: (_) => setState(() => _hovered = false),
      child: AnimatedContainer(
        duration: duration,
        curve: LdsMotion.standardCurve,
        constraints: const BoxConstraints(minHeight: LdsSize.control),
        padding: const EdgeInsets.symmetric(horizontal: 14),
        decoration: BoxDecoration(
          color: widget.enabled ? c.bgBase : c.bgFill,
          borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.md)),
          border: Border.all(color: edge, width: edgeWidth),
          boxShadow: halo,
        ),
        child: Row(
          crossAxisAlignment: multiline
              ? CrossAxisAlignment.start
              : CrossAxisAlignment.center,
          children: [
            if (widget.prefixIcon != null) ...[
              Padding(
                padding: EdgeInsets.only(top: multiline ? 12 : 0),
                child: LdsIcon(
                  widget.prefixIcon!,
                  size: 19,
                  color: _focused ? c.accentText : c.textMuted,
                ),
              ),
              const SizedBox(width: 8),
            ],
            Expanded(child: input),
            if (widget.suffixText != null) ...[
              const SizedBox(width: 8),
              Text(
                widget.suffixText!,
                style: LdsType.subhead.copyWith(color: c.textMuted),
              ),
            ],
            if (widget.suffix != null) ...[
              const SizedBox(width: 4),
              widget.suffix!,
            ],
          ],
        ),
      ),
    );

    final message = widget.error ?? widget.help;
    return MergeSemantics(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        mainAxisSize: MainAxisSize.min,
        children: [
          Text.rich(
            TextSpan(
              text: widget.label,
              children: [
                if (widget.optionalText != null)
                  TextSpan(
                    text: ' ${widget.optionalText}',
                    style: TextStyle(
                      fontWeight: FontWeight.w400,
                      color: c.textMuted,
                    ),
                  ),
              ],
            ),
            style: LdsType.caption.copyWith(
              color: c.textStrong,
              letterSpacing: 0,
            ),
          ),
          const SizedBox(height: 8),
          control,
          if (message != null) ...[
            const SizedBox(height: 8),
            Semantics(
              liveRegion: invalid,
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  if (invalid) ...[
                    Padding(
                      padding: const EdgeInsets.only(top: 1),
                      child: LdsIcon('error', size: 15, color: c.dangerText),
                    ),
                    const SizedBox(width: 5),
                  ],
                  Expanded(
                    child: Text(
                      message,
                      style: LdsType.footnote.copyWith(
                        color: invalid ? c.dangerText : c.textSubtle,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ],
      ),
    );
  }
}
