# Plans

Group: Marketing. Docs page: `docs/components/plans.html`.

Pricing plans as cards, with a billing period control above them. Prices roll when the period or the seat count changes; the saving is said in words next to the control.

## Use it when
- A pricing page or section with two to four plans.
- Plans billed monthly or yearly, or per seat, where people compare totals before they buy.

## Use something else when
- One plan picked inside a checkout or settings form: use [Radio card](radio-card.md).
- Comparing every feature across plans: use [Compare table](compare-table.md).
- A single price in a sentence: use [Prose](prose.md).

## Where it goes
Inside a [marketing section](marketing-section.md) with a centered head. The `.billing` control sits centered above `.plans`; cards fill a grid that wraps below 280 px per card. Follow with a [compare table](compare-table.md) and the questions people ask before buying.

## Anatomy
| Part | What it is |
|---|---|
| `[data-lds-billing]` | On the section that holds the control and the prices. Wires the period and seat changes. |
| `.billing` | The row with a [segmented control](segmented-control.md) of `[data-billing="month|year"]` buttons and `.billing__save`. |
| `.plans` | Required. The grid of plans. |
| `article.plan` | Required. One plan on the quiet fill. `plan--featured` sits on the canvas with a 2 px accent ring: use it for the plan that fits most buyers, or for none. |
| `.plan__head` | `h3.plan__name` and `p.plan__desc` (who it is for). |
| `.plan__price` | `.plan__amount` (with `.plan__currency` and a `.roll`) and `.plan__period`. |
| `.roll[data-price-month][data-price-year]` | The price per period; add `data-per-seat` to multiply by the plan stepper. |
| `.plan__note` | One line of billing detail ("$228 once a year"). |
| `.plan__seats` | Optional row with a [number stepper](number-stepper.md) for seats. |
| `.plan__list-head, ul.plan__list` | What is included, each item with a `check` icon. |
| `.plan__cta` | The plan button, pushed to the bottom so buttons line up. |
| `[data-billing-month][data-billing-year]` | Any text that depends on the period; `{seats}` and `{total}` (with `data-total-year`) are filled in. On a `.morph` element the words morph. |

## Markup

**Monthly or yearly, with seats.** Market stall rental from a fictional city market office. Switch the period and change the number of stalls: the prices roll, the words morph.
```html
<div data-lds-billing style="width: 100%;">
  <div class="billing">
    <div class="seg seg--lg" role="group" aria-label="Billing period" data-lds-segmented><span class="seg__thumb"></span><button class="seg__btn" aria-pressed="true" data-billing="month">Monthly</button><button class="seg__btn" aria-pressed="false" data-billing="year">Yearly</button></div>
    <span class="billing__save">Yearly saves 2 months</span>
  </div>
  <div class="plans">
    <article class="plan plan--featured" aria-labelledby="pl-1">
      <div class="plan__head"><h3 class="plan__name" id="pl-1">Kiosk</h3><p class="plan__desc">One closed kiosk at Pasar Tugu, Tanjung Karang Timur.</p></div>
      <div class="plan__price"><span class="plan__amount"><span class="plan__currency">Rp</span><span class="roll" data-price-month="360" data-price-year="300" data-lds-roll-label="{n} thousand rupiah a month"></span></span><span class="plan__period morph" data-lds-morph data-billing-month="thousand a month" data-billing-year="thousand a month, paid yearly">thousand a month</span></div>
      <ul class="plan__list"><li><span class="ic" aria-hidden="true">check</span>Electricity and water meter included</li><li><span class="ic" aria-hidden="true">check</span>Daily waste pickup</li></ul>
      <div class="plan__cta"><button class="btn btn--primary btn--block">Apply for a kiosk</button></div>
    </article>
    <article class="plan" aria-labelledby="pl-2">
      <div class="plan__head"><h3 class="plan__name" id="pl-2">UMKM bazaar stalls</h3><p class="plan__desc">Open stalls for a group of local businesses at the Saturday bazaar.</p></div>
      <div class="plan__price"><span class="plan__amount"><span class="plan__currency">Rp</span><span class="roll" data-per-seat data-price-month="30" data-price-year="25" data-lds-roll-label="{n} thousand rupiah a month"></span></span><span class="plan__period morph" data-lds-morph data-billing-month="thousand a month for {seats} stalls" data-billing-year="thousand a month for {seats} stalls">thousand a month for 10 stalls</span></div>
      <div class="plan__seats"><span id="pl-s">Stalls</span><div class="stepper-field" role="group" aria-labelledby="pl-s" data-lds-stepper data-min="5" data-max="200" data-value="10"><button aria-label="Fewer stalls"><span class="ic" aria-hidden="true">remove</span></button><span class="stepper-field__value"><span class="roll" aria-live="polite"></span></span><button aria-label="More stalls"><span class="ic" aria-hidden="true">add</span></button></div></div>
      <div class="plan__cta"><button class="btn btn--secondary btn--block">Ask for a group quote</button></div>
    </article>
  </div>
</div>
```

## Variants and sizes
| Class or attribute | When |
|---|---|
| `plan--featured` | The one plan most buyers need: canvas color, 2 px accent ring. At most one. |

## States
| State | How |
|---|---|
| `month / year` | `data-period` on the billing element mirrors the choice; `lds:billing` fires with `{ period }`. |
| `seats` | A stepper inside a plan multiplies that plan's `data-per-seat` prices. |

## Motion and microinteractions
- Prices are [rolling numbers](rolling-number.md): each digit column slides on `--spring-smooth` (560 ms). A change in digit count redraws without rolling.
- Period words morph letter by letter with [text morph](text-morph.md); the seg thumb slides on `--spring-smooth`.
- Reduced motion: digits and words swap at once.

## Accessibility
- Each plan is an `article` labelled by its name. Prices get a spoken label from `data-lds-roll-label` ("19 US dollars a month").
- The period control is a group of toggle buttons with `aria-pressed`; arrow keys move between them.
- The featured ring is not the only signal: the description and the primary button say who it is for.

## Do
- Show the yearly total in the note, not only the monthly equivalent.
- Line the buttons up at the bottom of every card.
- Use as many plans as the product really has.

## Don't
- Add a "Most popular" pill without a reason.
- Hide the price or the period in small print.
- Use the accent ring on more than one plan.

## Behavior (plain HTML)
`data-lds-billing` on the element that holds the period buttons and the prices. Buttons `[data-billing="month|year"]` (inside a `[data-lds-segmented]`); prices `.roll[data-price-month][data-price-year]` (`data-per-seat` multiplies by the `[data-lds-stepper]` in the same `.plan`); text `[data-billing-month][data-billing-year]` with `{seats}` and `{total}` (`data-total-month|year` times seats). Emits `lds:billing` with `{ period }`.

## Related
[Compare table](compare-table.md) · [Radio card](radio-card.md) · [Rolling number](rolling-number.md) · [Segmented control](segmented-control.md)
