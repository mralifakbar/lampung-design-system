# Product tile

Group: Data display. Docs page: `docs/components/product-tile.html`.

A product people tap to add to a sale or an order: picture, name, one meta line and the price, with a badge in the corner that counts how many are already in the sale. The whole tile is one button.

## Use it when
- A point of sale or a counter where the cashier adds products by tapping them: a shop, a cafe, a ticket desk.
- A self-order screen or a menu where people build an order from a grid of items.
- Any grid where one tap adds one item and the running count matters more than the details.

## Use something else when
- Browsing products to open their page: use [Card](card.md). Use a linked card (`card--link`); a product tile adds, it does not navigate.
- Managing a catalog: editing, stock, status: use [Data table](data-table.md).
- Choosing one plan or package with a description: use [Radio card](radio-card.md).
- Files and folders: use [File tile](file-tile.md).

## Where it goes
In a `.ptile-grid` (columns of at least `--min`, 148 px by default) beside or above the current sale. On phones two columns of tiles fill the width; `.ptile--compact` puts the picture beside the name for long lists or narrow side panels.

## Anatomy
| Part | What it is |
|---|---|
| `button.ptile` | Required. The whole tile; `aria-label` says the name, the price and how many are in the sale. |
| `.ptile__media` | Required. A square picture (`img`, alt empty because the label names the product) or a 32 px icon when there is no photo. `--ratio` changes the shape. |
| `.ptile__name` | Required. Two lines at most, then it clips. |
| `.ptile__meta` | Optional. Stock, size or variant. `.ptile__meta--low` for low stock, in words. |
| `.ptile__price` | Required. Tabular, at the bottom so prices line up across a row. |
| `.ptile__qty` | Optional. How many are in the current sale; `hidden` at zero. Add `.is-bump` again to pop it when the count changes. |
| `.is-in` | The product is in the sale: an accent ring. |
| `[aria-disabled="true"]` | Sold out or not for sale now: the picture fades, the meta line says why. |

## Markup

**A point-of-sale grid.** The count in the corner and the accent ring say what is already in the sale; low stock is said in words; the sold-out tile fades and says when it is back.
```html
<div class="ptile-grid">
  <button class="ptile is-in" type="button" aria-label="Stoneware mug, set of 2, $36.00, 2 in this sale">
    <span class="ptile__media"><img src="img/products/stoneware-mug.svg" alt=""></span>
    <span class="ptile__body"><span class="ptile__name">Stoneware mug, set of 2</span><span class="ptile__meta">36 in stock</span></span>
    <span class="ptile__price">$36.00</span>
    <span class="ptile__qty">2</span>
  </button>
  <button class="ptile" type="button" aria-disabled="true" aria-label="Field watch, 38 mm, $189.00, sold out">…<span class="ptile__meta">Sold out until 2 Dec</span>…</button>
</div>
<script type="module">
  // On tap: add to the sale, then show the count and pop it
  qty.hidden = false; qty.textContent = n; qty.classList.remove('is-bump'); void qty.offsetWidth; qty.classList.add('is-bump');
</script>
```

**Compact, in a narrow panel.** `ptile--compact` puts the picture beside the name: for a side panel, quick picks or a long list on a phone.
```html
<div class="ptile-grid" style="--min: 240px; max-width: 520px;">
  <button class="ptile ptile--compact" type="button" aria-label="Organic cotton crew tee, $29.00"><span class="ptile__media"><img src="../examples/dashboard/img/products/crew-tee.svg" alt=""></span><span class="ptile__body"><span class="ptile__name">Organic cotton crew tee</span><span class="ptile__meta">S, M, L</span></span><span class="ptile__price">$29.00</span><span class="ptile__qty" hidden></span></button>
  <button class="ptile ptile--compact is-in" type="button" aria-label="Dot grid notebook, A5, $18.00, 1 in this sale"><span class="ptile__media"><img src="../examples/dashboard/img/products/dot-notebook.svg" alt=""></span><span class="ptile__body"><span class="ptile__name">Dot grid notebook, A5</span><span class="ptile__meta">120 in stock</span></span><span class="ptile__price">$18.00</span><span class="ptile__qty">1</span></button>
</div>
```

## Variants and sizes
| Class or attribute | When |
|---|---|
| `.ptile` | Picture on top; the default for grids. |
| `.ptile--compact` | Picture at the start, 56 px; for narrow panels and long lists. |
| `.ptile-grid` | The grid; set `--min` for the smallest column width. |

## States
| State | How |
|---|---|
| `hover` | The ring darkens and the picture grows 4 %. |
| `pressed` | Sinks to 0.97 in 90 ms, back on `--spring-snappy`. |
| `in the sale` | `.is-in` accent ring and the `.ptile__qty` count. |
| `sold out` | `aria-disabled="true"`: faded picture and muted text; the meta line says when it is back. A tap shakes the tile and announces why. |
| `loading` | A grid of tiles with a square `.skel` and two text bars. |

## Motion and microinteractions
- Press: `scale(0.97)` in 90 ms, released on `--spring-snappy` (360 ms).
- The count pops in from 0.6 on `--spring-snappy`; each change re-plays `lds-pop` from 0.82 so a fast run of taps stays readable.
- Hover grows the picture on `--spring-smooth`; nothing moves on touch screens.
- Reduced motion: no pop and no scale; the count and ring change at once.

## Accessibility
- A real `button`; `aria-label` carries the name, the price and the count ("Stoneware mug, $36.00, 2 in this sale"). Update it when the count changes.
- Use `aria-disabled` rather than `disabled` for sold out, so the tile stays focusable and can explain itself.
- Announce each add through a polite live region ("Added Stoneware mug, 2 in the sale").
- Tiles are at least 148 px wide, far above the 44 px target.

## Do
- Show the price on every tile; cashiers compare by price.
- Keep a running total of the sale in view beside or under the grid.

## Don't
- Put extra buttons inside the tile; quantity changes belong to the sale lines.
- Hide sold-out products silently; show them disabled with the reason.

## Related
[Card](card.md) · [Number stepper](number-stepper.md) · [Thumbnail](thumbnail.md) · [Rolling number](rolling-number.md)
