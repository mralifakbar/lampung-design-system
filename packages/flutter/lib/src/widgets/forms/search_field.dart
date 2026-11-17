import 'package:flutter/material.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../icon.dart';
import '../pressable.dart';

/// The filled, label-less field for finding things: layanan, laporan,
/// kelurahan.
///
/// A clear button shows once something is typed. With [showCancel], focusing
/// the field slides in a Cancel button that clears and leaves search.
class LdsSearchField extends StatefulWidget {
  /// Creates a search field.
  const LdsSearchField({
    super.key,
    this.controller,
    this.focusNode,
    this.hint = 'Cari',
    this.semanticLabel,
    this.onChanged,
    this.onSubmitted,
    this.onCancel,
    this.showCancel = false,
    this.cancelLabel = 'Batal',
    this.clearLabel = 'Hapus pencarian',
    this.autofocus = false,
  });

  /// Controls the query.
  final TextEditingController? controller;

  /// Focus node.
  final FocusNode? focusNode;

  /// Placeholder, also the label for screen readers unless
  /// [semanticLabel] is set.
  final String hint;

  /// Label for screen readers.
  final String? semanticLabel;

  /// Called on every change.
  final ValueChanged<String>? onChanged;

  /// Called on submit.
  final ValueChanged<String>? onSubmitted;

  /// Called after Cancel clears and unfocuses.
  final VoidCallback? onCancel;

  /// Show the Cancel button while focused (phones).
  final bool showCancel;

  /// Cancel button text.
  final String cancelLabel;

  /// Clear button label for screen readers.
  final String clearLabel;

  /// Take focus when first built.
  final bool autofocus;

  @override
  State<LdsSearchField> createState() => _LdsSearchFieldState();
}

class _LdsSearchFieldState extends State<LdsSearchField> {
  TextEditingController? _ownText;
  FocusNode? _ownFocus;
  TextEditingController get _text =>
      widget.controller ?? (_ownText ??= TextEditingController());
  FocusNode get _focus => widget.focusNode ?? (_ownFocus ??= FocusNode());
  bool _focused = false;

  @override
  void initState() {
    super.initState();
    _focus.addListener(_onChange);
    _text.addListener(_onChange);
  }

  void _onChange() {
    if (!mounted) return;
    setState(() => _focused = _focus.hasFocus);
  }

  @override
  void dispose() {
    _focus.removeListener(_onChange);
    _text.removeListener(_onChange);
    _ownFocus?.dispose();
    _ownText?.dispose();
    super.dispose();
  }

  void _clear() {
    _text.clear();
    widget.onChanged?.call('');
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final active = _focused && widget.showCancel;
    final box = AnimatedContainer(
      duration: context.ldsDuration(LdsMotion.fast),
      height: 38,
      padding: const EdgeInsets.only(left: 10, right: 4),
      decoration: BoxDecoration(
        color: c.bgRecessed,
        borderRadius: const BorderRadius.all(Radius.circular(11)),
        boxShadow:
            _focused ? [BoxShadow(color: c.accentRing, spreadRadius: 3)] : null,
      ),
      child: Row(
        children: [
          LdsIcon('search', size: 18, color: c.textMuted),
          const SizedBox(width: 6),
          Expanded(
            child: Semantics(
              label: widget.semanticLabel ?? widget.hint,
              child: TextField(
                controller: _text,
                focusNode: _focus,
                autofocus: widget.autofocus,
                textInputAction: TextInputAction.search,
                onChanged: widget.onChanged,
                onSubmitted: widget.onSubmitted,
                style: LdsType.body.copyWith(color: c.textStrong),
                cursorColor: c.accent,
                decoration: InputDecoration(
                  hintText: widget.hint,
                  hintStyle: LdsType.body.copyWith(color: c.textMuted),
                  border: InputBorder.none,
                  enabledBorder: InputBorder.none,
                  focusedBorder: InputBorder.none,
                  filled: false,
                  isDense: true,
                  contentPadding: const EdgeInsets.symmetric(vertical: 9),
                ),
              ),
            ),
          ),
          if (_text.text.isNotEmpty)
            LdsPressable(
              onPressed: _clear,
              pressedScale: 0.88,
              minSize: const Size(38, 38),
              semanticLabel: widget.clearLabel,
              excludeChildSemantics: true,
              borderRadius: const BorderRadius.all(Radius.circular(8)),
              builder: (context, state) => SizedBox.square(
                dimension: 30,
                child: Center(
                  child: LdsIcon('close', size: 17, color: c.textSubtle),
                ),
              ),
            ),
        ],
      ),
    );

    return ConstrainedBox(
      constraints: const BoxConstraints(minHeight: LdsSize.touchMin),
      child: Row(
        children: [
          Expanded(child: box),
          ClipRect(
            child: AnimatedAlign(
              alignment: Alignment.centerLeft,
              widthFactor: active ? 1 : 0,
              duration: context.ldsDuration(LdsMotion.smoothSpringDuration),
              curve: LdsSpringCurve.smooth,
              child: AnimatedOpacity(
                opacity: active ? 1 : 0,
                duration: context.ldsDuration(LdsMotion.fast),
                child: ExcludeFocus(
                  excluding: !active,
                  child: Padding(
                    padding: const EdgeInsets.only(left: 4),
                    child: LdsPressable(
                      onPressed: active
                          ? () {
                              _clear();
                              _focus.unfocus();
                              widget.onCancel?.call();
                            }
                          : null,
                      pressedScale: 1,
                      builder: (context, state) => Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 8),
                        child: Text(
                          widget.cancelLabel,
                          style: LdsType.body.copyWith(
                            color: c.accentText,
                            height: 1,
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
