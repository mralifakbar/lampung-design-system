const SIDE = "const b = event.target.closest('.sidebar__item'); if (!b) return; this.querySelectorAll('.sidebar__item').forEach((x) => x.toggleAttribute('aria-current', x === b)); b.setAttribute('aria-current', 'page'); this.querySelector('.sidebar__hl').style.transform = 'translateY(' + b.offsetTop + 'px)';";

export default {
  title: 'Sliding indicator',
  group: 'Motion',
  order: 4,
  summary: 'One marker travels to the chosen option: the segmented thumb, the tab ink, the sidebar highlight, the outline ink, the toolbar highlight. Labels never light up on their own; the single moving element is what tells the eye where the choice went.',
  when: [
    'Choosing one of a few options shown side by side: a [segmented control](segmented-control) thumb, [tabs](tabs) ink.',
    'Showing where you are in a list of places: the [sidebar](sidebar) or [app shell](app-shell) highlight, the [outline](outline) ink as sections scroll by.',
    'A highlight that follows hover across a row of tools ([expanding toolbar](expanding-toolbar)).',
  ],
  whenNot: [
    ['Turning one thing on or off', 'switch'],
    ['Choosing several options at once', 'chips'],
    ['The content under the tabs changing', 'view-swap'],
    ['Progress through a fixed sequence', 'steps'],
    ['Pages in a site header (the current link is underlined, not slid)', 'top-nav'],
  ],
  where: 'Behind or under the options it marks, inside their group: `seg__thumb` as the first child of `.seg`, `tabs__ink` first in `.tabs`, `sidebar__hl` / `shell__hl` first in the nav, `toc__ink` first in `.toc`, `xbar__hl` first in `.xbar`.',
  examples: [
    {
      title: 'Segmented thumb',
      desc: 'Pick a range. The thumb slides on the smooth spring; click quickly and it redirects mid-way. Arrow keys move it too.',
      html: `<div class="seg seg--lg" role="group" aria-label="Show grades for" data-lds-segmented style="width: 360px;">
  <span class="seg__thumb"></span>
  <button class="seg__btn" aria-pressed="true">This week</button>
  <button class="seg__btn" aria-pressed="false">Month</button>
  <button class="seg__btn" aria-pressed="false">Term</button>
</div>`,
    },
    {
      title: 'Tab ink and the panel below',
      desc: 'The ink slides to the new tab while the panel swaps (see [view swap](view-swap)). The tab label changes weight at once; only the ink travels.',
      stage: 'block',
      html: `<div style="max-width: 460px;">
  <div class="tabs" role="tablist" aria-label="Course sections" data-lds-tabs>
    <span class="tabs__ink"></span>
    <button class="tabs__btn" role="tab" aria-selected="true" aria-controls="si-1">Overview</button>
    <button class="tabs__btn" role="tab" aria-selected="false" aria-controls="si-2">Assignments <span class="tabs__count">3</span></button>
    <button class="tabs__btn" role="tab" aria-selected="false" aria-controls="si-3">Materials</button>
  </div>
  <div class="tab-panel" role="tabpanel" id="si-1">Course goals, grading weights and office hours.</div>
  <div class="tab-panel" role="tabpanel" id="si-2" hidden>Three assignments open. The nearest is due Friday at 23:59.</div>
  <div class="tab-panel" role="tabpanel" id="si-3" hidden>Slides and readings, newest first.</div>
</div>`,
    },
    {
      title: 'Sidebar highlight',
      desc: 'Choose a page. The tinted highlight glides behind the items; the icon and label change color at once. In the [app shell](app-shell) the same highlight is placed by `data-lds-shell` whenever `aria-current` moves.',
      stage: 'fill',
      html: `<nav class="sidebar" aria-label="Course" onclick="${SIDE}">
  <span class="sidebar__hl" aria-hidden="true" style="transform: translateY(10px);"></span>
  <button class="sidebar__item" aria-current="page"><span class="ic" aria-hidden="true">home</span>Overview</button>
  <button class="sidebar__item"><span class="ic" aria-hidden="true">assignment</span>Assignments<span class="sidebar__badge">3</span></button>
  <button class="sidebar__item"><span class="ic" aria-hidden="true">menu_book</span>Materials</button>
  <button class="sidebar__item"><span class="ic" aria-hidden="true">group</span>Classmates</button>
</nav>`,
      code: `<nav class="sidebar" aria-label="Course">
  <span class="sidebar__hl" aria-hidden="true"></span>
  <a class="sidebar__item" href="overview" aria-current="page"><span class="ic" aria-hidden="true">home</span>Overview</a>
  <a class="sidebar__item" href="assignments"><span class="ic" aria-hidden="true">assignment</span>Assignments</a>
</nav>
<!-- On change: move aria-current, then set .sidebar__hl transform to translateY(<item offsetTop>px).
     In a full layout use the app shell (.shell__hl), which data-lds-shell places for you. -->`,
    },
  ],
  variants: [
    ['.seg__thumb', 'Segmented control. Width set by `data-lds-segmented` to one segment; moves by `translateX(i * 100%)`.'],
    ['.tabs__ink', 'Tabs. 2 px line under the selected tab; set by `data-lds-tabs`.'],
    ['.sidebar__hl / .shell__hl', 'Sidebar and app shell: a tinted pill behind the current item. `.shell__hl` is placed by `data-lds-shell` (it watches `aria-current`).'],
    ['.toc__ink', 'Outline: a 1.5 px line beside the section in view; `data-lds-toc` also resizes it to the link height.'],
    ['.xbar__hl', 'Expanding toolbar: follows hover and focus, travelling once to where the button will end up.'],
  ],
  motion: [
    'The marker moves with `transform` on `--spring-smooth` over `--d-smooth` (560 ms), no overshoot. When its size changes too (outline, toolbar), height or width use the same spring so both arrive together.',
    'Labels change instantly (weight, color) or within `--d-fast`; they never animate on their own, so there is only one moving thing.',
    'Interruption: each new choice sets a new transform; the transition starts from the current position, so rapid clicks or arrow-key presses glide straight to the latest option.',
    'Placement on load is instant: set the starting position without a transition (the shell does this for its first frame) so the page does not open with a slide.',
    'Theme changes freeze every transition except the segmented thumb, which keeps sliding (`.lds-theme-swap`).',
    'Reduced motion: the marker still moves to its new place, in 120 ms linear, so position stays clear without travel.',
  ],
  a11y: [
    'The indicator is decoration: `aria-hidden="true"`. State lives on the options: `aria-pressed` (segmented), `aria-selected` with roving `tabindex` (tabs), `aria-current="page"` (navigation), `aria-current="true"` (outline).',
    'Arrow keys move the selection in segmented controls and tabs; navigation lists use Tab.',
    'Selection must also show without the marker (weight or color on the label) for high-contrast modes where tints can vanish.',
  ],
  do: [
    'Use one indicator element per group, moved with `transform`.',
    'Let the system hooks place it (`data-lds-segmented`, `data-lds-tabs`, `data-lds-shell`, `data-lds-toc`).',
    'Keep the label change instant and the marker the only travel.',
  ],
  dont: [
    'Give each option its own background that fades in and out.',
    'Animate `left` or `width` with JS frames; set a transform and let CSS spring it.',
    'Slide the marker on first render.',
  ],
  js: '`data-lds-segmented` and `data-lds-tabs` size and move the marker, handle arrow keys and emit `lds:change` with `{ index, item }`. `data-lds-shell` places `.shell__hl` whenever `aria-current` changes. `data-lds-toc` moves `.toc__ink` as sections scroll. `.sidebar__hl` has no binding of its own: move it yourself or use the app shell.',
  react: `import { Segmented, Tabs } from 'lampung-design-system/react';

<Segmented label="Show grades for" value={range} onChange={setRange}
  options={[{ value: 'week', label: 'This week' }, { value: 'month', label: 'Month' }, { value: 'term', label: 'Term' }]} />
<Tabs label="Course sections" value={tab} onChange={setTab}
  items={[{ value: 'overview', label: 'Overview' }, { value: 'tasks', label: 'Assignments', count: 3 }]} />`,
  related: ['segmented-control', 'tabs', 'sidebar', 'outline'],
};
