import 'package:material_ui/material_ui.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../icon.dart';
import '../pressable.dart';
import 'height_expand.dart';

/// One question or section of an [LdsAccordion].
@immutable
class LdsAccordionItem {
  /// Creates an accordion item.
  const LdsAccordionItem({
    required this.title,
    required this.child,
    this.subtitle,
    this.initiallyOpen = false,
  });

  /// The question or section name.
  final String title;

  /// Optional quieter second line under the title.
  final String? subtitle;

  /// The answer or section content.
  final Widget child;

  /// Open on first build.
  final bool initiallyOpen;
}

/// A stack of questions or sections, each opening its panel on the smooth
/// spring. For content people read selectively; never to hide what everyone
/// needs.
///
/// With [single] opening one item closes the others.
class LdsAccordion extends StatefulWidget {
  /// Creates an accordion.
  const LdsAccordion({
    super.key,
    required this.items,
    this.single = false,
    this.fill = false,
  });

  /// The items, in order.
  final List<LdsAccordionItem> items;

  /// Only one item open at a time.
  final bool single;

  /// A quiet fill with no ring, for white panels.
  final bool fill;

  @override
  State<LdsAccordion> createState() => _LdsAccordionState();
}

class _LdsAccordionState extends State<LdsAccordion> {
  late final Set<int> _open = <int>{
    for (var i = 0; i < widget.items.length; i++)
      if (widget.items[i].initiallyOpen) i,
  };

  void _toggle(int i) {
    setState(() {
      if (_open.contains(i)) {
        _open.remove(i);
      } else {
        if (widget.single) _open.clear();
        _open.add(i);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final children = <Widget>[];
    for (var i = 0; i < widget.items.length; i++) {
      if (i > 0) {
        children.add(Divider(height: 1, thickness: 1, color: c.hairline));
      }
      children.add(
        _AccordionSection(
          item: widget.items[i],
          open: _open.contains(i),
          onToggle: () => _toggle(i),
        ),
      );
    }
    return Container(
      clipBehavior: Clip.antiAlias,
      decoration: BoxDecoration(
        color: widget.fill ? c.bgFill : c.bgBase,
        borderRadius: BorderRadius.circular(LdsRadius.lg),
        border: widget.fill ? null : Border.all(color: c.line),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        mainAxisSize: MainAxisSize.min,
        children: children,
      ),
    );
  }
}

class _AccordionSection extends StatelessWidget {
  const _AccordionSection({
    required this.item,
    required this.open,
    required this.onToggle,
  });

  final LdsAccordionItem item;
  final bool open;
  final VoidCallback onToggle;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final spring = context.ldsDuration(LdsMotion.smoothSpringDuration);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      mainAxisSize: MainAxisSize.min,
      children: [
        MergeSemantics(
          child: Semantics(
            expanded: open,
            child: LdsPressable(
              onPressed: onToggle,
              pressedScale: 1,
              borderRadius: BorderRadius.zero,
              semanticLabel: item.subtitle == null
                  ? item.title
                  : '${item.title}, ${item.subtitle}',
              excludeChildSemantics: true,
              builder: (context, state) => AnimatedContainer(
                duration: context.ldsDuration(LdsMotion.fast),
                constraints: const BoxConstraints(minHeight: 56),
                padding: const EdgeInsets.symmetric(
                  horizontal: 16,
                  vertical: 8,
                ),
                color: state.hovered || state.pressed
                    ? c.bgTint
                    : Colors.transparent,
                child: Row(
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Text(
                            item.title,
                            style: LdsType.bodyStrong.copyWith(
                              color: c.textStrong,
                              height: 20 / 15,
                            ),
                          ),
                          if (item.subtitle != null) ...[
                            const SizedBox(height: 2),
                            Text(
                              item.subtitle!,
                              style: LdsType.footnote.copyWith(
                                color: c.textSubtle,
                              ),
                            ),
                          ],
                        ],
                      ),
                    ),
                    const SizedBox(width: 12),
                    AnimatedRotation(
                      turns: open ? 0.5 : 0,
                      duration: spring,
                      curve: LdsSpringCurve.smooth,
                      child: LdsIcon('expand_more', color: c.textSubtle),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
        LdsHeightExpand(
          open: open,
          child: Padding(
            padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
            child: DefaultTextStyle.merge(
              style: LdsType.body.copyWith(color: c.textDefault),
              child: item.child,
            ),
          ),
        ),
      ],
    );
  }
}
