export default {
  title: 'Icon',
  group: 'Foundations',
  order: 5,
  summary: 'Icons are text: `<span class="ic" aria-hidden="true">search</span>`, drawn by a ligature font from the Solar set. Only names in `icons/icons.json` exist; any other name renders nothing, silently.',
  when: [
    'A label gains speed from a glyph people already know: search, add, download, calendar, settings.',
    'Inside components that expect one: a button before its label, an [icon button](icon-button), a list row, an alert, a badge, an [empty state](empty-state).',
    'A selected or filled state needs the bold style (`ic--fill`): a pressed toggle, a liked heart, a current tab.',
  ],
  whenNot: [
    ['A clickable icon with no text', 'icon-button', 'The bare `.ic` is decoration; the button gives it a 44 px target, a name and a tooltip.'],
    ['A small colored square that sets a row apart in a settings list', 'list', 'Use `.lrow--icon` with `.lrow__icon`.'],
    ['A person or organization', 'avatar'],
    ['A dot that says online, offline or live', 'status-dot'],
    ['An icon that changes meaning on press (copy to copied, play to pause)', 'icon-swap'],
  ],
  where: 'Before the text it explains, 6 to 10 px away (components set the gap). Icons follow `currentColor`, so they take the text color of their parent; muted icons use `--text-subtle` or `--text-muted`. On phones the same sizes hold; never scale icons down to fit.',
  anatomy: [
    ['.ic', 'Required. A `<span>` whose text is the icon name. 20 px, line style, `1em` square, never wraps.'],
    ['.ic--fill', 'The bold (filled) style from the second font, for selected and filled states.'],
    ['.ic--sm / .ic--lg', '16 px (dense rows, badges, small buttons) / 24 px (page headers, empty states).'],
    ['aria-hidden="true"', 'Required when there is visible text next to it, which is almost always.'],
  ],
  examples: [
    {
      title: 'Line and fill',
      desc: 'Line by default; the fill style marks something selected or on.',
      html: `<div class="docs-row" style="color: var(--text-strong);">
  <span class="ic" aria-hidden="true">star</span>
  <span class="ic ic--fill" aria-hidden="true" style="color: var(--warning);">star</span>
  <span class="ic" aria-hidden="true">bookmark</span>
  <span class="ic ic--fill" aria-hidden="true" style="color: var(--accent-text);">bookmark</span>
  <span class="ic" aria-hidden="true">notifications</span>
  <span class="ic ic--fill" aria-hidden="true">notifications</span>
</div>`,
    },
    {
      title: 'Sizes',
      desc: '16 for dense meta, 20 by default, 24 for headers. Inside components the size is already set (19 in buttons, 22 in icon buttons, 14 in badges).',
      html: `<div class="docs-row" style="color: var(--text-strong);">
  <span class="ic ic--sm" aria-hidden="true">calendar_month</span>
  <span class="ic" aria-hidden="true">calendar_month</span>
  <span class="ic ic--lg" aria-hidden="true">calendar_month</span>
</div>`,
    },
    {
      title: 'Next to text',
      desc: 'Decorative icons are hidden from screen readers; the words carry the meaning.',
      html: `<div class="docs-col" style="max-width: 420px;">
  <button class="btn btn--secondary"><span class="ic" aria-hidden="true">download</span>Download registration receipt</button>
  <span class="badge badge--success"><span class="ic" aria-hidden="true">check</span>Approved</span>
  <span class="field__help"><span class="ic" aria-hidden="true">info</span>Your permit is valid once the head of the agency signs it.</span>
</div>`,
    },
    {
      title: 'Standing alone',
      desc: 'When an icon is the only thing that says something (a status in a table cell), give it a role and a name instead of hiding it.',
      html: `<span class="ic ic--fill" role="img" aria-label="Verified" style="color: var(--success-text);">check_circle</span>`,
    },
  ],
  variants: [
    ['ic--fill', 'Bold style for selected, pressed and filled states. Pressed toggles, alert icons, list icon chips and file tile thumbnails switch to it automatically.'],
    ['ic--sm', '16 px.'],
    ['ic--lg', '24 px.'],
    ['style="color: …"', 'Only with tokens (`--text-subtle`, `--accent-text`, `--success-text`); never a raw hex.'],
  ],
  motion: [
    'Icons do not animate on their own. When one changes meaning, use [icon swap](icon-swap): the old glyph scales to 0.5 and blurs 4 px in `--d-fast` while the new one settles on `--spring-snappy` over `--d-snappy`.',
    'Chevrons that open something rotate 180 degrees on `--spring-smooth` (split button, tool call, accordion); that rotation belongs to the component.',
    'No spinning icons for loading: use the [spinner](spinner).',
  ],
  a11y: [
    'Decorative (next to text): `aria-hidden="true"`. This is the default; without it a screen reader reads the ligature name ("calendar_month").',
    'Meaningful and alone: `role="img"` and an `aria-label` in plain words.',
    'Icon-only controls are [icon buttons](icon-button) with an `aria-label`; the label goes on the button, not the span.',
    'Never rely on the icon color alone for status; pair it with words.',
  ],
  do: [
    'Check the name against `icons/icons.json` before using it.',
    'Pick icons for meaning; if none fits, use no icon.',
    'Use the fill style for "on", the line style for "off".',
  ],
  dont: [
    'Use an `<svg>` or an emoji where a system icon exists, or mix in another icon set.',
    'Invent names: `arrow_right`, `trash` and `user` render blank (the names are `arrow_forward`, `delete`, `person`).',
    'Decorate headings or "AI" features with sparkles or similar glyphs.',
  ],
  js: 'None. To add an icon: add `"my_name": "solar-base-name"` to `icons/icons.json` and run `npm run build:icons`.',
  related: ['icon-button', 'icon-swap', 'button', 'theming'],
};
