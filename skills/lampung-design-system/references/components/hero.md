# Hero

Group: Marketing (new). Docs page: `docs/components/hero.html`.

The top of a product or landing page: one headline, one line under it, at most two actions, and the product itself beside or below. The product is shown working, not as a picture of a screen.

## Use it when
- The first screen of a landing, product or pricing page that sits in front of an app.
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
| `.hero__note` | A short line under the actions: a shortcut, a free plan, a requirement. |
| `.hero__media` | The product: live components on a [feature stage](feature-row.md), a working demo. |

## Markup

**Split, with the product working.** The stage on the right holds real components. Hold the button to pay; the switch rings its bell.
```html
<section class="hero hero--split hero--enter" aria-labelledby="hx-t" style="width: 100%; padding-block: 24px;">
  <div class="hero__copy">
    <h1 class="hero__title" id="hx-t">Send invoices that get paid on time.</h1>
    <p class="hero__lede">Write one in a minute, send it from your own address, and see the moment it is opened and paid.</p>
    <div class="hero__actions"><a class="btn btn--primary btn--lg" href="#hx-t">Start free</a><a class="btn btn--secondary btn--lg" href="#hx-t">See pricing</a></div>
    <p class="hero__note">Free for your first 10 invoices.</p>
  </div>
  <div class="hero__media">
    <div class="feature__stage">
      <div class="card" style="display: grid; gap: 16px;">
        <div><div class="card__title">Halim Studio</div><div class="card__sub">Design retainer, November 2026</div></div>
        <div class="stat-row-wrap"><dl class="stat-row" style="--n: 2"><div class="stat-row__item"><dt class="stat-row__label">Amount due</dt><dd class="stat-row__value">$2,480</dd><dd class="stat-row__sub">US dollars</dd></div><div class="stat-row__item"><dt class="stat-row__label">Hours billed</dt><dd class="stat-row__value">32</dd><dd class="stat-row__sub">Of 40 in the retainer</dd></div></dl></div>
        <label class="switch"><input type="checkbox" role="switch"><span class="switch__track" aria-hidden="true"><span class="switch__thumb"></span></span><span class="bell ic" aria-hidden="true">notifications</span>Email me when it is paid</label>
        <button class="btn btn--primary hold" data-lds-hold><span class="hold__fill" aria-hidden="true"></span><span class="ic" aria-hidden="true">wallet</span><span>Hold to pay $2,480</span></button>
      </div>
    </div>
  </div>
</section>
```

**Centered.** For a headline that carries the page alone, with the product in a wide stage below.
```html
<section class="hero hero--center" aria-labelledby="hx2-t" style="width: 100%; padding-block: 24px;">
  <div class="hero__copy">
    <h1 class="hero__title" id="hx2-t">Grade a class of forty in one evening. <span class="hero__quiet">Comments included.</span></h1>
    <p class="hero__lede">Rubrics, saved comments and a keyboard for every step, so marking takes the time it should.</p>
    <div class="hero__actions"><a class="btn btn--primary btn--lg" href="#hx2-t">Try it with your class</a></div>
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
- Name the primary button for what happens ("Start free", "Choose a plan").

## Don't
- Park a pill badge above the title that repeats it.
- Use a screenshot, a mock terminal or an illustration where the product could run.
- Add a third button or a background effect.

## Related
[Marketing section](marketing-section.md) · [Feature row](feature-row.md) · [Top nav](top-nav.md) · [CTA band](cta-band.md)
