# Select

Group: Inputs. Docs page: `docs/components/select.html`.

A field-shaped button that opens a list of options below it and shows the one chosen. For one choice from a fixed list too long to show as radios; if people need to type to find it, use a combobox.

## Use it when
- One value from a fixed list of about 6 to 30 options: education level, semester, exam category, province when the list is short.
- Space is tight, so the options cannot all be visible (a filter bar, a form row).
- Options need a second line of detail inside the list (`.select__text` with `small`).

## Use something else when
- Two to five options that fit on screen: use [Radio](radio.md). Visible options are faster to compare and need one tap.
- Each option needs a description, a price or a badge: use [Radio card](radio-card.md).
- Switching between views of the same content right now: use [Segmented control](segmented-control.md).
- A long list (cities, schools, more than about 30) or options from a server: use [Combobox](combobox.md). People type to find instead of scrolling.
- Several values at once: use [Chips](chips.md). Or [checkboxes](checkbox.md) in a form, or a [tag input](tag-input.md) for free values.
- A list of actions (Sort, Export, Delete): use [Dropdown menu](dropdown-menu.md). A select stores a value; a menu runs a command.
- Moving between sections or pages: use [Tabs](tabs.md). Or a [sidebar](sidebar.md) when there are many destinations.

## Where it goes
In a [form](form-layout.md) like a [text field](text-field.md), with a label above. In a filter bar on wide screens at a fixed width (about 220 px). The list opens in the page flow below the trigger, as wide as the trigger; on phones a list of more than about 8 options reads better in a [sheet](sheet.md).

## Anatomy
| Part | What it is |
|---|---|
| `.select` | Required. Positioned wrapper, full width of its column. `data-lds-select` for the plain HTML behavior. |
| `button.control.select-trigger` | Required. The 44 px field. `aria-haspopup="listbox"`, `aria-expanded`, named by the label (`aria-labelledby`). `.is-placeholder` while nothing is chosen. |
| `.select__value` | Required. The chosen label (or the placeholder), cut with an ellipsis when long. |
| `.ic (expand_more)` | Required. The chevron; it turns 180 degrees while open. A leading `.ic` before the value is optional. |
| `ul.menu.select__menu[role=listbox]` | Required. The list, up to 320 px (or half the viewport) tall, scrolls inside. |
| `li.menu__item[role=option]` | Required. One option with `data-value` and `aria-selected`; `.is-selected` marks the chosen one. Put `.select__text` with a `small` inside for a second line. |

## Markup

**Choose a level.** Click or press Enter, Space or Down to open; arrows move; Enter picks; Escape closes; typing jumps to the first option starting with the letters.
```html
<div class="field" style="max-width: 360px; width: 100%;">
  <span class="field__label" id="se-level">Education level</span>
  <div class="select" data-lds-select>
    <button type="button" class="control select-trigger is-placeholder" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="se-level"><span class="select__value">Choose a level</span><span class="ic" aria-hidden="true">expand_more</span></button>
    <ul class="menu select__menu" role="listbox" aria-labelledby="se-level">
      <li class="menu__item" role="option" aria-selected="false" data-value="d3"><span class="select__text">Diploma<small>D-III</small></span></li>
      <li class="menu__item" role="option" aria-selected="false" data-value="s1"><span class="select__text">Bachelor<small>S-1, D-IV</small></span></li>
      <li class="menu__item" role="option" aria-selected="false" data-value="s2"><span class="select__text">Master<small>S-2</small></span></li>
      <li class="menu__item" role="option" aria-selected="false" data-value="s3"><span class="select__text">Doctorate<small>S-3</small></span></li>
    </ul>
  </div>
</div>
```

**With an icon and a chosen value.** A filter bar select, chosen already. The check marks the selected row in the list.
```html
<div class="field" style="max-width: 260px; width: 100%;">
  <span class="field__label" id="se-sem">Semester</span>
  <div class="select" data-lds-select>
    <button type="button" class="control select-trigger" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="se-sem"><span class="ic" aria-hidden="true">calendar_month</span><span class="select__value">Odd 2026/2027</span><span class="ic" aria-hidden="true">expand_more</span></button>
    <ul class="menu select__menu" role="listbox" aria-labelledby="se-sem">
      <li class="menu__item is-selected" role="option" aria-selected="true" data-value="2026-1">Odd 2026/2027</li>
      <li class="menu__item" role="option" aria-selected="false" data-value="2025-2">Even 2025/2026</li>
      <li class="menu__item" role="option" aria-selected="false" data-value="2025-1">Odd 2025/2026</li>
      <li class="menu__item" role="option" aria-selected="false" data-value="2024-2">Even 2024/2025</li>
    </ul>
  </div>
</div>
```

**Required and missing.** The trigger is a `.control`, so the error state is the same as any field.
```html
<div class="field" style="max-width: 360px; width: 100%;">
  <span class="field__label" id="se-cat">Exam category</span>
  <div class="select" data-lds-select>
    <button type="button" class="control select-trigger is-placeholder is-invalid" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="se-cat" aria-invalid="true" aria-describedby="se-cat-help"><span class="select__value">Choose a category</span><span class="ic" aria-hidden="true">expand_more</span></button>
    <ul class="menu select__menu" role="listbox" aria-labelledby="se-cat">
      <li class="menu__item" role="option" aria-selected="false" data-value="twk">National insight test</li>
      <li class="menu__item" role="option" aria-selected="false" data-value="tiu">General aptitude test</li>
      <li class="menu__item" role="option" aria-selected="false" data-value="tkp">Personal character test</li>
    </ul>
  </div>
  <span class="field__help field__help--error" id="se-cat-help"><span class="ic" aria-hidden="true">error</span>Choose a category to see its question bank.</span>
</div>
```

## States
| State | How |
|---|---|
| `.is-placeholder` | Muted text until something is chosen; removed by the JS on the first pick. |
| `open (aria-expanded="true")` | Accent edge and halo stay on the trigger; the chevron points up; the menu gets `.is-open`. |
| `active option (.is-hover)` | The keyboard or pointer row; `aria-activedescendant` on the trigger follows it. |
| `selected (.is-selected + aria-selected)` | Fill background on the chosen row. |
| `.is-invalid + aria-invalid` | Danger edge, with `.field__help--error` below. |
| `disabled` | `disabled` on the button plus `.is-disabled` on it. |

## Motion and microinteractions
- The list grows out of the trigger: opacity in `--d-fast` (160 ms) on `--ease-enter` and `scale(0.96) translateY(-4px)` to rest on `--spring-smooth` (560 ms), origin top left.
- It closes faster than it opened: opacity and transform in `--d-exit` (180 ms) on `--ease-exit`, then `visibility` flips. Reopening mid-close reverses from where it is.
- The chevron rotates 180 degrees on `--spring-smooth`. Row highlight changes in 60 ms linear so arrowing feels immediate.
- Reduced motion: the menu fades in 120 ms linear without scale or travel.

## Accessibility
- The trigger is a `<button type="button">` (inside a form a bare button submits) with `aria-haspopup="listbox"`, `aria-expanded`, and a name from the visible label via `aria-labelledby`.
- Keys: Down, Up, Enter or Space open; Down and Up move; Home and End jump; Enter or Space picks; Escape closes and keeps focus on the trigger; Tab closes; typing letters jumps to the first match (700 ms buffer).
- The JS gives the listbox an id, sets `aria-controls` and moves `aria-activedescendant` on the trigger; options carry `aria-selected`.
- There is no native form value: on `lds:change` write the value into a hidden input, or read it from your state.

## Do
- Write a placeholder that says the action ("Choose a level"), and show a chosen default when one is clearly right.
- Order options in a way people expect (level, time, alphabet), not by database id.
- Use the second line (`small`) for codes or short detail, not for marketing copy.

## Don't
- Use a select for two or three options; show [radios](radio.md) or a [segmented control](segmented-control.md).
- Put actions or links in a listbox.
- Style a native `<select>` to look like this; use `.select` (the system does not style native selects).

## Behavior (plain HTML)
`data-lds-select` on `.select`: opens and closes the listbox, handles the keys above, closes on an outside pointer, writes the chosen label into `.select__value`, and fires `lds:change` with `{ value, label }` on the wrapper (value from `data-value`).

## React
```tsx
import { Select } from 'lampung-design-system/react';

<span className="field__label" id="level-label">Education level</span>
<Select
  labelledBy="level-label"
  value={level}
  onChange={setLevel}
  placeholder="Choose a level"
  options={[
    { value: 'd3', label: 'Diploma', sub: 'D-III' },
    { value: 's1', label: 'Bachelor', sub: 'S-1, D-IV' },
  ]}
/>
```

## Related
[Combobox](combobox.md) · [Radio card](radio-card.md) · [Segmented control](segmented-control.md) · [Dropdown menu](dropdown-menu.md)
