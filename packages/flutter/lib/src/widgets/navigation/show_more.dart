import 'package:material_ui/material_ui.dart';

import '../button.dart';
import 'height_expand.dart';

/// The first few items of a list, then a plain button that reveals the rest
/// in place on the smooth spring, and folds it back.
///
/// The rest keeps its layout while it opens; nothing fades or slides
/// sideways. While closed the rest is hidden from focus and screen readers.
class LdsShowMore extends StatefulWidget {
  /// Creates a show more list.
  const LdsShowMore({
    super.key,
    required this.visible,
    required this.rest,
    this.moreLabel,
    this.lessLabel = 'Tampilkan lebih sedikit',
    this.initiallyOpen = false,
    this.spacing = 0,
  });

  /// The items always shown.
  final List<Widget> visible;

  /// The items revealed by the button.
  final List<Widget> rest;

  /// Button text while closed. Defaults to "Tampilkan N lainnya".
  final String? moreLabel;

  /// Button text while open.
  final String lessLabel;

  /// Show the rest on first build.
  final bool initiallyOpen;

  /// Space between items.
  final double spacing;

  @override
  State<LdsShowMore> createState() => _LdsShowMoreState();
}

class _LdsShowMoreState extends State<LdsShowMore> {
  late bool _open = widget.initiallyOpen;

  List<Widget> _spaced(List<Widget> items, {bool leading = false}) => [
    for (var i = 0; i < items.length; i++) ...[
      if ((i > 0 || leading) && widget.spacing > 0)
        SizedBox(height: widget.spacing),
      items[i],
    ],
  ];

  @override
  Widget build(BuildContext context) {
    final more = widget.moreLabel ?? 'Tampilkan ${widget.rest.length} lainnya';
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      mainAxisSize: MainAxisSize.min,
      children: [
        ..._spaced(widget.visible),
        LdsHeightExpand(
          open: _open,
          fade: false,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            mainAxisSize: MainAxisSize.min,
            children: _spaced(widget.rest, leading: widget.visible.isNotEmpty),
          ),
        ),
        if (widget.rest.isNotEmpty)
          Align(
            alignment: AlignmentDirectional.centerStart,
            child: MergeSemantics(
              child: Semantics(
                expanded: _open,
                child: LdsButton(
                  label: _open ? widget.lessLabel : more,
                  variant: LdsButtonVariant.plain,
                  size: LdsButtonSize.sm,
                  onPressed: () => setState(() => _open = !_open),
                ),
              ),
            ),
          ),
      ],
    );
  }
}
