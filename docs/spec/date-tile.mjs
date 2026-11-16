const row = (m, d, iso, title, sub, badge = '', mod = '') => `<a class="lrow" href="#dt-${iso}" id="dt-${iso}"><time class="datetile${mod}" datetime="${iso}"><span class="datetile__m">${m}</span><span class="datetile__d">${d}</span></time><span class="lrow__body"><span class="lrow__title">${title}</span><span class="lrow__sub">${sub}</span></span>${badge}<span class="ic lrow__chev" aria-hidden="true">chevron_right</span></a>`;

export default {
  title: 'Date tile',
  group: 'Data display',
  order: 13.5,
  summary: 'A small month-and-day block at the start of a row, for lists of things that happen on a date: classes, exams, payments due, events. People find the date before the title, so it leads.',
  when: [
    'A list of upcoming events or deadlines where the day is how people scan: exams, webinars, invoices due.',
    'A card that announces one dated thing: the next class, a payment due.',
  ],
  whenNot: [
    ['Picking a date', 'date-field'],
    ['A month at a glance with several events per day', 'calendar'],
    ['When something happened, in a log or a message', 'timestamp'],
    ['The history of one record', 'timeline'],
  ],
  where: 'As the first element of a list row (`.lrow`), 12 px before the title; or at the top left of a small card. 44 by 48 px, never larger.',
  anatomy: [
    ['time.datetile', 'Required. A `<time datetime="YYYY-MM-DD">`, so the date is machine readable and read as "Nov 18".'],
    ['.datetile__m', 'Required. Short month on an accent tint band.'],
    ['.datetile__d', 'Required. The day, 18 px tabular.'],
    ['.datetile--today', 'Today: the tile turns accent.'],
    ['.datetile--past', 'Done or past: the tile fades to 60 %.'],
  ],
  examples: [
    {
      title: 'Upcoming in a list',
      desc: 'Today first and accented, then the coming week. Badges say the kind of event in words.',
      stage: 'block',
      html: `<div class="list" style="max-width: 460px;">
  ${row('Nov', 16, '2026-11-16', 'Statistics: live review', 'Today, 19:00 to 20:30 · Online', '<span class="badge badge--accent">Live</span>', ' datetile--today')}
  ${row('Nov', 18, '2026-11-18', 'Database Systems quiz 4', 'Wed, opens 08:00 · 30 minutes', '<span class="badge">Quiz</span>')}
  ${row('Nov', 21, '2026-11-21', 'Mock exam, hall B', 'Sat, 09:00 · Seat 42', '<span class="badge badge--warning">Bring ID</span>')}
  ${row('Dec', 2, '2026-12-02', 'Second tuition payment due', 'Wed · $420', '')}
</div>`,
    },
    {
      title: 'Past and upcoming',
      desc: 'A past event fades; the next one keeps full strength.',
      html: `<div class="docs-row" style="gap: 12px;"><time class="datetile datetile--past" datetime="2026-11-09"><span class="datetile__m">Nov</span><span class="datetile__d">9</span></time><time class="datetile" datetime="2026-11-23"><span class="datetile__m">Nov</span><span class="datetile__d">23</span></time><time class="datetile datetile--today" datetime="2026-11-16"><span class="datetile__m">Nov</span><span class="datetile__d">16</span></time></div>`,
    },
  ],
  variants: [
    ['.datetile', 'Upcoming.'],
    ['.datetile--today', 'Today; at most one per list.'],
    ['.datetile--past', 'Past or done.'],
  ],
  states: [
    ['in a linked row', 'The row is the link; the tile is not interactive on its own.'],
    ['loading', 'A 44 × 48 `.skel` block with `--r-md` radius.'],
  ],
  motion: [
    'None of its own. Rows follow the list stagger when results arrive.',
  ],
  a11y: [
    'Use `<time datetime>` so assistive tech and machines get the full date; the visible text reads naturally ("Nov 18").',
    'Say "Today" in the row subtitle too; the accent tile alone is not enough.',
    'The month band is accent text on its tint (AA in both themes).',
  ],
  do: [
    'Sort by date, soonest first; put today\'s item at the top.',
    'Give the weekday and time in the subtitle.',
  ],
  dont: [
    'Use the tile as a button or a date picker.',
    'Show the year in the tile; add it to the subtitle when the list crosses a year.',
  ],
  related: ['list', 'calendar', 'timestamp', 'badge'],
};
