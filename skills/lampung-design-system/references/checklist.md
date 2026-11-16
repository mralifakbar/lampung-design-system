# Before you deliver

Run this alongside the antislop Delivery Gate (`skills/antislop/SKILL.md`). Every line must hold.

## System fidelity
- [ ] Only tokens, no raw hex, px values outside the 4 pt grid, or ad hoc shadows.
- [ ] White canvas; groups on `--bg-fill`; no fill on fill; shadows only on floating layers; blur only on nav and tab bars.
- [ ] One accent. Exactly one primary button per view.
- [ ] Type uses the scale with its tracking; numbers that change are tabular.
- [ ] Icons come from `icons/icons.json` (unknown names render blank).
- [ ] Radii nest concentrically.

## Motion
- [ ] Press feedback on pointer down; enter on a spring, exit faster on `--ease-exit`; same path in and out.
- [ ] Everything a user can reverse uses transitions, not keyframes; nothing blocks input mid-animation.
- [ ] Bounce only after momentum; no endless decorative loops.
- [ ] Reduced motion gives a short cross-fade.

## People
- [ ] Contrast computed with `skills/antislop-human/contrast-check.py` for every new pairing, in light and dark.
- [ ] Tab order follows the visual order; every control has a visible focus ring; Escape closes the top layer and focus returns.
- [ ] Icon-only buttons have `aria-label`; status is never color alone.
- [ ] Targets at least 44 by 44 with gaps between them.
- [ ] Words people read are 13 px or larger; only numbers in badges, counts and chart ticks go smaller.

## Content and states
- [ ] Loading, empty, error and loaded states exist for every data view, each saying what happens next.
- [ ] Every chart has a text `label` that states the finding and a data table or summary people can read without the chart; colors follow the series order and status is never color alone.
- [ ] Copy names outcomes, sentence case, no em dashes, no buzzwords, no invented claims; example screens use plausible values, flagged once per page, not with bracket placeholders or per-chart labels.

## Layout
- [ ] Works from 320 px to wide desktop with no horizontal scroll; wide tables scroll in their own box.
- [ ] Phone layouts keep primary actions in thumb reach and respect safe areas.
- [ ] On a phone: no zoom when a field gets focus, no grey tap flash, long labels wrap inside buttons, autofilled fields keep their own background.
- [ ] Light and dark both checked by actually switching `data-theme`.

## Multi-page apps
- [ ] Every page that uses `.shell` has the paint-time snippet right after `</aside>` (copied from `components/app-shell.md`), so the sidebar keeps its scroll and the highlight glides from the link you left.
- [ ] The site opts in once with `@view-transition { navigation: auto; types: lds-page; }`; sidebar and bar stay still, only the content cross-fades.
- [ ] Exactly one link carries `aria-current="page"` and the page reads correctly before any script runs.
