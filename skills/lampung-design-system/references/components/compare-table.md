# Compare table

Group: Marketing (new). Docs page: `docs/components/compare-table.html`.

Plans as columns and features as rows, grouped by topic, with a check, a dash icon or a short value in each cell. It scrolls sideways in its own box while the feature names stay put.

## Use it when
- Under the plan cards on a pricing page, for people who want every difference before they buy.
- Comparing two to four editions of a product by the same list of features.

## Use something else when
- Choosing a plan: use [Plans](plans.md).
- Records compared by attributes (students, invoices): use [Table](table.md).
- Label and value pairs of one item: use [Key-value](key-value.md).

## Where it goes
Under [plans](plans.md), often behind a "Compare every feature" button that opens it in place with the collapse recipe. Full content width; from 620 px it fits, below that it scrolls inside `.compare-box` with the feature column sticky on the left.

## Anatomy
| Part | What it is |
|---|---|
| `.compare-box` | Required. The scroll box (positioned, so screen-reader-only text stays inside it). |
| `table.compare` | Required. A real table with a `caption`. |
| `thead th` | The plan names; `.compare__price` under each name. |
| `tr.compare__group > th[scope="rowgroup"]` | A group heading row spanning all columns. |
| `tbody th[scope="row"]` | The feature name. |
| `td` | A `check` icon, a `remove` icon with `.compare__no`, or a short value ("All 143", "3 to 50"). Icons carry `.sr-only` text. |
| `.is-featured` | On every cell of the recommended plan's column: the quiet fill, rounded at the ends. |

## Markup

**Two groups, three plans.** Narrow the window: the plans scroll under the feature names.
```html
<div class="compare-box" data-lds-fade style="width: 100%;">
  <table class="compare">
    <caption>Compare plans</caption>
    <thead><tr><th scope="col">Feature</th><th scope="col">Free<span class="compare__price">$0</span></th><th scope="col" class="is-featured">Teacher<span class="compare__price">$12 a month</span></th><th scope="col">School<span class="compare__price">$9 per teacher</span></th></tr></thead>
    <tbody>
      <tr class="compare__group"><th scope="rowgroup" colspan="4">Classes</th></tr>
      <tr><th scope="row">Classes</th><td>2</td><td class="is-featured">Unlimited</td><td>Unlimited</td></tr>
      <tr><th scope="row">Rubrics</th><td><span class="ic compare__no" aria-hidden="true">remove</span><span class="sr-only">Not included</span></td><td class="is-featured"><span class="ic" aria-hidden="true">check</span><span class="sr-only">Included</span></td><td><span class="ic" aria-hidden="true">check</span><span class="sr-only">Included</span></td></tr>
      <tr class="compare__group"><th scope="rowgroup" colspan="4">Support</th></tr>
      <tr><th scope="row">Email support</th><td><span class="ic compare__no" aria-hidden="true">remove</span><span class="sr-only">Not included</span></td><td class="is-featured">2 business days</td><td>1 business day</td></tr>
    </tbody>
  </table>
</div>
```

## States
| State | How |
|---|---|
| `narrow` | Below 760 px the feature column is sticky on the canvas color; [scroll fades](scroll-fades.md) (`data-lds-fade`) show there is more to the right. |
| `period change` | Inside a `[data-lds-billing]` element the header prices can morph with the period like the plan cards. |

## Motion and microinteractions
- Static. Opened in place with the collapse recipe (`grid-template-rows` 0fr to 1fr on `--spring-smooth`), never a page jump.

## Accessibility
- A real `<table>` with a caption, `scope="col"` on plan headers, `scope="row"` on feature names and `scope="rowgroup"` on group rows.
- Check and dash icons are `aria-hidden` with "Included" or "Not included" in `.sr-only` text.
- The scroll box is reachable by keyboard through the cells it contains; it never makes the page scroll sideways.

## Do
- Write limits as words or numbers ("3 to 50") instead of a check when they differ.
- Group rows by what buyers ask about: features, platforms, license, support.

## Don't
- Use color alone for included and not included.
- Repeat every line of the plan cards; the table is for the full list.

## Related
[Plans](plans.md) · [Table](table.md) · [Scroll fades](scroll-fades.md) · [Height expand](height-expand.md)
