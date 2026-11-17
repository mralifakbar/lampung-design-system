import 'package:flutter/material.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../icon.dart';
import '../pressable.dart';

/// One tool of an [LdsExpandingToolbar].
@immutable
class LdsToolbarTool {
  /// Creates a tool.
  const LdsToolbarTool({
    required this.icon,
    required this.label,
    required this.onPressed,
  });

  /// Ligature name, see [LdsIcon].
  final String icon;

  /// What the tool does; shown when it opens and read by screen readers.
  final String label;

  /// Called when pressed. Null disables the tool.
  final VoidCallback? onPressed;
}

/// A compact row of icon tools where the hovered or focused one opens its
/// label and one highlight glides to it.
///
/// The default tool shows its label at rest, so the bar is never a row of
/// unexplained icons. The highlight travels once, straight to where the tool
/// will end up after every label has finished opening and closing.
class LdsExpandingToolbar extends StatefulWidget {
  /// Creates an expanding toolbar.
  const LdsExpandingToolbar({
    super.key,
    required this.tools,
    this.defaultIndex = 0,
    this.semanticLabel,
  });

  /// The tools, in order.
  final List<LdsToolbarTool> tools;

  /// The tool whose label shows at rest.
  final int defaultIndex;

  /// Names the toolbar for screen readers.
  final String? semanticLabel;

  @override
  State<LdsExpandingToolbar> createState() => _LdsExpandingToolbarState();
}

class _LdsExpandingToolbarState extends State<LdsExpandingToolbar> {
  int? _hover;
  int? _focus;

  static const double _pad = 4;
  static const double _gap = 2;
  static const double _side = 12;
  static const double _icon = 20;
  static const double _labelGap = 6;

  int? get _active => _focus ?? _hover;

  TextStyle get _labelStyle => LdsType.subhead.copyWith(
        fontWeight: FontWeight.w500,
        height: 1,
        color: context.lds.textDefault,
      );

  double _labelWidth(String text) {
    final painter = TextPainter(
      text: TextSpan(text: text, style: _labelStyle),
      textDirection: Directionality.of(context),
      textScaler: MediaQuery.textScalerOf(context),
      maxLines: 1,
    )..layout();
    final w = painter.width;
    painter.dispose();
    return w.ceilToDouble();
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final open = _active ?? widget.defaultIndex;
    final spring = context.ldsDuration(LdsMotion.smoothSpringDuration);
    const closedWidth = _side * 2 + _icon;
    final widths = <double>[
      for (var i = 0; i < widget.tools.length; i++)
        i == open
            ? closedWidth + _labelGap + _labelWidth(widget.tools[i].label)
            : closedWidth,
    ];
    var start = _pad;
    for (var i = 0; i < open && i < widths.length; i++) {
      start += widths[i] + _gap;
    }

    final buttons = <Widget>[];
    for (var i = 0; i < widget.tools.length; i++) {
      final tool = widget.tools[i];
      final isOpen = i == open;
      if (i > 0) buttons.add(const SizedBox(width: _gap));
      buttons.add(MouseRegion(
        onEnter: (_) => setState(() => _hover = i),
        child: Focus(
          canRequestFocus: false,
          skipTraversal: true,
          onFocusChange: (f) => setState(() {
            if (f) {
              _focus = i;
            } else if (_focus == i) {
              _focus = null;
            }
          }),
          child: LdsPressable(
            onPressed: tool.onPressed,
            pressedScale: 0.94,
            minSize: Size.zero,
            borderRadius: const BorderRadius.all(Radius.circular(10)),
            semanticLabel: tool.label,
            excludeChildSemantics: true,
            tooltip: isOpen ? null : tool.label,
            builder: (context, state) => AnimatedContainer(
              duration: spring,
              curve: LdsSpringCurve.smooth,
              width: widths[i],
              height: LdsSize.touchMin,
              clipBehavior: Clip.hardEdge,
              decoration: const BoxDecoration(),
              child: OverflowBox(
                alignment: AlignmentDirectional.centerStart,
                maxWidth: double.infinity,
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const SizedBox(width: _side),
                    LdsIcon(tool.icon,
                        color: tool.onPressed == null
                            ? c.textFaint
                            : c.textDefault),
                    const SizedBox(width: _labelGap),
                    AnimatedOpacity(
                      opacity: isOpen ? 1 : 0,
                      duration: isOpen
                          ? context.ldsDuration(LdsMotion.fast)
                          : Duration.zero,
                      child: Text(tool.label,
                          maxLines: 1, softWrap: false, style: _labelStyle),
                    ),
                    const SizedBox(width: _side),
                  ],
                ),
              ),
            ),
          ),
        ),
      ));
    }

    return Semantics(
      container: true,
      label: widget.semanticLabel,
      explicitChildNodes: true,
      child: MouseRegion(
        onExit: (_) => setState(() => _hover = null),
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: _pad),
          decoration: BoxDecoration(
            color: c.bgBase,
            borderRadius: BorderRadius.circular(14),
            border: Border.all(color: c.line),
            boxShadow: context.ldsShadows.sm,
          ),
          child: Stack(
            clipBehavior: Clip.none,
            children: [
              AnimatedPositionedDirectional(
                duration: spring,
                curve: LdsSpringCurve.smooth,
                start: start - _pad,
                top: 4,
                width: widths.isEmpty ? 0 : widths[open],
                height: 36,
                child: IgnorePointer(
                  child: AnimatedOpacity(
                    opacity: _active == null ? 0 : 1,
                    duration: context.ldsDuration(LdsMotion.fast),
                    child: DecoratedBox(
                      decoration: BoxDecoration(
                        color: c.bgTintStrong,
                        borderRadius: BorderRadius.circular(10),
                      ),
                    ),
                  ),
                ),
              ),
              Row(mainAxisSize: MainAxisSize.min, children: buttons),
            ],
          ),
        ),
      ),
    );
  }
}
