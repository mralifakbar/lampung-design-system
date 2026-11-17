import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';

import 'anchored_layer.dart';
import 'menu.dart';

/// A command menu that opens at the pointer on right-click, a long press on
/// touch, or Shift+F10 and the context menu key on a keyboard.
///
/// A shortcut for commands that are also reachable another way: never put
/// the only path to a command here.
class LdsContextMenu extends StatefulWidget {
  /// Creates a context menu area.
  const LdsContextMenu({
    super.key,
    required this.child,
    required this.entries,
    this.semanticLabel,
    this.semanticHint = 'Long press for actions',
  });

  /// The area that listens.
  final Widget child;

  /// Commands, captions and dividers.
  final List<LdsMenuEntry> entries;

  /// Names the menu for screen readers.
  final String? semanticLabel;

  /// Tells screen reader users how to open the menu.
  final String semanticHint;

  @override
  State<LdsContextMenu> createState() => _LdsContextMenuState();
}

class _LdsContextMenuState extends State<LdsContextMenu> {
  final LdsLayerController _menu = LdsLayerController();

  @override
  void dispose() {
    _menu.dispose();
    super.dispose();
  }

  void _openFromKeyboard(BuildContext context) {
    final box = context.findRenderObject() as RenderBox?;
    final size = box?.size ?? Size.zero;
    _menu.openAt(Offset(16, size.height / 2));
  }

  @override
  Widget build(BuildContext context) {
    return LdsAnchoredLayer(
      controller: _menu,
      builder: (context, menu) => CallbackShortcuts(
        bindings: <ShortcutActivator, VoidCallback>{
          const SingleActivator(LogicalKeyboardKey.f10, shift: true): () =>
              _openFromKeyboard(context),
          const SingleActivator(LogicalKeyboardKey.contextMenu): () =>
              _openFromKeyboard(context),
        },
        child: Focus(
          child: Semantics(
            hint: widget.semanticHint,
            onLongPress: () => _openFromKeyboard(context),
            child: GestureDetector(
              behavior: HitTestBehavior.opaque,
              onSecondaryTapUp: (d) => menu.openAt(d.localPosition),
              onLongPressStart: (d) => menu.openAt(d.localPosition),
              child: widget.child,
            ),
          ),
        ),
      ),
      layerBuilder: (context, c) => LdsMenu(
        entries: widget.entries,
        onClose: c.close,
        semanticLabel: widget.semanticLabel,
      ),
    );
  }
}
