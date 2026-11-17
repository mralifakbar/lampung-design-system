# View swap

Group: Motion. https://lampung.kartadinata.app/docs/en/components/view-swap

One view replaces another in the same place: a tab panel, the next step of a form, a different range on a chart. The old view goes at once and the new one fades in from a 4 px blur and a 4 px rise in 240 ms. Quick enough to never feel like a page load; soft enough that the eye sees the change.

## Use it when
- A step-by-step form moves forward or back: the step content swaps under a fixed [steps](steps.md) header and fixed buttons.
- A [tab](tabs.md) or [segmented control](segmented-control.md) changes the content below it.
- A card or panel switches what it shows (this week, this month) while its frame stays.

## Use something else when
- Opening a layer over the current view: use [Enter and exit](enter-and-exit.md).
- Content opening below and pushing the page: use [Height expand](height-expand.md).
- A thumbnail growing into the full picture: use [Shared element](shared-element.md).
- Only a word or a number changes: use [Text morph](text-morph.md). For numbers, use [number count](number-count.md).
- Navigating to another page: use [Nav progress](nav-progress.md).

## Where it goes
On the region that changes, below the control that changed it. The control, the header and the action buttons stay still; only the content swaps.

## Markup

**A step-by-step form, forward and back.** Continue and Back swap the step content; the steps header fills its bar on the in-out curve and the focus moves to the new heading. Nothing slides sideways, so going back feels the same as going forward.
```html
<ol class="steps" aria-label="Business permit application">…</ol>
<section class="step-view" aria-labelledby="step-title" style="animation: lds-blur-in var(--d-standard) var(--ease-enter);">
  <h3 id="step-title" tabindex="-1">Upload your documents</h3>
  …
</section>
<!-- Render the new step (or unhide it): the animation plays each time the element is shown.
     Then move focus to its heading. -->
```

**Tab panels.** The ink slides; the panel below swaps with the blur-in. `.tab-panel` has the swap built in.
```html
<div style="max-width: 460px;">
  <div class="tabs" role="tablist" aria-label="Road damage report" data-lds-tabs>
    <span class="tabs__ink"></span>
    <button class="tabs__btn" role="tab" aria-selected="true" aria-controls="vs-1">Details</button>
    <button class="tabs__btn" role="tab" aria-selected="false" aria-controls="vs-2">Handling</button>
    <button class="tabs__btn" role="tab" aria-selected="false" aria-controls="vs-3">Responses <span class="tabs__count">28</span></button>
  </div>
  <div class="tab-panel" role="tabpanel" id="vs-1">A pothole 1.5 metres wide in the left lane, near the city bus stop.</div>
  <div class="tab-panel" role="tabpanel" id="vs-2" hidden>Site survey done. Patching is scheduled for Tuesday, estimated cost Rp 4,500,000.</div>
  <div class="tab-panel" role="tabpanel" id="vs-3" hidden>28 residents back this report. 4 added new photos.</div>
</div>
```

**A card that changes its range.** The segmented control switches the period; the figure and its label swap below while the card frame stays put.
```html
<div class="card" style="width: 100%; max-width: 360px;">
  <div class="seg" role="group" aria-label="Period" data-lds-segmented onclick="const b = event.target.closest('.seg__btn'); if (!b) return; const i = [...this.querySelectorAll('.seg__btn')].indexOf(b); this.parentElement.querySelectorAll('[data-pane]').forEach((p, j) => { p.hidden = j !== i; });">
    <span class="seg__thumb"></span>
    <button class="seg__btn" aria-pressed="true">Week</button>
    <button class="seg__btn" aria-pressed="false">Month</button>
    <button class="seg__btn" aria-pressed="false">Year</button>
  </div>
  <div data-pane style="animation: lds-blur-in var(--d-standard) var(--ease-enter); margin-top: 16px;"><p class="chart-card__big">12,480</p><p class="card__sub">City bus passengers this week</p></div>
  <div data-pane hidden style="animation: lds-blur-in var(--d-standard) var(--ease-enter); margin-top: 16px;"><p class="chart-card__big">51,326</p><p class="card__sub">City bus passengers this month</p></div>
  <div data-pane hidden style="animation: lds-blur-in var(--d-standard) var(--ease-enter); margin-top: 16px;"><p class="chart-card__big">604,912</p><p class="card__sub">City bus passengers this year</p></div>
</div>
```

## Motion and microinteractions
- Swap: the old view is hidden at once; the new one plays `lds-blur-in` (4 px rise, 4 px blur, opacity 0 to 1) over `--d-standard` (240 ms) on `--ease-enter`. `.tab-panel` has it built in.
- Direction: none. Forward and back look the same. The [steps](steps.md) header carries the direction: its bar fills over `--d-considered` (480 ms) on `--ease-inout` and the dot turns into a check.
- Keep the frame still: the container, the header and the buttons never animate; if the new view is taller, the frame just grows.
- Interruption: a second press during the 240 ms swaps again immediately; the newest view starts its own fade. Nobody waits for the previous one.
- Reduced motion: the fade runs in 1 ms, so views switch instantly; the steps bar fills in 120 ms.

## Accessibility
- Move focus to the heading of the new step (`tabindex="-1"`) so screen readers announce where they are.
- Hidden views are `hidden`, not just transparent, so they leave the tab order and the accessibility tree.
- Tabs keep `aria-selected` and `aria-controls`; steps keep `aria-current="step"` on the current one.

## Do
- Keep controls and frame still and swap only the content.
- Show direction in the steps header, not with sideways slides.
- Focus the new heading after a step change.

## Don't
- Slide whole views left and right, or cross-fade both views at once on top of each other.
- Animate the height of the frame on every swap.
- Make Continue wait for the animation.

## Behavior (plain HTML)
Tabs: `data-lds-tabs` hides and shows the panels for you. Steps and other swaps: toggle `hidden` (or render the new view); the animation plays each time the element is shown. There is no directional swap class in the system.

## React
```tsx
import { Steps } from 'lampung-design-system/react';

<Steps label="Application" items={['Program', 'Documents', 'Review']} current={step} />
<section key={step} style={{ animation: 'lds-blur-in var(--d-standard) var(--ease-enter)' }}>{views[step]}</section>
```

## Related
[Tabs](tabs.md) · [Steps](steps.md) · [Sliding indicator](sliding-indicator.md) · [Enter and exit](enter-and-exit.md)
