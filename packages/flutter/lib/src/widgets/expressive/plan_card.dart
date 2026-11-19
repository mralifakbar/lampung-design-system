import 'package:material_ui/material_ui.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../button.dart';
import '../icon.dart';
import 'text_morph.dart';

/// How often a plan is billed.
enum LdsBillingPeriod {
  /// Billed every month.
  month,

  /// Billed once a year.
  year,
}

/// One plan shown by an [LdsPlanCard].
@immutable
class LdsPlan {
  /// Creates a plan.
  const LdsPlan({
    required this.name,
    required this.monthlyPrice,
    required this.yearlyPrice,
    this.description,
    this.currency = 'Rp',
    this.periodLabel = 'per bulan',
    this.monthlyNote,
    this.yearlyNote,
    this.featuresTitle,
    this.features = const [],
    this.actionLabel,
    this.onSelect,
    this.featured = false,
  });

  /// Plan name.
  final String name;

  /// Who it is for.
  final String? description;

  /// Price per month when billed monthly.
  final num monthlyPrice;

  /// Price per month when billed yearly.
  final num yearlyPrice;

  /// Currency shown before the amount.
  final String currency;

  /// Period shown after the amount.
  final String periodLabel;

  /// Billing detail when billed monthly.
  final String? monthlyNote;

  /// Billing detail when billed yearly; say the yearly total here.
  final String? yearlyNote;

  /// Heading above [features], for example "Semua di Dasar, ditambah".
  final String? featuresTitle;

  /// What is included.
  final List<String> features;

  /// Label of the plan button, named for what happens ("Pilih Dasar").
  final String? actionLabel;

  /// Chooses the plan.
  final VoidCallback? onSelect;

  /// The one plan most buyers need: base color with a 2 px accent ring.
  final bool featured;

  /// The amount for [period].
  num priceFor(LdsBillingPeriod period) =>
      period == LdsBillingPeriod.month ? monthlyPrice : yearlyPrice;

  /// The note for [period].
  String? noteFor(LdsBillingPeriod period) =>
      period == LdsBillingPeriod.month ? monthlyNote : yearlyNote;
}

/// Formats [value] with Indonesian thousands separators: 150000 -> 150.000.
String ldsFormatAmount(num value) {
  final whole = value.round().abs().toString();
  final out = StringBuffer(value < 0 ? '-' : '');
  for (var i = 0; i < whole.length; i++) {
    if (i > 0 && (whole.length - i) % 3 == 0) out.write('.');
    out.write(whole[i]);
  }
  return out.toString();
}

/// A pricing plan card: name, who it is for, the price that rolls when the
/// [period] changes, a billing note that morphs, what is included, and the
/// plan button pushed to the bottom so buttons line up across cards.
///
/// Under reduced motion digits and words swap at once.
class LdsPlanCard extends StatelessWidget {
  /// Creates a plan card.
  const LdsPlanCard({
    super.key,
    required this.plan,
    required this.period,
    this.fillHeight = false,
  });

  /// The plan.
  final LdsPlan plan;

  /// The billing period shown.
  final LdsBillingPeriod period;

  /// Push the button to the bottom of a card stretched to a row height
  /// (needs a bounded height, as in [LdsPlans]).
  final bool fillHeight;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final reduce = context.ldsReduceMotion;
    final amount = ldsFormatAmount(plan.priceFor(period));
    final note = plan.noteFor(period);
    final price = Semantics(
      label: '${plan.currency} $amount ${plan.periodLabel}',
      excludeSemantics: true,
      child: Wrap(
        crossAxisAlignment: WrapCrossAlignment.end,
        spacing: LdsSpace.s8,
        runSpacing: LdsSpace.s2,
        children: [
          FittedBox(
            fit: BoxFit.scaleDown,
            alignment: Alignment.bottomLeft,
            child: Row(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Padding(
                  padding: const EdgeInsets.only(top: 6, right: 3),
                  child: Text(
                    plan.currency,
                    style: TextStyle(
                      fontFamily: LdsType.family,
                      fontSize: 24,
                      height: 1,
                      fontWeight: FontWeight.w600,
                      color: c.textStrong,
                    ),
                  ),
                ),
                ClipRect(
                  child: AnimatedSwitcher(
                    duration: reduce
                        ? Duration.zero
                        : LdsMotion.smoothSpringDuration,
                    switchInCurve: LdsSpringCurve.smooth,
                    switchOutCurve: LdsSpringCurve.smooth,
                    transitionBuilder: (child, animation) {
                      final incoming = child.key == ValueKey<String>(amount);
                      return SlideTransition(
                        position: Tween<Offset>(
                          begin: Offset(0, incoming ? 1 : -1),
                          end: Offset.zero,
                        ).animate(animation),
                        child: child,
                      );
                    },
                    child: Text(
                      amount,
                      key: ValueKey<String>(amount),
                      style: TextStyle(
                        fontFamily: LdsType.family,
                        fontSize: 48,
                        height: 1,
                        fontWeight: FontWeight.w600,
                        letterSpacing: -0.045 * 48,
                        fontFeatures: const [FontFeature.tabularFigures()],
                        color: c.textStrong,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.only(bottom: LdsSpace.s6),
            child: Text(
              plan.periodLabel,
              style: LdsType.footnote.copyWith(color: c.textSubtle),
            ),
          ),
        ],
      ),
    );

    final children = <Widget>[
      Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          Semantics(
            header: true,
            child: Text(
              plan.name,
              style: LdsType.title3.copyWith(color: c.textStrong),
            ),
          ),
          if (plan.description != null) ...[
            const SizedBox(height: LdsSpace.s6),
            Text(
              plan.description!,
              style: LdsType.subhead.copyWith(color: c.textSubtle),
            ),
          ],
        ],
      ),
      Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          price,
          const SizedBox(height: LdsSpace.s4),
          SizedBox(
            height: 18,
            child: note == null
                ? null
                : LdsTextMorph(
                    note,
                    style: LdsType.footnote.copyWith(color: c.textSubtle),
                  ),
          ),
        ],
      ),
      if (plan.features.isNotEmpty)
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            if (plan.featuresTitle != null) ...[
              Text(
                plan.featuresTitle!,
                style: LdsType.caption.copyWith(color: c.textSubtle),
              ),
              const SizedBox(height: LdsSpace.s10),
            ],
            for (var i = 0; i < plan.features.length; i++) ...[
              if (i > 0) const SizedBox(height: LdsSpace.s10),
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Padding(
                    padding: const EdgeInsets.only(top: 1),
                    child: LdsIcon('check', size: 18, color: c.textStrong),
                  ),
                  const SizedBox(width: LdsSpace.s10),
                  Expanded(
                    child: Text(
                      plan.features[i],
                      style: LdsType.subhead.copyWith(color: c.textDefault),
                    ),
                  ),
                ],
              ),
            ],
          ],
        ),
    ];

    return Semantics(
      container: true,
      label: plan.name,
      child: DecoratedBox(
        decoration: BoxDecoration(
          color: plan.featured ? c.bgBase : c.bgFill,
          borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.xl)),
          border: plan.featured ? Border.all(color: c.accent, width: 2) : null,
        ),
        child: Padding(
          padding: const EdgeInsets.fromLTRB(
            LdsSpace.s24,
            LdsSpace.s28,
            LdsSpace.s24,
            LdsSpace.s24,
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              for (var i = 0; i < children.length; i++) ...[
                if (i > 0) const SizedBox(height: LdsSpace.s20),
                children[i],
              ],
              if (plan.actionLabel != null) ...[
                if (fillHeight) const Spacer(),
                const SizedBox(height: LdsSpace.s20),
                LdsButton(
                  label: plan.actionLabel!,
                  onPressed: plan.onSelect,
                  expand: true,
                  variant: plan.featured
                      ? LdsButtonVariant.primary
                      : LdsButtonVariant.secondary,
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}
