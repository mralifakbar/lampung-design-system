# Prose

Group: Content. https://lampung.kartadinata.app/docs/en/components/prose

A wrapper for long-form text you do not control line by line: articles, help pages, service guides, rendered Markdown. `.prose` styles plain headings, paragraphs, lists, links, tables and inline code inside it and caps the line length at 680 px.

## Use it when
- Rendering Markdown or rich text from a CMS, an editor or an assistant answer, where the HTML has no classes.
- A help article, a service guide, terms and policies: text that is read top to bottom.

## Use something else when
- Interface copy: card descriptions, helper text, empty states: use [Card](card.md). Components set their own type; do not wrap UI in `.prose`.
- A page made of sections with titles and components in them: use [Sections](sections.md).
- Code longer than one line: use [Code block](code-block.md).
- Label and value pairs (fees, dates, details): use [Key-value](key-value.md).
- A message in a chat: use [Chat message](chat-message.md). Assistant messages may contain `.prose`, but the bubble comes from the chat component.

## Where it goes
In the main column of a page, alone or as the main column of `split-2` next to an [outline](outline.md). It sets its own `max-width` (`--size-measure`, 680 px); do not stretch it. On phones it fills the width inside the 20 px gutter and the body steps down to 15.5/26.

## Anatomy
| Part | What it is |
|---|---|
| `.prose` | Required. The wrapper. Body 16/27, `--text-default`, 16 px between blocks. |
| `h2, h3` | `--type-title-2` / `--type-title-3` in `--text-strong`, 40 / 28 px above, 10 px to what follows. |
| `ul, ol (no class)` | Disc and decimal markers in `--text-subtle`, 22 px indent, 8 px between items. |
| `a (no class)` | Accent text, underlined at rest at 35 % strength, full strength on hover. |
| `strong, table, .code` | Semibold strong text; tables with hairline rows; [inline code](inline-code.md). Add `.quote`, `.cite`, `.thumb` for quotes, citations and images. |

## Markup

**A service guide.** Plain HTML with no classes, except the inline code, a quote and a citation, which are their own components.
```html
<article class="prose">
  <h2>Moving to another city</h2>
  <p>You need a <strong>certificate of moving</strong> when you move your domicile out of Bandar Lampung. Get it before you move: the family card and KTP at your new address are made from it.</p>
  <h3>How to apply</h3>
  <ol>
    <li>Fill in the moving form, <code class="code">F-1.03</code>, and sign it.</li>
    <li>Attach the original family card and a cover letter from your RT and RW.</li>
    <li>Hand it in at the kelurahan office or send it through the online service.</li>
  </ol>
  <blockquote class="quote"><p>Bring the original family card when you collect the letter; photocopies are not accepted.</p><footer>Counter notice, population services, Kedaton district</footer></blockquote>
  <p>Most applications are done in three working days; incomplete ones are sent back <a class="cite" href="#src-1" aria-label="Source 1">1</a>. See the <a href="#lesson-14">next step</a> for a new family card at your new address.</p>
  <table>
    <thead><tr><th>Move</th><th>Extra document</th></tr></thead>
    <tbody>
      <tr><td>Within a district</td><td>RT and RW cover letter</td></tr>
      <tr><td>To another district</td><td>Certificate of moving</td></tr>
      <tr><td>To another city</td><td>Certificate of moving, signed by the city</td></tr>
    </tbody>
  </table>
</article>
```

**Assistant answer.** Rendered Markdown from an answer: short paragraphs and a bulleted list.
```html
<div class="prose">
  <p>You have three documents to complete this week:</p>
  <ul>
    <li><strong>Domicile letter</strong>, for your business permit, due tomorrow at 23:59.</li>
    <li><strong>Photos of the business site</strong>, uploaded before Thursday.</li>
    <li>Reading the market levy rules before Friday's verification.</li>
  </ul>
  <p>Start with the domicile letter; without it the application cannot be processed.</p>
</div>
```

## Motion and microinteractions
- None. Long text never animates in, except text that is still streaming, which uses [streaming text](streaming-text.md).
- Link underlines change color over `--d-fast`.

## Accessibility
- Use real structure: `<article>` or `<main>`, one `<h1>` on the page (outside `.prose` in the page header), then `h2` and `h3` in order without skipping levels.
- Links say where they go; see [link](link.md).
- Tables keep `<thead>` and `<th>`; add a `<caption>` when the table has no heading right above it.
- Body text is 16 px at 27 px line height and about 70 characters a line, which keeps it readable when zoomed to 200 %.

## Do
- Wrap rendered Markdown and CMS content in `.prose`.
- Keep paragraphs short and use headings every few paragraphs.
- Use `.quote` for quotes and `.code` for code inside prose.

## Don't
- Put buttons, cards or forms inside `.prose`; place them in `sections` next to it.
- Override `max-width` to fill a wide screen.
- Add classes to every paragraph; the wrapper styles them.

## Related
[Quote](quote.md) · [Citation](citation.md) · [Inline code](inline-code.md) · [Sections](sections.md)
