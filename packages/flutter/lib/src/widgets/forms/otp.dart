import 'package:flutter/services.dart';
import 'package:material_ui/material_ui.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import 'parts.dart';

/// Six cells for a verification code, backed by one real input so paste,
/// SMS autofill and password managers all work.
///
/// Set [error] after a wrong code: the cells shake once and turn red, and
/// the message is announced. Typing again clears it in your handler.
class LdsOtpField extends StatefulWidget {
  /// Creates a code field.
  const LdsOtpField({
    super.key,
    this.length = 6,
    this.controller,
    this.focusNode,
    this.onChanged,
    this.onCompleted,
    this.error,
    this.semanticLabel = 'Kode verifikasi',
    this.autofocus = false,
    this.enabled = true,
  });

  /// Number of cells.
  final int length;

  /// Controls the code.
  final TextEditingController? controller;

  /// Focus node.
  final FocusNode? focusNode;

  /// Called on every change.
  final ValueChanged<String>? onChanged;

  /// Called once every cell is filled.
  final ValueChanged<String>? onCompleted;

  /// Error message under the cells; turns them red and shakes once.
  final String? error;

  /// Label for screen readers.
  final String semanticLabel;

  /// Take focus when first built.
  final bool autofocus;

  /// Whether the field accepts input.
  final bool enabled;

  @override
  State<LdsOtpField> createState() => _LdsOtpFieldState();
}

class _LdsOtpFieldState extends State<LdsOtpField> {
  TextEditingController? _ownText;
  FocusNode? _ownFocus;
  TextEditingController get _text =>
      widget.controller ?? (_ownText ??= TextEditingController());
  FocusNode get _focus => widget.focusNode ?? (_ownFocus ??= FocusNode());
  bool _focused = false;
  int _shake = 0;

  @override
  void initState() {
    super.initState();
    _focus.addListener(_onChange);
    _text.addListener(_onChange);
  }

  @override
  void didUpdateWidget(LdsOtpField oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.error != null && widget.error != oldWidget.error) _shake++;
  }

  void _onChange() {
    if (mounted) setState(() => _focused = _focus.hasFocus);
  }

  @override
  void dispose() {
    _focus.removeListener(_onChange);
    _text.removeListener(_onChange);
    _ownFocus?.dispose();
    _ownText?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final code = _text.text;
    final invalid = widget.error != null;
    final active = code.length.clamp(0, widget.length - 1);

    Widget cell(int i) {
      final filled = i < code.length;
      final isActive = _focused && i == active;
      final edge = invalid
          ? c.danger
          : isActive
          ? c.accent
          : c.lineControl;
      return Flexible(
        child: AnimatedContainer(
          duration: context.ldsDuration(LdsMotion.fast),
          constraints: const BoxConstraints(maxWidth: 48),
          height: 56,
          alignment: Alignment.center,
          decoration: BoxDecoration(
            color: widget.enabled ? c.bgBase : c.bgFill,
            borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.md)),
            border: Border.all(
              color: edge,
              width: invalid || isActive ? 1.5 : 1,
            ),
            boxShadow: isActive && !invalid
                ? [BoxShadow(color: c.accentRing, spreadRadius: 4)]
                : null,
          ),
          child: filled
              ? TweenAnimationBuilder<double>(
                  key: ValueKey('$i${code[i]}'),
                  tween: Tween(begin: 0.6, end: 1),
                  duration: context.ldsDuration(LdsMotion.snappy),
                  curve: LdsSpringCurve.snappy,
                  builder: (context, s, child) =>
                      Transform.scale(scale: s, child: child),
                  child: Text(
                    code[i],
                    style: LdsType.title2.copyWith(
                      fontSize: 24,
                      height: 1,
                      color: c.textStrong,
                      fontFeatures: const [FontFeature.tabularFigures()],
                    ),
                  ),
                )
              : isActive
              ? Container(width: 2, height: 24, color: c.accent)
              : null,
        ),
      );
    }

    final half = widget.length.isEven ? widget.length ~/ 2 : -1;
    final cells = Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        for (var i = 0; i < widget.length; i++) ...[
          if (i > 0 && i != half) const SizedBox(width: 8),
          if (i == half && widget.length >= 6) ...[
            const SizedBox(width: 6),
            Container(
              width: 10,
              height: 2,
              decoration: BoxDecoration(
                color: c.textFaint,
                borderRadius: const BorderRadius.all(Radius.circular(1)),
              ),
            ),
            const SizedBox(width: 6),
          ] else if (i == half)
            const SizedBox(width: 8),
          cell(i),
        ],
      ],
    );

    final input = Positioned.fill(
      child: Opacity(
        opacity: 0,
        child: Semantics(
          label: widget.semanticLabel,
          child: TextField(
            controller: _text,
            focusNode: _focus,
            autofocus: widget.autofocus,
            enabled: widget.enabled,
            keyboardType: TextInputType.number,
            autofillHints: const [AutofillHints.oneTimeCode],
            maxLength: widget.length,
            showCursor: false,
            maxLines: null,
            expands: true,
            enableInteractiveSelection: false,
            inputFormatters: [
              FilteringTextInputFormatter.digitsOnly,
              LengthLimitingTextInputFormatter(widget.length),
            ],
            onChanged: (v) {
              widget.onChanged?.call(v);
              if (v.length == widget.length) widget.onCompleted?.call(v);
            },
            decoration: const InputDecoration(
              border: InputBorder.none,
              counterText: '',
              isCollapsed: true,
            ),
          ),
        ),
      ),
    );

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        LdsFormsShake(
          trigger: _shake,
          child: Stack(
            children: [
              ExcludeSemantics(child: cells),
              input,
            ],
          ),
        ),
        if (invalid) ...[
          const SizedBox(height: 8),
          LdsFormsMessage(widget.error!, error: true),
        ],
      ],
    );
  }
}
