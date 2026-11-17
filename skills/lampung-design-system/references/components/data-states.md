# Data states

Group: Foundations. Docs page: `docs/components/data-states.html`.

Every view that shows data is designed in four states: loading, empty, error and loaded. Each state reuses an existing component (`skel`, `empty`, `alert`) and keeps the same footprint, so the page does not jump between them.

## Use it when
- Any list, table, chart, card grid or detail panel whose content comes from a request: design all four states before shipping.
- A view can legitimately have no data (a new account, a filter with no matches, a quiet week) and needs to say why and offer the one action that fills it.
- A request can fail and the person needs to know what failed and how to retry, without losing what they already see.

## Use something else when
- A button that is busy after a press: use [Button](button.md). Use its `.is-loading` state; do not replace the view with a skeleton.
- A whole page is loading after navigation: use [Nav progress](nav-progress.md).
- Waiting on an assistant or a long computation with an honest timer: use [Thinking](thinking.md).
- Progress with a known percentage (upload, import): use [Progress bar](progress-bar.md).
- A failure that concerns the whole app (offline, maintenance): use [Banner](banner.md).
- A result that happened and needs no further action: use [Toast](toast.md).

## Where it goes
Each state fills exactly the area the loaded content will fill: the list box, the table body, the chart card. Page chrome (title, filters, tabs) stays put and stays usable. On phones the same rule holds; an empty state sits where the first rows would.

## Anatomy
| Part | What it is |
|---|---|
| `.skel` | Loading. Blocks shaped like the real content (same row height, same title and meta widths), shimmering. See [skeleton](skeleton.md). |
| `.empty` | Empty. `.empty__icon` + `.empty__title` (what is empty) + `.empty__body` (why, and what fills it) + one button. See [empty state](empty-state.md). |
| `.alert.alert--danger` | Error. What failed in plain words, that nothing was lost, and a retry in `.alert__actions`. See [alert](alert.md). |
| `role="status" aria-busy="true"` | On the loading container, so assistive tech knows the region is updating. |

## Markup

**All four states.** The same application list in each state. Switch between them: the box keeps its place and the controls above it stay usable.
```html
<!-- loading -->
<div class="list" role="status" aria-busy="true" aria-label="Loading applications">
  <div class="lrow"><span class="lrow__body"><span class="skel" style="display: block; height: 14px; width: 62%;"></span><span class="skel" style="display: block; height: 11px; width: 37%; margin-top: 8px;"></span></span><span class="skel" style="width: 64px; height: 22px; border-radius: 6px;"></span></div>
  <div class="lrow"><span class="lrow__body"><span class="skel" style="display: block; height: 14px; width: 48%;"></span><span class="skel" style="display: block; height: 11px; width: 23%; margin-top: 8px;"></span></span><span class="skel" style="width: 64px; height: 22px; border-radius: 6px;"></span></div>
  <div class="lrow"><span class="lrow__body"><span class="skel" style="display: block; height: 14px; width: 55%;"></span><span class="skel" style="display: block; height: 11px; width: 30%; margin-top: 8px;"></span></span><span class="skel" style="width: 64px; height: 22px; border-radius: 6px;"></span></div>
</div>

<!-- empty -->
<div class="list list--fill">
  <div class="empty">
    <div class="empty__icon"><span class="ic" aria-hidden="true">event_available</span></div>
    <div class="empty__title">No files due this week</div>
    <div class="empty__body">New applications appear here as soon as residents submit them.</div>
    <button class="btn btn--secondary btn--md">Open full calendar</button>
  </div>
</div>

<!-- error -->
<div class="alert alert--danger" role="alert">
  <span class="ic" aria-hidden="true">error</span>
  <div>
    <div class="alert__title">Applications did not load</div>
    <div class="alert__body">The permit service did not answer in time. Your data is safe.</div>
    <div class="alert__actions"><button class="btn btn--secondary btn--sm"><span class="ic" aria-hidden="true">refresh</span>Try again</button></div>
  </div>
</div>

<!-- loaded -->
<div class="list">
  <div class="lrow"><span class="lrow__body"><span class="lrow__title" style="display: block;">Micro business permit</span><span class="lrow__sub" style="display: block;">UMKM Sukarame · due tomorrow</span></span><span class="badge badge--warning">Tomorrow</span></div>
  <div class="lrow"><span class="lrow__body"><span class="lrow__title" style="display: block;">Public event permit</span><span class="lrow__sub" style="display: block;">Kelurahan Kedaton · due Thursday</span></span><span class="badge">Thu</span></div>
  <div class="lrow"><span class="lrow__body"><span class="lrow__title" style="display: block;">Domicile certificate</span><span class="lrow__sub" style="display: block;">Kecamatan Way Halim · due Friday</span></span><span class="badge">Fri</span></div>
</div>
```

**Empty because of a filter.** When filters cause the empty result, say so and offer to clear them, not to create something.
```html
<div class="list list--fill" style="max-width: 520px;">
  <div class="empty">
    <div class="empty__icon"><span class="ic" aria-hidden="true">filter_list</span></div>
    <div class="empty__title">No services match these filters</div>
    <div class="empty__body">No service in Kecamatan Rajabasa is processed in under 3 days.</div>
    <button class="btn btn--secondary btn--md">Clear filters</button>
  </div>
</div>
```

**Error that keeps the old data.** A refresh failed but the last loaded rows are still useful: keep them and put the alert above them.
```html
<div class="stack" style="--gap: 12px; max-width: 520px;">
  <div class="alert alert--warning" role="status">
    <span class="ic" aria-hidden="true">sync_problem</span>
    <div>
      <div class="alert__title">Showing data from 09:40</div>
      <div class="alert__body">We could not refresh the application list. Check your connection and try again.</div>
      <div class="alert__actions"><button class="btn btn--secondary btn--sm"><span class="ic" aria-hidden="true">refresh</span>Refresh</button></div>
    </div>
  </div>
  <div class="list">
  <div class="lrow"><span class="lrow__body"><span class="lrow__title" style="display: block;">Micro business permit</span><span class="lrow__sub" style="display: block;">UMKM Sukarame · due tomorrow</span></span><span class="badge badge--warning">Tomorrow</span></div>
  <div class="lrow"><span class="lrow__body"><span class="lrow__title" style="display: block;">Public event permit</span><span class="lrow__sub" style="display: block;">Kelurahan Kedaton · due Thursday</span></span><span class="badge">Thu</span></div>
  <div class="lrow"><span class="lrow__body"><span class="lrow__title" style="display: block;">Domicile certificate</span><span class="lrow__sub" style="display: block;">Kecamatan Way Halim · due Friday</span></span><span class="badge">Fri</span></div>
</div>
</div>
```

## States
| State | How |
|---|---|
| `loading` | Skeleton that mirrors the loaded layout, inside `role="status" aria-busy="true"`. Show it only after about 300 ms; fast responses should go straight to loaded. |
| `empty` | `.empty` with an icon, a title that names what is empty, one sentence of why, and the one action that fills it (or clears the filter). |
| `error` | `.alert--danger` with `role="alert"`: what failed, that nothing was lost, and Try again. If older data exists, keep it and use `.alert--warning` above it. |
| `loaded` | The real content. Remove `aria-busy` and the status role when it arrives. |

## Motion and microinteractions
- Skeleton shimmer: a light band crosses every `.skel` in 1.6 s on `--ease-inout`, infinite while loading. Under reduced motion it plays once and the blocks stay still.
- Loaded content replaces the skeleton with a fade in `--d-standard` on `--ease-enter`; lists may arrive with [list stagger](list-stagger.md) (35 ms apart, under 400 ms total). Never animate the box size.
- Errors and empty states appear without motion; they are answers, not events.

## Accessibility
- Loading region: `role="status"`, `aria-busy="true"` and an `aria-label` ("Loading applications"). Skeleton blocks are empty elements, so nothing else is read.
- Errors that block the task use `role="alert"` so they are announced once; a stale-data warning uses `role="status"`.
- After Try again, move focus back into the region (the first row or the alert) so keyboard users are not left on a removed button.
- Empty state titles are plain text, not headings, unless the region is a page section with its own heading.

## Do
- Shape the skeleton like the real content: same row count on screen, same heights.
- Write the empty state as an answer: what is empty, why, and the one action.
- Keep old data visible when a refresh fails.

## Don't
- Show a lone spinner in the middle of an empty box for content that has a known shape.
- Write "No data" or "Something went wrong" with no reason and no next step.
- Replace page controls (filters, tabs, search) with the skeleton; only the data area loads.

## Behavior (plain HTML)
None required. Toggle the states from your data layer. `toast()` is for results of actions, not for load errors.

## React
```tsx
import { Alert } from 'lampung-design-system/react';

if (status === 'loading') return <div className="list" role="status" aria-busy="true" aria-label="Loading applications">{/* .skel rows */}</div>;
if (status === 'error') return <Alert tone="danger" title="Applications did not load" actions={<button className="btn btn--secondary btn--sm" onClick={retry}>Try again</button>}>The permit service did not answer in time.</Alert>;
if (items.length === 0) return <div className="empty">{/* icon, title, body, one action */}</div>;
```

## Related
[Skeleton](skeleton.md) · [Empty state](empty-state.md) · [Alert](alert.md) · [Chart states](chart-states.md)
