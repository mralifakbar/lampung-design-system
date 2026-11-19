import 'dart:math' as math;

import 'package:material_ui/material_ui.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../icon.dart';
import '../pressable.dart';
import '../skeleton.dart';

/// One column of an [LdsTable].
@immutable
class LdsTableColumn {
  /// Creates a column.
  const LdsTableColumn(
    this.label, {
    this.numeric = false,
    this.sortable = false,
    this.minWidth = 120,
    this.flex = 1,
  });

  /// Header text.
  final String label;

  /// Right-aligned tabular figures. Use it for every numeric column.
  final bool numeric;

  /// The header is a button that sorts by this column.
  final bool sortable;

  /// Narrowest width before the table scrolls sideways.
  final double minWidth;

  /// Share of the spare width.
  final int flex;
}

/// One row of an [LdsTable].
@immutable
class LdsTableRow {
  /// Creates a row of text cells; the first cell names the row.
  const LdsTableRow(
    List<String> this.cells, {
    this.selected = false,
    this.onTap,
  }) : widgets = null;

  /// Creates a row of widget cells, for badges, avatars or checkboxes.
  const LdsTableRow.widgets(
    List<Widget> this.widgets, {
    this.selected = false,
    this.onTap,
  }) : cells = null;

  /// Text cells.
  final List<String>? cells;

  /// Widget cells.
  final List<Widget>? widgets;

  /// Selected rows sit on the accent tint.
  final bool selected;

  /// Makes the row pressable.
  final VoidCallback? onTap;

  /// Number of cells.
  int get length => cells?.length ?? widgets!.length;
}

/// Records in rows and columns, on a white surface with a ring.
///
/// Header 40 px on the quiet fill, rows 52 px (40 px with [compact]) with a
/// hairline between them. Wide tables scroll sideways inside the box.
/// Sorting is controlled: pass [sortColumn] and [sortAscending] and handle
/// [onSort].
class LdsTable extends StatelessWidget {
  /// Creates a table.
  const LdsTable({
    super.key,
    required this.columns,
    required this.rows,
    this.sortColumn,
    this.sortAscending = true,
    this.onSort,
    this.wrap = false,
    this.compact = false,
    this.loading = false,
    this.loadingRows = 5,
    this.empty,
    this.semanticLabel,
  });

  /// The columns.
  final List<LdsTableColumn> columns;

  /// The rows; each has one cell per column.
  final List<LdsTableRow> rows;

  /// Index of the sorted column.
  final int? sortColumn;

  /// Sort direction of [sortColumn].
  final bool sortAscending;

  /// Called with a column index when its sortable header is pressed.
  final ValueChanged<int>? onSort;

  /// Text tables: cells wrap, top-aligned.
  final bool wrap;

  /// 40 px rows, for people who scan many rows.
  final bool compact;

  /// Shows skeleton rows under the header.
  final bool loading;

  /// How many skeleton rows to show while [loading].
  final int loadingRows;

  /// Shown under the header when [rows] is empty, usually an
  /// [LdsEmptyState].
  final Widget? empty;

  /// Names the table for screen readers.
  final String? semanticLabel;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    return Semantics(
      label: semanticLabel,
      container: true,
      child: Container(
        clipBehavior: Clip.antiAlias,
        decoration: BoxDecoration(
          color: c.bgBase,
          borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.lg)),
          border: Border.all(color: c.line),
        ),
        child: LayoutBuilder(
          builder: (context, box) {
            final minTotal = columns.fold<double>(
              0,
              (s, col) => s + col.minWidth,
            );
            final available = box.maxWidth.isFinite
                ? box.maxWidth - 2
                : minTotal;
            final total = math.max(available, minTotal);
            final spare = total - minTotal;
            final flexSum = columns.fold<int>(0, (s, col) => s + col.flex);
            final widths = [
              for (final col in columns)
                col.minWidth + (flexSum == 0 ? 0 : spare * col.flex / flexSum),
            ];
            final body = <Widget>[];
            if (loading) {
              for (var i = 0; i < loadingRows; i++) {
                body.add(
                  _TableRowView(
                    widths: widths,
                    columns: columns,
                    height: compact ? 40 : 52,
                    cells: [
                      for (var j = 0; j < columns.length; j++)
                        LdsSkeleton(
                          width: widths[j] * (j == 0 ? 0.6 : 0.4),
                          height: 12,
                          semanticLabel: i == 0 && j == 0 ? 'Memuat' : null,
                        ),
                    ],
                  ),
                );
              }
            } else if (rows.isEmpty && empty != null) {
              body.add(
                SizedBox(
                  width: total,
                  child: Center(child: empty),
                ),
              );
            } else {
              for (final row in rows) {
                body.add(
                  _TableRowView(
                    widths: widths,
                    columns: columns,
                    height: compact ? 40 : 52,
                    wrap: wrap,
                    selected: row.selected,
                    onTap: row.onTap,
                    cells: [
                      for (var j = 0; j < columns.length; j++)
                        if (row.widgets != null)
                          row.widgets![j]
                        else
                          _CellText(
                            row.cells![j],
                            strong: j == 0,
                            numeric: columns[j].numeric,
                            wrap: wrap,
                          ),
                    ],
                  ),
                );
              }
            }
            return SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: SizedBox(
                width: total,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    _Header(
                      columns: columns,
                      widths: widths,
                      sortColumn: sortColumn,
                      sortAscending: sortAscending,
                      onSort: onSort,
                    ),
                    for (var i = 0; i < body.length; i++) ...[
                      if (i > 0) Container(height: 1, color: c.hairline),
                      body[i],
                    ],
                  ],
                ),
              ),
            );
          },
        ),
      ),
    );
  }
}

class _Header extends StatelessWidget {
  const _Header({
    required this.columns,
    required this.widths,
    required this.sortColumn,
    required this.sortAscending,
    required this.onSort,
  });

  final List<LdsTableColumn> columns;
  final List<double> widths;
  final int? sortColumn;
  final bool sortAscending;
  final ValueChanged<int>? onSort;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final style = LdsType.footnote.copyWith(
      fontWeight: FontWeight.w500,
      color: c.textSubtle,
    );
    return Container(
      constraints: const BoxConstraints(minHeight: 40),
      color: c.bgFill,
      child: Row(
        children: [
          for (var i = 0; i < columns.length; i++)
            SizedBox(
              width: widths[i],
              child: Semantics(
                header: true,
                child: _headerCell(context, i, style),
              ),
            ),
        ],
      ),
    );
  }

  Widget _headerCell(BuildContext context, int i, TextStyle style) {
    final c = context.lds;
    final col = columns[i];
    final align = col.numeric
        ? AlignmentDirectional.centerEnd
        : AlignmentDirectional.centerStart;
    if (!col.sortable || onSort == null) {
      return Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16),
        child: Align(
          alignment: align,
          child: Text(
            col.label,
            style: style,
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
          ),
        ),
      );
    }
    final sorted = sortColumn == i;
    final sortWord = !sorted
        ? 'belum diurutkan'
        : sortAscending
        ? 'urut naik'
        : 'urut turun';
    return LdsPressable(
      onPressed: () => onSort!(i),
      pressedScale: 1,
      borderRadius: BorderRadius.zero,
      semanticLabel: '${col.label}, $sortWord',
      excludeChildSemantics: true,
      builder: (context, state) => Container(
        height: 44,
        color: state.hovered ? c.bgTint : Colors.transparent,
        padding: const EdgeInsets.symmetric(horizontal: 16),
        alignment: align,
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Flexible(
              child: Text(
                col.label,
                style: style.copyWith(color: sorted ? c.textStrong : null),
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
              ),
            ),
            const SizedBox(width: 4),
            AnimatedOpacity(
              opacity: sorted ? 1 : 0.35,
              duration: context.ldsDuration(LdsMotion.fast),
              child: AnimatedRotation(
                turns: sorted && !sortAscending ? 0.5 : 0,
                duration: context.ldsDuration(LdsMotion.smoothSpringDuration),
                curve: LdsSpringCurve.smooth,
                child: LdsIcon('arrow_upward', size: 14, color: c.textSubtle),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _CellText extends StatelessWidget {
  const _CellText(
    this.text, {
    required this.strong,
    required this.numeric,
    required this.wrap,
  });

  final String text;
  final bool strong;
  final bool numeric;
  final bool wrap;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    return Text(
      text,
      maxLines: wrap ? null : 1,
      overflow: wrap ? null : TextOverflow.ellipsis,
      textAlign: numeric ? TextAlign.end : TextAlign.start,
      style: LdsType.subhead.copyWith(
        color: strong ? c.textStrong : c.textDefault,
        fontWeight: strong ? FontWeight.w500 : null,
        fontFeatures: numeric ? const [FontFeature.tabularFigures()] : null,
      ),
    );
  }
}

class _TableRowView extends StatefulWidget {
  const _TableRowView({
    required this.widths,
    required this.columns,
    required this.cells,
    required this.height,
    this.wrap = false,
    this.selected = false,
    this.onTap,
  });

  final List<double> widths;
  final List<LdsTableColumn> columns;
  final List<Widget> cells;
  final double height;
  final bool wrap;
  final bool selected;
  final VoidCallback? onTap;

  @override
  State<_TableRowView> createState() => _TableRowViewState();
}

class _TableRowViewState extends State<_TableRowView> {
  bool _hover = false;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    Widget row(bool pressed) => AnimatedContainer(
      duration: context.ldsDuration(const Duration(milliseconds: 60)),
      constraints: BoxConstraints(minHeight: widget.height),
      color: widget.selected
          ? c.accentTint
          : pressed
          ? c.bgTintStrong
          : _hover
          ? c.bgTint
          : Colors.transparent,
      child: Row(
        crossAxisAlignment: widget.wrap
            ? CrossAxisAlignment.start
            : CrossAxisAlignment.center,
        children: [
          for (var i = 0; i < widget.cells.length; i++)
            SizedBox(
              width: widget.widths[i],
              child: Padding(
                padding: EdgeInsets.symmetric(
                  horizontal: 16,
                  vertical: widget.wrap ? 14 : 6,
                ),
                child: Align(
                  alignment: widget.columns[i].numeric
                      ? AlignmentDirectional.centerEnd
                      : AlignmentDirectional.centerStart,
                  child: widget.cells[i],
                ),
              ),
            ),
        ],
      ),
    );
    final Widget content = widget.onTap == null
        ? MergeSemantics(
            child: Semantics(
              selected: widget.selected ? true : null,
              child: row(false),
            ),
          )
        : LdsPressable(
            onPressed: widget.onTap,
            pressedScale: 1,
            borderRadius: BorderRadius.zero,
            selected: widget.selected ? true : null,
            builder: (context, state) => row(state.pressed),
          );
    return MouseRegion(
      onEnter: (_) => setState(() => _hover = true),
      onExit: (_) => setState(() => _hover = false),
      child: content,
    );
  }
}
