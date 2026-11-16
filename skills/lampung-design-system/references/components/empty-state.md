# Empty state

Group: Feedback. Docs page: `docs/components/empty-state.html`.

What a region shows when it has nothing to show yet: an icon, why it is empty, and the one action that fills it.

## Use it when
- A list, table or dashboard section loaded and has no items: no courses yet, nothing due this week.
- A search or filter returned nothing on a full page of results (say what to change).
- A first-run screen before the person has created anything.

## Use something else when
- The data is still loading: use [Skeleton](skeleton.md).
- Loading failed: use [Alert](alert.md). Use a danger alert with a retry, as in the error data state.
- No matches inside a command palette: use [Command palette](command-palette.md). Use `.cmdk__empty`.
- No matches while typing in a combobox: use [Combobox](combobox.md). Use `.select__empty`.
- A dashboard-level next step for a new account: use [Spotlight](spotlight.md).

## Where it goes
In the place the content would occupy: inside the card, the list area or the table box, centred. It replaces the content, not the page header or the filters, so the person can still change the filters. On phones it keeps the same centred stack.

## Anatomy
| Part | What it is |
|---|---|
| `.empty` | Required. Centred column with 32/24 px padding and a 6 px gap. |
| `.empty__icon > .ic` | A 56 px rounded square with a hairline and a 28 px icon that names the content. |
| `.empty__title` | Required. Why it is empty, as a fact ("Nothing due this week"). |
| `.empty__body` | One sentence: what will appear here, or what to change. Max 280 px wide. |
| `.btn` | The one action that fills it. Secondary by default; primary only on a first-run screen. |

## Markup

**Nothing yet.** Say why and what will appear. The action goes somewhere useful.
```html
<div class="card" style="max-width: 420px; width: 100%;">
  <div class="empty"><div class="empty__icon"><span class="ic" aria-hidden="true">event_available</span></div><div class="empty__title">Nothing due this week</div><div class="empty__body">New assignments appear here as soon as your lecturers post them.</div><button class="btn btn--secondary btn--md">Open full calendar</button></div>
</div>
```

**First run.** The primary action is allowed here because it is the only thing to do.
```html
<div class="card" style="max-width: 420px; width: 100%;">
  <div class="empty"><div class="empty__icon"><span class="ic" aria-hidden="true">menu_book</span></div><div class="empty__title">No study plans yet</div><div class="empty__body">Pick the exam date and the subjects, and we lay out a week-by-week plan.</div><button class="btn btn--primary btn--md"><span class="ic" aria-hidden="true">add</span>Create a study plan</button></div>
</div>
```

**No results.** Name the search and offer the way out.
```html
<div class="card" style="max-width: 420px; width: 100%;">
  <div class="empty" role="status"><div class="empty__icon"><span class="ic" aria-hidden="true">search</span></div><div class="empty__title">No courses match "statistcs"</div><div class="empty__body">Check the spelling or clear the filters to see every course.</div><button class="btn btn--secondary btn--md">Clear filters</button></div>
</div>
```

## States
| State | How |
|---|---|
| `first run` | Explains the value and offers the primary action. |
| `cleared` | After the person finished everything ("All caught up"); often no action at all. |
| `no results` | Repeats the query and offers to clear filters; `role="status"` when it appears after typing. |

## Motion and microinteractions
- Appears without an entrance when the page loads. When it replaces content in place (the last item was removed), cross-fade over `--d-standard` (240 ms) on `--ease-standard`.
- No looping illustration, no bouncing icon.

## Accessibility
- The icon is decoration (`aria-hidden="true"`).
- The title is plain text, not a heading, unless the region has no other heading.
- When it appears in response to a search or filter, give it `role="status"` so the result is announced.
- The button names the outcome ("Create a study plan", not "Get started").

## Do
- Say why it is empty in the title, and what will appear in the body.
- Offer exactly one action, or none when nothing helps.
- Keep the page header and filters visible above it.

## Don't
- Use an empty state while loading.
- Add generated illustrations or jokes.
- Offer several actions; pick the one that fills the region.

## Related
[Data states](data-states.md) · [Skeleton](skeleton.md) · [Alert](alert.md) · [Spotlight](spotlight.md)
