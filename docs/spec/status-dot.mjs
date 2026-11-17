export default {
  title: 'Status dot',
  group: 'Feedback',
  order: 10,
  summary: 'An 8 px colored dot followed by words, for the live state of a system, a service or a connection. The words say the state; the dot helps scanning.',
  when: [
    'The health or state of something that runs: a service is up, a sync is delayed, a town hall meeting stream is live.',
    'A column of states in a table or a list where a dot speeds up scanning ("Running", "Stopped").',
  ],
  whenNot: [
    ['The state of a record (Draft, Overdue, Approved)', 'badge'],
    ['A number of waiting items', 'count'],
    ['A person is online', 'avatar', 'Use `.avatar__presence` on the avatar'],
    ['A message about the whole app being offline', 'banner'],
  ],
  where: 'Inline, where the state is read: in a table cell, at the end of a list row, in a card header, in a footer ("All systems running"). The dot always comes before its words.',
  anatomy: [
    ['.status', 'Required. Inline flex row, 8 px gap, 14 px body text.'],
    ['i', 'Required. The 8 px dot, neutral by default.'],
    ['.status--ok|warn|down|live', 'The state: success, warning, danger, or success with a short pulse.'],
    ['text', 'Required. The state in words.'],
  ],
  examples: [
    {
      title: 'States',
      desc: 'Neutral for unknown or stopped, then ok, warning, down and live.',
      html: `<div class="docs-col" style="max-width: 320px;">
  <span class="status"><i aria-hidden="true"></i>Not started</span>
  <span class="status status--ok"><i aria-hidden="true"></i>All systems running</span>
  <span class="status status--warn"><i aria-hidden="true"></i>Tax data sync delayed</span>
  <span class="status status--down"><i aria-hidden="true"></i>Payments unavailable</span>
  <span class="status status--live"><i aria-hidden="true"></i>Live now</span>
</div>`,
    },
    {
      title: 'In a list',
      desc: 'At the end of each row, so the states line up.',
      stage: 'block',
      html: `<div class="list" style="max-width: 420px;">
  <div class="lrow"><div class="lrow__body"><div class="lrow__title">Service desk A</div><div class="lrow__sub">32 in queue</div></div><span class="status status--live"><i aria-hidden="true"></i>Open</span></div>
  <div class="lrow"><div class="lrow__body"><div class="lrow__title">Service desk B</div><div class="lrow__sub">28 in queue</div></div><span class="status status--warn"><i aria-hidden="true"></i>Opening late</span></div>
  <div class="lrow"><div class="lrow__body"><div class="lrow__title">Service desk C</div><div class="lrow__sub">Closed</div></div><span class="status"><i aria-hidden="true"></i>Ended</span></div>
</div>`,
    },
  ],
  variants: [
    ['status', 'Neutral dot: unknown, ended, off.'],
    ['status--ok', 'Running, healthy, connected.'],
    ['status--warn', 'Degraded, delayed, starting late.'],
    ['status--down', 'Stopped, failed, unavailable.'],
    ['status--live', 'Happening now; the dot pulses three times when it appears.'],
  ],
  motion: [
    '`status--live` pulses a ring out of the dot (`lds-live`, 1.8 s on `--ease-inout`) three times, then stays still. A forever pulse turns into noise.',
    'A state change swaps the dot color directly; change the words with [text morph](text-morph) if it happens in view.',
    'Reduced motion: the pulse plays once in 1 ms (effectively none).',
  ],
  a11y: [
    'The dot is `aria-hidden="true"`; the words are the state.',
    'If the state changes while the page is open and it matters (service went down), announce it with a `role="status"` line, not by making each dot live.',
  ],
  do: [
    'Write the state in plain words ("Payments unavailable").',
    'Use the same four meanings everywhere.',
  ],
  dont: [
    'Show a dot without words.',
    'Use it for record states like Draft or Paid; use a [badge](badge).',
    'Make the live pulse loop forever.',
  ],
  related: ['badge', 'count', 'banner', 'avatar'],
};
