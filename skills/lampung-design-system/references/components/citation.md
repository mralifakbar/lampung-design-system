# Citation

Group: Content. Docs page: `docs/components/citation.html`.

A small numbered pill after a claim that links to its source: `<a class="cite" href="#src-1">1</a>`. Used in articles and assistant answers so every fact can be checked.

## Use it when
- An assistant answer or summary states facts drawn from documents: each claim gets a numbered citation to the document it came from.
- A lesson or report refers to sources listed at the end.

## Use something else when
- A link the reader should follow as part of the sentence: use [Link](link.md).
- Reproducing the words of a source: use [Quote](quote.md).
- A count of items next to a label: use [Count](count.md).
- A status or category tag: use [Badge](badge.md).
- A preview of a linked page on hover: use [Hover card](hover-card.md).

## Where it goes
Directly after the claim, before the period or after it consistently, with no space before it. The numbered sources follow at the end of the text or the message. On phones keep the sources list right below the answer so the jump is short.

## Anatomy
| Part | What it is |
|---|---|
| `a.cite` | Required. 18 px tall pill on `--accent-tint`, 11 px semibold tabular number in `--accent-text`. `href` points to the source entry (or the source URL). |
| `aria-label` | Required. "Source 1", so it is not read as a bare number. |
| `sources list` | An ordered list at the end whose items carry the matching `id`s. In `.prose` a plain `<ol>` is styled already. |

## Markup

**In an answer, with sources.** Each claim points to the document it came from. Hover a number to see it darken.
```html
<div class="prose">
  <p>The final exam is on 18 December in room B204 <a class="cite" href="#cite-src-1" aria-label="Source 1">1</a>. You may bring one handwritten page of notes <a class="cite" href="#cite-src-2" aria-label="Source 2">2</a>, and the exam counts for 40 % of the grade <a class="cite" href="#cite-src-1" aria-label="Source 1">1</a>.</p>
  <h3>Sources</h3>
  <ol>
    <li id="cite-src-1"><a href="#syllabus">Database Systems syllabus, semester 3</a></li>
    <li id="cite-src-2"><a href="#rules">Exam regulations, article 12</a></li>
  </ol>
</div>
```

## States
| State | How |
|---|---|
| `hover` | Background deepens to `--accent-tint-strong` over `--d-fast`. |
| `focus` | System focus ring around the pill. |
| `target` | The source item it points to; use `:target` in your project CSS or scroll it into view. |

## Motion and microinteractions
- Only the hover color, over `--d-fast`. Jumping to the source uses the page's smooth scroll; under reduced motion it jumps.

## Accessibility
- An `<a href>` with `aria-label="Source N"`; the visible number alone is meaningless when read.
- The pill is 18 px tall, under the 44 px touch target. Keep citations spaced apart in text and always provide the full sources list as a second way to reach them.
- Number sources in order of first appearance and reuse the number for repeat citations.

## Do
- Cite every factual claim in an assistant answer that comes from a document.
- List the sources with titles people recognize.

## Don't
- Cite without a sources list.
- Use citations as footnotes for asides; write the aside in the text.
- Put several pills in a row without text between them; list `1, 2` in one sentence instead.

## Related
[Prose](prose.md) · [Link](link.md) · [Quote](quote.md) · [Chat message](chat-message.md)
