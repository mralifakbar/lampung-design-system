# Page header

Group: Navigation. Docs page: `docs/components/page-header.html`.

The top of a page: breadcrumbs, the title with one line of context, and the page actions on the same baseline. A composition of existing parts, not a component of its own.

## Use it when
- Every content page inside an app: a course, a student record, a report.
- The page has actions that apply to the whole page (Share, New assignment) and they need a home.

## Use something else when
- A phone screen with a title that collapses into the bar on scroll: use [Phone bars](phone-bars.md). Use the nav bar with a large title.
- A heading for one part of a page: use [Sections](sections.md). Use `.section__head` inside `.sections`.
- The one thing people should do next on a landing page: use [Spotlight](spotlight.md).
- Site-wide navigation: use [Top nav](top-nav.md).

## Where it goes
The first thing in the content column of an [app shell](app-shell.md), above [tabs](tabs.md) when the page has them. The actions sit at the right on wide screens and wrap under the title on phones (the `cluster` wraps by itself).

## Anatomy
| Part | What it is |
|---|---|
| `header.stack` | Required. The wrapper; stacks crumbs and title row 14 px apart (`--gap: 14px`). |
| `nav > ol.crumbs` | Optional [breadcrumbs](breadcrumbs.md). |
| `.cluster` | Required. The title row: title block and actions, spread apart and aligned to the bottom; wraps when narrow. |
| `.section__head > h1` | Required. The page title at `--type-title-1` (28/34, 600) and `--tracking-title-1`. Set the type on the `<h1>`; the system has no page title class yet. |
| `.section__sub` | One line of context under the title: code, credits, schedule, owner. |
| `.btn--md` | Page actions: one primary and one or two secondary, 36 px. |

## Markup

**Course page.** Breadcrumbs, the title with its context, and two actions on the same baseline.
```html
<header class="stack" style="--gap: 14px;">
  <nav aria-label="Breadcrumb">
    <ol class="crumbs">
      <li><a href="#ph">Academics</a></li>
      <li><span class="ic" aria-hidden="true">chevron_right</span></li>
      <li><a href="#ph">Courses</a></li>
      <li><span class="ic" aria-hidden="true">chevron_right</span></li>
      <li><span aria-current="page">Database Systems</span></li>
    </ol>
  </nav>
  <div class="cluster" style="justify-content: space-between; align-items: flex-end; --gap: 16px;">
    <div class="section__head">
      <h1 style="margin: 0; font: var(--type-title-1); letter-spacing: var(--tracking-title-1); color: var(--text-strong);">Database Systems</h1>
      <p class="section__sub">CS 2104 · 3 credits · Mon and Thu, 08:00</p>
    </div>
    <div class="cluster">
      <button class="btn btn--secondary btn--md"><span class="ic" aria-hidden="true">ios_share</span>Share</button>
      <button class="btn btn--primary btn--md"><span class="ic" aria-hidden="true">add</span>New assignment</button>
    </div>
  </div>
</header>
```

**With tabs under it.** A record page: no breadcrumbs, a "more" menu for rare actions, and tabs as the last line of the header.
```html
<header class="stack" style="--gap: 14px;">
  <div class="cluster" style="justify-content: space-between; align-items: flex-end; --gap: 16px;">
    <div class="section__head">
      <h1 style="margin: 0; font: var(--type-title-1); letter-spacing: var(--tracking-title-1); color: var(--text-strong);">Rina Wijaya</h1>
      <p class="section__sub">Student 2023-0418 · Computer Science · Year 2</p>
    </div>
    <div class="cluster">
      <button class="btn btn--secondary btn--md"><span class="ic" aria-hidden="true">mail</span>Send message</button>
      <button class="icon-btn" aria-label="More actions"><span class="ic" aria-hidden="true">more_horiz</span></button>
    </div>
  </div>
  <div class="tabs tabs--start" role="tablist" aria-label="Student record">
    <button class="tabs__btn" role="tab" aria-selected="true">Profile</button>
    <button class="tabs__btn" role="tab" aria-selected="false" tabindex="-1">Grades</button>
    <button class="tabs__btn" role="tab" aria-selected="false" tabindex="-1">Attendance</button>
  </div>
</header>
```

## Motion and microinteractions
- Nothing in the header moves on its own. Actions keep their own press feedback (scale 0.97 in 90 ms); breadcrumbs ease color over `--d-fast`.

## Accessibility
- One `<h1>` per page, and it is this title. Section headings below it are `<h2>`.
- Put the header inside `<main>` so a skip link lands on the title.
- Icon-only actions are [icon buttons](icon-button.md) with an `aria-label`.

## Do
- Keep one primary action; put rare actions in a [dropdown menu](dropdown-menu.md) behind a "more" icon button.
- Make the context line plain facts (code, owner, date), not a description paragraph.
- Keep the title the same as the last breadcrumb and the link that led here.

## Don't
- Write a new `.page-header` class with its own padding and type; compose the existing parts.
- Put filters or search in the header; they belong above the list they filter.
- Add a hero image or a tinted band behind a working page title.

## Related
[Breadcrumbs](breadcrumbs.md) · [Tabs](tabs.md) · [Sections](sections.md) · [Button](button.md)
