# Tabs

Group: Navigation. Docs page: `docs/components/tabs.html`.

Underlined tabs that switch between sibling sections of one page, each with its own panel. One ink line glides to the selected tab.

## Use it when
- One record or page has sibling sections people visit one at a time: Overview, Assignments, Materials, Discussion.
- The sections hold different kinds of content, so each needs its own panel.
- Four or more sections, or long labels: start-aligned tabs (`.tabs--start`) sized to their labels.

## Use something else when
- Switching between two to five views or filters of the same content (Week, Month; All, Unread): use [Segmented control](segmented-control.md). Tabs swap sections; a segmented control changes a value.
- Moving between pages of the app: use [App shell](app-shell.md).
- A fixed sequence people must go through in order: use [Steps](steps.md).
- Content people may want to read several sections of at once: use [Accordion](accordion.md).
- Destinations at the bottom of a phone screen: use [Phone bars](phone-bars.md).

## Where it goes
Directly under the [page header](page-header.md) of the thing they divide, full width of the content column, with the panel right below. On phones keep them under the title; if the labels do not fit, use `.tabs--start` inside a horizontal scroll rather than shrinking the text.

## Anatomy
| Part | What it is |
|---|---|
| `.tabs[role=tablist]` | Required. The row, with `aria-label`; a hairline runs along its bottom. Tabs share the width equally. |
| `.tabs__ink` | The 2 px line under the selected tab. First child; one per row. |
| `.tabs__btn[role=tab]` | Required. A tab: `aria-selected`, `aria-controls` the panel id. |
| `.tabs__count` | Optional count pill after the label, only when the number helps decide where to go. |
| `.tab-panel[role=tabpanel]` | Required. One per tab, with the matching `id`; inactive ones are `hidden`. Rises in with a short blur. |

## Markup

**Course sections.** Equal-width tabs with a count. Click or use the arrow keys: the ink glides and the new panel rises in.
```html
<div class="tabs" role="tablist" aria-label="Course sections" data-lds-tabs>
  <span class="tabs__ink" aria-hidden="true"></span>
  <button class="tabs__btn" role="tab" aria-selected="true" aria-controls="tb-p1" id="tb-t1">Overview</button>
  <button class="tabs__btn" role="tab" aria-selected="false" aria-controls="tb-p2" id="tb-t2">Assignments <span class="tabs__count">3</span></button>
  <button class="tabs__btn" role="tab" aria-selected="false" aria-controls="tb-p3" id="tb-t3">Materials</button>
  <button class="tabs__btn" role="tab" aria-selected="false" aria-controls="tb-p4" id="tb-t4">Discussion <span class="tabs__count">12</span></button>
</div>
<div class="tab-panel" role="tabpanel" id="tb-p1" aria-labelledby="tb-t1" tabindex="0">Course goals, grading weights and the lecturer's office hours.</div>
<div class="tab-panel" role="tabpanel" id="tb-p2" aria-labelledby="tb-t2" tabindex="0" hidden>Three assignments are open. The nearest deadline is Friday at 23:59.</div>
<div class="tab-panel" role="tabpanel" id="tb-p3" aria-labelledby="tb-t3" tabindex="0" hidden>Slides and readings, newest first.</div>
<div class="tab-panel" role="tabpanel" id="tb-p4" aria-labelledby="tb-t4" tabindex="0" hidden>Twelve unread replies in threads you follow.</div>
```

**Start-aligned for many sections.** Each tab sizes to its label and the row starts on the left. In plain HTML leave out the ink here: the script sizes it for equal-width tabs. The selected tab still reads by weight and color; the React `Tabs` with `align="start"` measures and shows the ink.
```html
<div class="tabs tabs--start" role="tablist" aria-label="Student record" data-lds-tabs>
  <button class="tabs__btn" role="tab" aria-selected="true" aria-controls="tb2-p1" id="tb2-t1">Profile</button>
  <button class="tabs__btn" role="tab" aria-selected="false" aria-controls="tb2-p2" id="tb2-t2">Grades</button>
  <button class="tabs__btn" role="tab" aria-selected="false" aria-controls="tb2-p3" id="tb2-t3">Attendance</button>
  <button class="tabs__btn" role="tab" aria-selected="false" aria-controls="tb2-p4" id="tb2-t4">Billing</button>
  <button class="tabs__btn" role="tab" aria-selected="false" aria-controls="tb2-p5" id="tb2-t5">Notes from advisors</button>
</div>
<div class="tab-panel" role="tabpanel" id="tb2-p1" aria-labelledby="tb2-t1" tabindex="0">Name, student number and contact details.</div>
<div class="tab-panel" role="tabpanel" id="tb2-p2" aria-labelledby="tb2-t2" tabindex="0" hidden>Grades for this semester, by course.</div>
<div class="tab-panel" role="tabpanel" id="tb2-p3" aria-labelledby="tb2-t3" tabindex="0" hidden>92 % attendance across six courses.</div>
<div class="tab-panel" role="tabpanel" id="tb2-p4" aria-labelledby="tb2-t4" tabindex="0" hidden>Tuition is paid until the end of the semester.</div>
<div class="tab-panel" role="tabpanel" id="tb2-p5" aria-labelledby="tb2-t5" tabindex="0" hidden>No notes yet.</div>
```

## Variants and sizes
| Class or attribute | When |
|---|---|
| `(default)` | Equal widths; two to four tabs with short labels. |
| `.tabs--start` | Tabs sized to their labels, aligned left, 4 px apart; four or more tabs or long labels. |

## States
| State | How |
|---|---|
| `aria-selected="true"` | Strong text at weight 600; the ink sits under it; `tabindex="0"`, the others `-1`. |
| `hover` | Unselected text darkens to strong. |
| `focus` | System focus ring on the tab; arrow keys move selection and focus together. |
| `.tab-panel[hidden]` | Inactive panels are removed from layout and from the accessibility tree. |

## Motion and microinteractions
- Ink: one element translates to the selected tab on `--spring-smooth` over `--d-smooth` (560 ms); labels never animate on their own. A new click mid-glide retargets it from where it is.
- Panel: the new panel enters with `lds-blur-in` over `--d-standard` (240 ms) on `--ease-enter`; the old one is hidden at once, so nothing cross-fades.
- Label color eases over `--d-standard`. Reduced motion: transitions drop to 120 ms linear and the panel appears without the blur.

## Accessibility
- `role="tablist"` with `aria-label`, `role="tab"` buttons with `aria-selected` and `aria-controls`, `role="tabpanel"` panels with `aria-labelledby` and `tabindex="0"` when they hold no focusable content.
- Roving tabindex: only the selected tab is in the Tab order. Left/Right (and Up/Down) move selection and focus, wrapping at the ends. The React binding also supports Home and End.
- Counts are part of the tab name ("Assignments 3"); keep them meaningful.

## Do
- Name tabs with nouns for what is inside: "Assignments", not "View assignments".
- Keep the selected tab when people come back to the page (put it in the URL or state).
- Use `.tabs--start` once the labels stop fitting equally.

## Don't
- Use tabs to filter a list or switch a chart; that is a [segmented control](segmented-control.md).
- Nest tabs inside tabs.
- Put actions (Save, Delete) in the tab row.

## Behavior (plain HTML)
`data-lds-tabs` on `.tabs` selects a tab on click or arrow key, sets `aria-selected` and roving `tabindex`, moves and sizes `.tabs__ink` (equal widths), shows the panel named by `aria-controls` and hides the rest, and fires `lds:change` with `{ index, item }`.

## React
```tsx
import { Tabs } from 'lampung-design-system/react';

const [tab, setTab] = useState<'overview' | 'assignments'>('overview');

<Tabs label="Course sections" value={tab} onChange={setTab} align="fill"
  items={[{ value: 'overview', label: 'Overview' }, { value: 'assignments', label: 'Assignments', count: 3 }]} />
{tab === 'overview' ? <div className="tab-panel" role="tabpanel">…</div> : <div className="tab-panel" role="tabpanel">…</div>}
```

## Related
[Segmented control](segmented-control.md) · [Page header](page-header.md) · [Sliding indicator](sliding-indicator.md) · [Accordion](accordion.md)
