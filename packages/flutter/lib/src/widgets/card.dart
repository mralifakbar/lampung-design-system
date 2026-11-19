import 'package:material_ui/material_ui.dart';

import '../theme.dart';
import '../tokens.g.dart';
import 'pressable.dart';

/// How an [LdsCard] separates itself from the canvas.
enum LdsCardVariant {
  /// A quiet fill (`bg-fill`). The default: grouping without a shadow.
  fill,

  /// The base surface with a 1 px line. Use inside a filled area, never a
  /// fill on a fill.
  outline,
}

/// A self-contained subject: title, meta, a figure, an action.
///
/// Cards group by fill, never by shadow. With [onTap] the whole card is one
/// pressable target with a focus ring.
class LdsCard extends StatelessWidget {
  /// Creates a card.
  const LdsCard({
    super.key,
    required this.child,
    this.variant = LdsCardVariant.fill,
    this.padding = const EdgeInsets.all(LdsSpace.s16),
    this.onTap,
    this.semanticLabel,
  });

  /// Content.
  final Widget child;

  /// Fill or outline.
  final LdsCardVariant variant;

  /// Inner padding.
  final EdgeInsetsGeometry padding;

  /// Makes the whole card pressable.
  final VoidCallback? onTap;

  /// Label for screen readers when [onTap] is set.
  final String? semanticLabel;

  static const BorderRadius _radius = BorderRadius.all(
    Radius.circular(LdsRadius.lg),
  );

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    BoxDecoration decoration(bool active) => BoxDecoration(
      color: variant == LdsCardVariant.fill
          ? (active ? Color.alphaBlend(c.bgTint, c.bgFill) : c.bgFill)
          : (active ? c.bgFill : c.bgBase),
      borderRadius: _radius,
      border: variant == LdsCardVariant.outline
          ? Border.all(color: c.line)
          : null,
    );
    if (onTap == null) {
      return DecoratedBox(
        decoration: decoration(false),
        child: Padding(padding: padding, child: child),
      );
    }
    return LdsPressable(
      onPressed: onTap,
      pressedScale: 0.985,
      borderRadius: _radius,
      semanticLabel: semanticLabel,
      builder: (context, state) => DecoratedBox(
        decoration: decoration(state.hovered || state.pressed),
        child: Padding(padding: padding, child: child),
      ),
    );
  }
}
