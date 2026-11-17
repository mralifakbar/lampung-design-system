# Hero

Group: Marketing. https://lampung.kartadinata.app/docs/en/components/hero

The top of a product or landing page: one headline, one line under it, at most two actions, and the product itself beside or below. The product is shown working, not as a picture of a screen.

## Use it when
- The first screen of a landing, service or fees page that sits in front of an app.
- A launch page for one feature, where the feature can run live next to the headline.

## Use something else when
- The top of a page inside an app: use [Page header](page-header.md). Inside an app people already know where they are; they need the title and the actions.
- The one next step for a signed-in person: use [Spotlight](spotlight.md).
- A closing ask at the bottom of the page: use [CTA band](cta-band.md).

## Where it goes
Directly under the [top nav](top-nav.md), full content width (1200 px, the same gutter as every [marketing section](marketing-section.md)). `hero--split` puts the copy and the product side by side from 1024 px; below that the product follows the copy. On phones the actions stack when they do not fit.

## Anatomy
| Part | What it is |
|---|---|
| `section.hero` | Required. The grid; `aria-labelledby` the title. |
| `.hero--split` | Copy left, product right, from 1024 px. |
| `.hero--center` | Copy centered over a wide product below. |
| `.hero--enter` | The copy settles once on first load, 60 ms apart, then nothing moves on its own. |
| `.hero__copy` | Required. Holds title, lede, actions and note. |
| `h1.hero__title` | Required. 40 to 68 px, tracking −0.042em, balanced lines. One sentence that says what people get. |
| `.hero__quiet` | Optional second sentence inside the title in the subtle color. |
| `p.hero__lede` | One to three sentences with the facts behind the headline. |
| `.hero__actions` | One primary button, one secondary at most. |
| `.hero__note` | A short line under the actions: a shortcut, a free service, a requirement. |
| `.hero__media` | The product: live components on a [feature stage](feature-row.md), a working demo. |

## Markup

**Split, with the product working.** The stage on the right holds real components. Hold the button to pay; the switch rings its bell.
```html
<section class="hero hero--split hero--enter" aria-labelledby="hx-t" style="width: 100%; padding-block: 24px;">
  <div class="hero__copy">
    <h1 class="hero__title" id="hx-t">Pay your vehicle tax without queuing.</h1>
    <p class="hero__lede">Enter the plate number, check the bill details, then pay from home. The receipt goes straight to your email.</p>
    <div class="hero__actions"><a class="btn btn--primary btn--lg" href="#hx-t">Check bill</a><a class="btn btn--secondary btn--lg" href="#hx-t">See requirements</a></div>
    <p class="hero__note">No extra service fee.</p>
  </div>
  <div class="hero__media">
    <div class="feature__stage">
      <div class="card" style="display: grid; gap: 16px;">
        <div><div class="card__title">BE 1234 AB</div><div class="card__sub">Annual tax, due 28 November 2026</div></div>
        <div class="stat-row-wrap"><dl class="stat-row" style="--n: 2"><div class="stat-row__item"><dt class="stat-row__label">Total due</dt><dd class="stat-row__value">Rp 1,245,000</dd><dd class="stat-row__sub">Includes SWDKLLJ</dd></div><div class="stat-row__item"><dt class="stat-row__label">Days left</dt><dd class="stat-row__value">12</dd><dd class="stat-row__sub">Before a late fee</dd></div></dl></div>
        <label class="switch"><input type="checkbox" role="switch"><span class="switch__track" aria-hidden="true"><span class="switch__thumb"></span></span><span class="bell ic" aria-hidden="true">notifications</span>Tell me when the payment is received</label>
        <button class="btn btn--primary hold" data-lds-hold><span class="hold__fill" aria-hidden="true"></span><span class="ic" aria-hidden="true">wallet</span><span>Hold to pay Rp 1,245,000</span></button>
      </div>
    </div>
  </div>
</section>
```

**Centered.** For a headline that carries the page alone, with the product in a wide stage below.
```html
<section class="hero hero--center" aria-labelledby="hx2-t" style="width: 100%; padding-block: 24px;">
  <div class="hero__copy">
    <h1 class="hero__title" id="hx2-t">Report a damaged road in one minute. <span class="hero__quiet">Photo and location included.</span></h1>
    <p class="hero__lede">Photo, map pin and category sit in one form, and you can follow the repair until it is done.</p>
    <div class="hero__actions"><a class="btn btn--primary btn--lg" href="#hx2-t">Make a report</a></div>
  </div>
</section>
```

## Variants and sizes
| Class or attribute | When |
|---|---|
| `hero--split` | Copy and product side by side from 1024 px. |
| `hero--center` | Centered copy, max 860 px wide. |
| `hero--enter` | One short stagger on first load. |

## States
| State | How |
|---|---|
| `first load` | With `hero--enter` the copy and then the media rise 4 px out of a 4 px blur over `--d-smooth`, 60 ms apart. |

## Motion and microinteractions
- `hero--enter`: `lds-blur-in` over 560 ms on `--ease-enter`, delays 0, 60, 120, 180 ms for the copy and 240 ms for the media. It plays once; the whole stagger stays under 400 ms.
- Nothing loops. The live product moves only when someone uses it.
- Reduced motion: a 120 ms fade with no delay.

## Accessibility
- The title is the page `h1`; the section is labelled by it.
- Live components in the media keep their own labels and keyboard behavior; say in a caption what can be tried.
- The title color is `--text-strong`, the quiet part `--text-subtle` (6.6:1 on white, 7.7:1 on the dark canvas).

## Do
- Say the outcome in the title and the facts in the lede.
- Show the real product, running.
- Name the primary button for what happens ("Check bill", "Make a report").

## Don't
- Park a pill badge above the title that repeats it.
- Use a screenshot, a mock terminal or an illustration where the product could run.
- Add a third button or a background effect.

## Related
[Marketing section](marketing-section.md) · [Feature row](feature-row.md) · [Top nav](top-nav.md) · [CTA band](cta-band.md)
