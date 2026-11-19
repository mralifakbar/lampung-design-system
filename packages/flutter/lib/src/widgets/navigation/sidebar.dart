import 'package:material_ui/material_ui.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../icon.dart';
import '../pressable.dart';
import 'sliding_indicator.dart';

/// One destination of an [LdsSidebar] or [LdsAppShell].
@immutable
class LdsSidebarItem<T> {
  /// Creates a sidebar item.
  const LdsSidebarItem({
    required this.value,
    required this.label,
    this.icon,
    this.badge,
    this.heading,
  });

  /// The value reported when this item is chosen.
  final T value;

  /// Visible text.
  final String label;

  /// Optional icon (ligature name); drawn filled while current.
  final String? icon;

  /// Optional quiet count or short note at the end, for example "12".
  final String? badge;

  /// A caption shown above this item, starting a new group.
  final String? heading;
}

/// A panel of links with one sliding highlight, placed inside the content:
/// the sections of a settings page, the folders of an inbox.
///
/// The highlight glides to the current item on the smooth spring and is
/// placed without animation on first build. For the frame of the whole app
/// use [LdsAppShell], which uses this list for its navigation.
class LdsSidebar<T> extends StatelessWidget {
  /// Creates a sidebar.
  const LdsSidebar({
    super.key,
    required this.items,
    required this.value,
    required this.onChanged,
    this.semanticLabel,
    this.framed = true,
    this.width = 240,
  });

  /// Destinations, in order.
  final List<LdsSidebarItem<T>> items;

  /// The current destination, or null when none is.
  final T? value;

  /// Called with the chosen value.
  final ValueChanged<T> onChanged;

  /// Names the navigation for screen readers.
  final String? semanticLabel;

  /// Draw the bordered panel. False gives a bare list for use inside
  /// another surface.
  final bool framed;

  /// Width of the framed panel. Ignored when [framed] is false.
  final double width;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final children = <Widget>[];
    int? selected;
    for (final item in items) {
      if (item.heading != null) {
        children.add(
          Padding(
            padding: const EdgeInsets.fromLTRB(10, 10, 10, 6),
            child: Semantics(
              header: true,
              child: Text(
                item.heading!,
                style: LdsType.caption.copyWith(color: c.textMuted),
              ),
            ),
          ),
        );
      }
      final current = item.value == value;
      if (current) selected = children.length;
      children.add(
        _SidebarRow<T>(
          item: item,
          current: current,
          onPressed: () => onChanged(item.value),
        ),
      );
    }

    Widget list = LdsSlidingIndicator(
      selectedIndex: selected,
      spacing: 2,
      borderRadius: const BorderRadius.all(Radius.circular(10)),
      children: children,
    );
    if (framed) {
      list = Container(
        width: width,
        padding: const EdgeInsets.all(10),
        decoration: BoxDecoration(
          color: c.bgBase,
          borderRadius: BorderRadius.circular(LdsRadius.lg),
          border: Border.all(color: c.line),
        ),
        child: list,
      );
    }
    return Semantics(
      container: true,
      label: semanticLabel,
      explicitChildNodes: true,
      child: list,
    );
  }
}

class _SidebarRow<T> extends StatelessWidget {
  const _SidebarRow({
    required this.item,
    required this.current,
    required this.onPressed,
  });

  final LdsSidebarItem<T> item;
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
      semanticLabel: item.badge == null
          ? item.label
          : '${item.label}, ${item.badge}',
      excludeChildSemantics: true,
      builder: (context, state) {
        final fg = current ? c.accentText : c.textDefault;
        return AnimatedContainer(
          duration: context.ldsDuration(LdsMotion.fast),
          height: LdsSize.touchMin,
          padding: const EdgeInsets.symmetric(horizontal: 10),
          decoration: BoxDecoration(
            borderRadius: radius,
            color: !current && (state.hovered || state.pressed)
                ? (state.pressed ? c.bgTintStrong : c.bgTint)
                : Colors.transparent,
          ),
          child: Row(
            children: [
              if (item.icon != null) ...[
                LdsIcon(
                  item.icon!,
                  fill: current,
                  color: current ? c.accentText : c.textSubtle,
                ),
                const SizedBox(width: 10),
              ],
              Expanded(
                child: Text(
                  item.label,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: LdsType.subhead.copyWith(
                    color: fg,
                    fontWeight: current ? FontWeight.w500 : FontWeight.w400,
                  ),
                ),
              ),
              if (item.badge != null) ...[
                const SizedBox(width: 8),
                Text(
                  item.badge!,
                  style: LdsType.caption.copyWith(
                    fontSize: 12,
                    letterSpacing: 0,
                    color: c.textMuted,
                    fontFeatures: const [FontFeature.tabularFigures()],
                  ),
                ),
              ],
            ],
          ),
        );
      },
    );
  }
}
