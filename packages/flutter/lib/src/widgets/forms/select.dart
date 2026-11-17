import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../icon.dart';
import '../pressable.dart';
import 'parts.dart';

/// One option of an [LdsSelect] or [LdsCombobox].
@immutable
class LdsSelectOption<T> {
  /// Creates an option.
  const LdsSelectOption({
    required this.value,
    required this.label,
    this.description,
  });

  /// Value reported when chosen.
  final T value;

  /// Visible text, also what the combobox matches against.
  final String label;

  /// Second line, for example a code or a region.
  final String? description;
}

/// A field-shaped button that opens a list of options below it and shows
/// the one chosen: Kecamatan, Jenis layanan.
///
/// For one choice from a fixed list too long for radios. If people need to
/// type to find it, use [LdsCombobox] instead. Arrow keys move through the
/// list, Enter chooses, Escape closes and keeps the old value.
class LdsSelect<T> extends StatefulWidget {
  /// Creates a select.
  const LdsSelect({
    super.key,
    required this.label,
    required this.options,
    required this.value,
    required this.onChanged,
    this.hint = 'Pilih salah satu',
    this.help,
    this.error,
    this.optionalText,
  });

  /// Visible label above the control.
  final String label;

  /// Options, in order.
  final List<LdsSelectOption<T>> options;

  /// The chosen value; null shows [hint].
  final T? value;

  /// Called with the new value. Null disables it.
  final ValueChanged<T>? onChanged;

  /// Placeholder while nothing is chosen.
  final String hint;

  /// Help text under the control.
  final String? help;

  /// Error text; replaces [help].
  final String? error;

  /// Shown after the label, for example "(opsional)".
  final String? optionalText;

  @override
  State<LdsSelect<T>> createState() => _LdsSelectState<T>();
}

class _LdsSelectState<T> extends State<LdsSelect<T>> {
  final FocusNode _trigger = FocusNode();
  bool _open = false;

  @override
  void dispose() {
    _trigger.dispose();
    super.dispose();
  }

  void _close({bool refocus = true}) {
    if (!_open) return;
    setState(() => _open = false);
    if (refocus) _trigger.requestFocus();
  }

  void _pick(T value) {
    widget.onChanged?.call(value);
    _close();
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final enabled = widget.onChanged != null;
    final index = widget.options.indexWhere((o) => o.value == widget.value);
    final chosen = index >= 0 ? widget.options[index] : null;

    final trigger = LdsPressable(
      onPressed: enabled ? () => setState(() => _open = !_open) : null,
      pressedScale: 1,
      focusNode: _trigger,
      semanticLabel: '${widget.label}, ${chosen?.label ?? widget.hint}',
      excludeChildSemantics: true,
      builder: (context, state) => LdsFormsControlBox(
        active: _open,
        invalid: widget.error != null,
        enabled: enabled,
        child: Row(
          children: [
            Expanded(
              child: Text(
                chosen?.label ?? widget.hint,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: LdsType.body.copyWith(
                  color:
                      chosen == null || !enabled ? c.textMuted : c.textStrong,
                ),
              ),
            ),
            const SizedBox(width: 8),
            AnimatedRotation(
              turns: _open ? 0.5 : 0,
              duration: context.ldsDuration(LdsMotion.smoothSpringDuration),
              curve: LdsSpringCurve.smooth,
              child: LdsIcon('expand_more', size: 19, color: c.textMuted),
            ),
          ],
        ),
      ),
    );

    final control = CallbackShortcuts(
      bindings: {
        const SingleActivator(LogicalKeyboardKey.arrowDown): () {
          if (!_open && enabled) setState(() => _open = true);
        },
      },
      child: LdsFormsPopover(
        open: _open,
        onDismiss: () => _close(refocus: false),
        anchor: trigger,
        builder: (context) => Shortcuts(
          shortcuts: const {
            SingleActivator(LogicalKeyboardKey.arrowDown):
                DirectionalFocusIntent(TraversalDirection.down),
            SingleActivator(LogicalKeyboardKey.arrowUp):
                DirectionalFocusIntent(TraversalDirection.up),
          },
          child: FocusTraversalGroup(
            child: SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  for (var i = 0; i < widget.options.length; i++)
                    LdsFormsMenuItem(
                      label: widget.options[i].label,
                      description: widget.options[i].description,
                      selected: i == index,
                      autofocus: i == (index < 0 ? 0 : index),
                      onPressed: () => _pick(widget.options[i].value),
                    ),
                ],
              ),
            ),
          ),
        ),
      ),
    );

    return Semantics(
      expanded: _open,
      child: LdsFormsFieldShell(
        label: widget.label,
        optionalText: widget.optionalText,
        help: widget.help,
        error: widget.error,
        child: control,
      ),
    );
  }
}
