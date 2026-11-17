import 'package:flutter/material.dart';

import '../../theme.dart';
import '../../tokens.g.dart';
import '../alert.dart';
import '../button.dart';
import '../empty_state.dart';
import '../skeleton.dart';

/// What a chart's data is doing right now.
enum LdsChartStatus {
  /// Data arrived: show the chart.
  ready,

  /// Waiting for data: a skeleton in the chart's shape.
  loading,

  /// Loaded with nothing in it: say why and offer one action.
  empty,

  /// The request failed: say what failed and offer to try again.
  error,
}

/// The shape a loading chart takes, so the card keeps its size.
enum LdsChartSkeletonShape {
  /// Bars of varying height (bar, combo chart).
  bars,

  /// Gridlines with a block (line, area chart).
  line,

  /// A circle (donut).
  donut,

  /// A half ring (gauge).
  gauge,

  /// A grid of squares (heatmap).
  heatmap,

  /// A label and a strip per row (ranked bars, funnel).
  rows,

  /// One strip (target bar, uptime bars).
  strip,
}

/// Swaps a chart for its loading, empty or error state in the same place
/// and at the same height, so a dashboard grid never shifts.
///
/// Put it inside an `LdsChartCard` so the question stays visible. Loading
/// is announced with [loadingLabel]; the error is announced as an alert.
class LdsChartStates extends StatelessWidget {
  /// Creates the state wrapper.
  const LdsChartStates({
    super.key,
    required this.status,
    required this.child,
    this.shape = LdsChartSkeletonShape.bars,
    this.height = 180,
    this.loadingLabel = 'Memuat grafik',
    this.emptyTitle = 'Belum ada data',
    this.emptyBody,
    this.emptyAction,
    this.errorTitle = 'Data grafik gagal dimuat',
    this.errorBody,
    this.onRetry,
    this.retryLabel = 'Coba lagi',
  });

  /// Which state to show.
  final LdsChartStatus status;

  /// The chart, shown when [status] is [LdsChartStatus.ready].
  final Widget child;

  /// Skeleton shape while loading.
  final LdsChartSkeletonShape shape;

  /// Height of the plot area kept in every state.
  final double height;

  /// Announced while loading ("Memuat grafik laporan").
  final String loadingLabel;

  /// What is missing for which period ("Belum ada laporan minggu ini").
  final String emptyTitle;

  /// When it fills in.
  final String? emptyBody;

  /// One action that changes the range ("Lihat minggu lalu").
  final Widget? emptyAction;

  /// What failed.
  final String errorTitle;

  /// Why, in plain words.
  final String? errorBody;

  /// Retries the request; shows a Try again button.
  final VoidCallback? onRetry;

  /// Label of the retry button.
  final String retryLabel;

  @override
  Widget build(BuildContext context) {
    switch (status) {
      case LdsChartStatus.ready:
        return child;
      case LdsChartStatus.loading:
        return Semantics(
          label: loadingLabel,
          liveRegion: true,
          child: ExcludeSemantics(
            child: SizedBox(height: height, child: _skeleton(context)),
          ),
        );
      case LdsChartStatus.empty:
        return ConstrainedBox(
          constraints: BoxConstraints(minHeight: height),
          child: Center(
            child: LdsEmptyState(
              title: emptyTitle,
              body: emptyBody,
              icon: 'bar_chart',
              action: emptyAction,
            ),
          ),
        );
      case LdsChartStatus.error:
        return ConstrainedBox(
          constraints: BoxConstraints(minHeight: height),
          child: Align(
            alignment: Alignment.topCenter,
            child: LdsAlert(
              title: errorTitle,
              body: errorBody,
              tone: LdsAlertTone.danger,
              actions: [
                if (onRetry != null)
                  LdsButton(
                    label: retryLabel,
                    icon: 'refresh',
                    variant: LdsButtonVariant.secondary,
                    size: LdsButtonSize.sm,
                    onPressed: onRetry,
                  ),
              ],
            ),
          ),
        );
    }
  }

  Widget _skeleton(BuildContext context) {
    switch (shape) {
      case LdsChartSkeletonShape.bars:
        const hs = [0.4, 0.7, 0.55, 0.85, 0.3, 0.2, 0.12];
        return Row(
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            for (var i = 0; i < hs.length; i++) ...[
              if (i > 0) const SizedBox(width: LdsSpace.s8),
              Expanded(child: LdsSkeleton(height: height * hs[i])),
            ],
          ],
        );
      case LdsChartSkeletonShape.line:
        final c = context.lds;
        return Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            for (var i = 0; i < 4; i++)
              Container(height: 1, color: c.hairline),
            const LdsSkeleton(height: 12, width: 120),
          ],
        );
      case LdsChartSkeletonShape.donut:
        return Center(child: LdsSkeleton.circle(size: height * 0.9));
      case LdsChartSkeletonShape.gauge:
        return Center(
          child: LdsSkeleton(
            width: height,
            height: height / 2,
            borderRadius: BorderRadius.vertical(top: Radius.circular(height / 2)),
          ),
        );
      case LdsChartSkeletonShape.heatmap:
        return LayoutBuilder(builder: (context, box) {
          const cols = 20;
          final cell = (box.maxWidth - (cols - 1) * 3) / cols;
          return Wrap(
            spacing: 3,
            runSpacing: 3,
            children: [
              for (var i = 0; i < cols * 5; i++)
                LdsSkeleton(
                  width: cell,
                  height: cell,
                  borderRadius: const BorderRadius.all(Radius.circular(3)),
                ),
            ],
          );
        });
      case LdsChartSkeletonShape.rows:
        return Column(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            for (var i = 0; i < 4; i++) ...[
              LdsSkeleton(height: 12, width: 80.0 + i * 20),
              const LdsSkeleton(height: 10),
            ],
          ],
        );
      case LdsChartSkeletonShape.strip:
        return const Align(
          alignment: Alignment.centerLeft,
          child: LdsSkeleton(height: 32),
        );
    }
  }
}
