const swap = `<span class="swap" aria-hidden="true" style="width: 16px; height: 16px;"><span class="ic ic--sm swap__a">content_copy</span><span class="ic ic--sm swap__b" style="color: var(--success-text);">check</span></span>`;

export default {
  title: 'Copy button',
  group: 'Actions',
  order: 8,
  summary: 'A button that copies a value to the clipboard and confirms in place: the copy icon blurs into a check and the label says "Copied" for 1.6 s. One attribute, `data-lds-copy`, holds the text.',
  when: [
    'A value people paste somewhere else: an application number, a tracking link, a payment reference (kode bayar), an API key, a code sample.',
    'Next to a read-only field or code block whose content is hard to select by hand on a phone.',
  ],
  whenNot: [
    ['Sharing a page through the system share sheet or to an app', 'button', 'Use a button with `ios_share` that calls `navigator.share`.'],
    ['A block of code with a header bar', 'code-block', 'It has its own copy button in `.codeblock__bar`; use this pattern there.'],
    ['Confirming an action that changed data (saved, sent)', 'toast'],
    ['Changing any icon to show a new state (play to pause)', 'icon-swap'],
  ],
  where: 'At the end of the value it copies: inside the field (`control` with the button last), in a code block bar, or after an inline value in a key-value row. On phones keep the label visible; an icon-only copy button is easy to miss.',
  anatomy: [
    ['button[data-lds-copy]', 'Required. The text to copy is the attribute value. Usually `btn btn--gray btn--sm` or `icon-btn`.'],
    ['.swap', 'Required for the icon change. Holds `.swap__a` (content_copy) and `.swap__b` (check); `.is-swapped` is added for 1.6 s.'],
    ['[data-lds-copy-label]', 'Optional. A span whose text becomes the attribute value ("Copied") for 1.6 s, then returns.'],
  ],
  examples: [
    {
      title: 'Inside a field',
      desc: 'Press Copy: the icon blurs into a check and the label changes, then both return.',
      html: `<div class="control" style="width: 380px; max-width: 100%; padding-right: 6px;">
  <span style="flex: 1; min-width: 0; font: 400 14px/1 var(--mono); color: var(--text-default); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">IZIN-7Q4K-2026</span>
  <button type="button" class="btn btn--gray btn--sm" data-lds-copy="IZIN-7Q4K-2026" style="min-width: 84px;">${swap}<span data-lds-copy-label="Copied" aria-live="polite">Copy</span></button>
</div>`,
    },
    {
      title: 'Icon only',
      desc: 'Where space is tight (a message action row). The name stays "Copy message"; a hidden live span announces "Copied".',
      html: `<div class="docs-row">
  <span class="tip-host"><button type="button" class="icon-btn" aria-label="Copy message" data-lds-copy="Counter 3, 09:00. Bring your original KTP."><span class="swap" aria-hidden="true"><span class="ic swap__a">content_copy</span><span class="ic swap__b" style="color: var(--success-text);">check</span></span><span class="sr-only" data-lds-copy-label="Copied" aria-live="polite"></span></button><span class="tip" role="tooltip">Copy message</span></span>
</div>`,
    },
  ],
  states: [
    ['rest', '`content_copy` icon, label "Copy".'],
    ['copied', '`.swap.is-swapped` and the label text from `data-lds-copy-label`, for 1.6 s; then both return on their own.'],
    ['blocked clipboard', 'The write fails silently and the button still confirms. If copying matters, check `navigator.clipboard` first and select the text instead.'],
  ],
  motion: [
    'Icon swap: the copy glyph scales to 0.5, blurs 4 px and fades in `--d-fast`; the check arrives from the same values on `--spring-snappy` over `--d-snappy`. Both glyphs sit in one grid cell, so nothing shifts.',
    'The label changes without motion; give the button a `min-width` so "Copied" does not change its width.',
    'Clicking again during the 1.6 s restarts nothing visible; the transitions are interruptible.',
    'Under reduced motion the swap is a 120 ms cross-fade without blur or scale.',
  ],
  a11y: [
    'A `<button type="button">`. With a visible label its name is the label; icon-only it needs `aria-label="Copy …"` naming what is copied.',
    'Announce the result: put `aria-live="polite"` on the `data-lds-copy-label` span so "Copied" is read. For icon-only buttons use an empty `sr-only` span with `data-lds-copy-label`.',
    'The `.swap` is `aria-hidden="true"`; its icons say nothing to screen readers.',
  ],
  do: [
    'Show the value next to the button so people know what they copy.',
    'Keep the width fixed between "Copy" and "Copied".',
    'Use a monospace font for codes and keys.',
  ],
  dont: [
    'Copy something different from what is shown.',
    'Show a toast as well as the in-place change.',
    'Leave the button saying "Copied" permanently.',
  ],
  js: '`data-lds-copy="text"` on the button; `init()` writes the text to the clipboard on click, adds `.is-swapped` to a `.swap` inside, sets any `[data-lds-copy-label]` span to its attribute value (default "Copied"), and restores both after 1.6 s.',
  related: ['icon-swap', 'code-block', 'button', 'icon-button'],
};
