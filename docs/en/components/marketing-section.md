# Marketing section

Group: Marketing. https://lampung.kartadinata.app/docs/en/components/marketing-section

One part of a landing or product page: a head with an eyebrow, a large title and a lede, over any content. Every marketing section shares the same width and gutter, so edges line up down the page.

## Use it when
- Each part of a landing, product or pricing page after the hero: features, examples, pricing, questions.
- A content page outside the app that needs a larger voice than an app section.

## Use something else when
- Sections of a page inside an app: use [Sections](sections.md). App pages use smaller heads; the marketing title is too loud next to data.
- The first screen of the page: use [Hero](hero.md).
- A closing ask: use [CTA band](cta-band.md).

## Where it goes
Stacked in `<main>` under the [hero](hero.md). 1200 px wide at most with a 20 to 48 px gutter, 56 to 120 px of space above and below (`msec--tight` halves it). `msec--rule` draws a hairline on top where two sections would otherwise run together.

## Anatomy
| Part | What it is |
|---|---|
| `section.msec` | Required. Width, gutter and vertical rhythm. |
| `.msec--rule` | Hairline on top. |
| `.msec--tight` | Less space above and below, for a strip or a closing band. |
| `.msec__head` | The head: a grid, max 760 px wide. `--center` centers it; `--row` puts an `.msec__aside` action on the right. |
| `.msec__eyebrow` | A short label with an icon that names the topic. Not a pill. |
| `h2.msec__title` | Required in a head. 30 to 48 px, tracking −0.034em. |
| `p.msec__lede` | One or two sentences, max 62 characters a line. |
| `.msec__aside` | In `msec__head--row`: one secondary action, bottom right; under the text on phones. |

## Markup

**Head with an action on the right.** Resize below 760 px: the action moves under the lede.
```html
<section class="msec" aria-labelledby="ms-t" style="width: 100%; padding-block: 8px;">
  <div class="msec__head msec__head--row" style="margin-bottom: 24px;">
    <span class="msec__eyebrow"><span class="ic ic--sm" aria-hidden="true">grid_view</span>Services</span>
    <h2 class="msec__title" id="ms-t">Start with the services people use most.</h2>
    <p class="msec__lede">Twelve population record services can be requested from home, each with its list of documents.</p>
    <a class="btn btn--secondary msec__aside" href="#ms-t">See all services</a>
  </div>
  <div class="link-grid">
    <a class="link-card" href="#ms-t"><span class="link-card__title">New family card (KK)</span><span class="link-card__body">5 documents, done in 3 working days</span></a>
    <a class="link-card" href="#ms-t"><span class="link-card__title">Birth certificate</span><span class="link-card__body">4 documents, done in 1 working day</span></a>
  </div>
</section>
```

**Centered head.** For a section whose content is centered too, such as fees.
```html
<section class="msec" aria-labelledby="ms2-t" style="width: 100%; padding-block: 8px;">
  <div class="msec__head msec__head--center" style="margin-bottom: 0;">
    <span class="msec__eyebrow"><span class="ic ic--sm" aria-hidden="true">wallet</span>Fees</span>
    <h2 class="msec__title" id="ms2-t">Every one of these services is free.</h2>
    <p class="msec__lede">You pay nothing. If anyone asks you for a fee, report it through the complaints channel.</p>
  </div>
</section>
```

## Variants and sizes
| Class or attribute | When |
|---|---|
| `msec--rule` | Hairline above the section. |
| `msec--tight` | About half the vertical space. |
| `msec__head--center` | Centered head. |
| `msec__head--row` | Head with an aside action on the right. |

## Motion and microinteractions
- Static. The head may fade up once with [reveal on scroll](reveal-on-scroll.md) (`data-lds-reveal`); the content keeps its own motion.

## Accessibility
- Each section is a `<section>` with `aria-labelledby` its `h2`, so it shows in the landmarks list.
- Eyebrow icons are decorative (`aria-hidden`); the eyebrow text is read before the title.

## Do
- Vary what sits under the head from section to section: a live stage, a list, a grid, a table.
- Keep titles to one sentence that states a fact or an outcome.

## Don't
- Give every section the same head and the same card grid.
- Write eyebrows in capitals with wide tracking.
- Alternate section backgrounds to create rhythm; use space and hairlines.

## Related
[Hero](hero.md) · [Feature row](feature-row.md) · [Sections](sections.md) · [Link card](link-card.md)
