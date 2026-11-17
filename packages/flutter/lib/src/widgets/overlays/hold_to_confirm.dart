import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../icon.dart';

/// A button you press and hold for 1.2 s to confirm something costly but not
/// dangerous enough for a dialog. A fill sweeps across while you hold and
/// drains if you let go early.
///
/// The label says the gesture ("Tahan untuk mengirim jawaban"). Keyboard:
/// hold Space or Enter, release to cancel. Screen readers confirm with the
/// long-press action. Offer another path where holding is hard.
class LdsHoldToConfirm extends StatefulWidget {
  /// Creates a hold-to-confirm button.
  const LdsHoldToConfirm({
    super.key,
    required this.label,
    required this.onConfirmed,
    this.icon,
    this.destructive = false,
    this.holdDuration = const Duration(milliseconds: 1200),
    this.expand = false,
  });

  /// States the gesture: "Hold to ...".
  final String label;

  /// Called once the hold completes. Null disables the button.
  final VoidCallback? onConfirmed;

  /// Optional leading icon.
  final String? icon;

  /// Use the danger color instead of the accent.
  final bool destructive;

  /// How long to hold.
  final Duration holdDuration;

  /// Fill the available width.
  final bool expand;

  @override
  State<LdsHoldToConfirm> createState() => _LdsHoldToConfirmState();
}

class _LdsHoldToConfirmState extends State<LdsHoldToConfirm>
    with SingleTickerProviderStateMixin {
  late final AnimationController _fill = AnimationController(
    vsync: this,
    duration: widget.holdDuration,
    reverseDuration: LdsMotion.standard,
  );
  final FocusNode _focus = FocusNode(debugLabel: 'hold to confirm');
  bool _holding = false;
  bool _focused = false;

  bool get _enabled => widget.onConfirmed != null;

  @override
  void initState() {
    super.initState();
    _fill.addStatusListener((s) {
      if (s == AnimationStatus.completed && _holding) {
        _holding = false;
        widget.onConfirmed?.call();
        _fill.reverse();
        setState(() {});
      }
    });
  }

  @override
  void dispose() {
    _fill.dispose();
    _focus.dispose();
    super.dispose();
  }

  void _start() {
    if (!_enabled || _holding) return;
    setState(() => _holding = true);
    _fill.duration = widget.holdDuration;
    _fill.forward();
  }

  void _cancel() {
    if (!_holding) return;
    setState(() => _holding = false);
    _fill.reverseDuration =
        context.ldsReduceMotion ? LdsMotion.instant : LdsMotion.standard;
    _fill.reverse();
  }

  KeyEventResult _onKey(FocusNode node, KeyEvent e) {
    final k = e.logicalKey;
    if (k != LogicalKeyboardKey.space && k != LogicalKeyboardKey.enter) {
      return KeyEventResult.ignored;
    }
    if (e is KeyDownEvent) {
      _start();
    } else if (e is KeyUpEvent) {
      _cancel();
    }
    return KeyEventResult.handled;
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final base = widget.destructive ? c.danger : c.accent;
    final fg = widget.destructive ? Colors.white : c.textOnAccent;
    const radius = BorderRadius.all(Radius.circular(LdsRadius.md));
    final reduce = context.ldsReduceMotion;
    Widget button = AnimatedScale(
      scale: _holding && !reduce ? 0.97 : 1,
      duration: context.ldsDuration(LdsMotion.fast),
      curve: LdsMotion.standardCurve,
      child: Container(
        height: LdsSize.control,
        width: widget.expand ? double.infinity : null,
        clipBehavior: Clip.antiAlias,
        decoration: BoxDecoration(
          color: base,
          borderRadius: radius,
          boxShadow: _focused
              ? [
                  BoxShadow(color: c.bgCanvas, spreadRadius: 2),
                  BoxShadow(color: c.focus, spreadRadius: 4),
                ]
              : null,
        ),
        child: Stack(
          // Centers the label row in the button height; the fill below is
          // positioned and unaffected.
          alignment: AlignmentDirectional.center,
          children: [
            Positioned.fill(
              child: AnimatedBuilder(
                animation: _fill,
                builder: (context, _) => FractionallySizedBox(
                  alignment: AlignmentDirectional.centerStart,
                  widthFactor: _fill.value,
                  child:
                      ColoredBox(color: c.textStrong.withValues(alpha: 0.18)),
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 18),
              child: Row(
                mainAxisSize:
                    widget.expand ? MainAxisSize.max : MainAxisSize.min,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  if (widget.icon != null) ...[
                    LdsIcon(widget.icon!, size: 19, color: fg),
                    const SizedBox(width: 8),
                  ],
                  Flexible(
                    child: Text(
                      widget.label,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: LdsType.bodyStrong
                          .copyWith(color: fg, fontWeight: FontWeight.w600),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
    button = Opacity(opacity: _enabled ? 1 : 0.38, child: button);
    return Semantics(
      button: true,
      enabled: _enabled,
      label: widget.label,
      onLongPress: _enabled ? widget.onConfirmed : null,
      excludeSemantics: true,
      child: Focus(
        focusNode: _focus,
        canRequestFocus: _enabled,
        onKeyEvent: _onKey,
        onFocusChange: (f) {
          setState(() => _focused = f &&
              FocusManager.instance.highlightMode ==
                  FocusHighlightMode.traditional);
          if (!f) _cancel();
        },
        child: MouseRegion(
          cursor:
              _enabled ? SystemMouseCursors.click : SystemMouseCursors.basic,
          child: Listener(
            onPointerDown: (_) => _start(),
            onPointerUp: (_) => _cancel(),
            onPointerCancel: (_) => _cancel(),
            child: button,
          ),
        ),
      ),
    );
  }
}
