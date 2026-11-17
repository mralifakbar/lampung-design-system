import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../icon.dart';
import '../pressable.dart';

/// One product in a point-of-sale or catalog grid: picture, name, an
/// optional stock line and the price, with how many are in the current
/// sale.
///
/// A sold-out tile ([soldOut]) fades its picture and says why in [meta];
/// a tap on it shakes the tile and calls [onUnavailable].
class LdsProductTile extends StatefulWidget {
  /// Creates a product tile.
  const LdsProductTile({
    super.key,
    required this.name,
    required this.price,
    required this.onTap,
    this.meta,
    this.lowStock = false,
    this.image,
    this.icon = 'shopping_bag',
    this.quantity = 0,
    this.soldOut = false,
    this.onUnavailable,
    this.compact = false,
    this.aspectRatio = 1,
    this.semanticLabel,
  });

  /// Product name, two lines at most.
  final String name;

  /// Formatted price, for example "Rp15.000".
  final String price;

  /// Adds one to the sale.
  final VoidCallback? onTap;

  /// Stock, size or variant; why it is unavailable when [soldOut].
  final String? meta;

  /// Shows [meta] in the warning text color.
  final bool lowStock;

  /// Product photo. Without it, [icon] is drawn.
  final ImageProvider? image;

  /// Icon when there is no photo (ligature name).
  final String icon;

  /// How many are in the current sale; zero hides the count.
  final int quantity;

  /// Not for sale now.
  final bool soldOut;

  /// Called when a sold-out tile is tapped.
  final VoidCallback? onUnavailable;

  /// Picture at the start, 56 px, for narrow panels and long lists.
  final bool compact;

  /// Picture shape, width over height.
  final double aspectRatio;

  /// Overrides the announced label (name, price and quantity).
  final String? semanticLabel;

  @override
  State<LdsProductTile> createState() => _LdsProductTileState();
}

class _LdsProductTileState extends State<LdsProductTile>
    with SingleTickerProviderStateMixin {
  late final AnimationController _shake = AnimationController(
    vsync: this,
    duration: const Duration(milliseconds: 360),
  );

  @override
  void dispose() {
    _shake.dispose();
    super.dispose();
  }

  void _tap() {
    if (widget.soldOut) {
      if (!context.ldsReduceMotion) _shake.forward(from: 0);
      widget.onUnavailable?.call();
      return;
    }
    widget.onTap?.call();
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final reduce = context.ldsReduceMotion;
    final inSale = widget.quantity > 0;
    final label = widget.semanticLabel ??
        [
          widget.name,
          widget.price,
          if (widget.soldOut && widget.meta != null) widget.meta!,
          if (inSale) '${widget.quantity} di keranjang',
        ].join(', ');
    const radius = BorderRadius.all(Radius.circular(LdsRadius.lg));

    Widget media(bool hot) {
      final picture = widget.image != null
          ? AnimatedScale(
              scale: hot && !reduce ? 1.04 : 1,
              duration: LdsMotion.smoothSpringDuration,
              curve: LdsSpringCurve.smooth,
              child: Image(image: widget.image!, fit: BoxFit.cover),
            )
          : Center(child: LdsIcon(widget.icon, size: 32, color: c.textMuted));
      return ClipRRect(
        borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.md)),
        child: AspectRatio(
          aspectRatio: widget.compact ? 1 : widget.aspectRatio,
          child: ColoredBox(
            color: c.bgRecessed,
            child: SizedBox.expand(
              child: Opacity(opacity: widget.soldOut ? 0.4 : 1, child: picture),
            ),
          ),
        ),
      );
    }

    Widget body() => Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              widget.name,
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
              style: TextStyle(
                fontFamily: LdsType.family,
                fontSize: 14,
                height: 19 / 14,
                fontWeight: FontWeight.w500,
                color: widget.soldOut ? c.textMuted : c.textStrong,
              ),
            ),
            if (widget.meta != null) ...[
              const SizedBox(height: 2),
              Text(
                widget.meta!,
                style: TextStyle(
                  fontFamily: LdsType.family,
                  fontSize: 12,
                  height: 16 / 12,
                  color: widget.lowStock ? c.warningText : c.textSubtle,
                ),
              ),
            ],
          ],
        );

    final price = Text(
      widget.price,
      style: TextStyle(
        fontFamily: LdsType.family,
        fontSize: 15,
        height: 20 / 15,
        fontWeight: FontWeight.w600,
        letterSpacing: -0.15,
        color: widget.soldOut ? c.textMuted : c.textStrong,
        fontFeatures: const [FontFeature.tabularFigures()],
      ),
    );

    final qty = inSale
        ? TweenAnimationBuilder<double>(
            key: ValueKey(widget.quantity),
            tween: Tween(begin: reduce ? 1 : 0.82, end: 1),
            duration: context.ldsDuration(LdsMotion.snappy),
            curve: LdsSpringCurve.snappy,
            builder: (context, s, child) =>
                Transform.scale(scale: s, child: child),
            child: Container(
              constraints: const BoxConstraints(minWidth: 26),
              height: 26,
              padding: const EdgeInsets.symmetric(horizontal: 8),
              alignment: Alignment.center,
              decoration: BoxDecoration(
                color: c.accent,
                borderRadius: const BorderRadius.all(Radius.circular(13)),
                boxShadow: [BoxShadow(color: c.bgBase, spreadRadius: 2)],
              ),
              child: Text(
                '${widget.quantity}',
                style: TextStyle(
                  fontFamily: LdsType.family,
                  fontSize: 13,
                  height: 1,
                  fontWeight: FontWeight.w600,
                  color: c.textOnAccent,
                  fontFeatures: const [FontFeature.tabularFigures()],
                ),
              ),
            ),
          )
        : null;

    return AnimatedBuilder(
      animation: _shake,
      builder: (context, child) => Transform.translate(
        offset: Offset(
            6 * math.sin(_shake.value * math.pi * 4) * (1 - _shake.value), 0),
        child: child,
      ),
      child: LdsPressable(
        onPressed: widget.onTap == null && !widget.soldOut ? null : _tap,
        borderRadius: radius,
        semanticLabel: label,
        excludeChildSemantics: true,
        builder: (context, state) {
          final hot = state.hovered && !widget.soldOut;
          final content = widget.compact
              ? Row(
                  children: [
                    SizedBox(width: 56, child: media(hot)),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        mainAxisSize: MainAxisSize.min,
                        children: [body(), const SizedBox(height: 4), price],
                      ),
                    ),
                    if (qty != null) ...[const SizedBox(width: 8), qty],
                  ],
                )
              : Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Stack(
                      children: [
                        media(hot),
                        if (qty != null)
                          Positioned(top: 6, right: 6, child: qty),
                      ],
                    ),
                    const SizedBox(height: 10),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 4),
                      child: body(),
                    ),
                    const SizedBox(height: 10),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 4),
                      child: price,
                    ),
                  ],
                );
          return AnimatedContainer(
            duration: context.ldsDuration(LdsMotion.fast),
            padding: widget.compact
                ? const EdgeInsets.all(8)
                : const EdgeInsets.fromLTRB(8, 8, 8, 12),
            decoration: BoxDecoration(
              color: c.bgBase,
              borderRadius: radius,
              border: Border.all(
                color: inSale
                    ? c.accent
                    : hot
                        ? c.lineStrong
                        : c.line,
                width: inSale ? 1.5 : 1,
              ),
            ),
            child: content,
          );
        },
      ),
    );
  }
}

/// A responsive grid of [LdsProductTile]s.
class LdsProductGrid extends StatelessWidget {
  /// Creates a product grid.
  const LdsProductGrid({
    super.key,
    required this.children,
    this.minTileWidth = 148,
  });

  /// The tiles.
  final List<Widget> children;

  /// Smallest column width.
  final double minTileWidth;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(builder: (context, box) {
      const gap = 12.0;
      final width = box.maxWidth.isFinite ? box.maxWidth : minTileWidth;
      final cols = math.max(1, ((width + gap) / (minTileWidth + gap)).floor());
      final w = (width - gap * (cols - 1)) / cols;
      return Wrap(
        spacing: gap,
        runSpacing: gap,
        children: [
          for (final child in children) SizedBox(width: w, child: child),
        ],
      );
    });
  }
}
