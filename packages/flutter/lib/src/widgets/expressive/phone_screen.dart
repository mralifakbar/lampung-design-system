import 'dart:ui' as ui;

import 'package:material_ui/material_ui.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../icon.dart';
import '../pressable.dart';

/// One destination in the tab bar of an [LdsPhoneScreen].
@immutable
class LdsPhoneTab {
  /// Creates a tab.
  const LdsPhoneTab({required this.icon, required this.label});

  /// Ligature name; the current tab uses the filled glyph.
  final String icon;

  /// One-word label, always shown.
  final String label;
}

/// The standard phone layout: a large title that collapses into a
/// translucent nav bar as content scrolls under it, the content in the
/// middle, and a translucent tab bar of three to five destinations.
///
/// The two bars are the only blurred surfaces. Past 44 px of scroll the nav
/// bar gains its material and the small title rises in; scrolling back
/// reverses it. The current tab is accent with the filled glyph, which pops
/// once. Leave [tabs] empty on screens pushed from a list.
///
/// The large title is the screen heading; the small bar title repeats it
/// visually only. Under reduced motion the changes are 120 ms fades.
class LdsPhoneScreen extends StatefulWidget {
  /// Creates a phone screen.
  const LdsPhoneScreen({
    super.key,
    required this.title,
    required this.children,
    this.leading,
    this.actions = const [],
    this.tabs = const [],
    this.currentTab = 0,
    this.onTabSelected,
    this.topInset = 54,
    this.bottomInset = 30,
    this.padding = const EdgeInsets.symmetric(horizontal: 16),
    this.tabsSemanticLabel = 'Navigasi utama',
    this.controller,
  });

  /// The screen title.
  final String title;

  /// The scrolling content under the large title: grouped lists, cards.
  final List<Widget> children;

  /// Leading bar control, usually a back button.
  final Widget? leading;

  /// Trailing 44 px icon buttons.
  final List<Widget> actions;

  /// Tab bar destinations; empty hides the tab bar.
  final List<LdsPhoneTab> tabs;

  /// Index of the current destination.
  final int currentTab;

  /// Called when a destination is pressed (also the current one, to return
  /// to the top).
  final ValueChanged<int>? onTabSelected;

  /// Height of the status bar area above the nav bar.
  final double topInset;

  /// Height of the home indicator area under the tab bar.
  final double bottomInset;

  /// Side padding of the content.
  final EdgeInsets padding;

  /// Names the tab bar for screen readers.
  final String tabsSemanticLabel;

  /// Scroll controller of the content.
  final ScrollController? controller;

  @override
  State<LdsPhoneScreen> createState() => _LdsPhoneScreenState();
}

class _LdsPhoneScreenState extends State<LdsPhoneScreen> {
  ScrollController? _own;
  ScrollController get _scroll =>
      widget.controller ?? (_own ??= ScrollController());
  double _offset = 0;

  @override
  void initState() {
    super.initState();
    _scroll.addListener(_onScroll);
  }

  @override
  void didUpdateWidget(LdsPhoneScreen oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.controller != widget.controller) {
      (oldWidget.controller ?? _own)?.removeListener(_onScroll);
      _scroll.addListener(_onScroll);
    }
  }

  void _onScroll() {
    final o = _scroll.hasClients ? _scroll.offset : 0.0;
    final before = _offset;
    _offset = o;
    // Rebuild while the large title fades and when crossing 44 px.
    if (before < 44 || o < 44 || (before > 44) != (o > 44)) setState(() {});
  }

  @override
  void dispose() {
    _scroll.removeListener(_onScroll);
    _own?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final reduce = context.ldsReduceMotion;
    final scrolled = _offset > 44;
    final collapse = (_offset / 40).clamp(0.0, 1.0);
    const barHeight = 46.0;
    final hasTabs = widget.tabs.isNotEmpty;
    final tabHeight = hasTabs ? widget.bottomInset + 53 : 0.0;

    final list = ListView(
      controller: _scroll,
      padding: EdgeInsets.only(bottom: tabHeight + 30),
      children: [
        SizedBox(height: widget.topInset + barHeight),
        Opacity(
          opacity: 1 - collapse,
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            child: Semantics(
              header: true,
              child: Text(
                widget.title,
                style: TextStyle(
                  fontFamily: LdsType.family,
                  fontSize: 34,
                  height: 41 / 34,
                  fontWeight: FontWeight.w700,
                  letterSpacing: -0.028 * 34,
                  color: c.textStrong,
                ),
              ),
            ),
          ),
        ),
        const SizedBox(height: LdsSpace.s12),
        for (final child in widget.children)
          Padding(padding: widget.padding, child: child),
      ],
    );

    Widget material(Widget child, {required bool top}) => ClipRect(
      child: BackdropFilter(
        filter: ui.ImageFilter.blur(sigmaX: 20, sigmaY: 20),
        child: DecoratedBox(
          decoration: BoxDecoration(
            color: c.bgMaterial,
            border: top
                ? Border(bottom: BorderSide(color: c.lineStrong, width: 0.5))
                : Border(top: BorderSide(color: c.lineStrong, width: 0.5)),
          ),
          child: child,
        ),
      ),
    );

    final fade = reduce ? LdsMotion.instant : LdsMotion.fast;
    final navbar = SizedBox(
      height: widget.topInset + barHeight,
      child: Stack(
        fit: StackFit.expand,
        children: [
          AnimatedOpacity(
            opacity: scrolled ? 1 : 0,
            duration: fade,
            child: material(const SizedBox.expand(), top: true),
          ),
          Padding(
            padding: EdgeInsets.fromLTRB(8, widget.topInset, 8, 0),
            child: Row(
              children: [
                Expanded(
                  child: Align(
                    alignment: Alignment.centerLeft,
                    child: widget.leading ?? const SizedBox.shrink(),
                  ),
                ),
                ExcludeSemantics(
                  child: AnimatedOpacity(
                    opacity: scrolled ? 1 : 0,
                    duration: fade,
                    child: AnimatedSlide(
                      offset: Offset(0, scrolled || reduce ? 0 : 6 / 22),
                      duration: reduce ? Duration.zero : LdsMotion.standard,
                      curve: LdsMotion.enterCurve,
                      child: Text(
                        widget.title,
                        style: LdsType.headline.copyWith(color: c.textStrong),
                      ),
                    ),
                  ),
                ),
                Expanded(
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: widget.actions,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );

    final tabbar = !hasTabs
        ? null
        : Semantics(
            container: true,
            label: widget.tabsSemanticLabel,
            child: material(
              SizedBox(
                height: tabHeight,
                child: Padding(
                  padding: EdgeInsets.fromLTRB(4, 0, 4, widget.bottomInset),
                  child: Row(
                    children: [
                      for (var i = 0; i < widget.tabs.length; i++)
                        Expanded(
                          child: _TabItem(
                            tab: widget.tabs[i],
                            current: i == widget.currentTab,
                            onPressed: widget.onTabSelected == null
                                ? null
                                : () => widget.onTabSelected!(i),
                          ),
                        ),
                    ],
                  ),
                ),
              ),
              top: false,
            ),
          );

    return ColoredBox(
      color: c.bgCanvas,
      child: Stack(
        children: [
          Positioned.fill(child: list),
          Positioned(top: 0, left: 0, right: 0, child: navbar),
          if (tabbar != null)
            Positioned(left: 0, right: 0, bottom: 0, child: tabbar),
        ],
      ),
    );
  }
}

class _TabItem extends StatelessWidget {
  const _TabItem({
    required this.tab,
    required this.current,
    required this.onPressed,
  });

  final LdsPhoneTab tab;
  final bool current;
  final VoidCallback? onPressed;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final reduce = context.ldsReduceMotion;
    final color = current ? c.accentText : c.textMuted;
    return LdsPressable(
      onPressed: onPressed ?? () {},
      pressedScale: 1,
      selected: current,
      semanticLabel: tab.label,
      excludeChildSemantics: true,
      builder: (context, state) => Padding(
        padding: const EdgeInsets.only(top: 6),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            AnimatedScale(
              scale: state.pressed && !reduce ? 0.86 : 1,
              duration: reduce ? LdsMotion.instant : LdsMotion.snappy,
              curve: LdsSpringCurve.snappy,
              child: TweenAnimationBuilder<double>(
                // A new key restarts the pop when the tab becomes current.
                key: ValueKey<bool>(current),
                tween: Tween(begin: current && !reduce ? 0.82 : 1, end: 1),
                duration: LdsMotion.snappySpringDuration,
                curve: LdsSpringCurve.snappy,
                builder: (context, s, child) =>
                    Transform.scale(scale: s, child: child),
                child: LdsIcon(tab.icon, size: 26, color: color, fill: current),
              ),
            ),
            const SizedBox(height: 2),
            Text(
              tab.label,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: TextStyle(
                fontFamily: LdsType.family,
                fontSize: 10.5,
                height: 12 / 10.5,
                fontWeight: FontWeight.w500,
                letterSpacing: 0.105,
                color: color,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
