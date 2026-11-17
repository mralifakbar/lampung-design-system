import 'dart:async';
import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../icon.dart';

/// A track with a knob you drag to the end to confirm a costly step on a
/// touch screen (kirim nilai, bayar retribusi).
///
/// The knob follows the finger 1:1, resists past the ends, and commits past
/// 85 % of the way; short of that it springs back. The knob is a button:
/// Tab reaches it and Enter confirms at once.
class LdsSlideToConfirm extends StatefulWidget {
  /// Creates a slide-to-confirm track.
  const LdsSlideToConfirm({
    super.key,
    required this.label,
    required this.knobLabel,
    required this.onConfirmed,
    this.doneLabel,
    this.done = false,
  });

  /// The instruction ("Geser untuk mengirim nilai").
  final String label;

  /// The knob's screen reader label; say that Enter confirms.
  final String knobLabel;

  /// Called once the slide commits. Null disables the track.
  final VoidCallback? onConfirmed;

  /// Result shown after confirming ("Nilai terkirim").
  final String? doneLabel;

  /// Start in the done state (for example after a rebuild).
  final bool done;

  @override
  State<LdsSlideToConfirm> createState() => _LdsSlideToConfirmState();
}

class _LdsSlideToConfirmState extends State<LdsSlideToConfirm>
    with SingleTickerProviderStateMixin {
  late final AnimationController _x =
      AnimationController.unbounded(vsync: this);
  late bool _done = widget.done;
  double _travel = 0;
  bool _dragging = false;
  bool _knobFocused = false;
  double _raw = 0;

  static const double _height = 56;
  static const double _knob = 48;

  @override
  void dispose() {
    _x.dispose();
    super.dispose();
  }

  double _rubber(double raw) {
    if (raw < 0) {
      final over = -raw;
      return -(over * 52 * 0.55 / (52 + 0.55 * over));
    }
    if (raw > _travel) {
      final over = raw - _travel;
      return _travel + over * 52 * 0.55 / (52 + 0.55 * over);
    }
    return raw;
  }

  void _commit() {
    if (_done || widget.onConfirmed == null) return;
    setState(() => _done = true);
    unawaited(HapticFeedback.mediumImpact());
    unawaited(_x.animateTo(
      _travel,
      duration: context.ldsDuration(LdsMotion.smooth),
      curve: LdsSpringCurve.smooth,
    ));
    widget.onConfirmed!();
  }

  void _onEnd(DragEndDetails d) {
    _dragging = false;
    final v = d.primaryVelocity ?? 0;
    final projected = _raw + v * 0.1;
    if (projected >= _travel * 0.85 && _raw > 0) {
      _commit();
    } else {
      unawaited(_x.animateTo(
        0,
        duration: context.ldsDuration(LdsMotion.momentum),
        curve: LdsSpringCurve.momentum,
      ));
    }
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final enabled = widget.onConfirmed != null && !_done;
    return LayoutBuilder(builder: (context, box) {
      final double width =
          math.min(340.0, box.maxWidth.isFinite ? box.maxWidth : 340.0);
      _travel = math.max(0, width - _height);
      if (_done && !_x.isAnimating && !_dragging) _x.value = _travel;
      return GestureDetector(
        excludeFromSemantics: true,
        onHorizontalDragStart: enabled
            ? (_) {
                _x.stop();
                _dragging = true;
                _raw = _x.value;
              }
            : null,
        onHorizontalDragUpdate: enabled
            ? (d) {
                _raw += d.primaryDelta ?? 0;
                _x.value = _rubber(_raw);
              }
            : null,
        onHorizontalDragEnd: enabled ? _onEnd : null,
        child: AnimatedContainer(
          duration: context.ldsDuration(LdsMotion.standard),
          width: width,
          height: _height,
          clipBehavior: Clip.antiAlias,
          decoration: BoxDecoration(
            color: _done ? c.successTint : c.bgRecessed,
            borderRadius: const BorderRadius.all(Radius.circular(_height / 2)),
          ),
          child: AnimatedBuilder(
            animation: _x,
            builder: (context, _) {
              final x = _x.value;
              final p = _travel == 0 ? 0.0 : (x / _travel).clamp(0.0, 1.0);
              return Stack(
                children: [
                  Positioned(
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: math.max(_height, x + _height),
                    child: AnimatedContainer(
                      duration: context.ldsDuration(LdsMotion.standard),
                      decoration: BoxDecoration(
                        color: _done ? c.successTint : c.accentTintStrong,
                        borderRadius: const BorderRadius.all(
                            Radius.circular(_height / 2)),
                      ),
                    ),
                  ),
                  Positioned.fill(
                    child: Semantics(
                      liveRegion: true,
                      child: AnimatedPadding(
                        duration: context.ldsDuration(LdsMotion.smooth),
                        curve: LdsSpringCurve.smooth,
                        padding: EdgeInsets.only(
                          left: _done ? 20 : 60,
                          right: _done ? 60 : 20,
                        ),
                        child: Center(
                          child: Opacity(
                            opacity: _done ? 1 : (1 - p / 0.6).clamp(0.0, 1.0),
                            child: Text(
                              _done
                                  ? (widget.doneLabel ?? widget.label)
                                  : widget.label,
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                              style: LdsType.bodyStrong.copyWith(
                                color: _done ? c.successText : c.textSubtle,
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                  Positioned(
                    left: 4 + x,
                    top: 4,
                    child: Semantics(
                      button: true,
                      enabled: enabled,
                      label: widget.knobLabel,
                      onTap: enabled ? _commit : null,
                      excludeSemantics: true,
                      child: Focus(
                        canRequestFocus: enabled,
                        onKeyEvent: (node, e) {
                          final k = e.logicalKey;
                          if (e is KeyDownEvent &&
                              (k == LogicalKeyboardKey.enter ||
                                  k == LogicalKeyboardKey.space)) {
                            _commit();
                            return KeyEventResult.handled;
                          }
                          return KeyEventResult.ignored;
                        },
                        onFocusChange: (f) => setState(() => _knobFocused = f),
                        child: AnimatedContainer(
                          duration: context.ldsDuration(LdsMotion.standard),
                          width: _knob,
                          height: _knob,
                          alignment: Alignment.center,
                          decoration: BoxDecoration(
                            color: _done ? c.success : c.accent,
                            shape: BoxShape.circle,
                            boxShadow: [
                              ...context.ldsShadows.sm,
                              if (_knobFocused &&
                                  FocusManager.instance.highlightMode ==
                                      FocusHighlightMode.traditional)
                                BoxShadow(color: c.focus, spreadRadius: 2),
                            ],
                          ),
                          child: LdsIcon(
                            _done ? 'check' : 'arrow_forward',
                            size: 22,
                            color: c.textOnAccent,
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
              );
            },
          ),
        ),
      );
    });
  }
}
