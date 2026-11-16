export default {
  title: 'Outline',
  group: 'Navigation',
  order: 9,
  status: 'new',
  summary: 'An "On this page" list of the headings of one long page, with an ink line that follows the section in view. The list on the right of this page is one.',
  when: [
    'A long page with four or more sections people jump between: documentation, a syllabus, course rules, a long report.',
    'Wide screens with room for a third column beside the content.',
  ],
  whenNot: [
    ['Moving between pages of the app', 'app-shell'],
    ['A list of sections that each replace the content', 'sidebar'],
    ['Sibling sections where only one shows at a time', 'tabs'],
    ['A short page with two or three sections', 'sections', 'Let the headings do the work'],
  ],
  where: 'A sticky column to the right of the content on wide screens (about 200 to 220 px), starting level with the page title. Hide it below about 1100 px; on phones the page headings are enough, or put the same links at the top of the page.',
  anatomy: [
    ['nav.toc[data-lds-toc]', 'Required. The list with `aria-label="On this page"`; a 1.5 px rail on its left.'],
    ['.toc__ink', 'The 1.5 px strong line on the rail that slides to the current link; first child, `aria-hidden`.'],
    ['a[href="#id"]', 'Required. One link per section heading id. `aria-current="true"` marks the section in view.'],
  ],
  examples: [
    {
      title: 'Follows the section in view',
      desc: 'Scroll the text on the right or pick a link: the ink slides to the section nearest the top of the window.',
      stage: 'block',
      html: `<div class="split-2" style="--side: 180px; --gap: 32px;">
  <nav class="toc" data-lds-toc aria-label="On this page">
    <span class="toc__ink" aria-hidden="true"></span>
    <a href="#ol-intro">Introduction</a>
    <a href="#ol-grading">Grading</a>
    <a href="#ol-hours">Office hours</a>
    <a href="#ol-policies">Policies</a>
  </nav>
  <div class="docs-scroll stack" style="--gap: 32px; height: 240px;">
    <section class="section" id="ol-intro"><div class="section__head"><h3 class="section__title-sm">Introduction</h3><p class="section__sub">Database Systems covers relational design, SQL, transactions and indexing over fourteen weeks.</p></div></section>
    <section class="section" id="ol-grading"><div class="section__head"><h3 class="section__title-sm">Grading</h3><p class="section__sub">Assignments 40 %, midterm 25 %, final project 35 %. Late work loses 10 % per day.</p></div></section>
    <section class="section" id="ol-hours"><div class="section__head"><h3 class="section__title-sm">Office hours</h3><p class="section__sub">Tuesdays 13:00 to 15:00 in room H 2.14, or by appointment.</p></div></section>
    <section class="section" id="ol-policies" style="padding-bottom: 160px;"><div class="section__head"><h3 class="section__title-sm">Policies</h3><p class="section__sub">Work alone on assignments unless the brief says otherwise.</p></div></section>
  </div>
</div>`,
      code: `<nav class="toc" data-lds-toc aria-label="On this page">
  <span class="toc__ink" aria-hidden="true"></span>
  <a href="#intro">Introduction</a>
  <a href="#grading">Grading</a>
  <a href="#office-hours">Office hours</a>
</nav>
<!-- later in the page -->
<h2 id="intro">Introduction</h2> …`,
    },
    {
      title: 'Static state',
      desc: 'The same list without the script, for a server-rendered page that knows the current section.',
      html: `<nav class="toc" aria-label="On this page" style="width: 200px;">
  <a href="#ol2" aria-current="true">Usage</a>
  <a href="#ol2">Examples</a>
  <a href="#ol2">Accessibility</a>
</nav>`,
    },
  ],
  states: [
    ['aria-current="true"', 'Strong text at weight 500; the ink sits beside it.'],
    ['hover', 'Text darkens to strong over `--d-fast`.'],
  ],
  motion: [
    'Ink: translates and resizes to the current link on `--spring-smooth` over `--d-smooth` (560 ms), so a fast scroll through several sections reads as one glide.',
    'Only one thing moves; the links change color, they do not slide or scale.',
    'Reduced motion: the ink moves in 120 ms linear. Use `scroll-behavior: smooth` on the page only under `prefers-reduced-motion: no-preference`.',
  ],
  a11y: [
    '`<nav aria-label="On this page">` with plain links to heading ids, in document order.',
    '`aria-current="true"` (not `page`) marks the section in view, because the page itself does not change.',
    'Give headings a `scroll-margin-top` equal to any sticky header so a jump does not hide the heading.',
  ],
  do: [
    'Link only the `<h2>` level, or `<h2>` and `<h3>` at most.',
    'Use the exact heading text as the link text.',
  ],
  dont: [
    'Use the outline as the main navigation.',
    'Show it on phones as a fixed column; it steals the width the text needs.',
  ],
  js: '`data-lds-toc` on `.toc` watches the elements its `a[href^="#"]` links point to (looked up by id in the document) with an IntersectionObserver whose bottom margin is -60 % of the window, marks the topmost visible section with `aria-current="true"`, and moves and sizes `.toc__ink`. It marks the first section on init.',
  related: ['sections', 'sidebar', 'app-shell', 'prose'],
};
