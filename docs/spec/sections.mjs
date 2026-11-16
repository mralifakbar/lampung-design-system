export default {
  title: 'Sections',
  group: 'Page patterns',
  order: 1,
  summary: 'A page as a column of titled sections: 48 px apart, a hairline above every section after the first, a larger heading on wide screens. Structure comes from space and headings, not from a card around each part.',
  when: [
    'Any page with more than one part: a course page (overview, schedule, materials), a dashboard, a settings page, a profile.',
    'A part needs a heading with an optional one-line explanation (`.section__sub`).',
    'A section has small sub-groups that need their own quiet heading (`.section__title-sm`).',
  ],
  whenNot: [
    ['The page title, breadcrumbs and page actions at the top', 'page-header'],
    ['Parts people open one at a time (FAQ, long settings)', 'accordion'],
    ['Parts people switch between instead of scrolling', 'tabs'],
    ['Long reading text with headings (an article, rules)', 'prose'],
    ['A side list of the sections for jumping on a long page', 'outline', 'Use it next to sections, linked to their ids'],
    ['A bordered box that groups one object (a course, a person)', 'card'],
  ],
  where: 'The main column of the page, under the [page header](page-header), inside the [app shell](app-shell) or below a [top nav](top-nav). One `.sections` per page; it fills the content column (cap the column with `.measure` or the shell, not the sections). Gaps drop to 40 px below 720 px.',
  anatomy: [
    ['.sections', 'Required. The column, 48 px between sections (40 px on phones).'],
    ['section.section', 'Required. One part. Inside `.sections`: 20 px between its children and, after the first, 40 px top padding over a hairline.'],
    ['.section__head', 'Required. Holds the `h2` and the optional sub line, 6 px apart.'],
    ['.section__head h2', 'Required. Title 2 (Title 1 from 900 px), balanced wrapping. A standalone `.section` outside `.sections` uses the smaller Title 3.'],
    ['.section__sub', 'Optional. One sentence about the section, subhead size, 68 characters wide at most.'],
    ['.section__title-sm', 'Optional. A quiet `h3` (headline size) for a sub-group inside a section.'],
  ],
  examples: [
    {
      title: 'A course page',
      desc: 'Headings and space do the grouping; content inside each section uses the normal components.',
      html: `<div class="sections" style="width: 100%;">
  <section class="section" aria-labelledby="sx-1">
    <div class="section__head"><h2 id="sx-1">This week</h2><p class="section__sub">What is due before Friday and where the class meets.</p></div>
    <div class="list">
      <a class="lrow" href="#"><span class="lrow__body"><span class="lrow__title">Lab report 3</span></span><span class="badge badge--warning">Tomorrow</span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></a>
      <a class="lrow" href="#"><span class="lrow__body"><span class="lrow__title">Quiz: indexing</span></span><span class="badge">Thu</span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></a>
    </div>
  </section>
  <section class="section" aria-labelledby="sx-2">
    <div class="section__head"><h2 id="sx-2">Materials</h2></div>
    <p class="section__sub">Slides and readings are added after each lecture.</p>
  </section>
</div>`,
    },
    {
      title: 'Sub-groups inside a section',
      desc: '`.section__title-sm` heads the smaller groups; the section heading stays the only large one.',
      html: `<div class="sections" style="width: 100%;">
  <section class="section" aria-labelledby="sx-3">
    <div class="section__head"><h2 id="sx-3">Account</h2><p class="section__sub">How you sign in and what we send you.</p></div>
    <div class="stack" style="--gap: 10px;">
      <h3 class="section__title-sm">Sign in</h3>
      <dl class="kv-list"><div class="kv"><dt>Email</dt><dd>siti@campus.ac.id</dd></div><div class="kv"><dt>Password</dt><dd>Changed 3 months ago</dd></div></dl>
    </div>
    <div class="stack" style="--gap: 10px;">
      <h3 class="section__title-sm">Notifications</h3>
      <label class="switch"><input type="checkbox" role="switch" checked><span class="switch__track" aria-hidden="true"><span class="switch__thumb"></span></span>Class reminders</label>
    </div>
  </section>
</div>`,
    },
  ],
  variants: [
    ['.sections > .section', 'Page sections: Title 2 or 1 heading, hairline between them.'],
    ['.section (standalone)', 'A titled group inside something else (a dialog, a side panel): Title 3 heading, 12 px gaps, no hairline.'],
  ],
  motion: [
    'Sections do not animate by themselves. Content inside them may arrive with [reveal on scroll](reveal-on-scroll) (`data-lds-reveal`), once, below the fold only.',
    'Never stagger whole sections on load; the page should be readable at once.',
  ],
  a11y: [
    'Each section is a `<section>` with `aria-labelledby` pointing at its `h2`, so it appears as a region in the landmarks list.',
    'Keep heading levels in order: the page `h1` in the header, `h2` per section, `h3` (`.section__title-sm`) inside.',
    'Give sections ids when an [outline](outline) or links jump to them.',
  ],
  do: [
    'Name sections for what people do or find there ("This week", "Materials").',
    'Let lists, key values and stats sit directly in a section without a wrapper card.',
  ],
  dont: [
    'Wrap every section in a `.card` or add borders; the hairline and space already separate them.',
    'Add extra margins between sections; the 48 px rhythm is the system.',
    'Write a section heading in all caps or as an eyebrow.',
  ],
  related: ['page-header', 'spotlight', 'link-card', 'outline'],
};
