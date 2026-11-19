import 'package:material_ui/material_ui.dart';

import '../../theme.dart';
import '../../tokens.g.dart';
import 'anchored_layer.dart';

/// A small floating card anchored to a button, for content richer than a
/// menu: a mini form, a short explanation with a link, a quick setting.
///
/// It does not block the page. It closes on an outside tap and on Escape,
/// and returns focus to the trigger.
class LdsPopover extends StatelessWidget {
  /// Creates a popover.
  const LdsPopover({
    super.key,
    required this.builder,
    required this.contentBuilder,
    this.controller,
    this.width = 300,
    this.placement = LdsLayerPlacement.bottomCenter,
    this.semanticLabel,
    this.onOpenChanged,
  });

  /// Builds the trigger. Call `controller.toggle()` when it is pressed.
  final Widget Function(BuildContext context, LdsLayerController controller)
  builder;

  /// Builds the card content; call `controller.close()` from it to close.
  final Widget Function(BuildContext context, LdsLayerController controller)
  contentBuilder;

  /// Controls the popover from outside.
  final LdsLayerController? controller;

  /// Card width.
  final double width;

  /// Preferred side and alignment.
  final LdsLayerPlacement placement;

  /// Names the popover for screen readers.
  final String? semanticLabel;

  /// Called when the popover opens or closes.
  final ValueChanged<bool>? onOpenChanged;

  @override
  Widget build(BuildContext context) {
    return LdsAnchoredLayer(
      controller: controller,
      placement: placement,
      gap: 8,
      onOpenChanged: onOpenChanged,
      builder: builder,
      layerBuilder: (context, c) {
        final colors = context.lds;
        return Semantics(
          container: true,
          explicitChildNodes: true,
          label: semanticLabel,
          child: Container(
            width: width,
            padding: const EdgeInsets.all(LdsSpace.s16),
            decoration: BoxDecoration(
              color: colors.bgElevated,
              borderRadius: const BorderRadius.all(
                Radius.circular(LdsRadius.lg),
              ),
              border: Border.all(color: colors.lineStrong, width: 0.5),
              boxShadow: context.ldsShadows.lg,
            ),
            child: Material(
              type: MaterialType.transparency,
              child: DefaultTextStyle(
                style: LdsType.subhead.copyWith(color: colors.textDefault),
                child: contentBuilder(context, c),
              ),
            ),
          ),
        );
      },
    );
  }
}
