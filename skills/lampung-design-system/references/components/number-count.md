# Number count

Group: Motion. Docs page: `docs/components/number-count.html`.

When a number changes in front of someone, each digit column rolls to its new value on the smooth spring, and bars and rings glide to their new length on the in-out curve. The change is visible, the new value is readable at once, and the width never jumps.

## Use it when
- A count the person just changed: a stepper, a like count, items in a cart, seats reserved.
- A live figure updating while watched: submissions coming in, people online, a score being totalled.
- A progress value moving: a [progress bar](progress-bar.md), a [progress ring](progress-ring.md), a [meter](meter.md).

## Use something else when
- A word or label changing (Saved, In review): use [Text morph](text-morph.md).
- A number shown once on load (totals in a report): use [Stat row](stat-row.md). Just show it; do not count up from zero.
- A countdown to a deadline: use [Timer](timer.md).
- Waiting with no known amount: use [Thinking](thinking.md).

## Where it goes
Wherever the number lives: inside a [number stepper](number-stepper.md), a [like](like.md) button, a key figure, a table cell that updates live. `.roll` inherits the font, so it works at any size.

## Markup

**A stepper the person drives.** Each press rolls only the digits that change; going from 19 to 20 rolls both columns at once.
```html
<div class="field">
  <span class="field__label" id="nc-seat">Seats to reserve</span>
  <div class="stepper-field" role="group" aria-labelledby="nc-seat" data-lds-stepper data-min="1" data-max="40" data-value="18">
    <button aria-label="Fewer seats"><span class="ic" aria-hidden="true">remove</span></button>
    <span class="stepper-field__value"><span class="roll" aria-live="polite"></span></span>
    <button aria-label="More seats"><span class="ic" aria-hidden="true">add</span></button>
  </div>
</div>
```

**A live count.** Submissions arriving during an exam. The figure rolls each time; the label stays put.
```html
<span class="roll" data-lds-roll="27"></span>
<script type="module">
  import { setRoll } from 'lampung-design-system/js';
  setRoll(document.querySelector('.roll'), 28);
</script>
```

**Progress that moves.** The bar and the ring glide to the new value on the in-out curve (480 ms): something already on screen moving, not arriving.
```html
<div class="docs-col" style="max-width: 360px;" data-p="60">
  <div class="progress-meta"><span>Course progress</span><b>12 of 20 lessons</b></div>
  <div class="progress" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" aria-label="Course progress"><div class="progress__fill" style="transform: scaleX(0.6);"></div></div>
  <div class="docs-row"><div class="ring" role="img" aria-label="Course progress 60 percent"><svg viewBox="0 0 64 64" aria-hidden="true"><circle class="ring__track" cx="32" cy="32" r="27"></circle><circle class="ring__val" cx="32" cy="32" r="27" stroke-dasharray="169.6" stroke-dashoffset="67.8"></circle></svg><span class="ring__label">60%</span></div><button class="btn btn--secondary btn--sm" onclick="const box = this.closest('.docs-col'); let p = Number(box.dataset.p || 60); p = p >= 100 ? 20 : p + 20; box.dataset.p = p; box.querySelector('.progress__fill').style.transform = 'scaleX(' + p / 100 + ')'; box.querySelector('.progress').setAttribute('aria-valuenow', p); box.querySelector('.ring__val').setAttribute('stroke-dashoffset', (169.6 * (1 - p / 100)).toFixed(1)); box.querySelector('.ring__label').textContent = p + '%'; box.querySelector('.ring').setAttribute('aria-label', 'Course progress ' + p + ' percent');">Finish a lesson</button></div>
</div>
```

## Motion and microinteractions
- Rolling digits: each `.roll__col` is a column of 0 to 9 moved with `translateY(-n × 1.2em)` on `--spring-smooth` over `--d-smooth` (560 ms). Columns roll independently; unchanged digits stay still. Tabular numerals keep the width.
- When the number of digits changes (9 to 10), the new column appears without a roll and the rest roll as usual.
- Bars: `.progress__fill` scales on X over `--d-considered` (480 ms) on `--ease-inout`. Rings: `stroke-dashoffset` over the same. Charts use the same pair for data changes.
- Interruption: these are transitions, so a new value mid-roll redirects from where the column is.
- Do not count up from zero on load: a number that was not seen before is just shown.
- Reduced motion: digits, bars and rings change in 120 ms linear.

## Accessibility
- `setRoll` writes the full value to `aria-label` on the `.roll` and hides the columns (`aria-hidden`), so screen readers read "28", not ten digits.
- For counts that change because of the person (stepper), `aria-live="polite"` on the `.roll` reads the new value; for live counts that change often, do not make them live regions.
- Bars and rings keep `role="progressbar"` with `aria-valuenow` (or a text label) in sync with the visual.

## Do
- Use `.roll` for counts that change in front of people.
- Keep `font-variant-numeric: tabular-nums` (built into `.roll`).
- Move bars with transform, not width.

## Don't
- Count up from zero when a page loads.
- Roll numbers inside tables that re-render on every sort.
- Animate a value the person cannot see changing (offscreen); set it.

## Behavior (plain HTML)
`data-lds-roll="128"` renders the value on `init()`; `setRoll(el, value)` changes it. `data-lds-stepper` (with `data-min`, `data-max`, `data-value`) drives a roll from its two buttons, disables them at the limits, and emits `lds:change` with `{ value }`. The [like](like.md) button rolls its count by itself.

## Related
[Rolling number](rolling-number.md) · [Number stepper](number-stepper.md) · [Progress bar](progress-bar.md) · [Progress ring](progress-ring.md)
