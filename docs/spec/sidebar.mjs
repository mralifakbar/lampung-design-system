const pick = `const b = event.target.closest('.sidebar__item'); if (!b) return; this.querySelectorAll('.sidebar__item').forEach((x) => x.removeAttribute('aria-current')); b.setAttribute('aria-current', 'page'); this.querySelector('.sidebar__hl').style.transform = 'translateY(' + b.offsetTop + 'px)';`;

export default {
  title: 'Sidebar',
  group: 'Navigation',
  order: 8,
  summary: 'A bordered panel of links with one sliding highlight, placed inside the content: the sections of a settings page, the folders of an inbox. Not the frame of the app.',
  when: [
    'A page has its own secondary sections listed beside the content: Settings (Profile, Notifications, Billing), a help center category, inbox folders.',
    'A two-column layout (`split-2`) where the left column lists what the right column shows.',
  ],
  whenNot: [
    ['The main navigation of the whole app, sticky at full height with a phone drawer', 'app-shell', 'The shell already has a highlight, groups and sections'],
    ['Site-wide links across the top', 'top-nav'],
    ['Jumping to headings of one long page', 'outline'],
    ['Two to five sibling sections that fit across the page', 'tabs'],
    ['A tree of folders that open and close', 'tree'],
  ],
  where: 'In the left column of a `split-2` inside the content, 240 px wide, at the top of that column. Below 860 px `split-2` stacks it above the content; on phones prefer a [list](list) of links that each open a page.',
  anatomy: [
    ['nav.sidebar', 'Required. The panel with `aria-label`; base background, 1 px line, 16 px radius.'],
    ['.sidebar__hl', 'Required. The single highlight; first child, `aria-hidden`. Move it with `transform: translateY(<item offsetTop>px)`.'],
    ['.sidebar__head', 'A caption above a group of items.'],
    ['.sidebar__item', 'Required. A link or button: `.ic` + text (+ `.sidebar__badge`). `aria-current="page"` on the current one.'],
    ['.sidebar__badge', 'A quiet count at the end of the item.'],
  ],
  examples: [
    {
      title: 'Workspace sections',
      desc: 'Pick an item: the highlight glides to it on a spring instead of each item lighting up.',
      stage: 'fill',
      html: `<nav class="sidebar" aria-label="Workspace" onclick="${pick}">
  <span class="sidebar__hl" aria-hidden="true" style="transform: translateY(120px);"></span>
  <span class="sidebar__head">Workspace</span>
  <button class="sidebar__item"><span class="ic" aria-hidden="true">home</span>Home</button>
  <button class="sidebar__item"><span class="ic" aria-hidden="true">calendar_month</span>Schedule</button>
  <button class="sidebar__item" aria-current="page"><span class="ic" aria-hidden="true">menu_book</span>Courses<span class="sidebar__badge">6</span></button>
  <button class="sidebar__item"><span class="ic" aria-hidden="true">assignment</span>Assignments<span class="sidebar__badge">3</span></button>
  <button class="sidebar__item"><span class="ic" aria-hidden="true">receipt_long</span>Billing</button>
  <button class="sidebar__item"><span class="ic" aria-hidden="true">settings</span>Settings</button>
</nav>`,
      code: `<nav class="sidebar" aria-label="Workspace">
  <span class="sidebar__hl" aria-hidden="true" style="transform: translateY(120px);"></span>
  <span class="sidebar__head">Workspace</span>
  <a class="sidebar__item" href="/home"><span class="ic" aria-hidden="true">home</span>Home</a>
  <a class="sidebar__item" href="/courses" aria-current="page"><span class="ic" aria-hidden="true">menu_book</span>Courses<span class="sidebar__badge">6</span></a>
</nav>
<script type="module">
  // Move the one highlight to the current item
  const nav = document.querySelector('.sidebar');
  const cur = nav.querySelector('[aria-current="page"]');
  nav.querySelector('.sidebar__hl').style.transform = \`translateY(\${cur.offsetTop}px)\`;
</script>`,
    },
    {
      title: 'Settings page beside its content',
      desc: 'In the left column of `split-2`; stacks above the content below 860 px.',
      stage: 'block',
      html: `<div class="split-2" style="--side: 240px;">
  <nav class="sidebar" aria-label="Settings">
    <span class="sidebar__hl" aria-hidden="true" style="transform: translateY(10px);"></span>
    <a class="sidebar__item" href="#sb2" aria-current="page"><span class="ic" aria-hidden="true">person</span>Profile</a>
    <a class="sidebar__item" href="#sb2"><span class="ic" aria-hidden="true">notifications</span>Notifications</a>
    <a class="sidebar__item" href="#sb2"><span class="ic" aria-hidden="true">lock</span>Password and sign in</a>
  </nav>
  <div class="section" id="sb2">
    <div class="section__head"><h2>Profile</h2><p class="section__sub">How your name and photo appear to lecturers and classmates.</p></div>
  </div>
</div>`,
    },
  ],
  states: [
    ['aria-current="page"', 'Accent text at weight 500 and a filled icon; the highlight sits behind it.'],
    ['hover', 'A quiet tint on the item.'],
    ['focus', 'System focus ring.'],
  ],
  motion: [
    'Highlight: one `.sidebar__hl` translates on `--spring-smooth` over `--d-smooth` (560 ms); a second click mid-glide retargets it smoothly. Item text color eases over `--d-fast`.',
    'Set the first position without a transition (`transition: none` for one frame) so the highlight does not fly in on load.',
    'Reduced motion: the highlight moves in 120 ms linear.',
  ],
  a11y: [
    'A `<nav aria-label>`; items are links when they change the URL, buttons when they swap content in place.',
    'Mark the current item with `aria-current="page"`, not only with the highlight.',
    'Badges are read as part of the name; keep them numeric and meaningful.',
  ],
  do: [
    'Use one highlight and move it; never tint each item on its own.',
    'Keep the list short (under ten items) and the labels to a few words.',
  ],
  dont: [
    'Use the sidebar as the app frame; that is the [app shell](app-shell).',
    'Put a sidebar inside an app shell sidebar.',
    'Collapse it to icons only; labels are what make it scannable.',
  ],
  js: 'None. Move `aria-current` and set `.sidebar__hl` `transform: translateY(<offsetTop>px)` from your code. The [app shell](app-shell) does this by itself for the main navigation.',
  related: ['app-shell', 'outline', 'sliding-indicator', 'layout-primitives'],
};
