import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../icon.dart';
import '../pressable.dart';

/// The reply box under a conversation: a rounded field that grows with the
/// text up to 200 px, Enter to send, Shift+Enter for a new line, and one
/// round send button that stays disabled until there is something to send.
///
/// Keep it outside the message scroller. Tools ([leading], for example an
/// attach [LdsIconButton]) go before the field; send is always last. After
/// sending, the field clears and keeps focus. Enter while an input method is
/// composing characters confirms them and does not send.
class LdsComposer extends StatefulWidget {
  /// Creates a composer.
  const LdsComposer({
    super.key,
    required this.onSend,
    this.controller,
    this.focusNode,
    this.hint = 'Tulis pertanyaan Anda',
    this.semanticLabel = 'Pesan',
    this.sendLabel = 'Kirim',
    this.leading = const [],
    this.busy = false,
    this.onStop,
    this.stopLabel = 'Hentikan jawaban',
    this.enabled = true,
    this.autofocus = false,
  });

  /// Called with the trimmed text when the person sends.
  final ValueChanged<String> onSend;

  /// Controls the draft.
  final TextEditingController? controller;

  /// Focus node of the field.
  final FocusNode? focusNode;

  /// Placeholder: a hint, never the label.
  final String hint;

  /// Label of the field for screen readers.
  final String semanticLabel;

  /// Label of the send button.
  final String sendLabel;

  /// Tools before the field.
  final List<Widget> leading;

  /// While the assistant answers, send turns into a stop button (when
  /// [onStop] is set).
  final bool busy;

  /// Stops the answer being generated.
  final VoidCallback? onStop;

  /// Label of the stop button.
  final String stopLabel;

  /// Whether the field accepts input.
  final bool enabled;

  /// Take focus when first built.
  final bool autofocus;

  @override
  State<LdsComposer> createState() => _LdsComposerState();
}

class _LdsComposerState extends State<LdsComposer> {
  TextEditingController? _ownController;
  FocusNode? _ownFocus;
  bool _focused = false;

  TextEditingController get _text =>
      widget.controller ?? (_ownController ??= TextEditingController());
  FocusNode get _focus => widget.focusNode ?? (_ownFocus ??= FocusNode());

  bool get _canSend => _text.text.trim().isNotEmpty && widget.enabled;

  @override
  void initState() {
    super.initState();
    _text.addListener(_onText);
    _focus.addListener(_onFocus);
  }

  @override
  void didUpdateWidget(LdsComposer oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.controller != widget.controller) {
      (oldWidget.controller ?? _ownController)?.removeListener(_onText);
      _text.addListener(_onText);
    }
    if (oldWidget.focusNode != widget.focusNode) {
      (oldWidget.focusNode ?? _ownFocus)?.removeListener(_onFocus);
      _focus.addListener(_onFocus);
    }
  }

  void _onText() => setState(() {});

  void _onFocus() => setState(() => _focused = _focus.hasFocus);

  void _send() {
    if (!_canSend || widget.busy) return;
    final value = _text.text.trim();
    widget.onSend(value);
    _text.clear();
    _focus.requestFocus();
  }

  KeyEventResult _onKey(FocusNode node, KeyEvent event) {
    if (event is! KeyDownEvent) return KeyEventResult.ignored;
    if (event.logicalKey != LogicalKeyboardKey.enter &&
        event.logicalKey != LogicalKeyboardKey.numpadEnter) {
      return KeyEventResult.ignored;
    }
    if (HardwareKeyboard.instance.isShiftPressed) {
      return KeyEventResult.ignored;
    }
    // Enter while composing confirms the characters.
    if (_text.value.composing.isValid) return KeyEventResult.ignored;
    _send();
    return KeyEventResult.handled;
  }

  @override
  void dispose() {
    _text.removeListener(_onText);
    _focus.removeListener(_onFocus);
    _ownController?.dispose();
    _ownFocus?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final stop = widget.busy && widget.onStop != null;
    final active = stop || _canSend;
    const radius = BorderRadius.all(Radius.circular(24));
    final send = LdsPressable(
      onPressed: stop ? widget.onStop : (_canSend && !widget.busy ? _send : null),
      pressedScale: 0.9,
      borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.pill)),
      semanticLabel: stop ? widget.stopLabel : widget.sendLabel,
      excludeChildSemantics: true,
      builder: (context, state) => AnimatedOpacity(
        opacity: active ? 1 : 0.35,
        duration: context.ldsDuration(LdsMotion.fast),
        child: Container(
          width: 40,
          height: 40,
          alignment: Alignment.center,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: stop
                ? c.textStrong
                : state.pressed
                    ? c.accentPressed
                    : state.hovered
                        ? c.accentHover
                        : c.accent,
          ),
          child: stop
              ? DecoratedBox(
                  decoration: BoxDecoration(
                    color: c.bgCanvas,
                    borderRadius: const BorderRadius.all(Radius.circular(3)),
                  ),
                  child: const SizedBox.square(dimension: 12),
                )
              : LdsIcon('arrow_upward', color: c.textOnAccent),
        ),
      ),
    );

    final field = Focus(
      onKeyEvent: _onKey,
      canRequestFocus: false,
      skipTraversal: true,
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxHeight: 200),
        child: Semantics(
          label: widget.semanticLabel,
          child: TextField(
            controller: _text,
            focusNode: _focus,
            enabled: widget.enabled,
            autofocus: widget.autofocus,
            minLines: 1,
            maxLines: null,
            keyboardType: TextInputType.multiline,
            textInputAction: TextInputAction.newline,
            textCapitalization: TextCapitalization.sentences,
            style: LdsType.body.copyWith(height: 22 / 15, color: c.textStrong),
            cursorColor: c.accent,
            decoration: InputDecoration(
              isCollapsed: true,
              filled: false,
              border: InputBorder.none,
              enabledBorder: InputBorder.none,
              focusedBorder: InputBorder.none,
              disabledBorder: InputBorder.none,
              contentPadding: const EdgeInsets.symmetric(vertical: 9),
              hintText: widget.hint,
              hintStyle: LdsType.body.copyWith(height: 22 / 15, color: c.textMuted),
            ),
          ),
        ),
      ),
    );

    return AnimatedContainer(
      duration: context.ldsDuration(LdsMotion.fast),
      curve: LdsMotion.standardCurve,
      padding: EdgeInsets.fromLTRB(widget.leading.isEmpty ? 16 : 4, 2, 2, 2),
      decoration: BoxDecoration(
        color: c.bgBase,
        borderRadius: radius,
        border: Border.all(
          color: _focused ? c.accent : c.lineControl,
          width: _focused ? 1.5 : 1,
        ),
        boxShadow: [
          if (_focused) BoxShadow(color: c.accentRing, spreadRadius: 4),
          if (!_focused) ...context.ldsShadows.sm,
        ],
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.end,
        children: [
          ...widget.leading,
          if (widget.leading.isNotEmpty) const SizedBox(width: 4),
          Expanded(
            child: Padding(
              padding: const EdgeInsets.symmetric(vertical: 2),
              child: field,
            ),
          ),
          const SizedBox(width: 4),
          send,
        ],
      ),
    );
  }
}
