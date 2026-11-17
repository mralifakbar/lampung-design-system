import 'package:flutter/material.dart';

import '../../theme.dart';
import '../../tokens.g.dart';
import '../icon.dart';

/// One column of an [LdsCompareTable]: a plan, package or option.
@immutable
class LdsComparePlan {
  /// Creates a plan column.
  const LdsComparePlan(this.name, {this.price, this.featured = false});

  /// Plan name.
  final String name;

  /// Price or short note under the name.
  final String? price;

  /// The recommended plan: its column sits on the quiet fill.
  final bool featured;
}

/// One cell of an [LdsCompareTable].
@immutable
class LdsCompareValue {
  /// Included: a check, announced as [label].
  const LdsCompareValue.yes([this.label = 'Termasuk'])
      : text = null,
        included = true;

  /// Not included: a dash, announced as [label].
  const LdsCompareValue.no([this.label = 'Tidak termasuk'])
      : text = null,
        included = false;

  /// A short value, for example "Semua 143" or "3 sampai 50".
  const LdsCompareValue.text(String this.text)
      : label = text,
        included = true;

  /// Short value text, or null for an icon.
  final String? text;

  /// Announced text.
  final String label;

  /// Whether the feature is included.
  final bool included;
}

/// One feature row of an [LdsCompareTable].
@immutable
class LdsCompareRow {
  /// Creates a row.
  const LdsCompareRow(this.feature, this.values);

  /// Feature name.
  final String feature;

  /// One value per plan.
  final List<LdsCompareValue> values;
}

/// A titled group of rows.
@immutable
class LdsCompareGroup {
  /// Creates a group.
  const LdsCompareGroup(this.title, this.rows);

  /// Group heading.
  final String title;

  /// Rows in the group.
  final List<LdsCompareRow> rows;
}

/// Features of a few plans side by side, grouped, with the recommended plan
/// on the quiet fill.
///
/// The feature column stays pinned while the plan columns scroll sideways
/// on narrow screens.
class LdsCompareTable extends StatelessWidget {
  /// Creates a comparison table.
  const LdsCompareTable({
    super.key,
    required this.plans,
    required this.groups,
    this.caption,
    this.featureLabel = 'Fitur',
    this.featureWidth = 168,
    this.planMinWidth = 132,
    this.rowHeight = 52,
  });

  /// The plan columns.
  final List<LdsComparePlan> plans;

  /// Groups of feature rows.
  final List<LdsCompareGroup> groups;

  /// Title above the table.
  final String? caption;

  /// Header of the feature column.
  final String featureLabel;

  /// Width of the pinned feature column.
  final double featureWidth;

  /// Narrowest a plan column gets before the plans scroll.
  final double planMinWidth;

  /// Height of a feature row; feature names wrap to two lines.
  final double rowHeight;

  static const double _headHeight = 76;
  static const double _groupHeight = 44;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final featureCells = <Widget>[
      _cell(
        context,
        height: _headHeight,
        strongLine: true,
        align: AlignmentDirectional.bottomStart,
        child: Text(featureLabel,
            style: LdsType.headline.copyWith(color: c.textStrong)),
      ),
    ];
    for (final g in groups) {
      featureCells.add(_cell(
        context,
        height: _groupHeight,
        align: AlignmentDirectional.bottomStart,
        child: Semantics(
          header: true,
          child: Text(g.title,
              style: LdsType.subhead
                  .copyWith(color: c.textStrong, fontWeight: FontWeight.w600)),
        ),
      ));
      for (final r in g.rows) {
        featureCells.add(_cell(
          context,
          height: rowHeight,
          child: Text(r.feature,
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
              style: LdsType.subhead.copyWith(color: c.textDefault)),
        ));
      }
    }

    Widget planColumn(int p, double width) {
      final plan = plans[p];
      final cells = <Widget>[
        _cell(
          context,
          height: _headHeight,
          strongLine: true,
          align: Alignment.bottomCenter,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(plan.name,
                  textAlign: TextAlign.center,
                  style: LdsType.headline.copyWith(color: c.textStrong)),
              if (plan.price != null)
                Text(plan.price!,
                    textAlign: TextAlign.center,
                    style: LdsType.footnote.copyWith(color: c.textSubtle)),
            ],
          ),
        ),
      ];
      for (final g in groups) {
        cells
            .add(_cell(context, height: _groupHeight, child: const SizedBox()));
        for (final r in g.rows) {
          final v = r.values[p];
          cells.add(_cell(
            context,
            height: rowHeight,
            align: Alignment.center,
            child: Semantics(
              label: '${r.feature}, ${plan.name}: ${v.label}',
              excludeSemantics: true,
              child: v.text != null
                  ? Text(v.text!,
                      textAlign: TextAlign.center,
                      style: LdsType.subhead.copyWith(color: c.textDefault))
                  : LdsIcon(v.included ? 'check' : 'remove',
                      color: v.included ? c.textStrong : c.textFaint),
            ),
          ));
        }
      }
      return Container(
        width: width,
        decoration: plan.featured
            ? BoxDecoration(
                color: c.bgFill,
                borderRadius:
                    const BorderRadius.all(Radius.circular(LdsRadius.md)),
              )
            : null,
        child: Column(children: cells),
      );
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        if (caption != null) ...[
          Semantics(
            header: true,
            child: Text(caption!,
                style: LdsType.title3.copyWith(color: c.textStrong)),
          ),
          const SizedBox(height: 16),
        ],
        LayoutBuilder(builder: (context, box) {
          final rest =
              (box.maxWidth.isFinite ? box.maxWidth : 0) - featureWidth;
          final planWidth = plans.isEmpty
              ? planMinWidth
              : (rest / plans.length).clamp(planMinWidth, double.infinity);
          return Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SizedBox(
                  width: featureWidth, child: Column(children: featureCells)),
              Expanded(
                child: SingleChildScrollView(
                  scrollDirection: Axis.horizontal,
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      for (var p = 0; p < plans.length; p++)
                        planColumn(p, planWidth.toDouble()),
                    ],
                  ),
                ),
              ),
            ],
          );
        }),
      ],
    );
  }

  Widget _cell(
    BuildContext context, {
    required double height,
    required Widget child,
    AlignmentGeometry align = AlignmentDirectional.centerStart,
    bool strongLine = false,
  }) {
    final c = context.lds;
    return Container(
      height: height,
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      alignment: align,
      decoration: BoxDecoration(
        border: Border(
          bottom: BorderSide(color: strongLine ? c.lineStrong : c.hairline),
        ),
      ),
      child: child,
    );
  }
}
