import 'package:material_ui/material_ui.dart';

import '../../theme.dart';
import '../../tokens.g.dart';
import 'checkbox.dart';

/// One checked cell of an [LdsCheckMatrix]: a row id and a column id.
typedef LdsCheckMatrixCell = ({String row, String column});

/// A column (an option) of an [LdsCheckMatrix]: Email, SMS, Aplikasi.
@immutable
class LdsCheckMatrixColumn {
  /// Creates a column.
  const LdsCheckMatrixColumn({
    required this.id,
    required this.label,
    this.description,
  });

  /// Stable id.
  final String id;

  /// Header text.
  final String label;

  /// Second header line.
  final String? description;
}

/// A row (a thing) of an [LdsCheckMatrix].
@immutable
class LdsCheckMatrixRow {
  /// Creates a row.
  const LdsCheckMatrixRow({
    required this.id,
    required this.label,
    this.description,
  });

  /// Stable id.
  final String id;

  /// Row text.
  final String label;

  /// Second line.
  final String? description;
}

/// An area of rows with its own "all" checkbox per column.
@immutable
class LdsCheckMatrixGroup {
  /// Creates a group.
  const LdsCheckMatrixGroup({required this.label, required this.rows});

  /// Area name, for example "Laporan warga".
  final String label;

  /// Rows in this area.
  final List<LdsCheckMatrixRow> rows;
}

/// A grid of checkboxes: things in rows grouped by area, options in
/// columns, for example which notifications go out by which channel.
///
/// The first column stays in place while the options scroll sideways. Each
/// area has one checkbox per column that turns the whole column of that
/// area on or off, and shows mixed when only some are on.
class LdsCheckMatrix extends StatelessWidget {
  /// Creates a check matrix.
  const LdsCheckMatrix({
    super.key,
    required this.columns,
    required this.groups,
    required this.value,
    required this.onChanged,
    this.cornerLabel = '',
    this.firstColumnWidth = 220,
    this.columnWidth = 112,
  });

  /// Options, left to right.
  final List<LdsCheckMatrixColumn> columns;

  /// Areas of rows.
  final List<LdsCheckMatrixGroup> groups;

  /// Checked cells.
  final Set<LdsCheckMatrixCell> value;

  /// Called with the new set. Null disables the matrix.
  final ValueChanged<Set<LdsCheckMatrixCell>>? onChanged;

  /// Text over the first column.
  final String cornerLabel;

  /// Width of the first column.
  final double firstColumnWidth;

  /// Width of each option column.
  final double columnWidth;

  static const double _headH = 56;
  static const double _groupH = 60;

  double _rowH(LdsCheckMatrixRow r) => r.description == null ? 52 : 64;

  bool? _groupState(LdsCheckMatrixGroup g, String col) {
    final on = g.rows.where((r) => value.contains((row: r.id, column: col)));
    if (on.isEmpty) return false;
    if (on.length == g.rows.length) return true;
    return null;
  }

  void _setGroup(LdsCheckMatrixGroup g, String col, bool on) {
    final next = {...value};
    for (final r in g.rows) {
      final cell = (row: r.id, column: col);
      on ? next.add(cell) : next.remove(cell);
    }
    onChanged!(next);
  }

  void _setCell(String row, String col, bool on) {
    final next = {...value};
    final cell = (row: row, column: col);
    on ? next.add(cell) : next.remove(cell);
    onChanged!(next);
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final enabled = onChanged != null;
    final hairline = BorderSide(color: c.hairline);

    Widget cellBox(double h, Widget child, {Color? bg, bool start = false}) =>
        Container(
          height: h,
          padding: EdgeInsets.symmetric(horizontal: start ? 16 : 4),
          alignment: start ? Alignment.centerLeft : Alignment.center,
          decoration: BoxDecoration(
            color: bg ?? c.bgBase,
            border: Border(bottom: hairline),
          ),
          child: child,
        );

    Widget twoLines(
      String label,
      String? sub,
      TextStyle style, {
      TextAlign align = TextAlign.start,
    }) => Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: align == TextAlign.center
          ? CrossAxisAlignment.center
          : CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: style,
          textAlign: align,
          maxLines: 2,
          overflow: TextOverflow.ellipsis,
        ),
        if (sub != null)
          Text(
            sub,
            textAlign: align,
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
            style: LdsType.footnote.copyWith(
              fontSize: 12.5,
              color: c.textMuted,
            ),
          ),
      ],
    );

    // First column: corner, then group and row names.
    final first = <Widget>[
      cellBox(
        _headH,
        Text(
          cornerLabel,
          style: LdsType.caption.copyWith(
            color: c.textSubtle,
            letterSpacing: 0,
          ),
        ),
        bg: c.bgFill,
        start: true,
      ),
    ];
    final rest = <Widget>[
      Row(
        children: [
          for (final col in columns)
            SizedBox(
              width: columnWidth,
              child: cellBox(
                _headH,
                twoLines(
                  col.label,
                  col.description,
                  LdsType.caption.copyWith(
                    color: c.textStrong,
                    letterSpacing: 0,
                  ),
                  align: TextAlign.center,
                ),
                bg: c.bgFill,
              ),
            ),
        ],
      ),
    ];

    for (final g in groups) {
      first.add(
        cellBox(
          _groupH,
          Semantics(
            header: true,
            child: Text(
              g.label,
              style: LdsType.headline.copyWith(color: c.textStrong),
            ),
          ),
          start: true,
        ),
      );
      rest.add(
        Row(
          children: [
            for (final col in columns)
              SizedBox(
                width: columnWidth,
                child: cellBox(
                  _groupH,
                  LdsCheckbox(
                    value: _groupState(g, col.id),
                    semanticLabel: '${col.label}: semua ${g.label}',
                    onChanged: enabled
                        ? (_) => _setGroup(
                            g,
                            col.id,
                            _groupState(g, col.id) != true,
                          )
                        : null,
                  ),
                ),
              ),
          ],
        ),
      );
      for (final r in g.rows) {
        final h = _rowH(r);
        first.add(
          cellBox(
            h,
            twoLines(
              r.label,
              r.description,
              LdsType.subhead.copyWith(color: c.textStrong),
            ),
            start: true,
          ),
        );
        rest.add(
          Row(
            children: [
              for (final col in columns)
                SizedBox(
                  width: columnWidth,
                  child: cellBox(
                    h,
                    LdsCheckbox(
                      value: value.contains((row: r.id, column: col.id)),
                      semanticLabel: '${col.label}: ${r.label}',
                      onChanged: enabled
                          ? (on) => _setCell(r.id, col.id, on)
                          : null,
                    ),
                  ),
                ),
            ],
          ),
        );
      }
    }

    return ClipRRect(
      borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.lg)),
      child: Container(
        foregroundDecoration: BoxDecoration(
          borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.lg)),
          border: Border.all(color: c.line),
        ),
        color: c.bgBase,
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              width: firstColumnWidth,
              decoration: BoxDecoration(border: Border(right: hairline)),
              child: Column(children: first),
            ),
            Expanded(
              child: SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: rest,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
