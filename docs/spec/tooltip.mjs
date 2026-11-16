export default {
  title: 'Tooltip',
  group: 'Overlays',
  order: 9,
  summary: 'A short dark label above a control on hover or focus, after a 500 ms wait. Names icon buttons and shortcuts; with `.infotip` and `.tip--wide` it explains a term in a sentence or two. CSS only.',
  when: [
    'Naming an icon-only button and showing its shortcut ("Share", "Bold ⌘B").',
    'Explaining a term or a number next to a label with an info tip: what "Weighted score" means, why a field is required.',
  ],
  whenNot: [
    ['Content with links, buttons or fields inside', 'popover', 'Tooltips disappear when the pointer leaves; nothing inside can be clicked'],
    ['A preview of a person, course or link', 'hover-card'],
    ['Information people need to complete a task', 'text-field', 'Put it in the field help text, always visible'],
    ['Guiding people through a new feature', 'coachmark'],
    ['Confirming that something happened', 'toast'],
  ],
  where: 'Centered 8 px above its trigger. The trigger and the `.tip` sit together in a `.tip-host`. Keep room above it (the tip is about 30 px tall, more when wide). On touch devices there is no hover: never put essential information only in a tooltip.',
  anatomy: [
    ['.tip-host', 'Required. Inline wrapper that positions the tip and shows it on `:hover` or `:focus-within`.'],
    ['trigger', 'Required. A focusable control: an [icon button](icon-button), a button, or an `.infotip`.'],
    ['.tip[role=tooltip]', 'Required. The dark label, one line (`white-space: nowrap`), with an `id` the trigger references.'],
    ['.tip .kbd', 'A shortcut inside the label, outlined in the inverse colors.'],
    ['.tip--wide', 'Lets the tip wrap up to 260 px wide, left-aligned, for a sentence or two.'],
    ['button.infotip', 'A quiet 24 px (i) button next to a label; turns accent on hover and focus. Holds an `info` icon.'],
  ],
  examples: [
    {
      title: 'Naming icon buttons',
      desc: 'Hover or tab to a button: the label waits 500 ms, then rises in; it leaves at once.',
      html: `<div class="docs-row" style="padding-top: 24px;">
  <span class="tip-host"><button class="icon-btn icon-btn--filled" aria-label="Share" aria-describedby="tt-1"><span class="ic" aria-hidden="true">ios_share</span></button><span class="tip" role="tooltip" id="tt-1">Share</span></span>
  <span class="tip-host"><button class="icon-btn icon-btn--filled" aria-label="Bold" aria-describedby="tt-2"><span class="ic" aria-hidden="true">format_bold</span></button><span class="tip" role="tooltip" id="tt-2">Bold<span class="kbd">⌘B</span></span></span>
  <span class="tip-host"><button class="icon-btn icon-btn--filled" aria-label="Download" aria-describedby="tt-3"><span class="ic" aria-hidden="true">download</span></button><span class="tip" role="tooltip" id="tt-3">Download PDF</span></span>
</div>`,
    },
    {
      title: 'Info tip next to a label',
      desc: 'An `.infotip` explains a term in a wide tip. It is a real button, so keyboard and screen reader users reach it too.',
      html: `<div class="docs-row" style="padding-top: 72px;">
  <span class="field__label">Weighted score
    <span class="tip-host"><button class="infotip" type="button" aria-label="What is the weighted score?" aria-describedby="tt-w"><span class="ic" aria-hidden="true">info</span></button><span class="tip tip--wide" role="tooltip" id="tt-w">Each section counts by its weight: verbal 35 %, numeric 35 %, character 30 %.</span></span>
  </span>
  <span class="section__sub">412 of 550</span>
</div>`,
    },
  ],
  variants: [
    ['.tip', 'One line, for a name or a name and a shortcut.'],
    ['.tip--wide', 'Wraps to at most 260 px for one or two sentences.'],
    ['.tip--below', 'Opens under the trigger, for toolbars at the top edge of a pane or scroller where a tip above would be cut off.'],
    ['.infotip', 'The (i) trigger for an explanation next to a label or a number.'],
  ],
  states: [
    [':hover / :focus-within', 'Shown after 500 ms. Leaving hides it at once.'],
    ['.infotip:hover / :focus-visible', 'Icon turns accent on an accent tint.'],
  ],
  motion: [
    'In: waits 500 ms, then opacity over `--d-fast` (160 ms) on `--ease-enter` and from `translateY(4px) scale(0.97)` on `--spring-snappy` over `--d-snappy`.',
    'Out: 100 ms on `--ease-exit`, no delay, so tips never linger over what people are reading.',
    'Reduced motion: the delay stays, transitions drop to 120 ms linear.',
  ],
  a11y: [
    'The trigger must be focusable so the tip also shows on keyboard focus (`:focus-within`).',
    'An icon button still needs its own `aria-label`; the tip is visual. Link the tip with `aria-describedby` for extra description such as the shortcut or the explanation.',
    'The `.infotip` button gets an `aria-label` phrased as the question it answers.',
    'Tooltips are not reachable on touch; anything essential goes in visible text.',
    'There is no Escape-to-dismiss: tips hide when focus or the pointer leaves.',
  ],
  do: [
    'Use one to five words for a name; one or two sentences in a wide tip.',
    'Show the keyboard shortcut when there is one.',
  ],
  dont: [
    'Put links or buttons inside a tooltip.',
    'Add tooltips to buttons that already have a visible label saying the same thing.',
    'Use a tooltip for errors or required information.',
  ],
  related: ['icon-button', 'popover', 'hover-card', 'kbd'],
};
