import 'dart:math' as math;

import 'package:material_ui/material_ui.dart';

import '../../motion.dart';
import '../../tokens.g.dart';

/// Where an [LdsAnchoredLayer] sits relative to its trigger. It flips to the
/// other side when there is no room.
enum LdsLayerPlacement {
  /// Below, aligned to the start edge.
  bottomStart,

  /// Below, centered.
  bottomCenter,

  /// Below, aligned to the end edge.
  bottomEnd,

  /// Above, aligned to the start edge.
  topStart,

  /// Above, centered.
  topCenter,

  /// Above, aligned to the end edge.
  topEnd,
}

/// Opens and closes an [LdsAnchoredLayer].
class LdsLayerController extends ChangeNotifier {
  bool _open = false;
  Offset? _position;

  /// Whether the layer shows.
  bool get isOpen => _open;

  /// The point (in the trigger's coordinates) the layer was opened at with
  /// [openAt], or null when it hangs from the whole trigger.
  Offset? get position => _position;

  /// Opens the layer under the trigger.
  void open() {
    if (_open && _position == null) return;
    _position = null;
    _open = true;
    notifyListeners();
  }

  /// Opens the layer at [localPosition] inside the trigger, for example
  /// where a right-click happened.
  void openAt(Offset localPosition) {
    _position = localPosition;
    _open = true;
    notifyListeners();
  }

  /// Closes the layer; it plays its exit first.
  void close() {
    if (!_open) return;
    _open = false;
    notifyListeners();
  }

  /// Opens a closed layer, closes an open one.
  void toggle() => _open ? close() : open();
}

/// A floating layer anchored to a trigger: the base of popover, dropdown
/// menu, context menu, menubar and hover card.
///
/// The layer lives in the [Overlay], keeps 8 px from the window edges, flips
/// above or below to fit, closes on an outside tap and on Escape, and returns
/// focus to where it was. It enters with a fade and a scale from 0.96 on the
/// smooth spring and leaves in 180 ms on the exit curve; with reduced motion
/// it only fades.
class LdsAnchoredLayer extends StatefulWidget {
  /// Creates an anchored layer.
  const LdsAnchoredLayer({
    super.key,
    required this.builder,
    required this.layerBuilder,
    this.controller,
    this.placement = LdsLayerPlacement.bottomStart,
    this.gap = 6,
    this.autofocus = true,
    this.closeOnOutsideTap = true,
    this.onOpenChanged,
  });

  /// Builds the trigger. Call [LdsLayerController.toggle] from it.
  final Widget Function(BuildContext context, LdsLayerController controller)
  builder;

  /// Builds the floating content.
  final Widget Function(BuildContext context, LdsLayerController controller)
  layerBuilder;

  /// Controls the layer from outside. One is created when null.
  final LdsLayerController? controller;

  /// Preferred side and alignment.
  final LdsLayerPlacement placement;

  /// Space between trigger and layer.
  final double gap;

  /// Move focus into the layer when it opens.
  final bool autofocus;

  /// Close when a pointer goes down outside the trigger and the layer.
  final bool closeOnOutsideTap;

  /// Called after the layer opens or starts to close.
  final ValueChanged<bool>? onOpenChanged;

  @override
  State<LdsAnchoredLayer> createState() => _LdsAnchoredLayerState();
}

class _LdsAnchoredLayerState extends State<LdsAnchoredLayer>
    with SingleTickerProviderStateMixin {
  final OverlayPortalController _portal = OverlayPortalController();
  final GlobalKey _targetKey = GlobalKey();
  final Object _group = Object();
  late final AnimationController _anim;
  late final CurvedAnimation _move;
  late final CurvedAnimation _fade;
  LdsLayerController? _own;
  FocusNode? _returnFocus;
  bool _wasOpen = false;

  LdsLayerController get _ctrl =>
      widget.controller ?? (_own ??= LdsLayerController());

  @override
  void initState() {
    super.initState();
    _anim = AnimationController(vsync: this);
    _move = CurvedAnimation(
      parent: _anim,
      curve: LdsSpringCurve.smooth,
      reverseCurve: LdsMotion.exitCurve.flipped,
    );
    _fade = CurvedAnimation(
      parent: _anim,
      curve: const Interval(0, 0.3, curve: LdsMotion.enterCurve),
      reverseCurve: LdsMotion.exitCurve.flipped,
    );
    _ctrl.addListener(_sync);
  }

  @override
  void didUpdateWidget(LdsAnchoredLayer oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.controller != widget.controller) {
      (oldWidget.controller ?? _own)?.removeListener(_sync);
      _ctrl.addListener(_sync);
    }
  }

  @override
  void dispose() {
    _ctrl.removeListener(_sync);
    _own?.dispose();
    _move.dispose();
    _fade.dispose();
    _anim.dispose();
    super.dispose();
  }

  void _sync() {
    if (!mounted) return;
    final open = _ctrl.isOpen;
    if (open) {
      if (!_wasOpen) _returnFocus = FocusManager.instance.primaryFocus;
      _portal.show();
      _anim.duration = context.ldsReduceMotion
          ? LdsMotion.instant
          : LdsMotion.smooth;
      _anim.forward();
    } else if (_wasOpen) {
      _anim.reverseDuration = context.ldsReduceMotion
          ? LdsMotion.instant
          : LdsMotion.exit;
      _anim.reverse().whenCompleteOrCancel(() {
        if (mounted && !_ctrl.isOpen && _anim.isDismissed) _portal.hide();
      });
      if (widget.autofocus) {
        final node = _returnFocus;
        if (node != null && node.context != null) node.requestFocus();
      }
    }
    if (open != _wasOpen) {
      _wasOpen = open;
      widget.onOpenChanged?.call(open);
    }
    setState(() {});
  }

  Widget _buildLayer(BuildContext context) {
    final target = _targetKey.currentContext?.findRenderObject() as RenderBox?;
    final overlay =
        Overlay.of(context).context.findRenderObject() as RenderBox?;
    if (target == null ||
        !target.hasSize ||
        !target.attached ||
        overlay == null) {
      return const SizedBox.shrink();
    }
    final origin = target.localToGlobal(Offset.zero, ancestor: overlay);
    final at = _ctrl.position;
    final anchor = at == null
        ? origin & target.size
        : Rect.fromLTWH(origin.dx + at.dx, origin.dy + at.dy, 0, 0);
    final reduce = context.ldsReduceMotion;
    final placement = at == null
        ? widget.placement
        : LdsLayerPlacement.bottomStart;
    final below = placement.index < 3;

    Widget layer = widget.layerBuilder(context, _ctrl);
    layer = Actions(
      actions: <Type, Action<Intent>>{
        DismissIntent: CallbackAction<DismissIntent>(
          onInvoke: (_) {
            _ctrl.close();
            return null;
          },
        ),
      },
      child: FocusScope(autofocus: widget.autofocus, child: layer),
    );
    layer = TapRegion(
      groupId: _group,
      onTapOutside: widget.closeOnOutsideTap ? (_) => _ctrl.close() : null,
      child: layer,
    );
    layer = FadeTransition(
      opacity: _fade,
      child: reduce
          ? layer
          : AnimatedBuilder(
              animation: _move,
              builder: (context, child) => Transform.translate(
                offset: Offset(0, (below ? -4 : 4) * (1 - _move.value)),
                child: Transform.scale(
                  scale: 0.96 + 0.04 * _move.value,
                  alignment: below
                      ? Alignment.topCenter
                      : Alignment.bottomCenter,
                  child: child,
                ),
              ),
              child: layer,
            ),
    );
    return IgnorePointer(
      ignoring: !_ctrl.isOpen,
      child: CustomSingleChildLayout(
        delegate: _AnchorLayout(
          anchor: anchor,
          placement: placement,
          gap: at == null ? widget.gap : 2,
          rtl: Directionality.of(context) == TextDirection.rtl,
          padding: MediaQuery.paddingOf(context),
        ),
        child: layer,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return TapRegion(
      groupId: _group,
      child: OverlayPortal(
        controller: _portal,
        overlayChildBuilder: _buildLayer,
        child: KeyedSubtree(
          key: _targetKey,
          child: widget.builder(context, _ctrl),
        ),
      ),
    );
  }
}

class _AnchorLayout extends SingleChildLayoutDelegate {
  _AnchorLayout({
    required this.anchor,
    required this.placement,
    required this.gap,
    required this.rtl,
    required this.padding,
  });

  final Rect anchor;
  final LdsLayerPlacement placement;
  final double gap;
  final bool rtl;
  final EdgeInsets padding;

  static const double _margin = 8;

  @override
  BoxConstraints getConstraintsForChild(BoxConstraints constraints) {
    final size = constraints.biggest;
    return BoxConstraints(
      maxWidth: math.max(0, size.width - _margin * 2),
      maxHeight: math.max(0, size.height - padding.vertical - _margin * 2),
    );
  }

  @override
  Offset getPositionForChild(Size size, Size child) {
    final i = placement.index;
    final align = i % 3; // 0 start, 1 center, 2 end
    var below = i < 3;
    final top = padding.top + _margin;
    final bottom = size.height - padding.bottom - _margin;
    if (below &&
        anchor.bottom + gap + child.height > bottom &&
        anchor.top - gap - child.height >= top) {
      below = false;
    } else if (!below &&
        anchor.top - gap - child.height < top &&
        anchor.bottom + gap + child.height <= bottom) {
      below = true;
    }
    final y = below ? anchor.bottom + gap : anchor.top - gap - child.height;
    final startLeft = rtl ? anchor.right - child.width : anchor.left;
    final endLeft = rtl ? anchor.left : anchor.right - child.width;
    final x = switch (align) {
      0 => startLeft,
      1 => anchor.center.dx - child.width / 2,
      _ => endLeft,
    };
    return Offset(
      x.clamp(_margin, math.max(_margin, size.width - child.width - _margin)),
      y.clamp(top, math.max(top, bottom - child.height)),
    );
  }

  @override
  bool shouldRelayout(_AnchorLayout old) =>
      old.anchor != anchor ||
      old.placement != placement ||
      old.gap != gap ||
      old.rtl != rtl ||
      old.padding != padding;
}
