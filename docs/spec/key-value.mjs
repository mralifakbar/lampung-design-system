export default {
  title: 'Key-value',
  group: 'Data display',
  order: 2,
  summary: 'Label and value pairs that describe one thing: a payment, an exam registration, a profile. `.kv` rows in a `<dl>`, inside a card or in their own `.kv-list` box.',
  when: [
    'The details of one record: fee, due date and status of a payment; seat, room and time of an exam.',
    'A summary before a confirm ("Review your registration").',
    'Facts about a page\'s subject in a side panel.',
  ],
  whenNot: [
    ['Several records compared by the same attributes', 'table'],
    ['A few big numbers that summarize a page', 'stat-row'],
    ['Rows that navigate to change each value', 'list', 'Use `.lrow__value` with a chevron'],
    ['The values are editable', 'form-layout'],
    ['Events with dates in order', 'timeline'],
  ],
  where: 'Inside a [card](card) under its title, in a side panel, in a [dialog](dialog) before a confirm, or alone as a `.kv-list` box in the content column. Label left, value right on every screen size; switch to `.kv-list--stack` when values are long sentences or names.',
  anatomy: [
    ['dl', 'Required. The list of pairs.'],
    ['.kv', 'Required. A `div` row: label left, value right, 44 px minimum, hairline between rows. No padding of its own, so it fits in cards and rows.'],
    ['.kv > dt', 'The label: subtle text.'],
    ['.kv > dd', 'The value: strong, right-aligned, tabular figures; long values wrap.'],
    ['dl.kv-list', 'A box of its own: quiet fill, large radius, 16 px side padding, 48 px rows, values in semibold.'],
    ['.kv-list--base', 'White box with a hairline ring, for use on the quiet fill.'],
    ['.kv-list--stack', 'Label above, value below, left-aligned: for long values (titles, legal names, dates in words).'],
  ],
  examples: [
    {
      title: 'In its own box',
      desc: 'The quiet fill box with strong, right-aligned values.',
      stage: 'block',
      html: `<dl class="kv-list" style="max-width: 420px;">
  <div class="kv"><dt>Term fee</dt><dd>Rp 4.200.000</dd></div>
  <div class="kv"><dt>Due</dt><dd>28 Nov 2026</dd></div>
  <div class="kv"><dt>Payment method</dt><dd>Virtual account</dd></div>
  <div class="kv"><dt>Status</dt><dd><span class="badge badge--warning">Not paid</span></dd></div>
</dl>`,
    },
    {
      title: 'Inside a card',
      desc: 'Bare `.kv` rows under the card title; the hairlines run the card width.',
      stage: 'fill',
      html: `<div class="card" style="max-width: 380px; width: 100%;">
  <div class="card__title">Exam seat</div>
  <div class="card__sub">Civil service entrance test</div>
  <dl style="margin-top: 12px;">
    <div class="kv"><dt>Date</dt><dd>Sat 5 Dec, 08:00</dd></div>
    <div class="kv"><dt>Room</dt><dd>B 2.14</dd></div>
    <div class="kv"><dt>Seat</dt><dd>27</dd></div>
  </dl>
</div>`,
    },
    {
      title: 'On the quiet fill, and stacked for long values',
      desc: '`--base` makes the box white on a filled panel; `--stack` puts long values under their labels.',
      stage: 'fill',
      html: `<dl class="kv-list kv-list--base kv-list--stack" style="max-width: 420px; width: 100%;">
  <div class="kv"><dt>Thesis title</dt><dd>Measuring reading fluency in early grades with short spoken passages</dd></div>
  <div class="kv"><dt>Supervisor</dt><dd>Dr. Ayu Rahmawati, Faculty of Education</dd></div>
  <div class="kv"><dt>Defense date</dt><dd>Thursday, 10 December 2026</dd></div>
</dl>`,
    },
  ],
  variants: [
    ['kv', 'Bare rows, no box. Inside cards, dialogs and list rows.'],
    ['kv-list', 'Its own filled box; values semibold.'],
    ['kv-list--base', 'White with a ring, for filled surfaces.'],
    ['kv-list--stack', 'Label above value, left-aligned, for long values.'],
  ],
  states: [
    ['missing value', 'Write "Not set" in the value, never leave it blank or use a dash.'],
    ['loading', 'A [skeleton](skeleton) bar in each `dd`, the labels already shown.'],
  ],
  motion: [
    'None at rest. When a value changes in place, use [text morph](text-morph) for words or a [rolling number](rolling-number) for figures.',
  ],
  a11y: [
    'Use `<dl>` with `<div class="kv"><dt>…</dt><dd>…</dd></div>`: screen readers pair each term with its value.',
    'Keep labels short and specific ("Due", not "Date 2").',
    'Values that are states use words (a [badge](badge)), not color alone.',
  ],
  do: [
    'Order rows by what the person checks first.',
    'Use `--stack` as soon as values wrap to two lines.',
    'Format numbers and dates the same way across the product.',
  ],
  dont: [
    'Build key-value rows from a table or from two `div` columns.',
    'Put actions inside values; put one action under the box.',
    'Mix stacked and side-by-side rows in one box.',
  ],
  related: ['stat-row', 'table', 'card', 'list'],
};
