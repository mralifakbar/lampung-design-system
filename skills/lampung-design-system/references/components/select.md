# Select

Group: Inputs. Docs page: `docs/components/select.html`.

A field-shaped button that opens a list of options below it and shows the one chosen. For one choice from a fixed list too long to show as radios; if people need to type to find it, use a combobox.

## Use it when
- One value from a fixed list of about 6 to 30 options: district (kecamatan), report period, complaint type, regency when the list is short.
- Space is tight, so the options cannot all be visible (a filter bar, a form row).
- Options need a second line of detail inside the list (`.select__text` with `small`).

## Use something else when
- Two to five options that fit on screen: use [Radio](radio.md). Visible options are faster to compare and need one tap.
- Each option needs a description, a price or a badge: use [Radio card](radio-card.md).
- Switching between views of the same content right now: use [Segmented control](segmented-control.md).
- A long list (villages, kelurahan, more than about 30) or options from a server: use [Combobox](combobox.md). People type to find instead of scrolling.
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

**Choose a district.** Click or press Enter, Space or Down to open; arrows move; Enter picks; Escape closes; typing jumps to the first option starting with the letters.
```html
<div class="field" style="max-width: 360px; width: 100%;">
  <span class="field__label" id="se-level">District (kecamatan)</span>
  <div class="select" data-lds-select>
    <button type="button" class="control select-trigger is-placeholder" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="se-level"><span class="select__value">Choose a district</span><span class="ic" aria-hidden="true">expand_more</span></button>
    <ul class="menu select__menu" role="listbox" aria-labelledby="se-level">
      <li class="menu__item" role="option" aria-selected="false" data-value="kedaton"><span class="select__text">Kedaton<small>Bandar Lampung</small></span></li>
      <li class="menu__item" role="option" aria-selected="false" data-value="way-halim"><span class="select__text">Way Halim<small>Bandar Lampung</small></span></li>
      <li class="menu__item" role="option" aria-selected="false" data-value="metro-pusat"><span class="select__text">Metro Pusat<small>Kota Metro</small></span></li>
      <li class="menu__item" role="option" aria-selected="false" data-value="pringsewu"><span class="select__text">Pringsewu<small>Kabupaten Pringsewu</small></span></li>
    </ul>
  </div>
</div>
```

**With an icon and a chosen value.** A filter bar select, chosen already. The check marks the selected row in the list.
```html
<div class="field" style="max-width: 260px; width: 100%;">
  <span class="field__label" id="se-sem">Report period</span>
  <div class="select" data-lds-select>
    <button type="button" class="control select-trigger" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="se-sem"><span class="ic" aria-hidden="true">calendar_month</span><span class="select__value">Q3 2026</span><span class="ic" aria-hidden="true">expand_more</span></button>
    <ul class="menu select__menu" role="listbox" aria-labelledby="se-sem">
      <li class="menu__item is-selected" role="option" aria-selected="true" data-value="2026-q3">Q3 2026</li>
      <li class="menu__item" role="option" aria-selected="false" data-value="2026-q2">Q2 2026</li>
      <li class="menu__item" role="option" aria-selected="false" data-value="2026-q1">Q1 2026</li>
      <li class="menu__item" role="option" aria-selected="false" data-value="2025-q4">Q4 2025</li>
    </ul>
  </div>
</div>
```

**Required and missing.** The trigger is a `.control`, so the error state is the same as any field.
```html
<div class="field" style="max-width: 360px; width: 100%;">
  <span class="field__label" id="se-cat">Complaint type</span>
  <div class="select" data-lds-select>
    <button type="button" class="control select-trigger is-placeholder is-invalid" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="se-cat" aria-invalid="true" aria-describedby="se-cat-help"><span class="select__value">Choose a type</span><span class="ic" aria-hidden="true">expand_more</span></button>
    <ul class="menu select__menu" role="listbox" aria-labelledby="se-cat">
      <li class="menu__item" role="option" aria-selected="false" data-value="jalan">Damaged road</li>
      <li class="menu__item" role="option" aria-selected="false" data-value="lampu">Street light out</li>
      <li class="menu__item" role="option" aria-selected="false" data-value="sampah">Uncollected rubbish</li>
    </ul>
  </div>
  <span class="field__help field__help--error" id="se-cat-help"><span class="ic" aria-hidden="true">error</span>Choose a complaint type so the report reaches the right agency.</span>
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
- Write a placeholder that says the action ("Choose a district"), and show a chosen default when one is clearly right.
- Order options in a way people expect (alphabet, time, region), not by database id.
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

<span className="field__label" id="level-label">District (kecamatan)</span>
<Select
  labelledBy="level-label"
  value={level}
  onChange={setLevel}
  placeholder="Choose a district"
  options={[
    { value: 'kedaton', label: 'Kedaton', sub: 'Bandar Lampung' },
    { value: 'way-halim', label: 'Way Halim', sub: 'Bandar Lampung' },
  ]}
/>
```

## Related
[Combobox](combobox.md) · [Radio card](radio-card.md) · [Segmented control](segmented-control.md) · [Dropdown menu](dropdown-menu.md)
