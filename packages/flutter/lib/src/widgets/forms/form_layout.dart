import 'dart:math' as math;

import 'package:flutter/widgets.dart';

/// The frame every form uses: fields stacked 20 px apart.
///
/// Put fields, [LdsFormRow]s and one [LdsFormActions] at the end in
/// [children].
class LdsForm extends StatelessWidget {
  /// Creates a form column.
  const LdsForm({super.key, required this.children, this.gap = 20});

  /// Fields, rows and actions, top to bottom.
  final List<Widget> children;

  /// Space between children.
  final double gap;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      mainAxisSize: MainAxisSize.min,
      children: [
        for (var i = 0; i < children.length; i++) ...[
          if (i > 0) SizedBox(height: gap),
          children[i],
        ],
      ],
    );
  }
}

/// Short fields side by side when each gets at least [minFieldWidth];
/// they stack on a phone: Kode pos next to Kota.
class LdsFormRow extends StatelessWidget {
  /// Creates a form row.
  const LdsFormRow({
    super.key,
    required this.children,
    this.minFieldWidth = 200,
    this.gap = 16,
  });

  /// Fields.
  final List<Widget> children;

  /// Narrowest a field may get before the row wraps.
  final double minFieldWidth;

  /// Space between fields, both ways.
  final double gap;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final w = constraints.maxWidth;
        final perRow = w.isFinite
            ? math.max(1, ((w + gap) / (minFieldWidth + gap)).floor())
            : children.length;
        final cols = math.min(perRow, children.length);
        final rows = <Widget>[];
        for (var start = 0; start < children.length; start += cols) {
          final end = math.min(start + cols, children.length);
          rows.add(
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                for (var i = start; i < start + cols; i++) ...[
                  if (i > start) SizedBox(width: gap),
                  Expanded(
                    child: i < end ? children[i] : const SizedBox.shrink(),
                  ),
                ],
              ],
            ),
          );
        }
        return Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          mainAxisSize: MainAxisSize.min,
          children: [
            for (var i = 0; i < rows.length; i++) ...[
              if (i > 0) SizedBox(height: gap),
              rows[i],
            ],
          ],
        );
      },
    );
  }
}

/// The buttons that end a form, right-aligned and wrapping on narrow
/// screens. Put the main action last.
class LdsFormActions extends StatelessWidget {
  /// Creates the actions row.
  const LdsFormActions({super.key, required this.children});

  /// Buttons, main action last.
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 4),
      child: Wrap(
        alignment: WrapAlignment.end,
        spacing: 10,
        runSpacing: 10,
        children: children,
      ),
    );
  }
}
