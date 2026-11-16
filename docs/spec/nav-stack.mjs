export default {
  title: 'Navigation stack',
  group: 'Navigation',
  order: 13,
  status: 'new',
  summary: 'Push a detail screen in from the right over the one you came from, and go back with the back button or by dragging the screen away from the left edge. The screen underneath slides at 30 % and dims, so people always know where back leads.',
  when: [
    'A phone app where a row opens its detail: a course from a list, a payment from activity, a project from projects.',
    'Drilling two or three levels into one area of an app while the tab bar stays put.',
    'A settings area on a phone where each row opens its own screen.',
  ],
  whenNot: [
    ['Switching between top-level areas', 'phone-bars', 'Tabs swap without sliding; each tab keeps its own stack'],
    ['A focused task that should keep the screen in view', 'sheet'],
    ['Steps of a form going forward and back', 'view-swap'],
    ['A wide screen with a list beside its detail', 'resizable-split'],
  ],
  where: 'Fills a tab of a [phone screen](phone-screen): `.navstack` absolute over the whole screen, under the tab bar. Each `.navstack__view` is a full screen with its own `.navbar` and `.phone__scroll`. The first view has a large title; pushed views use `.navbar--inline` with a back button.',
  anatomy: [
    ['.navstack[data-lds-navstack]', 'Required. The positioned container. The first visible view is the root.'],
    ['.navstack__view', 'Required. One screen. Views that are not in the stack are `hidden`.'],
    ['[data-lds-nav="viewId"]', 'On a row or button: pushes that view. Fill the view first (listen to the click in the capture phase).'],
    ['.navbar.navbar--inline', 'The bar of a pushed screen: the small title is always shown, the material appears on scroll.'],
    ['.navbar__back[data-lds-back]', 'The back button: chevron plus the previous screen\'s title, in the accent text color.'],
    ['h1.navbar__title', 'On pushed screens the bar title is the screen\'s heading; focus moves to it on push.'],
    ['.navbar-gap', 'Spacer at the top of the scroller with the height of the bar.'],
  ],
  examples: [
    {
      title: 'Courses to a course',
      desc: 'Open a course: it slides in over the list. Press back, or drag the screen from its left edge and let go past halfway (a quick flick counts its speed).',
      stage: 'phone',
      html: `<div class="phone phone--inline" style="height: 560px;">
  <div class="navstack" data-lds-navstack>
    <section class="navstack__view" aria-label="Courses">
      <div class="navbar" id="ns-root-bar" style="height: 64px; padding-top: 14px;"><span></span><span class="navbar__title" aria-hidden="true">Courses</span><span></span></div>
      <div class="phone__scroll" data-lds-navbar="ns-root-bar">
        <div style="height: 64px;"></div>
        <h3 class="large-title">Courses</h3>
        <div style="padding: 12px 16px 40px;"><div class="list list--fill">
          <button type="button" class="lrow" data-lds-nav="ns-course"><span class="lrow__body"><span class="lrow__title">Database Systems</span><span class="lrow__sub">IF 3104 · Mon and Thu, 08:00</span></span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></button>
          <button type="button" class="lrow" data-lds-nav="ns-course"><span class="lrow__body"><span class="lrow__title">Computer Networks</span><span class="lrow__sub">IF 3112 · Mon, 13:00</span></span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></button>
        </div></div>
      </div>
    </section>
    <section class="navstack__view" id="ns-course" aria-label="Database Systems" hidden>
      <div class="navbar navbar--inline" id="ns-course-bar" style="height: 64px; padding-top: 14px;">
        <span><button type="button" class="navbar__back" data-lds-back aria-label="Back to Courses"><span class="ic" aria-hidden="true">arrow_back_ios_new</span><span>Courses</span></button></span>
        <h3 class="navbar__title">Database Systems</h3><span></span>
      </div>
      <div class="phone__scroll" data-lds-navbar="ns-course-bar">
        <div style="height: 64px;"></div>
        <div style="padding: 12px 16px 40px;"><dl class="kv-list"><div class="kv"><dt>Lecturer</dt><dd>Dr. Ayu Rahmawati</dd></div><div class="kv"><dt>Room</dt><dd>H 2.14</dd></div><div class="kv"><dt>Credits</dt><dd>3</dd></div></dl></div>
      </div>
    </section>
  </div>
</div>`,
      code: `<div class="navstack" data-lds-navstack>
  <section class="navstack__view" aria-label="Courses">
    <div class="navbar" id="courses-bar">…</div>
    <div class="phone__scroll" data-lds-navbar="courses-bar">
      <div class="navbar-gap"></div>
      <h1 class="large-title">Courses</h1>
      <button class="lrow" data-lds-nav="course">…Database Systems…</button>
    </div>
  </section>
  <section class="navstack__view" id="course" aria-label="Database Systems" hidden>
    <div class="navbar navbar--inline" id="course-bar">
      <span><button class="navbar__back" data-lds-back aria-label="Back to Courses"><span class="ic" aria-hidden="true">arrow_back_ios_new</span><span>Courses</span></button></span>
      <h1 class="navbar__title">Database Systems</h1>
      <span></span>
    </div>
    <div class="phone__scroll" data-lds-navbar="course-bar">…</div>
  </section>
</div>`,
    },
  ],
  states: [
    ['.navstack__view.is-under', 'Covered by a pushed screen: at −30 %, dimmed by the scrim color at half strength, and `inert`.'],
    ['.navstack__view.is-off', 'Off to the right: before it enters and after it leaves.'],
    ['.navstack__view.is-dragging', 'Following the finger during an edge drag; no transition.'],
    ['.navstack.is-moving', 'A screen is moving: the top one casts the large shadow, because it floats over the other.'],
  ],
  motion: [
    'Push: the new screen enters from `translateX(100%)` on `--spring-smooth` over `--d-smooth` (560 ms); the one under it moves to −30 % and dims on the same spring.',
    'Back button: the top screen leaves in 280 ms on `--ease-exit`, the one under it returns on `--spring-smooth`.',
    'Edge drag (from the first 28 px): 8 px of slop decides between a horizontal drag and a scroll; the screen follows 1:1 and the one under it moves at 30 % of the distance. On release the end point is projected with the velocity (rate 0.99); past half the width it pops on `--spring-momentum`, otherwise both spring back. Any push or pop can be interrupted by the next one.',
    'Reduced motion: screens cross-fade in 120 ms with no sliding.',
  ],
  a11y: [
    'On push, focus moves to the pushed screen\'s heading (or `[data-lds-autofocus]`); on pop, it returns to the row that opened the screen.',
    'Covered screens are `inert`, so neither Tab nor a screen reader reaches them.',
    'The back button is a real button with `aria-label="Back to Courses"`; the drag is only a shortcut.',
    'Give each view an `aria-label` with its title.',
  ],
  do: [
    'Show the previous title on the back button when it fits; the chevron alone when it does not.',
    'Keep the tab bar outside the stack so it stays still while screens move.',
    'Tapping the current tab again pops to the root (`popToRoot`).',
  ],
  dont: [
    'Slide between tabs; tabs swap in place.',
    'Push a screen for a short task; use a [sheet](sheet).',
    'Put horizontal swipes near the left edge of a pushed screen; the edge belongs to back.',
  ],
  js: '`data-lds-navstack` on the container, `data-lds-nav="viewId"` on triggers, `data-lds-back` on back buttons. Functions: `pushView(idOrEl, from)`, `popView(stackOrChild)`, `popToRoot(stackOrChild)`. Events on the view: `lds:push` `{ view, from }` and `lds:pop` `{ view, to }`, both bubbling. The stack is in `stack._views`, root first.',
  related: ['phone-bars', 'phone-screen', 'device-frame', 'sheet'],
};
