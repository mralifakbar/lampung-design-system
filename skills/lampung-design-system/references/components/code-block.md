# Code block

Group: Data display. Docs page: `docs/components/code-block.html`.

Preformatted code on the quiet fill with a bar for its name and a copy action. Three quiet token colors, horizontal scroll, no line wrapping.

## Use it when
- Code, commands or configuration the reader copies: an install line, an API call, a snippet in documentation.
- Output a person needs to read exactly (a log excerpt, a generated key).

## Use something else when
- A short code word inside a sentence: use [Inline code](inline-code.md).
- A tool the assistant ran, with its input and output: use [Tool call](tool-call.md).
- A quotation from a source: use [Quote](quote.md).
- Long-form text: use [Prose](prose.md).

## Where it goes
In the reading column, full width of it, between paragraphs of [prose](prose.md) or under a section heading. On phones it keeps its width and scrolls sideways; it never wraps code.

## Anatomy
| Part | What it is |
|---|---|
| `.codeblock` | Required. Quiet fill, 14 px radius, clips its content. |
| `.codeblock__bar` | A 40 px bar with the file name or language on the left and a [copy button](copy-button.md) on the right. |
| `pre` | Required. 12.5 px mono, 20 px line height, 14/16 px padding, scrolls horizontally. |
| `.k / .s / .c` | Token colors: keys and keywords (accent), strings (success), comments (muted). |

## Markup

**With a copy action.** The bar names the file; the copy button confirms in place.
```html
<div class="codeblock" style="max-width: 560px;">
  <div class="codeblock__bar"><span>styles.css</span><button class="btn btn--plain btn--sm" data-lds-copy="@import 'lampung-design-system/css';"><span class="swap" style="width: 16px; height: 16px;" aria-hidden="true"><span class="ic swap__a" style="font-size: 16px;">content_copy</span><span class="ic swap__b" style="font-size: 16px;">check</span></span><span data-lds-copy-label="Copied">Copy</span></button></div>
  <pre><code>@import 'lampung-design-system/css';</code></pre>
</div>
```

**Highlighted tokens.** Wrap tokens yourself, or let a highlighter output the three classes.
```html
<div class="codeblock" style="max-width: 560px;">
  <div class="codeblock__bar"><span>tokens.css</span></div>
  <pre><code><span class="c">/* one green, used sparingly */</span>
<span class="k">--accent</span>: #0B6E4F;
<span class="k">--d-exit</span>: 180ms;
<span class="k">--font</span>: <span class="s">"Geist", system-ui, sans-serif</span>;</code></pre>
</div>
```

## Variants and sizes
| Class or attribute | When |
|---|---|
| `with bar` | A name and a copy action. The default for anything copyable. |
| `without bar` | Just `pre` inside `.codeblock`, for output to read. |

## States
| State | How |
|---|---|
| `copied` | The copy button swaps its icon to `check` and its label to "Copied" for a moment ([copy button](copy-button.md)). |

## Motion and microinteractions
- Only the copy button moves: the icon swap on `--spring-snappy`. The block itself is still.

## Accessibility
- Use `<pre><code>` so the content is announced as code and whitespace is kept.
- The copy button has a visible label ("Copy"); its confirmation changes the label text, which is announced when focus is on it.
- Token colors are not meaningful on their own; contrast stays at body level on the fill.
- Long lines scroll inside `pre`; make the block focusable (`tabindex="0"`) when it overflows so keyboard users can scroll it.

## Do
- Name the file or the language in the bar.
- Keep snippets short and runnable.

## Don't
- Wrap code lines or shrink the font to fit.
- Use a dark theme block inside the light theme.
- Show code as an image.

## Behavior (plain HTML)
Optional. The copy button uses `data-lds-copy="text"` (see [copy button](copy-button.md)).

## Related
[Inline code](inline-code.md) · [Copy button](copy-button.md) · [Prose](prose.md) · [Tool call](tool-call.md)
