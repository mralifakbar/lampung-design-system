import 'dart:async';

import 'package:flutter/services.dart';
import 'package:material_ui/material_ui.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../button.dart';
import '../icon.dart';
import '../pressable.dart';
import 'shake.dart';

/// The face an [LdsConfirmInPlace] shows.
enum LdsConfirmFace {
  /// The action, in danger text on a danger tint.
  rest,

  /// The question with Cancel and the danger button.
  ask,

  /// A spinner and the verb while the work runs.
  busy,

  /// The result and Undo on a success tint.
  done,
}

/// A destructive action that asks, works and reports inside one pill: rest,
/// then "Hapus 3 berkas?", then Menghapus, then Terhapus with Undo.
///
/// The pill springs to fit each sentence, so nothing around it jumps. For
/// small actions that can be undone; use an alert dialog for the rest.
/// When [onConfirm] throws, the pill returns to rest and shakes; say why
/// next to it.
class LdsConfirmInPlace extends StatefulWidget {
  /// Creates a confirm-in-place pill.
  const LdsConfirmInPlace({
    super.key,
    required this.icon,
    required this.armLabel,
    required this.question,
    required this.confirmLabel,
    required this.busyLabel,
    required this.doneLabel,
    required this.onConfirm,
    this.cancelLabel = 'Cancel',
    this.undoLabel = 'Undo',
    this.onUndo,
    this.resetAfter = const Duration(seconds: 5),
  });

  /// Icon of the rest face.
  final String icon;

  /// The action with its object ("Hapus 3 berkas").
  final String armLabel;

  /// The question with its object ("Hapus 3 berkas?").
  final String question;

  /// The danger button ("Hapus").
  final String confirmLabel;

  /// The safe button.
  final String cancelLabel;

  /// The verb while working ("Menghapus").
  final String busyLabel;

  /// The result ("3 berkas terhapus").
  final String doneLabel;

  /// Label of the undo button.
  final String undoLabel;

  /// The work. The busy face lasts until it completes, at least 600 ms.
  final Future<void> Function() onConfirm;

  /// Restores what was removed. Without it no Undo shows.
  final VoidCallback? onUndo;

  /// How long the done face stays before returning to rest.
  final Duration resetAfter;

  @override
  State<LdsConfirmInPlace> createState() => _LdsConfirmInPlaceState();
}

class _LdsConfirmInPlaceState extends State<LdsConfirmInPlace> {
  LdsConfirmFace _face = LdsConfirmFace.rest;
  final LdsShakeController _shake = LdsShakeController();
  final FocusNode _arm = FocusNode(debugLabel: 'confirm arm');
  final FocusNode _cancel = FocusNode(debugLabel: 'confirm cancel');
  final FocusNode _undo = FocusNode(debugLabel: 'confirm undo');
  DateTime _armedAt = DateTime.fromMillisecondsSinceEpoch(0);
  Timer? _reset;

  @override
  void dispose() {
    _reset?.cancel();
    _shake.dispose();
    _arm.dispose();
    _cancel.dispose();
    _undo.dispose();
    super.dispose();
  }

  void _go(LdsConfirmFace face, [FocusNode? focus]) {
    if (!mounted) return;
    setState(() => _face = face);
    if (focus != null) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (mounted && focus.context != null) focus.requestFocus();
      });
    }
  }

  void _armIt() {
    _armedAt = DateTime.now();
    _go(LdsConfirmFace.ask, _cancel);
  }

  Future<void> _confirm() async {
    // Ignore a double click that armed and confirmed in one go.
    if (DateTime.now().difference(_armedAt).inMilliseconds < 280) return;
    _go(LdsConfirmFace.busy);
    try {
      await Future.wait<void>([
        widget.onConfirm(),
        Future<void>.delayed(const Duration(milliseconds: 600)),
      ]);
    } catch (_) {
      _go(LdsConfirmFace.rest, _arm);
      _shake.shake();
      return;
    }
    _go(LdsConfirmFace.done, widget.onUndo != null ? _undo : null);
    unawaited(HapticFeedback.lightImpact());
    _reset?.cancel();
    _reset = Timer(widget.resetAfter, () => _go(LdsConfirmFace.rest));
  }

  void _undoIt() {
    _reset?.cancel();
    widget.onUndo?.call();
    _go(LdsConfirmFace.rest, _arm);
  }

  Widget _faceFor(LdsColors c) {
    final text = LdsType.bodyStrong.copyWith(
      fontWeight: FontWeight.w600,
      letterSpacing: -0.15,
    );
    switch (_face) {
      case LdsConfirmFace.rest:
        return LdsPressable(
          key: const ValueKey<String>('rest'),
          focusNode: _arm,
          onPressed: _armIt,
          borderRadius: const BorderRadius.all(Radius.circular(22)),
          semanticLabel: widget.armLabel,
          excludeChildSemantics: true,
          builder: (context, state) => Padding(
            padding: const EdgeInsets.symmetric(horizontal: 18),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                LdsIcon(widget.icon, size: 19, color: c.dangerText),
                const SizedBox(width: 8),
                Text(
                  widget.armLabel,
                  style: text.copyWith(color: c.dangerText),
                ),
              ],
            ),
          ),
        );
      case LdsConfirmFace.ask:
        return CallbackShortcuts(
          key: const ValueKey<String>('ask'),
          bindings: <ShortcutActivator, VoidCallback>{
            const SingleActivator(LogicalKeyboardKey.escape): () =>
                _go(LdsConfirmFace.rest, _arm),
          },
          child: Padding(
            padding: const EdgeInsetsDirectional.only(start: 18, end: 4),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  widget.question,
                  style: text.copyWith(color: c.textStrong),
                ),
                const SizedBox(width: 6),
                LdsButton(
                  label: widget.cancelLabel,
                  variant: LdsButtonVariant.plain,
                  size: LdsButtonSize.md,
                  focusNode: _cancel,
                  onPressed: () => _go(LdsConfirmFace.rest, _arm),
                ),
                const SizedBox(width: 4),
                LdsButton(
                  label: widget.confirmLabel,
                  variant: LdsButtonVariant.danger,
                  size: LdsButtonSize.md,
                  onPressed: _confirm,
                ),
              ],
            ),
          ),
        );
      case LdsConfirmFace.busy:
        return Semantics(
          key: const ValueKey<String>('busy'),
          liveRegion: true,
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 18),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                SizedBox.square(
                  dimension: 16,
                  child: CircularProgressIndicator(
                    strokeWidth: 2,
                    color: c.textSubtle,
                    backgroundColor: Colors.transparent,
                  ),
                ),
                const SizedBox(width: 8),
                Text(
                  widget.busyLabel,
                  style: text.copyWith(color: c.textSubtle),
                ),
              ],
            ),
          ),
        );
      case LdsConfirmFace.done:
        return Semantics(
          key: const ValueKey<String>('done'),
          liveRegion: true,
          child: Padding(
            padding: EdgeInsetsDirectional.only(
              start: 18,
              end: widget.onUndo != null ? 4 : 18,
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                LdsIcon(
                  'check_circle',
                  size: 19,
                  fill: true,
                  color: c.successText,
                ),
                const SizedBox(width: 8),
                Text(
                  widget.doneLabel,
                  style: text.copyWith(color: c.successText),
                ),
                if (widget.onUndo != null) ...[
                  const SizedBox(width: 4),
                  LdsButton(
                    label: widget.undoLabel,
                    variant: LdsButtonVariant.plain,
                    size: LdsButtonSize.md,
                    focusNode: _undo,
                    onPressed: _undoIt,
                  ),
                ],
              ],
            ),
          ),
        );
    }
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final reduce = context.ldsReduceMotion;
    final bg = switch (_face) {
      LdsConfirmFace.rest => c.dangerTint,
      LdsConfirmFace.ask || LdsConfirmFace.busy => c.bgBase,
      LdsConfirmFace.done => c.successTint,
    };
    final ringed = _face == LdsConfirmFace.ask || _face == LdsConfirmFace.busy;
    return LdsShake(
      controller: _shake,
      child: AnimatedContainer(
        duration: context.ldsDuration(LdsMotion.standard),
        height: 44,
        decoration: BoxDecoration(
          color: bg,
          borderRadius: const BorderRadius.all(Radius.circular(22)),
          border: ringed ? Border.all(color: c.lineStrong) : null,
          boxShadow: ringed ? context.ldsShadows.xs : null,
        ),
        clipBehavior: Clip.antiAlias,
        child: AnimatedSize(
          duration: reduce ? LdsMotion.instant : LdsMotion.snappy,
          curve: reduce ? Curves.linear : LdsSpringCurve.snappy,
          child: AnimatedSwitcher(
            duration: reduce
                ? Duration.zero
                : const Duration(milliseconds: 200),
            reverseDuration: reduce ? Duration.zero : LdsMotion.instant,
            switchInCurve: LdsMotion.enterCurve,
            switchOutCurve: LdsMotion.exitCurve,
            layoutBuilder: (current, previous) => Stack(
              alignment: Alignment.center,
              children: [
                ...previous.map((w) => Positioned(child: w)),
                ?current,
              ],
            ),
            child: _faceFor(c),
          ),
        ),
      ),
    );
  }
}
