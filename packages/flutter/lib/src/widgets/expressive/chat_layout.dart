import 'dart:math' as math;

import 'package:material_ui/material_ui.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../button.dart';

/// The conversation column: messages 20 px apart, newest at the bottom, a
/// history that scrolls above a [composer] that never scrolls away, and a
/// "Terbaru" button that appears only while the reader has scrolled up.
///
/// The history is anchored at its end, so new messages appear in view while
/// the reader is there; once they scroll up more than 160 px, the button
/// takes them back. Before the first message, [empty] (an empty state with
/// starter chips) takes the place of the history. The column is at most
/// [maxWidth] wide so answers stay readable.
///
/// Under reduced motion the jump is instant and the button only fades.
class LdsChatLayout extends StatefulWidget {
  /// Creates a chat layout.
  const LdsChatLayout({
    super.key,
    required this.messages,
    required this.composer,
    this.empty,
    this.controller,
    this.semanticLabel = 'Percakapan',
    this.jumpLabel = 'Terbaru',
    this.maxWidth = 640,
    this.padding = const EdgeInsets.fromLTRB(20, 20, 20, 16),
  });

  /// The messages, oldest first ([LdsChatMessage]s).
  final List<Widget> messages;

  /// The reply box, usually an [LdsComposer].
  final Widget composer;

  /// Shown instead of the history while [messages] is empty.
  final Widget? empty;

  /// Scroll controller of the history.
  final ScrollController? controller;

  /// Names the conversation for screen readers.
  final String semanticLabel;

  /// Label of the jump-to-latest button.
  final String jumpLabel;

  /// Maximum width of the column.
  final double maxWidth;

  /// Padding around the history and the composer.
  final EdgeInsets padding;

  @override
  State<LdsChatLayout> createState() => _LdsChatLayoutState();
}

class _LdsChatLayoutState extends State<LdsChatLayout> {
  ScrollController? _own;
  ScrollController get _scroll =>
      widget.controller ?? (_own ??= ScrollController());
  bool _showJump = false;

  @override
  void initState() {
    super.initState();
    _scroll.addListener(_onScroll);
  }

  @override
  void didUpdateWidget(LdsChatLayout oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.controller != widget.controller) {
      (oldWidget.controller ?? _own)?.removeListener(_onScroll);
      _scroll.addListener(_onScroll);
    }
  }

  // The history is a reversed list: offset 0 is the newest message, so the
  // column stays at the end by itself as messages arrive.
  double get _distance =>
      _scroll.hasClients ? math.max(0, _scroll.position.pixels) : 0;

  void _onScroll() {
    final show = _distance > 160;
    if (show != _showJump) setState(() => _showJump = show);
  }

  void _toEnd() {
    if (!mounted || !_scroll.hasClients) return;
    if (context.ldsReduceMotion) {
      _scroll.jumpTo(0);
    } else {
      _scroll.animateTo(
        0,
        duration: LdsMotion.smoothSpringDuration,
        curve: LdsSpringCurve.smooth,
      );
    }
  }

  @override
  void dispose() {
    _scroll.removeListener(_onScroll);
    _own?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final reduce = context.ldsReduceMotion;
    final pad = widget.padding;
    final history = widget.messages.isEmpty && widget.empty != null
        ? Center(
            child: SingleChildScrollView(
              padding: EdgeInsets.fromLTRB(pad.left, pad.top, pad.right, 0),
              child: widget.empty,
            ),
          )
        : Semantics(
            container: true,
            label: widget.semanticLabel,
            child: ListView.separated(
              controller: _scroll,
              reverse: true,
              padding: EdgeInsets.fromLTRB(pad.left, 20, pad.right, pad.top),
              itemCount: widget.messages.length,
              separatorBuilder: (context, index) => const SizedBox(height: 20),
              itemBuilder: (context, index) =>
                  widget.messages[widget.messages.length - 1 - index],
            ),
          );

    final jump = Positioned(
      left: 0,
      right: 0,
      bottom: 16,
      child: Center(
        child: IgnorePointer(
          ignoring: !_showJump,
          child: ExcludeSemantics(
            excluding: !_showJump,
            child: AnimatedOpacity(
              opacity: _showJump ? 1 : 0,
              duration: reduce ? LdsMotion.instant : LdsMotion.fast,
              curve: LdsMotion.standardCurve,
              child: AnimatedSlide(
                offset: Offset(0, _showJump || reduce ? 0 : 0.2),
                duration: reduce
                    ? Duration.zero
                    : LdsMotion.smoothSpringDuration,
                curve: LdsSpringCurve.smooth,
                child: DecoratedBox(
                  decoration: BoxDecoration(
                    borderRadius: const BorderRadius.all(Radius.circular(10)),
                    boxShadow: context.ldsShadows.md,
                  ),
                  child: LdsButton(
                    label: widget.jumpLabel,
                    icon: 'arrow_downward',
                    variant: LdsButtonVariant.secondary,
                    size: LdsButtonSize.md,
                    onPressed: _toEnd,
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );

    return Center(
      child: ConstrainedBox(
        constraints: BoxConstraints(maxWidth: widget.maxWidth + pad.horizontal),
        child: Column(
          children: [
            Expanded(
              child: Stack(
                children: [
                  Positioned.fill(child: history),
                  jump,
                ],
              ),
            ),
            Padding(
              padding: EdgeInsets.fromLTRB(pad.left, 0, pad.right, pad.bottom),
              child: widget.composer,
            ),
          ],
        ),
      ),
    );
  }
}
