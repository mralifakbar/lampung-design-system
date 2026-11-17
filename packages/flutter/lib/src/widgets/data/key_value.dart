import 'package:flutter/material.dart';

import '../../theme.dart';
import '../../tokens.g.dart';

/// One label and value pair: "NIK" and "1871 0123 4567 0001".
///
/// A missing value reads [emptyLabel], never a blank or a dash.
class LdsKeyValue extends StatelessWidget {
  /// Creates a pair with a text value.
  const LdsKeyValue(
    this.label,
    this.value, {
    super.key,
    this.emptyLabel = 'Belum diisi',
  }) : child = null;

  /// Creates a pair with a widget value, for example an [LdsBadge] or a
  /// skeleton while loading.
  const LdsKeyValue.widget(
    this.label,
    Widget this.child, {
    super.key,
  })  : value = null,
        emptyLabel = '';

  /// The label.
  final String label;

  /// The value text; null or empty shows [emptyLabel].
  final String? value;

  /// A widget in place of [value].
  final Widget? child;

  /// Text for a missing value.
  final String emptyLabel;

  @override
  Widget build(BuildContext context) =>
      _KeyValueRow(pair: this, style: _PairStyle.bare);
}

/// How an [LdsKeyValueList] draws its box.
enum LdsKeyValueVariant {
  /// Bare rows, no box. Inside cards, dialogs and list rows.
  bare,

  /// Its own box on the quiet fill; values semibold.
  fill,

  /// A base-colored box with a ring, for use on the quiet fill.
  base,
}

/// A list of [LdsKeyValue] pairs with hairlines between rows.
class LdsKeyValueList extends StatelessWidget {
  /// Creates a key-value list.
  const LdsKeyValueList({
    super.key,
    required this.children,
    this.variant = LdsKeyValueVariant.fill,
    this.stacked = false,
  });

  /// The pairs.
  final List<LdsKeyValue> children;

  /// Box style.
  final LdsKeyValueVariant variant;

  /// Label above value, left-aligned, for long values.
  final bool stacked;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final boxed = variant != LdsKeyValueVariant.bare;
    final style = stacked
        ? _PairStyle.stacked
        : boxed
            ? _PairStyle.boxed
            : _PairStyle.bare;
    final rows = <Widget>[
      for (var i = 0; i < children.length; i++) ...[
        if (i > 0) Divider(height: 1, thickness: 1, color: c.hairline),
        _KeyValueRow(pair: children[i], style: style),
      ],
    ];
    final column = Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      mainAxisSize: MainAxisSize.min,
      children: rows,
    );
    if (!boxed) return column;
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
      decoration: BoxDecoration(
        color: variant == LdsKeyValueVariant.base ? c.bgBase : c.bgFill,
        borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.lg)),
        border: variant == LdsKeyValueVariant.base
            ? Border.all(color: c.line)
            : null,
      ),
      child: column,
    );
  }
}

enum _PairStyle { bare, boxed, stacked }

class _KeyValueRow extends StatelessWidget {
  const _KeyValueRow({required this.pair, required this.style});

  final LdsKeyValue pair;
  final _PairStyle style;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final missing = pair.child == null && (pair.value ?? '').isEmpty;
    final labelText = Text(
      pair.label,
      style: LdsType.subhead.copyWith(height: 20 / 14, color: c.textSubtle),
    );
    final Widget valueWidget = pair.child ??
        Text(
          missing ? pair.emptyLabel : pair.value!,
          textAlign:
              style == _PairStyle.stacked ? TextAlign.start : TextAlign.end,
          style: LdsType.subhead.copyWith(
            height: style == _PairStyle.stacked ? 1.55 : 20 / 14,
            color: missing ? c.textMuted : c.textStrong,
            fontWeight:
                style == _PairStyle.boxed ? FontWeight.w600 : FontWeight.w500,
            fontFeatures: const [FontFeature.tabularFigures()],
          ),
        );
    if (style == _PairStyle.stacked) {
      return MergeSemantics(
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 10),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [labelText, const SizedBox(height: 2), valueWidget],
          ),
        ),
      );
    }
    return MergeSemantics(
      child: ConstrainedBox(
        constraints:
            BoxConstraints(minHeight: style == _PairStyle.boxed ? 48 : 44),
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 8),
          child: Row(
            children: [
              Flexible(child: labelText),
              const SizedBox(width: 16),
              Expanded(
                child: Align(
                  alignment: AlignmentDirectional.centerEnd,
                  child: valueWidget,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
