import 'dart:ui' as ui;

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../pressable.dart';
import 'height_expand.dart';
import 'menu_icon.dart';
import 'sliding_indicator.dart';

/// One link of an [LdsTopNav].
@immutable
class LdsTopNavLink<T> {
  /// Creates a link.
  const LdsTopNavLink({required this.value, required this.label});

  /// The value reported when this link is chosen.
  final T value;

  /// Visible text.
  final String label;
}

/// A translucent bar across the top of a site without a sidebar: brand, up
/// to five links, actions.
///
/// Narrower than [breakpoint] the links fold into a panel under the bar,
/// opened by a menu toggle whose bars fold into a close icon. Escape closes
/// the panel, and choosing a link closes it too. The bar never hides or
/// shrinks on scroll.
class LdsTopNav<T> extends StatefulWidget {
  /// Creates a top navigation bar.
  const LdsTopNav({
    super.key,
    required this.brand,
    required this.links,
    required this.value,
    required this.onChanged,
    this.actions = const <Widget>[],
    this.breakpoint = 760,
    this.semanticLabel = 'Navigasi utama',
    this.safeArea = true,
  }) : assert(links.length <= 5, 'Use at most five links');

  /// Product name or logo; usually a pressable link home.
  final Widget brand;

  /// The destinations.
  final List<LdsTopNavLink<T>> links;

  /// The current destination, or null.
  final T? value;

  /// Called with the chosen value.
  final ValueChanged<T> onChanged;

  /// Widgets at the end of the bar: a sign in link, one button.
  final List<Widget> actions;

  /// Below this width the links fold into a panel.
  final double breakpoint;

  /// Names the links for screen readers.
  final String semanticLabel;

  /// Pad for the status bar when the bar sits at the top of the screen.
  final bool safeArea;

  @override
  State<LdsTopNav<T>> createState() => _LdsTopNavState<T>();
}

class _LdsTopNavState<T> extends State<LdsTopNav<T>> {
  bool _open = false;
  final FocusNode _toggleNode = FocusNode();

  @override
  void dispose() {
    _toggleNode.dispose();
    super.dispose();
  }

  void _select(T value) {
    widget.onChanged(value);
    if (_open) setState(() => _open = false);
  }

  void _close() {
    if (!_open) return;
    setState(() => _open = false);
    _toggleNode.requestFocus();
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    return LayoutBuilder(builder: (context, constraints) {
      final narrow = constraints.maxWidth < widget.breakpoint;
      if (!narrow && _open) _open = false;
      final index = widget.links.indexWhere((l) => l.value == widget.value);

      Widget bar = SizedBox(
        height: 60,
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16),
          child: Row(
            children: [
              widget.brand,
              const SizedBox(width: 20),
              if (!narrow)
                Expanded(
                  child: Semantics(
                    container: true,
                    label: widget.semanticLabel,
                    explicitChildNodes: true,
                    child: Align(
                      alignment: AlignmentDirectional.centerStart,
                      child: LdsSlidingIndicator(
                        direction: Axis.horizontal,
                        style: LdsIndicatorStyle.underline,
                        selectedIndex: index < 0 ? null : index,
                        spacing: 4,
                        children: [
                          for (var i = 0; i < widget.links.length; i++)
                            _WideLink(
                              label: widget.links[i].label,
                              current: i == index,
                              onPressed: () => _select(widget.links[i].value),
                            ),
                        ],
                      ),
                    ),
                  ),
                )
              else
                const Spacer(),
              ...widget.actions,
              if (narrow) ...[
                const SizedBox(width: 4),
                LdsMenuButton(
                  open: _open,
                  focusNode: _toggleNode,
                  onPressed: () => setState(() => _open = !_open),
                ),
              ],
            ],
          ),
        ),
      );
      if (widget.safeArea) bar = SafeArea(bottom: false, child: bar);

      final panel = narrow
          ? LdsHeightExpand(
              open: _open,
              child: Semantics(
                container: true,
                label: widget.semanticLabel,
                explicitChildNodes: true,
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(12, 4, 12, 12),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      for (var i = 0; i < widget.links.length; i++)
                        _PanelLink(
                          label: widget.links[i].label,
                          current: i == index,
                          onPressed: () => _select(widget.links[i].value),
                        ),
                    ],
                  ),
                ),
              ),
            )
          : const SizedBox.shrink();

      return CallbackShortcuts(
        bindings: <ShortcutActivator, VoidCallback>{
          const SingleActivator(LogicalKeyboardKey.escape): _close,
        },
        child: ClipRect(
          child: BackdropFilter(
            filter: ui.ImageFilter.blur(sigmaX: 20, sigmaY: 20),
            child: DecoratedBox(
              decoration: BoxDecoration(
                color: c.bgMaterial,
                border: Border(bottom: BorderSide(color: c.hairline)),
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [bar, panel],
              ),
            ),
          ),
        ),
      );
    });
  }
}

class _WideLink extends StatelessWidget {
  const _WideLink({
    required this.label,
    required this.current,
    required this.onPressed,
  });

  final String label;
  final bool current;
  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    const radius = BorderRadius.all(Radius.circular(9));
    return SizedBox(
      height: 60,
      child: Center(
        child: LdsPressable(
          onPressed: onPressed,
          pressedScale: 1,
          borderRadius: radius,
          selected: current,
          semanticLabel: label,
          excludeChildSemantics: true,
          builder: (context, state) => AnimatedContainer(
            duration: context.ldsDuration(LdsMotion.fast),
            height: 36,
            padding: const EdgeInsets.symmetric(horizontal: 12),
            alignment: Alignment.center,
            decoration: BoxDecoration(
              borderRadius: radius,
              color: state.hovered || state.pressed
                  ? c.bgTint
                  : Colors.transparent,
            ),
            child: Text(
              label,
              style: LdsType.subhead.copyWith(
                fontWeight: FontWeight.w500,
                color: current || state.hovered ? c.textStrong : c.textSubtle,
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _PanelLink extends StatelessWidget {
  const _PanelLink({
    required this.label,
    required this.current,
    required this.onPressed,
  });

  final String label;
  final bool current;
  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    const radius = BorderRadius.all(Radius.circular(10));
    return LdsPressable(
      onPressed: onPressed,
      pressedScale: 1,
      borderRadius: radius,
      selected: current,
      semanticLabel: label,
      excludeChildSemantics: true,
      builder: (context, state) => AnimatedContainer(
        duration: context.ldsDuration(LdsMotion.fast),
        height: 48,
        padding: const EdgeInsets.symmetric(horizontal: 12),
        alignment: AlignmentDirectional.centerStart,
        decoration: BoxDecoration(
          borderRadius: radius,
          color: current
              ? c.bgTint
              : state.pressed
                  ? c.bgTintStrong
                  : Colors.transparent,
        ),
        child: Text(
          label,
          style: LdsType.body.copyWith(
            fontWeight: FontWeight.w500,
            color: current ? c.textStrong : c.textDefault,
          ),
        ),
      ),
    );
  }
}
