import 'dart:async';

import 'package:material_ui/material_ui.dart';

import '../../theme.dart';
import '../../tokens.g.dart';
import 'anchored_layer.dart';

/// A preview card under a link after a 600 ms hover or on keyboard focus:
/// who a person is, what a service covers. It saves a click; it never holds
/// the only copy of anything.
///
/// The card stays while the pointer is over the link or the card, and
/// leaves after a 150 ms grace.
class LdsHoverCard extends StatefulWidget {
  /// Creates a hover card.
  const LdsHoverCard({
    super.key,
    required this.child,
    required this.card,
    this.width = 280,
    this.openDelay = const Duration(milliseconds: 600),
    this.closeDelay = const Duration(milliseconds: 150),
    this.placement = LdsLayerPlacement.bottomStart,
  });

  /// The trigger, usually a link to the full page.
  final Widget child;

  /// The card content: a title, one line, maybe an avatar.
  final Widget card;

  /// Card width.
  final double width;

  /// Hover time before the card shows.
  final Duration openDelay;

  /// Grace time before the card leaves.
  final Duration closeDelay;

  /// Preferred side and alignment.
  final LdsLayerPlacement placement;

  @override
  State<LdsHoverCard> createState() => _LdsHoverCardState();
}

class _LdsHoverCardState extends State<LdsHoverCard> {
  final LdsLayerController _layer = LdsLayerController();
  Timer? _timer;

  @override
  void dispose() {
    _timer?.cancel();
    _layer.dispose();
    super.dispose();
  }

  void _show({bool now = false}) {
    _timer?.cancel();
    if (_layer.isOpen) return;
    if (now) {
      _layer.open();
    } else {
      _timer = Timer(widget.openDelay, _layer.open);
    }
  }

  void _hide() {
    _timer?.cancel();
    _timer = Timer(widget.closeDelay, _layer.close);
  }

  @override
  Widget build(BuildContext context) {
    return LdsAnchoredLayer(
      controller: _layer,
      placement: widget.placement,
      gap: 10,
      autofocus: false,
      builder: (context, _) => MouseRegion(
        onEnter: (_) => _show(),
        onExit: (_) => _hide(),
        child: Focus(
          canRequestFocus: false,
          skipTraversal: true,
          onFocusChange: (f) => f ? _show(now: true) : _hide(),
          child: widget.child,
        ),
      ),
      layerBuilder: (context, _) {
        final c = context.lds;
        return MouseRegion(
          onEnter: (_) => _timer?.cancel(),
          onExit: (_) => _hide(),
          child: Container(
            width: widget.width,
            padding: const EdgeInsets.all(LdsSpace.s16),
            decoration: BoxDecoration(
              color: c.bgElevated,
              borderRadius: const BorderRadius.all(
                Radius.circular(LdsRadius.lg),
              ),
              border: Border.all(color: c.lineStrong, width: 0.5),
              boxShadow: context.ldsShadows.lg,
            ),
            child: Material(
              type: MaterialType.transparency,
              child: DefaultTextStyle(
                style: LdsType.subhead.copyWith(color: c.textDefault),
                child: widget.card,
              ),
            ),
          ),
        );
      },
    );
  }
}
