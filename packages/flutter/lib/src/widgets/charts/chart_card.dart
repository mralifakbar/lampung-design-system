import 'package:material_ui/material_ui.dart';

import '../../theme.dart';
import '../../tokens.g.dart';
import '_chart_utils.dart';

/// The frame every dashboard chart sits in.
///
/// The [question] the chart answers is its title ("Hari apa yang paling
/// sibuk?"), [subtitle] says what is measured over which period, then
/// optional [actions] (a range control, one menu), the headline [figure],
/// the chart itself, and a [footer] with the data time or one link.
///
/// A chart card is never nested in another card.
class LdsChartCard extends StatelessWidget {
  /// Creates a chart card.
  const LdsChartCard({
    super.key,
    required this.question,
    required this.child,
    this.subtitle,
    this.actions,
    this.figure,
    this.footer,
    this.footerTrailing,
    this.minHeight,
  });

  /// The question the chart answers, as a sentence.
  final String question;

  /// What is measured and over which period.
  final String? subtitle;

  /// A range control and at most one menu button, at the end of the head.
  final Widget? actions;

  /// The one number the reader came for, usually an [LdsChartFigure].
  final Widget? figure;

  /// The chart, or an `LdsChartStates` around it.
  final Widget child;

  /// Data time at the start of the footer ("Diperbarui 08.00 WIB").
  final String? footer;

  /// One plain link to the full view, at the end of the footer.
  final Widget? footerTrailing;

  /// Keeps the card from shrinking while loading or empty.
  final double? minHeight;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final titles = Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        Semantics(
          header: true,
          child: Text(
            question,
            style: LdsType.bodyStrong.copyWith(
              fontWeight: FontWeight.w600,
              height: 20 / 15,
              letterSpacing: -0.15,
              color: c.textStrong,
            ),
          ),
        ),
        if (subtitle != null)
          Padding(
            padding: const EdgeInsets.only(top: 2),
            child: Text(
              subtitle!,
              style: LdsType.footnote.copyWith(color: c.textSubtle),
            ),
          ),
      ],
    );
    final hasFooter = footer != null || footerTrailing != null;
    return Semantics(
      container: true,
      explicitChildNodes: true,
      child: Container(
        constraints: BoxConstraints(minHeight: minHeight ?? 0),
        padding: const EdgeInsets.all(LdsSpace.s20),
        decoration: BoxDecoration(
          color: c.bgBase,
          borderRadius: const BorderRadius.all(Radius.circular(18)),
          border: Border.all(color: c.line),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          mainAxisSize: MainAxisSize.min,
          children: [
            if (actions == null)
              titles
            else
              Wrap(
                alignment: WrapAlignment.spaceBetween,
                spacing: LdsSpace.s12,
                runSpacing: LdsSpace.s12,
                children: [titles, actions!],
              ),
            if (figure != null) ...[const SizedBox(height: 14), figure!],
            const SizedBox(height: 14),
            child,
            if (hasFooter) ...[
              const SizedBox(height: 14),
              Divider(height: 1, thickness: 1, color: c.hairline),
              const SizedBox(height: LdsSpace.s12),
              Row(
                children: [
                  if (footer != null)
                    Expanded(
                      child: Text(
                        footer!,
                        style: LdsType.footnote.copyWith(
                          color: c.textSubtle,
                          fontFeatures: tabular,
                        ),
                      ),
                    )
                  else
                    const Spacer(),
                  ?footerTrailing,
                ],
              ),
            ],
          ],
        ),
      ),
    );
  }
}

/// The headline number of a chart card: 32 px tabular, with an optional
/// change (an `LdsTrendDelta`) and what it compares with.
class LdsChartFigure extends StatelessWidget {
  /// Creates a figure.
  const LdsChartFigure(this.value, {super.key, this.delta, this.note});

  /// The number, already formatted ("1.284").
  final String value;

  /// The change, usually an `LdsTrendDelta`.
  final Widget? delta;

  /// What the change compares with ("dari Oktober").
  final String? note;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    return Wrap(
      crossAxisAlignment: WrapCrossAlignment.center,
      spacing: LdsSpace.s8,
      runSpacing: LdsSpace.s4,
      children: [
        Text(
          value,
          style: TextStyle(
            fontFamily: LdsType.family,
            fontSize: 32,
            height: 36 / 32,
            fontWeight: FontWeight.w600,
            letterSpacing: -0.96,
            color: c.textStrong,
            fontFeatures: tabular,
          ),
        ),
        ?delta,
        if (note != null)
          Text(note!, style: LdsType.footnote.copyWith(color: c.textSubtle)),
      ],
    );
  }
}
