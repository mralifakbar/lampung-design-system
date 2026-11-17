import 'package:flutter/material.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../pressable.dart';

/// A horizontal row of cards that snaps per card under the finger or
/// trackpad, with dots that stretch toward the current page.
///
/// For browsing optional items, never for content everyone must see. It
/// never plays by itself. Each dot is a button that scrolls to its page.
class LdsCarousel extends StatefulWidget {
  /// Creates a carousel.
  const LdsCarousel({
    super.key,
    required this.children,
    required this.height,
    this.itemsPerView = 3,
    this.gap = 14,
    this.showDots = true,
    this.semanticLabel,
  }) : assert(itemsPerView >= 1);

  /// The cards.
  final List<Widget> children;

  /// Height of the cards.
  final double height;

  /// How many cards fit in the viewport. Use 1 to 1.2 on phones.
  final double itemsPerView;

  /// Space between cards.
  final double gap;

  /// Show page dots under the row.
  final bool showDots;

  /// Names the region for screen readers.
  final String? semanticLabel;

  @override
  State<LdsCarousel> createState() => _LdsCarouselState();
}

class _LdsCarouselState extends State<LdsCarousel> {
  late PageController _controller = _make(widget.itemsPerView);
  int _page = 0;

  PageController _make(double perView) =>
      PageController(viewportFraction: 1 / perView);

  @override
  void didUpdateWidget(LdsCarousel oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.itemsPerView != widget.itemsPerView) {
      _controller.dispose();
      _controller = _make(widget.itemsPerView);
      _page = 0;
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  int get _pageCount {
    final perView = widget.itemsPerView.floor().clamp(1, 1 << 20);
    final n = widget.children.length;
    return n <= perView ? 1 : n - perView + 1;
  }

  void _goTo(int page) {
    final target = page.clamp(0, widget.children.length - 1);
    if (context.ldsReduceMotion) {
      _controller.jumpToPage(target);
    } else {
      _controller.animateToPage(target,
          duration: LdsMotion.smoothSpringDuration,
          curve: LdsSpringCurve.smooth);
    }
  }

  @override
  Widget build(BuildContext context) {
    final pages = _pageCount;
    final row = SizedBox(
      height: widget.height,
      child: PageView.builder(
        controller: _controller,
        padEnds: false,
        itemCount: widget.children.length,
        onPageChanged: (p) => setState(() => _page = p.clamp(0, pages - 1)),
        itemBuilder: (context, i) => Padding(
          padding: EdgeInsetsDirectional.only(
              end: i == widget.children.length - 1 ? 0 : widget.gap),
          child: widget.children[i],
        ),
      ),
    );
    return Semantics(
      container: true,
      label: widget.semanticLabel,
      explicitChildNodes: true,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          row,
          if (widget.showDots && pages > 1) ...[
            const SizedBox(height: 4),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                for (var i = 0; i < pages; i++)
                  _Dot(
                    current: i == _page,
                    label: 'Halaman ${i + 1} dari $pages',
                    onPressed: () => _goTo(i),
                  ),
              ],
            ),
          ],
        ],
      ),
    );
  }
}

class _Dot extends StatelessWidget {
  const _Dot({
    required this.current,
    required this.label,
    required this.onPressed,
  });

  final bool current;
  final String label;
  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    return LdsPressable(
      onPressed: onPressed,
      pressedScale: 1,
      borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.pill)),
      selected: current,
      semanticLabel: label,
      excludeChildSemantics: true,
      builder: (context, state) => SizedBox(
        width: 24,
        height: 24,
        child: Center(
          child: AnimatedContainer(
            duration: context.ldsDuration(LdsMotion.smoothSpringDuration),
            curve: LdsSpringCurve.smooth,
            width: current ? 18 : 6,
            height: 6,
            decoration: BoxDecoration(
              color: current ? c.textStrong : c.textFaint,
              borderRadius: BorderRadius.circular(3),
            ),
          ),
        ),
      ),
    );
  }
}
