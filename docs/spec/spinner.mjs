export default {
  title: 'Spinner',
  group: 'Feedback',
  order: 6,
  summary: 'Eight fading spokes that say "working" for a short wait with no measurable progress. It sits where the result will appear and never blocks the whole page.',
  when: [
    'A short wait (roughly half a second to a few seconds) with nothing to measure: refreshing a list, checking a code, loading the next page of results.',
    'Inside a control that is busy, such as a row action or a confirm in place.',
    'At the end of a list while more items load.',
  ],
  whenNot: [
    ['A button is running its action', 'button', 'Use `.is-loading` with `btn__label` and `btn__spin`; the button keeps its width'],
    ['Content is loading and its layout is known', 'skeleton'],
    ['The work has a measurable size', 'progress-bar'],
    ['Long work of unknown length (an assistant, a report) where elapsed time matters', 'thinking'],
    ['A page is loading after a link was followed', 'nav-progress'],
  ],
  where: 'Where the result will appear: centred in the area that is refreshing, at the trailing end of a list row that is busy, below the last item when more load. 20 px inline, 32 px (`spinner--lg`) centred in a panel. Never a full-screen overlay with a spinner.',
  anatomy: [
    ['.spinner', 'Required. A 20 px box (`--s`) in the current text color (`--c`).'],
    ['i x 8', 'Required. The eight spokes; each fades on a staggered delay.'],
    ['.spinner--lg', '32 px with thicker spokes, for centred panel loading.'],
  ],
  examples: [
    {
      title: 'Sizes and color',
      desc: '20 px inline, 32 px centred. It takes the text color; set `--c` for another.',
      html: `<div class="docs-row" style="gap: 28px; color: var(--text-subtle);">
  <span class="spinner" role="status" aria-label="Loading"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>
  <span class="spinner spinner--lg" role="status" aria-label="Loading"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>
  <span class="spinner" style="--c: var(--accent);" role="status" aria-label="Loading"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>
</div>`,
    },
    {
      title: 'Loading more at the end of a list',
      desc: 'The spinner sits where the next rows will appear, with words.',
      stage: 'block',
      html: `<div class="list" style="max-width: 420px;">
  <div class="lrow"><div class="lrow__body"><div class="lrow__title">Tryout 12: general knowledge</div><div class="lrow__sub">Score 412</div></div></div>
  <div class="lrow"><div class="lrow__body"><div class="lrow__title">Tryout 11: verbal reasoning</div><div class="lrow__sub">Score 388</div></div></div>
  <div class="lrow" role="status" style="justify-content: center; color: var(--text-subtle);"><span class="spinner" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span><span class="lrow__sub" style="margin: 0;">Loading older tryouts</span></div>
</div>`,
    },
    {
      title: 'A busy row action',
      desc: 'The row stays in place; only its trailing control changes.',
      stage: 'block',
      html: `<div class="list" style="max-width: 420px;">
  <div class="lrow" aria-busy="true"><div class="lrow__body"><div class="lrow__title">Bank transfer</div><div class="lrow__sub">Checking your payment</div></div><span class="spinner" style="color: var(--text-subtle);" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span></div>
</div>`,
    },
  ],
  variants: [
    ['spinner', '20 px. Inline and in rows.'],
    ['spinner--lg', '32 px. Centred in a panel or an empty region while it loads.'],
    ['--c', 'Spoke color. Defaults to `currentColor`.'],
    ['--s', 'Any other size (the button uses 18 px).'],
  ],
  motion: [
    'Each spoke runs `lds-spoke` (opacity 1 to 0.18) over 800 ms linear, delays stepping 100 ms around the circle, so the light appears to turn without anything rotating.',
    'Reduced motion keeps the spinner turning on purpose: it reports work, and stopping it would look frozen.',
    'Show it only after about 300 ms of waiting, so fast responses never flash a spinner.',
  ],
  a11y: [
    'Standalone: `role="status"` with `aria-label="Loading"` (or what is loading), so it is announced once.',
    'Inside something that already says it is busy (`aria-busy="true"` on a region or button, or a status line with words): `aria-hidden="true"` on the spinner.',
    'When loading ends, the new content or a status line says the result; remove the spinner, do not leave it hidden but announced.',
  ],
  do: [
    'Delay it about 300 ms so quick loads never show it.',
    'Put it where the content will land.',
    'Add words when the wait may pass two seconds.',
  ],
  dont: [
    'Block the page with a full-screen spinner overlay.',
    'Replace a button label with a bare spinner; use the button loading state.',
    'Use it for loads where the layout is known; use a [skeleton](skeleton).',
  ],
  react: `import { Spinner } from 'lampung-design-system/react';

<span role="status" aria-label="Loading results"><Spinner /></span>
<Spinner size="lg" />`,
  related: ['button', 'skeleton', 'progress-bar', 'thinking'],
};
