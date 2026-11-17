export default {
  title: 'Badge',
  group: 'Feedback',
  order: 8,
  summary: 'A small, non-interactive label for the state or type of a thing: Draft, Overdue, Approved. Human words, one or two at most per item.',
  when: [
    'Showing the state of a record in a row, a card or a table cell: Draft, In review, Approved, Overdue.',
    'Marking a type or category that helps scanning: Outreach, Free, New.',
    'A short time-bound flag: "Due tomorrow", "Ends today".',
  ],
  whenNot: [
    ['A number of unread or pending items', 'count'],
    ['The live health of a system or a connection, with a dot', 'status-dot'],
    ['The person can press it to filter or choose', 'chips'],
    ['Removable tags the person typed', 'tag-input'],
    ['A person is online', 'avatar', 'Use `.avatar__presence`'],
    ['A sentence of explanation', 'alert'],
  ],
  where: 'Next to the title it describes (after it in a row, above it in a card), or in its own table column. On phones it stays on one line; if a row has no room, move the badge under the title.',
  anatomy: [
    ['.badge', 'Required. 22 px tall, 6 px radius, 12 px medium text, neutral tint.'],
    ['.badge--accent|success|warning|danger', 'Tone tint and text.'],
    ['.badge--solid', 'Accent fill with white text: the one badge that must stand out (rare).'],
    ['.badge--outline', 'Transparent with a hairline: a quiet type or category.'],
    ['.ic', 'Optional 14 px leading icon.'],
  ],
  examples: [
    {
      title: 'Tones for states',
      desc: 'Neutral for draft, accent for in progress, success, warning, danger. The words carry the meaning.',
      html: `<div class="docs-row">
  <span class="badge">Draft</span>
  <span class="badge badge--accent">In review</span>
  <span class="badge badge--success"><span class="ic" aria-hidden="true">check</span>Approved</span>
  <span class="badge badge--warning">Due tomorrow</span>
  <span class="badge badge--danger">Overdue</span>
  <span class="badge badge--outline">Outreach</span>
  <span class="badge badge--solid">New</span>
</div>`,
    },
    {
      title: 'In a list row',
      desc: 'The badge sits at the end of the row, after the text.',
      stage: 'block',
      html: `<div class="list" style="max-width: 460px;">
  <div class="lrow"><div class="lrow__body"><div class="lrow__title">Micro business permit application</div><div class="lrow__sub">Sent 12 Nov</div></div><span class="badge badge--accent">In review</span></div>
  <div class="lrow"><div class="lrow__body"><div class="lrow__title">Land and building tax 2026</div><div class="lrow__sub">Due 10 Nov</div></div><span class="badge badge--danger">Overdue</span></div>
  <div class="lrow"><div class="lrow__body"><div class="lrow__title">Damaged road report on Jl. Pagar Alam</div><div class="lrow__sub">Handled 8 Nov</div></div><span class="badge badge--success">Resolved</span></div>
</div>`,
    },
    {
      title: 'On a card',
      desc: 'Above the title for a type, beside it for a state.',
      stage: 'block',
      html: `<div class="card" style="max-width: 320px;">
  <span class="badge badge--outline">Training</span>
  <div class="card__title" style="margin-top: 10px;">Getting a halal certificate for UMKM</div>
  <div class="card__sub">Thursday, 13:00 · District office hall</div>
</div>`,
    },
  ],
  variants: [
    ['badge', 'Neutral: draft, archived, not started.'],
    ['badge--accent', 'In progress, in review, current.'],
    ['badge--success', 'Done, approved, paid, open (seats).'],
    ['badge--warning', 'Needs attention soon: due tomorrow, expiring.'],
    ['badge--danger', 'Failed, overdue, full, declined.'],
    ['badge--outline', 'A quiet category or type.'],
    ['badge--solid', 'The single badge that must stand out ("New" on one item).'],
  ],
  motion: [
    'None at rest. When a state changes in place, change the words with [text morph](text-morph) and let the tint cross-fade; do not pop or pulse the badge.',
  ],
  a11y: [
    'A badge is text, read in place; make sure the row reads well ("Land and building tax 2026, Overdue").',
    'Never make it clickable. If it must open something, it is a [chip](chips) or a button.',
    'The tone must also be in the words; "Overdue" in red, not a red badge saying "4".',
  ],
  do: [
    'Use the same word for the same state everywhere in the product.',
    'Keep it to one or two words in sentence case.',
    'Limit an item to one state badge (plus at most one type badge).',
  ],
  dont: [
    'Put numbers in a badge; use a [count](count).',
    'Use badges as buttons or filters.',
    'Invent new colors; map each state to one of the tones.',
  ],
  related: ['count', 'status-dot', 'chips', 'list'],
};
