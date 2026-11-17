# Pagination

Group: Navigation. Docs page: `docs/components/pagination.html`.

Numbered page buttons under a long list or table. Show the first page, the last page and the neighbors of the current one; gaps become an ellipsis.

## Use it when
- A table or list of records that is too long for one page and people need to reach a specific page or come back to one: citizen reports, permit applications, aid recipients.
- The total is known, so "Page 5 of 12" is honest.

## Use something else when
- A feed people read top to bottom: use [Show more](show-more.md). Load the next batch in place.
- A few extra items under a short list: use [Show more](show-more.md).
- Moving through a fixed sequence of screens: use [Steps](steps.md).
- Swiping between a handful of cards: use [Carousel](carousel.md).

## Where it goes
Directly under the table or list it pages, right-aligned, with "Page 5 of 12" (or "Showing 81 to 100 of 236") on the left of the same row. On phones keep only previous, the current number and next.

## Anatomy
| Part | What it is |
|---|---|
| `nav[aria-label="Pagination"]` | Required. The landmark around the row. |
| `.pager` | Required. The row of buttons, 4 px apart. |
| `.pager__btn` | Required. A 36 px page button (or link). `aria-current="page"` marks the current one; `disabled` on previous at page 1 and next at the last page. |
| `.pager__gap` | An `aria-hidden` ellipsis where pages are skipped. |

## Markup

**Under a table.** Page 5 of 12: first, last and the neighbors of the current page, with gaps between.
```html
<nav class="cluster" style="justify-content: space-between;" aria-label="Pagination">
  <span class="section__sub">Page 5 of 12</span>
  <div class="pager">
    <button class="pager__btn" aria-label="Previous page"><span class="ic" aria-hidden="true">chevron_left</span></button>
    <button class="pager__btn" aria-label="Page 1">1</button>
    <span class="pager__gap" aria-hidden="true">…</span>
    <button class="pager__btn" aria-label="Page 4">4</button>
    <button class="pager__btn" aria-label="Page 5" aria-current="page">5</button>
    <button class="pager__btn" aria-label="Page 6">6</button>
    <span class="pager__gap" aria-hidden="true">…</span>
    <button class="pager__btn" aria-label="Page 12">12</button>
    <button class="pager__btn" aria-label="Next page"><span class="ic" aria-hidden="true">chevron_right</span></button>
  </div>
</nav>
```

**First page.** Previous is disabled on page 1; with few pages there are no gaps.
```html
<nav aria-label="Pagination">
  <div class="pager">
    <button class="pager__btn" aria-label="Previous page" disabled><span class="ic" aria-hidden="true">chevron_left</span></button>
    <button class="pager__btn" aria-label="Page 1" aria-current="page">1</button>
    <button class="pager__btn" aria-label="Page 2">2</button>
    <button class="pager__btn" aria-label="Page 3">3</button>
    <button class="pager__btn" aria-label="Next page"><span class="ic" aria-hidden="true">chevron_right</span></button>
  </div>
</nav>
```

## States
| State | How |
|---|---|
| `hover` | Strong tint behind the number. |
| `:active` | Scales to 0.92 and springs back. |
| `aria-current="page"` | Inverse fill (strong text color as background), weight 600. |
| `disabled` | Faint text, not clickable. |

## Motion and microinteractions
- Press: `scale(0.92)` on `:active`, back on `--spring-snappy` over `--d-snappy` (360 ms). Color and background ease over `--d-fast` (160 ms).
- When the page changes, scroll the list back to its top and swap the rows in place; do not slide pages sideways.

## Accessibility
- `<nav aria-label="Pagination">` around the row; each number button gets `aria-label="Page 5"`, the current one `aria-current="page"`.
- Previous and next are icon-only, so they need `aria-label`s.
- After changing pages, move focus to the top of the list (or its heading) so keyboard users are not stranded at the bottom.
- Use `<a href="?page=6" class="pager__btn">` when each page has its own URL.

## Do
- Keep the first, the last and the neighbors of the current page.
- Say where people are in words next to it ("Page 5 of 12").
- Put the page in the URL so back and share work.

## Don't
- Show every page number for more than seven pages.
- Hide previous and next at the ends; disable them.
- Use pagination for a list under 50 items; show it all or use show more.

## Related
[Table](table.md) · [Show more](show-more.md) · [List](list.md)
