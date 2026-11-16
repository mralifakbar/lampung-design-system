const rd = (name, text, sub, checked, extra = '') => `<label class="check"><input type="radio" name="${name}"${checked ? ' checked' : ''}${extra}><span class="radio__dot" aria-hidden="true"></span><span class="check__text">${text}${sub ? `<small>${sub}</small>` : ''}</span></label>`;

export default {
  title: 'Radio',
  group: 'Selection',
  order: 2,
  summary: 'Native radio buttons for exactly one choice out of two to five options that should all be visible. The dot springs in; arrow keys move between options.',
  when: [
    'One answer from a short list where seeing every option helps: delivery method, exam session, answer options in a question.',
    'Options are mutually exclusive and need a word or a line of explanation each.',
  ],
  whenNot: [
    ['Each option is a richer choice with a description, price or badge (plans, packages)', 'radio-card'],
    ['More than about five options, or space is tight', 'select'],
    ['A long list people type to find', 'combobox'],
    ['Switching a view or setting that applies immediately (Day, Week, Month)', 'segmented-control'],
    ['Several options can be on at once', 'checkbox'],
    ['A single on and off setting', 'switch'],
  ],
  where: 'In a [form](form-layout), stacked in a column 12 px apart inside a `<fieldset>` with a `<legend>` that asks the question. Two short options may sit side by side on wide screens; stack them on phones.',
  anatomy: [
    ['fieldset + legend', 'Required. The question ("Where should we send your results?").'],
    ['label.check', 'Required. One option; the whole row is the hit area.'],
    ['input[type=radio][name]', 'Required. The native radio, invisible over the dot; one shared `name` per group.'],
    ['.radio__dot', 'Required. The 22 px circle; checked fills accent with a white 8 px dot. `aria-hidden`.'],
    ['.check__text', 'Required. The option text; a `small` inside adds a second line.'],
  ],
  examples: [
    {
      title: 'Delivery method',
      desc: 'Click an option or focus the group and use the arrow keys. The dot springs in; the old one shrinks out faster.',
      html: `<fieldset class="stack" style="border: 0;">
  <legend class="field__label" style="margin-bottom: 12px;">Where should we send your results?</legend>
  ${rd('rd-del', 'Email', 'siti@campus.ac.id', true)}
  ${rd('rd-del', 'Push notification', 'On the phone you signed in with')}
  ${rd('rd-del', 'Both', '')}
</fieldset>`,
    },
    {
      title: 'Answer options in a question',
      desc: 'Exam answers are radios: one answer, all visible, keyboard friendly. A disabled option stays readable.',
      html: `<fieldset class="stack" style="border: 0; max-width: 520px;">
  <legend class="field__label" style="margin-bottom: 12px;">Which number continues the series 2, 6, 12, 20, …?</legend>
  ${rd('rd-q', 'A. 26', '')}
  ${rd('rd-q', 'B. 28', '')}
  ${rd('rd-q', 'C. 30', '', true)}
  ${rd('rd-q', 'D. 32', '', false, ' disabled')}
</fieldset>`,
    },
  ],
  states: [
    ['checked', 'Accent fill with the primary finish; white center dot.'],
    ['hover', 'Edge darkens to `--text-subtle`.'],
    [':active', 'The dot sinks to 0.88 in 90 ms.'],
    ['focus-visible', 'Focus ring around the dot.'],
    ['disabled', 'Native `disabled`; style the text yourself only if needed. Say why in a second line.'],
  ],
  motion: [
    'Selecting: the center dot scales 0 to 1 on `--spring-snappy` (360 ms); the fill and edge change in `--d-fast` (160 ms). The previous option shrinks its dot in `--d-exit` (180 ms) on `--ease-exit`, so the old choice is gone before the new one settles.',
    'Press: `scale(0.88)` in 90 ms, back on `--spring-snappy`.',
    'Reduced motion: transitions become 120 ms linear.',
  ],
  a11y: [
    'Real `<input type="radio">` with a shared `name`: Tab enters the group at the checked option, arrow keys move and select, Space selects.',
    'Wrap the group in `<fieldset>` with a `<legend>`; the question is read with each option.',
    'Preselect a sensible default when one exists, so the group never sits empty without reason; otherwise validate with an error under the group.',
  ],
  do: [
    'Order options logically (frequency, size, time).',
    'Keep labels short and parallel; put detail in the `small` line.',
  ],
  dont: [
    'Use radios for more than about five options.',
    'Make a single radio; one choice that can be undone is a [checkbox](checkbox).',
    'Lay several radios out in a wrapping row on phones.',
  ],
  related: ['radio-card', 'checkbox', 'select', 'segmented-control'],
};
