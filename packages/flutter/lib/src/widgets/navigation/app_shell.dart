import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import 'menu_icon.dart';
import 'sidebar.dart';

/// The frame of an app: a sidebar beside the content on wide screens, a top
/// bar with a drawer below [breakpoint]. One per app, at the root.
///
/// One highlight glides to the current destination. On narrow screens the
/// drawer slides in from the start edge over a scrim; tapping the scrim,
/// pressing Escape or choosing a destination closes it.
class LdsAppShell<T> extends StatefulWidget {
  /// Creates an app shell.
  const LdsAppShell({
    super.key,
    required this.brand,
    required this.destinations,
    required this.value,
    required this.onChanged,
    required this.body,
    this.title,
    this.foot,
    this.actions = const <Widget>[],
    this.breakpoint = 960,
    this.sidebarWidth = 264,
    this.navLabel = 'Navigasi utama',
  });

  /// Product name or logo at the top of the sidebar.
  final Widget brand;

  /// The destinations; a [LdsSidebarItem.heading] starts a group.
  final List<LdsSidebarItem<T>> destinations;

  /// The current destination.
  final T? value;

  /// Called with the chosen destination.
  final ValueChanged<T> onChanged;

  /// The content column.
  final Widget body;

  /// Title of the top bar shown on narrow screens.
  final String? title;

  /// Pinned to the bottom of the sidebar: account, appearance, sign out.
  final Widget? foot;

  /// Widgets at the end of the narrow top bar.
  final List<Widget> actions;

  /// Below this width the sidebar becomes a drawer.
  final double breakpoint;

  /// Width of the sidebar on wide screens.
  final double sidebarWidth;

  /// Names the navigation for screen readers.
  final String navLabel;

  @override
  State<LdsAppShell<T>> createState() => _LdsAppShellState<T>();
}

class _LdsAppShellState<T> extends State<LdsAppShell<T>> {
  bool _menu = false;
  final FocusNode _toggleNode = FocusNode();

  @override
  void dispose() {
    _toggleNode.dispose();
    super.dispose();
  }

  void _close() {
    if (!_menu) return;
    setState(() => _menu = false);
    _toggleNode.requestFocus();
  }

  void _select(T value) {
    widget.onChanged(value);
    if (_menu) setState(() => _menu = false);
  }

  Widget _side(BuildContext context, {required bool drawer}) {
    final c = context.lds;
    return ColoredBox(
      color: drawer ? c.bgElevated : c.bgFill,
      child: SafeArea(
        right: false,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Padding(
              padding: const EdgeInsets.fromLTRB(20, 16, 20, 12),
              child: widget.brand,
            ),
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.symmetric(horizontal: 10),
                child: LdsSidebar<T>(
                  items: widget.destinations,
                  value: widget.value,
                  onChanged: _select,
                  framed: false,
                  semanticLabel: widget.navLabel,
                ),
              ),
            ),
            if (widget.foot != null)
              DecoratedBox(
                decoration: BoxDecoration(
                  border: Border(top: BorderSide(color: c.hairline)),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(10),
                  child: widget.foot,
                ),
              ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    return LayoutBuilder(builder: (context, constraints) {
      final wide = constraints.maxWidth >= widget.breakpoint;
      if (wide) {
        _menu = false;
        return Row(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            SizedBox(
              width: widget.sidebarWidth,
              child: _side(context, drawer: false),
            ),
            VerticalDivider(width: 1, thickness: 1, color: c.hairline),
            Expanded(child: widget.body),
          ],
        );
      }

      final rtl = Directionality.of(context) == TextDirection.rtl;
      final drawerWidth = math.min(304.0, constraints.maxWidth * 0.85);
      final topBar = DecoratedBox(
        decoration: BoxDecoration(
          color: c.bgMaterialSolid,
          border: Border(bottom: BorderSide(color: c.hairline)),
        ),
        child: SafeArea(
          bottom: false,
          child: SizedBox(
            height: 56,
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 6),
              child: Row(
                children: [
                  LdsMenuButton(
                    open: _menu,
                    focusNode: _toggleNode,
                    onPressed: () => setState(() => _menu = !_menu),
                  ),
                  const SizedBox(width: 6),
                  Expanded(
                    child: Text(
                      widget.title ?? '',
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: LdsType.headline.copyWith(color: c.textStrong),
                    ),
                  ),
                  ...widget.actions,
                  if (widget.actions.isEmpty)
                    const SizedBox(width: LdsSize.touchMin),
                ],
              ),
            ),
          ),
        ),
      );

      return CallbackShortcuts(
        bindings: <ShortcutActivator, VoidCallback>{
          const SingleActivator(LogicalKeyboardKey.escape): _close,
        },
        child: Stack(
          children: [
            ExcludeFocus(
              excluding: _menu,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [topBar, Expanded(child: widget.body)],
              ),
            ),
            Positioned.fill(
              child: IgnorePointer(
                ignoring: !_menu,
                child: GestureDetector(
                  onTap: _close,
                  child: AnimatedOpacity(
                    opacity: _menu ? 1 : 0,
                    duration: context.ldsDuration(
                        _menu ? LdsMotion.standard : LdsMotion.exit),
                    curve:
                        _menu ? LdsMotion.standardCurve : LdsMotion.exitCurve,
                    child: ColoredBox(color: c.bgScrim),
                  ),
                ),
              ),
            ),
            PositionedDirectional(
              top: 0,
              bottom: 0,
              start: 0,
              width: drawerWidth,
              child: AnimatedSlide(
                offset: Offset(_menu ? 0 : (rtl ? 1.05 : -1.05), 0),
                duration: context.ldsDuration(_menu
                    ? LdsMotion.smoothSpringDuration
                    : const Duration(milliseconds: 260)),
                curve: _menu ? LdsSpringCurve.smooth : LdsMotion.exitCurve,
                child: ExcludeSemantics(
                  excluding: !_menu,
                  child: ExcludeFocus(
                    excluding: !_menu,
                    child: DecoratedBox(
                      decoration:
                          BoxDecoration(boxShadow: context.ldsShadows.lg),
                      child: _side(context, drawer: true),
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      );
    });
  }
}
