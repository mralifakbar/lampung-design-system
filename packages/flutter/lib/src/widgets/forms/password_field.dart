import 'package:flutter/material.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../button.dart';
import '../text_field.dart';

/// How strong a new password is, from [LdsPasswordField.strengthOf].
enum LdsPasswordStrength {
  /// Nothing typed yet.
  empty,

  /// Easy to guess.
  weak,

  /// Better, still short of good.
  fair,

  /// Good enough.
  good,

  /// Long and varied.
  strong,
}

/// A text field for secrets, with a reveal button that swaps its eye icon
/// in place.
///
/// When creating a password set [showStrength]: a four-step meter and a
/// helper say what would make it stronger.
class LdsPasswordField extends StatefulWidget {
  /// Creates a password field.
  const LdsPasswordField({
    super.key,
    this.label = 'Kata sandi',
    this.controller,
    this.focusNode,
    this.help,
    this.error,
    this.showStrength = false,
    this.newPassword = false,
    this.enabled = true,
    this.onChanged,
    this.onSubmitted,
    this.showLabel = 'Tampilkan kata sandi',
    this.hideLabel = 'Sembunyikan kata sandi',
  });

  /// Visible label above the control.
  final String label;

  /// Controls the text being edited.
  final TextEditingController? controller;

  /// Focus node for the input.
  final FocusNode? focusNode;

  /// Help text under the control, replaced by the strength helper when
  /// [showStrength] is on and something is typed.
  final String? help;

  /// Error text; replaces the help.
  final String? error;

  /// Show the strength meter (for creating a password).
  final bool showStrength;

  /// Autofill as a new password instead of the current one.
  final bool newPassword;

  /// Whether the field accepts input.
  final bool enabled;

  /// Called on every change.
  final ValueChanged<String>? onChanged;

  /// Called when the person submits from the keyboard.
  final ValueChanged<String>? onSubmitted;

  /// Reveal button label while hidden.
  final String showLabel;

  /// Reveal button label while shown.
  final String hideLabel;

  /// Rates [password]: length and the mix of lower case, upper case,
  /// digits and symbols.
  static LdsPasswordStrength strengthOf(String password) {
    if (password.isEmpty) return LdsPasswordStrength.empty;
    var score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    var kinds = 0;
    if (RegExp('[a-z]').hasMatch(password)) kinds++;
    if (RegExp('[A-Z]').hasMatch(password)) kinds++;
    if (RegExp(r'\d').hasMatch(password)) kinds++;
    if (RegExp(r'[^A-Za-z0-9]').hasMatch(password)) kinds++;
    if (kinds >= 2) score++;
    if (kinds >= 3) score++;
    if (password.length < 8) score = score.clamp(0, 1);
    return LdsPasswordStrength.values[(score + 1).clamp(1, 4)];
  }

  @override
  State<LdsPasswordField> createState() => _LdsPasswordFieldState();
}

class _LdsPasswordFieldState extends State<LdsPasswordField> {
  TextEditingController? _own;
  TextEditingController get _text =>
      widget.controller ?? (_own ??= TextEditingController());
  bool _visible = false;

  @override
  void dispose() {
    _own?.dispose();
    super.dispose();
  }

  static const _labels = {
    LdsPasswordStrength.weak: 'Lemah. Pakai minimal 8 karakter.',
    LdsPasswordStrength.fair: 'Cukup. Tambahkan huruf besar atau angka.',
    LdsPasswordStrength.good: 'Baik. Tambah panjang agar lebih kuat.',
    LdsPasswordStrength.strong: 'Kuat.',
  };

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final strength = LdsPasswordField.strengthOf(_text.text);
    final showMeter =
        widget.showStrength && strength != LdsPasswordStrength.empty;
    final level = strength.index; // 1 to 4 when typed
    final tone = switch (strength) {
      LdsPasswordStrength.weak => c.danger,
      LdsPasswordStrength.fair => c.warning,
      _ => c.success,
    };

    final field = LdsTextField(
      label: widget.label,
      controller: _text,
      focusNode: widget.focusNode,
      enabled: widget.enabled,
      obscureText: !_visible,
      error: widget.error,
      help: showMeter ? _labels[strength] : widget.help,
      autofillHints: [
        widget.newPassword ? AutofillHints.newPassword : AutofillHints.password
      ],
      keyboardType: TextInputType.visiblePassword,
      onChanged: (v) {
        if (widget.showStrength) setState(() {});
        widget.onChanged?.call(v);
      },
      onSubmitted: widget.onSubmitted,
      suffix: LdsIconButton(
        icon: _visible ? 'visibility_off' : 'visibility',
        semanticLabel: _visible ? widget.hideLabel : widget.showLabel,
        showTooltip: false,
        color: c.textSubtle,
        onPressed:
            widget.enabled ? () => setState(() => _visible = !_visible) : null,
      ),
    );

    if (!widget.showStrength) return field;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      mainAxisSize: MainAxisSize.min,
      children: [
        field,
        const SizedBox(height: 8),
        ExcludeSemantics(
          child: Row(
            children: [
              for (var i = 1; i <= 4; i++) ...[
                if (i > 1) const SizedBox(width: 4),
                Expanded(
                  child: AnimatedContainer(
                    duration: context.ldsDuration(LdsMotion.standard),
                    curve: LdsMotion.standardCurve,
                    height: 4,
                    decoration: BoxDecoration(
                      color: showMeter && i <= level ? tone : c.bgTrack,
                      borderRadius: const BorderRadius.all(Radius.circular(2)),
                    ),
                  ),
                ),
              ],
            ],
          ),
        ),
      ],
    );
  }
}
