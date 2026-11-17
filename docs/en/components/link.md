# Link

Group: Actions. https://lampung.kartadinata.app/docs/en/components/link

Text that takes you somewhere: an `<a href>` with `.link`, medium weight in the accent text color, the underline fading in on hover. `.link--external` adds an arrow for other sites.

## Use it when
- Going to another page, section or site from inside a sentence or a short line of text: "Track its status", "Read the service requirements".
- A quiet secondary path next to a form or card that does not change anything ("Forgot your password?").
- Pointing to another website or a document that opens in a new tab (`link--external`).

## Use something else when
- The control does something on this page (save, delete, open a dialog): use [Button](button.md). Use `btn--plain` if it should look light; it is still a button.
- Long-form text with many links (articles, help pages): use [Prose](prose.md). Links inside `.prose` are styled automatically, underlined at rest.
- A large destination tile with a title and description: use [Link card](link-card.md).
- A numbered reference to a source: use [Citation](citation.md).
- Navigation between top-level sections of an app: use [Sidebar](sidebar.md).

## Where it goes
Inline in body text, in helper lines under fields, at the end of card descriptions and alerts. On phones the link must stay at least 24 px tall with space around it; for standalone links on touch screens prefer a [list](list.md) row or a `btn--plain`.

## Anatomy
| Part | What it is |
|---|---|
| `a.link` | Required. An `<a href>`. Accent text color, weight 500, underline offset 3 px and 1.5 px thick, transparent until hover. |
| `.link--external` | Optional. Appends a `north_east` arrow from the icon font after the text. |
| `target="_blank" rel="noreferrer"` | With `link--external` when it opens a new tab; add hidden text that says so. |

## Markup

**In a sentence.** Links read as part of the text. Hover to see the underline fade in.
```html
<p class="measure" style="font: var(--type-body); color: var(--text-default);">Your application was sent to the verification officer. <a class="link" href="#status">Track its status</a> or <a class="link link--external" href="https://example.com/service-requirements" target="_blank" rel="noreferrer">read the service requirements<span class="sr-only"> (opens in a new tab)</span></a>.</p>
```

**Under a field.** A quiet second path that leaves the form.
```html
<div class="field" style="max-width: 360px;">
  <label class="field__label" for="lk-pw">Password</label>
  <div class="control"><input id="lk-pw" type="password" value="warga2026"></div>
  <span class="field__help"><a class="link" href="#reset">Forgot your password?</a></span>
</div>
```

## Variants and sizes
| Class or attribute | When |
|---|---|
| `link` | Internal destination. |
| `link--external` | Another site or a file that opens in a new tab. |

## States
| State | How |
|---|---|
| `hover` | Underline fades from transparent to `currentColor`. |
| `focus` | System focus ring around the text (3 px radius). |
| `visited` | Not styled; the system does not distinguish visited links. |

## Motion and microinteractions
- The underline color transitions over `--d-fast` on `--ease-standard`. Nothing moves or scales.
- Reduced motion leaves this as is (it is a color change).

## Accessibility
- Always an `<a href>`; never a `<span>` or `<button>` styled as a link.
- Link text names the destination on its own ("Track its status"), never "click here" or "more".
- For new tabs, add `<span class="sr-only"> (opens in a new tab)</span>` inside the link.
- Color alone is not enough in running text with low contrast between link and body: the accent text holds 6.7:1 on the canvas and differs in weight; inside long articles use [prose](prose.md), which keeps the underline visible at rest.

## Do
- Write link text that makes sense out of context.
- Mark external links with `link--external`.
- Keep links inside the sentence they belong to.

## Don't
- Use a link to submit, delete or open a dialog.
- Make a whole paragraph a link.
- Use `link--external` for pages on your own site.

## Related
[Button](button.md) · [Prose](prose.md) · [Link card](link-card.md) · [Citation](citation.md)
