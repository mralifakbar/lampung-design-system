import 'package:flutter/widgets.dart';

import '../tokens.g.dart';

/// A Solar icon drawn from the bundled ligature fonts.
///
/// [name] is a ligature from `icons/icons.json` (`search`, `home`,
/// `arrow_forward`, ...). An unknown name renders blank. [fill] switches from
/// the line set to the filled set.
///
/// The icon is decorative unless [semanticLabel] is given.
class LdsIcon extends StatelessWidget {
  /// Creates an icon.
  const LdsIcon(
    this.name, {
    super.key,
    this.size = 20,
    this.color,
    this.fill = false,
    this.semanticLabel,
  });

  /// Ligature name, for example `search`.
  final String name;

  /// Size of the square the glyph fills, in logical pixels.
  final double size;

  /// Glyph color. Defaults to the ambient [IconTheme] color, then the text
  /// color.
  final Color? color;

  /// Use the filled set instead of the line set.
  final bool fill;

  /// Announced by screen readers; null makes the icon decorative.
  final String? semanticLabel;

  @override
  Widget build(BuildContext context) {
    final resolved =
        color ??
        IconTheme.of(context).color ??
        DefaultTextStyle.of(context).style.color;
    final glyph = SizedBox.square(
      dimension: size,
      child: Center(
        child: Text(
          name,
          maxLines: 1,
          softWrap: false,
          overflow: TextOverflow.visible,
          textScaler: TextScaler.noScaling,
          textDirection: TextDirection.ltr,
          style: TextStyle(
            fontFamily: fill ? LdsType.iconsFill : LdsType.icons,
            fontSize: size,
            height: 1,
            letterSpacing: 0,
            wordSpacing: 0,
            color: resolved,
            fontWeight: FontWeight.w400,
            fontStyle: FontStyle.normal,
            decoration: TextDecoration.none,
          ),
        ),
      ),
    );
    if (semanticLabel == null) return ExcludeSemantics(child: glyph);
    return Semantics(
      label: semanticLabel,
      image: true,
      excludeSemantics: true,
      child: glyph,
    );
  }
}
