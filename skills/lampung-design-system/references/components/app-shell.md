# App shell

Group: Navigation (new). Docs page: `docs/components/app-shell.html`.

The frame of an app: a sticky sidebar beside the content on wide screens, a top bar with a drawer below 960 px. One per app, at the root; one highlight glides to the current page.

## Use it when
- An app or documentation site with more than five destinations that people move between all day: a course hub, an admin panel, a docs site.
- Navigation needs groups (`shell__group`) or collapsible sections with numbered children, such as modules and lessons.
- The same frame must work from a 1440 px monitor down to a phone without a second navigation component.

## Use something else when
- A marketing or content site with five or fewer top-level pages and no sidebar: use [Top nav](top-nav.md).
- A secondary list of sections inside one page, such as the parts of a settings page: use [Sidebar](sidebar.md). The sidebar is a panel that sits in the content; the shell is the frame around everything.
- A native-feeling phone app with three to five destinations: use [Phone bars](phone-bars.md). Use the tab bar at the bottom instead of a drawer.
- Jumping between headings of one long page: use [Outline](outline.md).
- Switching sibling sections of one record (Overview, Assignments, Grades): use [Tabs](tabs.md).

## Where it goes
The outermost element of the page, directly inside `<body>`. Wide screens: a 264 px column on the left, sticky to the full viewport height, content to its right. Below 960 px: the sidebar becomes a drawer (at most 300 px or 86 % of the width) behind a scrim, opened from a translucent 56 px top bar that pads itself for the notch. This documentation page is an app shell: narrow the window to see the drawer.

## Anatomy
| Part | What it is |
|---|---|
| `.shell[data-lds-shell]` | Required. Two-column grid at full viewport height; `data-lds-shell` wires the drawer, the highlight and the sections. |
| `.shell__side` | Required. The sidebar column, with an `id` the toggle points to. Holds brand, nav and foot. |
| `.shell__brand` | The product name or logo, a link home. |
| `.shell__nav` | Required. The `<nav aria-label>` that holds the links; positioned so the highlight can travel in it. |
| `.shell__hl` | The single highlight behind the current link. First child of the nav, `aria-hidden`. |
| `.shell__link` | Required. A destination: `.ic` + `.shell__label` (+ optional `.badge.shell__badge`). `aria-current="page"` marks the current one. |
| `.shell__group` | A caption above a group of links (`<p>`). |
| `.shell__section` | A collapsible group: `.shell__section-btn` (`aria-expanded`, `aria-controls`) with `.shell__section-label`, `.shell__section-count` and an `expand_more` icon, then `.shell__panel` holding one `<div>`. |
| `.shell__link.is-parent + .shell__children` | A parent link followed by its children on a hairline rail. |
| `.shell__link--child` | A child link: `.shell__num` (the number) + `.shell__label` + optional `.shell__done` (a filled `check_circle`). |
| `.shell__foot` | Pinned to the bottom of the sidebar: account, appearance switch, sign out. |
| `.shell__scrim` | Required for the drawer. Sibling after the side; click closes the drawer. |
| `.shell__main` | Required. The content column. |
| `.shell__top` | The top bar shown below 960 px: the menu toggle (`[data-lds-shell-toggle]` with a `.burger`), `.shell__toptitle`, and an action or an empty 44 px span to balance it. |
| `.shell__bar` | Instead of `.shell__top` in an app that needs a bar at every width (an admin panel): a sticky 60 px translucent bar with the drawer toggle (below 960 px), the rail toggle `[data-lds-shell-rail]` (above), `.sep--v`, breadcrumbs, then `.shell__bar-end` with search and actions. |
| `.shell__search` | A `button.control.search.shell__search` in the bar that opens the [command palette](command-palette.md) and shows its shortcut in a `.kbd`; below 720 px an icon button `.shell__search-icon` takes its place. |
| `.shell__mark` | A 28 px accent square with the product initial inside `.shell__brand`, next to a `.shell__label`; it stays visible in the rail. |
| `.shell__user` | A `button.shell__link.shell__user` in the foot with an `.avatar` and a `.shell__label` holding the name and a `.shell__sub` line; opens the account menu. |
| `.shell.is-rail` | Wide screens: the sidebar folds to 66 px of icons. Set by `[data-lds-shell-rail]`, remembered; `restoreRail()` in `<head>` sets `html[data-shell-rail]` so the first paint is already folded. |
| `a.skip-link` | The first element in `<body>`: "Skip to content", pointing at `<main id>`. Hidden above the window until it gets focus. |
| `.layer-host` | A fixed, full-window host for page-level layers (`.scrim`, `.cmdk`, `.drawer`, `.dialog` and the `.toaster` that `toast({ container })` creates). It lets clicks through except on open layers. |

## Markup

**A course hub frame.** Flat links, a group caption, a badge and a foot. Pick a link: the highlight glides to it. Below 960 px the sidebar becomes a drawer behind the menu button. The demo is boxed to 460 px; a real shell fills the viewport.
```html
<div class="shell" data-lds-shell>
  <aside class="shell__side" id="side">
    <a class="shell__brand" href="/">Course hub</a>
    <nav class="shell__nav" aria-label="Main">
      <span class="shell__hl" aria-hidden="true"></span>
      <a class="shell__link" href="/"><span class="ic" aria-hidden="true">home</span><span class="shell__label">Home</span></a>
      <a class="shell__link" href="/schedule"><span class="ic" aria-hidden="true">calendar_month</span><span class="shell__label">Schedule</span></a>
      <a class="shell__link" href="/assignments" aria-current="page"><span class="ic" aria-hidden="true">assignment</span><span class="shell__label">Assignments</span><span class="badge badge--accent shell__badge">3</span></a>
      <p class="shell__group">Courses</p>
      <a class="shell__link" href="/courses/db"><span class="ic" aria-hidden="true">menu_book</span><span class="shell__label">Database Systems</span></a>
    </nav>
    <div class="shell__foot">
      <a class="shell__link" href="/settings"><span class="ic" aria-hidden="true">settings</span><span class="shell__label">Settings</span></a>
    </div>
  </aside>
  <div class="shell__scrim"></div>
  <div class="shell__main">
    <header class="shell__top">
      <button class="icon-btn" data-lds-shell-toggle aria-controls="side" aria-expanded="false" aria-label="Menu"><span class="burger" aria-hidden="true"><i></i><i></i><i></i></span></button>
      <span class="shell__toptitle">Assignments</span>
      <span style="width: 44px;"></span>
    </header>
    <main id="main">…</main>
  </div>
</div>
```

**Nested sections with numbered lessons.** Sections fold open on a spring; the one holding the current page opens by itself. A parent link carries numbered children on a rail; finished ones get a done mark. Open and close Statistics.
```html
<nav class="shell__nav" aria-label="Lessons">
  <span class="shell__hl" aria-hidden="true"></span>
  <div class="shell__section">
    <button class="shell__section-btn" aria-expanded="false" aria-controls="sec-math">
      <span class="shell__section-label">Discrete math</span><span class="shell__section-count">5</span><span class="ic" aria-hidden="true">expand_more</span>
    </button>
    <div class="shell__panel" id="sec-math"><div>
      <a class="shell__link is-parent" href="/math/sets">Module 1: Sets</a>
      <div class="shell__children">
        <a class="shell__link shell__link--child" href="/math/sets/1"><span class="shell__num">1</span><span class="shell__label">Sets and subsets</span><span class="shell__done"><span class="ic" aria-hidden="true">check_circle</span><span class="sr-only">Done</span></span></a>
        <a class="shell__link shell__link--child" href="/math/sets/3" aria-current="page"><span class="shell__num">3</span><span class="shell__label">Functions and their inverses</span></a>
      </div>
    </div></div>
  </div>
</nav>
```

**Admin frame with an app bar and a rail.** Press the panel button in the bar: the sidebar folds to its icons and the choice is remembered. Hover an icon for its name; move down the rail and the tooltip follows at once. Below 960 px the same bar shows the menu button and the sidebar becomes the drawer.
```html
<div class="shell" data-lds-shell style="min-height: 460px; height: 460px;">
  <aside class="shell__side" id="adm-side" style="height: 460px;">
    <a class="shell__brand" href="#adm"><span class="shell__mark">K</span><span class="shell__label">Kelola admin</span></a>
    <nav class="shell__nav" aria-label="Main">
      <span class="shell__hl" aria-hidden="true"></span>
      <p class="shell__group">Dashboards</p>
      <a class="shell__link" href="#adm" aria-current="page"><span class="ic" aria-hidden="true">dashboard</span><span class="shell__label">Overview</span></a>
      <a class="shell__link" href="#adm"><span class="ic" aria-hidden="true">payments</span><span class="shell__label">Finance</span></a>
      <p class="shell__group">Pages</p>
      <a class="shell__link" href="#adm"><span class="ic" aria-hidden="true">group</span><span class="shell__label">Users</span><span class="badge badge--accent shell__badge">3</span></a>
      <a class="shell__link" href="#adm"><span class="ic" aria-hidden="true">view_kanban</span><span class="shell__label">Kanban</span></a>
    </nav>
    <div class="shell__foot">
      <a class="shell__link" href="#adm"><span class="ic" aria-hidden="true">help</span><span class="shell__label">Help</span></a>
    </div>
  </aside>
  <div class="shell__scrim"></div>
  <div class="shell__main">
    <header class="shell__bar">
      <button class="icon-btn" data-lds-shell-toggle aria-controls="adm-side" aria-expanded="false" aria-label="Menu"><span class="burger" aria-hidden="true"><i></i><i></i><i></i></span></button>
      <button class="icon-btn" data-lds-shell-rail aria-controls="adm-side" aria-expanded="true" aria-label="Collapse sidebar"><span class="ic" aria-hidden="true">left_panel_close</span></button>
      <span class="sep sep--v" aria-hidden="true"></span>
      <nav aria-label="Breadcrumb"><ol class="crumbs"><li><a href="#adm">Dashboards</a></li><li><span class="ic" aria-hidden="true">chevron_right</span></li><li><span aria-current="page">Overview</span></li></ol></nav>
      <div class="shell__bar-end">
        <button class="control search shell__search" type="button"><span class="ic" aria-hidden="true">search</span>Search<span class="kbd">⌘K</span></button>
        <button class="icon-btn shell__search-icon" type="button" aria-label="Search"><span class="ic" aria-hidden="true">search</span></button>
        <button class="icon-btn" type="button" aria-label="Notifications, 2 unread"><span class="ic" aria-hidden="true">notifications</span><span class="count">2</span></button>
      </div>
    </header>
    <main style="padding: 24px;"><p class="section__sub">Page content.</p></main>
  </div>
</div>
```

**Multi-page app: the frame stays still between pages.** When every page is its own HTML file (the example dashboard), three pieces keep the frame from jumping: a paint-time snippet right after `</aside>` that restores the sidebar scroll and places the highlight before the first paint, gliding it from the link you left; one `@view-transition` rule so the sidebar and bar stay put while the content cross-fades; and `data-lds-shell`, which writes both keys on `pagehide`. Follow two links in the example dashboard (`docs/examples/dashboard/`) to see it.
```html
<!-- 1. Once per site, in your stylesheet (opt in to cross-document transitions) -->
<style>@view-transition { navigation: auto; types: lds-page; }</style>

<!-- 2. In every page, the snippet comes right after the sidebar, before anything else paints -->
<div class="shell" data-lds-shell>
  <aside class="shell__side" id="side" aria-label="Sidebar">
    <nav class="shell__nav" aria-label="Main">
      <span class="shell__hl" aria-hidden="true"></span>
      <a class="shell__link" href="default.html" aria-current="page">…</a>
    </nav>
  </aside>
  <script>(function(){try{var s=document.currentScript.previousElementSibling,ss=sessionStorage,v=ss.getItem('lds-shell-scroll');if(v!=null)s.scrollTop=+v;s.setAttribute('data-restored','');var n=s.querySelector('.shell__nav'),h=s.querySelector('.shell__hl'),c=n&&n.querySelector('[aria-current="page"]'),f=ss.getItem('lds-shell-from');ss.removeItem('lds-shell-from');if(!h||!c||c.closest('.shell__panel:not(.is-open)'))return;var put=function(e){h.style.height=e.offsetHeight+'px';h.style.transform='translateY('+e.offsetTop+'px)';},o=null;if(f){[].forEach.call(n.querySelectorAll('a[href]'),function(a){if(a.getAttribute('href')===f)o=a;});}h.style.transition='none';if(o&&!o.closest('.shell__panel:not(.is-open)')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){put(o);h.offsetWidth;h.style.transition='';requestAnimationFrame(function(){put(c);});}else put(c);n.classList.add('has-hl');}catch(e){}})();</script>
  <div class="shell__scrim"></div>
  <div class="shell__main">…</div>
</div>
```

## Variants and sizes
| Class or attribute | When |
|---|---|
| `.shell__link--child` | Numbered child links under a parent; 36 px rows at 13 px. |
| `.shell__section` | A collapsible section; use when the nav holds more than about 12 links or the groups are long. |
| `.shell__group` | A static caption; use for two to four short groups that never need to fold. |
| `.shell__badge` | A count or "New" on a link (`badge badge--accent shell__badge`). |
| `.shell__bar` | A top bar at every width, for apps with breadcrumbs, search and account actions; use `.shell__top` for a docs-like shell that only needs a bar on phones. |
| `.shell.is-rail` | Icon-only sidebar on wide screens for people who want the room; every link keeps its label for screen readers and shows it in a tooltip. |

## States
| State | How |
|---|---|
| `aria-current="page"` | Accent text, filled icon, the highlight slides under it; a child link fills its number with the accent. |
| `hover` | Quiet tint, only on devices that can hover. |
| `:active` | A stronger tint while pressed. |
| `.shell__section-btn[aria-expanded]` | `true` opens the panel and turns the chevron; a section holding the current page opens itself on init. |
| `.shell.is-menu` | Below 960 px: drawer and scrim shown. Set by the toggle; removed by the scrim, Escape or following a link. |

## Motion and microinteractions
- Highlight: one `.shell__hl` translates to the current link on `--spring-smooth` over `--d-smooth` (560 ms); its height follows the link. It is placed without a transition on load so it does not fly in.
- Sections: `.shell__panel` animates `grid-template-rows` 0fr to 1fr on `--spring-smooth`; the chevron turns 180 degrees on the same spring. The highlight is re-placed 420 ms after a section toggles.
- Drawer: slides in from the left on `--spring-smooth`; leaves in 260 ms on `--ease-exit`. The scrim fades in over `--d-standard` (240 ms) and out over `--d-exit` (180 ms). The burger morphs into a close icon on `--spring-snappy`.
- Rail: the column narrows on `--spring-smooth` over `--d-smooth` while labels, badges and group captions fade out in `--d-instant` on `--ease-exit`; unfolding brings them back over `--d-standard` 80 ms after the column starts to grow. Icons never move, because the brand mark and the link icons share one center line in both widths.
- Rail tooltip: the first one waits 320 ms; while one is showing, the next follows the pointer at once and glides to the new link (warm tooltip), leaving in `--d-instant` when the pointer leaves the rail. Keyboard focus shows it at once.
- Between pages (multi-page apps): with `@view-transition { navigation: auto; types: lds-page; }` on the site, `html:active-view-transition-type(lds-page)` names the sidebar and the bar so they hold still, the old content fades out in `--d-fast` on `--ease-exit` and the new one fades up 6 px over `--d-standard` on `--ease-enter`. The paint-time snippet puts the highlight on the link you left, then glides it to the new current link on the usual spring. Browsers without cross-document view transitions simply load the page.
- Scrollbar: the sidebar scrollbar is transparent at rest and fades in over `--d-standard` while the sidebar scrolls (`.shell__side.is-scrolling`, removed 900 ms after the last scroll event).
- Reduced motion: panels and the chevron stop transitioning; everything else drops to 120 ms linear. Page transitions become a 120 ms linear fade with no glide: the snippet places the highlight on the current link directly.

## Accessibility
- The side holds a `<nav aria-label>`; the current link carries `aria-current="page"`, never just a class.
- Section buttons are real `<button>`s with `aria-expanded` and `aria-controls` pointing to the panel id.
- The menu toggle has `aria-label="Menu"`, `aria-controls` the side id and an `aria-expanded` kept in sync. Opening moves focus to the first link in the drawer; Escape or the scrim closes it and returns focus to the toggle.
- Done marks need text for screen readers: an `aria-hidden` icon plus an `.sr-only` "Done".
- Put a skip link before the shell that jumps to `<main id>`.
- Before the highlight is placed (first paint, or with no script) `.shell__nav:not(.has-hl)` hides `.shell__hl` and tints the current link itself, so the current page is never unmarked. The snippet and `bindShell` add `has-hl` once the highlight sits under the link.
- Restoring the sidebar scroll between pages keeps the link just clicked under the pointer; if the current link would be out of view, `data-lds-shell` scrolls it into the middle of the sidebar.
- The rail toggle is a real button with `aria-controls` the side id, `aria-expanded` (true while the full sidebar shows) and an `aria-label` that says what it will do ("Collapse sidebar", "Expand sidebar"). Folded links keep their `.shell__label` in the accessibility tree; the visual tooltip is `aria-hidden`.

## Do
- Keep one shell per app and mark the current page with `aria-current="page"`.
- Use sections with numbered children for ordered content (modules and lessons), groups for unordered areas.
- Keep labels to a few words; long names wrap rather than truncate.

## Don't
- Light up each link with its own background; there is one highlight.
- Load the multi-page snippet from a file or after the content: it must run right after `</aside>`, before first paint, or the highlight jumps.
- Nest a second sidebar inside the content, or add a top nav as well.
- Hide primary destinations only in the foot; the foot is for account and settings.

## Behavior (plain HTML)
`data-lds-shell` on `.shell` wires the drawer toggle (`[data-lds-shell-toggle]`), the scrim, Escape, closing when a link inside is followed, and the highlight (it follows `aria-current` changes and resizes by itself). `.shell__section-btn[aria-controls]` buttons are wired by `init()`. After moving `aria-current` from outside, `placeShellHighlight(shell)` re-measures if needed. `[data-lds-shell-rail]` inside the shell folds and unfolds the rail (`setRail(shell, on)` from code), stores it under `localStorage` `lds-shell-rail` and fires `lds:rail`; call `restoreRail()` from a classic script in `<head>` to paint the stored state without a jump. Multi-page apps: on `pagehide` it stores the sidebar scroll under `sessionStorage` `lds-shell-scroll` and the current link `href` under `lds-shell-from`; the inline snippet right after `</aside>` (see the last example) reads both before first paint, marks the side `data-restored` and the nav `has-hl`, and `data-lds-shell` then hands the transitions back. It also sets `.is-scrolling` on `.shell__side` while it scrolls, which shows the otherwise hidden scrollbar.

## Related
[Top nav](top-nav.md) · [Sidebar](sidebar.md) · [Nav progress](nav-progress.md) · [Outline](outline.md)
