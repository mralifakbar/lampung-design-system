# Radio

Group: Selection. https://lampung.kartadinata.app/docs/en/components/radio

Native radio buttons for exactly one choice out of two to five options that should all be visible. The dot springs in; arrow keys move between options.

## Use it when
- One answer from a short list where seeing every option helps: delivery method, service session, answers in a satisfaction survey.
- Options are mutually exclusive and need a word or a line of explanation each.

## Use something else when
- Each option is a richer choice with a description, price or badge (plans, packages): use [Radio card](radio-card.md).
- More than about five options, or space is tight: use [Select](select.md).
- A long list people type to find: use [Combobox](combobox.md).
- Switching a view or setting that applies immediately (Day, Week, Month): use [Segmented control](segmented-control.md).
- Several options can be on at once: use [Checkbox](checkbox.md).
- A single on and off setting: use [Switch](switch.md).

## Where it goes
In a [form](form-layout.md), stacked in a column 12 px apart inside a `<fieldset>` with a `<legend>` that asks the question. Two short options may sit side by side on wide screens; stack them on phones.

## Anatomy
| Part | What it is |
|---|---|
| `fieldset + legend` | Required. The question ("Where should we send your results?"). |
| `label.check` | Required. One option; the whole row is the hit area. |
| `input[type=radio][name]` | Required. The native radio, invisible over the dot; one shared `name` per group. |
| `.radio__dot` | Required. The 22 px circle; checked fills accent with a white 8 px dot. `aria-hidden`. |
| `.check__text` | Required. The option text; a `small` inside adds a second line. |

## Markup

**Delivery method.** Click an option or focus the group and use the arrow keys. The dot springs in; the old one shrinks out faster.
```html
<fieldset class="stack" style="border: 0;">
  <legend class="field__label" style="margin-bottom: 12px;">Where should we send your results?</legend>
  <label class="check"><input type="radio" name="rd-del" checked><span class="radio__dot" aria-hidden="true"></span><span class="check__text">Email<small>siti@contoh.id</small></span></label>
  <label class="check"><input type="radio" name="rd-del"><span class="radio__dot" aria-hidden="true"></span><span class="check__text">Push notification<small>On the phone you signed in with</small></span></label>
  <label class="check"><input type="radio" name="rd-del"><span class="radio__dot" aria-hidden="true"></span><span class="check__text">Both</span></label>
</fieldset>
```

**Service session.** Session slots are radios: one answer, all visible, keyboard friendly. A full session is disabled and stays readable.
```html
<fieldset class="stack" style="border: 0; max-width: 520px;">
  <legend class="field__label" style="margin-bottom: 12px;">Which session for e-KTP recording at Kedaton district office?</legend>
  <label class="check"><input type="radio" name="rd-q"><span class="radio__dot" aria-hidden="true"></span><span class="check__text">Monday, 08:00</span></label>
  <label class="check"><input type="radio" name="rd-q"><span class="radio__dot" aria-hidden="true"></span><span class="check__text">Monday, 10:00</span></label>
  <label class="check"><input type="radio" name="rd-q" checked><span class="radio__dot" aria-hidden="true"></span><span class="check__text">Tuesday, 08:00</span></label>
  <label class="check"><input type="radio" name="rd-q" disabled><span class="radio__dot" aria-hidden="true"></span><span class="check__text">Tuesday, 10:00<small>Full</small></span></label>
</fieldset>
```

## States
| State | How |
|---|---|
| `checked` | Accent fill with the primary finish; white center dot. |
| `hover` | Edge darkens to `--text-subtle`. |
| `:active` | The dot sinks to 0.88 in 90 ms. |
| `focus-visible` | Focus ring around the dot. |
| `disabled` | Native `disabled`; style the text yourself only if needed. Say why in a second line. |

## Motion and microinteractions
- Selecting: the center dot scales 0 to 1 on `--spring-snappy` (360 ms); the fill and edge change in `--d-fast` (160 ms). The previous option shrinks its dot in `--d-exit` (180 ms) on `--ease-exit`, so the old choice is gone before the new one settles.
- Press: `scale(0.88)` in 90 ms, back on `--spring-snappy`.
- Reduced motion: transitions become 120 ms linear.

## Accessibility
- Real `<input type="radio">` with a shared `name`: Tab enters the group at the checked option, arrow keys move and select, Space selects.
- Wrap the group in `<fieldset>` with a `<legend>`; the question is read with each option.
- Preselect a sensible default when one exists, so the group never sits empty without reason; otherwise validate with an error under the group.

## Do
- Order options logically (frequency, size, time).
- Keep labels short and parallel; put detail in the `small` line.

## Don't
- Use radios for more than about five options.
- Make a single radio; one choice that can be undone is a [checkbox](checkbox.md).
- Lay several radios out in a wrapping row on phones.

## Related
[Radio card](radio-card.md) · [Checkbox](checkbox.md) · [Select](select.md) · [Segmented control](segmented-control.md)
