# Device frame

Group: Page patterns. Docs page: `docs/components/device-frame.html`.

A phone body around a `.phone` screen: rounded bezel, side buttons, the camera island and a status bar, scaled to fit the page. On a real phone the same screen drops the body and fills the display with `.device--bleed`.

## Use it when
- Showing a phone app inside a wide page: a tour of a citizen services app, an examples page, a design review, onboarding for a mobile app.
- A preview whose screens push, pull and recede like an installed app, where the bezel tells people it is a phone.
- The same preview on a phone, where the frame should disappear and the app should fill the screen.

## Use something else when
- A small framed screen next to text in documentation: use [Phone screen](phone-screen.md). Use `.phone.phone--inline` without a body.
- A responsive web app that runs on phones and desktops: use [App shell](app-shell.md).
- A screenshot or photo of a device: use [Thumbnail](thumbnail.md).

## Where it goes
Centered in its own column, with nothing overlapping it. Give the column a definite width (for example a 414 px grid track): the frame scales to that width and to the window height, never above its real size. Below 600 px add `.device--bleed` and let it fill the viewport under a small app bar.

## Anatomy
| Part | What it is |
|---|---|
| `.device[data-lds-device]` | Required. The 414 by 868 body with a 12 px bezel and side buttons. `data-lds-device` scales it with CSS zoom to fit; `data-fit-margin` (default 48) is the vertical room to leave. |
| `.phone` | Required. The 390 by 844 screen inside, clipped to a 48 px radius. |
| `.phone__content` | The screen's content as one layer: nav bars, scrollers and tab bars. While a sheet is open it recedes like a card. Sheets, scrims and the toaster stay outside it. |
| `.device__status` | Status bar: time, `.device__signal` (four `<i>`), the `wifi` icon and `.device__battery` (`--level` 0 to 1). `aria-hidden`. |
| `.device__island` | The camera island. `aria-hidden`. |
| `.home-ind` | The home indicator at the bottom. |
| `[data-lds-push="id id"]` | On the `.phone`: the ids of the sheets that push the content back while open (space separated). |

## Markup

**A screen in its frame.** The frame fits this column. Open the sheet: the content recedes, the status bar turns light over the dark backdrop, and the sheet can be dragged away.
```html
<div class="device" data-lds-device>
  <div class="phone" data-lds-push="attendance">
    <div class="phone__content">…nav bar, scroller, tab bar…</div>
    <div class="scrim" data-lds-scrim="attendance"></div>
    <div class="sheet" id="attendance" role="dialog" aria-modal="true" data-lds-layer>…</div>
    <div class="device__status" aria-hidden="true">
      <span>9:41</span>
      <span class="device__status-end"><span class="device__signal"><i></i><i></i><i></i><i></i></span><span class="ic">wifi</span><span class="device__battery" style="--level: 0.76;"></span></span>
    </div>
    <span class="device__island" aria-hidden="true"></span>
    <span class="home-ind" aria-hidden="true"></span>
  </div>
</div>
```

**Full bleed on a phone.** Toggle the class on small screens. The body, island and status bar go; the bars pad themselves with the safe areas instead.
```html
<div class="codeblock" style="width: 100%;"><div class="codeblock__bar"><span>preview.js</span></div><pre><code>const device = document.querySelector('[data-lds-device]');
const small = matchMedia('(max-width: 599px)');
const fit = () =&gt; { device.classList.toggle('device--bleed', small.matches); fitDevice(device); };
small.addEventListener('change', fit); fit();</code></pre></div>
```

## Variants and sizes
| Class or attribute | When |
|---|---|
| `.device` | The full body, scaled to fit with `data-lds-device`. |
| `.device.device--bleed` | No body: the screen fills its container, `--phone-top` and `--phone-bottom` come from `env(safe-area-inset-*)`. |

## States
| State | How |
|---|---|
| `.phone.is-pushed` | A listed sheet is open: `.phone__content` scales to 0.92 under the status bar, rounds its corners and dims; the backdrop turns black and the status bar light. |

## Motion and microinteractions
- Recede: `.phone__content` scales and rounds on `--spring-smooth` over `--d-smooth`, the brightness eases on `--ease-standard`. Closing the sheet reverses it from where it is.
- Scaling to fit is not animated: it follows the window size at once.
- Reduced motion: the content stays in place and only dims, over 120 ms.

## Accessibility
- The status bar, island and home indicator are decoration: `aria-hidden="true"`.
- Put the frame in a landmark with a name (for example `<main aria-label="Phone preview">`) so people can skip to it.
- The frame is shown with CSS zoom, so text inside keeps its real size relative to the screen and stays crisp; never shrink it below about half size, where body text drops under 8 px.

## Do
- Give the column a fixed width so the frame has something to fit.
- Switch to `.device--bleed` on phones instead of showing a phone inside a phone.
- Keep sheets, scrims and the toaster outside `.phone__content` so they do not recede with it.

## Don't
- Put real content in the status bar; it is a picture of one.
- Add a second shadow or a colored backdrop behind the frame.
- Use it for screenshots; use a [thumbnail](thumbnail.md).

## Behavior (plain HTML)
`data-lds-device` on `.device` sets `--device-scale` (CSS zoom) from the parent width and the window height minus `data-fit-margin`, on load and on resize. `fitDevice(el)` runs it by hand after a layout change. `data-lds-push` takes several sheet ids separated by spaces. Drags inside the frame (sheets, swipe rows, slide to confirm, the navigation stack) divide by the zoom so they stay under the finger.

## Related
[Phone screen](phone-screen.md) · [Phone bars](phone-bars.md) · [Navigation stack](nav-stack.md) · [Sheet](sheet.md)
