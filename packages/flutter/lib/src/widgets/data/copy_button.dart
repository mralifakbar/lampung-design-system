import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../icon.dart';
import '../pressable.dart';

/// Copies [text] to the clipboard and confirms in place for 1.6 s: the copy
/// glyph swaps to a check and the label reads [copiedLabel].
///
/// Set [iconOnly] for a bare icon button (the label is still announced).
class LdsCopyButton extends StatefulWidget {
  /// Creates a copy button.
  const LdsCopyButton({
    super.key,
    required this.text,
    this.label = 'Salin',
    this.copiedLabel = 'Tersalin',
    this.iconOnly = false,
    this.onCopied,
  });

  /// What goes on the clipboard.
  final String text;

  /// Label at rest.
  final String label;

  /// Label while confirming.
  final String copiedLabel;

  /// Show only the icon, in a 36 px square.
  final bool iconOnly;

  /// Called after the text was written.
  final VoidCallback? onCopied;

  /// How long the confirmation stays.
  static const Duration confirmDuration = Duration(milliseconds: 1600);

  @override
  State<LdsCopyButton> createState() => _LdsCopyButtonState();
}

class _LdsCopyButtonState extends State<LdsCopyButton> {
  bool _copied = false;
  Timer? _timer;

  Future<void> _copy() async {
    try {
      await Clipboard.setData(ClipboardData(text: widget.text));
    } on PlatformException {
      // A blocked clipboard still confirms, as on the web.
    }
    if (!mounted) return;
    _timer?.cancel();
    setState(() => _copied = true);
    widget.onCopied?.call();
    _timer = Timer(LdsCopyButton.confirmDuration, () {
      if (mounted) setState(() => _copied = false);
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final reduce = context.ldsReduceMotion;
    final label = _copied ? widget.copiedLabel : widget.label;
    final icon = AnimatedSwitcher(
      duration: reduce ? LdsMotion.instant : LdsMotion.snappy,
      reverseDuration: reduce ? LdsMotion.instant : LdsMotion.fast,
      switchInCurve: reduce ? Curves.linear : LdsSpringCurve.snappy,
      transitionBuilder: (child, animation) {
        final fade = FadeTransition(opacity: animation, child: child);
        if (reduce) return fade;
        return ScaleTransition(
          scale: Tween<double>(begin: 0.5, end: 1).animate(animation),
          child: fade,
        );
      },
      child: LdsIcon(
        _copied ? 'check' : 'content_copy',
        key: ValueKey(_copied),
        size: 15,
        color: c.textStrong,
      ),
    );
    return Semantics(
      liveRegion: true,
      child: LdsPressable(
        onPressed: _copy,
        borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.sm)),
        semanticLabel: label,
        excludeChildSemantics: true,
        tooltip: widget.iconOnly ? label : null,
        builder: (context, state) => AnimatedContainer(
          duration: context.ldsDuration(LdsMotion.fast),
          height: widget.iconOnly ? 36 : LdsSize.controlSm,
          width: widget.iconOnly ? 36 : null,
          // A fixed minimum keeps the width steady when the label changes.
          constraints:
              widget.iconOnly ? null : const BoxConstraints(minWidth: 92),
          padding: widget.iconOnly
              ? null
              : const EdgeInsets.symmetric(horizontal: 10),
          alignment: Alignment.center,
          decoration: BoxDecoration(
            color: widget.iconOnly
                ? (state.hovered || state.pressed
                    ? c.bgTint
                    : Colors.transparent)
                : (state.hovered || state.pressed
                    ? Color.alphaBlend(c.bgTintStrong, c.bgRecessed)
                    : c.bgRecessed),
            borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.sm)),
          ),
          child: widget.iconOnly
              ? icon
              : Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    icon,
                    const SizedBox(width: 6),
                    Text(
                      label,
                      style: TextStyle(
                        fontFamily: LdsType.family,
                        fontSize: 13,
                        height: 1,
                        fontWeight: FontWeight.w500,
                        color: c.textStrong,
                      ),
                    ),
                  ],
                ),
        ),
      ),
    );
  }
}
