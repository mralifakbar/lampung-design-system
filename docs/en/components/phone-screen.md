# Phone screen

Group: Page patterns. https://lampung.kartadinata.app/docs/en/components/phone-screen

The standard phone layout: a large title that collapses into a translucent nav bar as content scrolls under it, grouped lists in the middle, and a translucent tab bar at the bottom. The bars are the only blurred surfaces.

## Use it when
- Designing or prototyping a phone app screen in the system: a home "Today" screen, a settings screen, a list of services.
- Showing a phone layout inside a desktop page (docs, previews, onboarding) with `.phone.phone--inline`.
- A top-level screen that is one of three to five main areas reached from the tab bar.

## Use something else when
- A responsive web page that should work on phones and desktops: use [App shell](app-shell.md). The shell turns its sidebar into a drawer on phones.
- Only the bars themselves (nav bar, tab bar) and their rules: use [Phone bars](phone-bars.md).
- A task that keeps the current screen in view (check in, filters): use [Sheet](sheet.md).
- A site with a few top-level pages and no app chrome: use [Top nav](top-nav.md).
- A list of settings or links inside a screen: use [List](list.md). The inset grouped list the screen is built from.

## Where it goes
This is a whole screen. `.phone` is a 390 by 844 frame (the size of a common phone); `.phone--inline` is a smaller 320 by 520 frame with an edge and shadow for showing a screen inside a page. In a real phone web app, use the same parts in a full-height container that you position and size in the app stylesheet.

## Anatomy
| Part | What it is |
|---|---|
| `.phone` | Required. The frame: positioned, clipped, canvas background, 48 px radius. `.phone--inline` for an embedded preview. |
| `.navbar` | Required. Absolute bar at the top: a three-column grid (back or empty, `.navbar__title`, `.navbar__end` with [icon buttons](icon-button.md)). Needs an `id`. Its material and title appear only after scrolling (`.is-scrolled`). |
| `.phone__scroll[data-lds-navbar]` | Required. The scrolling content under both bars, `data-lds-navbar` set to the nav bar id. |
| `spacer + h1.large-title` | Required. Space for the bar (100 px in `.phone`, or `.status-gap` plus the bar height), then the 34 px bold title, 20 px from the edge. |
| `content` | Grouped [lists](list.md) (`.list.list--fill` with `.lrow`), [KPI cards](kpi-card.md), [search](search-field.md); 16 to 20 px side padding, about 110 px bottom padding so the last row clears the tab bar. |
| `nav.tabbar > button.tabbar__item` | Required on top-level screens. Three to five items with icon and label; `aria-current="page"` on the current one, which uses the filled icon. |
| `.home-ind` | Optional. The home indicator line, for mockups only. |

## Markup

**Today.** Scroll the list: once the large title passes under the bar, the bar gets its material and the small title rises in.
```html
<div class="phone phone--inline" style="width: 360px; max-width: 100%; height: 600px; margin: 0 auto;">
  <div class="navbar" id="ps-nav" style="height: 64px; padding-top: 14px;"><span></span><span class="navbar__title">Today</span><div class="navbar__end"><button type="button" class="icon-btn" aria-label="Notifications"><span class="ic" aria-hidden="true">notifications</span></button></div></div>
  <div class="phone__scroll" data-lds-navbar="ps-nav">
    <div style="height: 64px;"></div>
    <h1 class="large-title">Today</h1>
    <div class="stack" style="padding: 12px 16px 110px;">
      <div class="list list--fill">
        <button type="button" class="lrow lrow--icon" style="min-height: 60px;"><span class="lrow__icon" style="background: var(--tile-blue);"><span class="ic" aria-hidden="true">groups</span></span><span class="lrow__body"><span class="lrow__title" style="display: block; font-weight: 500;">Posyandu Melati</span><span class="lrow__sub" style="display: block;">08:00 · RT 03 community hall</span></span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></button>
        <button type="button" class="lrow lrow--icon" style="min-height: 60px;"><span class="lrow__icon"><span class="ic" aria-hidden="true">stethoscope</span></span><span class="lrow__body"><span class="lrow__title" style="display: block; font-weight: 500;">Prenatal check-up</span><span class="lrow__sub" style="display: block;">10:00 · Puskesmas Kedaton</span></span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></button>
        <button type="button" class="lrow lrow--icon" style="min-height: 60px;"><span class="lrow__icon" style="background: var(--tile-orange);"><span class="ic" aria-hidden="true">medical_services</span></span><span class="lrow__body"><span class="lrow__title" style="display: block; font-weight: 500;">Child immunization</span><span class="lrow__sub" style="display: block;">13:00 · Puskesmas Kedaton</span></span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></button>
      </div>
      <div class="auto-grid" style="--min: 120px;">
        <article class="kpi"><div class="kpi__head"><span class="kpi__icon" aria-hidden="true"><span class="ic">event_available</span></span><span class="kpi__label">Files complete</span></div><div class="kpi__value">92<small>%</small></div></article>
        <article class="kpi"><div class="kpi__head"><span class="kpi__icon" aria-hidden="true"><span class="ic">assignment</span></span><span class="kpi__label">Errands due</span></div><div class="kpi__value">3</div></article>
      </div>
      <div class="list list--fill">
        <div class="lrow" style="min-height: 56px;"><span class="lrow__body"><span class="lrow__title" style="display: block;">Complete domicile letter</span><span class="lrow__sub" style="display: block;">Micro business permit · due tomorrow</span></span><span class="badge badge--warning">Tomorrow</span></div>
        <div class="lrow" style="min-height: 56px;"><span class="lrow__body"><span class="lrow__title" style="display: block;">Pay vehicle tax</span><span class="lrow__sub" style="display: block;">Regional tax · due Thursday</span></span><span class="badge">Thu</span></div>
        <div class="lrow" style="min-height: 56px;"><span class="lrow__body"><span class="lrow__title" style="display: block;">Business site survey</span><span class="lrow__sub" style="display: block;">UMKM mentoring · Friday</span></span><span class="badge">Fri</span></div>
      </div>
    </div>
  </div>
  <nav class="tabbar" style="height: 76px; padding-bottom: 22px;" aria-label="Main">
    <button type="button" class="tabbar__item" aria-current="page"><span class="ic" aria-hidden="true">today</span>Today</button><button type="button" class="tabbar__item"><span class="ic" aria-hidden="true">calendar_month</span>Schedule</button><button type="button" class="tabbar__item"><span class="ic" aria-hidden="true">account_balance</span>Services</button><button type="button" class="tabbar__item"><span class="ic" aria-hidden="true">person</span>Profile</button>
  </nav>
</div>
```

**Settings with a search field.** Search under the large title, grouped rows with switches, and a destructive row alone in its own group at the end.
```html
<div class="phone phone--inline" style="width: 360px; max-width: 100%; height: 600px; margin: 0 auto;">
  <div class="navbar" id="ps-nav2" style="height: 64px; padding-top: 14px;"><span></span><span class="navbar__title">Profile</span><span></span></div>
  <div class="phone__scroll" data-lds-navbar="ps-nav2">
    <div style="height: 64px;"></div>
    <h1 class="large-title">Profile</h1>
    <div class="stack" style="--gap: 24px; padding: 12px 16px 110px;">
      <div class="search-wrap" data-lds-search><div class="control search" style="flex: 1;"><span class="ic" aria-hidden="true">search</span><input placeholder="Search settings" aria-label="Search settings"></div><button type="button" class="search__cancel">Cancel</button></div>
      <div class="list list--fill">
        <label class="lrow lrow--icon" style="min-height: 52px;"><span class="lrow__icon" style="background: var(--tile-red);"><span class="ic" aria-hidden="true">notifications</span></span><span class="lrow__body"><span class="lrow__title">Due date reminders</span></span><span class="switch switch--sm"><input type="checkbox" role="switch" checked><span class="switch__track" aria-hidden="true"><span class="switch__thumb"></span></span></span></label>
        <button type="button" class="lrow lrow--icon" style="min-height: 52px;"><span class="lrow__icon" style="background: var(--tile-green);"><span class="ic" aria-hidden="true">lock</span></span><span class="lrow__body"><span class="lrow__title">Privacy</span></span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></button>
      </div>
      <div class="list list--fill"><button type="button" class="lrow" style="min-height: 52px; justify-content: center;"><span class="lrow__title" style="color: var(--danger-text); font-weight: 500;">Sign out</span></button></div>
    </div>
  </div>
  <nav class="tabbar" style="height: 76px; padding-bottom: 22px;" aria-label="Main">
    <button type="button" class="tabbar__item"><span class="ic" aria-hidden="true">today</span>Today</button><button type="button" class="tabbar__item"><span class="ic" aria-hidden="true">calendar_month</span>Schedule</button><button type="button" class="tabbar__item"><span class="ic" aria-hidden="true">account_balance</span>Services</button><button type="button" class="tabbar__item" aria-current="page"><span class="ic" aria-hidden="true">person</span>Profile</button>
  </nav>
</div>
```

## Variants and sizes
| Class or attribute | When |
|---|---|
| `.phone` | 390 by 844 frame for full-size mockups; the bars use their full heights (nav bar 100 px with 54 px for the status bar, tab bar 83 px with room for the home indicator). |
| `.phone.phone--inline` | 320 by 520 framed preview inside a page; shorten the bars with inline sizes as in the examples (64 px nav bar, 76 px tab bar), since there is no status bar. |

## States
| State | How |
|---|---|
| `.navbar.is-scrolled` | Set by `data-lds-navbar` when content scrolls more than 44 px: material behind the bar and the small title appear. |
| `.tabbar__item[aria-current="page"]` | Accent color and the filled icon, which pops once when it becomes current. |

## Motion and microinteractions
- Nav bar material: opacity in `--d-fast` (160 ms) linear, tied to the 44 px scroll threshold, so it never half-shows.
- Small title: opacity in `--d-fast` and a 6 px rise in `--d-standard` (240 ms) on `--ease-enter`. Scrolling back reverses it.
- Tab bar: the pressed icon sinks to 0.86 on `--spring-snappy`; the new current icon pops with `lds-pop` (0.82 to 1) on `--spring-snappy` (360 ms). Switching tabs swaps the content without a slide ([view swap](view-swap.md)).
- Reduced transparency: both bars use the solid material without blur. Reduced motion: changes become 120 ms linear.

## Accessibility
- One `h1` per screen: the large title. The small title in the bar repeats it visually; it can stay as plain text.
- The tab bar is a `<nav>` with an `aria-label`; items are buttons (or links) with `aria-current="page"` on the current one, and always a text label under the icon.
- Bar buttons are 44 px [icon buttons](icon-button.md) with `aria-label`s.
- Keep the bottom padding so the last row can scroll out from under the tab bar; nothing interactive should stay hidden behind it.

## Do
- Use three to five tab bar items, each a top-level area.
- Group rows into inset lists with 24 to 28 px between groups; put destructive rows in their own group at the end.
- Keep blur to the two bars.

## Don't
- Add a third blurred surface or a shadow under the bars.
- Hide the tab bar labels, or use it for actions (that is a [floating action](floating-action.md) or a toolbar).
- Put a large title on screens pushed from a list; they use the small title in the bar with a back button.

## Behavior (plain HTML)
`data-lds-navbar="navbar-id"` on `.phone__scroll`: toggles `.is-scrolled` on the nav bar once the content scrolls past 44 px. Tab switching is yours.

## Related
[Phone bars](phone-bars.md) · [List](list.md) · [App shell](app-shell.md) · [Sheet](sheet.md)
