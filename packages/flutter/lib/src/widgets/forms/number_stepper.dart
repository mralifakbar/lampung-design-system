import 'package:flutter/services.dart';
import 'package:material_ui/material_ui.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../icon.dart';
import '../pressable.dart';

/// Minus and plus buttons around a small whole number whose digits roll to
/// the new value: Jumlah anggota keluarga, Jumlah salinan.
///
/// For counts people change by one or two inside a known range. Arrow Up
/// and Down change it while either button has focus.
class LdsNumberStepper extends StatefulWidget {
  /// Creates a number stepper.
  const LdsNumberStepper({
    super.key,
    required this.value,
    required this.onChanged,
    required this.semanticLabel,
    this.min = 0,
    this.max = 99,
    this.step = 1,
    this.decreaseLabel = 'Kurangi',
    this.increaseLabel = 'Tambah',
  });

  /// The current number.
  final int value;

  /// Called with the new number. Null disables it.
  final ValueChanged<int>? onChanged;

  /// What is counted, for screen readers ("Jumlah anggota keluarga").
  final String semanticLabel;

  /// Lowest value.
  final int min;

  /// Highest value.
  final int max;

  /// Change per press.
  final int step;

  /// Minus button label.
  final String decreaseLabel;

  /// Plus button label.
  final String increaseLabel;

  @override
  State<LdsNumberStepper> createState() => _LdsNumberStepperState();
}

class _LdsNumberStepperState extends State<LdsNumberStepper> {
  bool _up = true;

  @override
  void didUpdateWidget(LdsNumberStepper oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.value != widget.value) _up = widget.value > oldWidget.value;
  }

  void _change(int delta) {
    final next = (widget.value + delta).clamp(widget.min, widget.max);
    if (next != widget.value) widget.onChanged?.call(next);
  }

  Widget _button(String icon, String label, int delta, bool enabled) {
    final c = context.lds;
    return LdsPressable(
      onPressed: enabled ? () => _change(delta) : null,
      pressedScale: 0.88,
      semanticLabel: label,
      excludeChildSemantics: true,
      builder: (context, state) => AnimatedContainer(
        duration: context.ldsDuration(LdsMotion.fast),
        width: 44,
        height: 44,
        alignment: Alignment.center,
        decoration: BoxDecoration(
          color: state.hovered ? c.bgTint : Colors.transparent,
          borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.md)),
        ),
        child: LdsIcon(icon, color: enabled ? c.textStrong : c.textFaint),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final enabled = widget.onChanged != null;
    final canDown = enabled && widget.value > widget.min;
    final canUp = enabled && widget.value < widget.max;
    final reduce = context.ldsReduceMotion;

    final number = ClipRect(
      child: SizedBox(
        height: 22,
        child: AnimatedSwitcher(
          duration: context.ldsDuration(LdsMotion.smoothSpringDuration),
          switchInCurve: LdsSpringCurve.smooth,
          switchOutCurve: LdsMotion.exitCurve,
          transitionBuilder: (child, animation) {
            if (reduce) return child;
            final incoming = child.key == ValueKey(widget.value);
            final from = (incoming == _up) ? 1.0 : -1.0;
            return SlideTransition(
              position: Tween<Offset>(
                begin: Offset(0, incoming ? from : -from),
                end: Offset.zero,
              ).animate(animation),
              child: child,
            );
          },
          child: Text(
            '${widget.value}',
            key: ValueKey(widget.value),
            style: LdsType.bodyStrong.copyWith(
              fontSize: 16,
              height: 22 / 16,
              color: c.textStrong,
              fontFeatures: const [FontFeature.tabularFigures()],
            ),
          ),
        ),
      ),
    );

    return Semantics(
      container: true,
      label: widget.semanticLabel,
      value: '${widget.value}',
      increasedValue: canUp ? '${widget.value + widget.step}' : null,
      decreasedValue: canDown ? '${widget.value - widget.step}' : null,
      onIncrease: canUp ? () => _change(widget.step) : null,
      onDecrease: canDown ? () => _change(-widget.step) : null,
      child: CallbackShortcuts(
        bindings: {
          const SingleActivator(LogicalKeyboardKey.arrowUp): () =>
              _change(widget.step),
          const SingleActivator(LogicalKeyboardKey.arrowDown): () =>
              _change(-widget.step),
        },
        child: Container(
          height: 44,
          decoration: BoxDecoration(
            color: c.bgBase,
            borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.md)),
          ),
          foregroundDecoration: BoxDecoration(
            borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.md)),
            border: Border.all(color: c.lineControl),
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              _button('remove', widget.decreaseLabel, -widget.step, canDown),
              ConstrainedBox(
                constraints: const BoxConstraints(minWidth: 48),
                child: Center(child: ExcludeSemantics(child: number)),
              ),
              _button('add', widget.increaseLabel, widget.step, canUp),
            ],
          ),
        ),
      ),
    );
  }
}
