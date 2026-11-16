import 'package:flutter/material.dart';

import '../motion.dart';
import '../theme.dart';
import '../tokens.g.dart';
import 'icon.dart';
import 'pressable.dart';

/// Visual weight of an [LdsButton].
enum LdsButtonVariant {
  /// The main action. One per view.
  primary,

  /// The alternative action.
  secondary,

  /// A quieter positive action.
  tinted,

  /// A neutral action on a filled surface.
  gray,

  /// Inline and tertiary actions.
  plain,

  /// Destructive action, inside a confirmation.
  danger,
}

/// Height of an [LdsButton]. The hit area is never under 44 by 44.
enum LdsButtonSize {
  /// 28 px tall, for dense toolbars and table rows.
  sm(LdsSize.controlSm, 10, 13, 15, LdsRadius.sm),

  /// 36 px tall.
  md(LdsSize.controlMd, 14, 14, 17, 10),

  /// 44 px tall, the default.
  regular(LdsSize.control, 18, 15, 19, LdsRadius.md),

  /// 52 px tall, for the one action of a phone screen.
  lg(LdsSize.controlLg, 24, 16, 19, 14);

  const LdsButtonSize(
      this.height, this.padding, this.fontSize, this.iconSize, this.radius);

  /// Visual height.
  final double height;

  /// Horizontal padding.
  final double padding;

  /// Label size.
  final double fontSize;

  /// Leading icon size.
  final double iconSize;

  /// Corner radius.
  final double radius;
}

/// The control people press to make something happen: save, send, start.
///
/// The label names the outcome ("Kirim laporan", not "Submit"). While
/// [loading] is true the label fades out but keeps its width and a spinner
/// takes its place; presses are ignored.
class LdsButton extends StatelessWidget {
  /// Creates a button.
  const LdsButton({
    super.key,
    required this.label,
    required this.onPressed,
    this.variant = LdsButtonVariant.primary,
    this.size = LdsButtonSize.regular,
    this.icon,
    this.loading = false,
    this.expand = false,
    this.semanticLabel,
    this.loadingLabel = 'Loading',
    this.focusNode,
    this.autofocus = false,
  });

  /// Visible text.
  final String label;

  /// Called when pressed. Null disables the button.
  final VoidCallback? onPressed;

  /// Visual weight.
  final LdsButtonVariant variant;

  /// Height and padding.
  final LdsButtonSize size;

  /// Optional leading icon (ligature name, see [LdsIcon]).
  final String? icon;

  /// Shows a spinner in place of the label and ignores presses.
  final bool loading;

  /// Fill the available width.
  final bool expand;

  /// Overrides [label] for screen readers.
  final String? semanticLabel;

  /// Announced with the label while [loading].
  final String loadingLabel;

  /// Focus node.
  final FocusNode? focusNode;

  /// Take focus when first built.
  final bool autofocus;

  bool get _enabled => onPressed != null && !loading;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final radius = BorderRadius.all(Radius.circular(size.radius));
    final a11yLabel = loading
        ? '${semanticLabel ?? label}, $loadingLabel'
        : (semanticLabel ?? label);

    Widget button = LdsPressable(
      onPressed: _enabled ? onPressed : null,
      borderRadius: radius,
      semanticLabel: a11yLabel,
      excludeChildSemantics: true,
      focusNode: focusNode,
      autofocus: autofocus,
      builder: (context, state) {
        final s = _style(c, state);
        final fade = context.ldsDuration(LdsMotion.fast);
        final labelRow = Row(
          mainAxisSize: MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            if (icon != null) ...[
              LdsIcon(icon!, size: size.iconSize, color: s.foreground),
              SizedBox(width: size == LdsButtonSize.sm ? 5 : 8),
            ],
            Flexible(
              child: Text(
                label,
                maxLines: 2,
                textAlign: TextAlign.center,
                overflow: TextOverflow.ellipsis,
                style: TextStyle(
                  fontFamily: LdsType.family,
                  fontSize: size.fontSize,
                  height: 20 / 15,
                  fontWeight: size == LdsButtonSize.sm
                      ? FontWeight.w500
                      : FontWeight.w600,
                  letterSpacing: -0.01 * size.fontSize,
                  color: s.foreground,
                ),
              ),
            ),
          ],
        );
        return AnimatedOpacity(
          opacity: onPressed == null ? 0.38 : 1,
          duration: fade,
          child: AnimatedContainer(
            duration: fade,
            curve: LdsMotion.standardCurve,
            width: expand ? double.infinity : null,
            constraints: BoxConstraints(minHeight: size.height),
            padding: EdgeInsets.symmetric(
              horizontal: variant == LdsButtonVariant.plain
                  ? 10
                  : size.padding,
              vertical: 4,
            ),
            decoration: BoxDecoration(
              color: s.background,
              gradient: s.gradient,
              borderRadius: radius,
              border: s.border,
              boxShadow: s.ring,
            ),
            child: Stack(
              alignment: Alignment.center,
              children: [
                AnimatedOpacity(
                  opacity: loading ? 0 : 1,
                  duration: fade,
                  child: AnimatedScale(
                    scale: loading ? 0.96 : 1,
                    duration: context.ldsDuration(LdsMotion.standard),
                    curve: LdsMotion.enterCurve,
                    child: labelRow,
                  ),
                ),
                if (loading)
                  SizedBox.square(
                    dimension: 18,
                    child: CircularProgressIndicator(
                      strokeWidth: 2,
                      color: s.foreground,
                      backgroundColor: Colors.transparent,
                    ),
                  ),
              ],
            ),
          ),
        );
      },
    );

    if (expand) button = SizedBox(width: double.infinity, child: button);
    return button;
  }

  _ButtonColors _style(LdsColors c, LdsPressState state) {
    final hover = state.hovered;
    final pressed = state.pressed;
    switch (variant) {
      case LdsButtonVariant.primary:
      case LdsButtonVariant.danger:
        final isPrimary = variant == LdsButtonVariant.primary;
        final base = isPrimary ? c.accent : c.danger;
        final tone = pressed
            ? (isPrimary ? c.accentPressed : Color.lerp(base, Colors.black, 0.12)!)
            : hover
                ? (isPrimary ? c.accentHover : Color.lerp(base, Colors.black, 0.06)!)
                : base;
        final edge = Color.lerp(tone, Colors.black, 0.14)!;
        return _ButtonColors(
          foreground: isPrimary ? c.textOnAccent : Colors.white,
          background: tone,
          gradient: pressed
              ? null
              : LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  stops: const [0, 0.7],
                  colors: [Color.lerp(tone, Colors.white, 0.12)!, tone],
                ),
          ring: [BoxShadow(color: edge, spreadRadius: 1)],
        );
      case LdsButtonVariant.secondary:
        return _ButtonColors(
          foreground: c.textStrong,
          background: pressed
              ? c.bgRecessed
              : hover
                  ? c.bgFill
                  : c.bgBase,
          border: Border.all(color: c.lineStrong),
        );
      case LdsButtonVariant.tinted:
        return _ButtonColors(
          foreground: c.accentText,
          background: hover || pressed ? c.accentTintStrong : c.accentTint,
        );
      case LdsButtonVariant.gray:
        return _ButtonColors(
          foreground: c.textStrong,
          background: hover || pressed
              ? Color.alphaBlend(c.bgTintStrong, c.bgRecessed)
              : c.bgRecessed,
        );
      case LdsButtonVariant.plain:
        return _ButtonColors(
          foreground: c.accentText,
          background: hover || pressed ? c.bgTintStrong : Colors.transparent,
        );
    }
  }
}

class _ButtonColors {
  const _ButtonColors({
    required this.foreground,
    required this.background,
    this.gradient,
    this.border,
    this.ring,
  });

  final Color foreground;
  final Color background;
  final Gradient? gradient;
  final BoxBorder? border;
  final List<BoxShadow>? ring;
}

/// Look of an [LdsIconButton].
enum LdsIconButtonVariant {
  /// No fill until pressed. For toolbars and nav bars.
  plain,

  /// A recessed circle, 36 px inside a 44 px hit area.
  filled,

  /// The accent circle, for the one floating action.
  accent,
}

/// An icon-only button for well-known actions: close, share, more options.
///
/// [semanticLabel] is required: it is read by screen readers and shown as a
/// tooltip.
class LdsIconButton extends StatelessWidget {
  /// Creates an icon button.
  const LdsIconButton({
    super.key,
    required this.icon,
    required this.semanticLabel,
    required this.onPressed,
    this.variant = LdsIconButtonVariant.plain,
    this.fill = false,
    this.color,
    this.showTooltip = true,
    this.selected,
  });

  /// Ligature name, see [LdsIcon].
  final String icon;

  /// What the button does, for screen readers and the tooltip.
  final String semanticLabel;

  /// Called when pressed. Null disables the button.
  final VoidCallback? onPressed;

  /// Visual style.
  final LdsIconButtonVariant variant;

  /// Use the filled icon set.
  final bool fill;

  /// Icon color override.
  final Color? color;

  /// Show [semanticLabel] as a tooltip.
  final bool showTooltip;

  /// For toggle buttons (bookmark, like): the on state.
  final bool? selected;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final filled = variant == LdsIconButtonVariant.filled;
    final accent = variant == LdsIconButtonVariant.accent;
    final dimension = filled ? 36.0 : LdsSize.touchMin;
    const radius = BorderRadius.all(Radius.circular(LdsRadius.pill));
    return LdsPressable(
      onPressed: onPressed,
      pressedScale: 0.9,
      borderRadius: radius,
      semanticLabel: semanticLabel,
      excludeChildSemantics: true,
      selected: selected,
      tooltip: showTooltip ? semanticLabel : null,
      builder: (context, state) {
        final Color bg;
        if (accent) {
          bg = state.pressed ? c.accentPressed : (state.hovered ? c.accentHover : c.accent);
        } else if (filled) {
          bg = state.pressed || state.hovered
              ? Color.alphaBlend(c.bgTintStrong, c.bgRecessed)
              : c.bgRecessed;
        } else {
          bg = state.pressed
              ? c.bgTintStrong
              : (state.hovered ? c.bgTint : Colors.transparent);
        }
        final fg = color ?? (accent ? c.textOnAccent : c.textStrong);
        return AnimatedOpacity(
          opacity: onPressed == null ? 0.38 : 1,
          duration: context.ldsDuration(LdsMotion.fast),
          child: AnimatedContainer(
            duration: context.ldsDuration(LdsMotion.fast),
            width: dimension,
            height: dimension,
            alignment: Alignment.center,
            decoration: BoxDecoration(
              color: bg,
              borderRadius: radius,
              boxShadow: accent ? context.ldsShadows.md : null,
            ),
            child: LdsIcon(icon, size: filled ? 19 : 22, color: fg, fill: fill),
          ),
        );
      },
    );
  }
}
