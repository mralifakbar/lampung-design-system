# Lanes

Group: Data display. Docs page: `docs/components/lanes.html`.

Who is busy when: one row per person, room or resource, time running across, and blocks placed by their start and length. The question it answers is "who is free, and when", so gaps matter as much as blocks.

## Use it when
- A roster where people book or plan around each other's time: doctors' hours today, field assistants, officer shifts.
- Team time off across one to four weeks, with requests that are not approved yet.
- Rooms, beds or vehicles booked by the hour or the day.

## Use something else when
- One person's or one team's events by month, week or agenda: use [Event calendar](event-calendar.md).
- Work moving through stages: use [Kanban](kanban.md).
- The history of one record: use [Timeline](timeline.md).
- Activity per day over months, as intensity: use [Heatmap](heatmap.md).

## Where it goes
Full width of the content column, or at least eight of twelve columns: time needs room. On phones the box scrolls sideways with the name column pinned; the name column narrows and drops the avatar under 560 px of box width. Put a legend under it when blocks use more than one tone.

## Anatomy
| Part | What it is |
|---|---|
| `.lanes-box` | Required. The scroll box: white, ring, large radius. Give it `tabindex="0"`, `role="region"` and an `aria-label` that names the span, so keyboard users can scroll it. |
| `.lanes` | Required. The grid. `--cols` the number of time columns, `--col-min` the narrowest a column may get before the box scrolls (56 px), `--who` the name column (200 px), `--row-h` the row height (56 px). |
| `.lanes__head > .lanes__corner + .lanes__ticks > .lanes__tick` | Required. What the rows are, then one tick per column: an hour, or a weekday with the date in `b`. `.is-today` in accent, `.is-off` on the quiet fill for weekends and closed hours. |
| `.lanes__row > .lanes__who` | Required. The name, pinned on the left: an optional `.avatar` and `.lanes__id` with `.lanes__name` and `.lanes__sub`. A `button.lanes__who` opens the person. |
| `.lanes__track` | Required. The time row with a hairline per column. Holds `.lanes__off` and `.lanes__item` blocks. |
| `.lanes__item` | A block at `--from` (columns from the start, fractions allowed) for `--span` columns, with a title `span` and an optional `small` line. A `button` when it opens something. |
| `.lanes__off` | Time that does not count (weekend, closed): the quiet fill behind the blocks, placed like an item. |
| `.lanes--now + --now` | A line for the current time through every track, at `--now` columns, drawn behind the blocks. |

## Markup

**Who is free today.** Doctors by the hour, with a line at now. Free time is a dashed, quiet block that books on press; a hold that is not confirmed has a dashed edge in its tone; lunch is neutral. Narrow the window: the box scrolls and the names stay.
```html
<div class="lanes-box" tabindex="0" role="region" aria-label="Doctors today, scrolls sideways">
  <div class="lanes lanes--now" style="--cols: 10; --now: 3.33;">
    <div class="lanes__head"><div class="lanes__corner">Doctor</div><div class="lanes__ticks"><span class="lanes__tick">07:00</span><span class="lanes__tick">08:00</span><span class="lanes__tick">09:00</span><span class="lanes__tick">10:00</span><span class="lanes__tick">11:00</span><span class="lanes__tick">12:00</span><span class="lanes__tick">13:00</span><span class="lanes__tick">14:00</span><span class="lanes__tick">15:00</span><span class="lanes__tick">16:00</span></div></div>
    <div class="lanes__row"><div class="lanes__who"><span class="avatar avatar--gray" aria-hidden="true">NP</span><span class="lanes__id"><span class="lanes__name">dr. Nadia Putri</span><span class="lanes__sub">General clinic</span></span></div><div class="lanes__track"><div class="lanes__item" style="--from: 1; --span: 2;"><span>Elderly posyandu</span><small>Room 3</small></div><div class="lanes__item lanes__item--muted" style="--from: 5; --span: 1;"><span>Lunch</span></div><button class="lanes__item lanes__item--free" type="button" style="--from: 6; --span: 1.5;"><span>Free</span><small>Book 13:00</small></button><div class="lanes__item lanes__item--3" style="--from: 7.5; --span: 2;"><span>Online consultation</span><small>Teleconsultation</small></div></div></div>
    <div class="lanes__row"><div class="lanes__who"><span class="avatar avatar--gray" aria-hidden="true">RH</span><span class="lanes__id"><span class="lanes__name">dr. Rizky Hartono</span><span class="lanes__sub">Child clinic</span></span></div><div class="lanes__track"><div class="lanes__item lanes__item--4" style="--from: 0; --span: 3;"><span>Immunization</span><small>Room B</small></div><button class="lanes__item lanes__item--free" type="button" style="--from: 3.5; --span: 1.5;"><span>Free</span><small>Book 10:30</small></button><div class="lanes__item lanes__item--muted" style="--from: 5; --span: 1;"><span>Lunch</span></div><div class="lanes__item lanes__item--2" style="--from: 6; --span: 3;"><span>Medical records recap</span></div></div></div>
    <div class="lanes__row"><div class="lanes__who"><span class="avatar avatar--gray" aria-hidden="true">AL</span><span class="lanes__id"><span class="lanes__name">drg. Ayu Lestari</span><span class="lanes__sub">Dental clinic</span></span></div><div class="lanes__track"><span class="lanes__off" style="--from: 0; --span: 2;"></span><div class="lanes__item" style="--from: 2; --span: 2.5;"><span>Patient checks</span><small>6 patients</small></div><div class="lanes__item lanes__item--muted" style="--from: 5; --span: 1;"><span>Lunch</span></div><div class="lanes__item lanes__item--pending" style="--from: 6; --span: 2;"><span>Hold: school dental check</span><small>Not confirmed</small></div></div></div>
  </div>
</div>
```

**Team time off.** Two weeks by day, today in accent, weekends on the quiet fill. Approved leave is filled by kind; a request still waiting has only a dashed edge.
```html
<div class="lanes-box" tabindex="0" role="region" aria-label="Team time off, 16 to 29 November, scrolls sideways">
  <div class="lanes" style="--cols: 14; --col-min: 44px; --who: 180px;">
    <div class="lanes__head"><div class="lanes__corner">Digital service team</div><div class="lanes__ticks"><span class="lanes__tick is-today">Mon<b>16</b></span><span class="lanes__tick">Tue<b>17</b></span><span class="lanes__tick">Wed<b>18</b></span><span class="lanes__tick">Thu<b>19</b></span><span class="lanes__tick">Fri<b>20</b></span><span class="lanes__tick is-off">Sat<b>21</b></span><span class="lanes__tick is-off">Sun<b>22</b></span><span class="lanes__tick">Mon<b>23</b></span><span class="lanes__tick">Tue<b>24</b></span><span class="lanes__tick">Wed<b>25</b></span><span class="lanes__tick">Thu<b>26</b></span><span class="lanes__tick">Fri<b>27</b></span><span class="lanes__tick is-off">Sat<b>28</b></span><span class="lanes__tick is-off">Sun<b>29</b></span></div></div>
    <div class="lanes__row"><div class="lanes__who"><span class="avatar avatar--gray" aria-hidden="true">DL</span><span class="lanes__id"><span class="lanes__name">Dewi Lestari</span><span class="lanes__sub">Designer</span></span></div><div class="lanes__track"><span class="lanes__off" style="--from: 5; --span: 2;"></span><span class="lanes__off" style="--from: 12; --span: 2;"></span><div class="lanes__item" style="--from: 2; --span: 3;"><span>Annual leave</span></div></div></div>
    <div class="lanes__row"><div class="lanes__who"><span class="avatar avatar--gray" aria-hidden="true">GR</span><span class="lanes__id"><span class="lanes__name">Galih Ramadhan</span><span class="lanes__sub">Developer</span></span></div><div class="lanes__track"><span class="lanes__off" style="--from: 5; --span: 2;"></span><span class="lanes__off" style="--from: 12; --span: 2;"></span><div class="lanes__item lanes__item--2" style="--from: 0; --span: 1;"><span>Sick</span></div><div class="lanes__item lanes__item--pending" style="--from: 9; --span: 3;"><span>Requested</span><small>Annual leave</small></div></div></div>
    <div class="lanes__row"><div class="lanes__who"><span class="avatar avatar--gray" aria-hidden="true">SH</span><span class="lanes__id"><span class="lanes__name">Sari Handayani</span><span class="lanes__sub">Service manager</span></span></div><div class="lanes__track"><span class="lanes__off" style="--from: 5; --span: 2;"></span><span class="lanes__off" style="--from: 12; --span: 2;"></span><div class="lanes__item lanes__item--4" style="--from: 7; --span: 5;"><span>Parental leave</span><small>Until 4 Dec</small></div></div></div>
  </div>
</div>
<div class="legend" style="margin-top: 12px;"><span><i style="background: var(--series-1);"></i>Annual leave</span><span><i style="background: var(--series-2);"></i>Sick</span><span><i style="background: var(--series-4);"></i>Parental leave</span></div>
```

## Variants and sizes
| Class or attribute | When |
|---|---|
| `.lanes__item` | Series 1 tone. `--2`, `--3`, `--4` for the other series colors, one per kind of block, with a legend. |
| `.lanes__item--muted` | Breaks and blocked time: neutral, quieter text. |
| `.lanes__item--pending` | Not settled yet (a request, a hold): no fill, a dashed edge in the tone. |
| `.lanes__item--free` | Open time people can book: a dashed neutral edge and success text; tints on hover. |
| `.lanes--now` | Shows the now line at `--now`. |

## States
| State | How |
|---|---|
| `hover (button item)` | The tint deepens to 24 %. |
| `pressed` | The block sinks to 0.97 and springs back on `--spring-snappy`. |
| `focus` | A 2 px focus ring outside the block, raised above its neighbours. |
| `.is-new` | A block just added (an approved request, a new booking) grows in from its start once. |
| `filtered` | `hidden` on a `.lanes__row` removes the whole row. |
| `loading` | Keep the head; skeleton rows of `--row-h` with a `.skel` name and two or three `.skel` blocks. |
| `empty` | An [empty state](empty-state.md) under the head: "Nobody is off in these two weeks". |

## Motion and microinteractions
- Button blocks sink to 0.97 on press and return on `--spring-snappy` (360 ms); the tint changes over `--d-fast`.
- A new block (`.is-new`) grows from its start edge on `--spring-snappy`, once, so the eye finds what changed.
- Nothing else moves: the grid is a reference people read, not a show. Reduced motion: no press scale, no grow.

## Accessibility
- The box is a focusable `region` with a label that says what and when ("Doctors today, 07:00 to 17:00"), so it scrolls by keyboard.
- Every block says its time in words where the position alone carries it: put the hours or dates in the `small` line, or in the button's `aria-label` ("Free from 13:00 to 14:30, book").
- Tones repeat a word in the block or the legend; never rely on color alone. Pending says "Requested" or "Hold" in its title.
- Interactive blocks are real buttons with a visible focus ring; read-only blocks are plain elements.

## Do
- Start the columns where the day or period starts for the people reading it (07:00, Monday).
- Show free time when the reader is looking for it, and make it bookable.
- Mark weekends and closed hours with `.lanes__off`.

## Don't
- Put more than four tones in one grid.
- Squeeze it under about 480 px without letting it scroll; blocks shorter than an hour column lose their words.
- Use it for one person's month; that is an [event calendar](event-calendar.md).

## Related
[Event calendar](event-calendar.md) · [Timeline](timeline.md) · [Calendar](calendar.md) · [Kanban](kanban.md)
