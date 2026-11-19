import 'dart:math' as math;

import 'package:material_ui/material_ui.dart';

import '../../theme.dart';
import '../../tokens.g.dart';
import '../alert.dart';
import '../button.dart';
import '../empty_state.dart';
import '../icon.dart';
import 'chips.dart';
import 'table.dart';

/// One record of an [LdsDataTable].
@immutable
class LdsDataRow {
  /// Creates a record.
  const LdsDataRow({
    required this.id,
    required this.cells,
    this.sortValues,
    this.tags = const <String, String>{},
  });

  /// Stable identity, used for selection.
  final String id;

  /// Text per column.
  final List<String> cells;

  /// Values to sort by per column, when the text does not sort right
  /// (dates, names with titles). Null entries fall back to the text.
  final List<Comparable<Object>?>? sortValues;

  /// Values that [LdsDataFilter]s match on, by filter key.
  final Map<String, String> tags;
}

/// A filter of an [LdsDataTable], shown as a row of chips.
@immutable
class LdsDataFilter {
  /// Creates a filter.
  const LdsDataFilter({
    required this.key,
    required this.label,
    required this.options,
  });

  /// The [LdsDataRow.tags] key this filter matches.
  final String key;

  /// What is filtered, for screen readers ("Filter status").
  final String label;

  /// The choices. Several on at once match any of them.
  final List<String> options;
}

/// The load state of an [LdsDataTable].
enum LdsDataTableState {
  /// Rows are shown.
  ready,

  /// Skeleton rows under the header.
  loading,

  /// An alert with a retry in place of the rows.
  error,
}

/// A table people work in: search, filter chips, sortable headers, row
/// selection, density and pages.
///
/// Sorting cycles ascending, descending, unsorted. The count under the
/// table says what is shown ("Menampilkan 1 sampai 10 dari 23 warga").
class LdsDataTable extends StatefulWidget {
  /// Creates a data table.
  const LdsDataTable({
    super.key,
    required this.columns,
    required this.rows,
    this.noun = 'data',
    this.pageSize = 10,
    this.filters = const <LdsDataFilter>[],
    this.searchHint = 'Cari',
    this.selectable = false,
    this.onSelectionChanged,
    this.state = LdsDataTableState.ready,
    this.onRetry,
    this.errorTitle = 'Data tidak dapat dimuat',
    this.errorBody = 'Tidak ada data yang hilang. Coba lagi sebentar lagi.',
    this.emptyTitle,
    this.clearLabel = 'Hapus filter',
    this.semanticLabel,
  });

  /// The columns.
  final List<LdsTableColumn> columns;

  /// All records; searching, filtering, sorting and paging happen here.
  final List<LdsDataRow> rows;

  /// What a record is called, for the count and the empty state ("warga").
  final String noun;

  /// Rows per page.
  final int pageSize;

  /// Chip filters above the table.
  final List<LdsDataFilter> filters;

  /// Search field hint.
  final String searchHint;

  /// Adds a checkbox column.
  final bool selectable;

  /// Called with the selected ids.
  final ValueChanged<Set<String>>? onSelectionChanged;

  /// Loading, error or ready.
  final LdsDataTableState state;

  /// Retry action for the error state.
  final VoidCallback? onRetry;

  /// Error title.
  final String errorTitle;

  /// Error body.
  final String errorBody;

  /// Title when nothing matches; defaults to "Tidak ada [noun] yang cocok".
  final String? emptyTitle;

  /// Label of the button that clears search and filters.
  final String clearLabel;

  /// Names the table for screen readers.
  final String? semanticLabel;

  @override
  State<LdsDataTable> createState() => _LdsDataTableState();
}

class _LdsDataTableState extends State<LdsDataTable> {
  final TextEditingController _search = TextEditingController();
  final Map<String, Set<String>> _active = <String, Set<String>>{};
  final Set<String> _selected = <String>{};
  int? _sortColumn;
  bool _ascending = true;
  int _page = 0;
  bool _compact = false;

  @override
  void dispose() {
    _search.dispose();
    super.dispose();
  }

  bool get _filtered =>
      _search.text.trim().isNotEmpty || _active.values.any((s) => s.isNotEmpty);

  List<LdsDataRow> get _visible {
    final q = _search.text.trim().toLowerCase();
    final out = widget.rows.where((r) {
      if (q.isNotEmpty && !r.cells.any((c) => c.toLowerCase().contains(q))) {
        return false;
      }
      for (final e in _active.entries) {
        if (e.value.isNotEmpty && !e.value.contains(r.tags[e.key])) {
          return false;
        }
      }
      return true;
    }).toList();
    final col = _sortColumn;
    if (col != null) {
      Comparable<Object> key(LdsDataRow r) =>
          r.sortValues?[col] ?? r.cells[col].toLowerCase();
      out.sort((a, b) {
        final cmp = key(a).compareTo(key(b));
        return _ascending ? cmp : -cmp;
      });
    }
    return out;
  }

  void _sort(int column) {
    // Selection takes column 0 when present.
    final col = widget.selectable ? column - 1 : column;
    setState(() {
      if (_sortColumn != col) {
        _sortColumn = col;
        _ascending = true;
      } else if (_ascending) {
        _ascending = false;
      } else {
        _sortColumn = null;
      }
    });
  }

  void _clear() {
    setState(() {
      _search.clear();
      _active.clear();
      _page = 0;
    });
  }

  void _toggle(String id, bool on) {
    setState(() => on ? _selected.add(id) : _selected.remove(id));
    widget.onSelectionChanged?.call(Set<String>.of(_selected));
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final visible = _visible;
    final pages = math.max(1, (visible.length / widget.pageSize).ceil());
    final page = math.min(_page, pages - 1);
    final start = page * widget.pageSize;
    final end = math.min(start + widget.pageSize, visible.length);
    final pageRows = visible.sublist(math.min(start, visible.length), end);

    final columns = [
      if (widget.selectable) const LdsTableColumn('', minWidth: 56, flex: 0),
      ...widget.columns,
    ];
    final pageIds = pageRows.map((r) => r.id).toList();
    final allOn = pageIds.isNotEmpty && pageIds.every(_selected.contains);
    final someOn = pageIds.any(_selected.contains);

    final rows = <LdsTableRow>[
      for (final r in pageRows)
        LdsTableRow.widgets([
          if (widget.selectable)
            Checkbox(
              value: _selected.contains(r.id),
              onChanged: (v) => _toggle(r.id, v ?? false),
              semanticLabel: 'Pilih ${r.cells.first}',
            ),
          for (var i = 0; i < r.cells.length; i++)
            Text(
              r.cells[i],
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              textAlign: widget.columns[i].numeric
                  ? TextAlign.end
                  : TextAlign.start,
              style: LdsType.subhead.copyWith(
                color: i == 0 ? c.textStrong : c.textDefault,
                fontWeight: i == 0 ? FontWeight.w500 : null,
                fontFeatures: widget.columns[i].numeric
                    ? const [FontFeature.tabularFigures()]
                    : null,
              ),
            ),
        ], selected: _selected.contains(r.id)),
    ];

    Widget table;
    if (widget.state == LdsDataTableState.error) {
      table = LdsAlert(
        title: widget.errorTitle,
        body: widget.errorBody,
        tone: LdsAlertTone.danger,
        actions: [
          if (widget.onRetry != null)
            LdsButton(
              label: 'Coba lagi',
              size: LdsButtonSize.sm,
              variant: LdsButtonVariant.secondary,
              onPressed: widget.onRetry,
            ),
        ],
      );
    } else {
      table = LdsTable(
        columns: columns,
        rows: rows,
        compact: _compact,
        loading: widget.state == LdsDataTableState.loading,
        semanticLabel: widget.semanticLabel,
        sortColumn: _sortColumn == null
            ? null
            : _sortColumn! + (widget.selectable ? 1 : 0),
        sortAscending: _ascending,
        onSort: _sort,
        empty: LdsEmptyState(
          icon: 'search',
          title: widget.emptyTitle ?? 'Tidak ada ${widget.noun} yang cocok',
          body: 'Ubah kata pencarian atau hapus filter.',
          action: LdsButton(
            label: widget.clearLabel,
            variant: LdsButtonVariant.gray,
            size: LdsButtonSize.md,
            onPressed: _clear,
          ),
        ),
      );
    }

    final header = widget.selectable && pageIds.isNotEmpty
        ? Padding(
            padding: const EdgeInsets.only(bottom: 4),
            child: Row(
              children: [
                Checkbox(
                  tristate: true,
                  value: allOn ? true : (someOn ? null : false),
                  onChanged: (_) {
                    setState(() {
                      if (allOn) {
                        _selected.removeAll(pageIds);
                      } else {
                        _selected.addAll(pageIds);
                      }
                    });
                    widget.onSelectionChanged?.call(Set<String>.of(_selected));
                  },
                  semanticLabel: 'Pilih semua di halaman ini',
                ),
                Text(
                  _selected.isEmpty
                      ? 'Pilih semua'
                      : '${_selected.length} dipilih',
                  style: LdsType.footnote.copyWith(color: c.textSubtle),
                ),
              ],
            ),
          )
        : const SizedBox.shrink();

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      mainAxisSize: MainAxisSize.min,
      children: [
        Row(
          children: [
            Expanded(
              child: TextField(
                controller: _search,
                onChanged: (_) => setState(() => _page = 0),
                decoration: InputDecoration(
                  hintText: widget.searchHint,
                  prefixIcon: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 12),
                    child: LdsIcon('search', color: c.textMuted),
                  ),
                  prefixIconConstraints: const BoxConstraints(
                    minWidth: 44,
                    minHeight: 44,
                  ),
                ),
              ),
            ),
            const SizedBox(width: 8),
            LdsIconButton(
              icon: _compact ? 'view_agenda' : 'list',
              semanticLabel: _compact ? 'Baris biasa' : 'Baris rapat',
              selected: _compact,
              onPressed: () => setState(() => _compact = !_compact),
            ),
          ],
        ),
        for (final f in widget.filters) ...[
          const SizedBox(height: 8),
          LdsChipRow(
            semanticLabel: f.label,
            children: [
              for (final o in f.options)
                LdsChip(
                  label: o,
                  selected: _active[f.key]?.contains(o) ?? false,
                  onChanged: (on) => setState(() {
                    final set = _active.putIfAbsent(f.key, () => <String>{});
                    on ? set.add(o) : set.remove(o);
                    _page = 0;
                  }),
                ),
            ],
          ),
        ],
        if (_filtered && visible.isNotEmpty)
          Align(
            alignment: AlignmentDirectional.centerStart,
            child: LdsButton(
              label: widget.clearLabel,
              variant: LdsButtonVariant.plain,
              size: LdsButtonSize.sm,
              onPressed: _clear,
            ),
          ),
        const SizedBox(height: 12),
        header,
        table,
        const SizedBox(height: 8),
        Row(
          children: [
            Expanded(
              child: Semantics(
                liveRegion: true,
                child: Text(
                  visible.isEmpty
                      ? 'Tidak ada ${widget.noun}'
                      : 'Menampilkan ${start + 1} sampai $end dari '
                            '${visible.length} ${widget.noun}',
                  style: LdsType.footnote.copyWith(
                    color: c.textSubtle,
                    fontFeatures: const [FontFeature.tabularFigures()],
                  ),
                ),
              ),
            ),
            LdsIconButton(
              icon: 'chevron_left',
              semanticLabel: 'Halaman sebelumnya',
              onPressed: page > 0
                  ? () => setState(() => _page = page - 1)
                  : null,
            ),
            Text(
              '${page + 1} / $pages',
              style: LdsType.footnote.copyWith(
                color: c.textSubtle,
                fontFeatures: const [FontFeature.tabularFigures()],
              ),
            ),
            LdsIconButton(
              icon: 'chevron_right',
              semanticLabel: 'Halaman berikutnya',
              onPressed: page < pages - 1
                  ? () => setState(() => _page = page + 1)
                  : null,
            ),
          ],
        ),
      ],
    );
  }
}
