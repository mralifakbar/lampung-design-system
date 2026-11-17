# Navigation stack

Group: Navigation. https://lampung.kartadinata.app/docs/en/components/nav-stack

Push a detail screen in from the right over the one you came from, and go back with the back button or by dragging the screen away from the left edge. The screen underneath slides at 30 % and dims, so people always know where back leads.

## Use it when
- A phone app where a row opens its detail: a service from a list, a payment from activity, a report from reports.
- Drilling two or three levels into one area of an app while the tab bar stays put.
- A settings area on a phone where each row opens its own screen.

## Use something else when
- Switching between top-level areas: use [Phone bars](phone-bars.md). Tabs swap without sliding; each tab keeps its own stack.
- A focused task that should keep the screen in view: use [Sheet](sheet.md).
- Steps of a form going forward and back: use [View swap](view-swap.md).
- A wide screen with a list beside its detail: use [Resizable split](resizable-split.md).

## Where it goes
Fills a tab of a [phone screen](phone-screen.md): `.navstack` absolute over the whole screen, under the tab bar. Each `.navstack__view` is a full screen with its own `.navbar` and `.phone__scroll`. The first view has a large title; pushed views use `.navbar--inline` with a back button.

## Anatomy
| Part | What it is |
|---|---|
| `.navstack[data-lds-navstack]` | Required. The positioned container. The first visible view is the root. |
| `.navstack__view` | Required. One screen. Views that are not in the stack are `hidden`. |
| `[data-lds-nav="viewId"]` | On a row or button: pushes that view. Fill the view first (listen to the click in the capture phase). |
| `.navbar.navbar--inline` | The bar of a pushed screen: the small title is always shown, the material appears on scroll. |
| `.navbar__back[data-lds-back]` | The back button: chevron plus the previous screen's title, in the accent text color. |
| `h1.navbar__title` | On pushed screens the bar title is the screen's heading; focus moves to it on push. |
| `.navbar-gap` | Spacer at the top of the scroller with the height of the bar. |

## Markup

**From the services list to one service.** Open a service: it slides in over the list. Press back, or drag the screen from its left edge and let go past halfway (a quick flick counts its speed).
```html
<div class="navstack" data-lds-navstack>
  <section class="navstack__view" aria-label="Services">
    <div class="navbar" id="courses-bar">…</div>
    <div class="phone__scroll" data-lds-navbar="courses-bar">
      <div class="navbar-gap"></div>
      <h1 class="large-title">Services</h1>
      <button class="lrow" data-lds-nav="course">…Micro business permit…</button>
    </div>
  </section>
  <section class="navstack__view" id="course" aria-label="Micro business permit" hidden>
    <div class="navbar navbar--inline" id="course-bar">
      <span><button class="navbar__back" data-lds-back aria-label="Back to Services"><span class="ic" aria-hidden="true">arrow_back_ios_new</span><span>Services</span></button></span>
      <h1 class="navbar__title">Micro business permit</h1>
      <span></span>
    </div>
    <div class="phone__scroll" data-lds-navbar="course-bar">…</div>
  </section>
</div>
```

## States
| State | How |
|---|---|
| `.navstack__view.is-under` | Covered by a pushed screen: at −30 %, dimmed by the scrim color at half strength, and `inert`. |
| `.navstack__view.is-off` | Off to the right: before it enters and after it leaves. |
| `.navstack__view.is-dragging` | Following the finger during an edge drag; no transition. |
| `.navstack.is-moving` | A screen is moving: the top one casts the large shadow, because it floats over the other. |

## Motion and microinteractions
- Push: the new screen enters from `translateX(100%)` on `--spring-smooth` over `--d-smooth` (560 ms); the one under it moves to −30 % and dims on the same spring.
- Back button: the top screen leaves in 280 ms on `--ease-exit`, the one under it returns on `--spring-smooth`.
- Edge drag (from the first 28 px): 8 px of slop decides between a horizontal drag and a scroll; the screen follows 1:1 and the one under it moves at 30 % of the distance. On release the end point is projected with the velocity (rate 0.99); past half the width it pops on `--spring-momentum`, otherwise both spring back. Any push or pop can be interrupted by the next one.
- Reduced motion: screens cross-fade in 120 ms with no sliding.

## Accessibility
- On push, focus moves to the pushed screen's heading (or `[data-lds-autofocus]`); on pop, it returns to the row that opened the screen.
- Covered screens are `inert`, so neither Tab nor a screen reader reaches them.
- The back button is a real button with `aria-label="Back to Services"`; the drag is only a shortcut.
- Give each view an `aria-label` with its title.

## Do
- Show the previous title on the back button when it fits; the chevron alone when it does not.
- Keep the tab bar outside the stack so it stays still while screens move.
- Tapping the current tab again pops to the root (`popToRoot`).

## Don't
- Slide between tabs; tabs swap in place.
- Push a screen for a short task; use a [sheet](sheet.md).
- Put horizontal swipes near the left edge of a pushed screen; the edge belongs to back.

## Behavior (plain HTML)
`data-lds-navstack` on the container, `data-lds-nav="viewId"` on triggers, `data-lds-back` on back buttons. Functions: `pushView(idOrEl, from)`, `popView(stackOrChild)`, `popToRoot(stackOrChild)`. Events on the view: `lds:push` `{ view, from }` and `lds:pop` `{ view, to }`, both bubbling. The stack is in `stack._views`, root first.

## Related
[Phone bars](phone-bars.md) · [Phone screen](phone-screen.md) · [Device frame](device-frame.md) · [Sheet](sheet.md)
