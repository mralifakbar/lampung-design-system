export default {
  title: 'Timestamp',
  group: 'Data display',
  order: 13,
  summary: 'A `<time>` that shows when something happened or is due in relative words ("5 minutes ago", "in 3 days"), in the page language, and keeps itself current. The exact date goes in its title.',
  when: [
    'When something happened, where recency matters more than the exact time: a message, a comment, a change in a log.',
    'When something is due soon: "in 2 days", "tomorrow".',
  ],
  whenNot: [
    ['A countdown in seconds to a hard deadline', 'timer'],
    ['The exact date matters (a due date in a record, a legal date)', 'key-value', 'Write the absolute date'],
    ['A history of dated events', 'timeline'],
    ['How long running work has taken', 'thinking'],
  ],
  where: 'In meta lines: a list row value or second line, a message header, a card subtitle, a table cell. Subtle text, tabular figures.',
  anatomy: [
    ['time.timestamp', 'Required. Subtle color, tabular figures.'],
    ['[data-lds-time]', 'Required for behavior. An ISO date with its offset ("2026-11-16T09:30:00+07:00").'],
    ['text content', 'The fallback shown before the JS runs (an absolute date); the JS replaces it.'],
    ['[datetime] / [title]', 'Set by the JS: the ISO value and the full localized date and time.'],
  ],
  examples: [
    {
      title: 'In list rows',
      desc: 'Past and future dates in relative words. Hover a time to see the exact date.',
      stage: 'block',
      html: `<div class="list" style="max-width: 460px;">
  <div class="lrow"><div class="lrow__body"><div class="lrow__title">Reply to your road damage report</div><div class="lrow__sub">Two comments from the officer</div></div><time class="timestamp lrow__value" data-lds-time="2026-11-16T08:05:00+07:00">16 Nov 2026, 08:05</time></div>
  <div class="lrow"><div class="lrow__body"><div class="lrow__title">Outreach session room changed</div><div class="lrow__sub">Now in building C, room 204</div></div><time class="timestamp lrow__value" data-lds-time="2026-11-13T15:20:00+07:00">13 Nov 2026, 15:20</time></div>
  <div class="lrow"><div class="lrow__body"><div class="lrow__title">Regional scholarship deadline</div><div class="lrow__sub">Upload your school report</div></div><time class="timestamp lrow__value" data-lds-time="2026-12-01T17:00:00+07:00">1 Dec 2026, 17:00</time></div>
</div>`,
    },
    {
      title: 'In a sentence',
      desc: 'Inside text it inherits the size and keeps the subtle color.',
      stage: 'block',
      html: `<p class="card__sub">Last synced <time class="timestamp" data-lds-time="2026-11-16T09:00:00+07:00">16 Nov 2026, 09:00</time> from your phone.</p>`,
    },
  ],
  states: [
    ['before JS', 'Shows the fallback text you wrote.'],
    ['within 45 seconds', '"now" in the page language.'],
    ['later', 'Seconds, minutes, hours, days, weeks, months, years, rounded to the nearest unit; refreshed every 15 seconds while under a minute, then every minute.'],
  ],
  motion: [
    'None. The words change in place without animation; the tabular figures keep the width steady.',
  ],
  a11y: [
    'It is a real `<time>` element with a machine-readable `datetime`.',
    'The `title` with the full date is not reachable by keyboard or touch: where the exact date matters, write it out next to the relative time or in the details.',
    'The language comes from the closest `lang` attribute, so set `lang` on the page.',
  ],
  do: [
    'Use relative time for recent things and absolute dates for anything older than a few weeks or legally binding.',
    'Give a meaningful fallback date in the markup.',
    'Include the time zone offset in `data-lds-time`.',
  ],
  dont: [
    'Use it for deadlines measured in seconds; use a [timer](timer).',
    'Mix relative and absolute dates in one column.',
  ],
  js: '`data-lds-time="ISO date"` on a `<time>` formats it with `Intl.RelativeTimeFormat` in the page language (`numeric: "auto"`, so "yesterday" and "tomorrow"), sets `datetime` and a full-date `title`, and keeps it current while it is in the document. Call `init(el)` after rendering new timestamps.',
  related: ['timer', 'key-value', 'list', 'chat-message'],
};
