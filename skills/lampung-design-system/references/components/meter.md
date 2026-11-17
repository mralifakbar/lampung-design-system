# Meter

Group: Feedback. Docs page: `docs/components/meter.html`.

A segmented gauge for a level within a known range: storage used, seats taken, password strength. It shows how full, not how far along.

## Use it when
- A quantity against a limit: storage used, places taken in a training class, reports filed against an allowance.
- A strength or quality level in a few steps, such as password strength (four segments).
- A level that turns into a warning near the limit (`.is-warn`) and a problem at it (`.is-full`).

## Use something else when
- A task that advances to completion: use [Progress bar](progress-bar.md).
- A single score in a compact square: use [Progress ring](progress-ring.md).
- Shares of a whole across categories: use [Percentage bar](percentage-bar.md).
- The person rates something: use [Rating](rating.md).
- A grid of activity over days: use [Heatmap](heatmap.md).

## Where it goes
Under a label that names the quantity, with the value in words (`.progress-meta` works as the header). In settings rows, under a password field, in a plan or storage card. Full width of its container; 160 to 320 px reads best.

## Anatomy
| Part | What it is |
|---|---|
| `.meter-seg` | Required. A grid of ten equal segments with 3 px gaps. Override `grid-template-columns` inline for another count (four for password strength). |
| `i` | Required. One per segment, 8 px tall. |
| `i.on` | A filled segment (accent). |
| `.is-warn / .is-full` | On `.meter-seg`: filled segments turn warning, then danger. |
| `.progress-meta` | Recommended header: the label and the value in words. |

## Markup

**Storage near the limit.** Seven of ten filled is normal; at nine the meter warns and the help text says what to do.
```html
<div class="docs-col" style="max-width: 320px;">
  <div>
    <div class="progress-meta"><span id="m1">Storage</span><b>6.2 of 10 GB</b></div>
    <div class="meter-seg" role="meter" aria-labelledby="m1" aria-valuemin="0" aria-valuemax="10" aria-valuenow="6.2" aria-valuetext="6.2 of 10 GB used"><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i></i><i></i><i></i><i></i></div>
  </div>
  <div>
    <div class="progress-meta"><span id="m2">Storage</span><b>9.1 of 10 GB</b></div>
    <div class="meter-seg is-warn" role="meter" aria-labelledby="m2" aria-valuemin="0" aria-valuemax="10" aria-valuenow="9.1" aria-valuetext="9.1 of 10 GB used, almost full"><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i></i></div>
    <span class="field__help">Almost full. Remove old attachments to keep uploading.</span>
  </div>
</div>
```

**Training places taken.** Full turns the segments to danger; the word "Full" goes next to it.
```html
<div style="max-width: 320px; width: 100%;">
  <div class="progress-meta"><span id="m3">UMKM training places</span><b>40 of 40, full</b></div>
  <div class="meter-seg is-full" role="meter" aria-labelledby="m3" aria-valuemin="0" aria-valuemax="40" aria-valuenow="40" aria-valuetext="40 of 40 places, full"><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i></div>
</div>
```

**Password strength in four steps.** Set four columns inline. Pair the segments with a word: weak, fair, good, strong. Type to try.
```html
<div class="meter-seg is-warn" style="grid-template-columns: repeat(4, minmax(0, 1fr));" aria-hidden="true">
  <i class="on"></i><i class="on"></i><i></i><i></i>
</div>
<span class="field__help" id="pw-word">Fair</span>
```

## Variants and sizes
| Class or attribute | When |
|---|---|
| `meter-seg` | Ten segments, accent fill. |
| `meter-seg.is-warn` | Near the limit: filled segments turn to the warning color. |
| `meter-seg.is-full` | At or over the limit: danger color. |
| `grid-template-columns (inline)` | Another segment count, such as four for strength. |

## States
| State | How |
|---|---|
| `level` | Add `.on` to the first n segments (round to the nearest segment). |
| `warning` | `.is-warn` from about 80 % or a weak strength. |
| `full` | `.is-full` at the limit, with the word "Full". |

## Motion and microinteractions
- Each segment fades its color over `--d-standard` (240 ms) on `--ease-standard`. No sweeping and no bounce: the meter is a reading, not an event.
- Several segments changing at once change together; do not stagger them.
- Reduced motion: the color change becomes 120 ms linear.

## Accessibility
- Give the meter `role="meter"` with `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-valuetext` and a name (`aria-labelledby` the label).
- When the words beside it already say everything (password strength), mark the segments `aria-hidden="true"` and connect the word to the input with `aria-describedby`.
- Warning and full must also be said in words; color alone fails for many people.

## Do
- Write the value next to it ("6.2 of 10 GB").
- Say what to do when it warns.
- Keep ten segments for capacity and four or five for strength.

## Don't
- Use a meter for a task in progress.
- Fill segments with a gradient or different colors per segment.
- Show more than twelve segments; switch to a [progress bar](progress-bar.md) look or a number.

## Behavior (plain HTML)
None. Toggle `.on` on the segments and `.is-warn` / `.is-full` on the meter from your code.

## Related
[Progress bar](progress-bar.md) · [Progress ring](progress-ring.md) · [Percentage bar](percentage-bar.md) · [Password field](password-field.md)
