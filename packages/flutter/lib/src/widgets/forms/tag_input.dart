import 'package:flutter/services.dart';
import 'package:material_ui/material_ui.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../icon.dart';
import '../pressable.dart';
import 'parts.dart';

/// A field that turns typed text into removable tags: Enter or a comma adds
/// one, Backspace in an empty field removes the last. For several short
/// free values: kata kunci laporan, nama desa.
class LdsTagInput extends StatefulWidget {
  /// Creates a tag input.
  const LdsTagInput({
    super.key,
    required this.label,
    required this.tags,
    required this.onChanged,
    this.hint = 'Ketik lalu tekan Enter',
    this.help,
    this.error,
    this.optionalText,
    this.allowDuplicates = false,
    this.removeLabel = 'Hapus',
  });

  /// Visible label above the control.
  final String label;

  /// Current tags.
  final List<String> tags;

  /// Called with the new list. Null disables it.
  final ValueChanged<List<String>>? onChanged;

  /// Placeholder in the input.
  final String hint;

  /// Help text under the control.
  final String? help;

  /// Error text; replaces [help].
  final String? error;

  /// Shown after the label, for example "(opsional)".
  final String? optionalText;

  /// Keep a tag that is already in the list.
  final bool allowDuplicates;

  /// Remove button label; the tag text is added for screen readers.
  final String removeLabel;

  @override
  State<LdsTagInput> createState() => _LdsTagInputState();
}

class _LdsTagInputState extends State<LdsTagInput> {
  final TextEditingController _text = TextEditingController();
  late final FocusNode _focus = FocusNode(onKeyEvent: _onKey);
  bool _focused = false;

  @override
  void initState() {
    super.initState();
    _focus.addListener(() {
      if (mounted) setState(() => _focused = _focus.hasFocus);
    });
  }

  @override
  void dispose() {
    _text.dispose();
    _focus.dispose();
    super.dispose();
  }

  KeyEventResult _onKey(FocusNode node, KeyEvent event) {
    if (event is KeyDownEvent &&
        event.logicalKey == LogicalKeyboardKey.backspace &&
        _text.text.isEmpty &&
        widget.tags.isNotEmpty &&
        widget.onChanged != null) {
      widget.onChanged!([...widget.tags]..removeLast());
      return KeyEventResult.handled;
    }
    return KeyEventResult.ignored;
  }

  void _add(String raw) {
    final parts = raw
        .split(',')
        .map((s) => s.trim())
        .where((s) => s.isNotEmpty)
        .toList();
    _text.clear();
    if (parts.isEmpty || widget.onChanged == null) return;
    final next = [...widget.tags];
    for (final p in parts) {
      if (widget.allowDuplicates || !next.contains(p)) next.add(p);
    }
    widget.onChanged!(next);
  }

  void _remove(int i) {
    widget.onChanged?.call([...widget.tags]..removeAt(i));
    _focus.requestFocus();
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final enabled = widget.onChanged != null;

    Widget tag(int i) {
      final text = widget.tags[i];
      return TweenAnimationBuilder<double>(
        key: ValueKey('$i:$text'),
        tween: Tween(begin: 0.85, end: 1),
        duration: context.ldsDuration(LdsMotion.snappy),
        curve: LdsSpringCurve.snappy,
        builder: (context, s, child) => Transform.scale(scale: s, child: child),
        child: Container(
          height: 28,
          padding: const EdgeInsets.only(left: 10, right: 2),
          decoration: BoxDecoration(
            color: c.bgRecessed,
            borderRadius: const BorderRadius.all(Radius.circular(8)),
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Flexible(
                child: Text(
                  text,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: LdsType.footnote.copyWith(
                    color: c.textStrong,
                    fontWeight: FontWeight.w500,
                    height: 1,
                  ),
                ),
              ),
              const SizedBox(width: 2),
              LdsPressable(
                onPressed: enabled ? () => _remove(i) : null,
                pressedScale: 0.88,
                minSize: const Size(28, 28),
                semanticLabel: '${widget.removeLabel} $text',
                excludeChildSemantics: true,
                borderRadius: const BorderRadius.all(Radius.circular(6)),
                builder: (context, state) => Container(
                  width: 22,
                  height: 22,
                  alignment: Alignment.center,
                  decoration: BoxDecoration(
                    color: state.hovered ? c.bgTintStrong : null,
                    borderRadius: const BorderRadius.all(Radius.circular(6)),
                  ),
                  child: LdsIcon(
                    'close',
                    size: 15,
                    color: state.hovered ? c.textStrong : c.textSubtle,
                  ),
                ),
              ),
            ],
          ),
        ),
      );
    }

    final input = SizedBox(
      width: widget.tags.isEmpty ? 220 : 140,
      child: MergeSemantics(
        child: Semantics(
          label: widget.label,
          child: TextField(
            controller: _text,
            focusNode: _focus,
            enabled: enabled,
            textInputAction: TextInputAction.done,
            onChanged: (v) {
              if (v.contains(',')) _add(v);
            },
            onSubmitted: (v) {
              _add(v);
              _focus.requestFocus();
            },
            style: LdsType.body.copyWith(color: c.textStrong),
            cursorColor: c.accent,
            decoration: InputDecoration(
              hintText: widget.tags.isEmpty ? widget.hint : null,
              hintStyle: LdsType.body.copyWith(color: c.textMuted),
              border: InputBorder.none,
              enabledBorder: InputBorder.none,
              focusedBorder: InputBorder.none,
              disabledBorder: InputBorder.none,
              filled: false,
              isDense: true,
              contentPadding: const EdgeInsets.symmetric(vertical: 6),
            ),
          ),
        ),
      ),
    );

    return LdsFormsFieldShell(
      label: widget.label,
      optionalText: widget.optionalText,
      help: widget.help,
      error: widget.error,
      child: GestureDetector(
        onTap: () => _focus.requestFocus(),
        excludeFromSemantics: true,
        child: LdsFormsControlBox(
          active: _focused,
          invalid: widget.error != null,
          enabled: enabled,
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 6),
          child: Align(
            alignment: Alignment.centerLeft,
            child: Wrap(
              spacing: 6,
              runSpacing: 6,
              crossAxisAlignment: WrapCrossAlignment.center,
              children: [
                for (var i = 0; i < widget.tags.length; i++) tag(i),
                input,
              ],
            ),
          ),
        ),
      ),
    );
  }
}
