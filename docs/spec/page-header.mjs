export default {
  title: 'Page header',
  group: 'Navigation',
  order: 5,
  summary: 'The top of a page: breadcrumbs, the title with one line of context, and the page actions on the same baseline. A composition of existing parts, not a component of its own.',
  when: [
    'Every content page inside an app: a service, an applicant record, a report.',
    'The page has actions that apply to the whole page (Share, New application) and they need a home.',
  ],
  whenNot: [
    ['A phone screen with a title that collapses into the bar on scroll', 'phone-bars', 'Use the nav bar with a large title'],
    ['A heading for one part of a page', 'sections', 'Use `.section__head` inside `.sections`'],
    ['The one thing people should do next on a landing page', 'spotlight'],
    ['Site-wide navigation', 'top-nav'],
  ],
  where: 'The first thing in the content column of an [app shell](app-shell), above [tabs](tabs) when the page has them. The actions sit at the right on wide screens and wrap under the title on phones (the `cluster` wraps by itself).',
  anatomy: [
    ['header.stack', 'Required. The wrapper; stacks crumbs and title row 14 px apart (`--gap: 14px`).'],
    ['nav > ol.crumbs', 'Optional [breadcrumbs](breadcrumbs).'],
    ['.cluster', 'Required. The title row: title block and actions, spread apart and aligned to the bottom; wraps when narrow.'],
    ['.section__head > h1', 'Required. The page title at `--type-title-1` (28/34, 600) and `--tracking-title-1`. Set the type on the `<h1>`; the system has no page title class yet.'],
    ['.section__sub', 'One line of context under the title: code, processing time, schedule, owner.'],
    ['.btn--md', 'Page actions: one primary and one or two secondary, 36 px.'],
  ],
  examples: [
    {
      title: 'Service page',
      desc: 'Breadcrumbs, the title with its context, and two actions on the same baseline.',
      stage: 'block',
      html: `<header class="stack" style="--gap: 14px;">
  <nav aria-label="Breadcrumb">
    <ol class="crumbs">
      <li><a href="#ph">Services</a></li>
      <li><span class="ic" aria-hidden="true">chevron_right</span></li>
      <li><a href="#ph">Permits</a></li>
      <li><span class="ic" aria-hidden="true">chevron_right</span></li>
      <li><span aria-current="page">Micro business permit</span></li>
    </ol>
  </nav>
  <div class="cluster" style="justify-content: space-between; align-items: flex-end; --gap: 16px;">
    <div class="section__head">
      <h1 style="margin: 0; font: var(--type-title-1); letter-spacing: var(--tracking-title-1); color: var(--text-strong);">Micro business permit</h1>
      <p class="section__sub">IUM 2104 · done in 3 working days · Mon to Thu, 08:00</p>
    </div>
    <div class="cluster">
      <button class="btn btn--secondary btn--md"><span class="ic" aria-hidden="true">ios_share</span>Share</button>
      <button class="btn btn--primary btn--md"><span class="ic" aria-hidden="true">add</span>New application</button>
    </div>
  </div>
</header>`,
    },
    {
      title: 'With tabs under it',
      desc: 'A record page: no breadcrumbs, a "more" menu for rare actions, and tabs as the last line of the header.',
      stage: 'block',
      html: `<header class="stack" style="--gap: 14px;">
  <div class="cluster" style="justify-content: space-between; align-items: flex-end; --gap: 16px;">
    <div class="section__head">
      <h1 style="margin: 0; font: var(--type-title-1); letter-spacing: var(--tracking-title-1); color: var(--text-strong);">Rina Wijaya</h1>
      <p class="section__sub">Applicant 2023-0418 · Kedaton district · 2 open applications</p>
    </div>
    <div class="cluster">
      <button class="btn btn--secondary btn--md"><span class="ic" aria-hidden="true">mail</span>Send message</button>
      <button class="icon-btn" aria-label="More actions"><span class="ic" aria-hidden="true">more_horiz</span></button>
    </div>
  </div>
  <div class="tabs tabs--start" role="tablist" aria-label="Applicant record">
    <button class="tabs__btn" role="tab" aria-selected="true">Profile</button>
    <button class="tabs__btn" role="tab" aria-selected="false" tabindex="-1">Applications</button>
    <button class="tabs__btn" role="tab" aria-selected="false" tabindex="-1">History</button>
  </div>
</header>`,
    },
  ],
  motion: [
    'Nothing in the header moves on its own. Actions keep their own press feedback (scale 0.97 in 90 ms); breadcrumbs ease color over `--d-fast`.',
  ],
  a11y: [
    'One `<h1>` per page, and it is this title. Section headings below it are `<h2>`.',
    'Put the header inside `<main>` so a skip link lands on the title.',
    'Icon-only actions are [icon buttons](icon-button) with an `aria-label`.',
  ],
  do: [
    'Keep one primary action; put rare actions in a [dropdown menu](dropdown-menu) behind a "more" icon button.',
    'Make the context line plain facts (code, owner, date), not a description paragraph.',
    'Keep the title the same as the last breadcrumb and the link that led here.',
  ],
  dont: [
    'Write a new `.page-header` class with its own padding and type; compose the existing parts.',
    'Put filters or search in the header; they belong above the list they filter.',
    'Add a hero image or a tinted band behind a working page title.',
  ],
  related: ['breadcrumbs', 'tabs', 'sections', 'button'],
};
