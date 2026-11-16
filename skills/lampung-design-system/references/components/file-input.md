# File input

Group: Inputs. Docs page: `docs/components/file-input.html`.

A drop zone with a real Choose button, and one row per chosen file that shows its size, upload progress, errors and a way to remove it. The button is the main path; dropping is a shortcut.

## Use it when
- People attach files to a form: an answer sheet, a transcript, a profile photo, assignment files.
- Several files upload at once and each needs its own progress, retry and remove (`.file-row`).
- A single large file uploads and the drop zone itself shows the progress around its edge (`uploadProgress`).

## Use something else when
- Showing files that are already stored, to open or download: use [List](list.md). Linked rows with a file icon; no drop zone.
- Progress of one long task that is not an upload (grading, import): use [Progress bar](progress-bar.md).
- Pasting or typing text, links or codes: use [Textarea](textarea.md).
- Viewing a chosen image large: use [Lightbox](lightbox.md).

## Where it goes
In a [form](form-layout.md), full width of its column, with the file rows directly under the drop zone. On phones keep the drop zone short (people tap Choose; nobody drags) and the rows full width.

## Anatomy
| Part | What it is |
|---|---|
| `.drop` | Required. The zone: centered column, 28 px padding, 1.5 px line edge. `.is-over` while a file is dragged over it. |
| `.drop > .ic` | Required. 28 px icon (`upload_file` or `cloud_upload`); lifts 3 px while `.is-over`. |
| `.empty__title / .empty__body` | Title ("Drop your file here") and the accepted types and size. The drop zone has no text classes of its own; these empty-state classes give the right type. |
| `.btn + input[type=file][hidden]` | Required. A real button that opens the hidden file input. This is the keyboard and phone path. |
| `ul > li.file-row` | One row per file, 56 px, quiet fill, 6 px apart. Enters with a short blur-in. |
| `.file-row__icon` | 36 px tile with the file type icon (`description`, `image`, `insert_drive_file`); shows `error` when it failed. |
| `.file-row__body` | Name (`.file-row__name`, one line with ellipsis), meta (`.file-row__meta`, size and status), and a `.progress.progress--thin` while uploading. |
| `.icon-btn` | Trailing action: cancel while uploading, remove when done, retry on error. Named with the file. |
| `.drop__ring / .drop__pct` | Created by `uploadProgress(drop, pct)`: the trace around the edge and the percent pill. |

## Markup

**Drop zone with file rows.** Choose a file (or drag one over the zone). Each file becomes a row; uploading rows show a thin bar, finished rows a remove button, failed rows say why and offer retry.
```html
<div class="drop">
  <span class="ic" aria-hidden="true">upload_file</span>
  <span class="empty__title">Drop your answer sheets here</span>
  <span class="empty__body">PDF or image, up to 10 MB each</span>
  <button type="button" class="btn btn--secondary btn--sm">Choose files</button>
  <input type="file" multiple accept=".pdf,image/*" hidden aria-label="Answer sheets">
</div>
<ul aria-label="Chosen files">
  <li class="file-row">
    <span class="file-row__icon"><span class="ic" aria-hidden="true">image</span></span>
    <span class="file-row__body">
      <span class="file-row__name">page-2-photo.jpg</span>
      <span class="file-row__meta">1.1 MB of 3.0 MB · 37%</span>
      <span class="progress progress--thin" role="progressbar" aria-label="Uploading page-2-photo.jpg" aria-valuemin="0" aria-valuemax="100" aria-valuenow="37"><span class="progress__fill" style="transform: scaleX(0.37);"></span></span>
    </span>
    <button type="button" class="icon-btn" aria-label="Cancel upload of page-2-photo.jpg"><span class="ic" aria-hidden="true">close</span></button>
  </li>
  <li class="file-row is-error">…<span class="file-row__meta">Upload failed. Check your connection and retry.</span>…</li>
</ul>
<!-- Your code: the button calls input.click(); dragover adds .is-over, dragleave and drop remove it; each file becomes a row. -->
```

**One file, progress around the edge.** For a single upload, the zone traces its own edge and shows a percent pill; the trace turns green at 100 %. Press Upload.
```html
import { uploadProgress, uploadReset } from 'lampung-design-system/js';

xhr.upload.onprogress = (e) => uploadProgress(drop, (e.loaded / e.total) * 100);
// Starting again: uploadReset(drop)
```

## States
| State | How |
|---|---|
| `.drop.is-over` | A file is dragged over: accent tint, 2 px accent edge, scale 1.01, icon lifts 3 px. |
| `.drop.is-uploading / .is-complete` | Set by `uploadProgress`: the edge goes quiet, the trace draws, the pill shows the percent; complete turns both green. |
| `.file-row uploading` | Meta says "1.1 MB of 3.0 MB · 37%", a `.progress--thin` bar under it, a cancel button. |
| `.file-row done` | Meta says the size and "Uploaded"; the bar is gone; a remove button. |
| `.file-row.is-error` | Icon and meta in the danger color; the meta says what failed and what to do; a retry button. |
| `rejected file` | Wrong type or too large: do not add a row; say it under the zone in `.field__help--error` ("essay.docx is not a PDF or image"). |

## Motion and microinteractions
- Drag over: tint and edge in `--d-fast` (160 ms) on `--ease-standard`; the zone scales to 1.01 on `--spring-smooth` (560 ms); the icon rises on `--spring-snappy`. Leaving reverses the same transitions.
- A new row enters with `lds-blur-in` (4 px rise and 4 px blur) in `--d-standard` (240 ms) on `--ease-enter`.
- The row bar fills with `transform: scaleX()` in `--d-considered` (480 ms) on `--ease-inout`, so jumpy progress events still look smooth.
- The edge trace (`uploadProgress`) moves its dash in 200 ms linear; the pill drops in from 10 px with a blur on `--spring-snappy`; at 100 % a success haptic plays on phones. See [upload progress](upload-progress.md).
- Reduced motion: no scale or rise; color and progress changes become 120 ms linear.

## Accessibility
- Keyboard and screen reader users use the Choose button, a real `<button type="button">` that calls `input.click()` on a `hidden` file input with an `aria-label`. Dropping is never the only way.
- Set `accept` and say the types and size in the zone text, before people choose.
- Each uploading row has a `role="progressbar"` bar with `aria-valuenow` and a name; the percent pill from `uploadProgress` is a progressbar too.
- Row buttons say the action and the file ("Retry essay-draft.pdf"). Announce finished or failed uploads in an `aria-live="polite"` region or a [toast](toast.md).

## Do
- Upload right after choosing and show progress per file; let people keep filling the form.
- Say why a file failed and keep the row so they can retry.
- Use a real button labelled for the outcome ("Choose files", "Choose a photo").

## Don't
- Rely on drag and drop alone, or hide the file input without a button.
- Add rows for files you are about to reject; explain under the zone instead.
- Draw your own progress bar inside the row; use `.progress--thin`.

## Behavior (plain HTML)
`uploadProgress(drop, pct)` creates the edge trace and the percent pill on a `.drop` and updates them (adds `.is-uploading`, `.is-complete` at 100 %); `uploadReset(drop)` clears both classes. Choosing, drag over and the file rows are yours: the system has no `data-lds-*` hook for them.

## Related
[Upload progress](upload-progress.md) · [Progress bar](progress-bar.md) · [List](list.md) · [Empty state](empty-state.md)
