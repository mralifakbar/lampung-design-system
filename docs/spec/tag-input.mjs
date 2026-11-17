const tag = (t) => `<span class="tag">${t}<button type="button" aria-label="Remove ${t}" onclick="this.parentElement.remove()"><span class="ic" aria-hidden="true">close</span></button></span>`;

const ADD = `if ((event.key === 'Enter' || event.key === ',') && this.value.trim()) { event.preventDefault(); const t = document.createElement('span'); t.className = 'tag'; t.textContent = this.value.trim(); const b = document.createElement('button'); b.type = 'button'; b.setAttribute('aria-label', 'Remove ' + t.textContent); b.innerHTML = '&lt;span class=&quot;ic&quot; aria-hidden=&quot;true&quot;&gt;close&lt;/span&gt;'; b.onclick = () => t.remove(); t.append(b); this.before(t); this.value = ''; } else if (event.key === 'Backspace' && !this.value) { const last = this.previousElementSibling; if (last) last.remove(); }`;

export default {
  title: 'Tag input',
  group: 'Inputs',
  order: 10,
  summary: 'A field that turns typed text into removable tags: Enter or comma adds one, Backspace on an empty field removes the last. For several short free values.',
  when: [
    'People enter several short values that are not from a fixed list: keywords for a citizen report, areas of interest, emails to invite.',
    'The values are made up by the person, so a list of options cannot cover them.',
  ],
  whenNot: [
    ['Several choices from a short fixed set (days, subjects)', 'chips', 'All options visible, toggle with one tap'],
    ['Several choices from a long fixed list', 'checkbox', 'In a scrolling list or [sheet](sheet); the system has no multi-select combobox'],
    ['One value from a long list', 'combobox'],
    ['One line of text', 'text-field'],
    ['Showing tags or statuses that people do not edit', 'badge'],
  ],
  where: 'In a [form](form-layout), full width of its column, with a helper that states the limit. The control grows taller as tags wrap onto new lines.',
  anatomy: [
    ['.control.tags', 'Required. The field box, wraps its content and grows from 44 px.'],
    ['.tag', 'One value, 28 px, recessed fill, with its text and a remove button.'],
    ['.tag > button', 'Required per tag. 22 px remove button with a `close` icon and `aria-label="Remove …"`.'],
    ['input', 'Required. At least 120 px, takes the rest of the line. Named by the label.'],
  ],
  examples: [
    {
      title: 'Report keywords',
      desc: 'Type a keyword and press Enter or comma. Backspace in the empty field removes the last tag.',
      html: `<div class="field" style="max-width: 520px; width: 100%;">
  <label class="field__label" for="ti-in">Keywords for the report</label>
  <div class="control tags">${tag('Pothole')}${tag('Blocked drain')}${tag('Street light')}<input id="ti-in" placeholder="Add a keyword" enterkeyhint="enter" aria-describedby="ti-help" onkeydown="${ADD}"></div>
  <span class="field__help" id="ti-help">Up to 8 keywords. Press Enter after each one.</span>
</div>`,
      code: `<div class="field">
  <label class="field__label" for="topics">Keywords for the report</label>
  <div class="control tags">
    <span class="tag">Pothole<button type="button" aria-label="Remove Pothole"><span class="ic" aria-hidden="true">close</span></button></span>
    <span class="tag">Street light<button type="button" aria-label="Remove Street light"><span class="ic" aria-hidden="true">close</span></button></span>
    <input id="topics" placeholder="Add a keyword" aria-describedby="topics-help">
  </div>
  <span class="field__help" id="topics-help">Up to 8 keywords. Press Enter after each one.</span>
</div>
<!-- Your code: Enter or comma adds a .tag before the input; Backspace on an empty input removes the last; each tag's button removes it. -->`,
    },
    {
      title: 'Invite by email, with a rejected value',
      desc: 'Validate each value as it becomes a tag; keep the bad text in the input and explain.',
      html: `<div class="field" style="max-width: 520px; width: 100%;">
  <label class="field__label" for="ti-mail">Invite fellow officers</label>
  <div class="control tags is-invalid">${tag('rani@example.go.id')}${tag('dimas@example.go.id')}<input id="ti-mail" type="email" value="budi@example" aria-invalid="true" aria-describedby="ti-mail-help"></div>
  <span class="field__help field__help--error" id="ti-mail-help"><span class="ic" aria-hidden="true">error</span>budi@example is missing a domain, like budi@example.go.id.</span>
</div>`,
    },
  ],
  states: [
    ['focus', 'Accent edge and halo on the whole box (`:focus-within`), as any `.control`.'],
    ['.is-invalid', 'Danger edge when the typed value is rejected; the text stays in the input.'],
    ['at the limit', 'Disable the input and say so in the helper ("8 of 8 keywords").'],
    ['tag hover', 'The remove button tints on hover.'],
  ],
  motion: [
    'A new tag pops in with `lds-pop-in` (scale 0.6 to 1 with fade) on `--spring-snappy` (360 ms); the input slides along as the line reflows.',
    'Removing is immediate, with no exit animation, so Backspace can clear several tags quickly.',
    'Reduced motion: the pop becomes a 1 ms appearance.',
  ],
  a11y: [
    'The input is labelled by the field label; the helper says how to add (Enter) and the limit.',
    'Each remove button is a `<button type="button">` named "Remove Pothole". After removing, move focus back to the input.',
    'Announce adds and removes in an `aria-live="polite"` region if the list is long ("Street light added, 3 keywords").',
    'Enter must not submit the form while the input has text; prevent it only in that case.',
  ],
  do: [
    'Accept Enter, comma and paste of a comma-separated list.',
    'Trim spaces and ignore duplicates, saying so in the helper.',
  ],
  dont: [
    'Use tags for a fixed set of options; that is [chips](chips).',
    'Put pressed or colored states on tags; they are values, not filters.',
  ],
  js: 'None in the system. Add a `.tag` before the input on Enter or comma, remove the last on Backspace in an empty input, and wire each remove button, in your own code.',
  related: ['chips', 'combobox', 'text-field', 'badge'],
};
