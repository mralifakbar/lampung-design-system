import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../icon.dart';
import '../pressable.dart';
import 'parts.dart';

/// Click a name to rename it where it is: the text becomes a field with the
/// same font, Enter or leaving saves, Escape puts it back.
///
/// [onSave] returns null when the save worked (a small check is drawn) or
/// a reason when it was refused: the old text comes back, the field shakes
/// once and the reason shows under it.
class LdsInlineEdit extends StatefulWidget {
  /// Creates an inline edit.
  const LdsInlineEdit({
    super.key,
    required this.value,
    required this.onSave,
    this.style,
    this.semanticLabel = 'Ubah nama',
  });

  /// The saved text.
  final String value;

  /// Saves the new text; returns null on success or the reason it was
  /// refused. Null makes the text read-only.
  final Future<String?> Function(String value)? onSave;

  /// Text style; defaults to body strong.
  final TextStyle? style;

  /// Label of the edit button for screen readers; the text is added.
  final String semanticLabel;

  @override
  State<LdsInlineEdit> createState() => _LdsInlineEditState();
}

enum _Phase { idle, editing, saving, saved }

class _LdsInlineEditState extends State<LdsInlineEdit> {
  final TextEditingController _text = TextEditingController();
  late final FocusNode _focus = FocusNode(onKeyEvent: _onKey);
  final FocusNode _button = FocusNode();
  _Phase _phase = _Phase.idle;
  String? _error;
  int _shake = 0;
  late String _shown = widget.value;

  @override
  void initState() {
    super.initState();
    _focus.addListener(() {
      if (!_focus.hasFocus && _phase == _Phase.editing) _commit();
    });
  }

  @override
  void didUpdateWidget(LdsInlineEdit oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.value != widget.value && _phase != _Phase.saving) {
      _shown = widget.value;
    }
  }

  @override
  void dispose() {
    _text.dispose();
    _focus.dispose();
    _button.dispose();
    super.dispose();
  }

  KeyEventResult _onKey(FocusNode node, KeyEvent event) {
    if (event is KeyDownEvent &&
        event.logicalKey == LogicalKeyboardKey.escape) {
      setState(() => _phase = _Phase.idle);
      _button.requestFocus();
      return KeyEventResult.handled;
    }
    return KeyEventResult.ignored;
  }

  void _start() {
    _text.text = _shown;
    _text.selection = TextSelection(baseOffset: 0, extentOffset: _shown.length);
    setState(() {
      _phase = _Phase.editing;
      _error = null;
    });
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted) _focus.requestFocus();
    });
  }

  Future<void> _commit() async {
    final next = _text.text.trim();
    if (next.isEmpty || next == _shown) {
      setState(() => _phase = _Phase.idle);
      return;
    }
    final old = _shown;
    setState(() {
      _shown = next;
      _phase = _Phase.saving;
    });
    final error = await widget.onSave!(next);
    if (!mounted) return;
    if (error == null) {
      setState(() => _phase = _Phase.saved);
    } else {
      setState(() {
        _shown = old;
        _phase = _Phase.idle;
        _error = error;
        _shake++;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final style =
        (widget.style ?? LdsType.bodyStrong).copyWith(color: c.textStrong);
    const radius = BorderRadius.all(Radius.circular(9));

    final Widget main;
    if (_phase == _Phase.editing) {
      main = IntrinsicWidth(
        child: Container(
          height: 36,
          constraints: const BoxConstraints(minWidth: 120),
          padding: const EdgeInsets.symmetric(horizontal: 8),
          alignment: Alignment.centerLeft,
          decoration: BoxDecoration(
            color: c.bgBase,
            borderRadius: radius,
            border: Border.all(color: c.accent, width: 1.5),
            boxShadow: [BoxShadow(color: c.accentRing, spreadRadius: 4)],
          ),
          child: TextField(
            controller: _text,
            focusNode: _focus,
            style: style,
            cursorColor: c.accent,
            onSubmitted: (_) => _commit(),
            decoration: const InputDecoration(
              border: InputBorder.none,
              enabledBorder: InputBorder.none,
              focusedBorder: InputBorder.none,
              filled: false,
              isCollapsed: true,
            ),
          ),
        ),
      );
    } else {
      main = LdsPressable(
        onPressed:
            widget.onSave == null || _phase == _Phase.saving ? null : _start,
        pressedScale: 1,
        focusNode: _button,
        borderRadius: radius,
        semanticLabel: '${widget.semanticLabel}: $_shown',
        excludeChildSemantics: true,
        mouseCursor: SystemMouseCursors.text,
        builder: (context, state) => AnimatedContainer(
          duration: context.ldsDuration(LdsMotion.fast),
          height: 36,
          padding: const EdgeInsets.symmetric(horizontal: 8),
          decoration: BoxDecoration(
            color: state.hovered ? c.bgTint : null,
            borderRadius: radius,
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Flexible(
                child: Text(
                  _shown,
                  style: style,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
              const SizedBox(width: 6),
              AnimatedOpacity(
                opacity: state.hovered || state.focused ? 1 : 0,
                duration: context.ldsDuration(LdsMotion.fast),
                child: LdsIcon('edit', size: 16, color: c.textMuted),
              ),
            ],
          ),
        ),
      );
    }

    Widget? stateIcon;
    if (_phase == _Phase.saving) {
      stateIcon = SizedBox.square(
        dimension: 16,
        child: CircularProgressIndicator(
          strokeWidth: 2,
          color: c.textMuted,
          backgroundColor: Colors.transparent,
        ),
      );
    } else if (_phase == _Phase.saved) {
      stateIcon = Semantics(
        liveRegion: true,
        label: 'Tersimpan',
        child: TweenAnimationBuilder<double>(
          tween: Tween(begin: 0, end: 1),
          duration: context.ldsDuration(const Duration(milliseconds: 300)),
          curve: LdsMotion.enterCurve,
          builder: (context, t, _) => CustomPaint(
            size: const Size.square(16),
            painter: LdsFormsTickPainter(progress: t, color: c.success),
          ),
        ),
      );
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        Transform.translate(
          offset: const Offset(-8, 0),
          child: LdsFormsShake(
            trigger: _shake,
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Flexible(child: main),
                if (stateIcon != null) ...[
                  const SizedBox(width: 6),
                  SizedBox.square(
                    dimension: 20,
                    child: Center(child: stateIcon),
                  ),
                ],
              ],
            ),
          ),
        ),
        if (_error != null) ...[
          const SizedBox(height: 4),
          LdsFormsMessage(_error!, error: true),
        ],
      ],
    );
  }
}
