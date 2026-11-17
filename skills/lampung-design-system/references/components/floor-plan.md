# Floor plan

Group: Data display. Docs page: `docs/components/floor-plan.html`.

Bookable things drawn where they are: tables in a dining room, rooms on a floor, desks in a regional library. Each one is a button colored by its state, and the state is always in words too, so people find a free one by place and by name.

## Use it when
- Where something is matters as much as its state: tables in a restaurant, desks or study rooms people book, beds on a puskesmas ward.
- Rooms of a building by floor, where staff scan for the ones that need them (cleaning, inspection, out of order).
- A front desk or host stand that seats, moves and joins things all day and needs to see the whole room at once.

## Use something else when
- Bookings over days or hours, per room or person: use [Lanes](lanes.md).
- Records compared by many attributes: use [Data table](data-table.md).
- A few items whose place does not matter: use [List](list.md).
- The stops of one trip: use [Route schematic](route-schematic.md).

## Where it goes
A full card width or eight of twelve columns, with its legend under it. A placed plan keeps its shape: give it a `--min` width and it scrolls sideways inside its box on phones. A flowing plan (`.floor--flow`) reflows instead, so it suits room grids that have no real geometry.

## Anatomy
| Part | What it is |
|---|---|
| `.floor` | Required. The box on the quiet fill, 16 px padding, large radius. It scrolls sideways when the plan is wider; give it `tabindex="0"`, `role="region"` and a label then. |
| `.floor__plan` | Required. The grid. `--cols` columns, `--row` row height (64 px), `--min` the narrowest it may get before the box scrolls. Units take a `grid-area`. |
| `.floor--flow` | Variant. Units flow into columns of at least `--unit` (96 px); a `.floor__label` (with a `small` count) starts each group, such as a floor. |
| `button.floor__unit` | Required. One table, room or desk: `.floor__name` and `.floor__meta` (the state or who is there, in words). `aria-pressed` marks the one whose details are open. `--round` for round tables. |
| `.floor__flag` | Optional. One icon in the corner for something that needs a look (late, a request, a warning). The meta says it in words. |
| `.floor__zone` | Optional. A dashed area with its name behind the units: bar, terrace, quiet room. Not interactive. |
| `.floor__legend > .floor__key` | Recommended. One key per state with the count in `b`, in the same tones as the units. |

## Markup

**Placed: a regional library.** Desks and booths where they stand. Booked, in use, cleaning and out of order each have a tone and a word; the selected booth has the accent ring. Narrow the window: the plan keeps its shape and scrolls inside its box.
```html
<div class="stack" style="--gap: 12px;">
<div class="floor" tabindex="0" role="region" aria-label="Regional library, ground floor, scrolls sideways" style="--cols: 10; --row: 56px; --min: 560px;">
  <div class="floor__plan">
    <span class="floor__zone" style="grid-area: 1 / 8 / 5 / 11;">Quiet room</span>
    <button class="floor__unit floor__unit--round" type="button" aria-pressed="false" style="grid-area: 1 / 1 / 3 / 3;"><span class="floor__name">A1</span><span class="floor__meta">Free</span></button>
    <button class="floor__unit floor__unit--round floor__unit--accent" type="button" aria-pressed="false" style="grid-area: 1 / 3 / 3 / 5;"><span class="floor__name">A2</span><span class="floor__meta">Booked 14:00</span></button>
    <button class="floor__unit floor__unit--round floor__unit--strong" type="button" aria-pressed="true" style="grid-area: 1 / 5 / 3 / 7;"><span class="floor__name">A3</span><span class="floor__meta">In use</span></button>
    <button class="floor__unit floor__unit--strong" type="button" aria-pressed="false" style="grid-area: 3 / 1 / 4 / 4;"><span class="floor__name">B1</span><span class="floor__meta">In use</span></button>
    <button class="floor__unit" type="button" aria-pressed="false" style="grid-area: 3 / 4 / 4 / 7;"><span class="floor__name">B2</span><span class="floor__meta">Free</span></button>
    <button class="floor__unit floor__unit--muted" type="button" aria-pressed="false" style="grid-area: 2 / 8 / 3 / 10;"><span class="floor__name">Q1</span><span class="floor__meta">Cleaning</span></button>
    <button class="floor__unit" type="button" aria-pressed="false" style="grid-area: 3 / 8 / 4 / 10;"><span class="floor__name">Q2</span><span class="floor__meta">Free</span></button>
    <button class="floor__unit floor__unit--danger" type="button" aria-pressed="false" style="grid-area: 4 / 1 / 5 / 3;"><span class="ic floor__flag" aria-hidden="true">warning</span><span class="floor__name">C1</span><span class="floor__meta">Out of order</span></button>
    <button class="floor__unit floor__unit--accent" type="button" aria-pressed="false" style="grid-area: 4 / 3 / 5 / 5;"><span class="floor__name">C2</span><span class="floor__meta">Booked 15:30</span></button>
  </div>
</div>
<div class="floor__legend"><span class="floor__key">Free <b>3</b></span><span class="floor__key floor__key--accent">Booked <b>2</b></span><span class="floor__key floor__key--strong">In use <b>2</b></span><span class="floor__key floor__key--muted">Cleaning <b>1</b></span><span class="floor__key floor__key--danger">Out of order <b>1</b></span></div>
</div>
```

**Flowing: rooms by floor.** No geometry, just order: rooms flow into as many columns as fit, a label starts each floor and counts what is ready.
```html
<div class="floor floor--flow" style="--unit: 84px; --row: 60px; max-width: 640px;">
  <div class="floor__plan">
    <div class="floor__label">Floor 2<small>6 rooms · 2 ready</small></div>
    <button class="floor__unit floor__unit--success" type="button" aria-pressed="false"><span class="floor__name">201</span><span class="floor__meta">Ready</span></button><button class="floor__unit floor__unit--strong" type="button" aria-pressed="false"><span class="floor__name">202</span><span class="floor__meta">In use</span></button><button class="floor__unit floor__unit--warning" type="button" aria-pressed="false"><span class="floor__name">203</span><span class="floor__meta">To clean</span></button><button class="floor__unit floor__unit--success" type="button" aria-pressed="false"><span class="floor__name">204</span><span class="floor__meta">Ready</span></button><button class="floor__unit floor__unit--strong" type="button" aria-pressed="false"><span class="floor__name">205</span><span class="floor__meta">In use</span></button><button class="floor__unit floor__unit--muted" type="button" aria-pressed="false"><span class="floor__name">206</span><span class="floor__meta">Closed</span></button>
    <div class="floor__label">Floor 1<small>4 rooms · 1 ready</small></div>
    <button class="floor__unit floor__unit--strong" type="button" aria-pressed="false"><span class="floor__name">101</span><span class="floor__meta">In use</span></button><button class="floor__unit floor__unit--warning" type="button" aria-pressed="false"><span class="floor__name">102</span><span class="floor__meta">To clean</span></button><button class="floor__unit floor__unit--success" type="button" aria-pressed="false"><span class="floor__name">103</span><span class="floor__meta">Ready</span></button><button class="floor__unit floor__unit--accent" type="button" aria-pressed="false"><span class="floor__name">104</span><span class="floor__meta">Booked 13:00</span></button>
  </div>
</div>
```

## Variants and sizes
| Class or attribute | When |
|---|---|
| `(no tone)` | Free or available: white with a hairline ring. |
| `.floor__unit--accent` | Booked or seated: accent tint. |
| `.floor__unit--strong` | In use, occupied: solid accent with white text. The busiest state, so it should be the one people see first. |
| `.floor__unit--success | --warning | --danger` | Ready or inspected; needs attention (bill, cleaning); broken or blocked. |
| `.floor__unit--muted` | Not available for a quiet reason: closed, being cleaned. |
| `.floor__unit--round` | A round table: a circle in a square area, a pill in a long one. |
| `.floor--flow` | Rooms in order, reflowing by width, grouped by `.floor__label`. |

## States
| State | How |
|---|---|
| `hover` | The ring thickens to 1.5 px in the tone of the unit. |
| `pressed` | Sinks to 0.97 and returns on `--spring-snappy`. |
| `selected` | `aria-pressed="true"`: a 2 px accent ring outside the unit, clear of its fill. |
| `state changed` | Swap the tone class and the meta words: the fill and text cross over `--d-standard`. |
| `loading` | Keep the box; put `.skel` blocks in the same grid areas. |
| `empty` | An [empty state](empty-state.md) inside the box: "No tables on the terrace tonight". |

## Motion and microinteractions
- Tone changes (seated, then ordered, then waiting for the bill) cross-fade the fill and text over `--d-standard` (240 ms), so a change on a busy floor is seen but not loud.
- Press sinks to 0.97 for 90 ms and springs back on `--spring-snappy`.
- Nothing moves on its own; units stay where the room has them. Reduced motion: no press scale, colors change over 120 ms.

## Accessibility
- Every unit is a real button named by its text: "T12, 4 guests, ordered". Put the state in `.floor__meta`, never in color alone.
- `aria-pressed` says which unit has its details open. Open the details in a [drawer](drawer.md) and return focus to the unit when it closes.
- A plan that scrolls is a focusable `region` with a label, so it scrolls by keyboard.
- Zones are text for sighted readers; repeat the area in the label of the units that need it ("Terrace, T21").

## Do
- Name units the way staff say them (T12, 503) and put the state or the guest in the meta line.
- Keep a legend with counts under the plan.
- Use the strongest tone for the state that matters most on that floor.

## Don't
- Draw walls, chairs or furniture; the plan is a map of what can be booked.
- Use more than five tones on one plan.
- Shrink a placed plan until names truncate; let it scroll instead.

## Related
[Lanes](lanes.md) · [List](list.md) · [Drawer](drawer.md) · [Badge](badge.md)
