import 'package:flutter/material.dart';

import '../../theme.dart';
import '../../tokens.g.dart';

/// One party on an [LdsPaper]: who it is from or to.
@immutable
class LdsPaperParty {
  /// Creates a party.
  const LdsPaperParty(this.label, this.lines);

  /// "Dari" or "Kepada".
  final String label;

  /// Name first, then address lines.
  final List<String> lines;
}

/// One line item on an [LdsPaper].
@immutable
class LdsPaperLine {
  /// Creates a line item.
  const LdsPaperLine(this.description, this.quantity, this.price, this.amount);

  /// What was provided.
  final String description;

  /// How many.
  final String quantity;

  /// Price per unit.
  final String price;

  /// Line total.
  final String amount;
}

/// One label and amount row under the line items.
@immutable
class LdsPaperSum {
  /// Creates a sum row.
  const LdsPaperSum(this.label, this.amount, {this.total = false});

  /// "Subtotal", "Pajak", "Jumlah dibayar".
  final String label;

  /// The amount.
  final String amount;

  /// The amount due: larger and strong.
  final bool total;
}

/// A document sheet on screen: an invoice, a receipt, a retribution bill.
///
/// Brand and title at the top, number and dates, the parties, the line
/// items, the totals and a foot. [receipt] makes a narrow till receipt.
class LdsPaper extends StatelessWidget {
  /// Creates a paper.
  const LdsPaper({
    super.key,
    required this.title,
    required this.semanticLabel,
    this.brand,
    this.badge,
    this.meta = const <(String, String)>[],
    this.parties = const <LdsPaperParty>[],
    this.lines = const <LdsPaperLine>[],
    this.sums = const <LdsPaperSum>[],
    this.foot,
    this.receipt = false,
    this.columnLabels = const ('Uraian', 'Jumlah', 'Harga', 'Total'),
  });

  /// Document title, for example "Tagihan retribusi".
  final String title;

  /// Names the document for screen readers.
  final String semanticLabel;

  /// Issuer's mark and name, at the start of the head.
  final Widget? brand;

  /// Status next to the title, usually an [LdsBadge].
  final Widget? badge;

  /// Number and dates: label and value pairs.
  final List<(String, String)> meta;

  /// From and to.
  final List<LdsPaperParty> parties;

  /// Line items.
  final List<LdsPaperLine> lines;

  /// Totals.
  final List<LdsPaperSum> sums;

  /// Payment details and notes at the bottom.
  final Widget? foot;

  /// A till receipt: 400 px at most, centered foot.
  final bool receipt;

  /// Headers of the description, quantity, price and amount columns.
  final (String, String, String, String) columnLabels;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final label = LdsType.caption.copyWith(color: c.textMuted);
    final body = LdsType.subhead.copyWith(color: c.textDefault);
    final num =
        body.copyWith(fontFeatures: const [FontFeature.tabularFigures()]);

    Widget numCell(String t, {TextStyle? style}) =>
        Text(t, textAlign: TextAlign.end, style: style ?? num);

    final sheet = Container(
      padding: EdgeInsets.all(receipt ? 24 : 32),
      decoration: BoxDecoration(
        color: c.bgBase,
        borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.lg)),
        border: Border.all(color: c.line),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        mainAxisSize: MainAxisSize.min,
        children: [
          Wrap(
            alignment: WrapAlignment.spaceBetween,
            crossAxisAlignment: WrapCrossAlignment.center,
            spacing: 16,
            runSpacing: 12,
            children: [
              if (brand != null) brand!,
              Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Semantics(
                    header: true,
                    child: Text(title,
                        style: LdsType.title3.copyWith(color: c.textStrong)),
                  ),
                  if (badge != null) ...[const SizedBox(width: 10), badge!],
                ],
              ),
            ],
          ),
          if (meta.isNotEmpty) ...[
            const SizedBox(height: 24),
            Wrap(
              spacing: 32,
              runSpacing: 12,
              children: [
                for (final m in meta)
                  MergeSemantics(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text(m.$1, style: label),
                        const SizedBox(height: 2),
                        Text(m.$2,
                            style: num.copyWith(
                                color: c.textStrong,
                                fontWeight: FontWeight.w500)),
                      ],
                    ),
                  ),
              ],
            ),
          ],
          if (parties.isNotEmpty) ...[
            const SizedBox(height: 24),
            Wrap(
              spacing: 32,
              runSpacing: 16,
              children: [
                for (final p in parties)
                  ConstrainedBox(
                    constraints: const BoxConstraints(minWidth: 180),
                    child: MergeSemantics(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Text(p.label, style: label),
                          const SizedBox(height: 4),
                          for (var i = 0; i < p.lines.length; i++)
                            Text(
                              p.lines[i],
                              style: i == 0
                                  ? body.copyWith(
                                      color: c.textStrong,
                                      fontWeight: FontWeight.w500)
                                  : body,
                            ),
                        ],
                      ),
                    ),
                  ),
              ],
            ),
          ],
          if (lines.isNotEmpty) ...[
            const SizedBox(height: 24),
            Table(
              columnWidths: receipt
                  ? const {
                      0: FlexColumnWidth(3),
                      1: FlexColumnWidth(),
                      2: FixedColumnWidth(0),
                      3: FlexColumnWidth(2)
                    }
                  : const {
                      0: FlexColumnWidth(4),
                      1: FlexColumnWidth(),
                      2: FlexColumnWidth(2),
                      3: FlexColumnWidth(2)
                    },
              defaultVerticalAlignment: TableCellVerticalAlignment.middle,
              children: [
                TableRow(
                  decoration: BoxDecoration(
                    border: Border(bottom: BorderSide(color: c.lineStrong)),
                  ),
                  children: [
                    _pad(Text(columnLabels.$1, style: label)),
                    _pad(numCell(columnLabels.$2, style: label)),
                    receipt
                        ? const SizedBox.shrink()
                        : _pad(numCell(columnLabels.$3, style: label)),
                    _pad(numCell(columnLabels.$4, style: label)),
                  ],
                ),
                for (final l in lines)
                  TableRow(
                    decoration: BoxDecoration(
                      border: Border(bottom: BorderSide(color: c.hairline)),
                    ),
                    children: [
                      _pad(Text(l.description,
                          style: body.copyWith(color: c.textStrong))),
                      _pad(numCell(l.quantity)),
                      receipt
                          ? const SizedBox.shrink()
                          : _pad(numCell(l.price)),
                      _pad(numCell(l.amount)),
                    ],
                  ),
              ],
            ),
          ],
          if (sums.isNotEmpty) ...[
            const SizedBox(height: 16),
            Align(
              alignment: AlignmentDirectional.centerEnd,
              child: ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 320),
                child: Column(
                  children: [
                    for (final s in sums)
                      MergeSemantics(
                        child: Padding(
                          padding: EdgeInsets.only(top: s.total ? 10 : 4),
                          child: Row(
                            children: [
                              Expanded(
                                child: Text(
                                  s.label,
                                  style: s.total
                                      ? LdsType.headline
                                          .copyWith(color: c.textStrong)
                                      : body.copyWith(color: c.textSubtle),
                                ),
                              ),
                              Text(
                                s.amount,
                                style:
                                    (s.total ? LdsType.headline : num).copyWith(
                                  color: c.textStrong,
                                  fontFeatures: const [
                                    FontFeature.tabularFigures()
                                  ],
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                  ],
                ),
              ),
            ),
          ],
          if (foot != null) ...[
            const SizedBox(height: 32),
            Container(
              padding: const EdgeInsets.only(top: 16),
              decoration: BoxDecoration(
                border: Border(top: BorderSide(color: c.hairline)),
              ),
              child: DefaultTextStyle.merge(
                style: LdsType.footnote.copyWith(color: c.textSubtle),
                textAlign: receipt ? TextAlign.center : null,
                child: receipt ? Center(child: foot) : foot!,
              ),
            ),
          ],
        ],
      ),
    );
    return Semantics(
      label: semanticLabel,
      container: true,
      child: receipt
          ? ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 400), child: sheet)
          : sheet,
    );
  }

  static Widget _pad(Widget child) => Padding(
        padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 4),
        child: child,
      );
}
