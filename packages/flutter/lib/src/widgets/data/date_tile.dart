import 'package:flutter/material.dart';

import '../../theme.dart';
import '../../tokens.g.dart';

const List<String> _short = [
  'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', //
  'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des',
];
const List<String> _long = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', //
  'Agustus', 'September', 'Oktober', 'November', 'Desember',
];

/// When an [LdsDateTile] falls.
enum LdsDateTileState {
  /// Upcoming.
  upcoming,

  /// Today: the tile turns accent. At most one per list.
  today,

  /// Past or done: the tile fades to 60 %.
  past,
}

/// A small calendar leaf at the start of a row: the month on a tint band
/// and the day below. Read as "18 November".
class LdsDateTile extends StatelessWidget {
  /// Creates a date tile.
  const LdsDateTile(
    this.date, {
    super.key,
    this.state = LdsDateTileState.upcoming,
  });

  /// The date.
  final DateTime date;

  /// Upcoming, today or past.
  final LdsDateTileState state;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final today = state == LdsDateTileState.today;
    final tile = Container(
      width: 44,
      height: 48,
      clipBehavior: Clip.antiAlias,
      decoration: BoxDecoration(
        color: today ? c.accent : c.bgBase,
        borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.md)),
        border: today ? null : Border.all(color: c.line),
      ),
      child: Column(
        children: [
          Container(
            height: 18,
            alignment: Alignment.center,
            color: today ? c.accentPressed : c.accentTint,
            child: Text(
              _short[date.month - 1],
              textScaler: TextScaler.noScaling,
              style: TextStyle(
                fontFamily: LdsType.family,
                fontSize: 12,
                height: 1,
                fontWeight: FontWeight.w500,
                color: today ? c.textOnAccent : c.accentText,
              ),
            ),
          ),
          Expanded(
            child: Center(
              child: Text(
                '${date.day}',
                textScaler: TextScaler.noScaling,
                style: TextStyle(
                  fontFamily: LdsType.family,
                  fontSize: 18,
                  height: 1,
                  fontWeight: FontWeight.w600,
                  letterSpacing: -0.36,
                  color: today ? c.textOnAccent : c.textStrong,
                  fontFeatures: const [FontFeature.tabularFigures()],
                ),
              ),
            ),
          ),
        ],
      ),
    );
    return Semantics(
      label: '${date.day} ${_long[date.month - 1]}',
      excludeSemantics: true,
      child: state == LdsDateTileState.past
          ? Opacity(opacity: 0.6, child: tile)
          : tile,
    );
  }
}
