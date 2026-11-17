# Segmented control

Group: Selection. Docs page: `docs/components/segmented-control.html`.

Two to five equal segments with one thumb that slides to the chosen one. For switching the view or mode of what is on screen right now; the change applies at once.

## Use it when
- Switching the period or view of the same content: Day, Week, Month; List, Grid; Chart, Table.
- A mode with two to four named states that applies immediately: Light, Dark, System.
- A compact single choice in a toolbar or a card header.

## Use something else when
- Each choice shows a different panel of content (Overview, Files, History): use [Tabs](tabs.md). Tabs carry tab semantics and panels.
- More than five options, or long labels: use [Select](select.md).
- A single on and off setting: use [Switch](switch.md).
- A choice saved with a form, needing explanations: use [Radio](radio.md). Or [radio cards](radio-card.md)
- Several options can be on at once (filters): use [Chips](chips.md).
- A row of toolbar actions: use [Button group](button-group.md).

## Where it goes
Above or in the header of the content it changes: over a chart or a list, in a card header, in a toolbar. Full width on phones under the large title; on wide screens size it to its labels (about 90 px per segment) instead of stretching across the page.

## Anatomy
| Part | What it is |
|---|---|
| `.seg` | Required. The recessed track; `role="group"` with an `aria-label`; `data-lds-segmented` for the behavior. |
| `.seg__thumb` | Required. The raised thumb under the chosen segment. The JS sets its width to one segment and moves it. |
| `button.seg__btn` | Required. One segment, equal width, `aria-pressed`. Hairline separators between unpressed neighbors. |

## Markup

**Period over a chart.** Click a segment or use the arrow keys: the thumb slides on a spring and can be retargeted mid-travel.
```html
<div class="seg" role="group" aria-label="Period" data-lds-segmented style="max-width: 320px; width: 100%;">
  <span class="seg__thumb"></span>
  <button type="button" class="seg__btn" aria-pressed="false">Day</button>
  <button type="button" class="seg__btn" aria-pressed="true">Week</button>
  <button type="button" class="seg__btn" aria-pressed="false">Month</button>
</div>
```

**Large, with icons.** `seg--lg` (36 px) for the main control of a view, such as appearance.
```html
<div class="seg seg--lg" role="group" aria-label="Appearance" data-lds-segmented style="max-width: 360px; width: 100%;">
  <span class="seg__thumb"></span>
  <button type="button" class="seg__btn" aria-pressed="true"><span class="ic ic--sm" aria-hidden="true" style="margin-right: 6px;">light_mode</span>Light</button>
  <button type="button" class="seg__btn" aria-pressed="false"><span class="ic ic--sm" aria-hidden="true" style="margin-right: 6px;">dark_mode</span>Dark</button>
  <button type="button" class="seg__btn" aria-pressed="false"><span class="ic ic--sm" aria-hidden="true" style="margin-right: 6px;">contrast</span>System</button>
</div>
```

## Variants and sizes
| Class or attribute | When |
|---|---|
| `seg (default)` | 30 px segments, 13 px labels. Toolbars and card headers. |
| `seg--lg` | 36 px segments, 14 px labels. The main control of a screen; the React `Segmented` default. |

## States
| State | How |
|---|---|
| `aria-pressed="true"` | The chosen segment: semibold label over the thumb; separators next to it hide. |
| `:active` | The label dims to 60 % while pressed. |
| `focus-visible` | Focus ring on the focused segment. |

## Motion and microinteractions
- The thumb slides with `transform: translateX()` on `--spring-smooth` (560 ms). A new choice during travel retargets from the current position; it never jumps back. See [sliding indicator](sliding-indicator.md).
- Separators next to the chosen segment fade in `--d-fast` (160 ms).
- The thumb keeps its spring even while the theme swaps, so the appearance control never snaps.
- Reduced motion: the thumb moves in 120 ms linear.

## Accessibility
- A `role="group"` with an `aria-label`; segments are `<button type="button">` with `aria-pressed`, so each is announced as a pressed or not pressed toggle.
- Arrow keys (Left, Right, Up, Down) move the choice and focus with wrap-around; Tab enters each segment.
- When the segments switch panels of content, use [tabs](tabs.md) instead so `role="tab"` and `aria-controls` connect them.
- Icons are decorative; the text is the name. An icon-only segment needs an `aria-label`.

## Do
- Keep labels to one or two short words of similar length.
- Apply the change immediately and keep the choice when people come back.

## Don't
- Use it to navigate between pages.
- Put more than five segments, or let labels truncate.
- Build a second sliding-thumb control by hand; reuse `.seg`.

## Behavior (plain HTML)
`data-lds-segmented` on `.seg`: sizes the thumb to one segment, moves it to the `aria-pressed="true"` segment, handles click and arrow keys, and fires `lds:change` with `{ index, item }` on the group.

## React
```tsx
import { Segmented } from 'lampung-design-system/react';

<Segmented
  label="Period"
  value={period}
  onChange={setPeriod}
  size="md"
  options={[{ value: 'day', label: 'Day' }, { value: 'week', label: 'Week' }, { value: 'month', label: 'Month' }]}
/>
```

## Related
[Tabs](tabs.md) · [Radio](radio.md) · [Switch](switch.md) · [Sliding indicator](sliding-indicator.md)
