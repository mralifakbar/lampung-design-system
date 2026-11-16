const SWAP = (a, b, fillB = false) => `<span class="swap" aria-hidden="true"><span class="ic swap__a">${a}</span><span class="ic${fillB ? ' ic--fill' : ''} swap__b">${b}</span></span>`;
const TOGGLE = (on, off) => `this.querySelector('.swap').classList.toggle('is-swapped'); const p = this.getAttribute('aria-pressed') !== 'true'; this.setAttribute('aria-pressed', String(p)); this.setAttribute('aria-label', p ? '${on}' : '${off}');`;

export default {
  title: 'Icon swap',
  group: 'Microinteractions',
  order: 5,
  summary: 'One glyph turns into another in place: the old one shrinks to half and blurs away while the new one settles on a snappy spring. For icons that say a new state (copied, playing, saved), not for decoration.',
  when: [
    'A copy button confirms it worked: `content_copy` becomes `check` for 1.6 s ([copy button](copy-button) does this).',
    'A toggle whose icon names the state: play and pause, bookmark and saved, show and hide password.',
    'An icon button whose action changes after use: expand and collapse when the label is not shown.',
  ],
  whenNot: [
    ['Words change (Save, Saved)', 'text-morph'],
    ['Endorsing with a count and a celebration', 'like'],
    ['Menu icon to close icon', 'menu-icon', 'The three bars fold instead of swapping.'],
    ['A chevron that turns with an opening panel', 'height-expand', 'Rotate it on the same spring as the panel.'],
    ['A selected state that just fills the icon (tab bar, sidebar)', 'sliding-indicator'],
  ],
  where: 'Inside a button: an [icon button](icon-button), a small plain button next to a label, a code block bar. The swap box is 20 px; both glyphs sit in the same grid cell.',
  anatomy: [
    ['.swap', 'Required. `aria-hidden` inline grid, 20 × 20.'],
    ['.swap__a', 'Required. The resting glyph.'],
    ['.swap__b', 'Required. The other glyph (add `ic--fill` for a filled state).'],
    ['.is-swapped', 'On `.swap`: shows `swap__b`.'],
  ],
  examples: [
    {
      title: 'Copy, then copied',
      desc: 'Press copy: the icon becomes a check and the label says Copied, then both come back after 1.6 s.',
      html: `<div class="codeblock" style="width: 100%; max-width: 420px;"><div class="codeblock__bar"><span>Install</span><button class="btn btn--plain btn--sm" data-lds-copy="npm install lampung-design-system">${SWAP('content_copy', 'check')}<span data-lds-copy-label="Copied">Copy</span></button></div><pre>npm install lampung-design-system</pre></div>
<button class="icon-btn" aria-label="Copy the class link" data-lds-copy="https://campus.ac.id/join/BIO101">${SWAP('link', 'check')}</button>`,
    },
    {
      title: 'Play and pause',
      desc: 'A lecture recording. The icon is the state, so it swaps; the label follows for screen readers.',
      html: `<button class="icon-btn icon-btn--accent" aria-pressed="false" aria-label="Play lecture" onclick="${TOGGLE('Pause lecture', 'Play lecture')}">${SWAP('play_arrow', 'pause')}</button>
<span class="card__sub">Lecture 6: Cell membranes, 48 min</span>`,
    },
    {
      title: 'Save for later',
      desc: 'Bookmarking a lesson: the outline swaps to the filled icon. Quiet on purpose; there is no count and no burst.',
      html: `<button class="icon-btn" aria-pressed="false" aria-label="Save lesson" onclick="${TOGGLE('Saved lesson', 'Save lesson')}">${SWAP('bookmark', 'bookmark', true)}</button>
<button class="icon-btn" aria-pressed="false" aria-label="Show password" onclick="${TOGGLE('Hide password', 'Show password')}">${SWAP('visibility', 'visibility_off')}</button>`,
    },
  ],
  motion: [
    'Leaving glyph: to `scale(0.5)` with `blur(4px)` and opacity 0; opacity and blur over `--d-fast` (160 ms) on `--ease-standard`, scale on `--spring-snappy`.',
    'Arriving glyph: from the same state to `none` on `--spring-snappy` (`--d-snappy`, 360 ms) while it fades in over `--d-fast`. Both run at once, so the swap reads as one object changing.',
    'Interruption: toggling `.is-swapped` again mid-swap reverses both glyphs from where they are.',
    'Reduced motion: a 120 ms cross-fade with no scale.',
  ],
  a11y: [
    'The swap is `aria-hidden`. The button carries the meaning: `aria-pressed` for toggles, and an `aria-label` that names the action now available ("Pause lecture").',
    'Copy announces nothing by itself; when it matters, keep a visible label that changes (`data-lds-copy-label`) or add a polite status.',
  ],
  do: [
    'Swap between two glyphs that mean two states of the same thing.',
    'Change `aria-label` or `aria-pressed` with the glyph.',
    'Use `ic--fill` on `swap__b` for a filled "on" state.',
  ],
  dont: [
    'Rotate or flip icons to swap them.',
    'Swap icons on hover.',
    'Use the swap for menu to close; use [menu icon](menu-icon).',
  ],
  js: 'CSS only: toggle `.is-swapped` on `.swap`. `[data-lds-copy]` does it for copy buttons (and restores after 1.6 s, with `data-lds-copy-label` for the visible label).',
  related: ['copy-button', 'icon-button', 'toggle', 'text-morph'],
};
