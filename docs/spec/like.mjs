const LIKE = (n, extra = '') => `<button class="like" aria-pressed="false" data-lds-like aria-label="Like"${extra}><span class="like__heart"><span class="ic" aria-hidden="true">favorite</span></span><span class="roll" data-lds-roll="${n}"></span></button>`;
const REFUSE = " onclick=\"if (this.getAttribute('aria-pressed') !== 'true') { const err = this.nextElementSibling; setTimeout(() => import('../../js/lds.js').then((m) => { m.likeRevert(this); err.hidden = false; }), 700); }\"";

export default {
  title: 'Like',
  group: 'Microinteractions',
  order: 3,
  summary: 'Endorsing something is optimistic: the heart fills, pops and throws seven sparks the moment it is pressed, and the count rolls up, before the server answers. If the server refuses, it rolls back with a shake and says why.',
  when: [
    'Endorsing a post, an answer or a comment, where the count is social proof: a forum answer, a shared note, a class announcement.',
    'Any toggle whose success is almost certain and cheap to undo, so waiting for the server would only add lag.',
  ],
  whenNot: [
    ['Saving something for yourself (bookmark, pin)', 'icon-swap', 'A quiet toggle; no burst, no count.'],
    ['Rating on a scale', 'rating'],
    ['Turning a setting on', 'switch'],
    ['Choosing filters or tags', 'chips'],
  ],
  where: 'Under or beside the content it endorses, at the start of its action row: a card footer, under a forum answer, in a [chat message](chat-message) action row when counts matter.',
  anatomy: [
    ['button.like', 'Required. `aria-pressed`, `aria-label="Like"`, `data-lds-like`. 36 px pill on the quiet fill.'],
    ['.like__heart', 'Required. Holds the `favorite` icon; JS adds seven `.like__spark` dots.'],
    ['.roll', 'Optional count, `data-lds-roll="<n>"`; rolls by one when toggled.'],
  ],
  examples: [
    {
      title: 'Like an answer',
      desc: 'Press the heart: it fills at once, pops and bursts; the count rolls to 129. Press again to take it back (no burst on the way off).',
      stage: 'fill',
      html: `<div class="card" style="max-width: 460px;">
  <p class="card__title">How I memorize the Krebs cycle</p>
  <p class="card__sub" style="margin-top: 6px;">Group the steps in threes and say them out loud on the way to class. It took me four days.</p>
  <div class="docs-row" style="margin-top: 14px;">${LIKE(128)}<button class="btn btn--plain btn--sm">Reply</button></div>
</div>`,
    },
    {
      title: 'When the server says no',
      desc: 'This one is refused after 700 ms: the heart empties, the count rolls back, the button shakes, and the reason appears in words.',
      html: `<div class="docs-col" style="max-width: 360px;">
  <div class="docs-row">${LIKE(41, REFUSE)}<span class="field__help field__help--error" hidden><span class="ic" aria-hidden="true">wifi_off</span>Could not save your like. You are offline.</span></div>
</div>`,
      code: `<button class="like" aria-pressed="false" data-lds-like aria-label="Like">
  <span class="like__heart"><span class="ic" aria-hidden="true">favorite</span></span>
  <span class="roll" data-lds-roll="41"></span>
</button>
<script type="module">
  import { likeRevert } from 'lampung-design-system/js';
  btn.addEventListener('lds:change', async (e) => {
    try { await saveLike(e.detail.pressed); }
    catch { likeRevert(btn); showReason('Could not save your like. You are offline.'); }
  });
</script>`,
    },
  ],
  states: [
    ['off', '`aria-pressed="false"`: outline heart on the quiet fill.'],
    ['on', '`aria-pressed="true"`: filled heart in danger red on the danger tint; count up by one.'],
    ['burst', '`.is-burst` for one play when turning on: seven sparks fly out.'],
    ['reverted', '`likeRevert(btn)`: back to off, count back, shake, error haptic.'],
  ],
  motion: [
    'Press: the pill sinks to 0.94 in 90 ms and springs back on `--spring-snappy`.',
    'Heart: `lds-heart` over 420 ms on `--spring-momentum`: from 0.6 to 1.18 at 55 %, then 1. The overshoot is earned: it is a celebration of a deliberate act.',
    'Sparks: seven 4 px dots at 51 degree steps travel from 6 to 17 px out while fading and shrinking to 0.3, 520 ms on `--ease-enter`. Only when turning on.',
    'Count: the `.roll` digits roll on `--spring-smooth`. Color and fill change over `--d-fast`.',
    'Interruption: pressing again mid-burst turns it off at once; the burst does not have to finish.',
    'Reduced motion: no sparks, no pop; the fill and count change in 120 ms.',
  ],
  a11y: [
    'A `<button>` with `aria-pressed` and `aria-label="Like"`; the count is read through the roll\'s `aria-label`. Name the object when there are many: `aria-label="Like this answer"`.',
    'The filled heart is not the only signal: `aria-pressed` and the color of the whole pill change too.',
    'A refused like says so in text next to it, not only by shaking.',
  ],
  do: [
    'Update the UI first, call the server second.',
    'Roll back with `likeRevert` and a reason on failure.',
    'Keep one like per item.',
  ],
  dont: [
    'Wait for the server before filling the heart.',
    'Play the burst when un-liking or on page load.',
    'Use the like burst for saving or bookmarking.',
  ],
  js: '`[data-lds-like]` on `init()`: toggles `aria-pressed`, plays the burst, rolls the count, a light haptic, and emits `lds:change` with `{ pressed }`. `likeRevert(btn)` undoes the last toggle and shakes.',
  related: ['icon-swap', 'number-count', 'shake', 'haptics'],
};
