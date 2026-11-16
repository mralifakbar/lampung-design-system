export default {
  title: 'Code block',
  group: 'Data display',
  order: 15,
  summary: 'Preformatted code on the quiet fill with a bar for its name and a copy action. Three quiet token colors, horizontal scroll, no line wrapping.',
  when: [
    'Code, commands or configuration the reader copies: an install line, an API call, a snippet in documentation.',
    'Output a person needs to read exactly (a log excerpt, a generated key).',
  ],
  whenNot: [
    ['A short code word inside a sentence', 'inline-code'],
    ['A tool the assistant ran, with its input and output', 'tool-call'],
    ['A quotation from a source', 'quote'],
    ['Long-form text', 'prose'],
  ],
  where: 'In the reading column, full width of it, between paragraphs of [prose](prose) or under a section heading. On phones it keeps its width and scrolls sideways; it never wraps code.',
  anatomy: [
    ['.codeblock', 'Required. Quiet fill, 14 px radius, clips its content.'],
    ['.codeblock__bar', 'A 40 px bar with the file name or language on the left and a [copy button](copy-button) on the right.'],
    ['pre', 'Required. 12.5 px mono, 20 px line height, 14/16 px padding, scrolls horizontally.'],
    ['.k / .s / .c', 'Token colors: keys and keywords (accent), strings (success), comments (muted).'],
  ],
  examples: [
    {
      title: 'With a copy action',
      desc: 'The bar names the file; the copy button confirms in place.',
      stage: 'block',
      html: `<div class="codeblock" style="max-width: 560px;">
  <div class="codeblock__bar"><span>styles.css</span><button class="btn btn--plain btn--sm" data-lds-copy="@import 'lampung-design-system/css';"><span class="swap" style="width: 16px; height: 16px;" aria-hidden="true"><span class="ic swap__a" style="font-size: 16px;">content_copy</span><span class="ic swap__b" style="font-size: 16px;">check</span></span><span data-lds-copy-label="Copied">Copy</span></button></div>
  <pre><code>@import 'lampung-design-system/css';</code></pre>
</div>`,
    },
    {
      title: 'Highlighted tokens',
      desc: 'Wrap tokens yourself, or let a highlighter output the three classes.',
      stage: 'block',
      html: `<div class="codeblock" style="max-width: 560px;">
  <div class="codeblock__bar"><span>tokens.css</span></div>
  <pre><code><span class="c">/* one blue, used sparingly */</span>
<span class="k">--accent</span>: #2563EB;
<span class="k">--d-exit</span>: 180ms;
<span class="k">--font</span>: <span class="s">"Geist", system-ui, sans-serif</span>;</code></pre>
</div>`,
    },
  ],
  variants: [
    ['with bar', 'A name and a copy action. The default for anything copyable.'],
    ['without bar', 'Just `pre` inside `.codeblock`, for output to read.'],
  ],
  states: [
    ['copied', 'The copy button swaps its icon to `check` and its label to "Copied" for a moment ([copy button](copy-button)).'],
  ],
  motion: [
    'Only the copy button moves: the icon swap on `--spring-snappy`. The block itself is still.',
  ],
  a11y: [
    'Use `<pre><code>` so the content is announced as code and whitespace is kept.',
    'The copy button has a visible label ("Copy"); its confirmation changes the label text, which is announced when focus is on it.',
    'Token colors are not meaningful on their own; contrast stays at body level on the fill.',
    'Long lines scroll inside `pre`; make the block focusable (`tabindex="0"`) when it overflows so keyboard users can scroll it.',
  ],
  do: [
    'Name the file or the language in the bar.',
    'Keep snippets short and runnable.',
  ],
  dont: [
    'Wrap code lines or shrink the font to fit.',
    'Use a dark theme block inside the light theme.',
    'Show code as an image.',
  ],
  js: 'Optional. The copy button uses `data-lds-copy="text"` (see [copy button](copy-button)).',
  related: ['inline-code', 'copy-button', 'prose', 'tool-call'],
};
