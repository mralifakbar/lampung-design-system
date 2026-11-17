import 'package:flutter/material.dart';

import '../../theme.dart';
import '../../tokens.g.dart';
import '../icon.dart';

/// Where an [LdsTimelineItem] stands.
enum LdsTimelineState {
  /// Done: accent dot with a check.
  done,

  /// In progress now: a ringed accent dot with an icon.
  current,

  /// Not yet: an empty ringed dot.
  upcoming,
}

/// One event of an [LdsTimeline].
@immutable
class LdsTimelineItem {
  /// Creates an event.
  const LdsTimelineItem({
    required this.title,
    this.meta,
    this.state = LdsTimelineState.upcoming,
    this.icon,
  });

  /// What happened or will happen.
  final String title;

  /// When, and who or what.
  final String? meta;

  /// Done, current or upcoming.
  final LdsTimelineState state;

  /// Glyph in the dot (ligature name). Defaults to `check` when done and
  /// `schedule` when current.
  final String? icon;
}

/// Events in order, joined by a line: the steps of a permit, the history of
/// a citizen report.
class LdsTimeline extends StatelessWidget {
  /// Creates a timeline.
  const LdsTimeline({
    super.key,
    required this.items,
    this.doneLabel = 'Selesai',
    this.currentLabel = 'Sedang berjalan',
  });

  /// The events, oldest first.
  final List<LdsTimelineItem> items;

  /// Announced with done events.
  final String doneLabel;

  /// Announced with the current event.
  final String currentLabel;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      mainAxisSize: MainAxisSize.min,
      children: [
        for (var i = 0; i < items.length; i++)
          _item(context, c, items[i], last: i == items.length - 1),
      ],
    );
  }

  Widget _item(BuildContext context, LdsColors c, LdsTimelineItem item,
      {required bool last}) {
    final done = item.state == LdsTimelineState.done;
    final current = item.state == LdsTimelineState.current;
    final icon = item.icon ??
        (done
            ? 'check'
            : current
                ? 'schedule'
                : null);
    final dot = Container(
      width: 24,
      height: 24,
      alignment: Alignment.center,
      decoration: BoxDecoration(
        color: done ? c.accent : c.bgBase,
        shape: BoxShape.circle,
        border: done
            ? null
            : Border.all(
                color: current ? c.accent : c.lineStrong,
                width: current ? 2 : 1.5,
              ),
        boxShadow:
            current ? [BoxShadow(color: c.accentRing, spreadRadius: 4)] : null,
      ),
      child: icon == null
          ? null
          : LdsIcon(icon,
              size: 15,
              color: done
                  ? c.textOnAccent
                  : current
                      ? c.accentText
                      : c.textSubtle),
    );
    final stateWord = done
        ? doneLabel
        : current
            ? currentLabel
            : null;
    return Semantics(
      container: true,
      label: stateWord,
      child: IntrinsicHeight(
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            SizedBox(
              width: 24,
              child: Column(
                children: [
                  dot,
                  if (!last)
                    Expanded(
                      child: Center(
                        child: Container(
                          width: 2,
                          color: done ? c.accent : c.line,
                        ),
                      ),
                    ),
                ],
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Padding(
                padding: EdgeInsets.only(top: 2, bottom: last ? 0 : 20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      item.title,
                      style: TextStyle(
                        fontFamily: LdsType.family,
                        fontSize: 14,
                        height: 20 / 14,
                        fontWeight: FontWeight.w500,
                        color: c.textStrong,
                      ),
                    ),
                    if (item.meta != null)
                      Text(
                        item.meta!,
                        style: LdsType.footnote.copyWith(color: c.textSubtle),
                      ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
