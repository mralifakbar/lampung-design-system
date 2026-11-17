# Switch

Group: Selection. Docs page: `docs/components/switch.html`.

An on and off control for a setting that applies the moment it is flipped, with no Save button. The thumb stretches while held and travels on a spring.

## Use it when
- A setting that takes effect immediately: notifications, sounds, dark mode, show the queue number on the lock screen.
- Settings lists on phones (a small switch at the end of a list row).
- Turning a feature on with a short explanation under the label (`.switch__text` with `small`).

## Use something else when
- A choice saved later with a form: use [Checkbox](checkbox.md). Switches imply instant effect.
- Choosing between two named states (Light, Dark; List, Grid): use [Segmented control](segmented-control.md).
- A pressed state on a toolbar button (bold, mute): use [Toggle](toggle.md).
- Agreeing to terms: use [Checkbox](checkbox.md).
- Several filters that apply together: use [Chips](chips.md).

## Where it goes
In settings: one per line in a column, or at the end of a `.lrow` in an inset [list](list.md) on phones (use `switch--sm` there). On wide screens keep the label close to the switch; never put the switch at the far right of a very wide row with the label at the far left.

## Anatomy
| Part | What it is |
|---|---|
| `label.switch` | Required. Wraps the input, the track and the text; the whole row toggles. A `<span class="switch">` when the row (`label.lrow`) is the label. |
| `input[type=checkbox][role=switch]` | Required. The native checkbox announced as a switch, invisible over the track. |
| `.switch__track` | Required. 51 by 31, gray when off, accent when on. `aria-hidden`. |
| `.switch__thumb` | Required. The 27 px white thumb inside the track. |
| `.switch__text` | Optional. Label text with a `small` second line that explains the effect. |

## Markup

**With an explanation.** Press and hold: the thumb widens toward where it will go, then travels on the smooth spring and stretches once as it lands.
```html
<div class="stack" style="--gap: 16px;">
  <label class="switch"><input type="checkbox" role="switch" checked><span class="switch__track" aria-hidden="true"><span class="switch__thumb"></span></span><span class="switch__text">Service appointment reminders<small>15 minutes before your appointment</small></span></label>
  <label class="switch"><input type="checkbox" role="switch"><span class="switch__track" aria-hidden="true"><span class="switch__thumb"></span></span><span class="switch__text">Show the queue number on the lock screen<small>Hide it if you share your phone</small></span></label>
  <label class="switch"><input type="checkbox" role="switch" disabled><span class="switch__track" aria-hidden="true"><span class="switch__thumb"></span></span><span class="switch__text">Sync with the office calendar<small>Ask your agency admin to enable it</small></span></label>
</div>
```

**Settings rows on a phone.** The list row is the label, so tapping anywhere on it flips the small switch at the end.
```html
<div class="list list--fill" style="max-width: 380px; width: 100%;">
  <label class="lrow lrow--icon"><span class="lrow__icon" style="background: var(--tile-red);"><span class="ic" aria-hidden="true">notifications</span></span><span class="lrow__body"><span class="lrow__title">Appointment reminders</span></span><span class="switch switch--sm"><input type="checkbox" role="switch" checked><span class="switch__track" aria-hidden="true"><span class="switch__thumb"></span></span></span></label>
  <label class="lrow lrow--icon"><span class="lrow__icon" style="background: var(--tile-blue);"><span class="ic" aria-hidden="true">touch_app</span></span><span class="lrow__body"><span class="lrow__title">Haptic feedback</span></span><span class="switch switch--sm"><input type="checkbox" role="switch"><span class="switch__track" aria-hidden="true"><span class="switch__thumb"></span></span></span></label>
</div>
```

## Variants and sizes
| Class or attribute | When |
|---|---|
| `switch (default)` | 51 by 31, for settings pages and forms. |
| `switch--sm` | 38 by 23, for list rows and dense panels. |

## States
| State | How |
|---|---|
| `on (checked)` | Accent track (fades in over the gray), thumb moved right. |
| `:active (held)` | The thumb widens by 6 px (4 px small) toward its destination. |
| `.is-flip` | Added by the JS on every change: the thumb stretches once as it lands. |
| `focus-visible` | Focus ring around the track. |
| `disabled` | Track at 40 % opacity; say why in the `small` line. |

## Motion and microinteractions
- Travel: the thumb moves with `transform` on `--spring-smooth` (560 ms); the accent layer fades in `--d-standard` (240 ms) on `--ease-standard`, the track color in `--d-fast`.
- Hold: width grows by 6 px on `--spring-snappy` (360 ms); releasing mid-travel retargets from where it is.
- Landing: `lds-stretch` scales the thumb to 1.16 by 0.94 and back in 340 ms on `--ease-standard`, whatever changed it (tap, key, label click, code).
- With a bell icon inside the label, it rings once when turned on ([bell](bell.md)).
- Reduced motion: transitions become 120 ms linear and the stretch is skipped.

## Accessibility
- `<input type="checkbox" role="switch">` is announced as "switch, on" or "off"; Space toggles. Never build a switch from a `div`.
- The visible text is the name. In a list row, the `label.lrow` is the label for the input inside it.
- The change applies at once; if it can fail (a server call), revert the switch and explain in a [toast](toast.md).

## Do
- Label the setting, not the action: "Appointment reminders", not "Turn on reminders".
- Apply immediately and show the result when it is not obvious.

## Don't
- Put switches in a form that has a Save button.
- Change the label text with the state ("On" or "Off"); the switch shows that.
- Use a switch for two named options; use a [segmented control](segmented-control.md).

## Behavior (plain HTML)
Automatic for every `.switch input`: on change it adds `.is-flip` for the landing stretch (and rings a `.bell` inside when turned on). No `data-lds-*` needed.

## React
```tsx
import { Switch } from 'lampung-design-system/react';

<Switch checked={reminders} onChange={setReminders} sub="15 minutes before your appointment">
  Appointment reminders
</Switch>
<Switch size="sm" checked={haptics} onChange={setHaptics}>Haptic feedback</Switch>
```

## Related
[Checkbox](checkbox.md) · [Segmented control](segmented-control.md) · [Toggle](toggle.md) · [List](list.md)
