# Thinking

Group: Feedback. Docs page: `docs/components/thinking.html`.

A dot-grid wave, a shimmering label and an honest elapsed timer, for work of unknown length. When it finishes, the label turns into the result.

## Use it when
- An assistant or a background job is working and you cannot measure progress: checking a service schedule, checking uploaded documents, building a requirements checklist.
- Work that may take from a few seconds to a minute, where an elapsed timer reassures the person that it has not frozen.
- A status that should settle into its answer in place ("Found 3 open slots at Samsat keliling").

## Use something else when
- The work has a measurable size: use [Progress bar](progress-bar.md).
- A button is running a short action: use [Button](button.md).
- Content is loading with a known layout: use [Skeleton](skeleton.md).
- A short wait in a row or a list: use [Spinner](spinner.md).
- The answer itself is arriving word by word: use [Streaming text](streaming-text.md).
- A finished step the assistant took, with details to open: use [Tool call](tool-call.md).
- A countdown to a deadline: use [Timer](timer.md).

## Where it goes
Where the answer will appear: at the top of the assistant reply in a [chat](chat-message.md), in the result area of a panel, in the status line of a job. One line, left aligned. Keep it in place after it finishes, as the heading of the result.

## Anatomy
| Part | What it is |
|---|---|
| `.thinking` | Required. Inline row, 10 px gap, 14 px medium text. `role="status"`. |
| `.dotgrid` | Required. A 3 x 3 grid of 4 px dots; the JS fills in the nine `<i>` if empty. `aria-hidden="true"`. |
| `.shimmer` | Required. The label; a light band crosses it every 1.8 s. |
| `.thinking__time` | Optional elapsed time in tabular mono figures, updated every 100 ms. |
| `.is-done` | Settled: the dots stop and turn green, the label stops shimmering and turns strong. |

## Markup

**Working, then done.** The wave runs in CSS; `data-lds-thinking` adds the timer. Press Finish to settle it into the result.
```html
<div class="thinking" data-lds-thinking role="status">
  <span class="dotgrid" aria-hidden="true"></span>
  <span class="shimmer">Checking the Samsat keliling schedule</span>
  <span class="thinking__time"></span>
</div>
<script type="module">
  import { thinkingDone } from 'lampung-design-system/js';
  // when the work ends:
  thinkingDone(document.querySelector('.thinking'), 'Found 3 open slots at Samsat keliling');
</script>
```

**Without a timer.** Drop `.thinking__time` for waits that are usually short.
```html
<div class="thinking" data-lds-thinking role="status"><span class="dotgrid" aria-hidden="true"></span><span class="shimmer">Checking your documents</span></div>
```

**Settled.** After `thinkingDone` the line stays as the heading of the result.
```html
<div class="thinking is-done" role="status"><span class="dotgrid" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span><span class="shimmer is-settled">Checklist ready: 4 documents for a surat pindah</span><span class="thinking__time">8.4s</span></div>
```

## States
| State | How |
|---|---|
| `working` | Dots wave, label shimmers, time counts. |
| `done` | `thinkingDone(el, label)` adds `.is-done`, settles the shimmer and morphs the label into `label` (with a success haptic where supported). |
| `failed` | Settle it yourself with a label that says what failed ("Could not reach the calendar"), then offer a retry next to it. |

## Motion and microinteractions
- Dot wave: each dot runs `lds-dot-wave` (opacity 0.12 to 1 and back) over 1.2 s on `--ease-inout`, delays stepping 90 ms diagonally (column + row), so a wave travels from the top left corner.
- Label: `.shimmer` moves a light band across the text over 1.8 s linear, infinite.
- Done: the label morphs letter by letter ([text morph](text-morph.md)) and its color settles over `--d-standard`; dots turn to the success color at once.
- Reduced motion: the dots stop at 60 % opacity and the shimmer stops; the timer still counts because it is information.

## Accessibility
- `role="status"` on `.thinking`, so the label and the final result are announced politely.
- The dot grid is `aria-hidden="true"`. The timer changes ten times a second; if screen readers read it too often in your context, put `aria-hidden="true"` on `.thinking__time`.
- The settled label must say the result, not only "Done".

## Do
- Name the work in the label ("Checking your schedule").
- Settle it into the result instead of removing it.
- Show the elapsed time when the wait may pass five seconds.

## Don't
- Fake progress with a bar for unknown work.
- Use it for sub-second waits.
- Change the label every second to look busy.

## Behavior (plain HTML)
`data-lds-thinking` on `.thinking` fills the dot grid and runs the elapsed time (one decimal, "3.4s"). `thinkingDone(el, label)` settles it and morphs the label. The wave itself is CSS, so markup rendered by any framework moves without the JS.

## React
```tsx
import { Thinking } from 'lampung-design-system/react';

const [started] = useState(() => Date.now());
<Thinking label={done ? 'Found 3 open slots at Samsat keliling' : 'Checking your schedule'} startedAt={started} done={done} />
// The React timer shows whole seconds as m:ss.
```

## Related
[Streaming text](streaming-text.md) · [Tool call](tool-call.md) · [Progress bar](progress-bar.md) · [Spinner](spinner.md)
