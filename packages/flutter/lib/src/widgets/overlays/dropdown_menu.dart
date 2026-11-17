import 'package:flutter/widgets.dart';

import 'anchored_layer.dart';
import 'menu.dart';

/// A list of commands that drops from a button: sort options, row actions,
/// the "more" menu behind an icon button.
///
/// [builder] builds the trigger and gets the controller to toggle the menu.
/// Choosing a command closes the menu first, then runs it.
///
/// ```dart
/// LdsDropdownMenu(
///   entries: const [LdsMenuItem(label: 'Unduh PDF', icon: 'download')],
///   builder: (context, menu) => LdsIconButton(
///     icon: 'more_horiz', semanticLabel: 'Tindakan lain',
///     onPressed: menu.toggle),
/// )
/// ```
class LdsDropdownMenu extends StatelessWidget {
  /// Creates a dropdown menu.
  const LdsDropdownMenu({
    super.key,
    required this.builder,
    required this.entries,
    this.controller,
    this.placement = LdsLayerPlacement.bottomStart,
    this.semanticLabel,
    this.onOpenChanged,
  });

  /// Builds the trigger. Call `controller.toggle()` when it is pressed.
  final Widget Function(BuildContext context, LdsLayerController controller)
      builder;

  /// Commands, captions and dividers.
  final List<LdsMenuEntry> entries;

  /// Controls the menu from outside.
  final LdsLayerController? controller;

  /// Preferred side and alignment.
  final LdsLayerPlacement placement;

  /// Names the menu for screen readers.
  final String? semanticLabel;

  /// Called when the menu opens or closes.
  final ValueChanged<bool>? onOpenChanged;

  @override
  Widget build(BuildContext context) {
    return LdsAnchoredLayer(
      controller: controller,
      placement: placement,
      onOpenChanged: onOpenChanged,
      builder: builder,
      layerBuilder: (context, c) => LdsMenu(
        entries: entries,
        onClose: c.close,
        semanticLabel: semanticLabel,
      ),
    );
  }
}
