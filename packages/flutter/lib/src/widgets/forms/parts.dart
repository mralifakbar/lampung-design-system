// Shared building blocks for the forms widgets. Not exported from the
// package: the public widgets in this folder are the API.
import 'dart:math' as math;
import 'dart:ui' show PathMetric;

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../icon.dart';
import '../pressable.dart';

/// Label row, control and help or error text, with the same look as
/// `LdsTextField`.
class LdsFormsFieldShell extends StatelessWidget {
  /// Creates a field shell.
  const LdsFormsFieldShell({
    super.key,
    required this.child,
    this.label,
    this.optionalText,
    this.trailing,
    this.help,
    this.error,
    this.merge = false,
  });

  /// The control.
  final Widget child;

  /// Visible label above the control.
  final String? label;

  /// Lighter text after the label, for example "(opsional)".
  final String? optionalText;

  /// Right side of the label row, for example a character counter.
  final Widget? trailing;

  /// Help text under the control.
  final String? help;

  /// Error text; replaces [help] and is announced.
  final String? error;

  /// Merge everything into one semantics node.
  final bool merge;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final invalid = error != null;
    final message = error ?? help;
    final Widget result = Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      mainAxisSize: MainAxisSize.min,
      children: [
        if (label != null || trailing != null) ...[
          Row(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Expanded(
                child: Text.rich(
                  TextSpan(
                    text: label ?? '',
                    children: [
                      if (optionalText != null)
                        TextSpan(
                          text: ' $optionalText',
                          style: TextStyle(
                            fontWeight: FontWeight.w400,
                            color: c.textMuted,
                          ),
                        ),
                    ],
                  ),
                  style: LdsType.caption.copyWith(
                    color: c.textStrong,
                    letterSpacing: 0,
                  ),
                ),
              ),
              if (trailing != null) ...[const SizedBox(width: 8), trailing!],
            ],
          ),
          const SizedBox(height: 8),
        ],
        child,
        if (message != null) ...[
          const SizedBox(height: 8),
          LdsFormsMessage(message, error: invalid),
        ],
      ],
    );
    return merge ? MergeSemantics(child: result) : result;
  }
}

/// Help or error line under a control.
class LdsFormsMessage extends StatelessWidget {
  /// Creates a message line.
  const LdsFormsMessage(this.text, {super.key, this.error = false});

  /// The text.
  final String text;

  /// Danger color, icon and live region.
  final bool error;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    return Semantics(
      liveRegion: error,
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (error) ...[
            Padding(
              padding: const EdgeInsets.only(top: 1),
              child: LdsIcon('error', size: 15, color: c.dangerText),
            ),
            const SizedBox(width: 5),
          ],
          Expanded(
            child: Text(
              text,
              style: LdsType.footnote.copyWith(
                color: error ? c.dangerText : c.textSubtle,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

/// The `.control` box: 1 px edge, accent edge and halo when [active],
/// danger edge when [invalid], fill when disabled.
class LdsFormsControlBox extends StatefulWidget {
  /// Creates a control box.
  const LdsFormsControlBox({
    super.key,
    required this.child,
    this.active = false,
    this.invalid = false,
    this.enabled = true,
    this.padding = const EdgeInsets.symmetric(horizontal: 14),
    this.minHeight = LdsSize.control,
  });

  /// Contents.
  final Widget child;

  /// Focused or open.
  final bool active;

  /// Shows the danger edge.
  final bool invalid;

  /// Whether the control accepts input.
  final bool enabled;

  /// Inner padding.
  final EdgeInsetsGeometry padding;

  /// Minimum height.
  final double minHeight;

  @override
  State<LdsFormsControlBox> createState() => _LdsFormsControlBoxState();
}

class _LdsFormsControlBoxState extends State<LdsFormsControlBox> {
  bool _hovered = false;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final Color edge;
    double edgeWidth = 1;
    List<BoxShadow>? halo;
    if (!widget.enabled) {
      edge = c.line;
    } else if (widget.invalid) {
      edge = c.danger;
      edgeWidth = 1.5;
      if (widget.active) {
        halo = [BoxShadow(color: c.danger.withAlpha(41), spreadRadius: 4)];
      }
    } else if (widget.active) {
      edge = c.accent;
      edgeWidth = 1.5;
      halo = [BoxShadow(color: c.accentRing, spreadRadius: 4)];
    } else {
      edge = _hovered ? c.textSubtle : c.lineControl;
    }
    return MouseRegion(
      onEnter: (_) => setState(() => _hovered = true),
      onExit: (_) => setState(() => _hovered = false),
      child: AnimatedContainer(
        duration: context.ldsDuration(LdsMotion.fast),
        curve: LdsMotion.standardCurve,
        constraints: BoxConstraints(minHeight: widget.minHeight),
        padding: widget.padding,
        decoration: BoxDecoration(
          color: widget.enabled ? c.bgBase : c.bgFill,
          borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.md)),
          border: Border.all(color: edge, width: edgeWidth),
          boxShadow: halo,
        ),
        child: widget.child,
      ),
    );
  }
}

/// A layer anchored under (or over, when there is no room) its [anchor]:
/// a menu, a listbox or a calendar. Tapping outside or Escape dismisses it.
class LdsFormsPopover extends StatefulWidget {
  /// Creates an anchored popover.
  const LdsFormsPopover({
    super.key,
    required this.open,
    required this.onDismiss,
    required this.anchor,
    required this.builder,
    this.width,
    this.maxHeight = 320,
    this.padding = const EdgeInsets.all(6),
    this.alignEnd = false,
  });

  /// Whether the layer shows.
  final bool open;

  /// Called on a tap outside or Escape.
  final VoidCallback onDismiss;

  /// The control the layer hangs from.
  final Widget anchor;

  /// Builds the layer's contents.
  final WidgetBuilder builder;

  /// Layer width; null matches the anchor.
  final double? width;

  /// Maximum layer height.
  final double maxHeight;

  /// Inner padding.
  final EdgeInsetsGeometry padding;

  /// Align the layer's right edge with the anchor's.
  final bool alignEnd;

  @override
  State<LdsFormsPopover> createState() => _LdsFormsPopoverState();
}

class _LdsFormsPopoverState extends State<LdsFormsPopover>
    with SingleTickerProviderStateMixin {
  final OverlayPortalController _portal = OverlayPortalController();
  final LayerLink _link = LayerLink();
  final GlobalKey _anchorKey = GlobalKey();
  final Object _group = Object();
  late final AnimationController _anim;

  @override
  void initState() {
    super.initState();
    _anim = AnimationController(
      vsync: this,
      duration: LdsMotion.fast,
      reverseDuration: LdsMotion.exit,
      value: widget.open ? 1 : 0,
    )..addStatusListener((_) {
        if (mounted) setState(() {});
      });
    // The portal stays shown; the layer builds nothing while closed. This
    // avoids showing or hiding the portal during a build.
    _portal.show();
  }

  @override
  void didUpdateWidget(LdsFormsPopover oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.open == oldWidget.open) return;
    final reduce = context.ldsReduceMotion;
    if (reduce) {
      _anim.value = widget.open ? 1 : 0;
    } else if (widget.open) {
      _anim.forward();
    } else {
      _anim.reverse();
    }
  }

  @override
  void dispose() {
    _anim.dispose();
    super.dispose();
  }

  Widget _layer(BuildContext context) {
    if (!widget.open && _anim.isDismissed) return const SizedBox.shrink();
    final c = context.lds;
    final box = _anchorKey.currentContext?.findRenderObject() as RenderBox?;
    final anchorSize = box?.hasSize ?? false ? box!.size : Size.zero;
    var screen = MediaQuery.sizeOf(context);
    if (screen.isEmpty) {
      // A MediaQuery without a size (some test harnesses): use the view.
      final view = View.of(context);
      screen = view.physicalSize / view.devicePixelRatio;
    }
    var up = false;
    if (box != null && box.attached && box.hasSize) {
      final top = box.localToGlobal(Offset.zero).dy;
      final below = screen.height - top - anchorSize.height;
      up = below < math.min(widget.maxHeight, 240) + 16 && top > below;
    }
    final width = widget.width ?? anchorSize.width;
    final start = widget.alignEnd ? Alignment.topRight : Alignment.topLeft;
    final end = widget.alignEnd ? Alignment.bottomRight : Alignment.bottomLeft;
    final curved = CurvedAnimation(
      parent: _anim,
      curve: LdsMotion.enterCurve,
      reverseCurve: LdsMotion.exitCurve,
    );

    return Stack(
      children: [
        Positioned(
          left: 0,
          top: 0,
          child: CompositedTransformFollower(
            link: _link,
            showWhenUnlinked: false,
            targetAnchor: up ? start : end,
            followerAnchor: up ? end : start,
            offset: Offset(0, up ? -6 : 6),
            child: TapRegion(
              groupId: _group,
              onTapOutside: (_) => widget.onDismiss(),
              child: CallbackShortcuts(
                bindings: {
                  const SingleActivator(LogicalKeyboardKey.escape):
                      widget.onDismiss,
                },
                child: FadeTransition(
                  opacity: curved,
                  child: ScaleTransition(
                    scale: Tween<double>(begin: 0.96, end: 1).animate(curved),
                    alignment: up ? end : start,
                    child: Material(
                      type: MaterialType.transparency,
                      child: Container(
                        width: width > 0 ? width : null,
                        constraints: BoxConstraints(
                          maxHeight: widget.maxHeight,
                          maxWidth: screen.width - 24,
                        ),
                        padding: widget.padding,
                        decoration: BoxDecoration(
                          color: c.bgElevated,
                          borderRadius:
                              const BorderRadius.all(Radius.circular(14)),
                          border: Border.all(color: c.lineStrong, width: 0.5),
                          boxShadow: context.ldsShadows.lg,
                        ),
                        child: widget.builder(context),
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return CompositedTransformTarget(
      link: _link,
      child: OverlayPortal(
        controller: _portal,
        overlayChildBuilder: _layer,
        child: TapRegion(
          groupId: _group,
          child: KeyedSubtree(key: _anchorKey, child: widget.anchor),
        ),
      ),
    );
  }
}

/// One row of a listbox or preset list inside an [LdsFormsPopover].
class LdsFormsMenuItem extends StatelessWidget {
  /// Creates a menu row.
  const LdsFormsMenuItem({
    super.key,
    required this.label,
    required this.onPressed,
    this.description,
    this.selected = false,
    this.highlighted = false,
    this.autofocus = false,
    this.focusNode,
    this.showCheck = true,
  });

  /// Visible text.
  final String label;

  /// Second line.
  final String? description;

  /// Called when chosen.
  final VoidCallback? onPressed;

  /// The current value.
  final bool selected;

  /// Active from the keyboard while focus stays elsewhere (combobox).
  final bool highlighted;

  /// Take focus when built.
  final bool autofocus;

  /// Focus node.
  final FocusNode? focusNode;

  /// Show a check on the selected row.
  final bool showCheck;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    const radius = BorderRadius.all(Radius.circular(9));
    return LdsPressable(
      onPressed: onPressed,
      pressedScale: 1,
      borderRadius: radius,
      minSize: const Size(0, LdsSize.touchMin),
      selected: selected,
      autofocus: autofocus,
      focusNode: focusNode,
      builder: (context, state) {
        final active = state.focused || highlighted;
        final bg = active
            ? c.accentTint
            : state.hovered || state.pressed
                ? c.bgTintStrong
                : selected
                    ? c.bgFill
                    : Colors.transparent;
        final fg = active ? c.accentText : c.textStrong;
        return Container(
          constraints: const BoxConstraints(minHeight: LdsSize.touchMin),
          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
          decoration: BoxDecoration(color: bg, borderRadius: radius),
          child: Row(
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      label,
                      style: LdsType.subhead.copyWith(
                        color: fg,
                        fontWeight:
                            selected ? FontWeight.w500 : FontWeight.w400,
                      ),
                    ),
                    if (description != null)
                      Text(
                        description!,
                        style: LdsType.caption.copyWith(color: c.textMuted),
                      ),
                  ],
                ),
              ),
              if (selected && showCheck) ...[
                const SizedBox(width: 8),
                LdsIcon('check', size: 18, color: c.accentText),
              ],
            ],
          ),
        );
      },
    );
  }
}

/// Shakes its child once each time [trigger] changes (a refused value).
class LdsFormsShake extends StatefulWidget {
  /// Creates a shake wrapper.
  const LdsFormsShake({super.key, required this.trigger, required this.child});

  /// Change this to shake once.
  final int trigger;

  /// The shaken widget.
  final Widget child;

  @override
  State<LdsFormsShake> createState() => _LdsFormsShakeState();
}

class _LdsFormsShakeState extends State<LdsFormsShake>
    with SingleTickerProviderStateMixin {
  late final AnimationController _ctl = AnimationController(
    vsync: this,
    duration: const Duration(milliseconds: 360),
  );

  static const _stops = [0.0, -6.0, 5.0, -3.0, 2.0, 0.0];

  @override
  void didUpdateWidget(LdsFormsShake oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.trigger != oldWidget.trigger && !context.ldsReduceMotion) {
      _ctl.forward(from: 0);
    }
  }

  @override
  void dispose() {
    _ctl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _ctl,
      builder: (context, child) {
        final t = LdsMotion.standardCurve.transform(_ctl.value) * 5;
        final i = t.floor().clamp(0, 4);
        final dx = _stops[i] + (_stops[i + 1] - _stops[i]) * (t - i);
        return Transform.translate(offset: Offset(dx, 0), child: child);
      },
      child: widget.child,
    );
  }
}

/// Draws a tick (or a dash) up to [progress], like a stroke being drawn.
class LdsFormsTickPainter extends CustomPainter {
  /// Creates a tick painter.
  LdsFormsTickPainter({
    required this.progress,
    required this.color,
    this.dash = false,
    this.strokeWidth = 2.4,
  });

  /// 0 to 1, how much of the stroke shows.
  final double progress;

  /// Stroke color.
  final Color color;

  /// Draw a dash (mixed state) instead of a tick.
  final bool dash;

  /// Stroke width.
  final double strokeWidth;

  @override
  void paint(Canvas canvas, Size size) {
    if (progress <= 0) return;
    final s = size.width / 14;
    final path = Path();
    if (dash) {
      path
        ..moveTo(3 * s, 7 * s)
        ..lineTo(11 * s, 7 * s);
    } else {
      path
        ..moveTo(2.5 * s, 7.5 * s)
        ..lineTo(5.8 * s, 10.6 * s)
        ..lineTo(11.5 * s, 3.8 * s);
    }
    final paint = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = strokeWidth
      ..strokeCap = StrokeCap.round
      ..strokeJoin = StrokeJoin.round
      ..color = color;
    final metrics = path.computeMetrics().toList();
    final total = metrics.fold<double>(0, (a, PathMetric m) => a + m.length);
    var left = total * progress.clamp(0.0, 1.0);
    for (final m in metrics) {
      if (left <= 0) break;
      canvas.drawPath(m.extractPath(0, math.min(left, m.length)), paint);
      left -= m.length;
    }
  }

  @override
  bool shouldRepaint(LdsFormsTickPainter oldDelegate) =>
      oldDelegate.progress != progress ||
      oldDelegate.color != color ||
      oldDelegate.dash != dash;
}

/// Indonesian month names.
const List<String> ldsFormsMonths = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

/// Short Indonesian weekday names, Monday first.
const List<String> ldsFormsWeekdays = [
  'Sen',
  'Sel',
  'Rab',
  'Kam',
  'Jum',
  'Sab',
  'Min',
];

String _two(int v) => v.toString().padLeft(2, '0');

/// Formats [d] as dd/mm/yyyy.
String ldsFormsFormatDate(DateTime d) =>
    '${_two(d.day)}/${_two(d.month)}/${d.year}';

/// Formats [d] as "17 Nov 2026".
String ldsFormsShortDate(DateTime d) =>
    '${d.day} ${ldsFormsMonths[d.month - 1].substring(0, 3)} ${d.year}';

/// Parses dd/mm/yyyy (or with - or .); null when it is not a real date.
DateTime? ldsFormsParseDate(String text) {
  final m =
      RegExp(r'^\s*(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})\s*$').firstMatch(text);
  if (m == null) return null;
  final d = int.parse(m[1]!), mo = int.parse(m[2]!), y = int.parse(m[3]!);
  final date = DateTime(y, mo, d);
  if (date.day != d || date.month != mo) return null;
  return date;
}

/// Same calendar day.
bool ldsFormsSameDay(DateTime? a, DateTime? b) =>
    a != null &&
    b != null &&
    a.year == b.year &&
    a.month == b.month &&
    a.day == b.day;

/// [d] without its time.
DateTime ldsFormsDay(DateTime d) => DateTime(d.year, d.month, d.day);

/// The slider skin: a 4 px track filled in the accent up to a 28 px white
/// thumb, with a focus ring around the thumb while it is active.
SliderThemeData ldsFormsSliderTheme(BuildContext context) {
  final c = context.lds;
  final shadows = context.ldsShadows.thumb;
  final thumb = _LdsThumbShape(c.textOnAccent, shadows);
  return SliderThemeData(
    trackHeight: 4,
    activeTrackColor: c.accent,
    inactiveTrackColor: c.bgSwitchOff,
    disabledActiveTrackColor: c.textFaint,
    disabledInactiveTrackColor: c.bgSwitchOff,
    thumbColor: c.textOnAccent,
    overlayColor: c.focus,
    trackShape: const RoundedRectSliderTrackShape(),
    rangeTrackShape: const RoundedRectRangeSliderTrackShape(),
    thumbShape: thumb,
    rangeThumbShape: _LdsRangeThumbShape(thumb),
    overlayShape: const _LdsRingShape(),
    tickMarkShape: SliderTickMarkShape.noTickMark,
    rangeTickMarkShape: const RoundRangeSliderTickMarkShape(tickMarkRadius: 0),
    showValueIndicator: ShowValueIndicator.never,
  );
}

class _LdsThumbShape extends SliderComponentShape {
  const _LdsThumbShape(this.color, this.shadows);

  final Color color;
  final List<BoxShadow> shadows;

  @override
  Size getPreferredSize(bool isEnabled, bool isDiscrete) =>
      const Size.square(28);

  void draw(Canvas canvas, Offset center, double activation, bool enabled) {
    final r = 14 * (1 + 0.1 * activation);
    for (final s in shadows) {
      canvas.drawCircle(center + s.offset, r + s.spreadRadius, s.toPaint());
    }
    canvas.drawCircle(
      center,
      r,
      Paint()..color = enabled ? color : color.withAlpha(200),
    );
  }

  @override
  void paint(
    PaintingContext context,
    Offset center, {
    required Animation<double> activationAnimation,
    required Animation<double> enableAnimation,
    required bool isDiscrete,
    required TextPainter labelPainter,
    required RenderBox parentBox,
    required SliderThemeData sliderTheme,
    required TextDirection textDirection,
    required double value,
    required double textScaleFactor,
    required Size sizeWithOverflow,
  }) {
    draw(context.canvas, center, activationAnimation.value,
        enableAnimation.value > 0.5);
  }
}

class _LdsRangeThumbShape extends RangeSliderThumbShape {
  const _LdsRangeThumbShape(this.thumb);

  final _LdsThumbShape thumb;

  @override
  Size getPreferredSize(bool isEnabled, bool isDiscrete) =>
      const Size.square(28);

  @override
  void paint(
    PaintingContext context,
    Offset center, {
    required Animation<double> activationAnimation,
    required Animation<double> enableAnimation,
    bool isDiscrete = false,
    bool isEnabled = false,
    bool? isOnTop,
    TextDirection? textDirection,
    required SliderThemeData sliderTheme,
    Thumb? thumb,
    bool? isPressed,
  }) {
    this.thumb.draw(context.canvas, center, (isPressed ?? false) ? 1 : 0,
        enableAnimation.value > 0.5);
  }
}

/// Paints the 2 px focus ring, 3 px away from the thumb, while the thumb is
/// hovered, focused or dragged; its size keeps a 44 px tall hit area.
class _LdsRingShape extends SliderComponentShape {
  const _LdsRingShape();

  @override
  Size getPreferredSize(bool isEnabled, bool isDiscrete) =>
      const Size.square(LdsSize.touchMin);

  @override
  void paint(
    PaintingContext context,
    Offset center, {
    required Animation<double> activationAnimation,
    required Animation<double> enableAnimation,
    required bool isDiscrete,
    required TextPainter labelPainter,
    required RenderBox parentBox,
    required SliderThemeData sliderTheme,
    required TextDirection textDirection,
    required double value,
    required double textScaleFactor,
    required Size sizeWithOverflow,
  }) {
    final t = activationAnimation.value;
    if (t <= 0) return;
    final color = sliderTheme.overlayColor!;
    context.canvas.drawCircle(
      center,
      18,
      Paint()
        ..style = PaintingStyle.stroke
        ..strokeWidth = 2
        ..color = color.withAlpha((255 * t).round()),
    );
  }
}
