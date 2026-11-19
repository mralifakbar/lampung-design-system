import 'package:flutter/services.dart';
import 'package:material_ui/material_ui.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../pressable.dart';
import 'anchored_layer.dart';
import 'menu.dart';

/// One menu of an [LdsMenubar].
@immutable
class LdsMenubarMenu {
  /// Creates a menubar menu.
  const LdsMenubarMenu({required this.label, required this.entries});

  /// Button text ("Berkas", "Ubah", "Tampilan").
  final String label;

  /// Commands with their shortcuts.
  final List<LdsMenuEntry> entries;
}

/// A row of command menus for a desktop-style editor. Each button opens an
/// [LdsMenu]; while one is open, hovering another button switches to it.
/// Left and Right move between the buttons.
class LdsMenubar extends StatefulWidget {
  /// Creates a menubar.
  const LdsMenubar({super.key, required this.menus, this.semanticLabel});

  /// The menus, in order.
  final List<LdsMenubarMenu> menus;

  /// Names the menubar for screen readers.
  final String? semanticLabel;

  @override
  State<LdsMenubar> createState() => _LdsMenubarState();
}

class _LdsMenubarState extends State<LdsMenubar> {
  final List<LdsLayerController> _ctrls = <LdsLayerController>[];
  int? _open;

  @override
  void initState() {
    super.initState();
    _syncControllers();
  }

  @override
  void didUpdateWidget(LdsMenubar oldWidget) {
    super.didUpdateWidget(oldWidget);
    _syncControllers();
  }

  void _syncControllers() {
    while (_ctrls.length < widget.menus.length) {
      _ctrls.add(LdsLayerController());
    }
  }

  @override
  void dispose() {
    for (final c in _ctrls) {
      c.dispose();
    }
    super.dispose();
  }

  void _openMenu(int i) {
    for (var j = 0; j < _ctrls.length; j++) {
      if (j != i) _ctrls[j].close();
    }
    _ctrls[i].open();
  }

  void _onChanged(int i, bool open) {
    setState(() {
      if (open) {
        _open = i;
      } else if (_open == i) {
        _open = null;
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    return Semantics(
      container: true,
      explicitChildNodes: true,
      label: widget.semanticLabel,
      child: Shortcuts(
        shortcuts: const <ShortcutActivator, Intent>{
          SingleActivator(LogicalKeyboardKey.arrowRight): NextFocusIntent(),
          SingleActivator(LogicalKeyboardKey.arrowLeft): PreviousFocusIntent(),
        },
        child: FocusTraversalGroup(
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 4),
            decoration: BoxDecoration(
              color: c.bgBase,
              borderRadius: const BorderRadius.all(
                Radius.circular(LdsRadius.md),
              ),
              border: Border.all(color: c.line),
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                for (var i = 0; i < widget.menus.length; i++)
                  LdsAnchoredLayer(
                    controller: _ctrls[i],
                    onOpenChanged: (open) => _onChanged(i, open),
                    builder: (context, menu) => MouseRegion(
                      onEnter: (_) {
                        if (_open != null && _open != i) _openMenu(i);
                      },
                      child: _MenubarButton(
                        label: widget.menus[i].label,
                        open: menu.isOpen,
                        onPressed: () =>
                            menu.isOpen ? menu.close() : _openMenu(i),
                      ),
                    ),
                    layerBuilder: (context, menu) => LdsMenu(
                      entries: widget.menus[i].entries,
                      onClose: menu.close,
                      semanticLabel: widget.menus[i].label,
                    ),
                  ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _MenubarButton extends StatelessWidget {
  const _MenubarButton({
    required this.label,
    required this.open,
    required this.onPressed,
  });

  final String label;
  final bool open;
  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    const radius = BorderRadius.all(Radius.circular(LdsRadius.sm));
    return LdsPressable(
      onPressed: onPressed,
      pressedScale: 1,
      borderRadius: radius,
      selected: open,
      semanticLabel: label,
      excludeChildSemantics: true,
      builder: (context, state) => AnimatedContainer(
        duration: context.ldsDuration(LdsMotion.instant),
        height: 32,
        padding: const EdgeInsets.symmetric(horizontal: 10),
        alignment: Alignment.center,
        decoration: BoxDecoration(
          borderRadius: radius,
          color: open
              ? c.accentTint
              : (state.hovered || state.pressed
                    ? c.bgTintStrong
                    : Colors.transparent),
        ),
        child: Text(
          label,
          style: LdsType.subhead.copyWith(
            color: open ? c.accentText : c.textStrong,
            fontWeight: FontWeight.w500,
          ),
        ),
      ),
    );
  }
}
