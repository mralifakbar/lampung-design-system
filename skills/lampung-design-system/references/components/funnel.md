# Funnel

Group: Charts. Docs page: `docs/components/funnel.html`.

The steps of a flow, each with how many reached it and what share of the step before moved on. Centered bars narrow with the count, so the biggest drop is visible at a glance; the words carry the exact numbers.

## Use it when
- A sequence where each step is a subset of the one before: open, fill in, submit, issued; register, screen, interview, accept.
- Finding the step that loses the most people, to decide what to fix first.

## Use something else when
- Categories that are not nested steps: use [Ranked bars](ranked-bars.md).
- Change of one count over time: use [Area chart](area-chart.md).
- Parts of one whole: use [Percentage bar](percentage-bar.md).
- The status of one record moving through steps: use [Steps](steps.md).

## Where it goes
In a [chart card](chart-card.md), half or full width. Three to six steps. Words sit above each bar, so it works at 320 px without change.

## Anatomy
| Part | What it is |
|---|---|
| `ol.funnel` | Required. An ordered list with an `aria-label`; the order is the meaning. |
| `li.funnel__row` | Required. One step. `--v` is its count as a percent of the first step. |
| `.funnel__meta` | Required. `.funnel__label` (the step), `.funnel__val` (the count) and `.funnel__conv` (share of the step before). |
| `.funnel__track > .funnel__bar` | Required. A 28 px fill track with the bar centered in it; decorative (`aria-hidden`). |
| `.is-drop` | Optional on a row: the step that loses most (or under your threshold); its share turns to danger text. |

## Markup

**From opening the page to permit issued.** Under 40 % moving on marks the step red in words. Bars grow from the center on first view, one after another.
```html
<section class="chart-card" style="max-width: 560px;" aria-labelledby="fn-q">
  <div><div class="chart-card__q" id="fn-q">At which step do applicants stop?</div><div class="chart-card__sub">People at each step, 1 to 16 November</div></div>
  <ol class="funnel" data-lds-grow aria-label="Business permit application flow, 1 to 16 November">
  <li class="funnel__row" style="--v: 100.0%;">
    <div class="funnel__meta"><span class="funnel__label">Opened the business permit page</span><span><span class="funnel__val">12,480</span></span></div>
    <div class="funnel__track" aria-hidden="true"><span class="funnel__bar"></span></div>
  </li>
  <li class="funnel__row" style="--v: 42.0%;">
    <div class="funnel__meta"><span class="funnel__label">Started the form</span><span><span class="funnel__val">5,240</span><span class="funnel__conv">42% of the step before</span></span></div>
    <div class="funnel__track" aria-hidden="true"><span class="funnel__bar"></span></div>
  </li>
  <li class="funnel__row" style="--v: 24.9%;">
    <div class="funnel__meta"><span class="funnel__label">Uploaded documents</span><span><span class="funnel__val">3,110</span><span class="funnel__conv">59% of the step before</span></span></div>
    <div class="funnel__track" aria-hidden="true"><span class="funnel__bar"></span></div>
  </li>
  <li class="funnel__row" style="--v: 18.3%;">
    <div class="funnel__meta"><span class="funnel__label">Submitted the application</span><span><span class="funnel__val">2,290</span><span class="funnel__conv">74% of the step before</span></span></div>
    <div class="funnel__track" aria-hidden="true"><span class="funnel__bar"></span></div>
  </li>
  <li class="funnel__row is-drop" style="--v: 4.9%;">
    <div class="funnel__meta"><span class="funnel__label">Permit issued</span><span><span class="funnel__val">610</span><span class="funnel__conv">27% of the step before</span></span></div>
    <div class="funnel__track" aria-hidden="true"><span class="funnel__bar"></span></div>
  </li>
</ol>
  <div class="chart-card__foot"><span>Biggest loss: application to permit issued, 27% move on</span></div>
</section>
```

**A short funnel.** Four steps of recruiting posyandu volunteers.
```html
<section class="chart-card" style="max-width: 420px;" aria-labelledby="fn-h">
  <div><div class="chart-card__q" id="fn-h">How many volunteer candidates make it through?</div><div class="chart-card__sub">Posyandu volunteer registration, second round</div></div>
  <ol class="funnel" data-lds-grow aria-label="Posyandu volunteer recruitment, second round">
  <li class="funnel__row" style="--v: 100.0%;">
    <div class="funnel__meta"><span class="funnel__label">Registered</span><span><span class="funnel__val">214</span></span></div>
    <div class="funnel__track" aria-hidden="true"><span class="funnel__bar"></span></div>
  </li>
  <li class="funnel__row" style="--v: 44.9%;">
    <div class="funnel__meta"><span class="funnel__label">Passed document check</span><span><span class="funnel__val">96</span><span class="funnel__conv">45% of the step before</span></span></div>
    <div class="funnel__track" aria-hidden="true"><span class="funnel__bar"></span></div>
  </li>
  <li class="funnel__row is-drop" style="--v: 14.5%;">
    <div class="funnel__meta"><span class="funnel__label">Interviewed</span><span><span class="funnel__val">31</span><span class="funnel__conv">32% of the step before</span></span></div>
    <div class="funnel__track" aria-hidden="true"><span class="funnel__bar"></span></div>
  </li>
  <li class="funnel__row is-drop" style="--v: 2.8%;">
    <div class="funnel__meta"><span class="funnel__label">Accepted</span><span><span class="funnel__val">6</span><span class="funnel__conv">19% of the step before</span></span></div>
    <div class="funnel__track" aria-hidden="true"><span class="funnel__bar"></span></div>
  </li>
</ol>
</section>
```

## Variants and sizes
| Class or attribute | When |
|---|---|
| `.is-drop` | Flags the step with the weakest share; say it in the footer too. |
| `--v` | Bar width: count divided by the first step's count. |

## States
| State | How |
|---|---|
| `data change` | Set new `--v` and words: bars move over 480 ms on `--ease-inout`. |
| `empty` | Keep the step names; counts at 0 and one line: "No visits in this period". |
| `loading` | A `.skel` line and a 28 px `.skel` strip per step. |

## Motion and microinteractions
- First view (`data-lds-grow`): bars grow outward from the center on `--spring-smooth`, 35 ms apart top to bottom.
- Later changes: width over `--d-considered` on `--ease-inout`. Hover fades other bars over `--d-fast`.
- Reduced motion: drawn at once.

## Accessibility
- An `ol` with `aria-label`, so the steps are announced in order with their counts and shares as text.
- The bars are `aria-hidden`; they repeat the numbers.
- The weakest step is named in words in the footer, not only by color.

## Do
- Name steps as what people did ("Submitted the application").
- Show the share of the step before, not of the first step; that is where the decision is.

## Don't
- Draw trapezoids or 3D cones; centered bars are exact.
- Use a funnel for steps people can skip or repeat.

## Behavior (plain HTML)
Optional: `data-lds-grow` on the list plays the first-view entrance.

## Related
[Ranked bars](ranked-bars.md) · [Percentage bar](percentage-bar.md) · [Chart card](chart-card.md) · [Steps](steps.md)
