# Quote

Group: Content. https://lampung.kartadinata.app/docs/en/components/quote

Words someone else said or wrote, set off by a 3 px accent bar on the left, 17/28 in `--text-strong`, with the source in a footer below. Only for real quotations.

## Use it when
- Quoting a person, a rule or a source inside an article, guide or report: a village head's remark, a clause from service rules.
- Showing feedback someone wrote, attributed to them (a verifier's comment on an application).

## Use something else when
- Drawing attention to a warning, tip or important condition: use [Alert](alert.md). A quote bar is not a callout.
- The one next step on a page: use [Spotlight](spotlight.md).
- Pointing to the source of a fact: use [Citation](citation.md). A numbered citation is inline; a quote reproduces the words.
- Showing code or output: use [Code block](code-block.md).
- A testimonial on a marketing page: use [Card](card.md). Only with real, attributed words; never invented ones.

## Where it goes
In the flow of [prose](prose.md) or a section, at the reading width. It sets `margin: 0`, and because that rule comes after the prose spacing it also cancels the 16 px gap inside `.prose`; place it in a `stack` or add `margin-block: 16px` in project CSS until the system fixes this. On phones it keeps the bar and full width.

## Anatomy
| Part | What it is |
|---|---|
| `blockquote.quote` | Required. The quote with the accent bar and 18 px left padding. Holds one or more `<p>`. |
| `footer` | Optional. Who said it and where: `--type-footnote` in `--text-subtle`, 8 px below. |
| `figure.quote + figcaption` | Also supported for the attribution, but put the words in a `<p>`, not a nested `<blockquote>` (its browser margin is not reset). |

## Markup

**In a service guide.** A short quote with its source.
```html
<blockquote class="quote measure">
  <p>Applicants must come in person for e-KTP recording; recording cannot be done on someone else's behalf.</p>
  <footer>Service counter rules, Kedaton district office, article 12</footer>
</blockquote>
```

**Feedback on an application.** Attributed words from a person, with the date in the footer.
```html
<figure class="quote measure">
  <p>The site plan is clear and the files are complete. Next time, add a photo of the shop sign taken from the street.</p>
  <figcaption>Sari Wulandari, verifier, on application IUM 2104 · 3 November</figcaption>
</figure>
```

## Motion and microinteractions
- None. Quotes are static text.

## Accessibility
- Use `<blockquote>` (or `<figure>` with `<figcaption>`) so the quotation is announced as one.
- Put the attribution in `footer` or `figcaption`, not in the quoted paragraph.
- Add `cite="url"` on the blockquote when the source is online, and link the source in the footer.

## Do
- Quote exactly and attribute every quote.
- Keep quotes to a few sentences.

## Don't
- Use `.quote` to highlight your own text.
- Invent quotes or testimonials for example content.
- Nest a `<blockquote>` inside `figure.quote`.

## Related
[Prose](prose.md) · [Citation](citation.md) · [Alert](alert.md) · [Spotlight](spotlight.md)
