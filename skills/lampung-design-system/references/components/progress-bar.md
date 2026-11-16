# Progress bar

Group: Feedback. Docs page: `docs/components/progress-bar.html`.

A 6 px track that fills as a task with a known size advances. Show the number next to it; use the indeterminate bar only when you truly cannot measure.

## Use it when
- A task with a measurable amount runs: an upload, an import, a report export, questions answered in a tryout.
- Progress through a course or a module, shown with its number ("12 of 20 lessons").
- A short, unmeasurable preparation step where a line fits better than a spinner (`.progress--indeterminate`).

## Use something else when
- A compact tile or a score that needs to fit in a square: use [Progress ring](progress-ring.md).
- A level or a capacity, not a task (storage used, password strength): use [Meter](meter.md).
- A short wait with no number, inside a button or a row: use [Spinner](spinner.md).
- Content is loading and its layout is known: use [Skeleton](skeleton.md).
- Long work of unknown length, where elapsed time is the honest signal: use [Thinking](thinking.md).
- A file uploading into a drop zone: use [Upload progress](upload-progress.md).
- The steps of a multi-page flow: use [Steps](steps.md).
- Shares of a whole across categories: use [Percentage bar](percentage-bar.md).
- A page is loading after navigation: use [Nav progress](nav-progress.md).

## Where it goes
Directly under what it measures: in an upload row, in a course card, under the header of a running job. With `.progress-meta` above it for the label and the number. Full width of its container on every screen size; never as a page-wide strip (that is [navigation progress](nav-progress.md)).

## Anatomy
| Part | What it is |
|---|---|
| `.progress` | Required. The track: 6 px tall, rounded, on `--bg-track`. Carries `role="progressbar"`. |
| `.progress__fill` | Required. The fill, a block that scales from the left. Set `transform: scaleX(0.64)` for 64 %. |
| `.progress-meta` | Optional row above the bar: label on the left, the value in `<b>` on the right (tabular figures). |

## Markup

**Determinate with its number.** The label says what is happening, the number says how far. Press the button to advance it.
```html
<div class="progress-meta"><span id="up-l">Uploading thesis.pdf</span><b>64%</b></div>
<div class="progress" role="progressbar" aria-labelledby="up-l" aria-valuemin="0" aria-valuemax="100" aria-valuenow="64">
  <div class="progress__fill" style="transform: scaleX(0.64);"></div>
</div>
```

**Course progress.** Counted things read better as "12 of 20" than as a percentage. The thin bar fits inside cards and list rows.
```html
<div class="card" style="max-width: 360px;">
  <div class="card__title">Statistics for beginners</div>
  <div class="card__sub">Module 3: sampling</div>
  <div style="margin-top: 16px;">
    <div class="progress-meta"><span>Lessons</span><b>12 of 20</b></div>
    <div class="progress progress--thin" role="progressbar" aria-label="Lessons done" aria-valuemin="0" aria-valuemax="20" aria-valuenow="12" aria-valuetext="12 of 20 lessons"><div class="progress__fill" style="transform: scaleX(0.6);"></div></div>
  </div>
</div>
```

**Indeterminate.** A segment sweeps across while the length is unknown. Pair it with words that set expectations.
```html
<div style="max-width: 420px; width: 100%;">
  <div class="progress-meta"><span>Preparing your transcript</span><span>Usually under a minute</span></div>
  <div class="progress progress--thin progress--indeterminate" role="progressbar" aria-label="Preparing your transcript"><div class="progress__fill"></div></div>
</div>
```

**Finished.** At 100 % the fill can turn to the success color; say "Done" in words too.
```html
<div style="max-width: 420px; width: 100%;">
  <div class="progress-meta"><span>Report exported</span><b>Done</b></div>
  <div class="progress" role="progressbar" aria-label="Report export" aria-valuemin="0" aria-valuemax="100" aria-valuenow="100"><div class="progress__fill" style="transform: scaleX(1); background: var(--success);"></div></div>
</div>
```

## Variants and sizes
| Class or attribute | When |
|---|---|
| `progress` | 6 px. Standalone tasks and uploads. |
| `progress--thin` | 4 px. Inside cards, list rows and tight layouts. |
| `progress--indeterminate` | A 40 % segment sweeps every 1.4 s. Only when the size of the work is unknown. |
| `progress-meta` | Label and value row above the bar. |

## States
| State | How |
|---|---|
| `in progress` | `transform: scaleX(value)` on the fill plus `aria-valuenow` on the bar. |
| `indeterminate` | `.progress--indeterminate` and no `aria-valuenow`. |
| `done` | `scaleX(1)`, optionally `background: var(--success)` on the fill, and "Done" in the meta. |
| `failed` | Keep the fill where it stopped, color it `var(--danger)` and put the reason and a retry in an [alert](alert.md) or the row. |

## Motion and microinteractions
- The fill moves with `transform: scaleX()` on `--ease-inout` over `--d-considered` (480 ms): it is already on screen, so it eases both ends. Background color changes over `--d-standard`.
- Because it is a transition, rapid updates retarget smoothly; do not throttle values to make it look busy and never fake progress that stalls at 90 %.
- Indeterminate: `lds-indeterminate`, 1.4 s on `--ease-inout`, infinite. Under reduced motion loops play once, so pair it with words.
- Animate `transform` only, never `width`, so updates stay on the compositor.

## Accessibility
- `role="progressbar"` with `aria-valuemin`, `aria-valuemax` and `aria-valuenow`; name it with `aria-labelledby` pointing at the meta label, or `aria-label`.
- Use `aria-valuetext` when the raw number is not the clearest reading ("12 of 20 lessons", "About 2 minutes left").
- Indeterminate bars omit `aria-valuenow`.
- Do not announce every tick. Announce the end once, with a [toast](toast.md) or a `role="status"` line.

## Do
- Show the number or the count next to the bar.
- Use real progress; if you only know steps, show steps.
- Keep the bar where the result will appear, so attention is already there when it finishes.

## Don't
- Animate `width` or use a custom gradient fill.
- Use the indeterminate bar for work you can measure.
- Use a progress bar for a value that is not a task (storage, strength): that is a [meter](meter.md).

## Behavior (plain HTML)
None. Set `transform: scaleX()` on `.progress__fill` and `aria-valuenow` on `.progress` from your code.

## Related
[Progress ring](progress-ring.md) · [Meter](meter.md) · [Spinner](spinner.md) · [Upload progress](upload-progress.md)
