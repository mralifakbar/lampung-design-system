# Phone bars

Group: Navigation. https://lampung.kartadinata.app/docs/en/components/phone-bars

The chrome of a phone screen: a nav bar at the top whose large title collapses into it on scroll, and a tab bar of three to five destinations at the bottom. Both are translucent so content scrolls visibly under them.

## Use it when
- A phone-first app or installed web app with three to five top-level destinations people switch between all day: Today, Schedule, Services, Profile.
- A phone screen that needs a title, a back button and one or two actions at the top.

## Use something else when
- A responsive web app that also runs on desktops: use [App shell](app-shell.md). The shell turns into a top bar and drawer on phones by itself.
- A website with a few pages: use [Top nav](top-nav.md).
- Sections inside one screen: use [Segmented control](segmented-control.md). Put a segmented control under the large title.
- More than five destinations: use [App shell](app-shell.md).

## Where it goes
Inside a full-height phone screen ([phone screen](phone-screen.md)): `.navbar` absolute at the top over the scroller, `.large-title` as the first content in the scroller, `.tabbar` absolute at the bottom. Both bars pad themselves for the notch and home indicator in a real app; the docs frame `.phone` is only for showing them.

## Anatomy
| Part | What it is |
|---|---|
| `.navbar` | The top bar: three columns (leading, title, trailing). Transparent until content scrolls under it. |
| `.navbar__title` | The inline title; appears once the large title has scrolled away. |
| `.navbar__end` | Trailing actions, right-aligned [icon buttons](icon-button.md). |
| `.large-title` | The 34 px title at the top of the scrolling content. |
| `.phone__scroll[data-lds-navbar]` | The scroller; `data-lds-navbar` names the nav bar id to update. |
| `nav.tabbar` | The bottom bar with `aria-label`. |
| `.tabbar__item` | A destination: icon above a label (10.5 px, always shown). `aria-current="page"` on the current one. |
| `.home-ind` | The home indicator, only in the docs phone frame. |

## Markup

**Today screen.** Scroll the screen: past 44 px the bar gains its material and the inline title rises in. Tap a tab: its glyph fills and pops once.
```html
<div class="navbar" id="today-bar">
  <span></span>
  <span class="navbar__title">Today</span>
  <div class="navbar__end"><button class="icon-btn" aria-label="Notifications"><span class="ic" aria-hidden="true">notifications</span></button></div>
</div>
<div class="phone__scroll" data-lds-navbar="today-bar">
  <h1 class="large-title">Today</h1>
  …
</div>
<nav class="tabbar" aria-label="Main">
  <a class="tabbar__item" href="/today" aria-current="page"><span class="ic" aria-hidden="true">today</span>Today</a>
  <a class="tabbar__item" href="/schedule"><span class="ic" aria-hidden="true">calendar_month</span>Schedule</a>
  <a class="tabbar__item" href="/services"><span class="ic" aria-hidden="true">account_balance</span>Services</a>
  <a class="tabbar__item" href="/profile"><span class="ic" aria-hidden="true">person</span>Profile</a>
</nav>
```

**Pushed screen with a back button.** A detail screen: back on the leading side, the title always shown in the bar (`.is-scrolled`), one action on the trailing side.
```html
<div class="phone phone--inline" style="height: 300px;">
  <div class="navbar is-scrolled" style="height: 56px; padding-top: 8px;">
    <span><button class="icon-btn" aria-label="Back to services"><span class="ic" aria-hidden="true">arrow_back_ios_new</span></button></span>
    <span class="navbar__title">Micro business permit</span>
    <div class="navbar__end"><button class="icon-btn" aria-label="Share service"><span class="ic" aria-hidden="true">ios_share</span></button></div>
  </div>
  <div class="phone__scroll" style="padding: 72px 16px 24px;">
    <p class="section__sub">IUM 2104 · done in 3 working days · Mon and Thu, 08:00</p>
  </div>
</div>
```

## States
| State | How |
|---|---|
| `.navbar.is-scrolled` | Material and hairline shown, inline title faded and risen in. Set by `data-lds-navbar` once the scroller passes 44 px. |
| `.tabbar__item[aria-current="page"]` | Accent color and the filled glyph, which pops once. |
| `:active (tab)` | The glyph sinks to 0.86 and springs back. |

## Motion and microinteractions
- Nav bar: the material fades in over `--d-fast` (160 ms) linear; the inline title fades over `--d-fast` and rises 6 px over `--d-standard` on `--ease-enter`. Scrolling back reverses both.
- Tab bar: pressing scales the glyph to 0.86 on `--spring-snappy`; the new current glyph plays `lds-pop` once over `--d-snappy` (360 ms).
- When the destination changes, the new content can stagger in at 35 ms per row ([list stagger](list-stagger.md)); never slide whole screens sideways between tabs.
- Reduced motion: pops and fades drop to 120 ms linear; reduced transparency swaps the blur for a solid material.

## Accessibility
- The tab bar is a `<nav aria-label>`; items are links (or buttons in a single-page app) with `aria-current="page"`. Labels are always visible.
- Icon-only bar buttons need `aria-label`s that name the destination ("Back to services").
- The large title is the screen's `<h1>`; the inline bar title is a visual repeat and can be `aria-hidden`.
- Tab items are full-height, at least 44 px tall and a quarter of the width each.

## Do
- Keep three to five tabs with one-word labels and filled glyphs for the current one.
- Return to the top of a tab when its current item is tapped again.

## Don't
- Hide labels or show only icons in the tab bar.
- Put actions (New, Compose) in the tab bar; use a [floating action](floating-action.md) button.
- Add a second blurred surface; the two bars are the only translucent ones.

## Behavior (plain HTML)
`data-lds-navbar="navbarId"` on the scroller toggles `.is-scrolled` on that nav bar once `scrollTop` passes 44 px, and sets `--collapse` (0 to 1 over the first 40 px) on the scroller so the large title fades as it slides under the bar. The tab bar needs no script; move `aria-current` from your router. Bar heights follow `--phone-top` (status bar inset, default 54 px) and `--phone-bottom` (home indicator inset, default 30 px); `.navbar-gap` is a spacer with the bar's height. Pushed screens use `.navbar--inline` and `.navbar__back` ([navigation stack](nav-stack.md)).

## Related
[Phone screen](phone-screen.md) · [App shell](app-shell.md) · [Segmented control](segmented-control.md) · [Floating action](floating-action.md)
