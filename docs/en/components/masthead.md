# Masthead

Group: Navigation (new). https://lampung.kartadinata.app/docs/en/components/masthead

The thin strip above everything on a public-service site that tells people whether the site is official, and how to tell. Sites built with this system that are not run by a government use the unofficial variant.

## Use it when
- Every page of a public-service site or app, as the first element in `<body>`, before the skip link target and the header.
- A community, campaign or demo site that could be mistaken for a government service: say plainly that it is not.

## Use something else when
- A message about this page or this account (maintenance, a deadline): use [Banner](banner.md).
- A status inside the content: use [Alert](alert.md).
- The site navigation itself: use [Top nav](top-nav.md).

## Where it goes
Full width at the very top, above the header, on every page. It does not stick when the page scrolls. On phones the toggle wraps under the sentence.

## Anatomy
| Part | What it is |
|---|---|
| `.masthead` | Required. A `<div role="region">` with an `aria-label` such as "Site status". Add `masthead--official` only for a site an agency actually runs. |
| `.masthead__bar` | Required. Mark, sentence and toggle in one row. |
| `.masthead__mark` | A small icon chip: gold for unofficial, green for official. |
| `.masthead__toggle` | A `<button>` with `data-lds-masthead`, `aria-expanded` and `aria-controls` pointing at the panel. |
| `.collapse > div > .masthead__body` | The explanation: who runs the site and how to recognise official services. |

## Markup

**Unofficial site.** What every LDS demo and community site shows. The panel explains who runs it and where official services live.
```html
<div class="masthead" role="region" aria-label="Site status">
  <div class="masthead__bar">
    <span class="masthead__mark" aria-hidden="true"><span class="ic">info</span></span>
    <span class="masthead__text">Community project. This is not an official government website.</span>
    <button class="masthead__toggle" data-lds-masthead aria-expanded="false" aria-controls="mh-1">How to tell<span class="ic" aria-hidden="true">expand_more</span></button>
  </div>
  <div class="collapse is-closed" id="mh-1" inert><div><div class="masthead__body">
    <p class="masthead__item"><span class="ic" aria-hidden="true">groups</span><span><b>Run by volunteers.</b> Built and maintained by an open source community, not by any agency.</span></p>
    <p class="masthead__item"><span class="ic" aria-hidden="true">verified_user</span><span><b>Official services use go.id.</b> Government sites in Indonesia end in .go.id. Never enter your national ID number on a site you are unsure of.</span></p>
  </div></div></div>
</div>
```

**Official site.** Only for a site an agency runs itself. The wording names the domain people can check.
```html
<div class="masthead masthead--official" role="region" aria-label="Site status">
  <div class="masthead__bar">
    <span class="masthead__mark" aria-hidden="true"><span class="ic">verified_user</span></span>
    <span class="masthead__text">An official website of the City of Example.</span>
    <button class="masthead__toggle" data-lds-masthead aria-expanded="false" aria-controls="mh-2">How to tell<span class="ic" aria-hidden="true">expand_more</span></button>
  </div>
  <div class="collapse is-closed" id="mh-2" inert><div><div class="masthead__body">
    <p class="masthead__item"><span class="ic" aria-hidden="true">language</span><span><b>Official sites use go.id.</b> Check that the address ends in .go.id before you sign in.</span></p>
    <p class="masthead__item"><span class="ic" aria-hidden="true">lock</span><span><b>Secure sites use https.</b> A lock in the address bar means the connection is encrypted.</span></p>
  </div></div></div>
</div>
```

## Variants and sizes
| Class or attribute | When |
|---|---|
| `masthead` | Unofficial (default): gold mark, for community and demo sites. |
| `masthead--official` | Green mark, only for sites an agency runs. |
| `--masthead-max` | Set to the page container width (for example `1200px`) to align the bar with the header. |

## States
| State | How |
|---|---|
| `closed` | Default. The panel is collapsed and `inert`. |
| `open` | `aria-expanded="true"`; the chevron turns and the panel expands. |

## Motion and microinteractions
- The panel expands with `.collapse` on `--spring-smooth` (560 ms) and fades in on `--ease-standard`; closing reverses from wherever it is.
- The chevron turns 180 degrees on `--spring-snappy`. Reduced motion: no turn, the panel still opens.

## Accessibility
- A `region` landmark with a short `aria-label`, so screen reader users can find it and skip it.
- The toggle is a real `<button>` with `aria-expanded` and `aria-controls`; its hit area extends to 44 px tall around the 28 px chip.
- Text is `--text-subtle` on `--bg-fill` (above 5:1 in both themes).

## Do
- Put it on every page, first in the body.
- Say plainly who runs the site.
- Point to how people can recognise official services (.go.id).

## Don't
- Use the official variant on a site no agency runs.
- Add a coat of arms or agency logo to it.
- Make it sticky or dismissible: it is a fact about the site, not a message.

## Behavior (plain HTML)
`init()` binds `[data-lds-masthead]`: clicking toggles `aria-expanded`, the `is-closed` class and `inert` on the panel named by `aria-controls`.

## Related
[Banner](banner.md) · [Top nav](top-nav.md) · [Site footer](site-footer.md) · [Alert](alert.md)
