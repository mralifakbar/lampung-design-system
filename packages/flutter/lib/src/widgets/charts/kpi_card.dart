import 'dart:math' as math;

import 'package:material_ui/material_ui.dart';

import '../../theme.dart';
import '../../tokens.g.dart';
import '../button.dart';
import '../icon.dart';
import '../pressable.dart';
import '../skeleton.dart';
import '_chart_utils.dart';
import 'chart_data.dart';
import 'sparkline.dart';

/// One metric on a dashboard: what it is, its value, how it changed against
/// a stated baseline, and optionally its recent shape as a sparkline or
/// mini bars.
///
/// The change always says what it is compared with ([baseline]). With
/// [onTap] the whole card opens the metric's report.
class LdsKpiCard extends StatelessWidget {
  /// Creates a KPI card.
  const LdsKpiCard({
    super.key,
    required this.label,
    this.value,
    this.unit,
    this.icon,
    this.menu,
    this.delta,
    this.baseline,
    this.spark,
    this.sparkLabel,
    this.bars,
    this.currentBar,
    this.onTap,
    this.loading = false,
    this.errorText,
    this.onRetry,
    this.retryLabel = 'Coba lagi',
  });

  /// What is measured ("Permohonan izin masuk").
  final String label;

  /// The figure, formatted ("1.284"). Null while loading or on error.
  final String? value;

  /// A unit after the figure ("hari").
  final String? unit;

  /// A quiet glyph tile before the label (ligature name).
  final String? icon;

  /// One menu button at the end of the head.
  final Widget? menu;

  /// The change, usually an `LdsTrendDelta`.
  final Widget? delta;

  /// What the change compares with ("dari 1.120 di Oktober"), or why there
  /// is none ("Bulan pertama").
  final String? baseline;

  /// A continuous measure along the bottom edge, oldest first.
  final List<double>? spark;

  /// The sparkline or bars trend in words.
  final String? sparkLabel;

  /// Counted per period: one mini bar per value.
  final List<double>? bars;

  /// Index of the current bar, in the series color; defaults to the last.
  final int? currentBar;

  /// Opens the metric's report.
  final VoidCallback? onTap;

  /// Shows skeletons in place of the value and change.
  final bool loading;

  /// When set, the value stays empty and this says what failed.
  final String? errorText;

  /// Retries after [errorText].
  final VoidCallback? onRetry;

  /// Label of the retry button.
  final String retryLabel;

  static const BorderRadius _radius = BorderRadius.all(
    Radius.circular(LdsRadius.lg),
  );

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final head = Row(
      children: [
        if (icon != null) ...[
          Container(
            width: 28,
            height: 28,
            alignment: Alignment.center,
            decoration: BoxDecoration(
              color: c.bgFill,
              borderRadius: const BorderRadius.all(
                Radius.circular(LdsRadius.sm),
              ),
            ),
            child: LdsIcon(icon!, size: 16, color: c.textSubtle),
          ),
          const SizedBox(width: LdsSpace.s8),
        ],
        Expanded(
          child: Text(
            label,
            style: LdsType.subhead.copyWith(color: c.textSubtle),
          ),
        ),
        ?menu,
      ],
    );

    Widget body;
    if (loading) {
      body = Semantics(
        label: 'Memuat $label',
        child: const Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(height: 4),
            LdsSkeleton(height: 28, width: 120),
            SizedBox(height: 8),
            LdsSkeleton(height: 14, width: 160),
          ],
        ),
      );
    } else if (errorText != null) {
      body = Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SizedBox(height: 4),
          Semantics(
            liveRegion: true,
            child: Text(
              errorText!,
              style: LdsType.footnote.copyWith(color: c.dangerText),
            ),
          ),
          if (onRetry != null) ...[
            const SizedBox(height: 6),
            LdsButton(
              label: retryLabel,
              variant: LdsButtonVariant.plain,
              size: LdsButtonSize.sm,
              onPressed: onRetry,
            ),
          ],
        ],
      );
    } else {
      body = Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SizedBox(height: 2),
          Text.rich(
            TextSpan(
              children: [
                TextSpan(text: value ?? ''),
                if (unit != null)
                  TextSpan(
                    text: ' $unit',
                    style: LdsType.bodyStrong.copyWith(
                      letterSpacing: 0,
                      color: c.textSubtle,
                    ),
                  ),
              ],
            ),
            style: TextStyle(
              fontFamily: LdsType.family,
              fontSize: 28,
              height: 32 / 28,
              fontWeight: FontWeight.w600,
              letterSpacing: -0.84,
              color: c.textStrong,
              fontFeatures: tabular,
            ),
          ),
          if (delta != null || baseline != null) ...[
            const SizedBox(height: 6),
            Wrap(
              spacing: 6,
              crossAxisAlignment: WrapCrossAlignment.center,
              children: [
                ?delta,
                if (baseline != null)
                  Text(
                    baseline!,
                    style: LdsType.footnote.copyWith(color: c.textSubtle),
                  ),
              ],
            ),
          ],
        ],
      );
    }

    final hasSpark = !loading && errorText == null && (spark?.length ?? 0) >= 2;
    final hasBars =
        !loading && errorText == null && (bars?.isNotEmpty ?? false);

    Widget card(bool active) => Container(
      clipBehavior: Clip.antiAlias,
      decoration: BoxDecoration(
        color: c.bgBase,
        borderRadius: _radius,
        border: Border.all(color: active ? c.lineStrong : c.line),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        mainAxisSize: MainAxisSize.min,
        children: [
          Padding(
            padding: EdgeInsets.fromLTRB(16, 16, 16, hasSpark ? 4 : 16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              mainAxisSize: MainAxisSize.min,
              children: [
                head,
                const SizedBox(height: 6),
                body,
                if (hasBars) ...[
                  const SizedBox(height: 12),
                  _MiniBars(
                    values: bars!,
                    current: currentBar ?? bars!.length - 1,
                    label: sparkLabel ?? label,
                  ),
                ],
              ],
            ),
          ),
          if (hasSpark)
            LdsSparkline(
              values: spark!,
              semanticLabel: sparkLabel ?? label,
              width: null,
              height: 52,
              bleed: true,
            ),
        ],
      ),
    );

    if (onTap == null) {
      return Semantics(container: true, child: card(false));
    }
    return LdsPressable(
      onPressed: onTap,
      pressedScale: 0.985,
      borderRadius: _radius,
      builder: (context, state) => card(state.hovered),
    );
  }
}

class _MiniBars extends StatelessWidget {
  const _MiniBars({
    required this.values,
    required this.current,
    required this.label,
  });

  final List<double> values;
  final int current;
  final String label;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final max = values.fold<double>(0, math.max);
    return Semantics(
      label: label,
      image: true,
      child: SizedBox(
        height: 32,
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            for (var i = 0; i < values.length; i++) ...[
              if (i > 0) const SizedBox(width: 3),
              Expanded(
                child: FractionallySizedBox(
                  heightFactor: max <= 0
                      ? 0.06
                      : math.max(0.06, values[i] / max),
                  alignment: Alignment.bottomCenter,
                  child: Container(
                    decoration: BoxDecoration(
                      color: i == current
                          ? LdsSeriesColor.series1.resolve(c)
                          : c.accentTintStrong,
                      borderRadius: const BorderRadius.vertical(
                        top: Radius.circular(2),
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
