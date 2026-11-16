export default {
  title: 'Pull to refresh',
  group: 'Microinteractions',
  order: 15,
  status: 'new',
  summary: 'Drag a phone list down from the top: the content follows with resistance, a spinner turns as it comes in, and past 56 px a release refreshes. The spinner holds until the work is done, at least 700 ms so it never flickers.',
  when: [
    'A phone list whose content changes on the server while people look at it: a schedule, activity, an inbox.',
    'A screen people open to check for something new.',
  ],
  whenNot: [
    ['A list that updates itself in real time', 'status-dot', 'Show that it is live instead'],
    ['Loading the next page at the bottom of a list', 'spinner'],
    ['A desktop table', 'table', 'Use a Refresh button in its toolbar'],
  ],
  where: 'On the `.phone__scroll` of a top-level screen, with the `.refresh` indicator as its first child and `.navbar-gap` as the spacer. The spinner appears between the nav bar and the large title.',
  anatomy: [
    ['.phone__scroll[data-lds-refresh]', 'Required. The scroller. Its children (except the gap and the indicator) move down by `--pull`.'],
    ['.refresh', 'Required. Holds a [spinner](spinner) whose opacity and turn follow `--pull-p` (0 to 1). `aria-hidden`.'],
  ],
  examples: [
    {
      title: 'Refresh a schedule',
      desc: 'Drag the list down with the mouse or a finger and let go past the spinner. The button does the same thing for people who cannot drag.',
      stage: 'phone',
      html: `<div class="phone phone--inline" style="height: 500px; --phone-top: 0px;">
  <div class="navbar" id="ptr-bar"><span></span><span class="navbar__title" aria-hidden="true">Today</span><div class="navbar__end"><button type="button" class="icon-btn" aria-label="Refresh" data-lds-refresh-for="ptr-scroll"><span class="ic" aria-hidden="true">refresh</span></button></div></div>
  <div class="phone__scroll" id="ptr-scroll" data-lds-navbar="ptr-bar" data-lds-refresh>
    <div class="refresh" aria-hidden="true"><span class="spinner" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span></div>
    <div class="navbar-gap"></div>
    <h3 class="large-title">Today</h3>
    <div style="padding: 12px 16px 40px;"><div class="list list--fill">
      <div class="lrow"><span class="lrow__body"><span class="lrow__title">Database Systems</span><span class="lrow__sub">08:00 · Room H 2.14</span></span></div>
      <div class="lrow"><span class="lrow__body"><span class="lrow__title">Computer Networks</span><span class="lrow__sub">13:00 · Lab 3.01</span></span></div>
      <div class="lrow"><span class="lrow__body"><span class="lrow__title">Software Engineering</span><span class="lrow__sub">15:30 · Room H 3.05</span></span></div>
    </div></div>
  </div>
</div>`,
      code: `<div class="phone__scroll" data-lds-navbar="today-bar" data-lds-refresh>
  <div class="refresh" aria-hidden="true"><span class="spinner" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span></div>
  <div class="navbar-gap"></div>
  <h1 class="large-title">Today</h1>
  …
</div>
<script type="module">
  import { toast } from 'lampung-design-system/js';
  scroller.addEventListener('lds:refresh', (e) => e.detail.wait(loadSchedule().then(() => toast({ title: 'Schedule is up to date' }))));
</script>`,
    },
  ],
  states: [
    ['.is-pulling', 'Following the finger; no transition.'],
    ['.is-refreshing', 'Held at 56 px with the spinner turning; `aria-busy="true"` on the scroller.'],
  ],
  motion: [
    'The pull follows the finger with resistance: `over·200·0.55 / (200 + 0.55·over)`, so it slows as it grows and never passes 200 px.',
    'The spinner fades in and turns up to 270° with the pull, and only starts spinning once the refresh runs.',
    'Release short of 56 px: the content springs back on `--spring-smooth`. Past it: it settles at 56 px, holds while working (at least 700 ms), then springs back.',
    'Reduced motion: the return becomes a 120 ms linear move; the pull still follows the finger.',
  ],
  a11y: [
    'A pull is never the only way: offer a Refresh button or refresh on revisit, and call `startRefresh(scroller)` from it.',
    'Say the result in words (a toast like "Schedule is up to date"), not only by the spinner going away.',
    'The scroller gets `aria-busy="true"` while refreshing.',
  ],
  do: [
    'Use it only on screens whose content can change while people look.',
    'Wait for the real request with `e.detail.wait(promise)`.',
  ],
  dont: [
    'Add it to screens inside a sheet or a pushed form.',
    'Show a second spinner in the list at the same time.',
  ],
  js: '`data-lds-refresh` on the scroller: touch drags (the default overscroll is held back while pulling) and mouse drags from the top. Fires `lds:refresh` with `wait(promise)` on the scroller. `startRefresh(scroller)` runs it without a gesture; a button with `data-lds-refresh-for="scrollerId"` does the same without script.',
  related: ['phone-bars', 'spinner', 'toast', 'drag-and-momentum'],
};
