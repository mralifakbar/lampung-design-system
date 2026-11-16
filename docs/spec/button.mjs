export default {
  title: 'Button',
  group: 'Actions',
  order: 1,
  summary: 'The control people press to make something happen: save, send, start, delete. One primary per view; the label names the outcome.',
  when: [
    'An action happens on this page or in this form: submit, save, start a task, open a dialog.',
    'You need a loading state that keeps the width while the action runs (`.is-loading` with `btn__label` and `btn__spin`).',
  ],
  whenNot: [
    ['Going to another page with no side effect', 'link', 'A link is announced as navigation and opens in a new tab on middle click'],
    ['The control only shows an icon', 'icon-button'],
    ['Turning a setting on or off that applies at once', 'switch'],
    ['Picking one view of the same content', 'segmented-control'],
    ['A costly but not dangerous confirm (submit an exam, send payment)', 'hold-to-confirm'],
  ],
  where: 'At the end of the thing it acts on: under a form (`form__actions`), at the bottom of a dialog (`dialog__actions`), in a card footer, or in a sticky bar on phones. The primary sits on the right on wide screens and on top (full width) on phones.',
  anatomy: [
    ['.btn', 'Required. The `<button>` (or `<a>` styled as one when it navigates). 44 px tall by default.'],
    ['.btn--primary|secondary|…', 'Required. One variant class; it sets color and finish.'],
    ['.ic', 'Optional leading icon, 19 px, before the label.'],
    ['.btn__label', 'Wraps the text when the button can load, so the text can blur out without changing width.'],
    ['.btn__spin', 'The spinner shown while `.is-loading` is on. Holds a `.spinner` with eight `<i>`.'],
  ],
  examples: [
    {
      title: 'Variants',
      desc: 'Primary once per view; secondary for the alternative; tinted for a quiet positive; plain for inline and tertiary actions; danger only inside a confirm.',
      html: `<div class="docs-row">
  <button class="btn btn--primary">Save changes</button>
  <button class="btn btn--secondary">Preview</button>
  <button class="btn btn--tinted">Add a note</button>
  <button class="btn btn--gray">Duplicate</button>
  <button class="btn btn--plain">Skip for now</button>
  <button class="btn btn--danger-tinted">Remove member</button>
</div>`,
    },
    {
      title: 'Sizes and icons',
      desc: '52 for the one big call to action on a landing page, 44 by default, 36 in toolbars and dense rows, 28 inside rows and chips. Small sizes keep a 44 px hit area through the space around them.',
      html: `<div class="docs-row">
  <button class="btn btn--primary btn--lg"><span class="ic" aria-hidden="true">play_arrow</span>Start the tryout</button>
  <button class="btn btn--secondary"><span class="ic" aria-hidden="true">add</span>Add course</button>
  <button class="btn btn--secondary btn--md"><span class="ic" aria-hidden="true">download</span>Export</button>
  <button class="btn btn--plain btn--sm">Edit</button>
</div>`,
    },
    {
      title: 'Loading without a jump',
      desc: 'The label blurs out, the spinner scales in, the width stays. Press it.',
      html: `<button class="btn btn--primary" onclick="this.classList.add('is-loading'); this.setAttribute('aria-busy','true'); setTimeout(() => { this.classList.remove('is-loading'); this.removeAttribute('aria-busy'); }, 1600)">
  <span class="btn__label"><span class="ic" aria-hidden="true">check</span>Submit answers</span>
  <span class="btn__spin" aria-hidden="true"><span class="spinner"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span></span>
</button>`,
      code: `<button class="btn btn--primary is-loading" aria-busy="true">
  <span class="btn__label">Submit answers</span>
  <span class="btn__spin" aria-hidden="true"><span class="spinner"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span></span>
</button>`,
    },
    {
      title: 'Disabled',
      desc: 'Prefer an enabled button that explains what is missing when pressed. Disable only when the reason is visible next to it.',
      html: `<div class="docs-col" style="max-width: 360px;">
  <button class="btn btn--primary" disabled>Send report</button>
  <span class="field__help">Choose what kind of mistake it is to send the report.</span>
</div>`,
    },
  ],
  variants: [
    ['btn--primary', 'The main action of the view. Exactly one.'],
    ['btn--secondary', 'The alternative next to the primary (Cancel, Preview, Back).'],
    ['btn--tinted', 'A quiet positive action that should not compete with the primary.'],
    ['btn--gray', 'Neutral utility actions in toolbars.'],
    ['btn--plain', 'Inline and tertiary actions; text only, accent color.'],
    ['btn--danger', 'The confirm button inside a destructive [alert dialog](alert-dialog) only.'],
    ['btn--danger-tinted', 'A destructive action that still asks for confirmation afterwards.'],
    ['btn--lg / btn--md / btn--sm', '52 / 36 / 28 px. Default is 44.'],
    ['btn--block', 'Full width; the default for the primary in phone layouts and sheets.'],
  ],
  states: [
    ['hover', 'Automatic; only on devices that can hover.'],
    [':active', 'Sinks to 97 % in 90 ms and springs back on release.'],
    ['.is-loading + aria-busy', 'Label out, spinner in, width kept; clicks ignored. `setLoading(btn, true)` in plain HTML.'],
    ['disabled / aria-disabled', '38 % opacity, no finish, not clickable.'],
    ['.is-done', 'The label rises in once after a success (pair with a toast or a text morph).'],
  ],
  motion: [
    'Press: `transform: scale(0.97)` on `:active` in 90 ms, back on `--spring-snappy`. Feedback starts on pointer down, not on release.',
    'Loading: the label leaves with a 4 px blur in `--d-fast`; the spinner scales from 0.6 on `--spring-snappy`. Both are transitions, so turning loading off mid-way reverses smoothly.',
    'Below 560 px a long label wraps onto two lines instead of pushing the layout sideways (`--sm` stays on one line).',
    'For "Saved" after "Save", change the text with [text morph](text-morph) instead of swapping the button.',
  ],
  a11y: [
    'Use `<button type="button">` for actions and `<button type="submit">` in forms; use `<a href>` only to navigate.',
    'Icon-only buttons are [icon buttons](icon-button) with an `aria-label`.',
    'While loading set `aria-busy="true"`; announce the result with a [toast](toast) or inline text.',
    'The focus ring comes from the system (`:focus-visible`); never remove it.',
  ],
  do: [
    'Name the outcome: "Save changes", "Send report", "Start the tryout".',
    'Keep one primary per view; demote the rest to secondary, tinted or plain.',
    'Make the primary full width in phone layouts (`btn--block`).',
  ],
  dont: [
    'Write "Submit", "OK", "Click here" or "Continue" when a specific verb exists.',
    'Restyle a button with a custom class (rounded pill, gradient, shadow). Pick a variant.',
    'Use `btn--danger` outside a confirm, or two primaries side by side.',
  ],
  js: 'Optional. `setLoading(button, true|false)` toggles the loading state and `aria-busy`.',
  react: `import { ButtonContent } from 'lampung-design-system/react';

<button className={\`btn btn--primary\${saving ? ' is-loading' : ''}\`} aria-busy={saving} onClick={save}>
  <ButtonContent loading={saving}>Save changes</ButtonContent>
</button>`,
  related: ['icon-button', 'link', 'hold-to-confirm', 'text-morph'],
};
