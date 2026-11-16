export default {
  title: 'Coachmark',
  group: 'Feedback',
  order: 12,
  summary: 'An inverse card that points at one part of the interface with a short explanation, in a tour of at most three steps. Always skippable.',
  when: [
    'A new feature lives somewhere the person would not look, and one sentence pointing at it saves a support question.',
    'A short first-run tour (one to three steps) through a dense screen, such as the exam editor or a grade book.',
  ],
  whenNot: [
    ['A one-time tip that does not need to point at a control', 'hints'],
    ['Explaining a term or an icon on hover or focus', 'tooltip'],
    ['Rich, interactive content opened by a click', 'popover'],
    ['Announcing something about the whole app', 'banner'],
    ['The interface needs a tour of more than three steps', 'empty-state', 'Usually the screen needs a better first-run state, not a longer tour'],
  ],
  where: 'Directly under the control it explains, with its arrow aimed at it (the arrow is on the top edge, placed with `--arrow`). The container must be positioned (`position: relative`). On phones keep it inside the screen width (280 px card) and below the target.',
  anatomy: [
    ['.coach', 'Required. A 280 px inverse card, absolutely positioned inside a relative container; set `top`/`left` (or `transform`) to place it.'],
    ['.coach::before', 'The arrow on the top edge. Move it with `--arrow` (left offset, default 24 px); it glides when the value changes.'],
    ['.coach__step', '"Step 1 of 3".'],
    ['.coach__title', 'Required. What this is, in a few words.'],
    ['.coach__body', 'One sentence: why it helps.'],
    ['.btn.btn--sm', 'Skip (inverse tint) and Next or Done (`.btn--sm.is-primary`, accent).'],
    ['.is-lit', 'On the target: a ring in the accent with a gap, so the person sees what is meant.'],
  ],
  examples: [
    {
      title: 'A three-step tour',
      desc: 'The card glides to the next target and the arrow follows. Press Next.',
      stage: 'block',
      replay: true,
      html: `<div style="position: relative; min-height: 260px;" id="cm">
  <div class="docs-row">
    <button class="btn btn--secondary btn--md is-lit" data-step="0"><span class="ic" aria-hidden="true">search</span>Search</button>
    <button class="btn btn--secondary btn--md" data-step="1"><span class="ic" aria-hidden="true">filter_list</span>Filter</button>
    <button class="btn btn--primary btn--md" data-step="2"><span class="ic" aria-hidden="true">add</span>New note</button>
  </div>
  <div class="coach" role="dialog" aria-labelledby="cm-t" aria-describedby="cm-b" style="top: 64px; left: 0;">
    <div class="coach__step" id="cm-s">Step 1 of 3</div>
    <div class="coach__title" id="cm-t">Search every note</div>
    <div class="coach__body" id="cm-b">Find a note by any word in it, not only the title.</div>
    <div class="docs-row" style="gap: 8px; margin-top: 14px; justify-content: flex-end;">
      <button class="btn btn--sm" onclick="this.closest('.coach').hidden = true; document.querySelectorAll('#cm [data-step]').forEach((b) => b.classList.remove('is-lit'));">Skip</button>
      <button class="btn btn--sm is-primary" onclick="const box = document.getElementById('cm'); const c = box.querySelector('.coach'); const n = Number(c.dataset.n || 0) + 1; const t = [['Search every note', 'Find a note by any word in it, not only the title.'], ['Filter by course', 'Show only the notes from one course or one week.'], ['Start a new note', 'It saves as you type, even offline.']]; if (n > 2) { c.hidden = true; box.querySelectorAll('[data-step]').forEach((b) => b.classList.remove('is-lit')); return; } c.dataset.n = n; const target = box.querySelector('[data-step=&quot;' + n + '&quot;]'); box.querySelectorAll('[data-step]').forEach((b) => b.classList.toggle('is-lit', b === target)); c.style.transform = 'translateX(' + Math.max(0, target.offsetLeft - 8) + 'px)'; c.style.setProperty('--arrow', Math.min(240, target.offsetWidth / 2 + 2) + 'px'); document.getElementById('cm-s').textContent = 'Step ' + (n + 1) + ' of 3'; document.getElementById('cm-t').textContent = t[n][0]; document.getElementById('cm-b').textContent = t[n][1]; if (n === 2) this.textContent = 'Done';">Next</button>
    </div>
  </div>
</div>`,
      code: `<div style="position: relative;">
  <button class="btn btn--secondary btn--md is-lit" id="search-btn">Search</button>
  <div class="coach" role="dialog" aria-labelledby="coach-t" aria-describedby="coach-b" style="top: 64px; left: 0; --arrow: 40px;">
    <div class="coach__step">Step 1 of 3</div>
    <div class="coach__title" id="coach-t">Search every note</div>
    <div class="coach__body" id="coach-b">Find a note by any word in it, not only the title.</div>
    <div class="cluster" style="margin-top: 14px; justify-content: flex-end;">
      <button class="btn btn--sm">Skip</button>
      <button class="btn btn--sm is-primary">Next</button>
    </div>
  </div>
</div>`,
    },
    {
      title: 'A single pointer',
      desc: 'One step needs no counter; the only action is "Got it".',
      stage: 'block',
      html: `<div style="position: relative; min-height: 210px;">
  <button class="btn btn--gray btn--md is-lit"><span class="ic" aria-hidden="true">download</span>Export</button>
  <div class="coach" role="dialog" aria-labelledby="cm2-t" style="top: 60px; left: 0; --arrow: 36px;">
    <div class="coach__title" id="cm2-t">Export grades to a spreadsheet</div>
    <div class="coach__body">Every column you see is included, in the same order.</div>
    <div class="docs-row" style="margin-top: 14px; justify-content: flex-end;"><button class="btn btn--sm is-primary" onclick="this.closest('.coach').hidden = true; this.closest('.coach').parentElement.querySelector('.is-lit').classList.remove('is-lit');">Got it</button></div>
  </div>
</div>`,
    },
  ],
  states: [
    ['open', 'The card is placed under the target and the target has `.is-lit`.'],
    ['next step', 'Move the card (`transform`) and the arrow (`--arrow`); change the text; move `.is-lit`.'],
    ['skipped or done', 'Remove the card and `.is-lit`, and remember it so the tour never shows again.'],
  ],
  motion: [
    'Between steps the card glides with `transform` on `--spring-smooth` (`--d-smooth`, 560 ms) and the arrow slides with `left` on the same spring, so the eye follows to the new target instead of losing it.',
    'New step text may rise in with `lds-rise` over `--d-standard` (240 ms) on `--ease-enter`.',
    'Opacity uses `--d-standard` on `--ease-enter`. Reduced motion: moves become 120 ms linear changes.',
  ],
  a11y: [
    '`role="dialog"` (non-modal) with `aria-labelledby` the title and `aria-describedby` the body. Move focus to the Next button when it opens, and back to the target when it closes.',
    'Escape must skip the tour; wire it in the app (there is no built-in behavior).',
    'The page stays usable behind it: no scrim, no focus trap.',
    'The lit ring is not the only cue; the text names the control ("Filter by course").',
  ],
  do: [
    'Point at one control per step, three steps at most.',
    'Always offer Skip, and never show a finished tour again.',
    'Start the tour only after the screen has loaded and the person is idle.',
  ],
  dont: [
    'Chain coachmarks across pages.',
    'Explain what the label already says ("This is the search button").',
    'Cover the control it points at.',
  ],
  js: 'No built-in behavior: placing the card, moving `--arrow`, toggling `.is-lit`, Escape and remembering completion are up to the app.',
  related: ['hints', 'tooltip', 'popover', 'banner'],
};
