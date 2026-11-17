# Target bar

Group: Charts. Docs page: `docs/components/target-bar.html`.

A horizontal bar for progress toward a goal: the fill is where you are, a marker shows where you should be (the goal, or today's pace), and an optional tint ahead of the fill shows the forecast. Words above say the value against the goal.

## Use it when
- A figure measured against a target: local tax income against the quarter target, participants against the planned quota, vaccine doses against the weekly plan.
- Comparing actual and expected pace: the marker sits where you should be by today, so falling behind is visible before the deadline.
- A short list of goals side by side (one per puskesmas, per team, per month).

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
| `.target__meta` | Required. `.target__label` and `.target__val` ("**Rp 84.3 bn** of Rp 100 bn"). |
| `.target__track` | Required. 12 px track, `role="img"` with the values in words. |
| `.target__fill` | Required. The actual value, in the accent; `.target--success` once the goal is met, `.target--warning` when behind pace. |
| `.target__forecast` | Optional. The projected end value as a tint behind the fill. |
| `.target__mark` | Required. A 2 px marker crossing the track, with `.target__mark-label` above it. `.is-end` aligns the label to the right when the marker is near the end. |
| `.target__foot` | Optional. Days left, pace in words. |

## Markup

**Quarter goal with a forecast.** The fill is the income so far, the tint is where the trend ends the quarter, the marker is the goal. Fills grow in on first view.
```html
<section class="chart-card" style="max-width: 520px;" data-lds-grow aria-labelledby="tb-q">
  <div><div class="chart-card__q" id="tb-q">Will we reach the Q4 target?</div><div class="chart-card__sub">Local tax income since 1 October</div></div>
  <div class="target" style="--v: 84.3%; --t: 100%; --f: 97%;">
    <div class="target__meta"><span class="target__label">Local tax</span><span class="target__val"><b>Rp 84.3 bn</b> of Rp 100 bn</span></div>
    <div class="target__track" role="img" aria-label="Local tax: Rp 84.3 bn of Rp 100 bn, goal marked at 100 percent, forecast 97 percent"><span class="target__forecast"></span><span class="target__fill"></span><span class="target__mark is-end"><span class="target__mark-label">Goal</span></span></div>
    <div class="target__foot"><span>Forecast Rp 97 bn by 31 Dec</span><span>45 days left</span></div>
  </div>
</section>
```

**Marker at today's pace.** Each goal's marker sits where the team should be today. Behind pace turns the fill to warning, and the words say so.
```html
<section class="chart-card" style="max-width: 520px;" aria-labelledby="tb-pace">
  <div><div class="chart-card__q" id="tb-pace">Which puskesmas are on plan?</div><div class="chart-card__sub">Vaccine doses given this week against each puskesmas plan</div></div>
  <div class="target-list" data-lds-grow>
  <div class="target target--success" style="--v: 87.5%; --t: 62%;">
    <div class="target__meta"><span class="target__label">Puskesmas Kedaton</span><span class="target__val"><b>175</b> of 200 doses</span></div>
    <div class="target__track" role="img" aria-label="Puskesmas Kedaton: 175 of 200 doses, goal marked at 62 percent"><span class="target__fill"></span><span class="target__mark"><span class="target__mark-label">Today</span></span></div>
    <div class="target__foot"><span>Ahead of plan</span></div>
  </div>
  <div class="target target--warning" style="--v: 33%; --t: 62%;">
    <div class="target__meta"><span class="target__label">Puskesmas Panjang</span><span class="target__val"><b>60</b> of 180 doses</span></div>
    <div class="target__track" role="img" aria-label="Puskesmas Panjang: 60 of 180 doses, goal marked at 62 percent"><span class="target__fill"></span><span class="target__mark"><span class="target__mark-label">Today</span></span></div>
    <div class="target__foot"><span>52 doses behind plan</span></div>
  </div>
  <div class="target" style="--v: 60%; --t: 62%;">
    <div class="target__meta"><span class="target__label">Puskesmas Way Halim</span><span class="target__val"><b>90</b> of 150 doses</span></div>
    <div class="target__track" role="img" aria-label="Puskesmas Way Halim: 90 of 150 doses, goal marked at 62 percent"><span class="target__fill"></span><span class="target__mark"><span class="target__mark-label">Today</span></span></div>
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
| `over the goal` | Cap `--v` at 100 %, switch to `.target--success` and say the overshoot in words ("Rp 4.2 bn over"). |
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
- Say the goal in the meta ("of Rp 100 bn") and what the marker means ("Goal", "Today").
- Use the pace marker for goals with a deadline.

## Don't
- Use a target bar for something without a goal; that is a [ranked bar](ranked-bars.md) or a [meter](meter.md).
- Stack more than one fill and one forecast in a track.
- Color a fill red for being behind; warning is enough, words carry the rest.

## Behavior (plain HTML)
Optional: `data-lds-grow` on the bar or its list plays the first-view entrance.

## Related
[Progress bar](progress-bar.md) · [Meter](meter.md) · [KPI card](kpi-card.md) · [Ranked bars](ranked-bars.md)
