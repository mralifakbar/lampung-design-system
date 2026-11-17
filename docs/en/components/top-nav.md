# Top nav

Group: Navigation. https://lampung.kartadinata.app/docs/en/components/top-nav

A translucent bar across the top of a site without a sidebar: brand, up to five links, actions. Below 760 px the links fold into a panel under the bar.

## Use it when
- A marketing, landing or content site with five or fewer top-level pages and no need for a sidebar.
- A public part of a service (fees, guide home, sign in) that sits in front of an app shell.

## Use something else when
- An app with many destinations, groups or nested sections: use [App shell](app-shell.md).
- A phone app with three to five destinations people switch between all day: use [Phone bars](phone-bars.md). The tab bar sits under the thumb; a folded top menu does not.
- Sibling sections of one record or page: use [Tabs](tabs.md).
- File, Edit, View style command menus in an editor: use [Menubar](menubar.md).

## Where it goes
The first element in `<body>`, sticky to the top of the viewport, full width. 60 px tall on wide screens, 56 px below 760 px, padded for the notch. Content scrolls under its material.

## Anatomy
| Part | What it is |
|---|---|
| `.topnav[data-lds-topnav]` | Required. The `<header>` bar; sticky, translucent material, hairline under it. |
| `.topnav__brand` | Required. Product name or logo, a link home. |
| `.topnav__links` | Required. A `<nav aria-label>` with the links; on phones it becomes the fold-out panel. |
| `.topnav__link` | Required. One destination; `aria-current="page"` underlines it with a 2 px bar at the bottom of the nav bar. |
| `.topnav__actions` | Pushed to the right: a sign in link, one primary button, an icon button. |
| `.topnav__toggle[data-lds-topnav-toggle]` | The menu `icon-btn` with a `.burger`, shown only below 760 px. |

## Markup

**Site header.** Brand, four links and one call to action. Below 760 px the links fold behind the menu button; pick one or press Escape to close it. Boxed for the demo; in a page it is sticky to the viewport.
```html
<header class="topnav" data-lds-topnav>
  <a class="topnav__brand" href="/">Layanan Warga</a>
  <nav class="topnav__links" id="site-links" aria-label="Main">
    <a class="topnav__link" href="/services" aria-current="page">Services</a>
    <a class="topnav__link" href="/complaints">Complaints</a>
    <a class="topnav__link" href="/fees">Fees</a>
  </nav>
  <div class="topnav__actions">
    <a class="btn btn--plain btn--md" href="/sign-in">Sign in</a>
    <a class="btn btn--primary btn--md" href="/apply">Apply now</a>
    <button class="icon-btn topnav__toggle" data-lds-topnav-toggle aria-controls="site-links" aria-expanded="false" aria-label="Menu"><span class="burger" aria-hidden="true"><i></i><i></i><i></i></span></button>
  </div>
</header>
```

**Links only.** A documentation site with no call to action: the actions hold only the toggle, which shows below 760 px.
```html
<div style="height: 260px; overflow: hidden; position: relative;">
  <header class="topnav" data-lds-topnav>
    <a class="topnav__brand" href="#tn2-body">Officer guide</a>
    <nav class="topnav__links" id="tn2-links" aria-label="Guide">
      <a class="topnav__link" href="#tn2-body">Start here</a>
      <a class="topnav__link" href="#tn2-body" aria-current="page">Verification</a>
      <a class="topnav__link" href="#tn2-body">Reports</a>
    </nav>
    <div class="topnav__actions">
      <button class="icon-btn topnav__toggle" data-lds-topnav-toggle aria-controls="tn2-links" aria-expanded="false" aria-label="Menu"><span class="burger" aria-hidden="true"><i></i><i></i><i></i></span></button>
    </div>
  </header>
  <div class="stack" id="tn2-body" style="padding: 32px 20px;"><p class="section__sub">Verification: how documents are checked and when applicants see the result.</p></div>
</div>
```

## States
| State | How |
|---|---|
| `aria-current="page"` | Strong text and a 2 px bar on the bottom edge of the nav bar; on phones a tinted row. |
| `hover` | Strong text on a quiet tint, only where hover exists. |
| `.topnav.is-open` | Below 760 px: the links panel is shown and the burger becomes a close icon. |

## Motion and microinteractions
- Phone panel: enters with opacity over `--d-fast` and slides 8 px down on `--spring-smooth`; leaves over `--d-exit` (180 ms) on `--ease-exit`, then hides.
- The burger folds into a close icon on `--spring-snappy`.
- The bar does not hide or shrink on scroll; a jumping header costs more than the 60 px it saves.
- Reduced motion: transitions drop to 120 ms linear; reduced transparency swaps the blur for a solid material.

## Accessibility
- The bar is a `<header>`; the links sit in a `<nav aria-label>`; the current link has `aria-current="page"`.
- The toggle has `aria-label="Menu"`, `aria-controls` the links id and `aria-expanded` kept in sync by the script.
- Escape closes the panel and returns focus to the toggle; a pointer down outside closes it; following a link closes it.
- Links are 44 px tall in the phone panel.

## Do
- Keep to five links or fewer, named with nouns people search for.
- Put one primary button at most in the actions.
- Pair with a [nav progress](nav-progress.md) bar if pages take long to arrive.

## Don't
- Add dropdown mega menus; if the site needs them, it needs an [app shell](app-shell.md).
- Use a top nav and a sidebar together.
- Hide the brand on phones; the toggle goes at the end of the actions instead.

## Behavior (plain HTML)
`data-lds-topnav` on `.topnav` wires the `[data-lds-topnav-toggle]` button: toggles `.is-open` and `aria-expanded`, closes on Escape (focus back to the toggle), on a pointer down outside and when a `.topnav__link` is followed.

## Related
[App shell](app-shell.md) · [Nav progress](nav-progress.md) · [Phone bars](phone-bars.md) · [Menubar](menubar.md)
