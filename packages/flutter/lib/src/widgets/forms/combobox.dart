import 'package:flutter/services.dart';
import 'package:material_ui/material_ui.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../icon.dart';
import '../pressable.dart';
import '../text_field.dart';
import 'parts.dart';
import 'select.dart';

/// A text field that filters a list of options as people type and stores
/// the one they pick: Kelurahan, Puskesmas tujuan.
///
/// Down and Up move through the matches while focus stays in the field,
/// Enter picks, Escape closes. When nothing matches it says so with
/// [emptyText]. Leaving the field without picking puts the chosen label
/// back.
class LdsCombobox<T> extends StatefulWidget {
  /// Creates a combobox.
  const LdsCombobox({
    super.key,
    required this.label,
    required this.options,
    required this.value,
    required this.onChanged,
    this.hint,
    this.help,
    this.error,
    this.optionalText,
    this.emptyText = 'Tidak ada yang cocok',
    this.filter,
  });

  /// Visible label above the control.
  final String label;

  /// All options; the field filters them.
  final List<LdsSelectOption<T>> options;

  /// The chosen value.
  final T? value;

  /// Called with the picked value. Null disables it.
  final ValueChanged<T>? onChanged;

  /// Placeholder.
  final String? hint;

  /// Help text under the control.
  final String? help;

  /// Error text; replaces [help].
  final String? error;

  /// Shown after the label, for example "(opsional)".
  final String? optionalText;

  /// Shown when nothing matches.
  final String emptyText;

  /// Custom match; defaults to a case-insensitive "contains" on the label
  /// and description.
  final bool Function(LdsSelectOption<T> option, String query)? filter;

  @override
  State<LdsCombobox<T>> createState() => _LdsComboboxState<T>();
}

class _LdsComboboxState<T> extends State<LdsCombobox<T>> {
  final TextEditingController _text = TextEditingController();
  late final FocusNode _focus = FocusNode(onKeyEvent: _onKey);
  bool _open = false;
  bool _typed = false;
  int _active = 0;

  LdsSelectOption<T>? get _chosen {
    for (final o in widget.options) {
      if (o.value == widget.value) return o;
    }
    return null;
  }

  @override
  void initState() {
    super.initState();
    _text.text = _chosen?.label ?? '';
    _focus.addListener(_onFocus);
  }

  @override
  void didUpdateWidget(LdsCombobox<T> oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.value != widget.value && !_focus.hasFocus) {
      _text.text = _chosen?.label ?? '';
    }
  }

  @override
  void dispose() {
    _text.dispose();
    _focus.dispose();
    super.dispose();
  }

  void _onFocus() {
    if (!_focus.hasFocus) {
      _text.text = _chosen?.label ?? '';
      if (_open) setState(() => _open = false);
    }
  }

  List<LdsSelectOption<T>> get _matches {
    if (!_typed) return widget.options;
    final q = _text.text.trim().toLowerCase();
    if (q.isEmpty) return widget.options;
    final f = widget.filter;
    return widget.options
        .where(
          (o) => f != null
              ? f(o, q)
              : o.label.toLowerCase().contains(q) ||
                    (o.description?.toLowerCase().contains(q) ?? false),
        )
        .toList();
  }

  KeyEventResult _onKey(FocusNode node, KeyEvent event) {
    if (event is! KeyDownEvent && event is! KeyRepeatEvent) {
      return KeyEventResult.ignored;
    }
    final key = event.logicalKey;
    final matches = _matches;
    if (key == LogicalKeyboardKey.arrowDown ||
        key == LogicalKeyboardKey.arrowUp) {
      if (!_open) {
        setState(() {
          _open = true;
          _active = 0;
        });
      } else if (matches.isNotEmpty) {
        final d = key == LogicalKeyboardKey.arrowDown ? 1 : -1;
        setState(
          () => _active = (_active + d + matches.length) % matches.length,
        );
      }
      return KeyEventResult.handled;
    }
    if (key == LogicalKeyboardKey.enter && _open && matches.isNotEmpty) {
      _pick(matches[_active.clamp(0, matches.length - 1)]);
      return KeyEventResult.handled;
    }
    if (key == LogicalKeyboardKey.escape && _open) {
      setState(() => _open = false);
      return KeyEventResult.handled;
    }
    return KeyEventResult.ignored;
  }

  void _pick(LdsSelectOption<T> o) {
    _text.text = o.label;
    _text.selection = TextSelection.collapsed(offset: o.label.length);
    setState(() {
      _open = false;
      _typed = false;
    });
    widget.onChanged?.call(o.value);
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final enabled = widget.onChanged != null;
    final matches = _matches;

    final field = LdsTextField(
      label: widget.label,
      controller: _text,
      focusNode: _focus,
      hint: widget.hint,
      help: widget.help,
      error: widget.error,
      optionalText: widget.optionalText,
      enabled: enabled,
      onChanged: (_) => setState(() {
        _open = true;
        _typed = true;
        _active = 0;
      }),
      suffix: LdsPressable(
        onPressed: enabled
            ? () {
                setState(() {
                  _open = !_open;
                  _typed = false;
                });
                _focus.requestFocus();
              }
            : null,
        pressedScale: 0.88,
        semanticLabel: _open ? 'Tutup daftar' : 'Buka daftar',
        excludeChildSemantics: true,
        builder: (context, state) => AnimatedRotation(
          turns: _open ? 0.5 : 0,
          duration: context.ldsDuration(LdsMotion.smoothSpringDuration),
          curve: LdsSpringCurve.smooth,
          child: LdsIcon('expand_more', size: 19, color: c.textSubtle),
        ),
      ),
    );

    return Semantics(
      expanded: _open,
      child: LdsFormsPopover(
        open: _open && enabled,
        onDismiss: () => setState(() => _open = false),
        anchor: field,
        builder: (context) {
          if (matches.isEmpty) {
            return Semantics(
              liveRegion: true,
              child: Padding(
                padding: const EdgeInsets.symmetric(
                  horizontal: 10,
                  vertical: 12,
                ),
                child: Text(
                  widget.emptyText,
                  style: LdsType.subhead.copyWith(color: c.textMuted),
                ),
              ),
            );
          }
          return SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                for (var i = 0; i < matches.length; i++)
                  ExcludeFocus(
                    child: LdsFormsMenuItem(
                      label: matches[i].label,
                      description: matches[i].description,
                      selected: matches[i].value == widget.value,
                      highlighted: i == _active,
                      onPressed: () => _pick(matches[i]),
                    ),
                  ),
              ],
            ),
          );
        },
      ),
    );
  }
}
