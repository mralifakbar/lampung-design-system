# Inline code

Group: Content. Docs page: `docs/components/inline-code.html`.

A short piece of code, a file name, a key or a value inside a sentence: `<code class="code">report_id</code>`, monospace at 0.88 em on `--bg-recessed`.

## Use it when
- Naming code, commands, file names, field names or exact values someone will type: `report_id`, `npm run build`, `pengaduan.csv`.
- Showing a short code people copy by reading it (a booking code in instructions).

## Use something else when
- More than one line of code, or code people copy with a button: use [Code block](code-block.md).
- A value people copy with one press: use [Copy button](copy-button.md).
- A keyboard shortcut: use [Keyboard key](kbd.md).
- A status word or category: use [Badge](badge.md).

## Where it goes
Inline, inside running text, helper text, table cells and [prose](prose.md). It inherits the size of the text around it (0.88 em), so it works in body text and in footnotes alike. Long values wrap like words; avoid them in narrow phone columns.

## Anatomy
| Part | What it is |
|---|---|
| `code.code` | Required. A `<code>` element. `--mono` at 0.88 em, `--text-strong` on `--bg-recessed`, 6 px radius, 1 px by 6 px padding. |

## Markup

**In a sentence.** Field names and commands inside instructions.
```html
<p class="measure" style="font: var(--type-body); color: var(--text-default);">Export the citizen reports as <code class="code">pengaduan.csv</code>, then make sure the first column is <code class="code">report_id</code>. Run <code class="code">npm run import</code> to load them.</p>
```

**In helper text.** It scales with the smaller text around it.
```html
<div class="field" style="max-width: 360px;">
  <label class="field__label" for="ic-key">Samsat booking code</label>
  <div class="control"><input id="ic-key" placeholder="SMS-0412" aria-describedby="ic-key-help"></div>
  <span class="field__help" id="ic-key-help">It is in the confirmation SMS, for example <code class="code">SMS-0412</code>.</span>
</div>
```

## Motion and microinteractions
- None.

## Accessibility
- Use the `<code>` element; screen readers can announce it as code and keep the exact characters.
- Do not rely on the monospace look alone to mark something as literal; say "type" or "enter" in the sentence.
- Contrast: `--text-strong` on `--bg-recessed` is well above 4.5:1 in both themes.

## Do
- Use it for exact strings someone types or reads back.
- Keep it short; move anything longer to a [code block](code-block.md).

## Don't
- Use it for emphasis or for product names.
- Put buttons or links inside it.

## Related
[Code block](code-block.md) · [Prose](prose.md) · [Keyboard key](kbd.md) · [Copy button](copy-button.md)
