# Pull to refresh

Group: Microinteractions. https://lampung.kartadinata.app/docs/en/components/pull-to-refresh

Drag a phone list down from the top: the content follows with resistance, a spinner turns as it comes in, and past 56 px a release refreshes. The spinner holds until the work is done, at least 700 ms so it never flickers.

## Use it when
- A phone list whose content changes on the server while people look at it: a schedule, activity, an inbox.
- A screen people open to check for something new.

## Use something else when
- A list that updates itself in real time: use [Status dot](status-dot.md). Show that it is live instead.
- Loading the next page at the bottom of a list: use [Spinner](spinner.md).
- A desktop table: use [Table](table.md). Use a Refresh button in its toolbar.

## Where it goes
On the `.phone__scroll` of a top-level screen, with the `.refresh` indicator as its first child and `.navbar-gap` as the spacer. The spinner appears between the nav bar and the large title.

## Anatomy
| Part | What it is |
|---|---|
| `.phone__scroll[data-lds-refresh]` | Required. The scroller. Its children (except the gap and the indicator) move down by `--pull`. |
| `.refresh` | Required. Holds a [spinner](spinner.md) whose opacity and turn follow `--pull-p` (0 to 1). `aria-hidden`. |

## Markup

**Refresh a clinic schedule.** Drag the list down with the mouse or a finger and let go past the spinner. The button does the same thing for people who cannot drag.
```html
<div class="phone__scroll" data-lds-navbar="today-bar" data-lds-refresh>
  <div class="refresh" aria-hidden="true"><span class="spinner" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span></div>
  <div class="navbar-gap"></div>
  <h1 class="large-title">Today</h1>
  …
</div>
<script type="module">
  import { toast } from 'lampung-design-system/js';
  scroller.addEventListener('lds:refresh', (e) => e.detail.wait(loadSchedule().then(() => toast({ title: 'Schedule is up to date' }))));
</script>
```

## States
| State | How |
|---|---|
| `.is-pulling` | Following the finger; no transition. |
| `.is-refreshing` | Held at 56 px with the spinner turning; `aria-busy="true"` on the scroller. |

## Motion and microinteractions
- The pull follows the finger with resistance: `over·200·0.55 / (200 + 0.55·over)`, so it slows as it grows and never passes 200 px.
- The spinner fades in and turns up to 270° with the pull, and only starts spinning once the refresh runs.
- Release short of 56 px: the content springs back on `--spring-smooth`. Past it: it settles at 56 px, holds while working (at least 700 ms), then springs back.
- Reduced motion: the return becomes a 120 ms linear move; the pull still follows the finger.

## Accessibility
- A pull is never the only way: offer a Refresh button or refresh on revisit, and call `startRefresh(scroller)` from it.
- Say the result in words (a toast like "Schedule is up to date"), not only by the spinner going away.
- The scroller gets `aria-busy="true"` while refreshing.

## Do
- Use it only on screens whose content can change while people look.
- Wait for the real request with `e.detail.wait(promise)`.

## Don't
- Add it to screens inside a sheet or a pushed form.
- Show a second spinner in the list at the same time.

## Behavior (plain HTML)
`data-lds-refresh` on the scroller: touch drags (the default overscroll is held back while pulling) and mouse drags from the top. Fires `lds:refresh` with `wait(promise)` on the scroller. `startRefresh(scroller)` runs it without a gesture; a button with `data-lds-refresh-for="scrollerId"` does the same without script.

## Related
[Phone bars](phone-bars.md) · [Spinner](spinner.md) · [Toast](toast.md) · [Drag and momentum](drag-and-momentum.md)
