const RUN = (fail) => `const drop = this.closest('.drop'); const meta = drop.querySelector('.card__sub'); this.disabled = true; import('../../js/lds.js').then((m) => { m.uploadReset(drop); let p = 0; const t = setInterval(() => { p += 7 + Math.random() * 9; ${fail ? "if (p > 55) { clearInterval(t); m.uploadReset(drop); meta.textContent = 'Upload stopped at 58 %. Check your connection and try again.'; meta.classList.add('field__help--error'); this.disabled = false; this.textContent = 'Try again'; m.shake(drop); return; }" : ''} m.uploadProgress(drop, Math.min(p, 100)); meta.textContent = Math.round(Math.min(p, 100) * 0.042 * 10) / 10 + ' of 4.2 MB'; if (p >= 100) { clearInterval(t); meta.textContent = 'Uploaded, 4.2 MB'; this.disabled = false; this.textContent = 'Upload again'; } }, 220); });`;

export default {
  title: 'Upload progress',
  group: 'Microinteractions',
  order: 11,
  summary: 'An upload traces its progress around the edge of the drop zone it was dropped on, with a percent pill in the corner. The line turns green at 100 %. The number is real; it never crawls toward 90 % and waits.',
  when: [
    'A file is uploading into a drop zone ([file input](file-input)) and the size is known, so a real percentage exists.',
    'One large file where the wait is long enough to matter: an environmental permit document, a recorded meeting, a scanned application file.',
  ],
  whenNot: [
    ['Several files at once', 'file-input', 'Show a progress bar inside each `.file-row` instead.'],
    ['Progress that is not an upload', 'progress-bar'],
    ['Work with no known length', 'thinking'],
    ['A program or task completion figure', 'progress-ring'],
  ],
  where: 'On the `.drop` zone the file went into. The pill sits in its top right corner; the trace follows its rounded edge.',
  anatomy: [
    ['.drop', 'Required. The drop zone.'],
    ['.drop__ring', 'SVG `rect` with `pathLength="100"` drawn over the edge (created by JS).'],
    ['.drop__pct', 'The percent pill, `role="progressbar"` with `aria-valuenow` (created by JS).'],
    ['.is-uploading / .is-complete', 'Set by `uploadProgress()`.'],
  ],
  examples: [
    {
      title: 'Upload a permit document',
      desc: 'Press Upload. The line runs around the edge as bytes arrive and the pill counts; at 100 % both turn green.',
      stage: 'block',
      html: `<div class="drop" style="max-width: 420px;"><span class="ic" aria-hidden="true">cloud_upload</span><span class="card__title">environmental-permit.pdf</span><span class="card__sub">4.2 MB</span><button class="btn btn--secondary btn--sm" style="margin-top: 6px;" onclick="${RUN(false)}">Upload</button></div>`,
      code: `import { uploadProgress, uploadReset } from 'lampung-design-system/js';

xhr.upload.onprogress = (e) => uploadProgress(drop, (e.loaded / e.total) * 100);
// to start over: uploadReset(drop)`,
    },
    {
      title: 'An upload that stops',
      desc: 'This one fails halfway: the trace disappears, the zone shakes, and the reason replaces the size in words, with a way to try again.',
      stage: 'block',
      html: `<div class="drop" style="max-width: 420px;"><span class="ic" aria-hidden="true">cloud_upload</span><span class="card__title">musrenbang-recording.mp4</span><span class="card__sub">4.2 MB</span><button class="btn btn--secondary btn--sm" style="margin-top: 6px;" onclick="${RUN(true)}">Upload</button></div>`,
    },
  ],
  motion: [
    'Trace: `stroke-dasharray: <percent> 200` on a `rect` with `pathLength="100"`, transitioning over 200 ms linear between updates, so it moves at the real speed of the upload.',
    'Pill: appears from 10 px above with a 2 px blur (opacity 160 ms, transform 300 ms on `--spring-snappy`) when the upload starts.',
    'Complete: the trace and pill cross-fade to green over `--d-standard`; a success haptic plays.',
    'The ring fades in and out over 300 ms on `--ease-standard` when the upload starts or resets.',
    'Reduced motion: the trace and pill still update (they report progress), each change in 120 ms.',
  ],
  a11y: [
    'The pill is `role="progressbar"` with `aria-valuemin`, `aria-valuemax`, `aria-valuenow` and `aria-label="Upload progress"`.',
    'Say the result in words when it ends ("Uploaded, 4.2 MB") and the reason when it fails.',
    'Color is not the only completion signal: the pill reads 100 % and the text changes.',
  ],
  do: [
    'Feed it real percentages from the upload events.',
    'Replace the size line with the result or the reason at the end.',
    'Call `uploadReset` before a new upload.',
  ],
  dont: [
    'Fake progress on a timer.',
    'Hold at 99 % while the server processes; switch the label to "Processing" with a [thinking](thinking) row.',
    'Use it for several files at once.',
  ],
  js: '`uploadProgress(drop, percent)` creates the ring and pill on first call, updates both, toggles `.is-uploading` and `.is-complete` (with a success haptic at 100). `uploadReset(drop)` removes both states.',
  related: ['file-input', 'progress-bar', 'thinking', 'haptics'],
};
