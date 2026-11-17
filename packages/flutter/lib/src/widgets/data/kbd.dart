import 'package:flutter/material.dart';

import '../../theme.dart';
import '../../tokens.g.dart';

/// One keyboard key in instructions: Ctrl, K, Enter.
class LdsKbd extends StatelessWidget {
  /// Creates a key label.
  const LdsKbd(this.label, {super.key});

  /// The key as printed on the keyboard.
  final String label;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    // The outer align lets the key keep its own size when the parent forces
    // a full width, such as a list or a stretched column.
    return Align(
      alignment: AlignmentDirectional.centerStart,
      widthFactor: 1,
      heightFactor: 1,
      child: _key(c),
    );
  }

  Widget _key(LdsColors c) {
    return Container(
      constraints: const BoxConstraints(minWidth: 22),
      height: 22,
      padding: const EdgeInsets.symmetric(horizontal: 6),
      decoration: BoxDecoration(
        color: c.bgBase,
        borderRadius: const BorderRadius.all(Radius.circular(6)),
        border: Border(
          top: BorderSide(color: c.lineStrong),
          left: BorderSide(color: c.lineStrong),
          right: BorderSide(color: c.lineStrong),
          bottom: BorderSide(color: c.lineStrong, width: 2.5),
        ),
      ),
      // Factors of 1 keep the key at its label width in a wide parent.
      child: Center(
        widthFactor: 1,
        heightFactor: 1,
        child: Text(
          label,
          maxLines: 1,
          style: TextStyle(
            fontFamily: LdsType.family,
            fontSize: 12,
            height: 1,
            fontWeight: FontWeight.w500,
            color: c.textSubtle,
          ),
        ),
      ),
    );
  }
}

/// A key combination: keys 4 px apart, read as one phrase ("Ctrl plus K").
class LdsKbdRow extends StatelessWidget {
  /// Creates a key combination.
  const LdsKbdRow(this.keys, {super.key, this.semanticLabel});

  /// The keys, in the order they are pressed.
  final List<String> keys;

  /// Overrides the announced combination.
  final String? semanticLabel;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      label: semanticLabel ?? keys.join(' plus '),
      excludeSemantics: true,
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          for (var i = 0; i < keys.length; i++) ...[
            if (i > 0) const SizedBox(width: 4),
            LdsKbd(keys[i]),
          ],
        ],
      ),
    );
  }
}
