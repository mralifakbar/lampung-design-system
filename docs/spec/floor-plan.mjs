// Floor plan: bookable things drawn where they are (tables, rooms, desks), each a button colored by its state.
const t = (name, meta, area, tone = '', round = false, pressed = false, flag = '') => `<button class="floor__unit${round ? ' floor__unit--round' : ''}${tone ? ` floor__unit--${tone}` : ''}" type="button" aria-pressed="${pressed}" style="grid-area: ${area};">${flag ? `<span class="ic floor__flag" aria-hidden="true">${flag}</span>` : ''}<span class="floor__name">${name}</span><span class="floor__meta">${meta}</span></button>`;

const room = `<div class="stack" style="--gap: 12px;">
<div class="floor" tabindex="0" role="region" aria-label="Study centre, ground floor, scrolls sideways" style="--cols: 10; --row: 56px; --min: 560px;">
  <div class="floor__plan">
    <span class="floor__zone" style="grid-area: 1 / 8 / 5 / 11;">Quiet room</span>
    ${t('A1', 'Free', '1 / 1 / 3 / 3', '', true)}
    ${t('A2', 'Booked 14:00', '1 / 3 / 3 / 5', 'accent', true)}
    ${t('A3', 'In use', '1 / 5 / 3 / 7', 'strong', true, true)}
    ${t('B1', 'In use', '3 / 1 / 4 / 4', 'strong')}
    ${t('B2', 'Free', '3 / 4 / 4 / 7')}
    ${t('Q1', 'Cleaning', '2 / 8 / 3 / 10', 'muted')}
    ${t('Q2', 'Free', '3 / 8 / 4 / 10')}
    ${t('C1', 'Out of order', '4 / 1 / 5 / 3', 'danger', false, false, 'warning')}
    ${t('C2', 'Booked 15:30', '4 / 3 / 5 / 5', 'accent')}
  </div>
</div>
<div class="floor__legend"><span class="floor__key">Free <b>3</b></span><span class="floor__key floor__key--accent">Booked <b>2</b></span><span class="floor__key floor__key--strong">In use <b>2</b></span><span class="floor__key floor__key--muted">Cleaning <b>1</b></span><span class="floor__key floor__key--danger">Out of order <b>1</b></span></div>
</div>`;

const flowRoom = (n, tone, meta) => `<button class="floor__unit${tone ? ` floor__unit--${tone}` : ''}" type="button" aria-pressed="false"><span class="floor__name">${n}</span><span class="floor__meta">${meta}</span></button>`;
const floors = `<div class="floor floor--flow" style="--unit: 84px; --row: 60px; max-width: 640px;">
  <div class="floor__plan">
    <div class="floor__label">Floor 2<small>6 rooms · 2 ready</small></div>
    ${flowRoom('201', 'success', 'Ready')}${flowRoom('202', 'strong', 'In use')}${flowRoom('203', 'warning', 'To clean')}${flowRoom('204', 'success', 'Ready')}${flowRoom('205', 'strong', 'In use')}${flowRoom('206', 'muted', 'Closed')}
    <div class="floor__label">Floor 1<small>4 rooms · 1 ready</small></div>
    ${flowRoom('101', 'strong', 'In use')}${flowRoom('102', 'warning', 'To clean')}${flowRoom('103', 'success', 'Ready')}${flowRoom('104', 'accent', 'Booked 13:00')}
  </div>
</div>`;

export default {
  title: 'Floor plan',
  group: 'Data display',
  order: 22.6,
  status: 'new',
  summary: 'Bookable things drawn where they are: tables in a dining room, rooms on a floor, desks in a study centre. Each one is a button colored by its state, and the state is always in words too, so people find a free one by place and by name.',
  when: [
    'Where something is matters as much as its state: tables in a restaurant, desks or study rooms people book, beds on a ward.',
    'Rooms of a building by floor, where staff scan for the ones that need them (cleaning, inspection, out of order).',
    'A front desk or host stand that seats, moves and joins things all day and needs to see the whole room at once.',
  ],
  whenNot: [
    ['Bookings over days or hours, per room or person', 'lanes'],
    ['Records compared by many attributes', 'data-table'],
    ['A few items whose place does not matter', 'list'],
    ['The stops of one trip', 'route-schematic'],
  ],
  where: 'A full card width or eight of twelve columns, with its legend under it. A placed plan keeps its shape: give it a `--min` width and it scrolls sideways inside its box on phones. A flowing plan (`.floor--flow`) reflows instead, so it suits room grids that have no real geometry.',
  anatomy: [
    ['.floor', 'Required. The box on the quiet fill, 16 px padding, large radius. It scrolls sideways when the plan is wider; give it `tabindex="0"`, `role="region"` and a label then.'],
    ['.floor__plan', 'Required. The grid. `--cols` columns, `--row` row height (64 px), `--min` the narrowest it may get before the box scrolls. Units take a `grid-area`.'],
    ['.floor--flow', 'Variant. Units flow into columns of at least `--unit` (96 px); a `.floor__label` (with a `small` count) starts each group, such as a floor.'],
    ['button.floor__unit', 'Required. One table, room or desk: `.floor__name` and `.floor__meta` (the state or who is there, in words). `aria-pressed` marks the one whose details are open. `--round` for round tables.'],
    ['.floor__flag', 'Optional. One icon in the corner for something that needs a look (late, a request, a warning). The meta says it in words.'],
    ['.floor__zone', 'Optional. A dashed area with its name behind the units: bar, terrace, quiet room. Not interactive.'],
    ['.floor__legend > .floor__key', 'Recommended. One key per state with the count in `b`, in the same tones as the units.'],
  ],
  examples: [
    {
      title: 'Placed: a study centre',
      desc: 'Desks and booths where they stand. Booked, in use, cleaning and out of order each have a tone and a word; the selected booth has the accent ring. Narrow the window: the plan keeps its shape and scrolls inside its box.',
      stage: 'block',
      html: room,
    },
    {
      title: 'Flowing: rooms by floor',
      desc: 'No geometry, just order: rooms flow into as many columns as fit, a label starts each floor and counts what is ready.',
      stage: 'block',
      html: floors,
    },
  ],
  variants: [
    ['(no tone)', 'Free or available: white with a hairline ring.'],
    ['.floor__unit--accent', 'Booked or seated: accent tint.'],
    ['.floor__unit--strong', 'In use, occupied: solid accent with white text. The busiest state, so it should be the one people see first.'],
    ['.floor__unit--success | --warning | --danger', 'Ready or inspected; needs attention (bill, cleaning); broken or blocked.'],
    ['.floor__unit--muted', 'Not available for a quiet reason: closed, being cleaned.'],
    ['.floor__unit--round', 'A round table: a circle in a square area, a pill in a long one.'],
    ['.floor--flow', 'Rooms in order, reflowing by width, grouped by `.floor__label`.'],
  ],
  states: [
    ['hover', 'The ring thickens to 1.5 px in the tone of the unit.'],
    ['pressed', 'Sinks to 0.97 and returns on `--spring-snappy`.'],
    ['selected', '`aria-pressed="true"`: a 2 px accent ring outside the unit, clear of its fill.'],
    ['state changed', 'Swap the tone class and the meta words: the fill and text cross over `--d-standard`.'],
    ['loading', 'Keep the box; put `.skel` blocks in the same grid areas.'],
    ['empty', 'An [empty state](empty-state) inside the box: "No tables on the terrace tonight".'],
  ],
  motion: [
    'Tone changes (seated, then ordered, then waiting for the bill) cross-fade the fill and text over `--d-standard` (240 ms), so a change on a busy floor is seen but not loud.',
    'Press sinks to 0.97 for 90 ms and springs back on `--spring-snappy`.',
    'Nothing moves on its own; units stay where the room has them. Reduced motion: no press scale, colors change over 120 ms.',
  ],
  a11y: [
    'Every unit is a real button named by its text: "T12, 4 guests, ordered". Put the state in `.floor__meta`, never in color alone.',
    '`aria-pressed` says which unit has its details open. Open the details in a [drawer](drawer) and return focus to the unit when it closes.',
    'A plan that scrolls is a focusable `region` with a label, so it scrolls by keyboard.',
    'Zones are text for sighted readers; repeat the area in the label of the units that need it ("Terrace, T21").',
  ],
  do: [
    'Name units the way staff say them (T12, 503) and put the state or the guest in the meta line.',
    'Keep a legend with counts under the plan.',
    'Use the strongest tone for the state that matters most on that floor.',
  ],
  dont: [
    'Draw walls, chairs or furniture; the plan is a map of what can be booked.',
    'Use more than five tones on one plan.',
    'Shrink a placed plan until names truncate; let it scroll instead.',
  ],
  related: ['lanes', 'list', 'drawer', 'badge'],
};
