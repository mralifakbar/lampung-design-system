export default {
  title: 'Inline code',
  group: 'Content',
  order: 4,
  status: 'new',
  summary: 'A short piece of code, a file name, a key or a value inside a sentence: `<code class="code">student_id</code>`, monospace at 0.88 em on `--bg-recessed`.',
  when: [
    'Naming code, commands, file names, field names or exact values someone will type: `student_id`, `npm run build`, `grades.csv`.',
    'Showing a short code people copy by reading it (an enrolment key in instructions).',
  ],
  whenNot: [
    ['More than one line of code, or code people copy with a button', 'code-block'],
    ['A value people copy with one press', 'copy-button'],
    ['A keyboard shortcut', 'kbd'],
    ['A status word or category', 'badge'],
  ],
  where: 'Inline, inside running text, helper text, table cells and [prose](prose). It inherits the size of the text around it (0.88 em), so it works in body text and in footnotes alike. Long values wrap like words; avoid them in narrow phone columns.',
  anatomy: [
    ['code.code', 'Required. A `<code>` element. `--mono` at 0.88 em, `--text-strong` on `--bg-recessed`, 6 px radius, 1 px by 6 px padding.'],
  ],
  examples: [
    {
      title: 'In a sentence',
      desc: 'Field names and commands inside instructions.',
      stage: 'block',
      html: `<p class="measure" style="font: var(--type-body); color: var(--text-default);">Export your grades as <code class="code">grades.csv</code>, then make sure the first column is <code class="code">student_id</code>. Run <code class="code">npm run import</code> to load them.</p>`,
    },
    {
      title: 'In helper text',
      desc: 'It scales with the smaller text around it.',
      stage: 'block',
      html: `<div class="field" style="max-width: 360px;">
  <label class="field__label" for="ic-key">Enrolment key</label>
  <div class="control"><input id="ic-key" placeholder="DB-2026" aria-describedby="ic-key-help"></div>
  <span class="field__help" id="ic-key-help">Your lecturer shared it, for example <code class="code">DB-2026</code>.</span>
</div>`,
    },
  ],
  motion: ['None.'],
  a11y: [
    'Use the `<code>` element; screen readers can announce it as code and keep the exact characters.',
    'Do not rely on the monospace look alone to mark something as literal; say "type" or "enter" in the sentence.',
    'Contrast: `--text-strong` on `--bg-recessed` is well above 4.5:1 in both themes.',
  ],
  do: [
    'Use it for exact strings someone types or reads back.',
    'Keep it short; move anything longer to a [code block](code-block).',
  ],
  dont: [
    'Use it for emphasis or for product names.',
    'Put buttons or links inside it.',
  ],
  related: ['code-block', 'prose', 'kbd', 'copy-button'],
};
