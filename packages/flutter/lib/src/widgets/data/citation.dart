import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../pressable.dart';

/// A numbered pill after a claim that points to its source.
///
/// The pill is 18 px tall so it sits in a line of text, while its hit area
/// reaches 44 by 44 around it. Inside a [Text.rich] use [LdsCitation.span].
class LdsCitation extends StatelessWidget {
  /// Creates a citation.
  const LdsCitation(
    this.number, {
    super.key,
    required this.onTap,
    this.semanticPrefix = 'Sumber',
  });

  /// The source number.
  final int number;

  /// Jumps to or opens the source.
  final VoidCallback? onTap;

  /// Word read before the number: "Sumber 1".
  final String semanticPrefix;

  /// The citation as a [WidgetSpan] for [Text.rich].
  static InlineSpan span(int number, {required VoidCallback? onTap}) =>
      WidgetSpan(
        alignment: PlaceholderAlignment.middle,
        child: LdsCitation(number, onTap: onTap),
      );

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    return _InflatedHitArea(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 1),
        child: Semantics(
          link: true,
          child: LdsPressable(
            onPressed: onTap,
            pressedScale: 1,
            minSize: Size.zero,
            borderRadius: const BorderRadius.all(Radius.circular(6)),
            semanticLabel: '$semanticPrefix $number',
            excludeChildSemantics: true,
            builder: (context, state) => AnimatedContainer(
              duration: context.ldsDuration(LdsMotion.fast),
              constraints: const BoxConstraints(minWidth: 18),
              height: 18,
              padding: const EdgeInsets.symmetric(horizontal: 5),
              alignment: Alignment.center,
              decoration: BoxDecoration(
                color: state.hovered || state.pressed
                    ? c.accentTintStrong
                    : c.accentTint,
                borderRadius: const BorderRadius.all(Radius.circular(6)),
              ),
              child: Text(
                '$number',
                textScaler: TextScaler.noScaling,
                style: TextStyle(
                  fontFamily: LdsType.family,
                  fontSize: 11,
                  height: 1,
                  fontWeight: FontWeight.w600,
                  color: c.accentText,
                  fontFeatures: const [FontFeature.tabularFigures()],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

/// Accepts hits up to a 44 by 44 square around a small child without
/// growing its layout, and forwards them to the child at the nearest point.
class _InflatedHitArea extends SingleChildRenderObjectWidget {
  const _InflatedHitArea({required Widget super.child});

  @override
  RenderObject createRenderObject(BuildContext context) => _RenderInflated();
}

class _RenderInflated extends RenderProxyBox {
  @override
  bool hitTest(BoxHitTestResult result, {required Offset position}) {
    final dx = ((LdsSize.touchMin - size.width) / 2).clamp(0.0, 44.0);
    final dy = ((LdsSize.touchMin - size.height) / 2).clamp(0.0, 44.0);
    final area = Offset.zero & size;
    final grown = Rect.fromLTRB(
        area.left - dx, area.top - dy, area.right + dx, area.bottom + dy);
    if (!grown.contains(position)) return false;
    final inside = Offset(
      // Clamp inside the 1 px side padding so the pill itself is hit.
      position.dx.clamp(1.5, size.width - 1.5),
      position.dy.clamp(0.5, size.height - 0.5),
    );
    if (child?.hitTest(result, position: inside) ?? false) {
      result.add(BoxHitTestEntry(this, position));
      return true;
    }
    return false;
  }
}
