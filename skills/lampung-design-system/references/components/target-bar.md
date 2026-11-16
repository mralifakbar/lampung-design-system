# Target bar

Group: Charts (new). Docs page: `docs/components/target-bar.html`.

A horizontal bar for progress toward a goal: the fill is where you are, a marker shows where you should be (the goal, or today's pace), and an optional tint ahead of the fill shows the forecast. Words above say the value against the goal.

## Use it when
- A figure measured against a target: revenue against the quarter goal, enrolments against capacity planned, hours studied against the weekly plan.
- Comparing actual and expected pace: the marker sits where you should be by today, so falling behind is visible before the deadline.
- A short list of goals side by side (one per course, per team, per month).

## Use something else when
- A task running toward done (upload, import): use [Progress bar](progress-bar.md).
- A quantity against a hard limit (storage, seats): use [Meter](meter.md).
- A score in a square space: use [Progress ring](progress-ring.md).
- Comparing many categories with each other: use [Ranked bars](ranked-bars.md).
- Parts of one whole: use [Percentage bar](percentage-bar.md).

## Where it goes
In a [chart card](chart-card.md) or a [KPI card](kpi-card.md) under the figure; several in a `.target-list`, 20 px apart. Full width of its container; the words wrap above the bar on phones.

## Anatomy
| Part | What it is |
|---|---|
| `.target` | Required. Sets `--v` (fill, percent of the track), `--t` (marker) and optional `--f` (forecast). |
| `.target__meta` | Required. `.target__label` and `.target__val` ("**$84,300** of $100,000"). |
| `.target__track` | Required. 12 px track, `role="img"` with the values in words. |
| `.target__fill` | Required. The actual value, in the accent; `.target--success` once the goal is met, `.target--warning` when behind pace. |
| `.target__forecast` | Optional. The projected end value as a tint behind the fill. |
| `.target__mark` | Required. A 2 px marker crossing the track, with `.target__mark-label` above it. `.is-end` aligns the label to the right when the marker is near the end. |
| `.target__foot` | Optional. Days left, pace in words. |

## Markup

**Quarter goal with a forecast.** The fill is the revenue so far, the tint is where the trend ends the quarter, the marker is the goal. Fills grow in on first view.
```html
<section class="chart-card" style="max-width: 520px;" data-lds-grow aria-labelledby="tb-q">
  <div><div class="chart-card__q" id="tb-q">Will we reach the Q4 goal?</div><div class="chart-card__sub">Course sales since 1 October</div></div>
  <div class="target" style="--v: 84.3%; --t: 100%; --f: 97%;">
    <div class="target__meta"><span class="target__label">Sales</span><span class="target__val"><b>$84,300</b> of $100,000</span></div>
    <div class="target__track" role="img" aria-label="Sales: $84,300 of $100,000, goal marked at 100 percent, forecast 97 percent"><span class="target__forecast"></span><span class="target__fill"></span><span class="target__mark is-end"><span class="target__mark-label">Goal</span></span></div>
    <div class="target__foot"><span>Forecast $97,000 by 31 Dec</span><span>45 days left</span></div>
  </div>
</section>
```

**Marker at today's pace.** Each goal's marker sits where the team should be today. Behind pace turns the fill to warning, and the words say so.
```html
<section class="chart-card" style="max-width: 520px;" aria-labelledby="tb-pace">
  <div><div class="chart-card__q" id="tb-pace">Which study plans are on track?</div><div class="chart-card__sub">Hours studied this week against each plan</div></div>
  <div class="target-list" data-lds-grow>
  <div class="target target--success" style="--v: 87.5%; --t: 62%;">
    <div class="target__meta"><span class="target__label">Database Systems</span><span class="target__val"><b>7 h</b> of 8 h</span></div>
    <div class="target__track" role="img" aria-label="Database Systems: 7 h of 8 h, goal marked at 62 percent"><span class="target__fill"></span><span class="target__mark"><span class="target__mark-label">Today</span></span></div>
    <div class="target__foot"><span>Ahead of plan</span></div>
  </div>
  <div class="target target--warning" style="--v: 33%; --t: 62%;">
    <div class="target__meta"><span class="target__label">Statistics</span><span class="target__val"><b>2 h</b> of 6 h</span></div>
    <div class="target__track" role="img" aria-label="Statistics: 2 h of 6 h, goal marked at 62 percent"><span class="target__fill"></span><span class="target__mark"><span class="target__mark-label">Today</span></span></div>
    <div class="target__foot"><span>1.7 h behind plan</span></div>
  </div>
  <div class="target" style="--v: 60%; --t: 62%;">
    <div class="target__meta"><span class="target__label">Academic writing</span><span class="target__val"><b>3 h</b> of 5 h</span></div>
    <div class="target__track" role="img" aria-label="Academic writing: 3 h of 5 h, goal marked at 62 percent"><span class="target__fill"></span><span class="target__mark"><span class="target__mark-label">Today</span></span></div>
    <div class="target__foot"><span>On plan</span></div>
  </div>
  </div>
</section>
```

## Variants and sizes
| Class or attribute | When |
|---|---|
| `--v, --t, --f` | Fill, marker and forecast positions as percentages of the track. |
| `.target--success` | Goal met or ahead of pace. |
| `.target--warning` | Behind pace; say by how much in the foot. |
| `.target__mark.is-end` | Marker label aligned to its right edge (goal at 90 % or more). |

## States
| State | How |
|---|---|
| `over the goal` | Cap `--v` at 100 %, switch to `.target--success` and say the overshoot in words ("$4,200 over"). |
| `no forecast yet` | Leave out `.target__forecast` and say why in the foot ("Forecast after week 2"). |
| `loading` | A `.skel` line for the words and a 12 px `.skel` strip for the track. |

## Motion and microinteractions
- Fill, forecast and marker move on `--d-considered` (480 ms) on `--ease-inout` when values change, from where they are.
- First view (`data-lds-grow`): fills grow from zero on the same transition; the marker stays put.
- Reduced motion: values switch in 120 ms.

## Accessibility
- The track is `role="img"` with value, goal and forecast in words; the meta line repeats the value as text.
- Ahead or behind is said in the foot, never only by the fill color.
- The marker label is real text, 12 px, with tabular figures.

## Do
- Say the goal in the meta ("of $100,000") and what the marker means ("Goal", "Today").
- Use the pace marker for goals with a deadline.

## Don't
- Use a target bar for something without a goal; that is a [ranked bar](ranked-bars.md) or a [meter](meter.md).
- Stack more than one fill and one forecast in a track.
- Color a fill red for being behind; warning is enough, words carry the rest.

## Behavior (plain HTML)
Optional: `data-lds-grow` on the bar or its list plays the first-view entrance.

## Related
[Progress bar](progress-bar.md) · [Meter](meter.md) · [KPI card](kpi-card.md) · [Ranked bars](ranked-bars.md)
