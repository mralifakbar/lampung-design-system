const RING = "const b = this.closest('.docs-row').querySelector('.bell'); b.classList.remove('is-ringing'); void b.offsetWidth; b.classList.add('is-ringing'); const c = this.closest('.docs-row').querySelector('.count'); c.hidden = false; c.textContent = Number(c.textContent || 0) + 1;";

export default {
  title: 'Bell',
  group: 'Microinteractions',
  order: 6,
  summary: 'The bell icon rings once, a short swing from its top that settles in 640 ms, when notifications are turned on or a new one arrives. Once, never on a loop: it acknowledges, it does not nag.',
  when: [
    'A switch turns notifications or reminders on: the bell inside the switch label rings as the thumb lands.',
    'A notification arrives while the person is looking at the screen: the bell in the top bar rings once and the count appears.',
  ],
  whenNot: [
    ['A notification the person must read now', 'banner'],
    ['A message that confirms an action', 'toast'],
    ['An unread count on its own', 'count'],
    ['A refused action', 'shake'],
    ['Something new in the product to explain', 'coachmark'],
  ],
  where: 'On a notifications icon only: inside a `.switch` label, or in an [icon button](icon-button) in the top bar or app shell.',
  anatomy: [
    ['.bell', 'Required. On the `notifications` icon (`<span class="bell ic">`). Swings from 50 % 10 % (the top of the bell).'],
    ['.is-ringing', 'Plays the ring once. Remove and re-add it to ring again.'],
  ],
  examples: [
    {
      title: 'Turning notifications on',
      desc: 'Switch it on: the thumb lands and stretches, and the bell rings once. Switching off is silent.',
      html: `<label class="switch"><input type="checkbox" role="switch"><span class="switch__track" aria-hidden="true"><span class="switch__thumb"></span></span><span class="bell ic" aria-hidden="true">notifications</span>Notify me when my report gets a response</label>`,
    },
    {
      title: 'A new notification arrives',
      desc: 'Simulate one: the bell rings once and the count goes up. A second arrival rings again from the start.',
      html: `<div class="docs-row">
  <button class="icon-btn" aria-label="Notifications" style="position: relative;"><span class="bell ic" aria-hidden="true">notifications</span><span class="count" hidden style="position: absolute; top: 6px; right: 4px;"></span></button>
  <button class="btn btn--secondary btn--sm" onclick="${RING}">Simulate a notification</button>
</div>`,
      code: `<button class="icon-btn" aria-label="Notifications, 2 unread">
  <span class="bell ic" aria-hidden="true">notifications</span>
  <span class="count">2</span>
</button>
// on arrival: bell.classList.remove('is-ringing'); void bell.offsetWidth; bell.classList.add('is-ringing');`,
    },
  ],
  motion: [
    '`lds-ring` over 640 ms on `--ease-standard`: rotate 15, −12, 8, −4, 2, 0 degrees, pivoting at the top of the bell. The swing shrinks to rest like a real bell.',
    'Plays once per event. In a switch it rings only when turned on, after the thumb starts moving (the switch also plays its 340 ms landing stretch).',
    'Interruption: a new event restarts the ring from 0 (remove the class, force a reflow, add it).',
    'Reduced motion: no ring; the switch state and the count change carry the meaning.',
  ],
  a11y: [
    'The bell is `aria-hidden`; the switch label or the button label says what it is ("Notifications, 2 unread").',
    'Update the button label when the count changes; do not rely on the ring to announce anything.',
  ],
  do: [
    'Ring once per event.',
    'Keep it on the notifications icon only.',
    'Pair it with a count or a switch state.',
  ],
  dont: [
    'Loop the ring or ring on page load.',
    'Ring for every notification in a burst; ring once for the group.',
    'Use the ring on other icons.',
  ],
  js: 'Inside a `.switch`, `init()` rings any `.bell` in the label when the switch turns on. Elsewhere, toggle `.is-ringing` yourself.',
  react: `import { Switch } from 'lampung-design-system/react';

<Switch checked={notify} onChange={setNotify}>Notify me when my report gets a response</Switch>
// Switch does not ring a bell itself: render <span className={\`bell ic\${ring ? ' is-ringing' : ''}\`}>notifications</span> beside it and set ring when it turns on.`,
  related: ['switch', 'count', 'icon-button', 'haptics'],
};
