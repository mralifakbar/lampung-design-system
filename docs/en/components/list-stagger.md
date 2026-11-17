# List stagger

Group: Motion. https://lampung.kartadinata.app/docs/en/components/list-stagger

When a group of items arrives at once, each one follows the one before by 35 ms, fading in from a 4 px blur and a 4 px rise. The whole cascade stays under 400 ms, so the list reads as one arrival with a direction, never as a slow parade.

## Use it when
- Search results or filter results arriving after the person asked for them.
- New notifications or messages that came in together while the panel was closed.
- The cards of a dashboard on first load of the session.
- The items of a menu or sheet that opened with a list built on the fly (only if they were not already rendered).

## Use something else when
- One item joining an existing list: use [Enter and exit](enter-and-exit.md).
- Figures and illustrations appearing as the page scrolls: use [Reveal on scroll](reveal-on-scroll.md). It has its own 30 ms stagger, capped at the fourth item.
- The same list re-rendering after a sort or a small change: use [Motion principles](motion-principles.md). Do not animate it; just update.
- Content still loading: use [Skeleton](skeleton.md).
- A long chat history opening: use [Chat layout](chat-layout.md). Never stagger history.

## Where it goes
On the direct children of the list that arrived: `.lrow` rows, `.card`s and `.kpi` cards in an `auto-grid`, `.file-row`s. Never on the list container and never on nested parts.

## Markup

**Search results arriving.** Results cascade top to bottom: the first one is readable at once, the last has arrived by 380 ms. Press Replay.
```html
<!-- The system has no stagger class yet: the keyframe and tokens are the contract. -->
<a class="lrow" href="…" style="animation: lds-blur-in var(--d-standard) var(--ease-enter) both; animation-delay: 0ms;">…</a>
<a class="lrow" href="…" style="animation: lds-blur-in var(--d-standard) var(--ease-enter) both; animation-delay: 35ms;">…</a>
<!-- delay = min(index, 4) × 35 ms: everything after the fifth item arrives with the fifth -->
```

**Notifications that came in together.** Opening the panel after a morning away: three new notifications arrive in order, newest first.
```html
<div class="list" style="width: 100%; max-width: 440px;">
  <div class="lrow" style="animation: lds-blur-in var(--d-standard) var(--ease-enter) both; animation-delay: 0ms;"><span class="avatar" style="--size: 36px;">AP</span><span class="lrow__body"><span class="lrow__title">Ana Putri responded to your report</span><span class="lrow__sub">2 minutes ago</span></span></div>
  <div class="lrow" style="animation: lds-blur-in var(--d-standard) var(--ease-enter) both; animation-delay: 35ms;"><span class="avatar avatar--gray" style="--size: 36px;">RS</span><span class="lrow__body"><span class="lrow__title">Rizal Siregar updated the road repair status</span><span class="lrow__sub">40 minutes ago</span></span></div>
  <div class="lrow" style="animation: lds-blur-in var(--d-standard) var(--ease-enter) both; animation-delay: 70ms;"><span class="avatar avatar--gray" style="--size: 36px;">BK</span><span class="lrow__body"><span class="lrow__title">This year's PBB bill is out</span><span class="lrow__sub">1 hour ago</span></span></div>
</div>
```

**Dashboard cards on first load.** KPI cards arrive left to right in reading order. Do this on the first load of a session only; coming back to the page shows them at once.
```html
<div class="auto-grid" style="--min: 150px; width: 100%;">
  <article class="kpi" style="animation: lds-blur-in var(--d-standard) var(--ease-enter) both; animation-delay: 0ms;"><div class="kpi__head"><span class="kpi__label">Reports today</span></div><div class="kpi__value">128</div></article>
  <article class="kpi" style="animation: lds-blur-in var(--d-standard) var(--ease-enter) both; animation-delay: 35ms;"><div class="kpi__head"><span class="kpi__label">Awaiting follow-up</span></div><div class="kpi__value">24</div></article>
  <article class="kpi" style="animation: lds-blur-in var(--d-standard) var(--ease-enter) both; animation-delay: 70ms;"><div class="kpi__head"><span class="kpi__label">Average response time</span></div><div class="kpi__value">2.4 days</div></article>
  <article class="kpi" style="animation: lds-blur-in var(--d-standard) var(--ease-enter) both; animation-delay: 105ms;"><div class="kpi__head"><span class="kpi__label">Resolved this week</span></div><div class="kpi__value">96</div></article>
</div>
```

## Motion and microinteractions
- Each item: `lds-blur-in` (from `translateY(4px)`, `blur(4px)`, transparent) over `--d-standard` (240 ms) on `--ease-enter`, with `animation-fill-mode: both` so it is hidden until its turn.
- Delay: `min(index, 4) × 35 ms`. The fifth and later items share the 140 ms delay, so the cascade ends by 380 ms however long the list is.
- Order follows reading order: top to bottom in lists, left to right then down in grids. Newest first in feeds.
- Plays once on arrival. Keyframes are fine here because an arrival is not reversed; if the list is replaced again mid-cascade, render the new items and let their own cascade start, do not wait.
- Never stagger exits: items leave together in 180 ms on `--ease-exit`, or close their space with [height expand](height-expand.md).
- Reduced motion: the animation runs in 1 ms, so items simply appear together.

## Accessibility
- Content is in the DOM from the start; only its painting is delayed, so screen readers and find-in-page see it immediately.
- Announce the result count once ("5 results") in a polite live region; the motion announces nothing.
- Keep the total under 400 ms so keyboard users are never waiting to reach an item.

## Do
- Stagger only things that arrived together because the person asked.
- Cap the delay at the fifth item.
- Use the same keyframe and tokens as the system (`lds-blur-in`, `--d-standard`, `--ease-enter`).

## Don't
- Stagger every list on every render, or re-stagger after a sort.
- Use delays longer than 35 ms or a cascade longer than 400 ms.
- Stagger exits or nested children inside each item.

## Behavior (plain HTML)
None: it is CSS on the items. There is no system class or attribute for it yet, so set the animation inline (or in a framework style prop) as shown. For figures that appear while scrolling, use `data-lds-reveal` with `--i` instead.

## Related
[Enter and exit](enter-and-exit.md) · [Reveal on scroll](reveal-on-scroll.md) · [List](list.md) · [Motion principles](motion-principles.md)
