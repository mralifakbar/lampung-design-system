// Lanes: rows of people or resources, time across, blocks placed by start and length.
const hours = ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];
const who = (ini, name, sub) => `<div class="lanes__who"><span class="avatar avatar--gray" aria-hidden="true">${ini}</span><span class="lanes__id"><span class="lanes__name">${name}</span><span class="lanes__sub">${sub}</span></span></div>`;
const item = (from, span, title, sub = '', mod = '', tag = 'div') => `<${tag} class="lanes__item${mod}"${tag === 'button' ? ' type="button"' : ''} style="--from: ${from}; --span: ${span};"><span>${title}</span>${sub ? `<small>${sub}</small>` : ''}</${tag}>`;

const roster = `<div class="lanes-box" tabindex="0" role="region" aria-label="Tutors today, scrolls sideways">
  <div class="lanes lanes--now" style="--cols: 10; --now: 3.33;">
    <div class="lanes__head"><div class="lanes__corner">Tutor</div><div class="lanes__ticks">${hours.map((h) => `<span class="lanes__tick">${h}</span>`).join('')}</div></div>
    <div class="lanes__row">${who('NP', 'Nadia Putri', 'Statistics')}<div class="lanes__track">${item(1, 2, 'Group review', 'Room 3')}${item(5, 1, 'Lunch', '', ' lanes__item--muted')}${item(6, 1.5, 'Free', 'Book 13:00', ' lanes__item--free', 'button')}${item(7.5, 2, 'Office hours', 'Online', ' lanes__item--3')}</div></div>
    <div class="lanes__row">${who('RH', 'Rizky Hartono', 'Database Systems')}<div class="lanes__track">${item(0, 3, 'Lab session', 'Lab B', ' lanes__item--4')}${item(3.5, 1.5, 'Free', 'Book 10:30', ' lanes__item--free', 'button')}${item(5, 1, 'Lunch', '', ' lanes__item--muted')}${item(6, 3, 'Exam marking', '', ' lanes__item--2')}</div></div>
    <div class="lanes__row">${who('AL', 'Ayu Lestari', 'Academic writing')}<div class="lanes__track"><span class="lanes__off" style="--from: 0; --span: 2;"></span>${item(2, 2.5, 'One to one', '6 students')}${item(5, 1, 'Lunch', '', ' lanes__item--muted')}${item(6, 2, 'Hold: thesis clinic', 'Not confirmed', ' lanes__item--pending')}</div></div>
  </div>
</div>`;

const days = [['Mon', 16], ['Tue', 17], ['Wed', 18], ['Thu', 19], ['Fri', 20], ['Sat', 21], ['Sun', 22], ['Mon', 23], ['Tue', 24], ['Wed', 25], ['Thu', 26], ['Fri', 27], ['Sat', 28], ['Sun', 29]];
const off = '<span class="lanes__off" style="--from: 5; --span: 2;"></span><span class="lanes__off" style="--from: 12; --span: 2;"></span>';
const leave = `<div class="lanes-box" tabindex="0" role="region" aria-label="Team time off, 16 to 29 November, scrolls sideways">
  <div class="lanes" style="--cols: 14; --col-min: 44px; --who: 180px;">
    <div class="lanes__head"><div class="lanes__corner">Product team</div><div class="lanes__ticks">${days.map(([d, n], i) => `<span class="lanes__tick${i === 0 ? ' is-today' : ''}${d === 'Sat' || d === 'Sun' ? ' is-off' : ''}">${d}<b>${n}</b></span>`).join('')}</div></div>
    <div class="lanes__row">${who('DL', 'Dewi Lestari', 'Designer')}<div class="lanes__track">${off}${item(2, 3, 'Annual leave')}</div></div>
    <div class="lanes__row">${who('GR', 'Galih Ramadhan', 'Engineer')}<div class="lanes__track">${off}${item(0, 1, 'Sick', '', ' lanes__item--2')}${item(9, 3, 'Requested', 'Annual leave', ' lanes__item--pending')}</div></div>
    <div class="lanes__row">${who('SH', 'Sari Handayani', 'Product manager')}<div class="lanes__track">${off}${item(7, 5, 'Parental leave', 'Until 4 Dec', ' lanes__item--4')}</div></div>
  </div>
</div>`;

export default {
  title: 'Lanes',
  group: 'Data display',
  order: 22.4,
  summary: 'Who is busy when: one row per person, room or resource, time running across, and blocks placed by their start and length. The question it answers is "who is free, and when", so gaps matter as much as blocks.',
  when: [
    'A roster where people book or plan around each other\'s time: doctors\' hours today, tutors, shifts.',
    'Team time off across one to four weeks, with requests that are not approved yet.',
    'Rooms, beds or vehicles booked by the hour or the day.',
  ],
  whenNot: [
    ['One person\'s or one team\'s events by month, week or agenda', 'event-calendar'],
    ['Work moving through stages', 'kanban'],
    ['The history of one record', 'timeline'],
    ['Activity per day over months, as intensity', 'heatmap'],
  ],
  where: 'Full width of the content column, or at least eight of twelve columns: time needs room. On phones the box scrolls sideways with the name column pinned; the name column narrows and drops the avatar under 560 px of box width. Put a legend under it when blocks use more than one tone.',
  anatomy: [
    ['.lanes-box', 'Required. The scroll box: white, ring, large radius. Give it `tabindex="0"`, `role="region"` and an `aria-label` that names the span, so keyboard users can scroll it.'],
    ['.lanes', 'Required. The grid. `--cols` the number of time columns, `--col-min` the narrowest a column may get before the box scrolls (56 px), `--who` the name column (200 px), `--row-h` the row height (56 px).'],
    ['.lanes__head > .lanes__corner + .lanes__ticks > .lanes__tick', 'Required. What the rows are, then one tick per column: an hour, or a weekday with the date in `b`. `.is-today` in accent, `.is-off` on the quiet fill for weekends and closed hours.'],
    ['.lanes__row > .lanes__who', 'Required. The name, pinned on the left: an optional `.avatar` and `.lanes__id` with `.lanes__name` and `.lanes__sub`. A `button.lanes__who` opens the person.'],
    ['.lanes__track', 'Required. The time row with a hairline per column. Holds `.lanes__off` and `.lanes__item` blocks.'],
    ['.lanes__item', 'A block at `--from` (columns from the start, fractions allowed) for `--span` columns, with a title `span` and an optional `small` line. A `button` when it opens something.'],
    ['.lanes__off', 'Time that does not count (weekend, closed): the quiet fill behind the blocks, placed like an item.'],
    ['.lanes--now + --now', 'A line for the current time through every track, at `--now` columns, drawn behind the blocks.'],
  ],
  examples: [
    {
      title: 'Who is free today',
      desc: 'Tutors by the hour, with a line at now. Free time is a dashed, quiet block that books on press; a hold that is not confirmed has a dashed edge in its tone; lunch is neutral. Narrow the window: the box scrolls and the names stay.',
      stage: 'block',
      html: roster,
    },
    {
      title: 'Team time off',
      desc: 'Two weeks by day, today in accent, weekends on the quiet fill. Approved leave is filled by kind; a request still waiting has only a dashed edge.',
      stage: 'block',
      html: `${leave}
<div class="legend" style="margin-top: 12px;"><span><i style="background: var(--series-1);"></i>Annual leave</span><span><i style="background: var(--series-2);"></i>Sick</span><span><i style="background: var(--series-4);"></i>Parental leave</span></div>`,
    },
  ],
  variants: [
    ['.lanes__item', 'Series 1 tone. `--2`, `--3`, `--4` for the other series colors, one per kind of block, with a legend.'],
    ['.lanes__item--muted', 'Breaks and blocked time: neutral, quieter text.'],
    ['.lanes__item--pending', 'Not settled yet (a request, a hold): no fill, a dashed edge in the tone.'],
    ['.lanes__item--free', 'Open time people can book: a dashed neutral edge and success text; tints on hover.'],
    ['.lanes--now', 'Shows the now line at `--now`.'],
  ],
  states: [
    ['hover (button item)', 'The tint deepens to 24 %.'],
    ['pressed', 'The block sinks to 0.97 and springs back on `--spring-snappy`.'],
    ['focus', 'A 2 px focus ring outside the block, raised above its neighbours.'],
    ['.is-new', 'A block just added (an approved request, a new booking) grows in from its start once.'],
    ['filtered', '`hidden` on a `.lanes__row` removes the whole row.'],
    ['loading', 'Keep the head; skeleton rows of `--row-h` with a `.skel` name and two or three `.skel` blocks.'],
    ['empty', 'An [empty state](empty-state) under the head: "Nobody is off in these two weeks".'],
  ],
  motion: [
    'Button blocks sink to 0.97 on press and return on `--spring-snappy` (360 ms); the tint changes over `--d-fast`.',
    'A new block (`.is-new`) grows from its start edge on `--spring-snappy`, once, so the eye finds what changed.',
    'Nothing else moves: the grid is a reference people read, not a show. Reduced motion: no press scale, no grow.',
  ],
  a11y: [
    'The box is a focusable `region` with a label that says what and when ("Doctors today, 07:00 to 17:00"), so it scrolls by keyboard.',
    'Every block says its time in words where the position alone carries it: put the hours or dates in the `small` line, or in the button\'s `aria-label` ("Free from 13:00 to 14:30, book").',
    'Tones repeat a word in the block or the legend; never rely on color alone. Pending says "Requested" or "Hold" in its title.',
    'Interactive blocks are real buttons with a visible focus ring; read-only blocks are plain elements.',
  ],
  do: [
    'Start the columns where the day or period starts for the people reading it (07:00, Monday).',
    'Show free time when the reader is looking for it, and make it bookable.',
    'Mark weekends and closed hours with `.lanes__off`.',
  ],
  dont: [
    'Put more than four tones in one grid.',
    'Squeeze it under about 480 px without letting it scroll; blocks shorter than an hour column lose their words.',
    'Use it for one person\'s month; that is an [event calendar](event-calendar).',
  ],
  related: ['event-calendar', 'timeline', 'calendar', 'kanban'],
};
